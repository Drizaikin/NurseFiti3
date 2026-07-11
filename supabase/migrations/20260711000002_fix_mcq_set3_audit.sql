-- =============================================================================
-- CORRECTIVE MIGRATION: Set 3 MCQ Audit Fixes
-- Addresses all issues found in 20260711000001_seed_mcq_compilation_set3.sql
-- Per NCK Exam System standards (§14): answer verification, topic specificity,
-- unit corrections, removal of garbled questions.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 1: WRONG UNIT FIXES
-- Several questions were seeded with wrong units
-- ─────────────────────────────────────────────────────────────────────────────

-- Abdominal assessment is Medical-Surgical, NOT Mental Health Nursing
UPDATE questions SET unit = 'Medical-Surgical Nursing'
WHERE stem = 'The following is the correct order of abdominal assessment:'
  AND cadre = 'BScN';

-- IUD contraception is Family Planning, NOT Infection Prevention & Control
UPDATE questions SET unit = 'Midwifery', topic = 'Family Planning'
WHERE stem LIKE 'For which of the following clients would the nurse expect that an intrauterine device%'
  AND cadre = 'BScN';

-- Danger sign during puerperium: lochia with tissue is Midwifery, NOT Infection Prevention
UPDATE questions SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem = 'One of the following is a danger sign during pueperium:'
  AND cadre = 'BScN';

-- Newborn reflex (rooting) is Paediatric Nursing, NOT Medical-Surgical
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Newborn Assessment'
WHERE stem LIKE 'The reflex that is elicited when the corner of the baby%'
  AND cadre = 'BScN';

-- Phototherapy nursing diagnosis: is Paediatric Nursing, NOT Medical-Surgical
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Jaundice'
WHERE stem LIKE 'The following nursing diagnosis will be of priority for a neonate undergoing phototherapy%'
  AND cadre = 'BScN';

-- Ophtalmia neonatorum most common cause: Paediatric/Midwifery, NOT Medical-Surgical
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Infections'
WHERE stem = 'The most common cause of opthalmia neonatorum is:'
  AND cadre = 'BScN';

-- Sodium bicarbonate in asphyxia neonatorum: Paediatric, NOT Medical-Surgical
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Resuscitation'
WHERE stem = 'Sodium bicarbonate is indicated in babies with asphyxia neonatorum to:'
  AND cadre = 'BScN';

-- Meconium in newborn lungs: Paediatric Nursing, NOT Medical-Surgical (BScN)
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Respiratory Disorders'
WHERE stem LIKE 'Presence of Meconium in the newborn%s lungs%'
  AND cadre = 'BScN';

-- Meconium in newborn lungs: Paediatric Nursing, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Respiratory Disorders'
WHERE stem LIKE 'Presence of Meconium in the newborn%s lungs%'
  AND cadre = 'KRCHN';

-- Lochia serosa composition: Midwifery, NOT Medical-Surgical (BScN)
UPDATE questions SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem = 'Lochia serosa is composed of:'
  AND cadre = 'BScN';

-- Lochia serosa composition: Midwifery, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem = 'Lochia serosa is composed of:'
  AND cadre = 'KRCHN';

-- Meconium management first step: Paediatric Nursing, NOT Nursing Management & Leadership
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'Neonatal Resuscitation'
WHERE stem LIKE 'You are called to the delivery suite for a 39-week baby about to be born through thick meconium%'
  AND cadre = 'BScN';

-- AKI hyperkalemia management: Medical-Surgical Nursing, NOT Nursing Management & Leadership
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Renal Disorders'
WHERE stem LIKE 'Management of moderately elevated K+ in a patient with acute kidney injury%'
  AND cadre = 'KRCHN';

-- Tracheostomy tie change: Medical-Surgical Nursing, NOT Mental Health Nursing
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Respiratory Nursing'
WHERE stem LIKE 'The nurse is changing the ties of the client with a tracheotomy%'
  AND cadre = 'KRCHN';

-- Steroid nasal sprays: Medical-Surgical Nursing / Pharmacology, NOT Nursing Management & Leadership
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'ENT Nursing'
WHERE stem = 'Steroid nasal sprays are used in management of sinusitis to:'
  AND cadre = 'KRCHN';

-- Post chest-tube dislodgement: Medical-Surgical Nursing, NOT Nursing Management & Leadership
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Respiratory Nursing'
WHERE stem LIKE 'The client admitted 2 days earlier that a lung resection accidentally pulls out the chest tube%'
  AND cadre = 'BScN';

-- Common emotional health problems (adolescence): Mental Health Nursing, NOT Pharmacology
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Adolescent Mental Health'
WHERE stem LIKE 'Common emotional health problems among the youth include%'
  AND cadre = 'BScN';

-- Cluster sampling: Research & Statistics, NOT Medical-Surgical
UPDATE questions SET unit = 'Research & Evidence-Based Practice', topic = 'Sampling Methods'
WHERE stem LIKE 'In community diagnosis, the sampling technique where groups are randomly selected%'
  AND cadre = 'BScN';

-- Vitamin B deficiency: Nutrition, NOT Mental Health Nursing
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamin Deficiencies'
WHERE stem LIKE 'The following is not associated with Vitamin B group deficiencies%'
  AND cadre = 'BScN';

-- Anxiety disorder precipitating factor: Mental Health Nursing, NOT Paediatric Nursing
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Anxiety Disorders'
WHERE stem LIKE 'The following is a precipitating factor of anxiety disorders%'
  AND cadre = 'BScN';

-- Schizophrenia prognosis: Mental Health Nursing, NOT Medical-Surgical
-- (already in Mental Health Nursing — no fix needed for unit)

-- Intervention study design: Research, NOT Mental Health Nursing
UPDATE questions SET unit = 'Research & Evidence-Based Practice', topic = 'Research Designs'
WHERE stem LIKE 'The following is an intervention study design%'
  AND cadre = 'BScN';

-- Fat-soluble vitamins (Paper II): Nutrition, NOT Medical-Surgical/Mental Health
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamins and Minerals'
WHERE stem = 'Fat soluble vitamins include:-'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Nutrition', topic = 'Vitamins and Minerals'
WHERE stem = 'fat soluble vitamins includes'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Nutrition', topic = 'Vitamins and Minerals'
WHERE stem = 'fat soluble vitamins includes'
  AND cadre = 'KRCHN';

-- Nutrient requirements of children: Nutrition, NOT Paediatric Nursing
UPDATE questions SET unit = 'Nutrition', topic = 'Paediatric Nutrition'
WHERE stem LIKE 'The nutrient requirements of children are NOT influenced by%'
  AND cadre = 'BScN';

-- Performance appraisal motivation: Nursing Management, NOT Mental Health
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Human Resource Management'
WHERE stem LIKE 'The primary purpose of providing employees with feedback during a performance appraisal%'
  AND cadre = 'BScN';

-- Zinc deficiency: Nutrition, NOT Medical-Surgical
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamins and Minerals'
WHERE stem LIKE 'The following is caused by deficiency of zinc%'
  AND cadre = 'BScN';

-- NCK Act Cap 257: Professional Ethics, NOT Medical-Surgical
UPDATE questions SET unit = 'Professional Ethics & Law', topic = 'Nursing Legislation'
WHERE stem LIKE 'The Nursing council of Kenya (NCK) is established under the Nurses Act Cap%'
  AND cadre = 'BScN';

-- Psoriasis nursing diagnosis: Medical-Surgical Nursing, NOT Infection Prevention
UPDATE questions SET unit = 'Medical-Surgical Nursing', topic = 'Dermatological Nursing'
WHERE stem LIKE 'The nursing diagnosis that best describes a patient with psoriasis%'
  AND cadre = 'BScN';

-- HIV antibody testing age in children: Paediatric Nursing, NOT Midwifery
UPDATE questions SET unit = 'Paediatric Nursing', topic = 'HIV in Children'
WHERE stem LIKE 'The right time for diagnosing HIV infection using antibody tests among children%'
  AND cadre = 'BScN';

-- Max Weber management theory: Nursing Management, NOT Midwifery (BScN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Management Theories'
WHERE stem LIKE 'Max Weber is known for the development of which management theory%'
  AND cadre = 'BScN';

-- Max Weber management theory: Nursing Management, NOT Midwifery (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Management Theories'
WHERE stem LIKE 'Max Weber is known for the development of which management theory%'
  AND cadre = 'KRCHN';

-- Vitamin A deficiency (Paper II): Nutrition, NOT Paediatric Nursing
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamin Deficiencies'
WHERE stem LIKE 'Bitot%s spot%'
  AND cadre = 'BScN';

-- Vitamin A not related to (rickets): Nutrition, NOT Medical-Surgical
UPDATE questions SET unit = 'Nutrition', topic = 'Vitamin Deficiencies'
WHERE stem LIKE 'Vitamin A is not related to%'
  AND cadre = 'BScN';

-- Water-washed diseases: Environmental Health, NOT Mental Health
UPDATE questions SET unit = 'Environmental Health', topic = 'Water and Sanitation'
WHERE stem = 'Water-washed diseases include:-'
  AND cadre = 'BScN';

-- Water-washed diseases (KRCHN)
UPDATE questions SET unit = 'Environmental Health', topic = 'Water and Sanitation'
WHERE stem = 'Water-washed diseases include:-'
  AND cadre = 'KRCHN';

-- Onchocerciasis clinical features: Community Health / Communicable Disease, NOT Medical-Surgical
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Communicable Diseases'
WHERE stem LIKE 'The clinical features of onchocerciasis include%'
  AND cadre = 'BScN';

-- Onchocerciasis vector (KRCHN): Community Health, NOT Medical-Surgical
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Communicable Diseases'
WHERE stem LIKE 'Onchocerciasis is a vector borne disease which is transmitted by%'
  AND cadre = 'BScN';

-- Xylitol cariogenic: Nutrition / Dental Health, NOT Medical-Surgical
UPDATE questions SET unit = 'Nutrition', topic = 'Oral Health'
WHERE stem LIKE 'Which of the sugar is least cariogenic%'
  AND cadre = 'BScN';

-- Prebiotics: Nutrition, NOT Medical-Surgical
UPDATE questions SET unit = 'Nutrition', topic = 'Dietary Fibre and Gut Health'
WHERE stem LIKE 'Non-digestible food ingredients that stimulate the growth%'
  AND cadre = 'BScN';

-- PHC elements (occupational health): Community Health, NOT Pharmacology (BScN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Primary Health Care'
WHERE stem LIKE 'Which of the following is not included in the eight elements of PHC%'
  AND cadre = 'BScN';

-- PHC elements (specialized services): Community Health, NOT Pharmacology (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Primary Health Care'
WHERE stem LIKE 'Which one of the following is not included in the Elements of Primary Health Care%'
  AND cadre = 'KRCHN';

-- DPT contraindication: Community Health / Immunization, NOT Pharmacology
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Immunization'
WHERE stem LIKE 'You will not give DPT 2 if the mother says%'
  AND cadre = 'BScN';

-- Mosquito vector filariasis: Community Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Communicable Diseases'
WHERE stem LIKE 'Mosquitoes is/are the vector in the following disorder%'
  AND cadre = 'KRCHN';

-- Permanent water hardness: Environmental Health, NOT Mental Health
UPDATE questions SET unit = 'Environmental Health', topic = 'Water Treatment'
WHERE stem LIKE 'Which of the following methods is used to remove permanent water hardness%'
  AND cadre = 'KRCHN';

-- Noise decibels: Environmental Health / Occupational Health, NOT Mental Health
UPDATE questions SET unit = 'Environmental Health', topic = 'Occupational Health'
WHERE stem LIKE 'With regard to noise pollution, to what level of decibels%'
  AND cadre = 'KRCHN';

-- Wholesome water: Environmental Health, NOT Community Health (already Community area but keep consistent)
UPDATE questions SET unit = 'Environmental Health', topic = 'Water and Sanitation'
WHERE stem LIKE 'Wholesome water is one which is%'
  AND cadre = 'KRCHN';

-- Occupational IT hazard (carpal tunnel): Occupational Health, NOT Pharmacology
UPDATE questions SET unit = 'Environmental Health', topic = 'Occupational Health'
WHERE stem LIKE 'the occupational disease that persons working in information technology%'
  AND cadre = 'BScN';

-- Physical hazards: Occupational Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Environmental Health', topic = 'Occupational Health'
WHERE stem LIKE 'Which of the following are examples of physical hazards%'
  AND cadre = 'KRCHN';

-- Yaws causative organism: Medical-Surgical / Communicable Disease, NOT Medical-Surgical (unit ok, fix topic)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Communicable Diseases'
WHERE stem LIKE 'causative organisms for yaws is%'
  AND cadre = 'BScN';

-- Black water fever: Communicable Diseases, NOT Infection Prevention (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Malaria'
WHERE stem LIKE 'Black water fever is a special manifestation of malaria%'
  AND cadre = 'KRCHN';

-- Aversion therapy: Mental Health Nursing, NOT Medical-Surgical
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Behaviour Therapy'
WHERE stem LIKE 'In aversion therapy%'
  AND cadre = 'BScN';

-- Learning process transfer statement: Nursing Education, NOT Mental Health (BScN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The following statement regarding the learning process is true%'
  AND cadre = 'BScN';

-- Instructional method factor (teacher skill): Nursing Education, NOT Medical-Surgical (BScN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The following is a factor to consider when selecting an instructional method%'
  AND cadre = 'BScN';

-- Affective domain level (characterizing): Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The following is a level of affective domain in learning%'
  AND cadre = 'BScN';

-- Cognitive theories (assimilation): Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Cognitive theories of learning include%'
  AND cadre = 'BScN';

-- Orem's theory: Nursing Theory, NOT Mental Health
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Theories'
WHERE stem LIKE 'Which of the following is included in Orem%s theory%'
  AND cadre = 'BScN';

-- Nursing process definition: Nursing Fundamentals, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Process'
WHERE stem LIKE 'It is best to describe as a systematic, rational method of planning%'
  AND cadre = 'BScN';

-- Role modeling / affective domain: Nursing Education, NOT Medical-Surgical (BScN Paper II)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The objectives  that can be best achieved through role modeling are in%'
  AND cadre = 'BScN';

-- Correct sequence using teaching aids: Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The correct sequence of using  teaching aids is%'
  AND cadre = 'BScN';

-- Practical teaching method advantages: Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The following is NOT an advantage of practical as a teaching method%'
  AND cadre = 'BScN';

-- Curriculum development: Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The process of curriculum development involves%'
  AND cadre = 'BScN';

-- Evaluation types (summative): Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The following type of evaluation is used for the purpose of documenting outcomes%'
  AND cadre = 'BScN';

-- Instructional method selection: Nursing Education, NOT Medical-Surgical (BScN Paper II)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Factors to consider when selecting an instructional method do NOT include%'
  AND cadre = 'BScN';

-- Stimulus variation (teaching): Nursing Education, NOT Medical-Surgical
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'While teaching a group of patients a nurse used the term%'
  AND cadre = 'BScN';

-- True experiment vs quasi-experiment: Research, NOT Medical-Surgical
UPDATE questions SET unit = 'Research & Evidence-Based Practice', topic = 'Research Designs'
WHERE stem LIKE 'The following characteristics differentiate  a true experiment  from a quasi-experiment%'
  AND cadre = 'BScN';

-- Tabula rasa: Mental Health / Behavioural Science, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Psychological Theories'
WHERE stem LIKE 'The term "tabula rasa" highlights%'
  AND cadre = 'KRCHN';

-- Defence mechanisms: Mental Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Mental Health Nursing', topic = 'Defence Mechanisms'
WHERE stem LIKE 'Which of the following is not a defence mechanism%'
  AND cadre = 'KRCHN';

-- Surveillance definition (KRCHN): Community Health, NOT Medical-Surgical
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Epidemiology'
WHERE stem LIKE 'The continuous scrutiny of the factors determining the occurrence%'
  AND cadre = 'KRCHN';

-- Sentinel surveillance (BScN & KRCHN): Community Health, NOT Medical-Surgical
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Epidemiology'
WHERE stem = 'Sentinel surveillance is'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Community Health Nursing', topic = 'Epidemiology'
WHERE stem = 'Sentinel surveillance is'
  AND cadre = 'KRCHN';

-- PHC accessibility except: Community Health, NOT Medical-Surgical (BScN & KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Primary Health Care'
WHERE stem LIKE 'In the principles of primary health care, accessibility considers%'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Community Health Nursing', topic = 'Primary Health Care'
WHERE stem LIKE 'In the principles of primary health care, accessibility considers%'
  AND cadre = 'KRCHN';

-- Home visit factors: Community Health, NOT Medical-Surgical (BScN & KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Home Visiting'
WHERE stem LIKE 'Factors that may affect the effectiveness of a home visit%'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Community Health Nursing', topic = 'Home Visiting'
WHERE stem LIKE 'Factors that may affect the effectiveness of a home visit%'
  AND cadre = 'KRCHN';

-- Cultural brokering: Community Health / Transcultural Nursing, NOT Medical-Surgical (BScN & KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Transcultural Nursing'
WHERE stem LIKE 'The following concepts would enable the nurse to provide holistic care for culturally diverse clients%'
  AND cadre = 'BScN';

UPDATE questions SET unit = 'Community Health Nursing', topic = 'Transcultural Nursing'
WHERE stem LIKE 'The following concepts would enable the nurse to provide holistic care for culturally diverse clients%'
  AND cadre = 'KRCHN';

-- Quantitative community info (CDC MMWR): Research/Community Health, NOT Community Health (already ok, fix topic only)
UPDATE questions SET topic = 'Community Assessment'
WHERE stem LIKE 'Which of the following would provide quantitative information about the community%'
  AND cadre = 'BScN';

-- SDG 1 poverty: Community Health / Global Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Global Health Goals'
WHERE stem LIKE 'Sustainable development 1 is about poverty%'
  AND cadre = 'KRCHN';

-- Humoral immunity IgA/IgD/IgM: Medical-Surgical / Microbiology, NOT Medical-Surgical (keep unit, fix topic)
UPDATE questions SET topic = 'Immunology'
WHERE stem LIKE 'The form of immunity provided by B cells through immunoglobulin%'
  AND cadre = 'KRCHN';

-- Health belief model: Community Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Health Behaviour Models'
WHERE stem LIKE 'The health-belief model is composed of one of the following factors%'
  AND cadre = 'KRCHN';

-- Teaching breast self-examination (secondary prevention): Community Health, NOT Medical-Surgical
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Levels of Prevention'
WHERE stem LIKE 'Teaching breast self-examination falls under which level of disease prevention%'
  AND cadre = 'KRCHN';

-- John Dewey pragmatism: Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'When considering philosophy of education, John Dewey was a proponent of%'
  AND cadre = 'KRCHN';

-- Cognitive Bloom's domain EXCEPT criticism: Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Cognitive domain in Bloom%s Taxonomy includes all the following, except%'
  AND cadre = 'KRCHN';

-- PBL characteristics: Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Characteristics of Problem Based Learning include all, EXCEPT%'
  AND cadre = 'KRCHN';

-- One-way communication (lectures): Nursing Education / Communication, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Which of the following is not a 2-way communication%'
  AND cadre = 'KRCHN';

-- Health education definition: Community Health, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Health Education'
WHERE stem LIKE 'The process of developing and providing planned experiences to supply information%'
  AND cadre = 'KRCHN';

-- Lesson plan not true statement: Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Which is not true about lesson plan%'
  AND cadre = 'KRCHN';

-- Lesson plan types (basis of objectives): Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Which one is not the type of lesson plans on the basis of objectives%'
  AND cadre = 'KRCHN';

-- Students passive in lecture: Nursing Education, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Students are passive in%'
  AND cadre = 'KRCHN';

-- Nuclear family definition: Community Health / Sociology, NOT Paediatric Nursing (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'Family Health'
WHERE stem LIKE 'The ''nuclear family'' means%'
  AND cadre = 'KRCHN';

-- School health services function: Community Health, NOT Paediatric Nursing (KRCHN)
UPDATE questions SET unit = 'Community Health Nursing', topic = 'School Health'
WHERE stem LIKE 'Which of the following is not a specific function of the school health services%'
  AND cadre = 'KRCHN';

-- Documentation/medical records: Professional Ethics, NOT Medical-Surgical (KRCHN)
UPDATE questions SET unit = 'Professional Ethics & Law', topic = 'Documentation Standards'
WHERE stem LIKE 'Which of the following are not necessary for a proper medical record%'
  AND cadre = 'KRCHN';

-- Community health action definition: Community Health, already correct unit — fix topic only
UPDATE questions SET topic = 'Community Health Process'
WHERE stem LIKE 'Community health action is defined as the process of%'
  AND cadre IN ('BScN', 'KRCHN');

-- Community-oriented roles: Community Health, already ok — fix topic
UPDATE questions SET topic = 'Community Health Nursing Roles'
WHERE stem LIKE 'Community oriented roles of a community health nurse include%'
  AND cadre IN ('BScN', 'KRCHN');

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 2: WRONG CORRECT_OPTION FIXES
-- ─────────────────────────────────────────────────────────────────────────────

-- HAEMOPHILIA A — critical error
-- Haemophilia A is caused by factor VIII deficiency.
-- Factor VIII is NOT among the options (VII, IX, III, V).
-- The rationale itself flags this as '⚠ Best answer not clearly among choices'
-- and incorrectly selects B (factor IX = Haemophilia B).
-- Since factor VIII is absent from the options, this question CANNOT have a
-- defensible correct answer and must be removed per §14.1 audit standards.
-- It is deleted from the live database.
DELETE FROM questions
WHERE stem = 'Haemophilia A results from deficiency of factor:'
  AND cadre = 'KRCHN';

-- TONGUE INNERVATION
-- Stem asks "anterior 2/3 of tongue is innervated by cranial nerve"
-- General sensation = CN V (trigeminal/lingual nerve = option C which maps to '5')
-- Taste = CN VII (chorda tympani).
-- The question does NOT specify "taste" — the general answer for innervation
-- of anterior 2/3 tongue is CN V (general sensation).
-- Current answer is D (7 = facial, for taste only). Without qualifier this is ambiguous.
-- Per NCK/anatomy standard: general innervation (sensation) = CN V.
-- Fix: correct_option = C (5 = trigeminal), update rationale.
UPDATE questions
SET correct_option = 'C',
    rationale = 'General sensation of the anterior two-thirds of the tongue is carried by the lingual nerve, a branch of the trigeminal (CN V, mandibular division). Taste from the anterior two-thirds is via the chorda tympani of the facial nerve (CN VII). Since the question asks generically about ''innervation'' without specifying taste, the trigeminal (CN V = option C: ''5'') is the primary correct answer for general sensory innervation. (Standard neuroanatomy; Brunner & Suddarth''s.)'
WHERE stem = 'The anterior 2/3 of tongue is innervated by cranial nerve:'
  AND cadre = 'KRCHN';

-- DRUG DOSAGE REDUCTION IN ELDERLY
-- Option C says "Drug biotransformation takes longer in an older person" — this is
-- also clinically true and is THE mechanistic reason.
-- Option D "high likelihood of toxic effects" is the consequence, not the primary reason.
-- Per NCK pharmacology (§14.3): the primary reason doses are reduced is slower
-- biotransformation/clearance. Fix correct_option from D to C.
UPDATE questions
SET correct_option = 'C',
    rationale = 'Drug dosages must be reduced in elderly patients primarily because hepatic and renal clearance decline with age, making biotransformation slower. This directly leads to drug accumulation and the risk of toxic effects. Option C (slower biotransformation) is the mechanistic primary reason; Option D is a consequence of it. Per Brunner & Suddarth''s Medical-Surgical Nursing; Kenya EML pharmacology principles.'
WHERE stem = 'Drug dosages must be reduced in the elderly because:'
  AND cadre = 'BScN';

-- RANITIDINE ADMINISTRATION TIMING
-- Standard H2-antagonist dosing: ranitidine is typically given before meals OR
-- as a once-daily evening/bedtime dose. The original answer A (30 min before meals)
-- is acceptable for symptom-driven dosing.
-- However, for erosive gastritis the evidence-based approach is actually
-- 30 minutes BEFORE meals to preemptively block acid. Answer A is correct — no change.

-- CORTISONE TIMING (8 AM) — answer A is correct. No change.

-- BREAST FEEDING / DIAPHRAGM RESIZED AFTER SURGERY
-- The option D says "if she has any surgery" — this is too broad.
-- Per Kenya FP guidelines the refitting is needed after pelvic/abdominal surgery,
-- significant weight change (≥10 lbs), or childbirth.
-- Current answer D is the best available answer. No change to correct_option.
-- However the unit is wrong (Paediatric Nursing). Fix unit to Midwifery.
UPDATE questions
SET unit = 'Midwifery', topic = 'Family Planning'
WHERE stem LIKE 'The client using a diaphragm should be instructed to%'
  AND cadre = 'BScN';

-- SEROTONIN — sleep, mood and appetite
-- Current answer C is correct. Unit is Medical-Surgical but this belongs
-- to Anatomy & Physiology or Mental Health. Fix unit.
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Neurotransmitters'
WHERE stem LIKE 'Which of the following neurotransmitters is known to be associated with sleep, mood and appetite%'
  AND cadre = 'BScN';

-- AUTOSOMAL RECESSIVE INHERITANCE
-- Current answer A "An affected newborn has unaffected parents" — correct.
-- Option C "Affected parents have a one in four chance..." is WRONG framing:
-- it should be CARRIER parents (who are unaffected). No change to correct_option.

-- PREECLAMPSIA MAGNESIUM SULFATE — expected side effect
-- Current answer B (hypersomnolence/drowsiness) is correct for expected/therapeutic effects.
-- Loss of patellar reflex, oliguria, respiratory depression = toxicity signs.
-- No change needed to correct_option.

-- EPIDURAL HYPOTENSION MANAGEMENT
-- Answer D (increase IV infusion rate) is correct per Myles/MOH guidelines.
-- No change needed.

-- PARTOGRAPH — good progress
-- Answer A "cervical dilatation plotted progressively on alert line within 7 hours"
-- is correct per WHO/MOH partograph guidance.
-- No change needed.

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3: MASS TOPIC FIXES — replace ALL 'General' topics with specific ones
-- Uses stem pattern matching for each clinical area
-- ─────────────────────────────────────────────────────────────────────────────

-- GI / Barium swallow
UPDATE questions SET topic = 'Upper GI Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%barium swallow%' OR stem LIKE '%Barium swallow%' OR stem LIKE '%barium%');

-- Oesophageal varices
UPDATE questions SET topic = 'Upper GI Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND stem LIKE '%esophageal varices%' OR (topic = 'General' AND stem LIKE '%Esophageal varices%');

-- Abdominal assessment, GI assessment
UPDATE questions SET topic = 'GI Assessment'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND stem LIKE '%abdominal assessment%';

-- Celiac, IBD, GI disorders
UPDATE questions SET topic = 'GI Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%celiac%' OR stem LIKE '%Celiac%' OR stem LIKE '%gluten%'
       OR stem LIKE '%irritable bowel%' OR stem LIKE '%diverticulum%'
       OR stem LIKE '%esophageal%' OR stem LIKE '%gastritis%'
       OR stem LIKE '%omeprazole%' OR stem LIKE '%peptic ulcer%'
       OR stem LIKE '%ranitidine%' OR stem LIKE '%Zantac%');

-- Appendicitis / surgical priority
UPDATE questions SET topic = 'Surgical Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%appendicitis%' OR stem LIKE '%appendix%');

-- Gerontological nursing
UPDATE questions SET topic = 'Gerontological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%aging%' OR stem LIKE '%aged%' OR stem LIKE '%elderly%'
       OR stem LIKE '%gerontolog%' OR stem LIKE '%geriatric%'
       OR stem LIKE '%sarcopenia%' OR stem LIKE '%osteopenia%');

-- Endocrine: Pituitary
UPDATE questions SET topic = 'Pituitary Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%anterior pituitary%' OR stem LIKE '%posterior pituitary%'
       OR stem LIKE '%hypothalamus%' OR stem LIKE '%ADH%'
       OR stem LIKE '%diabetes insipidus%' OR stem LIKE '%vasopressin%');

-- Endocrine: Thyroid
UPDATE questions SET topic = 'Thyroid Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%hypothyroid%' OR stem LIKE '%hyperthyroid%'
       OR stem LIKE '%thyroid%' OR stem LIKE '%goiter%'
       OR stem LIKE '%Synthroid%' OR stem LIKE '%levothyroxine%'
       OR stem LIKE '%propylthiouracil%' OR stem LIKE '%thyroid storm%'
       OR stem LIKE '%thyroid crisis%');

-- Endocrine: Parathyroid
UPDATE questions SET topic = 'Parathyroid Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%hyperparathyroid%' OR stem LIKE '%hypoparathyroid%'
       OR stem LIKE '%Sulkowitch%' OR stem LIKE '%parathyroid%');

-- Endocrine: Adrenal
UPDATE questions SET topic = 'Adrenal Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%pheochromocytoma%' OR stem LIKE '%Addison%'
       OR stem LIKE '%Cushing%' OR stem LIKE '%aldosteronism%'
       OR stem LIKE '%corticosteroid%' OR stem LIKE '%adrenal%');

-- Endocrine: Diabetes
UPDATE questions SET topic = 'Diabetes Mellitus'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%insulin%' OR stem LIKE '%diabetes mellitus%'
       OR stem LIKE '%NPH%' OR stem LIKE '%hyperglycemi%'
       OR stem LIKE '%hypoglycemi%');

-- Neurological: Spinal cord
UPDATE questions SET topic = 'Spinal Cord Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%spinal cord%' OR stem LIKE '%spinal shock%'
       OR stem LIKE '%paraplegia%' OR stem LIKE '%quadriplegia%');

-- Neurological: Increased ICP
UPDATE questions SET topic = 'Neurological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%intracranial pressure%' OR stem LIKE '%ICP%'
       OR stem LIKE '%mannitol%' OR stem LIKE '%craniotomy%'
       OR stem LIKE '%meningitis%');

-- Neurological: Stroke / CVA
UPDATE questions SET topic = 'Cerebrovascular Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%cerebrovascular%' OR stem LIKE '%stroke%'
       OR stem LIKE '%CVA%' OR stem LIKE '%hemianopsia%'
       OR stem LIKE '%aphasia%' OR stem LIKE '%homonymous%');

-- Neurological: CNS anatomy
UPDATE questions SET topic = 'Neurological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%neuron%' OR stem LIKE '%cerebellum%'
       OR stem LIKE '%brain stem%' OR stem LIKE '%occipital lobe%'
       OR stem LIKE '%hypothalamus%' OR stem LIKE '%Broca%'
       OR stem LIKE '%Wernicke%' OR stem LIKE '%demyelination%'
       OR stem LIKE '%ataxia%' OR stem LIKE '%basal ganglia%'
       OR stem LIKE '%corpus callosum%' OR stem LIKE '%substantia nigra%');

-- Neurological: Parkinson's
UPDATE questions SET topic = 'Neurological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%Parkinson%' OR stem LIKE '%levodopa%'
       OR stem LIKE '%carbidopa%');

-- Neurological: MS, GBS, MG
UPDATE questions SET topic = 'Neurological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%multiple sclerosis%' OR stem LIKE '%Guillain%'
       OR stem LIKE '%myasthenia%');

-- Cardiovascular
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%cardiac%' OR stem LIKE '%heart%' OR stem LIKE '%pacemaker%'
       OR stem LIKE '%angina%' OR stem LIKE '%ECG%' OR stem LIKE '%myocardial%'
       OR stem LIKE '%hypertension%' OR stem LIKE '%varicell%'
       OR stem LIKE '%thrombophlebitis%' OR stem LIKE '%ventricular%'
       OR stem LIKE '%atrial%');

-- Respiratory
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%respiratory%' OR stem LIKE '%asthma%'
       OR stem LIKE '%chest tube%' OR stem LIKE '%tracheostomy%'
       OR stem LIKE '%tracheotomy%' OR stem LIKE '%lung%'
       OR stem LIKE '%pulmonary%' OR stem LIKE '%COPD%'
       OR stem LIKE '%emphysema%' OR stem LIKE '%sinusitis%'
       OR stem LIKE '%empyema%' OR stem LIKE '%pleural%');

-- Renal
UPDATE questions SET topic = 'Renal Disorders'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%renal%' OR stem LIKE '%kidney%' OR stem LIKE '%GFR%'
       OR stem LIKE '%oliguria%' OR stem LIKE '%urolithiasis%'
       OR stem LIKE '%nephrotic%' OR stem LIKE '%urinary%'
       OR stem LIKE '%enuresis%' OR stem LIKE '%UTI%' OR stem LIKE '%urinary tract%');

-- Musculoskeletal
UPDATE questions SET topic = 'Musculoskeletal Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%fracture%' OR stem LIKE '%cast%' OR stem LIKE '%traction%'
       OR stem LIKE '%rheumatoid%' OR stem LIKE '%osteogenesis%'
       OR stem LIKE '%orthopaedic%' OR stem LIKE '%orthopedic%'
       OR stem LIKE '%Bryant%' OR stem LIKE '%bone%' OR stem LIKE '%joint%');

-- Oncology / Haematology
UPDATE questions SET topic = 'Oncology and Haematology'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%leukemia%' OR stem LIKE '%anemia%' OR stem LIKE '%anaemia%'
       OR stem LIKE '%thrombocytopenia%' OR stem LIKE '%sickle cell%'
       OR stem LIKE '%neutropenia%' OR stem LIKE '%vitamin B12%'
       OR stem LIKE '%iron-deficiency%' OR stem LIKE '%platelet%'
       OR stem LIKE '%purpura%');

-- Ophthalmic
UPDATE questions SET topic = 'Ophthalmic Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%cataract%' OR stem LIKE '%color blindness%'
       OR stem LIKE '%glaucoma%' OR stem LIKE '%vision%'
       OR stem LIKE '%eye%' OR stem LIKE '%ophthal%');

-- Dermatology
UPDATE questions SET topic = 'Dermatological Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%frostbite%' OR stem LIKE '%skin%' OR stem LIKE '%burn%');

-- Fluid, electrolytes, acid-base
UPDATE questions SET topic = 'Fluid and Electrolyte Balance'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%fluid%' OR stem LIKE '%electrolyte%'
       OR stem LIKE '%acid-base%' OR stem LIKE '%acidosis%'
       OR stem LIKE '%alkalosis%' OR stem LIKE '%pH%'
       OR stem LIKE '%ABG%' OR stem LIKE '%CO2%' OR stem LIKE '%bicarbonate%');

-- Surgical nursing
UPDATE questions SET topic = 'Surgical Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%post-op%' OR stem LIKE '%postop%'
       OR stem LIKE '%pre-op%' OR stem LIKE '%preop%'
       OR stem LIKE '%anaesthesia%' OR stem LIKE '%anesthesia%'
       OR stem LIKE '%hypothermia%' OR stem LIKE '%hyperthermia%'
       OR stem LIKE '%thyroidectomy%' OR stem LIKE '%mastectomy%'
       OR stem LIKE '%central venous%');

-- Infection control / isolation
UPDATE questions SET topic = 'Infection Prevention'
WHERE topic = 'General' AND unit = 'Infection Prevention & Control';

-- Immunology / transplant
UPDATE questions SET topic = 'Immunology'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%immune%' OR stem LIKE '%transplant%'
       OR stem LIKE '%immunosuppressant%' OR stem LIKE '%rejection%');

-- Pharmacology (any remaining General)
UPDATE questions SET topic = 'Drug Therapy'
WHERE topic = 'General' AND unit = 'Pharmacology';

-- Anatomy & Physiology catch-all for Medical-Surgical General remaining
UPDATE questions SET topic = 'Anatomy and Physiology'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing'
  AND (stem LIKE '%anatomy%' OR stem LIKE '%physiology%'
       OR stem LIKE '%endocrine%' OR stem LIKE '%hormone%'
       OR stem LIKE '%exocrine%' OR stem LIKE '%gland%'
       OR stem LIKE '%nerve%' OR stem LIKE '%artery%'
       OR stem LIKE '%vein%' OR stem LIKE '%muscle%');

-- Midwifery topics
UPDATE questions SET topic = 'Obstetric Emergencies'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND (stem LIKE '%shoulder dystocia%' OR stem LIKE '%placenta previa%'
       OR stem LIKE '%placenta praevia%' OR stem LIKE '%abruption%'
       OR stem LIKE '%eclampsia%' OR stem LIKE '%pre-eclampsia%'
       OR stem LIKE '%preeclampsia%' OR stem LIKE '%HELLP%'
       OR stem LIKE '%cord prolapse%' OR stem LIKE '%PPH%'
       OR stem LIKE '%haemorrhage%' OR stem LIKE '%hemorrhage%');

UPDATE questions SET topic = 'Labour and Delivery'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND (stem LIKE '%labour%' OR stem LIKE '%labor%'
       OR stem LIKE '%contraction%' OR stem LIKE '%partograph%'
       OR stem LIKE '%Leopold%' OR stem LIKE '%presentation%'
       OR stem LIKE '%mechanism of labor%' OR stem LIKE '%mechanism of labour%'
       OR stem LIKE '%dilation%' OR stem LIKE '%dilatation%'
       OR stem LIKE '%second stage%' OR stem LIKE '%first stage%'
       OR stem LIKE '%transitional phase%' OR stem LIKE '%vacuum%'
       OR stem LIKE '%episiotomy%' OR stem LIKE '%vertex%');

UPDATE questions SET topic = 'Antenatal Care'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND (stem LIKE '%antenatal%' OR stem LIKE '%prenatal%'
       OR stem LIKE '%pregnancy%' OR stem LIKE '%gestation%'
       OR stem LIKE '%EDD%' OR stem LIKE '%Naegel%' OR stem LIKE '%quickening%'
       OR stem LIKE '%sulphadoxine%' OR stem LIKE '%sulfadoxine%'
       OR stem LIKE '%pica%' OR stem LIKE '%nausea%' OR stem LIKE '%morning sick%'
       OR stem LIKE '%folic acid%' OR stem LIKE '%folate%'
       OR stem LIKE '%GFR%in pregnancy%' OR stem LIKE '%cardiac decompensation%');

UPDATE questions SET topic = 'Postnatal Care'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND (stem LIKE '%postpartum%' OR stem LIKE '%post-partum%'
       OR stem LIKE '%puerperium%' OR stem LIKE '%lochia%'
       OR stem LIKE '%breastfeed%' OR stem LIKE '%lactation%'
       OR stem LIKE '%engorgement%' OR stem LIKE '%fundus%');

UPDATE questions SET topic = 'Obstetric Anatomy'
WHERE topic = 'General' AND unit = 'Midwifery'
  AND (stem LIKE '%pelvis%' OR stem LIKE '%pelvic%'
       OR stem LIKE '%fetal skull%' OR stem LIKE '%suture%'
       OR stem LIKE '%fontanelle%' OR stem LIKE '%diameter%'
       OR stem LIKE '%vault%' OR stem LIKE '%trophoblast%');

-- Catch-all for any remaining Midwifery General
UPDATE questions SET topic = 'Midwifery Care'
WHERE topic = 'General' AND unit = 'Midwifery';

-- Paediatric topics
UPDATE questions SET topic = 'Neonatal Care'
WHERE topic = 'General' AND unit = 'Paediatric Nursing'
  AND (stem LIKE '%newborn%' OR stem LIKE '%neonate%' OR stem LIKE '%neonatal%'
       OR stem LIKE '%APGAR%' OR stem LIKE '%cord%' OR stem LIKE '%vernix%'
       OR stem LIKE '%fontanelle%' OR stem LIKE '%reflex%'
       OR stem LIKE '%jaundice%' OR stem LIKE '%phototherapy%'
       OR stem LIKE '%preterm%' OR stem LIKE '%prematur%'
       OR stem LIKE '%postmatur%' OR stem LIKE '%postdate%');

UPDATE questions SET topic = 'Child Growth and Development'
WHERE topic = 'General' AND unit = 'Paediatric Nursing'
  AND (stem LIKE '%milestone%' OR stem LIKE '%develop%'
       OR stem LIKE '%growth%' OR stem LIKE '%infant%');

UPDATE questions SET topic = 'Paediatric Infections'
WHERE topic = 'General' AND unit = 'Paediatric Nursing'
  AND (stem LIKE '%varicella%' OR stem LIKE '%IMNCI%'
       OR stem LIKE '%measles%' OR stem LIKE '%infection%');

-- Catch-all for remaining Paediatric General
UPDATE questions SET topic = 'Paediatric Nursing'
WHERE topic = 'General' AND unit = 'Paediatric Nursing';

-- Mental Health topics
UPDATE questions SET topic = 'Psychotic Disorders'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND (stem LIKE '%schizophrenia%' OR stem LIKE '%psychosis%'
       OR stem LIKE '%delusion%' OR stem LIKE '%hallucination%');

UPDATE questions SET topic = 'Substance Use Disorders'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND (stem LIKE '%alcohol%' OR stem LIKE '%detox%'
       OR stem LIKE '%drug abuse%' OR stem LIKE '%delirium tremens%');

UPDATE questions SET topic = 'Neurocognitive Disorders'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND (stem LIKE '%dementia%' OR stem LIKE '%Alzheimer%');

UPDATE questions SET topic = 'Eating Disorders'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND (stem LIKE '%anorexia%' OR stem LIKE '%bulimia%');

UPDATE questions SET topic = 'Somatoform and Anxiety Disorders'
WHERE topic = 'General' AND unit = 'Mental Health Nursing'
  AND (stem LIKE '%somatoform%' OR stem LIKE '%malingering%'
       OR stem LIKE '%OCD%' OR stem LIKE '%anxiety%');

-- Catch-all for remaining Mental Health General
UPDATE questions SET topic = 'Mental Health Nursing'
WHERE topic = 'General' AND unit = 'Mental Health Nursing';

-- Research topics
UPDATE questions SET topic = 'Research Ethics'
WHERE topic = 'General' AND unit = 'Research & Evidence-Based Practice'
  AND (stem LIKE '%consent%' OR stem LIKE '%ethics%'
       OR stem LIKE '%disclosure%' OR stem LIKE '%dignity%');

UPDATE questions SET topic = 'Biostatistics'
WHERE topic = 'General' AND unit = 'Research & Evidence-Based Practice'
  AND (stem LIKE '%median%' OR stem LIKE '%mean%' OR stem LIKE '%mode%'
       OR stem LIKE '%statistics%' OR stem LIKE '%abstract%');

UPDATE questions SET topic = 'Evidence-Based Practice'
WHERE topic = 'General' AND unit = 'Research & Evidence-Based Practice'
  AND (stem LIKE '%evidence%' OR stem LIKE '%hierarchy%'
       OR stem LIKE '%meta-analysis%' OR stem LIKE '%RCT%');

-- Catch-all for remaining Research General
UPDATE questions SET topic = 'Research Methodology'
WHERE topic = 'General' AND unit = 'Research & Evidence-Based Practice';

-- Nursing Management catch-all
UPDATE questions SET topic = 'Nursing Management'
WHERE topic = 'General' AND unit = 'Nursing Management & Leadership';

-- Community Health catch-all for any remaining General
UPDATE questions SET topic = 'Community Health'
WHERE topic = 'General' AND unit = 'Community Health Nursing';

-- Environmental Health catch-all
UPDATE questions SET topic = 'Environmental Health'
WHERE topic = 'General' AND unit = 'Environmental Health';

-- Professional Ethics catch-all
UPDATE questions SET topic = 'Professional Practice'
WHERE topic = 'General' AND unit = 'Professional Ethics & Law';

-- Nutrition catch-all
UPDATE questions SET topic = 'Nutrition'
WHERE topic = 'General' AND unit = 'Nutrition';

-- Any remaining Medical-Surgical General
UPDATE questions SET topic = 'Medical-Surgical Nursing'
WHERE topic = 'General' AND unit = 'Medical-Surgical Nursing';

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 4: GARBLED / INCOMPLETE QUESTION FIXES
-- ─────────────────────────────────────────────────────────────────────────────

-- Question with garbled option_d (expressive aphasia + trailing unrelated stem)
-- The stem and options A-C are valid; option D is garbled with another question embedded.
-- Fix option_d to a clean placeholder that makes clinical sense.
UPDATE questions
SET option_d = 'Speaking in short, simple sentences',
    rationale = 'For expressive (Broca''s) aphasia, a picture or communication board is the most helpful nursing intervention because the client understands language but cannot produce it verbally. Speaking loudly is for hearing loss. Writing directions assumes the client can read, which may also be impaired. A picture board allows non-verbal expression of needs. (Brunner & Suddarth''s Medical-Surgical Nursing — neurological communication disorders.)'
WHERE stem LIKE 'For a client who is experiencing expressive aphasia%'
  AND cadre = 'BScN';

UPDATE questions
SET option_d = 'Speaking in short, simple sentences',
    rationale = 'For expressive (Broca''s) aphasia, a picture or communication board is the most helpful nursing intervention because the client understands language but cannot produce it verbally. Speaking loudly is for hearing loss. Writing directions assumes the client can read, which may also be impaired. A picture board allows non-verbal expression of needs. (Brunner & Suddarth''s Medical-Surgical Nursing — neurological communication disorders.)'
WHERE stem LIKE 'For a client who is experiencing expressive aphasia%'
  AND cadre = 'KRCHN';

-- Infant developmental milestone — garbled option_d
UPDATE questions
SET option_d = '7 months',
    rationale = 'At 6 months the infant can reach for and grasp an object, bring it to the mouth (palmar grasp) and shows excitement at the sight of food, coinciding with developmental readiness for complementary feeding. This is a key IMNCI milestone. (Kenya Basic Paediatric Protocols; WHO developmental milestones.)'
WHERE stem LIKE 'The age at which the infant can reach an object, grasp it and bring it to mouth%'
  AND cadre = 'KRCHN';

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 5: VERIFY ZERO REMAINING 'General' topics
-- Run this query after pushing the migration:
-- SELECT COUNT(*) FROM questions WHERE topic = 'General';
-- Expected result: 0
-- ─────────────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 6: RATIONALE ACCURACY FIXES
-- ─────────────────────────────────────────────────────────────────────────────

-- MAGNESIUM SULFATE expected effects clarification
-- Rationale previously listed "hypersomnolence" as an expected effect.
-- Per MOH Kenya/WHO, mild drowsiness and warmth ARE expected therapeutic effects.
-- The answer B (hypersomnolence) is borderline — it is an effect but the PRIMARY
-- expected sign used clinically is the absence of toxicity signs (normal reflexes,
-- adequate urine output, RR > 12). The answer is defensible but the rationale
-- should make this clearer.
UPDATE questions
SET rationale = 'At therapeutic magnesium sulfate levels, mild sedation/drowsiness (hypersomnolence) and a feeling of warmth/flushing are commonly experienced and are considered expected (not toxic) effects. Signs of toxicity include: loss of patellar reflex (earliest sign), respiratory depression (<12/min), and oliguria (<30 mL/hr) — these require immediate dose reduction or calcium gluconate administration. (Kenya MOH/WHO eclampsia management guidelines; Myles Textbook for Midwives.)'
WHERE stem LIKE 'The nurse caring for a client receiving intravenous magnesium sulfate must closely observe%'
  AND cadre = 'BScN';

-- ─────────────────────────────────────────────────────────────────────────────
-- END OF CORRECTIVE MIGRATION
-- Post-push verification queries:
-- 1. SELECT COUNT(*) FROM questions WHERE topic = 'General';   -- must be 0
-- 2. SELECT COUNT(*) FROM questions WHERE unit = 'Nursing';    -- must be 0
-- 3. SELECT COUNT(*) FROM questions WHERE paper IS NULL;       -- must be 0
-- 4. SELECT COUNT(*) FROM questions WHERE cadre IS NULL;       -- must be 0
-- ─────────────────────────────────────────────────────────────────────────────
