import { z } from "zod/v4";

export const medicationSchema = z.object({
  drug_name: z.string().min(2, "Drug name is required"),
  rxcui: z.string().optional(),
  dosage: z.string().optional(),
  frequency: z.string().optional(),
  notes: z.string().optional(),
});

export type MedicationInput = z.infer<typeof medicationSchema>;
