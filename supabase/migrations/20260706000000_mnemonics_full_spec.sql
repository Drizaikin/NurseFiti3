-- ============================================================
-- Full Mnemonic Library — NurseFiti Spec
-- Adds rich 7-section structure and seeds all 26 mnemonics
-- ============================================================

ALTER TABLE public.mnemonics
  ADD COLUMN IF NOT EXISTS clinical_significance TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS causes             TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS exam_traps         TEXT   NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS memory_pearl       TEXT   NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS high_yield_tip     TEXT   NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS practice_question  JSONB  NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS specialty          TEXT   NOT NULL DEFAULT 'General';

DELETE FROM public.mnemonics;

-- ── 1. Anticholinergic Toxicity ──────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Anticholinergic Toxicity',
'Dry as a bone, Blind as a bat, Red as a beet, Mad as a hatter, Hot as a hare, Full as a flask',
'Classic signs of anticholinergic toxicity',
'Pharmacology','Pharmacology',
ARRAY['Toxicology','Emergency','Pharmacology'],
ARRAY['Dry as a bone','Blind as a bat','Red as a beet','Mad as a hatter','Hot as a hare','Full as a flask'],
'[
  {"emoji":"🦴","phrase":"Dry as a bone","meaning":"Dry mouth, dry skin, reduced sweating, dry mucous membranes"},
  {"emoji":"🦇","phrase":"Blind as a bat","meaning":"Mydriasis (dilated pupils), blurred vision, difficulty focusing"},
  {"emoji":"❤️","phrase":"Red as a beet","meaning":"Flushed warm skin caused by peripheral vasodilation"},
  {"emoji":"🎩","phrase":"Mad as a hatter","meaning":"Confusion, agitation, delirium, hallucinations"},
  {"emoji":"🌡️","phrase":"Hot as a hare","meaning":"Hyperthermia due to inability to sweat"},
  {"emoji":"🧴","phrase":"Full as a flask","meaning":"Urinary retention — bladder cannot empty"}
]'::jsonb,
'Summarizes the classic manifestations of anticholinergic toxicity. Patients commonly present after overdose of atropine, antihistamines, tricyclic antidepressants, or antispasmodics. Recognition allows rapid diagnosis and treatment.',
ARRAY['Atropine','Scopolamine','Diphenhydramine','Promethazine','Amitriptyline','Benztropine','Oxybutynin'],
'Students often confuse anticholinergic toxicity with cholinergic toxicity. Remember: Anticholinergic = Dry. Cholinergic = Wet (SLUDGE). Always look for dry skin and urinary retention to confirm anticholinergic.',
'"No sweat. Can''t see. Burning hot. Talking nonsense. Can''t pee." — Think Anticholinergic Toxicity.',
'If a patient has dry mouth, dilated pupils, hot flushed skin, delirium, and urinary retention — always suspect anticholinergic toxicity.',
'{"question":"A patient presents with dry skin, dilated pupils, confusion, and urinary retention. Which condition does this describe?","options":["A. Cholinergic toxicity","B. Anticholinergic toxicity","C. Opioid toxicity","D. Serotonin syndrome"],"answer":"B","explanation":"Anticholinergic toxicity presents with dry skin, mydriasis, confusion, and urinary retention. Cholinergic toxicity presents with SLUDGE (wet signs). Opioid toxicity causes miosis (pinpoint pupils), not mydriasis."}'::jsonb
);

-- ── 2. Heart Valve Order ─────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Heart Valve Order',
'Try Pulling My Aorta',
'Order blood flows through the four heart valves',
'Cardiovascular','Anatomy',
ARRAY['Cardiology','Valves','Anatomy'],
ARRAY['Try','Pulling','My','Aorta'],
'[
  {"emoji":"🔵","phrase":"Try → Tricuspid valve","meaning":"Right atrium to right ventricle"},
  {"emoji":"🫁","phrase":"Pulling → Pulmonary valve","meaning":"Right ventricle to pulmonary artery → lungs"},
  {"emoji":"🔴","phrase":"My → Mitral valve","meaning":"Left atrium to left ventricle"},
  {"emoji":"💪","phrase":"Aorta → Aortic valve","meaning":"Left ventricle to aorta → body"}
]'::jsonb,
'Used when studying cardiac anatomy, blood circulation, echocardiography and heart murmurs. Understanding valve order is essential for interpreting murmur timing and location.',
ARRAY['Valvular heart disease','Rheumatic heart disease','Infective endocarditis','Congenital heart disease'],
'Many students confuse pulmonary and aortic valves. Remember blood reaches the lungs (Pulmonary) before the body (Aortic). Right side pumps to lungs first.',
'Blood flows: Right heart → Tricuspid → Pulmonary → Lungs → Mitral → Aortic → Body.',
'Always visualize blood flow direction rather than memorizing valve names in isolation. Right side = deoxygenated blood to lungs. Left side = oxygenated blood to body.',
'{"question":"In what order does blood flow through the cardiac valves?","options":["A. Mitral, Aortic, Tricuspid, Pulmonary","B. Tricuspid, Pulmonary, Mitral, Aortic","C. Aortic, Mitral, Pulmonary, Tricuspid","D. Pulmonary, Tricuspid, Aortic, Mitral"],"answer":"B","explanation":"Blood flows from right atrium through Tricuspid → right ventricle → Pulmonary → lungs → left atrium → Mitral → left ventricle → Aortic → body. Try Pulling My Aorta."}'::jsonb
);

-- ── 3. Heart Sound Auscultation Locations ────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Heart Sound Locations',
'All Physicians Take Money',
'Auscultation sequence for heart sounds',
'Cardiovascular','Anatomy',
ARRAY['Cardiology','Auscultation','Murmurs'],
ARRAY['All','Physicians','Take','Money'],
'[
  {"emoji":"🔵","phrase":"A → Aortic","meaning":"Right 2nd intercostal space, sternal border"},
  {"emoji":"🫁","phrase":"P → Pulmonic","meaning":"Left 2nd intercostal space, sternal border"},
  {"emoji":"🔴","phrase":"T → Tricuspid","meaning":"Left lower sternal border, 4th–5th ICS"},
  {"emoji":"💓","phrase":"M → Mitral","meaning":"Apex, 5th ICS, midclavicular line"}
]'::jsonb,
'Used during cardiac examination to identify and localize heart murmurs. Each valve is best heard at a specific anatomical position on the chest wall.',
ARRAY['Aortic stenosis','Mitral regurgitation','Tricuspid regurgitation','Pulmonary stenosis'],
'Heart valve anatomical location is NOT the same as where it is best heard. The mitral valve is best heard at the apex (apex beat area), not over the actual valve location.',
'Aortic and Pulmonic are at the top (2nd ICS). Tricuspid is lower sternal border. Mitral is at the apex.',
'When a question asks about heart murmur location, use "All Physicians Take Money" to locate where to place your stethoscope, not the anatomical valve location.',
'{"question":"Where is the mitral valve best auscultated?","options":["A. Right 2nd intercostal space","B. Left 2nd intercostal space","C. Left lower sternal border","D. Apex, 5th ICS midclavicular line"],"answer":"D","explanation":"The mitral valve is best heard at the cardiac apex — 5th intercostal space at the midclavicular line. This is where the apex beat is felt and where mitral murmurs radiate."}'::jsonb
);

-- ── 4. ACS Management ────────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Acute Coronary Syndrome — MONA',
'MONA',
'Early management of acute coronary syndrome',
'Cardiovascular','Med-Surgical',
ARRAY['ACS','Emergency','Cardiology','Medications'],
ARRAY['Morphine','Oxygen','Nitrates','Aspirin'],
'[
  {"emoji":"💉","phrase":"M → Morphine","meaning":"Reduces pain and anxiety; decreases sympathetic activation and preload"},
  {"emoji":"💨","phrase":"O → Oxygen","meaning":"ONLY if SpO2 < 94% — routine oxygen is no longer recommended"},
  {"emoji":"🩺","phrase":"N → Nitrates","meaning":"Vasodilate coronary arteries; reduce preload and chest pain"},
  {"emoji":"💊","phrase":"A → Aspirin","meaning":"Irreversibly inhibits platelet aggregation; given immediately 300mg loading dose"}
]'::jsonb,
'Used during early management of acute coronary syndrome including STEMI and NSTEMI. Prompt recognition and treatment reduces myocardial damage and mortality.',
ARRAY['STEMI','NSTEMI','Unstable angina','Coronary artery disease'],
'Modern guidelines no longer recommend oxygen routinely in ACS. Only administer oxygen when SpO2 is below 94%. Routine high-flow oxygen can cause vasoconstriction and worsen outcomes. Also: Morphine use is now controversial — use with caution.',
'"Give aspirin first, nitrates second, oxygen only if low saturation, and morphine only for refractory pain."',
'In NCK exams, if a patient has chest pain and all of MONA are listed as options, choose Aspirin first as it has the strongest evidence base. Oxygen is only given if the patient is hypoxic.',
'{"question":"A patient arrives with crushing chest pain and diaphoresis. SpO2 is 97%. Which intervention is the PRIORITY?","options":["A. Administer high-flow oxygen","B. Administer aspirin 300mg","C. Administer IV morphine","D. Apply GTN spray"],"answer":"B","explanation":"Aspirin is the most evidence-based immediate intervention for ACS. Oxygen is NOT indicated when SpO2 is 97% (≥94%). Aspirin immediately inhibits platelet aggregation and reduces clot formation."}'::jsonb
);

-- ── 5. COPD — Blue Bloater ───────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'COPD — Blue Bloater (Chronic Bronchitis)',
'Blue Bloater',
'Classic presentation of chronic bronchitis',
'Respiratory','Med-Surgical',
ARRAY['COPD','Respiratory','Bronchitis'],
ARRAY['Blue — Cyanosis','Bloater — Fluid retention','Productive cough','Overweight','Peripheral oedema'],
'[
  {"emoji":"🔵","phrase":"Blue — Cyanosis","meaning":"Central cyanosis due to chronic hypoxia and polycythaemia"},
  {"emoji":"🫧","phrase":"Bloater — Oedema","meaning":"Cor pulmonale causes right heart failure → fluid retention, peripheral oedema"},
  {"emoji":"😮‍💨","phrase":"Productive cough","meaning":"Chronic mucus hypersecretion — 3+ months/year for 2+ years"},
  {"emoji":"⚖️","phrase":"Overweight","meaning":"Retained CO2 (hypercapnia) — these patients retain everything"},
  {"emoji":"🦵","phrase":"Peripheral oedema","meaning":"Ankle and leg swelling from right-sided heart failure"}
]'::jsonb,
'Chronic bronchitis is defined as productive cough for ≥3 months per year for ≥2 consecutive years. The patient appears cyanosed and oedematous due to chronic hypoxia and secondary cor pulmonale.',
ARRAY['Smoking','Air pollution','Occupational dust','Recurrent respiratory infections'],
'Do not confuse Blue Bloater (chronic bronchitis) with Pink Puffer (emphysema). Blue Bloater patients have low O2, high CO2, oedema and cyanosis. Pink Puffer patients maintain oxygenation until late but are severely breathless.',
'"Blue because they''re hypoxic. Bloated because their heart is failing. They cough up sputum every morning."',
'NCK exams test the difference between chronic bronchitis and emphysema. Remember: Blue Bloater = wet, oedematous, cyanosed. Pink Puffer = thin, pursed lips, barrel chest, breathless but not cyanosed.',
'{"question":"A 58-year-old male smoker presents with productive cough, central cyanosis, ankle swelling and weight gain. Which COPD type does this describe?","options":["A. Emphysema — Pink Puffer","B. Chronic bronchitis — Blue Bloater","C. Asthma","D. Pulmonary fibrosis"],"answer":"B","explanation":"Chronic bronchitis presents as Blue Bloater: cyanosis, oedema, productive cough, and fluid retention from cor pulmonale. Emphysema (Pink Puffer) presents with barrel chest, pursed-lip breathing and little oedema."}'::jsonb
);

-- ── 6. Emphysema — Pink Puffer ───────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'COPD — Pink Puffer (Emphysema)',
'Pink Puffer',
'Classic presentation of emphysema',
'Respiratory','Med-Surgical',
ARRAY['COPD','Respiratory','Emphysema'],
ARRAY['Pink — Well oxygenated until late','Puffer — Pursed-lip breathing','Barrel chest','Thin body','Severe dyspnoea'],
'[
  {"emoji":"🌸","phrase":"Pink — Well oxygenated","meaning":"Maintains near-normal O2 until very late disease due to respiratory compensation"},
  {"emoji":"💨","phrase":"Puffer — Pursed-lip breathing","meaning":"Creates back-pressure to keep airways open; slows expiration"},
  {"emoji":"🛢️","phrase":"Barrel chest","meaning":"Air trapping increases AP diameter to >transverse diameter"},
  {"emoji":"🦴","phrase":"Thin body","meaning":"Severe dyspnoea increases metabolic demand; accessory muscle use"},
  {"emoji":"😮‍💨","phrase":"Severe dyspnoea","meaning":"Progressive breathlessness even at rest in advanced disease"}
]'::jsonb,
'Emphysema involves permanent enlargement and destruction of alveoli distal to the terminal bronchiole. Elastic recoil is lost, causing air trapping and barrel chest. The patient works hard to breathe but maintains pink colour until late.',
ARRAY['Smoking (main cause)','Alpha-1 antitrypsin deficiency','Occupational chemicals'],
'Do not confuse with chronic bronchitis. Emphysema patients are NOT typically cyanosed or oedematous early. They are thin and severely breathless. Cyanosis and oedema appear only in end-stage disease.',
'"Pink because they still have oxygen. Puffer because they work extremely hard to breathe. Pursed lips = their own PEEP."',
'In exam questions: Barrel chest + pursed-lip breathing + thin body + no peripheral oedema = Emphysema (Pink Puffer). Cyanosis + oedema + productive cough = Chronic Bronchitis (Blue Bloater).',
'{"question":"A 65-year-old thin male has severe dyspnoea, pursed-lip breathing, barrel chest and no ankle swelling. His oxygen saturation is 92%. What is the most likely diagnosis?","options":["A. Chronic bronchitis","B. Cor pulmonale","C. Emphysema","D. Pulmonary embolism"],"answer":"C","explanation":"Emphysema (Pink Puffer) presents with pursed-lip breathing, barrel chest, severe dyspnoea, thin build, and maintained oxygenation until late. No oedema or productive cough distinguishes it from chronic bronchitis."}'::jsonb
);

-- ── 7. Cranial Nerves I–XII ──────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Cranial Nerves I–XII',
'Oh Oh Oh To Touch And Feel Very Good Velvet AH',
'The 12 cranial nerves in order',
'Neurology','Neurology',
ARRAY['Neurology','Cranial Nerves','Anatomy'],
ARRAY['Oh','Oh','Oh','To Touch','And Feel','Very Good','Velvet','AH'],
'[
  {"emoji":"👃","phrase":"Oh — I: Olfactory","meaning":"Smell — sensory only"},
  {"emoji":"👁️","phrase":"Oh — II: Optic","meaning":"Vision — sensory only"},
  {"emoji":"🔄","phrase":"Oh — III: Oculomotor","meaning":"Eye movement (most), pupil constriction, eyelid elevation"},
  {"emoji":"↕️","phrase":"To — IV: Trochlear","meaning":"Superior oblique muscle — downward and inward gaze"},
  {"emoji":"✋","phrase":"Touch — V: Trigeminal","meaning":"Face sensation (sensory) + muscles of mastication (motor)"},
  {"emoji":"↔️","phrase":"And — VI: Abducens","meaning":"Lateral rectus — eye moves outward (abduction)"},
  {"emoji":"😊","phrase":"Feel — VII: Facial","meaning":"Facial expression (motor) + taste anterior 2/3 tongue (sensory)"},
  {"emoji":"👂","phrase":"Very — VIII: Vestibulocochlear","meaning":"Hearing and balance — sensory only"},
  {"emoji":"🗣️","phrase":"Good — IX: Glossopharyngeal","meaning":"Taste posterior 1/3 tongue + swallowing + gag reflex"},
  {"emoji":"🫀","phrase":"Velvet — X: Vagus","meaning":"Parasympathetics to heart, lungs, gut; swallowing; speaking"},
  {"emoji":"💪","phrase":"AH — XI: Accessory","meaning":"Sternocleidomastoid and trapezius — shoulder shrug and head turn"},
  {"emoji":"👅","phrase":"AH — XII: Hypoglossal","meaning":"Tongue movement — motor only; deviation toward lesion side"}
]'::jsonb,
'Used in neurological examination to test each cranial nerve systematically. Essential for diagnosing stroke, brain tumours, meningitis and cranial nerve palsies.',
ARRAY['Stroke','Brain tumour','Meningitis','Skull base fracture','Multiple sclerosis','Diabetes (CN III, VI, VII palsy)'],
'Students commonly confuse CN III (Oculomotor) with CN VI (Abducens). CN III controls most eye movements plus pupil and eyelid. CN VI only abducts the eye. Also: CN VII (facial) palsy — UMN lesion spares forehead; LMN lesion (Bell''s palsy) affects entire face.',
'"Oh Oh Oh — the first three are eye/smell/vision. To Touch And Feel — sensation around there. Very Good Velvet AH — hearing, swallowing, shoulder, tongue."',
'For NCK: A patient with a drooping eyelid AND dilated pupil = CN III palsy (surgical emergency — rule out posterior communicating artery aneurysm). Drooping eyelid alone = Horner syndrome.',
'{"question":"Which cranial nerve is responsible for lateral eye movement (abduction)?","options":["A. CN III — Oculomotor","B. CN IV — Trochlear","C. CN VI — Abducens","D. CN VII — Facial"],"answer":"C","explanation":"CN VI (Abducens) controls the lateral rectus muscle, which abducts the eye. CN III controls most other eye movements. CN IV controls downward/inward movement. CN VI palsy causes inability to look laterally — the eye deviates medially."}'::jsonb
);

-- ── 8. Cranial Nerve Function (S/M/Both) ────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Cranial Nerve Function Type',
'Some Say Marry Money But My Brother Says Big Brains Matter More',
'Whether each cranial nerve is Sensory, Motor or Both',
'Neurology','Neurology',
ARRAY['Neurology','Cranial Nerves','Sensory','Motor'],
ARRAY['Some','Say','Marry','Money','But','My','Brother','Says','Big','Brains','Matter','More'],
'[
  {"emoji":"👃","phrase":"Some — I: Sensory","meaning":"Olfactory — smell only"},
  {"emoji":"👁️","phrase":"Say — II: Sensory","meaning":"Optic — vision only"},
  {"emoji":"🔄","phrase":"Marry — III: Motor","meaning":"Oculomotor — eye movement, pupil, eyelid"},
  {"emoji":"↕️","phrase":"Money — IV: Motor","meaning":"Trochlear — superior oblique"},
  {"emoji":"✋","phrase":"But — V: Both","meaning":"Trigeminal — face sensation (S) + mastication (M)"},
  {"emoji":"↔️","phrase":"My — VI: Motor","meaning":"Abducens — lateral rectus"},
  {"emoji":"😊","phrase":"Brother — VII: Both","meaning":"Facial — expression (M) + taste anterior tongue (S)"},
  {"emoji":"👂","phrase":"Says — VIII: Sensory","meaning":"Vestibulocochlear — hearing and balance"},
  {"emoji":"🗣️","phrase":"Big — IX: Both","meaning":"Glossopharyngeal — taste + swallowing"},
  {"emoji":"🫀","phrase":"Brains — X: Both","meaning":"Vagus — parasympathetics + swallowing"},
  {"emoji":"💪","phrase":"Matter — XI: Motor","meaning":"Accessory — shoulder shrug"},
  {"emoji":"👅","phrase":"More — XII: Motor","meaning":"Hypoglossal — tongue movement"}
]'::jsonb,
'Knowing whether each cranial nerve is sensory, motor or both helps differentiate lesion types and guides neurological examination.',
ARRAY['Cranial nerve palsy','Stroke','Brain tumour','Peripheral neuropathy'],
'Students forget that CN V and VII are "Both." In Bell''s palsy (CN VII), patients lose both facial expression AND taste on the anterior tongue — because VII is both sensory and motor.',
'"Sensory: I, II, VIII. Motor: III, IV, VI, XI, XII. Both: V, VII, IX, X."',
'NCK tip: If a patient cannot shrug their shoulder, suspect CN XI (Accessory) lesion. If they cannot move their tongue, suspect CN XII (Hypoglossal) — tongue deviates TOWARD the side of the lesion.',
'{"question":"A patient has lost taste sensation on the anterior two-thirds of the tongue and cannot close their left eye. Which cranial nerve is affected?","options":["A. CN V — Trigeminal","B. CN VII — Facial","C. CN IX — Glossopharyngeal","D. CN XII — Hypoglossal"],"answer":"B","explanation":"CN VII (Facial) is BOTH sensory and motor. It carries taste from the anterior 2/3 of the tongue (sensory) and controls facial muscles including eyelid closure (motor). This presentation describes Bell''s palsy or an LMN CN VII lesion."}'::jsonb
);

-- ── 9. Cholinergic Toxicity — SLUDGE ────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Cholinergic Toxicity — SLUDGE',
'SLUDGE',
'Classic signs of cholinergic (organophosphate) toxicity',
'Pharmacology','Pharmacology',
ARRAY['Toxicology','Cholinergic','Organophosphate','Emergency'],
ARRAY['Salivation','Lacrimation','Urination','Defecation','GI cramps','Emesis'],
'[
  {"emoji":"🤤","phrase":"S — Salivation","meaning":"Excessive drooling due to muscarinic receptor stimulation"},
  {"emoji":"😢","phrase":"L — Lacrimation","meaning":"Excessive tearing"},
  {"emoji":"🚽","phrase":"U — Urination","meaning":"Urinary incontinence — loss of bladder control"},
  {"emoji":"💩","phrase":"D — Defecation","meaning":"Uncontrolled defecation, diarrhoea"},
  {"emoji":"🤢","phrase":"G — GI cramps","meaning":"Abdominal pain, cramping, diarrhoea"},
  {"emoji":"🤮","phrase":"E — Emesis","meaning":"Vomiting"}
]'::jsonb,
'SLUDGE represents overstimulation of muscarinic receptors, seen in organophosphate poisoning (pesticides), nerve agents, and cholinergic drug overdose. These patients are WET — the opposite of anticholinergic toxicity.',
ARRAY['Organophosphate pesticides','Nerve agents (sarin, VX)','Physostigmine overdose','Pilocarpine overdose','Neostigmine overdose'],
'The most common exam trap: confusing SLUDGE (cholinergic = WET) with anticholinergic toxicity (DRY). Also remember cholinergic toxicity causes MIOSIS (pinpoint pupils), not mydriasis. Plus bradycardia, bronchospasm and excessive secretions.',
'"SLUDGE = Everything is running. Anticholinergic = Everything is dry."',
'Organophosphate poisoning also causes the KILLER triad: Bronchospasm + Bradycardia + Excessive secretions. Treatment = Atropine (blocks muscarinic) + Pralidoxime (reactivates acetylcholinesterase if given early).',
'{"question":"A farm worker presents with excessive salivation, pinpoint pupils, bradycardia, and urinary incontinence. What is the most likely cause?","options":["A. Anticholinergic toxicity","B. Organophosphate poisoning","C. Opioid overdose","D. Sympathomimetic toxicity"],"answer":"B","explanation":"Organophosphate poisoning causes cholinergic toxicity (SLUDGE): salivation, lacrimation, urination, defecation, GI cramps, emesis — plus miosis, bradycardia and bronchospasm. Anticholinergic toxicity causes the OPPOSITE: dry, dilated, tachycardic."}'::jsonb
);

-- ── 10. Digoxin Toxicity ─────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Digoxin Toxicity — DIG',
'DIG',
'Classic signs of digoxin toxicity',
'Pharmacology','Pharmacology',
ARRAY['Digoxin','Toxicity','Cardiology','Pharmacology'],
ARRAY['Diarrhoea','Irregular heartbeat','Green-yellow vision'],
'[
  {"emoji":"💩","phrase":"D — Diarrhoea","meaning":"GI symptoms: nausea, vomiting, diarrhoea, abdominal pain — often earliest signs"},
  {"emoji":"💓","phrase":"I — Irregular heartbeat","meaning":"Bradycardia, heart block, ventricular arrhythmias — most dangerous"},
  {"emoji":"🟡","phrase":"G — Green-yellow vision","meaning":"Xanthopsia — classic visual disturbance; halos around lights"}
]'::jsonb,
'Digoxin has a narrow therapeutic index (0.5–2.0 ng/mL). Toxicity is common, especially in elderly patients, those with renal impairment, or those taking medications that increase digoxin levels.',
ARRAY['Digoxin overdose','Renal failure (decreased excretion)','Hypokalaemia (potassium competes with digoxin at binding sites)','Hypomagnesaemia','Drugs: amiodarone, verapamil, quinidine increase digoxin levels'],
'Hypokalaemia is the most dangerous risk factor for digoxin toxicity because potassium and digoxin compete for the same binding site on Na/K ATPase. Low potassium = more digoxin binding = toxicity even at "normal" digoxin levels.',
'"DIG: Diarrhoea + Irregular heart + Green-yellow vision. Monitor potassium — hypokalaemia makes everything worse."',
'NCK High-Yield: Always check potassium BEFORE and DURING digoxin therapy. Hypokalaemia dramatically increases toxicity risk. Treatment: Stop digoxin, correct electrolytes, digoxin-specific antibody fragments (Digibind) for severe toxicity.',
'{"question":"A patient on digoxin reports nausea, vomiting, and yellow-green halos around lights. ECG shows bradycardia. What is the priority nursing action?","options":["A. Administer the next digoxin dose as scheduled","B. Hold digoxin and check serum digoxin and potassium levels","C. Give potassium supplements immediately","D. Increase the digoxin dose to therapeutic range"],"answer":"B","explanation":"These are classic signs of digoxin toxicity (DIG: Diarrhoea/nausea, Irregular rhythm, Green-yellow vision). The priority is to hold the next dose and assess digoxin and potassium levels. Giving more digoxin would be dangerous."}'::jsonb
);

-- ── 11. DKA — KUSSMAUL ──────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Diabetic Ketoacidosis — KUSSMAUL',
'KUSSMAUL',
'Classic presentation of diabetic ketoacidosis',
'Endocrine','Med-Surgical',
ARRAY['DKA','Diabetes','Endocrine','Emergency'],
ARRAY['Kussmaul breathing','Urine ketones','Severe dehydration','Sweet fruity breath','Metabolic acidosis','Altered mental status','Urgent insulin therapy','Loss of potassium'],
'[
  {"emoji":"💨","phrase":"K — Kussmaul breathing","meaning":"Deep, rapid breathing to blow off CO2 and compensate for metabolic acidosis"},
  {"emoji":"🧪","phrase":"U — Urine ketones","meaning":"Elevated urinary ketones from fat breakdown (lipolysis)"},
  {"emoji":"🏜️","phrase":"S — Severe dehydration","meaning":"Osmotic diuresis from hyperglycaemia causes profound fluid loss"},
  {"emoji":"🍬","phrase":"S — Sweet fruity breath","meaning":"Acetone on breath from ketone production"},
  {"emoji":"⚗️","phrase":"M — Metabolic acidosis","meaning":"pH <7.3, bicarbonate <18 mEq/L from ketoacid accumulation"},
  {"emoji":"🧠","phrase":"A — Altered mental status","meaning":"Confusion to coma from hyperosmolarity and acidosis"},
  {"emoji":"💉","phrase":"U — Urgent insulin therapy","meaning":"IV regular insulin infusion is cornerstone of treatment"},
  {"emoji":"⚡","phrase":"L — Loss of potassium","meaning":"Total body K+ depleted despite initially normal/high serum K+ — monitor closely during treatment"}
]'::jsonb,
'DKA occurs in Type 1 diabetes (and sometimes Type 2) due to absolute insulin deficiency. Without insulin, cells cannot use glucose, so the body breaks down fat, producing ketoacids. The triad: hyperglycaemia + metabolic acidosis + ketonaemia.',
ARRAY['Missed insulin doses','Infection (most common precipitant)','New-onset Type 1 diabetes','Stress/illness','Certain medications (SGLT2 inhibitors)'],
'The most dangerous NCK trap: Potassium in DKA. Serum potassium may appear NORMAL or HIGH on admission because acidosis drives K+ out of cells. But total body potassium is DEPLETED. As insulin is given and acidosis corrects, potassium shifts BACK into cells — causing dangerous HYPOKALAEMIA. Always monitor K+ closely and replace early.',
'"DKA smells sweet, breathes deeply, pees constantly, and is confused. Always monitor potassium when giving insulin."',
'DKA vs HHS: DKA has ketonaemia and acidosis (pH <7.3). HHS (Hyperosmolar Hyperglycaemic State) has NO significant ketones or acidosis but extremely high glucose (>33 mmol/L) and osmolarity. HHS is more common in Type 2.',
'{"question":"A patient with Type 1 diabetes has glucose 28 mmol/L, pH 7.2, and ketones 4+. What is the PRIORITY monitoring during insulin infusion?","options":["A. Blood glucose only","B. Serum potassium and blood glucose","C. Sodium and chloride","D. Urine output only"],"answer":"B","explanation":"During insulin infusion in DKA, potassium shifts back into cells as acidosis corrects, causing hypokalaemia. Serum potassium and blood glucose must be monitored closely. Potassium replacement is usually needed within 2–4 hours of starting insulin."}'::jsonb
);

-- ── 12. Hypercalcaemia ───────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Hypercalcaemia — Bones Stones Groans Thrones Overtones',
'Bones Stones Groans Thrones Psychiatric Overtones',
'Classic signs of hypercalcaemia',
'Electrolytes','Med-Surgical',
ARRAY['Calcium','Electrolytes','Endocrine','Nephrology'],
ARRAY['Bones — Bone pain','Stones — Kidney stones','Groans — Abdominal pain','Thrones — Polyuria/polydipsia','Psychiatric Overtones — Confusion/depression'],
'[
  {"emoji":"🦴","phrase":"Bones — Bone pain","meaning":"Osteoclast activation causes bone resorption, pain, and pathological fractures"},
  {"emoji":"💎","phrase":"Stones — Kidney stones","meaning":"Calcium deposits in renal tubules; nephrocalcinosis and nephrolithiasis"},
  {"emoji":"😣","phrase":"Groans — Abdominal pain","meaning":"Nausea, vomiting, constipation, peptic ulcers (calcium stimulates gastrin)"},
  {"emoji":"🚽","phrase":"Thrones — Polyuria/polydipsia","meaning":"Nephrogenic diabetes insipidus — kidneys cannot concentrate urine"},
  {"emoji":"🧠","phrase":"Psychiatric Overtones — Confusion","meaning":"Depression, anxiety, cognitive impairment, psychosis in severe hypercalcaemia"}
]'::jsonb,
'Hypercalcaemia (serum Ca2+ >2.6 mmol/L) is most commonly caused by hyperparathyroidism and malignancy. Recognition is important because severe hypercalcaemia (>3.5 mmol/L) is a medical emergency causing cardiac arrhythmias and coma.',
ARRAY['Primary hyperparathyroidism (most common in outpatients)','Malignancy — bone metastases, PTHrP secretion','Vitamin D toxicity','Thiazide diuretics','Sarcoidosis','Immobility','Milk-alkali syndrome'],
'Students confuse hypercalcaemia with hypocalcaemia. Hypercalcaemia: BONES STONES GROANS THRONES (think excess calcium causing havoc). Hypocalcaemia: CATS (Convulsions, Arrhythmias, Tetany, Spasms — think the body becoming hyperexcitable without calcium).',
'"Too much calcium makes your bones hurt, kidneys stone, gut groan, bathroom throne, and brain moan."',
'ECG in hypercalcaemia shows SHORT QT interval (calcium shortens repolarisation). Hypocalcaemia shows PROLONGED QT. This is a high-yield NCK exam point.',
'{"question":"A patient with lung cancer has serum calcium of 3.2 mmol/L. Which symptom cluster do you expect?","options":["A. Tetany, muscle cramps, perioral tingling","B. Bone pain, kidney stones, constipation, confusion","C. Bradycardia, oedema, weight gain","D. Polyuria, polydipsia, weight loss only"],"answer":"B","explanation":"Hypercalcaemia presents as Bones (pain), Stones (renal), Groans (GI: constipation, nausea), Thrones (polyuria/polydipsia), and Psychiatric Overtones (confusion). Malignancy is a common cause. Option A describes hypocalcaemia (CATS)."}'::jsonb
);

-- ── 13. Hypocalcaemia — CATS ─────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Hypocalcaemia — CATS',
'CATS',
'Signs of hypocalcaemia',
'Electrolytes','Med-Surgical',
ARRAY['Calcium','Electrolytes','Neuromuscular'],
ARRAY['Convulsions','Arrhythmias','Tetany','Spasms'],
'[
  {"emoji":"⚡","phrase":"C — Convulsions","meaning":"Seizures due to neuronal hyperexcitability from low calcium"},
  {"emoji":"💓","phrase":"A — Arrhythmias","meaning":"Prolonged QT interval; risk of torsades de pointes and cardiac arrest"},
  {"emoji":"🤝","phrase":"T — Tetany","meaning":"Carpopedal spasm; Trousseau sign (inflate BP cuff = hand spasm); Chvostek sign (tap facial nerve = facial twitch)"},
  {"emoji":"😫","phrase":"S — Spasms","meaning":"Laryngospasm (life-threatening), bronchospasm, muscle cramps, perioral tingling"}
]'::jsonb,
'Hypocalcaemia (serum Ca2+ <2.1 mmol/L) increases neuronal membrane excitability, causing neuromuscular hyperexcitability. Severe hypocalcaemia is an emergency requiring IV calcium gluconate.',
ARRAY['Hypoparathyroidism (post-thyroidectomy — most common surgical cause)','Vitamin D deficiency','Renal failure (cannot activate Vitamin D)','Hypomagnesaemia (prevents PTH release)','Pancreatitis (calcium binds to fat necrosis)','Massive blood transfusion (citrate chelates calcium)'],
'Chvostek sign (facial twitch on tapping CN VII) and Trousseau sign (carpopedal spasm on BP cuff inflation) are CLINICAL SIGNS of hypocalcaemia tested in NCK. Also: ECG shows PROLONGED QT — opposite of hypercalcaemia (short QT).',
'"Low calcium makes everything twitch and cramp. CATS: Convulsions, Arrhythmias, Tetany, Spasms."',
'Post-thyroidectomy patients are at highest risk of hypocalcaemia from accidental removal of parathyroid glands. Monitor for tingling around the mouth and carpopedal spasm in the first 24–48 hours after thyroid surgery.',
'{"question":"A patient who had a thyroidectomy yesterday develops perioral tingling and carpopedal spasm when you inflate their blood pressure cuff. What does this indicate?","options":["A. Hyperkalaemia","B. Hypocalcaemia","C. Stroke","D. Hypercalcaemia"],"answer":"B","explanation":"Carpopedal spasm on blood pressure cuff inflation is Trousseau sign — a classic clinical sign of hypocalcaemia. Post-thyroidectomy patients risk hypoparathyroidism from parathyroid gland damage or removal, reducing PTH and causing low calcium (CATS)."}'::jsonb
);

-- ── 14. ABG Interpretation — ROME ───────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'ABG Interpretation — ROME',
'ROME',
'Interpreting arterial blood gas results',
'Respiratory','Med-Surgical',
ARRAY['ABG','Acid-Base','Respiratory','Metabolic'],
ARRAY['Respiratory Opposite','Metabolic Equal'],
'[
  {"emoji":"💨","phrase":"Respiratory Opposite","meaning":"In respiratory disorders: pH and PaCO2 move in OPPOSITE directions. Respiratory acidosis = high CO2 + low pH. Respiratory alkalosis = low CO2 + high pH"},
  {"emoji":"⚗️","phrase":"Metabolic Equal","meaning":"In metabolic disorders: pH and HCO3 move in the SAME (EQUAL) direction. Metabolic acidosis = low HCO3 + low pH. Metabolic alkalosis = high HCO3 + high pH"}
]'::jsonb,
'ROME is the foundational mnemonic for interpreting arterial blood gas results. It allows rapid identification of whether an acid-base disturbance is respiratory or metabolic in origin.',
ARRAY['Respiratory acidosis: COPD, pneumonia, respiratory failure, opioid overdose','Respiratory alkalosis: anxiety, pain, hyperventilation, high altitude','Metabolic acidosis: DKA, renal failure, lactic acidosis, poisoning','Metabolic alkalosis: vomiting, NG suction, thiazide diuretics, antacid overuse'],
'Students confuse compensation with the primary disorder. In ROME, identify the PRIMARY disorder first using pH: pH <7.35 = acidosis; pH >7.45 = alkalosis. Then identify which parameter (CO2 or HCO3) is responsible. Then check if compensation is present.',
'"R-O-M-E: Respiratory is Opposite (CO2 vs pH). Metabolic is Equal (HCO3 and pH go together)."',
'NCK ABG steps: 1) Check pH (acidosis or alkalosis?) 2) Check CO2 (respiratory cause?) 3) Check HCO3 (metabolic cause?) 4) Use ROME to confirm 5) Check compensation 6) Oxygenation: PaO2 <80 = hypoxaemia.',
'{"question":"A patient with COPD exacerbation has pH 7.28, PaCO2 60 mmHg, HCO3 26 mEq/L. What is the primary disorder?","options":["A. Metabolic acidosis","B. Respiratory alkalosis","C. Respiratory acidosis with metabolic compensation","D. Metabolic alkalosis"],"answer":"C","explanation":"Using ROME: Respiratory Opposite — pH is low (7.28) and CO2 is high (60). They move in opposite directions = respiratory acidosis. HCO3 is slightly elevated (26) indicating partial metabolic compensation (kidneys retaining bicarbonate to buffer the acidosis)."}'::jsonb
);

-- ── 15. APGAR Score ──────────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'APGAR Score',
'Appearance Pulse Grimace Activity Respiration',
'Neonatal assessment immediately after birth',
'Pediatrics','Obstetrics',
ARRAY['Neonatal','Assessment','Paediatrics','Obstetrics'],
ARRAY['Appearance','Pulse','Grimace','Activity','Respiration'],
'[
  {"emoji":"🎨","phrase":"A — Appearance (Skin colour)","meaning":"0 = blue/pale all over; 1 = blue extremities, pink body; 2 = completely pink"},
  {"emoji":"💓","phrase":"P — Pulse (Heart rate)","meaning":"0 = absent; 1 = <100 bpm; 2 = ≥100 bpm"},
  {"emoji":"😬","phrase":"G — Grimace (Reflex irritability)","meaning":"0 = no response; 1 = grimace; 2 = cough, sneeze, or cry"},
  {"emoji":"💪","phrase":"A — Activity (Muscle tone)","meaning":"0 = limp; 1 = some flexion; 2 = active flexion of all limbs"},
  {"emoji":"🫁","phrase":"R — Respiration","meaning":"0 = absent; 1 = weak/irregular/gasping; 2 = strong cry"}
]'::jsonb,
'APGAR score is assessed at 1 minute and 5 minutes after birth. Each category scored 0–2. Total: 7–10 = normal. 4–6 = moderate depression, intervention needed. 0–3 = severe depression, immediate resuscitation required.',
ARRAY['Prematurity','Birth asphyxia','Maternal analgesia/anaesthesia','Prolonged labour','Cord complications','Congenital anomalies'],
'Students confuse Grimace with Appearance. Grimace tests REFLEX IRRITABILITY (response to stimulation like nasal suction), not a smile. Also: A 1-minute APGAR predicts need for immediate resuscitation. A 5-minute APGAR reflects response to resuscitation and predicts outcomes.',
'"APGAR: 10 points total. 7–10 = good. 4–6 = needs help. 0–3 = emergency resuscitation."',
'The 1-minute APGAR score does NOT predict long-term neurological outcome. The 5-minute score is more clinically significant. A score persistently <5 at 10 and 20 minutes is associated with neurological morbidity.',
'{"question":"A newborn at 1 minute has: blue extremities (1), heart rate 110 bpm (2), grimace only (1), some flexion (1), weak cry (1). What is the APGAR score?","options":["A. 4","B. 6","C. 7","D. 8"],"answer":"B","explanation":"Add the scores: Appearance=1 + Pulse=2 + Grimace=1 + Activity=1 + Respiration=1 = 6. A score of 6 indicates moderate depression and the neonate needs stimulation and possibly supplemental oxygen. Reassess at 5 minutes."}'::jsonb
);

-- ── 16. HELLP Syndrome ──────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'HELLP Syndrome',
'HELLP',
'Severe complication of preeclampsia in pregnancy',
'Maternity','Obstetrics',
ARRAY['Obstetrics','Preeclampsia','Maternity','Emergency'],
ARRAY['Haemolysis','Elevated Liver enzymes','Low Platelets'],
'[
  {"emoji":"🩸","phrase":"H — Haemolysis","meaning":"Red blood cells destroyed as they pass through damaged blood vessels — causes anaemia and jaundice"},
  {"emoji":"🫀","phrase":"E — Elevated Liver enzymes","meaning":"AST and ALT elevated; right upper quadrant pain; risk of liver rupture"},
  {"emoji":"🔻","phrase":"LP — Low Platelets","meaning":"Thrombocytopenia <100,000/mm³; risk of DIC and bleeding"}
]'::jsonb,
'HELLP syndrome is a life-threatening complication of severe preeclampsia, usually presenting in the third trimester or postpartum. It requires immediate delivery of the baby as definitive treatment.',
ARRAY['Severe preeclampsia','Preeclampsia with severe features','Eclampsia'],
'Students confuse HELLP with DIC. HELLP has thrombocytopenia AND elevated liver enzymes + haemolysis. DIC has thrombocytopenia + elevated clotting times + fibrin degradation products. HELLP can progress TO DIC. Also: HELLP can occur UP TO 48 hours AFTER delivery.',
'"HELLP: Haemolysis + Elevated Liver enzymes + Low Platelets. It is severe preeclampsia plus organ damage."',
'Classic HELLP presentation: pregnant woman with epigastric or RUQ pain, malaise, nausea/vomiting, headache. Blood tests: elevated LDH (haemolysis), elevated AST/ALT (liver), low platelets. Immediate obstetric emergency.',
'{"question":"A 32-week pregnant woman presents with epigastric pain, nausea, and headache. Labs show: AST 350, platelets 75,000/mm³, LDH elevated. What is the diagnosis?","options":["A. Appendicitis","B. Acute cholecystitis","C. HELLP syndrome","D. Viral hepatitis"],"answer":"C","explanation":"HELLP syndrome: Haemolysis (elevated LDH), Elevated Liver enzymes (AST 350), Low Platelets (75,000). Combined with pregnancy and epigastric pain, this is a classic HELLP presentation. Immediate obstetric management and likely delivery is required."}'::jsonb
);

-- ── 17. Placenta Previa vs Abruption ─────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Placenta Previa vs Placental Abruption',
'Painless = Previa. Painful = Abruption',
'Differentiating antepartum haemorrhage causes',
'Maternity','Obstetrics',
ARRAY['Obstetrics','Antepartum Haemorrhage','Maternity'],
ARRAY['Painless bleeding = Placenta Previa','Painful bleeding = Placental Abruption'],
'[
  {"emoji":"😌","phrase":"Painless = Previa","meaning":"Placenta covers the cervical os; bleeding is PAINLESS bright red bleeding without contractions. Avoid vaginal examination."},
  {"emoji":"😣","phrase":"Painful = Abruption","meaning":"Placenta separates prematurely from uterine wall; PAINFUL, dark red bleeding with board-like rigid uterus and fetal distress. Blood may be concealed."}
]'::jsonb,
'Antepartum haemorrhage (APH) occurs after 24 weeks. The two main causes — placenta previa and placental abruption — must be differentiated immediately as management differs completely.',
ARRAY['Placenta Previa: low-lying placenta, prior C-section, multiple pregnancies, advanced maternal age','Placental Abruption: hypertension, trauma, cocaine use, smoking, short umbilical cord, prior abruption'],
'NEVER perform a vaginal examination in suspected placenta previa — it can cause catastrophic haemorrhage by disrupting the placenta. Always image (ultrasound) first. In contrast, placental abruption may have no visible bleeding (concealed abruption) yet be life-threatening.',
'"Pain with blood = Abruption (something tore). Painless blood = Previa (placenta is in the way)."',
'NCK KEY: Placenta previa — painless, bright red, recurrent bleeds. Previa is confirmed by ultrasound. C-section is required. Placental abruption — painful, dark blood, rigid uterus, fetal distress. Can be concealed haemorrhage. Emergency delivery.',
'{"question":"A 30-week pregnant woman presents with sudden painless bright red vaginal bleeding. No uterine tenderness. What is the most likely diagnosis?","options":["A. Placental abruption","B. Placenta previa","C. Preterm labour","D. Vasa praevia"],"answer":"B","explanation":"Painless bright red vaginal bleeding without uterine tenderness is the classic presentation of placenta previa. The placenta covers or is near the cervical os. A vaginal examination must NEVER be performed — diagnosis is by ultrasound. C-section is required."}'::jsonb
);

-- ── 18. TB Treatment — RIPE ──────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Tuberculosis Treatment — RIPE',
'RIPE',
'First-line drugs for tuberculosis treatment',
'Infectious Diseases','Med-Surgical',
ARRAY['Tuberculosis','Pharmacology','Infectious Disease','Respiratory'],
ARRAY['Rifampicin','Isoniazid','Pyrazinamide','Ethambutol'],
'[
  {"emoji":"🔴","phrase":"R — Rifampicin","meaning":"Inhibits bacterial RNA polymerase; turns body secretions orange-red. Duration: 6 months total."},
  {"emoji":"💛","phrase":"I — Isoniazid","meaning":"Inhibits mycolic acid synthesis; causes peripheral neuropathy (give pyridoxine/B6 prophylactically). Duration: 6 months."},
  {"emoji":"🟠","phrase":"P — Pyrazinamide","meaning":"Active against intracellular TB; causes hyperuricaemia (gout). Duration: first 2 months only."},
  {"emoji":"🟡","phrase":"E — Ethambutol","meaning":"Inhibits arabinosyl transferase; can cause optic neuritis (monitor visual acuity). Duration: first 2 months."}
]'::jsonb,
'Standard TB treatment is 6 months: 2 months RIPE (intensive phase) + 4 months RI (continuation phase). Directly Observed Therapy (DOT) is recommended to ensure adherence and prevent drug resistance.',
ARRAY['Mycobacterium tuberculosis','HIV co-infection increases TB risk','Multi-drug resistant TB (MDR-TB) — resistant to at least Rifampicin and Isoniazid'],
'The most common NCK trap: Isoniazid causes peripheral neuropathy — ALWAYS give Pyridoxine (Vitamin B6) concurrently to prevent this. Also: Rifampicin turns urine, sweat, and tears orange-red — warn patients this is normal and not harmful.',
'"RIPE: 2 months of all four. Then continue RI for 4 more months. TOTAL = 6 months."',
'Monitor: Liver function (all four drugs are hepatotoxic). Visual acuity (Ethambutol — optic neuritis). Uric acid (Pyrazinamide — gout). Peripheral neuropathy (Isoniazid — give B6).',
'{"question":"A patient starting TB treatment reports tingling and numbness in both hands and feet after 4 weeks. Which drug is most likely responsible?","options":["A. Rifampicin","B. Isoniazid","C. Pyrazinamide","D. Ethambutol"],"answer":"B","explanation":"Isoniazid causes peripheral neuropathy by interfering with Vitamin B6 (pyridoxine) metabolism. This is why pyridoxine supplementation is routinely given alongside isoniazid. Ethambutol causes optic neuritis (visual symptoms), not peripheral neuropathy."}'::jsonb
);

-- ── 19. HIV First-Line — TLD ─────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'HIV First-Line Treatment — TLD',
'TLD',
'Kenya''s standard first-line HIV regimen',
'Infectious Diseases','Pharmacology',
ARRAY['HIV','ARV','Pharmacology','Infectious Disease'],
ARRAY['Tenofovir','Lamivudine','Dolutegravir'],
'[
  {"emoji":"💊","phrase":"T — Tenofovir (TDF)","meaning":"Nucleotide reverse transcriptase inhibitor (NRTI). Monitor renal function — can cause nephrotoxicity."},
  {"emoji":"💊","phrase":"L — Lamivudine (3TC)","meaning":"Nucleoside reverse transcriptase inhibitor (NRTI). Well tolerated. Also used in Hepatitis B treatment."},
  {"emoji":"💊","phrase":"D — Dolutegravir (DTG)","meaning":"Integrase strand transfer inhibitor (INSTI). High barrier to resistance. Central nervous system side effects possible (insomnia, mood changes)."}
]'::jsonb,
'TLD (Tenofovir + Lamivudine + Dolutegravir) is Kenya''s preferred first-line antiretroviral therapy per Kenya National ARV Guidelines. It is given as a single daily fixed-dose combination tablet, improving adherence. Goal: undetectable viral load (<20–50 copies/mL).',
ARRAY['HIV-1 infection','Prevention of Mother-to-Child Transmission (PMTCT)'],
'Dolutegravir should be used with CAUTION in the first trimester of pregnancy due to early concerns about neural tube defects (though evidence has evolved — check current guidelines). Tenofovir requires monitoring of renal function (eGFR) and bone density.',
'"TLD = one tablet once daily. Simple regimen, high resistance barrier, excellent efficacy."',
'WHO Test and Treat strategy: All HIV-positive individuals should start ARVs regardless of CD4 count. Viral load monitoring is the gold standard to assess treatment response — not CD4 alone.',
'{"question":"A patient newly diagnosed with HIV in Kenya is about to start ARV therapy. Which first-line regimen is currently recommended?","options":["A. Zidovudine + Lamivudine + Nevirapine (ZLN)","B. Tenofovir + Lamivudine + Dolutegravir (TLD)","C. Efavirenz + Tenofovir + Emtricitabine","D. Abacavir + Lamivudine + Lopinavir"],"answer":"B","explanation":"Kenya''s current first-line HIV regimen is TLD: Tenofovir + Lamivudine + Dolutegravir. It is given as a single daily tablet, has a high barrier to resistance, and is the WHO-preferred regimen globally for most adults and adolescents."}'::jsonb
);

-- ── 20. Trauma Assessment — ABCDE ───────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Trauma Assessment — ABCDE',
'ABCDE',
'Systematic primary survey in trauma/emergency nursing',
'Emergency Nursing','Emergency',
ARRAY['Emergency','Trauma','Assessment','Critical Care'],
ARRAY['Airway','Breathing','Circulation','Disability','Exposure'],
'[
  {"emoji":"🫁","phrase":"A — Airway","meaning":"Assess and secure airway with C-spine protection. Look for obstruction, stridor, foreign body. Jaw thrust (not head tilt) if C-spine injury suspected."},
  {"emoji":"💨","phrase":"B — Breathing","meaning":"Assess respiratory rate, chest movement, oxygen saturation. Look for tension pneumothorax, haemothorax, flail chest. Apply oxygen."},
  {"emoji":"❤️","phrase":"C — Circulation","meaning":"Assess pulse (rate, rhythm, quality), blood pressure, skin colour/temperature/capillary refill. Control haemorrhage. IV access."},
  {"emoji":"🧠","phrase":"D — Disability","meaning":"AVPU or GCS assessment. Check pupils (size, equality, reactivity). Blood glucose. Signs of raised ICP."},
  {"emoji":"🔍","phrase":"E — Exposure","meaning":"Undress patient completely for full assessment. Keep warm to prevent hypothermia. Log roll to examine back."}
]'::jsonb,
'ABCDE is the systematic approach used in all emergency assessments, particularly trauma. It follows a strict priority order: airway problems kill fastest, so they are addressed first. Life threats are identified and treated at each step before moving to the next.',
ARRAY['Motor vehicle accidents','Falls','Penetrating injuries','Burns','Drowning','Anaphylaxis','Cardiac arrest'],
'Students often skip straight to the obvious injury (e.g. a fractured limb). Always follow ABCDE in ORDER — a patient cannot breathe if the airway is obstructed, regardless of the dramatic limb injury. Also: in C-spine injury, use jaw thrust NOT head-tilt-chin-lift to open airway.',
'"A before B before C — every time, every patient. Fix each problem before moving on."',
'In paediatric trauma: children compensate so well that they can appear stable while losing 25–30% of blood volume. By the time they decompensate, they crash fast. Always worry about tachycardia in an injured child.',
'{"question":"A patient arrives after a road traffic accident with a suspected cervical spine injury. He is unresponsive. What is the FIRST priority?","options":["A. Immobilize the cervical spine with a collar","B. Establish IV access and give fluids","C. Open the airway using jaw thrust","D. Assess GCS score"],"answer":"C","explanation":"A (Airway) is always the first priority in ABCDE. In C-spine injury, use jaw thrust (not head-tilt-chin-lift) to open the airway while maintaining spinal alignment. Without a patent airway, all other interventions are futile."}'::jsonb
);

-- ── 21. Compartment Syndrome — Six Ps ───────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Compartment Syndrome — The Six Ps',
'The Six Ps',
'Signs and symptoms of acute compartment syndrome',
'Musculoskeletal','Med-Surgical',
ARRAY['Orthopaedics','Emergency','Fractures','Musculoskeletal'],
ARRAY['Pain','Pressure','Pallor','Pulselessness','Paraesthesia','Paralysis'],
'[
  {"emoji":"😣","phrase":"Pain","meaning":"Severe pain out of proportion to the injury — earliest and most important sign. Pain on PASSIVE stretch of muscles in the compartment is pathognomonic."},
  {"emoji":"📈","phrase":"Pressure","meaning":"Tense, woody swelling of the compartment. Compartment pressure >30 mmHg (or within 30 mmHg of diastolic) = emergency fasciotomy"},
  {"emoji":"⬜","phrase":"Pallor","meaning":"Pale, tight, shiny skin over the compartment"},
  {"emoji":"💓","phrase":"Pulselessness","meaning":"Loss of distal pulse — LATE sign. Limb may already be irreversibly damaged by this point"},
  {"emoji":"⚡","phrase":"Paraesthesia","meaning":"Tingling or numbness — indicates nerve ischaemia; early neurological sign"},
  {"emoji":"😔","phrase":"Paralysis","meaning":"Loss of motor function — LATE and ominous sign of severe ischaemia"}
]'::jsonb,
'Acute compartment syndrome occurs when pressure within a closed muscle compartment rises enough to compromise blood flow, causing ischaemia. It is a surgical emergency — fasciotomy within 6 hours prevents permanent damage.',
ARRAY['Fractures (especially tibia, radius, ulna)','Crush injuries','Tight casts or bandages','Burns','Prolonged limb compression','Reperfusion after vascular injury'],
'The most dangerous trap: waiting for pulselessness before acting. Pulselessness is a LATE sign — permanent nerve and muscle damage may have already occurred. Pain on passive stretch is the EARLIEST reliable sign. Do NOT elevate the limb above heart level (reduces perfusion further). Remove the cast IMMEDIATELY if compartment syndrome is suspected.',
'"Pain that is TOO severe for the injury + passive stretch pain = Compartment Syndrome until proven otherwise."',
'Normal compartment pressure is 0–8 mmHg. Fasciotomy is indicated when pressure exceeds 30 mmHg or when the difference between diastolic blood pressure and compartment pressure is <30 mmHg (the "delta P").',
'{"question":"A patient had a tibial fracture repaired and has a cast in place. They report severe pain with passive dorsiflexion of the toes, and tingling in the foot. What is the PRIORITY action?","options":["A. Elevate the limb above the heart","B. Administer stronger analgesia and reassess in 2 hours","C. Split or bivalve the cast immediately and notify the surgeon","D. Apply ice packs to reduce swelling"],"answer":"C","explanation":"Pain on passive stretch + paraesthesia = acute compartment syndrome. The cast must be split/bivalved IMMEDIATELY to relieve pressure. Elevation WORSENS compartment syndrome by reducing perfusion. Delaying treatment causes irreversible nerve and muscle damage."}'::jsonb
);

-- ── 22. Depression — SIGECAPS ────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Depression — SIGECAPS',
'SIGECAPS',
'DSM diagnostic criteria for major depressive episode',
'Mental Health','Med-Surgical',
ARRAY['Mental Health','Depression','Psychiatry'],
ARRAY['Sleep disturbance','Interest loss','Guilt','Energy loss','Concentration poor','Appetite change','Psychomotor changes','Suicidal ideation'],
'[
  {"emoji":"😴","phrase":"S — Sleep disturbance","meaning":"Insomnia (difficulty falling/staying asleep) or hypersomnia (sleeping too much)"},
  {"emoji":"😐","phrase":"I — Interest loss","meaning":"Anhedonia — loss of interest or pleasure in previously enjoyable activities"},
  {"emoji":"😔","phrase":"G — Guilt","meaning":"Excessive guilt, worthlessness, self-blame; may be delusional in severity"},
  {"emoji":"😩","phrase":"E — Energy loss","meaning":"Profound fatigue and loss of energy not explained by activity"},
  {"emoji":"🧠","phrase":"C — Concentration poor","meaning":"Difficulty thinking, concentrating, or making decisions"},
  {"emoji":"🍽️","phrase":"A — Appetite change","meaning":"Decreased appetite with weight loss, or increased appetite with weight gain"},
  {"emoji":"🐢","phrase":"P — Psychomotor changes","meaning":"Psychomotor retardation (slowed movement/speech) or agitation (observable by others)"},
  {"emoji":"💀","phrase":"S — Suicidal ideation","meaning":"Recurrent thoughts of death, suicidal ideation, or suicide attempt"}
]'::jsonb,
'Major Depressive Disorder (MDD) is diagnosed when 5 or more SIGECAPS symptoms are present for ≥2 weeks, with at least one being depressed mood or anhedonia (loss of interest). Symptoms must cause significant functional impairment.',
ARRAY['Biological factors (serotonin, norepinephrine dysregulation)','Chronic illness (cancer, diabetes, cardiac disease)','Hypothyroidism','Postpartum depression','Grief and bereavement','Substance use','Life stressors'],
'Always assess suicidal ideation directly — asking about suicide does NOT increase suicide risk. It is a professional obligation. Ask: "Are you having any thoughts of harming yourself or ending your life?" Also: Distinguish MDD from bipolar disorder — bipolar includes manic/hypomanic episodes. Using antidepressants alone in bipolar can trigger mania.',
'"SIG = prescription (Latin). E CAPS = energy capsules. The doctor is PRESCRIBING energy capsules because the depressed patient has none."',
'NCK High-Yield: The MOST IMPORTANT assessment in a depressed patient is SUICIDE RISK. Assess lethality, plan, intent, and means. A patient who has given away possessions or says "things would be better without me" requires immediate safety assessment.',
'{"question":"A patient states she has felt worthless and hopeless for the past 3 weeks, cannot sleep, has lost 5kg, and has no interest in her children. Which priority assessment must be performed?","options":["A. Assessment of nutritional status","B. Assessment for suicidal ideation","C. Referral to occupational therapy","D. Sleep hygiene education"],"answer":"B","explanation":"In any patient presenting with depression symptoms (SIGECAPS), suicidal ideation must always be assessed as the PRIORITY. Multiple SIGECAPS symptoms for >2 weeks = major depressive episode. Suicidal ideation is both a diagnostic criterion AND an immediate safety concern."}'::jsonb
);

-- ── 23. Schizophrenia — HAD ───────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Schizophrenia — HAD',
'HAD',
'Positive symptoms of schizophrenia',
'Mental Health','Med-Surgical',
ARRAY['Mental Health','Schizophrenia','Psychiatry'],
ARRAY['Hallucinations','Agitation','Delusions'],
'[
  {"emoji":"👂","phrase":"H — Hallucinations","meaning":"Sensory perceptions without external stimulus. Auditory hallucinations (hearing voices) are most common in schizophrenia. Can also be visual, tactile, olfactory."},
  {"emoji":"😤","phrase":"A — Agitation","meaning":"Disorganized behaviour, psychomotor agitation, unpredictable actions; can include catatonia"},
  {"emoji":"🧩","phrase":"D — Delusions","meaning":"Fixed false beliefs not based in reality. Persecutory (most common), grandiose, referential, or somatic. Patient cannot be talked out of them."}
]'::jsonb,
'Schizophrenia is a chronic psychotic disorder. HAD represents the positive symptoms (added behaviours not normally present). Negative symptoms include flat affect, alogia, avolition, anhedonia, and social withdrawal.',
ARRAY['Genetic predisposition','Dopamine dysregulation (mesolimbic pathway — excess)','Cannabis use','Stress/trauma','Neurodevelopmental factors'],
'Positive symptoms (HAD) = excess or distortion of normal functions. Negative symptoms = diminishment of normal functions (flat affect, social withdrawal, poverty of speech). Antipsychotics treat positive symptoms well but have limited effect on negative symptoms.',
'"HAD — the patient HAD experiences that weren''t real and beliefs that weren''t true."',
'Auditory command hallucinations (voices telling the patient to harm self or others) are a PSYCHIATRIC EMERGENCY requiring immediate intervention. Always assess for command hallucinations in psychotic patients.',
'{"question":"A patient reports that the television is sending special messages directly to him, and he hears voices telling him he is chosen. Which symptoms are these?","options":["A. Negative symptoms of schizophrenia","B. Positive symptoms of schizophrenia — delusions and hallucinations","C. Symptoms of major depressive disorder","D. Symptoms of dementia"],"answer":"B","explanation":"HAD: Hallucinations (hearing voices) and Delusions (referential delusion — believing TV sends personal messages) are POSITIVE symptoms of schizophrenia — they represent experiences and beliefs added to normal function. Negative symptoms would be flat affect, withdrawal, and poverty of speech."}'::jsonb
);

-- ── 24. Wound Healing — HIP ──────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Wound Healing — HIP',
'HIP',
'Phases of wound healing',
'Wound Care','Med-Surgical',
ARRAY['Wound Care','Surgery','Med-Surg','Tissue Repair'],
ARRAY['Haemostasis','Inflammation','Proliferation','(Remodelling/Maturation)'],
'[
  {"emoji":"⚡","phrase":"H — Haemostasis (Immediate, 0–minutes)","meaning":"Vasoconstriction + platelet plug formation + fibrin clot seals the wound. Pro-inflammatory mediators released."},
  {"emoji":"🔴","phrase":"I — Inflammation (0–5 days)","meaning":"Vasodilation + neutrophils arrive first (24h) then macrophages (48–72h). Wound is red, swollen, warm, painful. Macrophages debride and release growth factors."},
  {"emoji":"🔧","phrase":"P — Proliferation (Day 5 – 3 weeks)","meaning":"Fibroblasts produce collagen. Angiogenesis (new blood vessels). Wound contraction. Granulation tissue fills the defect."},
  {"emoji":"✨","phrase":"Remodelling/Maturation (3 weeks – 2 years)","meaning":"Collagen reorganizes and cross-links. Scar matures — tensile strength increases but never reaches 100% (maximum ~80%)."}
]'::jsonb,
'Understanding wound healing phases guides nursing assessment and intervention. Wound healing can be delayed by infection, poor nutrition, diabetes, poor blood supply, steroids, and advanced age.',
ARRAY['Infection (most common cause of delayed healing)','Diabetes mellitus (poor vascularisation and nerve damage)','Malnutrition (especially Vitamin C and zinc deficiency)','Corticosteroids (suppress inflammation and fibroblasts)','Ischaemia / peripheral vascular disease','Anaemia'],
'Students confuse the order of cells in the inflammatory phase. Neutrophils arrive FIRST (within hours) and clean debris. Macrophages arrive SECOND (48–72h) and are essential for directing repair. Without macrophages, wound healing fails.',
'"HIP: Haemostasis stops the bleeding. Inflammation cleans the wound. Proliferation rebuilds it. Remodelling strengthens it."',
'Vitamin C is essential for collagen synthesis (hydroxylation of proline and lysine). Vitamin C deficiency (scurvy) causes poor wound healing and bleeding gums. Zinc is a cofactor for many enzymes in wound repair. Assess nutrition in non-healing wounds.',
'{"question":"A patient who had abdominal surgery 3 days ago has a warm, red, swollen wound edge with serous drainage. What phase of wound healing is this?","options":["A. Haemostasis","B. Inflammation","C. Proliferation","D. Remodelling"],"answer":"B","explanation":"The inflammatory phase occurs 0–5 days post-injury. Redness, warmth, swelling and serous drainage are NORMAL features of inflammation. Neutrophils and macrophages are active. This is not infection — infection presents with purulent drainage, increased pain, fever, and systemic signs."}'::jsonb
);

-- ── 25. Cushing's Triad ──────────────────────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'Cushing''s Triad — Raised ICP',
'Hypertension, Bradycardia, Irregular Breathing',
'Late signs of raised intracranial pressure',
'Neurology','Neurology',
ARRAY['Neurology','Emergency','ICP','Neurosurgery'],
ARRAY['↑ Hypertension (widening pulse pressure)','↓ Bradycardia','Irregular breathing'],
'[
  {"emoji":"📈","phrase":"Hypertension","meaning":"Rising systolic BP with widening pulse pressure — the brainstem tries to maintain cerebral perfusion against rising ICP"},
  {"emoji":"🫀","phrase":"Bradycardia","meaning":"Reflex bradycardia (Cushing reflex) as the body responds to hypertension via baroreceptors"},
  {"emoji":"🌬️","phrase":"Irregular Breathing","meaning":"Cheyne-Stokes, central neurogenic hyperventilation, or ataxic breathing — brainstem compression affecting respiratory centres"}
]'::jsonb,
'Cushing''s Triad is a LATE and OMINOUS sign of severely raised intracranial pressure indicating brainstem herniation is imminent. Immediate neurosurgical intervention is required. Do not wait for all three signs — act on early ICP signs.',
ARRAY['Traumatic brain injury','Intracerebral haemorrhage','Subdural haematoma','Subarachnoid haemorrhage','Brain tumour','Hydrocephalus','Cerebral oedema'],
'Students wait for all THREE signs before acting. By the time all three are present, brain herniation may have already begun. Early signs of raised ICP are: decreasing GCS, worsening headache, vomiting (especially projectile), papilloedema, and unequal pupils. Cushing''s Triad is a pre-terminal sign.',
'"Hypertension + Bradycardia + Irregular breathing = Brain about to herniate. This is an emergency."',
'Head positioning: Elevate head of bed to 30 degrees to reduce ICP (not flat or Trendelenburg). Avoid hypotension, hypoxia, hypercapnia and fever — all worsen ICP. Hyperventilation (PCO2 target 35 mmHg) temporarily reduces ICP by causing cerebral vasoconstriction.',
'{"question":"A head-injured patient develops systolic blood pressure of 190 mmHg, heart rate of 52 bpm, and irregular respirations. What does this indicate?","options":["A. Neurogenic shock","B. Cushing''s triad — severely raised intracranial pressure","C. Autonomic dysreflexia","D. Vasovagal syncope"],"answer":"B","explanation":"Cushing''s Triad: Hypertension (widening pulse pressure) + Bradycardia + Irregular breathing = critically raised ICP with impending brainstem herniation. This is a neurosurgical emergency requiring immediate intervention (mannitol, head elevation, urgent CT, consider emergency decompression)."}'::jsonb
);

-- ── 26. 6 Rights of Drug Administration ─────────────────────
INSERT INTO public.mnemonics (title,acronym,description,specialty,category,tags,phrases,breakdown,clinical_significance,causes,exam_traps,memory_pearl,high_yield_tip,practice_question) VALUES (
'6 Rights of Drug Administration',
'Right Drug, Right Dose, Right Route, Right Time, Right Patient, Right Documentation',
'Medication safety framework',
'Pharmacology','Pharmacology',
ARRAY['Medication Safety','Pharmacology','Nursing Practice'],
ARRAY['Right Drug','Right Dose','Right Route','Right Time','Right Patient','Right Documentation'],
'[
  {"emoji":"💊","phrase":"Right Drug","meaning":"Verify the medication name against the prescription — check for sound-alike/look-alike drug confusion"},
  {"emoji":"⚖️","phrase":"Right Dose","meaning":"Calculate and confirm the correct quantity; double-check calculations for high-alert medications"},
  {"emoji":"🛤️","phrase":"Right Route","meaning":"PO, IV, IM, SC, topical — administer exactly as prescribed; never substitute routes"},
  {"emoji":"⏰","phrase":"Right Time","meaning":"Administer at the correct scheduled time or frequency; understand PRN versus scheduled dosing"},
  {"emoji":"🪪","phrase":"Right Patient","meaning":"Two-identifier verification — always check name AND date of birth or hospital number"},
  {"emoji":"📝","phrase":"Right Documentation","meaning":"Document immediately after administration, not before; record dose, route, time, site"}
]'::jsonb,
'The 6 Rights are the foundational medication safety framework in nursing practice. Medication errors are the most common type of medical error and are largely preventable through consistent application of the 6 Rights.',
ARRAY['Sound-alike/look-alike drug names','Decimal point errors (e.g. 1.0mg vs 10mg)','Wrong patient identification','Transcription errors','High-alert medications: insulin, heparin, potassium, opioids, chemotherapy'],
'The most common NCK trap: documenting BEFORE administration. Documentation must always occur IMMEDIATELY AFTER giving the medication — never in advance. Also: The "Right Reason" is sometimes listed as a 7th Right. Always verify WHY the patient is receiving the medication.',
'"Before you give any drug: 6 Checks. Every time. No shortcuts — especially for high-alert medications."',
'High-alert medications requiring extra verification: Insulin (hypoglycaemia risk), IV Potassium (cardiac arrest risk), Heparin/Warfarin (bleeding risk), Opioids (respiratory depression), Digoxin (narrow therapeutic index), Chemotherapy.',
'{"question":"A nurse prepares insulin for a patient and draws it up before checking the patient''s name band. Which of the 6 Rights was compromised?","options":["A. Right drug","B. Right dose","C. Right patient","D. Right time"],"answer":"C","explanation":"The Right Patient requires two-identifier verification BEFORE preparing and administering any medication. The patient''s name band must be checked against the prescription. Insulin is a high-alert medication — wrong patient identification can cause life-threatening hypoglycaemia."}'::jsonb
);
