"use client";

import { useState, useCallback, useEffect } from "react";
import { LANGUAGES, DEFAULT_LOCALE, COUNTRY_TO_LANG, type Locale } from "@/lib/i18n/config";

const LOCALE_STORAGE_KEY = "1herb-locale";

// Type for language array (mutable)
type LanguageArray = typeof LANGUAGES[number][];

// Get locale from localStorage (client-side)
export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [detectedLocale, setDetectedLocale] = useState<Locale | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Try to detect locale from browser/IP
    const detectLocale = async () => {
      // First check localStorage for saved preference
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && LANGUAGES.find(l => l.code === saved)) {
        setLocaleState(saved as Locale);
        setMounted(true);
        return;
      }

      // Try browser language
      const browserLang = navigator.language.split("-")[0];
      if (LANGUAGES.find(l => l.code === browserLang)) {
        setDetectedLocale(browserLang as Locale);
        setLocaleState(browserLang as Locale);
      }

      setMounted(true);
    };

    detectLocale();
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  return { locale, setLocale, detectedLocale, mounted };
}

// Get country from IP (server-side detection)
export async function getLocaleFromIP(): Promise<Locale | null> {
  try {
    // Use a free IP geolocation service
    const res = await fetch("https://ipapi.co/json/", {
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const countryCode = data.country_code as string;
    
    return COUNTRY_TO_LANG[countryCode] || null;
  } catch {
    return null;
  }
}

// Get language suggestions based on detected locale
export function getLanguageSuggestions(detectedLocale: Locale | null): LanguageArray {
  if (!detectedLocale || detectedLocale === DEFAULT_LOCALE) {
    // Return top 5 most spoken languages
    return LANGUAGES.slice(0, 5) as LanguageArray;
  }

  // Put detected language first, then top 4 others
  const detected = LANGUAGES.find(l => l.code === detectedLocale);
  const others = LANGUAGES.filter(l => l.code !== detectedLocale).slice(0, 4) as LanguageArray;
  
  return detected ? [detected, ...others] : (LANGUAGES.slice(0, 5) as LanguageArray);
}