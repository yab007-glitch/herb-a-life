// Supported languages - English and French only
export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
] as const;

export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "fr"] as const;

export type Locale = "en" | "fr";
