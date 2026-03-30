CREATE TABLE public.dosage_calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  herb_id UUID REFERENCES public.herbs(id) ON DELETE SET NULL,
  patient_age DECIMAL(5,2),
  patient_weight_kg DECIMAL(5,2),
  patient_height_cm DECIMAL(5,2),
  patient_bsa DECIMAL(5,4),
  adult_dose TEXT NOT NULL,
  calculated_dose TEXT NOT NULL,
  formula_used public.formula_type NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.dosage_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calculations"
  ON public.dosage_calculations FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own calculations"
  ON public.dosage_calculations FOR INSERT
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Allow anonymous calculations (not logged in)
CREATE POLICY "Anonymous can insert calculations"
  ON public.dosage_calculations FOR INSERT
  WITH CHECK (user_id IS NULL);
