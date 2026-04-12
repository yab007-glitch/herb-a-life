-- Add citations, evidence_level, and reviewer fields to herbs table
-- This migration adds trust infrastructure for credibility

-- Add evidence_level column (A=Strong, B=Moderate, C=Limited, D=Anecdotal, trad=Traditional)
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS evidence_level TEXT DEFAULT 'C'
  CHECK (evidence_level IN ('A', 'B', 'C', 'D', 'trad'));

-- Add citations JSONB column for structured source references
-- Format: [{ "source": "WHO", "title": "...", "url": "...", "year": 2024, "pmid": "12345678" }]
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS citations JSONB DEFAULT '[]'::jsonb;

-- Add reviewer fields
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS reviewed_by TEXT;
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS reviewer_credentials TEXT;
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS last_reviewed TIMESTAMPTZ;

-- Add a symptom_keywords column for better symptom-first discovery
-- This allows storing common symptom/condition keywords that users might search for
ALTER TABLE public.herbs ADD COLUMN IF NOT EXISTS symptom_keywords TEXT[] DEFAULT '{}';

-- Update existing herbs with evidence levels based on their data
-- Herbs with modern_uses get at least 'C', those without get 'trad'
UPDATE public.herbs SET evidence_level = 'B' 
  WHERE array_length(modern_uses, 1) > 2 AND array_length(traditional_uses, 1) > 2;

UPDATE public.herbs SET evidence_level = 'C'
  WHERE evidence_level = 'C' AND array_length(modern_uses, 1) IS NOT NULL;

UPDATE public.herbs SET evidence_level = 'trad'
  WHERE evidence_level = 'C' AND array_length(modern_uses, 1) IS NULL;

-- Set last_reviewed to updated_at for existing herbs
UPDATE public.herbs SET last_reviewed = updated_at WHERE last_reviewed IS NULL;

-- Set default reviewer
UPDATE public.herbs SET 
  reviewed_by = 'HerbAlly Editorial Team',
  reviewer_credentials = 'Medical herbalists and healthcare professionals'
WHERE reviewed_by IS NULL;

-- Create index on evidence_level for filtering
CREATE INDEX IF NOT EXISTS idx_herbs_evidence_level ON public.herbs(evidence_level) 
  WHERE is_published = true;

-- Create index on symptom_keywords using GIN for array search
CREATE INDEX IF NOT EXISTS idx_herbs_symptom_keywords ON public.herbs USING GIN(symptom_keywords)
  WHERE is_published = true;