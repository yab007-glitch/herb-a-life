CREATE TABLE public.herbs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  scientific_name TEXT NOT NULL,
  common_names TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  active_compounds TEXT[] DEFAULT '{}',
  traditional_uses TEXT[] DEFAULT '{}',
  modern_uses TEXT[] DEFAULT '{}',
  dosage_adult TEXT,
  dosage_child TEXT,
  dosage_forms public.dosage_form[] DEFAULT '{}',
  preparation_notes TEXT,
  contraindications TEXT[] DEFAULT '{}',
  side_effects TEXT[] DEFAULT '{}',
  pregnancy_safe BOOLEAN DEFAULT false,
  nursing_safe BOOLEAN DEFAULT false,
  category_id UUID REFERENCES public.herb_categories(id),
  image_url TEXT,
  pubchem_cid TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.herbs ENABLE ROW LEVEL SECURITY;

-- Anyone can view published herbs (public catalog)
CREATE POLICY "Anyone can view published herbs"
  ON public.herbs FOR SELECT
  USING (is_published = true);

-- Admins can see all herbs including unpublished
CREATE POLICY "Admins can view all herbs"
  ON public.herbs FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admins can insert/update/delete
CREATE POLICY "Admins can insert herbs"
  ON public.herbs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update herbs"
  ON public.herbs FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete herbs"
  ON public.herbs FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TRIGGER herbs_updated_at
  BEFORE UPDATE ON public.herbs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
