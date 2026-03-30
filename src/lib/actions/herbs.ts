"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResponse, Herb, HerbWithCategory, HerbWithInteractions } from "@/lib/types";

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
      const q = params.query.replace(/'/g, "''");

      // First, get IDs from deep symptom search (searches traditional_uses, modern_uses arrays)
      const { data: rpcResults } = await supabase.rpc(
        "search_herbs_by_symptom",
        { search_term: q }
      );
      const matchedIds = (rpcResults || []).map((h: { id: string }) => h.id);

      if (matchedIds.length > 0) {
        query = query.in("id", matchedIds);
      } else {
        // Fallback to basic text search if RPC returns nothing
        query = query.or(
          `name.ilike.%${q}%,scientific_name.ilike.%${q}%,description.ilike.%${q}%`
        );
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function searchHerbs(
  term: string
): Promise<ActionResponse<Herb[]>> {
  try {
    const supabase = await createClient();

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
  } catch (error) {
    return { success: false, error: "Failed to search herbs" };
  }
}
