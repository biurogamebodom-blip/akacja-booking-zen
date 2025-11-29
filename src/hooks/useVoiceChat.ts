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
    try {
      setIsPlayingAudio(true);
      console.log("Generating TTS for:", text.substring(0, 50) + "...");

      const { data, error } = await supabase.functions.invoke("text-to-voice", {
        body: { text },
      });

      if (error) {
        console.error("TTS error:", error);
        throw new Error(error.message);
      }

      if (data?.audioContent) {
        // Create audio element and play
        const audioSrc = `data:audio/mpeg;base64,${data.audioContent}`;
        
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        
        audio.onended = () => {
          setIsPlayingAudio(false);
        };
        
        audio.onerror = () => {
          console.error("Audio playback error");
          setIsPlayingAudio(false);
        };

        await audio.play();
        console.log("Playing audio response");
      }
    } catch (err) {
      console.error("TTS playback error:", err);
      setIsPlayingAudio(false);
    }
  }, []);

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
