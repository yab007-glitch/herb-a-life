import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";
import enDict from "./dictionaries/en.json";
import frDict from "./dictionaries/fr.json";

// Re-export Locale type and LOCALES
export type { Locale };
export { LOCALES };

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
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = dict;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if translation not found
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
}

/**
 * Get the dictionary for a locale (for use in server components)
 */
export function getServerDictionary(locale: Locale = DEFAULT_LOCALE) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}