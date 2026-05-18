-- HerbAlly Database Seed Script
-- Run with: psql $DATABASE_URL -f supabase/seed.sql

-- Seed herb categories
INSERT INTO herb_categories (name, slug, description) VALUES
  ('Adaptogens', 'adaptogens', 'Herbs that help the body adapt to stress'),
  ('Digestive', 'digestive', 'Herbs that support digestive health'),
  ('Immune Support', 'immune-support', 'Herbs that strengthen the immune system'),
  ('Nervines', 'nervines', 'Herbs that calm and support the nervous system'),
  ('Pain Relief', 'pain-relief', 'Herbs with analgesic properties'),
  ('Sleep Support', 'sleep-support', 'Herbs that promote restful sleep'),
  ('Anti-inflammatory', 'anti-inflammatory', 'Herbs that reduce inflammation')
ON CONFLICT (slug) DO NOTHING;

-- Seed sample herbs (for local development)
INSERT INTO herbs (
  name, slug, scientific_name, description,
  evidence_level, pregnancy_safe, nursing_safe,
  traditional_uses, modern_uses, symptom_keywords
) VALUES
  (
    'Turmeric', 'turmeric', 'Curcuma longa',
    'A bright yellow spice with powerful anti-inflammatory and antioxidant properties.',
    'A', false, true,
    ARRAY['Digestive aid', 'Anti-inflammatory', 'Wound healing'],
    ARRAY['Joint pain', 'Arthritis', 'Metabolic syndrome'],
    ARRAY['inflammation', 'arthritis', 'joint pain', 'antioxidant']
  ),
  (
    'Ginger', 'ginger', 'Zingiber officinale',
    'A warming herb used for digestive complaints, nausea, and inflammation.',
    'A', false, true,
    ARRAY['Nausea relief', 'Digestive stimulant', 'Cold remedy'],
    ARRAY['Motion sickness', 'Morning sickness', 'Osteoarthritis'],
    ARRAY['nausea', 'digestion', 'inflammation', 'cold']
  ),
  (
    'Chamomile', 'chamomile', 'Matricaria chamomilla',
    'A gentle herb with calming and anti-inflammatory properties.',
    'A', true, true,
    ARRAY['Sleep aid', 'Digestive relaxant', 'Skin soother'],
    ARRAY['Insomnia', 'Anxiety', 'Eczema'],
    ARRAY['sleep', 'anxiety', 'digestion', 'skin']
  ),
  (
    'Peppermint', 'peppermint', 'Mentha x piperita',
    'A cooling herb used for digestive issues, headaches, and congestion.',
    'A', false, false,
    ARRAY['Digestive aid', 'Headache relief', 'Decongestant'],
    ARRAY['IBS', 'Tension headaches', 'Sinus congestion'],
    ARRAY['digestion', 'headache', 'congestion', 'ibs']
  ),
  (
    'Echinacea', 'echinacea', 'Echinacea purpurea',
    'An immune-stimulating herb commonly used for colds and infections.',
    'B', false, false,
    ARRAY['Immune booster', 'Cold remedy', 'Wound healing'],
    ARRAY['Common cold', 'Upper respiratory infections'],
    ARRAY['immune', 'cold', 'infection']
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed sample drug interactions
INSERT INTO drug_interactions (
  herb_id, drug_name, interaction_description, severity
)
SELECT
  h.id,
  'Warfarin',
  'Turmeric may increase bleeding risk when combined with anticoagulants.',
  'moderate'
FROM herbs h
WHERE h.slug = 'turmeric'
ON CONFLICT DO NOTHING;

INSERT INTO drug_interactions (
  herb_id, drug_name, interaction_description, severity
)
SELECT
  h.id,
  'Aspirin',
  'Ginger may increase bleeding risk at high doses.',
  'mild'
FROM herbs h
WHERE h.slug = 'ginger'
ON CONFLICT DO NOTHING;
