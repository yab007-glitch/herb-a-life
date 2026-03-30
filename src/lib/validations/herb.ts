import { z } from "zod/v4";

export const herbSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  scientific_name: z.string().min(2, "Scientific name is required"),
  common_names: z.array(z.string()).default([]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  active_compounds: z.array(z.string()).default([]),
  traditional_uses: z.array(z.string()).default([]),
  modern_uses: z.array(z.string()).default([]),
  dosage_adult: z.string().optional(),
  dosage_child: z.string().optional(),
  dosage_forms: z.array(z.string()).default([]),
  preparation_notes: z.string().optional(),
  contraindications: z.array(z.string()).default([]),
  side_effects: z.array(z.string()).default([]),
  pregnancy_safe: z.boolean().default(false),
  nursing_safe: z.boolean().default(false),
  category_id: z.string().uuid().optional(),
  is_published: z.boolean().default(true),
});

export const interactionSchema = z.object({
  herb_id: z.string().uuid(),
  drug_name: z.string().min(2, "Drug name is required"),
  rxcui: z.string().optional(),
  severity: z.enum(["mild", "moderate", "severe", "contraindicated"]),
  description: z.string().min(10, "Description is required"),
  mechanism: z.string().optional(),
  evidence_level: z.string().optional(),
  source: z.string().optional(),
  source_url: z.string().url().optional(),
});

export type HerbInput = z.infer<typeof herbSchema>;
export type InteractionInput = z.infer<typeof interactionSchema>;
