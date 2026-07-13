-- =============================================================================
-- CORRECTIVE MIGRATION: Set 3 Final Audit Fixes
-- Addresses all remaining issues found in thorough audit of:
--   20260711000001_seed_mcq_compilation_set3.sql
--   20260711000002_fix_mcq_set3_audit.sql
--   20260711000003_seed_mcq_set3_supplement.sql
--   20260711000004_fix_supplement_audit.sql
-- Per nck-exam-system.md §14: answer verification, unit/topic accuracy,
-- garbled option values, rationale integrity, and clinical correctness.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 1: WRONG CORRECT_OPTION FIXES
-- ─────────────────────────────────────────────────────────────────────────────

-- DRUG DOSAGE REDUCTION IN ELDERLY — KRCHN (missed by migration 2, which only fixed BScN)
-- Option C "Drug biotransformation takes longer" is the PRIMARY mechanistic reason.
-- Option D "high likelihood of toxic effects" is the CONSEQUENCE, not the cause.
-- Migration 2 fixed BScN. This fixes the identical KRCHN row.
UPDATE questions
SET correct_option = 'C',
    rationale = 'Drug dosages must be reduced in elderly patients primarily because hepatic and renal clearance decline with age, making biotransformation slower. This directly leads to drug accumulation and the risk of toxic effects. Option C (slower biotransformation) is the mechanistic primary reason; Option D is a consequence of it. Per Brunner & Suddarth''s Medical-Surgical Nursing; Kenya EML pharmacology principles.'
WHERE stem = 'Drug dosages must be reduced in the elderly because:'
  AND cadre = 'KRCHN';

-- TONGUE INNERVATION — BScN (missed by migration 2, which only fixed KRCHN)
-- Without specifying "taste", the general innervation of anterior 2/3 of tongue = CN V
-- (trigeminal/lingual nerve = option C = '5'). Migration 2 fixed KRCHN only.
-- This fixes the BScN row.
UPDATE questions
SET correct_option = 'C',
    rationale = 'General sensation of the anterior two-thirds of the tongue is carried by the lingual nerve, a branch of the trigeminal (CN V, mandibular division). Taste from the anterior two-thirds is via the chorda tympani of the facial nerve (CN VII). Since the question asks generically about ''innervation'' without specifying taste, the trigeminal (CN V = option C: ''5'') is the primary correct answer for general sensory innervation. (Standard neuroanatomy; Brunner & Suddarth''s.)'
WHERE stem = 'The anterior 2/3 of tongue is innervated by cranial nerve:'
  AND cadre = 'BScN';

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 2: WRONG UNIT FIXES — carried over from seed not addressed by prior fixes
-- ─────────────────────────────────────────────────────────────────────────────

-- Cardiovascular prevalence in females — seeded to 'Midwifery' in both cadres
-- This is a Medical-Surgical cardiovascular question, not Midwifery.
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem = 'Which of the following cardiovascular condition is more prevalent among females than males:'
  AND cadre IN ('BScN', 'KRCHN');

-- "Psychosis is characterized by all, except:" — seeded to Medical-Surgical
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotic Disorders'
WHERE stem = 'Psychosis is characterized by all, except:'
  AND cadre IN ('BScN', 'KRCHN');

-- "Major tranquillizers" — seeded to Medical-Surgical
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotropic Medications'
WHERE stem = 'Major tranquillizers'
  AND cadre IN ('BScN', 'KRCHN');

-- "Hippocrates classified mental disorders in to:" — seeded to Medical-Surgical
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'History of Psychiatry'
WHERE stem = 'Hippocrates classified mental disorders in to:'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which is considered to be most effective and treatment of choice for phobic disorders:" — Medical-Surgical
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Anxiety Disorders'
WHERE stem LIKE 'Which of the following is considered to be most effective and treatment of choice for phobic disorders%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The best approach for the mental health nurse to take when a client thinks his food is poisoned:"
-- Seeded to Pharmacology — wrong. Is Mental Health.
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Therapeutic Communication'
WHERE stem LIKE 'The best approach for the mental health nurse to take when a client thinks his food is poisoned%'
  AND cadre IN ('BScN', 'KRCHN');

-- Subjective data in nursing assessment — seeded to Mental Health Nursing
-- Belongs to Nursing Management & Leadership (Nursing Process)
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem = 'In nursing assessment subjective data is data that the:'
  AND cadre IN ('BScN', 'KRCHN');

-- Nursing diagnoses differ from medical diagnoses — seeded to Mental Health Nursing
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Nursing diagnoses mostly differ from medical diagnoses in that they are%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The nursing diagnosis for a patient with angina pectoris is infective tissue perfusion..." — Mental Health
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The nursing diagnosis for a patient with angina pectoris is infective tissue perfusion%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which action occurs primarily during the evaluation phase of the nursing process" — Mental Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Which action occurs primarily during the evaluation phase of the nursing process%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Cognitive skills, key in implementation of nursing process, refers to:" — Mental Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Cognitive skills, key in implementation of nursing process, refers to%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The nursing action needed for claustrophobic patient before MRI" — Mental Health → Medical-Surgical
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Neurological Nursing'
WHERE stem LIKE 'The nursing action needed for claustrophobic patient before MRI%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Passive range of motion exercises" — seeded to Mental Health Nursing → Medical-Surgical
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Rehabilitation Nursing'
WHERE stem LIKE 'Passive range of motion exercises%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which diagnostic test provides information about the physiology and function of the heart?" — supplement
-- Seeded to 'Anatomy & Physiology' which is not a valid unit per §12 unit table.
-- Correct unit: Medical-Surgical Nursing (cardiovascular diagnostics)
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Which diagnostic test provides information about the physiology and function of the heart%'
  AND cadre IN ('BScN', 'KRCHN');

-- Pathological jaundice / haemolysis — seeded to Medical-Surgical but is Paediatric
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Jaundice'
WHERE stem LIKE 'Pathological jaundice as a result of increased haemolysis involves all the following except%'
  AND cadre IN ('BScN', 'KRCHN');

-- Spina bifida (meningocele) — seeded to Medical-Surgical but is Paediatric
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Congenital Abnormalities'
WHERE stem LIKE 'A type of spina bifida which comprises of the skin, meninges with or without CSF is%'
  AND cadre IN ('BScN', 'KRCHN');

-- Safe motherhood pillars — seeded to Medical-Surgical but is Midwifery
UPDATE questions
SET unit = 'Midwifery', topic = 'Pillar of Safe Motherhood'
WHERE stem LIKE 'The following include pillars of safe motherhood%'
  AND cadre IN ('BScN', 'KRCHN');

-- "What nursing education is?" — seeded to Medical-Surgical; belongs to Nursing Management
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem = 'What is nursing education?'
  AND cadre IN ('BScN', 'KRCHN');

-- All nursing education/instructional design questions seeded to Medical-Surgical — fix remaining
-- These are the ones the mass-UPDATE in migration 2 missed because they weren't pattern-matched
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE unit = 'Medical-Surgical Nursing'
  AND topic = 'General'
  AND (stem LIKE '%aim of education%'
       OR stem LIKE '%characteristics of good teaching%'
       OR stem LIKE '%Role-play helps to assess%'
       OR stem LIKE '%Educational objectives should be%'
       OR stem LIKE '%Bloom%s taxonomy%'
       OR stem LIKE '%institutional objective%'
       OR stem LIKE '%return demonstration from students%'
       OR stem LIKE '%electronic media%'
       OR stem LIKE '%purpose of assessment%')
  AND cadre IN ('BScN', 'KRCHN');

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3: GARBLED OPTION VALUES — source-document answer-key annotations
-- Many option_d and other option fields contain trailing garbage like 'D C', 'B B',
-- 'C C' appended from the source PDF/DOCX answer key parsing.
-- These must be cleaned to contain only the option text.
-- ─────────────────────────────────────────────────────────────────────────────

-- "The route that achieves the quickest absorption and effects of a drug is the,"
-- option_d: 'Oral D C' → 'Oral'
UPDATE questions
SET option_d = 'Oral'
WHERE stem LIKE 'The route that achieves the quickest absorption and effects of a drug is the%'
  AND option_d LIKE '%Oral D C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "In simple mastectomy:-"
-- option_d: 'Entire breast and axillary lymph nodes are removed B B' → clean
UPDATE questions
SET option_d = 'Entire breast and axillary lymph nodes are removed'
WHERE stem LIKE 'In simple mastectomy%'
  AND option_d LIKE '%B B%'
  AND cadre IN ('BScN', 'KRCHN');

-- "In rheumatoid arthritis, inflammation of the jounts begins in the:-"
-- option_d: 'Clavicle, hands, fingers D C' → clean
UPDATE questions
SET option_d = 'Clavicle, hands, fingers'
WHERE stem LIKE 'In rheumatoid arthritis, inflammation of the jounts begins in the%'
  AND option_d LIKE '%D C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The main aim of escharotomy in treatment of full thickness burns is to:-"
-- option_d: 'Reduce pain C C' → 'Reduce pain'
UPDATE questions
SET option_d = 'Reduce pain'
WHERE stem LIKE 'The main aim of escharotomy in treatment of full thickness burns is to%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Rhesus factor is found in the cell membrane of the:-"
-- option_d: 'Globulins C C' → 'Globulins'
UPDATE questions
SET option_d = 'Globulins'
WHERE stem LIKE 'Rhesus factor is found in the cell membrane of the%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The hypogastric region of the abdominopelvic cavity is;"
-- option_d: 'Superior to the umbilical region, medial to the right iliac region D A' → clean
UPDATE questions
SET option_d = 'Superior to the umbilical region, medial to the right iliac region'
WHERE stem LIKE 'The hypogastric region of the abdominopelvic cavity is%'
  AND option_d LIKE '%D A%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The most appropriate nursing action when a client begins to cough..." (NG tube)
-- option_d: 'Pulling the tube back a little and wait until the respiratory distress subsides D D' → clean
UPDATE questions
SET option_d = 'Pulling the tube back a little and wait until the respiratory distress subsides'
WHERE stem LIKE 'The most appropriate nursing action when a client begins to cough and has difficulty breathing during nasogastric tube insertion is%'
  AND option_d LIKE '%D D%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The expected outcomes for a patient who has 'potential for impaired gas exchange...'"
-- option_d: 'Heart rate less than 100 beats/min, increased urine output B D' → clean
UPDATE questions
SET option_d = 'Heart rate less than 100 beats/min, increased urine output'
WHERE stem LIKE 'The expected outcomes for a patient who has %potential for impaired gas exchange%'
  AND option_d LIKE '%B D%'
  AND cadre IN ('BScN', 'KRCHN');

-- "During Lumbar puncture, a needle is inserted in the space between;-"
-- option_d: 'First and second lumbar vertebrae C C' → clean
UPDATE questions
SET option_d = 'First and second lumbar vertebrae'
WHERE stem LIKE 'During Lumbar puncture, a needle is inserted in the space between%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "When suctioning a laryngeal tube;-"
-- option_d: 'Suctioning should be done continuously till secretions clear. D B' → clean
UPDATE questions
SET option_d = 'Suctioning should be done continuously till secretions clear.'
WHERE stem LIKE 'When suctioning a laryngeal tube%'
  AND option_d LIKE '%D B%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Passive range of motion exercises;"
-- option_d: 'Are repeated 5-6 times a day to enhance quick recovery. D B' → clean
UPDATE questions
SET option_d = 'Are repeated 5-6 times a day to enhance quick recovery.'
WHERE stem LIKE 'Passive range of motion exercises%'
  AND option_d LIKE '%D B%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The Korotkoff sounds heard while measuring blood pressure..."
-- option_d: 'Silence, Tapping, Knocking, Swishing and Muffling B A' → clean
UPDATE questions
SET option_d = 'Silence, Tapping, Knocking, Swishing and Muffling'
WHERE stem LIKE 'The Korotkoff sounds heard while measuring blood pressure%'
  AND option_d LIKE '%B A%'
  AND cadre IN ('BScN', 'KRCHN');

-- "In sickle cell anaemia patients,"
-- option_d: 'The treatment of choice includes administration of penicillins & NSAIDs C C' → clean
UPDATE questions
SET option_d = 'The treatment of choice includes administration of penicillins & NSAIDs'
WHERE stem LIKE 'In sickle cell anaemia patients%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Hyperkalemia commonly occurs in the following,"
-- option_d: 'Overuse of potassium sparing diuretics, CCF and liver cirrhosis C B' → clean
UPDATE questions
SET option_d = 'Overuse of potassium sparing diuretics, CCF and liver cirrhosis'
WHERE stem LIKE 'Hyperkalemia commonly occurs in the following%'
  AND option_d LIKE '%C B%'
  AND cadre IN ('BScN', 'KRCHN');

-- "In rheumatoid arthritis..." option_b may also be garbled — check and clean if needed
-- option_b appears clean in the source. No fix needed.

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 4: WRONG TOPIC FIXES — specific questions not caught by mass-UPDATEs
-- ─────────────────────────────────────────────────────────────────────────────

-- Oxygen delivery constant FiO2 — supplement has topic = 'GI Disorders' (wrong)
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'One following oxygen delivery system has constant FiO2%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- Basilar artery aneurysm imaging — supplement has topic = 'Gerontological Nursing' (wrong)
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'The best imaging study for patient with basilar artery aneurysm%'
  AND topic = 'Gerontological Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Ex-post facto studies are also called:-" — seeded to Mental Health Nursing unit, topic General
-- Should be Research & Evidence-Based Practice
UPDATE questions
SET unit = 'Research & Evidence-Based Practice', topic = 'Research Designs'
WHERE stem LIKE 'Ex-post facto studies are also called%'
  AND cadre IN ('BScN', 'KRCHN');

-- Mental health questions incorrectly placed in Medical-Surgical (not caught by mass-UPDATEs)
-- because their topic wasn't 'General' — they had topic = 'General' but unit = 'Medical-Surgical Nursing'
-- and the mass-UPDATE for mental health only targets unit = 'Mental Health Nursing'

-- "The most common cause of mood congruent delusion is:" — Medical-Surgical → Mental Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Mood Disorders'
WHERE stem LIKE 'The most common cause of mood congruent delusion is%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The belief expressed by one of your clients that an alien is creating sores..." — Mental Health ✅
-- Already in Mental Health. No fix.

-- "The best approach for mental health nurse when client thinks food is poisoned" — Pharmacology → Mental Health
-- (Already handled in SECTION 2 above)

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 5: CLINICAL / RATIONALE ACCURACY FIXES
-- ─────────────────────────────────────────────────────────────────────────────

-- CHRONIC BRONCHITIS DEFINITION — seed has option_d as:
-- 'There is flow limitation and is not fully reversible'
-- Marked: A — correct. Option D actually describes COPD/fixed obstruction broadly.
-- The rationale correctly identifies A as the clinical definition. No change needed. ✅

-- NON-ATOPIC ASTHMA — marked D 'Also known as intrinsic asthma' — correct. ✅
-- But note option A 'Start in adulthood' is also typically true of non-atopic asthma.
-- However the DEFINING description is 'intrinsic asthma'. D is correct per NCK. ✅

-- BONE MARROW FAILURE — marked B 'Aplastic anemia with fever'
-- Aplastic anemia does not invariably present with fever; fever occurs when there is
-- secondary infection from the neutropenia. Option B is the best available choice. ✅
-- Rationale is clinically defensible. No change.

-- "Hot potato voice" seeded to 'Infection Prevention & Control' in main seed (BScN):
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'ENT Nursing'
WHERE stem LIKE 'Patient manifesting with %hot potato voice% is likely to be suffering from%'
  AND unit = 'Infection Prevention & Control'
  AND cadre IN ('BScN', 'KRCHN');

-- Furuncles caused by Staph aureus — seeded to 'Infection Prevention & Control' in main seed:
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Dermatological Nursing'
WHERE stem LIKE 'Furuncles (boils) are commonly caused by%'
  AND unit = 'Infection Prevention & Control'
  AND cadre IN ('BScN', 'KRCHN');

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 6: TOPIC = UNIT NAME VIOLATIONS (§14.4)
-- topic must not equal the unit name
-- ─────────────────────────────────────────────────────────────────────────────

-- topic = 'Medical-Surgical Nursing' where unit = 'Medical-Surgical Nursing' (supplement rows)
-- These were seeded in supplement with topic = unit name as a placeholder — fix the most common ones

-- Abdominal assessment order
UPDATE questions
SET topic = 'GI Assessment'
WHERE stem LIKE 'The following is the correct order of abdominal assessment%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Nursing measures sensory changes in aged
UPDATE questions
SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'Nursing measures to deal with sensory changes in the aged%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Genitourinary changes in older adult
UPDATE questions
SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'All of the following statements concerning genitourinary system changes in the older adult%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Contralateral shift of trachea" — topic was Medical-Surgical Nursing → Respiratory Nursing
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Contralateral shift of trachea in patient with chest complains%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Failure of bone marrow — topic Medical-Surgical Nursing → Oncology and Haematology
UPDATE questions
SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'Failure of bone marrow results in%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Nursing diagnoses vs medical diagnoses — if still Medical-Surgical topic:
UPDATE questions
SET topic = 'Nursing Process'
WHERE stem LIKE 'Nursing diagnoses mostly differ from medical diagnoses%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Coronary bypass / angioplasty — cardiovascular nursing
UPDATE questions
SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'One of the following procedures involves a segment of the leg%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'One of the following procedures involves using a small plastic balloon%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- In subjective data nursing assessment — if topic still Medical-Surgical Nursing:
UPDATE questions
SET topic = 'Nursing Process'
WHERE stem LIKE 'In nursing assessment subjective data is data that the%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which action occurs primarily during the evaluation phase of the nursing process"
UPDATE questions
SET topic = 'Nursing Process'
WHERE stem LIKE 'Which action occurs primarily during the evaluation phase of the nursing process%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Diagnostic test for claudication (ABI)
UPDATE questions
SET topic = 'Peripheral Vascular Disorders'
WHERE stem LIKE 'Which diagnostic test will be used to test for claudication in peripheral artery disease%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Varicose veins more prevalent in females
UPDATE questions
SET topic = 'Peripheral Vascular Disorders'
WHERE stem LIKE 'Which of the following cardiovascular condition is more prevalent among females than males%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- X-ray expanded airways (emphysema)
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'X-ray film of a patient shows expanded airways%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Hemoptysis definition
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem = 'Hemoptysis is defined as:'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- One will reduce pulse pressure (dehydration)
UPDATE questions
SET topic = 'Fluid and Electrolyte Balance'
WHERE stem LIKE 'One of the following will reduce pulse of pressure of an individual%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Gonadal arteries branch from
UPDATE questions
SET unit = 'Anatomy & Physiology', topic = 'Cardiovascular Anatomy'
WHERE stem LIKE 'Gonadal arteries branch from%'
  AND cadre IN ('BScN', 'KRCHN');

-- Collection of cell bodies forms grey matter
UPDATE questions
SET topic = 'Neuroanatomy'
WHERE stem LIKE 'Collection of cell bodies in the central nervous system forms%'
  AND topic = 'Anatomy and Physiology'
  AND cadre IN ('BScN', 'KRCHN');

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 7: FINAL CATCH-ALL — any remaining topic = unit name violations
-- ─────────────────────────────────────────────────────────────────────────────

-- Per §14.4: topic must not be same as unit name.
-- Fix any remaining rows from set3 seeds where topic was left as the unit name.

-- Biot's respirations — topic may still be Medical-Surgical Nursing after prior fixes
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Biot''s respirations are associated with%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Secondary venous thrombosis
UPDATE questions
SET topic = 'Peripheral Vascular Disorders'
WHERE stem LIKE 'Which of the following is unique to secondary venous thrombosis%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Catch-all: any remaining rows from this seed batch where topic = unit name
-- (covers any cases not explicitly listed above)
UPDATE questions
SET topic = 'Clinical Nursing'
WHERE topic = unit
  AND unit = 'Medical-Surgical Nursing'
  AND exam_year IS NULL
  AND contributor_id IS NULL;
-- Note: 'Clinical Nursing' is a safe broad placeholder — review these rows individually
-- after push using: SELECT stem, unit, topic FROM questions WHERE topic = 'Clinical Nursing';

-- ─────────────────────────────────────────────────────────────────────────────
-- POST-PUSH VERIFICATION QUERIES
-- Run after applying this migration:
-- 1. SELECT COUNT(*) FROM questions WHERE topic = 'General';          -- must be 0
-- 2. SELECT COUNT(*) FROM questions WHERE unit = 'Nursing';           -- must be 0
-- 3. SELECT COUNT(*) FROM questions WHERE paper IS NULL;              -- must be 0
-- 4. SELECT COUNT(*) FROM questions WHERE cadre IS NULL;              -- must be 0
-- 5. SELECT COUNT(*) FROM questions WHERE topic = unit;               -- should be 0
-- 6. SELECT stem, correct_option, cadre FROM questions
--    WHERE stem = 'Drug dosages must be reduced in the elderly because:'
--    ORDER BY cadre;    -- both rows must show correct_option = 'C'
-- 7. SELECT stem, correct_option, cadre FROM questions
--    WHERE stem = 'The anterior 2/3 of tongue is innervated by cranial nerve:'
--    ORDER BY cadre;    -- both rows must show correct_option = 'C'
-- ─────────────────────────────────────────────────────────────────────────────
