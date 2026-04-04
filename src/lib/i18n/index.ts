import 'server-only';
import fs from 'fs';
import path from 'path';
import { LANGUAGES, DEFAULT_LOCALE, type Locale } from './config';

// Cache for loaded dictionaries
const cache: Record<string, unknown> = {};

async function loadDictionary(locale: Locale) {
  if (cache[locale]) {
    return cache[locale];
  }

  const dictPath = path.join(process.cwd(), 'src/lib/i18n/dictionaries', `${locale}.json`);
  
  try {
    const content = fs.readFileSync(dictPath, 'utf8');
    const dict = JSON.parse(content);
    cache[locale] = dict;
    return dict;
  } catch {
    // Fall back to default locale
    if (locale !== DEFAULT_LOCALE) {
      return loadDictionary(DEFAULT_LOCALE);
    }
    return {};
  }
}

export async function getDictionary(locale: Locale = DEFAULT_LOCALE) {
  return loadDictionary(locale);
}

export { LANGUAGES, DEFAULT_LOCALE };
export type { Locale };