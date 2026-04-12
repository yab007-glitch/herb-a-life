import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EvidenceGrade } from "@/components/herbs/evidence-grade";
import { SafetyAlert } from "@/components/herbs/safety-alert";
import { CitationsList, SourceAttribution } from "@/components/herbs/citations";
import { getHerbBySlug } from "@/lib/actions/herbs";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ slug1: string; slug2: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug1, slug2 } = await params;
  const slugA = slug1;
  const slugB = slug2;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app";

  // Fetch both herbs
  const [resultA, resultB] = await Promise.all([
    getHerbBySlug(slugA),
    getHerbBySlug(slugB),
  ]);

  const herbA = resultA.success ? resultA.data : null;
  const herbB = resultB.success ? resultB.data : null;

  if (!herbA || !herbB) {
    return { title: "Herb Comparison Not Found" };
  }

  return {
    title: `${herbA.name} vs ${herbB.name} - Herb Comparison`,
    description: `Compare ${herbA.name} and ${herbB.name} side by side. Uses, safety, interactions, and evidence levels.`,
    alternates: { canonical: `${baseUrl}/compare/${slugA}/vs/${slugB}` },
  };
}

function ComparisonRow({ label, valueA, valueB }: { label: string; valueA: React.ReactNode; valueB: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 border-b py-3 text-sm">
      <div className="font-medium text-foreground">{label}</div>
      <div className="text-muted-foreground">{valueA || "—"}</div>
      <div className="text-muted-foreground">{valueB || "—"}</div>
    </div>
  );
}

function ListComparison({ itemsA, itemsB }: { itemsA: string[] | null; itemsB: string[] | null }) {
  return (
    <>
      <div className="space-y-1">
        {(itemsA || []).map((item) => (
          <div key={item} className="flex items-start gap-1.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </div>
        ))}
        {(!itemsA || itemsA.length === 0) && <span className="text-sm text-muted-foreground">—</span>}
      </div>
      <div className="space-y-1">
        {(itemsB || []).map((item) => (
          <div key={item} className="flex items-start gap-1.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </div>
        ))}
        {(!itemsB || itemsB.length === 0) && <span className="text-sm text-muted-foreground">—</span>}
      </div>
    </>
  );
}

export default async function ComparePage({ params }: Props) {
  const { slug1, slug2 } = await params;
  const [resultA, resultB] = await Promise.all([
    getHerbBySlug(slug1),
    getHerbBySlug(slug2),
  ]);

  if (!resultA.success || !resultB.success || !resultA.data || !resultB.data) {
    notFound();
  }

  const herbA = resultA.data;
  const herbB = resultB.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" render={<Link href="/herbs" />}>
          <ArrowLeft className="size-4" />
          Back to Herbs
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          {herbA.name} vs {herbB.name}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Side-by-side comparison of medicinal herbs
        </p>
      </div>

      {/* Names */}
      <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 rounded-lg border bg-muted/50 p-4">
        <div className="font-medium text-foreground">Herb</div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{herbA.name}</h2>
          <p className="text-sm italic text-muted-foreground">{herbA.scientific_name}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{herbA.herb_categories?.name || "Uncategorized"}</Badge>
            <EvidenceGrade level={(herbA.evidence_level as any) || "C"} showLabel={false} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{herbB.name}</h2>
          <p className="text-sm italic text-muted-foreground">{herbB.scientific_name}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{herbB.herb_categories?.name || "Uncategorized"}</Badge>
            <EvidenceGrade level={(herbB.evidence_level as any) || "C"} showLabel={false} />
          </div>
        </div>
      </div>

      {/* Safety Warnings */}
      {(!herbA.pregnancy_safe || !herbB.pregnancy_safe || !herbA.nursing_safe || !herbB.nursing_safe) && (
        <SafetyAlert severity="critical" title="⚠️ Pregnancy & Nursing Warnings">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">{herbA.name}</p>
              <p>{herbA.pregnancy_safe ? "✅ Generally safe in pregnancy" : "❌ Not recommended in pregnancy"}</p>
              <p>{herbA.nursing_safe ? "✅ Generally safe while nursing" : "❌ Not recommended while nursing"}</p>
            </div>
            <div>
              <p className="font-medium">{herbB.name}</p>
              <p>{herbB.pregnancy_safe ? "✅ Generally safe in pregnancy" : "❌ Not recommended in pregnancy"}</p>
              <p>{herbB.nursing_safe ? "✅ Generally safe while nursing" : "❌ Not recommended while nursing"}</p>
            </div>
          </div>
        </SafetyAlert>
      )}

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-6">
          <ComparisonRow label="Description" valueA={herbA.description} valueB={herbB.description} />
          <ComparisonRow
            label="Active Compounds"
            valueA={<ListComparison itemsA={herbA.active_compounds} itemsB={null} />}
            valueB={<ListComparison itemsA={null} itemsB={herbB.active_compounds} />}
          />
          <ComparisonRow
            label="Traditional Uses"
            valueA={<ListComparison itemsA={herbA.traditional_uses} itemsB={null} />}
            valueB={<ListComparison itemsA={null} itemsB={herbB.traditional_uses} />}
          />
          <ComparisonRow
            label="Modern Uses"
            valueA={<ListComparison itemsA={herbA.modern_uses} itemsB={null} />}
            valueB={<ListComparison itemsA={null} itemsB={herbB.modern_uses} />}
          />
          <ComparisonRow label="Adult Dosage" valueA={herbA.dosage_adult} valueB={herbB.dosage_adult} />
          <ComparisonRow
            label="Contraindications"
            valueA={<ListComparison itemsA={herbA.contraindications} itemsB={null} />}
            valueB={<ListComparison itemsA={null} itemsB={herbB.contraindications} />}
          />
          <ComparisonRow
            label="Side Effects"
            valueA={<ListComparison itemsA={herbA.side_effects} itemsB={null} />}
            valueB={<ListComparison itemsA={null} itemsB={herbB.side_effects} />}
          />
          <ComparisonRow
            label="Drug Interactions"
            valueA={`${(herbA.drug_interactions || []).length} known interactions`}
            valueB={`${(herbB.drug_interactions || []).length} known interactions`}
          />
        </CardContent>
      </Card>

      {/* Sources */}
      <SourceAttribution
        reviewedBy="HerbAlly Editorial Team"
        reviewerCredentials="Medical herbalists and healthcare professionals"
        sources={["WHO Monographs", "NCCIH", "PubMed", "Commission E"]}
      />

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Button render={<Link href={`/herbs/${slug1}`} />}>
          <Leaf className="size-4" />
          View {herbA.name} Details
        </Button>
        <Button variant="outline" render={<Link href={`/herbs/${slug2}`} />}>
          <Leaf className="size-4" />
          View {herbB.name} Details
        </Button>
      </div>
    </div>
  );
}