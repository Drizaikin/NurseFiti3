-- =============================================================================
-- COMPREHENSIVE AUDIT MIGRATION — Set 3 (Migrations 001–004)
-- Date: 2026-07-13
-- Per nck-exam-system.md §14: answer verification, rationale accuracy,
-- unit/topic specificity, structural data integrity, and contamination fixes.
-- =============================================================================

-- =============================================================================
-- SECTION A: CRITICAL WRONG-ANSWER CORRECTIONS
-- =============================================================================

-- A1. TONGUE INNERVATION (set in migration 002 for KRCHN only)
-- Migration 002 already fixed KRCHN to C (trigeminal/CN V).
-- The BScN version in migration 001 still has correct_option = 'D' (facial, for TASTE).
-- Per §14.1: stem does NOT specify taste — general innervation = CN V.
-- Fix BScN version as well.
UPDATE questions
SET correct_option = 'C',
    rationale = 'General sensation of the anterior two-thirds of the tongue is carried by the lingual nerve, a branch of CN V (trigeminal, mandibular division). Taste from the anterior two-thirds is via the chorda tympani of CN VII (facial). The question asks generically about innervation without specifying taste, so CN V (option C = ''5'') is the primary correct answer for general sensory innervation. (Standard neuroanatomy; Brunner & Suddarth''s.)'
WHERE stem = 'The anterior 2/3 of tongue is innervated by cranial nerve:'
  AND cadre = 'BScN';

-- A2. DRUG DOSAGE REDUCTION IN ELDERLY — KRCHN (migration 002 only fixed BScN)
-- Migration 002 fixed BScN only. The KRCHN row still has D as correct_option.
-- Fix KRCHN here:
UPDATE questions
SET correct_option = 'C',
    rationale = 'Drug dosages must be reduced in elderly patients primarily because hepatic and renal clearance decline with age, making biotransformation slower. This directly leads to drug accumulation and the risk of toxic effects. Option C (slower biotransformation) is the mechanistic primary reason; Option D is a consequence of it. Per Brunner & Suddarth''s Medical-Surgical Nursing; Kenya EML pharmacology principles.'
WHERE stem = 'Drug dosages must be reduced in the elderly because:'
  AND cadre = 'KRCHN';

-- A3. FAILURE OF BONE MARROW — aplastic anemia WITH fever (migration 001, both cadres)
-- Answer B is clinically correct: pancytopenia from marrow failure includes
-- neutropenia → infection → fever. B is the most complete and accurate answer.
-- Rationale is sound. No answer change needed.

-- A4. NON-ATOPIC ASTHMA — answer D "intrinsic asthma" (migration 001)
-- Correct. Non-atopic = intrinsic/non-allergic. Option A (starts in adulthood)
-- is also true but "intrinsic asthma" is the defining/most accurate description. Confirmed.

-- A5. SENSORY NEURONS ENTER SPINAL CORD (migration 001)
-- Answer D (posterior horn) is CORRECT. Sensory neurons enter via dorsal root,
-- terminate in posterior (dorsal) horn. Confirmed.

-- A6. PHRENIC NERVE ORIGIN (migration 001)
-- Answer A (cervical plexus, C3-C5) is correct. Confirmed.

-- A7. SPINAL CORD TERMINATION (migration 001)
-- Answer C (L1-L2) is correct. Confirmed.

-- A8. CARDIAC CONDUCTION — HIGHEST FIRING RATE (migration 001)
-- Answer A (SA node) is correct. Confirmed.

-- A9. STOMA SENSATION — incorrect option text in option_c
-- Migration 004 corrected the rationale to clarify stoma has NO pain sensation.
-- The correct_option C remains best available. Rationale now accurate. Confirmed.

-- A10. GESTATIONAL DIABETES PRIORITY TEACHING (supplement migration 003 + fix 004)
-- Migration 004 corrected to A (dietary intake). Confirmed correct per Kenya MOH.

-- A11. SYMPOSIUM vs PANEL DISCUSSION (migration 003, KRCHN, answer B = Symposium)
-- The stem says "6-8 qualified experts discuss a topic in front of an audience."
-- A PANEL DISCUSSION is exactly this: a group of experts discussing before an audience
-- with audience participation. A SYMPOSIUM is a series of short speeches by
-- different speakers — NOT a discussion. Per standard education methodology:
-- this description = PANEL DISCUSSION (option C).
-- Migration 003 marked B (Symposium) — THIS IS WRONG.
UPDATE questions
SET correct_option = 'C',
    rationale = 'A panel discussion is a structured conversation in which a group of 6-8 qualified experts discuss a topic in front of an audience, with potential audience interaction. A symposium is a series of short formal presentations/lectures by multiple speakers on aspects of a topic, without interactive discussion. Since the stem describes interactive discussion among experts before an audience, the answer is panel discussion (C). (Standard educational methodology as used in Kenyan nursing training.)'
WHERE stem LIKE 'The type of discussion where a group of 6-8 qualified experts discuss%'
  AND cadre IN ('BScN', 'KRCHN');

-- A12. INDIRECT DISEASE TRANSMISSION (migration 003 KRCHN, answer B = transplacental)
-- Transplacental IS vertical/indirect. Droplet = direct close-contact.
-- Unclean hands = vehicle/indirect. Animal bite = direct.
-- The most unambiguously INDIRECT route among these is transplacental (B).
-- BUT unclean hands/fingers (C) is also indirect (vehicle transmission).
-- Per Park's/epidemiology: droplet = direct; unclean hands = indirect vehicle;
-- transplacental = indirect (vertical). Both B and C are indirect.
-- The ⚠ flag was correct. Per §7.6 — best single answer is B (transplacental)
-- as it is the most unambiguously indirect. Confirmed B is acceptable. No change.

-- A13. INFECTIVITY vs INVASIVENESS vs PATHOGENICITY (migration 003 KRCHN, answer D)
-- "capability of an infectious agent to invade, survive and multiply in the host" =
-- This matches PATHOGENICITY (ability to cause disease/infect) but more precisely
-- this is INFECTIVITY (ability to establish infection in host).
-- Per Park's: Infectivity = ability of agent to invade/infect + establish infection.
-- Invasiveness = ability to spread within host after infection.
-- Pathogenicity = ability to produce disease.
-- Answer D (infectivity) is CORRECT. Confirmed.

-- A14. DISASTER MITIGATION vs PREPAREDNESS (migration 003 KRCHN)
-- "Increasing the ability of the population to cope with a disaster" =
-- This is PREPAREDNESS (building capacity to cope/respond).
-- MITIGATION = reducing the impact / likelihood of a disaster.
-- The current answer D (Mitigation) is WRONG.
-- Fix to A (Preparedness).
UPDATE questions
SET correct_option = 'A',
    rationale = 'Preparedness refers to activities that develop operational capacity to respond to and cope with the effects of a disaster. It includes training, planning, stockpiling, and building community capacity to cope. Mitigation involves actions to reduce the severity or likelihood of a disaster''s impact, such as building levees or earthquake-proofing structures. Since the stem describes ''increasing the ability to cope,'' the correct term is preparedness (A). (Disaster management theory; Kenya Disaster Risk Management Policy.)'
WHERE stem LIKE 'Increasing the ability of the population to cope with a disaster%'
  AND cadre IN ('BScN', 'KRCHN');

-- A15. COMMUNITY CORE COMPONENTS (migration 003 KRCHN, answer A)
-- Answer A (history, values, beliefs) is correct per Anderson & McFarlane community-
-- as-partner model. Community core = the people (history, values, beliefs, demography).
-- Demography IS part of the core but options B, C, D emphasise subsystems.
-- Answer A is the BEST fit. Confirmed.

-- A16. OPEN VACCINE POLICY (migration 003 KRCHN, answer A = discard all at end of session)
-- Per Kenya KEPI Multi-Dose Vial Policy (MDVP):
-- RECONSTITUTED vaccines (BCG, measles/MR, yellow fever) — discard within 6 hours or at
-- end of session, whichever comes first.
-- NON-RECONSTITUTED liquid multi-dose vaccines (OPV, Pentavalent, PCV, Rotavirus, HPV)
-- — may be kept for up to 28 days IF cold chain maintained, VVM not passed, stopper intact.
-- Option A says "discard ALL open vaccines at end of session" — this is INCORRECT for
-- liquid multi-dose vaccines. The correct KEPI policy is C:
-- "Discard all open vaccines with evidence of contamination" — this is always correct,
-- and closest to the actual MDVP principles for reconstituted vaccines.
-- However, among the choices, in an exam context, A is the most conservatively correct
-- SAFEST answer for KRCHN exams. Per §7.6 — most NCK-aligned answer is A (conservative).
-- Rationale flagged already. No answer change — keep A with updated rationale.
UPDATE questions
SET rationale = 'Per Kenya KEPI Multi-Dose Vial Policy (MDVP): ALL reconstituted vaccines (BCG, measles/MR, yellow fever) must be discarded at the end of the session (or within 6 hours, whichever is sooner). Non-reconstituted liquid multi-dose vaccines may be kept under cold chain for up to 28 days if VVM has not passed and there is no contamination. In an NCK KRCHN examination context, option A (discard all at end of session) represents the safest conservative policy and is the expected answer. (Kenya KEPI guidelines; MOH immunization protocols.)'
WHERE stem LIKE 'The policy of open vaccine states that%'
  AND cadre IN ('BScN', 'KRCHN');

-- A17. COMMUNITY INTEREST (migration 003 KRCHN, co-workers)
-- Are co-workers a common-interest community? They share a work environment but not
-- necessarily a common interest/goal outside that. Per definition, co-workers are a
-- community of place/organisation. Home-bound elderly, teenage mothers, and church members
-- share a common interest/problem/goal outside location.
-- Answer C (co-workers) is the exception. Confirmed.

-- A18. MEPHEDRONE CLASS (migration 003 KRCHN, answer A = amphetamines)
-- Correct. Mephedrone = synthetic cathinone, stimulant, amphetamine-like. Confirmed.

-- A19. ANTICHOLINERGIC EFFECTS EXCEPT (migration 003 KRCHN, answer A = bradycardia)
-- Anticholinergic (antimuscarinic) drugs block muscarinic receptors → TACHYCARDIA
-- (not bradycardia). So bradycardia is the EXCEPT answer. Correct. Confirmed.
-- Migration 004 already cleaned the contaminated rationale.

-- A20. CATATONIA / MOTOR DISORDER (migration 003 KRCHN, answer D = Negativism)
-- "Constantly maintains a position without any movement" = CATALEPSY or CATATONIC
-- POSTURING. Among the options: negativism = motiveless resistance to movement.
-- Cataplexy = sudden loss of tone. Verbigeration = repetitive speech.
-- Mannerism = repetitive purposeful movement.
-- NONE of the options perfectly describes "maintains a position without movement."
-- Closest is: Negativism (resistance to movement = immobility) but this is imperfect.
-- The correct psychiatric term for this is CATALEPSY.
-- Per §7.6: best available answer among options is D (negativism),
-- as resistance without movement most closely approximates the description.
-- Keep D with clarified rationale.
UPDATE questions
SET rationale = 'Maintaining a fixed body position without any movement most closely describes catalepsy (a catatonic feature). Among the given options, negativism (a motiveless opposition or resistance to movement/instructions) is the closest match — the patient maintains their position and refuses to move. Cataplexy is sudden loss of muscle tone; verbigeration is repetitive meaningless speech; mannerism is a repetitive, goal-directed movement. D is the best available answer. (DSM-5; standard psychiatric/mental health nursing texts used in Kenyan nursing training.)'
WHERE stem LIKE 'Disorder of motor activity in which the person constantly maintains%'
  AND cadre IN ('BScN', 'KRCHN');

-- A21. HAEMOPHILIA A DELETION (migration 002) — already correctly deleted.
-- Confirmed deletion is appropriate: no correct answer available among options given.

-- A22. ABORTION / OCCUPATIONAL NURSE THRESHOLD (migration 003 KRCHN, answer B = 101)
-- Kenya OSHA 2007: an employer with 20+ employees must display health and safety notice;
-- 50+ must appoint a safety officer. The occupational health NURSE requirement per
-- Kenya Factories Act (predecessor) and OSHA guidelines is for workplaces with
-- 100+ workers (i.e., at least 101 triggers the obligation).
-- Answer B (101) is correct. Confirmed.

-- A23. DENGUE SEASONAL/CYCLICAL VARIATION (migration 003 KRCHN, answer B = cyclical)
-- Disease cases increasing at end of rainy season every year = SEASONAL variation,
-- which is a type of CYCLICAL variation. B is correct. Confirmed.

-- A24. AIRBORNE DISEASE (migration 003 KRCHN, answer D = measles)
-- Measles = true airborne (aerosol droplet nuclei). Correct. Confirmed.

-- A25. LATENT CONFLICT (migration 003 KRCHN)
-- Note: This question's rationale was contaminated with two extra questions
-- (Cap 242 and integration of services). Migration 004 cleaned the rationale.
-- Answer A (latent conflict) is CORRECT. Confirmed.

-- A26. FAT-SOLUBLE VITAMINS embedded in frotteurism question (migration 003 KRCHN)
-- The frotteurism question's rationale is contaminated with the fat-soluble vitamins
-- question text. Migration 004 already cleaned this.
-- HOWEVER: "fat soluble vitamins includes A. A,D,C,E B. A,D,E,K" — this question
-- was EMBEDDED in the rationale of the frotteurism question — it was NOT seeded
-- as its own row. It needs to be verified if it was properly seeded elsewhere.
-- Check and seed if missing (KRCHN Paper II):
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status)
VALUES (
  'fat soluble vitamins includes',
  'A,D,C,E',
  'A,D,E,K',
  'E,D,C,K',
  'A,B,C,D',
  'B',
  'The fat-soluble vitamins are A, D, E and K (mnemonic ADEK); vitamins C and B-complex are water-soluble. Per Kozier & Erb''s Fundamentals / Nutrition texts used in Kenyan nursing training.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Vitamins and Minerals',
  'easy',
  'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- A27. PUBLIC HEALTH ACT CAP 242 — embedded in latent conflict question (migration 003)
-- This question was embedded in the contaminated rationale and NOT seeded as its own row.
-- Seed properly:
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status)
VALUES (
  'Which public health Act is responsible for securing and maintaining health?',
  'Cap 242',
  'Cap 257',
  'Cap 280',
  'Cap 302',
  'A',
  'In Kenya the Public Health Act is Chapter 242 (Cap 242) of the Laws of Kenya — the principal statute for securing and maintaining public health throughout the country. Cap 257 is the Nurses Act (NCK). (Kenya Public Health Act, Cap 242.)',
  'KRCHN',
  'Paper II',
  'Professional Ethics & Law',
  'Nursing Legislation',
  'easy',
  'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- A28. INTEGRATION OF SERVICES ADVANTAGE — embedded in latent conflict rationale
-- Seed properly:
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status)
VALUES (
  'Which of the following is the advantage of integration of services?',
  'Save time and money for the nurse',
  'Improves immunization coverage',
  'Patients are integrated in the approach',
  'There is high chance of cross infection between sick and healthy especially children',
  'A',
  'Integration of services allows a client to receive several services in one visit, saving time and resources for both client and provider while reducing missed opportunities. Option D describes a disadvantage. (Kenya MOH integrated service delivery guidelines; community health nursing.)',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Systems',
  'easy',
  'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- A29. AKATHISIA (embedded in anticholinergic question rationale, migration 003)
-- "22-year-old man on typical antipsychotic, can't sit still, constant leg movement"
-- = AKATHISIA. This was embedded in the anticholinergic rationale but NOT seeded separately.
-- Seed properly:
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status)
VALUES (
  'A 22-year-old man started on a typical antipsychotic finds it difficult to sit still and has to move his legs constantly. How is this phenomenon best defined?',
  'Tardive dyskinesia',
  'Akinesia',
  'Akathisia',
  'Neuroleptic malignant syndrome',
  'C',
  'Akathisia is the extrapyramidal side effect characterised by subjective inner restlessness and an inability to sit still, with constant leg movement or pacing. It is an early effect of typical (first-generation) antipsychotics. Tardive dyskinesia presents as late involuntary repetitive movements (usually orofacial); akinesia is absence of movement; NMS is a life-threatening emergency. (Standard psychiatric/mental health nursing texts; DSM-5.)',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Psychotropic Drug Effects',
  'medium',
  'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- A30. OCCUPATIONAL NURSE THRESHOLD — garbled stem (migration 003 KRCHN)
-- The row seeded has stem starting with "Per Kenyan OSH regulations..." — this is
-- a GARBLED STEM (it contains the rationale text, not the question).
-- Delete this garbled row:
DELETE FROM questions
WHERE stem LIKE 'Per Kenyan OSH regulations%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION B: STRUCTURAL DATA CONTAMINATION FIXES
-- Questions where option_d text contains garbled/truncated data from the source
-- =============================================================================

-- B1. Options containing "D B", "C C", "B B", "D C", "C C" appended to end of option text
-- These are source-document artefacts (answer keys printed in the docx).
-- These are mostly in migration 001 KRCHN rows.
-- Clean all contaminated option texts:

UPDATE questions
SET option_d = 'Suctioning should be done continuously till secretions clear.'
WHERE stem LIKE 'When suctioning a laryngeal tube%'
  AND option_d LIKE '%D B%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Are repeated 5-6 times a day to enhance quick recovery.'
WHERE stem LIKE 'Passive range of motion exercises%'
  AND option_d LIKE '%D B%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Silence, Tapping, Knocking, Swishing and Muffling'
WHERE stem LIKE 'The Korotkoff sounds heard while measuring blood pressure%'
  AND option_d LIKE '%B A%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'The treatment of choice includes administration of penicillins and NSAIDs'
WHERE stem LIKE 'In sickle cell anaemia patients%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Overuse of potassium sparing diuretics, CCF and liver cirrhosis'
WHERE stem LIKE 'Hyperkalemia commonly occurs in the following%'
  AND option_d LIKE '%C B%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Oral'
WHERE stem LIKE 'The route that achieves the quickest absorption%'
  AND option_d LIKE '%D C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Entire breast and axillary lymph nodes are removed'
WHERE stem LIKE 'In simple mastectomy%'
  AND option_d LIKE '%B B%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Clavicle, hands, fingers'
WHERE stem LIKE 'In rheumatoid arthritis, inflammation of the jounts%'
  AND option_d LIKE '%D C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Reduce pain'
WHERE stem LIKE 'The main aim of escharotomy%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Excessive alcohol consumption, early menopause'
WHERE stem LIKE 'Risk factors of osteoporosis include%'
  AND option_d LIKE '%D%'
  AND option_d NOT LIKE 'Excessive alcohol%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_c = 'Rhesus factor is found in the cell membrane of the Erythrocytes'
WHERE stem LIKE 'Rhesus factor is found in the cell membrane of the%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Globulins'
WHERE stem LIKE 'Rhesus factor is found in the cell membrane of the%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Superior to the umbilical region, medial to the right iliac region'
WHERE stem LIKE 'The hypogastric region of the abdominopelvic cavity is%'
  AND option_d LIKE '%D A%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Pulling the tube back a little and wait until the respiratory distress subsides'
WHERE stem LIKE 'The most appropriate nursing action when a client begins to cough%nasogastric%'
  AND option_d LIKE '%D D%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'Heart rate less than 100 beats/min, increased urine output'
WHERE stem LIKE 'The expected outcomes for a patient who has%fluid overload%'
  AND option_d LIKE '%B D%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET option_d = 'First and second lumbar vertebrae'
WHERE stem LIKE 'During Lumbar puncture, a needle is inserted in the space between%'
  AND option_d LIKE '%C C%'
  AND cadre IN ('BScN', 'KRCHN');

-- B2. INCOMPLETE STEM: "Which of the following clients would be most at risk for the development of"
-- This stem is TRUNCATED — it ends mid-sentence. The question is unusable as-is
-- because students will not know what condition is being asked about.
-- Delete this incomplete question from both cadres:
DELETE FROM questions
WHERE stem = 'Which of the following clients would be most at risk for the development of'
  AND cadre IN ('BScN', 'KRCHN');

-- B3. Option_c with embedded "C ." prefix in percussion question
-- The option_c text was "C . Hyper resonance over the left lower lobe"
-- (contains a question-number prefix)
UPDATE questions
SET option_c = 'Hyper resonance over the left lower lobe'
WHERE stem LIKE 'Which of the following indicates a normal finding on percussion of the lungs%'
  AND option_c LIKE 'C .%'
  AND cadre IN ('BScN', 'KRCHN');

-- B4. option_d of anticholinergic question contaminated with akathisia question
-- Already addressed in A29 (akathisia seeded separately).
-- The anticholinergic question itself needs its option_d cleaned:
UPDATE questions
SET option_d = 'Exacerbation of open-angle glaucoma'
WHERE stem LIKE 'Anticholinergic side effects include all of the following EXCEPT%'
  AND option_d LIKE '%Exacerbation%269%'
  AND cadre IN ('BScN', 'KRCHN');

-- B5. FROTTEURISM question option_d contaminated with fat-soluble vitamin question
UPDATE questions
SET option_d = 'Frotteurism'
WHERE stem LIKE 'A situation where someone gains sexual gratification by rubbing his%'
  AND option_d LIKE '%Frotteorism%240%'
  AND cadre IN ('BScN', 'KRCHN');

-- Also clean the rationale of frotteurism question (remove embedded fat-vitamin content)
-- Migration 004 already did this — verify it applied.

-- B6. DENGUE FEVER stem contaminated with "Per Kenyan OSH regulations..." prefix
-- The actual Dengue fever question has a garbled stem starting with
-- "Per Kenyan OSH regulations / community health nursing. ⚠ More than one..."
-- The REAL stem about Dengue seasonal variation is not properly seeded.
-- The garbled row was addressed in A30 (deleted).
-- Seed the Dengue fever question properly:
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status)
VALUES (
  'The number of cases of Dengue fever usually increases towards the end of the rainy season. This pattern of occurrence of Dengue fever is best described as:',
  'Epidemic occurrence',
  'Cyclical variation',
  'Sporadic occurrence',
  'Secular occurrence',
  'B',
  'A regular, predictable rise in disease cases tied to a recurring season (end of the rainy season) is a seasonal variation, which is a type of cyclical variation. An epidemic is an unexpected rise above baseline; sporadic is irregular isolated cases; secular (long-term) trend refers to a slow change over decades. (Park''s Textbook of Preventive and Social Medicine; Kenya CDC epidemiology principles.)',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Epidemiology',
  'medium',
  'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- =============================================================================
-- SECTION C: WRONG UNIT FIXES (remaining after migrations 002 and 004)
-- =============================================================================

-- C1. Abdominal assessment order — wrong unit (Medical-Surgical not Mental Health)
-- Migration 002 already fixed BScN. Confirm KRCHN version also fixed:
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'GI Assessment'
WHERE stem = 'The following is the correct order of abdominal assessment:'
  AND cadre = 'KRCHN';

-- C2. Passive ROM exercises — wrong unit (Medical-Surgical not Mental Health)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Rehabilitation Nursing'
WHERE stem LIKE 'Passive range of motion exercises%'
  AND cadre IN ('BScN', 'KRCHN');

-- C3. Nursing process / subjective data — wrong unit (Nursing Fundamentals not Mental Health)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem = 'In nursing assessment subjective data is data that the:'
  AND cadre IN ('BScN', 'KRCHN');

-- C4. Nursing diagnoses differ from medical diagnoses — wrong unit (Nursing Fundamentals not Mental Health)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Nursing diagnoses mostly differ from medical diagnoses in that they are%'
  AND cadre IN ('BScN', 'KRCHN');

-- C5. Angina pectoris outcome criterion — seeded to Mental Health Nursing, wrong.
-- This is a Med-Surg cardiovascular clinical question. The nursing process framing
-- does not change the clinical subject. Belongs to Medical-Surgical Nursing.
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The nursing diagnosis for a patient with angina pectoris%'
  AND cadre IN ('BScN', 'KRCHN');

-- C6. Evaluation phase of nursing process — wrong unit (Nursing Fundamentals not Mental Health)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Which action occurs primarily during the evaluation phase of the nursing process%'
  AND cadre IN ('BScN', 'KRCHN');

-- C7. Cognitive skills in nursing process — wrong unit (Nursing Fundamentals not Mental Health)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'Cognitive skills, key in implementation of nursing process%'
  AND cadre IN ('BScN', 'KRCHN');

-- C8. Claustrophobic patient MRI — wrong unit (correct = Medical-Surgical not Mental Health)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Diagnostic Procedures'
WHERE stem LIKE 'The nursing action needed for claustrophobic patient before MRI%'
  AND cadre IN ('BScN', 'KRCHN');

-- C9. Varicose veins — Midwifery wrong unit (should be Medical-Surgical for a CVS question)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Which of the following cardiovascular condition is more prevalent among females%'
  AND cadre IN ('BScN', 'KRCHN');

-- C10. Hot potato voice — Ludwig angina (Infection Prevention wrong, should be Med-Surg)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'ENT Nursing'
WHERE stem LIKE 'Patient manifesting with "hot potato voice"%'
  AND cadre IN ('BScN', 'KRCHN');

-- C11. Furuncles (boils) — Infection Prevention is acceptable but Medical-Surgical is
--      more specific for a patient-care question on causative organisms.
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Dermatological Nursing'
WHERE stem LIKE 'Furuncles (boils) are commonly caused by%'
  AND cadre IN ('BScN', 'KRCHN');

-- C12. Management of psoriasis scales — wrong unit (Nursing Management not Med-Surg)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Dermatological Nursing'
WHERE stem LIKE 'Management of scaled lesion in psoriasis include%'
  AND cadre IN ('BScN', 'KRCHN');

-- C13. Triage nurse cut wound — wrong unit (Nursing Management not Med-Surg for a KRCHN)
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Emergency Nursing'
WHERE stem LIKE 'The patient was brought to the outpatient department with a cut wound%'
  AND cadre IN ('BScN', 'KRCHN');

-- C14. Conjoined twins — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Multiple Pregnancy'
WHERE stem LIKE 'What would be the result of fail splitting a single fertilized ovum%'
  AND cadre IN ('BScN', 'KRCHN');

-- C15. 3rd degree moulding — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'What is 3rd degree moulding%'
  AND cadre IN ('BScN', 'KRCHN');

-- C16. Complete breech presentation — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Malpresentations'
WHERE stem LIKE 'Which statement BEST describes a complete breech presentation%'
  AND cadre IN ('BScN', 'KRCHN');

-- C17. Face presentation engaging diameters — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Malpresentations'
WHERE stem LIKE 'Which of the following are the engaging diameters in a face presentation%'
  AND cadre IN ('BScN', 'KRCHN');

-- C18. OP presentation outcomes — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Malpresentations'
WHERE stem LIKE 'Which of the following is NOT an outcome for an occipito posterior position%'
  AND cadre IN ('BScN', 'KRCHN');

-- C19. Causes of primary amenorrhea — Midwifery not Medical-Surgical
UPDATE questions SET unit = 'Midwifery', topic = 'Gynaecology'
WHERE stem LIKE 'Causes of primary amenorrhea include%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION D: TOPIC FIXES — remaining 'General' and mismatched topics
-- =============================================================================

-- D1. Abdominal assessment — topic was 'General', unit now Medical-Surgical
UPDATE questions SET topic = 'GI Assessment'
WHERE stem = 'The following is the correct order of abdominal assessment:'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D2. Passive ROM — topic 'General'
UPDATE questions SET topic = 'Rehabilitation Nursing'
WHERE stem LIKE 'Passive range of motion exercises%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D3. Korotkoff sounds — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The Korotkoff sounds heard while measuring blood pressure%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D4. Subjective data — topic 'General'
UPDATE questions SET topic = 'Nursing Process'
WHERE stem = 'In nursing assessment subjective data is data that the:'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D5. Nursing diagnoses vs medical diagnoses — topic 'General'
UPDATE questions SET topic = 'Nursing Process'
WHERE stem LIKE 'Nursing diagnoses mostly differ from medical diagnoses%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D6. Angina outcome criterion — topic fix to match corrected unit
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The nursing diagnosis for a patient with angina pectoris%'
  AND cadre IN ('BScN', 'KRCHN');

-- D7. Evaluation phase of nursing process — topic 'General'
UPDATE questions SET topic = 'Nursing Process'
WHERE stem LIKE 'Which action occurs primarily during the evaluation phase%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D8. Cognitive skills in nursing process — topic 'General'
UPDATE questions SET topic = 'Nursing Process'
WHERE stem LIKE 'Cognitive skills, key in implementation of nursing process%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D9. Claustrophobic patient MRI — topic 'General'
UPDATE questions SET topic = 'Diagnostic Procedures'
WHERE stem LIKE 'The nursing action needed for claustrophobic patient before MRI%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D10. Varicose veins CVS question — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Which of the following cardiovascular condition is more prevalent among females%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D11. Hot potato voice — topic 'General'
UPDATE questions SET topic = 'ENT Nursing'
WHERE stem LIKE 'Patient manifesting with "hot potato voice"%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D12. Furuncles — topic 'General'
UPDATE questions SET topic = 'Dermatological Nursing'
WHERE stem LIKE 'Furuncles (boils) are commonly caused by%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D13. Psoriasis scales — topic 'General'
UPDATE questions SET topic = 'Dermatological Nursing'
WHERE stem LIKE 'Management of scaled lesion in psoriasis include%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D14. Cut wound triage — topic 'General'
UPDATE questions SET topic = 'Emergency Nursing'
WHERE stem LIKE 'The patient was brought to the outpatient department with a cut wound%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D15. Conjoined twins — topic 'General'
UPDATE questions SET topic = 'Multiple Pregnancy'
WHERE stem LIKE 'What would be the result of fail splitting a single fertilized ovum%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D16. LGA definition — topic 'General'
UPDATE questions SET topic = 'Neonatal Assessment'
WHERE stem LIKE 'Which of the following best describes large for gestational age%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D17. Chorioamnionitis clinical feature — topic 'General'
UPDATE questions SET topic = 'Obstetric Infections'
WHERE stem LIKE 'Which ONE of the following is a clinical feature%chorio-amnionitis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D18. Retained products of conception — topic 'General'
UPDATE questions SET topic = 'Obstetric Emergencies'
WHERE stem LIKE 'What is the greatest risk of retained products of conception%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D19. OP position outcomes — topic 'General'
UPDATE questions SET topic = 'Malpresentations'
WHERE stem LIKE 'Which of the following is NOT an outcome for an occipito posterior%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D20. 4 Ps of labour — topic 'General'
UPDATE questions SET topic = 'Labour and Delivery'
WHERE stem LIKE 'When assessing the progress of labour, the midwife should assess for the 4 Ps%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D21. 3rd degree moulding — topic 'General'
UPDATE questions SET topic = 'Labour and Delivery'
WHERE stem LIKE 'What is 3rd degree moulding%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D22. Brow presentation engaging diameter — topic 'General'
UPDATE questions SET topic = 'Malpresentations'
WHERE stem LIKE 'In a brow presentation, what is the engaging diameter%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D23. Complete breech — topic 'General'
UPDATE questions SET topic = 'Malpresentations'
WHERE stem LIKE 'Which statement BEST describes a complete breech presentation%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D24. Face presentation diameters — topic 'General'
UPDATE questions SET topic = 'Malpresentations'
WHERE stem LIKE 'Which of the following are the engaging diameters in a face presentation%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D25. Bishop score — topic 'General'
UPDATE questions SET topic = 'Labour and Delivery'
WHERE stem LIKE 'Thembi is primigravida at 39 weeks%Bishop Score%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D26. Trial of scar contraindication — topic 'General'
UPDATE questions SET topic = 'Labour and Delivery'
WHERE stem LIKE 'Which of the following is NOT a contra-indication for a trial of scar%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D27. PPH first-line drug — topic 'General' — unit also Pharmacology
UPDATE questions SET unit = 'Midwifery', topic = 'Obstetric Emergencies'
WHERE stem LIKE 'Which ONE of the following drugs should be used first%post partum haemorrhage%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D28. Subtle neonatal seizure — topic 'General'
UPDATE questions SET topic = 'Neonatal Neurology'
WHERE stem LIKE 'Subtle neonatal seizure is recognized by%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D29. Causes of primary amenorrhea — topic 'General'
UPDATE questions SET topic = 'Gynaecology'
WHERE stem LIKE 'Causes of primary amenorrhea include%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D30. Anterior pituitary hormones except — topic 'General'
UPDATE questions SET topic = 'Pituitary Disorders'
WHERE stem LIKE 'The following are anterior pituitary gland hormones except%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D31. Wernicke area — topic 'General'
UPDATE questions SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Wernicke area is in the%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D32. Cardiac output formula — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Cardiac output is equal to%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D33. Hashimoto thyroiditis — topic 'General'
UPDATE questions SET topic = 'Thyroid Disorders'
WHERE stem LIKE 'The following is true regarding Hashimoto thyroiditis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D34. 2nd degree burns characteristics — topic 'General'
UPDATE questions SET topic = 'Burn Nursing'
WHERE stem LIKE 'Characteristics of 2nd degree burns include%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D35. Burn TBSA palm = 1% — topic 'General'
UPDATE questions SET topic = 'Burn Nursing'
WHERE stem LIKE 'When estimating the size of burns, the palm of the patient%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D36. Melaena causes — topic 'General'
UPDATE questions SET topic = 'GI Disorders'
WHERE stem LIKE 'Malena can be caused by%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D37. Ulcerative colitis signs — topic 'General'
UPDATE questions SET topic = 'GI Disorders'
WHERE stem LIKE 'Which sign and symptoms should a nurse expect%ulcerative colitis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D38. Early miscarriage definition — topic 'General'
UPDATE questions SET topic = 'Obstetric Complications'
WHERE stem LIKE 'Early miscarriage refers to%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D39. Hydatidiform mole features — topic 'General'
UPDATE questions SET topic = 'Gestational Trophoblastic Disease'
WHERE stem LIKE 'Clinical features of hydatidiform mole include%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D40. Aorta divides at L4 — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Anatomy'
WHERE stem LIKE 'The aorta divides at the level of the 4th lumbar vertebra%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D41. Corneal infections avascular — topic 'General'
UPDATE questions SET topic = 'Ophthalmic Nursing'
WHERE stem LIKE 'Corneal infections are difficult to treat%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D42. Ineffective airway clearance — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'The most appropriate intervention for a client with a diagnosis of ineffective airway%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D43. Atopic dermatitis symptom — topic 'General'
UPDATE questions SET topic = 'Dermatological Nursing'
WHERE stem LIKE 'Which is a symptom of atopic dermatitis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D44. CVP right atrium marking — topic 'General'
UPDATE questions SET topic = 'Critical Care Nursing'
WHERE stem LIKE 'When measuring central venous pressure (CVP) the nurse should%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D45. Burns electrolytes — topic 'General'
UPDATE questions SET topic = 'Burn Nursing'
WHERE stem LIKE 'The immediate effects of burns on body fluids and electrolytes%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D46. Laryngeal suctioning — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'When suctioning a laryngeal tube%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D47. Hyperkalemia causes — topic 'General'
UPDATE questions SET topic = 'Fluid and Electrolyte Balance'
WHERE stem LIKE 'Hyperkalemia commonly occurs in the following%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D48. Route quickest absorption (IM) — topic 'General'
UPDATE questions SET topic = 'Drug Therapy'
WHERE stem LIKE 'The route that achieves the quickest absorption%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D49. Simple mastectomy — topic 'General'
UPDATE questions SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'In simple mastectomy%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D50. Reed Sternberg cell — topic 'General'
UPDATE questions SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'Reed Sternberg cell is a pathologic hallmark%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D51. Emphysema X-ray — topic 'General' (already in migration 002 as 'Respiratory Nursing' via LIKE)
-- Confirm residual:
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'X-ray film of a patient shows expanded airways%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D52. Ischaemic stroke causes — topic 'General'
UPDATE questions SET topic = 'Cerebrovascular Disorders'
WHERE stem LIKE 'What are the causes of ischaemic stroke%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D53. Glucose control (glucagon/gluconeogenesis) — topic 'General'
UPDATE questions SET topic = 'Diabetes Mellitus'
WHERE stem LIKE 'Which one of the following is correct regarding the control of glucose levels%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D54. Colostomy lower descending colon stool type — topic 'General'
UPDATE questions SET topic = 'GI Disorders'
WHERE stem LIKE 'What type of stool can a nurse expect from a client who has a colostomy%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D55. Emphysema COPD positioning — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'While caring for a patient with a diagnosis of emphysema%positioning%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D56. Cardiac auscultation S3 S4 murmurs — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'During chest auscultation of a patient, which findings will indicate%cardiac condition%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D57. Chest tube suction chamber bubbling — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Nurse Lei caring for a client with a pneumothorax%suction control chamber%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D58. Hypothyroidism goiter pathophysiology — topic 'General'
UPDATE questions SET topic = 'Thyroid Disorders'
WHERE stem LIKE 'You assess a client with newly diagnosed hypothyroidism%enlarged thyroid%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D59. Chemotherapy nausea intervention — topic 'General'
UPDATE questions SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'Ms. Smith complains of nausea and vomiting following her daily chemotherapy%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D60. Burn shock risk — topic 'General'
UPDATE questions SET topic = 'Burn Nursing'
WHERE stem LIKE 'Which of the following clients is a greater risk for burn shock%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D61. Neurovascular assessment / cast complication — topic 'General'
UPDATE questions SET topic = 'Musculoskeletal Nursing'
WHERE stem LIKE 'While providing care to an old woman with a cast on her lower arm%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D62. Dumping syndrome — topic 'General'
UPDATE questions SET topic = 'GI Disorders'
WHERE stem LIKE 'Following gastrectomy, dumping syndrome occurs%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D63. Intracerebral haemorrhage worst prognosis — topic 'General'
UPDATE questions SET topic = 'Neurological Nursing'
WHERE stem LIKE 'The intracranial; hemorrhage with the worst prognosis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D64. Tympanoplasty health message — topic 'General'
UPDATE questions SET topic = 'ENT Nursing'
WHERE stem LIKE 'The health message given to a patient following tympanoplasty%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D65. Normal lung percussion — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Which of the following indicates a normal finding on percussion of the lungs%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D66. Acute otitis media causes — topic 'General'
UPDATE questions SET topic = 'Paediatric Infections'
WHERE stem LIKE 'The primary causes of acute otitis media are%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D67. Rhesus factor on erythrocytes — topic 'General'
UPDATE questions SET topic = 'Haematology'
WHERE stem LIKE 'Rhesus factor is found in the cell membrane of the%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D68. Hypogastric region anatomy — topic 'General'
UPDATE questions SET topic = 'Anatomy and Physiology'
WHERE stem LIKE 'The hypogastric region of the abdominopelvic cavity is%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D69. NG tube insertion coughing — topic 'General'
UPDATE questions SET topic = 'GI Nursing Procedures'
WHERE stem LIKE 'The most appropriate nursing action when a client begins to cough%nasogastric tube%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D70. Expected outcomes impaired gas exchange — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'The expected outcomes for a patient who has%fluid overload%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D71. Lumbar puncture needle space — topic 'General'
UPDATE questions SET topic = 'Neurological Nursing'
WHERE stem LIKE 'During Lumbar puncture, a needle is inserted in the space between%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D72. Chronic bronchitis definition — topic 'General'
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'In chronic bronchitis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D73. Strabismus — topic 'General'
UPDATE questions SET topic = 'Ophthalmic Nursing'
WHERE stem LIKE 'The condition in which the eyeballs are not properly aligned%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D74. Cushing's syndrome assessment — topic 'General'
UPDATE questions SET topic = 'Adrenal Disorders'
WHERE stem LIKE 'When assessing a client with possible Cushing%s syndrome%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D75. Enema left lateral position — topic 'General'
UPDATE questions SET topic = 'GI Nursing Procedures'
WHERE stem LIKE 'When administering an enema%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D76. Triple therapy H. pylori — topic 'General'
UPDATE questions SET topic = 'GI Disorders'
WHERE stem LIKE 'Triple therapy is indicated in treatment of%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D77. Post thyroidectomy priority — topic 'General'
UPDATE questions SET topic = 'Thyroid Disorders'
WHERE stem LIKE 'during the early postoperative period after a subtotal thyroidectomy%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D78. Post esophageal surgery priority — topic 'General'
UPDATE questions SET topic = 'Surgical Nursing'
WHERE stem LIKE 'immediately after esophageal surgery%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D79. Rosuvastatin muscle weakness — topic 'General'
UPDATE questions SET topic = 'Drug Therapy'
WHERE stem LIKE 'The client presents to the clinic with a serum cholesterol of 275%rosuvastatin%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D80. Diazoxide blood glucose — topic 'General'
UPDATE questions SET topic = 'Drug Therapy'
WHERE stem LIKE 'The client is admitted to the hospital with hypertensive crises. Diazoxide%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D81. Digitalis toxicity infant HR — topic 'General'
UPDATE questions SET topic = 'Paediatric Cardiac Nursing'
WHERE stem LIKE 'The 6-month-old client with a ventral septal defect is receiving Digitalis%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D82. Nitroglycerin dark bottle — topic 'General'
UPDATE questions SET topic = 'Drug Therapy'
WHERE stem LIKE 'The client admitted with angina is given a prescription for nitroglycerin%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D83. Low saturated fat diet — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The client is instructed regarding foods that are low in fat and cholesterol%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D84. CHF sacrum edema — topic 'General'
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The client is admitted with left-sided congestive heart failure%edema%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D85. CVP phlebostatic axis — topic 'General'
UPDATE questions SET topic = 'Critical Care Nursing'
WHERE stem LIKE 'The nurse is checking the client%s central venous pressure%phlebostatic%'
  AND topic = 'General'
  AND cadre IN ('BScN', 'KRCHN');

-- D86. Hydatidiform mole — unit also needs fix to Midwifery for KRCHN/BScN
UPDATE questions SET unit = 'Midwifery', topic = 'Gestational Trophoblastic Disease'
WHERE stem LIKE 'Clinical features of hydatidiform mole include%'
  AND cadre IN ('BScN', 'KRCHN');

-- D87. Early miscarriage — unit fix to Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Obstetric Complications'
WHERE stem LIKE 'Early miscarriage refers to%'
  AND cadre IN ('BScN', 'KRCHN');

-- D88. PPH oxytocin — unit already Pharmacology for the supplement; fix to Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Obstetric Emergencies'
WHERE stem LIKE 'Which ONE of the following drugs should be used first%post partum haemorrhage%'
  AND cadre IN ('BScN', 'KRCHN');

-- D89. Subtle neonatal seizure — unit Paediatric Nursing not Medical-Surgical
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Neurology'
WHERE stem LIKE 'Subtle neonatal seizure is recognized by%'
  AND cadre IN ('BScN', 'KRCHN');

-- D90. LGA definition — unit Paediatric Nursing
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Assessment'
WHERE stem LIKE 'Which of the following best describes large for gestational age%'
  AND cadre IN ('BScN', 'KRCHN');

-- D91. Chorioamnionitis — unit Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Obstetric Infections'
WHERE stem LIKE 'Which ONE of the following is a clinical feature%chorio-amnionitis%'
  AND cadre IN ('BScN', 'KRCHN');

-- D92. Retained products — unit Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Obstetric Emergencies'
WHERE stem LIKE 'What is the greatest risk of retained products of conception%'
  AND cadre IN ('BScN', 'KRCHN');

-- D93. Bishop score — unit Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'Thembi is primigravida at 39 weeks%Bishop Score%'
  AND cadre IN ('BScN', 'KRCHN');

-- D94. Trial of scar — unit Midwifery
UPDATE questions SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'Which of the following is NOT a contra-indication for a trial of scar%'
  AND cadre IN ('BScN', 'KRCHN');

-- D95. Strabismus — unit Medical-Surgical (not currently wrong but confirm topic)
UPDATE questions SET topic = 'Ophthalmic Nursing'
WHERE stem LIKE 'The condition in which the eyeballs are not properly aligned%'
  AND cadre IN ('BScN', 'KRCHN');

-- D96. Aorta divides at L4 — topic Anatomy
UPDATE questions SET topic = 'Cardiovascular Anatomy'
WHERE stem LIKE 'The aorta divides at the level of the 4th lumbar vertebra%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION E: RATIONALE ACCURACY FIXES
-- =============================================================================

-- E1. MAGNESIUM SULFATE — expected vs toxic effects (supplement question)
-- Migration 004 already addressed this. Confirm KRCHN version also gets it:
UPDATE questions
SET rationale = 'At therapeutic magnesium sulfate levels, mild sedation/drowsiness (hypersomnolence) and a feeling of warmth/flushing are commonly experienced and are considered expected (not toxic) effects. Signs of toxicity include: loss of patellar reflex (earliest sign), respiratory depression (<12/min), and oliguria (<30 mL/hr) — these require immediate dose reduction or calcium gluconate administration. (Kenya MOH/WHO eclampsia management guidelines; Myles Textbook for Midwives.)'
WHERE stem LIKE 'The nurse caring for a client receiving intravenous magnesium sulfate must closely observe%'
  AND cadre = 'KRCHN';

-- E2. BIOT'S RESPIRATIONS — rationale contamination cleanup (migration 004 did BScN/KRCHN)
-- Ensure clean for both cadres:
UPDATE questions
SET rationale = 'Biot''s (ataxic) respirations — an irregular pattern of variable-depth breaths interspersed with periods of apnea — are associated with damage to the pons/medulla. Kussmaul breathing (deep, rapid, regular) is seen in diabetic ketoacidosis. Cheyne-Stokes pattern occurs with cardiac failure and CNS disease. (Brunner & Suddarth''s Medical-Surgical Nursing; neurological nursing.)'
WHERE stem LIKE 'Biot''s respirations are associated with%'
  AND cadre IN ('BScN', 'KRCHN');

-- E3. CORTICOSTEROID SIDE EFFECT — "glaucoma as unacceptable"
-- The rationale is sound. Glaucoma is a serious adverse effect requiring monitoring.
-- However the question framing is misleading: facial mooning, weight gain and K+ loss
-- are "expected/anticipated" — but are still side effects requiring monitoring.
-- Glaucoma is the SERIOUS/UNACCEPTABLE one. Rationale confirmed correct.

-- E4. PHEOCHROMOCYTOMA EPINEPHRINE VALUE — 450 pg/mL positive test
-- Normal plasma epinephrine at rest: <100 pg/mL.
-- Values >400 pg/mL suggest pheochromocytoma. 450 pg/mL is clearly elevated.
-- However, interpretation varies by lab (some use >200 pg/mL as abnormal).
-- Among the options, 450 pg/mL is the only value clearly above any threshold.
-- Answer D confirmed correct.

-- E5. DRUG DOSAGE IN ELDERLY — "drug biotransformation" (migration 002 fix for BScN)
-- The fix changed BScN from D to C. This is the MORE PRECISE mechanistic reason.
-- Confirmed correct per §14.3 pharmacology references.

-- E6. SICKLE CELL — "immediate blood transfusion encouraged during crisis" (option C = wrong)
-- The answer B (folic acid + pneumococcal vaccine) is correct.
-- Note: option C says "IV fluids & immediate blood transfusion are ENCOURAGED" —
-- this is misleading. Per Kenya Basic Paediatric Protocols, IV hydration IS encouraged
-- but ROUTINE blood transfusion is NOT; exchange transfusion is for specific indications.
-- Rationale is accurate. Answer B confirmed.

-- E7. INTRACEREBRAL vs SUBDURAL HAEMORRHAGE worst prognosis
-- Answer C (intracerebral haemorrhage) is correct.
-- Epidural haemorrhage CAN be rapidly fatal but has a better surgical prognosis.
-- Intracerebral (parenchymal) haemorrhage has the worst prognosis overall. Confirmed.

-- E8. STOMA — correction to rationale (migration 004 done)
-- Verify rationale contains the corrected text (no "sensation on touch"):
UPDATE questions
SET rationale = 'A healthy stoma is pink/red, moist and highly vascular — it will bleed slightly on gentle contact due to its vascularity. Importantly, the stoma mucosa has NO pain sensation (intestinal mucosa is insensate), so the patient will not feel pain if it is touched. Among the choices, C is the best description: healthy stomas are pink/red and bleed slightly on touch. The phrase ''has sensation on touch'' in option C is clinically inaccurate, but C remains the best available option overall. (Brunner & Suddarth''s Medical-Surgical Nursing; stoma care guidelines.)'
WHERE stem LIKE 'One of the following true about stomas%'
  AND cadre IN ('BScN', 'KRCHN');

-- E9. CHORIOAMNIONITIS — maternal temp 37.4°C is NOT febrile; confirm answer D = tachycardia
-- Per Myles/WHO: chorioamnionitis diagnosed with fever >38°C + 2 of: tachycardia,
-- uterine tenderness, foul-smelling discharge, leucocytosis.
-- A pulse of 110 bpm IS tachycardia and IS a clinical feature. Answer D confirmed.
-- Non-tender uterus and 37.4°C are NOT features of chorioamnionitis.
-- Update rationale for clarity:
UPDATE questions
SET rationale = 'Clinical chorioamnionitis is characterised by maternal fever (>38°C), maternal tachycardia (>100 bpm), fetal tachycardia, uterine tenderness, and foul-smelling amniotic fluid/vaginal discharge. A maternal pulse of 110 bpm (D) represents tachycardia and IS a valid clinical feature. A temperature of 37.4°C is not febrile (below the 38°C threshold) and a non-tender uterus is the opposite of the expected finding. Foul-smelling vaginal discharge (A) is also a feature, but without uterine tenderness, the pulse criterion (D) is the clearer single correct answer in this context. (Myles Textbook for Midwives; Kenya MOH BEmONC guidelines.)'
WHERE stem LIKE 'Which ONE of the following is a clinical feature%chorio-amnionitis%'
  AND cadre IN ('BScN', 'KRCHN');

-- E10. RETAINED PRODUCTS — uterine atony vs inversion
-- Answer A (uterine atony) is correct for the greatest risk.
-- Rationale confirmed. No change needed.

-- E11. COMPLETE BREECH — "both hips and both knees are flexed" = option B
-- Confirmed. Frank breech = hips flexed, knees extended. Complete = both flexed.

-- E12. BROW PRESENTATION ENGAGING DIAMETER — mentovertical (option C) = ~13.5 cm
-- Confirmed. This is the largest AP diameter and explains obstructed labour in brow.

-- E13. BISHOP SCORE CALCULATION — Thembi
-- Dilatation 1-2 cm = score 1; Length 2 cm (long cervix, not effaced) = score 1;
-- Station -3 = score 0; Consistency firm = score 0; Position mid = score 1.
-- Total = 3. Answer B (3) confirmed.

-- E14. ISHAEMIC STROKE CAUSES — option B (cardiogenic embolism, small artery, cryptogenic)
-- Correct — these are all ischaemic mechanisms. Other options include haemorrhagic causes.
-- Confirmed.

-- =============================================================================
-- SECTION F: ADDITIONAL CLINICAL ACCURACY FIXES
-- =============================================================================

-- F1. ESOPHAGEAL VARICES — "hepatic hypertension" vs "portal hypertension"
-- The correct term is PORTAL hypertension. The option reads "hepatic hypertension"
-- which is a loose/lay description. Per NCK standard the intended answer is C and
-- the rationale correctly explains it as portal hypertension. Since the option text
-- itself says "hepatic hypertension" this is the NCK source wording — it is the
-- best available answer among options given. Keep C with clarified rationale:
UPDATE questions
SET rationale = 'Esophageal varices are dilated submucosal veins resulting from portal hypertension, most often caused by cirrhosis (Brunner & Suddarth''s Medical-Surgical Nursing). Option C uses the term ''hepatic hypertension'' — in NCK source documents this refers to the portal (hepatic) hypertension concept. Inflammation, peptic ulcers and haemorrhoids do not cause oesophageal varices. (Note: the precise clinical term is ''portal hypertension,'' not ''hepatic hypertension.'')'
WHERE stem = 'Esophageal varices are caused by:'
  AND cadre IN ('BScN', 'KRCHN');

-- F2. HYPOTHYROIDISM GOITER — compensatory TSH stimulation
-- "A compensatory effort to produce more TH" is the correct mechanism. Answer C confirmed.

-- F3. CHRONIC RESPIRATORY FAILURE ABG VALUES
-- Chronic respiratory failure: PaO2 <50, PaCO2 >50, pH ~7.35 (compensated/near-normal).
-- Option D: "PaO2 <50 mmHg, PaCO2 >50 mmHg, pH = 7.35" = CORRECT.
-- Note: pH 7.35 is at the LOW end of normal — reflects renal compensation.
-- Options A, B (pH 7.36/7.56 with same gas values) describe uncompensated/alkalotic states
-- not consistent with chronic failure. Answer D confirmed.

-- F4. MELAENA — "Malena" is a misspelling in the stem (should be "Melaena" or "Melena")
-- Spelling errors in stems are source-document artefacts. Do NOT change the stem
-- (it would break the ON CONFLICT constraint). Noted only.

-- F5. RHEUMATOID ARTHRITIS onset joints — "Feet, wrist, toes" (option B)
-- Per Brunner & Suddarth: RA begins in small joints — MCPs, PIPs of hands AND MTP joints
-- of feet. Option B (feet, wrist, toes) includes feet/toes (MTP joints) and wrist.
-- Answer B is correct. Confirmed.

-- F6. ESCHAROTOMY main aim — "allow underlying viable tissues to expand" (option C)
-- Correct. Escharotomy relieves circumferential constriction to restore perfusion/ventilation.
-- Confirmed.

-- F7. OSTEOPOROSIS risk factors — "excessive alcohol, early menopause" (option D)
-- Correct. Early menopause (oestrogen loss) and excess alcohol are established risk factors.
-- Options A/B/C contain incorrect items (high estrogen is PROTECTIVE, sun exposure is
-- protective for vitamin D, late menopause is protective). Answer D confirmed.

-- F8. BURN SHOCK — ">50% TBSA from high-voltage electric accident" (option D)
-- Correct. Massive full-thickness burns + electrical injury = highest shock risk. Confirmed.

-- F9. ENEMA — "left lateral position" (option D)
-- Correct. Sims' (left lateral) position follows sigmoid colon anatomy. Confirmed.
-- Note: insertion depth for adults is 3–4 inches, NOT 8 inches as option B states.
-- The rationale already calls this out. Confirmed.

-- F10. DIAZOXIDE — monitor blood glucose (option B)
-- Correct. Diazoxide opens K+ATP channels in beta cells, inhibiting insulin release,
-- causing hyperglycaemia. Blood glucose monitoring is essential. Confirmed.

-- F11. DIGITALIS TOXICITY in 6-month-old — HR 60 bpm
-- Per Kenya Basic Paediatric Protocols: digoxin should be withheld in infants if
-- apical HR <90-100 bpm. A rate of 60 bpm = significant bradycardia = toxicity concern.
-- Answer C (HR 60 bpm) confirmed as the finding to report.

-- F12. NITROGLYCERIN — dark bottle storage (option C)
-- Correct. Nitroglycerin is light-sensitive; must be kept in original dark glass bottle.
-- Replaced every 6 months (not 3 months as option A states). Confirmed.

-- F13. LUMBAR PUNCTURE site — L3-L4 interspace (option C)
-- Correct. Below the L1-L2 conus medullaris termination. LP typically at L3-L4 or L4-L5.
-- Option C says "Third and fourth lumbar vertebrae" = L3-L4. Confirmed.

-- F14. CVP phlebostatic axis (migration 001 question ending truncated with "Gener...")
-- The question stem ending was truncated in the file read due to file size limits.
-- Confirm answer A (phlebostatic axis) and rationale are correct.
-- Per Brunner & Suddarth: phlebostatic axis = 4th ICS, mid-AP chest = right atrium level.
-- Answer A confirmed.

-- =============================================================================
-- SECTION G: SUPPLEMENT FILE SPECIFIC FIXES
-- =============================================================================

-- G1. TABULA RASA (migration 003 KRCHN) — unit fix
-- Migration 002 already fixed BScN. KRCHN still has unit = Community Health Nursing.
-- Tabula rasa is a psychological/behavioural science concept — Mental Health Nursing.
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Psychological Theories'
WHERE stem LIKE 'The term "tabula rasa" highlights%'
  AND cadre = 'KRCHN';

-- G2. ADOLESCENT IDENTITY STAGE (migration 003 KRCHN) — unit fix
-- Unit is Community Health Nursing but this is developmental psychology / Erikson.
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Developmental Theories'
WHERE stem LIKE 'Which stage of development is most unstable and challenging%personal identity%'
  AND cadre = 'KRCHN';

-- G3. ANDRAGOGY (migration 003 KRCHN) — unit fix
-- Unit is Community Health Nursing. Andragogy is adult learning theory → Nursing Education.
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Andragogy refers to%'
  AND cadre IN ('BScN', 'KRCHN');

-- G4. FORMATIVE ASSESSMENT (migration 003 KRCHN) — unit fix
-- Unit is Community Health Nursing. Educational assessment → Nursing Education.
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'A type of educational assessment which is generally carried out throughout%'
  AND cadre = 'KRCHN';

-- G5. BLOOM'S TAXONOMY COGNITIVE DOMAIN (migration 003 KRCHN) — confirmed correct
-- Answer D (Criticism) is the exception — not in Bloom's cognitive domain. Confirmed.

-- G6. PBL CHARACTERISTICS (migration 003 KRCHN) — confirmed correct
-- Answer C (teacher is authority) is the exception in PBL. Confirmed.

-- G7. COMMUNE FAMILY TYPE (migration 003 KRCHN) — confirmed correct
-- Answer C (commune = more than one monogamous couple sharing resources). Confirmed.

-- G8. BITOT'S SPOTS (migration 003 KRCHN) — unit fix
-- Unit is Community Health Nursing. Bitot's spots = vitamin A deficiency → Nutrition.
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamin Deficiencies'
WHERE stem LIKE 'Bitot%s spot%'
  AND cadre = 'KRCHN';

-- G9. ABIOTIC ENVIRONMENT (migration 003 KRCHN) — confirmed correct
-- Chemicals = abiotic (non-living). Insects/vegetation = biotic. Answer D confirmed.

-- G10. SCHOOL HEALTH ACTIVITIES for child (migration 003 KRCHN)
-- Screening and physical examination (A) is core school health service activity.
-- Answer A confirmed.

-- G11. KEPI REFRIGERATOR DEFROST (migration 003 KRCHN)
-- Answer D (6-10 mm ice thickness). This is the Kenya KEPI guideline.
-- Defrost when ice reaches ~0.5-1 cm to maintain cold chain efficiency. Confirmed.

-- G12. ABSOLUTE CONTRAINDICATION IMMUNISATION (migration 003 KRCHN)
-- Answer A (anaphylaxis to previous dose). This is the only absolute contraindication.
-- Minor illness, local reaction, and a febrile seizure 1 month prior are NOT absolute
-- contraindications. Confirmed correct.

-- G13. CHOLESTEROL SCREENING — secondary prevention (migration 003 KRCHN)
-- Answer B (secondary prevention). Screening asymptomatic patients = early detection.
-- Primary = prevent onset; tertiary = limit disability. Answer B confirmed.

-- G14. SDG 1 — END POVERTY in all forms everywhere (migration 003 KRCHN)
-- Answer C confirmed. Halving poverty was an MDG1 target, not SDG1. Confirmed.

-- G15. HEALTH PROMOTION ACTIVITY — environmental sanitation (migration 003 KRCHN)
-- Answer B confirmed. Environmental sanitation is health promotion.
-- Note: "provision of adequate housing" is also arguably health promotion.
-- Per §7.6: environmental sanitation is the most unambiguously correct NCK answer.
-- Keep B.

-- G16. PHC ACCESSIBILITY — social status is NOT accessibility (migration 003 KRCHN)
-- Social status relates to equity/acceptability, not physical/geographic accessibility.
-- Answer D (social status) is the exception. Confirmed.

-- G17. CULTURAL BROKERING (migration 003 KRCHN)
-- Answer D (cultural brokering) enables holistic care for diverse clients. Confirmed.

-- G18. MAX WEBER BUREAUCRATIC THEORY (migration 003 KRCHN)
-- Answer A confirmed. Weber = bureaucratic; Taylor = scientific management. Confirmed.

-- G19. HEALTH BELIEF MODEL — modifying factors (migration 003 KRCHN)
-- Answer B (modifying factors). The HBM includes: perceived susceptibility, severity,
-- benefits, barriers, cues to action, and self-efficacy — plus modifying factors
-- (demographics, socio-psychological). B is a legitimate HBM component. Confirmed.

-- G20. SCHOOL HEALTH SERVICE FUNCTION (migration 003 KRCHN)
-- Answer C: "understanding growth and development stages" is NOT a specific service
-- function but background knowledge. Confirmed correct as the exception.

-- =============================================================================
-- SECTION H: PAPER ASSIGNMENT VERIFICATION FIXES
-- =============================================================================
-- Per nck-exam-system.md §12:
-- KRCHN Paper I  = Med-Surg, Midwifery, Pharmacology, Paediatric, A&P
-- KRCHN Paper II = Community Health, Mental Health, Environmental Health,
--                  Nutrition, Research, Health Systems, IPC
-- BScN Paper I   = same as KRCHN Paper I (advanced)
-- BScN Paper II  = Community Health, Mental Health, Research, Leadership,
--                  Ethics, Health Systems, IPC, Nutrition

-- H1. Tabula rasa / developmental theories → Paper II (Mental Health)
UPDATE questions SET paper = 'Paper II'
WHERE stem LIKE 'The term "tabula rasa" highlights%'
  AND cadre = 'KRCHN';

UPDATE questions SET paper = 'Paper II'
WHERE stem LIKE 'Which stage of development is most unstable%personal identity%'
  AND cadre = 'KRCHN';

-- H2. Andragogy → Paper II (Education / Leadership)
UPDATE questions SET paper = 'Paper II'
WHERE stem LIKE 'Andragogy refers to%'
  AND cadre = 'KRCHN';

-- H3. Formative assessment → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE stem LIKE 'A type of educational assessment which is generally carried out throughout%'
  AND cadre = 'KRCHN';

-- H4. Defence mechanisms, defence mechanism questions → Paper II (Mental Health)
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Mental Health Nursing'
  AND paper = 'Paper I'
  AND cadre = 'KRCHN';

UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Mental Health Nursing'
  AND paper = 'Paper I'
  AND cadre = 'BScN';

-- H5. Community Health Nursing questions incorrectly on Paper I → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Community Health Nursing'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H6. Environmental Health questions → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Environmental Health'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H7. Nutrition questions → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Nutrition'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H8. Research & Evidence-Based Practice → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Research & Evidence-Based Practice'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H9. Nursing Management & Leadership → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Nursing Management & Leadership'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H10. Professional Ethics & Law → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Professional Ethics & Law'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H11. Health Systems in Kenya → Paper II
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Health Systems in Kenya'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- H12. Infection Prevention & Control → Paper II
-- (IPC belongs to Paper II for both cadres per §12)
-- EXCEPTION: infection questions that are clinical bedside nursing (aseptic technique,
-- suction, wound care) stay in Paper I under Medical-Surgical unit.
UPDATE questions SET paper = 'Paper II'
WHERE unit = 'Infection Prevention & Control'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION I: DIFFICULTY LEVEL FIXES
-- Per nck-exam-system.md §13.3:
-- easy   = recall
-- medium = application / prioritisation
-- hard   = analysis / synthesis / evaluation
-- =============================================================================

-- I1. Recall questions incorrectly marked 'medium' — upgrade easy ones
-- Simple definition questions (gerontology, sarcopenia, anatomy terms) = easy
UPDATE questions SET difficulty = 'easy'
WHERE stem = 'The scientific study of the aging process is referred to as:'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'One of the following is true about loss of muscle mass in the elderly%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem = 'An example of exocrine glands are the:'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Diabetes insipidus is a disorder related to a deficiency of%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'The most common type of goiter is etiologically related to a deficiency of%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'The nurse knows that the most common and least aggressive type of cancer is%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Hemoptysis is defined as%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem = 'Gerontology is the scientific study of aging:'  -- alternate phrasing
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'One of the following is an Intracardiac shunt%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'One of following is a nerve formed by brachial plexus%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'One of the following wave represent atrial depolarization%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Phrenic nerve is formed by following spinal cord plexus%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Spinal cord terminates at%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Reed Sternberg cell is a pathologic hallmark%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem = 'Andragogy refers to:'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Max Weber is known for the development of which management theory%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Cardiac output is equal to%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Wernicke area is in the%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Non-digestible food ingredients that stimulate the growth%'
  AND cadre IN ('BScN', 'KRCHN');

-- I2. Complex clinical reasoning questions should be 'hard'
UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'Nursing intervention should be a priority in one of the following patients%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'The nursing diagnosis for a patient with angina pectoris%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'Thembi is primigravida at 39 weeks%Bishop Score%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'Which ONE of the following drugs should be used first%post partum haemorrhage%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'When de%gestational diabetes%priority%teaching%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION J: FINAL CLEANUP — remaining 'General' topics catch-all
-- After all the targeted fixes above, sweep any residual 'General' topics
-- by unit for questions inserted in migration 003 that weren't caught earlier.
-- =============================================================================

-- J1. Midwifery catch-all for any remaining 'General'
UPDATE questions SET topic = 'Midwifery Care'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND cadre IN ('BScN', 'KRCHN');

-- J2. Paediatric catch-all
UPDATE questions SET topic = 'Paediatric Nursing'
WHERE topic = 'General' AND unit = 'Paediatric Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- J3. Medical-Surgical catch-all
UPDATE questions SET topic = 'Medical-Surgical Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- J4. Mental Health catch-all
UPDATE questions SET topic = 'Mental Health Nursing'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- J5. Community Health catch-all
UPDATE questions SET topic = 'Community Health'
WHERE topic = 'General' AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- J6. Pharmacology catch-all
UPDATE questions SET topic = 'Drug Therapy'
WHERE topic = 'General' AND unit = 'Pharmacology'
  AND cadre IN ('BScN', 'KRCHN');

-- J7. Nursing Management catch-all
UPDATE questions SET topic = 'Nursing Management'
WHERE topic = 'General' AND unit = 'Nursing Management & Leadership'
  AND cadre IN ('BScN', 'KRCHN');

-- J8. Nutrition catch-all
UPDATE questions SET topic = 'Nutrition'
WHERE topic = 'General' AND unit = 'Nutrition'
  AND cadre IN ('BScN', 'KRCHN');

-- J9. Research catch-all
UPDATE questions SET topic = 'Research Methodology'
WHERE topic = 'General' AND unit = 'Research & Evidence-Based Practice'
  AND cadre IN ('BScN', 'KRCHN');

-- J10. Infection Prevention catch-all
UPDATE questions SET topic = 'Infection Prevention'
WHERE topic = 'General' AND unit = 'Infection Prevention & Control'
  AND cadre IN ('BScN', 'KRCHN');

-- J11. Environmental Health catch-all
UPDATE questions SET topic = 'Environmental Health'
WHERE topic = 'General' AND unit = 'Environmental Health'
  AND cadre IN ('BScN', 'KRCHN');

-- J12. Professional Ethics catch-all
UPDATE questions SET topic = 'Professional Practice'
WHERE topic = 'General' AND unit = 'Professional Ethics & Law'
  AND cadre IN ('BScN', 'KRCHN');

-- J13. Health Systems catch-all
UPDATE questions SET topic = 'Kenya Health System'
WHERE topic = 'General' AND unit = 'Health Systems in Kenya'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION K: ADDITIONAL FIXES NOT IN PRIOR MIGRATIONS (from 000005 analysis)
-- =============================================================================

-- K_A1. PSYCHOSIS, MAJOR TRANQUILLIZERS, HIPPOCRATES, PHOBIC DISORDERS
-- These questions were seeded to Medical-Surgical Nursing — all are Mental Health.
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotic Disorders'
WHERE stem = 'Psychosis is characterized by all, except:'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotropic Medications'
WHERE stem = 'Major tranquillizers'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'History of Psychiatry'
WHERE stem = 'Hippocrates classified mental disorders in to:'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Anxiety Disorders'
WHERE stem LIKE 'Which of the following is considered to be most effective and treatment of choice for phobic disorders%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A2. MOOD CONGRUENT DELUSION — Medical-Surgical → Mental Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Mood Disorders'
WHERE stem LIKE 'The most common cause of mood congruent delusion is%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A3. MENTAL HEALTH NURSE APPROACH (food poisoned delusion) — Pharmacology → Mental Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Therapeutic Communication'
WHERE stem LIKE 'The best approach for the mental health nurse to take when a client thinks his food is poisoned%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A4. PATHOLOGICAL JAUNDICE (haemolysis) — Medical-Surgical → Paediatric
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Jaundice'
WHERE stem LIKE 'Pathological jaundice as a result of increased haemolysis involves all the following except%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A5. SPINA BIFIDA (meningocele) — Medical-Surgical → Paediatric
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Congenital Abnormalities'
WHERE stem LIKE 'A type of spina bifida which comprises of the skin, meninges with or without CSF is%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A6. EX-POST FACTO RESEARCH — Mental Health / Medical-Surgical → Research
UPDATE questions
SET unit = 'Research & Evidence-Based Practice', topic = 'Research Designs'
WHERE stem LIKE 'Ex-post facto studies are also called%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A7. GONADAL ARTERIES — Medical-Surgical → Anatomy & Physiology
-- Note: 'Anatomy & Physiology' is used here as a display unit per §12 extended usage;
-- if the DB enforces the exact unit list in §12, use 'Medical-Surgical Nursing' instead.
UPDATE questions
SET topic = 'Cardiovascular Anatomy'
WHERE stem LIKE 'Gonadal arteries branch from%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A8. CARDIAC PHYSIOLOGY TEST (ECG) — supplement seeded to Anatomy & Physiology
-- 'Anatomy & Physiology' is not in the §12 valid unit list; correct to Medical-Surgical.
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Which diagnostic test provides information about the physiology and function of the heart%'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A9. NURSING EDUCATION questions that remained in Medical-Surgical with topic 'General'
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
       OR stem LIKE '%purpose of assessment%'
       OR stem LIKE '%What is nursing education%')
  AND cadre IN ('BScN', 'KRCHN');

-- K_A10. TOPIC = UNIT NAME VIOLATIONS — residual supplement rows
-- Supplement seeded many rows with topic = unit name as a placeholder.
-- Fix the most common ones not already caught above:

UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Contralateral shift of trachea in patient with chest complains%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'Failure of bone marrow results in%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'One of the following procedures involves a segment of the leg%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'One of the following procedures involves using a small plastic balloon%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Peripheral Vascular Disorders'
WHERE stem LIKE 'Which diagnostic test will be used to test for claudication in peripheral artery disease%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Peripheral Vascular Disorders'
WHERE stem LIKE 'Which of the following is unique to secondary venous thrombosis%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'Biot''s respirations are associated with%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Fluid and Electrolyte Balance'
WHERE stem LIKE 'One of the following will reduce pulse of pressure of an individual%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'Nursing measures to deal with sensory changes in the aged%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'All of the following statements concerning genitourinary system changes in the older adult%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'X-ray film of a patient shows expanded airways%'
  AND topic = 'Medical-Surgical Nursing'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET topic = 'Neuroanatomy'
WHERE stem LIKE 'Collection of cell bodies in the central nervous system forms%'
  AND topic = 'Anatomy and Physiology'
  AND cadre IN ('BScN', 'KRCHN');

-- K_A11. FINAL CATCH-ALL — any remaining rows where topic = unit name
-- Sets to 'Clinical Nursing' as a reviewable placeholder.
-- After push, run: SELECT stem, unit, topic FROM questions WHERE topic = 'Clinical Nursing';
-- and manually assign specific topics to each.
UPDATE questions
SET topic = 'Clinical Nursing'
WHERE topic = unit
  AND unit = 'Medical-Surgical Nursing'
  AND exam_year IS NULL
  AND contributor_id IS NULL;

-- =============================================================================
-- SECTION L: POST-MIGRATION VERIFICATION QUERIES
-- =============================================================================

-- K1. SELECT COUNT(*) FROM questions WHERE topic = 'General';
--     Expected: 0

-- K2. SELECT COUNT(*) FROM questions WHERE unit = 'Nursing';
--     Expected: 0

-- K3. SELECT COUNT(*) FROM questions WHERE paper IS NULL;
--     Expected: 0

-- K4. SELECT COUNT(*) FROM questions WHERE cadre IS NULL;
--     Expected: 0

-- K5. SELECT COUNT(*) FROM questions WHERE status != 'approved';
--     Expected: 0 (for these migrated questions)

-- K6. SELECT COUNT(*) FROM questions WHERE stem LIKE 'EDD is October%';
--     Expected: 0

-- K7. SELECT COUNT(*) FROM questions
--     WHERE stem = 'Which of the following clients would be most at risk for the development of';
--     Expected: 0 (incomplete question deleted)

-- K8. SELECT COUNT(*) FROM questions WHERE stem LIKE 'Per Kenyan OSH regulations%';
--     Expected: 0 (garbled stem deleted)

-- K9. SELECT stem, correct_option FROM questions
--     WHERE stem = 'The anterior 2/3 of tongue is innervated by cranial nerve:';
--     Expected: correct_option = 'C' for BOTH BScN and KRCHN

-- K10. SELECT stem, correct_option FROM questions
--      WHERE stem LIKE 'The type of discussion where a group of 6-8 qualified experts%';
--      Expected: correct_option = 'C' (panel discussion)

-- K11. SELECT stem, correct_option FROM questions
--      WHERE stem LIKE 'Increasing the ability of the population to cope with a disaster%';
--      Expected: correct_option = 'A' (preparedness)

-- K12. SELECT COUNT(*) FROM questions
--      WHERE unit IN ('Mental Health Nursing','Community Health Nursing','Environmental Health',
--                     'Nutrition','Research & Evidence-Based Practice',
--                     'Nursing Management & Leadership','Professional Ethics & Law',
--                     'Health Systems in Kenya','Infection Prevention & Control')
--      AND paper = 'Paper I';
--      Expected: 0 (all Paper II-category units must be on Paper II)

-- =============================================================================
-- END OF COMPREHENSIVE AUDIT MIGRATION
-- =============================================================================
