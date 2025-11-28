import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("ai-assistant", {
        body: { messages: [...messages, userMessage] },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Przepraszam, wystąpił błąd. W celu uzyskania informacji, prosimy o kontakt telefoniczny: 505 445 353",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-xl rounded-bl-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Napisz wiadomość..."
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus-ring text-sm"
                disabled={isLoading}
                aria-label="Wpisz wiadomość"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="gradient-ocean"
                aria-label="Wyślij wiadomość"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
