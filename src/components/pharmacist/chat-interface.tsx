"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Trash2,
  Mic,
  MicOff,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  createChatSession,
  updateChatSession,
  getChatSession,
  type ChatSession,
} from "@/lib/actions/chat-local";
import {
  createPersistedSession,
  getPersistedSession,
  addPersistedMessage,
  deletePersistedSession,
  getPersistedSessions,
  type PersistedChatSession,
} from "@/lib/actions/chat-persist";
import type { ChatMessage } from "@/lib/actions/chat";
import { useI18n } from "@/components/i18n/i18n-provider";

type Message = ChatMessage;

function makeId() {
  return Math.random().toString(36).slice(2);
}

export function ChatInterface({
  herbContext,
  autoQuery,
  sessionId,
}: {
  herbContext?: string | null;
  autoQuery?: string | null;
  sessionId?: string | null;
}) {
  const { locale, t } = useI18n();
  
  function createInitialMessage(): Message {
    return {
      role: "assistant",
      content: t("pharmacist.initialMessage"),
      id: makeId(),
      timestamp: new Date().toISOString(),
    };
  }
  
  const [messages, setMessages] = useState<Message[]>(() => [
    createInitialMessage(),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSent, setAutoSent] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(
    sessionId || null
  );
  const [isSaving, setIsSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing session if sessionId provided (try server, fall back to localStorage)
  useEffect(() => {
    async function loadSession() {
      if (!sessionId) return;
      
      // Try server persistence first
      const serverSession = await getPersistedSession(sessionId);
      if (serverSession && serverSession.messages.length > 0) {
        setMessages(serverSession.messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
          id: m.id,
          timestamp: m.createdAt,
        })));
        setCurrentSessionId(sessionId);
        return;
      }
      
      // Fall back to localStorage
      const localSession = getChatSession(sessionId);
      if (localSession) {
        const loadedMessages = localSession.messages as ChatMessage[];
        if (loadedMessages && loadedMessages.length > 0) {
          setMessages(loadedMessages);
        }
        setCurrentSessionId(sessionId);
      }
    }
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-send query when coming from herb detail page
  useEffect(() => {
    if (autoQuery && !autoSent) {
      setAutoSent(true);
      sendMessage(autoQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoQuery, autoSent]);

  // Save messages to server (with localStorage fallback)
  const saveMessages = useCallback(
    async (msgs: Message[]) => {
      // Skip saving if we only have the initial message
      if (msgs.length <= 1) return;

      try {
        setIsSaving(true);

        // Try server persistence first (requires auth)
        const lastUserMsg = msgs.find((m) => m.role === "user");
        const lastAssistantMsg = [...msgs].reverse().find((m) => m.role === "assistant");

        if (!currentSessionId) {
          // Create new session on server
          const session = await createPersistedSession(herbContext || undefined);
          if (session) {
            setCurrentSessionId(session.id);
            // Add all messages
            for (const msg of msgs) {
              if (msg.role === "user" || msg.role === "assistant") {
                await addPersistedMessage(session.id, msg.role, msg.content);
              }
            }
          } else {
            // Fallback to localStorage
            const localSession = createChatSession(herbContext || undefined);
            setCurrentSessionId(localSession.id);
            updateChatSession(localSession.id, msgs);
          }
        } else {
          // Update existing session
          const serverSession = await getPersistedSession(currentSessionId);
          if (serverSession) {
            // Only add new messages (compare by content)
            const existingContent = new Set(serverSession.messages.map((m) => m.content));
            for (const msg of msgs) {
              if (!existingContent.has(msg.content) && (msg.role === "user" || msg.role === "assistant")) {
                await addPersistedMessage(currentSessionId, msg.role, msg.content);
              }
            }
          } else {
            // Fallback to localStorage
            updateChatSession(currentSessionId, msgs);
          }
        }
      } catch (error) {
        console.error("Failed to save chat:", error);
        // Fallback to localStorage
        if (!currentSessionId) {
          const localSession = createChatSession(herbContext || undefined);
          setCurrentSessionId(localSession.id);
          updateChatSession(localSession.id, msgs);
        } else {
          updateChatSession(currentSessionId, msgs);
        }
      } finally {
        setIsSaving(false);
      }
    },
    [currentSessionId, herbContext]
  );

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      id: makeId(),
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
          herbContext: herbContext ?? undefined,
          locale,
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
        id: makeId(),
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
            idx === prev.length - 1 ? { ...msg, content: current } : msg
          )
        );
      }

      // Save messages after response completes
      const finalMessages = [
        ...allMessages,
        { ...assistantMessage, content: accumulated },
      ];
      saveMessages(finalMessages);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content: t("pharmacist.error"),
        id: makeId(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  async function clearChat() {
    setMessages([createInitialMessage()]);
    if (currentSessionId) {
      await deletePersistedSession(currentSessionId);
    }
    setCurrentSessionId(null);
    setAutoSent(false);
  }

  const suggestedQuestions = [
    t("pharmacist.suggestedQuestions.0"),
    t("pharmacist.suggestedQuestions.1"),
    t("pharmacist.suggestedQuestions.2"),
    t("pharmacist.suggestedQuestions.3"),
  ];

  const showSuggestions = messages.length <= 1 && !isLoading;
  const lastMessage = messages[messages.length - 1];
  const showFollowUps =
    !isLoading && lastMessage?.role === "assistant" && messages.length > 1;

  function getFollowUpQuestions(content: string): string[] {
    const lower = content.toLowerCase();
    const questions: string[] = [];

    if (
      lower.includes("dosage") ||
      lower.includes("dose") ||
      lower.includes("mg") ||
      lower.includes("ml")
    ) {
      questions.push(t("pharmacist.followUp.childDosage"));
    } else {
      questions.push(t("pharmacist.followUp.recommendedDosage"));
    }

    if (lower.includes("interaction") || lower.includes("contraindic")) {
      questions.push(t("pharmacist.followUp.saferAlternatives"));
    } else {
      questions.push(t("pharmacist.followUp.interactions"));
    }

    if (lower.includes("side effect") || lower.includes("adverse")) {
      questions.push(t("pharmacist.followUp.sideEffects"));
    } else {
      questions.push(t("pharmacist.followUp.sideEffectsInfo"));
    }

    return questions;
  }

  const followUpQuestions = showFollowUps
    ? getFollowUpQuestions(lastMessage.content)
    : [];

  // Voice input
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<ReturnType<typeof createRecognition>>(null);

  function createRecognition() {
    if (typeof window === "undefined") return null;
    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    return new (SpeechRecognition as new () => {
      continuous: boolean;
      interimResults: boolean;
      onresult: ((e: { results: { transcript: string }[][] }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    })();
  }

  function toggleVoice() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = createRecognition();
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript;
      if (transcript) {
        setInput((prev) => prev + transcript);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }

  const hasVoiceSupport =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: "60vh", minHeight: "400px" }}
        role="log"
        aria-label="Chat messages"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-message-in",
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
                  "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed transition-all",
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

          {/* Suggested questions for initial state */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Follow-up suggestions */}
          {showFollowUps && (
            <div className="flex flex-wrap gap-2 pt-1 animate-message-in">
              {followUpQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t bg-amber-50/50 px-4 py-2 dark:bg-amber-950/10">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
            <AlertCircle className="size-3 shrink-0" />
            {t("pharmacist.disclaimer")}
          </p>
          {messages.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearChat}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              aria-label="Clear chat"
            >
              <Trash2 className="size-3" />
              {t("pharmacist.clear")}
            </Button>
          )}
        </div>
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
            placeholder={t("pharmacist.placeholder")}
            className="min-h-[44px] max-h-32 resize-none focus-ring-animated"
            rows={1}
            disabled={isLoading}
            aria-label="Chat message input"
          />
          {hasVoiceSupport && (
            <Button
              type="button"
              size="icon"
              variant={isListening ? "destructive" : "outline"}
              onClick={toggleVoice}
              className="shrink-0 md:hidden"
              aria-label={
                isListening ? t("pharmacist.voiceStop") : t("pharmacist.voiceStart")
              }
            >
              {isListening ? (
                <MicOff className="size-4" />
              ) : (
                <Mic className="size-4" />
              )}
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </form>
        {isSaving && (
          <p className="mt-1 text-xs text-muted-foreground">{t("pharmacist.saving")}</p>
        )}
      </div>
    </div>
  );
}
