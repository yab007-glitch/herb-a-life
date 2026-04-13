"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  ActionResponse,
  Herb,
  HerbWithCategory,
  HerbWithInteractions,
} from "@/lib/types";

const ITEMS_PER_PAGE = 20;

/**
 * Symptom keyword mapping — maps common user search terms to DB symptom_keywords
 * Users search in natural language; DB uses specific keywords
 */
const SYNONYM_MAP: Record<string, string[]> = {
  // Common mental health searches
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
  // Physical health
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
  // Women's health
  menstrual: ["menstrual", "hormonal", "cramps", "pms"],
  menopause: ["menopause", "hormonal", "hot flashes"],
  hormonal: ["hormonal", "menstrual", "menopause", "endocrine"],
  // Skin
  acne: ["skin", "acne", "anti-inflammatory"],
  skin: ["skin", "wound", "anti-inflammatory", "antimicrobial"],
  wound: ["wound", "skin", "healing", "antimicrobial"],
  // Men's health
  prostate: ["prostate", "saw-palmetto", "urinary"],
  testosterone: ["testosterone", "mens", "energy", "libido"],
  // General
  weight: ["weight", "metabolic", "digestion"],
  diabetes: ["blood-sugar", "diabetes", "metabolic", "glucose"],
  blood_sugar: ["blood-sugar", "diabetes", "metabolic", "glucose"],
  detox: ["liver", "detox", "cleansing"],
};

/**
 * Expand a user query into DB-friendly symptom keywords using synonym mapping
 */
function expandQueryToKeywords(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const keywords = new Set<string>();

  for (const word of words) {
    // Direct mapping
    if (SYNONYM_MAP[word]) {
      SYNONYM_MAP[word].forEach(k => keywords.add(k));
    }
    // Always include the word itself
    keywords.add(word);
    // Also try common variations
    keywords.add(word.replace(/[_-]/g, " "));
  }

  return Array.from(keywords);
}

export async function getHerbs(params: {
  query?: string;
  category?: string;
  pregnancySafe?: boolean;
  nursingSafe?: boolean;
  page?: number;
}): Promise<ActionResponse<{ herbs: HerbWithCategory[]; total: number }>> {
  try {
    const supabase = await createClient();
    const page = params.page || 1;
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase
      .from("herbs")
      .select("*, herb_categories(*)", { count: "exact" })
      .eq("is_published", true)
      .order("name", { ascending: true })
      .range(from, to);

    if (params.query) {
      const q = params.query.trim();
      const words = q.split(/\s+/).filter(Boolean);

      if (words.length > 0) {
        // Strategy: Expand query to symptom keywords, use overlaps for broad match
        const expandedKeywords = expandQueryToKeywords(q);

        // Step 1: Try symptom_keywords overlap (any keyword matches)
        const { data: keywordResults } = await supabase
          .from("herbs")
          .select("id, evidence_level")
          .eq("is_published", true)
          .overlaps("symptom_keywords", expandedKeywords)
          .limit(500);

        let matchedIds: string[] = (keywordResults || []).map((h: { id: string }) => h.id);

        // Step 2: If keyword match found results, use them (ranked by evidence)
        if (matchedIds.length > 0) {
          // Sort by evidence level: A first, then B, etc.
          const evidenceOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, trad: 4 };
          const sortedResults = (keywordResults || []).sort((a: { evidence_level: string | null }, b: { evidence_level: string | null }) => {
            const ea = evidenceOrder[a.evidence_level || "C"] ?? 2;
            const eb = evidenceOrder[b.evidence_level || "C"] ?? 2;
            return ea - eb;
          });
          matchedIds = sortedResults.map((h: { id: string }) => h.id);
          query = query.in("id", matchedIds);
        } else {
          // Step 3: Fallback to full-text search across name, description, uses
          // Build OR conditions for each word
          const conditions = words
            .flatMap(w => [
              `name.ilike.%${w}%`,
              `scientific_name.ilike.%${w}%`,
              `description.ilike.%${w}%`,
            ])
            .join(",");
          query = query.or(conditions);
        }
      }
    }

    if (params.category) {
      const { data: cat } = await supabase
        .from("herb_categories")
        .select("id")
        .eq("slug", params.category)
        .single();
      if (cat) {
        query = query.eq("category_id", cat.id);
      }
    }

    if (params.pregnancySafe) {
      query = query.eq("pregnancy_safe", true);
    }

    if (params.nursingSafe) {
      query = query.eq("nursing_safe", true);
    }

    const { data, count, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        herbs: (data || []) as HerbWithCategory[],
        total: count || 0,
      },
    };
  } catch {
    return { success: false, error: "Failed to fetch herbs" };
  }
}

export async function getHerbBySlug(
  slug: string
): Promise<ActionResponse<HerbWithInteractions>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("herbs")
      .select("*, herb_categories(*), drug_interactions(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as HerbWithInteractions };
  } catch {
    return { success: false, error: "Failed to fetch herb" };
  }
}

export async function getHerbCategories() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("herb_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch {
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getSymptomCounts(
  symptoms: string[]
): Promise<ActionResponse<Record<string, number>>> {
  try {
    const supabase = await createClient();
    const counts: Record<string, number> = {};

    await Promise.all(
      symptoms.map(async (symptom) => {
        const { count } = await supabase
          .from("herbs")
          .select("id", { count: "exact", head: true })
          .eq("is_published", true)
          .or(`name.ilike.%${symptom}%,description.ilike.%${symptom}%`);
        counts[symptom] = count ?? 0;
      })
    );

    return { success: true, data: counts };
  } catch {
    return { success: false, error: "Failed to fetch symptom counts" };
  }
}

export async function searchHerbs(
  term: string
): Promise<ActionResponse<Herb[]>> {
  try {
    const supabase = await createClient();

    // Try symptom keywords first with synonym expansion
    const expandedKeywords = expandQueryToKeywords(term);
    const { data: keywordResults } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, evidence_level")
      .eq("is_published", true)
      .overlaps("symptom_keywords", expandedKeywords)
      .limit(10);

    if (keywordResults && keywordResults.length > 0) {
      const evidenceOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, trad: 4 };
      const sorted = keywordResults.sort((a: { evidence_level: string | null }, b: { evidence_level: string | null }) => {
        const ea = evidenceOrder[a.evidence_level || "C"] ?? 2;
        const eb = evidenceOrder[b.evidence_level || "C"] ?? 2;
        return ea - eb;
      });
      return { success: true, data: sorted as Herb[] };
    }

    // Fallback to text search
    const { data, error } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name")
      .eq("is_published", true)
      .or(
        `name.ilike.%${term}%,scientific_name.ilike.%${term}%,description.ilike.%${term}%`
      )
      .limit(10);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data || []) as Herb[] };
  } catch {
    return { success: false, error: "Failed to search herbs" };
  }
}