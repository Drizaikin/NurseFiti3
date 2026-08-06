-- ============================================================================
-- Migration: 20260726180000_definitive_unit_classification_fix.sql
-- 
-- PURPOSE: Definitive word-by-word audit correction of all 7,403 questions.
--          Strictly per nck-exam-system.md §12 (unit/paper rules) and §14.4
--          (unit & topic field standards).
--
-- STUDENT PROGRESS: Safe. Answers tracked by question_id, not unit name.
--          Reclassifying a question does NOT reset answered status.
--
-- EXECUTION ORDER:
--   Step A: Fix non-canonical unit names (81 questions hidden from students)
--   Step B: Fix content-based unit misclassifications (~80 questions)  
--   Step C: Fix paper assignments — canonical Paper I units
--   Step D: Fix paper assignments — canonical Paper II units
--   Step E: Fix paper assignments — non-canonical units
--   Step F: Fix topic label errors
--   Step G: Verification assertions
-- ============================================================================


-- ============================================================================
-- STEP A: Fix non-canonical unit names
-- These 81 questions are INVISIBLE to students because the unit name doesn't
-- match any recognised unit in get_active_units RPC.
-- Source: nck-exam-system.md §12 canonical list.
-- ============================================================================

-- A1: "Nursing Education & Professional Practice" → "Nursing Management & Leadership" (55 questions)
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Nursing Education & Professional Practice';

-- A2: "Nursing Education" → "Nursing Management & Leadership" (15 questions)
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Nursing Education';

-- A3: "Nursing Management and Leadership" → "Nursing Management & Leadership" (11 questions)
-- Note: '&' vs 'and' — canonical uses ampersand per §12
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Nursing Management and Leadership';


-- ============================================================================
-- STEP B: Fix content-based unit misclassifications
-- Each decision documented with clinical/curriculum rationale.
-- ============================================================================

-- B1: Family Planning in Midwifery → Maternal & Child Health
-- Rationale: Family Planning is a community-based MCH service (MOH Kenya Family
--   Planning Guidelines). It is not an obstetric/midwifery topic. Per NCK §12,
--   Maternal & Child Health covers family planning services.
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Midwifery'
  AND topic = 'Family Planning';

-- B2: Immunisation topics in Microbiology → Maternal & Child Health
-- Rationale: The Expanded Programme on Immunisation (EPI) is an MCH service
--   per MOH Kenya. Cold chain management, immunisation schedules, and vaccine
--   administration are MCH competencies, not Microbiology.
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Microbiology'
  AND topic IN ('Immunisation', 'Immunization', 'Immunisation Programme',
                'Cold Chain', 'Immunization Programme');

-- B3: Gynaecological Conditions in Maternal & Child Health → Medical-Surgical Nursing
-- Rationale: Gynaecological conditions (endometriosis, Bartholin's abscess,
--   dysmenorrhoea, ovarian pathology, fibroid uterus) are adult medical-surgical
--   nursing topics per Brunner & Suddarth. They are NOT MCH service topics.
--   MCH scope: family planning, immunisation, growth monitoring — not surgery/pathology.
-- NOTE: Cervical Cancer Screening is intentionally EXCLUDED from this update
--   (per user instruction: "retain this in maternal and child health, cause it truly is")
--   Cervical cancer screening IS an MCH/reproductive health screening service.
UPDATE public.questions
SET unit = 'Medical-Surgical Nursing'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Gynaecological Conditions';

-- B4: Antenatal Care in Maternal & Child Health → Midwifery
-- Rationale: Antenatal care is unambiguously a Midwifery competency per Myles
--   Textbook for Midwives and NCK KRCHN/BScN Paper I scope. MCH covers the
--   community-based MCH clinic services; individual antenatal clinical care = Midwifery.
UPDATE public.questions
SET unit = 'Midwifery'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Antenatal Care';

-- B5: Labour and Delivery in Maternal & Child Health → Midwifery
-- Rationale: Labour and delivery management is core Midwifery (Myles; NCK Paper I).
--   EXCEPTION: One question with "Labour and Delivery" topic has a stem about
--   fracture complications — this is a data entry error (wrong topic label).
--   It will be moved to Medical-Surgical Nursing with corrected topic.
UPDATE public.questions
SET unit = 'Midwifery'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Labour and Delivery'
  AND stem NOT ILIKE '%fracture%';

-- B6: Fracture question mislabelled as "Labour and Delivery" → Medical-Surgical Nursing
-- Rationale: The stem is about fracture complications — an orthopaedic/MSN topic.
--   The topic "Labour and Delivery" was a data entry error.
UPDATE public.questions
SET unit  = 'Medical-Surgical Nursing',
    topic = 'Musculoskeletal Disorders'
WHERE unit = 'Maternal & Child Health'
  AND topic = 'Labour and Delivery'
  AND stem ILIKE '%fracture%';

-- B7: Growth Monitoring in Nutrition → Maternal & Child Health
-- Rationale: Growth monitoring (weighing children, plotting on growth charts,
--   assessing nutritional status of children under 5) is an MCH clinical skill
--   per Kenya IMNCI and MOH Kenya Basic Paediatric Protocols. It is a primary
--   MCH clinic activity, not a standalone Nutrition unit topic.
UPDATE public.questions
SET unit = 'Maternal & Child Health'
WHERE unit = 'Nutrition'
  AND topic = 'Growth Monitoring';

-- B8: Learning Theories in Research & Statistics → Nursing Management & Leadership
-- Rationale: Learning theories (behaviourism, humanism, social learning theory)
--   belong to Nursing Education, which per NCK is under Nursing Management &
--   Leadership (§12 BScN Paper II: Nursing Management & Leadership).
--   Research & Statistics covers research methodology, statistics, and EBP.
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Research & Statistics'
  AND topic = 'Learning Theories';

-- B9: Nursing Process in Research & Statistics → Nursing Management & Leadership
-- Rationale: The nursing process (assessment, diagnosis, planning, implementation,
--   evaluation) is a professional nursing practice framework taught under Nursing
--   Management & Leadership. It is not a research methodology topic.
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Research & Statistics'
  AND topic = 'Nursing Process';

-- B10: Professional Regulation in Midwifery → Nursing Management & Leadership
-- Rationale: Professional regulation (NCK scope of practice, licensing) is a
--   Nursing Management & Leadership topic (§12 BScN Paper II). It is not a
--   Midwifery clinical topic.
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Midwifery'
  AND topic = 'Professional Regulation';

-- B11: Professional Ethics in Paediatric Nursing → Nursing Management & Leadership
-- Rationale: Ethical principles (beneficence, non-maleficence, autonomy, justice)
--   are Nursing Management & Leadership topics. They are not Paediatric Nursing
--   clinical competencies.
UPDATE public.questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Paediatric Nursing'
  AND topic IN ('Professional Ethics', 'Professional Ethics and Law',
                'Ethical Principles', 'Nursing Ethics');

-- B12: Communicable Diseases topic in Paediatric Nursing → relabel topic only
-- Rationale: These questions cover childhood communicable diseases (measles,
--   pertussis, mumps, rubella in children) and legitimately belong in Paediatric
--   Nursing. The topic label "Communicable Diseases" is vague and will be
--   corrected to "Childhood Communicable Diseases" to distinguish it clearly.
--   The unit is NOT changed.
UPDATE public.questions
SET topic = 'Childhood Communicable Diseases'
WHERE unit = 'Paediatric Nursing'
  AND topic = 'Communicable Diseases';


-- ============================================================================
-- STEP C: Fix paper assignments — CANONICAL PAPER I UNITS
-- Per nck-exam-system.md §12:
-- Paper I units (both cadres): Medical-Surgical Nursing, Midwifery, Pharmacology,
--   Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology,
--   Surgical Nursing, Critical Care Nursing
-- ============================================================================

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Medical-Surgical Nursing'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Midwifery'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Pharmacology'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Maternal & Child Health'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Paediatric Nursing'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Anatomy & Physiology'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Surgical Nursing'
  AND paper != 'Paper I';

UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Critical Care Nursing'
  AND paper != 'Paper I';


-- ============================================================================
-- STEP D: Fix paper assignments — CANONICAL PAPER II UNITS
-- Per nck-exam-system.md §12:
-- Paper II units (both cadres): Community Health Nursing, Mental Health Nursing,
--   Environmental Health, Nutrition, Research & Statistics,
--   Health Systems & Management, Infection Prevention & Control,
--   Nursing Management & Leadership
-- ============================================================================

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Community Health Nursing'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Mental Health Nursing'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Environmental Health'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Nutrition'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Research & Statistics'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Health Systems & Management'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Infection Prevention & Control'
  AND paper != 'Paper II';

UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Nursing Management & Leadership'
  AND paper != 'Paper II';


-- ============================================================================
-- STEP E: Fix paper assignments — NON-CANONICAL UNITS
-- These units are not listed in §12 but exist legitimately in the DB and ARE
-- visible to students in the practice filter. Paper must be consistent with
-- where the NCK places related content.
-- ============================================================================

-- Communicable Diseases → Paper II (public health / community context)
-- Rationale: TB, Malaria, HIV/AIDS, STIs are tested in Paper II (Community
--   Health + Public Health domain) per NCK examination pattern.
UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Communicable Diseases'
  AND paper != 'Paper II';

-- Epidemiology → Paper II (research and public health context)
-- Rationale: Epidemiology is part of the Research & Public Health Paper II domain.
UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Epidemiology'
  AND paper != 'Paper II';

-- Health Education & Sociology → Paper II (community/public health context)
-- Rationale: Health promotion and medical sociology are Paper II topics per NCK.
UPDATE public.questions
SET paper = 'Paper II'
WHERE unit = 'Health Education & Sociology'
  AND paper != 'Paper II';

-- Parasitology → Paper I (basic science / clinical foundation)
-- Rationale: Parasitology as a basic science supports clinical nursing (malaria
--   pathogenesis, helminth life cycles). Assigned Paper I as a foundational
--   science subject analogous to Anatomy & Physiology.
UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Parasitology'
  AND paper != 'Paper I';

-- Microbiology → Paper I (basic science / clinical foundation)
-- Rationale: Microbiology (bacteriology, virology, mycology, infection biology)
--   is a basic science supporting clinical practice. Assigned Paper I similarly
--   to Anatomy & Physiology.
UPDATE public.questions
SET paper = 'Paper I'
WHERE unit = 'Microbiology'
  AND paper != 'Paper I';


-- ============================================================================
-- STEP F: Topic label fixes (data quality)
-- ============================================================================

-- F1: Fix vague/generic topic labels that violate §14.4
-- (no question should have topic = 'General' or unit = 'Nursing')
UPDATE public.questions
SET topic = 'General Nursing Care'
WHERE topic = 'General'
  AND unit IS NOT NULL;

-- F2: Fix "Midwifery" as a topic (too vague — should specify sub-topic)
-- Only fix where topic = the unit name (placeholder value)
-- Leave legitimate uses where the topic accurately describes the content
UPDATE public.questions
SET topic = 'Obstetric Nursing'
WHERE unit = 'Midwifery'
  AND topic = 'Midwifery';

-- F3: Fix "Pharmacology" as a topic (placeholder) → "General Pharmacology"
UPDATE public.questions
SET topic = 'General Pharmacology'
WHERE unit = 'Pharmacology'
  AND topic = 'Pharmacology';

-- F4: Fix "Nutrition" as a topic (placeholder) → "Clinical Nutrition"  
UPDATE public.questions
SET topic = 'Clinical Nutrition'
WHERE unit = 'Nutrition'
  AND topic = 'Nutrition';

-- F5: Fix "Epidemiology" as a topic (placeholder) → "Epidemiological Methods"
UPDATE public.questions
SET topic = 'Epidemiological Methods'
WHERE unit = 'Epidemiology'
  AND topic = 'Epidemiology';

-- F6: Fix "Parasitology" as topic (placeholder) → "Parasitic Diseases"
UPDATE public.questions
SET topic = 'Parasitic Diseases'
WHERE unit = 'Parasitology'
  AND topic = 'Parasitology';


-- ============================================================================
-- STEP G: Final data quality assertions
-- These will FAIL the migration (via a zero-row check) if any issues remain.
-- Uses DO blocks to raise exceptions if counts are non-zero.
-- ============================================================================

DO $$
DECLARE
  v_count INTEGER;
BEGIN
  -- G1: No non-canonical unit names
  SELECT COUNT(*) INTO v_count
  FROM public.questions
  WHERE unit IN ('Nursing Education & Professional Practice',
                 'Nursing Education',
                 'Nursing Management and Leadership');
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % questions still have non-canonical unit names', v_count;
  END IF;

  -- G2: No Paper I units with Paper II assignment
  SELECT COUNT(*) INTO v_count
  FROM public.questions
  WHERE unit IN ('Medical-Surgical Nursing','Midwifery','Pharmacology',
                 'Maternal & Child Health','Paediatric Nursing','Anatomy & Physiology',
                 'Surgical Nursing','Critical Care Nursing')
    AND paper = 'Paper II';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % Paper-I-unit questions still assigned Paper II', v_count;
  END IF;

  -- G3: No Paper II units with Paper I assignment
  SELECT COUNT(*) INTO v_count
  FROM public.questions
  WHERE unit IN ('Community Health Nursing','Mental Health Nursing','Environmental Health',
                 'Nutrition','Research & Statistics','Health Systems & Management',
                 'Infection Prevention & Control','Nursing Management & Leadership')
    AND paper = 'Paper I';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % Paper-II-unit questions still assigned Paper I', v_count;
  END IF;

  -- G4: No null cadre or null paper
  SELECT COUNT(*) INTO v_count
  FROM public.questions
  WHERE cadre IS NULL OR paper IS NULL;
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ASSERTION FAILED: % questions have NULL cadre or NULL paper', v_count;
  END IF;

  RAISE NOTICE 'All assertions passed. Classification fix migration complete.';
END $$;
