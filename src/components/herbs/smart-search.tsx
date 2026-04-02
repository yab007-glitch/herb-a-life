"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SmartSearch({
  defaultValue,
  category,
}: {
  defaultValue?: string;
  category?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue ?? "");
  const [isInterpreting, setIsInterpreting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function isNaturalLanguage(text: string): boolean {
    const words = text.trim().split(/\s+/);
    // If it's 3+ words or contains common phrase indicators, use AI
    if (words.length >= 3) return true;
    if (/\b(my|i have|i feel|i can't|i cannot|after|when|help|cure|treat|remedy|relieve)\b/i.test(text)) return true;
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (!isNaturalLanguage(trimmed)) {
      // Simple keyword — search directly
      const params = new URLSearchParams({ q: trimmed });
      if (category) params.set("category", category);
      router.push(`/herbs?${params.toString()}`);
      return;
    }

    // Natural language — use AI to interpret
    setIsInterpreting(true);
    try {
      const res = await fetch("/api/interpret-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data = await res.json();
      const keywords: string[] = data.keywords ?? [trimmed];

      // Search with the first (most relevant) keyword
      const params = new URLSearchParams({ q: keywords[0] });
      if (category) params.set("category", category);
      router.push(`/herbs?${params.toString()}`);
    } catch {
      // Fallback to direct search
      const params = new URLSearchParams({ q: trimmed });
      if (category) params.set("category", category);
      router.push(`/herbs?${params.toString()}`);
    } finally {
      setIsInterpreting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative max-w-lg"
    >
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe what you need help with (e.g. 'my stomach hurts after eating')..."
        className="pl-10 pr-24"
        disabled={isInterpreting}
      />
      <Button
        type="submit"
        size="sm"
        disabled={!query.trim() || isInterpreting}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 gap-1"
      >
        {isInterpreting ? (
          <>
            <Loader2 className="size-3 animate-spin" />
            AI
          </>
        ) : (
          <>
            <Sparkles className="size-3" />
            Search
          </>
        )}
      </Button>
    </form>
  );
}
