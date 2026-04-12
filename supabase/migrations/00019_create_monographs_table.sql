-- Create monographs table for storing generated/hand-written monographs
CREATE TABLE IF NOT EXISTS herb_monographs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  herb_id uuid NOT NULL REFERENCES herbs(id) ON DELETE CASCADE,
  herb_slug text NOT NULL UNIQUE,
  
  -- Content fields
  summary text NOT NULL,
  mechanism text NOT NULL,
  claims jsonb NOT NULL DEFAULT '[]'::jsonb,
  safety_notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  drug_interactions jsonb NOT NULL DEFAULT '[]'::jsonb,
  pregnancy_category text NOT NULL CHECK (pregnancy_category IN ('safe', 'caution', 'unsafe', 'insufficient')),
  key_citations jsonb NOT NULL DEFAULT '[]'::jsonb,
  
  -- Metadata
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  generation_method text NOT NULL DEFAULT 'manual' CHECK (generation_method IN ('manual', 'ai-assisted', 'auto-generated')),
  reviewed_by text,
  reviewer_credentials text,
  last_reviewed_at timestamptz,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(summary, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(mechanism, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(claims::text, '')), 'C')
  ) STORED
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_monographs_herb_id ON herb_monographs(herb_id);
CREATE INDEX IF NOT EXISTS idx_monographs_slug ON herb_monographs(herb_slug);
CREATE INDEX IF NOT EXISTS idx_monographs_status ON herb_monographs(status);
CREATE INDEX IF NOT EXISTS idx_monographs_search ON herb_monographs USING gin(search_vector);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_monograph_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_monograph_updated_at ON herb_monographs;
CREATE TRIGGER trg_monograph_updated_at
  BEFORE UPDATE ON herb_monographs
  FOR EACH ROW
  EXECUTE FUNCTION update_monograph_updated_at();

-- Migration: Seed existing hand-written monographs
-- Note: Run this after the 20 premium monographs are converted to INSERT statements
