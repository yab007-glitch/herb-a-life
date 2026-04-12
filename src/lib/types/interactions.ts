export interface Interaction {
  id: string;
  drug_name: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  description: string;
}
