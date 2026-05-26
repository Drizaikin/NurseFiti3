-- =============================================================================
-- NCK QUESTIONS BATCH 2 — BScN & KRCHN
-- =============================================================================
-- Covers: Medical-Surgical, Pharmacology, Community Health, Mental Health,
--         Anatomy & Physiology, Paediatric Nursing, Surgical Nursing,
--         Infection Prevention & Control, Nutrition, Research & Statistics
-- All questions: status = 'approved', contributor_id = NULL (platform-owned)
-- =============================================================================

-- =============================================================================
-- SECTION A — BScN QUESTIONS
-- =============================================================================

-- ─── BScN — Medical-Surgical Nursing ─────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'A patient with chronic obstructive pulmonary disease (COPD) is receiving oxygen therapy. The nurse should administer oxygen at:',
 '6–8 L/min via face mask',
 '1–2 L/min via nasal cannula',
 '10–12 L/min via non-rebreather mask',
 '4–6 L/min via simple face mask',
 'B',
 'In COPD, the hypoxic drive replaces the normal CO2-driven respiratory stimulus because chronic CO2 retention has reset the central chemoreceptors. High-flow oxygen can suppress this hypoxic drive, causing respiratory depression and CO2 narcosis. Safe target SpO2 is 88–92%. Controlled low-flow oxygen at 1–2 L/min via nasal cannula (or 24–28% Venturi mask) is the standard approach. High-flow oxygen is reserved for acute severe hypoxia with close monitoring.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'A patient is admitted with acute myocardial infarction. The priority nursing intervention is:',
 'Administer aspirin 300 mg orally and establish IV access',
 'Perform a 12-lead ECG and administer morphine',
 'Administer oxygen, establish IV access, attach cardiac monitor, and give aspirin',
 'Insert urinary catheter and monitor urine output hourly',
 'C',
 'The MONA mnemonic guides initial AMI management: Morphine (pain relief, reduces preload), Oxygen (if SpO2 <94%), Nitrates (sublingual GTN for pain if BP allows), Aspirin (300 mg stat — antiplatelet). Priority nursing actions: OXYGEN to maintain SpO2 ≥94%, IV ACCESS for drug administration, CARDIAC MONITORING for arrhythmia detection, and ASPIRIN 300 mg orally (unless contraindicated). A 12-lead ECG is essential but the combined package in option C represents the correct priority bundle.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Medical-Surgical Nursing', 'Renal Disorders',
 'A patient with chronic kidney disease has a serum potassium of 6.8 mmol/L. The nurse should first:',
 'Administer sodium polystyrene sulfonate (Kayexalate) rectally',
 'Restrict dietary potassium intake',
 'Notify the physician and prepare for cardiac monitoring',
 'Administer furosemide IV',
 'C',
 'Serum potassium of 6.8 mmol/L is severe hyperkalaemia (normal 3.5–5.0 mmol/L). This is a life-threatening emergency — hyperkalaemia causes fatal cardiac arrhythmias (peaked T waves → widened QRS → sine wave → VF). The FIRST nursing action is to NOTIFY THE PHYSICIAN and initiate CARDIAC MONITORING. Definitive treatment (calcium gluconate IV to stabilise the myocardium, insulin + dextrose to shift K+ intracellularly, sodium bicarbonate, dialysis) requires medical orders. Dietary restriction alone is insufficient for acute severe hyperkalaemia.',
 'hard', 'approved', NULL, 'Paper 1'),

('BScN', 'Medical-Surgical Nursing', 'Neurological Disorders',
 'A patient with increased intracranial pressure should be positioned:',
 'Flat (supine) with head in neutral alignment',
 'Head of bed elevated 30–45 degrees with head in neutral alignment',
 'Trendelenburg position to improve cerebral perfusion',
 'Left lateral position to prevent aspiration',
 'B',
 'Elevated ICP management: head of bed at 30–45 degrees promotes venous drainage from the brain via the jugular veins, reducing cerebral blood volume and ICP. The head must be in NEUTRAL ALIGNMENT (no neck flexion, rotation or extension) to prevent jugular vein compression. Trendelenburg (head-down) INCREASES ICP by impeding venous drainage. Flat positioning also increases ICP. Avoid hip flexion >90 degrees. Other ICP-reducing measures: osmotherapy (mannitol/hypertonic saline), controlled ventilation, avoiding hyperthermia.',
 'medium', 'approved', NULL, 'Paper 1');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Medical-Surgical Nursing', 'Diabetes Mellitus',
 'A patient with type 1 diabetes mellitus presents with confusion, diaphoresis, and a blood glucose of 2.8 mmol/L. The nurse should:',
 'Administer glucagon 1 mg IM and call the physician',
 'Give 15–20 g of fast-acting carbohydrate orally if the patient can swallow',
 'Administer 50 mL of 50% dextrose IV immediately',
 'Recheck blood glucose in 30 minutes before intervening',
 'B',
 'This is symptomatic hypoglycaemia (BG <3.9 mmol/L with symptoms). The 15-15 rule: give 15 g fast-acting carbohydrate (4 glucose tablets, 150 mL fruit juice, or 3 teaspoons sugar) if the patient is CONSCIOUS AND CAN SWALLOW, then recheck in 15 minutes. If unconscious or unable to swallow, give 50 mL of 50% dextrose IV or glucagon 1 mg IM/SC. Since this patient is confused but not unconscious, oral glucose is the first-line approach. Waiting 30 minutes without treatment is dangerous.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Medical-Surgical Nursing', 'Wound Care',
 'When performing a wound dressing using aseptic technique, the nurse should:',
 'Clean the wound from the outer edges toward the centre',
 'Use the same swab to clean the wound in multiple strokes',
 'Clean the wound from the centre outward in a single stroke per swab',
 'Irrigate the wound with hydrogen peroxide to remove debris',
 'C',
 'Aseptic wound cleaning technique: clean from the LEAST contaminated area (wound centre) to the MOST contaminated (outer edges/surrounding skin) — this prevents introducing bacteria from the skin into the wound. Use a SINGLE STROKE per swab/gauze, then discard — never reuse a swab. Hydrogen peroxide is cytotoxic to granulation tissue and is no longer recommended for routine wound cleaning. Normal saline or sterile water is the preferred irrigant.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Medical-Surgical Nursing', 'Fluid and Electrolytes',
 'A patient receiving IV fluids develops periorbital oedema, crackles at lung bases, and a bounding pulse. The nurse should suspect:',
 'Fluid volume deficit (dehydration)',
 'Hyponatraemia',
 'Fluid volume excess (hypervolaemia)',
 'Hyperkalaemia',
 'C',
 'FLUID VOLUME EXCESS (hypervolaemia/fluid overload) signs: periorbital and dependent oedema, pulmonary crackles (fluid in alveoli), bounding/full pulse, elevated BP, distended neck veins, weight gain, dyspnoea. Caused by excessive IV fluid administration, heart failure, renal failure, or cirrhosis. Management: slow or stop IV infusion, notify physician, administer diuretics as ordered, monitor I&O, daily weights, restrict sodium and fluid intake. Fluid deficit presents with dry mucous membranes, tachycardia, hypotension, and decreased skin turgor.',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── BScN — Pharmacology ─────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Pharmacology', 'Antibiotic Therapy',
 'A patient is prescribed penicillin G. Before administering the drug, the nurse''s priority action is to:',
 'Check the patient''s renal function tests',
 'Ask the patient about allergy to penicillin or cephalosporins',
 'Administer a test dose of 0.1 mL intradermally',
 'Ensure the patient has eaten before administration',
 'B',
 'Before administering any penicillin, the PRIORITY is to assess for ALLERGY HISTORY — penicillin allergy is the most common drug allergy (affects ~10% of patients). Anaphylaxis can be fatal. Ask specifically about penicillin AND cephalosporins (10% cross-reactivity). If allergic, withhold and notify the prescriber. Intradermal skin testing is not routinely done before every dose. Renal function matters for dose adjustment but is not the priority safety check. Penicillin can be given on an empty stomach.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Pharmacology', 'Anticoagulant Therapy',
 'A patient on warfarin therapy has an INR of 5.8. The nurse should:',
 'Administer the next scheduled dose and recheck INR in 24 hours',
 'Hold the warfarin dose and notify the physician',
 'Administer vitamin K 10 mg IV immediately without waiting for physician orders',
 'Double the next warfarin dose to stabilise the INR',
 'B',
 'Therapeutic INR for most indications is 2.0–3.0 (mechanical heart valves: 2.5–3.5). An INR of 5.8 is supratherapeutic — significantly elevated bleeding risk. The nurse should HOLD the warfarin dose and NOTIFY THE PHYSICIAN. The physician will decide on vitamin K administration (oral or IV depending on bleeding risk), dose adjustment, and monitoring frequency. Administering vitamin K without orders or doubling the dose are outside nursing scope. Continuing the dose with a dangerously elevated INR is unsafe.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Pharmacology', 'Digoxin Toxicity',
 'A patient on digoxin therapy reports nausea, vomiting, and seeing yellow-green halos around lights. The nurse should:',
 'Reassure the patient that these are expected side effects',
 'Administer an antiemetic and continue digoxin as prescribed',
 'Withhold the digoxin dose, check apical pulse, and notify the physician',
 'Administer atropine to counteract bradycardia',
 'C',
 'The symptoms described — nausea, vomiting, and VISUAL DISTURBANCES (yellow-green halos, blurred vision, photophobia) — are classic signs of DIGOXIN TOXICITY. Other signs: bradycardia, heart block, arrhythmias, confusion. Digoxin has a narrow therapeutic index (0.5–2.0 ng/mL). Actions: WITHHOLD the dose, check APICAL PULSE for 1 full minute (hold if <60 bpm), check serum digoxin level and electrolytes (hypokalaemia potentiates toxicity), and NOTIFY THE PHYSICIAN. Antidote for severe toxicity: Digibind (digoxin-specific antibody fragments).',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Pharmacology', 'Insulin Administration',
 'When mixing regular insulin and NPH insulin in the same syringe, the nurse should:',
 'Draw up NPH insulin first, then regular insulin',
 'Draw up regular insulin first, then NPH insulin',
 'Mix the insulins in a separate vial before drawing up',
 'Shake both vials vigorously before drawing up',
 'B',
 'The mnemonic "Clear before cloudy": draw up REGULAR (clear) insulin FIRST, then NPH (cloudy) insulin. Rationale: if NPH (which contains protamine/zinc) contaminates the regular insulin vial, it will alter the onset and duration of the regular insulin. Drawing regular first prevents this contamination. Never shake insulin vials — roll gently to mix NPH. Never mix insulin glargine (Lantus) or detemir with other insulins. Verify the correct type, dose, and expiry before administration.',
 'easy', 'approved', NULL, 'Paper 1');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Pharmacology', 'Opioid Analgesics',
 'A patient receiving morphine for post-operative pain has a respiratory rate of 8 breaths per minute and is difficult to rouse. The nurse should:',
 'Administer the next scheduled morphine dose and monitor closely',
 'Administer naloxone (Narcan) as per protocol and notify the physician',
 'Reposition the patient and encourage deep breathing',
 'Administer oxygen via face mask and wait for spontaneous recovery',
 'B',
 'Respiratory rate <12 breaths/min with decreased level of consciousness indicates OPIOID-INDUCED RESPIRATORY DEPRESSION — a life-threatening emergency. NALOXONE (Narcan) is the specific opioid antagonist: 0.4–2 mg IV/IM/SC, repeat every 2–3 minutes as needed (max 10 mg). It reverses respiratory depression, sedation, and analgesia. Notify the physician immediately. Withhold further opioids. Monitor closely — naloxone has a shorter half-life than most opioids, so re-sedation can occur. Oxygen alone is insufficient for opioid-induced apnoea.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Pharmacology', 'Antihypertensive Drugs',
 'A patient is prescribed enalapril (an ACE inhibitor) for hypertension. The nurse should monitor for which common side effect?',
 'Hyperkalaemia and dry persistent cough',
 'Hypokalaemia and peripheral oedema',
 'Bradycardia and constipation',
 'Hyperglycaemia and weight gain',
 'A',
 'ACE inhibitors (enalapril, lisinopril, ramipril) block angiotensin-converting enzyme, reducing angiotensin II and aldosterone. Key side effects: (1) DRY PERSISTENT COUGH — due to bradykinin accumulation (occurs in 10–15% of patients; if intolerable, switch to ARB); (2) HYPERKALAEMIA — aldosterone reduction decreases potassium excretion; (3) first-dose hypotension; (4) angioedema (rare but serious — stop immediately). Contraindicated in pregnancy (teratogenic — causes fetal renal dysgenesis). Monitor renal function and potassium levels.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── BScN — Mental Health Nursing ────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Mental Health Nursing', 'Schizophrenia',
 'A patient with schizophrenia tells the nurse "The television is sending me special messages." This is an example of:',
 'Auditory hallucination',
 'Delusion of reference',
 'Thought broadcasting',
 'Illusion',
 'B',
 'A DELUSION OF REFERENCE is the false belief that external events, objects, or people have special personal significance directed at oneself (e.g., TV/radio broadcasts contain personal messages). This is a positive symptom of schizophrenia. An AUDITORY HALLUCINATION is hearing voices without external stimulus. THOUGHT BROADCASTING is the belief that one''s thoughts are being transmitted to others. An ILLUSION is a misperception of a real external stimulus. Delusions of reference are common in schizophrenia and paranoid disorders.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Mental Health Nursing', 'Therapeutic Communication',
 'A patient says "I feel like nobody cares about me." The most therapeutic nursing response is:',
 '"Don''t worry, we all care about you here."',
 '"You shouldn''t feel that way — you have family who loves you."',
 '"Tell me more about what makes you feel that way."',
 '"I understand exactly how you feel."',
 'C',
 'Therapeutic communication techniques: OPEN-ENDED QUESTIONS and EXPLORING encourage the patient to elaborate and feel heard. "Tell me more about..." is an open invitation that validates the patient''s experience and gathers more information. Option A is false reassurance (dismisses feelings). Option B is minimising/advising (invalidates feelings). Option D is a cliché ("I understand exactly") — the nurse cannot truly know the patient''s experience. The goal is to create a safe space for the patient to express themselves without judgment.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Mental Health Nursing', 'Suicide Risk Assessment',
 'When assessing a patient for suicide risk, the nurse should ask:',
 'Avoid asking about suicide directly as it may plant the idea',
 '"Are you having thoughts of harming yourself or ending your life?"',
 '"You wouldn''t do anything silly, would you?"',
 '"Do you feel sad sometimes?"',
 'B',
 'Asking directly about suicide does NOT increase risk — research consistently shows it does not plant the idea and often provides relief to the patient. Direct, non-judgmental questioning is the standard of care: "Are you thinking about suicide?" or "Are you having thoughts of harming yourself or ending your life?" This opens the conversation, allows risk stratification (ideation → plan → means → intent), and enables appropriate intervention. Vague questions (option D) miss the assessment. Dismissive phrasing (option C) is non-therapeutic.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Mental Health Nursing', 'Antipsychotic Medications',
 'A patient on haloperidol develops muscle rigidity, hyperthermia (40.2°C), altered consciousness, and autonomic instability. The nurse should suspect:',
 'Tardive dyskinesia',
 'Acute dystonia',
 'Neuroleptic malignant syndrome',
 'Extrapyramidal side effects',
 'C',
 'NEUROLEPTIC MALIGNANT SYNDROME (NMS) is a rare but life-threatening reaction to antipsychotics (especially high-potency typical antipsychotics like haloperidol). Classic tetrad: MUSCLE RIGIDITY (lead-pipe), HYPERTHERMIA (>38°C), ALTERED CONSCIOUSNESS, AUTONOMIC INSTABILITY (labile BP, tachycardia, diaphoresis). Mortality 10–20% if untreated. Management: STOP the antipsychotic immediately, supportive care (cooling, IV fluids), dantrolene (muscle relaxant), bromocriptine (dopamine agonist). Tardive dyskinesia is a late-onset movement disorder. Acute dystonia is muscle spasm, not hyperthermia.',
 'hard', 'approved', NULL, 'Paper 1');

-- ─── BScN — Community Health Nursing ─────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Community Health Nursing', 'Epidemiology',
 'The incidence rate of a disease measures:',
 'The total number of existing cases in a population at a given time',
 'The number of new cases occurring in a population over a specified time period',
 'The proportion of people who die from a disease among those who have it',
 'The probability of developing a disease given exposure to a risk factor',
 'B',
 'INCIDENCE RATE = number of NEW cases of a disease in a defined population over a specified time period / population at risk × 1,000 (or 100,000). It measures the RATE OF OCCURRENCE of new disease. PREVALENCE measures existing cases (both new and old) at a point in time or over a period. CASE FATALITY RATE is deaths among cases. RELATIVE RISK is the probability of disease given exposure vs. non-exposure. Incidence is used to study disease causation; prevalence is used for health service planning.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Community Health Nursing', 'Immunisation',
 'The cold chain in immunisation refers to:',
 'The process of freezing vaccines to extend their shelf life',
 'The system of maintaining vaccines at recommended temperatures from manufacture to administration',
 'The use of cold compresses at the injection site to reduce pain',
 'The refrigeration of vaccines after opening the vial',
 'B',
 'The COLD CHAIN is the system of storage and transport that maintains vaccines at the correct temperature (typically +2°C to +8°C for most vaccines; some like OPV can be frozen) from the point of manufacture to the point of administration. A break in the cold chain can render vaccines ineffective. Components: refrigerators, cold boxes, vaccine carriers, ice packs, temperature monitoring devices (VVM — vaccine vial monitors). The cold chain is critical for the Kenya Expanded Programme on Immunisation (KEPI).',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Community Health Nursing', 'Health Promotion',
 'Primary prevention in community health nursing refers to:',
 'Early detection and treatment of disease before symptoms appear',
 'Rehabilitation and restoration of function after illness',
 'Actions taken to prevent the occurrence of disease before it develops',
 'Screening programmes to identify disease in asymptomatic individuals',
 'C',
 'Levels of prevention (Leavell and Clark): PRIMARY PREVENTION — actions taken BEFORE disease occurs to prevent its development (health promotion, specific protection): immunisation, health education, sanitation, condom use, fluoridation. SECONDARY PREVENTION — early detection and treatment (screening, case finding): Pap smears, mammography, BP screening. TERTIARY PREVENTION — rehabilitation and limiting disability after disease is established: physiotherapy, support groups, prosthetics. Screening (option D) is secondary prevention.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Community Health Nursing', 'HIV/AIDS',
 'The Window Period in HIV infection refers to:',
 'The period between HIV exposure and the development of AIDS',
 'The time between HIV infection and when antibodies become detectable by standard tests',
 'The period during which antiretroviral therapy is most effective',
 'The time between HIV diagnosis and initiation of treatment',
 'B',
 'The HIV WINDOW PERIOD is the time between HIV infection and when the immune system produces enough antibodies to be detected by standard HIV antibody tests (ELISA/rapid tests) — typically 3–12 weeks (average 23–90 days). During this period, the person is HIGHLY INFECTIOUS (high viral load) but tests HIV-NEGATIVE. Fourth-generation tests (p24 antigen + antibody) reduce the window to ~18 days. NAT (nucleic acid testing) can detect HIV RNA within 10–12 days. Patients should be counselled about the window period and retested if recent exposure is suspected.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── BScN — Anatomy & Physiology ─────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Cardiac Physiology',
 'The cardiac output is calculated as:',
 'Heart rate × stroke volume',
 'Systolic pressure × diastolic pressure',
 'Stroke volume / heart rate',
 'Blood pressure / peripheral resistance',
 'A',
 'CARDIAC OUTPUT (CO) = HEART RATE (HR) × STROKE VOLUME (SV). Normal CO at rest: 4–8 L/min (average 5 L/min). HR: 60–100 bpm; SV: 60–100 mL/beat. Factors affecting SV: preload (venous return — Frank-Starling law), afterload (peripheral resistance), and contractility (inotropic state). CO increases during exercise, pregnancy, fever, and anaemia. Decreased in heart failure, hypovolaemia, and cardiogenic shock. Blood pressure = CO × Total Peripheral Resistance.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Anatomy & Physiology', 'Respiratory Physiology',
 'The normal partial pressure of oxygen (PaO2) in arterial blood is:',
 '35–45 mmHg',
 '80–100 mmHg',
 '45–60 mmHg',
 '60–80 mmHg',
 'B',
 'Normal arterial blood gas values: PaO2 = 80–100 mmHg (10.6–13.3 kPa); PaCO2 = 35–45 mmHg; pH = 7.35–7.45; HCO3 = 22–26 mEq/L; SaO2 = 95–100%. PaO2 <80 mmHg = hypoxaemia; <60 mmHg = significant hypoxaemia requiring supplemental oxygen. PaCO2 35–45 mmHg is the normal range for carbon dioxide. The oxygen-haemoglobin dissociation curve shows that at PaO2 60 mmHg, SaO2 is ~90% (the "shoulder" of the curve — below this, saturation drops steeply).',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Anatomy & Physiology', 'Renal Physiology',
 'The glomerular filtration rate (GFR) in a healthy adult is approximately:',
 '25 mL/min',
 '60 mL/min',
 '125 mL/min',
 '200 mL/min',
 'C',
 'Normal GFR in a healthy adult is approximately 125 mL/min (180 L/day). Of this, 99% is reabsorbed, producing ~1.5 L of urine per day. GFR is the best overall measure of kidney function. CKD staging by GFR: Stage 1 ≥90, Stage 2 60–89, Stage 3a 45–59, Stage 3b 30–44, Stage 4 15–29, Stage 5 (kidney failure) <15 mL/min. GFR is estimated clinically using serum creatinine, age, sex, and race (eGFR — CKD-EPI or MDRD equations). GFR declines with age (~1 mL/min/year after age 40).',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── BScN — Critical Care Nursing ────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Critical Care Nursing', 'Shock',
 'A patient in hypovolaemic shock has a BP of 80/50 mmHg, HR of 130 bpm, and cold clammy skin. The priority nursing intervention is:',
 'Administer dopamine infusion to raise blood pressure',
 'Establish large-bore IV access and administer IV fluid resuscitation',
 'Insert a urinary catheter to monitor urine output',
 'Administer oxygen via nasal cannula at 2 L/min',
 'B',
 'Hypovolaemic shock results from loss of circulating volume (haemorrhage, dehydration, burns). Priority: RESTORE CIRCULATING VOLUME — establish TWO large-bore IV cannulae (14–16 gauge) and administer IV FLUID RESUSCITATION (crystalloids: 0.9% NaCl or Hartmann''s solution, 1–2 L bolus in adults; blood products for haemorrhagic shock). Simultaneously: high-flow oxygen (not 2 L/min — use 15 L/min via non-rebreather mask), identify and treat the cause. Vasopressors (dopamine) are used only after adequate volume replacement. Urinary catheter is important for monitoring but is not the priority.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Critical Care Nursing', 'Mechanical Ventilation',
 'A patient on mechanical ventilation has a high-pressure alarm sounding. The nurse should first:',
 'Increase the tidal volume setting',
 'Assess the patient and check for causes such as secretions, biting the tube, or pneumothorax',
 'Sedate the patient to reduce airway resistance',
 'Decrease the respiratory rate on the ventilator',
 'B',
 'HIGH-PRESSURE ALARM on a ventilator indicates increased resistance to airflow or decreased lung compliance. Causes: SECRETIONS in the airway (most common — suction), patient BITING the ETT (insert bite block), BRONCHOSPASM (administer bronchodilator), PNEUMOTHORAX (assess breath sounds, prepare for chest drain), coughing/fighting the ventilator, kinked tubing, water in circuit. The nurse should ASSESS THE PATIENT FIRST (airway, breathing, circulation), then systematically check the circuit. Never increase tidal volume when pressure is already high — this risks barotrauma.',
 'hard', 'approved', NULL, 'Paper 1');

-- ─── BScN — Surgical Nursing ─────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Surgical Nursing', 'Pre-operative Care',
 'A patient is scheduled for elective surgery under general anaesthesia. The nurse should ensure the patient has been nil by mouth (NBO) for:',
 '2 hours for solids and 2 hours for clear fluids',
 '6 hours for solids and 2 hours for clear fluids',
 '8 hours for solids and 4 hours for clear fluids',
 '12 hours for all food and fluids',
 'B',
 'Current anaesthesia guidelines (ASA, AAGBI): SOLIDS (including milk, non-clear fluids) — minimum 6 HOURS before elective surgery; CLEAR FLUIDS (water, black tea/coffee without milk, clear juice) — minimum 2 HOURS. This reduces aspiration risk (Mendelson''s syndrome) while avoiding prolonged dehydration. Chewing gum and sweets are treated as solids. Emergency surgery may proceed with a full stomach using rapid sequence induction (RSI) with cricoid pressure. The old "nil from midnight" rule is outdated and unnecessarily restrictive.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Surgical Nursing', 'Post-operative Care',
 'In the immediate post-operative period, the nurse''s priority assessment is:',
 'Pain level using a numeric rating scale',
 'Airway patency, breathing, and circulation',
 'Level of consciousness and orientation',
 'Wound site for bleeding and drainage',
 'B',
 'Post-operative priority follows the ABC framework: AIRWAY (is it patent? — risk of obstruction from tongue, secretions, laryngospasm after extubation), BREATHING (rate, depth, SpO2 — risk of respiratory depression from anaesthetic agents/opioids), CIRCULATION (BP, HR, skin colour — risk of haemorrhage, hypotension). This is the PACU (Post-Anaesthesia Care Unit) primary survey. Pain, consciousness, and wound assessment are important but come after ensuring the patient is breathing and haemodynamically stable.',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Surgical Nursing', 'Wound Complications',
 'A patient on day 5 post-abdominal surgery reports a sudden "popping" sensation and the nurse observes loops of bowel protruding through the wound. The nurse should:',
 'Push the bowel back into the wound and apply a firm dressing',
 'Cover the wound with sterile saline-soaked gauze and notify the surgeon immediately',
 'Apply a dry sterile dressing and reassure the patient',
 'Irrigate the wound with antiseptic solution and apply a pressure dressing',
 'B',
 'WOUND DEHISCENCE with EVISCERATION (bowel protruding through the wound) is a surgical emergency. Nursing actions: (1) STAY CALM and reassure the patient; (2) COVER the exposed bowel with STERILE SALINE-SOAKED GAUZE (keeps bowel moist and prevents desiccation/necrosis — never use dry dressings); (3) NOTIFY THE SURGEON IMMEDIATELY for emergency return to theatre; (4) keep the patient supine with knees slightly flexed to reduce tension; (5) establish IV access, prepare for surgery. NEVER push bowel back — risk of contamination and injury.',
 'hard', 'approved', NULL, 'Paper 1');

-- ─── BScN — Infection Prevention & Control ───────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Infection Prevention & Control', 'Hand Hygiene',
 'According to WHO''s "5 Moments for Hand Hygiene," hand hygiene should be performed:',
 'Only before and after patient contact',
 'Before patient contact, before aseptic tasks, after body fluid exposure, after patient contact, and after contact with patient surroundings',
 'Before and after every procedure, and after removing gloves',
 'Only when hands are visibly soiled',
 'B',
 'WHO''s 5 MOMENTS FOR HAND HYGIENE: (1) BEFORE patient contact; (2) BEFORE aseptic/clean procedures; (3) AFTER body fluid exposure risk; (4) AFTER patient contact; (5) AFTER contact with patient surroundings. Alcohol-based hand rub (ABHR) is preferred for non-visibly soiled hands (faster, more effective against most pathogens). Soap and water is required when hands are visibly soiled, after caring for C. difficile patients (spores resist alcohol), and after using the toilet. Hand hygiene is the single most effective measure to prevent healthcare-associated infections (HAIs).',
 'easy', 'approved', NULL, 'Paper 1'),

('BScN', 'Infection Prevention & Control', 'Transmission-Based Precautions',
 'A patient with active pulmonary tuberculosis requires which type of isolation precautions?',
 'Contact precautions',
 'Droplet precautions',
 'Airborne precautions',
 'Standard precautions only',
 'C',
 'AIRBORNE PRECAUTIONS are required for diseases transmitted by airborne particles (<5 microns) that remain suspended in air for long distances: TUBERCULOSIS (Mycobacterium tuberculosis), measles, varicella (chickenpox), disseminated herpes zoster. Requirements: NEGATIVE PRESSURE ROOM (air exhausted outside or HEPA-filtered), N95 RESPIRATOR (not surgical mask) for healthcare workers, door kept closed. DROPLET precautions (surgical mask, private room) are for larger droplets (>5 microns): influenza, meningitis, pertussis. CONTACT precautions are for direct/indirect contact transmission: MRSA, C. difficile, scabies.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── BScN — Research & Evidence-Based Practice ───────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Research & Evidence-Based Practice', 'Research Methodology',
 'In a randomised controlled trial (RCT), the purpose of randomisation is to:',
 'Ensure the sample size is large enough to detect a difference',
 'Eliminate bias by ensuring each participant has an equal chance of being assigned to any group',
 'Allow participants to choose their preferred treatment group',
 'Ensure the study results can be generalised to the entire population',
 'B',
 'RANDOMISATION in an RCT ensures that each participant has an EQUAL PROBABILITY of being assigned to the intervention or control group. This distributes both known and UNKNOWN confounding variables equally between groups, eliminating SELECTION BIAS and making the groups comparable at baseline. It is the gold standard for establishing causality. Blinding (single/double) reduces performance and detection bias. Sample size calculation ensures adequate POWER to detect a clinically meaningful difference. Generalisability (external validity) depends on the study population, not randomisation.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Research & Evidence-Based Practice', 'Evidence Levels',
 'Which of the following represents the highest level of evidence in the hierarchy of evidence?',
 'Expert opinion and clinical experience',
 'Randomised controlled trial (RCT)',
 'Systematic review and meta-analysis of RCTs',
 'Cohort study',
 'C',
 'The HIERARCHY OF EVIDENCE (from highest to lowest): (1) SYSTEMATIC REVIEW/META-ANALYSIS of multiple RCTs — synthesises all available high-quality evidence; (2) Individual RCT; (3) Cohort study (prospective/retrospective); (4) Case-control study; (5) Cross-sectional study; (6) Case series/case report; (7) Expert opinion/clinical experience. Systematic reviews and meta-analyses are at the apex because they pool data from multiple RCTs, increasing statistical power and reducing the impact of individual study biases. This hierarchy guides evidence-based practice (EBP).',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── BScN — Professional Ethics & Law ────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Professional Ethics & Law', 'Informed Consent',
 'For a patient''s consent to a surgical procedure to be legally valid, it must be:',
 'Signed by the patient''s next of kin',
 'Given voluntarily by a competent patient who has received adequate information',
 'Obtained by the nurse before the surgeon explains the procedure',
 'Documented in the patient''s notes without a signature',
 'B',
 'Valid INFORMED CONSENT requires three elements: (1) COMPETENCE — the patient must have decision-making capacity (understand information, appreciate consequences, reason, and communicate a choice); (2) INFORMATION — adequate disclosure of the procedure, risks, benefits, alternatives, and consequences of refusal; (3) VOLUNTARINESS — free from coercion or undue influence. The SURGEON/PHYSICIAN performing the procedure is responsible for obtaining consent (not the nurse, though nurses can witness). Consent from next of kin is only valid when the patient lacks capacity. Written documentation is best practice.',
 'medium', 'approved', NULL, 'Paper 1'),

('BScN', 'Professional Ethics & Law', 'Nursing Ethics',
 'The ethical principle of non-maleficence means:',
 'Doing good and acting in the patient''s best interest',
 'Respecting the patient''s right to make their own decisions',
 'Treating all patients fairly and equally',
 'Avoiding actions that cause harm to the patient',
 'D',
 'The four principles of biomedical ethics (Beauchamp and Childress): AUTONOMY — respect for the patient''s right to self-determination; BENEFICENCE — doing good, acting in the patient''s best interest; NON-MALEFICENCE — "first, do no harm" (primum non nocere) — avoiding actions that cause unnecessary harm; JUSTICE — fair distribution of resources and equal treatment. Non-maleficence guides decisions about risk-benefit analysis, medication safety, and avoiding unnecessary procedures. It is distinct from beneficence (doing good) — sometimes doing nothing is less harmful than intervening.',
 'easy', 'approved', NULL, 'Paper 1');

-- =============================================================================
-- SECTION B — KRCHN QUESTIONS
-- =============================================================================

-- ─── KRCHN — Medical-Surgical Nursing ────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
 'A patient with asthma is having an acute attack. The nurse should administer:',
 'Oral prednisolone as the first-line treatment',
 'Salbutamol (albuterol) via nebuliser or inhaler as the first-line bronchodilator',
 'Aminophylline IV as the first-line treatment',
 'Ipratropium bromide alone as the first-line treatment',
 'B',
 'In acute asthma, SHORT-ACTING BETA-2 AGONISTS (SABA) — SALBUTAMOL (albuterol) — are the FIRST-LINE bronchodilator. Administer via metered-dose inhaler (MDI) with spacer (2–4 puffs every 20 minutes for 3 doses) or nebuliser (2.5–5 mg). Add ipratropium bromide (anticholinergic) for moderate-severe attacks. Systemic corticosteroids (prednisolone oral or hydrocortisone IV) are given early to reduce airway inflammation but take 4–6 hours to work. Aminophylline is a third-line agent for severe/life-threatening asthma. Oxygen to maintain SpO2 94–98%.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Disorders',
 'A patient with heart failure is prescribed furosemide. The nurse should monitor for which electrolyte imbalance?',
 'Hyperkalaemia',
 'Hypernatraemia',
 'Hypokalaemia',
 'Hypercalcaemia',
 'C',
 'FUROSEMIDE is a loop diuretic that inhibits the Na-K-2Cl cotransporter in the thick ascending limb of the loop of Henle, causing excretion of sodium, potassium, chloride, and water. The most important electrolyte to monitor is POTASSIUM — furosemide causes HYPOKALAEMIA (K+ <3.5 mmol/L). Hypokalaemia potentiates digoxin toxicity and causes cardiac arrhythmias, muscle weakness, and cramps. Management: potassium-rich diet (bananas, oranges, potatoes), potassium supplements, or potassium-sparing diuretics (spironolactone). Also monitor sodium, magnesium, and renal function.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
 'A patient with peptic ulcer disease is prescribed omeprazole. The mechanism of action of this drug is:',
 'It neutralises gastric acid in the stomach',
 'It blocks H2 receptors on parietal cells to reduce acid secretion',
 'It inhibits the proton pump (H+/K+ ATPase) on parietal cells',
 'It coats the ulcer to protect it from acid',
 'C',
 'OMEPRAZOLE is a PROTON PUMP INHIBITOR (PPI). It irreversibly inhibits the H+/K+ ATPase (proton pump) on the luminal surface of gastric parietal cells — the final common pathway of acid secretion. This produces the most potent and sustained acid suppression of any drug class. PPIs are first-line for peptic ulcer disease, GORD, H. pylori eradication (triple therapy), and Zollinger-Ellison syndrome. H2 blockers (ranitidine, famotidine) block histamine H2 receptors. Antacids (magnesium hydroxide) neutralise existing acid. Sucralfate coats the ulcer.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Medical-Surgical Nursing', 'Urinary Disorders',
 'A patient with a urinary tract infection (UTI) is prescribed trimethoprim. The nurse should advise the patient to:',
 'Take the medication with antacids to reduce stomach upset',
 'Complete the full course of antibiotics even if symptoms resolve',
 'Stop the medication as soon as symptoms improve',
 'Take the medication only when symptoms are severe',
 'B',
 'Antibiotic adherence is critical: patients must COMPLETE THE FULL COURSE of antibiotics even when symptoms resolve (usually within 1–2 days). Stopping early allows surviving bacteria (which may be more resistant) to multiply, causing relapse and contributing to antibiotic resistance. For uncomplicated UTI in women, trimethoprim is typically prescribed for 3–7 days. Advise: take at regular intervals, drink plenty of fluids, avoid sexual intercourse until treatment is complete, and return if symptoms worsen or do not resolve within 48 hours.',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Pharmacology ─────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Pharmacology', 'Drug Calculations',
 'A doctor orders amoxicillin 500 mg. The available stock is amoxicillin 250 mg/5 mL suspension. How many mL should the nurse administer?',
 '5 mL', '10 mL', '15 mL', '20 mL',
 'B',
 'Drug calculation: Volume to administer = (Dose required / Dose available) × Volume of stock. = (500 mg / 250 mg) × 5 mL = 2 × 5 mL = 10 mL. Always use the formula: What you WANT / What you HAVE × Volume. Double-check: 10 mL of 250 mg/5 mL suspension contains 500 mg. Verify the calculation independently, check the patient''s allergy status, and use a calibrated oral syringe for liquid medications.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Pharmacology', 'Antimalarial Drugs',
 'The recommended treatment for uncomplicated malaria in a non-pregnant adult in Kenya is:',
 'Chloroquine 600 mg stat',
 'Artemether-lumefantrine (AL) for 3 days',
 'Quinine 600 mg three times daily for 7 days',
 'Sulfadoxine-pyrimethamine (SP) single dose',
 'B',
 'Kenya Ministry of Health guidelines: ARTEMETHER-LUMEFANTRINE (AL/Coartem) is the first-line treatment for UNCOMPLICATED MALARIA in non-pregnant adults and children. Dosing: 6 doses over 3 days (0, 8, 24, 36, 48, 60 hours), taken with food or milk (fat enhances absorption). Chloroquine resistance is widespread in Kenya — no longer first-line. Quinine is reserved for severe malaria or when AL is unavailable. SP (Fansidar) is used for Intermittent Preventive Treatment in pregnancy (IPTp) — not first-line treatment. Artemisinin-based combination therapies (ACTs) are WHO-recommended globally.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Pharmacology', 'Oral Rehydration Therapy',
 'The composition of WHO standard oral rehydration salts (ORS) solution includes:',
 'Sodium chloride, potassium chloride, sodium bicarbonate, glucose',
 'Sodium chloride, potassium chloride, trisodium citrate, glucose',
 'Sodium chloride, calcium chloride, sodium bicarbonate, sucrose',
 'Sodium chloride, magnesium sulphate, trisodium citrate, glucose',
 'B',
 'WHO/UNICEF standard ORS (reduced osmolarity, 2002 formulation): SODIUM CHLORIDE 2.6 g/L, POTASSIUM CHLORIDE 1.5 g/L, TRISODIUM CITRATE 2.9 g/L (replaced sodium bicarbonate — more stable), GLUCOSE (anhydrous) 13.5 g/L. Total osmolarity: 245 mOsm/L (reduced from 311 mOsm/L — reduces stool output and vomiting). Glucose drives sodium-glucose cotransport (SGLT1) in the intestine, facilitating sodium and water absorption even during diarrhoea. ORS is the cornerstone of diarrhoea management — prevents dehydration deaths.',
 'hard', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Pharmacology', 'Oxytocin Administration',
 'When administering oxytocin for induction of labour, the nurse should monitor for:',
 'Hypotension and bradycardia',
 'Uterine hyperstimulation and fetal heart rate changes',
 'Respiratory depression and sedation',
 'Hyperglycaemia and polyuria',
 'B',
 'Oxytocin (Syntocinon) stimulates uterine contractions. Key monitoring during induction/augmentation: UTERINE ACTIVITY — contractions should not exceed 5 in 10 minutes (hyperstimulation/tachysystole); each contraction should last <90 seconds with adequate relaxation between. FETAL HEART RATE — continuous CTG monitoring for decelerations (late decelerations indicate fetal hypoxia). If hyperstimulation occurs: STOP the oxytocin infusion, position left lateral, give oxygen, notify the obstetrician. Also monitor maternal BP (oxytocin has antidiuretic effect — risk of water intoxication with high doses in large volumes of fluid).',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Community Health Nursing ────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Community Health Nursing', 'Immunisation Schedule',
 'According to the Kenya Expanded Programme on Immunisation (KEPI), the pentavalent vaccine given at 6, 10, and 14 weeks protects against:',
 'Diphtheria, tetanus, pertussis, hepatitis B, and Haemophilus influenzae type b',
 'Diphtheria, tetanus, pertussis, polio, and measles',
 'Tetanus, hepatitis B, Haemophilus influenzae, meningococcus, and pneumococcus',
 'Diphtheria, tetanus, pertussis, rotavirus, and hepatitis B',
 'A',
 'The PENTAVALENT VACCINE (DTP-HepB-Hib) protects against FIVE diseases: DIPHTHERIA, TETANUS, PERTUSSIS (whooping cough), HEPATITIS B, and HAEMOPHILUS INFLUENZAE TYPE B (Hib — causes meningitis and pneumonia). Given at 6, 10, and 14 weeks in Kenya. The KEPI schedule also includes: BCG and OPV0 at birth; OPV1-3 and PCV1-3 at 6, 10, 14 weeks; IPV at 14 weeks; Rotavirus vaccine at 6 and 10 weeks; Measles-Rubella at 9 months and 18 months; Yellow fever at 9 months (in endemic areas).',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Community Health Nursing', 'Water and Sanitation',
 'The most effective method of water purification at household level in a resource-limited setting is:',
 'Filtration through a cloth',
 'Boiling for at least 1 minute',
 'Adding a pinch of salt',
 'Allowing water to settle for 24 hours',
 'B',
 'BOILING is the most reliable household water treatment method — kills ALL pathogens (bacteria, viruses, protozoa including Cryptosporidium and Giardia cysts) when water is brought to a ROLLING BOIL for at least 1 minute (3 minutes at altitudes >2,000 m). Other household water treatment options: chlorination (sodium hypochlorite — effective against bacteria and viruses but not Cryptosporidium), solar disinfection (SODIS — 6 hours in clear PET bottles in sunlight), ceramic filtration. Cloth filtration removes only large particles. Settling removes suspended solids but not pathogens.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Community Health Nursing', 'Tuberculosis Control',
 'The DOTS strategy for tuberculosis control stands for:',
 'Direct Observation Treatment Short-course',
 'Drug Oriented Treatment Strategy',
 'Directly Observed Therapy Short-course',
 'Disease Oriented Treatment Supervision',
 'C',
 'DOTS = DIRECTLY OBSERVED THERAPY SHORT-COURSE. The five components of the WHO DOTS strategy: (1) Government commitment to TB control; (2) Case detection by quality sputum smear microscopy; (3) Standardised short-course chemotherapy (6 months) under DIRECT OBSERVATION — a health worker or trained community member watches the patient swallow each dose; (4) Regular uninterrupted supply of quality anti-TB drugs; (5) Recording and reporting system for programme monitoring. Direct observation prevents treatment interruption and reduces drug resistance. Kenya uses the NTLD (National TB and Lung Disease) programme.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Community Health Nursing', 'Nutrition',
 'A child with bilateral pitting oedema, moon face, and sparse, discoloured hair is most likely suffering from:',
 'Marasmus',
 'Kwashiorkor',
 'Marasmic-kwashiorkor',
 'Vitamin A deficiency',
 'B',
 'KWASHIORKOR is severe acute malnutrition (SAM) caused primarily by PROTEIN DEFICIENCY (with relatively adequate caloric intake). Classic features: BILATERAL PITTING OEDEMA (from hypoalbuminaemia — reduced oncotic pressure), MOON FACE (facial oedema), SKIN CHANGES (flaky paint dermatosis, hyperpigmentation), HAIR CHANGES (sparse, straight, discoloured — flag sign), HEPATOMEGALY (fatty liver), misery/apathy. MARASMUS is severe caloric deficiency — wasted, "skin and bones," no oedema. MARASMIC-KWASHIORKOR has features of both. Treatment: F-75 then F-100 therapeutic feeds, RUTF (Ready-to-Use Therapeutic Food).',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Maternal & Child Health ─────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Maternal & Child Health', 'Antenatal Care',
 'The recommended minimum number of antenatal visits for a low-risk pregnancy according to WHO 2016 guidelines is:',
 '4 visits', '6 visits', '8 visits', '12 visits',
 'C',
 'The WHO 2016 ANC model recommends a MINIMUM OF 8 CONTACTS for a positive pregnancy experience (replacing the older 4-visit focused ANC model). Contacts at: <12 weeks, 20 weeks, 26 weeks, 30 weeks, 34 weeks, 36 weeks, 38 weeks, and 40 weeks. Each contact includes clinical assessment, screening, health promotion, and supportive care. Kenya MoH has adopted this model. More contacts allow earlier detection of complications, better birth preparedness, and improved maternal and neonatal outcomes.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Maternal & Child Health', 'Immunisation',
 'The vaccine given to a pregnant woman to protect her newborn against neonatal tetanus is:',
 'BCG', 'Tetanus toxoid (TT)', 'DTP', 'Hepatitis B',
 'B',
 'TETANUS TOXOID (TT) is given to pregnant women to protect both the mother and the newborn against tetanus. Maternal antibodies (IgG) cross the placenta and protect the neonate during the vulnerable neonatal period. Kenya MoH schedule: TT1 at first ANC contact, TT2 at least 4 weeks later, TT3 at least 6 months after TT2, TT4 at least 1 year after TT3, TT5 at least 1 year after TT4 (provides lifelong protection). Neonatal tetanus (tetanus neonatorum) results from contaminated cord cutting — a major cause of neonatal mortality in low-income settings.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Maternal & Child Health', 'Growth Monitoring',
 'When plotting a child''s weight on a growth chart, a weight-for-age below -3 SD (Z-score) indicates:',
 'Normal growth', 'Mild underweight', 'Moderate underweight', 'Severe underweight',
 'D',
 'WHO Child Growth Standards Z-score interpretation for weight-for-age: Above -2 SD = NORMAL; Between -2 and -3 SD = MODERATE UNDERWEIGHT; Below -3 SD = SEVERE UNDERWEIGHT (also called severe acute malnutrition when combined with MUAC <11.5 cm or bilateral oedema). Growth monitoring using the Road to Health booklet (Kenya) plots weight monthly. Faltering growth (crossing centile lines downward) requires investigation and intervention. MUAC (mid-upper arm circumference) <11.5 cm in children 6–59 months = severe acute malnutrition.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Maternal & Child Health', 'Breastfeeding',
 'The World Health Organization recommends exclusive breastfeeding for:',
 '3 months', '4 months', '6 months', '12 months',
 'C',
 'WHO and UNICEF recommend EXCLUSIVE BREASTFEEDING for the first 6 MONTHS of life — no other food, water, or liquids (except oral rehydration salts, vitamins, or medicines when medically indicated). After 6 months, introduce nutritionally adequate complementary foods while continuing breastfeeding up to 2 years or beyond. Benefits of exclusive breastfeeding: optimal nutrition, passive immunity (IgA, lactoferrin), reduced risk of diarrhoea, pneumonia, otitis media, SIDS, obesity, and diabetes. Breastfeeding also benefits the mother (uterine involution, reduced breast/ovarian cancer risk, natural child spacing).',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Mental Health Nursing ───────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Mental Health Nursing', 'Anxiety Disorders',
 'A patient with a panic attack presents with palpitations, shortness of breath, chest tightness, and fear of dying. The nurse''s priority intervention is:',
 'Administer diazepam 10 mg IV immediately',
 'Stay with the patient, speak calmly, and guide slow deep breathing',
 'Leave the patient alone in a quiet room to calm down',
 'Administer oxygen at 10 L/min via non-rebreather mask',
 'B',
 'Panic attacks are intense episodes of fear with physical symptoms (palpitations, dyspnoea, chest pain, dizziness, paraesthesia, depersonalisation) that peak within 10 minutes. Priority nursing interventions: STAY WITH THE PATIENT (presence reduces fear), SPEAK CALMLY and reassuringly, GUIDE CONTROLLED BREATHING (slow diaphragmatic breathing — 4 seconds in, hold 2, 6 seconds out — reduces hyperventilation and CO2 washout that worsens symptoms). Reassure the patient they are not dying. Benzodiazepines are used for severe/refractory cases, not as first-line. Leaving the patient alone worsens anxiety.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Mental Health Nursing', 'Depression',
 'A patient with major depressive disorder is started on fluoxetine (an SSRI). The nurse should counsel the patient that:',
 'The full antidepressant effect is felt within 24–48 hours',
 'The medication should be stopped immediately if side effects occur',
 'It may take 2–4 weeks before the full therapeutic effect is noticed',
 'The medication can be taken only when feeling depressed',
 'C',
 'SSRIs (fluoxetine, sertraline, escitalopram) are first-line antidepressants. Key patient education: (1) DELAYED ONSET — therapeutic effect takes 2–4 WEEKS (sometimes up to 6–8 weeks for full effect) — patients must be counselled not to stop early thinking it is not working; (2) SUICIDE RISK — monitor closely in the first 2 weeks, especially in adolescents (SSRIs can initially increase energy before mood lifts, potentially enabling suicidal plans); (3) SIDE EFFECTS — nausea, insomnia, sexual dysfunction (usually transient); (4) DO NOT STOP ABRUPTLY — taper to avoid discontinuation syndrome; (5) Take daily, not PRN.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Mental Health Nursing', 'Substance Use',
 'A patient in alcohol withdrawal develops tremors, diaphoresis, tachycardia, and seizures 24 hours after stopping alcohol. The nurse should:',
 'Administer haloperidol to control the seizures',
 'Administer a benzodiazepine (e.g., diazepam) as prescribed and monitor vital signs',
 'Restrain the patient and wait for the seizures to stop',
 'Administer naloxone to reverse the alcohol effects',
 'B',
 'ALCOHOL WITHDRAWAL SYNDROME (AWS) occurs 6–72 hours after cessation in dependent drinkers. Severity: mild (tremor, anxiety, diaphoresis, tachycardia) → moderate (hallucinations) → severe (DELIRIUM TREMENS — confusion, agitation, hyperthermia, seizures — mortality 5–15% if untreated). Treatment: BENZODIAZEPINES (diazepam, lorazepam, chlordiazepoxide) are the gold standard — they cross-react with GABA-A receptors (same as alcohol), preventing and treating seizures and delirium. Thiamine 100 mg IV/IM BEFORE glucose (prevents Wernicke''s encephalopathy). Naloxone reverses opioids, not alcohol.',
 'hard', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Paediatric Nursing ──────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Paediatric Nursing', 'IMCI',
 'According to the Integrated Management of Childhood Illness (IMCI) guidelines, a child aged 2–59 months with a respiratory rate of 50 breaths per minute should be classified as having:',
 'No pneumonia — cough or cold',
 'Fast breathing — pneumonia',
 'Severe pneumonia or very severe disease',
 'Normal breathing for age',
 'B',
 'IMCI fast breathing thresholds: <2 months: ≥60 breaths/min; 2–11 months: ≥50 breaths/min; 12–59 months: ≥40 breaths/min. A child aged 2–59 months with RR 50 breaths/min meets the threshold for FAST BREATHING → classified as PNEUMONIA. Treatment: oral amoxicillin for 5 days, follow up in 2 days. SEVERE PNEUMONIA signs: chest indrawing, stridor at rest, inability to drink/breastfeed, convulsions, abnormally sleepy → refer urgently, give first dose of IM/IV antibiotic. No fast breathing + no chest indrawing = no pneumonia (cough or cold — symptomatic treatment only).',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Paediatric Nursing', 'Diarrhoea Management',
 'A 10-month-old child with diarrhoea has sunken eyes, a very dry mouth, and is not able to drink. This child should be classified as having:',
 'No dehydration',
 'Some dehydration',
 'Severe dehydration',
 'Mild dehydration',
 'C',
 'IMCI dehydration classification: NO DEHYDRATION — no signs; SOME DEHYDRATION — two or more of: restless/irritable, sunken eyes, drinks eagerly/thirsty, skin pinch goes back slowly; SEVERE DEHYDRATION — two or more of: lethargic/unconscious, sunken eyes, NOT ABLE TO DRINK or drinks poorly, skin pinch goes back very slowly (>2 seconds). This child has sunken eyes + unable to drink = SEVERE DEHYDRATION. Treatment: Plan C — IV Ringer''s lactate 100 mL/kg over 3 hours (infants) or 30 mL/kg in 30 min then 70 mL/kg in 2.5 hours. Reassess every 30 minutes.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Paediatric Nursing', 'Neonatal Jaundice',
 'Physiological jaundice in a term newborn typically appears:',
 'Within the first 24 hours of life',
 'Between 2–3 days of life and resolves by day 10–14',
 'After 2 weeks of life',
 'At birth and persists for 6 weeks',
 'B',
 'PHYSIOLOGICAL JAUNDICE: appears on DAY 2–3 (never in the first 24 hours — that is always pathological), peaks on day 3–5, and resolves by DAY 10–14 in term infants (up to 3 weeks in preterm). Caused by: high fetal haemoglobin breakdown, immature hepatic conjugation (low UDP-glucuronosyltransferase), increased enterohepatic circulation. Bilirubin rarely exceeds 200 µmol/L. PATHOLOGICAL jaundice: appears <24 hours (haemolytic disease — Rh/ABO incompatibility, G6PD deficiency), bilirubin rises >85 µmol/L/day, or persists >2 weeks (conjugated — investigate for biliary atresia, hypothyroidism). Treatment: phototherapy, exchange transfusion for severe cases.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Paediatric Nursing', 'Child Nutrition',
 'The recommended age for introduction of complementary foods alongside breastfeeding is:',
 '3 months', '4 months', '6 months', '9 months',
 'C',
 'WHO/UNICEF recommend introducing COMPLEMENTARY FOODS at 6 MONTHS while continuing breastfeeding. Before 6 months, the infant''s gut is immature and exclusive breastfeeding meets all nutritional needs. Starting too early increases risk of infections, allergies, and displaces breast milk. Starting too late causes growth faltering and micronutrient deficiencies. Complementary foods should be: timely (at 6 months), adequate (energy, protein, micronutrients), safe (hygienically prepared), and appropriately fed (responsive feeding). Introduce one new food at a time, starting with iron-rich foods (fortified cereals, pureed meat).',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Anatomy & Physiology ────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Anatomy & Physiology', 'Blood Groups',
 'A patient with blood group O negative can receive blood from:',
 'Any blood group',
 'O positive and O negative only',
 'O negative only',
 'O negative and AB negative only',
 'C',
 'Blood group O NEGATIVE is the UNIVERSAL DONOR for red blood cells (no A, B, or Rh antigens to trigger a reaction). However, O negative patients can only receive O NEGATIVE blood — they have anti-A, anti-B antibodies (would react to A, B, or AB blood) AND anti-D antibodies (would react to Rh-positive blood). In emergencies when blood type is unknown, O negative packed red cells are given. AB positive is the universal recipient (no antibodies against A, B, or Rh). Always crossmatch before transfusion when time allows.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Anatomy & Physiology', 'Nervous System',
 'The part of the brain responsible for coordinating voluntary movement and maintaining balance is the:',
 'Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus',
 'B',
 'CEREBELLUM (''little brain'') — located in the posterior fossa — coordinates VOLUNTARY MOVEMENT (smooth, precise), maintains BALANCE and POSTURE, and regulates MUSCLE TONE. Cerebellar damage causes: ataxia (unsteady gait), dysmetria (past-pointing), intention tremor, dysdiadochokinesia (inability to perform rapid alternating movements), nystagmus, dysarthria. CEREBRUM — higher functions (thought, speech, sensation, voluntary movement initiation). MEDULLA OBLONGATA — vital centres (breathing, heart rate, BP, swallowing). HYPOTHALAMUS — temperature regulation, hunger, thirst, circadian rhythm, hormone control.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Anatomy & Physiology', 'Digestive System',
 'The enzyme responsible for the initial digestion of starch in the mouth is:',
 'Pepsin', 'Lipase', 'Salivary amylase (ptyalin)', 'Trypsin',
 'C',
 'SALIVARY AMYLASE (ptyalin) is secreted by the parotid, submandibular, and sublingual salivary glands. It begins STARCH DIGESTION in the mouth by breaking alpha-1,4-glycosidic bonds, converting starch → dextrins → maltose. Activity continues briefly in the stomach until inactivated by gastric acid (pH <4). Pancreatic amylase continues starch digestion in the small intestine. PEPSIN (gastric) digests proteins. LIPASE (pancreatic/lingual) digests fats. TRYPSIN (pancreatic) digests proteins in the small intestine.',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Environmental Health ────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Environmental Health', 'Sanitation',
 'The most hygienic method of human waste disposal in a rural community without piped water is:',
 'Open defecation in a designated field',
 'Throwing waste into a river',
 'Use of a properly constructed pit latrine',
 'Burying waste in shallow pits near the homestead',
 'C',
 'A PROPERLY CONSTRUCTED PIT LATRINE is the recommended sanitation solution for rural areas without sewerage. Requirements: pit depth ≥3 metres (below groundwater table), slab with a hole (prevents flies and odour), superstructure for privacy, hand-washing facility nearby. Prevents faecal-oral disease transmission (cholera, typhoid, dysentery, polio, hepatitis A, intestinal worms). Open defecation contaminates soil and water sources. Shallow burial is inadequate — flies and rain can spread pathogens. The WHO/UNICEF Joint Monitoring Programme tracks sanitation access globally.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Environmental Health', 'Vector Control',
 'The most effective method of malaria prevention at community level in Kenya is:',
 'Indoor residual spraying (IRS) with DDT',
 'Use of insecticide-treated bed nets (ITNs)',
 'Prophylactic chloroquine for all community members',
 'Draining all water sources in the community',
 'B',
 'INSECTICIDE-TREATED BED NETS (ITNs) — particularly LONG-LASTING INSECTICIDAL NETS (LLINs) — are the most cost-effective and widely recommended malaria prevention tool at community level. They kill or repel Anopheles mosquitoes (which bite mainly between dusk and dawn), protecting sleeping individuals. Kenya distributes LLINs free through ANC clinics and mass campaigns. INDOOR RESIDUAL SPRAYING (IRS) is effective but more resource-intensive. Chloroquine prophylaxis is no longer recommended due to widespread resistance. Draining water sources is useful but impractical at scale.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Nutrition ───────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Nutrition', 'Micronutrient Deficiencies',
 'A child presents with night blindness and Bitot''s spots on the conjunctiva. This is characteristic of deficiency of:',
 'Vitamin C', 'Vitamin D', 'Vitamin A', 'Iron',
 'C',
 'VITAMIN A DEFICIENCY (VAD) is the leading cause of preventable childhood blindness. Clinical stages: NIGHT BLINDNESS (nyctalopia — earliest symptom, impaired rod function), BITOT''S SPOTS (foamy, cheesy white patches on the bulbar conjunctiva — pathognomonic of VAD), XEROPHTHALMIA (dry conjunctiva/cornea), CORNEAL ULCERATION, KERATOMALACIA (corneal melting — irreversible blindness). VAD also impairs immunity (increased severity of measles, diarrhoea, respiratory infections). Treatment: high-dose vitamin A supplementation (200,000 IU orally for children >12 months). Kenya provides vitamin A at 6-monthly intervals through child health days.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Nutrition', 'Therapeutic Feeding',
 'Ready-to-Use Therapeutic Food (RUTF) is used in the management of:',
 'Moderate acute malnutrition with complications',
 'Severe acute malnutrition without complications in children 6–59 months',
 'Mild underweight in children under 5',
 'Severe acute malnutrition with oedema requiring inpatient care',
 'B',
 'RUTF (e.g., Plumpy''Nut) is a lipid-based, energy-dense paste (500 kcal/92 g sachet) used for COMMUNITY-BASED MANAGEMENT OF ACUTE MALNUTRITION (CMAM) in children 6–59 months with SEVERE ACUTE MALNUTRITION (SAM) WITHOUT COMPLICATIONS (no oedema, no medical complications, appetite present). Dose: 200 kcal/kg/day. Advantages: no water needed (safe in low-hygiene settings), long shelf life, no cooking required. SAM WITH COMPLICATIONS (oedema, anorexia, medical illness) requires INPATIENT care with F-75 (stabilisation) then F-100 or RUTF (rehabilitation). Moderate acute malnutrition uses supplementary foods (RUSF).',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Surgical Nursing ────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Surgical Nursing', 'Post-operative Complications',
 'A patient who had abdominal surgery 3 days ago develops a temperature of 38.5°C, productive cough, and decreased breath sounds at the right lung base. The most likely complication is:',
 'Wound infection',
 'Deep vein thrombosis',
 'Post-operative pneumonia or atelectasis',
 'Pulmonary embolism',
 'C',
 'The "5 W''s" of post-operative fever: Wind (days 1–2: atelectasis/pneumonia), Water (days 3–5: UTI), Wound (days 5–7: wound infection), Walking (days 5+: DVT/PE), Wonder drugs (any time: drug fever). On day 3 with fever, productive cough, and decreased breath sounds at the lung base, POST-OPERATIVE PNEUMONIA or ATELECTASIS (collapsed alveoli → secondary infection) is most likely. Risk factors: general anaesthesia, abdominal/thoracic surgery, immobility, pain limiting deep breathing. Prevention: early ambulation, incentive spirometry, deep breathing exercises, adequate analgesia. Treatment: physiotherapy, antibiotics if pneumonia confirmed.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Surgical Nursing', 'Appendicitis',
 'A patient with acute appendicitis has pain that started around the umbilicus and has now shifted to the right iliac fossa. This migration of pain is due to:',
 'Spread of infection to the peritoneum',
 'Involvement of the parietal peritoneum as inflammation progresses',
 'Obstruction of the appendix lumen',
 'Rupture of the appendix',
 'B',
 'Classic appendicitis pain migration: INITIAL PAIN — periumbilical/central (visceral pain — poorly localised, transmitted via T10 visceral afferents from the appendix). As inflammation progresses and involves the PARIETAL PERITONEUM overlying the appendix, pain MIGRATES to the RIGHT ILIAC FOSSA (McBurney''s point — 1/3 of the way from the anterior superior iliac spine to the umbilicus). Parietal peritoneal pain is well-localised, sharp, and worsened by movement. Rebound tenderness (Blumberg''s sign) and guarding indicate peritoneal irritation. Rovsing''s sign: pressure in LIF causes pain in RIF.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Infection Prevention & Control ──────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Infection Prevention & Control', 'Sterilisation',
 'The most reliable method of sterilisation for heat-stable surgical instruments is:',
 'Boiling in water for 20 minutes',
 'Chemical disinfection with glutaraldehyde',
 'Autoclaving (steam under pressure)',
 'Dry heat oven at 100°C for 30 minutes',
 'C',
 'AUTOCLAVING (steam sterilisation under pressure) is the GOLD STANDARD for sterilising heat-stable items. Standard cycle: 121°C at 15 psi for 15–20 minutes (gravity displacement) or 134°C at 30 psi for 3–4 minutes (pre-vacuum). Kills ALL microorganisms including bacterial spores. Boiling (100°C) does NOT kill spores — it is high-level disinfection, not sterilisation. Glutaraldehyde 2% is high-level disinfection (kills most organisms including spores with prolonged contact ≥10 hours) — used for heat-sensitive endoscopes. Dry heat requires 160–170°C for 1–2 hours. Spaulding classification: critical items (enter sterile tissue) must be sterilised.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Infection Prevention & Control', 'Needle Stick Injury',
 'A nurse sustains a needle stick injury from a patient known to be HIV positive. The first action should be:',
 'Report to the occupational health department immediately',
 'Wash the wound thoroughly with soap and water, then report and initiate post-exposure prophylaxis (PEP)',
 'Apply antiseptic to the wound and monitor for HIV symptoms',
 'Squeeze the wound to express blood, then apply iodine',
 'B',
 'Needle stick injury management (WHO/Kenya MoH protocol): (1) IMMEDIATELY wash the wound with SOAP AND WATER for at least 15 minutes (do not squeeze or suck — increases risk); flush mucous membrane exposures with water/saline; (2) REPORT to the occupational health officer/supervisor; (3) RISK ASSESSMENT — source patient HIV status, viral load; (4) INITIATE PEP within 72 HOURS (ideally <2 hours) — tenofovir + lamivudine + lopinavir/ritonavir for 28 days; (5) Baseline HIV test, follow-up at 6 weeks, 3 months, 6 months; (6) Document the incident. PEP reduces HIV transmission risk by ~80%.',
 'medium', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Research & Statistics ──────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Research & Statistics', 'Data Collection',
 'In a research study, a questionnaire that measures the same variable consistently across different occasions is said to have:',
 'Validity', 'Reliability', 'Objectivity', 'Sensitivity',
 'B',
 'RELIABILITY refers to the CONSISTENCY or REPRODUCIBILITY of a measurement instrument — it gives the same results under the same conditions on repeated occasions (test-retest reliability) or between different raters (inter-rater reliability). VALIDITY refers to whether the instrument actually measures what it is intended to measure (content, construct, criterion validity). An instrument can be reliable without being valid (consistently measuring the wrong thing). Both reliability and validity are required for a good research instrument. Sensitivity refers to a test''s ability to correctly identify true positives.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Research & Statistics', 'Sampling',
 'In a study where every member of the population has an equal chance of being selected, the sampling method used is:',
 'Purposive sampling', 'Stratified sampling', 'Simple random sampling', 'Convenience sampling',
 'C',
 'SIMPLE RANDOM SAMPLING: every member of the population has an EQUAL and INDEPENDENT chance of being selected. Methods: lottery/ballot, random number tables, computer-generated random numbers. It is the most basic probability sampling method and minimises selection bias. STRATIFIED SAMPLING divides the population into subgroups (strata) then randomly samples from each — ensures representation of subgroups. PURPOSIVE SAMPLING selects participants based on specific characteristics (non-probability). CONVENIENCE SAMPLING selects whoever is available (non-probability — highest bias). Probability sampling methods allow generalisation to the population.',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Health Systems & Management ─────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Health Systems & Management', 'Kenya Health System',
 'The lowest level of the Kenya health system that provides the first point of contact with the community is:',
 'Level 2 — Health Centre',
 'Level 1 — Community Health Services',
 'Level 3 — Primary Hospital',
 'Level 4 — County Referral Hospital',
 'B',
 'Kenya''s health system has 6 levels: LEVEL 1 — COMMUNITY HEALTH SERVICES (Community Health Volunteers/CHVs, Community Health Units — first point of contact, health promotion, disease surveillance, referral); Level 2 — Dispensary; Level 3 — Health Centre; Level 4 — Primary/Sub-county Hospital; Level 5 — County Referral Hospital; Level 6 — National Referral Hospital (Kenyatta National Hospital, Moi Teaching and Referral Hospital). The Community Health Strategy (CHS) operationalises Level 1 through Community Health Units (CHUs) of ~5,000 people, each served by ~50 CHVs.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Health Systems & Management', 'Nursing Management',
 'The process of guiding and directing the activities of nursing staff to achieve organisational goals is called:',
 'Planning', 'Organising', 'Directing', 'Controlling',
 'C',
 'The four functions of management (Fayol): PLANNING (setting goals and determining how to achieve them), ORGANISING (arranging resources and tasks), DIRECTING/LEADING (guiding, motivating, and supervising staff to achieve goals — includes communication, delegation, supervision, motivation), CONTROLLING (monitoring performance against standards and taking corrective action). DIRECTING is the function that involves day-to-day guidance of staff. A nurse manager uses directing when assigning tasks, giving instructions, motivating staff, resolving conflicts, and providing feedback.',
 'easy', 'approved', NULL, 'Paper 1');

-- ─── KRCHN — Midwifery (additional) ──────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('KRCHN', 'Midwifery', 'Postpartum Haemorrhage',
 'The most common cause of primary postpartum haemorrhage is:',
 'Retained placenta', 'Uterine atony', 'Cervical lacerations', 'Coagulation disorders',
 'B',
 'PRIMARY PPH (blood loss ≥500 mL within 24 hours of vaginal delivery, or ≥1000 mL after caesarean section) causes — the 4 T''s: TONE (UTERINE ATONY — 70–80% of cases, most common cause), TISSUE (retained placenta/membranes — 10%), TRAUMA (lacerations of cervix, vagina, perineum — 10%), THROMBIN (coagulation disorders — rare). Uterine atony = failure of the uterus to contract after delivery. Risk factors: grand multiparity, overdistended uterus (twins, polyhydramnios, macrosomia), prolonged labour, oxytocin augmentation, general anaesthesia. Prevention: AMTSL. Treatment: uterine massage, oxytocin, ergometrine, misoprostol, bimanual compression, surgical intervention.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Midwifery', 'Pre-eclampsia',
 'The definitive treatment for severe pre-eclampsia is:',
 'Bed rest and antihypertensive therapy',
 'Magnesium sulphate infusion for 48 hours',
 'Delivery of the baby and placenta',
 'Corticosteroids to mature the fetal lungs',
 'C',
 'Pre-eclampsia is a placental disease — the only DEFINITIVE CURE is DELIVERY OF THE BABY AND PLACENTA (removal of the trophoblast). All other treatments (antihypertensives, magnesium sulphate, corticosteroids) are supportive measures to stabilise the mother and optimise fetal maturity before delivery. Delivery timing depends on gestational age and severity: severe pre-eclampsia at ≥34 weeks → deliver; <34 weeks → consider expectant management with close monitoring in a tertiary centre. Magnesium sulphate prevents/treats seizures but does not treat the underlying disease. Antihypertensives protect against stroke but do not cure pre-eclampsia.',
 'medium', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Midwifery', 'Normal Labour',
 'The first stage of labour is defined as:',
 'From the onset of regular contractions to full dilatation of the cervix',
 'From full dilatation of the cervix to delivery of the baby',
 'From delivery of the baby to delivery of the placenta',
 'From the onset of contractions to delivery of the placenta',
 'A',
 'Stages of labour: FIRST STAGE — from onset of regular uterine contractions to FULL CERVICAL DILATATION (10 cm). Divided into: latent phase (0–4 cm, slow dilatation) and active phase (4–10 cm, ≥1 cm/hour). SECOND STAGE — from full dilatation to DELIVERY OF THE BABY (pushing phase). THIRD STAGE — from delivery of the baby to DELIVERY OF THE PLACENTA AND MEMBRANES (normally within 30 minutes; active management reduces to <5 minutes). FOURTH STAGE — first 1–2 hours after delivery (monitoring for PPH). The partograph is used to monitor progress in the first stage.',
 'easy', 'approved', NULL, 'Paper 1'),

('KRCHN', 'Midwifery', 'Obstetric Emergencies',
 'When a cord prolapse is detected during labour, the nurse''s immediate action is to:',
 'Prepare the patient for immediate caesarean section',
 'Manually push the cord back into the uterus',
 'Elevate the presenting part off the cord with a gloved hand and call for help',
 'Apply a warm saline compress to the cord and wait for the obstetrician',
 'C',
 'CORD PROLAPSE management: the cord is compressed between the presenting part and the pelvis → fetal hypoxia → death within minutes. IMMEDIATE actions: (1) CALL FOR HELP (emergency team); (2) ELEVATE THE PRESENTING PART manually with a gloved hand inserted into the vagina — maintain this until delivery; (3) Position: knee-chest or Trendelenburg (gravity reduces pressure on cord); (4) Fill the bladder with 500–700 mL saline (lifts presenting part); (5) Keep the cord warm and moist (wrap in warm saline gauze — do not handle excessively); (6) EMERGENCY CAESAREAN SECTION unless vaginal delivery is imminent. Do NOT push the cord back — risk of vasospasm and injury.',
 'hard', 'approved', NULL, 'Paper 1');

-- =============================================================================
-- END OF BATCH 2 SEED
-- Total questions added:
--   BScN  : ~30 questions across 10 units
--   KRCHN : ~30 questions across 11 units
-- =============================================================================
