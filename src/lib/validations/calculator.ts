import { z } from "zod/v4";

export const calculatorSchema = z.object({
  herb_id: z.string().uuid().optional(),
  adult_dose_value: z
    .number()
    .min(0.1, "Dose must be greater than 0")
    .max(100000),
  adult_dose_unit: z.enum(["mg", "ml", "g", "drops"]),
  patient_age_years: z.number().min(0).max(120).optional(),
  patient_age_months: z.number().min(0).max(24).optional(),
  patient_weight_kg: z.number().min(0.5).max(300).optional(),
  patient_height_cm: z.number().min(30).max(250).optional(),
  formula: z.enum(["clarks_rule", "youngs_rule", "bsa", "fried_rule"]),
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;
