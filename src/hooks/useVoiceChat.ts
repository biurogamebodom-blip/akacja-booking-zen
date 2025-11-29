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
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingQueueRef = useRef(false);

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
            
            console.log("STT: Sending audio for transcription...");
            const { data, error } = await supabase.functions.invoke("voice-to-text", {
              body: { audio: base64Audio },
            });

            if (error) {
              console.error("STT error:", error);
              throw new Error(error.message);
            }

            if (data?.text) {
              console.log("STT: Transcription received:", data.text);
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

  // Process audio queue - self-contained function that processes items one by one
  const processNextInQueue = useCallback(async () => {
    console.log("TTS Queue: processNextInQueue called, isProcessing:", isProcessingQueueRef.current, "queueLength:", audioQueueRef.current.length);
    
    if (isProcessingQueueRef.current) {
      console.log("TTS Queue: Already processing, will be called again when done");
      return;
    }

    if (audioQueueRef.current.length === 0) {
      console.log("TTS Queue: Empty, setting isPlayingAudio to false");
      setIsPlayingAudio(false);
      return;
    }

    isProcessingQueueRef.current = true;
    setIsPlayingAudio(true);
    
    const text = audioQueueRef.current.shift()!;
    console.log("TTS Queue: Processing text:", text.substring(0, 50) + "...");

    try {
      // Call TTS API
      console.log("TTS Queue: Calling text-to-voice API...");
      const { data, error } = await supabase.functions.invoke("text-to-voice", {
        body: { text },
      });

      if (error) {
        console.error("TTS Queue: API error:", error);
        isProcessingQueueRef.current = false;
        // Continue with next item
        setTimeout(() => processNextInQueue(), 100);
        return;
      }

      if (!data?.audioContent) {
        console.error("TTS Queue: No audio content in response");
        isProcessingQueueRef.current = false;
        setTimeout(() => processNextInQueue(), 100);
        return;
      }

      console.log("TTS Queue: Got audio content, length:", data.audioContent.length);

      // Play audio
      const audio = new Audio();
      audioRef.current = audio;

      // Create a promise that resolves when audio ends or errors
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          console.log("TTS Queue: Audio playback ended successfully");
          audioRef.current = null;
          resolve();
        };

        audio.onerror = (e) => {
          console.error("TTS Queue: Audio playback error:", e);
          audioRef.current = null;
          reject(e);
        };

        audio.oncanplaythrough = () => {
          console.log("TTS Queue: Audio can play through, starting playback...");
          audio.play().catch((playError) => {
            console.error("TTS Queue: Play() failed:", playError);
            reject(playError);
          });
        };

        audio.src = `data:audio/mpeg;base64,${data.audioContent}`;
        audio.load();
      });

      console.log("TTS Queue: Audio finished, resetting flag and checking queue");
      isProcessingQueueRef.current = false;
      
      // Process next item if any
      if (audioQueueRef.current.length > 0) {
        console.log("TTS Queue: More items in queue, processing next...");
        setTimeout(() => processNextInQueue(), 100);
      } else {
        console.log("TTS Queue: Queue empty, done");
        setIsPlayingAudio(false);
      }

    } catch (err) {
      console.error("TTS Queue: Unexpected error:", err);
      isProcessingQueueRef.current = false;
      audioRef.current = null;
      
      // Continue with next item even on error
      if (audioQueueRef.current.length > 0) {
        setTimeout(() => processNextInQueue(), 100);
      } else {
        setIsPlayingAudio(false);
      }
    }
  }, []);

  const playTextAsAudio = useCallback((text: string) => {
    if (!text || text.trim().length === 0) {
      console.log("TTS: Empty text, skipping");
      return;
    }

    const trimmedText = text.trim();
    console.log("TTS: playTextAsAudio called with:", trimmedText.substring(0, 50) + "...");
    console.log("TTS: Current queue length:", audioQueueRef.current.length);
    console.log("TTS: isProcessingQueue:", isProcessingQueueRef.current);
    
    // Add to queue
    audioQueueRef.current.push(trimmedText);
    console.log("TTS: Added to queue, new length:", audioQueueRef.current.length);
    
    // Start processing (will be skipped if already processing)
    processNextInQueue();
  }, [processNextInQueue]);

  const stopAudio = useCallback(() => {
    console.log("TTS: stopAudio called");
    
    // Clear the queue
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
      } catch (e) {
        console.log("TTS: Error stopping audio", e);
      }
      audioRef.current = null;
    }
    
    setIsPlayingAudio(false);
    console.log("TTS: Audio stopped and queue cleared");
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
