export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "user" | "admin";
          full_name: string;
          email: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "user" | "admin";
          full_name?: string;
          email: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: "user" | "admin";
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      herb_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      herbs: {
        Row: {
          id: string;
          name: string;
          slug: string;
          scientific_name: string;
          common_names: string[];
          description: string;
          active_compounds: string[];
          traditional_uses: string[];
          modern_uses: string[];
          dosage_adult: string | null;
          dosage_child: string | null;
          dosage_forms: string[];
          preparation_notes: string | null;
          contraindications: string[];
          side_effects: string[];
          pregnancy_safe: boolean;
          nursing_safe: boolean;
          category_id: string | null;
          image_url: string | null;
          pubchem_cid: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          scientific_name: string;
          common_names?: string[];
          description: string;
          active_compounds?: string[];
          traditional_uses?: string[];
          modern_uses?: string[];
          dosage_adult?: string | null;
          dosage_child?: string | null;
          dosage_forms?: string[];
          preparation_notes?: string | null;
          contraindications?: string[];
          side_effects?: string[];
          pregnancy_safe?: boolean;
          nursing_safe?: boolean;
          category_id?: string | null;
          image_url?: string | null;
          pubchem_cid?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          scientific_name?: string;
          common_names?: string[];
          description?: string;
          active_compounds?: string[];
          traditional_uses?: string[];
          modern_uses?: string[];
          dosage_adult?: string | null;
          dosage_child?: string | null;
          dosage_forms?: string[];
          preparation_notes?: string | null;
          contraindications?: string[];
          side_effects?: string[];
          pregnancy_safe?: boolean;
          nursing_safe?: boolean;
          category_id?: string | null;
          image_url?: string | null;
          pubchem_cid?: string | null;
          is_published?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "herbs_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "herb_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      drug_interactions: {
        Row: {
          id: string;
          herb_id: string;
          drug_name: string;
          rxcui: string | null;
          severity: "mild" | "moderate" | "severe" | "contraindicated";
          description: string;
          mechanism: string | null;
          evidence_level: string | null;
          source: string | null;
          source_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          herb_id: string;
          drug_name: string;
          rxcui?: string | null;
          severity?: "mild" | "moderate" | "severe" | "contraindicated";
          description: string;
          mechanism?: string | null;
          evidence_level?: string | null;
          source?: string | null;
          source_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          herb_id?: string;
          drug_name?: string;
          rxcui?: string | null;
          severity?: "mild" | "moderate" | "severe" | "contraindicated";
          description?: string;
          mechanism?: string | null;
          evidence_level?: string | null;
          source?: string | null;
          source_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "drug_interactions_herb_id_fkey";
            columns: ["herb_id"];
            isOneToOne: false;
            referencedRelation: "herbs";
            referencedColumns: ["id"];
          },
        ];
      };
      user_medications: {
        Row: {
          id: string;
          user_id: string;
          drug_name: string;
          rxcui: string | null;
          dosage: string | null;
          frequency: string | null;
          notes: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          drug_name: string;
          rxcui?: string | null;
          dosage?: string | null;
          frequency?: string | null;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          drug_name?: string;
          rxcui?: string | null;
          dosage?: string | null;
          frequency?: string | null;
          notes?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      interaction_checks: {
        Row: {
          id: string;
          user_id: string | null;
          herb_id: string | null;
          medications_checked: Json;
          results: Json;
          severity_summary: "mild" | "moderate" | "severe" | "contraindicated" | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          herb_id?: string | null;
          medications_checked?: Json;
          results?: Json;
          severity_summary?: "mild" | "moderate" | "severe" | "contraindicated" | null;
          created_at?: string;
        };
        Update: {
          medications_checked?: Json;
          results?: Json;
          severity_summary?: "mild" | "moderate" | "severe" | "contraindicated" | null;
        };
        Relationships: [];
      };
      dosage_calculations: {
        Row: {
          id: string;
          user_id: string | null;
          herb_id: string | null;
          patient_age: number | null;
          patient_weight_kg: number | null;
          patient_height_cm: number | null;
          patient_bsa: number | null;
          adult_dose: string;
          calculated_dose: string;
          formula_used: "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule";
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          herb_id?: string | null;
          patient_age?: number | null;
          patient_weight_kg?: number | null;
          patient_height_cm?: number | null;
          patient_bsa?: number | null;
          adult_dose: string;
          calculated_dose: string;
          formula_used: "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule";
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          notes?: string | null;
        };
        Relationships: [];
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          messages: Json;
          herb_context: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title?: string;
          messages?: Json;
          herb_context?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          messages?: Json;
          herb_context?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {
      search_herbs_by_symptom: {
        Args: { search_term: string };
        Returns: {
          id: string;
          name: string;
          slug: string;
          scientific_name: string;
          common_names: string[];
          description: string;
          active_compounds: string[];
          traditional_uses: string[];
          modern_uses: string[];
          dosage_adult: string | null;
          dosage_child: string | null;
          dosage_forms: string[];
          preparation_notes: string | null;
          contraindications: string[];
          side_effects: string[];
          pregnancy_safe: boolean;
          nursing_safe: boolean;
          category_id: string | null;
          image_url: string | null;
          pubchem_cid: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        }[];
      };
    };
    Enums: {
      user_role: "user" | "admin";
      interaction_severity: "mild" | "moderate" | "severe" | "contraindicated";
      dosage_form: "capsule" | "tablet" | "tincture" | "tea" | "powder" | "essential_oil" | "extract" | "topical" | "other";
      formula_type: "clarks_rule" | "youngs_rule" | "bsa" | "fried_rule";
    };
  };
};
