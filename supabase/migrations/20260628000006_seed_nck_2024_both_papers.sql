-- Migration: 20260628000006
-- Source: NCK-NEW-MCQ-Compilation.docx — Year 2024 (NCK 2024 CBT)
-- Both KRCHN and BScN, Paper I and Paper II
-- Audit: verified against MOH Kenya, Myles, Brunner & Suddarth, BNF, DSM-5,
--        Kenya EPI, IMNCI, FP/STI/TB/NLTP guidelines, NCK curriculum
-- Paper assignment per nck-exam-system.md Section 12.
-- ON CONFLICT (stem, cadre) DO NOTHING on every INSERT.

-- ── Q1 (2024): Apgar score — assessed at 1 and 5 minutes ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Neonatal Assessment','The Apgar score is assessed at:','1 minute and 10 minutes','5 minutes and 15 minutes','1 minute and 5 minutes','2 minutes and 5 minutes','C','The Apgar score is recorded at 1 minute and 5 minutes after birth; a third score at 10 minutes may be done if the 5-minute score is <7 (Myles Textbook for Midwives; Kenya Basic Paediatric Protocols).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Neonatal Assessment','The Apgar score is assessed at:','1 minute and 10 minutes','5 minutes and 15 minutes','1 minute and 5 minutes','2 minutes and 5 minutes','C','Apgar at 1 min reflects intrapartum condition; at 5 min reflects resuscitative response. Score 0–3 = severe depression; 4–6 = moderate; 7–10 = normal. Nurses initiate NRP based on score (Myles; MOH Kenya BEmONC).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q2 (2024): Mastitis — hardness, pain, redness of breast ─────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postnatal Care','Hardness, pain, and redness of the breast during lactation is a sign of:','Breast engorgement','Mastitis','Galactocele','Breast abscess','B','Mastitis presents with breast hardness, localised pain, redness, warmth, and systemic features (fever, flu-like symptoms) during lactation; distinct from engorgement which is bilateral and without systemic illness (Myles; MOH Kenya postnatal guidelines).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postnatal Care','Hardness, pain, and redness of the breast during lactation is a sign of:','Breast engorgement','Mastitis','Galactocele','Breast abscess','B','Mastitis: usually Staphylococcus aureus; managed with antibiotics (flucloxacillin), continued breastfeeding, and analgesia. If untreated, progresses to abscess. Nurses provide lactation support and education (Myles; MOH Kenya postnatal care guidelines).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q3 (2024): Tetanus toxoid in pregnancy — 2nd dose after 4 weeks ───────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Immunisation in Pregnancy','The second dose of tetanus toxoid during pregnancy is given after:','2 weeks','4 weeks','6 weeks','8 weeks','B','Kenya EPI/MOH ANC schedule: TT2 is given at least 4 weeks after TT1 during the same pregnancy, providing 3 years protection (MOH Kenya ANC guidelines; Kenya EPI schedule).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Immunisation in Pregnancy','The second dose of tetanus toxoid during pregnancy is given after:','2 weeks','4 weeks','6 weeks','8 weeks','B','TT schedule: TT1 at first ANC contact; TT2 ≥4 weeks later (3 years protection). Complete 5-dose lifetime schedule provides lifelong immunity. Nurses counsel on schedules and document accurately (MOH Kenya ANC guidelines; Kenya EPI).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q4 (2024): Therapeutic diet in peptic ulcer disease ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Gastrointestinal Disorders','The therapeutic diet recommended for a patient with peptic ulcer disease is:','High-fibre and low-fat diet','Small, frequent, bland, non-irritating meals','Large meals three times daily','High-protein and high-fat diet','B','Small, frequent bland meals reduce gastric acid stimulation and minimise discomfort in peptic ulcer disease; spicy, acidic, and irritating foods are avoided (Brunner & Suddarth; dietary management in GI disorders).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Gastrointestinal Disorders','The therapeutic diet recommended for a patient with peptic ulcer disease is:','High-fibre and low-fat diet','Small, frequent, bland, non-irritating meals','Large meals three times daily','High-protein and high-fat diet','B','Small frequent bland meals maintain acid buffering without overstimulating secretion. Avoid coffee, alcohol, NSAIDs. H. pylori eradication is the cornerstone of treatment. Nurses integrate nutrition counselling with pharmacological management (Brunner & Suddarth; PUD guidelines).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q5 (2024): Stage 3 HIV — WHO clinical staging ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','HIV/AIDS Management','Unexplained severe weight loss (>10% body weight) with chronic diarrhoea is classified as which WHO HIV clinical stage?','Stage 1','Stage 2','Stage 3','Stage 4','C','Unexplained severe weight loss >10% with chronic diarrhoea (>1 month) or prolonged fever classifies as WHO HIV Clinical Stage 3 (NASCOP/MOH Kenya ART guidelines; WHO HIV staging).','medium',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','HIV/AIDS Management','Unexplained severe weight loss (>10% body weight) with chronic diarrhoea is classified as which WHO HIV clinical stage?','Stage 1','Stage 2','Stage 3','Stage 4','C','WHO Stage 3 features include severe weight loss, chronic diarrhoea, pulmonary TB, and severe bacterial infections. Stage 4 (AIDS-defining): PCP, toxoplasmosis, cryptococcal meningitis. Nurses use staging to guide ART initiation and OI prophylaxis (NASCOP/MOH Kenya ART guidelines).','medium',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q6 (2024): Primary health care level — dispensary/health centre ───────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Systems in Kenya','The level of health care that emphasises promotive and preventive services closest to the community is:','Tertiary level','Secondary level','Primary level','National referral level','C','Primary health care (dispensaries, health centres — KEPH Levels 2 and 3) provides the first contact, promotive, preventive, and basic curative services closest to the community (Kenya KEPH framework; MOH Kenya).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Systems in Kenya','The level of health care that emphasises promotive and preventive services closest to the community is:','Tertiary level','Secondary level','Primary level','National referral level','C','KEPH Level 2 (dispensary) and Level 3 (health centre) are the primary care tier. Nurses coordinate community health volunteers, conduct outreach, and implement UHC at this level (Kenya KEPH framework; MOH Kenya UHC strategy).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q7 (2024): Lochia rubra — bright red, 1–4 days postpartum ────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postnatal Care','The lochia present during the first 1–4 days after delivery is:','Lochia serosa','Lochia alba','Lochia rubra','Lochia purulenta','C','Lochia rubra is the bright red, blood-stained discharge present during the first 1–4 days postpartum; lochia serosa follows (days 4–10, pinkish-brown); lochia alba follows (days 10–14+, yellowish-white) (Myles Textbook for Midwives).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postnatal Care','The lochia present during the first 1–4 days after delivery is:','Lochia serosa','Lochia alba','Lochia rubra','Lochia purulenta','C','Lochia rubra (days 1–4): blood, decidua, trophoblastic cells. Serosa (days 4–10): serous, pinkish-brown. Alba (days 10–14+): leukocytes, mucus. Offensive odour or increased lochia suggests infection or RPOC — nurses assess and document at each postnatal visit (Myles; MOH Kenya postnatal care).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q8 (2024): Cholera — profuse rice-water stools ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','The characteristic stool of cholera is:','Bloody and mucoid','Pale and fatty','Profuse watery rice-water stool','Dark and tarry','C','Cholera (Vibrio cholerae) causes profuse, painless watery "rice-water" stools due to the enterotoxin stimulating massive chloride and water secretion (MOH Kenya cholera management guidelines; community health).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','The characteristic stool of cholera is:','Bloody and mucoid','Pale and fatty','Profuse watery rice-water stool','Dark and tarry','C','Cholera: oral-faecal route; rice-water stools lead to severe dehydration and electrolyte loss. Management: ORS/IV rehydration, azithromycin or doxycycline. Nurses notify public health, isolate, and implement WASH measures (MOH Kenya cholera guidelines; WHO).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q9 (2024): Oliguria — urine output < 400 ml/24 hrs ───────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Renal Disorders','Oliguria is defined as urine output of less than:','100 ml/24 hours','400 ml/24 hours','600 ml/24 hours','800 ml/24 hours','B','Oliguria is defined as urine output < 400 ml/24 hours (or < 0.5 ml/kg/hr) in adults, indicating impaired renal perfusion or function (Brunner & Suddarth; renal nursing).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Renal Disorders','Oliguria is defined as urine output of less than:','100 ml/24 hours','400 ml/24 hours','600 ml/24 hours','800 ml/24 hours','B','Oliguria (<400 ml/24 hr) signals pre-renal, renal, or post-renal acute kidney injury. Nurses perform fluid challenge assessment, monitor creatinine/urea, and escalate to nephrology. Strict fluid balance charting is essential (Brunner & Suddarth; renal EBP).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q10 (2024): Insulin storage — refrigerator 2–8°C ─────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Endocrine Pharmacology','Insulin should be stored at a temperature of:','Room temperature indefinitely','Frozen at −20°C','2–8°C in a refrigerator','Above 25°C','C','Unopened insulin vials and pens must be stored in a refrigerator at 2–8°C; in-use insulin can be kept at room temperature for up to 28–30 days. Freezing destroys insulin (BNF; MOH Kenya diabetes guidelines; cold-chain guidelines).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Endocrine Pharmacology','Insulin should be stored at a temperature of:','Room temperature indefinitely','Frozen at −20°C','2–8°C in a refrigerator','Above 25°C','C','Unopened insulin: 2–8°C (up to expiry); in-use: room temperature <25°C for ≤28–30 days. Do not freeze; inspect for cloudiness/particles before use. Nurses educate patients on storage, rotation of injection sites, and hypoglycaemia recognition (BNF; MOH Kenya diabetes management guidelines).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q11 (2024): Beta-thalassaemia — genetic inheritance ──────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Haematological Disorders','Beta-thalassaemia is inherited in which pattern?','X-linked dominant','Autosomal dominant','Autosomal recessive','X-linked recessive','C','Beta-thalassaemia is inherited in an autosomal recessive pattern; individuals with two mutant alleles develop thalassaemia major (Brunner & Suddarth; haematology nursing).','medium',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Haematological Disorders','Beta-thalassaemia is inherited in which pattern?','X-linked dominant','Autosomal dominant','Autosomal recessive','X-linked recessive','C','Autosomal recessive: two carrier parents → 25% major, 50% trait, 25% normal. Thalassaemia major requires lifelong transfusions and iron chelation. Nurses provide genetic counselling, monitor for transfusion complications (Brunner & Suddarth; haematology EBP).','medium',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q12 (2024): Erythropoietin — produced by kidneys ─────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Renal Disorders','Erythropoietin is produced by the:','Liver','Bone marrow','Kidneys','Spleen','C','Erythropoietin (EPO) is produced primarily by peritubular cells of the kidneys in response to hypoxia; it stimulates red blood cell production in the bone marrow. Deficiency in chronic kidney disease causes anaemia (Brunner & Suddarth).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Renal Disorders','Erythropoietin is produced by the:','Liver','Bone marrow','Kidneys','Spleen','C','CKD → reduced EPO → normocytic normochromic anaemia. Treatment: erythropoiesis-stimulating agents (ESAs), iron supplementation. Nurses monitor Hb targets (10–12 g/dl in CKD) to avoid over-treatment risks (Brunner & Suddarth; renal EBP).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q13 (2024): Glasgow Coma Scale — maximum score 15 ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Assessment','The maximum total score on the Glasgow Coma Scale is:','12','14','15','18','C','The Glasgow Coma Scale has a maximum score of 15 (Eye opening 4 + Verbal 5 + Motor 6); a score of 3 is the minimum, indicating deep coma (Brunner & Suddarth; neurological nursing).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Assessment','The maximum total score on the Glasgow Coma Scale is:','12','14','15','18','C','GCS max = 15; score ≤8 indicates severe impairment and need for airway protection. Nurses document GCS accurately, track trends, and escalate deterioration. Pupil assessment accompanies GCS for complete neurological monitoring (Brunner & Suddarth; neurocritical care EBP).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q14 (2024): Placenta praevia — painless antepartum haemorrhage ────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antepartum Haemorrhage','The classic sign of placenta praevia is:','Painful antepartum haemorrhage with a hard uterus','Painless bright-red antepartum haemorrhage','Haemorrhage with uterine contractions','Dark red vaginal bleeding with fetal demise','B','Placenta praevia presents with painless, bright-red antepartum haemorrhage because the low-lying placenta separates as the lower uterine segment forms (Myles Textbook for Midwives; MOH Kenya EmONC).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antepartum Haemorrhage','The classic sign of placenta praevia is:','Painful antepartum haemorrhage with a hard uterus','Painless bright-red antepartum haemorrhage','Haemorrhage with uterine contractions','Dark red vaginal bleeding with fetal demise','B','Placenta praevia: painless, bright-red bleeding (vs abruptio: painful, dark, rigid uterus). Confirmed by ultrasound. Management: hospitalise, corticosteroids if preterm, planned LSCS. Nurses do NOT perform vaginal examination (Myles; MOH Kenya EmONC).','easy',2024,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;
