import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calculator,
  AlertTriangle,
  ShieldCheck,
  ShieldX,
  FlaskConical,
  BookOpen,
  Stethoscope,
  Pill,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HerbSafetyBadges } from "@/components/herbs/herb-safety-badges";
import { InteractionsTable } from "@/components/herbs/interactions-table";
import { CopyLinkButton } from "@/components/herbs/copy-link-button";
import { getHerbBySlug } from "@/lib/actions/herbs";
import { createClient } from "@supabase/supabase-js";

// Use anon client for static generation (no cookies)
function getAnonClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Generate static pages for popular herbs (first 100 alphabetically)
export async function generateStaticParams() {
  try {
    const supabase = getAnonClient();
    if (!supabase) return [];

    const { data: herbs } = await supabase
      .from("herbs")
      .select("slug")
      .eq("is_published", true)
      .order("name", { ascending: true })
      .limit(100);

    return (herbs ?? []).map((herb) => ({ slug: herb.slug }));
  } catch {
    return [];
  }
}

// Revalidate every hour
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getHerbBySlug(slug);
  if (!result.success || !result.data) {
    return { title: "Herb Not Found" };
  }
  const herb = result.data;
  return {
    title: `${herb.name} (${herb.scientific_name})`,
    description: herb.description?.slice(0, 160),
  };
}

export default async function HerbDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getHerbBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const herb = result.data;
  const category = herb.herb_categories?.name || "Uncategorized";
  const interactions = herb.drug_interactions || [];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" render={<Link href="/herbs" />}>
        <ArrowLeft className="size-4" />
        Back to Herbs
      </Button>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {herb.name}
          </h1>
          <Badge variant="secondary">{category}</Badge>
          <CopyLinkButton />
        </div>
        <p className="mt-1 text-lg italic text-muted-foreground">
          {herb.scientific_name}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <HerbSafetyBadges
            pregnancySafe={herb.pregnancy_safe}
            nursingSafe={herb.nursing_safe}
          />
          {herb.updated_at && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3" />
              Last updated{" "}
              {new Date(herb.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          Description
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          {herb.description}
        </p>
      </section>

      <Separator />

      {/* Active Compounds */}
      {herb.active_compounds && herb.active_compounds.length > 0 && (
        <>
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical className="size-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Active Compounds
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {herb.active_compounds.map((compound: string) => (
                <Badge key={compound} variant="outline">
                  {compound}
                </Badge>
              ))}
            </div>
          </section>
          <Separator />
        </>
      )}

      {/* Uses Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Traditional Uses */}
        {herb.traditional_uses && herb.traditional_uses.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Traditional Uses
              </h2>
            </div>
            <ul className="space-y-2">
              {herb.traditional_uses.map((use: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {use}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Modern Uses */}
        {herb.modern_uses && herb.modern_uses.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Stethoscope className="size-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Modern Uses
              </h2>
            </div>
            <ul className="space-y-2">
              {herb.modern_uses.map((use: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                  {use}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Separator />

      {/* Dosage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="size-5 text-primary" />
            Dosage Information
          </CardTitle>
          <CardDescription>Recommended dosing guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            {herb.dosage_forms && herb.dosage_forms.length > 0 && (
              <div>
                <dt className="text-sm font-medium text-foreground">Forms</dt>
                <dd className="text-sm capitalize text-muted-foreground">
                  {herb.dosage_forms.join(", ")}
                </dd>
              </div>
            )}
            {herb.dosage_adult && (
              <div>
                <dt className="text-sm font-medium text-foreground">
                  Adult Dose
                </dt>
                <dd className="text-sm text-muted-foreground">
                  {herb.dosage_adult}
                </dd>
              </div>
            )}
            {herb.dosage_child && (
              <div>
                <dt className="text-sm font-medium text-foreground">
                  Child Dose
                </dt>
                <dd className="text-sm text-muted-foreground">
                  {herb.dosage_child}
                </dd>
              </div>
            )}
            {herb.preparation_notes && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-foreground">
                  Preparation Notes
                </dt>
                <dd className="text-sm text-muted-foreground">
                  {herb.preparation_notes}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Safety Information */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="size-5" />
            Safety Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              {herb.pregnancy_safe ? (
                <ShieldCheck className="size-5 text-green-600" />
              ) : (
                <ShieldX className="size-5 text-red-500" />
              )}
              <span className="text-sm">
                {herb.pregnancy_safe
                  ? "Generally safe during pregnancy"
                  : "Not recommended during pregnancy"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {herb.nursing_safe ? (
                <ShieldCheck className="size-5 text-green-600" />
              ) : (
                <ShieldX className="size-5 text-red-500" />
              )}
              <span className="text-sm">
                {herb.nursing_safe
                  ? "Generally safe while nursing"
                  : "Not recommended while nursing"}
              </span>
            </div>
          </div>
          {herb.contraindications && herb.contraindications.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">
                Contraindications
              </h3>
              <ul className="space-y-1">
                {herb.contraindications.map((c: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {herb.side_effects && herb.side_effects.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">
                Possible Side Effects
              </h3>
              <ul className="space-y-1">
                {herb.side_effects.map((s: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Drug Interactions */}
      <InteractionsTable interactions={interactions} />

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 pt-4">
        <Button render={<Link href={`/calculator?herb=${slug}`} />}>
          <Calculator className="size-4" />
          Calculate Dose
        </Button>
        <Button
          variant="outline"
          render={<Link href={`/pharmacist?herb=${slug}`} />}
        >
          <AlertTriangle className="size-4" />
          Check Interactions
        </Button>
      </div>
    </div>
  );
}
