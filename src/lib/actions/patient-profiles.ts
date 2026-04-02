"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/lib/types";

export type PatientProfile = {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  age_years: number | null;
  age_months: number | null;
  weight_kg: number | null;
  height_cm: number | null;
  notes: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPatientProfiles(): Promise<
  ActionResponse<PatientProfile[]>
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("patient_profiles")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data ?? []) as PatientProfile[] };
  } catch {
    return { success: false, error: "Failed to fetch profiles" };
  }
}

export async function addPatientProfile(
  formData: FormData
): Promise<ActionResponse<PatientProfile>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const ageYears = formData.get("age_years") as string;
    const ageMonths = formData.get("age_months") as string;
    const weightKg = formData.get("weight_kg") as string;
    const heightCm = formData.get("height_cm") as string;

    const { data, error } = await supabase
      .from("patient_profiles")
      .insert({
        user_id: user.id,
        name: formData.get("name") as string,
        relationship: (formData.get("relationship") as string) || "self",
        age_years: ageYears ? parseInt(ageYears) : null,
        age_months: ageMonths ? parseInt(ageMonths) : null,
        weight_kg: weightKg ? parseFloat(weightKg) : null,
        height_cm: heightCm ? parseFloat(heightCm) : null,
        notes: (formData.get("notes") as string) || null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as PatientProfile };
  } catch {
    return { success: false, error: "Failed to add profile" };
  }
}

export async function removePatientProfile(
  id: string
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
      .from("patient_profiles")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to remove profile" };
  }
}
