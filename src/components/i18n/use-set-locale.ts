"use client";

import { useCallback } from "react";
import type { Locale } from "@/lib/i18n/config";

export function useSetLocale() {
  return useCallback((locale: Locale) => {
    document.cookie = `herbally-locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  }, []);
}
