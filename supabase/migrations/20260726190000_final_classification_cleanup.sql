-- ============================================================================
-- Migration: 20260726190000_final_classification_cleanup.sql
-- PURPOSE: Fix 14 remaining genuine misclassifications found in post-correction
--          verification audit. Non-canonical unit warnings (Communicable Diseases,
--          Epidemiology, Microbiology, Health Education & Sociology, Parasitology)
--          are correct content and intentionally retained as practice units.
-- ============================================================================

-- 1. Breastfeeding in Maternal & Child Health → Midwifery
-- Rationale: Breastfeeding initiation, technique, and management of breastfeeding
--   problems (engorgement, mastitis, insufficient milk) are Midwifery competencies
--   per Myles Textbook for Midwives. The MCH/community role is promotion, not
--   clinical management. Questions about breastfeeding management = Midwifery.
UPDATE public.questions
SET unit = 'Midwifery', paper = 'Paper I'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Breastfeeding';

-- 2. Maternal Mortality in Maternal & Child Health → Midwifery
-- Rationale: Maternal mortality (causes, direct/indirect, prevention, management
--   of obstetric emergencies that cause maternal death) is a Midwifery topic per
--   Myles and MOH Kenya BEmONC/EmONC guidelines. Epidemiology of maternal mortality
--   at population level = Community Health / MCH, but clinical questions about
--   causes and management = Midwifery.
UPDATE public.questions
SET unit = 'Midwifery', paper = 'Paper I'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Maternal Mortality';

-- 3. Postnatal Care in Maternal & Child Health → Midwifery
-- Rationale: Postnatal care (puerperium assessment, lochia, uterine involution,
--   perineal care, postnatal complications) is a Midwifery competency.
UPDATE public.questions
SET unit = 'Midwifery', paper = 'Paper I'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Postnatal Care';

-- 4. Hyperemesis Gravidarum in Maternal & Child Health → Midwifery
-- Rationale: Hyperemesis gravidarum is an obstetric complication of pregnancy
--   managed in antenatal care — a core Midwifery topic.
UPDATE public.questions
SET unit = 'Midwifery', paper = 'Paper I'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Hyperemesis Gravidarum';

-- 5. Neonatal Prophylaxis in Midwifery → Maternal & Child Health
-- Rationale: Neonatal prophylaxis (Vitamin K, tetracycline eye ointment, BCG, 
--   birth polio vaccine) given at birth is an MCH/newborn care protocol per
--   MOH Kenya IMNCI and EPI programme guidelines.
UPDATE public.questions
SET unit = 'Maternal & Child Health', paper = 'Paper I'
WHERE unit = 'Midwifery'
  AND topic = 'Neonatal Prophylaxis';

-- 6. Neonatal Prophylaxis in Paediatric Nursing → Maternal & Child Health
-- Same rationale as above.
UPDATE public.questions
SET unit = 'Maternal & Child Health', paper = 'Paper I'
WHERE unit = 'Paediatric Nursing'
  AND topic = 'Neonatal Prophylaxis';

-- 7. Vitamin A Supplementation in Nutrition → Maternal & Child Health
-- Rationale: Vitamin A supplementation is an MCH programme intervention (given at
--   MCH clinics per MOH Kenya EPI/Child Health guidelines), NOT a clinical Nutrition
--   topic. Clinical nutrition covers therapeutic diets, TPN, malnutrition management.
UPDATE public.questions
SET unit = 'Maternal & Child Health', paper = 'Paper I'
WHERE unit = 'Nutrition'
  AND topic = 'Vitamin A Supplementation';

-- 8. Nutrition topic in Paediatric Nursing — leave as-is if about child nutrition
-- On reflection, "Nutrition" topic in Paediatric Nursing could be about paediatric
-- nutritional assessment or feeding in sick children (IMNCI context). These are
-- genuinely Paediatric Nursing questions. Do NOT move them.
-- (No action taken — overriding the audit script suggestion)

-- ============================================================================
-- Final paper sweep to catch any rows affected by the unit changes above
-- ============================================================================
UPDATE public.questions SET paper = 'Paper I'
WHERE unit = 'Midwifery' AND paper != 'Paper I';

UPDATE public.questions SET paper = 'Paper I'
WHERE unit = 'Maternal & Child Health' AND paper != 'Paper I';

-- ============================================================================
-- Final assertions
-- ============================================================================
DO $$
DECLARE v_count INTEGER;
BEGIN
  -- No non-canonical unit names
  SELECT COUNT(*) INTO v_count FROM public.questions
  WHERE unit IN ('Nursing Education & Professional Practice',
                 'Nursing Education', 'Nursing Management and Leadership');
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % non-canonical unit names remain', v_count;
  END IF;

  -- No Paper I units on Paper II
  SELECT COUNT(*) INTO v_count FROM public.questions
  WHERE unit IN ('Medical-Surgical Nursing','Midwifery','Pharmacology',
                 'Maternal & Child Health','Paediatric Nursing',
                 'Anatomy & Physiology','Surgical Nursing','Critical Care Nursing')
    AND paper = 'Paper II';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % Paper-I-unit rows still on Paper II', v_count;
  END IF;

  -- No Paper II units on Paper I
  SELECT COUNT(*) INTO v_count FROM public.questions
  WHERE unit IN ('Community Health Nursing','Mental Health Nursing','Environmental Health',
                 'Nutrition','Research & Statistics','Health Systems & Management',
                 'Infection Prevention & Control','Nursing Management & Leadership')
    AND paper = 'Paper I';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % Paper-II-unit rows still on Paper I', v_count;
  END IF;

  RAISE NOTICE 'Final cleanup assertions all passed. Classification is complete.';
END $$;
