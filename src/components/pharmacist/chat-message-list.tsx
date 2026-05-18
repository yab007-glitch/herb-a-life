"use client";

import { Bot, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/actions/chat";

interface Message extends ChatMessage {
  id: string;
  timestamp: string;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  copiedId: string | null;
  onCopy: (content: string, id: string) => void;
  t: (key: string) => string;
  followUpQuestions: string[];
  onFollowUp: (question: string) => void;
  showFollowUps: boolean;
}

export function ChatMessageList({
  messages,
  isLoading,
  copiedId,
  onCopy,
  t,
  followUpQuestions,
  onFollowUp,
  showFollowUps,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          const isAssistant = msg.role === "assistant";
          const isError = isAssistant && msg.content.includes("error");

          return (
            <div
              key={msg.id || idx}
              className={cn(
                "flex gap-3",
                isAssistant ? "justify-start" : "justify-end",
                idx > 0 && "animate-message-in"
              )}
            >
              {isAssistant && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>
              )}

              <div
                className={cn(
                  "group relative max-w-[85%] rounded-lg px-4 py-3",
                  isAssistant
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground",
                  isError && "border border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content || "…"}</ReactMarkdown>
                </div>

                {isAssistant && msg.content && (
                  <button
                    onClick={() => onCopy(msg.content, msg.id || String(idx))}
                    className="absolute -right-8 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Copy message"
                  >
                    {copiedId === (msg.id || String(idx)) ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>

              {!isAssistant && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="size-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3 animate-message-in">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-4 animate-pulse" />
            </div>
            <div className="rounded-lg bg-muted px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {t("pharmacist.thinking")}
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-primary/70 animate-typing-dot" />
                  <span className="size-2 rounded-full bg-primary/70 animate-typing-dot [animation-delay:160ms]" />
                  <span className="size-2 rounded-full bg-primary/70 animate-typing-dot [animation-delay:320ms]" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Follow-up suggestion chips */}
        {showFollowUps && (
          <div className="flex flex-wrap gap-2 pt-1 animate-message-in">
            {followUpQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onFollowUp(q)}
                className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
