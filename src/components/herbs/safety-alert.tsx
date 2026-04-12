"use client";

import { AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
  if (interactionCount === 0) {
    return (
      <SafetyAlert severity="info" title="No Known Drug Interactions" className={className}>
        No clinically significant drug interactions have been documented. However, always
        consult your healthcare provider before combining herbs with medications.
      </SafetyAlert>
    );
  }

  const hasSevere =
    (severityCounts?.contraindicated || 0) > 0 ||
    (severityCounts?.severe || 0) > 0;
  const hasModerate = (severityCounts?.moderate || 0) > 0;

  const severity = hasSevere ? "critical" : hasModerate ? "warning" : "info";
  const title = hasSevere
    ? `⚠️ ${interactionCount} Known Drug Interaction${interactionCount === 1 ? "" : "s"} — Some May Be Serious`
    : `${interactionCount} Known Drug Interaction${interactionCount === 1 ? "" : "s"}`;

  return (
    <SafetyAlert severity={severity} title={title} className={className}>
      <div className="space-y-2">
        {severityCounts && (
          <div className="flex flex-wrap gap-2 text-xs"
          >
            {(severityCounts.contraindicated || 0) > 0 && (
              <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200"
              >
                {severityCounts.contraindicated} Contraindicated
              </span>
            )}
            {(severityCounts.severe || 0) > 0 && (
              <span className="rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200"
              >
                {severityCounts.severe} Severe
              </span>
            )}
            {(severityCounts.moderate || 0) > 0 && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
              >
                {severityCounts.moderate} Moderate
              </span>
            )}
            {(severityCounts.mild || 0) > 0 && (
              <span className="rounded bg-blue-100 px-1.5 py-0.5 font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
              >
                {severityCounts.mild} Mild
              </span>
            )}
          </div>
        )}
        <p>
          This herb may interact with medications you are taking. Review the interactions
          table below and consult your healthcare provider before use.
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
  if (pregnancySafe && nursingSafe) {
    return (
      <SafetyAlert severity="info" title="Pregnancy & Nursing Safety" className={className}
      >
        Generally considered safe during pregnancy and nursing based on{" "}
        {evidenceLevel} evidence. However, always consult your healthcare provider
        before using any herbal supplement during pregnancy or while breastfeeding.
      </SafetyAlert>
    );
  }

  return (
    <SafetyAlert severity="critical" title="⚠️ Not Recommended During Pregnancy or Nursing" className={className}
    >
      <div className="space-y-2">
        {!pregnancySafe && (
          <p>This herb is NOT recommended during pregnancy due to potential risks to the developing fetus.</p>
        )}
        {!nursingSafe && (
          <p>This herb is NOT recommended while breastfeeding as effects on infants are unknown.</p>
        )}
        <p className="font-medium">Consult your healthcare provider before use.</p>
      </div>
    </SafetyAlert>
  );
}
