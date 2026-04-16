"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/i18n-provider";

export function RelatedHerbsAI() {
  const { t } = useI18n();
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-primary" />
          {t("common.aiSuggestedAlternatives")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {t("common.basedOnCompounds")}
        </p>
        <div className="space-y-3">
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {t("common.suggestionsComingSoon")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t("common.aiWillAnalyze")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
