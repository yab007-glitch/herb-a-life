CREATE TYPE public.user_role AS ENUM ('user', 'admin');
CREATE TYPE public.interaction_severity AS ENUM ('mild', 'moderate', 'severe', 'contraindicated');
CREATE TYPE public.dosage_form AS ENUM (
  'capsule', 'tablet', 'tincture', 'tea', 'powder',
  'essential_oil', 'extract', 'topical', 'other'
);
CREATE TYPE public.formula_type AS ENUM ('clarks_rule', 'youngs_rule', 'bsa', 'fried_rule');
