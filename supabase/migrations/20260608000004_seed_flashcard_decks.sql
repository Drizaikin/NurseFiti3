-- Seed initial flashcard decks and cards for NCK exam preparation.
-- Covers the highest-yield units across all cadres.
-- All cards are original educational content for NCK exam prep.

-- ─── Deck 1: Pharmacology Fundamentals (All cadres) ──────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000001',
  'Pharmacology Fundamentals',
  'Drug classes, adverse effects, and calculations tested across all NCK papers',
  'KRCHN',
  'Clinical Pharmacology',
  20
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000001',
  'What is the drug calculation formula for oral and IM medications?',
  'Volume to administer = (Desired dose ÷ Available dose) × Stock volume',
  'Desired ÷ Available × Volume',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is the formula for IV drip rate in drops per minute?',
  'Drops/min = (Volume in mL × Drop factor) ÷ Time in minutes. Standard IV set drop factor = 15 drops/mL.',
  'Vol × Drop factor ÷ Time (min)',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'A patient is prescribed digoxin. What are the classic signs of digoxin toxicity?',
  'Yellow-green visual disturbances (xanthopsia), bradycardia, nausea/vomiting, arrhythmias. Therapeutic range: 0.5–2.0 ng/mL.',
  'Yellow-green vision + bradycardia',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'First-line treatment for anaphylaxis and the correct route/dose?',
  'Adrenaline (Epinephrine) 0.5mg IM (1:1000 solution) into the anterolateral thigh. Repeat every 5 minutes if no improvement.',
  'Adrenaline 0.5mg IM – anterolateral thigh',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'Which antibiotic is contraindicated in patients with penicillin allergy and why?',
  'Amoxicillin and other penicillins are contraindicated due to cross-hypersensitivity. Use erythromycin or azithromycin as alternatives. 10% cross-reactivity with cephalosporins — use with caution.',
  'Amoxicillin → contraindicated',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is the Kenya first-line ART regimen for adults with HIV?',
  'TDF + 3TC + DTG (Tenofovir + Lamivudine + Dolutegravir). This is the Kenya MOH guideline 2022 first-line regimen for all adults including pregnant women.',
  'TDF + 3TC + DTG',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What are the side effects of TB medications? (RIPE mnemonic)',
  'R – Rifampicin: red/orange urine, hepatotoxicity. I – Isoniazid: peripheral neuropathy (give pyridoxine). P – Pyrazinamide: hyperuricaemia, hepatotoxicity. E – Ethambutol: optic neuritis (check visual acuity).',
  'RIPE: Red urine / Neuropathy / Uric acid / Eye problems',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is the magnesium sulphate protocol for eclampsia?',
  'Loading dose: 4g IV over 15–20 minutes. Maintenance: 1–2g/hour IV infusion. Monitor: respiratory rate (>12/min), urine output (>25mL/hr), patellar reflexes (must be present). Antidote for toxicity: calcium gluconate 10mL IV.',
  'MgSO4: 4g IV load → 1–2g/hr maintenance',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'Metformin is contraindicated in which condition and why?',
  'Renal impairment (eGFR < 30 mL/min/1.73m²). Metformin accumulates in renal failure, causing lactic acidosis — a life-threatening complication. Also hold before IV contrast or surgery.',
  'Renal impairment (eGFR < 30) → lactic acidosis risk',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is the WHO analgesic pain ladder and its three steps?',
  'Step 1: Non-opioids (Paracetamol, NSAIDs) for mild pain. Step 2: Mild opioids (Codeine, Tramadol) ± non-opioids for moderate pain. Step 3: Strong opioids (Morphine, Pethidine) ± non-opioids for severe pain. Use lowest effective step first.',
  'Step 1: Paracetamol → Step 2: Codeine → Step 3: Morphine',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'A child weighs 15kg. Paracetamol dose is 15mg/kg. What volume do you give if syrup is 250mg/5mL?',
  'Step 1: Dose = 15 × 15 = 225mg. Step 2: Volume = (225 ÷ 250) × 5 = 4.5mL',
  '4.5 mL',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'Which antipsychotic has the most serious haematological side effect and what is it?',
  'Clozapine — agranulocytosis (potentially fatal drop in white blood cells). Mandatory weekly WBC monitoring for 18 weeks, then monthly. Clozapine must be stopped immediately if WBC < 3,000/mm³.',
  'Clozapine → agranulocytosis → mandatory WBC monitoring',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is the oxytocin protocol for active management of the third stage of labour?',
  '10 IU oxytocin IM within 1 minute of delivery of the baby. Follow with controlled cord traction and uterine massage. This reduces PPH risk by ~60%. In Kenya, misoprostol 600mcg oral is used at community level where oxytocin is unavailable.',
  'Oxytocin 10 IU IM immediately after birth',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What are the 10 Rights of medication administration?',
  'Right Patient, Right Drug, Right Dose, Right Route, Right Time, Right Documentation, Right Reason, Right Response, Right to Refuse, Right Education. First 5 are the essential minimum.',
  '10 Rights: Patient, Drug, Dose, Route, Time + 5 more',
  'KRCHN', 'Clinical Pharmacology'),

('a1000000-0000-0000-0000-000000000001',
  'What is insulin storage and what happens if it is stored incorrectly?',
  'Unopened insulin: refrigerated at 2–8°C. In-use vials/pens: room temperature (15–25°C) for up to 28 days. Never freeze. Exposure to heat or light denatures the protein and makes insulin ineffective. Always check expiry.',
  'Unopened: 2–8°C fridge · In use: room temp max 28 days',
  'KRCHN', 'Clinical Pharmacology');

-- ─── Deck 2: Medical-Surgical Nursing (KRCHN) ────────────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000002',
  'Medical-Surgical Nursing Essentials',
  'High-yield med-surg conditions — heart failure, DM, stroke, renal, respiratory',
  'KRCHN',
  'Medical-Surgical Nursing',
  15
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000002',
  'What are the classic signs of left-sided heart failure?',
  'Dyspnoea (especially orthopnoea — worse lying flat), paroxysmal nocturnal dyspnoea, pulmonary oedema (frothy pink sputum), tachycardia, fatigue. Left side fails → fluid backs into pulmonary circulation.',
  'Lungs: dyspnoea, orthopnoea, pulmonary oedema',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What are the classic signs of right-sided heart failure?',
  'Peripheral oedema (pitting, bilateral), raised JVP, hepatomegaly, ascites, weight gain. Right side fails → fluid backs into systemic circulation.',
  'Periphery: oedema, raised JVP, hepatomegaly',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'A patient presents with DKA. What is the priority nursing action?',
  'Airway, breathing, circulation (ABCDE). Then: IV access + aggressive IV fluid resuscitation (0.9% NaCl). Begin insulin infusion ONLY after fluids are started and potassium is ≥3.5 mmol/L. Monitor blood glucose, electrolytes, urine output hourly.',
  'IV FLUIDS FIRST — then insulin after K⁺ ≥ 3.5',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'Differentiate between ischaemic and haemorrhagic stroke in terms of CT findings and management.',
  'Ischaemic: CT shows hypodense area (dark). Treatment: tPA thrombolysis within 4.5 hours if no contraindications. Haemorrhagic: CT shows hyperdense area (bright). Treatment: BP control, NO tPA (would worsen bleeding), neurosurgery review.',
  'Ischaemic = dark on CT + tPA · Haemorrhagic = bright on CT + NO tPA',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What does the Glasgow Coma Scale (GCS) measure and what is the minimum score?',
  'Eye opening (1–4) + Verbal response (1–5) + Motor response (1–6) = total 3–15. GCS 3 = deepest coma/death. GCS 8 or below = intubation threshold. GCS 15 = fully alert.',
  'E4 + V5 + M6 = 15 (normal) · ≤8 = intubate',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'A post-operative patient 2 hours after appendicectomy develops restlessness, tachycardia, and falling blood pressure. What is the priority diagnosis?',
  'Internal haemorrhage / hypovolaemic shock. Priority: ABCDE assessment, call surgeon immediately, establish 2 large-bore IV lines, infuse IV fluids rapidly, prepare for emergency return to theatre. Do NOT leave the patient.',
  'Internal haemorrhage → haemorrhagic shock',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What is the ABCDE approach to patient assessment?',
  'A – Airway (patent? obstructed?). B – Breathing (rate, SpO2, effort). C – Circulation (HR, BP, CRT, skin colour). D – Disability (GCS, pupils, blood glucose). E – Exposure (full exposure, temperature). Always treat life threats as you find them.',
  'Airway → Breathing → Circulation → Disability → Exposure',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What are the types of shock and their primary mechanisms?',
  'Hypovolaemic: fluid/blood loss. Cardiogenic: pump failure (MI, heart failure). Distributive: vasodilation — septic (infection), anaphylactic (allergen), neurogenic (spinal injury). Obstructive: physical obstruction (PE, tension pneumothorax). Mnemonic: HAND — Hypovolaemic, Anaphylactic, Neurogenic/septic, Distributive.',
  'Hypovolaemic · Cardiogenic · Distributive · Obstructive',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What are the five stages of chronic kidney disease (CKD)?',
  'Stage 1: eGFR ≥90 (normal/high). Stage 2: eGFR 60–89 (mildly decreased). Stage 3: eGFR 30–59 (moderately decreased). Stage 4: eGFR 15–29 (severely decreased). Stage 5: eGFR <15 (kidney failure — dialysis or transplant).',
  'Stage 5: eGFR < 15 → dialysis/transplant',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What is the DOTS strategy for TB management?',
  'Directly Observed Treatment, Short-course. A healthcare worker or designated supporter observes the patient swallowing each dose. Prevents drug resistance. Kenya standard: 2HRZE/4HR (2 months intensive + 4 months continuation). Nurse responsibility: ensure adherence and report defaulters.',
  'DOTS: Observed treatment → prevents MDR-TB',
  'KRCHN', 'Medical-Surgical Nursing'),

('a1000000-0000-0000-0000-000000000002',
  'What are the pressure injury/ulcer risk assessment tools and prevention measures?',
  'Risk tools: Braden Scale (most common), Norton Scale. Prevention: reposition every 2 hours, moisture barrier creams, pressure-relieving mattress/cushion, maintain nutrition/hydration, inspect skin at pressure points every shift. PUSH tool assesses wound healing.',
  'Braden scale + 2-hourly repositioning',
  'KRCHN', 'Medical-Surgical Nursing');

-- ─── Deck 3: Maternal & Child Health (KRCHN) ─────────────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000003',
  'Maternal & Child Health',
  'ANC, labour, newborn assessment, paediatric conditions — Paper II essentials',
  'KRCHN',
  'Midwifery',
  15
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000003',
  'What is the APGAR score? What does each letter stand for?',
  'A – Appearance (skin colour). P – Pulse (heart rate). G – Grimace (reflex irritability). A – Activity (muscle tone). R – Respiration. Score 0/1/2 for each = total 0–10. Assessed at 1 minute AND 5 minutes after birth (also 10 min if still low).',
  '7–10 = Normal · 4–6 = Moderate depression · 0–3 = Severe',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'Differentiate placenta praevia from placental abruption.',
  'Placenta praevia: painless bright red vaginal bleeding, soft uterus, placenta covers cervical os — NEVER do vaginal examination. Placental abruption: painful dark red bleeding, rigid/board-like uterus, fetal distress. Both are obstetric emergencies — call for help immediately.',
  'Praevia = painless · Abruption = painful + rigid uterus',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What are the 4 Ts of postpartum haemorrhage (PPH)?',
  'Tone (uterine atony — 80% of PPH), Tissue (retained placenta/membranes), Trauma (lacerations, uterine rupture), Thrombin (coagulation defect/DIC). Uterine atony is the most common cause. First response: bimanual uterine compression + oxytocin.',
  '4 Ts: Tone · Tissue · Trauma · Thrombin',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What are the danger signs in pregnancy that require immediate referral?',
  'Severe headache with visual changes, epigastric pain (pre-eclampsia/HELLP), vaginal bleeding, decreased/absent fetal movements, premature rupture of membranes, excessive vomiting, signs of infection (fever, offensive discharge), convulsions.',
  'Headache + visual changes + epigastric pain = pre-eclampsia emergency',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What is the Kenya EPI immunisation schedule from birth to 18 months?',
  'Birth: BCG + OPV0. 6 weeks: OPV1 + DPT-HepB-Hib1 + PCV1 + Rotavirus1. 10 weeks: OPV2 + DPT-HepB-Hib2 + PCV2 + Rotavirus2. 14 weeks: OPV3 + DPT-HepB-Hib3 + PCV3 + IPV. 9 months: Measles-Rubella1. 18 months: Measles-Rubella2 + DPT booster.',
  'BCG at birth · DPT series at 6/10/14 weeks · MR at 9 months',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What is the MUAC cut-off for severe acute malnutrition (SAM) in children?',
  'MUAC < 11.5 cm = SAM (red). MUAC 11.5–12.4 cm = MAM (yellow). MUAC ≥ 12.5 cm = normal (green). SAM with complications → inpatient. SAM without complications → outpatient using RUTF (Ready-to-Use Therapeutic Food / Plumpy Nut). MAM → Supplementary Feeding Programme.',
  'SAM: MUAC < 11.5 cm · MAM: 11.5–12.4 cm',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What are the IMCI classifications for diarrhoea and their rehydration plans?',
  'Plan A (no dehydration): ORS at home, continued feeding. Plan B (some dehydration — sunken eyes, poor skin turgor): ORS 75mL/kg over 4 hours in facility. Plan C (severe dehydration — unable to drink, lethargic): IV Ringer''s Lactate 100mL/kg rapidly.',
  'A = ORS home · B = ORS facility · C = IV RL urgently',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'What is kangaroo mother care (KMC) and when is it used?',
  'Skin-to-skin contact between mother/caregiver and low-birth-weight or preterm infant, with exclusive breastfeeding support. Benefits: maintains temperature (prevents hypothermia), promotes bonding and breastfeeding, reduces infection risk, improves weight gain. Use for all infants < 2kg or < 34 weeks gestation.',
  'KMC: skin-to-skin for LBW babies < 2kg',
  'KRCHN', 'Midwifery'),

('a1000000-0000-0000-0000-000000000003',
  'How is the partograph used and what do the alert and action lines mean?',
  'The partograph monitors labour progress. Plot cervical dilation (active phase = ≥4cm). Alert line: expected normal progress. Action line: 4 hours to the right of alert line. Reaching the action line = abnormal progress → medical review and possible augmentation or C-section.',
  'Alert line = normal · Action line (4hrs later) = intervene',
  'KRCHN', 'Midwifery');

-- ─── Deck 4: Community Health (KRCHN) ────────────────────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000004',
  'Community Health Nursing',
  'KEPH levels, PHC, Kenya health system, disease surveillance — Paper II essentials',
  'KRCHN',
  'Community Health Nursing',
  10
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000004',
  'What are the 6 KEPH levels in Kenya? Give an example facility for each.',
  'Level 1: Community (CHVs, households). Level 2: Dispensary. Level 3: Health Centre. Level 4: Sub-County Hospital. Level 5: County/Teaching & Referral Hospital. Level 6: National Teaching & Referral Hospital (e.g., KNH). Mnemonic: Can Definitely Handle Significant Clinical Needs.',
  'L1 Community · L2 Dispensary · L3 Health Centre · L4-6 Hospitals',
  'KRCHN', 'Community Health Nursing'),

('a1000000-0000-0000-0000-000000000004',
  'What are the three levels of disease prevention with examples in nursing?',
  'Primary: prevent disease before it occurs (immunisation, health education, environmental sanitation). Secondary: early detection and treatment (screening programmes — cervical cancer, hypertension, diabetes). Tertiary: rehabilitation and reducing disability (physiotherapy post-stroke, support groups for chronic illness).',
  'Primary = prevent · Secondary = screen · Tertiary = rehabilitate',
  'KRCHN', 'Community Health Nursing'),

('a1000000-0000-0000-0000-000000000004',
  'What is the Alma-Ata Declaration and its core principle?',
  'Adopted in 1978 in Alma-Ata (Kazakhstan). Core principle: "Health for All by the Year 2000" through Primary Health Care (PHC). PHC is the first level of contact between individuals and the health system — accessible, affordable, and community-focused. Kenya adopted PHC through KEPH.',
  'Alma-Ata 1978: Health for All through PHC',
  'KRCHN', 'Community Health Nursing'),

('a1000000-0000-0000-0000-000000000004',
  'What is the first step in an outbreak investigation?',
  'Establish a case definition (who counts as a case — person, place, time criteria). Then: confirm the outbreak is real, identify and count cases, describe by time/place/person, form a hypothesis, test the hypothesis, implement control measures, communicate findings.',
  'FIRST: establish the case definition',
  'KRCHN', 'Community Health Nursing'),

('a1000000-0000-0000-0000-000000000004',
  'What are the WHO 5 Moments for Hand Hygiene?',
  '1. Before touching a patient. 2. Before a clean/aseptic procedure. 3. After body fluid exposure risk. 4. After touching a patient. 5. After touching patient surroundings. Use alcohol-based hand rub (ABHR) or soap and water for 40–60 seconds.',
  '5 Moments: Before patient · Before procedure · After fluid · After patient · After surroundings',
  'KRCHN', 'Community Health Nursing');

-- ─── Deck 5: Mental Health (BScN/KRCHN) ──────────────────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000005',
  'Mental Health Nursing',
  'Psychiatric conditions, therapeutic communication, Mental Health Act Kenya 2022',
  'BScN',
  'Mental Health Nursing',
  10
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000005',
  'What are the positive and negative symptoms of schizophrenia?',
  'Positive symptoms (added behaviours): hallucinations, delusions, disorganised speech, grossly disorganised behaviour. Negative symptoms (diminished behaviours): flat affect, alogia (reduced speech), avolition (lack of motivation), anhedonia (inability to experience pleasure).',
  'Positive = added · Negative = diminished',
  'BScN', 'Mental Health Nursing'),

('a1000000-0000-0000-0000-000000000005',
  'What is Neuroleptic Malignant Syndrome (NMS) and what is the immediate nursing action?',
  'NMS = life-threatening reaction to antipsychotics. Signs: hyperthermia (very high fever), muscle rigidity, autonomic instability (BP fluctuations, tachycardia), altered consciousness. Immediate action: STOP the antipsychotic immediately. Call emergency team. Cool the patient. IV fluids.',
  'STOP antipsychotic IMMEDIATELY',
  'BScN', 'Mental Health Nursing'),

('a1000000-0000-0000-0000-000000000005',
  'What are the therapeutic communication techniques a nurse should use?',
  'Active listening (full attention, eye contact). Open-ended questions ("Tell me more about..."). Reflecting feelings ("It sounds like you feel anxious"). Clarifying ("Can you help me understand what you mean?"). Silence (allowing time to think). Avoid: advice-giving, minimising, changing subject, false reassurance.',
  'Listen · Open questions · Reflect · Clarify · Silence',
  'BScN', 'Mental Health Nursing'),

('a1000000-0000-0000-0000-000000000005',
  'A patient says "I feel like ending my life." What is the correct nursing response?',
  'Take it seriously — never dismiss or minimise. Ask directly: "Are you thinking about suicide?" Direct questioning does NOT increase suicide risk. Ensure safety (remove means if possible). Stay with patient. Inform the multidisciplinary team. Document everything. Conduct a formal suicide risk assessment.',
  'Take seriously → ask directly → ensure safety → inform team',
  'BScN', 'Mental Health Nursing'),

('a1000000-0000-0000-0000-000000000005',
  'Under the Mental Health Act Kenya 2022, what are the admission types?',
  'Voluntary admission: patient consents to treatment. Involuntary admission: patient lacks capacity or is a danger to self/others — requires documented assessment and tribunal review within specified period. No patient can be detained indefinitely without review. Informed consent applies to all competent patients.',
  'Voluntary = consents · Involuntary = danger/incapacity + tribunal review',
  'BScN', 'Mental Health Nursing');

-- ─── Deck 6: Anatomy & Physiology (All cadres, Paper IV) ─────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a1000000-0000-0000-0000-000000000006',
  'Anatomy & Physiology Quick Review',
  'Cardiovascular, respiratory, renal, and endocrine physiology for Paper IV',
  'BScN',
  'Human Anatomy',
  10
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES
('a1000000-0000-0000-0000-000000000006',
  'What are the normal values for blood pressure, pulse, respiratory rate, and temperature in adults?',
  'BP: 90–120/60–80 mmHg. Pulse: 60–100 beats/min. Respiratory rate: 12–20 breaths/min. Temperature: 36.5–37.5°C. SpO2: 95–100%. Know the deviation that signals a clinical problem.',
  'BP 120/80 · Pulse 60–100 · RR 12–20 · Temp 36.5–37.5°C',
  'BScN', 'Human Anatomy'),

('a1000000-0000-0000-0000-000000000006',
  'What is the oxygen-haemoglobin dissociation curve and what causes it to shift right?',
  'The curve shows how haemoglobin releases oxygen to tissues. Right shift (reduced affinity = more O2 released to tissues) caused by: increased CO2, increased temperature, decreased pH (acidosis), increased 2,3-DPG. The Bohr effect describes pH/CO2-mediated shift.',
  'Right shift = more O2 released to tissues (high CO2, low pH, high temp)',
  'BScN', 'Human Anatomy'),

('a1000000-0000-0000-0000-000000000006',
  'Explain the RAAS system and its role in blood pressure regulation.',
  'Renin (released by kidney when BP falls) → converts angiotensinogen to angiotensin I → ACE (lung) converts to angiotensin II → vasoconstriction + aldosterone release → Na+/water retention → increased BP. ACE inhibitors block this step, reducing BP and protecting the kidneys.',
  'Low BP → Renin → Ang II → Vasoconstriction + Aldosterone → ↑BP',
  'BScN', 'Human Anatomy'),

('a1000000-0000-0000-0000-000000000006',
  'What are the classic features of metabolic acidosis and its common causes in nursing?',
  'pH < 7.35, HCO3- < 22, compensatory hyperventilation (Kussmaul breathing). Common causes: DKA, renal failure, lactic acidosis (sepsis, shock), diarrhoea. Nursing: monitor ABGs, treat underlying cause, IV sodium bicarbonate for severe cases.',
  'pH <7.35 · HCO3 <22 · Kussmaul breathing',
  'BScN', 'Human Anatomy'),

('a1000000-0000-0000-0000-000000000006',
  'What hormones regulate blood glucose and from where are they secreted?',
  'Insulin: secreted by beta cells of pancreatic islets of Langerhans → lowers blood glucose (increases uptake, inhibits gluconeogenesis). Glucagon: secreted by alpha cells → raises blood glucose. Cortisol and adrenaline also raise blood glucose (stress response).',
  'Insulin (β cells) ↓ glucose · Glucagon (α cells) ↑ glucose',
  'BScN', 'Human Anatomy');

-- Update card_count for all seeded decks
UPDATE flashcard_decks SET card_count = (
  SELECT COUNT(*) FROM flashcards WHERE flashcards.deck_id = flashcard_decks.id
) WHERE id IN (
  'a1000000-0000-0000-0000-000000000001',
  'a1000000-0000-0000-0000-000000000002',
  'a1000000-0000-0000-0000-000000000003',
  'a1000000-0000-0000-0000-000000000004',
  'a1000000-0000-0000-0000-000000000005',
  'a1000000-0000-0000-0000-000000000006'
);
