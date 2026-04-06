import type { Database } from "./database";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Profile = Tables<"profiles">;
export type HerbCategory = Tables<"herb_categories">;
export type Herb = Tables<"herbs">;
export type DrugInteraction = Tables<"drug_interactions">;
export type UserMedication = Tables<"user_medications">;
export type InteractionCheck = Tables<"interaction_checks">;
export type DosageCalculation = Tables<"dosage_calculations">;
export type ChatSession = Tables<"chat_sessions">;

export type UserRole = "user" | "admin";
export type InteractionSeverity =
  | "mild"
  | "moderate"
  | "severe"
  | "contraindicated";
export type DosageForm =
  | "capsule"
  | "tablet"
  | "tincture"
  | "tea"
  | "powder"
  | "essential_oil"
  | "extract"
  | "topical"
  | "other";
export type FormulaType = "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule";

// Extended types with joins
export type HerbWithCategory = Herb & {
  herb_categories: HerbCategory | null;
};

export type HerbWithInteractions = Herb & {
  herb_categories: HerbCategory | null;
  drug_interactions: DrugInteraction[];
};

export type InteractionCheckWithHerb = InteractionCheck & {
  herbs: Herb | null;
};

export type DosageCalculationWithHerb = DosageCalculation & {
  herbs: Herb | null;
};

// Chat message type
export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
};

// Action response type
export type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};
