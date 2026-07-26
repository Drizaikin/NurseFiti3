-- ============================================================================
-- Migration: Reclassify Medical-Surgical Nursing sub-topics into correct units
-- Problem: 263 questions in "Medical-Surgical Nursing" contain many sub-specialties
--   that should be in dedicated units (Anatomy & Physiology, Pharmacology etc.)
--   and also contain nursing management, research, paediatric and maternal questions.
-- ============================================================================

-- Anatomy & Physiology topics → Anatomy & Physiology unit
UPDATE public.questions
SET unit = 'Anatomy & Physiology'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Anatomy and Physiology', 'Anatomy & Physiology',
                'Cardiovascular Anatomy', 'Respiratory Anatomy', 'Neuroanatomy',
                'Gastrointestinal Physiology', 'Cardiovascular Pathophysiology');

-- Pharmacology topics → Pharmacology unit
-- (none currently present as distinct topic but future-proofed)

-- Nursing management / Professional Practice topics within Medical-Surgical → correct unit
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Nursing Process', 'Nursing Procedures', 'Patient Safety',
                'Professional Practice');

-- Research topics within Medical-Surgical → Research & Statistics
UPDATE public.questions
SET unit = 'Research & Statistics'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Research & Statistics', 'Evidence-Based Practice');

-- Infection Prevention & Control topics within Medical-Surgical → correct unit
UPDATE public.questions
SET unit = 'Infection Prevention & Control'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Infection Prevention and Control', 'Infection Prevention & Control',
                'Infection and Diagnostics', 'Infection and Microbiology');

-- Communicable disease topics buried in Medical-Surgical → Communicable Diseases
UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Communicable Diseases', 'STI Management', 'Sexually Transmitted Infections',
                'HIV/AIDS Management');

-- Immunology topics → Microbiology
UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Immunology', 'Pharmacology of Allergy');

-- Maternal/Obstetric topics misplaced in Medical-Surgical → Maternal & Child Health
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Labour and Delivery', 'Cardiac Disease in Pregnancy', 'Hyperemesis Gravidarum',
                'Cervical Cancer Screening', 'Cervical Cancer and Reproductive Health',
                'Gynaecological Conditions');

-- ============================================================================
-- Fix the existing "Research & Statistics" and "Research & Evidence-Based Practice"
-- units from earlier seeded questions (already have own unit names)
-- ============================================================================
-- Ensure Research & Evidence-Based Practice merges to Research & Statistics
UPDATE public.questions
SET unit = 'Research & Statistics'
WHERE unit = 'Research & Evidence-Based Practice';

-- ============================================================================
-- Fix Nursing Management & Leadership unit name to be consistent
-- (Earlier seeds used slightly different names)
-- ============================================================================
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit IN ('Nursing Management & Leadership', 'nursing management & leadership');

-- Consolidate Professional Ethics & Law under Nursing Management & Leadership
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Professional Ethics & Law';

-- ============================================================================
-- Reclassify Health Systems & Management topics that actually belong to Nursing Management
-- ============================================================================
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Health Systems & Management'
  AND topic IN ('Nursing Education', 'Nursing Management', 'Management Theory',
                'Management Functions', 'Management Principles', 'Leadership',
                'Leadership Styles', 'Professional Nursing Practice', 'Professional Regulation',
                'Professional Ethics', 'Professional Practice', 'Nursing Theories',
                'Nursing Theory', 'Nursing Regulation and Professional Bodies',
                'Ethical Principles', 'End-of-Life Care', 'Planning', 'Management Roles',
                'Conflict Management', 'Human Resource Management',
                'Strategic Change Management', 'Communication in Nursing',
                'Health Facility Management');

-- ============================================================================
-- Nutrition & Parasitology — must come from Community Health Nursing
-- (the earlier migration may have been a no-op if the topic names had casing differences)
-- ============================================================================
UPDATE public.questions
SET unit = 'Nutrition'
WHERE unit = 'Community Health Nursing'
  AND LOWER(topic) IN ('nutrition', 'vitamins and minerals', 'vitamin a supplementation',
                        'growth monitoring', 'nutritional support');

UPDATE public.questions
SET unit = 'Parasitology'
WHERE unit = 'Community Health Nursing'
  AND LOWER(topic) IN ('parasitology', 'parasitic diseases');

-- Ensure Nutrition from Medical-Surgical is also mapped
UPDATE public.questions
SET unit = 'Nutrition'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Nutritional Support');
