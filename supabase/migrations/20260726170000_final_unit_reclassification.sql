-- ============================================================================
-- Migration: Final unit fixes — pull Critical Care and sub-specialty topics
-- out of Medical-Surgical Nursing into their correct dedicated units
-- ============================================================================

-- Critical Care Nursing — pull from Medical-Surgical Nursing
UPDATE public.questions
SET unit = 'Critical Care Nursing'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN (
    'Emergency Nursing', 'Critical Care Nursing', 'Airway Management',
    'Emergency and First Aid', 'Emergency and Trauma Nursing',
    'Emergency and Shock Management', 'Haemodynamic Monitoring',
    'Haemodynamic Monitoring', 'Cardiovascular Monitoring', 'Mechanical Ventilation',
    'Shock', 'Burns Management', 'Respiratory and Airway Management'
  );

-- Paediatric topics misplaced in Medical-Surgical → Paediatric Nursing
-- (only if not already in Paediatric Nursing)
UPDATE public.questions
SET unit = 'Paediatric Nursing'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('IMNCI Guidelines', 'Child Health (IMNCI)', 'Child Development',
                'Growth and Development', 'Neonatal Nursing');

-- Psychiatry/Mental Health topics → Mental Health Nursing
UPDATE public.questions
SET unit = 'Mental Health Nursing'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Mental Health', 'Psychiatry', 'Psychiatric Nursing',
                'Behavioural Disorders', 'Substance Abuse');

-- Palliative Care → keep in Medical-Surgical but could be its own topic
-- Post-operative Care, Surgical Nursing, Wound Care → Surgical Nursing
UPDATE public.questions
SET unit = 'Surgical Nursing'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic IN ('Post-operative Care', 'Wound Care', 'Surgical Nursing',
                'Peri-operative Nursing');

-- Gerontological Nursing — keep in Medical-Surgical or move to Community Health
-- For now keep since it overlaps with Medical-Surgical scope

-- Microbiology from Community Health Nursing (some may have remained due to exact case match)
UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%immunol%';

UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%immunis%';

UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%immuniz%';

UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%cold chain%';

UPDATE public.questions
SET unit = 'Microbiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%antibiotic%';

-- Epidemiology from Community Health Nursing (some may have remained)
UPDATE public.questions
SET unit = 'Epidemiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%epidemiol%';

UPDATE public.questions
SET unit = 'Epidemiology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%demograph%';

-- Health Education from Community Health Nursing
UPDATE public.questions
SET unit = 'Health Education & Sociology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%health education%';

UPDATE public.questions
SET unit = 'Health Education & Sociology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%health promotion%';

UPDATE public.questions
SET unit = 'Health Education & Sociology'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%medical sociol%';

-- Communicable Diseases from Community Health Nursing (some may have remained)
UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%malaria%';

UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%tuberculosis%';

UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%trachoma%';

UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%HIV%';

UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%STI%';

UPDATE public.questions
SET unit = 'Communicable Diseases'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%communicable%';

-- Family Planning → Maternal & Child Health
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%family planning%';

UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%reproductive%';

-- Environmental Health from CHN (ILIKE for safety)
UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%water%';

UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%sanitation%';

UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%occupational%';

UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%environmental%';

UPDATE public.questions
SET unit = 'Environmental Health'
WHERE unit = 'Community Health Nursing'
  AND topic ILIKE '%zoonot%';
