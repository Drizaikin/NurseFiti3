-- Add new structured columns for the modernized mnemonics design
ALTER TABLE public.mnemonics
ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Pharmacology',
ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS phrases TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS breakdown JSONB NOT NULL DEFAULT '[]';

-- Delete the old unstructured data
DELETE FROM public.mnemonics;

-- Seed with the 6 new structured mnemonics
INSERT INTO public.mnemonics (title, acronym, description, category, tags, phrases, breakdown) VALUES 
(
  'Anticholinergic Toxicity',
  'Dry as a bone...',
  'Modernized layout',
  'Pharmacology',
  ARRAY['Toxicology', 'Emergency', 'Pharmacology'],
  ARRAY['Dry as a bone', 'Blind as a bat', 'Red as a beet', 'Mad as a hatter', 'Hot as a hare'],
  '[
    {"emoji": "🦴", "phrase": "Dry as a bone", "meaning": "Dry skin & dry mucous membranes — ↓sweating/secretions"},
    {"emoji": "🦇", "phrase": "Blind as a bat", "meaning": "Mydriasis (dilated pupils), blurred vision"},
    {"emoji": "❤️", "phrase": "Red as a beet", "meaning": "Flushed skin due to peripheral vasodilation"},
    {"emoji": "🎩", "phrase": "Mad as a hatter", "meaning": "Confusion, delirium, agitation, psychosis"},
    {"emoji": "🌡️", "phrase": "Hot as a hare", "meaning": "Hyperthermia — inability to dissipate heat"}
  ]'::jsonb
),
(
  'Cranial Nerves I – XII',
  'Oh Oh Oh...',
  'Modernized layout',
  'Anatomy',
  ARRAY['Anatomy', 'Neurology'],
  ARRAY['Oh', 'Oh', 'Oh', 'To Touch And Feel', 'Very Good Velvet', 'AH!'],
  '[
    {"emoji": "👃", "phrase": "Oh — I: Olfactory", "meaning": "Smell — sensory only"},
    {"emoji": "👁️", "phrase": "Oh — II: Optic", "meaning": "Vision — sensory only"},
    {"emoji": "🔄", "phrase": "Oh — III: Oculomotor", "meaning": "Eye movement, pupil constriction, eyelid elevation"},
    {"emoji": "↕️", "phrase": "To — IV: Trochlear", "meaning": "Superior oblique — downward/inward gaze"},
    {"emoji": "✋", "phrase": "T — V: Trigeminal", "meaning": "Face sensation, muscles of mastication"}
  ]'::jsonb
),
(
  'APGAR Score',
  'Appearance, Pulse...',
  'Modernized layout',
  'Obstetrics',
  ARRAY['Neonatal', 'Assessment'],
  ARRAY['Appearance', 'Pulse', 'Grimace', 'Activity', 'Respiration'],
  '[
    {"emoji": "🎨", "phrase": "Appearance", "meaning": "Skin colour: 0 (blue all), 1 (blue extremities), 2 (all pink)"},
    {"emoji": "💓", "phrase": "Pulse", "meaning": "Heart rate: 0 (absent), 1 (<100), 2 (>100 bpm)"},
    {"emoji": "😬", "phrase": "Grimace", "meaning": "Reflex irritability: 0 (none), 1 (grimace), 2 (cough/sneeze)"},
    {"emoji": "💪", "phrase": "Activity", "meaning": "Muscle tone: 0 (limp), 1 (some), 2 (active flexion)"},
    {"emoji": "🫁", "phrase": "Respiration", "meaning": "Effort: 0 (absent), 1 (weak/irregular), 2 (strong cry)"}
  ]'::jsonb
),
(
  'Cushing''s Triad',
  'Hypertension...',
  'Modernized layout',
  'Neurology',
  ARRAY['Emergency', 'Raised ICP'],
  ARRAY['↑ Hypertension', '↓ Bradycardia', 'Irregular Breathing'],
  '[
    {"emoji": "📈", "phrase": "Hypertension", "meaning": "Widening pulse pressure — late, ominous sign of ↑ICP"},
    {"emoji": "🫀", "phrase": "Bradycardia", "meaning": "Reflex slowing of heart rate (Cushing reflex)"},
    {"emoji": "🌬️", "phrase": "Irregular Breathing", "meaning": "Cheyne-Stokes or ataxic respiratory pattern"}
  ]'::jsonb
),
(
  '6 Rights of Drug Administration',
  'Right Drug...',
  'Modernized layout',
  'Pharmacology',
  ARRAY['Safety', 'Medication'],
  ARRAY['Right Drug', 'Right Dose', 'Right Route', 'Right Time', 'Right Patient', 'Right Documentation'],
  '[
    {"emoji": "💊", "phrase": "Right Drug", "meaning": "Verify medication name against the prescription"},
    {"emoji": "⚖️", "phrase": "Right Dose", "meaning": "Calculate and confirm the correct quantity"},
    {"emoji": "🛤️", "phrase": "Right Route", "meaning": "PO, IV, IM, SC — exactly as prescribed"},
    {"emoji": "⏰", "phrase": "Right Time", "meaning": "Administer at the scheduled frequency/time"},
    {"emoji": "🪪", "phrase": "Right Patient", "meaning": "Two-identifier verification — always"}
  ]'::jsonb
),
(
  'Phases of Wound Healing',
  'Reactive...',
  'Modernized layout',
  'Med-Surgical',
  ARRAY['Wound Care', 'Med-Surg'],
  ARRAY['Reactive', 'Inflammatory', 'Maturative', 'Epithelialization'],
  '[
    {"emoji": "⚡", "phrase": "Reactive", "meaning": "Immediate hemostasis — vasoconstriction, platelet plug"},
    {"emoji": "🔴", "phrase": "Inflammatory", "meaning": "Neutrophils/macrophages debride wound (0–5 days)"},
    {"emoji": "🔧", "phrase": "Maturative", "meaning": "Fibroblasts lay collagen matrix (day 5 – 3 weeks)"},
    {"emoji": "✨", "phrase": "Epithelialization", "meaning": "New epithelium forms; scar remodelling (weeks–2 years)"}
  ]'::jsonb
);
