-- Create search_herbs_by_symptom function for deep symptom search
-- This searches traditional_uses and modern_uses arrays for symptom matches

CREATE OR REPLACE FUNCTION public.search_herbs_by_symptom(search_term text)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  scientific_name text,
  common_names text[],
  description text,
  active_compounds text[],
  traditional_uses text[],
  modern_uses text[],
  dosage_adult text,
  dosage_child text,
  dosage_forms text[],
  preparation_notes text,
  contraindications text[],
  side_effects text[],
  pregnancy_safe boolean,
  nursing_safe boolean,
  category_id uuid,
  image_url text,
  pubchem_cid text,
  is_published boolean,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    h.id,
    h.name,
    h.slug,
    h.scientific_name,
    h.common_names,
    h.description,
    h.active_compounds,
    h.traditional_uses,
    h.modern_uses,
    h.dosage_adult,
    h.dosage_child,
    h.dosage_forms,
    h.preparation_notes,
    h.contraindications,
    h.side_effects,
    h.pregnancy_safe,
    h.nursing_safe,
    h.category_id,
    h.image_url,
    h.pubchem_cid,
    h.is_published,
    h.created_at,
    h.updated_at
  FROM public.herbs h
  WHERE h.is_published = true
    AND (
      -- Search in name
      h.name ILIKE '%' || search_term || '%'
      -- Search in scientific name
      OR h.scientific_name ILIKE '%' || search_term || '%'
      -- Search in description
      OR h.description ILIKE '%' || search_term || '%'
      -- Search in traditional uses array
      OR EXISTS (
        SELECT 1 FROM unnest(h.traditional_uses) t
        WHERE t ILIKE '%' || search_term || '%'
      )
      -- Search in modern uses array
      OR EXISTS (
        SELECT 1 FROM unnest(h.modern_uses) m
        WHERE m ILIKE '%' || search_term || '%'
      )
      -- Search in common names array
      OR EXISTS (
        SELECT 1 FROM unnest(h.common_names) c
        WHERE c ILIKE '%' || search_term || '%'
      )
      -- Search in active compounds array
      OR EXISTS (
        SELECT 1 FROM unnest(h.active_compounds) a
        WHERE a ILIKE '%' || search_term || '%'
      )
    )
  ORDER BY
    -- Rank exact matches higher
    CASE
      WHEN h.name ILIKE search_term THEN 0
      WHEN h.name ILIKE '%' || search_term || '%' THEN 1
      WHEN h.scientific_name ILIKE '%' || search_term || '%' THEN 2
      ELSE 3
    END,
    h.name;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.search_herbs_by_symptom(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_herbs_by_symptom(text) TO anon;