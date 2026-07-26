/**
 * DEFINITIVE FULL NCK UNIT CLASSIFICATION AUDIT
 * ================================================
 * Source of truth: nck-exam-system.md §12 + §14.4
 *
 * KRCHN Paper I:  Medical-Surgical Nursing, Midwifery, Pharmacology,
 *                 Maternal & Child Health, Paediatric Nursing,
 *                 Anatomy & Physiology, Surgical Nursing
 *
 * KRCHN Paper II: Community Health Nursing, Mental Health Nursing,
 *                 Environmental Health, Nutrition, Research & Statistics,
 *                 Health Systems & Management, Infection Prevention & Control
 *
 * BScN  Paper I:  Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology,
 *                 Critical Care Nursing, Surgical Nursing, Midwifery,
 *                 Maternal & Child Health, Paediatric Nursing
 *
 * BScN  Paper II: Community Health Nursing, Mental Health Nursing,
 *                 Research & Evidence-Based Practice (= Research & Statistics),
 *                 Nursing Management & Leadership, Professional Ethics & Law,
 *                 Health Systems in Kenya (= Health Systems & Management),
 *                 Infection Prevention & Control, Nutrition
 *
 * Also recognised (historical/legacy unit names that map to canonical ones):
 *   "Nursing Management and Leadership"        → Nursing Management & Leadership
 *   "Nursing Education"                        → Nursing Management & Leadership
 *   "Nursing Education & Professional Practice"→ Nursing Management & Leadership
 *   "Research & Evidence-Based Practice"       → Research & Statistics
 *   "Health Systems in Kenya"                  → Health Systems & Management
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.download' });
const fs = require('fs');

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── CANONICAL UNIT NAMES (from nck-exam-system.md §12) ──────────────────────
const CANONICAL_UNITS = new Set([
  'Medical-Surgical Nursing',
  'Midwifery',
  'Pharmacology',
  'Maternal & Child Health',
  'Paediatric Nursing',
  'Anatomy & Physiology',
  'Surgical Nursing',
  'Community Health Nursing',
  'Mental Health Nursing',
  'Environmental Health',
  'Nutrition',
  'Research & Statistics',
  'Health Systems & Management',
  'Infection Prevention & Control',
  'Critical Care Nursing',
  'Nursing Management & Leadership',
]);

// Non-canonical names that must be renamed
const UNIT_RENAME_MAP = {
  'Nursing Management and Leadership':         'Nursing Management & Leadership',
  'Nursing Education':                         'Nursing Management & Leadership',
  'Nursing Education & Professional Practice': 'Nursing Management & Leadership',
  'Research & Evidence-Based Practice':        'Research & Statistics',
  'Health Systems in Kenya':                   'Health Systems & Management',
  'Professional Ethics & Law':                 'Nursing Management & Leadership',
};

// ── PAPER ASSIGNMENT MAP (from nck-exam-system.md §12) ───────────────────────
// unit → cadre → correct paper
const PAPER_MAP = {
  'Medical-Surgical Nursing':    { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Midwifery':                   { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Pharmacology':                { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Maternal & Child Health':     { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Paediatric Nursing':          { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Anatomy & Physiology':        { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Surgical Nursing':            { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Critical Care Nursing':       { KRCHN: 'Paper I',  BScN: 'Paper I' },
  'Community Health Nursing':    { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Mental Health Nursing':       { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Environmental Health':        { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Nutrition':                   { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Research & Statistics':       { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Health Systems & Management': { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Infection Prevention & Control': { KRCHN: 'Paper II', BScN: 'Paper II' },
  'Nursing Management & Leadership': { KRCHN: 'Paper II', BScN: 'Paper II' },
};

// ── NCK UNIT SCOPE DEFINITIONS ───────────────────────────────────────────────
// These define what topics CORRECTLY belong to each unit per NCK curriculum
// User correction noted: Cervical Cancer Screening belongs in Maternal & Child Health
const UNIT_SCOPE = {
  'Midwifery': {
    topics: [
      'antenatal', 'ante-natal', 'antenatal care', 'labour', 'delivery', 'postnatal',
      'post-natal', 'obstetric', 'pregnancy', 'puerperium', 'gravid', 'partograph',
      'eclampsia', 'pre-eclampsia', 'antepartum', 'postpartum', 'maternal mortality',
      'newborn', 'breastfeeding', 'hyperemesis', 'placenta', 'caesarean', 'foetal',
      'fetal', 'dystocia', 'malpresentation', 'abortion', 'miscarriage', 'ectopic',
      'pph', 'postpartum haemorrhage', 'neonatal care', 'birth', 'labour ward',
      'midwifery', 'perinatal', 'cord', 'apgar', 'lochia', 'episiotomy',
      'uterine', 'contracted pelvis', 'rupture of membranes', 'prolonged labour',
      'antepartum haemorrhage', 'aph', 'gestational', 'gravida', 'para',
      'induction of labour', 'oxytocin', 'ergometrine', 'misoprostol',
    ]
  },
  'Maternal & Child Health': {
    topics: [
      'family planning', 'reproductive health', 'family planning method',
      'immunisation', 'immunization', 'immunization programme', 'epi programme',
      'growth monitoring', 'vitamin a supplementation', 'under-five', 'under five',
      'well-baby clinic', 'mch clinic', 'mch services', 'child welfare',
      'infant feeding', 'complementary feeding', 'breast feeding',
      'cervical cancer', 'cervical cancer screening', 'pap smear', 'papanicolaou',
      'via', 'colposcopy',                  // screening for cervical cancer = MCH per user
      'neonatal prophylaxis',               // newborn care in MCH context
      'maternal and child health',
    ]
  },
  'Paediatric Nursing': {
    topics: [
      'paediatric', 'pediatric', 'child health', 'neonatal nursing', 'neonatal condition',
      'imnci', 'infant', 'childhood disease', 'child development', 'growth and development',
      'childhood illness', 'neonatal jaundice', 'neonatal infection', 'neonatal resuscitation',
      'paediatric emergency', 'child malnutrition', 'kwashiorkor', 'marasmus in children',
      'childhood fever', 'febrile convulsion', 'otitis media in children',
      'pneumonia in children', 'diarrhoea in children', 'dehydration in children',
      'congenital', 'paediatric dosage', 'child abuse',
    ]
  },
  'Medical-Surgical Nursing': {
    topics: [
      'cardiovascular disorder', 'respiratory disorder', 'neurological disorder',
      'renal disorder', 'gastrointestinal disorder', 'endocrine disorder',
      'haematological disorder', 'musculoskeletal disorder', 'dermatological disorder',
      'ophthalmic', 'eye disorder', 'ear disorder', 'ent disorder', 'thyroid disorder',
      'adrenal disorder', 'diabetes mellitus', 'fluid and electrolyte', 'electrolyte imbalance',
      'pain management', 'medication administration', 'blood transfusion', 'oncology',
      'liver disorder', 'vascular disorder', 'pituitary disorder', 'spinal cord disorder',
      'cerebrovascular', 'upper gi', 'clinical nursing', 'nursing care', 'nursing procedures',
      'rehabilitation nursing', 'cardiac disorder', 'palliative care',
      'renal nursing', 'urinary disorder', 'abdominal', 'musculoskeletal trauma',
      'neuromuscular', 'endocrine nursing', 'gerontological nursing',
      'cardiovascular nursing', 'respiratory nursing', 'neurological nursing',
      'dermatological nursing', 'ophthalmic nursing', 'medical-surgical',
      'fracture', 'bone', 'joint', 'cast', 'traction', 'orthopaedic',
      'peritonitis', 'appendicitis', 'bowel obstruction', 'hernia',
      'renal failure', 'acute kidney injury', 'dialysis', 'nephrotic',
      'anaemia', 'sickle cell', 'haemophilia', 'leukaemia', 'lymphoma',
      'stroke', 'tia', 'meningitis', 'epilepsy', 'parkinson', 'alzheimer',
      'myocardial infarction', 'heart failure', 'angina', 'arrhythmia', 'hypertension',
      'copd', 'asthma', 'pneumonia in adults', 'pleural effusion', 'pneumothorax',
      'peptic ulcer', 'inflammatory bowel disease', 'cirrhosis', 'hepatitis in adults',
      'hyperthyroidism', 'hypothyroidism', 'cushing', 'addison', 'phaeochromocytoma',
      'skin disorder', 'eczema', 'psoriasis', 'burns', 'wound infection',
      'glaucoma', 'cataract', 'retinal detachment',
      'gynaecological condition',    // gynaecological conditions = Medical-Surgical (NOT MCH)
      'endometriosis', 'bartholin', 'dysmenorrhoea', 'menorrhagia', 'fibroid',
      'ovarian cyst', 'pelvic inflammatory disease', 'pid',
      'prostate', 'testicular', 'erectile dysfunction',
      'nursing assessment', 'health assessment', 'physical examination',
      'diagnostic procedure', 'laboratory test', 'interpretation of results',
      'post-operative care',         // post-operative = surgical/medical-surgical
    ]
  },
  'Surgical Nursing': {
    topics: [
      'pre-operative', 'preoperative', 'intra-operative', 'intraoperative',
      'post-operative care', 'postoperative care', 'peri-operative', 'perioperative',
      'anaesthesia', 'anaesthetic', 'general anaesthesia', 'spinal anaesthesia',
      'wound care', 'surgical wound', 'drain management', 'stoma care',
      'operating theatre', 'theatre nursing', 'scrub nurse', 'circulating nurse',
      'surgical procedure', 'surgical site infection', 'vascular surgery',
      'abdominal surgery', 'thoracic surgery', 'neurosurgery',
    ]
  },
  'Critical Care Nursing': {
    topics: [
      'mechanical ventilation', 'haemodynamic monitoring', 'icu', 'intensive care unit',
      'critical care', 'shock management', 'emergency nursing', 'resuscitation',
      'cpr', 'cardiac arrest', 'airway management', 'burns management',
      'anaphylaxis', 'anaphylactic shock', 'trauma nursing',
      'emergency and trauma', 'emergency and shock', 'emergency and first aid',
      'septic shock', 'hypovolaemic shock', 'cardiogenic shock', 'distributive shock',
      'central venous pressure', 'cvp monitoring', 'arterial line',
      'advanced life support', 'als', 'bls', 'basic life support',
      'ventilator', 'oxygen therapy', 'intubation', 'tracheostomy',
      'cardiovascular monitoring',  // monitoring in critical care context
    ]
  },
  'Pharmacology': {
    topics: [
      'pharmacology', 'drug mechanism', 'pharmacokinetics', 'pharmacodynamics',
      'drug interaction', 'drug side effect', 'drug classification',
      'analgesic', 'antipyretic', 'antibiotic', 'antifungal', 'antiviral',
      'antihypertensive', 'antidiabetic', 'antimalarial', 'anticoagulant',
      'anticonvulsant', 'antiepileptic', 'antidepressant', 'antipsychotic',
      'diuretic', 'corticosteroid', 'nsaid', 'opioid', 'sedative',
      'bronchodilator', 'inotrope', 'vasopressor', 'thrombolytic',
      'oral rehydration', 'iv fluid', 'blood product',
      'dosage calculation', 'drug dosage', 'drug administration route',
      'contraindication of drug', 'antidote', 'toxicology', 'overdose',
      'pharmacotherapy', 'formulary', 'generic drug',
    ]
  },
  'Community Health Nursing': {
    topics: [
      'community health', 'community health nursing', 'home visiting', 'home visit',
      'school health', 'primary health care', 'alma ata', 'phc',
      'community diagnosis', 'community assessment', 'community development',
      'community mobilisation', 'community participation',
      'disaster management', 'disaster preparedness', 'mass casualty',
      'community nursing role', 'roles of the chn', 'home-based care',
      'levels of prevention', 'preventive care', 'promotive care',
      'disability rehabilitation', 'rehabilitation', 'disability',
      'oral health', 'dental health',
      'elderly care', 'ageing', 'gerontological community',
      'community principles', 'social change', 'community process',
      'concepts of health', 'health dimensions', 'social health',
      'vulnerable group', 'marginalised group',
      'health policy', 'health legislation',
      'health information system community', 'vital statistics',
      'cancer prevention at community level', 'screening programme',
      'global health goals', 'sdg', 'mdg', 'sustainable development',
      'vector control', 'malaria prevention community',  // community-level prevention
      'school feeding', 'school health programme',
    ]
  },
  'Mental Health Nursing': {
    topics: [
      'mental health', 'psychiatry', 'psychiatric nursing', 'mental disorder',
      'mental illness', 'schizophrenia', 'psychosis', 'bipolar disorder',
      'depression', 'anxiety disorder', 'phobia', 'ocd', 'ptsd',
      'substance abuse', 'alcohol dependence', 'drug dependence', 'addiction',
      'dementia', 'delirium', 'cognitive disorder', 'personality disorder',
      'therapeutic relationship', 'therapeutic communication',
      'group therapy', 'psychotherapy', 'behaviour therapy', 'cbt',
      'psychiatric medication', 'psychopharmacology',
      'mental health act', 'mental health legislation', 'involuntary commitment',
      'seclusion', 'restraint', 'de-escalation',
      'crisis intervention', 'suicide risk', 'self-harm',
      'psychosocial rehabilitation', 'community mental health',
      'mental state examination', 'mse',
      'learning disability', 'intellectual disability',
    ]
  },
  'Nursing Management & Leadership': {
    topics: [
      'nursing management', 'management theory', 'management function',
      'management principle', 'management style', 'management role',
      'leadership', 'leadership style', 'transformational leadership',
      'transactional leadership', 'situational leadership',
      'staffing', 'scheduling', 'duty roster', 'workforce planning',
      'delegation', 'supervision', 'span of control',
      'conflict management', 'conflict resolution',
      'budgeting', 'financial management', 'zero-based budgeting',
      'quality assurance', 'quality improvement', 'audit',
      'organisational structure', 'hierarchy', 'line of authority',
      'communication in nursing', 'interdisciplinary communication',
      'nursing theory', 'nursing theories', 'nursing model',
      'florence nightingale', 'dorothy orem', 'virginia henderson',
      'sister callista roy', 'jean watson',
      'nursing education', 'nursing curriculum', 'teaching methods',
      'evaluation in teaching', 'clinical supervision of students',
      'mentorship', 'preceptorship', 'staff development', 'in-service training',
      'critical thinking', 'reflective practice',
      'professional ethics', 'ethical principle', 'ethical dilemma',
      'code of ethics', 'nck scope', 'professional regulation',
      'professional nursing practice', 'nursing regulation',
      'patient advocacy', 'end-of-life care ethical',
      'change management', 'strategic planning', 'mission and vision',
      'human resource management', 'recruitment', 'retention',
      'incident reporting', 'near-miss', 'patient safety system',
      'accreditation', 'credentialing', 'licensing',
    ]
  },
  'Research & Statistics': {
    topics: [
      'research methodology', 'research design', 'research method',
      'quantitative research', 'qualitative research', 'mixed method',
      'randomised controlled trial', 'rct', 'cohort study', 'case control',
      'cross-sectional study', 'survey research',
      'hypothesis', 'null hypothesis', 'alternative hypothesis',
      'sampling', 'sample size', 'probability sampling', 'purposive sampling',
      'variable', 'dependent variable', 'independent variable', 'confounding variable',
      'data collection', 'questionnaire design', 'data analysis',
      'descriptive statistics', 'inferential statistics',
      'mean', 'median', 'mode', 'standard deviation', 'variance',
      'p-value', 'confidence interval', 'chi-square', 't-test', 'anova',
      'reliability', 'validity', 'internal validity', 'external validity',
      'evidence-based practice', 'ebp', 'hierarchy of evidence',
      'systematic review', 'meta-analysis', 'literature review',
      'research ethics', 'informed consent in research',
      'publication bias', 'blinding', 'placebo',
      'epidemiology as research method',
    ]
  },
  'Infection Prevention & Control': {
    topics: [
      'infection prevention', 'infection control', 'ipc',
      'sterilisation', 'sterilization', 'disinfection', 'decontamination',
      'autoclave', 'moist heat', 'dry heat', 'chemical sterilisation',
      'isolation nursing', 'barrier nursing', 'reverse isolation',
      'standard precautions', 'universal precautions',
      'transmission-based precautions', 'contact precautions',
      'droplet precautions', 'airborne precautions',
      'personal protective equipment', 'ppe',
      'hand hygiene', 'hand washing', 'alcohol hand rub',
      'nosocomial infection', 'hospital-acquired infection', 'hai',
      'surgical site infection prevention',
      'needle stick injury', 'needlestick', 'sharps injury',
      'post-exposure prophylaxis', 'pep after needlestick',
      'biomedical waste', 'waste segregation', 'waste disposal',
      'aseptic technique', 'asepsis', 'antisepsis',
    ]
  },
  'Environmental Health': {
    topics: [
      'environmental health', 'environmental sanitation',
      'water supply', 'water treatment', 'water purification', 'water quality',
      'water and disease', 'water hardness', 'fluoridation',
      'sanitation', 'sewage disposal', 'latrine', 'toilet',
      'solid waste management', 'refuse disposal', 'composting',
      'food safety', 'food hygiene', 'food preservation', 'food poisoning',
      'air pollution', 'indoor air quality', 'ventilation',
      'housing', 'healthy housing', 'overcrowding',
      'occupational health', 'occupational disease', 'occupational hazard',
      'ergonomics', 'workplace safety',
      'vector control community', 'pest control', 'insecticide',
      'radiation safety', 'nuclear hazard',
      'noise pollution', 'chemical hazard',
    ]
  },
  'Epidemiology': {
    topics: [
      'epidemiology', 'epidemiological method', 'epidemiological study',
      'incidence', 'prevalence', 'attack rate', 'mortality rate', 'morbidity',
      'case fatality rate', 'infant mortality rate', 'imr', 'under-five mortality rate',
      'maternal mortality ratio', 'mmr',
      'surveillance', 'disease surveillance', 'notifiable disease',
      'outbreak investigation', 'epidemic', 'pandemic', 'endemic',
      'herd immunity', 'force of infection',
      'demography', 'vital registration', 'census',
      'fertility rate', 'crude birth rate', 'crude death rate',
      'life expectancy', 'population pyramid',
      'screening criteria', 'sensitivity', 'specificity', 'ppv', 'npv',
      'epidemiological transition', 'disease burden',
    ]
  },
  'Nutrition': {
    topics: [
      'nutrition', 'nutritional assessment', 'nutritional status',
      'malnutrition', 'undernutrition', 'overnutrition', 'obesity',
      'kwashiorkor', 'marasmus', 'wasting', 'stunting', 'underweight',
      'protein energy malnutrition', 'pem',
      'macronutrient', 'carbohydrate', 'protein', 'fat', 'lipid',
      'micronutrient', 'vitamin', 'mineral', 'iron', 'zinc', 'iodine',
      'vitamin a deficiency', 'vitamin c', 'vitamin d', 'folic acid',
      'anaemia nutritional',
      'therapeutic diet', 'dietary modification', 'dietary counselling',
      'enteral nutrition', 'parenteral nutrition', 'nasogastric feeding',
      'dietary requirements', 'caloric requirement', 'nutritional support',
      'food group', 'balanced diet', 'nutrient',
      'breastfeeding and nutrition',  // nutritional aspects of breastfeeding
      'complementary food', 'weaning',
      'non-communicable disease nutrition',  // obesity/diet-NCDs = Nutrition
    ]
  },
  'Health Systems & Management': {
    topics: [
      'kenya health system', 'health system structure', 'levels of care',
      'level 1 community', 'level 2 dispensary', 'level 3 health centre',
      'level 4 county hospital', 'level 5 regional hospital', 'level 6 national hospital',
      'kenya essential package for health', 'keph',
      'health information system', 'his', 'dhis',
      'health financing', 'nhif', 'universal health coverage', 'uhc',
      'health sector reform', 'devolution health', 'county health',
      'health workforce', 'health human resource',
      'primary health care system', 'phc organisation',
      'essential medicines', 'medicine supply chain', 'keml',
      'national health policy', 'health legislation kenya',
      'disaster management national level', 'emergency preparedness national',
      'referral system', 'patient referral',
      'health planning', 'health management information',
    ]
  },
  'Anatomy & Physiology': {
    topics: [
      'anatomy', 'physiology', 'anatomy and physiology', 'anatomy & physiology',
      'human anatomy', 'body system', 'cell biology', 'histology', 'embryology',
      'cardiovascular anatomy', 'cardiovascular physiology',
      'respiratory anatomy', 'respiratory physiology',
      'renal anatomy', 'renal physiology',
      'neuroanatomy', 'neurophysiology',
      'gastrointestinal anatomy', 'gastrointestinal physiology',
      'endocrine anatomy', 'endocrine physiology',
      'musculoskeletal anatomy', 'musculoskeletal physiology',
      'reproductive anatomy', 'reproductive physiology',
      'skin anatomy', 'integumentary',
      'cardiovascular pathophysiology', 'pathophysiology',
    ]
  },
  'Pharmacology': {
    topics: [
      'pharmacology', 'drug', 'medication', 'pharmacokinetics', 'pharmacodynamics',
      'absorption', 'distribution', 'metabolism', 'excretion', 'adme',
      'drug interaction', 'drug side effect', 'adverse drug reaction',
      'drug classification', 'drug mechanism',
      'analgesic', 'nsaid', 'opioid', 'antipyretic',
      'antibiotic', 'penicillin', 'cephalosporin', 'tetracycline', 'macrolide',
      'aminoglycoside', 'fluoroquinolone', 'sulphonamide', 'metronidazole',
      'antifungal', 'antiviral', 'antiretroviral', 'arv',
      'antimalarial', 'artemether', 'lumefantrine', 'chloroquine', 'quinine',
      'antihypertensive', 'ace inhibitor', 'beta blocker', 'calcium channel blocker',
      'antidiabetic', 'insulin', 'metformin', 'sulphonylurea',
      'anticoagulant', 'heparin', 'warfarin',
      'anticonvulsant', 'antiepileptic', 'phenobarbitone', 'phenytoin', 'valproate',
      'antidepressant', 'antipsychotic', 'anxiolytic', 'sedative', 'hypnotic',
      'diuretic', 'frusemide', 'thiazide', 'spironolactone',
      'corticosteroid', 'steroid', 'prednisolone', 'dexamethasone',
      'bronchodilator', 'salbutamol', 'aminophylline',
      'antidote', 'naloxone', 'atropine', 'flumazenil',
      'oxytocin', 'ergometrine', 'misoprostol',  // obstetric drugs = Pharmacology
      'iv fluid', 'normal saline', 'dextrose', 'ringer lactate',
      'blood product', 'plasma expander',
      'dosage calculation', 'drug dosage', 'route of administration',
      'contraindication', 'drug allergy',
      'immunisation vaccine',  // vaccines = Pharmacology in some contexts
      'toxicology', 'poisoning', 'overdose',
    ]
  },
  'Environmental Health': {
    topics: [
      'zoonotic disease',  // zoonotic diseases ARE Environmental Health per NCK
      'vector control',
    ]
  },
};

// ── NCK TOPIC → CORRECT UNIT MAP ─────────────────────────────────────────────
// Direct lookup: if a question has THIS topic string, it MUST be in THIS unit
const DEFINITIVE_TOPIC_TO_UNIT = {
  // Midwifery topics
  'Labour and Delivery':           'Midwifery',
  'Antenatal Care':                'Midwifery',
  'Postnatal Care':                'Midwifery',
  'Obstetric Emergencies':         'Midwifery',
  'Normal Labour':                 'Midwifery',
  'Abnormal Labour':               'Midwifery',
  'Maternal Mortality':            'Midwifery',
  'Hyperemesis Gravidarum':        'Midwifery',
  'Breastfeeding':                 'Midwifery',
  'Puerperium':                    'Midwifery',
  'Pregnancy Complications':       'Midwifery',
  'Antepartum Haemorrhage':        'Midwifery',
  'Postpartum Haemorrhage':        'Midwifery',
  'Pre-eclampsia':                 'Midwifery',
  'Eclampsia':                     'Midwifery',

  // Maternal & Child Health topics (user corrected: cervical cancer = MCH)
  'Family Planning':               'Maternal & Child Health',
  'Immunisation':                  'Maternal & Child Health',
  'Immunization':                  'Maternal & Child Health',
  'Immunisation Programme':        'Maternal & Child Health',
  'Cold Chain':                    'Maternal & Child Health',
  'Growth Monitoring':             'Maternal & Child Health',
  'Vitamin A Supplementation':     'Maternal & Child Health',
  'Cervical Cancer Screening':     'Maternal & Child Health',  // per user correction
  'Neonatal Prophylaxis':          'Maternal & Child Health',

  // Gynaecological → Medical-Surgical Nursing (not MCH)
  'Gynaecological Conditions':     'Medical-Surgical Nursing',
  'Gynaecological Nursing':        'Medical-Surgical Nursing',
  'Endometriosis':                 'Medical-Surgical Nursing',

  // Critical Care
  'Emergency Nursing':             'Critical Care Nursing',
  'Mechanical Ventilation':        'Critical Care Nursing',
  'Shock':                         'Critical Care Nursing',
  'Cardiovascular Monitoring':     'Critical Care Nursing',
  'Emergency and Trauma Nursing':  'Critical Care Nursing',
  'Haemodynamic Monitoring':       'Critical Care Nursing',
  'Airway Management':             'Critical Care Nursing',
  'Anaphylaxis':                   'Critical Care Nursing',
  'Cardiac Arrest':                'Critical Care Nursing',
  'Burns Management':              'Critical Care Nursing',

  // Surgical Nursing
  'Pre-operative Care':            'Surgical Nursing',
  'Post-operative Care':           'Surgical Nursing',
  'Peri-operative Nursing':        'Surgical Nursing',
  'Wound Care':                    'Surgical Nursing',
  'Operating Theatre Practice':    'Surgical Nursing',

  // Nursing Management & Leadership
  'Nursing Process':               'Nursing Management & Leadership',
  'Nursing Education':             'Nursing Management & Leadership',
  'Nursing Theories':              'Nursing Management & Leadership',
  'Nursing Theory':                'Nursing Management & Leadership',
  'Management Theory':             'Nursing Management & Leadership',
  'Management Functions':          'Nursing Management & Leadership',
  'Management Principles':         'Nursing Management & Leadership',
  'Leadership':                    'Nursing Management & Leadership',
  'Leadership Styles':             'Nursing Management & Leadership',
  'Professional Ethics':           'Nursing Management & Leadership',
  'Professional Practice':         'Nursing Management & Leadership',
  'Financial Management':          'Nursing Management & Leadership',
  'Staff Development':             'Nursing Management & Leadership',
  'Organisational Structure':      'Nursing Management & Leadership',
  'Change Management':             'Nursing Management & Leadership',
  'Critical Thinking':             'Nursing Management & Leadership',
  'Teaching Methods':              'Nursing Management & Leadership',
  'Evaluation in Teaching':        'Nursing Management & Leadership',
  'Conflict Management':           'Nursing Management & Leadership',
  'Communication in Nursing':      'Nursing Management & Leadership',
  'Nursing Regulation':            'Nursing Management & Leadership',
  'Quality Assurance':             'Nursing Management & Leadership',
  'Delegation':                    'Nursing Management & Leadership',
  'Mentorship':                    'Nursing Management & Leadership',
  'Preceptorship':                 'Nursing Management & Leadership',
  'Human Resource Management':     'Nursing Management & Leadership',
  'Strategic Change Management':   'Nursing Management & Leadership',
  'End-of-Life Care':              'Nursing Management & Leadership',
  'Professional Regulation':       'Nursing Management & Leadership',
  'Ethical Principles':            'Nursing Management & Leadership',
  'Patient Safety':                'Nursing Management & Leadership',

  // Research & Statistics
  'Research Methodology':          'Research & Statistics',
  'Research Design':               'Research & Statistics',
  'Questionnaire Design':          'Research & Statistics',
  'Epidemiology':                  'Research & Statistics',  // when in Research context
  'Evidence Levels':               'Research & Statistics',
  'Data Collection':               'Research & Statistics',
  'Sampling':                      'Research & Statistics',
  'Learning Theories':             'Nursing Management & Leadership',  // belongs in management/education

  // Infection Prevention & Control
  'Sterilisation and Disinfection': 'Infection Prevention & Control',
  'Isolation Nursing':              'Infection Prevention & Control',
  'Needle Stick Injury':            'Infection Prevention & Control',
  'Needlestick Injury':             'Infection Prevention & Control',
  'Post-Exposure Prophylaxis':      'Infection Prevention & Control',
  'Transmission-Based Precautions': 'Infection Prevention & Control',
  'Infection Prevention':           'Infection Prevention & Control',

  // Nutrition
  'Nutrition':                     'Nutrition',
  'Vitamins and Minerals':         'Nutrition',
  'Therapeutic Feeding':           'Nutrition',
  'Non-Communicable Diseases':     'Nutrition',  // NCDs tied to diet/obesity = Nutrition

  // Epidemiology
  'Child Health Epidemiology':     'Epidemiology',
  'Vital Registration':            'Epidemiology',
  'Epidemiology and Demography':   'Epidemiology',
  'Epidemiology & Demography':     'Epidemiology',
  'Demography':                    'Epidemiology',

  // Environmental Health
  'Water Treatment':               'Environmental Health',
  'Zoonotic Diseases':             'Environmental Health',
  'Vector Control':                'Environmental Health',
  'Food Preservation':             'Environmental Health',
  'Occupational Health':           'Environmental Health',
  'Occupational and Environmental Health': 'Environmental Health',
  'Environmental Health':          'Environmental Health',
  'Water and Sanitation':          'Environmental Health',
  'Water & Sanitation':            'Environmental Health',
  'Sanitation':                    'Environmental Health',

  // Communicable Diseases
  'Communicable Diseases':         'Communicable Diseases',  // NOT in canonical list but keep existing
  'Malaria':                       'Communicable Diseases',
  'Tuberculosis':                  'Communicable Diseases',
  'HIV/AIDS':                      'Communicable Diseases',
  'STI Management':                'Communicable Diseases',
  'Trachoma':                      'Communicable Diseases',
  'Infection and Microbiology':    'Infection Prevention & Control',
  'Infection and Diagnostics':     'Infection Prevention & Control',
};

// ── FETCH ALL QUESTIONS PAGINATED ─────────────────────────────────────────────
async function fetchAll() {
  const PAGE = 500;
  let all = [];
  let from = 0;
  process.stdout.write('Fetching all questions...\n');
  while (true) {
    const { data, error } = await sb
      .from('questions')
      .select('id, unit, topic, stem, cadre, paper, status')
      .range(from, from + PAGE - 1);
    if (error) { console.error('Error:', error.message); break; }
    if (!data || data.length === 0) break;
    all = all.concat(data);
    process.stdout.write(`  Batch ${Math.ceil(all.length / PAGE)}: fetched ${all.length} so far...\n`);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  process.stdout.write(`\nTotal fetched: ${all.length}\n\n`);
  return all;
}

// ── CLASSIFY A QUESTION ────────────────────────────────────────────────────────
function classifyQuestion(q) {
  const assignedUnit = (q.unit || 'UNASSIGNED').trim();
  const topic = (q.topic || '').trim();
  const topicLower = topic.toLowerCase();
  const stemLower = (q.stem || '').toLowerCase();
  const cadre = q.cadre || 'KRCHN';
  const currentPaper = q.paper || '';

  const issues = [];
  const fixes = {};

  // 1. Check for non-canonical unit name → must be renamed
  const renamedUnit = UNIT_RENAME_MAP[assignedUnit];
  let effectiveUnit = renamedUnit || assignedUnit;

  if (renamedUnit) {
    issues.push(`Unit "${assignedUnit}" is non-canonical → should be "${renamedUnit}"`);
    fixes.unit = renamedUnit;
    effectiveUnit = renamedUnit;
  }

  // 2. Check if unit is not in canonical list at all (unknown)
  if (!CANONICAL_UNITS.has(effectiveUnit) && !renamedUnit) {
    // Special handling for units that exist but aren't in canonical set
    // e.g. Communicable Diseases, Epidemiology, Parasitology, Microbiology
    // These are real NCK topics but may need to be assigned to a canonical unit
    if (['Communicable Diseases', 'Epidemiology', 'Parasitology', 'Microbiology',
         'Health Education & Sociology', 'Communicable Diseases'].includes(effectiveUnit)) {
      // These exist but aren't in §12 canonical list
      // They should map to Community Health Nursing (KRCHN Paper II) or appropriate unit
      // But we won't force-reclassify them - just note it
      issues.push(`Unit "${effectiveUnit}" is not in the §12 canonical unit list — content may be correct but unit name needs review`);
    }
  }

  // 3. Check topic → unit alignment using definitive topic map
  const definedCorrectUnit = DEFINITIVE_TOPIC_TO_UNIT[topic];
  if (definedCorrectUnit && definedCorrectUnit !== effectiveUnit) {
    // Cross-check: is it gynaecological (Med-Surg) vs MCH vs Midwifery?
    const isCorrectlyInMCH = effectiveUnit === 'Maternal & Child Health' &&
      ['Cervical Cancer Screening', 'Neonatal Prophylaxis', 'Family Planning',
       'Immunisation', 'Immunization', 'Growth Monitoring'].includes(topic);

    if (!isCorrectlyInMCH) {
      issues.push(`Topic "${topic}" should be in "${definedCorrectUnit}" but is in "${effectiveUnit}"`);
      if (!fixes.unit) fixes.unit = definedCorrectUnit;
    }
  }

  // 4. Check paper assignment is correct per §12
  const expectedPaper = PAPER_MAP[effectiveUnit]?.[cadre];
  if (expectedPaper && currentPaper && currentPaper !== expectedPaper) {
    issues.push(`Paper "${currentPaper}" is wrong for ${effectiveUnit}/${cadre} → should be "${expectedPaper}"`);
    fixes.paper = expectedPaper;
  }

  // 5. Specific content-based checks for clear mismatches
  // Fracture complications under Labour and Delivery → wrong topic label
  if (topicLower === 'labour and delivery' && stemLower.includes('fracture')) {
    issues.push('STEM IS ABOUT FRACTURES but topic is "Labour and Delivery" — stem mismatch, topic label is wrong');
    fixes.topic = 'Musculoskeletal Disorders';
    if (!fixes.unit) fixes.unit = 'Medical-Surgical Nursing';
  }

  return { issues, fixes, effectiveUnit };
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  const questions = await fetchAll();

  const results = {
    total: questions.length,
    perfect: 0,
    needsFix: 0,
    fixDetails: {},
    unitStats: {},
    paperStats: { wrong: 0, correct: 0, missing: 0 },
    batchResults: [],
  };

  const allFixes = []; // accumulate all questions that need DB fixes

  // Process in batches of 500
  const BATCH = 500;
  const numBatches = Math.ceil(questions.length / BATCH);

  for (let b = 0; b < numBatches; b++) {
    const batch = questions.slice(b * BATCH, (b + 1) * BATCH);
    const batchFixes = [];
    let batchPerfect = 0;

    for (const q of batch) {
      const assignedUnit = (q.unit || 'UNASSIGNED').trim();

      // Unit stats
      if (!results.unitStats[assignedUnit]) {
        results.unitStats[assignedUnit] = { total: 0, issues: 0, perfect: 0 };
      }
      results.unitStats[assignedUnit].total++;

      const { issues, fixes, effectiveUnit } = classifyQuestion(q);

      if (issues.length === 0) {
        results.perfect++;
        results.unitStats[assignedUnit].perfect++;
        batchPerfect++;
      } else {
        results.needsFix++;
        results.unitStats[assignedUnit].issues++;
        batchFixes.push({ id: q.id, unit: assignedUnit, topic: q.topic, cadre: q.cadre, paper: q.paper, stem: q.stem?.substring(0, 100), issues, fixes });
        allFixes.push({ id: q.id, unit: assignedUnit, topic: q.topic, cadre: q.cadre, paper: q.paper, stem: q.stem?.substring(0, 100), issues, fixes });
      }
    }

    results.batchResults.push({ batch: b + 1, from: b * BATCH + 1, to: Math.min((b + 1) * BATCH, questions.length), perfect: batchPerfect, issues: batchFixes.length });
    process.stdout.write(`  Batch ${b + 1}/${numBatches}: ${batchPerfect} OK | ${batchFixes.length} need fix\n`);
  }

  // ── PRINT REPORT ────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(80));
  console.log('DEFINITIVE NCK UNIT CLASSIFICATION AUDIT — FULL RESULTS');
  console.log('='.repeat(80));
  console.log(`Total questions:   ${results.total}`);
  console.log(`Perfect (no issues): ${results.perfect} (${pct(results.perfect, results.total)}%)`);
  console.log(`Need fixing:         ${results.needsFix} (${pct(results.needsFix, results.total)}%)`);

  console.log('\n' + '─'.repeat(80));
  console.log('UNIT BREAKDOWN');
  console.log('─'.repeat(80));
  console.log('Unit'.padEnd(45) + 'Total'.padStart(7) + 'Perfect'.padStart(10) + 'Issues'.padStart(8) + '  %OK');
  console.log('─'.repeat(80));
  Object.entries(results.unitStats)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([u, s]) => {
      const ok = pct(s.perfect, s.total);
      const flag = s.issues > 0 ? ' ⚠️' : '';
      console.log(`${(u + flag).padEnd(47)}${s.total.toString().padStart(5)}${s.perfect.toString().padStart(10)}${s.issues.toString().padStart(8)}   ${ok}%`);
    });

  console.log('\n' + '─'.repeat(80));
  console.log('QUESTIONS NEEDING CORRECTION — GROUPED BY ISSUE TYPE');
  console.log('─'.repeat(80));

  // Group by issue type
  const byIssueType = {};
  allFixes.forEach(q => {
    q.issues.forEach(issue => {
      const key = issue.substring(0, 80);
      if (!byIssueType[key]) byIssueType[key] = [];
      byIssueType[key].push(q);
    });
  });

  Object.entries(byIssueType)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 30)
    .forEach(([issue, qs]) => {
      console.log(`\n[${qs.length}x] ${issue}`);
      qs.slice(0, 2).forEach(q => {
        console.log(`  cadre=${q.cadre} unit="${q.unit}" topic="${q.topic}"`);
        if (Object.keys(q.fixes).length > 0) {
          console.log(`  FIX: ${JSON.stringify(q.fixes)}`);
        }
      });
    });

  // Save full results
  fs.writeFileSync('scripts/definitive_audit_results.json', JSON.stringify({ ...results, allFixes }, null, 2));
  console.log('\n\nFull results saved to: scripts/definitive_audit_results.json');
}

function pct(n, d) { return d > 0 ? Math.round(n / d * 100) : 0; }

main().catch(console.error);
