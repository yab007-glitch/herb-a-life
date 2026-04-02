"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { ActionResponse, Herb, DrugInteraction } from "@/lib/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Not authorized");

  return supabase;
}

export async function createHerb(
  formData: FormData
): Promise<ActionResponse<Herb>> {
  try {
    const supabase = await requireAdmin();

    const name = formData.get("name") as string;
    const { data, error } = await supabase
      .from("herbs")
      .insert({
        name,
        slug: slugify(name),
        scientific_name: formData.get("scientific_name") as string,
        description: formData.get("description") as string,
        dosage_adult: (formData.get("dosage_adult") as string) || null,
        pregnancy_safe: formData.get("pregnancy_safe") === "true",
        nursing_safe: formData.get("nursing_safe") === "true",
        category_id: (formData.get("category_id") as string) || null,
        is_published: formData.get("is_published") !== "false",
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Herb };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create herb",
    };
  }
}

export async function updateHerb(
  id: string,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const supabase = await requireAdmin();

    const name = formData.get("name") as string;
    const { error } = await supabase
      .from("herbs")
      .update({
        name,
        slug: slugify(name),
        scientific_name: formData.get("scientific_name") as string,
        description: formData.get("description") as string,
        dosage_adult: (formData.get("dosage_adult") as string) || null,
        pregnancy_safe: formData.get("pregnancy_safe") === "true",
        nursing_safe: formData.get("nursing_safe") === "true",
        category_id: (formData.get("category_id") as string) || null,
        is_published: formData.get("is_published") !== "false",
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update herb",
    };
  }
}

export async function deleteHerb(id: string): Promise<ActionResponse> {
  try {
    const supabase = await requireAdmin();

    const { error } = await supabase.from("herbs").delete().eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete herb",
    };
  }
}

export async function toggleHerbPublished(
  id: string,
  published: boolean
): Promise<ActionResponse> {
  try {
    const supabase = await requireAdmin();

    const { error } = await supabase
      .from("herbs")
      .update({ is_published: published })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "Failed to toggle publish status" };
  }
}

export async function createInteraction(
  formData: FormData
): Promise<ActionResponse<DrugInteraction>> {
  try {
    const supabase = await requireAdmin();

    const { data, error } = await supabase
      .from("drug_interactions")
      .insert({
        herb_id: formData.get("herb_id") as string,
        drug_name: formData.get("drug_name") as string,
        severity: formData.get("severity") as "mild" | "moderate" | "severe" | "contraindicated",
        description: formData.get("description") as string,
        mechanism: (formData.get("mechanism") as string) || null,
        evidence_level: (formData.get("evidence_level") as string) || null,
        source: (formData.get("source") as string) || null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as DrugInteraction };
  } catch {
    return { success: false, error: "Failed to create interaction" };
  }
}

export async function deleteInteraction(
  id: string
): Promise<ActionResponse> {
  try {
    const supabase = await requireAdmin();

    const { error } = await supabase
      .from("drug_interactions")
      .delete()
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete interaction" };
  }
}

export async function getAdminStats(): Promise<
  ActionResponse<{
    totalHerbs: number;
    totalInteractions: number;
    totalUsers: number;
    totalChecks: number;
  }>
> {
  try {
    const supabase = await requireAdmin();

    const [herbs, interactions, users, checks] = await Promise.all([
      supabase.from("herbs").select("id", { count: "exact", head: true }),
      supabase.from("drug_interactions").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("interaction_checks").select("id", { count: "exact", head: true }),
    ]);

    return {
      success: true,
      data: {
        totalHerbs: herbs.count || 0,
        totalInteractions: interactions.count || 0,
        totalUsers: users.count || 0,
        totalChecks: checks.count || 0,
      },
    };
  } catch {
    return { success: false, error: "Failed to fetch admin stats" };
  }
}
