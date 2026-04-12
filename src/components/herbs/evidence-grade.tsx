"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FlaskConical, Beaker, Leaf, HelpCircle } from "lucide-react";

export type EvidenceLevel = "A" | "B" | "C" | "D" | "trad";

interface EvidenceGradeProps {
  level: EvidenceLevel;
  className?: string;
  showLabel?: boolean;
}

const evidenceConfig: Record<EvidenceLevel, {
  label: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}> = {
  A: {
    label: "Strong Evidence",
    shortDesc: "Multiple RCTs",
    fullDesc: "Strong clinical evidence from multiple randomized controlled trials (RCTs) and systematic reviews.",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    icon: <FlaskConical className="size-3" />,
  },
  B: {
    label: "Moderate Evidence",
    shortDesc: "Some clinical data",
    fullDesc: "Moderate evidence from observational studies, case series, or limited RCTs.",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    icon: <Beaker className="size-3" />,
  },
  C: {
    label: "Limited Evidence",
    shortDesc: "Traditional/preclinical",
    fullDesc: "Limited evidence from traditional use, preclinical studies, or expert opinion. More research needed.",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    icon: <Leaf className="size-3" />,
  },
  D: {
    label: "Anecdotal Only",
    shortDesc: "Historical use only",
    fullDesc: "Evidence based primarily on historical use and anecdotal reports. Limited scientific validation.",
    color: "text-gray-700 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-900/30",
    icon: <HelpCircle className="size-3" />,
  },
  trad: {
    label: "Traditional Use",
    shortDesc: "Traditional medicine",
    fullDesc: "Used traditionally in herbal medicine systems. Scientific evidence may be limited or ongoing.",
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    icon: <Leaf className="size-3" />,
  },
};

export function EvidenceGrade({ level, className, showLabel = true }: EvidenceGradeProps) {
  const config = evidenceConfig[level] || evidenceConfig.C;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-help",
              config.bgColor,
              config.color,
              className
            )}
          >
            {config.icon}
            <span>Evidence: {level}</span>
            {showLabel && (
              <span className="hidden sm:inline">- {config.shortDesc}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.fullDesc}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function EvidenceGradeBadge({ level }: { level: EvidenceLevel }) {
  const config = evidenceConfig[level] || evidenceConfig.C;
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-medium",
        config.bgColor,
        config.color
      )}
    >
      {config.icon}
      {level}
    </Badge>
  );
}
