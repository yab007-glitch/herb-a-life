"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LANGUAGES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  detectedLocale: Locale | null;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [detectedLocale, setDetectedLocale] = useState<Locale | null>(null);
  const [dict, setDict] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize locale from localStorage or browser
  useEffect(() => {
    const saved = localStorage.getItem("1herb-locale");
    if (saved && LANGUAGES.find(l => l.code === saved)) {
      setLocaleState(saved as Locale);
    } else {
      // Try browser language
      const browserLang = navigator.language.split("-")[0];
      if (LANGUAGES.find(l => l.code === browserLang)) {
        setDetectedLocale(browserLang as Locale);
      }
    }
  }, []);

  // Load dictionary when locale changes
  useEffect(() => {
    const loadDict = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/i18n?locale=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setDict(data);
        }
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDict();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("1herb-locale", newLocale);
    document.cookie = `1herb-locale=${newLocale};path=/;max-age=31536000`;
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
    <I18nContext.Provider value={{ locale, setLocale, t, detectedLocale, isLoading }}>
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