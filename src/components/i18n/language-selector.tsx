"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, type Locale } from "@/lib/i18n/config";
import { getLanguageSuggestions } from "@/lib/i18n/client";

interface LanguageSelectorProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  detectedLocale?: Locale | null;
}

export function LanguageSelector({ currentLocale, onLocaleChange, detectedLocale }: LanguageSelectorProps) {
  const [search, setSearch] = useState("");
  
  const suggestions = getLanguageSuggestions(detectedLocale ?? null);
  const current = LANGUAGES.find(l => l.code === currentLocale);
  const filtered = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-[80vh] overflow-y-auto">
        {/* Detected language suggestion */}
        {detectedLocale && detectedLocale !== currentLocale && (
          <div className="px-2 py-1.5 text-xs text-muted-foreground border-b">
            <span>Suggested based on your location: </span>
            <button
              onClick={() => onLocaleChange(detectedLocale)}
              className="text-primary hover:underline font-medium"
            >
              {LANGUAGES.find(l => l.code === detectedLocale)?.nativeName}
            </button>
          </div>
        )}

        {/* Current selection at top */}
        {current && (
          <>
            <DropdownMenuItem
              onClick={() => onLocaleChange(currentLocale)}
              className="font-medium bg-muted/50"
            >
              <span className="flex items-center justify-between w-full">
                <span>
                  <span className="mr-2">{current.flag}</span>
                  {current.nativeName}
                </span>
                <Check className="size-4 text-primary" />
              </span>
            </DropdownMenuItem>
            <div className="border-b my-1" />
          </>
        )}

        {/* Top spoken languages */}
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Popular languages
        </div>
        {suggestions.filter(l => l.code !== currentLocale).slice(0, 5).map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLocaleChange(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.nativeName}
            <span className="ml-auto text-xs text-muted-foreground">
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}

        <div className="border-t my-1" />

        {/* Search */}
        <div className="px-2 py-1">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* All languages */}
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          All languages ({LANGUAGES.length})
        </div>
        {filtered.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLocaleChange(lang.code)}
            className={lang.code === currentLocale ? "bg-muted/50 font-medium" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.nativeName}
            <span className="ml-auto text-xs text-muted-foreground">
              {lang.name}
            </span>
            {lang.code === currentLocale && (
              <Check className="size-4 ml-2 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}