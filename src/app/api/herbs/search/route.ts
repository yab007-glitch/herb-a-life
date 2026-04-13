import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/** Synonym map — mirrors the one in herbs.ts for API route use */
const SYNONYM_MAP: Record<string, string[]> = {
  anxiety: ["anxiety", "stress", "calm", "relax", "nervous"],
  stress: ["stress", "anxiety", "adaptogen", "calm"],
  depression: ["depression", "mood", "anxiety"],
  sleep: ["sleep", "insomnia", "calm", "relax", "sedative"],
  calm: ["calm", "anxiety", "relax", "sleep", "nervine"],
  relax: ["relax", "calm", "sleep", "anxiety", "muscle"],
  focus: ["focus", "cognitive", "memory", "concentration", "brain"],
  energy: ["energy", "stimulant", "adaptogen", "fatigue"],
  pain: ["pain", "analgesic", "anti-inflammatory", "inflammation"],
  headache: ["headache", "migraine", "pain"],
  inflammation: ["inflammation", "anti-inflammatory", "pain", "swelling"],
  digestion: ["digestion", "digestive", "stomach", "gut", "nausea", "bloating"],
  stomach: ["digestion", "stomach", "nausea", "digestive"],
  nausea: ["nausea", "digestion", "digestive", "stomach"],
  constipation: ["constipation", "digestion", "laxative", "digestive"],
  liver: ["liver", "hepatoprotective", "detox"],
  blood_pressure: ["blood-pressure", "cardiovascular", "heart"],
  bloodpressure: ["blood-pressure", "cardiovascular", "heart"],
  cholesterol: ["cholesterol", "cardiovascular", "lipid"],
  heart: ["cardiovascular", "heart", "blood-pressure", "circulation"],
  immune: ["immune", "antiviral", "antibacterial", "infection"],
  cold: ["cold", "immune", "antiviral", "respiratory", "cough"],
  cough: ["cough", "respiratory", "cold", "throat"],
  allergy: ["allergy", "antihistamine", "immune"],
  menstrual: ["menstrual", "hormonal", "cramps", "pms"],
  menopause: ["menopause", "hormonal", "hot flashes"],
  hormonal: ["hormonal", "menstrual", "menopause", "endocrine"],
  acne: ["skin", "acne", "anti-inflammatory"],
  skin: ["skin", "wound", "anti-inflammatory", "antimicrobial"],
  wound: ["wound", "skin", "healing", "antimicrobial"],
  prostate: ["prostate", "saw-palmetto", "urinary"],
  testosterone: ["testosterone", "mens", "energy", "libido"],
  weight: ["weight", "metabolic", "digestion"],
  diabetes: ["blood-sugar", "diabetes", "metabolic", "glucose"],
  blood_sugar: ["blood-sugar", "diabetes", "metabolic", "glucose"],
  detox: ["liver", "detox", "cleansing"],
};

function expandQueryToKeywords(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const keywords = new Set<string>();
  for (const word of words) {
    if (SYNONYM_MAP[word]) {
      SYNONYM_MAP[word].forEach(k => keywords.add(k));
    }
    keywords.add(word);
    keywords.add(word.replace(/[_-]/g, " "));
  }
  return Array.from(keywords);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get("q");

  if (!term || term.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Expand query using synonym map
    const expandedKeywords = expandQueryToKeywords(term);

    // Step 1: Symptom keyword overlap (broad match, any keyword)
    const { data: symptomResults, error: symptomError } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, evidence_level")
      .eq("is_published", true)
      .overlaps("symptom_keywords", expandedKeywords)
      .limit(30);

    // Step 2: Text search on name, scientific_name, description
    const words = term.trim().split(/\s+/).filter(Boolean);
    const textConditions = words
      .flatMap(w => [
        `name.ilike.%${w}%`,
        `scientific_name.ilike.%${w}%`,
        `description.ilike.%${w}%`,
      ])
      .join(",");

    const { data: textResults, error: textError } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, evidence_level")
      .eq("is_published", true)
      .or(textConditions)
      .limit(20);

    if (symptomError && textError) {
      return NextResponse.json([]);
    }

    // Merge results, deduplicate by id
    const seen = new Set<string>();
    const results: Array<{
      id: string;
      name: string;
      slug: string;
      scientific_name: string;
      evidence_level: string;
      matchedBy: string;
    }> = [];

    // Sort symptom results by evidence level
    const evidenceOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, trad: 4 };
    const sortedSymptomResults = (symptomResults || []).sort(
      (a: { evidence_level: string | null }, b: { evidence_level: string | null }) => {
        const ea = evidenceOrder[a.evidence_level || "C"] ?? 2;
        const eb = evidenceOrder[b.evidence_level || "C"] ?? 2;
        return ea - eb;
      }
    );

    for (const herb of sortedSymptomResults) {
      if (!seen.has(herb.id)) {
        seen.add(herb.id);
        results.push({
          ...herb,
          matchedBy: "symptom",
        });
      }
    }

    for (const herb of (textResults || [])) {
      if (!seen.has(herb.id)) {
        seen.add(herb.id);
        results.push({
          ...herb,
          matchedBy: "name",
        });
      }
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json([]);
  }
}