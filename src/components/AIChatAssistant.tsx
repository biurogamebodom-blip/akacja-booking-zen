import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useVoiceChat } from "@/hooks/useVoiceChat";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>(messages);
  const autoPlayVoiceRef = useRef(autoPlayVoice);
  const playTextAsAudioRef = useRef<((text: string) => void) | null>(null);
  const { toast } = useToast();

  // Keep refs in sync with state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    autoPlayVoiceRef.current = autoPlayVoice;
  }, [autoPlayVoice]);

  const {
    isRecording,
    isProcessing,
    isPlayingAudio,
    startRecording,
    stopRecording,
    playTextAsAudio,
    stopAudio,
  } = useVoiceChat({
    onTranscription: (text) => {
      setInput(text);
      // Auto-send the transcribed message - use a small delay to ensure state is updated
      setTimeout(() => {
        sendMessageWithTextRef.current?.(text);
      }, 50);
    },
    onError: (error) => {
      toast({
        title: "Błąd głosu",
        description: error,
        variant: "destructive",
      });
    },
  });

  // Keep playTextAsAudio ref updated
  useEffect(() => {
    playTextAsAudioRef.current = playTextAsAudio;
  }, [playTextAsAudio]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ref for the sendMessageWithText function to avoid stale closures
  const sendMessageWithTextRef = useRef<((text: string) => Promise<void>) | null>(null);

  const sendMessageWithText = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    const currentMessages = messagesRef.current;
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("AI Chat: Sending message to AI:", text);
      const response = await supabase.functions.invoke("ai-assistant", {
        body: { messages: [...currentMessages, userMessage] },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-play voice response if enabled - use refs for current values
      console.log("AI Chat: AutoPlayVoice ref value:", autoPlayVoiceRef.current);
      console.log("AI Chat: Reply:", response.data.reply?.substring(0, 50));
      console.log("AI Chat: playTextAsAudioRef.current exists:", !!playTextAsAudioRef.current);
      
      if (autoPlayVoiceRef.current && response.data.reply && playTextAsAudioRef.current) {
        console.log("AI Chat: Calling playTextAsAudio via ref for response");
        playTextAsAudioRef.current(response.data.reply);
      }
    } catch (error) {
      console.error("AI Assistant error:", error);
      const errorMessage = "Przepraszam, wystąpił błąd. W celu uzyskania informacji, prosimy o kontakt telefoniczny: 505 445 353";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies - we use refs for everything

  // Keep the ref updated with the latest function
  useEffect(() => {
    sendMessageWithTextRef.current = sendMessageWithText;
  }, [sendMessageWithText]);

  const sendMessage = async () => {
    await sendMessageWithText(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
    if (isPlayingAudio) {
      stopAudio();
    }
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
                <h3 className="font-semibold text-accent-foreground">
                  Asystent AI
                </h3>
                <p className="text-xs text-accent-foreground/80">
                  Apartamenty Akacja
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Voice Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAutoPlayVoice}
                className="text-accent-foreground hover:bg-accent-foreground/10"
                aria-label={autoPlayVoice ? "Wyłącz odpowiedzi głosowe" : "Włącz odpowiedzi głosowe"}
                title={autoPlayVoice ? "Odpowiedzi głosowe włączone" : "Odpowiedzi głosowe wyłączone"}
              >
                {autoPlayVoice ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/10"
                aria-label="Zamknij czat"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
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
              {/* Microphone Button */}
              <Button
                onClick={handleMicClick}
                disabled={isLoading || isProcessing}
                size="icon"
                variant={isRecording ? "destructive" : "outline"}
                className={`shrink-0 transition-all duration-300 ${
                  isRecording 
                    ? "animate-pulse bg-destructive hover:bg-destructive/90" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                aria-label={isRecording ? "Zatrzymaj nagrywanie" : "Rozpocznij nagrywanie wiadomości głosowej"}
                title={isRecording ? "Kliknij, aby zakończyć nagrywanie" : "Kliknij, aby nagrać wiadomość głosową"}
              >
                {isRecording ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRecording ? "Nagrywam..." : "Napisz wiadomość..."}
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus-ring text-sm"
                disabled={isLoading || isRecording || isProcessing}
                aria-label="Wpisz wiadomość"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading || isRecording || isProcessing}
                size="icon"
                className="gradient-ocean"
                aria-label="Wyślij wiadomość"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
                Nagrywanie... Kliknij ponownie, aby zakończyć
              </div>
            )}

            {/* Playing audio indicator */}
            {isPlayingAudio && (
              <div className="mt-2 flex items-center gap-2 text-xs text-accent">
                <Volume2 className="w-3 h-3 animate-pulse" />
                Odtwarzam odpowiedź...
                <button 
                  onClick={stopAudio}
                  className="underline hover:no-underline"
                >
                  Zatrzymaj
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
