-- ============================================================
-- Seed 40 New High-Yield Clinical Mnemonics (NurseFiti Spec)
-- Tested and verified against standard medical/nursing references
-- ============================================================

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Insulin Types, Peaks & Onsets',
  'RN & Rapid/Long-Acting',
  'Onsets, peaks, and durations of Rapid, Regular, NPH, and Long-Acting insulins.',
  'Endocrine',
  'Pharmacology',
  ARRAY['Insulin','Diabetes','Pharmacology','Endocrine'],
  ARRAY['Rapid: 15 min onset, 1 hr peak, 3 hr duration','Regular (Short): 30 min onset, 2 hr peak, 8 hr duration','NPH (Intermediate): 2 hr onset, 8 hr peak, 16 hr duration','Long-Acting (Glargine): No peak, 24 hr duration'],
  '[{"emoji":"⚡","phrase":"Rapid (Lispro, Aspart)","meaning":"Onset 15 min, peak 1 hr, duration 3 hr. Must have food tray at bedside before injection."},{"emoji":"💧","phrase":"Regular (Short-Acting)","meaning":"Onset 30 min, peak 2 hr, duration 8 hr. ONLY insulin that can be administered intravenously (IV)."},{"emoji":"🥛","phrase":"NPH (Intermediate)","meaning":"Onset 2 hr, peak 8 hr, duration 16 hr. Cloudy appearance; highest hypoglycemia risk is at 8 hours (mid-afternoon)."},{"emoji":"⏳","phrase":"Long-Acting (Glargine/Detemir)","meaning":"No peak, duration 24 hr. Maintains steady basal level. Never mix with other insulins in the same syringe."}]'::jsonb,
  'Accurate knowledge of insulin peak times is essential to prevent severe, life-threatening hypoglycemic episodes. Patients are at the highest risk for hypoglycemia during the medication peak time.',
  ARRAY['Type 1 Diabetes Mellitus','Type 2 Diabetes Mellitus with secondary failure','Diabetic Ketoacidosis (Regular IV)','Gestational Diabetes'],
  'Questions frequently ask which insulin can be given IV: ONLY Regular insulin! When mixing Regular and NPH, remember RN: draw Regular (Clear) FIRST, then NPH (Cloudy) second to avoid contaminating the clear vial with cloudy protamine.',
  '"15 minutes feels like 1 hour during 3 rapid responses. Short-staffed nurses go from 30 to 2 to 8. Nurses Play Hero to 8-16 year olds. The lonely guy (Lantus) has no peak."',
  'Always provide a snack at the peak time of intermediate insulin (e.g., afternoon snack for morning NPH) to avoid mid-afternoon hypoglycemia.',
  '{"question":"A nurse administers 15 units of NPH insulin subcutaneously to a client at 08:00. At what time is this client at the greatest risk for a hypoglycemic reaction?","options":["A. 09:00 to 10:00","B. 10:00 to 12:00","C. 14:00 to 18:00","D. 22:00 to 24:00"],"answer":"C","explanation":"NPH is an intermediate-acting insulin that peaks 6 to 10 hours after injection (average 8 hours). Administered at 08:00, peak hypoglycemic risk occurs between 14:00 and 18:00 (mid-to-late afternoon)."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Insulin Types, Peaks & Onsets')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Opioid Toxicity Triad',
  'CPR',
  'Pathognomonic clinical signs of acute opioid intoxication and overdose.',
  'Emergency Nursing',
  'Pharmacology',
  ARRAY['Opioids','Toxicology','Emergency','Antidote'],
  ARRAY['C — Coma (Unresponsiveness)','P — Pinpoint pupils (Miosis)','R — Respiratory depression (<10-12/min)'],
  '[{"emoji":"💤","phrase":"C — Coma","meaning":"Profuse central nervous system depression, lethargy, stupor, unresponsiveness to verbal or physical stimuli."},{"emoji":"👁️","phrase":"P — Pinpoint Pupils","meaning":"Bilateral miosis due to stimulation of the Edinger-Westphal nucleus via mu and kappa opioid receptors."},{"emoji":"🫁","phrase":"R — Respiratory Depression","meaning":"Decreased respiratory rate (<10 breaths/min), shallow hypoventilation, hypercapnia, cyanosis, and respiratory arrest."}]'::jsonb,
  'Opioid overdose leads to fatal anoxic brain injury and cardiac arrest if respiratory drive is not restored immediately with naloxone (Narcan).',
  ARRAY['Morphine overdose','Heroin use','Fentanyl exposure','Oxycodone or Methadone intoxication','Tramadol overdose'],
  'Students often confuse opioid toxicity (Pinpoint pupils / Miosis) with anticholinergic/sympathomimetic toxicity (Dilated pupils / Mydriasis). Furthermore, remember that Naloxone has a SHORTER half-life (30-90 mins) than most opioids (4-6 hours), so the patient can relapse into coma once naloxone wears off!',
  '"If the patient is in a Coma, has Pinpoint pupils, and needs Respiratory resuscitation: give Naloxone (Narcan) immediately!"',
  'Always monitor vitals for at least 2 to 4 hours following naloxone administration. Multiple doses may be required for long-acting opioids like methadone.',
  '{"question":"A client is brought to the ED with respirations of 6 breaths/min, pinpoint pupils, and lethargy following an accidental medication ingestion. After IV naloxone administration, the client awakens. What is the nurse''s priority ongoing assessment?","options":["A. Monitor for recurrent respiratory depression as naloxone wears off","B. Immediately discharge the client once alert","C. Administer an oral dose of naloxone to sustain effect","D. Restrict fluids to prevent pulmonary edema"],"answer":"A","explanation":"The duration of action of naloxone is 30 to 90 minutes, whereas opioids often have a much longer half-life. The patient can slip back into respiratory depression when naloxone metabolizes, requiring repeat doses."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Opioid Toxicity Triad')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Lithium Toxicity & Side Effects',
  'L-I-T-H-I-U-M',
  'Therapeutic monitoring, early toxicity indicators, and clinical precautions for lithium therapy.',
  'Mental Health',
  'Pharmacology',
  ARRAY['Lithium','Bipolar','Psychiatry','Toxicity'],
  ARRAY['L — Level (0.6–1.2 mEq/L)','I — Increased urination & thirst (Polyuria/Polydipsia)','T — Tremors (Fine vs. Coarse)','H — Hypothyroidism risk','I — Impaired renal function (Kidneys excrete 100%)','U — Upset stomach (Nausea/Vomiting/Diarrhea)','M — Muscle weakness & Ataxia'],
  '[{"emoji":"🧪","phrase":"L — Level (0.6–1.2 mEq/L)","meaning":"Narrow therapeutic window. Serum levels >1.5 mEq/L cause early toxicity; >2.0 mEq/L causes life-threatening toxicity."},{"emoji":"💧","phrase":"I — Increased Urination & Thirst","meaning":"Inhibits renal response to ADH, potentially causing nephrogenic diabetes insipidus."},{"emoji":"👋","phrase":"T — Tremors","meaning":"Fine resting hand tremor is a common expected side effect; COARSE hand tremor is a cardinal sign of toxicity!"},{"emoji":"🦋","phrase":"H — Hypothyroidism","meaning":"Interferes with thyroid hormone synthesis; check baseline TSH and periodic thyroid panels."},{"emoji":"🫘","phrase":"I — Impaired Renal Function","meaning":"Excreted entirely unchanged by the kidneys; monitor BUN, serum creatinine, and GFR."},{"emoji":"🤢","phrase":"U — Upset Stomach","meaning":"GI upset (nausea, vomiting, diarrhea) is the earliest presenting symptom of lithium toxicity."},{"emoji":"🚶","phrase":"M — Muscle Weakness & Ataxia","meaning":"Neurological progression: muscle hyperirritability, uncoordinated gait, slurred speech, confusion, seizures."}]'::jsonb,
  'Lithium is the gold-standard mood stabilizer for Bipolar I disorder, but its narrow therapeutic index requires rigorous client education regarding fluid and sodium intake.',
  ARRAY['Bipolar Disorder (Manic episodes)','Dehydration / fluid loss','Low-sodium diets','Diuretics (Hydrochlorothiazide)','NSAID concurrent use'],
  'Sodium and lithium compete for renal tubular reabsorption! If serum sodium is LOW (hyponatremia or dehydration), kidneys reabsorb MORE lithium, causing toxic levels! Instruct patients NEVER to go on low-sodium diets or take thiazide diuretics without medical supervision.',
  '"Low salt = High lithium! Fine tremors are fine; coarse tremors mean toxicity!"',
  'Draw lithium trough levels 12 hours after the previous night''s dose, right before the morning dose.',
  '{"question":"A client taking lithium carbonate for bipolar disorder reports persistent nausea, loose stools, and a new coarse hand tremor. What is the nurse''s priority action?","options":["A. Administer the scheduled morning dose with food","B. Reassure the client that coarse tremors are common expected effects","C. Hold the dose and request an urgent serum lithium level","D. Encourage the client to initiate a strict low-sodium diet"],"answer":"C","explanation":"Nausea, diarrhea, and coarse hand tremors are hallmark manifestations of acute lithium toxicity. The nurse must hold the dose and immediately check serum lithium levels."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Lithium Toxicity & Side Effects')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Warfarin vs. Heparin: Labs & Antidotes',
  'HePtt & Coumadin',
  'Differentiating coagulation lab monitoring, onset times, and reversal agents for anticoagulants.',
  'Cardiovascular',
  'Pharmacology',
  ARRAY['Anticoagulants','Heparin','Warfarin','Hematology'],
  ARRAY['Heparin: aPTT monitoring (46–70s therapeutic), Antidote = Protamine Sulfate','Warfarin: PT/INR monitoring (2.0–3.0 therapeutic), Antidote = Vitamin K'],
  '[{"emoji":"⚡","phrase":"Heparin (Fast Acting)","meaning":"Parenteral (IV/SubQ). Rapid onset within minutes. Inactivates thrombin and factor Xa. Safe during pregnancy."},{"emoji":"⏱️","phrase":"aPTT Monitoring","meaning":"Normal aPTT is 30–40 sec; therapeutic target is 1.5 to 2.5 times baseline (typically 60–80 seconds)."},{"emoji":"🛡️","phrase":"Protamine Sulfate","meaning":"The definitive reversal antidote for unfractionated heparin and partial antidote for LMWH (Enoxaparin)."},{"emoji":"💊","phrase":"Warfarin / Coumadin (Slow Acting)","meaning":"Oral tablet. Inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Takes 3–5 days to reach therapeutic INR."},{"emoji":"📊","phrase":"PT / INR Monitoring","meaning":"Target INR is 2.0–3.0 for DVT/PE and AFib; target INR is 2.5–3.5 for mechanical prosthetic heart valves."},{"emoji":"🥬","phrase":"Vitamin K (Phytonadione)","meaning":"The antidote for warfarin. Clients must maintain consistent dietary intake of green leafy vegetables."}]'::jsonb,
  'Anticoagulant therapy carries high hemorrhage risk. Nurses must titrate continuous infusions based on protocol lab targets and keep antidotes immediately available.',
  ARRAY['Deep Vein Thrombosis (DVT)','Pulmonary Embolism (PE)','Atrial Fibrillation','Mechanical Heart Valve Replacement','Acute Coronary Syndrome'],
  'Students often mix up the lab tests. Memory trick: Count the letters! Heparin has 7 letters → monitored by PTT (also 7 letters in "Heparin"). Coumadin has 8 letters → monitored by PT and INR. Heparin is safe in pregnancy; Warfarin crosses placenta and is TERATOGENIC!',
  '"HePtt takes PTT and Protamine. Coumadin takes PT/INR and Vitamin K."',
  'Bridge therapy: Warfarin takes 48–72 hours to achieve anticoagulation, so IV heparin or enoxaparin is continued concurrently until the INR reaches therapeutic range (2.0–3.0).',
  '{"question":"A client receiving a continuous IV heparin infusion has an aPTT of 115 seconds with active epistaxis and hematuria. Which medication should the nurse anticipate administering?","options":["A. Vitamin K","B. Protamine sulfate","C. Aminocaproic acid","D. Calcium gluconate"],"answer":"B","explanation":"An aPTT of 115 seconds exceeds the therapeutic range (typically 60–80 seconds). With active bleeding, the nurse anticipates administering Protamine sulfate, the specific antidote for heparin. Vitamin K is the antidote for warfarin."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Warfarin vs. Heparin: Labs & Antidotes')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Serotonin Syndrome',
  'S-H-I-V-E-R-S',
  'Clinical manifestations of life-threatening central and peripheral serotonin receptor overstimulation.',
  'Mental Health',
  'Pharmacology',
  ARRAY['Psychiatry','SSRIs','Toxicity','Emergency'],
  ARRAY['S — Shivering','H — Hyperreflexia & Clonus','I — Increased temperature (Hyperthermia)','V — Vital sign instability (Tachycardia, labile BP)','E — Encephalopathy (Agitation, delirium)','R — Restlessness & Akathisia','S — Sweating (Diaphoresis)'],
  '[{"emoji":"🥶","phrase":"S — Shivering","meaning":"Involuntary shivering and tremors, often presenting early."},{"emoji":"🦵","phrase":"H — Hyperreflexia & Clonus","meaning":"Exaggerated deep tendon reflexes and rhythmic ankle/ocular clonus; key discriminator from NMS."},{"emoji":"🌡️","phrase":"I — Increased Temperature","meaning":"Hyperthermia (>38°C to >40°C in severe cases) caused by excessive muscular hyperactivity."},{"emoji":"💓","phrase":"V — Vital Sign Instability","meaning":"Autonomic hyperactivity: tachycardia, labile blood pressure, tachypnea, and pupil dilation (mydriasis)."},{"emoji":"🤯","phrase":"E — Encephalopathy","meaning":"Altered mental status: confusion, extreme agitation, disorientation, hallucination, delirium."},{"emoji":"🏃","phrase":"R — Restlessness","meaning":"Motor agitation, pacing, inability to sit still (akathisia), ataxia."},{"emoji":"💦","phrase":"S — Sweating (Diaphoresis)","meaning":"Profuse sweating and cutaneous flushing with hyperactive bowel sounds."}]'::jsonb,
  'Rapidly fatal if unaddressed. Frequently triggered when two serotonergic medications (e.g., SSRIs + MAOIs, Tramadol, St. John''s Wort, Linezolid) are combined without a proper washout period.',
  ARRAY['SSRI + MAOI combination','SSRI + St. John''s Wort','SSRI + Tramadol or Meperidine','Dextromethorphan + Antidepressants','Linezolid antibiotic with SSRI'],
  'Serotonin Syndrome vs. NMS: Serotonin Syndrome presents with HYPERREFLEXIA and CLONUS (neuromuscular excitability), dilated pupils, and diarrhea. Neuroleptic Malignant Syndrome (NMS) presents with "LEAD-PIPE" RIGIDITY, HYPOREFLEXIA, and normal pupils.',
  '"Serotonin shakes and SHIVERS with clonus; NMS is rigid as a board with FEVER."',
  'A mandatory 14-day washout period (5 weeks for Fluoxetine due to long half-life) must elapse between discontinuing an SSRI and starting an MAOI.',
  '{"question":"A client taking sertraline starts taking St. John''s Wort for mild insomnia. Two days later, the client presents with hyperreflexia, bilateral ankle clonus, dilated pupils, and a temperature of 38.8°C. What condition is this client experiencing?","options":["A. Neuroleptic malignant syndrome","B. Serotonin syndrome","C. Anticholinergic toxicity","D. Tardive dyskinesia"],"answer":"B","explanation":"Combining an SSRI (sertraline) with herbal St. John''s Wort causes serotonin toxicity. The pathognomonic findings of hyperreflexia and spontaneous/inducible clonus confirm Serotonin Syndrome."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Serotonin Syndrome')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Neuroleptic Malignant Syndrome',
  'F-E-V-E-R',
  'Idiosyncratic, life-threatening reaction to dopamine-receptor antagonists (antipsychotics).',
  'Mental Health',
  'Pharmacology',
  ARRAY['Antipsychotics','Haloperidol','Psychiatry','Emergency'],
  ARRAY['F — Fever (Extreme hyperthermia >38°C–41°C)','E — Encephalopathy (Altered mental status)','V — Vitals unstable (Tachycardia, labile BP, diaphoresis)','E — Elevated CPK & Leukocytosis','R — Rigidity ("Lead-pipe" generalized muscle rigidity)'],
  '[{"emoji":"🔥","phrase":"F — Fever","meaning":"High-grade fever (>38°C / 100.4°F, often up to 41°C); hallmark sign of hypothalamic dopamine blockade."},{"emoji":"🧠","phrase":"E — Encephalopathy","meaning":"Progressive drowsiness, stupor, mutism, delirium, and coma."},{"emoji":"📈","phrase":"V — Vitals Unstable","meaning":"Autonomic storm: tachycardia, tachypnea, labile hypertension or hypotension, and profuse diaphoresis."},{"emoji":"🧪","phrase":"E — Elevated CPK & WBC","meaning":"Creatine phosphokinase (CPK) >1,000–100,000 U/L due to massive skeletal muscle breakdown, risking acute tubular necrosis."},{"emoji":"🦾","phrase":"R — Rigidity","meaning":"\"Lead-pipe\" resistance to passive movement in all muscle groups; absence of clonus differentiates from serotonin syndrome."}]'::jsonb,
  'Carries a 10–20% mortality rate due to rhabdomyolysis, renal failure, and arrhythmias. Immediate cessation of the offending antipsychotic is the cornerstone of emergency management.',
  ARRAY['Typical Antipsychotics (Haloperidol, Fluphenazine, Chlorpromazine)','Atypical Antipsychotics (Olanzapine, Risperidone)','Abrupt withdrawal of dopamine agonists (Levodopa)','Metoclopramide antiemetic'],
  'Students confuse NMS with Serotonin Syndrome. Remember: NMS has "lead-pipe" generalized muscle RIGIDITY and elevated CPK from muscle breakdown. The pharmacological treatment for NMS is Dantrolene (direct-acting muscle relaxant) and Bromocriptine (dopamine agonist).',
  '"Antipsychotics cause a deadly FEVER with lead-pipe rigidity. Stop the drug and give Dantrolene!"',
  'Immediate nursing actions: Discontinue antipsychotic immediately, initiate aggressive active cooling (cooling blankets, ice packs to axillae/groin), and hydrate with IV fluids to flush myoglobin from renal tubules.',
  '{"question":"A psychiatric client taking haloperidol develops a temperature of 39.8°C, tachycardia of 124 bpm, profuse diaphoresis, and severe \"lead-pipe\" muscle rigidity. Which medication does the nurse prepare to administer?","options":["A. Physostigmine","B. Dantrolene sodium","C. Naloxone","D. Flumazenil"],"answer":"B","explanation":"The client has Neuroleptic Malignant Syndrome (NMS). Dantrolene is a skeletal muscle relaxant that treats the hyperthermia and severe rigidity of NMS by preventing calcium release from the sarcoplasmic reticulum."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Neuroleptic Malignant Syndrome')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Potassium-Sparing Diuretics',
  'A-S-K / S-A-L-T',
  'Identifying diuretics that retain potassium and their critical dietary and lab precautions.',
  'Pharmacology',
  'Pharmacology',
  ARRAY['Diuretics','Electrolytes','Kidney','Pharmacology'],
  ARRAY['A — Amiloride','S — Spironolactone (Aldactone)','K — Potassium-sparing (keeps K+ in the body)'],
  '[{"emoji":"💊","phrase":"A — Amiloride","meaning":"Inhibits sodium channels in the cortical collecting duct, conserving potassium while excreting sodium."},{"emoji":"🛡️","phrase":"S — Spironolactone","meaning":"Aldosterone antagonist; treats heart failure, ascites, and primary hyperaldosteronism while sparing K+."},{"emoji":"🧪","phrase":"K — Keeps Potassium","meaning":"Does not cause hypokalemia like loop (furosemide) or thiazide diuretics; causes HYPERKALEMIA instead."}]'::jsonb,
  'Unlike furosemide or hydrochlorothiazide which cause hypokalemia, potassium-sparing diuretics cause dangerous hyperkalemia (>5.0 mEq/L) if patients consume high-potassium foods or salt substitutes.',
  ARRAY['Hypertension','Congestive Heart Failure','Hepatic Cirrhosis with Ascites','Hypokalemia prophylaxis during loop diuretic use'],
  'Salt substitutes are manufactured using POTASSIUM CHLORIDE (KCl) instead of sodium chloride. Clients on spironolactone or amiloride who use salt substitutes will rapidly develop lethal hyperkalemia! Instruct clients to avoid salt substitutes, potassium supplements, and excessive high-potassium fruits (bananas, oranges, avocados).',
  '"ASK the patient if they are on potassium-sparing diuretics before they season their food with salt substitutes!"',
  'Hold potassium-sparing diuretics and notify the physician if serum potassium exceeds 5.0 mEq/L or if the patient is concurrently prescribed ACE inhibitors/ARBs.',
  '{"question":"A client with heart failure is prescribed spironolactone. During discharge teaching, which statement by the client indicates a need for further instruction?","options":["A. \"I will avoid using potassium-based salt substitutes.\"","B. \"I will report dizziness or muscle weakness to my doctor.\"","C. \"I will eat an extra banana and avocado daily to keep my electrolytes balanced.\"","D. \"I will have my kidney function and electrolytes checked regularly.\""],"answer":"C","explanation":"Spironolactone is a potassium-sparing diuretic. Consuming excessive high-potassium foods (bananas, avocados) puts the client at serious risk for hyperkalemia and life-threatening cardiac arrhythmias."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Potassium-Sparing Diuretics')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'ACE Inhibitor Adverse Effects',
  'C-A-P-T-O-P-R-I-L',
  'Comprehensive adverse effect profile and contraindications for ACE inhibitors.',
  'Cardiovascular',
  'Pharmacology',
  ARRAY['Hypertension','Cardiology','Pharmacology','Adverse Effects'],
  ARRAY['C — Cough (Dry & Persistent)','A — Angioedema (Life-threatening airway edema)','P — Potassium excess (Hyperkalemia)','T — Taste impairment (Dysgeusia)','O — Orthostatic hypotension (First-dose effect)','P — Pregnancy contraindicated (Teratogenic)','R — Renal impairment (Check BUN & Creatinine)'],
  '[{"emoji":"🗣️","phrase":"C — Cough","meaning":"Caused by bradykinin accumulation in lung tissue; dry, persistent hacking cough that does not respond to cough syrup; requires switching to an ARB (Losartan)."},{"emoji":"👄","phrase":"A — Angioedema","meaning":"Swelling of the lips, tongue, uvula, and laryngeal tissues; medical airway emergency; never rechallenge with another ACE inhibitor!"},{"emoji":"🍌","phrase":"P — Potassium Excess","meaning":"Inhibition of aldosterone leads to renal potassium retention; monitor serum K+ (>5.0 mEq/L)."},{"emoji":"👅","phrase":"T — Taste Impairment","meaning":"Reversible metallic taste or loss of taste (dysgeusia)."},{"emoji":"😵","phrase":"O — Orthostatic Hypotension","meaning":"Severe first-dose hypotension; take initial dose at bedtime and change positions slowly."},{"emoji":"🤰","phrase":"P — Pregnancy Contraindicated","meaning":"Black box warning: teratogenic in 2nd and 3rd trimesters, causing fetal renal agenesis and oligohydramnios."},{"emoji":"🫘","phrase":"R — Renal Impairment","meaning":"Dilates efferent arterioles; can precipitate acute renal failure in bilateral renal artery stenosis."}]'::jsonb,
  'ACE inhibitors (e.g., Enalapril, Lisinopril, Ramipril) are first-line for hypertension and heart failure but feature high-risk adverse reactions that nurses must monitor vigilantly.',
  ARRAY['Hypertension','Heart Failure with reduced ejection fraction','Post-Myocardial Infarction','Diabetic Nephropathy'],
  'If a client develops a dry cough on an ACE inhibitor, do NOT recommend cough drops or suppressants. The drug must be discontinued and replaced with an Angiotensin Receptor Blocker (ARB) such as losartan, which does not increase bradykinin.',
  '"ACE inhibitors give you a dry cough and angioedema; switch to ARBs to breathe easily."',
  'Angioedema can occur months or years after starting an ACE inhibitor. Any tongue or lip swelling requires immediate emergency department evaluation.',
  '{"question":"A client taking enalapril calls the outpatient clinic complaining of a persistent, hacking dry cough that keeps them awake at night. What is the nurse''s most appropriate response?","options":["A. \"Use an over-the-counter dextromethorphan cough syrup.\"","B. \"This is an expected side effect that will resolve in a few days.\"","C. \"Come to the clinic so the provider can evaluate switching you to an ARB.\"","D. \"Increase your fluid intake to thin respiratory secretions.\""],"answer":"C","explanation":"The dry cough associated with ACE inhibitors is caused by bradykinin accumulation and will not resolve with cough suppressants. The standard practice is to switch the patient to an Angiotensin Receptor Blocker (ARB) like losartan."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('ACE Inhibitor Adverse Effects')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Beta-Blocker 4 B''s Precautions',
  'B-B-B-B',
  'Essential assessment gates and contraindications before administering beta-blockers.',
  'Cardiovascular',
  'Pharmacology',
  ARRAY['Cardiology','Beta Blockers','Pharmacology','Nursing Assessment'],
  ARRAY['B — Bradycardia (Hold if HR < 60 bpm)','B — Breathing problems (Bronchospasm in asthma/COPD)','B — Blood pressure drop (Hold if SBP < 100 mmHg)','B — Blood sugar masking (Hides hypoglycemia signs)'],
  '[{"emoji":"💓","phrase":"B — Bradycardia","meaning":"Assess apical pulse for 1 full minute prior to administration; hold medication and notify provider if HR is below 60 beats/min."},{"emoji":"🫁","phrase":"B — Breathing Problems","meaning":"Non-selective beta-blockers (e.g., Propranolol) block Beta-2 receptors in the lungs, triggering bronchospasm. Contraindicated in asthma and severe COPD!"},{"emoji":"📉","phrase":"B — Blood Pressure Drop","meaning":"Decreases myocardial contractility and vascular resistance; hold if systolic blood pressure is below 100 mmHg."},{"emoji":"🍭","phrase":"B — Blood Sugar Masking","meaning":"Blunts sympathetic signs of hypoglycemia (tachycardia, tremors, anxiety). Diaphoresis (sweating) is often the ONLY symptom left unmasked!"}]'::jsonb,
  'Beta-blockers (e.g., Metoprolol, Atenolol, Propranolol, Carvedilol) reduce cardiac workload but can precipitate heart block, acute bronchospasm, or unrecognized hypoglycemia.',
  ARRAY['Hypertension','Angina Pectoris','Post-Myocardial Infarction secondary prevention','Atrial Fibrillation rate control','Stable Heart Failure'],
  'In diabetic clients on insulin, beta-blockers mask hypoglycemia tachycardia! The nurse must teach diabetic clients to check their blood sugar if they experience sweating (diaphoresis) or hunger, as heart rate will not rise.',
  '"Check apical pulse before beta-blockers. Don''t give non-selectives to asthmatics!"',
  'Never stop beta-blockers abruptly. Rebound sympathetic excitation can trigger severe reflex hypertension, angina, or acute myocardial infarction.',
  '{"question":"A nurse is preparing to administer propranolol to a client with hypertension. Which condition in the client''s medical history represents an absolute contraindication?","options":["A. Type 2 Diabetes Mellitus","B. Severe Asthma","C. Essential Tremor","D. Migraine Headaches"],"answer":"B","explanation":"Propranolol is a non-cardioselective beta-blocker that blocks both Beta-1 and Beta-2 receptors. Beta-2 blockade causes bronchial constriction and bronchospasm, making it contraindicated in asthma and COPD."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Beta-Blocker 4 B''s Precautions')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Statin Monitoring & Adverse Effects',
  'H-M-G',
  'High-yield adverse effect monitoring and client education for HMG-CoA reductase inhibitors.',
  'Cardiovascular',
  'Pharmacology',
  ARRAY['Statins','Lipids','Pharmacology','Cardiology'],
  ARRAY['H — Hepatotoxicity (Monitor ALT/AST liver enzymes)','M — Myopathy & Rhabdomyolysis (Report muscle pain & check CK)','G — Grapefruit juice avoidance (Inhibits CYP3A4)'],
  '[{"emoji":"🫀","phrase":"H — Hepatotoxicity","meaning":"Statins can cause hepatic inflammation; check baseline liver function tests (LFTs) and monitor for jaundice, right upper quadrant pain, and dark urine."},{"emoji":"💪","phrase":"M — Myopathy & Rhabdomyolysis","meaning":"Muscle aches, stiffness, weakness; muscle breakdown releases myoglobin, causing tea-colored urine and acute renal failure. Check CK level!"},{"emoji":"🍊","phrase":"G — Grapefruit Juice Avoidance","meaning":"Grapefruit inhibits CYP3A4 metabolism in the intestine, drastically increasing serum statin levels and toxic rhabdomyolysis risk."}]'::jsonb,
  'Statins (Atorvastatin, Rosuvastatin, Simvastatin) are the cornerstone of lipid-lowering therapy and cardiovascular risk reduction, but unmonitored muscle toxicity can lead to permanent kidney damage.',
  ARRAY['Hypercholesterolemia','Coronary Artery Disease','Atherosclerosis','Stroke prevention'],
  'Any client on a statin who calls reporting unexplained muscle pain, tenderness, or weakness must be instructed to STOP the medication immediately and come in for a Creatine Kinase (CK) and serum creatinine check!',
  '"Statins lower cholesterol at night, but watch the liver (H), muscle pain (M), and grapefruit juice (G)!"',
  'Instruct patients to take statins in the evening or at bedtime with food, because endogenous hepatic cholesterol synthesis peaks overnight.',
  '{"question":"A client taking atorvastatin 40 mg daily contacts the clinic reporting severe generalized muscle aching and dark, cola-colored urine. What is the nurse''s priority instruction?","options":["A. \"Drink 2 glasses of grapefruit juice to boost absorption.\"","B. \"Take ibuprofen and continue your atorvastatin as prescribed.\"","C. \"Stop taking atorvastatin immediately and go to the emergency department.\"","D. \"This is an expected adjustment symptom that will pass within two weeks.\""],"answer":"C","explanation":"Unexplained muscle pain paired with tea/cola-colored urine is pathognomonic for rhabdomyolysis, where damaged muscle releases myoglobin that clogs renal tubules. The client must discontinue the statin and seek immediate medical care."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Statin Monitoring & Adverse Effects')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'BUBBLE-HE Postpartum Assessment',
  'B-U-B-B-L-E-H-E',
  'Systematic head-to-toe nursing assessment protocol for postpartum mothers.',
  'Maternity',
  'Obstetrics',
  ARRAY['Postpartum','Maternity','Midwifery','Assessment'],
  ARRAY['B — Breasts (Soft, filling, or engorged; assess nipples)','U — Uterus (Fundal height, location, and firmness)','B — Bladder (Voiding pattern & distension)','B — Bowels (Bowel sounds, flatus, hemorrhoids)','L — Lochia (Color, amount, odor: Rubra, Serosa, Alba)','E — Episiotomy / Perineum (REEDA assessment)','H — Homan''s sign / DVT signs (Warmth, pain, redness in calves)','E — Emotional status & Bonding (Maternal attachment)'],
  '[{"emoji":"🤱","phrase":"B — Breasts","meaning":"Assess consistency (soft on days 1-2, filling day 3, engorged day 4); inspect nipples for fissures, erythema, blisters, or inverted nipples."},{"emoji":"🤰","phrase":"U — Uterus","meaning":"Fundus should be firm, midline, and at level of umbilicus on Day 1; descends 1 cm (one fingerbreadth) per day. A boggy uterus indicates atony."},{"emoji":"🚽","phrase":"B — Bladder","meaning":"Assess for urinary retention. A full distended bladder pushes the fundus UP and to the RIGHT, preventing uterine contraction and provoking hemorrhage!"},{"emoji":"💨","phrase":"B — Bowels","meaning":"Auscultate bowel sounds; assess fear of defecation, constipation, and perineal hemorrhoids."},{"emoji":"🩸","phrase":"L — Lochia","meaning":"Rubra (dark red, days 1-3), Serosa (pink-brown, days 4-10), Alba (white-yellow, days 10-28). Soaking a pad in <1 hr indicates postpartum hemorrhage!"},{"emoji":"🩹","phrase":"E — Episiotomy/Perineum","meaning":"Inspect perineum in Sims position using REEDA: Redness, Edema, Ecchymosis, Discharge, Approximation."},{"emoji":"🦵","phrase":"H — Homan''s Sign / Legs","meaning":"Check calves for unilateral edema, warmth, erythema, and tenderness indicative of Deep Vein Thrombosis."},{"emoji":"❤️","phrase":"E — Emotional State","meaning":"Assess bonding behaviors (en face position, touch, vocalization) and screen for postpartum blues vs postpartum depression."}]'::jsonb,
  'Standardized assessment ensures early detection of the two leading causes of postpartum maternal mortality: postpartum hemorrhage (PPH) and puerperal sepsis.',
  ARRAY['Normal vaginal delivery','Cesarean section recovery','Postpartum hemorrhage surveillance','Puerperal infection surveillance'],
  'If the fundus is boggy AND displaced laterally (usually to the right) above the umbilicus, the FIRST action is to have the client VOID (empty her bladder)! A full bladder prevents normal uterine involution.',
  '"BUBBLE-HE checks every mother from head to toe: Breasts, Uterus, Bladder, Bowels, Lochia, Episiotomy, Homan''s, and Emotion!"',
  'If the fundus is boggy and midline, perform vigorous fundal massage immediately. If displaced to the right, assist the client to the bathroom to empty her bladder first, then re-massage.',
  '{"question":"During a postpartum assessment 6 hours after delivery, the nurse notes that the fundus is boggy, located 2 fingerbreadths above the umbilicus, and displaced to the right side. What is the nurse''s FIRST intervention?","options":["A. Administer a bolus of IV oxytocin","B. Assist the client to empty her bladder","C. Perform vigorous fundal massage continuously for 30 minutes","D. Call the physician to prepare for surgical intervention"],"answer":"B","explanation":"A fundus that is elevated above the umbilicus and displaced to the right is the classic hallmark of urinary bladder distension. The full bladder prevents the uterus from contracting. Assisting the client to void or catheterizing her will allow the uterus to return to the midline and contract."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('BUBBLE-HE Postpartum Assessment')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Maternal Intrauterine Resuscitation',
  'L-I-O-N',
  'Immediate bedside interventions for non-reassuring fetal heart rate patterns and fetal distress.',
  'Maternity',
  'Obstetrics',
  ARRAY['Labor','Fetal Distress','Midwifery','Emergency'],
  ARRAY['L — Left lateral position','I — IV fluid bolus (Lactated Ringer''s)','O — Oxygen (10 L/min via Non-Rebreather mask)','N — Notify obstetrician / provider (and stop Oxytocin/Pitocin)'],
  '[{"emoji":"🔄","phrase":"L — Left Lateral Position","meaning":"Relieves compression of maternal inferior vena cava and aorta by the heavy gravid uterus, improving venous return and placental perfusion."},{"emoji":"💧","phrase":"I — IV Fluid Bolus","meaning":"Increases maternal circulating intravascular volume, optimizing cardiac output and uterine blood flow."},{"emoji":"🫁","phrase":"O — Oxygen 10 L/min via NRB","meaning":"Hyperoxygenates maternal arterial blood to maximize oxygen delivery across the placental barrier to the hypoxic fetus."},{"emoji":"📞","phrase":"N — Notify & Stop Oxytocin","meaning":"Stop any running oxytocin (Pitocin) infusion immediately to eliminate uterine hyperstimulation; call obstetric provider."}]'::jsonb,
  'Non-reassuring fetal heart tracings (persistent late decelerations, prolonged decelerations, severe variable decelerations) indicate acute uteroplacental insufficiency or cord compression requiring rapid resuscitation.',
  ARRAY['Uteroplacental insufficiency','Late decelerations on CTG','Umbilical cord compression','Uterine tachysystole (>5 contractions in 10 minutes)','Maternal hypotension following epidural'],
  'If oxytocin (Pitocin) is running and fetal heart decelerations appear, STOPPING THE OXYTOCIN is the absolute FIRST action, accompanied by positioning the mother on her left side!',
  '"When the baby is distressed, act like a LION: Left side, IV fluids, Oxygen, and Notify provider!"',
  'Administer oxygen at 8–10 L/min via a tight-fitting non-rebreather mask; a nasal cannula is completely insufficient for intrauterine fetal resuscitation.',
  '{"question":"During continuous electronic fetal monitoring, the nurse observes repetitive late decelerations on the tracing while an IV oxytocin infusion is running. What is the nurse''s FIRST priority action?","options":["A. Apply oxygen at 2 L/min via nasal cannula","B. Discontinue the IV oxytocin infusion immediately","C. Prepare the client for an emergency cesarean section","D. Increase the IV oxytocin rate to hasten delivery"],"answer":"B","explanation":"Late decelerations indicate uteroplacental insufficiency. The first priority is to discontinue the oxytocin infusion to eliminate contraction pressure on the placental bed, followed by turning the client to the left lateral position, increasing IV fluids, and applying high-flow oxygen."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Maternal Intrauterine Resuscitation')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'The Five P''s of Labor and Delivery',
  'The 5 P''s',
  'The five critical interacting factors that determine the progression and outcome of labor.',
  'Maternity',
  'Obstetrics',
  ARRAY['Labor','Childbirth','Midwifery','Maternity'],
  ARRAY['1. Passenger (Fetus and placenta)','2. Passageway (Maternal pelvis and birth canal)','3. Powers (Uterine contractions and pushing efforts)','4. Position (Maternal posture during labor)','5. Psyche (Maternal psychological state)'],
  '[{"emoji":"👶","phrase":"Passenger (Fetus & Placenta)","meaning":"Fetal head size, fetal presentation (cephalic, breech, shoulder), fetal lie (longitudinal vs transverse), and attitude (flexion vs extension)."},{"emoji":"🦴","phrase":"Passageway (Bony Pelvis)","meaning":"Size and shape of the maternal pelvis (gynecoid is optimal; android/platypelloid can cause dystocia) and distensibility of soft tissues."},{"emoji":"⚡","phrase":"Powers (Contractions)","meaning":"Primary powers (involuntary uterine contractions causing effacement and dilation) and secondary powers (voluntary maternal bearing-down efforts in stage 2)."},{"emoji":"🧘","phrase":"Position (Maternal Posture)","meaning":"Upright, walking, kneeling, squatting, or side-lying positions use gravity to assist fetal descent and enlarge pelvic diameters."},{"emoji":"🧠","phrase":"Psyche (Emotional Response)","meaning":"Maternal anxiety, fear, exhaustion, and pain perception; severe stress releases catecholamines that inhibit uterine contractions."}]'::jsonb,
  'Labor dystocia (prolonged or difficult labor) occurs whenever there is an abnormality or mismatch in one or more of the 5 P''s.',
  ARRAY['Cephalopelvic disproportion (CPD)','Occiput posterior fetal malposition','Uterine inertia / hypotonic contractions','Maternal pelvic stenosis'],
  'The optimal pelvic shape for vaginal delivery is GYNECOID (round, spacious). An ANDROID pelvis (heart-shaped, male-type) carries a high risk of deep transverse arrest and cesarean delivery.',
  '"A smooth delivery needs all 5 P''s: the Passenger fits the Passageway driven by Powers in the right Position with a calm Psyche."',
  'Suboccipitobregmatic diameter (about 9.5 cm) is the smallest anteroposterior diameter of the fetal head and enters the pelvis when the head is fully flexed.',
  '{"question":"A nurse assesses a laboring client experiencing intense back labor. The fetal position is Occiput Posterior (OP). Which modification to maternal \"Position\" is most effective to encourage fetal rotation and relieve back pain?","options":["A. Strict flat supine position with legs elevated","B. Hands-and-knees (all-fours) position or pelvic rocking","C. Lithotomy position with legs in stirrups","D. Trendelenburg position"],"answer":"B","explanation":"In occiput posterior position (\"sunny-side up\"), the fetal occiput presses against maternal sacral nerves causing back labor. A hands-and-knees (all-fours) position uses gravity to pull the fetal trunk forward away from the sacrum, facilitating anterior rotation."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('The Five P''s of Labor and Delivery')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Pre-eclampsia Warning Signs',
  'P-R-E-E',
  'Diagnostic features, severe criteria, and neurological complications of pre-eclampsia.',
  'Maternity',
  'Obstetrics',
  ARRAY['Pre-eclampsia','Hypertension','Pregnancy','Midwifery'],
  ARRAY['P — Proteinuria & Persistent severe headache','R — Reflexes hyperactive (+3/+4 DTRs with ankle clonus)','E — Elevated blood pressure (≥140/90 mmHg after 20 weeks)','E — Epigastric / Right upper quadrant pain & Eye changes'],
  '[{"emoji":"🧪","phrase":"P — Proteinuria & Headache","meaning":"Proteinuria ≥300 mg/24 hr or urine dipstick ≥1+; severe persistent frontal or throbbing headache unyielding to analgesics."},{"emoji":"⚡","phrase":"R — Reflexes Hyperactive","meaning":"Brisk deep tendon reflexes (+3 or +4) and rhythmic beats of ankle clonus signify neuromuscular irritability and impending eclamptic seizure!"},{"emoji":"📈","phrase":"E — Elevated Blood Pressure","meaning":"BP ≥140/90 mmHg on two readings 4 hours apart after 20 weeks gestation in a previously normotensive woman."},{"emoji":"👁️","phrase":"E — Epigastric Pain & Eye Changes","meaning":"Visual scotoma, blurring, photophobia; epigastric/RUQ pain indicates hepatic swelling and subcapsular hemorrhage (risk of liver rupture)."}]'::jsonb,
  'Pre-eclampsia is a multisystem endothelial vasospastic disorder. If untreated, it progresses to eclampsia (generalized tonic-clonic seizures), maternal stroke, or HELLP syndrome.',
  ARRAY['First pregnancy (primigravida)','Advanced maternal age (>35 years)','Multiple gestation (twins/triplets)','Chronic hypertension or preexisting renal disease','Diabetes mellitus'],
  'Magnesium sulfate is administered for SEIZURE PROPHYLAXIS, not as an antihypertensive! To detect magnesium toxicity, monitor the "BURP" triad: Blood pressure decrease, Urine output <30 mL/hr, Respiratory rate <12 breaths/min, and Patellar reflexes absent! Antidote = Calcium Gluconate.',
  '"P-R-E-E: Proteinuria, Reflexes hyperactive, Elevated BP, Epigastric pain and Eye flashes. Keep Calcium Gluconate at the bedside!"',
  'If a client on IV Magnesium Sulfate loses her deep tendon patellar reflexes, STOP the infusion immediately before respiratory arrest occurs.',
  '{"question":"A client with severe pre-eclampsia is receiving IV magnesium sulfate. During rounds, the nurse finds deep tendon reflexes are absent (0), respiratory rate is 10 breaths/min, and urine output was 18 mL over the last hour. What is the nurse''s FIRST action?","options":["A. Increase the rate of IV fluids","B. Stop the magnesium sulfate infusion immediately","C. Administer 100% oxygen via nasal cannula","D. Reassess the client''s reflexes in 30 minutes"],"answer":"B","explanation":"Absent deep tendon reflexes, bradypnea (<12 breaths/min), and oliguria (<30 mL/hr) are critical signs of magnesium toxicity. The nurse must IMMEDIATELY stop the magnesium sulfate infusion, then prepare to administer the antidote (calcium gluconate)."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Pre-eclampsia Warning Signs')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Postpartum Hemorrhage 4 T''s',
  'The 4 T''s',
  'Etiological classification of primary and secondary postpartum hemorrhage.',
  'Maternity',
  'Obstetrics',
  ARRAY['PPH','Hemorrhage','Obstetrics','Emergency'],
  ARRAY['Tone — Uterine atony (accounts for 70–80% of PPH)','Tissue — Retained placenta, membranes, or blood clots','Trauma — Lacerations of cervix, vagina, or perineum','Thrombin — Coagulopathies and DIC'],
  '[{"emoji":"🫄","phrase":"Tone (Uterine Atony)","meaning":"Failure of myometrium to contract down on spiral arterioles. Uterus feels soft, boggy, and spongy on palpation; #1 cause of PPH."},{"emoji":"🧩","phrase":"Tissue (Retained Products)","meaning":"Fragments of placenta or succenturiate lobe remain inside the uterine cavity, mechanically preventing complete involution."},{"emoji":"✂️","phrase":"Trauma (Lacerations & Tears)","meaning":"Cervical tears, vaginal vault lacerations, or expanding hematomas; suspected when bleeding is brisk and continuous despite a FIRM uterus."},{"emoji":"🩸","phrase":"Thrombin (Coagulopathy)","meaning":"Defects in maternal clotting cascade (von Willebrand, ITP, DIC secondary to abruption or amniotic fluid embolism)."}]'::jsonb,
  'Postpartum hemorrhage is defined as blood loss ≥500 mL after vaginal birth or ≥1,000 mL after cesarean delivery (or bleeding causing signs of hypovolemia). It remains the leading cause of maternal death worldwide.',
  ARRAY['Prolonged or precipitate labor','Uterine overdistension (polyhydramnios, macrosomia, twins)','High parity (grand multiparity)','Chorioamnionitis','Instrumental delivery (forceps/vacuum)'],
  'A classic NCK exam question presents a postpartum mother with heavy, continuous trickle of bright red blood, but on examination, THE UTERUS IS FIRM AND CONTRACTED! The cause is NOT atony; it is TRAUMA (cervical or vaginal laceration) requiring surgical repair.',
  '"PPH causes are the 4 T''s: Tone (atony), Tissue (placenta), Trauma (laceration), and Thrombin (clotting)."',
  'First line pharmacological management for uterine atony: Oxytocin 10–20 units IM/IV, Ergometrine 0.2 mg IM (contraindicated in hypertension!), and Misoprostol 800 mcg rectally/sublingually.',
  '{"question":"Two hours after an unassisted vaginal delivery, a client is noted to have continuous, bright red vaginal bleeding. On abdominal palpation, the fundus is firm, midline, and 1 fingerbreadth below the umbilicus. What is the most likely cause of the bleeding?","options":["A. Uterine atony","B. Retained placental fragments","C. Cervical or perineal laceration","D. Disseminated intravascular coagulation"],"answer":"C","explanation":"When excessive, continuous bleeding occurs in the presence of a firmly contracted uterus, uterine atony is ruled out. The bleeding is almost certainly caused by trauma/lacerations of the birth canal (cervix, vagina, or perineum)."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Postpartum Hemorrhage 4 T''s')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'True vs. False Labor',
  'T-R-U-E',
  'Differentiating true labor contractions from false Braxton-Hicks contractions.',
  'Maternity',
  'Obstetrics',
  ARRAY['Labor','Contractions','Midwifery','Obstetrics'],
  ARRAY['T — Timing regular and getting progressively closer','R — Radiates from the lower back around to the abdomen','U — Unrelieved by walking, hydration, or position change','E — Exam confirms progressive cervical dilation & effacement'],
  '[{"emoji":"⏱️","phrase":"T — Timing Regular","meaning":"True contractions occur at regular intervals, become progressively closer together, longer in duration, and stronger in intensity."},{"emoji":"🔄","phrase":"R — Radiates From Back","meaning":"True labor discomfort begins in the lower back and radiates around like a band to the anterior abdomen."},{"emoji":"🚶","phrase":"U — Unrelieved By Rest","meaning":"True contractions continue and intensify with ambulation; Braxton-Hicks contractions diminish with walking, rest, or warm baths."},{"emoji":"📏","phrase":"E — Exam Confirms Cervical Change","meaning":"Cervical effacement (thinning) and cervical dilation (opening) is the ONLY definitive clinical proof of true labor."}]'::jsonb,
  'Distinguishing true from false labor prevents unnecessary hospital admissions, maternal anxiety, and premature interventions.',
  ARRAY['Term gestation (37–42 weeks)','Spontaneous labor onset','Braxton-Hicks contractions','Dehydration-induced irritability'],
  'Students often guess that pain intensity determines true labor. Wrong! The ONLY definitive indicator of true labor is progressive cervical dilation and effacement assessed on vaginal examination.',
  '"True labor is TRUE: Timing regular, Radiates from back, Unstopped by walking, and Effacing the cervix!"',
  'Braxton-Hicks contractions are irregular, felt only in the lower abdomen or groin, and typically stop when the woman rests or drinks a large glass of water.',
  '{"question":"A primigravida at 39 weeks gestation presents to the maternity triage reporting contractions every 10 to 15 minutes. Which assessment finding definitively confirms to the nurse that the client is in TRUE labor?","options":["A. The contractions increase in intensity when the client walks","B. The client states pain radiates from her lower back to her abdomen","C. Vaginal examination reveals cervical dilation has progressed from 2 cm to 4 cm","D. The client passed a blood-tinged mucous plug 2 hours ago"],"answer":"C","explanation":"While contraction patterns and radiation are supportive, progressive cervical effacement and dilation on examination is the single definitive hallmark that differentiates true labor from false labor."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('True vs. False Labor')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'FAST Stroke Assessment',
  'F-A-S-T',
  'Rapid recognition tool for acute cerebrovascular accident (stroke).',
  'Neurology',
  'Neurology',
  ARRAY['Stroke','CVA','Neurology','Emergency','TPA'],
  ARRAY['F — Face drooping (Smile is asymmetrical)','A — Arm weakness (One arm drifts downward when raised)','S — Speech difficulty (Slurred or garbled words)','T — Time to call emergency & note Last Known Well time'],
  '[{"emoji":"😊","phrase":"F — Face Drooping","meaning":"One side of the face is numb or drooping; ask the person to smile to evaluate symmetry of nasolabial folds."},{"emoji":"💪","phrase":"A — Arm Weakness","meaning":"Pronator drift or inability to raise one arm; ask patient to extend both arms palms up with eyes closed for 10 seconds."},{"emoji":"🗣️","phrase":"S — Speech Difficulty","meaning":"Slurred speech, dysarthria, or expressive/receptive aphasia; ask the patient to repeat a simple sentence."},{"emoji":"⏱️","phrase":"T — Time (Last Known Well)","meaning":"Document the exact time the patient was last seen symptom-free; critical for determining eligibility for IV thrombolytics (tPA ≤4.5 hrs)."}]'::jsonb,
  '"Time is Brain!" For every minute ischemic stroke goes untreated, approximately 1.9 million neurons die. Rapid triage enables emergency CT scanning to differentiate ischemic from hemorrhagic stroke.',
  ARRAY['Ischemic Stroke (Thrombus or Embolus)','Hemorrhagic Stroke (Intracerebral / Subarachnoid)','Transient Ischemic Attack (TIA)'],
  'A non-contrast head CT scan must be completed IMMEDIATELY upon arrival before administering any thrombolytic medication (Alteplase/tPA) to rule out intracranial hemorrhage! Giving tPA to a hemorrhagic stroke is fatal.',
  '"Think FAST: Face, Arm, Speech, Time. Every minute saves brain tissue!"',
  'Strict exclusion criteria for tPA: symptom onset >4.5 hours ago, active bleeding, recent major surgery within 14 days, severe head trauma within 3 months, or platelet count <100,000/mm³.',
  '{"question":"A client arrives at the emergency department with sudden onset right-sided facial droop and left arm weakness. What diagnostic test must the nurse ensure is performed FIRST before initiating any reperfusion therapy?","options":["A. Lumbar puncture for cerebrospinal fluid analysis","B. Non-contrast cranial Computed Tomography (CT) scan","C. 12-lead Electrocardiogram (ECG)","D. Bilateral carotid artery Doppler ultrasound"],"answer":"B","explanation":"A non-contrast head CT scan is the absolute first diagnostic test required to distinguish ischemic stroke from hemorrhagic stroke. IV thrombolytic therapy (tPA) is strictly contraindicated in hemorrhagic stroke."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('FAST Stroke Assessment')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Shock Types & Hemodynamics',
  'C-H-A-N-D',
  'The five primary pathophysiological categories of circulatory failure and shock.',
  'Emergency Nursing',
  'Emergency',
  ARRAY['Shock','Critical Care','Emergency','Hemodynamics'],
  ARRAY['C — Cardiogenic (Pump failure: MI, CHF)','H — Hypovolemic (Fluid/Blood loss: Hemorrhage, burns)','A — Anaphylactic (Distributive: Histamine-mediated vasodilation)','N — Neurogenic (Distributive: Loss of sympathetic tone)','D — Distributive / Septic (Infection-induced vasodilation)'],
  '[{"emoji":"🫀","phrase":"C — Cardiogenic","meaning":"Heart fails to pump adequately (acute MI, cardiomyopathy); low cardiac output, elevated pulmonary wedge pressure, crackles, cool extremities."},{"emoji":"🩸","phrase":"H — Hypovolemic","meaning":"Loss of circulating intravascular volume (hemorrhage, severe vomiting/diarrhea, burns); low BP, compensatory tachycardia, flat neck veins, oliguria."},{"emoji":"🐝","phrase":"A — Anaphylactic","meaning":"Severe IgE-mediated allergic hypersensitivity; massive vasodilation, bronchial constriction, angioedema. First-line drug: Epinephrine IM 1:1,000!"},{"emoji":"🧠","phrase":"N — Neurogenic","meaning":"Spinal cord injury at or above T6; unique presentation: HYPOTENSION WITH BRADYCARDIA AND WARM, DRY SKIN (loss of sympathetic vascular tone)."},{"emoji":"🦠","phrase":"D — Distributive / Septic","meaning":"Systemic inflammatory response syndrome (SIRS) to pathogen; widespread capillary leak, vasodilation, warm flushed skin early, progressing to refractory hypotension."}]'::jsonb,
  'Shock represents inadequate tissue perfusion leading to cellular hypoxia and multi-organ dysfunction syndrome (MODS). Treatment varies dramatically depending on the underlying shock category.',
  ARRAY['Myocardial infarction (Cardiogenic)','Trauma & postpartum hemorrhage (Hypovolemic)','Peanut / Penicillin allergy (Anaphylactic)','High cervical cord trauma (Neurogenic)','Urosepsis or pneumonia bacteremia (Septic)'],
  'Neurogenic shock is the ONLY form of shock that presents with BRADYCARDIA and WARM, DRY SKIN! All other forms of shock initially present with compensatory tachycardia.',
  '"Neurogenic is cool because it has bradycardia; Anaphylactic needs Epinephrine; Hypovolemic needs fluid; Cardiogenic needs inotropes!"',
  'For Septic Shock: Draw blood cultures BEFORE starting broad-spectrum antibiotics, administer 30 mL/kg crystalloids within 3 hours, and start norepinephrine if mean arterial pressure (MAP) remains <65 mmHg.',
  '{"question":"A client involved in a motor vehicle collision with a suspected T3 spinal cord injury has a blood pressure of 82/46 mmHg, heart rate of 48 beats/min, and warm, dry extremities. Which type of shock does the nurse identify?","options":["A. Hypovolemic shock","B. Cardiogenic shock","C. Neurogenic shock","D. Septic shock"],"answer":"C","explanation":"Neurogenic shock results from disruption of descending sympathetic pathways from spinal cord injury at or above T6, leading to unopposed parasympathetic vagal stimulation. This causes a unique presentation of hypotension, bradycardia, and vasodilation with warm, dry skin."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Shock Types & Hemodynamics')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Reversible Causes of Cardiac Arrest',
  '5 H''s and 5 T''s',
  'Systematic resuscitation algorithm for identifying reversible causes of PEA and Asystole.',
  'Emergency Nursing',
  'Emergency',
  ARRAY['ACLS','Cardiac Arrest','CPR','Emergency','Resuscitation'],
  ARRAY['5 H''s: Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia','5 T''s: Tension pneumothorax, Tamponade (Cardiac), Toxins, Thrombosis (Pulmonary), Thrombosis (Coronary)'],
  '[{"emoji":"🩸","phrase":"Hypovolemia","meaning":"Most common cause of PEA arrest; infuse rapid IV fluid bolus or blood products."},{"emoji":"🫁","phrase":"Hypoxia","meaning":"Ensure patent airway, confirm endotracheal tube placement, deliver 100% oxygen."},{"emoji":"🧪","phrase":"Hydrogen Ion (Acidosis)","meaning":"Provide adequate ventilation to blow off CO2; administer sodium bicarbonate if severe metabolic acidosis."},{"emoji":"⚡","phrase":"Hypo / Hyperkalemia","meaning":"Tall peaked T-waves or flat T-waves with U-waves; administer calcium gluconate, insulin/glucose for hyperkalemia; infuse K+ for hypokalemia."},{"emoji":"❄️","phrase":"Hypothermia","meaning":"Patient core temp <30°C; initiate active rewarming before pronouncing death (\"not dead until warm and dead\")."},{"emoji":"💥","phrase":"Tension Pneumothorax","meaning":"Tracheal deviation, absent breath sounds, distended neck veins; perform immediate needle decompression at 2nd intercostal space."},{"emoji":"🫀","phrase":"Tamponade (Cardiac)","meaning":"Beck''s triad (muffled heart sounds, JVD, hypotension); perform emergent pericardiocentesis."},{"emoji":"☠️","phrase":"Toxins","meaning":"Overdose (opioids, beta-blockers, CCBs, tricyclics); administer specific antidotes (naloxone, glucagon, calcium, bicarbonate)."},{"emoji":"🫁","phrase":"Thrombosis (Pulmonary Embolus)","meaning":"Massive PE obstructing right ventricular outflow; administer IV thrombolytics or prepare for embolectomy."},{"emoji":"💔","phrase":"Thrombosis (Coronary / MI)","meaning":"Massive STEMI with coronary occlusion; post-resuscitation emergent percutaneous coronary intervention (PCI)."}]'::jsonb,
  'In Pulseless Electrical Activity (PEA) and Asystole, defibrillation is ineffective. Identifying and treating one of the 5 H''s or 5 T''s is the ONLY pathway to achieve Return of Spontaneous Circulation (ROSC).',
  ARRAY['Cardiac arrest','Pulseless electrical activity (PEA)','Asystole','Trauma resuscitation'],
  'NEVER shock (defibrillate) Asystole or PEA! Only Ventricular Fibrillation (VF) and Pulseless Ventricular Tachycardia (pVT) are shockable rhythms. In PEA and asystole: high-quality CPR + Epinephrine 1 mg every 3–5 min + search for the 5 H''s and 5 T''s.',
  '"In PEA, you cannot shock. Search the 5 H''s and 5 T''s around the clock!"',
  'Hypovolemia is the single most common cause of PEA arrest. When in doubt during PEA resuscitation, hang a wide-open bolus of isotonic crystalloids.',
  '{"question":"During a code blue, the monitor displays a sinus rhythm at 72 bpm, but the carotid pulse is absent. What is the priority nursing intervention for this Pulseless Electrical Activity (PEA)?","options":["A. Deliver an unsynchronized shock at 200 Joules","B. Continue chest compressions, give epinephrine, and investigate the 5 H''s and 5 T''s","C. Administer IV atropine 1 mg immediately","D. Prepare for synchronized cardioversion"],"answer":"B","explanation":"PEA is a non-shockable rhythm. The electrical system works, but there is no mechanical cardiac contraction, usually due to a reversible underlying problem (the 5 H''s and 5 T''s). The correct response is high-quality CPR, Epinephrine, and finding the reversible cause."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Reversible Causes of Cardiac Arrest')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Heart Failure: Left vs. Right',
  'L = Lungs, R = Rest of Body',
  'Differentiating clinical features and hemodynamics of left-sided vs. right-sided ventricular failure.',
  'Cardiovascular',
  'Med-Surgical',
  ARRAY['Cardiology','Heart Failure','Assessment','Med-Surg'],
  ARRAY['Left-sided = Lungs (Pulmonary congestion, crackles, orthopnea)','Right-sided = Rest of the Body (JVD, peripheral edema, ascites)'],
  '[{"emoji":"🫁","phrase":"Left-Sided Failure (L = Lungs)","meaning":"Left ventricle fails to pump forward; backward backup of blood into pulmonary veins causes pulmonary congestion, dyspnea, orthopnea, paroxysmal nocturnal dyspnea (PND), bibasilar crackles, and pink frothy sputum."},{"emoji":"🦵","phrase":"Right-Sided Failure (R = Rest of Body)","meaning":"Right ventricle fails; blood backs up into the systemic venous circulation, causing jugular venous distension (JVD), dependent bilateral pitting edema, hepatomegaly, ascites, and unexplained weight gain."}]'::jsonb,
  'Heart failure affects millions worldwide. The most common cause of right-sided heart failure is longstanding left-sided heart failure.',
  ARRAY['Coronary artery disease / MI (Left failure)','Hypertension (Left failure)','COPD / Cor Pulmonale (Right failure)','Valvular disease (Aortic/Mitral stenosis)'],
  'Pink, frothy sputum is a life-threatening sign of ACUTE PULMONARY EDEMA from left-sided heart failure! Position patient in High-Fowler''s with legs dangling over the bed (reduces venous return) and administer furosemide + oxygen.',
  '"Left ventricle backs up into the Lungs; Right ventricle backs up into the Rest of the body."',
  'Weigh heart failure patients daily in the morning after voiding and before breakfast. Instruct them to report a weight gain of >2 lbs (1 kg) overnight or >5 lbs (2.3 kg) in a week.',
  '{"question":"A client with heart failure presents with jugular venous distension (JVD), 3+ bilateral pretibial pitting edema, and an enlarged liver. Which pathophysiological condition explains these findings?","options":["A. Left ventricular systolic failure","B. Right ventricular failure","C. Mitral valve prolapse","D. Acute aortic regurgitation"],"answer":"B","explanation":"Systemic venous congestion—manifested as JVD, dependent peripheral edema, and hepatomegaly—is the hallmark of right-sided heart failure. Left-sided failure presents with pulmonary symptoms (crackles, dyspnea)."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Heart Failure: Left vs. Right')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Infective Endocarditis Signs',
  'F-R-O-M J-A-N-E',
  'Peripheral manifestations and diagnostic criteria for infective endocarditis.',
  'Cardiovascular',
  'Med-Surgical',
  ARRAY['Cardiology','Endocarditis','Infection','Med-Surg'],
  ARRAY['F — Fever & chills','R — Roth spots (Retinal hemorrhages with pale centers)','O — Osler nodes (PAINFUL nodules on pads of fingers & toes)','M — Murmur (New or changing cardiac murmur)','J — Janeway lesions (PAINLESS red macules on palms & soles)','A — Anemia','N — Nail splinter hemorrhages (Linear brown streaks in nails)','E — Emboli (Septic emboli to brain, lungs, kidneys)'],
  '[{"emoji":"🌡️","phrase":"F — Fever","meaning":"Persistent low-grade or high-grade fever with night sweats and fatigue."},{"emoji":"👁️","phrase":"R — Roth Spots","meaning":"Oval retinal hemorrhages with pale or white centers visualized on fundoscopic ophthalmic examination."},{"emoji":"🖐️","phrase":"O — Osler Nodes (Ouch!)","meaning":"PAINFUL, erythematous, raised nodules located on the pads of fingers and toes caused by immune complex deposition."},{"emoji":"💓","phrase":"M — Murmur","meaning":"A new or worsening cardiac murmur caused by vegetative damage or perforation of heart valve leaflets."},{"emoji":"🦶","phrase":"J — Janeway Lesions","meaning":"PAINLESS, flat, red or hemorrhagic macules on the palms and soles caused by septic microemboli."},{"emoji":"🩸","phrase":"A — Anemia","meaning":"Normocytic normochromic anemia of chronic disease paired with elevated inflammatory markers (ESR, CRP)."},{"emoji":"💅","phrase":"N — Nail Splinter Hemorrhages","meaning":"Thin, dark red to linear black splinter-like hemorrhages under the fingernails or toenails."},{"emoji":"🎯","phrase":"E — Emboli","meaning":"Vegetations dislodge into the circulation causing stroke, splenic infarction, renal infarction, or pulmonary emboli."}]'::jsonb,
  'Infective endocarditis colonizes heart valves, particularly in clients with prosthetic valves, congenital defects, or history of IV drug use. Requires 4–6 weeks of IV bactericidal antibiotic therapy.',
  ARRAY['Staphylococcus aureus bacteremia','Streptococcus viridans (oral flora after dental procedures)','Prosthetic heart valve contamination','Intravenous drug use (IVDU — typically affects tricuspid valve)'],
  'Don''t confuse Osler nodes with Janeway lesions! Osler nodes = "O" for "Ouch!" (PAINFUL). Janeway lesions = "J" for "Just painless" (PAINLESS). High-risk dental procedures require antibiotic prophylaxis (Amoxicillin 2g PO 30–60 min prior).',
  '"Osler nodes OUCH; Janeway lesions are plain. Endocarditis comes FROM JANE!"',
  'Always collect three sets of blood cultures drawn from different venipuncture sites at least 1 hour apart BEFORE administering the first dose of antibiotics.',
  '{"question":"A nurse assesses a client suspected of having infective endocarditis. The client has painful, erythematous nodules on the pads of their fingers. Which clinical sign does the nurse document?","options":["A. Janeway lesions","B. Osler nodes","C. Roth spots","D. Splinter hemorrhages"],"answer":"B","explanation":"Osler nodes are painful, tender, raised erythematous nodules on the pads of the fingers and toes (remember: \"O\" for Osler = \"Ouch\"). Janeway lesions are painless macules on palms and soles."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Infective Endocarditis Signs')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'SAMPLE History in Emergency Triage',
  'S-A-M-P-L-E',
  'Rapid, structured medical history collection framework for emergency and trauma patients.',
  'Emergency Nursing',
  'Emergency',
  ARRAY['Triage','Emergency','Assessment','Trauma'],
  ARRAY['S — Signs & Symptoms (Chief complaint & objective findings)','A — Allergies (Medications, latex, food, iodine)','M — Medications (Prescriptions, OTC, herbal supplements)','P — Past medical & surgical history','L — Last oral intake (Time and nature of food/fluid)','E — Events leading to the injury or illness'],
  '[{"emoji":"🩺","phrase":"S — Signs & Symptoms","meaning":"What the patient reports feeling (subjective) and what the nurse measures (vitals, bleeding, deformities)."},{"emoji":"🚫","phrase":"A — Allergies","meaning":"Screen for antibiotic, anesthetic, iodine/contrast, and latex allergies before initiating emergency interventions."},{"emoji":"💊","phrase":"M — Medications","meaning":"Current prescriptions, anticoagulants (blood thinners), insulin, antihypertensives, and compliance."},{"emoji":"📋","phrase":"P — Past Medical History","meaning":"Chronic medical conditions (hypertension, diabetes, asthma, seizures) and previous surgical procedures."},{"emoji":"🍽️","phrase":"L — Last Oral Intake","meaning":"Crucial for determining gastric aspiration risk if the patient requires emergency endotracheal intubation or surgery under anesthesia."},{"emoji":"💥","phrase":"E — Events Leading to Injury","meaning":"Mechanism of injury (e.g., fall height, speed of vehicular impact, seatbelt use, sequence of symptoms)."}]'::jsonb,
  'Standardized framework used in pre-hospital, triage, and trauma bays to gather essential clinical data in under 2 minutes without missing critical life-safety details.',
  ARRAY['Trauma bay resuscitation','Emergency triage','Acute medical presentations','Pre-operative emergency surgical assessment'],
  'In trauma scenarios, ''L'' (Last oral intake) is critical because general anesthesia requires an empty stomach to prevent pulmonary aspiration of gastric contents. If surgery is emergent, the anesthesia team must perform Rapid Sequence Intubation (RSI) with cricoid pressure.',
  '"Collect a quick SAMPLE: Symptoms, Allergies, Meds, Past history, Last meal, and Events!"',
  'Pair the SAMPLE history with the primary ABCDE assessment. Always prioritize life-saving airway and breathing interventions before completing the secondary SAMPLE history.',
  '{"question":"A trauma client who was involved in an industrial machinery accident is being prepared for emergent exploratory laparotomy. In the SAMPLE history, which information is most critical for the anesthesia provider?","options":["A. Last oral intake","B. Primary school vaccination history","C. Paternal family history of hypertension","D. Exact speed of the industrial machine"],"answer":"A","explanation":"The time of last oral intake (L in SAMPLE) is vital for the anesthesia team to determine aspiration risk during induction of general anesthesia, allowing them to implement appropriate airway protection precautions."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('SAMPLE History in Emergency Triage')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Rule of Nines for Adult Burns',
  'Rule of 9s',
  'Standard clinical method for estimating Total Body Surface Area (TBSA) burned in adults.',
  'Emergency Nursing',
  'Med-Surgical',
  ARRAY['Burns','Emergency','Calculation','Med-Surg','Trauma'],
  ARRAY['Head & Neck = 9% (4.5% front, 4.5% back)','Anterior Torso = 18% (Chest 9%, Abdomen 9%)','Posterior Torso = 18% (Upper back 9%, Lower back 9%)','Each Upper Extremity = 9% (4.5% front, 4.5% back) × 2 = 18%','Each Lower Extremity = 18% (9% front, 9% back) × 2 = 36%','Perineum & Genitalia = 1%'],
  '[{"emoji":"👤","phrase":"Head & Neck = 9%","meaning":"Entire head and neck is 9% (anterior face is 4.5%, posterior scalp/neck is 4.5%)."},{"emoji":"👕","phrase":"Chest & Abdomen = 18%","meaning":"Anterior torso is 18% (chest 9%, abdomen 9%)."},{"emoji":"🛡️","phrase":"Back & Buttocks = 18%","meaning":"Posterior torso is 18% (upper back 9%, lower back and buttocks 9%)."},{"emoji":"💪","phrase":"Each Arm = 9%","meaning":"Each arm is 9% total (anterior 4.5%, posterior 4.5%). Both arms = 18%."},{"emoji":"🦵","phrase":"Each Leg = 18%","meaning":"Each leg is 18% total (anterior leg 9%, posterior leg 9%). Both legs = 36%."},{"emoji":"🩲","phrase":"Perineum = 1%","meaning":"Genitalia and perineum account for 1% of total body surface area."}]'::jsonb,
  'Accurate TBSA estimation determines fluid resuscitation requirements using the Parkland Formula, admission to specialized burn units, and morbidity/mortality risk.',
  ARRAY['Thermal burns (flame, scald)','Chemical burns','Electrical burns','Flash burns'],
  'CRITICAL RULE: First-degree burns (superficial burns like sunburn that are red and non-blistered) are NEVER INCLUDED in the TBSA calculation! Only 2nd-degree (partial thickness) and 3rd-degree (full thickness) burns are counted.',
  '"Head 9, Arms 9 each, Torso 18 front + 18 back, Legs 18 each, and 1 for the perineum!"',
  'For irregular, scattered burn areas, the patient''s palm (including fingers) represents approximately 1% of their total body surface area.',
  '{"question":"An adult client sustained second-degree burns to the entire anterior chest, entire anterior abdomen, and the entire circumference of both arms. Using the Rule of Nines, what is the estimated % TBSA burned?","options":["A. 27%","B. 36%","C. 45%","D. 54%"],"answer":"B","explanation":"Anterior chest = 9%, anterior abdomen = 9% (total anterior torso = 18%). Each complete arm = 9% (both arms = 18%). Total TBSA = 18% + 18% = 36%."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Rule of Nines for Adult Burns')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Parkland Formula for Burn Resuscitation',
  '4 mL × kg × % TBSA',
  'Gold-standard fluid resuscitation calculation for the first 24 hours post-burn injury.',
  'Emergency Nursing',
  'Emergency',
  ARRAY['Burns','Fluid Resuscitation','Calculations','Emergency'],
  ARRAY['Total 24h Fluid = 4 mL × Weight (kg) × % TBSA burned','First 8 hours: Administer 50% (half) of total volume','Next 16 hours: Administer remaining 50% divided evenly'],
  '[{"emoji":"🧮","phrase":"Formula: 4 mL × kg × % TBSA","meaning":"Multiply 4 mL by patient weight in kilograms by the percentage of partial and full-thickness burn area (do not convert % to decimal, e.g., use 30, not 0.30)."},{"emoji":"⏱️","phrase":"Timing is from INJURY, not hospital arrival","meaning":"The first 8-hour window begins at the EXACT TIME THE BURN OCCURRED. If 2 hours elapsed before arrival, the first half must be given over the remaining 6 hours!"},{"emoji":"💧","phrase":"Fluid of Choice: Lactated Ringer''s (LR)","meaning":"Isotonic crystalloid that mirrors physiological serum electrolytes and buffers metabolic acidosis."},{"emoji":"🚽","phrase":"Titration by Urine Output","meaning":"The most reliable indicator of adequate resuscitation is maintaining urine output at 0.5 to 1.0 mL/kg/hr (30–50 mL/hr in an adult)."}]'::jsonb,
  'Massive burn injury causes extensive capillary leak, severe hypovolemic burn shock, and hemoconcentration. Prompt fluid replacement prevents acute tubular necrosis and hypovolemic death.',
  ARRAY['Major thermal burns (>20% TBSA)','Inhalation burns with cutaneous injury','Chemical burn shock'],
  'The #1 exam trap is the clock! The first 8-hour period starts from the TIME OF INJURY, NOT the time of admission to the hospital or emergency room! If the burn happened at 10:00 and the client arrives at 12:00, give 50% of fluids in the remaining 6 hours.',
  '"4 mL × kg × % TBSA. Half in the first 8 hours FROM THE BURN, half in the next 16 hours!"',
  'Avoid fluid over-resuscitation, which leads to pulmonary edema, abdominal compartment syndrome, and burn edema worsening.',
  '{"question":"A 70 kg client sustained 40% TBSA burns at 12:00 and arrives at the emergency department at 14:00. Using the Parkland formula (4 mL/kg/% TBSA), at what rate should the IV fluid be infused over the remaining 6 hours of the initial 8-hour period?","options":["A. 700 mL/hr","B. 933 mL/hr","C. 1,400 mL/hr","D. 1,866 mL/hr"],"answer":"B","explanation":"Total 24h volume = 4 mL × 70 kg × 40 = 11,200 mL. Half (5,600 mL) must be infused in the first 8 hours from injury. Since 2 hours have already elapsed, the 5,600 mL must be infused over the remaining 6 hours: 5,600 mL ÷ 6 hours = 933.3 mL/hr."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Parkland Formula for Burn Resuscitation')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'PQRST Pain Assessment',
  'P-Q-R-S-T',
  'Systematic multidimensional assessment method for characterization of client pain.',
  'Med-Surgical',
  'Med-Surgical',
  ARRAY['Pain Assessment','Vital Signs','Fundamentals','Med-Surg'],
  ARRAY['P — Provoking / Palliating factors (What triggers or relieves pain?)','Q — Quality (Sharp, dull, burning, aching, crushing)','R — Region & Radiation (Where is it and where does it spread?)','S — Severity (Standardized 0–10 numeric scale)','T — Timing (Onset, duration, constant vs intermittent)'],
  '[{"emoji":"🔍","phrase":"P — Provocation / Palliation","meaning":"What causes the pain? What makes it better (rest, positioning, medication) or worse (movement, breathing, eating)?"},{"emoji":"🔪","phrase":"Q — Quality","meaning":"Client''s description of pain characteristics: stabbing, crushing, burning, throbbing, dull ache, cramping."},{"emoji":"📍","phrase":"R — Region & Radiation","meaning":"Exact anatomical location of the primary pain and where it radiates (e.g., cardiac pain radiating to jaw and left arm)."},{"emoji":"🔢","phrase":"S — Severity Scale","meaning":"Quantified using a validated rating tool (0 to 10 numeric rating scale, Wong-Baker FACES scale, FLACC scale in infants)."},{"emoji":"⏱️","phrase":"T — Timing & Duration","meaning":"When did it start? How long does an episode last? Is it constant or intermittent? Does it wake the client at night?"}]'::jsonb,
  'Pain is considered the "5th Vital Sign." Comprehensive assessment guides immediate differential diagnosis (e.g., ischemic chest pain vs musculoskeletal vs pleuritic) and verifies analgesic effectiveness.',
  ARRAY['Myocardial infarction','Acute surgical abdomen','Fracture / Trauma','Neuropathic pain','Post-operative recovery'],
  'Pain is always subjective! The client''s self-report is the single most reliable indicator of pain intensity. Never assume a patient who is laughing, talking, or on their phone is pain-free.',
  '"PQRST dissects every pain: Provoke, Quality, Region, Severity, and Time!"',
  'Always reassess pain within 30 minutes after intravenous analgesic administration and within 60 minutes after oral pain medication.',
  '{"question":"A client clutching their chest describes pain as \"a heavy elephant sitting on my chest that shoots down my left arm.\" Which components of the PQRST mnemonic has the client described?","options":["A. Provocation and Timing","B. Quality and Region/Radiation","C. Severity and Palliation","D. Timing and Severity"],"answer":"B","explanation":"\"Heavy elephant sitting on chest\" describes the Quality of the pain, while \"shoots down my left arm\" describes the Region and Radiation."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('PQRST Pain Assessment')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Chest Tube Drainage Chambers',
  'D-W-S',
  'Structure, function, and normal vs. abnormal findings in 3-chamber chest drainage systems.',
  'Respiratory',
  'Med-Surgical',
  ARRAY['Chest Tube','Respiratory','Pneumothorax','Critical Care'],
  ARRAY['D — Drainage collection chamber (Monitor color, volume, rate)','W — Water seal chamber (Tidaling normal; continuous bubbling = LEAK)','S — Suction control chamber (Gentle continuous bubbling is normal)'],
  '[{"emoji":"🧪","phrase":"D — Drainage Collection Chamber","meaning":"Receives blood, pus, or serous fluid from the pleural space; mark volume with date and time; notify MD if drainage exceeds 70–100 mL/hr of bright red blood."},{"emoji":"💧","phrase":"W — Water Seal Chamber","meaning":"Filled with 2 cm of sterile water acting as a one-way valve. Tidaling (water level rises with inhalation and falls with exhalation in spontaneous breathing) is NORMAL. CONTINUOUS BUBBLING = AIR LEAK in the system!"},{"emoji":"💨","phrase":"S — Suction Control Chamber","meaning":"Controls suction level (typically -20 cm H2O). In a wet suction system, GENTLE CONTINUOUS BUBBLING is normal and expected."}]'::jsonb,
  'Restores negative intrapleural pressure to re-expand a collapsed lung in pneumothorax, hemothorax, or following thoracic and cardiac surgery.',
  ARRAY['Pneumothorax','Hemothorax','Pleural effusion','Empyema','Post-thoracotomy / Post-CABG'],
  'Students frequently confuse bubbling in the Water Seal vs Suction Control! Continuous bubbling in the WATER SEAL chamber = AIR LEAK (abnormal)! Continuous bubbling in the SUCTION CONTROL chamber = NORMAL operation. Never clamp a chest tube routinely (causes tension pneumothorax)!',
  '"Tidaling in water seal is breathing. Bubbling in water seal is leaking. Bubbling in suction is working!"',
  'If a chest tube becomes accidentally disconnected from the drainage unit, immediately submerge the end of the tube in 1 inch of sterile water to re-establish a water seal!',
  '{"question":"While caring for a client with a chest tube connected to a closed drainage system, the nurse notes continuous vigorous bubbling in the water seal chamber. What is the nurse''s interpretation?","options":["A. The lung has completely re-expanded","B. The suction pressure is set correctly","C. There is an active air leak in the system","D. The client is breathing spontaneously"],"answer":"C","explanation":"Continuous bubbling in the water seal chamber indicates an air leak, either from the client''s lung or from a loose connection in the tubing. Normal water seal shows tidaling (fluctuation with breathing) with only intermittent bubbling on expiration."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Chest Tube Drainage Chambers')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Acute Blood Transfusion Reaction',
  'S-T-O-P',
  'Immediate sequential nursing protocol for suspected hemolytic or acute transfusion reactions.',
  'Emergency Nursing',
  'Emergency',
  ARRAY['Blood Transfusion','Hematology','Emergency','Safety'],
  ARRAY['S — STOP the transfusion immediately!','T — Tubing disconnected at hub & flush with new NS line','O — Observe vitals, airway, and notify doctor & blood bank','P — Package & return blood bag, tubing, and samples to lab'],
  '[{"emoji":"🛑","phrase":"S — STOP Transfusion","meaning":"In any suspected reaction (fever, chills, low back pain, tachycardia, urticaria, dyspnea), stop the blood infusion IMMEDIATELY!"},{"emoji":"💉","phrase":"T — Tubing Disconnected","meaning":"Disconnect blood tubing at the IV cannula hub; connect a clean normal saline bag with completely NEW IV tubing to maintain IV access without infusing residual blood in the line."},{"emoji":"🩺","phrase":"O — Observe & Notify","meaning":"Monitor vital signs every 5–15 minutes, maintain airway and oxygenation, and notify both the physician and the hospital blood bank."},{"emoji":"📦","phrase":"P — Package & Return to Lab","meaning":"Send the remaining blood product bag, tubing, filter, and freshly collected blood/urine samples to the blood bank for repeat crossmatch and hemoglobinuria testing."}]'::jsonb,
  'Acute hemolytic transfusion reaction caused by ABO incompatibility causes massive intravascular hemolysis, DIC, shock, and acute renal failure. Even small volumes (30–50 mL) can be fatal.',
  ARRAY['ABO incompatibility (human verification error)','Febrile non-hemolytic reaction','Allergic / Anaphylactic reaction','Transfusion-Related Acute Lung Injury (TRALI)','Transfusion-Associated Circulatory Overload (TACO)'],
  'Never flush the blood tubing with saline into the patient when a reaction occurs! Doing so pushes the remaining incompatible blood in the tubing directly into the patient. Disconnect the tubing at the catheter hub and connect a brand-new normal saline infusion set.',
  '"STOP the blood, disconnect at the hub, save the vein with new saline, and send the bag back to the lab!"',
  'Stay with the patient and monitor vital signs closely for the first 15 minutes of any transfusion; this is when life-threatening hemolytic reactions most commonly manifest.',
  '{"question":"Ten minutes after initiating a unit of packed red blood cells, a client complains of severe low back pain, fever of 38.9°C, and chills. What is the nurse''s FIRST action?","options":["A. Slow the infusion rate and administer acetaminophen","B. Stop the transfusion immediately","C. Flush the blood tubing with 50 mL of normal saline","D. Administer diphenhydramine and continue observing"],"answer":"B","explanation":"Low back pain, fever, and chills during transfusion are classic hallmarks of an acute hemolytic reaction. The immediate priority is to stop the transfusion instantly to prevent further infusion of incompatible blood."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Acute Blood Transfusion Reaction')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Autonomic Dysreflexia',
  'S-P-I-N-E',
  'Pathophysiology, triggers, and emergency nursing response for autonomic hyperreflexia.',
  'Neurology',
  'Neurology',
  ARRAY['Spinal Cord Injury','Neurology','Emergency','Hypertension'],
  ARRAY['S — Sudden severe hypertension & Bradycardia','P — Pounding headache & Profuse diaphoresis above lesion','I — Immediate elevation of Head of Bed to 90 degrees','N — Noxious stimulus search (Bladder, Bowel, Tight clothing)','E — Ensure stimulus removal & notify provider'],
  '[{"emoji":"📈","phrase":"S — Sudden Severe Hypertension","meaning":"Occurs in spinal cord injuries at or above T6; massive uninhibited sympathetic response below lesion causes malignant hypertension (SBP 200–300 mmHg)."},{"emoji":"🤕","phrase":"P — Pounding Headache","meaning":"Severe throbbing headache, blurred vision, nasal congestion, and profuse sweating with skin flushing ABOVE the level of the spinal lesion."},{"emoji":"🛏️","phrase":"I — Immediate Elevation of HOB","meaning":"Immediately place client in High-Fowler''s position (sitting upright 90°) with legs dangling to pool blood in lower extremities and lower intracranial pressure."},{"emoji":"🔍","phrase":"N — Noxious Stimulus Search","meaning":"Check the 3 B''s: Bladder distension / kinked catheter (#1 cause, 80%), Bowel impaction (#2 cause), and Bedding/clothing (constricting garments, wrinkles, ingrown toenail)."},{"emoji":"⚡","phrase":"E — Ensure Immediate Relief","meaning":"Unkink or insert Foley catheter, perform gentle digital rectal exam with anesthetic jelly, loosen constricting clothes, and administer antihypertensive (nifedipine/nitropaste) if SBP remains high."}]'::jsonb,
  'Medical emergency in individuals with spinal cord injury at or above T6. Unchecked hypertension can precipitate retinal hemorrhage, hypertensive encephalopathy, intracranial hemorrhage (stroke), or death.',
  ARRAY['Full or distended urinary bladder (most common)','Blocked or kinked Foley catheter','Fecal impaction','Tight abdominal binders or elastic stockings','Pressure ulcers or burn on paralyzed skin'],
  'The FIRST action is ALWAYS to sit the patient upright (High-Fowler''s) to use gravity to lower blood pressure, BEFORE searching for the full bladder! Elevate the bed first, then check the catheter.',
  '"Sit them up right now! Check the Bladder, check the Bowel, check the Clothes!"',
  'If blood pressure remains dangerously elevated after emptying the bladder and clearing the bowel, administer prescribed sublingual nifedipine or topical nitroglycerin paste.',
  '{"question":"A client with a complete T4 spinal cord injury suddenly reports a severe, throbbing headache. The nurse notes diaphoresis and flushing on the client''s face and neck, with a blood pressure of 210/110 mmHg. What should the nurse do FIRST?","options":["A. Palpate the bladder for distension","B. Place the client in a high-Fowler''s (sitting upright) position","C. Administer sublingual nifedipine","D. Perform a digital rectal examination"],"answer":"B","explanation":"The client is experiencing Autonomic Dysreflexia. The immediate first nursing action is to elevate the head of the bed to 90 degrees (high-Fowler''s) to promote orthostatic venous pooling and decrease blood pressure, then immediately check for bladder distension."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Autonomic Dysreflexia')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Parkinson''s Disease Cardinal Signs',
  'T-R-A-P',
  'The four cardinal motor features of Parkinson''s disease resulting from dopamine deficiency.',
  'Neurology',
  'Neurology',
  ARRAY['Parkinsons','Neurology','Geriatrics','Movement Disorders'],
  ARRAY['T — Tremor at rest ("Pill-rolling" tremor)','R — Rigidity ("Cogwheel" or lead-pipe resistance)','A — Akinesia / Bradykinesia (Slowness of movement)','P — Postural instability (Loss of balance & shuffling gait)'],
  '[{"emoji":"👋","phrase":"T — Tremor at Rest","meaning":"Unilateral resting tremor, classically described as \"pill-rolling\" involving the thumb and index finger; disappears during voluntary movement and sleep."},{"emoji":"🦾","phrase":"R — Rigidity","meaning":"Involuntary stiffness and resistance to passive range of motion, exhibiting jerky \"cogwheel\" rigidity or uniform \"lead-pipe\" resistance."},{"emoji":"🐢","phrase":"A — Akinesia / Bradykinesia","meaning":"Slowness of movement, difficulty initiating voluntary movement, masked facial expression (hypomimia), reduced blinking, and micrographic handwriting."},{"emoji":"🚶","phrase":"P — Postural Instability","meaning":"Impaired balance reflexes, stooped forward posture, festinating shuffling gait, and high propensity for falls."}]'::jsonb,
  'Parkinson''s disease stems from idiopathic degeneration of dopamine-producing neurons in the substantia nigra of the basal ganglia, leading to an imbalance with acetylcholine.',
  ARRAY['Idiopathic neurodegeneration','Dopamine-blocking drug-induced parkinsonism','Post-encephalitic parkinsonism','Repeated head trauma (dementia pugilistica)'],
  'Clients taking Carbidopa-Levodopa must avoid high-protein meals at medication administration time because amino acids compete with levodopa for transport across the blood-brain barrier! Also, warn them that urine and saliva may turn harmlessly dark red, brown, or black.',
  '"Parkinson''s traps the patient in their body: Tremor, Rigidity, Akinesia, Postural instability (TRAP)!"',
  'Teach clients to overcome "freezing" gait episodes by pretending to step over an imaginary line on the floor or rocking side to side before walking.',
  '{"question":"A nurse assesses a client newly diagnosed with Parkinson''s disease. Which observation best exemplifies the feature of bradykinesia?","options":["A. A rhythmic pill-rolling tremor of the hands while resting in a chair","B. Jerky ratchet-like resistance when passively flexing the client''s elbow","C. Slow, shuffling gait with loss of spontaneous arm swing and a masked facial expression","D. Loss of balance when gently pulled backward by the examiner"],"answer":"C","explanation":"Bradykinesia is characterized by slowness of voluntary movement, lack of spontaneous movements (e.g., absent arm swing while walking), micrographic writing, and a fixed, mask-like facial expression."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Parkinson''s Disease Cardinal Signs')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Hypokalemia Signs & Symptoms',
  'The 6 L''s',
  'Clinical manifestations of serum potassium depletion (<3.5 mEq/L).',
  'Endocrine',
  'Med-Surgical',
  ARRAY['Potassium','Electrolytes','Cardiology','ECG','Fluids'],
  ARRAY['L — Lethargy & confusion','L — Low, shallow respirations','L — Lethal cardiac dysrhythmias (U-waves, flat T-waves)','L — Leg cramps & muscle weakness','L — Limp muscles (Hyporeflexia & flaccid paralysis)','L — Low bowel motility (Constipation & paralytic ileus)'],
  '[{"emoji":"🥱","phrase":"L — Lethargy","meaning":"Generalized fatigue, drowsiness, confusion, and psychological depression."},{"emoji":"😮‍💨","phrase":"L — Low Shallow Respirations","meaning":"Weakness of diaphragm and intercostal respiratory muscles can cause hypoventilation and respiratory arrest."},{"emoji":"💓","phrase":"L — Lethal Cardiac Dysrhythmias","meaning":"ECG changes: flattened or inverted T-waves, ST depression, prominent U-waves, premature ventricular contractions (PVCs), and ventricular tachycardia."},{"emoji":"🦵","phrase":"L — Leg Cramps","meaning":"Cramping and spasms in calf muscles and extremities, progressing to painful myalgias."},{"emoji":"🪢","phrase":"L — Limp Muscles","meaning":"Skeletal muscle weakness, decreased deep tendon reflexes, and flaccid paralysis."},{"emoji":"💩","phrase":"L — Low Bowel Motility","meaning":"Smooth muscle hypomotility causes abdominal distension, absent bowel sounds, constipation, and paralytic ileus."}]'::jsonb,
  'Potassium is the major intracellular cation. Hypokalemia increases susceptibility to digitalis toxicity and triggers fatal ventricular arrhythmias.',
  ARRAY['Loop and thiazide diuretic therapy (Furosemide, HCTZ)','Gastrointestinal losses (vomiting, diarrhea, NG suction)','Hyperaldosteronism','Diabetic ketoacidosis treatment with insulin without K+ replacement'],
  'CRITICAL SAFETY RULE: NEVER, UNDER ANY CIRCUMSTANCES, ADMINISTER POTASSIUM CHLORIDE VIA IV PUSH, IM, OR SC INJECTION! IV push potassium causes instant fatal cardiac arrest! IV potassium must ALWAYS be diluted and infused via an electronic infusion pump at a maximum rate of 10–20 mEq/hr.',
  '"Low potassium leaves you Limp and Low, with Lethal dysrhythmias and U-waves on the ECG!"',
  'If hypokalemia is refractory to potassium replacement, check serum MAGNESIUM! Hypomagnesemia prevents renal conservation of potassium; you cannot fix hypokalemia until magnesium is corrected.',
  '{"question":"A client taking furosemide has a serum potassium level of 2.9 mEq/L. Which cardiac monitor finding should the nurse anticipate observing?","options":["A. Tall, peaked T-waves and widened QRS complex","B. Flattened T-waves and prominent U-waves","C. Shortened PR interval with absent P-waves","D. Elevated ST segments across all precordial leads"],"answer":"B","explanation":"Hypokalemia causes characteristic ECG changes including flattened or inverted T-waves, ST-segment depression, and the appearance of prominent U-waves following the T-wave. Tall, peaked T-waves are seen in hyperkalemia."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Hypokalemia Signs & Symptoms')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Hyperkalemia Causes & ECG Changes',
  'M-A-C-H-I-N-E',
  'Etiology, pathognomonic ECG progression, and emergency stabilization for hyperkalemia (>5.0 mEq/L).',
  'Endocrine',
  'Med-Surgical',
  ARRAY['Potassium','Electrolytes','Cardiology','ECG','Renal'],
  ARRAY['M — Medications (ACE inhibitors, ARBs, Spironolactone, NSAIDs)','A — Acidosis (Metabolic acidosis shifts K+ out of cells)','C — Cellular destruction (Burns, crush injury, rhabdomyolysis)','H — Hypoaldosteronism (Addison''s disease)','I — Intake excessive (Potassium supplements, salt substitutes)','N — Nephron / Renal failure (Decreased GFR & excretion)','E — Excretion impaired'],
  '[{"emoji":"💊","phrase":"M — Medications","meaning":"ACE inhibitors, ARBs, potassium-sparing diuretics, and NSAIDs suppress aldosterone and impair potassium excretion."},{"emoji":"🧪","phrase":"A — Acidosis","meaning":"Excess hydrogen ions enter cells to buffer serum acidosis, forcing potassium out into the extracellular space."},{"emoji":"💥","phrase":"C — Cellular Destruction","meaning":"Major burns, trauma, crush injuries, and tumor lysis syndrome cause necrotic cells to rupture and spill high intracellular potassium."},{"emoji":"🦋","phrase":"H — Hypoaldosteronism","meaning":"Addison''s disease causes lack of aldosterone, leading to renal potassium retention and sodium wasting."},{"emoji":"🧂","phrase":"I — Intake Excessive","meaning":"Excessive IV potassium infusion or liberal use of potassium chloride salt substitutes."},{"emoji":"🫘","phrase":"N & E — Nephron Impairment","meaning":"Oliguric acute kidney injury and chronic end-stage kidney disease fail to excrete daily dietary potassium."}]'::jsonb,
  'Severe hyperkalemia (>6.5 mEq/L) causes progressive cardiac conduction blocks, sine wave patterns, ventricular fibrillation, and cardiac standstill.',
  ARRAY['End-stage renal disease (ESRD)','Rhabdomyolysis','Spironolactone / ACE inhibitor toxicity','Addisonian crisis','Metabolic ketoacidosis'],
  'In acute severe hyperkalemia with ECG changes (tall peaked T-waves), the FIRST drug administered is CALCIUM GLUCONATE! Calcium does NOT lower serum potassium; it antagonizes the cardiac membrane excitability to prevent fatal arrhythmias while other agents (insulin + D50W, albuterol, kayexalate) shift or remove potassium.',
  '"Calcium stabilizes the heart; Insulin + D50W drives K+ into cells; Kayexalate eliminates it from the bowel!"',
  'ECG progression of hyperkalemia: Tall, peaked T-waves → prolonged PR interval → flattened/absent P-wave → widened QRS complex → sine wave → ventricular fibrillation.',
  '{"question":"A client with end-stage renal disease presents with a serum potassium of 7.2 mEq/L and an ECG showing tall, peaked T-waves and a widened QRS complex. Which medication should the nurse prepare to administer FIRST?","options":["A. Sodium polystyrene sulfonate (Kayexalate) orally","B. IV regular insulin and 50% dextrose (D50W)","C. IV Calcium gluconate","D. Nebulized albuterol"],"answer":"C","explanation":"IV Calcium gluconate is the first-line emergency medication for hyperkalemia with ECG changes. It immediately stabilizes the cardiac cell membrane against fatal arrhythmias within minutes, buying time for insulin/dextrose and Kayexalate to lower potassium levels."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Hyperkalemia Causes & ECG Changes')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Hyponatremia Signs & Symptoms',
  'S-A-L-T L-O-S-S',
  'Neurological and systemic manifestations of serum sodium depletion (<135 mEq/L).',
  'Endocrine',
  'Med-Surgical',
  ARRAY['Sodium','Electrolytes','Neurology','Fluids'],
  ARRAY['S — Stupor, confusion, lethargy','A — Anorexia, nausea, vomiting','L — Lethargy & fatigue','T — Tendon reflexes decreased (Hyporeflexia)','L — Limp muscles & weakness','O — Orthostatic hypotension','S — Seizures & Cerebral edema','S — Stomach cramping & hyperactive bowel sounds'],
  '[{"emoji":"🧠","phrase":"S — Stupor & Confusion","meaning":"Hypo-osmolar state causes water to move into brain cells, leading to cerebral edema, headache, restlessness, and progressive confusion."},{"emoji":"🤢","phrase":"A — Anorexia & Nausea","meaning":"GI upset with nausea, vomiting, and loss of appetite."},{"emoji":"🥱","phrase":"L — Lethargy","meaning":"Profound malaise, fatigue, and difficulty arousing."},{"emoji":"🔨","phrase":"T — Tendon Reflexes Decreased","meaning":"Depressed deep tendon reflexes."},{"emoji":"💪","phrase":"L — Limp Muscles","meaning":"Generalized muscle weakness, twitching, and cramping."},{"emoji":"📉","phrase":"O — Orthostatic Hypotension","meaning":"Hypovolemic hyponatremia presents with tachycardia and orthostatic drop in blood pressure."},{"emoji":"⚡","phrase":"S — Seizures","meaning":"When sodium drops rapidly below 120 mEq/L, cerebral swelling triggers generalized seizures, coma, and herniation."},{"emoji":"🚽","phrase":"S — Stomach Cramping","meaning":"Abdominal cramps and diarrhea."}]'::jsonb,
  'Sodium is the primary determinant of extracellular fluid osmolality. Severe acute hyponatremia is a neurological emergency due to risk of uncal herniation and brainstem compression.',
  ARRAY['SIADH (Syndrome of Inappropriate ADH)','Excessive hypotonic IV fluids (D5W)','Diuretic therapy','Psychogenic polydipsia','Congestive heart failure and cirrhosis (dilutional)'],
  'NEVER correct chronic hyponatremia too rapidly! Correcting sodium faster than 8–10 mEq/L per 24 hours causes Osmotic Demyelination Syndrome (Central Pontine Myelinolysis), leading to permanent quadriplegia, "locked-in" syndrome, or death.',
  '"Low sodium swells the brain: Seizures, Stupor, and Spasms. Correct it slowly!"',
  'For severe, symptomatic hyponatremia (seizures, coma), administer small boluses of Hypertonic Saline (3% NaCl) via central line, with frequent serum sodium checks every 2–4 hours.',
  '{"question":"A client with lung cancer develops SIADH with a serum sodium level of 118 mEq/L and begins exhibiting confusion and twitching. Which physician order should the nurse implement with the highest priority?","options":["A. Initiate seizure precautions and administer IV 3% sodium chloride","B. Infuse 1,000 mL of 0.45% normal saline","C. Encourage oral fluid intake of at least 2,500 mL/day","D. Administer oral furosemide with orange juice"],"answer":"A","explanation":"A sodium level of 118 mEq/L with neurological symptoms indicates severe cerebral edema and imminent seizure risk. The priority is implementing seizure precautions and infusing hypertonic 3% saline to draw water out of brain tissue."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Hyponatremia Signs & Symptoms')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Hypernatremia Signs & Symptoms',
  'F-R-I-E-D S-A-L-T',
  'Clinical findings of cellular dehydration and hyperosmolality (>145 mEq/L).',
  'Endocrine',
  'Med-Surgical',
  ARRAY['Sodium','Electrolytes','Dehydration','Fluids'],
  ARRAY['F — Fever & flushed skin','R — Restlessness, agitation, irritability','I — Increased fluid retention & blood pressure','E — Edema (Peripheral & pulmonary)','D — Decreased urine output & dry mouth','S — Skin flushed & dry mucous membranes','A — Agitation & confusion','L — Low-grade fever','T — Thirst (Intense polydipsia)'],
  '[{"emoji":"🔥","phrase":"F — Fever & Flushing","meaning":"Impaired thermoregulation and cutaneous vasodilation."},{"emoji":"⚡","phrase":"R — Restlessness","meaning":"Cellular dehydration in the brain causes CNS hyperirritability, manic restlessness, and confusion."},{"emoji":"📈","phrase":"I — Increased BP","meaning":"In hypervolemic hypernatremia (excess sodium intake), volume expansion elevates blood pressure."},{"emoji":"🫧","phrase":"E — Edema","meaning":"Sodium retention draws fluid into interstitium."},{"emoji":"🏜️","phrase":"D — Dry Mouth & Oliguria","meaning":"Dry sticky mucous membranes, furrowed tongue, and low concentrated urine output."},{"emoji":"👅","phrase":"T — Thirst","meaning":"Intense polydipsia driven by hypothalamic osmoreceptors; the body''s primary defense mechanism against hypernatremia."}]'::jsonb,
  'Hypernatremia (>145 mEq/L) creates a hyperosmolar extracellular environment, pulling water out of body cells. Intracellular brain dehydration can tear cerebral blood vessels, causing subdural hematomas.',
  ARRAY['Diabetes Insipidus (deficiency of ADH)','Profuse watery diarrhea or sweating without water intake','Inability to access water (infants, elderly, comatose)','Excessive IV hypertonic saline or sodium bicarbonate'],
  'Correcting hypernatremia too quickly with hypotonic fluids causes water to rush into brain cells, triggering CEREBRAL EDEMA, seizures, and herniation. Lower sodium slowly over 48 hours at a rate of ≤0.5 mEq/L per hour.',
  '"Hypernatremia fries the cells: Flushed, Restless, Irritable, and Thirsty as a desert!"',
  'In Diabetes Insipidus, hypernatremia presents with massive polyuria (>4–18 L/day of dilute urine with specific gravity <1.005). The treatment is Desmopressin (DDAVP).',
  '{"question":"A client recovering from transsphenoidal hypophysectomy produces 600 mL/hr of dilute urine for 3 consecutive hours. Serum sodium is 152 mEq/L. Which condition does the nurse suspect?","options":["A. SIADH","B. Diabetes Insipidus","C. Addisonian Crisis","D. Acute Kidney Injury"],"answer":"B","explanation":"Surgical manipulation of the pituitary gland during transsphenoidal surgery frequently triggers temporary or permanent Diabetes Insipidus (lack of ADH). This causes massive dilute polyuria, dehydration, and hypernatremia."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Hypernatremia Signs & Symptoms')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Cushing''s vs. Addison''s Disease',
  'Cushing = Cushy Cortisol vs. Addison = Add Cortisol',
  'Contrasting manifestations of adrenal hypercortisolism versus adrenal insufficiency.',
  'Endocrine',
  'Med-Surgical',
  ARRAY['Endocrine','Adrenal','Cushings','Addisons','Steroids'],
  ARRAY['Cushing''s ("Cushy" Extra Cortisol): Buffalo hump, Moon face, Purple striae, Hyperglycemia, High BP','Addison''s ("Add" Cortisol Deficiency): Bronze skin, Low BP, Hyponatremia, Hyperkalemia, Hypoglycemia'],
  '[{"emoji":"🌕","phrase":"Cushing''s: Moon Face & Buffalo Hump","meaning":"Excess glucocorticoids cause fat redistribution to face (moon face), upper back (buffalo hump), and trunk with thin wasting extremities."},{"emoji":"🟣","phrase":"Cushing''s: Purple Striae & Fragile Skin","meaning":"Catabolic protein breakdown causes thin translucent skin, easy bruising, ecchymosis, and broad purple abdominal stretch marks."},{"emoji":"📈","phrase":"Cushing''s Labs: High Sugar, High Na+, Low K+","meaning":"Hyperglycemia, hypernatremia, hypokalemia, and hypertension due to mineralocorticoid fluid retention."},{"emoji":"🥉","phrase":"Addison''s: Bronze Hyperpigmentation","meaning":"Adrenal cortex destruction prompts pituitary to secrete excess ACTH, causing distinctive bronze darkening of skin creases, scars, and gums."},{"emoji":"📉","phrase":"Addison''s: Hypotension & Fatigue","meaning":"Lack of cortisol and aldosterone leads to vascular collapse, postural hypotension, severe fatigue, and weight loss."},{"emoji":"🧪","phrase":"Addison''s Labs: Low Sugar, Low Na+, High K+","meaning":"Hyponatremia, hyperkalemia, hypoglycemia, and hypercalcemia."}]'::jsonb,
  'Cushing''s syndrome causes immunosuppression, osteoporosis, and cardiovascular morbidity. Addison''s disease carries the risk of fatal Addisonian Crisis triggered by physical stress or infection.',
  ARRAY['Exogenous steroid therapy / Pituitary adenoma (Cushing''s)','Autoimmune adrenalitis / Tuberculosis of adrenal glands (Addison''s)'],
  'In Addisonian Crisis, the client presents with vascular shock: severe refractory hypotension, hyponatremia, hyperkalemia, and hypoglycemia. The emergency treatment is IV Hydrocortisone bolus plus aggressive 0.9% Normal Saline with D5W.',
  '"Cushing has a CUSHY pillow of fat and high cortisol. Addison needs you to ADD hormones!"',
  'Never abruptly stop long-term steroid therapy (prednisone); taper doses gradually to allow the atrophic adrenal cortex time to resume endogenous cortisol production.',
  '{"question":"A client with Addison''s disease experiences an acute episode of gastroenteritis. The client arrives at the emergency department with a BP of 70/40 mmHg, confusion, serum sodium of 124 mEq/L, and serum potassium of 6.2 mEq/L. Which intervention is the top priority?","options":["A. Administer oral fludrocortisone with a light meal","B. Administer IV hydrocortisone and infuse rapid normal saline with dextrose","C. Administer potassium chloride IV piggyback","D. Prepare the client for an immediate adrenalectomy"],"answer":"B","explanation":"The client is in life-threatening Addisonian Crisis (acute adrenal crisis) triggered by gastroenteritis infection, resulting in profound hypotension, hyponatremia, and hyperkalemia. The priority is IV Hydrocortisone and aggressive IV fluid resuscitation."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Cushing''s vs. Addison''s Disease')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Altered Mental Status Differential',
  'A-E-I-O-U T-I-P-S',
  'Systematic clinical checklist for identifying reversible causes of acute delirium and coma.',
  'Neurology',
  'Emergency',
  ARRAY['Delirium','Coma','Emergency','Neurology','Assessment'],
  ARRAY['A — Alcohol / Acidosis','E — Epilepsy, Electrolytes, Encephalopathy','I — Insulin (Hypoglycemia — check fingerstick glucose!)','O — Overdose / Oxygen (Hypoxia)','U — Uremia (Kidney failure)','T — Trauma / Temperature (Hypothermia, Heat stroke)','I — Infection (Sepsis, Meningitis, UTI)','P — Poisoning / Psychiatric illness','S — Shock, Stroke, Subarachnoid hemorrhage'],
  '[{"emoji":"🍷","phrase":"A — Alcohol / Acidosis","meaning":"Acute intoxication, alcohol withdrawal (delirium tremens), or severe metabolic acidosis (DKA, lactic acidosis)."},{"emoji":"⚡","phrase":"E — Epilepsy / Electrolytes","meaning":"Post-ictal state, non-convulsive status epilepticus, severe hyponatremia (<120 mEq/L), or hepatic encephalopathy."},{"emoji":"🩸","phrase":"I — Insulin (Hypoglycemia)","meaning":"Low blood sugar (<70 mg/dL or <3.9 mmol/L); the brain is totally dependent on glucose; always check capillary blood sugar FIRST!"},{"emoji":"💊","phrase":"O — Overdose / Oxygen","meaning":"Opioids, benzodiazepines, sedatives, or profound hypoxia (SpO2 <85%) and carbon dioxide narcosis."},{"emoji":"🫘","phrase":"U — Uremia","meaning":"End-stage renal failure with severe uremic toxins crossing the blood-brain barrier."},{"emoji":"💥","phrase":"T — Trauma / Temperature","meaning":"Concussion, epidural/subdural hematoma, severe hypothermia (<32°C), or heat stroke."},{"emoji":"🦠","phrase":"I — Infection","meaning":"Sepsis, bacterial meningitis, encephalitis, or occult urinary tract infection (UTI in elderly)."},{"emoji":"☠️","phrase":"P — Poisoning / Psych","meaning":"Carbon monoxide, organophosphates, heavy metals, or acute catatonic psychiatric state."},{"emoji":"🧠","phrase":"S — Shock / Stroke","meaning":"Cardiogenic/septic shock causing cerebral hypoperfusion, acute ischemic stroke, or subarachnoid hemorrhage."}]'::jsonb,
  'Acute altered mental status (AMS) requires rapid, structured bedside troubleshooting to reverse easily treatable conditions (hypoglycemia, hypoxia, opioid overdose) within minutes.',
  ARRAY['Acute delirium','Unresponsive patient','Emergency department triage','ICU acute mental change'],
  'In any patient presenting with altered mental status, confusion, or combativeness, checking POINT-OF-CARE BLOOD GLUCOSE is the absolute fastest and most critical initial nursing assessment!',
  '"AEIOU TIPS: Check the sugar (I) and oxygen (O) before running extensive brain scans!"',
  'In elderly clients with sudden confusion and agitation without fever, ALWAYS check a urine analysis; urinary tract infection is the leading cause of delirium in the geriatric population.',
  '{"question":"An elderly client with a history of diabetes is brought to the emergency department by family because of sudden confusion, sweating, and slurred speech. What is the nurse''s FIRST action?","options":["A. Obtain an immediate bedside fingerstick blood glucose reading","B. Send the client for an urgent head CT scan","C. Administer broad-spectrum IV antibiotics for presumed sepsis","D. Restrain the client to prevent falls"],"answer":"A","explanation":"Hypoglycemia mimics stroke and acute delirium. Because irreversible brain injury can occur rapidly, checking blood glucose via bedside fingerstick is the immediate priority before ordering complex imaging or medications."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Altered Mental Status Differential')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Glasgow Coma Scale Scoring',
  'E-V-M 4-5-6',
  'Standardized neurological assessment tool for level of consciousness and traumatic brain injury.',
  'Neurology',
  'Neurology',
  ARRAY['GCS','Neuro Assessment','Trauma','Emergency','Critical Care'],
  ARRAY['Eye Opening (Max 4): Spontaneous (4), To speech (3), To pain (2), None (1)','Verbal Response (Max 5): Oriented (5), Confused (4), Inappropriate (3), Incomprehensible (2), None (1)','Motor Response (Max 6): Obeys (6), Localizes (5), Withdraws (4), Decorticate (3), Decerebrate (2), None (1)','Total Score: 3 to 15. "Score 8 or less, Intubate!"'],
  '[{"emoji":"👁️","phrase":"Eye Opening (4 Points)","meaning":"4 = Spontaneous open; 3 = Opens to verbal command/sound; 2 = Opens only to painful/pressure stimulus; 1 = No eye opening."},{"emoji":"🗣️","phrase":"Verbal Response (5 Points)","meaning":"5 = Oriented to person, place, time; 4 = Confused conversation; 3 = Inappropriate words; 2 = Incomprehensible sounds/groans; 1 = No verbal response."},{"emoji":"💪","phrase":"Motor Response (6 Points)","meaning":"6 = Obeys verbal commands; 5 = Localizes to pain; 4 = Normal flexion/withdrawal from pain; 3 = Abnormal flexion (Decorticate rigidity); 2 = Extension (Decerebrate rigidity); 1 = Flaccid/None."},{"emoji":"⚠️","phrase":"Interpretation & Cutoffs","meaning":"13–15 = Mild brain injury; 9–12 = Moderate brain injury; 3–8 = Severe brain injury. GCS ≤ 8 signifies inability to maintain own airway (\"Less than 8, Intubate!\")."}]'::jsonb,
  'Universally utilized in trauma and critical care to track neurological deterioration. A drop of 2 or more points requires immediate provider notification and emergency neuroimaging.',
  ARRAY['Traumatic brain injury (TBI)','Intracranial hemorrhage','Post-cardiac arrest coma','Meningitis','Toxic metabolic encephalopathy'],
  'Remember the maximum scores: Eyes = 4, Verbal = 5, Motor = 6 (EVM 4-5-6). Decorticate (arms flexed in to core/chest) scores 3. Decerebrate (arms extended out at sides) scores 2 and indicates worse brainstem herniation!',
  '"Eyes have 4 letters (max 4). V-E-R-B-A-L has 6 letters minus 1 = 5. Motor has 5 letters plus 1 = 6. Less than 8, Intubate!"',
  'The minimum possible GCS score is 3 (not 0!). Even a completely dead or unresponsive patient receives a score of 3 (1+1+1).',
  '{"question":"A nurse assesses a head injury client who opens their eyes to pressure, speaks in incomprehensible groans, and extends their arms rigidly (decerebrate posturing) when painful stimuli are applied. What is the client''s Glasgow Coma Scale (GCS) score?","options":["A. 5","B. 6","C. 7","D. 8"],"answer":"B","explanation":"Eye opening to pressure = 2 points. Incomprehensible sounds = 2 points. Decerebrate extension = 2 points. Total GCS score = 2 + 2 + 2 = 6 points."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Glasgow Coma Scale Scoring')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Pediatric Dehydration Severity',
  'W-E-T',
  'Clinical grading and physiological assessment of acute dehydration in infants and young children.',
  'Pediatrics',
  'Pediatrics',
  ARRAY['Pediatrics','Dehydration','Gastroenteritis','Assessment'],
  ARRAY['W — Weight loss percentage (Mild 3–5%, Mod 6–9%, Severe ≥10%)','E — Eyes sunken & absence of tears','T — Turgor poor (Skin tenting >2s) & Depressed fontanelle','Wet Diapers <4–6 per day & Capillary refill prolonged'],
  '[{"emoji":"⚖️","phrase":"W — Weight Loss %","meaning":"The single most accurate measure of hydration status. Mild = 3–5% weight loss; Moderate = 6–9% weight loss; Severe = ≥10% weight loss in infants."},{"emoji":"😢","phrase":"E — Eyes Sunken & No Tears","meaning":"Deeply sunken orbits, absent tear production when crying, and dry, cracked lips and oral mucosa."},{"emoji":"👶","phrase":"T — Turgor & Fontanelle","meaning":"Skin tenting (pinch abdominal skin; sluggish return >2 seconds) and distinctly sunken anterior fontanelle in infants <18 months."},{"emoji":"🩲","phrase":"Wet Diapers Decreased","meaning":"Infant produces fewer than 4–6 wet diapers in 24 hours, or oliguria with dark concentrated urine."},{"emoji":"⏱️","phrase":"Prolonged Capillary Refill","meaning":"Capillary refill >3 seconds, cool mottled extremities, tachycardia, and lethargy indicate severe dehydration and impending hypovolemic shock."}]'::jsonb,
  'Acute gastroenteritis leading to dehydration is a leading cause of pediatric morbidity and mortality in developing nations and Kenya.',
  ARRAY['Rotavirus or bacterial gastroenteritis','Severe vomiting and diarrhea','Malnutrition','Burns','Diabetic ketoacidosis in children'],
  'Oral Rehydration Solution (ORS) is first-line for mild and moderate dehydration! Do NOT give plain water, apple juice, soda, or commercial sports drinks (high osmolarity causes osmotic diarrhea!). For severe dehydration with shock, infuse immediate IV Isotonic saline bolus (20 mL/kg).',
  '"Check if the child is WET: Weight, Eyes, Turgor, and Diapers. Severe means an immediate 20 mL/kg bolus!"',
  'For severe pediatric dehydration with hypotension or lethargy, the standard emergency fluid bolus is 20 mL/kg of Normal Saline or Ringer''s Lactate over 15–30 minutes.',
  '{"question":"A 9-month-old infant with 2 days of severe diarrhea is lethargic, has deeply sunken eyes, skin tenting lasting 3 seconds, a capillary refill of 4 seconds, and a 12% acute weight reduction. What is the nurse''s immediate intervention?","options":["A. Administer oral rehydration solution (ORS) with a medicine dropper","B. Provide 4 ounces of diluted apple juice","C. Administer an IV bolus of 20 mL/kg of 0.9% Normal Saline","D. Recommend breastfeeding every 4 hours"],"answer":"C","explanation":"A 12% weight loss, prolonged capillary refill, and lethargy define SEVERE dehydration and hypovolemic shock. Oral rehydration is contraindicated due to altered mental status. The immediate intervention is an intravenous bolus of 20 mL/kg of isotonic crystalloid (0.9% Normal Saline)."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Pediatric Dehydration Severity')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Transmission Precautions — Airborne',
  'M-T-V',
  'Infection prevention protocol and PPE for airborne-transmitted infectious pathogens.',
  'Infectious Diseases',
  'Med-Surgical',
  ARRAY['Infection Control','Airborne','Tuberculosis','PPE','Safety'],
  ARRAY['M — Measles (Rubeola)','T — Tuberculosis (Active pulmonary/laryngeal TB)','V — Varicella-Zoster (Chickenpox & Disseminated Shingles)'],
  '[{"emoji":"🔴","phrase":"M — Measles (Rubeola)","meaning":"Highly contagious droplet nuclei that remain suspended in the air for up to 2 hours; presents with fever, 3 C''s (Cough, Coryza, Conjunctivitis), and Koplik spots."},{"emoji":"🫁","phrase":"T — Tuberculosis (TB)","meaning":"Mycobacterium tuberculosis droplet nuclei (<5 microns); transmission occurs when patient coughs, speaks, or sneezes."},{"emoji":"🐔","phrase":"V — Varicella (Chickenpox / Disseminated Shingles)","meaning":"Varicella-zoster virus causes pruritic vesicular rash. Requires BOTH Airborne AND Contact precautions until all lesions have crusted over!"},{"emoji":"🚪","phrase":"Airborne Isolation Room (AIIR)","meaning":"Private room with Negative Air Pressure ventilation (minimum 6–12 air changes/hour), exhausted directly outside or HEPA filtered; door must remain closed."},{"emoji":"😷","phrase":"N95 Respirator Required","meaning":"All healthcare personnel must wear a fit-tested N95 respirator mask or PAPR prior to entering the room. Patient wears a surgical mask during transport."}]'::jsonb,
  'Airborne particles travel long distances on air currents. Inadequate isolation leads to devastating nosocomial hospital outbreaks.',
  ARRAY['Active pulmonary tuberculosis','Measles outbreak','Varicella (Chickenpox)','Disseminated herpes zoster'],
  'A patient with Varicella (Chickenpox) or Disseminated Shingles requires BOTH Airborne AND Contact precautions! Precautions cannot be downgraded until ALL lesions have completely dried and crusted over.',
  '"Airborne is on MTV: Measles, TB, and Varicella. Put on your N95 and shut the negative pressure door!"',
  'When transporting a patient on airborne precautions outside their room for essential diagnostic tests, the PATIENT must wear a standard surgical mask; the transporter does not need an N95 outside the room.',
  '{"question":"A nurse is caring for a client with confirmed active pulmonary tuberculosis. Which infection control measure is mandatory before entering the client''s room?","options":["A. Put on a standard surgical mask and sterile gloves","B. Put on a fitted N95 respirator mask and ensure the negative pressure room door is closed","C. Wear a gown and face shield only","D. Ensure the room door remains propped open for cross-ventilation"],"answer":"B","explanation":"Active pulmonary tuberculosis requires Airborne Precautions, which mandates a private negative-pressure isolation room with the door kept closed at all times, and healthcare personnel wearing a fit-tested N95 respirator mask before room entry."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Transmission Precautions — Airborne')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Transmission Precautions — Droplet',
  'P-I-M-P / S-P-I-D-E-R-M-A-N',
  'Infection prevention protocol and PPE for infectious droplet-transmitted pathogens.',
  'Infectious Diseases',
  'Med-Surgical',
  ARRAY['Infection Control','Droplets','Meningitis','Influenza','Safety'],
  ARRAY['P — Pertussis (Whooping cough)','I — Influenza (Flu virus)','M — Meningitis (Neisseria meningitidis & Hib)','P — Pneumonia (Mycoplasma) / Mumps / Rubella'],
  '[{"emoji":"🗣️","phrase":"P — Pertussis","meaning":"Bordetella pertussis causing severe paroxysmal coughing episodes with inspiratory whoop."},{"emoji":"🤧","phrase":"I — Influenza","meaning":"Seasonal and avian influenza viruses transmitted via respiratory droplets generated by coughing or sneezing."},{"emoji":"🧠","phrase":"M — Meningococcal Meningitis","meaning":"Neisseria meningitidis causes fulminant meningitis with purpuric petechial rash; maintain droplet precautions for 24 hours AFTER starting effective IV antibiotics."},{"emoji":"🤒","phrase":"P — Pneumonia & Mumps & Rubella","meaning":"Mycoplasma pneumonia, parotid gland swelling in mumps, and German measles (Rubella)."},{"emoji":"😷","phrase":"Surgical Mask PPE","meaning":"Wear a standard surgical mask upon entering the room or when within 3–6 feet (1–2 meters) of the client. Negative pressure is NOT required."}]'::jsonb,
  'Droplets are large respiratory particles (>5 microns) that travel up to 3–6 feet through the air before dropping onto surfaces.',
  ARRAY['Bacterial meningitis (N. meningitidis)','Influenza A & B','Pertussis','Mumps and Rubella'],
  'Students confuse Droplet vs Airborne. Droplet particles are heavy and travel only 3 to 6 feet—they do NOT require negative pressure or N95 masks! A standard surgical mask is adequate. For bacterial meningitis, droplet precautions can be discontinued 24 hours after initiating effective antibiotic therapy.',
  '"Droplet bugs travel 3 to 6 feet in heavy drops: Pertussis, Influenza, Meningitis, Pneumonia. Wear a surgical mask!"',
  'When cohorting droplet patients due to bed shortages, patients may share a room ONLY if they are infected with the exact same pathogen and separated by at least 3 feet with spatial curtains.',
  '{"question":"A college student is admitted with severe headache, nuchal rigidity, high fever, and a petechial skin rash. Neisseria meningitidis is confirmed. What precaution must the nurse implement?","options":["A. Airborne Precautions with N95 mask","B. Droplet Precautions with surgical mask upon room entry","C. Contact Precautions with gown and gloves only","D. Standard Precautions with no dedicated mask"],"answer":"B","explanation":"Meningococcal meningitis is transmitted via large respiratory droplets and requires Droplet Precautions (surgical mask, private room) until 24 hours of effective antimicrobial therapy (e.g., ceftriaxone) have been administered."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Transmission Precautions — Droplet')
);

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question)
SELECT
  'Transmission Precautions — Contact',
  'M-R-S. W-E-E',
  'Infection prevention protocol and PPE for direct and indirect contact-transmitted organisms.',
  'Infectious Diseases',
  'Med-Surgical',
  ARRAY['Infection Control','Contact Precautions','MRSA','C-Diff','Safety'],
  ARRAY['M — MRSA & VRE (Multidrug-resistant organisms)','R — Respiratory Syncytial Virus (RSV in children)','S — Skin infections (Scabies, Impetigo, Pediculosis, Herpes Simplex)','W — Wound infections with heavy purulent drainage','E — Enteric infections (C. difficile, Norovirus, Rotavirus)','E — Eye infections (Adenoviral epidemic conjunctivitis)'],
  '[{"emoji":"🦠","phrase":"M — Multidrug Resistant Bugs","meaning":"Methicillin-Resistant S. aureus (MRSA) and Vancomycin-Resistant Enterococcus (VRE) colonizing wounds, urine, or sputum."},{"emoji":"👶","phrase":"R — Respiratory Syncytial Virus (RSV)","meaning":"Primary cause of bronchiolitis in infants; transmitted through contact with respiratory secretions and contaminated surfaces."},{"emoji":"🪲","phrase":"S — Skin Infections","meaning":"Highly contagious dermatological conditions: scabies mites, impetigo honey-colored crusts, and lice."},{"emoji":"🩹","phrase":"W — Wound Infections","meaning":"Open draining surgical or decubitus ulcers where dressings cannot contain purulent exudate."},{"emoji":"🚽","phrase":"E — Enteric (C. difficile & Norovirus)","meaning":"Spore-forming bacterial or viral colitis causing copious watery diarrhea. MUST WASH HANDS WITH SOAP AND WATER (alcohol sanitizers do NOT destroy C. diff spores!)."},{"emoji":"👁️","phrase":"E — Eye Infections","meaning":"Highly communicable viral or bacterial conjunctivitis."},{"emoji":"🥼","phrase":"Required PPE: Gloves & Gown","meaning":"Don gown and gloves upon entering room; remove PPE and perform hand hygiene before exiting."}]'::jsonb,
  'Contact transmission is the most common route of nosocomial infection spread in healthcare facilities. Strict hand hygiene and barrier precautions break the chain of cross-contamination.',
  ARRAY['Clostridioides difficile colitis','MRSA wound colonization','Scabies infestation','Pediatric RSV bronchiolitis'],
  'THE #1 NURSING EXAM TRAP: For Clostridioides difficile (C. diff), alcohol-based foam/gel hand rubs are INEFFECTIVE because they cannot penetrate the bacterial spore coat! Nurses and visitors MUST WASH HANDS WITH SOAP AND RUNNING WATER to physically friction-wash spores down the drain.',
  '"MRS. WEE requires Gloves and Gown. For C. diff, use SOAP and WATER to wash spores down!"',
  'Dedicate patient-care equipment (stethoscope, blood pressure cuff, thermometer) to the contact-isolation room, and disinfect with bleach-based wipes upon discharge.',
  '{"question":"A nurse is providing care to a client who has Clostridioides difficile-associated diarrhea. After removing gloves and gown before leaving the room, what is the mandatory method of hand hygiene?","options":["A. Apply 70% alcohol-based hand rub for 20 seconds until dry","B. Wash hands with soap and warm water for at least 20 seconds","C. Wipe hands with a chlorhexidine gluconate pad","D. No hand hygiene is necessary if gloves were intact"],"answer":"B","explanation":"C. difficile forms resilient bacterial spores that are resistant to alcohol-based hand sanitizers. Washing hands thoroughly with soap and water uses mechanical friction to detach and rinse the spores off the skin."}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.mnemonics WHERE LOWER(title) = LOWER('Transmission Precautions — Contact')
);

