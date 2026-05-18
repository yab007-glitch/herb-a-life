"use client";

import { Send, Square, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  isListening: boolean;
  hasVoiceSupport: boolean;
  onSubmit: () => void;
  onStop: () => void;
  onToggleVoice: () => void;
  placeholder: string;
  voiceStartLabel: string;
  voiceStopLabel: string;
}

export function ChatInput({
  input,
  setInput,
  isLoading,
  isListening,
  hasVoiceSupport,
  onSubmit,
  onStop,
  onToggleVoice,
  placeholder,
  voiceStartLabel,
  voiceStopLabel,
}: ChatInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="shrink-0 border-t p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mx-auto flex max-w-3xl items-end gap-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
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
            onClick={onToggleVoice}
            className="shrink-0"
            aria-label={isListening ? voiceStopLabel : voiceStartLabel}
          >
            {isListening ? (
              <MicOff className="size-4" />
            ) : (
              <Mic className="size-4" />
            )}
          </Button>
        )}
        {isLoading ? (
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={onStop}
            aria-label="Stop generating"
            className="animate-pulse"
          >
            <Square className="size-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
