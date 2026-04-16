"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/i18n-provider";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
      aria-label={t("common.copyLink")}
    >
      {copied ? (
        <>
          <Check className="size-4 text-green-600" />
          {t("common.copied")}
        </>
      ) : (
        <>
          <Link2 className="size-4" />
          {t("common.copyLink")}
        </>
      )}
    </Button>
  );
}