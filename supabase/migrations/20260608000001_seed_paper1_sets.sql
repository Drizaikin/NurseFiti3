-- =============================================================================
-- Seed: NCK Past Paper 1 — Uncategorised Sets (verbatim MCQs with rationales)
-- Cadre: KRCHN (all questions) + BScN (where complexity warrants dual-seeding)
-- Paper: Paper I (Medical-Surgical + Pharmacology + Surgical) or Paper II
-- exam_year: NULL (no year stamped on source PDF)
-- Rules: Roman numeral paper names, one INSERT per question, deduplicated
-- =============================================================================

-- ─── SET 1 ────────────────────────────────────────────────────────────────────

-- Q1 — Pneumothorax sign
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The following finding is suggestive of a pneumothorax in a patient with chest trauma:',
 'Absent breath sounds',
 'Inspiratory wheezing',
 'Dullness on chest percussion',
 'Pronounced crackles',
 'A',
 'In pneumothorax the pleural space fills with air, collapsing the lung on the affected side. Air conducts sound poorly, so breath sounds are absent over the affected hemithorax; percussion is hyper-resonant (not dull — dullness suggests fluid/haemothorax). Wheezing indicates airway narrowing; crackles indicate alveolar fluid.',
 'medium', 'approved', NULL, 'Paper I');

-- Q1 also BScN
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The following finding is suggestive of a pneumothorax in a patient with chest trauma:',
 'Absent breath sounds',
 'Inspiratory wheezing',
 'Dullness on chest percussion',
 'Pronounced crackles',
 'A',
 'In pneumothorax the pleural space fills with air, collapsing the lung on the affected side. Air conducts sound poorly, so breath sounds are absent over the affected hemithorax; percussion is hyper-resonant (not dull — dullness suggests fluid/haemothorax). Wheezing indicates airway narrowing; crackles indicate alveolar fluid.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Digoxin primary action
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'The primary reason for administering digoxin (Lanoxin) to a patient is to:',
 'Relax the walls of the heart''s arteries',
 'Improve the strength of the heart beat',
 'Prevent irregularities in ventricular contractions',
 'Decrease inflammation of the heart wall',
 'B',
 'Digoxin is a cardiac glycoside. Its primary action is a positive inotropic effect — it inhibits Na+/K+-ATPase, raises intracellular calcium and increases the force of myocardial contraction. It also slows AV node conduction (negative chronotropic effect), but the primary therapeutic indication is to strengthen the failing heart''s contraction in heart failure.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'The primary reason for administering digoxin (Lanoxin) to a patient is to:',
 'Relax the walls of the heart''s arteries',
 'Improve the strength of the heart beat',
 'Prevent irregularities in ventricular contractions',
 'Decrease inflammation of the heart wall',
 'B',
 'Digoxin is a cardiac glycoside. Its primary action is a positive inotropic effect — it inhibits Na+/K+-ATPase, raises intracellular calcium and increases the force of myocardial contraction. It also slows AV node conduction (negative chronotropic effect), but the primary therapeutic indication is to strengthen the failing heart''s contraction in heart failure.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Priority nursing diagnosis: heart failure + pulmonary oedema
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The priority nursing diagnosis for a patient with heart failure and pulmonary oedema is:',
 'Risk for infection related to stasis of alveolar secretions',
 'Impaired skin integrity related to pressure',
 'Activity intolerance related to pump failure',
 'Constipation related to immobility',
 'C',
 'Using Maslow''s hierarchy and ABCs, oxygenation/circulation needs are prioritised. In pulmonary oedema secondary to heart failure, pump failure reduces cardiac output, causing fatigue and dyspnoea on minimal exertion. Activity intolerance directly reflects the haemodynamic problem. The other diagnoses are valid but secondary.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The priority nursing diagnosis for a patient with heart failure and pulmonary oedema is:',
 'Risk for infection related to stasis of alveolar secretions',
 'Impaired skin integrity related to pressure',
 'Activity intolerance related to pump failure',
 'Constipation related to immobility',
 'C',
 'Using Maslow''s hierarchy and ABCs, oxygenation/circulation needs are prioritised. In pulmonary oedema secondary to heart failure, pump failure reduces cardiac output, causing fatigue and dyspnoea on minimal exertion. Activity intolerance directly reflects the haemodynamic problem. The other diagnoses are valid but secondary.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Colonoscopy preparation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Procedures',
 'When preparing a patient for colonoscopy procedure the nurse should:',
 'Perform a high colonic washout procedure the night before the procedure',
 'Ensure the patient takes a high roughage diet with a laxative the night before procedure',
 'Educate the patient to report any "needle prick" sensations within 12 hrs after the procedure',
 'Advise the patient to take low fiber diet for 1 week before the procedure',
 'D',
 'Bowel preparation for colonoscopy aims to clear the colon for visualisation. The patient is placed on a low-residue (low-fibre) diet for 3–7 days, then clear fluids 24 hours pre-procedure, plus oral bowel preparation (e.g. PEG). High-fibre diet would leave residue; high colonic washouts are not standard. Post-procedure, watch for bowel perforation signs, not needle prick sensations.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Cushingoid appearance
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The characteristics of a "Cushingoid" appearance in Cushing''s disease include:',
 'Hypotension, Kussmaul''s breathing, hunch back and diaphoresis',
 'Moon face, buffalo hump, central obesity and thin musculature',
 'Mood swings, slow wound healing, hypertension and tunnel vision',
 'Flushing, brittle skin, abdominal pain and encephalopathy',
 'B',
 'Cushing''s syndrome results from excess glucocorticoids. The classic Cushingoid appearance is redistribution of fat: round (moon) face, cervico-dorsal fat pad (buffalo hump), truncal/central obesity, with thin extremities due to protein catabolism causing muscle wasting. Hypertension (not hypotension), thin skin with striae, hyperglycaemia and osteoporosis also occur.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The characteristics of a "Cushingoid" appearance in Cushing''s disease include:',
 'Hypotension, Kussmaul''s breathing, hunch back and diaphoresis',
 'Moon face, buffalo hump, central obesity and thin musculature',
 'Mood swings, slow wound healing, hypertension and tunnel vision',
 'Flushing, brittle skin, abdominal pain and encephalopathy',
 'B',
 'Cushing''s syndrome results from excess glucocorticoids. The classic Cushingoid appearance is redistribution of fat: round (moon) face, cervico-dorsal fat pad (buffalo hump), truncal/central obesity, with thin extremities due to protein catabolism causing muscle wasting. Hypertension (not hypotension), thin skin with striae, hyperglycaemia and osteoporosis also occur.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — Culture and sensitivity: sensitivity part
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Infection and Diagnostics',
 'The sensitivity part of a culture and sensitivity test is for the purpose of:',
 'Identifying the causative organism for the infection diagnosed',
 'Identifying the most effective antibiotics against the causative organism',
 'Identifying the antibiotics that the patient is resistant to',
 'Testing the concentration of antibiotic required to cure an infection',
 'B',
 'In a culture and sensitivity (C&S) test, CULTURE identifies the causative organism. SENSITIVITY (antibiogram) tests the isolated organism against a panel of antibiotics to determine which ones inhibit its growth — i.e., which are most effective. Option A is what culture does; option C is partially true but the purpose is positive (finding effective drug).',
 'easy', 'approved', NULL, 'Paper I');

-- Q7 — Cataract complaint
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'A client with a cataract would most likely complain of:',
 'Halos and rainbows around lights',
 'Eye pain and irritation that worsens at night',
 'Blurred and hazy vision',
 'Eye strain and headache when doing close work',
 'C',
 'A cataract is opacification of the lens, causing painless, progressive blurring/clouding of vision, decreased colour intensity and glare. Halos around lights are characteristic of acute angle-closure glaucoma; eye strain with close work suggests presbyopia/refractive error; pain that worsens at night is not a cataract feature.',
 'easy', 'approved', NULL, 'Paper I');

-- Q8 T/F split → two standalone MCQs
-- Q8a — Acute angle closure glaucoma
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'Which of the following is TRUE regarding acute angle closure glaucoma?',
 'It is a medical emergency requiring urgent reduction of intraocular pressure',
 'It is a chronic, slowly progressive condition that rarely causes sudden vision loss',
 'It is treated with mydriatic eye drops to dilate the pupil',
 'It presents with gradual, painless loss of peripheral vision',
 'A',
 'Acute angle-closure glaucoma produces a sudden rise in intraocular pressure with severe eye pain, halos, nausea/vomiting and rapid vision loss; without emergency reduction of IOP the optic nerve is irreversibly damaged within hours. It is a true ophthalmic emergency.',
 'medium', 'approved', NULL, 'Paper I');

-- Q8b — Spinal injury and anaesthesia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Regarding sensory loss in spinal cord injury, which statement is CORRECT?',
 'All spinal cord injuries result in complete loss of sensation below the level of injury',
 'In incomplete spinal cord injury, some sensation may be preserved below the level of injury',
 'Sensation is always preserved in cervical spinal injuries',
 'Sensory loss only occurs in thoracic spinal cord injuries',
 'B',
 'The degree of sensory and motor loss depends on whether the spinal cord injury is complete or incomplete. In incomplete lesions (e.g., central cord, Brown-Séquard, anterior cord syndromes), some sensation or movement is preserved below the level. Complete injuries result in total loss below the lesion.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Tube feeding post total laryngectomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Head and Neck Surgery',
 'The primary rationale for tube feeding for a client post total laryngectomy due to cancer of the larynx is to:',
 'Meet dietary needs and prevent fistula formation',
 'Maintain an open airway and prevent aspiration',
 'Meet fluid and dietary needs and prevent aspiration',
 'Prevent fistula formation and reduce aspiration',
 'A',
 'After total laryngectomy the airway is permanently separated from the pharynx via a tracheostome, so aspiration is not the primary concern. The pharyngeal suture line must heal without contact with food/saliva to prevent pharyngocutaneous fistula. NG/PEG feeding for 7–10 days post-op meets nutritional needs AND protects the suture line.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Head and Neck Surgery',
 'The primary rationale for tube feeding for a client post total laryngectomy due to cancer of the larynx is to:',
 'Meet dietary needs and prevent fistula formation',
 'Maintain an open airway and prevent aspiration',
 'Meet fluid and dietary needs and prevent aspiration',
 'Prevent fistula formation and reduce aspiration',
 'A',
 'After total laryngectomy the airway is permanently separated from the pharynx via a tracheostome, so aspiration is not the primary concern. The pharyngeal suture line must heal without contact with food/saliva to prevent pharyngocutaneous fistula. NG/PEG feeding for 7–10 days post-op meets nutritional needs AND protects the suture line.',
 'hard', 'approved', NULL, 'Paper I');

-- Q10 — Burns: immediate physiology
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
 'When a burn occurs in an adult, which of the following correctly describes the immediate physiological response?',
 'Right arm is 18% and right leg 9% using rule of nines; renal blood flow is increased',
 'Capillaries and small vessels dilate, renal blood flow reduces',
 'Fluid shifts from ICF to ECF space along with potassium',
 'Permeability of the kidney tubules increases with oliguria',
 'B',
 'In the emergent phase of burns there is massive release of inflammatory mediators causing vasodilation and marked increase in capillary permeability — plasma and proteins leak into the interstitium (third-spacing), reducing circulating volume and hence renal blood flow (oliguria). Rule of nines: each arm = 9%, each leg = 18%. Potassium is RELEASED from damaged cells into ECF (hyperkalaemia), not shifted from ICF to ECF with sodium.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Burns Management',
 'When a burn occurs in an adult, which of the following correctly describes the immediate physiological response?',
 'Right arm is 18% and right leg 9% using rule of nines; renal blood flow is increased',
 'Capillaries and small vessels dilate, renal blood flow reduces',
 'Fluid shifts from ICF to ECF space along with potassium',
 'Permeability of the kidney tubules increases with oliguria',
 'B',
 'In the emergent phase of burns there is massive release of inflammatory mediators causing vasodilation and marked increase in capillary permeability — plasma and proteins leak into the interstitium (third-spacing), reducing circulating volume and hence renal blood flow (oliguria). Rule of nines: each arm = 9%, each leg = 18%. Potassium is RELEASED from damaged cells into ECF (hyperkalaemia), not shifted from ICF to ECF with sodium.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Position change hemiparesis: technique to AVOID
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Nursing Care',
 'The following technique should be AVOIDED when changing a hemiparalysis client''s position in bed:',
 'Sliding the client to move her up in bed',
 'Rolling the client onto her side',
 'Lifting the client when moving her up in bed',
 'Having the client lift herself off the bed using a trapeze',
 'A',
 'Sliding/dragging produces shearing forces between bony prominences and the sheet, damaging dermal capillaries and predisposing to pressure ulcers — particularly dangerous in immobile/hemiplegic patients. Correct technique is to LIFT (using a draw sheet, slide sheet or trapeze) so the skin is not dragged. Rolling onto the side is part of standard 2-hourly turning.',
 'easy', 'approved', NULL, 'Paper I');

-- Q12 — Abnormal BP on initial assessment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Assessment',
 'When a blood pressure reading is abnormal upon initial assessment, it is best to check the BP:',
 'On the other arm',
 'On both arms sitting and standing',
 'With the patient standing',
 'After a 5 minute wait',
 'B',
 'When an initial BP is abnormal, best practice is to verify it in both arms (a difference >10 mmHg suggests vascular disease) AND in two positions (sitting then standing) to detect orthostatic hypotension. Simply rechecking one arm or after a wait misses these patterns. This is standard JNC/WHO/Kenya MoH hypertension protocol.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Swabs/instruments count during surgery
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Operating Theatre Practice',
 'Swabs, instruments and sharps count during surgery is carried out by:',
 'Circulating and anaesthetic nurses',
 'Anaesthetic and scrub nurses',
 'Circulating and scrub nurses',
 'Recovery room and scrub nurses',
 'C',
 'The WHO Surgical Safety Checklist and operating theatre protocols require the SCRUB nurse (sterile field) and CIRCULATING nurse (non-sterile, manages the room) to perform the count together — before the operation begins, before closure of a cavity, before skin closure, and at the end. Two-person counting is mandatory to prevent retained foreign objects.',
 'easy', 'approved', NULL, 'Paper I');

-- Q14 — COPD nursing (dual-seeded)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'When nursing a patient with chronic obstructive pulmonary disease, the nurse should:',
 'Ensure the patient gets high flow rate oxygen at 100%',
 'Advise the patient to get influenza and pneumococcal vaccines',
 'Avoid administration of prophylactic bronchodilators',
 'Position the patient in dorsal recumbent position to enhance ventilation',
 'B',
 'Patients with COPD are at very high risk of exacerbation from respiratory infections, so annual influenza and pneumococcal vaccination are recommended. High-flow 100% O2 is contraindicated in COPD with chronic CO2 retention — it can blunt the hypoxic respiratory drive (give controlled low-flow O2 targeting SpO2 88–92%). Bronchodilators ARE the cornerstone of therapy. Upright/orthopnoeic position enhances ventilation, not dorsal recumbent.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'When nursing a patient with chronic obstructive pulmonary disease, the nurse should:',
 'Ensure the patient gets high flow rate oxygen at 100%',
 'Advise the patient to get influenza and pneumococcal vaccines',
 'Avoid administration of prophylactic bronchodilators',
 'Position the patient in dorsal recumbent position to enhance ventilation',
 'B',
 'Patients with COPD are at very high risk of exacerbation from respiratory infections, so annual influenza and pneumococcal vaccination are recommended. High-flow 100% O2 is contraindicated in COPD with chronic CO2 retention — it can blunt the hypoxic respiratory drive (give controlled low-flow O2 targeting SpO2 88–92%). Bronchodilators ARE the cornerstone of therapy. Upright/orthopnoeic position enhances ventilation, not dorsal recumbent.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — After NG tube removal
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Nursing',
 'After a client''s nasogastric tube has been removed the nurse should:',
 'Offer the client liquids to drink',
 'Provide the client with oral hygiene',
 'Encourage client to cough and deep breath',
 'Auscultate the client''s bowel sounds',
 'B',
 'Prolonged NG intubation dries out and irritates the oral and nasal mucosa and leaves an unpleasant taste. The immediate priority after removal is to provide oral hygiene/comfort. Reintroduction of oral fluids is gradual and only after confirming GIT function. Auscultating bowel sounds should already have been done before deciding to remove the tube.',
 'easy', 'approved', NULL, 'Paper I');

-- Q16 — Neurovascular assessment post-cast
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'Neurovascular assessment of the lower limb post-cast application involves observation of:',
 'Color, sensation and pulses',
 'Level of consciousness, limb symmetry and muscular strength',
 'Capillary refill, sensation and muscle power',
 'Color, warmth and muscle power',
 'A',
 'The classic neurovascular assessment (the 5 Ps or 6 Ps): Pain, Pallor (colour), Pulses, Paraesthesia (sensation), Paralysis, Poikilothermia (temperature). Option A covers the three principal observations — Colour (perfusion), Sensation (neural integrity), Pulses (arterial flow distal to cast).',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Macrovascular complications DM
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The risk for macrovascular complications in diabetes mellitus may be reduced by:',
 'Lowering BP, avoiding nephrotoxic substances and reducing strenuous exercises',
 'Weight reduction, reducing fat/triglyceride levels, quitting smoking',
 'Foot care, early diagnosis of retinal detachment and daily U/Es checkups',
 'High fibre diet, low fat diet and prompt treatment of systemic infections',
 'B',
 'Macrovascular complications of DM are coronary artery disease, cerebrovascular disease and peripheral vascular disease — all driven by atherosclerosis. Their cardinal modifiable risk factors are obesity, dyslipidaemia and smoking. Hence weight reduction, lipid control and smoking cessation are central. Options A and C address microvascular complications (nephropathy, retinopathy).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The risk for macrovascular complications in diabetes mellitus may be reduced by:',
 'Lowering BP, avoiding nephrotoxic substances and reducing strenuous exercises',
 'Weight reduction, reducing fat/triglyceride levels, quitting smoking',
 'Foot care, early diagnosis of retinal detachment and daily U/Es checkups',
 'High fibre diet, low fat diet and prompt treatment of systemic infections',
 'B',
 'Macrovascular complications of DM are coronary artery disease, cerebrovascular disease and peripheral vascular disease — all driven by atherosclerosis. Their cardinal modifiable risk factors are obesity, dyslipidaemia and smoking. Hence weight reduction, lipid control and smoking cessation are central. Options A and C address microvascular complications (nephropathy, retinopathy).',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Priority indicator of increasing ICP
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The priority indicator of increasing intracranial pressure is:',
 'Unequal pupil size',
 'Decreasing systolic pressure',
 'Tachycardia',
 'Decreasing body temperature',
 'A',
 'Anisocoria (unequal pupils) reflects compression of cranial nerve III by transtentorial herniation and is an early, ominous sign of rising ICP. Cushing''s response (LATE sign) is RISING (not falling) systolic BP with widening pulse pressure, BRADYCARDIA (not tachycardia), and irregular respirations. Temperature changes are variable and non-specific.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The priority indicator of increasing intracranial pressure is:',
 'Unequal pupil size',
 'Decreasing systolic pressure',
 'Tachycardia',
 'Decreasing body temperature',
 'A',
 'Anisocoria (unequal pupils) reflects compression of cranial nerve III by transtentorial herniation and is an early, ominous sign of rising ICP. Cushing''s response (LATE sign) is RISING (not falling) systolic BP with widening pulse pressure, BRADYCARDIA (not tachycardia), and irregular respirations. Temperature changes are variable and non-specific.',
 'hard', 'approved', NULL, 'Paper I');

-- Q19 — Diet predisposing to megaloblastic anaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Foods that may predispose a client to megaloblastic anaemia if taken exclusively include:',
 'Meat, eggs and beans',
 'Beans, peas and rice',
 'Capsicum, sorghum and millet',
 'Meat, maize, sorghum',
 'C',
 'Megaloblastic anaemia results from folate or vitamin B12 deficiency. Vitamin B12 is found almost exclusively in animal products (meat, eggs, dairy, fish). A diet relying exclusively on capsicum, sorghum and millet (no animal protein) carries risk of B12 deficiency over time. Options A and D include meat/eggs so are protective.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Pyloric stenosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Gastrointestinal Disorders in Children',
 'In pyloric stenosis there is:',
 'Projectile vomiting and olive-sized mass in the abdomen''s upper right quadrant',
 'Blood tinged vomitus and significantly reduced peristaltic waves',
 'Severe abdominal pain and irregular opening of the bowels',
 'Normal feeding appetite and passing of loose bowel motions',
 'A',
 'Infantile hypertrophic pyloric stenosis (typically 3–8 weeks of age) presents with non-bilious, PROJECTILE vomiting shortly after feeds; the infant remains hungry afterwards. The hypertrophied pylorus is palpable as a firm olive in the right upper quadrant, often with VISIBLE peristaltic waves. Vomitus is not blood-tinged. This matches Kenya Basic Paediatric Protocols.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Gastrointestinal Disorders in Children',
 'In pyloric stenosis there is:',
 'Projectile vomiting and olive-sized mass in the abdomen''s upper right quadrant',
 'Blood tinged vomitus and significantly reduced peristaltic waves',
 'Severe abdominal pain and irregular opening of the bowels',
 'Normal feeding appetite and passing of loose bowel motions',
 'A',
 'Infantile hypertrophic pyloric stenosis (typically 3–8 weeks of age) presents with non-bilious, PROJECTILE vomiting shortly after feeds; the infant remains hungry afterwards. The hypertrophied pylorus is palpable as a firm olive in the right upper quadrant, often with VISIBLE peristaltic waves. Vomitus is not blood-tinged. This matches Kenya Basic Paediatric Protocols.',
 'medium', 'approved', NULL, 'Paper I');


-- ─── SET 2 ────────────────────────────────────────────────────────────────────

-- Q1 — Ready for oral feeding post bronchoscopy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Procedures',
 'The best indicators that a patient is ready for oral feeding post bronchoscopy are:',
 'Bowel sounds and cough reflex',
 'Hoarseness of voice and respiratory rate',
 'Respiratory rate and bowel sounds',
 'Cough reflex and hoarseness of voice',
 'D',
 'After bronchoscopy the pharynx and larynx are anaesthetised with local anaesthetic. Until the gag/cough reflex returns and the local-anaesthetic-induced hoarseness resolves, oral intake risks aspiration. Bowel sounds are irrelevant — this is an airway procedure, not a GIT one. The standard NPO period is until cough/gag reflex returns (usually 1–2 hours).',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Barrel chest
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Barrel chest is a feature of:',
 'Heart failure, kyphosis',
 'Kyphosis, emphysema',
 'Emphysema, osteoarthritis',
 'Drug resistant tuberculosis, emphysema',
 'B',
 'A barrel chest (increased AP diameter, ratio approaching 1:1) results from chronic hyperinflation. The two classic causes are EMPHYSEMA (air-trapping from loss of elastic recoil) and severe KYPHOSIS/thoracic spine deformity that fixes the chest in inspiratory position. Heart failure and osteoarthritis do not cause barrel chest.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Major electrolytes in intracellular fluid
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Fluid and Electrolytes',
 'The major electrolytes in the intracellular fluid are:',
 'Sodium and chloride',
 'Potassium and chloride',
 'Potassium and phosphorus',
 'Sodium and phosphorus',
 'C',
 'Intracellular fluid (ICF) is dominated by POTASSIUM (K+) as the chief cation and PHOSPHATE (HPO4 2-) and proteins as the chief anions, maintained by the Na+/K+ ATPase pump. Sodium and chloride are the major extracellular (ECF) electrolytes.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Fluid and Electrolytes',
 'The major electrolytes in the intracellular fluid are:',
 'Sodium and chloride',
 'Potassium and chloride',
 'Potassium and phosphorus',
 'Sodium and phosphorus',
 'C',
 'Intracellular fluid (ICF) is dominated by POTASSIUM (K+) as the chief cation and PHOSPHATE (HPO4 2-) and proteins as the chief anions, maintained by the Na+/K+ ATPase pump. Sodium and chloride are the major extracellular (ECF) electrolytes.',
 'easy', 'approved', NULL, 'Paper I');

-- Q4 — Factors leading to myocardial ischaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Factors that can lead to myocardial ischaemia include:',
 'Anaemia, aortic valve stenosis, polycythaemia',
 'Mitral valve stenosis, anaemia, left ventricular hypertrophy',
 'Anaemia, aortic valve stenosis, mitral valve stenosis',
 'Polycythaemia, mitral valve stenosis, left ventricular hypertrophy',
 'A',
 'Myocardial ischaemia results from imbalance between O2 supply and demand. Anaemia (decreased oxygen-carrying capacity reduces supply), aortic stenosis (increased afterload raises demand AND outflow obstruction reduces coronary perfusion), and polycythaemia (increased blood viscosity, sluggish flow reduces supply) all promote ischaemia. Mitral stenosis primarily causes pulmonary congestion rather than direct LV ischaemia.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Factors that can lead to myocardial ischaemia include:',
 'Anaemia, aortic valve stenosis, polycythaemia',
 'Mitral valve stenosis, anaemia, left ventricular hypertrophy',
 'Anaemia, aortic valve stenosis, mitral valve stenosis',
 'Polycythaemia, mitral valve stenosis, left ventricular hypertrophy',
 'A',
 'Myocardial ischaemia results from imbalance between O2 supply and demand. Anaemia (decreased oxygen-carrying capacity reduces supply), aortic stenosis (increased afterload raises demand AND outflow obstruction reduces coronary perfusion), and polycythaemia (increased blood viscosity, sluggish flow reduces supply) all promote ischaemia. Mitral stenosis primarily causes pulmonary congestion rather than direct LV ischaemia.',
 'hard', 'approved', NULL, 'Paper I');

-- Q5 T/F split → two standalone MCQs
-- Q5a — Colloids in cardiogenic shock
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Regarding fluid management in cardiogenic shock, which statement is CORRECT?',
 'Colloids should be administered aggressively to expand circulatory volume',
 'Colloids are not the treatment of choice in cardiogenic shock because the problem is pump failure, not hypovolaemia',
 'Normal saline 1 litre should be given as a rapid bolus to restore cardiac output',
 'All types of shock are managed identically with aggressive IV fluid resuscitation',
 'B',
 'In cardiogenic shock the problem is pump failure, not hypovolaemia. Aggressive volume expansion worsens pulmonary oedema. Management is inotropes/vasopressors, with careful fluid only if pre-load dependent (e.g. right-sided MI). Colloid administration to expand volume would further overload the failing ventricle.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Regarding fluid management in cardiogenic shock, which statement is CORRECT?',
 'Colloids should be administered aggressively to expand circulatory volume',
 'Colloids are not the treatment of choice in cardiogenic shock because the problem is pump failure, not hypovolaemia',
 'Normal saline 1 litre should be given as a rapid bolus to restore cardiac output',
 'All types of shock are managed identically with aggressive IV fluid resuscitation',
 'B',
 'In cardiogenic shock the problem is pump failure, not hypovolaemia. Aggressive volume expansion worsens pulmonary oedema. Management is inotropes/vasopressors, with careful fluid only if pre-load dependent (e.g. right-sided MI). Colloid administration to expand volume would further overload the failing ventricle.',
 'hard', 'approved', NULL, 'Paper I');

-- Q5b — Atherosclerosis gender difference
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Which of the following statements regarding atherosclerosis is TRUE?',
 'Atherosclerosis is more common in females than males at all ages',
 'Oestrogen has no effect on the risk of atherosclerosis',
 'Atherosclerosis is more common in males than females',
 'After menopause, female risk of atherosclerosis decreases significantly',
 'C',
 'Males have a higher incidence of premature atherosclerosis than premenopausal females. Oestrogen is cardioprotective — it raises HDL and lowers LDL. After menopause, female risk approaches male risk as oestrogen levels decline, making postmenopausal women a high-risk group.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — Multiple myeloma nursing interventions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Nursing interventions for a patient with multiple myeloma include:',
 'Providing low calorie diet in small frequent amounts',
 'Providing plenty of oral fluids',
 'Catheterisation to monitor urine output',
 'Encouraging weight bearing exercises',
 'B',
 'Multiple myeloma causes hypercalcaemia (bone resorption), excretion of Bence-Jones light-chain protein and uric acid — high risk of cast nephropathy and renal failure. Generous oral hydration (3 L/day if not contraindicated) is a key intervention to flush kidneys. Catheterisation introduces infection risk and is unnecessary. Weight-bearing exercises risk pathological fractures from lytic bone lesions.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Nursing interventions for a patient with multiple myeloma include:',
 'Providing low calorie diet in small frequent amounts',
 'Providing plenty of oral fluids',
 'Catheterisation to monitor urine output',
 'Encouraging weight bearing exercises',
 'B',
 'Multiple myeloma causes hypercalcaemia (bone resorption), excretion of Bence-Jones light-chain protein and uric acid — high risk of cast nephropathy and renal failure. Generous oral hydration (3 L/day if not contraindicated) is a key intervention to flush kidneys. Catheterisation introduces infection risk and is unnecessary. Weight-bearing exercises risk pathological fractures from lytic bone lesions.',
 'medium', 'approved', NULL, 'Paper I');

-- Q7 — Sickle haemoglobin gene substitution
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'The sickle haemoglobin gene causes substitution of:',
 'Amino acid valine for glutamic acid (glutamine)',
 'Amino acid alanine for glutamine',
 'Amino acid glutamine for valine',
 'Glutamine for asparagine',
 'A',
 'Sickle cell disease is caused by a single point mutation in the beta-globin gene where adenine is replaced by thymine at codon 6, leading to substitution of glutamic acid by VALINE (Glu→Val, beta6Glu→Val). This produces HbS, which polymerises under deoxygenated conditions and distorts red cells into the sickle shape.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'The sickle haemoglobin gene causes substitution of:',
 'Amino acid valine for glutamic acid (glutamine)',
 'Amino acid alanine for glutamine',
 'Amino acid glutamine for valine',
 'Glutamine for asparagine',
 'A',
 'Sickle cell disease is caused by a single point mutation in the beta-globin gene where adenine is replaced by thymine at codon 6, leading to substitution of glutamic acid by VALINE (Glu→Val, beta6Glu→Val). This produces HbS, which polymerises under deoxygenated conditions and distorts red cells into the sickle shape.',
 'hard', 'approved', NULL, 'Paper I');

-- Q8 — DM type I acidosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Patients with diabetes mellitus type I are at risk of acidosis due to:',
 'Increased potassium levels in blood',
 'Increased breakdown of fat',
 'Increased metabolism of fatty acids into ketone bodies',
 'Increased myoglobin in blood',
 'C',
 'In Type 1 DM with insulin deficiency, glucose cannot enter cells, so the body switches to fat for fuel. Free fatty acids are mobilised to the liver and metabolised (beta-oxidation) producing ketone bodies — acetoacetate, beta-hydroxybutyrate and acetone. These organic acids overwhelm buffering and produce diabetic ketoacidosis (DKA). The metabolism of fatty acids into ketones is the actual acidosis-producing step.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Patients with diabetes mellitus type I are at risk of acidosis due to:',
 'Increased potassium levels in blood',
 'Increased breakdown of fat',
 'Increased metabolism of fatty acids into ketone bodies',
 'Increased myoglobin in blood',
 'C',
 'In Type 1 DM with insulin deficiency, glucose cannot enter cells, so the body switches to fat for fuel. Free fatty acids are mobilised to the liver and metabolised (beta-oxidation) producing ketone bodies — acetoacetate, beta-hydroxybutyrate and acetone. These organic acids overwhelm buffering and produce diabetic ketoacidosis (DKA). The metabolism of fatty acids into ketones is the actual acidosis-producing step.',
 'hard', 'approved', NULL, 'Paper I');

-- Q9 — Casted leg positioning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'In positioning a casted leg, the nurse should:',
 'Keep the leg in a flat position always',
 'Elevate the leg for 3 hours then put it flat for 1 hour',
 'Keep the leg flat for 3 hours then elevate it for 1 hour',
 'Elevate the leg on pillow continuously for 24 to 48 hours',
 'D',
 'For the first 24–48 hours after casting, the limb is elevated above heart level continuously on pillows to promote venous return, minimise dependent oedema and reduce risk of compartment syndrome. Once swelling is controlled, intermittent elevation is sufficient.',
 'easy', 'approved', NULL, 'Paper I');

-- Q10 — Meniere's disease drugs
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'Drugs used in management of Meniere''s disease include:',
 'Antiemetics, diuretics, glucocorticoids',
 'Glucocorticoids, diuretics, antihistamines',
 'Antihistamines, diuretics, antiemetics',
 'Glucocorticoids, antihistamines, antiemetics',
 'C',
 'Meniere''s disease (endolymphatic hydrops) pharmacotherapy targets reducing endolymph (DIURETICS — e.g. hydrochlorothiazide), suppressing vestibular symptoms (ANTIHISTAMINES — e.g. cinnarizine, betahistine), and controlling nausea/vomiting (ANTIEMETICS — e.g. prochlorperazine). Glucocorticoids are used in some refractory cases but the standard triad is diuretics, antihistamines and antiemetics.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 — Post below-knee amputation in diabetic
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Amputation Nursing Care',
 'Post below-knee amputation in a patient with diabetes poses the risk of:',
 'Haemorrhage',
 'Oedema of the stump',
 'Contractures',
 'Wound dehiscence',
 'D',
 'Diabetic patients have impaired wound healing due to microvascular disease, hyperglycaemia, glycosylation of collagen and increased infection risk. The most distinctive post-amputation complication in diabetes is wound DEHISCENCE/non-healing of the stump. Haemorrhage, oedema and contractures can occur in any amputation patient — but wound dehiscence is the diabetes-specific risk.',
 'medium', 'approved', NULL, 'Paper I');

-- Q12 — Ulcerative colitis: bed rest rationale
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Patients with ulcerative colitis are put on bed rest mainly to:',
 'Prevent falls that can cause massive bleeding',
 'Reduce oxygen demand',
 'Reduce intestinal peristalsis',
 'Conserve energy',
 'C',
 'In an acute flare of ulcerative colitis, rest reduces peristaltic activity, decreasing diarrhoea frequency and giving the inflamed bowel time to recover. It also reduces metabolic demand, but the SPECIFIC gastrointestinal rationale is reduced peristalsis.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Normal CSF
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Diagnostics',
 'Normal cerebrospinal fluid:',
 'Contains red blood cells and white blood cells',
 'Tests negative for glucose and protein (contains only trace amounts)',
 'Appears clear and turbid',
 'Appears slightly cloudy and turbid',
 'B',
 'Normal CSF appears clear and colourless. It contains no RBCs, has 0–5 lymphocytes/mm3, glucose approximately 50–80 mg/dL (about two-thirds of plasma) and protein 15–45 mg/dL. RBCs are absent; CSF has only trace glucose and protein. Turbid CSF is abnormal (infection, haemorrhage).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Diagnostics',
 'Normal cerebrospinal fluid:',
 'Contains red blood cells and white blood cells',
 'Tests negative for glucose and protein (contains only trace amounts)',
 'Appears clear and turbid',
 'Appears slightly cloudy and turbid',
 'B',
 'Normal CSF appears clear and colourless. It contains no RBCs, has 0–5 lymphocytes/mm3, glucose approximately 50–80 mg/dL (about two-thirds of plasma) and protein 15–45 mg/dL. RBCs are absent; CSF has only trace glucose and protein. Turbid CSF is abnormal (infection, haemorrhage).',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Post retinal detachment repair: priority
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'Following repair of retinal detachment, the priority nursing action is to:',
 'Prevent increased intraocular pressure',
 'Alleviate pain and itchiness',
 'Maintain a darkened room',
 'Promote a low-sodium diet',
 'A',
 'After scleral buckling/vitrectomy with intraocular gas tamponade, raised IOP is the principal threat — it can compromise optic nerve perfusion and disturb the surgical repair. Nursing priorities: positioning as ordered (e.g. face-down for gas tamponade), avoid Valsalva manoeuvre (no straining, coughing, bending), administer IOP-lowering medication, and avoid air travel while gas bubble is present.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'Following repair of retinal detachment, the priority nursing action is to:',
 'Prevent increased intraocular pressure',
 'Alleviate pain and itchiness',
 'Maintain a darkened room',
 'Promote a low-sodium diet',
 'A',
 'After scleral buckling/vitrectomy with intraocular gas tamponade, raised IOP is the principal threat — it can compromise optic nerve perfusion and disturb the surgical repair. Nursing priorities: positioning as ordered (e.g. face-down for gas tamponade), avoid Valsalva manoeuvre (no straining, coughing, bending), administer IOP-lowering medication, and avoid air travel while gas bubble is present.',
 'hard', 'approved', NULL, 'Paper I');

-- Q15 — Urinary catheter insertion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Nursing Procedures',
 'Insertion of a urinary catheter is facilitated by requesting the patient to:',
 'Bear down',
 'Breathe deeply',
 'Turn to the side',
 'Hold the labia or shaft of penis',
 'B',
 'Deep, slow breathing relaxes the external urethral sphincter and pelvic floor, easing passage of the catheter past the membranous urethra (the narrowest point in males). Bearing down increases sphincter resistance; turning to the side or holding the genitals is the nurse''s role, not the patient''s.',
 'easy', 'approved', NULL, 'Paper I');

-- Q16 — Acute pancreatitis clinical manifestations
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The typical clinical manifestations of acute pancreatitis include:',
 'Hypertension, epigastric pain, abdominal swelling',
 'Acute epigastric pain, respiratory distress, hypotension',
 'Dyspnoea, hypertension, hypoglycaemia',
 'Hypervolaemia, tachypnoea, hyperglycaemia',
 'B',
 'Acute pancreatitis classically presents with severe, sudden EPIGASTRIC pain radiating to the back, with nausea/vomiting. Massive third-spacing of fluid into the retroperitoneum causes HYPOVOLAEMIA/hypotension. Pleural effusion, ARDS and atelectasis cause RESPIRATORY DISTRESS. Hyperglycaemia (not hypoglycaemia) occurs from islet damage. Option B captures the classic triad.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The typical clinical manifestations of acute pancreatitis include:',
 'Hypertension, epigastric pain, abdominal swelling',
 'Acute epigastric pain, respiratory distress, hypotension',
 'Dyspnoea, hypertension, hypoglycaemia',
 'Hypervolaemia, tachypnoea, hyperglycaemia',
 'B',
 'Acute pancreatitis classically presents with severe, sudden EPIGASTRIC pain radiating to the back, with nausea/vomiting. Massive third-spacing of fluid into the retroperitoneum causes HYPOVOLAEMIA/hypotension. Pleural effusion, ARDS and atelectasis cause RESPIRATORY DISTRESS. Hyperglycaemia (not hypoglycaemia) occurs from islet damage. Option B captures the classic triad.',
 'hard', 'approved', NULL, 'Paper I');

-- Q17 — Seizure type: only affects a finger or hand
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The type of seizure which may only affect a finger or hand is:',
 'Petit mal seizure',
 'Complex partial seizure',
 'Absence seizure',
 'Simple partial seizure',
 'D',
 'Simple partial (focal aware) seizures arise from a focal area of cortex without loss of consciousness; if the focus is in the motor strip, the seizure may produce twitching limited to one body part (e.g., a finger or hand), sometimes spreading along the motor homunculus (Jacksonian march). Petit mal/absence seizures cause brief unresponsiveness with no localised motor signs; complex partial seizures impair awareness.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The type of seizure which may only affect a finger or hand is:',
 'Petit mal seizure',
 'Complex partial seizure',
 'Absence seizure',
 'Simple partial seizure',
 'D',
 'Simple partial (focal aware) seizures arise from a focal area of cortex without loss of consciousness; if the focus is in the motor strip, the seizure may produce twitching limited to one body part (e.g., a finger or hand), sometimes spreading along the motor homunculus (Jacksonian march). Petit mal/absence seizures cause brief unresponsiveness with no localised motor signs; complex partial seizures impair awareness.',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Organisms with bacterial and viral characteristics
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Infection and Microbiology',
 'Microorganisms that have both bacterial and viral characteristics include:',
 'Mycoplasma, spirochetes',
 'Rickettsia, chlamydia',
 'Plasmodium, mycoplasma',
 'Spirochetes, chlamydia',
 'B',
 'Rickettsiae and Chlamydiae are unusual bacteria that, like viruses, are OBLIGATE INTRACELLULAR parasites — they cannot replicate outside host cells because they lack the metabolic machinery to make their own ATP. However, they remain bacteria (have cell walls, ribosomes, both DNA and RNA, and are sensitive to antibiotics). This bridge status between bacteria and viruses is the classic teaching point.',
 'hard', 'approved', NULL, 'Paper I');

-- Q19 — Impetigo contagiosa
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'Impetigo contagiosa is:',
 'Primarily the result of allergies',
 'A fungal infection',
 'Best treated with benzyl benzoate',
 'Caused by beta haemolytic streptococcus',
 'D',
 'Impetigo contagiosa is a superficial bacterial skin infection caused chiefly by Staphylococcus aureus and/or Streptococcus pyogenes (group A beta-haemolytic streptococcus). It is highly contagious in children. Treatment: topical fusidic acid or mupirocin, plus oral cloxacillin/flucloxacillin if extensive. Benzyl benzoate is used for scabies, not impetigo.',
 'easy', 'approved', NULL, 'Paper I');

-- Q20 — Dumping syndrome prevention post gastrectomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Gastrointestinal Surgery',
 'The following discharge instruction to a patient following gastrectomy will prevent dumping syndrome:',
 'Ambulate following a meal',
 'Eat high carbohydrate foods',
 'Limit the fluid taken with meals',
 'Sit in a high-Fowler''s position during meals',
 'C',
 'Dumping syndrome occurs when rapid emptying of hyperosmolar gastric contents into the jejunum draws fluid from the vascular space. Preventive instructions: small, frequent, dry meals; LIMIT fluids with meals (drink 30 min before/after instead); low carbohydrate, high protein/fat; lie down after meals; avoid ambulation immediately post-meal. High Fowler''s and ambulation accelerate gastric emptying.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Gastrointestinal Surgery',
 'The following discharge instruction to a patient following gastrectomy will prevent dumping syndrome:',
 'Ambulate following a meal',
 'Eat high carbohydrate foods',
 'Limit the fluid taken with meals',
 'Sit in a high-Fowler''s position during meals',
 'C',
 'Dumping syndrome occurs when rapid emptying of hyperosmolar gastric contents into the jejunum draws fluid from the vascular space. Preventive instructions: small, frequent, dry meals; LIMIT fluids with meals (drink 30 min before/after instead); low carbohydrate, high protein/fat; lie down after meals; avoid ambulation immediately post-meal. High Fowler''s and ambulation accelerate gastric emptying.',
 'medium', 'approved', NULL, 'Paper I');


-- ─── SET 3 ────────────────────────────────────────────────────────────────────

-- Q1 — Risk factors for impaired gas exchange and pulmonary infection
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The following are risk factors for impaired gas exchange and pulmonary infection:',
 'Immobility, constipation and incontinence',
 'Fluid restriction, immunosuppression and decreased level of consciousness',
 'Fluid restriction, immobility and ingestion of seasoned foods',
 'Incontinence, chemotherapy and anaemia',
 'B',
 'Fluid restriction leads to thick tenacious secretions difficult to clear; immunosuppression reduces clearance of pathogens; decreased level of consciousness impairs the cough/gag reflex, causes atelectasis and increases aspiration risk. Constipation, incontinence and food seasoning are not direct respiratory risk factors.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The following are risk factors for impaired gas exchange and pulmonary infection:',
 'Immobility, constipation and incontinence',
 'Fluid restriction, immunosuppression and decreased level of consciousness',
 'Fluid restriction, immobility and ingestion of seasoned foods',
 'Incontinence, chemotherapy and anaemia',
 'B',
 'Fluid restriction leads to thick tenacious secretions difficult to clear; immunosuppression reduces clearance of pathogens; decreased level of consciousness impairs the cough/gag reflex, causes atelectasis and increases aspiration risk. Constipation, incontinence and food seasoning are not direct respiratory risk factors.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Buck's traction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'Buck''s traction is:',
 'A form of skin traction and is often used to relieve muscle spasms',
 'A form of skeletal traction for compound fractures',
 'Only used in correction of hip and femur fractures',
 'Always contra-indicated in obese patients',
 'A',
 'Buck''s extension is a temporary SKIN traction (5–8 lb weight) applied to a single straight leg. It is used short-term to immobilise a hip or femur fracture, relieve muscle spasm, and reduce pain before definitive surgery. It is NOT skeletal traction (which involves pins through bone) and is not limited to hip/femur. Obesity makes skin traction less effective but is not an absolute contraindication.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Open angle glaucoma treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'Open angle glaucoma is mainly treated using:',
 'Proton pump inhibitors, quinolones and glycosides',
 'Antibiotics, osmotic diuretics and haematinics',
 'Miotics, carbonic anhydrase inhibitors and epinephrine',
 'Stool softeners, antihypertensives and miotics',
 'C',
 'Primary open-angle glaucoma is managed by lowering intra-ocular pressure. Drug classes used: MIOTICS (pilocarpine — increase aqueous outflow); CARBONIC ANHYDRASE INHIBITORS (acetazolamide, dorzolamide — decrease aqueous production); BETA-BLOCKERS (timolol); PROSTAGLANDIN ANALOGUES (latanoprost); ADRENERGIC AGONISTS like epinephrine/brimonidine. Option C lists three valid classes.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Nursing patient on steroids
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Corticosteroid Therapy',
 'When nursing a patient on steroids, the nurse should:',
 'Observe for oedema, weigh daily, monitor blood counts',
 'Maintain infection control, monitor blood sugar, maintain hydration',
 'Observe for bone marrow suppression, minimise exposure to heat, encourage bed rest',
 'Encourage increased fluid intake, administer antiemetics, monitor RBC count',
 'B',
 'Glucocorticoids cause immunosuppression (need strict infection control), HYPERGLYCAEMIA/steroid-induced diabetes (monitor blood sugar), and fluid/sodium retention (maintain hydration but watch for oedema). Bone marrow suppression is characteristic of cytotoxic chemotherapy, not steroids. Option B covers the three principal monitoring areas.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Corticosteroid Therapy',
 'When nursing a patient on steroids, the nurse should:',
 'Observe for oedema, weigh daily, monitor blood counts',
 'Maintain infection control, monitor blood sugar, maintain hydration',
 'Observe for bone marrow suppression, minimise exposure to heat, encourage bed rest',
 'Encourage increased fluid intake, administer antiemetics, monitor RBC count',
 'B',
 'Glucocorticoids cause immunosuppression (need strict infection control), HYPERGLYCAEMIA/steroid-induced diabetes (monitor blood sugar), and fluid/sodium retention (maintain hydration but watch for oedema). Bone marrow suppression is characteristic of cytotoxic chemotherapy, not steroids. Option B covers the three principal monitoring areas.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Morphine in acute heart failure/pulmonary oedema
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'In acute heart failure with pulmonary oedema, morphine is administered in small doses to:',
 'Promote excretion of sodium and water by kidneys',
 'Relieve hypoxaemia and dyspnoea',
 'Delay release of calcium from intracellular reservoirs',
 'Reduce peripheral resistance and venous return',
 'D',
 'Small-dose IV morphine in acute pulmonary oedema causes VENODILATION (reduces preload/venous return) and mild arterial dilation (reduces afterload), thereby decreasing pulmonary capillary pressure. It also reduces anxiety and the sympathetic drive contributing to high systemic vascular resistance. The haemodynamic mechanism is the NCK expected answer.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'In acute heart failure with pulmonary oedema, morphine is administered in small doses to:',
 'Promote excretion of sodium and water by kidneys',
 'Relieve hypoxaemia and dyspnoea',
 'Delay release of calcium from intracellular reservoirs',
 'Reduce peripheral resistance and venous return',
 'D',
 'Small-dose IV morphine in acute pulmonary oedema causes VENODILATION (reduces preload/venous return) and mild arterial dilation (reduces afterload), thereby decreasing pulmonary capillary pressure. It also reduces anxiety and the sympathetic drive contributing to high systemic vascular resistance. The haemodynamic mechanism is the NCK expected answer.',
 'hard', 'approved', NULL, 'Paper I');

-- Q6 — Common causative organism for pharyngitis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The common causative organism for pharyngitis is:',
 'Group B, beta haemolytic streptococcus',
 'Group A, beta haemolytic streptococcus',
 'Haemophilus influenzae',
 'Staphylococcus aureus',
 'B',
 'Bacterial pharyngitis is most commonly caused by Streptococcus pyogenes — Lancefield GROUP A beta-haemolytic streptococcus (GAS). GAS is also the trigger for rheumatic fever and post-streptococcal glomerulonephritis, so accurate diagnosis and treatment with penicillin matter. Group B strep colonises the vagina and causes neonatal sepsis, not pharyngitis.',
 'easy', 'approved', NULL, 'Paper I');

-- Q7 — Pulmonary embolism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'In pulmonary embolism (PE):',
 'There is a clot formation in the pulmonary vein and or its branches',
 'There is obstruction of the pulmonary artery or one of its branches',
 'Trauma, pregnancy and valsalva manoeuvres are common predisposing factors',
 'Old age, heart failure and intestinal obstruction clients are more prone',
 'B',
 'Pulmonary embolism is obstruction of the pulmonary ARTERY or one of its branches, usually by a thrombus that has embolised from a deep vein (DVT). Virchow''s triad of risk factors: stasis (immobility, long flights, prolonged surgery), hypercoagulability (pregnancy, OCPs, malignancy, thrombophilias), endothelial injury (trauma, surgery). Valsalva is not a recognised classic risk factor.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'In pulmonary embolism (PE):',
 'There is a clot formation in the pulmonary vein and or its branches',
 'There is obstruction of the pulmonary artery or one of its branches',
 'Trauma, pregnancy and valsalva manoeuvres are common predisposing factors',
 'Old age, heart failure and intestinal obstruction clients are more prone',
 'B',
 'Pulmonary embolism is obstruction of the pulmonary ARTERY or one of its branches, usually by a thrombus that has embolised from a deep vein (DVT). Virchow''s triad of risk factors: stasis (immobility, long flights, prolonged surgery), hypercoagulability (pregnancy, OCPs, malignancy, thrombophilias), endothelial injury (trauma, surgery). Valsalva is not a recognised classic risk factor.',
 'medium', 'approved', NULL, 'Paper I');

-- Q8 — CVP monitoring purpose
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Monitoring',
 'The purpose of monitoring central venous pressure (CVP) for the critically ill patient is to:',
 'Help assess the functioning of the left side of the heart',
 'Monitor fluid replacement therapy',
 'Estimate the levels of pulmonary pressures in the critically ill',
 'Help assess functioning of the mitral and tricuspid valves',
 'B',
 'CVP, measured in the superior vena cava/right atrium, reflects right-heart preload and intravascular volume status. Its clinical use is to guide fluid resuscitation (low CVP suggests under-filling; rising CVP with fluid challenge suggests adequate filling). It does NOT reliably reflect left-heart function or pulmonary pressures (those need PA catheterisation or echocardiography).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Monitoring',
 'The purpose of monitoring central venous pressure (CVP) for the critically ill patient is to:',
 'Help assess the functioning of the left side of the heart',
 'Monitor fluid replacement therapy',
 'Estimate the levels of pulmonary pressures in the critically ill',
 'Help assess functioning of the mitral and tricuspid valves',
 'B',
 'CVP, measured in the superior vena cava/right atrium, reflects right-heart preload and intravascular volume status. Its clinical use is to guide fluid resuscitation (low CVP suggests under-filling; rising CVP with fluid challenge suggests adequate filling). It does NOT reliably reflect left-heart function or pulmonary pressures (those need PA catheterisation or echocardiography).',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Antidote for heparin
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Anticoagulant Therapy',
 'The antidote for heparin is:',
 'Vitamin K',
 'Warfarin (Coumadin)',
 'Thrombin',
 'Protamine sulphate',
 'D',
 'Protamine sulphate is a strongly basic protein that binds acidic heparin to form an inactive complex — it is the specific antidote for heparin overdose/reversal. Vitamin K reverses WARFARIN (which inhibits vitamin-K-dependent clotting factors). 1 mg protamine neutralises approximately 100 units of heparin.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Anticoagulant Therapy',
 'The antidote for heparin is:',
 'Vitamin K',
 'Warfarin (Coumadin)',
 'Thrombin',
 'Protamine sulphate',
 'D',
 'Protamine sulphate is a strongly basic protein that binds acidic heparin to form an inactive complex — it is the specific antidote for heparin overdose/reversal. Vitamin K reverses WARFARIN (which inhibits vitamin-K-dependent clotting factors). 1 mg protamine neutralises approximately 100 units of heparin.',
 'easy', 'approved', NULL, 'Paper I');

-- Q10 — Frontal lobe function
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Neuroanatomy',
 'The frontal lobe of the brain is:',
 'The primary receptive area for vision',
 'Mainly responsible for auditory sensation and coordination',
 'The centre for respiratory and vasomotor activity',
 'Responsible for abstract thinking, judgement and emotions',
 'D',
 'The frontal lobe houses higher executive functions: judgement, planning, abstract reasoning, personality, voluntary movement (motor strip) and Broca''s area for expressive speech. Occipital lobe = vision; temporal = hearing; medulla oblongata (brainstem) = respiratory/vasomotor centres.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Neuroanatomy',
 'The frontal lobe of the brain is:',
 'The primary receptive area for vision',
 'Mainly responsible for auditory sensation and coordination',
 'The centre for respiratory and vasomotor activity',
 'Responsible for abstract thinking, judgement and emotions',
 'D',
 'The frontal lobe houses higher executive functions: judgement, planning, abstract reasoning, personality, voluntary movement (motor strip) and Broca''s area for expressive speech. Occipital lobe = vision; temporal = hearing; medulla oblongata (brainstem) = respiratory/vasomotor centres.',
 'easy', 'approved', NULL, 'Paper I');

-- Q11 — Dumping syndrome cause (slightly different wording from Set 4 Q9 — both included)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Gastrointestinal Surgery',
 'Dumping syndrome is as a result of:',
 'Rapid emptying of hypertonic food from the stomach into the jejunum',
 'Failure of a patient with a peptic ulcer to eat regularly',
 'Chronic anaemia among the elderly patients',
 'Loss of the large intestine functionality following hemicolectomy',
 'A',
 'Dumping syndrome follows gastric surgery. The stomach can no longer regulate emptying, so hypertonic/hyperosmolar food rushes into the jejunum. Fluid shifts into the bowel lumen causing vascular volume drop, hypotension, tachycardia, diaphoresis, dizziness and diarrhoea (early dumping, 15–30 min) or reactive hypoglycaemia (late dumping, 1–3 hr).',
 'medium', 'approved', NULL, 'Paper I');

-- Q12 — Post cataract surgery nausea
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Eye Surgery',
 'After cataract surgery, if a patient complains of nausea, the nurse should:',
 'Instruct patient to perform deep breaths until the nausea reduces',
 'Administer antiemetic to prevent intraocular pressure elevation',
 'Ensure a vomiting bowl is placed close to the patient',
 'Reassure the patient that it is a common feeling post general anaesthesia',
 'B',
 'Vomiting raises intra-ocular pressure via Valsalva, threatening the fresh wound (wound dehiscence, expulsive haemorrhage, dislocation of intraocular lens). Antiemetics are given prophylactically to PREVENT vomiting. Deep breathing alone is inadequate; merely placing a basin allows vomiting to occur and risk the surgical repair.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Eye Surgery',
 'After cataract surgery, if a patient complains of nausea, the nurse should:',
 'Instruct patient to perform deep breaths until the nausea reduces',
 'Administer antiemetic to prevent intraocular pressure elevation',
 'Ensure a vomiting bowl is placed close to the patient',
 'Reassure the patient that it is a common feeling post general anaesthesia',
 'B',
 'Vomiting raises intra-ocular pressure via Valsalva, threatening the fresh wound (wound dehiscence, expulsive haemorrhage, dislocation of intraocular lens). Antiemetics are given prophylactically to PREVENT vomiting. Deep breathing alone is inadequate; merely placing a basin allows vomiting to occur and risk the surgical repair.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Immediate post-operative nursing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'Immediately post-operatively a nurse should:',
 'Position a patient in recovery position, measure urine output and assess respirations every 15 minutes',
 'Maintain patent airway, measure central venous pressure and check oxygen saturation levels',
 'Position patient in recovery position, observe adverse effects of anaesthesia and assess reflexes',
 'Check IV site for infiltration, administer clear oral fluids and monitor vital signs every 15 minutes',
 'C',
 'Immediately post-op (recovery room): place the still-sedated patient in the recovery (left lateral) position to keep the airway clear and prevent aspiration; observe for adverse effects of anaesthesia (laryngospasm, hypoventilation, hypothermia, vomiting, residual neuromuscular blockade); assess return of protective reflexes (gag, cough, swallow). Oral fluids are not given until fully awake.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'Immediately post-operatively a nurse should:',
 'Position a patient in recovery position, measure urine output and assess respirations every 15 minutes',
 'Maintain patent airway, measure central venous pressure and check oxygen saturation levels',
 'Position patient in recovery position, observe adverse effects of anaesthesia and assess reflexes',
 'Check IV site for infiltration, administer clear oral fluids and monitor vital signs every 15 minutes',
 'C',
 'Immediately post-op (recovery room): place the still-sedated patient in the recovery (left lateral) position to keep the airway clear and prevent aspiration; observe for adverse effects of anaesthesia (laryngospasm, hypoventilation, hypothermia, vomiting, residual neuromuscular blockade); assess return of protective reflexes (gag, cough, swallow). Oral fluids are not given until fully awake.',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 SKIPPED — exact duplicate of Set 1 Q14 (COPD vaccination)
-- Q15 SKIPPED — exact duplicate of Set 1 Q15 (NG tube removal oral hygiene)

-- Q16 — Pre-renal failure causes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The causes of pre-renal failure include:',
 'Renal calculi, benign prostatic hypertrophy and blood clots',
 'Tubular necrosis, septic shock and haemolytic blood reaction transfusion',
 'Haemorrhage, burns and dehydration',
 'Tumours, trauma and chemical toxicity',
 'C',
 'Pre-renal acute kidney injury is caused by reduced renal perfusion — HAEMORRHAGE, severe BURNS (third-spacing), DEHYDRATION, GI losses, cardiogenic and septic shock all reduce effective circulating volume. Option A describes POST-renal (obstructive) causes. Options B and D describe intrinsic/intra-renal causes (acute tubular necrosis from nephrotoxins or ischaemia).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The causes of pre-renal failure include:',
 'Renal calculi, benign prostatic hypertrophy and blood clots',
 'Tubular necrosis, septic shock and haemolytic blood reaction transfusion',
 'Haemorrhage, burns and dehydration',
 'Tumours, trauma and chemical toxicity',
 'C',
 'Pre-renal acute kidney injury is caused by reduced renal perfusion — HAEMORRHAGE, severe BURNS (third-spacing), DEHYDRATION, GI losses, cardiogenic and septic shock all reduce effective circulating volume. Option A describes POST-renal (obstructive) causes. Options B and D describe intrinsic/intra-renal causes (acute tubular necrosis from nephrotoxins or ischaemia).',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — KUB X-ray preparation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Diagnostics',
 'For a patient to undergo a kidney, ureter and bladder X-ray (KUB) it is important for the nurse to know that:',
 'There is no special preparation required',
 'Oral fluids must be withheld the morning of the examination',
 'The patient should have a full bladder before the procedure',
 'An enema should be administered before the procedure',
 'A',
 'KUB (plain abdominal/pelvis radiograph) requires no special preparation — no contrast, no fasting, no bowel prep. The patient simply removes any radio-opaque clothing/jewellery and lies supine. Bowel prep is needed for IVU (intravenous urogram), and full bladder for pelvic ultrasound, not KUB.',
 'easy', 'approved', NULL, 'Paper I');

-- Q18 — Treatment of megaloblastic anaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Treatment of megaloblastic anaemia includes:',
 'Chemotherapy, radiotherapy, hydration',
 'Oxygen therapy, hydration and iron supplements',
 'Blood transfusion, iron supplements, splenectomy',
 'Oxygen therapy, folate supplements, alcohol restriction',
 'D',
 'Megaloblastic anaemia is due to folate or vitamin B12 deficiency. Treatment is folate +/- B12 replacement, oxygen support if severe, dietary correction, AND alcohol restriction (alcohol impairs folate absorption, utilisation and storage and is a major risk factor in chronic users). Iron is for IRON-deficiency (microcytic) anaemia, not megaloblastic.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 T/F split → two standalone MCQs
-- Q19a — Asthma vs COPD
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Which of the following correctly distinguishes asthma from chronic obstructive pulmonary disease (COPD)?',
 'Asthma is a form of COPD characterised by irreversible airflow obstruction',
 'Asthma and COPD are the same condition treated identically',
 'Asthma is characterised by reversible airflow obstruction and is classified separately from COPD',
 'COPD is more common in children than asthma',
 'C',
 'Asthma is distinct from COPD: asthma is characterised by REVERSIBLE airflow obstruction with eosinophilic airway inflammation, while COPD (chronic bronchitis and emphysema) is largely IRREVERSIBLE airflow obstruction with neutrophilic inflammation. There is overlap (Asthma-COPD overlap syndrome) but they are distinct conditions.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Which of the following correctly distinguishes asthma from chronic obstructive pulmonary disease (COPD)?',
 'Asthma is a form of COPD characterised by irreversible airflow obstruction',
 'Asthma and COPD are the same condition treated identically',
 'Asthma is characterised by reversible airflow obstruction and is classified separately from COPD',
 'COPD is more common in children than asthma',
 'C',
 'Asthma is distinct from COPD: asthma is characterised by REVERSIBLE airflow obstruction with eosinophilic airway inflammation, while COPD (chronic bronchitis and emphysema) is largely IRREVERSIBLE airflow obstruction with neutrophilic inflammation. There is overlap (Asthma-COPD overlap syndrome) but they are distinct conditions.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19b — Malignant neoplasms cell characteristics
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Which of the following correctly describes the cellular characteristics of malignant neoplasms?',
 'They are composed of well-differentiated, mature cells with normal tissue architecture',
 'They comprise poorly differentiated, immature (anaplastic) cells',
 'They are always encapsulated and do not invade surrounding tissue',
 'They have a low nucleus-to-cytoplasm ratio with few mitotic figures',
 'B',
 'Malignant cells are anaplastic/poorly differentiated, with pleomorphism, high nucleus-to-cytoplasm ratio, atypical mitoses and loss of normal tissue architecture. They invade surrounding tissues and metastasise. Well-differentiated cells with normal architecture and encapsulation are features of BENIGN neoplasms.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Which of the following correctly describes the cellular characteristics of malignant neoplasms?',
 'They are composed of well-differentiated, mature cells with normal tissue architecture',
 'They comprise poorly differentiated, immature (anaplastic) cells',
 'They are always encapsulated and do not invade surrounding tissue',
 'They have a low nucleus-to-cytoplasm ratio with few mitotic figures',
 'B',
 'Malignant cells are anaplastic/poorly differentiated, with pleomorphism, high nucleus-to-cytoplasm ratio, atypical mitoses and loss of normal tissue architecture. They invade surrounding tissues and metastasise. Well-differentiated cells with normal architecture and encapsulation are features of BENIGN neoplasms.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Cellulitis management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'For a patient with cellulitis, the nurse should:',
 'Apply warm compresses to the site and elevate the affected extremity',
 'Apply cold compresses to the site and elevate the affected extremity',
 'Administer topical antibiotics and oral analgesics as prescribed',
 'Administer plasma expanders and elevate the affected limb to 90 degrees',
 'A',
 'Nursing management of cellulitis includes WARM moist compresses (improve local circulation and antibiotic delivery), ELEVATION of the affected limb (reduces oedema), rest, and systemic (not topical) antibiotics — typically anti-staphylococcal penicillins like flucloxacillin/cloxacillin. Topical antibiotics do not penetrate cellulitis adequately. Cold worsens vasoconstriction.',
 'easy', 'approved', NULL, 'Paper I');

-- ─── SET 4 ────────────────────────────────────────────────────────────────────

-- Q1 — Brain concussion: talk and alert, equal pupils
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'In cases of brain injury, temporary loss of consciousness followed by alertness with equal pupils indicates:',
 'Subdural haematoma',
 'Brain contusion',
 'Brain concussion',
 'Intracranial haematoma',
 'C',
 'A concussion is a transient functional disturbance of the brain without structural injury, causing brief LOC, confusion, possibly amnesia — followed by full recovery and a normal neurological exam (equal, reactive pupils). Subdural/intracranial haematomas produce focal deficits, persistent altered consciousness and often unequal pupils. Contusion is bruising of brain tissue with focal signs.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'In cases of brain injury, temporary loss of consciousness followed by alertness with equal pupils indicates:',
 'Subdural haematoma',
 'Brain contusion',
 'Brain concussion',
 'Intracranial haematoma',
 'C',
 'A concussion is a transient functional disturbance of the brain without structural injury, causing brief LOC, confusion, possibly amnesia — followed by full recovery and a normal neurological exam (equal, reactive pupils). Subdural/intracranial haematomas produce focal deficits, persistent altered consciousness and often unequal pupils. Contusion is bruising of brain tissue with focal signs.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Counselling: confidentiality (Paper II — Professional Issues)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Professional Nursing Practice',
 'While counselling a patient, the nurse should:',
 'Make good decisions for the patient',
 'Keep confidentiality of the patient''s problems',
 'Be judgemental throughout the session',
 'Hide certain harmful information from the patient',
 'B',
 'Core counselling principles and a core ethical duty under the NCK Code of Conduct: CONFIDENTIALITY, non-judgemental attitude, empathy, autonomy (allow patients to make their own decisions), and honest disclosure. Withholding information violates informed consent and trust. Making decisions for the patient removes autonomy.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Professional Nursing Practice',
 'While counselling a patient, the nurse should:',
 'Make good decisions for the patient',
 'Keep confidentiality of the patient''s problems',
 'Be judgemental throughout the session',
 'Hide certain harmful information from the patient',
 'B',
 'Core counselling principles and a core ethical duty under the NCK Code of Conduct: CONFIDENTIALITY, non-judgemental attitude, empathy, autonomy (allow patients to make their own decisions), and honest disclosure. Withholding information violates informed consent and trust. Making decisions for the patient removes autonomy.',
 'easy', 'approved', NULL, 'Paper II');

-- Q3 — IMCI ear: criteria to refer (KRCHN only — basic paediatric protocol)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMCI Guidelines',
 'According to IMCI guidelines, the criteria to refer a child with an ear problem from a health centre is:',
 'Acute ear infection with pus discharge less than 14 days',
 'Chronic ear infection with pus discharge more than 14 days',
 'Tender swelling behind the ear',
 'Ear pain',
 'C',
 'Per Kenya IMCI ear-problem assessment: a child with tender swelling behind the ear is classified as MASTOIDITIS — a pink/danger classification requiring urgent referral after first dose of IM antibiotic and analgesic. Acute ear infection (<14 days pus) and chronic ear infection (≥14 days pus) are treated at the health centre with oral antibiotics and wicking; simple ear pain alone is no ear infection.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Only movable bone of skull (KRCHN only — anatomy recall)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Skeletal Anatomy',
 'The only movable bone of the human skull is the:',
 'Maxilla',
 'Temporal',
 'Mandible',
 'Zygomatic',
 'C',
 'The mandible (lower jaw) is the only freely movable bone of the skull, articulating with the temporal bone at the temporomandibular joint (TMJ). All other cranial and facial bones are united by immovable sutures (synarthroses).',
 'easy', 'approved', NULL, 'Paper I');

-- Q5 — Stress incontinence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Disorders',
 'The involuntary expulsion of urine that occurs during coughing is referred to as:',
 'Urgency incontinence',
 'Stress incontinence',
 'Overflow incontinence',
 'Urge incontinence',
 'B',
 'STRESS incontinence is leakage triggered by activities that raise intra-abdominal pressure — coughing, sneezing, laughing, lifting. It results from a weak pelvic floor or urethral sphincter (commonly post-childbirth or post-menopause). URGE incontinence is sudden uncontrollable desire to void (detrusor overactivity). OVERFLOW occurs in chronic retention (e.g. BPH).',
 'easy', 'approved', NULL, 'Paper I');

-- Q6 — Management of osteoporosis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Management of osteoporosis includes:',
 'Increased calcium intake, decreased coffee intake',
 'Performing weight bearing exercises, increased calcium intake',
 'Decreased calcium intake, engaging in regular moderate activity',
 'Cessation of smoking, avoiding weight bearing exercises',
 'B',
 'Osteoporosis prevention/management: weight-bearing and resistance exercise (stimulates osteoblast activity, increases bone mineral density), adequate calcium (1000–1200 mg/day) and vitamin D, smoking and alcohol cessation, and pharmacotherapy (bisphosphonates, HRT, denosumab). Option B directly addresses both bone-loading and mineral supply.',
 'easy', 'approved', NULL, 'Paper I');

-- Q7 — Maximum growth of head circumference
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Growth and Development',
 'Maximum growth of head circumference is attained at age of:',
 '1–3 years',
 '4–5 years',
 '7–8 years',
 '10–15 years',
 'B',
 'Head circumference (a proxy for brain growth) increases very rapidly in infancy. By 2 years it has reached about 80% of adult size. Approximately 90% of adult head circumference is attained by age 5, hence the answer 4–5 years for maximum near-final growth. After that, growth is minimal.',
 'easy', 'approved', NULL, 'Paper I');

-- Q8 — Sensation indicators of peripheral neuromuscular dysfunction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'Sensation indicators of peripheral neuromuscular dysfunction are:',
 'Cyanosis and paralysis',
 'Weakness and unrelenting pain',
 'Absence of feeling and pallor',
 'Absence of feeling and pain on passive stretch',
 'D',
 'Loss of sensation (paraesthesia/anaesthesia) signals nerve compromise, and PAIN ON PASSIVE STRETCH of a muscle group is the classic early sign of compartment syndrome. Together these are the SENSATION indicators of peripheral neuromuscular dysfunction. Cyanosis/pallor are vascular signs; paralysis is a late motor sign.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Dumping syndrome following gastrectomy (different stem from Set 3 Q11 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Gastrointestinal Surgery',
 'Following gastrectomy, dumping syndrome occurs as a result of:',
 'Reduced gastric motility resulting from vagus nerve stimulation',
 'Removal of acid-producing cells thus resulting in reduced absorption of vitamin B12',
 'Rapid gastric emptying of hyperosmolar fluid and substances into the duodenum',
 'Damage of vagus nerve and cardiac sphincter',
 'C',
 'Dumping syndrome = rapid passage of HYPEROSMOLAR gastric contents into the duodenum/jejunum, drawing fluid into the lumen causing hypovolaemia and autonomic symptoms 15–30 min after meals (early dumping). Late dumping (1–3 hr) results from reactive hypoglycaemia. Option B describes pernicious anaemia — a separate post-gastrectomy complication.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Gastrointestinal Surgery',
 'Following gastrectomy, dumping syndrome occurs as a result of:',
 'Reduced gastric motility resulting from vagus nerve stimulation',
 'Removal of acid-producing cells thus resulting in reduced absorption of vitamin B12',
 'Rapid gastric emptying of hyperosmolar fluid and substances into the duodenum',
 'Damage of vagus nerve and cardiac sphincter',
 'C',
 'Dumping syndrome = rapid passage of HYPEROSMOLAR gastric contents into the duodenum/jejunum, drawing fluid into the lumen causing hypovolaemia and autonomic symptoms 15–30 min after meals (early dumping). Late dumping (1–3 hr) results from reactive hypoglycaemia. Option B describes pernicious anaemia — a separate post-gastrectomy complication.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Priority intervention: peritoneal abscess
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Priority nursing intervention for a patient with a peritoneal abscess is to:',
 'Administer analgesic for pain relief',
 'Administer intravenous fluid',
 'Reassure the patient',
 'Administer parenteral nutrition',
 'B',
 'A peritoneal abscess causes significant third-spacing of fluid into the inflamed peritoneum and surrounding bowel, leading to hypovolaemia, tachycardia and risk of septic shock. The priority (after ABCs) is IV fluid resuscitation to restore circulating volume — alongside IV antibiotics and surgical/percutaneous drainage.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 — Palm TBSA (KRCHN only — basic recall)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
 'When estimating the size of burns, the palm of the patient''s hand represents a total body surface area of:',
 '3%',
 '1%',
 '4.5%',
 '9%',
 'B',
 'The palm (including fingers) is approximately 1% of total body surface area (TBSA) and is a useful quick estimate for small, irregular or scattered burns — both in adults and children. The rule of nines is used for larger contiguous areas.',
 'easy', 'approved', NULL, 'Paper I');

-- Q12 — Tympanoplasty health message (KRCHN only — basic post-op instruction)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Ear Surgery',
 'The health message given to a patient following tympanoplasty is:',
 'Drink fluids using a straw',
 'Avoid blowing the nose and sneeze through the mouth',
 'Administer saline water into the ear to aid healing',
 'Avoid noisy places up to two weeks post-operatively',
 'B',
 'After tympanoplasty/middle-ear surgery, the patient must avoid raising middle-ear pressure which would disrupt the graft. Specifically: do NOT blow the nose; SNEEZE WITH MOUTH OPEN; avoid Valsalva, straining, heavy lifting, flying and swimming. Drinking with a straw creates negative oral pressure transmitted via the Eustachian tube and is discouraged. Putting saline in the ear would soak the graft.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Most important nursing intervention for skin disorder
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The most important nursing intervention for a patient with a skin disorder is:',
 'Patient teaching',
 'Prevention of secondary infection',
 'Application of topical medication',
 'Counselling because of altered body image',
 'B',
 'The skin is the body''s primary barrier against infection. When integrity is breached (eczema, psoriasis, burns, ulcers), secondary bacterial infection is the most immediate physiological threat and the priority nursing focus — meticulous hygiene, sterile dressings, hand hygiene, prevention of scratching, monitoring for cellulitis.',
 'easy', 'approved', NULL, 'Paper I');

-- Q14 — Prothrombin and fibrinogen produced by
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Haematology',
 'Prothrombin and fibrinogen are produced by:',
 'Gall bladder',
 'Liver',
 'Pancreas',
 'Bone marrow',
 'B',
 'The liver synthesises most plasma proteins including clotting factors — fibrinogen (factor I), prothrombin (II), V, VII, IX, X, XI, XII, XIII. This is why liver failure causes coagulopathy and prolonged PT/INR.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Haematology',
 'Prothrombin and fibrinogen are produced by:',
 'Gall bladder',
 'Liver',
 'Pancreas',
 'Bone marrow',
 'B',
 'The liver synthesises most plasma proteins including clotting factors — fibrinogen (factor I), prothrombin (II), V, VII, IX, X, XI, XII, XIII. This is why liver failure causes coagulopathy and prolonged PT/INR.',
 'easy', 'approved', NULL, 'Paper I');

-- Q15 — Post inguinal herniorrhaphy: reduce scrotal oedema
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Abdominal Surgery',
 'The most appropriate nursing intervention to decrease post-operative oedema and pain following an inguinal herniorrhaphy is:',
 'Applying a truss to the hernia site',
 'Allowing the patient to stand to void',
 'Elevating the scrotum with a support',
 'Supporting the incision during coughing and deep breathing',
 'C',
 'After inguinal herniorrhaphy in males, scrotal oedema and haematoma are common because of the anatomical drainage path. Elevating the scrotum on a folded towel or scrotal support with ice application in the first 24 hours reduces oedema and pain. A truss is used PRE-operatively to support an unrepaired hernia.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Common bile duct obstruction: clinical features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'A patient with common bile duct obstruction related to cancer of the pancreas is likely to present with:',
 'Brown faeces, dark coloured urine',
 'Scleral icterus, melaena stool',
 'Dark coloured urine, scleral icterus',
 'Jaundice, brown faeces',
 'C',
 'Obstruction of the common bile duct prevents bilirubin from reaching the intestine. Conjugated bilirubin regurgitates into blood and is excreted in urine — DARK URINE. The lack of bile pigment in stool gives PALE (clay-coloured) stools, not brown or melaena. Jaundice (scleral icterus) results from circulating conjugated bilirubin. Option C captures two of the three classic features (dark urine and jaundice).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'A patient with common bile duct obstruction related to cancer of the pancreas is likely to present with:',
 'Brown faeces, dark coloured urine',
 'Scleral icterus, melaena stool',
 'Dark coloured urine, scleral icterus',
 'Jaundice, brown faeces',
 'C',
 'Obstruction of the common bile duct prevents bilirubin from reaching the intestine. Conjugated bilirubin regurgitates into blood and is excreted in urine — DARK URINE. The lack of bile pigment in stool gives PALE (clay-coloured) stools, not brown or melaena. Jaundice (scleral icterus) results from circulating conjugated bilirubin. Option C captures two of the three classic features (dark urine and jaundice).',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Pernicious anaemia: neurological symptoms
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'In addition to the general symptoms of anaemia, a patient with pernicious anaemia also manifests with:',
 'Coagulation deficiencies',
 'Low immunity',
 'Neurological symptoms',
 'Cardiovascular disturbances',
 'C',
 'Pernicious anaemia is autoimmune destruction of gastric parietal cells, eliminating intrinsic factor and hence vitamin B12 absorption. B12 is required for myelin synthesis, so deficiency causes sub-acute combined degeneration of the dorsal and lateral columns of the spinal cord — paraesthesia, loss of vibration and proprioception, ataxia, weakness and dementia. These NEUROLOGICAL symptoms distinguish pernicious anaemia from other anaemias.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'In addition to the general symptoms of anaemia, a patient with pernicious anaemia also manifests with:',
 'Coagulation deficiencies',
 'Low immunity',
 'Neurological symptoms',
 'Cardiovascular disturbances',
 'C',
 'Pernicious anaemia is autoimmune destruction of gastric parietal cells, eliminating intrinsic factor and hence vitamin B12 absorption. B12 is required for myelin synthesis, so deficiency causes sub-acute combined degeneration of the dorsal and lateral columns of the spinal cord — paraesthesia, loss of vibration and proprioception, ataxia, weakness and dementia. These NEUROLOGICAL symptoms distinguish pernicious anaemia from other anaemias.',
 'hard', 'approved', NULL, 'Paper I');

-- Q18 — Acute infective endocarditis nursing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Nursing interventions for a patient with acute infective endocarditis include:',
 'Early ambulation and activity progression',
 'Restricted activity for several weeks',
 'Low calorie diet',
 'Increased fluid intake',
 'B',
 'Infective endocarditis treatment is prolonged IV antibiotics (4–6 weeks) plus REST — activity is restricted to reduce cardiac workload while the valve heals/clears infection, and to prevent embolisation of vegetations. Adequate (not low) calorie intake supports the febrile, catabolic state.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Respiratory drive: CO2 stimulus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Respiratory Physiology',
 'Rapid and deeper respirations are stimulated by the respiratory centre of the brain when:',
 'Oxygen saturation levels are greater than 90%',
 'Carbon dioxide levels increase',
 'Alveoli contract',
 'The diaphragm contracts and lowers its dome',
 'B',
 'The primary chemical drive to breathing in normal physiology is arterial PaCO2 — central chemoreceptors in the medulla detect rising CO2 (and the resulting H+ in CSF) and stimulate the respiratory centre to increase rate and depth (hyperventilation), blowing off CO2. Peripheral chemoreceptors respond to low O2 — this becomes important only at PaO2 <60 mmHg.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Respiratory Physiology',
 'Rapid and deeper respirations are stimulated by the respiratory centre of the brain when:',
 'Oxygen saturation levels are greater than 90%',
 'Carbon dioxide levels increase',
 'Alveoli contract',
 'The diaphragm contracts and lowers its dome',
 'B',
 'The primary chemical drive to breathing in normal physiology is arterial PaCO2 — central chemoreceptors in the medulla detect rising CO2 (and the resulting H+ in CSF) and stimulate the respiratory centre to increase rate and depth (hyperventilation), blowing off CO2. Peripheral chemoreceptors respond to low O2 — this becomes important only at PaO2 <60 mmHg.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Addison's disease
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Addison''s disease results from:',
 'Decreased production of parathyroid hormone',
 'Excessive secretion of epinephrine and norepinephrine',
 'Inadequate secretion of glucocorticoids',
 'Over activity of parathyroid glands',
 'C',
 'Addison''s disease (primary adrenal insufficiency) is destruction of the adrenal cortex — autoimmune (commonest), TB, HIV, metastasis — causing deficiency of both GLUCOCORTICOIDS (cortisol) and MINERALOCORTICOIDS (aldosterone). Clinical features: hyperpigmentation, hypotension, hypoglycaemia, hyponatraemia, hyperkalaemia, weight loss, fatigue. Options A and D refer to parathyroid disorders; option B refers to phaeochromocytoma.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Addison''s disease results from:',
 'Decreased production of parathyroid hormone',
 'Excessive secretion of epinephrine and norepinephrine',
 'Inadequate secretion of glucocorticoids',
 'Over activity of parathyroid glands',
 'C',
 'Addison''s disease (primary adrenal insufficiency) is destruction of the adrenal cortex — autoimmune (commonest), TB, HIV, metastasis — causing deficiency of both GLUCOCORTICOIDS (cortisol) and MINERALOCORTICOIDS (aldosterone). Clinical features: hyperpigmentation, hypotension, hypoglycaemia, hyponatraemia, hyperkalaemia, weight loss, fatigue. Options A and D refer to parathyroid disorders; option B refers to phaeochromocytoma.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 5 ────────────────────────────────────────────────────────────────────

-- Q1 — Child on long-term corticosteroids: growth retardation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Pharmacology in Paediatrics',
 'A child on long term use of corticosteroids is at risk of:',
 'Growth retardation',
 'Peripheral neuropathy',
 'Muscular degeneration',
 'Hyperkalaemia',
 'A',
 'Long-term glucocorticoids in children suppress the hypothalamic-pituitary-growth-hormone axis and inhibit chondrocyte/osteoblast activity at the growth plate, producing GROWTH RETARDATION/short stature. Other paediatric concerns include osteoporosis, cataracts, immunosuppression and Cushingoid features. Hypokalaemia (not hyperkalaemia) occurs due to the mineralocorticoid effect.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Pharmacology in Paediatrics',
 'A child on long term use of corticosteroids is at risk of:',
 'Growth retardation',
 'Peripheral neuropathy',
 'Muscular degeneration',
 'Hyperkalaemia',
 'A',
 'Long-term glucocorticoids in children suppress the hypothalamic-pituitary-growth-hormone axis and inhibit chondrocyte/osteoblast activity at the growth plate, producing GROWTH RETARDATION/short stature. Other paediatric concerns include osteoporosis, cataracts, immunosuppression and Cushingoid features. Hypokalaemia (not hyperkalaemia) occurs due to the mineralocorticoid effect.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Pleural effusion: causes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Pleural effusion is a complication of:',
 'Heart failure, nephrotic syndrome, pulmonary tuberculosis',
 'Pneumonia, upper respiratory infections, post thoracotomy',
 'Penetrating chest trauma, bronchitis, haematogenous infection of the pleural space',
 'Pulmonary embolism, lung cancer, post thoracentesis',
 'A',
 'Pleural effusion is classified as TRANSUDATIVE (heart failure, nephrotic syndrome, liver cirrhosis — high hydrostatic pressure or low oncotic pressure) or EXUDATIVE (TB, pneumonia, malignancy, PE — inflammation/permeability). Option A gives one transudative (HF), one transudative-low-oncotic (nephrotic), and one exudative (TB) — all classic causes. Bronchitis alone is not a cause; thoracentesis treats, not causes, effusion.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Pleural effusion is a complication of:',
 'Heart failure, nephrotic syndrome, pulmonary tuberculosis',
 'Pneumonia, upper respiratory infections, post thoracotomy',
 'Penetrating chest trauma, bronchitis, haematogenous infection of the pleural space',
 'Pulmonary embolism, lung cancer, post thoracentesis',
 'A',
 'Pleural effusion is classified as TRANSUDATIVE (heart failure, nephrotic syndrome, liver cirrhosis — high hydrostatic pressure or low oncotic pressure) or EXUDATIVE (TB, pneumonia, malignancy, PE — inflammation/permeability). Option A gives one transudative (HF), one transudative-low-oncotic (nephrotic), and one exudative (TB) — all classic causes. Bronchitis alone is not a cause; thoracentesis treats, not causes, effusion.',
 'hard', 'approved', NULL, 'Paper I');

-- Q3a SKIPPED — exact duplicate of Set 3 Q19a (asthma vs COPD T/F already seeded)

-- Q3b — Chronic bronchitis definition (NEW T/F statement, standalone MCQ)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Which of the following correctly defines chronic bronchitis?',
 'Productive cough lasting at least one month in a single year',
 'Coughing and sputum production for at least 3 months in 2 consecutive years',
 'Irreversible destruction of alveolar walls causing hyperinflation',
 'Episodic reversible bronchoconstriction triggered by allergens',
 'B',
 'Chronic bronchitis is a CLINICAL diagnosis: productive cough on most days for at least 3 months in each of 2 CONSECUTIVE years (after exclusion of other causes) — per GOLD criteria. Alveolar wall destruction characterises EMPHYSEMA. Episodic reversible bronchoconstriction describes ASTHMA.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Which of the following correctly defines chronic bronchitis?',
 'Productive cough lasting at least one month in a single year',
 'Coughing and sputum production for at least 3 months in 2 consecutive years',
 'Irreversible destruction of alveolar walls causing hyperinflation',
 'Episodic reversible bronchoconstriction triggered by allergens',
 'B',
 'Chronic bronchitis is a CLINICAL diagnosis: productive cough on most days for at least 3 months in each of 2 CONSECUTIVE years (after exclusion of other causes) — per GOLD criteria. Alveolar wall destruction characterises EMPHYSEMA. Episodic reversible bronchoconstriction describes ASTHMA.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — CVP measurement: reference point
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Monitoring',
 'When measuring central venous pressure (CVP) the nurse should:',
 'Mark the location of the right atrium',
 'Identify the location of the left atrium',
 'Always ensure the patient lies in supine position',
 'Allow normal saline to drip rapidly into the client for 5 minutes before taking CVP reading',
 'A',
 'The CVP zero reference point must be at the right atrium — landmark is the 4th intercostal space at the mid-axillary line (the phlebostatic axis). The patient is positioned supine OR up to 45 degrees (consistency matters more than exact angle, provided the same zero is used). IV must not run rapidly during reading — only the manometer fluid level matters.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Monitoring',
 'When measuring central venous pressure (CVP) the nurse should:',
 'Mark the location of the right atrium',
 'Identify the location of the left atrium',
 'Always ensure the patient lies in supine position',
 'Allow normal saline to drip rapidly into the client for 5 minutes before taking CVP reading',
 'A',
 'The CVP zero reference point must be at the right atrium — landmark is the 4th intercostal space at the mid-axillary line (the phlebostatic axis). The patient is positioned supine OR up to 45 degrees (consistency matters more than exact angle, provided the same zero is used). IV must not run rapidly during reading — only the manometer fluid level matters.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Furuncles: causative organism (KRCHN only — basic recall)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'Furuncles (boils) are commonly caused by:',
 'Streptococcus pyogenes',
 'Clostridium tetani',
 'Staphylococcus aureus',
 'Bacillus aureus',
 'C',
 'A furuncle (boil) is a deep-seated infection of a hair follicle and surrounding tissue, almost always caused by Staphylococcus aureus. Multiple coalescent furuncles form a carbuncle. Bacillus aureus is not a recognised pathogen.',
 'easy', 'approved', NULL, 'Paper I');

-- Q6 — Stomatitis post-radiotherapy: health message (KRCHN only — patient education)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'The appropriate health message to a patient who develops stomatitis secondary to radiotherapy is:',
 'Gurgle with mouthwash and rinse thoroughly after each meal',
 'Use ice cold liquids such as tea or cola to relieve discomfort',
 'Use a toothbrush soaked in saline to clean the mouth',
 'Drink citrus juices',
 'C',
 'Radiation/chemo-induced stomatitis requires GENTLE oral care: a soft toothbrush softened further with warm saline; bland saline or sodium-bicarbonate rinses (NOT alcohol-based mouthwashes — they sting and dry the mucosa); avoid citrus, spicy, hot or alcoholic liquids (acidic foods irritate ulcers); offer cool bland fluids. Commercial mouthwash and cola are harmful to ulcerated mucosa.',
 'easy', 'approved', NULL, 'Paper I');

-- Q7 — Sympathetic stimulation of cardiovascular system
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'Sympathetic stimulation of the cardiovascular system causes:',
 'Increased heart rate and constriction of coronary arteries',
 'Constriction of GIT secretory gland vessels with increased flow of digestive juices',
 'Increased peripheral resistance and dilatation of coronary arteries',
 'Increased force of heart contraction and reduced peripheral resistance',
 'C',
 'Sympathetic "fight or flight" response: increased HR (beta-1), increased contractility (beta-1), DILATATION of coronary arteries (beta-2/metabolic demand — to perfuse the working heart), and INCREASED systemic peripheral resistance (alpha-1 vasoconstriction in skin, gut, kidneys to shunt blood to muscle and heart).',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'Sympathetic stimulation of the cardiovascular system causes:',
 'Increased heart rate and constriction of coronary arteries',
 'Constriction of GIT secretory gland vessels with increased flow of digestive juices',
 'Increased peripheral resistance and dilatation of coronary arteries',
 'Increased force of heart contraction and reduced peripheral resistance',
 'C',
 'Sympathetic "fight or flight" response: increased HR (beta-1), increased contractility (beta-1), DILATATION of coronary arteries (beta-2/metabolic demand — to perfuse the working heart), and INCREASED systemic peripheral resistance (alpha-1 vasoconstriction in skin, gut, kidneys to shunt blood to muscle and heart).',
 'hard', 'approved', NULL, 'Paper I');

-- Q8 — Immediate effects of burns on body fluids and electrolytes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
 'The immediate effects of burns on body fluids and electrolytes include:',
 'Hypokalaemia and hyponatraemia',
 'Reduced circulatory blood volume and hypernatraemia',
 'Hyponatraemia and hyperkalaemia',
 'Reduced urine output and hypokalaemia',
 'C',
 'Immediately after a major burn, massive capillary leak drives plasma (water and sodium) into the burned tissue and interstitium — circulating volume falls and more sodium is lost from plasma to the wound/interstitium causing HYPONATRAEMIA. Tissue destruction releases potassium from intracellular stores causing HYPERKALAEMIA. Reduced renal perfusion causes oliguria. After 48–72 hours (diuretic phase) the picture reverses.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Burns Management',
 'The immediate effects of burns on body fluids and electrolytes include:',
 'Hypokalaemia and hyponatraemia',
 'Reduced circulatory blood volume and hypernatraemia',
 'Hyponatraemia and hyperkalaemia',
 'Reduced urine output and hypokalaemia',
 'C',
 'Immediately after a major burn, massive capillary leak drives plasma (water and sodium) into the burned tissue and interstitium — circulating volume falls and more sodium is lost from plasma to the wound/interstitium causing HYPONATRAEMIA. Tissue destruction releases potassium from intracellular stores causing HYPERKALAEMIA. Reduced renal perfusion causes oliguria. After 48–72 hours (diuretic phase) the picture reverses.',
 'hard', 'approved', NULL, 'Paper I');

-- Q9 — Progressive pupillary dilatation in unconscious patient
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'When caring for an unconscious patient, progressive dilatation of the pupils indicates:',
 'Injury at the level of the midbrain',
 'Increasing intracranial pressure',
 'Coma is toxic or metabolic in origin',
 'Paralysis of cranial nerves V and VII',
 'B',
 'Progressive pupillary dilatation (initially unilateral, then bilateral non-reactive) reflects compression of CN III by transtentorial (uncal) herniation as ICP rises. Toxic/metabolic comas usually preserve pupillary light reflexes (small reactive pupils in opiate intoxication; pinpoint in pontine lesions). A fixed dilated pupil is an urgent neurosurgical warning of raised ICP.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'When caring for an unconscious patient, progressive dilatation of the pupils indicates:',
 'Injury at the level of the midbrain',
 'Increasing intracranial pressure',
 'Coma is toxic or metabolic in origin',
 'Paralysis of cranial nerves V and VII',
 'B',
 'Progressive pupillary dilatation (initially unilateral, then bilateral non-reactive) reflects compression of CN III by transtentorial (uncal) herniation as ICP rises. Toxic/metabolic comas usually preserve pupillary light reflexes (small reactive pupils in opiate intoxication; pinpoint in pontine lesions). A fixed dilated pupil is an urgent neurosurgical warning of raised ICP.',
 'hard', 'approved', NULL, 'Paper I');

-- Q10 — Talk and die syndrome: epidural haemorrhage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 '"Talk and die syndrome" is commonly associated with:',
 'Epidural haemorrhage',
 'Intracerebral bleeding',
 'Subarachnoid haemorrhage',
 'Cardiac tamponade',
 'A',
 'The classic "talk-and-die" presentation is EPIDURAL (extradural) haematoma — usually a temporal-bone fracture lacerating the middle meningeal artery. The patient briefly loses consciousness, has a LUCID INTERVAL during which they appear well/conversational, then deteriorates rapidly as the arterial haematoma expands and causes herniation. Without emergency neurosurgical evacuation, death follows.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 '"Talk and die syndrome" is commonly associated with:',
 'Epidural haemorrhage',
 'Intracerebral bleeding',
 'Subarachnoid haemorrhage',
 'Cardiac tamponade',
 'A',
 'The classic "talk-and-die" presentation is EPIDURAL (extradural) haematoma — usually a temporal-bone fracture lacerating the middle meningeal artery. The patient briefly loses consciousness, has a LUCID INTERVAL during which they appear well/conversational, then deteriorates rapidly as the arterial haematoma expands and causes herniation. Without emergency neurosurgical evacuation, death follows.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Major cause of death after kidney transplantation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The major cause of death following kidney transplantation is:',
 'Transplant rejection',
 'Acute immunosuppressant toxicity',
 'Post-transplantation infections',
 'Post-transplantation haemorrhage',
 'C',
 'Modern immunosuppression has dramatically reduced acute rejection. With patients on long-term immunosuppressants (calcineurin inhibitors, MMF, steroids), INFECTION (bacterial, viral — especially CMV and BK virus, fungal, opportunistic) has overtaken rejection as the leading cause of post-transplant morbidity and mortality.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The major cause of death following kidney transplantation is:',
 'Transplant rejection',
 'Acute immunosuppressant toxicity',
 'Post-transplantation infections',
 'Post-transplantation haemorrhage',
 'C',
 'Modern immunosuppression has dramatically reduced acute rejection. With patients on long-term immunosuppressants (calcineurin inhibitors, MMF, steroids), INFECTION (bacterial, viral — especially CMV and BK virus, fungal, opportunistic) has overtaken rejection as the leading cause of post-transplant morbidity and mortality.',
 'hard', 'approved', NULL, 'Paper I');

-- Q12 — Early complications of fractures
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Early complications of fractures include:',
 'Shock, avascular necrosis',
 'Reaction to internal fixation device, deep venous thrombosis',
 'Compartment syndrome, fat embolism',
 'Complex regional pain syndrome, infection',
 'C',
 'Early (within hours-to-days) fracture complications: hypovolaemic shock (especially femur/pelvis bleeding), COMPARTMENT SYNDROME, FAT EMBOLISM SYNDROME (within 24–72 hr of long-bone fracture), early infection, neurovascular injury. Avascular necrosis (femoral head, scaphoid) and CRPS are LATE complications. Hardware reaction is a late, implant-related complication.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Early complications of fractures include:',
 'Shock, avascular necrosis',
 'Reaction to internal fixation device, deep venous thrombosis',
 'Compartment syndrome, fat embolism',
 'Complex regional pain syndrome, infection',
 'C',
 'Early (within hours-to-days) fracture complications: hypovolaemic shock (especially femur/pelvis bleeding), COMPARTMENT SYNDROME, FAT EMBOLISM SYNDROME (within 24–72 hr of long-bone fracture), early infection, neurovascular injury. Avascular necrosis (femoral head, scaphoid) and CRPS are LATE complications. Hardware reaction is a late, implant-related complication.',
 'hard', 'approved', NULL, 'Paper I');

-- Q13 — Primary causes of acute otitis media (first occurrence)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'The primary causes of acute otitis media are:',
 'Escherichia coli and Proteus spp.',
 'Streptococcus pneumoniae and Haemophilus influenzae',
 'Staphylococcus aureus and Haemophilus influenzae',
 'Proteus spp. and Streptococcus pneumoniae',
 'B',
 'Acute otitis media is most commonly caused by Streptococcus pneumoniae and non-typeable Haemophilus influenzae, with Moraxella catarrhalis third. These ascend the Eustachian tube during or after a viral URTI. E. coli, Proteus and Staph aureus are urinary/skin/wound organisms, not common acute otitis media pathogens.',
 'easy', 'approved', NULL, 'Paper I');

-- Q14 — Suctioning a laryngeal tube: 10-second rule
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Airway Management',
 'When suctioning a laryngeal tube:',
 'It should take about 10 seconds',
 'A clean and not aseptic technique should be used',
 'Suction is applied while inserting the catheter into the tube',
 'Suctioning should be done continuously until secretions clear',
 'A',
 'Standard tracheal/laryngeal-tube suctioning rules: STERILE/aseptic technique (option B wrong); INSERT the catheter without applying suction, apply suction only on WITHDRAWAL while rotating (option C wrong); each suction pass should NOT exceed 10–15 seconds to avoid hypoxia and trauma (option A correct, option D wrong); pre-oxygenate before and between passes; allow at least 30 seconds recovery between passes.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Orem's self-care model
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Theories',
 'Orem''s self-care model depicts nursing as:',
 'Assisting individuals to their optimal level of self care',
 'Promoting environment-client interactivity to enhance healing',
 'Performing self care activities for a patient to enhance recovery',
 'A profession that is centred on client self care activities',
 'A',
 'Dorothea Orem''s Self-Care Deficit Theory: people normally meet their own self-care needs; when illness/disability prevents this, a self-care deficit exists, and nursing intervenes to help the patient achieve OPTIMAL independent self-care. Nursing systems are wholly compensatory, partly compensatory or supportive-educative depending on the deficit. Option B describes environmental/Nightingale theories.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Theories',
 'Orem''s self-care model depicts nursing as:',
 'Assisting individuals to their optimal level of self care',
 'Promoting environment-client interactivity to enhance healing',
 'Performing self care activities for a patient to enhance recovery',
 'A profession that is centred on client self care activities',
 'A',
 'Dorothea Orem''s Self-Care Deficit Theory: people normally meet their own self-care needs; when illness/disability prevents this, a self-care deficit exists, and nursing intervenes to help the patient achieve OPTIMAL independent self-care. Nursing systems are wholly compensatory, partly compensatory or supportive-educative depending on the deficit. Option B describes environmental/Nightingale theories.',
 'easy', 'approved', NULL, 'Paper II');

-- Q16 — ACE inhibitors mechanism (first occurrence)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'Angiotensin-converting enzyme (ACE) inhibitors:',
 'Inhibit conversion of angiotensinogen to angiotensin I',
 'Block receptors from binding angiotensin II',
 'Inhibit conversion of angiotensin I to angiotensin II',
 'Block angiotensin I receptor sites',
 'C',
 'ACE inhibitors (e.g. captopril, enalapril, lisinopril) inhibit the conversion of angiotensin I to angiotensin II by blocking the angiotensin-converting enzyme. This reduces vasoconstriction and aldosterone release, lowering blood pressure. ARBs (e.g. losartan) BLOCK the AT1 receptor (option B). Renin inhibitors (e.g. aliskiren) block option A.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'Angiotensin-converting enzyme (ACE) inhibitors:',
 'Inhibit conversion of angiotensinogen to angiotensin I',
 'Block receptors from binding angiotensin II',
 'Inhibit conversion of angiotensin I to angiotensin II',
 'Block angiotensin I receptor sites',
 'C',
 'ACE inhibitors (e.g. captopril, enalapril, lisinopril) inhibit the conversion of angiotensin I to angiotensin II by blocking the angiotensin-converting enzyme. This reduces vasoconstriction and aldosterone release, lowering blood pressure. ARBs (e.g. losartan) BLOCK the AT1 receptor (option B). Renin inhibitors (e.g. aliskiren) block option A.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Disadvantages of perineal prostatectomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Urological Surgery',
 'The disadvantages of perineal prostatectomy include:',
 'Retrograde ejaculation, urethral trauma and stricture development',
 'Haemorrhage that is difficult to control, prolonged recovery and discomfort',
 'Requires highly trained surgeon, impotence and seizures',
 'Higher post-operative incidence of impotence, greater potential for infection',
 'D',
 'The perineal approach to prostatectomy provides good access but its disadvantages are: HIGHER rate of post-operative impotence (proximity to cavernous nerves and rectum); GREATER POTENTIAL FOR WOUND CONTAMINATION/INFECTION (perineum is adjacent to anus); urinary and faecal incontinence risk. Retrograde ejaculation is more typical of TURP. Seizures are not a recognised complication.',
 'hard', 'approved', NULL, 'Paper I');

-- Q18 — Nitroglycerin in myocardial infarction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'In myocardial infarction, nitroglycerin is administered to:',
 'Dilate arteries in small doses',
 'Decrease ischaemia by reducing myocardial oxygen consumption',
 'Increase the preload',
 'Enable the patient to achieve muscle relaxation',
 'B',
 'Nitroglycerin is primarily a VENODILATOR at therapeutic doses — it reduces preload (NOT increases it) and at higher doses also dilates coronary arteries and reduces afterload. The net effect: reduced myocardial wall stress and reduced myocardial oxygen demand, hence decreased ischaemia and angina. It also dilates coronary arteries improving supply, especially in coronary spasm.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'In myocardial infarction, nitroglycerin is administered to:',
 'Dilate arteries in small doses',
 'Decrease ischaemia by reducing myocardial oxygen consumption',
 'Increase the preload',
 'Enable the patient to achieve muscle relaxation',
 'B',
 'Nitroglycerin is primarily a VENODILATOR at therapeutic doses — it reduces preload (NOT increases it) and at higher doses also dilates coronary arteries and reduces afterload. The net effect: reduced myocardial wall stress and reduced myocardial oxygen demand, hence decreased ischaemia and angina. It also dilates coronary arteries improving supply, especially in coronary spasm.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Laryngotracheobronchitis (croup): characteristic signs
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Respiratory Disorders in Children',
 'The characteristic signs and symptoms of laryngotracheobronchitis are:',
 'Stridor, subglottic oedema',
 'Wheeze, vomiting',
 'Chest pain, pyrexia',
 'Spasmodic cough, copious vomiting',
 'A',
 'Laryngotracheobronchitis (viral croup, commonly parainfluenza virus) causes inflammation and SUBGLOTTIC OEDEMA, narrowing the upper airway. Classic features: barking seal-like cough, inspiratory STRIDOR, hoarseness, low-grade fever. Severe cases show stridor at rest, retractions and cyanosis. Per Kenya Basic Paediatric Protocols, severe croup gets nebulised adrenaline and oral/IM dexamethasone.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — IMCI classification: 2-year-old, RR 42, chest in-drawing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMCI Guidelines',
 'A 2-year-old child brought to a health facility with a respiratory rate of 42 breaths per minute, cough and chest in-drawing will be classified as:',
 'Pneumonia',
 'Severe pneumonia',
 'Laryngotracheobronchitis',
 'Status asthmaticus',
 'B',
 'Per Kenya IMCI guidelines: for a child 2 months to 5 years, fast breathing (at least 40 breaths/min in a 12-month to 5-year child) classifies as PNEUMONIA. The presence of CHEST IN-DRAWING (lower chest wall indrawing) classifies as SEVERE PNEUMONIA — refer urgently, give first dose of antibiotic and oxygen if needed. The traditional Kenya IMCI/NCK teaching classifies chest indrawing as severe pneumonia.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 6 ────────────────────────────────────────────────────────────────────

-- Q1 — Signs of blood incompatibility during transfusion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Blood Transfusion',
 'The signs of blood incompatibility during transfusion include:',
 'Flushing, tenesmus and tremors',
 'Shivering, chest tightness and wheezing',
 'Diaphoresis, headache and stridor',
 'Fever, oliguria and tinnitus',
 'B',
 'Acute haemolytic transfusion reaction (ABO incompatibility) classically presents within minutes with: fever and rigors (SHIVERING), CHEST and lumbar back pain/TIGHTNESS, dyspnoea/WHEEZING, hypotension, flank pain, dark/red urine (haemoglobinuria), and oliguria. Stop transfusion immediately, maintain IV access with saline via a NEW line, and keep blood bag for cross-checking.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Blood Transfusion',
 'The signs of blood incompatibility during transfusion include:',
 'Flushing, tenesmus and tremors',
 'Shivering, chest tightness and wheezing',
 'Diaphoresis, headache and stridor',
 'Fever, oliguria and tinnitus',
 'B',
 'Acute haemolytic transfusion reaction (ABO incompatibility) classically presents within minutes with: fever and rigors (SHIVERING), CHEST and lumbar back pain/TIGHTNESS, dyspnoea/WHEEZING, hypotension, flank pain, dark/red urine (haemoglobinuria), and oliguria. Stop transfusion immediately, maintain IV access with saline via a NEW line, and keep blood bag for cross-checking.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — IV flow rate calculation: 500 ml over 6 hrs, drop factor 20
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'IV Therapy and Calculations',
 'To administer Normal saline 500 ml for 6 hours using an IV administration set with a drop factor of 20, the flow rate will be regulated to:',
 '26 drops per minute',
 '25 drops per minute',
 '28 drops per minute',
 '27 drops per minute',
 'C',
 'Drops/min = (Volume in mL x drop factor) divided by (Time in minutes). = (500 x 20) divided by (6 x 60) = 10,000 divided by 360 = 27.77. Standard rounding rules require rounding to the nearest whole number, which is 28 drops/min.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 T/F split → two standalone MCQs
-- Q3a — Oxygen as a drug requiring prescription
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Oxygen Therapy',
 'Which of the following statements about oxygen therapy is TRUE?',
 'Oxygen does not require a prescription as it is a naturally occurring gas',
 'Oxygen is classified as a drug and requires a prescription specifying dose and delivery method',
 'Oxygen can be administered at any concentration without risk of side effects',
 'High-flow oxygen is the preferred treatment for all patients with COPD exacerbation',
 'B',
 'Oxygen is classified as a DRUG; it has a therapeutic dose, side effects (CO2 narcosis, oxygen toxicity, retinopathy of prematurity, absorption atelectasis) and requires a prescription specifying dose and delivery method. For COPD with chronic CO2 retention, controlled low-flow oxygen targeting SpO2 88–92% is used, not high-flow.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Oxygen Therapy',
 'Which of the following statements about oxygen therapy is TRUE?',
 'Oxygen does not require a prescription as it is a naturally occurring gas',
 'Oxygen is classified as a drug and requires a prescription specifying dose and delivery method',
 'Oxygen can be administered at any concentration without risk of side effects',
 'High-flow oxygen is the preferred treatment for all patients with COPD exacerbation',
 'B',
 'Oxygen is classified as a DRUG; it has a therapeutic dose, side effects (CO2 narcosis, oxygen toxicity, retinopathy of prematurity, absorption atelectasis) and requires a prescription specifying dose and delivery method. For COPD with chronic CO2 retention, controlled low-flow oxygen targeting SpO2 88–92% is used, not high-flow.',
 'easy', 'approved', NULL, 'Paper I');

-- Q3b — Digoxin: pulse rate contraindication
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'Regarding digoxin administration, which of the following is CORRECT?',
 'Digoxin is contraindicated when the pulse rate exceeds 110 beats per minute',
 'Digoxin should be withheld when the apical pulse is below 60 beats per minute',
 'Digoxin is safe to administer regardless of the patient''s heart rate',
 'Digoxin is contraindicated in patients with atrial fibrillation',
 'B',
 'Digoxin is actually USED in atrial fibrillation with rapid ventricular response to slow the rate — it is NOT contraindicated when the pulse exceeds 110. It is contraindicated/should be withheld when the apical pulse is LESS THAN 60 bpm (bradycardia), in second/third-degree heart block, in hypokalaemia (potentiates toxicity), or in digoxin toxicity.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'Regarding digoxin administration, which of the following is CORRECT?',
 'Digoxin is contraindicated when the pulse rate exceeds 110 beats per minute',
 'Digoxin should be withheld when the apical pulse is below 60 beats per minute',
 'Digoxin is safe to administer regardless of the patient''s heart rate',
 'Digoxin is contraindicated in patients with atrial fibrillation',
 'B',
 'Digoxin is actually USED in atrial fibrillation with rapid ventricular response to slow the rate — it is NOT contraindicated when the pulse exceeds 110. It is contraindicated/should be withheld when the apical pulse is LESS THAN 60 bpm (bradycardia), in second/third-degree heart block, in hypokalaemia (potentiates toxicity), or in digoxin toxicity.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Enema: patient positioning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Nursing',
 'When administering an enema:',
 'The client should lie in right lateral position',
 'The enema tube should be inserted 8 inches into the client''s rectum',
 'The client should be advised to retain the enema for 30 minutes',
 'The nurse should position the client in left lateral position',
 'D',
 'The patient is positioned in LEFT LATERAL (Sims'') position because the sigmoid colon lies on the left — gravity allows enema fluid to flow into the descending and sigmoid colon. Insertion depth in an adult is 7.5–10 cm (3–4 inches), NOT 8 inches. Retention is typically 5–15 minutes depending on enema type, not 30 minutes.',
 'easy', 'approved', NULL, 'Paper I');

-- Q5 — Retinal detachment: fluid location
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'In retinal detachment, fluid accumulates between the:',
 'Sclera and ciliary body',
 'Retina and choroid',
 'Pupil and suspensory ligament',
 'Lens and pupil',
 'B',
 'Rhegmatogenous retinal detachment occurs when a retinal break allows vitreous fluid to track into the potential subretinal space — separating the sensory (neural) retina from the underlying retinal pigment epithelium/choroid. Symptoms: flashes, floaters, curtain over visual field, painless loss of vision.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'In retinal detachment, fluid accumulates between the:',
 'Sclera and ciliary body',
 'Retina and choroid',
 'Pupil and suspensory ligament',
 'Lens and pupil',
 'B',
 'Rhegmatogenous retinal detachment occurs when a retinal break allows vitreous fluid to track into the potential subretinal space — separating the sensory (neural) retina from the underlying retinal pigment epithelium/choroid. Symptoms: flashes, floaters, curtain over visual field, painless loss of vision.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — Chemical used for sterilisation: glutaraldehyde
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Sterilisation and Disinfection',
 'The following chemical can be used for sterilisation:',
 'Chlorhexidine',
 'Chlorhexidine with cetrimide',
 'Sodium hypochlorite',
 'Glutaraldehyde',
 'D',
 'STERILISATION (kills all microorganisms including spores) requires high-level chemical sterilants. Glutaraldehyde (2%, 10 hours) achieves chemical sterilisation of heat-sensitive instruments. Chlorhexidine and chlorhexidine/cetrimide (Savlon) are skin antiseptics/disinfectants. Sodium hypochlorite (JIK) at 0.5% is a decontaminant/disinfectant — does not reliably kill spores within practical exposure times.',
 'medium', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Infection Prevention & Control', 'Sterilisation and Disinfection',
 'The following chemical can be used for sterilisation:',
 'Chlorhexidine',
 'Chlorhexidine with cetrimide',
 'Sodium hypochlorite',
 'Glutaraldehyde',
 'D',
 'STERILISATION (kills all microorganisms including spores) requires high-level chemical sterilants. Glutaraldehyde (2%, 10 hours) achieves chemical sterilisation of heat-sensitive instruments. Chlorhexidine and chlorhexidine/cetrimide (Savlon) are skin antiseptics/disinfectants. Sodium hypochlorite (JIK) at 0.5% is a decontaminant/disinfectant — does not reliably kill spores within practical exposure times.',
 'medium', 'approved', NULL, 'Paper II');

-- Q7 — Expected outcomes: impaired gas exchange related to fluid overload
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Process',
 'The expected outcomes for a patient who has "potential for impaired gas exchange related to fluid overload" is:',
 'No shortness of breath, scaphoid abdomen',
 'Chest X-ray normal, improved gas exchange',
 'Respiratory rate less than 20 breaths per minute, skin colour normal',
 'Heart rate less than 100 beats per minute, increased urine output',
 'C',
 'An expected outcome should be SPECIFIC and MEASURABLE and directly related to the nursing diagnosis. For impaired gas exchange, measurable indicators are respiratory rate within normal limits and normal skin/mucosal colour (no cyanosis). A chest X-ray is a medical-physician assessment, not a nursing outcome; HR and urine output address circulation, not gas exchange.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Nursing Process',
 'The expected outcomes for a patient who has "potential for impaired gas exchange related to fluid overload" is:',
 'No shortness of breath, scaphoid abdomen',
 'Chest X-ray normal, improved gas exchange',
 'Respiratory rate less than 20 breaths per minute, skin colour normal',
 'Heart rate less than 100 beats per minute, increased urine output',
 'C',
 'An expected outcome should be SPECIFIC and MEASURABLE and directly related to the nursing diagnosis. For impaired gas exchange, measurable indicators are respiratory rate within normal limits and normal skin/mucosal colour (no cyanosis). A chest X-ray is a medical-physician assessment, not a nursing outcome; HR and urine output address circulation, not gas exchange.',
 'medium', 'approved', NULL, 'Paper I');

-- Q8 — Anaphylactic shock: antigen-antibody reaction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'Anaphylactic shock is:',
 'Associated with excessive blood loss',
 'Caused by systemic antigen-antibody reaction',
 'Associated with effects of adrenaline and noradrenaline',
 'Usually common in patients on antibiotics',
 'B',
 'Anaphylactic (distributive) shock is a Type-I IgE-mediated hypersensitivity reaction — antigen binds IgE on mast cells/basophils, causing massive release of histamine, leukotrienes and prostaglandins leading to systemic vasodilation, capillary leak, bronchospasm and urticaria. Treatment: IM adrenaline 0.5 mg (adult), high-flow oxygen, IV fluids, antihistamine, hydrocortisone, nebulised salbutamol.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'Anaphylactic shock is:',
 'Associated with excessive blood loss',
 'Caused by systemic antigen-antibody reaction',
 'Associated with effects of adrenaline and noradrenaline',
 'Usually common in patients on antibiotics',
 'B',
 'Anaphylactic (distributive) shock is a Type-I IgE-mediated hypersensitivity reaction — antigen binds IgE on mast cells/basophils, causing massive release of histamine, leukotrienes and prostaglandins leading to systemic vasodilation, capillary leak, bronchospasm and urticaria. Treatment: IM adrenaline 0.5 mg (adult), high-flow oxygen, IV fluids, antihistamine, hydrocortisone, nebulised salbutamol.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Reverse barrier nursing for immunocompromised patient (first occurrence)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Isolation Nursing',
 'Appropriate nursing interventions for a patient with "Risk for infection related to altered immunity response" include:',
 'Barrier nursing, avoiding invasive procedures and inspection of entry port sites for pathogens',
 'Reverse barrier nursing, monitor SpO2 hourly and serve high protein diet',
 'Isolation nursing, obtaining cultures and sensitivities daily and administration of antibiotics',
 'Reverse barrier nursing, avoiding invasive procedures and daily assessment of intravenous sites',
 'D',
 'An immunocompromised patient (neutropenic, post-transplant, HIV, on chemotherapy) needs PROTECTIVE (REVERSE) BARRIER nursing — protecting them from environmental pathogens. Key interventions: avoid invasive procedures where possible, meticulous IV site care (most common portal of entry for nosocomial infection), strict hand hygiene, neutropenic diet, no fresh flowers/raw foods. Standard barrier nursing protects others FROM the patient — the wrong direction here.',
 'medium', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Infection Prevention & Control', 'Isolation Nursing',
 'Appropriate nursing interventions for a patient with "Risk for infection related to altered immunity response" include:',
 'Barrier nursing, avoiding invasive procedures and inspection of entry port sites for pathogens',
 'Reverse barrier nursing, monitor SpO2 hourly and serve high protein diet',
 'Isolation nursing, obtaining cultures and sensitivities daily and administration of antibiotics',
 'Reverse barrier nursing, avoiding invasive procedures and daily assessment of intravenous sites',
 'D',
 'An immunocompromised patient (neutropenic, post-transplant, HIV, on chemotherapy) needs PROTECTIVE (REVERSE) BARRIER nursing — protecting them from environmental pathogens. Key interventions: avoid invasive procedures where possible, meticulous IV site care (most common portal of entry for nosocomial infection), strict hand hygiene, neutropenic diet, no fresh flowers/raw foods. Standard barrier nursing protects others FROM the patient — the wrong direction here.',
 'medium', 'approved', NULL, 'Paper II');

-- Q10 — Three primary symptoms of COPD
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'The three primary symptoms of Chronic Obstructive Pulmonary Disease (COPD) are:',
 'Chronic cough, sputum production and dyspnoea on exertion',
 'Barrel chest, clubbed fingers and dyspnoea on exertion',
 'Peripheral oedema, dyspnoea, chronic coughing',
 'Rhinitis, wheezing and chronic cough',
 'A',
 'The classic triad of COPD symptoms per GOLD: chronic productive cough, sputum production, and dyspnoea — initially on exertion, later at rest. Barrel chest and clubbing are SIGNS (not symptoms). Peripheral oedema is a sign of cor pulmonale (advanced disease). Rhinitis is not a COPD feature.',
 'easy', 'approved', NULL, 'Paper I');

-- Q11 — Cardiac output formula
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'Cardiac output is equal to:',
 'Peripheral resistance multiplied by stroke volume',
 'Heart rate multiplied by patient body weight',
 'Stroke volume multiplied by heart rate',
 'Venous return multiplied by peripheral resistance',
 'C',
 'CO (L/min) = Stroke Volume (mL/beat) multiplied by Heart Rate (beats/min). Normal cardiac output in an adult at rest is approximately 5 L/min (SV approximately 70 mL x HR approximately 70 bpm). Blood pressure = CO x SVR (peripheral resistance) — that is a different equation.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'Cardiac output is equal to:',
 'Peripheral resistance multiplied by stroke volume',
 'Heart rate multiplied by patient body weight',
 'Stroke volume multiplied by heart rate',
 'Venous return multiplied by peripheral resistance',
 'C',
 'CO (L/min) = Stroke Volume (mL/beat) multiplied by Heart Rate (beats/min). Normal cardiac output in an adult at rest is approximately 5 L/min (SV approximately 70 mL x HR approximately 70 bpm). Blood pressure = CO x SVR (peripheral resistance) — that is a different equation.',
 'easy', 'approved', NULL, 'Paper I');

-- Q12 SKIPPED — exact duplicate of Set 5 Q13 (primary causes of acute otitis media)

-- Q13 — Post intracranial surgery: complications
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Post intracranial surgery a patient is mainly at risk of:',
 'Hypoxia, paralytic ileus and hypostatic pneumonia',
 'Cerebral oedema, hypoxia and seizures',
 'CSF leakage, urine retention and hyperthermia',
 'Hypotension, septicaemia and sensory deprivation',
 'B',
 'Principal early complications after craniotomy/neurosurgery: CEREBRAL OEDEMA (peaks 24–72 hr post-op), raised ICP, SEIZURES (cortical irritation), HYPOXIA (depressed consciousness, impaired airway protection), haemorrhage, CSF leak, meningitis, electrolyte disturbance (SIADH, DI). Option B captures the most immediate triad. Mannitol, head elevation 30 degrees, anticonvulsants and neuro-observations are central.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Post intracranial surgery a patient is mainly at risk of:',
 'Hypoxia, paralytic ileus and hypostatic pneumonia',
 'Cerebral oedema, hypoxia and seizures',
 'CSF leakage, urine retention and hyperthermia',
 'Hypotension, septicaemia and sensory deprivation',
 'B',
 'Principal early complications after craniotomy/neurosurgery: CEREBRAL OEDEMA (peaks 24–72 hr post-op), raised ICP, SEIZURES (cortical irritation), HYPOXIA (depressed consciousness, impaired airway protection), haemorrhage, CSF leak, meningitis, electrolyte disturbance (SIADH, DI). Option B captures the most immediate triad. Mannitol, head elevation 30 degrees, anticonvulsants and neuro-observations are central.',
 'hard', 'approved', NULL, 'Paper I');

-- Q14 — Osteoarthritis: weight-bearing joints (different stem from Set 7 Q2 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Osteoarthritis:',
 'Is inflammatory and autoimmune',
 'Commonly affects weight-bearing joints',
 'Mainly affects the synovial membrane tissue',
 'Usually affects small joints of the hands and feet',
 'B',
 'Osteoarthritis is a DEGENERATIVE wear-and-tear arthropathy of articular cartilage — NOT primarily inflammatory or autoimmune. It chiefly affects WEIGHT-BEARING joints: knees, hips, lumbar spine, and DIP/PIP joints of hands. Rheumatoid arthritis is the inflammatory autoimmune disease affecting the SYNOVIAL membrane, characteristically small joints of hands and feet symmetrically.',
 'easy', 'approved', NULL, 'Paper I');

-- Q15 — Triple therapy: H. pylori
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Gastrointestinal Drugs',
 'Triple therapy is indicated in treatment of:',
 'Osteomyelitis',
 'Helicobacter pylori',
 'Neisseria meningitidis',
 'Onchocerca volvulus',
 'B',
 'Triple therapy for H. pylori = a PPI (e.g. omeprazole) plus 2 antibiotics (clarithromycin plus amoxicillin OR metronidazole) for 7–14 days. Quadruple therapy adds bismuth. Anti-tuberculosis treatment uses 4-drug intensive phase (sometimes called quadruple therapy), not triple.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Gastrointestinal Drugs',
 'Triple therapy is indicated in treatment of:',
 'Osteomyelitis',
 'Helicobacter pylori',
 'Neisseria meningitidis',
 'Onchocerca volvulus',
 'B',
 'Triple therapy for H. pylori = a PPI (e.g. omeprazole) plus 2 antibiotics (clarithromycin plus amoxicillin OR metronidazole) for 7–14 days. Quadruple therapy adds bismuth. Anti-tuberculosis treatment uses 4-drug intensive phase (sometimes called quadruple therapy), not triple.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Early signs of nasopharyngeal cancer
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear, Nose and Throat Disorders',
 'The early signs of cancer of the posterior-nasal space include:',
 'Proptosis, hearing loss',
 'Hearing loss, double vision',
 'Purulent nasal discharge, aphonia',
 'Anosmia, proptosis',
 'B',
 'Nasopharyngeal carcinoma (posterior-nasal space) typically presents EARLY with: UNILATERAL conductive hearing loss/serous otitis media (tumour blocks the Eustachian tube opening), plus DIPLOPIA/cranial nerve VI palsy from skull-base invasion. Cervical lymph node enlargement is also an early feature. Proptosis and anosmia are LATE signs.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Ear, Nose and Throat Disorders',
 'The early signs of cancer of the posterior-nasal space include:',
 'Proptosis, hearing loss',
 'Hearing loss, double vision',
 'Purulent nasal discharge, aphonia',
 'Anosmia, proptosis',
 'B',
 'Nasopharyngeal carcinoma (posterior-nasal space) typically presents EARLY with: UNILATERAL conductive hearing loss/serous otitis media (tumour blocks the Eustachian tube opening), plus DIPLOPIA/cranial nerve VI palsy from skull-base invasion. Cervical lymph node enlargement is also an early feature. Proptosis and anosmia are LATE signs.',
 'hard', 'approved', NULL, 'Paper I');

-- Q17 — Megaloblastic anaemia: vitamin B12 deficiency
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Megaloblastic anaemia is mainly associated with deficiency of:',
 'Iron',
 'Vitamin B12',
 'Vitamin C',
 'Gastric carcinoma',
 'B',
 'Megaloblastic anaemia results from impaired DNA synthesis in erythroid precursors; causes are vitamin B12 (cobalamin) deficiency and folate (B9) deficiency. B12 is the most commonly tested cause (pernicious anaemia, ileal disease, vegan diet). Iron deficiency causes MICROCYTIC hypochromic anaemia, not megaloblastic. Gastric carcinoma can secondarily cause B12 deficiency, but the primary mechanism is B12 deficiency itself.',
 'easy', 'approved', NULL, 'Paper I');

-- Q18 — Post-amputation self-esteem
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'The low self-esteem experienced post limb amputation can be minimised through:',
 'Total nursing care, immediate viewing of the affected extremity by the patient',
 'Promotion of isometric exercises and independent self care',
 'Out-of-bed activity, reassurance by staff that the patient is viewed as a normal dependent person',
 'Frequent supervised ambulation, reinforcing surgeons'' explanations by the nurse',
 'B',
 'Body-image disturbance after amputation is best addressed by helping the patient resume INDEPENDENT self-care as soon as possible — this fosters mastery, sense of normalcy and renewed self-worth. Isometric exercises of the residual limb and contralateral limb maintain strength and help prepare for prosthesis. Telling the patient they are "a normal dependent person" is paradoxically discouraging.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Complications of measles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Communicable Diseases in Children',
 'Complications of measles include:',
 'Deafness, encephalitis, contractures',
 'Paralysis, rectal prolapse, blindness',
 'Malnutrition, umbilical hernia, deafness',
 'Blindness, malnutrition, pneumonia',
 'D',
 'Per WHO and the Kenya Basic Paediatric Protocols, measles complications include: PNEUMONIA (commonest cause of death), severe diarrhoea, otitis media, croup, BLINDNESS (corneal ulceration — particularly in vitamin A deficiency), MALNUTRITION (worsening of pre-existing PEM), encephalitis, and rare late SSPE. High-dose vitamin A is given to all children with measles per Kenya MoH guidance.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Management of severe malnutrition in a child
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Nutrition and Malnutrition',
 'The management of a child with severe malnutrition includes:',
 'Warmth, antibiotics, analgesics, dietary education',
 'Intensive feeding regime with high energy milk 2-hourly, antibiotics, warmth',
 'Intensive feeding regime 3-hourly, multivitamin syrup for one month, steroids',
 'IV dextrose 50% stat then normal saline, blood transfusion, oxygen administration',
 'B',
 'Per Kenya IMCI/Basic Paediatric Protocols/WHO 10-step inpatient management of severe acute malnutrition: prevent and treat HYPOTHERMIA (warmth), HYPOGLYCAEMIA, DEHYDRATION (use ReSoMal cautiously, NOT plain IV fluids except for shock), INFECTION (give routine broad-spectrum antibiotics empirically), micronutrient deficiencies, then begin cautious FEEDING with F-75 in stabilisation phase (small frequent feeds approximately every 2–3 hours). Bolus 50% dextrose and routine transfusion are inappropriate.',
 'hard', 'approved', NULL, 'Paper I');

-- ─── SET 7 ────────────────────────────────────────────────────────────────────

-- Q1 — Russell's traction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'Russell''s traction is indicated in:',
 'Femur, knee and hip fractures',
 'Minor fractures of lower spine, sciatica, muscle spasms',
 'Degenerative disc disease of cervical spine, shoulder dislocation, muscle spasm',
 'Femur, acetabulum and lower leg fracture',
 'A',
 'Russell''s traction is a balanced skin/skeletal traction with vertical (knee sling) and horizontal forces, used to immobilise fractures of the femoral shaft, supracondylar region, distal femur and hip. Option A (femur–knee–hip) is the standard textbook combination. Option B describes pelvic traction; option C describes cervical traction (e.g. halter or Crutchfield tongs).',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Joints affected by osteoarthritis (different stem from Set 6 Q14 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Joints usually affected by osteoarthritis are:',
 'Thoracic spine, knees, wrist',
 'Acromioclavicular, sacral spine, lower cervical spine',
 'Ankle, sacro-iliac, hip',
 'Thoracic spine, hip, temporal mandibular',
 'C',
 'Osteoarthritis preferentially affects WEIGHT-BEARING and high-use joints: hips, knees, ankles, lumbar/cervical spine, and hand joints (DIPs/PIPs/first CMC). The sacroiliac joints can also be affected. Among the options listed, ankle, sacro-iliac and hip are all weight-bearing joints and the best fit. Wrists and TMJ are not typically primary OA sites unless secondary to trauma.',
 'easy', 'approved', NULL, 'Paper I');

-- Q3 — Status asthmaticus precipitants
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Status asthmaticus can be precipitated by:',
 'Infection, tranquilisers overdose, emphysema, anxiety',
 'Tranquilisers overdose, nebuliser abuse, anxiety, infection',
 'Tranquilisers overdose, anxiety, blebs and aspirin overdose',
 'Emphysema, infection, nebuliser abuse and bullae',
 'B',
 'Status asthmaticus is severe, sustained asthma unresponsive to standard therapy. Triggers include: respiratory INFECTION (often viral), excessive use of beta-agonist NEBULISERS (tachyphylaxis, hypokalaemia), abrupt withdrawal of corticosteroids, sedatives/TRANQUILISERS (depress respiratory drive — dangerous in asthma), aspirin/NSAIDs in aspirin-sensitive patients, severe ANXIETY/emotional stress, and allergen exposure.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Status asthmaticus can be precipitated by:',
 'Infection, tranquilisers overdose, emphysema, anxiety',
 'Tranquilisers overdose, nebuliser abuse, anxiety, infection',
 'Tranquilisers overdose, anxiety, blebs and aspirin overdose',
 'Emphysema, infection, nebuliser abuse and bullae',
 'B',
 'Status asthmaticus is severe, sustained asthma unresponsive to standard therapy. Triggers include: respiratory INFECTION (often viral), excessive use of beta-agonist NEBULISERS (tachyphylaxis, hypokalaemia), abrupt withdrawal of corticosteroids, sedatives/TRANQUILISERS (depress respiratory drive — dangerous in asthma), aspirin/NSAIDs in aspirin-sensitive patients, severe ANXIETY/emotional stress, and allergen exposure.',
 'hard', 'approved', NULL, 'Paper I');

-- Q4 — Bronchopneumonia presentation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Bronchopneumonia presents with:',
 'Stabbing chest pain, low grade fever, dry cough and low pulse',
 'Nasal flaring, fever, cyanosis and stabbing chest pain',
 'Rapid pulse, nasal flaring, barrel chest and low grade fever',
 'Low grade fever, nasal flaring, stabbing chest pain and low pulse',
 'B',
 'Bronchopneumonia (patchy, lobular consolidation, common in extremes of age) presents with: high fever, productive cough, dyspnoea, NASAL FLARING (especially in children), tachycardia, tachypnoea, CYANOSIS if severe, and pleuritic chest pain when the pleura is involved. Barrel chest is a sign of chronic hyperinflation, not acute pneumonia.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Main role of anaesthetic nurse
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Operating Theatre Practice',
 'The main role played by the anaesthetic nurse is:',
 'Intubating the patient',
 'Extubating the patient',
 'Observing the patient',
 'Supporting the scrub nurse',
 'C',
 'The anaesthetic nurse assists the anaesthetist by preparing equipment and drugs, positioning the patient, and CONTINUOUSLY MONITORING/OBSERVING the patient''s vital signs (HR, BP, SpO2, ETCO2, anaesthetic depth) and IV access throughout induction, maintenance and emergence. Intubation/extubation are the anaesthetist''s procedures (the nurse assists). The scrub nurse is supported by the CIRCULATING nurse.',
 'easy', 'approved', NULL, 'Paper I');

-- Q6 — Objective vs subjective data
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Process',
 'The following information about a patient is classified as objective data:',
 'Feels tired, blood pressure 130/70 mmHg, leg hurts',
 'Dry skin, nocturia, anorexia',
 'Seems nervous, temperature 37 degrees C, pale',
 'Allergic to sulphur drugs, skin rash, lethargic',
 'C',
 'OBJECTIVE data are observed/measurable findings (signs). SUBJECTIVE data are what the patient reports (symptoms). Option C lists three things the nurse OBSERVES: "seems nervous" (observed behaviour), "temperature 37 degrees C" (measured), "pale" (inspected). "Feels tired", "leg hurts", "nocturia", "anorexia", "allergic", "lethargic" are all subjective patient reports.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Process',
 'The following information about a patient is classified as objective data:',
 'Feels tired, blood pressure 130/70 mmHg, leg hurts',
 'Dry skin, nocturia, anorexia',
 'Seems nervous, temperature 37 degrees C, pale',
 'Allergic to sulphur drugs, skin rash, lethargic',
 'C',
 'OBJECTIVE data are observed/measurable findings (signs). SUBJECTIVE data are what the patient reports (symptoms). Option C lists three things the nurse OBSERVES: "seems nervous" (observed behaviour), "temperature 37 degrees C" (measured), "pale" (inspected). "Feels tired", "leg hurts", "nocturia", "anorexia", "allergic", "lethargic" are all subjective patient reports.',
 'easy', 'approved', NULL, 'Paper II');

-- Q7 SKIPPED — exact duplicate of Set 6 Q2 (IV flow rate 500ml/6hrs/drop factor 20 = 27 drops/min)

-- Q8 — Hand-washing reduces which organisms
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Hand Hygiene',
 'The micro-organisms that are minimised through hand-washing include:',
 'Streptococcus pyogenes',
 'Staphylococcus albus',
 'Escherichia coli',
 'Entamoeba histolytica',
 'C',
 'Hand-washing principally removes TRANSIENT flora — organisms picked up from surfaces/patients and not part of normal skin microbiota. These include faecal-oral pathogens such as E. coli, Salmonella, Shigella, rotavirus, and most nosocomial pathogens. Resident skin flora (Staph. albus/coagulase-negative staphylococci) requires antiseptic scrubbing to remove. E. coli is the most cited example of a transient pathogen removed by hand-washing.',
 'easy', 'approved', NULL, 'Paper II');

-- Q9 — Deteriorating head injury: Cushing's triad (first occurrence of this stem)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'A deteriorating condition for a patient with head injury will be indicated by:',
 'Widening pulse pressure and irregular respiratory pattern',
 'Narrowing pulse pressure and escalation of discomfort',
 'Bradycardia and Kussmaul breathing',
 'Oliguria and narrow pulse pressure',
 'A',
 'Cushing''s triad of rising intracranial pressure: (i) HYPERTENSION with WIDENING PULSE PRESSURE (the systolic rises while diastolic remains or falls); (ii) BRADYCARDIA; (iii) IRREGULAR/abnormal respirations (Cheyne-Stokes, ataxic, or apneustic). The widening pulse pressure with irregular respiratory pattern in option A captures two of the three components and indicates severe deterioration.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'A deteriorating condition for a patient with head injury will be indicated by:',
 'Widening pulse pressure and irregular respiratory pattern',
 'Narrowing pulse pressure and escalation of discomfort',
 'Bradycardia and Kussmaul breathing',
 'Oliguria and narrow pulse pressure',
 'A',
 'Cushing''s triad of rising intracranial pressure: (i) HYPERTENSION with WIDENING PULSE PRESSURE (the systolic rises while diastolic remains or falls); (ii) BRADYCARDIA; (iii) IRREGULAR/abnormal respirations (Cheyne-Stokes, ataxic, or apneustic). The widening pulse pressure with irregular respiratory pattern in option A captures two of the three components and indicates severe deterioration.',
 'hard', 'approved', NULL, 'Paper I');

-- Q10 — High-threshold materials reabsorbed by renal tubules
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Renal Physiology',
 'The substances that are completely reabsorbed by renal tubules after filtration (high-threshold materials) include:',
 'Creatinine, urea, uric acid',
 'Water, urine, plasma proteins',
 'Bicarbonate, glucose, amino acids',
 'Sodium, potassium, phosphate',
 'C',
 'HIGH-THRESHOLD substances are those nearly completely reabsorbed by the renal tubules under normal conditions: glucose (spilled in DM when plasma exceeds approximately 10 mmol/L); amino acids; bicarbonate (proximal tubule). Creatinine and urea are NOT reabsorbed — they are excreted. Sodium, K, Ca and phosphate are partially regulated, not fully reabsorbed.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Renal Physiology',
 'The substances that are completely reabsorbed by renal tubules after filtration (high-threshold materials) include:',
 'Creatinine, urea, uric acid',
 'Water, urine, plasma proteins',
 'Bicarbonate, glucose, amino acids',
 'Sodium, potassium, phosphate',
 'C',
 'HIGH-THRESHOLD substances are those nearly completely reabsorbed by the renal tubules under normal conditions: glucose (spilled in DM when plasma exceeds approximately 10 mmol/L); amino acids; bicarbonate (proximal tubule). Creatinine and urea are NOT reabsorbed — they are excreted. Sodium, K, Ca and phosphate are partially regulated, not fully reabsorbed.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Late symptoms of cervical cancer
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Late symptoms of cervical cancer include:',
 'Painful micturition, haematuria',
 'Rectal bleeding, referred flank pain',
 'Painless bleeding, menorrhagia',
 'Oedema of extremities, thin watery vaginal discharge',
 'B',
 'Cervical cancer EARLY symptoms: post-coital bleeding, intermenstrual bleeding, watery/blood-stained vaginal discharge. LATE symptoms reflect local spread: invasion of rectum causes RECTAL BLEEDING/constipation; invasion of ureters causes hydronephrosis with REFERRED FLANK PAIN; lateral spread to pelvic side wall causes unilateral leg oedema and sciatic pain. Option B describes two LATE signs of advanced disease.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Late symptoms of cervical cancer include:',
 'Painful micturition, haematuria',
 'Rectal bleeding, referred flank pain',
 'Painless bleeding, menorrhagia',
 'Oedema of extremities, thin watery vaginal discharge',
 'B',
 'Cervical cancer EARLY symptoms: post-coital bleeding, intermenstrual bleeding, watery/blood-stained vaginal discharge. LATE symptoms reflect local spread: invasion of rectum causes RECTAL BLEEDING/constipation; invasion of ureters causes hydronephrosis with REFERRED FLANK PAIN; lateral spread to pelvic side wall causes unilateral leg oedema and sciatic pain. Option B describes two LATE signs of advanced disease.',
 'hard', 'approved', NULL, 'Paper I');

-- Q12 — Motor abilities in a 5-month-old infant
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Growth and Development',
 'The motor abilities observed in a 5-month-old infant include:',
 'Able to sit when supported, turns over front to back',
 'Able to sit unsupported, cruises easily around furniture',
 'Able to pull self to standing position, transfers objects hand to hand',
 'Can hold small objects, holds hands tightly closed',
 'A',
 'Developmental milestones per WHO/Kenya MCH growth chart: at approximately 5 months an infant can sit WITH SUPPORT and roll from front to back; rolling back to front comes at approximately 6 months; sitting unsupported at approximately 6–8 months; cruising around furniture at approximately 9–12 months; pulling to stand at approximately 9 months. Option A fits 5 months best.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Non-communicating hydrocephalus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'In non-communicating forms of hydrocephalus:',
 'CSF formation is normal but re-absorption is abnormal',
 'CSF re-absorption is normal but formation is abnormal',
 'The obstruction exists between the choroid plexi and subarachnoid space',
 'The obstruction exists between the foramen magnum and the central canal',
 'C',
 'NON-COMMUNICATING (obstructive) hydrocephalus is due to physical blockage of CSF flow somewhere WITHIN the ventricular system — between the choroid plexi (where CSF is made) and the subarachnoid space where it would be absorbed. Common sites: cerebral aqueduct (aqueductal stenosis), 4th-ventricle foramina (Magendie, Luschka). COMMUNICATING hydrocephalus is impaired absorption at the arachnoid villi.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'In non-communicating forms of hydrocephalus:',
 'CSF formation is normal but re-absorption is abnormal',
 'CSF re-absorption is normal but formation is abnormal',
 'The obstruction exists between the choroid plexi and subarachnoid space',
 'The obstruction exists between the foramen magnum and the central canal',
 'C',
 'NON-COMMUNICATING (obstructive) hydrocephalus is due to physical blockage of CSF flow somewhere WITHIN the ventricular system — between the choroid plexi (where CSF is made) and the subarachnoid space where it would be absorbed. Common sites: cerebral aqueduct (aqueductal stenosis), 4th-ventricle foramina (Magendie, Luschka). COMMUNICATING hydrocephalus is impaired absorption at the arachnoid villi.',
 'hard', 'approved', NULL, 'Paper I');

-- Q14 — Diet in acute renal failure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The diet implemented for a patient in acute renal failure is:',
 'High protein, high calorie, low sodium, low potassium',
 'Low fat, low protein, high potassium, low sodium',
 'High calorie, low protein, low sodium, low potassium',
 'Bland, low calorie, low sodium, low potassium',
 'C',
 'Diet in acute kidney injury pre-dialysis: HIGH CALORIE (sufficient energy to prevent catabolism of body proteins which would generate more urea); LOW PROTEIN (0.6–0.8 g/kg/day — to reduce nitrogenous waste); LOW SODIUM (to control fluid overload and hypertension); LOW POTASSIUM (avoid hyperkalaemia); LOW PHOSPHATE.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The diet implemented for a patient in acute renal failure is:',
 'High protein, high calorie, low sodium, low potassium',
 'Low fat, low protein, high potassium, low sodium',
 'High calorie, low protein, low sodium, low potassium',
 'Bland, low calorie, low sodium, low potassium',
 'C',
 'Diet in acute kidney injury pre-dialysis: HIGH CALORIE (sufficient energy to prevent catabolism of body proteins which would generate more urea); LOW PROTEIN (0.6–0.8 g/kg/day — to reduce nitrogenous waste); LOW SODIUM (to control fluid overload and hypertension); LOW POTASSIUM (avoid hyperkalaemia); LOW PHOSPHATE.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Right-sided heart failure: JVP distension
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'In right-sided (diastolic) heart failure:',
 'Patients present with distended jugular vein',
 'There is compensatory tachycardia',
 'There is production of frothy sputum',
 'Patients complain of light headedness',
 'A',
 'Right-sided heart failure causes systemic venous congestion: DISTENDED JUGULAR VEINS (raised JVP), peripheral oedema (ankles, sacrum), hepatomegaly, ascites, gut oedema (anorexia, nausea). Frothy pink sputum is characteristic of LEFT-sided failure (pulmonary oedema). Tachycardia and light-headedness can occur in either, but JVP distension is the SPECIFIC right-heart sign.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'In right-sided (diastolic) heart failure:',
 'Patients present with distended jugular vein',
 'There is compensatory tachycardia',
 'There is production of frothy sputum',
 'Patients complain of light headedness',
 'A',
 'Right-sided heart failure causes systemic venous congestion: DISTENDED JUGULAR VEINS (raised JVP), peripheral oedema (ankles, sacrum), hepatomegaly, ascites, gut oedema (anorexia, nausea). Frothy pink sputum is characteristic of LEFT-sided failure (pulmonary oedema). Tachycardia and light-headedness can occur in either, but JVP distension is the SPECIFIC right-heart sign.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Priority interventions for cardiac arrest (first occurrence)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'The priority interventions for a patient who has suffered a cardiac arrest are:',
 'High quality CPR and early defibrillation',
 'Establishing IV access, history taking',
 'Early defibrillation, administration of hydrocortisone',
 'Taking a 12-lead ECG, administration of atropine',
 'A',
 'Per AHA/ERC adult ALS algorithms, the two interventions that most improve survival after cardiac arrest are HIGH-QUALITY CPR (push hard at least 5 cm, push fast 100–120/min, minimise interruptions, full chest recoil) and EARLY DEFIBRILLATION for shockable rhythms (VF/pulseless VT). Drugs, intubation and history-taking are secondary.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'The priority interventions for a patient who has suffered a cardiac arrest are:',
 'High quality CPR and early defibrillation',
 'Establishing IV access, history taking',
 'Early defibrillation, administration of hydrocortisone',
 'Taking a 12-lead ECG, administration of atropine',
 'A',
 'Per AHA/ERC adult ALS algorithms, the two interventions that most improve survival after cardiac arrest are HIGH-QUALITY CPR (push hard at least 5 cm, push fast 100–120/min, minimise interruptions, full chest recoil) and EARLY DEFIBRILLATION for shockable rhythms (VF/pulseless VT). Drugs, intubation and history-taking are secondary.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 SKIPPED — exact duplicate of Set 3 Q4 (nursing patient on steroids)

-- Q18 — Indications for terminal cleaning of isolation room
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Isolation Nursing',
 'The indications for terminal cleaning of isolation room include:',
 'Infective hepatitis, meningococcal hepatitis, malaria, HIV infection',
 'Chicken pox, malaria, measles and pneumonia',
 'Measles, chicken pox, infective hepatitis',
 'Methicillin resistant Staphylococcus aureus (MRSA), liver cirrhosis, measles and hepatitis',
 'C',
 'TERMINAL cleaning is required after discharge of a patient with an infectious disease transmissible by airborne/contact route: MEASLES (airborne), CHICKEN POX/varicella (airborne and contact), INFECTIVE HEPATITIS (contact). Malaria (vector-borne, not person-to-person) does NOT require isolation cleaning; liver cirrhosis is not infectious; pneumonia requires droplet precautions but not necessarily terminal cleaning. Option C is the cleanest, most correct list.',
 'medium', 'approved', NULL, 'Paper II');

-- Q19 — Causes of functional intestinal obstruction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The following are causes of functional intestinal obstruction:',
 'Intussusception, volvulus',
 'Hyperkalaemia, faecal impaction',
 'Peritonitis, paralytic ileus',
 'Peritonitis, hyperkalaemia',
 'C',
 'FUNCTIONAL (paralytic/dynamic) ileus is failure of peristalsis without mechanical obstruction. Causes include: post-operative ileus, PERITONITIS, electrolyte disturbance (hypokalaemia — low K+ impairs smooth muscle), opiates, sepsis, retroperitoneal haemorrhage, and spinal injury. Option C lists peritonitis and paralytic ileus — both functional. Option A lists MECHANICAL obstruction causes (intussusception, volvulus).',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — COPD: chronic hypercapnia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Patients with Chronic Obstructive Pulmonary Disease (COPD):',
 'Have chronic high levels of carbon dioxide (hypercapnia) in circulation',
 'Have increased sensitivity to high levels of carbon dioxide',
 'Their breathing is stimulated by high levels of oxygen',
 'They mainly suffer asthma',
 'A',
 'Long-standing COPD causes chronic CO2 retention (hypercapnia). The central chemoreceptors become DESENSITISED (not increased sensitivity) to chronically high CO2, and the respiratory drive becomes more dependent on HYPOXIA via peripheral chemoreceptors. Giving uncontrolled high-flow O2 can therefore reduce ventilation in some CO2 retainers. Option A is the correct, undisputed statement.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Patients with Chronic Obstructive Pulmonary Disease (COPD):',
 'Have chronic high levels of carbon dioxide (hypercapnia) in circulation',
 'Have increased sensitivity to high levels of carbon dioxide',
 'Their breathing is stimulated by high levels of oxygen',
 'They mainly suffer asthma',
 'A',
 'Long-standing COPD causes chronic CO2 retention (hypercapnia). The central chemoreceptors become DESENSITISED (not increased sensitivity) to chronically high CO2, and the respiratory drive becomes more dependent on HYPOXIA via peripheral chemoreceptors. Giving uncontrolled high-flow O2 can therefore reduce ventilation in some CO2 retainers. Option A is the correct, undisputed statement.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 8 ────────────────────────────────────────────────────────────────────

-- Q1 — Major challenge in the operating room
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Operating Theatre Practice',
 'The major challenge in the operating room is:',
 'Control of infection',
 'Lack of all equipment',
 'Inadequate staff',
 'Lack of modern operation rooms',
 'A',
 'Infection control is the most universal and pervasive challenge in any operating room — surgical site infections (SSIs) increase morbidity, mortality, hospital stay and cost. This is why aseptic technique, theatre zoning, sterile gowning, surgical hand scrub, instrument sterilisation, air-flow control and the WHO Surgical Safety Checklist exist.',
 'easy', 'approved', NULL, 'Paper I');

-- Q2 — Assessing Cushing's syndrome: truncal adiposity
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'When assessing a client with possible Cushing''s syndrome you would expect to find:',
 'Hypotension',
 'Thick coarse skin',
 'Deposits of adipose tissue in the trunk',
 'Weight loss',
 'C',
 'Cushing''s syndrome (cortisol excess) causes characteristic CENTRAL/truncal adiposity (with thin extremities from muscle wasting), HYPERTENSION (not hypotension), THIN fragile skin with purple striae and easy bruising (not thick coarse), and WEIGHT GAIN (not loss). Option C is correct; options A, B and D are opposites of what Cushing''s produces.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'When assessing a client with possible Cushing''s syndrome you would expect to find:',
 'Hypotension',
 'Thick coarse skin',
 'Deposits of adipose tissue in the trunk',
 'Weight loss',
 'C',
 'Cushing''s syndrome (cortisol excess) causes characteristic CENTRAL/truncal adiposity (with thin extremities from muscle wasting), HYPERTENSION (not hypotension), THIN fragile skin with purple striae and easy bruising (not thick coarse), and WEIGHT GAIN (not loss). Option C is correct; options A, B and D are opposites of what Cushing''s produces.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Post subtotal thyroidectomy: most important bedside equipment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Thyroid Surgery',
 'Post subtotal thyroidectomy, the MOST important equipment for a nurse to keep at the bedside is:',
 'Indwelling catheter kit',
 'Tracheostomy set',
 'Cardiac monitor',
 'Humidifier',
 'B',
 'Post-thyroidectomy, the most life-threatening early complication is airway obstruction from neck haematoma compressing the trachea, laryngeal oedema or bilateral recurrent laryngeal nerve injury. A TRACHEOSTOMY SET must be at the bedside for the first 24–48 hours for emergency airway management. Also keep calcium gluconate at the bedside for hypocalcaemic tetany (parathyroid damage).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Thyroid Surgery',
 'Post subtotal thyroidectomy, the MOST important equipment for a nurse to keep at the bedside is:',
 'Indwelling catheter kit',
 'Tracheostomy set',
 'Cardiac monitor',
 'Humidifier',
 'B',
 'Post-thyroidectomy, the most life-threatening early complication is airway obstruction from neck haematoma compressing the trachea, laryngeal oedema or bilateral recurrent laryngeal nerve injury. A TRACHEOSTOMY SET must be at the bedside for the first 24–48 hours for emergency airway management. Also keep calcium gluconate at the bedside for hypocalcaemic tetany (parathyroid damage).',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Rhesus factor location
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Haematology',
 'Rhesus factor is found in the cell membrane of the:',
 'Lymphocytes',
 'Granulocytes',
 'Erythrocytes',
 'Globulins',
 'C',
 'The Rh antigen (D antigen) is a transmembrane protein on the surface of ERYTHROCYTES (red blood cells), along with ABO antigens. Rh status determines compatibility for transfusion and is critical in pregnancy (Rh-negative mother plus Rh-positive fetus leads to haemolytic disease of the newborn if sensitisation occurs).',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Haematology',
 'Rhesus factor is found in the cell membrane of the:',
 'Lymphocytes',
 'Granulocytes',
 'Erythrocytes',
 'Globulins',
 'C',
 'The Rh antigen (D antigen) is a transmembrane protein on the surface of ERYTHROCYTES (red blood cells), along with ABO antigens. Rh status determines compatibility for transfusion and is critical in pregnancy (Rh-negative mother plus Rh-positive fetus leads to haemolytic disease of the newborn if sensitisation occurs).',
 'easy', 'approved', NULL, 'Paper I');

-- Q5 — Shingles: dermatomal rash
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The following skin eruption follows a nerve root on one side of the body:',
 'Urticaria',
 'Shingles',
 'Impetigo',
 'Pemphigus',
 'B',
 'Shingles (herpes zoster) is the reactivation of latent varicella-zoster virus from a dorsal root ganglion. It produces a painful vesicular rash strictly along a single DERMATOME (the area supplied by one sensory nerve root), unilaterally, never crossing the midline. Urticaria, impetigo and pemphigus are not dermatomal distributions.',
 'easy', 'approved', NULL, 'Paper I');

-- Q6 — Bell's palsy: cranial nerve involved
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Bell''s palsy involves the following cranial nerve:',
 'II',
 'IV',
 'VI',
 'VII',
 'D',
 'Bell''s palsy is idiopathic, unilateral, lower-motor-neurone facial weakness caused by inflammation/oedema of cranial nerve VII (the FACIAL nerve). The patient cannot wrinkle the forehead, close the eye, or smile symmetrically on the affected side. Treatment: oral steroids (prednisolone) plus/minus aciclovir, and eye protection.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Bell''s palsy involves the following cranial nerve:',
 'II',
 'IV',
 'VI',
 'VII',
 'D',
 'Bell''s palsy is idiopathic, unilateral, lower-motor-neurone facial weakness caused by inflammation/oedema of cranial nerve VII (the FACIAL nerve). The patient cannot wrinkle the forehead, close the eye, or smile symmetrically on the affected side. Treatment: oral steroids (prednisolone) plus/minus aciclovir, and eye protection.',
 'easy', 'approved', NULL, 'Paper I');

-- Q7 — Counselling definition (different stem from Set 4 Q2 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Professional Nursing Practice',
 'Counselling is:',
 'Helping the client understand his or her problem',
 'Discovering the underlying cause of the client''s problem',
 'Giving solutions to the client''s problems',
 'Making decisions for a client',
 'A',
 'Counselling is a structured, confidential, non-directive interaction in which the counsellor helps the client EXPLORE and UNDERSTAND their own situation, feelings and options — empowering the client to make their own informed decisions. Giving solutions or making decisions is contrary to counselling principles (that is advice-giving or directive coaching).',
 'easy', 'approved', NULL, 'Paper II');

-- Q8 — Risk factors for laryngeal cancer
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Risk factors for laryngeal cancer include:',
 'Tobacco use, paint fumes, voice straining',
 'Sedentary lifestyle, voice straining, acute laryngitis',
 'Nutritional deficiencies, tar products, obesity',
 'Paint fumes, asbestos, obesity',
 'A',
 'Major risk factors for laryngeal cancer: TOBACCO (smoking/snuff — the strongest factor), ALCOHOL (synergistic with smoking), OCCUPATIONAL EXPOSURES (asbestos, paint fumes, nickel, wood dust), chronic voice abuse/strain, chronic laryngitis, HPV infection, GORD, and nutritional deficiencies.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'Risk factors for laryngeal cancer include:',
 'Tobacco use, paint fumes, voice straining',
 'Sedentary lifestyle, voice straining, acute laryngitis',
 'Nutritional deficiencies, tar products, obesity',
 'Paint fumes, asbestos, obesity',
 'A',
 'Major risk factors for laryngeal cancer: TOBACCO (smoking/snuff — the strongest factor), ALCOHOL (synergistic with smoking), OCCUPATIONAL EXPOSURES (asbestos, paint fumes, nickel, wood dust), chronic voice abuse/strain, chronic laryngitis, HPV infection, GORD, and nutritional deficiencies.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Clinical features of pulmonary oedema
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Clinical features of pulmonary oedema include:',
 'Dyspnoea, cyanosis, blood-tinged secretions',
 'Crackles, frothy secretions, wheezing',
 'Chest tightness, cyanosis, wheezing',
 'Difficulty in inspiration, dyspnoea, crackles',
 'B',
 'Acute pulmonary oedema presents with severe dyspnoea/orthopnoea, anxiety, FROTHY PINK-TINGED SPUTUM, inspiratory CRACKLES (bibasal, ascending), cardiac asthma WHEEZE, tachycardia, hypoxia, cyanosis, sweating and pallor. Option B lists three classic chest findings: crackles, frothy secretions, and wheezing.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Clinical features of pulmonary oedema include:',
 'Dyspnoea, cyanosis, blood-tinged secretions',
 'Crackles, frothy secretions, wheezing',
 'Chest tightness, cyanosis, wheezing',
 'Difficulty in inspiration, dyspnoea, crackles',
 'B',
 'Acute pulmonary oedema presents with severe dyspnoea/orthopnoea, anxiety, FROTHY PINK-TINGED SPUTUM, inspiratory CRACKLES (bibasal, ascending), cardiac asthma WHEEZE, tachycardia, hypoxia, cyanosis, sweating and pallor. Option B lists three classic chest findings: crackles, frothy secretions, and wheezing.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Sickle cell priapism: immediate action
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'The immediate action in a patient with sickle cell anaemia who develops priapism is:',
 'Caution the patient against passing urine until the priapism resolves',
 'Make the patient lie still on the bed',
 'Have the patient take a warm bath',
 'Administer morphine at the onset of the attack',
 'C',
 'Stuttering/mild priapism in sickle cell disease: encourage the patient to URINATE, take a WARM BATH/shower, drink plenty of fluids, and exercise gentle movement — these often abort the episode. Persistent priapism (more than 4 hours) is a urological emergency requiring aspiration of corpora, intracavernous alpha-agonist, or exchange transfusion. Morphine is given for severe sickle pain but is not the immediate measure for priapism.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'The immediate action in a patient with sickle cell anaemia who develops priapism is:',
 'Caution the patient against passing urine until the priapism resolves',
 'Make the patient lie still on the bed',
 'Have the patient take a warm bath',
 'Administer morphine at the onset of the attack',
 'C',
 'Stuttering/mild priapism in sickle cell disease: encourage the patient to URINATE, take a WARM BATH/shower, drink plenty of fluids, and exercise gentle movement — these often abort the episode. Persistent priapism (more than 4 hours) is a urological emergency requiring aspiration of corpora, intracavernous alpha-agonist, or exchange transfusion. Morphine is given for severe sickle pain but is not the immediate measure for priapism.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 T/F split → two standalone MCQs
-- Q11a — Rheumatic endocarditis: immune mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Regarding the pathogenesis of rheumatic endocarditis, which statement is CORRECT?',
 'Streptococci directly invade and destroy cardiac tissue causing the valve damage',
 'Rheumatic carditis is immune-mediated: antibodies against streptococcal M-protein cross-react with cardiac tissue (molecular mimicry)',
 'Streptococcal toxins are directly deposited on the cardiac valves causing inflammation',
 'Rheumatic endocarditis is caused by staphylococcal bacteraemia seeding the valves',
 'B',
 'Rheumatic carditis is an IMMUNE-MEDIATED injury. Antibodies and T-cells generated against the M-protein of group A streptococcus cross-react with cardiac tissue (molecular mimicry). The streptococci themselves are NOT present in the heart — the disease is a post-infectious autoimmune complication, not direct bacterial invasion.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Regarding the pathogenesis of rheumatic endocarditis, which statement is CORRECT?',
 'Streptococci directly invade and destroy cardiac tissue causing the valve damage',
 'Rheumatic carditis is immune-mediated: antibodies against streptococcal M-protein cross-react with cardiac tissue (molecular mimicry)',
 'Streptococcal toxins are directly deposited on the cardiac valves causing inflammation',
 'Rheumatic endocarditis is caused by staphylococcal bacteraemia seeding the valves',
 'B',
 'Rheumatic carditis is an IMMUNE-MEDIATED injury. Antibodies and T-cells generated against the M-protein of group A streptococcus cross-react with cardiac tissue (molecular mimicry). The streptococci themselves are NOT present in the heart — the disease is a post-infectious autoimmune complication, not direct bacterial invasion.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11b — Digoxin and hyperkalaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'Regarding digoxin toxicity, which electrolyte abnormality POTENTIATES its toxic effects?',
 'Hyperkalaemia',
 'Hypernatraemia',
 'Hypokalaemia',
 'Hypercalcaemia',
 'C',
 'Digoxin toxicity is precipitated and worsened by HYPOKALAEMIA (low K+). Low potassium reduces competition at the Na+/K+-ATPase pump, increasing digoxin binding and toxicity. This is why potassium levels must be monitored and maintained when patients are on digoxin — especially those also taking loop diuretics which cause potassium loss. Hyperkalaemia reduces digoxin effect rather than potentiating toxicity.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'Regarding digoxin toxicity, which electrolyte abnormality POTENTIATES its toxic effects?',
 'Hyperkalaemia',
 'Hypernatraemia',
 'Hypokalaemia',
 'Hypercalcaemia',
 'C',
 'Digoxin toxicity is precipitated and worsened by HYPOKALAEMIA (low K+). Low potassium reduces competition at the Na+/K+-ATPase pump, increasing digoxin binding and toxicity. This is why potassium levels must be monitored and maintained when patients are on digoxin — especially those also taking loop diuretics which cause potassium loss. Hyperkalaemia reduces digoxin effect rather than potentiating toxicity.',
 'hard', 'approved', NULL, 'Paper I');

-- Q12 — Fast breathing in 8-month-old (IMCI)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMCI Guidelines',
 'An 8-month-old baby is said to have fast breathing if the respiration rate is:',
 'Equal to or greater than 30 breaths per minute',
 'Equal to or greater than 40 breaths per minute',
 'Equal to or greater than 50 breaths per minute',
 'Equal to or greater than 60 breaths per minute',
 'C',
 'Per Kenya IMCI fast-breathing cut-offs: less than 2 months = 60 or more breaths/min; 2–11 months = 50 or more breaths/min; 12 months to 5 years = 40 or more breaths/min. An 8-month-old falls in the 2–11 month category, so fast breathing = 50 or more breaths/min.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Leukaemia: viral predisposition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Leukaemia:',
 'Is characterised by abnormal proliferation of plasma cells',
 'Viral infection is one of the predisposing factors',
 'Is characterised by increased platelets in blood',
 'Lowers the body metabolic rate',
 'B',
 'Viral infections (HTLV-1 leading to adult T-cell leukaemia; EBV associated with some lymphomas/leukaemia) are recognised aetiological factors in leukaemia, along with ionising radiation, benzene, alkylating chemotherapy and chromosomal disorders (Down syndrome, Fanconi anaemia). Plasma cell proliferation is MULTIPLE MYELOMA. Leukaemia features THROMBOCYTOPAENIA (not increased platelets) and a HYPERMETABOLIC state.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Leukaemia:',
 'Is characterised by abnormal proliferation of plasma cells',
 'Viral infection is one of the predisposing factors',
 'Is characterised by increased platelets in blood',
 'Lowers the body metabolic rate',
 'B',
 'Viral infections (HTLV-1 leading to adult T-cell leukaemia; EBV associated with some lymphomas/leukaemia) are recognised aetiological factors in leukaemia, along with ionising radiation, benzene, alkylating chemotherapy and chromosomal disorders (Down syndrome, Fanconi anaemia). Plasma cell proliferation is MULTIPLE MYELOMA. Leukaemia features THROMBOCYTOPAENIA (not increased platelets) and a HYPERMETABOLIC state.',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Accidental sharps injury: first aid
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Post-Exposure Prophylaxis',
 'In cases of an accidental sharp injury, one should:',
 'Wash the site with soap and water',
 'Squeeze the site to enhance bleeding',
 'Apply a tourniquet proximal to the site',
 'Apply a tourniquet distal to the site',
 'A',
 'Per Kenya MoH and WHO post-exposure protocols, immediate first aid after a needlestick/sharps injury: ALLOW the wound to bleed freely (do NOT squeeze, which could traumatise tissue); WASH thoroughly with SOAP AND WATER; cover with a waterproof dressing; report immediately for risk assessment and PEP (post-exposure prophylaxis) if indicated. Tourniquets are never used for needlestick injuries.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Infection Prevention & Control', 'Post-Exposure Prophylaxis',
 'In cases of an accidental sharp injury, one should:',
 'Wash the site with soap and water',
 'Squeeze the site to enhance bleeding',
 'Apply a tourniquet proximal to the site',
 'Apply a tourniquet distal to the site',
 'A',
 'Per Kenya MoH and WHO post-exposure protocols, immediate first aid after a needlestick/sharps injury: ALLOW the wound to bleed freely (do NOT squeeze, which could traumatise tissue); WASH thoroughly with SOAP AND WATER; cover with a waterproof dressing; report immediately for risk assessment and PEP (post-exposure prophylaxis) if indicated. Tourniquets are never used for needlestick injuries.',
 'easy', 'approved', NULL, 'Paper II');

-- Q15 — Management of lumbar disk herniation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Management of a patient with lumbar disk herniation includes:',
 'Bed rest, heat treatment, analgesics',
 'Ambulation, analgesics, heat treatment',
 'Bed rest, cold compressions, analgesics',
 'Ambulation, cold compressions, analgesics',
 'A',
 'Conservative management of lumbar disc prolapse: a SHORT period of bed rest on a firm bed (no longer than 1–2 days — prolonged bed rest is now discouraged), HEAT (or alternating ice/heat), analgesics (NSAIDs, paracetamol, muscle relaxants), gradual mobilisation and physiotherapy. Surgery (discectomy) is reserved for failure of conservative management or progressive neurological deficit/cauda equina syndrome.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Hirschsprung's disease
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Gastrointestinal Disorders in Children',
 'Hirschsprung''s disease is a congenital condition in which:',
 'A portion of large intestine is grossly dilated',
 'A portion of the large intestine is stenosed',
 'The anal membranes fail to rupture',
 'There is abnormal opening of the oesophageal wall',
 'A',
 'Hirschsprung''s disease is congenital aganglionosis: the distal colon/rectum lacks parasympathetic ganglion cells (Meissner and Auerbach plexuses) and cannot relax, creating functional obstruction. The colon PROXIMAL to the aganglionic segment becomes grossly DILATED (megacolon). Presentation: delayed passage of meconium (more than 24 hours in term newborn), abdominal distension, bilious vomiting. Option C describes imperforate anal membrane; option D describes oesophageal atresia/TEF.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Gastrointestinal Disorders in Children',
 'Hirschsprung''s disease is a congenital condition in which:',
 'A portion of large intestine is grossly dilated',
 'A portion of the large intestine is stenosed',
 'The anal membranes fail to rupture',
 'There is abnormal opening of the oesophageal wall',
 'A',
 'Hirschsprung''s disease is congenital aganglionosis: the distal colon/rectum lacks parasympathetic ganglion cells (Meissner and Auerbach plexuses) and cannot relax, creating functional obstruction. The colon PROXIMAL to the aganglionic segment becomes grossly DILATED (megacolon). Presentation: delayed passage of meconium (more than 24 hours in term newborn), abdominal distension, bilious vomiting. Option C describes imperforate anal membrane; option D describes oesophageal atresia/TEF.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Rheumatoid arthritis: no cure but disease control
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'A patient with rheumatoid arthritis asks a nurse if there is a cure. An appropriate response would be:',
 'Yes, there are drugs that offer cure',
 'Yes but the patient must take medication for at least 10 years',
 'No but there are drugs to control the disease process',
 'No, most patients with rheumatoid arthritis also develop osteoarthritis',
 'C',
 'Rheumatoid arthritis is a chronic AUTOIMMUNE disease with no cure. Modern DMARDs (methotrexate, sulphasalazine, leflunomide), biologics (anti-TNF, rituximab) and JAK inhibitors can slow progression and induce remission. The honest, therapeutic response is option C.',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Cholecystitis: fatty meal worsens symptoms
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Nursing interventions for a patient with cholecystitis associated with cholelithiasis are based on the knowledge that:',
 'The disorder can be successfully treated with oral bile salts that dissolve gallstones',
 'Analgesics are usually not necessary to relieve the pain of bile duct spasms',
 'A heavy meal with a high fat content may worsen the signs and symptoms of the disease',
 'A low cholesterol diet is indicated to reduce the availability of cholesterol for gallstone formation',
 'C',
 'Cholecystokinin is released in response to dietary fat, triggering gallbladder contraction. In a gallbladder containing stones or inflamed, this contraction precipitates biliary colic. Patients should AVOID fatty/heavy meals. Oral bile-salt dissolution (ursodeoxycholic acid) works in only select cases; analgesia IS required for biliary pain; low-cholesterol diet does not appreciably reduce stone formation once stones are formed.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Early symptom of cataract (different stem from Set 1 Q7 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'The following is an early symptom of cataract:',
 'Pain in the eyes',
 'Blurred vision',
 'Loss of peripheral vision',
 'Dry eyes',
 'B',
 'Cataracts are painless, progressive opacification of the lens. The earliest symptom is gradual BLURRING of vision and decreased contrast/colour sensitivity, followed by glare in bright light. Loss of peripheral vision is characteristic of GLAUCOMA, not cataracts. Cataract causes no pain.',
 'easy', 'approved', NULL, 'Paper I');

-- Q20 — Triad symptoms of Meniere's disease (different stem from Set 2 Q10 which was about drugs)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'The triad symptoms in Meniere''s disease include:',
 'Vertigo, sensorineural hearing loss, tinnitus',
 'Vomiting, nystagmus, sensorineural hearing loss',
 'Tinnitus, headache, vision changes',
 'Headache, vertigo, vomiting',
 'A',
 'Meniere''s disease (endolymphatic hydrops) classic triad: episodic VERTIGO (minutes to hours, with nausea/vomiting), fluctuating SENSORINEURAL HEARING LOSS (low-frequency), and TINNITUS, often with aural fullness. Attacks last 20 minutes to several hours. This triad distinguishes Meniere''s from other vestibular disorders.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'The triad symptoms in Meniere''s disease include:',
 'Vertigo, sensorineural hearing loss, tinnitus',
 'Vomiting, nystagmus, sensorineural hearing loss',
 'Tinnitus, headache, vision changes',
 'Headache, vertigo, vomiting',
 'A',
 'Meniere''s disease (endolymphatic hydrops) classic triad: episodic VERTIGO (minutes to hours, with nausea/vomiting), fluctuating SENSORINEURAL HEARING LOSS (low-frequency), and TINNITUS, often with aural fullness. Attacks last 20 minutes to several hours. This triad distinguishes Meniere''s from other vestibular disorders.',
 'easy', 'approved', NULL, 'Paper I');

-- ─── SET 9 ────────────────────────────────────────────────────────────────────

-- Q1 — Sitz baths post haemorrhoidectomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'Sitz baths post haemorrhoidectomy are meant to:',
 'Promote healing',
 'Relieve tension',
 'Lower body temperature',
 'Prevent infection',
 'A',
 'A warm sitz bath after haemorrhoidectomy (3–4 times daily and after defecation) promotes circulation to the perineum, relaxes the anal sphincter, cleanses the operative site, relieves pain and spasm, reduces oedema, and thereby promotes healing. It also helps prevent infection, but the primary stated purpose is healing.',
 'easy', 'approved', NULL, 'Paper I');

-- Q2 — Trousseau's sign: hypocalcaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Trousseau''s sign is associated with:',
 'Hyponatraemia',
 'Hypocalcaemia',
 'Hypernatraemia',
 'Hypercalcaemia',
 'B',
 'Trousseau''s sign is carpopedal spasm (flexion of wrist and MCP joints, extension of fingers, adduction of thumb) induced by inflating a BP cuff above systolic pressure for 3 minutes — produced by neuromuscular irritability from HYPOCALCAEMIA. Chvostek''s sign (twitching of facial muscles on tapping the facial nerve) is the other classic sign. Both are seen post-thyroidectomy (parathyroid damage).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Trousseau''s sign is associated with:',
 'Hyponatraemia',
 'Hypocalcaemia',
 'Hypernatraemia',
 'Hypercalcaemia',
 'B',
 'Trousseau''s sign is carpopedal spasm (flexion of wrist and MCP joints, extension of fingers, adduction of thumb) induced by inflating a BP cuff above systolic pressure for 3 minutes — produced by neuromuscular irritability from HYPOCALCAEMIA. Chvostek''s sign (twitching of facial muscles on tapping the facial nerve) is the other classic sign. Both are seen post-thyroidectomy (parathyroid damage).',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Rheumatoid arthritis: swan-neck deformities
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Rheumatoid arthritis presents with:',
 'Heberden''s nodes',
 'Morning stiffness no longer than 30 minutes',
 'Asymmetric joint swelling',
 'Swan neck deformities',
 'D',
 'Rheumatoid arthritis classic features: SYMMETRIC small-joint polyarthritis (MCPs, PIPs, wrists), MORNING STIFFNESS LASTING MORE THAN 1 HOUR, characteristic deformities — SWAN-NECK (hyperextension of PIP, flexion of DIP), BOUTONNIERE (flexion PIP, hyperextension DIP), ulnar deviation, Z-thumb. Heberden''s nodes (DIP osteophytes) and morning stiffness less than 30 minutes indicate OSTEOARTHRITIS.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'Rheumatoid arthritis presents with:',
 'Heberden''s nodes',
 'Morning stiffness no longer than 30 minutes',
 'Asymmetric joint swelling',
 'Swan neck deformities',
 'D',
 'Rheumatoid arthritis classic features: SYMMETRIC small-joint polyarthritis (MCPs, PIPs, wrists), MORNING STIFFNESS LASTING MORE THAN 1 HOUR, characteristic deformities — SWAN-NECK (hyperextension of PIP, flexion of DIP), BOUTONNIERE (flexion PIP, hyperextension DIP), ulnar deviation, Z-thumb. Heberden''s nodes (DIP osteophytes) and morning stiffness less than 30 minutes indicate OSTEOARTHRITIS.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Epilepsy aura: smell of roses
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'A patient with epilepsy experiencing a generalised tingling sensation and "smelling roses" is probably experiencing:',
 'An acute alcohol withdrawal',
 'An acute cerebral vascular accident',
 'An aura',
 'An olfactory hallucination',
 'C',
 'An AURA is a subjective warning sensation preceding a seizure — it is essentially a simple partial (focal aware) seizure arising from the cortical onset zone. Auras can be olfactory (smelling burnt rubber or roses — temporal lobe onset), visual, somatosensory (tingling), gustatory or psychic (deja vu). Although the smell is technically an olfactory hallucination, in this clinical context it IS the seizure aura — option C is the more complete and contextually correct answer.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'A patient with epilepsy experiencing a generalised tingling sensation and "smelling roses" is probably experiencing:',
 'An acute alcohol withdrawal',
 'An acute cerebral vascular accident',
 'An aura',
 'An olfactory hallucination',
 'C',
 'An AURA is a subjective warning sensation preceding a seizure — it is essentially a simple partial (focal aware) seizure arising from the cortical onset zone. Auras can be olfactory (smelling burnt rubber or roses — temporal lobe onset), visual, somatosensory (tingling), gustatory or psychic (deja vu). Although the smell is technically an olfactory hallucination, in this clinical context it IS the seizure aura — option C is the more complete and contextually correct answer.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Dysphagia post CVA: avoid thin liquids
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'When feeding a patient with residual dysphagia due to a cerebral vascular accident, the nurse should avoid:',
 'Giving the client thin liquids',
 'Thickening liquids',
 'Placing food on the unaffected side of the mouth',
 'Placing the patient in low Fowler''s position',
 'A',
 'Patients with dysphagia after stroke have the greatest difficulty controlling THIN LIQUIDS (water, tea, juice) — these flow rapidly past the impaired pharyngeal phase and are easily aspirated. The nurse should AVOID thin liquids; THICKEN liquids (option B is correct practice); place food on the UNAFFECTED side of the mouth (option C correct); and position the patient sitting UP. Speech and language therapist assessment is standard.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'When feeding a patient with residual dysphagia due to a cerebral vascular accident, the nurse should avoid:',
 'Giving the client thin liquids',
 'Thickening liquids',
 'Placing food on the unaffected side of the mouth',
 'Placing the patient in low Fowler''s position',
 'A',
 'Patients with dysphagia after stroke have the greatest difficulty controlling THIN LIQUIDS (water, tea, juice) — these flow rapidly past the impaired pharyngeal phase and are easily aspirated. The nurse should AVOID thin liquids; THICKEN liquids (option B is correct practice); place food on the UNAFFECTED side of the mouth (option C correct); and position the patient sitting UP. Speech and language therapist assessment is standard.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — Liver cirrhosis: bleeding precautions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'In chronic liver cirrhosis, a nurse emphasises bleeding precautions because:',
 'The low protein diet will result in reduced clotting',
 'The increased production of bile decreases clotting factors',
 'The liver is unable to produce clotting factors',
 'The required medications reduce clotting factors',
 'C',
 'The liver synthesises clotting factors I (fibrinogen), II (prothrombin), V, VII, IX, X, XI and XIII, plus proteins C and S. In cirrhosis, hepatocyte mass is lost, synthesis falls and PT/INR rises. Additionally, portal hypertension causes hypersplenism and thrombocytopaenia, and varices add bleeding risk. Bleeding precautions: soft toothbrush, electric razor, avoid IM injections, avoid aspirin/NSAIDs.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'In chronic liver cirrhosis, a nurse emphasises bleeding precautions because:',
 'The low protein diet will result in reduced clotting',
 'The increased production of bile decreases clotting factors',
 'The liver is unable to produce clotting factors',
 'The required medications reduce clotting factors',
 'C',
 'The liver synthesises clotting factors I (fibrinogen), II (prothrombin), V, VII, IX, X, XI and XIII, plus proteins C and S. In cirrhosis, hepatocyte mass is lost, synthesis falls and PT/INR rises. Additionally, portal hypertension causes hypersplenism and thrombocytopaenia, and varices add bleeding risk. Bleeding precautions: soft toothbrush, electric razor, avoid IM injections, avoid aspirin/NSAIDs.',
 'medium', 'approved', NULL, 'Paper I');

-- Q7 — Psoriasis: moisturisers to soften scales
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'Management of scaled lesions in psoriasis includes:',
 'Covering the lesions with occlusive dressings to remove the scales',
 'Applying moisturisers to soften the scales',
 'Shaving the scales using a clean razor',
 'Keeping the lesions dry to enhance dropping off of the scales',
 'B',
 'Topical management of psoriasis scaling: EMOLLIENTS/MOISTURISERS soften and lift the silvery scales, allowing penetration of active agents — topical corticosteroids, vitamin-D analogues (calcipotriol), coal tar, dithranol, salicylic acid as keratolytic. Shaving the scales causes Koebner phenomenon (new psoriasis in injured skin). Dry skin worsens psoriasis.',
 'medium', 'approved', NULL, 'Paper I');

-- Q8 — Indications for erythromycin
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Anti-infective Drugs',
 'Indications for erythromycin include:',
 'Legionnaire''s disease, pneumonia',
 'Multiple sclerosis, campylobacterial infection',
 'Pneumonia, multiple sclerosis',
 'Legionnaire''s disease, multiple sclerosis',
 'A',
 'Erythromycin is a macrolide antibiotic active against Gram-positive cocci, atypical respiratory pathogens (Mycoplasma, Chlamydia, Legionella), Bordetella pertussis, Campylobacter and Helicobacter. Clinical indications include atypical/community-acquired PNEUMONIA, LEGIONNAIRE''S DISEASE, pertussis, diphtheria, chlamydial infections and as a penicillin alternative. Multiple sclerosis is autoimmune — not an antibiotic indication.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Anti-infective Drugs',
 'Indications for erythromycin include:',
 'Legionnaire''s disease, pneumonia',
 'Multiple sclerosis, campylobacterial infection',
 'Pneumonia, multiple sclerosis',
 'Legionnaire''s disease, multiple sclerosis',
 'A',
 'Erythromycin is a macrolide antibiotic active against Gram-positive cocci, atypical respiratory pathogens (Mycoplasma, Chlamydia, Legionella), Bordetella pertussis, Campylobacter and Helicobacter. Clinical indications include atypical/community-acquired PNEUMONIA, LEGIONNAIRE''S DISEASE, pertussis, diphtheria, chlamydial infections and as a penicillin alternative. Multiple sclerosis is autoimmune — not an antibiotic indication.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — 3-month-old baby fast breathing threshold (different from Set 8 Q12 which was 8 months)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'IMCI Guidelines',
 'A three-month-old baby classified to have pneumonia is likely to have a respiratory rate of:',
 '40 breaths per minute',
 '30 breaths per minute',
 '50 breaths per minute',
 '60 breaths per minute',
 'C',
 'Per Kenya IMCI fast-breathing cut-offs: 2–11 months = 50 or more breaths/min. A 3-month-old falls in this band, so a respiratory rate of 50 breaths/min (or more) classifies as pneumonia. Note: 60 breaths/min would also qualify, but 50 is the threshold itself for this age group.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Status asthmaticus: consequences (different stem from Set 7 Q3 on precipitants)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Status asthmaticus that is not corrected can result in:',
 'Respiratory alkalosis, respiratory arrest',
 'Respiratory acidosis, severe hypoxaemia',
 'Hypocapnia, respiratory failure',
 'Hypertension, cardiac arrest',
 'B',
 'Early status asthmaticus shows hyperventilation causing respiratory ALKALOSIS with hypocapnia. As the patient tires (ominous sign — silent chest, drowsiness, NORMAL/RISING PaCO2 in a tachypnoeic asthmatic), ventilation fails: PaCO2 rises (RESPIRATORY ACIDOSIS) and severe HYPOXAEMIA develops, heralding respiratory arrest. A rising PaCO2 in acute severe asthma is a red flag requiring urgent ICU and ventilatory support.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Status asthmaticus that is not corrected can result in:',
 'Respiratory alkalosis, respiratory arrest',
 'Respiratory acidosis, severe hypoxaemia',
 'Hypocapnia, respiratory failure',
 'Hypertension, cardiac arrest',
 'B',
 'Early status asthmaticus shows hyperventilation causing respiratory ALKALOSIS with hypocapnia. As the patient tires (ominous sign — silent chest, drowsiness, NORMAL/RISING PaCO2 in a tachypnoeic asthmatic), ventilation fails: PaCO2 rises (RESPIRATORY ACIDOSIS) and severe HYPOXAEMIA develops, heralding respiratory arrest. A rising PaCO2 in acute severe asthma is a red flag requiring urgent ICU and ventilatory support.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Non-invasive method of evaluating blood flow
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Diagnostics',
 'A non-invasive method of evaluating blood flow is:',
 'Venography',
 'Cardiac catheterisation',
 'Angiography',
 'Doppler ultrasonography',
 'D',
 'Doppler ultrasonography is a NON-INVASIVE imaging technique that uses the frequency shift of reflected ultrasound waves to assess blood flow direction and velocity — used in DVT diagnosis, peripheral arterial disease, carotid stenosis and echocardiography. Venography, angiography and cardiac catheterisation all require vascular puncture and contrast injection — they are invasive procedures.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Diagnostics',
 'A non-invasive method of evaluating blood flow is:',
 'Venography',
 'Cardiac catheterisation',
 'Angiography',
 'Doppler ultrasonography',
 'D',
 'Doppler ultrasonography is a NON-INVASIVE imaging technique that uses the frequency shift of reflected ultrasound waves to assess blood flow direction and velocity — used in DVT diagnosis, peripheral arterial disease, carotid stenosis and echocardiography. Venography, angiography and cardiac catheterisation all require vascular puncture and contrast injection — they are invasive procedures.',
 'medium', 'approved', NULL, 'Paper I');

-- Q12 — BPH: most relevant assessment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Disorders',
 'The most relevant assessment for a patient admitted with benign prostatic hyperplasia is:',
 'Flank pain radiating to the groin',
 'Distension of the lower abdomen',
 'Perineal oedema',
 'Urethral discharge',
 'B',
 'BPH causes bladder outlet obstruction with retention. The most relevant nursing assessment is for a DISTENDED BLADDER (lower-abdominal distension/dullness up to or above the umbilicus, palpable bladder, urge to void without producing urine). Flank pain radiating to groin suggests ureteric colic (renal stone); perineal oedema and urethral discharge suggest infection.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Aplastic anaemia: monitor bleeding
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Haematological Disorders in Children',
 'A child with aplastic anaemia should be monitored for:',
 'Bowel function',
 'Peripheral sensation',
 'Bleeding tendencies',
 'Fluid intake and output',
 'C',
 'Aplastic anaemia is pancytopenia from bone-marrow failure: anaemia (low Hb), neutropenia (infection risk), and THROMBOCYTOPAENIA (bleeding risk). Children present with petechiae, ecchymoses, epistaxis, gum bleeding and risk of life-threatening intracranial haemorrhage. Strict bleeding precautions, monitoring for bleeding, infection control and blood-product support are key.',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Nursing diagnosis for leukaemia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Nursing diagnosis for a patient with leukaemia include:',
 'Impaired gaseous exchange, hypothermia',
 'Excess fluid volume, impaired skin integrity',
 'Risk for injury (bleeding), impaired gaseous exchange',
 'Pain, hypothermia',
 'C',
 'Leukaemia causes pancytopenia: anaemia leading to IMPAIRED GAS EXCHANGE and activity intolerance; thrombocytopaenia leading to RISK FOR INJURY (BLEEDING); neutropenia leading to risk for infection; bone-marrow expansion and chemotherapy causing pain. Hypothermia and excess fluid volume are not typical leukaemia nursing diagnoses.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'Nursing diagnosis for a patient with leukaemia include:',
 'Impaired gaseous exchange, hypothermia',
 'Excess fluid volume, impaired skin integrity',
 'Risk for injury (bleeding), impaired gaseous exchange',
 'Pain, hypothermia',
 'C',
 'Leukaemia causes pancytopenia: anaemia leading to IMPAIRED GAS EXCHANGE and activity intolerance; thrombocytopaenia leading to RISK FOR INJURY (BLEEDING); neutropenia leading to risk for infection; bone-marrow expansion and chemotherapy causing pain. Hypothermia and excess fluid volume are not typical leukaemia nursing diagnoses.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Causative organism: malignant otitis externa
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'Causative organism of malignant otitis externa is:',
 'Staph aureus',
 'Beta haemolytic streptococci',
 'Pseudomonas',
 'Pneumococcal',
 'C',
 'Malignant (necrotising) otitis externa is a severe, invasive infection of the external ear canal spreading to the skull base. It occurs almost exclusively in elderly diabetics and the immunocompromised, and is caused overwhelmingly by PSEUDOMONAS AERUGINOSA. Treatment requires prolonged systemic anti-pseudomonal antibiotics (ciprofloxacin or ceftazidime plus aminoglycoside) and tight glycaemic control.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'Causative organism of malignant otitis externa is:',
 'Staph aureus',
 'Beta haemolytic streptococci',
 'Pseudomonas',
 'Pneumococcal',
 'C',
 'Malignant (necrotising) otitis externa is a severe, invasive infection of the external ear canal spreading to the skull base. It occurs almost exclusively in elderly diabetics and the immunocompromised, and is caused overwhelmingly by PSEUDOMONAS AERUGINOSA. Treatment requires prolonged systemic anti-pseudomonal antibiotics (ciprofloxacin or ceftazidime plus aminoglycoside) and tight glycaemic control.',
 'hard', 'approved', NULL, 'Paper I');

-- Q16 — Drug contraindicated in glaucoma: atropine
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Eye Medications',
 'The following drug is contraindicated in glaucoma:',
 'Atropine sulphate',
 'Gentamycin',
 'Heparin',
 'Frusemide',
 'A',
 'Atropine and other anticholinergics/mydriatics DILATE the pupil; in narrow-angle glaucoma, mydriasis can precipitate acute angle closure by obstructing aqueous outflow through the trabecular meshwork — a sight-threatening emergency. Anticholinergic drugs (atropine, ipratropium, tricyclic antidepressants, antihistamines) are contraindicated in narrow-angle glaucoma.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Eye Medications',
 'The following drug is contraindicated in glaucoma:',
 'Atropine sulphate',
 'Gentamycin',
 'Heparin',
 'Frusemide',
 'A',
 'Atropine and other anticholinergics/mydriatics DILATE the pupil; in narrow-angle glaucoma, mydriasis can precipitate acute angle closure by obstructing aqueous outflow through the trabecular meshwork — a sight-threatening emergency. Anticholinergic drugs (atropine, ipratropium, tricyclic antidepressants, antihistamines) are contraindicated in narrow-angle glaucoma.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Best position post gastrectomy (child)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'The best position for a 9-year-old two days post gastrectomy is:',
 'Left lateral',
 'Low Fowler''s',
 'Prone',
 'Supine',
 'B',
 'Post-gastrectomy patients are positioned in LOW (or SEMI-) FOWLER''S — head of bed elevated to approximately 30 degrees. This reduces strain on the abdominal suture line, prevents reflux of gastric contents (especially with NG tube in place), promotes lung expansion and drainage, and is generally comfortable. Flat supine increases reflux risk; left lateral is the post-meal anti-dumping position; prone is unsuitable post-abdominal surgery.',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Angiotensin II releases aldosterone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Renal and Endocrine Physiology',
 'Angiotensin II causes release of:',
 'Renin',
 'Aldosterone',
 'Calcitonin',
 'Thyroxine',
 'B',
 'Angiotensin II is the central effector of the renin-angiotensin-aldosterone system. It (i) is a potent vasoconstrictor; (ii) stimulates the zona glomerulosa of the adrenal cortex to release ALDOSTERONE; (iii) stimulates posterior pituitary ADH release; (iv) promotes thirst and sodium reabsorption. Renin is RELEASED from the kidney''s juxtaglomerular cells to INITIATE the cascade — not released by angiotensin II.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Renal and Endocrine Physiology',
 'Angiotensin II causes release of:',
 'Renin',
 'Aldosterone',
 'Calcitonin',
 'Thyroxine',
 'B',
 'Angiotensin II is the central effector of the renin-angiotensin-aldosterone system. It (i) is a potent vasoconstrictor; (ii) stimulates the zona glomerulosa of the adrenal cortex to release ALDOSTERONE; (iii) stimulates posterior pituitary ADH release; (iv) promotes thirst and sodium reabsorption. Renin is RELEASED from the kidney''s juxtaglomerular cells to INITIATE the cascade — not released by angiotensin II.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 SKIPPED — exact duplicate of Set 4 Q6 (Management of osteoporosis: weight bearing exercises + calcium)

-- Q20 — Post eye surgery / MI diet T/F split → two standalone MCQs
-- Q20a — Post eye surgery: no coughing exercises
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Eye Surgery',
 'Following eye surgery, which of the following is CORRECT regarding post-operative instructions?',
 'The patient should perform frequent coughing exercises to prevent respiratory complications',
 'The patient should avoid coughing, straining and bending as these raise intraocular pressure',
 'The patient may sneeze freely as this does not affect the surgical repair',
 'Deep breathing and coughing exercises are mandatory every 2 hours post-operatively',
 'B',
 'Coughing dramatically raises intra-ocular pressure and can disrupt the surgical repair (wound dehiscence, expulsive haemorrhage, vitreous loss). Patients are explicitly told NOT to cough, sneeze forcefully, strain or bend. Deep breathing WITHOUT forceful coughing is acceptable. Patients with post-op nausea must receive antiemetics promptly to prevent vomiting.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20b — MI patient diet
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Which of the following best describes the appropriate diet for a patient with myocardial infarction?',
 'High calorie, high protein diet to support cardiac healing',
 'Low-salt, low-saturated-fat, calorie-controlled diet with small frequent meals',
 'High fibre, high carbohydrate diet to reduce myocardial oxygen demand',
 'Unrestricted diet to maintain adequate nutritional intake',
 'B',
 'MI patients are placed on a LOW-SALT, LOW-SATURATED-FAT, calorie-CONTROLLED diet to reduce cardiac workload and prevent obesity/hyperlipidaemia. Small, frequent, light meals are preferred to avoid the postprandial cardiac demand surge. High calorie diets are inappropriate as they worsen atherosclerosis risk factors.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Which of the following best describes the appropriate diet for a patient with myocardial infarction?',
 'High calorie, high protein diet to support cardiac healing',
 'Low-salt, low-saturated-fat, calorie-controlled diet with small frequent meals',
 'High fibre, high carbohydrate diet to reduce myocardial oxygen demand',
 'Unrestricted diet to maintain adequate nutritional intake',
 'B',
 'MI patients are placed on a LOW-SALT, LOW-SATURATED-FAT, calorie-CONTROLLED diet to reduce cardiac workload and prevent obesity/hyperlipidaemia. Small, frequent, light meals are preferred to avoid the postprandial cardiac demand surge. High calorie diets are inappropriate as they worsen atherosclerosis risk factors.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 10 ───────────────────────────────────────────────────────────────────
-- Q1 SKIPPED — exact duplicate of Set 8 Q2 (Cushing's syndrome: truncal adiposity)
-- Q3 SKIPPED — exact duplicate of Set 8 Q4 (Rhesus factor on erythrocytes)
-- Q4 SKIPPED — exact duplicate of Set 8 Q10 (Sickle cell priapism: warm bath)
-- Q5 SKIPPED — exact duplicate of Set 8 Q11 T/F pair (rheumatic endocarditis + digoxin)
-- Q13 SKIPPED — exact duplicate of Set 6 Q7 (expected outcomes: impaired gas exchange)
-- Q15 SKIPPED — exact duplicate of Set 7 Q9 (deteriorating head injury: widening pulse pressure)

-- Q2 — DKA hyperventilation: low pH drives Kussmaul breathing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'A patient with diabetic ketoacidosis presents with hyperventilation because:',
 'The respiratory centre in the brain is damaged',
 'The body pH is low',
 'There is high rate of oxygen consumption',
 'There is reduced excretion of waste through the renal system',
 'B',
 'In DKA, ketone bodies (beta-hydroxybutyrate and acetoacetate) accumulate, causing metabolic acidosis (low pH). The body compensates by hyperventilation (deep, rapid Kussmaul respirations) to blow off CO2 and raise pH. This is RESPIRATORY COMPENSATION for metabolic acidosis — not brain damage or increased oxygen demand.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'A patient with diabetic ketoacidosis presents with hyperventilation because:',
 'The respiratory centre in the brain is damaged',
 'The body pH is low',
 'There is high rate of oxygen consumption',
 'There is reduced excretion of waste through the renal system',
 'B',
 'In DKA, ketone bodies (beta-hydroxybutyrate and acetoacetate) accumulate, causing metabolic acidosis (low pH). The body compensates by hyperventilation (deep, rapid Kussmaul respirations) to blow off CO2 and raise pH. This is RESPIRATORY COMPENSATION for metabolic acidosis — not brain damage or increased oxygen demand.',
 'hard', 'approved', NULL, 'Paper I');

-- Q6 — Atherosclerosis mechanism: plaques obstruct arteries
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Atherosclerosis impedes coronary blood flow by the following mechanism:',
 'Plaques obstruct the vein',
 'Plaques obstruct the artery',
 'Blood clots form outside the vessel wall',
 'Hardened vessels dilate to allow the blood to flow through',
 'B',
 'Atherosclerosis is the deposition of cholesterol-laden atheromatous plaques in the intima of ARTERIES — these progressively narrow the arterial lumen, restricting blood flow. Plaque rupture exposes a thrombogenic core, triggering acute thrombosis and occlusion (causing MI). Arteries are involved (not veins); plaques are WITHIN the wall; hardened arteries lose elasticity and cannot dilate normally.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'Atherosclerosis impedes coronary blood flow by the following mechanism:',
 'Plaques obstruct the vein',
 'Plaques obstruct the artery',
 'Blood clots form outside the vessel wall',
 'Hardened vessels dilate to allow the blood to flow through',
 'B',
 'Atherosclerosis is the deposition of cholesterol-laden atheromatous plaques in the intima of ARTERIES — these progressively narrow the arterial lumen, restricting blood flow. Plaque rupture exposes a thrombogenic core, triggering acute thrombosis and occlusion (causing MI). Arteries are involved (not veins); plaques are WITHIN the wall; hardened arteries lose elasticity and cannot dilate normally.',
 'medium', 'approved', NULL, 'Paper I');

-- Q7 — Hypogastric region location
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Abdominal Anatomy',
 'The hypogastric region of the abdominopelvic cavity is:',
 'Inferior to the umbilical region, medial to the right iliac region',
 'Lateral to the left iliac region, superior to the umbilical region',
 'Medial to the right iliac region, lateral to the umbilical region',
 'Superior to the umbilical region, medial to the right iliac region',
 'A',
 'In the 9-region anatomical scheme of the abdomen, the HYPOGASTRIC (suprapubic) region is the central LOWER region — BELOW the umbilical region and BETWEEN (medial to) the right and left iliac (inguinal) regions. Option A correctly identifies it as inferior to the umbilical region and medial to the right iliac region.',
 'easy', 'approved', NULL, 'Paper I');

-- Q8 — NG tube insertion: cough and breathing difficulty
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Nursing',
 'The most appropriate nursing action when a client begins to cough and has difficulty breathing during nasogastric tube insertion is:',
 'Inserting the tube quickly',
 'Notifying the physician immediately',
 'Removing the tube and reinserting when the respiratory distress subsides',
 'Pulling the tube back a little and wait until the respiratory distress subsides',
 'D',
 'Sudden cough and respiratory distress during NG insertion suggests the tube has entered the trachea/airway instead of the oesophagus. The immediate action is to PULL THE TUBE BACK a few centimetres (out of the airway) and wait for the patient to recover, then reattempt insertion. There is no need to fully remove and start over. Asking the patient to swallow water during advancement helps guide the tube into the oesophagus.',
 'medium', 'approved', NULL, 'Paper I');

-- Q9 — Chronic renal failure: diet instruction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'A patient who has been treated for chronic renal failure (CRF) should be instructed to:',
 'Eat meat at every meal',
 'Monitor fruit intake, and eat plenty of bananas',
 'Increase carbohydrate intake',
 'Drink plenty of fluids, and use a salt substitute',
 'C',
 'CRF dietary advice: LOW protein (reduces nitrogenous waste) — so meat intake is restricted (A wrong); LOW potassium — AVOID bananas, oranges, tomatoes (B wrong); LOW sodium — but salt substitutes are often potassium-based and therefore CONTRAINDICATED (D wrong); LIMITED fluid in oliguric/dialysis patients. INCREASED CARBOHYDRATE intake provides energy and prevents tissue catabolism which would generate more urea. Option C is correct.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'A patient who has been treated for chronic renal failure (CRF) should be instructed to:',
 'Eat meat at every meal',
 'Monitor fruit intake, and eat plenty of bananas',
 'Increase carbohydrate intake',
 'Drink plenty of fluids, and use a salt substitute',
 'C',
 'CRF dietary advice: LOW protein (reduces nitrogenous waste) — so meat intake is restricted (A wrong); LOW potassium — AVOID bananas, oranges, tomatoes (B wrong); LOW sodium — but salt substitutes are often potassium-based and therefore CONTRAINDICATED (D wrong); LIMITED fluid in oliguric/dialysis patients. INCREASED CARBOHYDRATE intake provides energy and prevents tissue catabolism which would generate more urea. Option C is correct.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Turbid urine: UTI and dehydration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Disorders',
 'Turbid urine is an indication of:',
 'Dehydration and urinary tract infection',
 'Presence of prostatic fluid and WBC',
 'Anuria and presence of RBCs',
 'Perineal injury and prolonged use of diuretics',
 'A',
 'Turbid (cloudy) urine results from suspended particles: WBCs and bacteria from URINARY TRACT INFECTION (the most common cause), pus, crystals, phosphates (alkaline urine), epithelial cells, or concentrated urine in DEHYDRATION. Both dehydration and UTI are correct associations — option A is the best fit.',
 'easy', 'approved', NULL, 'Paper I');

-- Q11 — Infant with dehydration and metabolic acidosis: tachypnoea
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Fluid and Electrolyte Balance in Children',
 'An 11-month-old infant with dehydration and metabolic acidosis is likely to present with:',
 'A decreased platelet count',
 'Shallow respirations',
 'Tachypnoea',
 'A reduced white blood cell count',
 'C',
 'Metabolic acidosis (e.g. from severe diarrhoeal dehydration) triggers respiratory compensation — TACHYPNOEA (rapid, deep breathing) to blow off CO2 and raise pH. Shallow breathing would WORSEN acidosis. WBC and platelet changes are not direct features of dehydration/acidosis. Per Kenya IMCI, fast breathing with diarrhoea suggests severe dehydration with acidosis.',
 'medium', 'approved', NULL, 'Paper I');

-- Q12 — Wilms'' tumour presentation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Oncology in Children',
 'A child with Wilms'' tumour presents with:',
 'Gross haematuria',
 'Dysuria',
 'Nausea and vomiting',
 'An abdominal mass',
 'D',
 'Wilms'' tumour (nephroblastoma) is the commonest childhood renal cancer, typically presenting in a child under 5 years with a painless ABDOMINAL/FLANK MASS — often discovered incidentally by the parent while bathing. Microscopic haematuria may occur but gross haematuria is uncommon. Hypertension may be present. Avoid vigorous palpation of the mass (can cause tumour rupture).',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Paediatric Nursing', 'Oncology in Children',
 'A child with Wilms'' tumour presents with:',
 'Gross haematuria',
 'Dysuria',
 'Nausea and vomiting',
 'An abdominal mass',
 'D',
 'Wilms'' tumour (nephroblastoma) is the commonest childhood renal cancer, typically presenting in a child under 5 years with a painless ABDOMINAL/FLANK MASS — often discovered incidentally by the parent while bathing. Microscopic haematuria may occur but gross haematuria is uncommon. Hypertension may be present. Avoid vigorous palpation of the mass (can cause tumour rupture).',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Lumbar puncture: interspace (first occurrence with this exact stem)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Diagnostics',
 'During lumbar puncture, a needle is inserted in the space between:',
 'Fifth and sixth thoracic vertebrae',
 'Fourth and fifth thoracic vertebrae',
 'Third and fourth lumbar vertebrae',
 'First and second lumbar vertebrae',
 'C',
 'Lumbar puncture is performed at the L3/L4 (or L4/L5) interspace — BELOW the termination of the spinal cord (conus medullaris at L1/L2 in adults) — to avoid spinal cord injury. The L4 spinous process is identified at the level of the iliac crests (Tuffier''s line). The cord ends lower in infants (about L3), so paediatric LP is performed at L4/L5 or L5/S1.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Diagnostics',
 'During lumbar puncture, a needle is inserted in the space between:',
 'Fifth and sixth thoracic vertebrae',
 'Fourth and fifth thoracic vertebrae',
 'Third and fourth lumbar vertebrae',
 'First and second lumbar vertebrae',
 'C',
 'Lumbar puncture is performed at the L3/L4 (or L4/L5) interspace — BELOW the termination of the spinal cord (conus medullaris at L1/L2 in adults) — to avoid spinal cord injury. The L4 spinous process is identified at the level of the iliac crests (Tuffier''s line). The cord ends lower in infants (about L3), so paediatric LP is performed at L4/L5 or L5/S1.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Chronic bronchitis definition (different stem from Set 5 Q3b — Set 5 asked "which correctly defines" while this asks about features; check... Set 5 Q3b stem: "Which of the following correctly defines chronic bronchitis?" — Set 10 Q16 stem: "In chronic bronchitis:" — DIFFERENT stem, include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'In chronic bronchitis:',
 'There is cough and sputum production for at least 3 months in 2 consecutive years',
 'There is destruction of alveoli walls due to severe infection and increased secretion',
 'There is increased ciliary function in the airway',
 'There is flow limitation and it is not fully reversible',
 'A',
 'Chronic bronchitis is a CLINICAL diagnosis: productive cough on most days for at least 3 months in each of 2 CONSECUTIVE years — per GOLD criteria. Alveolar wall destruction characterises EMPHYSEMA. Cilia are DAMAGED (not increased) in chronic bronchitis — hence impaired mucociliary clearance. Option A is the precise textbook definition.',
 'easy', 'approved', NULL, 'Paper I');

-- Q17 — Major burn definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
 'A major burn is:',
 'Partial thickness with more than 20% in children',
 'Full thickness with 2–10% burn',
 'Full thickness with less than 2%',
 'Partial thickness with 10–20% burn in children',
 'A',
 'By American Burn Association (ABA) criteria, a MAJOR burn includes: partial-thickness burns more than 25% TBSA in adults or MORE THAN 20% in children/elderly; OR full-thickness burns 10% TBSA or more; OR burns involving face, eyes, ears, hands, feet, perineum, major joints, or with inhalation injury, electrical injury, or significant co-morbidities. Hence option A — partial-thickness more than 20% in children.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Burns Management',
 'A major burn is:',
 'Partial thickness with more than 20% in children',
 'Full thickness with 2–10% burn',
 'Full thickness with less than 2%',
 'Partial thickness with 10–20% burn in children',
 'A',
 'By American Burn Association (ABA) criteria, a MAJOR burn includes: partial-thickness burns more than 25% TBSA in adults or MORE THAN 20% in children/elderly; OR full-thickness burns 10% TBSA or more; OR burns involving face, eyes, ears, hands, feet, perineum, major joints, or with inhalation injury, electrical injury, or significant co-morbidities. Hence option A — partial-thickness more than 20% in children.',
 'hard', 'approved', NULL, 'Paper I');

-- Q18 — Conductive hearing loss: otosclerosis and tympanic membrane retraction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'Conductive hearing loss can be caused by:',
 'Ototoxic medication, otitis externa',
 'Presbycusis, ototoxic medication',
 'Meniere''s disease, otosclerosis',
 'Otosclerosis, tympanic membrane retraction',
 'D',
 'Conductive hearing loss results from anything that impedes sound transmission through the external or middle ear: cerumen impaction, otitis media, perforated/RETRACTED TYMPANIC MEMBRANE, OTOSCLEROSIS (fixation of the stapes), middle-ear effusion, otitis externa. SENSORINEURAL hearing loss is from cochlea/CN VIII pathology — presbycusis (age-related), Meniere''s, ototoxic drugs (aminoglycosides, frusemide, cisplatin), noise exposure. Option D gives two conductive causes.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Ear Disorders',
 'Conductive hearing loss can be caused by:',
 'Ototoxic medication, otitis externa',
 'Presbycusis, ototoxic medication',
 'Meniere''s disease, otosclerosis',
 'Otosclerosis, tympanic membrane retraction',
 'D',
 'Conductive hearing loss results from anything that impedes sound transmission through the external or middle ear: cerumen impaction, otitis media, perforated/RETRACTED TYMPANIC MEMBRANE, OTOSCLEROSIS (fixation of the stapes), middle-ear effusion, otitis externa. SENSORINEURAL hearing loss is from cochlea/CN VIII pathology — presbycusis (age-related), Meniere''s, ototoxic drugs (aminoglycosides, frusemide, cisplatin), noise exposure. Option D gives two conductive causes.',
 'hard', 'approved', NULL, 'Paper I');

-- Q19 — Strabismus: misaligned eyeballs
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'The condition in which the eye balls are not properly aligned with each other is referred to as:',
 'Astigmatism',
 'Strabismus',
 'Presbyopia',
 'Amblyopia',
 'B',
 'STRABISMUS (squint) is misalignment of the visual axes — esotropia (inward), exotropia (outward), hypertropia (up), hypotropia (down). Astigmatism is non-spherical cornea/lens curvature; presbyopia is age-related loss of accommodation; amblyopia ("lazy eye") is reduced vision in one eye from disuse during visual development, often a consequence of uncorrected strabismus or refractive imbalance.',
 'easy', 'approved', NULL, 'Paper I');

-- Q20 — Osteoporosis susceptibility at 60 years: hormonal
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'A 60-year-old''s susceptibility to osteoporosis is most likely related to:',
 'Lack of exercise',
 'Hormonal disturbances',
 'Lack of calcium',
 'Chronic illness',
 'B',
 'The major risk factor for primary osteoporosis after age 50 (especially in women) is HORMONAL — oestrogen deficiency post-menopause causes accelerated bone loss (most marked in the first 5–10 years post-menopause). In men, declining testosterone has a similar though slower effect. Other contributing factors include inadequate dietary calcium, vitamin-D deficiency, sedentary lifestyle, smoking, alcohol and corticosteroids — but the principal age-related driver is hormonal.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Musculoskeletal Disorders',
 'A 60-year-old''s susceptibility to osteoporosis is most likely related to:',
 'Lack of exercise',
 'Hormonal disturbances',
 'Lack of calcium',
 'Chronic illness',
 'B',
 'The major risk factor for primary osteoporosis after age 50 (especially in women) is HORMONAL — oestrogen deficiency post-menopause causes accelerated bone loss (most marked in the first 5–10 years post-menopause). In men, declining testosterone has a similar though slower effect. Other contributing factors include inadequate dietary calcium, vitamin-D deficiency, sedentary lifestyle, smoking, alcohol and corticosteroids — but the principal age-related driver is hormonal.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 11 ───────────────────────────────────────────────────────────────────
-- Q7 SKIPPED — exact duplicate of Set 5 Q7 (sympathetic stimulation: increased PVR, coronary dilation)
-- Q8 SKIPPED — exact duplicate of Set 5 Q8 (burns immediate effects: hyponatraemia + hyperkalaemia)
-- Q12 SKIPPED — exact duplicate of Set 7 Q9 (deteriorating head injury: widening pulse pressure)
-- Q16 SKIPPED — exact duplicate of Set 5 Q16 (ACE inhibitors mechanism)

-- Q1 — Clonic seizures: uncontrollable jerky movements
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Uncontrollable jerky movements are indicative of:',
 'Absence seizures',
 'Myoclonic seizures',
 'Tonic seizures',
 'Clonic seizures',
 'D',
 'CLONIC seizures are characterised by rhythmic, repetitive, jerky muscle contractions. MYOCLONIC seizures are brief shock-like single jerks. TONIC = sustained muscle stiffening without jerks. ABSENCE = brief loss of awareness without motor activity. Sustained rhythmic uncontrollable jerky movements describe CLONIC activity.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Self-monitoring of blood glucose vs urine glucose
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'In diabetes management, self-monitoring of blood glucose is preferred to urine glucose monitoring because:',
 'It can be done by any client',
 'It is not influenced by drugs',
 'It is more accurate',
 'It is easy to perform',
 'C',
 'Self-monitoring of blood glucose (SMBG) gives a direct, real-time measurement of plasma glucose at the moment of testing, whereas urine glucose only appears when blood glucose exceeds the renal threshold (approximately 10 mmol/L) and lags significantly behind blood levels. Urine glucose is also affected by hydration status, renal function and certain drugs (vitamin C interferes with strip tests). SMBG is the standard of care for insulin-dependent diabetes.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'In diabetes management, self-monitoring of blood glucose is preferred to urine glucose monitoring because:',
 'It can be done by any client',
 'It is not influenced by drugs',
 'It is more accurate',
 'It is easy to perform',
 'C',
 'Self-monitoring of blood glucose (SMBG) gives a direct, real-time measurement of plasma glucose at the moment of testing, whereas urine glucose only appears when blood glucose exceeds the renal threshold (approximately 10 mmol/L) and lags significantly behind blood levels. Urine glucose is also affected by hydration status, renal function and certain drugs (vitamin C interferes with strip tests). SMBG is the standard of care for insulin-dependent diabetes.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 T/F split → two standalone MCQs
-- Q3a — Small intestine obstruction: vomiting type
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Which of the following correctly describes the vomiting pattern in small intestinal obstruction?',
 'Small intestinal obstruction typically presents with late faeculent vomiting',
 'Small intestinal obstruction presents with early bilious/reflux vomiting',
 'Vomiting does not occur in small intestinal obstruction',
 'Small intestinal obstruction presents with haematemesis as the first sign',
 'B',
 'Small-bowel obstruction typically presents with EARLY bilious/reflux vomiting (as the obstruction is proximal). LARGE-bowel obstruction has LATE faeculent vomiting (the obstruction is distal and stool backs up over a longer time before vomiting occurs). This distinction helps localise the level of obstruction clinically.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Which of the following correctly describes the vomiting pattern in small intestinal obstruction?',
 'Small intestinal obstruction typically presents with late faeculent vomiting',
 'Small intestinal obstruction presents with early bilious/reflux vomiting',
 'Vomiting does not occur in small intestinal obstruction',
 'Small intestinal obstruction presents with haematemesis as the first sign',
 'B',
 'Small-bowel obstruction typically presents with EARLY bilious/reflux vomiting (as the obstruction is proximal). LARGE-bowel obstruction has LATE faeculent vomiting (the obstruction is distal and stool backs up over a longer time before vomiting occurs). This distinction helps localise the level of obstruction clinically.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3b — Intradermal injection angle
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'Which of the following is CORRECT regarding intradermal injection technique?',
 'The needle is inserted at 45 degrees into the skin',
 'The needle is inserted at 90 degrees perpendicular to the skin',
 'The needle is inserted at 5–15 degrees with the bevel up, raising a small wheal',
 'The site should be massaged after administration to enhance absorption',
 'C',
 'INTRADERMAL injections (e.g. Mantoux/PPD test, BCG, allergy testing) are given at a SHALLOW 5–15 degree angle with the bevel UP, into the most superficial layer of skin (dermis), raising a small visible wheal. 45 degrees is SUBCUTANEOUS; 90 degrees is INTRAMUSCULAR. The site should NOT be massaged (would dislodge the medication from the dermis).',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Neutropenia: avoid rectal procedures
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'When nursing a patient with neutropenia, the nurse should avoid:',
 'Administering IM injections',
 'Giving oxygen using a nasal catheter',
 'Administering suppositories or enemas',
 'Performing oral hygiene after every meal',
 'C',
 'Neutropenic patients are at extreme risk of opportunistic infection. Rectal suppositories/enemas can traumatise the rectal mucosa and seed gut flora into the bloodstream (a common cause of neutropenic bacteraemia). For the same reason: avoid rectal thermometers, rectal exams, and raw fruits/vegetables. Oral hygiene is ENCOURAGED (oral mucositis is a portal of entry). IM injections are avoided mainly in thrombocytopaenia.',
 'medium', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'When nursing a patient with neutropenia, the nurse should avoid:',
 'Administering IM injections',
 'Giving oxygen using a nasal catheter',
 'Administering suppositories or enemas',
 'Performing oral hygiene after every meal',
 'C',
 'Neutropenic patients are at extreme risk of opportunistic infection. Rectal suppositories/enemas can traumatise the rectal mucosa and seed gut flora into the bloodstream (a common cause of neutropenic bacteraemia). For the same reason: avoid rectal thermometers, rectal exams, and raw fruits/vegetables. Oral hygiene is ENCOURAGED (oral mucositis is a portal of entry). IM injections are avoided mainly in thrombocytopaenia.',
 'medium', 'approved', NULL, 'Paper II');

-- Q5 — Chronic bronchitis causative organisms (different from Set 10 Q16 on definition)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'Chronic bronchitis is commonly caused by:',
 'H. influenzae and S. pneumoniae',
 'S. aureus and H. influenzae',
 'S. pneumoniae and S. pyogenes',
 'H. influenzae and S. pyogenes',
 'A',
 'Chronic bronchitis as a disease is primarily caused by SMOKING — but the question refers to pathogens commonly associated with acute exacerbations/infections superimposed on chronic bronchitis. The classical bacterial trio in COPD/chronic bronchitis exacerbations is Streptococcus pneumoniae, non-typeable Haemophilus influenzae, and Moraxella catarrhalis. Option A lists the top two.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — VTE treatment: heparin and warfarin bridging
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'A patient with venous thrombo-embolism is initially treated with:',
 'Heparin and warfarin',
 'Heparin alone',
 'Warfarin and aspirin',
 'Alteplase and heparin',
 'A',
 'Standard initial anticoagulation for VTE (DVT/PE) is BRIDGING THERAPY: heparin (unfractionated IV or LMWH SC) for immediate anticoagulation, OVERLAPPED with warfarin until INR is therapeutic (2.0–3.0) for 2 consecutive days, then heparin is stopped. The overlap is needed because warfarin initially lowers proteins C and S faster than factors II, VII, IX, X — creating transient hypercoagulability. DOACs now bypass this need but the classical answer is heparin plus warfarin.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'A patient with venous thrombo-embolism is initially treated with:',
 'Heparin and warfarin',
 'Heparin alone',
 'Warfarin and aspirin',
 'Alteplase and heparin',
 'A',
 'Standard initial anticoagulation for VTE (DVT/PE) is BRIDGING THERAPY: heparin (unfractionated IV or LMWH SC) for immediate anticoagulation, OVERLAPPED with warfarin until INR is therapeutic (2.0–3.0) for 2 consecutive days, then heparin is stopped. The overlap is needed because warfarin initially lowers proteins C and S faster than factors II, VII, IX, X — creating transient hypercoagulability. DOACs now bypass this need but the classical answer is heparin plus warfarin.',
 'hard', 'approved', NULL, 'Paper I');

-- Q9 — Intermittent bubbling in underwater seal drainage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Procedures',
 'Intermittent bubbling in the water seal chamber of an underwater seal drainage is:',
 'Normal',
 'Indicative of an air leak',
 'Indicative of a pneumothorax resolution',
 'Expected when the unit is attached to wall suction',
 'A',
 'In an underwater seal chest drain, INTERMITTENT (with respiration/cough) bubbling in the WATER SEAL chamber is NORMAL — it reflects air leaving the pleural space as expected when draining a pneumothorax. CONTINUOUS bubbling indicates a system air leak (loose connection, hole in tubing, or persistent bronchopleural fistula). Continuous gentle bubbling in the SUCTION-CONTROL chamber is normal when connected to wall suction.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Procedures',
 'Intermittent bubbling in the water seal chamber of an underwater seal drainage is:',
 'Normal',
 'Indicative of an air leak',
 'Indicative of a pneumothorax resolution',
 'Expected when the unit is attached to wall suction',
 'A',
 'In an underwater seal chest drain, INTERMITTENT (with respiration/cough) bubbling in the WATER SEAL chamber is NORMAL — it reflects air leaving the pleural space as expected when draining a pneumothorax. CONTINUOUS bubbling indicates a system air leak (loose connection, hole in tubing, or persistent bronchopleural fistula). Continuous gentle bubbling in the SUCTION-CONTROL chamber is normal when connected to wall suction.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Post thyroidectomy: assess laryngeal nerve damage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Thyroid Surgery',
 'Post thyroidectomy, the nurse can rule out laryngeal nerve damage by:',
 'Asking the patient to speak',
 'Stimulating the patient''s gag reflex',
 'Determining the patient''s ability to swallow',
 'Telling the patient to extend his tongue',
 'A',
 'The recurrent laryngeal nerve supplies all intrinsic laryngeal muscles except the cricothyroid; injury (unilateral) causes hoarseness; bilateral injury causes stridor and airway obstruction. The simplest immediate post-op assessment is to ASK THE PATIENT TO SPEAK — hoarseness or weak voice indicates possible nerve injury. Swallowing assesses CN IX/X function but is less specific; tongue movement assesses CN XII.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Thyroid Surgery',
 'Post thyroidectomy, the nurse can rule out laryngeal nerve damage by:',
 'Asking the patient to speak',
 'Stimulating the patient''s gag reflex',
 'Determining the patient''s ability to swallow',
 'Telling the patient to extend his tongue',
 'A',
 'The recurrent laryngeal nerve supplies all intrinsic laryngeal muscles except the cricothyroid; injury (unilateral) causes hoarseness; bilateral injury causes stridor and airway obstruction. The simplest immediate post-op assessment is to ASK THE PATIENT TO SPEAK — hoarseness or weak voice indicates possible nerve injury. Swallowing assesses CN IX/X function but is less specific; tongue movement assesses CN XII.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 — Primary goal of therapy: pulmonary oedema in heart failure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The primary goal of therapy for a client with pulmonary oedema in heart failure is:',
 'Improve respiratory status',
 'Increase cardiac output',
 'Reduce peripheral oedema',
 'Restore comfort',
 'A',
 'Acute pulmonary oedema is a life-threatening respiratory emergency — fluid in alveoli prevents gas exchange and the patient can die from hypoxaemia. The IMMEDIATE PRIORITY (per ABC) is to IMPROVE OXYGENATION AND RESPIRATORY STATUS: high-flow oxygen plus/minus CPAP/BiPAP, upright positioning, IV diuretic (frusemide), GTN, morphine. Improving cardiac output and removing peripheral oedema are subsequent goals.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The primary goal of therapy for a client with pulmonary oedema in heart failure is:',
 'Improve respiratory status',
 'Increase cardiac output',
 'Reduce peripheral oedema',
 'Restore comfort',
 'A',
 'Acute pulmonary oedema is a life-threatening respiratory emergency — fluid in alveoli prevents gas exchange and the patient can die from hypoxaemia. The IMMEDIATE PRIORITY (per ABC) is to IMPROVE OXYGENATION AND RESPIRATORY STATUS: high-flow oxygen plus/minus CPAP/BiPAP, upright positioning, IV diuretic (frusemide), GTN, morphine. Improving cardiac output and removing peripheral oedema are subsequent goals.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Phenytoin long-term: gingival hyperplasia
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Anticonvulsant Therapy',
 'To prevent side effects associated with prolonged phenytoin use, a client should be educated to:',
 'Avoid crowds and obtain influenza vaccination annually',
 'Drink 2 litres of fluid daily including 6–8 glasses of water',
 'Eat a potassium rich, low sodium diet',
 'Observe good dental hygiene and report any gum bleeding',
 'D',
 'A characteristic, distinctive long-term side effect of phenytoin is GINGIVAL HYPERPLASIA (overgrowth of gum tissue) — the patient needs meticulous oral hygiene, regular dental checks, and should report bleeding/swelling of gums. Other phenytoin side effects: hirsutism, coarsening of features, ataxia, nystagmus, megaloblastic anaemia (folate antagonism), osteomalacia, drug interactions (enzyme induction), Stevens-Johnson syndrome.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Anticonvulsant Therapy',
 'To prevent side effects associated with prolonged phenytoin use, a client should be educated to:',
 'Avoid crowds and obtain influenza vaccination annually',
 'Drink 2 litres of fluid daily including 6–8 glasses of water',
 'Eat a potassium rich, low sodium diet',
 'Observe good dental hygiene and report any gum bleeding',
 'D',
 'A characteristic, distinctive long-term side effect of phenytoin is GINGIVAL HYPERPLASIA (overgrowth of gum tissue) — the patient needs meticulous oral hygiene, regular dental checks, and should report bleeding/swelling of gums. Other phenytoin side effects: hirsutism, coarsening of features, ataxia, nystagmus, megaloblastic anaemia (folate antagonism), osteomalacia, drug interactions (enzyme induction), Stevens-Johnson syndrome.',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Acute glomerulonephritis: fluid balance
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The main goal of treatment for acute glomerulonephritis is:',
 'Encourage activity',
 'Encourage high protein diet',
 'Maintain fluid balance',
 'Teach intermittent urinary catheterisation',
 'C',
 'Acute glomerulonephritis (post-streptococcal in children) presents with the nephritic syndrome: haematuria, hypertension, oedema, mild proteinuria and oliguria/azotaemia. Maintenance of FLUID BALANCE is central — fluid restriction, daily weights, monitoring intake/output and BP. Diet is LOW protein and LOW sodium during oliguric phase. Activity is restricted; catheterisation is not routinely needed.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The main goal of treatment for acute glomerulonephritis is:',
 'Encourage activity',
 'Encourage high protein diet',
 'Maintain fluid balance',
 'Teach intermittent urinary catheterisation',
 'C',
 'Acute glomerulonephritis (post-streptococcal in children) presents with the nephritic syndrome: haematuria, hypertension, oedema, mild proteinuria and oliguria/azotaemia. Maintenance of FLUID BALANCE is central — fluid restriction, daily weights, monitoring intake/output and BP. Diet is LOW protein and LOW sodium during oliguric phase. Activity is restricted; catheterisation is not routinely needed.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Most common preventable post-op complication: atelectasis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'The most common, preventable complication of abdominal surgery is:',
 'Atelectasis',
 'Fluid and electrolyte imbalance',
 'Thrombophlebitis',
 'Urinary retention',
 'A',
 'Atelectasis (collapse of lung segments from poor ventilation and retained secretions) is the most common complication of any abdominal/thoracic surgery — pain inhibits coughing and deep breathing. It is highly PREVENTABLE through pre-op patient education, deep breathing and coughing exercises, incentive spirometry, early ambulation, adequate analgesia and chest physiotherapy.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Post-operative Nursing Care',
 'The most common, preventable complication of abdominal surgery is:',
 'Atelectasis',
 'Fluid and electrolyte imbalance',
 'Thrombophlebitis',
 'Urinary retention',
 'A',
 'Atelectasis (collapse of lung segments from poor ventilation and retained secretions) is the most common complication of any abdominal/thoracic surgery — pain inhibits coughing and deep breathing. It is highly PREVENTABLE through pre-op patient education, deep breathing and coughing exercises, incentive spirometry, early ambulation, adequate analgesia and chest physiotherapy.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Early miscarriage: first trimester
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Midwifery', 'Obstetric Complications',
 'Early miscarriage refers to:',
 'Loss of pregnancy spontaneously in between 5 and 10 weeks',
 'Spontaneous loss of pregnancy at 12 weeks gestation',
 'Spontaneous loss of pregnancy from between 15 to 24 weeks gestation',
 'Loss of pregnancy within the first trimester',
 'D',
 'EARLY miscarriage (early pregnancy loss) is defined as spontaneous loss of pregnancy in the FIRST TRIMESTER (before 12–14 completed weeks). Late miscarriage is from 12–14 weeks to 24 weeks. Beyond 24 weeks is fetal death/stillbirth. Most early miscarriages are due to chromosomal abnormalities.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Midwifery', 'Obstetric Complications',
 'Early miscarriage refers to:',
 'Loss of pregnancy spontaneously in between 5 and 10 weeks',
 'Spontaneous loss of pregnancy at 12 weeks gestation',
 'Spontaneous loss of pregnancy from between 15 to 24 weeks gestation',
 'Loss of pregnancy within the first trimester',
 'D',
 'EARLY miscarriage (early pregnancy loss) is defined as spontaneous loss of pregnancy in the FIRST TRIMESTER (before 12–14 completed weeks). Late miscarriage is from 12–14 weeks to 24 weeks. Beyond 24 weeks is fetal death/stillbirth. Most early miscarriages are due to chromosomal abnormalities.',
 'easy', 'approved', NULL, 'Paper I');

-- Q18 — Morphine in MI: relieve pain and prevent shock
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Cardiovascular Drugs',
 'In myocardial infarction, morphine is administered to:',
 'Dilate coronary blood vessels',
 'Prevent fibrillation of the ventricles',
 'Decrease anxiety and restlessness',
 'Prevent shock and relieve pain',
 'D',
 'In acute MI, morphine is given to: (i) relieve severe ischaemic chest PAIN (analgesic); (ii) reduce sympathetic catecholamine surge and ANXIETY which would otherwise increase myocardial O2 demand; (iii) venodilate to reduce preload and cardiac workload (helpful when MI is complicated by pulmonary oedema). All these effects together help PREVENT cardiogenic SHOCK and relieve pain — option D is the most complete summary.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Cardiovascular Drugs',
 'In myocardial infarction, morphine is administered to:',
 'Dilate coronary blood vessels',
 'Prevent fibrillation of the ventricles',
 'Decrease anxiety and restlessness',
 'Prevent shock and relieve pain',
 'D',
 'In acute MI, morphine is given to: (i) relieve severe ischaemic chest PAIN (analgesic); (ii) reduce sympathetic catecholamine surge and ANXIETY which would otherwise increase myocardial O2 demand; (iii) venodilate to reduce preload and cardiac workload (helpful when MI is complicated by pulmonary oedema). All these effects together help PREVENT cardiogenic SHOCK and relieve pain — option D is the most complete summary.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Evaluation phase of nursing process
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Process',
 'The evaluation phase of the nursing process involves:',
 'Data collection',
 'Decision making and judgement',
 'Priority setting and expected outcomes formulation',
 'Reassessment and audit',
 'D',
 'The five steps of the nursing process: ASSESSMENT (data collection), DIAGNOSIS, PLANNING (priority setting, goal/expected-outcome formulation), IMPLEMENTATION, and EVALUATION. The EVALUATION phase compares actual outcomes against expected outcomes (REASSESSMENT) and audits whether interventions were effective, leading to modification of the plan if needed.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Process',
 'The evaluation phase of the nursing process involves:',
 'Data collection',
 'Decision making and judgement',
 'Priority setting and expected outcomes formulation',
 'Reassessment and audit',
 'D',
 'The five steps of the nursing process: ASSESSMENT (data collection), DIAGNOSIS, PLANNING (priority setting, goal/expected-outcome formulation), IMPLEMENTATION, and EVALUATION. The EVALUATION phase compares actual outcomes against expected outcomes (REASSESSMENT) and audits whether interventions were effective, leading to modification of the plan if needed.',
 'easy', 'approved', NULL, 'Paper II');

-- Q20 — Immediate care for stroke: non-contrast CT head
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Immediate care for a patient suspected to have stroke includes:',
 'Administering tissue plasminogen activator',
 'Obtaining a CT scan of the head without contrast',
 'Obtaining a neuro-surgical consultation',
 'Preparing for carotid Doppler ultrasonography',
 'B',
 'First-line imaging in suspected stroke is a NON-CONTRAST CT HEAD — done immediately to differentiate ISCHAEMIC stroke (no early changes; thrombolysis candidate if within window) from HAEMORRHAGIC stroke (bright blood; thrombolysis ABSOLUTELY CONTRAINDICATED). Without imaging it is unsafe to give tPA (option A) — could be catastrophic in a haemorrhage. Carotid Doppler and neurosurgical consultation come later, guided by CT findings.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Immediate care for a patient suspected to have stroke includes:',
 'Administering tissue plasminogen activator',
 'Obtaining a CT scan of the head without contrast',
 'Obtaining a neuro-surgical consultation',
 'Preparing for carotid Doppler ultrasonography',
 'B',
 'First-line imaging in suspected stroke is a NON-CONTRAST CT HEAD — done immediately to differentiate ISCHAEMIC stroke (no early changes; thrombolysis candidate if within window) from HAEMORRHAGIC stroke (bright blood; thrombolysis ABSOLUTELY CONTRAINDICATED). Without imaging it is unsafe to give tPA (option A) — could be catastrophic in a haemorrhage. Carotid Doppler and neurosurgical consultation come later, guided by CT findings.',
 'hard', 'approved', NULL, 'Paper I');

-- ─── SET 12 ───────────────────────────────────────────────────────────────────
-- Q16 SKIPPED — exact duplicate of Set 6 Q6 (glutaraldehyde for sterilisation)

-- Q1 — Wheeze: high-pitched sound from small airways
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'A wheeze is:',
 'A low-pitched continuous sound which originates in larger air passages',
 'A high-pitched hissing sound originating in small air passages',
 'The sound produced by the air through the trachea',
 'A high-pitched hissing sound produced when air passes through moist air passages',
 'B',
 'A WHEEZE is a continuous, HIGH-pitched, musical/hissing sound produced when air is forced through NARROWED SMALL AIRWAYS (bronchospasm in asthma, bronchitis, bronchiolitis). LOW-pitched continuous sounds in larger airways are called RHONCHI (suggest secretions in larger airways). Crackles/rales are DISCONTINUOUS sounds from fluid in alveoli.',
 'easy', 'approved', NULL, 'Paper I');

-- Q2 — Detecting increased fluid in abdomen: percussion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Abdominal Assessment',
 'The diagnostic skill used to detect increased fluid in the abdomen is:',
 'Inspection',
 'Palpation',
 'Percussion',
 'Auscultation',
 'C',
 'Ascites is detected on PERCUSSION as a shifting dullness — flanks dull, centre tympanic when supine; on turning to one side the fluid shifts and the dullness shifts accordingly. Fluid thrill is a palpation sign. Inspection shows distension; auscultation has limited role for ascites detection. Percussion is the SPECIFIC diagnostic skill for fluid detection.',
 'medium', 'approved', NULL, 'Paper I');

-- Q3 — Wound healing: secondary vs primary intention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Wound Care',
 'Wound healing by secondary intention differs from primary intention in the following ways except:',
 'The scarring is greater',
 'The repair time is longer',
 'There is little or no inflammation',
 'Healing is by granulation',
 'C',
 'Primary intention (clean surgical incision, apposed edges) heals quickly with minimal scarring and minimal inflammation. SECONDARY intention (large open wound, edges not apposed) heals by GRANULATION TISSUE, has GREATER inflammation, longer healing time, and a LARGER scar. Option C is the EXCEPTION — secondary-intention wounds have MORE inflammation, not less.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Wound Care',
 'Wound healing by secondary intention differs from primary intention in the following ways except:',
 'The scarring is greater',
 'The repair time is longer',
 'There is little or no inflammation',
 'Healing is by granulation',
 'C',
 'Primary intention (clean surgical incision, apposed edges) heals quickly with minimal scarring and minimal inflammation. SECONDARY intention (large open wound, edges not apposed) heals by GRANULATION TISSUE, has GREATER inflammation, longer healing time, and a LARGER scar. Option C is the EXCEPTION — secondary-intention wounds have MORE inflammation, not less.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Subcutaneous injection in overweight patient: 90 degrees
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'In an overweight patient, a subcutaneous injection is given at an angle of:',
 '45 degrees',
 '90 degrees',
 '15 degrees',
 '30 degrees',
 'B',
 'Standard subcutaneous injection angle is 45 degrees in normal-weight patients (with pinched skin fold) or 90 degrees in patients with thicker subcutaneous fat — including OBESE/OVERWEIGHT patients — without pinching. The 90-degree angle ensures the medication reaches the subcutaneous tissue rather than the dermis. For insulin pens with short needles (4–6 mm), 90 degrees is now standard for all body weights.',
 'easy', 'approved', NULL, 'Paper I');

-- Q5 T/F split → two standalone MCQs
-- Q5a — Counselling and advice-giving
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Professional Nursing Practice',
 'Which of the following correctly describes counselling in nursing practice?',
 'Counselling involves giving advice and telling the client what to do',
 'Counselling involves helping the client explore options and make their own informed decisions',
 'Counselling means the nurse makes decisions on behalf of the client',
 'Counselling requires the nurse to offer solutions to the client''s problems',
 'B',
 'Counselling is NON-DIRECTIVE — it helps the client EXPLORE and UNDERSTAND their own situation and options, empowering them to make THEIR OWN informed decisions. Giving advice is advice-giving, not counselling. Making decisions or offering solutions is directive coaching, which contradicts counselling principles.',
 'easy', 'approved', NULL, 'Paper II');

-- Q5b — Counselling termination
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Professional Nursing Practice',
 'Regarding termination of the counselling process, which statement is CORRECT?',
 'The counsellor should terminate the session even when a client rejects the termination',
 'Termination should be a planned, mutual process; if the client is not ready it should be explored and possibly delayed',
 'Termination occurs at the counsellor''s sole discretion without regard to the client''s readiness',
 'The counselling process automatically ends after 6 sessions regardless of client progress',
 'B',
 'Termination should be a PLANNED, MUTUAL process. If the client is not ready, the counsellor explores reasons, processes the resistance, and may delay termination or refer the client onward. Unilaterally terminating when the client rejects it is therapeutic abandonment — contrary to counselling ethics and the NCK code of professional conduct.',
 'medium', 'approved', NULL, 'Paper II');

-- Q6 — Kubler-Ross: depression stage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'End-of-Life Care',
 'The stage of the dying process according to Kubler Ross where the patient cries a lot as though mourning is:',
 'Bargaining',
 'Depression',
 'Anger',
 'Acceptance',
 'B',
 'Elisabeth Kubler-Ross''s five stages of dying/grief: DENIAL, ANGER, BARGAINING, DEPRESSION, ACCEPTANCE. In the DEPRESSION stage the patient mourns past, present and anticipated losses — withdraws, cries, expresses sadness. The nurse provides quiet, supportive presence and allows the patient space to grieve.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'End-of-Life Care',
 'The stage of the dying process according to Kubler Ross where the patient cries a lot as though mourning is:',
 'Bargaining',
 'Depression',
 'Anger',
 'Acceptance',
 'B',
 'Elisabeth Kubler-Ross''s five stages of dying/grief: DENIAL, ANGER, BARGAINING, DEPRESSION, ACCEPTANCE. In the DEPRESSION stage the patient mourns past, present and anticipated losses — withdraws, cries, expresses sadness. The nurse provides quiet, supportive presence and allows the patient space to grieve.',
 'easy', 'approved', NULL, 'Paper II');

-- Q7 — Independent functioning model: Virginia Henderson
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Theories',
 'The Independent functioning model was formulated by:',
 'Henderson',
 'Calista Roy',
 'Florence Nightingale',
 'Dorothea Orem',
 'A',
 'Virginia HENDERSON developed the Need Theory/Independent Nursing Function model, defining nursing as assisting the individual, sick or well, in the performance of those activities contributing to health or its recovery, that the person would perform unaided if they had the strength, will or knowledge — toward INDEPENDENT functioning. She identified 14 fundamental needs. Calista Roy = Adaptation Model; Nightingale = Environmental Theory; Orem = Self-Care Deficit.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Theories',
 'The Independent functioning model was formulated by:',
 'Henderson',
 'Calista Roy',
 'Florence Nightingale',
 'Dorothea Orem',
 'A',
 'Virginia HENDERSON developed the Need Theory/Independent Nursing Function model, defining nursing as assisting the individual, sick or well, in the performance of those activities contributing to health or its recovery, that the person would perform unaided if they had the strength, will or knowledge — toward INDEPENDENT functioning. She identified 14 fundamental needs. Calista Roy = Adaptation Model; Nightingale = Environmental Theory; Orem = Self-Care Deficit.',
 'easy', 'approved', NULL, 'Paper II');

-- Q8 — Nursing Council of Kenya: regulatory body, not welfare organisation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Regulation and Professional Bodies',
 'Which of the following is NOT a welfare organisation?',
 'National Nurses Association of Kenya',
 'International Council of Nurses',
 'East Central and South Africa College of Nurses',
 'Nursing Council of Kenya',
 'D',
 'The NURSING COUNCIL OF KENYA (NCK) is the STATUTORY REGULATORY body (established by the Nurses Act, Cap 257) — its role is registration, licensing, training accreditation and discipline. It is NOT a welfare/professional association. NNAK, ICN and ECSACON are professional/welfare associations representing and advocating for nurses'' interests, training and welfare.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Regulation and Professional Bodies',
 'Which of the following is NOT a welfare organisation?',
 'National Nurses Association of Kenya',
 'International Council of Nurses',
 'East Central and South Africa College of Nurses',
 'Nursing Council of Kenya',
 'D',
 'The NURSING COUNCIL OF KENYA (NCK) is the STATUTORY REGULATORY body (established by the Nurses Act, Cap 257) — its role is registration, licensing, training accreditation and discipline. It is NOT a welfare/professional association. NNAK, ICN and ECSACON are professional/welfare associations representing and advocating for nurses'' interests, training and welfare.',
 'easy', 'approved', NULL, 'Paper II');

-- Q9 — Bed board for back pain
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
 'Which of the following special bed appliances is suitable for a patient with back pain?',
 'Bed board',
 'Back rest',
 'Foot board',
 'Ripple mattress',
 'A',
 'A BED BOARD (firm board placed under the mattress) provides a firm, non-sagging surface that supports the spine in proper alignment — recommended for patients with low back pain, lumbar disc problems, or recovering from spinal surgery. Back rest is for upright positioning; foot board prevents foot drop; ripple/alternating-pressure mattress is for pressure-ulcer prevention.',
 'easy', 'approved', NULL, 'Paper I');

-- Q10 — Best fluid after GI fluid loss: Ringer's lactate
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'The best fluid to administer to a patient after gastrointestinal fluid loss is:',
 'Normal saline',
 '5% dextrose',
 '10% dextrose',
 'Ringer''s lactate',
 'D',
 'Gastrointestinal fluid losses (severe diarrhoea, vomiting, intestinal fistulae) cause loss of water plus electrolytes (Na+, K+, Cl-, HCO3-). RINGER''S LACTATE (Hartmann''s solution) is a balanced crystalloid containing sodium, chloride, potassium, calcium AND lactate (a bicarbonate precursor) — replaces both fluid and the bicarbonate lost in diarrhoea, correcting the metabolic acidosis. Normal saline is also acceptable but contains no potassium or buffer. Dextrose provides water and energy but not electrolytes.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'The best fluid to administer to a patient after gastrointestinal fluid loss is:',
 'Normal saline',
 '5% dextrose',
 '10% dextrose',
 'Ringer''s lactate',
 'D',
 'Gastrointestinal fluid losses (severe diarrhoea, vomiting, intestinal fistulae) cause loss of water plus electrolytes (Na+, K+, Cl-, HCO3-). RINGER''S LACTATE (Hartmann''s solution) is a balanced crystalloid containing sodium, chloride, potassium, calcium AND lactate (a bicarbonate precursor) — replaces both fluid and the bicarbonate lost in diarrhoea, correcting the metabolic acidosis. Normal saline is also acceptable but contains no potassium or buffer. Dextrose provides water and energy but not electrolytes.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 — Bed table: orthopnoeic position
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Nursing Care',
 'A bed table is used for a patient in:',
 'Semi Fowler''s position',
 'Orthopnoeic position',
 'Dorsal recumbent position',
 'Semi prone position',
 'B',
 'The ORTHOPNOEIC position is used for severe dyspnoea (e.g. acute pulmonary oedema, severe asthma, COPD) — the patient sits upright and leans forward over a BED TABLE with a pillow on it, resting the head and arms on the table. This increases lung capacity by allowing accessory respiratory muscles to assist breathing and improving diaphragm excursion.',
 'easy', 'approved', NULL, 'Paper I');

-- Q12 — Oxygen administration in asthma: monitor for deterioration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'When administering oxygen for a patient with asthma the nurse should monitor for:',
 'Hyperventilation',
 'Cyanosis and lethargy',
 'Anxiety and tachycardia',
 'Decreased respirations',
 'B',
 'In acute severe asthma, deterioration is signalled by: SILENT CHEST, exhaustion, drowsiness/confusion (LETHARGY), CYANOSIS, paradoxical pulse, and rising PaCO2. These signs indicate impending respiratory arrest and need for ICU/ventilation. While on oxygen, the nurse monitors for these warning signs of deteriorating respiratory failure.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Apex beat location: 5th ICS, mid-clavicular line
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Cardiovascular Assessment',
 'The apex beat should be taken:',
 'Between the sixth and seventh ribs at the left mid-axillary line',
 'Between the third and fourth ribs and to the left of the sternum',
 'In the fifth intercostal space along the left mid-clavicular line',
 'Between the 4th and 5th ribs along the left mid-axillary line',
 'C',
 'The normal apex beat (point of maximum impulse — PMI) is felt in the 5TH LEFT INTERCOSTAL SPACE at the MID-CLAVICULAR LINE (corresponding to the apex of the left ventricle). Displacement laterally or downward suggests cardiomegaly (LV enlargement). Pulsation in different locations may indicate dextrocardia or mediastinal shift.',
 'easy', 'approved', NULL, 'Paper I');

-- Q14 — Pre-operative preparation order
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Pre-operative Nursing Care',
 'When preparing a patient for theatre, the priority order should:',
 'Hygiene, pre-medication, consent',
 'Pre-medication, consent, hygiene',
 'Consent, education, hygiene',
 'Education, consent, hygiene',
 'D',
 'Pre-operative preparation logical order: EDUCATION first (the patient is informed about the procedure, risks, benefits, alternatives), then INFORMED CONSENT (must be obtained before any pre-medication that affects mental status), then HYGIENE/physical prep (bath, skin prep, gown, NPO, removal of jewellery/dentures, etc.). Pre-medication is given LAST, just before transfer to theatre. Consent obtained AFTER pre-medication is INVALID.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Pre-operative Nursing Care',
 'When preparing a patient for theatre, the priority order should:',
 'Hygiene, pre-medication, consent',
 'Pre-medication, consent, hygiene',
 'Consent, education, hygiene',
 'Education, consent, hygiene',
 'D',
 'Pre-operative preparation logical order: EDUCATION first (the patient is informed about the procedure, risks, benefits, alternatives), then INFORMED CONSENT (must be obtained before any pre-medication that affects mental status), then HYGIENE/physical prep (bath, skin prep, gown, NPO, removal of jewellery/dentures, etc.). Pre-medication is given LAST, just before transfer to theatre. Consent obtained AFTER pre-medication is INVALID.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Urinalysis: white deposits at bottom of bottle
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Diagnostics',
 'Whitish deposits that settle at the bottom of the specimen bottle in urinalysis are:',
 'Phosphates',
 'Urates',
 'Mucus',
 'Pus',
 'A',
 'PHOSPHATES in alkaline urine precipitate as whitish/cloudy crystalline deposits when urine cools — they dissolve on warming or acidification. URATES precipitate as PINK/brick-red deposits in acidic urine (brick-dust appearance). Pus appears yellow-cream and turbid; mucus appears stringy. Phosphate deposits are common, benign and often seen in healthy individuals.',
 'easy', 'approved', NULL, 'Paper I');

-- Q17 — Lumbar puncture: L3/L4 (different stem from Set 10 Q14 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Diagnostics',
 'Lumbar puncture is done between:',
 'L1 and L2',
 'L2 and L3',
 'L3 and L4',
 'L5 and L6',
 'C',
 'Lumbar puncture is performed at the L3/L4 (or L4/L5) interspace, below the conus medullaris which ends at L1/L2 in adults. Note: there is no L5/L6 in normal human anatomy (there are only 5 lumbar vertebrae). The L3/L4 interspace is identified using the iliac crest (Tuffier''s line) as the L4 level.',
 'easy', 'approved', NULL, 'Paper I');

-- Q18 — Biot's respiration: shallow breathing interrupted by apnoea
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'Shallow breathing that is interrupted by apnoea is referred to as:',
 'Cheyne-Stokes',
 'Stertorous breathing',
 'Biot''s respiration',
 'Orthopnoea',
 'C',
 'BIOT''S RESPIRATION (also called ataxic breathing) is irregular shallow breathing of similar tidal volumes punctuated by sudden, unpredictable APNOEAS. It is associated with damage to the medullary respiratory centres (e.g. meningitis, head injury, brainstem stroke). CHEYNE-STOKES is a regular CRESCENDO-DECRESCENDO pattern with apnoeas — different pattern. Stertorous breathing is noisy snoring respiration; orthopnoea is dyspnoea when supine.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'Shallow breathing that is interrupted by apnoea is referred to as:',
 'Cheyne-Stokes',
 'Stertorous breathing',
 'Biot''s respiration',
 'Orthopnoea',
 'C',
 'BIOT''S RESPIRATION (also called ataxic breathing) is irregular shallow breathing of similar tidal volumes punctuated by sudden, unpredictable APNOEAS. It is associated with damage to the medullary respiratory centres (e.g. meningitis, head injury, brainstem stroke). CHEYNE-STOKES is a regular CRESCENDO-DECRESCENDO pattern with apnoeas — different pattern. Stertorous breathing is noisy snoring respiration; orthopnoea is dyspnoea when supine.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Black stool: upper GI bleeding
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Black stool can be caused by:',
 'Bleeding in the lower GIT',
 'Bleeding in the upper GIT',
 'Too much antacids',
 'Too much bile',
 'B',
 'MELAENA (black, tarry, foul-smelling stool) results from UPPER GI BLEEDING — blood is digested by gastric acid and intestinal enzymes, oxidising haemoglobin and producing the characteristic black tarry appearance. Sources: peptic ulcer (commonest), oesophageal varices, gastric cancer, Mallory-Weiss tear. Lower GI bleeding produces fresh red blood (haematochezia). Iron supplements and bismuth also blacken stool but do not produce true tarry melaena.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Black stool can be caused by:',
 'Bleeding in the lower GIT',
 'Bleeding in the upper GIT',
 'Too much antacids',
 'Too much bile',
 'B',
 'MELAENA (black, tarry, foul-smelling stool) results from UPPER GI BLEEDING — blood is digested by gastric acid and intestinal enzymes, oxidising haemoglobin and producing the characteristic black tarry appearance. Sources: peptic ulcer (commonest), oesophageal varices, gastric cancer, Mallory-Weiss tear. Lower GI bleeding produces fresh red blood (haematochezia). Iron supplements and bismuth also blacken stool but do not produce true tarry melaena.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — High fat diet indicated for children with seizure disorders (ketogenic diet)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Nutrition in Paediatrics',
 'High fat diet is indicated for:',
 'Children with seizure disorders',
 'Children with coeliac disease',
 'Children with malabsorption',
 'Children with burns',
 'A',
 'The KETOGENIC DIET (high fat, very low carbohydrate, adequate protein) is a recognised treatment for INTRACTABLE EPILEPSY in children — it shifts metabolism to ketones, which have anticonvulsant effects. Coeliac disease requires GLUTEN-FREE diet (not specifically high fat). Malabsorption typically needs low fat with MCT oil. Burns need HIGH PROTEIN and HIGH CALORIE diet.',
 'hard', 'approved', NULL, 'Paper I');

-- ─── SET 13 ───────────────────────────────────────────────────────────────────
-- Q9 SKIPPED — matching question (omphalocele → membrane covered herniation)
-- Q10 SKIPPED — matching question (omphalitis, osteogenesis imperfecta, eczema)

-- Q1 — Visual acuity 20/200
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'A person whose vision is 20/200 can:',
 'See an object from 20 ft away that a person with normal vision can see from 200 ft away',
 'See an object from 200 ft that a person with normal vision can see from 20 ft away',
 'See small objects from 20 ft away and large objects from 200 ft away',
 'See bigger objects from 200 ft away and small objects from 20 ft away',
 'A',
 'Snellen visual acuity is written as distance tested divided by distance a normal-sighted person could see the same line. 20/200 means: the patient sees at 20 ft what a normal-sighted person can see from 200 ft away — i.e., the patient must be 10 times closer to see the same letter. 20/200 with best correction in the better eye meets the WHO criterion for legal blindness in many countries.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'A person whose vision is 20/200 can:',
 'See an object from 20 ft away that a person with normal vision can see from 200 ft away',
 'See an object from 200 ft that a person with normal vision can see from 20 ft away',
 'See small objects from 20 ft away and large objects from 200 ft away',
 'See bigger objects from 200 ft away and small objects from 20 ft away',
 'A',
 'Snellen visual acuity is written as distance tested divided by distance a normal-sighted person could see the same line. 20/200 means: the patient sees at 20 ft what a normal-sighted person can see from 200 ft away — i.e., the patient must be 10 times closer to see the same letter. 20/200 with best correction in the better eye meets the WHO criterion for legal blindness in many countries.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Common causes of visual impairment in adults 40+
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'The common causes of visual impairment among adults of 40 years and above is:',
 'Diabetic retinopathy, glaucoma and cataracts',
 'Hypertension, cataracts and eye trauma',
 'Conjunctivitis, glaucoma and chronic renal failure',
 'Astigmatism, diabetic retinopathy and aging',
 'A',
 'In adults aged 40 and above, the three leading global causes of vision impairment/blindness are: CATARACTS (commonest cause of blindness worldwide, especially in older adults), GLAUCOMA (silent thief of sight), and DIABETIC RETINOPATHY. Age-related macular degeneration is the 4th. Conjunctivitis and hypertension contribute but are not the top three; astigmatism is a refractive error correctable with spectacles.',
 'easy', 'approved', NULL, 'Paper I');

-- Q3 — Bell's palsy: unilateral CN VII (different stem from Set 8 Q6 — include both)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Bell''s palsy is caused by:',
 'Unilateral inflammation of the seventh cranial nerve',
 'Bilateral inflammation of the seventh cranial nerve',
 'Unilateral inflammation of the fifth cranial nerve',
 'Bilateral inflammation of the tenth cranial nerve',
 'A',
 'Bell''s palsy is an idiopathic UNILATERAL lower-motor-neuron facial nerve (CN VII) palsy — possibly due to reactivation of herpes simplex virus in the geniculate ganglion, causing inflammation and oedema. It presents with sudden weakness of one side of the face. Bilateral palsy raises suspicion of Lyme disease, sarcoidosis or Guillain-Barre syndrome.',
 'easy', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'Bell''s palsy is caused by:',
 'Unilateral inflammation of the seventh cranial nerve',
 'Bilateral inflammation of the seventh cranial nerve',
 'Unilateral inflammation of the fifth cranial nerve',
 'Bilateral inflammation of the tenth cranial nerve',
 'A',
 'Bell''s palsy is an idiopathic UNILATERAL lower-motor-neuron facial nerve (CN VII) palsy — possibly due to reactivation of herpes simplex virus in the geniculate ganglion, causing inflammation and oedema. It presents with sudden weakness of one side of the face. Bilateral palsy raises suspicion of Lyme disease, sarcoidosis or Guillain-Barre syndrome.',
 'easy', 'approved', NULL, 'Paper I');

-- Q4 — Arthroscopy: compression dressing post procedure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Orthopaedic Procedures',
 'The following is true about arthroscopy:',
 'It allows for indirect visualisation of a joint',
 'Is performed in minor theatre under general anaesthesia',
 'The nurse should wrap the joint with a compression dressing after the procedure',
 'Is rarely associated with neurovascular complications',
 'C',
 'Arthroscopy is minimally-invasive DIRECT visualisation of a joint cavity through a small arthroscope (not indirect — option A wrong). It is usually performed in a major theatre under general or regional anaesthesia. After the procedure, the joint is wrapped with a COMPRESSION (elastic) DRESSING to reduce swelling and bleeding into the joint. Neurovascular complications, infection and DVT can occur (so option D is misleading).',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Skin graft: first dressing after 3-5 days
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Burns and Plastic Surgery',
 'While caring for a skin graft site the nurse should:',
 'Perform the first dressing change after 2 to 5 days',
 'Nurse the grafted extremity in a neutral position',
 'Apply an occlusive dressing daily until the graft takes',
 'Daily apply sterile saline compresses to prevent drying of the graft',
 'A',
 'The first dressing on a skin graft is typically left undisturbed for 3–5 days to allow the graft to take (vascular ingrowth from the recipient bed). Premature dressing changes risk dislodging or shearing the graft. The grafted limb is ELEVATED (not just neutral) to reduce oedema. Dressings are not changed daily once placed.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Burns and Plastic Surgery',
 'While caring for a skin graft site the nurse should:',
 'Perform the first dressing change after 2 to 5 days',
 'Nurse the grafted extremity in a neutral position',
 'Apply an occlusive dressing daily until the graft takes',
 'Daily apply sterile saline compresses to prevent drying of the graft',
 'A',
 'The first dressing on a skin graft is typically left undisturbed for 3–5 days to allow the graft to take (vascular ingrowth from the recipient bed). Premature dressing changes risk dislodging or shearing the graft. The grafted limb is ELEVATED (not just neutral) to reduce oedema. Dressings are not changed daily once placed.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6 — GI complications of major burns: Curling's ulcers and paralytic ileus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
 'The gastro-intestinal complications associated with burns include:',
 'Paralytic ileus and Curling''s ulcers',
 'Gastric distension and pancreatitis',
 'Gastric bleeding and mechanical intestinal obstruction',
 'Abdominal compartment syndrome and peptic ulcers',
 'A',
 'Two classic GI complications of major burns: (i) PARALYTIC ILEUS — common in the first 24–48 hours from neurogenic and inflammatory effects, with abdominal distension and absent bowel sounds; (ii) CURLING''S ULCERS — stress-related acute gastroduodenal ulcers classically described in burn patients (analogous to Cushing''s ulcers in head injury). Prophylactic PPIs/H2-blockers are given.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Burns Management',
 'The gastro-intestinal complications associated with burns include:',
 'Paralytic ileus and Curling''s ulcers',
 'Gastric distension and pancreatitis',
 'Gastric bleeding and mechanical intestinal obstruction',
 'Abdominal compartment syndrome and peptic ulcers',
 'A',
 'Two classic GI complications of major burns: (i) PARALYTIC ILEUS — common in the first 24–48 hours from neurogenic and inflammatory effects, with abdominal distension and absent bowel sounds; (ii) CURLING''S ULCERS — stress-related acute gastroduodenal ulcers classically described in burn patients (analogous to Cushing''s ulcers in head injury). Prophylactic PPIs/H2-blockers are given.',
 'medium', 'approved', NULL, 'Paper I');

-- Q7 — Pre-operative nursing interventions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Pre-operative Nursing Care',
 'Pre-operative nursing interventions include:',
 'Reducing anxiety, relieving discomfort and providing instruction',
 'Maintaining fluid balance, managing potential complications and relieving pain',
 'Relieving pain, reducing anxiety, education and counselling',
 'Providing instruction, care of prosthesis and maintaining fluid balance',
 'A',
 'PREOPERATIVE nursing focuses on PREPARATION: reducing anxiety/fear (psychological support, education), reducing discomfort (positioning, analgesia for existing pain), PROVIDING INSTRUCTION (deep breathing, coughing exercises, leg exercises, what to expect post-op), informed consent, physical preparation. Maintaining fluid balance, managing complications and care of prostheses are largely intra- or post-operative roles.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Pre-operative Nursing Care',
 'Pre-operative nursing interventions include:',
 'Reducing anxiety, relieving discomfort and providing instruction',
 'Maintaining fluid balance, managing potential complications and relieving pain',
 'Relieving pain, reducing anxiety, education and counselling',
 'Providing instruction, care of prosthesis and maintaining fluid balance',
 'A',
 'PREOPERATIVE nursing focuses on PREPARATION: reducing anxiety/fear (psychological support, education), reducing discomfort (positioning, analgesia for existing pain), PROVIDING INSTRUCTION (deep breathing, coughing exercises, leg exercises, what to expect post-op), informed consent, physical preparation. Maintaining fluid balance, managing complications and care of prostheses are largely intra- or post-operative roles.',
 'medium', 'approved', NULL, 'Paper I');

-- Q8 — AF management 12 hours: synchronised cardioversion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The correct management for a patient with atrial fibrillation that has clinically manifested for 12 hours is:',
 'Cardioversion',
 'Defibrillation',
 'Cardioversion and defibrillation',
 'Pacing',
 'A',
 'Atrial fibrillation of less than 48 hours duration (in this case 12 hours) can be safely converted to sinus rhythm with SYNCHRONISED ELECTRICAL CARDIOVERSION (or pharmacological cardioversion with flecainide/amiodarone) without need for prolonged anticoagulation, because the risk of mural thrombus is low. AF more than 48 hours requires 3 weeks of anticoagulation BEFORE cardioversion (or TOE-guided cardioversion). DEFIBRILLATION is UNsynchronised shock — used for VF/pulseless VT, not AF.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'The correct management for a patient with atrial fibrillation that has clinically manifested for 12 hours is:',
 'Cardioversion',
 'Defibrillation',
 'Cardioversion and defibrillation',
 'Pacing',
 'A',
 'Atrial fibrillation of less than 48 hours duration (in this case 12 hours) can be safely converted to sinus rhythm with SYNCHRONISED ELECTRICAL CARDIOVERSION (or pharmacological cardioversion with flecainide/amiodarone) without need for prolonged anticoagulation, because the risk of mural thrombus is low. AF more than 48 hours requires 3 weeks of anticoagulation BEFORE cardioversion (or TOE-guided cardioversion). DEFIBRILLATION is UNsynchronised shock — used for VF/pulseless VT, not AF.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Allergic rhinitis: classic triad
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Ear, Nose and Throat Disorders',
 'The clinical manifestations for allergic rhinitis include:',
 'Nasal congestion, frequent sneezing and clear rhinorrhoea',
 'Rubbing of the nose, epistaxis and sinusitis',
 'Persistent headache, nasal congestion and turbid rhinorrhoea',
 'Swollen nasal turbinates, sneezing and epistaxis',
 'A',
 'Allergic rhinitis is an IgE-mediated hypersensitivity producing the classic triad: PAROXYSMAL SNEEZING, CLEAR WATERY RHINORRHOEA, NASAL CONGESTION, with itching of the nose/eyes/palate. Examination: pale, boggy nasal mucosa with swollen turbinates; allergic salute; allergic shiners. PURULENT (turbid) discharge suggests infection, not allergy.',
 'medium', 'approved', NULL, 'Paper I');

-- Q12 T/F split → two standalone MCQs
-- Q12a — Hypertension in children: usually renal origin
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Paediatric Nursing', 'Cardiovascular Disorders in Children',
 'Which of the following is TRUE regarding hypertension in children?',
 'Hypertension in children is usually essential (primary) with no identifiable cause',
 'Hypertension in children is usually of renal origin (secondary hypertension)',
 'Hypertension in children is always caused by cardiac disease',
 'Hypertension in children only occurs in obese children',
 'B',
 'Secondary hypertension is much commoner than essential hypertension in children. The leading cause is RENAL (renal parenchymal disease such as glomerulonephritis, reflux nephropathy; renovascular disease such as renal artery stenosis). Other causes include coarctation of the aorta and endocrine disorders. Essential hypertension predominates in adults, not children.',
 'medium', 'approved', NULL, 'Paper I');

-- Q12b — Prostatectomy and DVT risk
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Urological Surgery',
 'Patients undergoing prostatectomy have a high incidence of deep venous thrombosis because:',
 'They are generally elderly and immobile post-operatively',
 'Pelvic surgery causes pelvic venous stasis, immobilisation and inflammatory response — all promoting DVT',
 'Prostatectomy always requires blood transfusion which increases clotting',
 'Urinary catheterisation after prostatectomy prevents ambulation',
 'B',
 'Pelvic surgery (including prostatectomy) carries a high DVT risk due to: PELVIC VENOUS STASIS (pelvic veins compressed during surgery), IMMOBILISATION post-operatively, and the INFLAMMATORY RESPONSE stimulating coagulation. Prophylactic LMWH plus mechanical methods (TEDs/IPCs) and early ambulation are mandatory post-prostatectomy.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Urological Surgery',
 'Patients undergoing prostatectomy have a high incidence of deep venous thrombosis because:',
 'They are generally elderly and immobile post-operatively',
 'Pelvic surgery causes pelvic venous stasis, immobilisation and inflammatory response — all promoting DVT',
 'Prostatectomy always requires blood transfusion which increases clotting',
 'Urinary catheterisation after prostatectomy prevents ambulation',
 'B',
 'Pelvic surgery (including prostatectomy) carries a high DVT risk due to: PELVIC VENOUS STASIS (pelvic veins compressed during surgery), IMMOBILISATION post-operatively, and the INFLAMMATORY RESPONSE stimulating coagulation. Prophylactic LMWH plus mechanical methods (TEDs/IPCs) and early ambulation are mandatory post-prostatectomy.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — Stevens-Johnson syndrome: goals of treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The goals of treatment in Stevens-Johnson syndrome include:',
 'Control of fluid and electrolyte balance, prevention of sepsis and ophthalmic complications',
 'Restoration of haemostasis, anaemia and hypostatic pneumonia prevention',
 'Control of fluid and electrolyte balance, correction of anaemia and hypoxia',
 'Nutritional support, prevention of sepsis and contractures',
 'A',
 'Stevens-Johnson syndrome (SJS)/Toxic Epidermal Necrolysis (TEN) is a severe mucocutaneous drug reaction with widespread epidermal detachment — managed like a major burn. Goals: WITHDRAW the offending drug; FLUID and ELECTROLYTE management (massive fluid losses through denuded skin); PREVENTION OF SEPSIS (skin barrier disrupted); OPHTHALMIC care — to prevent symblepharon, corneal scarring and blindness; nutritional support; wound care.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
 'The goals of treatment in Stevens-Johnson syndrome include:',
 'Control of fluid and electrolyte balance, prevention of sepsis and ophthalmic complications',
 'Restoration of haemostasis, anaemia and hypostatic pneumonia prevention',
 'Control of fluid and electrolyte balance, correction of anaemia and hypoxia',
 'Nutritional support, prevention of sepsis and contractures',
 'A',
 'Stevens-Johnson syndrome (SJS)/Toxic Epidermal Necrolysis (TEN) is a severe mucocutaneous drug reaction with widespread epidermal detachment — managed like a major burn. Goals: WITHDRAW the offending drug; FLUID and ELECTROLYTE management (massive fluid losses through denuded skin); PREVENTION OF SEPSIS (skin barrier disrupted); OPHTHALMIC care — to prevent symblepharon, corneal scarring and blindness; nutritional support; wound care.',
 'hard', 'approved', NULL, 'Paper I');

-- Q14 — Diabetic foot care: pumice stone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Foot care for diabetic patients includes:',
 'Washing the feet in hot water',
 'Ensuring legs are crossed when sitting',
 'Using a pumice stone to smooth corns and calluses',
 'Soaking feet to remove all forms of dirt',
 'C',
 'Diabetic foot-care principles: DAILY INSPECTION, wash feet in WARM (not hot — peripheral neuropathy may mask scalding) water and DRY between toes thoroughly, DO NOT SOAK (macerates skin), apply moisturiser (but not between toes), trim nails STRAIGHT across, never walk barefoot, wear well-fitting closed-toe shoes, use a PUMICE STONE for calluses (do NOT cut with a blade — risk of injury and infection), do NOT cross legs (impairs circulation).',
 'easy', 'approved', NULL, 'Paper I');

-- Q15 — Most common cause of acute liver failure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The most common cause of acute liver failure is:',
 'Drug-induced liver disease',
 'Viral hepatitis',
 'Aflatoxins ingestion',
 'Hepatocellular carcinoma (HCC)',
 'B',
 'Globally — and especially in Africa — VIRAL HEPATITIS (Hepatitis B in particular, also Hepatitis A, E, and acute Hepatitis C) is the commonest cause of acute liver failure. In high-income countries paracetamol overdose has overtaken viral causes. Aflatoxins (from contaminated maize/groundnuts in Kenya) are a major cause of chronic liver disease and HCC, but acute liver failure is more often viral.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The most common cause of acute liver failure is:',
 'Drug-induced liver disease',
 'Viral hepatitis',
 'Aflatoxins ingestion',
 'Hepatocellular carcinoma (HCC)',
 'B',
 'Globally — and especially in Africa — VIRAL HEPATITIS (Hepatitis B in particular, also Hepatitis A, E, and acute Hepatitis C) is the commonest cause of acute liver failure. In high-income countries paracetamol overdose has overtaken viral causes. Aflatoxins (from contaminated maize/groundnuts in Kenya) are a major cause of chronic liver disease and HCC, but acute liver failure is more often viral.',
 'hard', 'approved', NULL, 'Paper I');

-- Q16 — Carbon monoxide poisoning: features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'The clinical manifestations for carbon monoxide poisoning include:',
 'Headache, muscular spasms, cherry-red skin colour',
 'Pink skin colour, muscle rigidity, paraesthesia',
 'Palpitations, Battle''s sign, rhinorrhoea',
 'Coma, bluish skin colouration, parosmia',
 'A',
 'Carbon monoxide binds haemoglobin more than 200 times more avidly than oxygen, forming carboxyhaemoglobin and causing tissue hypoxia. Classic features: HEADACHE (commonest early sign), nausea, dizziness, confusion, weakness; in severe poisoning — seizures, coma, cardiac ischaemia, death. The classic CHERRY-RED skin/lips colour is caused by COHb absorption spectrum (though actually rare and a late sign). Pulse oximetry reads falsely NORMAL — must use co-oximetry. Treatment: 100% O2 plus/minus hyperbaric oxygen.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Emergency Nursing',
 'The clinical manifestations for carbon monoxide poisoning include:',
 'Headache, muscular spasms, cherry-red skin colour',
 'Pink skin colour, muscle rigidity, paraesthesia',
 'Palpitations, Battle''s sign, rhinorrhoea',
 'Coma, bluish skin colouration, parosmia',
 'A',
 'Carbon monoxide binds haemoglobin more than 200 times more avidly than oxygen, forming carboxyhaemoglobin and causing tissue hypoxia. Classic features: HEADACHE (commonest early sign), nausea, dizziness, confusion, weakness; in severe poisoning — seizures, coma, cardiac ischaemia, death. The classic CHERRY-RED skin/lips colour is caused by COHb absorption spectrum (though actually rare and a late sign). Pulse oximetry reads falsely NORMAL — must use co-oximetry. Treatment: 100% O2 plus/minus hyperbaric oxygen.',
 'hard', 'approved', NULL, 'Paper I');

-- Q17 — Neo-adjuvant chemotherapy: shrink tumour before surgery
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'The form of pre-operative chemotherapy given to shrink a large tumour is referred to as:',
 'Neo-adjuvant chemotherapy',
 'Consolidation chemotherapy',
 'Induction chemotherapy',
 'Maintenance chemotherapy',
 'A',
 'NEO-ADJUVANT chemotherapy is given BEFORE primary (usually surgical) treatment, to SHRINK the tumour to make resection easier or possible (and to assess tumour sensitivity to chemotherapy). ADJUVANT chemotherapy is given AFTER definitive surgery to kill residual micro-metastases. INDUCTION chemo is the first phase in leukaemia treatment (to achieve remission); CONSOLIDATION strengthens remission; MAINTENANCE prolongs remission.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
 'The form of pre-operative chemotherapy given to shrink a large tumour is referred to as:',
 'Neo-adjuvant chemotherapy',
 'Consolidation chemotherapy',
 'Induction chemotherapy',
 'Maintenance chemotherapy',
 'A',
 'NEO-ADJUVANT chemotherapy is given BEFORE primary (usually surgical) treatment, to SHRINK the tumour to make resection easier or possible (and to assess tumour sensitivity to chemotherapy). ADJUVANT chemotherapy is given AFTER definitive surgery to kill residual micro-metastases. INDUCTION chemo is the first phase in leukaemia treatment (to achieve remission); CONSOLIDATION strengthens remission; MAINTENANCE prolongs remission.',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Drug of choice for MRSA: vancomycin
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Anti-infective Drugs',
 'The drug of choice for managing methicillin-resistant Staphylococcus aureus (MRSA) is:',
 'Vancomycin',
 'Augmentin',
 'Clarithromycin',
 'Oxacillin',
 'A',
 'VANCOMYCIN is the first-line drug for serious MRSA infections (bacteraemia, endocarditis, severe pneumonia, osteomyelitis). It inhibits cell-wall synthesis at a different target from beta-lactams, bypassing the methicillin/oxacillin/penicillin resistance. Alternatives: linezolid, daptomycin, teicoplanin. Co-amoxiclav (Augmentin), clarithromycin and oxacillin/cloxacillin are NOT effective against MRSA.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Anti-infective Drugs',
 'The drug of choice for managing methicillin-resistant Staphylococcus aureus (MRSA) is:',
 'Vancomycin',
 'Augmentin',
 'Clarithromycin',
 'Oxacillin',
 'A',
 'VANCOMYCIN is the first-line drug for serious MRSA infections (bacteraemia, endocarditis, severe pneumonia, osteomyelitis). It inhibits cell-wall synthesis at a different target from beta-lactams, bypassing the methicillin/oxacillin/penicillin resistance. Alternatives: linezolid, daptomycin, teicoplanin. Co-amoxiclav (Augmentin), clarithromycin and oxacillin/cloxacillin are NOT effective against MRSA.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Post tonsillectomy: cold clear fluids first 24 hours
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Ear, Nose and Throat Surgery',
 'Post tonsillectomy a nurse should:',
 'Suction the client 4 hourly',
 'Serve the patient puree diet within 24 hours',
 'Provide the patient with clear fluids preferably cold for the first 24 hours',
 'Irrigate tonsillectomy site with normal saline 4 hourly',
 'C',
 'Post-tonsillectomy care: position the patient prone or on the side in the immediate post-op period to allow drainage of secretions; AVOID suctioning of the operative site (can disrupt clots and trigger bleeding); start with COOL/COLD CLEAR FLUIDS (vasoconstriction, soothing, encourage swallowing) for the first 24 hours; soft cool foods next. Monitor for frequent swallowing — a sign of post-operative bleeding.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Thrombolytics contraindicated in haemorrhagic stroke
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The following is true about stroke:',
 'Obesity is a modifiable risk factor for haemorrhagic stroke',
 'Thrombolytic therapy is contra-indicated in haemorrhagic stroke',
 'The head of the patient should be raised to 30 degrees regardless of stroke type',
 'Haemorrhagic stroke is more common than ischaemic stroke',
 'B',
 'THROMBOLYTIC THERAPY (tPA/alteplase) is ABSOLUTELY CONTRAINDICATED in haemorrhagic stroke — it would extend the haemorrhage and is potentially fatal. Hence the need for urgent non-contrast CT BEFORE thrombolysis. Ischaemic strokes account for approximately 85% of strokes (haemorrhagic 15%). Head elevation to 30 degrees is recommended for HAEMORRHAGIC stroke/raised ICP; for ISCHAEMIC stroke the head is typically kept flat to optimise cerebral perfusion.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The following is true about stroke:',
 'Obesity is a modifiable risk factor for haemorrhagic stroke',
 'Thrombolytic therapy is contra-indicated in haemorrhagic stroke',
 'The head of the patient should be raised to 30 degrees regardless of stroke type',
 'Haemorrhagic stroke is more common than ischaemic stroke',
 'B',
 'THROMBOLYTIC THERAPY (tPA/alteplase) is ABSOLUTELY CONTRAINDICATED in haemorrhagic stroke — it would extend the haemorrhage and is potentially fatal. Hence the need for urgent non-contrast CT BEFORE thrombolysis. Ischaemic strokes account for approximately 85% of strokes (haemorrhagic 15%). Head elevation to 30 degrees is recommended for HAEMORRHAGIC stroke/raised ICP; for ISCHAEMIC stroke the head is typically kept flat to optimise cerebral perfusion.',
 'hard', 'approved', NULL, 'Paper I');

-- ─── SET 14 ───────────────────────────────────────────────────────────────────

-- Q1 — Eye drops: close eyes after administration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'When administering eye drops:',
 'The patient should close the eyes for a few minutes after administration',
 'The patient should blink a few times',
 'The drops should be placed on the sclera',
 'Morning hours are the best time',
 'A',
 'Correct eye-drop technique: wash hands; pull lower lid down to expose the conjunctival sac; instil drop into the CONJUNCTIVAL SAC (NOT the sclera or cornea directly); release lid; ask patient to GENTLY CLOSE EYES and apply gentle pressure to the lacrimal/inner canthus for 1–2 minutes (to prevent systemic absorption via nasolacrimal duct). Do NOT blink rapidly (would expel the drop). Timing depends on the medication, not specifically morning.',
 'easy', 'approved', NULL, 'Paper I');

-- Q2 — Intradermal medication: circular motion to clean site (different stem from Set 11 Q3b)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'When administering intra-dermal medication:',
 'The needle is inserted at an angle of 45 degrees',
 'The needle is inserted with the bevel facing down',
 'The site should be massaged after administration',
 'Use circular motion to clean the site of puncture',
 'D',
 'Intradermal injection technique: needle inserted at SHALLOW 5–15 degree angle (not 45 degrees — option A wrong) with the BEVEL FACING UP (not down — option B wrong), raising a small wheal. The site should NOT be massaged (would dislodge the medication — option C wrong). Skin cleansing is in a CIRCULAR outward motion from the puncture site (option D correct).',
 'easy', 'approved', NULL, 'Paper I');

-- Q3 — Good listening principles: full attention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Communication in Nursing',
 'One of the following is a principle of good listening:',
 'The speaker should have good view of the listener',
 'Environment must be free of disturbance, except gospel music',
 'Information gathered does not need to be recorded anywhere',
 'Full attention should be given to the speaker',
 'D',
 'Principles of active/good listening: FULL ATTENTION to the speaker (eye contact, appropriate body posture, no distractions), environment free of ALL background noise/interruptions (no music of any kind), appropriate use of silence, paraphrasing/reflection, and accurate documentation of important information. Option D is the central principle.',
 'easy', 'approved', NULL, 'Paper II');

-- Q4 — Widal test: antigen-antibody reaction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Infection and Diagnostics',
 'One of the following laboratory tests involves antigen-antibody reaction:',
 'Alcohol fast bacilli test',
 'Widal test',
 'Gram staining',
 'International normalising ratio (INR)',
 'B',
 'The WIDAL TEST is a serological agglutination test for typhoid/paratyphoid fever — it detects ANTIBODIES in the patient''s serum against Salmonella O and H ANTIGENS. Acid-fast bacilli (Ziehl-Neelsen) staining and Gram staining are microbiological staining methods, not antigen-antibody. INR measures prothrombin time — a clotting assay, not immunological.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Eclectic model of counselling
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Professional Nursing Practice',
 'The model of choice in counselling a patient with varied issues is:',
 'Eclectic',
 'Behavioural',
 'Humanistic',
 'Psychoanalytic',
 'A',
 'The ECLECTIC counselling approach combines techniques from different theoretical models (psychoanalytic, behavioural, cognitive, humanistic) and tailors them to the individual client''s varied issues. It is flexible and patient-centred, recognising that no single model fits every situation. It is the model of choice when the client presents with multiple, varied concerns.',
 'easy', 'approved', NULL, 'Paper II');

-- Q6 — Rationales for nursing process (except experimental research)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Process',
 'The following are rationales for using the nursing process EXCEPT:',
 'Gives objective measurement of nursing management at the bedside',
 'It helps define the nursing role',
 'Establishes a nurse-patient relationship on a firm basis',
 'Helps collect data for experimental research',
 'D',
 'The nursing process (Assess-Diagnose-Plan-Implement-Evaluate) is a clinical decision-making framework. Its rationales: provides objective, systematic care; defines and standardises the nursing role; ensures continuity; establishes a structured nurse-patient relationship; provides accountability and basis for audit. It is NOT primarily a tool for EXPERIMENTAL research (option D is the exception) — clinical research uses different methodologies.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Process',
 'The following are rationales for using the nursing process EXCEPT:',
 'Gives objective measurement of nursing management at the bedside',
 'It helps define the nursing role',
 'Establishes a nurse-patient relationship on a firm basis',
 'Helps collect data for experimental research',
 'D',
 'The nursing process (Assess-Diagnose-Plan-Implement-Evaluate) is a clinical decision-making framework. Its rationales: provides objective, systematic care; defines and standardises the nursing role; ensures continuity; establishes a structured nurse-patient relationship; provides accountability and basis for audit. It is NOT primarily a tool for EXPERIMENTAL research (option D is the exception) — clinical research uses different methodologies.',
 'easy', 'approved', NULL, 'Paper II');

-- Q7 — Fourth level of Maslow's hierarchy: self-esteem
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Theories',
 'The fourth level of Maslow''s hierarchy of needs is:',
 'Safety and security needs',
 'Belongingness and affection',
 'Self esteem',
 'Self actualisation',
 'C',
 'Maslow''s hierarchy from base to apex: 1) Physiological needs (food, water, oxygen, sleep); 2) Safety and security; 3) Love and belonging; 4) SELF-ESTEEM (recognition, achievement, respect from others); 5) Self-actualisation (realising one''s full potential). The fourth level is therefore self-esteem.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Theories',
 'The fourth level of Maslow''s hierarchy of needs is:',
 'Safety and security needs',
 'Belongingness and affection',
 'Self esteem',
 'Self actualisation',
 'C',
 'Maslow''s hierarchy from base to apex: 1) Physiological needs (food, water, oxygen, sleep); 2) Safety and security; 3) Love and belonging; 4) SELF-ESTEEM (recognition, achievement, respect from others); 5) Self-actualisation (realising one''s full potential). The fourth level is therefore self-esteem.',
 'easy', 'approved', NULL, 'Paper II');

-- Q8 — Dorothea Orem model: self-care deficit (different stem from Set 5 Q15)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'Nursing Theories',
 'The model formulated by Dorothea Orem is:',
 'Self-care deficit',
 'Activities of daily living',
 'Environmental model',
 'Adaptation model',
 'A',
 'Dorothea OREM developed the SELF-CARE DEFICIT THEORY of nursing — when self-care abilities fall short of self-care demands, nursing intervenes. Activities of daily living relates to Roper-Logan-Tierney; the Environmental Model is Florence Nightingale''s; the Adaptation Model is Calista Roy''s.',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'Nursing Theories',
 'The model formulated by Dorothea Orem is:',
 'Self-care deficit',
 'Activities of daily living',
 'Environmental model',
 'Adaptation model',
 'A',
 'Dorothea OREM developed the SELF-CARE DEFICIT THEORY of nursing — when self-care abilities fall short of self-care demands, nursing intervenes. Activities of daily living relates to Roper-Logan-Tierney; the Environmental Model is Florence Nightingale''s; the Adaptation Model is Calista Roy''s.',
 'easy', 'approved', NULL, 'Paper II');

-- Q9 — Digital vaginal examination position: dorsal lithotomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Midwifery', 'Obstetric Procedures',
 'The position of choice for digital vaginal examination is:',
 'Sim''s position',
 'Dorsal lithotomy',
 'Dorsal recumbent',
 'Horizontal recumbent',
 'B',
 'DORSAL LITHOTOMY position (supine with knees flexed, thighs abducted and externally rotated, feet in stirrups or held by an assistant) is the position of choice for vaginal/pelvic examination, vaginal delivery, vaginal surgery, and cystoscopy. It provides optimal access to the perineum and visualisation of the vaginal canal and cervix. Sim''s (left lateral) is used for enemas and some rectal exams.',
 'easy', 'approved', NULL, 'Paper I');

-- Q10 — Decontaminating bloody instruments: soak in chlorine first
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Infection Prevention & Control', 'Sterilisation and Disinfection',
 'When decontaminating very bloody instruments using chlorine:',
 'One uses six parts of water and 6 parts of chlorine always',
 'The instruments are soaked in the chlorine first before rinsing',
 'The blood should first be rinsed off under running water',
 'The instruments should be submerged in the chlorine solution for 30 minutes',
 'B',
 'Per Kenya MoH infection-prevention guidelines and WHO standards, DECONTAMINATION is the FIRST step before cleaning and sterilisation. Procedure: SOAK in 0.5% chlorine solution for 10 MINUTES, THEN rinse and clean. Heavily contaminated instruments should NOT be rinsed first (risks aerosolising blood — option C wrong). After 10 minutes soak, clean with detergent and brush. 30 minutes is too long (corrodes metal); the 6:6 ratio is incorrect (5.25% household bleach diluted 1:9 makes 0.5%).',
 'medium', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Infection Prevention & Control', 'Sterilisation and Disinfection',
 'When decontaminating very bloody instruments using chlorine:',
 'One uses six parts of water and 6 parts of chlorine always',
 'The instruments are soaked in the chlorine first before rinsing',
 'The blood should first be rinsed off under running water',
 'The instruments should be submerged in the chlorine solution for 30 minutes',
 'B',
 'Per Kenya MoH infection-prevention guidelines and WHO standards, DECONTAMINATION is the FIRST step before cleaning and sterilisation. Procedure: SOAK in 0.5% chlorine solution for 10 MINUTES, THEN rinse and clean. Heavily contaminated instruments should NOT be rinsed first (risks aerosolising blood — option C wrong). After 10 minutes soak, clean with detergent and brush. 30 minutes is too long (corrodes metal); the 6:6 ratio is incorrect (5.25% household bleach diluted 1:9 makes 0.5%).',
 'medium', 'approved', NULL, 'Paper II');

-- Q11 — Sputum specimen collection: clean mouth first
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Diagnostics',
 'When collecting a sputum specimen, the nurse instructs the patient to:',
 'Clean the mouth well before expectoration',
 'Be in recumbent position when expectorating',
 'Discard the first sputum and then expectorate the second in the specimen bottle',
 'Take plenty of fluid the night before collection',
 'A',
 'For a quality sputum specimen, the patient should RINSE the mouth with plain water before expectorating (removes oral flora and food debris that contaminate the sample). The patient sits up or stands (NOT recumbent), takes 2–3 deep breaths, then coughs deeply from the chest into the sterile container. Collection in the EARLY MORNING (concentrated overnight secretions) is best — the first sputum is the one to collect, not discard.',
 'easy', 'approved', NULL, 'Paper I');

-- Q12 — Kubler-Ross sequence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Health Systems & Management', 'End-of-Life Care',
 'The following is the correct sequence of the dying process according to Kubler Ross:',
 'Denial, bargain, anger, depression',
 'Denial, anger, bargaining, depression',
 'Denial, depression, anger, bargain',
 'Denial, anger, depression, bargain',
 'B',
 'Kubler-Ross stages of dying: DENIAL, ANGER, BARGAINING, DEPRESSION, ACCEPTANCE. Option B correctly lists the first four in order. Patients may not pass through every stage or may revisit stages — the model is descriptive, not prescriptive. Note the full sequence ends with Acceptance (not listed as an option here).',
 'easy', 'approved', NULL, 'Paper II');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Nursing Management & Leadership', 'End-of-Life Care',
 'The following is the correct sequence of the dying process according to Kubler Ross:',
 'Denial, bargain, anger, depression',
 'Denial, anger, bargaining, depression',
 'Denial, depression, anger, bargain',
 'Denial, anger, depression, bargain',
 'B',
 'Kubler-Ross stages of dying: DENIAL, ANGER, BARGAINING, DEPRESSION, ACCEPTANCE. Option B correctly lists the first four in order. Patients may not pass through every stage or may revisit stages — the model is descriptive, not prescriptive.',
 'easy', 'approved', NULL, 'Paper II');

-- Q13 — Fluid that increases intravascular volume: 50% dextrose (hypertonic)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'The following fluid would increase the intravascular fluid volume:',
 'Darrow''s',
 'Normal saline',
 'Hartmann''s',
 '50% dextrose',
 'D',
 'Among the listed fluids, 50% DEXTROSE is a HYPERTONIC solution — it draws water OUT of cells INTO the intravascular space by osmosis, expanding intravascular volume. Normal saline and Hartmann''s are ISOTONIC crystalloids — they expand ECF but only about a quarter stays intravascular. Darrow''s is also isotonic. Note: in practice, 50% dextrose is given as small IV pushes for hypoglycaemia, not volume expansion — the exam answer reflects the osmotic principle.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'The following fluid would increase the intravascular fluid volume:',
 'Darrow''s',
 'Normal saline',
 'Hartmann''s',
 '50% dextrose',
 'D',
 'Among the listed fluids, 50% DEXTROSE is a HYPERTONIC solution — it draws water OUT of cells INTO the intravascular space by osmosis, expanding intravascular volume. Normal saline and Hartmann''s are ISOTONIC crystalloids — they expand ECF but only about a quarter stays intravascular. Darrow''s is also isotonic. Note: in practice, 50% dextrose is given as small IV pushes for hypoglycaemia, not volume expansion — the exam answer reflects the osmotic principle.',
 'hard', 'approved', NULL, 'Paper I');

-- Q14 — Sitz bath: indications (vaginal discharge is the exception)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'The following are indications for sitz bath EXCEPT:',
 'Perineal sinuses',
 'Vaginal discharge',
 'Incision in the vaginal wall',
 'Perineal operations',
 'B',
 'A sitz bath (sitting in warm water immersing the perineum) is indicated after perineal/anal operations (haemorrhoidectomy, fistulectomy, episiotomy, vaginal surgery), perineal sinuses, perineal infection, pruritus ani, and healing of perineal wounds. VAGINAL DISCHARGE is investigated and treated by addressing the cause (infection — antimicrobials), not by sitz bath. Hence option B is the exception.',
 'easy', 'approved', NULL, 'Paper I');

-- Q15 — Inverse breathing: slow inspiration, rapid expiration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'Inverse breathing is manifested by:',
 'Slow inspiration and rapid expiration',
 'Harsh whistling sound',
 'Pause after expiration',
 'Pause after inspiration',
 'A',
 'Inverse (reverse, paradoxical) breathing reverses the normal pattern — instead of quick inspiration and prolonged expiration (as in obstructive disease like asthma), inverse breathing has SLOW inspiration and RAPID expiration. It is also used in mechanical ventilation as IRV (inverse ratio ventilation) for ARDS — to improve oxygenation.',
 'medium', 'approved', NULL, 'Paper I');

-- Q16 — Fluid overload: bounding pulse
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'A patient with fluid overload is likely to have:',
 'Bounding pulse',
 'Tachycardia',
 'Thready pulse',
 'Pulse deficit',
 'A',
 'Fluid overload (hypervolaemia) signs: BOUNDING pulse (full, forceful — increased stroke volume from increased preload), raised JVP, peripheral oedema, basal crackles, pulmonary oedema, weight gain, dyspnoea, hypertension. THREADY pulse is the opposite — it suggests hypovolaemia/shock. Tachycardia can be seen in either but bounding pulse is the specific hypervolaemia sign.',
 'easy', 'approved', NULL, 'Paper I');

-- Q17 — Nebulising: switch machine before attaching mask
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Nursing Care',
 'When nebulising:',
 'Patient should be in recumbent position',
 'Patient should take fast breaths',
 'Switch the machine before attaching the mask to the patient',
 'The oxygen therapy should be switched off',
 'C',
 'Correct nebulisation technique: patient SITS UPRIGHT (not recumbent — option A wrong); breathes SLOWLY and DEEPLY (not fast — option B wrong); the nebuliser is SWITCHED ON before being attached to the patient so the mist is ready (option C correct); for asthmatic patients, nebulisation is driven by OXYGEN (not air, and oxygen is not switched off — option D wrong); duration approximately 10–15 minutes until medication finished.',
 'easy', 'approved', NULL, 'Paper I');

-- Q18 — Nurse action when patient is cyanosed during suctioning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Airway Management',
 'The best action for a nurse who notices a patient is cyanosed when suctioning is:',
 'Increase the speed of suctioning to finish and give the patient oxygen',
 'Reduce the strength of suction',
 'Stop suctioning and administer oxygen',
 'Call the doctor',
 'C',
 'Cyanosis during suctioning indicates the patient has been deprived of oxygen for too long. Suctioning removes both secretions AND oxygen-containing air from the airway. The IMMEDIATE action is to STOP suctioning AT ONCE and OXYGENATE the patient (manual bag-valve-mask if needed). Re-attempt suctioning only after SpO2 has recovered. Each pass should not exceed 10–15 seconds with pre-oxygenation between passes.',
 'medium', 'approved', NULL, 'Paper I');

-- Q19 — Mouth care of dependent client: artery forceps
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Procedures',
 'When giving mouth care to a dependent client:',
 'One requires petroleum jelly',
 'The patient should be in Fowler''s position',
 'One requires artery or dissecting forceps',
 'Hydrogen peroxide can be used if mucus is thick',
 'C',
 'Equipment for mouth care of a dependent/unconscious patient: tray with sponge swabs or cotton-tipped applicators on ARTERY/DISSECTING FORCEPS (to hold the swab and reach all surfaces of the mouth), suction, normal saline or sodium-bicarbonate solution, vaseline/lip balm, kidney dish. Patient is placed LATERAL or SEMI-PRONE (not Fowler''s — would risk aspiration if unconscious). Hydrogen peroxide is not routinely used now.',
 'easy', 'approved', NULL, 'Paper I');

-- Q20 — Complication of prolonged catheterisation: incontinence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Nursing Procedures',
 'Which among the following is a complication of prolonged catheterisation?',
 'Urine incontinence',
 'Bladder rupture',
 'Impotence',
 'Proteinuria',
 'A',
 'Complications of PROLONGED indwelling urinary catheterisation: CATHETER-ASSOCIATED UTI (commonest), urethritis, urethral stricture, bladder neck damage, encrustation/blockage, bladder calculi, atrophic/contracted bladder leading to INCONTINENCE on removal (loss of bladder tone), and psychological dependence. Bladder RUPTURE is more often a complication of catheterisation done with force or in retention with overdistension, not prolonged drainage.',
 'medium', 'approved', NULL, 'Paper I');

-- ─── SET 15 ───────────────────────────────────────────────────────────────────
-- Q8  SKIPPED — exact duplicate of Set 6 Q8 (anaphylactic shock: antigen-antibody)
-- Q9  SKIPPED — exact duplicate of Set 6 Q9 (reverse barrier nursing for altered immunity)
-- Q12 SKIPPED — exact duplicate of Set 13 Q12a (hypertension in children: renal origin)
-- Q16 SKIPPED — exact duplicate of Set 10 Q16 (chronic bronchitis definition)

-- Q1 — ALT monitors liver disease progress
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The enzyme whose levels can be used to monitor the progress of a liver disease is:',
 'Alanine aminotransferase (ALT)',
 'Aspartate aminotransferase (AST)',
 'Troponin I enzyme',
 'Amylase enzyme',
 'A',
 'ALT (alanine aminotransferase) is the most LIVER-SPECIFIC of the transaminases — it is most heavily concentrated in hepatocytes, and is the best biochemical marker for monitoring HEPATOCELLULAR injury and the progress of liver disease. AST is also liver-related but is found in heart, muscle and red cells too (less specific). Troponin I monitors myocardial injury; amylase monitors pancreatitis.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'The enzyme whose levels can be used to monitor the progress of a liver disease is:',
 'Alanine aminotransferase (ALT)',
 'Aspartate aminotransferase (AST)',
 'Troponin I enzyme',
 'Amylase enzyme',
 'A',
 'ALT (alanine aminotransferase) is the most LIVER-SPECIFIC of the transaminases — it is most heavily concentrated in hepatocytes, and is the best biochemical marker for monitoring HEPATOCELLULAR injury and the progress of liver disease. AST is also liver-related but is found in heart, muscle and red cells too (less specific). Troponin I monitors myocardial injury; amylase monitors pancreatitis.',
 'medium', 'approved', NULL, 'Paper I');

-- Q2 — Indications for TPN
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nutritional Support',
 'The following are indications for Total Parenteral Nutrition (TPN):',
 'Burns, gastroenteritis, anaemia',
 'Sepsis, malnutrition, bowel surgery',
 'Anorexia nervosa, paralytic ileus, facial burns',
 'Bilateral amputation, acute pancreatitis, peptic ulcer',
 'B',
 'TPN is indicated when the gut cannot be used for more than 7 days AND the patient cannot meet nutritional needs orally/enterally. Indications: prolonged ileus, intestinal obstruction, short-bowel syndrome, severe inflammatory bowel disease, severe acute pancreatitis, enterocutaneous fistula, multi-trauma, severe burns, SEPSIS with gut failure, severe MALNUTRITION before major surgery, and major BOWEL SURGERY when oral feeding will be delayed. Option B lists three valid indications.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Nutritional Support',
 'The following are indications for Total Parenteral Nutrition (TPN):',
 'Burns, gastroenteritis, anaemia',
 'Sepsis, malnutrition, bowel surgery',
 'Anorexia nervosa, paralytic ileus, facial burns',
 'Bilateral amputation, acute pancreatitis, peptic ulcer',
 'B',
 'TPN is indicated when the gut cannot be used for more than 7 days AND the patient cannot meet nutritional needs orally/enterally. Indications: prolonged ileus, intestinal obstruction, short-bowel syndrome, severe inflammatory bowel disease, severe acute pancreatitis, enterocutaneous fistula, multi-trauma, severe burns, SEPSIS with gut failure, severe MALNUTRITION before major surgery, and major BOWEL SURGERY when oral feeding will be delayed. Option B lists three valid indications.',
 'hard', 'approved', NULL, 'Paper I');

-- Q3 — Zollinger-Ellison syndrome: multiple peptic ulcers
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Zollinger-Ellison syndrome is suspected when:',
 'A patient presents with several peptic ulcers',
 'A peptic ulcer develops following a stressful event',
 'There is history of melaena stool for many days',
 'There is history of recurrent constipation',
 'A',
 'Zollinger-Ellison syndrome is a gastrin-secreting tumour (gastrinoma — usually in pancreas or duodenum) causing massive hypersecretion of gastric acid leading to multiple, recurrent, atypically-located peptic ulcers (often in the duodenum beyond the bulb, or jejunum), often resistant to standard treatment, plus diarrhoea. Diagnosis: elevated fasting serum gastrin plus secretin stimulation test. Stress ulcers (option B — Cushing''s, Curling''s) are different.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'Zollinger-Ellison syndrome is suspected when:',
 'A patient presents with several peptic ulcers',
 'A peptic ulcer develops following a stressful event',
 'There is history of melaena stool for many days',
 'There is history of recurrent constipation',
 'A',
 'Zollinger-Ellison syndrome is a gastrin-secreting tumour (gastrinoma — usually in pancreas or duodenum) causing massive hypersecretion of gastric acid leading to multiple, recurrent, atypically-located peptic ulcers (often in the duodenum beyond the bulb, or jejunum), often resistant to standard treatment, plus diarrhoea. Diagnosis: elevated fasting serum gastrin plus secretin stimulation test. Stress ulcers (option B — Cushing''s, Curling''s) are different.',
 'hard', 'approved', NULL, 'Paper I');

-- Q4 — Main causes of DKA
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The main causes of diabetic ketoacidosis are:',
 'Increased dose of insulin, starvation, use of expired insulin',
 'Sepsis, renal disease, liver failure',
 'Decreased dose of insulin, missed dose of insulin, an illness',
 'Infection, physical trauma, self-medication',
 'C',
 'DKA is precipitated by ABSOLUTE OR RELATIVE INSULIN DEFICIENCY. Common triggers: NEW-onset Type 1 DM, MISSED OR INADEQUATE INSULIN DOSES (omitted by patient or pump failure), INFECTION/illness (infection raises counter-regulatory hormones demanding more insulin), surgery, trauma, MI, pancreatitis. INCREASED insulin would cause hypoglycaemia, not DKA. Option C is the most direct answer.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The main causes of diabetic ketoacidosis are:',
 'Increased dose of insulin, starvation, use of expired insulin',
 'Sepsis, renal disease, liver failure',
 'Decreased dose of insulin, missed dose of insulin, an illness',
 'Infection, physical trauma, self-medication',
 'C',
 'DKA is precipitated by ABSOLUTE OR RELATIVE INSULIN DEFICIENCY. Common triggers: NEW-onset Type 1 DM, MISSED OR INADEQUATE INSULIN DOSES (omitted by patient or pump failure), INFECTION/illness (infection raises counter-regulatory hormones demanding more insulin), surgery, trauma, MI, pancreatitis. INCREASED insulin would cause hypoglycaemia, not DKA. Option C is the most direct answer.',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — Complications of dialysis: hypotension, air embolism, bleeding
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The following are complications of dialysis:',
 'Hypertension, pruritus, abdominal pain',
 'Painful muscle cramping, pruritus, fatigue',
 'Hypotension, air embolism, bleeding',
 'Dialysis disequilibrium, air embolism, uraemia',
 'C',
 'Acute haemodialysis complications: HYPOTENSION (commonest, from rapid volume removal), muscle cramps, nausea/vomiting, dialysis disequilibrium syndrome (cerebral oedema from rapid solute clearance), AIR EMBOLISM (from system breach), BLEEDING (heparinisation, access-site puncture), haemolysis, dialyser reactions, arrhythmias, infection. Option C lists three direct complications. Hypotension (not hypertension) is typical; uraemia is the indication for dialysis, not a complication.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'The following are complications of dialysis:',
 'Hypertension, pruritus, abdominal pain',
 'Painful muscle cramping, pruritus, fatigue',
 'Hypotension, air embolism, bleeding',
 'Dialysis disequilibrium, air embolism, uraemia',
 'C',
 'Acute haemodialysis complications: HYPOTENSION (commonest, from rapid volume removal), muscle cramps, nausea/vomiting, dialysis disequilibrium syndrome (cerebral oedema from rapid solute clearance), AIR EMBOLISM (from system breach), BLEEDING (heparinisation, access-site puncture), haemolysis, dialyser reactions, arrhythmias, infection. Option C lists three direct complications. Hypotension (not hypertension) is typical; uraemia is the indication for dialysis, not a complication.',
 'hard', 'approved', NULL, 'Paper I');

-- Q6 T/F split → two standalone MCQs
-- Q6a — Kussmaul's respirations in DKA and renal failure
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'In which of the following conditions are Kussmaul''s respirations (deep, rapid sighing breathing) characteristically seen?',
 'Asthma exacerbation and pulmonary oedema',
 'Diabetic ketoacidosis and severe renal failure',
 'Hyperventilation syndrome and anxiety',
 'Pulmonary embolism and pneumothorax',
 'B',
 'KUSSMAUL''S BREATHING (deep, rapid, sighing respirations) is the respiratory compensation for metabolic acidosis. It is seen in DIABETIC KETOACIDOSIS (ketoacidosis), severe RENAL FAILURE (uraemic acidosis), lactic acidosis, and other causes of severe metabolic acidosis. The body tries to blow off CO2 to raise pH.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Respiratory Assessment',
 'In which of the following conditions are Kussmaul''s respirations (deep, rapid sighing breathing) characteristically seen?',
 'Asthma exacerbation and pulmonary oedema',
 'Diabetic ketoacidosis and severe renal failure',
 'Hyperventilation syndrome and anxiety',
 'Pulmonary embolism and pneumothorax',
 'B',
 'KUSSMAUL''S BREATHING (deep, rapid, sighing respirations) is the respiratory compensation for metabolic acidosis. It is seen in DIABETIC KETOACIDOSIS (ketoacidosis), severe RENAL FAILURE (uraemic acidosis), lactic acidosis, and other causes of severe metabolic acidosis. The body tries to blow off CO2 to raise pH.',
 'medium', 'approved', NULL, 'Paper I');

-- Q6b — Morphine in pancreatitis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Pharmacology', 'Gastrointestinal Drugs',
 'Regarding opioid analgesia in acute pancreatitis, which statement reflects current evidence?',
 'Morphine is absolutely contraindicated in pancreatitis as it causes sphincter of Oddi spasm',
 'Morphine is the only safe opioid for pancreatitis pain',
 'Morphine is not contraindicated in pancreatitis; current evidence shows it can be used safely for pain relief',
 'Opioids are never used in pancreatitis — only NSAIDs are safe',
 'C',
 'Historically, morphine was thought to cause sphincter of Oddi spasm and worsen pancreatitis (theoretical concern), so pethidine was preferred. Current evidence shows morphine is NOT contraindicated in pancreatitis — both opioids cause some sphincter spasm and either can be used safely for pain relief. The modern view is that adequate analgesia with morphine is acceptable and appropriate in acute pancreatitis.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Pharmacology', 'Gastrointestinal Drugs',
 'Regarding opioid analgesia in acute pancreatitis, which statement reflects current evidence?',
 'Morphine is absolutely contraindicated in pancreatitis as it causes sphincter of Oddi spasm',
 'Morphine is the only safe opioid for pancreatitis pain',
 'Morphine is not contraindicated in pancreatitis; current evidence shows it can be used safely for pain relief',
 'Opioids are never used in pancreatitis — only NSAIDs are safe',
 'C',
 'Historically, morphine was thought to cause sphincter of Oddi spasm and worsen pancreatitis (theoretical concern), so pethidine was preferred. Current evidence shows morphine is NOT contraindicated in pancreatitis — both opioids cause some sphincter spasm and either can be used safely for pain relief. The modern view is that adequate analgesia with morphine is acceptable and appropriate in acute pancreatitis.',
 'hard', 'approved', NULL, 'Paper I');

-- Q7 — Major burn: >20% partial thickness in children (same as Set 10 Q17 but different stem)
-- Set 10 Q17 stem: "A major burn is:" — Set 15 Q17 same stem → SKIP (would be exact duplicate)
-- Actually checking: Set 10 Q17 is "A major burn is:" with same 4 options → exact duplicate → SKIP
-- Q7 is about IV flow rate calculation (27 drops/min) — exact duplicate of Set 6 Q2 → SKIP

-- Q10 — Hyperkalaemia: paraesthesias, dysrhythmias, restlessness
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'A patient with hyperkalaemia is likely to present with:',
 'Prostration, fatigue, tetany',
 'Paraesthesias of extremities, dysrhythmias, restlessness',
 'Convulsions, coma, confusion',
 'Weakness, carpopedal spasm, diplopia',
 'B',
 'HYPERKALAEMIA features: muscle weakness, PARAESTHESIAS, fatigue, irritability; ECG changes — tall peaked T waves, prolonged PR, widening QRS, then sine-wave pattern and asystole. Cardiac DYSRHYTHMIAS are the most life-threatening manifestation and the reason for urgent treatment. Tetany and carpopedal spasm are features of HYPOcalcaemia and hypomagnesaemia, not hyperkalaemia.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'A patient with hyperkalaemia is likely to present with:',
 'Prostration, fatigue, tetany',
 'Paraesthesias of extremities, dysrhythmias, restlessness',
 'Convulsions, coma, confusion',
 'Weakness, carpopedal spasm, diplopia',
 'B',
 'HYPERKALAEMIA features: muscle weakness, PARAESTHESIAS, fatigue, irritability; ECG changes — tall peaked T waves, prolonged PR, widening QRS, then sine-wave pattern and asystole. Cardiac DYSRHYTHMIAS are the most life-threatening manifestation and the reason for urgent treatment. Tetany and carpopedal spasm are features of HYPOcalcaemia and hypomagnesaemia, not hyperkalaemia.',
 'hard', 'approved', NULL, 'Paper I');

-- Q11 — Wound infection reduction: delayed closure in contaminated wounds
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Wound Care',
 'Intra-operatively, the incidence of wound infection may be lowered by:',
 'Treatment of co-existent infections',
 'Delaying closure in contaminated wounds',
 'Keeping tubings away from incision',
 'Early discharge of the patient',
 'B',
 'DELAYED PRIMARY CLOSURE for contaminated wounds (allowing the wound to drain and granulate before delayed closure 3–5 days later) markedly reduces surgical site infection risk in heavily contaminated cases (e.g. perforated viscus, traumatic dirty wounds). Treatment of co-existent infections is a PRE-operative measure. Keeping tubings away helps but is less direct. Early discharge does not lower infection risk.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Surgical Nursing', 'Wound Care',
 'Intra-operatively, the incidence of wound infection may be lowered by:',
 'Treatment of co-existent infections',
 'Delaying closure in contaminated wounds',
 'Keeping tubings away from incision',
 'Early discharge of the patient',
 'B',
 'DELAYED PRIMARY CLOSURE for contaminated wounds (allowing the wound to drain and granulate before delayed closure 3–5 days later) markedly reduces surgical site infection risk in heavily contaminated cases (e.g. perforated viscus, traumatic dirty wounds). Treatment of co-existent infections is a PRE-operative measure. Keeping tubings away helps but is less direct. Early discharge does not lower infection risk.',
 'medium', 'approved', NULL, 'Paper I');

-- Q13 — COPD nursing diagnosis: impaired gas exchange related to V/Q mismatch
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Nursing Process',
 'The following is a correctly stated nursing diagnosis for a patient with Chronic Obstructive Pulmonary Disease (COPD):',
 'Poor oxygen tolerance related to low partial pressures of carbon dioxide',
 'Activity intolerance due to being in bed persistently',
 'Impaired gas exchange related to ventilation-perfusion inequality',
 'Ineffective breathing pattern related to shortage of staff to administer oxygen continuously',
 'C',
 'A correctly stated nursing diagnosis uses NANDA-I: problem RELATED TO etiology AS EVIDENCED BY signs/symptoms. In COPD the underlying pathophysiology is VENTILATION-PERFUSION (V/Q) MISMATCH leading to impaired gas exchange. Option C is correctly worded with a pathophysiological etiology. Option A is illogical; option B blames bed rest; option D blames staffing — etiologies should be patient-centred physiological problems.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Nursing Process',
 'The following is a correctly stated nursing diagnosis for a patient with Chronic Obstructive Pulmonary Disease (COPD):',
 'Poor oxygen tolerance related to low partial pressures of carbon dioxide',
 'Activity intolerance due to being in bed persistently',
 'Impaired gas exchange related to ventilation-perfusion inequality',
 'Ineffective breathing pattern related to shortage of staff to administer oxygen continuously',
 'C',
 'A correctly stated nursing diagnosis uses NANDA-I: problem RELATED TO etiology AS EVIDENCED BY signs/symptoms. In COPD the underlying pathophysiology is VENTILATION-PERFUSION (V/Q) MISMATCH leading to impaired gas exchange. Option C is correctly worded with a pathophysiological etiology. Option A is illogical; option B blames bed rest; option D blames staffing — etiologies should be patient-centred physiological problems.',
 'medium', 'approved', NULL, 'Paper I');

-- Q14 — Properties of cardiac muscle
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'The properties of a cardiac muscle are:',
 'Expansivity, sensitivity, stretchability, refractory',
 'Excitability, automaticity, conductivity, contractility',
 'Contractility, irritability, distensibility, tonicity',
 'Tonicity, irritability, conductivity, expansivity',
 'B',
 'The four classical physiological properties of cardiac muscle: EXCITABILITY (responds to stimuli), AUTOMATICITY/rhythmicity (generates its own electrical impulses — sinoatrial node), CONDUCTIVITY (conducts impulses through specialised pathways), and CONTRACTILITY (shortens in response to electrical activation). Some add refractoriness as a fifth property. Option B lists the four standard properties.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Anatomy & Physiology', 'Cardiovascular Physiology',
 'The properties of a cardiac muscle are:',
 'Expansivity, sensitivity, stretchability, refractory',
 'Excitability, automaticity, conductivity, contractility',
 'Contractility, irritability, distensibility, tonicity',
 'Tonicity, irritability, conductivity, expansivity',
 'B',
 'The four classical physiological properties of cardiac muscle: EXCITABILITY (responds to stimuli), AUTOMATICITY/rhythmicity (generates its own electrical impulses — sinoatrial node), CONDUCTIVITY (conducts impulses through specialised pathways), and CONTRACTILITY (shortens in response to electrical activation). Some add refractoriness as a fifth property. Option B lists the four standard properties.',
 'medium', 'approved', NULL, 'Paper I');

-- Q15 — Acute pain vs chronic pain: sympathetic stress response
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Pain Management',
 'Acute pain presents with:',
 'Increased muscle tension, increased heart rate, depression',
 'Decreased libido, reduced appetite, sympathetic stress response',
 'Sympathetic stress response, recent onset, anxiety',
 'Long duration, irritability, withdrawal from relationships',
 'C',
 'ACUTE pain (sudden, time-limited) activates the SYMPATHETIC NERVOUS SYSTEM — tachycardia, tachypnoea, hypertension, sweating, pallor, mydriasis; recent onset; behavioural responses: anxiety, restlessness, grimacing, guarding. CHRONIC pain (more than 3–6 months) is different — sympathetic responses adapt and disappear; instead depression, fatigue, withdrawal, reduced appetite/libido and irritability predominate (option D describes chronic pain). Option C captures the acute pain triad.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Pain Management',
 'Acute pain presents with:',
 'Increased muscle tension, increased heart rate, depression',
 'Decreased libido, reduced appetite, sympathetic stress response',
 'Sympathetic stress response, recent onset, anxiety',
 'Long duration, irritability, withdrawal from relationships',
 'C',
 'ACUTE pain (sudden, time-limited) activates the SYMPATHETIC NERVOUS SYSTEM — tachycardia, tachypnoea, hypertension, sweating, pallor, mydriasis; recent onset; behavioural responses: anxiety, restlessness, grimacing, guarding. CHRONIC pain (more than 3–6 months) is different — sympathetic responses adapt and disappear; instead depression, fatigue, withdrawal, reduced appetite/libido and irritability predominate (option D describes chronic pain). Option C captures the acute pain triad.',
 'medium', 'approved', NULL, 'Paper I');

-- Q17 — Colloids definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'Colloids include:',
 'Whole blood, plasma and plasma expanders',
 'Physiologic sodium chloride and Ringer''s lactate',
 '5% dextrose and Hartmann''s solution',
 '50% dextrose and 0.45% normal saline',
 'A',
 'Colloids are fluids containing large oncotic molecules that stay in the intravascular space, drawing fluid from the interstitium. Examples: WHOLE BLOOD, PLASMA, albumin, plasma expanders (gelatin/Haemaccel, dextrans, hydroxyethyl starches). Crystalloids contain only small molecules (electrolytes plus/minus glucose) — normal saline, Ringer''s lactate/Hartmann''s, Darrow''s, dextrose solutions are all crystalloids.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'Colloids include:',
 'Whole blood, plasma and plasma expanders',
 'Physiologic sodium chloride and Ringer''s lactate',
 '5% dextrose and Hartmann''s solution',
 '50% dextrose and 0.45% normal saline',
 'A',
 'Colloids are fluids containing large oncotic molecules that stay in the intravascular space, drawing fluid from the interstitium. Examples: WHOLE BLOOD, PLASMA, albumin, plasma expanders (gelatin/Haemaccel, dextrans, hydroxyethyl starches). Crystalloids contain only small molecules (electrolytes plus/minus glucose) — normal saline, Ringer''s lactate/Hartmann''s, Darrow''s, dextrose solutions are all crystalloids.',
 'medium', 'approved', NULL, 'Paper I');

-- Q18 — Glasgow Coma Scale: eyes to pain + abnormal flexion + incomprehensible = 7
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Assessment',
 'A patient who opens the eyes to pain, has abnormal flexion and makes incomprehensible sounds has a Glasgow Coma Scale total of:',
 '6',
 '8',
 '7',
 '9',
 'C',
 'Glasgow Coma Scale: Eye opening to PAIN = 2; Best motor response — ABNORMAL FLEXION (decorticate) = 3; Best verbal — INCOMPREHENSIBLE SOUNDS = 2. Total = 2 + 3 + 2 = 7/15. A GCS of 7 or less defines severe brain injury and indicates need for airway protection.',
 'hard', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Neurological Assessment',
 'A patient who opens the eyes to pain, has abnormal flexion and makes incomprehensible sounds has a Glasgow Coma Scale total of:',
 '6',
 '8',
 '7',
 '9',
 'C',
 'Glasgow Coma Scale: Eye opening to PAIN = 2; Best motor response — ABNORMAL FLEXION (decorticate) = 3; Best verbal — INCOMPREHENSIBLE SOUNDS = 2. Total = 2 + 3 + 2 = 7/15. A GCS of 7 or less defines severe brain injury and indicates need for airway protection.',
 'hard', 'approved', NULL, 'Paper I');

-- Q19 — Risk factors for stroke
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'The risk factors in stroke are:',
 'Obesity, smoking and cardiovascular disease',
 'Diabetes, high cholesterol and liver cirrhosis',
 'Drug abuse, hypertension and tertiary syphilis',
 'Elevated haematocrit, alcohol consumption and pregnancy',
 'A',
 'Major MODIFIABLE risk factors for stroke (ischaemic and haemorrhagic): HYPERTENSION (the single biggest), SMOKING, DIABETES MELLITUS, hyperlipidaemia/atherosclerotic CARDIOVASCULAR DISEASE, atrial fibrillation, OBESITY, sedentary lifestyle, excessive alcohol. Non-modifiable: age, male sex, family history, race. Option A names three classic risk factors. Liver cirrhosis is not a primary risk factor.',
 'medium', 'approved', NULL, 'Paper I');

-- Q20 — Conjunctivitis: hyperaemia, tearing, foreign body sensation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Eye Disorders',
 'The clinical features for conjunctivitis include:',
 'Pain over lachrymal drainage site, itching and irritation',
 'Hyperaemia, tearing, foreign body sensation',
 'Painless nodule in the eyelid, suppurative inflammation and itching',
 'Ulceration of inner canthus, localised swelling and subacute pain',
 'B',
 'Conjunctivitis (pink eye) typically presents with: HYPERAEMIA/REDNESS of the conjunctiva, watery/mucopurulent discharge (TEARING), FOREIGN-BODY/gritty sensation, itching (especially allergic conjunctivitis), eyelid sticking together on waking. Visual acuity is normal; pain is usually mild. Severe pain suggests keratitis, iritis or angle-closure glaucoma — not conjunctivitis. Option B captures the classic triad.',
 'easy', 'approved', NULL, 'Paper I');

-- ─── SET 16 (PARTIAL — last set, truncated in source PDF) ─────────────────────
-- Q7  SKIPPED — exact duplicate of Set 15 Q6a (Kussmaul's in DKA and renal failure)
-- Q7b SKIPPED — exact duplicate of Set 15 Q6b (morphine in pancreatitis)
-- Q8  SKIPPED — exact duplicate of Set 6 Q8 (anaphylactic shock: antigen-antibody)
-- Q9  SKIPPED — exact duplicate of Set 6 Q9 (reverse barrier nursing)
-- Q12 SKIPPED — exact duplicate of Set 5 Q13 (primary causes of acute otitis media)

-- Q1 — Passive ROM exercises: prevent joint rigidity and contractures
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Rehabilitation Nursing',
 'Passive range of motion exercises:',
 'Are performed to prevent nosocomial infections',
 'Help to prevent joint rigidity and contractures',
 'Is a collaborative intervention that requires a surgeon and a nurse',
 'Are repeated 5–6 times a day to enhance quick recovery',
 'B',
 'PASSIVE range-of-motion (PROM) exercises are performed by the nurse/physiotherapist moving the patient''s joints through their full range when the patient cannot actively move them (e.g. unconscious, post-stroke, immobilised). The primary purposes are to PREVENT JOINT STIFFNESS/RIGIDITY AND CONTRACTURES, maintain muscle length, improve circulation, prevent DVT. They do not prevent infection. They are a routine nursing intervention (no surgeon required). Typically done 2–3 times per day, 5–10 repetitions per joint.',
 'easy', 'approved', NULL, 'Paper I');

-- Q2 — NG feeding tube care: irrigate before and after each feeding
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Nursing',
 'For a patient with a nasogastric feeding tube the nurse should:',
 'Perform oral care once a day and avoid hanging the tube below the level of the stomach',
 'Avoid aspirating any gastric fluid from the tube',
 'Ensure the patient lies flat for 30 minutes after every feeding to prevent dumping syndrome',
 'Irrigate the tube with small amount of water before and after each feeding',
 'D',
 'Standard care of an NG feeding tube: IRRIGATE/FLUSH with 20–30 ml water BEFORE and AFTER each feeding and after medications, to keep the tube patent. Aspirate before feeding to check residual gastric volume (high residual = delay/decrease feed); place the patient UPRIGHT (30–45 degrees) during and for 30–60 minutes after feeding to prevent aspiration (NOT flat). Oral care should be done MULTIPLE times per day.',
 'easy', 'approved', NULL, 'Paper I');

-- Q3 — Nutrient distribution for diabetic patient
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The appropriate distribution of nutrients for a diabetic patient might be:',
 '30% carbohydrates, 30% fat, 40% protein',
 '60% carbohydrates, 20% fat, 20% protein',
 '60% carbohydrates, 30% fat, 10% protein',
 '40% carbohydrates, 40% fat, 20% protein',
 'B',
 'The Kenya national diabetes guidelines and IDF/ADA recommend approximately: 45–65% calories from CARBOHYDRATES (preferably complex/high-fibre, low glycaemic index), 15–20% PROTEIN (0.8–1 g/kg/day), and less than 30% FAT (less than 7% saturated fat). Option B approximates this: 60% carbs, 20% fat, 20% protein. Option C underestimates protein at 10% (insufficient); options A and D have inappropriate excess fat or protein.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'The appropriate distribution of nutrients for a diabetic patient might be:',
 '30% carbohydrates, 30% fat, 40% protein',
 '60% carbohydrates, 20% fat, 20% protein',
 '60% carbohydrates, 30% fat, 10% protein',
 '40% carbohydrates, 40% fat, 20% protein',
 'B',
 'The Kenya national diabetes guidelines and IDF/ADA recommend approximately: 45–65% calories from CARBOHYDRATES (preferably complex/high-fibre, low glycaemic index), 15–20% PROTEIN (0.8–1 g/kg/day), and less than 30% FAT (less than 7% saturated fat). Option B approximates this: 60% carbs, 20% fat, 20% protein. Option C underestimates protein at 10% (insufficient); options A and D have inappropriate excess fat or protein.',
 'medium', 'approved', NULL, 'Paper I');

-- Q4 — Prevent recurrent cystitis: increased fluids + urine acidification
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Urinary Disorders',
 'To prevent recurrent cystitis, a nurse should advise a patient to:',
 'Increase fluid intake to 2500–3000 ml/day and use urine acidifying agents',
 'Reduce intake of urine acidifiers and increase intake of urine alkalinising agents',
 'Avoid wearing tight clothes and public showers',
 'Avoid citrus fruits and increase intake of bicarbonate drinks',
 'A',
 'Cystitis prevention: drink plenty of fluids (2.5–3 L/day) to flush bacteria from the bladder; ACIDIFY URINE (cranberry juice, vitamin C — bacteria favour alkaline urine); void after intercourse; wipe front-to-back; avoid bubble baths; wear cotton underwear; complete antibiotic courses. Public showers are not specifically a cystitis cause. Bicarbonate alkalinises urine (used during acute infection to relieve dysuria, not for prevention).',
 'medium', 'approved', NULL, 'Paper I');

-- Q5 — After barium enema: increase fluid intake
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Procedures',
 'After a barium enema a nurse should:',
 'Keep the patient NPO for 8 hours to rest the bowel',
 'Advise the patient that his/her stool will be radioactive',
 'Encourage the patient to increase his fluid intake',
 'Advise the patient to avoid abdominal exercises for at least 1 week',
 'C',
 'After barium enema/swallow: encourage INCREASED FLUID INTAKE and possibly a laxative — barium can harden in the colon and cause constipation or impaction if not promptly evacuated. Stool will be CHALKY WHITE (not radioactive — barium is radio-opaque, not radioactive) for 24–72 hours. No NPO requirement post-procedure; light meals are fine. No exercise restriction.',
 'easy', 'approved', NULL, 'Paper I');

-- Q6 — Removing sutures: do not pull exposed suture through wound
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Surgical Nursing', 'Wound Care',
 'When removing sutures, it is good practice to:',
 'Use sterile gloves during the procedure',
 'Refrain from pulling an exposed suture through the wound',
 'Administer a topical local anaesthetic agent before suture removal',
 'Remove all sutures at once 3–5 days after surgery',
 'B',
 'Suture removal technique: clean hands (sterile gloves preferred); clean the wound with antiseptic; using forceps GENTLY lift the suture knot, cut the suture BELOW the knot (on the side closest to skin), and pull the cut suture out by pulling toward the wound — NEVER pull the EXPOSED portion of suture (which has been outside the skin) THROUGH the wound, as this drags potentially contaminated material into the healing tissue. Removal timing varies by site: face 3–5 days, scalp/trunk 7–10 days, limbs 10–14 days.',
 'medium', 'approved', NULL, 'Paper I');

-- Q10 — Korotkoff sounds: correct order
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Assessment',
 'The Korotkoff sounds heard while measuring blood pressure present in the order of:',
 'Tapping, swishing, knocking, muffling and silence',
 'Swishing, tapping, silence, muffling and knocking',
 'Knocking, tapping, swishing, muffling, silence',
 'Silence, tapping, knocking, swishing and muffling',
 'A',
 'Korotkoff sounds in the 5 phases as the BP cuff is deflated: Phase I — first faint clear TAPPING sounds (= systolic BP); Phase II — sounds soften with a SWISHING/blowing quality; Phase III — sounds become louder, sharper KNOCKING; Phase IV — abrupt MUFFLING; Phase V — sounds DISAPPEAR (= diastolic BP). Option A correctly orders them: tapping, swishing, knocking, muffling, silence.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Assessment',
 'The Korotkoff sounds heard while measuring blood pressure present in the order of:',
 'Tapping, swishing, knocking, muffling and silence',
 'Swishing, tapping, silence, muffling and knocking',
 'Knocking, tapping, swishing, muffling, silence',
 'Silence, tapping, knocking, swishing and muffling',
 'A',
 'Korotkoff sounds in the 5 phases as the BP cuff is deflated: Phase I — first faint clear TAPPING sounds (= systolic BP); Phase II — sounds soften with a SWISHING/blowing quality; Phase III — sounds become louder, sharper KNOCKING; Phase IV — abrupt MUFFLING; Phase V — sounds DISAPPEAR (= diastolic BP). Option A correctly orders them: tapping, swishing, knocking, muffling, silence.',
 'medium', 'approved', NULL, 'Paper I');

-- Q11 — Sickle cell anaemia: folic acid + pneumococcal vaccine prophylaxis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'In sickle cell anaemia patients:',
 'The structure of haemoglobin molecule is not affected',
 'Prophylactic administration of folic acid and pneumococcal vaccine is recommended',
 'Administration of IV fluids and immediate blood transfusion are encouraged during sickle cell crisis',
 'The treatment of choice includes administration of penicillins and NSAIDs',
 'B',
 'Routine PROPHYLAXIS in sickle cell disease per Kenya Basic Paediatric Protocols and WHO: daily FOLIC ACID 5 mg (high red-cell turnover increases folate demand), PNEUMOCOCCAL vaccine (PCV13, PPSV23) and other vaccinations including meningococcal, Hib, hepatitis B, annual influenza; daily PENICILLIN V from infancy to age 5 (functional asplenia); hydroxyurea for severe phenotype. HbS has Glu to Val substitution (structure IS affected — option A wrong). Routine transfusion in crisis is NOT recommended — hydration and analgesia are primary.',
 'medium', 'approved', NULL, 'Paper I');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES
('BScN', 'Medical-Surgical Nursing', 'Haematological Disorders',
 'In sickle cell anaemia patients:',
 'The structure of haemoglobin molecule is not affected',
 'Prophylactic administration of folic acid and pneumococcal vaccine is recommended',
 'Administration of IV fluids and immediate blood transfusion are encouraged during sickle cell crisis',
 'The treatment of choice includes administration of penicillins and NSAIDs',
 'B',
 'Routine PROPHYLAXIS in sickle cell disease per Kenya Basic Paediatric Protocols and WHO: daily FOLIC ACID 5 mg (high red-cell turnover increases folate demand), PNEUMOCOCCAL vaccine (PCV13, PPSV23) and other vaccinations including meningococcal, Hib, hepatitis B, annual influenza; daily PENICILLIN V from infancy to age 5 (functional asplenia); hydroxyurea for severe phenotype. HbS has Glu to Val substitution (structure IS affected — option A wrong). Routine transfusion in crisis is NOT recommended — hydration and analgesia are primary.',
 'medium', 'approved', NULL, 'Paper I');
