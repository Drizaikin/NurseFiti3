-- =============================================================================
-- MISSED CLINICAL ERRORS — Genuine fixes not in any prior corrective migration
-- Date: 2026-07-14
-- Source: Deep line-by-line audit of 000001 and 000003 against NCK/MOH standards.
-- These errors survived 000002, 000004, 000005, and 000001 (comprehensive).
-- ALL fixes are UPDATE-only. No new rows inserted.
-- =============================================================================

-- =============================================================================
-- ERROR 1: FONTANELLE CLOSURE — WRONG CORRECT_OPTION
-- =============================================================================
-- Stem: "The anterior posterior fontanelles normally closes at the age of:"
-- Options:
--   A: 6 weeks and 18 weeks respectively
--   B: 18 weeks and 6 weeks respectively   ← currently marked CORRECT
--   C: 18 months and 6 weeks respectively
--   D: 6 months and 18 months respectively
--
-- The rationale itself admits: "note the correct anterior closure is ~18 months"
-- Standard paediatric fact:
--   Posterior fontanelle closes: ~6-8 WEEKS
--   Anterior fontanelle closes:  ~18 MONTHS
-- The ONLY option that has both correct values is C: "18 months and 6 weeks"
--   (reading as anterior=18 months, posterior=6 weeks).
-- Option B ("18 weeks and 6 weeks") is wrong — anterior is 18 MONTHS not weeks.
-- No prior migration fixed this despite the rationale flagging it.
-- FIX: correct_option = 'C'
-- =============================================================================
UPDATE questions
SET correct_option = 'C',
    rationale = 'The posterior fontanelle normally closes at approximately 6-8 weeks of age. The anterior fontanelle normally closes at approximately 18 months of age. Option C (18 months and 6 weeks respectively) gives the correct closure ages for the anterior and posterior fontanelles respectively. (Kenya Basic Paediatric Protocols; standard paediatric texts used in Kenyan nursing training; Myles Textbook for Midwives.)'
WHERE stem LIKE 'The anterior posterior fontanelles normally closes at the age of%'
  AND cadre IN ('BScN', 'KRCHN');

-- Same fix for a variant stem with slightly different wording
UPDATE questions
SET correct_option = 'C',
    rationale = 'The posterior fontanelle closes at approximately 6-8 weeks and the anterior fontanelle closes at approximately 18 months. Option C (18 months and 6 weeks) correctly states these respective closure ages. (Kenya Basic Paediatric Protocols; standard paediatric texts.)'
WHERE stem LIKE 'The anterior posterior fontanelle normally close%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 2: DUPLICATE OPTIONS in glomerulonephritis question
-- =============================================================================
-- Stem: "Glomerulonephritis usually follows:-"
-- Options B and C are IDENTICAL: both say "Gonococcal infection."
-- This is a data integrity error. The original source had different options.
-- Per standard microbiology, the four options should be:
--   A: Staphylococcal infection
--   B: Gonococcal infection
--   C: Viral infection  (likely the intended original option C)
--   D: Streptococcal infection  ← CORRECT
-- Fix option_c to the correct distinct option.
-- =============================================================================
UPDATE questions
SET option_c = 'Viral infection'
WHERE stem LIKE 'Glomerulonephritis usually follows%'
  AND option_b = 'Gonococcal infection.'
  AND option_c = 'Gonococcal infection.'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 3: DUCTUS ARTERIOSUS — CONTRADICTORY ANSWERS between two seeded versions
-- =============================================================================
-- Two versions of this question exist in the same seed file (000003):
--
-- Version 1 stem: "After birth, the functional closure of ductus arteriosus takes place within:"
--   Options: 0-1h, 2-4h, 4-6h, 8-10h → correct_option = 'B' (2-4 hours)
--
-- Version 2 stem: "After birth, the functional closure of ductus arteriosus takes place within:-"
--   Options: 1-2h, 2-4h, 4-6h, 8-15h → correct_option = 'D' (8-15 hours)
--
-- These give contradictory answers and will confuse students.
-- Per physiology (Myles/neonatal texts): functional closure occurs within 10-15 hours
-- in response to increased oxygen tension. The 2-4h window is too early.
-- 8-15 hours is the physiologically accurate answer.
-- FIX: Correct Version 1 to match Version 2 (8-10 hours = option D, closest correct).
-- =============================================================================
UPDATE questions
SET correct_option = 'D',
    rationale = 'Functional (physiological) closure of the ductus arteriosus occurs in response to rising oxygen tension after birth, typically within 10-15 hours. The 2-4 hour window is too early for confirmed functional closure. Among the options, 8-10 hours (D) best represents the physiological timing. Anatomical closure by fibrosis takes several weeks. (Myles Textbook for Midwives; standard neonatal physiology texts used in Kenyan nursing training.)'
WHERE stem = 'After birth, the functional closure of ductus arteriosus takes place within:'
  AND correct_option = 'B'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 4: PMTCT PROPHYLAXIS — OUTDATED AND CONTRADICTORY WITH KENYA POLICY
-- =============================================================================
-- Stem: "At primary level of ant-retroviral prophylaxis for PMTCT...
--        a HIV-positive woman should take:"
-- Current answer: B — "Nevirapine 200 mgs at onset of labour"
--
-- PROBLEM: Kenya adopted Option B+ (Test and Treat) in 2013 and has since moved
-- to universal lifelong ART for ALL HIV-positive pregnant women regardless of CD4.
-- Single-dose nevirapine (sdNVP) prophylaxis is NO LONGER the recommended approach
-- in Kenya. This question's correct answer is now outdated and contradicts the
-- question immediately preceding it in the same seed file:
-- "Antenatal care of HIV positive client includes:" → Answer A = "Antiretroviral
-- therapy for life immediately HIV positive status is confirmed."
--
-- The two questions contradict each other:
--   Q1 says: ALL HIV+ pregnant women get LIFELONG ART immediately (correct per Kenya)
--   Q2 says: At primary level, give sdNVP 200mg at onset of labour (outdated)
--
-- Per Kenya National ARV Guidelines (current), the answer to Q2 should be that
-- lifelong ART (Option B+) is the standard — NOT sdNVP.
-- Since no option in Q2 mentions lifelong ART, the question cannot have a defensible
-- correct answer among the given choices under current Kenya guidelines.
-- Per §14.1 of nck-exam-system.md: if no defensible answer exists, the question
-- should be flagged or removed.
-- ACTION: Flag this question and update the rationale to reflect the outdated context.
-- The question should ideally be deleted but since we cannot confirm the KRCHN
-- exam still uses this question, we update the rationale to flag it clearly.
-- =============================================================================
UPDATE questions
SET rationale = '⚠ OUTDATED QUESTION: Kenya adopted Option B+ (universal lifelong ART for all HIV-positive pregnant women) in 2013. Single-dose nevirapine (sdNVP) prophylaxis at onset of labour is no longer the recommended approach. Under current Kenya National ARV Guidelines, ALL HIV-positive pregnant women receive lifelong ART regardless of CD4 count — not sdNVP prophylaxis. Among the listed options, B (Nevirapine 200mg) was historically correct under older PMTCT protocols but is no longer applicable. This question should be reviewed for removal or replacement. (Kenya National ARV Guidelines; NASCOP PMTCT guidelines.)'
WHERE stem LIKE 'At primary level of ant-retroviral prophylaxis for PMTCT%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 5: FETAL AXIS PRESSURE — INCOMPLETE STEM
-- =============================================================================
-- Stem ends: "Fetal axis pressure is a physical change that is more significant durin"
-- The word "during" is truncated. This is a garbled stem.
-- Rationale flags: "⚠ Question may be INCOMPLETE"
-- No prior migration fixed the stem (cannot change stem without breaking unique
-- constraint) or flagged it clearly.
-- Update the rationale to acknowledge the truncation and confirm best answer:
-- =============================================================================
UPDATE questions
SET rationale = 'Fetal axis pressure refers to the force transmitted through the fetal long axis from the fundal pole down to the presenting part with each uterine contraction, aiding descent. It becomes most significant during the active and second stages of labour, especially after membrane rupture when there is direct transmission of force. Note: the stem is truncated in this version of the question (ends "durin" rather than "during"). Per Myles Textbook for Midwives, option A (transmission from the upper pole) best describes the mechanism, though this question has multiple defensible answers. (Myles Textbook for Midwives; labour physiology.)'
WHERE stem LIKE 'Fetal axis pressure is a physical change that is more significant durin%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 6: CSF LEAK MONITORING — WRONG TOPIC (not caught by prior migrations)
-- =============================================================================
-- "When a nurse is monitoring a patient for CSF leak...observe for: Halo sign"
-- Topic is "Fluid and Electrolyte Balance" — completely wrong for a neurological
-- assessment question. No prior migration fixed this specific question's topic.
-- =============================================================================
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'When a nurse is monitoring a patient for cerebrospinal fluid (CSF) leak%'
  AND topic = 'Fluid and Electrolyte Balance'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 7: THYROIDECTOMY RATIONALE — contaminated with polycythaemia Q (still present)
-- =============================================================================
-- "Following thyroidectomy, the nurse suspects damage or removal of parathyroid gland"
-- The rationale still contains the embedded polycythaemia question text beginning
-- "328. increased concentration of red blood cells..."
-- Migration 000002 addressed a DIFFERENT thyroidectomy question (in 000001).
-- This specific question is from 000003 and its contaminated rationale was NOT
-- cleaned by any migration (000004 addressed it only for BScN/KRCHN with a
-- different WHERE clause pattern).
-- Verify and fix:
-- =============================================================================
UPDATE questions
SET rationale = 'Per Brunner & Suddarth''s Medical-Surgical Nursing, accidental damage to or removal of the parathyroid glands during thyroidectomy causes hypocalcaemia. This manifests as tetany: perioral tingling and numbness, carpopedal spasm, and laryngeal stridor. Laryngeal stridor is the most serious sign requiring emergency calcium gluconate IV. Tingling of hands and feet is often the earliest warning sign. (Brunner & Suddarth''s Medical-Surgical Nursing; thyroid/parathyroid surgery.)'
WHERE stem LIKE 'Following thyroidectomy, the nurse suspects damage or removal of parathyroid gland%'
  AND rationale LIKE '%328.%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 8: Leopold'S MANOEUVRE — CORRECT ANSWER NEEDS VERIFICATION
-- =============================================================================
-- Stem: "When performing Leopold's maneuver, the purpose of the first maneuver is to determine"
-- Options:
--   A: Fetal part lying in the fundus and presentation  ← marked correct
--   B: Location of fetal back and position
--   C: Engagement of the presenting part
--   D: The degree of flexion of fetal head
--
-- Per Myles: 1st manoeuvre = FUNDAL GRIP = determines fetal pole in fundus (lie/presentation)
--            2nd manoeuvre = LATERAL GRIP = determines fetal back location
--            3rd manoeuvre = PAWLICK'S = engagement of presenting part
--            4th manoeuvre = PELVIC GRIP = degree of head descent/flexion
-- Answer A is CORRECT. Confirmed. No change needed — but the topic needs updating
-- since this question is still in Medical-Surgical Nursing with topic Medical-Surgical Nursing:
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'When performing Leopold%s maneuver, the purpose of the first maneuver is to determine%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 9: PLACENTA PRAEVIA TYPE III — ANSWER CLARIFICATION
-- =============================================================================
-- Stem: "The management of placenta praevia type three when the fetus has died in utero"
-- Answer A (Caesarean section) is correct. However option B (induction with syntocinon)
-- is also present. For a DEAD fetus with major praevia, C-section remains the standard.
-- But there is nuance: some centres may cautiously use vaginal delivery with
-- type II (lateral/partial) praevia with dead fetus. Type III specifically covers
-- central/major partial — C-section is mandatory.
-- The answer is correct. Rationale flagged with ⚠ but this is clinically sound.
-- Improve rationale to remove the ⚠ ambiguity marker:
-- =============================================================================
UPDATE questions
SET rationale = 'Placenta praevia type III (major partial praevia — covering most of the internal os) requires caesarean section for delivery regardless of fetal viability. Attempting vaginal delivery or oxytocin induction with type III praevia risks catastrophic, life-threatening haemorrhage. Even with intrauterine fetal death, the maternal safety risk from attempted vaginal delivery outweighs any alternative. Option A (caesarean section) is the correct management. (Myles Textbook for Midwives; Kenya MOH EmONC maternal guidelines.)'
WHERE stem LIKE 'The management of placenta praevia type three when the fetus has died in utero%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 10: FETAL KICK CHART — THRESHOLD NEEDS CLARIFICATION
-- =============================================================================
-- Stem: "In monitoring fetal well being using the fetal kick chart, you will tell
--        the client to notify you if she counts:"
-- Answer D: "Less than 10 movements per hour"
-- Per Kenya MOH Maternal Guidelines and Myles: Cardiff count-to-ten method =
-- notify if fewer than 10 movements in 12 hours (or by the same time as yesterday).
-- "Less than 10 per hour" would trigger false alarms constantly as most hours may
-- have fewer than 10 movements. The correct threshold is 10 movements in 12 hours.
-- The best available answer is D but it misrepresents the actual threshold.
-- Rationale must clarify:
-- =============================================================================
UPDATE questions
SET rationale = 'Per the Cardiff count-to-ten method (Kenya MOH/WHO fetal movement monitoring), the mother counts fetal movements from 09:00 daily and notes the time when she feels the 10th movement. She should notify the health provider if she counts fewer than 10 movements within 12 hours (or if movements are significantly reduced compared to her normal pattern). Among the options, D (less than 10 movements per hour) approximates the action threshold, though the precise standard is 10 in 12 hours. (Kenya MOH Maternal and Newborn Health guidelines; Myles Textbook for Midwives.)'
WHERE stem LIKE 'In monitoring fetal well being using the fetal kick chart%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 11: NEVIRAPINE DOSING — KRCHN version also needs the outdated flag
-- =============================================================================
-- Same PMTCT question may exist for KRCHN cadre — already covered in ERROR 4 above
-- since WHERE clause uses cadre IN ('BScN','KRCHN'). Confirmed covered.

-- =============================================================================
-- ERROR 12: "The anterior 2/3 of tongue innervated by" — BScN supplement version
-- =============================================================================
-- The supplement (000003) seeds a version of this question for BScN with
-- correct_option = 'D' (facial/CN VII). Migration 000005 already fixes this to C.
-- Confirmed already fixed. No action needed here.

-- =============================================================================
-- ERROR 13: THYROID STORM — ACETAMINOPHEN CLARIFICATION
-- =============================================================================
-- Stem: "Pharmacotherapy for thyroid storm would not include the administration of:
--        Synthetic levothyroxine" — Answer D is correct.
-- However the rationale says "acetaminophen (for fever)" is used in thyroid storm.
-- IMPORTANT CLINICAL NOTE: Acetaminophen (paracetamol) is preferred over aspirin/NSAIDs
-- in thyroid storm. Salicylates DISPLACE T4 from binding proteins, worsening the storm.
-- This is a critical distinction. The rationale mentions acetaminophen but does NOT
-- warn against aspirin/NSAIDs. No prior migration clarified this.
-- =============================================================================
UPDATE questions
SET rationale = 'Thyroid storm is treated with: (1) PTU or methimazole to block thyroid hormone synthesis, (2) iodine (Lugol''s solution) given >1 hour after PTU to block thyroid hormone release, (3) propranolol to control adrenergic symptoms, (4) corticosteroids, and (5) acetaminophen (paracetamol) for fever — NOT aspirin or NSAIDs, as salicylates displace T4 from binding proteins, worsening the storm. Synthetic levothyroxine adds more thyroid hormone and would worsen the crisis — it is absolutely contraindicated in thyroid storm. (Brunner & Suddarth''s Medical-Surgical Nursing; Kenya EML.)'
WHERE stem LIKE 'Pharmacotherapy for thyroid storm would not include the administration of%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 14: HYPERPARATHYROIDISM BREAKFAST — CLINICAL ACCURACY
-- =============================================================================
-- Stem: "A recommended breakfast for a hyperparathyroid patient would be:"
-- Answer B: "Fried eggs and bacon"
-- Rationale says "eggs and bacon avoid the high calcium of milk/cereal"
-- PROBLEM: Bacon is HIGH in sodium, which is NOT ideal for a hypercalcaemic patient
-- (hyperparathyroidism causes hypertension, fluid retention).
-- More importantly, the question stems from a low-calcium diet concept.
-- Orange juice (option C) has NO calcium — so "Orange juice and toast" is actually
-- lower in calcium than eggs and bacon (eggs have ~27mg calcium per egg).
-- However, cranberry juice + pork sausage (D) and OJ + toast (C) are also low calcium.
-- Among ALL options, none is clearly superior. But B (eggs and bacon) is the
-- traditional Brunner & Suddarth NCK answer for this question. Keep B.
-- Improve rationale to be more precise:
-- =============================================================================
UPDATE questions
SET rationale = 'Hyperparathyroidism causes hypercalcaemia, so the patient should follow a low-calcium diet. Milk-based cereals and dairy products are high in calcium and must be avoided. Of the given options, fried eggs and bacon (B) contains significantly less calcium than cereal with milk and bananas (A). Orange juice and toast (C) and pork sausage with cranberry juice (D) are also low-calcium alternatives, but B is the traditional expected answer in the NCK source material. (Brunner & Suddarth''s Medical-Surgical Nursing; dietary management in hyperparathyroidism.)'
WHERE stem LIKE 'A recommended breakfast for a hyperparathyroid patient would be%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 15: CUSHING'S SYNDROME DIET — RATIONALE ACCURACY
-- =============================================================================
-- Stem: "Clinical manifestations of Cushing's syndrome may be modified with a diet that is:"
-- Answer D: All of the above (high protein, low carbs, low sodium)
-- This is clinically correct — no change to answer.
-- But the rationale says "low carbohydrates (counter hyperglycemia)" — accurate.
-- And "high protein (counter catabolism)" — accurate.
-- Confirmed correct. No change needed.

-- =============================================================================
-- ERROR 16: ALDOSTERONISM EXCEPT — ALKALOSIS vs INCREASED pH
-- =============================================================================
-- Stem: "A patient with aldosteronism would be expected to exhibit all except:"
-- Options: A=Alkalosis, B=Hypokalemia, C=Hyponatremia, D=An increased pH
-- Answer C (Hyponatremia) is correct — aldosteronism causes HYPERnatremia.
-- NOTE: Options A (alkalosis) and D (increased pH) both describe the SAME thing
-- (metabolic alkalosis = increased pH). Having both as distractors is redundant
-- and potentially confusing. Neither is "the exception" since both are PRESENT
-- in aldosteronism. But the answer C (hyponatremia) is still the correct exception.
-- The question has a structural flaw but the answer is defensible.
-- Update rationale to acknowledge:
-- =============================================================================
UPDATE questions
SET rationale = 'Primary aldosteronism (Conn''s syndrome) causes: (1) sodium retention → HYPERnatremia (NOT hyponatremia), (2) potassium excretion → hypokalemia, and (3) metabolic alkalosis → increased pH. Hyponatremia (C) is the exception — it does NOT occur in aldosteronism. Note: options A (alkalosis) and D (increased pH) describe the same physiological state and are therefore both present in aldosteronism. Hyponatremia remains the single exception. (Brunner & Suddarth''s Medical-Surgical Nursing.)'
WHERE stem LIKE 'A patient with aldosteronism would be expected to exhibit all of the following symptoms except%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 17: STOMA QUESTION — STILL HAS "SENSATION ON TOUCH" IN OPTION C
-- =============================================================================
-- Despite multiple rationale fixes, the OPTION TEXT itself still says
-- "Healthy stomas are pink, bleed on touch, has sensation on touch."
-- The option_c text contains the clinically incorrect phrase "has sensation on touch"
-- which students will read as part of the correct answer.
-- No prior migration fixed option_c TEXT — only the rationale was updated.
-- Fix the option_c text to remove the inaccurate claim:
-- =============================================================================
UPDATE questions
SET option_c = 'Healthy stomas are pink, bleed on touch, no pain sensation on touch.'
WHERE stem LIKE 'One of the following true about stomas%'
  AND option_c LIKE '%has sensation on touch%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- VERIFICATION QUERIES — run after applying this migration
-- =============================================================================
-- 1. Fontanelle correction:
--    SELECT stem, correct_option, cadre FROM questions
--    WHERE stem LIKE 'The anterior posterior fontanelle%close%';
--    Expected: correct_option = 'C' for both cadres
--
-- 2. Duplicate option fix:
--    SELECT option_b, option_c FROM questions
--    WHERE stem LIKE 'Glomerulonephritis usually follows%';
--    Expected: option_b ≠ option_c
--
-- 3. Ductus arteriosus:
--    SELECT stem, correct_option FROM questions
--    WHERE stem LIKE 'After birth, the functional closure of ductus arteriosus%';
--    Expected: correct_option = 'D' for both versions
--
-- 4. Stoma option_c:
--    SELECT option_c FROM questions WHERE stem LIKE 'One of the following true about stomas%';
--    Expected: no mention of 'has sensation on touch'
--
-- 5. PMTCT rationale flag:
--    SELECT rationale FROM questions WHERE stem LIKE 'At primary level of ant-retroviral%';
--    Expected: rationale contains '⚠ OUTDATED QUESTION'
-- =============================================================================

-- =============================================================================
-- ERROR 18: HISTOPLASMOSIS RATIONALE — contaminated with ethics question (114.)
-- =============================================================================
-- "The physician has ordered a histoplasmosis test... transmitted to humans by: Birds"
-- Rationale ends with embedded Q114 about "Above all, do no harm" / beneficence.
-- No prior migration cleaned this specific contamination.
-- =============================================================================
UPDATE questions
SET rationale = 'Histoplasmosis is a fungal infection (Histoplasma capsulatum) acquired by inhaling spores from soil contaminated with bird or bat droppings. Among the options, birds are the source. (Brunner & Suddarth''s Medical-Surgical Nursing; communicable disease references used in Kenya.)'
WHERE stem LIKE 'The physician has ordered a histoplasmosis test for the elderly client%'
  AND rationale LIKE '%114.%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 19: BARBITURATE WITHDRAWAL — WRONG CORRECT_OPTION
-- =============================================================================
-- Stem: "A client with a history of abusing barbiturates abruptly stops...
--        The nurse should give priority to assessing the client for:"
-- Answer A: "Depression and suicidal ideation"
--
-- CLINICALLY WRONG. Barbiturate withdrawal is a MEDICAL EMERGENCY.
-- The priority signs are:
--   - Seizures (the most life-threatening complication)
--   - Tachycardia, hypertension, hyperthermia, diaphoresis
--   - Anxiety, tremors, insomnia
-- Depression and suicidal ideation are NOT the priority in barbiturate withdrawal.
-- They may occur but seizures/cardiovascular instability kill patients.
-- Per §14.3 (Kenya psychiatric nursing standards, pharmacology texts):
-- The correct priority assessment is physiological — tachycardia (B).
-- Option B says "Tachycardia and diarrhea" — tachycardia is correct but diarrhea
-- is NOT a feature of barbiturate withdrawal (it IS a feature of opioid withdrawal).
-- Option C "Muscle cramping and abdominal pain" = opioid withdrawal, not barbiturate.
-- None of the options is perfect, but B (tachycardia) is closer than A (depression).
-- Per §7.6: best available answer = B (tachycardia is the key sign to assess first).
-- FIX: correct_option = 'B'
-- =============================================================================
UPDATE questions
SET correct_option = 'B',
    rationale = 'Barbiturate withdrawal is a potentially life-threatening medical emergency. The priority assessment is for physiological complications: tachycardia, hypertension, hyperthermia, diaphoresis, tremors, anxiety, and most critically, SEIZURES (which can be fatal). Tachycardia (option B) is a key early sign of autonomic hyperactivity during barbiturate withdrawal. Depression and suicidal ideation (A) may occur but are not the priority physiological threat. Note: diarrhoea in option B is not a typical barbiturate withdrawal feature (it is a feature of opioid withdrawal); however, tachycardia makes B the best available option among the choices. (Kenya psychiatric nursing standards; pharmacology texts; Brunner & Suddarth''s.)'
WHERE stem LIKE 'A client with a history of abusing barbiturates abruptly stops taking the medication%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 20: ERIKSON STAGE FOR 35-YEAR-OLD — WRONG CORRECT_OPTION
-- =============================================================================
-- Stem: "Mr. J. is 35 years old. In which level of psychosocial development
--        (Erikson) would you place Mr. J.?"
-- Answer B: "Generativity vs. self-absorption"
--
-- CLINICALLY WRONG. Per Erikson's theory:
--   Young adulthood (20-39 years): Intimacy vs. Isolation — Answer A
--   Middle adulthood (40-65 years): Generativity vs. Stagnation
-- A 35-year-old is in YOUNG ADULTHOOD → Intimacy vs. Isolation (A).
-- Generativity is middle adulthood, which begins around age 40-65.
-- No prior migration caught this error.
-- FIX: correct_option = 'A'
-- =============================================================================
UPDATE questions
SET correct_option = 'A',
    rationale = 'Per Erikson''s stages of psychosocial development, a 35-year-old is in young adulthood (approximately 20-39 years), where the developmental task is Intimacy vs. Isolation — forming close, committed relationships. Generativity vs. Stagnation is the task of middle adulthood (approximately 40-65 years). At 35, Mr. J. is solidly in the Intimacy vs. Isolation stage. (Erikson''s developmental theory; Kozier & Erb''s Fundamentals of Nursing.)'
WHERE stem LIKE 'Mr. J. is a new client on the psychiatric unit. He is 35 years old%Erikson%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 21: OCCUPATIONAL HEALTH NURSE / PUBLIC HEALTH SERVICES
--           RATIONALE — contaminated with Q132 ("free of charge")
-- =============================================================================
-- "When the occupational health nurse employs ergonomic principles, she is
--  performing which of her roles" → Answer D (Environment manager)
-- Rationale is contaminated with Q132 about public health services "free of charge"
-- No prior migration cleaned this contamination.
-- =============================================================================
UPDATE questions
SET rationale = 'Applying ergonomic principles — designing the work environment to fit the worker — is part of the occupational health nurse''s environmental health/hazard-management role. It is distinct from direct health care provision (health care provider), health education, or care coordination. (Occupational health nursing; public health nursing texts.)'
WHERE stem LIKE 'When the occupational health nurse employs ergonomic principles%'
  AND rationale LIKE '%132.%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 22: UNDER-5 MORTALITY — ANSWER NEEDS CLINICAL VERIFICATION
-- =============================================================================
-- Stem: "The MOST common cause of under-5 mortality in developing world"
-- Answer B: "Pneumonia"
-- Per WHO Global Health Observatory (2023), the top causes of under-5 death are:
--   1. Neonatal conditions (~47% globally)
--   2. Pneumonia (~14%)
--   3. Diarrhoea (~8%)
-- Per the options: D = "neonatal disease" and B = "pneumonia"
-- Neonatal disease/conditions are the LEADING cause overall.
-- However "pneumonia" is the most common SINGLE infectious cause of post-neonatal
-- under-5 deaths. In the NCK examination context this question is testing
-- knowledge of the leading infectious cause — pneumonia is the expected answer.
-- The rationale correctly notes this. Keep B but clarify rationale:
-- =============================================================================
UPDATE questions
SET rationale = 'Per WHO data, pneumonia is the leading single infectious cause of under-5 mortality in the developing world, accounting for approximately 14% of all under-5 deaths. Neonatal conditions account for the largest overall share but span multiple causes. Among the specific disease options listed, pneumonia (B) is the single most common identifiable cause of under-5 death from an infection standpoint, as used in NCK examination questions. (WHO Global Health Observatory; Kenya IMNCI child health data.)'
WHERE stem LIKE 'The MOST common cause of under-5 mortality in developing world%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 23: LEVEL IV HOSPITAL CLASSIFICATION — WRONG CORRECT_OPTION
-- =============================================================================
-- Stem: "Level IV Hospital is classified as what level of facility?"
-- Options: A=Primary, B=Secondary, C=Intermediate, D=Tertiary
-- Answer D: "Tertiary" ← WRONG
--
-- Per Kenya MOH Clinical Guidelines (current edition title explicitly states):
--   Level 4 = PRIMARY CARE Hospitals
--   Level 5 = SECONDARY Hospitals
--   Level 6 = TERTIARY Hospitals (National Referral)
--
-- Kenya health facility classification (KEPH):
--   Level 1: Community
--   Level 2: Dispensary (primary)
--   Level 3: Health Centre (primary)
--   Level 4: Sub-county/County Hospital = PRIMARY level care (first referral)
--   Level 5: County Referral Hospital = SECONDARY level
--   Level 6: National Teaching/Referral Hospital = TERTIARY
--
-- Level IV = Primary care hospital (first-level referral hospital).
-- The answer D (Tertiary) is WRONG. Correct answer = A (Primary).
-- FIX: correct_option = 'A' (Primary)
-- =============================================================================
UPDATE questions
SET correct_option = 'A',
    rationale = 'Per Kenya MOH health facility classification (Kenya Essential Package for Health - KEPH and Kenya Clinical Guidelines), Level 4 facilities (sub-county/county hospitals) are classified as PRIMARY care hospitals and serve as the first referral level. Level 5 = Secondary (county referral hospitals); Level 6 = Tertiary (national referral hospitals). A Level IV hospital is therefore a PRIMARY level facility. (Kenya MOH Clinical Guidelines; KEPH facility classification; Kenya Health Sector Strategic Plan.)'
WHERE stem LIKE 'Level IV Hospital is classified as what level of facility%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 24: FREEMAN & HEINRICH — WRONG UNIT
-- =============================================================================
-- "According to Freeman and Heinrich, community health nursing is a developmental
--  service..." → unit = 'Mental Health Nursing', topic = 'Mental Health Nursing'
-- This is clearly a Community Health Nursing question. Not previously fixed.
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'Community Health Nursing Roles'
WHERE stem LIKE 'According to Freeman and Heinrich, community health nursing is a developmental service%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 25: COMMUNITY ORGANIZING INDICATOR — WRONG UNIT
-- =============================================================================
-- "An indicator of success in community organizing is when people are able to"
-- → unit = 'Nursing Management & Leadership', topic = 'Nursing Management'
-- This is Community Health Nursing content. Not previously fixed.
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'Community Health Process'
WHERE stem LIKE 'An indicator of success in community organizing is when people are able to%'
  AND unit = 'Nursing Management & Leadership'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 26: HOME VISIT CONTRARY PRINCIPLE — WRONG UNIT
-- =============================================================================
-- "Which is CONTRARY to the principles in planning a home visit?"
-- → unit = 'Nursing Management & Leadership', topic = 'Nursing Management'
-- This is Community Health Nursing / Home Visiting content.
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'Home Visiting'
WHERE stem LIKE 'Which is CONTRARY to the principles in planning a home visit%'
  AND unit = 'Nursing Management & Leadership'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 27: FTA (TREPONEMAL ANTIBODY) — WRONG UNIT
-- =============================================================================
-- "The best diagnostic test for treponema pallidum is: FTA" → unit = Nursing Management
-- This is a clinical diagnostic question belonging to Community Health Nursing (STI)
-- or Medical-Surgical Nursing.
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'STI and HIV'
WHERE stem LIKE 'A client visiting a family planning clinic is suspected of having an STI%treponema pallidum%'
  AND unit = 'Nursing Management & Leadership'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 28: PSORIASIS NURSING DIAGNOSIS — WRONG UNIT
-- =============================================================================
-- "The nursing diagnosis that best describes a patient with psoriasis who has quit her job..."
-- → unit = 'Infection Prevention & Control', topic = 'Infection Prevention'
-- Psoriasis is NOT an infectious condition. This belongs to Medical-Surgical Nursing
-- (dermatology) with a mental health/psychosocial diagnosis component.
-- =============================================================================
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Dermatological Nursing'
WHERE stem LIKE 'The nursing diagnosis that best describes a patient with psoriasis%'
  AND unit = 'Infection Prevention & Control'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 29: PUERPERAL SEPSIS EmONC LEVEL — WRONG UNIT
-- =============================================================================
-- "A woman presents 7 days after childbirth with fever... offensive vaginal discharge...
--  where should she be managed? Hospital" → unit = 'Community Health Nursing'
-- This is a Midwifery (obstetric emergency) question.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Puerperal Infections'
WHERE stem LIKE 'A woman presents to a clinic 7 days after normal childbirth with a fever%offensive vaginal discharge%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 30: MANIA / HIGH-CALORIE FOODS — WRONG UNIT
-- =============================================================================
-- "A client with mania is unable to finish her dinner..." → unit = Community Health
-- This is a Mental Health Nursing question.
-- =============================================================================
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Mood Disorders'
WHERE stem LIKE 'A client with mania is unable to finish her dinner%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 31: COMBATIVE CLIENT "TRYING TO KILL ME" — WRONG UNIT
-- =============================================================================
-- "A client is brought to the emergency room... 'They are trying to kill me'"
-- → unit = 'Community Health Nursing' -- should be Mental Health Nursing
-- =============================================================================
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotic Disorders'
WHERE stem LIKE 'A client is brought to the emergency room by the police%trying to kill me%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 32: MRSA CONTACT PRECAUTIONS — WRONG UNIT
-- =============================================================================
-- "A client with MRSA is placed on contact precautions..."
-- → unit = 'Community Health Nursing' — should be Infection Prevention & Control
-- =============================================================================
UPDATE questions
SET unit = 'Infection Prevention & Control', topic = 'Infection Prevention'
WHERE stem LIKE 'A client hospitalized with MRSA%methicillin-resistant staph aureus%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 33: NORMAL SALINE TRACHEOTOMY SUCTIONING — WRONG UNIT
-- =============================================================================
-- "The nurse is preparing to suction the client with a tracheotomy... unlabelled saline"
-- → unit = 'Community Health Nursing' — should be Medical-Surgical Nursing (IPC)
-- =============================================================================
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Respiratory Nursing'
WHERE stem LIKE 'The nurse is preparing to suction the client with a tracheotomy. The nurse notes a previously used bottle of normal saline%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 34: NEW MOTHER "AFRAID OF HER BABY" — WRONG UNIT
-- =============================================================================
-- "A new mother tells you she is afraid of her baby..." → unit = Community Health Nursing
-- This is a postpartum mental health / Midwifery question.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'A new mother tells you that she is afraid of her baby%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 35: ANOREXIC CLIENT RESPONSE — WRONG UNIT
-- =============================================================================
-- "An anorexic client states that her stomach is 'fat'..." → unit = Community Health Nursing
-- This is a Mental Health Nursing question (eating disorders).
-- =============================================================================
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Eating Disorders'
WHERE stem LIKE 'An anorexic client states that her stomach is%fat%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 36: TB SYMPTOMS (hemoptysis, night sweats) — WRONG UNIT
-- =============================================================================
-- "A client is admitted with hemoptysis, fatigue, night sweats... diagnosis: TB"
-- → unit = 'Community Health Nursing' — should remain Community Health for TB
-- HOWEVER the topic is 'Community Health' which is too vague.
-- =============================================================================
UPDATE questions
SET topic = 'Communicable Diseases'
WHERE stem LIKE 'A client is admitted to the hospital with a temperature%hemoptysis%night sweats%'
  AND topic IN ('Community Health', 'Epidemiology')
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 37: THIRD-DEGREE PERINEAL TEAR — WRONG ANSWER
-- =============================================================================
-- Stem: "Which of the following BEST describes a third degree perineal tear?"
-- Options:
--   A: Injury to perineum involving perineal muscles
--   B: Injury to perineal skin, includes the fourchette, hymen, labia and vaginal mucosa
--   C: Injury to perineum involving anal sphincter complex and anal epithelium
--   D: Injury to perineum involving the anal sphincter complex
--
-- Per RCOG/Myles classification (adopted by Kenya MOH):
--   1st degree = skin/vaginal mucosa only (= option B)
--   2nd degree = perineal muscles (= option A)
--   3rd degree = anal sphincter complex (external and/or internal) = option D
--   4th degree = sphincter complex PLUS anal/rectal epithelium = option C
--
-- Current answer = C. Option C describes a FOURTH-degree tear, not third-degree.
-- Third-degree tear = option D (anal sphincter complex).
-- FIX: correct_option = 'D'
-- =============================================================================
UPDATE questions
SET correct_option = 'D',
    rationale = 'Per the RCOG/Kenya MOH classification of perineal trauma: 1st degree = perineal skin and/or vaginal mucosa only; 2nd degree = perineal muscles; 3rd degree = anal sphincter complex (external and/or internal anal sphincter); 4th degree = sphincter complex PLUS injury to the anal/rectal epithelium. Option D (injury involving the anal sphincter complex) correctly describes a third-degree tear. Option C (involving the anal sphincter AND anal epithelium) describes a fourth-degree tear. (Myles Textbook for Midwives; RCOG Green-top Guideline No. 29; Kenya MOH maternal guidelines.)'
WHERE stem LIKE 'Which of the following BEST describes a third degree perinea%tear%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 38: TWIN-TO-TWIN TRANSFUSION — WRONG ANSWER
-- =============================================================================
-- Stem: "Which of the following is NOT diagnostic of twin to twin transfusion?"
-- Options:
--   A: Both are of same sex
--   B: It results from venous communication of both foetuses
--   C: Both are of different growth
--   D: Both are of different amniotic fluid
-- Current answer = C "Both are of different growth"
--
-- CLINICAL ANALYSIS:
-- TTTS criteria per Myles/RCOG:
--   - Monochorionic (same sex) twins: YES — diagnostic criterion (A = diagnostic)
--   - Vascular anastomoses/communication: YES — diagnostic (B = diagnostic)
--   - Discordant GROWTH: can occur but is NOT specific to TTTS (also in IUGR etc.) — non-specific
--   - Discordant amniotic fluid (oligo/polyhydramnios): YES — classic diagnostic finding (D = diagnostic)
-- The question asks what is NOT diagnostic. Discordant growth (C) is present but not
-- specific/definitive enough to be diagnostic on its own.
-- Answer C is defensible. However the rationale is confusing and contradicts itself.
-- The answer is clinically correct — improve rationale:
-- =============================================================================
UPDATE questions
SET rationale = 'Twin-to-twin transfusion syndrome (TTTS) diagnostic criteria include: monochorionic (same-sex) placentation, vascular anastomoses between the fetuses, and discordant amniotic fluid (polyhydramnios in the recipient, oligohydramnios in the donor — the ''stuck twin''). Discordant GROWTH (option C) alone is not specific or diagnostic for TTTS — it also occurs in selective IUGR without TTTS. Therefore discordant growth is the least diagnostic of the listed features, making C the NOT diagnostic answer. (Myles Textbook for Midwives; Kenya MOH maternal-fetal medicine guidelines.)'
WHERE stem LIKE 'Which of the following is NOT diagnostic of twin to twin transfusion%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 39: MYASTHENIC CRISIS PRECIPITANT — OPTION B CONTAINS CLINICAL NOTE
-- =============================================================================
-- "A female client has experienced an episode of myasthenic crisis..."
-- option_b contains: "taking excess medication - (will cause cholinergic crisis instead)"
-- This is a clinical annotation inside the option text, NOT part of the answer option.
-- Students will read this annotation and it gives away the answer.
-- No prior migration cleaned this option text.
-- =============================================================================
UPDATE questions
SET option_b = 'Taking excess medication'
WHERE stem LIKE 'A female client has experienced an episode of myasthenic crisis%'
  AND option_b LIKE '%cholinergic crisis instead%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 40: UNCONSCIOUS CLIENT POSITION — option_d CONTAINS ANNOTATION
-- =============================================================================
-- "A client is unconscious following a tonic-clonic seizure..."
-- option_d: "Place a tongue blade in the mouth (Never do this! Places client in danger!)"
-- This annotation gives away the answer (signals D is wrong). Violates exam integrity.
-- Clean the option text.
-- =============================================================================
UPDATE questions
SET option_d = 'Place a tongue blade in the mouth'
WHERE stem LIKE 'A client is unconscious following a tonic-clonic seizure%'
  AND option_d LIKE '%Never do this!%'
  AND cadre IN ('BScN', 'KRCHN');

-- Same annotation issue in the seizure FIRST action question:
UPDATE questions
SET option_d = 'Place a tongue blade in the client''s mouth'
WHERE stem LIKE 'A male client is having a tonic-clonic seizures. What should the nurse do first%'
  AND option_c LIKE '%tongue blade%'
  AND option_c NOT LIKE 'Place a tongue blade in the client''s mouth'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 41: MYASTHENIC CRISIS PRECIPITANT OPTION ANNOTATION (KRCHN version)
-- =============================================================================
UPDATE questions
SET option_b = 'Taking excess medication'
WHERE stem LIKE 'A female client has experienced an episode of myasthenic crisis%'
  AND option_b LIKE '%cholinergic crisis instead%'
  AND cadre = 'KRCHN';

-- =============================================================================
-- ERROR 42: MENINGITIS POST-CRANIOTOMY — option annotations in KRCHN
-- The "apostrophe s" character issue in stem
-- "Kernig's" and "Brudzinski's" — confirm no encoding issue breaking the WHERE match
-- Clinical answer C (Brudzinski's sign positive) = correct. No change needed.

-- =============================================================================
-- ERROR 43: ERIKSON STAGE FOR 35-YEAR-OLD — KRCHN version
-- (Already fixed in ERROR 20 above — WHERE covers both cadres)

-- =============================================================================
-- ERROR 44: OBESITY FACTORS — BEST ANSWER VERIFICATION
-- =============================================================================
-- "The major factors associated with obesity include: Genetic, nutritional, level of activity"
-- Answer A is clinically correct per Brunner & Suddarth and nutrition texts.
-- Confirmed correct. No change.

-- =============================================================================
-- ERROR 45: BURN PREVENTION HEALTH MESSAGE — WRONG ANSWER
-- =============================================================================
-- Stem: "Which one of the following topics should be included in a health message
--        on burn prevention?"
-- Options: A=Solar powered night light, B=Check smoke detectors annually,
--          C=Do not use oven for cooking, D=Set water heater no longer than 48°C
-- Current answer B: "Check smoke detectors annually"
--
-- Per Kenya MOH injury prevention / community health education:
-- Checking smoke detectors ANNUALLY is INADEQUATE — the recommended frequency is
-- monthly testing and annual battery replacement (NFPA standard).
-- Option D: "Set water heater no longer than 48°C" — this is a specific, actionable
-- burn-scald prevention measure. Most guidelines recommend ≤49°C (120°F).
-- 48°C is within safe range and is a validated burn prevention teaching point.
-- Option D is a MORE specific, actionable burn prevention message than annual
-- smoke detector checking. Fix to D:
-- =============================================================================
UPDATE questions
SET correct_option = 'D',
    rationale = 'Setting the water heater temperature to no more than 48-49°C (≤120°F) prevents scalding burns, which are a major cause of burn injuries especially in children and the elderly. This is a specific, actionable burn prevention health message. Checking smoke detectors annually (B) relates to fire detection rather than burn prevention itself; the recommended frequency for smoke detector testing is monthly, not annually. Solar night lights and avoiding ovens are less specific or impractical advice. (Kenya Community Health Nursing injury prevention guidelines; WHO burn prevention recommendations.)'
WHERE stem LIKE 'Which one of the following topics should be included in a health message on burn prevention%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- VERIFICATION QUERIES — additional checks for this migration
-- =============================================================================
-- 1. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Mr. J. is a new client%35 years old%Erikson%';
--    Expected: correct_option = 'A' (Intimacy vs. Isolation)
--
-- 2. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Level IV Hospital is classified as%';
--    Expected: correct_option = 'A' (Primary)
--
-- 3. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Which of the following BEST describes a third degree perinea%tear%';
--    Expected: correct_option = 'D'
--
-- 4. SELECT correct_option FROM questions
--    WHERE stem LIKE 'A client with a history of abusing barbiturates abruptly stops%';
--    Expected: correct_option = 'B'
--
-- 5. SELECT option_b FROM questions
--    WHERE stem LIKE 'A female client has experienced an episode of myasthenic crisis%';
--    Expected: 'Taking excess medication' (no annotation)
--
-- 6. SELECT option_d FROM questions
--    WHERE stem LIKE 'A client is unconscious following a tonic-clonic seizure%';
--    Expected: 'Place a tongue blade in the mouth' (no parenthetical)
--
-- 7. SELECT unit, topic FROM questions
--    WHERE stem LIKE 'According to Freeman and Heinrich%developmental service%';
--    Expected: unit='Community Health Nursing'
--
-- 8. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Which one of the following topics should be included in a health message on burn prevention%';
--    Expected: correct_option = 'D'
-- =============================================================================

-- =============================================================================
-- ERROR 46: TRICHOMONIASIS — WRONG UNIT (STI question in wrong unit)
-- =============================================================================
-- "The treatment of choice for trichomoniasis is: Metronidazole"
-- Unit = Medical-Surgical Nursing — should be Community Health Nursing (STI)
-- No prior migration fixed this specific question's unit.
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'STI and HIV'
WHERE stem LIKE 'The treatment of choice for trichomoniasis is%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 47: DEAFNESS CLASSIFICATION — WRONG UNIT and WRONG PAPER
-- =============================================================================
-- "Deafness that develops after speech has developed... adventitious deafness"
-- Unit = Community Health Nursing, Paper = Paper I
-- This belongs in Paper II / Community Health Nursing.
-- The paper is wrong: Community Health is Paper II.
-- =============================================================================
UPDATE questions
SET paper = 'Paper II'
WHERE stem LIKE 'Deafness that develops after speech has developed is referred to as%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 48: SPERMICIDES — WRONG UNIT and PAPER
-- =============================================================================
-- "The following statement is FALSE about spermicides..."
-- Unit = Medical-Surgical Nursing — should be Midwifery (Family Planning)
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Family Planning'
WHERE stem LIKE 'The following statement is FALSE about spermicides%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 49: ARI CLASSIFICATION — WRONG UNIT
-- =============================================================================
-- "In classification of acute respiratory infections in children, very severe symptoms include"
-- Unit = Medical-Surgical Nursing — should be Paediatric Nursing (IMNCI)
-- =============================================================================
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'IMNCI'
WHERE stem LIKE 'In classification of acute respiratory infections in children%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 50: CHANCROID CAUSATIVE AGENT — RATIONALE HAS SOURCE LABEL CONTAMINATION
-- =============================================================================
-- "The causative agent of chancroid is: Hemophilus ducreyi"
-- Rationale ends with: "Source: AMREF Past Paper 4 (KRCHN)"
-- Source labels are not part of rationales per §14 standards.
-- =============================================================================
UPDATE questions
SET rationale = 'Per Kenya STI guidelines and Brunner & Suddarth''s, chancroid (soft chancre) is caused by Haemophilus ducreyi. Treponema pallidum causes syphilis (hard chancre), Chlamydia trachomatis causes lymphogranuloma venereum/chlamydia, and Ureaplasma urealyticum causes non-gonococcal urethritis. The painful, soft ulcer with undermined edges is the clinical clue. (Kenya National STI Management Guidelines.)'
WHERE stem LIKE 'The causative agent of chancroid is%'
  AND rationale LIKE '%AMREF%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 51: GUMMA LESIONS — RATIONALE HAS SOURCE LABEL CONTAMINATION
-- =============================================================================
-- "Gumma lesions are characteristic of: Tertiary stage of syphilis"
-- Rationale ends with: "Source: AMREF Past Paper 4 (KRCHN)"
-- =============================================================================
UPDATE questions
SET rationale = 'Per Kenya STI guidelines and Brunner & Suddarth''s, gummas (granulomatous nodular lesions that can destroy bone, organs or skin) are the hallmark of tertiary syphilis. Primary syphilis presents with a painless chancre; secondary syphilis presents with rash, condylomata lata and systemic symptoms; gummas distinguish the tertiary stage. (Kenya National STI Management Guidelines.)'
WHERE stem LIKE 'Gumma lesions are characteristic of%'
  AND rationale LIKE '%AMREF%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 52: VALIUM (DIAZEPAM) — RATIONALE HAS SOURCE LABEL CONTAMINATION
-- =============================================================================
-- Rationale ends with: "Source: NCK Exam Practice Sets (Exam 1-2, Type 3-5)"
-- =============================================================================
UPDATE questions
SET rationale = 'Valium (diazepam) is a benzodiazepine CNS depressant. Combining it with alcohol or other CNS depressants causes dangerous additive/synergistic sedation and respiratory depression. Clients must be instructed to avoid alcohol strictly. Activities requiring alertness (driving, operating machinery) should also be restricted. (Kenya EML; BNF pharmacology; Brunner & Suddarth''s.)'
WHERE stem LIKE 'Which of the following should be included in the health teachings among clients receiving Valium%'
  AND rationale LIKE '%NCK Exam Practice Sets%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 53: POSTPARTUM TEMPERATURE — RATIONALE CONTAMINATED WITH FEVER DEFINITION
-- =============================================================================
-- "Taking vital signs on a postpartum client... 100.2°F or 37.9... priority action: A"
-- Rationale ends with embedded text: "Postpartum fever is defined as a temperature
-- of 38.7 degrees C (101.6 degrees F) or greater for the first 24 hours..."
-- This is a clinical annotation, not part of the rationale.
-- NOTE: The embedded fever definition itself is WRONG per international standards:
-- Puerperal fever is defined as ≥38.0°C (100.4°F) on any 2 of the first 10 days
-- postpartum EXCLUDING the first 24 hours (Myles). The embedded text states 38.7°C/101.6°F
-- which is NOT the standard definition.
-- Clean the contamination and correct the definition:
-- =============================================================================
UPDATE questions
SET rationale = 'A temperature of 37.9°C (100.2°F) within the first 24 hours postpartum is commonly due to dehydration from the exertion of labour and is not defined as puerperal fever. The priority nursing action is to increase oral hydration and reassess. Puerperal (postpartum) fever is defined as a temperature of ≥38.0°C (100.4°F) on any 2 of the first 10 days postpartum, excluding the first 24 hours. (Myles Textbook for Midwives; Kenya MOH maternal and newborn health guidelines.)'
WHERE stem LIKE 'You are taking vital signs observations on a postpartum client who delivered a healthy newborn 4 hours ago%'
  AND rationale LIKE '%38.7%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 54: DEVELOPMENTAL MILESTONE 12-18 MONTHS — WRONG ANSWER
-- =============================================================================
-- Stem: "Developmental milestone achieved at 12-18 months include:"
-- Options:
--   A: Child sitting unsupported, grasping actively and makes loud noises
--   B: A child is able to run around, says several words           ← marked CORRECT
--   C: A child is able to stand, understand a few words and tries to use them
--   D: A child is able to walk, grasp small objects with thumbs and fingers
--
-- Per Kenya Basic Paediatric Protocols / WHO developmental milestones:
-- At 12 months: walks with support/independently, uses 1-3 words, pincer grasp
-- At 18 months: walks well, runs, says 10+ words
-- Option B says "run around, says several words" — running steadily is ~18 months
-- Option D says "walk, grasp small objects with thumbs and fingers (pincer)" = 12 months
-- Both B and D are valid for different points in the 12-18 month window.
-- However, option B covers 12-18 months as a range better (walking→running progression,
-- several words). The rationale says "sitting unsupported and standing with pincer grasp
-- are earlier milestones (around 6-12 months)" — which is partially wrong:
-- - Standing independently occurs at ~12 months (within range)
-- - Pincer grasp occurs at ~9-10 months (before 12 months)
-- Option C: "stand, understand few words, tries to use them" = closer to 12 months
-- Per NCK standard: Answer B is the intended correct answer for 12-18 months.
-- The rationale is slightly inaccurate — improve it:
-- =============================================================================
UPDATE questions
SET rationale = 'Per Kenya Basic Paediatric Protocols and WHO developmental milestones, by 12-18 months a child progresses from walking (12 months) to running (18 months) and vocabulary grows from 1-3 words at 12 months to 10+ words by 18 months. Option B (able to run and say several words) best represents the 12-18 month range. Sitting unsupported develops at ~6-8 months; pincer grasp develops at ~9-10 months — both precede this range. (Kenya Basic Paediatric Protocols; WHO Child Growth Standards; IMNCI developmental assessment.)'
WHERE stem LIKE 'Developmental milestone achieved at 12-18 months include%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 55: NORMAL CHILDHOOD GROWTH — CLINICAL ACCURACY
-- =============================================================================
-- "The following statement is true regarding normal growth and development of a child"
-- Answer A: "Average length of a child is 20 inches at birth and 30 inches at 1 year"
-- Verification: Birth length ≈ 50 cm ≈ 19.7 inches ≈ 20 inches ✓
-- 1 year length ≈ 75 cm ≈ 29.5 inches ≈ 30 inches ✓
-- Answer A is correct. Rationale accurate.
-- BUT option B says "At the age of 3 years, the average child is 6 feet tall" — this is
-- grossly wrong (a 3-year-old is ~95 cm/37 inches, not 6 feet) which makes it an
-- absurd distractor. The question is valid. No clinical change needed.

-- =============================================================================
-- ERROR 56: SPERMICIDES RATIONALE — CLINICAL ACCURACY CHECK
-- =============================================================================
-- "The following statement is FALSE about spermicides: May cause congenital abnormalities"
-- Answer A is correct: spermicides do NOT cause congenital abnormalities.
-- However option B says "May increase risk of HIV if used several times a day" — this
-- is TRUE (frequent use irritates mucosa, increasing HIV vulnerability).
-- The rationale correctly identifies A as the FALSE statement.
-- No change needed to answer. Unit fix already addressed in ERROR 48.

-- =============================================================================
-- ERROR 57: SYSTEMIC CHANGES PUERPERIUM — WRONG UNIT
-- =============================================================================
-- "Systemic changes during normal puerperium include..." unit = Medical-Surgical
-- This is Midwifery content.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'Systemic changes during normal puerperium include%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 58: POSTPARTUM WEIGHT LOSS — WRONG UNIT
-- =============================================================================
-- "Mrs Wangombe...weight she gained during pregnancy..." unit = Medical-Surgical
-- This is Midwifery content.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'MrsWangombe is under your care and expresses concern about the weight%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 59: POSTPARTUM VITAL SIGNS TEMPERATURE — WRONG UNIT
-- =============================================================================
-- "You are taking vital signs on a postpartum client..." unit = Medical-Surgical
-- This is Midwifery content.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'You are taking vital signs observations on a postpartum client who delivered%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 60: BREASTFEEDING ENGORGEMENT — WRONG UNIT
-- =============================================================================
-- "Which of the following interventions...breastfeeding mother...engorged breasts"
-- unit = Medical-Surgical Nursing — should be Midwifery
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'Which of the following interventions would be helpful to a breastfeeding mother who is experiencing engorged breasts%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 61: OXYTOCIN IN PUERPERIUM — WRONG UNIT
-- =============================================================================
-- "The main function of oxytocin during puerperium..." unit = Medical-Surgical
-- This is Midwifery content.
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'The main function of oxytocin during puerperium is to stimulate%'
  AND unit = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 62: ENTEROBIASIS UNIT — Wrong unit (should be Community Health / Communicable)
-- =============================================================================
-- "In enterobiasis infection, the adult worm lives in the: Caecum"
-- Unit = Infection Prevention & Control — should be Community Health Nursing
-- (communicable/parasitic disease) or Medical-Surgical Nursing
-- =============================================================================
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'Communicable Diseases'
WHERE stem LIKE 'In enterobiasis infection, the adult worm lives in the%'
  AND unit = 'Infection Prevention & Control'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 63: BULLOUS IMPETIGO — WRONG UNIT
-- =============================================================================
-- "Bullous impetigo..." unit = Pharmacology — should be Paediatric Nursing
-- or Medical-Surgical Nursing (dermatology)
-- =============================================================================
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Paediatric Infections'
WHERE stem LIKE 'Bullous impetigo%'
  AND unit = 'Pharmacology'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 64: FERTILISATION SITE — WRONG UNIT
-- =============================================================================
-- "Fertilization occurs in one of the following parts of fallopian tube: Ampulla"
-- Unit = Medical-Surgical Nursing — should be Midwifery (reproductive anatomy)
-- =============================================================================
UPDATE questions
SET unit = 'Midwifery', topic = 'Obstetric Anatomy'
WHERE stem LIKE 'Fertilization occurs in one of the following parts of fallopian tube%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- ERROR 65: BREASTFEEDING IgA — WRONG UNIT
-- =============================================================================
-- "...a mother who breastfeeds her child passes on which antibody... IgA"
-- Unit = Paediatric Nursing — acceptable, but topic should be specific
-- =============================================================================
UPDATE questions
SET topic = 'Neonatal Care'
WHERE stem LIKE 'Nurse Nyaruai is giving a health education talk%which antibody through breast milk%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- VERIFICATION QUERIES — for this batch
-- =============================================================================
-- 1. SELECT unit FROM questions WHERE stem LIKE 'The treatment of choice for trichomoniasis%';
--    Expected: unit='Community Health Nursing'
--
-- 2. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Mr. J. is a new client%35 years old%Erikson%';
--    Expected: correct_option = 'A'
--
-- 3. SELECT correct_option FROM questions
--    WHERE stem LIKE 'Level IV Hospital is classified as%';
--    Expected: correct_option = 'A' (Primary)
--
-- 4. SELECT correct_option FROM questions
--    WHERE stem LIKE 'A client with a history of abusing barbiturates abruptly stops%';
--    Expected: correct_option = 'B'
--
-- 5. SELECT rationale FROM questions
--    WHERE stem LIKE 'You are taking vital signs observations on a postpartum client%';
--    Expected: rationale does NOT contain '38.7' — contains '38.0' instead
-- =============================================================================
