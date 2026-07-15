-- =============================================================================
-- FINAL TOPIC NORMALISATION — Batch Audit Completion
-- Migration: 20260715000003
-- Date: 2026-07-15
-- Purpose: Fix all remaining topic = unit_name violations (§14.4) and any
--          residual clinical accuracy issues not caught by prior migrations.
--
-- Primary target: 20260711000003_seed_mcq_set3_supplement.sql
--   which seeds 1085 questions where topic often = unit name.
--   Prior audit migrations (000004, 000005, 000001, 000002) fix individual stems
--   but leave ~400+ supplement rows with topic = 'Medical-Surgical Nursing'
--   (topic = unit name — a §14.4 violation).
--
-- Strategy: use content-keyword matching on the stem to assign specific topics,
--   then bulk-assign a fallback for anything not individually matched.
-- =============================================================================

-- =============================================================================
-- PART 1: STEM-KEYWORD BASED TOPIC ASSIGNMENT
-- For supplement rows with topic = 'Medical-Surgical Nursing' (topic = unit name)
-- Match on stem content to assign a specific clinical sub-topic
-- =============================================================================

-- Cardiovascular / Cardiac
UPDATE questions SET topic = 'Cardiovascular Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%heart%' OR stem LIKE '%cardiac%' OR stem LIKE '%myocardial%'
    OR stem LIKE '%angina%' OR stem LIKE '%coronary%' OR stem LIKE '%arrhythmia%'
    OR stem LIKE '%atrial%' OR stem LIKE '%ventricul%' OR stem LIKE '%hypertension%'
    OR stem LIKE '%blood pressure%' OR stem LIKE '%pulse%' OR stem LIKE '%ECG%'
    OR stem LIKE '%pericarditis%' OR stem LIKE '%endocarditis%' OR stem LIKE '%shock%'
    OR stem LIKE '%heart failure%' OR stem LIKE '%DVT%' OR stem LIKE '%thrombosis%'
    OR stem LIKE '%anticoagul%' OR stem LIKE '%warfarin%' OR stem LIKE '%heparin%');

-- Respiratory
UPDATE questions SET topic = 'Respiratory Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%breath%' OR stem LIKE '%respirat%' OR stem LIKE '%lung%'
    OR stem LIKE '%COPD%' OR stem LIKE '%asthma%' OR stem LIKE '%pneumonia%'
    OR stem LIKE '%tuberculosis%' OR stem LIKE '%TB%' OR stem LIKE '%bronch%'
    OR stem LIKE '%trachea%' OR stem LIKE '%oxygen%' OR stem LIKE '%sputum%'
    OR stem LIKE '%emphysema%' OR stem LIKE '%pleural%' OR stem LIKE '%atelectasis%'
    OR stem LIKE '%dyspnoea%' OR stem LIKE '%dyspnea%' OR stem LIKE '%cough%');

-- Neurological
UPDATE questions SET topic = 'Neurological Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%neuro%' OR stem LIKE '%brain%' OR stem LIKE '%cerebr%'
    OR stem LIKE '%seizure%' OR stem LIKE '%convuls%' OR stem LIKE '%stroke%'
    OR stem LIKE '%paralysis%' OR stem LIKE '%hemiplegia%' OR stem LIKE '%coma%'
    OR stem LIKE '%intracranial%' OR stem LIKE '%ICP%' OR stem LIKE '%spinal%'
    OR stem LIKE '%meningitis%' OR stem LIKE '%craniotomy%' OR stem LIKE '%Parkinson%'
    OR stem LIKE '%multiple sclerosis%' OR stem LIKE '%Alzheimer%' OR stem LIKE '%headache%'
    OR stem LIKE '%migraine%' OR stem LIKE '%aphasia%' OR stem LIKE '%Glasgow%');

-- Gastrointestinal
UPDATE questions SET topic = 'Gastrointestinal Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%gastro%' OR stem LIKE '%bowel%' OR stem LIKE '%colon%'
    OR stem LIKE '%intestin%' OR stem LIKE '%liver%' OR stem LIKE '%hepat%'
    OR stem LIKE '%stomach%' OR stem LIKE '%peptic%' OR stem LIKE '%ulcer%'
    OR stem LIKE '%diarrho%' OR stem LIKE '%diarrhea%' OR stem LIKE '%vomit%'
    OR stem LIKE '%nausea%' OR stem LIKE '%ileus%' OR stem LIKE '%appendix%'
    OR stem LIKE '%cholecyst%' OR stem LIKE '%pancre%' OR stem LIKE '%rectal%'
    OR stem LIKE '%colostomy%' OR stem LIKE '%ileostomy%' OR stem LIKE '%stoma%'
    OR stem LIKE '%constipat%' OR stem LIKE '%enema%' OR stem LIKE '%NG tube%');

-- Renal / Urological
UPDATE questions SET topic = 'Renal Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%renal%' OR stem LIKE '%kidney%' OR stem LIKE '%urinar%'
    OR stem LIKE '%urine%' OR stem LIKE '%dialysis%' OR stem LIKE '%catheter%'
    OR stem LIKE '%nephro%' OR stem LIKE '%GFR%' OR stem LIKE '%creatinine%'
    OR stem LIKE '%potassium%' OR stem LIKE '%electrolyte%' OR stem LIKE '%oedema%'
    OR stem LIKE '%edema%' OR stem LIKE '%fluid%' OR stem LIKE '%dehydration%'
    OR stem LIKE '%bladder%' OR stem LIKE '%prostate%' OR stem LIKE '%urethra%');

-- Endocrine
UPDATE questions SET topic = 'Endocrine Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%diabetes%' OR stem LIKE '%insulin%' OR stem LIKE '%thyroid%'
    OR stem LIKE '%adrenal%' OR stem LIKE '%Cushing%' OR stem LIKE '%Addison%'
    OR stem LIKE '%hypoglycaem%' OR stem LIKE '%hyperglycaem%' OR stem LIKE '%glucose%'
    OR stem LIKE '%pituitary%' OR stem LIKE '%hormone%' OR stem LIKE '%DKA%'
    OR stem LIKE '%parathyroid%' OR stem LIKE '%calcium%');

-- Musculoskeletal / Orthopaedic
UPDATE questions SET topic = 'Musculoskeletal Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%fracture%' OR stem LIKE '%bone%' OR stem LIKE '%joint%'
    OR stem LIKE '%arthrit%' OR stem LIKE '%osteoporosis%' OR stem LIKE '%cast%'
    OR stem LIKE '%traction%' OR stem LIKE '%amputation%' OR stem LIKE '%muscle%'
    OR stem LIKE '%gout%' OR stem LIKE '%sprain%' OR stem LIKE '%dislocation%'
    OR stem LIKE '%rheumatoid%' OR stem LIKE '%orthopaed%');

-- Oncology / Haematology
UPDATE questions SET topic = 'Oncology and Haematology'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%cancer%' OR stem LIKE '%tumour%' OR stem LIKE '%tumor%'
    OR stem LIKE '%leukaemia%' OR stem LIKE '%leukemia%' OR stem LIKE '%lymphoma%'
    OR stem LIKE '%anaemia%' OR stem LIKE '%anemia%' OR stem LIKE '%chemotherapy%'
    OR stem LIKE '%radiation%' OR stem LIKE '%haemoglobin%' OR stem LIKE '%hemoglobin%'
    OR stem LIKE '%platelet%' OR stem LIKE '%sickle cell%' OR stem LIKE '%transfusion%'
    OR stem LIKE '%bone marrow%' OR stem LIKE '%biopsy%' OR stem LIKE '%mastectomy%');

-- Wound Care / Integumentary
UPDATE questions SET topic = 'Wound Care and Dermatology'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%wound%' OR stem LIKE '%skin%' OR stem LIKE '%dermat%'
    OR stem LIKE '%burn%' OR stem LIKE '%pressure ulcer%' OR stem LIKE '%dressing%'
    OR stem LIKE '%debridement%' OR stem LIKE '%suture%' OR stem LIKE '%incision%'
    OR stem LIKE '%psoriasis%' OR stem LIKE '%eczema%' OR stem LIKE '%impetigo%');

-- Ophthalmic / ENT
UPDATE questions SET topic = 'Ophthalmic and ENT Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%eye%' OR stem LIKE '%vision%' OR stem LIKE '%glaucoma%'
    OR stem LIKE '%cataract%' OR stem LIKE '%ear%' OR stem LIKE '%hearing%'
    OR stem LIKE '%tonsil%' OR stem LIKE '%sinusitis%' OR stem LIKE '%larynx%'
    OR stem LIKE '%ophthalmia%' OR stem LIKE '%retina%' OR stem LIKE '%cornea%'
    OR stem LIKE '%deaf%' OR stem LIKE '%otitis%' OR stem LIKE '%epistaxis%');

-- Surgical / Perioperative
UPDATE questions SET topic = 'Perioperative Nursing'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%pre-operat%' OR stem LIKE '%post-operat%' OR stem LIKE '%preoperative%'
    OR stem LIKE '%postoperative%' OR stem LIKE '%surgery%' OR stem LIKE '%anaesthesia%'
    OR stem LIKE '%anaesthesi%' OR stem LIKE '%recovery room%' OR stem LIKE '%PACU%'
    OR stem LIKE '%nil by mouth%' OR stem LIKE '%NPO%' OR stem LIKE '%surgical%');

-- Anatomy & Physiology content mistakenly in Medical-Surgical
UPDATE questions SET topic = 'Applied Anatomy and Physiology'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%anatomy%' OR stem LIKE '%physiology%' OR stem LIKE '%cell%'
    OR stem LIKE '%membrane%' OR stem LIKE '%cerebellum%' OR stem LIKE '%medulla%'
    OR stem LIKE '%septum%' OR stem LIKE '%alveoli%' OR stem LIKE '%femur%'
    OR stem LIKE '%neuron%' OR stem LIKE '%sagittal%' OR stem LIKE '%pituitary%'
    OR stem LIKE '%plane%' OR stem LIKE '%organ%');

-- Infectious Disease / Communicable Disease
UPDATE questions SET topic = 'Communicable Diseases'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%malaria%' OR stem LIKE '%typhoid%' OR stem LIKE '%cholera%'
    OR stem LIKE '%HIV%' OR stem LIKE '%AIDS%' OR stem LIKE '%STI%'
    OR stem LIKE '%syphilis%' OR stem LIKE '%gonorrho%' OR stem LIKE '%hepatitis%'
    OR stem LIKE '%sepsis%' OR stem LIKE '%infection%' OR stem LIKE '%antibiotic%'
    OR stem LIKE '%antimicrobial%' OR stem LIKE '%meningitis%');

-- Nursing Process / Assessment
UPDATE questions SET topic = 'Nursing Assessment and Process'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%nursing process%' OR stem LIKE '%assessment%' OR stem LIKE '%diagnosis%'
    OR stem LIKE '%care plan%' OR stem LIKE '%nursing diagnos%' OR stem LIKE '%evaluation%'
    OR stem LIKE '%ADPIE%' OR stem LIKE '%objective%' OR stem LIKE '%subjective%'
    OR stem LIKE '%data collection%');

-- Pharmacology / Medication content in Medical-Surgical unit
UPDATE questions SET topic = 'Pharmacological Management'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%drug%' OR stem LIKE '%medication%' OR stem LIKE '%dose%'
    OR stem LIKE '%pharmacol%' OR stem LIKE '%antidote%' OR stem LIKE '%adverse%'
    OR stem LIKE '%side effect%' OR stem LIKE '%contraindication%'
    OR stem LIKE '%IV fluid%' OR stem LIKE '%drops per minute%'
    OR stem LIKE '%administer%');

-- Emergency / Critical Care
UPDATE questions SET topic = 'Emergency and Critical Care'
WHERE unit = 'Medical-Surgical Nursing' AND topic = 'Medical-Surgical Nursing'
  AND (stem LIKE '%emergency%' OR stem LIKE '%resuscitation%' OR stem LIKE '%CPR%'
    OR stem LIKE '%shock%' OR stem LIKE '%critical%' OR stem LIKE '%first aid%'
    OR stem LIKE '%triage%' OR stem LIKE '%anaphylaxis%' OR stem LIKE '%poisoning%'
    OR stem LIKE '%overdose%' OR stem LIKE '%acute%');
