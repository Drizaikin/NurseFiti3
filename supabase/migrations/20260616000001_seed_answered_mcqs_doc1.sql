-- =============================================================================
-- SEED: NCK Answered MCQs with Rationales — Document 1
-- =============================================================================
-- Source: NCK-Answered-MCQs-with-Rationales 1.docx
-- exam_year: NULL (document explicitly states no exam years were present)
-- Cadre: BScN and KRCHN (same question set; dual-seeded where criteria met)
-- Paper: Roman numeral format per nck-exam-system.md Section 12
-- Status: approved | contributor_id: NULL (platform-owned)
-- Deduplication: Questions with stems already seeded are EXCLUDED
-- =============================================================================
-- AUDIT DECISIONS:
-- Paper I  (KRCHN) = Medical-Surgical, Pharmacology, Paediatric, Midwifery, A&P, Surgical
-- Paper II (KRCHN) = Community Health, Mental Health, Environmental, Nutrition,
--                    Research & Statistics, Health Systems & Management, IPC
-- Paper I  (BScN)  = Medical-Surgical, Pharmacology, A&P, Critical Care, Surgical,
--                    Midwifery, Maternal & Child Health, Paediatric Nursing
--                    + Mental Health (BScN Paper I per NCK convention)
-- Paper II (BScN)  = Community/Public Health, Research & EBP, Leadership,
--                    Mental Health* (*KRCHN only), Professional Ethics & Law,
--                    Health Systems, IPC, Nutrition
-- =============================================================================
-- EXCLUDED (already seeded with matching/near-identical stems):
--   Dysthymia Q208/Q7 — already in 20260526000004 and 20260526000005
--   Delirium tremens Q51 — substance of alcohol withdrawal already seeded
--   Naloxone/opioid overdose — seeded in 20260526000001
--   Herd immunity Q145 — seeded in 20260526000005
--   Ascaris migratory phase Q144 — seeded in 20260526000006
--   Pit latrine siting Q67 — seeded in 20260526000005/00006
--   Hawthorne effect Q87 — context already seeded in 20260526000004
--   Post-tonsillectomy bleeding Q262 — post-tonsillectomy care seeded in 20260608000001
--   Sickle cell / fetal Hb Q265 — sickle cell questions seeded in 20260608000001
--   Glomerulonephritis Q1/Q213 — treatment goal seeded in 20260608000001
--   Rickets Q214 — seeded in 20260526000005
--   Community diagnosis sequence Q151 — seeded in 20260526000004
--   Snowball sampling Q205 — snowball context seeded in 20260526000006
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 1: PAEDIATRIC NURSING — BScN Paper I & KRCHN Paper I
-- ─────────────────────────────────────────────────────────────────────────────

-- Q2 — Metabolic acidosis in infant: tachypnea
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Fluid & Electrolyte Balance',
 'When caring for an 11-month-old infant with dehydration and metabolic acidosis, the nurse expects to see:',
 'A reduced white blood cell count',
 'A decreased platelet count',
 'Shallow respirations',
 'Tachypnea',
 'D',
 'In metabolic acidosis the body compensates respiratorily by blowing off CO2, producing deep, rapid breathing (Kussmaul respirations/tachypnea). Shallow respirations would worsen acidosis by retaining CO2. WBC and platelet changes are not characteristic of metabolic acidosis. Ref: Kenya IMNCI dehydration assessment; physiology of acid-base balance (standard paediatric nursing texts).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Fluid & Electrolyte Balance',
 'When caring for an 11-month-old infant with dehydration and metabolic acidosis, the nurse expects to see:',
 'A reduced white blood cell count',
 'A decreased platelet count',
 'Shallow respirations',
 'Tachypnea',
 'D',
 'In metabolic acidosis the body compensates respiratorily by blowing off CO2, producing deep, rapid breathing (Kussmaul respirations/tachypnea). Shallow respirations would worsen acidosis by retaining CO2. WBC and platelet changes are not characteristic of metabolic acidosis. Ref: Kenya IMNCI dehydration assessment; physiology of acid-base balance (standard paediatric nursing texts).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 — Meningococcal meningitis: priority nursing intervention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Communicable Diseases',
 'A 4-month-old with meningococcal meningitis has just been admitted to the paediatric unit. The priority nursing intervention is:',
 'Instituting droplet precautions',
 'Administering acetaminophen',
 'Obtaining history information from the parents',
 'Orienting the parents to the paediatric unit',
 'A',
 'Neisseria meningitidis is transmitted via respiratory droplets; droplet precautions protect other patients and staff and are the immediate infection-control priority on admission. History, antipyretics and orientation follow. Ref: MOH IPC guidelines; Kenya communicable disease control protocols.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Communicable Diseases',
 'A 4-month-old with meningococcal meningitis has just been admitted to the paediatric unit. The priority nursing intervention is:',
 'Instituting droplet precautions',
 'Administering acetaminophen',
 'Obtaining history information from the parents',
 'Orienting the parents to the paediatric unit',
 'A',
 'Neisseria meningitidis is transmitted via respiratory droplets; droplet precautions protect other patients and staff and are the immediate infection-control priority on admission. History, antipyretics and orientation follow. Ref: MOH IPC guidelines; Kenya communicable disease control protocols.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 — Allopurinol in leukaemia: prevent renal stones
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Paediatric Oncology',
 'Allopurinol is included in the regimen of a child undergoing remission induction therapy to treat leukaemia. The main reason for administering allopurinol is to:',
 'Prevent renal stones',
 'Prevent bleeding tendencies',
 'Enhance the production of uric acid to ensure adequate excretion of urine',
 'Ensure that the chemotherapy does not adversely affect the bone marrow',
 'A',
 'Rapid tumour-cell lysis during chemotherapy releases purines that are metabolised to uric acid, which can crystallise and cause urate nephropathy and renal stones (tumour lysis syndrome). Allopurinol inhibits xanthine oxidase, reducing uric acid production and preventing renal stones. Option C is incorrect because it states "enhance" production. Ref: Kenya Basic Paediatric Protocols; paediatric oncology nursing texts.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 — Severe asthma exacerbation risk: steroid-dependent history
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Respiratory Disorders',
 'The finding that would alert a nurse that a hospitalized 6-year-old child is at risk for a severe asthma exacerbation is:',
 'Oxygen saturation of 95%',
 'Mild work of breathing',
 'Absence of intercostal or substernal retractions',
 'History of steroid-dependent asthma',
 'D',
 'Steroid-dependent asthma and previous ICU admissions or near-fatal episodes identify a child at high risk of severe, life-threatening exacerbation. SpO2 of 95%, mild work of breathing and absence of retractions are reassuring findings. Ref: Kenya Paediatric Protocols; paediatric respiratory nursing; asthma severity risk factors.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Respiratory Disorders',
 'The finding that would alert a nurse that a hospitalized 6-year-old child is at risk for a severe asthma exacerbation is:',
 'Oxygen saturation of 95%',
 'Mild work of breathing',
 'Absence of intercostal or substernal retractions',
 'History of steroid-dependent asthma',
 'D',
 'Steroid-dependent asthma and previous ICU admissions or near-fatal episodes identify a child at high risk of severe, life-threatening exacerbation. SpO2 of 95%, mild work of breathing and absence of retractions are reassuring findings. Ref: Kenya Paediatric Protocols; paediatric respiratory nursing; asthma severity risk factors.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q21 — Childhood lymphoma: Non-Hodgkin's
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Paediatric Oncology',
 'The following is a lymphoma that affects children:',
 'Non-Hodgkin''s disease',
 'Acute lymphoblastic disease',
 'Acute myeloid leukaemia',
 'Wilms tumour',
 'A',
 'Lymphomas are malignancies of lymphoid tissue; non-Hodgkin lymphoma (NHL) is a common childhood lymphoma. Acute lymphoblastic leukaemia (ALL) and acute myeloid leukaemia (AML) are leukaemias, not lymphomas. Wilms tumour (nephroblastoma) is a renal embryonal tumour. Ref: Kenya Basic Paediatric Protocols; paediatric oncology nursing.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Paediatric Oncology',
 'The following is a lymphoma that affects children:',
 'Non-Hodgkin''s disease',
 'Acute lymphoblastic disease',
 'Acute myeloid leukaemia',
 'Wilms tumour',
 'A',
 'Lymphomas are malignancies of lymphoid tissue; non-Hodgkin lymphoma (NHL) is a common childhood lymphoma. ALL and AML are leukaemias, not lymphomas. Wilms tumour is a renal embryonal tumour. Ref: Kenya Basic Paediatric Protocols; paediatric oncology nursing.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q22 — Vitamin B group deficiencies: haematuria NOT associated
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Nutrition',
 'The following is NOT associated with Vitamin B group deficiencies:',
 'Angular cheilitis',
 'Haematuria',
 'Pellagra',
 'Beriberi',
 'B',
 'Angular cheilitis is caused by riboflavin (B2) deficiency; pellagra by niacin (B3/nicotinic acid) deficiency; beriberi by thiamine (B1) deficiency — all are B-vitamin deficiency states. Haematuria (blood in urine) is not associated with any B-vitamin deficiency. Ref: Nutrition in Nursing (standard Kenya nursing texts); MOH nutrition guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Nutrition',
 'The following is NOT associated with Vitamin B group deficiencies:',
 'Angular cheilitis',
 'Haematuria',
 'Pellagra',
 'Beriberi',
 'B',
 'Angular cheilitis is caused by riboflavin (B2) deficiency; pellagra by niacin (B3/nicotinic acid) deficiency; beriberi by thiamine (B1) deficiency — all are B-vitamin deficiency states. Haematuria (blood in urine) is not associated with any B-vitamin deficiency. Ref: Nutrition in Nursing (standard Kenya nursing texts); MOH nutrition guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q23 — Developmental milestones: 6 months (hand-to-hand transfer)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Growth and Development',
 'An infant who has no head lag when pulled to a sitting position, is able to reach for objects and transfer them from hand to hand is likely to be in what age?',
 '4 months',
 '6 months',
 '9 months',
 '12 months',
 'B',
 'Hand-to-hand transfer of objects and absent head lag are hallmark developmental milestones at approximately 6 months. At 4 months, head lag is still resolving and hand-to-hand transfer is not yet present. Ref: Growth and development milestones; MOH Well-Child surveillance guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Growth and Development',
 'An infant who has no head lag when pulled to a sitting position, is able to reach for objects and transfer them from hand to hand is likely to be in what age?',
 '4 months',
 '6 months',
 '9 months',
 '12 months',
 'B',
 'Hand-to-hand transfer of objects and absent head lag are hallmark developmental milestones at approximately 6 months. At 4 months, head lag is still resolving and hand-to-hand transfer is not yet present. Ref: Growth and development milestones; MOH Well-Child surveillance guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q24 — Nutrient requirements: sex of child least influential in childhood
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Nutrition',
 'The nutrient requirements of children are NOT influenced by:',
 'Growth rate',
 'Body composition',
 'Composition of new growth',
 'Sex of the child',
 'D',
 'Energy and nutrient needs in childhood are driven primarily by growth velocity, body composition and the composition of newly formed tissue. Sex differences in nutrient requirement become significant mainly at puberty, not in young children. Ref: Kenya MOH Nutrition guidelines; paediatric nutrition texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Nutrition',
 'The nutrient requirements of children are NOT influenced by:',
 'Growth rate',
 'Body composition',
 'Composition of new growth',
 'Sex of the child',
 'D',
 'Energy and nutrient needs in childhood are driven primarily by growth velocity, body composition and the composition of newly formed tissue. Sex differences in nutrient requirement become significant mainly at puberty, not in young children. Ref: Kenya MOH Nutrition guidelines; paediatric nutrition texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q46 — Normal growth: birth length 20 inches, 30 inches at 1 year
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Growth and Development',
 'The following statement is true regarding normal growth and development of a child:',
 'Average length of a child is 20 inches at birth and 30 inches at 1 year',
 'At the age of 3 years, the average child is 6 feet tall',
 'At age 4 years, the average child is 80 inches tall',
 'The average annual height increase is 10 inches between age 4 years and puberty',
 'A',
 'Average birth length is approximately 50 cm (20 inches) and increases to approximately 75 cm (30 inches) by 1 year, representing a 50% increase. The other options give physically impossible heights for young children. Ref: Growth and development standards; WHO Child Growth Standards.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Growth and Development',
 'The following statement is true regarding normal growth and development of a child:',
 'Average length of a child is 20 inches at birth and 30 inches at 1 year',
 'At the age of 3 years, the average child is 6 feet tall',
 'At age 4 years, the average child is 80 inches tall',
 'The average annual height increase is 10 inches between age 4 years and puberty',
 'A',
 'Average birth length is approximately 50 cm (20 inches) and increases to approximately 75 cm (30 inches) by 1 year, representing a 50% increase. The other options give physically impossible heights for young children. Ref: Growth and development standards; WHO Child Growth Standards.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q47 — Normal paediatric respiratory anatomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Anatomy & Physiology',
 'The following is a normal finding in paediatric respiratory assessment:',
 'Large head, large mandible',
 'Small posteriorly-placed tongue',
 'Large airways, rigid thoracic cage',
 'Horizontal ribs, primarily diaphragm breathers',
 'D',
 'Infants and young children have horizontally placed ribs and a highly compliant chest wall, making them predominantly diaphragmatic (belly) breathers. They have a relatively large tongue, small narrow airways and a compliant (not rigid) thoracic cage. Ref: Paediatric anatomy and physiology (standard Kenya nursing texts).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Anatomy & Physiology',
 'The following is a normal finding in paediatric respiratory assessment:',
 'Large head, large mandible',
 'Small posteriorly-placed tongue',
 'Large airways, rigid thoracic cage',
 'Horizontal ribs, primarily diaphragm breathers',
 'D',
 'Infants and young children have horizontally placed ribs and a highly compliant chest wall, making them predominantly diaphragmatic (belly) breathers. They have a relatively large tongue, small narrow airways and a compliant (not rigid) thoracic cage. Ref: Paediatric anatomy and physiology (standard Kenya nursing texts).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q48 — Hepatomegaly: sign of right-sided heart failure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'When palpating a child''s abdomen you note hepatomegaly. You know this can be a sign of what cardiac problem?',
 'Right-sided heart failure',
 'Left-sided heart failure',
 'Rheumatic heart disease',
 'Anaemia',
 'A',
 'Right-sided heart failure causes systemic venous congestion, leading to hepatomegaly and peripheral oedema as blood backs up into the systemic venous system. Left-sided heart failure causes pulmonary congestion and pulmonary oedema. Ref: Paediatric cardiology nursing; standard Kenya medical-surgical nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'When palpating a child''s abdomen you note hepatomegaly. You know this can be a sign of what cardiac problem?',
 'Right-sided heart failure',
 'Left-sided heart failure',
 'Rheumatic heart disease',
 'Anaemia',
 'A',
 'Right-sided heart failure causes systemic venous congestion, leading to hepatomegaly and peripheral oedema as blood backs up into the systemic venous system. Left-sided failure causes pulmonary congestion. Ref: Paediatric cardiology nursing; standard Kenya medical-surgical nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q50 — Status epilepticus trigger: electrolyte imbalance
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Neurological Disorders',
 'What type of imbalance is typically a trigger for status epilepticus in a vulnerable child?',
 'Temperature',
 'Electrolyte',
 'Hormonal',
 'Fluid',
 'B',
 'Electrolyte disturbances — notably hypoglycaemia, hyponatraemia and hypocalcaemia — commonly precipitate status epilepticus in susceptible children by altering neuronal membrane excitability. Ref: Kenya Basic Paediatric Protocols; neurological nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Neurological Disorders',
 'What type of imbalance is typically a trigger for status epilepticus in a vulnerable child?',
 'Temperature',
 'Electrolyte',
 'Hormonal',
 'Fluid',
 'B',
 'Electrolyte disturbances — notably hypoglycaemia, hyponatraemia and hypocalcaemia — commonly precipitate status epilepticus in susceptible children by altering neuronal membrane excitability. Ref: Kenya Basic Paediatric Protocols; neurological nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q93 — Infant fluid requirements
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Fluid & Electrolyte Balance',
 'The fluid requirements in an infant are mainly determined by:',
 'Insensible losses and urine losses',
 'Stool output and insensible losses',
 'Nasogastric and urine output',
 'Nasogastric and insensible losses',
 'A',
 'Maintenance fluid needs are calculated from insensible losses (skin and respiratory losses) plus urinary losses, which form the largest ongoing physiological losses in infants. This forms the basis of the Holliday-Segar method for paediatric fluid management. Ref: Kenya Basic Paediatric Protocols; paediatric fluid management (Holliday-Segar).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Fluid & Electrolyte Balance',
 'The fluid requirements in an infant are mainly determined by:',
 'Insensible losses and urine losses',
 'Stool output and insensible losses',
 'Nasogastric and urine output',
 'Nasogastric and insensible losses',
 'A',
 'Maintenance fluid needs are calculated from insensible losses (skin and respiratory losses) plus urinary losses, which form the largest ongoing physiological losses in infants. This forms the basis of the Holliday-Segar method for paediatric fluid management. Ref: Kenya Basic Paediatric Protocols; paediatric fluid management (Holliday-Segar).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q94 — Kerosene inhalation complications
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Poisoning & Toxicology',
 'The common complications associated with kerosene (paraffin) inhalation are:',
 'Hypoxia, bacterial pneumonia and emphysema',
 'Bronchospasms, CNS depression and gastritis',
 'Gastritis, respiratory distress and hypoxia',
 'Alveolar haemorrhage, emphysema and anaemia',
 'C',
 'Paraffin/kerosene ingestion-aspiration commonly produces chemical pneumonitis with gastritis, respiratory distress and hypoxia. Aspiration into the lungs is the key danger, causing hydrocarbon pneumonitis. Emphysema and alveolar haemorrhage are not the expected presenting complications. Ref: Kenya Paediatric Protocols (poisoning management).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Poisoning & Toxicology',
 'The common complications associated with kerosene (paraffin) inhalation are:',
 'Hypoxia, bacterial pneumonia and emphysema',
 'Bronchospasms, CNS depression and gastritis',
 'Gastritis, respiratory distress and hypoxia',
 'Alveolar haemorrhage, emphysema and anaemia',
 'C',
 'Paraffin/kerosene ingestion-aspiration commonly produces chemical pneumonitis with gastritis, respiratory distress and hypoxia. Aspiration into the lungs is the key danger, causing hydrocarbon pneumonitis. Ref: Kenya Paediatric Protocols (poisoning management).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q96 — IMNCI general danger signs
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'IMNCI',
 'The general danger signs in a sick child include:',
 'Vomiting, anaemia and restlessness',
 'Lethargy, convulsions and not breastfeeding',
 'Poor feeding, lethargy and anaemia',
 'Irritability, unconsciousness and apathy',
 'B',
 'IMNCI general danger signs are: not able to drink or breastfeed, vomiting everything, convulsions (current or history), and lethargy or unconsciousness. Option B correctly lists three recognized IMNCI general danger signs. Ref: Kenya IMNCI guidelines (MOH Division of Child and Adolescent Health).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMNCI',
 'The general danger signs in a sick child include:',
 'Vomiting, anaemia and restlessness',
 'Lethargy, convulsions and not breastfeeding',
 'Poor feeding, lethargy and anaemia',
 'Irritability, unconsciousness and apathy',
 'B',
 'IMNCI general danger signs are: not able to drink or breastfeed, vomiting everything, convulsions (current or history), and lethargy or unconsciousness. Option B correctly lists three recognized IMNCI general danger signs. Ref: Kenya IMNCI guidelines (MOH Division of Child and Adolescent Health).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q211 — Intussusception in 2-year-old: blood-stained stools
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Gastrointestinal Disorders',
 'The following is associated with intussusception in a 2-year-old:',
 'Blood-stained stools',
 'Projectile vomiting',
 'Ribbon-like stools',
 'Palpable mass over the flank',
 'A',
 'Intussusception classically presents with red-currant jelly (blood-stained, mucoid) stools, colicky abdominal pain and a sausage-shaped abdominal mass in the right upper quadrant. Projectile vomiting is characteristic of pyloric stenosis; ribbon-like stools suggest Hirschsprung disease. Ref: Kenya Basic Paediatric Protocols; paediatric surgical nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Gastrointestinal Disorders',
 'The following is associated with intussusception in a 2-year-old:',
 'Blood-stained stools',
 'Projectile vomiting',
 'Ribbon-like stools',
 'Palpable mass over the flank',
 'A',
 'Intussusception classically presents with red-currant jelly (blood-stained, mucoid) stools, colicky abdominal pain and a sausage-shaped abdominal mass in the right upper quadrant. Projectile vomiting is characteristic of pyloric stenosis; ribbon-like stools suggest Hirschsprung disease. Ref: Kenya Basic Paediatric Protocols; paediatric surgical nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q212 — SpO2 78% in asthmatic child: administer oxygen
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Respiratory Disorders',
 'A nurse finds an oxygen saturation of 78% in a 9-year-old child with asthma; the best action to take would be:',
 'Notify the physician',
 'Do nothing as this is normal',
 'Administer oxygen',
 'Assess the child''s pulse',
 'C',
 'SpO2 of 78% represents severe, life-threatening hypoxaemia. The immediate priority following the ABC principle is to administer oxygen, then notify the physician. Any delay in oxygenation risks rapid deterioration and cardiac arrest. Ref: Emergency paediatric nursing; Kenya Paediatric Protocols; ABC priority framework.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Respiratory Disorders',
 'A nurse finds an oxygen saturation of 78% in a 9-year-old child with asthma; the best action to take would be:',
 'Notify the physician',
 'Do nothing as this is normal',
 'Administer oxygen',
 'Assess the child''s pulse',
 'C',
 'SpO2 of 78% represents severe, life-threatening hypoxaemia. The immediate priority following the ABC principle is to administer oxygen, then notify the physician. Any delay in oxygenation risks rapid deterioration and cardiac arrest. Ref: Emergency paediatric nursing; Kenya Paediatric Protocols; ABC priority framework.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q215 — IMCI danger signs (Q96 variant with convulsion+vomiting everything)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'IMNCI',
 'Danger signs according to the IMCI approach include:',
 'Convulsion, vomiting everything',
 'Vomiting everything, poor feeding',
 'Poor feeding, lethargy',
 'Lethargy, refusing to feed',
 'A',
 'IMNCI general danger signs include convulsions and vomiting everything (along with inability to drink or breastfeed, and lethargy or unconsciousness). Option A correctly contains two of the four recognized IMNCI general danger signs. Ref: Kenya IMNCI guidelines (MOH).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMNCI',
 'Danger signs according to the IMCI approach include:',
 'Convulsion, vomiting everything',
 'Vomiting everything, poor feeding',
 'Poor feeding, lethargy',
 'Lethargy, refusing to feed',
 'A',
 'IMNCI general danger signs include convulsions and vomiting everything (along with inability to drink or breastfeed, and lethargy or unconsciousness). Option A correctly contains two of the four recognized IMNCI general danger signs. Ref: Kenya IMNCI guidelines (MOH).',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q226 — Epiglottitis management: high-concentration oxygen
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Respiratory Disorders',
 'Management of epiglottitis in children includes:',
 'Administration of oxygen in high concentration',
 'Administration of oral antibiotics',
 'Visualizing airway to assess extent of disease',
 'Encouraging mother to administer medication at home',
 'A',
 'Epiglottitis is an airway emergency: give high-concentration oxygen, keep the child calm and upright, and prepare for airway support. IV antibiotics (not oral) are used once the airway is secured. The throat must NOT be examined with a spatula or tongue depressor as this risks triggering complete obstruction. Ref: Kenya Paediatric Protocols; paediatric emergency nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Respiratory Disorders',
 'Management of epiglottitis in children includes:',
 'Administration of oxygen in high concentration',
 'Administration of oral antibiotics',
 'Visualizing airway to assess extent of disease',
 'Encouraging mother to administer medication at home',
 'A',
 'Epiglottitis is an airway emergency: give high-concentration oxygen, keep the child calm and upright, and prepare for airway support. IV antibiotics (not oral) are used once the airway is secured. The throat must NOT be examined with a spatula as this risks triggering complete obstruction. Ref: Kenya Paediatric Protocols; paediatric emergency nursing.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q227 — Vitamin K injection site in infant: vastus lateralis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Medication Administration',
 'A nurse is administering an injection of Vitamin K to a 30-day-old infant. Which target area is most appropriate?',
 'Gluteus maximus',
 'Gluteus minimus',
 'Vastus lateralis',
 'Vastus medialis',
 'C',
 'The vastus lateralis (anterolateral thigh) is the preferred intramuscular injection site in infants because it is well developed at birth and avoids the sciatic nerve and the underdeveloped gluteal muscles. The gluteal muscles are not recommended until children have been walking for at least 1 year. Ref: Kenya MOH Immunization technique guidelines; paediatric medication administration.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Medication Administration',
 'A nurse is administering an injection of Vitamin K to a 30-day-old infant. Which target area is most appropriate?',
 'Gluteus maximus',
 'Gluteus minimus',
 'Vastus lateralis',
 'Vastus medialis',
 'C',
 'The vastus lateralis (anterolateral thigh) is the preferred intramuscular injection site in infants because it is well developed at birth and avoids the sciatic nerve and the underdeveloped gluteal muscles. The gluteal muscles are not recommended until children have been walking for at least 1 year. Ref: Kenya MOH Immunization technique guidelines; paediatric medication administration.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q228 — Toilet training: child readiness
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Growth and Development',
 'The following factor is the most important aspect of toilet training:',
 'The age of the child',
 'The child''s ability to understand instruction',
 'The overall mental and physical abilities (readiness) of the child',
 'Frequent attempts with positive reinforcement',
 'C',
 'Successful toilet training depends primarily on physiological and developmental readiness — including neuromuscular maturity and cognitive ability — rather than chronological age alone. The child must be able to recognize the urge, control the sphincter and communicate the need. Ref: Growth and development; child health nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Growth and Development',
 'The following factor is the most important aspect of toilet training:',
 'The age of the child',
 'The child''s ability to understand instruction',
 'The overall mental and physical abilities (readiness) of the child',
 'Frequent attempts with positive reinforcement',
 'C',
 'Successful toilet training depends primarily on physiological and developmental readiness — including neuromuscular maturity and cognitive ability — rather than chronological age alone. The child must be able to recognize the urge, control the sphincter and communicate the need. Ref: Growth and development; child health nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q229 — Congenital heart defect clinical sign: weight gain (fluid retention)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'A nurse is caring for an infant recently diagnosed with a congenital heart defect. Which clinical sign would most likely be present?',
 'Slow pulse rate',
 'Weight gain',
 'Decreased systolic pressure',
 'Irregular WBC lab values',
 'B',
 'Infants with congenital heart disease and heart failure retain fluid, leading to weight gain (oedema) along with tachycardia (not bradycardia), tachypnoea and feeding difficulty. Weight gain from fluid retention is the expected finding. Ref: Paediatric cardiac nursing; standard Kenya nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'A nurse is caring for an infant recently diagnosed with a congenital heart defect. Which clinical sign would most likely be present?',
 'Slow pulse rate',
 'Weight gain',
 'Decreased systolic pressure',
 'Irregular WBC lab values',
 'B',
 'Infants with congenital heart disease and heart failure retain fluid, leading to weight gain (oedema) along with tachycardia (not bradycardia), tachypnoea and feeding difficulty. Weight gain from fluid retention is the expected finding. Ref: Paediatric cardiac nursing; standard Kenya nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q256 — Congenital heart disease nursing focus: improve cardiac function
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'The primary focus in the nursing care of children suffering from congenital heart disease is to:',
 'Improve cardiac function',
 'Improve renal output',
 'Enable the child to resume schooling',
 'Increase cardiac demand',
 'A',
 'The overriding goal in caring for a child with congenital heart disease is to support and improve cardiac function — reducing myocardial workload, managing heart failure, optimising oxygenation and nutrition, and preventing complications. Ref: Paediatric cardiology nursing; standard Kenya nursing textbooks.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Cardiovascular Disorders',
 'The primary focus in the nursing care of children suffering from congenital heart disease is to:',
 'Improve cardiac function',
 'Improve renal output',
 'Enable the child to resume schooling',
 'Increase cardiac demand',
 'A',
 'The overriding goal in caring for a child with congenital heart disease is to support and improve cardiac function — reducing myocardial workload, managing heart failure, optimising oxygenation and nutrition, and preventing complications. Ref: Paediatric cardiology nursing; standard Kenya nursing textbooks.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q257 — IMNCI classification: stridor = severe pneumonia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'IMNCI',
 'A 9-month-old infant with 40 breaths per minute, a cough and a stridor is classified as having:',
 'Pneumonia',
 'Severe pneumonia',
 'Asthma',
 'Bronchitis',
 'B',
 'Under IMNCI, stridor in a calm child is a sign of severe respiratory illness. Cough with stridor classifies as severe pneumonia or very severe disease, requiring immediate referral and emergency treatment regardless of the respiratory rate. Ref: Kenya IMNCI classification and treatment guidelines (MOH).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMNCI',
 'A 9-month-old infant with 40 breaths per minute, a cough and a stridor is classified as having:',
 'Pneumonia',
 'Severe pneumonia',
 'Asthma',
 'Bronchitis',
 'B',
 'Under IMNCI, stridor in a calm child is a sign of severe respiratory illness. Cough with stridor classifies as severe pneumonia or very severe disease, requiring immediate referral and emergency treatment regardless of the respiratory rate. Ref: Kenya IMNCI classification and treatment guidelines (MOH).',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q258 — Cretinism = congenital hypothyroidism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Endocrine Disorders',
 'Cretinism is a term used to describe:',
 'Hypothyroidism',
 'Hyperthyroidism',
 'Thyroiditis',
 'Thyrotoxicosis',
 'A',
 'Cretinism is congenital hypothyroidism, caused by thyroid hormone deficiency in utero or in early infancy, resulting in severe impairment of physical growth and intellectual development if left untreated. Prompt neonatal screening and thyroxine replacement prevents permanent disability. Ref: Paediatric endocrinology; Kenya neonatal screening guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Endocrine Disorders',
 'Cretinism is a term used to describe:',
 'Hypothyroidism',
 'Hyperthyroidism',
 'Thyroiditis',
 'Thyrotoxicosis',
 'A',
 'Cretinism is congenital hypothyroidism, caused by thyroid hormone deficiency in utero or in early infancy, resulting in severe impairment of physical growth and intellectual development if left untreated. Ref: Paediatric endocrinology; Kenya neonatal screening guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q260 — Atopic dermatitis management: gentle bathing with emollient cleanser
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Dermatological Disorders',
 'Management of atopic dermatitis (eczema) in children includes:',
 'Gentle bathing with liquid soap (mild emollient cleanser)',
 'Long course of antibiotic therapy up to 3 months',
 'Use of topical antiviral drugs',
 'Administration of fluphenazine regularly',
 'A',
 'Atopic dermatitis management centres on skin hydration: gentle bathing with mild non-soap cleansers, liberal emollient application and topical corticosteroids for flares. Antibiotics are only indicated for secondary bacterial infection, not routinely. Fluphenazine (antipsychotic) has no role. Ref: Paediatric dermatology nursing; standard Kenya nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Dermatological Disorders',
 'Management of atopic dermatitis (eczema) in children includes:',
 'Gentle bathing with liquid soap (mild emollient cleanser)',
 'Long course of antibiotic therapy up to 3 months',
 'Use of topical antiviral drugs',
 'Administration of fluphenazine regularly',
 'A',
 'Atopic dermatitis management centres on skin hydration: gentle bathing with mild non-soap cleansers, liberal emollient application and topical corticosteroids for flares. Antibiotics are only indicated for secondary bacterial infection, not routinely. Fluphenazine has no role. Ref: Paediatric dermatology nursing; standard Kenya nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q261 — Cerebral palsy: meningitis at 6 months is a recognized cause
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Neurological Disorders',
 'The following information obtained from a mother of a child with cerebral palsy correlates to the diagnosis:',
 'She was born at 40 weeks gestation',
 'She had meningitis when she was 6 months old',
 'She had physiologic jaundice after delivery',
 'She has frequent sore throats',
 'B',
 'Cerebral palsy results from non-progressive brain injury or malformation occurring in the developing brain. Postnatal causes include CNS infections such as meningitis — a well-recognised cause of acquired cerebral palsy. Term birth and physiologic jaundice are normal events that do not cause brain injury. Ref: Paediatric neurology nursing; Kenya Basic Paediatric Protocols.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Neurological Disorders',
 'The following information obtained from a mother of a child with cerebral palsy correlates to the diagnosis:',
 'She was born at 40 weeks gestation',
 'She had meningitis when she was 6 months old',
 'She had physiologic jaundice after delivery',
 'She has frequent sore throats',
 'B',
 'Cerebral palsy results from non-progressive brain injury. Postnatal CNS infection such as meningitis is a well-recognised cause of acquired cerebral palsy. Term birth and physiologic jaundice are normal events. Ref: Paediatric neurology nursing; Kenya Basic Paediatric Protocols.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q104 — Mumps: bed rest is recommended
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Communicable Diseases',
 'This is true about mumps:',
 'It is most severe in young children',
 'Death occurs mostly due to orchitis',
 'It presents with rash in the early stages',
 'Patients require bed rest',
 'D',
 'Mumps is generally milder in young children and more severe (e.g. orchitis, meningitis) in adolescents and adults. Orchitis can cause infertility but rarely causes death. Mumps presents with parotid swelling, not a rash. Supportive care with bed rest and analgesia is the recommended management. Ref: Communicable disease nursing; Kenya EPI guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Communicable Diseases',
 'This is true about mumps:',
 'It is most severe in young children',
 'Death occurs mostly due to orchitis',
 'It presents with rash in the early stages',
 'Patients require bed rest',
 'D',
 'Mumps is generally milder in young children and more severe in adolescents and adults. Orchitis can cause infertility but rarely causes death. Mumps presents with parotid swelling, not a rash. Supportive care with bed rest and analgesia is recommended. Ref: Communicable disease nursing; Kenya EPI guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q101 — Scabies treatment: benzyl benzoate emulsion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The treatment of choice for itching in scabies is:',
 '10% benzyl benzoate emulsion',
 'Calamine lotion',
 'Antihistamines',
 'Hydrocortisone cream',
 'A',
 'Scabies is caused by the mite Sarcoptes scabiei and is treated with a topical scabicide such as benzyl benzoate emulsion (10–25%) or permethrin 5% cream, which eradicates the mite and thereby relieves the itch. Antihistamines only ease residual itch; calamine lotion and hydrocortisone do not eliminate the mite. Ref: MOH Kenya Dermatology/Communicable Disease Treatment Guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The treatment of choice for itching in scabies is:',
 '10% benzyl benzoate emulsion',
 'Calamine lotion',
 'Antihistamines',
 'Hydrocortisone cream',
 'A',
 'Scabies is caused by the mite Sarcoptes scabiei and is treated with a topical scabicide such as benzyl benzoate emulsion (10–25%) or permethrin 5% cream, which eradicates the mite and thereby relieves the itch. Antihistamines only ease residual itch. Ref: MOH Kenya Dermatology/Communicable Disease Treatment Guidelines.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q266 — Hypernatraemia: manic-like presentation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Fluid & Electrolyte Disorders',
 'A patient with high serum sodium levels (hypernatraemia) is likely to present with:',
 'Mania',
 'Psychosis',
 'Depression',
 'Anger',
 'A',
 'Hypernatraemia causes cellular dehydration and neuronal dysfunction, typically manifesting as neuro-excitation states such as agitation, irritability and manic-like presentation. Hyponatraemia, in contrast, is associated with depression and lethargy. Ref: Psychiatric-medical correlation; electrolyte effects on mood; standard medical-surgical nursing texts.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 2: MENTAL HEALTH & PSYCHIATRIC NURSING
-- BScN → Paper I  |  KRCHN → Paper II
-- ─────────────────────────────────────────────────────────────────────────────

-- Q6 — Cognitive therapy stages
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'In cognitive therapy a client undergoes treatment through the following stages:',
 'Identifying the problem, devising alternatives, challenging maladaptive thinking and testing the alternatives',
 'Identifying the distorted thinking, challenging the maladaptive thinking, testing alternatives and choosing the best alternative',
 'Challenging maladaptive thinking, identifying the problem, devising alternatives to distorted thinking, picking the best alternative',
 'Identifying the distorted thoughts, challenging the maladaptive thoughts, devising realistic alternatives, testing out the alternatives',
 'D',
 'Cognitive therapy (Beck) proceeds in sequence: first identifying distorted/automatic thoughts, then challenging these maladaptive thoughts, then generating realistic alternative thoughts, and finally testing the alternatives in reality. Ref: Mental health nursing (Beck''s cognitive therapy); standard psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'In cognitive therapy a client undergoes treatment through the following stages:',
 'Identifying the problem, devising alternatives, challenging maladaptive thinking and testing the alternatives',
 'Identifying the distorted thinking, challenging the maladaptive thinking, testing alternatives and choosing the best alternative',
 'Challenging maladaptive thinking, identifying the problem, devising alternatives to distorted thinking, picking the best alternative',
 'Identifying the distorted thoughts, challenging the maladaptive thoughts, devising realistic alternatives, testing out the alternatives',
 'D',
 'Cognitive therapy (Beck) proceeds in sequence: first identifying distorted/automatic thoughts, then challenging these maladaptive thoughts, then generating realistic alternative thoughts, and finally testing the alternatives in reality. Ref: Mental health nursing; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 — Extrapyramidal side effects of antidopaminergic drugs
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'The extrapyramidal side-effects associated with antidopaminergic drugs include:',
 'Urine retention, urticaria and waxy flexibility',
 'Dry mouth, constipation and blurred vision',
 'Acute dystonia, akathisia and parkinsonian effects',
 'Hypothermia, cardiac arrhythmias and photosensitivity',
 'C',
 'Extrapyramidal side-effects (EPS) of typical (first-generation) antipsychotics — which block dopamine D2 receptors — include: acute dystonia (involuntary muscle contractions), akathisia (motor restlessness), drug-induced parkinsonism (tremor, rigidity, bradykinesia) and tardive dyskinesia with long-term use. Option B lists anticholinergic effects. Ref: Psychopharmacology; standard psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'The extrapyramidal side-effects associated with antidopaminergic drugs include:',
 'Urine retention, urticaria and waxy flexibility',
 'Dry mouth, constipation and blurred vision',
 'Acute dystonia, akathisia and parkinsonian effects',
 'Hypothermia, cardiac arrhythmias and photosensitivity',
 'C',
 'Extrapyramidal side-effects of typical antipsychotics include acute dystonia, akathisia, drug-induced parkinsonism and tardive dyskinesia. Option B lists anticholinergic effects. Ref: Psychopharmacology; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 — Cluster A personality disorders: suspicious/sensitive
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Personality Disorders',
 'The personality disorders where individuals are characteristically sensitive and suspicious include:',
 'Histrionic, Borderline and Narcissistic personality disorders',
 'Paranoid, Schizoid and Schizotypal personality disorders',
 'Paranoid, avoidant and dependent personality disorders',
 'Antisocial, Schizoid and affective personality disorders',
 'B',
 'Cluster A personality disorders (paranoid, schizoid and schizotypal) are the odd/eccentric cluster, characterised by suspiciousness, mistrust and social detachment. Cluster B (histrionic, borderline, narcissistic, antisocial) = dramatic/emotional; Cluster C (avoidant, dependent, obsessive-compulsive) = anxious/fearful. Ref: Psychiatric nursing; DSM-5 personality disorder clusters.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Personality Disorders',
 'The personality disorders where individuals are characteristically sensitive and suspicious include:',
 'Histrionic, Borderline and Narcissistic personality disorders',
 'Paranoid, Schizoid and Schizotypal personality disorders',
 'Paranoid, avoidant and dependent personality disorders',
 'Antisocial, Schizoid and affective personality disorders',
 'B',
 'Cluster A personality disorders (paranoid, schizoid and schizotypal) are the odd/eccentric cluster, characterised by suspiciousness, mistrust and social detachment. Ref: Psychiatric nursing; DSM-5 personality disorder clusters.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q25 — Disorder in stream of thought: flight of ideas
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Mental State Examination',
 'The following is a disorder in the stream of thought:',
 'Flight of ideas',
 'Perseveration',
 'Neologism',
 'Thought blocking',
 'A',
 'Flight of ideas is a disorder of the stream (flow/tempo) of thought, characterised by rapid jumping between loosely connected ideas, seen in mania. Perseveration (repetition) and neologism (new words) are disorders of thought form/content; thought blocking is a disorder of the possession of thought. Ref: Psychiatric assessment/mental state examination; standard psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Mental State Examination',
 'The following is a disorder in the stream of thought:',
 'Flight of ideas',
 'Perseveration',
 'Neologism',
 'Thought blocking',
 'A',
 'Flight of ideas is a disorder of the stream (flow/tempo) of thought, characterised by rapid jumping between loosely connected ideas, seen in mania. Perseveration and neologism are disorders of thought form/content; thought blocking is a disorder of the possession of thought. Ref: Psychiatric assessment/mental state examination.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q27 — Atypical antipsychotic: risperidone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'The following is an atypical antipsychotic:',
 'Risperidone',
 'Buspirone',
 'Flurazepam',
 'Fluphenazine',
 'A',
 'Risperidone is a second-generation (atypical) antipsychotic with both dopamine D2 and serotonin 5-HT2A receptor antagonism. Fluphenazine is a first-generation (typical) antipsychotic; buspirone is an azapirone anxiolytic; flurazepam is a long-acting benzodiazepine hypnotic. Ref: Psychopharmacology; standard psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'The following is an atypical antipsychotic:',
 'Risperidone',
 'Buspirone',
 'Flurazepam',
 'Fluphenazine',
 'A',
 'Risperidone is a second-generation (atypical) antipsychotic. Fluphenazine is a first-generation (typical) antipsychotic; buspirone is an anxiolytic; flurazepam is a benzodiazepine hypnotic. Ref: Psychopharmacology; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q28 — NOT associated with OCD: depersonalization
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Anxiety Disorders',
 'The following is NOT associated with obsessive compulsive disorder:',
 'Rituals',
 'Depersonalization',
 'Slowness',
 'Hypochondriasis',
 'B',
 'OCD features obsessions (intrusive unwanted thoughts), compulsive rituals, obsessional slowness and often hypochondriacal concerns. Depersonalization (a feeling of being detached from oneself) is a dissociative phenomenon and is not a core feature of OCD. Ref: Psychiatric nursing; DSM-5 OCD criteria.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Anxiety Disorders',
 'The following is NOT associated with obsessive compulsive disorder:',
 'Rituals',
 'Depersonalization',
 'Slowness',
 'Hypochondriasis',
 'B',
 'OCD features obsessions, compulsive rituals, obsessional slowness and often hypochondriacal concerns. Depersonalization is a dissociative phenomenon and is not a core feature of OCD. Ref: Psychiatric nursing; DSM-5.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q29 — Precipitating factor for anxiety: relationship problems
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Anxiety Disorders',
 'The following is a precipitating factor of anxiety disorders:',
 'Childhood upbringing',
 'Genetic factors',
 'Problems in relationships',
 'Personality',
 'C',
 'Precipitating factors are immediate triggers or stressors that provoke the onset of a disorder, such as relationship problems, bereavement or work stress. Childhood upbringing, genetic factors and personality type are predisposing (vulnerability) factors. Ref: Aetiology framework (predisposing, precipitating and perpetuating factors); psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Anxiety Disorders',
 'The following is a precipitating factor of anxiety disorders:',
 'Childhood upbringing',
 'Genetic factors',
 'Problems in relationships',
 'Personality',
 'C',
 'Precipitating factors are immediate triggers that provoke onset of a disorder, such as relationship problems. Childhood upbringing, genetics and personality are predisposing factors. Ref: Aetiology framework; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q30 — Abnormal grief reaction: social withdrawal within 6 months
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Grief and Loss',
 'An abnormal grief reaction would be:',
 'Social withdrawal within six months of the grieving period',
 'Lack of emotional response a few days after death has taken place',
 'Overwhelming waves of grief one month after death has occurred',
 'Incomplete acceptance that death has taken place two months after death has occurred',
 'A',
 'Persistent, marked social withdrawal continuing for six months or more indicates complicated (prolonged/pathological) grief. Initial emotional numbness, waves of grief at one month and incomplete acceptance within the first two months are within the range of normal grief responses. Ref: Mental health nursing; grief and loss theory.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Grief and Loss',
 'An abnormal grief reaction would be:',
 'Social withdrawal within six months of the grieving period',
 'Lack of emotional response a few days after death has taken place',
 'Overwhelming waves of grief one month after death has occurred',
 'Incomplete acceptance that death has taken place two months after death has occurred',
 'A',
 'Persistent marked social withdrawal continuing for six months indicates complicated (prolonged/pathological) grief. Initial numbness, waves of grief at one month and incomplete acceptance within two months are normal. Ref: Mental health nursing; grief and loss theory.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q52 — Opioid overdose: naloxone (stem is different from existing — needle tracks/stupor/pinpoint pupils)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Substance Use Disorders',
 'A client admitted with needle tracts on his arm, stuporous and with pinpoint pupils will likely be managed with:',
 'Naltrexone',
 'Naloxone',
 'Disulfiram',
 'Methadone',
 'B',
 'Needle tracks, stupor and pinpoint (miotic) pupils are the classic triad of acute opioid overdose. Naloxone (Narcan) is the specific opioid receptor antagonist used as an emergency reversal agent. Naltrexone and methadone are used for maintenance therapy; disulfiram is used for alcohol dependence. Ref: Emergency psychiatric/toxicology nursing; Kenya NACADA guidelines.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Substance Use Disorders',
 'A client admitted with needle tracts on his arm, stuporous and with pinpoint pupils will likely be managed with:',
 'Naltrexone',
 'Naloxone',
 'Disulfiram',
 'Methadone',
 'B',
 'Needle tracks, stupor and pinpoint pupils are the classic triad of acute opioid overdose. Naloxone is the specific emergency opioid reversal agent. Ref: Emergency psychiatric/toxicology nursing; Kenya NACADA guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q53 — Moderate dementia: priority is safety
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Cognitive Disorders',
 'The primary nursing intervention in working with a client with moderate-stage dementia is ensuring that the client:',
 'Receives adequate nutrition and hydration',
 'Will reminisce to decrease isolation',
 'Remains in a safe and secure environment',
 'Independently performs self-care',
 'C',
 'Safety is the priority in moderate dementia because of wandering, falls, confusion and impaired judgment. While nutrition, socialization and self-care all matter, safety is the overriding concern as the patient cannot reliably protect themselves from harm. Ref: Psychogeriatric nursing; standard psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Cognitive Disorders',
 'The primary nursing intervention in working with a client with moderate-stage dementia is ensuring that the client:',
 'Receives adequate nutrition and hydration',
 'Will reminisce to decrease isolation',
 'Remains in a safe and secure environment',
 'Independently performs self-care',
 'C',
 'Safety is the priority in moderate dementia because of wandering, falls, confusion and impaired judgment. Ref: Psychogeriatric nursing; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q54 — Malingering vs somatoform: conscious deliberate fabrication
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Somatoform & Related Disorders',
 'Malingering is different from somatoform disorder because the former:',
 'Has evidence of an organic basis',
 'It is a deliberate effort (conscious production of symptoms for external gain)',
 'Gratification from the environment is obtained',
 'Stress is expressed through physical symptoms',
 'B',
 'Malingering involves conscious, deliberate fabrication of symptoms for an external incentive such as financial gain, avoiding duty or legal consequences. In somatoform disorders, symptoms are not consciously produced and there is no intentional deception. Ref: Psychiatric nursing; DSM-5 classification.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Somatoform & Related Disorders',
 'Malingering is different from somatoform disorder because the former:',
 'Has evidence of an organic basis',
 'It is a deliberate effort (conscious production of symptoms for external gain)',
 'Gratification from the environment is obtained',
 'Stress is expressed through physical symptoms',
 'B',
 'Malingering involves conscious deliberate fabrication of symptoms for external gain. In somatoform disorders, symptoms are not consciously produced. Ref: Psychiatric nursing; DSM-5.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q55 — Diazepam patient teaching: avoid alcohol
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'Which of the following should be included in health teaching among clients receiving Valium (diazepam)?',
 'Avoid taking CNS depressants like alcohol',
 'There are no restrictions in activities',
 'Limit fluid intake',
 'Any beverage like coffee may be taken',
 'A',
 'Diazepam is a CNS depressant (benzodiazepine); combining it with alcohol or other CNS depressants potentiates sedation and respiratory depression, which can be fatal. Patients should also be cautioned against driving and operating machinery. Fluid restriction has no relevance. Ref: Psychopharmacology patient education; standard nursing pharmacology texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'Which of the following should be included in health teaching among clients receiving Valium (diazepam)?',
 'Avoid taking CNS depressants like alcohol',
 'There are no restrictions in activities',
 'Limit fluid intake',
 'Any beverage like coffee may be taken',
 'A',
 'Diazepam is a CNS depressant; combining it with alcohol potentiates sedation and respiratory depression. Patients should avoid driving and operating machinery. Ref: Psychopharmacology patient education; nursing pharmacology texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q97 — Group therapy: focus on here-and-now
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'In group therapy:',
 'The facilitator plays a passive role',
 'The focus is on the "here and now"',
 'Laughter and joking should be avoided',
 'Role-playing is discouraged',
 'B',
 'Effective group therapy emphasises the "here and now" — current feelings and interpersonal interactions within the group (Yalom). The facilitator is active, not passive; appropriate humour can be therapeutic; and role-play is a useful technique within group therapy. Ref: Mental health nursing (Yalom''s curative factors); standard psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'In group therapy:',
 'The facilitator plays a passive role',
 'The focus is on the "here and now"',
 'Laughter and joking should be avoided',
 'Role-playing is discouraged',
 'B',
 'Effective group therapy emphasises the "here and now" — current feelings and interactions within the group (Yalom). The facilitator is active; humour and role-play can be therapeutic. Ref: Mental health nursing; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q98 — IQ 50-70: mild intellectual disability
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Intellectual Disability',
 'An IQ level of 50–55 to approximately 70 is referred to as:',
 'Moderate mental retardation',
 'Mild mental retardation',
 'Severe mental retardation',
 'Profound mental retardation',
 'B',
 'IQ classification: mild intellectual disability (ID) = IQ 50/55–70; moderate ID = IQ 35–50; severe ID = IQ 20–35; profound ID = IQ below 20. Mild ID allows for academic skill development up to approximately 6th grade level and some independent living. Ref: Psychiatric nursing; DSM-5/ICD-11 intellectual disability classification.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Intellectual Disability',
 'An IQ level of 50–55 to approximately 70 is referred to as:',
 'Moderate mental retardation',
 'Mild mental retardation',
 'Severe mental retardation',
 'Profound mental retardation',
 'B',
 'IQ classification: mild ID = 50/55–70; moderate = 35–50; severe = 20–35; profound = below 20. Ref: Psychiatric nursing; DSM-5 intellectual disability classification.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q99 — SSRIs: fluoxetine, sertraline, paroxetine
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'Selective serotonin re-uptake inhibitors (SSRIs) include:',
 'Fluoxetine, Sertraline and Paroxetine',
 'Amitriptyline, imipramine and prozac',
 'Sodium valproate, largactil and Fluoxetine',
 'Haloperidol, promethazine and Lithium bicarbonate',
 'A',
 'SSRIs selectively block the reuptake of serotonin at the presynaptic terminal: fluoxetine (Prozac), sertraline (Zoloft) and paroxetine (Paxil) are all SSRIs and are first-line antidepressants. Amitriptyline and imipramine are tricyclic antidepressants; sodium valproate is a mood stabiliser; haloperidol is a typical antipsychotic. Ref: Psychopharmacology; standard nursing pharmacology texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'Selective serotonin re-uptake inhibitors (SSRIs) include:',
 'Fluoxetine, Sertraline and Paroxetine',
 'Amitriptyline, imipramine and prozac',
 'Sodium valproate, largactil and Fluoxetine',
 'Haloperidol, promethazine and Lithium bicarbonate',
 'A',
 'SSRIs include fluoxetine, sertraline and paroxetine. Amitriptyline and imipramine are tricyclics; valproate is a mood stabiliser; haloperidol is an antipsychotic. Ref: Psychopharmacology; nursing pharmacology texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q100 — Supportive psychotherapy techniques
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'The following are forms of supportive psychotherapy:',
 'Psychodrama, Ventilation and milieu therapy',
 'Persuasion, ventilation and reassurance',
 'Re-education, psychodrama and group therapy',
 'Milieu therapy, group therapy and Persuasion',
 'B',
 'Supportive psychotherapy techniques include reassurance, persuasion, ventilation (allowing expression of feelings), suggestion, guidance and counselling. Persuasion, ventilation and reassurance are all supportive techniques aimed at relieving distress and strengthening coping. Ref: Mental health nursing; standard psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Therapeutic Modalities',
 'The following are forms of supportive psychotherapy:',
 'Psychodrama, Ventilation and milieu therapy',
 'Persuasion, ventilation and reassurance',
 'Re-education, psychodrama and group therapy',
 'Milieu therapy, group therapy and Persuasion',
 'B',
 'Supportive psychotherapy techniques include reassurance, persuasion and ventilation (allowing expression of feelings). Ref: Mental health nursing; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q207 — Major tranquillizers: antipsychotic effects
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'Major tranquillizers (antipsychotics):',
 'Have antipsychotic effects',
 'Are commonly indicated in management of manic episodes',
 'Are used to prevent extrapyramidal side effects',
 'They cause muscle relaxation',
 'A',
 'Major tranquillizers (neuroleptics/antipsychotics) primarily produce antipsychotic effects by blocking dopamine D2 receptors. They CAUSE (not prevent) extrapyramidal side effects. They are not primarily muscle relaxants. While some antipsychotics are used adjunctively in mania, this is not their primary indication. Ref: Psychopharmacology; standard psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'Major tranquillizers (antipsychotics):',
 'Have antipsychotic effects',
 'Are commonly indicated in management of manic episodes',
 'Are used to prevent extrapyramidal side effects',
 'They cause muscle relaxation',
 'A',
 'Major tranquillizers (antipsychotics) primarily produce antipsychotic effects by dopamine D2 blockade. They CAUSE (not prevent) extrapyramidal side effects. Ref: Psychopharmacology; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;


-- Q232 — Carbamazepine adverse effects: aplastic anaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'Adverse effects associated with carbamazepine include:',
 'Aplastic anaemia',
 'Neural tube defects',
 'Alopecia',
 'Hypothyroidism',
 'A',
 'Carbamazepine can cause serious bone marrow suppression including aplastic anaemia and agranulocytosis, requiring regular FBC monitoring. Neural tube defects and alopecia are more characteristic of sodium valproate. Hypothyroidism is not a recognised carbamazepine adverse effect. Ref: Psychopharmacology; standard nursing pharmacology texts.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'Adverse effects associated with carbamazepine include:',
 'Aplastic anaemia',
 'Neural tube defects',
 'Alopecia',
 'Hypothyroidism',
 'A',
 'Carbamazepine can cause aplastic anaemia and agranulocytosis (FBC monitoring required). Neural tube defects and alopecia are more characteristic of valproate. Ref: Psychopharmacology; nursing pharmacology texts.',
 'hard', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q233 — PTSD: traumatic event must involve threat of death or physical injury
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Trauma & Stress-Related Disorders',
 'The following statement describes the DSM-IV description of post-traumatic stress disorder (PTSD):',
 'The traumatic event must be outside the range of human experience',
 'The traumatic event must involve the threat of death or physical injury',
 'The number of previous traumatic events does not influence the development of PTSD',
 'Merely witnessing an assault on another person would not qualify as sufficient trauma',
 'B',
 'PTSD requires exposure to actual or threatened death, serious injury or sexual violence — whether directly experienced, witnessed, or learned of through a close person (DSM criteria). Witnessing an assault can qualify. Prior trauma history increases vulnerability. Ref: Psychiatric nursing; DSM trauma and stressor-related disorder criteria.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Trauma & Stress-Related Disorders',
 'The following statement describes the DSM-IV description of post-traumatic stress disorder (PTSD):',
 'The traumatic event must be outside the range of human experience',
 'The traumatic event must involve the threat of death or physical injury',
 'The number of previous traumatic events does not influence the development of PTSD',
 'Merely witnessing an assault on another person would not qualify as sufficient trauma',
 'B',
 'PTSD requires exposure to actual or threatened death, serious injury or sexual violence — whether directly experienced or witnessed. Prior trauma history increases risk. Ref: Psychiatric nursing; DSM trauma criteria.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q234 — Delusion of grandeur
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychosis',
 'On arrival for admission to a voluntary unit, a female client loudly announces: "Everyone kneel, you are in the presence of the Queen of England." This delusion is termed as:',
 'Self-belief',
 'Self-appreciation',
 'Nihilistic',
 'Grandeur',
 'D',
 'The belief that one is an exalted or royal figure with special importance is a delusion of grandeur (grandiosity), commonly seen in mania and psychotic disorders. Nihilistic delusions involve beliefs about non-existence or decay of self, others or the world. Ref: Psychiatric assessment; standard psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychosis',
 'On arrival for admission to a voluntary unit, a female client loudly announces: "Everyone kneel, you are in the presence of the Queen of England." This delusion is termed as:',
 'Self-belief',
 'Self-appreciation',
 'Nihilistic',
 'Grandeur',
 'D',
 'The belief that one is an exalted or royal figure with special importance is a delusion of grandeur, commonly seen in mania and psychosis. Nihilistic delusions involve beliefs about non-existence. Ref: Psychiatric assessment; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q235 — ECT memory loss: transient, returns over 2–3 weeks
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Somatic Therapies',
 'A client is to receive his first electro-convulsive treatment (ECT). He states, "I''m afraid because my roommate told me I''ll forget everything and my memory will never return." What is the best response?',
 'Don''t worry about it. You will get your memory back.',
 'You may not experience memory loss, but you still need ECT to get better.',
 'It may be best if you can''t remember certain things.',
 'There is memory loss, but it will return over a 2–3 week period.',
 'D',
 'Honest, accurate information reduces anxiety and maintains trust. ECT can cause transient memory loss (particularly around the treatment period) that typically recovers over a few weeks. False reassurance (option A) is dishonest; options B and C are misleading or dismissive. Therapeutic communication gives truthful reassurance. Ref: Mental health nursing; ECT patient education and informed consent.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Somatic Therapies',
 'A client is to receive his first electro-convulsive treatment (ECT). He states, "I''m afraid because my roommate told me I''ll forget everything and my memory will never return." What is the best response?',
 'Don''t worry about it. You will get your memory back.',
 'You may not experience memory loss, but you still need ECT to get better.',
 'It may be best if you can''t remember certain things.',
 'There is memory loss, but it will return over a 2–3 week period.',
 'D',
 'ECT can cause transient memory loss that typically recovers over a few weeks. Truthful, reassuring information is the appropriate therapeutic communication. Ref: Mental health nursing; ECT patient education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q236 — Lithium: adequate sodium intake essential
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'The client has been taking lithium carbonate as prescribed. While the client is taking this drug, the nurse should ensure adequate intake of:',
 'Sodium',
 'Iron',
 'Iodine',
 'Calcium',
 'A',
 'Lithium and sodium are handled similarly by the renal tubules; sodium depletion causes lithium retention and toxicity. Adequate, stable sodium and fluid intake is essential to maintain lithium within the therapeutic range (0.6–1.2 mmol/L). Regular serum lithium monitoring is also required. Ref: Psychopharmacology; lithium safety guidelines; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'The client has been taking lithium carbonate as prescribed. While the client is taking this drug, the nurse should ensure adequate intake of:',
 'Sodium',
 'Iron',
 'Iodine',
 'Calcium',
 'A',
 'Sodium depletion causes lithium retention and toxicity. Adequate sodium and fluid intake is essential. Ref: Psychopharmacology; lithium safety guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q251 — Causes of delirium: systemic infection, anaemia, intracranial infection
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Cognitive Disorders',
 'The common causes of delirium are:',
 'Systemic infection, anaemia and intracranial infection',
 'Epilepsy, hypoglycaemia and withdrawal from anxiolytic sedatives',
 'HIV infection, acute pancreatitis and schizophrenia',
 'Depression, manic episode and hyperglycaemia',
 'A',
 'Delirium is an acute organic brain syndrome caused by physical insults. Systemic infection (sepsis), hypoxia/anaemia and intracranial infection (meningitis/encephalitis) are classic causes. Schizophrenia and primary mood disorders are functional psychiatric disorders, not organic causes of delirium. Ref: Psychiatric/medical nursing; standard Kenya medical-surgical nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Cognitive Disorders',
 'The common causes of delirium are:',
 'Systemic infection, anaemia and intracranial infection',
 'Epilepsy, hypoglycaemia and withdrawal from anxiolytic sedatives',
 'HIV infection, acute pancreatitis and schizophrenia',
 'Depression, manic episode and hyperglycaemia',
 'A',
 'Delirium is caused by physical insults: systemic infection, anaemia/hypoxia and intracranial infection. Schizophrenia and mood disorders are functional, not causes of delirium. Ref: Psychiatric/medical nursing; Kenya medical-surgical nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q252 — Conversion disorder pseudoseizures: non-stereotyped movements
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Somatoform & Related Disorders',
 'In convulsions associated with conversion reaction disorder:',
 'The patient becomes semiconscious',
 'Pattern of movements is not stereotyped',
 'There is incontinence',
 'There is post-ictal automatism',
 'B',
 'Non-epileptic (conversion/psychogenic) pseudoseizures show non-stereotyped, variable, often waxing-and-waning movements. Unlike true epileptic seizures, consciousness is usually preserved, there is no true urinary incontinence and there is no post-ictal confusion or automatism. Ref: Psychiatric nursing; neurology–psychiatry interface.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Somatoform & Related Disorders',
 'In convulsions associated with conversion reaction disorder:',
 'The patient becomes semiconscious',
 'Pattern of movements is not stereotyped',
 'There is incontinence',
 'There is post-ictal automatism',
 'B',
 'Pseudoseizures (conversion) show non-stereotyped movements, preserved consciousness, no true incontinence and no post-ictal confusion, unlike true epileptic seizures. Ref: Psychiatric nursing.',
 'hard', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q253 — Dependent personality disorder: background of emotional deprivation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Personality Disorders',
 'In dependent personality disorder there is:',
 'Persistent need for organisation and urge for control',
 'Self-centred behaviour',
 'Engaging in establishing superiority over others',
 'A background of emotional deprivation',
 'D',
 'Dependent personality disorder is characterised by excessive need to be cared for, submissiveness and clinging behaviour, often rooted in a background of emotional deprivation or insecurity in early relationships. Need for order/control is characteristic of obsessive-compulsive PD; superiority-seeking is narcissistic PD. Ref: Psychiatric nursing; DSM-5 personality disorders.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Personality Disorders',
 'In dependent personality disorder there is:',
 'Persistent need for organisation and urge for control',
 'Self-centred behaviour',
 'Engaging in establishing superiority over others',
 'A background of emotional deprivation',
 'D',
 'Dependent PD is characterised by excessive need to be cared for and submissiveness, often rooted in emotional deprivation. Need for control is OCD-PD; superiority is narcissistic PD. Ref: Psychiatric nursing; DSM-5.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q255 — Core symptoms of clinical depression
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Mood Disorders',
 'The key symptoms of clinical depression include:',
 'Depressed mood, anhedonia and fatigue',
 'Anergia, low self-esteem and sleep disturbance',
 'Suicidal ideations, self-reproach/guilt and impaired thinking',
 'Tearfulness, sleep disturbance and constipation',
 'A',
 'The three cardinal (core) symptoms of major depressive disorder are depressed mood, anhedonia (loss of interest or pleasure) and reduced energy/fatigue. The other options list additional or biological symptoms but not the core triad as defined in ICD-10/11 and DSM-5. Ref: Psychiatric nursing; ICD-10/ICD-11 core depressive symptoms.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Mood Disorders',
 'The key symptoms of clinical depression include:',
 'Depressed mood, anhedonia and fatigue',
 'Anergia, low self-esteem and sleep disturbance',
 'Suicidal ideations, self-reproach/guilt and impaired thinking',
 'Tearfulness, sleep disturbance and constipation',
 'A',
 'The three cardinal symptoms of major depressive disorder are depressed mood, anhedonia and reduced energy/fatigue. Ref: Psychiatric nursing; ICD-10/11 core depressive symptoms.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q267 — Effective ECT: grand mal seizure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Somatic Therapies',
 'The following indicates effective electroconvulsive therapy for a patient with severe depression:',
 'The patient loses consciousness',
 'The patient vomits',
 'The patient''s ECG indicates tachycardia',
 'The patient has a grand mal seizure',
 'D',
 'A generalised (grand mal/tonic-clonic) seizure of adequate duration (at least 25 seconds of motor activity) is the therapeutic endpoint of ECT. Loss of consciousness is produced by the anaesthetic, not the treatment; tachycardia is a common autonomic response but not the therapeutic indicator. Ref: Mental health nursing; ECT technique and monitoring.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Somatic Therapies',
 'The following indicates effective electroconvulsive therapy for a patient with severe depression:',
 'The patient loses consciousness',
 'The patient vomits',
 'The patient''s ECG indicates tachycardia',
 'The patient has a grand mal seizure',
 'D',
 'A generalised (grand mal) seizure of adequate duration is the therapeutic endpoint of ECT. Loss of consciousness is the anaesthetic effect, not the therapeutic indicator. Ref: Mental health nursing; ECT monitoring.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q268 — Circumstantiality: irrelevant detail but eventually reaches the point
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Mental State Examination',
 'A chart of a patient with schizophrenia states that the patient has circumstantiality. This means that the patient:',
 'Speaks using words that rhyme',
 'Repeats words used by others',
 'Includes irrelevant details in conversation (but eventually reaches the point)',
 'Makes up new words with no meaning',
 'C',
 'Circumstantiality is over-inclusion of irrelevant detail in conversation, but the patient eventually returns to the original point (unlike tangentiality, where the point is never reached). Clang association = rhyming words; echolalia = repeating others'' words; neologism = made-up words. Ref: Mental state examination; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Mental State Examination',
 'A chart of a patient with schizophrenia states that the patient has circumstantiality. This means that the patient:',
 'Speaks using words that rhyme',
 'Repeats words used by others',
 'Includes irrelevant details in conversation (but eventually reaches the point)',
 'Makes up new words with no meaning',
 'C',
 'Circumstantiality is over-inclusion of irrelevant detail with eventual return to the point. Clang = rhyming; echolalia = repeating others; neologism = made-up words. Ref: Mental state examination; psychiatric nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q269 — Grandiose delusion: low self-esteem compensation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychosis',
 'A patient admitted in the psychiatry unit claims to be the pope and insists he will not be kept away from his followers. The most likely explanation for the client''s delusion is:',
 'A reaction formation',
 'A stressful event',
 'A low self-esteem',
 'Overwhelming anxiety',
 'C',
 'Grandiose delusions commonly serve a compensatory function, masking underlying feelings of inadequacy and low self-esteem. The patient''s belief in an exalted identity compensates for perceived worthlessness. Ref: Psychiatric nursing; psychodynamics of grandiosity.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychosis',
 'A patient admitted in the psychiatry unit claims to be the pope and insists he will not be kept away from his followers. The most likely explanation for the client''s delusion is:',
 'A reaction formation',
 'A stressful event',
 'A low self-esteem',
 'Overwhelming anxiety',
 'C',
 'Grandiose delusions commonly compensate for underlying feelings of inadequacy and low self-esteem. Ref: Psychiatric nursing; psychodynamics of grandiosity.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q270 — MAOI discharge teaching: avoid OTC cold preparations
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Psychopharmacology',
 'When discharging a client on monoamine oxidase inhibitor (MAOI), the nurse should instruct the relatives to ensure the patient:',
 'Wears protective clothing and sunglasses when out in the sun',
 'Avoids over-the-counter cold preparations',
 'Drinks at least 8 glasses of water per day',
 'Takes food rich in high-quality protein (aged/tyramine-rich)',
 'B',
 'MAOIs have dangerous interactions with sympathomimetics in OTC cold/decongestant preparations (risk of hypertensive crisis) and with tyramine-rich foods (aged cheeses, cured meats). OTC cold remedies containing pseudoephedrine or phenylephrine must be strictly avoided. Option D is incorrect — tyramine-rich foods must be avoided, not encouraged. Ref: Psychopharmacology patient teaching; standard nursing pharmacology texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
 'When discharging a client on monoamine oxidase inhibitor (MAOI), the nurse should instruct the relatives to ensure the patient:',
 'Wears protective clothing and sunglasses when out in the sun',
 'Avoids over-the-counter cold preparations',
 'Drinks at least 8 glasses of water per day',
 'Takes food rich in high-quality protein (aged/tyramine-rich)',
 'B',
 'MAOIs interact dangerously with sympathomimetics in OTC cold/decongestant preparations (hypertensive crisis risk). OTC cold remedies must be strictly avoided. Tyramine-rich foods must also be avoided. Ref: Psychopharmacology patient teaching; nursing pharmacology texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q259 — Oedipus/Electra complex: phallic stage 3–5 years
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Developmental Psychology',
 'Oedipus and Electra complex occurs between the ages of:',
 '1–3 years',
 '3–5 years (phallic stage)',
 '5–12 years',
 '12–16 years',
 'B',
 'In Freud''s psychosexual theory, the Oedipus complex (boys) and Electra complex (girls) arise during the phallic stage, approximately ages 3–6 years. The child develops unconscious sexual feelings towards the opposite-sex parent and hostility towards the same-sex parent. Ref: Developmental psychology; Freud''s psychosexual theory.',
 'easy', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q26 — Neurotransmitters: low dopamine = depression; high serotonin ≠ depression
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Mental Health Nursing', 'Neurochemistry',
 'Regarding autonomic nervous system neurotransmitters: (a) Decrease in dopamine level causes depression; (b) Increase in serotonin (5-HT) levels causes depression.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'A',
 '(a) TRUE — Reduced monoamines including dopamine, noradrenaline and serotonin are associated with depression (monoamine hypothesis). (b) FALSE — Depression is associated with LOW (not increased) serotonin; SSRIs increase serotonin and treat depression, confirming that elevated serotonin is not the cause. Ref: Neurochemistry of mood; monoamine hypothesis; standard psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Mental Health Nursing', 'Neurochemistry',
 'Regarding autonomic nervous system neurotransmitters: (a) Decrease in dopamine level causes depression; (b) Increase in serotonin (5-HT) levels causes depression.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'A',
 '(a) TRUE — Reduced monoamines including dopamine are associated with depression. (b) FALSE — Depression is associated with LOW serotonin; elevated serotonin does not cause depression. Ref: Monoamine hypothesis; psychiatric nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3: COMMUNITY HEALTH, EPIDEMIOLOGY, IMMUNIZATION & NUTRITION
-- BScN → Paper II  |  KRCHN → Paper II
-- ─────────────────────────────────────────────────────────────────────────────

-- Q61 — Trachoma follicles: upper tarsal conjunctiva (different stem from existing trachoma Q)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Trachoma',
 'Follicles in trachoma commonly form on the:',
 'Sclera',
 'Inside of the upper eyelid (upper tarsal conjunctiva)',
 'Inside of the lower eyelid',
 'Cornea',
 'B',
 'Trachoma (Chlamydia trachomatis) follicles characteristically form on the upper tarsal conjunctiva (inner upper eyelid). Repeated infections cause scarring of the upper tarsal plate, leading to entropion and trichiasis — the WHO SAFE strategy addresses these complications. Ref: WHO trachoma grading; MOH eye health guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Trachoma',
 'Follicles in trachoma commonly form on the:',
 'Sclera',
 'Inside of the upper eyelid (upper tarsal conjunctiva)',
 'Inside of the lower eyelid',
 'Cornea',
 'B',
 'Trachoma follicles characteristically form on the upper tarsal conjunctiva. Repeated infections cause scarring leading to entropion and trichiasis. Ref: WHO trachoma grading; MOH eye health guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q62 — Trichomoniasis: asymptomatic in males
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Sexually Transmitted Infections',
 'Trichomoniasis:',
 'Is asymptomatic in males',
 'Causes whitish sticky discharge',
 'Causes odourless increased vaginal discharge',
 'Is best treated with quinolones',
 'A',
 'Trichomonas vaginalis is frequently asymptomatic in men, who act as carriers. In women it causes a frothy, offensive (not odourless) yellow-green discharge. Treatment is metronidazole (not quinolones) for both partners simultaneously. Ref: MOH Kenya STI Treatment Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Sexually Transmitted Infections',
 'Trichomoniasis:',
 'Is asymptomatic in males',
 'Causes whitish sticky discharge',
 'Causes odourless increased vaginal discharge',
 'Is best treated with quinolones',
 'A',
 'Trichomonas vaginalis is frequently asymptomatic in men (carriers). In women it causes frothy offensive yellow-green discharge. Treatment is metronidazole, not quinolones. Ref: MOH Kenya STI Treatment Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q63 — Filariasis bancrofti: Culex and Aedes mosquitoes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'Filariasis bancrofti is transmitted by:',
 'Culex and Aedes mosquitoes',
 'Culex and Anopheles mosquitoes',
 'Anopheles and Aedes mosquitoes',
 'Anopheles mosquitoes only',
 'A',
 'Wuchereria bancrofti (lymphatic filariasis) is transmitted mainly by Culex mosquitoes, with Aedes and Anopheles as secondary vectors in some regions. The Culex/Aedes pairing is the standard teaching answer for W. bancrofti. Ref: Parasitology; vector-borne disease guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'Filariasis bancrofti is transmitted by:',
 'Culex and Aedes mosquitoes',
 'Culex and Anopheles mosquitoes',
 'Anopheles and Aedes mosquitoes',
 'Anopheles mosquitoes only',
 'A',
 'Wuchereria bancrofti is transmitted mainly by Culex mosquitoes, with Aedes as secondary vectors. Ref: Parasitology; vector-borne disease guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q64 — Malaria: infants under 6 months protected; liver stage clinically silent
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Malaria',
 'Regarding malaria: (a) Children below six months have less risk of malaria compared to older children; (b) Sporozoites and liver stages of malaria infection do not cause clinical symptoms.',
 'Both TRUE',
 'Both FALSE',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'A',
 '(a) TRUE — Young infants have relative protection from transplacental maternal antibodies and fetal haemoglobin (HbF). (b) TRUE — The sporozoite and pre-erythrocytic (hepatic) stages are clinically silent; fever and symptoms begin with the erythrocytic (blood) stage when parasites rupture red blood cells. Ref: Kenya National Malaria Guidelines; parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Malaria',
 'Regarding malaria: (a) Children below six months have less risk of malaria compared to older children; (b) Sporozoites and liver stages of malaria infection do not cause clinical symptoms.',
 'Both TRUE',
 'Both FALSE',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'A',
 '(a) TRUE — Infants have relative protection from maternal antibodies and HbF. (b) TRUE — The sporozoite and liver stages are clinically silent; symptoms begin with the erythrocytic stage. Ref: Kenya National Malaria Guidelines; parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q65 — Chlorination of drinking water: 1% chlorine, 30 min contact
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Water & Sanitation',
 'The correct advice to the community on proper chlorination of drinking water is:',
 'Use 2% chlorine and give a minimum contact period of 15 minutes',
 'Use 2% chlorine and give a minimum contact period of 30 minutes',
 'Use 1% chlorine and give a minimum contact period of 15 minutes',
 'Use 1% chlorine and give a minimum contact period of 30 minutes',
 'D',
 'For household water treatment, 1% chlorine solution with a minimum contact time of 30 minutes before use is the recommended standard to ensure adequate disinfection and kill waterborne pathogens. Ref: MOH Kenya Environmental Health/WASH Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Water & Sanitation',
 'The correct advice to the community on proper chlorination of drinking water is:',
 'Use 2% chlorine and give a minimum contact period of 15 minutes',
 'Use 2% chlorine and give a minimum contact period of 30 minutes',
 'Use 1% chlorine and give a minimum contact period of 15 minutes',
 'Use 1% chlorine and give a minimum contact period of 30 minutes',
 'D',
 'For household water treatment: 1% chlorine with minimum 30-minute contact time is the recommended standard for disinfection. Ref: MOH Kenya Environmental Health/WASH Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q66 — Vaccines damaged by sunlight: BCG and measles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'The following vaccines can be damaged by sunlight:',
 'BCG and Polio',
 'Pneumococcal and Measles',
 'Polio and yellow fever',
 'BCG and measles',
 'D',
 'BCG and measles vaccines are the most sensitive to both heat and ultraviolet light (sunlight); they must be protected from sunlight and maintained cold throughout the cold chain. OPV and yellow fever are also light-sensitive but BCG and measles are the classic answer for sunlight sensitivity. Ref: Kenya KEPI/cold chain management guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'The following vaccines can be damaged by sunlight:',
 'BCG and Polio',
 'Pneumococcal and Measles',
 'Polio and yellow fever',
 'BCG and measles',
 'D',
 'BCG and measles vaccines are the most sensitive to heat and ultraviolet (sunlight); they must be protected from light and kept cold throughout the cold chain. Ref: Kenya KEPI/cold chain management guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q68 — HIV clinical staging: herpes zoster + recurrent otitis media = Stage 2
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'HIV/AIDS',
 'A patient with Herpes Zoster, recurrent otitis media and recurrent oral ulcerations is in HIV/AIDS clinical stage:',
 'I',
 'II',
 'III',
 'IV',
 'B',
 'WHO HIV Clinical Stage 2 conditions include herpes zoster, recurrent upper respiratory tract infections (such as recurrent otitis media) and recurrent oral ulceration. Stage 1 = asymptomatic or PGL; Stage 3 = oral candida, severe bacterial infections, unexplained weight loss >10%; Stage 4 = AIDS-defining conditions (PCP, CMV, extrapulmonary TB). Ref: WHO/MOH Kenya HIV Clinical Staging guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'HIV/AIDS',
 'A patient with Herpes Zoster, recurrent otitis media and recurrent oral ulcerations is in HIV/AIDS clinical stage:',
 'I',
 'II',
 'III',
 'IV',
 'B',
 'WHO HIV Clinical Stage 2 includes herpes zoster, recurrent URTI (otitis media) and recurrent oral ulceration. Ref: WHO/MOH Kenya HIV Clinical Staging guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q69 — Community diagnosis data presentation: histogram, frequency tables, pie charts
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Diagnosis',
 'Community diagnosis results can be presented by use of the following:',
 'Frequency polygon, table of random numbers, pie charts',
 'Histogram, frequency tables, pie charts',
 'Tally sheets, frequency polygon, table of random numbers',
 'Tally sheets, pie charts, histograms',
 'B',
 'Data presentation tools for community diagnosis include histograms, frequency tables, pie charts, bar charts and frequency polygons. Tables of random numbers are sampling tools (not presentation); tally sheets are data collection tools. Option B correctly lists data presentation methods only. Ref: Community health/research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Diagnosis',
 'Community diagnosis results can be presented by use of the following:',
 'Frequency polygon, table of random numbers, pie charts',
 'Histogram, frequency tables, pie charts',
 'Tally sheets, frequency polygon, table of random numbers',
 'Tally sheets, pie charts, histograms',
 'B',
 'Data presentation tools include histograms, frequency tables and pie charts. Tables of random numbers are sampling tools; tally sheets are collection tools. Ref: Community health/research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q71 — PHC resource distribution: equitable (fairly among all)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Primary Health Care',
 'The following statement best describes how resources should be distributed according to PHC principles:',
 'Equally among all community members with needs',
 'As perceived by the community leaders',
 'Fairly (equitably) among all individuals and families',
 'As perceived by the donor community',
 'C',
 'A core PHC principle (Alma-Ata 1978) is equity — fair distribution of resources according to need so that all individuals and families have access to essential health services. Equity (fair/needs-based distribution) differs from strict equality (identical shares regardless of need). Ref: Alma-Ata PHC principles; MOH Kenya PHC policy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Primary Health Care',
 'The following statement best describes how resources should be distributed according to PHC principles:',
 'Equally among all community members with needs',
 'As perceived by the community leaders',
 'Fairly (equitably) among all individuals and families',
 'As perceived by the donor community',
 'C',
 'A core PHC principle is equity — fair distribution of resources according to need. Equity differs from strict equality. Ref: Alma-Ata PHC principles; MOH Kenya PHC policy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q77 — Adoption of herbal preparations: diffusion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'Some herbal preparations from China are being used by Kenyans as immune boosters for people living with HIV/AIDS. This process of social change is referred to as:',
 'Invention',
 'Discovery',
 'Diffusion',
 'Evolution',
 'C',
 'Diffusion is the spread and adoption of cultural items, practices or ideas from one society to another. Invention creates something genuinely new; discovery finds something pre-existing. The adoption of Chinese herbal practices by Kenyans is a classic example of cultural diffusion. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'Some herbal preparations from China are being used by Kenyans as immune boosters for people living with HIV/AIDS. This process of social change is referred to as:',
 'Invention',
 'Discovery',
 'Diffusion',
 'Evolution',
 'C',
 'Diffusion is the spread and adoption of cultural items or practices from one society to another. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q79 — IUCDs: safe in ischaemic heart disease
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'Intrauterine contraceptive devices (IUCDs):',
 'Should be inserted only during menstruation',
 'Should not be inserted before 6 weeks postpartum (if not immediate postpartum)',
 'Can migrate to other organs like the heart',
 'Can be used by a client with ischemic heart disease',
 'D',
 'The copper IUCD is non-hormonal and is categorised as WHO MEC 2 (benefits generally outweigh risks) for women with ischaemic heart disease, making it safe to use. It can be inserted at any time the provider is reasonably sure the woman is not pregnant, not only during menses. IUCDs do not migrate to distant organs such as the heart. Ref: MOH Kenya Family Planning Guidelines; WHO Medical Eligibility Criteria.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'Intrauterine contraceptive devices (IUCDs):',
 'Should be inserted only during menstruation',
 'Should not be inserted before 6 weeks postpartum (if not immediate postpartum)',
 'Can migrate to other organs like the heart',
 'Can be used by a client with ischemic heart disease',
 'D',
 'The copper IUCD is non-hormonal and safe (WHO MEC) for women with ischaemic heart disease. It can be inserted any time the woman is not pregnant. Ref: MOH Kenya Family Planning Guidelines; WHO Medical Eligibility Criteria.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q105 — Progesterone-only pills: can be used as emergency contraceptive
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'Progesterone-only pills:',
 'Can be used as emergency contraceptive pills',
 'Should be started 6 months after giving birth',
 'Are contraindicated in those on antiretroviral therapy',
 'Are best taken early in the morning',
 'A',
 'Progestin-only pills (e.g. levonorgestrel) can be used for emergency contraception. POPs are recommended from 6 weeks (not 6 months) postpartum and are safe with breastfeeding. They are not contraindicated with ART. POPs should be taken at the same time each day for maximum efficacy. Ref: MOH Kenya Family Planning Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'Progesterone-only pills:',
 'Can be used as emergency contraceptive pills',
 'Should be started 6 months after giving birth',
 'Are contraindicated in those on antiretroviral therapy',
 'Are best taken early in the morning',
 'A',
 'Progestin-only pills can be used for emergency contraception. They are safe from 6 weeks postpartum and are not contraindicated with ART. Ref: MOH Kenya Family Planning Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q106 — Water-washed diseases: prevented by increasing quantity of water
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'The diseases that can be prevented by improving the quantity of water are:',
 'Water-washed diseases',
 'Water-related diseases',
 'Water-borne diseases',
 'Both water-related and water-borne diseases',
 'A',
 'Water-washed diseases (scabies, trachoma, skin and eye infections) are prevented by increasing the QUANTITY of water available for personal hygiene and washing. Water-borne diseases require improving water QUALITY. Ref: Environmental health classification of water-associated diseases; MOH Kenya WASH guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'The diseases that can be prevented by improving the quantity of water are:',
 'Water-washed diseases',
 'Water-related diseases',
 'Water-borne diseases',
 'Both water-related and water-borne diseases',
 'A',
 'Water-washed diseases are prevented by increasing the QUANTITY of water for hygiene. Water-borne diseases require improving water QUALITY. Ref: Environmental health; MOH Kenya WASH guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q107 — Natural passive immunity: mother to child
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'The immunity passed from mother to child is an example of:',
 'Natural active immunity',
 'Natural passive immunity',
 'Herd immunity',
 'First line immunity',
 'B',
 'Maternal transfer of antibodies via the placenta (transplacental IgG) or via breast milk constitutes natural passive immunity — ready-made antibodies acquired without the child''s own immune response. Natural active immunity develops after the child themselves has an infection. Ref: Immunology; Kenya KEPI immunization guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'The immunity passed from mother to child is an example of:',
 'Natural active immunity',
 'Natural passive immunity',
 'Herd immunity',
 'First line immunity',
 'B',
 'Maternal antibody transfer via placenta or breast milk is natural passive immunity — ready-made antibodies without the child''s own immune response. Ref: Immunology; Kenya KEPI guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q108 — Prevalence: total existing cases
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Epidemiology',
 'Prevalence:',
 'Measures total number of cases (existing) at a point/period',
 'Measures new cases in a period of time',
 'Measures recurrent diseases',
 'It''s the best measure for acute diseases',
 'A',
 'Prevalence is the total number of existing (old plus new) cases in a population at a given point in time or over a specified period. Incidence measures new cases over time and is the better measure for acute diseases. Prevalence is useful for chronic disease burden and planning. Ref: Epidemiology; community health.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Epidemiology',
 'Prevalence:',
 'Measures total number of cases (existing) at a point/period',
 'Measures new cases in a period of time',
 'Measures recurrent diseases',
 'It''s the best measure for acute diseases',
 'A',
 'Prevalence is the total number of existing cases at a given time. Incidence measures new cases and is better for acute diseases. Ref: Epidemiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q110 — Primary disease prevention: immunization, balanced diet, exercise
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Levels of Prevention',
 'Primary disease prevention involves:',
 'Screening for cervical cancer, early treatment, immunization',
 'Immunization, eating balanced diet, regular exercise',
 'Immunization, screening for cervical cancer, good nutrition',
 'Early treatment, regular medical checkups, mass treatment',
 'B',
 'Primary prevention acts before disease occurs to prevent its onset: immunization, balanced diet and regular exercise are all primary prevention measures. Screening and early treatment are secondary prevention (early diagnosis and prompt treatment). Ref: Levels of prevention; MOH Kenya health promotion guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Levels of Prevention',
 'Primary disease prevention involves:',
 'Screening for cervical cancer, early treatment, immunization',
 'Immunization, eating balanced diet, regular exercise',
 'Immunization, screening for cervical cancer, good nutrition',
 'Early treatment, regular medical checkups, mass treatment',
 'B',
 'Primary prevention acts before disease occurs: immunization, balanced diet and regular exercise. Screening and early treatment are secondary prevention. Ref: Levels of prevention; MOH Kenya health promotion guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q121 — Diseases targeted for eradication by DVI: polio, neonatal tetanus, measles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'The diseases targeted for eradication by the Division of Vaccines and Immunization (DVI) include:',
 'Poliomyelitis, neonatal tetanus, measles',
 'Neonatal tetanus, measles, chickenpox',
 'Measles, yellow fever, whooping cough',
 'Poliomyelitis, neonatal tetanus, diphtheria',
 'A',
 'Poliomyelitis (eradication), neonatal and maternal tetanus (elimination) and measles (elimination) are the priority vaccine-preventable diseases targeted by Kenya''s immunization programme. Chickenpox is not an EPI target for elimination; diphtheria is controlled but not targeted for eradication. Ref: Kenya KEPI/DVI immunization programme guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'The diseases targeted for eradication by the Division of Vaccines and Immunization (DVI) include:',
 'Poliomyelitis, neonatal tetanus, measles',
 'Neonatal tetanus, measles, chickenpox',
 'Measles, yellow fever, whooping cough',
 'Poliomyelitis, neonatal tetanus, diphtheria',
 'A',
 'Polio (eradication), neonatal/maternal tetanus (elimination) and measles (elimination) are priority targets of Kenya''s immunization programme. Ref: Kenya KEPI/DVI guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q122 — Tetanus toxoid in pregnancy: prevent neonatal tetanus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'The MAIN purpose of administering Tetanus toxoid during pregnancy is:',
 'Prevention of neonatal tetanus',
 'Prevention of maternal tetanus during birth process',
 'To meet the set guidelines',
 'To promote herd immunity',
 'A',
 'Maternal TT immunization transfers IgG antibodies across the placenta to protect the newborn from neonatal tetanus (tetanus neonatorum). While it also protects the mother, the PRIMARY targeted purpose of the programme is neonatal tetanus prevention. Ref: Kenya ANC/immunization guidelines; KEPI.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'The MAIN purpose of administering Tetanus toxoid during pregnancy is:',
 'Prevention of neonatal tetanus',
 'Prevention of maternal tetanus during birth process',
 'To meet the set guidelines',
 'To promote herd immunity',
 'A',
 'Maternal TT immunization transfers antibodies to protect the newborn from neonatal tetanus. The PRIMARY targeted purpose is neonatal tetanus prevention. Ref: Kenya ANC/immunization guidelines; KEPI.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q124 — Pre-erythrocytic phase of malaria: liver
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Malaria',
 'The pre-erythrocytic phase of the malaria parasite takes place in the:',
 'Salivary glands of mosquito',
 'Midgut of mosquito',
 'Liver',
 'Red blood cells',
 'C',
 'After inoculation by an infected mosquito, sporozoites travel to the liver where pre-erythrocytic (exo-erythrocytic) schizogony occurs. Hepatocytes are invaded and schizonts develop before merozoites are released into the bloodstream to invade red blood cells. This phase is clinically silent. Ref: Parasitology (Plasmodium life cycle); Kenya National Malaria Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Malaria',
 'The pre-erythrocytic phase of the malaria parasite takes place in the:',
 'Salivary glands of mosquito',
 'Midgut of mosquito',
 'Liver',
 'Red blood cells',
 'C',
 'After inoculation, sporozoites travel to the liver for pre-erythrocytic schizogony before invading red blood cells. This phase is clinically silent. Ref: Parasitology; Kenya National Malaria Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q125 — Drug of choice for lymphatic filariasis: diethylcarbamazine
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'The drug of choice for treatment of lymphatic filariasis is:',
 'Diethylcarbamazine',
 'Sodium stibogluconate',
 'Paromomycin',
 'Amphotericin B',
 'A',
 'Diethylcarbamazine (DEC) is the drug of choice for lymphatic filariasis caused by Wuchereria bancrofti, killing microfilariae and some adult worms. Sodium stibogluconate and paromomycin treat leishmaniasis; amphotericin B treats fungal infections and leishmaniasis. Ref: Kenya NTD (Neglected Tropical Disease) treatment guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'The drug of choice for treatment of lymphatic filariasis is:',
 'Diethylcarbamazine',
 'Sodium stibogluconate',
 'Paromomycin',
 'Amphotericin B',
 'A',
 'Diethylcarbamazine (DEC) is the drug of choice for lymphatic filariasis (Wuchereria bancrofti). Ref: Kenya NTD treatment guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q126 — Helminths with pulmonary migratory phase
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'The helminths whose life cycle involves passage to the lungs include:',
 'Ascaris lumbricoides, Necator americanus',
 'Ankylostoma duodenale, Enterobius vermicularis',
 'Enterobius vermicularis, Strongyloides stercoralis',
 'Trichuris trichiura, Ascaris lumbricoides',
 'A',
 'Ascaris lumbricoides and hookworms (Necator americanus and Ankylostoma duodenale), along with Strongyloides stercoralis, undergo a pulmonary migratory phase (Loeffler''s syndrome) where larvae pass through the lungs before being swallowed. Enterobius vermicularis and Trichuris trichiura do not have pulmonary migration. Ref: Parasitology; standard nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'The helminths whose life cycle involves passage to the lungs include:',
 'Ascaris lumbricoides, Necator americanus',
 'Ankylostoma duodenale, Enterobius vermicularis',
 'Enterobius vermicularis, Strongyloides stercoralis',
 'Trichuris trichiura, Ascaris lumbricoides',
 'A',
 'Ascaris and hookworms (Necator americanus) undergo pulmonary migration (Loeffler''s syndrome). Enterobius and Trichuris do not have pulmonary migration. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q127 — Zoonotic disease: hydatidosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Communicable Diseases',
 'The following is a zoonotic disease:',
 'Hydatidosis',
 'Diphtheria',
 'Taeniasis',
 'Tetanus',
 'A',
 'Hydatid disease (Echinococcus granulosus) is a classic zoonosis transmitted from dogs and livestock to humans. Diphtheria and tetanus are not zoonoses. Taeniasis is acquired from eating infected meat (intestinal tapeworm) but is not classified as a zoonosis in the same direct animal-reservoir sense. Ref: Parasitology/zoonoses; community health.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Communicable Diseases',
 'The following is a zoonotic disease:',
 'Hydatidosis',
 'Diphtheria',
 'Taeniasis',
 'Tetanus',
 'A',
 'Hydatid disease (Echinococcus granulosus) is a classic zoonosis transmitted from dogs/livestock to humans. Diphtheria and tetanus are not zoonoses. Ref: Parasitology/zoonoses.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q129 — Home visit: clear objective + share reason with client
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Home-Based Care',
 'Before commencing a home visit, the health worker should:',
 'Establish rapport, make a report',
 'Have a clear objective, make referral plans',
 'Have a clear objective; share with the client(s) the reason for follow-up',
 'Seek permission from local authorities; establish rapport',
 'C',
 'Effective home visiting requires a clear purpose or objective for the visit and sharing the reason with the family before commencing. This enables informed participation and builds trust. Rapport is established at the beginning of the visit and reporting occurs after. Ref: Community health nursing (home visiting); MOH community health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Home-Based Care',
 'Before commencing a home visit, the health worker should:',
 'Establish rapport, make a report',
 'Have a clear objective, make referral plans',
 'Have a clear objective; share with the client(s) the reason for follow-up',
 'Seek permission from local authorities; establish rapport',
 'C',
 'Effective home visiting requires a clear objective and sharing the reason with the family before commencing. Ref: Community health nursing; MOH community health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q130 — Study of human population: demography
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Epidemiology',
 'The study of human population is referred to as:',
 'Epidemiology',
 'Demography',
 'Community diagnosis',
 'Population-based research',
 'B',
 'Demography is the scientific study of human populations — their size, composition, distribution and dynamics (births, deaths, migration). Epidemiology studies the distribution and determinants of disease in populations. Ref: Community health; demography.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Epidemiology',
 'The study of human population is referred to as:',
 'Epidemiology',
 'Demography',
 'Community diagnosis',
 'Population-based research',
 'B',
 'Demography is the scientific study of human populations. Epidemiology studies disease distribution and determinants. Ref: Community health; demography.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q131 — Attacking a reservoir: mass treatment, treatment of carriers, isolation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Communicable Disease Control',
 'The following are strategies of attacking a reservoir:',
 'Mass treatment, treatment of carriers, isolation',
 'Personal hygiene, environmental hygiene, vector control',
 'Better nutrition, immunization, vector control',
 'Early treatment, vector control, killing the reservoir',
 'A',
 'Attacking the reservoir (source of infection) involves: treating cases (early treatment), treating or identifying carriers, isolation or quarantine of cases, and — for animal reservoirs — destruction of the source. Mass treatment + treatment of carriers + isolation all directly target the reservoir. Ref: Communicable disease control principles; community health.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Communicable Disease Control',
 'The following are strategies of attacking a reservoir:',
 'Mass treatment, treatment of carriers, isolation',
 'Personal hygiene, environmental hygiene, vector control',
 'Better nutrition, immunization, vector control',
 'Early treatment, vector control, killing the reservoir',
 'A',
 'Attacking the reservoir involves treating cases, treating carriers, isolation/quarantine and destruction of animal reservoirs. Ref: Communicable disease control; community health.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q132 — Sources of unsaturated fats: avocado, fatty fish, groundnuts
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'Sources of unsaturated fats include:',
 'Butter, fish, avocado',
 'Margarine, groundnuts, whole milk',
 'Avocado, fatty fish, groundnuts',
 'Coconuts, butter, red meat',
 'C',
 'Unsaturated fats (mono- and polyunsaturated) are found in plant oils, nuts, avocado and oily fish. Avocado, fatty fish and groundnuts are all unsaturated-fat sources. Butter, whole milk, coconut and red meat are predominantly saturated fat sources. Ref: Nutrition; MOH Kenya dietary guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'Sources of unsaturated fats include:',
 'Butter, fish, avocado',
 'Margarine, groundnuts, whole milk',
 'Avocado, fatty fish, groundnuts',
 'Coconuts, butter, red meat',
 'C',
 'Unsaturated fats are found in avocado, fatty fish and groundnuts. Butter, whole milk, coconut and red meat are saturated fat sources. Ref: Nutrition; MOH Kenya dietary guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q133 — Characteristics of culture: universal and learned
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'Characteristics of culture include:',
 'Innate, intergenerational',
 'Universal, learned',
 'Legal, learned',
 'Universal, static',
 'B',
 'Culture is universal (found in all human societies), learned (transmitted through socialisation, not inborn/innate), shared, dynamic (changes over time) and cumulative. It is not static or innate. Ref: Medical sociology; standard sociology texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'Characteristics of culture include:',
 'Innate, intergenerational',
 'Universal, learned',
 'Legal, learned',
 'Universal, static',
 'B',
 'Culture is universal and learned (not innate or static). Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q141 — Community mobilization definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Development',
 'Community mobilization refers to:',
 'Harnessing of resource persons in a community and enlightening them on their environment',
 'Identifying of community resources',
 'Initiating and sustaining development activities in a community',
 'Putting everybody in a community ready for action',
 'D',
 'Community mobilization is the process of getting community members aware, motivated and ready to act collectively on an issue or problem. It involves creating awareness, building consensus and generating momentum for collective action. Ref: Community health (community participation); MOH community health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Development',
 'Community mobilization refers to:',
 'Harnessing of resource persons in a community and enlightening them on their environment',
 'Identifying of community resources',
 'Initiating and sustaining development activities in a community',
 'Putting everybody in a community ready for action',
 'D',
 'Community mobilization is the process of getting community members motivated and ready to act collectively on an issue. Ref: Community health; MOH community health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q143 — After-effects of a disaster
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Disaster Management',
 'The after-effects of a disaster include:',
 'Disease outbreaks, malnutrition, conflicts',
 'Post-trauma syndrome, disease outbreaks, injury complications',
 'Poor sanitary conditions, Vitamin A deficiency, disabilities',
 'Disabilities, obesity, conflicts',
 'B',
 'Recognised after-effects of disasters include psychological trauma (PTSD/post-trauma syndrome), epidemics and disease outbreaks (due to disrupted sanitation and healthcare), and complications from injuries sustained during the disaster. Option B best represents the direct after-effects. Ref: Disaster nursing/management; community health.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Disaster Management',
 'The after-effects of a disaster include:',
 'Disease outbreaks, malnutrition, conflicts',
 'Post-trauma syndrome, disease outbreaks, injury complications',
 'Poor sanitary conditions, Vitamin A deficiency, disabilities',
 'Disabilities, obesity, conflicts',
 'B',
 'After-effects of disasters include PTSD, disease outbreaks and injury complications. Ref: Disaster nursing/management; community health.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q145 — LAM requirements: all three conditions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'The requirements for the Lactational Amenorrhoea Method (LAM) include:',
 'Baby less than 6 weeks old, baby on exclusive breastfeeding, mother''s menses not resumed',
 'Baby breastfed frequently day and night, baby less than 6 months old, mother abstains from sex',
 'Baby is fully breastfed, baby less than 6 weeks, menses have resumed',
 'Baby is fully (exclusively) breastfed, baby is less than 6 months, menses have not resumed',
 'D',
 'LAM is effective only when all three conditions are simultaneously met: (1) the infant is being fully/exclusively breastfed; (2) the infant is less than 6 months old; and (3) the mother''s menstrual periods have not returned (amenorrhoea). If any criterion is not met, another method must be added. Ref: MOH Kenya Family Planning Guidelines; WHO.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'The requirements for the Lactational Amenorrhoea Method (LAM) include:',
 'Baby less than 6 weeks old, baby on exclusive breastfeeding, mother''s menses not resumed',
 'Baby breastfed frequently day and night, baby less than 6 months old, mother abstains from sex',
 'Baby is fully breastfed, baby less than 6 weeks, menses have resumed',
 'Baby is fully (exclusively) breastfed, baby is less than 6 months, menses have not resumed',
 'D',
 'LAM is effective only when all three are met: exclusive breastfeeding, infant under 6 months, and amenorrhoea. Ref: MOH Kenya Family Planning Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q146 — Secondary prevention of TB: early diagnosis and treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Tuberculosis',
 'The following is a method of secondary prevention of tuberculosis:',
 'Immunization with BCG',
 'Prophylactic treatment of the people at risk',
 'Treating patients suffering from tuberculosis (early diagnosis and treatment)',
 'Improving the nutritional status of the community',
 'C',
 'Secondary prevention is early detection and prompt treatment to limit progression and prevent transmission. Treating TB cases through the DOTS strategy (early diagnosis + supervised treatment) is secondary prevention. BCG immunization and nutritional improvement are primary prevention. Ref: Levels of prevention; MOH Kenya TB/Leprosy programme guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Tuberculosis',
 'The following is a method of secondary prevention of tuberculosis:',
 'Immunization with BCG',
 'Prophylactic treatment of the people at risk',
 'Treating patients suffering from tuberculosis (early diagnosis and treatment)',
 'Improving the nutritional status of the community',
 'C',
 'Secondary prevention = early diagnosis and prompt treatment. Treating TB cases through DOTS is secondary prevention. BCG and nutritional improvement are primary prevention. Ref: MOH Kenya TB programme guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q148 — Water-related diseases: malaria, schistosomiasis, dracunculosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'Water-related diseases include:',
 'Diarrhoea, bacillary dysentery, scabies',
 'Trachoma, onchocerciasis, amoebiasis',
 'Malaria, schistosomiasis, dracunculosis',
 'Typhoid, cholera, hepatitis A',
 'C',
 'Water-related diseases depend on water for the vector or intermediate host: malaria (mosquito breeding in water), schistosomiasis (snail intermediate host in water) and dracunculosis (guinea worm — copepod in water). Option D lists water-borne diseases (faecal-oral); options A and B mix categories. Ref: Environmental health classification of water-associated diseases; MOH WASH guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'Water-related diseases include:',
 'Diarrhoea, bacillary dysentery, scabies',
 'Trachoma, onchocerciasis, amoebiasis',
 'Malaria, schistosomiasis, dracunculosis',
 'Typhoid, cholera, hepatitis A',
 'C',
 'Water-related diseases depend on water for vector or intermediate host: malaria (mosquito), schistosomiasis (snail) and dracunculosis (copepod). Option D lists water-borne diseases. Ref: Environmental health; MOH WASH guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q149 — Cold chain definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'Cold chain is defined as a system of:',
 'Immunizing children and expectant mothers with a potent vaccine',
 'Maintaining vaccines in a potent state from the manufacturer to the consumer',
 'Maintaining the vaccine in a potent state in a health facility',
 'Transporting vaccines from the manufacturer to the consumer',
 'B',
 'The cold chain is the complete system of storing and transporting vaccines within recommended temperature ranges from manufacture through to administration at the point of use, ensuring vaccines remain potent and effective throughout. Ref: Kenya KEPI cold chain management guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'Cold chain is defined as a system of:',
 'Immunizing children and expectant mothers with a potent vaccine',
 'Maintaining vaccines in a potent state from the manufacturer to the consumer',
 'Maintaining the vaccine in a potent state in a health facility',
 'Transporting vaccines from the manufacturer to the consumer',
 'B',
 'The cold chain is the complete system of storing and transporting vaccines within recommended temperatures from manufacture to administration. Ref: Kenya KEPI cold chain guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q150 — Recommended refuse disposal in rural areas: composting
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'The recommended method of disposing of refuse in rural areas is:',
 'Crude dumping',
 'Composting',
 'Incineration',
 'Controlled tipping',
 'B',
 'In rural settings, composting is recommended because biodegradable refuse can be converted into organic manure cheaply and hygienically, reducing pathogens and producing a useful soil amendment. Controlled tipping is more suitable for urban areas with organised waste collection. Ref: MOH Kenya Environmental Health guidelines (refuse disposal).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'The recommended method of disposing of refuse in rural areas is:',
 'Crude dumping',
 'Composting',
 'Incineration',
 'Controlled tipping',
 'B',
 'Composting is recommended for rural refuse disposal — biodegradable refuse is converted into organic manure cheaply and hygienically. Ref: MOH Kenya Environmental Health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q155 — Ascaris complications: intestinal obstruction, malnutrition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'Roundworm (Ascaris) infestation may complicate to:',
 'Malnutrition, ground itch',
 'Chronic cough, anaemia',
 'Rectal prolapse, intestinal obstruction',
 'Intestinal obstruction, malnutrition',
 'D',
 'Heavy Ascaris loads can cause intestinal obstruction (worm bolus blocking the small intestine — a surgical emergency) and malnutrition from competition for nutrients. Ground itch is caused by hookworm larvae; rectal prolapse is a complication of Trichuris trichiura. Ref: Parasitology; standard nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'Roundworm (Ascaris) infestation may complicate to:',
 'Malnutrition, ground itch',
 'Chronic cough, anaemia',
 'Rectal prolapse, intestinal obstruction',
 'Intestinal obstruction, malnutrition',
 'D',
 'Heavy Ascaris loads can cause intestinal obstruction (worm bolus) and malnutrition. Ground itch is hookworm; rectal prolapse is Trichuris. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q156 — Hormonal contraceptive methods: Jadelle, Microgynon, Microlut
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'Hormonal contraceptive methods include:',
 'Jadelle, microgynon, copper T380A',
 'Copper T380A, postinor, Depo-provera',
 'Foaming tablets, jadelle, Depo-provera',
 'Jadelle, Microgynon, micro-lut',
 'D',
 'Jadelle (levonorgestrel implant), Microgynon (combined oral contraceptive pill) and Microlut (progestin-only pill) are all hormonal contraceptives. The copper T380A (IUCD) is non-hormonal; foaming tablets are spermicides. Postinor is an emergency contraceptive but is hormonal; however the best all-hormonal option is D. Ref: MOH Kenya Family Planning Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'Hormonal contraceptive methods include:',
 'Jadelle, microgynon, copper T380A',
 'Copper T380A, postinor, Depo-provera',
 'Foaming tablets, jadelle, Depo-provera',
 'Jadelle, Microgynon, micro-lut',
 'D',
 'Jadelle (implant), Microgynon (combined pill) and Microlut (progestin-only pill) are all hormonal. Copper T is non-hormonal; foaming tablets are spermicides. Ref: MOH Kenya Family Planning Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q158 — Semi-permanent house: cemented floor, timber walls, iron roof
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Environmental Health', 'Housing',
 'A house should be regarded as semi-permanent if it has:',
 'A cemented floor, stone foundation and iron roofed',
 'A non-cemented floor, walls made of timber and iron roofed',
 'A cemented floor, walls made of timber and iron roofed',
 'A non-cemented floor, walls made of iron sheets and iron roofed',
 'C',
 'A semi-permanent house combines some durable and some non-durable materials. Typically: cemented (durable) floor and iron (durable) roof, but timber (non-permanent) walls. A permanent house would have stone or brick walls with a cemented floor and iron/tile roof. Ref: Environmental health (housing standards); MOH Kenya.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'A house should be regarded as semi-permanent if it has:',
 'A cemented floor, stone foundation and iron roofed',
 'A non-cemented floor, walls made of timber and iron roofed',
 'A cemented floor, walls made of timber and iron roofed',
 'A non-cemented floor, walls made of iron sheets and iron roofed',
 'C',
 'A semi-permanent house combines durable elements (cemented floor, iron roof) with non-durable elements (timber walls). Ref: Environmental health (housing standards); MOH Kenya.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q159 — Half of body mineral content: calcium
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'About half of the body''s mineral content is:',
 'Bone',
 'Calcium',
 'Phosphorous',
 'Magnesium',
 'B',
 'Calcium is the most abundant mineral in the body, accounting for approximately 40–50% of total body mineral content (about 1000–1200 g in adults), with 99% stored in bones and teeth. Phosphorus is the second most abundant. Ref: Nutrition/physiology; standard nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'About half of the body''s mineral content is:',
 'Bone',
 'Calcium',
 'Phosphorous',
 'Magnesium',
 'B',
 'Calcium is the most abundant mineral in the body, accounting for approximately half of total body mineral content. Ref: Nutrition/physiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q161 — Live attenuated vaccines: OPV and measles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'Vaccines that contain live attenuated agents include:',
 'Measles, tetanus',
 'Pentavalent, polio',
 'Tetanus, BCG',
 'Polio (OPV), measles',
 'D',
 'Live attenuated vaccines in the Kenya EPI schedule include BCG, OPV (oral polio vaccine), measles vaccine and yellow fever vaccine. OPV and measles are both live attenuated. Tetanus (TT) and pentavalent (DPT-HepB-Hib) are inactivated/toxoid vaccines. Ref: Kenya KEPI immunization schedule.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'Vaccines that contain live attenuated agents include:',
 'Measles, tetanus',
 'Pentavalent, polio',
 'Tetanus, BCG',
 'Polio (OPV), measles',
 'D',
 'Live attenuated vaccines in the Kenya EPI include BCG, OPV and measles. Tetanus and pentavalent are inactivated/toxoid. Ref: Kenya KEPI immunization schedule.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q162 — Growth assessment focus: increase in size and weight
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Growth Monitoring',
 'When assessing the growth of a child, the health provider focuses on:',
 'Functioning of body structures',
 'Development of activities and functions',
 'Ability to learn and play',
 'Increase in size and weight of the body',
 'D',
 'Growth refers to measurable increases in physical size: weight, length/height, head circumference and other anthropometric measurements. Development concerns functional skill acquisition (motor, cognitive, social, language). The two are complementary but distinct. Ref: Growth and development; MOH Kenya Well-Child surveillance.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Growth Monitoring',
 'When assessing the growth of a child, the health provider focuses on:',
 'Functioning of body structures',
 'Development of activities and functions',
 'Ability to learn and play',
 'Increase in size and weight of the body',
 'D',
 'Growth refers to measurable increases in physical size (weight, height, head circumference). Development concerns functional skill acquisition. Ref: Growth and development; MOH Kenya Well-Child surveillance.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q164 — HIV Stage 4: PCP, extrapulmonary TB, CMV
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'HIV/AIDS',
 'Symptoms of clinical stage 4 HIV/AIDS in adolescents and adults include:',
 'Persistent generalised lymphadenopathy, angular cheilitis, unexplained weight loss less than 10%',
 'Herpes zoster, recurrent oral ulcerations, unexplained weight loss greater than 10%',
 'Persistent oral candidiasis, HIV encephalopathy, severe bacterial infections',
 'Pneumocystis pneumonia, extrapulmonary TB, cytomegalovirus infection',
 'D',
 'WHO HIV Clinical Stage 4 (AIDS-defining) conditions include Pneumocystis carinii pneumonia (PCP), extrapulmonary tuberculosis, cytomegalovirus disease, Kaposi sarcoma and HIV wasting syndrome. Option A = Stage 1–2; Option B = Stage 2–3; Option C = Stage 3. Ref: WHO/MOH Kenya HIV Clinical Staging guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'HIV/AIDS',
 'Symptoms of clinical stage 4 HIV/AIDS in adolescents and adults include:',
 'Persistent generalised lymphadenopathy, angular cheilitis, unexplained weight loss less than 10%',
 'Herpes zoster, recurrent oral ulcerations, unexplained weight loss greater than 10%',
 'Persistent oral candidiasis, HIV encephalopathy, severe bacterial infections',
 'Pneumocystis pneumonia, extrapulmonary TB, cytomegalovirus infection',
 'D',
 'WHO HIV Stage 4 (AIDS-defining) includes PCP, extrapulmonary TB and CMV disease. Ref: WHO/MOH Kenya HIV Clinical Staging guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q165 — Glossina fly: trypanosomiasis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'Glossina fly is responsible for:',
 'Trypanosomiasis',
 'Plague',
 'Dracunculosis',
 'Leishmaniasis',
 'A',
 'The tsetse fly (Glossina species) transmits African trypanosomiasis (sleeping sickness — Trypanosoma brucei). Plague is transmitted by fleas; leishmaniasis by sandflies (Phlebotomus); dracunculosis (guinea worm) by copepods in drinking water. Ref: Parasitology/medical entomology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'Glossina fly is responsible for:',
 'Trypanosomiasis',
 'Plague',
 'Dracunculosis',
 'Leishmaniasis',
 'A',
 'The tsetse fly (Glossina) transmits African trypanosomiasis (sleeping sickness). Plague = flea; leishmaniasis = sandfly; dracunculosis = copepod. Ref: Parasitology/medical entomology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q167 — Microgynon as emergency contraceptive: 4 pills per dose (Yuzpe)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'When microgynon is used as an emergency contraceptive, the required number of pills per dose are:',
 '2',
 '4',
 '1',
 '3',
 'B',
 'Using the Yuzpe method with low-dose combined pills such as Microgynon (30 mcg ethinylestradiol + 150 mcg levonorgestrel), 4 pills are taken per dose (two doses 12 hours apart) to deliver the required 100 mcg ethinylestradiol + 500 mcg levonorgestrel. Ref: MOH Kenya Emergency Contraception Guidance; family planning guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'When microgynon is used as an emergency contraceptive, the required number of pills per dose are:',
 '2',
 '4',
 '1',
 '3',
 'B',
 'Using the Yuzpe method with Microgynon, 4 pills per dose (two doses 12 hours apart) deliver the required hormonal dose. Ref: MOH Kenya Emergency Contraception Guidance.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q170 — Non-essential amino acids: synthesised in the body
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'Non-essential amino acids:',
 'Are derived from vegetable sources',
 'Do not meet the nutritional needs of the body',
 'Are incomplete protein molecules',
 'Can be synthesised in the body',
 'D',
 'Non-essential amino acids can be synthesised by the body from other metabolites and therefore do not need to be supplied in the diet. Essential amino acids cannot be synthesised and must be obtained from food. Both types are needed for protein synthesis and bodily functions. Ref: Nutrition/biochemistry; standard nursing texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'Non-essential amino acids:',
 'Are derived from vegetable sources',
 'Do not meet the nutritional needs of the body',
 'Are incomplete protein molecules',
 'Can be synthesised in the body',
 'D',
 'Non-essential amino acids can be synthesised by the body. Essential amino acids must come from diet. Ref: Nutrition/biochemistry.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q172 — Demographic data: population size, density, composition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Diagnosis',
 'In community diagnosis, demographic data includes:',
 'Population size, population density, population composition',
 'Population density, cultural patterns, population size',
 'Population composition, cultural patterns, population size',
 'Population composition, cultural patterns, occupation',
 'A',
 'Demographic data are purely population statistics: size (total number), density (number per unit area) and composition (age/sex structure, ethnic groups). Cultural patterns and occupation are social data, not demographic data. Ref: Community diagnosis; demography.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Diagnosis',
 'In community diagnosis, demographic data includes:',
 'Population size, population density, population composition',
 'Population density, cultural patterns, population size',
 'Population composition, cultural patterns, population size',
 'Population composition, cultural patterns, occupation',
 'A',
 'Demographic data = population size, density and composition. Cultural patterns and occupation are social data. Ref: Community diagnosis; demography.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q173 — Infective stage of Taenia: cysticercus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'The infective stage of Taenia species is:',
 'Oncosphere',
 'Cysticercus (Cysticerci)',
 'Hexacanth',
 'Rhabditiform',
 'B',
 'Humans acquire Taenia saginata (beef tapeworm) or Taenia solium (pork tapeworm) by eating undercooked meat containing the cysticercus larva, which is the infective stage for the definitive host. The oncosphere/hexacanth is the form in the egg that infects the intermediate host. Rhabditiform is a hookworm/Strongyloides larval stage. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'The infective stage of Taenia species is:',
 'Oncosphere',
 'Cysticercus (Cysticerci)',
 'Hexacanth',
 'Rhabditiform',
 'B',
 'Humans acquire Taenia infection by eating undercooked meat containing the cysticercus larva (the infective stage). Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q174 — AIDS enteral opportunistic infection: Cryptosporidium
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'HIV/AIDS',
 'The organism associated with enteral infection in HIV/AIDS is:',
 'Giardia lamblia',
 'Cryptosporidia',
 'Salmonella typhi',
 'Trichuris trichiura',
 'B',
 'Cryptosporidium parvum causes chronic, profuse watery diarrhoea in immunocompromised HIV/AIDS patients and is classified as an AIDS-defining opportunistic enteric infection. Giardia causes self-limiting diarrhoea in immunocompetent individuals. Ref: HIV opportunistic infections; MOH Kenya HIV management guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'HIV/AIDS',
 'The organism associated with enteral infection in HIV/AIDS is:',
 'Giardia lamblia',
 'Cryptosporidia',
 'Salmonella typhi',
 'Trichuris trichiura',
 'B',
 'Cryptosporidium causes AIDS-defining chronic profuse watery diarrhoea in immunocompromised patients. Ref: HIV opportunistic infections; MOH Kenya HIV management guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q176 — MUAC: measures muscle wasting/acute malnutrition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'In nutritional assessment, mid-upper arm circumference (MUAC) is taken to determine:',
 'Weight',
 'Body frame',
 'Skin elasticity',
 'Muscle wasting (acute malnutrition)',
 'D',
 'MUAC is a simple, reliable screening tool that reflects muscle and fat reserves of the arm; it is used to detect acute malnutrition (muscle wasting) in children (MUAC <11.5 cm = severe acute malnutrition) and in pregnant/lactating women. Ref: Kenya Integrated Management of Acute Malnutrition (IMAM) guidelines; MOH nutrition.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'In nutritional assessment, mid-upper arm circumference (MUAC) is taken to determine:',
 'Weight',
 'Body frame',
 'Skin elasticity',
 'Muscle wasting (acute malnutrition)',
 'D',
 'MUAC reflects muscle and fat reserves and is used to detect acute malnutrition/muscle wasting in children and pregnant/lactating women. Ref: Kenya IMAM guidelines; MOH nutrition.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q178 — Relapsing malaria species: P. vivax and P. ovale
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Malaria',
 'The malaria species responsible for recurrent (relapsing) infections are:',
 'Plasmodium ovale and Plasmodium malariae',
 'Plasmodium vivax and Plasmodium ovale',
 'Plasmodium falciparum and Plasmodium ovale',
 'Plasmodium vivax and Plasmodium falciparum',
 'B',
 'P. vivax and P. ovale form dormant liver hypnozoites that cause true relapses (reactivation months to years after initial infection). P. malariae causes recrudescence (not true relapse — no hypnozoites); P. falciparum has no hypnozoites and causes recrudescence only. Ref: Parasitology; Kenya National Malaria Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Malaria',
 'The malaria species responsible for recurrent (relapsing) infections are:',
 'Plasmodium ovale and Plasmodium malariae',
 'Plasmodium vivax and Plasmodium ovale',
 'Plasmodium falciparum and Plasmodium ovale',
 'Plasmodium vivax and Plasmodium falciparum',
 'B',
 'P. vivax and P. ovale form dormant liver hypnozoites causing true relapses. P. malariae causes recrudescence; P. falciparum has no hypnozoites. Ref: Parasitology; Kenya National Malaria Guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q179 — Typhoid prodromal phase: headache, anorexia, malaise
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Communicable Diseases',
 'Clinical features of typhoid fever in the prodromal phase include:',
 'Scattered crepitations, spleen enlargement, constipation',
 'Headache, anorexia, malaise',
 'Abdominal tenderness, ileum perforation, constipation',
 'Mental confusion, abdominal distension, pea-soup diarrhoea',
 'B',
 'The early prodromal (first week) phase of typhoid fever presents with non-specific symptoms: stepwise rising fever, headache, anorexia, malaise and general body aches. Splenomegaly, rose spots, constipation and intestinal complications develop later. Pea-soup diarrhoea and perforation are complications of the third to fourth week. Ref: Communicable disease nursing; MOH Kenya guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Communicable Diseases',
 'Clinical features of typhoid fever in the prodromal phase include:',
 'Scattered crepitations, spleen enlargement, constipation',
 'Headache, anorexia, malaise',
 'Abdominal tenderness, ileum perforation, constipation',
 'Mental confusion, abdominal distension, pea-soup diarrhoea',
 'B',
 'The prodromal (first week) phase of typhoid presents with headache, anorexia and malaise. Splenomegaly, constipation and late complications develop later. Ref: Communicable disease nursing; MOH Kenya guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q185 — Aedes aegypti: yellow fever
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Communicable Diseases',
 'The Aedes aegypti mosquito is associated with:',
 'Yellow fever',
 'Relapsing fever',
 'Leishmaniasis',
 'Dracunculosis',
 'A',
 'Aedes aegypti is the primary vector for yellow fever virus, and also transmits dengue, chikungunya and Zika viruses. Relapsing fever is transmitted by lice (Borrelia recurrentis) or ticks; leishmaniasis by sandflies; dracunculosis by copepods in water. Ref: Vector-borne disease; medical entomology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Communicable Diseases',
 'The Aedes aegypti mosquito is associated with:',
 'Yellow fever',
 'Relapsing fever',
 'Leishmaniasis',
 'Dracunculosis',
 'A',
 'Aedes aegypti transmits yellow fever (also dengue, chikungunya, Zika). Ref: Vector-borne disease; medical entomology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q188 — Vitamin K sources: liver and green leafy vegetables
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'Dietary sources for vitamin K include:',
 'Legumes and citrus fruits',
 'Milk and yellow vegetables',
 'Liver and green (leafy) vegetables',
 'Meat and whole grains',
 'C',
 'Vitamin K1 (phylloquinone) is found primarily in green leafy vegetables (spinach, kale, broccoli) and liver. Vitamin K2 (menaquinone) is produced by intestinal bacteria. Citrus fruits contain vitamin C; yellow vegetables contain beta-carotene (vitamin A). Ref: Nutrition; MOH Kenya dietary guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'Dietary sources for vitamin K include:',
 'Legumes and citrus fruits',
 'Milk and yellow vegetables',
 'Liver and green (leafy) vegetables',
 'Meat and whole grains',
 'C',
 'Vitamin K is found in green leafy vegetables and liver. Citrus = vitamin C; yellow vegetables = vitamin A. Ref: Nutrition; MOH Kenya dietary guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q190 — Common causes of growth failure in early infancy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'Common causes of growth failure in early infancy include:',
 'Skeletal dysplasia, psychomotor retardation',
 'Mental retardation, limited maternal-child interaction',
 'Chromosomal disorders, inborn errors of metabolism',
 'Malnutrition, chronic illnesses',
 'D',
 'The commonest causes of failure to thrive in infancy in the Kenyan context are inadequate nutritional intake/malnutrition and chronic illnesses (recurrent infections, HIV, congenital heart disease, etc.). Rare causes include chromosomal disorders and metabolic diseases. Ref: Kenya Basic Paediatric Protocols; paediatric nutrition and growth monitoring.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'Common causes of growth failure in early infancy include:',
 'Skeletal dysplasia, psychomotor retardation',
 'Mental retardation, limited maternal-child interaction',
 'Chromosomal disorders, inborn errors of metabolism',
 'Malnutrition, chronic illnesses',
 'D',
 'The commonest causes of failure to thrive in infancy are malnutrition and chronic illnesses. Ref: Kenya Paediatric Protocols; growth monitoring.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q191 — Incidence rate: rate of occurrence of new disease
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Epidemiology',
 'Incidence rate:',
 'Shows the rate of development (occurrence) of disease in the community',
 'Is used to record protracted disease',
 'Shows the magnitude of disease in the community',
 'Is useful for planning and administration of health care services',
 'A',
 'Incidence rate measures the rate at which new cases of disease develop in a defined population over a defined period, indicating the force of disease occurrence or risk. Prevalence shows magnitude/burden and is more useful for service planning. Ref: Epidemiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Epidemiology',
 'Incidence rate:',
 'Shows the rate of development (occurrence) of disease in the community',
 'Is used to record protracted disease',
 'Shows the magnitude of disease in the community',
 'Is useful for planning and administration of health care services',
 'A',
 'Incidence rate measures the rate of new disease occurrence in a population, indicating risk. Prevalence shows magnitude/burden. Ref: Epidemiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q192 — Deciduous teeth: 8 incisors, 4 canines, 8 molars
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Oral Health',
 'The complete set of deciduous teeth consists of:',
 '8 incisors, 8 canines, 4 premolars',
 '4 incisors, 8 canines and 4 premolars',
 '8 incisors, 4 canines, 8 molars',
 '4 incisors, 8 canines and 8 molars',
 'C',
 'There are 20 primary (deciduous) teeth: 8 incisors (4 upper, 4 lower), 4 canines (2 upper, 2 lower) and 8 molars (4 upper, 4 lower). There are no premolars in the primary dentition — premolars are permanent teeth. Ref: Oral health/anatomy; dental nursing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Oral Health',
 'The complete set of deciduous teeth consists of:',
 '8 incisors, 8 canines, 4 premolars',
 '4 incisors, 8 canines and 4 premolars',
 '8 incisors, 4 canines, 8 molars',
 '4 incisors, 8 canines and 8 molars',
 'C',
 'There are 20 primary teeth: 8 incisors, 4 canines and 8 molars. No premolars in primary dentition. Ref: Oral health/anatomy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q193 — Tertiary prevention: rehabilitation after polio, palliative care
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Levels of Prevention',
 'Tertiary disease prevention includes:',
 'Giving vaccines during disease outbreak, teaching about preventive measures',
 'Monitoring of blood glucose level in diabetic patients, advising on diet',
 'Mobilizing a child with calipers after a polio attack, palliative care',
 'Teaching mothers on balanced diet to prevent malnutrition, providing food samples',
 'C',
 'Tertiary prevention limits disability and rehabilitates established disease, maximising remaining function. Using calipers after polio and palliative care are tertiary prevention. Blood glucose monitoring is secondary prevention; diet teaching and vaccination are primary prevention. Ref: Levels of prevention; rehabilitation nursing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Levels of Prevention',
 'Tertiary disease prevention includes:',
 'Giving vaccines during disease outbreak, teaching about preventive measures',
 'Monitoring of blood glucose level in diabetic patients, advising on diet',
 'Mobilizing a child with calipers after a polio attack, palliative care',
 'Teaching mothers on balanced diet to prevent malnutrition, providing food samples',
 'C',
 'Tertiary prevention limits disability and rehabilitates established disease: calipers after polio and palliative care. Ref: Levels of prevention; rehabilitation nursing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q196 — Kenya added to Alma-Ata PHC elements: dental and mental health
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Primary Health Care',
 'The primary health care elements that Kenya added to the Alma-Ata ones include:',
 'HIV/AIDS and essential drugs',
 'Nutrition and health education',
 'Dental health and mental health',
 'Community-based rehabilitation and immunization',
 'C',
 'To the eight Alma-Ata PHC elements, Kenya added dental (oral) health and mental health as additional locally relevant priority elements. Ref: Kenya National Health Policy; MOH Kenya PHC framework.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Primary Health Care',
 'The primary health care elements that Kenya added to the Alma-Ata ones include:',
 'HIV/AIDS and essential drugs',
 'Nutrition and health education',
 'Dental health and mental health',
 'Community-based rehabilitation and immunization',
 'C',
 'Kenya added dental health and mental health to the Alma-Ata PHC elements. Ref: Kenya National Health Policy; MOH PHC framework.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q197 — Ground itch: hookworm
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'The intestinal worm associated with "ground itch" is:',
 'Ankylostoma duodenale (hookworm)',
 'Trichuris trichiura',
 'Taenia solium',
 'Enterobius vermicularis',
 'A',
 'Hookworm larvae (Ankylostoma duodenale and Necator americanus) penetrate the intact skin of bare feet, causing intense pruritic dermatitis known as "ground itch" or cutaneous larva migrans at the entry site. Ref: Parasitology; standard nursing and community health texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'The intestinal worm associated with "ground itch" is:',
 'Ankylostoma duodenale (hookworm)',
 'Trichuris trichiura',
 'Taenia solium',
 'Enterobius vermicularis',
 'A',
 'Hookworm larvae penetrate the skin of bare feet, causing "ground itch." Ref: Parasitology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q198 — Definitive host: parasite reaches sexual maturity
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'A definitive host:',
 'Harbors the parasite until some developmental stage is complete',
 'Is one in which a parasite reaches maturity and reproduces sexually',
 'Harbors the parasite with no illness',
 'Does not allow transmission of a parasite to an incidental host',
 'B',
 'The definitive host is the organism in which the parasite attains sexual maturity and reproduces sexually. The intermediate host harbours the larval or asexual stages. A reservoir host harbours a parasite with or without illness. Ref: Parasitology; standard nursing texts.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'A definitive host:',
 'Harbors the parasite until some developmental stage is complete',
 'Is one in which a parasite reaches maturity and reproduces sexually',
 'Harbors the parasite with no illness',
 'Does not allow transmission of a parasite to an incidental host',
 'B',
 'The definitive host is where the parasite reaches sexual maturity and reproduces sexually. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q200 — Artificial passive immunity: inoculation with prepared antibodies
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'Artificial passive immunity is acquired through:',
 'Getting the actual disease',
 'Getting into contact with the antibodies from breast milk',
 'Inoculation with prepared antigens',
 'Inoculation with prepared antibodies',
 'D',
 'Artificial passive immunity is conferred by administering ready-made antibodies (antisera or immunoglobulins such as tetanus immunoglobulin, anti-rabies serum). Prepared antigens (vaccines) confer artificial active immunity; breast milk antibodies are natural passive immunity. Ref: Immunology; Kenya KEPI immunization programme.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'Artificial passive immunity is acquired through:',
 'Getting the actual disease',
 'Getting into contact with the antibodies from breast milk',
 'Inoculation with prepared antigens',
 'Inoculation with prepared antibodies',
 'D',
 'Artificial passive immunity is conferred by administering ready-made antibodies (antisera/immunoglobulins). Prepared antigens give artificial active immunity. Ref: Immunology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q195 — Manager structuring into operational groups: organizing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Health Systems & Management',
 'A manager who is involved in structuring activities into operational groups engages in a role of:',
 'Job designing',
 'Staffing',
 'Scheduling',
 'Organizing',
 'D',
 'Organizing is the management function of arranging and structuring work, resources and people into operational units/groups to achieve objectives efficiently. It includes defining roles, establishing authority relationships and creating departments. Ref: Nursing management; management functions (Fayol''s POLC).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'A manager who is involved in structuring activities into operational groups engages in a role of:',
 'Job designing',
 'Staffing',
 'Scheduling',
 'Organizing',
 'D',
 'Organizing is the management function of structuring work and resources into operational units. Ref: Nursing management; management functions (Fayol''s POLC).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 4: RESEARCH METHODS & BIOSTATISTICS — BScN Paper II | KRCHN Paper II
-- ─────────────────────────────────────────────────────────────────────────────

-- Q16 — Logical order of research report
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The logical order for a research report is:',
 'Abstract, title, introduction, literature review, methodology, results, discussion',
 'Title, abstract, introduction, literature review, methodology, results, discussion',
 'Introduction, title, abstract, literature review, methodology, results, discussion',
 'Title, abstract, introduction, literature review, methodology, discussion, results',
 'B',
 'A research report follows the standard structure: title, abstract, introduction (background/problem), literature review, methodology, results and finally discussion/conclusion. Results must always precede discussion because findings are presented before being interpreted. Ref: Research methods; academic writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The logical order for a research report is:',
 'Abstract, title, introduction, literature review, methodology, results, discussion',
 'Title, abstract, introduction, literature review, methodology, results, discussion',
 'Introduction, title, abstract, literature review, methodology, results, discussion',
 'Title, abstract, introduction, literature review, methodology, discussion, results',
 'B',
 'A research report is structured: title, abstract, introduction, literature review, methodology, results then discussion. Results precede discussion. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q17 — Hypothesis: predictable relationship between variables
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The predictable relationship between variables in a research study is known as:',
 'Validity',
 'Reliability',
 'Hypothesis',
 'Objectivity',
 'C',
 'A hypothesis is a tentative, testable statement predicting the expected relationship between variables. Validity refers to whether an instrument measures what it intends to; reliability refers to consistency/repeatability; objectivity refers to freedom from bias. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The predictable relationship between variables in a research study is known as:',
 'Validity',
 'Reliability',
 'Hypothesis',
 'Objectivity',
 'C',
 'A hypothesis is a tentative, testable statement predicting the relationship between variables. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q18 — Basic research: generates new knowledge
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Research that is aimed at only generating new knowledge is referred to as:',
 'Academic research',
 'Quantitative research',
 'Basic research',
 'Operational research',
 'C',
 'Basic (pure/fundamental) research seeks to generate new knowledge and theory without an immediate practical application. Operational and applied research are directed at solving specific practical problems. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Research that is aimed at only generating new knowledge is referred to as:',
 'Academic research',
 'Quantitative research',
 'Basic research',
 'Operational research',
 'C',
 'Basic (pure) research seeks to generate new knowledge without an immediate applied goal. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q19 — Convenience sampling: first 20 clients at MCH queue
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'During a study, a nurse researcher recruited the first 20 clients at the MCH queue to form the sample. This is referred to as:',
 'Purposive sampling',
 'Systematic sampling',
 'Convenience sampling',
 'Quota sampling',
 'C',
 'Convenience (accidental) sampling involves selecting whoever is readily available or accessible at the time of data collection. Taking the first 20 people at the queue is the classic example. It is quick but prone to selection bias. Ref: Research methods (non-probability sampling).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'During a study, a nurse researcher recruited the first 20 clients at the MCH queue to form the sample. This is referred to as:',
 'Purposive sampling',
 'Systematic sampling',
 'Convenience sampling',
 'Quota sampling',
 'C',
 'Convenience sampling selects whoever is readily available, e.g. the first 20 people at a queue. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q20 — Methodology section contents: sampling design, study design, sample size
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The methodology section of a research proposal contains:',
 'Background, hypothesis, justification',
 'Inclusion criteria, objectives, hypothesis',
 'Sampling design, study design, sample size',
 'Work plan, budget, questionnaire',
 'C',
 'The methodology section describes how the study will be conducted: study design, study setting/population, sampling design, sample size calculation, data collection instruments, and data analysis plan. Background and objectives are in the introduction; work plan and budget are in appendices. Ref: Research methods; research proposal writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The methodology section of a research proposal contains:',
 'Background, hypothesis, justification',
 'Inclusion criteria, objectives, hypothesis',
 'Sampling design, study design, sample size',
 'Work plan, budget, questionnaire',
 'C',
 'The methodology section contains study design, sampling design and sample size. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q31 — Biased sampling method: quota sampling
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following is a biased sampling method:',
 'Cluster',
 'Quota',
 'Stratified random',
 'Systematic',
 'B',
 'Quota sampling is a non-probability method prone to selection bias because the researcher non-randomly selects subjects to fill predetermined quotas. Cluster, stratified random and systematic sampling are probability (random) methods that give each element a known chance of selection, minimising selection bias. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following is a biased sampling method:',
 'Cluster',
 'Quota',
 'Stratified random',
 'Systematic',
 'B',
 'Quota sampling is non-probability and prone to selection bias. Cluster, stratified random and systematic are probability methods. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q32 — Closed-ended questions advantage: easy to administer and analyse
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following is an advantage of closed-ended questions in a questionnaire:',
 'Easy to construct',
 'Easy to administer (and analyse)',
 'Responses are limited',
 'Permit greater depth of response',
 'B',
 'Closed-ended questions are quick to answer, easy to administer, code and statistically analyse. They are actually harder to construct well, limit the range of responses (a disadvantage) and do not permit depth of response. Ref: Research methods (questionnaire design).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following is an advantage of closed-ended questions in a questionnaire:',
 'Easy to construct',
 'Easy to administer (and analyse)',
 'Responses are limited',
 'Permit greater depth of response',
 'B',
 'Closed-ended questions are easy to administer and analyse. They limit responses (a disadvantage) and do not allow depth. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q33 — Qualitative research: consciousness and subjectivity
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Qualitative research is interested in questions that involve:',
 'Cause and effect relationships',
 'Consciousness and subjectivity (meanings, experiences)',
 'Control and measurement',
 'Generalization and prediction',
 'B',
 'Qualitative research explores subjective human experiences, meanings, perceptions and consciousness. Cause-effect relationships, control, measurement, generalization and prediction characterise quantitative research. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Qualitative research is interested in questions that involve:',
 'Cause and effect relationships',
 'Consciousness and subjectivity (meanings, experiences)',
 'Control and measurement',
 'Generalization and prediction',
 'B',
 'Qualitative research explores subjective human experiences and meanings. Cause-effect, control and prediction are quantitative. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q34 — Best academic literature: peer-reviewed journal article
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The best literature in academic terms is a:',
 'Recent book',
 'Refereed (peer-reviewed) journal article',
 'Conference proceedings',
 'Scientific publication (general)',
 'B',
 'A peer-reviewed (refereed) journal article is considered the most authoritative academic source because the content has been critically scrutinised by independent experts prior to publication, ensuring rigour and credibility. Ref: Research methods; academic writing/evidence hierarchy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The best literature in academic terms is a:',
 'Recent book',
 'Refereed (peer-reviewed) journal article',
 'Conference proceedings',
 'Scientific publication (general)',
 'B',
 'A peer-reviewed journal article is the most authoritative academic source due to expert scrutiny. Ref: Research methods; academic writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q35 — Informed consent definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Ethics',
 'The agreement of the participant to take part in a research project after having been thoroughly briefed about the project is:',
 'Human dignity',
 'Full disclosure',
 'Self-determination',
 'Informed consent',
 'D',
 'Informed consent is the voluntary agreement of a participant to take part in a study after being fully informed of the study''s nature, purpose, risks, benefits and right to withdraw. Full disclosure and self-determination are ethical principles that contribute to informed consent but are not the same as it. Ref: Research ethics; Belmont Report principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Ethics',
 'The agreement of the participant to take part in a research project after having been thoroughly briefed about the project is:',
 'Human dignity',
 'Full disclosure',
 'Self-determination',
 'Informed consent',
 'D',
 'Informed consent is voluntary agreement to participate after full information about the study. Ref: Research ethics.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q36 — Observational study of wound healing: pure/direct observation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The most appropriate method of studying the characteristics of wound healing would be:',
 'Questionnaire',
 'Participant observation',
 'Pure (direct) observation',
 'Content analysis',
 'C',
 'A physical, observable process like wound healing is best studied through pure (non-participant, direct) observation, allowing systematic, objective recording of healing characteristics over time without researcher interference. Questionnaires capture subjective reports; content analysis is for documents. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q41 — Plagiarism: using another author's work without acknowledgement
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Ethics',
 'Plagiarism occurs if a researcher:',
 'Quotes the exact words of another author and gives a reference',
 'Paraphrases a passage by another author (and references it)',
 'Uses an idea or material based directly on the work of another author and gives the reference',
 'Uses another author''s work without acknowledgement/reference',
 'D',
 'Plagiarism is presenting another person''s words, ideas or work as one''s own without proper acknowledgement or citation. Properly referenced quotations, paraphrases and cited ideas are not plagiarism. Ref: Research ethics; academic integrity.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Ethics',
 'Plagiarism occurs if a researcher:',
 'Quotes the exact words of another author and gives a reference',
 'Paraphrases a passage by another author (and references it)',
 'Uses an idea or material based directly on the work of another author and gives the reference',
 'Uses another author''s work without acknowledgement/reference',
 'D',
 'Plagiarism is using another''s work without acknowledgement/citation. Properly referenced material is not plagiarism. Ref: Research ethics; academic integrity.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q42 — Sampling process order: identify frame → method → size
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The sampling process involves:',
 'Identify the sampling frame, determine sample size, select the sampling method',
 'Select the sampling method, determine sample size, identify the sampling frame',
 'Identify the sampling frame, select the sampling method, determine sample size',
 'Select the sampling method, identify the sampling frame, determine sample size',
 'C',
 'The logical sequence of sampling is: (1) Identify/define the sampling frame (the list or source from which the sample will be drawn); (2) Select the appropriate sampling method; (3) Determine the sample size. The frame must be known before selecting a method or calculating size. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The sampling process involves:',
 'Identify the sampling frame, determine sample size, select the sampling method',
 'Select the sampling method, determine sample size, identify the sampling frame',
 'Identify the sampling frame, select the sampling method, determine sample size',
 'Select the sampling method, identify the sampling frame, determine sample size',
 'C',
 'Sampling sequence: identify the sampling frame → select sampling method → determine sample size. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q45 — Intervention study design: quasi-experimental
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following is an intervention study design:',
 'Quasi-experimental design',
 'Evaluative study design',
 'Exploratory study design',
 'Descriptive study design',
 'A',
 'Quasi-experimental designs involve an intervention or manipulation of the independent variable but lack full randomisation to groups, making them interventional but not true experiments. Descriptive, exploratory and evaluative designs are typically observational. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following is an intervention study design:',
 'Quasi-experimental design',
 'Evaluative study design',
 'Exploratory study design',
 'Descriptive study design',
 'A',
 'Quasi-experimental designs involve an intervention but lack full randomisation. Descriptive/exploratory are observational. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q88 — Quasi-experiment vs experiment: no randomization
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The main difference between an experiment and a quasi-experiment is that, in a quasi-experiment:',
 'There is a control group',
 'There is no randomization',
 'There is no manipulation',
 'There is a treatment group',
 'B',
 'A quasi-experiment includes an intervention (manipulation) but lacks random assignment of subjects to groups, which is what distinguishes it from a true experiment. Both may have control and treatment groups, and both involve manipulation. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The main difference between an experiment and a quasi-experiment is that, in a quasi-experiment:',
 'There is a control group',
 'There is no randomization',
 'There is no manipulation',
 'There is a treatment group',
 'B',
 'Quasi-experiments include an intervention but lack randomisation. True experiments have randomisation. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q89 — Cohort study: group studied over time
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The type of research where a group of subjects with similar qualities are studied over a period of time is referred to as:',
 'Action study',
 'Cross-sectional study',
 'Cohort study',
 'Correlational study',
 'C',
 'A cohort study follows a defined group sharing common characteristics (a cohort) prospectively over time to observe and compare outcomes. Cross-sectional studies capture data at a single point in time. Correlational studies examine statistical relationships. Ref: Epidemiology/research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The type of research where a group of subjects with similar qualities are studied over a period of time is referred to as:',
 'Action study',
 'Cross-sectional study',
 'Cohort study',
 'Correlational study',
 'C',
 'A cohort study follows a defined group over time to observe outcomes. Cross-sectional captures one point in time. Ref: Epidemiology/research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q90 — Best definition of hypothesis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following best defines a hypothesis:',
 'Tentative statements of the expected relationships between variables',
 'Clear, concise, declarative statement expressed to direct the study',
 'An issue that requires solution',
 'A measurable characteristic that assumes different values',
 'A',
 'A hypothesis is a tentative, testable statement of the expected relationship between two or more variables, derived from theory or prior evidence. Option B defines a purpose statement; C defines a research problem; D defines a variable. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following best defines a hypothesis:',
 'Tentative statements of the expected relationships between variables',
 'Clear, concise, declarative statement expressed to direct the study',
 'An issue that requires solution',
 'A measurable characteristic that assumes different values',
 'A',
 'A hypothesis is a tentative, testable statement of expected variable relationships. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q91 — Beliefs and behaviour investigated by: qualitative research
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The way people behave and believe can best be investigated using:',
 'Quantitative research design',
 'Experimental design',
 'Qualitative research design',
 'Descriptive research design',
 'C',
 'Beliefs, behaviours, meanings and lived experiences are best explored through qualitative research, which captures depth, subjectivity and context through methods such as interviews, focus groups and observation. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q92 — Pilot study: determine feasibility
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Pilot studies are carried out to:',
 'Give the researcher good experience, evaluate the procedure for data analysis',
 'Determine resources required for a study, to influence policy change',
 'Evaluate the research assistants, answer the research questions',
 'Determine the feasibility of the study (and test/refine instruments and procedures)',
 'D',
 'A pilot study is a small-scale trial run to test the feasibility of the main study, refine instruments and procedures, identify unanticipated problems, estimate required sample size and time, and train research assistants. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Pilot studies are carried out to:',
 'Give the researcher good experience, evaluate the procedure for data analysis',
 'Determine resources required for a study, to influence policy change',
 'Evaluate the research assistants, answer the research questions',
 'Determine the feasibility of the study (and test/refine instruments and procedures)',
 'D',
 'A pilot study tests feasibility and refines instruments/procedures before the main study. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q201 — Extraneous variables: environmental variables influencing results
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Extraneous variables:',
 'Are variables within the environment that influence the research findings',
 'Are variables within an individual',
 'Are attributed to demographic data such as age and gender',
 'Surface when the independent variable starts operating',
 'A',
 'Extraneous variables are external (environmental or confounding) variables, outside the study''s intended focus, that can influence or confound results and must be controlled through study design or statistical methods. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Extraneous variables:',
 'Are variables within the environment that influence the research findings',
 'Are variables within an individual',
 'Are attributed to demographic data such as age and gender',
 'Surface when the independent variable starts operating',
 'A',
 'Extraneous variables are external/environmental variables that can influence and confound results. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q202 — Control group in clinical trials: placebo/no intervention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Control group in clinical trials receive:',
 'Active treatment',
 'Placebo (or standard/no intervention)',
 'Active treatment and placebo',
 'Palliative treatment and placebo',
 'B',
 'The control group receives a placebo (inert substance) or the standard/comparison intervention (no experimental treatment) so its outcomes can be compared with those of the treatment group, allowing assessment of the treatment''s true effect. Ref: Research methods (clinical trials).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Control group in clinical trials receive:',
 'Active treatment',
 'Placebo (or standard/no intervention)',
 'Active treatment and placebo',
 'Palliative treatment and placebo',
 'B',
 'The control group receives a placebo or standard/no experimental intervention for comparison. Ref: Research methods (clinical trials).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q203 — Initial step in research: identifying the problem
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The initial and one of the most significant steps in conducting research is:',
 'Defining the research variables',
 'Identifying the research problem',
 'Stating the research purpose',
 'Determining the feasibility of the study',
 'B',
 'The research process begins with identifying and clearly defining the research problem or gap in knowledge. Everything else — the purpose, variables, design, and methods — flows from the research problem. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The initial and one of the most significant steps in conducting research is:',
 'Defining the research variables',
 'Identifying the research problem',
 'Stating the research purpose',
 'Determining the feasibility of the study',
 'B',
 'The research process begins with identifying the research problem. All other steps follow from it. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q242 — Probability sampling methods
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'Probability sampling methods include:',
 'Cluster, quota, stratified',
 'Convenience, cluster, snowballing',
 'Snowballing, convenience, purposive',
 'Cluster, stratified, systematic',
 'D',
 'Probability (random) sampling methods ensure every element in the population has a known, non-zero probability of selection: simple random, systematic, stratified and cluster sampling. Quota, convenience, snowball and purposive are non-probability methods. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'Probability sampling methods include:',
 'Cluster, quota, stratified',
 'Convenience, cluster, snowballing',
 'Snowballing, convenience, purposive',
 'Cluster, stratified, systematic',
 'D',
 'Probability sampling: cluster, stratified and systematic. Quota, convenience, snowball and purposive are non-probability. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q245 — Reliability: stability or repeatability of data
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'In data collection, the term reliability refers to:',
 'Stability or repeatability of the data collected',
 'Originality of the tools being used for data collection',
 'The independence of the study investigators',
 'The extent to which the study instruments collect what is intended',
 'A',
 'Reliability is the consistency, stability and repeatability of measurement — the ability to obtain the same results under the same conditions on repeated occasions. Option D defines validity (measuring what is intended). Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'In data collection, the term reliability refers to:',
 'Stability or repeatability of the data collected',
 'Originality of the tools being used for data collection',
 'The independence of the study investigators',
 'The extent to which the study instruments collect what is intended',
 'A',
 'Reliability is the consistency and repeatability of measurement. Option D defines validity. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q277 — Action research: solves local problems
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The form of research typically conducted by nurses and other professionals to help them solve local problems is:',
 'Action research',
 'Basic research',
 'Predictive research',
 'Explorative research',
 'A',
 'Action research is practical, participatory research undertaken by practitioners to solve immediate local or workplace problems and improve practice. It involves cycles of planning, acting, observing and reflecting. Ref: Research methods; nursing research.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The form of research typically conducted by nurses and other professionals to help them solve local problems is:',
 'Action research',
 'Basic research',
 'Predictive research',
 'Explorative research',
 'A',
 'Action research is practical, participatory research to solve local workplace problems. Ref: Research methods; nursing research.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q278 — Quantitative research: confirms hypotheses
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following best describes quantitative research:',
 'The collection of non-numerical data',
 'An attempt to confirm the researcher''s hypotheses',
 'Research that is exploratory',
 'Research that attempts to generate a new theory',
 'B',
 'Quantitative research is deductive and confirmatory — it tests and confirms hypotheses using numerical data and statistical analysis to establish relationships or differences. Non-numerical data, exploration and theory generation characterise qualitative/grounded theory research. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following best describes quantitative research:',
 'The collection of non-numerical data',
 'An attempt to confirm the researcher''s hypotheses',
 'Research that is exploratory',
 'Research that attempts to generate a new theory',
 'B',
 'Quantitative research tests and confirms hypotheses using numerical data and statistical analysis. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q221 — Good hypothesis: testable within a reasonable time
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following is a characteristic of a good hypothesis:',
 'It should be stated clearly and in a lengthy paragraph',
 'It cannot be based on professional experience',
 'It must be testable within a reasonable time',
 'It should be inconsistent with common sense',
 'C',
 'A good hypothesis is clear, concise, testable and measurable within a reasonable timeframe, and consistent with existing knowledge and common sense. It should be based on professional experience, theory or prior evidence, not stated as a lengthy paragraph. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following is a characteristic of a good hypothesis:',
 'It should be stated clearly and in a lengthy paragraph',
 'It cannot be based on professional experience',
 'It must be testable within a reasonable time',
 'It should be inconsistent with common sense',
 'C',
 'A good hypothesis is clear, concise and testable within a reasonable time, consistent with existing knowledge. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q224 — Non-biased purpose statement verbs: test, compare, determine
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following are non-biased words that can be used to express the purpose of a study:',
 'Show, prove, compare',
 'Determine, compare, prove',
 'Test, compare, determine',
 'Determine, prove, show',
 'C',
 'Neutral, non-biased verbs for a purpose statement include determine, describe, explore, compare, examine and test. "Prove" and "show" imply a predetermined outcome and are biased. Option C uses only neutral verbs. Ref: Research methods; research proposal writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q280 — Simple random sample: random number table
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The following technique yields a simple random sample:',
 'Choosing volunteers from an introductory psychology class to participate',
 'Listing the individuals by ethnic group and choosing a proportion within each group at random',
 'Numbering all the elements of a sampling frame and then using a random number table to pick cases',
 'Randomly selecting schools, and then sampling everyone within the school',
 'C',
 'Simple random sampling gives every element in the population an equal, independent chance of selection, achieved by numbering all units and selecting using a random number table or random number generator. Option B = stratified; D = cluster; A = convenience. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The following technique yields a simple random sample:',
 'Choosing volunteers from an introductory psychology class to participate',
 'Listing the individuals by ethnic group and choosing a proportion within each group at random',
 'Numbering all the elements of a sampling frame and then using a random number table to pick cases',
 'Randomly selecting schools, and then sampling everyone within the school',
 'C',
 'Simple random sampling: number all units and select using a random number table. Option B = stratified; D = cluster; A = convenience. Ref: Research methods.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q276 — Ethical considerations in which research chapter: methodology
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The chapter of a research proposal that includes the ethical considerations is:',
 'Introduction',
 'Literature review',
 'Methodology',
 'Theoretical framework',
 'C',
 'Ethical considerations (informed consent, confidentiality, approvals, participant protection) are described within the methodology chapter, which details how the study will be conducted and safeguarded. Ref: Research methods; research proposal writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The chapter of a research proposal that includes the ethical considerations is:',
 'Introduction',
 'Literature review',
 'Methodology',
 'Theoretical framework',
 'C',
 'Ethical considerations are described within the methodology chapter. Ref: Research methods; research proposal writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q279 — Variable definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'A condition or characteristic that can take on different values or categories is called:',
 'A constant',
 'A variable',
 'A cause-and-effect relationship',
 'A descriptive relationship',
 'B',
 'A variable is any characteristic that varies — taking different values or categories — among subjects or over time (e.g., age, blood pressure, gender). A constant does not vary across subjects in a given study. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'A condition or characteristic that can take on different values or categories is called:',
 'A constant',
 'A variable',
 'A cause-and-effect relationship',
 'A descriptive relationship',
 'B',
 'A variable takes different values or categories among subjects. A constant does not vary. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 5: NURSING EDUCATION & TEACHING METHODOLOGY
-- BScN → Paper II  |  KRCHN → Paper II
-- ─────────────────────────────────────────────────────────────────────────────

-- Q10 — Humanistic counselling theory: Carl Rogers
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The humanistic theory of counselling was developed by:',
 'Carl Rogers',
 'Abraham Maslow',
 'Albert Ellis',
 'Sigmund Freud',
 'A',
 'Carl Rogers developed person-centred (client-centred/humanistic) counselling, emphasising unconditional positive regard, empathy and congruence. Abraham Maslow contributed humanistic psychology broadly (hierarchy of needs); Albert Ellis developed REBT; Freud developed psychoanalysis. Ref: Counselling theory; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The humanistic theory of counselling was developed by:',
 'Carl Rogers',
 'Abraham Maslow',
 'Albert Ellis',
 'Sigmund Freud',
 'A',
 'Carl Rogers developed person-centred humanistic counselling. Maslow = humanistic psychology broadly; Ellis = REBT; Freud = psychoanalysis. Ref: Counselling theory; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 — Microteaching skills: climate setting, reinforcement
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Microteaching skills include:',
 'Individualization, motivation',
 'Climate setting, reinforcement',
 'Ensuring mastery, individualization',
 'Climate setting, repetition',
 'B',
 'Microteaching involves discrete, practised teaching competencies including set induction (climate setting), reinforcement, stimulus variation, questioning, use of examples/illustrations and closure. Climate setting and reinforcement are both recognized microteaching skills. Ref: Nursing education; microteaching skills.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Microteaching skills include:',
 'Individualization, motivation',
 'Climate setting, reinforcement',
 'Ensuring mastery, individualization',
 'Climate setting, repetition',
 'B',
 'Microteaching skills include climate setting, reinforcement, stimulus variation, questioning and closure. Ref: Nursing education; microteaching skills.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 — Projected teaching aids: films, opaque projector
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Projected teaching aids include:',
 'Films, television',
 'Photographs, flashcards',
 'Videotapes, computer',
 'Films, opaque projector',
 'D',
 'Projected teaching aids require a projector to display an enlarged image: films (projected via film projector) and opaque projectors (project opaque materials). Photographs and flashcards are non-projected; television is an electronic/audiovisual aid. Ref: Nursing education (instructional media classification).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Projected teaching aids include:',
 'Films, television',
 'Photographs, flashcards',
 'Videotapes, computer',
 'Films, opaque projector',
 'D',
 'Projected aids require a projector: films and opaque projectors. Photographs/flashcards are non-projected. Ref: Nursing education (instructional media).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 — Assessing attitudes: simulation and observation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Assessing attitudes is best done by:',
 'Pencil and paper test questions',
 'Rating scale based on table analysis',
 'Analysing the correct answers from test questions',
 'Simulation and allowing the observation of gestures and actions',
 'D',
 'Attitudes (affective domain) are best assessed by observing behaviour, gestures and actions in real or simulated situations, rather than through written knowledge tests which assess only cognitive knowledge. Simulation creates a realistic context for attitudinal behaviour to be demonstrated. Ref: Nursing education (assessment of the affective domain); Bloom''s taxonomy.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Assessing attitudes is best done by:',
 'Pencil and paper test questions',
 'Rating scale based on table analysis',
 'Analysing the correct answers from test questions',
 'Simulation and allowing the observation of gestures and actions',
 'D',
 'Attitudes (affective domain) are best assessed by observing behaviour and gestures in simulated situations. Written tests only assess cognitive knowledge. Ref: Nursing education; Bloom''s taxonomy.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 — Curriculum components: course structure, statement of purpose
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Components of a curriculum include:',
 'Course structure, statement of purpose',
 'Course objectives, assessment forms',
 'Justification, lesson plans',
 'Scheme of work, statement of purpose',
 'A',
 'Core curriculum components include: statement of purpose/philosophy, objectives, content/course structure, teaching-learning methods and evaluation. Course structure and statement of purpose are both recognised curriculum components. Ref: Curriculum development; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 — Affective learning objective: accepting the patient as an individual
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'A student will demonstrate achievement of an affective learning objective by:',
 'Performing wound dressing procedure',
 'Recalling information presented earlier',
 'Accepting the patient as an individual',
 'Restating information acquired earlier',
 'C',
 'Affective objectives concern attitudes, values and feelings. Accepting/valuing the patient as an individual demonstrates an attitudinal/value-based (affective) outcome. Performing a wound dressing is psychomotor; recalling or restating information are cognitive outcomes. Ref: Nursing education; Bloom''s taxonomy of learning domains.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'A student will demonstrate achievement of an affective learning objective by:',
 'Performing wound dressing procedure',
 'Recalling information presented earlier',
 'Accepting the patient as an individual',
 'Restating information acquired earlier',
 'C',
 'Affective objectives concern attitudes and values. Accepting the patient as an individual is an affective outcome. Ref: Nursing education; Bloom''s taxonomy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q39 — Curriculum development process: situation analysis, job description, task analysis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The process of curriculum development involves:',
 'Situation analysis, job description, identification of students',
 'Job description, performing task analysis, identification of trainers',
 'Identification of content, identification of students, identification of teaching methods',
 'Situation analysis, job description, performing task analysis',
 'D',
 'Task/competency-based curriculum development begins with: (1) situation analysis (needs assessment), (2) job/occupational description defining what the graduate will do, and (3) task analysis breaking each job function into specific tasks — before formulating objectives and content. Ref: Curriculum development; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The process of curriculum development involves:',
 'Situation analysis, job description, identification of students',
 'Job description, performing task analysis, identification of trainers',
 'Identification of content, identification of students, identification of teaching methods',
 'Situation analysis, job description, performing task analysis',
 'D',
 'Curriculum development: situation analysis → job description → task analysis → objectives → content. Ref: Curriculum development; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q56 — Transfer in learning: using knowledge in practice
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The following statement regarding the learning process is true:',
 'Perception is sending the information to the brain via the special senses',
 'Acquisition refers to storing information in the memory centres',
 'Transfer refers to using information learnt in practice',
 'Retention refers to information being recorded in the brain',
 'C',
 'Transfer of learning is the application of previously learned knowledge or skills to new or practical situations. Perception is the interpretation of sensory input (not merely sensing); retention is storage in memory; acquisition is gaining the information. Option C correctly describes transfer. Ref: Learning process; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The following statement regarding the learning process is true:',
 'Perception is sending the information to the brain via the special senses',
 'Acquisition refers to storing information in the memory centres',
 'Transfer refers to using information learnt in practice',
 'Retention refers to information being recorded in the brain',
 'C',
 'Transfer of learning is applying learnt knowledge/skills to new situations. Ref: Learning process; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q58 — Affective domain level: characterizing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The following is a level of the affective domain in learning:',
 'Evaluation',
 'Synthesis',
 'Characterizing',
 'Application',
 'C',
 'Bloom''s affective domain levels (Krathwohl) are: receiving, responding, valuing, organizing and characterizing by a value. Evaluation, synthesis and application are cognitive domain levels. Ref: Bloom''s taxonomy; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The following is a level of the affective domain in learning:',
 'Evaluation',
 'Synthesis',
 'Characterizing',
 'Application',
 'C',
 'Affective domain levels: receiving, responding, valuing, organizing and characterizing. Evaluation, synthesis and application are cognitive. Ref: Bloom''s taxonomy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q82 — Correct order of learning process: attention, perception, acquisition, retention, transfer
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The correct order of the learning process is:',
 'Attention, perception, acquisition, retention, transfer',
 'Perception, attention, acquisition, retention, transfer',
 'Acquisition, perception, retention, attention, transfer',
 'Attention, acquisition, perception, retention, transfer',
 'A',
 'The learning sequence proceeds: attention (focus on stimulus) → perception (interpretation of stimulus) → acquisition (recording/learning the content) → retention (storing in memory) → transfer (applying in new situations). Ref: Learning process; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The correct order of the learning process is:',
 'Attention, perception, acquisition, retention, transfer',
 'Perception, attention, acquisition, retention, transfer',
 'Acquisition, perception, retention, attention, transfer',
 'Attention, acquisition, perception, retention, transfer',
 'A',
 'Learning sequence: attention → perception → acquisition → retention → transfer. Ref: Learning process; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q83 — Adult learning characteristics: individualisation and internal motivation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The following are characteristics of adult learning:',
 'Require active participation and there should be no repetition',
 'Require external motivation and relevant content',
 'Require individualisation and internal motivation',
 'Require individualisation and repetition should be avoided',
 'C',
 'Andragogy (Knowles) — principles of adult learning: self-direction, individualisation, internal motivation, relevance to life experience, problem-centred orientation, and readiness to learn based on life tasks. Adults are internally (not externally) motivated and need individualised approaches. Ref: Nursing education (andragogy/Knowles).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The following are characteristics of adult learning:',
 'Require active participation and there should be no repetition',
 'Require external motivation and relevant content',
 'Require individualisation and internal motivation',
 'Require individualisation and repetition should be avoided',
 'C',
 'Adult learning (Knowles/andragogy): individualisation, internal motivation, relevance, self-direction. Ref: Nursing education (andragogy).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q84 — Teaching method using manikins: simulation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'In one lesson a teacher instructed students to use models to practice catheterization. This method of teaching is:',
 'Snowballing',
 'Role-play',
 'Simulation',
 'Demonstration',
 'C',
 'Practising a clinical skill on models or manikins that imitate reality is simulation — a safe, controlled learning environment that allows skill development without risk to real patients. Demonstration is the teacher showing a procedure; role-play involves acting out interpersonal scenarios. Ref: Nursing education (teaching methods).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'In one lesson a teacher instructed students to use models to practice catheterization. This method of teaching is:',
 'Snowballing',
 'Role-play',
 'Simulation',
 'Demonstration',
 'C',
 'Practising on models/manikins is simulation. Demonstration = teacher shows; role-play = acting out roles. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q85 — Stimulus variation: improves learner concentration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The role of stimulus variation in an instructional forum is to:',
 'Excite the learners to like the subject',
 'Help improve the learner''s concentration',
 'Assist the learners remember all learning activities',
 'Entertain and stimulate the eagerness to learn',
 'B',
 'Stimulus variation — varying voice, pace, movement, media and gestures during teaching — sustains learner attention and improves concentration by reducing monotony and preventing learner disengagement. Ref: Microteaching skills; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The role of stimulus variation in an instructional forum is to:',
 'Excite the learners to like the subject',
 'Help improve the learner''s concentration',
 'Assist the learners remember all learning activities',
 'Entertain and stimulate the eagerness to learn',
 'B',
 'Stimulus variation sustains attention and improves concentration by reducing monotony. Ref: Microteaching skills; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q86 — Broken needle not detected: previewing phase omitted
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'When teaching a patient on insulin self-administration, a nurse noticed that the needle was broken. Which phase of media use did the nurse omit?',
 'Selection',
 'Planning',
 'Previewing',
 'Evaluation',
 'C',
 'Previewing is the phase of media use where the nurse checks/inspects equipment and materials before use to ensure they are functional. Failing to detect the broken needle means the previewing phase was omitted. Phases of media use: selection → planning → previewing → presentation → evaluation. Ref: Nursing education (media use phases).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'When teaching a patient on insulin self-administration, a nurse noticed that the needle was broken. Which phase of media use did the nurse omit?',
 'Selection',
 'Planning',
 'Previewing',
 'Evaluation',
 'C',
 'Previewing is checking equipment before use. Failing to detect the broken needle means previewing was omitted. Ref: Nursing education (media use phases).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q217/Q240 — Brainstorming: spontaneous responses recorded
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'A method of teaching where the teacher poses a question, then allows students to give responses spontaneously and puts down all the points is:',
 'Snowballing',
 'Brainstorming',
 'Panel discussion',
 'Discussion',
 'B',
 'Brainstorming is a teaching method where the teacher poses a stimulus question and all student responses — however unconventional — are recorded without immediate judgement or criticism. This generates diverse ideas for later evaluation. Ref: Nursing education (teaching methods).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'A method of teaching where the teacher poses a question, then allows students to give responses spontaneously and puts down all the points is:',
 'Snowballing',
 'Brainstorming',
 'Panel discussion',
 'Discussion',
 'B',
 'Brainstorming invites spontaneous idea generation with all points recorded without criticism. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q218 — Lesson plan components: objectives, content
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Components of a lesson plan include:',
 'Objectives, content',
 'Teaching media, teacher''s activities',
 'Content, teaching method',
 'Lesson number, content',
 'A',
 'A lesson plan contains: objectives, content, teaching methods/activities, learning aids/media, time allocation and evaluation/assessment. Objectives and content are the two core components — objectives define what students will achieve; content defines what will be taught. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Components of a lesson plan include:',
 'Objectives, content',
 'Teaching media, teacher''s activities',
 'Content, teaching method',
 'Lesson number, content',
 'A',
 'A lesson plan core components are objectives and content. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q219 — Competency-based curriculum development
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The curriculum development approach where functions of a profession are used to determine the content is referred to as:',
 'Competency-based',
 'Subject-centered',
 'Integrated approach',
 'Functional approach',
 'A',
 'A competency-based curriculum derives its content from the competencies (functions, tasks and performance standards) required to practise the profession competently. The curriculum is built on what graduates must be able to DO rather than only what they should KNOW. Ref: Curriculum development; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The curriculum development approach where functions of a profession are used to determine the content is referred to as:',
 'Competency-based',
 'Subject-centered',
 'Integrated approach',
 'Functional approach',
 'A',
 'A competency-based curriculum derives content from the professional competencies required to practise. Ref: Curriculum development.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q220 — Microteaching skills: stimulus variation, questioning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Microteaching skills include:',
 'Lecturing, illustrating',
 'Closure, repetition',
 'Stimulus variation, questioning',
 'Mastery, feedback',
 'C',
 'Recognized microteaching skills include set induction, stimulus variation, questioning, reinforcement, use of examples/illustrations, and closure. Stimulus variation and questioning are both core microteaching skills. Ref: Nursing education (microteaching).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Microteaching skills include:',
 'Lecturing, illustrating',
 'Closure, repetition',
 'Stimulus variation, questioning',
 'Mastery, feedback',
 'C',
 'Microteaching skills: stimulus variation, questioning, reinforcement, closure. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q237 — Knowledge best taught by: lecturing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Knowledge is best taught by:',
 'Providing a role model',
 'Providing experience',
 'Arranging for practical session',
 'Lecturing',
 'D',
 'Cognitive/knowledge content is most efficiently delivered to a large group through the lecture method, which allows systematic, structured transmission of facts, concepts and principles. Role modelling teaches attitudes; practical sessions teach psychomotor skills. Ref: Nursing education (matching teaching methods to learning domains).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Knowledge is best taught by:',
 'Providing a role model',
 'Providing experience',
 'Arranging for practical session',
 'Lecturing',
 'D',
 'Cognitive/knowledge content is efficiently delivered through the lecture method. Role modelling teaches attitudes; practicals teach skills. Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q238 — Flip charts: for recording discussion points
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Flip charts are used for writing:',
 'The main content of the lesson',
 'Discussion points',
 'Familiar terminologies',
 'Drawing diagrams',
 'B',
 'Flip charts are best suited for recording brief discussion points, key ideas and group contributions during interactive sessions. They are not appropriate for detailed main lesson content (chalkboard/whiteboard) or complex diagrams. Ref: Nursing education (instructional media).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q239 — Second step in task-based curriculum: job description
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The following is the second step during task-based curriculum development:',
 'Job description',
 'Task analysis',
 'Situation analysis',
 'Objectives formulation',
 'A',
 'Task-based curriculum development sequence: (1) situation analysis, (2) job description, (3) task analysis, (4) objectives formulation, (5) content identification. Job description is the second step. Ref: Curriculum development; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The following is the second step during task-based curriculum development:',
 'Job description',
 'Task analysis',
 'Situation analysis',
 'Objectives formulation',
 'A',
 'Task-based curriculum: situation analysis (1) → job description (2) → task analysis (3) → objectives. Job description is second. Ref: Curriculum development.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q246 — Non-projected teaching aids: cartoons, flipcharts (television excluded from strict definition)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Non-projected teaching aids include:',
 'Cartoons, flipcharts, television',
 'Video cassettes, slides, kaleidoscopes',
 'Films, posters, flannel boards',
 'Chalkboard, pictures, overhead transparency',
 'A',
 'Non-projected aids do not require a projector: cartoons, flip charts, chalkboard, posters, flannel boards and pictures are non-projected. Among the options, A is the intended answer (predominantly non-projected items). Note: television is technically electronic; this item reflects common institutional exam conventions. Ref: Nursing education (instructional media classification).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q247 — Elements of a behavioural objective: performance, condition, standard
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The main elements of an educational (behavioural) objective are:',
 'Performance, condition, standard (criteria)',
 'Specific, measurable, time bound',
 'Cognitive, psychomotor, affective',
 'Knowledge, skill, attitude',
 'A',
 'A well-written behavioural objective (Mager) has three elements: performance (observable behaviour/action), condition (circumstances under which the behaviour occurs) and standard/criterion (level of acceptable performance). Option B describes SMART criteria, not objective components. Ref: Nursing education; Mager''s instructional objectives.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The main elements of an educational (behavioural) objective are:',
 'Performance, condition, standard (criteria)',
 'Specific, measurable, time bound',
 'Cognitive, psychomotor, affective',
 'Knowledge, skill, attitude',
 'A',
 'Behavioural objective elements: performance, condition and standard (Mager). Ref: Nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q249 — Effective teaching determined by: teaching activities and learner involvement
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Effective teaching and learning is mainly determined by:',
 'The level of intelligence of the teacher',
 'Willingness of the guardians to motivate the learners',
 'Teaching activities and optimal involvement of learners',
 'The level of administrative control from the principal''s office',
 'C',
 'The primary determinant of effective teaching and learning is the quality of teaching activities and the optimal active involvement (participation) of learners. Learner-centred, interactive teaching produces better outcomes than passive reception. Ref: Nursing education; educational psychology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q271 — Affective domain: attitudes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'The objective domain that deals with acquisition of attitudes is:',
 'Psychomotor',
 'Cognitive',
 'Affective',
 'Comprehension',
 'C',
 'The affective domain (Krathwohl) concerns the acquisition and internalisation of attitudes, values, feelings, appreciations and dispositions. The cognitive domain concerns knowledge/thinking; the psychomotor domain concerns skills/movements. Comprehension is a cognitive level, not a domain. Ref: Bloom''s taxonomy; nursing education.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'The objective domain that deals with acquisition of attitudes is:',
 'Psychomotor',
 'Cognitive',
 'Affective',
 'Comprehension',
 'C',
 'The affective domain concerns attitudes, values and feelings. Ref: Bloom''s taxonomy.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q274 — Tutorial definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'A tutorial may be defined as:',
 'Session assigned to an individual student or group of learners',
 'Discussion session between a teacher and a small group of learners',
 'Method of encouraging group discussions among students',
 'Method of assigning an enthusiastic student a subject to discuss with others',
 'B',
 'A tutorial is a structured, interactive small-group teaching session between a teacher/tutor and a small number of learners, designed to clarify, deepen and consolidate understanding of content already taught. Ref: Nursing education (teaching methods).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q275 — Manikin classification: non-projected, visual, artificial, conventional
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'A manikin (dummy patient) can be classified as a:',
 'Projected, visual, real and conventional teaching aid',
 'Projected, visual, artificial and emerging teaching aid',
 'Non-projected, audio, real and emerging teaching aid',
 'Non-projected, visual, artificial and conventional teaching aid',
 'D',
 'A manikin is: non-projected (requires no projector), visual (observed with eyes), artificial (a constructed model, not a real patient) and conventional (a long-established teaching tool in nursing education). Ref: Nursing education (instructional media classification).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 6: MANAGEMENT & LEADERSHIP IN NURSING
-- BScN → Paper II  |  KRCHN → Paper II
-- ─────────────────────────────────────────────────────────────────────────────

-- Q72 — Leader vs manager: ability to influence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Leadership',
 'The main difference between a manager and a leader is that a leader:',
 'Works with and through people to achieve organizational goals',
 'Works effectively and efficiently',
 'Has formal authority and responsibility',
 'Is able to influence people',
 'D',
 'Leadership is fundamentally the ability to influence others toward goals, and a leader need not hold formal authority. A manager relies on delegated formal (legitimate) authority and positional power. Ref: Nursing management/leadership theory; standard management texts.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Leadership',
 'The main difference between a manager and a leader is that a leader:',
 'Works with and through people to achieve organizational goals',
 'Works effectively and efficiently',
 'Has formal authority and responsibility',
 'Is able to influence people',
 'D',
 'Leadership is the ability to influence others. A manager relies on formal positional authority. Ref: Nursing management/leadership theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q73 — Human factors and productivity: Douglas McGregor
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Theory',
 'The following theorist analysed the relationship between human factors and productivity in an organization:',
 'Max Weber',
 'Henry Fayol',
 'Douglas McGregor',
 'Frederick Taylor',
 'C',
 'Douglas McGregor (Theory X and Theory Y) examined human/behavioural factors and assumptions about worker motivation and their relationship to productivity, contributing to the human relations school. Weber = bureaucracy; Fayol = administrative principles; Taylor = scientific management/efficiency. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Theory',
 'The following theorist analysed the relationship between human factors and productivity in an organization:',
 'Max Weber',
 'Henry Fayol',
 'Douglas McGregor',
 'Frederick Taylor',
 'C',
 'Douglas McGregor (Theory X and Y) analysed human factors and motivation in relation to productivity. Weber = bureaucracy; Fayol = administrative principles; Taylor = scientific management. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q74 — Unity of direction: related activities under one manager
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Principles',
 'The following principle of management requires all related activities to be under the control of one manager:',
 'Discipline',
 'Order',
 'Unity of direction',
 'Unity of command',
 'C',
 'Unity of direction (Fayol) states that there should be one head and one plan for a group of activities with the same objective, ensuring coordination. Unity of command means one employee receives orders from only one superior. Ref: Management principles (Fayol''s 14 principles).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Principles',
 'The following principle of management requires all related activities to be under the control of one manager:',
 'Discipline',
 'Order',
 'Unity of direction',
 'Unity of command',
 'C',
 'Unity of direction: one head and one plan for activities with the same objective. Unity of command: one employee, one superior. Ref: Fayol''s 14 management principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q75 — Performance appraisal when data not collected: central tendency error
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'A performance appraisal done by a nursing officer who is overloaded and does not collect the necessary evaluative data is likely to have:',
 'Halo Effect',
 'Central tendency effect',
 'Ratter (rater) temperament effect',
 'Guessing errors',
 'B',
 'Central tendency error occurs when an appraiser, lacking sufficient data or taking the easy route, rates everyone near the middle/average of the scale, avoiding extreme ratings. This results from insufficient evaluation data. The halo effect is rating all dimensions highly based on one positive trait. Ref: Nursing management (performance appraisal errors).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'A performance appraisal done by a nursing officer who is overloaded and does not collect the necessary evaluative data is likely to have:',
 'Halo Effect',
 'Central tendency effect',
 'Ratter (rater) temperament effect',
 'Guessing errors',
 'B',
 'Central tendency error: appraiser rates everyone near average when lacking data. Ref: Nursing management (performance appraisal errors).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q76 — Lose-lose conflict strategy: neither party fully achieves goal
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Conflict Management',
 'Lose-lose strategy of conflict management:',
 'Leads to a greater conflict',
 'The conflicting parties come up with something neutral (neither gets what they fully want)',
 'One party achieves its desire at the expense of the other',
 'The reason for conflict is addressed',
 'B',
 'In a lose-lose outcome (e.g., compromise, avoidance or withdrawal), neither party fully achieves their desired goal — both settle for a neutral, diminished result. Win-lose = one party achieves at the expense of the other; win-win = the underlying reason is resolved satisfactorily. Ref: Conflict management; nursing management.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Conflict Management',
 'Lose-lose strategy of conflict management:',
 'Leads to a greater conflict',
 'The conflicting parties come up with something neutral (neither gets what they fully want)',
 'One party achieves its desire at the expense of the other',
 'The reason for conflict is addressed',
 'B',
 'Lose-lose: neither party fully achieves their goal; both settle for a neutral/diminished result. Ref: Conflict management.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q115 — Leader: ability to influence group members
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Leadership',
 'A leader is one who has:',
 'Ability to utilise management principles',
 'Ability to influence group members',
 'Authority to lead others',
 'Ability to control and solve organization problems',
 'B',
 'A leader is fundamentally one who has the ability to influence group members toward a shared goal. This influence may be through formal authority, expertise, inspiration or interpersonal skills. Formal authority characterises a manager more than a leader. Ref: Leadership theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Leadership',
 'A leader is one who has:',
 'Ability to utilise management principles',
 'Ability to influence group members',
 'Authority to lead others',
 'Ability to control and solve organization problems',
 'B',
 'A leader has the ability to influence group members toward goals. Ref: Leadership theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q116 — Tactical plans: intermediate time frame
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'Tactical plans in an organisation:',
 'Focus on single daily action',
 'Are concerned on how to implement operational plans',
 'Are of intermediate time frame',
 'Are mainly developed from the major organisation goals',
 'C',
 'Tactical plans are medium/intermediate-range plans (typically 1–3 years) that translate strategic goals into specific departmental or unit objectives. Strategic plans are long-range and developed from major organisational goals; operational plans are short-range/daily. Ref: Management (planning types).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'Tactical plans in an organisation:',
 'Focus on single daily action',
 'Are concerned on how to implement operational plans',
 'Are of intermediate time frame',
 'Are mainly developed from the major organisation goals',
 'C',
 'Tactical plans are of intermediate time frame (1–3 years), translating strategic goals into departmental action. Ref: Management (planning types).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q117 — Monitoring: control function
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'Monitoring is a main action carried out by nurse management. This is an example of:',
 'Planning',
 'Control',
 'Organization',
 'Directing',
 'B',
 'Monitoring and measuring performance against pre-set standards is the controlling function of management. Controlling involves establishing standards, measuring performance, comparing against standards and taking corrective action. Ref: Management functions (POLC); Fayol.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'Monitoring is a main action carried out by nurse management. This is an example of:',
 'Planning',
 'Control',
 'Organization',
 'Directing',
 'B',
 'Monitoring performance against standards is the controlling function of management. Ref: Management functions (Fayol).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q118 — Unity of direction: coordinates employees effort
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Principles',
 'The principle of management that helps ensure there is coordination of employees'' effort is:',
 'Unity of command',
 'Unity of direction',
 'Division of labour',
 'Decentralization',
 'B',
 'Unity of direction (Fayol) ensures coordination of all employees'' efforts by having one head and one plan for activities with the same objective. Unity of command governs the reporting relationship; division of labour specialises tasks; decentralisation distributes authority. Ref: Fayol''s 14 management principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Principles',
 'The principle of management that helps ensure there is coordination of employees'' effort is:',
 'Unity of command',
 'Unity of direction',
 'Division of labour',
 'Decentralization',
 'B',
 'Unity of direction (one head, one plan) ensures coordination of effort toward a common objective. Ref: Fayol''s 14 management principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q119 — Emphasis on rules: Max Weber bureaucratic theory
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Theory',
 'A nurse manager who emphasizes on rules in an institution utilizes the management theory by:',
 'Max Weber',
 'Frederick Taylor',
 'Henri Fayol',
 'Abraham Maslow',
 'A',
 'Max Weber''s bureaucratic theory emphasises formal rules, regulations, hierarchy, impersonality and standardised procedures as the basis for organisational authority and efficiency. Taylor = scientific management (efficiency/task analysis); Fayol = administrative principles; Maslow = motivation/hierarchy of needs. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Theory',
 'A nurse manager who emphasizes on rules in an institution utilizes the management theory by:',
 'Max Weber',
 'Frederick Taylor',
 'Henri Fayol',
 'Abraham Maslow',
 'A',
 'Max Weber''s bureaucratic theory emphasises formal rules, hierarchy and standardised procedures. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q120 — Feedback: negative comments last
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'Feedback to subordinates from nurse managers:',
 'Should be given in private always',
 'Should be done daily',
 'Should be both objective and subjective',
 'Should have negative comments last',
 'D',
 'Effective feedback technique (e.g., the sandwich/compliment-critique-compliment approach) places affirming comments around constructive criticism, ending on a positive and forward-looking note. Negative or corrective comments are best not left as the final impression. Ref: Nursing management (performance feedback; communication).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'Feedback to subordinates from nurse managers:',
 'Should be given in private always',
 'Should be done daily',
 'Should be both objective and subjective',
 'Should have negative comments last',
 'D',
 'Effective feedback places affirming comments around constructive criticism, ending on a constructive note (sandwich approach). Ref: Nursing management (performance feedback).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q135 — Henri Fayol: identified specific management functions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Theory',
 'Henri Fayol:',
 'Introduced innovations in how jobs were designed and how workers were trained to perform',
 'Identified specific functions of a manager',
 'Developed the bureaucratic model',
 'Examined motivation from the perspective of why people choose to follow a particular course of action',
 'B',
 'Henri Fayol identified the five functions of management (planning, organizing, commanding, coordinating and controlling) and the 14 principles of management. Taylor introduced job design and scientific management; Weber developed bureaucracy; Vroom''s expectancy theory examines motivation choices. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Theory',
 'Henri Fayol:',
 'Introduced innovations in how jobs were designed and how workers were trained to perform',
 'Identified specific functions of a manager',
 'Developed the bureaucratic model',
 'Examined motivation from the perspective of why people choose to follow a particular course of action',
 'B',
 'Fayol identified the five management functions and 14 management principles. Taylor = job design; Weber = bureaucracy. Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q136 — Advantage of decentralized management: better interpersonal relationships
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Principles',
 'The following is an advantage of a decentralized system of management:',
 'Greater control of activities',
 'Conserves time',
 'Compatible with computerization',
 'Promotes better interpersonal relationships',
 'D',
 'Decentralisation brings decision-making closer to the point of action, increasing staff participation, improving morale and motivation, and promoting better interpersonal relationships. Greater central control and time conservation are advantages of centralisation. Ref: Nursing management (centralisation vs decentralisation).',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Principles',
 'The following is an advantage of a decentralized system of management:',
 'Greater control of activities',
 'Conserves time',
 'Compatible with computerization',
 'Promotes better interpersonal relationships',
 'D',
 'Decentralisation increases staff participation and promotes better interpersonal relationships. Centralisation = greater control. Ref: Nursing management.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q137 — Staffing: assigning competent people to fill roles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'The process of assigning competent people to fill the roles designed in the organizational hierarchy is:',
 'Staffing',
 'Scheduling',
 'Recruitment',
 'Induction',
 'A',
 'Staffing is the management function of filling organizational positions with competent people, encompassing manpower planning, recruitment, selection, placement and orientation. Scheduling involves time-tabling; recruitment is a component of staffing; induction is orientation. Ref: Management functions.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'The process of assigning competent people to fill the roles designed in the organizational hierarchy is:',
 'Staffing',
 'Scheduling',
 'Recruitment',
 'Induction',
 'A',
 'Staffing is the management function of filling organisational positions with competent people. Ref: Management functions.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q152 — Effective manager skills: conceptual, human, technical (Katz)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Theory',
 'The skills of an effective manager are:',
 'Conceptual, human, technical',
 'Human, communication, technical',
 'Technical, political, social',
 'Conceptual, social, communication',
 'A',
 'Robert Katz identified three essential managerial skills: technical skills (job-specific knowledge and procedures), human/interpersonal skills (ability to work with people) and conceptual skills (ability to think strategically and see the organisation as a whole). Ref: Management theory (Katz).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Theory',
 'The skills of an effective manager are:',
 'Conceptual, human, technical',
 'Human, communication, technical',
 'Technical, political, social',
 'Conceptual, social, communication',
 'A',
 'Katz''s three essential managerial skills: technical, human and conceptual. Ref: Management theory (Katz).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q153 — Bureaucratic approach: rules applied uniformly, hierarchy of officers
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Theory',
 'In a bureaucratic approach:',
 'Things are done under certain criteria, there are adaptations to various situations',
 'Rules are applied uniformly, there is a hierarchy of officers',
 'There is chain of command, there is adaptation of rules to various situations',
 'The change agent consults with the community, rules are applied uniformly',
 'B',
 'Bureaucracy (Weber) is characterised by: uniform application of rules and regulations, clear hierarchy of authority, division of labour, formal written procedures, impersonality and merit-based selection. There is no adaptation of rules to individual situations — rules apply uniformly. Ref: Management theory (Weber).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Theory',
 'In a bureaucratic approach:',
 'Things are done under certain criteria, there are adaptations to various situations',
 'Rules are applied uniformly, there is a hierarchy of officers',
 'There is chain of command, there is adaptation of rules to various situations',
 'The change agent consults with the community, rules are applied uniformly',
 'B',
 'Bureaucracy: uniform rules, clear hierarchy, impersonality, formal procedures (Weber). Ref: Management theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q154 — Management functions: planning, motivating, organizing, controlling
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Functions',
 'The process of management includes the following functions:',
 'Planning, democracy, motivating, employing',
 'Bureaucracy, motivating, organizing, planning',
 'Planning, motivating, organizing, controlling',
 'Organizing, autocracy, discipline, reporting',
 'C',
 'Management functions include planning, organising, staffing, directing/motivating (leading) and controlling. Option C lists genuine management functions. The other options mix management functions with non-functions (democracy, bureaucracy, autocracy) or processes not in the core framework. Ref: Management functions (Fayol/POLC).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Functions',
 'The process of management includes the following functions:',
 'Planning, democracy, motivating, employing',
 'Bureaucracy, motivating, organizing, planning',
 'Planning, motivating, organizing, controlling',
 'Organizing, autocracy, discipline, reporting',
 'C',
 'Management functions: planning, motivating/directing, organising and controlling. Ref: Management functions (POLC).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q180 — Unity of command: orders from one superior only
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Management Principles',
 'Unity of command means:',
 'The systematic reporting ranging from the ultimate authority at the top to the worker with least authority',
 'One being in charge of a group that he/she can effectively supervise in terms of numbers',
 'That the employee should receive orders from one superior only',
 'Having all standards and policies in an organization addressing issues harmoniously and implicitly',
 'C',
 'Unity of command (Fayol) means each employee should receive instructions/orders from only one superior, avoiding conflicting commands and maintaining clear accountability. Option A describes the scalar chain; B describes span of control. Ref: Fayol''s 14 management principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Management Principles',
 'Unity of command means:',
 'The systematic reporting ranging from the ultimate authority at the top to the worker with least authority',
 'One being in charge of a group that he/she can effectively supervise in terms of numbers',
 'That the employee should receive orders from one superior only',
 'Having all standards and policies in an organization addressing issues harmoniously and implicitly',
 'C',
 'Unity of command: each employee receives orders from only one superior. Option A = scalar chain; B = span of control. Ref: Fayol''s management principles.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 7: REMAINING COMMUNITY HEALTH (Q183-Q184) & MISC (Q70, Q103, Q102)
-- ─────────────────────────────────────────────────────────────────────────────

-- Q70 — New TB cases in April = incidence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Epidemiology',
 'At a certain health centre the total number of new cases of tuberculosis recorded in the month of April was 50. This is an example of:',
 'Incidence',
 'Prevalence',
 'Morbidity',
 'Epidemic',
 'A',
 'Incidence is the number of NEW cases of a disease arising in a defined population over a defined period (here: 50 new TB cases in April). Prevalence counts all existing cases at a point in time. Morbidity is a broader term for disease occurrence. Ref: Epidemiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Epidemiology',
 'At a certain health centre the total number of new cases of tuberculosis recorded in the month of April was 50. This is an example of:',
 'Incidence',
 'Prevalence',
 'Morbidity',
 'Epidemic',
 'A',
 'Incidence = new cases in a defined period. 50 new TB cases in April = incidence. Ref: Epidemiology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q103 — Malaria clinical symptoms: erythrocytic stage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Malaria',
 'Clinical symptoms in a patient with malaria are most likely to present in the:',
 'Erythrocytic stage',
 'Hepatic stage',
 'Sporozoite stage',
 'Gametocyte stage',
 'A',
 'Fever, rigors, sweating and other malaria symptoms coincide with the erythrocytic stage when merozoites rupture infected red blood cells releasing pyrogens. The hepatic (pre-erythrocytic) and sporozoite stages are clinically silent; gametocytes are the transmissible stage that does not cause symptoms. Ref: Malaria pathophysiology; Kenya National Malaria Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Malaria',
 'Clinical symptoms in a patient with malaria are most likely to present in the:',
 'Erythrocytic stage',
 'Hepatic stage',
 'Sporozoite stage',
 'Gametocyte stage',
 'A',
 'Malaria symptoms occur during the erythrocytic stage when infected red cells rupture. Hepatic and sporozoite stages are silent; gametocytes are non-symptomatic transmissible stages. Ref: Kenya National Malaria Guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q102 — Diseases caused by flukes/worms: schistosomiasis, onchocerciasis, dracunculosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Parasitology',
 'The diseases caused by flukes/worms include:',
 'Leishmaniasis, Onchocerciasis, Dracunculosis',
 'Schistosomiasis, Trypanosomiasis, Onchocerciasis',
 'Schistosomiasis, Onchocerciasis, Dracunculosis',
 'Trypanosomiasis, Onchocerciasis, Dracunculosis',
 'C',
 'Schistosomiasis (trematode/blood fluke), onchocerciasis (Onchocerca volvulus nematode/roundworm) and dracunculosis (Dracunculus medinensis nematode/guinea worm) are all helminth (fluke or worm) diseases. Leishmaniasis and trypanosomiasis are protozoal diseases. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Parasitology',
 'The diseases caused by flukes/worms include:',
 'Leishmaniasis, Onchocerciasis, Dracunculosis',
 'Schistosomiasis, Trypanosomiasis, Onchocerciasis',
 'Schistosomiasis, Onchocerciasis, Dracunculosis',
 'Trypanosomiasis, Onchocerciasis, Dracunculosis',
 'C',
 'Schistosomiasis (fluke), onchocerciasis and dracunculosis (nematode worms) are helminth diseases. Leishmaniasis and trypanosomiasis are protozoal. Ref: Parasitology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q183 — WHO MEC Category 3: condition worsened by method, follow-up required
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Family Planning',
 'In the WHO criteria for initiating family planning, a client will fall in category 3 if:',
 'The client has a surgical or medical condition which cannot be worsened by the family planning method chosen',
 'The client has a surgical or medical condition which is worsened by the method chosen and should be followed up',
 'The client has no surgical or medical condition which can make the family planning method ineffective',
 'If the client has a condition which can be worsened by the method chosen and can therefore not use the method',
 'B',
 'WHO Medical Eligibility Criteria (MEC) Category 3 = theoretical or proven risks usually outweigh the advantages; the method is generally NOT recommended unless other methods are unavailable, requiring careful clinical judgement and close follow-up. Category 4 = absolute contraindication (do not use). Ref: WHO Medical Eligibility Criteria; MOH Kenya Family Planning Guidelines.',
 'hard', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Family Planning',
 'In the WHO criteria for initiating family planning, a client will fall in category 3 if:',
 'The client has a surgical or medical condition which cannot be worsened by the family planning method chosen',
 'The client has a surgical or medical condition which is worsened by the method chosen and should be followed up',
 'The client has no surgical or medical condition which can make the family planning method ineffective',
 'If the client has a condition which can be worsened by the method chosen and can therefore not use the method',
 'B',
 'WHO MEC Category 3: risks usually outweigh advantages; not generally recommended unless other methods unavailable; requires follow-up. Category 4 = absolute contraindication. Ref: WHO MEC; MOH Kenya Family Planning Guidelines.',
 'hard', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q184 — Trachoma clinical stage 4: entropion/trichiasis (different from existing stem)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Trachoma',
 'In clinical stage four of trachoma:',
 'Follicles form whitish scars on the conjunctiva',
 'The eyelid becomes thick and turns inwards (entropion/trichiasis)',
 'Small pinkish-grey lumps form inside the upper lids',
 'The cornea is grayish with many tiny red blood vessels',
 'B',
 'In the WHO trachoma grading, the trichiasis/entropion stage (advanced scarring disease) shows cicatricial contraction turning the eyelid inward (entropion) so eyelashes abrade the cornea (trichiasis). Follicles are the early active stage; corneal opacity (trachomatous corneal opacity) is the end stage with blindness. Ref: WHO trachoma grading system; MOH eye health guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Trachoma',
 'In clinical stage four of trachoma:',
 'Follicles form whitish scars on the conjunctiva',
 'The eyelid becomes thick and turns inwards (entropion/trichiasis)',
 'Small pinkish-grey lumps form inside the upper lids',
 'The cornea is grayish with many tiny red blood vessels',
 'B',
 'Advanced trachoma (trichiasis stage): cicatricial contraction turns the eyelid inward (entropion) causing lashes to abrade the cornea (trichiasis). Ref: WHO trachoma grading; MOH eye health guidelines.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q186 — Social stratum definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'A social stratum is:',
 'A level in the social hierarchy, comprising people with shared life chances',
 'A methodological tool used to identify a person''s social class in the society',
 'The boundary between two levels of the social hierarchy',
 'A symbol of status, used to differentiate between social classes',
 'A',
 'A social stratum is a distinct layer or level within the social hierarchy made up of people sharing similar social and economic positions and life chances (access to resources, opportunities and rewards). Ref: Medical sociology (social stratification).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'A social stratum is:',
 'A level in the social hierarchy, comprising people with shared life chances',
 'A methodological tool used to identify a person''s social class in the society',
 'The boundary between two levels of the social hierarchy',
 'A symbol of status, used to differentiate between social classes',
 'A',
 'A social stratum is a layer in the social hierarchy of people sharing similar social and economic life chances. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q187 — Adoption of cultural items from another society: diffusion (same concept, different stem Q77)
-- SKIPPED — duplicate concept of Q77 (diffusion); stem is near-identical. Not re-seeded.

-- Q189 — Community development evaluation: community resources + health status
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Development',
 'Community development can be evaluated by:',
 'Number of households in each locality, health status of the community members',
 'Rural-urban migration, community response to their health needs',
 'Availability of cash crops, the diversity of health-seeking behavior',
 'Availability of community resources, health status of the community members',
 'D',
 'Community development outcomes are evaluated by improvements in the availability of community resources (material, human, financial, infrastructure) and in the health and wellbeing status of community members. These are the direct indicators of development impact. Ref: Community development; MOH community health guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Development',
 'Community development can be evaluated by:',
 'Number of households in each locality, health status of the community members',
 'Rural-urban migration, community response to their health needs',
 'Availability of cash crops, the diversity of health-seeking behavior',
 'Availability of community resources, health status of the community members',
 'D',
 'Community development is evaluated by availability of community resources and health status of members. Ref: Community development.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q199 — Vaccine forecasting: determining population requiring vaccination
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Immunization',
 'Vaccine forecasting for a district involves:',
 'Considering the number of persons immunized in the previous years',
 'Determining the population requiring vaccination at a point in time',
 'Maintaining the potency of vaccines through proper cold chain',
 'Ordering of vaccines to avoid stock-outs',
 'B',
 'Vaccine forecasting estimates the target population requiring vaccination (e.g., infants due for EPI vaccines, pregnant women for TT) and the resulting vaccine quantities needed for a defined period. Cold chain maintenance and ordering are subsequent logistics steps. Ref: Kenya KEPI immunization programme management.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Immunization',
 'Vaccine forecasting for a district involves:',
 'Considering the number of persons immunized in the previous years',
 'Determining the population requiring vaccination at a point in time',
 'Maintaining the potency of vaccines through proper cold chain',
 'Ordering of vaccines to avoid stock-outs',
 'B',
 'Vaccine forecasting estimates the target population requiring vaccination and needed quantities. Ref: Kenya KEPI immunization programme management.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q78 — Education functions: cultural transmission, social integration, personal development
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'The functions of education institutions include:',
 'Socialization, custodial functions, legal functions',
 'Cultural transmission, social integration, personal development',
 'Personal development, controlling sexual behaviour, innovation',
 'Social integration, socialization, nurturing children',
 'B',
 'Sociological functions of education include cultural transmission (passing on knowledge and values), social integration (creating cohesion), socialisation, personal development, selection/streaming and innovation. Option B best captures the recognised manifest functions. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'The functions of education institutions include:',
 'Socialization, custodial functions, legal functions',
 'Cultural transmission, social integration, personal development',
 'Personal development, controlling sexual behaviour, innovation',
 'Social integration, socialization, nurturing children',
 'B',
 'Education functions: cultural transmission, social integration, personal development. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q109 — NOT a school health activity: epidemiological investigations
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'School Health',
 'The following is NOT an activity of a school health programme:',
 'Epidemiological investigations',
 'Emergency services',
 'Care of continuing illness',
 'Growth and monitoring',
 'A',
 'School health activities include health appraisal/screening, emergency services, care of children with continuing illness, growth monitoring, health education and dental health services. Large-scale epidemiological investigations are a public-health surveillance function, not a routine school health programme activity. Ref: School health programme guidelines; MOH Kenya.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'School Health',
 'The following is NOT an activity of a school health programme:',
 'Epidemiological investigations',
 'Emergency services',
 'Care of continuing illness',
 'Growth and monitoring',
 'A',
 'Epidemiological investigations are not a routine school health activity. School health includes screening, emergency services, care of continuing illness and growth monitoring. Ref: School health programme guidelines; MOH Kenya.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q112 — Community diagnosis reactions/opinions: informal sessions with community members
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Diagnosis',
 'During community diagnosis, the best way to obtain reactions and opinions of the community concerning the survey is:',
 'Interviewing community official leaders',
 'Interviewing community informal leaders',
 'Interviewing community health workers',
 'Holding informal sessions with community members',
 'D',
 'Holding informal group sessions (focus group discussions) with community members yields the broadest, most genuine reactions and opinions about the survey, reducing the gatekeeping bias of speaking only to formal or informal leaders. Ref: Community health practice; community diagnosis methodology.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Diagnosis',
 'During community diagnosis, the best way to obtain reactions and opinions of the community concerning the survey is:',
 'Interviewing community official leaders',
 'Interviewing community informal leaders',
 'Interviewing community health workers',
 'Holding informal sessions with community members',
 'D',
 'Informal group sessions with community members yield the broadest genuine reactions, reducing gatekeeping bias. Ref: Community health practice.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q113 — Achieved status: earned through own effort
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'Mrs Jay is highly regarded in her village for being the first nurse in her community; this is an example of:',
 'Social stratification',
 'Ascribed status',
 'Achieved status',
 'Social role',
 'C',
 'Achieved status is earned through one''s own efforts, accomplishments and choices — such as becoming a nurse. Ascribed status is assigned at birth (e.g., gender, ethnicity, birth order). Ref: Medical sociology (status and role).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'Mrs Jay is highly regarded in her village for being the first nurse in her community; this is an example of:',
 'Social stratification',
 'Ascribed status',
 'Achieved status',
 'Social role',
 'C',
 'Achieved status is earned through one''s own effort (becoming a nurse). Ascribed status is assigned at birth. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q134 — Preliminary report: feedback before data analysis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Diagnosis',
 'In community diagnosis, the feedback that is given to the community before data analysis is referred to as:',
 'Non-medical report',
 'Medical report',
 'Preliminary report',
 'Individual report',
 'C',
 'In community diagnosis, the preliminary (interim) report is the initial feedback given to the community before full data analysis is completed, to validate findings and build community ownership. The comprehensive final report comes after complete analysis. Ref: Community diagnosis process.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Diagnosis',
 'In community diagnosis, the feedback that is given to the community before data analysis is referred to as:',
 'Non-medical report',
 'Medical report',
 'Preliminary report',
 'Individual report',
 'C',
 'Preliminary report = initial feedback to community before full analysis. Ref: Community diagnosis process.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q142 — Predisposing factors to dental caries: environmental, nutritional, personal
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Oral Health',
 'Predisposing factors to dental caries include:',
 'Environmental, physical, hereditary',
 'Personal, social, psychological',
 'Psychological, hereditary, nutritional',
 'Environmental, nutritional, personal',
 'D',
 'Dental caries predisposing factors include: environmental (water fluoride level), nutritional (dietary sugars — frequency and amount) and personal (oral hygiene practices, saliva quality, tooth morphology). Ref: Oral health/community dentistry; school health.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Oral Health',
 'Predisposing factors to dental caries include:',
 'Environmental, physical, hereditary',
 'Personal, social, psychological',
 'Psychological, hereditary, nutritional',
 'Environmental, nutritional, personal',
 'D',
 'Dental caries: environmental (water fluoride), nutritional (dietary sugars) and personal (oral hygiene) predisposing factors. Ref: Oral health/community dentistry.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q123 — Socially handicapped groups: IDPs, street children, sexually abused
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Vulnerable Groups',
 'The following groups of people are classified as socially handicapped:',
 'Internally displaced, street children, sexually abused',
 'Epileptic, psychiatric cases, widowed',
 'Drug addicts, elderly, mongolism (Down syndrome)',
 'Obese, blind, deaf',
 'A',
 'Socially handicapped groups are those disadvantaged by social circumstances rather than primarily by physical or mental conditions: internally displaced persons (IDPs), street children and the sexually abused are socially handicapped. The blind and deaf are physically handicapped; Down syndrome is an intellectual disability. Ref: Community health (vulnerable groups); Kenya social welfare guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Vulnerable Groups',
 'The following groups of people are classified as socially handicapped:',
 'Internally displaced, street children, sexually abused',
 'Epileptic, psychiatric cases, widowed',
 'Drug addicts, elderly, mongolism (Down syndrome)',
 'Obese, blind, deaf',
 'A',
 'Socially handicapped groups are disadvantaged by social circumstances: IDPs, street children and the sexually abused. Ref: Community health (vulnerable groups).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q147 — Community definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Health',
 'A community may be defined as:',
 'Individuals and groups living and interacting within certain boundaries',
 'Groups of people sharing common health problems',
 'Groups sharing same boundaries',
 'Families sharing common cultural beliefs',
 'A',
 'A community is a group of individuals and groups living together and interacting within defined geographical or social boundaries, sharing common interests, norms and support systems. Ref: Community health; community health nursing theory.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Health',
 'A community may be defined as:',
 'Individuals and groups living and interacting within certain boundaries',
 'Groups of people sharing common health problems',
 'Groups sharing same boundaries',
 'Families sharing common cultural beliefs',
 'A',
 'A community is individuals and groups living and interacting within defined boundaries with shared interests. Ref: Community health.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q157 — Directive approach in community: community worker develops, community = object
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Development',
 'The characteristic of a directive approach in community projects includes:',
 'People evaluate their own problems, the change agent encourages self-reliance',
 'The community worker develops programmes, the community is viewed as object of development',
 'The community is viewed as subject of development, participation level of community is low',
 'Participation level of community is low, it is a bottom-up approach',
 'B',
 'In a directive (top-down) approach, the community worker or external agency designs the programme and the community is a passive object (recipient) of development with low participation. The non-directive approach is community-led (bottom-up) with high participation. Ref: Community development approaches.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Development',
 'The characteristic of a directive approach in community projects includes:',
 'People evaluate their own problems, the change agent encourages self-reliance',
 'The community worker develops programmes, the community is viewed as object of development',
 'The community is viewed as subject of development, participation level of community is low',
 'Participation level of community is low, it is a bottom-up approach',
 'B',
 'Directive (top-down) approach: worker designs programme; community is a passive object/recipient. Ref: Community development approaches.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q163 — Secondary prevention: early diagnosis, screening, treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Levels of Prevention',
 'Secondary prevention of disease involves:',
 'Immunization, screening, healthy diet',
 'Diagnosis, screening, treatment (early detection and prompt treatment)',
 'Healthy diet, early treatment, immunization',
 'Diagnosis, regular treatment, safety measures',
 'B',
 'Secondary prevention involves early detection through screening and prompt treatment to halt disease progression and prevent complications. Immunization and healthy diet are primary prevention; rehabilitation is tertiary. Ref: Levels of prevention.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Levels of Prevention',
 'Secondary prevention of disease involves:',
 'Immunization, screening, healthy diet',
 'Diagnosis, screening, treatment (early detection and prompt treatment)',
 'Healthy diet, early treatment, immunization',
 'Diagnosis, regular treatment, safety measures',
 'B',
 'Secondary prevention = early diagnosis (screening) and prompt treatment. Immunization/diet = primary; rehabilitation = tertiary. Ref: Levels of prevention.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q166 — Community role in home-based care
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Home-Based Care',
 'The roles of the community in home-based care include:',
 'Mobilizing material support, giving consent for care, co-ordinating training',
 'Advocate on behaviour change, collaborating with caregivers, encourage the client to write a will',
 'Participating in care process, giving consent for care, mobilising material support',
 'Developing guidelines, providing commodities, preventing further transmission of HIV',
 'C',
 'The community''s role in home-based care (HBC) is to participate in the care process, give consent for care activities, and mobilise local and material support for the patient and family. Developing guidelines and providing commodities are the health system''s and NGO roles. Ref: Kenya HBC guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Home-Based Care',
 'The roles of the community in home-based care include:',
 'Mobilizing material support, giving consent for care, co-ordinating training',
 'Advocate on behaviour change, collaborating with caregivers, encourage the client to write a will',
 'Participating in care process, giving consent for care, mobilising material support',
 'Developing guidelines, providing commodities, preventing further transmission of HIV',
 'C',
 'Community role in HBC: participate in care, give consent, mobilise material support. Ref: Kenya HBC guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q168 — Biological environment: people, crops, pests
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'Biological environmental components include:',
 'Type of soil, domestic animals, plants',
 'Climate, altitude, dams',
 'People, crops, pests',
 'Crops, altitude, domestic animals',
 'C',
 'The biological environment comprises all living organisms: people, plants/crops, animals, pests and microorganisms. Soil type and altitude are physical environment components; climate is also part of the physical environment. Ref: Environmental health.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'Biological environmental components include:',
 'Type of soil, domestic animals, plants',
 'Climate, altitude, dams',
 'People, crops, pests',
 'Crops, altitude, domestic animals',
 'C',
 'Biological environment = living things: people, crops, pests, animals, microorganisms. Soil and climate are physical. Ref: Environmental health.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q169 — Gradual social change with little human effort: evolution
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Medical Sociology',
 'Gradual social change that occurs with very little or no human effort is referred to as:',
 'Evolution',
 'Reform',
 'Diffusion',
 'Revolution',
 'A',
 'Social evolution is slow, gradual and largely spontaneous change occurring over long periods without deliberate human planning. Reform is planned and deliberate; revolution is rapid and abrupt; diffusion is spread of cultural items from one society to another. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Medical Sociology',
 'Gradual social change that occurs with very little or no human effort is referred to as:',
 'Evolution',
 'Reform',
 'Diffusion',
 'Revolution',
 'A',
 'Social evolution is slow, gradual and spontaneous change. Reform and revolution are deliberate. Ref: Medical sociology.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q171 — School health committee members: formal leaders, ministry officials, teachers
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'School Health',
 'Members of the school health committee include:',
 'Community health nurse, ministry of health, students',
 'Community informal leaders, community health extension workers, parents',
 'Community informal leaders, parents, pupils',
 'Community formal leaders, ministry officials, teachers',
 'D',
 'A functioning school health committee includes community formal/administrative leaders, education and health ministry representatives, teachers and parents as key stakeholders. Ref: School health programme guidelines; MOH Kenya.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'School Health',
 'Members of the school health committee include:',
 'Community health nurse, ministry of health, students',
 'Community informal leaders, community health extension workers, parents',
 'Community informal leaders, parents, pupils',
 'Community formal leaders, ministry officials, teachers',
 'D',
 'School health committee: formal community leaders, ministry officials and teachers. Ref: School health programme guidelines; MOH Kenya.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q175 — Ethical considerations in community diagnosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Community Diagnosis',
 'Ethical considerations in community diagnosis include:',
 'Obtaining informed consent, setting objectives, ensuring confidentiality',
 'Establishing rapport, pretesting the questionnaire, training interviewers',
 'Establishing rapport, ensuring confidentiality, obtaining informed consent',
 'Selecting good interviewers, establishing rapport, setting objectives',
 'C',
 'Ethical principles in community diagnosis include informed consent (voluntary participation), confidentiality/privacy, respect (establishing rapport) and beneficence. Setting objectives and pretesting are methodological steps, not ethical considerations per se. Ref: Research/community ethics.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Community Diagnosis',
 'Ethical considerations in community diagnosis include:',
 'Obtaining informed consent, setting objectives, ensuring confidentiality',
 'Establishing rapport, pretesting the questionnaire, training interviewers',
 'Establishing rapport, ensuring confidentiality, obtaining informed consent',
 'Selecting good interviewers, establishing rapport, setting objectives',
 'C',
 'Ethical principles: informed consent, confidentiality, establishing rapport/respect. Setting objectives and pretesting are methodological. Ref: Research/community ethics.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q177 — Water-washed diseases prevented by: improving quantity of water
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'Water-washed diseases can be prevented through:',
 'Reducing contact with contaminated water',
 'Improving quality of water',
 'Notifying the public',
 'Improving quantity of water',
 'D',
 'Water-washed diseases (scabies, trachoma, skin and eye infections) are prevented by increasing the QUANTITY of water available for personal and domestic hygiene and washing. Improving water QUALITY reduces water-borne diseases. Ref: Environmental health; MOH WASH guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'Water-washed diseases can be prevented through:',
 'Reducing contact with contaminated water',
 'Improving quality of water',
 'Notifying the public',
 'Improving quantity of water',
 'D',
 'Water-washed diseases are prevented by improving the QUANTITY of water for hygiene. Improving quality reduces water-borne diseases. Ref: Environmental health; WASH guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q181 — Social therapy in HBC: reduces loneliness, ADLs, recreation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Home-Based Care',
 'Social therapy in home-based care helps in:',
 'Reducing loneliness, provision of balanced diet, spiritual growth',
 'Improving circulation, reducing loneliness, prevention of boredom',
 'Strengthening existing faith, improving self-esteem, counselling to live positively',
 'Reducing loneliness, assisting in activities of daily living, recreation activities',
 'D',
 'Social therapy addresses the patient''s social needs — reducing isolation and loneliness, assisting with activities of daily living (ADLs) and providing recreation and social interaction. Faith/spiritual support = spiritual therapy; diet provision = nutritional care. Ref: Kenya HBC guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Home-Based Care',
 'Social therapy in home-based care helps in:',
 'Reducing loneliness, provision of balanced diet, spiritual growth',
 'Improving circulation, reducing loneliness, prevention of boredom',
 'Strengthening existing faith, improving self-esteem, counselling to live positively',
 'Reducing loneliness, assisting in activities of daily living, recreation activities',
 'D',
 'Social therapy: reduces loneliness, assists with ADLs, provides recreation. Faith = spiritual; diet = nutritional. Ref: Kenya HBC guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q182 — Occupational health secondary prevention: screening at-risk employees
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Occupational Health',
 'In occupational health, secondary prevention services include:',
 'Training of the workforce on how to work with machines',
 'Screening employees at risk of a particular hazard',
 'Provision of crutches for the injured workers',
 'Utilization of protective clothing in industries',
 'B',
 'Secondary prevention in occupational health is early detection through screening of workers at risk of a particular occupational hazard (e.g., audiometry for noise-exposed workers, lung function tests for dust-exposed workers). Training and PPE are primary prevention; provision of crutches (rehabilitation) is tertiary prevention. Ref: Occupational health; levels of prevention.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Occupational Health',
 'In occupational health, secondary prevention services include:',
 'Training of the workforce on how to work with machines',
 'Screening employees at risk of a particular hazard',
 'Provision of crutches for the injured workers',
 'Utilization of protective clothing in industries',
 'B',
 'Occupational health secondary prevention = early detection through screening at-risk workers. Training and PPE = primary; crutches = tertiary. Ref: Occupational health; levels of prevention.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q194 — Environmental effects of global warming: ecosystem imbalance
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Environmental Health',
 'The environmental effects of global warming include:',
 'Ecosystem imbalance and destruction',
 'Acid rain and genetic mutation',
 'Water pollution and radiation',
 'Communicable diseases and cancers',
 'A',
 'Global warming disrupts ecosystems through: loss of biodiversity, altered habitats, melting ice caps, rising sea levels, extreme weather events and shifts in species distribution — i.e. ecosystem imbalance and destruction. Option B describes acid rain effects from air pollution; options C and D are other environmental hazards unrelated to global warming specifically. Ref: Environmental health; climate change.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Environmental Health',
 'The environmental effects of global warming include:',
 'Ecosystem imbalance and destruction',
 'Acid rain and genetic mutation',
 'Water pollution and radiation',
 'Communicable diseases and cancers',
 'A',
 'Global warming causes ecosystem imbalance and destruction (biodiversity loss, extreme weather, rising sea levels). Ref: Environmental health; climate change.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 8: TRUE/FALSE PAIRED ITEMS (from document)
-- ─────────────────────────────────────────────────────────────────────────────

-- Q80 — Vitamin B1 = beriberi; B3 = pellagra
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Community Health Nursing', 'Nutrition',
 'Match the deficiency with the associated disease: (i) Vitamin B1 deficiency; (ii) Niacin/Vitamin B3 deficiency.',
 'B1 → Beriberi; Niacin (B3) → Pellagra',
 'B1 → Pellagra; B3 → Beriberi',
 'B1 → Nyctalopia; B3 → Ariboflavinosis',
 'B1 → Ariboflavinosis; B3 → Nyctalopia',
 'A',
 'Thiamine (B1) deficiency causes beriberi (wet form: cardiac failure; dry form: peripheral neuropathy). Niacin (B3/nicotinic acid) deficiency causes pellagra (dermatitis, diarrhoea, dementia — the 3Ds). Nyctalopia (night blindness) = vitamin A deficiency; ariboflavinosis = riboflavin (B2) deficiency. Ref: Nutrition in nursing; MOH Kenya nutrition guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Community Health Nursing', 'Nutrition',
 'Match the deficiency with the associated disease: (i) Vitamin B1 deficiency; (ii) Niacin/Vitamin B3 deficiency.',
 'B1 → Beriberi; Niacin (B3) → Pellagra',
 'B1 → Pellagra; B3 → Beriberi',
 'B1 → Nyctalopia; B3 → Ariboflavinosis',
 'B1 → Ariboflavinosis; B3 → Nyctalopia',
 'A',
 'B1 → beriberi; B3 (niacin) → pellagra. Nyctalopia = vitamin A; ariboflavinosis = B2. Ref: Nutrition; MOH Kenya nutrition guidelines.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q95 — Rotavirus incubation 24–48 hrs TRUE; neutropenia in AML TRUE
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Communicable Diseases',
 'Indicate True/False: (a) Incubation period for Rotavirus is 24–48 hours; (b) Neutropenia is the commonest manifestation for acute myeloid leukaemia in children.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'C',
 '(a) TRUE — Rotavirus incubation period is approximately 24–48 hours (1–3 days). (b) TRUE — In AML, leukaemic infiltration of the bone marrow displaces normal haematopoiesis; neutropenia (with resulting susceptibility to serious bacterial and fungal infections) is a prominent and common clinical manifestation. Ref: Paediatric infectious disease; paediatric haematology/oncology.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Communicable Diseases',
 'Indicate True/False: (a) Incubation period for Rotavirus is 24–48 hours; (b) Neutropenia is the commonest manifestation for acute myeloid leukaemia in children.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'C',
 '(a) TRUE — Rotavirus incubation ≈ 24–48 hours. (b) TRUE — Neutropenia from bone marrow infiltration is a prominent finding in AML. Ref: Paediatric infectious disease; haematology.',
 'medium', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q49 — Neurons present at birth TRUE; decorticate from meninges FALSE
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Anatomy & Physiology',
 'Indicate True/False: (a) The infant is born with all of the nerve cells that will exist throughout life; (b) Decorticate posturing occurs with damage to the meninges.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'A',
 '(a) TRUE — Neurons are essentially all present at birth; subsequent brain development involves myelination, dendritic growth and synaptic connections — not generation of new neurons. (b) FALSE — Decorticate posturing (flexion of arms, extension of legs) reflects damage to the cerebral cortex or corticospinal tracts above the brainstem, NOT the meninges. Ref: Neuroanatomy/physiology; paediatric neurology.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Anatomy & Physiology',
 'Indicate True/False: (a) The infant is born with all of the nerve cells that will exist throughout life; (b) Decorticate posturing occurs with damage to the meninges.',
 '(a) TRUE, (b) FALSE',
 '(a) FALSE, (b) TRUE',
 'Both TRUE',
 'Both FALSE',
 'A',
 '(a) TRUE — Neurons are all present at birth; development is myelination and connectivity. (b) FALSE — Decorticate posturing reflects damage to cerebral cortex/corticospinal tracts, not the meninges. Ref: Neuroanatomy; paediatric neurology.',
 'hard', 'approved', NULL, 'Paper I') ON CONFLICT (stem, cadre) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 9: REMAINING RESEARCH Q (Q204, Q205-context already seeded as concept,
--            Q223, Q225) and nursing education Q59/Q216 (assimilation theory)
-- ─────────────────────────────────────────────────────────────────────────────

-- Q204 — Research question: focuses on possible variable relationships
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'A research question:',
 'Examines the characteristics of a variable',
 'States which variables are to be manipulated',
 'Focuses on what relationship might exist among variables',
 'Focuses on the pattern for conducting the investigation',
 'C',
 'A research question interrogates the possible relationship(s) among variables that the study seeks to answer. Option A describes a descriptive objective; B describes an experimental/manipulative purpose; D describes the methodology. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'A research question:',
 'Examines the characteristics of a variable',
 'States which variables are to be manipulated',
 'Focuses on what relationship might exist among variables',
 'Focuses on the pattern for conducting the investigation',
 'C',
 'A research question focuses on the possible relationship among variables. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q223 — Pre-testing questionnaire: reveals vague questions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The importance of pretesting the questionnaire is:',
 'Vague questions can be revealed and rephrased',
 'Comments by respondents can be ignored',
 'Enhances the reliability of respondents',
 'Deficiencies in respondents will be revealed',
 'A',
 'Pretesting (piloting) the questionnaire on a small sample detects ambiguous, vague, leading or poorly understood questions so they can be revised before the main study, improving both validity and reliability of the instrument. Ref: Research methods (questionnaire design).',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The importance of pretesting the questionnaire is:',
 'Vague questions can be revealed and rephrased',
 'Comments by respondents can be ignored',
 'Enhances the reliability of respondents',
 'Deficiencies in respondents will be revealed',
 'A',
 'Pretesting detects ambiguous/vague questions so they can be revised, improving instrument validity and reliability. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q225 — Methodology chapter includes: sampling method, design, data analysis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Research & Evidence-Based Practice', 'Research Methods',
 'The methodology chapter of a proposal includes:',
 'Design, data analysis, questionnaire',
 'Questionnaire, design, sampling method',
 'Sampling method, data analysis, questionnaire',
 'Sampling method, design, data analysis',
 'D',
 'The methodology chapter covers: study design, study site/population, sampling method and sample size, data collection instruments and data analysis plan. Among the options, sampling method + design + data analysis (option D) best captures the core methodology components without including tools as a standalone component. Ref: Research methods; proposal writing.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Research & Statistics', 'Research Methods',
 'The methodology chapter of a proposal includes:',
 'Design, data analysis, questionnaire',
 'Questionnaire, design, sampling method',
 'Sampling method, data analysis, questionnaire',
 'Sampling method, design, data analysis',
 'D',
 'Methodology: sampling method + study design + data analysis plan. Ref: Research methods.',
 'easy', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

-- Q59/Q216 — Cognitive learning theories: assimilation theory (BScN only — KRCHN already covered)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Education',
 'Cognitive theories of learning include:',
 'Assimilation theory',
 'Operant conditioning',
 'Student-centered education',
 'Classical conditioning',
 'A',
 'Assimilation theory (Ausubel/Piaget) is a cognitive learning theory focusing on how new information is integrated with existing mental schemas through meaningful learning. Operant conditioning (Skinner) and classical conditioning (Pavlov) are behaviourist theories. Student-centred education is a teaching philosophy, not a learning theory. Ref: Learning theories; nursing education.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Education',
 'Cognitive theories of learning include:',
 'Assimilation theory',
 'Operant conditioning',
 'Student-centered education',
 'Classical conditioning',
 'A',
 'Assimilation theory (Ausubel/Piaget) is a cognitive learning theory. Operant and classical conditioning are behaviourist. Ref: Learning theories.',
 'medium', 'approved', NULL, 'Paper II') ON CONFLICT (stem, cadre) DO NOTHING;
