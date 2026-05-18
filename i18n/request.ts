import { getRequestConfig } from "next-intl/server";
import enDict from "@/lib/i18n/dictionaries/en.json";
import frDict from "@/lib/i18n/dictionaries/fr.json";

const messages: Record<string, Record<string, unknown>> = {
  en: enDict as Record<string, unknown>,
  fr: frDict as Record<string, unknown>,
};

export default getRequestConfig(async (params) => {
  const locale = params?.locale || "en";
  return {
    locale,
    messages: messages[locale] ?? messages.en,
  };
});
