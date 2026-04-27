import { LOCALES, type Locale } from "./config";

export type { Locale };
export { LOCALES };

/**
 * Determine the plural form for a given count and locale.
 * English: 1 → "one", everything else → "other"
 * French: 0,1 → "one", everything else → "other"
 */
export function getPluralForm(locale: Locale, count: number): "one" | "other" {
  if (locale === "fr") {
    return count <= 1 ? "one" : "other";
  }
  return count === 1 ? "one" : "other";
}

/**
 * Look up a dot-notation key in a dictionary and optionally interpolate params.
 * Returns the key string if not found.
 */
export function lookupTranslation(
  dict: Record<string, unknown>,
  key: string,
  params?: Record<string, string | number>
): string {
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
}

/**
 * Look up a pluralized translation. Tries `key.one` or `key.other` based on
 * count and locale, falling back to `key` if plural forms are absent.
 */
export function lookupPluralTranslation(
  dict: Record<string, unknown>,
  locale: Locale,
  key: string,
  count: number,
  params?: Record<string, string | number>
): string {
  const form = getPluralForm(locale, count);
  const pluralKey = `${key}.${form}`;
  const result = lookupTranslation(dict, pluralKey, { ...params, count });

  // If plural form wasn't found, fall back to the base key
  if (result === pluralKey) {
    return lookupTranslation(dict, key, { ...params, count });
  }

  return result;
}
