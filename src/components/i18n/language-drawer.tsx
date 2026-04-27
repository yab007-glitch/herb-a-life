"use client";

import { Globe, Check, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LANGUAGES } from "@/lib/i18n/config";
import { useI18n } from "@/components/i18n/i18n-provider";
import { cn } from "@/lib/utils";

interface LanguageDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LanguageDrawer({ open, onOpenChange }: LanguageDrawerProps) {
  const { t, locale, setLocale, detectedLocale } = useI18n();

  function handleSelect(code: string) {
    setLocale(code as "en" | "fr");
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[80vh] rounded-t-2xl px-0 pb-8"
        showCloseButton={false}
      >
        <SheetHeader className="px-6 pb-2">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Globe className="size-5 text-primary" />
              {t("common.language")}
            </SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              aria-label={t("common.close")}
            >
              <X className="size-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="px-4 pt-2">
          {/* Detected language suggestion */}
          {detectedLocale && detectedLocale !== locale && (
            <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                {t("common.suggested")}{" "}
                <button
                  onClick={() => handleSelect(detectedLocale)}
                  className="font-medium text-primary hover:underline"
                >
                  {LANGUAGES.find((l) => l.code === detectedLocale)?.nativeName}
                </button>
              </p>
            </div>
          )}

          {/* Language options */}
          <div className="space-y-1">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors",
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-base",
                        isActive ? "font-semibold" : "font-medium"
                      )}
                    >
                      {lang.nativeName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lang.name}
                    </p>
                  </div>
                  {isActive && (
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
