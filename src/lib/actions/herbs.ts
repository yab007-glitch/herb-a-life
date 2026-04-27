"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import {
  localizeHerb,
  localizeInteraction,
  localizeCategoryName,
} from "@/lib/utils/localize-herb";
import { expandQueryToKeywords } from "@/lib/data/synonym-map";
import type {
  ActionResponse,
  Herb,
  HerbWithCategory,
  HerbWithInteractions,
  HerbCategory,
} from "@/lib/types";

async function getLocale(): Promise<string> {
  try {
    const store = await cookies();
    return store.get("herbally-locale")?.value === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

const ITEMS_PER_PAGE = 20;

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
        const expandedKeywords = expandQueryToKeywords(q);

        const { data: keywordResults } = await supabase
          .from("herbs")
          .select("id, evidence_level")
          .eq("is_published", true)
          .overlaps("symptom_keywords", expandedKeywords)
          .limit(500);

        let matchedIds: string[] = (keywordResults || []).map(
          (h: { id: string }) => h.id
        );
        if (matchedIds.length > 0) {
          const evidenceOrder: Record<string, number> = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            trad: 4,
          };
          const sortedResults = (keywordResults || []).sort(
            (
              a: { evidence_level: string | null },
              b: { evidence_level: string | null }
            ) => {
              const ea = evidenceOrder[a.evidence_level || "C"] ?? 2;
              const eb = evidenceOrder[b.evidence_level || "C"] ?? 2;
              return ea - eb;
            }
          );
          matchedIds = sortedResults.map((h: { id: string }) => h.id);
          query = query.in("id", matchedIds);
        } else {
          const conditions = words
            .flatMap((w) => [
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

    const locale = await getLocale();
    const localizedHerbs = (data || []).map((h) =>
      localizeHerb(h as HerbWithCategory, locale)
    );
    return {
      success: true,
      data: {
        herbs: localizedHerbs as HerbWithCategory[],
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

    const locale = await getLocale();
    const herb = localizeHerb(data as HerbWithInteractions, locale);
    const interactions = (herb.drug_interactions || []).map((ix) =>
      localizeInteraction(ix, locale)
    );
    return {
      success: true,
      data: {
        ...herb,
        drug_interactions: interactions,
      } as HerbWithInteractions,
    };
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

    const locale = await getLocale();
    const localized = (data || []).map((cat) => ({
      ...cat,
      name: localizeCategoryName(
        cat as HerbCategory & { name_fr?: string | null },
        locale
      ),
    }));
    return { success: true, data: localized };
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

    const expandedKeywords = expandQueryToKeywords(term);
    const { data: keywordResults } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, evidence_level")
      .eq("is_published", true)
      .overlaps("symptom_keywords", expandedKeywords)
      .limit(10);

    const locale = await getLocale();
    if (keywordResults && keywordResults.length > 0) {
      const evidenceOrder: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        trad: 4,
      };
      const sorted = keywordResults.sort(
        (
          a: { evidence_level: string | null },
          b: { evidence_level: string | null }
        ) => {
          const ea = evidenceOrder[a.evidence_level || "C"] ?? 2;
          const eb = evidenceOrder[b.evidence_level || "C"] ?? 2;
          return ea - eb;
        }
      );
      return { success: true, data: sorted as Herb[] };
    }

    const { data, error } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, translations")
      .eq("is_published", true)
      .or(
        `name.ilike.%${term}%,scientific_name.ilike.%${term}%,description.ilike.%${term}%`
      )
      .limit(10);

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: (data || []).map((h) => localizeHerb(h as Herb, locale)) as Herb[],
    };
  } catch {
    return { success: false, error: "Failed to search herbs" };
  }
}
