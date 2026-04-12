import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Stethoscope, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@supabase/supabase-js";
import { EvidenceGrade } from "@/components/herbs/evidence-grade";

export const revalidate = 3600;

type Props = { params: Promise<{ symptom: string }> };

const symptomMeta: Record<string, { title: string; description: string; keywords: string[]; dbKeyword: string }> = {
  anxiety: {
    title: "Herbs for Anxiety & Stress",
    description: "Evidence-based herbs for anxiety and stress relief. Compare effectiveness, safety, and drug interactions for herbs like Ashwagandha, Valerian, and Lavender.",
    keywords: ["anxiety herbs", "natural anxiety relief", "herbs for stress", "calming herbs", "adaptogens for anxiety"],
    dbKeyword: "anxiety",
  },
  sleep: {
    title: "Herbs for Sleep & Insomnia",
    description: "Evidence-based herbs for better sleep. Compare effectiveness, safety, and drug interactions for herbs like Valerian, Chamomile, and Melatonin.",
    keywords: ["sleep herbs", "natural sleep aids", "herbs for insomnia", "calming herbs for sleep", "valerian for sleep"],
    dbKeyword: "sleep",
  },
  inflammation: {
    title: "Herbs for Inflammation",
    description: "Evidence-based anti-inflammatory herbs. Compare effectiveness, safety, and drug interactions for Turmeric, Ginger, Boswellia, and more.",
    keywords: ["anti-inflammatory herbs", "herbs for inflammation", "natural inflammation relief", "turmeric benefits", "ginger for inflammation"],
    dbKeyword: "inflammation",
  },
  digestion: {
    title: "Herbs for Digestive Health",
    description: "Evidence-based herbs for digestion, bloating, and gut health. Compare effectiveness and safety for Peppermint, Ginger, Chamomile, and more.",
    keywords: ["digestive herbs", "herbs for bloating", "natural digestion remedies", "peppermint for digestion", "herbs for gut health"],
    dbKeyword: "digestion",
  },
  "blood-pressure": {
    title: "Herbs for Blood Pressure",
    description: "Evidence-based herbs for blood pressure support. Compare effectiveness, safety, and drug interactions for Garlic, Hawthorn, and more.",
    keywords: ["herbs for blood pressure", "natural blood pressure remedies", "hawthorn blood pressure", "garlic for hypertension"],
    dbKeyword: "blood pressure",
  },
  immune: {
    title: "Herbs for Immune Support",
    description: "Evidence-based herbs for immune system support. Compare effectiveness and safety for Echinacea, Elderberry, Astragalus, and more.",
    keywords: ["immune herbs", "herbs for immunity", "natural immune boosters", "echinacea benefits", "elderberry for colds"],
    dbKeyword: "immune",
  },
  headache: {
    title: "Herbs for Headaches & Migraines",
    description: "Evidence-based herbs for headache and migraine relief. Compare effectiveness and safety for Feverfew, Butterbur, and more.",
    keywords: ["herbs for headaches", "natural migraine relief", "feverfew for migraines", "butterbur headache"],
    dbKeyword: "headache",
  },
  liver: {
    title: "Herbs for Liver Health",
    description: "Evidence-based herbs for liver support and detoxification. Compare effectiveness and safety for Milk Thistle, Artichoke, and more.",
    keywords: ["liver herbs", "herbs for liver health", "milk thistle benefits", "natural liver support", "liver detox herbs"],
    dbKeyword: "liver",
  },
  skin: {
    title: "Herbs for Skin Health",
    description: "Evidence-based herbs for skin conditions like eczema, acne, and wound healing. Compare effectiveness and safety for Tea Tree, Calendula, and more.",
    keywords: ["herbs for skin", "natural skin remedies", "tea tree for acne", "calendula for eczema", "herbs for wound healing"],
    dbKeyword: "skin",
  },
  menstrual: {
    title: "Herbs for Menstrual Health",
    description: "Evidence-based herbs for menstrual cramps, PMS, and hormonal balance. Compare effectiveness and safety for Chasteberry, Black Cohosh, and more.",
    keywords: ["herbs for menstrual cramps", "PMS herbs", "natural period relief", "chasteberry for PMS", "herbs for hormonal balance"],
    dbKeyword: "menstrual",
  },
  menopause: {
    title: "Herbs for Menopause",
    description: "Evidence-based herbs for menopause symptoms like hot flashes and night sweats. Compare effectiveness and safety for Black Cohosh, Red Clover, and more.",
    keywords: ["menopause herbs", "natural menopause relief", "black cohosh menopause", "herbs for hot flashes", "red clover menopause"],
    dbKeyword: "menopause",
  },
  cold: {
    title: "Herbs for Cold & Flu",
    description: "Evidence-based herbs for cold and flu relief. Compare effectiveness and safety for Echinacea, Elderberry, Ginger, and more.",
    keywords: ["cold and flu herbs", "natural cold remedies", "echinacea for colds", "elderberry for flu", "herbs for congestion"],
    dbKeyword: "cold",
  },
  joint: {
    title: "Herbs for Joint & Muscle Pain",
    description: "Evidence-based herbs for joint pain, arthritis, and muscle soreness. Compare effectiveness and safety for Turmeric, Boswellia, Devil's Claw, and more.",
    keywords: ["herbs for joint pain", "natural arthritis relief", "turmeric for joints", "boswellia for arthritis", "herbs for muscle pain"],
    dbKeyword: "joint",
  },
  diabetes: {
    title: "Herbs for Blood Sugar & Diabetes",
    description: "Evidence-based herbs for blood sugar support. Compare effectiveness, safety, and drug interactions for Berberine, Cinnamon, Fenugreek, and more.",
    keywords: ["herbs for blood sugar", "natural diabetes support", "berberine for diabetes", "cinnamon for blood sugar", "fenugreek glucose"],
    dbKeyword: "diabetes",
  },
  cholesterol: {
    title: "Herbs for Cholesterol",
    description: "Evidence-based herbs for cholesterol management. Compare effectiveness and safety for Garlic, Artichoke, Green Tea, and more.",
    keywords: ["herbs for cholesterol", "natural cholesterol remedies", "garlic for cholesterol", "artichoke cholesterol", "herbs for heart health"],
    dbKeyword: "cholesterol",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symptom } = await params;
  const meta = symptomMeta[symptom];
  if (!meta) return { title: "Herbs by Symptom" };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app";
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `${baseUrl}/symptoms/${symptom}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/symptoms/${symptom}`,
      type: "article",
      siteName: "HerbAlly",
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(symptomMeta).map((symptom) => ({ symptom }));
}

export default async function SymptomDetailPage({ params }: Props) {
  const { symptom } = await params;
  const meta = symptomMeta[symptom];
  if (!meta) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const keyword = meta.dbKeyword;
  const { data: herbs } = await supabase
    .from("herbs")
    .select("name, slug, scientific_name, evidence_level, pregnancy_safe, nursing_safe, traditional_uses, modern_uses")
    .eq("is_published", true)
    .contains("symptom_keywords", [keyword])
    .order("name", { ascending: true })
    .limit(20);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: meta.title,
            description: meta.description,
            url: `https://herbally.app/symptoms/${symptom}`,
            about: { "@type": "MedicalCondition", name: meta.title },
            publisher: {
              "@type": "Organization",
              name: "HerbAlly",
              url: "https://herbally.app",
            },
          }),
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <Link href="/symptoms" className="text-sm text-primary hover:underline">
          ← All Symptoms
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          {meta.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {meta.description}
        </p>
      </div>

      {/* Medical Disclaimer */}
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex gap-3">
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-semibold">Medical Disclaimer</p>
            <p className="mt-1">
              These herbs are listed for educational purposes only. Effectiveness varies by individual.
              Always consult your healthcare provider before using herbs, especially if you take medications
              or have a medical condition.
            </p>
          </div>
        </div>
      </div>

      {/* Herb Results */}
      {herbs && herbs.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Stethoscope className="size-4" />
            <span>{herbs.length} herbs found for this condition</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {herbs.map((herb: any) => (
              <Link key={herb.slug} href={`/herbs/${herb.slug}`} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {herb.name}
                        </h3>
                        <p className="text-sm italic text-muted-foreground">
                          {herb.scientific_name}
                        </p>
                      </div>
                      <EvidenceGrade level={herb.evidence_level || "C"} showLabel={false} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(!herb.pregnancy_safe || !herb.nursing_safe) && (
                        <Badge variant="destructive" className="text-xs">⚠️ Pregnancy/Nursing Risk</Badge>
                      )}
                      {(herb.traditional_uses || herb.modern_uses || []).slice(0, 3).map((use: string) => (
                        <Badge key={use} variant="outline" className="text-xs">{use}</Badge>
                      ))}
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      View details <ArrowRight className="size-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No herbs found for this condition yet.</p>
          <Link href="/herbs" className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Browse All Herbs
          </Link>
        </div>
      )}

      {/* Compare CTA */}
      {herbs && herbs.length >= 2 && (
        <div className="mt-8 rounded-lg border bg-muted/50 p-6 text-center">
          <h2 className="text-xl font-bold text-foreground">Compare These Herbs</h2>
          <p className="mt-2 text-muted-foreground">
            See side-by-side comparisons of effectiveness, safety, and interactions.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href={`/compare/${herbs[0].slug}/vs/${herbs[1].slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Shield className="size-4" />
              {herbs[0].name} vs {herbs[1].name}
            </Link>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/pharmacist"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          <Stethoscope className="size-4" />
          Ask the AI Herbalist about {meta.title.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}