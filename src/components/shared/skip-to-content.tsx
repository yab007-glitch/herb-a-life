"use client";

import { useI18n } from "@/components/i18n/i18n-provider";

export function SkipToContent() {
  const { t } = useI18n();
  return (
    <a href="#main-content" className="skip-to-content">
      {t("common.skipToContent")}
    </a>
  );
}
