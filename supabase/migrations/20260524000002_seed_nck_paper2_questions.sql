-- =============================================================================
-- NCK PAST PAPER QUESTIONS — PAPER 2 SEED DATA
-- =============================================================================
-- Source: NCK Past Papers — Paper 2 (BSCN & KRCHN)
-- Cadre mapping: BSCN → 'BScN', KRCHN → 'KRCHN'
-- exam_year: stored but NOT exposed to students (admin/analytics use only)
-- year_known: FALSE for uncategorised sets (no year on source PDF)
-- Units mapped to the seeded units table taxonomy
-- All questions set to status = 'approved'
-- correct_option uses uppercase letter: A, B, C, or D
-- =============================================================================

-- Helper: we insert with contributor_id = NULL (platform-owned content)

-- =============================================================================
-- SECTION A — BSCN PAPER 2
-- =============================================================================

-- ─── BSCN Paper 2 — August 2016 ──────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q1
('BScN', 'Midwifery', 'Pelvic Anatomy',
 'The anterior diameter of the pelvic outlet in a gynaecoid pelvis measures:',
 '13.5 cm', '13 cm', '12 cm', '11.5 cm',
 'D',
 'The gynaecoid (female-type) pelvic outlet has an antero-posterior diameter of approximately 11.5 cm (measured from the lower border of the symphysis pubis to the tip of the sacrum). This shortens to about 9.5 cm at the level of the ischial spines and lengthens to 13 cm during delivery as the coccyx is pushed back. Adequate outlet diameters are essential for vaginal delivery.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q2
('BScN', 'Midwifery', 'Malpresentation',
 'The causes of face presentation include:',
 'Hydrocephalus, uterine abnormality',
 'Anterior obliquity of the uterus, contracted pelvis, anencephaly',
 'Contracted pelvis, placenta praevia, anencephaly',
 'Polyhydramnios, uterine abnormalities, multiple pregnancies',
 'B',
 'Face presentation results from complete extension of the fetal head. Maternal causes include anterior obliquity (pendulous abdomen — especially in multiparas) and contracted pelvis preventing flexion. Fetal causes include anencephaly (no cranial vault to flex), large fetus, tumours of the fetal neck, and multiple loops of cord around the neck. Hydrocephalus and polyhydramnios more commonly cause malpresentation but not specifically face presentation.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q3
('BScN', 'Midwifery', 'Essential Newborn Care',
 'Immediately after delivering the baby, the midwife conducting the delivery should:',
 'Dry the baby', 'Take the baby weight', 'Apply identification band', 'Check the umbilical cord for number of vessels',
 'A',
 'Per WHO/Kenya Essential Newborn Care (ENC) protocol, the FIRST step after delivery is to DRY the baby thoroughly (head-to-toe, including back) with a clean warm cloth, then remove the wet cloth. This prevents heat loss by evaporation, the principal mechanism of neonatal hypothermia. Drying also stimulates breathing. Weighing, identification banding and cord inspection come AFTER initial drying, warming and assessment of breathing.',
 'easy', 'approved', 2016, 'Paper 2'),

-- Q4
('BScN', 'Midwifery', 'Preterm Labour Management',
 'A woman with preterm labour is given magnesium sulphate for the following reasons:',
 'To enhance fetal lung maturity', 'To prevent seizures', 'To improve urine output', 'To inhibit uterine contractions',
 'D',
 'Magnesium sulphate has dual roles in obstetrics. In preterm labour <32 weeks it is used for FETAL NEUROPROTECTION (reduces risk of cerebral palsy) and as a TOCOLYTIC to inhibit uterine contractions (it competes with calcium at the neuromuscular junction, relaxing uterine smooth muscle). In severe pre-eclampsia/eclampsia it prevents and treats seizures. In a preterm-labour context the primary action is uterine relaxation (tocolysis).',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q5
('BScN', 'Midwifery', 'Neonatal Prophylaxis',
 'The reason for administering vitamin K is to:',
 'Boost the immune system', 'Stimulate growth of gastrointestinal flora', 'Protect against infection', 'Prevent bleeding problems',
 'D',
 'All newborns receive intramuscular vitamin K (typically 1 mg for term, 0.5 mg for preterm) within 1 hour of birth to prevent Vitamin K Deficiency Bleeding (VKDB, formerly haemorrhagic disease of the newborn). Neonates have low vitamin K stores (poor placental transfer, sterile gut, low breast-milk content) and immature hepatic synthesis of clotting factors II, VII, IX and X. Without prophylaxis, VKDB can cause life-threatening intracranial haemorrhage.',
 'easy', 'approved', 2016, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q6
('BScN', 'Midwifery', 'Gestational Trophoblastic Disease',
 'A client makes a routine visit to the prenatal clinic. Although she is 14 weeks pregnant, the size of her uterus approximates that in an 18–20 weeks pregnancy. A diagnosis of gestational trophoblastic disease is made. The nurse should prepare for:',
 'Evacuation, control of bleeding, administration of methotrexate',
 'Family planning health messages, evacuation, administration of methotrexate',
 'Control of bleeding, family planning health messages, evacuation',
 'Evacuation, control of bleeding, Anti-D Immune globulin administration',
 'A',
 'Gestational trophoblastic disease (hydatidiform mole) presents with uterine size larger than dates, hyperemesis, very high β-hCG and possibly hyperthyroidism. Management: (1) suction EVACUATION of uterine contents; (2) CONTROL OF BLEEDING (oxytocics, IV fluids, blood as needed); (3) follow-up β-hCG weekly until negative, then monthly for 6–12 months; (4) METHOTREXATE chemotherapy for persistent trophoblastic disease/choriocarcinoma. Pregnancy is avoided during follow-up.',
 'hard', 'approved', 2016, 'Paper 2'),

-- Q7
('BScN', 'Midwifery', 'Diabetes in Pregnancy',
 'A client with type I diabetes mellitus who is multigravida visits the clinic at 27 weeks gestation. The nurse should instruct the client that:',
 'Do weekly fetal movement counts by the mother',
 'Contraction stress testing is performed weekly',
 'Induction of labor is begun at 34 weeks gestation',
 'Non-stress testing is performed weekly until 32 weeks gestation',
 'A',
 'In diabetic pregnancies, fetal surveillance is intensified from the late second trimester. Daily maternal fetal MOVEMENT COUNTING (kick counts) is the simplest, cheapest first-line method and is taught to all diabetic mothers from around 24–28 weeks. Non-stress tests and biophysical profiles are typically begun at 32 weeks and performed 1–2 times weekly (not stopped at 32 weeks). Contraction stress tests are not weekly routine; delivery is usually planned at 38–39 weeks, not 34.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q8
('BScN', 'Midwifery', 'Deep Vein Thrombosis',
 'The following assessment finding on a patient would warrant the nurse to suspect DVT:',
 'Mid-calf pain, tenderness and redness along the vein',
 'Chills, fever, malaise, occurring 2 weeks after delivery',
 'Muscle pain, the presence of Homan''s sign and swelling in the affected limb',
 'Chills, fever, stiffness and pain occurring 10 to 14 days after delivery',
 'C',
 'Classic features of deep vein thrombosis include unilateral calf/leg pain, swelling, warmth, redness, and tenderness along the deep venous tract — together with a positive Homan''s sign (calf pain on dorsiflexion of the foot). Note that Homan''s sign is now considered unreliable on its own and is no longer routinely used because it can dislodge a thrombus. Diagnosis is confirmed by compression Doppler ultrasound. Options B and D describe puerperal sepsis/infection, not DVT.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q9
('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'The urinary symptoms that a pregnant mother will frequently experience during the first trimester would be:',
 'Dysuria', 'Frequency', 'Incontinence', 'Burning',
 'B',
 'Urinary FREQUENCY is one of the earliest pregnancy symptoms, occurring in the first trimester due to (i) pressure of the enlarging uterus on the bladder while the uterus is still a pelvic organ, and (ii) increased glomerular filtration rate from pregnancy hormones. Frequency abates in the second trimester as the uterus rises into the abdomen, and returns in the third trimester as the presenting part engages. Dysuria/burning suggest urinary tract infection (which must be screened for).',
 'easy', 'approved', 2016, 'Paper 2'),

-- Q10
('BScN', 'Medical-Surgical Nursing', 'Cardiac Disease in Pregnancy',
 'The following is a priority nursing diagnosis in a client with class 3 cardiac disease:',
 'Knowledge deficit related to self care',
 'Fear related to pregnancy outcome',
 'Alteration in nutrition related to sodium restricted diet',
 'Activity intolerance related to compromised cardiac status',
 'D',
 'NYHA Class III cardiac disease means symptoms with less-than-ordinary activity. In pregnancy, blood volume rises 40–50% and cardiac output 30–50%, placing major load on a compromised heart. ACTIVITY INTOLERANCE related to compromised cardiac status is the priority physiological diagnosis (Maslow''s basic needs). Strict activity restriction, careful management of fluid balance, and delivery planning are central. Knowledge and fear are addressed but are not the priority.',
 'medium', 'approved', 2016, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q11
('BScN', 'Medical-Surgical Nursing', 'Gynaecological Conditions',
 'The following statement is correct about endometriosis:',
 'It often progresses to endometrial cancer',
 'Implants produce hormones that mimic the ovaries',
 'Trapped haematomas cause scarring and adhesions',
 'There is no known familial tendency of occurrence',
 'C',
 'In endometriosis, ectopic endometrial tissue responds to monthly hormonal cycles, bleeding into the surrounding tissue with each menstrual cycle. The TRAPPED BLOOD (haematomas) cannot drain, organises, and provokes intense inflammation, fibrosis, scarring and ADHESIONS, leading to chronic pelvic pain, dysmenorrhoea, dyspareunia and infertility. Ovarian endometriomas are called "chocolate cysts." Endometriosis does NOT typically progress to endometrial cancer; there IS a familial tendency (7-fold risk in first-degree relatives).',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q12
('BScN', 'Medical-Surgical Nursing', 'Cervical Cancer Screening',
 'If a papanicolaou smear report is abnormal, the next step in evaluating the client for cervical cancer is:',
 'A repeat pap smear', 'An endocervical curettage', 'A colposcopy', 'A conisation',
 'C',
 'Following an abnormal cytology screening (Pap smear), the next investigative step is COLPOSCOPY — direct magnified visualisation of the cervix with application of 3–5% acetic acid (acetowhite areas) and Lugol''s iodine (non-staining abnormal areas). Suspicious areas are then BIOPSIED for histological diagnosis. Conisation (cone biopsy) and endocervical curettage are reserved for specific lesions identified on colposcopy. Simple repeat Pap smear is not appropriate after a clearly abnormal result.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q13
('BScN', 'Medical-Surgical Nursing', 'Gynaecological Conditions',
 'Management of Bartholin''s abscess includes:',
 'Encourage moderate upright activity for drainage',
 'Apply cold packs to the vulva to reduce swelling',
 'Obtain a culture of any drainage for analysis',
 'Having the client wear support briefs to reduce skin irritation',
 'C',
 'Bartholin abscess management: WARM (not cold) sitz baths to encourage spontaneous drainage; obtaining a CULTURE of any drainage to identify the causative organism (often polymicrobial, but Neisseria gonorrhoeae and Chlamydia trachomatis must be excluded — these inform antibiotic choice and partner notification); surgical incision and drainage with marsupialisation or Word catheter placement to prevent recurrence; systemic antibiotics if cellulitis.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q14
('BScN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
 'Manifestation of hypothyroidism in the reproductive system include:',
 'Increased libido, oligospermia',
 'Impotence, metrorrhagia',
 'Anovulation, high incidence of spontaneous abortion',
 'Irregular menstrual cycles, increased libido',
 'C',
 'Hypothyroidism reduces metabolic rate and disrupts hypothalamic-pituitary-gonadal regulation. In women: ANOVULATION, menorrhagia (heavy menses) initially then oligomenorrhoea, infertility, HIGH RISK OF SPONTANEOUS ABORTION/miscarriage if pregnancy occurs, and DECREASED libido. In men: decreased libido, erectile dysfunction, oligospermia. Adequate thyroid replacement (levothyroxine to TSH 0.5–2.5 mIU/L pre-conception) restores fertility and reduces miscarriage risk.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q15
('BScN', 'Midwifery', 'Hypertensive Disorders of Pregnancy',
 'The following are signs and symptoms of impending eclampsia:',
 'Sharp rise in blood pressure and epigastric pain',
 'Increase in proteinuria and vomiting',
 'Weight gain and epigastric pain',
 'Sharp rise in blood pressure and increase in proteinuria',
 'A',
 'Impending (imminent) eclampsia is heralded by warning signs reflecting end-organ involvement: SHARP RISE IN BP (often >160/110), severe persistent headache, visual disturbances (blurring, photophobia, scotomata), EPIGASTRIC/right upper quadrant pain (liver capsule stretch from hepatic congestion — HELLP), hyperreflexia/clonus, oliguria, and reduced platelets. These mandate immediate magnesium sulphate prophylaxis and urgent delivery. The combination of rising BP + epigastric pain is the most specific impending sign.',
 'medium', 'approved', 2016, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q16
('BScN', 'Anatomy & Physiology', 'Embryology',
 'The trophoblastic cells of the developing zygote form the:',
 'Fetus and amnion', 'Placenta and fetus', 'Chorion and amnion', 'Placenta and chorion',
 'D',
 'After fertilisation, the blastocyst has an inner cell mass (which becomes the embryo/fetus) and an outer trophoblast layer. The TROPHOBLAST differentiates into the CHORION and contributes the fetal portion of the PLACENTA (chorionic villi). The amnion arises separately from the inner cell mass (amnioblasts). So trophoblastic cells → placenta + chorion.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q17
('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'Spermatogenesis takes place in the:',
 'Prostate glands', 'Seminal vesicles', 'Epididymis', 'Seminiferous tubules',
 'D',
 'Spermatogenesis (sperm formation from spermatogonia through spermatocytes, spermatids to mature spermatozoa) occurs in the SEMINIFEROUS TUBULES of the testis, supported by Sertoli cells. The EPIDIDYMIS is where sperm undergo maturation and are stored (gaining motility and fertilising ability). Prostate and seminal vesicles produce seminal fluid components but not sperm.',
 'easy', 'approved', 2016, 'Paper 2'),

-- Q18
('BScN', 'Maternal & Child Health', 'Maternal Mortality',
 'The most common cause of maternal death in Kenya today is:',
 'Haemorrhage', 'Ruptured uterus', 'Eclampsia', 'Abortion',
 'A',
 'Per the Kenya Demographic and Health Survey and the WHO/MoH maternal-mortality data, the leading direct causes of maternal death in Kenya (and globally) are: (1) HAEMORRHAGE (postpartum haemorrhage in particular), (2) hypertensive disorders of pregnancy (eclampsia), (3) sepsis/puerperal infection, (4) unsafe abortion, and (5) obstructed labour. Haemorrhage remains the single biggest direct cause. Prevention focuses on active management of the third stage of labour and skilled birth attendance.',
 'easy', 'approved', 2016, 'Paper 2'),

-- Q19
('BScN', 'Maternal & Child Health', 'Adolescent Pregnancy',
 'When planning care of a 15 year old female who is pregnant, a midwife should recognise that the adolescent is at risk for:',
 'Glucose intolerance', 'Foetal chromosomal abnormality', 'Incompetent cervix', 'Iron deficiency anaemia',
 'D',
 'Adolescent pregnancy carries elevated risk for several conditions, but the most consistently demonstrated and prevalent is IRON DEFICIENCY ANAEMIA — adolescents have their own growth demands plus pregnancy demands competing for iron stores, and their pre-pregnancy iron stores are typically lower than adult women. Other adolescent risks: pre-eclampsia, preterm labour, low birth weight, cephalopelvic disproportion (incomplete pelvic growth), depression — but iron deficiency anaemia is the most ubiquitous.',
 'medium', 'approved', 2016, 'Paper 2'),

-- Q20 (True/False converted to MCQ format)
('BScN', 'Midwifery', 'Lactation and PMTCT',
 'Which of the following statements about lactation hormones and PMTCT is CORRECT?',
 'Oxytocin is responsible for milk production; PMTCT Prong 2 prevents HIV transmission to the baby',
 'Prolactin is responsible for milk ejection; PMTCT Prong 2 prevents unintended pregnancies in HIV-positive women',
 'Prolactin is responsible for milk production; PMTCT Prong 2 prevents unintended pregnancies in HIV-positive women',
 'Oxytocin is responsible for milk production; PMTCT Prong 2 provides care and support for HIV-positive families',
 'C',
 'PROLACTIN (anterior pituitary) is responsible for milk PRODUCTION (synthesis) in the alveolar cells of the breast; OXYTOCIN (posterior pituitary) is responsible for milk EJECTION/let-down (contraction of myoepithelial cells around alveoli). Both are needed but for different functions. The WHO/Kenya PMTCT strategy has 4 prongs: Prong 1 = primary HIV prevention; PRONG 2 = preventing unintended pregnancies in HIV-positive women; Prong 3 = preventing transmission from HIV+ mother to baby; Prong 4 = care and support for HIV+ mothers/families.',
 'medium', 'approved', 2016, 'Paper 2');

-- ─── BSCN Paper 2 — April 2018 ───────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q1
('BScN', 'Midwifery', 'Lactation',
 'Hormones involved in lactation are:',
 'Prolactin and oestrogen',
 'Human placental lactogen and prolactin',
 'Progesterone and oxytocin',
 'Prolactin and oxytocin',
 'D',
 'Lactation depends on two pituitary hormones: PROLACTIN (from anterior pituitary) — drives milk SYNTHESIS in alveolar cells; OXYTOCIN (from posterior pituitary) — drives milk EJECTION (let-down reflex) by contracting myoepithelial cells around alveoli, expelling milk into ducts. Oestrogen and progesterone during pregnancy PREPARE the breast for lactation but actually INHIBIT milk secretion; after placental delivery their drop disinhibits lactation. HPL is a pregnancy hormone.',
 'easy', 'approved', 2018, 'Paper 2'),

-- Q2
('BScN', 'Midwifery', 'Sexually Transmitted Infections in Pregnancy',
 'Kim is eight (8) weeks pregnant. On assessment, a nurse determines that she has gonococcal infection. The significance of this information is that the pregnancy is at risk of:',
 'Spontaneous abortion',
 'Result in thrush in the newborn',
 'Cause ophthalmia neonatorum',
 'Increase the risk of acquired immune deficiency syndrome',
 'C',
 'Maternal gonococcal (Neisseria gonorrhoeae) infection is transmitted to the neonate at delivery as the baby passes through the birth canal. The classic complication is OPHTHALMIA NEONATORUM — severe purulent conjunctivitis appearing within 1-5 days of birth, which if untreated can cause corneal perforation and blindness. Prophylaxis: prenatal screening and treatment; routine instillation of 1% tetracycline ointment or 0.5% erythromycin to both eyes at birth (Kenya MoH/WHO protocol). Maternal treatment is with ceftriaxone.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q3
('BScN', 'Midwifery', 'Rhesus Incompatibility',
 'The advice you would give a rhesus-negative mother on RhO(D) Immune globulin administration would be:',
 'Administration of immune globulin at twenty eight (28) weeks gestation and within 72 hours after birth',
 'Administration of immune globulin before conception and within 48 hours after birth',
 'Administration of immune globulin at twenty (20) weeks gestation and within forty eight (48) hours after birth',
 'Administration of immune globulin before conception and within seventy two (72) hours after birth',
 'A',
 'Anti-D (RhO(D)) immunoglobulin prevents maternal sensitisation to Rh-positive fetal red cells in Rh-negative women. Standard protocol: prophylactic dose at 28 WEEKS GESTATION (some protocols also give a second dose at 34 weeks), AND within 72 HOURS of any sensitising event — delivery of an Rh-positive baby, miscarriage, abortion, ectopic pregnancy, amniocentesis, abdominal trauma, antepartum haemorrhage. The 72-hour window is critical — efficacy falls rapidly after that.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q4
('BScN', 'Midwifery', 'Postnatal Mental Health',
 'The manifestation in a woman who delivered a newborn thirty six (36) hours ago that would lead a midwife to suspect a postpartum depression is:',
 'Expressing concern about taking the infant home',
 'Delay her morning shower',
 'Exhibiting prolonged periods of fatigue',
 'Asking repeated questions about infant care',
 'C',
 'At 36 hours postpartum, the question is distinguishing normal "baby blues" from early postpartum depression. PROLONGED PERIODS OF FATIGUE, withdrawal, loss of interest, persistent sad/depressed affect, and inability to enjoy the baby are warning signs of postpartum depression (which can begin within days). Anxiety about taking the infant home and questions about infant care are NORMAL primiparous concerns. Delaying a shower for one day is also within normal range. Postpartum depression requires screening, support and treatment.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q5
('BScN', 'Midwifery', 'Shoulder Dystocia',
 'The complication likely to occur during delivery of shoulder dystocia is:',
 'Klumpke''s palsy', 'Shoulder dislocation', 'Erb''s palsy', 'Facial nerve damage',
 'C',
 'Shoulder dystocia (impaction of the anterior shoulder behind the pubic symphysis after delivery of the head) can cause brachial plexus injury during the manoeuvres used to resolve it. ERB''S PALSY (Erb-Duchenne palsy) is the commonest — injury to the UPPER brachial plexus (C5-C6 roots) producing the classic "waiter''s tip" posture: arm adducted, internally rotated, elbow extended, forearm pronated, wrist flexed. Klumpke''s palsy (lower plexus, C8-T1) is rarer. Most resolve in months. Other dystocia complications: clavicle fracture, hypoxic-ischaemic injury, maternal third-degree tears and PPH.',
 'medium', 'approved', 2018, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q6
('BScN', 'Maternal & Child Health', 'Neural Tube Defect Prevention',
 'To reduce chances of mothers having complications of pregnancy on neural tube defects, the mother is preferably addressed on:',
 'Taking iron and ferrous sulphate tablet in pregnancy till delivery',
 'Taking iron and ferrous sulphate tablets before conception',
 'Taking iron and ferrous sulphate in the 2nd trimester of pregnancy',
 'Taking iron and ferrous sulphate tablets in the 3rd trimester of pregnancy',
 'B',
 'Neural tube defects (spina bifida, anencephaly) are prevented by adequate FOLIC ACID intake BEFORE conception and through the first trimester (when the neural tube closes around days 21–28). WHO/Kenya recommends 400 mcg folic acid daily pre-conception, 5 mg daily for women with previous NTD-affected pregnancy or on antiepileptic drugs. The KEY TIMING is PRE-CONCEPTION — option B. Iron supplementation also matters in pregnancy but does not prevent NTDs — folic acid does.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q7
('BScN', 'Midwifery', 'Antepartum Haemorrhage',
 'For a woman who is at thirty two (32) weeks gestation and has been having vaginal bleeding for the last four (4) hours, the priority would be:',
 'Assess bleeding by giving a packet of pads, advice on bed rest, monitor fetal heart rate',
 'Conduct a speculum examination, monitor fetal heart rate, advocate for an ultrasound',
 'Assess bleeding by giving a packet of pads, call for help, monitor fetal heart rate',
 'Bed rest, ultrasound, speculum examination',
 'C',
 'Antepartum haemorrhage (APH) at 32 weeks may be placenta praevia or abruption — both obstetric emergencies. Priority is to ASSESS the bleeding and the wellbeing of the mother and fetus, while CALLING FOR HELP (skilled team to manage potential shock and emergency delivery). Monitor FHR continuously. CRITICALLY, do NOT perform digital vaginal examination — it can cause catastrophic haemorrhage in placenta praevia. A speculum exam may be done only after ultrasound has excluded placenta praevia. IV access, fluids, group and crossmatch, anti-D if Rh-negative, corticosteroids for fetal lung maturity if delivery may be needed.',
 'hard', 'approved', 2018, 'Paper 2'),

-- Q8
('BScN', 'Midwifery', 'Cardiac Disease in Pregnancy',
 'The observation a midwife should anticipate from a pregnant mother with a history of heart disease is:',
 'Slow pulse rate', 'Decreased blood pressure', 'Dyspnoea', 'Haemorrhage',
 'C',
 'Pregnancy increases blood volume by 40-50% and cardiac output by 30-50%, with maximum strain at 28-32 weeks. In a mother with pre-existing heart disease, the failing heart cannot meet the demand — leading to pulmonary congestion and DYSPNOEA (the cardinal symptom of cardiac decompensation in pregnancy), orthopnoea, paroxysmal nocturnal dyspnoea, palpitations, fatigue. Pulse is typically increased (tachycardia), not slow. BP changes are variable. Bleeding is not a direct effect of cardiac disease.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q9
('BScN', 'Midwifery', 'Deep Vein Thrombosis Prevention',
 'Prevention of deep venous thrombosis during puerperium involves:',
 'Confinement to bed, avoidance of pressure, postnatal exercises',
 'Early ambulation, plenty of oral fluid, avoidance of pressure',
 'Prolonged inactivity, postnatal exercises, plenty of oral fluids',
 'Operative deliveries, early ambulation, prolonged inactivity',
 'B',
 'Pregnancy and puerperium are hypercoagulable states (5–6× increased VTE risk; 20× after caesarean section). DVT prevention: EARLY AMBULATION (the single most important intervention — even within hours of normal delivery), generous oral HYDRATION to prevent haemoconcentration, AVOIDANCE OF PROLONGED PRESSURE on calves (no leg crossing, no prolonged sitting), graduated compression stockings for high-risk women, and prophylactic LMWH for women with major risk factors. Confinement to bed and prolonged inactivity WORSEN risk.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q10
('BScN', 'Midwifery', 'Shoulder Dystocia Management',
 'The McRoberts manoeuvre is applied in the delivery of shoulder dystocia by:',
 'Creating gentle pressure on her abdomen, releasing the impaction of the anterior shoulder',
 'Applying pressure on the fetal back in order to help adduct the shoulders away from the symphysis pubis',
 'Identifying the posterior shoulder on vaginal examination, then to push the posterior shoulder towards the fetal chest',
 'The midwife inserting her hands into the vagina, identify the fetal chest and rotating the posterior fetal shoulder for delivery',
 'A',
 'McRoberts'' manoeuvre is the FIRST step in shoulder dystocia management: the mother''s THIGHS are hyperflexed onto her abdomen (knees to chest), which rotates the maternal pelvis cephalad, flattens the lumbar lordosis and increases the functional pelvic outlet — freeing the impacted anterior shoulder in 40-60% of cases. Often combined with suprapubic pressure (Rubin I). Subsequent steps if McRoberts fails: episiotomy, Rubin II/Woods screw manoeuvres, delivery of posterior arm, Gaskin (all-fours) — the HELPERR mnemonic.',
 'hard', 'approved', 2018, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q11
('BScN', 'Midwifery', 'Breech Presentation',
 'The type of breech in which thighs are flexed with legs extended is called:',
 'Complete breech', 'Frank breech', 'Footing breech', 'Extended breech',
 'B',
 'Types of breech presentation: FRANK (extended) BREECH — hips flexed, knees EXTENDED, feet up by the head — most common, accounting for ~65% of breech presentations at term; COMPLETE BREECH — hips and knees both flexed ("tailor sitting"); FOOTLING BREECH — one or both feet present below the buttocks (high risk of cord prolapse). The wording in option B describes frank breech.',
 'easy', 'approved', 2018, 'Paper 2'),

-- Q12
('BScN', 'Midwifery', 'Gestational Trophoblastic Disease',
 'The immediate management of gestational trophoblastic disease is:',
 'Evacuation, control of bleeding, administration of methotrexate',
 'Family planning, evacuation, administration of methotrexate',
 'Control of bleeding, family planning, evacuation',
 'Evacuation, control of bleeding, anti-D immune globulin administration',
 'A',
 'Immediate management of hydatidiform mole: SUCTION EVACUATION of uterine contents; CONTROL of bleeding (uterotonics, IV fluids/blood); β-hCG follow-up (weekly until negative, then monthly for 6–12 months); CHEMOTHERAPY with methotrexate for persistent/invasive trophoblastic disease. Avoid pregnancy during follow-up. Anti-D is given if mother is Rh-negative (Rh isoimmunisation can occur).',
 'hard', 'approved', 2018, 'Paper 2'),

-- Q13
('BScN', 'Midwifery', 'Postnatal Care',
 'Sub-involution of the uterus is suspected when:',
 'The uterus remains bulky with persistent red lochia',
 'When after pains persist with breastfeeding',
 'When the fundal height reduces progressively',
 'When the lochia loss corresponds with a given post-partum period',
 'A',
 'Normal involution: the uterus reduces from about 1000 g and 20 cm at delivery to pre-pregnancy size by 6 weeks; the fundus descends about 1 cm/day; lochia changes from RUBRA (red, 1–4 days) → SEROSA (pinkish, 4–10 days) → ALBA (white, 10–14 days). SUB-INVOLUTION = abnormally delayed return to pre-pregnancy state: BULKY/larger uterus on palpation, PERSISTENT RED (rubra) lochia beyond 4–5 days, and possibly offensive lochia. Causes: retained products of conception, infection, fibroids. Treatment: oxytocics, antibiotics, evacuation if RPOC retained.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q14
('BScN', 'Midwifery', 'Postnatal Care',
 'The daily observation of a postnatal mother in the ward includes:',
 'Inspection of the perineum, taking weight, assessing involution of the uterus, observation of vital signs',
 'Observation of vital signs, lochia loss, involution of the uterus, inspection of the perineum',
 'Palpation of the calf muscles, urine testing, bowel movements, breast examination',
 'Urinalysis, vaginal examination, assessment of lochia loss, sleeping patterns',
 'B',
 'Daily postnatal observations focus on the BUBBLE-EE acronym: B-Breasts (engorgement, nipples), U-Uterus (involution — fundal height), B-Bladder (voiding), B-Bowels, L-Lochia (amount, colour, odour), E-Episiotomy/Perineum (REEDA — Redness, Edema, Ecchymosis, Discharge, Approximation), E-Emotional status — plus vital signs (temperature for sepsis, BP for pre-eclampsia). Option B covers vital signs, lochia, involution and perineum — the core daily check.',
 'easy', 'approved', 2018, 'Paper 2'),

-- Q15
('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'The best management of varicose veins during pregnancy is:',
 'Using supporting tights or crepe bandage, resting with feet elevated',
 'Avoiding standing for too long, wearing loose clothing',
 'Avoid sitting for a long time, elevating feet when sleeping',
 'Wearing low heeled shoes, elevated feet when sleeping',
 'A',
 'Pregnancy worsens varicose veins through increased venous pressure (gravid uterus on IVC), increased blood volume and progesterone-induced venous wall relaxation. Best management: graduated COMPRESSION STOCKINGS/SUPPORT TIGHTS or crepe bandage (applied before getting out of bed in the morning) — gives external venous support; ELEVATION of legs above heart level when resting; regular exercise (walking activates calf pump); avoiding prolonged standing/sitting and tight clothing around hips/thighs. Option A is the most specific therapeutic intervention.',
 'medium', 'approved', 2018, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q16
('BScN', 'Medical-Surgical Nursing', 'Gynaecological Conditions',
 'The following is a correct statement about primary dysmenorrhoea:',
 'Symptoms become more severe in multigravid women',
 'It is associated with an underlying pelvic pathology',
 'Spasmodic lower abdominal pain begins with onset of menses',
 'The probable cause is endometrial Prostaglandin deficit',
 'C',
 'PRIMARY dysmenorrhoea is painful menstruation without underlying pelvic pathology — caused by EXCESS (not deficit) of endometrial prostaglandins (especially PGF2α) which cause intense uterine contraction and ischaemia. SPASMODIC lower-abdominal cramping pain begins at or just before the onset of menses, lasts 1-3 days, and is COMMONEST IN ADOLESCENTS and decreases with age and parity (option A is wrong). SECONDARY dysmenorrhoea (older women, associated with endometriosis, adenomyosis, fibroids, PID) is option B. Treatment: NSAIDs (block prostaglandins), combined oral contraceptives.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q17
('BScN', 'Surgical Nursing', 'Gynaecological Surgery',
 'Surgical treatment of a client with rectocele and a cystocele include:',
 'Anterior colporrhaphy', 'Posterior colporrhaphy', 'Abdominal hysterectomy', 'Anterio-posterior colporrhaphy',
 'D',
 'CYSTOCELE = anterior vaginal wall prolapse (bladder herniates into vagina) — repaired by ANTERIOR colporrhaphy. RECTOCELE = posterior vaginal wall prolapse (rectum herniates into vagina) — repaired by POSTERIOR colporrhaphy. A client with BOTH cystocele AND rectocele needs ANTERIO-POSTERIOR COLPORRHAPHY — combined repair of both walls. Hysterectomy is considered for uterine prolapse if the uterus is also descended.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q18
('BScN', 'Medical-Surgical Nursing', 'Gynaecological Conditions',
 'Menometrorrhagia is defined as:',
 'Irregular and excessive flow',
 'Menstrual flow at irregular intervals',
 'Bleeding at intervals of less than twenty one (21) days',
 'Bleeding after sexual intercourse',
 'A',
 'Standard terminology of abnormal uterine bleeding: MENORRHAGIA = heavy/prolonged regular menstrual bleeding; METRORRHAGIA = irregular intermenstrual bleeding; MENOMETRORRHAGIA = combination — IRREGULAR AND EXCESSIVE/heavy bleeding. Polymenorrhoea = cycles <21 days (option C); postcoital bleeding (option D) is bleeding after intercourse, often a sign of cervical pathology. The newer FIGO PALM-COEIN system has replaced these terms but the question uses the older terminology.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q19
('BScN', 'Midwifery', 'Third Stage of Labour',
 'The nurse while assessing a primipara during the immediate postpartum period, puts one hand on the fundus to:',
 'Prevent uterine inversion', 'Promote uterine involution', 'Hasten the puerperium period', 'Determine the size of fundus',
 'A',
 'During the immediate postpartum period (particularly during controlled cord traction for placental delivery, but also during uterine massage), the midwife places one hand SUPRAPUBICALLY on the lower uterine segment, pushing the uterus upward to GUARD AGAINST UTERINE INVERSION while the OTHER hand applies traction on the cord. Uterine inversion is a rare but catastrophic complication. The fundal hand is also used to assess tone, position and to massage in atony.',
 'medium', 'approved', 2018, 'Paper 2'),

-- Q20
('BScN', 'Medical-Surgical Nursing', 'Cervical Cancer and Reproductive Health',
 'Which of the following statements about the squamo-columnar junction and fibroid-related infertility is CORRECT?',
 'The squamo-columnar junction facilitates initial HPV diagnosis — TRUE; In fibroid-related infertility, fallopian tube cilia are eroded — TRUE',
 'The squamo-columnar junction facilitates initial HPV diagnosis — TRUE; In fibroid-related infertility, fallopian tube cilia are eroded — FALSE',
 'The squamo-columnar junction facilitates initial HPV diagnosis — FALSE; In fibroid-related infertility, fallopian tube cilia are eroded — TRUE',
 'The squamo-columnar junction facilitates initial HPV diagnosis — FALSE; In fibroid-related infertility, fallopian tube cilia are eroded — FALSE',
 'B',
 'The SQUAMO-COLUMNAR JUNCTION (transformation zone) of the cervix is where columnar endocervical epithelium meets squamous ectocervical epithelium. This is the metaplastic zone where HPV preferentially infects and where cervical cancer arises. Pap smears, VIA/VILI, HPV testing and colposcopy all focus on this junction — TRUE. Fibroids cause infertility by mechanical effects (distortion of uterine cavity, obstruction of tubal ostia, interference with implantation, abnormal contractility) — they do NOT erode tubal cilia. Tubal cilia damage is more typical of PID/salpingitis — FALSE.',
 'hard', 'approved', 2018, 'Paper 2');

-- =============================================================================
-- SECTION B — KRCHN PAPER 2
-- =============================================================================

-- ─── KRCHN Paper 2 — August 2011 ─────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q1
('KRCHN', 'Midwifery', 'Placental Hormones',
 'The trophoblastic layer responsible for production of human chorionic gonadotropin hormone is:',
 'Mesoderm', 'Cytotrophoblast', 'Syncytiotrophoblast', 'Syntium',
 'C',
 'The trophoblast differentiates into two layers: the inner CYTOTROPHOBLAST (Langhans'' layer — mononucleate, proliferative) and the outer SYNCYTIOTROPHOBLAST (multinucleated, invasive). The SYNCYTIOTROPHOBLAST is the hormone-producing layer of the placenta — it synthesises hCG, hPL, oestrogen and progesterone. hCG is the basis of pregnancy tests (detected in maternal blood within ~10 days of fertilisation).',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q2
('KRCHN', 'Midwifery', 'Breast Changes in Pregnancy',
 'The physiological changes that occur in the breast at 8–12 weeks gestation include:',
 'Formation of Montgomery''s tubercles, nipple becomes soft and supple',
 'Colostrum can be expressed, formation of primary areola',
 'Prickling tingling sensation, leakage of colostrum',
 'Formation of secondary areola, bluish surface veins',
 'B',
 'Breast changes by trimester: weeks 3-4 → tingling/heaviness; weeks 6-8 → enlargement, tenderness, prominent surface veins; 8-12 WEEKS → MONTGOMERY''S TUBERCLES appear (sebaceous glands on areola become prominent), PRIMARY AREOLA darkens, COLOSTRUM CAN BE EXPRESSED from about 12-16 weeks. Secondary areola (mottled pigmentation around primary areola) appears around 16-20 weeks. The 8-12 week-specific changes are best described as Montgomery''s tubercles and primary areola formation — option B captures this with colostrum expressibility.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q3
('KRCHN', 'Maternal & Child Health', 'Antenatal Care',
 'In focused antenatal care (FANC), the recommended schedule for the four (4) comprehensive personalised antenatal visits is:',
 '1st visit: less than 16 wks, 2nd visit: 16-28 wks, 3rd visit: 28-32 wks, 4th visit: 32-40 wks',
 '1st visit: less than 16 wks, 2nd visit: 16-24 wks, 3rd visit: 24th-34th wks, 4th visit: 34-40 wks',
 '1st visit: less than 16 wks, 2nd visit: 16-24 wks, 3rd visit: 24-32 wks, 4th visit: 32-36 wks',
 '1st visit: less than 16 wks, 2nd visit: 16-28 wks, 3rd visit: 28-34 wks, 4th visit: 34-36 wks',
 'A',
 'Per the WHO/Kenya FANC model, the recommended schedule of 4 ANTENATAL VISITS for low-risk pregnancies was: 1st VISIT <16 weeks; 2nd 16-28 weeks; 3rd 28-32 weeks; 4th 32-40 weeks. Note: WHO 2016 guidelines have since updated this to 8 contacts ("ANC8" model). The Kenya MoH has also moved toward 8 contacts in current practice, but the 4-visit FANC schedule remains the foundational reference for NCK examinations.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q4
('KRCHN', 'Pharmacology', 'Malaria in Pregnancy',
 'The drug of choice in management of severe malaria in pregnancy is:',
 'Sulfadoxine pyramethamine', 'Amodiaquine', 'Quinine', 'Artemether lumefantrine',
 'C',
 'Per WHO and Kenya MoH malaria guidelines: SEVERE malaria in pregnancy was treated with IV QUININE in all trimesters (with careful glucose monitoring — quinine causes hyperinsulinaemia and hypoglycaemia). Current WHO/Kenya guidelines now recommend IV ARTESUNATE as first-line for severe malaria in all trimesters (proven safer and more effective than quinine). SP is used for intermittent presumptive treatment (IPTp); AL is for uncomplicated malaria (avoided in first trimester). The exam-era answer is quinine.',
 'hard', 'approved', 2011, 'Paper 2'),

-- Q5
('KRCHN', 'Midwifery', 'Stages of Labour',
 'The presumptive signs of second stage of labour include:',
 'Uterine action, soft tissue displacement',
 'Rupture of the forewaters, expulsive uterine contractions',
 'Backache, progressive cervical dilation',
 'Show, erratic uterine contractions',
 'B',
 'Second stage of labour (full dilatation to delivery of baby). Presumptive (suggestive but not diagnostic) signs include: RUPTURE of the forewaters (membranes), EXPULSIVE/bearing-down uterine contractions, urge to push, anal dilatation, gaping of the vulva, perineal bulging, appearance of the presenting part. The DEFINITIVE (positive) sign is full cervical dilatation (10 cm) on vaginal examination. Show and progressive dilatation are first-stage features.',
 'medium', 'approved', 2011, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q6
('KRCHN', 'Midwifery', 'Amniotic Fluid',
 'Following rupture of membranes during labour, drainage of golden yellow amniotic fluid could be due to:',
 'Breech presentation', 'Foetal distress', 'Rhesus iso-immunization', 'Previous distress which the fetus overcame',
 'D',
 'Amniotic fluid colour: CLEAR = normal; GREEN/MECONIUM-STAINED = current or recent fetal distress; GOLDEN YELLOW ("old gold") = PREVIOUS fetal distress that the fetus has survived (old meconium that has been broken down/oxidised), or chronic placental insufficiency; PORT WINE/red-brown = abruptio placentae; YELLOW with brown flecks = rhesus iso-immunisation (haemolysis). The "golden yellow" colour is most associated with previous, resolved meconium staining — option D.',
 'hard', 'approved', 2011, 'Paper 2'),

-- Q7
('KRCHN', 'Midwifery', 'Abnormal Labour',
 'When the sagittal suture is found in transverse diameter with both fontanelles palpable during vaginal examination, this is diagnostic of:',
 'Face presentation', 'Brow presentation', 'Deep transverse arrest', 'Vertex presentation',
 'C',
 'In DEEP TRANSVERSE ARREST (occipito-transverse position): the fetal head fails to rotate from the transverse to anterior/posterior position. On vaginal examination, the sagittal suture lies in the transverse diameter of the pelvis, and BOTH the anterior and posterior fontanelles are palpable (because the head is deflexed and neither pole has dropped below the level of the ischial spines). This is an abnormal labour pattern needing rotation (manual, vacuum or forceps) or caesarean section.',
 'hard', 'approved', 2011, 'Paper 2'),

-- Q8
('KRCHN', 'Midwifery', 'Caesarean Section',
 'The definite indications of elective caesarean section are:',
 'Intrauterine growth retardation, antepartum haemorrhage, cephalopelvic disproportion',
 'Placenta praevia type II posterior, cord presentation, diabetes mellitus',
 'Fulminating pregnancy induced hypertension, diabetes mellitus, breech presentation in a primigravida',
 'Placenta praevia Type III, cephalopelvic disproportion, multiple pregnancy with three or more fetuses',
 'D',
 'ABSOLUTE/DEFINITE indications for elective caesarean section: PLACENTA PRAEVIA TYPE III/IV (major praevia — completely covering the os); proven CEPHALOPELVIC DISPROPORTION (CPD); transverse lie; previous classical caesarean or uterine rupture; HIGHER-ORDER MULTIPLE PREGNANCY (triplets or more); some maternal cardiac/HIV conditions; active genital HSV. IUGR, APH, diabetes and breech are RELATIVE indications, not absolute. Cord PROLAPSE (not presentation alone) is an emergency CS indication.',
 'hard', 'approved', 2011, 'Paper 2'),

-- Q9
('KRCHN', 'Midwifery', 'Placental Abnormalities',
 'Presence of a hole in the membranes on examination of a placenta is indicative of:',
 'Velamentous insertion', 'Succenturiate placenta', 'Bipartite placenta', 'Battledore placenta',
 'B',
 'SUCCENTURIATE PLACENTA: an accessory lobe of placental tissue lies separate from the main placenta, connected by blood vessels running through the membranes. After delivery, the main placenta is delivered but the succenturiate lobe may be retained — leaving a HOLE in the membranes (the spot where the vessels passed to the accessory lobe) and vessels ending mid-membrane. This is dangerous because the retained lobe causes postpartum haemorrhage and infection — must be manually removed. VELAMENTOUS = cord inserts on membranes; BATTLEDORE = cord at placental margin; BIPARTITE = two equal lobes joined by membranes.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q10
('KRCHN', 'Midwifery', 'Uterine Physiology in Labour',
 'The muscle layer of the uterus that contracts and retracts during labour to force the fetus into the receptive lower uterine segment is:',
 'Circular layer', 'Middle oblique layer', 'Outer longitudinal layer', 'Endometrial layer',
 'C',
 'The myometrium has 3 layers: OUTER LONGITUDINAL (subserous) — fibres run from cervix up the front, over the fundus, down the back of the uterus — these CONTRACT and RETRACT during labour, shortening progressively to expel the fetus and create the upper segment; MIDDLE OBLIQUE (figure-of-eight around blood vessels) — "living ligatures" that compress vessels after delivery to control bleeding; INNER CIRCULAR — concentrated at internal os, holds the cervix closed in pregnancy. The endometrium is not muscle. Hence C for fetal expulsion.',
 'medium', 'approved', 2011, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q11
('KRCHN', 'Paediatric Nursing', 'Post-term Infant',
 'The characteristics of a post term infant include:',
 'Loose, dry, desquamating skin, small fontanelles, narrow sutures',
 'Worried look, firm skull bones, wrinkled skin',
 'Soft flat pinna, overgrown nails, dry loose skin',
 'Wide fontanelles, soft skull bones, narrow suture',
 'A',
 'POST-TERM/POST-MATURE infant (>42 weeks gestation, especially with placental insufficiency): LOOSE, DRY, DESQUAMATING/peeling skin (no vernix), often meconium-stained; long FINGERNAILS extending beyond fingertips; abundant hair on head; loss of subcutaneous fat ("old man" appearance); SMALL FONTANELLES and NARROW SUTURES (firm skull bones — already ossified); long thin body. Option A best describes the post-term infant.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q12
('KRCHN', 'Paediatric Nursing', 'Neonatal Respiratory Distress',
 'The classical signs of respiratory distress syndrome in a neonate are:',
 'Metabolic acidosis, tachycardia, hypoxaemia',
 'Cyanosis, respiratory acidosis, atelectasis',
 'Nasal flaring, chest indrawing, bradypnoea',
 'Tachypnoea, expiratory grunting, intercostal and substernal recession',
 'D',
 'Neonatal RDS (hyaline membrane disease, surfactant deficiency, mainly in preterms) presents within minutes-hours of birth with the classic Silverman-Andersen signs: TACHYPNOEA (>60/min — NOT bradypnoea), EXPIRATORY GRUNTING (closing glottis against expiration to maintain functional residual capacity), nasal flaring, INTERCOSTAL AND SUBSTERNAL RECESSION/retractions, see-saw chest-abdomen movement, cyanosis. Treatment: CPAP, surfactant replacement, oxygen, antenatal corticosteroids if anticipated preterm delivery.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q13
('KRCHN', 'Paediatric Nursing', 'Neonatal Feeding',
 'The amount of feed to be given to an infant born at 34 weeks gestation and weighing 1800 grams on day one will be:',
 '108 mls', '144 mls', '164 mls', '180 mls',
 'A',
 'Day-1 feed requirement for preterm/LBW infants per Kenya Basic Paediatric Protocols is approximately 60 mL/kg/day (rising by ~20 mL/kg/day until ~150-180 mL/kg/day by day 5-7). For an 1800 g (1.8 kg) baby on day 1: 60 mL × 1.8 kg = 108 mL/day, given as 3-hourly feeds. The answer 108 mL is option A. Higher daily totals (144, 164, 180 mL) correspond to days 3-5 as feeds are increased.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q14 (matching converted to MCQ)
('KRCHN', 'Paediatric Nursing', 'Neonatal Head Injuries',
 'Which of the following correctly distinguishes cephalohaematoma from caput succedaneum?',
 'Cephalohaematoma crosses suture lines and is present at birth; caput succedaneum is limited by suture lines',
 'Cephalohaematoma is blood between the pericranium and skull, limited by suture lines; caput succedaneum is oedema of tissues superficial to the pericranium',
 'Both cephalohaematoma and caput succedaneum are present at birth and cross suture lines',
 'Caput succedaneum is blood between the pericranium and skull; cephalohaematoma is scalp oedema',
 'B',
 'CEPHALOHAEMATOMA: subperiosteal collection of BLOOD lying between the PERICRANIUM (periosteum) and the SKULL bone — therefore LIMITED BY SUTURE LINES (does not cross them), develops over hours after birth, firm, slow to resolve (weeks-months), may cause jaundice; rarely needs intervention. CAPUT SUCCEDANEUM: OEDEMA of soft tissues SUPERFICIAL to the pericranium (scalp tissue oedema from pressure during labour) — therefore CROSSES SUTURE LINES, present AT birth, soft and pitting, resolves in 1-3 days.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q15
('KRCHN', 'Community Health Nursing', 'Vital Registration',
 'The registration of the birth of an infant is primarily the responsibility of:',
 'Mother or father of the child', 'Health worker (midwife/doctor)', 'Sub chief', 'Any person present at birth',
 'A',
 'Per Kenya''s Births and Deaths Registration Act, the PARENTS (father, mother, or both) bear the PRIMARY legal responsibility for registering a birth — within 6 months for free registration. For births in health facilities, the facility issues a notification and the parents complete registration at the civil registrar''s office. For home births, the chief/assistant chief/village elder issues a notification. Late registration attracts penalties. The 2009 census and the Vital Statistics system depend on universal civil registration.',
 'easy', 'approved', 2011, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q16
('KRCHN', 'Midwifery', 'Puerperal Sepsis',
 'Puerperal sepsis should always be suspected when a mother has:',
 'Foul smelling discharge, abdominal tenderness, adnexal tenderness',
 'Septic wound, odourless discharge, urinary tract infection',
 'Breast infection, urinary tract infection, abdominal tenderness',
 'Maternal tachycardia, purulent discharge from genital tract, septic wound',
 'A',
 'PUERPERAL SEPSIS is infection of the genital tract within 42 days of delivery. WHO criteria for diagnosis include: fever ≥38.5°C, PELVIC PAIN, ABNORMAL/FOUL VAGINAL DISCHARGE (offensive lochia), abnormal uterine sub-involution, ABDOMINAL/UTERINE TENDERNESS, sometimes adnexal tenderness (if parametritis/salpingitis). Wound infection, mastitis and UTI are POSSIBLE sources of puerperal sepsis but are SEPARATE entities. Option A captures the diagnostic features of genital tract sepsis itself.',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q17
('KRCHN', 'Mental Health Nursing', 'Postnatal Mental Health',
 'Characteristics of postnatal depression include:',
 'Mother is not able to sleep and feels tired and exhausted throughout despite adequate periods of rest',
 'Mother feels well in the morning, and becomes worse as the day goes on',
 'Mother is not able to sleep but is active the rest of the day',
 'Mother feels worse in the morning, and improves as the day goes on',
 'D',
 'POSTNATAL DEPRESSION (PND) follows the pattern of major depression with DIURNAL VARIATION: symptoms (low mood, anhedonia, lack of energy) are CLASSICALLY WORSE IN THE MORNING and improve as the day progresses. Other features: early-morning waking with inability to fall back asleep, loss of appetite, feelings of worthlessness/guilt, inability to bond with baby, intrusive thoughts of harming self/baby. Onset typically 2-8 weeks postpartum; lasts ≥2 weeks; needs screening (EPDS) and treatment (psychotherapy ± SSRIs).',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q18
('KRCHN', 'Maternal & Child Health', 'Family Planning',
 'Family planning options used during the immediate post partum period include:',
 'Combined oral contraceptives, bilateral tubal ligation, intrauterine device',
 'Progesterone only contraceptive, lactational amenorrhoea method, intra-uterine device',
 'Combined oral contraceptives, progesterone only contraceptive, voluntary surgical contraception',
 'Voluntary surgical contraception, lactational amenorrhoea method, intra-uterine device',
 'B',
 'IMMEDIATE postpartum contraception (especially for breastfeeding mothers): PROGESTOGEN-ONLY methods (POPs/Microlut, DMPA/Depo, implants/Jadelle, Implanon) — safe in breastfeeding (no oestrogen, do not affect milk supply); LACTATIONAL AMENORRHOEA METHOD (LAM) — exclusive breastfeeding + amenorrhoea + baby <6 months provides 98% protection; INTRAUTERINE DEVICE (IUD, Copper-T) — can be inserted within 48 hours of delivery or after 4-6 weeks. COMBINED ORAL CONTRACEPTIVES are AVOIDED in breastfeeding until 6 months (suppress milk supply).',
 'medium', 'approved', 2011, 'Paper 2'),

-- Q19
('KRCHN', 'Maternal & Child Health', 'Maternal Mortality',
 'The direct causes of maternal mortality include:',
 'Malaria, HIV/AIDS, ruptured uterus',
 'Haemorrhage, sepsis, complications of induced abortion',
 'Tuberculosis, anemia, malaria',
 'Pre-eclampsia, haemorrhage, anaemia',
 'B',
 'DIRECT maternal deaths result from obstetric complications of the pregnancy state, interventions, omissions, or incorrect treatment. Classic direct causes: HAEMORRHAGE (antepartum and postpartum), SEPSIS (puerperal, septic abortion), HYPERTENSIVE DISORDERS (pre-eclampsia/eclampsia), OBSTRUCTED LABOUR (ruptured uterus), UNSAFE/COMPLICATIONS OF INDUCED ABORTION, embolism. INDIRECT causes = pre-existing diseases worsened by pregnancy: anaemia, malaria, HIV/AIDS, tuberculosis, cardiac disease. Option B names three pure direct causes.',
 'easy', 'approved', 2011, 'Paper 2'),

-- Q20
('KRCHN', 'Maternal & Child Health', 'Immunisation and Pharmacology in Pregnancy',
 'Which of the following statements about birth polio and streptomycin is CORRECT?',
 'Birth polio can be given at 3 weeks of age; streptomycin does NOT cause fetal deafness',
 'Birth polio must be given within 2 weeks of birth; streptomycin can cause deafness to the unborn baby',
 'Birth polio can be given at any time in the first 6 months; streptomycin can cause deafness to the unborn baby',
 'Birth polio must be given within 2 weeks of birth; streptomycin does NOT cause fetal deafness',
 'B',
 'Per Kenya Expanded Programme on Immunisation (KEPI) schedule, BIRTH POLIO (OPV0) is given within the FIRST 2 WEEKS of life. After 14 days the birth dose is no longer effective and is skipped; the baby joins the routine schedule (OPV1 at 6 weeks). STREPTOMYCIN and other aminoglycosides (gentamicin, kanamycin) cross the placenta and are OTOTOXIC to the fetus, causing eighth nerve damage and SENSORINEURAL DEAFNESS. Therefore aminoglycosides are AVOIDED in pregnancy unless absolutely necessary.',
 'medium', 'approved', 2011, 'Paper 2');

-- ─── KRCHN Paper 2 — August 2012 ─────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q1
('KRCHN', 'Midwifery', 'Placental Physiology',
 'The trophoblastic layer responsible for nourishing the growing organism during embedment process is:',
 'Mesoderm', 'Syncytiotrophoblast', 'Cytotrophoblast', 'Ectoderm',
 'B',
 'During implantation (embedment, ~6-7 days post-fertilisation), the outer SYNCYTIOTROPHOBLAST invades the maternal endometrium, erodes maternal capillaries, and forms lacunae filled with maternal blood — this provides nutrients and oxygen to the developing embryo (haemotrophic nutrition). The syncytiotrophoblast is also the hormone-producing layer. The cytotrophoblast lies underneath and provides the cellular reservoir. Mesoderm and ectoderm are embryonic germ layers, not trophoblastic.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q2
('KRCHN', 'Midwifery', 'Weight Gain in Pregnancy',
 'Client Mi''s weight is 50 kgs at 20 weeks gestation. At 36 weeks she will weigh approximately:',
 '58 kgs', '60 kgs', '62 kgs', '64 kgs',
 'B',
 'Expected weight gain in pregnancy averages ~0.5 kg/week from week 20 onwards. From 20 to 36 weeks = 16 weeks × 0.5 kg/week = ~8 kg gain. 50 + 8 = 58 kg minimum. The typical answer including the slightly higher rate during mid-pregnancy is ~10 kg gain = 60 kg. The exam-expected answer is B (60 kg), reflecting standard expected gain. Total pregnancy gain target ~11-16 kg for normal BMI.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q3
('KRCHN', 'Midwifery', 'Vaginal Discharge in Pregnancy',
 'Mrs Ra, para 0+0 gravida 1 visits antenatal clinic with complaints of increased vaginal discharge. The specific intervention would include:',
 'Advice her to bring her partner for investigations, perform urinalysis',
 'Exclude possibility of infection, advice on hygiene',
 'Advice her to start douching, commence antifungal treatment',
 'Advice her to avoid tight inner wears, commence antibacterial therapy',
 'B',
 'Increased vaginal discharge in pregnancy is usually PHYSIOLOGICAL (leucorrhoea — from oestrogen-induced increased cervical mucus and vaginal transudate). The midwife should first EXCLUDE INFECTION (Candida, bacterial vaginosis, trichomoniasis, STIs — speculum examination, wet mount, high vaginal swab if indicated) and only treat if infection confirmed. ADVISE ON HYGIENE: cotton underwear, avoid douching (alters vaginal flora, predisposes to infection), avoid scented soaps. Empirical antifungal or antibacterial therapy without diagnosis is inappropriate.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q4
('KRCHN', 'Pharmacology', 'Magnesium Sulphate Toxicity',
 'The immediate action that should be taken when a mother develops respiratory distress after administration of magnesium sulphate is:',
 'Summon for help, give atropine',
 'Give oxygen 4 litres/min, prop up the patient',
 'Summon for help, administer 10 mls of 10% calcium gluconate i.v. slowly',
 'Prop up the patient, summon for help',
 'C',
 'Magnesium sulphate toxicity (in eclampsia management) presents progressively: loss of patellar reflex (Mg ~10 mEq/L), then RESPIRATORY DEPRESSION (~15 mEq/L) → cardiac arrest. The ANTIDOTE is intravenous CALCIUM GLUCONATE 10 mL of 10% solution given slowly IV over 10 minutes (1 g calcium) — calcium directly displaces magnesium at the neuromuscular junction. Concurrently: STOP the magnesium infusion, summon help, support ventilation, monitor closely. Routine monitoring during MgSO4 — reflexes, RR ≥12, urine output ≥30 mL/hr — prevents toxicity.',
 'hard', 'approved', 2012, 'Paper 2'),

-- Q5
('KRCHN', 'Nutrition', 'Diabetes and Breastfeeding',
 'The daily carbohydrate requirements for a Type 2 diabetes mellitus mother should be increased after delivery by:',
 '10–20 gms', '20–30 gms', '30–40 gms', '40–50 gms',
 'B',
 'Breastfeeding women have increased energy and carbohydrate demands — approximately an extra 500 kcal/day or about 20-30 g additional carbohydrate/day to support milk production (lactose synthesis). For a diabetic mother this needs careful insulin dose adjustment downward (insulin requirements drop dramatically after delivery — by 50% or more in T1DM) while adjusting carbohydrate intake upward for lactation. Option B (20-30 g) is the standard incremental allowance.',
 'hard', 'approved', 2012, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q6
('KRCHN', 'Maternal & Child Health', 'PMTCT',
 'The appropriate interventions to minimize mother to child transmission of HIV during vaginal delivery include:',
 'Avoid perineal tears, wipe the baby immediately',
 'Avoid artificial rupture of membranes, rule out urinary tract infection',
 'Shorten time during which membranes are ruptured to less than 4 hours, use chlorhexidine for vulval and vaginal cleaning before vaginal examination',
 'Minimize number of vaginal examinations, rule out urinary tract infection',
 'C',
 'Intrapartum PMTCT measures (per Kenya PMTCT/WHO guidelines): MINIMISE DURATION OF RUPTURED MEMBRANES (ideally <4 hours — higher transmission risk with prolonged ROM); AVOID artificial rupture of membranes unless indicated; AVOID invasive monitoring (fetal scalp electrodes, fetal blood sampling); MINIMISE vaginal examinations; CHLORHEXIDINE vaginal cleansing before exams reduces vertical transmission; avoid routine episiotomy; if available, elective CS at 38 weeks for women with high viral load. Maternal ART throughout pregnancy is the most important factor. Option C captures the two most specific intrapartum interventions.',
 'hard', 'approved', 2012, 'Paper 2'),

-- Q7
('KRCHN', 'Midwifery', 'Partograph Use',
 'The importance of assessing the state of the cervix during labour is:',
 'To determine adequacy of the pelvis',
 'For accurate measurement of the cervix',
 'To determine fetal presentation',
 'To determine if the woman meets criteria for implementation of partogram',
 'D',
 'Per WHO/Kenya labour management, the PARTOGRAM (partograph) is started ONCE THE WOMAN IS IN ACTIVE PHASE of labour — defined by cervical DILATATION ≥ 4 cm (older criteria) or ≥ 5 cm (current WHO 2018 update) with regular contractions. Cervical assessment is therefore the gateway to partogram use. The partogram tracks progress (cervical dilatation, descent, contractions), fetal wellbeing (heart rate, membranes, moulding) and maternal wellbeing (pulse, BP, temperature, urine) and prompts action when alert/action lines are crossed.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q8
('KRCHN', 'Midwifery', 'Fetal Distress Management',
 'On diagnosis of fetal distress, the fluid of choice to administer is:',
 '1 litre of 5% dextrose for 30 minutes, then evaluate foetal well being',
 '500 mls of 10% dextrose for one hour, followed by 500 mls of normal saline',
 '1 litre of normal saline for 30 minutes, then evaluate foetal heart rate',
 '50 mls of 50% dextrose as bolus then 5% dextrose for two hours',
 'C',
 'INTRAUTERINE RESUSCITATION for fetal distress: position mother LEFT LATERAL (relieves caval compression), give 100% OXYGEN by mask, STOP oxytocin if running, give a CRYSTALLOID FLUID BOLUS — typically 1 LITRE OF NORMAL SALINE (or Ringer''s lactate) over 20-30 minutes to improve uteroplacental perfusion. Treat hypotension. Re-evaluate fetal heart pattern; if no improvement, proceed to urgent delivery. Dextrose solutions are AVOIDED — they cause fetal hyperglycaemia, hyperinsulinaemia and neonatal hypoglycaemia/acidosis.',
 'hard', 'approved', 2012, 'Paper 2'),

-- Q9
('KRCHN', 'Midwifery', 'Epidural Anaesthesia',
 'Following administration of epidural anaesthesia during labour, the blood pressure should be recorded every:',
 '5 minutes for the initial 20 minutes, then at 15 minutes interval',
 '10 minutes for the first 2 hours, then half hourly',
 '15 minutes until the anaesthesia wears off',
 '10 minutes until the blood pressure reading is satisfactory',
 'A',
 'Epidural anaesthesia causes SYMPATHETIC BLOCKADE → vasodilation → hypotension (common in obstetric epidurals). Standard monitoring: BP every 5 MINUTES for the first 15-20 MINUTES after epidural insertion or top-up dose (the period of maximum risk of hypotension), then every 15 minutes thereafter. Continuous CTG monitoring. Pre-loading with 500-1000 mL crystalloid reduces hypotension risk. Treat hypotension with left lateral tilt, IV fluids, and ephedrine if needed.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q10
('KRCHN', 'Midwifery', 'Uterine Rupture',
 'Mrs. Wi a previous caesarean section mother para 2+0 gravida 3 comes to your health facility at 36 weeks gestation with complaints of intermittent right abdominal pain for three days. The probable diagnosis would be:',
 'Ruptured abdominal ectopic pregnancy',
 'Impending rupture of uterus',
 'Silent rupture of the uterus',
 'Acute abdomen',
 'B',
 'In a multipara with previous caesarean section, scar dehiscence/rupture is a major concern. PRESENTATION: scar tenderness — INTERMITTENT or persistent pain over the previous CS scar (lower abdomen, often right side or scar line); occurs late pregnancy or during labour; if untreated progresses to uterine rupture with maternal shock, fetal distress and death. "Impending rupture" is the warning phase — the woman is alert, vital signs may be normal, scar is tender. Action: urgent admission, IV access, blood preparation, monitor closely, plan elective/early CS.',
 'hard', 'approved', 2012, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q11 (True/False converted)
('KRCHN', 'Midwifery', 'Twin Delivery',
 'Which of the following statements about twin delivery management is CORRECT?',
 'After delivery of the 1st twin, if presentation is cephalic, encourage pushing — TRUE; After 2nd twin, wait for placental separation before giving uterotonic — TRUE',
 'After delivery of the 1st twin, if presentation is cephalic, encourage pushing — TRUE; After 2nd twin, wait for placental separation before giving uterotonic — FALSE',
 'After delivery of the 1st twin, if presentation is cephalic, encourage pushing — FALSE; After 2nd twin, wait for placental separation before giving uterotonic — TRUE',
 'After delivery of the 1st twin, if presentation is cephalic, encourage pushing — FALSE; After 2nd twin, wait for placental separation before giving uterotonic — FALSE',
 'B',
 'After delivery of the first twin: abdominal exam confirms longitudinal lie of twin 2; if cephalic and engaged, gentle pushing/oxytocin can establish contractions for vaginal delivery — TRUE. After delivery of the SECOND TWIN, OXYTOCIC (10 IU oxytocin IM or as IV infusion) is given IMMEDIATELY (with the anterior shoulder of the second twin or after delivery of the baby) — DO NOT wait for placental separation. Twin pregnancies have a markedly higher risk of PPH (due to overdistended uterus), so active management of the third stage with immediate oxytocics is mandatory — FALSE to wait.',
 'hard', 'approved', 2012, 'Paper 2'),

-- Q12
('KRCHN', 'Paediatric Nursing', 'Neonatal Home Visit',
 'The physical examination done on a newborn baby during a home visit on 3rd day of life includes:',
 'Temperature, respiration, skin turgor and jaundice',
 'Breast engorgement, weight gain, range of movement',
 'Pus swab for culture and sensitivity, feeding pattern, wake and sleep pattern',
 'Ecchymotic mark, colour and odour of stool, weight gain',
 'A',
 'Day-3 home visit newborn examination focuses on the COMMONEST PROBLEMS AT THIS AGE: TEMPERATURE (sepsis, hypothermia — leading neonatal killer), RESPIRATION (rate, retractions — pneumonia/sepsis signs), SKIN TURGOR/hydration (feeding adequacy, dehydration), JAUNDICE (physiological jaundice peaks day 3-5 — assess level/severity and look for danger signs); plus feeding, cord examination, eyes, weight. Option A lists the four core day-3 assessments.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q13
('KRCHN', 'Paediatric Nursing', 'APGAR Score',
 'The Apgar score for the baby born at term with heart rate 110 bpm, gasping respiration, blue extremities, some flexion of limbs and minimal grimace at 1 minute is:',
 '10', '8', '6', '4',
 'C',
 'APGAR scoring (each 0, 1 or 2): APPEARANCE (skin colour) — blue extremities, body pink = 1; PULSE — HR 110 (>100) = 2; GRIMACE (reflex irritability) — minimal grimace = 1; ACTIVITY (muscle tone) — some flexion = 1; RESPIRATION — gasping (slow, irregular) = 1. Total = 1+2+1+1+1 = 6. APGAR 4-6 at 1 min = moderately depressed (needs resuscitation/stimulation); APGAR <4 severe depression; APGAR 7-10 normal.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q14
('KRCHN', 'Paediatric Nursing', 'Neonatal Feeding',
 'The amount of 3 hourly feeds appropriate for a baby whose weight is 1600 grams on day two is:',
 '12 mls', '14 mls', '16 mls', '18 mls',
 'C',
 'Preterm/LBW feeding (per Kenya Basic Paediatric Protocols): Day 1 = 60 mL/kg/day; Day 2 = 80 mL/kg/day; Day 3 = 100; Day 4 = 120; Day 5 = 140; Day 6 = 150; Day 7+ = 160-180 mL/kg/day. Day 2 for 1.6 kg baby = 80 × 1.6 = 128 mL/day. 3-hourly feeds = 8 feeds/day = 128 / 8 = 16 mL per feed. Answer C.',
 'hard', 'approved', 2012, 'Paper 2'),

-- Q15 (matching converted)
('KRCHN', 'Paediatric Nursing', 'Haematological Conditions',
 'Which of the following correctly describes hereditary spherocytosis?',
 'Caused by fragile red blood cells due to membrane protein defects',
 'Caused by G6PD enzyme deficiency leading to oxidative haemolysis',
 'Caused by abnormal haemoglobin chains',
 'Caused by iron deficiency leading to microcytic anaemia',
 'A',
 'HEREDITARY SPHEROCYTOSIS: defect in red-cell membrane proteins (spectrin, ankyrin) causes the RBC to assume a sphere shape — these spherocytes are osmotically fragile and trapped/destroyed in the spleen, causing haemolytic anaemia, jaundice, splenomegaly, gallstones. G6PD deficiency: X-linked enzyme deficiency; G6PD normally produces NADPH which MAINTAINS INTEGRITY of the RBC against oxidative stress; deficient cells haemolyse on exposure to oxidants (fava beans, primaquine, sulpha drugs, infection). Common cause of neonatal jaundice in Africa/Mediterranean.',
 'hard', 'approved', 2012, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q16
('KRCHN', 'Paediatric Nursing', 'Small for Gestational Age',
 'The common complications of a light for dates baby include:',
 'Polycythaemia, congenital abnormalities, fetal alcohol syndrome',
 'Infection, meconium aspiration, hypoglycaemia',
 'Twin to twin transfusion, asphyxia, poor temperature control',
 'Polycythemia, meconium aspiration, twin to twin transfusion',
 'B',
 'Light-for-dates / small-for-gestational-age (SGA) babies (birth weight <10th centile) face the consequences of intrauterine growth restriction (IUGR) and placental insufficiency: HYPOGLYCAEMIA (low glycogen stores), HYPOTHERMIA (low fat, large surface area), MECONIUM ASPIRATION (chronic hypoxia → in-utero passage of meconium), perinatal ASPHYXIA, polycythaemia (chronic hypoxia → ↑erythropoietin), INFECTION (reduced immune competence), poor feeding, increased mortality. Option B captures three core complications. Twin-twin transfusion is specific to monozygotic monochorionic twin pregnancies.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q17
('KRCHN', 'Midwifery', 'Postnatal Care',
 'The immediate interventions following development of urine retention after delivery include:',
 'Running tap water, sitting in a bath tub',
 'Catheterization, administering analgesics',
 'Applying warm compresses on perineum, catheterization',
 'Sitz bath, applying warm compresses on perineum',
 'D',
 'Postpartum urinary retention is common after vaginal delivery (perineal oedema/trauma, epidural effects, bladder atony). FIRST-LINE conservative measures: PRIVACY, AMBULATION, sounds of RUNNING WATER, warm SITZ BATH or warm COMPRESSES to the perineum (promote relaxation of perineal muscles and urethral sphincter), pouring warm water over the vulva while she tries to void, encouraging adequate oral fluids and timed voiding. If conservative measures fail → catheterisation (in-out or short-term indwelling). Option D captures the conservative first-line approach.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q18
('KRCHN', 'Midwifery', 'Postnatal Care',
 'The role of the midwife in relieving after pain during puerperium includes:',
 'Administering appropriate analgesics, restricting ambulation',
 'Encouraging bed rest, advising the mother not to breastfeed until pains reduce',
 'Administering an enema, restricting ambulation',
 'Encouraging frequent urination, administering appropriate analgesics',
 'D',
 'Afterpains (uterine cramping during puerperal involution, particularly during breastfeeding due to oxytocin release) are managed by: APPROPRIATE ANALGESIA (paracetamol; mefenamic acid/ibuprofen are particularly effective for uterine cramps); FREQUENT URINATION (a FULL BLADDER displaces the uterus and worsens afterpains — keep bladder empty); ambulation is ENCOURAGED (improves involution, prevents DVT — not restricted); breastfeeding should CONTINUE (afterpains accompany breastfeeding but breastfeeding promotes involution). Most afterpains settle by day 4-5.',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q19
('KRCHN', 'Maternal & Child Health', 'Vital Statistics',
 'Still births and deaths that occur in the first week of life are classified as:',
 'Neonatal deaths', 'Fresh still births', 'Perinatal deaths', 'Infant deaths',
 'C',
 'PERINATAL PERIOD encompasses stillbirths (fetal deaths from 28 weeks gestation in WHO standard, or 22 weeks in extended definition) plus EARLY NEONATAL DEATHS (death within the first 7 completed days of life). Perinatal mortality rate is a key indicator of obstetric and neonatal care quality. NEONATAL deaths = first 28 days; INFANT deaths = first year; FRESH stillbirths = baby died <12 hr before delivery (skin intact).',
 'medium', 'approved', 2012, 'Paper 2'),

-- Q20
('KRCHN', 'Maternal & Child Health', 'Family Planning',
 'A postnatal mother who seeks contraception at 6 weeks postpartum and still breastfeeding should be advised to use:',
 'Intrauterine copper device, logynon',
 'Microlut, intrauterine copper device',
 'Jadelle, microgynon',
 'Minipill, logynon',
 'B',
 'Breastfeeding-friendly contraception at 6 weeks postpartum: PROGESTOGEN-ONLY methods (MICROLUT — POP, mini-pill; DMPA injection; JADELLE/Implanon implants) — no oestrogen, safe for milk supply; COPPER IUD (non-hormonal, safe immediately or after 4-6 weeks). AVOIDED in breastfeeding: COMBINED oestrogen-containing pills like LOGYNON, MICROGYNON, NORDETTE — these suppress milk supply and are contraindicated until weaning or 6 months. Option B — Microlut (POP) + Copper IUD — both safe. Jadelle in option C is safe, but microgynon is not.',
 'medium', 'approved', 2012, 'Paper 2');

-- ─── KRCHN Paper 2 — July 2014 ───────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q1
('KRCHN', 'Midwifery', 'Pelvic Anatomy',
 'The diameter of the pelvic brim that plays a role in determining the outcome of occipito posterior position is:',
 'Transverse', 'Oblique', 'Obstetric conjugate', 'Sacrocotyloid',
 'D',
 'In occipito-posterior (OP) position, the fetal head occupies the SACROCOTYLOID DIAMETER (from the sacro-iliac joint to the iliopectineal eminence on the opposite side — about 9.5 cm) — narrow space. If this diameter is contracted, descent and rotation are impeded, leading to deep transverse arrest or persistent OP. The OBSTETRIC CONJUGATE (anteroposterior — sacral promontory to back of symphysis pubis, 11 cm) is the most important for ALL labours but not the specific one tested in OP. Hence the answer is D sacrocotyloid.',
 'hard', 'approved', 2014, 'Paper 2'),

-- Q2
('KRCHN', 'Anatomy & Physiology', 'Reproductive Physiology',
 'The hormone responsible for rise in temperature immediately after ovulation is:',
 'Oestrogen', 'Luteinizing hormone', 'Follicle stimulating hormone', 'Progesterone',
 'D',
 'After ovulation, the corpus luteum secretes PROGESTERONE, which has a THERMOGENIC effect — basal body temperature rises by about 0.3-0.5°C and remains elevated throughout the luteal phase. This biphasic temperature pattern is the basis of FERTILITY AWARENESS METHODS (BBT charting). LH SURGE triggers ovulation but the temperature rise is from luteal progesterone. Oestrogen lowers BBT slightly in the follicular phase.',
 'easy', 'approved', 2014, 'Paper 2'),

-- Q3
('KRCHN', 'Midwifery', 'Diagnosis of Pregnancy',
 'The positive signs of pregnancy include:',
 'Visualization of fetus by x-ray at 16 weeks, foetal heart sound by Doppler at 5+ weeks',
 'Visualization of gestational sac by trans-vaginal ultrasound at 4-5 weeks, foetal heart sound by foetal scope at 20 weeks',
 'Uterine souffle at 12-16 weeks, Braxton Hicks at 16 weeks',
 'Visualization of foetal pulsation by trans-abdominal ultrasound at 5 weeks, foetal heart sound by foetal scope at 16+ weeks',
 'B',
 'POSITIVE (definitive) signs of pregnancy: (1) FETAL HEART AUSCULTATION — by Doppler from ~10-12 weeks, by Pinard fetal scope from 20-24 weeks; (2) FETAL MOVEMENTS palpable by examiner from ~20 weeks; (3) ULTRASOUND visualisation of GESTATIONAL SAC (4-5 weeks trans-vaginal, 5-6 weeks trans-abdominal) and fetal cardiac activity (from 6 weeks). Option B names two valid positive signs with correct timings. Uterine souffle and Braxton Hicks are PROBABLE signs, not positive.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q4
('KRCHN', 'Midwifery', 'Expected Date of Delivery',
 'Mrs. Y comes for her first antenatal clinic. On history taking her last menstrual period was 25.4.2011. Her expected date of confinement will be:',
 '1.2.2012', '2.2.2012', '3.3.2012', '4.3.2012',
 'B',
 'NAEGELE''S RULE for calculating expected date of delivery (EDD): add 7 days to the first day of the last menstrual period, subtract 3 months, add 1 year. LMP = 25.4.2011. Add 7 days → 2.5.2011. Subtract 3 months → 2.2.2011. Add 1 year → 2.2.2012. By strict Naegele''s rule, the correct date is 2.2.2012, option B.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q5
('KRCHN', 'Medical-Surgical Nursing', 'Diabetes Mellitus',
 'The effects of diabetes mellitus on pregnancy include:',
 'Nausea and vomiting, ketosis',
 'Glycosalated haemoglobin, reduced fertility rate',
 'Urinary tract infection, neuropathy',
 'Blindness, polycythaemia',
 'C',
 'Effects of DM on pregnancy: URINARY TRACT INFECTIONS (glycosuria → bacterial growth medium); pyelonephritis; pregnancy-induced hypertension/pre-eclampsia (×4 risk); polyhydramnios; preterm labour; macrosomia or IUGR; congenital abnormalities (cardiac, neural tube, caudal regression) if poor glycaemic control at conception; spontaneous abortion; worsening retinopathy and NEPHROPATHY; neuropathy. Maternal hypoglycaemic episodes; DKA. Fetal/neonatal: stillbirth, RDS, hypoglycaemia, jaundice, hypocalcaemia, polycythaemia. Option C names two recognised maternal effects.',
 'medium', 'approved', 2014, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q6
('KRCHN', 'Midwifery', 'Episiotomy',
 'The definite indications for an episiotomy include:',
 'Tight perineum, first delivery',
 'Scarring from female genital cutting, foetal distress',
 'Multiple pregnancies, foetal distress',
 'Rigid perineum, preterm baby',
 'B',
 'RESTRICTIVE (definite) indications for episiotomy: maternal — RIGID/scarred PERINEUM (e.g., previous Female Genital Mutilation/Cutting), perineum about to tear catastrophically; fetal — FETAL DISTRESS requiring expedited delivery, shoulder dystocia (provides room for manoeuvres), instrumental delivery (forceps/vacuum). Episiotomy is NO LONGER routine for first delivery (WHO and Kenya MoH discourage routine episiotomy — restrictive use is associated with less perineal trauma overall). Option B lists two valid current indications.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q7
('KRCHN', 'Midwifery', 'Postpartum Haemorrhage',
 'Mrs. K. begins to bleed heavily immediately after delivery of the baby. In sequence, your actions as a midwife would be:',
 'Call for help, make rapid evaluation of Mrs K''s general condition, massage uterus, give oxytocin 10 I.U.',
 'Massage uterus give oxytocin 20 I.U, perform urinary bladder catheterization, take blood to rule out blood disorders',
 'Call for help, perform urinary bladder catheterization, deliver placenta, examine birth canal',
 'Start I.V. line with crystalloids, deliver placenta if in-situ, examine birth canal, give ergometrine 0.5mg I.V. stat',
 'A',
 'Immediate PPH management — systematic approach: (1) CALL FOR HELP (resuscitation requires a team); (2) RAPID ASSESSMENT (ABC — airway, breathing, circulation; vital signs; level of consciousness; estimated blood loss); (3) Determine the cause (4 Ts — TONE atonic uterus, TRAUMA lacerations, TISSUE retained placenta/clots, THROMBIN coagulopathy); for atonic uterus — UTERINE MASSAGE/bimanual compression, OXYTOCIN 10 IU IM/slow IV; ergometrine if oxytocin fails (CI in HTN); misoprostol; tranexamic acid; (4) IV access (2 large-bore), crystalloids, blood. Option A starts with the correct sequence.',
 'hard', 'approved', 2014, 'Paper 2'),

-- Q8
('KRCHN', 'Midwifery', 'Shoulder Dystocia',
 'In the course of managing 2nd stage of labour, you realize that after delivery of the head, it tries to return in the vagina. Your immediate action in sequence would be:',
 'Apply McRoberts Manoeuvre, perform episiotomy, apply supra-pubic pressure, apply Rubin''s Manoeuvre, apply Woods Manoeuvre',
 'Reassure the mother/partner summon for help, perform an episiotomy, change position of the mother, attempt Rubin''s Manoeuvre',
 'Summon for help, reassure Mother and partner, attempt change of position, apply McRoberts Manoeuvre, apply supra-pubic pressure',
 'Summon for help, attempt Rubin''s Manoeuvre, apply supra-pubic pressure, attempt Woods Manoeuvre, give an episiotomy',
 'C',
 'The "TURTLE SIGN" (head retracting against the perineum after delivery) is pathognomonic of SHOULDER DYSTOCIA. Management algorithm (HELPERR): H — Call for HELP (announce dystocia, recruit team); E — EVALUATE for episiotomy (consider but not always needed); L — LEGS into McRoberts (hyperflexion of thighs); P — Suprapubic PRESSURE; E — ENTER manoeuvres (Rubin II, Woods screw, reverse Woods); R — REMOVE the posterior arm; R — ROLL the mother to all fours (Gaskin). Option C most closely matches this sequence: summon help, reassure, position change, McRoberts, suprapubic pressure.',
 'hard', 'approved', 2014, 'Paper 2'),

-- Q9 (matching converted)
('KRCHN', 'Midwifery', 'Uterine Physiology in Labour',
 'Which of the following correctly describes fundal dominance in labour?',
 'Contractions start at the lower uterine segment and spread upward',
 'Contractions last longer and are more intense at the fundus, with the peak reached simultaneously over the whole uterus',
 'Contractions are equal in intensity throughout the uterus',
 'Contractions start at the fundus but are strongest in the lower uterine segment',
 'B',
 'FUNDAL DOMINANCE: contractions in normal labour BEGIN at the fundus, are STRONGEST AND LAST LONGEST at the fundus, but the contraction peaks SIMULTANEOUSLY across the whole uterus — this ensures the fundus pushes downward against the relaxed lower segment to deliver the fetus. RETRACTION RING: the physiological RIDGE marking the junction between the actively contracting/retracting UPPER UTERINE SEGMENT and the passively dilated LOWER UTERINE SEGMENT. If labour is obstructed, the upper segment becomes thicker and the ring rises abnormally high — the PATHOLOGICAL retraction ring of Bandl — warning sign of impending uterine rupture.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q10
('KRCHN', 'Midwifery', 'Breech Delivery',
 'In breech delivery the principle of hands off the breech as the baby progressively descends is to:',
 'Ascertain foetal wellbeing',
 'Allow enough room for the foetus to pass',
 'Allow gravitating descent of the foetus',
 'Avoid traction',
 'D',
 '"HANDS OFF THE BREECH" (a cardinal principle of assisted vaginal breech delivery): the midwife/obstetrician does NOT pull on the baby''s body once it has been delivered up to the umbilicus — TRACTION on the breech causes the head to extend, leading to head entrapment (NUCHAL ARMS) which is catastrophic. Instead the baby is allowed to deliver by maternal expulsive effort and gravity, with the operator''s hands ready to perform specific manoeuvres only as needed (Lovset''s for extended arms, Mauriceau-Smellie-Veit/Burns-Marshall for the after-coming head). Avoid traction — option D.',
 'medium', 'approved', 2014, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q11
('KRCHN', 'Midwifery', 'Fetal Descent',
 'On abdominal examination during labour, the sinciput is felt and occiput just felt. The descent is:',
 '4/5', '3/5', '2/5', '1/5',
 'D',
 'Descent on abdominal palpation is recorded as how many FIFTHS of the fetal head are STILL palpable ABOVE the pelvic brim (0/5 = fully descended, 5/5 = floating). When ONLY the SINCIPUT is palpable (the occiput has descended below the brim and only "just felt" or not at all), the descent is 1/5 — most of the head is below the pelvic brim and engagement is complete. Used together with vaginal exam findings (station relative to ischial spines) to monitor labour progress on the partogram.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q12
('KRCHN', 'Midwifery', 'Fetal Position',
 'On vaginal examination during labour, you elicit the following: Sagittal suture is in the left oblique diameter at the pelvis, occiput points to the right iliopectineal eminence. The position of the vertex presentation is:',
 'Right occipito anterior', 'Right occipito posterior', 'Left occipito posterior', 'Left occipito anterior',
 'A',
 'Position is defined by the relationship of the OCCIPUT to the maternal PELVIS. The OCCIPUT points to the RIGHT ILIOPECTINEAL EMINENCE (right anterior) → RIGHT OCCIPITO-ANTERIOR (ROA) position. The sagittal suture lies in the LEFT oblique diameter (the diameter perpendicular to the line from right anterior to left posterior). ROA is a less favourable position than LOA (left occipito-anterior, the commonest position), but still permits vaginal delivery — the head usually rotates to OA before delivery.',
 'hard', 'approved', 2014, 'Paper 2'),

-- Q13
('KRCHN', 'Midwifery', 'Danger Signs in Labour',
 'The maternal danger signs that a midwife should concern her/himself with during labour include:',
 'Meconium stained liquor, falling blood pressure, abnormal lower abdominal contour',
 'Pulse rate of 70-80 BPM, rising blood pressure above 140/90 mmHg, hyperactivity',
 'Increasing apprehension, inadequate contraction, abnormal lower abdominal contour',
 'Pathological retraction ring, falling blood pressure, meconium stained liquor',
 'D',
 'MATERNAL DANGER SIGNS in labour requiring urgent action: PATHOLOGICAL/BANDL''S RETRACTION RING (impending uterine rupture); FALLING BP (shock — APH, PPH, ruptured uterus); rising pulse, FEVER, abnormal abdominal contour (transverse lie, ruptured uterus), severe persistent abdominal pain, vaginal bleeding, eclamptic seizures, severe headache/visual changes. MECONIUM-STAINED LIQUOR is primarily a fetal danger sign but also has maternal implications. Option D lists three classic maternal danger signs (ring, hypotension, meconium liquor).',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q14
('KRCHN', 'Maternal & Child Health', 'Neonatal Prophylaxis',
 'The prophylactic drugs given to a term new born at birth are:',
 '3% tetracycline eye ointment, vit. K 0.5mg i.m. stat',
 'Gentamycin eye drops, vit K. i.m. stat',
 '1% tetracycline eye ointment, vit K, 1 mg i.m. stat',
 'Gentamycin eye drop, vit. K 1 mg i.m. stat',
 'C',
 'Per Kenya MoH/WHO Essential Newborn Care: (1) EYE PROPHYLAXIS — 1% TETRACYCLINE EYE OINTMENT (or 0.5% erythromycin, or 2.5% povidone-iodine) applied to both eyes within 1 hour of birth — prevents ophthalmia neonatorum from gonococcal/chlamydial infection in the birth canal. (2) VITAMIN K — 1 mg IM stat (0.5 mg for preterm <1500 g) — prevents Vitamin K Deficiency Bleeding (VKDB). (3) BCG and OPV0 vaccinations within first 14 days. Gentamicin drops are not used as prophylaxis (only for treatment of conjunctivitis).',
 'easy', 'approved', 2014, 'Paper 2'),

-- Q15
('KRCHN', 'Paediatric Nursing', 'Neonatal Thermoregulation',
 'A baby whose birth weight is 1800 gm is admitted in newborn unit with apnoeic attacks. The baby should be nursed in:',
 'Room temperature of 34°C-35°C, incubator temperature 35°C-36°C',
 'Room temperature of 33°C-34°C, incubator temperature 32°C-34°C',
 'Room temperature of 30°C-32°C, incubator temperature 32°C-33°C',
 'Room temperature of 28°C-30°C, incubator temperature 31°C-32°C',
 'D',
 'NEUTRAL THERMAL ENVIRONMENT: the range of environmental temperature at which the infant maintains normal body temperature with minimum metabolic oxygen consumption. For 1500-2000g preterm, the appropriate incubator temperature is ~31-33°C and room temperature ~28-30°C. The optimal incubator temperature is set BY weight and DAY OF AGE (the WHO/Kenya tables). The closest match for an 1800 g baby is option D — incubator 31-32°C and room 28-30°C. Aim to keep baby''s axillary temperature 36.5-37.5°C.',
 'hard', 'approved', 2014, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Q16
('KRCHN', 'Paediatric Nursing', 'Phototherapy',
 'Side effects that a midwife should look for while nursing a baby under conventional phototherapy include:',
 'Hypoglycaemia, irritability, hypocalcaemia',
 'Hypothermia, lethargy, alteration in neuro-behaviour organization',
 'Skin rashes, necrotizing enterocolitis, isolation',
 'Skin burns, isolation, thrombocytopenia',
 'B',
 'Side effects of PHOTOTHERAPY: thermoregulation problems (HYPOTHERMIA or hyperthermia — strip baby down but maintain warmth), increased insensible water losses (dehydration), loose stools (degraded bilirubin in gut), skin rashes, retinal damage (must cover eyes with patches), "BRONZE BABY syndrome" if conjugated hyperbilirubinaemia, LETHARGY/sleepiness, ALTERED NEURO-BEHAVIOUR (irritability or lethargy, poor feeding), SEPARATION from mother (interferes with breastfeeding/bonding). Option B captures three recognised side effects.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q17
('KRCHN', 'Midwifery', 'Postnatal Care',
 'Following caesarean section, the wound and lochia loss should be observed at least:',
 '½ hourly', '1 hourly', '2 hourly', '4 hourly',
 'A',
 'Immediate post-caesarean monitoring (first 1-2 hours in recovery): vital signs, level of consciousness, uterine fundus and tone, WOUND DRESSING for soakage, LOCHIA loss — all assessed every 15-30 MINUTES (HALF-HOURLY) until stable. After that, hourly for 4 hours, then 4-hourly. This is to detect early signs of postpartum haemorrhage (which can be intra-abdominal and concealed after CS), uterine atony, or wound bleeding. Option A is the immediate post-op standard.',
 'medium', 'approved', 2014, 'Paper 2'),

-- Q18
('KRCHN', 'Midwifery', 'Postnatal Care',
 'By 9th to 10th day postnatally the uterus is usually palpated:',
 'At the umbilicus',
 'Midway between umbilicus and symphysis pubis',
 'Just above the symphysis pubis',
 'Not palpable per abdomen',
 'D',
 'Uterine INVOLUTION milestones: immediately after delivery — fundus at umbilicus; day 1 — 1 finger-breadth below umbilicus; descends approximately 1 cm (1 finger-breadth) per day. Day 7 — uterus at midway between umbilicus and symphysis pubis; DAY 10-14 — uterus has descended into the pelvis and is NO LONGER PALPABLE per abdomen. By 6 weeks postpartum it has returned to pre-pregnancy size. Persistent palpability beyond day 10-14 suggests SUB-INVOLUTION.',
 'easy', 'approved', 2014, 'Paper 2'),

-- Q19
('KRCHN', 'Maternal & Child Health', 'Maternal Mortality',
 'The causes of indirect maternal deaths include:',
 'Postpartum haemorrhage, obstructed labour, eclampsia',
 'Malaria, diabetes mellitus, sickle cell disease',
 'HIV/AIDS, abortion, ruptured uterus',
 'Tuberculosis, road traffic accident, puerperal sepsis',
 'B',
 'INDIRECT maternal deaths result from pre-existing diseases or diseases that developed during pregnancy (not due to direct obstetric causes) but aggravated by pregnancy: MALARIA, ANAEMIA, HIV/AIDS, TUBERCULOSIS, DIABETES MELLITUS, CARDIAC DISEASE, SICKLE CELL DISEASE, hepatitis, epilepsy. DIRECT causes (= obstetric — haemorrhage, sepsis, eclampsia, obstructed labour, ruptured uterus, complications of abortion) are excluded. INCIDENTAL/coincidental causes = unrelated to pregnancy (e.g. RTA). Option B lists three classic indirect causes.',
 'easy', 'approved', 2014, 'Paper 2'),

-- Q20
('KRCHN', 'Health Systems & Management', 'Health Information Systems',
 'Delivery register is important because it gives information on:',
 'Utilizing of maternity services, mode of delivery, birth weight patterns',
 'Maternal and Perinatal morbidity and mortality pattern, socio-demographic and obstetric characteristics of women',
 'Bed occupancy, attendant and time of delivery, source of referral and reasons',
 'Quality of care, mode of delivery, birth patterns',
 'B',
 'The DELIVERY REGISTER is a primary data source in maternity facilities and feeds into the District/County Health Information System (DHIS2/KHIS). It captures comprehensive information on every birth: mother''s socio-demographic details (age, parity, residence), obstetric history, labour and delivery details (onset, duration, mode, complications), birth outcomes (live/still birth, birth weight, APGAR, sex), and any morbidity/mortality. From this aggregated data, programme managers analyse MATERNAL AND PERINATAL MORBIDITY AND MORTALITY PATTERNS, identify trends, plan interventions and monitor MNCH indicators — option B is the comprehensive answer.',
 'medium', 'approved', 2014, 'Paper 2');

-- =============================================================================
-- SECTION C — UNCATEGORISED PAPER 2 SETS
-- exam_year = NULL (year not specified on source PDF)
-- These questions are added for BOTH BScN and KRCHN cadres where content applies
-- =============================================================================

-- ─── Uncategorised Set 1 ─────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Embryology',
 'Immediately after fertilization, the trophoblast develops into:',
 'Embryo and placenta', 'Chorion and placenta', 'Umbilical cord and amnion', 'Amnion and placenta',
 'B',
 'The trophoblast (outer cell layer of the blastocyst) differentiates into the CHORION (forming chorionic villi) and contributes the fetal portion of the PLACENTA. The inner cell mass gives rise to the embryo proper and the amnion. Umbilical cord forms from the connecting stalk.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Brachial Plexus Injury',
 'In Erb''s palsy:',
 'There is damage to the lower brachial plexus involving the 7th and 8th cervical root nerves',
 'There is damage to the upper brachial plexus involving the 5th & 6th cervical root nerves',
 'There is damage to all the brachial plexus nerve roots',
 'There is damage to the facial nerve',
 'B',
 'Erb''s palsy is injury to the UPPER brachial plexus, specifically the C5 and C6 nerve roots, typically from excessive lateral neck traction during delivery of the anterior shoulder in shoulder dystocia. Produces the classic ''waiter''s tip'' posture (arm adducted, internally rotated, elbow extended). Klumpke''s palsy involves the LOWER plexus (C8-T1).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Vital Statistics',
 'Late neonatal deaths are deaths occurring:',
 'After 24 hours of birth', 'Up to one year after birth', '14-28 days after birth', '7-28 days after birth',
 'D',
 'Per WHO definitions: EARLY neonatal death = death within 0-7 completed days of life; LATE neonatal death = death from 7 to 28 days. Total neonatal period = first 28 days. Perinatal mortality = stillbirths + early neonatal deaths. Infant mortality = deaths in first year.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Multiple Pregnancy',
 'Features of dichorionic twins include:',
 'Two amnions, one placenta, dizygotic',
 'Two amnions, two placentae, dizygotic',
 'One amnion, one placenta, dizygotic',
 'One amnion, two chorions, one placenta',
 'B',
 'DICHORIONIC-DIAMNIOTIC twins have TWO CHORIONS, TWO AMNIONS and TWO PLACENTAE (which may fuse). They are usually DIZYGOTIC (from two separate ova fertilised by two sperm — non-identical) but ~30% of monozygotic twins are also dichorionic if the zygote splits within the first 3 days. Best prognosis among twin types — lowest complication risk.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Mechanism of Labour',
 'While conducting normal delivery following the extension of the head, the midwife should:',
 'Assist in the lateral flexion of the head',
 'Await the restitution of the head',
 'Await external rotation of the head',
 'Assist in the external rotation of the head',
 'B',
 'Cardinal movements of labour in vertex delivery: engagement → descent → flexion → internal rotation → EXTENSION (head delivered) → RESTITUTION (head untwists to align with shoulders — passive, midwife AWAITS) → external rotation (shoulders rotate to AP diameter) → expulsion. The midwife must NOT force rotation; restitution is allowed to occur naturally before assisting shoulder delivery.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Diabetes in Pregnancy',
 'Diabetogenic hormones in pregnancy include:',
 'Oxytocin, human placental lactogen',
 'Progesterone, prolactin',
 'Human placental lactogen, cortisol',
 'Cortisol, oestrogen',
 'C',
 'Pregnancy is a diabetogenic state because of placental hormones that ANTAGONISE insulin: HUMAN PLACENTAL LACTOGEN (hPL, the major one — increases throughout pregnancy), CORTISOL (raised), prolactin, progesterone, and oestrogen all contribute to insulin resistance. This is why gestational diabetes appears in the second half of pregnancy when hPL peaks.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Breech Delivery',
 'In breech delivery, Lovset manoeuvre is applied in:',
 'Extended legs', 'Extended arms', 'Stuck head', 'Extended head',
 'B',
 'LOVSET''S MANOEUVRE delivers EXTENDED/NUCHAL ARMS in vaginal breech delivery: hold baby by the iliac crests with thumbs over sacrum, rotate the trunk 180° to bring the posterior arm anteriorly under the symphysis (where it can be swept down), then rotate back 180° to deliver the other arm. Mauriceau-Smellie-Veit or Burns-Marshall is for the after-coming head.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Obstetric History',
 'A woman presents at the ANC clinic at 16 weeks gestation with a history of one living child and 2 abortions. The midwife will interpret this as:',
 'Para 3+1 gravida 4', 'Para 1+3 gravida 4', 'Para 2+2 gravida 4', 'Para 1+2 gravida 4',
 'D',
 'PARITY notation: P (live births ≥24 weeks) + (abortions/miscarriages <24 weeks). GRAVIDITY = total pregnancies including current. This woman has 1 live child = P1; 2 abortions = +2; current pregnancy (the 4th). So PARA 1+2, GRAVIDA 4.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Rhesus Incompatibility',
 'The purpose of administering anti-D immunoglobulin to a rhesus negative mother post delivery is:',
 'Destroys any maternal antibodies developed against the D antigen',
 'Stimulates the production of anti rhesus factor antibodies',
 'Destroys any fetal cells in the maternal circulation',
 'Reverses any sensitization that may have occurred in earlier pregnancy',
 'C',
 'Anti-D immunoglobulin works by passive immunisation — it binds to and DESTROYS any FETAL RH-POSITIVE RED CELLS that have entered the maternal circulation BEFORE the mother''s immune system can recognise the D antigen and mount its own anti-D response. This prevents Rh sensitisation in future pregnancies. Must be given within 72 hours of any sensitising event.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Family Planning',
 'Lactational amenorrhoea method (LAM) is recommended for a woman who:',
 'Breastfeeds on demand, wants protection for one year only, usually resumes menstruation after six months',
 'Breastfeeds exclusively, has not resumed menstruation, has a baby more than six months old',
 'Breastfeeds exclusively, has history of delayed menstrual resumption, has a baby less than one year',
 'Breastfeeds exclusively, has not resumed menstruation, has a baby less than six months old',
 'D',
 'LAM provides 98% contraceptive protection ONLY when ALL THREE criteria are met: (1) EXCLUSIVELY breastfeeding (day and night, no other foods); (2) Menses HAVE NOT returned; (3) Baby is LESS THAN 6 MONTHS old. If any criterion fails, alternative contraception is needed. Acts by prolactin-induced suppression of GnRH/ovulation.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Postnatal Care',
 'The role of the midwife in relieving after pains during puerperium includes:',
 'Administering uterotonic drug, promote ambulation',
 'Encourage bed rest, advice the mother to withhold breastfeeding',
 'Administer appropriate analgesics, restrict ambulation',
 'Encourage breastfeeding, administer appropriate analgesics',
 'D',
 'Afterpains are uterine cramping during involution, accentuated by breastfeeding (oxytocin release). Management: ENCOURAGE breastfeeding (it promotes involution despite causing cramping), APPROPRIATE ANALGESICS (paracetamol, ibuprofen — particularly effective for uterine cramps), ensure bladder is emptied, ambulation is encouraged. Most afterpains settle by day 4-5.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'Leucorrhoea which is observed in pregnancy is a result of:',
 'Marked desquamation of superficial epithelial cells',
 'Increased vaginal vascularity',
 'Interaction of epithelial cells with Doderlein''s bacillus',
 'Increased vaginal elasticity',
 'A',
 'Physiological leucorrhoea of pregnancy is the increased white/clear vaginal discharge resulting from oestrogen-induced increase in cervical mucus production AND MARKED DESQUAMATION of superficial vaginal epithelial cells (hyperplastic glycogen-rich cells slough into the discharge). Doderlein''s lactobacilli convert glycogen to lactic acid, maintaining acidic pH (~3.5-4.5). Increased vascularity contributes to softening but the discharge itself is desquamated cells + mucus.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Instrumental Delivery',
 'The indications for vacuum extraction include:',
 'Preterm labour, obstructed labour',
 'Severe hypertension, maternal exhaustion',
 'Mild fetal distress, delayed second stage of labour',
 'Obstructed labour, breech presentation',
 'C',
 'Indications for VACUUM EXTRACTION (ventouse): MILD-MODERATE FETAL DISTRESS in second stage, MATERNAL EXHAUSTION in second stage, PROLONGED/DELAYED SECOND STAGE, maternal cardiac disease (to avoid Valsalva). Prerequisites: vertex presentation, fully dilated, engaged head, empty bladder. CONTRAINDICATIONS: preterm <34 weeks (risk of intracranial haemorrhage), face/brow/breech, obstructed labour with CPD.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Cervical Changes in Labour',
 'Effacement during labour refers to:',
 'Complete relaxation of the lower uterine segment',
 'Inclusion of the cervical canal into the lower uterine segment',
 'Process of enlargement of the os uteri to permit passage of the baby',
 'Process of merging the upper and lower uterine segments',
 'B',
 'CERVICAL EFFACEMENT (shortening/thinning) is the inclusion of the cervical canal into the lower uterine segment — the cervix shortens from about 3-4 cm to paper-thin (100% effaced) as the LUS is drawn up. Effacement precedes (or coincides with) DILATATION (option C — opening of the os from 0 to 10 cm). In primigravidas, effacement typically completes before dilatation begins; in multiparas they occur together.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Uterine Rupture',
 'The impending signs of rupture of the uterus include:',
 'Rise in pulse rate, hypertonic uterine contractions, excruciating pain',
 'Bandl''s ring, vaginal bleeding, cessation of uterine contractions',
 'Cessation of uterine contractions, tenderness in the lower uterine segment, rise in pulse rate',
 'Hypertonic uterine contractions, Bandl''s ring, vaginal bleeding',
 'D',
 'IMPENDING (threatened) uterine rupture is the warning phase BEFORE actual rupture: HYPERTONIC, frequent, painful uterine contractions; rising BANDL''S RING (pathological retraction ring visible high on abdomen); LOWER segment tenderness; rising maternal pulse; mild vaginal bleeding/blood-stained urine; fetal distress. After actual rupture: contractions CEASE, severe abdominal pain, shock from massive bleeding, fetal parts palpable abdominally, no fetal heart. Option D describes impending signs.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Paediatric Nursing', 'Neonatal Thermoregulation',
 'Complications associated with hyperthermia in newborn include:',
 'Hyponatraemia, plethora, dehydration',
 'Dehydration, hypoglycaemia, hyponatraemia',
 'Hypernatraemia, jaundice, recurrent apnoea',
 'Jaundice, bradycardia, oedema',
 'C',
 'Neonatal HYPERTHERMIA (typically from over-wrapping, environmental overheating, infection or dehydration): increased insensible water losses → DEHYDRATION with HYPERNATRAEMIA (concentrated serum sodium); increased red cell breakdown and reduced feeding → JAUNDICE; metabolic stress and apnoea episodes — RECURRENT APNOEA. Severe hyperthermia leads to seizures and brain injury. Prevention: appropriate thermal care, neither too cold nor too hot (axillary temp 36.5-37.5°C).',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Congenital Abnormalities',
 'A baby who passes meconium in urine should be suspected for:',
 'Necrotising enterocolitis', 'Hirschsprung''s disease', 'Imperforate anus', 'Rectal fistulae',
 'D',
 'Meconium appearing in URINE (or vaginal discharge in a girl, or scrotum/perineum in a boy) indicates a RECTOURINARY or RECTOVAGINAL FISTULA — a congenital communication between the rectum and urinary tract or vagina, typically associated with imperforate anus / anorectal malformations. This needs urgent surgical assessment. Pure imperforate anus would show NO meconium passage; NEC produces bloody stools; Hirschsprung''s = delayed meconium passage.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Gestational Diabetes',
 'Diagnosis of gestational diabetes will be made after a glucose tolerance test results on 2 separate occasions indicate:',
 'Fasting blood sugar >5.9 mmol/L and random blood sugar >14.9 mmol/L',
 'Fasting blood sugar >3.9 mmol/L and random blood sugar >6.9 mmol/L',
 'Fasting blood sugar >7.8 mmol/L and random blood sugar >11.1 mmol/L',
 'Fasting blood sugar and random blood sugar >10.9 mmol/L',
 'A',
 'Different criteria exist for diagnosing GDM. The Kenya MoH/WHO 2013 criteria for GDM diagnosis using a 75 g 2-hour OGTT: fasting ≥5.1 mmol/L, 1-hour ≥10.0, 2-hour ≥8.5. Option A reflects an older convention using fasting >5.9 mmol/L. Note that overt diabetes (≠ GDM) is diagnosed at fasting ≥7.0 mmol/L or random ≥11.1 mmol/L.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Neonatal Thermoregulation',
 'When a newborn is placed on a cold surface heat loss occurs by:',
 'Convection', 'Conduction', 'Evaporation', 'Radiation',
 'B',
 'Four modes of heat loss in a newborn: CONDUCTION = direct contact with a cold object/surface (cold weighing scale, cold table); CONVECTION = movement of cold air over the skin (drafts, open windows); EVAPORATION = wet skin (after birth, after bathing); RADIATION = heat loss to cooler nearby objects without contact (cold walls). Placing baby on a cold surface = CONDUCTION. Prevention: warm chain — pre-warm surfaces, dry baby immediately, skin-to-skin contact.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Hypertensive Disorders of Pregnancy',
 'Which of the following statements about pre-eclampsia management and twin delivery is CORRECT?',
 'Complete bed rest in pre-eclampsia does NOT produce a diuretic effect; after 2nd twin, give uterotonic immediately',
 'Complete bed rest in pre-eclampsia produces a diuretic effect; after 2nd twin, wait for placental separation before giving uterotonic',
 'Complete bed rest in pre-eclampsia produces a diuretic effect; after 2nd twin, give uterotonic immediately',
 'Complete bed rest in pre-eclampsia does NOT produce a diuretic effect; after 2nd twin, wait for placental separation before giving uterotonic',
 'C',
 'Bed rest in the LEFT LATERAL position relieves caval compression by the uterus, improves renal blood flow and venous return, increases urine output (mild diuretic effect), lowers BP and improves placental perfusion — TRUE. After delivery of the second twin, uterotonic (oxytocin 10 IU IM/slow IV) is given IMMEDIATELY with the anterior shoulder of twin 2 or right after delivery — NOT waiting for placental separation. Twin pregnancies have a high PPH risk; active management of the third stage is mandatory — FALSE to wait.',
 'hard', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Set 2 ─────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Pelvic Anatomy',
 'The strongest part of the female pelvis is the:',
 'Ilium', 'Ischium', 'Pubis', 'Symphysis pubis',
 'B',
 'The ISCHIUM is the strongest part of the bony pelvis — its body forms the inferior posterior portion of the acetabulum, and its tuberosity bears the body weight when sitting. The ilium is the largest part (forms the upper flared portion), pubis is anterior, and symphysis pubis is the fibrocartilaginous joint, not a bone.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'Anterior relations of the uterus include:',
 'Pouch of Douglas, bladder',
 'Broad ligaments, pouch of Douglas',
 'Intestines, broad ligaments',
 'Bladder, uterovesical pouch',
 'D',
 'Anterior to the uterus (in front): URINARY BLADDER and the UTEROVESICAL POUCH (peritoneal fold between bladder and uterus). Posterior relations: POUCH OF DOUGLAS (recto-uterine pouch) and the rectum. Lateral: broad ligaments, ureters, uterine arteries.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Fetal Skull',
 'The suture that separates the frontal bones from the parietal bones is the:',
 'Coronal', 'Frontal', 'Sagittal', 'Lambdoidal',
 'A',
 'CORONAL suture separates the FRONTAL bones from the parietal bones. FRONTAL (metopic) suture separates the two halves of the frontal bone in infants. SAGITTAL suture lies between the two parietal bones. LAMBDOID suture separates the parietal bones from the occipital bone. The anterior fontanelle is at the junction of coronal, sagittal and frontal sutures.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Diabetes in Pregnancy',
 'High levels of glycosylated haemoglobin during pregnancy is associated with:',
 'Hyperemesis gravidarum', 'Fetal malformations', 'Physiological anaemia', 'Multiple pregnancy',
 'B',
 'HbA1c reflects average glucose over the preceding 8-12 weeks. High HbA1c in early pregnancy (poorly controlled diabetes at conception) is strongly associated with FETAL CONGENITAL MALFORMATIONS — especially cardiac defects, neural tube defects, caudal regression syndrome, and renal abnormalities. The risk rises sharply when HbA1c is >8%. Pre-conception glycaemic optimisation (HbA1c <6.5%) markedly reduces these risks.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Essential Newborn Care',
 'The benefit of delayed cord clamping is that:',
 'Gives the provider time to perform APGAR score',
 'Prevents possible postpartum haemorrhage',
 'Increases iron stores in the newborn',
 'Prevents erythroblastosis fetalis',
 'C',
 'WHO recommends DELAYED CORD CLAMPING (1-3 minutes after birth) for all vigorous term and preterm newborns. The placental transfusion this allows transfers ~30 mL/kg of additional blood to the baby, INCREASING IRON STORES (preventing iron-deficiency anaemia at 4-6 months), improving haemoglobin and reducing need for transfusion. In preterm infants it also reduces intraventricular haemorrhage and NEC. Does NOT affect PPH or rhesus disease.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Maternal & Child Health', 'Postnatal Care',
 'The scheduling for targeted postnatal visits is:',
 'Within 24 hours, 6 weeks, 6 months, 1 year',
 'Within 48 hours, 1-2 weeks, 4-6 weeks, 4-6 months',
 'Within 48 hours, 4-6 weeks, 4-6 months, 6-12 months',
 'Within 24 hours, 6 weeks, 10 weeks, 14 weeks',
 'B',
 'Per Kenya MoH/WHO postnatal care schedule for mother and baby: VISIT 1 within 48 hours of delivery (especially for home deliveries); VISIT 2 at 1-2 weeks; VISIT 3 at 4-6 weeks (vaccinations begin — BCG/OPV0 ideally at birth); VISIT 4 at 4-6 months. Each visit assesses mother (involution, lochia, perineum, breast, BP, mood) and baby (growth, feeding, immunisations, danger signs).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Partograph',
 'During a vaginal exam, the midwife felt the fetal sutures were apposed. This is recorded on the partograph as:',
 '++', '0', '+++', '+',
 'B',
 'MOULDING (overriding of fetal skull bones at sutures) on the partograph: 0 = sutures APPOSED (touching but not overlapping — normal); + = sutures overlapped but easily REDUCIBLE with fingertip pressure; ++ = sutures overlapped, NOT REDUCIBLE; +++ = severe overlap, NOT REDUCIBLE (sign of obstructed labour / CPD). Apposed sutures = 0 = NORMAL — option B.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Postnatal Care',
 'Abnormal features in the immediate puerperium include:',
 'Tachycardia, hypotension, atony',
 'After pains, diuresis, shivering',
 'Tachycardia, anorexia, no colostrum',
 'Hypotension, diuresis, marked thirst',
 'A',
 'Normal immediate puerperium: mild SHIVERING and chills (after labour), AFTERPAINS, DIURESIS (loss of pregnancy fluid retention in first week), thirst, hunger (after labour), colostrum production. ABNORMAL: TACHYCARDIA (suggests bleeding/sepsis), HYPOTENSION (suggests hypovolaemic shock from PPH), UTERINE ATONY (boggy uterus = source of PPH). Option A all three are red flags requiring urgent action.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Rhesus Incompatibility',
 'Recommended timings for the administration of anti-D in pregnancy are:',
 '28 weeks, 38 weeks', '28 weeks, 34 weeks', '28 weeks, 40 weeks', '24 weeks, 37 weeks',
 'B',
 'Routine antenatal anti-D prophylaxis (RAADP) for Rh-negative non-sensitised women: traditional single-dose regimen = 28 weeks; CURRENT two-dose regimen (NICE/RCOG): 28 weeks AND 34 weeks. PLUS within 72 hours of any sensitising event (delivery of Rh+ baby, miscarriage, abortion, ectopic, APH, amniocentesis, abdominal trauma, ECV). Option B — 28 + 34 weeks.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Neonatal Prophylaxis',
 'Prophylactic interventions for the newborn include:',
 'Breastfeeding, resuscitation, stimulation',
 'Administration of Vitamin K, tetracycline eye ointment and chlorhexidine 4%',
 'Breastfeeding, administration of vitamin K, phototherapy',
 'Skin to skin, phototherapy, administration of tetracycline eye ointment',
 'B',
 'Standard newborn PROPHYLAXIS per Kenya/WHO Essential Newborn Care: (1) VITAMIN K 1 mg IM stat — prevents VKDB; (2) TETRACYCLINE 1% EYE OINTMENT — prevents ophthalmia neonatorum; (3) CHLORHEXIDINE 4% UMBILICAL CORD CARE — prevents omphalitis and neonatal sepsis; (4) BCG and OPV0 immunisations within 14 days. Resuscitation and breastfeeding are care, not prophylaxis.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Maternal & Child Health', 'Breastfeeding',
 'Signs of good attachment include:',
 'Mouth widely open, upper lip turned outward, more areola visible above baby''s mouth',
 'Lower lip turned outward, chin touching the breast, more areola visible below baby''s mouth',
 'Upper lip turned outward, nose touching the breast, mouth widely open',
 'More areola visible above baby''s mouth, lower lip turned outward, chin touching the breast',
 'D',
 'Per WHO good attachment criteria (CALM acronym — Chin touches breast, Areola more visible Above mouth, Lip lower turned outward, Mouth wide open): CHIN TOUCHING THE BREAST, mouth wide open, lower lip TURNED OUTWARD (everted), MORE AREOLA VISIBLE ABOVE than below the baby''s mouth (because the baby''s tongue is on the lower areola). Option D lists three of these correct signs (chin touching breast, lower lip turned outward, more areola visible above mouth).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Necrotising Enterocolitis',
 'Predisposing factors to necrotizing enterocolitis (NEC) in neonates include:',
 'Dehydration, breastfeeding, hypothermia',
 'Prematurity, asphyxia, formula feeds',
 'Prematurity, oxygen therapy, feeding',
 'Transfusion, prematurity, formula feeds',
 'B',
 'NEC is the commonest GI emergency in preterm infants. Risk factors: PREMATURITY (the strongest factor — immature gut, immune system, blood flow regulation); PERINATAL ASPHYXIA (gut ischaemia); FORMULA FEEDING (versus protective breast milk); rapid feed advancement; sepsis; polycythaemia/transfusion; PDA. BREASTFEEDING is PROTECTIVE. Option B correctly lists three risk factors.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Secondary Postpartum Haemorrhage',
 'Causes of secondary postpartum haemorrhage include:',
 'Retained products of conception, infection',
 'Retained blood clots, anaemia',
 'Trauma, prolonged labour',
 'Uterine fibroids, endometritis',
 'A',
 'SECONDARY PPH = excessive vaginal bleeding from 24 hours up to 6 weeks postpartum. Commonest causes: RETAINED PRODUCTS OF CONCEPTION (placental fragments, membranes — most common); ENDOMETRITIS/uterine infection (puerperal sepsis); sub-involution of placental site; rare causes — uterine artery pseudoaneurysm, choriocarcinoma. Treatment: ultrasound to check for RPOC, antibiotics for infection, uterotonics, surgical evacuation if RPOC. PRIMARY PPH = first 24 hrs, causes = 4 Ts: tone, trauma, tissue, thrombin.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Vital Statistics',
 'Neonatal period is defined as the period from birth up to:',
 '14 days', '12 months', '28 days', '7 days',
 'C',
 'Per WHO: NEONATAL period = birth to 28 completed days of life. EARLY neonatal = 0-7 days. LATE neonatal = 7-28 days. INFANT = first year. UNDER-FIVE = first 5 years. These age categories drive specific mortality indicators (NMR, IMR, U5MR).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Disseminated Intravascular Coagulation',
 'Obstetric events that may precipitate disseminated intravascular coagulopathy (DIC) include:',
 'Placenta abruption, multiple pregnancy, intra-uterine foetal death',
 'Amniotic fluid embolism, placenta abruption, eclampsia',
 'Eclampsia, foetal post-maturity, placenta abruption',
 'Incomplete abortion, anaemia, maternal diabetes mellitus',
 'B',
 'Major obstetric causes of DIC: AMNIOTIC FLUID EMBOLISM (sudden, catastrophic DIC); PLACENTAL ABRUPTION (thromboplastin from retroplacental haematoma enters circulation); SEVERE PRE-ECLAMPSIA/ECLAMPSIA/HELLP; intrauterine fetal death (with prolonged retention >2 weeks → ''dead fetus syndrome''); septic abortion; massive PPH with hypovolaemic shock; acute fatty liver of pregnancy. Option B lists three classic precipitants.',
 'hard', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Set 3 ─────────────────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Hormones in Pregnancy',
 'During pregnancy, relaxin hormone:',
 'Stimulates production of cervical mucus, enhances breast enlargement and reduces oxytocin release',
 'Relaxes ligaments, inhibits release of follicle stimulating hormone and prevents secretion of prolactin',
 'Relaxes the pelvic girdle, softens the cervix and suppresses uterine contractions',
 'Reduces production of oxytocin, softens the cervix and inhibits the production of luteinising hormone',
 'C',
 'RELAXIN (from corpus luteum, decidua and placenta): RELAXES THE PELVIC GIRDLE LIGAMENTS (sacroiliac, pubic symphysis) — increasing pelvic capacity for delivery (sometimes excessively, causing pubic symphysis pain); SOFTENS THE CERVIX (along with prostaglandins, preparing it for effacement/dilatation); INHIBITS uterine contractility during pregnancy (helping maintain pregnancy). Falls before labour onset.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Face Presentation',
 'In face presentation:',
 'Sub-occipitobregmatic diameter and biparietal diameter present, occipito frontal diameter distends the vaginal orifice',
 'Mento vertical diameter and bi-temporal diameter present, vaginal delivery is not possible',
 'Sub-mentobregmatic diameter and bi-temporal diameter present, sub-mentovertical diameter distends the vaginal orifice',
 'Sub-mentobregmatic and occipito frontal diameter presents, sub-occipitofrontal diameter distends the vaginal orifice',
 'C',
 'FACE PRESENTATION: head completely EXTENDED, face presents. Presenting diameter is SUB-MENTOBREGMATIC (9.5 cm — favourable, similar to suboccipitobregmatic of vertex). Bi-temporal diameter (8.2 cm) presents transversely. The diameter distending the vaginal orifice during crowning is the SUB-MENTOVERTICAL (11.5 cm). Mento-anterior face presentations can deliver vaginally; mento-posterior usually require CS.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Antenatal Assessment',
 'The aim of performing abdominal examination during pregnancy is to:',
 'Assess mother''s health status',
 'Exclude pseudo-pregnancy',
 'Assess fetal size and growth',
 'Prepare for delivery',
 'C',
 'Abdominal examination during pregnancy (inspection, palpation including Leopold''s manoeuvres, auscultation): assesses FETAL SIZE AND GROWTH (fundal height correlates with gestational age — symphysis-fundal height in cm ≈ weeks of gestation between 20-36 weeks); fetal lie, presentation, position, attitude; engagement; fetal heart; amniotic fluid volume; presence of multiple pregnancy. Maternal health is assessed broadly; pseudo-pregnancy excluded earlier; preparation for delivery is part of the comprehensive ANC plan.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Medical-Surgical Nursing', 'Cardiac Disease',
 'A pregnant woman with cardiac disease stage III will present with:',
 'No symptoms during ordinary physical activity',
 'Symptoms during mild physical activity',
 'Symptoms at rest',
 'Symptoms during ordinary physical activity',
 'B',
 'NEW YORK HEART ASSOCIATION (NYHA) functional classification of cardiac disease: CLASS I — no symptoms with ordinary activity; CLASS II — symptoms with ordinary activity (slight limitation); CLASS III — symptoms with LESS THAN ORDINARY (MILD) activity (marked limitation); CLASS IV — symptoms AT REST. Pregnancy is well tolerated by Class I-II; Class III-IV carry significant maternal mortality risk.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'The layer of the uterine wall shed during menstruation is the:',
 'Perimetrium', 'Functional endometrium', 'Myometrium', 'Basal endometrium',
 'B',
 'The endometrium has two layers: the FUNCTIONAL LAYER (stratum functionalis — upper 2/3) which proliferates under oestrogen, becomes secretory under progesterone, and is SHED at menstruation; and the BASAL LAYER (stratum basalis — lower 1/3) which is preserved and regenerates the functional layer in the next cycle. Perimetrium = serosa; myometrium = muscle.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Fetal Membranes',
 'Features of the amnion membrane include:',
 'Thick, opaque, friable', 'Thick, tough, translucent', 'Smooth, tough, translucent', 'Opaque, smooth, friable',
 'C',
 'The AMNION (inner fetal membrane) is SMOOTH, TOUGH and TRANSLUCENT (somewhat shiny) — it directly contacts the amniotic fluid and the fetus. The CHORION (outer membrane) is thicker, opaque and more friable. After delivery, inspecting the membranes (and the placenta for completeness) is essential to detect retained fragments.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Abnormal Labour',
 'Which of the following statements about labour augmentation and reversed polarity is CORRECT?',
 'Augmentation of labour means artificial initiation of labour — TRUE; In reversed polarity, fundal dominance is lost and contractions last longer in the lower uterine segment — TRUE',
 'Augmentation of labour means artificial initiation of labour — FALSE; In reversed polarity, fundal dominance is lost and contractions last longer in the lower uterine segment — TRUE',
 'Augmentation of labour means artificial initiation of labour — TRUE; In reversed polarity, fundal dominance is lost and contractions last longer in the lower uterine segment — FALSE',
 'Augmentation of labour means artificial initiation of labour — FALSE; In reversed polarity, fundal dominance is lost and contractions last longer in the lower uterine segment — FALSE',
 'B',
 'INDUCTION of labour = artificial INITIATION (when there are no contractions yet); AUGMENTATION = enhancement of EXISTING but inefficient contractions (with oxytocin/ARM) — so "augmentation = artificial initiation" is FALSE. In REVERSED POLARITY (incoordinate uterine action), contractions start in the lower segment and last longer there, while the fundus is poorly contracted — leading to slow progress and possibly cervical dystocia — TRUE. Treatment: rest, sedation, sometimes oxytocin under careful monitoring.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Placenta Praevia',
 'In type III placenta praevia:',
 'Vaginal birth is inappropriate',
 'The placenta is near the internal os',
 'The fetus is usually in good condition',
 'Bleeding is usually moderate',
 'A',
 'PLACENTA PRAEVIA classification: TYPE I (low-lying) — placenta in lower segment but not reaching internal os; TYPE II (marginal) — reaches the os but does not cover it; TYPE III (PARTIAL/INCOMPLETE COVERING) — covers the os when closed but not when fully dilated; TYPE IV (CENTRAL/COMPLETE) — completely covers the os. TYPES III AND IV are ''major'' praevia — vaginal delivery is CONTRAINDICATED (catastrophic bleeding risk) — CAESAREAN SECTION mandatory. Type I and II (''minor'') may allow vaginal delivery.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Family Planning',
 'One of the following is NOT true about use of basal body temperature method:',
 'Temperature slightly rises by 0.2°C-0.5°C during the day of ovulation',
 'The woman should take a body temperature at the same time daily before she gets off the bed',
 'The woman should take her body temperature before she eats anything',
 'There is a rise in temperature of between 0.2°C-0.5°C just after ovulation',
 'A',
 'BBT method: temperature rises by 0.2-0.5°C just AFTER ovulation (luteal progesterone effect) — NOT ON the day of ovulation. So option A is the FALSE statement (the one that is NOT true). The temperature should be measured at the same time each morning BEFORE getting out of bed and BEFORE eating/drinking — options B and C are correct. Option D correctly describes the post-ovulatory temperature rise.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Lightening',
 'Factors that facilitate the occurrence of lightening include:',
 'Parity of the mother, presentation',
 'Good uterine tone, formation of lower uterine segment',
 'Braxton Hicks contractions, softening of pelvic floor tissues',
 'Prostaglandin release, parity of the mother',
 'B',
 'LIGHTENING is the descent of the fetal presenting part into the pelvis 2-3 weeks before labour in primigravidas (in multiparas often not until labour). Mother experiences relief from upper abdominal pressure (easier breathing) but increased pelvic pressure and frequency of micturition. Facilitated by: GOOD UTERINE TONE; FORMATION OF THE LOWER UTERINE SEGMENT (cervical ripening); fetal head fitting the pelvis; normal pelvic shape; good pelvic floor support. Option B is the best answer.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Reproductive Physiology',
 'The effect of oestrogen on the uterus during pregnancy is:',
 'Contraction of the uterine smooth muscles',
 'Increase in the uterine blood supply',
 'Growth of the uterine smooth muscles',
 'Relaxation of the uterine muscles',
 'C',
 'OESTROGEN during pregnancy stimulates uterine GROWTH (hyperplasia and hypertrophy of myocytes) — the uterus enlarges from 50 g to 1000 g and from a 7-8 cm organ to one accommodating term fetus. Oestrogen also makes the uterus more excitable, while PROGESTERONE relaxes it. Uterine BLOOD FLOW increases dramatically (to ~500 mL/min at term) but this is a multifactorial effect of pregnancy hormones, not specifically oestrogen alone.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'PMTCT',
 'The maternal factors that influence mother to child transmission (MTCT) of HIV infection during labour and delivery include:',
 'High viral load, maternal malnutrition, substance abuse',
 'High maternal viral load, premature delivery, invasive delivery procedure',
 'Preterm delivery, unprotected sex with multiple partners, low maternal CD4 count',
 'HIV infection in pregnancy, low birth weight, breastfeeding',
 'B',
 'Intrapartum MTCT risk factors: HIGH MATERNAL VIRAL LOAD (the single strongest predictor — and the basis for ART scaling-up); PREMATURE DELIVERY (immature fetal skin/gut barrier); PROLONGED RUPTURE OF MEMBRANES; INVASIVE PROCEDURES (fetal scalp electrodes, fetal blood sampling, instrumental delivery, episiotomy); chorioamnionitis; vaginal vs CS delivery (CS may help in high-VL women). MTCT can be reduced to <1% with universal ART + viral suppression + safe delivery + replacement/exclusive feeding.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Intrauterine Growth Restriction',
 'The foetal causes of intra-uterine growth retardation include:',
 'HIV/AIDS, recurrent malaria infection, genetic disorders',
 'Multiple gestation, genetic disorders, foetal infections',
 'Maternal diabetes, foetal distress, placenta praevia',
 'Syphilis, radiation, congenital abnormalities',
 'B',
 'Causes of IUGR are classified as: MATERNAL — HTN, pre-eclampsia, diabetes (advanced with vasculopathy), heart disease, malnutrition, smoking, alcohol, drugs; PLACENTAL — abruption, praevia, infarcts; FETAL — MULTIPLE GESTATION (sharing of resources), GENETIC DISORDERS (chromosomal abnormalities — trisomies, Turner), FETAL INFECTIONS (TORCH — toxoplasmosis, rubella, CMV, herpes, syphilis), congenital abnormalities. Option B lists three pure fetal causes.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Hormones in Labour',
 'The hormone that plays a central role in the maintenance of labour is:',
 'Oestrogen', 'Progesterone', 'Oxytocin', 'Prostaglandin',
 'C',
 'OXYTOCIN (posterior pituitary) is the key hormone driving labour and maintaining contractions through positive feedback: cervical stretch → afferent signals → oxytocin release → uterine contractions → more cervical stretch (Ferguson reflex). Synthetic oxytocin (syntocinon) is used for induction/augmentation and is the first-line uterotonic for active management of the third stage. Prostaglandins are also crucial (cervical ripening, contraction synergy); oestrogen and progesterone set the stage but oxytocin is central in active labour.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Breastfeeding',
 'Which statement is FALSE concerning good breast attachment when breastfeeding?',
 'The tongue is forward in the mouth, and may be seen over the bottom gum',
 'The lower lip is turned outwards',
 'The chin is not touching the breast',
 'More areola is visible above the baby''s mouth than below it',
 'C',
 'Good attachment criteria: chin TOUCHING (not avoiding) the breast — so option C ''chin is NOT touching the breast'' is the FALSE statement. Correct signs: chin touching breast, mouth wide open, lower lip everted (turned outward), more areola visible above the mouth than below, tongue forward over the lower gum to cup the breast.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Paediatric Nursing', 'Neonatal Respiratory Physiology',
 'The presence of surfactant in the newborn lungs helps to:',
 'Provide stimulation to the respiratory centre',
 'Reduce surface tension and allow expansion of the lungs',
 'Prevent transient tachypnoea of the newborn',
 'Increase the surface tension and allow expansion of the lungs',
 'B',
 'SURFACTANT (phospholipid mixture, mainly dipalmitoyl phosphatidylcholine, produced by type II pneumocytes from ~24-26 weeks, mature by 35 weeks) REDUCES alveolar SURFACE TENSION, prevents alveolar collapse on expiration, and ALLOWS LUNG EXPANSION with each breath. Deficiency causes neonatal Respiratory Distress Syndrome (hyaline membrane disease) in preterms — treated with exogenous surfactant via endotracheal tube.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Small for Gestational Age',
 'The light for date baby is defined as:',
 'A baby born before 37 weeks of gestation',
 'Bulk weight is 2,500 g or less regardless of gestational age',
 'A baby whose birth weight is below tenth centile for gestation',
 'A baby whose birth weight is below 3000 grams',
 'C',
 'Definitions: PRETERM = born before 37 completed weeks (option A); LOW BIRTH WEIGHT (LBW) = birth weight <2500 g regardless of gestation (option B); LIGHT/SMALL FOR DATES (SGA) = birth weight BELOW THE 10TH CENTILE for gestational age (option C — correct); appropriate-for-gestational-age (AGA) = 10th-90th centile; large for gestational age (LGA) = >90th centile.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Fetal Distress',
 'The maternal causes of fetal distress include:',
 'Hypotension, abruptio placenta',
 'Abruptio placenta, syphilis',
 'Hypertension, cord prolapse',
 'Hypotension, pre-eclampsia',
 'D',
 'Fetal distress causes are categorised as: MATERNAL — HYPOTENSION (any cause — haemorrhage, supine position, epidural-induced), HYPERTENSION (chronic or PE), maternal hypoxia, anaemia, sepsis, hyperthermia; UTEROPLACENTAL — abruption, praevia, uterine hyperstimulation, placental insufficiency; UMBILICAL CORD — cord prolapse/compression/knots; FETAL — congenital abnormalities, anaemia, sepsis, IUGR. Option D lists two pure maternal causes; option A mixes maternal (hypotension) with placental (abruption).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Fetal Skull',
 'On vaginal examination, the examining finger identified a triangular shaped soft depression on the foetal skull. This was most likely to be:',
 'Posterior fontanelle', 'Anterior fontanelle', 'Coronal suture', 'Sagittal suture',
 'A',
 'Fetal skull fontanelles: ANTERIOR fontanelle (bregma) = DIAMOND/KITE-shaped, 3-4 cm long, junction of coronal/sagittal/frontal sutures — closes by 18 months; POSTERIOR fontanelle (lambda) = TRIANGULAR (Y-shape), small, junction of sagittal and lambdoid sutures — closes by 6 weeks. The ''triangular soft depression'' = POSTERIOR fontanelle. Palpating only the posterior fontanelle indicates good flexion (occipito-anterior position); palpating only the anterior fontanelle suggests deflexion/OP.',
 'medium', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Sets 4 & 5 (selected unique questions) ────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Embryology',
 'The layer of the blastocyst that erodes the walls of the blood vessels of the decidua is the:',
 'Mesoderm', 'Cytotrophoblast', 'Syncytiotrophoblast', 'Ectoderm',
 'C',
 'The SYNCYTIOTROPHOBLAST is the invasive multinucleated outer layer of the trophoblast that erodes maternal decidual capillaries during implantation, establishes lacunae filled with maternal blood, and forms the basis of the haemochorial placenta. Cytotrophoblast is the proliferative inner layer; mesoderm and ectoderm are embryonic germ layers.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Fetal Circulation',
 'The temporary structure in foetal circulation that connects the umbilical vein to the inferior vena cava is the:',
 'Ductus arteriosus', 'Ductus venosus', 'Foramen ovale', 'Hypogastric arteries',
 'B',
 'Fetal circulatory shunts: (1) DUCTUS VENOSUS — connects umbilical vein to IVC, BYPASSING the liver (carries oxygenated blood from placenta directly into IVC → right atrium); (2) FORAMEN OVALE — connects right and left atria, bypassing the right ventricle and lungs; (3) DUCTUS ARTERIOSUS — connects pulmonary artery to aorta, bypassing the (still collapsed) lungs. Hypogastric arteries become the umbilical arteries — carry deoxygenated blood from fetus to placenta. All three shunts close functionally within days of birth.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Postnatal Care',
 'Breast engorgement during puerperium occurs:',
 '3rd-4th day', '5th-6th day', '10th-14th day', '1st-2nd day',
 'A',
 'PHYSIOLOGICAL breast ENGORGEMENT typically occurs around the 3rd-4th day postpartum, coinciding with the onset of copious milk production (''milk coming in''). Breasts become full, firm, warm and tender. Best managed by FREQUENT BREASTFEEDING ON DEMAND (every 2-3 hours), proper attachment, expressing a little milk before feeds if very tight, warm compresses before feeds (let-down) and cold compresses after feeds (reduce swelling). Resolves in 24-48 hours with continued breastfeeding.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Diagnosis of Pregnancy',
 'Probable signs of pregnancy include:',
 'Amenorrhoea, pregnancy test positive, frequency of micturition',
 'Ballottement of the fetus, Braxton Hicks contractions, positive pregnancy test',
 'Amenorrhoea, breast changes, quickening',
 'Foetal heart tones, visualization of the foetus, foetal parts palpated',
 'B',
 'Signs of pregnancy are classified as: PRESUMPTIVE (subjective — amenorrhoea, breast changes, quickening, fatigue, nausea, urinary frequency); PROBABLE (objective signs by examiner — POSITIVE PREGNANCY TEST, abdominal/uterine enlargement, Hegar''s sign, Chadwick''s sign, Goodell''s sign, BALLOTTEMENT, BRAXTON HICKS contractions); POSITIVE (definitive — fetal heart auscultation, fetal movements felt by examiner, ultrasound visualisation). Option B all probable signs.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Uterine Physiology in Labour',
 'Polarity in the first stage of labour means:',
 'Neuro muscular harmony that prevails between the two uterine segments',
 'Formation of the upper and lower uterine segments',
 'Painless uterine contractions felt by the woman',
 'Contractions that start from the cornua and spread towards the lower uterine segment',
 'A',
 'POLARITY in labour = the NEUROMUSCULAR HARMONY between the actively contracting/retracting UPPER UTERINE SEGMENT and the passively dilating LOWER UTERINE SEGMENT. The upper segment shortens with each contraction (retraction), pulling up the lower segment and the cervix — leading to effacement and dilatation. Disturbed polarity (e.g. reversed polarity) causes incoordinate labour and slow progress.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Maternal & Child Health', 'Vital Statistics',
 'Perinatal mortality rate is defined as:',
 'Number of infants dying under one week per 1000 life births per year',
 'Number of still births and neonatal deaths during the first weeks of life per 1000 life and still births per year',
 'Number of infants dying under one year per 1,000 live births per year',
 'Number of still births and neonatal deaths during the first year of life per 1000 live and still births per year',
 'B',
 'PERINATAL MORTALITY RATE = (stillbirths + early neonatal deaths in first 7 days) per 1000 TOTAL BIRTHS (live + still) per year. Reflects late antenatal, intrapartum and immediate post-natal care quality. Distinguish from: NEONATAL MR (deaths in first 28 days per 1000 live births); INFANT MR (deaths in first year per 1000 live births); UNDER-5 MR. Option B describes PMR.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Mastitis Prevention',
 'The prevention of mastitis during the puerperium includes:',
 'Proper attachment of the baby to the nipple',
 'Application of hot compresses on the breast',
 'Washing breasts with warm water after breast feeding',
 'Wearing a firm and supportive brassiere',
 'A',
 'MASTITIS prevention: PROPER ATTACHMENT of the baby to the BREAST (not nipple-feeding — the baby must take a large mouthful of breast tissue with the nipple far back in the mouth) — this prevents nipple cracks/fissures which are the entry point for bacteria; frequent breastfeeding/expressing to prevent milk stasis; avoid skipping feeds; treat blocked ducts promptly; hand hygiene; avoid tight bras. Warm compresses help with let-down and unblocking ducts but are treatment, not prevention.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Fetal Skull Diameters',
 'The presenting diameter in occipitoposterior position is the:',
 'Suboccipitofrontal diameter', 'Occipitofrontal diameter', 'Biparietal diameter', 'Bitemporal diameter',
 'B',
 'Fetal skull presenting diameters depend on the degree of head flexion: WELL-FLEXED VERTEX (occipito-anterior) — suboccipito-bregmatic 9.5 cm; OCCIPITO-POSTERIOR (DEFLEXED) — OCCIPITO-FRONTAL diameter 11.5 cm (larger, causes prolonged labour); BROW PRESENTATION — mento-vertical 13.5 cm (largest, usually undeliverable vaginally); FACE PRESENTATION — sub-mentobregmatic 9.5 cm.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Antenatal Assessment',
 'Pelvic abdominal palpation on a pregnant woman is done to:',
 'Locate foetal pole to determine presentation',
 'Locate foetal back to determine position',
 'Ascertain the level of engagement',
 'Rule out splenomegaly in case of jaundice',
 'C',
 'Leopold''s manoeuvres include: (1) FUNDAL palpation — what''s in the fundus (breech/head/transverse); (2) LATERAL palpation — locate fetal back to determine POSITION; (3) PAWLIK''s grip — fetal pole over symphysis pubis to determine PRESENTATION; (4) PELVIC/Deep PELVIC palpation — ASCERTAIN LEVEL OF ENGAGEMENT (how many fifths above the brim). So pelvic palpation specifically assesses engagement.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Diagnosis of Pregnancy',
 'Hegar''s sign is a probable sign of pregnancy characterised by:',
 'Softening of the cervix',
 'Periodic uterine tightening',
 'Colour change of the vagina from pink to violet',
 'Softening of the lower uterine segment',
 'D',
 'Classic probable signs: HEGAR''S SIGN — softening of the LOWER UTERINE SEGMENT (isthmus, examined bimanually at 6-12 weeks — fingers in fornix nearly meet fingers on abdomen); GOODELL''S SIGN — softening of the CERVIX; CHADWICK''S SIGN — bluish/violet discoloration of the VAGINA AND CERVIX from venous congestion; BRAXTON HICKS — periodic painless uterine tightenings. Option D correctly describes Hegar''s.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Obstetric Terminology',
 'The term presentation means that:',
 'The presenting part has sunk into the lower uterine segment',
 'The largest diameter of the foetal skull has passed through the pelvic brim',
 'Part of the fetus which lies in the lower pole of the uterus',
 'The part of the fetus which lies over the cervical os during labour and on which the caput succedaneum forms',
 'C',
 'Obstetric terminology: LIE — relationship of fetal long axis to maternal long axis (longitudinal, transverse, oblique); PRESENTATION — the PART OF THE FETUS LYING IN THE LOWER POLE OF THE UTERUS (cephalic, breech, shoulder, compound); PRESENTING PART — the part actually felt at the cervix on vaginal exam (vertex, brow, face, breech, shoulder, hand, cord); POSITION — relationship of denominator (occiput in vertex) to maternal pelvis; ENGAGEMENT (option B) — when the widest diameter of the head has passed the pelvic brim.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Reproductive Physiology',
 'The phases of the ovarian cycle are:',
 'Menstrual, follicular and luteal',
 'Menstrual, proliferative and secretory',
 'Follicular, luteal and proliferative',
 'Secretory, luteal and follicular',
 'A',
 'The MENSTRUAL CYCLE is described in two parallel cycles: OVARIAN CYCLE has 3 phases — MENSTRUAL (day 1-5, low hormones), FOLLICULAR (day 1-13, FSH-driven follicle maturation, rising oestrogen), and LUTEAL (day 15-28, corpus luteum produces progesterone). UTERINE/ENDOMETRIAL CYCLE has parallel phases — menstrual, proliferative (oestrogen-driven), and secretory (progesterone-driven). Option A is the ovarian terminology.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Neonatal Reflexes',
 'The reflex responses that protect the infant from airway obstruction are the:',
 'Gag, cough, sneeze',
 'Rooting, asymmetrical tonic neck, gag',
 'Swallowing, sucking, asymmetrical tonic neck',
 'Sucking, rooting, cough',
 'A',
 'AIRWAY PROTECTIVE REFLEXES in the neonate: GAG (CN IX/X — protects against aspiration of pharyngeal contents); COUGH (clears tracheobronchial tree); SNEEZE (clears nasal passages); SWALLOWING (coordinates with breathing). Rooting/sucking are FEEDING reflexes (CN V, VII, IX, X, XII); asymmetrical tonic neck (ATNR) is a POSTURAL reflex ("fencer''s pose") not airway-protective.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Perineal Tears',
 'Second degree tear involves:',
 'The fourchette and the anal sphincter',
 'Bulbocavernosus and pubococcygeous muscles only',
 'Damage to the anal sphincter and rectal mucosa',
 'Fourchette and superficial perineal muscles',
 'D',
 'Perineal tear classification: FIRST DEGREE — vaginal mucosa, fourchette and perineal skin only; SECOND DEGREE — fourchette + perineal muscles (bulbocavernosus, superficial transverse perineal), NOT involving anal sphincter; THIRD DEGREE — extends into the anal sphincter complex (3a <50% external sphincter, 3b >50% external, 3c involves internal sphincter); FOURTH DEGREE — extends into rectal mucosa. Option D describes second-degree tear.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Neonatal Jaundice',
 'The management of physiological jaundice in a newborn includes:',
 'Early feeding, phototherapy, observing for the degree of jaundice',
 'Intravenous fluids, observing for the degree of jaundice, early feeding',
 'Increasing the frequency of feeding, observing for the degree of jaundice, checking the serum bilirubin level',
 'Phototherapy, nasogastric tube feeding, observing the degree of jaundice',
 'C',
 'PHYSIOLOGICAL jaundice (appears day 2-3, peaks day 4-5, resolves by day 7-10 in term babies; cause = increased RBC breakdown + immature hepatic conjugation + enterohepatic circulation) is managed CONSERVATIVELY: FREQUENT BREASTFEEDING (8-12 times/day — empties bilirubin via stool, reduces enterohepatic circulation); OBSERVATION (visual assessment using Kramer''s zones — face/trunk/limbs); CHECK SERUM BILIRUBIN if jaundice extensive, in the first 24 hrs, in preterm, or other risk factors. Phototherapy is reserved for ABOVE-threshold levels (PATHOLOGICAL or severe physiological).',
 'medium', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Sets 5-7 (selected unique questions) ──────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Pelvic Anatomy',
 'Features of the android pelvis include:',
 'Heart shaped brim, straight side walls, narrow fore pelvis',
 'Rounded brim, blunt ischial spines, rounded sciatic notch',
 'Divergent side walls, blunt ischial spines, wide sciatic notch',
 'Narrow forepelvis, convergent side walls, narrow sciatic notch',
 'D',
 'Pelvis types (Caldwell-Moloy): GYNAECOID (50% — round brim, ideal for delivery); ANDROID (~30% — male-type: heart/wedge-shaped brim, NARROW FOREPELVIS, CONVERGENT side walls, prominent ischial spines, NARROW sciatic notch, narrow pubic arch — predisposes to deep transverse arrest and OP position); ANTHROPOID (~25% — oval AP brim, deep pelvis, favours OP); PLATYPELLOID (rare, ~3% — transverse oval brim, shallow). Option D is more specific and detailed for android pelvis.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Pharmacology', 'Eclampsia Management',
 'The correct regimen for administering magnesium sulphate loading dose intramuscularly is:',
 '5 g given as a divided dose in each of the buttocks over a period of 10-15 minutes',
 '10 g as a divided dose in each of the buttock over a period not less than 5 minutes',
 '4 g as divided dose in each buttock over a period of not less than 5 minutes',
 '5 g over a period of between 10-15 minutes',
 'A',
 'Pritchard regimen for eclampsia (IM): LOADING DOSE — 4 g IV over 5-15 min PLUS 10 g IM (5 g into each buttock as a deep IM injection with 1 mL of 2% lignocaine to reduce pain). MAINTENANCE — 5 g IM into alternate buttocks EVERY 4 HOURS for 24 hours after the last seizure or delivery. The loading IM dose is therefore 10 g (5 g into each buttock). Option A describes this correctly.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Fetal Skull Diameters',
 'The diameter of the foetal skull that measures 13.5 cm is the:',
 'Suboccipitobregmatic', 'Occipitofrontal', 'Mentovertical', 'Submentovertical',
 'C',
 'Fetal skull DIAMETERS: SUBOCCIPITOBREGMATIC 9.5 cm (well-flexed vertex — smallest, most favourable); SUBOCCIPITOFRONTAL 10 cm; OCCIPITOFRONTAL 11.5 cm (deflexed/OP); SUBMENTOBREGMATIC 9.5 cm (face); SUBMENTOVERTICAL 11.5 cm (face crowning); MENTOVERTICAL 13.5 cm (BROW PRESENTATION — LARGEST, usually undeliverable vaginally); BITEMPORAL 8.2 cm; BIPARIETAL 9.5 cm. Hence 13.5 cm = mentovertical.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Embryology',
 'The layer of the inner cell mass from which bones and muscle tissue arise is the:',
 'Mesoderm', 'Ectoderm', 'Endoderm', 'Cytotrophoblast',
 'A',
 'Embryonic germ layers and their derivatives: ECTODERM → epidermis, nervous system, sense organs; MESODERM → bones, muscles, connective tissue, cardiovascular system, urogenital system, blood; ENDODERM → gut epithelium, liver, pancreas, lung epithelium, urinary bladder. So bones and muscles arise from MESODERM. Cytotrophoblast is part of the trophoblast (placental, not embryonic).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'The function of the seminiferous tubules is to:',
 'Store sperm', 'Produce sperm', 'Secrete seminal fluid', 'Transport semen',
 'B',
 'SEMINIFEROUS TUBULES (in the testes) are where SPERMATOGENESIS occurs — spermatogonia divide and mature into spermatozoa, supported by Sertoli cells. STORAGE of mature sperm: EPIDIDYMIS. Seminal fluid is produced by seminal vesicles (60%), prostate (30%) and bulbourethral glands (Cowper''s). Transport: vas deferens → ejaculatory duct → urethra.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Puerperal Sepsis',
 'The most common organism causing puerperal sepsis is:',
 'Beta-haemolytic streptococcus', 'Escherichia coli', 'Staphylococcus aureus', 'Clostridium perfringens',
 'A',
 'GROUP A BETA-HAEMOLYTIC STREPTOCOCCUS (Streptococcus pyogenes) is the classic and most virulent cause of puerperal sepsis (post-childbed fever). Anaerobic streptococci, E. coli, staphylococci and clostridia are other causes. Polymicrobial infections are common. Treatment: broad-spectrum IV antibiotics (e.g. amoxicillin + gentamicin + metronidazole), supportive care; early identification through obstetric early warning scores is key.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'Effects of pregnancy on the cardiovascular system include all EXCEPT:',
 'Increase in cardiac output by 30-50%',
 'Increase in blood volume by 40-50%',
 'Increase in peripheral resistance',
 'Slight increase in heart rate',
 'C',
 'Cardiovascular changes in pregnancy: blood volume INCREASES 40-50% (plasma volume rises more than red-cell mass → physiological haemodilution/''physiological anaemia''); cardiac output INCREASES 30-50% (peaks at 28-32 weeks); heart rate INCREASES ~15 bpm; stroke volume increases; PERIPHERAL VASCULAR RESISTANCE DECREASES (under progesterone effect); BP falls in 2nd trimester (lowest), returns to pre-pregnancy in 3rd; venous pressure in legs rises. So ''increase in peripheral resistance'' (option C) is the FALSE statement (it actually DECREASES).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Puerperium',
 'The puerperium is defined as the period from delivery to:',
 '14 days', '28 days', '6 weeks', '12 weeks',
 'C',
 'PUERPERIUM = period from delivery of placenta to RETURN OF REPRODUCTIVE ORGANS TO PRE-PREGNANCY STATE = approximately 6 WEEKS (42 days). During this time uterine involution completes, lochia changes (rubra → serosa → alba), breastfeeding establishes, menstruation may resume (later in breastfeeders). Most maternal deaths in the broader maternal mortality definition include up to 42 days postpartum (= puerperium).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Induction of Labour',
 'Which of the following statements about Bishop''s score is CORRECT?',
 'Bishop''s score assesses induction favourability — TRUE; A score above 6 is favourable — FALSE',
 'Bishop''s score assesses induction favourability — FALSE; A score above 6 is favourable — TRUE',
 'Bishop''s score assesses induction favourability — TRUE; A score above 6 is favourable — TRUE',
 'Bishop''s score assesses induction favourability — FALSE; A score above 6 is favourable — FALSE',
 'C',
 'BISHOP''S SCORE assesses cervical readiness for induction of labour. Five parameters scored 0-2 (or 0-3 for some): dilatation, effacement, station, consistency, position — maximum 13. INTERPRETATION: ≤5 = unfavourable (consider cervical ripening first with prostaglandins or balloon catheter); ≥6 (some authorities >6 or ≥8) = FAVOURABLE — proceed directly with oxytocin/ARM. Higher score = higher likelihood of vaginal delivery within 24 hours. Both statements are TRUE.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Cord Prolapse',
 'The most appropriate position for cord prolapse is:',
 'Trendelenburg', 'Knee-chest', 'Left lateral', 'Both Trendelenburg and knee-chest',
 'D',
 'CORD PROLAPSE is an OBSTETRIC EMERGENCY (cord compressed between presenting part and pelvis → fetal hypoxia/death). Immediate actions: REPLACE the cord into the vagina if visible, AVOID handling; position the mother in TRENDELENBURG (head down, feet up) OR KNEE-CHEST position — both elevate the pelvis, allow gravity to keep the presenting part off the cord; manually elevate the presenting part with examining fingers; fill bladder with 500-700 mL saline (lifts presenting part off cord); STAT CS unless vaginal delivery is imminent. Both Trendelenburg and knee-chest are appropriate.',
 'hard', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Maternal & Child Health', 'Neural Tube Defect Prevention',
 'Folic acid prevents which of the following in the fetus?',
 'Down''s syndrome', 'Neural tube defects', 'Anencephaly', 'Both neural tube defects and anencephaly',
 'D',
 'FOLIC ACID supplementation (400 mcg/day pre-conception and through 1st trimester; 5 mg/day for higher risk women — previous NTD pregnancy, on antiepileptic drugs, diabetic, obese) prevents NEURAL TUBE DEFECTS: SPINA BIFIDA (lower spine NTDs), ANENCEPHALY (absence of cranial vault and brain — fatal), encephalocele. Most NTDs occur because the neural tube fails to close by day 28 post-conception (often before pregnancy is recognised) — hence the importance of PRE-CONCEPTION folic acid.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Hormones in Pregnancy',
 'The hormones that facilitate the mobility of pelvic joints during pregnancy and labour are:',
 'Relaxin and oestrogen', 'Relaxin and progesterone', 'Oxytocin and progesterone', 'Oestrogen and progesterone',
 'B',
 'RELAXIN (from corpus luteum, placenta, decidua) and PROGESTERONE together cause RELAXATION OF PELVIC LIGAMENTS (sacroiliac joints, pubic symphysis) and CERVICAL SOFTENING — increasing pelvic capacity for delivery. Excessive joint laxity can cause symphysis pubis dysfunction (SPD) — pelvic girdle pain. Oestrogen contributes to ligament hyperlaxity to a lesser extent. Oxytocin''s role is uterine contraction, not joint mobility.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Placenta Praevia',
 'The most appropriate management of placenta praevia type III is:',
 'Vaginal delivery', 'Elective caesarean section at 38 weeks', 'Induction of labour', 'Vacuum extraction',
 'B',
 'PLACENTA PRAEVIA Type III (partial — covers internal os when closed but uncovers as cervix dilates) and Type IV (complete/central): VAGINAL DELIVERY IS CONTRAINDICATED (catastrophic haemorrhage risk). Management: expectant management with bed rest in hospital, blood available, steroids if preterm; ELECTIVE CAESAREAN SECTION typically at 36-38 WEEKS (or earlier if recurrent bleeding). Some protocols deliver at 34-36 weeks for major praevia. Type I-II (''minor'') may allow trial of labour.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Third Stage of Labour',
 'Which of the following statements about active management of third stage is CORRECT?',
 'Active management = oxytocin within 1 min of birth — TRUE; Cord traction before placental separation — TRUE',
 'Active management = oxytocin within 1 min of birth — TRUE; Cord traction before placental separation — FALSE',
 'Active management = oxytocin within 1 min of birth — FALSE; Cord traction before placental separation — TRUE',
 'Active management = oxytocin within 1 min of birth — FALSE; Cord traction before placental separation — FALSE',
 'B',
 'ACTIVE MANAGEMENT OF THE THIRD STAGE OF LABOUR (AMTSL) reduces PPH risk by 60%. Components: OXYTOCIN 10 IU IM within 1 minute of birth (after excluding a second baby) — TRUE; CONTROLLED CORD TRACTION WITH COUNTER-PRESSURE on the uterus during a contraction AFTER signs of placental separation; uterine massage after placental delivery. Cord traction is applied only AFTER signs of placental separation (cord lengthening, gush of blood, change in uterine shape). Pulling before separation risks uterine inversion or cord rupture — FALSE to do cord traction before separation.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Neonatal Thermoregulation',
 'Heat loss from a wet newborn is mainly by:',
 'Conduction', 'Convection', 'Evaporation', 'Radiation',
 'C',
 'A WET newborn loses heat predominantly by EVAPORATION (latent heat of water evaporating from skin). This is why the FIRST step of essential newborn care is to DRY THE BABY thoroughly with a clean warm cloth and remove the wet cloth — single most effective intervention to prevent neonatal hypothermia. Other modes (conduction, convection, radiation) also contribute but evaporation dominates when the baby is wet.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

-- Uncategorised Set 6 unique questions
('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'Leg cramps experienced by women during third trimester is usually due to:',
 'Increased serum ionized phosphates and decreased levels of sodium chloride',
 'Lowered serum ionized iron and increased level of phosphates',
 'Increased serum ionized calcium and decreased levels of phosphates',
 'Lowered serum ionized calcium and increased level of phosphates',
 'D',
 'Third-trimester leg cramps are attributed to an imbalance of calcium/phosphate metabolism — LOW SERUM IONISED CALCIUM (drawn into fetal skeletogenesis, dietary inadequacy) and RELATIVELY HIGH PHOSPHATE levels, plus pressure on pelvic nerves and venous stasis. Management: calcium-rich diet (milk, cheese, green leafy vegetables), calcium supplementation if dietary intake is inadequate, gentle stretching of calf muscles, leg elevation, magnesium in some protocols.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Mechanism of Labour',
 'The order of foetal movements during normal labour after descent is:',
 'Extension of the head, internal rotation of the head, extension of the head, lateral flexion, restitution',
 'Lateral flexion, extension of the head, internal rotation of the head, lateral flexion, restitution',
 'Flexion, internal rotation of the head, extension of the head, restitution, lateral flexion',
 'Flexion, extension of the head, internal rotation of the head, restitution, lateral flexion',
 'C',
 'CARDINAL MOVEMENTS OF LABOUR in vertex presentation (after engagement and descent): FLEXION (chin to chest, presenting smallest diameter) → INTERNAL ROTATION (occiput rotates to anterior — under symphysis) → EXTENSION (delivery of head over perineum) → RESTITUTION (head untwists to natural alignment with shoulders) → EXTERNAL ROTATION (shoulders rotate to AP diameter) → LATERAL FLEXION (delivery of anterior then posterior shoulder, then body). Option C follows this sequence after descent.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Paediatric Nursing', 'Neonatal Resuscitation',
 'The ratio of chest compressions to inflations during neonatal resuscitation is:',
 '15:2', '30:2', '3:1', '3:2',
 'C',
 'NEONATAL RESUSCITATION (NRP/HBB): when chest compressions are needed (HR <60 bpm after 30 sec of effective ventilation), the ratio is 3 COMPRESSIONS : 1 VENTILATION, giving 90 compressions + 30 breaths per minute (120 events/min total). This differs from adult (30:2) and child CPR. Compress lower third of sternum, depth 1/3 chest AP diameter. Re-assess HR every 30-60 seconds.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Family Planning',
 'Which of the following statements about contraception is CORRECT?',
 'Copper IUD is contraindicated in women with unexplained vaginal bleeding — TRUE; Progestin only pills are more effective than combined pills in emergency contraception — FALSE',
 'Copper IUD is contraindicated in women with unexplained vaginal bleeding — FALSE; Progestin only pills are more effective than combined pills in emergency contraception — TRUE',
 'Copper IUD is contraindicated in women with unexplained vaginal bleeding — TRUE; Progestin only pills are more effective than combined pills in emergency contraception — TRUE',
 'Copper IUD is contraindicated in women with unexplained vaginal bleeding — FALSE; Progestin only pills are more effective than combined pills in emergency contraception — FALSE',
 'C',
 'Unexplained vaginal bleeding is a Category 4 (absolute contraindication) for Cu-IUD/LNG-IUS insertion per WHO Medical Eligibility Criteria — bleeding must be investigated first (could be malignancy or pregnancy) — TRUE. For EMERGENCY CONTRACEPTION, LEVONORGESTREL 1.5 mg (progestin-only, taken within 72 hours, ideally <24h) is more effective AND has fewer side effects than the older Yuzpe regimen (combined COCs). Ulipristal acetate is even more effective up to 120 hrs. Most effective is Cu-IUD within 120 hours (>99%) — TRUE.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Placental Examination',
 'During examination of the placenta, the normal findings on the fetal side include:',
 'Blood vessels, amnion, battledore cord insertion',
 'Chorion, blood vessels, battledore cord insertion',
 'Amnion, blood vessels, central cord insertion',
 'Central cord insertion, lobes, blood vessels',
 'C',
 'Placental examination: FETAL SIDE (chorionic plate) is SHINY, covered by AMNION, with BLOOD VESSELS radiating outward, and umbilical cord inserted CENTRALLY (normal). Abnormal cord insertions: BATTLEDORE (at margin), VELAMENTOUS (on membranes — vessels at risk of rupture, vasa praevia). MATERNAL SIDE is dull, lobulated with 15-20 COTYLEDONS, divisions/grooves. Examine completeness — missing cotyledons or membrane defects suggest retained tissue. Option C describes the normal fetal side.',
 'medium', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Sets 7-10 (selected unique questions) ─────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Maternal & Child Health', 'Neonatal Prophylaxis',
 'The recommended prophylactic dosage of Vitamin K for newborns is:',
 '0.5 mg for term baby and 0.25 mg for preterm baby',
 '1 mg for term baby and 0.01 mg for preterm baby',
 '1 mg for term and 0.5 mg for preterm baby',
 '0.5 mg for term baby and 1 mg for preterm baby',
 'C',
 'Vitamin K prophylaxis (per Kenya MoH/WHO): TERM newborns receive 1 MG IM stat within 1 hour of birth; PRETERM (<1500 g) receive 0.5 MG IM stat. Prevents Vitamin K Deficiency Bleeding (VKDB) — classical (days 1-7), early (within 24 hrs, if mother on enzyme-inducing drugs), and LATE VKDB (2-12 weeks, often intracranial, in exclusively breastfed without prophylaxis).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Obstetric History',
 'A mother comes to the antenatal clinic at 36 weeks gestation with a history of a fresh stillbirth and an abortion. This will be interpreted as:',
 'Para 0+2 gravida 3', 'Para 3+0 Gravida 2', 'Para 1+1 Gravida 3', 'Para 1+2 Gravida 3',
 'C',
 'Stillbirth (>24 weeks) counts as PARITY (the pregnancy reached viability and delivered a baby, even if not alive); abortion (<24 weeks) goes in the +abortions slot. So fresh stillbirth = P1; abortion = +1; current pregnancy (the 3rd). PARA 1+1 GRAVIDA 3. Option C.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Polyhydramnios',
 'Predisposing factors to polyhydramnios include:',
 'Multiparity, open neural tube defect, oesophageal atresia',
 'Maternal diabetes, oesophageal atresia, multiple pregnancy',
 'Eclampsia, anencephaly, chorioangioma',
 'Anencephaly, placenta abruption, oesophageal atresia',
 'B',
 'POLYHYDRAMNIOS (>2L amniotic fluid) causes: MATERNAL — diabetes mellitus (most common identifiable cause — fetal hyperglycaemia → polyuria); FETAL anomalies impairing swallowing/absorption — OESOPHAGEAL ATRESIA, duodenal atresia, anencephaly, open NTDs, chorioangioma, hydrops; multiple pregnancy (TTTS recipient); idiopathic (most cases). Option B lists three classic causes (DM + oesophageal atresia + multiple pregnancy).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Breech Delivery',
 'Factors that favour vaginal breech delivery include:',
 'Complete breech, primiparity',
 'Multiparity, frank breech',
 'Adequate pelvis, frank breech',
 'Episiotomy, oxytocin use',
 'C',
 'Vaginal breech delivery FAVOURABLE factors: FRANK BREECH (extended legs splint the head — easier delivery; complete breech is also acceptable but footling not); ADEQUATE pelvis (clinically and/or by CT pelvimetry); estimated fetal weight 2500-3800 g; flexed head (no hyperextension); experienced operator; multiparity is also favourable but adequate pelvis + frank breech (option C) is the more specific obstetric criterion.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Unstable Lie',
 'Maternal causes of unstable lie include:',
 'Lax uterine muscles, contracted pelvis',
 'Polyhydramnios, placenta praevia',
 'Lax uterine muscles, polyhydramnios',
 'Placenta praevia, contracted pelvis',
 'A',
 'UNSTABLE LIE = fetal lie changing repeatedly (longitudinal ↔ transverse ↔ oblique) after 36 weeks. MATERNAL causes: GRAND MULTIPARITY (LAX UTERINE MUSCLES/abdominal wall — the strongest factor), CONTRACTED PELVIS (prevents head engaging), uterine abnormalities, pelvic tumours. FETAL/UTERINE CONTENT causes: polyhydramnios, multiple pregnancy, prematurity, placenta praevia. Option A lists two pure maternal causes.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Rhesus Incompatibility',
 'Indirect Coombs test is done to:',
 'Check the presence of antigen D antibodies on fetal RBCs',
 'Check the presence of antigen D antibodies in maternal blood',
 'Establish the rhesus status of the fetus in utero',
 'Assess the presence of rhesus antigen in fetal blood',
 'B',
 'COOMBS TESTS: DIRECT Coombs (DAT) detects ANTIBODIES ALREADY BOUND to RBCs (e.g. on fetal RBCs in HDN, or in autoimmune haemolytic anaemia). INDIRECT Coombs (IDC) detects ANTIBODIES FREE IN SERUM that can cross-react — used to screen maternal blood for anti-D and other antibodies (Rh-negative women checked at booking and 28 weeks), to type blood, and for transfusion crossmatching. Option B describes IDC.',
 'hard', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Third Stage of Labour',
 'The steps in the active management of 3rd stage of labour in order of sequence are:',
 'Ruling out presence of another baby, massaging the uterus and expelling clots, administration of oxytocin',
 'Massaging the uterus and expel clots, administration of oxytocin, delivery of the placenta by controlled cord traction',
 'Ruling out presence of another baby, delivery of the placenta by controlled cord traction, massaging the uterus to expel clots',
 'Administration of oxytocin, delivery of the placenta by controlled cord traction, massaging the uterus and expelling clots',
 'D',
 'AMTSL (Active Management of the Third Stage of Labour): (1) Confirm only one baby (palpate abdomen — RULE OUT 2nd baby — done before option D''s step 1); (2) OXYTOCIN 10 IU IM within 1 minute of birth; (3) CONTROLLED CORD TRACTION with counter-pressure on the uterus during a contraction, after signs of placental separation; (4) UTERINE MASSAGE every 15 min for 1-2 hours after placental delivery to maintain tone and expel clots. Option D gives the correct order (assuming 2nd baby has already been excluded).',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'Cardiovascular changes noted in pregnancy include an increase in the following:',
 'Plasma volume, haemoglobin, red cell mass',
 'Total blood volume, red cell mass, haematocrit',
 'Plasma volume, red cell mass, total blood volume',
 'Haematocrit, plasma volume, total blood volume',
 'C',
 'Pregnancy CV changes: PLASMA VOLUME ↑ 40-50%; RED CELL MASS ↑ 20-25%; TOTAL BLOOD VOLUME ↑ 40-50%. Plasma rises more than RBC mass → HAEMOGLOBIN AND HAEMATOCRIT DECREASE (physiological haemodilution, ''physiological anaemia'' of pregnancy — Hb 10.5-11 g/dL is normal). Option C correctly identifies the three rises (plasma, red cell mass, total volume) without including Hb/Hct which fall.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Diabetes in Pregnancy',
 'One of the following statements is TRUE regarding insulin needs during pregnancy:',
 'Insulin requirements moderate as the pregnancy progresses',
 'A reduced need for insulin occurs during the second trimester',
 'Elevation of human chorionic gonadotropin decreases the need for insulin',
 'Foetal development depends on adequate insulin regulation',
 'D',
 'Insulin dynamics in pregnancy: 1st trimester — possible REDUCED insulin needs (and hypoglycaemia risk) from nausea/vomiting/anabolic state; 2nd-3rd trimesters — INCREASED insulin requirements due to anti-insulin placental hormones (hPL peaks at 32-34 weeks) — often need 2-3× pre-pregnancy doses; postpartum — sudden DROP in needs (back to or below pre-pregnancy). Adequate glycaemic control is critical for FETAL DEVELOPMENT (poor control → macrosomia, congenital malformations, RDS, neonatal hypoglycaemia, stillbirth). Option D is the most fundamentally true statement.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Pharmacology', 'Eclampsia Management',
 'Magnesium sulphate maintenance dose during management of eclampsia is:',
 '5 g IM in alternate buttocks every 4 hours for 24 hours after last seizure or delivery',
 '4 g IV every 6 hours',
 '2 g IM every 2 hours',
 '10 g IM every 8 hours',
 'A',
 'Pritchard regimen: LOADING 4 g IV + 10 g IM (5 g each buttock); MAINTENANCE 5 g IM in ALTERNATE BUTTOCKS EVERY 4 HOURS for 24 hours after the LAST SEIZURE or after DELIVERY (whichever is later). Monitor: reflexes present, RR ≥12-16/min, urine output ≥25-30 mL/hr — if any reduced, withhold next dose and check Mg level. Antidote = 10% calcium gluconate 10 mL IV slow.',
 'hard', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Pharmacology', 'Safe Drugs in Breastfeeding',
 'Drugs that may safely be given to a breastfeeding mother include:',
 'Tetracycline', 'Paracetamol', 'Doxycycline', 'Chloramphenicol',
 'B',
 'PARACETAMOL is safe in breastfeeding — minimally transferred in milk, well tolerated by infants. TETRACYCLINE/DOXYCYCLINE: deposit in growing teeth and bones (yellow tooth staining, growth retardation) — AVOID. CHLORAMPHENICOL: risk of ''GREY BABY SYNDROME'' — AVOID. Other breastfeeding-SAFE: amoxicillin, paracetamol, ibuprofen (short courses), most insulins. AVOID: methotrexate, chemotherapeutics, lithium, ergot alkaloids, radioactive iodine, amiodarone, retinoids.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Third Stage of Labour',
 'Active management of the 3rd stage of labour helps to prevent:',
 'Atonic PPH', 'Retained placenta', 'Uterine inversion', 'All of the above',
 'D',
 'AMTSL (oxytocin + CCT + uterine massage) reduces ATONIC PPH by 60%, reduces RETAINED PLACENTA, and ensures CONTROLLED placental delivery preventing UTERINE INVERSION (provided CCT is done correctly with counter-pressure and only after placental separation signs). It is the single most effective intervention for PPH prevention recommended by WHO and Kenya MoH for all births.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Neural Tube Defect Prevention',
 'The recommended dose of folic acid for a woman with previous neural tube defect pregnancy is:',
 '400 mcg daily', '1 mg daily', '5 mg daily', '10 mg daily',
 'C',
 'FOLIC ACID dosing: routine PRE-CONCEPTION = 400 micrograms (0.4 mg) DAILY for at least 1 month before conception and through 1st trimester; HIGH-RISK women (previous NTD pregnancy, anti-epileptic drugs, diabetic, obese BMI >30, family history of NTD) = 5 MG DAILY (10× higher dose) pre-conception and through 12 weeks. Reduces NTD recurrence by 70-80%.',
 'medium', 'approved', NULL, 'Paper 2'),

-- Uncategorised Set 8 unique questions
('BScN', 'Midwifery', 'Fetal Skull Diameters',
 'The presenting diameter in occipito-anterior position is the:',
 'Suboccipitobregmatic', 'Occipitofrontal', 'Mentovertical', 'Submentobregmatic',
 'A',
 'OCCIPITO-ANTERIOR (well-flexed vertex) presents the smallest, most favourable diameter — SUBOCCIPITOBREGMATIC 9.5 cm (from below the occiput to the centre of the bregma/anterior fontanelle). This is the diameter we want — and is the basis for the smallest engaging diameter. Occipitofrontal (11.5 cm) presents in deflexed/OP positions. Mentovertical (13.5 cm) in brow. Submentobregmatic (9.5 cm) in face.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Fundal Height',
 'The fundus in the 12th week of pregnancy is at:',
 'Above the symphysis pubis',
 'Just at the umbilicus',
 'Midway between umbilicus and xiphisternum',
 'Just below the xiphisternum',
 'A',
 'Fundal height milestones: WEEK 12 — just at/above the SYMPHYSIS PUBIS (the uterus rises out of the pelvis); WEEK 16 — midway between symphysis pubis and umbilicus; WEEK 20 — AT THE UMBILICUS; WEEK 24-26 — at umbilicus + slightly above; WEEK 36 — at the xiphisternum (highest point); WEEK 38-40 — descends slightly as head engages (''lightening''). Between 22-36 weeks the symphysis-fundal height in cm ≈ weeks of gestation ± 2 cm.',
 'easy', 'approved', NULL, 'Paper 2');

-- ─── Uncategorised Sets 9-10 (selected unique questions) ─────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Anatomy & Physiology', 'Reproductive Anatomy',
 'Foetal testes descend into the scrotum between:',
 '8-12 weeks', '32-36 weeks', '28-32 weeks', '36-40 weeks',
 'B',
 'Testicular descent: the testes form in the abdomen at the level of the kidneys, then descend through the inguinal canal. They reach the deep inguinal ring by ~28 weeks, traverse the inguinal canal between 28-32 weeks, and arrive in the SCROTUM BETWEEN 32-36 WEEKS. By term, ~97% of male newborns have both testes in the scrotum. UNDESCENDED TESTES (cryptorchidism) — common in preterms; if still undescended by 6-12 months, surgical orchidopexy is indicated to prevent infertility and reduce testicular cancer risk.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Antenatal Assessment',
 'A pendulous abdomen in a primigravida will likely indicate:',
 'Lax abdominal muscles', 'Multiple pregnancy', 'Pelvic contraction', 'Posterior position of the foetal occiput',
 'C',
 'A PENDULOUS ABDOMEN in a PRIMIGRAVIDA (in whom the abdominal muscles are still firm) suggests that the head is NOT engaging — typically due to PELVIC CONTRACTION (CPD) — the uterus falls forward over the contracted pelvic brim. In a multipara, pendulous abdomen is more often from lax abdominal muscles (multiple previous pregnancies). Both options A and C can cause pendulous abdomen, but C is more concerning and more typical in a primigravida.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Postnatal Care',
 'The appropriate advice you will give to a postnatal mother with stress incontinence will be to:',
 'Have adequate rest', 'Perform pelvic floor exercises', 'Increase ambulation', 'Reduce her fluid intake',
 'B',
 'STRESS URINARY INCONTINENCE (leakage with cough/sneeze/exertion) is common postpartum from pelvic floor weakening during pregnancy and delivery. First-line management: PELVIC FLOOR (KEGEL) EXERCISES — contract pelvic floor muscles 8-12 times, hold 10 seconds, 3 sets daily. Continued for at least 3 months. Avoid heavy lifting initially. Maintain normal fluid intake (restriction worsens UTI and concentrates urine — irritating). If persistent beyond 6 months, refer for urogynaecology assessment.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Placental Hormones',
 'The hormone produced by the early villi of the decidua to maintain the corpus luteum is:',
 'Human placental lactogen', 'Human chorionic gonadotropin', 'Progesterone', 'Oestrogen',
 'B',
 'hCG (Human Chorionic Gonadotropin) is produced by the syncytiotrophoblast from days 6-7 post-fertilisation (basis of pregnancy tests). Its main role is to MAINTAIN the CORPUS LUTEUM (preventing luteolysis) so it continues to secrete progesterone, which sustains the pregnancy until the placenta takes over progesterone production at ~10-12 weeks.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Physiological Changes in Pregnancy',
 'Physiological anaemia is best defined as:',
 'Low haemoglobin as a result of increase in foetal requirements',
 'Increase in plasma volume greater than the red blood cells',
 'Haemodilution as a result of fluid retention',
 'Haemoglobin less than 7 g/dl',
 'B',
 'PHYSIOLOGICAL ANAEMIA of pregnancy: plasma volume rises by ~40-50% while red cell mass rises by only ~20-25% → relative HAEMODILUTION → fall in Hb concentration despite a normal/increased total RBC mass. Hb 10.5-11.0 g/dL is normal in 2nd-3rd trimester. Pathological anaemia is Hb <11 (1st/3rd trimester) or <10.5 (2nd) per WHO. Iron and folate supplementation is routine because of increased absolute needs.',
 'medium', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Paediatric Nursing', 'Neonatal Prophylaxis',
 'Vitamin K is given to a newborn prophylactically because the newborn:',
 'Has a sterile gut, hence low vitamin K production',
 'Is born with high vitamin K stores',
 'Cannot synthesize vitamin K dependent factors',
 'Is unable to absorb vitamin K from breast milk',
 'A',
 'Newborns are deficient in Vitamin K because: (1) poor placental transfer of vitamin K to fetus; (2) STERILE NEONATAL GUT — colonising bacteria normally produce vitamin K, but the newborn gut has no flora at birth; (3) low vitamin K content of breast milk (formula has more); (4) immature hepatic synthesis of clotting factors II, VII, IX, X. Hence VKDB risk and the need for prophylactic IM vitamin K within 1 hour of birth.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Pharmacology', 'Magnesium Sulphate Toxicity',
 'Which of the following statements about calcium gluconate and magnesium sulphate toxicity is CORRECT?',
 'Calcium gluconate is the antidote for MgSO4 toxicity — TRUE; Calcium gluconate is given at 10ml of 10% IV stat — FALSE',
 'Calcium gluconate is the antidote for MgSO4 toxicity — FALSE; Calcium gluconate is given at 10ml of 10% IV stat — TRUE',
 'Calcium gluconate is the antidote for MgSO4 toxicity — TRUE; Calcium gluconate is given at 10ml of 10% IV stat — TRUE',
 'Calcium gluconate is the antidote for MgSO4 toxicity — FALSE; Calcium gluconate is given at 10ml of 10% IV stat — FALSE',
 'C',
 'Both TRUE — for MAGNESIUM SULPHATE TOXICITY (loss of patellar reflex, respiratory rate <12, oliguria, cardiac/respiratory arrest), the antidote is CALCIUM GLUCONATE 10 ML OF 10% SOLUTION (1 g calcium) given INTRAVENOUSLY OVER 10 MINUTES (slow IV — too rapid causes hypotension and arrhythmias). Concurrently stop MgSO4 infusion, support ventilation, summon help.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Vesicovaginal Fistula',
 'Risk factors for vesico-vaginal fistula include:',
 'Female genital cutting, prolonged second stage of labour',
 'Multiparity, large for gestational age baby',
 'Prolonged second stage of labour, instrumental delivery',
 'Episiotomy, caesarean section',
 'C',
 'VESICOVAGINAL FISTULA (VVF) is most commonly caused by ISCHAEMIC NECROSIS of vaginal/bladder tissue from PROLONGED LABOUR (especially PROLONGED 2ND STAGE with the presenting part trapped against the symphysis pubis compressing the bladder neck). Other causes: traumatic INSTRUMENTAL DELIVERY (forceps, ruptured uterus), surgical injury during CS or hysterectomy, malignancy, radiation, FGC/FGM scarring. Prevention: skilled birth attendance, timely CS, partogram use. Treatment: surgical repair (often delayed 3 months); social re-integration. Common in obstructed labour in low-resource settings.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Umbilical Cord Abnormalities',
 'The most common abnormality of the umbilical cord is:',
 'Two-vessel cord', 'Cord around the neck', 'Battledore insertion', 'Velamentous insertion',
 'A',
 'Normal cord has THREE VESSELS — 2 arteries and 1 vein. A SINGLE UMBILICAL ARTERY (TWO-VESSEL CORD — 1 artery + 1 vein) occurs in ~1% of singleton pregnancies (more in twins) and is the COMMONEST UMBILICAL CORD ABNORMALITY. Associated with increased risk of fetal congenital abnormalities (especially renal, cardiac) and IUGR — warrants careful fetal anatomy survey on ultrasound. Cord around the neck (nuchal cord) is very common (~30%) but is a positional finding, not an abnormality per se.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Postpartum Haemorrhage',
 'The drug of choice in the management of postpartum haemorrhage is:',
 'Ergometrine', 'Oxytocin', 'Misoprostol', 'Tranexamic acid',
 'B',
 'FIRST-LINE uterotonic for PPH treatment AND prophylaxis is OXYTOCIN (10 IU IM or 5 IU IV slow, then infusion 20-40 IU in 1L crystalloid). Second-line: ERGOMETRINE (0.5 mg IM/slow IV — but CONTRAINDICATED in HYPERTENSION); MISOPROSTOL (800 mcg sublingual/rectal — useful when oxytocin unavailable, no cold chain needed); CARBOPROST (250 mcg IM, repeat every 15 min — caution in asthma). TRANEXAMIC ACID (1 g IV within 3 hours of PPH onset) is an adjunct that reduces death from bleeding (WOMAN trial).',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Midwifery', 'Hypertensive Disorders of Pregnancy',
 'Which of the following statements about eclampsia is CORRECT?',
 'Eclampsia can occur in the postpartum period — TRUE; Pre-eclampsia resolves immediately after delivery — TRUE',
 'Eclampsia can occur in the postpartum period — FALSE; Pre-eclampsia resolves immediately after delivery — FALSE',
 'Eclampsia can occur in the postpartum period — TRUE; Pre-eclampsia resolves immediately after delivery — FALSE',
 'Eclampsia can occur in the postpartum period — FALSE; Pre-eclampsia resolves immediately after delivery — TRUE',
 'C',
 'POSTPARTUM ECLAMPSIA accounts for ~25% of all eclampsia cases; can occur up to 6 weeks postpartum, most within 48-72 hours. MgSO4 is continued for 24 hours after delivery (or after the last seizure) to prevent postpartum seizures — TRUE. Pre-eclampsia symptoms and signs (HTN, proteinuria) often persist for days-weeks postpartum and may even WORSEN initially (postpartum BP peaks at day 3-6 due to fluid shifts). Antihypertensives may be needed for weeks; full resolution typically takes 6-12 weeks — FALSE that it resolves immediately.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'Anaemia in Pregnancy',
 'Iron requirements during pregnancy increase to:',
 '15 mg/day', '30-60 mg/day', '100 mg/day', '200 mg/day',
 'B',
 'IRON requirements rise dramatically in pregnancy (increased red cell mass, fetal needs, placental needs, replacement of blood loss at delivery). Total iron need ~1000 mg over pregnancy. Daily requirement rises from 18 mg pre-pregnancy to ~27-30 mg/day in pregnancy. Routine prophylaxis per Kenya MoH/WHO: IRON 30-60 MG ELEMENTAL IRON DAILY (often ferrous sulphate 200 mg = 60 mg elemental) + folic acid 400 mcg daily through pregnancy and 3 months postpartum. For established iron-deficiency anaemia, therapeutic doses are higher (120 mg/day).',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Stages of Labour',
 'The normal duration of the second stage of labour in a multipara is:',
 '30 minutes', '1 hour', '2 hours', '3 hours',
 'B',
 'Second stage duration: PRIMIGRAVIDA up to 2 HOURS (3 hours with epidural); MULTIPARA up to 1 HOUR (2 hours with epidural). Prolonged second stage beyond these limits is associated with maternal and fetal morbidity (perineal trauma, PPH, fetal distress, neonatal hypoxia) and warrants assisted delivery (instrumental or CS) once obstructed labour is excluded.',
 'easy', 'approved', NULL, 'Paper 2'),

-- Set 10 unique questions
('BScN', 'Anatomy & Physiology', 'Pelvic Anatomy',
 'The components of the bony pelvis are:',
 'Two innominate bones, sacrum, coccyx',
 'Ilium, ischium, pubis',
 'Two innominate bones, sacrum, lumbar vertebrae',
 'Sacrum, coccyx, hip bones, femur',
 'A',
 'The bony pelvis consists of FOUR bones: TWO INNOMINATE (hip) bones (each formed by ilium + ischium + pubis fused), one SACRUM (5 fused vertebrae), and one COCCYX (4 fused vertebrae). Joined by 4 joints: 2 sacroiliac (posterior), pubic symphysis (anterior), sacrococcygeal (posterior-inferior). All four joints soften under relaxin/progesterone during pregnancy.',
 'easy', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'Amniotic Fluid',
 'The function of amniotic fluid includes:',
 'Protection of the fetus from mechanical injury',
 'Maintenance of constant temperature for the fetus',
 'Permits free movement of the fetus',
 'All of the above',
 'D',
 'AMNIOTIC FLUID FUNCTIONS: PROTECTS the fetus from mechanical injury (cushion against external trauma, cord compression); maintains constant TEMPERATURE; allows free FETAL MOVEMENT (essential for musculoskeletal and pulmonary development); permits symmetrical fetal growth; prevents adhesions between fetal parts and amnion; antibacterial properties; lubricates birth canal at rupture of membranes; assists cervical dilatation (forewaters). All four are true → option D.',
 'easy', 'approved', NULL, 'Paper 2');

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, status, exam_year, paper) VALUES

('BScN', 'Medical-Surgical Nursing', 'Hyperemesis Gravidarum',
 'Hyperemesis gravidarum is best managed by:',
 'Frequent small meals at home only',
 'Hospital admission for IV fluid, antiemetics, and electrolyte correction',
 'Oral rehydration salts only',
 'Sedation and bed rest at home',
 'B',
 'HYPEREMESIS GRAVIDARUM (intractable nausea/vomiting in pregnancy, severe enough to cause weight loss >5%, dehydration, electrolyte imbalance, ketonuria) requires HOSPITAL ADMISSION: IV FLUIDS (normal saline or Hartmann''s — correct dehydration and electrolyte abnormalities especially hypokalaemia, hypochloraemic alkalosis); ANTIEMETICS (promethazine, metoclopramide, ondansetron); thiamine supplementation (prevent Wernicke''s encephalopathy); investigate for molar pregnancy, multiple pregnancy, UTI. Most resolve by 16-20 weeks. Severe cases may need TPN.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Maternal & Child Health', 'PMTCT',
 'Which of the following statements about HIV testing and breastfeeding in HIV-positive women is CORRECT?',
 'HIV testing is routine for all pregnant women — TRUE; HIV-positive women should not breastfeed — TRUE',
 'HIV testing is routine for all pregnant women — FALSE; HIV-positive women should not breastfeed — FALSE',
 'HIV testing is routine for all pregnant women — TRUE; HIV-positive women should not breastfeed — FALSE',
 'HIV testing is routine for all pregnant women — FALSE; HIV-positive women should not breastfeed — TRUE',
 'C',
 'Per Kenya MoH PMTCT guidelines, all pregnant women are offered HIV testing at the first ANC visit (opt-out approach), with repeat testing at 36 weeks and at delivery if previously negative — to identify positive mothers and start ART — TRUE. Current WHO/Kenya guidelines RECOMMEND EXCLUSIVE BREASTFEEDING FOR 6 MONTHS for HIV-positive mothers on ART (the benefits of breastfeeding outweigh the small residual transmission risk when mother is virally suppressed). After 6 months, continued breastfeeding with complementary feeding for up to 12 months. The previous AFASS-criteria advice for replacement feeding has been superseded — FALSE that HIV+ women should not breastfeed.',
 'medium', 'approved', NULL, 'Paper 2'),

('BScN', 'Midwifery', 'True vs False Labour',
 'The signs of true labour include:',
 'Regular painful contractions, progressive cervical change, show',
 'Irregular contractions, no cervical change',
 'Braxton Hicks contractions, no cervical change',
 'Painless tightenings, no descent of presenting part',
 'A',
 'TRUE LABOUR vs FALSE LABOUR (Braxton Hicks): TRUE labour has REGULAR painful CONTRACTIONS increasing in frequency, intensity and duration; PROGRESSIVE CERVICAL EFFACEMENT AND DILATATION; SHOW (mucus + blood plug from cervix); descent of presenting part; not relieved by rest/sedation/movement. FALSE LABOUR: irregular contractions, no cervical change, often relieved by walking/rest, no show. Option A lists three definitive true-labour signs.',
 'easy', 'approved', NULL, 'Paper 2');

-- =============================================================================
-- Update question_count in units table for affected cadres
-- =============================================================================
UPDATE units u
SET question_count = (
  SELECT COUNT(*) FROM questions q
  WHERE q.cadre = u.cadre AND q.unit = u.name AND q.status = 'approved'
)
WHERE u.cadre IN ('BScN', 'KRCHN');
