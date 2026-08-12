-- ============================================================
-- Batch:           NCK-MCQ-Compilation-Set5
-- Source document: NCK_MCQ_Compilation_Set5.docx
-- Total questions: ~900-1000 (estimated unique after dedup)
-- Cadres:          BScN, KRCHN
-- Papers:          Paper I, Paper II
-- exam_year:       NULL (undated source document)
-- Generated:       2026-08-05 00:00:01 UTC
-- ============================================================
-- Tasks covered by this file:
--   1.1  Migration skeleton + header block
--   2.1  BScN Paper I — Q1-Q100 (Medical-Surgical Nursing, Anatomy & Physiology,
--        Pharmacology, Critical Care Nursing — first batch)
-- ============================================================
-- AUDIT CORRECTIONS APPLIED IN THIS BATCH:
--   Q10 (3a): option_a corrected from 'Short-acting insulin' to 'Rapid-acting insulin';
--             correct_option confirmed A
--   Q13 (3b): correct_option corrected from C (Sodium bicarbonate) to D (Albuterol);
--             rationale updated to clarify insulin+dextrose is first-line but absent
--   Q46 (3c): stem corrected; option_b corrected from 'IX' to 'Factor VIII';
--             correct_option corrected to B; full clinical rationale provided
-- ============================================================

-- ============================================================
-- BScN Paper I — Q1-Q20
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which factor is most critical in emergency care?',
  'Rapid assessment and timely intervention',
  'Delayed response',
  'Ignoring symptoms',
  'Limiting care',
  'A',
  'Rapid assessment and timely intervention are the most critical factors in emergency care, preventing deterioration and death (the ''golden hour'' principle). Early recognition and prompt action reduce morbidity and mortality. Per Kenya MOH emergency care protocols and Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Emergency Principles',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which condition is characterized by inflammation and thickening of the bronchial tubes, leading to increased mucus production and difficulty breathing?',
  'Pneumonia',
  'Asthma',
  'Tuberculosis',
  'Emphysema',
  'B',
  'Asthma is characterised by reversible bronchial inflammation, airway hyper-responsiveness, mucosal thickening and increased mucus causing dyspnoea and wheeze. Pneumonia is alveolar infection, TB is granulomatous infection, emphysema is alveolar destruction. Brunner & Suddarth''s; WHO/Kenya MOH asthma guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a history of cirrhosis is at risk for developing which complication?',
  'Diabetes',
  'Kidney stones',
  'Portal hypertension',
  'Osteoporosis',
  'C',
  'Cirrhosis causes fibrotic obstruction of hepatic blood flow, raising pressure in the portal system producing varices, ascites and splenomegaly. These are the cardinal complications of advanced liver fibrosis. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Hepatic Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which laboratory value would be elevated in a patient with pancreatitis?',
  'Serum amylase',
  'Serum creatinine',
  'Hemoglobin level',
  'Serum sodium level',
  'A',
  'Serum amylase (and lipase) rise markedly in acute pancreatitis due to release of pancreatic enzymes into the bloodstream following acinar cell injury. Amylase rises within 2–12 hours and lipase remains elevated longer. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse caring for a postoperative patient should prioritize which intervention to prevent postoperative complications?',
  'Administering pain medication',
  'Ambulating the patient',
  'Monitoring vital signs',
  'Administering antiemetics',
  'C',
  'Immediately postoperatively, monitoring vital signs is the priority — enabling early detection of haemorrhage, shock, airway or respiratory compromise. All other options are important but secondary to ongoing physiological surveillance. Kozier & Erb''s Fundamentals of Nursing.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is a common symptom of gastroesophageal reflux disease (GERD)?',
  'Diarrhea',
  'Constipation',
  'Heartburn',
  'Chest pain',
  'C',
  'Heartburn (pyrosis) from acid reflux into the oesophagus is the classic hallmark symptom of GERD. It is described as a burning sensation rising from the epigastrium toward the throat, worsened by lying down or eating. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with COPD is prescribed oxygen therapy. What is the target oxygen saturation level?',
  '85%',
  '88-92%',
  '95%',
  '98%',
  'B',
  'In COPD, controlled oxygen therapy targets SpO2 88–92% to avoid abolishing the hypoxic respiratory drive and causing CO2 retention (hypercapnic respiratory failure). Higher targets risk suppressing the drive to breathe in patients with chronic hypercapnia. WHO/Kenya MOH oxygen therapy guidance; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which medication is commonly used to treat angina pectoris by dilating coronary arteries?',
  'Aspirin',
  'Digoxin',
  'Nitroglycerin',
  'Warfarin',
  'C',
  'Nitroglycerin is a nitrate vasodilator that relieves angina by dilating coronary and systemic vessels, reducing preload and improving myocardial perfusion. Sublingual nitroglycerin acts within 1–3 minutes. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with DVT is at risk for which complication?',
  'Stroke',
  'Pulmonary embolism',
  'Myocardial infarction',
  'Hypertension',
  'B',
  'A DVT thrombus can dislodge and travel via the venous circulation to the pulmonary vasculature, causing pulmonary embolism — the most feared and life-threatening direct complication of DVT. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- AUDIT CORRECTION
-- Original marked answer: A (Short-acting insulin)
-- Corrected answer:       A (Rapid-acting insulin)
-- Reason: Source option A text was 'Short-acting insulin' which is clinically incorrect
--         for insulin lispro. Insulin lispro is a rapid-acting insulin analogue with
--         onset 15 minutes, peak 30-90 minutes, duration 3-5 hours. The option text
--         has been corrected to 'Rapid-acting insulin'; correct_option remains A.
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with diabetes is prescribed insulin lispro. What type of insulin is insulin lispro?',
  'Rapid-acting insulin',
  'Intermediate-acting insulin',
  'Long-acting insulin',
  'Ultra-long-acting insulin',
  'A',
  'Insulin lispro (Humalog) is a rapid-acting insulin analogue with onset of action within 15 minutes, peak at 30–90 minutes, and duration of 3–5 hours. It is administered just before meals to control postprandial glucose. Intermediate-acting (e.g. NPH) peaks at 4–12 hours; long-acting (e.g. glargine) has no peak. Kenya MOH Diabetes Management Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Endocrine Pharmacology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is a potential complication of a fracture in which the bone breaks through the skin?',
  'Compartment syndrome',
  'Greenstick fracture',
  'Stress fracture',
  'Pathologic fracture',
  'A',
  'An open (compound) fracture carries a high risk of compartment syndrome from oedema and tissue injury within a closed fascial compartment, as well as osteomyelitis from contamination. Greenstick, stress and pathologic fractures are distinct fracture types, not complications. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Orthopaedic Nursing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the primary nursing intervention for a patient with a nasogastric tube?',
  'Administering pain medication',
  'Monitoring urine output',
  'Assessing bowel sounds',
  'Ensuring tube patency and placement',
  'D',
  'The primary nursing responsibility for an NG tube is ensuring correct placement and patency to prevent aspiration pneumonia and ensure effective decompression or feeding. Placement is verified by aspiration of gastric contents and pH testing (or X-ray). Kozier & Erb''s Fundamentals of Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Nursing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- AUDIT CORRECTION
-- Original marked answer: C (Sodium bicarbonate)
-- Corrected answer:       D (Albuterol)
-- Reason: The gold standard for transcellular potassium shift in hyperkalemia is
--         insulin+dextrose, which is absent from the options. Among the options given,
--         albuterol (beta-2 agonist) is the best answer as it promotes cellular uptake
--         of potassium by stimulating Na-K-ATPase. Calcium gluconate stabilises the
--         myocardium but does NOT shift potassium into cells. Furosemide eliminates K+
--         but does not cause intracellular shift. Sodium bicarbonate shifts K+ mainly
--         in acidotic patients and is less reliable without acidosis. Albuterol is
--         therefore the most correct answer for the mechanism asked.
--         Reference: Brunner & Suddarth''s; Kenya MOH Clinical Guidelines on hyperkalemia.
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which medication is used to treat hyperkalemia by promoting the movement of potassium into cells?',
  'Calcium gluconate',
  'Furosemide',
  'Sodium bicarbonate',
  'Albuterol',
  'D',
  'Albuterol (a beta-2 agonist) promotes transcellular shift of potassium into cells by stimulating Na-K-ATPase, rapidly lowering serum K+. The first-line agent for this mechanism (insulin + dextrose) is not listed among the options. Calcium gluconate stabilises the myocardium but does not shift K+ intracellularly. Furosemide eliminates K+ renally. Sodium bicarbonate shifts K+ mainly in the presence of metabolic acidosis. Albuterol is therefore the most appropriate answer from the options available. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Fluid and Electrolyte Pharmacology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nursing intervention is appropriate for a patient with a suspected head injury?',
  'Administering aspirin for pain relief',
  'Elevating the head of the bed',
  'Applying a heating pad to the head',
  'Assessing pupillary response',
  'D',
  'In suspected head injury, assessing pupillary response (size, equality, reaction to light) combined with GCS assessment is essential to detect rising intracranial pressure (ICP). Aspirin risks intracranial bleeding; heat worsens cerebral oedema. Head elevation (15–30°) may be used but is secondary to neurological assessment. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Neurological Assessment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with peptic ulcer disease is prescribed a proton pump inhibitor. What is the primary action of PPIs?',
  'Reducing gastric motility',
  'Increasing gastric acid production',
  'Promoting mucosal healing',
  'Enhancing digestion of proteins',
  'C',
  'PPIs irreversibly inhibit the gastric H+/K+ ATPase (proton pump), markedly reducing acid secretion and creating the low-acid environment necessary for mucosal healing of peptic ulcers. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Gastrointestinal Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is a common symptom of hypothyroidism?',
  'Weight loss',
  'Excessive sweating',
  'Cold intolerance',
  'Tachycardia',
  'C',
  'Hypothyroidism reduces metabolic rate, producing cold intolerance, weight gain, fatigue, constipation, dry skin and bradycardia. Weight loss, excessive sweating and tachycardia are features of hyperthyroidism. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with rheumatoid arthritis complains of acute joint pain and swelling. What is the primary nursing intervention?',
  'Administering an opioid analgesic',
  'Applying cold packs to the affected joints',
  'Encouraging passive range of motion exercises',
  'Administering an immunosuppressant medication',
  'B',
  'For acutely inflamed, swollen rheumatoid joints, applying cold packs reduces inflammation and pain. Passive ROM during acute flare worsens pain and risks further joint damage. Opioids and immunosuppressants are physician-prescribed interventions not within independent nursing scope for initial management. Lewis Medical-Surgical Nursing; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Musculoskeletal Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which complication should a nurse monitor for in a patient receiving IV heparin for DVT?',
  'Hypertension',
  'Hematuria',
  'Thrombocytopenia',
  'Gastrointestinal bleeding',
  'C',
  'Heparin-induced thrombocytopenia (HIT) is a serious immune-mediated complication of heparin therapy in which antibodies against the heparin-PF4 complex activate platelets, causing thrombocytopenia and paradoxical thrombosis. Platelet counts must be monitored regularly. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Anticoagulation Therapy',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the primary purpose of loop diuretics in heart failure management?',
  'Increasing blood pressure',
  'Promoting potassium retention',
  'Reducing fluid volume overload',
  'Enhancing myocardial contractility',
  'C',
  'Loop diuretics (e.g. furosemide) inhibit the Na-K-2Cl cotransporter in the loop of Henle, promoting sodium and water excretion, thereby reducing fluid volume overload, pulmonary congestion and peripheral oedema in heart failure. They do not increase BP, retain K+, or enhance contractility. Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which sign is most indicative of hypocalcemia?',
  'Muscle weakness',
  'Chvostek''s sign',
  'Bradycardia',
  'Polyuria',
  'B',
  'Chvostek''s sign — facial muscle twitching elicited by tapping the facial nerve anterior to the ear — indicates neuromuscular irritability from hypocalcaemia. Trousseau''s sign (carpal spasm with BP cuff inflation) is another classic sign. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper I — Q21-Q40
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with chronic kidney disease has a serum potassium of 6.5 mEq/L. What is the priority nursing intervention?',
  'Administer potassium supplements',
  'Initiate cardiac monitoring',
  'Encourage a high-potassium diet',
  'Administer a loop diuretic without physician order',
  'B',
  'A serum potassium of 6.5 mEq/L (severe hyperkalaemia) poses an immediate risk of life-threatening arrhythmias. The priority nursing action is to initiate continuous cardiac monitoring to detect peaked T-waves, widened QRS or VF, and to alert the physician for treatment. Potassium supplements and high-K+ diet are contraindicated. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which assessment finding is most indicative of right-sided heart failure?',
  'Crackles in the lungs',
  'Pink frothy sputum',
  'Peripheral oedema',
  'Orthopnoea',
  'C',
  'Right-sided heart failure leads to systemic venous congestion, producing peripheral (dependent) oedema, jugular venous distension and hepatomegaly. Crackles, pink frothy sputum and orthopnoea are manifestations of left-sided heart failure and pulmonary oedema. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal range for adult blood pressure?',
  '100/60 mmHg',
  '120/80 mmHg',
  '140/90 mmHg',
  '160/100 mmHg',
  'B',
  'The normal adult blood pressure is less than 120/80 mmHg per current Kenya MOH and WHO/JNC guidelines. 140/90 mmHg and above defines hypertension; 100/60 mmHg may indicate hypotension. Brunner & Suddarth''s; Kenya MOH Hypertension Management Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is admitted with severe burns covering 40% of the body surface area. What is the priority nursing intervention?',
  'Applying antiseptic dressings',
  'Administering analgesics',
  'Initiating IV fluid resuscitation',
  'Preventing infection',
  'C',
  'In severe burns >20% BSA, massive fluid shifts cause hypovolaemic shock. IV fluid resuscitation (Parkland or Consensus formula: 4 mL/kg/% BSA with Ringer''s lactate in 24 hours) is the immediate priority to restore circulating volume and prevent organ failure. Kenya MOH Burns Management Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Burns Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which sign indicates increased intracranial pressure (ICP)?',
  'Decreased blood pressure',
  'Tachycardia',
  'Dilated pupils',
  'Hyperthermia',
  'C',
  'Unilateral or bilateral dilated, non-reactive pupils (blown pupils) are a hallmark sign of raised ICP with uncal herniation compressing cranial nerve III. The Cushing''s triad (hypertension, bradycardia, irregular respirations) also indicates raised ICP. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Intracranial Pressure Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is caring for a patient with septic shock. Which assessment finding requires immediate intervention?',
  'Temperature of 38.5°C',
  'Mean arterial pressure of 55 mmHg',
  'Heart rate of 95 bpm',
  'Respiratory rate of 18 breaths/min',
  'B',
  'A mean arterial pressure (MAP) of 55 mmHg in septic shock indicates inadequate organ perfusion pressure (target MAP ≥65 mmHg per Surviving Sepsis Campaign and Kenya MOH Sepsis Guidelines). This requires immediate vasopressor therapy and fluid resuscitation. The other findings are less immediately critical.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Sepsis and Shock',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most common cause of hospital-acquired pneumonia?',
  'Streptococcus pneumoniae',
  'Mycobacterium tuberculosis',
  'Gram-negative bacilli',
  'Staphylococcus aureus',
  'C',
  'Hospital-acquired (nosocomial) pneumonia is most commonly caused by gram-negative bacilli (e.g. Pseudomonas aeruginosa, Klebsiella pneumoniae, Enterobacter species), particularly in ICU and ventilated patients. Streptococcus pneumoniae is the leading cause of community-acquired pneumonia. Brunner & Suddarth''s; Kenya MOH IPC Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the correct technique for performing a sterile dressing change?',
  'Using clean gloves throughout the procedure',
  'Starting from the wound edge and moving outward',
  'Cleaning from the wound centre outward using a sterile technique',
  'Reusing dressing materials to reduce waste',
  'C',
  'Sterile dressing changes require cleaning from the wound centre outward (least to most contaminated area) using sterile technique to prevent introducing microorganisms into the wound. Clean gloves are not sufficient for sterile wounds. Reusing dressing materials is prohibited. Kozier & Erb''s Fundamentals of Nursing; Kenya MOH IPC Standards.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with sudden onset of severe chest pain radiating to the back. Which condition should the nurse suspect first?',
  'Myocardial infarction',
  'Aortic dissection',
  'Pulmonary embolism',
  'Pericarditis',
  'B',
  'Sudden severe chest pain radiating to the back (interscapular region) is the classic presentation of aortic dissection — a vascular emergency requiring immediate surgical consultation. MI typically produces substernal crushing pain; PE presents with pleuritic chest pain and dyspnoea; pericarditis causes sharp positional chest pain. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Cardiovascular Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which intervention is most effective for preventing ventilator-associated pneumonia (VAP)?',
  'Routine chest physiotherapy every 4 hours',
  'Elevating the head of the bed to 30-45 degrees',
  'Administering prophylactic antibiotics',
  'Suctioning the airway every hour',
  'B',
  'Elevating the head of the bed to 30–45° (semi-recumbent position) is the most evidence-based intervention for preventing VAP by reducing aspiration of oropharyngeal and gastric secretions into the lower airways. It is a core component of the VAP prevention bundle per Kenya MOH IPC Guidelines and WHO. Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Ventilator Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper I — Q41-Q60
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with acute kidney injury (AKI) has a urine output of 20 mL/hour. Which term describes this finding?',
  'Anuria',
  'Oliguria',
  'Polyuria',
  'Nocturia',
  'B',
  'Oliguria is defined as urine output less than 0.5 mL/kg/hour or less than 400 mL/24 hours in adults. An output of 20 mL/hour is below this threshold and indicates impaired renal perfusion or acute tubular injury. Anuria is <50 mL/24 hours. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Renal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which ECG change is associated with hyperkalaemia?',
  'Prolonged PR interval',
  'Peaked T-waves',
  'ST segment depression',
  'Shortened QT interval',
  'B',
  'Hyperkalaemia produces a characteristic sequence of ECG changes beginning with tall, peaked (tent-shaped) T-waves — the earliest finding. Progressive hyperkalaemia leads to widened QRS, flattened P-waves, sine-wave pattern and eventually ventricular fibrillation. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with type 1 diabetes presents with blood glucose of 3.0 mmol/L and is confused. What is the immediate nursing action?',
  'Administer insulin as prescribed',
  'Encourage oral fluids',
  'Administer 50% dextrose IV or glucagon IM',
  'Recheck blood glucose in one hour',
  'C',
  'A blood glucose of 3.0 mmol/L with altered consciousness constitutes severe hypoglycaemia. The immediate action is IV 50% dextrose (25–50 mL) or IM glucagon 1 mg if IV access is unavailable, to rapidly restore blood glucose. Oral fluids are contraindicated with altered consciousness due to aspiration risk. Insulin would worsen hypoglycaemia. Kenya MOH Diabetes Management Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which position is most appropriate for a patient experiencing an acute asthma attack?',
  'Supine',
  'Trendelenburg',
  'High Fowler''s (upright)',
  'Left lateral',
  'C',
  'High Fowler''s position (sitting upright at 90°) maximises diaphragmatic excursion and reduces the work of breathing during an acute asthma attack. Supine and Trendelenburg positions worsen dyspnoea by restricting diaphragmatic movement. Kenya MOH Asthma Management Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- AUDIT CORRECTION
-- Original stem: 'Which clotting factor is deficient in haemophilia A?'
-- Corrected stem: 'Haemophilia A results from deficiency of which clotting factor?'
-- Original option_b: 'IX'
-- Corrected option_b: 'Factor VIII'
-- Original correct_option: A (Factor VIII listed elsewhere)
-- Corrected correct_option: B (Factor VIII)
-- Reason: Haemophilia A is caused by deficiency of Factor VIII (antihemophilic factor).
--         Haemophilia B (Christmas disease) is caused by deficiency of Factor IX.
--         The original source document had the option text for B as 'IX' and the
--         correct answer was marked incorrectly. Factor VIII is the definitive answer
--         for Haemophilia A. Per Brunner & Suddarth''s and Kenya MOH Clinical Guidelines.
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Haemophilia A results from deficiency of which clotting factor?',
  'Factor VII',
  'Factor VIII',
  'Factor IX',
  'Factor X',
  'B',
  'Haemophilia A is an X-linked recessive bleeding disorder caused by deficiency or dysfunction of Factor VIII (antihemophilic factor A). It presents with prolonged bleeding, haemarthroses and deep tissue haematomas. Haemophilia B (Christmas disease) is Factor IX deficiency. Treatment is Factor VIII concentrate or recombinant Factor VIII. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Haematological Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is prescribed metformin for type 2 diabetes. Which condition is a contraindication to metformin use?',
  'Hypertension',
  'Obesity',
  'Renal impairment (eGFR <30 mL/min)',
  'Hyperlipidaemia',
  'C',
  'Metformin is contraindicated in significant renal impairment (eGFR <30 mL/min) due to risk of fatal lactic acidosis from impaired renal clearance of the drug. It is generally safe and beneficial in obesity and hypertension, and does not affect lipids adversely. Kenya MOH Diabetes Management Guidelines; BNF.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Endocrine Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nerve is most commonly injured in a humeral shaft fracture?',
  'Ulnar nerve',
  'Median nerve',
  'Radial nerve',
  'Musculocutaneous nerve',
  'C',
  'The radial nerve winds around the posterior humeral shaft in the spiral groove and is the most vulnerable nerve in mid-shaft humeral fractures, causing wrist drop (inability to extend the wrist). The ulnar nerve is at risk at the medial epicondyle; the median nerve at the elbow or wrist. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Orthopaedic Nursing',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the primary goal of palliative care nursing?',
  'Curing the underlying disease',
  'Prolonging life at all costs',
  'Promoting quality of life and relieving suffering',
  'Administering aggressive treatment',
  'C',
  'Palliative care nursing aims to promote quality of life and relieve physical, psychological, social and spiritual suffering for patients and families facing life-threatening illness. It neither hastens nor postpones death. The focus is on comfort, dignity and holistic care. WHO Palliative Care guidelines; Kenya MOH Palliative Care Policy.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Palliative and End-of-Life Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with liver cirrhosis develops confusion and asterixis. Which complication is most likely?',
  'Hypoglycaemia',
  'Hepatic encephalopathy',
  'Hyponatraemia',
  'Subdural haematoma',
  'B',
  'Confusion with asterixis (flapping tremor) in a patient with cirrhosis is the classic presentation of hepatic encephalopathy — caused by accumulation of ammonia and other toxins due to impaired hepatic detoxification. Management includes lactulose and dietary protein modification. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Hepatic Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which electrolyte imbalance is most commonly associated with prolonged nasogastric suctioning?',
  'Hyperkalaemia',
  'Hypernatraemia',
  'Hypokalaemia and metabolic alkalosis',
  'Metabolic acidosis',
  'C',
  'Prolonged NG suctioning removes gastric acid (HCl), resulting in loss of hydrogen and chloride ions, leading to hypokalaemia and hypochloraemic metabolic alkalosis. Potassium follows as kidneys try to conserve sodium in exchange for potassium and hydrogen ions. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper I — Q61-Q80
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most appropriate intervention for a patient experiencing status epilepticus?',
  'Restraining the patient to prevent injury',
  'Administering IV diazepam or lorazepam',
  'Placing a tongue depressor in the mouth',
  'Giving oral anticonvulsants immediately',
  'B',
  'Status epilepticus (continuous seizure >5 minutes or two seizures without recovery of consciousness) requires immediate IV benzodiazepine (diazepam 10 mg IV or lorazepam 0.1 mg/kg IV) to terminate the seizure. Physical restraint can cause injury; placing objects in the mouth risks dental and airway injury; oral anticonvulsants cannot be administered safely during active seizure. Kenya MOH Neurology Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has a serum sodium of 122 mEq/L and is symptomatic with confusion and headache. What is the priority nursing intervention?',
  'Encourage oral water intake',
  'Administer hypertonic saline under close supervision',
  'Restrict all IV fluids',
  'Administer a loop diuretic alone',
  'B',
  'Symptomatic severe hyponatraemia (Na+ <125 mEq/L with neurological symptoms) requires careful correction with hypertonic saline (3% NaCl) under close monitoring to raise sodium no faster than 8–10 mEq/L per 24 hours, to avoid osmotic demyelination syndrome. Oral water intake worsens dilutional hyponatraemia. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which finding is characteristic of Cushing''s syndrome?',
  'Weight loss and hypotension',
  'Moon face, central obesity and purple striae',
  'Exophthalmos and heat intolerance',
  'Bronze skin pigmentation and hypotension',
  'B',
  'Cushing''s syndrome (excess cortisol) presents with moon face, central obesity, buffalo hump, purple (wide) striae, hypertension, hyperglycaemia and osteoporosis. Exophthalmos and heat intolerance indicate hyperthyroidism; bronze pigmentation and hypotension indicate Addison''s disease. Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is scheduled for a total thyroidectomy. Which potential complication requires immediate postoperative assessment?',
  'Hypothyroidism',
  'Respiratory obstruction from laryngeal oedema or haematoma',
  'Delayed wound healing',
  'Transient hyperglycaemia',
  'B',
  'Respiratory obstruction from laryngeal oedema, vocal cord injury or haematoma compression of the trachea is the most immediately life-threatening complication post-thyroidectomy and requires priority airway assessment and a tracheostomy tray at bedside. Hypothyroidism develops gradually. Brunner & Suddarth''s; Kozier & Erb''s.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Perioperative Care',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which laboratory test is used to monitor long-term glycaemic control in diabetes mellitus?',
  'Fasting blood glucose',
  'Postprandial blood glucose',
  'Haemoglobin A1c (HbA1c)',
  'Urine glucose',
  'C',
  'HbA1c (glycated haemoglobin) reflects average blood glucose control over the preceding 2–3 months (lifetime of red blood cells) and is the gold standard for monitoring long-term glycaemic control in diabetes. Target is <7% for most adults per Kenya MOH Diabetes Management Guidelines and WHO/IDF.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is preparing to administer blood transfusion. What is the most critical pre-transfusion check?',
  'Checking the patient''s temperature',
  'Verifying blood group compatibility at the bedside',
  'Checking the patient''s blood pressure',
  'Ensuring the IV line is patent',
  'B',
  'The most critical pre-transfusion check is bedside verification of blood group and cross-match compatibility between the blood product label and the patient''s identification, blood group and Rh type — to prevent potentially fatal acute haemolytic transfusion reactions from ABO incompatibility. This must be done by two nurses. Kenya MOH Blood Transfusion Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Blood Transfusion Nursing',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which statement best describes the mechanism of action of beta-blockers?',
  'They increase heart rate and cardiac output',
  'They block beta-adrenergic receptors, reducing heart rate and myocardial contractility',
  'They promote sodium and water retention',
  'They dilate peripheral blood vessels by blocking alpha receptors',
  'B',
  'Beta-blockers competitively block beta-adrenergic receptors (β1 in the heart), reducing heart rate, myocardial contractility, and cardiac output, thereby lowering blood pressure and myocardial oxygen demand. They are used in hypertension, angina, heart failure and arrhythmias. Kenya MOH Clinical Guidelines; standard pharmacology texts.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with chronic obstructive pulmonary disease (COPD) exhibits barrel chest. What is the underlying cause of this finding?',
  'Hypertrophy of respiratory muscles',
  'Pulmonary fibrosis',
  'Air trapping leading to lung hyperinflation',
  'Pleural effusion',
  'C',
  'In COPD, chronic air trapping due to loss of elastic recoil and expiratory airflow limitation leads to lung hyperinflation, increasing the antero-posterior chest diameter and producing the characteristic barrel chest appearance. Brunner & Suddarth''s Medical-Surgical Nursing; Anatomy & Physiology of Respiration.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which measure is most effective for preventing pressure injuries (decubitus ulcers) in a bedridden patient?',
  'Massaging bony prominences vigorously',
  'Repositioning the patient every 2 hours',
  'Applying occlusive dressings to all bony prominences',
  'Restricting oral fluid intake',
  'B',
  'Repositioning the patient at least every 2 hours (pressure-relieving repositioning schedule) is the most effective evidence-based intervention for preventing pressure injuries by relieving sustained pressure over bony prominences. Vigorous massage is contraindicated as it can damage fragile tissue. Kozier & Erb''s; Kenya MOH Nursing Standards.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Skin and Wound Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with heart failure is prescribed digoxin. Which electrolyte imbalance increases the risk of digoxin toxicity?',
  'Hypernatraemia',
  'Hyperkalaemia',
  'Hypokalaemia',
  'Hypercalcaemia',
  'C',
  'Hypokalaemia potentiates digoxin toxicity because low serum potassium increases binding of digoxin to Na-K-ATPase in cardiac cells, amplifying its effect and risk of arrhythmias. Loop diuretics (often co-prescribed) cause hypokalaemia, so serum K+ must be monitored closely. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper I — Q81-Q100
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which organ is primarily responsible for the production of erythropoietin?',
  'Liver',
  'Spleen',
  'Kidney',
  'Bone marrow',
  'C',
  'Erythropoietin (EPO) is primarily produced by peritubular interstitial cells in the renal cortex in response to hypoxia. It stimulates red blood cell production in the bone marrow. Chronic kidney disease reduces EPO production, leading to anaemia of chronic disease. Anatomy & Physiology; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Renal Physiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During an acute anaphylactic reaction, which medication is administered first?',
  'Hydrocortisone IV',
  'Chlorphenamine IM',
  'Adrenaline (epinephrine) IM',
  'Salbutamol nebuliser',
  'C',
  'Intramuscular adrenaline (epinephrine) 0.5 mg (1:1000) is the first-line treatment for anaphylaxis. It reverses vasodilation, bronchospasm and angioedema rapidly. Antihistamines and corticosteroids are adjuncts given after adrenaline. Kenya MOH Emergency Guidelines; WHO Anaphylaxis Management.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Emergency Pharmacology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which cranial nerve is responsible for the gag reflex?',
  'Cranial nerve V (Trigeminal)',
  'Cranial nerve VII (Facial)',
  'Cranial nerve IX (Glossopharyngeal) and X (Vagus)',
  'Cranial nerve XII (Hypoglossal)',
  'C',
  'The gag reflex is mediated by cranial nerve IX (glossopharyngeal) as the afferent limb and cranial nerve X (vagus) as the efferent limb. Assessing the gag reflex is critical before oral feeding in patients with neurological injury to prevent aspiration. Anatomy & Physiology; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Neuroanatomy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with sudden onset of severe headache described as "the worst headache of my life." Which condition should be suspected?',
  'Migraine',
  'Tension headache',
  'Subarachnoid haemorrhage',
  'Cluster headache',
  'C',
  'A sudden, severe "thunderclap" headache described as "the worst headache of my life" is the classic presentation of subarachnoid haemorrhage (SAH) from a ruptured cerebral aneurysm — a neurological emergency requiring immediate CT scan without contrast. Brunner & Suddarth''s; Kenya MOH Neurology Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Neurological Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which intervention is the highest priority when a patient develops a tension pneumothorax?',
  'Chest physiotherapy',
  'Inserting a chest drain under water seal',
  'Immediate needle decompression',
  'Administering supplemental oxygen only',
  'C',
  'Tension pneumothorax is a life-threatening emergency requiring immediate needle decompression (large-bore needle at 2nd intercostal space, mid-clavicular line) to release positive pressure before formal chest drain insertion. Delay causes cardiovascular collapse from mediastinal shift. Kenya MOH Emergency Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Respiratory Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which anatomical structure separates the right and left ventricles of the heart?',
  'Interatrial septum',
  'Interventricular septum',
  'Tricuspid valve',
  'Atrioventricular bundle',
  'B',
  'The interventricular septum is the muscular wall separating the right and left ventricles. The interatrial septum separates the atria. A ventricular septal defect (VSD) is the most common congenital heart defect and involves this structure. Anatomy & Physiology; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Cardiovascular Anatomy',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with acute myocardial infarction is prescribed aspirin. What is the primary reason for administering aspirin in this setting?',
  'To relieve chest pain',
  'To reduce fever',
  'To inhibit platelet aggregation and prevent further thrombus formation',
  'To anticoagulate the patient',
  'C',
  'Aspirin irreversibly inhibits cyclooxygenase (COX-1), blocking thromboxane A2 synthesis and thereby inhibiting platelet aggregation. In acute MI, this prevents further thrombus propagation and reduces infarct size and mortality. Loading dose 300 mg is given immediately. Kenya MOH Cardiac Emergency Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which position is contraindicated for a patient with increased intracranial pressure?',
  'Semi-Fowler''s at 30 degrees',
  'Trendelenburg (head-down) position',
  'Neutral head alignment',
  'Lateral recumbent with head at 30 degrees',
  'B',
  'The Trendelenburg (head-down) position is contraindicated in raised ICP as it increases cerebral venous congestion and ICP further. The recommended position is head of bed elevated 15–30° with neutral head alignment to promote cerebral venous drainage. Brunner & Suddarth''s; Kenya MOH Neurosurgery Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Intracranial Pressure Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most appropriate nursing action for a patient with a chest tube connected to a water seal drainage system when the nurse observes that the water level in the water seal chamber is not fluctuating?',
  'Clamp the chest tube immediately',
  'Milk the chest tube vigorously',
  'Assess for possible tube obstruction or lung re-expansion',
  'Disconnect the drainage system and reinsert',
  'C',
  'Absence of fluctuation (tidalling) in the water seal chamber indicates either the lung has re-expanded (a positive sign) or the tube is kinked, clotted or obstructed. The nurse should assess the patient''s respiratory status and inspect the tube for obstruction. Clamping is generally contraindicated. Brunner & Suddarth''s; Kozier & Erb''s.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Chest Tube Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient receiving morphine for postoperative pain develops a respiratory rate of 8 breaths per minute. What is the priority nursing action?',
  'Administer the next scheduled dose of morphine',
  'Administer naloxone (Narcan) IV',
  'Increase the oxygen flow rate',
  'Encourage deep breathing exercises',
  'B',
  'A respiratory rate of 8 breaths/min indicates opioid-induced respiratory depression — a life-threatening complication. The priority action is to administer naloxone (opioid antagonist) IV in titrated doses to reverse respiratory depression while maintaining analgesia. Kenya MOH Acute Pain Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Pain Management Pharmacology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which early sign is most characteristic of diabetic ketoacidosis (DKA)?',
  'Bradycardia and hypertension',
  'Kussmaul respirations and fruity breath odour',
  'Peripheral oedema',
  'Hypothermia',
  'B',
  'Kussmaul respirations (deep, rapid breathing) represent the body''s respiratory compensation for metabolic acidosis in DKA. Fruity (acetone) breath results from ketone production. DKA is a hyperglycaemic emergency with blood glucose >11 mmol/L, ketonaemia and acidosis (pH <7.3). Kenya MOH Diabetes Management Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is admitted with suspected ectopic pregnancy. Which is the most life-threatening complication?',
  'Nausea and vomiting',
  'Shoulder tip pain',
  'Intraperitoneal haemorrhage and haemodynamic shock',
  'Urinary frequency',
  'C',
  'Ruptured ectopic pregnancy causes massive intraperitoneal haemorrhage and haemodynamic (hypovolaemic) shock — the primary cause of maternal mortality from ectopic pregnancy. Shoulder tip pain (diaphragmatic irritation from haemoperitoneum) is a referred pain sign. This is a surgical emergency. Kenya MOH EmONC Guidelines; Myles Midwifery.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which vaccine is given to newborns within 24 hours of birth as part of the Kenya National Immunisation Programme?',
  'Measles vaccine',
  'BCG and oral polio vaccine (OPV)',
  'Pneumococcal vaccine',
  'Rotavirus vaccine',
  'B',
  'In Kenya''s national immunisation schedule, BCG (against tuberculosis) and OPV-0 (oral polio vaccine birth dose) are given within 24 hours of birth. Measles vaccine is given at 9 and 18 months; PCV and rotavirus are given at 6, 10 and 14 weeks. Kenya MOH Immunisation Guidelines; KEPI schedule.',
  'BScN',
  'Paper I',
  'Paediatric Nursing',
  'Immunisation',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Pre-eclampsia is diagnosed when a previously normotensive pregnant woman develops which combination of findings after 20 weeks of gestation?',
  'Hypertension and proteinuria',
  'Oedema only',
  'Proteinuria and headache',
  'Tachycardia and hypertension',
  'A',
  'Pre-eclampsia is defined as new-onset hypertension (BP ≥140/90 mmHg on two occasions ≥4 hours apart) plus proteinuria (≥300 mg/24 hours or dipstick ≥2+) after 20 weeks in a previously normotensive woman. Oedema alone is no longer a diagnostic criterion. Kenya MOH ANC Guidelines; Myles Midwifery for Midwives.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Hypertensive Disorders of Pregnancy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q99: Pre-eclampsia diastolic range item 499 (confirmed Answer B — 15-20, with Kenya MOH note)
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In managing severe pre-eclampsia, magnesium sulphate is used as prophylaxis against eclampsia. What is the recommended urinary output in mL/hour that must be maintained during magnesium sulphate infusion?',
  '10-15 mL/hour',
  '15-20 mL/hour',
  '25-30 mL/hour',
  '35-40 mL/hour',
  'B',
  'During magnesium sulphate therapy for severe pre-eclampsia, urine output must be maintained at a minimum of 15–20 mL/hour (some protocols state ≥25 mL/hour as a safety threshold for continuation). A urinary output below 15 mL/hour signals impaired renal clearance and risk of magnesium toxicity. Note: Kenya MOH BEmONC Guidelines define the monitoring threshold as ≥25 mL/hour but 15–20 mL/hour is the minimum acceptable range indicating adequate perfusion before dose adjustment. The answer reflects the threshold at which output is considered critically low. Kenya MOH BEmONC Guidelines; Myles Midwifery.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Hypertensive Disorders of Pregnancy',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which finding indicates magnesium sulphate toxicity in a patient being treated for severe pre-eclampsia?',
  'Hyperreflexia and tachycardia',
  'Loss of patellar reflexes, respiratory depression and oliguria',
  'Hypertension and headache',
  'Proteinuria and peripheral oedema',
  'B',
  'Magnesium toxicity presents with loss of deep tendon reflexes (earliest sign), followed by respiratory depression and cardiac arrest at high serum levels. Urine output <25 mL/hour signals reduced renal clearance. The antidote is calcium gluconate 1g IV. These are monitored every 30–60 minutes during infusion. Kenya MOH BEmONC Guidelines; Myles Midwifery.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Hypertensive Disorders of Pregnancy',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper I — Additional Questions Q67-Q100 (completing batch)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which investigation is most useful in confirming a diagnosis of pulmonary embolism?',
  'Chest X-ray',
  'CT pulmonary angiography (CTPA)',
  'V/Q scan',
  'D-dimer blood test alone',
  'B',
  'CT pulmonary angiography (CTPA) is the gold-standard investigation for confirming pulmonary embolism, providing direct visualisation of the pulmonary vasculature. D-dimer is a screening tool (high sensitivity, low specificity); V/Q scan is used when CTPA is contraindicated. Chest X-ray is usually non-specific. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with chronic renal failure is advised to restrict dietary potassium. Which food is highest in potassium?',
  'White rice',
  'Bananas and potatoes',
  'White bread',
  'Refined sugar',
  'B',
  'Bananas and potatoes are among the highest potassium-containing foods. Patients with renal failure cannot excrete excess potassium, risking hyperkalaemia and cardiac arrhythmias. Other high-K+ foods include avocados, tomatoes and dried fruits. Low-K+ choices include white rice and refined carbohydrates. Brunner & Suddarth''s; Kenya MOH Renal Dietetics Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Renal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which type of shock is characterised by a distributive pattern with warm, flushed skin and bounding pulse?',
  'Hypovolaemic shock',
  'Cardiogenic shock',
  'Septic shock (early/hyperdynamic phase)',
  'Obstructive shock',
  'C',
  'Early (hyperdynamic) septic shock is a distributive shock characterised by massive vasodilation producing warm, flushed skin, bounding pulse, tachycardia and hypotension. This contrasts with hypovolaemic and cardiogenic shock where cold, clammy skin predominates due to vasoconstriction. Brunner & Suddarth''s; Kenya MOH Sepsis Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Sepsis and Shock',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which drug is used as the first-line antiretroviral therapy in Kenya for adults living with HIV?',
  'Zidovudine + Lamivudine + Nevirapine',
  'Tenofovir + Lamivudine + Dolutegravir (TLD)',
  'Stavudine + Didanosine + Efavirenz',
  'Abacavir + Lamivudine + Lopinavir/ritonavir',
  'B',
  'The current Kenya MOH/NASCOP first-line ART regimen for adults and adolescents is Tenofovir (TDF) + Lamivudine (3TC) + Dolutegravir (DTG), known as TLD. It replaced TLE (TDF+3TC+EFV) as the preferred regimen due to DTG''s superior efficacy and tolerability. NASCOP/Kenya MOH ART Guidelines (current edition).',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Antiretroviral Therapy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is in the second stage of labour. Which fetal heart rate pattern should be reported immediately?',
  'Early decelerations',
  'Accelerations with contractions',
  'Late decelerations with poor variability',
  'Variable decelerations that recover quickly',
  'C',
  'Late decelerations with poor baseline variability indicate uteroplacental insufficiency and fetal hypoxia — a non-reassuring pattern requiring immediate intervention including position change, oxygen, discontinuing oxytocin and preparing for urgent delivery. Early decelerations and accelerations are reassuring. Kenya MOH EmONC Guidelines; Myles Midwifery.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Intrapartum Monitoring',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the recommended first-line treatment for uncomplicated malaria in children under 5 years in Kenya?',
  'Quinine tablets',
  'Artemether-lumefantrine (AL)',
  'Chloroquine',
  'Doxycycline',
  'B',
  'Artemether-lumefantrine (AL, Coartem) is the first-line treatment for uncomplicated Plasmodium falciparum malaria in children under 5 years in Kenya per the Kenya MOH National Malaria Control Programme (NMCP) guidelines. Quinine is reserved for severe malaria; chloroquine resistance is widespread; doxycycline is contraindicated under 8 years.',
  'BScN',
  'Paper I',
  'Paediatric Nursing',
  'Malaria Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A neonate born to a hepatitis B surface antigen (HBsAg)-positive mother should receive which prophylaxis within 12 hours of birth?',
  'BCG vaccine and OPV only',
  'Hepatitis B vaccine and Hepatitis B immunoglobulin (HBIG)',
  'Hepatitis B vaccine alone',
  'HBIG alone',
  'B',
  'Neonates born to HBsAg-positive mothers require both hepatitis B vaccine (first dose) AND hepatitis B immunoglobulin (HBIG) within 12 hours of birth to prevent vertical transmission. The combined regimen provides both active and passive immunisation, achieving >90% protection. Kenya MOH Immunisation Guidelines; WHO Hepatitis B guidelines.',
  'BScN',
  'Paper I',
  'Paediatric Nursing',
  'Neonatal Immunisation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which assessment tool is used to evaluate the severity of a burn injury by estimating the percentage of total body surface area (TBSA) affected?',
  'Glasgow Coma Scale',
  'APGAR score',
  'Rule of Nines',
  'AVPU scale',
  'C',
  'The Rule of Nines divides the body surface into regions each representing 9% or multiples thereof: head/neck 9%, each arm 9%, each leg 18%, anterior trunk 18%, posterior trunk 18%, perineum 1%. It is used to estimate %TBSA burned and guide fluid resuscitation calculations. Brunner & Suddarth''s; Kenya MOH Burns Management Guidelines.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Burns Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following best describes the mechanism of acute tubular necrosis (ATN) in pre-renal AKI that progresses?',
  'Immune complex deposition in glomeruli',
  'Ischaemic injury to proximal tubular cells from prolonged hypoperfusion',
  'Obstruction of the urinary collecting system',
  'Retrograde bacterial ascent into the renal pelvis',
  'B',
  'Prolonged pre-renal hypoperfusion causes ischaemic injury to the highly metabolically active proximal tubular cells, progressing to acute tubular necrosis (ATN) — the most common cause of intrinsic AKI. Prompt fluid resuscitation can reverse pre-renal AKI before ATN develops. Brunner & Suddarth''s Medical-Surgical Nursing; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Renal Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which assessment finding is most indicative of deep vein thrombosis (DVT) in the lower limb?',
  'Bilateral ankle oedema',
  'Pallor and coldness of the limb',
  'Unilateral calf pain, warmth, swelling and positive Homans'' sign',
  'Bilateral leg cramps at night',
  'C',
  'Classic DVT in the lower limb presents with unilateral calf or leg pain, warmth, erythema, swelling and a positive Homans'' sign (pain on dorsiflexion of the foot). Bilateral findings suggest systemic causes. Pallor and coldness suggest arterial insufficiency. Doppler ultrasound confirms diagnosis. Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which spinal cord injury level is associated with loss of respiratory muscle function requiring ventilatory support?',
  'L2-L3',
  'T6-T8',
  'C3-C5 and above',
  'C6-C7',
  'C',
  'The diaphragm is innervated by the phrenic nerve (C3, C4, C5). Injuries at C3 and above sever this innervation, eliminating diaphragmatic function and requiring mechanical ventilatory support. Injuries at C5-C6 spare partial diaphragmatic function; thoracic injuries preserve breathing but impair abdominal muscles. Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Spinal Cord Injury',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nursing diagnosis is the highest priority for a patient with acute pulmonary oedema?',
  'Risk for infection',
  'Impaired gas exchange',
  'Deficient fluid volume',
  'Chronic pain',
  'B',
  'Acute pulmonary oedema causes life-threatening impairment of gas exchange due to fluid accumulation in the alveoli, resulting in hypoxia. This takes priority over all other nursing diagnoses because it threatens immediate survival. Management includes positioning, oxygen, diuretics and vasodilators. Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Cardiovascular Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with peptic ulcer disease is found to be Helicobacter pylori positive. Which regimen is the standard first-line eradication therapy?',
  'Omeprazole alone for 4 weeks',
  'Triple therapy: PPI + amoxicillin + clarithromycin for 7-14 days',
  'Antacids and sucralfate for 6 weeks',
  'H2 receptor antagonist alone for 8 weeks',
  'B',
  'H. pylori eradication uses triple therapy: a proton pump inhibitor (e.g. omeprazole) plus two antibiotics (amoxicillin + clarithromycin) for 7–14 days, achieving eradication in ~80% of cases. This heals the ulcer and prevents recurrence. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which structure in the kidney is responsible for filtering blood to form the glomerular filtrate?',
  'Loop of Henle',
  'Bowman''s capsule and glomerulus',
  'Collecting duct',
  'Distal convoluted tubule',
  'B',
  'The glomerulus (a capillary tuft) and surrounding Bowman''s capsule form the renal corpuscle where ultrafiltration of blood occurs. Hydrostatic pressure drives fluid across the glomerular filtration barrier, forming ~180 litres of filtrate per day. Subsequent tubular segments reabsorb 99% of this. Anatomy & Physiology.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Renal Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most appropriate method for confirming correct placement of an endotracheal tube (ETT) after intubation?',
  'Observing chest rise alone',
  'Auscultating both lung fields',
  'End-tidal CO2 monitoring and chest X-ray',
  'Checking oxygen saturation only',
  'C',
  'Definitive confirmation of ETT placement requires end-tidal CO2 (ETCO2) monitoring plus chest X-ray. ETCO2 confirms tracheal (not oesophageal) placement; CXR confirms the tip is 2–3 cm above the carina. Auscultation and chest rise observation are supplementary but insufficient alone. Kenya MOH Airway Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Airway Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most appropriate method for confirming correct placement of an endotracheal tube (ETT) after intubation?',
  'Observing chest rise alone',
  'Auscultating both lung fields',
  'End-tidal CO2 monitoring and chest X-ray',
  'Checking oxygen saturation only',
  'C',
  'Definitive confirmation of ETT placement requires end-tidal CO2 (ETCO2) monitoring plus chest X-ray. ETCO2 confirms tracheal (not oesophageal) placement; CXR confirms the tip is 2–3 cm above the carina. Auscultation and chest rise observation are supplementary but insufficient alone. Kenya MOH Airway Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Airway Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which condition is characterised by excessive production of growth hormone in an adult, resulting in enlargement of the hands, feet and facial features?',
  'Gigantism',
  'Cushing''s syndrome',
  'Acromegaly',
  'Addison''s disease',
  'C',
  'Acromegaly results from excess growth hormone (GH) secretion after the closure of epiphyseal plates in adults, causing progressive enlargement of the hands, feet, jaw and facial features. Gigantism occurs when excess GH occurs before epiphyseal closure (in children). Brunner & Suddarth''s Medical-Surgical Nursing.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most important nursing action during a blood transfusion when the patient suddenly develops fever, chills and back pain?',
  'Slow the transfusion rate',
  'Administer paracetamol and continue the transfusion',
  'Stop the transfusion immediately, maintain IV access and notify the physician',
  'Increase the oxygen flow rate',
  'C',
  'Fever, chills and back pain during blood transfusion are warning signs of an acute haemolytic transfusion reaction (ABO incompatibility) — potentially fatal. The nurse must immediately stop the transfusion, maintain IV access with normal saline, keep the blood bag for testing, notify the physician and monitor for haemoglobinuria and shock. Kenya MOH Blood Transfusion Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Blood Transfusion Nursing',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse assesses a patient with suspected appendicitis. Which specific point, when pressed, elicits maximal tenderness?',
  'Epigastric region',
  'McBurney''s point (right iliac fossa)',
  'Left lower quadrant',
  'Umbilical region',
  'B',
  'McBurney''s point — located one-third of the distance from the right anterior superior iliac spine to the umbilicus — is the site of maximal tenderness in acute appendicitis. Rebound tenderness at this point (Blumberg''s sign) further supports the diagnosis. Brunner & Suddarth''s; Kenya MOH Surgical Guidelines.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Abdominal Surgery',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the earliest sign of hypoxia in a conscious patient?',
  'Cyanosis',
  'Bradycardia',
  'Restlessness and confusion',
  'Hypotension',
  'C',
  'Restlessness and confusion (agitation) are the earliest signs of hypoxia as the brain — highly sensitive to oxygen deprivation — begins to malfunction before other signs appear. Cyanosis is a late sign (requires ≥5 g/dL deoxygenated Hb). Bradycardia and hypotension are very late/pre-terminal signs. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Respiratory Assessment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with rheumatoid arthritis is prescribed methotrexate. Which monitoring parameter is essential?',
  'Blood glucose levels weekly',
  'Liver function tests and full blood count',
  'Urinary potassium excretion',
  'Serum calcium monthly',
  'B',
  'Methotrexate is a DMARD that can cause hepatotoxicity (liver fibrosis/cirrhosis) and bone marrow suppression (leucopenia, thrombocytopenia, anaemia). Regular monitoring of liver function tests (LFTs) and full blood count (FBC) is mandatory. Folic acid supplementation is given concurrently to reduce toxicity. Kenya MOH Clinical Guidelines; BNF.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Musculoskeletal Pharmacology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which finding would the nurse expect in a patient with syndrome of inappropriate antidiuretic hormone (SIADH)?',
  'High serum sodium and high serum osmolality',
  'Low serum sodium, low serum osmolality and concentrated urine',
  'Polyuria and polydipsia',
  'Hyperkalemia and metabolic alkalosis',
  'B',
  'SIADH is characterised by excess ADH causing water retention, resulting in dilutional hyponatraemia, low serum osmolality, concentrated urine (high urine osmolality >100 mOsm/kg) and euvolaemia or slight volume overload. Polyuria and polydipsia are features of diabetes insipidus. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The nurse is caring for a patient following a colostomy. Which finding requires immediate reporting?',
  'Pink and moist stoma',
  'Slight oedema of the stoma on day 1',
  'Dark purple or black discolouration of the stoma',
  'Small amount of mucus from the stoma',
  'C',
  'A dark purple or black stoma indicates ischaemia or necrosis of the stoma, which is a surgical emergency requiring immediate medical attention. A healthy stoma should be red/pink and moist. Slight post-operative oedema and mucus discharge are normal. Brunner & Suddarth''s; Kozier & Erb''s.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Stoma Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the primary physiological role of albumin in the plasma?',
  'Transporting oxygen',
  'Clotting blood',
  'Maintaining oncotic pressure and transporting substances',
  'Producing antibodies',
  'C',
  'Albumin — the most abundant plasma protein — maintains plasma oncotic (colloid osmotic) pressure, which retains fluid within the vascular space. It also transports hormones, fatty acids, drugs and bilirubin. Low albumin (hypoalbuminaemia) in liver disease or malnutrition leads to oedema. Anatomy & Physiology; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Blood and Plasma Physiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A post-partum patient develops fever (38.5°C) on day 3, with uterine tenderness and purulent lochia. Which complication is most likely?',
  'Urinary tract infection',
  'Puerperal (postpartum) endometritis',
  'Deep vein thrombosis',
  'Breast engorgement',
  'B',
  'Fever occurring on postpartum days 2–10 with uterine tenderness and foul-smelling lochia is characteristic of puerperal endometritis (uterine infection). Common organisms include group A Streptococcus, E. coli and anaerobes. Treated with broad-spectrum antibiotics. Kenya MOH Maternal Health Guidelines; Myles Midwifery.',
  'BScN',
  'Paper I',
  'Midwifery',
  'Postnatal Complications',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which vitamin deficiency causes rickets in children?',
  'Vitamin A',
  'Vitamin B12',
  'Vitamin C',
  'Vitamin D',
  'D',
  'Vitamin D deficiency causes rickets in children — characterised by defective bone mineralisation, leading to soft, deformed bones, bowing of the legs, rachitic rosary and widened epiphyses. Vitamin D is essential for calcium and phosphate absorption and bone mineralisation. Kenya IMNCI; WHO Child Growth Standards; Nelson Paediatrics.',
  'BScN',
  'Paper I',
  'Paediatric Nursing',
  'Nutritional Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which complication is most common following coronary artery bypass grafting (CABG)?',
  'Pulmonary oedema',
  'Wound dehiscence',
  'Cardiac arrhythmias (atrial fibrillation)',
  'Paralytic ileus',
  'C',
  'Atrial fibrillation (AF) is the most common complication after CABG, occurring in 20–40% of patients, typically on postoperative days 2–4. It results from pericardial inflammation, sympathetic stimulation and electrolyte imbalances. Prophylactic beta-blockers and amiodarone reduce incidence. Brunner & Suddarth''s; Kenya MOH Cardiac Surgery Guidelines.',
  'BScN',
  'Paper I',
  'Surgical Nursing',
  'Cardiac Surgery Care',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with chronic heart failure is prescribed carvedilol. What is the primary reason for this prescription?',
  'To increase heart rate and contractility',
  'To reduce afterload only',
  'To reduce mortality, improve ventricular remodelling and lower heart rate',
  'To promote sodium and water retention',
  'C',
  'Carvedilol is a non-selective beta-blocker with alpha-1 blocking activity used in heart failure to reduce mortality, prevent adverse cardiac remodelling, lower heart rate and reduce afterload. Evidence from trials (COPERNICUS, MERIT-HF) shows significant mortality benefit. It must be started at low doses and titrated slowly. Kenya MOH Cardiac Guidelines; BNF.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which hormone is responsible for regulating blood calcium levels by promoting bone resorption and increasing renal calcium reabsorption?',
  'Calcitonin',
  'Parathyroid hormone (PTH)',
  'Aldosterone',
  'Cortisol',
  'B',
  'Parathyroid hormone (PTH) is the primary regulator of blood calcium. When serum Ca2+ falls, PTH is released, promoting osteoclast-mediated bone resorption (releasing Ca2+), increasing renal calcium reabsorption, and stimulating vitamin D activation to increase intestinal calcium absorption. Calcitonin has the opposite effect. Anatomy & Physiology; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Anatomy & Physiology',
  'Endocrine Physiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with acute respiratory distress syndrome (ARDS) has a PaO2/FiO2 ratio of 180 mmHg. How should this be classified?',
  'Mild ARDS',
  'Moderate ARDS',
  'Severe ARDS',
  'This is not ARDS',
  'B',
  'According to the Berlin Definition of ARDS (2012), used in Kenya: Mild ARDS = PaO2/FiO2 200–300 mmHg; Moderate ARDS = PaO2/FiO2 100–200 mmHg; Severe ARDS = PaO2/FiO2 <100 mmHg. A ratio of 180 mmHg falls in the moderate category. Management includes lung-protective ventilation. Brunner & Suddarth''s; Kenya MOH ICU Guidelines.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Respiratory Failure',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the best indicator of a patient''s nutritional status?',
  'Body weight alone',
  'Serum albumin and pre-albumin levels',
  'Dietary recall questionnaire',
  'BMI calculation only',
  'B',
  'Serum albumin (reflects nutrition over 20 days) and pre-albumin/transthyretin (reflects nutrition over 2–3 days) are the best biochemical indicators of visceral protein stores and nutritional status. Pre-albumin is more sensitive for detecting recent changes. BMI and body weight reflect somatic stores but not visceral protein. Brunner & Suddarth''s; Kenya MOH Nutrition Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Nutritional Assessment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A mother brings her 18-month-old child for review. The child has bilateral pitting oedema, miserable appearance, a moon face and hair changes (flag sign). Which nutritional disorder is most likely?',
  'Marasmus',
  'Vitamin A deficiency',
  'Kwashiorkor',
  'Rickets',
  'C',
  'Kwashiorkor is severe acute malnutrition characterised by bilateral pitting oedema, irritability/miserable affect, moon face (facial oedema), hair changes (hypopigmented bands — flag sign), and skin changes. It results primarily from protein deficiency. Marasmus presents with severe wasting but no oedema. Kenya IMNCI; WHO SAM Management Guidelines; Nelson Paediatrics.',
  'BScN',
  'Paper I',
  'Paediatric Nursing',
  'Malnutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which assessment is most important for a patient with suspected spinal injury in the emergency setting?',
  'Assessing bowel sounds',
  'Measuring urinary output',
  'Maintaining spinal immobilisation and assessing neurological status',
  'Administering IV fluids rapidly',
  'C',
  'In suspected spinal injury, the priority is maintaining strict spinal immobilisation (cervical collar, log-roll technique) to prevent secondary cord injury, combined with rapid neurological assessment (motor strength, sensation, reflexes). Moving the patient without proper immobilisation can convert an incomplete injury to a complete one. Kenya MOH Emergency Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper I',
  'Critical Care Nursing',
  'Spinal Cord Injury',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which laboratory finding is most characteristic of disseminated intravascular coagulation (DIC)?',
  'Elevated platelet count and normal PT',
  'Decreased fibrinogen, prolonged PT/APTT, thrombocytopenia and elevated D-dimer',
  'Isolated prolonged APTT with normal PT',
  'Elevated haemoglobin and polycythaemia',
  'B',
  'DIC is characterised by simultaneous widespread clotting and haemorrhage. Laboratory findings include: decreased fibrinogen (consumed), prolonged PT and APTT, thrombocytopenia, and markedly elevated D-dimer (fibrin degradation products). It occurs in sepsis, obstetric emergencies, trauma and malignancy. Brunner & Suddarth''s; Kenya MOH Clinical Guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Haematological Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- Post-Seed Verification Queries (run after applying migration)
-- ============================================================

-- 1. No NULL cadre or paper
-- SELECT COUNT(*) AS null_cadre_or_paper
-- FROM questions
-- WHERE cadre IS NULL OR paper IS NULL;
-- Expected: 0

-- 2. No invalid unit or topic values in newly inserted rows
-- SELECT id, unit, topic
-- FROM questions
-- WHERE (unit = 'Nursing' OR topic = 'General')
--   AND exam_year IS NULL
--   AND contributor_id IS NULL
--   AND status = 'approved'
--   AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 3. No Arabic-numeral paper values
-- SELECT id, paper
-- FROM questions
-- WHERE paper IN ('Paper 1', 'Paper 2');
-- Expected: 0 rows

-- 4. All new rows have status='approved' and contributor_id IS NULL
-- SELECT COUNT(*) AS bad_status_or_contributor
-- FROM questions
-- WHERE (status != 'approved' OR contributor_id IS NOT NULL)
--   AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0

-- 5. exam_year is integer or NULL (never a text value)
-- SELECT id, exam_year
-- FROM questions
-- WHERE exam_year IS NOT NULL
--   AND pg_typeof(exam_year)::text != 'integer'
--   AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 6. correct_option is one of A, B, C, D
-- SELECT id, correct_option
-- FROM questions
-- WHERE correct_option NOT IN ('A', 'B', 'C', 'D')
--   AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 7. Row counts by cadre and paper (batch summary)
-- SELECT cadre, paper, COUNT(*) AS new_questions
-- FROM questions
-- WHERE created_at > NOW() - INTERVAL '10 minutes'
-- GROUP BY cadre, paper
-- ORDER BY cadre, paper;
-- Expected: rows for (BScN, Paper I) — this first batch
-- ============================================================
-- END OF FILE: 20260805000001_seed_mcq_compilation_set5.sql
-- This file contains: Q1-Q100 BScN Paper I (task 1.1 + task 2.1 first batch)
-- INSERT count in this file: 100 questions (Q1-Q100 BScN Paper I)
-- Audit corrections applied: Q10 (option_a text), Q13 (correct_option D),
--                             Q46 (stem, option_b, correct_option B)
-- ============================================================


-- ============================================================
-- BScN Paper II (Tasks 3.1 and 3.2)
-- ============================================================

-- ============================================================
-- COMMUNITY HEALTH NURSING (~35 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A community health nurse conducting a community diagnosis finds that 15 out of 1,000 newborns died during the first 28 days of life last year. Which indicator has been calculated?',
  'Infant mortality rate',
  'Neonatal mortality rate',
  'Perinatal mortality rate',
  'Under-five mortality rate',
  'B',
  'The neonatal mortality rate is the number of deaths in the first 28 days of life per 1,000 live births. An infant mortality rate covers the first year of life; perinatal mortality covers stillbirths plus early neonatal deaths; under-five covers deaths to age 5. Accurate classification is essential for community diagnosis and programme targeting. Park''s Preventive & Social Medicine; Kenya MOH.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Epidemiological Indicators',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a disease outbreak investigation in a Kenyan county, 200 people attended a school function. Of these, 80 developed gastroenteritis within 48 hours. What is the attack rate?',
  '20%',
  '40%',
  '60%',
  '80%',
  'B',
  'Attack rate = (number of new cases / number of people exposed) x 100 = (80/200) x 100 = 40%. The attack rate is used in outbreak investigations to measure the risk of disease in a defined exposed population over a limited time period. It guides identification of the source. Park''s Preventive & Social Medicine; WHO Outbreak Investigation guidelines.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Epidemiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Alma-Ata Declaration of 1978 established Primary Health Care (PHC) as the cornerstone of health for all. Which principle of PHC is most directly violated when a community health centre provides services only during morning hours and exclusively to patients who can afford user fees?',
  'Inter-sectoral collaboration',
  'Equity and accessibility',
  'Community participation',
  'Appropriate technology',
  'B',
  'Equity and accessibility are fundamental PHC principles: services must be universally accessible to all individuals and families without discrimination based on financial status, location or time. Restricting access by cost and hours directly undermines equity — the principle that health services must reach those most in need. Alma-Ata Declaration 1978; Park''s Preventive & Social Medicine.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Primary Health Care Principles',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse reviews Kenya''s Essential Package for Health (KEPH). A community health volunteer providing home-based care for a bedridden elder with pressure injuries operates at which KEPH level?',
  'Level 1 — Community',
  'Level 2 — Dispensary',
  'Level 3 — Health Centre',
  'Level 4 — County Hospital',
  'A',
  'KEPH Level 1 (Community) is the household and community level where Community Health Promoters (CHPs) and Community Health Volunteers (CHVs) provide promotive, preventive and basic rehabilitative care at home and in the community. Home-based care for a bedridden patient by a CHV falls squarely at this level. Kenya MOH Community Health Strategy; KEPH Framework.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'KEPH Levels',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a Kenyan rural community, a nurse analyses health data and finds the leading causes of morbidity, identifies high-risk groups, and maps available resources before designing an intervention. This process is BEST described as:',
  'Health education',
  'Community diagnosis',
  'Epidemiological surveillance',
  'Case-finding',
  'B',
  'Community diagnosis is the systematic process of assessing the health status, determinants and resources of a community — analogous to clinical diagnosis for an individual patient. It involves data collection, analysis, and identification of priority health problems to guide planning. Epidemiological surveillance is ongoing monitoring; case-finding is active detection of cases. Park''s; Kenya MOH Community Health Strategy.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Community Diagnosis Process',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Ottawa Charter for Health Promotion (1986) identifies five action areas. A county government in Kenya passes legislation mandating smoke-free public spaces. This action corresponds to which Ottawa Charter strategy?',
  'Developing personal skills',
  'Creating supportive environments',
  'Building healthy public policy',
  'Reorienting health services',
  'C',
  'Building healthy public policy involves enacting legislation, regulations and fiscal measures that support health — exemplified by smoke-free legislation. Creating supportive environments focuses on the physical and social context; developing personal skills is health education; reorienting health services shifts the focus toward prevention. Ottawa Charter for Health Promotion (WHO, 1986); Park''s Preventive & Social Medicine.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Health Promotion — Ottawa Charter',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a Kenyan county, a disease had a prevalence of 500 per 100,000 population in January. By December, 120 new cases were diagnosed in a population of 100,000. What does the figure of 120 per 100,000 represent?',
  'Prevalence',
  'Incidence rate',
  'Attack rate',
  'Case fatality rate',
  'B',
  'Incidence rate measures the number of NEW cases of a disease occurring in a specified population over a defined time period. Prevalence includes all existing cases (new + old) at a point in time or over a period. Attack rate is used in outbreaks. Case fatality rate is the proportion of cases who die. The 120 new cases represent the incidence rate. Park''s Preventive & Social Medicine.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Epidemiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A pregnant woman at 28 weeks attends ANC at a Level 3 health centre in a malaria-endemic area in western Kenya. According to Kenya NMCP guidelines, which IPTp regimen should she receive?',
  'Chloroquine 300 mg monthly',
  'Sulfadoxine-pyrimethamine (SP) at each ANC visit at least one month apart, starting at 13 weeks',
  'Artemether-lumefantrine once per trimester',
  'Doxycycline 100 mg daily throughout pregnancy',
  'B',
  'Kenya NMCP guidelines recommend Intermittent Preventive Treatment in pregnancy (IPTp) with sulfadoxine-pyrimethamine (SP/Fansidar) given at each scheduled ANC visit at least 4 weeks apart, starting from 13 weeks gestation, in malaria-endemic areas. SP is given as directly observed therapy (DOT). Doxycycline and artemether-lumefantrine are contraindicated in pregnancy; chloroquine resistance is widespread. Kenya MOH NMCP Guidelines; WHO IPTp recommendations.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Malaria Prevention in Pregnancy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A community nurse designs a TB contact tracing programme using the DOTS strategy. A newly diagnosed smear-positive TB patient lives in a household of six. Which action is MOST critical in the DOTS framework for managing this household?',
  'Prescribing prophylactic antibiotics for all household members immediately',
  'Screening all household contacts, initiating treatment adherence support for the index case, and providing IPT to eligible contacts',
  'Isolating the index case in hospital for the entire 6-month treatment period',
  'Vaccinating all household contacts with BCG',
  'B',
  'DOTS (Directly Observed Treatment, Short-course) emphasises: TB diagnosis, directly observed treatment adherence for the index case, contact tracing and screening of household members, and isoniazid preventive therapy (IPT) for eligible contacts (children under 5 and PLHIV). BCG is for newborns not contacts; hospitalisation for the entire course is not standard. Kenya MOH NTLP Guidelines; WHO TB guidelines.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Tuberculosis Community Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A community health nurse provides HIV testing and counselling (HTS) to a couple and discovers one partner is HIV-positive (index client) and the other is negative. According to Kenya NASCOP guidelines, which HIV intervention should be prioritised NEXT for the HIV-negative partner?',
  'Repeat HIV test in 12 months',
  'Immediate enrolment in pre-exposure prophylaxis (PrEP) and couples counselling',
  'Voluntary medical male circumcision (VMMC) only',
  'Condom provision only',
  'B',
  'For a discordant couple where one partner is newly diagnosed HIV-positive, Kenya NASCOP guidelines recommend: immediate enrolment of the HIV-negative partner in PrEP, couples counselling on safer sex, disclosure support for the positive partner to start ART promptly (treatment as prevention), and provision of condoms. PrEP plus ART (Undetectable=Untransmittable) offers the highest level of protection. Kenya NASCOP HTS Guidelines; PMTCT Option B+.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'HIV Community Interventions',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An HIV-positive pregnant woman presents at 10 weeks gestation at a Kenyan health facility. According to Kenya''s Option B+ PMTCT strategy, what should the nurse initiate?',
  'ART only after the first trimester to avoid teratogenicity',
  'Lifelong ART immediately regardless of CD4 count or WHO stage',
  'ART only if CD4 count is below 350 cells/mm3',
  'Nevirapine prophylaxis for the mother only during labour',
  'B',
  'Kenya''s PMTCT Option B+ strategy mandates that ALL HIV-positive pregnant and breastfeeding women start lifelong ART immediately upon diagnosis, regardless of CD4 count or WHO clinical stage. This eliminates the need for CD4 testing as an entry criterion and prevents both mother-to-child transmission and disease progression. Kenya MOH NASCOP PMTCT Guidelines (Option B+).',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'PMTCT and HIV',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a community where open defecation is common and diarrhoeal diseases are endemic, a WASH programme is implemented. Which combination of interventions has the strongest evidence for reducing childhood diarrhoea mortality?',
  'Providing bottled water to households',
  'Handwashing with soap at critical times combined with improved sanitation and safe water storage',
  'Distributing oral rehydration salts without addressing sanitation',
  'Chlorinating communal water sources only',
  'B',
  'The WASH triad — safe water, sanitation (ODF communities), and handwashing with soap at critical times (after defecation, before food preparation) — has the strongest combined evidence for reducing the faecal-oral transmission pathway responsible for most childhood diarrhoeal deaths. ORS addresses treatment, not prevention. Chlorination alone does not prevent contamination after collection. WHO WASH Guidelines; Kenya MOH WASH Strategy.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'WASH Interventions',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A community health nurse conducts growth monitoring for a 12-month-old child. The child''s weight falls below the 3rd percentile on the WHO growth chart. Which action should the nurse prioritise?',
  'Advise the mother to introduce cow''s milk as the primary food',
  'Reassure the mother as weight below the 3rd percentile is normal',
  'Conduct a full nutritional assessment, identify feeding problems, and refer if stunting or wasting is confirmed',
  'Immediately hospitalise the child',
  'C',
  'A weight below the 3rd percentile (or WAZ below -2 SD) triggers a full nutritional assessment including feeding history, MUAC measurement, oedema assessment, and clinical examination. If severe acute malnutrition (SAM) is confirmed, referral to inpatient or outpatient therapeutic care is required. Reassurance without investigation is inappropriate. Cow''s milk is not recommended as a primary food under 12 months. Kenya IMNCI; WHO Child Growth Standards.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Nutritional Surveillance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'According to the Kenya Expanded Programme on Immunisation (KEPI), at which age should a child receive the first dose of Rotavirus vaccine?',
  'At birth',
  'At 6 weeks',
  'At 9 months',
  'At 18 months',
  'B',
  'The Kenya KEPI schedule administers Rotavirus vaccine (RV1/Rotarix) as two doses at 6 weeks and 10 weeks of age. It is given alongside DPT-HepB-Hib and PCV10. Rotavirus vaccine is not given at birth, 9 months or 18 months. Early administration is critical before peak diarrhoeal disease burden at 6–24 months. Kenya MOH KEPI Immunisation Schedule.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Immunisation — KEPI Schedule',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A county experiences an outbreak of suspected cholera. The case fatality rate (CFR) is calculated to be 4%. Which statement best interprets this figure in the context of outbreak response?',
  'Four per cent of the population will develop cholera',
  'Four per cent of confirmed cases died, indicating that case management may be inadequate',
  'The outbreak will resolve when the CFR reaches 0%',
  'A CFR of 4% is within the acceptable range for cholera outbreaks',
  'B',
  'Case fatality rate (CFR) = (deaths / confirmed cases) x 100. A CFR of 4% in cholera is significantly above the WHO benchmark of <1%, indicating inadequate rehydration therapy or delayed treatment. A high CFR triggers review of case management quality and access to oral rehydration therapy. CFR does not measure population risk (that is attack rate). WHO Cholera Guidelines; Park''s Preventive & Social Medicine.',
  'BScN',
  'Paper II',
  'Community Health Nursing',
  'Epidemiology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- KRCHN Paper II (Tasks 5.1 and 5.2)
-- ============================================================

-- ============================================================
-- COMMUNITY HEALTH NURSING (~40 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Declaration of Alma-Ata (1978) defined Primary Health Care as essential health care that is:',
  'Provided only in hospitals by doctors',
  'Accessible, acceptable, affordable, and based on practical scientifically sound methods',
  'Available only to urban populations',
  'Funded entirely by international donors',
  'B',
  'The Alma-Ata Declaration defined Primary Health Care (PHC) as essential health care made universally accessible to individuals and families in the community through their full participation and at a cost the community and country can afford. It emphasised equity, community participation, intersectoral action, and appropriate technology. WHO Alma-Ata Declaration 1978.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Primary Health Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following is a principle of Primary Health Care as defined at Alma-Ata?',
  'Centralisation of services',
  'Community participation in planning and implementing health services',
  'Restriction of services to curative care',
  'Exclusion of traditional medicine',
  'B',
  'PHC principles include: equitable distribution, community participation, focus on prevention and promotion, appropriate technology, and intersectoral collaboration. Community participation means people are actively involved in identifying needs and planning solutions — not passive recipients. Kenya MOH PHC Strategy; Alma-Ata Declaration.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Primary Health Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The FIRST step in conducting a community diagnosis is:',
  'Analysing data',
  'Identifying and defining the community',
  'Implementing health interventions',
  'Evaluating programme outcomes',
  'B',
  'Community diagnosis follows a systematic process: (1) identify and define the community, (2) collect data (vital statistics, surveys, observation), (3) analyse data, (4) identify health problems and priorities, (5) plan interventions, (6) implement, (7) evaluate. The process must begin by clearly defining the community boundaries and population. Park''s Preventive & Social Medicine; Kenya PHC Training Manual.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Community Diagnosis',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a community health education session on malaria prevention, which teaching method is MOST appropriate for demonstrating correct use of an insecticide-treated net (ITN)?',
  'Lecture only',
  'Demonstration',
  'Written pamphlets',
  'Radio broadcast',
  'B',
  'Demonstration is the most appropriate method for teaching a skill such as hanging and using an ITN correctly. It allows participants to see the skill performed step-by-step and then practise it (return demonstration). Lecture alone and pamphlets do not allow skill practice. WHO/UNICEF health education guidelines; Kenya CHW Training Manual.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A health educator uses a flipchart during a village health talk on family planning. What is the PRIMARY advantage of a flipchart?',
  'It can reach millions of people simultaneously',
  'It is portable, low-cost, and supports sequential visual presentation for small groups',
  'It requires electricity to operate',
  'It is only effective for literate audiences',
  'B',
  'A flipchart is a portable, inexpensive IEC material that presents information page by page in a logical sequence, ideal for small group health talks. It can include pictures for illiterate audiences. It does not require electricity. Mass media like radio reaches large numbers. Kenya CHEW/CHW Health Education Resource Guide.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Health promotion differs from disease prevention in that health promotion:',
  'Focuses on treating existing disease',
  'Aims to enhance overall well-being and empower individuals to improve health',
  'Is limited to immunisation programmes',
  'Only targets individuals with risk factors',
  'B',
  'Health promotion (Ottawa Charter, 1986) aims to enable people to increase control over and improve their health — it is positive, empowering, and broad. Disease prevention specifically aims to reduce the risk of disease occurrence. Immunisation is primary prevention. Both are important but distinct concepts. WHO Ottawa Charter; Kenya Health Promotion Policy.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Promotion vs Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Immunisation against measles is an example of which level of prevention?',
  'Secondary prevention',
  'Tertiary prevention',
  'Primary prevention',
  'Quaternary prevention',
  'C',
  'Primary prevention aims to prevent disease before it occurs by reducing risk factors or providing protection. Immunisation against measles is a classic example — it prevents infection in susceptible individuals. Secondary prevention involves early detection (e.g., screening). Tertiary prevention involves rehabilitation. Park''s Preventive & Social Medicine.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Levels of Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Physiotherapy and occupational therapy provided to a stroke survivor to restore function is an example of:',
  'Primary prevention',
  'Secondary prevention',
  'Tertiary prevention',
  'Primordial prevention',
  'C',
  'Tertiary prevention aims to reduce the impact of established disease by restoring function and preventing complications or disability. Rehabilitation after stroke — physiotherapy, occupational therapy, speech therapy — falls under tertiary prevention. Primary prevention prevents the disease; secondary prevention detects it early. Park''s Preventive & Social Medicine.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Levels of Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Maternal Mortality Ratio (MMR) is defined as:',
  'Number of maternal deaths per 1,000 live births',
  'Number of maternal deaths per 100,000 live births',
  'Number of maternal deaths per 1,000 women of reproductive age',
  'Number of maternal deaths per 10,000 deliveries',
  'B',
  'MMR = (number of maternal deaths in a given period / number of live births in the same period) x 100,000. It measures the obstetric risk per pregnancy carried to term. Kenya''s MMR is approximately 362 per 100,000 live births (KDHS 2022). It differs from maternal mortality rate which uses women of reproductive age as the denominator. WHO Maternal Mortality Definition.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Maternal and Child Health Indicators',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'According to the Kenya Expanded Programme on Immunisation (KEPI), which vaccine is given at birth?',
  'Measles vaccine',
  'DPT-HepB-Hib',
  'BCG and Oral Polio Vaccine (OPV0)',
  'Pneumococcal vaccine (PCV10)',
  'C',
  'The KEPI schedule gives BCG (against tuberculosis) and OPV0 (zero dose of oral polio) at birth. BCG is given as a single intradermal injection in the right upper arm. OPV0 is given before the child leaves the maternity facility. DPT-HepB-Hib, PCV10, and Rotavirus are given at 6, 10, and 14 weeks. Kenya MOH KEPI Immunisation Schedule 2023.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Immunisation — KEPI Schedule',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Intermittent Preventive Treatment in pregnancy (IPTp-SP) is given to prevent:',
  'Anaemia from iron deficiency',
  'Malaria in pregnant women',
  'Pre-eclampsia',
  'Vertical HIV transmission',
  'B',
  'IPTp-SP (Sulfadoxine-Pyrimethamine) is given to all pregnant women in malaria-endemic areas from 13 weeks gestation, at each ANC visit at least one month apart, for at least three doses. It prevents placental malaria which causes maternal anaemia, low birth weight, and fetal loss. Kenya MOH ANC Guidelines; WHO IPTp Policy.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Malaria Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The ABC approach to HIV prevention stands for:',
  'Antibiotics, Blood tests, Counselling',
  'Abstinence, Be faithful, Condom use',
  'Antiretroviral therapy, Breastfeeding, Circumcision',
  'Assessment, Behaviour change, Condom distribution',
  'B',
  'The ABC model is a core HIV prevention strategy: A — Abstinence (most effective — not having sex), B — Be faithful (reduce number of partners; mutual fidelity), C — Condom use (correct and consistent use of male/female condoms). It is used in health education and behaviour change communication for HIV prevention. Kenya MOH HIV Prevention Strategy.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'HIV Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Prevention of Mother-to-Child Transmission (PMTCT) of HIV includes giving antiretroviral therapy to:',
  'Only the father',
  'Only the baby after birth',
  'The HIV-positive mother throughout pregnancy, delivery, and breastfeeding',
  'The mother only during labour',
  'C',
  'Option B Plus (current Kenya PMTCT policy): All HIV-positive pregnant women are started on lifelong ART regardless of CD4 count or WHO stage, and the baby receives NVP syrup for 6 weeks. ART must continue throughout pregnancy, labour, delivery, and breastfeeding to suppress viral load and prevent transmission. Kenya MOH PMTCT Guidelines 2022.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'HIV Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'BCG vaccine is given to protect against:',
  'Measles',
  'Tuberculosis (particularly severe forms in children)',
  'Whooping cough',
  'Hepatitis B',
  'B',
  'BCG (Bacille Calmette-Guerin) is given at birth to protect against severe forms of tuberculosis in children, particularly TB meningitis and miliary TB. It does not fully prevent pulmonary TB in adults. In Kenya it is given as a single 0.05 ml intradermal dose in the right upper arm at birth. Kenya KEPI Schedule; WHO TB Vaccination Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'TB Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The DOTS strategy for tuberculosis treatment primarily means:',
  'Dispensing Over-The-counter Supplements',
  'Directly Observed Treatment, Short-course — a patient takes medication in front of a health worker or treatment supporter',
  'Delivering Online TB Screening',
  'Diagnosing Only Through Sputum smear',
  'B',
  'DOTS (Directly Observed Treatment, Short-course) is the WHO-recommended TB control strategy. A health worker or trained treatment supporter watches the patient swallow every dose of anti-TB medication. This prevents missed doses, drug resistance, and treatment failure. It includes five elements: political commitment, diagnosis by sputum smear, standardised treatment, drug supply, and recording/reporting. Kenya MOH TB Treatment Guidelines; WHO DOTS Strategy.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'TB Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which method of household water treatment is MOST effective in killing all pathogens including viruses?',
  'Filtration through a cloth',
  'Storing water in a covered container',
  'Boiling water for at least one minute',
  'Adding ash to water',
  'C',
  'Boiling water for at least one minute (or 3 minutes at altitudes above 2,000 m) kills all pathogenic microorganisms including bacteria, viruses, and protozoa. Filtration through cloth removes only large particles. Covering storage containers prevents recontamination but does not treat already contaminated water. Ash has no proven disinfection effect. Kenya MOH Water, Sanitation and Hygiene Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Water Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Open Defecation Free (ODF) status in a community means:',
  'All community members use any open field designated for defecation',
  'No member of the community defecates in the open — all use latrines or toilets',
  'Only children are allowed to defecate outside',
  'Defecation is done in running water sources',
  'B',
  'ODF status is declared when 100% of community members use a latrine, toilet, or other safe sanitation facility and no one defecates in the open. ODF eliminates faecal-oral disease transmission including cholera, typhoid, and soil-transmitted helminths. Community-Led Total Sanitation (CLTS) is a key ODF approach. Kenya MOH WASH Strategy; UNICEF CLTS Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Sanitation',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Depo-Provera is classified as which type of family planning method?',
  'Barrier method',
  'Natural method',
  'Hormonal injectable contraceptive',
  'Intrauterine device',
  'C',
  'Depo-Provera (depot medroxyprogesterone acetate — DMPA) is a progestin-only injectable contraceptive given every 3 months (12 weeks). It works by suppressing ovulation, thickening cervical mucus, and thinning the endometrium. Sayana Press is a subcutaneous formulation given every 3 months. Both are classified as long-acting hormonal injectables. Kenya MOH Family Planning Clinical Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Lactational Amenorrhoea Method (LAM) is effective as a contraceptive only when ALL three criteria are met. Which set of criteria is correct?',
  'Baby is under 12 months, mother is menstruating, and breastfeeding every 6 hours',
  'Baby is under 6 months, mother has not resumed menstruation, and baby is exclusively or nearly exclusively breastfed',
  'Baby is under 3 months, mother uses condoms, and breastfeeds twice daily',
  'Baby is under 9 months, mother has not resumed menstruation, and breastfeeds only at night',
  'B',
  'LAM requires all three conditions simultaneously: (1) baby is less than 6 months old, (2) mother has not resumed menstruation (amenorrhoeic), (3) baby is exclusively or nearly exclusively breastfed (day and night, frequent feeds). When all three are met, LAM provides over 98% contraceptive protection. Failure of any one criterion requires an additional contraceptive method. Kenya MOH FP Guidelines; WHO Medical Eligibility Criteria.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Implants such as Jadelle and Implanon are inserted:',
  'Into the uterine cavity',
  'Subcutaneously in the upper inner arm',
  'Intramuscularly in the buttock',
  'Under the skin of the abdomen',
  'B',
  'Contraceptive implants (Jadelle — two rods, 5-year; Implanon/Nexplanon — single rod, 3-year) are inserted subdermally in the inner upper arm (non-dominant arm) by a trained provider. They release progestin (levonorgestrel or etonogestrel) slowly to suppress ovulation. IUDs are inserted into the uterine cavity. Kenya MOH Family Planning Clinical Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Tubal ligation is classified as which type of family planning method?',
  'Short-acting hormonal method',
  'Barrier method',
  'Permanent surgical method',
  'Long-acting reversible method',
  'C',
  'Tubal ligation (bilateral tubal occlusion) is a permanent surgical contraceptive method for women. Vasectomy is the male equivalent. Both are considered permanent and clients must receive comprehensive counselling on permanence before the procedure. They are not classified as reversible methods even if reversal is sometimes possible. Kenya MOH FP Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a growth monitoring session, the Community Health Volunteer notices that a 9-month-old child has not gained weight for the past two months. The MOST appropriate action is:',
  'Advise the mother to give the child more sugar',
  'Refer the child to the nearest health facility for further assessment',
  'Tell the mother the child is growing normally',
  'Discharge the child from the growth monitoring programme',
  'B',
  'Two consecutive months of weight faltering (no weight gain or weight loss) is a danger sign that requires referral to a health facility for full clinical and nutritional assessment. The CHV should not reassure falsely or make dietary recommendations without clinical evaluation. Kenya Community Health Strategy; IMNCI Guidelines; Kenya MOH Nutrition Protocols.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Nutritional Surveillance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'MUAC (Mid-Upper Arm Circumference) measurement in children 6–59 months: a reading of less than 11.5 cm (red zone) indicates:',
  'Normal nutritional status',
  'Moderate acute malnutrition',
  'Severe acute malnutrition requiring urgent referral',
  'Overnutrition',
  'C',
  'MUAC colour coding: Green (≥12.5 cm) = normal; Yellow (11.5–12.4 cm) = moderate acute malnutrition (MAM); Red (<11.5 cm) = severe acute malnutrition (SAM). SAM with MUAC <11.5 cm requires referral for therapeutic feeding (RUTF or inpatient F-75/F-100 if complications). Kenya MOH Nutrition Protocols; WHO MUAC Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Nutritional Surveillance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Role play as a health education method is MOST useful for:',
  'Reaching a large audience simultaneously',
  'Teaching attitudes, communication skills, and behaviour change through acting out scenarios',
  'Distributing written health information',
  'Measuring knowledge levels before and after education',
  'B',
  'Role play involves participants acting out real-life health scenarios (e.g., counselling a patient, having a difficult conversation about family planning). It is most effective for developing empathy, communication skills, and practising behaviour change. It engages participants actively and makes abstract concepts concrete. It is not suited for large audiences or knowledge measurement. Kenya CHW Training Manual; Adult Learning Principles.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A Community Health Volunteer (CHV) in Kenya is responsible for:',
  'Prescribing and dispensing medications independently',
  'Household registration, health education, referral, and reporting to the Community Health Promoter',
  'Performing surgical procedures at the community level',
  'Replacing the role of the nurse at the dispensary',
  'B',
  'CHVs (formerly Community Health Workers) in Kenya conduct household registration and health profiling, provide basic health education, distribute community-level health supplies (ORS, condoms, iron/folate), refer sick members to facilities, and report to CHPs (Community Health Promoters/Nurses). They do not prescribe medications or perform clinical procedures. Kenya Community Health Strategy 2014–2019 and 2020 Update.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Community Health Worker Roles',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which insecticide-based malaria prevention method involves spraying the interior walls of houses?',
  'Insecticide-Treated Net (ITN)',
  'Larval Source Management',
  'Indoor Residual Spraying (IRS)',
  'Biological control',
  'C',
  'Indoor Residual Spraying (IRS) involves applying a residual insecticide (e.g., DDT, pyrethroids, or newer compounds) to interior walls and ceilings of houses. Mosquitoes that rest on treated surfaces die. ITNs protect sleeping individuals. Larval source management eliminates breeding sites. IRS and ITNs are complementary WHO-recommended malaria prevention tools. Kenya MOH Malaria Prevention Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Malaria Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'IEC materials in health education stands for:',
  'International Education Certificates',
  'Information, Education, and Communication materials',
  'Infectious Exposure Control materials',
  'Immunisation, Evaluation, and Counselling',
  'B',
  'IEC (Information, Education, and Communication) materials include posters, flipcharts, leaflets, brochures, radio jingles, and videos used to convey health messages to communities. They support behaviour change communication (BCC). Effective IEC materials use simple language, pictures, and are culturally appropriate. Kenya MOH Health Communication Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'At an antenatal clinic, a nurse identifies a pregnant woman with signs of severe pre-eclampsia. The MOST appropriate action is:',
  'Send her home with antihypertensives and review in two weeks',
  'Refer her immediately to a higher-level facility for emergency management',
  'Advise bed rest at home',
  'Schedule her for elective caesarean section in two weeks',
  'B',
  'Severe pre-eclampsia (BP ≥160/110 mmHg with proteinuria or other features) is a medical emergency requiring immediate referral to a facility with capacity for IV magnesium sulphate, antihypertensives, fetal monitoring, and possible delivery. Delaying referral or sending home risks eclampsia, stroke, placental abruption, and maternal or fetal death. Kenya MOH ANC and Obstetric Emergency Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Referral Indications',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Chlorination of water is used to:',
  'Improve the taste and colour of water',
  'Kill pathogenic microorganisms including bacteria and viruses',
  'Remove suspended particles through settling',
  'Adjust the pH of water',
  'B',
  'Chlorination disinfects water by killing pathogenic bacteria (e.g., Vibrio cholerae, E. coli), viruses (e.g., hepatitis A), and some protozoa. It does not effectively remove sediment (sedimentation/coagulation does that) or improve taste (may actually add a chlorine taste). Free chlorine residual in distribution systems also provides ongoing protection. Kenya MOH WASH Guidelines; WHO Water Treatment.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Water Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following is classified as a natural family planning method?',
  'Copper IUD',
  'Oral contraceptive pill',
  'Safe period (calendar/rhythm method)',
  'Male condom',
  'C',
  'Natural family planning (NFP) methods rely on identifying fertile days in the menstrual cycle without devices or hormones. The calendar/rhythm method (safe period) estimates fertile days based on cycle length. Other NFP methods include Basal Body Temperature (BBT), cervical mucus (Billings), and Symptothermal method. LAM is also natural. Condoms are barrier; COC is hormonal; IUD is device-based. Kenya MOH FP Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A child''s weight is plotted on the growth chart and falls between the 3rd and 15th percentile lines with a downward trajectory over three months. This pattern indicates:',
  'Normal growth — no action needed',
  'Overweight — reduce feeding',
  'Growth faltering — requires nutritional assessment and counselling',
  'The growth chart is inaccurate',
  'C',
  'A downward crossing of percentile lines (even within the 3rd–15th percentile range) indicates growth faltering, a warning sign for undernutrition. It requires investigation into feeding practices, illness frequency, and food security. Counselling on appropriate feeding and possible referral for assessment are needed. Kenya MOH Nutrition Protocols; WHO Child Growth Standards.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Nutritional Surveillance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The combined oral contraceptive pill (COC) contains:',
  'Only progesterone',
  'Only oestrogen',
  'Both oestrogen and progestogen',
  'Testosterone and oestrogen',
  'C',
  'The combined oral contraceptive pill (COC) contains both a synthetic oestrogen (ethinylestradiol) and a progestogen. It prevents pregnancy by suppressing ovulation, thickening cervical mucus, and thinning the endometrium. The progestogen-only pill (POP or mini-pill) contains only progestogen. Kenya MOH Family Planning Clinical Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Family Planning',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which approach to TB contact tracing is most effective in reducing community TB transmission?',
  'Treating only the index patient',
  'Identifying and screening household and close contacts of a confirmed TB case for symptoms and infection',
  'Vaccinating all community members with BCG',
  'Closing schools in the community',
  'B',
  'Contact tracing identifies household and close contacts of a TB case who may have been exposed. Contacts are assessed for TB symptoms and offered TB testing (Mantoux/IGRA) and preventive treatment (TB Preventive Therapy — isoniazid) if appropriate. This interrupts transmission. BCG is given at birth for severe childhood TB forms, not adults. Kenya MOH TB Contact Investigation Guidelines; WHO TB Elimination Strategy.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'TB Prevention',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following is a key principle of effective health education?',
  'The educator should do all the talking without audience participation',
  'Messages should be complex to demonstrate professional knowledge',
  'Content should be relevant to the felt needs of the community',
  'Health education should only target literate populations',
  'C',
  'Effective health education must be: relevant to the community''s felt needs (what they recognise as important), accurate, practical, culturally appropriate, participatory (two-way communication), and reinforced over time. Relevance improves motivation and behaviour change. Complex messages and one-way communication reduce uptake. Kenya MOH Health Education Guidelines; Adult Learning Theory.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Principles',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A group health education session allows community members to share experiences and learn from each other. This method is called:',
  'Mass media',
  'Individual counselling',
  'Group discussion',
  'Demonstration',
  'C',
  'Group discussion is a participatory health education method where a small group (10–20 people) shares knowledge, attitudes, and experiences facilitated by a health educator. It promotes peer learning, builds on existing community knowledge, and facilitates attitude change. Individual counselling is one-on-one. Mass media reaches large audiences. Demonstration teaches skills. Kenya CHW Health Education Manual.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Health Education Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Under-5 Mortality Rate (U5MR) is an important child health indicator because it reflects:',
  'Only deaths from infectious diseases',
  'The overall health environment, nutrition, and access to health care for young children',
  'Deaths in the first 24 hours of life only',
  'The quality of adult health services',
  'B',
  'U5MR (deaths per 1,000 live births from birth to exactly 5 years) is a composite indicator reflecting nutrition, immunisation coverage, water and sanitation quality, access to healthcare, and socioeconomic conditions. It is used to compare child health across countries and track MDG/SDG progress. Kenya''s U5MR was 41 per 1,000 live births (KDHS 2022). UNICEF Child Mortality Report; WHO Health Statistics.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Maternal and Child Health Indicators',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Safe water storage at household level requires:',
  'Storing water in open buckets in direct sunlight',
  'Using a narrow-mouth covered container and drawing water with a clean ladle',
  'Collecting water in animal troughs shared with livestock',
  'Storing treated water in the same container as untreated water',
  'B',
  'Safe household water storage principles: use a narrow-mouth, covered, clean container; draw water with a dedicated clean ladle or tap (avoid hand-dipping); store away from the ground and from contamination sources; use treated water within 24 hours. Recontamination after treatment is a leading cause of waterborne disease at household level. Kenya MOH WASH Guidelines; WHO Safe Water Storage.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Water Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'HIV Testing Services (HTS) include which of the following components?',
  'Testing without consent',
  'Pre-test information, voluntary testing, post-test counselling, referral, and confidentiality',
  'Mandatory partner notification without client consent',
  'Disclosure of results to the employer',
  'B',
  'HTS components include: C — Consent (voluntary and informed), C — Confidentiality, C — Counselling (pre- and post-test), C — Correct results, C — Connection/Linkage to care and treatment. Mandatory testing without consent is unethical. Results are shared only with the client (and with partners only with consent). Kenya MOH HTS Guidelines 2020.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'HIV Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Measles–Rubella (MR) vaccine is given in Kenya at:',
  '6 weeks and 10 weeks',
  '9 months and 18 months',
  'At birth and 6 weeks',
  '6 months and 12 months',
  'B',
  'Under the Kenya KEPI schedule, Measles-Rubella vaccine is given at 9 months (first dose) and 18 months (second dose/booster). This timing ensures that maternal antibodies have waned and the child mounts a robust immune response. The first dose provides approximately 85–90% protection; the second dose closes immunity gaps. Kenya MOH KEPI Schedule 2023.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Immunisation — KEPI Schedule',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Screening is an example of which level of prevention?',
  'Primary prevention',
  'Secondary prevention',
  'Tertiary prevention',
  'Primordial prevention',
  'B',
  'Secondary prevention aims for early detection and prompt treatment of disease before symptoms become severe. Screening programmes (cervical cancer screening with VIA, hypertension screening, newborn heel-prick screening) detect disease early when it is most treatable. Primary prevention stops disease before it occurs. Tertiary prevention reduces disability after disease is established. Park''s Preventive & Social Medicine.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Levels of Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a community health diagnosis, what does "prioritisation of health problems" involve?',
  'Selecting only problems that are cheap to solve',
  'Ranking health problems based on magnitude, severity, community concern, and feasibility of intervention',
  'Ignoring problems affecting minorities',
  'Addressing only problems identified by the health worker',
  'B',
  'Health problem prioritisation uses criteria such as: (1) magnitude — how many people are affected, (2) severity — is it life-threatening, (3) community concern — does the community recognise it as important, (4) feasibility of solution — can it be addressed with available resources. Tools include the Hanlon method and community scoring. It ensures resources are used for highest-impact problems. Kenya PHC Community Diagnosis Manual.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Community Diagnosis',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Exclusive breastfeeding is recommended for the first:',
  '3 months',
  '4 months',
  '6 months',
  '12 months',
  'C',
  'WHO and Kenya MOH recommend exclusive breastfeeding (breast milk only — no water, other liquids, or solids) for the first 6 months of life. This provides complete nutrition, passive immunity (IgA, lactoferrin), reduces risk of diarrhoea, respiratory infections, and sudden infant death syndrome. Complementary foods are introduced at 6 months alongside continued breastfeeding up to 2 years or beyond. Kenya Infant and Young Child Feeding (IYCF) Guidelines.',
  'KRCHN',
  'Paper II',
  'Community Health Nursing',
  'Maternal and Child Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- MENTAL HEALTH NURSING (~25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which definition BEST describes mental illness?',
  'Feeling sad for a day after a disappointment',
  'A diagnosable disorder characterised by significant disturbances in thinking, emotion, or behaviour that impairs functioning',
  'Unusual personality traits',
  'Any deviation from social norms',
  'B',
  'Mental illness is characterised by clinically significant disturbances in cognition, emotional regulation, or behaviour that cause distress or impair functioning. It is diagnosed based on recognised criteria (DSM-5 or ICD-11). Transient sadness or unusual personality is not a mental disorder. Social deviance alone is not a mental disorder criterion. WHO Mental Health Action Plan; Kenya Mental Health Policy.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Definition and Concepts',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following is an example of therapeutic communication?',
  'Saying "Do not worry, everything will be fine" to a distressed patient',
  'Asking an open-ended question such as "Can you tell me more about how you are feeling?"',
  'Changing the subject when a patient talks about suicide',
  'Advising the patient what to do without listening',
  'B',
  'Therapeutic communication techniques include: open-ended questions (encourage elaboration), active listening (full attention, eye contact, nodding), empathy (acknowledging feelings), reflection, clarification, and silence. False reassurance ("everything will be fine") is non-therapeutic — it dismisses feelings. Changing the subject avoids important issues. Giving advice without listening is authoritarian. Stuart''s Principles and Practice of Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Communication',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with schizophrenia reports hearing voices telling him to harm himself. This symptom is classified as:',
  'A delusion',
  'A hallucination',
  'An illusion',
  'Thought insertion',
  'B',
  'Hallucinations are sensory perceptions without external stimuli. Hearing voices (auditory hallucinations) is the most common type in schizophrenia. Delusions are fixed false beliefs. Illusions are misinterpretations of real stimuli. Thought insertion is the belief that thoughts are placed in one''s mind by an outside force (a delusion of passivity). Stuart''s Psychiatric Nursing; ICD-11 Schizophrenia Criteria.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Schizophrenia',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following nursing actions is MOST important when caring for a patient who has expressed suicidal ideation?',
  'Leave the patient alone to calm down',
  'Remove potentially harmful objects and do not leave the patient unattended',
  'Avoid discussing suicide to prevent the patient from acting on the thoughts',
  'Tell the patient that suicide is wrong',
  'B',
  'Immediate safety is the priority for a suicidal patient: (1) do NOT leave alone — continuous observation, (2) remove means — sharp objects, cords, medications from environment, (3) maintain therapeutic relationship and allow patient to talk, (4) report to the multidisciplinary team. Asking directly about suicide does NOT increase risk (it provides relief and information). Moralising is harmful. Stuart''s Psychiatric Nursing; Kenya Mental Health Guidelines.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Suicide Nursing Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Key signs of a major depressive episode include:',
  'Elevated mood, decreased need for sleep, and pressured speech',
  'Persistent low mood, loss of interest (anhedonia), sleep disturbance, and feelings of worthlessness',
  'Auditory hallucinations and disorganised speech',
  'Excessive anxiety, palpitations, and avoidance behaviour',
  'B',
  'DSM-5 criteria for Major Depressive Disorder (MDD) include: depressed mood most of the day, anhedonia (loss of interest/pleasure), changes in weight/appetite, insomnia or hypersomnia, psychomotor changes, fatigue, worthlessness or guilt, difficulty concentrating, and recurrent suicidal ideation — lasting ≥2 weeks. Elevated mood and pressured speech = mania (bipolar). Hallucinations = schizophrenia. Palpitations and avoidance = anxiety disorder.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Depression',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Physical signs of anxiety include:',
  'Low blood pressure, bradycardia, and weight gain',
  'Palpitations, trembling, sweating, and shortness of breath',
  'Jaundice, pallor, and oedema',
  'Constipation, hair loss, and cold intolerance',
  'B',
  'Anxiety activates the sympathetic nervous system (fight-or-flight): palpitations (tachycardia), trembling, diaphoresis (sweating), shortness of breath, dry mouth, dizziness, and chest tightness. These are somatic symptoms of anxiety. Low BP and bradycardia are not anxiety features. Jaundice, pallor, and oedema suggest liver or renal disease. Cold intolerance and hair loss suggest hypothyroidism. DSM-5; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Anxiety Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Haloperidol is an antipsychotic medication. A common side effect the nurse should monitor for is:',
  'Hyperglycaemia and weight gain',
  'Extrapyramidal side effects — rigidity, restlessness (akathisia), and tardive dyskinesia',
  'Hypothyroidism and hair loss',
  'Increased appetite and fluid retention',
  'B',
  'Haloperidol is a typical (first-generation) antipsychotic that blocks D2 dopamine receptors. Extrapyramidal side effects (EPSE) include: acute dystonia (sudden muscle spasms), parkinsonism (rigidity, tremor, shuffling gait), akathisia (motor restlessness), and tardive dyskinesia (late-onset involuntary movements — lip smacking, tongue protrusion). Hyperglycaemia and weight gain are more common with atypical antipsychotics (olanzapine, clozapine). Stuart''s Psychiatric Nursing; BNF.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Psychosis Medications',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Electroconvulsive Therapy (ECT) is indicated as a treatment option for:',
  'Mild anxiety disorder',
  'Severe treatment-resistant depression and catatonia',
  'Alcohol use disorder',
  'Personality disorder',
  'B',
  'ECT involves passing a controlled electrical current through the brain under general anaesthesia to induce a therapeutic seizure. It is indicated for: severe major depressive disorder (especially with suicidal risk or psychosis), catatonia, and severe bipolar disorder not responding to medication. It is not first-line for anxiety, alcohol use disorder, or personality disorders. Kenya MOH Mental Health Formulary; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'ECT',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Mental Status Examination (MSE) components include all of the following EXCEPT:',
  'Appearance, behaviour, and speech',
  'Mood, affect, and thought content',
  'Blood glucose level and serum sodium',
  'Perception, cognition, and insight',
  'C',
  'The Mental Status Examination (MSE) is a structured clinical observation covering: Appearance, Behaviour, Speech, Mood and Affect, Thought (form and content), Perceptions (hallucinations/illusions), Cognition (orientation, memory, concentration), Insight, and Judgement. It is a clinical assessment tool — it does not include laboratory values. Blood glucose and serum sodium are biochemical investigations. Stuart''s Psychiatric Nursing; ICD-11.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Mental Status Examination',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Community mental health services help reduce mental health stigma by:',
  'Keeping mentally ill patients permanently hospitalised',
  'Providing care in the community, educating communities about mental illness, and supporting reintegration',
  'Restricting access to mental health information',
  'Requiring patients to disclose their diagnosis publicly',
  'B',
  'Community mental health reduces stigma by treating people in their home environment (reducing the "othering" of psychiatric hospitals), providing psychoeducation to families and communities, facilitating social reintegration (work, school, community activities), and normalising mental health help-seeking. Chronic hospitalisation increases social isolation and stigma. Kenya Mental Health Policy 2015–2030; WHO Mental Health Action Plan.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Community Mental Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient in alcohol withdrawal presents with tremors, confusion, and a generalised seizure 24 hours after stopping drinking. This is MOST consistent with:',
  'Wernicke encephalopathy',
  'Delirium tremens (DT)',
  'Simple alcohol intoxication',
  'Hepatic encephalopathy',
  'B',
  'Alcohol withdrawal syndrome progresses through: mild (tremors, anxiety, diaphoresis at 6–24 hours) → moderate (hallucinations at 12–24 hours) → severe delirium tremens (confusion, agitation, seizures, autonomic instability at 24–72 hours). DT is a medical emergency with mortality up to 5% if untreated. Treatment: benzodiazepines (diazepam or lorazepam), thiamine IV, supportive care. Stuart''s Psychiatric Nursing; Kenya MOH Mental Health Guidelines.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Bipolar disorder is characterised by:',
  'Persistent low mood without elevation',
  'Episodes of both mania (elevated mood, decreased need for sleep) and depression',
  'Chronic auditory hallucinations',
  'Persistent anxiety and panic attacks only',
  'B',
  'Bipolar disorder involves episodes of mania (elevated/expansive/irritable mood, decreased sleep need, grandiosity, pressured speech, impulsivity, risky behaviour) alternating with episodes of depression. Bipolar I requires at least one manic episode. Bipolar II involves hypomania and depression. It is distinct from unipolar depression, schizophrenia (hallucinations), and anxiety disorders. DSM-5; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Bipolar Disorder',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Active listening as a therapeutic communication technique involves:',
  'Formulating your response while the patient is still speaking',
  'Giving full, undivided attention — maintaining eye contact, nodding, and not interrupting',
  'Only listening to the words spoken, ignoring body language',
  'Finishing the patient''s sentences to save time',
  'B',
  'Active listening involves: giving full attention (eye contact, open body posture, nodding), hearing both verbal and non-verbal messages, not interrupting, reflecting back what you hear, and asking clarifying questions. Formulating responses while the patient speaks indicates passive listening. Non-verbal communication (body language, tone) carries more than 50% of the message. Stuart''s Psychiatric Nursing; Therapeutic Communication Principles.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Communication',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Schizophrenia is MOST commonly characterised by:',
  'Recurrent episodes of sadness and suicidal thoughts',
  'Auditory hallucinations, delusions, and disorganised thinking',
  'Excessive worry and physical symptoms of anxiety',
  'Repeated episodes of mania and depression',
  'B',
  'Schizophrenia positive symptoms include auditory hallucinations (most common — voices commenting or commanding), delusions (fixed false beliefs — persecution, grandiosity, reference), and disorganised speech/thinking. Negative symptoms include flat affect, alogia, avolition, anhedonia. It is distinct from depression (option A), anxiety (option C), and bipolar disorder (option D). DSM-5 Schizophrenia Criteria; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Schizophrenia',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When caring for a patient with suicidal ideation, giving false reassurance such as "everything will be fine" is:',
  'A helpful therapeutic technique',
  'Non-therapeutic because it dismisses the patient''s feelings and closes communication',
  'A standard psychiatric nursing intervention',
  'Recommended to reduce patient anxiety immediately',
  'B',
  'False reassurance ("everything will be fine", "you have nothing to worry about") is non-therapeutic. It dismisses the patient''s real feelings, may feel patronising, and shuts down communication at a critical moment. Instead, the nurse should acknowledge feelings ("I can see this is very hard for you"), ask open questions, and create space for the patient to express their distress. This strengthens the therapeutic relationship and allows proper assessment. Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Communication',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Empathy in therapeutic communication means:',
  'Feeling exactly the same emotions as the patient',
  'Understanding and acknowledging the patient''s feelings without losing objectivity',
  'Giving advice based on your own experiences',
  'Agreeing with everything the patient says',
  'B',
  'Empathy is the ability to perceive and acknowledge the patient''s emotional experience from their perspective, while maintaining professional objectivity. It differs from sympathy (feeling the same emotions, losing objectivity) and from agreement. Empathic responses include: "It sounds like you are feeling overwhelmed — is that right?" Empathy builds trust, encourages disclosure, and is foundational to therapeutic relationships. Stuart''s Psychiatric Nursing; Carl Rogers Person-Centred Theory.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Communication',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In the Mental Status Examination, "insight" refers to:',
  'The patient''s ability to see clearly',
  'The patient''s awareness and understanding that they have a mental illness',
  'The patient''s memory for recent events',
  'The patient''s orientation to time, place, and person',
  'B',
  'Insight in psychiatry is the degree to which a patient recognises and understands their illness. Levels: Full insight (understands they are unwell, accepts treatment), Partial insight (acknowledges something is wrong but does not attribute it to mental illness), No insight (completely denies illness). Poor insight is common in psychosis and contributes to medication non-adherence. Orientation is cognition. Memory is a different cognitive domain. Stuart''s Psychiatric Nursing; ICD-11.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Mental Status Examination',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a mental illness refuses to take their antipsychotic medication because they say they are "not sick". This is MOST likely related to:',
  'Drug allergy',
  'Lack of insight',
  'Side effects of medication',
  'Language barrier',
  'B',
  'Lack of insight (anosognosia) — the patient does not believe they are ill — is the most common reason for medication non-adherence in psychosis. The patient cannot understand why they should take medication for an illness they do not believe they have. Addressing this requires psychoeducation (patient and family), motivational interviewing, and building a therapeutic alliance. Side effects may also contribute but the clinical presentation here (denying illness) points to insight. Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Medication Adherence',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What distinguishes normal grief from clinical depression after bereavement?',
  'Both are identical and require antidepressants',
  'Normal grief involves sadness tied to the loss that gradually improves; clinical depression involves persistent low mood, worthlessness, and significant functional impairment lasting more than 2 weeks',
  'Normal grief never involves sadness or crying',
  'Clinical depression occurs only in people without social support',
  'B',
  'Grief is a normal, expected response to loss — sadness, yearning, waves of emotion that improve over time. Clinical depression after bereavement involves persistent low mood beyond expected, pervasive feelings of worthlessness, inability to function, suicidal ideation, and lasts more than 2 weeks. DSM-5 allows a major depressive episode diagnosis if the above criteria are met during bereavement. Not everyone who grieves needs antidepressants. DSM-5; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Depression',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Substance use disorder is characterised by all of the following EXCEPT:',
  'Craving and compulsive drug-seeking behaviour',
  'Continued use despite harmful consequences',
  'Tolerance (needing more of the substance to achieve the same effect)',
  'A single episode of alcohol use',
  'D',
  'Substance use disorder criteria (DSM-5) include: impaired control (cravings, inability to cut down), social impairment (failure in role obligations), risky use (using in dangerous situations), pharmacological criteria (tolerance and withdrawal). A single episode of alcohol use does not constitute a substance use disorder. Disorder requires a pattern causing significant distress or impairment. Stuart''s Psychiatric Nursing; DSM-5.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The MOST appropriate response when a patient tells the nurse "I want to kill myself" is:',
  'Say "Do not say such things" and change the subject',
  'Acknowledge the statement directly: ask "Are you having thoughts of ending your life?" and listen carefully',
  'Immediately call the family without talking to the patient',
  'Document and ignore until the doctor''s round',
  'B',
  'When a patient expresses suicidal ideation, directly and calmly asking about it is the correct therapeutic response — this validates the patient, opens communication, and allows risk assessment. Asking about suicide does NOT increase suicide risk (this is a common myth). Dismissing ("don''t say such things") is harmful. Contacting family without talking to the patient bypasses therapeutic communication. Delay is dangerous. Kenya MOH Mental Health Guidelines; Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Suicide Nursing Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Reducing stigma toward mental illness in the community is BEST achieved by:',
  'Keeping all mentally ill persons in hospitals',
  'Community education about mental illness as a treatable health condition',
  'Discouraging mentally ill persons from working',
  'Requiring disclosure of mental illness at employment',
  'B',
  'Stigma (prejudice and discrimination based on mental illness) is reduced through: public health education (normalising mental illness as a treatable medical condition), integrating mental health into primary care, celebrating recovery stories, involving people with lived experience in advocacy, and legislating against discrimination. Hospitalisation, unemployment, and compulsory disclosure all increase stigma. WHO Anti-Stigma Campaign; Kenya Mental Health Policy 2015–2030.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Community Mental Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Normal behaviour differs from abnormal behaviour in that normal behaviour:',
  'Always conforms strictly to social norms',
  'Is statistically typical, culturally accepted, and does not cause significant distress or impair functioning',
  'Is defined only by biological criteria',
  'Never varies across different cultures',
  'B',
  'Defining normality in mental health involves multiple perspectives: statistical (most people), cultural (accepted in the individual''s culture), functional (does not impair daily life), subjective (person does not experience significant distress). No single definition is complete — a behaviour normal in one culture may be abnormal in another. Diagnosis of mental disorder requires distress and functional impairment beyond cultural norms. Stuart''s Psychiatric Nursing; Rosenhan & Seligman''s criteria.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Definition and Concepts',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In the Mental Status Examination, "affect" refers to:',
  'The patient''s subjective report of their emotional state',
  'The observable external expression of emotion as seen by the examiner',
  'The patient''s memory for recent events',
  'The patient''s speech rate and rhythm',
  'B',
  'Mood is the subjective emotional experience (what the patient reports: "I feel sad"). Affect is the observable, external expression of emotion (what the examiner sees: blunted, flat, labile, congruent, incongruent). Blunted/flat affect (reduced emotional expression) is common in schizophrenia. Labile affect (rapidly shifting emotions) is seen in bipolar disorder and certain neurological conditions. Memory and speech are separate MSE domains. Stuart''s Psychiatric Nursing.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Mental Status Examination',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which intervention is MOST important in a patient experiencing an acute manic episode with aggressive behaviour?',
  'Leave the patient alone in the ward',
  'Ensure a safe, low-stimulation environment and administer prescribed antipsychotic or mood-stabilising medication',
  'Engage the patient in vigorous physical activity',
  'Argue with the patient to correct their delusional thinking',
  'B',
  'During acute mania with aggression: (1) maintain a calm, safe, low-stimulation environment (reduce noise, lights, activity), (2) use de-escalation techniques, (3) administer prescribed medication (haloperidol, olanzapine IM, or lorazepam), (4) ensure staff and patient safety, (5) do not restrain unless essential and as last resort with proper protocols. Vigorous activity and arguing increase agitation. Leaving alone risks harm. Stuart''s Psychiatric Nursing; Kenya MOH Mental Health Guidelines.',
  'KRCHN',
  'Paper II',
  'Mental Health Nursing',
  'Bipolar Disorder',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- ENVIRONMENTAL HEALTH (~20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which category of environmental hazard includes bacteria, viruses, and parasites?',
  'Chemical hazard',
  'Physical hazard',
  'Biological hazard',
  'Ergonomic hazard',
  'C',
  'Environmental hazards are classified as: Biological (microorganisms — bacteria, viruses, fungi, parasites — and contaminated water/food), Chemical (pesticides, industrial pollutants, heavy metals), Physical (radiation, noise, extreme temperatures, UV light), Ergonomic (repetitive strain, poor posture, heavy lifting). Biological hazards are the leading environmental health concern in Kenya, primarily through contaminated water and food. Kenya MOH Environmental Health Manual.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Types of Environmental Hazards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Water treatment at a community borehole typically follows which sequence?',
  'Chlorination → filtration → sedimentation',
  'Sedimentation → filtration → chlorination',
  'Chlorination → sedimentation → filtration',
  'Filtration → chlorination → sedimentation',
  'B',
  'Water treatment sequence: (1) Sedimentation (coagulation/flocculation — removing suspended particles by settling or adding alum), (2) Filtration (passing through sand/gravel filters to remove remaining particles and some microorganisms), (3) Chlorination (disinfection — killing remaining pathogens). This sequence ensures chlorine is not consumed by organic matter before disinfection. Kenya MOH Water Treatment Guidelines; WHO Drinking Water Quality.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Water Supply Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A Ventilated Improved Pit (VIP) latrine reduces flies and odour compared to a simple pit latrine because it has:',
  'A concrete slab over the pit',
  'A dark pit shaft and a screened vent pipe that traps flies',
  'Running water for flushing',
  'A sealed pit with no ventilation',
  'B',
  'The VIP latrine design keeps the pit shaft dark while a screened vent pipe (fly screen at the top) allows odours to escape. Flies are attracted to light — they enter through the vent pipe and are trapped by the screen. This design significantly reduces fly nuisance and smell compared to a simple pit latrine. The pour-flush latrine uses a water seal. Composting latrines separate urine and faeces. Kenya MOH Sanitation Technical Guidelines.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Sanitation Types',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Medical waste such as used syringes and surgical sharps should be disposed of by:',
  'Mixing with general household waste',
  'Burying in a pit without any treatment',
  'Incineration or disposal in an approved sharps pit/autoclave',
  'Recycling as scrap metal',
  'C',
  'Sharps (syringes, needles, blades) and infectious medical waste are disposed of by: (1) incineration at high temperature (destroys pathogens and reduces volume), (2) autoclaving (steam sterilisation before final disposal), or (3) purpose-built sharps pits at health facilities in resource-limited settings. Mixing with household waste and recycling as scrap metal creates needlestick injury risk for waste handlers. Kenya MOH Healthcare Waste Management Guidelines; WHO Healthcare Waste.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Solid Waste Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Biomass smoke from cooking fires is a major indoor air pollution source. The MOST effective intervention to reduce exposure is:',
  'Opening more windows but keeping the cooking fire inside',
  'Using improved cookstoves that vent smoke outside or switching to cleaner fuels',
  'Burning more wood to cook faster',
  'Covering the cooking pot tightly',
  'B',
  'Burning biomass (wood, charcoal, dung, crop residues) indoors produces particulate matter (PM2.5), CO, and other pollutants causing respiratory disease, eye disease, and low birth weight. Improved biomass cookstoves with chimneys reduce indoor PM by 50–75%. Switching to LPG, biogas, or electricity eliminates biomass smoke entirely. Opening windows provides some reduction but does not address the source. WHO Household Air Pollution Guidelines.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Air Pollution',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The MOST effective method for controlling mosquito breeding at the community level is:',
  'Applying insecticide sprays to adult mosquitoes only',
  'Eliminating or treating stagnant water sources (larval source management)',
  'Closing all windows and doors',
  'Wearing heavy clothing only at night',
  'B',
  'Larval source management (LSM) targets mosquito breeding sites: draining stagnant water, filling in pits, covering water containers, and applying larvicides (Bacillus thuringiensis israelensis — Bti). This reduces the mosquito population at source. IRS and ITNs control adult mosquitoes but do not eliminate breeding. LSM is especially effective in urban settings. Kenya MOH Malaria Vector Control Guidelines; WHO Larval Source Management.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Vector Control',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A farmer who regularly uses organophosphate pesticides without protective equipment is at risk of:',
  'Silicosis from inhaling soil dust',
  'Organophosphate poisoning — presenting with excessive secretions, miosis, bradycardia, and muscle weakness',
  'Noise-induced hearing loss',
  'Radiation sickness',
  'B',
  'Organophosphate pesticides inhibit acetylcholinesterase, causing accumulation of acetylcholine: SLUDGE symptoms (Salivation, Lacrimation, Urination, Defaecation, GI distress, Emesis) plus miosis, bradycardia, bronchospasm, and muscle fasciculations. Chronic exposure causes neurological damage. PPE (gloves, mask, apron) prevents dermal and inhalation exposure. Silicosis = mining/construction. Noise = industrial. Radiation = radiology. Kenya MOH Occupational Health Manual.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Occupational Health Hazards',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Silicosis is an occupational lung disease caused by inhalation of:',
  'Asbestos fibres',
  'Crystalline silica dust',
  'Coal dust',
  'Cotton dust',
  'B',
  'Silicosis results from chronic inhalation of crystalline silica dust in occupations such as mining, quarrying, sandblasting, and construction. It causes progressive pulmonary fibrosis, leading to dyspnoea and increased susceptibility to TB. Asbestos causes asbestosis and mesothelioma. Coal dust causes pneumoconiosis (black lung disease). Cotton dust causes byssinosis. Kenya MOH Occupational Health Guidelines; ILO Occupational Lung Diseases.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Occupational Health Hazards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Food stored at temperatures between 5°C and 60°C is in the "danger zone" because:',
  'Nutrients are destroyed at these temperatures',
  'Bacteria multiply rapidly in this temperature range, increasing food poisoning risk',
  'Food loses flavour and colour',
  'These temperatures are too cold for food consumption',
  'B',
  'The food safety "danger zone" is 5°C–60°C (WHO: 4°C–60°C or 40°F–140°F). In this range, most foodborne pathogens (Salmonella, E. coli, Staphylococcus aureus, Listeria) multiply rapidly, doubling approximately every 20 minutes. Safe food handling: keep hot food above 60°C and cold food below 5°C; do not leave perishable food in the danger zone for more than 2 hours. Kenya MOH Food Safety Guidelines; WHO Five Keys to Safer Food.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Food Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Noise-induced hearing loss (NIHL) is caused by prolonged exposure to noise levels above:',
  '50 decibels (dB)',
  '85 decibels (dB)',
  '60 decibels (dB)',
  '40 decibels (dB)',
  'B',
  'Noise-induced hearing loss occurs with prolonged exposure to noise levels at or above 85 dB (the occupational health action level). Hair cells in the cochlea are damaged irreversibly. Workers in industries (construction, mining, factories, discos) are at risk. Prevention: hearing protection (earmuffs/earplugs), engineering controls (enclosing noisy machinery), audiometric surveillance. WHO Noise Guidelines; ILO Occupational Health Standards.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Occupational Health Hazards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The "3 Rs" principle of solid waste management stands for:',
  'Remove, Reclassify, Report',
  'Reduce, Reuse, Recycle',
  'Register, Review, Regulate',
  'Rehabilitate, Restore, Revive',
  'B',
  'The waste management hierarchy starts with: Reduce (minimise waste generation at source — most preferred), Reuse (use items multiple times before discarding), Recycle (process waste into new materials — paper, plastic, metal). Below these are recovery (energy from waste) and disposal in landfill (least preferred). The 3Rs reduce landfill burden, conserve resources, and reduce environmental pollution. Kenya NEMA Environmental Management and Coordination Act; WHO Healthcare Waste Management.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Solid Waste Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Healthcare workers are at occupational risk of needlestick injuries leading to transmission of:',
  'Malaria and tuberculosis',
  'HIV, Hepatitis B, and Hepatitis C',
  'Cholera and typhoid',
  'Influenza and COVID-19',
  'B',
  'Needlestick injuries (NSIs) carry risk of transmission of bloodborne pathogens: HIV (0.3% per percutaneous exposure), Hepatitis B (6–30% if source is HBeAg positive), and Hepatitis C (1.8%). Prevention: do not recap needles two-handed, use safety devices, dispose immediately in sharps container. Post-exposure prophylaxis (PEP) for HIV must be started within 72 hours. Kenya MOH Post-Exposure Prophylaxis Guidelines; WHO Healthcare Worker Safety.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Occupational Health Hazards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following housing characteristics is most important for preventing respiratory diseases?',
  'Use of corrugated iron roofing',
  'Adequate ventilation to allow fresh air circulation and reduce indoor pollutants',
  'Location near a busy road',
  'Small windows to retain heat',
  'B',
  'Adequate ventilation is critical for respiratory health — it dilutes indoor pollutants (biomass smoke, CO, mould spores, respiratory pathogens), reduces humidity, and lowers TB transmission risk. WHO housing standards recommend at least 9–14 m² of floor space per person and adequate window area (at least 10% of floor area). Poor ventilation increases risk of TB, pneumonia, and COPD from indoor pollutants. WHO Housing and Health Guidelines 2018.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Housing Standards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Rodent control in a community involves all of the following EXCEPT:',
  'Using rodenticides (rat poisons)',
  'Maintaining environmental cleanliness and proper food storage',
  'Blocking access points to buildings',
  'Releasing cats into food storage areas of health facilities',
  'D',
  'Rodent control (integrated pest management) includes: rodenticides (anticoagulants — warfarin, brodifacoum), environmental sanitation (remove food sources, refuse collection, clean storage), physical exclusion (block entry holes with wire mesh or cement), and trapping. Releasing cats into food storage or health facility areas is unhygienic, introduces zoonotic risk (Toxoplasma, cat allergens), and is not an approved environmental health strategy. Kenya MOH Vector and Pest Control Manual.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Vector Control',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A sanitary landfill is PREFERRED over an open dump for solid waste disposal because:',
  'It is cheaper to construct',
  'Waste is compacted and covered with soil daily, reducing disease vectors, odour, and groundwater contamination',
  'It allows recycling of all waste types',
  'It is accessible to all communities without machinery',
  'B',
  'A sanitary landfill involves: spreading and compacting waste in layers, covering with soil at least daily (reducing flies, rats, odour), liner systems to prevent leachate contaminating groundwater, gas collection, and perimeter fencing. Open dumps have none of these protections. Sanitary landfills are more expensive but far safer for public health. In Kenya, most counties are transitioning from open dumps to sanitary landfills per the Solid Waste Management Regulations 2021.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Solid Waste Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Handwashing before food preparation is an example of which approach to food safety?',
  'Vector control',
  'Cold chain maintenance',
  'Personal hygiene to prevent faecal-oral contamination',
  'Food irradiation',
  'C',
  'Handwashing with soap before food preparation removes faecal pathogens (E. coli, Salmonella, norovirus, hepatitis A) from hands, preventing faecal-oral transmission to food. WHO''s Five Keys to Safer Food include: keep clean (handwashing), separate raw and cooked, cook thoroughly, keep food at safe temperatures, and use safe water and raw materials. Kenya MOH Food Safety and Hygiene Guidelines.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Food Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Vehicle exhaust emissions contribute to which type of environmental hazard?',
  'Biological hazard',
  'Ergonomic hazard',
  'Chemical hazard (air pollution)',
  'Physical hazard',
  'C',
  'Vehicle exhaust emits carbon monoxide (CO), nitrogen oxides (NOx), particulate matter (PM2.5/PM10), volatile organic compounds (VOCs), and lead (from leaded petrol). These are chemical air pollutants causing respiratory disease, cardiovascular disease, and cancer. They are chemical hazards — not biological (pathogens), ergonomic (posture/movement), or physical (radiation/noise). WHO Air Quality Guidelines; NEMA Air Quality Regulations Kenya.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Air Pollution',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse working in theatre is at occupational risk for musculoskeletal injury MOST commonly from:',
  'Exposure to radiation during surgeries',
  'Manual handling — lifting and repositioning patients without assistive devices',
  'Inhaling anaesthetic gases',
  'Noise from surgical equipment',
  'B',
  'Musculoskeletal disorders (MSDs) — back pain, shoulder injuries, herniated discs — are the leading occupational health problem for nurses, caused by manual patient handling (lifting, transferring, repositioning patients without mechanical hoists or adequate help). Prevention: patient handling training, use of mechanical lifts and slide sheets, team lifting, adequate staffing. Kenya MOH Occupational Health for Healthcare Workers; ILO Ergonomics Guidelines.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Occupational Health Hazards',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A protected spring is considered a safer water source than an unprotected spring because:',
  'Protected springs are closer to homes',
  'A protected spring has a concrete headwall, spring box, drainage channel, and fencing to prevent contamination from surface runoff and animals',
  'Protected springs have higher water pressure',
  'Protected springs are only found in highland areas',
  'B',
  'A protected spring is engineered to prevent contamination: spring box captures the water at source and prevents back-contamination, concrete headwall prevents surface runoff from entering, fencing (at least 30 m radius) prevents animals and human defecation near the source, drainage channel diverts surface water. This reduces faecal coliform contamination by over 90% compared to unprotected springs. Kenya MOH Water Source Protection Guidelines; WHO Sanitary Survey.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Water Supply Safety',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The cold chain in food safety refers to:',
  'A series of cold storage facilities for vaccines',
  'Maintaining perishable food at safe refrigeration temperatures throughout storage and transport to prevent bacterial growth',
  'A type of water filtration system',
  'Cold weather conditions favourable for food preservation outdoors',
  'B',
  'The food cold chain maintains perishable food (meat, dairy, fish, cut vegetables) at or below 5°C from production through transport, storage, and retail to the consumer. Any break in the cold chain allows rapid bacterial multiplication. Cold chain management includes refrigerated trucks, cold rooms, regular temperature monitoring, and FIFO (first in, first out) stock rotation. Kenya MOH Food Safety Regulations; WHO Food Hygiene Standards.',
  'KRCHN',
  'Paper II',
  'Environmental Health',
  'Food Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- NUTRITION (~25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nutrient group provides the primary source of energy for the body?',
  'Proteins',
  'Vitamins',
  'Carbohydrates',
  'Minerals',
  'C',
  'Carbohydrates are the body''s preferred energy source, providing 4 kcal/g. Sources include cereals (maize, rice, wheat), tubers (potatoes, cassava, yams), and sugars. Proteins provide 4 kcal/g but are used for growth and repair, not primarily energy. Fats provide 9 kcal/g and are a concentrated energy store. Vitamins and minerals provide no calories. Kenya MOH Nutrition Manual; Krause''s Food and Nutrition Care.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Macronutrients',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which food group is the BEST dietary source of complete protein (containing all essential amino acids)?',
  'Maize and cassava',
  'Meat, fish, eggs, and dairy products',
  'Cooking oils and nuts only',
  'Fruits and vegetables',
  'B',
  'Complete proteins (containing all 9 essential amino acids in adequate amounts) come from animal sources: meat, fish, poultry, eggs, and dairy. Plant proteins (legumes, cereals) are generally incomplete — they are deficient in one or more essential amino acids. However, combining plant proteins (e.g., maize + beans) can provide all essential amino acids. Proteins are needed for growth, repair, enzyme synthesis, and immune function. Kenya MOH Dietary Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Macronutrients',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Kwashiorkor is a form of protein-energy malnutrition characterised by:',
  'Severe wasting with no oedema and the child looks very old/wrinkled',
  'Bilateral pitting oedema, flag sign in hair, and a miserable/irritable child',
  'Goitre and cretinism',
  'Night blindness and Bitot''s spots',
  'B',
  'Kwashiorkor results from protein deficiency (adequate energy but inadequate protein). Features: bilateral pitting oedema (hypoalbuminaemia causes fluid shift), flag sign (alternating bands of light and dark hair), skin changes (flaky paint dermatosis), pot-belly (ascites), irritability, and miserable affect. Marasmus = severe energy-protein deficiency: severe wasting, no oedema, "old man appearance", alert but apathetic. Goitre = iodine deficiency. Night blindness = Vitamin A deficiency.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Protein-Energy Malnutrition',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Marasmus in a young child is BEST described as:',
  'Oedema of the feet and face with skin changes',
  'Severe wasting of muscle and fat with no oedema — the child appears very thin and looks old for their age',
  'Enlarged thyroid gland with intellectual disability',
  'Sore gums and bleeding in the skin',
  'B',
  'Marasmus is severe protein-energy malnutrition from inadequate intake of both calories and protein. Features: severe wasting of muscle (baggy pants appearance — loose skin over buttocks), prominent ribs and facial bones, no oedema, alert but lethargic, weight severely below normal. The child is not oedematous (distinguishing it from kwashiorkor). May be associated with frequent infections. Treatment: F-75 stabilisation, then F-100/RUTF (RUTF = Ready-to-Use Therapeutic Food). Kenya MOH SAM Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Protein-Energy Malnutrition',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Night blindness is the earliest clinical sign of deficiency of which vitamin?',
  'Vitamin D',
  'Vitamin C',
  'Vitamin A',
  'Vitamin B12',
  'C',
  'Vitamin A (retinol) is essential for rhodopsin synthesis in the retinal rods (low-light vision). Deficiency first causes night blindness (difficulty seeing in dim light — nyctalopia). Progression: Bitot''s spots (foamy white patches on conjunctiva) → corneal xerosis → corneal ulceration → keratomalacia (corneal melting) → blindness. It is the leading preventable cause of childhood blindness. Treatment: high-dose Vitamin A supplementation. Kenya VAS Programme; WHO Vitamin A Deficiency.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Iodine deficiency during pregnancy can lead to:',
  'Rickets in the newborn',
  'Goitre in the mother and cretinism (intellectual disability) in the child',
  'Iron deficiency anaemia in the mother',
  'Vitamin A deficiency in the newborn',
  'B',
  'Iodine is essential for thyroid hormone synthesis. Deficiency during pregnancy causes maternal goitre (thyroid enlargement) and cretinism in the child (severe intellectual disability, deafness, motor impairment, short stature) due to inadequate thyroid hormone for fetal brain development. Prevention: universal salt iodisation. In Kenya, all table salt is mandatorily iodised. Rickets = Vitamin D deficiency. IDA = iron deficiency. Kenya MOH Micronutrient Supplementation Guidelines; WHO Iodine Deficiency Disorders.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A child with iron deficiency anaemia would MOST likely present with:',
  'Night blindness and Bitot''s spots',
  'Bilateral pitting oedema',
  'Fatigue, pallor of conjunctivae/palms, and spoon-shaped nails (koilonychia)',
  'Goitre and cretinism',
  'C',
  'Iron deficiency anaemia (IDA) signs: pallor (conjunctivae, palms, nail beds), fatigue and weakness, koilonychia (spoon-shaped nails in chronic IDA), pica (eating non-food items), tachycardia, and poor concentration. Bitot''s spots = Vitamin A deficiency. Bilateral pitting oedema = kwashiorkor. Goitre = iodine deficiency. IDA is the most common nutritional deficiency globally. Treatment: iron supplementation + dietary diversification. Kenya MOH Anaemia Guidelines; WHO Iron Deficiency.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Rickets in children is caused by deficiency of:',
  'Vitamin C',
  'Vitamin B12',
  'Vitamin D',
  'Vitamin A',
  'C',
  'Vitamin D deficiency in children causes rickets: softening and weakening of bones due to inadequate mineralisation. Features: bowed legs (genu varum), frontal bossing, rachitic rosary (beading of ribs at costochondral junctions), delayed tooth eruption, and craniotabes. Vitamin D is synthesised in skin on sun exposure and obtained from oily fish, eggs, and fortified foods. Vitamin C deficiency = scurvy. Vitamin A deficiency = night blindness. B12 deficiency = megaloblastic anaemia/neuropathy.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Scurvy results from deficiency of which vitamin?',
  'Vitamin A',
  'Vitamin D',
  'Vitamin E',
  'Vitamin C',
  'D',
  'Scurvy (Vitamin C / ascorbic acid deficiency) presents with: swollen, bleeding gums (gingival haemorrhage), perifollicular haemorrhages (bleeding around hair follicles), poor wound healing, corkscrew hairs, and in children, subperiosteal haemorrhages (bone pain). Vitamin C is needed for collagen synthesis. Sources: citrus fruits, tomatoes, guava, green vegetables. Vitamin A = night blindness. Vitamin D = rickets. Vitamin E deficiency is rare. Kenya MOH Micronutrient Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The 24-hour dietary recall is a dietary assessment method that involves:',
  'Weighing and measuring all food consumed over 7 days',
  'Asking the patient to recall all foods and drinks consumed in the previous 24 hours',
  'Observing the patient eating a meal and recording intake',
  'Reviewing the patient''s food shopping receipts',
  'B',
  'The 24-hour dietary recall is a quick, widely used dietary assessment tool where a trained interviewer asks the respondent to recall all foods and drinks consumed in the preceding 24 hours, including portion sizes and preparation methods. It is used for population dietary surveys and individual assessment. It relies on memory and may not represent usual intake (use multiple passes technique). Other methods: food frequency questionnaire (FFQ), food diary, direct observation. Kenya KDHS Nutrition Assessment; FAO Dietary Assessment Guide.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Dietary Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'WHO recommends exclusive breastfeeding for the first 6 months because breast milk:',
  'Contains only water and carbohydrates',
  'Provides complete nutrition, immune protection (IgA, lactoferrin), and reduces infection risk',
  'Is inferior to infant formula in protein content',
  'Is appropriate only for full-term babies',
  'B',
  'Breast milk provides: (1) complete nutrition — macronutrients and micronutrients in ideal proportions, (2) secretory IgA — first-line immune defence in the gut, (3) lactoferrin — bacteriostatic, (4) living cells (leukocytes, stem cells), (5) oligosaccharides — prebiotic effect, (6) bioactive factors supporting brain development. Exclusive breastfeeding for 6 months reduces diarrhoea, respiratory infection, otitis media, and infant mortality. WHO/UNICEF Global Breastfeeding Strategy; Kenya IYCF Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Breastfeeding',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Complementary foods should be introduced at what age according to Kenya MOH guidelines?',
  '3 months',
  '4 months',
  '6 months',
  '12 months',
  'C',
  'WHO and Kenya MOH recommend introducing complementary foods (semi-solid foods) at exactly 6 months of age while continuing breastfeeding. Earlier introduction (before 6 months) increases infection risk, displaces breast milk, and the gut is not yet mature. Later introduction risks nutritional deficiency and growth faltering. Complementary foods should be: Timely (6 months), Adequate (nutrient-dense), Properly prepared (safe), Safe (hygienic). Kenya IYCF Operational Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Infant and Young Child Feeding',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Ready-to-Use Therapeutic Food (RUTF) such as Plumpy''Nut is used to treat:',
  'Moderate acute malnutrition (MAM) with oedema',
  'Severe acute malnutrition (SAM) without medical complications in outpatient therapeutic care',
  'Overweight and obesity',
  'Vitamin A deficiency only',
  'B',
  'RUTF (e.g., Plumpy''Nut — a peanut-based paste with milk powder, sugar, oil, vitamins, and minerals) is used in Outpatient Therapeutic Care (OTC) for children with SAM (MUAC <11.5 cm or WHZ <-3 SD) without medical complications. It requires no water or preparation, has a long shelf life, and provides ~500 kcal/100g. Children with SAM plus complications (oedema grade 3, medical complications, anorexia) require inpatient F-75/F-100. Kenya MOH SAM Management Guidelines; WHO RUTF Technical Note.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Therapeutic Nutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Oral Rehydration Solution (ORS) is used in nutrition care primarily to:',
  'Treat protein-energy malnutrition',
  'Replace fluids and electrolytes lost in diarrhoea and prevent dehydration',
  'Provide complete nutrition for malnourished children',
  'Treat vitamin deficiency anaemia',
  'B',
  'ORS is a glucose-electrolyte solution (sodium chloride, potassium chloride, sodium citrate, glucose) that exploits glucose-coupled sodium cotransport in the intestine to enhance water absorption even during active diarrhoea (WHO low-osmolarity ORS: Na 75, K 20, Cl 65, citrate 10, glucose 75 mmol/L, osmolarity 245 mOsm/L). It is not a therapeutic food — it does not treat malnutrition. Zinc supplementation is given alongside ORS to reduce severity and duration of diarrhoea. Kenya MOH IMNCI Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Therapeutic Nutrition',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During pregnancy, iron and folate supplementation is recommended to prevent:',
  'Gestational diabetes',
  'Pre-eclampsia',
  'Maternal anaemia and neural tube defects in the baby',
  'Group B streptococcal infection',
  'C',
  'Iron supplementation prevents and treats iron deficiency anaemia of pregnancy (the most common nutritional deficiency in pregnancy globally), reducing maternal morbidity, preterm birth, and low birth weight. Folic acid (folate) taken periconceptionally and in the first trimester prevents neural tube defects (spina bifida, anencephaly) in the fetus. Kenya MOH ANC guidelines: daily iron (60 mg) + folate (0.4 mg) from first ANC visit throughout pregnancy. Kenya MOH ANC Guidelines; WHO Antenatal Care Recommendations.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Nutrition in Pregnancy',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Fats in the diet serve which important function beyond energy provision?',
  'They are the primary source of fibre',
  'They provide the main structural material for muscles',
  'They are essential for absorption of fat-soluble vitamins A, D, E, and K and for cell membrane structure',
  'They are converted directly to glucose for immediate energy',
  'C',
  'Dietary fats (lipids) serve multiple functions: (1) concentrated energy (9 kcal/g), (2) vehicle for fat-soluble vitamins (A, D, E, K), (3) essential fatty acids (omega-3 and omega-6) — not synthesised by the body, (4) phospholipids for cell membrane structure and function, (5) precursors for steroid hormones and bile acids, (6) insulation and organ protection. Sources in Kenya: cooking oils, avocado, nuts, meat fat. Dietary Reference Intakes; Krause''s Nutrition Care Process.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Macronutrients',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Breastfeeding provides a contraceptive effect (LAM) by:',
  'Increasing oestrogen levels',
  'Suppressing ovulation through elevated prolactin levels that inhibit GnRH release',
  'Thickening cervical mucus independently of hormones',
  'Preventing implantation of a fertilised egg',
  'B',
  'LAM works through breastfeeding-induced hyperprolactinaemia: suckling stimulates prolactin release from the anterior pituitary, which suppresses GnRH (gonadotropin-releasing hormone) from the hypothalamus → reduced FSH and LH → anovulation and amenorrhoea. Frequent suckling (day and night) is needed to maintain adequate prolactin. This explains why all three LAM criteria (baby <6 months, exclusive breastfeeding, amenorrhoea) must be met simultaneously. Kenya MOH FP Guidelines; WHO LAM Statement.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Breastfeeding',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A pregnant woman requires approximately how many extra calories per day above her pre-pregnancy needs in the second and third trimesters?',
  '100 kcal/day',
  '500 kcal/day',
  '300 kcal/day',
  '800 kcal/day',
  'C',
  'WHO and FAO recommend an additional approximately 300 kcal/day during the second and third trimesters of pregnancy to support fetal growth, placental development, and maternal tissue expansion. In the first trimester, energy needs are unchanged (or +100 kcal). During lactation, an additional 500 kcal/day is needed. This extra energy should come from nutrient-dense foods — not empty calories. Kenya MOH Antenatal Nutrition Guidelines; WHO/FAO Energy and Protein Requirements.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Nutrition in Pregnancy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Nutrition labelling on food packaging is important because it:',
  'Is only relevant for people with diabetes',
  'Allows consumers to make informed choices about the nutrients, calories, and ingredients in food',
  'Is required only for imported foods',
  'Is irrelevant in low-income settings',
  'B',
  'Nutrition labels on packaged food provide information on: serving size, energy (kcal), macronutrients (fat, saturated fat, carbohydrates, sugars, protein), sodium, and selected micronutrients. They enable consumers to compare products, manage chronic diseases (diabetes, hypertension), and make healthier choices. In Kenya, food labelling is regulated by Kenya Bureau of Standards (KEBS) and the Food, Drugs and Chemical Substances Act. WHO Global Database on the Implementation of Nutrition Action; KEBS Kenya Standard for Nutrition Labelling.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Dietary Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Food Frequency Questionnaire (FFQ) is a dietary assessment tool that:',
  'Records exact food quantities consumed in the past 24 hours',
  'Asks how often a person eats specific foods over a defined period (week/month) to estimate usual dietary patterns',
  'Directly weighs food portions before consumption',
  'Analyses blood samples for nutrient levels',
  'B',
  'The FFQ asks respondents to indicate how frequently they consume a predefined list of foods (e.g., "How many times per week do you eat fish?") over a specified reference period (week, month, or year). It estimates usual dietary patterns and nutrient intake over time. It is less precise than weighed food records but practical for large population studies. It does not measure exact quantities. Used in KDHS and epidemiological nutrition surveys. FAO Dietary Assessment Guide; Kenya Dietary Survey Methods.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Dietary Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Iodised salt is used in Kenya primarily to prevent:',
  'Iron deficiency anaemia',
  'Vitamin A deficiency',
  'Iodine deficiency disorders including goitre and cretinism',
  'Protein-energy malnutrition',
  'C',
  'Universal salt iodisation (USI) is the most cost-effective intervention to prevent iodine deficiency disorders (IDDs): goitre (thyroid enlargement), cretinism (intellectual disability in children of iodine-deficient mothers), hypothyroidism, and impaired cognitive development. In Kenya, iodisation of all food-grade salt is mandatory under the Food, Drugs and Chemical Substances Act. Regular monitoring of urinary iodine excretion tracks population iodine status. Kenya MOH Micronutrient Policy; WHO IDD Prevention Guidelines.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Bitot''s spots, seen as foamy white patches on the conjunctiva, are a sign of:',
  'Iodine deficiency',
  'Iron deficiency anaemia',
  'Vitamin A deficiency',
  'Vitamin D deficiency',
  'C',
  'Bitot''s spots are accumulations of desquamated epithelial cells and secretions on the bulbar conjunctiva, appearing as white foamy/cheesy patches. They are a clinical sign of vitamin A deficiency (xerophthalmia stage XB). They indicate chronic deficiency and risk of progression to corneal involvement. Treatment: high-dose vitamin A capsules (200,000 IU for children >12 months, two doses 24 hours apart, third dose at 2–4 weeks). WHO Vitamin A Deficiency Classification; Kenya VAS Programme.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Micronutrient Deficiencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Kenya dietary guideline recommends that a balanced diet should include:',
  'Only animal proteins and grains',
  'A variety of foods from all food groups — grains, vegetables, fruits, proteins, and dairy — in appropriate proportions',
  'High-fat, high-sugar foods as the main energy source',
  'Avoiding all fats and oils',
  'B',
  'Kenya''s dietary guidelines recommend: (1) eat a variety of foods, (2) base meals on starchy staples (but choose whole grain), (3) eat plenty of vegetables and fruits, (4) include proteins (legumes, fish, eggs, meat, dairy), (5) use fats/oils in moderation (choose unsaturated), (6) limit sugar and salt, (7) drink adequate water. The food plate concept replaces the older pyramid. Balanced intake from all food groups ensures macro- and micronutrient adequacy. Kenya MOH Dietary Guidelines 2017.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Dietary Guidelines',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'F-75 and F-100 therapeutic milks are used in the management of severe acute malnutrition (SAM) because:',
  'They replace breastfeeding in infants under 6 months',
  'F-75 is used in the stabilisation phase (low sodium, low protein to protect the damaged gut and heart), and F-100 is used in the rehabilitation phase (higher energy and protein for catch-up growth)',
  'Both are given simultaneously to maximise weight gain',
  'They are only used in adults with SAM',
  'B',
  'SAM inpatient management phases: (1) Stabilisation (days 1–7): F-75 (75 kcal/100 ml, low sodium 1.3 mmol/100 ml, low protein) — prevents refeeding syndrome, treats hypoglycaemia, hypothermia, infection, electrolyte imbalance, (2) Rehabilitation (weeks 2–6): F-100 (100 kcal/100 ml, higher protein and energy) for rapid catch-up weight gain. Rapid refeeding with high-energy formula in a metabolically unstable child causes refeeding syndrome (fatal cardiac failure). Kenya MOH SAM Management Guidelines; WHO SAM Management Manual.',
  'KRCHN',
  'Paper II',
  'Nutrition',
  'Therapeutic Nutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- RESEARCH & STATISTICS (~20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Quantitative research differs from qualitative research in that quantitative research:',
  'Uses small samples and explores lived experiences through themes',
  'Uses numbers, statistics, and large representative samples to measure and test hypotheses',
  'Always uses focus group discussions',
  'Cannot be used in health research',
  'B',
  'Quantitative research uses numerical data, statistical analysis, large samples, and structured instruments (questionnaires) to measure variables and test hypotheses. It answers "how many?" or "how much?" Qualitative research explores meaning, experiences, and perceptions through words (interviews, focus groups, observation), uses small purposive samples, and answers "why?" or "how?" Both are valid and complementary in health research. Polit & Beck Nursing Research; Kenya MOH Research Guidelines.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Types of Research',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a research study, the variable that is manipulated or considered the cause is called the:',
  'Dependent variable',
  'Confounding variable',
  'Independent variable',
  'Extraneous variable',
  'C',
  'The independent variable (IV) is the presumed cause — what the researcher manipulates or studies as an influence. The dependent variable (DV) is the outcome — what is measured/changes as a result of the IV. Example: a study on the effect of health education (IV) on contraceptive uptake (DV). Confounding variables are extraneous factors that may affect the DV and distort the IV-DV relationship. Polit & Beck Nursing Research.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Types of Variables',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The FIRST step in the research process is:',
  'Data collection',
  'Identifying and formulating the research problem',
  'Writing the literature review',
  'Selecting the sample',
  'B',
  'Research process steps: (1) Identify and define the research problem, (2) Review of literature, (3) Formulate hypothesis/research questions, (4) Design methodology (design, sample, data collection tool), (5) Data collection, (6) Data analysis, (7) Interpretation and discussion of findings, (8) Conclusions and recommendations, (9) Dissemination/report writing. The problem must be identified and clearly stated before any other step. Polit & Beck; Kenya MOH Research Guidelines.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Research Process',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Informed consent in research means:',
  'The researcher signs a form on behalf of the participant',
  'The participant voluntarily agrees to take part after receiving full information about the study including its purpose, risks, and their right to withdraw',
  'Participants must complete the study regardless of their wishes',
  'Only the hospital administrator provides consent',
  'B',
  'Informed consent requires: (1) disclosure — full information about purpose, methods, risks, benefits, confidentiality, (2) comprehension — participant understands, (3) voluntariness — no coercion, (4) competence — participant is capable of deciding, (5) consent — documented agreement (signature or thumbprint). Participants retain the right to withdraw at any time without penalty. It protects human rights and dignity in research. Belmont Report; Kenya National Commission for Science, Technology and Innovation (NACOSTI) Research Ethics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Ethical Principles in Research',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Random sampling ensures that:',
  'Every member of the target population has an equal and independent chance of being selected',
  'The researcher personally selects the most convenient participants',
  'Only volunteers are included in the study',
  'Participants are selected based on specific criteria chosen by the researcher',
  'A',
  'Random (probability) sampling: every individual in the target population has an equal, known, non-zero probability of selection. Types: simple random (lottery/random number table), systematic (every nth person), stratified (divide into strata, then random from each), cluster (random selection of groups). It reduces selection bias and allows generalisation of findings. Convenience sampling = non-random (researcher chooses easy-to-reach people). Purposive = non-random (specific criteria). Polit & Beck.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Sampling Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The mean of the data set 4, 6, 8, 10, 12 is:',
  '6',
  '8',
  '10',
  '12',
  'B',
  'Mean = sum of all values ÷ number of values = (4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8. The mean is the arithmetic average and the most commonly used measure of central tendency. It is sensitive to extreme values (outliers). The median (middle value when ordered) = 8 in this set. The mode = no mode (all values appear once). Basic Statistics; Polit & Beck Nursing Research.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Basic Statistics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The median of the data set 3, 5, 7, 9, 11 is:',
  '5',
  '7',
  '9',
  '11',
  'B',
  'The median is the middle value when data is arranged in ascending order. For 5 values: median = 3rd value = 7 (3, 5, [7], 9, 11). For an even number of values, the median = average of the two middle values. The median is resistant to outliers and preferred for skewed distributions (e.g., income data, hospital stay lengths). Polit & Beck Nursing Research; Basic Biostatistics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Basic Statistics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Nominal data is data that:',
  'Has equal intervals between values and a true zero',
  'Can be ranked or ordered',
  'Consists of categories with no inherent order',
  'Is measured on a continuous scale',
  'C',
  'Levels of measurement: Nominal (categories, no order — blood group A/B/AB/O; gender; religion), Ordinal (categories with rank order but unequal intervals — pain scale 1–10; education level), Interval (equal intervals, no true zero — temperature in °C), Ratio (equal intervals, true zero — weight, height, blood glucose). Nominal is the lowest level — only frequency counts and percentages are appropriate statistics. Polit & Beck; Dawson & Trapp Basic & Clinical Biostatistics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Types of Data',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a research report, the section that describes WHO was studied, HOW they were selected, and HOW data was collected is the:',
  'Abstract',
  'Literature review',
  'Methodology (methods) section',
  'Discussion section',
  'C',
  'Research report components: Abstract (brief summary of the whole study), Introduction (background and problem statement), Literature review (what is already known), Methodology (study design, population, sample and sampling method, data collection tool, data analysis plan, ethical considerations), Results (findings), Discussion (interpretation), Conclusions and Recommendations, References. The methodology is the methods section — the "recipe" for how the study was conducted. Polit & Beck.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Research Report Components',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Confidentiality in research means:',
  'All research findings must be published immediately',
  'The researcher will not disclose participants'' identities or personal information without their consent',
  'Participants must disclose all personal information to other participants',
  'The government has access to all participant data',
  'B',
  'Confidentiality means the researcher keeps all information shared by participants private — data is stored securely, identifiers are removed or anonymised for publications, and findings are reported in aggregate (not naming individuals). It is distinct from anonymity (participant identity is never known to anyone, including the researcher). Both protect participants from harm arising from disclosure. Belmont Report; NACOSTI Kenya Research Ethics Guidelines.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Ethical Principles in Research',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An interview as a data collection method in research has which advantage over a written questionnaire?',
  'It is cheaper and faster to administer to large groups',
  'It allows clarification of questions and is appropriate for participants with low literacy',
  'It completely eliminates interviewer bias',
  'It can be completed anonymously by the participant',
  'B',
  'Interviews (structured, semi-structured, or unstructured) allow the researcher to: clarify ambiguous questions, probe for deeper responses, collect data from participants who cannot read or write, and observe non-verbal communication. Disadvantages: time-consuming, expensive, interviewer bias (responses influenced by the interviewer), limited to smaller samples. Written questionnaires are cheaper and faster for large samples and reduce interviewer bias. Polit & Beck; Kenya Research Methodology.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Data Collection Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A pie chart is most appropriate for displaying:',
  'Trends over time',
  'The proportion/percentage of different categories within a whole',
  'The relationship between two continuous variables',
  'Frequency distribution of continuous data',
  'B',
  'A pie chart (circular chart divided into slices) shows the relative proportions of categories as percentages of a whole (total = 100%). Best used for nominal or ordinal data with a small number of categories (e.g., blood group distribution, causes of maternal mortality). Bar charts show comparisons between categories. Line graphs show trends over time. Scatter plots show relationships between two continuous variables. Dawson & Trapp Basic & Clinical Biostatistics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Data Presentation',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Plagiarism in research refers to:',
  'Collecting data without participant consent',
  'Using another person''s work, ideas, or words without appropriate acknowledgement or citation',
  'Publishing findings before peer review',
  'Using too many references in a report',
  'B',
  'Plagiarism is presenting another person''s intellectual work (text, ideas, data, images) as your own without proper acknowledgement. It is a form of academic and research dishonesty/misconduct. Prevention: proper citation and referencing (APA, Vancouver, Harvard styles), paraphrasing with citation, using plagiarism detection software (Turnitin), and understanding what constitutes intellectual property. NACOSTI Kenya Research Ethics; Kenya Universities Academic Integrity Policies.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Research Ethics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The mode in a data set is:',
  'The average of all values',
  'The middle value when arranged in order',
  'The value that appears most frequently',
  'The difference between the highest and lowest values',
  'C',
  'Mode = the value that occurs most frequently in a data set. Example: in (3, 5, 5, 7, 9), the mode = 5. A data set can be bimodal (two modes) or have no mode. The mode is the only measure of central tendency appropriate for nominal data. Mean = arithmetic average. Median = middle value. Range = highest minus lowest. Basic Statistics; Polit & Beck Nursing Research.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Basic Statistics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hypothesis in research is:',
  'The final conclusion of a study',
  'A testable statement predicting the expected relationship between variables',
  'A review of existing literature',
  'The sampling method used in a study',
  'B',
  'A hypothesis is a tentative, testable statement (prediction) about the expected relationship or difference between the independent and dependent variables before the study is conducted. Example: "Mothers who attend ANC ≥4 times have higher immunisation completion rates than mothers who attend <4 times." A null hypothesis states no relationship (H0); an alternative hypothesis states a relationship (H1). It guides the study design and data analysis. Polit & Beck Nursing Research.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Research Process',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Purposive sampling means the researcher:',
  'Selects participants randomly from the population',
  'Selects participants because they meet specific criteria relevant to the research question',
  'Selects the first available participants for convenience',
  'Uses a computer to assign random numbers to participants',
  'B',
  'Purposive (judgmental) sampling is a non-probability sampling method where the researcher intentionally selects participants who have specific knowledge, experience, or characteristics relevant to the research question. It is commonly used in qualitative research (e.g., selecting nurses who have cared for TB patients for an interview study on TB stigma). It allows in-depth exploration but findings cannot be generalised to the broader population. Polit & Beck Nursing Research; Kenya Qualitative Research Methods.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Sampling Methods',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The principle of "do no harm" (non-maleficence) in research ethics means:',
  'Participants must benefit financially from the study',
  'The researcher must ensure that the study does not expose participants to physical, psychological, social, or legal harm',
  'Researchers are not responsible for adverse events during data collection',
  'Harmful studies are permitted if the benefit to society is large enough',
  'B',
  'Non-maleficence (do no harm) is one of four Belmont Report principles (autonomy, beneficence, non-maleficence, justice). Researchers must: identify possible harms (physical, psychological, social, economic, legal), minimise them, discontinue the study if unexpected harm emerges, provide support resources if participants become distressed (e.g., referral for counselling), and get ethics committee approval before starting. It applies especially to vulnerable populations (children, prisoners, mentally ill). NACOSTI Kenya; Belmont Report.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Ethical Principles in Research',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A bar graph is most suitable for comparing:',
  'Proportions of a whole as percentages',
  'Trends in a continuous variable over time',
  'Frequencies or amounts across different categories',
  'The correlation between two continuous variables',
  'C',
  'Bar graphs use rectangular bars (vertical or horizontal) with heights/lengths proportional to the values being compared. They are ideal for comparing frequencies, counts, or means across discrete categories (e.g., comparing vaccine coverage rates across counties, or comparing ANC attendance by age group). Pie charts = proportions of a whole. Line graphs = trends over time. Scatter plots = correlation between continuous variables. Dawson & Trapp Basic & Clinical Biostatistics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Data Presentation',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Literature review in the research process serves to:',
  'Collect primary data from research participants',
  'Show what is already known about the topic, identify gaps, and provide a theoretical framework for the study',
  'Present the study findings to stakeholders',
  'Describe the demographic characteristics of the study sample',
  'B',
  'The literature review (secondary data analysis of published research, books, reports, government documents) serves to: (1) establish what is already known, (2) identify knowledge gaps that the study will address, (3) avoid duplication of research, (4) provide a theoretical/conceptual framework, (5) justify the relevance of the study. It is conducted after identifying the research problem and before designing the methodology. Polit & Beck; Kenya MOH Research Framework.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Research Report Components',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The range as a measure of data spread is calculated as:',
  'The middle value minus the lowest value',
  'The highest value minus the lowest value',
  'The sum of all values divided by the number of values',
  'The most frequently occurring value',
  'B',
  'Range = highest value − lowest value. It measures the spread (dispersion) of data. Example: data set (4, 6, 8, 10, 12) → Range = 12 − 4 = 8. The range is simple to calculate but sensitive to extreme values (outliers). More robust measures of spread: Interquartile Range (IQR = Q3 − Q1), Standard Deviation (SD), Variance. Mean = sum/n. Median = middle value. Mode = most frequent. Polit & Beck; Basic Biostatistics.',
  'KRCHN',
  'Paper II',
  'Research & Statistics',
  'Basic Statistics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ============================================================
-- BScN Paper II — MENTAL HEALTH NURSING (25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a Mental State Examination (MSE), a patient describes hearing voices that comment on their actions. Under which MSE domain is this finding documented?',
  'Mood',
  'Thought content',
  'Perception',
  'Insight',
  'C',
  'Auditory hallucinations — perceptions without external stimulus — are documented under the Perception domain of the MSE. Third-person running commentary voices are a first-rank symptom of schizophrenia (Schneiderian). Thought content documents delusions; mood documents subjective and objective affect; insight documents awareness of illness. Kaplan & Sadock''s Synopsis of Psychiatry; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mental State Examination',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on clozapine therapy develops a white blood cell count of 2,800 cells/mm³ at week 10 of treatment. What is the most appropriate immediate action?',
  'Reduce the clozapine dose by 50%',
  'Discontinue clozapine immediately and refer to haematology',
  'Continue clozapine and recheck FBC in two weeks',
  'Switch to olanzapine and continue weekly monitoring',
  'B',
  'Clozapine causes agranulocytosis in approximately 1–2% of patients. Weekly FBC is mandatory for the first 18 weeks, then fortnightly, then monthly. A WBC below 3,000/mm³ or neutrophils below 1,500/mm³ requires immediate discontinuation of clozapine and urgent haematology referral. Rechallenge is contraindicated after agranulocytosis. Kenya MOH Mental Health Drug Use Guidelines; Maudsley Prescribing Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Antipsychotics',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient stabilised on lithium maintenance therapy has a serum lithium level of 0.9 mmol/L. How should the nurse interpret this result?',
  'Toxic level — hold next dose and notify physician',
  'Sub-therapeutic — increase dose immediately',
  'Therapeutic — continue current regimen',
  'Normal for acute mania but insufficient for maintenance',
  'C',
  'The therapeutic range for lithium in maintenance therapy is 0.6–1.2 mmol/L (some sources 0.6–1.0 for elderly). A level of 0.9 mmol/L is within the therapeutic maintenance range. Levels for acute mania treatment are higher (0.8–1.2 mmol/L). Toxicity begins above 1.5 mmol/L. Monitoring is done 12 hours post-dose. Kenya MOH Mental Health Guidelines; Maudsley Prescribing Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Mood Stabilisers',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on lithium therapy presents with coarse tremor, vomiting, ataxia, and confusion. Serum lithium is 2.3 mmol/L. What is the priority management?',
  'Administer activated charcoal and discharge',
  'Stop lithium, initiate IV hydration, monitor renal function, arrange renal support if needed',
  'Reduce lithium dose by half and recheck level in 24 hours',
  'Administer dialysate as first-line treatment without awaiting renal review',
  'B',
  'Lithium toxicity (levels >2.0 mmol/L with symptoms) requires immediate cessation of lithium, aggressive IV hydration with normal saline (enhances renal lithium excretion), continuous cardiac monitoring, and renal support readiness. There is no specific antidote. Haemodialysis is indicated for severe toxicity (levels >2.5–3.0 mmol/L or refractory symptoms). Kenya MOH Clinical Guidelines; Maudsley Prescribing Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Mood Stabilisers',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient prescribed an SSRI and tramadol develops hyperthermia, clonus, diaphoresis, and agitation within hours of starting tramadol. Which condition should the nurse recognise?',
  'Neuroleptic malignant syndrome',
  'Serotonin syndrome',
  'Anticholinergic toxidrome',
  'Lithium toxicity',
  'B',
  'Serotonin syndrome results from excess serotonergic activity, typically from combining SSRIs with other serotonergic agents (tramadol, triptans, linezolid). Classic triad: mental status changes (agitation/confusion), autonomic instability (hyperthermia, diaphoresis, tachycardia), and neuromuscular abnormalities (clonus, hyperreflexia, tremor). Management: stop causative agent, supportive care, cyproheptadine (5-HT2A antagonist). NMS lacks clonus and has slower onset. Kaplan & Sadock; Kenya MOH.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Adverse Effects',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Using the Columbia Suicide Severity Rating Scale (C-SSRS), which finding places a patient in the highest risk category requiring immediate intervention?',
  'Passive ideation with no intent or plan',
  'Active ideation with intent and a specific plan with means available',
  'History of suicidal ideation two years ago with no current ideation',
  'Suicidal ideation occurring once per week with no plan or intent',
  'B',
  'The Columbia Protocol (C-SSRS) stratifies suicide risk. Active ideation with intent, a specific plan, and available means represents the highest imminent risk category requiring immediate psychiatric evaluation, safe environment, and crisis intervention. Passive ideation (wanting to be dead) without plan or intent is lower risk. The C-SSRS is the gold standard tool used in Kenya MOH mental health services. Posner et al.; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Suicide Risk Assessment',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient undergoing alcohol withdrawal is assessed using the CIWA-Ar scale and scores 22. Which intervention is most appropriate?',
  'Discharge with oral diazepam and follow-up in one week',
  'Administer lorazepam PRN and monitor every 4 hours',
  'Admit for intensive monitoring, IV benzodiazepine therapy, thiamine, and close observation',
  'Reassure the patient and administer oral thiamine only',
  'C',
  'A CIWA-Ar score ≥15 indicates severe alcohol withdrawal requiring inpatient management. Scores ≥20 carry high risk of withdrawal seizures and delirium tremens. Management includes IV/IM benzodiazepines (diazepam or lorazepam) using symptom-triggered or fixed-schedule protocol, IV thiamine (before glucose), electrolyte correction, and close neurological monitoring. Oral-only therapy is inadequate. Kenya MOH Alcohol Withdrawal Protocol; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is scheduled for electroconvulsive therapy (ECT). Which pre-procedure nursing intervention is the priority?',
  'Administer a muscle relaxant independently before the procedure',
  'Ensure the patient has been NBM for 4–6 hours, dentures removed, informed consent obtained, and IV access secured',
  'Apply a full-body restraint to prevent injury during the seizure',
  'Encourage the patient to eat a light meal 1 hour before to prevent hypoglycaemia',
  'B',
  'Pre-ECT nursing care includes: NBM for 4–6 hours (aspiration risk), removal of dentures, jewellery, and nail polish, verification of written informed consent, baseline vital signs, IV access, bladder voiding, and patient education. ECT is performed under brief general anaesthesia with a muscle relaxant (succinylcholine) administered by anaesthesia — not by nursing independently. Full restraints are contraindicated. Kenya MOH ECT Guidelines; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'ECT and Brain Stimulation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'After receiving ECT, a patient is confused and does not remember being in the hospital. How should the nurse respond?',
  'Immediately notify the physician of a probable cerebrovascular accident',
  'Reassure the patient that post-ECT confusion and short-term memory impairment are normal and usually transient',
  'Perform a full neurological examination and document a suspected delirium',
  'Administer a benzodiazepine to reduce the patient''s distress',
  'B',
  'Post-ictal confusion and transient anterograde/retrograde amnesia are expected, normal sequelae of ECT. The nurse should orient and reassure the patient in a calm environment and monitor vital signs. Confusion typically resolves within 30–60 minutes. Persistent or deteriorating consciousness warrants medical review. This is not an emergency requiring medication. Kenya MOH ECT Guidelines; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'ECT and Brain Stimulation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which principle is most fundamental to a therapeutic milieu in a psychiatric inpatient unit?',
  'Strict enforcement of rules to maintain order and control',
  'Creating a safe, structured environment that promotes therapeutic relationships and patient autonomy',
  'Limiting patient social interactions to prevent symptom exacerbation',
  'Ensuring patients remain in their rooms to allow adequate rest and medication response',
  'B',
  'A therapeutic milieu is a structured, safe environment where all aspects of the social milieu are used therapeutically. Core principles include safety, structure, norms, limits, balance between freedom and restriction, and therapeutic relationships between staff and patients. It empowers patients, promotes reality orientation, and supports recovery. Isolation and rigid control undermine milieu therapy. Kaplan & Sadock; Kenya MOH Mental Health Inpatient Standards.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Environment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is providing psychoeducation to the family of a patient with schizophrenia. Which information is most important to include?',
  'The patient should be kept at home at all times to prevent relapse',
  'Medication adherence is critical; early warning signs of relapse include sleep disturbance, social withdrawal, and increased irritability',
  'Schizophrenia is caused by poor parenting and family dysfunction',
  'The patient will recover fully within six months if medication is taken correctly',
  'B',
  'Family psychoeducation for schizophrenia focuses on: medication adherence (reduces relapse risk by 50%), recognising early warning signs of relapse (sleep changes, withdrawal, irritability), reducing expressed emotion (criticism/hostility in family), problem-solving skills, and crisis planning. Schizophrenia is a neurodevelopmental disorder, not caused by parenting. Full recovery is not guaranteed. Kenya MOH Mental Health Guidelines; NICE Psychosis Guideline.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychoeducation — Schizophrenia',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with schizophrenia refuses medication citing lack of insight. Which MSE domain reflects this finding?',
  'Affect',
  'Cognition',
  'Insight',
  'Judgement',
  'C',
  'Insight in the MSE refers to the patient''s awareness and understanding of their illness, its symptoms, and the need for treatment. Poor insight (anosognosia) is common in schizophrenia and a major barrier to medication adherence. It is documented under the Insight domain. Judgement refers to decision-making ability. Kaplan & Sadock; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mental State Examination',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which finding on the MSE is most consistent with a major depressive episode?',
  'Elevated mood, pressured speech, and decreased need for sleep',
  'Flat affect, psychomotor retardation, and poverty of thought',
  'Auditory hallucinations and loosening of associations',
  'Grandiose delusions and flight of ideas',
  'B',
  'Major depressive episode features include depressed mood, anhedonia, psychomotor retardation (slowed movement and thought), poverty of thought (reduced verbal output), flat/blunted affect, hopelessness, and vegetative symptoms (sleep, appetite, libido disturbance). Elevated mood, pressured speech, and grandiosity suggest mania. Hallucinations and loosening of associations suggest psychosis. DSM-5; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mood Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient taking an MAOI antidepressant eats a tyramine-rich meal. Which acute complication should the nurse anticipate?',
  'Hypoglycaemia',
  'Hypertensive crisis',
  'Serotonin syndrome',
  'QT prolongation',
  'B',
  'MAOIs inhibit monoamine oxidase, which normally breaks down tyramine in the gut and liver. Ingestion of tyramine-rich foods (aged cheese, red wine, cured meats, fermented foods) causes massive noradrenaline release, precipitating a hypertensive crisis (severe headache, hypertension, palpitations, risk of intracranial haemorrhage). Patients must receive a written tyramine-restricted diet list. Kaplan & Sadock; Maudsley Prescribing Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Antidepressants',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse documents that a patient''s speech is characterised by moving rapidly from one topic to another with loose connections between ideas. Which term accurately describes this finding?',
  'Perseveration',
  'Circumstantiality',
  'Flight of ideas',
  'Thought blocking',
  'C',
  'Flight of ideas is a form of formal thought disorder seen in mania, characterised by rapid, continuous speech moving quickly between loosely connected topics, often following tangential associations or rhymes. Perseveration is repetitive repetition of a word/theme. Circumstantiality reaches the goal via excessive detail. Thought blocking is sudden cessation of thought. Kaplan & Sadock; DSM-5.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mental State Examination',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nursing intervention is most therapeutic when a patient with schizophrenia reports hearing voices telling them to harm themselves?',
  'Argue with the patient that the voices are not real',
  'Ignore the report and document it without responding',
  'Acknowledge the patient''s distress, assess safety, implement observation level, and notify the psychiatrist',
  'Immediately administer a PRN antipsychotic without assessment',
  'C',
  'The therapeutic response to command hallucinations includes: acknowledging the patient''s distress without reinforcing or arguing about the hallucinations, conducting a thorough safety assessment (intent, plan, means), escalating the observation level if required, documenting, and notifying the psychiatrist. PRN medication requires assessment and physician order. Arguing about the hallucinations is non-therapeutic and damages rapport. Kenya MOH Mental Health Inpatient Standards; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Nursing Interventions',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on haloperidol develops sustained neck twisting, eye deviation upward, and muscle spasms of the jaw. Which condition is this, and what is the immediate treatment?',
  'Tardive dyskinesia; reduce haloperidol dose',
  'Acute dystonic reaction; administer IM procyclidine or benztropine',
  'Akathisia; administer propranolol',
  'Neuroleptic malignant syndrome; administer dantrolene',
  'B',
  'Acute dystonic reaction is an extrapyramidal side effect of antipsychotics (especially typical antipsychotics like haloperidol), presenting within hours to days as involuntary muscle contractions: torticollis (neck twisting), oculogyric crisis (eye deviation), trismus (jaw spasm). Treatment is IM or IV anticholinergic: procyclidine 5–10 mg or benztropine 2 mg. NMS has hyperthermia, lead-pipe rigidity, and autonomic instability. Akathisia is inner restlessness. Maudsley Prescribing Guidelines; Kenya MOH.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychopharmacology — Adverse Effects',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the most evidence-based psychological intervention for post-traumatic stress disorder (PTSD)?',
  'Psychodynamic therapy focused on childhood relationships',
  'Trauma-focused cognitive behavioural therapy (TF-CBT)',
  'Supportive counselling without trauma processing',
  'Hypnotherapy as the first-line treatment',
  'B',
  'Trauma-focused CBT (TF-CBT) and EMDR (Eye Movement Desensitisation and Reprocessing) are the first-line evidence-based psychological treatments for PTSD per NICE guidelines and WHO mhGAP. TF-CBT involves trauma narrative processing, cognitive restructuring of trauma-related cognitions, and exposure techniques. Supportive counselling alone is insufficient. Hypnotherapy lacks robust evidence for PTSD. Kenya MOH Mental Health mhGAP adaptation.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Trauma and PTSD',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is assessing a patient with suspected alcohol use disorder. Which screening tool is most appropriate?',
  'PHQ-9 (Patient Health Questionnaire)',
  'GAD-7 (Generalised Anxiety Disorder scale)',
  'AUDIT (Alcohol Use Disorders Identification Test)',
  'MMSE (Mini-Mental State Examination)',
  'C',
  'The AUDIT (Alcohol Use Disorders Identification Test), developed by WHO, is the gold standard brief screening tool for alcohol use disorders, covering consumption, dependence symptoms, and harmful consequences in 10 questions. AUDIT-C is a 3-item rapid version. PHQ-9 screens for depression; GAD-7 for anxiety; MMSE for cognitive impairment. Kenya MOH Alcohol Use Disorder Guidelines; WHO AUDIT tool.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When caring for an acutely manic patient, which environment modification best promotes safety and reduces stimulation?',
  'Place the patient in a room near the nursing station with constant background music',
  'Provide a quiet, low-stimulation environment with consistent limits and minimal staff changes',
  'Encourage the patient to participate in all group activities to channel excess energy',
  'Allow the patient unlimited freedom of movement to prevent frustration',
  'B',
  'Mania is characterised by hyperarousal and disinhibition. Environmental management includes: quiet, low-stimulation room, reduced sensory input, consistent nursing staff (reduces unpredictability), clear firm limits, adequate sleep environment, and monitoring for exhaustion and dehydration (patients may not sleep or eat). Group activities may worsen agitation in acute mania. Kaplan & Sadock; Kenya MOH Inpatient Mental Health Standards.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Bipolar Disorder Nursing Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with borderline personality disorder engages in self-cutting following a difficult therapy session. What is the priority nursing assessment?',
  'Determine whether the patient is seeking attention',
  'Assess wound depth, intent to die, current suicidal ideation, and level of distress',
  'Apply a dressing and document without further assessment',
  'Confront the patient about the maladaptive nature of cutting',
  'B',
  'Self-harm in BPD requires immediate assessment of: medical severity (wound depth, bleeding), suicidal intent (was death intended?), current suicidal ideation, triggers, and emotional distress level. Safe management follows. Self-harm is often a dysregulation strategy without suicidal intent, but each episode must be clinically evaluated. Confrontational or dismissive responses are harmful and therapeutically contraindicated. NICE BPD Guideline; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Personality Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which statement best describes the concept of ''expressed emotion'' in the context of schizophrenia relapse prevention?',
  'Emotional expression during therapy sessions is encouraged to promote insight',
  'High levels of criticism, hostility, and emotional over-involvement in families increase relapse risk',
  'Patients with schizophrenia should suppress all emotional expression to reduce psychotic symptoms',
  'Expressed emotion refers to the patient''s ability to articulate their emotions during an MSE',
  'B',
  'Expressed Emotion (EE) is a measure of the emotional climate in a patient''s family environment. High EE (critical comments, hostility, emotional over-involvement) is a robust predictor of schizophrenia relapse. Family psychoeducation programmes targeting reduction of high EE have strong evidence for preventing relapse. Families should be engaged as therapeutic partners. Brown & Rutter; Kaplan & Sadock; Kenya MOH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychoeducation — Schizophrenia',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with severe anorexia nervosa (BMI 14 kg/m²) is admitted. Which immediate nursing priority best reflects the biopsychosocial approach?',
  'Begin a structured behavioural feeding programme and provide psychoeducation about weight restoration goals',
  'Conduct detailed cognitive restructuring of eating disorder cognitions before initiating refeeding',
  'Perform physical assessment (cardiac monitoring, electrolytes, ECG) and initiate structured nutritional rehabilitation with refeeding precautions',
  'Administer a nasogastric feed at full caloric target on day one to accelerate weight restoration',
  'C',
  'At BMI <15 kg/m², medical complications are life-threatening: bradycardia, hypotension, electrolyte abnormalities, and refeeding syndrome risk. Priority is physical stabilisation: ECG (QT interval), electrolytes (K, Mg, P), physical assessment, and cautious nutritional rehabilitation starting at low calories (10 kcal/kg/day) with daily monitoring to prevent refeeding syndrome. Psychotherapy follows once medically stable. High-calorie feeds immediately risk fatal refeeding syndrome. MARSIPAN Guidelines; Kenya MOH.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Eating Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which best describes the nurse''s therapeutic use of self in mental health nursing?',
  'Sharing personal problems with patients to build trust and equality',
  'Using one''s personality, insights, perceptions, and communication skills intentionally as a treatment tool',
  'Maintaining strict professional distance and avoiding any personal interaction',
  'Offering advice and solutions to the patient''s problems based on personal experience',
  'B',
  'Therapeutic use of self is the deliberate, intentional use of the nurse''s personality, communication skills, empathy, and clinical self-awareness as a therapeutic instrument within the nurse-patient relationship. It requires self-awareness, supervision, and professional boundaries. Sharing personal problems (self-disclosure beyond therapeutic purpose) breaches boundaries. Peplau''s Interpersonal Relations in Nursing; Kenya MOH Mental Health Nursing Standards.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Relationship',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with generalised anxiety disorder (GAD) asks the nurse why they have been prescribed sertraline. What is the most accurate explanation?',
  'Sertraline is a sedative that will make you feel calm immediately',
  'Sertraline is an SSRI that modulates serotonin pathways; full therapeutic effect for anxiety takes 4–6 weeks and it should not be stopped suddenly',
  'Sertraline works by increasing dopamine levels to improve your mood quickly',
  'Sertraline is a benzodiazepine used for short-term anxiety relief',
  'B',
  'SSRIs (sertraline, escitalopram) are first-line pharmacotherapy for GAD. They modulate serotonergic neurotransmission. Full anxiolytic effect takes 4–6 weeks; patients should be counselled not to expect immediate relief and not to discontinue abruptly (discontinuation syndrome risk). Benzodiazepines are short-term adjuncts, not first-line for GAD long-term. Maudsley Prescribing Guidelines; NICE GAD Guideline; Kenya MOH.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Anxiety Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — INFECTION PREVENTION AND CONTROL (20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ventilated ICU patient develops a new fever, purulent tracheal secretions, and a new pulmonary infiltrate on day 5. Which bundle element is most critical to address immediately to prevent further VAP?',
  'Increase the frequency of endotracheal suctioning to every hour',
  'Evaluate readiness for extubation and perform a spontaneous breathing trial',
  'Change the ventilator circuit every 24 hours',
  'Administer prophylactic antifungal therapy',
  'B',
  'The VAP prevention bundle includes: HOB elevation 30–45°, oral care with 0.12% chlorhexidine twice daily, ETT cuff pressure monitoring (20–30 cmH2O), subglottic secretion drainage, and daily sedation interruption with spontaneous breathing trial (SBT) to assess readiness for early extubation — the single most effective strategy to reduce VAP risk. Ventilator circuits are changed only when visibly soiled. Kenya MOH IPC Bundle Standards; IHI VAP Bundle.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'VAP Prevention Bundle',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which combination of interventions constitutes the evidence-based CLABSI prevention bundle?',
  'Hand hygiene, full sterile barrier, chlorhexidine skin prep, optimal insertion site, and daily necessity review',
  'Hand hygiene, sterile gloves only, povidone iodine prep, and weekly line change',
  'Full barrier precautions, subclavian site only, and mandatory line change every 72 hours',
  'Chlorhexidine prep, antibiotic-impregnated catheter as first-line, and remove line after 48 hours',
  'A',
  'The CLABSI prevention bundle (per CDC/IHI and Kenya MOH IPC Guidelines) comprises five elements: (1) hand hygiene, (2) maximal sterile barrier precautions during insertion (cap, mask, sterile gown, sterile gloves, full drape), (3) chlorhexidine 2% skin antisepsis, (4) optimal catheter site selection (subclavian preferred; avoid femoral), and (5) daily review of line necessity and prompt removal when no longer needed. Routine line changes are not recommended.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'CLABSI Prevention Bundle',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A catheterised patient develops a fever, suprapubic pain, and cloudy urine on day 4 post-insertion. Which CAUTI prevention measure should have been most prioritised to prevent this complication?',
  'Changing the urinary catheter every 48 hours to prevent biofilm accumulation',
  'Daily review of catheter necessity and removing the catheter at the earliest appropriate opportunity',
  'Irrigating the catheter with chlorhexidine solution twice daily',
  'Using a 3-way catheter with continuous bladder irrigation prophylactically',
  'B',
  'The most critical CAUTI prevention strategy is removing the catheter as soon as it is no longer clinically necessary. The risk of CAUTI increases with each day of catheterisation (3–7% per day). Other bundle components include: aseptic insertion technique, closed drainage system maintenance, keeping the drainage bag below bladder level, adequate hydration, and daily review. Routine irrigation, antiseptic instillation, and scheduled catheter changes are not recommended. Kenya MOH IPC Guidelines; CDC CAUTI Prevention.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'CAUTI Prevention Bundle',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'According to the Spaulding classification, how should a rigid bronchoscope used to visualise airways be decontaminated?',
  'Low-level disinfection with 70% alcohol wipe',
  'Intermediate-level disinfection with a phenolic compound',
  'High-level disinfection or sterilisation',
  'Standard cleaning only as it does not contact sterile tissue',
  'C',
  'The Spaulding classification categorises reusable medical equipment by infection risk: Critical items (enter sterile tissue/bloodstream) require sterilisation; Semi-critical items (contact intact mucous membranes) require high-level disinfection (HLD) or sterilisation; Non-critical items (contact intact skin) require low-level disinfection. A bronchoscope contacts intact mucous membranes (semi-critical) and requires minimum HLD with glutaraldehyde or peracetic acid. Kenya MOH IPC Decontamination Guidelines; Rutala & Weber.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Decontamination — Spaulding Classification',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A meta-analysis comparing chlorhexidine 2% versus povidone iodine for central venous catheter site preparation concludes that chlorhexidine is superior. What is the primary reason for this finding?',
  'Povidone iodine is more expensive and less available in Kenyan hospitals',
  'Chlorhexidine has residual antimicrobial activity that persists on the skin after application',
  'Povidone iodine is inactivated by sunlight and cannot be used in open wards',
  'Chlorhexidine is colourless, making it easier to see the insertion site',
  'B',
  'Chlorhexidine gluconate 2% (in 70% isopropyl alcohol) demonstrates superior efficacy for vascular catheter site antisepsis compared to povidone iodine because of its persistent residual antimicrobial activity — it binds to skin proteins and continues to kill organisms after application. Povidone iodine lacks this residual effect. Evidence from Chaiyakunapruk et al. meta-analysis supports CHX 2% as preferred agent per CDC CLABSI guidelines and Kenya MOH IPC Standards.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Skin Antisepsis',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with MRSA wound infection is admitted. Which infection control precautions are required in addition to standard precautions?',
  'Airborne precautions with N95 respirator',
  'Contact precautions: single room, gloves and gown on entry, dedicated equipment',
  'Droplet precautions: surgical mask within 1 metre of patient',
  'Protective isolation to protect the MRSA patient from other organisms',
  'B',
  'MRSA is transmitted by direct and indirect contact with colonised or infected skin, wounds, or contaminated surfaces. Contact precautions are required: single room (or cohort with other MRSA patients), gloves and apron/gown worn on entry, hand hygiene on entry and exit, and dedicated or decontaminated patient equipment. N95 is not required for MRSA (not airborne). Protective isolation is for immunocompromised patients. Kenya MOH IPC Guidelines; WHO Core Components.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Transmission-Based Precautions',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is assigned to care for a patient with sputum smear-positive pulmonary tuberculosis. Which respiratory protection is required, and must be verified before patient contact?',
  'A surgical mask is adequate for all TB care',
  'An N95 or equivalent FFP2 respirator that has been fit-tested',
  'A powered air-purifying respirator (PAPR) is the only acceptable protection',
  'A double-layered surgical mask is equivalent to an N95 for TB',
  'B',
  'Pulmonary TB is transmitted via airborne droplet nuclei (particle size <5 microns) that remain suspended in air. Airborne precautions require: N95 or FFP2 respirator (not a surgical mask) that has been fit-tested to the individual wearer to ensure adequate seal. Surgical masks do not filter particles <5 microns. The patient should be in a negative-pressure room (or well-ventilated room with ≥6 air changes/hour). Kenya MOH TB IPC Guidelines; WHO TB Guidelines 2022.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Airborne Precautions — TB',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A sharp contaminated with HIV-positive blood is discarded incorrectly, causing a needle-stick injury to a cleaner. What is the correct initial management sequence?',
  'Immediately report to HR and complete an incident form only',
  'Wash the wound with soap and water, encourage bleeding, report to the infection control officer, complete a PEP assessment, and start TDF+3TC+DTG within 72 hours for 28 days',
  'Wash with chlorhexidine solution and apply a tourniquet above the injury site',
  'Begin PEP with a single antiretroviral agent for 14 days',
  'B',
  'Post-exposure prophylaxis (PEP) protocol for needle-stick from HIV-positive source: (1) Wash wound immediately with soap and running water, allow to bleed freely — do NOT apply tourniquet or suction; (2) Report immediately to supervisor and occupational health/IPC officer; (3) Risk assessment; (4) Start three-drug PEP (TDF+3TC+DTG — preferred Kenya MOH regimen) within 72 hours; (5) Continue for 28 days; (6) HIV testing at baseline, 6 weeks, 3 months. Kenya MOH HIV PEP Guidelines 2022; WHO PEP Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Needle-Stick PEP Protocol',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which colour-coded waste bag is used for infectious and pathological waste in Kenya, according to the Kenya MOH healthcare waste management guidelines?',
  'Black bag',
  'Red bag',
  'Yellow bag',
  'Green bag',
  'C',
  'Kenya MOH Healthcare Waste Management Guidelines specify: Yellow = infectious waste (soiled dressings, body fluids, laboratory waste) and pathological waste (tissue, organs, placentas) — incinerate; Red = chemical/pharmaceutical waste — specialist disposal; Black/clear = general domestic waste — municipal landfill; Sharps in yellow or red sharps-proof containers. Yellow bags must be securely tied at 2/3 full and incinerated. Kenya MOH HCWM Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Healthcare Waste Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse notes that the indwelling urinary catheter of a long-term patient no longer drains freely despite repositioning. Which explanation related to catheter biofilm best explains this finding?',
  'The catheter balloon has deflated, allowing the catheter to migrate',
  'Biofilm of adherent polymicrobial organisms on the catheter inner surface causes encrustation and blocked drainage',
  'The catheter has dissolved due to prolonged contact with urine',
  'The closed drainage system prevents adequate drainage unless the bag is changed daily',
  'B',
  'Biofilm formation on urinary catheters begins within hours of insertion. Organisms adhere to the catheter surface, produce a polysaccharide matrix, and multiply within the protected biofilm environment, leading to encrustation (especially with urease-producing organisms like Proteus mirabilis that alkalinise urine), blocked drainage, and resistant infection. Prevention: maintain closed system, adequate hydration, prompt removal, and consideration of silver-alloy catheters for high-risk patients. Kenya MOH IPC Guidelines; CAUTI Prevention.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Biofilm and CAUTI',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse performs a 6-step hand hygiene procedure. In which order should the steps be performed after applying soap?',
  'Palm to palm → interlaced fingers → backs of fingers → thumbs → fingertips → wrists',
  'Wrists → palm to palm → backs of fingers → thumbs → interlaced fingers → fingertips',
  'Fingertips → thumbs → interlaced → back of fingers → palm → wrists',
  'Palm to palm → backs of hands → interlaced fingers → backs of fingers → thumbs → fingertips',
  'D',
  'WHO 6-step hand hygiene technique: (1) Palm to palm; (2) Right palm over left dorsum with interlaced fingers, and vice versa (backs of hands); (3) Palm to palm, fingers interlaced; (4) Backs of fingers to opposing palms with fingers interlocked; (5) Rotational rubbing of right thumb clasped in left palm, and vice versa; (6) Rotational rubbing with clasped fingers of right hand in left palm, and vice versa. Total duration: 40–60 seconds with soap, 20–30 seconds with ABHR. Kenya MOH IPC Hand Hygiene Guidelines; WHO 2009.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Hand Hygiene',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An infection control audit reveals that post-procedure hand hygiene compliance in the surgical ward is 38%. Which quality improvement strategy has the strongest evidence for improving hand hygiene compliance?',
  'Sending a memo to all staff reminding them of the policy',
  'Multimodal improvement programme: system change + training + reminders + performance feedback + institutional safety climate',
  'Discipline all non-compliant staff with a formal warning letter',
  'Install more handwashing sinks in the ward',
  'B',
  'WHO and Kenya MOH evidence-based hand hygiene improvement programmes use a multimodal strategy (5 components): (1) System change (ensure ABHR/soap/water availability at point of care); (2) Training and education; (3) Observation and performance feedback (audit + public display of compliance rates); (4) Reminders/cues at point of care; (5) Institutional safety climate (leadership engagement). Single strategies (memos, sinks alone, discipline) have weak evidence. WHO Multimodal Hand Hygiene Improvement Strategy.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Quality Improvement in IPC',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which of the following is a correct application of the WHO 5 Moments for Hand Hygiene in clinical practice?',
  'Moment 3 (after touching patient surroundings) requires hand hygiene even if gloves were worn',
  'Hand hygiene is only required before clean/aseptic procedures and after body fluid exposure risk',
  'Gloves worn during care eliminate the need for hand hygiene at the 5 moments',
  'Hand hygiene at Moment 1 (before touching the patient) can be omitted if gloves are applied immediately',
  'A',
  'WHO 5 Moments: (1) Before patient contact; (2) Before clean/aseptic procedure; (3) After body fluid exposure risk; (4) After patient contact; (5) After contact with patient surroundings. Moment 5 — after touching patient surroundings — requires hand hygiene to prevent transfer of organisms from the patient environment to other areas, even if the nurse did not touch the patient directly and wore gloves. Gloves do NOT replace hand hygiene; HH is required after glove removal. WHO 5 Moments for Hand Hygiene; Kenya MOH IPC.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Hand Hygiene — WHO 5 Moments',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A surgical patient develops a sternal wound infection two weeks post-coronary artery bypass graft. Which category of healthcare-associated infection is this, and what is the most important preventive measure?',
  'Ventilator-associated pneumonia; oral chlorhexidine',
  'Surgical site infection; preoperative skin antisepsis and appropriate antimicrobial prophylaxis',
  'Catheter-associated UTI; early catheter removal',
  'Central line-associated bloodstream infection; maximal sterile barrier precautions',
  'B',
  'Surgical site infections (SSIs) are healthcare-associated infections occurring within 30 days of surgery (or 90 days if implant present). For sternal wound after CABG, key prevention includes: appropriate antimicrobial prophylaxis (cefazolin within 60 min of incision), preoperative chlorhexidine skin antisepsis, normoglycaemia perioperatively, normothermia, appropriate hair removal (clipping not shaving), and sterile technique. Kenya MOH SSI Prevention Guidelines; WHO SSI Prevention Guidelines 2016.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Surgical Site Infection Prevention',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When performing environmental decontamination after a patient with Clostridioides difficile is discharged, which agent should be used?',
  '70% isopropyl alcohol',
  'Chlorhexidine 2% solution',
  'Sodium hypochlorite (bleach) 1,000–5,000 ppm',
  'Quaternary ammonium compound',
  'C',
  'C. difficile spores are highly resistant to alcohol, chlorhexidine, and quaternary ammonium compounds. Environmental decontamination after C. difficile requires sporicidal agents: sodium hypochlorite (household bleach) at minimum 1,000 ppm (0.1%) for general cleaning and up to 5,000 ppm (0.5%) for heavily contaminated areas. Contact precautions with apron and gloves, soap and water hand hygiene (not ABHR, which does not kill spores), and thorough terminal cleaning of the room are required. Kenya MOH IPC Guidelines; CDC C. difficile.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Environmental Decontamination',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An IPC nurse is conducting a donning and doffing audit for isolation PPE. Which step is most critical during doffing to prevent self-contamination?',
  'Remove the mask first as it is the least contaminated item',
  'Remove gloves first using the glove-in-glove technique, then perform hand hygiene before removing other PPE',
  'Remove all PPE simultaneously to save time',
  'Doffing sequence does not matter if gloves have been worn throughout',
  'B',
  'Correct doffing sequence (CDC/WHO): Gloves first (most contaminated) → hand hygiene → goggles/face shield → gown → mask/respirator → hand hygiene. Gloves are removed first using the glove-in-glove or beak technique to prevent hand contamination. Hand hygiene after glove removal before touching face or other PPE is critical. The mask is removed last as it protects the respiratory tract. Incorrect doffing is a leading cause of HCW infection during outbreaks. Kenya MOH IPC PPE Guidelines; WHO PPE Use Guidance.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'PPE Donning and Doffing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which IPC bundle component for VAP specifically targets secretion accumulation above the endotracheal tube cuff?',
  'Oral care with chlorhexidine',
  'Head of bed elevation 30–45 degrees',
  'Subglottic secretion drainage',
  'Daily sedation interruption',
  'C',
  'Subglottic secretion drainage (SSD) — either continuous or intermittent aspiration — removes secretions that pool above the ETT cuff and then microaspirate into the lower airways, which is the primary pathophysiological mechanism of VAP. SSD is a specific bundle component using specialised ETTs with a suction port above the cuff. Meta-analyses show SSD reduces VAP incidence by approximately 50%. Kenya MOH ICU IPC Bundle; IHI VAP Prevention.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'VAP Prevention Bundle',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is about to insert a peripheral IV cannula. Applying standard precautions, which skin antiseptic agent and technique is correct?',
  'Wipe with 70% alcohol swab in a back-and-forth scrubbing motion for 5 seconds',
  'Apply chlorhexidine 2% in 70% alcohol and allow to dry completely (30 seconds minimum) before insertion',
  'Clean with normal saline and insert immediately without waiting',
  'Povidone iodine solution applied and wiped dry with sterile gauze',
  'B',
  'For peripheral IV insertion, evidence-based antisepsis uses chlorhexidine gluconate 2% in 70% isopropyl alcohol applied with back-and-forth friction for 30 seconds and allowed to air-dry for a minimum of 30 seconds before cannula insertion — this is the critical step. Inserting before the antiseptic dries negates its effectiveness. Alcohol alone is acceptable if CHX unavailable. Normal saline is not antiseptic. Kenya MOH IPC Standards; INS Infusion Therapy Standards.',
  'BScN',
  'Paper II',
  'Infection Prevention and Control',
  'Vascular Access — Skin Antisepsis',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — RESEARCH AND EVIDENCE-BASED PRACTICE (20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse wants to review evidence on whether daily chlorhexidine bathing reduces CLABSI rates in ICU patients compared to standard soap-and-water bathing. Which correctly formulated PICO guides this search?',
  'P=ICU nurses, I=chlorhexidine training, C=no training, O=hand hygiene compliance',
  'P=adult ICU patients with central venous catheters, I=daily chlorhexidine bathing, C=standard soap-and-water bathing, O=CLABSI rate',
  'P=ICU patients, I=antibiotic prophylaxis, C=no prophylaxis, O=reduction in all HAIs',
  'P=surgical patients, I=chlorhexidine showering preoperatively, C=no shower, O=SSI rate',
  'B',
  'PICO framework: P (Population/Problem) = adult ICU patients with CVCs; I (Intervention) = daily chlorhexidine bathing; C (Comparison) = standard soap-and-water bathing; O (Outcome) = CLABSI rate. PICO precisely focuses the clinical question and guides database search strategy (MeSH terms, Boolean operators). Polit & Beck''s Nursing Research; Kenya MOH Research Framework; EBP Step 1: Ask.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'PICO Framework',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A systematic review with meta-analysis of multiple RCTs concludes that a new wound dressing reduces healing time. Compared to a single expert opinion recommending the same dressing, which level of evidence does the systematic review represent?',
  'They are equivalent levels of evidence',
  'Expert opinion is higher because it reflects clinical experience',
  'The systematic review represents the highest level of evidence, superior to expert opinion',
  'Both require RCT confirmation before clinical application',
  'C',
  'The hierarchy of evidence (Oxford CEBM / GRADE framework) places: Level 1 = Systematic reviews and meta-analyses of RCTs (highest); Level 2 = Well-designed RCTs; Level 3 = Quasi-experimental; Level 4 = Observational (cohort, case-control); Level 5 = Expert opinion/consensus (lowest). Systematic reviews synthesise best available evidence with formal methodology to minimise bias. Kenya MOH EBP Framework; Polit & Beck; Oxford Centre for Evidence-Based Medicine.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Hierarchy of Evidence',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An RCT evaluating a new pain management protocol reports p = 0.03 for the primary outcome. How should this result be correctly interpreted?',
  'There is a 3% chance that the new protocol is effective',
  'The probability that the observed difference occurred by chance alone, assuming no true difference, is 3%; the result is statistically significant',
  'The result proves the new protocol is clinically meaningful',
  'A p-value of 0.03 indicates a large effect size',
  'B',
  'The p-value is the probability of obtaining results at least as extreme as observed, assuming the null hypothesis is true. p = 0.03 < 0.05 (conventional alpha threshold) means we reject the null hypothesis — the result is statistically significant. It does NOT prove efficacy, indicate clinical meaningfulness (effect size determines that), or guarantee reproducibility. Statistical significance and clinical significance must both be considered. Polit & Beck; Greenhalgh''s How to Read a Paper.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Statistical Inference — p-value',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A study reports an OR = 2.4, 95% CI (0.8–5.1) for the association between a risk factor and disease development. How should this be interpreted?',
  'The risk factor doubles the odds of disease and this is statistically significant',
  'The odds ratio is 2.4, but the 95% CI includes 1.0, so the result is not statistically significant',
  'A 95% CI of (0.8–5.1) confirms strong clinical significance',
  'The CI indicates the study should be repeated with a smaller sample',
  'B',
  'For an Odds Ratio, statistical significance is assessed by whether the 95% CI includes 1.0 (null value for ratio measures). CI (0.8–5.1) includes 1.0, meaning the true OR could be 1.0 (no association) — therefore NOT statistically significant, despite the point estimate of 2.4. The study may be underpowered. Clinical significance (effect size) must always be interpreted alongside statistical significance. Polit & Beck; Greenhalgh''s How to Read a Paper.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Confidence Interval Interpretation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A clinical trial shows that a new antibiotic reduces surgical site infection rate from 10% to 6%. What is the Number Needed to Treat (NNT)?',
  '4',
  '25',
  '10',
  '6',
  'B',
  'NNT = 1 / Absolute Risk Reduction (ARR). ARR = Control event rate − Treatment event rate = 10% − 6% = 4% = 0.04. NNT = 1/0.04 = 25. This means 25 patients must receive the antibiotic to prevent one SSI. Lower NNT indicates a more effective treatment. NNH (Number Needed to Harm) uses the same formula for adverse events. Polit & Beck; Sackett et al. Evidence-Based Medicine.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Number Needed to Treat',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher compares infection rates between a group receiving a new decontamination protocol and a historical control group from the previous year. What type of study design is this?',
  'Double-blind randomised controlled trial',
  'Quasi-experimental (before-after) study',
  'Prospective cohort study',
  'Case-control study',
  'B',
  'A quasi-experimental design lacks random allocation. A before-after design (pre-post) compares outcomes in the same or similar population before and after an intervention — there is no concurrent randomised control group, only a historical control. This design is common in quality improvement and infection control research. It is susceptible to temporal confounders (regression to the mean, concurrent changes). Polit & Beck; Greenhalgh''s How to Read a Paper.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Research Design',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Two nurses independently code qualitative interview transcripts about patient experiences of pain. Their agreement is measured with Cohen''s kappa = 0.72. How should this be interpreted?',
  'The two nurses disagreed 72% of the time',
  'Inter-rater reliability is substantial/good (kappa 0.61–0.80 = substantial agreement)',
  'The kappa value indicates the data should be discarded as unreliable',
  'Cohen''s kappa is only used for quantitative data; it is inappropriate here',
  'B',
  'Cohen''s kappa measures inter-rater reliability (agreement beyond chance) for categorical data. Landis & Koch benchmarks: <0 = poor; 0–0.2 = slight; 0.21–0.40 = fair; 0.41–0.60 = moderate; 0.61–0.80 = substantial; 0.81–1.0 = almost perfect. Kappa = 0.72 indicates substantial/good agreement. Cohen''s kappa is used for categorical (including qualitative coded) data. Polit & Beck; Landis & Koch 1977.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Research Reliability and Validity',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher concludes that a new dressing is not effective because the RCT returned p = 0.08. What type of error may have occurred if the dressing is actually effective?',
  'Type I error (false positive)',
  'Type II error (false negative)',
  'Sampling error',
  'Systematic bias',
  'B',
  'Type II error (beta error, false negative): concluding there is NO significant difference when one actually exists. This occurs when the study is underpowered (insufficient sample size) to detect a true effect, or when alpha is set too conservatively. Type I error (alpha, false positive): rejecting the null hypothesis when it is actually true. Power = 1−beta; increasing sample size reduces beta. p = 0.08 with p>0.05 leads to retaining the null hypothesis, potentially missing a true effect. Polit & Beck; Greenhalgh.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Statistical Errors',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A new screening test for diabetes has a sensitivity of 95% and specificity of 60%. Which statement is correct regarding test performance?',
  'The test will miss 5% of true diabetics and correctly exclude 60% of non-diabetics',
  'The test correctly identifies 60% of true diabetics but has a 95% false positive rate',
  'High specificity makes this a better confirmatory test than a screening test',
  'A sensitivity of 95% means the test will generate many false positives in a low-prevalence population',
  'A',
  'Sensitivity = ability to correctly identify those WITH the disease (true positive rate). Sensitivity 95% → 5% false negatives (missed cases). Specificity = ability to correctly identify those WITHOUT the disease (true negative rate). Specificity 60% → 40% false positives. High sensitivity = good for screening (don''t want to miss cases). High specificity = good for confirmation (don''t want false alarms). In low-prevalence populations, even high-sensitivity tests generate many false positives (low PPV). Polit & Beck; Sackett et al.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Diagnostic Test Evaluation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An RCT reports Relative Risk (RR) = 0.45 for the development of pressure ulcers in the intervention group compared to controls. How is this correctly interpreted?',
  'The intervention group has a 45% absolute risk of developing pressure ulcers',
  'The intervention reduces the risk of pressure ulcers by 55% relative to the control group',
  'Participants in the control group are 0.45 times more likely to develop pressure ulcers',
  'A RR below 1.0 indicates the intervention is harmful',
  'B',
  'Relative Risk (RR) = risk in intervention group / risk in control group. RR = 0.45 means the intervention group has 0.45 times the risk of the control group — a 55% relative risk reduction (RRR = 1 − RR = 1 − 0.45 = 0.55 = 55%). RR < 1.0 indicates the intervention reduces risk (beneficial). RR = 1.0 = no difference; RR > 1.0 = increased risk. RR differs from Odds Ratio (OR), which is used in case-control studies. Polit & Beck; Sackett et al. Evidence-Based Medicine.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Relative Risk and Odds Ratio',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which CONSORT checklist item is most critical when appraising an RCT for risk of selection bias?',
  'Whether the paper was published in a peer-reviewed journal',
  'Whether allocation concealment was adequately described',
  'Whether the sample size was greater than 200 participants',
  'Whether the authors declared conflicts of interest',
  'B',
  'Allocation concealment (hiding the allocation sequence from those enrolling participants until after enrolment) is the most critical CONSORT item for preventing selection bias. Even with random sequence generation, if allocators can predict or know the next assignment, they can selectively enrol patients, biasing the groups. Methods: sequentially numbered opaque sealed envelopes, central telephone/web randomisation. Inadequate allocation concealment inflates treatment effects by 30–40%. CONSORT 2010 Statement; Schulz & Grimes; Polit & Beck.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Critical Appraisal — RCT',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In which sequence should the five steps of evidence-based practice (EBP) be performed?',
  'Apply → Appraise → Acquire → Ask → Audit',
  'Acquire → Appraise → Ask → Apply → Audit',
  'Ask (PICO) → Acquire (search databases) → Appraise → Apply → Audit (evaluate outcomes)',
  'Appraise → Ask → Apply → Acquire → Audit',
  'C',
  'The five steps of EBP (Sackett/Melnyk & Fineout-Overholt): (1) Ask: formulate a structured clinical question using PICO; (2) Acquire: search databases (PubMed, CINAHL, Cochrane) using PICO-derived search terms; (3) Appraise: critically evaluate the evidence for validity, reliability, and applicability; (4) Apply: integrate evidence with clinical expertise and patient preferences to make practice decisions; (5) Audit: evaluate outcomes of the practice change. Kenya MOH EBP Framework; Melnyk & Fineout-Overholt.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Evidence-Based Practice Process',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A qualitative phenomenological study explores nurses'' lived experiences of moral distress in ICU. Which data collection method is most appropriate for this design?',
  'Structured questionnaire with Likert scale responses',
  'In-depth semi-structured interviews',
  'Randomised observation checklist',
  'Retrospective medical record review',
  'B',
  'Phenomenological research explores the lived experience (essence/meaning) of a phenomenon from the participants'' perspective. In-depth semi-structured interviews allow rich, narrative exploration of subjective experiences while maintaining a focus through an interview guide. Structured questionnaires constrain responses, preventing exploration of meaning. Record review provides objective data, not lived experience. Polit & Beck; Creswell''s Qualitative Inquiry and Research Design.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Qualitative Research Methods',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An intention-to-treat (ITT) analysis in an RCT includes all randomised participants in their original allocated groups regardless of protocol adherence or dropout. What is the main advantage of this approach?',
  'It maximises the apparent efficacy of the intervention by excluding non-compliant participants',
  'It preserves the benefits of randomisation and provides a conservative, clinically realistic estimate of effectiveness',
  'It is only appropriate for studies with 100% adherence rates',
  'ITT analysis increases statistical power by reducing the sample size analysed',
  'B',
  'Intention-to-treat (ITT) analysis includes all participants as originally randomised, whether they completed treatment or not. This: (1) preserves the balance of prognostic factors achieved by randomisation; (2) provides a pragmatic, real-world estimate of effectiveness (not just efficacy under perfect conditions); (3) prevents selection bias from excluding dropouts (who often differ systematically from completers). Per-protocol analysis (compliant only) risks bias. CONSORT 2010; Polit & Beck; Montori & Guyatt.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Critical Appraisal — RCT',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward sister wants to implement a new evidence-based pressure ulcer prevention protocol. Which factor most commonly acts as a barrier to EBP implementation in Kenyan hospital settings?',
  'Nurses having too much evidence available to synthesise',
  'Lack of time, inadequate access to research databases, insufficient EBP skills, and limited organisational support',
  'Patient resistance to evidence-based care',
  'Overabundance of qualified research mentors in the hospital',
  'B',
  'Barriers to EBP implementation in resource-constrained settings (Kenya and sub-Saharan Africa) include: lack of time to read research, limited/no access to electronic databases, inadequate skills to appraise evidence, lack of mentors and EBP champions, insufficient managerial support, and cultural attitudes toward change. Facilitators include: EBP education, journal clubs, clinical librarian access, supportive leadership, and EBP champions. Melnyk et al.; Solomons & Spross; Kenya MOH Research Capacity Building Strategy.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'EBP Implementation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which ethical principle requires that research participants are fully informed about the study and voluntarily agree to participate before data collection begins?',
  'Beneficence',
  'Justice',
  'Informed consent',
  'Confidentiality',
  'C',
  'Informed consent is the process by which a competent individual, having received and understood adequate information about a study (purpose, procedures, risks, benefits, voluntary nature, right to withdraw), voluntarily agrees to participate. This is ethically and legally required by: the Declaration of Helsinki, the Belmont Report (autonomy principle), Kenya National Commission for Science, Technology and Innovation (NACOSTI) guidelines, and KNH/KEMRI ethical review requirements. Polit & Beck; Declaration of Helsinki.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Research Ethics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher conducts a study examining whether nurse staffing ratios are associated with patient fall rates across 20 hospitals by reviewing existing hospital databases. No participants are directly involved. What type of study design is this?',
  'Experimental study',
  'Ecological (aggregate-level) correlational study',
  'Randomised controlled trial',
  'Phenomenological qualitative study',
  'B',
  'An ecological study analyses data at the group/population level (hospitals, wards, districts) rather than the individual level. The unit of analysis is aggregate data. It identifies associations between exposures (staffing ratios) and outcomes (fall rates) across groups. Ecological fallacy (assuming group-level associations apply to individuals) is a key limitation. This is a non-experimental observational design. Polit & Beck; Creswell; Greenhalgh.',
  'BScN',
  'Paper II',
  'Research and Evidence-Based Practice',
  'Research Design',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — NURSING MANAGEMENT AND LEADERSHIP (25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward manager consistently sets a compelling vision for her team, inspires nurses to exceed personal interests for the unit''s goals, and fosters intrinsic motivation through recognition and professional development. Which leadership style does she demonstrate?',
  'Transactional leadership',
  'Autocratic leadership',
  'Transformational leadership',
  'Laissez-faire leadership',
  'C',
  'Transformational leadership (Burns; Bass) inspires followers to transcend self-interest for the collective vision through four components: Idealised Influence (role modelling), Inspirational Motivation (compelling vision), Intellectual Stimulation (encouraging innovation), and Individualised Consideration (coaching/mentoring). It drives intrinsic motivation and organisational change. Transactional leadership uses rewards and punishments (contingent reinforcement) based on performance. Marquis & Huston; Kenya MOH Nursing Leadership Framework.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Leadership Styles',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse manager applies Hersey and Blanchard''s Situational Leadership Model. A newly qualified nurse is assigned a complex wound dressing for the first time. Which leadership behaviour is most appropriate?',
  'Delegating — low task, low relationship behaviour',
  'Directing — high task, low relationship behaviour (telling)',
  'Supporting — low task, high relationship behaviour',
  'Coaching — high task, high relationship behaviour',
  'B',
  'Situational Leadership (Hersey & Blanchard) matches leadership style to follower readiness. A new nurse with a complex task has low competence but possibly high commitment (R1 = novice). The appropriate style is S1 Directing (Telling): high task-directive behaviour (clear specific instructions and close supervision) with low relationship behaviour, as the follower needs structure and guidance, not encouragement. As competence grows, the style progresses to Coaching → Supporting → Delegating. Marquis & Huston; Kenya MOH Nursing Leadership.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Situational Leadership',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospital is planning to introduce bedside handover to replace traditional nursing handover. Applying Lewin''s Force Field Analysis, which strategy reduces restraining forces?',
  'Increasing the urgency of the change by threatening disciplinary action for non-compliance',
  'Identifying and addressing staff concerns about bedside handover through education and involvement in planning',
  'Removing the driving forces to balance the field before implementation',
  'Implementing the change without unfreezing phase to reduce resistance time',
  'B',
  'Lewin''s Force Field Analysis identifies driving forces (pushing for change: evidence, patient safety, administration support) and restraining forces (resisting change: staff habit, patient privacy concerns, time perception, lack of training). Change is achieved by either increasing driving forces or, more effectively, reducing restraining forces — which generates less tension. Addressing concerns through education, participation, and pilot testing reduces restraining forces. Lewin''s Three-Step Model: Unfreeze → Change → Refreeze. Marquis & Huston.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Change Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A staff nurse requests a pay increase to stay motivated. According to Herzberg''s Two-Factor Theory, how should the manager interpret this?',
  'Salary is a motivator — addressing it will drive high performance',
  'Salary is a hygiene factor — meeting it prevents dissatisfaction but will not itself produce sustained high motivation',
  'Financial rewards are the primary motivators according to Herzberg''s theory',
  'Herzberg''s theory does not address financial compensation',
  'B',
  'Herzberg''s Two-Factor Theory: Hygiene factors (extrinsic: salary, working conditions, supervision, policies, job security) — their absence causes dissatisfaction; their presence merely prevents dissatisfaction but does not motivate. Motivators (intrinsic: achievement, recognition, meaningful work, responsibility, growth) — these drive job satisfaction and sustained performance. A pay increase removes a source of dissatisfaction but will not produce lasting motivation without intrinsic factors. Marquis & Huston; Kenya MOH Human Resources for Health Strategy.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Motivation Theories',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward has 30 patients over 24 hours. The required nursing hours per patient day (NHPPD) is 6. How many nursing hours are required for the ward per day?',
  '5 hours',
  '180 hours',
  '36 hours',
  '120 hours',
  'B',
  'Nursing Hours Per Patient Day (NHPPD) staffing calculation: Total nursing hours required = Number of patients × NHPPD = 30 × 6 = 180 nursing hours per day. To convert to nurse shifts (8-hour shifts): 180 ÷ 8 = 22.5 nurses per day. For 24-hour coverage across three 8-hour shifts: adjust for days off and leave by multiplying by a relief factor (~1.4). Marquis & Huston Nursing Leadership and Management; Kenya MOH Staffing Norms.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Staffing and Scheduling',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nursing audit of documentation compliance reveals that only 55% of care plans are complete. This audit assesses which dimension of quality?',
  'Structure — the resources and conditions within which care is provided',
  'Process — the activities and actions performed during care delivery',
  'Outcome — the results of care as experienced by patients',
  'Input — the financial budget for nursing care',
  'B',
  'Donabedian''s three dimensions of quality: Structure (resources, facilities, staff credentials, equipment); Process (what is done during care — documentation, care plan completion, medication administration, hand hygiene); Outcome (results: mortality, infection rates, patient satisfaction, pressure ulcer incidence). Audit of documentation and care plan completion is a process audit. Outcome audits measure patient results. Structure audits assess resources. Marquis & Huston; Donabedian.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Quality Assurance and Audit',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse delegates the task of measuring and recording vital signs for stable patients to a nursing assistant. Who retains accountability for the accuracy and appropriate action on those vital signs?',
  'The nursing assistant who performed the task',
  'The delegating nurse, who remains accountable for the outcomes of delegated tasks',
  'The ward manager, as the senior staff member on duty',
  'Accountability transfers completely to the nursing assistant upon delegation',
  'B',
  'Delegation transfers authority to perform a task but does NOT transfer professional accountability. The delegating nurse retains accountability for: the appropriateness of the delegation decision, selecting a competent delegatee, providing adequate instruction/supervision, and evaluating outcomes. The delegatee is responsible for competent execution. NCK Scope of Practice and Delegation Guidelines; National Council of State Boards of Nursing (NCSBN) Five Rights of Delegation.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Delegation and Accountability',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Two senior nurses have an interpersonal conflict over patient assignment. The ward manager uses the Thomas-Kilmann model to facilitate resolution. Which conflict resolution style results in the best long-term outcome when the issue is important to both parties?',
  'Avoiding — postpone discussion until tensions cool',
  'Competing — the manager decides and enforces a solution',
  'Collaborating — explore both perspectives to find a mutually acceptable solution',
  'Accommodating — one nurse defers to the other''s preference',
  'C',
  'Thomas-Kilmann Conflict Mode Instrument (TKI) five styles: Competing (win-lose; high assertiveness, low cooperation); Collaborating (win-win; high assertiveness, high cooperation — best for important, complex issues); Compromising (partial win-win; moderate both); Avoiding (lose-lose; low both); Accommodating (lose-win; low assertiveness, high cooperation). Collaborating produces sustainable, mutually satisfying outcomes when the issue is important to both parties. Marquis & Huston; Thomas & Kilmann.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Conflict Resolution',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient dies after receiving the wrong blood group during a transfusion. This event is classified as a sentinel event. What is the most appropriate immediate management action by the nurse manager?',
  'Discipline the responsible nurse immediately and document in the personnel file',
  'Initiate a root cause analysis (RCA) using a structured method, preserve evidence, report through the hospital incident reporting system, and support the involved staff',
  'Suppress the report to protect the hospital''s reputation',
  'Wait for the family to complain before taking any formal action',
  'B',
  'A sentinel event is an unexpected, serious adverse event resulting in death or serious physical harm, requiring immediate investigation. The appropriate response: (1) Ensure patient safety and immediate care; (2) Preserve evidence (blood unit, documentation); (3) Report through mandatory incident reporting system; (4) Initiate a Root Cause Analysis (RCA) — a systems-level investigation using fishbone/Ishikawa diagram to identify contributing factors, not individual blame; (5) Develop corrective action plan; (6) Support involved staff (second victim phenomenon). Kenya MOH Patient Safety Framework; JCI.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Patient Safety and Sentinel Events',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a root cause analysis using a fishbone (Ishikawa) diagram for a medication error, the team categorises contributing factors. Which main category in the fishbone diagram would include ''inadequate training on the new electronic prescribing system''?',
  'Equipment/materials',
  'People/manpower',
  'Policies/procedures',
  'Environment',
  'B',
  'The fishbone (Ishikawa/cause-and-effect) diagram uses major categories (the ''bones'') to organise contributing causes. In healthcare RCA, common categories include: People (training, competence, fatigue, supervision), Equipment/materials (device malfunction, labelling), Policies/procedures (unclear protocols), Environment (lighting, noise, workload), Information systems, and Communication. ''Inadequate training on electronic prescribing'' is a People/Manpower factor. Kenya MOH Patient Safety RCA Guide; Marquis & Huston.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Root Cause Analysis',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward manager prepares a budget for the next financial year. The actual expenditure on staff overtime exceeds the budgeted amount by 15%. How should this variance be classified?',
  'Favourable variance — spending more than planned improves outcomes',
  'Unfavourable (adverse) variance — actual expenditure exceeded budget',
  'Zero-based variance',
  'Capital variance',
  'B',
  'Budget variance = Actual − Budget. When actual expenditure exceeds budgeted expenditure, this is an unfavourable (adverse) variance — the unit spent more than planned. Favourable variance means actual spending is less than budgeted (saves money). Variance analysis is part of financial control in nursing management. Managers must investigate causes (increased agency staff use, unplanned overtime, patient acuity) and implement corrective action. Marquis & Huston; Kenya MOH Financial Management in Health.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Budgeting and Financial Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which approach to performance appraisal collects feedback from the nurse''s supervisor, peers, subordinates, and patients to provide a comprehensive perspective on performance?',
  'Management by objectives (MBO)',
  'Critical incident technique',
  '360-degree feedback appraisal',
  'Graphic rating scale',
  'C',
  '360-degree feedback (multi-source feedback) collects performance data from multiple raters: supervisor (top-down), peers (lateral), subordinates (upward), and sometimes patients/service users. This provides a comprehensive, multi-perspective assessment that reduces single-rater bias. It is used for professional development and appraisal. MBO evaluates achievement of agreed SMART objectives. Critical incident documents significant events. Graphic rating scales rate traits on a numerical scale. Marquis & Huston; Kenya MOH Nursing Performance Appraisal Framework.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Performance Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospital''s strategic plan identifies high nurse turnover as a threat to patient safety. Which evidence-based nurse retention strategy has the strongest impact?',
  'Increasing annual salary increments by 5%',
  'Magnet hospital characteristics: shared governance, professional development, supportive management, adequate staffing, and recognition of nursing excellence',
  'Mandatory overtime policies to fill staffing gaps',
  'Transferring nurses between units to prevent boredom',
  'B',
  'Evidence from Magnet hospital research (ANCC Magnet Recognition Programme) shows that environments characterised by shared governance, transformational nursing leadership, professional development opportunities, nurse autonomy, adequate staffing, and recognition of nursing excellence achieve significantly lower nurse turnover, higher nurse satisfaction, and better patient outcomes. Mandatory overtime and forced transfers increase burnout and turnover. Marquis & Huston; Aiken et al.; Kenya MOH HRH Retention Strategy.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Nurse Retention',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospital applies Maslow''s Hierarchy of Needs to develop a staff motivation strategy. Which staff need must be satisfied first before higher-order needs can be addressed?',
  'Self-actualisation — professional development opportunities',
  'Esteem — recognition awards programme',
  'Physiological — competitive salary and safe working conditions',
  'Belonging — team-building activities',
  'C',
  'Maslow''s Hierarchy: (1) Physiological (food, water, shelter, fair salary, safe working conditions) — foundation; (2) Safety (job security, safe workplace); (3) Belonging (team relationships, collegial support); (4) Esteem (recognition, respect, professional achievement); (5) Self-actualisation (professional growth, leadership, career advancement). Lower-level needs must be substantially met before higher-level motivators become effective. Inadequate pay or unsafe working conditions prevent higher-order motivation. Marquis & Huston; Maslow.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Motivation Theories',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A chief nursing officer is planning for the retirement of three senior nurse managers over the next two years. Which management strategy best addresses continuity of leadership?',
  'Advertise externally to replace all three positions when vacancies arise',
  'Implement a succession planning programme: identify high-potential nurses, provide leadership development, mentoring, and progressive responsibility assignments',
  'Merge the three management positions into one role to reduce costs',
  'Promote the most senior nurse by years of service to each role',
  'B',
  'Succession planning is a proactive leadership strategy that identifies and develops internal talent (high-potential nurses) through targeted leadership education, mentoring, coaching, and progressive role assignments to ensure seamless leadership continuity. It prevents organisational disruption from unexpected vacancies, retains institutional knowledge, and builds organisational resilience. Relying on external recruitment or seniority-based promotion is reactive and less effective. Marquis & Huston; Kenya MOH Nursing Leadership Strategy.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Succession Planning',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse manager differentiates between strategic planning and operational planning. Which statement correctly distinguishes the two?',
  'Operational planning is long-term (3–5 years) and sets the organisation''s vision; strategic planning covers day-to-day activities',
  'Strategic planning is long-term (3–5 years), sets organisational direction and goals; operational planning is short-term (daily/monthly/annual), translating strategy into specific actions',
  'Strategic planning is only done by the CEO; operational planning is done by ward sisters',
  'They are identical processes with different names',
  'B',
  'Strategic planning: long-term (typically 3–5 years), conducted by senior leadership; defines mission, vision, values, strategic priorities, and major goals — the ''big picture''. Operational planning: short-term (annual, monthly, daily); translates strategic goals into specific, measurable objectives, action plans, resource allocation, and timelines at the operational level. Both levels are interconnected: operational plans implement the strategic plan. Marquis & Huston; Kenya MOH National Hospital Planning Standards.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Planning and Organising',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A near-miss event occurs when a nurse almost administers the wrong dose of insulin but catches the error before it reaches the patient. What is the most important reason for reporting this near-miss?',
  'Near-miss events do not require reporting as no harm occurred',
  'Near-miss reporting enables system analysis to identify latent failures and implement preventive actions before a harmful event occurs',
  'Reporting protects the nurse from disciplinary action by documenting self-correction',
  'Near-miss reports are only required for Schedule I controlled drugs',
  'B',
  'Near-miss reporting is a cornerstone of patient safety culture. Near-misses reveal latent system failures (Swiss Cheese Model — Reason''s model of organisational accidents) that, if unaddressed, will eventually align to cause patient harm. A high near-miss reporting rate in a positive safety culture indicates staff trust and system vigilance. Near-misses are learning opportunities. Blame-free reporting is essential to encourage disclosure. Kenya MOH Patient Safety Policy; WHO Patient Safety; Reason''s Swiss Cheese Model.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Patient Safety and Incident Reporting',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward sister uses management by objectives (MBO) to set performance expectations for a staff nurse. Which objective is correctly written using the SMART framework?',
  'The nurse should improve patient education skills during the year',
  'The nurse will complete the hospital''s competency-based wound care assessment with a score of ≥80% by 30 September 2026',
  'The nurse will try to improve documentation',
  'The nurse should learn about infection control',
  'B',
  'SMART objectives: Specific (wound care assessment), Measurable (≥80% score), Achievable (competency-based assessment is an existing tool), Relevant (aligned to nursing practice), Time-bound (by 30 September 2026). Vague objectives (''improve'', ''try'', ''learn about'') cannot be objectively evaluated. SMART objectives are used in MBO and performance appraisal as agreed, measurable targets between manager and employee. Marquis & Huston; Kenya MOH Performance Management Framework.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Performance Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A new nurse manager is told that the ward''s actual drug expenditure this month was KES 480,000 against a budget of KES 400,000. The variance percentage is:',
  '5% favourable',
  '20% unfavourable',
  '20% favourable',
  '80% unfavourable',
  'B',
  'Budget variance % = ((Actual − Budget) / Budget) × 100 = ((480,000 − 400,000) / 400,000) × 100 = (80,000 / 400,000) × 100 = 20%. Since actual > budget (overspend), this is an unfavourable (adverse) variance of 20%. The manager must investigate causes (increased patient acuity, wastage, expired drugs, unauthorised prescribing) and present a corrective action plan. Marquis & Huston; Kenya MOH Health Facility Financial Management.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Budgeting and Financial Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospital implements a mandatory annual appraisal system. Which is the primary purpose of a formal performance appraisal in nursing?',
  'To identify underperforming nurses for disciplinary action',
  'To provide structured feedback, recognise achievements, identify development needs, set goals, and inform staffing and promotion decisions',
  'To justify not giving salary increases to staff',
  'To document compliance with NCK annual licence requirements',
  'B',
  'Performance appraisal serves multiple purposes: (1) Feedback — recognise achievements, address performance gaps; (2) Development — identify learning/training needs; (3) Goal-setting — SMART objectives for the next period; (4) Motivation — recognition drives intrinsic satisfaction; (5) Administrative — inform promotion, salary, and staffing decisions; (6) Legal — documented evidence of performance management process. It is not primarily punitive. Effective appraisals are two-way, evidence-based, and future-oriented. Marquis & Huston; Kenya MOH HRM Guidelines.',
  'BScN',
  'Paper II',
  'Nursing Management and Leadership',
  'Performance Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — PROFESSIONAL ETHICS AND LAW (25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which function is NOT within the mandate of the Nursing Council of Kenya (NCK) under the Nurses Act Cap 257?',
  'Registering qualified nurses and midwives',
  'Setting standards for nursing education and training',
  'Prescribing schedule IV drugs to patients in primary care settings',
  'Investigating complaints of professional misconduct',
  'C',
  'NCK functions under the Nurses Act Cap 257: (1) Register and licence nurses/midwives; (2) Set and monitor standards for nursing education, training, and practice; (3) Approve and inspect training institutions; (4) Investigate complaints of professional misconduct; (5) Regulate the nursing profession to protect the public. Prescribing schedule drugs is within the scope of medical practitioners and specific prescribers as defined by the Pharmacy and Poisons Act — not within NCK''s mandate. Nurses Act Cap 257 (Kenya); NCK Scope of Practice Guidelines.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'NCK Mandate and Functions',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse administers a prescribed medication that causes an unexpected adverse reaction due to a known, documented allergy that the nurse failed to check. A patient suffers organ damage as a result. To establish nursing malpractice, all four elements must be proven. Which element establishes that the nurse''s breach caused the patient''s injury?',
  'Duty — the nurse-patient relationship established a legal duty of care',
  'Breach — failure to check allergy documentation deviated from the standard of care',
  'Causation — the nurse''s failure to check the allergy directly caused the adverse reaction and organ damage',
  'Damages — the patient suffered measurable physical harm (organ damage)',
  'C',
  'Four elements of nursing malpractice (negligence): (1) Duty — nurse-patient relationship establishes duty; (2) Breach — deviation from standard of care (failure to check allergy); (3) Causation (proximate cause) — the breach directly caused the harm (without the failure, the reaction would not have occurred); (4) Damages — actual, measurable harm resulted. Causation is established by showing the breach was the proximate (direct, foreseeable) cause of the damages. Guido''s Legal and Ethical Issues in Nursing; Kenya Nurses Act.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Malpractice and Negligence',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'After abdominal surgery, a retained surgical sponge is discovered on imaging, causing bowel obstruction. Which legal doctrine applies, allowing the plaintiff to proceed without proving specific negligence?',
  'Doctrine of respondeat superior',
  'Res ipsa loquitur',
  'Informed consent doctrine',
  'Charitable immunity',
  'B',
  'Res ipsa loquitur (''the thing speaks for itself'') applies when: (1) the injury would not ordinarily occur without negligence; (2) the instrument causing harm was under the defendant''s exclusive control; (3) the plaintiff did not contribute to the injury. A retained surgical sponge is a classic example — it is self-evidently negligent and within the surgical team''s exclusive control. The burden of proof shifts to the defendant. Respondeat superior holds employers vicariously liable for employee negligence. Guido''s Legal Issues in Nursing; Kenya Law.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Legal Doctrines',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospital employs a nurse who administers a wrong medication dose to a patient, causing harm. The patient sues the hospital. Which legal doctrine holds the hospital responsible for its employee''s negligence?',
  'Res ipsa loquitur',
  'Respondeat superior',
  'Therapeutic privilege',
  'Doctrine of informed consent',
  'B',
  'Respondeat superior (''let the master answer'') is the doctrine of vicarious liability: an employer (hospital) is legally responsible for the negligent acts of its employees (nurses) committed within the scope of their employment and during the course of their duties. This is why hospitals carry institutional liability insurance. A nurse employed by the hospital and acting within their role creates employer liability. Independent contractors are not covered. Guido''s Legal Issues in Nursing; Kenya Employment Act and Tort Law.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Legal Doctrines',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with terminal cancer asks the nurse not to tell family members about the diagnosis. The patient has decision-making capacity. What is the nurse''s ethical obligation?',
  'Inform the family anyway as they have a right to know',
  'Respect the patient''s confidentiality and autonomy; the patient has the right to control disclosure of their health information',
  'Document the request but tell the family if they ask directly',
  'Report the patient''s refusal to disclose to the hospital ethics committee',
  'B',
  'A competent patient has an absolute ethical and legal right to confidentiality and autonomous control over their personal health information. The nurse must respect this right. Disclosure without consent breaches confidentiality (Nurses Act Cap 257; Kenya Data Protection Act 2019; the Hippocratic tradition). Exceptions (mandatory disclosure) exist only for specific statutory obligations (notifiable diseases, court orders) or imminent risk to an identifiable third party. The family''s emotional interest does not override patient confidentiality. Guido''s; Beauchamp & Childress.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Confidentiality and Patient Rights',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is told by a psychiatric patient in confidence that they plan to seriously harm a specific identified person when discharged. What is the nurse''s ethical and legal obligation?',
  'Maintain confidentiality as the therapeutic relationship is paramount',
  'Document the threat and notify the psychiatrist; there is a duty to protect the identified third party from serious imminent harm',
  'Discharge the patient and advise the potential victim to seek police protection independently',
  'Only act if the patient provides a specific timeline for the assault',
  'B',
  'The Tarasoff duty to warn/protect (Tarasoff v. Regents of UC, 1976) established that mental health professionals have a duty to protect identifiable third parties from serious, imminent threats made by patients. This duty overrides confidentiality in extreme circumstances. The nurse must: notify the treating psychiatrist/team immediately, document, and ensure appropriate action (warn potential victim, notify law enforcement, revise treatment plan, consider involuntary detention). This principle is incorporated into Kenya Mental Health Act 2022 obligations. Guido''s; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Duty to Warn — Tarasoff',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse discovers that a colleague is working while impaired by alcohol. What is the most appropriate professional action?',
  'Advise the colleague privately and take no further action to protect their employment',
  'Remove the impaired nurse from patient care immediately, report to the charge nurse/manager, and follow hospital policy and NCK reporting obligations',
  'Document the observation in the colleague''s personal file without reporting',
  'Offer to cover the colleague''s patients and hope the situation resolves without incident',
  'B',
  'An impaired colleague poses an immediate and serious risk to patient safety. Professional obligations under NCK Code of Professional Conduct require nurses to: (1) Prioritise patient safety — remove the impaired nurse from patient care immediately; (2) Report to the charge nurse/ward manager; (3) Follow hospital policy on substance impairment (typically includes occupational health referral); (4) NCK may require mandatory reporting of fitness-to-practice concerns. Protecting a patient safety threat violates the nurse''s own professional obligations. Nurses Act Cap 257; NCK Professional Conduct Standards.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Professional Conduct — Impairment',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse alters a patient''s medication administration record to conceal a missed dose. Under the Nurses Act Cap 257, this action constitutes:',
  'A minor documentation error requiring verbal correction only',
  'Professional misconduct and fraud — falsification of medical records, which may result in removal from the nursing register',
  'An administrative error handled by ward management without professional consequences',
  'Acceptable practice if the patient suffered no apparent harm',
  'B',
  'Falsification, alteration, or destruction of patient records constitutes: (1) Professional misconduct under the Nurses Act Cap 257 and NCK Code of Professional Conduct; (2) Fraud (legal offence under Kenya Penal Code); (3) Breach of the duty of honesty and integrity fundamental to nursing practice. Medical records are legal documents. The NCK disciplinary process may result in sanctions including removal from the register. Documentation must reflect reality; errors should be corrected by single-line strike-through with initials, date, and explanation. NCK Disciplinary Procedures; Guido''s.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Documentation and Legal Records',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is unconscious following a road traffic accident and requires immediate emergency surgery. No family members are available to provide consent. What is the most ethically and legally appropriate action?',
  'Postpone surgery until a family member can be contacted',
  'Proceed with emergency surgery under the doctrine of implied consent for emergency care where death or serious harm would result without immediate intervention',
  'Request police consent as representatives of the state',
  'Document that surgery was refused and provide supportive care only',
  'B',
  'When a patient lacks decision-making capacity and faces an emergency where delay would result in death or serious irreversible harm, the doctrine of implied/presumed consent permits immediate life-saving treatment. The law presumes that a reasonable person would consent to emergency care to preserve life. This is distinct from routine procedures requiring express informed consent. Document the emergency, efforts to contact family, clinical decision rationale, and senior physician involvement. Kenya Medical Practitioners and Dentists Act; Guido''s; Beauchamp & Childress.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Informed Consent — Emergency',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which disease is classified as a mandatory notifiable disease under Kenya''s Public Health Act Cap 242, requiring immediate notification to the public health officer?',
  'Hypertension',
  'Diabetes mellitus',
  'Cholera',
  'Osteoporosis',
  'C',
  'Kenya Public Health Act Cap 242 Schedule I lists notifiable diseases requiring mandatory and immediate reporting to the local public health officer. These include: cholera, plague, yellow fever, rabies, meningococcal meningitis, typhoid fever, smallpox, relapsing fever, and COVID-19 was added during the pandemic. Hypertension, diabetes, and osteoporosis are non-communicable diseases and not notifiable. Failure to notify is a criminal offence under the Act. Kenya Public Health Act Cap 242; MOH Disease Surveillance Guidelines.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Mandatory Disease Notification',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Under Kenya''s Patient Rights Charter, which right is most relevant when a patient demands to know the full diagnosis, treatment options, and expected outcomes before agreeing to surgery?',
  'Right to emergency care without pre-conditions',
  'Right to privacy and dignity',
  'Right to information and informed decision-making',
  'Right to complain without victimisation',
  'C',
  'Kenya''s Patient Rights Charter includes the right to: receive complete, accurate, and understandable information about diagnosis, prognosis, treatment options and their risks/benefits, enabling informed decision-making. This is the legal and ethical basis for informed consent. The patient has the right to accept or refuse treatment after receiving adequate information. Healthcare providers must communicate in a language and form the patient understands. Kenya Ministry of Health Patient Rights Charter.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Patient Rights Charter',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A competent adult patient with capacity declines a blood transfusion for religious reasons despite life-threatening anaemia. What is the nurse''s ethical obligation?',
  'Override the refusal and administer the transfusion to save the patient''s life',
  'Respect the patient''s autonomous decision, ensure informed refusal is documented, explore alternatives, and provide the best supportive care possible',
  'Refer the patient to a religious leader to change their decision',
  'Report the patient''s decision to the hospital ethics committee for mandatory intervention',
  'B',
  'A competent adult with decision-making capacity has an absolute legal and ethical right to refuse treatment, even life-saving treatment, for any reason including religious beliefs. The nurse''s obligations: (1) Ensure the refusal is genuinely informed (patient understands consequences); (2) Document informed refusal thoroughly; (3) Explore acceptable alternatives (cell salvage, erythropoietin, iron); (4) Continue to provide compassionate non-blood supportive care; (5) Respect autonomy without abandoning the patient. Overriding a competent refusal constitutes assault and battery. Beauchamp & Childress; Kenya Bill of Rights (Article 32).',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Autonomy and Informed Refusal',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An NCK disciplinary panel investigates a nurse for professional misconduct. After a hearing, they find misconduct proven. Which range of sanctions is available to the panel?',
  'Only a fine payable to the patient',
  'Caution, conditions on practice, suspension, or removal from the nursing register',
  'Criminal prosecution leading to imprisonment only',
  'Compulsory medical retirement only',
  'B',
  'NCK disciplinary sanctions under the Nurses Act Cap 257: (1) Caution — formal warning on the record; (2) Conditions on registration — required further education, supervision, or restrictions on practice; (3) Suspension — temporary removal from the register for a specified period; (4) Erasure/Removal from the register — permanent prohibition from nursing practice in Kenya (most severe). Criminal prosecution is handled by the Director of Public Prosecutions — separate from professional disciplinary proceedings. NCK Disciplinary Procedures; Nurses Act Cap 257.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'NCK Disciplinary Process',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A senior nurse supervising a student nurse during a complex wound dressing procedure fails to correct the student''s poor sterile technique, resulting in a wound infection. Who bears professional responsibility?',
  'The student nurse alone, as they performed the procedure',
  'The supervising nurse, who has a duty of care and supervision liability for outcomes arising from students under their direct supervision',
  'The ward manager, because all ward events are ultimately the manager''s responsibility',
  'No one, as students are not employed by the hospital',
  'B',
  'A registered nurse supervising a student nurse (or junior staff) has a professional duty of supervision. This includes: (1) Assessing the student''s competence before delegating; (2) Providing real-time correction of unsafe practice; (3) Maintaining final accountability for patient safety during the supervised procedure. Failure to correct poor sterile technique constitutes a breach of supervisory duty, making the supervising nurse professionally accountable. NCK Code of Professional Conduct; Nurses Act Cap 257; Guido''s Legal Issues in Nursing.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Supervision Liability',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse in Kenya develops a romantic relationship with a current patient in their care. Under NCK regulations, which category of professional misconduct does this constitute?',
  'A minor ethical lapse requiring self-reflection',
  'Boundary violation — professional sexual misconduct warranting investigation and potential removal from the register',
  'Acceptable if the patient initiates the relationship',
  'Only misconduct if the relationship is sexual in nature',
  'B',
  'Professional boundary violations (sexual or romantic relationships with current patients) are a serious category of professional misconduct under the NCK Code of Professional Conduct and Nurses Act Cap 257. The nurse-patient relationship inherently involves a power imbalance, vulnerability, and trust — making consent to romantic relationships with current patients fundamentally questionable. Such conduct: damages public trust in nursing, harms the patient, and constitutes misconduct regardless of who initiates the relationship. NCK will investigate and may erase the nurse from the register. NCK Code; Nurses Act Cap 257.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Professional Boundaries',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse works in a private facility that does not have professional indemnity insurance. The nurse is successfully sued for negligence causing patient harm. What is the most significant consequence of lacking indemnity insurance?',
  'The NCK will automatically provide legal defence for registered nurses',
  'The nurse is personally financially liable for all damages awarded, legal costs, and compensation, with no institutional coverage',
  'Lack of indemnity insurance is only a concern for surgical nurses',
  'The government covers all professional negligence claims against nurses under public health regulations',
  'B',
  'Professional indemnity insurance protects nurses from personal financial liability arising from claims of professional negligence. Without it, the nurse is personally responsible for: all damages awarded to the plaintiff, legal defence costs, and any compensation ordered. In Kenya, NCK does not provide legal defence. Private facility employment does not guarantee institutional cover. All nurses — especially those in private practice, independent clinics, or community health — should hold personal professional indemnity insurance. NCK Registration Guidance; Guido''s Legal Issues in Nursing.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Professional Indemnity Insurance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient''s family presents an advance directive stating that the patient does not wish to be resuscitated. The patient is now unconscious. What is the nurse''s primary obligation?',
  'Ignore the advance directive as the patient cannot confirm it currently',
  'Verify the advance directive''s validity, document, and honour it in accordance with the patient''s expressed autonomous wishes and hospital policy',
  'Contact the family to update the directive before relying on it',
  'Initiate full resuscitation anyway to avoid legal liability',
  'B',
  'An advance directive (living will/advance care plan) allows a competent person to express treatment wishes for future incapacity. When valid (signed, witnessed, not revoked), it must be respected as an expression of patient autonomy — arguably the clearest expression of autonomous choice. The nurse should: verify validity, document prominently, notify the treating team, and ensure clinical decisions align with the directive. Overriding a valid advance directive violates patient autonomy and may constitute assault/battery. Kenya Mental Health Act 2022 (advance statements); Beauchamp & Childress; Guido''s.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Advance Directives',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which principle distinguishes a nursing diagnosis from a medical diagnosis in scope of nursing practice?',
  'Nurses can make medical diagnoses if they have a degree-level qualification',
  'A nursing diagnosis identifies human responses to actual or potential health problems; a medical diagnosis identifies disease; nurses cannot legally diagnose disease in Kenya',
  'Nursing and medical diagnoses are interchangeable terms referring to the same clinical assessment process',
  'NCK authorises BScN nurses to make disease diagnoses in primary care settings',
  'B',
  'The nursing diagnosis (NANDA-I taxonomy) identifies the client''s human responses to health conditions/life processes (e.g., ''Impaired gas exchange related to pneumonia AEB dyspnoea and SpO2 88%''). The medical diagnosis identifies the pathological disease (e.g., ''Community-acquired pneumonia''). In Kenya, making a medical diagnosis (disease diagnosis) is within the scope of practice of medical practitioners (Medical Practitioners and Dentists Act Cap 253). Nurses formulate nursing diagnoses and develop nursing care plans. NCK Scope of Practice Guidelines; Nurses Act Cap 257.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Scope of Practice',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a narrow set of circumstances, a physician withholds the full prognosis of terminal cancer from a patient, judging that disclosure would cause severe psychological harm. This is referred to as:',
  'Deception for financial gain',
  'Therapeutic privilege',
  'Informed refusal',
  'Surrogate decision-making',
  'B',
  'Therapeutic privilege is the highly controversial and narrowly applied doctrine permitting a clinician to withhold information from a patient when they judge — with documented clinical reasoning — that disclosure would cause serious, immediate psychological harm (e.g., precipitate suicidal crisis or severe mental decompensation). It is NOT a routine justification for paternalistic non-disclosure. Most bioethicists and legal frameworks require extraordinary justification for therapeutic privilege and mandate documentation. It must not be used to avoid difficult conversations. Beauchamp & Childress; Kenya Medical Practice Standards.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Therapeutic Privilege',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse employed in an HIV clinic has access to patient HIV status records. The nurse discloses a patient''s HIV status to the patient''s employer without consent. Under Kenyan law, which Act has been violated?',
  'The Mental Health Act 2022',
  'The HIV and AIDS Prevention and Control Act (HAPCA) 2006 and the Kenya Data Protection Act 2019',
  'The Nursing Homes Act',
  'The Public Health Act Cap 242 only',
  'B',
  'Kenya''s HIV and AIDS Prevention and Control Act (HAPCA) 2006, Section 14, explicitly protects the confidentiality of HIV test results and prohibits unauthorised disclosure. Violation is a criminal offence. The Kenya Data Protection Act 2019 further protects health data as sensitive personal data requiring explicit consent for processing and disclosure. Unauthorised disclosure of HIV status without consent is both professional misconduct (NCK) and a criminal offence. HAPCA 2006 (Kenya); Kenya Data Protection Act 2019.',
  'BScN',
  'Paper II',
  'Professional Ethics and Law',
  'Confidentiality — HIV Status',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — HEALTH SYSTEMS IN KENYA (20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Following devolution under Kenya''s Constitution 2010, which health services are the primary responsibility of county governments?',
  'National referral hospitals (Level 6) and specialist research institutions',
  'County and sub-county health services (Levels 1–4): community health, dispensaries, health centres, and county hospitals',
  'All health services were fully transferred to counties including Level 5 and 6 hospitals',
  'Only community health services (Level 1) were devolved to counties',
  'B',
  'Kenya''s devolution (2013): County governments are responsible for Levels 1–4 (community units, dispensaries, health centres, sub-county and county hospitals). National government retains Level 5 (national and teaching/referral hospitals) and Level 6 (KEMRI, KNH as national referral). Inter-county referrals remain a challenge. Health financing inequities between counties persist due to different revenue bases. Kenya Constitution 2010; Kenya Health Policy 2014–2030; Devolution of Health Services in Kenya.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Devolution and Health',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Social Health Authority (SHA) was established in Kenya in 2023 to replace NHIF. Which statement correctly describes the three SHA funds?',
  'One fund covers all health services for all Kenyans without distinction',
  'Primary Healthcare Fund (for primary care), Social Health Insurance Fund (for secondary/tertiary care), and Emergency/Chronic/Critical Fund (for emergencies, chronic and critical conditions)',
  'SHA only covers inpatient care; outpatient services remain out-of-pocket',
  'SHA covers only formal sector employees; informal sector workers remain uncovered',
  'B',
  'Kenya Social Health Authority (SHA) 2023 established three distinct funds: (1) Primary Healthcare Fund — finances primary care services at Levels 1–3; (2) Social Health Insurance Fund (SHIF) — covers secondary and tertiary care; (3) Emergency, Chronic, and Critical Illness Fund — covers emergency care, chronic disease management, and critical illness. Contributions are income-based. SHA aims to move toward Universal Health Coverage. Social Health Insurance Act 2023 (Kenya); Kenya SHA Guidelines.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health Financing — SHA',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Kenya Health Policy 2014–2030 is built on WHO''s six health system building blocks. Which building block directly addresses the availability of nurses, doctors, and community health workers?',
  'Health information systems',
  'Health workforce (human resources for health)',
  'Service delivery',
  'Health financing',
  'B',
  'WHO''s six health system building blocks: (1) Service delivery; (2) Health workforce (HRH — training, deployment, retention, regulation of nurses, doctors, CHPs, etc.); (3) Health information systems (KHIS2/DHIS2); (4) Essential medicines and technologies; (5) Health financing; (6) Governance and leadership. Kenya''s HRH crisis — inadequate density (doctor-to-population ratio, nurse-to-patient ratio), urban-rural maldistribution, and brain drain — is addressed under the health workforce building block. Kenya Health Policy 2014–2030; WHO Health Systems Framework.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health System Building Blocks',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Task shifting in Kenya''s health system refers to which practice?',
  'Transferring administrative responsibilities from nurses to hospital managers',
  'Delegating specific clinical tasks (e.g., ART prescribing, manual vacuum aspiration) to lower-cadre health workers trained for the purpose, to improve access and efficiency',
  'Reassigning patients between hospitals to balance workload',
  'Transferring primary care services to the private sector',
  'B',
  'Task shifting (WHO policy) involves the rational redistribution of specific tasks from higher-cadre to lower-cadre but trained health workers, to optimise the health workforce in resource-limited settings. In Kenya: nurses and clinical officers prescribe ARTs (previously physician-only); nurses perform manual vacuum aspiration; CHPs provide DMPA-SC injections. This expands access without requiring proportional increases in physician numbers. WHO Task Shifting Guidelines; Kenya MOH Task Shifting Policy.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Task Shifting',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which KHIS2/DHIS2 indicator most directly measures institutional delivery rates in a county?',
  'Number of OPD attendances per year',
  'Percentage of deliveries conducted in a health facility out of expected deliveries',
  'HIV viral load suppression rate',
  'Outpatient malaria positivity rate',
  'B',
  'Institutional delivery rate = (Number of deliveries in health facilities / Expected deliveries) × 100. This indicator measures progress toward skilled birth attendance and is a key reproductive health indicator in the Kenya Health Information System (KHIS2/DHIS2). Expected deliveries are estimated from the total population using a fixed coefficient. High institutional delivery rates correlate with reduced maternal and neonatal mortality. Kenya MOH KHIS2 Indicators Glossary; DHIS2 Kenya Indicator Definitions.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health Information Systems',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A county health system analysis reveals that although the county hospital stocks essential medicines, the sub-county hospitals frequently run out. Which health system building block is primarily failing?',
  'Health workforce',
  'Service delivery',
  'Essential medicines and health technologies — supply chain and distribution',
  'Health information systems',
  'C',
  'The Kenya Essential Medicines List (KEML) defines what medicines should be available at each level. Stockouts at sub-county level despite county-level stocks indicate a failure of the essential medicines and health technologies building block, specifically supply chain management (quantification, procurement, distribution, and inventory management). Kenya MOH uses the Kenya Medical Supplies Authority (KEMSA) / Kenya Healthcare Federation supply chain framework. Rational use of medicines is also part of this building block. Kenya Health Policy 2014–2030; KEML; KEMSA.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Essential Medicines and Supply Chain',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Under Kenya''s Universal Health Coverage goals, which three dimensions define the UHC coverage index used to measure progress?',
  'Number of hospitals, number of doctors, and health budget as percentage of GDP',
  'Service coverage (essential health services), financial risk protection (protection from catastrophic spending), and population coverage (who is covered)',
  'Maternal mortality rate, under-5 mortality rate, and HIV prevalence',
  'OPD attendance, bed occupancy rate, and average length of stay',
  'B',
  'Universal Health Coverage (UHC) is defined by three dimensions: (1) Population coverage — who is covered; (2) Service coverage — which services (essential health services across promotive, preventive, curative, rehabilitative, and palliative dimensions); (3) Financial risk protection — coverage without financial hardship (catastrophic out-of-pocket expenditure). Kenya''s Big Four Agenda (2018–2022) included UHC as a pillar. Progress is measured via the UHC Service Coverage Index and catastrophic health expenditure indicators. WHO UHC Framework; Kenya UHC Strategy.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Universal Health Coverage',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which professional regulatory body in Kenya is responsible for regulating pharmacy practice and pharmacists, equivalent to the NCK for nursing?',
  'Kenya Medical Practitioners and Dentists Council (KMPDC)',
  'Pharmacy and Poisons Board (PPB)',
  'Kenya Medical Laboratory Technicians and Technologists Board (KMLTTB)',
  'Clinical Officers Council of Kenya',
  'B',
  'Kenya health professional regulatory bodies: NCK (Nurses Act Cap 257) — nurses and midwives; KMPDC (Medical Practitioners and Dentists Act Cap 253) — doctors and dentists; PPB (Pharmacy and Poisons Act Cap 244) — pharmacists and pharmacy practice; KMLTTB (Medical Laboratory Technicians Act) — laboratory professionals; Clinical Officers Council — clinical officers. The PPB also regulates medicine quality, importation, and retail pharmacy. Kenya Health Regulatory Framework.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health Regulatory Framework',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Kenya''s out-of-pocket (OOP) health expenditure as a proportion of total health expenditure remains high. What is the most significant consequence for patients?',
  'Increased utilisation of preventive services',
  'Catastrophic health expenditure causing households to sell assets, borrow money, or forego care — deepening poverty and inequity',
  'Improved quality of care due to market competition',
  'Greater patient satisfaction with health services',
  'B',
  'High OOP expenditure means patients pay for health services directly at the point of use. WHO defines catastrophic health expenditure as OOP payments exceeding 10–25% of household income. Consequences: (1) Poverty impoverishment — forced asset sales, borrowing; (2) Care avoidance — delaying or forgoing needed care; (3) Inequity — the poorest suffer most. SHA/UHC aims to reduce OOP by increasing prepayment (insurance/tax-based) mechanisms. Kenya NHSSP 2018–2023; WHO Global Health Expenditure Database; SHA rationale documentation.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health Financing',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is referred from a Level 3 health centre to a Level 5 national teaching hospital. Which information is most critical to include in the referral letter?',
  'The patient''s tribal affiliation and socioeconomic status',
  'Patient identity, presenting complaint, assessment findings, investigations done, treatment given, reason for referral, and referring clinician''s contacts',
  'Only the diagnosis, as the receiving team will assess independently',
  'The referral letter is only needed if the patient is unconscious',
  'B',
  'A complete referral letter (Kenya MOH standard) includes: (1) Patient demographics (name, age, sex, registration number); (2) Presenting complaint and clinical history; (3) Examination findings; (4) Investigations performed (results); (5) Treatment given; (6) Working diagnosis; (7) Reason for referral and specific question for the receiving team; (8) Referring clinician name, signature, facility, date, and contact. Incomplete referrals delay care. Kenya MOH Referral System Guidelines; National Referral Protocols.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Referral System',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Kenya''s health workforce faces a critical maldistribution problem. Which strategy has the strongest evidence for improving recruitment and retention of health workers in rural and underserved areas?',
  'Increasing urban hospital salaries to attract more graduates to cities',
  'Compulsory rural service posting, financial incentives (rural allowances, scholarships), local recruitment, improved rural infrastructure, and career development opportunities',
  'Reducing training of health workers to match rural posts available',
  'Outsourcing rural health services to international NGOs',
  'B',
  'WHO evidence-based strategies for rural health workforce retention (Global Policy Recommendations 2010): (1) Education — recruit from rural areas, expose students to rural training; (2) Regulatory — mandatory rural service postings; (3) Financial incentives — rural allowances, tuition bursaries bonded to rural service; (4) Professional and personal support — career pathways, CPD, improved living conditions. Compulsory service with incentives and career development has the strongest combined evidence. Kenya MOH HRH Strategy 2019–2023; WHO 2010.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Human Resources for Health',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The Kenya Expanded Programme on Immunization (KEPI) is tracked using which health information system at facility level?',
  'National Health Information Repository (NHIR)',
  'Kenya Health Information System 2 (KHIS2) powered by DHIS2',
  'NASCOP database exclusively',
  'Paper-based MOH 710 register only, not digitalised',
  'B',
  'Kenya Health Information System 2 (KHIS2) — the national digital health data platform built on DHIS2 — captures and aggregates routine health facility data including immunisation coverage (BCG, OPV, DPT-HepB-Hib, PCV, rotavirus, measles), maternal health, nutrition, HIV/ART, malaria, and other programme data from all public and increasingly private facilities. Data is used for planning, resource allocation, and performance monitoring. MOH 710 (immunisation register) is the paper source document feeding into KHIS2. Kenya MOH KHIS2 User Guide.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Health Information Systems',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse working at a Level 4 county referral hospital observes persistent stockouts of essential medicines. Which advocacy action is most appropriate within the health system framework?',
  'Prescribe alternative non-essential medicines without reporting the stockout',
  'Document the stockout, report through official channels (pharmacy, supplies officer, KHIS2 stockout reporting), and escalate to county health management if unresolved',
  'Request patients to purchase medicines from private pharmacies without documentation',
  'Accept stockouts as inevitable and adjust patient care accordingly without reporting',
  'B',
  'Nurses have an advocacy role within health systems. Persistent medicine stockouts are a systemic failure requiring formal documentation and escalation through: (1) Facility pharmacy/supplies officer; (2) Hospital management; (3) County health management team (CHMT); (4) Reporting through KHIS2 stockout module (Kenya MOH uses this data for supply planning). Documenting patient impact creates evidence for advocacy. Silent acceptance perpetuates the problem and harms patients. NCK Code of Professional Conduct (advocacy); Kenya MOH Supply Chain Management.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Nursing Advocacy in Health Systems',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Kenya''s health system operates at six levels. Which level provides comprehensive specialist medical care and serves as a training institution?',
  'Level 1 — Community health unit',
  'Level 3 — Sub-county hospital',
  'Level 5 — National teaching and referral hospital',
  'Level 4 — County referral hospital',
  'C',
  'Kenya''s Six-Level Health System: Level 1 = Community (CHPs, community health units); Level 2 = Dispensary; Level 3 = Health centre; Level 4 = Sub-county/county hospital (first surgical referral, specialist outreach); Level 5 = County teaching/national referral hospital (comprehensive specialist care, undergraduate and postgraduate medical/nursing training — e.g., KNH, Moi Teaching and Referral); Level 6 = National referral/research (KEMRI, KNH as national referral). Kenya Health Policy 2014–2030; Kenya Health Sector Referral Strategy.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Kenya Health System Levels',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Under the Kenya Community Health Policy, what is the primary role of a Community Health Promoter (CHP) at Level 1?',
  'To diagnose and treat common illnesses independently without referral',
  'To conduct household health education, health promotion, disease surveillance, referral of sick members, and support for community health programmes within their assigned households',
  'To manage the community health unit''s budget and procurement',
  'To perform ANC and delivery services within the community without facility linkage',
  'B',
  'Community Health Promoters (formerly CHWs) are community members trained to serve approximately 20–25 households. Their roles: (1) Health education and promotion (nutrition, hygiene, family planning); (2) Disease surveillance and reporting; (3) Identification and referral of sick community members to Level 2/3; (4) Follow-up on referred patients (treatment adherence — TB, HIV); (5) Support for immunisation, growth monitoring, ANC linkage. CHPs do not independently diagnose or treat disease. Kenya Community Health Policy 2020–2025; MOH CHP Training Guidelines.',
  'BScN',
  'Paper II',
  'Health Systems in Kenya',
  'Community Health System',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — NUTRITION (20 questions, advanced BScN level)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A 45-year-old woman has a BMI of 27.2 kg/m² and a waist circumference of 92 cm. How should the nurse interpret these findings?',
  'Normal weight with no metabolic risk',
  'Overweight BMI with central obesity — elevated cardiovascular and metabolic risk',
  'Obese by both BMI and waist circumference criteria',
  'Underweight with abdominal distension',
  'B',
  'BMI 25–29.9 kg/m² = Overweight. Waist circumference >88 cm in women (or >102 cm in men) indicates central/abdominal obesity, associated with visceral fat accumulation, insulin resistance, dyslipidaemia, and elevated cardiovascular and type 2 diabetes risk — independent of total BMI. This patient is overweight with central obesity. Action: dietary counselling (reduce energy-dense/processed foods, increase fibre), physical activity, and cardiovascular risk assessment. WHO BMI Classification; Kenya MOH NCD Guidelines; Brunner & Suddarth''s.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Anthropometric Assessment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward nurse needs to quickly screen a hospitalised adult patient for nutritional risk. Which validated screening tool is most appropriate?',
  'Mini Nutritional Assessment (MNA)',
  'STAMP (Screening Tool for the Assessment of Malnutrition in Paediatrics)',
  'MUST (Malnutrition Universal Screening Tool)',
  'MUAC measurement alone',
  'C',
  'MUST (Malnutrition Universal Screening Tool) is validated for nutritional risk screening in hospitalised adults and community settings. It assesses: (1) BMI; (2) Unplanned weight loss percentage; (3) Acute disease effect (nil by mouth for >5 days). Total score categorises risk (low, medium, high) and guides care pathways. MNA is validated specifically for elderly patients (>65 years). STAMP is for paediatric patients. MUAC is a field screening tool for acute malnutrition. Kenya MOH Clinical Nutrition Guidelines; MUST tool (BAPEN).',
  'BScN',
  'Paper II',
  'Nutrition',
  'Nutritional Screening and Assessment',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A severely malnourished patient is commenced on nasogastric feeding after several weeks of near-starvation. On day 2, the patient develops oedema, muscle weakness, cardiac arrhythmias, and confusion. Which electrolyte abnormality is the primary driver of refeeding syndrome?',
  'Hypernatraemia',
  'Hypophosphataemia',
  'Hypercalcaemia',
  'Hypermagnesaemia',
  'B',
  'Refeeding syndrome pathophysiology: Carbohydrate reintroduction stimulates insulin secretion → massive intracellular shift of phosphate (for ATP synthesis), potassium, and magnesium → extracellular hypophosphataemia, hypokalaemia, hypomagnesaemia. Hypophosphataemia is the primary and most dangerous electrolyte abnormality. Thiamine deficiency (Wernicke''s encephalopathy risk) also occurs. Consequences: cardiac failure (arrhythmias), respiratory failure, muscle weakness, confusion, haemolytic anaemia. NICE Refeeding Syndrome Guideline; Kenya MOH Clinical Nutrition Guidelines; Mehanna et al.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Refeeding Syndrome',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient at high risk of refeeding syndrome is about to commence enteral nutrition. Which monitoring protocol is most appropriate for the first week?',
  'Check serum electrolytes once on day 3, no cardiac monitoring required',
  'Daily measurement of phosphate, potassium, and magnesium; cardiac monitoring; start at 10 kcal/kg/day, increase slowly; IV thiamine before feeds commence',
  'Start at full caloric target immediately to correct malnutrition rapidly',
  'Restrict fluids for the first 48 hours and provide only dextrose infusion',
  'B',
  'Refeeding syndrome prevention and monitoring (NICE CG32/NG22; Kenya MOH): (1) Start low: 10 kcal/kg/day (5 kcal/kg for extreme cases), increase over 4–7 days; (2) IV thiamine before feeds; (3) Daily electrolytes: phosphate, potassium, magnesium for first week (replete deficiencies promptly); (4) Cardiac monitoring for arrhythmias; (5) Fluid balance monitoring; (6) Phosphate <0.5 mmol/L: stop feeding, replete IV, restart slowly. Rushing to full calories precipitates fatal refeeding syndrome. Mehanna et al.; NICE; Kenya MOH.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Refeeding Syndrome Monitoring',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A post-operative patient with a functioning gut requires nutritional support. Which route of nutrition is preferred, and why?',
  'Total parenteral nutrition (TPN) because it bypasses the gut and reduces infection risk',
  'Enteral nutrition via nasogastric tube, because the gut is functional — enteral feeding maintains gut integrity, reduces bacterial translocation, and has fewer serious complications than TPN',
  'Peripheral parenteral nutrition because it avoids central line insertion',
  'No nutritional support is needed for the first 7 days post-operatively',
  'B',
  '''If the gut works, use it'' — the fundamental principle of clinical nutrition. Enteral nutrition is preferred over TPN when the gut is functional because: (1) Maintains gut mucosal integrity and barrier function; (2) Reduces bacterial translocation (gut bacteria entering bloodstream); (3) Stimulates gut immunity; (4) Fewer serious complications (sepsis, metabolic, hepatic) compared to TPN; (5) Lower cost. TPN is reserved for non-functional gut (paralytic ileus, short bowel syndrome, high-output fistula). ASPEN/ESPEN Guidelines; Kenya MOH Clinical Nutrition Guidelines.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Enteral vs Parenteral Nutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is checking the placement of a nasogastric tube before commencing a feed. Which method is the gold standard for confirming correct NG tube position?',
  'Auscultating the epigastrium while injecting 20 mL of air',
  'Aspirating gastric content and testing pH with CE-marked pH indicator paper (pH ≤5.5 confirms gastric placement)',
  'Checking that the tube length at the nostril matches the insertion length',
  'Observing the patient for respiratory distress after insertion',
  'B',
  'Gold standard for NG tube position confirmation: aspirate gastric content and test with pH indicator paper — pH ≤5.5 (ideally ≤4) confirms gastric placement. If pH 5.5–6.0 or no aspirate, X-ray confirmation is required before feeding. Auscultation (whoosh test) is unreliable and no longer recommended (NPSA 2011; Kenya MOH Enteral Nutrition Guidelines). Length measurement is insufficient. pH testing must use CE-marked paper (not urine dipsticks). Never assume placement from air bolus sound. NPSA Patient Safety Alert 2011; BAPEN; Kenya MOH.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Enteral Nutrition — NG Tube Safety',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A hospitalised diabetic patient''s blood glucose is being monitored. What is the recommended glycaemic target for most non-critically ill hospitalised patients?',
  '4.0–6.0 mmol/L (normal fasting range)',
  '7.8–10.0 mmol/L',
  '12.0–15.0 mmol/L is acceptable to avoid hypoglycaemia',
  '15.0 mmol/L maximum in surgical patients',
  'B',
  'ADA and AACE consensus (2009) and Kenya MOH guidelines recommend glycaemic target 7.8–10.0 mmol/L for most hospitalised non-ICU patients, balancing: (1) Reducing hyperglycaemia complications (impaired wound healing, immune dysfunction, infection risk); (2) Avoiding hypoglycaemia (particularly dangerous in hospitalised patients — <3.9 mmol/L). Stricter targets (6.1–7.8 mmol/L) may be used in specific ICU settings. Hypoglycaemia is the primary risk of tight control. Kenya MOH Diabetes Guidelines; ADA Standards of Medical Care.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Glycaemic Control in Hospitalised Patients',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with newly diagnosed stage 3 hypertension asks for dietary advice. Which dietary approach has the strongest evidence base for blood pressure reduction?',
  'Low-fat diet with high protein supplementation',
  'DASH diet: reduce sodium to <2 g/day, increase potassium, calcium, and magnesium-rich foods, reduce saturated fat and cholesterol',
  'Ketogenic diet with restriction of all carbohydrates',
  'High-sodium diet to maintain vascular tone',
  'B',
  'DASH (Dietary Approaches to Stop Hypertension) diet: emphasises fruits, vegetables, whole grains, low-fat dairy, lean meats, nuts/legumes; restricts sodium (<2 g/day, ideally <1.5 g/day), saturated fat, and added sugars. Evidence: reduces systolic BP by 8–14 mmHg, comparable to a single antihypertensive drug. Mechanisms: potassium and calcium reduce vascular resistance; magnesium vasodilates; sodium restriction reduces volume. Kenya MOH Hypertension and NCD Management Guidelines; JNC8; DASH trial (Appel et al. NEJM 1997).',
  'BScN',
  'Paper II',
  'Nutrition',
  'Dietary Management — Hypertension',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with stage 4 chronic kidney disease (eGFR 22 mL/min/1.73m²) is receiving dietary counselling. Which dietary modifications are most important?',
  'High-protein diet to compensate for urinary protein losses, with unrestricted potassium and phosphorus',
  'Reduced protein (0.6–0.8 g/kg/day), potassium restriction, phosphorus restriction, sodium restriction, and adequate caloric intake',
  'Unrestricted diet as dietary modifications have no impact on CKD progression',
  'Very high protein diet (>2 g/kg/day) to prevent muscle wasting',
  'B',
  'CKD dietary management (KDOQI/KDIGO; Kenya MOH): (1) Protein: 0.6–0.8 g/kg/day for non-dialysis CKD (reduces nitrogen waste, slows progression); (2) Potassium: restrict if serum K+ elevated (hyperkalaemia risk — cardiac arrhythmias); (3) Phosphorus: restrict (hyperphosphataemia causes renal osteodystrophy, cardiovascular calcification); (4) Sodium: <2 g/day (fluid retention, hypertension); (5) Adequate calories (30–35 kcal/kg/day) to prevent catabolism. High protein worsens renal function. Kenya MOH Renal Nutrition Guidelines; KDIGO 2012.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Dietary Management — CKD',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A pregnant woman at 24 weeks is diagnosed with gestational diabetes mellitus (GDM). Which is the first-line nutritional management strategy?',
  'Immediately commence insulin therapy and restrict all carbohydrates',
  'Medical nutrition therapy: carbohydrate counting (targeting complex carbohydrates, avoiding simple sugars), low glycaemic index foods, regular small meals, self-monitoring of blood glucose',
  'High-carbohydrate diet (>300 g/day) to meet increased fetal energy demands',
  'Total parenteral nutrition to ensure precise glycaemic control',
  'B',
  'GDM first-line management is medical nutrition therapy (MNT): (1) Carbohydrate counting — distribute carbohydrates evenly across 3 meals and 2–3 snacks; (2) Prefer complex, low-glycaemic index carbohydrates; (3) Avoid simple sugars and sugary drinks; (4) Self-monitoring blood glucose: fasting <5.3 mmol/L, 2h post-meal <6.7 mmol/L; (5) Adequate protein and healthy fats; (6) Appropriate weight gain per pre-pregnancy BMI. Insulin is added only if glycaemic targets are not met with MNT. Kenya MOH GDM Management Guidelines; WHO GDM Guidance.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Gestational Diabetes Nutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An HIV-positive patient on ART asks about nutritional needs. Which statement best reflects evidence-based nutritional guidance for PLHIV?',
  'Nutritional needs are no different from HIV-negative individuals',
  'PLHIV have increased energy needs (10–30% above estimated requirements), require micronutrient supplementation, safe food handling (food safety is critical due to immunosuppression), and adequate protein intake',
  'PLHIV should follow a high-fat diet to prevent lipodystrophy',
  'All PLHIV require TPN regardless of nutritional status',
  'B',
  'WHO/Kenya MOH nutritional guidance for PLHIV: (1) Energy: 10% increase above estimated needs for asymptomatic PLHIV; 20–30% increase during symptomatic HIV/OI/wasting; (2) Protein: increase to 1.2–1.5 g/kg/day; (3) Micronutrients: multivitamin supplementation (especially B vitamins, vitamin A, zinc); (4) Food safety: critical for immunocompromised patients (avoid raw/undercooked foods, unpasteurised dairy, contaminated water — risk of Salmonella, Toxoplasma, Cryptosporidium); (5) Nutritional assessment at every clinic visit. Kenya MOH NASCOP Nutrition Guidelines for PLHIV.',
  'BScN',
  'Paper II',
  'Nutrition',
  'HIV and Nutrition',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A 70-year-old patient admitted with poor oral intake is screened using the Mini Nutritional Assessment (MNA). Which aspect of this tool makes it specifically appropriate for elderly patients?',
  'It measures only BMI and weight loss',
  'It includes assessment of mobility, neuropsychological problems, medication use, and self-perception of health — factors specifically relevant to malnutrition risk in elderly patients',
  'It is faster to complete than MUST and therefore appropriate for all ages',
  'It requires laboratory values (albumin, prealbumin) which are more accessible in elderly patients',
  'B',
  'The MNA (Mini Nutritional Assessment) is specifically validated for individuals aged ≥65 years. It encompasses anthropometric measures (BMI, calf circumference, weight loss), functional assessment (mobility), neuropsychological assessment (dementia, depression), medication use (polypharmacy), and self-perception of health — all factors that disproportionately affect malnutrition risk in elderly patients. It classifies: Normal nutrition, At risk of malnutrition, or Malnourished. MUST is validated for adults of all ages. Guigoz et al.; Nestlé Nutrition Institute; Kenya MOH Elderly Care Guidelines.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Nutritional Screening — Elderly',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An ICU patient on enteral feeding develops profuse watery diarrhoea. Which intervention is most evidence-based to identify and address the most likely cause?',
  'Immediately switch to TPN and withhold all enteral feeds',
  'Review medication list for laxatives and antibiotics, check feed osmolality, assess Clostridioides difficile infection, adjust feed delivery rate, and consider probiotic use',
  'Add loperamide empirically and continue feeding unchanged',
  'Increase the feed rate to rapidly deliver nutritional goals before the diarrhoea worsens',
  'B',
  'Diarrhoea during enteral feeding has multiple causes: (1) Medications — antibiotics (disrupt gut flora, C. difficile risk), prokinetics, laxatives, sorbitol-containing medications; (2) C. difficile infection (especially post-antibiotic — must exclude); (3) Hyperosmolar feeds; (4) Rapid feed rate; (5) Bacterial contamination of feeds; (6) Disease-related (IBD, malabsorption). Management: systematic review of medication, C. difficile testing (stool PCR/toxin assay), adjust rate and formula, review fibre content, consider probiotics (limited evidence). Withholding all feeds is rarely necessary. ESPEN; ASPEN; Kenya MOH.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Enteral Nutrition Complications',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with end-stage liver failure and hepatic encephalopathy Grade II is reviewed by the nutrition team. Which nutritional strategy is most appropriate?',
  'Severely restrict protein to <0.5 g/kg/day to reduce ammonia production',
  'Provide adequate protein (1.2–1.5 g/kg/day), prefer branched-chain amino acids and vegetable/dairy protein sources, ensure adequate calories, and avoid prolonged fasting',
  'Restrict all oral intake and provide TPN until encephalopathy resolves',
  'Provide high-fat, low-carbohydrate enteral formula to reduce glucose load on the failing liver',
  'B',
  'Historical protein restriction in hepatic encephalopathy is no longer recommended — it worsens malnutrition and muscle wasting (sarcopenia), which itself precipitates encephalopathy. Current EASL/ESPEN guidelines: protein 1.2–1.5 g/kg/day; prefer vegetable protein (lower ammonia generation) and branched-chain amino acids (BCAA — leucine, isoleucine, valine); 35–40 kcal/kg/day; avoid fasting (>3 hours NPO precipitates catabolism); small frequent meals. Encephalopathy is managed with lactulose, rifaximin, and treatment of precipitants. EASL Guidelines 2018; ESPEN Liver Disease Guidelines; Kenya MOH.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Nutrition in Liver Disease',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An exclusive breastfeeding mother asks when to introduce complementary foods for her 5-month-old infant who appears hungry after feeds. What is the evidence-based advice?',
  'Introduce complementary foods immediately as the infant is clearly hungry',
  'Continue exclusive breastfeeding until 6 months; introduce complementary foods at 6 months while continuing breastfeeding up to 2 years',
  'Switch to formula feeding at 5 months to provide more calories',
  'Introduce complementary foods at 4 months as the gut is mature enough',
  'B',
  'WHO and Kenya MOH recommend: Exclusive breastfeeding for the first 6 months (no water, other liquids, or solids) — breast milk provides all nutritional and fluid needs; Introduce complementary foods from 6 months (first foods: iron-rich — fortified porridge, pureed meats/legumes); Continue breastfeeding alongside complementary foods up to 2 years or beyond. Early introduction of solids before 6 months increases infection risk (immature gut immunity), allergy risk, and displaces breast milk. Perceived insufficient milk is the most common reason for early weaning — support breastfeeding technique. WHO Infant Feeding Guidelines; Kenya MOH IYCF Guidelines.',
  'BScN',
  'Paper II',
  'Nutrition',
  'Infant and Young Child Feeding',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- KRCHN Paper I (Tasks 4.1, 4.2, 4.3)
-- ============================================================

-- KRCHN Paper I — Medical-Surgical Nursing (60 questions)

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal range for adult resting heart rate?',
  '40–60 beats per minute',
  '60–100 beats per minute',
  '100–120 beats per minute',
  '120–140 beats per minute',
  'B',
  'The normal resting adult heart rate (pulse rate) is 60–100 beats per minute. Below 60 bpm is bradycardia; above 100 bpm is tachycardia. Heart rate is assessed by palpating a peripheral pulse (radial is most common) and counting for 60 seconds (or 30 seconds × 2). Kenya MOH Clinical Assessment Guidelines; Kozier & Erb Fundamentals of Nursing.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Vital Signs',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which blood pressure reading indicates hypertension in an adult?',
  '100/60 mmHg',
  '115/75 mmHg',
  '140/90 mmHg or above',
  '120/80 mmHg',
  'C',
  'Hypertension is defined as a sustained blood pressure ≥140/90 mmHg (systolic ≥140 OR diastolic ≥90 mmHg) on two or more separate occasions. This threshold is used by Kenya MOH and WHO for treatment decisions. Normal blood pressure is <120/80 mmHg. Kenya MOH Hypertension Management Guidelines; WHO/ISH 2020 Hypertension Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient shows reduced skin turgor, sunken eyes, dry mucous membranes, and decreased urine output. Which condition do these signs indicate?',
  'Fluid overload',
  'Dehydration',
  'Hypertension',
  'Hypoglycaemia',
  'B',
  'Dehydration (fluid deficit) signs include: reduced skin turgor (skin tenting), sunken eyes, dry mouth and mucous membranes, decreased urine output (oliguria — <400 mL/24h), increased thirst, rapid weak pulse, and hypotension in severe cases. Management: oral rehydration solution (ORS) if mild-moderate and conscious; IV fluids (Ringer''s lactate or normal saline) if severe. Kenya MOH Clinical Guidelines; Kozier & Erb Fundamentals.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which finding is a sign of fluid overload in a hospitalised patient?',
  'Dry mucous membranes and tachycardia',
  'Sunken eyes and decreased skin turgor',
  'Peripheral oedema, crackles in the lungs, and raised jugular venous pressure',
  'Oliguria and concentrated urine',
  'C',
  'Fluid overload (hypervolaemia) signs include: peripheral (dependent) oedema (legs, sacrum), fine crackles (pulmonary oedema) at lung bases, raised JVP, hypertension, bounding pulse, dyspnoea, and in severe cases pink frothy sputum. Management: restrict fluids, furosemide, sit upright, oxygen. Contrast with dehydration signs (dry mucous membranes, sunken eyes, oliguria). Kozier & Erb; Kenya MOH Clinical Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient''s wound shows redness, warmth, swelling, purulent discharge, and the patient has a fever. What do these findings indicate?',
  'Normal wound healing in the proliferative phase',
  'Wound infection',
  'Allergic reaction to wound dressing material',
  'Wound dehiscence',
  'B',
  'The five cardinal signs of wound infection are: redness (rubor), warmth (calor), swelling (tumour), purulent (pus) discharge, and pain (dolor), with systemic fever (raised temperature). Additional indicators: delayed healing, malodour, and elevated WBC. Management: wound swab for culture and sensitivity, appropriate antibiotic, wound cleaning and dressing change, refer if severe. Kenya MOH Wound Care Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Wound Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has a swollen, warm, tender right calf with a positive Homan''s sign. Which condition should the nurse suspect?',
  'Cellulitis only',
  'Deep vein thrombosis (DVT)',
  'Varicose veins',
  'Muscle strain',
  'B',
  'Deep vein thrombosis (DVT) presents with unilateral calf swelling, warmth, redness, tenderness, and Homan''s sign (pain on dorsiflexion of the foot — note: non-specific). Risk factors: prolonged immobility, post-surgery, oral contraceptive use, dehydration. DVT is dangerous because the clot may embolise to the pulmonary circulation (pulmonary embolism). Confirm with Doppler ultrasound. Anticoagulation (heparin/warfarin) is the treatment. Kenya MOH Clinical Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with DVT suddenly develops chest pain, shortness of breath, and haemoptysis. Which complication has occurred?',
  'Heart failure',
  'Pulmonary embolism',
  'Pneumonia',
  'Asthma attack',
  'B',
  'Pulmonary embolism (PE) is the most feared complication of DVT. A thrombus dislodges from the deep veins and travels to the pulmonary artery, obstructing blood flow. Classic signs: sudden onset chest pain (pleuritic), dyspnoea, tachycardia, haemoptysis, decreased SpO2, and apprehension. PE is life-threatening — call for help, position upright, oxygen, IV access, urgent medical review. Kenya MOH Clinical Guidelines; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'To prevent pressure ulcers in a bedridden patient, how often should the nurse reposition the patient?',
  'Every 8 hours when giving a bed bath',
  'Every 2 hours',
  'Once daily at night',
  'Every 30 minutes',
  'B',
  'Pressure ulcer prevention: reposition the patient every 2 hours (or more frequently for high-risk patients). Other measures: use pressure-relieving mattress/cushion, maintain skin hygiene and moisture balance, ensure adequate nutrition, and keep skin free from friction/shear. Never massage bony prominences — massaging damaged tissue worsens injury. Document all repositioning in the care plan. Kenya MOH Pressure Ulcer Prevention Guidelines; EPUAP/NPUAP Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Skin Integrity and Pressure Ulcer Prevention',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is having a seizure. What is the most important nursing action during the seizure?',
  'Restrain the patient''s limbs to prevent injury',
  'Insert an oral airway or tongue depressor between the patient''s teeth',
  'Maintain airway patency, protect from injury by padding side rails, note seizure duration, and do NOT restrain or put anything in the mouth',
  'Administer IV diazepam immediately without physician order',
  'C',
  'Seizure management: Do NOT restrain the patient (risk of fractures); Do NOT put anything in the mouth (risk of tooth fracture, aspiration); Protect from injury (pad rails, remove hard objects, guide head); Maintain airway (recovery position post-seizure); Note timing (call help if >5 minutes — status epilepticus); Oxygen as needed; Document and report. After seizure: recovery position, check responsiveness. Kenya MOH Epilepsy Management Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with suspected anaphylaxis develops urticaria, bronchospasm, and hypotension after a penicillin injection. What is the first-line treatment?',
  'IV antihistamine (chlorphenamine)',
  'IV hydrocortisone',
  'IM adrenaline (epinephrine) 0.5 mg of 1:1000',
  'Oral salbutamol tablet',
  'C',
  'Anaphylaxis first-line treatment: IM adrenaline (epinephrine) 0.5 mg (1:1000 solution = 0.5 mL) into the outer mid-thigh. This is the life-saving intervention — acts within minutes to reverse vasodilation, bronchospasm, and oedema. Call for help, lay flat (legs raised if hypotensive), 100% oxygen, IV access, IV fluids. Antihistamines and steroids are secondary adjuncts. NEVER delay adrenaline. Kenya MOH Anaphylaxis Protocol; Resuscitation Council UK.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Emergency Nursing',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In hypovolaemic shock, which is the earliest sign the nurse should recognise?',
  'Hypotension (systolic BP <90 mmHg)',
  'Tachycardia (heart rate >100 bpm)',
  'Altered consciousness',
  'Cyanosis',
  'B',
  'Tachycardia is the earliest compensatory sign of hypovolaemic shock. The body compensates for falling cardiac output by increasing heart rate via sympathetic stimulation. Hypotension is a late sign (appears after 30% blood volume loss). Altered consciousness and cyanosis are very late signs indicating severe decompensation. Recognising early shock (tachycardia + cool clammy skin + restlessness) allows timely IV fluid resuscitation. Kenya MOH Shock Management; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Shock',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient receiving a blood transfusion develops fever, chills, back pain, and haematuria 30 minutes after starting the transfusion. What is the priority nursing action?',
  'Slow down the transfusion rate and give paracetamol',
  'Stop the transfusion immediately, keep IV line open with normal saline, notify the physician, and send the blood bag to the laboratory',
  'Complete the transfusion and document the reaction after',
  'Administer IV hydrocortisone and continue the transfusion',
  'B',
  'A blood transfusion reaction (haemolytic or febrile): STOP transfusion IMMEDIATELY — this is the priority. Maintain IV access with normal saline (not the blood or any blood-containing line). Notify the physician urgently. Return blood bag, administration set, and fresh blood and urine samples to the laboratory for investigation. Monitor vital signs closely. Haematuria indicates haemolysis (ABO incompatibility) — life-threatening. Never continue a transfusion during a suspected reaction. Kenya MOH Blood Transfusion Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Blood Transfusion',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a head injury is assessed using the Glasgow Coma Scale (GCS). A GCS score of 13 indicates:',
  'Severe brain injury (GCS 3–8)',
  'Mild brain injury or mild alteration in consciousness (GCS 13–15)',
  'Normal consciousness',
  'Brain death',
  'B',
  'GCS range: 3 (minimum — deep coma/unresponsive) to 15 (full consciousness). Classification: 13–15 = Mild brain injury; 9–12 = Moderate brain injury; 3–8 = Severe brain injury. GCS 3 indicates deep coma or brain death (requires further testing). GCS assesses: Eyes (1–4), Verbal (1–5), Motor (1–6). A GCS of 13 indicates mild alteration — monitor closely for deterioration. Kenya MOH Head Injury Management; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How often should a nurse monitor a patient''s vital signs in the first hour after a surgical procedure?',
  'Every 4 hours',
  'Every 2 hours',
  'Every 15 minutes',
  'Once on return from theatre',
  'C',
  'Postoperative monitoring: vital signs (pulse, blood pressure, respiratory rate, temperature, SpO2) should be recorded every 15 minutes for the first hour (most critical period for haemorrhage, airway problems, hypotension, and respiratory depression). Frequency reduces to every 30 minutes for the second hour, then hourly, then 4-hourly as the patient stabilises. Increase frequency if clinical condition deteriorates. Kenya MOH Post-operative Care Protocols; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with COPD on oxygen therapy has an SpO2 of 94%. What should the nurse do?',
  'Increase oxygen flow to achieve SpO2 ≥98%',
  'Adjust oxygen to maintain SpO2 between 88–92% to avoid suppressing the hypoxic respiratory drive',
  'Discontinue oxygen as the patient does not need it',
  'Administer high-flow oxygen at 15 L/min via non-rebreather mask',
  'B',
  'COPD patients may depend on hypoxic drive (low PO2) to stimulate breathing because chronic CO2 retention blunts their central chemoreceptor response. Target SpO2 for COPD is 88–92% — not higher. Increasing SpO2 above 92% risks carbon dioxide retention (hypercapnic respiratory failure). An SpO2 of 94% is above target — reduce oxygen flow. This is a critical safety principle. Kenya MOH COPD Management Guidelines; BTS Oxygen Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with Type 1 diabetes presents with Kussmaul breathing, fruity breath, hyperglycaemia, and ketones in the urine. Which condition does this indicate?',
  'Hypoglycaemia',
  'Diabetic ketoacidosis (DKA)',
  'Hyperosmolar hyperglycaemic state',
  'Insulin shock',
  'B',
  'Diabetic ketoacidosis (DKA) presents with: hyperglycaemia (>11 mmol/L), Kussmaul breathing (deep rapid breathing to blow off CO2/compensate for metabolic acidosis), fruity/acetone breath (from ketone production), ketonuria and ketonaemia, dehydration, nausea/vomiting, abdominal pain. Management: IV fluids, insulin infusion, electrolyte correction (especially K+), treat precipitant. Kenya MOH Diabetes Management Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A conscious diabetic patient has blood glucose of 2.8 mmol/L and is sweating, trembling, and confused. What is the immediate nursing action?',
  'Administer IV insulin',
  'Give oral glucose (sugar water, fruit juice, glucose tablets, or dextrose gel)',
  'Withhold all food and call the physician',
  'Administer IV normal saline 1 litre stat',
  'B',
  'For a conscious patient with symptomatic hypoglycaemia (blood glucose <3.9 mmol/L): give 15–20 g of fast-acting oral carbohydrate (4 glucose tablets, 150 mL fruit juice, or 3 teaspoons of sugar in water). Recheck glucose after 15 minutes — repeat if still low. Then give a slow-acting carbohydrate snack. For unconscious/swallowing-impaired patients: IV 50% dextrose (25–50 mL) or IM/SC glucagon. Never give oral glucose to an unconscious patient (aspiration risk). Kenya MOH Diabetes Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with acute chest pain described as crushing, radiating to the left arm and jaw, with diaphoresis. What is the first medication the nurse should administer (as per protocol)?',
  'IV morphine',
  'Aspirin 300 mg orally (loading dose)',
  'Sublingual nitroglycerin × 3 doses',
  'IV metoprolol',
  'B',
  'In acute myocardial infarction (STEMI/NSTEMI), aspirin 300 mg orally (loading dose) is the first and most critical medication — it irreversibly inhibits platelet aggregation and reduces thrombus extension. Give immediately unless contraindicated (known allergy, active bleeding). After aspirin: nitroglycerin sublingual for pain if BP allows, oxygen if SpO2 <94%, morphine for unrelieved pain, P2Y12 inhibitor (e.g. clopidogrel 300 mg), urgent ECG, and reperfusion. Kenya MOH ACS Guidelines; WHO.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Emergencies',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with heart failure has severe leg oedema and pulmonary congestion. Which medication is most commonly used to reduce fluid overload?',
  'Digoxin',
  'Amlodipine',
  'Furosemide (frusemide)',
  'Metoprolol',
  'C',
  'Furosemide (frusemide) is a loop diuretic — the first-line treatment for symptomatic fluid overload in heart failure. It inhibits the Na-K-2Cl cotransporter in the thick ascending loop of Henle, promoting diuresis and reducing preload, pulmonary congestion, and peripheral oedema. Monitor: urine output, weight, electrolytes (especially potassium — risk of hypokalaemia). Kenya MOH Heart Failure Management Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Before administering digoxin, a nurse assesses the patient''s apical pulse and finds it is 54 beats per minute. What should the nurse do?',
  'Administer digoxin as prescribed — the rate is within 5 bpm of normal',
  'Withhold digoxin and inform the physician',
  'Double the dose to stimulate the heart rate',
  'Administer half the dose',
  'B',
  'Digoxin should be withheld (not administered) if the apical pulse is below 60 bpm in adults (or below 70 bpm in paediatric patients, depending on age). Digoxin slows the heart rate; administering it when the rate is already bradycardic risks severe bradycardia or heart block. The nurse must document the withheld dose and notify the physician. Never alter the dose independently. Kenya MOH Prescribing and Administration Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Pharmacology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is about to administer potassium chloride (KCl) via IV. What is the most critical safety rule?',
  'Give it as a rapid IV push for fastest effect',
  'Always dilute KCl in IV fluid and administer by infusion — never give as a direct bolus injection',
  'Give undiluted through a peripheral cannula over 2 minutes',
  'KCl can be given IM if IV access is difficult',
  'B',
  'IV potassium chloride administered undiluted as a bolus causes fatal cardiac arrest (ventricular fibrillation) — this is a high-alert medication. KCl must always be diluted (maximum 40 mmol/L peripherally, 80 mmol/L centrally) and infused slowly (maximum 10–20 mmol/hour peripherally). It must never be given as a direct IV push. KCl ampoules should be stored separately from other ampoules. Kenya MOH High-Alert Medications Protocol; WHO Patient Safety.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Electrolyte Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with right-sided heart failure will most likely show which sign?',
  'Pulmonary oedema with pink frothy sputum',
  'Orthopnoea',
  'Peripheral oedema and raised jugular venous pressure',
  'Haemoptysis',
  'C',
  'Right-sided heart failure causes backpressure in the systemic venous circulation, producing: peripheral (dependent) oedema (ankles, legs, sacrum), raised jugular venous pressure (JVP), hepatomegaly, ascites, and anorexia/nausea. Left-sided heart failure causes pulmonary oedema (crackles, orthopnoea, pink frothy sputum, paroxysmal nocturnal dyspnoea). Brunner & Suddarth; Kenya MOH Clinical Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is diagnosed with pulmonary tuberculosis (TB). Which type of isolation precautions should be implemented?',
  'Contact precautions only',
  'Droplet precautions',
  'Airborne precautions with N95 respirator, negative pressure room (or well-ventilated room)',
  'Standard precautions only are sufficient',
  'C',
  'Pulmonary TB is transmitted via airborne droplet nuclei (<5 microns) that remain suspended in air. Airborne precautions are required: (1) Single room with ≥6 air changes/hour or negative pressure if available; (2) N95 respirator for healthcare workers; (3) Patient to wear surgical mask when outside the room; (4) Patient education and DOTS. Kenya MOH TB Control Programme; WHO TB IPC Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Infectious Diseases',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the current first-line antiretroviral therapy (ART) regimen for adults with HIV in Kenya?',
  'AZT + 3TC + NVP',
  'TDF + 3TC + DTG (Tenofovir + Lamivudine + Dolutegravir = TLD)',
  'D4T + 3TC + EFV',
  'TDF + FTC + EFV (Atripla)',
  'B',
  'Kenya MOH NASCOP Guidelines (2022): First-line ART for adults and adolescents (≥20 kg): TDF + 3TC + DTG (TLD) in a fixed-dose combination tablet taken once daily. DTG (dolutegravir) has higher efficacy, better tolerability, and a higher genetic barrier to resistance compared to EFV. TLD is provided free of charge at all public health facilities. Kenya MOH NASCOP ART Guidelines 2022.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'HIV/AIDS Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with fever, chills, rigors, and a positive malaria RDT. Which first-line treatment does Kenya MOH recommend for uncomplicated malaria?',
  'Quinine 600 mg three times daily for 7 days',
  'Artemether-Lumefantrine (AL, Coartem) 3-day course',
  'Chloroquine 600 mg on day 1',
  'Sulfadoxine-pyrimethamine (SP) single dose',
  'B',
  'Kenya MOH NMCP Guidelines: First-line treatment for uncomplicated malaria (P. falciparum) in adults and children ≥5 kg: Artemether-Lumefantrine (AL/Coartem) oral 3-day course. Dose by weight. Take with food (fatty meal improves absorption). Chloroquine resistance is widespread. Quinine is second-line for uncomplicated and first-line for complicated malaria when IV artesunate is unavailable. SP (Fansidar) is used for IPTp in pregnancy. Kenya MOH NMCP Malaria Treatment Guidelines 2021.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Infectious Diseases',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has rebound tenderness and pain at McBurney''s point in the right iliac fossa. Which condition does this suggest?',
  'Peptic ulcer disease',
  'Appendicitis',
  'Diverticulitis',
  'Inguinal hernia',
  'B',
  'Appendicitis classic presentation: pain migrating from periumbilical area to RLQ (McBurney''s point — 1/3 distance from ASIS to umbilicus), rebound tenderness (peritoneal irritation), guarding, anorexia, nausea, low-grade fever, and elevated WBC. Rovsing''s sign (LLQ pressure causes RLQ pain) is also positive. This is a surgical emergency — refer immediately. Perforation causes generalised peritonitis. Kenya MOH Surgical Emergency Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the primary lifestyle advice for a patient with a peptic ulcer?',
  'Increase coffee and alcohol intake to stimulate gastric motility',
  'Avoid NSAIDs, smoking, and alcohol; eat small regular meals; take prescribed medications',
  'Eat three large meals per day and avoid all physical activity',
  'Take aspirin daily to reduce stomach inflammation',
  'B',
  'Peptic ulcer disease management: Avoid NSAIDs (damage gastric mucosa), smoking (reduces mucosal prostaglandins and blood flow, delays healing), and alcohol (gastric irritant). Eat small frequent meals. Take prescribed medications (PPIs, H2 blockers, antacids). Test and treat H. pylori (triple therapy if positive). Avoid spicy and acidic foods if symptomatic. Stress management. Kenya MOH GI Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with hepatitis B asks how to prevent spreading the infection to family members. Which advice is most important?',
  'Avoid shaking hands and sharing meals with family members',
  'Use condoms for sexual intercourse, do not share needles or sharps, ensure all family members are vaccinated against hepatitis B',
  'Keep the patient in strict isolation at home',
  'Take antibiotics for two weeks to clear the infection',
  'B',
  'Hepatitis B is transmitted by blood (sharing needles, sharps), sexual contact, and perinatal (mother-to-child) routes. Prevention: use condoms, do not share needles/razors/toothbrushes/nail clippers, hepatitis B vaccination for all household contacts (3-dose schedule), PMTCT for HBsAg-positive pregnant women. Hepatitis B is NOT transmitted by casual contact (handshakes, sharing food, hugging). Antibiotics have no effect on viral hepatitis. Kenya MOH Hepatitis B Guidelines; WHO.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Infectious Diseases',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with liver cirrhosis develops confusion, flapping tremor (asterixis), and abdominal distension. Which complications are present?',
  'Hypoglycaemia and appendicitis',
  'Hepatic encephalopathy and ascites',
  'Renal failure and pneumonia',
  'Hyperthyroidism and pleural effusion',
  'B',
  'Liver cirrhosis complications: (1) Ascites — portal hypertension causes fluid accumulation in the peritoneal cavity (abdominal distension, shifting dullness, fluid thrill); (2) Hepatic encephalopathy — toxic metabolites (ammonia) cross blood-brain barrier causing confusion, asterixis (flapping tremor), altered consciousness; (3) Variceal bleeding; (4) Spontaneous bacterial peritonitis (SBP); (5) Hepatorenal syndrome. Management includes lactulose, rifaximin, diuretics (spironolactone/furosemide), sodium restriction, and treatment of precipitants. Kenya MOH GI Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Hepatic Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient complains of dysuria, urinary frequency, and urgency, with cloudy malodorous urine. What condition does this suggest?',
  'Pyelonephritis',
  'Urinary tract infection (UTI)',
  'Kidney stones',
  'Urinary incontinence',
  'B',
  'Urinary tract infection (UTI) — typically lower UTI (cystitis/urethritis) — presents with: dysuria (pain/burning on urination), frequency (urge to urinate often), urgency (strong sudden urge), cloudy and/or malodorous urine, and lower abdominal discomfort. Pyelonephritis (upper UTI) adds fever, rigors, flank pain, and costovertebral angle tenderness. UTI diagnosis confirmed by urine culture. Treatment: trimethoprim, nitrofurantoin, or co-trimoxazole per sensitivity. Kenya MOH UTI Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Urinary Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is the correct procedure for daily urethral catheter care?',
  'Irrigate the catheter with antiseptic solution twice daily',
  'Clean the urethral meatus and perineum daily with soap and water, maintain a closed drainage system, and keep the bag below bladder level',
  'Change the drainage bag every 24 hours routinely',
  'Clamp the catheter for 4 hours hourly to prevent detrusor muscle weakness',
  'B',
  'Urinary catheter care (CAUTI prevention): (1) Daily perineal/meatal hygiene with soap and water (front to back in women); (2) Maintain closed drainage system (never disconnect); (3) Keep drainage bag below bladder level at all times (prevent backflow); (4) Secure catheter to prevent urethral traction; (5) Adequate fluid intake (2–3 L/day if not restricted); (6) Daily review of catheter necessity — remove as soon as possible. Routine irrigation and bag changes are NOT recommended. Kenya MOH CAUTI Prevention Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Urinary Catheter Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse uses a numeric pain rating scale (0–10) to assess a patient''s pain. A score of 8 indicates:',
  'Mild pain requiring reassurance only',
  'No pain',
  'Severe pain requiring immediate attention and analgesia',
  'Moderate pain managed with non-pharmacological measures alone',
  'C',
  'Numeric Pain Rating Scale: 0 = no pain; 1–3 = mild pain; 4–6 = moderate pain; 7–10 = severe pain. A score of 8 indicates severe pain requiring prompt analgesia and reassessment. Pain is the fifth vital sign. Unrelieved severe pain impairs recovery, breathing, and mobility. Reassess pain 30–60 minutes after analgesia. Use non-verbal cues (FLACC or body language) for patients unable to communicate. Kenya MOH Pain Management Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Pain Assessment and Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the 5 Ps of neurovascular assessment used after a fracture or casting?',
  'Pulse, Pressure, Position, Plan, Pain',
  'Pain, Pallor, Paraesthesia (tingling/numbness), Paralysis, Pulselessness',
  'Pressure, Pallor, Pulse, Perspiration, Paralysis',
  'Pain, Pulse, Perfusion, Position, Pressure',
  'B',
  'The 5 Ps of neurovascular assessment (performed hourly for the first 24 hours after fracture, casting, or orthopaedic surgery): Pain (especially with passive stretch — compartment syndrome), Pallor (skin colour — blanching, whiteness), Paraesthesia (tingling, numbness — nerve compression/ischaemia), Paralysis (inability to move distal part — severe ischaemia), Pulselessness (absent distal pulse — arterial compromise). Any abnormality requires immediate reporting and action. Kenya MOH Orthopaedic Nursing Standards; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Orthopaedic Nursing',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient sustains a burn injury. What is the correct first aid for a thermal burn?',
  'Apply butter or cooking oil to the burn to reduce pain',
  'Break any blisters immediately and cover with dry gauze',
  'Run cool water over the burn for 10–20 minutes, remove jewellery and clothing (unless stuck), and cover with clean non-fluffy material',
  'Apply ice packs directly to the burn for 30 minutes',
  'C',
  'Burn first aid: (1) Cool running water for 10–20 minutes — reduces tissue temperature and limits burn depth; (2) Remove jewellery and loose clothing (swelling occurs rapidly); (3) Cover with clean non-fluffy material (cling film, clean plastic bag); (4) Do NOT use ice (causes frostbite), butter, oil, or toothpaste (cause infection, retain heat); (5) Do NOT break blisters (barrier to infection); (6) Assess airway if facial/inhalation burns. Kenya MOH Burns First Aid Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Burns Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with sudden facial drooping on the right side, right arm weakness, and slurred speech. What acronym should the nurse use to recognise these stroke signs?',
  'PEARL',
  'FAST (Face drooping, Arm weakness, Speech difficulty, Time to call for help)',
  'ABCDE',
  'CIWA',
  'B',
  'FAST is the international stroke recognition tool: F = Face drooping/uneven smile; A = Arm weakness — one arm drifts down; S = Speech difficulty — slurred, confused, or unable to speak; T = Time to call emergency services immediately. Additional signs (BEFAST): B = Balance loss, E = Eye disturbance. In stroke, time is brain — every minute of delay increases neuronal death. Kenya MOH Stroke Management Guidelines; WHO Stroke Programme.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the earliest sign of hypoxia that a nurse should recognise?',
  'Central cyanosis',
  'Restlessness and agitation',
  'Bradycardia',
  'Hypotension',
  'B',
  'The earliest sign of hypoxia is restlessness and agitation — caused by decreased oxygen delivery to the brain. Patients may appear anxious, confused, or combative before other signs develop. Tachycardia follows. Cyanosis (bluish discolouration of lips/nail beds) is a LATE sign, appearing only when >5 g/dL of haemoglobin is desaturated. A new onset of confusion or restlessness in a hospitalised patient always requires oxygen saturation check. Kenya MOH Clinical Assessment; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which position is most appropriate for a patient with pneumonia who is having difficulty breathing?',
  'Flat supine position',
  'Trendelenburg (head down) position',
  'Semi-Fowler''s or high Fowler''s position (head of bed elevated 30–90 degrees)',
  'Left lateral position',
  'C',
  'Semi-Fowler''s (30–45°) or high Fowler''s (60–90°) position is optimal for respiratory distress — gravity allows the diaphragm to move downward freely, maximising lung expansion, reducing work of breathing, and improving ventilation-perfusion matching. Flat supine and Trendelenburg positions increase work of breathing and worsen dyspnoea. Lean forward (tripod) position may further assist in severe dyspnoea. Kenya MOH Respiratory Care Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a severe asthma attack arrives in the ward. What is the first medication to administer?',
  'IV aminophylline immediately',
  'Nebulised salbutamol (SABA — short-acting beta-2 agonist)',
  'IV methylprednisolone',
  'Oral montelukast',
  'B',
  'Acute asthma attack management — first-line: nebulised salbutamol (2.5–5 mg in 2.5–5 mL normal saline via nebuliser, repeated every 20 minutes if required), oxygen to maintain SpO2 94–98%, and systemic corticosteroid (prednisolone oral or hydrocortisone IV). Ipratropium bromide added for moderate-severe attacks. Aminophylline is reserved for severe/life-threatening asthma not responding to bronchodilators. Kenya MOH Asthma Guidelines; BTS/SIGN Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with raised intracranial pressure (ICP) requires positioning. What position is recommended?',
  'Trendelenburg (head down 15–30 degrees)',
  'Head of bed elevated 15–30 degrees with the neck in neutral position',
  'Left lateral recovery position',
  'Flat supine to maximise cerebral perfusion pressure',
  'B',
  'For raised ICP: elevate head of bed 15–30 degrees (promotes cerebral venous drainage, reduces ICP); maintain neck in neutral alignment (neck rotation/flexion obstructs venous return and increases ICP); avoid Trendelenburg (increases ICP); maintain adequate MAP; avoid clustering of nursing activities. Avoid stimulation (suction, turning) for extended periods. Kenya MOH Neurosurgical/Critical Care Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with epilepsy has just had a generalised tonic-clonic seizure lasting 2 minutes. The seizure has stopped. What is the nurse''s next action?',
  'Restrain the patient to prevent further injury',
  'Insert an oral airway immediately while the patient is post-ictal',
  'Place in the recovery (lateral) position, ensure airway is clear, administer oxygen, and monitor',
  'Leave the patient to rest and document later',
  'C',
  'Post-seizure care: (1) Recovery position (lateral/left lateral) — maintains airway, prevents aspiration if vomiting; (2) Clear any secretions/vomit from the mouth (suction if available); (3) Oxygen via mask or nasal prongs; (4) Do NOT insert anything in mouth during post-ictal period; (5) Monitor: vital signs, level of consciousness (GCS), SpO2; (6) Document: timing, type of movements, duration, post-ictal state; (7) Notify physician. If seizure recurs or >5 minutes: IV diazepam or IM midazolam. Kenya MOH Epilepsy Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has a urethral catheter in situ for 5 days post-surgery. The ward round team asks for daily catheter review. What is the most important question to ask?',
  'Is the catheter draining well and is the urine colour normal?',
  'Does this patient still need the catheter today, and can it be removed?',
  'Should we change the catheter to a larger size?',
  'Should we add a second catheter for bilateral drainage?',
  'B',
  'Daily catheter necessity review is the most critical CAUTI prevention intervention. The question: ''Does this patient still clinically need this catheter today?'' If not needed (patient can void, no urinary retention, surgery complete), remove immediately. CAUTI risk increases with each day of catheterisation. Unneeded catheters must be removed promptly. This is a WHO and Kenya MOH IPC priority indicator. Kenya MOH CAUTI Prevention Guidelines; CDC CAUTI Toolkit.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Urinary Catheter Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with type 2 diabetes has blood glucose of 18 mmol/L and complains of excessive thirst, frequent urination, and blurred vision. Which term describes excessive urination in diabetes?',
  'Dysuria',
  'Oliguria',
  'Polyuria',
  'Haematuria',
  'C',
  'The classic triad of uncontrolled diabetes: Polyuria (excessive urination — from osmotic diuresis as glucose spills into urine dragging water), Polydipsia (excessive thirst — from dehydration), Polyphagia (excessive hunger — cellular glucose starvation). Blurred vision occurs from osmotic changes in the lens. Dysuria = painful urination; oliguria = decreased urine output; haematuria = blood in urine. Kenya MOH Diabetes Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with chronic kidney disease (CKD) has a serum potassium of 6.8 mEq/L with peaked T-waves on ECG. Which is the priority nursing action?',
  'Give the patient a banana to boost potassium',
  'Initiate continuous cardiac monitoring and notify the physician immediately',
  'Restrict fluids and check urine output',
  'Administer a potassium supplement',
  'B',
  'Hyperkalaemia (K+ >5.5 mEq/L) causes life-threatening cardiac arrhythmias. Peaked T-waves on ECG indicate myocardial irritability — immediate risk of VF and cardiac arrest. Priority: initiate continuous cardiac monitoring, notify physician immediately. Physician will order: calcium gluconate (stabilise myocardium), insulin + dextrose or albuterol (shift K+ into cells), kayexalate or loop diuretic (eliminate K+). Bananas and potassium supplements are absolutely contraindicated. Kenya MOH CKD Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Renal Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient recovering from a myocardial infarction is advised to modify their lifestyle. Which statement about activity progression is correct?',
  'The patient should remain completely on bed rest for 6 weeks',
  'Gradual progressive mobilisation starting with sitting, then standing, then walking, guided by symptoms and heart rate response',
  'Resume full unrestricted physical activity within 48 hours',
  'Avoid all physical activity permanently',
  'B',
  'Post-MI cardiac rehabilitation includes progressive mobilisation: phase 1 (inpatient) — sitting up in bed day 1–2, standing and short walks day 2–3, progression guided by absence of chest pain, dyspnoea, arrhythmias, or excessive tachycardia. Monitor pulse and symptoms before, during, and after activity. Phases 2–4 (outpatient rehabilitation) follow after discharge. Complete bed rest worsens outcomes (PE, deconditioning). Kenya MOH Cardiac Rehabilitation Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Cardiovascular Rehabilitation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with COPD is educated about the difference between a reliever and preventer inhaler. Which statement is correct?',
  'Salbutamol (blue) is a preventer inhaler taken twice daily; corticosteroid inhaler is for acute relief',
  'Salbutamol (blue inhaler) is the reliever — for acute breathlessness; inhaled corticosteroid (brown/orange) is the preventer — taken regularly to reduce inflammation',
  'Both inhalers are identical and can be used interchangeably',
  'Preventer inhaler should be used only when having an attack',
  'B',
  'Reliever inhaler: salbutamol (short-acting beta-2 agonist, SABA) — blue — used as needed for acute wheeze/breathlessness. Preventer inhaler: inhaled corticosteroid (ICS) — beclometasone, budesonide (brown/orange) — used regularly every day to reduce airway inflammation and prevent attacks. Patients must NOT use preventer as reliever and vice versa. Education on inhaler technique (spacer for children), mouth rinsing after ICS, and regular use is critical. Kenya MOH Asthma/COPD Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Respiratory Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a long leg cast complains of severe pain in the toes that is worsened by passive extension of the toes, and the toes are pale and cold. What is the priority nursing action?',
  'Administer additional analgesia and reassess in 2 hours',
  'Loosen the cast bandage and notify the physician immediately — suspect compartment syndrome',
  'Elevate the limb higher and apply ice',
  'Document and continue to monitor every 4 hours',
  'B',
  'Pain disproportionate to injury, worsened by passive stretch (passive extension of toes stretching the anterior compartment muscles), with pallor, coldness, and loss of sensation/pulse = compartment syndrome — a surgical emergency. Immediate action: loosen/bivalve cast, notify physician urgently, prepare for emergency fasciotomy. Delay causes irreversible muscle and nerve ischaemia (Volkmann''s contracture). Elevation alone can worsen compartment pressure by reducing arterial perfusion. Kenya MOH Orthopaedic Emergency Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Orthopaedic Nursing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with sickle cell disease presents during a vaso-occlusive crisis with severe bone pain and fever. Which nursing interventions are most important?',
  'Restrict fluids and apply cold packs to the painful areas',
  'Administer prescribed analgesia, ensure adequate hydration (oral/IV fluids), apply warmth, and monitor vital signs',
  'Encourage strenuous exercise to improve circulation',
  'Withhold all medications until blood results are available',
  'B',
  'Sickle cell vaso-occlusive crisis management: (1) Analgesia — strong opioids (morphine) often required for severe pain; (2) Adequate hydration — oral/IV fluids to reduce sickling (dehydration worsens crisis); (3) Warmth to affected area (cold causes vasoconstriction, worsening sickling); (4) Oxygen if SpO2 low; (5) Vital signs monitoring; (6) Check for infection (common precipitant); (7) Blood transfusion for severe anaemia or acute chest syndrome. Kenya MOH Sickle Cell Disease Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Haematological Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient who is HIV-positive and on ART returns to clinic for a 6-month review. Which laboratory test is most important to assess treatment response?',
  'Full blood count (FBC)',
  'Liver function tests',
  'HIV viral load',
  'Random blood glucose',
  'C',
  'HIV viral load (VL) is the primary indicator of ART treatment response. Undetectable VL (target: <200 copies/mL, ideally <50 copies/mL) indicates ART is working and the patient will not transmit HIV (Undetectable = Untransmittable, U=U). VL is measured at 3 months after ART initiation, then 6-monthly. If VL is detectable, adherence is assessed and regimen may need changing. CD4 count monitors immune recovery. Kenya MOH NASCOP ART Guidelines 2022.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'HIV/AIDS Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is admitted with uncontrolled type 2 diabetes, HbA1c of 11%, and BMI 31. Which medication is considered first-line for type 2 diabetes in Kenya?',
  'Insulin glargine once daily',
  'Metformin 500 mg twice daily with food',
  'Glibenclamide 5 mg three times daily',
  'Pioglitazone 30 mg once daily',
  'B',
  'Kenya MOH Diabetes Guidelines: First-line pharmacotherapy for type 2 diabetes (absent contraindications) is Metformin. Dose: start 500 mg twice daily with meals, titrate to 1000 mg twice daily. Mechanism: reduces hepatic glucose production, improves insulin sensitivity. Advantages: weight-neutral or modest weight loss, low hypoglycaemia risk, cardiovascular benefit (UKPDS), inexpensive. Contraindicated in eGFR <30 mL/min (lactic acidosis risk). Kenya MOH Diabetes Management Guidelines 2021.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Endocrine Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient complains of substernal chest pain that improves with antacids and is worse when lying flat. Which condition is most likely?',
  'Myocardial infarction',
  'Aortic dissection',
  'Gastroesophageal reflux disease (GERD)',
  'Pulmonary embolism',
  'C',
  'GERD (gastroesophageal reflux disease) causes substernal/epigastric burning (heartburn) that: improves with antacids (neutralise acid), worsens lying flat or after meals (gravity increases reflux), worsens after coffee, alcohol, spicy food, or large meals. This helps differentiate from MI (unrelieved by antacids, radiation to arm/jaw, diaphoresis) and PE (pleuritic, dyspnoea). Management: PPIs, lifestyle modification. Kenya MOH GI Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which assessment finding indicates the patient may be experiencing internal bleeding after abdominal trauma?',
  'Bradycardia and elevated blood pressure',
  'Tachycardia, hypotension, abdominal rigidity, and distension',
  'Fever and elevated white blood cell count alone',
  'Peripheral oedema and raised JVP',
  'B',
  'Signs of internal (intra-abdominal) haemorrhage: tachycardia (compensatory), hypotension (once >30% blood volume lost), abdominal rigidity (involuntary guarding — haemoperitoneum irritates peritoneum), abdominal distension (blood accumulation), increasing abdominal girth, pallor, cold clammy skin, falling Hb on serial bloods, and positive FAST ultrasound. This is a surgical emergency — call surgeon, IV access × 2 large bore, cross-match blood. Kenya MOH Trauma Management; ATLS.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Trauma Nursing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with acute pancreatitis is assessed. Which finding is a known complication of pancreatitis?',
  'Hypertension and bradycardia',
  'Hypocalcaemia (Chvostek''s sign, muscle cramps)',
  'Hypernatraemia and polyuria',
  'Hyperglycaemia due to excess insulin production',
  'B',
  'Acute pancreatitis complications include: (1) Hypocalcaemia — calcium deposited in areas of fat necrosis around the inflamed pancreas (saponification) → tetany, Chvostek''s sign, Trousseau''s sign; (2) Hyperglycaemia (destruction of beta cells → reduced insulin); (3) ARDS, shock, renal failure (severe pancreatitis); (4) Pseudocyst formation; (5) Diabetes mellitus (chronic). Monitor calcium levels in pancreatitis. Kenya MOH GI Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Gastrointestinal Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is providing teaching to a patient newly started on warfarin. Which food group interaction should the patient be educated about?',
  'Dairy products — avoid all milk and cheese',
  'Foods high in Vitamin K (dark green leafy vegetables, e.g. spinach, kale, broccoli) can reduce warfarin effectiveness — maintain consistent intake rather than avoiding completely',
  'Avoid all fruit and vegetables while on warfarin',
  'Citrus fruits increase warfarin levels dangerously',
  'B',
  'Warfarin is a Vitamin K antagonist — it works by inhibiting Vitamin K-dependent clotting factor synthesis. High Vitamin K intake (spinach, kale, broccoli, cabbage) reduces warfarin''s anticoagulant effect. Patients should NOT dramatically increase or decrease green vegetable intake — consistent moderate intake allows stable INR management. Grapefruit juice inhibits CYP2C9 and can increase warfarin levels. Regular INR monitoring is essential. Kenya MOH Anticoagulation Guidelines.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Pharmacology — Patient Education',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with AIDS has a CD4 count of 45 cells/mm³. Which opportunistic infection are they at greatest risk for?',
  'Candidal vaginitis',
  'Pneumocystis jirovecii pneumonia (PCP) and CMV retinitis',
  'Oral thrush only',
  'Influenza',
  'B',
  'CD4-based opportunistic infection (OI) risk: >500 cells/mm³ = normal; 200–500 = oral thrush, TB, shingles; <200 = PCP (Pneumocystis jirovecii pneumonia), Toxoplasmosis, Cryptosporidiosis; <100 = MAC (Mycobacterium avium complex), CMV retinitis (risk of blindness), cryptococcal meningitis. A CD4 of 45 cells/mm³ = severely immunocompromised — highest OI risk. Co-trimoxazole prophylaxis prevents PCP and Toxoplasma. Kenya MOH NASCOP OI Prevention Guidelines 2022.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'HIV/AIDS Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents with sudden severe headache described as ''the worst headache of my life'', neck stiffness, and photophobia. What condition must be suspected?',
  'Migraine with aura',
  'Tension headache',
  'Subarachnoid haemorrhage or bacterial meningitis',
  'Sinusitis',
  'C',
  '''Worst headache of life'' (thunderclap headache) with neck stiffness and photophobia = subarachnoid haemorrhage (SAH) or bacterial meningitis until proven otherwise — both are emergencies. SAH: sudden onset (seconds), sentinel headache, neck stiffness (blood in CSF). Meningitis: fever, progressive headache, photophobia, Kernig''s/Brudzinski''s signs. Immediate action: CT head (before LP if focal signs), LP for xanthochromia (SAH) or meningitis diagnosis, urgent neurosurgical/medical review. Kenya MOH Neurology Guidelines; ATLS.',
  'KRCHN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Neurological Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- KRCHN Paper I — Pharmacology (35 questions)

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the 5 Rights of medication administration?',
  'Right patient, right drug, right dose, right route, right time',
  'Right doctor, right nurse, right patient, right room, right dose',
  'Right chart, right drug, right route, right time, right signature',
  'Right patient, right drug, right route, right allergy, right documentation',
  'A',
  'The 5 Rights of medication administration: (1) Right Patient — check ID band, ask patient to state name; (2) Right Drug — check drug name carefully (generic and trade names); (3) Right Dose — calculate correctly, check with another nurse for high-risk drugs; (4) Right Route — oral, IM, IV, SC, topical, rectal; (5) Right Time — scheduled times, timing relative to meals. Additional rights: Right Reason, Right Documentation (record immediately after giving), Right to Refuse. Kenya MOH Medication Administration Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Safe Medication Administration',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient refuses a prescribed medication. What is the correct nursing action?',
  'Crush the medication and hide it in the patient''s food',
  'Document the refusal, explain the reason the medication is important, respect the patient''s right to refuse, and notify the physician',
  'Force the patient to take the medication',
  'Skip documentation as the patient refused',
  'B',
  'Patients have the legal and ethical right to refuse any medication or treatment (Kenya Constitution Article 26, Patient Rights Charter). Nursing actions: (1) Explain why the medication is prescribed and its consequences of refusal; (2) Ask about reasons (side effects, beliefs — may be addressable); (3) Document the refusal clearly in the medication chart and nursing notes; (4) Notify the prescribing physician. Never disguise or force medications — this is assault/battery. Kenya MOH Medication Administration; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Patient Rights — Medication',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which IM injection site is considered safest for injections in adults because it is away from major nerves and vessels?',
  'Dorsogluteal (upper outer buttock)',
  'Ventrogluteal',
  'Vastus lateralis',
  'Deltoid',
  'B',
  'The ventrogluteal site (between the anterior superior iliac spine and greater trochanter) is the safest IM injection site in adults — contains no major nerves or blood vessels, has the greatest muscle mass, and is suitable for large volume injections. Vastus lateralis is preferred for infants and small children. Deltoid is used for small volumes (vaccines, ≤1 mL). Dorsogluteal is the traditional but most risky site (proximity to sciatic nerve). Kenya MOH Immunisation Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Injection Techniques',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which IM injection technique is used for medications that stain or irritate subcutaneous tissue (e.g. iron dextran, hydroxyzine)?',
  'Standard IM injection without any modification',
  'Z-track technique — skin and subcutaneous tissue displaced laterally before injection, released after needle withdrawal to seal the injection track',
  'Subcutaneous injection technique',
  'Intradermal injection technique',
  'B',
  'Z-track technique: (1) Draw up medication; (2) Change needle to fresh sterile needle; (3) Pull skin and subcutaneous tissue 2.5–3.5 cm laterally; (4) Insert needle at 90 degrees; (5) Aspirate (some guidelines omit for vastus lateralis); (6) Inject slowly; (7) Wait 10 seconds; (8) Withdraw needle and release skin — creates a Z-shaped track that prevents medication from leaking back into subcutaneous tissue. Used for iron dextran, hydroxyzine, vitamin B12. Kozier & Erb; Kenya MOH.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Injection Techniques',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with diabetes is to receive insulin subcutaneously. Which injection site provides the fastest absorption?',
  'Upper arm',
  'Thigh',
  'Abdomen (2.5 cm from umbilicus)',
  'Buttock',
  'C',
  'Insulin absorption rates by site (fastest to slowest): Abdomen (fastest — 15–30 minutes onset) → Arms → Thighs → Buttocks (slowest). Abdomen has highest blood flow and least variation between individuals. Rotate sites within the same region to prevent lipodystrophy. Rapid-acting insulin (lispro, aspart) and short-acting regular insulin are typically injected in the abdomen for predictable mealtime absorption. Exercise accelerates absorption from limbs. Kenya MOH Diabetes Guidelines; American Diabetes Association.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Insulin Administration',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'For a Mantoux tuberculin skin test, which injection route and technique is used?',
  'Intramuscular injection in the deltoid',
  'Subcutaneous injection in the upper arm',
  'Intradermal injection into the forearm, producing a bleb/wheal',
  'Intravenous injection via peripheral cannula',
  'C',
  'The Mantoux (tuberculin skin) test uses intradermal injection: 0.1 mL of 5 TU (tuberculin units) PPD injected intradermally into the volar (inner) surface of the forearm, producing a bleb (wheal) of 6–10 mm diameter indicating correct placement. Read result at 48–72 hours: measure induration (not erythema) transversely. ≥10 mm = positive (≥5 mm in HIV-positive or immunocompromised patients). Kenya MOH TB Testing Guidelines; WHO.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Injection Techniques',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the main adverse effect of NSAIDs (ibuprofen, diclofenac) that nurses should monitor for?',
  'Constipation and urinary retention',
  'Gastrointestinal irritation and ulceration, and renal impairment',
  'Hypoglycaemia',
  'Respiratory depression',
  'B',
  'NSAIDs inhibit COX-1 and COX-2. COX-1 inhibition reduces protective prostaglandins in the gastric mucosa, causing gastric irritation, erosions, and peptic ulceration (risk of GI bleeding). NSAIDs also reduce renal prostaglandins causing renal vasoconstriction, acute kidney injury especially in volume-depleted patients, elderly, or those with existing CKD. Give with food and a PPI gastroprotection if high risk. Contraindicated in CKD, peptic ulcer disease. Kenya MOH Clinical Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Analgesics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which adverse effect of opioid analgesics (morphine, pethidine) requires the nurse to monitor respiratory rate?',
  'Hyperglycaemia',
  'Respiratory depression',
  'Tachycardia',
  'Hypertension',
  'B',
  'Opioid adverse effects: constipation (most common), nausea/vomiting, sedation, respiratory depression (most dangerous — especially in opioid-naive patients, overdose, or elderly), pruritus, urinary retention, miosis. Respiratory rate <12 breaths/minute after opioid administration requires assessment — if <8 or patient unrousable: administer naloxone (opioid antagonist). Naloxone 0.4 mg IV/IM/SC can be titrated. Monitor oxygen saturation and consciousness level. Kenya MOH Opioid Administration Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Analgesics',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has taken an overdose of paracetamol (acetaminophen) 6 hours ago. What is the antidote?',
  'Naloxone',
  'Vitamin K',
  'Protamine sulphate',
  'N-acetylcysteine (NAC)',
  'D',
  'Paracetamol (acetaminophen) overdose causes hepatotoxicity through accumulation of the toxic metabolite NAPQI (N-acetyl-p-benzoquinone imine) which depletes glutathione and damages hepatocytes. Antidote: N-acetylcysteine (NAC) — replenishes glutathione and detoxifies NAPQI. Most effective if given within 8 hours (can be given up to 24 hours). Administer IV protocol (150 mg/kg in 200 mL 5% dextrose over 60 min, then maintenance). Kenya MOH Toxicology Guidelines; WHO.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Antidotes',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has received a heparin overdose and is actively bleeding. Which antidote should be administered?',
  'Vitamin K (phytomenadione)',
  'Naloxone',
  'Protamine sulphate',
  'N-acetylcysteine',
  'C',
  'Antidotes: Heparin → Protamine sulphate (1 mg neutralises 100 IU heparin, given slowly IV); Warfarin/oral anticoagulants → Vitamin K (phytomenadione); Opioids → Naloxone; Paracetamol → NAC; Organophosphate → Atropine; Benzodiazepines → Flumazenil; TCA overdose → Sodium bicarbonate. Protamine must be given slowly (risk of anaphylaxis, hypotension). Kenya MOH Toxicology and Antidotes Guidelines; Maudsley.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Antidotes',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is about to administer a morphine injection. Which additional nursing process must be followed?',
  'Administer alone without documentation as morphine is a routine drug',
  'Verify identity of two nurses, check controlled drug register, sign with a witness, check cupboard stock count before and after',
  'Give at nurse''s discretion without a physician''s prescription',
  'Store morphine at the nursing station without a locked cupboard',
  'B',
  'Controlled substance administration (morphine, pethidine, codeine, diazepam): (1) Requires a valid physician prescription; (2) Two nurses must check and verify: dose, drug, patient, route; (3) Both nurses sign the controlled drug register; (4) Check the stock count before and after — record in controlled drug register; (5) Store in a double-locked controlled drug cupboard with two nurses holding keys; (6) Discard unused portion with witness signature; (7) Regular reconciliation of stock. Kenya Pharmacy and Poisons Act; NCK Medication Administration Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Controlled Substances',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Where should insulin and vaccines be stored to maintain the cold chain?',
  'At room temperature in a locked drug cupboard',
  'In the freezer at -20°C',
  'In the refrigerator at 2–8°C',
  'In direct sunlight for easy visibility',
  'C',
  'Cold chain requirements: Vaccines and insulin must be stored at 2–8°C in a refrigerator. Temperatures below 0°C (freezing) can damage vaccines (adjuvants precipitate) and insulin (forms crystals, loses potency). Do NOT freeze. During transport: use vaccine carriers with ice packs at 2–8°C. Monitor temperatures with a thermometer twice daily. Record in the temperature log. Vaccine vials that have been frozen (freeze-sensitive vaccines) must be discarded — use shake test to detect freezing damage. Kenya MOH KEPI Cold Chain Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Storage',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which adverse effect of corticosteroids (prednisolone, dexamethasone) requires blood glucose monitoring?',
  'Hypoglycaemia',
  'Hyperglycaemia (steroid-induced diabetes)',
  'Hypokalaemia is the only corticosteroid side effect',
  'Corticosteroids have no effect on blood glucose',
  'B',
  'Corticosteroid adverse effects: Hyperglycaemia (steroid-induced diabetes — most clinically important to monitor), osteoporosis (long-term use → fracture risk), Cushing''s syndrome (moon face, buffalo hump, central obesity), immunosuppression (infection risk), peptic ulceration (especially with NSAIDs), hypertension, fluid retention (sodium and water retention → oedema), adrenal suppression (do not stop abruptly), poor wound healing, cataracts. Monitor blood glucose, BP, and weight on steroids. Kenya MOH Clinical Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Adverse Effects',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is prescribed furosemide (loop diuretic). Which electrolyte must be monitored closely?',
  'Sodium (hypernatraemia risk)',
  'Calcium (hypercalcaemia risk)',
  'Potassium (hypokalaemia risk)',
  'Magnesium (hypermagnesaemia risk)',
  'C',
  'Loop diuretics (furosemide) inhibit Na-K-2Cl cotransporter in the loop of Henle, causing loss of sodium, potassium, chloride, and water. Hypokalaemia is the most clinically significant electrolyte imbalance — signs: muscle weakness, cramps, arrhythmias, increased digoxin toxicity risk (low K+ sensitises heart to digoxin). Supplemental potassium (oral KCl syrup or foods) is often required. Monitor serum potassium, urine output, and blood pressure. Kenya MOH Clinical Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Adverse Effects',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse teaches a patient starting an antibiotic course. What is the most important instruction regarding antibiotic completion?',
  'Stop the antibiotic when you feel better to save money',
  'Complete the full antibiotic course even if you feel better, to prevent antibiotic resistance and ensure full eradication of the infection',
  'Double the dose for the first day to kill bacteria faster',
  'Antibiotics can be shared with family members who have similar symptoms',
  'B',
  'Antibiotic adherence education: Complete the full prescribed course (even if symptoms resolve early) because: (1) Sub-therapeutic antibiotic levels allow resistant bacteria to survive and multiply; (2) Incomplete courses cause treatment failure and relapse; (3) Antibiotic resistance is a global public health crisis. Never share antibiotics — different organisms require different antibiotics; unsupervised use drives resistance. Kenya MOH Antimicrobial Stewardship Programme; WHO AMR Action Plan.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Patient Education',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is prescribed metformin for type 2 diabetes but has an eGFR of 25 mL/min/1.73m². What is the concern?',
  'Metformin causes hyperglycaemia in renal failure',
  'Metformin is contraindicated in severe renal impairment (eGFR <30 mL/min) due to risk of lactic acidosis',
  'Metformin dose should be doubled in renal failure to compensate for decreased excretion',
  'Metformin has no renal contraindications',
  'B',
  'Metformin is excreted renally. In renal failure (eGFR <30 mL/min), metformin accumulates → lactic acidosis (rare but potentially fatal — high mortality). Contraindicated: eGFR <30 mL/min. Use with caution and reduced dose: eGFR 30–45. Review and withold in acute illness, contrast media, major surgery. Kenya MOH Diabetes Guidelines; BNF; KDOQI.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Safety in Renal Disease',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is prescribed amlodipine for hypertension. What is the drug class of amlodipine?',
  'Beta-blocker',
  'ACE inhibitor',
  'Calcium channel blocker',
  'Loop diuretic',
  'C',
  'Amlodipine is a dihydropyridine calcium channel blocker (CCB). It blocks L-type calcium channels in vascular smooth muscle, causing vasodilation and lowering blood pressure. Adverse effects: peripheral oedema (ankle swelling — most common), facial flushing, headache. First-line for hypertension (especially in Black African patients and elderly). Kenya MOH Hypertension Management Guidelines. Beta-blockers: atenolol, metoprolol. ACE inhibitors: enalapril, lisinopril. Loop diuretics: furosemide.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Antihypertensive Drugs',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which antibiotic group commonly causes allergic reactions including anaphylaxis, and requires allergy documentation before administration?',
  'Aminoglycosides (gentamicin)',
  'Macrolides (azithromycin)',
  'Penicillins (amoxicillin, benzylpenicillin)',
  'Tetracyclines (doxycycline)',
  'C',
  'Penicillin allergy (particularly anaphylaxis) is the most common severe drug allergy. Before any penicillin administration: ask about penicillin/beta-lactam allergy; check allergy documentation; if allergic: use an alternative (erythromycin, azithromycin, cotrimoxazole — depending on indication). Cross-reactivity with cephalosporins is approximately 1–2%. Allergy must be documented in the patient''s record and allergy band applied. Kenya MOH Allergy and Prescribing Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Antibiotic Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which antidiabetic drug acts by reducing insulin resistance in the liver and muscles rather than stimulating insulin secretion?',
  'Glibenclamide (sulphonylurea)',
  'Metformin (biguanide)',
  'Regular insulin',
  'Glucagon',
  'B',
  'Metformin mechanism of action: (1) Reduces hepatic gluconeogenesis (main mechanism — reduces glucose production); (2) Improves insulin sensitivity in peripheral tissues (skeletal muscle); (3) Does NOT stimulate insulin secretion — therefore low hypoglycaemia risk when used alone. Sulphonylureas (glibenclamide) stimulate beta cells to produce more insulin — higher hypoglycaemia risk. Regular insulin replaces absent insulin. Glucagon raises glucose. Kenya MOH Diabetes Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Antidiabetic Drugs',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is about to receive an intravenous infusion. What should the nurse check at the insertion site every 1–2 hours?',
  'Temperature of the infusion fluid',
  'Signs of infiltration or phlebitis: pain, swelling, redness, leaking around the cannula, or hard/cord-like vein',
  'Blood pressure at the IV site',
  'Urine output',
  'B',
  'IV site monitoring every 1–2 hours (more frequently for irritant drugs): (1) Infiltration — fluid leaking into subcutaneous tissue: swelling, pallor, coolness, pain at site — STOP infusion, remove cannula, elevate limb; (2) Phlebitis — vein inflammation: warmth, redness, pain along vein, possible cord/palpable tender vein; (3) Extravasation — vesicant drug leaking subcutaneously (chemotherapy, calcium, KCl) — emergency; (4) Infection: redness, pus. Document using Visual Infusion Phlebitis (VIP) score. Kenya MOH IV Care Guidelines; INS Standards.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'IV Therapy Safety',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on antihypertensive medication asks whether they should stop taking it because their blood pressure is now normal. What is the correct advice?',
  'Yes, stop taking it since blood pressure is now normal',
  'Continue taking antihypertensive medication regularly as prescribed — normal BP is the result of the medication working, not a reason to stop',
  'Take medication only on days when blood pressure is high',
  'Halve the dose to maintain normal BP',
  'B',
  'Antihypertensive drugs control but do not cure hypertension. Stopping medication causes blood pressure to rise again (rebound hypertension), increasing stroke and cardiac risk. Patients must be counselled: (1) Take medication every day as prescribed; (2) Normal BP = medication is working; (3) Never stop abruptly without physician advice; (4) Report side effects; (5) Lifestyle modifications continue alongside medication. Adherence is the most common cause of uncontrolled hypertension. Kenya MOH Hypertension Management Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Patient Education',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which antiretroviral is given to infants born to HIV-positive mothers as part of PMTCT option B+?',
  'TDF + 3TC + DTG (adult TLD)',
  'Nevirapine (NVP) 0.6 mL oral syrup daily for 6 weeks',
  'Zidovudine (AZT) IV for the first 7 days only',
  'No ARV is given to the baby if the mother''s viral load is suppressed',
  'B',
  'PMTCT Option B+ (Kenya MOH NASCOP 2022): Mother continues lifelong TLD. Baby: All HIV-exposed infants receive Nevirapine (NVP) 0.6 mL oral syrup once daily for 6 weeks (if mother''s VL is suppressed). If mother''s VL is unsuppressed or unknown, or if high-risk: NVP + AZT combination for 12 weeks. First dose within 12 hours of birth. DNA PCR HIV testing of infant at 6 weeks. Kenya MOH PMTCT Guidelines 2022; NASCOP.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'PMTCT Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse prepares to give an oral tablet to a patient with dysphagia. The nurse crushes the tablet and mixes it with water. Which type of tablet must NEVER be crushed?',
  'Vitamin C tablet',
  'Paracetamol tablet',
  'Enteric-coated, modified-release, or sustained-release tablets',
  'Iron sulphate tablet',
  'C',
  'Tablets that must NEVER be crushed: (1) Enteric-coated tablets (EC) — protective coating prevents gastric irritation or acid destruction; crushing removes protection; (2) Modified-release (MR) / Extended-release (XR) / Sustained-release (SR) — crushing releases full dose at once (dose-dumping) → potential toxicity; (3) Sublingual/buccal tablets — designed for mucosal absorption. Examples: omeprazole EC, metformin XR, diltiazem SR, morphine sulfate SR, aspirin EC. If patient cannot swallow: use liquid formulations or dispersible tablets. Kenya MOH Medication Safety; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Safe Medication Administration',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient receives enalapril (ACE inhibitor) for hypertension and develops a dry persistent cough. What action should the nurse take?',
  'Advise the patient to ignore the cough as it is harmless',
  'Document the cough, report to the physician — ACE inhibitor-induced cough may require switching to an ARB (e.g. losartan)',
  'Prescribe cough syrup independently',
  'Double the enalapril dose to manage the cough',
  'B',
  'ACE inhibitor (enalapril, lisinopril, captopril) adverse effect: dry persistent non-productive cough occurs in 5–20% of patients (more common in African populations due to bradykinin accumulation). It is not dangerous but very bothersome. Management: if troublesome, the prescriber should switch to an Angiotensin Receptor Blocker (ARB) — losartan, valsartan — which has equivalent antihypertensive effect without causing cough (ARBs do not affect bradykinin). Report and document. Kenya MOH Hypertension Guidelines; BNF.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Adverse Effects',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is about to administer an organophosphate poisoning antidote. Which drug is used?',
  'Naloxone',
  'N-acetylcysteine',
  'Atropine (combined with pralidoxime)',
  'Protamine sulphate',
  'C',
  'Organophosphate (OP) poisoning (pesticides, nerve agents): inhibit acetylcholinesterase → accumulation of acetylcholine → muscarinic (DUMBELS: Diarrhoea, Urination, Miosis, Bradycardia, Emesis, Lacrimation, Salivation) and nicotinic effects. Antidote: (1) Atropine — given IV in escalating doses to reverse muscarinic effects (target: dry secretions, HR>80); (2) Pralidoxime (2-PAM) — reactivates acetylcholinesterase if given early (before enzyme ''ageing''). Remove contaminated clothing, decontaminate skin. Kenya MOH Toxicology Guidelines; WHO OP Poisoning Protocol.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Antidotes',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is timing insulin administration for a patient prescribed regular (short-acting) insulin before breakfast. When should the injection be given?',
  'With the meal, at the same time as eating',
  '30–45 minutes before the meal',
  '2 hours after the meal',
  'At bedtime only',
  'B',
  'Regular (soluble/short-acting) insulin: onset 30–60 minutes, peak 2–4 hours, duration 6–8 hours. Administer 30–45 minutes before meals to ensure peak action coincides with postprandial glucose rise. Rapid-acting analogues (lispro, aspart, glulisine): onset 15 minutes, given immediately before or up to 15 minutes after starting a meal. Timing is critical to prevent hypoglycaemia (if given too early) or hyperglycaemia (if given too late). Kenya MOH Diabetes Guidelines; Brunner & Suddarth.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Insulin Administration',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse discovers that a controlled drug stock count does not match the register. What is the correct action?',
  'Adjust the register to match the remaining stock to correct the discrepancy quietly',
  'Report the discrepancy immediately to the in-charge nurse/manager, document it, and initiate an investigation — do not adjust the register without investigation',
  'Assume a counting error and ignore the discrepancy',
  'Replace the missing drug from personal funds without reporting',
  'B',
  'Controlled drug discrepancy procedure: (1) Do NOT adjust register entries without proper investigation; (2) Report immediately to in-charge nurse and pharmacist; (3) Both nurses document the discrepancy with time, date, and names; (4) Initiate formal investigation; (5) May require reporting to the Pharmacy and Poisons Board (PPB) and NCK if theft or diversion is suspected; (6) Any tampering with controlled drug records constitutes criminal fraud under the Pharmacy and Poisons Act Cap 244. Kenya Pharmacy and Poisons Act; NCK Controlled Drug Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Controlled Substances',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse needs to calculate the dose of amoxicillin syrup for a child. The prescription is 125 mg. The syrup contains 250 mg in 5 mL. How many mL should the nurse give?',
  '2.5 mL',
  '5 mL',
  '10 mL',
  '1.25 mL',
  'A',
  'Drug calculation: Volume = (Required dose / Available dose) × Volume available = (125 mg / 250 mg) × 5 mL = 0.5 × 5 = 2.5 mL. Always check the calculation with a second nurse for paediatric doses. Use an oral syringe for accurate measurement of small volumes. Document the dose given and time. Kenya MOH Paediatric Drug Administration; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Calculations',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is prescribed gentamicin (aminoglycoside antibiotic). Which two serious adverse effects must the nurse monitor for?',
  'Hyperglycaemia and hypothyroidism',
  'Nephrotoxicity (renal damage) and ototoxicity (hearing damage)',
  'Hepatotoxicity and bone marrow suppression',
  'Constipation and urinary retention',
  'B',
  'Aminoglycosides (gentamicin, amikacin, streptomycin) adverse effects: (1) Nephrotoxicity — accumulate in proximal tubular cells → AKI; monitor creatinine, urea, urine output; dose adjust for renal impairment; (2) Ototoxicity — damage to cochlear (sensorineural hearing loss, usually irreversible) and vestibular (dizziness, ataxia) hair cells; monitor for hearing changes; (3) Neuromuscular blockade (high doses). Monitor trough and peak levels (therapeutic drug monitoring). Kenya MOH Antibiotic Prescribing Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Drug Adverse Effects',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which is an important nursing consideration when administering a sublingual (SL) nitroglycerin tablet for acute angina?',
  'Swallow the tablet immediately with a full glass of water',
  'Place under the tongue, instruct patient to let it dissolve and not swallow it, monitor blood pressure (may drop significantly), sit or lie down to prevent falls',
  'Crush the tablet and mix with water before giving',
  'Administer with food to prevent gastric irritation',
  'B',
  'Sublingual nitroglycerin (GTN): (1) Place under tongue or between gum and cheek — absorbed directly through sublingual mucosa for rapid onset (1–3 minutes); (2) Do NOT swallow — first-pass metabolism destroys it; (3) Monitor BP — can cause hypotension, dizziness, headache; (4) Sit or lie down (syncope risk); (5) Repeat every 5 minutes up to 3 doses; (6) If pain unrelieved after 3 doses in 15 minutes → call emergency services (possible MI); (7) Causes burning/tingling sensation under tongue (indicates potency). Kenya MOH Angina/ACS Guidelines.',
  'KRCHN',
  'Paper I',
  'Pharmacology',
  'Cardiovascular Pharmacology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- KRCHN Paper I — Anatomy & Physiology (25 questions)

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Blood flows from the right ventricle to which structure?',
  'Aorta',
  'Left atrium',
  'Pulmonary artery (to the lungs)',
  'Inferior vena cava',
  'C',
  'Cardiac circulation: Right atrium → Tricuspid valve → Right ventricle → Pulmonary valve → Pulmonary artery → Lungs (gas exchange) → Pulmonary veins → Left atrium → Mitral/Bicuspid valve → Left ventricle → Aortic valve → Aorta → Systemic circulation. The right ventricle pumps deoxygenated blood to the lungs via the pulmonary artery. The left ventricle pumps oxygenated blood to the body via the aorta. Tortora & Grabowski Anatomy and Physiology.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Cardiovascular System',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which formula is used to calculate cardiac output?',
  'Cardiac output = Blood pressure × Heart rate',
  'Cardiac output = Heart rate × Stroke volume',
  'Cardiac output = Stroke volume / Heart rate',
  'Cardiac output = Blood pressure / Stroke volume',
  'B',
  'Cardiac output (CO) = Heart rate (HR) × Stroke volume (SV). Normal CO = 70 bpm × 70 mL = ~4.9 litres/minute (normal range 4–8 L/min). Stroke volume (SV) = volume of blood ejected per beat (~70 mL at rest). CO can be increased by increasing HR or SV (via increased preload, contractility, or reduced afterload). Tortora & Grabowski; Marieb Human Anatomy and Physiology.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Cardiovascular Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The renin-angiotensin-aldosterone system (RAAS) is activated when blood pressure falls. What is the primary effect of aldosterone on the kidneys?',
  'Promotes potassium reabsorption and sodium excretion',
  'Promotes sodium and water reabsorption in the distal tubule, increasing blood volume and pressure',
  'Inhibits water reabsorption to increase urine output',
  'Stimulates renin release from the macula densa',
  'B',
  'RAAS response to low BP/low sodium: Kidney releases renin → converts angiotensinogen to angiotensin I → ACE converts to angiotensin II → (1) Vasoconstriction (raises BP); (2) Stimulates adrenal cortex to release aldosterone → aldosterone acts on distal convoluted tubule and collecting duct to reabsorb sodium (and with it water) and excrete potassium → increases blood volume and BP. ACE inhibitors block this system. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Renal and Endocrine Physiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the primary function of haemoglobin in red blood cells?',
  'Killing bacteria via phagocytosis',
  'Transporting oxygen from the lungs to tissues and transporting carbon dioxide back to the lungs',
  'Producing antibodies against antigens',
  'Producing clotting factors',
  'B',
  'Haemoglobin (Hb) is the oxygen-carrying protein in red blood cells. Each Hb molecule has 4 haem groups, each binding one O2 molecule (total: 4 O2 per Hb). In the lungs: O2 binds to Hb (oxyhaemoglobin). In tissues: O2 released to cells (O2 tension low). CO2 transport: approximately 20% carried by Hb as carbaminohaemoglobin; 70% as bicarbonate; 10% dissolved. Normal Hb: Adult male 13–17 g/dL; Female 12–15 g/dL. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Blood and Haematology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which type of white blood cell is predominantly raised in bacterial infections?',
  'Lymphocytes',
  'Eosinophils',
  'Neutrophils',
  'Basophils',
  'C',
  'WBC (leucocyte) types and their roles: Neutrophils (50–70%) — first responders to bacterial infection (phagocytosis); raised in bacterial infection, inflammation, steroids. Lymphocytes (20–40%) — T cells (cell-mediated immunity), B cells (antibody production); raised in viral infections, lymphoma. Eosinophils — allergic reactions, parasitic infections; raised in asthma, hay fever, helminthiasis. Basophils — inflammation, histamine release. Monocytes — phagocytes, become macrophages in tissues. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Blood and Haematology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- BScN Paper II — Remaining Units (Tasks 3.1 continued, 3.2)
-- ============================================================

-- ============================================================
-- MENTAL HEALTH NURSING (25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a Mental Status Examination (MSE), a patient with schizophrenia states he can hear God''s voice commanding him to act. He also misidentifies the nurse''s white coat as an angel''s robe. Which statement BEST distinguishes a hallucination from an illusion in this presentation?',
  'Both are perceptual disturbances with an identifiable external stimulus',
  'The auditory voice is a hallucination (perception without an external stimulus); misidentifying the coat is an illusion (misinterpretation of a real external stimulus)',
  'Both are classified as delusions because they involve false beliefs',
  'The auditory voice is an illusion; the misidentification of the coat is a hallucination',
  'B',
  'A hallucination is a sensory perception occurring in the absence of any external stimulus — the patient hears God''s voice when no voice is present. An illusion is a misinterpretation or misperception of a real external stimulus — the coat exists but is misidentified. Distinguishing these is fundamental to accurate MSE documentation. Both may occur in schizophrenia. Kaplan & Sadock''s Synopsis of Psychiatry; Kenya MoH Mental Health Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mental Status Examination',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Clozapine is prescribed for a patient with treatment-resistant schizophrenia. Which monitoring parameter is MANDATORY due to the risk of life-threatening agranulocytosis?',
  'Serum lithium levels monthly',
  'Full blood count weekly for the first 18 weeks, then fortnightly',
  'Liver function tests twice daily',
  'Fasting blood glucose once a year',
  'B',
  'Clozapine carries a 1–2% risk of agranulocytosis — a potentially fatal drop in neutrophil count. Mandatory haematological monitoring requires: full blood count (FBC) weekly for the first 18 weeks of treatment, then fortnightly if stable. Clozapine is withheld and permanently discontinued if absolute neutrophil count falls below 0.5 x10⁹/L. This monitoring requirement distinguishes clozapine from all other antipsychotics. Maudsley Prescribing Guidelines; Kenya MOH Mental Health Policy.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Antipsychotic Medications',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on long-term lithium therapy presents with coarse tremor, vomiting, ataxia, and a serum lithium level of 1.8 mmol/L. What is the CORRECT interpretation and priority management?',
  'Therapeutic level — continue lithium and add anti-emetic',
  'Lithium toxicity — stop lithium immediately, initiate IV fluid replacement, provide renal support, and monitor serum levels closely',
  'Sub-therapeutic level — increase dose and recheck in one week',
  'Normal tremor side effect — reassure patient and continue treatment',
  'B',
  'The therapeutic range for lithium maintenance is 0.6–1.2 mmol/L. A level of 1.8 mmol/L indicates toxicity. Signs of moderate-severe toxicity include coarse tremor, vomiting, ataxia, confusion, and cardiac dysrhythmia. Management: STOP lithium immediately, IV 0.9% NaCl to promote renal excretion, correct electrolytes, monitor renal function and lithium levels, consider haemodialysis if level >4.0 mmol/L or severe symptoms. Maudsley Prescribing Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mood Stabilisers',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient stabilised on lithium therapy asks about dietary instructions. Which instruction is MOST critical to prevent lithium toxicity?',
  'Increase protein intake to at least 2 g/kg/day',
  'Maintain stable dietary sodium intake and ensure adequate hydration at all times',
  'Avoid all dairy products as they increase lithium absorption',
  'Take lithium only on an empty stomach for maximum effect',
  'B',
  'Sodium and lithium compete for renal reabsorption in the proximal tubule. Sodium depletion (low-salt diet, vomiting, diarrhoea, excessive sweating, diuretics) causes increased lithium reabsorption and rising lithium levels — leading to toxicity. Patients must maintain a stable sodium intake and adequate fluid intake. They should not start low-sodium diets or diuretics without specialist guidance. Maudsley Prescribing Guidelines; BNF.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mood Stabilisers',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient started on sertraline develops hyperthermia, muscle clonus, agitation, and tachycardia two hours after taking a dose of tramadol. Which condition does this presentation MOST likely represent, and what is the priority management?',
  'Neuroleptic malignant syndrome — stop antipsychotic and administer dantrolene',
  'Serotonin syndrome — stop all serotonergic agents immediately, provide supportive care, and administer cyproheptadine',
  'Anticholinergic toxicity — administer physostigmine',
  'Malignant hyperthermia — administer dantrolene and cool the patient',
  'B',
  'Serotonin syndrome is a potentially life-threatening condition caused by excess serotonergic activity, typically from combining two serotonergic agents (here: SSRI sertraline + tramadol which inhibits serotonin reuptake). Clinical triad: altered mental status, autonomic instability (tachycardia, hyperthermia), and neuromuscular abnormality (clonus, hyperreflexia). Management: stop all serotonergic agents, benzodiazepines for agitation, cyproheptadine (5-HT2A antagonist), supportive care. NMS involves rigidity and occurs with antipsychotics. Kaplan & Sadock; Hunter Criteria.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Antidepressant Medications',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with schizophrenia presents with flat affect, alogia (poverty of speech), and avolition (lack of motivation). These features are BEST classified as:',
  'Positive symptoms of schizophrenia',
  'Extrapyramidal side effects of antipsychotics',
  'Negative symptoms of schizophrenia',
  'Cognitive symptoms related to antipsychotic overdose',
  'C',
  'Schizophrenia symptoms are classified as positive (added experiences: hallucinations, delusions, disorganised speech, disorganised behaviour — representing excess function) and negative (loss of normal function: flat affect, alogia, avolition, anhedonia, asociality — representing deficits). Flat affect, alogia, and avolition are classic negative symptoms, which are harder to treat and associated with poorer functional outcomes. DSM-5; ICD-11; Kaplan & Sadock.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Schizophrenia',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is returning to the ward after receiving ECT under brief general anaesthesia. They are drowsy and confused. Which nursing action is the PRIORITY in the immediate post-ECT recovery period?',
  'Orient the patient to time, place, and person immediately upon waking',
  'Administer the next scheduled psychiatric medication',
  'Maintain a patent airway and monitor respiratory function until the anaesthetic has worn off',
  'Document the seizure duration as reported by the anaesthetist',
  'C',
  'Immediately after ECT, the patient emerges from general anaesthesia with a muscle relaxant on board. The priority is airway management and monitoring respiratory function — the patient is at risk of airway obstruction, aspiration, and respiratory depression. Once the patient is fully awake and protective reflexes have returned, orientation, medication administration, and documentation can proceed. Post-ECT confusion (anterograde amnesia) is expected and self-limiting. RANZCP ECT Guidelines; Kenya MOH Mental Health Policy.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'ECT Nursing Care',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Using the Columbia Suicide Severity Rating Scale (C-SSRS), a patient endorses: "I have a specific plan and the means to carry it out." How should this be classified and what is the IMMEDIATE nursing action?',
  'Low risk — schedule routine follow-up in one week',
  'Moderate risk — increase frequency of observations to hourly',
  'High immediate risk — initiate immediate safety protocol: do not leave the patient alone, remove means, and notify the multidisciplinary team urgently',
  'Minimal risk — document and continue current care plan',
  'C',
  'On the C-SSRS, endorsing both a specific plan and access to means represents HIGH immediate suicide risk (ideation with plan and intent). Immediate nursing actions: do not leave the patient unattended (1:1 observation), conduct an environment risk assessment and remove lethal means, notify the psychiatrist and MDT urgently, document fully, and initiate emergency psychiatric assessment. The C-SSRS distinguishes passive ideation from active ideation with plan and intent. Columbia Suicide Severity Rating Scale; NICE Self-Harm Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Suicide Risk Assessment',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient presents 48 hours after his last alcohol intake with a CIWA-Ar score of 18. What does this score indicate and what is the PRIORITY treatment?',
  'Mild withdrawal — prescribe PRN antiemetics and encourage oral fluids',
  'Moderate-severe alcohol withdrawal — initiate a benzodiazepine reducing regimen (e.g., chlordiazepoxide) and administer IV thiamine BEFORE any glucose-containing fluids',
  'No clinical significance — continue monitoring only',
  'Severe withdrawal — administer alcohol to prevent seizures',
  'B',
  'CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol, revised) score: 0–9 = mild (monitoring), 10–15 = moderate (pharmacotherapy recommended), ≥16 = severe (urgent pharmacotherapy). A score of 18 indicates moderate-severe withdrawal requiring benzodiazepines (chlordiazepoxide regimen in UK; diazepam elsewhere). Critically, IV or oral thiamine (B1) MUST be given before any glucose to prevent Wernicke''s encephalopathy — glucose depletes the already-low thiamine stores in alcohol-dependent patients. NICE CG115; WHO Alcohol Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A psychiatric nurse approaches an agitated patient who is raising his voice and pacing the corridor. Which de-escalation approach is MOST therapeutic?',
  'Physically restrain the patient immediately to prevent harm',
  'Match the patient''s tone of voice to demonstrate empathy and urgency',
  'Use a calm, low voice; maintain a non-threatening posture; keep a safe distance; offer choices; and avoid confrontation',
  'Administer rapid tranquillisation without attempting verbal de-escalation',
  'C',
  'Verbal de-escalation is the first-line response to agitation in mental health settings. Evidence-based components include: speaking in a calm, low, non-threatening tone; maintaining a safe, non-confrontational stance; using open body language; offering choices to restore sense of control; active listening; validating feelings without agreeing with distorted perceptions; and avoiding arguing. Physical restraint and rapid tranquillisation are last resorts after de-escalation fails. NICE NG10 Violence and Aggression; Kenya MOH Restraint Policy.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Managing Aggression',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which structural element of the therapeutic milieu in an inpatient mental health unit MOST directly promotes patient recovery?',
  'Strict enforcement of ward rules without patient involvement',
  'Consistent daily routines, a safe physical environment, collaborative goal-setting, peer support opportunities, and therapeutic nurse-patient relationships',
  'Minimising patient interaction with staff to encourage independence',
  'Unlimited visiting hours without clinical oversight',
  'B',
  'A therapeutic milieu is a structured, safe, and supportive environment designed to facilitate recovery. Core elements include: predictable and consistent routines that reduce anxiety; a physically safe environment; collaborative goal-setting (patient participates in their care plan); peer interaction and mutual support; and positive therapeutic relationships between patients and staff. These elements operationalise the recovery model in mental health nursing. Townsend Psychiatric Mental Health Nursing; WHO Mental Health Action Plan.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Milieu',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is conducting psychoeducation for the family of a patient recently diagnosed with schizophrenia. Which content is MOST important to include regarding antipsychotic medication?',
  'The medication cures schizophrenia permanently if taken for 6 months',
  'The importance of adherence, that abrupt discontinuation causes relapse, common side effects and their management, signs of relapse to monitor, and who to contact for help',
  'Antipsychotics should be stopped when the patient feels well to avoid long-term side effects',
  'Medication is less important than psychotherapy in managing schizophrenia',
  'B',
  'Psychoeducation for families of patients with schizophrenia must address: medication adherence is the cornerstone of relapse prevention; abrupt discontinuation is the most common cause of relapse; common side effects (EPS, sedation, weight gain) and what to do; early warning signs of relapse (sleep disturbance, social withdrawal, increasing suspicion); emergency contact information. Family psychoeducation combined with adherence support significantly reduces relapse rates. NICE Psychosis Guidelines; Pharoah et al. Cochrane Review.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Psychoeducation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient develops sudden, sustained torticollis (neck twisted to one side) two days after starting haloperidol. This is BEST classified as which adverse effect, and what is the correct treatment?',
  'Tardive dyskinesia — reduce haloperidol dose gradually over weeks',
  'Neuroleptic malignant syndrome — stop haloperidol and transfer to ICU',
  'Acute dystonia — administer IM or IV procyclidine or benztropine immediately',
  'Akathisia — prescribe propranolol',
  'C',
  'Acute dystonia is an extrapyramidal side effect (EPS) of antipsychotics (especially typical/first-generation, e.g., haloperidol) occurring within days of starting the drug. It presents as involuntary sustained muscle contractions: torticollis (neck), oculogyric crisis (eyes), opisthotonus (back arching). Treatment: IM/IV procyclidine 5–10 mg or benztropine — rapid relief expected within 20 minutes. Reassure patient; switch to a lower-potency or atypical antipsychotic. NMS involves hyperthermia + rigidity; tardive dyskinesia is late-onset repetitive movements. Maudsley; BNF.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Antipsychotic Medications',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient who has been on antipsychotic medication for three years develops involuntary repetitive lip-smacking, tongue protrusion, and grimacing movements. These features are characteristic of which condition?',
  'Acute dystonia',
  'Parkinsonism',
  'Akathisia',
  'Tardive dyskinesia',
  'D',
  'Tardive dyskinesia (TD) is a late-onset (tardive = delayed) movement disorder caused by prolonged antipsychotic use, believed to result from dopamine receptor supersensitivity in the basal ganglia. Features: involuntary, repetitive, purposeless movements of the face and mouth (oro-facial dyskinesia: lip-smacking, tongue protrusion, chewing, grimacing), limbs (choreoathetoid movements), and trunk. It is largely irreversible; prevention (lowest effective antipsychotic dose) is key. Atypical antipsychotics carry lower TD risk. Maudsley; DSM-5.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Antipsychotic Medications',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on antipsychotics presents with hyperthermia (40.2°C), generalised lead-pipe rigidity, fluctuating level of consciousness, and autonomic instability (tachycardia, labile blood pressure, diaphoresis). What is this condition and what is the PRIORITY management?',
  'Serotonin syndrome — stop SSRIs, give cyproheptadine',
  'Acute dystonia — give procyclidine IM',
  'Neuroleptic Malignant Syndrome (NMS) — stop antipsychotic immediately, transfer to ICU, initiate cooling, and consider bromocriptine or dantrolene',
  'Malignant hyperthermia — give dantrolene only during anaesthesia',
  'C',
  'Neuroleptic Malignant Syndrome (NMS) is a rare but life-threatening idiosyncratic reaction to antipsychotics (or dopamine-depleting agents). Classic tetrad: hyperthermia, severe muscle rigidity (lead-pipe), altered consciousness, autonomic instability. Mortality up to 10–20% if untreated. Management: STOP antipsychotic immediately; transfer to ICU; external cooling; IV fluids; bromocriptine (dopamine agonist) or dantrolene (muscle relaxant) in severe cases; supportive care. NMS is an emergency; delay in stopping the offending drug increases mortality. Kaplan & Sadock; Maudsley.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Antipsychotic Medications',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient scheduled for ECT has been informed about the procedure, the expected short-term memory side effects, available alternatives, and consequences of not having ECT. They are able to explain the procedure back in their own words and state their decision freely. Which element of consent capacity is demonstrated?',
  'The patient has proxy consent from the next of kin',
  'The patient demonstrates all four elements of valid informed consent: disclosure, comprehension, voluntariness, and decision-making capacity',
  'Consent is unnecessary because ECT is a life-saving treatment',
  'Consent is only needed for the first ECT session',
  'B',
  'Valid informed consent for any procedure including ECT requires four elements: (1) Disclosure — material information provided (procedure, risks, benefits, alternatives, consequences of refusal); (2) Comprehension — patient understands and can explain the information; (3) Voluntariness — decision made freely without coercion; (4) Decision-making capacity — patient can understand, retain, weigh, and communicate a decision. All four elements are demonstrated here. Kenya Mental Health Act; RANZCP ECT Guidelines; Mental Capacity Act principles.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'ECT Nursing Care',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Under the Mental Health Act Kenya, which criteria must be met for involuntary admission, and who can make the application?',
  'The patient must request admission voluntarily; only a doctor may apply',
  'Involuntary admission requires that the patient has a mental disorder, is a danger to themselves or others, and is unwilling to be admitted voluntarily — the nearest relative, a social worker, or a health professional may apply, with magistrate approval',
  'Any family member may admit a patient to a psychiatric facility without any clinical assessment',
  'Involuntary admission is not permitted under Kenyan law',
  'B',
  'The Mental Health Act Kenya (Cap 248) provides for involuntary admission (reception order) when: (1) the person has a mental disorder, (2) the disorder renders them a danger to themselves or others, and (3) they are unwilling to be admitted voluntarily. Application may be made by the nearest relative, a social worker, or a medical/nursing professional. A magistrate''s order is required for formal involuntary detention. This must be distinguished from emergency holding powers. Kenya Mental Health Act Cap 248.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mental Health Legislation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A woman presents 10 days postpartum with rapid onset of auditory hallucinations, delusions that her baby is possessed, severe insomnia, and disorganised behaviour. She has no prior psychiatric history. Which condition does this MOST likely represent, and what is the IMMEDIATE management?',
  'Postpartum blues — reassure family, will resolve in 2 weeks',
  'Postnatal depression — start SSRI antidepressant as outpatient',
  'Postpartum psychosis — psychiatric emergency requiring urgent admission to a mother-and-baby unit, antipsychotic medication, and individualised breastfeeding decision',
  'Adjustment disorder — psychotherapy only',
  'C',
  'Postpartum psychosis is a psychiatric emergency occurring within 2 weeks of delivery (peak onset days 3–14). Features: rapid onset psychosis (hallucinations, delusions, confusion), severe mood disturbance, disorganised behaviour, insomnia. Risk factors: bipolar disorder, previous PPP, family history. Management: urgent inpatient admission (preferably a specialist mother-and-baby unit to preserve bonding), antipsychotics, mood stabilisers, close monitoring of both mother and infant, individualised breastfeeding decision. Mortality risk from suicide and infanticide. NICE CG192; Bergink et al.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Perinatal Mental Health',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with severe major depressive disorder has failed to respond to two adequate antidepressant trials at therapeutic doses for sufficient duration. According to evidence-based guidelines, what is the MOST effective next treatment option?',
  'Add a third antidepressant from a different class and wait 12 weeks',
  'Electroconvulsive therapy (ECT) — the most effective treatment for severe treatment-resistant depression with faster response than medication, particularly important when suicidal risk is high',
  'Increase the current antidepressant dose above the licensed maximum',
  'Discharge the patient with CBT as the sole treatment',
  'B',
  'ECT has the highest response rate (60–80%) for severe depression, including treatment-resistant cases, and produces remission faster than pharmacotherapy (often within 2–4 weeks). NICE guidelines recommend ECT when: life is at risk (suicidality, refusing food/fluids), when rapid response is needed, and when multiple antidepressant trials have failed. ECT is not a last resort — it is an evidence-based first-line option for severe/treatment-resistant depression. NICE CG90; UK ECT Review 2023.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Depression Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A 55-year-old divorced male with alcohol dependence and a previous suicide attempt presents to the mental health clinic. Using the IS PATH WARM mnemonic, which classification of suicide risk is MOST appropriate for this patient, and what is the required action?',
  'Low risk — provide outpatient psychotherapy only',
  'High risk — initiate immediate safety planning, consider inpatient admission, remove access to lethal means, involve family or support persons, and arrange urgent psychiatric review',
  'Moderate risk — schedule follow-up in one week',
  'Minimal risk — reassure and discharge',
  'B',
  'IS PATH WARM identifies key suicide risk factors: Ideation, Substance use, Purposelessness, Anxiety, Trapped, Hopelessness, Withdrawal, Anger, Recklessness, Mood changes. This patient has multiple high-risk factors: male sex, age >45, alcohol dependence (substance use), recent major loss (divorce), and previous attempt (strongest single predictor of future attempt). This constitutes HIGH risk requiring: immediate safety planning, means restriction, family involvement, urgent psychiatric review, and likely inpatient admission. Kaplan & Sadock; NICE SH Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Suicide Risk Assessment',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse using motivational interviewing (MI) with a patient who has alcohol use disorder reflects the patient''s ambivalence about change without confrontation. Which four elements constitute the spirit of motivational interviewing (PACE)?',
  'Punishment, Accountability, Confrontation, Enforcement',
  'Partnership, Acceptance, Compassion, Evocation',
  'Persuasion, Authority, Compliance, Evaluation',
  'Prevention, Abstinence, Counselling, Education',
  'B',
  'The spirit of motivational interviewing is captured by the PACE acronym: Partnership (collaborative relationship — not expert/recipient), Acceptance (unconditional positive regard, autonomy support, empathy, accurate affirmation), Compassion (prioritising patient''s wellbeing), and Evocation (drawing out the patient''s own motivation for change rather than imposing it). The nurse develops discrepancy between the patient''s values and current behaviour, rolls with resistance (not arguing), and supports self-efficacy. Miller & Rollnick; NICE Behaviour Change Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Substance Use Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with bipolar disorder is started on sodium valproate. Which monitoring parameters are REQUIRED to detect the most clinically significant adverse effects?',
  'Urine dipstick weekly and ECG monthly',
  'Liver function tests (hepatotoxicity), FBC (thrombocytopenia), serum drug levels (therapeutic 50–100 mcg/mL), weight monitoring, and teratogenicity counselling for women of childbearing age',
  'Serum potassium and magnesium only',
  'Blood glucose and HbA1c quarterly',
  'B',
  'Sodium valproate monitoring: LFTs (hepatotoxicity — most serious, especially in children under 3 years); FBC (thrombocytopenia and platelet dysfunction); therapeutic drug monitoring (serum level 50–100 mcg/mL); weight (valproate causes significant weight gain); critically — valproate is highly teratogenic (neural tube defects, foetal valproate syndrome) and is contraindicated in women of childbearing age without a Pregnancy Prevention Programme in the UK. In Kenya, this risk requires explicit counselling and dual contraception. Maudsley; BNF; NICE BPD Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Mood Stabilisers',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Poor insight (anosognosia) in schizophrenia contributes significantly to medication non-adherence and relapse. Which intervention has the STRONGEST evidence base for improving insight and treatment engagement?',
  'Compulsory depot medication without psychological support',
  'Psychoeducation combined with motivational interviewing and collaborative medication management (shared decision-making)',
  'Increasing antipsychotic dose to overcome insight deficit neurologically',
  'Informing the patient''s family without the patient''s consent',
  'B',
  'Anosognosia (impaired awareness of illness) in schizophrenia is neurobiological in origin and is not merely denial. The most evidence-based approach combines: psychoeducation (structured information about the illness, medication, and recovery), motivational interviewing (exploring ambivalence and the patient''s own goals), and collaborative/shared decision-making in medication management. This approach respects autonomy, reduces confrontation, and is associated with improved adherence and outcomes. Misdrahi et al.; NICE Psychosis CG178.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Schizophrenia',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which feature MOST distinguishes the therapeutic relationship in mental health nursing from a social or personal relationship?',
  'The relationship is informal and based on personal compatibility between the nurse and patient',
  'The relationship is purposeful, time-limited, patient-centred, and maintained within professional boundaries — the nurse''s personal needs are subordinate to the patient''s therapeutic needs',
  'The nurse may share personal problems to build rapport with the patient',
  'The therapeutic relationship is maintained indefinitely to ensure continuity of support',
  'B',
  'The nurse-patient therapeutic relationship (Peplau''s Interpersonal Relations Theory) is distinguished from social relationships by its defining characteristics: it is purposeful (directed toward the patient''s therapeutic goals), time-limited (has a beginning, working phase, and termination), patient-centred (the patient''s needs are primary), and bounded by professional ethics (nurse''s personal needs, feelings, and social reciprocity are not the focus). This is the foundation of mental health nursing practice. Peplau 1952; Townsend.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Therapeutic Relationship',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with obsessive-compulsive disorder (OCD) spends more than four hours daily checking door locks and cannot leave the house. Which psychological treatment is the GOLD STANDARD evidence-based intervention for OCD?',
  'Psychodynamic psychotherapy exploring unconscious conflicts',
  'Cognitive Behavioural Therapy with Exposure and Response Prevention (CBT-ERP)',
  'Relaxation techniques and mindfulness as the sole intervention',
  'Hypnotherapy',
  'B',
  'Cognitive Behavioural Therapy with Exposure and Response Prevention (CBT-ERP) is the gold standard psychological treatment for OCD at all severity levels. ERP involves: (1) Exposure — deliberately confronting feared situations (e.g., touching a door handle without checking); (2) Response Prevention — resisting the compulsive response. This breaks the anxiety-compulsion cycle and leads to habituation. SSRI pharmacotherapy (fluoxetine, sertraline) is first-line pharmacological treatment. CBT-ERP + SSRI combination is recommended for moderate-severe OCD. NICE OCD CG31; IOCDF Guidelines.',
  'BScN',
  'Paper II',
  'Mental Health Nursing',
  'Anxiety and OCD',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- INFECTION PREVENTION & CONTROL (20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is mechanically ventilated in the ICU. The nurse implements the VAP prevention bundle. Which combination of interventions constitutes the CORE evidence-based VAP bundle?',
  'Prone positioning, high-flow oxygen, and early antibiotics',
  'Head-of-bed elevation 30–45 degrees, oral care with chlorhexidine 0.12–0.2% twice daily, daily sedation vacation with readiness-to-extubate assessment, subglottic secretion suctioning (where available), and cuff pressure maintenance at 20–30 cmH2O',
  'Routine ventilator circuit changes every 24 hours, nasal gastric tube, and chest physiotherapy',
  'Supine positioning, sealed humidifier chambers, and weekly bronchoscopy',
  'B',
  'The VAP (Ventilator-Associated Pneumonia) prevention bundle consists of five core evidence-based components: (1) HOB elevation 30–45 degrees (reduces aspiration), (2) oral decontamination with chlorhexidine 0.12–0.2% BD (reduces oropharyngeal colonisation), (3) daily sedation vacation and spontaneous breathing trial (shortens ventilation duration), (4) subglottic secretion drainage (removes pooled secretions above the cuff), (5) cuff pressure 20–30 cmH2O (prevents microaspiration). Bundle compliance reduces VAP rates by up to 70%. IHI VAP Bundle; Kenya HAI Prevention Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'HAI Prevention Bundles',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse inserts a central venous catheter (CVC). Which combination of practices constitutes the evidence-based CLABSI prevention bundle?',
  'Quick insertion with minimal draping, povidone-iodine antisepsis, and femoral vein preferred site',
  'Hand hygiene before insertion, maximal sterile barrier precautions (full-body drape, sterile gown, gloves, cap and mask), chlorhexidine 2% gluconate skin antisepsis, subclavian site preferred over femoral, and daily clinical necessity review with prompt removal when no longer needed',
  'Routine CVC change every 72 hours regardless of infection signs',
  'Antibiotic prophylaxis for all patients with CVCs',
  'B',
  'The CLABSI (Central Line-Associated Bloodstream Infection) prevention bundle (IHI/ANTT) includes: (1) hand hygiene, (2) maximal sterile barrier precautions during insertion, (3) chlorhexidine 2% gluconate skin antisepsis (superior to povidone-iodine per evidence), (4) subclavian or internal jugular preferred over femoral (highest contamination risk), (5) daily necessity review — remove CVC as soon as no longer required. The femoral site carries the highest CLABSI risk. IHI CLABSI Bundle; EPIC3 Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'HAI Prevention Bundles',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Using the Spaulding classification, a flexible bronchoscope (which contacts mucous membranes) is classified as a semi-critical item. Which level of decontamination is required?',
  'Sterilisation — because it enters the respiratory tract',
  'Low-level disinfection — because it does not break the skin',
  'High-level disinfection — because semi-critical items contact mucous membranes and require destruction of all microorganisms except high numbers of bacterial spores',
  'Simple cleaning with detergent only',
  'C',
  'Spaulding classification: Critical items (enter sterile tissue or vascular system — surgical instruments, implants) → Sterilisation. Semi-critical items (contact mucous membranes or non-intact skin — endoscopes, laryngoscope blades, respiratory therapy equipment) → High-level disinfection (kills all organisms except high-level bacterial spores). Non-critical items (contact intact skin only — BP cuffs, stethoscopes, bed rails) → Low-level disinfection. A bronchoscope is semi-critical → HLD. Spaulding 1968; CDC Disinfection and Sterilisation Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Decontamination',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is responsible for reprocessing flexible endoscopes using 2% glutaraldehyde (Cidex). Which occupational safety measure is MOST critical for the nurse during this process?',
  'Perform the procedure in a closed room to maintain solution potency',
  'Use in a well-ventilated room or exhaust cabinet, wear appropriate PPE (gloves, eye protection, apron), immerse for a minimum of 20 minutes, and rinse thoroughly with sterile water before patient use',
  'Glutaraldehyde is safe to handle without PPE as it is used in dilute form',
  'Replace glutaraldehyde with normal saline if ventilation is unavailable',
  'B',
  'Glutaraldehyde 2% is a high-level disinfectant with significant occupational hazards: respiratory irritation, sensitisation (asthma), skin and eye contact dermatitis. Safety measures: use in well-ventilated areas or dedicated exhaust cabinets; PPE — chemical-resistant gloves, eye protection, apron; minimum immersion 20 minutes for HLD; thorough rinsing with sterile/filtered water before patient use; annual health surveillance and lung function monitoring for exposed staff; staff fit-testing. COSHH Regulations; EPIC3; MHRA endoscope decontamination guidance.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Decontamination',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is admitted with confirmed MRSA bacteraemia. Which contact precautions package should the nurse implement?',
  'Standard precautions only — MRSA requires no additional precautions',
  'Single room or cohorting with other MRSA patients, gloves and apron for all patient contact, hand hygiene before and after contact, dedicated equipment, decolonisation protocol (mupirocin nasal ointment 2% + chlorhexidine body washes for 5 days), contact screening for relevant contacts, and notification of the infection control team',
  'Airborne precautions with N95 respirator — MRSA is transmitted by droplets',
  'Reverse barrier nursing to protect the immunocompromised MRSA patient',
  'B',
  'MRSA (Methicillin-Resistant Staphylococcus aureus) is transmitted via contact (direct and indirect). Management requires: contact precautions (single room if available, gloves and apron, dedicated equipment); hand hygiene (alcohol gel effective against MRSA); decolonisation (mupirocin 2% nasal ointment to anterior nares + chlorhexidine 4% body washes for 5 consecutive days reduces carriage and surgical site infection risk); contact screening; IPC team notification. N95 is NOT required — MRSA is not airborne. EPIC3; NICE; Kenya MOH IPC Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Transmission-Based Precautions',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with confirmed pulmonary tuberculosis is admitted to a general ward. Which respiratory precautions are MANDATORY, and why is a surgical mask insufficient for nursing staff?',
  'Surgical mask is sufficient because TB droplets are large and settle quickly',
  'N95 respirator (FFP2/FFP3) is required for nursing staff because TB is transmitted by droplet nuclei (≤5 microns) that remain suspended in air — N95 filters ≥95% of airborne particles; patient should wear a surgical mask when outside the negative-pressure room',
  'Standard precautions and gloves only — TB is transmitted by direct contact',
  'Double surgical mask instead of N95 provides equivalent protection',
  'B',
  'Mycobacterium tuberculosis is transmitted via droplet nuclei — particles ≤5 microns that remain suspended in air for prolonged periods. A surgical mask filters large droplets but not aerosols — it is inadequate for TB nursing. N95 respirators (or FFP2/FFP3 in UK classification) filter ≥95% of 0.3-micron airborne particles and must be fit-tested annually. Ideal room: negative pressure, 12 air changes/hour, air exhausted outdoors or HEPA filtered. Patient wears a surgical mask when outside the negative-pressure room to reduce expulsion of droplet nuclei. WHO TB Guidelines; CDC TB Transmission Guidelines; Kenya NTLP.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Transmission-Based Precautions',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a Kenyan hospital, healthcare waste is being segregated at point of generation. A used intravenous line with dried blood and a contaminated wound dressing should be placed in which colour-coded container?',
  'Black bag — non-infectious general domestic waste',
  'Yellow bag — infectious/pathological waste',
  'Red bag — pharmaceutical waste',
  'Blue bag — recyclable materials',
  'B',
  'Kenya MOH healthcare waste colour-coding system: Yellow bag = infectious and pathological waste (items contaminated with blood, body fluids, excretions, or secretions — IV lines, dressings, laboratory specimens, anatomical waste, pathological material); Red bag = pharmaceutical and chemical waste; Black bag = non-infectious domestic waste (food waste, packaging not contaminated); Yellow rigid container with red lid = sharps (needles, blades, lancets). Correct segregation at the point of generation prevents cross-contamination, protects waste handlers, and ensures appropriate treatment. Kenya MOH Healthcare Waste Management Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Healthcare Waste Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse sustains a needlestick injury from a needle used on a patient of unknown HIV status in a high-prevalence setting. What is the CORRECT immediate management sequence?',
  'Squeeze the wound to express blood, apply iodine, and report next week',
  'Immediately wash the wound with soap and running water (do not squeeze or suck), allow brief bleeding, report to occupational health, risk-assess the source, perform baseline HIV testing on the exposed worker, and initiate PEP (TDF+3TC+DTG) within 72 hours — continued for 28 days',
  'Apply a tourniquet above the injury site and wait for HIV test results before deciding on PEP',
  'Administer hepatitis B immunoglobulin only and repeat HIV test in 6 months',
  'B',
  'Needlestick injury management: (1) Immediately wash with soap and running water — do NOT squeeze or suck (squeezing may force contaminated blood deeper into tissue); (2) Allow the wound to bleed briefly under running water; (3) Report immediately to occupational health; (4) Risk-assess the source patient (HIV, HBV, HCV status); (5) Baseline HIV test on the exposed worker; (6) Start PEP (TDF+3TC+DTG) WITHIN 72 hours if source is HIV-positive or unknown high-risk — delay significantly reduces PEP efficacy; (7) Continue PEP for 28 days; (8) Follow-up HIV testing at 6 weeks and 3 months. Kenya MOH PEP Guidelines; WHO PEP Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Sharps Safety and PEP',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse prepares chlorine solution for decontaminating a large blood spill on the ward floor. Which chlorine concentration is CORRECT for blood and body fluid spills?',
  '0.05% (500 ppm) — the same concentration used for routine surface disinfection',
  '0.1% (1,000 ppm) — used for soaking instruments before sterilisation',
  '0.5% (5,000 ppm) — required for blood and body fluid spills because of the higher organic load',
  '2% (20,000 ppm) — the strongest available concentration for all uses',
  'C',
  'Chlorine solution concentrations for different healthcare uses: 0.5% (5,000 ppm) — blood and body fluid spills (high organic load requires higher concentration); 0.1% (1,000 ppm) — soaking used instruments before sterilisation (kills most pathogens, safer for equipment); 0.05% (500 ppm) — routine environmental surface disinfection. Chlorine is corrosive to metal instruments and must be rinsed off after use. Solution must be freshly prepared daily as potency degrades rapidly. Kenya MOH IPC Manual; WHO IPC Technical Guidance.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Disinfectant Agents',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has had a urinary catheter in situ for five days and develops a CAUTI. The nurse reviews catheter management practices. Which intervention is MOST effective in CAUTI prevention over the long term?',
  'Routine catheter change every 72 hours regardless of clinical indication',
  'Daily antiseptic urethral meatal cleansing with povidone-iodine',
  'Daily clinical review of catheter necessity with prompt removal when no longer clinically indicated, maintenance of a closed drainage system, and using the smallest appropriate catheter gauge',
  'Prophylactic oral antibiotics for all catheterised patients',
  'C',
  'CAUTI (Catheter-Associated UTI) prevention relies on: (1) Daily necessity review — the single most effective intervention is prompt removal when the catheter is no longer needed; (2) Maintaining a closed drainage system at all times; (3) Using the smallest appropriate catheter gauge; (4) Aseptic insertion technique; (5) Positioning the drainage bag below bladder level; (6) No routine scheduled catheter changes. Biofilm forms within 24–48 hours of catheter insertion and promotes infection. Prophylactic antibiotics are not recommended and promote resistance. Saint et al.; EPIC3; HICPAC CAUTI Guidelines.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'HAI Prevention Bundles',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse performs IV drug administration using ANTT (Aseptic Non-Touch Technique). Which concept is CENTRAL to ANTT and must be protected throughout the procedure?',
  'The nurse''s hands must never touch the patient',
  'Key Parts — the critical components of the aseptic field (e.g., needles, catheter hubs, bung surfaces) that must never be touched or contaminated — and Key Sites (the patient''s wound or access device) must be identified and protected',
  'The procedure must be performed only in a sterile laminar flow cabinet',
  'The syringe barrel is the most important Key Part to protect',
  'B',
  'ANTT (Aseptic Non-Touch Technique) is based on two core concepts: (1) Key Parts — any part of equipment or materials that if contaminated could cause infection (e.g., needle tip, catheter hub, open ampoule top, bung); (2) Key Sites — the patient''s access point or wound that must remain protected. Standard ANTT applies to brief, simple procedures (IV drug admin, dressing changes); Surgical ANTT uses a Critical Aseptic Field for complex, longer procedures. The fundamental rule: Key Parts must NEVER be touched or contaminated, even when wearing gloves. Rowley & Clare ANTT; EPIC3.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Aseptic Technique',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is scheduled for elective colorectal surgery. Which preoperative intervention has been shown to INCREASE the risk of surgical site infection and must be AVOIDED?',
  'Clipping hair at the surgical site on the day of surgery',
  'Administering prophylactic antibiotics within 60 minutes before incision',
  'Shaving hair with a razor at the surgical site',
  'Applying chlorhexidine-alcohol skin antiseptic before incision',
  'C',
  'Preoperative hair removal with a razor shave significantly increases SSI risk by creating skin micro-abrasions that become colonised with bacteria. Evidence consistently shows that clipping (with an electric clipper on the day of surgery) results in significantly lower SSI rates than razor shaving. If hair removal is necessary, clipping is the only recommended method. Other key SSI bundle elements: prophylactic antibiotic within 60 minutes of incision (30 minutes for vancomycin/fluoroquinolones), intraoperative normothermia, blood glucose <11 mmol/L, and chlorhexidine-alcohol skin antisepsis. NICE SSI Guidelines; Cochrane Review on Hair Removal.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'HAI Prevention Bundles',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is about to remove PPE worn during contact precaution care for an MRSA patient. Which is the CORRECT sequence for doffing to prevent self-contamination?',
  'Remove mask first, then gloves, then gown',
  'Remove gown first, then gloves, then eye protection, then mask',
  'Remove gloves first (most contaminated), then eye protection or face shield, then gown, then mask or respirator last — perform hand hygiene after removing each item',
  'Remove all PPE simultaneously as quickly as possible',
  'C',
  'Correct doffing sequence (CDC/WHO) for contact/droplet precautions — designed to prevent transferring contamination to mucous membranes or clean surfaces: (1) Gloves — most likely contaminated, removed first (peel off inside-out); (2) Eye protection or face shield; (3) Gown (unfasten and roll away from body); (4) Mask or respirator — removed last, touching only the ties or elastics. Hand hygiene is performed after removing each item and again at the end. The mask is removed last to maintain respiratory protection throughout doffing. CDC PPE Sequence; WHO IPC Manual.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'PPE Use',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A healthcare worker develops a productive cough and is found to have active pulmonary TB with positive sputum smear. When may this worker SAFELY return to clinical duties?',
  'After one week of anti-TB therapy regardless of sputum results',
  'After completing the full 6-month TB treatment course',
  'After three consecutive negative sputum smears obtained on separate days while on anti-TB treatment, with confirmed clinical improvement and occupational health clearance',
  'Immediately if wearing an N95 respirator at all times',
  'C',
  'A healthcare worker with active smear-positive pulmonary TB is infectious and must be excluded from clinical work until: (1) on effective anti-TB treatment for a minimum of 2 weeks (usually), AND (2) three consecutive negative sputum smears (Ziehl-Neelsen) collected on separate days, AND (3) clinical improvement, AND (4) clearance from occupational health and infectious disease. Wearing an N95 does not render an infectious worker safe for patient contact — smear negativity is required. NTLP Kenya; CDC TB occupational guidance.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Occupational Health IPC',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A CVC insertion site has a transparent semi-permeable dressing in place. How frequently should this dressing be routinely changed, and what product reduces CLABSI risk when used as the dressing?',
  'Every 24 hours regardless of condition',
  'Every 7 days (or when wet, soiled, or detached), using a chlorhexidine 2% gluconate-impregnated dressing when available to reduce CLABSI rates',
  'Only when the CVC is removed',
  'Every 3 days using gauze soaked in povidone-iodine',
  'B',
  'CVC dressing guidelines (EPIC3): Transparent semi-permeable polyurethane dressings should be changed every 7 days or when visibly soiled, wet, or loose. Gauze dressings are changed every 2 days. Chlorhexidine gluconate (CHG) 2% impregnated dressings (e.g., Biopatch) placed around the insertion site significantly reduce CLABSI rates and are recommended when available. Aseptic technique is required for all dressing changes. The insertion site should be inspected daily for signs of infection. EPIC3; IHI CLABSI Bundle.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'HAI Prevention Bundles',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse cleans a patient''s room after discharge. In which sequence should environmental cleaning be performed to prevent cross-contamination?',
  'Start from the most contaminated area (toilet) and work outward toward the door',
  'Clean from top to bottom and from clean to dirty areas; give special attention to high-touch surfaces (bed rails, call bell, door handles, light switches, IV pole, overbed table); change mop heads between rooms',
  'Clean from the door inward toward the bed, using the same mop and cloth throughout to save time',
  'Spray all surfaces with disinfectant simultaneously, then wipe in any order',
  'B',
  'Evidence-based environmental cleaning sequence: top to bottom (prevents dirty particles falling on already-cleaned surfaces); clean to dirty (least contaminated areas cleaned first to avoid spreading contamination); high-touch surfaces require special attention (most likely to harbour pathogens: bed rails, call bell, door handles, light switches — Otter et al. evidence of environmental transmission of pathogens including MRSA, C. diff, VRE). Mop heads, cloths and equipment must be changed between patient rooms. Correct cleaning technique, correct detergent/disinfectant concentration, and adequate contact time are all required. CDC Environmental Cleaning; APIC; Kenya MOH IPC.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Environmental Cleaning',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During a norovirus outbreak in a medical ward, single rooms are unavailable. The infection control team recommends cohort nursing. What is the PRIMARY benefit of cohort nursing in this context?',
  'Cohorting eliminates the need for contact precautions',
  'Placing patients infected with the same pathogen together with dedicated nursing staff prevents transmission to non-infected patients and reduces cross-contamination between infected and non-infected cohorts',
  'Cohorting is used only for immunocompromised patients',
  'Cohorting is only effective for airborne pathogens',
  'B',
  'Cohort nursing (patient cohorting + staff cohorting) is used when single rooms are unavailable during outbreaks. Confirmed cases of the same organism are placed together, cared for by the same dedicated nursing staff who do not cross between infected and non-infected areas. This reduces the risk of staff acting as vectors and prevents transmission to non-infected patients. It is used effectively in norovirus, MRSA, C. difficile, and COVID-19 outbreaks. Contact precautions must still be applied within the cohort. WHO Outbreak IPC; NICE; Kenya MOH Outbreak Management.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Outbreak Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse has just removed gloves after caring for a patient with confirmed Clostridioides difficile (C. diff) infection. Which hand hygiene agent is MOST appropriate, and why is the alternative insufficient?',
  'Alcohol-based hand rub (ABHR) — most effective for all pathogens',
  'Soap and water — because C. difficile produces endospores that are NOT killed by alcohol; soap and water physically remove spores from the hands',
  'Either ABHR or soap and water — both are equally effective for C. diff',
  'Chlorhexidine hand wash — most effective for spore-forming organisms',
  'B',
  'Clostridioides difficile forms highly resistant endospores that are NOT destroyed by alcohol-based hand rub (ABHR). Alcohol denatures proteins but cannot penetrate spore coats. Soap and water mechanically removes spores from the hands through friction and rinsing — this is the only acceptable hand hygiene method after caring for a C. diff patient or when hands are visibly soiled. Chlorhexidine is also not sporicidal. ABHR is preferred in all other clinical situations. WHO Hand Hygiene Guidelines; SHEA/IDSA C. diff Guidelines; NICE.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Hand Hygiene',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient with a productive cough is waiting in the outpatient department. The nurse applies respiratory hygiene and cough etiquette. Which actions constitute CORRECT cough etiquette?',
  'Ask the patient to leave the facility immediately to prevent contamination',
  'Instruct the patient to cover the mouth and nose with a tissue when coughing or sneezing, discard the tissue immediately into a waste bin, perform hand hygiene afterwards, and wear a surgical mask when within one metre of others with respiratory symptoms if tolerated',
  'No action needed unless the patient has confirmed TB',
  'Provide a high-filtration N95 mask for the patient immediately regardless of diagnosis',
  'B',
  'Respiratory hygiene and cough etiquette (WHO/CDC) applies from point of first contact (triage, reception) for ALL patients with respiratory symptoms regardless of diagnosis: cover mouth and nose with tissue when coughing/sneezing (or use elbow if no tissue available); discard tissue immediately in a waste bin; perform hand hygiene after coughing/sneezing; wear a surgical mask when within 1 metre of others if tolerated. This reduces large-droplet transmission of all respiratory pathogens including influenza, COVID-19, and TB. A surgical mask (not N95) is used for source control in most patients unless airborne precaution criteria are met. WHO IPC; CDC.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Respiratory Precautions',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse is responsible for the reprocessing of flexible gastrointestinal endoscopes. What is the CORRECT sequence of reprocessing steps after clinical use?',
  'Sterilisation in autoclave → rinse → store',
  'Bedside pre-cleaning (wipe and flush immediately after removal), leak testing, manual cleaning with enzymatic detergent, rinse, high-level disinfection (glutaraldehyde or OPA for required contact time), rinse with sterile or filtered water, dry, and store vertically in a ventilated cabinet',
  'Immerse in alcohol immediately after use, then rinse and store horizontally',
  'Clean with soap and water, then autoclave at 134°C',
  'B',
  'Flexible endoscopes are heat-sensitive and cannot be autoclaved. Correct reprocessing (BSG/MHRA): (1) Bedside pre-cleaning — wipe external surfaces and flush channels immediately post-use before secretions dry; (2) Leak test — detects channel perforations; (3) Manual cleaning with enzymatic detergent — critical step to remove organic matter (biofilm disruption); (4) Rinse; (5) HLD — glutaraldehyde 2% minimum 20 min or OPA 0.55% minimum 5 min; (6) Final rinse with sterile or microfiltered water (not tap water — risk of recontamination with Pseudomonas/Legionella); (7) Thorough drying; (8) Vertical storage in ventilated cabinet. Each step is mandatory. BSG JAG endoscope decontamination guidelines; MHRA.',
  'BScN',
  'Paper II',
  'Infection Prevention & Control',
  'Decontamination',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- RESEARCH & EVIDENCE-BASED PRACTICE (20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse wants to determine whether catheter care bundles reduce CAUTI rates compared to standard care in adult ICU patients. Using PICO, which formulation is CORRECT?',
  'P=All patients; I=Antibiotics; C=No treatment; O=Patient satisfaction',
  'P=Adult ICU patients with urinary catheters; I=Catheter care bundle; C=Standard urinary catheter care; O=Rate of CAUTI per 1,000 catheter-days',
  'P=Paediatric patients; I=Catheter removal; C=Continued catheterisation; O=Length of stay',
  'P=All hospitalised patients; I=Hand hygiene; C=No hand hygiene; O=Mortality',
  'B',
  'PICO is a structured framework for formulating focused clinical questions: P (Population/Patient) = the specific patient group; I (Intervention) = the clinical intervention being evaluated; C (Comparison/Control) = the alternative (standard care, placebo, or another intervention); O (Outcome) = the measurable outcome of interest. For CAUTI research, the PICO correctly specifies adult ICU patients with catheters, compares a bundle to standard care, and uses CAUTI rate (per 1,000 catheter-days) as the outcome — a standard HAI metric. Sackett EBP; PICO Framework.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'PICO Framework',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse reviews the evidence hierarchy for a clinical question about the effectiveness of a new wound dressing. Which level of evidence provides the STRONGEST support for clinical decision-making?',
  'Expert opinion from a respected clinical specialist',
  'A single well-designed randomised controlled trial (RCT)',
  'A systematic review and meta-analysis of multiple RCTs',
  'A large descriptive cohort study',
  'C',
  'The hierarchy of evidence for intervention questions (strongest to weakest): Level I — Systematic review/meta-analysis of RCTs (synthesises all available high-quality evidence, reduces random error through pooling); Level II — Individual RCT (experimental design with randomisation controls for confounding); Level III — Quasi-experimental/controlled before-after study; Level IV — Descriptive/observational studies (cohort, case-control); Level V — Expert opinion, case reports. Systematic reviews occupy the apex because they minimise bias through reproducible search strategy, pre-defined inclusion criteria, quality appraisal, and statistical synthesis. Sackett; Oxford CEBM.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Hierarchy of Evidence',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In an RCT comparing a new antibiotic to standard therapy, the researchers use sealed opaque envelopes to conceal group allocation from the clinician until the patient is enrolled. This method specifically prevents which type of bias?',
  'Performance bias',
  'Detection bias',
  'Selection bias through inadequate allocation concealment',
  'Reporting bias',
  'C',
  'Allocation concealment prevents the researcher or clinician from knowing the upcoming treatment assignment before a participant is enrolled, which would allow them to preferentially enrol certain types of patients into a preferred group (selection bias). Sealed opaque envelopes, centralised randomisation, or pharmacy-controlled allocation are standard methods. This is distinct from blinding (which prevents knowing group allocation after enrolment — addresses performance and detection bias). Allocation concealment is critical even in open-label trials. Cochrane Handbook; Schulz & Grimes.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'RCT Design',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a double-blind RCT evaluating a new analgesic, both the participants and the outcome assessors are unaware of the treatment assignment. Which TWO types of bias does double-blinding primarily prevent?',
  'Selection bias and reporting bias',
  'Performance bias (participants may alter behaviour if they know their treatment) and detection bias (outcome assessors may measure outcomes differently if they know the treatment group)',
  'Confounding bias and ecological fallacy',
  'Attrition bias and information bias',
  'B',
  'Blinding in RCTs: Participant blinding prevents performance bias — participants who know they received the experimental treatment may report better outcomes (placebo effect) or change their behaviour. Outcome assessor blinding prevents detection bias — assessors who know the treatment group may measure, interpret, or record outcomes differently. Double-blinding (both participant and assessor) addresses both biases simultaneously. In a triple-blind RCT, the statistician is also blinded. When blinding is impossible (e.g., surgical vs medical treatment), other safeguards (independent outcome assessment, objective outcomes) minimise bias. Cochrane Handbook.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'RCT Design',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In an RCT of a new antihypertensive, 30 participants randomised to the treatment group dropped out after week 2. The researchers analyse ALL originally randomised participants in the group they were assigned to, regardless of whether they completed treatment. Which analytical approach is this, and why is it preferred?',
  'Per-protocol analysis — it excludes dropouts and reflects true treatment effect in adherers',
  'Intention-to-treat (ITT) analysis — it analyses all participants as randomised, preserves the benefits of randomisation, prevents bias from selective dropout, and reflects real-world effectiveness',
  'Subgroup analysis — it identifies which patient subgroup benefits most',
  'Sensitivity analysis — it tests how robust results are to different assumptions',
  'B',
  'Intention-to-treat (ITT) analysis includes all randomised participants in their assigned groups regardless of adherence, dropout, or protocol deviations. It preserves the balance of known and unknown confounders achieved by randomisation, gives a conservative estimate of treatment effect (real-world effectiveness), and prevents attrition bias. Per-protocol analysis only includes those who completed treatment as planned — it can introduce bias if dropouts are non-random (e.g., dropouts due to side effects — more likely in the intervention group). ITT is the pre-specified primary analysis in most RCTs. Cochrane Handbook; Hernan & Hernandez-Diaz.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'RCT Design',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A wound healing study reports p = 0.03 for the primary outcome. Which is the MOST accurate interpretation of this result?',
  'There is a 97% chance that the intervention is effective',
  'The probability of observing a result as extreme as this (or more extreme) if the null hypothesis were true is 3% — conventionally statistically significant at alpha 0.05 — but statistical significance does not imply clinical significance',
  'The result proves that the intervention causes wound healing',
  'The study should be repeated because a p-value below 0.05 indicates a flawed methodology',
  'B',
  'The p-value represents the probability of obtaining results as extreme as those observed, assuming the null hypothesis (no effect) is true. p = 0.03 means there is a 3% chance of observing this result by chance if H0 were true — conventionally significant at alpha 0.05 (we reject H0). Critical limitations: p-value does NOT indicate the size or clinical importance of the effect (that requires effect size measures: mean difference, relative risk, NNT); it does not prove causation; it is affected by sample size (large samples can produce statistically significant but clinically trivial effects). Sackett; Wasserstein & Lazar (2016).',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Statistical Interpretation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A trial of a new wound dressing reports: relative risk (RR) = 0.72 (95% CI: 0.55–0.94). Which is the CORRECT clinical interpretation of this result?',
  'The new dressing has no effect because the RR is below 1.0',
  'The new dressing is associated with a 28% reduction in wound complication risk; the 95% CI (0.55–0.94) does not cross 1.0, indicating a statistically significant result — but absolute risk reduction and NNT are needed to judge clinical significance',
  'The result is statistically non-significant because the confidence interval is wide',
  'The new dressing increases risk of wound complications by 72%',
  'B',
  'RR < 1 favours the intervention (reduces risk). RR = 0.72 means the intervention group had 72% of the risk of the control group — a 28% relative risk reduction. The 95% CI (0.55–0.94) does not include 1.0 (no effect), confirming statistical significance at alpha 0.05. However, clinical significance requires knowing the absolute risk reduction (ARR = control rate minus intervention rate) and number needed to treat (NNT = 1/ARR). A 28% relative reduction from a baseline risk of 2% gives an ARR of only 0.56% and NNT of 179 — potentially not clinically meaningful despite statistical significance. Sackett EBP; Guyatt JAMA User''s Guide.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Statistical Interpretation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In a wound care RCT, the control group event rate (wound infection) is 40% and the experimental group (new dressing) event rate is 25%. Calculate the Number Needed to Treat (NNT).',
  'NNT = 2',
  'NNT = 4',
  'NNT = 7',
  'NNT = 15',
  'C',
  'NNT calculation: ARR (Absolute Risk Reduction) = Control Event Rate minus Experimental Event Rate = 0.40 - 0.25 = 0.15 (15%). NNT = 1 / ARR = 1 / 0.15 = 6.67, rounded up to 7. Interpretation: 7 patients need to be treated with the new dressing for one additional patient to avoid a wound infection compared with standard care. NNT combines the relative treatment effect with the baseline risk and provides a clinically meaningful measure of benefit. Lower NNT = greater clinical benefit. NNT > 50 is generally considered clinically marginal. Sackett; Cook & Sackett NNT methodology.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Statistical Interpretation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A new rapid diagnostic test for TB has 95% sensitivity and 60% specificity. When applied to a low-prevalence population (TB prevalence 1%), what is the MOST important clinical implication?',
  'The test is excellent and should replace all other TB diagnostics immediately',
  'The high sensitivity means very few true TB cases will be missed, but the low specificity in a low-prevalence population means a large proportion of positive results will be false positives — the positive predictive value (PPV) will be low',
  'Specificity is more important than sensitivity for all screening tests regardless of prevalence',
  'The test''s false negative rate is 60%, making it unsuitable for screening',
  'B',
  'In low-prevalence populations, even a test with excellent sensitivity will generate many false positives if specificity is imperfect. This is explained by Bayes'' theorem and the PPV (positive predictive value) — the proportion of positive results that are true positives. PPV depends on both specificity AND prevalence. With 1% prevalence, 95% sensitivity, and 60% specificity: in 10,000 people — 100 true cases (1%), test correctly identifies ~95 (TP) but incorrectly classifies ~3,960 negatives as positive (FP). PPV = 95/(95+3960) = ~2.3% — most positives are false! High sensitivity is critical for screening (minimise missed cases); high specificity is critical for confirmation (minimise false positives). Sackett; Fletcher & Fletcher.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Diagnostic Test Evaluation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse comparing a systematic review to a narrative review for guidance on hand hygiene practice. Which statement BEST distinguishes a systematic review from a narrative review?',
  'A systematic review is written by a single expert and a narrative review by multiple authors',
  'A systematic review uses a pre-specified reproducible search strategy, pre-defined eligibility criteria, systematic quality appraisal, and may use meta-analysis to pool data — making it transparent and reproducible; a narrative review uses selective, non-transparent literature selection with potential for author bias',
  'A narrative review is always more up-to-date than a systematic review',
  'Systematic reviews only include qualitative studies',
  'B',
  'Key differences: Systematic review — pre-registered protocol (PROSPERO), comprehensive reproducible search of multiple databases, pre-defined PICO inclusion/exclusion criteria, risk of bias assessment of included studies, systematic data extraction, PRISMA reporting standard, may include meta-analysis (statistical pooling). Narrative review — typically no pre-specified protocol, selective literature search, no formal quality appraisal, more subject to author''s bias and selective reporting, useful for broad topic overviews. Evidence hierarchies place systematic reviews at the apex for clinical decision-making. Cochrane Handbook; PRISMA 2020.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Research Designs',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse uses the CONSORT checklist when critically appraising an RCT on pressure ulcer prevention. What is the PRIMARY purpose of the CONSORT checklist?',
  'To calculate sample sizes for future RCTs',
  'To provide a standardised checklist ensuring transparent and complete reporting of RCTs — covering PICO, randomisation method, allocation concealment, blinding, participant flow (CONSORT flow diagram), outcomes, and statistical analysis',
  'To assess the quality of systematic reviews and meta-analyses',
  'To determine whether an RCT should be published',
  'B',
  'CONSORT (Consolidated Standards of Reporting Trials) is a reporting guideline for RCTs consisting of a 25-item checklist and a participant flow diagram. It mandates reporting of: study design rationale (PICO), randomisation sequence generation, allocation concealment, blinding methods, participant flow at each stage (enrolled, allocated, followed up, analysed), primary and secondary outcomes, statistical methods, and discussion of limitations. CONSORT improves RCT reporting quality and allows appraisers to identify risk of bias. PRISMA is the equivalent for systematic reviews. Moher et al. CONSORT 2010.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Research Appraisal Tools',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Two nurses independently assess 100 wound dressings for signs of infection using the same assessment tool. Their ratings agree on 72 dressings out of 100. A researcher calculates Cohen''s kappa to be 0.62. How should this be interpreted, and why is kappa preferred over percent agreement?',
  'Kappa of 0.62 indicates poor agreement — values above 0.90 are required for research',
  'Kappa of 0.62 indicates substantial inter-rater agreement (range 0.61–0.80 = substantial); kappa is preferred because it corrects for agreement expected by chance alone — percent agreement can be misleadingly high when one category predominates',
  'Percent agreement (72%) is sufficient and kappa adds no additional value',
  'Kappa of 0.62 means 62% of assessments were performed incorrectly',
  'B',
  'Cohen''s kappa (κ) interprets inter-rater reliability after correcting for chance agreement: κ < 0.20 = slight; 0.21–0.40 = fair; 0.41–0.60 = moderate; 0.61–0.80 = substantial; 0.81–1.00 = almost perfect (Landis & Koch scale). κ = 0.62 = substantial agreement. Kappa is preferred over simple percent agreement because percent agreement does not account for the agreement expected by chance — if one rater marks "infected" 90% of the time and the other also 90%, there is high chance agreement even without meaningful concordance. Kappa corrects for this. Cohen 1960; Landis & Koch 1977.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Statistical Interpretation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A clinical trial reports that a new antibiotic is significantly effective in reducing infection (p = 0.04). A post-study investigation reveals the drug actually has NO true effect — the trial produced a false positive result. Which statistical error has occurred?',
  'Type II error (beta error) — failing to detect a true effect',
  'Type I error (alpha error) — rejecting the true null hypothesis (concluding the drug works when it does not)',
  'Selection bias — the sample was not representative',
  'Confounding — an unmeasured variable caused the apparent effect',
  'B',
  'Type I error (alpha/false positive): Incorrectly rejecting the null hypothesis — concluding there IS an effect when there is none. The probability is set by alpha (conventionally 0.05 — 5% chance of making this error). Here, p = 0.04 led to rejecting H0, but the drug has no true effect — a Type I error. Type II error (beta/false negative): Failing to reject H0 when it is false — concluding no effect when one exists. Power (1-beta) is the probability of correctly detecting a true effect; conventionally 80%. Type I and II errors are inversely related for a given sample size. Sackett; Altman & Bland.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Statistical Interpretation',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'An RCT of a new skin care protocol for pressure ulcer prevention was conducted in a single private hospital in Nairobi and showed excellent results. A nurse at a rural dispensary in Turkana wants to apply the findings. Which type of validity is MOST threatened, and why?',
  'Internal validity — the study design was flawed',
  'External validity (generalisability) — the study population, setting, and resources of a private Nairobi hospital may differ substantially from a rural dispensary, limiting applicability of the findings',
  'Construct validity — the outcome measure was not appropriate',
  'Content validity — the intervention was not well defined',
  'B',
  'Internal validity refers to the degree to which the study correctly measures cause and effect within the study population (i.e., whether the intervention truly caused the outcome). External validity (generalisability/applicability) refers to whether the results can be applied to other populations, settings, or contexts. A study in a well-resourced private Nairobi hospital (different staffing, equipment, patient case mix, and resource availability) may not generalise to a rural dispensary. This is the key external validity concern. Sackett EBP; Guyatt JAMA Users'' Guide to Medical Literature.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Research Validity',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher conducts a qualitative study on nurses'' experiences of moral distress. Thematic analysis is used to analyse interview transcripts. Which correctly describes the SEQUENCE of thematic analysis?',
  'Statistical analysis → coding → theme generation → literature review',
  'Familiarisation with data → generating initial codes → searching for themes → reviewing themes → defining and naming themes → producing the report',
  'Literature review → data collection → immediate publication → data analysis',
  'Hypothesis testing → survey administration → regression analysis → reporting',
  'B',
  'Braun & Clarke''s six-phase thematic analysis: (1) Familiarisation — immersion in data (read and re-read transcripts); (2) Generating initial codes — systematic labelling of meaningful segments; (3) Searching for themes — collating codes into potential themes; (4) Reviewing themes — checking themes against coded data and original transcripts; (5) Defining and naming themes — refining and clearly defining each theme; (6) Producing the report — writing up with illustrative quotes and analysis. This iterative process is appropriate for rich qualitative data exploring lived experience. Braun & Clarke 2006; Creswell.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Qualitative Research Methods',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A ward nurse identifies that current wound dressing practice differs from guidance in a recent Cochrane review. Which steps in the EBP process should she follow to implement a practice change?',
  'Immediately change practice based on the Cochrane review without consultation',
  'Ask (PICO question) → Acquire (search for evidence) → Appraise (critically evaluate evidence) → Apply (implement with local adaptation and stakeholder engagement) → Audit (measure outcomes and adjust)',
  'Wait for management to identify the problem and initiate the change',
  'Conduct a new RCT on the ward before making any changes',
  'B',
  'The Evidence-Based Practice (EBP) process follows the 5 or 6 As: Ask (formulate a PICO question); Acquire (conduct a systematic literature search); Appraise (critically evaluate evidence quality and applicability); Apply (implement with local adaptation — involves stakeholder engagement, education, policy update, addressing barriers); Audit/Assess (monitor implementation outcomes against baseline — PDSA cycle); Adjust (sustain and refine). The nurse should not change practice unilaterally but should engage ward management, the IPC team, and colleagues through a structured change process. Sackett EBP; Iowa Model; JBI EBP Framework.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Evidence-Based Practice Process',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher recruits participants from a low-income community in Nairobi for a study on an experimental TB vaccine with significant side effects. The researcher argues the community will benefit most. Which Belmont Report principle is MOST at risk of violation, and why?',
  'Beneficence — the researcher should maximise benefits to participants',
  'Respect for Persons — informed consent may not be adequately obtained from a vulnerable population',
  'Justice — disproportionately recruiting a vulnerable, low-income community to bear the research burdens while benefits may accrue to others violates the fair distribution principle',
  'Non-maleficence — vaccine side effects should be avoided in all studies',
  'C',
  'The Belmont Report (1979) identifies three principles: Respect for Persons (autonomy — informed voluntary consent; protection of vulnerable groups); Beneficence (maximise benefit, minimise harm); Justice (fair distribution of research burdens AND benefits — not systematically excluding some groups from benefits or exposing only vulnerable groups to burdens). Justice is violated when a disadvantaged community is targeted to bear risks (side effects) while the benefits of the vaccine may predominantly accrue to more affluent populations or countries. This is a landmark principle from the Tuskegee legacy. Belmont Report 1979.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Research Ethics',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A blood pressure cuff consistently reads 10 mmHg higher than the true intra-arterial BP on all patients. How should this measurement instrument be characterised?',
  'Both reliable AND valid — consistent readings confirm validity',
  'Reliable but NOT valid — it produces consistent (reproducible) readings, but those readings do not accurately represent the true blood pressure',
  'Neither reliable nor valid — consistent error indicates a broken instrument',
  'Valid but not reliable — it measures true BP but inconsistently',
  'B',
  'Reliability refers to consistency/reproducibility — the instrument gives the same measurement under the same conditions repeatedly. Validity refers to accuracy — the instrument measures what it is supposed to measure (true BP). A cuff that consistently reads 10 mmHg too high is RELIABLE (consistent, reproducible) but NOT VALID (does not accurately measure true BP). This distinction is critical in research: a reliable but invalid instrument will yield precise but systematically biased data. High reliability is a prerequisite for validity but does not guarantee it. Polit & Beck Research in Nursing; Sackett.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Measurement in Research',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A researcher studying the lived experiences of HIV-positive nurses uses snowball sampling — initial participants recruit others from their personal networks. What is the KEY limitation of this sampling method?',
  'It is too expensive and time-consuming for qualitative research',
  'It cannot be used for sensitive topics',
  'It tends to produce a homogeneous sample because participants recruit others similar to themselves, limiting diversity and the ability to generalise findings to the broader population of HIV-positive nurses',
  'It requires a large sample size to achieve theoretical saturation',
  'C',
  'Snowball sampling (chain-referral) is useful for hard-to-reach or stigmatised populations (HIV-positive nurses may not be publicly identifiable). However, the key limitation is potential homogeneity bias: participants tend to recruit individuals from the same social network who share similar characteristics, experiences, and perspectives. This limits diversity of the sample and the transferability (qualitative equivalent of generalisability) of findings. Additionally, those outside the network are systematically excluded. Purposive sampling offers more deliberate diversity. Creswell; Patton Qualitative Evaluation.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Sampling Methods',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A nurse appraising a systematic review of wound care interventions checks for a PRISMA flow diagram. What does this diagram specifically report?',
  'The statistical methods used to combine study results',
  'The number of studies identified through database searching, the number screened, the number assessed for full-text eligibility, the reasons for exclusion, and the number finally included in the review',
  'The individual patient data from all included studies',
  'The funding sources and conflicts of interest for the systematic review',
  'B',
  'The PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) flow diagram is a mandatory element of systematic review reporting. It visually documents the study selection process: records identified (database searches, registers, other sources) → records screened (title and abstract) → full-text articles assessed for eligibility → studies included in the review. Reasons for exclusion at full-text stage are provided. This transparency allows readers to assess the comprehensiveness and reproducibility of the search and selection process. PRISMA 2020; Moher et al. PRISMA Statement.',
  'BScN',
  'Paper II',
  'Research & Evidence-Based Practice',
  'Research Appraisal Tools',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ============================================================
-- KRCHN Paper I — Anatomy & Physiology (remaining 20 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which structure in the kidney filters blood to form the initial glomerular filtrate?',
  'Loop of Henle',
  'Bowman''s capsule and glomerulus',
  'Collecting duct',
  'Distal convoluted tubule',
  'B',
  'The glomerulus (a capillary tuft) enclosed in Bowman''s capsule forms the renal corpuscle where blood is ultrafiltered. Hydrostatic pressure drives fluid and small molecules across the filtration barrier, forming approximately 180 litres of filtrate per day. The tubular segments then reabsorb 99% of this filtrate. Tortora & Grabowski Anatomy and Physiology.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Renal Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which fluid compartment contains the largest proportion of total body water?',
  'Plasma',
  'Interstitial fluid',
  'Intracellular fluid (ICF)',
  'Transcellular fluid',
  'C',
  'Total body water (TBW) is approximately 60% of body weight in adults. It is divided into: Intracellular fluid (ICF) — approximately 2/3 of TBW (40% of body weight); Extracellular fluid (ECF) — approximately 1/3 of TBW (20% of body weight), comprising plasma (~5%) and interstitial fluid (~15%). ICF is the largest single compartment. Tortora & Grabowski; Kozier & Erb Fundamentals.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Fluid Balance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Extracellular fluid (ECF) consists of which two main compartments?',
  'Intracellular fluid and lymph',
  'Plasma and interstitial fluid',
  'Cerebrospinal fluid and synovial fluid',
  'Transcellular fluid and intracellular fluid',
  'B',
  'Extracellular fluid (ECF) includes all fluid outside cells, comprising: (1) Intravascular fluid (plasma — ~5% of body weight); (2) Interstitial fluid (fluid between cells — ~15% of body weight). Transcellular fluids (CSF, synovial, pleural) are a small subset of ECF. ECF is the main transport medium for nutrients, hormones, and waste between cells and the circulation. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Fluid Balance',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Ovulation in a regular 28-day menstrual cycle typically occurs on which day, and which hormone triggers it?',
  'Day 7; triggered by FSH surge',
  'Day 14; triggered by LH surge',
  'Day 21; triggered by progesterone peak',
  'Day 28; triggered by oestrogen drop',
  'B',
  'In a regular 28-day cycle, ovulation occurs approximately on day 14. The LH (luteinising hormone) surge from the anterior pituitary, triggered by rising oestrogen, causes rupture of the dominant follicle and release of the oocyte. After ovulation, the corpus luteum forms and produces progesterone. Timing varies with cycle length. Myles Midwifery; Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Reproductive Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Thyroid hormones T3 and T4 regulate which physiological process, and which anterior pituitary hormone controls their release?',
  'Blood calcium levels; controlled by PTH',
  'Metabolism (metabolic rate); controlled by TSH (thyroid-stimulating hormone)',
  'Blood glucose; controlled by ACTH',
  'Water reabsorption; controlled by ADH',
  'B',
  'Thyroid hormones (T3 — triiodothyronine; T4 — thyroxine) are produced by thyroid follicular cells and regulate the basal metabolic rate, thermogenesis, protein synthesis, and growth. Their release is controlled by TSH (thyroid-stimulating hormone) from the anterior pituitary, which is itself regulated by TRH from the hypothalamus. Hypothyroidism: low metabolism; hyperthyroidism: raised metabolism. Brunner & Suddarth''s; Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Endocrine Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The adrenal cortex produces which hormones, and the adrenal medulla produces which hormones?',
  'Cortex: adrenaline and noradrenaline; Medulla: cortisol and aldosterone',
  'Cortex: cortisol and aldosterone; Medulla: adrenaline and noradrenaline',
  'Cortex: insulin and glucagon; Medulla: ADH and oxytocin',
  'Cortex: FSH and LH; Medulla: testosterone',
  'B',
  'The adrenal gland has two functional layers: (1) Adrenal cortex (outer) produces steroid hormones — glucocorticoids (cortisol — stress response, anti-inflammatory), mineralocorticoids (aldosterone — sodium/water reabsorption), and androgens; (2) Adrenal medulla (inner) produces catecholamines — adrenaline (epinephrine) and noradrenaline (norepinephrine) — the fight-or-flight hormones. Tortora & Grabowski; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Endocrine Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which lobe of the brain is responsible for motor function and personality, and which lobe processes visual information?',
  'Temporal lobe: motor; parietal lobe: vision',
  'Frontal lobe: motor and personality; occipital lobe: vision',
  'Parietal lobe: motor; frontal lobe: vision',
  'Occipital lobe: motor; temporal lobe: vision',
  'B',
  'Brain lobe functions: Frontal lobe — voluntary motor control (primary motor cortex), personality, executive function, Broca''s speech area (left). Parietal lobe — somatosensory (touch, proprioception, pain, temperature). Temporal lobe — hearing, memory, Wernicke''s speech area (left). Occipital lobe — primary visual processing. The cerebellum coordinates movement and balance; the brainstem controls vital functions. Tortora & Grabowski; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Neuroanatomy',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the normal ranges for adult vital signs: respiratory rate, heart rate, blood pressure, temperature, and SpO2?',
  'RR 8–12; HR 40–60; BP <140/90; Temp 35–36°C; SpO2 85–95%',
  'RR 12–20 breaths/min; HR 60–100 bpm; BP <120/80 mmHg; Temp 36–37.5°C; SpO2 95–100%',
  'RR 20–30; HR 100–120; BP <160/100; Temp 37.5–38°C; SpO2 90–95%',
  'RR 10–14; HR 50–80; BP <130/85; Temp 36.5–37°C; SpO2 98–100%',
  'B',
  'Normal adult vital signs: Respiratory rate 12–20 breaths/minute; Heart rate 60–100 bpm; Blood pressure <120/80 mmHg; Temperature 36.0–37.5°C (axillary); SpO2 95–100%. Values outside these ranges should be assessed clinically. Tachycardia (>100), bradycardia (<60), tachypnoea (>20), fever (>37.5°C), hypotension (SBP <90), and SpO2 <95% all require clinical attention. Kenya MOH Assessment Guidelines; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Vital Signs',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In blood coagulation, the extrinsic pathway is activated by tissue factor and measured by which test, while the intrinsic pathway is activated by contact and measured by which test?',
  'Extrinsic: APTT; Intrinsic: PT',
  'Extrinsic: PT (prothrombin time); Intrinsic: APTT (activated partial thromboplastin time)',
  'Both pathways are measured by INR only',
  'Extrinsic: fibrinogen level; Intrinsic: platelet count',
  'B',
  'Coagulation pathways: Extrinsic pathway — activated by tissue factor (TF) released from damaged vessel walls; tested by PT (prothrombin time)/INR; measures factors VII, X, V, II, I. Intrinsic pathway — activated by contact (collagen exposure); tested by APTT (aPTT); measures factors XII, XI, IX, VIII, X, V, II, I. Both converge at Factor X activation (common pathway) leading to thrombin and fibrin formation. Brunner & Suddarth''s; Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Haematology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which physiological changes occur in pregnancy to support fetal growth?',
  'Decreased blood volume, decreased cardiac output, and increased blood pressure throughout pregnancy',
  'Increased blood volume and cardiac output, mild decrease in blood pressure in second trimester, increased respiratory rate, enlarging uterus, and HCG produced by trophoblast',
  'Decreased heart rate and blood pressure with no change in blood volume',
  'Decreased respiratory rate and blood volume with increased haemoglobin concentration',
  'B',
  'Physiological adaptations in pregnancy: Blood volume increases ~45% (haemodilution — physiological anaemia). Cardiac output increases 30–50% (increased HR and SV). BP decreases in second trimester (progesterone-mediated vasodilation), then normalises. RR increases slightly. Uterus enlarges from 70g to ~1 kg. HCG (human chorionic gonadotrophin) is produced by trophoblast — basis of pregnancy tests. GFR increases; renal plasma flow rises. Myles Midwifery; Kenya MOH ANC Guidelines.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Reproductive Physiology',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal adult urine output range per hour and per 24 hours?',
  'Less than 0.1 mL/kg/hour or 100–200 mL/24 hours',
  '0.5 mL/kg/hour or approximately 400–1500 mL/24 hours',
  '2 mL/kg/hour or 2000–3000 mL/24 hours',
  '5 mL/kg/hour or 5000–8000 mL/24 hours',
  'B',
  'Normal urine output in adults: minimum 0.5 mL/kg/hour (approximately 30 mL/hour for a 60 kg person). Normal daily range: approximately 400–1500 mL/24 hours (average 1000–1500 mL). Oliguria (<0.5 mL/kg/hour or <400 mL/24h) indicates renal impairment or inadequate hydration. Anuria (<50 mL/24h) is a medical emergency. Urine output is one of the most reliable indicators of renal perfusion. Brunner & Suddarth''s; Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Renal Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which muscle is the primary muscle of breathing, and which nerve innervates it?',
  'Intercostal muscles; intercostal nerves T1–T11',
  'Diaphragm; phrenic nerve (C3, C4, C5)',
  'Sternocleidomastoid; spinal accessory nerve (CN XI)',
  'Rectus abdominis; subcostal nerve',
  'B',
  'The diaphragm is the principal muscle of inspiration — when it contracts it moves downward, increasing thoracic volume and creating negative intrathoracic pressure that draws air into the lungs. It is innervated by the phrenic nerve (C3, C4, C5 — mnemonic: "C3, 4, 5 keep the diaphragm alive"). Spinal injury at C3 and above paralyses the diaphragm and requires ventilatory support. Tortora & Grabowski; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Respiratory Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the four main functions of the liver relevant to nursing assessment?',
  'Produces insulin, stores calcium, filters lymph, and produces red blood cells',
  'Produces bile for fat digestion, detoxifies drugs and alcohol, synthesises clotting factors, and stores glycogen',
  'Produces TSH, filters blood for pathogens, synthesises haemoglobin, and stores iron only',
  'Secretes ADH, filters urine, produces aldosterone, and stores vitamins only',
  'B',
  'Key liver functions: (1) Bile production — emulsifies dietary fat for absorption; (2) Detoxification — metabolises and eliminates drugs, alcohol, ammonia, and other toxins; (3) Synthesis of clotting factors (I, II, V, VII, IX, X) — liver failure causes coagulopathy; (4) Glycogen storage — regulates blood glucose; additionally: albumin synthesis (maintains oncotic pressure), cholesterol metabolism, vitamin storage (A, D, E, K, B12). Assessing liver function guides nursing care in hepatic disease. Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Gastrointestinal Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Insulin is produced by which cells of the pancreas, and what is its primary effect on blood glucose?',
  'Alpha cells; raises blood glucose by stimulating glycogenolysis',
  'Beta cells of the islets of Langerhans; lowers blood glucose by promoting cellular glucose uptake',
  'Delta cells; inhibits both insulin and glucagon secretion',
  'Acinar cells; promotes digestion by releasing pancreatic enzymes',
  'B',
  'The pancreas has endocrine (islets of Langerhans) and exocrine functions. Beta cells (B cells) produce insulin — released in response to rising blood glucose. Insulin lowers blood glucose by: promoting glucose uptake by muscle and adipose cells (via GLUT4 transporters), stimulating glycogen synthesis (glycogenesis), and inhibiting gluconeogenesis. Type 1 diabetes: absent insulin (autoimmune beta cell destruction). Type 2: insulin resistance. Tortora & Grabowski; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Endocrine Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Glucagon is produced by which cells of the pancreas, and what is its primary effect?',
  'Beta cells; lowers blood glucose',
  'Alpha cells of the islets of Langerhans; raises blood glucose by stimulating glycogenolysis and gluconeogenesis',
  'Delta cells; stimulates digestion',
  'Acinar cells; stimulates bile production',
  'B',
  'Alpha cells (A cells) of the islets of Langerhans produce glucagon. Glucagon is released when blood glucose falls and acts to raise blood glucose by: stimulating glycogenolysis (breakdown of glycogen → glucose) and gluconeogenesis (synthesis of new glucose from non-carbohydrate precursors) in the liver. Glucagon injection is used to treat severe hypoglycaemia in unconscious patients who cannot receive oral glucose. Tortora & Grabowski; Kenya MOH Diabetes Guidelines.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Endocrine Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'The skin is the largest organ of the body. Which four functions make it clinically important for nursing assessment?',
  'Digestion, absorption of nutrients, hormone production, and blood filtration',
  'Protection from pathogens and injury, temperature regulation, sensation (touch, pain, pressure), and Vitamin D synthesis',
  'Oxygen exchange, waste excretion via sweat only, immune surveillance, and vision',
  'Sound transmission, hormone storage, calcium metabolism only, and hair production',
  'B',
  'Skin functions relevant to nursing: (1) Protection — physical barrier against pathogens, UV radiation, chemical injury, and fluid loss; (2) Temperature regulation — sweating (evaporation cools), vasoconstriction/vasodilation in dermis; (3) Sensation — cutaneous receptors for touch, pressure, pain, temperature; (4) Vitamin D synthesis — UV light converts 7-dehydrocholesterol in skin to Vitamin D3 (cholecalciferol). Additional: immunity (Langerhans cells), fluid/electrolyte barrier, pigmentation. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Integumentary System',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Cerebrospinal fluid (CSF) is produced by which structure, and what is its normal pressure range?',
  'Produced by the meninges; normal pressure 30–50 cmH2O',
  'Produced by the choroid plexus of the ventricles; normal pressure 7–18 cmH2O',
  'Produced by the cerebral cortex; normal pressure 1–5 cmH2O',
  'Produced by the pituitary gland; no measurable pressure',
  'B',
  'CSF is produced by the choroid plexus (specialised epithelial cells lining the lateral, third, and fourth ventricles) at approximately 500 mL/day, with ~150 mL in circulation at any time. It circulates through the ventricular system and subarachnoid space. Normal CSF pressure: 7–18 cmH2O (measured in lateral decubitus position during lumbar puncture). Raised CSF pressure (>20 cmH2O) indicates increased ICP. CSF is clear and colourless in health; xanthochromia indicates blood. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Neuroanatomy',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In the ABO blood group system, which blood group is the universal recipient and which is the universal donor?',
  'Blood group A is universal recipient; blood group B is universal donor',
  'Blood group AB is the universal recipient; blood group O negative is the universal donor',
  'Blood group O positive is universal recipient; blood group AB is universal donor',
  'All blood groups can give and receive from any other group without risk',
  'B',
  'ABO blood groups: A (has A antigens, anti-B antibodies), B (B antigens, anti-A antibodies), AB (A and B antigens, no antibodies — can receive any group = universal recipient), O (no ABO antigens, both anti-A and anti-B antibodies — can donate to all = universal donor). O negative is the universal donor for red blood cells (lacks A, B, and Rh D antigens). In emergencies, O negative blood is given when cross-matching is unavailable. Kenya MOH Blood Transfusion Guidelines.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Blood and Haematology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Oestrogen and progesterone are produced by which gland, and what is their role in the menstrual cycle?',
  'Produced by the anterior pituitary; regulate ovulation only',
  'Produced by the ovaries; oestrogen builds and maintains the endometrium in the proliferative phase and progesterone maintains it in the secretory phase to prepare for implantation',
  'Produced by the adrenal cortex; regulate sodium and water balance in the menstrual cycle',
  'Produced by the uterus; stimulate FSH and LH release from the pituitary',
  'B',
  'Ovarian hormones in the menstrual cycle: Oestrogen — produced by developing follicle (follicular/proliferative phase); stimulates endometrial proliferation, cervical mucus thinning, and LH surge trigger. Progesterone — produced by corpus luteum after ovulation (luteal/secretory phase); transforms endometrium into secretory state for implantation; maintains early pregnancy. If no implantation: corpus luteum regresses, progesterone falls, menstruation begins. Myles Midwifery; Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Reproductive Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Testosterone is produced by which cells in the testes, and what are its primary functions?',
  'Sertoli cells; responsible for sperm nourishment only',
  'Leydig cells (interstitial cells); responsible for male secondary sex characteristics and spermatogenesis',
  'Seminal vesicles; produces seminal fluid and androgens equally',
  'Prostate gland; regulates libido and bone density',
  'B',
  'Testosterone is produced by Leydig cells (interstitial cells of the testes) under the stimulation of LH from the anterior pituitary. Functions: (1) Primary sex characteristics — development of male reproductive organs; (2) Secondary sex characteristics — facial and body hair, deepening voice, increased muscle mass, bone density, libido; (3) Spermatogenesis — supports sperm production (alongside FSH and Sertoli cells). Testosterone also has anabolic effects on muscle and bone. Tortora & Grabowski.',
  'KRCHN',
  'Paper I',
  'Anatomy and Physiology',
  'Reproductive Physiology',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ============================================================
-- KRCHN Paper I — Surgical Nursing (30 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'According to ERAS guidelines, how long should a patient fast before elective surgery (nil by mouth)?',
  '12 hours for solids and 6 hours for clear fluids',
  '6 hours for solids and 2 hours for clear fluids',
  '8 hours for all food and fluids including water',
  '4 hours for solids and 1 hour for all fluids',
  'B',
  'Enhanced Recovery After Surgery (ERAS) guidelines recommend: 6 hours fasting from solids and 2 hours from clear fluids (water, clear fruit juice without pulp, tea/coffee without milk) before elective surgery. Prolonged fasting causes dehydration, patient discomfort, and insulin resistance without additional safety benefit. The patient should be encouraged to drink clear fluids up to 2 hours preoperatively. Kenya MOH Surgical Protocols; ERAS Society Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Preoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Who is responsible for obtaining informed consent for a surgical procedure, and what is the nurse''s role?',
  'The nurse obtains consent and the surgeon witnesses it',
  'The surgeon (or operating doctor) is responsible for obtaining informed consent; the nurse''s role is to verify that consent has been obtained and documented, and to answer questions within their scope',
  'Any healthcare worker can obtain surgical consent',
  'Consent is obtained by the anaesthetist before induction only',
  'B',
  'Informed surgical consent must be obtained by the clinician performing the procedure — the surgeon — who has the knowledge to explain the procedure, risks, benefits, and alternatives. The nurse''s role: verify the signed consent form is present and complete before surgery; check the patient understands and is not withdrawn consent; answer questions within scope; escalate any concerns. Performing a procedure without valid consent constitutes assault. NCK Scope of Practice; Kenya Medical Practice Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Preoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the recommended method for preoperative skin preparation to reduce surgical site infection?',
  'Shaving the surgical site the night before with a razor blade',
  'Chlorhexidine 4% antiseptic shower and clipping (not shaving) hair at the surgical site on the day of surgery',
  'Applying povidone iodine cream 24 hours before surgery',
  'Washing the surgical site with soap and water only',
  'B',
  'Preoperative SSI prevention: (1) Chlorhexidine 4% antiseptic shower (whole body) the evening before and morning of surgery reduces skin bacterial load; (2) Hair removal: clip with electric clippers at the surgical site on the day of surgery — do NOT shave (razor shaving causes micro-lacerations that become colonised, doubling SSI risk). Chlorhexidine-alcohol is applied to the surgical site immediately before incision in theatre. WHO SSI Prevention Guidelines 2016; Kenya MOH Surgical Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Preoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is preoperatively prepared and a nil by mouth (NBM) sign is posted above the bed. What is the nurse''s responsibility regarding this?',
  'Ensure the sign is posted and explain to the patient and family why they must not eat or drink',
  'Post the sign but allow the patient to drink water if they are very thirsty',
  'The sign is for documentation only; the patient may take oral medication with food',
  'Remove the sign once pre-medication is given',
  'A',
  'The nurse must: (1) post the NBM sign visibly above the bed; (2) explain to the patient and family the reason for fasting (aspiration risk under anaesthesia); (3) confirm the patient and family understand and agree to comply; (4) document NBM status in nursing notes; (5) ensure IV fluids are prescribed to prevent dehydration if fasting is prolonged; (6) report immediately if the patient has consumed anything. Allowing intake contrary to NBM instructions endangers patient safety. Kenya MOH Pre-operative Care Standards; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Preoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How often should vital signs be monitored during the first postoperative hour?',
  'Every 4 hours',
  'Once on return from theatre then hourly',
  'Every 15 minutes for the first hour',
  'Every 30 minutes throughout the first day',
  'C',
  'First postoperative hour monitoring: vital signs (pulse, blood pressure, respiratory rate, SpO2, temperature, level of consciousness, wound site, drain output) every 15 minutes. This is the critical period for detecting haemorrhage, airway compromise, respiratory depression, hypotension, and shock. Frequency reduces to every 30 minutes in the second hour, then hourly, then 4-hourly as the patient stabilises. Increase frequency if deterioration occurs. Kenya MOH Postoperative Monitoring Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'In which position should an unconscious post-operative patient be placed to protect the airway?',
  'Supine flat position with one pillow',
  'Trendelenburg (head-down) position',
  'Left lateral (recovery/semi-prone) position',
  'High Fowler''s sitting position',
  'C',
  'An unconscious post-operative patient should be placed in the recovery (left lateral) position: on their side with the upper knee flexed forward and lower arm extended behind. This position: prevents aspiration by allowing vomit and secretions to drain from the mouth, prevents the tongue from falling back to obstruct the airway, and maintains a patent airway. Monitor regularly until conscious with intact protective reflexes. Kenya MOH Anaesthetic Recovery Standards; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the four phases of wound healing in the correct order?',
  'Inflammatory, proliferative, remodelling, haemostasis',
  'Haemostasis (0–2 days), inflammatory (1–4 days), proliferative/granulation (4–21 days), remodelling/maturation (21 days – 2 years)',
  'Granulation, haemostasis, inflammatory, remodelling',
  'Remodelling, haemostasis, proliferative, inflammatory',
  'B',
  'Wound healing phases: (1) Haemostasis (0–2 days) — vasoconstriction, platelet aggregation, clot formation; (2) Inflammatory (1–4 days) — vasodilation, neutrophils and macrophages remove bacteria and debris (redness, warmth, swelling, pain); (3) Proliferative/granulation (4–21 days) — fibroblasts synthesise collagen, granulation tissue forms, epithelialisation; (4) Remodelling/maturation (21 days to 2 years) — collagen reorganisation, scar strengthens. Phases overlap. Brunner & Suddarth''s; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which characteristics indicate a normally healing clean surgical wound at day 7?',
  'Purulent discharge, fever, and increasing redness',
  'Approximated wound edges, minimal clear or serosanguineous discharge, no odour, and progressive healing',
  'Deep red bleeding, wound gaping, and copious drainage',
  'Black necrotic tissue, foul odour, and wound breakdown',
  'B',
  'Signs of normal wound healing at day 7 (clean, primary intention): wound edges are approximated (together); minimal clear or slightly blood-tinged (serosanguineous) discharge; no odour; surrounding skin is pale pink without spreading redness; sutures/staples intact; no excessive swelling or tenderness. Clean wounds should show significant healing progress by days 7–10. Sutures are typically removed at 7 days (face), 10 days (trunk), 14 days (lower limb). Kenya MOH Wound Care Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the classic signs of wound infection that a nurse should assess for?',
  'Pink edges, clear discharge, no pain, and closed wound',
  'Redness, warmth, swelling, purulent (pus) discharge, fever, and pain or delayed healing',
  'Dry wound, dark scab, and slight brown discolouration',
  'Blue bruising, haematoma, and wound gaping without infection',
  'B',
  'Signs of wound infection (Celsus cardinal signs + systemic): (1) Rubor — redness/erythema spreading from wound edges; (2) Calor — warmth of surrounding tissue; (3) Tumor — swelling/oedema; (4) Dolor — increasing pain; plus (5) Purulent discharge — green/yellow/foul-smelling pus; (6) Systemic fever; (7) Elevated WBC; (8) Delayed or regressing healing. Management: wound swab for C&S, wound cleaning, appropriate dressing, antibiotics as prescribed. Kenya MOH Wound Infection Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the difference between a closed drain (e.g. Jackson-Pratt, Redivac) and an open drain (e.g. Penrose)?',
  'Closed drains use passive gravity drainage; open drains use active suction',
  'Closed drains (Jackson-Pratt, Redivac) use active suction via a compressible bulb or vacuum; open drains (Penrose) allow passive drainage by gravity or capillary action',
  'Both types function identically; only the material differs',
  'Open drains are used for sterile cavities; closed drains for infected wounds',
  'B',
  'Surgical drain types: Closed (active suction) drains — Jackson-Pratt (JP), Redivac: attached to a compressible bulb or vacuum bottle creating gentle negative pressure that actively removes fluid; reduces retrograde infection risk. Open (passive) drains — Penrose: a flat latex tube that allows drainage by gravity and capillary action; higher infection risk. Drain output is measured and documented. Drains are removed when output is minimal and wound healing is confirmed. Kenya MOH Surgical Nursing Standards; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When caring for a patient with an underwater seal chest drain, what does gentle bubbling in the suction chamber indicate, and what does continuous bubbling in the water seal chamber indicate?',
  'Both indicate the system is blocked and the drain needs changing',
  'Gentle bubbling in suction chamber = normal functioning; continuous bubbling in water seal chamber = air leak in the system or from the lung',
  'Bubbling in both chambers simultaneously indicates the lung has re-expanded',
  'Bubbling in the water seal chamber only is normal and should be ignored',
  'B',
  'Chest drain assessment: (1) Suction chamber: gentle bubbling = normal (indicates appropriate suction); (2) Water seal chamber: fluctuation (swinging/tidalling) with respiration = normal; continuous vigorous bubbling = air leak (from the lung or a loose connection — must investigate); absence of fluctuation = lung re-expanded (positive sign) or tube kinked/blocked; (3) Drainage chamber: monitor volume and character of fluid. Never clamp a chest drain routinely. Kenya MOH Chest Drain Management; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Chest Tube Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient in a plaster cast develops pain worsened by passive movement of the digits, pallor, paraesthesia, paralysis, and absent pulse. What condition is this and what is the treatment?',
  'DVT — treat with anticoagulation',
  'Compartment syndrome — immediate fasciotomy is required after bivalving/removing the cast',
  'Wound infection — treat with antibiotics',
  'Allergic reaction to plaster — remove cast and apply bandage',
  'B',
  'Compartment syndrome occurs when pressure within a closed fascial compartment rises, compressing blood vessels and nerves. The 5 Ps: Pain (disproportionate, worsened by passive stretch), Pallor, Paraesthesia (tingling/numbness), Paralysis, Pulselessness. It is a surgical emergency: immediately bivalve or remove the cast, elevate limb to heart level (not above), notify surgeon urgently, prepare for fasciotomy. Delay leads to irreversible muscle and nerve necrosis (Volkmann''s contracture). Kenya MOH Orthopaedic Emergency Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Orthopaedic Nursing',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient has a colostomy. What does a healthy stoma look like, and what appearance is an emergency?',
  'Healthy stoma: pale white and dry; Emergency: pink/red colour',
  'Healthy stoma: pink or red and moist; Emergency: dark purple or black discolouration (ischaemia)',
  'Healthy stoma: grey and slightly dry; Emergency: bright red bleeding',
  'Healthy stoma: blue-tinged; Emergency: yellow discharge',
  'B',
  'Stoma assessment: Healthy stoma should be pink or red (well-perfused) and moist, with mild oedema normal in the first week post-surgery. The stoma should protrude slightly above skin level. Emergency signs: dark purple or black discolouration = ischaemia/necrosis — requires immediate surgical review; significant bleeding; excessive retraction; complete prolapse. Colostomy output: formed faecal stool (descending/sigmoid colostomy). Ileostomy output: liquid to semi-liquid. Skin barrier and bag changes are taught to patient and family. Brunner & Suddarth''s; Kenya MOH Stoma Care Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Stoma Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What postoperative advice should a nurse give to a patient following hernia repair?',
  'Resume heavy lifting and strenuous exercise within one week',
  'Avoid heavy lifting for 4–6 weeks, wear support or truss if advised, monitor for signs of recurrence, and attend follow-up',
  'Resume all normal activities immediately including sport',
  'Wear a tight abdominal binder permanently to prevent recurrence',
  'B',
  'Post-hernia repair (herniorrhaphy) patient education: (1) Avoid heavy lifting (>5 kg) for at least 4–6 weeks to allow fascial healing and reduce recurrence risk; (2) Wear a scrotal support for inguinal hernia repair if advised; (3) Light activities and walking encouraged early to prevent DVT; (4) Driving restrictions (usually 2 weeks); (5) Monitor for signs of recurrence (bulge, discomfort) or complications (infection, haematoma); (6) Attend follow-up appointment. Kenya MOH Post-operative Patient Education Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Silver sulfadiazine cream is applied to partial thickness burns. How often is the dressing changed?',
  'Once a week only',
  'Every 12 hours regardless of wound condition',
  'Every 1–2 days, with hydrotherapy used for cleansing before reapplication',
  'Once only at initial presentation; leave undisturbed thereafter',
  'C',
  'Silver sulfadiazine (SSD) 1% cream is applied to partial thickness burns and covered with a non-stick dressing. Dressings are changed every 1–2 days or when soiled, painful, or leaking. Hydrotherapy (showering/bathing the wound in warm water) assists gentle removal of old cream and debris, promotes cleansing, and improves patient comfort during dressing changes. SSD has broad antimicrobial action (gram-positive, gram-negative, Candida). Kenya MOH Burns Management Guidelines; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Burns Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When should pressure garments for scar management after burns be initiated, and what other methods support hypertrophic scar management?',
  'Begin pressure garments immediately at the time of burn injury',
  'Begin pressure garments 2–3 weeks after wound closure (when wound is healed); silicone gel sheets and regular massage also support scar management',
  'Pressure garments are only used for keloid scars, not burn scars',
  'No management is required for hypertrophic scars as they resolve spontaneously within 1 month',
  'B',
  'Hypertrophic scar management after burns: (1) Custom-fitted pressure garments applied once wound has healed (approximately 2–3 weeks post-closure) — worn 23 hours/day for up to 2 years; pressure reduces collagen overproduction; (2) Silicone gel sheets or silicone gel applied daily; (3) Scar massage with emollient; (4) Physiotherapy for scar contracture. Some hypertrophic scars improve spontaneously over 1–2 years; thick raised keloid scars may require intralesional corticosteroid injection. Kenya MOH Burns Rehabilitation Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Burns Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the correct technique for performing a sterile wound dressing change?',
  'Clean from the wound edge outward toward the cleanest area',
  'Clean from the wound centre outward (least to most contaminated), using sterile forceps or sterile gloves throughout',
  'Clean with circular motions starting from outside the wound toward the centre',
  'Use the same piece of gauze for multiple passes over the wound to save supplies',
  'B',
  'Sterile dressing technique: (1) Use strict aseptic technique — sterile forceps or sterile gloves; (2) Clean from the wound centre outward (least to most contaminated, avoiding dragging bacteria back into the wound); (3) Each swab is used once only and discarded; (4) Irrigate deep wounds with sterile saline; (5) Apply appropriate sterile dressing; (6) Document wound assessment (size, depth, colour, exudate, odour, surrounding skin). Cleaning from the edges inward introduces contamination into the wound. Kenya MOH IPC Standards; Kozier & Erb.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which nursing interventions help manage pre-operative anxiety?',
  'Tell the patient not to worry and avoid discussing the surgery to prevent more anxiety',
  'Acknowledge the patient''s concerns, explain the procedure in simple terms, encourage questions, teach deep breathing, and refer to chaplain or spiritual support if requested',
  'Sedate the patient immediately if they express anxiety about surgery',
  'Inform the patient that anxiety is abnormal and they should control it',
  'B',
  'Pre-operative anxiety management: (1) Acknowledge and validate feelings — therapeutic communication; (2) Provide age-appropriate, honest information about what to expect (reduces fear of the unknown); (3) Encourage questions and answer honestly within scope; (4) Teach relaxation techniques: deep breathing, progressive muscle relaxation; (5) Ensure privacy and dignity; (6) Contact chaplain/spiritual leader if patient requests; (7) Involve family with patient''s consent; (8) Pre-medication as prescribed. Anxiety significantly affects surgical outcomes. Kozier & Erb; Kenya MOH Patient-Centred Care Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Preoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Using the WHO analgesic ladder, how should postoperative pain be managed, and when should analgesia effectiveness be reassessed?',
  'Start with opioids for all postoperative patients regardless of pain level; reassess after 24 hours',
  'Assess pain score before giving analgesia; administer according to WHO ladder (non-opioid → weak opioid → strong opioid with adjuvants); reassess within 30–60 minutes of administration',
  'Only administer analgesia when the patient requests it and reassess after 4 hours',
  'Avoid opioids entirely post-operatively due to addiction risk',
  'B',
  'WHO analgesic ladder: Step 1 — non-opioids (paracetamol, NSAIDs) for mild pain; Step 2 — weak opioids (codeine, tramadol) for moderate pain; Step 3 — strong opioids (morphine) for severe pain. "By mouth, by the clock, by the ladder." Nursing: (1) Assess pain score before analgesia; (2) Administer as prescribed; (3) Reassess effectiveness within 30–60 minutes (or 15–30 minutes for IV); (4) Document response; (5) Report inadequate control. Pain is the fifth vital sign. Kenya MOH Acute Pain Guidelines; WHO Analgesic Ladder.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient cannot void 8 hours after surgery. The bladder scan shows 450 mL of urine. What is the cause and appropriate nursing action?',
  'Normal — inform patient to wait longer',
  'Postoperative urinary retention caused by anaesthetics and opioids; catheterise the patient as ordered if bladder volume >400 mL and patient cannot void',
  'Oliguria — increase IV fluids immediately',
  'Kidney failure — restrict fluids and notify renal team',
  'B',
  'Postoperative urinary retention is common — caused by anaesthetic agents, opioid analgesics (reduce detrusor muscle tone), urethral spasm, pain, anxiety, and unfamiliar voiding positions. Management: ensure privacy, sitting position, warm compress to perineum, running water sound. If patient cannot void after these measures AND bladder volume >400 mL (or >600 mL in guidelines): perform in/out catheterisation or insert urethral catheter as ordered. Bladder scanning confirms retention non-invasively. Document and notify physician. Kenya MOH Post-operative Bladder Management.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient''s surgical wound edges separate on postoperative day 4. What is this called and what is the immediate nursing action?',
  'Wound evisceration — cover organs with dry sterile gauze and call the surgeon',
  'Wound dehiscence — cover the wound with a sterile saline-soaked dressing, keep the patient supine, and notify the surgeon immediately',
  'Normal wound healing — apply adhesive strips only',
  'Wound infection — take a swab and start antibiotics',
  'B',
  'Wound dehiscence (partial or complete separation of wound edges without organ protrusion) nursing management: (1) Keep patient supine and calm; (2) Cover wound with sterile saline-moistened dressing to keep tissues moist and clean; (3) Notify surgeon immediately; (4) Prepare for possible surgical re-closure; (5) Do NOT leave wound exposed; (6) Monitor vital signs. Dehiscence is distinguished from evisceration (abdominal organs protrude) — both are emergencies. Common causes: infection, poor nutrition, obesity, early removal of sutures, excessive straining. Kenya MOH Wound Care Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient''s abdominal wound eviscerates — intestinal loops protrude through the wound. What is the priority nursing action?',
  'Gently push the organs back into the abdominal cavity and apply a pressure dressing',
  'Cover exposed organs with a sterile saline-moistened dressing, do NOT replace organs, keep patient supine with knees slightly flexed, and call the surgeon immediately',
  'Apply a tight dry dressing and reassure the patient',
  'Irrigate the protruding bowel with povidone iodine solution',
  'B',
  'Wound evisceration (abdominal contents protruding) is a surgical emergency: (1) Do NOT attempt to push organs back (risk of contamination, perforation, vascular injury); (2) Cover protruding organs immediately with sterile normal saline-moistened gauze to prevent drying and contamination; (3) Position patient supine with knees slightly flexed (reduces abdominal tension); (4) Call surgeon IMMEDIATELY; (5) Establish IV access, NPO, consent for emergency surgery; (6) Reassure patient, monitor vital signs. Delay increases mortality. Kenya MOH Surgical Emergency Standards; Brunner & Suddarth''s.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Wound Management',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient develops postoperative nausea and vomiting (PONV). What is the priority nursing action?',
  'Administer an antiemetic immediately and encourage the patient to eat to settle the stomach',
  'Position the patient on their side to prevent aspiration, administer IV antiemetic (e.g. ondansetron) as prescribed, withhold oral intake until nausea resolves, and monitor for aspiration',
  'Encourage deep breathing and ignore the vomiting',
  'Increase IV fluid rate to dilute the nausea',
  'B',
  'PONV management: (1) Position on side (recovery position) immediately — prevents aspiration of vomit; (2) Administer antiemetic as prescribed (ondansetron 4 mg IV, metoclopramide 10 mg IV, or cyclizine 50 mg IV — physician orders required); (3) Withhold oral intake until nausea resolves; (4) Provide basin and mouth care; (5) Monitor for aspiration signs (coughing, SpO2 drop, respiratory distress); (6) IV fluids if dehydrated; (7) Reassess pain (pain worsens nausea). Document and report if persistent. Kenya MOH Post-operative Care Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'After total thyroidectomy, what equipment must be kept at the patient''s bedside, and what signs of hypocalcaemia should the nurse monitor for?',
  'Defibrillator; monitor for hyperglycaemia and polyuria',
  'Tracheostomy tray; monitor for Chvostek''s sign and Trousseau''s sign (hypocalcaemia), and inspect for neck haematoma and hoarse voice',
  'Emergency blood transfusion equipment; monitor for haemolytic reaction',
  'Blood glucose monitoring equipment; monitor for hypoglycaemia',
  'B',
  'Post-thyroidectomy nursing: (1) Tracheostomy tray at bedside — laryngeal oedema or haematoma may obstruct airway requiring emergency tracheostomy; (2) Hypocalcaemia (parathyroid gland injury during surgery) — Chvostek''s sign (tap facial nerve → facial twitch), Trousseau''s sign (carpal spasm with BP cuff inflated), tingling, muscle cramps → IV calcium gluconate; (3) Recurrent laryngeal nerve injury — hoarse voice, stridor; (4) Neck haematoma — swelling, dyspnoea → emergency; (5) Monitor calcium, PTH, vitals. Kenya MOH Post-operative Thyroid Surgery Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Perioperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Why is early mobilisation (sitting out of bed on day 1) important postoperatively?',
  'It increases postoperative pain and should be avoided',
  'Early mobilisation reduces the risk of DVT, pulmonary embolism, pneumonia, and constipation, and promotes recovery',
  'Early mobilisation is only recommended for patients under 40 years',
  'Mobilisation has no effect on surgical outcomes',
  'B',
  'Early postoperative mobilisation benefits: (1) DVT/PE prevention — ambulation activates the calf muscle pump, improving venous return; (2) Pneumonia prevention — deep breathing, productive coughing with ambulation clears secretions; (3) Reduces ileus — promotes gut motility; (4) Reduces pressure ulcer risk; (5) Improves mental wellbeing and recovery. ERAS protocols recommend: sitting up in bed day 1, sitting on chair day 1, walking day 1–2 depending on procedure. Assess pain, blood pressure, and wound before mobilising. Kenya MOH Post-operative Care; ERAS Society.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Postoperative Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the key elements of the Surgical Site Infection (SSI) prevention bundle?',
  'Prophylactic antibiotics at any time before surgery, shaving the site, and standard hand hygiene',
  'Appropriate antimicrobial prophylaxis within 60 minutes of incision, normothermia, normoglycaemia, clipping not shaving, and chlorhexidine skin antisepsis',
  'Antibiotics given 24 hours before surgery, Trendelenburg position, and povidone iodine only',
  'Universal full-body sterile draping, double gloving only, and prophylactic antibiotics for 7 days post-surgery',
  'B',
  'SSI prevention bundle (WHO 2016; Kenya MOH): (1) Appropriate antimicrobial prophylaxis administered within 60 minutes before incision (30 min for vancomycin/fluoroquinolones); (2) Maintain intraoperative normothermia (forced-air warming); (3) Perioperative normoglycaemia (<11 mmol/L); (4) Hair removal by clipping, not shaving; (5) Chlorhexidine-alcohol skin antisepsis in theatre; (6) Sterile technique; (7) Appropriate surgical technique (haemostasis, tissue handling). Bundle compliance reduces SSI rates by up to 70%.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Surgical Site Infection Prevention',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'During intraoperative patient positioning, what must the nurse ensure to prevent complications?',
  'Position can be chosen freely; complications are the surgeon''s responsibility',
  'Ensure adequate padding over bony prominences, secure limbs without excessive tension, prevent nerve stretch, document the position and duration, and maintain alignment',
  'Full lithotomy position is safe for all surgeries without padding',
  'Arm boards are not required if surgery is less than 2 hours',
  'B',
  'Intraoperative positioning complications: pressure injuries, nerve injuries (brachial plexus, ulnar, peroneal), compartment syndrome, vascular compromise, and respiratory restriction. Prevention: (1) Gel pads/foam padding over all bony prominences; (2) Arms on padded arm boards at <90° to prevent brachial plexus injury; (3) Secure restraints without compression; (4) Maintain body alignment; (5) Document position, supports used, and start time; (6) Reposition gently and reassess frequently for prolonged procedures. Kenya MOH Perioperative Nursing Standards; AORN Guidelines.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Intraoperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient is to receive spinal anaesthesia. What are the key nursing assessments and interventions in the postoperative period?',
  'Assess hearing and vision; no specific monitoring required beyond standard observations',
  'Assess return of sensation (level) from feet upward, monitor blood pressure (hypotension risk), position flat if post-dural puncture headache develops, encourage hydration, and assess bladder function',
  'Keep patient in sitting position for 24 hours to prevent headache',
  'Restrict all fluids for 12 hours after spinal anaesthesia',
  'B',
  'Spinal anaesthesia (intrathecal): needle inserted in lumbar region (L3–L4 or L4–L5), local anaesthetic blocks spinal nerves. Post-procedure nursing: (1) Monitor blood pressure frequently — sympathetic block causes vasodilation and hypotension; (2) Assess return of sensation from feet upward — document dermatome level; (3) Post-dural puncture headache (PDPH): lying flat helps (reduces CSF pressure); (4) Hydration; (5) Bladder assessment (urinary retention common); (6) Monitor for infection and haematoma at injection site. Kenya MOH Anaesthetic Recovery Standards.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Perioperative Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the three WHO Surgical Safety Checklist pause points, and what is verified at the Time Out?',
  'Sign In (before incision), Time Out (before anaesthesia), Sign Out (after surgery)',
  'Sign In (before anaesthesia induction), Time Out (before skin incision — team verbally confirms patient identity, site, procedure, antibiotic given, and known allergies), Sign Out (before patient leaves OR — instrument/sponge count, specimen labelling)',
  'Sign In (at ward), Time Out (in recovery room), Sign Out (at discharge)',
  'There are only two pause points: before anaesthesia and after surgery',
  'B',
  'WHO Surgical Safety Checklist (2009) — three pause points: (1) Sign In (before anaesthesia): confirm patient identity, site, procedure, consent, allergy, anaesthesia machine check, pulse oximeter; (2) Time Out (before skin incision): entire team pauses — verbally confirm patient name, procedure, surgical site, antibiotic given within 60 minutes, imaging displayed; (3) Sign Out (before patient leaves OR): confirm procedure performed, instrument/sponge/needle count correct, specimens labelled, equipment problems noted. Kenya MOH Surgical Safety Standards; WHO Safe Surgery 2009.',
  'KRCHN',
  'Paper I',
  'Surgical Nursing',
  'Perioperative Safety',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ============================================================
-- KRCHN Paper I — Midwifery (25 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the three stages of labour and their definitions?',
  'Stage 1: delivery of baby; Stage 2: delivery of placenta; Stage 3: postnatal recovery',
  'Stage 1: onset of labour to full cervical dilation (10 cm), with latent (0–4 cm) and active (4–10 cm) phases; Stage 2: full dilation to delivery of baby; Stage 3: delivery of placenta and membranes',
  'Stage 1: latent phase only (0–6 cm); Stage 2: active phase (6–10 cm); Stage 3: delivery of baby',
  'Stage 1: first trimester; Stage 2: second trimester; Stage 3: third trimester',
  'B',
  'Stages of labour: First stage — onset of regular contractions to full cervical dilation (10 cm). Subdivided: latent phase (0–4 cm, slow dilation) and active phase (4–10 cm, faster dilation ~1 cm/hour). Second stage — full dilation to delivery of baby; pushing and bearing down. Third stage — delivery of baby to delivery of placenta and membranes. Normal third stage: 15–30 minutes with AMTSL. Myles Midwifery; Kenya MOH EmONC Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Labour and Delivery',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What does Active Management of the Third Stage of Labour (AMTSL) involve?',
  'Waiting for spontaneous placental delivery without any intervention',
  'Administering oxytocin 10 IU IM within 1 minute of baby''s birth, applying controlled cord traction, and performing uterine massage after placental delivery',
  'Administering ergometrine IV at crowning of the baby''s head',
  'Clamping the cord immediately at birth and pulling the placenta out manually',
  'B',
  'AMTSL (Active Management of Third Stage of Labour) reduces the risk of PPH: (1) Oxytocin 10 IU IM (preferred; or IV infusion) within 1 minute of baby''s birth (before or immediately after cord clamping) — uterotonics are the most important component; (2) Controlled cord traction (CCT) — gentle downward traction on cord while supporting the uterus; (3) Uterine massage after placental delivery (some guidelines now recommend only if uterus is soft/atonic). AMTSL reduces PPH by 60%. Kenya MOH BEmONC/CEmONC Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Labour and Delivery',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How is postpartum haemorrhage (PPH) defined, and what are the four Ts of PPH causes?',
  'Blood loss >200 mL after any delivery; causes: Temperature, Tension, Tissue, Trauma',
  'Blood loss >500 mL after vaginal birth or >1000 mL after caesarean section within 24 hours (primary PPH); causes: Tone (uterine atony — 80%), Trauma, Tissue (retained placenta), Thrombin (coagulopathy)',
  'Blood loss >300 mL after vaginal birth; causes: Toxaemia, Trauma, Tissue, Tone',
  'Blood loss >1 litre after any delivery; primary PPH occurs 24 hours to 12 weeks',
  'B',
  'PPH definitions: Primary PPH — blood loss >500 mL within 24 hours of vaginal birth; >1000 mL within 24 hours of caesarean birth. Secondary PPH — excessive bleeding from 24 hours to 12 weeks postpartum. The 4 Ts: (1) Tone — uterine atony (most common, 80%); (2) Trauma — lacerations, uterine rupture; (3) Tissue — retained placenta/membranes; (4) Thrombin — coagulopathy (DIC). Management of atony: rub up uterus, IV oxytocin 40 IU in 500 mL, bimanual compression, call for help. Kenya MOH BEmONC/EmONC Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A cord prolapse is diagnosed. What is the immediate priority position for the patient?',
  'Supine flat position',
  'Knee-chest position (or Sims/left lateral with hips elevated) to relieve pressure on the cord, while calling for emergency caesarean section',
  'Standing upright to use gravity to deliver the baby',
  'Trendelenburg position with cord manually replaced',
  'B',
  'Cord prolapse (umbilical cord descends ahead of the presenting part after ROM, compressing the cord) is a obstetric emergency: (1) Immediately adopt knee-chest position (or Sims/left lateral with pillow under hips) — gravity and position relieve cord compression; (2) Call for emergency CS; (3) Do NOT push cord back (risk of vasospasm); (4) Keep cord moist with warm saline; (5) If facilities allow and cord is pulsating: fill bladder with 500 mL saline to elevate presenting part; (6) Monitor FHR. Kenya MOH EmONC Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Shoulder dystocia is recognised when the baby''s head delivers but the shoulders do not deliver with normal traction. What is the first-line manoeuvre?',
  'Apply fundal pressure immediately',
  'McRoberts manoeuvre (hyperflexion of maternal thighs against the abdomen) with suprapubic pressure as the first-line intervention; use the HELPERR mnemonic',
  'Apply strong traction on the baby''s head to dislodge the shoulder',
  'Immediately perform an emergency caesarean section',
  'B',
  'Shoulder dystocia management (HELPERR mnemonic): H — call for Help; E — Evaluate for Episiotomy; L — Legs (McRoberts): hyperflexion of thighs flattens lumbar lordosis, increases relative AP diameter of pelvis; P — Suprapubic Pressure (not fundal — worsens impaction); E — Enter (internal rotational manoeuvres: Rubin II, Woods screw); R — Remove posterior arm; R — Roll (Gaskin all-fours). McRoberts + suprapubic pressure resolves ~50% of cases. Kenya MOH EmONC; RCOG Shoulder Dystocia Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A woman with severe pre-eclampsia has a seizure (eclampsia). What is the first drug to administer and what is the route?',
  'Diazepam 10 mg IV followed by phenytoin',
  'Magnesium sulphate (MgSO4) 4 g IV loading dose slowly over 15–20 minutes, then 1 g/hour IV maintenance infusion',
  'Labetalol 20 mg IV bolus for seizure control',
  'Calcium gluconate 1 g IV for seizure prevention',
  'B',
  'Eclampsia management: MgSO4 is the anticonvulsant of choice for eclampsia and severe pre-eclampsia seizure prevention: Loading dose 4 g IV (50% solution — dilute in 100 mL saline or 20% solution) over 15–20 minutes; Maintenance 1 g/hour IV. MgSO4 prevents recurrence by blocking NMDA receptors. Also: airway protection, left lateral position, oxygen, antihypertensives, delivery after stabilisation. Monitor: patellar reflexes, RR, urine output. Antidote: calcium gluconate 1 g IV. Kenya MOH BEmONC; WHO Eclampsia Protocol.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the key monitoring parameters during magnesium sulphate infusion for eclampsia, and what is the antidote for toxicity?',
  'Monitor blood glucose hourly; antidote is glucagon',
  'Monitor patellar (knee) reflexes (loss = first sign of toxicity), respiratory rate (must remain >16/min), and urine output (must be >25 mL/hour); antidote is calcium gluconate 1 g IV',
  'Monitor blood pressure only; antidote is naloxone',
  'Monitor oxygen saturation and heart rate; antidote is atropine',
  'B',
  'MgSO4 toxicity monitoring: (1) Patellar reflexes — loss of deep tendon reflexes is the FIRST sign of toxicity (Mg level ~5–7 mEq/L); (2) Respiratory rate — must be ≥16 breaths/min (respiratory depression at higher Mg levels); (3) Urine output — must be ≥25–30 mL/hour (Mg is renally excreted); (4) Level of consciousness. If toxicity signs: STOP MgSO4 infusion and give antidote — calcium gluconate 1 g (10 mL of 10% solution) IV slowly over 3 minutes. Kenya MOH BEmONC Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal progression of lochia after delivery?',
  'Lochia alba (white) for 1–2 days → lochia serosa (pink/brown) → lochia rubra (bright red) lasting 6 weeks',
  'Lochia rubra (red, blood-stained, days 1–4) → lochia serosa (pink/brown, days 4–10) → lochia alba (white/yellowish, day 10 to 6 weeks)',
  'Lochia rubra persists for 6 weeks normally; no colour change expected',
  'Lochia progresses from white (day 1) to brown (day 2) to red (weeks 2–6)',
  'B',
  'Normal lochia progression: Lochia rubra (days 1–4): bright red, blood-stained, contains decidua and blood; Lochia serosa (days 4–10): pinkish-brown, serous fluid, old blood; Lochia alba (day 10 to 4–6 weeks): white/yellowish, mucoid, leucocytes. Abnormal: return to bright red after becoming serosa (possible PPH), offensive odour (infection), heavy soaking (primary or secondary PPH). Document amount (number of pads saturated). Myles Midwifery; Kenya MOH Postnatal Care Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Postnatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How quickly does the uterus involute after delivery, and where should the fundus be at day 1 and day 10?',
  'Uterus stays at the umbilicus level for 10 days then involutes in 1 month',
  'Uterus is at umbilical level immediately after delivery; descends ~1 cm/day; non-palpable abdominally by day 10–14',
  'Uterus involutes to pre-pregnancy size within 3 days',
  'Involution: fundus at symphysis pubis immediately post-delivery, rises daily',
  'B',
  'Uterine involution: Immediately post-delivery — fundus at level of umbilicus (approximately 12 cm above symphysis pubis). Descends approximately 1 cm per day. By day 10–14: uterus non-palpable abdominally. Returns to pre-pregnancy size (~50g from ~1 kg) by 6 weeks. Assess fundal height and consistency (should be firm — soft/boggy = atony risk). Factors delaying involution: retained products, infection, grand multiparity, full bladder. Myles Midwifery; Kenya MOH Postnatal Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Postnatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A woman develops fever >38°C with offensive lochia and uterine tenderness on day 3 postpartum. What condition is this and what is the treatment?',
  'Normal postpartum fever from breast engorgement; no treatment needed',
  'Puerperal sepsis (postpartum endometritis); treat with broad-spectrum IV antibiotics (e.g. ampicillin + gentamicin + metronidazole)',
  'Urinary tract infection; treat with oral trimethoprim only',
  'Deep vein thrombosis; treat with anticoagulation',
  'B',
  'Puerperal sepsis: fever ≥38°C occurring on days 1–10 postpartum (excluding the first 24 hours), associated with uterine tenderness, offensive lochia, and lower abdominal pain suggests endometritis (uterine infection). Common organisms: Group A Streptococcus, E. coli, anaerobes. Treatment: IV broad-spectrum antibiotics (ampicillin/amoxicillin + gentamicin + metronidazole), rehydration, analgesia. Sepsis is a leading cause of maternal mortality. Kenya MOH EmONC/Maternal Sepsis Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Postnatal Complications',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What constitutes a good breastfeeding latch, and how often should a healthy newborn feed?',
  'Shallow latch with nipple only in mouth; feed every 6–8 hours on schedule',
  'Deep latch with wide open mouth, lower lip flanged outward, chin touching breast, and more areola visible above the nipple; feed on demand every 2–3 hours (8–12 times per 24 hours)',
  'Baby''s mouth covers nipple only; feed every 4 hours exactly',
  'Latch technique is not important if the baby is gaining weight',
  'B',
  'Correct breastfeeding latch (UNICEF Baby-Friendly Initiative): (1) Wide open mouth; (2) Lower lip flanged (turned out); (3) Chin touching breast; (4) More areola visible above than below nipple (asymmetric latch); (5) Baby''s nose not pressed tightly to breast; (6) Comfortable for mother. Feed on demand — 8–12 times per 24 hours in newborns (every 2–3 hours). Signs of effective feeding: audible swallowing, content baby after feed, adequate wet nappies (6+/day), appropriate weight gain. Kenya MOH IYCF Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Postnatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Vitamin K is given to newborns to prevent which condition, and what is the recommended dose and route?',
  'Vitamin K 0.5 mg orally prevents neonatal jaundice',
  'Vitamin K 1 mg IM (phytomenadione) within 1 hour of birth prevents haemorrhagic disease of the newborn (HDN); oral Vitamin K 2 mg at birth, 1 week, and 1 month is an alternative',
  'Vitamin K 2 mg IV is given to prevent bleeding in preterm neonates only',
  'Vitamin K is not recommended because it is produced sufficiently by gut bacteria at birth',
  'B',
  'Haemorrhagic Disease of the Newborn (HDN) — now called Vitamin K Deficiency Bleeding (VKDB) — occurs because Vitamin K (required for clotting factors II, VII, IX, X) does not cross the placenta well and gut bacteria are not yet established. Prevention: Vitamin K 1 mg IM (phytomenadione) within 1 hour of birth — single dose, highly effective. Oral alternative: 2 mg at birth, 1 week, and 1 month (lower efficacy, especially in exclusively breastfed infants). Kenya MOH Newborn Care Guidelines; WHO.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Newborn Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Why is tetracycline 1% eye ointment applied to both eyes of the newborn within 1 hour of birth?',
  'To improve visual acuity and prevent neonatal cataract',
  'To prevent neonatal ophthalmia (conjunctivitis) caused by gonococcal and chlamydial infection acquired during passage through an infected birth canal',
  'To lubricate the eyes and prevent corneal drying',
  'To treat existing neonatal jaundice',
  'B',
  'Neonatal tetracycline 1% eye ointment (ophthalmic prophylaxis): applied to both conjunctival sacs of all newborns within 1 hour of birth to prevent ophthalmia neonatorum (neonatal conjunctivitis). Gonococcal and chlamydial infections acquired during birth can cause severe purulent conjunctivitis → corneal ulceration → blindness if untreated. Other agents used include erythromycin 0.5% and silver nitrate 1% (now less common). Kenya MOH Newborn Care Package; WHO Prevention of Blindness Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Newborn Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When should the umbilical cord be clamped after birth, and why is delayed cord clamping recommended?',
  'Immediately at birth (within 10 seconds) to prevent neonatal jaundice',
  'At 1–3 minutes after birth (or after the cord stops pulsating) to increase neonatal iron stores, reduce anaemia risk, and improve iron status',
  'After 10 minutes to allow maximum blood transfer regardless of clinical condition',
  'Immediately at birth in all healthy newborns to prevent polycythaemia',
  'B',
  'Delayed cord clamping (DCC): WHO recommends clamping at 1–3 minutes (or after cord stops pulsating) for all healthy newborns (term and preterm). Benefits: transfers up to 80–100 mL of placental blood to neonate → increases neonatal iron stores by 50% → reduces iron-deficiency anaemia in infancy. Particularly important in preterm neonates (reduces IVH, RDS severity). Exception: delay is avoided if the baby needs immediate resuscitation. DCC does not increase maternal PPH risk when AMTSL is used. Kenya MOH Newborn Care Guidelines; WHO 2014.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Newborn Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What does the APGAR score assess, when is it recorded, and what does a score of 7–10 indicate?',
  'APGAR assesses gestational age at birth; score of 7–10 = preterm',
  'APGAR assesses five components (Activity/muscle tone, Pulse, Grimace/reflex, Appearance/colour, Respiration) at 1 and 5 minutes; score 7–10 = normal, 4–6 = moderate depression, 0–3 = severe depression',
  'APGAR assesses feeding ability; score of 7–10 = can breastfeed immediately',
  'APGAR assesses maternal recovery; recorded at 1 hour postpartum',
  'B',
  'APGAR score (Virginia Apgar, 1953): assessed at 1 minute and 5 minutes after birth. Five components each scored 0, 1, or 2 (total 0–10): A — Activity (muscle tone); P — Pulse (heart rate); G — Grimace (reflex irritability); A — Appearance (skin colour); R — Respiration (effort, rate). Interpretation: 7–10 = reassuring (normal); 4–6 = moderate depression (need stimulation and possibly oxygen); 0–3 = severe depression (immediate resuscitation). If score <7 at 5 min, reassess every 5 min up to 20 min. Kenya MOH Newborn Care Package.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Newborn Assessment',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A newborn is not breathing after birth. After drying and stimulating, there is still no breathing. What is the next action according to HBB (Helping Babies Breathe)?',
  'Administer adrenaline IM immediately',
  'Begin positive pressure ventilation (PPV) with a bag-mask device at 40 breaths per minute',
  'Wait for 2 minutes more before intervening',
  'Perform chest compressions immediately',
  'B',
  'Helping Babies Breathe (HBB): After the Golden Minute: (1) Dry, stimulate, and position; (2) Assess breathing. If not breathing → begin PPV with bag-mask at 40 breaths/minute with room air (or oxygen if available) for 60 seconds; (3) If still no response → check ventilation technique, consider suction; (4) If no heart rate → chest compressions (3:1 ratio with PPV). PPV is the single most critical resuscitation intervention. Adrenaline is only if no response to PPV + compressions. Kenya MOH HBB Protocol; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Neonatal Resuscitation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What antiretroviral prophylaxis is given to an HIV-exposed infant under Kenya''s PMTCT Option B+ policy?',
  'TLD (Tenofovir + Lamivudine + Dolutegravir) from birth',
  'Nevirapine (NVP) syrup 0.6 mL once daily for 6 weeks from birth (extended if high risk)',
  'Co-trimoxazole prophylaxis only from birth',
  'No ARV for the infant if the mother''s viral load is undetectable',
  'B',
  'PMTCT Option B+ Kenya (NASCOP 2022): Mother receives lifelong TLD. HIV-exposed infant: Nevirapine (NVP) 0.6 mL oral syrup once daily for 6 weeks if mother is on effective ART with suppressed viral load. Extended 12-week regimen (NVP + AZT) for high-risk infants (maternal VL >1000 copies/mL, no ART, or started late). First dose within 6–12 hours of birth. DNA PCR HIV testing at 6 weeks. All HIV-exposed infants also receive co-trimoxazole from 6 weeks. Kenya MOH NASCOP PMTCT Guidelines 2022.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'PMTCT',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When is magnesium sulphate indicated for severe pre-eclampsia, and what is the prophylactic loading dose?',
  'MgSO4 is only used after eclampsia has occurred; not for prevention',
  'MgSO4 is indicated for severe pre-eclampsia (BP ≥160/110 mmHg or with symptoms); prophylactic loading dose 4 g IV over 15–20 minutes then 1 g/hour maintenance',
  'MgSO4 is used for mild pre-eclampsia; dose 2 g IV once only',
  'MgSO4 is given orally 500 mg every 4 hours for severe pre-eclampsia',
  'B',
  'Indications for MgSO4 in pre-eclampsia: severe pre-eclampsia (BP ≥160/110 mmHg on two occasions, or with severe features — headache, visual disturbances, epigastric pain, RUQ pain, eclampsia, thrombocytopenia, renal impairment). Prophylactic regimen: 4 g IV loading dose (50% MgSO4 diluted in saline) over 15–20 minutes, then 1 g/hour IV maintenance infusion. Continue for 24 hours after delivery or last seizure. Kenya MOH BEmONC Guidelines; WHO Recommendations for Prevention and Treatment of Pre-eclampsia and Eclampsia 2011.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Obstetric Emergencies',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What investigations are performed at the antenatal care booking visit in Kenya?',
  'Only blood group and HIV test at booking',
  'HIV test, blood group and Rh factor, haemoglobin/FBC, VDRL/RPR for syphilis, urinalysis (protein, glucose, nitrites), and malaria blood film (in endemic areas)',
  'Ultrasound, ECG, chest X-ray, and full biochemistry panel',
  'Blood pressure and weight only at first visit',
  'B',
  'ANC booking visit investigations (Kenya MOH ANC Package): (1) HIV test (and counselling — PMTCT entry); (2) Blood group and Rh factor (rhesus isoimmunisation prevention); (3) Haemoglobin/FBC (anaemia); (4) VDRL/RPR — syphilis screening (treat with benzathine penicillin if positive); (5) Urinalysis — protein (pre-eclampsia), glucose (gestational diabetes), infection; (6) Malaria blood film/RDT (endemic areas); additionally TB screening and blood pressure measurement. Kenya MOH ANC Clinical Practice Guidelines 2016.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Multiple pregnancy carries increased risks. What are the three main complications, and where should delivery occur?',
  'Reduced risk of preterm labour; home delivery is appropriate',
  'Increased risk of preterm labour, postpartum haemorrhage, and malpresentation; refer to hospital for delivery with skilled birth attendants and emergency obstetric care',
  'Multiple pregnancy has only slightly higher risk than singleton; standard ANC only',
  'The main risk is only gestational diabetes; hospital delivery is optional',
  'B',
  'Multiple pregnancy complications: (1) Preterm labour (most common — uterine overdistension); (2) PPH (increased after delivery — larger placental site, uterine atony); (3) Malpresentation (more common with multiple fetuses); also: pre-eclampsia, anaemia, placenta praevia, IUGR, cord accidents. Management: more frequent ANC visits, iron and folic acid supplementation, early referral to hospital for delivery in a facility with CEmONC capability. Kenya MOH High-Risk Pregnancy Management Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Antenatal Care',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal fetal presentation at term, and what is the most common abnormal presentation?',
  'Normal: transverse lie (95%); Abnormal: cephalic (head down)',
  'Normal: cephalic (head down, 95%); Abnormal presentations include breech (buttocks/feet presenting, ~3–4%) and transverse/oblique lie',
  'Normal: breech (80%); Abnormal: cephalic',
  'All presentations are equally normal at term',
  'B',
  'Fetal presentation at term (≥37 weeks): Cephalic (head down) — normal, ~95%. Abnormal: Breech (~3–4%) — frank breech (hips flexed, knees extended), complete breech, footling breech; Transverse/oblique lie (~0.5%); Face, brow presentation. Cephalic is required for safe vaginal delivery in most cases. Malpresentation is identified by abdominal palpation (Leopold''s manoeuvres) and confirmed by ultrasound. Refer for specialist assessment if malpresentation identified. Myles Midwifery; Kenya MOH ANC Guidelines.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Labour and Delivery',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the normal fetal heart rate range, and how is it assessed at antenatal visits?',
  '60–80 beats per minute; assessed with ECG at each visit',
  '110–160 beats per minute; assessed with a Pinard fetoscope or Doppler device at each ANC visit',
  '180–200 beats per minute; assessed only at term',
  '100–110 beats per minute; assessed with a blood pressure cuff',
  'B',
  'Normal fetal heart rate (FHR): 110–160 beats per minute. FHR is assessed at every ANC visit from 16–20 weeks gestation (when audible with Pinard fetoscope) using: Pinard stethoscope (metal cone applied to maternal abdomen), Doppler handheld device, or electronic fetal monitor (CTG — cardiotocography). Count for 1 minute. Bradycardia (<110 bpm) or tachycardia (>160 bpm) are non-reassuring and require further assessment. Kenya MOH ANC Clinical Practice Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the signs of established (active) labour that the midwife should assess for?',
  'Mild irregular contractions only, with no cervical change',
  'Regular painful contractions (3 or more in 10 minutes), cervical effacement and dilation ≥4 cm in active phase, bloody show, and possible rupture of membranes',
  'Backache and oedema only; contractions are not required for active labour',
  'Cervical dilation ≥2 cm with irregular contractions',
  'B',
  'Active labour signs: (1) Regular, increasingly painful contractions — 3 or more per 10 minutes, each lasting ≥45 seconds, in active phase; (2) Cervical effacement (thinning) and dilation ≥4 cm (active phase); (3) Bloody show — pink or blood-stained mucus plug discharge; (4) Possible rupture of membranes (spontaneous or artificial). The latent phase (0–4 cm) may have irregular contractions. Active labour requires skilled attendance. Progress is monitored on the partograph. Kenya MOH Labour Monitoring Guidelines; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Midwifery',
  'Labour and Delivery',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ============================================================
-- KRCHN Paper I — MCH Nursing (15 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How many ANC contacts does WHO recommend, and when should the first contact occur?',
  '4 focused ANC contacts; first at ≤20 weeks',
  '8 ANC contacts (2016 WHO recommendation updating the 4-visit model); first contact at ≤12 weeks of gestation',
  '2 ANC contacts; first at 24 weeks',
  '12 ANC contacts; first at ≤8 weeks',
  'B',
  'WHO 2016 ANC Recommendations changed from 4 focused ANC visits to a minimum of 8 ANC contacts, recognising that more frequent contact improves outcomes. Timing: contact 1 at ≤12 weeks; contacts 2–3 at 16–20 weeks; contact 4 at 26 weeks; contact 5 at 30 weeks; contact 6 at 34 weeks; contacts 7–8 at 36 and 40 weeks. "Contacts" (not just "visits") implies active assessment and intervention. Kenya MOH adopted this framework. WHO ANC Recommendations 2016; Kenya MOH ANC Guidelines.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which investigations are performed at the ANC booking visit?',
  'Blood pressure and weight only',
  'HIV test, blood group and Rh factor, haemoglobin/FBC, VDRL/RPR for syphilis, urinalysis, and malaria test (endemic areas)',
  'Ultrasound and ECG only at booking',
  'Random blood glucose and thyroid function only',
  'B',
  'ANC booking investigations (Kenya MOH): HIV test (entry into PMTCT); blood group and Rh factor; haemoglobin/FBC (anaemia screening); VDRL/RPR — syphilis (treat with benzathine penicillin 2.4 MU IM); urinalysis (protein, glucose, infection); malaria RDT or blood film (malaria-endemic areas); TB screening. Additionally, BP and weight/BMI are recorded. These investigations guide risk stratification and targeted interventions throughout pregnancy. Kenya MOH ANC Clinical Practice Guidelines 2016.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the tetanus toxoid (TT) immunisation schedule in pregnancy, and which dose provides protection for the current pregnancy?',
  'A single TT dose at any time during pregnancy provides lifetime protection',
  'TT1 at first ANC contact; TT2 at least 4 weeks later provides protection for the current pregnancy; TT3–TT5 given in subsequent pregnancies/years for lifelong protection',
  'TT is given only once in the first trimester and never repeated',
  'TT is only given to women who have never been vaccinated previously',
  'B',
  'Tetanus immunisation in pregnancy (Kenya MOH): TT1 at first ANC contact (≤12 weeks); TT2 at ≥4 weeks after TT1 — TT2 provides 3 years protection and protects the current pregnancy. Full schedule: TT3 at ≥6 months after TT2; TT4 at ≥1 year after TT3; TT5 at ≥1 year after TT4 — lifetime protection. Women with prior TT history are assessed and given remaining doses. Prevents neonatal tetanus (umbilical cord tetanus) and maternal tetanus. Kenya MOH Immunisation Programme; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What iron and folic acid supplementation is recommended for all pregnant women in Kenya?',
  '30 mg iron + 5 mg folic acid weekly from second trimester only',
  '60 mg elemental iron + 0.4 mg (400 micrograms) folic acid daily from first ANC contact throughout pregnancy and for 3 months postpartum',
  '200 mg iron + 5 mg folic acid monthly from booking',
  'Iron and folic acid supplementation is not required if the diet is adequate',
  'B',
  'Kenya MOH ANC supplementation: 60 mg elemental iron + 0.4 mg (400 micrograms) folic acid daily from the first ANC contact throughout pregnancy and for 3 months postpartum. Iron prevents iron-deficiency anaemia (the most common pregnancy complication globally); folic acid prevents neural tube defects (ideally started periconceptionally). If anaemia is confirmed: 120 mg elemental iron daily. WHO Antenatal Care Recommendations 2016; Kenya MOH ANC Clinical Practice Guidelines.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Long-Lasting Insecticidal Nets (LLINs) are provided to pregnant women during ANC in malaria-endemic areas. What is the instruction given?',
  'Use the net only during travel to areas with high mosquito density',
  'Sleep under the LLIN every night throughout pregnancy; it is free and protects against malaria',
  'Hang the LLIN in the bedroom during the day; it is not required at night',
  'LLINs are only for children under 5; pregnant women use IRS only',
  'B',
  'LLINs (Long-Lasting Insecticidal Nets) are provided free of charge to all pregnant women at ANC in malaria-endemic counties in Kenya (alongside IPTp-SP). Instructions: hang over the sleeping area and sleep under it every night — including pregnant women, children, and infants. LLINs contain synthetic pyrethroids that repel and kill mosquitoes. When combined with IPTp-SP, LLINs significantly reduce placental malaria, maternal anaemia, and low birth weight. Kenya MOH NMCP Malaria Prevention in Pregnancy Guidelines.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Malaria in Pregnancy',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Which signs in pregnancy require immediate referral to a higher level of care?',
  'Mild ankle oedema and occasional backache',
  'Severe headache, visual disturbances, abdominal pain, vaginal bleeding, reduced or absent fetal movements, severe oedema, leaking liquor (PROM), and high fever',
  'Morning sickness and mild fatigue in the first trimester',
  'Urinary frequency and mild constipation',
  'B',
  'Danger signs in pregnancy requiring immediate referral: (1) Severe/persistent headache (pre-eclampsia/eclampsia); (2) Visual disturbances — blurring, flashing lights (pre-eclampsia); (3) Severe abdominal pain (placental abruption, ectopic, appendicitis); (4) Vaginal bleeding (miscarriage, APH, placenta praevia); (5) Reduced/absent fetal movements (<10 movements in 2 hours after 28 weeks); (6) Facial/generalised oedema (pre-eclampsia); (7) Leaking liquor (PROM — infection risk); (8) High fever (malaria, sepsis). Kenya MOH ANC Danger Signs Card; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Antenatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'When are postnatal care visits scheduled according to Kenya MOH guidelines?',
  'Only at 6 weeks postpartum',
  'Within 24 hours of delivery, at day 3, days 7–14, and at 6 weeks postpartum',
  'At 2 weeks, 4 weeks, and 3 months postpartum',
  'Postnatal care is only needed if complications arise',
  'B',
  'Kenya MOH Postnatal Care Schedule: (1) Within 24 hours of delivery (most critical — highest risk period for maternal and neonatal death); (2) Day 3 (72 hours); (3) Days 7–14; (4) 6 weeks postpartum (comprehensive review). All four contacts are recommended — at least two for women delivering at home. For facility deliveries: complete first contact before discharge if <24 hours. Purpose: maternal assessment (bleeding, BP, infection), neonatal wellbeing (feeding, weight, jaundice), breastfeeding support, family planning. Kenya MOH Postnatal Care Guidelines 2016.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Postnatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What does postnatal care assessment include for both the mother and the newborn?',
  'Maternal weight only and newborn immunisations only',
  'Maternal: bleeding, uterine involution, blood pressure, temperature, wound, lochia; Neonatal: feeding, weight, jaundice, cord, temperature; plus breastfeeding support and family planning counselling',
  'Blood tests only for mother; growth measurement for baby',
  'Postnatal assessment is limited to checking the wound site only',
  'B',
  'Postnatal care content: Maternal assessment — vaginal bleeding (PPH), uterine involution (fundal height/consistency), BP and temperature, perineal/wound healing, lochia character, breastfeeding. Neonatal assessment — feeding (latch, frequency), weight (expected 7–10% weight loss then regain by day 10), jaundice (day/severity), cord condition (dry, no infection), temperature, breathing, skin colour. Counselling on: breastfeeding, newborn danger signs, maternal mental health, family planning options. Kenya MOH Postnatal Care Guidelines 2016.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Postnatal Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What services are provided at a child health (under-5) clinic?',
  'Surgery and inpatient admission only',
  'Immunisation, growth monitoring (weight/height plotted on growth chart), nutrition counselling, Vitamin A supplementation, and deworming',
  'Antibiotic prescriptions and malaria treatment only',
  'Family planning and adult chronic disease management',
  'B',
  'Child health (under-5) clinic services: (1) Immunisation per KEPI schedule (BCG, OPV, DPT-HepB-Hib, PCV, Rotavirus, Measles-Rubella); (2) Growth monitoring — weight and height plotted on WHO growth chart to detect growth faltering, undernutrition, or overweight; (3) Nutrition counselling — IYCF, complementary feeding guidance; (4) Vitamin A supplementation (6–60 months, every 6 months); (5) Deworming (12–60 months, every 6 months, mebendazole or albendazole). Kenya MOH Child Health Policy; IMNCI; Kenya KEPI Schedule.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Child Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the components of the school health programme in Kenya?',
  'Drug distribution, surgery, and inpatient paediatric care',
  'Health education (nutrition, hygiene, puberty, drugs), eye/dental/general health screening, deworming, and immunisation (HPV vaccine for girls in class 4/5)',
  'ANC services and family planning for adolescents only',
  'Growth monitoring and Vitamin A supplementation only',
  'B',
  'Kenya School Health Programme (MOH/MOE): (1) Health education — nutrition, personal hygiene, puberty and sexual health, substance abuse prevention, mental health; (2) Health screening — vision (eye examination), dental assessment, general physical examination; (3) Deworming — mebendazole or albendazole twice yearly; (4) Immunisation — HPV vaccine (Cervarix/Gardasil) for girls in class 4 or 5 (age 9–14), two doses at 0 and 6 months; (5) Menstrual hygiene management. Kenya MOH School Health Policy; Kenya MOH HPV Vaccination Programme.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'School Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'IMNCI stands for Integrated Management of Neonatal and Childhood Illness. What are the four general danger signs assessed in every sick child under 5 years?',
  'Fever, cough, diarrhoea, and skin rash',
  'Convulsions (now or in the last 24 hours), inability to drink or breastfeed, vomits everything, and lethargic/unconscious',
  'Rapid breathing, skin pallor, dehydration, and malnutrition',
  'Severe anaemia, ear infection, stunting, and wasting',
  'B',
  'IMNCI general danger signs in children 2 months–5 years: (1) Convulsions now or in the past 24 hours; (2) Inability to drink or breastfeed; (3) Vomits everything (unable to keep anything down); (4) Lethargic or unconscious. Any danger sign = REFER URGENTLY. Additionally for neonates (0–2 months): fast breathing, severe chest indrawing, umbilical infection with red streaking, jaundice, very small baby, hypothermia. Kenya IMNCI Guidelines; WHO IMNCI Protocol.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'IMNCI',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the Kenya KEPI immunisation schedule summary for the first 18 months?',
  'All vaccines at birth only',
  'BCG + OPV0 at birth; DPT-HepB-Hib + PCV10 + OPV + Rota at 6, 10, 14 weeks; Measles-Rubella + Yellow Fever at 9 months; Measles-Rubella booster at 18 months',
  'BCG at 6 months; DPT at 12 months; Measles at 18 months',
  'No vaccines until 6 months; MMR and varicella at 12 months only',
  'B',
  'Kenya KEPI schedule (2023): Birth — BCG (intradermal right upper arm) + OPV0 (oral). 6 weeks — DPT-HepB-Hib + PCV10 + OPV1 + Rotavirus 1. 10 weeks — DPT-HepB-Hib + PCV10 + OPV2 + Rotavirus 2. 14 weeks — DPT-HepB-Hib + PCV10 + OPV3 + IPV. 9 months — Measles-Rubella (MR) + Yellow Fever. 18 months — MR booster. Cold chain: 2–8°C. Kenya MOH KEPI Immunisation Schedule; Kenya National Immunisation Programme.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Immunisation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Vitamin A supplementation is given at child health clinics. At which ages is it given and what is the clinical benefit?',
  'Given only once at 6 months; prevents malaria',
  'Given every 6 months from 6 months to 5 years (ages 6, 12, 18, 24, 30, 36, 42, 48, 54, 60 months); prevents Vitamin A deficiency blindness and reduces measles mortality',
  'Given annually from 2 years to 5 years; prevents anaemia only',
  'Given at 9 months only with measles vaccine; prevents jaundice',
  'B',
  'Vitamin A supplementation (VAS) in Kenya (MOH): High-dose Vitamin A capsules given at under-5 child health clinics every 6 months from 6 months to 60 months of age. Doses: 100,000 IU (6–11 months); 200,000 IU (12–59 months). Benefits: (1) Prevents xerophthalmia and Vitamin A deficiency blindness (leading cause of preventable childhood blindness); (2) Reduces all-cause child mortality by 24%; (3) Reduces measles morbidity and mortality. Kenya MOH Nutrition Programme; WHO Vitamin A Supplementation Guidelines.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Child Nutrition',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Deworming is given at child health clinics. From what age, how often, and what drug is used?',
  'From 3 months, monthly, with ivermectin',
  'From 12 months, every 6 months, with mebendazole 500 mg or albendazole 400 mg',
  'From 6 months, annually, with metronidazole',
  'From 5 years, annually, with co-trimoxazole',
  'B',
  'Deworming in children (Kenya MOH): From 12 months of age, given every 6 months at child health clinics. Drugs: Mebendazole 500 mg single oral dose OR Albendazole 400 mg single oral dose. Treats intestinal helminths (roundworm, hookworm, whipworm) which cause malnutrition, iron-deficiency anaemia, and impaired growth and cognitive development. School-age children also receive deworming via school health programme. Kenya MOH Child Nutrition and Deworming Guidelines; WHO NTD Guidelines.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Child Health',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'HPV vaccine is given to girls in Kenya. What are the target age, number of doses, schedule, and what does it prevent?',
  'Girls and boys age 18–25; 3 doses; prevents cervical and prostate cancer',
  'Girls age 9–14 years (class 4/5 in Kenya schools); 2 doses at 0 and 6 months; prevents cervical cancer caused by HPV types 16 and 18',
  'Girls age 15–20; single dose; prevents all STIs',
  'Boys and girls age 9–14; 3 doses monthly; prevents genital warts only',
  'B',
  'HPV vaccination in Kenya (MOH School Health Programme): Target group: girls aged 9–14 years (primarily delivered through schools to class 4/5 girls). Schedule: 2-dose regimen — dose 1 and dose 2 at 6 months later. Vaccines used: Cervarix (bivalent: HPV 16 and 18) or Gardasil (quadrivalent: 16, 18, 6, 11). Protection: prevents cervical cancer (80–90% attributable to HPV 16 and 18). Kenya MOH HPV Vaccination Programme; KEPI Schedule; WHO HPV Vaccine Position Paper.',
  'KRCHN',
  'Paper I',
  'MCH Nursing',
  'Immunisation',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ============================================================
-- KRCHN Paper I — Paediatrics (10 questions)
-- ============================================================

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the IMNCI general danger signs in children 2 months to 5 years that require immediate referral?',
  'Fast breathing, mild fever, and cough',
  'Convulsions now or in the past 24 hours, inability to drink or breastfeed, vomiting everything, and lethargic or unconscious',
  'Skin rash, ear discharge, and mild dehydration',
  'Stunting, wasting, and anaemia',
  'B',
  'IMNCI general danger signs (2 months–5 years): (1) Convulsions now or history in the past 24 hours; (2) Not able to drink or breastfeed (due to weakness, altered consciousness, or vomiting); (3) Vomits everything (nothing stays down — prevents oral medication); (4) Lethargic or unconscious. Any of these = URGENT REFERRAL to hospital. These supersede all other clinical findings. In neonates (0–2 months), additional signs include hypothermia, fast breathing, chest indrawing, and jaundice. Kenya IMNCI Guidelines; WHO IMCI Pocket Book.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'IMNCI',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A child with diarrhoea and some dehydration (Plan B) requires ORS. How much should be given and over what time period?',
  'Give 300 mL ORS over 24 hours',
  'Give ORS 75 mL/kg over 4 hours at the health facility (supervised rehydration)',
  'Give 1 litre of IV normal saline over 1 hour',
  'No specific amount; encourage the child to drink as much as they want at home',
  'B',
  'WHO ORS rehydration plans: Plan A (no dehydration) — continue breastfeeding, extra fluids at home, ORS after each stool. Plan B (some dehydration, 2+ signs: sunken eyes, skin turgor, restless) — 75 mL/kg WHO low-osmolarity ORS over 4 hours at the facility, reassess after 4 hours. Plan C (severe dehydration) — IV Ringer''s lactate 100 mL/kg (in 3 hours for infants under 12 months; 1 hour for older children), plus ORS when able to drink. Zinc 10–20 mg/day for 10–14 days with all plans. Kenya IMNCI Guidelines; WHO Diarrhoea Management.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Diarrhoea Management',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A child is diagnosed with Severe Acute Malnutrition (SAM). Which MUAC value, WAZ, or clinical sign confirms SAM?',
  'MUAC <12.5 cm or WAZ <-2 SD',
  'MUAC <11.5 cm (red zone) OR weight-for-age Z-score (WAZ) <-3 SD OR bilateral pitting oedema',
  'MUAC <13 cm or WAZ <-1 SD only',
  'SAM is defined by height alone',
  'B',
  'SAM (Severe Acute Malnutrition) diagnostic criteria (any one): (1) MUAC <11.5 cm (in children 6–59 months); (2) Weight-for-Height Z-score (WHZ) <-3 SD; (3) Bilateral pitting oedema (any degree = nutritional oedema/kwashiorkor). If SAM with no medical complications and appetite present: outpatient therapeutic care (OTC) with RUTF (Plumpy''Nut). If SAM with complications (oedema grade 3, medical complication, anorexia): inpatient treatment with F-75 then F-100. Kenya MOH SAM Management Guidelines; WHO SAM Protocol.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Malnutrition',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What is the HBB (Helping Babies Breathe) initial neonatal resuscitation sequence?',
  'Adrenaline first, then dry and stimulate',
  'Dry, warm, position (head slightly extended), suction if needed, stimulate — if not breathing after 60 seconds (the Golden Minute) → begin positive pressure ventilation (PPV) with bag-mask at 40 breaths/minute',
  'Chest compressions first, then dry and stimulate',
  'Oxygen by nasal cannula first, then dry',
  'B',
  'HBB (Helping Babies Breathe) Golden Minute: (1) Dry and stimulate (rub back, flick feet) — helps trigger spontaneous breathing; (2) Keep warm (dry cloth, skin-to-skin or radiant warmer); (3) Position — head slightly extended (sniffing position); (4) Suction — only if airway visibly blocked (no routine suction); (5) Assess breathing within 60 seconds. If not breathing → PPV at 40 breaths/minute with bag-mask (room air initially; oxygen if available and no response). If no heart rate (<60 bpm) after 30 seconds PPV → add chest compressions (3:1 with PPV). Kenya MOH HBB Protocol.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Neonatal Resuscitation',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Physiological neonatal jaundice appears on which day, peaks when, and resolves by when? What is the treatment if severe?',
  'Appears day 1, peaks day 2, resolves day 5',
  'Appears day 2–3, peaks day 4–5, resolves by day 10–14 in term infants; if severe (total bilirubin reaching phototherapy threshold) → phototherapy; exchange transfusion for very high levels',
  'Appears day 7–10, never requires treatment',
  'Appears at birth, persists for 6 weeks normally',
  'B',
  'Neonatal jaundice: Physiological (normal) — appears day 2–3 (not day 1), peaks day 4–5, resolves by day 10–14 in term infants (up to 3 weeks in preterm). Cause: high fetal haemoglobin breakdown + immature liver conjugation. Pathological jaundice: appears within 24 hours (always requires investigation — haemolytic disease, infection), or persistent >2 weeks, or very high bilirubin levels → phototherapy. Kernicterus risk if severe. Direct (conjugated) hyperbilirubinemia at any time = pathological. Kenya MOH Newborn Care; WHO Jaundice Guidelines.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Neonatal Jaundice',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'How are croup and epiglottitis distinguished, and why must the throat NOT be examined in epiglottitis?',
  'Both have identical presentations and management',
  'Croup: gradual onset, barking cough, low fever, stridor (laryngotracheobronchitis); Epiglottitis: sudden high fever, toxic child, drooling, tripod position, stridor — do NOT examine throat (may precipitate complete airway obstruction); requires emergency airway management and IV antibiotics',
  'Croup requires immediate tracheostomy; epiglottitis resolves without treatment',
  'Epiglottitis causes a barking cough; croup causes drooling',
  'B',
  'Croup (laryngotracheobronchitis): gradual onset, barking/seal-like cough, hoarse voice, inspiratory stridor, low-grade fever, usually under 5 years, caused by parainfluenza virus. Treatment: corticosteroids (dexamethasone), cool mist, adrenaline nebulisation if severe. Epiglottitis: sudden onset, high fever (>38.5°C), toxic appearance, drooling (dysphagia), tripod position, muffled voice, inspiratory stridor — caused by H. influenzae type b (or other bacteria). CRITICAL: Do NOT attempt to examine throat or use tongue depressor — may precipitate total airway obstruction. Manage as airway emergency; IV cefotaxime/ceftriaxone; secure airway in theatre. Kenya IMNCI/Paediatrics; Nelson Textbook.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Respiratory Emergencies',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A 2-year-old child has a febrile convulsion. What is the nursing management?',
  'Restrain the child and insert a tongue depressor between teeth',
  'Ensure airway patency (recovery position post-seizure), administer diazepam PR or midazolam IM if seizure lasts >5 minutes, apply tepid sponging, give paracetamol for fever, and reassure parents',
  'Pour cold water on the child immediately to reduce fever',
  'Administer IV phenobarbital as first-line treatment',
  'B',
  'Febrile convulsion (common: 6 months–5 years; brief, generalised, associated with rapid temperature rise): Management: (1) Do not restrain; (2) Clear area of hazards; (3) Recovery position post-seizure; (4) Ensure airway patent; (5) Time seizure — if >5 minutes: diazepam PR 0.5 mg/kg or midazolam buccal/IM; (6) Reduce fever: paracetamol 15 mg/kg oral/rectal, tepid sponging (not cold — causes shivering); (7) IV access if recurrent; (8) Reassure parents (not dangerous long-term for simple febrile seizures). Investigate for underlying infection cause of fever. Kenya IMNCI; Nelson Paediatrics.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Neurological Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What respiratory rate thresholds define fast breathing (pneumonia) in children under 5 years by age group?',
  'Fast breathing = >40 breaths/min for all children under 5',
  'Fast breathing: ≥60 breaths/min in infants <2 months; ≥50 breaths/min in infants 2–12 months; ≥40 breaths/min in children 1–5 years',
  'Fast breathing = >30 breaths/min for all age groups',
  'Fast breathing = >25 breaths/min only for children over 2 years',
  'B',
  'IMNCI fast breathing thresholds: <2 months: ≥60 breaths/minute; 2–12 months: ≥50 breaths/minute; 1–5 years: ≥40 breaths/minute. Fast breathing alone = pneumonia (treat with amoxicillin). Fast breathing + lower chest indrawing = severe pneumonia (refer for IV antibiotics). Fast breathing + danger signs = very severe pneumonia. Count for full 60 seconds when child is calm. Count is repeated if first count is borderline. Kenya IMNCI Classification Chart; WHO IMCI Pocket Book.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Respiratory Disorders',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A child with SAM is in the stabilisation phase of inpatient treatment. Which therapeutic milk is used, and what is the risk of using high-calorie milk too early?',
  'F-100 (100 kcal/100 mL) is used from admission; no risk of overfeeding',
  'F-75 (75 kcal/100 mL) is used in the stabilisation phase (days 1–7) to gently restore metabolism; switching to F-100 too early risks refeeding syndrome (cardiac failure from hypophosphataemia)',
  'Regular cow''s milk is used throughout treatment',
  'RUTF is given from day 1 regardless of complications',
  'B',
  'SAM inpatient phases: Stabilisation (days 1–7): F-75 (75 kcal/100 mL, low sodium) — treats immediate complications (hypoglycaemia, hypothermia, infection, electrolyte imbalances) without overwhelming the damaged metabolic system; prevents refeeding syndrome. Transition → Rehabilitation (weeks 2–6): appetite returns, oedema reducing, no complications → switch to F-100 (100 kcal/100 mL) for catch-up growth; then progress to RUTF. Refeeding syndrome (cardiac failure, electrolyte crisis) is fatal if F-100 or high-calorie feeds are started too early. Kenya MOH SAM Guidelines; WHO SAM Management.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Malnutrition',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'What are the components of routine newborn care at birth?',
  'Immunisations only; all other care is done after discharge',
  'Dry and stimulate, skin-to-skin contact, early breastfeeding within 1 hour, Vitamin K 1 mg IM, tetracycline eye ointment, BCG and OPV0 before discharge, weigh and document, and examine for congenital abnormalities',
  'Routine suctioning of airway, bathing immediately, and IV dextrose prophylactically',
  'Delayed skin-to-skin at 1 hour; bottle feeding if mother unavailable; BCG at 6 weeks',
  'B',
  'Routine newborn care (Kenya MOH Essential Newborn Care Package): (1) Dry and stimulate (initiates breathing, prevents hypothermia); (2) Immediate skin-to-skin contact (kangaroo care — warmth, bonding, breastfeeding initiation); (3) Early initiation of breastfeeding within 1 hour (colostrum — first milk, immunoglobulins); (4) Vitamin K 1 mg IM (prevents VKDB); (5) Tetracycline eye ointment 1% (prevents ophthalmia neonatorum); (6) BCG + OPV0 before discharge; (7) Weigh and measure; (8) Examine for congenital abnormalities; (9) Delayed cord clamping 1–3 min. Kenya MOH Newborn Care Package; Myles Midwifery.',
  'KRCHN',
  'Paper I',
  'Paediatric Nursing',
  'Newborn Care',
  'easy',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

