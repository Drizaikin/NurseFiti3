-- =============================================================================
-- SEED: NCK 2024 Approved Questions — BScN Paper I
-- =============================================================================
-- Source: NCK-MCQ-Compilation-Answers-Rationales1.docx &
--         NCK-MCQ-Compilation-Answers-Rationales2.docx
-- Cadre: BScN | Paper: 'Paper I' | exam_year: 2024
-- Units: Medical-Surgical, Surgical Nursing, Critical Care, Emergency Nursing,
--        Pharmacology, Paediatrics, Midwifery, IPC
-- Cognitive level: analysis / synthesis / evaluation (BScN complexity)
-- Status: approved | contributor_id: NULL
-- Dedup: ON CONFLICT (stem, cadre) DO NOTHING
-- Rationale audit: verified against Brunner & Suddarth, MOH Kenya, ABC principles
-- NOTE: 2006/2007/2008/2018/2019/2025 stems in these docs are identical to
--       previously seeded rows; ON CONFLICT will silently skip them.
--       Only 2024 year is genuinely new.
-- =============================================================================

-- ─── BScN Paper I — 2024 ──────────────────────────────────────────────────────

-- Q1 [2024] — Triage MVA: sternal bruise priority
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Emergency and Trauma Nursing',
  'The nurse employed in the emergency room is responsible for triage of four clients injured in a motor vehicle accident. Which of the following clients should receive priority in care?',
  'A 10-year-old with lacerations of the face',
  'A 15-year-old with sternal bruises',
  'A 34-year-old with a fractured femur',
  'A 50-year-old with dislocation of the elbow',
  'B',
  'Sternal (anterior chest) bruising in a trauma victim suggests possible underlying blunt cardiac or pulmonary injury — myocardial contusion, pneumothorax or aortic injury — which are immediate threats to airway, breathing and circulation (ABC priority). Facial lacerations are not life-threatening. A fractured femur and elbow dislocation are urgent but not immediately life-threatening in the absence of neurovascular compromise. Triage principle: prioritise the patient most at risk of rapid deterioration. Ref: Emergency triage — ABC priority; MOH Kenya; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2024] — Roommate for myasthenia gravis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Neuromuscular Disorders',
  'Which of the following roommates would be most suitable for the client with myasthenia gravis?',
  'A client with hypothyroidism',
  'A client with Crohn''s disease',
  'A client with pyelonephritis',
  'A client with bronchitis',
  'A',
  'Myasthenia gravis (MG) causes progressive weakness of voluntary muscles including respiratory muscles, predisposing the client to respiratory complications and infection-triggered myasthenic crises. The client must be protected from infectious roommates. Hypothyroidism is a stable, chronic, non-infectious endocrine condition — the safest roommate. Pyelonephritis (urinary tract infection) and bronchitis (respiratory infection) are infectious and contraindicated. Crohn''s disease carries infection/immunological risk. Ref: Brunner & Suddarth — neuromuscular disorders; IPC principles.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2024] — CVP assessment: Valsalva error
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Haemodynamic Monitoring',
  'The nurse is observing a graduate nurse as she assesses the central venous pressure. Which observation would indicate that the graduate needs further teaching?',
  'The graduate places the client in a supine position to read the manometer',
  'The graduate turns the stop-cock to the off position from the IV fluid to the client',
  'The graduate instructs the client to perform the Valsalva maneuver during the CVP reading',
  'The graduate notes the level at the top of the meniscus',
  'C',
  'The Valsalva manoeuvre (forced expiration against a closed glottis) raises intrathoracic pressure, which artificially elevates the CVP reading and produces a falsely high result. The client should breathe normally and be relaxed during CVP measurement. Supine positioning (to zero the transducer at the phlebostatic axis), turning the stopcock off from IV fluid to the client, and reading at the top of the meniscus are all correct techniques. Ref: Brunner & Suddarth — haemodynamic monitoring; critical care nursing.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2024] — Post-op assignment to RN: thoracotomy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Delegation and Assignment',
  'The nurse is working with another nurse and a patient care assistant. Which of the following clients should be assigned to the registered nurse?',
  'A client 2 days post-appendectomy',
  'A client 1 week post-thyroidectomy',
  'A client 3 days post-splenectomy',
  'A client 2 days post-thoracotomy',
  'D',
  'The client 2 days post-thoracotomy is the most complex and least stable: chest tubes are in situ, respiratory compromise and haemorrhage are ongoing risks, and intensive assessment is required. This client must be assigned to the registered nurse. The client 1 week post-thyroidectomy and 2–3 days post-appendectomy/splenectomy are further from their surgery and more stable, making them more appropriate for assignment to a less experienced nurse or delegated tasks. Ref: Delegation and assignment principles — NCSBN framework; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2024] — Novice nurse error: no gloves for dressing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Infection Prevention and Control',
  'Which action by the novice nurse indicates a need for further teaching?',
  'The nurse fails to wear gloves to remove a dressing',
  'The nurse applies an oxygen saturation monitor to the ear lobe',
  'The nurse elevates the head of the bed to check the blood pressure',
  'The nurse places the extremity in a dependent position to acquire a peripheral blood sample',
  'A',
  'Removing a soiled wound dressing without gloves violates standard (universal) precautions by exposing the nurse to blood and body fluids — this requires immediate correction. Applying a pulse oximeter probe to the earlobe is acceptable when fingers are poorly perfused. Elevating the head of the bed is standard positioning for BP measurement. Placing the extremity in a dependent position promotes venous filling for peripheral blood sampling. Ref: IPC — standard precautions (WHO, MOH Kenya IPC guidelines).',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2024] — Organ donor: priority goal BP ≥70
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Critical Care Nursing',
  'The graduate nurse is assigned to care for the client on ventilator support, pending organ donation. Which goal should receive priority?',
  'Maintaining the client''s systolic blood pressure at 70 mmHg or greater',
  'Maintaining the client''s urinary output greater than 300 cc per hour',
  'Maintaining the client''s body temperature greater than 33 degrees rectal',
  'Maintaining the client''s hematocrit at less than 30%',
  'A',
  'Organ viability depends on adequate tissue perfusion. Maintaining systolic blood pressure ≥70 mmHg ensures perfusion to donor organs (kidneys, liver, heart, lungs). A urinary output >300 mL/hr signals diabetes insipidus (a complication to be treated, not a goal). Body temperature should be maintained at ≥35°C (not 33°C) to prevent coagulopathy. A haematocrit <30% reduces oxygen-carrying capacity — it is not a target. Ref: Critical care — brain-dead organ-donor haemodynamic management; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2024] — Newly licensed nurse: best assignment diverticulitis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Delegation and Assignment',
  'Which client can best be assigned to the newly licensed nurse?',
  'The client receiving chemotherapy',
  'The client post-coronary bypass',
  'The client with a TURP',
  'The client with diverticulitis',
  'D',
  'The client with diverticulitis (inflammation of colonic diverticula) being treated medically is the most stable and clinically predictable — the appropriate assignment for a newly licensed/orientating nurse. Chemotherapy clients require advanced assessment for toxic reactions. Post-coronary bypass clients are haemodynamically complex. TURP (transurethral resection of prostate) carries risks of haemorrhage, bladder spasm and TUR syndrome requiring experienced assessment. Ref: Delegation/assignment principles — NCSBN framework.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2024] — APR: priority post-op care
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Surgical Nursing', 'Colorectal Surgery',
  'A client has rectal cancer and is scheduled for an abdominal perineal resection. What should be the priority nursing care during the post-op period?',
  'Teaching how to irrigate the ileostomy',
  'Stopping electrolyte loss in the incisional area',
  'Encouraging a high-fiber diet',
  'Facilitating perineal wound drainage',
  'D',
  'Abdominal-perineal resection (APR) involves removal of the rectum, anus and surrounding tissue, creating a permanent sigmoid colostomy (not an ileostomy) and leaving a large perineal wound. The perineal wound is prone to infection, haematoma and delayed healing. Facilitating drainage and monitoring for infection are the immediate post-operative priorities. A high-fibre diet is contraindicated immediately post-operatively. Colostomy irrigation teaching is planned but is not the immediate priority. Ref: Brunner & Suddarth — colorectal surgery; Wound care.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2024] — Severe facial/neck burns: apply oxygen first
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Burns Management',
  'The nurse is working in the emergency room when a client arrives with severe burns of the left arm, hands, face, and neck. Which action should receive priority?',
  'Starting an IV',
  'Applying oxygen',
  'Obtaining blood gases',
  'Medicating the client for pain',
  'B',
  'Burns of the face and neck are an immediate airway emergency — heat and chemical injury cause progressive supraglottic and glottic oedema that can rapidly obstruct the airway within minutes. Applying supplemental oxygen and protecting the airway (preparing for early intubation) takes absolute priority over IV access, blood gases and analgesia. This reflects the ABC (Airway, Breathing, Circulation) principle in trauma/burns management. Ref: Brunner & Suddarth — burns; MOH Kenya Emergency Care.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2024] — MVA: hypotension + tachycardia → fluid volume deficit
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Emergency and Shock Management',
  'The client arrives in the emergency department after a motor vehicle accident. Nursing assessment findings include BP 68/34, pulse rate 130, and respirations 18. Which is the client''s most appropriate priority nursing diagnosis?',
  'Alteration in cerebral tissue perfusion',
  'Fluid volume deficit',
  'Ineffective airway clearance',
  'Alteration in sensory perception',
  'B',
  'BP 68/34 mmHg with heart rate 130 bpm is classic hypovolaemic shock — a profound fluid volume deficit from haemorrhage. Respirations of 18/min indicate the airway is patent and breathing is adequate. The priority nursing diagnosis addresses the immediate haemodynamic problem: fluid volume deficit (deficient fluid volume) requiring urgent IV fluid resuscitation. Cerebral perfusion alteration and sensory changes are consequences of the shock, not the primary diagnosis. Ref: Brunner & Suddarth — shock; emergency nursing.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2024] — Radiation assignment: radium implant excluded for pregnant nurse
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
  'The registered nurse is making assignments for the day. Which client should not be assigned to the pregnant nurse?',
  'The client receiving linear accelerator radiation therapy for lung cancer',
  'The client with a radium implant for cervical cancer',
  'The client who has just been administered soluble brachytherapy for thyroid cancer',
  'The client who returned from an intravenous pyelogram',
  'B',
  'A client with a sealed internal radium implant (brachytherapy source in situ) is an ongoing source of ionising radiation. The pregnant nurse must not be assigned to this client because ionising radiation is teratogenic, especially in the first trimester. External-beam (linear accelerator) clients are not radioactive after treatment. A client who had an IVP was exposed to contrast, not radiation requiring restriction. Soluble (systemic) brachytherapy for thyroid may require isolation precautions, but the sealed implant poses the greatest ongoing exposure risk. Ref: Radiation safety — oncology nursing; ALARA principle.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2024] — Pneumocystis risk: chemotherapy immunosuppression
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Medical-Surgical Nursing', 'Oncology Nursing',
  'Which client is at risk for opportunistic diseases such as pneumocystis pneumonia?',
  'The client with cancer who is being treated with chemotherapy',
  'The client with Type I diabetes',
  'The client with thyroid disease',
  'The client with Addison''s disease',
  'A',
  'Pneumocystis jirovecii pneumonia (PCP, formerly called PCP carinii) is a fungal opportunistic infection that occurs in severely immunocompromised hosts. Chemotherapy causes profound bone-marrow suppression and neutropenia/lymphopenia, creating the immunosuppressed state required for opportunistic infections. Type I diabetes, thyroid disease and Addison''s disease do not produce the level of immunosuppression needed for PCP unless complicated by other factors. Ref: Brunner & Suddarth — oncology/immunosuppression; MOH Kenya HIV/opportunistic infections guidelines.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2024] — Scope of practice: suturing outside RN scope
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Scope of Practice',
  'Which assignment should not be performed by the registered nurse?',
  'Inserting a Foley catheter',
  'Inserting a nasogastric tube',
  'Monitoring central venous pressure',
  'Inserting sutures and clips in surgery',
  'D',
  'Inserting sutures and applying surgical clips are surgical procedures within the scope of medical practice (physicians and surgeons), not within the registered nurse''s scope of practice per NCK standards. Inserting a Foley catheter, NG tube and monitoring CVP are all within the RN''s scope of practice and are standard nursing procedures. Ref: NCK Scope of Practice for Registered Nurses; nursing practice standards.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2024] — Post-op shock: contact physician first
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Surgical Nursing', 'Post-Operative Nursing Care',
  'The client returns to the unit from surgery with a blood pressure of 90/50, pulse 132, respirations 30. Which action by the nurse should receive priority?',
  'Document the finding',
  'Contact the physician',
  'Elevate the head of the bed',
  'Administer a pain medication',
  'B',
  'BP 90/50, HR 132 and RR 30 indicate acute post-operative haemorrhage/hypovolaemic shock requiring urgent medical intervention. After rapid nursing assessment (applying oxygen, checking IV access, ensuring airway), the priority action is to contact the physician for urgent orders. Elevating the head would worsen hypotension by reducing venous return. Documentation is not a priority over intervention. Analgesia could further drop blood pressure. Ref: Post-operative emergency management; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 [2024] — Postpartal pre-eclampsia assignment: L&D experience
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Midwifery', 'Postnatal Complications',
  'Which nurse should be assigned to care for the postpartal client with preeclampsia?',
  'The RN with 2 weeks of experience in postpartum',
  'The RN with 3 years of experience in labor and delivery',
  'The RN with 10 years of experience in surgery',
  'The RN with 1 year of experience in the neonatal intensive care unit',
  'B',
  'A postpartal client with pre-eclampsia requires monitoring for eclampsia, magnesium sulphate toxicity, haemolysis elevated liver enzymes low platelets (HELLP) syndrome and hypertensive urgency. The RN with 3 years of labour-and-delivery experience has specific competency in maternal complications and is the most qualified assignment. A newly qualified postpartum RN (2 weeks) lacks experience with complications. Surgical and NICU experience does not translate directly to maternal obstetric emergencies. Ref: Staffing by competency; MOH Kenya maternal care.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;
