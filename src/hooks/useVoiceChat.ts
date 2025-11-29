import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseVoiceChatProps {
  onTranscription: (text: string) => void;
  onError: (error: string) => void;
}

interface AudioQueueItem {
  text: string;
}

export const useVoiceChat = ({ onTranscription, onError }: UseVoiceChatProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<AudioQueueItem[]>([]);
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

  // Process audio queue one item at a time
  const processAudioQueue = useCallback(async () => {
    if (isProcessingQueueRef.current) {
      console.log("TTS Queue: Already processing, skipping");
      return;
    }

    if (audioQueueRef.current.length === 0) {
      console.log("TTS Queue: Empty, nothing to process");
      setIsPlayingAudio(false);
      return;
    }

    isProcessingQueueRef.current = true;
    const item = audioQueueRef.current.shift();

    if (!item || !item.text.trim()) {
      console.log("TTS Queue: Empty item, skipping to next");
      isProcessingQueueRef.current = false;
      setTimeout(() => processAudioQueue(), 50);
      return;
    }

    try {
      console.log("TTS Queue: Processing item:", item.text.substring(0, 50) + "...");
      setIsPlayingAudio(true);

      const { data, error } = await supabase.functions.invoke("text-to-voice", {
        body: { text: item.text.trim() },
      });

      console.log("TTS Queue: Response received", { hasData: !!data, hasError: !!error });

      if (error) {
        console.error("TTS Queue: Edge function error:", error);
        onError("Błąd generowania głosu: " + error.message);
        isProcessingQueueRef.current = false;
        setTimeout(() => processAudioQueue(), 50);
        return;
      }

      if (!data?.audioContent) {
        console.error("TTS Queue: No audio content");
        isProcessingQueueRef.current = false;
        setTimeout(() => processAudioQueue(), 50);
        return;
      }

      console.log("TTS Queue: Creating audio element, content length:", data.audioContent.length);

      // Play audio using Promise-based approach
      await playAudioFromBase64(data.audioContent);
      
      console.log("TTS Queue: Audio finished, processing next");
      isProcessingQueueRef.current = false;
      
      // Check if there are more items in the queue
      if (audioQueueRef.current.length > 0) {
        console.log("TTS Queue: More items in queue, continuing...");
        setTimeout(() => processAudioQueue(), 100);
      } else {
        console.log("TTS Queue: Queue empty, done");
        setIsPlayingAudio(false);
      }

    } catch (err) {
      console.error("TTS Queue: Unexpected error:", err);
      isProcessingQueueRef.current = false;
      setTimeout(() => processAudioQueue(), 100);
    }
  }, [onError]);

  // Helper function to play audio from base64 and return a Promise
  const playAudioFromBase64 = (base64Audio: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audioRef.current = audio;
      
      audio.onended = () => {
        console.log("TTS: Audio playback ended");
        audioRef.current = null;
        resolve();
      };

      audio.onerror = (e) => {
        console.error("TTS: Audio error:", e);
        audioRef.current = null;
        reject(e);
      };

      audio.src = `data:audio/mpeg;base64,${base64Audio}`;
      
      audio.play().then(() => {
        console.log("TTS: Play started successfully");
      }).catch((playError) => {
        console.error("TTS: Play failed:", playError);
        audioRef.current = null;
        reject(playError);
      });
    });
  };

  const playTextAsAudio = useCallback((text: string) => {
    if (!text || text.trim().length === 0) {
      console.log("TTS: No text provided, skipping");
      return;
    }

    console.log("TTS: Adding to queue:", text.substring(0, 50) + "...");
    
    // Add to queue
    audioQueueRef.current.push({ text: text.trim() });
    
    // Start processing if not already
    processAudioQueue();
  }, [processAudioQueue]);

  const stopAudio = useCallback(() => {
    // Clear the queue
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
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
