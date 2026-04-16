"use client";

import { ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/i18n-provider";

interface HerbSafetyBadgesProps {
  pregnancySafe: boolean;
  nursingSafe: boolean;
  className?: string;
}

export function HerbSafetyBadges({
  pregnancySafe,
  nursingSafe,
  className,
}: HerbSafetyBadgesProps) {
  const { t } = useI18n();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
          pregnancySafe
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}
      >
        {pregnancySafe ? (
          <ShieldCheck className="size-3" />
        ) : (
          <ShieldX className="size-3" />
        )}
        {t("herbBadges.pregnancy")}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
          nursingSafe
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}
      >
        {nursingSafe ? (
          <ShieldCheck className="size-3" />
        ) : (
          <ShieldX className="size-3" />
        )}
        {t("herbBadges.nursing")}
      </span>
    </div>
  );
}