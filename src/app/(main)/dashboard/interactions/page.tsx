import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Pill,
  Leaf,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Interaction History",
  description:
    "Review potential interactions between your medications and herbs you've searched.",
};

const severityConfig = {
  contraindicated: {
    label: "Contraindicated",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: ShieldX,
  },
  severe: {
    label: "Severe",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    icon: ShieldAlert,
  },
  moderate: {
    label: "Moderate",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: AlertTriangle,
  },
  mild: {
    label: "Mild",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: ShieldCheck,
  },
};

type Interaction = {
  id: string;
  herb_name: string;
  herb_slug: string;
  drug_name: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  description: string;
  mechanism: string | null;
};

export default async function InteractionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let interactions: Interaction[] = [];
  let medicationCount = 0;
  let hasUser = !!user;

  if (user) {
    // Get user's saved medications
    const { data: medications } = await supabase
      .from("user_medications")
      .select("drug_name")
      .eq("user_id", user.id)
      .eq("is_active", true);

    const medNames = (medications ?? [])
      .map((m) => m.drug_name)
      .filter(Boolean);
    medicationCount = medNames.length;

    if (medNames.length > 0) {
      // Find all known interactions — use ilike for case-insensitive matching
      const orFilter = medNames
        .map((name) => `drug_name.ilike.${name}`)
        .join(",");
      const { data: dbInteractions } = await supabase
        .from("drug_interactions")
        .select(
          "id, drug_name, severity, description, mechanism, herb_id, herbs(name, slug)"
        )
        .or(orFilter);

      interactions = (dbInteractions ?? []).map(
        (i: Record<string, unknown>) => {
          const herb = i.herbs as { name: string; slug: string } | null;
          return {
            id: i.id as string,
            herb_name: herb?.name ?? "Unknown",
            herb_slug: herb?.slug ?? "",
            drug_name: i.drug_name as string,
            severity: i.severity as Interaction["severity"],
            description: i.description as string,
            mechanism: i.mechanism as string | null,
          };
        }
      );
    }
  }

  // Sort: contraindicated first, then severe, moderate, mild
  const severityOrder = { contraindicated: 0, severe: 1, moderate: 2, mild: 3 };
  interactions.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Interaction History
          </h1>
          <p className="text-sm text-muted-foreground">
            Known interactions between your saved medications and herbs in our
            database.
          </p>
        </div>
      </div>

      {!hasUser ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Pill className="size-10 text-muted-foreground/40 mb-3" />
            <p className="font-medium text-muted-foreground">
              Sign in to see your interactions
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Create an account and add your medications to check for
              interactions.
            </p>
            <Button size="sm" className="mt-4" render={<Link href="/login" />}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      ) : medicationCount === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Pill className="size-10 text-muted-foreground/40 mb-3" />
            <p className="font-medium text-muted-foreground">
              No medications saved yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your medications first, then we can check for interactions
              with herbs.
            </p>
            <Button
              size="sm"
              className="mt-4"
              render={<Link href="/dashboard/medications" />}
            >
              <Plus className="size-4" />
              Add Medications
            </Button>
          </CardContent>
        </Card>
      ) : interactions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <ShieldCheck className="size-10 text-green-500 mb-3" />
            <p className="font-medium text-foreground">
              No known interactions found
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              We checked your {medicationCount} medication
              {medicationCount !== 1 ? "s" : ""} against our herb database and
              found no documented interactions. You can also ask our AI
              herbalist for a deeper analysis.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-4"
              render={<Link href="/pharmacist" />}
            >
              Ask AI Herbalist
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Summary */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {interactions.length} interaction
                    {interactions.length !== 1 ? "s" : ""} found across{" "}
                    {medicationCount} medication
                    {medicationCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Based on verified data from our herb-drug interaction
                    database
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  render={<Link href="/pharmacist" />}
                >
                  Ask AI for More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interaction Cards */}
          {interactions.map((interaction) => {
            const config = severityConfig[interaction.severity];
            const Icon = config.icon;
            return (
              <Card key={interaction.id}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground flex items-center gap-1">
                          <Leaf className="size-3.5 text-primary" />
                          <Link
                            href={`/herbs/${interaction.herb_slug}`}
                            className="hover:underline"
                          >
                            {interaction.herb_name}
                          </Link>
                        </span>
                        <span className="text-muted-foreground">+</span>
                        <span className="font-medium text-foreground flex items-center gap-1">
                          <Pill className="size-3.5 text-blue-500" />
                          {interaction.drug_name}
                        </span>
                        <Badge className={config.color}>{config.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {interaction.description}
                      </p>
                      {interaction.mechanism && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium">Mechanism:</span>{" "}
                          {interaction.mechanism}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
