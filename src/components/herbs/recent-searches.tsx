"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MAX_RECENT = 5;
const STORAGE_KEY = "herbwise-recent-searches";

export function RecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadSearches = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setSearches(JSON.parse(saved));
        } catch {
          // Ignore parse errors
        }
      }
      setMounted(true);
    };

    // Defer to avoid sync setState in effect
    const timer = setTimeout(loadSearches, 0);
    return () => clearTimeout(timer);
  }, []);

  const clearSearch = (term: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = searches.filter((s) => s !== term);
    setSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    setSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!mounted || searches.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>Recent searches</span>
        </div>
        <button
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((term) => (
          <Link key={term} href={`/herbs?q=${encodeURIComponent(term)}`}>
            <Badge
              variant="outline"
              className="group cursor-pointer border-border/50 bg-muted/30 transition-all hover:border-primary/50 hover:bg-primary/5 pr-6 relative"
            >
              {term}
              <button
                onClick={(e) => clearSearch(term, e)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/10 transition-opacity"
              >
                <X className="size-3" />
              </button>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Hook for saving searches
export function useSaveSearch() {
  return (query: string) => {
    if (!query.trim()) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const existing: string[] = saved ? JSON.parse(saved) : [];

    const updated = [
      query.trim(),
      ...existing.filter((s) => s !== query.trim()),
    ].slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };
}
