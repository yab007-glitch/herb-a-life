// Most spoken languages by total speakers (native + second language)
// Source: Ethnologue 2024
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', speakers: 1500, flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', speakers: 1130, flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speakers: 610, flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', speakers: 560, flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', speakers: 310, flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', speakers: 274, flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speakers: 265, flag: '🇧🇩' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', speakers: 260, flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', speakers: 258, flag: '🇷🇺' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', speakers: 230, flag: '🇵🇰' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', speakers: 200, flag: '🇮🇩' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', speakers: 135, flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', speakers: 125, flag: '🇯🇵' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', speakers: 100, flag: '🇹🇿' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', speakers: 82, flag: '🇰🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', speakers: 68, flag: '🇮🇹' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', speakers: 80, flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', speakers: 85, flag: '🇻🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', speakers: 61, flag: '🇹🇭' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', speakers: 77, flag: '🇮🇷' },
] as const;

export const DEFAULT_LOCALE = 'en';
export const LOCALES = LANGUAGES.map(l => l.code);

export type Locale = typeof LANGUAGES[number]['code'];

// Country to primary language mapping
export const COUNTRY_TO_LANG: Record<string, Locale> = {
  // English
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en', PH: 'en',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh',
  // Hindi (India maps to Hindi, but also English/Bengali)
  IN: 'hi',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  // French
  FR: 'fr', BE: 'fr', CH: 'fr', SN: 'fr', CI: 'fr',
  // Arabic
  SA: 'ar', EG: 'ar', AE: 'ar', IQ: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar',
  // Bengali
  BD: 'bn',
  // Portuguese
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
  // Russian
  RU: 'ru', UA: 'ru', BY: 'ru', KZ: 'ru', UZ: 'ru',
  // Urdu
  PK: 'ur',
  // Indonesian
  ID: 'id',
  // German
  DE: 'de', AT: 'de',
  // Japanese
  JP: 'ja',
  // Swahili
  TZ: 'sw', KE: 'sw', UG: 'sw',
  // Korean
  KR: 'ko', KP: 'ko',
  // Italian
  IT: 'it',
  // Turkish
  TR: 'tr', CY: 'tr',
  // Vietnamese
  VN: 'vi',
  // Thai
  TH: 'th',
  // Persian
  IR: 'fa', AF: 'fa',
};