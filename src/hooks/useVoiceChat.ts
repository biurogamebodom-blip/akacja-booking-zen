import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseVoiceChatProps {
  onTranscription: (text: string) => void;
  onError: (error: string) => void;
}

export const useVoiceChat = ({ onTranscription, onError }: UseVoiceChatProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        
        if (audioChunksRef.current.length > 0) {
          setIsProcessing(true);
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const base64Audio = await blobToBase64(audioBlob);
            
            console.log("Sending audio for transcription...");
            const { data, error } = await supabase.functions.invoke("voice-to-text", {
              body: { audio: base64Audio },
            });

            if (error) {
              console.error("STT error:", error);
              throw new Error(error.message);
            }

            if (data?.text) {
              console.log("Transcription received:", data.text);
              onTranscription(data.text);
            } else {
              onError("Nie udało się rozpoznać mowy. Spróbuj ponownie.");
            }
          } catch (err) {
            console.error("Voice processing error:", err);
            onError("Błąd przetwarzania głosu. Spróbuj ponownie.");
          } finally {
            setIsProcessing(false);
          }
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsRecording(true);
      
      console.log("Recording started");
    } catch (err) {
      console.error("Microphone access error:", err);
      onError("Nie udało się uzyskać dostępu do mikrofonu. Sprawdź uprawnienia.");
    }
  }, [onTranscription, onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped");
    }
  }, [isRecording]);

  const playTextAsAudio = useCallback(async (text: string) => {
    if (!text || text.trim().length === 0) {
      console.log("TTS: No text provided, skipping");
      return;
    }

    // Stop any existing audio first
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
      } catch (e) {
        console.log("TTS: Error cleaning up previous audio", e);
      }
      audioRef.current = null;
    }
    
    // Reset state
    setIsPlayingAudio(false);

    try {
      console.log("TTS: Generating audio for:", text.substring(0, 100) + "...");

      const { data, error } = await supabase.functions.invoke("text-to-voice", {
        body: { text: text.trim() },
      });

      console.log("TTS: Response received", { hasData: !!data, hasError: !!error });

      if (error) {
        console.error("TTS: Edge function error:", error);
        onError("Błąd generowania głosu: " + error.message);
        return;
      }

      if (!data?.audioContent) {
        console.error("TTS: No audio content in response");
        onError(data?.error || "Brak danych audio w odpowiedzi");
        return;
      }

      console.log("TTS: Audio content received, length:", data.audioContent.length);

      // Create and play audio
      const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
      audioRef.current = audio;
      
      setIsPlayingAudio(true);

      audio.onended = () => {
        console.log("TTS: Audio playback ended");
        setIsPlayingAudio(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        console.error("TTS: Audio playback error");
        setIsPlayingAudio(false);
        audioRef.current = null;
      };

      // Try to play immediately
      audio.play().catch((playError) => {
        console.error("TTS: Play failed:", playError.name);
        setIsPlayingAudio(false);
        audioRef.current = null;
      });
      
    } catch (err) {
      console.error("TTS: Unexpected error:", err);
      setIsPlayingAudio(false);
    }
  }, [onError]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
      } catch (e) {
        console.log("TTS: Error stopping audio", e);
      }
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
  }, []);

  return {
    isRecording,
    isProcessing,
    isPlayingAudio,
    startRecording,
    stopRecording,
    playTextAsAudio,
    stopAudio,
  };
};

// Helper function to convert Blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
