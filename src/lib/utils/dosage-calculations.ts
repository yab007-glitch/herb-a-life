export type DoseResult = {
  dose: number;
  unit: string;
  formula: string;
  explanation: string;
};

/**
 * Clark's Rule: (weight_kg / 68) x adult_dose
 * Best for weight-based dosing for children 2+ years
 */
export function clarksRule(weightKg: number, adultDoseMg: number): DoseResult {
  const dose = (weightKg / 68) * adultDoseMg;
  return {
    dose: Math.round(dose * 10) / 10,
    unit: "mg",
    formula: `(${weightKg} kg / 68) x ${adultDoseMg} mg`,
    explanation: `Based on Clark's Rule using patient weight of ${weightKg} kg. The standard adult reference weight is 68 kg (150 lbs).`,
  };
}

/**
 * Young's Rule: (age / (age + 12)) x adult_dose
 * Age-based dosing for children 2-12 years
 */
export function youngsRule(ageYears: number, adultDoseMg: number): DoseResult {
  const dose = (ageYears / (ageYears + 12)) * adultDoseMg;
  return {
    dose: Math.round(dose * 10) / 10,
    unit: "mg",
    formula: `(${ageYears} / (${ageYears} + 12)) x ${adultDoseMg} mg`,
    explanation: `Based on Young's Rule using patient age of ${ageYears} years. This formula is best for children aged 2-12 when weight is unknown.`,
  };
}

/**
 * BSA Method (Mosteller): (BSA / 1.73) x adult_dose
 * BSA = sqrt((height_cm x weight_kg) / 3600)
 * Most accurate method
 */
export function bsaMethod(
  heightCm: number,
  weightKg: number,
  adultDoseMg: number
): DoseResult {
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  const dose = (bsa / 1.73) * adultDoseMg;
  return {
    dose: Math.round(dose * 10) / 10,
    unit: "mg",
    formula: `(${bsa.toFixed(3)} m² / 1.73) x ${adultDoseMg} mg`,
    explanation: `Based on BSA method using body surface area of ${bsa.toFixed(3)} m² (height: ${heightCm} cm, weight: ${weightKg} kg). The standard adult BSA is 1.73 m². This is the most accurate dosing method.`,
  };
}

/**
 * Fried's Rule: (age_months / 150) x adult_dose
 * For infants under 2 years
 */
export function friedsRule(
  ageMonths: number,
  adultDoseMg: number
): DoseResult {
  const dose = (ageMonths / 150) * adultDoseMg;
  return {
    dose: Math.round(dose * 10) / 10,
    unit: "mg",
    formula: `(${ageMonths} months / 150) x ${adultDoseMg} mg`,
    explanation: `Based on Fried's Rule using infant age of ${ageMonths} months. This formula is specifically designed for infants under 2 years of age.`,
  };
}

/**
 * Calculate BSA using the Mosteller formula
 */
export function calculateBSA(heightCm: number, weightKg: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/**
 * Convert pounds to kilograms
 */
export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.453592 * 10) / 10;
}

/**
 * Convert kilograms to pounds
 */
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

/**
 * Recommend the best formula based on available patient data
 */
export function recommendFormula(params: {
  ageYears?: number;
  ageMonths?: number;
  weightKg?: number;
  heightCm?: number;
}): "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule" {
  const { ageYears, ageMonths, weightKg, heightCm } = params;

  // Infants under 2 years
  if (ageMonths !== undefined && ageMonths < 24) {
    return "fried_rule";
  }
  if (ageYears !== undefined && ageYears < 2) {
    return "fried_rule";
  }

  // If both height and weight available, BSA is most accurate
  if (weightKg && heightCm) {
    return "bsa";
  }

  // Weight-based is next best
  if (weightKg) {
    return "clarks_rule";
  }

  // Age-based as fallback
  return "youngs_rule";
}
