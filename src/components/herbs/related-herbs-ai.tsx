"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RelatedHerbsAI() {
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
