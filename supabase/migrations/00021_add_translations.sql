-- Add translations JSONB column to herbs table
ALTER TABLE public.herbs
  ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

-- Add French translation columns to herb_categories
ALTER TABLE public.herb_categories
  ADD COLUMN IF NOT EXISTS name_fr TEXT,
  ADD COLUMN IF NOT EXISTS description_fr TEXT;

-- Add translations JSONB column to drug_interactions
ALTER TABLE public.drug_interactions
  ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';
