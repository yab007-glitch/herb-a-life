"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResponse, DrugInteraction } from "@/lib/types";
import type { Json } from "@/lib/types/database";

export async function checkInteractions(
  herbId: string,
  drugNames: string[]
): Promise<ActionResponse<DrugInteraction[]>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("drug_interactions")
      .select("*")
      .eq("herb_id", herbId)
      .in(
        "drug_name",
        drugNames.map((d) => d.toLowerCase())
      );

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data || []) as DrugInteraction[] };
  } catch {
    return { success: false, error: "Failed to check interactions" };
  }
}

export async function getInteractionsForHerb(
  herbId: string
): Promise<ActionResponse<DrugInteraction[]>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("drug_interactions")
      .select("*")
      .eq("herb_id", herbId)
      .order("severity", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data || []) as DrugInteraction[] };
  } catch {
    return { success: false, error: "Failed to fetch interactions" };
  }
}

export async function saveInteractionCheck(params: {
  herbId: string;
  medicationsChecked: string[];
  results: Record<string, unknown>[];
  severitySummary: string | null;
}): Promise<ActionResponse<{ id: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Must be logged in to save checks" };
    }

    const { data, error } = await supabase
      .from("interaction_checks")
      .insert({
        user_id: user.id,
        herb_id: params.herbId,
        medications_checked: params.medicationsChecked as unknown as Json,
        results: params.results as unknown as Json,
        severity_summary: params.severitySummary as
          | "mild"
          | "moderate"
          | "severe"
          | "contraindicated"
          | null,
      })
      .select("id")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { id: data.id } };
  } catch {
    return { success: false, error: "Failed to save interaction check" };
  }
}
