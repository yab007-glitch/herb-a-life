import { DEFAULT_LOCALE, type Locale } from "./config";
import { lookupTranslation, lookupPluralTranslation } from "./utils";
import enDict from "./dictionaries/en.json";
import frDict from "./dictionaries/fr.json";

// Re-export Locale type
export type { Locale };

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en: enDict,
  fr: frDict,
};

/**
 * Server-side translation function for use in Server Components
 * @param locale - The locale to use (defaults to 'en')
 * @param key - The translation key (e.g., "herbDetail.backToHerbs")
 * @param params - Optional parameters for interpolation
 */
export function getServerTranslation(
  locale: Locale = DEFAULT_LOCALE,
  key: string,
  params?: Record<string, string | number>
): string {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  return lookupTranslation(dict, key, params);
}

/**
 * Server-side plural translation for use in Server Components
 * @param locale - The locale to use (defaults to 'en')
 * @param key - The translation key base (e.g., "herbs.resultsFound")
 * @param count - The numeric count to determine plural form
 * @param params - Optional additional parameters for interpolation
 */
export function getServerPluralTranslation(
  locale: Locale = DEFAULT_LOCALE,
  key: string,
  count: number,
  params?: Record<string, string | number>
): string {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  return lookupPluralTranslation(dict, locale, key, count, params);
}

/**
 * Get the dictionary for a locale (for use in server components)
 */
export function getServerDictionary(locale: Locale = DEFAULT_LOCALE) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}