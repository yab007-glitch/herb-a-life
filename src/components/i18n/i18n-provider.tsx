"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { lookupTranslation } from "@/lib/i18n/utils";
import enDict from "@/lib/i18n/dictionaries/en.json";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  detectedLocale: Locale | null;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const saved = localStorage.getItem("herbally-locale");
  if (saved && (saved === "en" || saved === "fr")) {
    return saved as Locale;
  }

  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "fr" || browserLang === "en") {
    const detected = browserLang as Locale;
    localStorage.setItem("herbally-locale", detected);
    return detected;
  }

  return DEFAULT_LOCALE;
}

function getDetectedLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("herbally-locale");
  if (saved) return null; // User already has preference saved

  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "fr" || browserLang === "en") {
    return browserLang as Locale;
  }
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [detectedLocale] = useState<Locale | null>(getDetectedLocale);
  const [frDict, setFrDict] = useState<Record<string, unknown> | null>(null);
  const frLoadStarted = useRef(false);

  // Load French dictionary on demand (code-split, not in initial bundle)
  useEffect(() => {
    if (locale === "fr" && !frLoadStarted.current) {
      frLoadStarted.current = true;
      import("@/lib/i18n/dictionaries/fr.json").then((mod) => {
        setFrDict(mod.default as Record<string, unknown>);
      });
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("herbally-locale", newLocale);
    document.cookie = `herbally-locale=${newLocale};path=/;max-age=31536000`;
  };

  // Build current dictionary: English is always available, French loads on demand
  const dict =
    locale === "fr" && frDict
      ? frDict
      : (enDict as Record<string, unknown>);

  const t = (key: string, params?: Record<string, string | number>): string => {
    return lookupTranslation(dict, key, params);
  };

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, detectedLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
