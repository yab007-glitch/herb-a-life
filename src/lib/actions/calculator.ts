"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/lib/types";

export async function saveDosageCalculation(params: {
  herbId?: string;
  patientAge?: number;
  patientWeightKg?: number;
  patientHeightCm?: number;
  patientBsa?: number;
  adultDose: string;
  calculatedDose: string;
  formulaUsed: "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule";
  notes?: string;
}): Promise<ActionResponse<{ id: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("dosage_calculations")
      .insert({
        user_id: user?.id || null,
        herb_id: params.herbId || null,
        patient_age: params.patientAge || null,
        patient_weight_kg: params.patientWeightKg || null,
        patient_height_cm: params.patientHeightCm || null,
        patient_bsa: params.patientBsa || null,
        adult_dose: params.adultDose,
        calculated_dose: params.calculatedDose,
        formula_used: params.formulaUsed,
        notes: params.notes || null,
      })
      .select("id")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { id: data.id } };
  } catch {
    return { success: false, error: "Failed to save calculation" };
  }
}
