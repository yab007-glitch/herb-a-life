// Supported languages - English and French only
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
] as const;

export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'fr'] as const;

export type Locale = 'en' | 'fr';

// Country to language mapping
export const COUNTRY_TO_LANG: Record<string, Locale> = {
  // English
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en', PH: 'en', CA: 'en',
  // French
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr',
};