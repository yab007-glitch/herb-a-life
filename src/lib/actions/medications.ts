"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResponse, UserMedication } from "@/lib/types";

export async function getUserMedications(): Promise<
  ActionResponse<UserMedication[]>
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
      .from("user_medications")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data || []) as UserMedication[] };
  } catch {
    return { success: false, error: "Failed to fetch medications" };
  }
}

export async function addMedication(
  formData: FormData
): Promise<ActionResponse<UserMedication>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("user_medications")
      .insert({
        user_id: user.id,
        drug_name: formData.get("drug_name") as string,
        rxcui: (formData.get("rxcui") as string) || null,
        dosage: (formData.get("dosage") as string) || null,
        frequency: (formData.get("frequency") as string) || null,
        notes: (formData.get("notes") as string) || null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true, data: data as UserMedication };
  } catch {
    return { success: false, error: "Failed to add medication" };
  }
}

export async function removeMedication(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
      .from("user_medications")
      .update({ is_active: false })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to remove medication" };
  }
}
