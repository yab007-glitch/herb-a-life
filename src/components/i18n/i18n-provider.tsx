"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { fr } from "@/lib/i18n/dictionaries/fr";

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  fr: fr as Record<string, unknown>,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  detectedLocale: Locale | null;
  isLoading: boolean;
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
  // Hydration is complete after initial render since we use lazy init
  const isLoading = false;

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("herbally-locale", newLocale);
    document.cookie = `herbally-locale=${newLocale};path=/;max-age=31536000`;
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dict;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== "string") {
      return key;
    }

    if (params) {
      return value.replace(/{(\w+)}/g, (_, param) => {
        return String(params[param] ?? `{${param}}`);
      });
    }

    return value;
  };

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, detectedLocale, isLoading }}
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
