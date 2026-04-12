"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EvidenceGrade } from "./evidence-grade";

interface RelatedHerb {
  name: string;
  slug: string;
  scientific_name: string;
  evidence_level: string;
  reason: string;
}

interface RelatedHerbsAIProps {
  herbName: string;
  herbUses: string[];
  herbCompounds: string[];
  currentSlug: string;
}

// AI-like matching algorithm - finds herbs with similar uses/compounds
function findRelatedHerbs(
  uses: string[],
  compounds: string[],
  currentSlug: string,
  allHerbs: any[]
): RelatedHerb[] {
  if (!allHerbs || allHerbs.length === 0) return [];

  const scored = allHerbs
    .filter((h) => h.slug !== currentSlug)
    .map((herb) => {
      let score = 0;
      const reasons: string[] = [];

      // Score by matching uses
      const herbUses = [...(herb.traditional_uses || []), ...(herb.modern_uses || [])];
      const useMatches = uses.filter((u) =>
        herbUses.some((hu: string) =>
          hu.toLowerCase().includes(u.toLowerCase()) ||
          u.toLowerCase().includes(hu.toLowerCase())
        )
      );
      score += useMatches.length * 3;
      if (useMatches.length > 0) {
        reasons.push(`Similar uses: ${useMatches.slice(0, 2).join(", ")}`);
      }

      // Score by matching compounds (if available)
      const herbCompounds = herb.active_compounds || [];
      const compoundMatches = compounds.filter((c) =>
        herbCompounds.some((hc: string) =>
          hc.toLowerCase().includes(c.toLowerCase()) ||
          c.toLowerCase().includes(hc.toLowerCase())
        )
      );
      score += compoundMatches.length * 2;

      // Bonus for high evidence level
      if (herb.evidence_level === "A") score += 2;
      if (herb.evidence_level === "B") score += 1;

      return {
        name: herb.name,
        slug: herb.slug,
        scientific_name: herb.scientific_name,
        evidence_level: herb.evidence_level || "C",
        reason: reasons[0] || "Commonly used together",
        score,
      };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function RelatedHerbsAI({
  herbName,
  herbUses,
  herbCompounds,
  currentSlug,
}: RelatedHerbsAIProps) {
  // This would ideally fetch from an API endpoint
  // For now, we'll show a placeholder that suggests this feature

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-primary" />
          AI-Suggested Alternatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Based on similar active compounds and traditional uses
        </p>
        <div className="space-y-3">
          {/* Placeholder - would be populated by AI matching */}
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Personalized herb suggestions coming soon
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Our AI will analyze active compounds and mechanisms to find related herbs
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
