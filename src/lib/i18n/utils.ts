import { LOCALES, type Locale } from "./config";

export type { Locale };
export { LOCALES };

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
