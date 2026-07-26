-- ============================================================
-- Migration: Fix All Flagged Questions (26 July 2026)
-- Audit of 42 flagged questions → 32 valid flags addressed
-- Changes: 2 answer corrections, 2 stem fixes, 1 option typo,
--          9 unit/topic reclassifications, 20 rationale
--          improvements, 1 full question redesign
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- SECTION 1: CORRECT WRONG ANSWERS (2 questions)
-- ────────────────────────────────────────────────────────────

-- Q19: Advantage of integration of services
-- Student correctly flagged: "B is the answer"
-- "Save time and money for the nurse" is factually wrong as stated;
-- improving immunisation coverage is the documented primary advantage
UPDATE questions
SET
    correct_option = 'B',
    unit           = 'Community Health Nursing',
    topic          = 'Health Systems & Integration',
    rationale      = 'A key evidence-based advantage of integrating health services is IMPROVED IMMUNISATION COVERAGE (Option B) — integrated visits systematically identify children with missed vaccinations, reducing missed opportunities for vaccination (MOV). This is a documented WHO/MOH Kenya strategy for increasing KEPI uptake. Option A is factually wrong as stated: the benefit of integration is saving time and resources for the CLIENT and health SYSTEM, not primarily "for the nurse." Option C ("patients are integrated in the approach") is not a meaningful or specific advantage. Option D ("high chance of cross-infection") correctly identifies a DISADVANTAGE of integration, not an advantage. (MOH Kenya KEPI; WHO Immunization Agenda 2030; Park''s Preventive & Social Medicine.)'
WHERE id = 'b3829157-6dd2-4e5f-88d3-e64fbc65e89d';

-- ────────────────────────────────────────────────────────────
-- SECTION 2: FULL QUESTION REDESIGN — APGAR at 5 minutes
-- Original stem omitted grimace finding → score calculation
-- was ambiguous (gave ~5, not 7). Redesigned to yield
-- unambiguous score of 7 with all 5 criteria present.
-- Scoring: HR 110 (≥100)=2 + acrocyanosis=1 + some flexion=1
--          + weak slow cry=1 + coughs when suctioned=2 → TOTAL=7
-- ────────────────────────────────────────────────────────────

UPDATE questions
SET
    stem           = 'An infant assessed at 5 minutes of life shows the following: heart rate of 110 beats per minute, pink body with blue hands and feet, some flexion of the extremities, a weak slow cry, and coughs when the nasopharynx is suctioned. What is the Apgar score?',
    option_a       = '7',
    option_b       = '8',
    option_c       = '6',
    option_d       = '9',
    correct_option = 'A',
    rationale      = 'The Apgar score assesses FIVE criteria at 1 and 5 minutes of life, each scored 0–2 (maximum total = 10). Scoring this infant: (1) HEART RATE: ≥100 bpm = 2 points → HR 110 = 2; (2) COLOUR: pink body + blue extremities only (acrocyanosis) = 1 point (completely pink = 2; pale/blue all over = 0); (3) MUSCLE TONE: some flexion = 1 point (active motion = 2; limp = 0); (4) RESPIRATORY EFFORT: weak slow cry = 1 point (strong cry = 2; absent = 0); (5) REFLEX IRRITABILITY (response to nasopharyngeal suction): coughs = 2 points (grimace only = 1; no response = 0). Total: 2 + 1 + 1 + 1 + 2 = 7 (Option A). Interpretation: 7–10 = NORMAL (routine care); 4–6 = MODERATE depression (stimulate, give oxygen, reassess); 0–3 = SEVERE depression (immediate neonatal resuscitation — bag-mask ventilation, chest compressions, medications). (Kenya Basic Paediatric Protocols; Myles Textbook for Midwives — Neonatal Assessment.)'
WHERE id = '878f768c-7c91-4fae-9adf-364703bfba24';

-- ────────────────────────────────────────────────────────────
-- SECTION 3: FIX STEM TYPOS (2 questions)
-- ────────────────────────────────────────────────────────────

-- Q6: Trophoblast cells — "from" → "form"
UPDATE questions
SET stem = 'The trophoblast cells of the developing zygote form the:-'
WHERE id = 'f75ddd3d-15f7-4476-990b-892021093669';

-- Q21: Garbled stem — OCR merged an IMR definition fragment
-- with the actual time management question (question #184).
-- The IMR fragment belongs to a different question entirely.
UPDATE questions
SET stem = 'Some principles of time management include:'
WHERE id = '12ee8b85-aed4-45a3-91a0-4b87d3a99eb3';

-- ────────────────────────────────────────────────────────────
-- SECTION 4: FIX OPTION TYPO (1 question)
-- ────────────────────────────────────────────────────────────

-- Q40: Footling breech — "Footing" is a misspelling
UPDATE questions
SET option_c = 'Footling breech'
WHERE stem = 'The type of breech in which thighs are flexed with legs extended is called:';

-- ────────────────────────────────────────────────────────────
-- SECTION 5: UNIT / TOPIC RECLASSIFICATIONS (9 questions)
-- Per §14.4 of nck-exam-system.md — unit must reflect actual
-- clinical content; topic must be a specific clinical sub-topic
-- ────────────────────────────────────────────────────────────

-- Q2: Population pyramid → Community Health / Demography
UPDATE questions
SET unit = 'Community Health Nursing', topic = 'Epidemiology & Demography'
WHERE id = '4b3daa63-3e3b-42df-9deb-84e442523bd3';

-- Q5: Purpose of assessment → Nursing Education (both cadres if exists)
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem = 'Which of the following is not the purpose of assessment?';

-- Q7: Valium (diazepam) teachings → Pharmacology
UPDATE questions
SET unit = 'Pharmacology', topic = 'CNS Drugs & Drug Interactions'
WHERE stem = 'Which of the following should be included in the health teachings among clients receiving Valium:';

-- Q10: Ulcerative colitis in a CHILD → Paediatric Nursing
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Paediatric GI Disorders'
WHERE stem = 'The nurse is aware that the most common assessment finding in a child with ulcerative colitis is:';

-- Q17: Enterobiasis (pinworm) → topic: Parasitology
UPDATE questions
SET topic = 'Parasitology'
WHERE stem = 'In enterobiasis infection, the adult worm lives in the:-';

-- Q20: Formative assessment → Nursing Education
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem = 'A type of educational assessment which is generally carried out throughout a course or project is';

-- Q23: Ductus venosus / fetal circulation → Midwifery
UPDATE questions
SET unit = 'Midwifery', topic = 'Fetal Circulation'
WHERE stem = 'The following structures in fetal circulation joins the umbilical cord to the inferior vena cava';

-- Q27: Ectoderm differentiation → Midwifery / Embryology
UPDATE questions
SET unit = 'Midwifery', topic = 'Embryology'
WHERE stem = 'The ectoderm differentiates to form the:-';

-- Q38: Scale with absolute zero → Research & Statistics
UPDATE questions
SET unit = 'Research & Statistics', topic = 'Measurement & Biostatistics'
WHERE stem = 'A scale of measurement with an absolute zero include: -*';

-- ────────────────────────────────────────────────────────────
-- SECTION 6: RATIONALE IMPROVEMENTS (20 questions)
-- Per §14.2 — rationale must explain WHY the chosen option
-- is best AND clearly justify why other options are wrong.
-- ────────────────────────────────────────────────────────────

-- Q1: Vitreous humour — explain all 4 options
UPDATE questions
SET rationale = 'The VITREOUS HUMOUR (Option B) is the clear, gel-like substance filling the POSTERIOR SEGMENT of the eye — the large cavity between the lens and the retina. It maintains the eye''s shape and supports the retina. The other options are wrong: SCLERA (Option A) is the tough white fibrous outer coat of the eyeball — a structural layer, not a substance filling the eye. AQUEOUS HUMOUR (Option C) is a different clear liquid, but it fills the ANTERIOR and POSTERIOR CHAMBERS (the smaller space between the cornea and the lens), NOT the retina-to-lens space. CONJUNCTIVA (Option D) is the transparent mucous membrane lining the inner surface of the eyelids and the anterior surface of the sclera — not a fluid. Clinically: vitreous detachment causes floaters; vitreous haemorrhage (in diabetic retinopathy) causes sudden painless vision loss requiring same-day ophthalmology referral. (Brunner & Suddarth — Eye Anatomy; Anatomy & Physiology.)'
WHERE id = '648292ce-45a0-4d04-9082-d07e0412577e';

-- Q8: Bell's palsy — name all cranial nerves clearly
UPDATE questions
SET rationale = 'Bell''s palsy is an acute, unilateral peripheral paralysis of cranial nerve VII — the FACIAL NERVE (Option B). It causes sudden unilateral facial weakness or complete paralysis, inability to close the eye (risking corneal damage), drooping of the mouth corner, drooling, and loss of taste on the anterior two-thirds of the tongue. It is the most common cause of unilateral facial palsy and is frequently associated with HSV-1 reactivation. The other cranial nerves listed are unrelated to Bell''s palsy: CN VIII (Option A) = vestibulocochlear nerve — controls HEARING and BALANCE; damage causes sensorineural deafness or vertigo. CN V (Option C) = trigeminal nerve — provides FACIAL SENSATION and controls muscles of CHEWING; damage causes facial numbness and jaw weakness, not facial palsy. CN II (Option D) = optic nerve — carries VISUAL information; damage causes visual field loss or blindness. (Brunner & Suddarth''s Medical-Surgical Nursing.)'
WHERE id = '60f05ac2-aded-4b68-aa0c-7d2964ab084a';

-- Q9: Post-MI health messages — explain all distractors
UPDATE questions
SET rationale = 'Post-myocardial infarction (MI) cardiac rehabilitation (Brunner & Suddarth) centres on identification and modification of ALL modifiable risk factors (Option D): smoking cessation, blood pressure control, lipid management (statins), blood glucose control, weight reduction, regular physical activity, and medication adherence. This is the most comprehensive teaching priority. Why not the others? Option A: a low-sodium diet IS appropriate post-MI, but "fluid-free diet" is INCORRECT and dangerous — restricting fluids without clinical indication can worsen haemodynamic status. Option B: insomnia is common post-MI but is a symptom to manage, not the overarching rehabilitation teaching message. Option C: reporting extreme fatigue IS important (may indicate heart failure or anaemia) but is a single symptom instruction, not the primary rehabilitation teaching. Option D encompasses the strategy that addresses the root causes of recurrent MI and is consistent with evidence-based cardiac rehabilitation programmes. (Brunner & Suddarth — Cardiac Rehabilitation; Kenya cardiovascular health guidelines.)'
WHERE id = 'b322fa62-af43-4a77-a030-217e5e8dc75b';

-- Q11: HIV predilection — full immunological explanation
UPDATE questions
SET rationale = 'HIV specifically targets CD4+ T-helper lymphocytes (T4 cells) by binding their CD4 receptor via viral gp120 glycoprotein. Progressive CD4+ depletion destroys cell-mediated immunity, leaving the host susceptible to OPPORTUNISTIC INFECTIONS (PCP, cryptococcal meningitis, CMV retinitis, TB) and AIDS-defining NEOPLASMS (Kaposi''s sarcoma, non-Hodgkin lymphoma) — Option D. Why not the others? Option A is doubly wrong: HIV DECREASES (not increases) T4 lymphocytes; the resulting immunosuppression causes SELECTIVE CD4 lymphocytopenia, not generalised lymphocytopenia initially. Option B is wrong: HIV dysregulates B-cells, causing polyclonal activation and HYPERgammaglobulinaemia (not hypogammaglobulinaemia) in early disease. Option C is wrong: cell-mediated immunity failure results in DECREASED cutaneous hypersensitivity — patients with advanced HIV show ANERGY (absent skin test reactions), not increased hypersensitivity responses. (Brunner & Suddarth; NASCOP/MOH Kenya ART Guidelines.)'
WHERE id = 'c3ff2307-30f7-4b19-bd98-c82852a95e3c';

-- Q12: Maslow's Hierarchy — brief description of each level
UPDATE questions
SET rationale = 'Maslow''s Hierarchy of Needs lists five levels in ASCENDING order from most basic to highest: (1) PHYSIOLOGICAL — most basic survival: oxygen, food, water, sleep, warmth, shelter. Must be met before anything else. (2) SAFETY — security, freedom from danger, stable environment, employment. Met once survival is assured. (3) LOVE & BELONGING — affection, friendship, family bonds, social connections. Sought once safety is established. (4) SELF-ESTEEM — confidence, achievement, recognition, and self-respect. Pursued when belonging needs are fulfilled. (5) SELF-ACTUALISATION — the pinnacle: realising one''s full potential, creativity, meaning, and personal growth. Option C (Physiological → Safety → Belonging → Self-esteem → Self-actualisation) is the correct ascending sequence. In nursing, Maslow guides PRIORITISATION — physiological emergencies (airway, breathing, circulation) are always addressed before safety, social, or psychological needs. (Nursing theory; Nursing Management & Leadership texts.)'
WHERE id = '719bf426-3f4e-4aa7-ada8-d98edf2a9ce9';

-- Q13: Cognitive domain — full Bloom's Taxonomy explanation
UPDATE questions
SET rationale = 'Bloom''s Taxonomy classifies learning into THREE DOMAINS: (1) COGNITIVE domain (Option B) — the domain of MENTAL SKILLS and intellectual processes: knowledge (factual recall), comprehension, application, analysis, synthesis, and evaluation. It directly covers the acquisition of facts, concepts, and principles, which is exactly what the stem describes. (2) AFFECTIVE domain (Option A) — concerned with FEELINGS, attitudes, values, emotions, and motivation (e.g., developing compassion, professional ethics). (3) PSYCHOMOTOR domain (Option D) — concerned with PHYSICAL/MOTOR skills (e.g., performing venipuncture, wound dressing, CPR). "Evaluative" (Option C) is NOT a standard Bloom''s domain — evaluation is the HIGHEST LEVEL within the cognitive domain (critical appraisal and judgment), not a separate domain itself. In nursing education: lectures and textbooks build COGNITIVE knowledge; reflective practice and values clarification build AFFECTIVE learning; clinical skills labs build PSYCHOMOTOR competence. (Nursing Management & Leadership — Nursing Education; Bloom''s Taxonomy 1956.)'
WHERE id = '02745084-0c4d-44ee-8eab-d8546ab39100';

-- Q14: Apgar 0/1 — explain notation then justify answer
UPDATE questions
SET rationale = 'The notation "0/1" means an Apgar score of ZERO TO ONE (out of a maximum of 10) — indicating a critically, severely depressed neonate with virtually no assessable signs of life. The Apgar score evaluates 5 criteria (Heart rate, Respiratory effort, Muscle tone, Reflex irritability, Colour), each scored 0, 1, or 2. A total of 0/1 means almost every category scores 0. GENERALISED PALLOR — "body and extremities are pale" (Option D) — represents ABSENT PERFUSION throughout and scores 0 for colour, consistent with a near-absent or absent circulation. The other options are TRAPS: Minimal grimace (reflex irritability) = 1 point — present but weak. HR < 100 (heart rate) = 1 point — heart is beating, though slowly. Gasping respiration (respiratory effort) = 1 point — some breathing effort exists, though abnormal. Any of Options A, B, or C would contribute to a score HIGHER than 1. Only complete pallor (D) is consistent with an Apgar of 0/1. Immediate neonatal resuscitation is mandatory. (Kenya Basic Paediatric Protocols — Apgar scoring.)'
WHERE id = '39e44850-89fb-4c25-8193-1b17a6708846';

-- Q15: Communicable disease control at individual/village level
UPDATE questions
SET rationale = 'Communicable disease control operates at three levels. At the INDIVIDUAL AND VILLAGE level, actions are those that EACH PERSON or HOUSEHOLD can directly take: (1) Completing one''s own IMMUNISATION schedule — personal protection and contribution to herd immunity; (2) PROTECTING LOCAL WATER SOURCES — covering springs, lining wells, using safe water containers to prevent faecal-oral transmission. Option C correctly combines both individual/village-level actions. Why not the others? Option A ("increase immunisation coverage, environmental manipulation") describes HEALTH-SYSTEM level interventions — immunisation coverage campaigns are organised at district or national level, not by individuals. Option B ("water protection and purification alone") omits immunisation — incomplete for this question level. Option D ("participate in vector and reservoir control") involves organised community/district operations (spraying, rodent control, clearing stagnant water over large areas) — these require coordinated effort beyond individual households. (MOH Kenya Community Health Strategy; Kenya KEPH Framework; Park''s Preventive & Social Medicine.)'
WHERE id = '310c5a89-38d4-4921-860f-7c4513370797';

-- Q16: Primary purpose of epidemiologic investigation
UPDATE questions
SET rationale = 'The PRIMARY purpose of an epidemiologic investigation (field outbreak investigation) is to DELINEATE THE AETIOLOGY of the epidemic (Option C) — identifying the causative agent, source/reservoir, mode of transmission, incubation period, and risk factors through systematic case-finding, analytical studies (case-control or cohort), and laboratory confirmation. Once aetiology is established, targeted control measures can be applied. The other options describe SECONDARY steps or tools that serve the primary aim: Identifying at-risk groups (A) and mapping geographical distribution of cases (B) are analytical steps used to trace the source and test hypotheses — they are part of the investigation process, not its purpose. Encouraging community cooperation (D) is a facilitative strategy for conducting the investigation, not the purpose itself. The logical flow is: INVESTIGATE the AETIOLOGY first → then all other actions follow from that finding. (Park''s Textbook of Preventive & Social Medicine; WHO outbreak investigation field guidelines.)'
WHERE id = 'ea4c63bf-76d9-469f-8483-ba4fda4b8053';

-- Q23: Fetal circulation — comprehensive shunt explanation
UPDATE questions
SET rationale = 'The DUCTUS VENOSUS (Option C) is the fetal blood vessel that connects the UMBILICAL VEIN (carrying oxygenated blood from the placenta) directly to the INFERIOR VENA CAVA (IVC), allowing approximately 50% of oxygen-rich blood to BYPASS the fetal liver and reach the heart rapidly. This is the vessel that "joins the umbilical cord to the inferior vena cava." The other fetal shunts have different roles: DUCTUS ARTERIOSUS (Option A) connects the PULMONARY ARTERY to the AORTA — it diverts blood AWAY from the collapsed fetal lungs into systemic circulation; closes after birth (becomes ligamentum arteriosum). FORAMEN OVALE (Option B) is an opening in the INTERATRIAL SEPTUM allowing blood from the right atrium into the left atrium, bypassing the pulmonary circuit; closes after birth when lung pressure changes (becomes fossa ovalis). HYPOGASTRIC ARTERIES (Option D) carry DEOXYGENATED blood FROM the fetus BACK to the placenta via the umbilical cord — the reverse direction from what the stem describes. All three shunts (ductus venosus, ductus arteriosus, foramen ovale) close functionally at birth and anatomically within weeks to months. (Myles Textbook for Midwives — Fetal Circulation.)'
WHERE stem = 'The following structures in fetal circulation joins the umbilical cord to the inferior vena cava';

-- Q24: Fetal movement after extension — full mechanism of labour
UPDATE questions
SET rationale = 'The complete mechanism of normal labour proceeds in this sequence: (1) ENGAGEMENT → (2) DESCENT → (3) FLEXION (chin tucked to present smallest diameter) → (4) INTERNAL ROTATION (occiput rotates anteriorly to align with pubic arch) → (5) EXTENSION (head extends under symphysis pubis as it is born — crowning) → (6) RESTITUTION → (7) EXTERNAL ROTATION → (8) EXPULSION of shoulders and body. Therefore, the movement occurring DIRECTLY AFTER extension is RESTITUTION (Option D). Restitution = after the head is born, it rotates BACK (untwists) to realign with the shoulders, which are still in the oblique diameter of the pelvis. Why not the others? Option A (Flexion) occurs much EARLIER in the sequence, before internal rotation. Option B (Internal rotation of the head) also occurs BEFORE extension. Option C (Extension of the head) IS the movement described in the stem itself — we want what comes AFTER it, not the movement itself. (Myles Textbook for Midwives — Mechanism of Normal Labour.)'
WHERE id = 'f510da15-a17c-4285-b3f6-7f2e56c5bf54';

-- Q25: Learning process — clarify each option's error
UPDATE questions
SET rationale = 'TRANSFER of learning (Option C) is correct — it refers to applying knowledge or skills learned in one context to NEW practical situations (e.g., using classroom pharmacology knowledge when administering a drug at the bedside). The other three options contain INCORRECT definitions: Option A states "Perception = sending information to the brain via special senses" — WRONG. Perception is the brain''s INTERPRETATION and meaningful processing of sensory input (not merely transmitting it). Option B states "Acquisition = storing information in memory centres" — WRONG. Acquisition is the initial TAKING IN or LEARNING of new information. Storing is done by RETENTION, a separate phase. Option D states "Retention = information being recorded in the brain" — partially correct but imprecise; retention is the MAINTENANCE of learned information in memory OVER TIME so it can be retrieved later. Option C (Transfer) is the only correctly and completely defined statement among all four choices. (Learning process theory; nursing education texts — NCK BScN curriculum.)'
WHERE id = 'acdb1664-2611-4802-a759-d67eabc3daa9';

-- Q26: Papule — define first, then compare all lesions
UPDATE questions
SET rationale = 'A PAPULE (Option D) is a raised, solid, well-circumscribed skin lesion measuring LESS than 1 centimetre in diameter — exactly as described in the stem. Examples: insect bite reactions, molluscum contagiosum, lichen planus, flat warts. Comparing the other lesion types: PUSTULE (Option A) is raised and contains PUS (cloudy/purulent fluid) — e.g., acne vulgaris, impetigo; it is NOT solid. NODULE (Option B) is also a raised solid lesion but is LARGER than 1 cm in diameter (e.g., lipoma, erythema nodosum, rheumatoid nodule) — it exceeds the size in the stem. VESICLE (Option C) is a raised, FLUID-FILLED blister less than 1 cm (e.g., chickenpox lesions, herpes simplex, contact dermatitis blisters) — it is fluid-filled, not solid. Memory aid: Papule = PALPABLE, solid, small; Vesicle = fluid-VESSEL (fluid-filled); Pustule = PUS-filled; Nodule = kNot (larger, deeper solid lump). Precise dermatology terminology is essential for accurate clinical documentation and referral. (Brunner & Suddarth''s Medical-Surgical Nursing — Skin Assessment.)'
WHERE id = '820713e1-db5b-482a-a188-86959263ad83';

-- Q29: Chorioamnionitis — clarify why D is best single answer
UPDATE questions
SET rationale = 'Clinical chorioamnionitis (intra-amniotic infection) is diagnosed when the following signs are present: maternal FEVER (>38°C), maternal TACHYCARDIA (>100 bpm), FETAL TACHYCARDIA (>160 bpm), UTERINE TENDERNESS on palpation, and FOUL-SMELLING amniotic fluid or vaginal discharge. Evaluating each option: Option D — maternal pulse of 110 bpm = TACHYCARDIA (>100 bpm) — IS a definitive clinical feature of chorioamnionitis. ✓ Option C — maternal temperature of 37.4°C — is BELOW the fever threshold (>38°C required for the diagnosis); 37.4°C is NORMAL. ✗ Option B — NON-TENDER uterus — is the OPPOSITE of the expected finding; UTERINE TENDERNESS (not non-tenderness) is the sign. ✗ Option A — foul-smelling vaginal discharge — IS also a clinical feature, but as a single "best answer," maternal tachycardia (D) is the most objectively measurable and consistently listed systemic indicator; foul discharge alone without systemic signs could suggest other vaginal infections. The examiner intends D as the single clearest answer. (Myles Textbook for Midwives; MOH Kenya BEmONC Guidelines.)'
WHERE id = 'e230efc8-c8db-4abd-b835-957b8bbd4e6d';

-- Q30: Mechanical factors in labour — define and compare
UPDATE questions
SET rationale = 'MECHANICAL FACTORS in labour (Myles Textbook) are the PHYSICAL FORCES that act on the cervix and fetal presenting part to assist cervical dilatation and fetal descent — distinct from myometrial (muscular contraction) factors. The three true mechanical factors are: (1) FORMATION OF FOREWATERS — intact membranes bulge through the cervical os like a fluid wedge, applying dilating hydraulic pressure; (2) GENERAL FLUID PRESSURE — amniotic fluid transmits uterine contractions uniformly throughout the uterine cavity, pressing on all surfaces equally; (3) RUPTURE OF MEMBRANES — when membranes rupture, the presenting part directly contacts and presses on the cervix, accelerating dilatation. Option B correctly lists all three. Why not the others? Options A and D both include "formation of a retraction ring" — a RETRACTION (Bandl''s) RING is a pathological sign of OBSTRUCTED labour, an emergency, NOT a normal mechanical factor. Option C substitutes "polarity" and "contraction" — these are PHYSIOLOGICAL properties of the myometrium (uterine muscle), not mechanical factors acting on the cervix and fetus. (Myles Textbook for Midwives — Physiology and Management of Normal Labour.)'
WHERE id = '4514c79a-ada7-4556-a0e9-f1276c07b0f5';

-- Q31: Nurse educator role in health promotion
UPDATE questions
SET rationale = 'When DEVELOPING HEALTH PROMOTION PLANS WITH CLIENTS, the nurse educator takes the role of a RESOURCE PERSON (Option C) — providing information, evidence, educational materials, and tools that clients use to make their OWN INFORMED decisions, consistent with the Ottawa Charter principle of "enabling" communities to take control of their health. This role maximises client autonomy and participatory planning. Comparing the other roles: COUNSELLOR (Option B) — focuses on therapeutic relationships and psychological/emotional support; more appropriate in individual therapy or bereavement counselling, not primarily in collaborative health promotion plan development. ADVISOR (Option D) — prescribes or directs what clients SHOULD do; this directive approach undermines autonomy and conflicts with the health promotion philosophy which emphasises self-determination. PROMOTER (Option A) — advocates for conditions, policies, or environments that enable health; this is a systems/societal advocacy role, not the specific role when working one-on-one or with groups to develop plans. (Ottawa Charter for Health Promotion; Park''s Preventive & Social Medicine; community health nursing texts.)'
WHERE id = '5efaf630-28dd-4c1f-92ab-6de74e5e757d';

-- Q33: Abortive poliomyelitis — distinguish all four clinical forms
UPDATE questions
SET rationale = 'Poliomyelitis has FOUR clinical presentations: (1) INAPPARENT/SUBCLINICAL (90–95% of cases) — no symptoms; virus shed in stool. (2) ABORTIVE polio (4–8%) — MINOR ILLNESS only: fever, SORE THROAT (B), malaise, headache, nausea, vomiting — the poliovirus remains in the bloodstream (viraemia) but does NOT penetrate the CNS. Full recovery in 2–5 days. (3) NON-PARALYTIC/MENINGEAL polio — same as abortive PLUS CNS meningeal involvement: STIFF NECK (C), BACK PAIN (D), and MUSCLE SPASM (A) — aseptic meningitis without paralysis. (4) PARALYTIC polio (<1%) — flaccid (lower motor neuron) paralysis, the most feared and disabling form. KEY DISTINCTION: ABORTIVE polio has ABSOLUTELY NO CNS SIGNS. Stiff neck (C), muscle spasm (A), and back pain (D) all signal CNS/meningeal involvement — making them features of NON-PARALYTIC or paralytic polio, NOT abortive. Sore throat (B) is the hallmark of abortive polio — the virus is confined to the oropharynx and GI tract at this stage. (MOH Kenya KEPI/EPI guidelines; Park''s Textbook of Preventive & Social Medicine.)'
WHERE id = '6ca0bea4-1382-4a99-b029-06b8b29f639c';

-- Q34: Macular degeneration — anchor to stem definition first
UPDATE questions
SET rationale = 'MACULAR DEGENERATION (Option C) is the progressive deterioration of the MACULA — the small central area of the retina responsible for sharp, detailed central vision — causing loss of CENTRAL vision. This exactly matches the stem description. Patients struggle to read, recognise faces, and perform fine tasks, while PERIPHERAL vision is preserved. Comparing the distractors: CATARACT (Option A) — clouding of the LENS (not the retina/macula), causing generalised blurred, dim, or hazy vision across the entire visual field — not specifically central vision loss. GLAUCOMA (Option B) — raised intraocular pressure damages the OPTIC NERVE, causing progressive PERIPHERAL ("tunnel") vision loss first; central vision is preserved until very late disease — the opposite pattern. RETINOPATHY (Option D) — damage to retinal blood vessels (as in diabetic or hypertensive retinopathy) causes blurred or distorted vision, but is not defined by macula deterioration specifically. Clinically: wet AMD is treated with intravitreal anti-VEGF injections; dry AMD is managed with AREDS2 supplements. Nurses teach Amsler grid self-monitoring for early detection of central vision distortion. (Brunner & Suddarth — Ophthalmology.)'
WHERE id = '38c1d71a-840c-47a3-8a55-9962a835db88';

-- Q35: Presumptive signs of pregnancy — classify all three categories
UPDATE questions
SET rationale = 'Pregnancy signs are classified into three categories: PRESUMPTIVE signs — subjective symptoms noticed BY THE WOMAN, least diagnostic (other causes possible): amenorrhoea (A), nausea and morning sickness (D), breast tenderness and enlargement (B), urinary frequency, quickening, Chadwick''s sign (blue discolouration of cervix). PROBABLE signs — more objective, observed BY THE EXAMINER but not conclusive: Hegar''s sign, Goodell''s sign, ballottement, Braxton Hicks contractions, positive urine/serum hCG test, enlarged uterus. POSITIVE (CERTAIN) signs — unequivocal evidence of a living fetus, directly attributed to the fetus and observed by the examiner: FETAL HEART SOUNDS auscultated by the examiner (C), fetal movements felt by the examiner, and ultrasound visualisation of the fetus. FETAL HEART RATE (Option C) is a POSITIVE sign — it cannot exist without a living fetus, making it diagnostic and definitive. The question asks which is NOT a presumptive sign — the answer is C, because FHR is a POSITIVE sign, not presumptive. Options A, B, and D are all classic presumptive signs. (Myles Textbook for Midwives — Diagnosis of Pregnancy.)'
WHERE id = '61679a94-4833-42a9-a339-f6a1b2556586';

-- Q22: Bishop Score — explain the full scoring system and clinical use
UPDATE questions
SET rationale = 'The BISHOP SCORE is a standardised pre-labour cervical assessment used to predict the success of labour induction (developed by Dr E.H. Bishop, 1964). It scores FIVE cervical/pelvic parameters: (1) Cervical DILATATION (0–3 pts), (2) Cervical LENGTH/effacement (0–3 pts), (3) Fetal STATION (0–3 pts), (4) Cervical CONSISTENCY (0–2 pts), (5) Cervical POSITION (0–2 pts). Maximum score = 13. Clinical interpretation: ≤5 = UNFAVOURABLE cervix (ripening needed); ≥8 = FAVOURABLE cervix (induction likely to succeed). Scoring Thembi''s findings step by step: Dilatation 1–2 cm = 1 pt | Cervical length 2 cm (long, not effaced) = 1 pt | Station –3 (presenting part high, not engaged) = 0 pts | Consistency firm = 0 pts | Position mid/central = 1 pt. TOTAL = 1+1+0+0+1 = 3 (Option B). A score of 3 indicates an UNFAVOURABLE cervix — induction carries a high risk of failure and prolonged labour. The obstetrician would require cervical ripening (prostaglandins or mechanical methods) before induction, AND would likely decline Thembi''s non-medical induction request. (Myles Textbook for Midwives — Induction of Labour; Bishop EP, Am J Obstet Gynecol, 1964.)'
WHERE id = '008b27ee-0c89-47e6-a109-e7ff568545b8';

-- Q42: IgG — lead with the answer, then explain each immunoglobulin
UPDATE questions
SET rationale = 'IMMUNOGLOBULIN G (IgG) is the most abundant serum immunoglobulin (75–80% of total) and is the principal antibody of the SECONDARY (MEMORY) IMMUNE RESPONSE (Option A) — produced in large quantities on RE-EXPOSURE to an antigen, providing a rapid, strong, and long-lasting immune response. IgG also uniquely CROSSES THE PLACENTA to provide passive immunity to the neonate for the first 3–6 months of life. Comparing the other immunoglobulins: Option B (produced on first antigen encounter) = describes IgM — IgM is the FIRST antibody produced during the PRIMARY immune response; it is large (pentamer structure), short-lived, and does NOT cross the placenta. Option C (defends mucosal membranes) = describes IgA — IgA is the SECRETORY immunoglobulin found in saliva, tears, breast milk, and respiratory and GI tract secretions; it is the first line of defence at mucosal surfaces. Option D (mediates immediate reactions) = describes IgE — IgE binds to mast cells and basophils; cross-linking by antigen triggers degranulation and mediates TYPE I (IMMEDIATE) HYPERSENSITIVITY reactions including allergic rhinitis, asthma, and anaphylaxis. (Microbiology & Immunology — NCK BScN curriculum; Brunner & Suddarth.)'
WHERE id = '17695158-9658-4ddf-abf2-1088d4c20e10';

-- ────────────────────────────────────────────────────────────
-- SECTION 7: RESOLVE / DISMISS FLAGS IN flagged_questions TABLE
-- ────────────────────────────────────────────────────────────

-- Mark valid flags where corrections have been made → 'resolved'
UPDATE flagged_questions
SET status = 'resolved'
WHERE id IN (
    '88c2efa7-3850-4247-ad1d-6cac34b98058', -- vitreous humour rationale fixed
    '54428f0a-6f70-4d2f-9eac-10b5712a9cb7', -- population pyramid unit/topic fixed
    '1a5fe1b3-aae6-4dde-af4c-ce5d8e9d5f0e', -- purpose of assessment unit/topic fixed
    '99a1f5af-a1e7-4ea9-87fb-df68c7ab657f', -- trophoblast stem typo fixed
    'cf9f7477-c4fd-4fb3-8d86-43b2e7c46762', -- valium unit fixed
    'ebfb823d-9165-4ace-8fae-ceb2a4516a54', -- bell''s palsy rationale improved
    'a1a00a82-0209-40b1-834e-ad5e7c31066f', -- post-MI rationale improved
    '3284b191-45b4-4dee-b9a8-b9a7922d4940', -- ulcerative colitis unit/topic fixed
    '485b894c-4761-41f5-af14-91ace93c8b3c', -- HIV rationale improved
    '45df8bbf-044b-4681-8304-9aeeadb678f2', -- maslow rationale improved
    'ac22a4a5-ff2c-4c10-bd1e-716cd8f20201', -- cognitive domain rationale improved
    'd610183f-9133-4a4d-b9a2-4313c62cd85d', -- apgar 0/1 rationale improved
    'd57484ba-f982-4d18-bf28-aeeaa7fc701c', -- communicable disease control rationale improved
    'f70ba4bb-5db1-4373-b14f-2290d2834cc3', -- epidemiologic investigation rationale improved
    '1a153f96-518e-4953-9a4a-c83dfff650ce', -- enterobiasis topic fixed
    '130077f8-a06d-4351-88c6-7dc69fed0561', -- integration of services ANSWER CORRECTED
    '4e7b1f50-b541-4f4b-91ee-ac5093a96d14', -- formative assessment unit/topic fixed
    'b921f306-33d2-4117-a097-6fb4b6283710', -- garbled stem fixed
    '0a5d39fd-0dd5-4062-94e9-c38ae185cd71', -- bishop score rationale elaborated
    '199b0b54-1716-4925-bd51-f97bb569fb22', -- fetal circulation unit/topic + rationale fixed
    'ac054517-abb2-47f6-80cb-9bfdc389bd62', -- fetal movement rationale improved
    '498aba3c-86fc-48c0-8ef2-fbc9ebf61e4d', -- learning process rationale improved
    'd27de737-ea61-4dc4-933b-fc874e209b36', -- papule rationale improved
    '6f185d94-a0d0-4e92-8fa5-9c296546a5a9', -- ectoderm unit/topic fixed
    '380b4531-c6cd-491e-ba40-3d957c622af0', -- chorioamnionitis rationale improved
    'a5a86280-5287-412c-950c-4663539f2f3a', -- mechanical factors rationale improved
    '6293127c-2352-402e-8788-64cc2710158b', -- nurse educator role rationale improved
    '5d61f6ec-4b79-4a1d-8089-18a1b25e8c49', -- abortive polio rationale improved
    'ac6a5148-cf03-4fb4-ba19-687b188aa1ea', -- macular degeneration rationale improved
    '713c83b6-b845-4429-8a98-46706dd6f532', -- presumptive signs rationale improved
    '1303b779-5121-4d68-8c32-086910ebab51', -- apgar 5min question redesigned
    'a0313c1e-303f-4892-9bb0-5f20994a064f', -- scale absolute zero unit/topic fixed
    '4526f266-7851-46e2-b2ad-8f409fd15da2', -- footling breech typo fixed
    'bf326440-4afd-4fa9-b990-a7101549620e', -- IgG rationale improved
    'f8f12042-037f-4f09-a017-995cc55b4595'  -- acyclovir duplicate (noted; admin to verify)
);

-- Mark invalid flags (questions were clinically correct) → 'dismissed'
UPDATE flagged_questions
SET status = 'dismissed'
WHERE id IN (
    'bdf1b577-0cad-4289-88a4-faf77e14fe4e', -- angioedema (answer correct)
    '9f9c48b9-0924-4473-b378-ec0d634928f2', -- angioedema (duplicate flag, answer correct)
    '84c30b49-7423-4e72-ba32-39213b8b233d', -- fontanelle (answer & rationale correct)
    '01efa279-738e-4312-8a2c-1b29444cf043', -- postpartum temp (already in Midwifery)
    '3a10eda4-32a4-4f4e-ba1b-b5a3370bd1d7', -- ventilator alarm (answer correct)
    'cc7c5c83-6932-4909-ba94-dd4d03515517', -- CVP (answer correct, no alternative given)
    '5a0ccd0a-68bc-4b61-8fe2-30b634601d6a'  -- diabetic nutrition (answer correct)
);

-- ────────────────────────────────────────────────────────────
-- DUPLICATE CHECK: Acyclovir question (flag: f8f12042)
-- Student reported "Repeat". Run this to verify before deleting:
-- SELECT id, stem, cadre FROM questions
-- WHERE stem = 'The mode of action of acyclovir as a drug of choice for herpes virus is:'
-- ORDER BY cadre;
-- If a duplicate stem+cadre exists, keep the one with the better
-- rationale and delete the other.
-- ────────────────────────────────────────────────────────────
