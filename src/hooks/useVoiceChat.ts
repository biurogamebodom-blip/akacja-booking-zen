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

    try {
      setIsPlayingAudio(true);
      console.log("TTS: Generating audio for:", text.substring(0, 100) + "...");

      const { data, error } = await supabase.functions.invoke("text-to-voice", {
        body: { text: text.trim() },
      });

      console.log("TTS: Response received", { hasData: !!data, error });

      if (error) {
        console.error("TTS: Edge function error:", error);
        setIsPlayingAudio(false);
        onError("Błąd generowania głosu: " + error.message);
        return;
      }

      if (!data) {
        console.error("TTS: No data returned from edge function");
        setIsPlayingAudio(false);
        onError("Nie otrzymano odpowiedzi audio");
        return;
      }

      if (data.error) {
        console.error("TTS: API error:", data.error);
        setIsPlayingAudio(false);
        onError("Błąd API głosu: " + data.error);
        return;
      }

      if (!data.audioContent) {
        console.error("TTS: No audio content in response", data);
        setIsPlayingAudio(false);
        onError("Brak danych audio w odpowiedzi");
        return;
      }

      console.log("TTS: Audio content received, length:", data.audioContent.length);

      // Stop any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Create audio element and play
      const audioSrc = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.onloadeddata = () => {
        console.log("TTS: Audio loaded successfully, duration:", audio.duration);
      };

      audio.onended = () => {
        console.log("TTS: Audio playback ended");
        setIsPlayingAudio(false);
      };

      audio.onerror = (e) => {
        console.error("TTS: Audio playback error:", e);
        setIsPlayingAudio(false);
        onError("Błąd odtwarzania audio");
      };

      audio.oncanplaythrough = () => {
        console.log("TTS: Audio can play through, starting playback...");
      };

      try {
        await audio.play();
        console.log("TTS: Audio playback started");
      } catch (playError) {
        console.error("TTS: Failed to start playback:", playError);
        setIsPlayingAudio(false);
        // Try again with user gesture workaround
        onError("Kliknij, aby włączyć dźwięk - przeglądarka wymaga interakcji użytkownika");
      }
    } catch (err) {
      console.error("TTS: Unexpected error:", err);
      setIsPlayingAudio(false);
      onError("Nieoczekiwany błąd głosu");
    }
  }, [onError]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
