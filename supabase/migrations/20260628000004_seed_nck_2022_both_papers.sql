-- Migration: 20260628000004
-- Source: NCK-NEW-MCQ-Compilation.docx — Year 2022 (NOV 2022 CBT)
-- Both KRCHN and BScN, Paper I and Paper II
-- Audit: verified against MOH Kenya, Kenya IMNCI, Brunner & Suddarth, Myles,
--        BNF, DSM-5, Kenya STI/FP/EPI/TB guidelines, KEPH framework
-- Paper assignment per nck-exam-system.md Section 12.
-- ON CONFLICT (stem, cadre) DO NOTHING on every INSERT.

-- ── Q1: Troponin biomarker in MI ──────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Cardiovascular Nursing','Which biomarker is released in myocardial infarction?','Troponin','Atrial natriuretic peptide','Myosin','Tumour necrosis factor','A','Cardiac troponin I and T are the most specific and sensitive biomarkers released following myocardial infarction (Brunner & Suddarth; Kenya cardiac care protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Cardiovascular Nursing','Which biomarker is released in myocardial infarction?','Troponin','Atrial natriuretic peptide','Myosin','Tumour necrosis factor','A','Cardiac troponin is the most specific biomarker for myocardial infarction; its elevation guides diagnosis and management decisions (Brunner & Suddarth; evidence-based cardiac care).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q2: Latent infection in animals ──────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Epidemiology','The disease that stays in animals for long periods is described as:','Active','Latent','Dormant','Inactive','B','An infectious agent that persists in an animal/host over a long period without overt disease is described as latent (Park''s Textbook of Preventive & Social Medicine; community health epidemiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Epidemiology','The disease that stays in animals for long periods is described as:','Active','Latent','Dormant','Inactive','B','A latent infection persists in a reservoir host without causing overt disease; this epidemiological concept underlies zoonosis surveillance (Park''s Preventive & Social Medicine; MOH Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q3: Norfloxacin dose for uncomplicated UTI ────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Antimicrobial Therapy','The correct dosage of norfloxacin for uncomplicated UTI is:','800 mg 12-hourly for 7 days','400 mg 12-hourly for 7 days','200 mg 12-hourly for 7–10 days','500 mg 12-hourly for 7 days','B','Kenya Essential Medicines / BNF: norfloxacin for uncomplicated lower UTI is 400 mg orally twice daily (12-hourly) for 7 days.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Antimicrobial Therapy','The correct dosage of norfloxacin for uncomplicated UTI is:','800 mg 12-hourly for 7 days','400 mg 12-hourly for 7 days','200 mg 12-hourly for 7–10 days','500 mg 12-hourly for 7 days','B','Kenya Essential Medicines / BNF: norfloxacin 400 mg 12-hourly × 7 days for uncomplicated lower UTI. Appropriate antibiotic selection and duration matter for stewardship (BNF; MOH Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q4: Dexamethasone for severe COVID-19 (WHO) ───────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','COVID-19 Management','Which drug is recommended by WHO for management of severe COVID-19?','Dexamethasone','Erythromycin','Remdesivir','Chloroquine','A','WHO recommends dexamethasone (6 mg daily × 10 days) for severe/critical COVID-19 requiring oxygen or ventilation; adopted in Kenya MOH COVID-19 case management guidelines.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','COVID-19 Management','Which drug is recommended by WHO for management of severe COVID-19?','Dexamethasone','Erythromycin','Remdesivir','Chloroquine','A','WHO/MOH Kenya COVID-19 guidelines recommend dexamethasone for severe/critical disease; nurses must understand its immunosuppressive rationale and monitoring parameters (BNF; WHO COVID-19 therapeutics guidance).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q5: Freud anal stage age 1–3 years ───────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Growth and Development','The psychosexual stage of development which occurs at age one to three years is:','Phallic phase','Oral phase','Anal stage','Genital stage','C','Freud''s psychosexual stages: the anal stage (approximately 1–3 years) is focused on toilet training and control (psychiatric/mental health nursing texts used in Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Growth and Development','The psychosexual stage of development which occurs at age one to three years is:','Phallic phase','Oral phase','Anal stage','Genital stage','C','Freud: anal stage (1–3 years) centres on toilet training; fixation may produce obsessive traits. This theoretical framework informs mental health assessment in nursing practice (DSM-5; Stuart Psychiatric Nursing).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q6: KEPH cohort 5 — Adulthood ────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Systems in Kenya','According to KEPH, cohort 5 consists of:','Pregnancy and delivery','Teenage-hood','Adulthood','Adolescence','C','The Kenya Essential Package for Health (KEPH) life-cycle cohort 5 is Adulthood (ages 25–59 years); MOH Kenya KEPH framework.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Systems in Kenya','According to KEPH, cohort 5 consists of:','Pregnancy and delivery','Teenage-hood','Adulthood','Adolescence','C','KEPH cohort 5 is Adulthood (25–59 years); understanding the KEPH life-cycle framework is essential for community health programme planning in Kenya (MOH Kenya KEPH).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q7: Vision 2030 — 5-year Medium Term Plans ───────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Systems in Kenya','Kenya Vision 2030 is implemented through:','10-yearly plans','5-yearly term plans','2-yearly term plans','20-yearly term plans','B','Kenya Vision 2030 is implemented through successive five-year Medium Term Plans (MTPs); MOH Kenya planning documents.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Systems in Kenya','Kenya Vision 2030 is implemented through:','10-yearly plans','5-yearly term plans','2-yearly term plans','20-yearly term plans','B','Kenya Vision 2030 is implemented through successive 5-year MTPs; health sector strategic plans align with MTPs in the KEPH framework (MOH Kenya planning).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q8: Acute angioedema mimics anaphylaxis ───────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Emergency Nursing','Which syndrome mimics anaphylactic shock?','Haemorrhagic shock','Acute angioedema','Liver failure','Renal failure','B','Acute angioedema closely mimics anaphylactic shock — airway swelling, hypotension, urticaria — and is managed similarly with adrenaline and antihistamines (Brunner & Suddarth; Basic Emergency Nursing).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Emergency Nursing','Which syndrome mimics anaphylactic shock?','Haemorrhagic shock','Acute angioedema','Liver failure','Renal failure','B','Acute angioedema presents similarly to anaphylaxis; differentiating the two requires careful history and assessment. Management with epinephrine is common to both (Brunner & Suddarth; clinical reasoning).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q9: 2nd ANC visit — review obstetric issues ───────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antenatal Care','Which activities are performed on the 2nd focused ANC visit?','Review obstetric issues that may occur in the current pregnancy','Carry out VDRL','Do rhesus factor and blood group','Do a random blood sugar','A','Kenya focused ANC guidelines: the 2nd ANC visit (24–28 weeks) reviews obstetric issues that may occur in the current pregnancy; VDRL and blood grouping are done at the booking visit (1st visit).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antenatal Care','Which activities are performed on the 2nd focused ANC visit?','Review obstetric issues that may occur in the current pregnancy','Carry out VDRL','Do rhesus factor and blood group','Do a random blood sugar','A','Kenya focused ANC protocol: the 2nd visit reviews current-pregnancy obstetric concerns and updates screening. Nurses must be able to sequence ANC interventions appropriately (MOH Kenya Focused ANC guidelines; Myles).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q10: Para 2+0 G3 at 36 weeks — upper abdominal pain → gastritis ──────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Obstetric Assessment','Mrs X (Para 2+0 G3) with a previous caesarean section presents at 36 weeks with upper abdominal pain lasting 3 days. Normal fetal movement, no other complaints. What is the most likely diagnosis?','Braxton Hicks contractions','Gastritis','Appendicitis','Normal labour','B','At 36 weeks with 3 days of upper abdominal pain, normal fetal movements and no features of hypertension/proteinuria/labour, gastritis is the most likely diagnosis (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Obstetric Assessment','Mrs X (Para 2+0 G3) with a previous caesarean section presents at 36 weeks with upper abdominal pain lasting 3 days. Normal fetal movement, no other complaints. What is the most likely diagnosis?','Braxton Hicks contractions','Gastritis','Appendicitis','Normal labour','B','Differential diagnosis requires ruling out pre-eclampsia (no hypertension/proteinuria) and labour (no contractions). Sustained upper abdominal pain without these features is consistent with gastritis (Myles; clinical reasoning).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q11: Absolute contraindications to induction of labour ───────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour Management','Which is an absolute contraindication to induction of labour?','Fetal compromise and previous uterine scar','Cephalopelvic disproportion and active genital herpes','Cephalopelvic disproportion and malpresentation','Active genital herpes and intrauterine fetal death','B','Cephalopelvic disproportion and active genital herpes are both absolute contraindications to induction of labour per Kenya obstetric protocols and Myles Textbook for Midwives.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour Management','Which is an absolute contraindication to induction of labour?','Fetal compromise and previous uterine scar','Cephalopelvic disproportion and active genital herpes','Cephalopelvic disproportion and malpresentation','Active genital herpes and intrauterine fetal death','B','Absolute contraindications include CPD (risks uterine rupture) and active genital herpes (risks neonatal herpes). Nurses must assess eligibility for induction before initiating (Myles; MOH Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q12: Placenta praevia type 3 — elective caesarean ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antepartum Haemorrhage','Management of placenta praevia type 3 includes:','Emergency caesarean section','Elective caesarean section','Spontaneous vertex delivery','Assisted vaginal delivery','B','Type 3 (partial major) placenta praevia partially covers the os; in a stable patient, delivery by planned elective caesarean section at term is the standard management (Myles Textbook for Midwives; Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antepartum Haemorrhage','Management of placenta praevia type 3 includes:','Emergency caesarean section','Elective caesarean section','Spontaneous vertex delivery','Assisted vaginal delivery','B','Type 3 praevia requires elective caesarean at term in a stable patient; emergency section is reserved for haemorrhage. Nurses must understand grading and individualise management (Myles; MOH Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q13: Glaucoma — tunnel vision ─────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Ophthalmology','Which is a clinical manifestation of glaucoma?','Tunnel vision','Occipital headache','Scleral hyperaemia','Conjunctival hyperaemia','A','Chronic open-angle glaucoma causes progressive loss of peripheral visual fields producing characteristic tunnel vision (Brunner & Suddarth''s Medical-Surgical Nursing).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Ophthalmology','Which is a clinical manifestation of glaucoma?','Tunnel vision','Occipital headache','Scleral hyperaemia','Conjunctival hyperaemia','A','Glaucoma destroys peripheral retinal ganglion cells first, producing tunnel vision. Nurses must screen for this sign in at-risk patients and teach about intraocular pressure management (Brunner & Suddarth).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q14: Oranges as a source of calcium ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Nutrition','Which of the following fruits is a source of calcium?','Oranges','Bananas','Tomatoes','Avocados','A','Oranges (citrus fruits) are recognised as a plant source of calcium; MOH Kenya/KEPH nutrition guidance lists citrus among calcium-contributing foods.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Nutrition','Which of the following fruits is a source of calcium?','Oranges','Bananas','Tomatoes','Avocados','A','Oranges are a dietary source of calcium; nutritional counselling for bone health should include citrus fruits as part of a balanced diet (MOH Kenya nutrition guidelines; KEPH).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q15: SDG 4 — Quality Education ───────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Systems in Kenya','Which of the following is SDG 4?','Gender equality','Affordable and clean energy','No poverty','Quality education','D','SDG 4 is Quality Education — ensure inclusive and equitable quality education and promote lifelong learning opportunities for all (UN Sustainable Development Goals; adopted in Kenya development frameworks).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Systems in Kenya','Which of the following is SDG 4?','Gender equality','Affordable and clean energy','No poverty','Quality education','D','SDG 4 is Quality Education; SDG 3 is Good Health and Well-being. Nurses must apply SDG literacy when framing community health plans (UN SDGs; MOH Kenya strategic plans).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q16: Functional nursing — task assignment ─────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Management','Which description best explains functional nursing?','Each nurse is assigned one or more tasks for a number of patients in the ward','The nurse is accountable for total care of one or more patients per shift','Patients are divided into groups under individual nurses','There is comprehensive, continuous, coordinated and individualised care','A','Functional nursing assigns specific tasks (e.g. all dressings, all medications) to nurses for all or a group of patients — task-focused, not patient-centred (nursing management texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Management','Which description best explains functional nursing?','Each nurse is assigned one or more tasks for a number of patients in the ward','The nurse is accountable for total care of one or more patients per shift','Patients are divided into groups under individual nurses','There is comprehensive, continuous, coordinated and individualised care','A','Functional nursing is task-centred; it maximises efficiency but fragments care. Nurses must compare it with total, team and primary nursing models (nursing management/leadership texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q17: APGAR score 7 at 5 minutes ──────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Neonatal Assessment','An infant at 5 minutes of life has: pulse 95/min, cyanotic hands and feet, some flexion of extremities, irregular breathing. The APGAR score is:','7','8','9','10','A','APGAR scoring: HR <100 = 1, acrocyanosis = 1, some flexion = 1, irregular respiration = 1, plus grimace reflex = 1; total = 5–7 range; score of 7 is appropriate for this clinical picture (Kenya Basic Paediatric Protocols; newborn assessment).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Neonatal Assessment','An infant at 5 minutes of life has: pulse 95/min, cyanotic hands and feet, some flexion of extremities, irregular breathing. The APGAR score is:','7','8','9','10','A','APGAR assessment: HR <100 = 1, acrocyanosis = 1, some flexion = 1, weak irregular respiratory effort = 1, grimace = 1; total ≈ 7. Interpretation guides neonatal resuscitation decisions (Kenya Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q18: Total body water — 60% ──────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Fluid and Electrolytes','What is the percentage of water in the human body?','50%','60%','80%','30%','B','Total body water averages approximately 60% of body weight in adults (Brunner & Suddarth; fluid and electrolyte physiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Fluid and Electrolytes','What is the percentage of water in the human body?','50%','60%','80%','30%','B','Total body water is ~60% in adults; varies with age, sex, and adiposity. This physiological baseline underpins fluid resuscitation and electrolyte management (Brunner & Suddarth; Guyton physiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q19: Universal Health Coverage — Health for all ──────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Systems in Kenya','Universal health coverage under Vision 2030 aims at:','Health for all','Health education','Health for almost all people','Health for almost two-thirds of people','A','Universal Health Coverage (UHC) under Kenya Vision 2030 aims at equitable access to quality health services for all — ''Health for all'' — without financial hardship (MOH Kenya UHC policy).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Systems in Kenya','Universal health coverage under Vision 2030 aims at:','Health for all','Health education','Health for almost all people','Health for almost two-thirds of people','A','UHC under Kenya Vision 2030 aims at Health for all with financial risk protection; nurses are key advocates for equitable access (MOH Kenya UHC strategy; WHO UHC framework).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q20: Cause-specific death rate ───────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Epidemiology','Deaths attributed to a specific disease over a period of time are expressed as:','Case-fatality death rate','Crude death rate','Cause-specific death rate','Case fatality rate','C','The cause-specific death rate = deaths from a specific cause ÷ total population × 1000 in a given period; distinct from crude death rate (all causes) and case fatality rate (deaths among cases only) (community health epidemiology; Park''s).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Epidemiology','Deaths attributed to a specific disease over a period of time are expressed as:','Case-fatality death rate','Crude death rate','Cause-specific death rate','Case fatality rate','C','Cause-specific death rate measures disease-specific mortality in a population; used for programme evaluation. Nurses must apply correct epidemiological measures when analysing community data (Park''s; MOH Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q21: Severe dehydration — sunken eyes, skin pinch slow, unable to drink ───
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Diarrhoea Management','A child with sunken eyes, skin pinch going back slowly, and unable to drink is classified as:','Dehydration','Moderate dehydration','Severe dehydration','Some dehydration','C','Kenya IMNCI: two or more signs including sunken eyes, very slow skin pinch return, and inability to drink/drink poorly classify the child as severe dehydration (Plan C — IV rehydration).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Diarrhoea Management','A child with sunken eyes, skin pinch going back slowly, and unable to drink is classified as:','Dehydration','Moderate dehydration','Severe dehydration','Some dehydration','C','Kenya IMNCI severe dehydration: ≥2 signs including sunken eyes, very slow skin turgor, not able to drink. Requires immediate Plan C (IV Ringer''s lactate) and admission (Kenya IMNCI; Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q22: P wave — atrial depolarisation ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Cardiovascular Assessment','The P wave on an ECG represents:','Ventricular hyperpolarisation','Atrial depolarisation','Atrial repolarisation','Ventricular repolarisation','B','The P wave represents depolarisation of the atria; QRS = ventricular depolarisation; T wave = ventricular repolarisation (Brunner & Suddarth; Guyton cardiac physiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Cardiovascular Assessment','The P wave on an ECG represents:','Ventricular hyperpolarisation','Atrial depolarisation','Atrial repolarisation','Ventricular repolarisation','B','P wave = atrial depolarisation. ECG interpretation is an advanced nursing competency requiring integration of cardiac physiology and clinical management (Brunner & Suddarth; Guyton).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q23: Hyperkalaemia ECG — prominent U wave is NOT a feature ────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Fluid and Electrolytes','Features of hyperkalaemia on ECG include all EXCEPT:','Tall peaked T waves','Flattened P waves','Prominent U wave','Widened QRS','C','Hyperkalaemia ECG: tall peaked T waves, flattened/absent P waves, widened QRS, sine-wave pattern. Prominent U waves are characteristic of HYPOkalaemia, not hyperkalaemia (Brunner & Suddarth).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Fluid and Electrolytes','Features of hyperkalaemia on ECG include all EXCEPT:','Tall peaked T waves','Flattened P waves','Prominent U wave','Widened QRS','C','Prominent U waves indicate hypokalaemia; hyperkalaemia causes peaked T waves, widened QRS, and absent P waves. Distinguishing electrolyte ECG changes is a core critical-care competency (Brunner & Suddarth).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q24: Asystole management — CPR (non-shockable) ───────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Emergency Nursing','On seeing an asystole ECG, the nurse should immediately:','Administer 100% oxygen','Call physician','Start CPR','Call for a defibrillator','C','Asystole is a non-shockable rhythm; immediate high-quality CPR is the priority — defibrillation is NOT indicated for asystole (AHA/Kenya Basic Paediatric Protocols resuscitation guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Emergency Nursing','On seeing an asystole ECG, the nurse should immediately:','Administer 100% oxygen','Call physician','Start CPR','Call for a defibrillator','C','Asystole requires immediate CPR; defibrillation is contraindicated (no shockable rhythm). Adrenaline and reversible cause correction guide advanced management (AHA; Brunner & Suddarth critical care).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q25: IUCD abnormal bleeding — tranexamic acid ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Family Planning','A woman using IUCD presents with per vaginal bleeding and no other known cause is found. The treatment is:','Tranexamic acid','Dilatation and curettage','Hormonal contraceptives','Remove the IUCD','A','For IUCD-associated abnormal bleeding with no identified pathology, tranexamic acid (antifibrinolytic) is used to control bleeding while retaining the device; Kenya National Family Planning Guidelines.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Family Planning','A woman using IUCD presents with per vaginal bleeding and no other known cause is found. The treatment is:','Tranexamic acid','Dilatation and curettage','Hormonal contraceptives','Remove the IUCD','A','Tranexamic acid manages IUCD-related bleeding without removing an otherwise appropriately placed device. NSAIDs are an alternative. Nurses counsel women on expected outcomes (Kenya National FP Guidelines; WHO MEC).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q26: Presumptive signs of pregnancy — fetal heart rate is NOT presumptive ─
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Diagnosis of Pregnancy','The presumptive signs of pregnancy include all EXCEPT:','Amenorrhoea','Breast changes','Fetal heart rate','Morning sickness','C','Fetal heart rate is a positive (definitive) sign of pregnancy, not a presumptive one; amenorrhoea, breast changes and morning sickness are presumptive (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Diagnosis of Pregnancy','The presumptive signs of pregnancy include all EXCEPT:','Amenorrhoea','Breast changes','Fetal heart rate','Morning sickness','C','Classifying signs as presumptive, probable, or positive is fundamental to midwifery assessment. Fetal heart auscultated by examiner = positive sign. Nurses apply this in diagnosis (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q27: Pediculosis capitis — nits not easily scraped off ────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Skin Disorders','A child with pediculosis capitis will appear with:','Flakes of dandruff easily scraped off','Flakes of dandruff not easily scraped off','Bite marks with flakes','Silvery flakes','B','Nits (louse eggs) adhere firmly to hair shafts, appearing as flakes that cannot be easily scraped off — distinguishing them from dandruff (paediatric nursing/communicable disease texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Skin Disorders','A child with pediculosis capitis will appear with:','Flakes of dandruff easily scraped off','Flakes of dandruff not easily scraped off','Bite marks with flakes','Silvery flakes','B','Differentiation of nits from dandruff is a clinical assessment skill; management includes permethrin and fine-tooth combing. Nurses educate on school exclusion policies (paediatric nursing texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q28: SGA — below 10th percentile ─────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Neonatal Assessment','Small for gestational age (SGA) babies are:','Babies less than 2500 g birth weight','Babies born before 37 weeks gestation','Babies below the 10th percentile of birth weight for gestational age','Babies more than 3500 g','C','SGA is defined as birth weight below the 10th percentile for gestational age, distinct from low birth weight (LBW <2500 g) or prematurity (Myles Textbook for Midwives; Kenya Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Neonatal Assessment','Small for gestational age (SGA) babies are:','Babies less than 2500 g birth weight','Babies born before 37 weeks gestation','Babies below the 10th percentile of birth weight for gestational age','Babies more than 3500 g','C','SGA (<10th percentile) requires monitoring for hypoglycaemia, polycythaemia, and hypothermia. Differentiating SGA from LBW and preterm guides nursing care planning (Myles; Kenya Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q29: Placenta praevia — painless vaginal bleeding ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antepartum Haemorrhage','A pregnant woman presents with painless vaginal bleeding. She is most likely to have:','Placenta abruption','Placenta praevia','Placenta percreta','Placenta increta','B','Placenta praevia presents with painless, causeless antepartum haemorrhage; abruption is characteristically painful (Myles Textbook for Midwives; Kenya national obstetric guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antepartum Haemorrhage','A pregnant woman presents with painless vaginal bleeding. She is most likely to have:','Placenta abruption','Placenta praevia','Placenta percreta','Placenta increta','B','Painless APH = placenta praevia until proven otherwise. Management depends on gestational age, haemodynamic stability and praevia grade. Nurses must recognise and escalate immediately (Myles; MOH Kenya obstetrics).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q30: Alveoli — site of gas exchange ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Respiratory Anatomy','Exchange of air in the lungs occurs in:','Trachea','Bronchi','Bronchioles','Alveoli','D','Gas exchange (O₂ and CO₂) occurs across the alveolar-capillary membrane in the alveoli (Brunner & Suddarth; Guyton respiratory physiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Respiratory Anatomy','Exchange of air in the lungs occurs in:','Trachea','Bronchi','Bronchioles','Alveoli','D','Alveolar-capillary gas exchange underpins respiratory physiology; impairment leads to hypoxaemia/hypercapnia. Nurses apply this when interpreting ABG and SpO₂ (Brunner & Suddarth; Guyton).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q31: Denominator in vertex presentation — occiput ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','The denominator in vertex presentation is:','Sacrum','Mentum','Occiput','Sinciput','C','In vertex presentation the denominator (reference point) is the occiput (Myles Textbook for Midwives; obstetric assessment).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','The denominator in vertex presentation is:','Sacrum','Mentum','Occiput','Sinciput','C','Denominator varies by presentation: occiput (vertex), sacrum (breech), mentum (face). Knowing the denominator is essential for position assessment and progress of labour (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q32: Nurses Act Cap 257 ───────────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Professional Regulation','The Act of Parliament that provides for training, registration, enrolment and licensing of nurses in Kenya is:','Cap 248','Cap 257','Cap 249','Cap 284','B','The Nurses Act Cap 257 of the Laws of Kenya provides for training, registration, enrolment and licensing of nurses and governs the Nursing Council of Kenya (NCK).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Professional Regulation','The Act of Parliament that provides for training, registration, enrolment and licensing of nurses in Kenya is:','Cap 248','Cap 257','Cap 249','Cap 284','B','Nurses Act Cap 257 establishes NCK authority over nursing practice, training standards and discipline. Note: Cap 248 is the Mental Health Act (NCK scope of practice; Kenyan healthcare law).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q33: Bilirubin excreted as urobilinogen ───────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Gastrointestinal Physiology','Bilirubin is excreted in urine in which form?','Biliverdin','Urobilinogen','Stercobilin','Stercobilinogen','B','Conjugated bilirubin is reduced by gut bacteria to urobilinogen; a portion is reabsorbed and excreted by the kidney as urobilinogen (Brunner & Suddarth; Guyton physiology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Gastrointestinal Physiology','Bilirubin is excreted in urine in which form?','Biliverdin','Urobilinogen','Stercobilin','Stercobilinogen','B','Urobilinogen in urine (and stercobilin in faeces) are bilirubin metabolites; elevated urine urobilinogen signals haemolysis or hepatic dysfunction (Brunner & Suddarth; laboratory diagnostics).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q34: Midwives Association of Kenya — founded 2010 ─────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Professional Regulation','When was the Midwives Association of Kenya started?',2010,'1998',2016,'2020','A','The Midwives Association of Kenya (MAK) was established in 2010 to advance midwifery practice and professional standards in Kenya.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Professional Regulation','When was the Midwives Association of Kenya started?',2010,'1998',2016,'2020','A','The Midwives Association of Kenya was founded in 2010; professional body membership supports CPD and advocacy for midwifery services (Kenya nursing/midwifery professional regulation).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q35: Mechanical factors of labour ────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Physiology of Labour','Mechanical factors involved in labour include:','General fluid pressure, formation of retraction ring, rupture of membranes','Rupture of membranes, formation of forewaters, general fluid pressure','Formation of forewaters, polarity, contraction and retraction ring','Rupture of membranes, cervical effacement, formation of retraction ring','B','Myles Textbook for Midwives: mechanical factors aiding labour are rupture of membranes, formation of forewaters, and general fluid pressure (including fetal axis pressure).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Physiology of Labour','Mechanical factors involved in labour include:','General fluid pressure, formation of retraction ring, rupture of membranes','Rupture of membranes, formation of forewaters, general fluid pressure','Formation of forewaters, polarity, contraction and retraction ring','Rupture of membranes, cervical effacement, formation of retraction ring','B','Mechanical factors (Myles): rupture of membranes, forewaters, and general fluid pressure assist cervical dilatation and fetal descent. Nurses monitor these during labour assessment.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q36: Paternalism — limiting autonomy for own good ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Professional Ethics','Paternalism in nursing is defined as:','Limiting someone''s autonomy for their own good','Practising male chauvinism','Choosing to do the best for the patient','Self-determination','A','Paternalism is limiting a person''s autonomy supposedly for their own benefit; it conflicts with the ethical principle of autonomy (nursing ethics; Brunner & Suddarth; Kenya nursing ethics syllabus).','medium',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Professional Ethics','Paternalism in nursing is defined as:','Limiting someone''s autonomy for their own good','Practising male chauvinism','Choosing to do the best for the patient','Self-determination','A','Paternalism overrides patient autonomy — ethically distinct from beneficence. Nurses must navigate paternalistic tensions in informed consent, medication refusal, and capacity assessment (bioethics; NCK scope of practice).','medium',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q37: Social health — ability to handle social conditions ─────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Concepts of Health','Social health is best defined as:','Total physical, social and mental wellbeing','Individual''s ability to handle and act in different social conditions','Ability to treat and counsel someone socially','None of the above','B','Social health is an individual''s ability to function and interact effectively in different social conditions and relationships; option A is WHO''s broader definition of overall health (community health/sociology texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Concepts of Health','Social health is best defined as:','Total physical, social and mental wellbeing','Individual''s ability to handle and act in different social conditions','Ability to treat and counsel someone socially','None of the above','B','Social health reflects social functioning capacity; nurses assess social health as part of holistic community and individual assessment (community health/sociology texts; WHO health definition framework).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q38: Elements of culture — values, beliefs, roles ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Social Determinants of Health','The core elements of culture include:','Language, status, material life','Values, beliefs, roles','Religion, material life, status','Languages, beliefs, social interactions','B','Core non-material elements of culture are values (standards guiding behaviour), beliefs (ideas about reality) and roles/norms (Park''s Preventive & Social Medicine; community health sociology notes).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Social Determinants of Health','The core elements of culture include:','Language, status, material life','Values, beliefs, roles','Religion, material life, status','Languages, beliefs, social interactions','B','Cultural elements — values, beliefs, roles/norms — directly influence health behaviour; culturally competent nurses integrate this awareness into care planning and health education (sociology; community health texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q39: Yellow fever — Aedes mosquito ───────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','Yellow fever is transmitted by:','Aedes mosquito','Anopheles mosquito','Black fly','Sand fly','A','Yellow fever is transmitted by the Aedes aegypti mosquito (MOH Kenya communicable disease/EPI guidelines; Park''s Preventive & Social Medicine).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','Yellow fever is transmitted by:','Aedes mosquito','Anopheles mosquito','Black fly','Sand fly','A','Aedes aegypti transmits yellow fever; Anopheles transmits malaria; black fly transmits onchocerciasis; sand fly transmits leishmaniasis. Vector identification is essential for outbreak control (MOH Kenya EPI guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q40: Exposure and response prevention — first-line for OCD ───────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','OCD Treatment','The most widely used psychological treatment for OCD-related disorders is:','Interpersonal psychotherapy','Psychoanalysis','Exposure and response prevention','Operant conditioning','C','Exposure and response prevention (ERP) is the evidence-based first-line psychological treatment for OCD (Kenya Mental Health guidelines; Stuart Psychiatric Nursing; DSM-5 treatment recommendations).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','OCD Treatment','The most widely used psychological treatment for OCD-related disorders is:','Interpersonal psychotherapy','Psychoanalysis','Exposure and response prevention','Operant conditioning','C','ERP is the gold-standard CBT approach for OCD; nurses must understand its rationale to reinforce therapeutic goals and support patients between sessions (DSM-5; Stuart Psychiatric Nursing; NICE guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q41: Orchitis — complication of mumps ────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Communicable Diseases','The classic complication of mumps is:','Stomatitis','Orchitis','Gastritis','Blepharitis','B','Orchitis (inflammation of the testis) is the classic and most common serious complication of mumps in post-pubertal males and can cause infertility (Kenya IMNCI/EPI; Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Communicable Diseases','The classic complication of mumps is:','Stomatitis','Orchitis','Gastritis','Blepharitis','B','Mumps orchitis can lead to infertility; MMR vaccination prevents it. Nurses counsel parents on vaccine-preventable disease complications (Kenya EPI; Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q42: Billings method — fertile mucus: thin, slippery, profuse ─────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Family Planning','In the Billings ovulation method, a woman is considered fertile when cervical mucus is:','The number of days since the last period is 14','Thick, slippery and scanty','Thin, slippery and profuse','Lower abdominal pain in the middle of her cycle','C','In the Billings method, fertility is indicated by thin, slippery, profuse (spinnbarkeit) mucus around ovulation (Kenya National Family Planning Guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Family Planning','In the Billings ovulation method, a woman is considered fertile when cervical mucus is:','The number of days since the last period is 14','Thick, slippery and scanty','Thin, slippery and profuse','Lower abdominal pain in the middle of her cycle','C','Thin, slippery, profuse (egg-white) cervical mucus indicates the peri-ovulatory fertile phase in the Billings method; nurses counsel on observation and charting (Kenya National FP Guidelines; WHO MEC).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q43: Maslow hierarchy — correct sequence ──────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Theory','Maslow''s hierarchy of needs in correct ascending sequence is:','Physiological, belonging, safety, self-esteem, self-actualisation','Self-actualisation, safety, self-esteem, belonging, physiological','Physiological, safety, belonging, self-esteem, self-actualisation','Safety, belonging, physiological, self-actualisation, self-esteem','C','Maslow''s hierarchy (ascending): Physiological → Safety → Belonging/Love → Self-Esteem → Self-Actualisation (nursing foundations; community health nursing texts used in Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Theory','Maslow''s hierarchy of needs in correct ascending sequence is:','Physiological, belonging, safety, self-esteem, self-actualisation','Self-actualisation, safety, self-esteem, belonging, physiological','Physiological, safety, belonging, self-esteem, self-actualisation','Safety, belonging, physiological, self-actualisation, self-esteem','C','Maslow''s hierarchy guides nursing prioritisation; nurses address lower-order physiological and safety needs before higher-order psychosocial needs (nursing theory; leadership texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q44: Tinidazole 2g single dose for giardiasis ─────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Antiparasitic Therapy','The drug of choice for giardiasis is:','Tinidazole 5 mg single dose','Metronidazole 2 mg single dose','Metronidazole 400 mg TDS for 5 days','Tinidazole 2 g single dose','D','Tinidazole 2 g as a single oral dose is the drug of choice for giardiasis (Kenya Clinical/Basic Paediatric Protocols; BNF antiprotozoals).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Antiparasitic Therapy','The drug of choice for giardiasis is:','Tinidazole 5 mg single dose','Metronidazole 2 mg single dose','Metronidazole 400 mg TDS for 5 days','Tinidazole 2 g single dose','D','Tinidazole 2 g single dose is preferred over metronidazole for giardiasis due to superior cure rates and single-dose convenience. Nurses confirm dose accuracy before administration (BNF; Kenya Basic Paediatric Protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q45: Lochia rubra — red, lasts 0–4 days ──────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postnatal Care','Which statement about lochia is correct?','Lochia alba lasts 9–15 days and is reddish','Lochia serosa is yellowish and lasts 10–15 days','Lochia rubra is reddish and lasts 0–4 days','None of the above','C','Lochia rubra is red/blood-stained and lasts the first 1–4 days postpartum; lochia serosa (pinkish) follows, then lochia alba (whitish) (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postnatal Care','Which statement about lochia is correct?','Lochia alba lasts 9–15 days and is reddish','Lochia serosa is yellowish and lasts 10–15 days','Lochia rubra is reddish and lasts 0–4 days','None of the above','C','Lochia rubra (days 1–4): red; serosa (days 5–9): pinkish; alba (days 10–28): whitish. Abnormal lochia (offensive odour, heavy clots) signals puerperal sepsis or retained products (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q46: Ophthalmia neonatorum — 1% tetracycline eye ointment ────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Newborn Care','Prevention of ophthalmia neonatorum during delivery includes:','Prenatal treatment of STIs and administration of 3% tetracycline ointment','Treatment of STIs and administration of 1% tetracycline ointment','Treatment of STIs and administration of 5% tetracycline ointment','Treatment of STIs and administration of 2% tetracycline ointment','B','Prevention: maternal STI treatment during pregnancy PLUS prophylactic 1% tetracycline eye ointment to both eyes within 1 hour of birth (MOH Kenya newborn care guidelines; WHO; Myles).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Newborn Care','Prevention of ophthalmia neonatorum during delivery includes:','Prenatal treatment of STIs and administration of 3% tetracycline ointment','Treatment of STIs and administration of 1% tetracycline ointment','Treatment of STIs and administration of 5% tetracycline ointment','Treatment of STIs and administration of 2% tetracycline ointment','B','1% tetracycline eye ointment (not 3% or higher) within 1 hour of birth is the MOH Kenya standard. Nurses must know the correct concentration to avoid ocular toxicity (MOH Kenya; WHO; Myles).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q47: Rubin's puerperium phases — Taking In ────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postnatal Care','A woman 24 hours post delivery requests that her baby be returned to the nursery so she can sleep. She is in which phase of puerperium?','Letting go','Taking in','Depression','Taking hold','B','Rubin''s puerperal phases: Taking In (passive, dependent, focusing on own recovery) is characterised by wanting to rest and be cared for. This is normal within the first 1–2 days (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postnatal Care','A woman 24 hours post delivery requests that her baby be returned to the nursery so she can sleep. She is in which phase of puerperium?','Letting go','Taking in','Depression','Taking hold','B','Taking In phase: normal dependent behaviour on day 1–2. Nurses must distinguish normal Taking In from postpartum depression or bonding disorders by observing progression over days 3–5 (Myles; Rubin''s model).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q48: Antidote for heparin — protamine sulfate ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Anticoagulant Therapy','The antidote for heparin is:','Warfarin','Vitamin K','Protamine sulfate','Naloxone','C','Protamine sulfate is the specific antidote that reverses heparin anticoagulation by forming an inactive complex (BNF; MOH Kenya emergency pharmacology). Vitamin K reverses warfarin; naloxone reverses opioids.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Anticoagulant Therapy','The antidote for heparin is:','Warfarin','Vitamin K','Protamine sulfate','Naloxone','C','Protamine sulfate reverses heparin; vitamin K reverses warfarin/VKAs; idarucizumab reverses dabigatran. Correct antidote selection is a critical patient safety competency (BNF; pharmacology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q49: Placenta functional at 3 months ─────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Placental Physiology','The placenta starts functioning from which gestation?','After 3 months gestation','After 6 months gestation','At 5 months gestation','At 8 weeks gestation','A','The placenta is fully formed and functioning by approximately 12 weeks (after 3 months) of gestation, taking over from the corpus luteum (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Placental Physiology','The placenta starts functioning from which gestation?','After 3 months gestation','After 6 months gestation','At 5 months gestation','At 8 weeks gestation','A','Placental function is fully established by ~12 weeks; before this the corpus luteum maintains the pregnancy. This timing is relevant for interpreting first-trimester drug exposure risks (Myles; embryology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q50: Cor pulmonale — COPD + JVD + peripheral oedema ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','A patient with COPD presents with jugular vein distension and peripheral oedema. The likely diagnosis is:','Liver failure','Kidney failure','Chronic pneumonia','Cor pulmonale','D','Cor pulmonale is right heart failure secondary to pulmonary disease (COPD); it presents with raised JVP, peripheral oedema and hepatomegaly (Brunner & Suddarth Medical-Surgical Nursing).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','A patient with COPD presents with jugular vein distension and peripheral oedema. The likely diagnosis is:','Liver failure','Kidney failure','Chronic pneumonia','Cor pulmonale','D','Cor pulmonale results from pulmonary hypertension in COPD. Differentiation from left heart failure guides diuretic and oxygen management. Nurses monitor BNP, JVP and fluid balance (Brunner & Suddarth; critical care).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q51: Mauriceau-Smellie-Veit — extended head in breech ────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Abnormal Labour','The Mauriceau-Smellie-Veit manoeuvre is used in delivery of:','Extended head','Anterior shoulder arrest','Extended arms','Fetal legs','A','The Mauriceau-Smellie-Veit manoeuvre delivers the aftercoming extended head in breech birth by applying jaw flexion and traction (Myles Textbook for Midwives; malpresentations).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Abnormal Labour','The Mauriceau-Smellie-Veit manoeuvre is used in delivery of:','Extended head','Anterior shoulder arrest','Extended arms','Fetal legs','A','Mauriceau-Smellie-Veit: extended aftercoming head in breech. Lovsett''s manoeuvre handles extended arms; McRoberts/Rubin for shoulder dystocia. Nurses must correctly identify each manoeuvre (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q52: Fetus develops from inner cell mass ──────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Embryology','The fetus develops from:','Amnion','Inner cell mass','Chorion','Trophoblast','B','The fetus (embryoblast) develops from the inner cell mass of the blastocyst; the trophoblast forms the placenta and chorion (Myles Textbook for Midwives; embryology).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Embryology','The fetus develops from:','Amnion','Inner cell mass','Chorion','Trophoblast','B','Inner cell mass → embryo/fetus; trophoblast → placenta/chorion. Understanding embryonic origins is relevant to interpreting congenital anomalies and placental disorders (Myles; embryology texts).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q53: Fourth stage of labour — 2 hours ────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','After delivery of the placenta and membranes, the fourth stage of labour lasts:','4 hours','45 minutes','2 hours','30 minutes','C','The fourth stage of labour is the first two hours following delivery of the placenta and membranes — the critical period for monitoring haemostasis and detecting PPH (Myles Textbook for Midwives).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','After delivery of the placenta and membranes, the fourth stage of labour lasts:','4 hours','45 minutes','2 hours','30 minutes','C','Fourth stage = 2 hours post-delivery: highest risk period for PPH. Nurses must monitor vital signs, uterine tone, lochia and perineum every 15 minutes during this period (Myles; MOH Kenya).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q54: Ergometrine contraindicated in cardiac disease ───────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Pharmacology in Midwifery','Which drug is contraindicated in a woman with cardiac disease in the third stage of labour?','Ergometrine','Oxytocin','Furosemide','Digoxin','A','Ergometrine is contraindicated in cardiac disease because it causes a sudden rise in venous return and blood pressure that can precipitate cardiac failure (Myles Textbook for Midwives; BNF).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Pharmacology in Midwifery','Which drug is contraindicated in a woman with cardiac disease in the third stage of labour?','Ergometrine','Oxytocin','Furosemide','Digoxin','A','Ergometrine causes potent vasoconstriction and increased venous return — dangerous in cardiac disease. Oxytocin infusion in normal saline is the safe alternative (Myles; BNF; MOH Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q55: Myomectomy breaching endometrium — contraindication to IOL ──────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour Management','Which of the following is a contraindication to induction of labour?','Longitudinal fetal lie','Myomectomy breaching the endometrium','Postdatism','Controlled maternal hypertension','B','A previous myomectomy that breached the endometrium (uterine cavity) is a contraindication to induction because of high risk of uterine rupture (Myles Textbook for Midwives; MOH Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour Management','Which of the following is a contraindication to induction of labour?','Longitudinal fetal lie','Myomectomy breaching the endometrium','Postdatism','Controlled maternal hypertension','B','Myomectomy entering the uterine cavity weakens the wall analogous to a classical CS scar; induction risks uterine rupture. Nurses must screen for surgical history before induction (Myles; MOH Kenya obstetric protocols).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q56: Biparietal diameter — 9.5 cm ────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Fetal Skull','Measurement of the biparietal diameter involves:','Measuring between parietal eminences; measures 9.5 cm','Measuring between parietal eminences; measures 10.5 cm','Measuring between parietal eminences; engages only in a well-flexed head','Measuring between parietal eminences; is the largest diameter','A','The biparietal diameter is the transverse distance between the two parietal eminences, measuring 9.5 cm (Myles Textbook for Midwives; fetal skull measurements).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Fetal Skull','Measurement of the biparietal diameter involves:','Measuring between parietal eminences; measures 9.5 cm','Measuring between parietal eminences; measures 10.5 cm','Measuring between parietal eminences; engages only in a well-flexed head','Measuring between parietal eminences; is the largest diameter','A','BPD = 9.5 cm (transverse); sub-occipito-bregmatic = 9.5 cm (AP in well-flexed vertex). Ultrasound BPD is used to estimate gestational age and detect macrocephaly (Myles; obstetric ultrasound).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q57: BScN 2022 Paper II extras ───────────────────────────────────────────
-- Q57: Appendix in research — data collection instruments, permit, approval letters
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','Appendices in a research report include:','Data collection instruments, copy of research permit, letters of approval','Copy of research permit, references, map of study area','Letters of approval, abstract, data collection tool','References, budget, copy of research permit','A','Appendices contain supplementary materials: data collection instruments, copy of research permit and letters of approval; references and abstract belong in the main body (nursing research methodology; Polit & Beck).','hard',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','Appendices in a research report include:','Data collection instruments, copy of research permit, letters of approval','Copy of research permit, references, map of study area','Letters of approval, abstract, data collection tool','References, budget, copy of research permit','A','Appendices = supplementary materials (instruments, permits, approval letters). Abstract = front matter; references = separate section. Correct report structure demonstrates research literacy (Polit & Beck; NCK nursing research curriculum).','hard',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q58: Zoonotic disease — plague ───────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','Which of the following is a zoonotic disease?','Toxoplasmosis','Tetanus','Gonorrhoea','Plague','D','Plague (Yersinia pestis) is transmitted from rodent reservoirs via flea bites — a classic zoonosis; notifiable under MOH Kenya communicable disease guidelines. Toxoplasmosis is also zoonotic but not listed as primary answer here.','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','Which of the following is a zoonotic disease?','Toxoplasmosis','Tetanus','Gonorrhoea','Plague','D','Plague is a classic rodent-borne zoonosis; tetanus is not zoonotic; gonorrhoea is human-to-human. Nurses must identify zoonotic diseases for proper outbreak investigation and One Health approaches (MOH Kenya guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q59: BScN 2022 — Laissez-faire leadership ─────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Leadership Styles','A supervising nurse tells the nurses "just organise the patient how you want." This nurse is using which type of leadership?','Benevolent leadership','Laissez-faire leadership','Democratic leadership','Autocratic leadership','B','Giving nurses complete freedom with no direction or guidance is hands-off laissez-faire leadership; it can lead to lack of coordination in patient care (nursing management/leadership texts).','hard',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Leadership Styles','A supervising nurse tells the nurses "just organise the patient how you want." This nurse is using which type of leadership?','Benevolent leadership','Laissez-faire leadership','Democratic leadership','Autocratic leadership','B','Laissez-faire style provides no direction; it is appropriate for highly autonomous expert teams but inappropriate in clinical settings requiring patient safety oversight. BScN nurses must evaluate its impact on quality (nursing management texts).','hard',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q60: OPV — multiple doses due to lower potency ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Immunisation Programme','OPV is administered as 3–4 doses because it is a live attenuated vaccine and:','The first dose is just a primer and needs 3 more doses','Has lower potency, requiring 3–4 doses to develop adequate immunity','Has high potency','Needs to cover multiple strains of polio','B','Kenya EPI: OPV is given in multiple doses because the live-attenuated vaccine has comparatively lower potency per dose, requiring repeated doses to mount adequate immune response (KEPI guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Immunisation Programme','OPV is administered as 3–4 doses because it is a live attenuated vaccine and:','The first dose is just a primer and needs 3 more doses','Has lower potency, requiring 3–4 doses to develop adequate immunity','Has high potency','Needs to cover multiple strains of polio','B','OPV lower potency requires multiple doses for seroconversion; inactivated polio vaccine (IPV) requires fewer doses. Nurses advising parents must explain the schedule rationale (Kenya EPI; WHO EPI guidelines).','easy',2022,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;
