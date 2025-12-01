import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Witam! Jestem asystentem Apartamentów Akacja. Chętnie odpowiem na pytania dotyczące naszych apartamentów. W czym mogę pomóc?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoPlayVoice, setAutoPlayVoice] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const messagesRef = useRef<Message[]>(messages);
  const autoPlayVoiceRef = useRef(autoPlayVoice);
  const { toast } = useToast();

  // Keep refs in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    autoPlayVoiceRef.current = autoPlayVoice;
  }, [autoPlayVoice]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // TTS function with queue to handle multiple messages
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingQueueRef = useRef(false);

  const processAudioQueue = async () => {
    // Don't start another queue processor if one is running
    if (isProcessingQueueRef.current) {
      console.log("TTS Queue: Already processing, queue length:", audioQueueRef.current.length);
      return;
    }
    
    if (audioQueueRef.current.length === 0) {
      return;
    }

    isProcessingQueueRef.current = true;
    setIsPlayingAudio(true);
    console.log("TTS Queue: Starting, items:", audioQueueRef.current.length);

    try {
      while (audioQueueRef.current.length > 0) {
        const text = audioQueueRef.current.shift()!;
        console.log("TTS Queue: Processing, remaining:", audioQueueRef.current.length);

        try {
          console.log("TTS Queue: Calling text-to-voice API...");
          const { data, error } = await supabase.functions.invoke("text-to-voice", {
            body: { text },
          });

          if (error) {
            console.error("TTS Queue: API error:", error);
            continue;
          }

          if (!data?.audioContent) {
            console.error("TTS Queue: No audio content in response, data:", data);
            continue;
          }

          console.log("TTS Queue: Got audio, size:", data.audioContent.length, "chars");
          
          // Play audio with timeout fallback
          await new Promise<void>((resolve) => {
            let resolved = false;
            const safeResolve = () => {
              if (!resolved) {
                resolved = true;
                currentAudioRef.current = null;
                resolve();
              }
            };

            const audioDataUrl = `data:audio/mpeg;base64,${data.audioContent}`;
            console.log("TTS Queue: Creating audio element, data URL length:", audioDataUrl.length);
            
            const audio = new Audio();
            currentAudioRef.current = audio;
            
            // Timeout fallback - max 2 minutes per audio
            const timeoutId = setTimeout(() => {
              console.warn("TTS Queue: Timeout, moving to next");
              safeResolve();
            }, 120000);
            
            audio.oncanplaythrough = () => {
              console.log("TTS Queue: Audio can play through, duration:", audio.duration);
            };
            
            audio.onloadeddata = () => {
              console.log("TTS Queue: Audio loaded, playing...");
              audio.play()
                .then(() => console.log("TTS Queue: Started playing"))
                .catch((err) => {
                  console.error("TTS Queue: Play failed:", err);
                  clearTimeout(timeoutId);
                  safeResolve();
                });
            };
            
            audio.onended = () => {
              console.log("TTS Queue: Ended normally");
              clearTimeout(timeoutId);
              safeResolve();
            };
            
            audio.onerror = (e) => {
              console.error("TTS Queue: Audio error:", e, "readyState:", audio.readyState);
              clearTimeout(timeoutId);
              safeResolve();
            };

            // Set source and trigger load
            audio.src = audioDataUrl;
            audio.load();
          });
          
        } catch (err) {
          console.error("TTS Queue: Error:", err);
        }
        
        // Small delay between items
        if (audioQueueRef.current.length > 0) {
          await new Promise(r => setTimeout(r, 200));
        }
      }
    } finally {
      isProcessingQueueRef.current = false;
      setIsPlayingAudio(false);
      console.log("TTS Queue: Done");
      
      // Check if new items were added during processing
      if (audioQueueRef.current.length > 0) {
        console.log("TTS Queue: New items found, restarting...");
        setTimeout(() => processAudioQueue(), 100);
      }
    }
  };

  const queueTTS = (text: string) => {
    if (!text || text.trim().length === 0) {
      console.log("TTS: Empty text, skipping");
      return;
    }
    console.log("TTS: Queueing, queue length:", audioQueueRef.current.length, "isProcessing:", isProcessingQueueRef.current);
    audioQueueRef.current.push(text);
    
    // Start processing - delay slightly to allow queue to build up
    setTimeout(() => processAudioQueue(), 50);
  };

  const stopAudio = () => {
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  // Send message to AI and play response - uses refs to avoid stale closures
  const sendMessageWithText = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const currentMessages = [...messagesRef.current, userMessage];
    
    setMessages(currentMessages);
    messagesRef.current = currentMessages;
    setInput("");
    setIsLoading(true);

    try {
      console.log("AI: Sending message:", text);
      const response = await supabase.functions.invoke("ai-assistant", {
        body: { messages: currentMessages },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const reply = response.data.reply;
      console.log("AI: Got reply:", reply?.substring(0, 50));
      
      const newMessages = [...currentMessages, { role: "assistant" as const, content: reply }];
      setMessages(newMessages);
      messagesRef.current = newMessages;
      setIsLoading(false);

      // Queue TTS using ref to get current autoPlayVoice value
      console.log("AI: autoPlayVoice =", autoPlayVoiceRef.current, "reply exists =", !!reply);
      if (autoPlayVoiceRef.current && reply) {
        console.log("AI: Queueing TTS for reply");
        queueTTS(reply);
      }
      
    } catch (error) {
      console.error("AI: Error:", error);
      const errorMessages = [...currentMessages, {
        role: "assistant" as const,
        content: "Przepraszam, wystąpił błąd. Prosimy o kontakt telefoniczny: 505 445 353",
      }];
      setMessages(errorMessages);
      messagesRef.current = errorMessages;
      setIsLoading(false);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });

      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        
        if (audioChunksRef.current.length > 0) {
          setIsProcessing(true);
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const reader = new FileReader();
            
            reader.onloadend = async () => {
              const base64 = (reader.result as string).split(",")[1];
              
              console.log("STT: Sending audio...");
              const { data, error } = await supabase.functions.invoke("voice-to-text", {
                body: { audio: base64 },
              });

              setIsProcessing(false);

              if (error) {
                console.error("STT: Error:", error);
                toast({ title: "Błąd", description: "Błąd rozpoznawania mowy", variant: "destructive" });
                return;
              }

              if (data?.text) {
                console.log("STT: Got text:", data.text);
                setInput(data.text);
                // Send message directly
                sendMessageWithText(data.text);
              } else {
                toast({ title: "Błąd", description: "Nie rozpoznano mowy", variant: "destructive" });
              }
            };
            
            reader.readAsDataURL(audioBlob);
          } catch (err) {
            console.error("STT: Processing error:", err);
            setIsProcessing(false);
            toast({ title: "Błąd", description: "Błąd przetwarzania głosu", variant: "destructive" });
          }
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Microphone error:", err);
      toast({ title: "Błąd", description: "Brak dostępu do mikrofonu", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped");
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const toggleAutoPlayVoice = () => {
    if (isPlayingAudio) stopAudio();
    setAutoPlayVoice(!autoPlayVoice);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 shadow-elevated hover:shadow-glow transition-all duration-300 gradient-ocean ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        aria-label="Otwórz Asystenta AI"
      >
        <MessageCircle className="w-6 h-6 text-accent-foreground" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Asystent AI"
        >
          {/* Header */}
          <div className="gradient-ocean p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-foreground/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-accent-foreground">Asystent AI</h3>
                <p className="text-xs text-accent-foreground/80">Apartamenty Akacja</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAutoPlayVoice}
                className="text-accent-foreground hover:bg-accent-foreground/10"
                aria-label={autoPlayVoice ? "Wyłącz głos" : "Włącz głos"}
              >
                {autoPlayVoice ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/10"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  message.role === "user"
                    ? "bg-accent text-accent-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {(isLoading || isProcessing) && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-xl rounded-bl-sm flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  <span className="text-sm text-muted-foreground">
                    {isProcessing ? "Przetwarzam głos..." : "Piszę..."}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                onClick={handleMicClick}
                disabled={isLoading || isProcessing}
                size="icon"
                variant={isRecording ? "destructive" : "outline"}
                className={`shrink-0 ${isRecording ? "animate-pulse" : ""}`}
                aria-label={isRecording ? "Zatrzymaj" : "Nagraj"}
              >
                {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessageWithText(input))}
                placeholder={isRecording ? "Nagrywam..." : "Napisz wiadomość..."}
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus-ring text-sm"
                disabled={isLoading || isRecording || isProcessing}
              />
              
              <Button
                onClick={() => sendMessageWithText(input)}
                disabled={!input.trim() || isLoading || isRecording || isProcessing}
                size="icon"
                className="gradient-ocean"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
                Nagrywanie...
              </div>
            )}

            {isPlayingAudio && (
              <div className="mt-2 flex items-center gap-2 text-xs text-accent">
                <Volume2 className="w-3 h-3 animate-pulse" />
                Odtwarzam...
                <button onClick={stopAudio} className="underline">Zatrzymaj</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
