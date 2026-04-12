"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RecentSearches,
  useSaveSearch,
} from "@/components/herbs/recent-searches";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/i18n-provider";

interface SmartSearchProps {
  defaultValue?: string;
  category?: string;
}

export function SmartSearch({ defaultValue = "", category }: SmartSearchProps) {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);
  const saveSearch = useSaveSearch();
  const timeoutRef = useRef<number | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();

      if (trimmed) {
        params.set("q", trimmed);
        saveSearch(trimmed);
      } else {
        params.delete("q");
      }

      if (category) {
        params.set("category", category);
      }

      setIsSearching(true);
      router.push(`/herbs?${params.toString()}`);
    },
    [category, router, searchParams, saveSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        handleSearch(value);
      }, 500);
    },
    [handleSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    handleSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    if (category) {
      params.set("category", category);
    }
    router.push(`/herbs?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={handleChange}
            className={cn(
              "h-12 pl-10 pr-10 transition-all",
              isSearching && "animate-pulse"
            )}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button type="submit" className="h-12" disabled={isSearching}>
          {isSearching ? t("search.searching") : t("search.search")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 gap-2"
          onClick={async () => {
            try {
              const res = await fetch("/api/herbs/random");
              if (res.ok) {
                const data = await res.json();
                if (data?.slug) {
                  router.push(`/herbs/${data.slug}`);
                }
              }
            } catch {
              router.push("/herbs");
            }
          }}
        >
          <Shuffle className="size-4" />
          {t("search.surpriseMe")}
        </Button>
      </form>
      <RecentSearches />
    </div>
  );
}
