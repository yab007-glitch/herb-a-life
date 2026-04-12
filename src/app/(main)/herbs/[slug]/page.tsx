import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
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
  FileText,
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
import { InteractionsTable, type Interaction } from "@/components/herbs/interactions-table";
import { CopyLinkButton } from "@/components/herbs/copy-link-button";
import { HerbSchema } from "@/components/seo/herb-schema";
import { EvidenceGrade } from "@/components/herbs/evidence-grade";
import { SafetyAlert, InteractionAlert, PregnancyAlert } from "@/components/herbs/safety-alert";
import { CitationsList, SourceAttribution } from "@/components/herbs/citations";
import { getHerbBySlug } from "@/lib/actions/herbs";
import { createClient } from "@supabase/supabase-js";
import { getServerTranslation, type Locale } from "@/lib/i18n/server";

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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app";
  
  // Build keywords from herb data
  const keywords = [
    herb.name,
    herb.scientific_name,
    ...(herb.common_names || []),
    ...(herb.traditional_uses || []).slice(0, 5),
    ...(herb.active_compounds || []).slice(0, 5),
    "medicinal herb",
    "herbal remedy",
    "natural medicine",
  ].filter(Boolean);

  return {
    title: `${herb.name} (${herb.scientific_name}) - Medicinal Herb Guide`,
    description: herb.description
      ? `${herb.description.slice(0, 155)}${herb.description.length > 155 ? "..." : ""}`
      : `Learn about ${herb.name} (${herb.scientific_name}) - uses, dosage, safety, and drug interactions.`,
    keywords,
    alternates: {
      canonical: `${baseUrl}/herbs/${slug}`,
    },
    openGraph: {
      title: `${herb.name} (${herb.scientific_name})`,
      description: herb.description?.slice(0, 160) || undefined,
      url: `${baseUrl}/herbs/${slug}`,
      type: "article",
      siteName: "HerbAlly",
    },
    twitter: {
      card: "summary_large_image",
      title: `${herb.name} - Medicinal Herb`,
      description: herb.description?.slice(0, 160) || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Map DB evidence_level to EvidenceLevel type
function getEvidenceLevel(level: string | null | undefined): "A" | "B" | "C" | "D" | "trad" {
  if (level && ["A", "B", "C", "D", "trad"].includes(level)) return level as "A" | "B" | "C" | "D" | "trad";
  return "C";
}

interface CitationData {
  source: string;
  title?: string;
  url?: string;
  year?: number;
  pmid?: string;
}

function formatCitations(citations: CitationData[] | null | undefined): CitationData[] {
  if (!citations || citations.length === 0) {
    return [
      {
        source: "NCCIH",
        title: "Herbs at a Glance",
        url: "https://www.nccih.nih.gov/health/herbsataglance",
      },
    ];
  }
  return citations;
}

type DrugInteraction = {
  severity: string;
  [key: string]: unknown;
};

export default async function HerbDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getHerbBySlug(slug);

  // Get locale from cookies
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("herbally-locale");
  const locale: Locale = (localeCookie?.value as Locale) || "en";

  // Translation helper
  const t = (key: string) => getServerTranslation(locale, key);

  if (!result.success || !result.data) {
    notFound();
  }

  const herb = result.data;
  const category = herb.herb_categories?.name || t("herbDetail.uncategorized");
  const interactions = (herb.drug_interactions || []) as Interaction[];
  
  // Calculate severity counts for interactions
  const severityCounts = {
    contraindicated: interactions.filter((i: DrugInteraction) => i.severity === "contraindicated").length,
    severe: interactions.filter((i: DrugInteraction) => i.severity === "severe").length,
    moderate: interactions.filter((i: DrugInteraction) => i.severity === "moderate").length,
    mild: interactions.filter((i: DrugInteraction) => i.severity === "mild").length,
  };
  
  const evidenceLevel = getEvidenceLevel(herb.evidence_level);
  const citations = formatCitations(herb.citations as unknown as CitationData[] | null);
  const lastReviewed = herb.last_reviewed 
    ? new Date(herb.last_reviewed).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        month: "long",
        year: "numeric",
      })
    : herb.updated_at 
    ? new Date(herb.updated_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        month: "long",
        year: "numeric",
      })
    : undefined;
  const reviewedBy = herb.reviewed_by || "HerbAlly Editorial Team";
  const reviewerCredentials = herb.reviewer_credentials || "Medical herbalists and healthcare professionals";

  // Fetch related herbs (same category, excluding current herb)
  let relatedHerbs: Array<{ name: string; slug: string; scientific_name: string }> = [];
  try {
    const supabase = getAnonClient();
    if (supabase && herb.herb_categories?.name) {
      const { data: related } = await supabase
        .from("herbs")
        .select("name, slug, scientific_name")
        .eq("is_published", true)
        .eq("herb_categories.name", herb.herb_categories.name)
        .neq("slug", slug)
        .limit(6);
      relatedHerbs = related ?? [];
    }
    // Fallback: if no category matches or no results, get random herbs
    if (relatedHerbs.length === 0 && supabase) {
      const { data: fallback } = await supabase
        .from("herbs")
        .select("name, slug, scientific_name")
        .eq("is_published", true)
        .neq("slug", slug)
        .limit(6);
      relatedHerbs = fallback ?? [];
    }
  } catch {
    // Related herbs are non-critical, swallow errors
  }

  return (
    <div className="space-y-8">
      <HerbSchema herb={herb} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/herbs" className="hover:text-foreground transition-colors">
              Herbs
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            {herb.name}
          </li>
        </ol>
      </nav>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://herbally.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Herbs",
                item: "https://herbally.app/herbs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: herb.name,
                item: `https://herbally.app/herbs/${slug}`,
              },
            ],
          }),
        }}
      />

      {/* Back Button */}
      <Button variant="ghost" size="sm" render={<Link href="/herbs" />}>
        <ArrowLeft className="size-4" />
        {t("herbDetail.backToHerbs")}
      </Button>

      {/* Medical Disclaimer - ABOVE FOLD */}
      <SafetyAlert severity="info" title="Medical Disclaimer">
        This information is for educational purposes only and is not a substitute for professional medical advice, 
        diagnosis, or treatment. Always consult your healthcare provider before using herbs, especially if you are 
        pregnant, nursing, taking medications, or have a medical condition.
      </SafetyAlert>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {herb.name}
          </h1>
          <Badge variant="secondary">{category}</Badge>
          <EvidenceGrade level={evidenceLevel} />
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
          {lastReviewed && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3" />
              Last reviewed {lastReviewed}
            </span>
          )}
        </div>
      </div>

      {/* Critical Safety Warnings - ABOVE FOLD */}
      {(!herb.pregnancy_safe || !herb.nursing_safe) && (
        <PregnancyAlert
          pregnancySafe={herb.pregnancy_safe}
          nursingSafe={herb.nursing_safe}
          evidenceLevel="limited"
        />
      )}

      <InteractionAlert 
        interactionCount={interactions.length}
        severityCounts={severityCounts}
      />

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
              <EvidenceGrade level="C" showLabel={false} />
            </div>
            <ul className="space-y-2">
              {herb.traditional_uses.map((use: string) => (
                <li
                  key={use}
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
              <EvidenceGrade level="B" showLabel={false} />
            </div>
            <ul className="space-y-2">
              {herb.modern_uses.map((use: string) => (
                <li
                  key={use}
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

      {/* Detailed Safety Information */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="size-5" />
            Safety Information
          </CardTitle>
          <CardDescription>
            Important safety considerations for this herb
          </CardDescription>
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
                  ? t("herbDetail.safePregnancy")
                  : t("herbDetail.notSafePregnancy")}
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
                  ? t("herbDetail.safeNursing")
                  : t("herbDetail.notSafeNursing")}
              </span>
            </div>
          </div>
          {herb.contraindications && herb.contraindications.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">
                Contraindications
              </h3>
              <ul className="space-y-1">
              {herb.contraindications.map((c: string) => (
                <li
                  key={c}
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
                {herb.side_effects.map((s: string) => (
                  <li
                    key={s}
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

      {/* Citations */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
          <FileText className="size-5 text-primary" />
          Sources & Citations
        </h2>
        <CitationsList citations={citations} />
      </section>

      {/* Source Attribution */}
      <SourceAttribution
        reviewedBy={reviewedBy}
        reviewerCredentials={reviewerCredentials}
        lastReviewed={lastReviewed}
        sources={["WHO Monographs", "NCCIH", "PubMed", "Commission E"]}
      />

      {/* Related Herbs */}
      {relatedHerbs.length > 0 && (
        <section aria-labelledby="related-herbs-heading">
          <h2 id="related-herbs-heading" className="mb-4 text-xl font-semibold text-foreground">
            Related Herbs
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedHerbs.map((related) => (
              <Link
                key={related.slug}
                href={`/herbs/${related.slug}`}
                className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {related.name}
                </h3>
                <p className="text-sm italic text-muted-foreground">
                  {related.scientific_name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

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

      {/* Report Issue */}
      <div className="mt-8 rounded-lg border border-dashed p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Found an error or have a correction for {herb.name}?
        </p>
        <a
          href={`mailto:support@herbally.app?subject=Correction%20for%20${encodeURIComponent(herb.name)}%20(${encodeURIComponent(herb.scientific_name)})&body=I%20found%20an%20error%20on%20the%20${encodeURIComponent(herb.name)}%20page%3A%0A%0A`}
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Report an issue →
        </a>
      </div>
    </div>
  );
}
