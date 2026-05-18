"use client";

import { useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";

export function useDetectedLocale(): Locale | null {
  return useMemo(() => {
    if (typeof window === "undefined") return null;

    const saved = localStorage.getItem("herbally-locale");
    if (saved) return null;

    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "fr" || browserLang === "en") {
      return browserLang as Locale;
    }

    return null;
  }, []);
}
