export const DOSAGE_FORMULAS = {
  clarks_rule: {
    name: "Clark's Rule",
    description:
      "Based on patient weight. Best for children and adults of varying sizes.",
    formula: "Child Dose = (Weight in kg / 68) x Adult Dose",
    bestFor: "Children 2+ years, weight-based dosing",
    requires: ["weight"],
  },
  youngs_rule: {
    name: "Young's Rule",
    description:
      "Based on patient age. Simple but less accurate than weight-based methods.",
    formula: "Child Dose = (Age / (Age + 12)) x Adult Dose",
    bestFor: "Children 2-12 years when weight is unknown",
    requires: ["age"],
  },
  bsa: {
    name: "BSA Method (Mosteller)",
    description:
      "Based on body surface area. Most accurate method for dosage calculation.",
    formula:
      "Dose = (BSA / 1.73) x Adult Dose, where BSA = sqrt(Height x Weight / 3600)",
    bestFor: "Most accurate for all ages when height and weight are known",
    requires: ["weight", "height"],
  },
  fried_rule: {
    name: "Fried's Rule",
    description: "Specifically designed for infants under 2 years of age.",
    formula: "Infant Dose = (Age in months / 150) x Adult Dose",
    bestFor: "Infants under 2 years",
    requires: ["age_months"],
  },
} as const;

export type FormulaKey = keyof typeof DOSAGE_FORMULAS;
