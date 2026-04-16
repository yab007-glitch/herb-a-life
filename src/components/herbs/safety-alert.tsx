"use client";

import { AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/i18n-provider";

interface SafetyAlertProps {
  severity: "critical" | "warning" | "info";
  title: string;
  children: React.ReactNode;
  className?: string;
}

const severityConfig = {
  critical: {
    icon: ShieldAlert,
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-800 dark:text-red-200",
    iconColor: "text-red-600 dark:text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    textColor: "text-amber-800 dark:text-amber-200",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
};

export function SafetyAlert({ severity, title, children, className }: SafetyAlertProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        config.bgColor,
        config.borderColor,
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={cn("size-5 shrink-0 mt-0.5", config.iconColor)} />
        <div className="flex-1">
          <h3 className={cn("font-semibold text-sm", config.textColor)}>
            {title}
          </h3>
          <div className={cn("mt-1 text-sm", config.textColor)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// Specialized component for drug interactions
interface InteractionAlertProps {
  interactionCount: number;
  severityCounts?: {
    contraindicated?: number;
    severe?: number;
    moderate?: number;
    mild?: number;
  };
  className?: string;
}

export function InteractionAlert({
  interactionCount,
  severityCounts,
  className,
}: InteractionAlertProps) {
  const { t } = useI18n();

  if (interactionCount === 0) {
    return (
      <SafetyAlert severity="info" title={t("safety.noInteractionsTitle")} className={className}>
        {t("safety.noInteractionsMsg")}
      </SafetyAlert>
    );
  }

  const hasSevere =
    (severityCounts?.contraindicated || 0) > 0 ||
    (severityCounts?.severe || 0) > 0;
  const hasModerate = (severityCounts?.moderate || 0) > 0;

  const severity = hasSevere ? "critical" : hasModerate ? "warning" : "info";
  const title = hasSevere
    ? `⚠️ ${interactionCount === 1 ? t("safety.interactionCountTitle", { count: interactionCount }) : t("safety.interactionCountTitlePlural", { count: interactionCount })}`
    : `${interactionCount} ${interactionCount === 1 ? t("interactions.severity.mild").split(" ")[0] : ""}`;

  const alertTitle = hasSevere
    ? `⚠️ ${interactionCount} ${t("interactions.title").toLowerCase()}${interactionCount > 1 ? "" : ""} — ${hasSevere ? "⚠️" : ""}`
    : `${interactionCount} ${t("interactions.title").toLowerCase()}`;

  return (
    <SafetyAlert severity={severity} title={interactionCount === 1 ? t("safety.interactionCountTitle", { count: interactionCount }) : t("safety.interactionCountTitlePlural", { count: interactionCount })} className={className}>
      <div className="space-y-2">
        {severityCounts && (
          <div className="flex flex-wrap gap-2 text-xs">
            {(severityCounts.contraindicated || 0) > 0 && (
              <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
                {severityCounts.contraindicated} {t("safety.severityContraindicated")}
              </span>
            )}
            {(severityCounts.severe || 0) > 0 && (
              <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
                {severityCounts.severe} {t("safety.severitySevere")}
              </span>
            )}
            {(severityCounts.moderate || 0) > 0 && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                {severityCounts.moderate} {t("safety.severityModerate")}
              </span>
            )}
            {(severityCounts.mild || 0) > 0 && (
              <span className="rounded bg-blue-100 px-1.5 py-0.5 font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {severityCounts.mild} {t("safety.severityMild")}
              </span>
            )}
          </div>
        )}
        <p>
          {t("safety.interactionMessage")}
        </p>
      </div>
    </SafetyAlert>
  );
}

// Component for pregnancy/nursing warnings
interface PregnancyAlertProps {
  pregnancySafe: boolean;
  nursingSafe: boolean;
  evidenceLevel?: "strong" | "limited" | "insufficient";
  className?: string;
}

export function PregnancyAlert({
  pregnancySafe,
  nursingSafe,
  evidenceLevel = "limited",
  className,
}: PregnancyAlertProps) {
  const { t } = useI18n();

  if (pregnancySafe && nursingSafe) {
    return (
      <SafetyAlert severity="info" title={t("safety.pregnancySafetyTitle")} className={className}>
        {t("safety.pregnancySafeMsg", { level: evidenceLevel })}
      </SafetyAlert>
    );
  }

  return (
    <SafetyAlert severity="critical" title={`⚠️ ${t("safety.notSafeTitle")}`} className={className}>
      <div className="space-y-2">
        {!pregnancySafe && (
          <p>{t("safety.notPregnancyMsg")}</p>
        )}
        {!nursingSafe && (
          <p>{t("safety.notNursingMsg")}</p>
        )}
        <p className="font-medium">{t("safety.consultProvider")}</p>
      </div>
    </SafetyAlert>
  );
}