"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations();
  return (
    <a href="#main-content" className="skip-to-content">
      {t("common.skipToContent")}
    </a>
  );
}
