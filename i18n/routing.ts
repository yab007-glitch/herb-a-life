import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "never",
  localeCookie: {
    name: "herbally-locale",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  },
});
