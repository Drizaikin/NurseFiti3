-- =============================================================================
-- SEED: NCK MCQ Compilation with Answers & Rationales
-- Batch 3: KRCHN — Paper I (Medical-Surgical + Midwifery + Pharmacology)
-- =============================================================================
-- Source: NCK-MCQ-Compilation-Answers-Rationales.docx
-- Cadre: KRCHN
-- Paper: 'Paper I' (Medical-Surgical + Midwifery + Pharmacology)
-- exam_year: Per year stated in document header
-- Status: approved | contributor_id: NULL
-- Conflict: ON CONFLICT (stem, cadre) DO NOTHING
-- Rationale audit: verified against Brunner & Suddarth, MOH Kenya, Myles, IMNCI
-- =============================================================================
-- NOTE ON KRCHN PHARMACOLOGY: The 2018 and 2019 pharmacology questions are
-- sourced from KMTC/KRCHN-B Pharmacology Paper III/V. For KRCHN these belong in
-- Paper I (Medical-Surgical + Pharmacology integration per nck-exam-system.md).
-- Most pharmacology stems are identical to BScN above; KRCHN versions are
-- seeded here as they serve KRCHN's protocol-application competency level.
-- =============================================================================

-- ─── YEAR 2008 — KRCHN Paper I (Medical-Surgical) ───────────────────────────

-- Q1 [2008] — Finger clubbing pulmonary causes
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Respiratory Disorders',
  'Pulmonary disorders that cause finger-clubbing include:',
  'Pneumonia, asthma, emphysema',
  'Lung cancer, lung abscess, bronchiectasis',
  'Cystic fibrosis, pulmonary hypertension, pneumothorax',
  'Pleural effusion, beryllium disease, chronic atelectasis',
  'B',
  'Finger clubbing is associated with chronic hypoxaemia and suppurative/neoplastic lung disease. The classic pulmonary causes include bronchiectasis, lung abscess, bronchogenic carcinoma (lung cancer), empyema, pulmonary fibrosis and cystic fibrosis. Simple pneumonia, asthma, emphysema, uncomplicated pleural effusion and pneumothorax do NOT typically produce clubbing. Beryllium disease (berylliosis) causes restrictive disease but not classically clubbing. Ref: Brunner & Suddarth''s Medical-Surgical Nursing; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2008] — Phaeochromocytoma clinical features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
  'Clinical features of phaeochromocytoma include:',
  'Muscle weakness, thin skin, raised blood pressure',
  'Tingling, muscle spasm, periods of temporary paralysis',
  'Excessive facial hair, acne, weight loss',
  'Headache, blurring of vision, diaphoresis',
  'D',
  'Phaeochromocytoma is a catecholamine-secreting tumour (usually of the adrenal medulla) that causes paroxysmal or sustained hypertension with the classic triad of: pounding headache (from catecholamine-induced hypertension), palpitations and profuse diaphoresis (sweating). Blurred vision occurs due to hypertensive retinopathy. The mnemonic is the "5 H''s": Headache, Hypertension, Hyperhydrosis (sweating), Heart pounding, Hyperglycaemia. Option A describes Cushing''s; option B describes hypocalcaemia; option C describes excess androgens. Ref: Brunner & Suddarth; NCK curriculum.',
  'hard', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2008] — Pemphigus management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Dermatological Disorders',
  'In the management of pemphigus:',
  'Corticosteroids are administered in high doses until remission is apparent',
  'Dapsone is given after screening the patient for glucose-6-phosphate dehydrogenase',
  'Systemic prednisone is continued for months in alternate-day doses',
  'Fluid and electrolyte balance must be maintained to counteract their loss from the skin',
  'A',
  'Pemphigus vulgaris is a life-threatening autoimmune blistering disorder. The mainstay of treatment is high-dose systemic corticosteroids (e.g. prednisolone 1–2 mg/kg/day) given until the disease is controlled and new blisters cease to form (remission), after which the dose is slowly tapered. Maintaining fluid/electrolyte and protein balance is an important nursing measure (option D), but the defining first-line medical intervention is high-dose corticosteroids. Dapsone is used for dermatitis herpetiformis, not pemphigus. Ref: Brunner & Suddarth — skin disorders; NCK curriculum.',
  'hard', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2008] — Peptic ulcer surgical indications
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
  'Surgical management of peptic ulcers is indicated in:',
  'Severe Helicobacter pylori infection, H2-receptor antagonist resistance',
  'Failure to heal after 12-16 weeks of treatment, Zollinger-Ellison syndrome',
  'NSAID-induced ulcers, stress ulcers',
  'Cushing''s ulcers, Curling ulcers',
  'B',
  'Surgery for peptic ulcer disease is reserved for: intractable disease (failure to heal despite adequate medical therapy, typically after 12–16 weeks); Zollinger-Ellison syndrome (gastrinoma requiring surgical resection if localised); and complications (perforation, uncontrolled haemorrhage, gastric outlet obstruction). H. pylori, NSAID-induced, stress, Cushing''s and Curling''s ulcers are managed medically first. With effective H. pylori eradication regimens and PPIs, surgery is now rarely needed. Ref: Brunner & Suddarth — gastrointestinal disorders; NCK curriculum.',
  'hard', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2025 — KRCHN Paper I ────────────────────────────────────────────────

-- Q1 [2025] — Post-gastrectomy position
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Post-Operative Nursing Care',
  'The position of choice for a patient who has had a gastrectomy is:',
  'Sims',
  'Supine',
  'Prone',
  'Semi-Fowler''s',
  'D',
  'Semi-Fowler''s position (head of bed elevated 30–45°) is the standard post-operative position after abdominal surgery such as gastrectomy. It reduces abdominal wall tension and promotes respiratory expansion (prevents atelectasis), facilitates gastric drainage, improves comfort and reduces oesophageal reflux risk after gastric resection. Supine (flat) is avoided post-abdominal surgery as it increases abdominal pain and respiratory compromise. Sims and prone positions are inappropriate post-gastrectomy. Ref: Brunner & Suddarth — post-operative care; NCK April 2025 recall.',
  'easy', 'approved', 2025, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2025] — Spinal injury/head injury: triage category
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Emergency and Trauma Nursing',
  'A child is brought after falling down the stairs, complaining of headache and is now unable to move his feet. Using triage colour coding, this client is categorised as:',
  'Black',
  'Green',
  'Yellow',
  'Red',
  'D',
  'This child has a HEAD INJURY (headache) combined with loss of lower-limb motor function — indicating a potential cervical/thoracic spinal cord injury. This is a life-threatening and limb-threatening emergency requiring IMMEDIATE assessment and intervention. Triage RED = immediate (life-threatening, requires immediate intervention). Green = minor/walking wounded. Yellow = urgent but can wait (stable). Black = deceased or expected to die/non-survivable. Per MOH Kenya ETAT+ and mass casualty triage (START/SALT), neurological compromise with impending cord injury is RED. Ref: MOH Kenya Emergency Triage Assessment and Treatment Plus (ETAT+); NCK April 2025 recall.',
  'medium', 'approved', 2025, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2006 — KRCHN Paper I (Midwifery / Obstetrics / Child Health) ────────

-- Q1 [2006] — Emergency caesarean indication: cord prolapse
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Obstetric Emergencies',
  'The condition for which a nurse prepares a woman for emergency caesarean delivery is:',
  'Prolapsed cord',
  'Twin pregnancy',
  'Meconium-stained amniotic fluid',
  'A non-reactive non-stress test',
  'A',
  'Umbilical cord prolapse is an obstetric emergency: the presenting part compresses the prolapsed cord, cutting off fetal oxygen supply, causing fetal hypoxia/bradycardia. An emergency caesarean section is indicated immediately if vaginal delivery is not imminent. Placing the woman in knee-chest position relieves cord compression while preparing for theatre. Twin pregnancy, meconium liquor and a non-reactive NST require close monitoring and further assessment, but are not automatic indications for immediate emergency caesarean. Ref: Myles Textbook for Midwives (African edition); MOH Kenya BEmONC guidelines.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2006] — Neural tube defect screening
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Antenatal Care',
  'To screen for the presence of neural tube defects in the fetus, the test that would be performed on a pregnant woman is:',
  'Biophysical profile',
  'Amniocentesis',
  'Serum alpha-fetoprotein',
  'TORCH titres',
  'C',
  'Maternal serum alpha-fetoprotein (MSAFP) is a glycoprotein synthesised by the fetal yolk sac and liver; it leaks through open neural tube defects (anencephaly, open spina bifida) raising MSAFP levels, making it the standard non-invasive screening test for NTDs. Amniocentesis is a diagnostic/confirmatory invasive procedure (measures amniotic fluid AFP). Biophysical profile assesses fetal wellbeing (movement, tone, breathing, amniotic fluid). TORCH titres screen for congenital infections. Ref: Myles Textbook for Midwives; MOH Kenya ANC protocols.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2006] — Normal newborn examination finding
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Newborn Care',
  'During first examination of a normal newborn baby, a nurse would expect to identify:',
  'Apical pulse rate of 90 beats per minute',
  'Hands and feet that have a bluish colour',
  'Eye discharge that is yellow and watery',
  'Umbilical stump that has two veins and one artery',
  'B',
  'Acrocyanosis (bluish discolouration of the hands and feet) is a normal finding in the newborn during the first 24–48 hours of life, caused by sluggish peripheral circulation and vascular instability; it resolves spontaneously. A normal apical pulse is 120–160 bpm (90 bpm indicates bradycardia). Yellow watery eye discharge indicates ophthalmia neonatorum (infection). A normal cord has TWO arteries and ONE vein (not two veins and one artery; a single umbilical artery is abnormal and associated with renal anomalies). Ref: Myles Textbook for Midwives; MOH Kenya Newborn Care guidelines.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2006] — Shoulder dystocia: first management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Obstetric Emergencies',
  'For a woman who is in labour and experiencing slight shoulder dystocia the nurse would:',
  'Place her in knee-chest position',
  'Apply fundal pressure to the suprapubic area',
  'Prepare for assisted forceps delivery',
  'Obtain an order for oxytocin infusion',
  'A',
  'The first-line manoeuvre for shoulder dystocia is McRoberts'' manoeuvre — extreme hyperflexion of the maternal thighs onto the abdomen (which opens the pelvic inlet and rotates the pubic symphysis superiorly). The knee-chest/exaggerated lithotomy position combined with SUPRAPUBIC (not fundal) pressure is the correct first response. Fundal (uterine) pressure is absolutely contraindicated in shoulder dystocia as it further impacts the anterior shoulder and can cause uterine rupture/fetal injury. Forceps and oxytocin do not relieve the mechanical obstruction. Ref: Myles Textbook for Midwives; MOH Kenya BEmONC training.',
  'hard', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2006] — Transitional phase labour: husband behaviour requiring intervention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Labour and Delivery',
  'A labouring woman''s husband assists her during the transitional phase of labour. The behaviour that, if exhibited by the husband, would require intervention by a nurse is:',
  'Offers the woman a bed pan when she needs to have a bowel movement',
  'Gives ice-chips to the woman when she says her mouth is dry',
  'Provides effleurage when the woman complains of intense abdominal pain',
  'Encourages the woman to fix her gaze on him when she experiences a contraction',
  'A',
  'During the transitional phase (8–10 cm dilatation), an urge to defecate almost always signals descent of the presenting part and imminent second stage. Offering a bedpan at this point could result in delivery outside the delivery bed, which is unsafe. The nurse must intervene to assess cervical dilatation and prepare for delivery. Ice chips for dry mouth, effleurage for pain relief, and focal point concentration are all appropriate supportive comfort measures. Ref: Myles Textbook for Midwives; NCK curriculum.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2006] — Recognising fertile time: cervical mucus
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Family Planning',
  'To help a woman recognise the best time for conceiving, a nurse would instruct the woman to monitor for:',
  'Drop in body temperature lasting several days',
  'Increase in the amount of cervical mucus that is clear and stretchy',
  'Abdominal bloating that occurs suddenly',
  'Breast tenderness accompanied by slight nipple discharge',
  'B',
  'Around ovulation, rising oestrogen levels cause cervical mucus to become copious, clear, slippery and highly elastic (spinnbarkeit — stretches > 5 cm without breaking) — the most fertile-type mucus. This is the cardinal fertility sign used in the Billings Ovulation Method. Basal body temperature RISES (by 0.2–0.5°C) after ovulation due to progesterone, not drops (a drop on the day of ovulation may occur but lasts < 24 hours). Bloating and breast tenderness are non-specific. Ref: MOH Kenya National Family Planning Guidelines; Myles.',
  'easy', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2006] — Apnoea of prematurity definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Newborn and Neonatal Care',
  'The sign that leads a nurse to suspect that a two-week-old infant who was born prematurely may be having apnoea is:',
  'Intermittent episodes of acrocyanosis for periods of 10 minutes',
  'Random episodes of breath-holding during periods of stress',
  'Transient episodes of mottling with environmental temperature changes',
  'A lapse of spontaneous breathing for 20 seconds',
  'D',
  'Apnoea of prematurity is defined as cessation of spontaneous breathing for 20 seconds or longer, OR a shorter pause (> 10 seconds) accompanied by significant bradycardia (< 100 bpm), oxygen desaturation (SpO2 < 80%) or cyanosis. This is a significant pathological finding requiring intervention (stimulation, caffeine, respiratory support). Acrocyanosis and mottling with temperature changes are normal vasomotor responses in newborns. Ref: MOH Kenya Basic Paediatric Protocols — neonatal care; Kenya IMNCI.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2006] — Fundal height at 20 weeks
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Antenatal Assessment',
  'When performing a physical assessment of a woman who is 20 weeks pregnant, a nurse would expect to palpate the uterine fundus at:',
  'Symphysis pubis',
  'Midway between symphysis pubis and umbilicus',
  'Umbilicus',
  'Midway between umbilicus and xyphoid process',
  'C',
  'Fundal height (Bartholomew''s rule): at 12 weeks the fundus reaches the symphysis pubis; at 16 weeks it is midway between symphysis and umbilicus; at 20–22 weeks it reaches the UMBILICUS; at 28 weeks it is midway between umbilicus and xiphisternum; at 36–38 weeks it reaches the xiphisternum. The fundal height in centimetres from week 20–36 approximately equals the gestational age in weeks (±2 cm). Ref: Myles Textbook for Midwives — abdominal examination in pregnancy; NCK curriculum.',
  'easy', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2006] — Morning sickness management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Minor Disorders of Pregnancy',
  'A woman complains of morning sickness during the first trimester of pregnancy. To alleviate the symptoms, she should:',
  'Consume a clear liquid diet',
  'Take prenatal vitamins with milk',
  'Eat foods that are low in protein',
  'Avoid exposure to noxious odours',
  'D',
  'Nausea and vomiting of early pregnancy is triggered by strong odours, hormonal changes and an empty stomach. Management includes: avoiding noxious/strong odours and other triggers (option D); taking small, frequent dry carbohydrate snacks (e.g. dry crackers before rising); eating before getting out of bed; avoiding fatty/spicy foods. A clear liquid diet is inadequate nutritionally. Iron-containing prenatal vitamins often worsen nausea and should be taken with food (not specifically milk). Low protein diet is contraindicated in pregnancy — protein intake should be maintained/increased. Ref: Myles Textbook for Midwives; MOH Kenya ANC guidelines.',
  'easy', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2006] — 8cm dilated primigravida: short rapid breaths
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Labour Management',
  'A primigravida who has had no antenatal care is admitted to the labour ward in active labour. Her cervix is eight centimetres dilated. She starts to push with a contraction. During her next contraction, the nurse should:',
  'Instruct the patient to take a deep breath, hold it and then bear down',
  'Instruct the patient to take short rapid breaths',
  'Help the patient to assume a semi-sitting position and hold her knees in a flexed position while bearing down',
  'Apply firm pressure on the patient''s lower back',
  'B',
  'The cervix is 8 cm dilated — the patient is in active first stage, NOT yet fully dilated. Premature pushing before full dilatation (10 cm) can cause cervical oedema, laceration and fatigue. The nurse should DISCOURAGE pushing by instructing the patient to pant (take short, rapid, shallow breaths) through contractions, which prevents bearing down by preventing the Valsalva manoeuvre. Active bearing down (options A and C) is appropriate only in the second stage. Ref: Myles Textbook for Midwives; NCK curriculum.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2006] — Pregnancy-induced hypertension diagnostic features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Complications of Pregnancy',
  'The midwife should suspect pregnancy-induced hypertension if, during a client''s assessment, she finds the following:',
  'Ankle oedema and proteinuria',
  'Glycosuria and proteinuria',
  'Proteinuria and hypertension',
  'Hypertension and hyporeflexia',
  'C',
  'Pre-eclampsia (pregnancy-induced hypertension with proteinuria) is defined by NEW-onset hypertension (BP ≥ 140/90 mmHg) PLUS significant proteinuria (≥ 0.3 g/24 h or ≥ 1+ on dipstick) after 20 weeks gestation. Dependent ankle oedema is common in normal pregnancy and non-specific. Glycosuria with proteinuria suggests gestational diabetes with superimposed renal involvement, not PIH. Pre-eclampsia characteristically causes HYPER-reflexia (brisk reflexes, clonus), not hyporeflexia. Ref: MOH Kenya Pre-eclampsia/Eclampsia guidelines; Myles Textbook for Midwives.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2006] — Puerperal mastitis before suppuration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Postnatal Complications',
  'The treatment of puerperal mastitis before suppuration occurs is:',
  'Antibiotics, breast support and ice application',
  'Antibiotics, breast support and heat application',
  'Antibiotics, aspiration and breast support',
  'Antibiotics, incision and drainage, breast support',
  'B',
  'In the inflammatory (cellulitic) stage of puerperal mastitis — before abscess formation — management includes: anti-staphylococcal antibiotics (e.g. cloxacillin or flucloxacillin 500 mg 6-hourly for 10–14 days); continued breastfeeding or effective breast emptying (prevents milk stasis); breast support; and WARM compresses (not ice — heat promotes milk flow and drainage by vasodilation). Ice application causes vasoconstriction and reduces milk flow, worsening engorgement. Incision and drainage (or aspiration) is reserved for an established abscess (suppuration). Ref: Myles Textbook for Midwives; MOH Kenya postnatal care.',
  'medium', 'approved', 2006, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2007 — KRCHN Paper I (Obstetrics/Midwifery) ─────────────────────────

-- Q19 [2007] — Varicose veins in pregnancy management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Minor Disorders of Pregnancy',
  'The best management of varicose veins during pregnancy is:',
  'Using supporting tights or crepe bandage, resting with feet elevated',
  'Avoiding standing for too long, wearing loose clothing',
  'Avoiding sitting for a long time, elevating feet when sleeping',
  'Wearing low-heeled shoes, elevating feet when sleeping',
  'A',
  'Varicose veins in pregnancy result from progesterone-mediated venous relaxation, increased blood volume and uterine compression of the inferior vena cava impairing venous return. Management is conservative and supportive: elastic compression stockings or a supportive crepe bandage aids venous return by providing external compression; resting with feet elevated uses gravity to promote venous drainage. This is the most complete and effective combination. Avoiding prolonged standing is also correct but less comprehensive as a standalone answer. Ref: Myles Textbook for Midwives — minor disorders of pregnancy.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q20 [2007] — Hypotonic uterine action management
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Labour Complications',
  'The management of hypotonic uterine action includes:',
  'Intravenous infusion of 10% dextrose',
  'Intravenous infusion of syntocinon in 5% dextrose',
  'Intravenous infusion of Buscopan 15 mg',
  'Intravenous infusion of syntocinon in normal saline',
  'D',
  'Hypotonic (inefficient/sluggish) uterine action in labour is corrected by augmentation with oxytocin (syntocinon) infusion. Current practice (per MOH Kenya and international guidelines) dilutes oxytocin in NORMAL SALINE (0.9% NaCl) or Ringer''s lactate, NOT in dextrose solutions. Dextrose with oxytocin carries the risk of hyponatraemia and water intoxication because oxytocin has antidiuretic hormone (ADH)-like activity. Buscopan (hyoscine butylbromide) is an antispasmodic, not a uterotonic. Ref: Myles Textbook for Midwives; MOH Kenya partograph and labour management guidelines; WHO.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q21 [2007] — Well-flexed head presenting diameters
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Anatomy for Midwifery',
  'When the fetal head is well flexed, the presenting diameters are:',
  'Sub-occipito-bregmatic, sub-occipito-frontal',
  'Sub-occipito-bregmatic, biparietal',
  'Biparietal, bitemporal',
  'Bitemporal, sub-occipito-bregmatic',
  'B',
  'In a well-flexed vertex presentation (the most common and favourable position), the engaging diameters are: sub-occipito-bregmatic (SOB) = 9.5 cm (smallest A-P diameter, from below the occiput to the bregma), and biparietal diameter (BPD) = 9.5 cm (widest transverse diameter, between parietal bones). The sub-occipito-frontal (10 cm) occurs with moderate deflexion. Bitemporal (8 cm) is the smallest transverse diameter. Ref: Myles Textbook for Midwives — fetal skull diameters; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q22 [2007] — Past obstetric history components
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Antenatal History Taking',
  'Past obstetric history includes: (i) Any abnormality during previous pregnancies, labour and puerperium (ii) Age at menarche (iii) History of twinning in the family (iv) Miscarriages and gestation when they occurred (v) Number of children with ages and birth weight',
  'i, ii, iii',
  'i, iii, v',
  'i, iv, v',
  'i, ii, iv',
  'C',
  'Past OBSTETRIC history covers a woman''s previous pregnancies and their outcomes: (i) any abnormalities in previous pregnancies, labours or the puerperium; (iv) miscarriages (spontaneous abortions) and the gestation at which they occurred; (v) number of living children, their ages and birth weights. Age at menarche (ii) belongs to menstrual history. Family history of twinning (iii) is family history, not personal obstetric history. Therefore the combination is i, iv, v. Ref: Myles Textbook for Midwives — antenatal history taking; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q23 [2007] — Myometrium layer preventing postpartum haemorrhage
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Anatomy for Midwifery',
  'The muscle layer involved in enmeshing bleeding vessels and preventing bleeding after the delivery of the placenta is:',
  'Inner circular layer',
  'Middle oblique layer',
  'Outer longitudinal layer',
  'Basal layer',
  'B',
  'The myometrium has three layers: outer longitudinal, middle oblique and inner circular. The MIDDLE (oblique) layer contains interlacing figure-of-eight muscle fibres that surround the spiral arteries of the placental bed. After placental delivery, uterine contraction and retraction causes these fibres to compress and occlude the vessels ("living ligatures"), preventing haemorrhage. This is why uterine atony (failure of contraction) is the leading cause of postpartum haemorrhage. Ref: Myles Textbook for Midwives — uterine anatomy and third stage of labour; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q24 [2007] — Blood pressure drop in second trimester
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Physiological Changes in Pregnancy',
  'During the 2nd trimester of pregnancy, the blood pressure falls due to:',
  'Effects of progesterone on the smooth muscles causing relaxation and dilatation of the arterial wall',
  'Effects of oestrogen on the smooth muscles causing relaxation and dilatation of the arterial wall',
  'Effects of progesterone on the smooth muscles causing relaxation',
  'Effects of oestrogen on the smooth muscles causing relaxation',
  'A',
  'During the second trimester (weeks 13–26) blood pressure falls, reaching its nadir around 20–24 weeks. This is caused by progesterone-mediated relaxation of vascular smooth muscle, causing peripheral vasodilation (reduced systemic vascular resistance/peripheral resistance) and dilatation of the arterial walls. This reduces afterload and blood pressure. Oestrogen does cause vascular smooth muscle relaxation but progesterone is the dominant mediator of this gestational BP reduction. Option A is the most complete and accurate answer. Ref: Myles Textbook for Midwives — cardiovascular changes in pregnancy.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q25 [2007] — Total weight gain: largest components
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Nutrition in Pregnancy',
  'At the end of pregnancy the total weight gain is expected to be approximately 12 kg, the largest components being:',
  'Fetus and blood volume',
  'Amniotic fluid and fats',
  'Fat and blood volume',
  'Fetus and fat',
  'D',
  'Of the approximate 11–12 kg total weight gained in a normal singleton pregnancy, the two largest individual components are: the fetus (~3.3–3.5 kg) and maternal fat stores (~3.0–3.5 kg). The remainder is distributed among the placenta (~0.6 kg), amniotic fluid (~0.8 kg), uterine enlargement (~0.9 kg), breast enlargement (~0.4 kg), increased blood volume (~1.2 kg) and extracellular fluid (~1.2 kg). Ref: Myles Textbook for Midwives — weight gain in pregnancy; WHO nutrition guidelines.',
  'easy', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q26 [2007] — Positive signs of pregnancy (EXCEPTION)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Diagnosis of Pregnancy',
  'The following are positive signs of pregnancy EXCEPT:',
  'Visualisation of the fetus by ultrasound',
  'Fetal heart sound at 20-24 weeks',
  'Presence of human chorionic gonadotrophin in blood or urine (positive pregnancy test)',
  'Fetal movement palpable from the 22nd week',
  'C',
  'Positive (certain/absolute) signs of pregnancy are those that confirm the existence of a live fetus: (1) visualisation of the fetus on ultrasound, (2) fetal heart sounds heard by the examiner with a Doppler/Pinard''s stethoscope, and (3) fetal movements felt by the examiner on palpation. A positive hCG pregnancy test (option C) is a PROBABLE sign, not a positive/certain sign — hCG can be elevated in molar pregnancy, choriocarcinoma and occasionally in non-pregnant states. It confirms the presence of trophoblastic tissue but NOT a viable fetus. Ref: Myles Textbook for Midwives — diagnosis of pregnancy; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q27 [2007] — Minor disorders progressing to major complications
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Minor Disorders of Pregnancy',
  'The minor disorders of pregnancy that may progress to major complications include:',
  'Constipation, heart burn',
  'Nausea and vomiting, constipation',
  'Pica, constipation',
  'Excessive salivation, nausea and vomiting',
  'D',
  'Nausea and vomiting of pregnancy (NVP), when severe, can progress to hyperemesis gravidarum — a serious complication characterised by dehydration, electrolyte imbalances, ketosis and significant weight loss, requiring hospitalisation and IV therapy. Excessive salivation (ptyalism/sialorrhoea) accompanies and exacerbates this picture, contributing to fluid and nutrient loss. Constipation and heartburn are uncomfortable but rarely progress to life-threatening complications if managed appropriately. Ref: Myles Textbook for Midwives — minor disorders and their complications; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2008 — KRCHN Paper I (Midwifery / Newborn / Child Health) ───────────

-- Q7 [2008] — Uterine muscle fibre increase in pregnancy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Anatomy for Midwifery',
  'During pregnancy the uterine muscle fibres increase:',
  '10 times in length, 5 times in thickness',
  '20 times in length, 10 times in thickness',
  '5 times in length, 10 times in thickness',
  '15 times in length, 10 times in thickness',
  'A',
  'Uterine enlargement in pregnancy is predominantly through hypertrophy (increase in size) of existing myometrial smooth muscle fibres, rather than hyperplasia (increase in number). Under oestrogen and progesterone stimulation, muscle fibres increase approximately 10-fold in length and 5-fold in width/thickness. This explains the non-gravid uterus weight of ~60 g growing to ~900–1000 g at term. Ref: Myles Textbook for Midwives — the uterus in pregnancy; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2008] — Ischial spines: narrowest pelvic diameter
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Pelvimetry and Pelvis',
  'The ischial spines are designated as an important landmark in labour and delivery because the distance between the spines is a measurement of the:',
  'Floor of the brim',
  'Outlet of the birth canal',
  'Widest pelvic diameter',
  'Narrowest pelvic diameter',
  'D',
  'The interspinous diameter (distance between the two ischial spines) measures approximately 10.5 cm and is the NARROWEST diameter of the pelvic cavity at the mid-pelvis. The ischial spines also serve as the reference point for engagement/station: station 0 = presenting part at the level of the ischial spines; negative stations above, positive stations below. The mid-pelvis is frequently the level at which obstructed labour occurs. Ref: Myles Textbook for Midwives — the female pelvis; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2008] — Hyperbilirubinaemia newborn treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Jaundice',
  'A newborn suffering from hyper-bilirubinaemia can be treated with:',
  'Antibiotics such as penicillin',
  'Salicylate',
  'Steroids',
  'Intravenous 5% dextrose',
  'D',
  'Management of neonatal hyperbilirubinaemia includes phototherapy (first-line) and exchange transfusion (severe cases). Adequate hydration is essential to maintain urine output and promote bilirubin excretion — IV 5% dextrose provides fluid and caloric support. Salicylates (aspirin) and sulphonamides are CONTRAINDICATED because they displace bilirubin from albumin-binding sites, increasing unbound (free) bilirubin that can cross the blood-brain barrier and cause kernicterus. Antibiotics are only indicated if sepsis is the cause. Steroids are not indicated for uncomplicated hyperbilirubinaemia. Ref: MOH Kenya Basic Paediatric Protocols — neonatal jaundice; Kenya IMNCI.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2008] — RDS neonatal characterisation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Respiratory Disorders',
  'Respiratory distress syndrome (of the newborn) is characterised by:',
  'Underdeveloped alveoli and deficient surfactant production',
  'Decreased pulmonary resistance and underdeveloped alveoli',
  'Uninflatable alveoli and overproduction of surfactant',
  'Poor alveolar ventilation and pulmonary vasodilatation',
  'A',
  'Neonatal Respiratory Distress Syndrome (RDS/Hyaline Membrane Disease) occurs predominantly in preterm infants and results from pulmonary immaturity: underdeveloped alveoli with DEFICIENT production of surfactant (a phospholipid complex secreted by type II pneumocytes from ~34 weeks). Surfactant reduces alveolar surface tension; without it, alveoli collapse on expiration (atelectasis), impairing gas exchange. Treatment is exogenous surfactant replacement and respiratory support. Ref: MOH Kenya Basic Paediatric Protocols — preterm care; Nelson Paediatrics.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2008] — Ophthalmia neonatorum prevention
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Eye Care',
  'Preventive measures for ophthalmia neonatorum include:',
  'Administering systemic penicillin within one hour after birth, isolation of the baby',
  'Instillation of penicillin eye drops after birth, taking an eye swab for culture and sensitivity',
  'Treatment of abnormal vaginal discharge prenatally, application of 1% tetracycline eye ointment within one hour of birth',
  'Treatment of all vaginal discharges prenatally, application of 3% tetracycline eye ointment within one hour of birth',
  'C',
  'Ophthalmia neonatorum (neonatal conjunctivitis, most seriously caused by Neisseria gonorrhoeae and Chlamydia trachomatis) is prevented by: (1) treating maternal genital infection (abnormal vaginal discharge) during the antenatal period; and (2) routine eye prophylaxis — application of 1% TETRACYCLINE EYE OINTMENT (TEO) to both eyes within one hour of birth (per Kenya/WHO protocols). Option D incorrectly states 3% TEO; the standard concentration is 1%. Systemic penicillin prophylaxis is not standard for all newborns. Ref: MOH Kenya Newborn Care guidelines; WHO STI management.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2008] — Blood coagulation disorders in pregnancy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Complications of Pregnancy',
  'Causes of blood coagulation disorders during pregnancy include:',
  'Eclampsia, anaemia, thrombophlebitis',
  'Dehydration, intrauterine foetal death, pre-eclampsia',
  'Ante-partum haemorrhage, eclampsia, intrauterine sepsis',
  'Amniotic fluid embolism, malnutrition, iso-immunization',
  'C',
  'Disseminated Intravascular Coagulation (DIC) in pregnancy is triggered by conditions that release thromboplastins or cause widespread endothelial injury. Established obstetric triggers include: antepartum haemorrhage (especially placental abruption), severe pre-eclampsia/eclampsia, intrauterine sepsis (septicaemia), intrauterine fetal death (IUFD) and amniotic fluid embolism. Option C correctly lists three major DIC triggers. Anaemia and thrombophlebitis do not directly cause DIC. Ref: Myles Textbook for Midwives — obstetric haemorrhage; MOH Kenya EmONC guidelines.',
  'hard', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2008] — Omphalitis complications
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Infections',
  'Omphalitis predisposes a newborn baby to:',
  'Anaemia, jaundice, hypothermia',
  'Asphyxia neonatorum, constipation, umbilical hernia',
  'Apnoeic attacks, haemorrhagic disease of the newborn, neonatal tetanus',
  'Jaundice, septicaemia, hepatitis',
  'D',
  'Omphalitis is bacterial infection of the umbilical stump. The umbilical vein remains patent postnatally for a short period, providing a direct route for organisms to enter the bloodstream and the portal circulation. This predisposes to: septicaemia (systemic bacterial infection); jaundice (haemolytic/cholestatic from hepatic involvement); and hepatitis (portal spread to the liver causing liver abscess or neonatal hepatitis). Neonatal tetanus is caused by Clostridium tetani contamination of the cord, but is a distinct entity from omphalitis. Ref: MOH Kenya Basic Paediatric Protocols; Myles Textbook for Midwives.',
  'hard', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2008] — First stage of labour definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Stages of Labour',
  'The 1st stage of labour is defined as the period from the onset of:',
  'Labour pains (true labour) to full dilatation of the cervix',
  'Labour pains to crowning of the head',
  'True labour to delivery of the baby',
  'True labour to dilatation of the cervix',
  'A',
  'The first stage of labour extends from the onset of TRUE labour (regular, progressive, effective uterine contractions with cervical change) to COMPLETE dilatation of the cervix (10 cm). It comprises a latent phase (0–4 cm) and an active phase (4–10 cm). The period from full dilatation to delivery of the baby is the second stage. Crowning is part of the second stage. Ref: Myles Textbook for Midwives — stages of labour; MOH Kenya partograph use; NCK curriculum.',
  'easy', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 [2008] — First vaginal examination in labour: purpose
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Labour Assessment',
  'The indications for the first vaginal examination during labour are to:',
  'Confirm labour, determine descent, identify the presenting part',
  'Determine engagement, confirm lie of the second twin, and examine cervical tears',
  'Confirm crowning, ascertain whether membranes have ruptured, assess',
  'Confirm cervical dilatation, determine state of the perineum, assess progress of labour',
  'A',
  'The first vaginal examination at admission in labour serves to: confirm the diagnosis of true labour and its onset; determine descent/station of the presenting part; identify the presenting part and position; assess cervical effacement and dilatation; and assess the state of the membranes. This information is plotted on the partograph to guide management. Crowning is visible, not requiring VE; perineal assessment is done by inspection; confirming the lie of a twin is done by abdominal palpation. Ref: Myles Textbook for Midwives — labour assessment; MOH Kenya partograph; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q16 [2008] — Signs of placental separation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Third Stage of Labour',
  'The signs that indicate placental separation include:',
  'Lengthening of the cord, a gush of blood, rising and hardening of the uterus',
  'Rising and hardening of the uterus, heavy bleeding, lengthening of the cord',
  'Shortening of the cord, rising and hardening of the uterus, a gush of blood',
  'Heavy bleeding, an urge to bear down, lengthening of the cord',
  'A',
  'The signs of placental separation in the third stage are: (1) LENGTHENING of the umbilical cord (placenta descends into the lower segment); (2) a small GUSH OF BLOOD (retroplacental haematoma formed, blood escapes); (3) the uterus RISES, becomes rounder, firmer and harder (due to contraction and placental descent). The cord lengthens, not shortens. Heavy bleeding indicates a problem (postpartum haemorrhage). Ref: Myles Textbook for Midwives — third stage of labour; NCK curriculum.',
  'easy', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q17 [2008] — Nordette: monophasic pill
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Family Planning',
  'Nordette is an example of:',
  'A biphasic low-dose pill',
  'A monophasic low-dose pill',
  'A triphasic low-dose pill',
  'A quadriphasic low-dose pill',
  'B',
  'Nordette (levonorgestrel 150 mcg + ethinylestradiol 30 mcg) is a combined oral contraceptive in which every active pill contains the SAME fixed (monophasic) dose of both oestrogen and progestogen throughout the cycle. Biphasic and triphasic pills have varying hormone doses across the packet to mimic the natural cycle. Quadriphasic formulations are a more recent development. Nordette is a classic monophasic low-dose combined OCP. Ref: MOH Kenya National Family Planning Guidelines; WHO medical eligibility criteria.',
  'easy', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2025 — KRCHN Paper I (Midwifery/Obstetrics) ────────────────────────

-- Q1 [2025] — Male vs female pelvis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Pelvimetry and Pelvis',
  'The male pelvis compared with the female pelvis is ___ and ___:',
  'Narrower and deeper',
  'Narrower and shallower',
  'Wider and deeper',
  'Wider and shallower',
  'A',
  'The android (male) pelvis is characterised by a heart-shaped (wedge-shaped) brim, a narrow sub-pubic arch (< 90°), prominent ischial spines and a NARROWER and DEEPER cavity compared to the gynaecoid (female) pelvis. The gynaecoid pelvis is oval/rounded, wider and shallower with a broad sub-pubic arch (> 90°), designed for childbirth. These differences are due to the influence of sex hormones on bone development at puberty. Ref: Myles Textbook for Midwives — the female pelvis; NCK April 2025 recall.',
  'easy', 'approved', 2025, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2025] — Contraceptive implants: Norplant 6 capsules
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Family Planning',
  'Which of the following statements is TRUE about contraceptive implants?',
  'Jadelle - 1 rod - lasts 3 years',
  'Norplant - 2 rods - lasts 5 years',
  'Sino-implant - 1 rod - lasts 4 years',
  'Norplant - 6 capsules',
  'D',
  'Norplant is the original levonorgestrel implant system consisting of SIX silastic capsules, effective for up to 5 years. Jadelle (Norplant-2) has 2 rods and lasts 5 years (not 3). Implanon has 1 rod and lasts 3 years. Sino-implant (Zarin/Femplant) has 2 rods and lasts 4 years (not 1 rod). Therefore the ONLY correct statement among the options is D: Norplant consists of 6 capsules. Ref: MOH Kenya National Family Planning Guidelines (current edition); WHO family planning reference manual.',
  'medium', 'approved', 2025, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2025] — Ophthalmia neonatorum prevention (2025 version)
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Eye Care',
  'In the management/prevention of ophthalmia neonatorum:',
  'Treat the mother for syphilis and apply 1% tetracycline eye ointment (TEO) at birth',
  'Treat the eye with penicillin drops at birth',
  'Treat abnormal vaginal discharge prenatally and apply 3% TEO within one hour of birth',
  'Treat abnormal vaginal discharge prenatally and apply 1% TEO within one hour of birth',
  'D',
  'Prevention of ophthalmia neonatorum (neonatal conjunctivitis due to gonococcal and chlamydial infection) requires a two-pronged approach: (1) antenatal treatment of maternal genital infections — specifically any ABNORMAL VAGINAL DISCHARGE (gonorrhoea, chlamydia) — during pregnancy; and (2) routine postnatal ocular prophylaxis with 1% TETRACYCLINE EYE OINTMENT (TEO) applied to both eyes within ONE HOUR of birth. The correct concentration is 1%, not 3%. Treating specifically for syphilis (option A) is insufficient. Penicillin drops (option B) are not standard postnatal eye prophylaxis in Kenya. Ref: MOH Kenya Newborn Care guidelines (current); WHO STI management; NCK April 2025 recall.',
  'medium', 'approved', 2025, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;
