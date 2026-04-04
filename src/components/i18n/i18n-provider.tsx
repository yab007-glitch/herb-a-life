"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { LANGUAGES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  detectedLocale: Locale | null;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Get initial locale from localStorage or browser (called once on mount)
function getInitialLocale(): { locale: Locale; detected: Locale | null } {
  if (typeof window === "undefined") {
    return { locale: DEFAULT_LOCALE, detected: null };
  }

  // Check localStorage first
  const saved = localStorage.getItem("1herb-locale");
  if (saved && LANGUAGES.find(l => l.code === saved)) {
    return { locale: saved as Locale, detected: null };
  }

  // Try browser language
  const browserLang = navigator.language.split("-")[0];
  if (LANGUAGES.find(l => l.code === browserLang)) {
    return { locale: DEFAULT_LOCALE, detected: browserLang as Locale };
  }

  return { locale: DEFAULT_LOCALE, detected: null };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => getInitialLocale(), []);
  const [locale, setLocaleState] = useState<Locale>(initial.locale);
  const [detectedLocale] = useState<Locale | null>(initial.detected);
  const [dict, setDict] = useState<Record<string, unknown>>({});

  // Load dictionary when locale changes
  const loadDict = async (loc: Locale) => {
    try {
      const res = await fetch(`/api/i18n?locale=${loc}`);
      if (res.ok) {
        const data = await res.json();
        setDict(data);
      }
    } catch {
      console.error("Failed to load dictionary");
    }
  };

  // Load initial dictionary
  useMemo(() => {
    if (typeof window !== "undefined") {
      loadDict(locale);
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("1herb-locale", newLocale);
    document.cookie = `1herb-locale=${newLocale};path=/;max-age=31536000`;
    loadDict(newLocale);
  };

  // Translation function with nested key support and interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
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
    <I18nContext.Provider value={{ locale, setLocale, t, detectedLocale }}>
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