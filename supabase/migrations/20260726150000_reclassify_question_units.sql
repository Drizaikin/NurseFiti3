-- ============================================================================
-- Migration: Reclassify questions into correct units based on topics
-- Problem: The majority of the question bank (1000 questions) is miscategorised.
--   - 720 questions are ALL lumped under "Community Health Nursing" but contain
--     topics from many different nursing disciplines.
--   - 99 questions are under "Health Systems & Management" but cover nursing
--     management, nursing education, professional ethics, and nursing theories.
--
-- This migration creates the correct unit structure by remapping questions
-- from their topic to their proper NCK curriculum unit.
-- ============================================================================

-- ------------------------------------------------------------------------------
-- SECTION 1: Extract sub-units from "Community Health Nursing"
-- Topics that truly belong to other distinct units
-- ------------------------------------------------------------------------------

-- Parasitology → its own unit
UPDATE public.questions
SET unit = 'Parasitology'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Parasitology', 'Parasitic Diseases');

-- Nutrition → its own unit (matches existing dedicated "Nutrition" unit)
UPDATE public.questions
SET unit = 'Nutrition'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Nutrition', 'Vitamins and Minerals', 'Vitamin A Supplementation', 'Growth Monitoring');

-- Microbiology / Immunology → its own unit (matches what user expects)
UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Immunology', 'Immunization', 'Immunisation', 'Immunisation Programme',
                'Immunisation Schedule', 'Cold Chain', 'Antibiotic Resistance');

-- Epidemiology → its own unit
UPDATE public.questions
SET unit = 'Epidemiology'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Epidemiology', 'Epidemiology and Demography', 'Epidemiology & Demography',
                'Demography', 'Child Health Epidemiology', 'Vital Registration');

-- Environmental Health → its own unit (matches existing "Environmental Health" unit)
UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Environmental Health', 'Water & Sanitation', 'Water and Sanitation',
                'Water and Disease', 'Water Purification', 'Occupational Health',
                'Occupational and Environmental Health', 'Occupational Health Nursing',
                'Zoonotic Diseases');

-- Family Health / Maternal & Child Health → map into existing Maternal & Child Health unit
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Family Health', 'Maternal and Child Health', 'Reproductive Health',
                'Family Planning', 'Child Development', 'Growth and Development',
                'IMNCI Guidelines', 'Child Health (IMNCI)');

-- Communicable Diseases → its own unit
UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Communicable Diseases', 'Communicable Disease Control', 'Malaria',
                'Tuberculosis', 'Tuberculosis Control', 'TB Control', 'Trachoma',
                'HIV/AIDS', 'HIV/AIDS Care', 'HIV/AIDS Prevention', 'STI and HIV',
                'STI Management', 'Sexually Transmitted Infections');

-- Sociology & Health Education → Medical Sociology / Health Education
UPDATE public.questions
SET unit = 'Health Education & Sociology'
WHERE unit = 'Community Health Nursing'
  AND topic IN ('Medical Sociology', 'Health Education', 'Health Promotion',
                'Health Behaviour Models', 'Social Determinants of Health',
                'Social Change', 'Transcultural Nursing', 'Cultural Competence',
                'Culture and Health');

-- School Health, Disability, Ageing → Community Health Nursing (keep)
-- These remain in Community Health Nursing as they truly belong there.

-- ------------------------------------------------------------------------------
-- SECTION 2: Reclassify "Health Systems & Management" correctly
-- ------------------------------------------------------------------------------

-- Nursing Education → Nursing Education & Management (or split from HS&M)
-- These are distinct from Health Systems management
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Health Systems & Management'
  AND topic IN ('Nursing Management', 'Management Theory', 'Management Functions',
                'Management Principles', 'Leadership', 'Leadership Styles',
                'Nursing Process', 'Planning', 'Management Roles', 'Conflict Management',
                'Human Resource Management', 'Strategic Change Management',
                'Communication in Nursing', 'Health Facility Management');

UPDATE public.questions
SET unit = 'Nursing Education & Professional Practice'
WHERE unit = 'Health Systems & Management'
  AND topic IN ('Nursing Education', 'Nursing Theories', 'Nursing Theory',
                'Professional Nursing Practice', 'Professional Regulation',
                'Professional Ethics', 'Professional Practice',
                'Nursing Regulation and Professional Bodies', 'Ethical Principles',
                'End-of-Life Care');

-- What remains in Health Systems & Management is correctly there (Kenya health system, levels of prevention etc.)

-- ------------------------------------------------------------------------------
-- SECTION 3: Reclassify "Medical-Surgical Nursing" sub-topics correctly
-- ------------------------------------------------------------------------------

-- Emergency Nursing topics → Critical Care Nursing
UPDATE public.questions
SET unit = 'Critical Care Nursing'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Emergency Nursing', 'Cardiovascular Monitoring');

-- Research topics are already in their own units (Research & Statistics / Research & Evidence-Based Practice)
-- Keep those as-is.

-- ------------------------------------------------------------------------------
-- SECTION 4: Correct small miscellaneous units
-- ------------------------------------------------------------------------------
-- "Health Systems in Kenya" (2 questions) → merge into Health Systems & Management
UPDATE public.questions
SET unit = 'Health Systems & Management'
WHERE unit = 'Health Systems in Kenya';

-- "Anatomy & Physiology" (1 question) — leave as-is, will be supplemented later

-- Also fix the "Research & Evidence-Based Practice" vs "Research & Statistics" name split
-- so they show as one unit in the practice filter:
UPDATE public.questions
SET unit = 'Research & Statistics'
WHERE unit = 'Research & Evidence-Based Practice';

-- Consolidate "Nursing Management & Leadership" with existing questions
-- (from earlier migrations that set this unit) — the name is consistent from seeds.

-- "Professional Ethics & Law" → Nursing Education & Professional Practice
UPDATE public.questions
SET unit = 'Nursing Education & Professional Practice'
WHERE unit = 'Professional Ethics & Law';
