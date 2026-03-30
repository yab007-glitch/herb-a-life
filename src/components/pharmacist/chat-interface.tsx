"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! I'm your Virtual Herbalist. I can help you with questions about medicinal herbs, potential drug interactions, dosage guidance, and general herbal medicine information.\n\nPlease note that my advice is for educational purposes only and should not replace consultation with a qualified healthcare provider.\n\nHow can I help you today?",
  timestamp: new Date().toISOString(),
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        const current = accumulated;

        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, content: current }
              : msg
          )
        );
      }
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: "60vh", minHeight: "400px" }}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
              {message.role === "user" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="size-4" />
              </div>
              <div className="rounded-lg bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t bg-amber-50/50 px-4 py-2 dark:bg-amber-950/10">
        <p className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
          <AlertCircle className="size-3 shrink-0" />
          This AI assistant provides educational information only. Always
          consult a healthcare provider for medical advice.
        </p>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-2"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about herbs, interactions, dosages..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            <Send className="size-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
