-- Migration: 20260628000005
-- Source: NCK-NEW-MCQ-Compilation.docx — Year 2023 (NCK APRIL 2023 CBT)
-- Both KRCHN and BScN, Paper I and Paper II
-- Audit: verified against MOH Kenya, Myles, Brunner & Suddarth, BNF, DSM-5,
--        Kenya EPI, IMNCI, FP/STI/TB/NLTP guidelines, NCK curriculum
-- Paper assignment per nck-exam-system.md Section 12.
-- ON CONFLICT (stem, cadre) DO NOTHING on every INSERT.

-- ── Q1: Benevolent authoritative leader — complete trust in subordinates ───────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Leadership Styles','The following are features of a benevolent authoritative leader:','One who exercises absolute power','One who relies on charm and persuasiveness','One who takes into account the views of others','One who has complete trust in subordinates','D','A benevolent authoritative leader has complete trust and confidence in subordinates while still being directive (Likert''s management systems; nursing management/leadership texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Leadership Styles','The following are features of a benevolent authoritative leader:','One who exercises absolute power','One who relies on charm and persuasiveness','One who takes into account the views of others','One who has complete trust in subordinates','D','Likert''s System 2 (Benevolent-Authoritative): leader has full trust in subordinates, though decisions remain largely centralised. Nurses distinguish this from democratic (System 4) for leadership style analysis (nursing management texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q2: Assault — original P3 form remains with victim ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Professional Ethics','In case of an assault, the P3/PRC form distribution is:','The original form remains with the police','The triplicate form remains with the victim','The duplicate form remains with the hospital','The original form remains with the victim','D','In assault/sexual violence documentation, the original P3/PRC form remains with the victim/survivor as their record, per MOH Kenya gender-based violence guidelines.','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Professional Ethics','In case of an assault, the P3/PRC form distribution is:','The original form remains with the police','The triplicate form remains with the victim','The duplicate form remains with the hospital','The original form remains with the victim','D','Original P3 form = victim; duplicate = hospital/facility; triplicate = police. Nurses managing GBV cases must know correct documentation to protect legal rights (MOH Kenya GBV guidelines; NCK professional ethics).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q3: Tonic stage — sustained spasms ────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Disorders','Convulsion with painful spasms of facial muscles is a feature of:','Tonic stage of convulsion','Clonic stage of convulsion','Aura stage of convulsion','Post-ictal stage of convulsion','A','Sustained muscle contraction with rigidity and painful facial spasms characterises the tonic stage of a generalised seizure (Brunner & Suddarth; Basic Paediatric Protocols).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Disorders','Convulsion with painful spasms of facial muscles is a feature of:','Tonic stage of convulsion','Clonic stage of convulsion','Aura stage of convulsion','Post-ictal stage of convulsion','A','Tonic phase: sustained contraction, rigidity, facial spasm, apnoea. Clonic phase follows with rhythmic jerks. Nurses managing seizures must identify the phase to time interventions correctly (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q4: Social smile at 2 months ──────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Growth and Development','A baby smiling to her mother is in which month of developmental milestone?','2 months','4 months','6 months','10 months','A','Social (responsive) smile is a normal developmental milestone at approximately 6–8 weeks (about 2 months) per Kenya IMNCI/KEPH child development and Basic Paediatric Protocols.','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Growth and Development','A baby smiling to her mother is in which month of developmental milestone?','2 months','4 months','6 months','10 months','A','Social smile at ~2 months is a key developmental milestone; absence may signal autism spectrum disorder or hearing impairment. Nurses integrate developmental screening into well-child visits (Kenya IMNCI; Basic Paediatric Protocols).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q5: Fertilisation in ampulla ──────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Reproductive Physiology','Fertilisation occurs in which part of the fallopian tube?','Ampulla','Fimbriae','Isthmus','Intramural','A','Fertilisation normally occurs in the ampulla of the uterine (fallopian) tube where the ovum meets the sperm after ovulation (Myles Textbook for Midwives; reproductive physiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Reproductive Physiology','Fertilisation occurs in which part of the fallopian tube?','Ampulla','Fimbriae','Isthmus','Intramural','A','Fertilisation in the ampulla; implantation in the endometrium ~7 days later. Ectopic pregnancy most commonly occurs in the ampulla when migration is impaired — relevant to risk assessment (Myles; reproductive physiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q6: Secondary PPH — retained products of conception ──────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postpartum Haemorrhage','The most likely cause of delayed (secondary) postpartum haemorrhage is:','Cervical laceration','Uterine subinvolution','Retained products of conception','Coagulopathy','C','Secondary PPH (>24 hours to 12 weeks postpartum) is most commonly caused by retained products of conception (Myles Textbook for Midwives; Kenya maternal health guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postpartum Haemorrhage','The most likely cause of delayed (secondary) postpartum haemorrhage is:','Cervical laceration','Uterine subinvolution','Retained products of conception','Coagulopathy','C','RPOC causes secondary PPH through ongoing placental site infection/incomplete involution. Management includes ultrasound, evacuation, and antibiotics. Nurses must identify this complication early (Myles; MOH Kenya maternal health).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q7: Perforated tympanic membrane — contraindication to ear syringing ──────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','ENT Disorders','Which of the following is a contraindication to syringing of the ear?','Foreign body in the ear','Perforated tympanic membrane','Wax impaction','Keratosis obturans','B','A perforated tympanic membrane is an absolute contraindication to ear syringing — water entering the middle ear risks infection and further damage (Brunner & Suddarth; ENT nursing guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','ENT Disorders','Which of the following is a contraindication to ear syringing?','Foreign body in the ear','Perforated tympanic membrane','Wax impaction','Keratosis obturans','B','Perforated TM is an absolute contraindication; foreign bodies, keratosis obturans and wax are INDICATIONS for syringing/removal. Nurses must assess TM integrity before any ear irrigation (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q8: Peritonsillar abscess — commonest complication of tonsillitis ──────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','ENT Disorders','The commonest complication of tonsillitis is:','Peritonsillar abscess','Meningitis','Scarlet fever','Acute glomerulonephritis','A','Peritonsillar abscess (quinsy) is the most common local complication of acute tonsillitis requiring incision and drainage plus antibiotics (Brunner & Suddarth; ENT nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','ENT Disorders','The commonest complication of tonsillitis is:','Peritonsillar abscess','Meningitis','Scarlet fever','Acute glomerulonephritis','A','Quinsy (peritonsillar abscess) is the most frequent complication; post-streptococcal glomerulonephritis and rheumatic fever are less common systemic complications. Nurses recognise signs of quinsy (unilateral swelling, deviated uvula) (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q9: Anorexia — loss of appetite ──────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Gastrointestinal Assessment','Loss of appetite is termed:','Nausea','Anorexia','Rexia','Retching','B','Anorexia is the medical term for loss of appetite (Brunner & Suddarth Medical-Surgical Nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Gastrointestinal Assessment','Loss of appetite is termed:','Nausea','Anorexia','Rexia','Retching','B','Anorexia (loss of appetite) is distinguished from nausea (sensation of imminent vomiting) and retching (unproductive vomiting effort); a key symptom in oncology and chronic disease management (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q10: Dependent PD — emotional deprivation background ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Personality Disorders','In dependent personality disorder there is:','Persistent need for organisation and urge for control','Self-centred behaviour','Engaging in establishing superiority over others','A background of emotional deprivation','D','Dependent personality disorder is characterised by an excessive need to be cared for, rooted in a background of emotional deprivation (Kenya Mental Health guidelines; psychiatric nursing texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Personality Disorders','In dependent personality disorder there is:','Persistent need for organisation and urge for control','Self-centred behaviour','Engaging in establishing superiority over others','A background of emotional deprivation','D','Dependent PD arises from early emotional deprivation/insecure attachment; distinguished from obsessive-compulsive PD (urge for control) and narcissistic PD (superiority). Nurses plan therapeutic milieu accordingly (DSM-5; Stuart).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q11: Mission — reason an organisation exists ──────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Management','The term that shows the reason why an organisation exists is:','Mission','Vision','Motto','Goal','A','The mission statement states the reason an organisation exists and its core purpose; the vision describes its future aspiration (nursing management/leadership texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Management','The term that shows the reason why an organisation exists is:','Mission','Vision','Motto','Goal','A','Mission = organisational purpose (why we exist); vision = future aspiration (where we are going); goals = measurable targets. Nurses use these in strategic planning and performance management (nursing management leadership texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q12: Functional endometrium shed during menstruation ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Reproductive Anatomy','The layer of the uterine wall shed during menstruation is the:','Perimetrium','Functional endometrium','Myometrium','Basal endometrium','B','The functional layer (stratum functionalis) of the endometrium is shed during menstruation while the basal layer (stratum basalis) regenerates it (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Reproductive Anatomy','The layer of the uterine wall shed during menstruation is the:','Perimetrium','Functional endometrium','Myometrium','Basal endometrium','B','Functional endometrium (proliferative/secretory phases) is shed; basal layer is preserved for regeneration. Oestrogen drives proliferation; progesterone drives secretory change. Understanding this cycle is key to interpreting menstrual disorders (Myles; reproductive physiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q13: NCK exam — summative evaluation ─────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Education','A student undergoing the NCK exam after hard training is set to undergo which type of evaluation?','Formative evaluation','Summative evaluation','Interim evaluation','Final evaluation','B','An examination at the end of a training programme to judge overall achievement is summative evaluation, as distinct from formative evaluation done during the programme (educational assessment/nursing education texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Education','A student undergoing the NCK exam after hard training is set to undergo which type of evaluation?','Formative evaluation','Summative evaluation','Interim evaluation','Final evaluation','B','Summative evaluation judges terminal competence; formative evaluation informs ongoing teaching. The NCK licensure examination is the definitive summative assessment for entry to practice (nursing education curriculum; NCK).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q14: Diplopia — MS exacerbation ──────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Disorders','A symptom associated with exacerbation of multiple sclerosis is:','Anorexia','Seizures','Diplopia','Insomnia','C','Diplopia (double vision) and other visual symptoms (optic neuritis) are classic features of MS exacerbation due to demyelination affecting visual pathways (Brunner & Suddarth; neurological nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Disorders','A symptom associated with exacerbation of multiple sclerosis is:','Anorexia','Seizures','Diplopia','Insomnia','C','MS exacerbations commonly affect vision (diplopia, optic neuritis), balance, and motor function. Disease-modifying therapies aim to reduce relapse frequency; nurses monitor and support recovery (Brunner & Suddarth; neurology nursing EBP).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q15: Deductive reasoning ──────────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','A form of reasoning where specific conclusions are drawn from a set of premises is:','Rationalism','Deductive reasoning','Inductive reasoning','Irrationalism','B','Deductive reasoning moves from general premises to specific conclusions (top-down); inductive reasoning moves from specific observations to generalisations (Polit & Beck; nursing research methodology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','A form of reasoning where specific conclusions are drawn from a set of premises is:','Rationalism','Deductive reasoning','Inductive reasoning','Irrationalism','B','Deductive reasoning underpins quantitative hypothesis testing; inductive reasoning underpins qualitative theory generation. Nurses apply both in evidence-based practice (Polit & Beck; nursing research).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q16: Bimodal distribution — 2 and 9 each appear twice ────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Biostatistics','The arrangement 3, 6, 9, 2, 2, 4, 9 is:','Unimodal','Bimodal','Multimodal','Polymodal','B','Both 2 and 9 occur twice in this dataset, giving two modes; a distribution with two modes is bimodal (biostatistics; nursing research texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Biostatistics','The arrangement 3, 6, 9, 2, 2, 4, 9 is:','Unimodal','Bimodal','Multimodal','Polymodal','B','Bimodal distribution: two values (2 and 9) each appear twice. Nurses interpreting community health data must correctly identify distribution shape (Polit & Beck; biostatistics).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q17: Reed-Sternberg cell — Hodgkin lymphoma ───────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Oncology Nursing','The Reed-Sternberg cell is used for diagnosis of:','Hodgkin''s lymphoma','Non-Hodgkin''s lymphoma','Leukaemia','Sickle cell anaemia','A','The Reed-Sternberg cell is the diagnostic histological hallmark of Hodgkin''s lymphoma (Brunner & Suddarth''s Medical-Surgical Nursing; haematology/oncology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Oncology Nursing','The Reed-Sternberg cell is used for diagnosis of:','Hodgkin''s lymphoma','Non-Hodgkin''s lymphoma','Leukaemia','Sickle cell anaemia','A','Reed-Sternberg cells = Hodgkin lymphoma; absent in NHL. Staging using Ann Arbor classification guides treatment; nurses support patients through chemotherapy/radiotherapy (Brunner & Suddarth; oncology EBP).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q18: Crude mortality rate — all causes / mid-year pop × 1000 ──────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Epidemiology','The number of deaths from all causes in a year divided by the mid-year population × 1000 is referred to as:','Age-specific mortality rate','Sex-specific mortality rate','Crude mortality rate','Cause-specific mortality rate','C','Total deaths from all causes in a year divided by mid-year population × 1000 = Crude Death Rate (CDR) (community health epidemiology; MOH Kenya/Park''s Preventive & Social Medicine).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Epidemiology','The number of deaths from all causes in a year divided by the mid-year population × 1000 is referred to as:','Age-specific mortality rate','Sex-specific mortality rate','Crude mortality rate','Cause-specific mortality rate','C','CDR measures overall mortality burden; age-specific and cause-specific rates provide deeper analysis. Nurses use epidemiological indicators for community health planning (Park''s; MOH Kenya statistics).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q19: Hegar's sign — softening of uterine isthmus ─────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Diagnosis of Pregnancy','Softening of the uterine isthmus during pregnancy is referred to as:','Hegar''s sign','Goodell''s sign','Osiander''s sign','Chadwick''s sign','A','Hegar''s sign is the softening/compressibility of the uterine isthmus at 6–10 weeks, detected on bimanual examination (Myles Textbook for Midwives; signs of pregnancy).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Diagnosis of Pregnancy','Softening of the uterine isthmus during pregnancy is referred to as:','Hegar''s sign','Goodell''s sign','Osiander''s sign','Chadwick''s sign','A','Hegar = isthmus softening; Goodell = cervical softening; Chadwick = bluish discolouration of cervix/vagina; Osiander = pulsation in lateral fornices. All are probable signs (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q20: Mid-sagittal plane — equal left and right ───────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Anatomy and Physiology','The mid-sagittal plane separates the body into:','Left and right equal portions','Anterior and posterior equal portions','Left and right unequal portions','Anterior and posterior unequal portions','A','The mid-sagittal (median) plane divides the body into equal left and right halves (standard anatomy texts used in Kenyan nursing curricula; Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Anatomy and Physiology','The mid-sagittal plane separates the body into:','Left and right equal portions','Anterior and posterior equal portions','Left and right unequal portions','Anterior and posterior unequal portions','A','Mid-sagittal = bilateral symmetry; coronal/frontal = anterior/posterior; transverse = superior/inferior. Understanding anatomical planes is prerequisite to interpreting radiological and surgical findings (anatomy; Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q21: Matthew Duncan — lateral border separation ──────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','A feature of the Matthew Duncan method of placental separation is:','The placenta separates from its lateral border, slipping down the uterine wall','Separation begins centrally then falls to the lower uterine segment','Aided by formation of a retroplacental clot','The fetal surface is normally delivered first','A','In Matthew Duncan method the placenta separates from its lateral (lower) border and slides down the uterine wall, maternal surface first; Schultze method separates centrally (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','A feature of the Matthew Duncan method of placental separation is:','The placenta separates from its lateral border, slipping down the uterine wall','Separation begins centrally then falls to the lower uterine segment','Aided by formation of a retroplacental clot','The fetal surface is normally delivered first','A','Duncan = lateral separation, maternal surface first; Schultze = central separation, fetal surface first with retroplacental clot. Less haemorrhage occurs with Schultze. Nurses monitor for complete placenta delivery (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q22: Protamine sulfate — antidote for heparin (2023 repeat) ───────────────
-- Note: stem wording differs from 2022 Q48 — seeds both per Section 14.5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Anticoagulant Therapy','The antidote for heparin is:','Warfarin','Vitamin K','Protamine sulphate','Naloxone','C','Protamine sulphate is the specific antidote for heparin overdose, reversing its anticoagulant effect by forming an inactive complex (BNF; MOH Kenya emergency pharmacology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Anticoagulant Therapy','The antidote for heparin is:','Warfarin','Vitamin K','Protamine sulphate','Naloxone','C','Protamine sulphate reverses heparin; for LMWHs partial reversal occurs. Vitamin K reverses warfarin. Nurses must know correct antidotes for each anticoagulant class (BNF; pharmacology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q23: Bell's palsy — CN VII inflammation ───────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Disorders','Inflammation of cranial nerve number 7 leads to which palsy?','Bell''s palsy','Erb''s palsy','Klumpke''s palsy','Cerebral palsy','A','Inflammation/damage of cranial nerve VII (facial nerve) causes Bell''s palsy — unilateral facial muscle weakness/paralysis (Brunner & Suddarth; neurological nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Disorders','Inflammation of cranial nerve number 7 leads to which palsy?','Bell''s palsy','Erb''s palsy','Klumpke''s palsy','Cerebral palsy','A','Bell''s palsy (CN VII): unilateral LMN facial palsy; Erb''s = C5–C6 brachial plexus; Klumpke = C8–T1. Nurses distinguish these and educate on eye care, prognosis (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q24: Ischaemia — lack of blood supply ─────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Cardiovascular Pathophysiology','Ischaemia is caused by:','Stress','Lack of oxygen','Lack of blood supply','Lack of blood supply and increase in CO₂','C','Ischaemia is tissue injury caused by inadequate blood supply (and thus reduced oxygen delivery to cells), not merely lack of oxygen in the blood (Brunner & Suddarth; pathophysiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Cardiovascular Pathophysiology','Ischaemia is caused by:','Stress','Lack of oxygen','Lack of blood supply','Lack of blood supply and increase in CO₂','C','Ischaemia = reduced blood flow → oxygen AND nutrient deficit; hypoxaemia = reduced oxygen in blood. Distinguishing these is important in managing MI, stroke and peripheral vascular disease (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q25: Physical disability — impacts ADLs ───────────────────────────────────
-- Stem wording differs from 2021/2022 versions — allow per Section 14.5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Disability and Rehabilitation','The term physical disability can be defined as a physical condition that impacts on:','One''s athletic ability','One''s intelligence','Activities of daily living','One''s social skills','C','Physical disability is a physical condition that impacts on activities of daily living, per Kenya community health/rehabilitation nursing references.','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Disability and Rehabilitation','The term physical disability can be defined as a physical condition that impacts on:','One''s athletic ability','One''s intelligence','Activities of daily living','One''s social skills','C','Physical disability limits ADLs; nurses assess functional limitation, plan rehabilitation, and advocate for inclusive healthcare environments (Kenya community health/rehabilitation texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q26: Smoking + COC — MEC Category 2 ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Family Planning','A woman who smokes uses which WHO medical eligibility criteria category for combined oral contraceptives?','Category 1','Category 2','Category 3','Category 4','B','For a smoker under 35 years, COC use is WHO/Kenya MEC Category 2 (advantages generally outweigh theoretical risks); category 4 applies for smokers aged ≥35 years with heavy smoking (Kenya National FP Guidelines; WHO MEC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Family Planning','A woman who smokes uses which WHO medical eligibility criteria category for combined oral contraceptives?','Category 1','Category 2','Category 3','Category 4','B','MEC 2 = benefits outweigh risks (use with caution). For smokers >35 years or heavy smokers, MEC = 4 (do not use). Nurses must apply MEC in contraceptive counselling (Kenya National FP Guidelines; WHO MEC 2015).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q27: Natural FP methods ───────────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Family Planning','An example of natural methods of family planning is:','Combined oral contraceptives, calendar method, basal body temperature','Calendar method, basal body temperature, sympto-thermal method','Calendar method, bead method, abstinence','Bead method, basal body temperature, implants','B','Calendar method, basal body temperature (BBT) and sympto-thermal method are all natural (fertility-awareness) family planning methods (Kenya National FP Guidelines; WHO MEC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Family Planning','An example of natural methods of family planning is:','Combined oral contraceptives, calendar method, basal body temperature','Calendar method, basal body temperature, sympto-thermal method','Calendar method, bead method, abstinence','Bead method, basal body temperature, implants','B','Natural/FAB methods — calendar, BBT, sympto-thermal — require no devices or hormones. Nurses counsel on correct use, typical vs perfect-use failure rates (Kenya National FP Guidelines; WHO MEC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q28: Battledore — marginal cord insertion ─────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Placental Abnormalities','Another name for marginal insertion of the placenta is:','Velamentous','Battledore','Succenturiate','Circumvallate','B','Battledore placenta is the term for marginal cord insertion — the umbilical cord inserts at the edge (margin) of the placenta (Myles Textbook for Midwives; placental anatomy).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Placental Abnormalities','Another name for marginal insertion of the placenta is:','Velamentous','Battledore','Succenturiate','Circumvallate','B','Battledore = marginal cord insertion; velamentous = cord inserts into membranes (high risk of vasa praevia); succenturiate = accessory lobe; circumvallate = folded-back membranes. Nurses identify these on placental inspection (Myles).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q29: Rubin's manoeuvre — shoulder dystocia ────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Obstetric Emergencies','In management of shoulder dystocia, the manoeuvre that adducts the shoulders is:','Rubin''s manoeuvre','Woodscrew manoeuvre','Gaskin manoeuvre','McRoberts manoeuvre','A','Rubin''s manoeuvre applies pressure to the posterior aspect of the anterior fetal shoulder to adduct it, reducing the bisacromial diameter (Myles Textbook for Midwives; obstetric emergency protocols).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Obstetric Emergencies','In management of shoulder dystocia, the manoeuvre that adducts the shoulders is:','Rubin''s manoeuvre','Woodscrew manoeuvre','Gaskin manoeuvre','McRoberts manoeuvre','A','Rubin II adducts shoulders; Woods Screw rotates anterior shoulder; Gaskin = all-fours position; McRoberts = hyperflexion of maternal thighs. Nurses must know HELPERR algorithm sequence (Myles; MOH Kenya EmONC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q30: Occipito-anterior — most favourable position for delivery ────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','The most favourable position for delivery is:','Occipito-anterior','Occipito-posterior','Mento-vertical','Mento-occipital','A','Occipito-anterior (OA) is the most favourable position, presenting the smallest sub-occipito-bregmatic diameter (9.5 cm) for engagement and descent through the birth canal (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','The most favourable position for delivery is:','Occipito-anterior','Occipito-posterior','Mento-vertical','Mento-occipital','A','OA position: SOB diameter 9.5 cm, normal mechanism. OP position may lead to prolonged labour; management includes position changes, augmentation, or assisted delivery. Nurses monitor descent and rotation (Myles).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q31: Post-corneal surgery — range of motion exercises ────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Ophthalmology','After corneal surgery on the right eye, the nurse should:','Task the patient to perform range of motion exercises for all joints','Help the patient lie on the right side','Assist the patient with Valsalva manoeuvre exercises','Expose the patient to light','A','Post-corneal surgery: avoid lying on the operated side (increases intraocular pressure), avoid Valsalva and bright light. Gentle joint ROM exercises are the only safe mobility option (Brunner & Suddarth eye surgery nursing care).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Ophthalmology','After corneal surgery on the right eye, the nurse should:','Task the patient to perform range of motion exercises for all joints','Help the patient lie on the right side','Assist the patient with Valsalva manoeuvre exercises','Expose the patient to light','A','Corneal surgery post-op: no pressure on operative eye, no Valsalva, no bright light. Nurses must independently identify contraindicated activities and institute falls prevention alongside ROM exercises (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q32: Severe anaemia — palpitation ─────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Haematological Disorders','A symptom of severe anaemia is:','Palpitation','Cyanosis','Insomnia','Mental disturbance','A','Severe anaemia causes compensatory tachycardia producing palpitations due to reduced oxygen-carrying capacity (Brunner & Suddarth; haematology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Haematological Disorders','A symptom of severe anaemia is:','Palpitation','Cyanosis','Insomnia','Mental disturbance','A','Severe anaemia: tachycardia/palpitations, dyspnoea, pallor, fatigue. Cyanosis indicates oxygenation failure, not anaemia per se. Nurses manage anaemia through transfusion, supplementation, and underlying cause treatment (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q33: HbA1c — glucose control over 6–12 weeks ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Endocrine Disorders','Which test assesses glucose control for the past 6–8 weeks?','HbA1c','HBC','HBS','None of the above','A','HbA1c (glycosylated haemoglobin) reflects average blood glucose over the preceding 6–12 weeks and is used to monitor long-term diabetes management (Kenya MOH diabetes guidelines; Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Endocrine Disorders','Which test assesses glucose control for the past 6–8 weeks?','HbA1c','HBC','HBS','None of the above','A','HbA1c target <7% (53 mmol/mol) for most diabetics per Kenya MOH; it guides treatment intensification. Nurses interpret results in context of patient-specific goals and hypoglycaemia risk (Kenya MOH DM guidelines; Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q34: Gestational diabetes — increase insulin in 2nd trimester ─────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Diabetes in Pregnancy','Advice for a mother with gestational diabetes during the 2nd trimester:','Increase insulin','Reduce insulin dose','Increase caloric intake','Decrease caloric intake','A','Insulin resistance rises with placental hormones in the 2nd trimester; insulin requirements typically increase in gestational diabetes (Myles/MOH Kenya diabetes-in-pregnancy guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Diabetes in Pregnancy','Advice for a mother with gestational diabetes during the 2nd trimester:','Increase insulin','Reduce insulin dose','Increase caloric intake','Decrease caloric intake','A','Placental hormones (hPL, progesterone) increase insulin resistance in the 2nd trimester; nurses monitor glucose closely and escalate insulin as needed. Hypoglycaemia risk with inadequate dosing is also managed (Myles; MOH Kenya GDM guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q35: Suspected breech — send for ultrasound first ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antenatal Care','A nurse examines the fundus at ANC and suspects breech presentation. What intervention should follow?','Send mother to specialist for external cephalic version','Tell the mother to come at 36 weeks','Send the mother for an ultrasound','Do an immediate vaginal examination','C','Suspected breech on abdominal palpation must be confirmed by ultrasound before any intervention such as ECV (Kenya MOH ANC guidelines/Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antenatal Care','A nurse examines the fundus at ANC and suspects breech presentation. What intervention should follow?','Send mother to specialist for external cephalic version','Tell the mother to come at 36 weeks','Send the mother for an ultrasound','Do an immediate vaginal examination','C','Ultrasound confirms presentation, lie, and placental site before ECV. ECV is offered at ≥36 weeks after confirmation. Nurses triage appropriately and avoid premature interventions (Myles; MOH Kenya ANC guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q36: Summative evaluation — done at end of programme ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Education','Summative evaluation means:','It is done at the end of the programme','It is usually done in the middle of the programme','Is usually done at the beginning of the programme','None of the above','A','Summative evaluation is conducted at the end of a programme to judge overall achievement; formative is ongoing during the programme (nursing education/curriculum evaluation texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Education','Summative evaluation means:','It is done at the end of the programme','It is usually done in the middle of the programme','Is usually done at the beginning of the programme','None of the above','A','Summative: end-of-programme judgement of achievement. Diagnostic: before programme. Formative: during. Nurses applying curriculum evaluation select the appropriate type for each purpose (nursing education; Bloom).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q37: Mumps — supportive: analgesics and antipyretics ─────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Communicable Diseases','The management of mumps is:','Antibiotics and painkillers','Analgesics and antipyretics','Rehydration and antibiotics','Antipyretics and antivirals','B','Mumps is a self-limiting viral illness managed supportively with analgesics and antipyretics; antibiotics and antivirals are not indicated (Kenya Basic Paediatric Protocols/IMNCI).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Communicable Diseases','The management of mumps is:','Antibiotics and painkillers','Analgesics and antipyretics','Rehydration and antibiotics','Antipyretics and antivirals','B','Mumps: supportive care only. MMR vaccine prevents it. Nurses monitor for orchitis/oophoritis, pancreatitis, and meningitis as complications (Kenya Basic Paediatric Protocols; EPI guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q38: Social smile at 6 weeks ──────────────────────────────────────────────
-- Wording differs from Q4 (different stem) — seed per Section 14.5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Growth and Development','An infant starts smiling at its mother at the age of:','9 months','2 months','6 months','6 weeks','D','The social smile responsive to the mother appears at approximately 6 weeks of age per KEPH/IMNCI developmental milestones (Kenya IMNCI; Basic Paediatric Protocols).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Growth and Development','An infant starts smiling at its mother at the age of:','9 months','2 months','6 months','6 weeks','D','Social smile at 6 weeks is an early social-emotional milestone; absence at 8–10 weeks warrants developmental surveillance. Nurses integrate this into well-baby checks (Kenya IMNCI; KEPH child development).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q39: Gerontology — study of old age ───────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Ageing and Elderly Care','The study of old age is called:','Geriatrics','Psychogerontology','Gerontology','Ontology','C','Gerontology is the scientific study of old age and ageing processes; geriatrics is the medical care of the elderly (gerontological nursing texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Ageing and Elderly Care','The study of old age is called:','Geriatrics','Psychogerontology','Gerontology','Ontology','C','Gerontology (study of ageing) informs evidence-based elderly care policy; geriatrics is clinical management. Nurses apply gerontological principles in community and hospital settings (gerontological nursing texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q40: Post inguinal hernia — avoid heavy lifting ───────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Surgical Nursing','Post-operative Care','Post inguinal hernia surgery instruction given to patient:','Scrotal support','Avoid heavy weight lifting','Take more refined diet','Take less liquids','B','Post inguinal herniorrhaphy patients are advised to avoid heavy lifting and straining to prevent recurrence (Brunner & Suddarth surgical nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Surgical Nursing','Post-operative Care','Post inguinal hernia surgery instruction given to patient:','Scrotal support','Avoid heavy weight lifting','Take more refined diet','Take less liquids','B','Avoid lifting >5 kg for 4–6 weeks post-herniorrhaphy to prevent recurrence and wound dehiscence. Nurses provide structured discharge education covering activity restrictions, wound care and signs of complication (Brunner & Suddarth).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q41: 3rd stage of labour — delivery of placenta ──────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','During the 3rd stage of labour which of the following is done?','Delivery of the baby','Starting partograph','Delivery of second twin','Delivery of placenta','D','The third stage of labour spans from delivery of the baby to delivery of the placenta and membranes (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','During the 3rd stage of labour which of the following is done?','Delivery of the baby','Starting partograph','Delivery of second twin','Delivery of placenta','D','3rd stage: managed actively (oxytocin + controlled cord traction) or physiologically. Nurses assess placental completeness and monitor for PPH during this stage (Myles; MOH Kenya BEmONC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q42: PPH causes — 4 Ts ────────────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postpartum Haemorrhage','The causes of postpartum haemorrhage are:','Tone, tissue, trauma, thrombin','Atony, tissue, trauma, thrombin','Atony, tears, trauma, thrombin','Tone, tears, tissue, thrombin','A','The 4 Ts mnemonic for PPH causes: Tone (uterine atony — most common), Tissue (retained products), Trauma (lacerations), Thrombin (coagulopathy) (Myles/PPH guidelines; MOH Kenya BEmONC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postpartum Haemorrhage','The causes of postpartum haemorrhage are:','Tone, tissue, trauma, thrombin','Atony, tissue, trauma, thrombin','Atony, tears, trauma, thrombin','Tone, tears, tissue, thrombin','A','4 Ts: Tone (uterine atony 70–80%), Tissue, Trauma, Thrombin. Nurses initiate structured PPH response: fundal massage, oxytocin, IV access, call for help, bladder catheterisation (Myles; MOH Kenya EmONC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q43: Fundus at umbilicus 24 hours postpartum ──────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Postnatal Care','After 24 hours of delivery the uterine fundus should be at:','5 cm below the umbilicus','12 cm above the umbilicus','Midway between symphysis pubis and umbilicus','At the level of the umbilicus','D','During the first 24 hours postpartum the uterine fundus is at the level of the umbilicus before involution descends it approximately 1 cm/day (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Postnatal Care','After 24 hours of delivery the uterine fundus should be at:','5 cm below the umbilicus','12 cm above the umbilicus','Midway between symphysis pubis and umbilicus','At the level of the umbilicus','D','Fundal height involution: umbilicus (day 1) → non-palpable (day 10–14). Failure to involute suggests subinvolution (RPOC, endometritis). Nurses document and act on abnormal findings (Myles; MOH Kenya postnatal care).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q44: Fertilisation at ampulla (different wording from Q5) ────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Reproductive Physiology','Fertilisation takes place at the:','Ampulla','Isthmus','Infundibulum','Fundus','A','Fertilisation normally occurs in the ampulla of the uterine tube (Myles Textbook for Midwives; reproductive physiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Reproductive Physiology','Fertilisation takes place at the:','Ampulla','Isthmus','Infundibulum','Fundus','A','Fertilisation in the ampulla; subsequent implantation in endometrium. Ectopic pregnancies most commonly implant in the tube when migration is delayed (Myles; reproductive physiology).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q45: Matthew Duncan — lateral borders slipping down ─────────────────────
-- Different wording from Q21 — allows both per Section 14.5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','Define the Matthew Duncan method of placental separation:','The placenta separates from its lateral borders, slipping down the uterine wall','Placental separation begins centrally then falls to the lower uterine segment','Separation is aided by formation of a retroplacental clot','The fetal surface of the placenta is normally delivered first','A','In Matthew Duncan method the placenta separates from its lateral borders and slips down the uterine wall, with the maternal surface delivered first (Myles Midwifery).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','Define the Matthew Duncan method of placental separation:','The placenta separates from its lateral borders, slipping down the uterine wall','Placental separation begins centrally then falls to the lower uterine segment','Separation is aided by formation of a retroplacental clot','The fetal surface of the placenta is normally delivered first','A','Duncan = lateral separation, maternal surface first, more blood loss; Schultze = central separation with retroplacental clot, fetal surface first. Nurses inspect placenta for completeness after delivery (Myles).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q46: Restitution — aligns head with shoulders ─────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','In normal labour, the fetal movement that occurs after extension is:','Flexion','Internal rotation of the head','Extension of the head','Restitution','D','Labour mechanism sequence: descent, flexion, internal rotation, extension, restitution, external rotation. Restitution follows extension of the head (Myles Midwifery).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','In normal labour, the fetal movement that occurs after extension is:','Flexion','Internal rotation of the head','Extension of the head','Restitution','D','Restitution realigns the fetal head with the shoulders after the twist of internal rotation; external rotation follows. Nurses must narrate the mechanism to students and recognise deviations (Myles Textbook for Midwives).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q47: Pyridoxine with isoniazid ────────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Tuberculosis Treatment','Pyridoxine (Vitamin B6) is given together with which drug?','Rifampicin','Isoniazid','Pyrazinamide','Ethambutol','B','Pyridoxine is co-administered with isoniazid to prevent isoniazid-induced peripheral neuropathy (Kenya NLTP guidelines; BNF TB treatment).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Tuberculosis Treatment','Pyridoxine (Vitamin B6) is given together with which drug?','Rifampicin','Isoniazid','Pyrazinamide','Ethambutol','B','Isoniazid depletes pyridoxine; supplementation prevents peripheral neuropathy. Dose: pyridoxine 10–25 mg/day. Nurses identify high-risk patients (malnourished, HIV+, pregnant) who need higher doses (Kenya NLTP; BNF).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q48: Moulding +++ — irreducible overlapping parietal bones ────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour Assessment','Moulding +++ means:','Parietal bones are touching but not overlapping','Parietal bones overlapped with frontal bones','Parietal bones have overlapped and are irreducible','Parietal bones are overlapped but easily reduced','C','Moulding +++: parietal bones overlapped and irreducible — a sign of severe cephalopelvic disproportion (Myles Midwifery; partograph assessment guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour Assessment','Moulding +++ means:','Parietal bones are touching but not overlapping','Parietal bones overlapped with frontal bones','Parietal bones have overlapped and are irreducible','Parietal bones are overlapped but easily reduced','C','Moulding +++ = CPD; warrants immediate obstetric review and likely caesarean section. Nurses escalate abnormal partograph findings (Myles; MOH Kenya partograph guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q49: Heavy smoker >10 years + COC — thromboembolism risk ──────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Family Planning','Advice for a client who has smoked for over 10 years and comes for combined oral contraceptives:','Patient has increased risk of thromboembolism so another method is preferred','COCs have no risk in patients with smoking history','Can use COCs with no major side effects expected','Should stop smoking for some time before starting COCs','A','Long-term smoking (>10 years, especially if >35) with COCs raises cardiovascular/thromboembolic risk significantly; a non-oestrogen method is preferred (Kenya National FP Guidelines; WHO MEC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Family Planning','Advice for a client who has smoked for over 10 years and comes for combined oral contraceptives:','Patient has increased risk of thromboembolism so another method is preferred','COCs have no risk in patients with smoking history','Can use COCs with no major side effects expected','Should stop smoking for some time before starting COCs','A','Heavy long-term smoking + COC = MEC 3–4 depending on age; thrombosis risk multiplied. Offer progestogen-only pill, DMPA, or IUD. Nurses provide evidence-based contraceptive counselling (Kenya National FP Guidelines; WHO MEC).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q50: Clostridium tetani — lockjaw, tremors ────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','Which zoonotic disease causes lockjaw and tremors?','Clostridium botulinum','Clostridium tetani','Clostridium perfringens','Clostridium septicum','B','Clostridium tetani produces tetanospasmin causing trismus (lockjaw), muscle rigidity and tremors (Brunner & Suddarth; Kenya EPI/tetanus guidance).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','Which zoonotic disease causes lockjaw and tremors?','Clostridium botulinum','Clostridium tetani','Clostridium perfringens','Clostridium septicum','B','C. tetani: tetanospasmin causes spastic paralysis, trismus, opisthotonus. Prevention: TT/Td vaccination. Nurses manage airway, muscle spasms, and wound care in tetanus patients (Brunner & Suddarth; Kenya EPI).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q51: NCK exam type — summative (different wording from Q13) ───────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Education','What type of exam is offered by the Nursing Council of Kenya?','Formative','Summative','Interim','Initial evaluation','B','The NCK licensure examination is a summative assessment used to certify competence for registration as a nurse in Kenya (nursing education/assessment principles; NCK curriculum).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Education','What type of exam is offered by the Nursing Council of Kenya?','Formative','Summative','Interim','Initial evaluation','B','NCK exam = terminal summative licensure assessment ensuring public protection through nurse competence verification. Nurses understand assessment typology for curriculum design and student preparation (NCK; nursing education).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q52: Severe dehydration — Plan C ─────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Diarrhoea Management','The management of severe dehydration is:','Plan A','Plan B','Plan C','Plan D','C','Kenya IMNCI/Basic Paediatric Protocols: severe dehydration is managed with Plan C — rapid IV rehydration with Ringer''s lactate or normal saline.','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Diarrhoea Management','The management of severe dehydration is:','Plan A','Plan B','Plan C','Plan D','C','Plan C: IV Ringer''s 100 ml/kg over 3 hours (infants) or 1 hour (older); reassess frequently. Plan A = no dehydration (ORS at home); Plan B = some dehydration (ORS in facility). Nurses apply IMNCI protocols accurately (Kenya IMNCI).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q53: Freud latency stage 6–12 years ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Growth and Development','Freud''s psychosexual latency stage of development occurs at:','12–18 years','4–6 years','6–12 years','2–3 years','C','Freud''s latency stage (6–12 years): sexual drives are dormant; child focuses on academic and social skills (psychiatric/mental health nursing texts used in Kenya).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Growth and Development','Freud''s psychosexual latency stage of development occurs at:','12–18 years','4–6 years','6–12 years','2–3 years','C','Latency (6–12): libidinal energy redirected to learning; corresponds with Erikson''s Industry vs Inferiority. Nurses apply psychosexual and psychosocial theory in paediatric and school health contexts (DSM-5; Stuart).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q54: Summative evaluation — end of programme (Paper II variant) ───────────
-- Stem wording differs from Q36 and Q13 — seeds per Section 14.5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Education','Summative evaluation takes place at:','End of programme','Middle of programme','Beginning of programme','During programme','A','Summative evaluation is conducted at the end of a programme to judge overall achievement; the NCK licensing exam is the classic example (nursing education/curriculum evaluation texts).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Education','Summative evaluation takes place at:','End of programme','Middle of programme','Beginning of programme','During programme','A','Summative = terminal judgement of competence; distinguishes from formative (ongoing) and diagnostic (baseline). Applied to curriculum planning and quality assurance in nursing education (Bloom; NCK curriculum).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q55: Hypoglycaemia in infant of diabetic mother — increased maternal insulin ─
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Neonatal Disorders','The cause of hypoglycaemia in an infant born of a diabetic mother is:','Increased maternal insulin crossing the placenta','Decreased fetal insulin production','Increased fetal glucagon','Decreased placental glucose transfer','A','Maternal hyperglycaemia stimulates fetal pancreatic beta cells to produce excess insulin; after birth when maternal glucose is withdrawn, neonatal hyperinsulinaemia causes hypoglycaemia (Myles; Kenya Basic Paediatric Protocols).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Neonatal Disorders','The cause of hypoglycaemia in an infant born of a diabetic mother is:','Increased maternal insulin crossing the placenta','Decreased fetal insulin production','Increased fetal glucagon','Decreased placental glucose transfer','A','Neonatal hyperinsulinaemia (from fetal beta-cell hypertrophy) causes hypoglycaemia post-delivery as maternal glucose supply is cut. Nurses monitor blood glucose and initiate early feeds or IV glucose per protocol (Myles; Basic Paediatric Protocols).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q56: Cushing syndrome emergency — Addisonian crisis ──────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Endocrine Disorders','The emergency associated with Cushing syndrome is:','Cushing crisis','Addisonian crisis','Thyroid storm','Myxoedema coma','B','Abrupt withdrawal of exogenous corticosteroids in a patient with Cushing syndrome (iatrogenic) precipitates Addisonian crisis — acute adrenal insufficiency requiring emergency hydrocortisone (Brunner & Suddarth; endocrine nursing).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Endocrine Disorders','The emergency associated with Cushing syndrome is:','Cushing crisis','Addisonian crisis','Thyroid storm','Myxoedema coma','B','Steroid-dependent Cushing patients risk Addisonian crisis if corticosteroids are abruptly stopped or during physiological stress. Management: hydrocortisone 100 mg IV stat + fluid resuscitation. Nurses identify and respond to this emergency (Brunner & Suddarth; endocrine EBP).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q57: Headache after lumbar puncture — CSF leakage ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Procedures','The cause of headache following a lumbar puncture is:','CSF leakage through the puncture site','Increased intracranial pressure','Haematoma formation','Air embolism','A','Post-dural puncture headache (PDPH) results from CSF leakage through the puncture site causing intracranial hypotension; managed with hydration, bed rest, and sometimes a blood patch (Brunner & Suddarth; neurological nursing).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Procedures','The cause of headache following a lumbar puncture is:','CSF leakage through the puncture site','Increased intracranial pressure','Haematoma formation','Air embolism','A','PDPH: positional, worsens upright, improves supine. CSF loss → intracranial traction on pain-sensitive structures. Nurses advise hydration, supine position; escalate for epidural blood patch if severe (Brunner & Suddarth).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q58: Folic acid deficiency in pregnancy — neural tube defects ─────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Antenatal Nutrition','Lack of folic acid during pregnancy leads to:','Anaemia only','Neural tube defects','Placental abruption','Congenital heart disease','B','Folic acid deficiency in the first trimester impairs neural tube closure, causing defects such as spina bifida and anencephaly (Myles; MOH Kenya ANC guidelines; WHO).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Antenatal Nutrition','Lack of folic acid during pregnancy leads to:','Anaemia only','Neural tube defects','Placental abruption','Congenital heart disease','B','Folic acid 400 mcg/day peri-conceptionally prevents NTDs. Deficiency also causes megaloblastic anaemia. Nurses counsel women of reproductive age on supplementation before conception (Myles; MOH Kenya ANC guidelines; WHO).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q59: Guillain-Barré syndrome — elevated CSF protein ──────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Disorders','The abnormal laboratory finding in Guillain-Barré syndrome is:','Elevated CSF protein with normal cell count','Elevated CSF white cell count','Decreased CSF glucose','Haemorrhagic CSF','A','Guillain-Barré syndrome shows albuminocytological dissociation on lumbar puncture: markedly elevated CSF protein with a normal or near-normal cell count (Brunner & Suddarth; neurological nursing).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Disorders','The abnormal laboratory finding in Guillain-Barré syndrome is:','Elevated CSF protein with normal cell count','Elevated CSF white cell count','Decreased CSF glucose','Haemorrhagic CSF','A','Albuminocytological dissociation (high protein, normal cells) is pathognomonic of GBS. Management includes IVIG or plasmapheresis; nurses monitor respiratory function, swallowing, and autonomic instability (Brunner & Suddarth; neurology EBP).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q60: Amniotic fluid embolism complications — resp distress, DIC, tachycardia
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Obstetric Emergencies','Complications of amniotic fluid embolism include:','Fetal distress and bradycardia','Maternal hypertension and seizures','Uterine rupture and haemoperitoneum','Maternal respiratory distress, DIC, and tachycardia','D','Amniotic fluid embolism (AFE) causes sudden cardiovascular collapse, respiratory distress, tachycardia, and DIC — a catastrophic obstetric emergency (Myles; MOH Kenya EmONC guidelines).','hard',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Obstetric Emergencies','Complications of amniotic fluid embolism include:','Fetal distress and bradycardia','Maternal hypertension and seizures','Uterine rupture and haemoperitoneum','Maternal respiratory distress, DIC, and tachycardia','D','AFE: amniotic fluid triggers anaphylactoid response causing hypoxia, cardiovascular collapse, DIC and neurological damage. Mortality is high; nurses initiate code, support oxygenation, manage coagulopathy, and call the obstetric emergency team (Myles; MOH Kenya EmONC).','hard',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q61: Mauriceau-Smellie-Veit — delivery of extended (after-coming) head ────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','The Mauriceau-Smellie-Veit manoeuvre is used for delivery of:','Extended after-coming head in breech','Shoulder dystocia','Face presentation','Brow presentation','A','The Mauriceau-Smellie-Veit manoeuvre controls delivery of the extended (deflexed) after-coming head in a breech birth, using finger traction on the maxilla to flex and deliver the head safely (Myles Textbook for Midwives).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','The Mauriceau-Smellie-Veit manoeuvre is used for delivery of:','Extended after-coming head in breech','Shoulder dystocia','Face presentation','Brow presentation','A','MSV: index/middle fingers on maxilla flex the head; body rests on forearm; assistant applies fundal pressure. Burns-Marshall is the alternative. Nurses must know both techniques and when to escalate to operative delivery (Myles; MOH Kenya EmONC).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q62: Dysplasia — disordered growth and maturation ────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Oncology Nursing','In oncology, the term dysplasia means:','Increase in the number of cells','Decrease in cell size','Replacement of one cell type by another','Disordered growth and maturation of cells','D','Dysplasia refers to disordered growth and maturation of cells — an abnormal but potentially reversible change often seen as a pre-malignant lesion (Brunner & Suddarth; oncology nursing).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Oncology Nursing','In oncology, the term dysplasia means:','Increase in the number of cells','Decrease in cell size','Replacement of one cell type by another','Disordered growth and maturation of cells','D','Dysplasia (disordered maturation) vs hyperplasia (increased number) vs metaplasia (cell-type replacement) vs atrophy (decreased size). Cervical dysplasia detected by Pap smear is managed per Kenya cancer screening guidelines (Brunner & Suddarth; oncology EBP).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q63: Engaging diameter in vertex presentation — sub-occipito-bregmatic ────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Labour and Delivery','The engaging diameter in a vertex presentation is:','Occipito-frontal','Mento-vertical','Sub-occipito-frontal','Sub-occipito-bregmatic','D','In a well-flexed vertex presentation the engaging (presenting) diameter is the sub-occipito-bregmatic (SOB) measuring 9.5 cm (Myles Textbook for Midwives; obstetric anatomy).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Labour and Delivery','The engaging diameter in a vertex presentation is:','Occipito-frontal','Mento-vertical','Sub-occipito-frontal','Sub-occipito-bregmatic','D','SOB = 9.5 cm (full flexion); sub-occipito-frontal = 10 cm (partial flexion); occipito-frontal = 11.5 cm (deflexion). Nurses interpret partograph engagement findings using these diameters (Myles).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q64: Non-biased research purpose words — test, compare, determine ─────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','Which set of words best expresses a study purpose in a non-biased manner?','Prove, demonstrate, show','Test, compare, determine','Confirm, validate, establish','Justify, support, verify','B','Objective, non-directional verbs such as "test", "compare", and "determine" express research purpose without implying a predetermined outcome, avoiding researcher bias (Polit & Beck; nursing research methodology).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','Which set of words best expresses a study purpose in a non-biased manner?','Prove, demonstrate, show','Test, compare, determine','Confirm, validate, establish','Justify, support, verify','B','Using directional verbs like "prove" or "confirm" indicates researcher bias; neutral verbs ("test", "compare", "determine") maintain scientific objectivity. Nurses apply this principle when framing EBP questions and study aims (Polit & Beck).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q65: Increase in size — growth ───────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Growth and Development','In psychology, an increase in size is referred to as:','Growth','Development','Maturation','Evolution','A','Growth refers to a quantitative increase in physical size (height, weight, head circumference); development is qualitative acquisition of skills and functions (nursing/child psychology texts; Kenya IMNCI).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Growth and Development','In psychology, an increase in size is referred to as:','Growth','Development','Maturation','Evolution','A','Growth = quantitative (measurable size increase); development = qualitative (functional acquisition); maturation = genetically driven readiness. Nurses plot growth on WHO charts and screen for faltering (Kenya IMNCI; WHO Child Growth Standards).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q66: Osteoblast — bone formation ─────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Musculoskeletal Disorders','The cell involved in bone formation is:','Osteoclast','Osteoblast','Osteocyte','Chondrocyte','B','Osteoblasts are bone-forming cells responsible for synthesising and mineralising the bone matrix; osteoclasts resorb bone; osteocytes maintain bone (Brunner & Suddarth; anatomy).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Musculoskeletal Disorders','The cell involved in bone formation is:','Osteoclast','Osteoblast','Osteocyte','Chondrocyte','B','Osteoblast/osteoclast balance governs bone remodelling; imbalance causes osteoporosis (excess resorption) or osteopetrosis (excess formation). Bisphosphonates inhibit osteoclasts. Nurses educate on calcium, vitamin D, and weight-bearing exercise (Brunner & Suddarth; MSK EBP).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q67: DVT complication — pulmonary embolism and varicosity ─────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Vascular Disorders','Complications of deep vein thrombosis include:','Pulmonary embolism and varicosity','Cardiac tamponade and effusion','Stroke and renal failure','Haemoptysis and pneumonia','A','DVT complications include pulmonary embolism (thrombus dislodgement) and post-thrombotic syndrome with chronic varicosity and venous insufficiency (Brunner & Suddarth; vascular nursing).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Vascular Disorders','Complications of deep vein thrombosis include:','Pulmonary embolism and varicosity','Cardiac tamponade and effusion','Stroke and renal failure','Haemoptysis and pneumonia','A','PE (life-threatening) and post-thrombotic syndrome (varicosity, skin changes, oedema) are key DVT complications. Prevention: early mobilisation, anticoagulants, compression. Nurses assess Wells score and escalate (Brunner & Suddarth; vascular EBP).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q68: Raised ICP in infant — high-pitched cry, bulging fontanelle ──────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Neurological Disorders','Signs of raised intracranial pressure in an infant include:','Sunken fontanelle and bradycardia','Fever and petechial rash','High-pitched cry and bulging fontanelle','Low-pitched cry and depressed fontanelle','C','In infants, raised ICP manifests as a high-pitched (cerebral) cry and bulging/tense anterior fontanelle, along with irritability and sunset sign (Kenya Basic Paediatric Protocols; IMNCI).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Neurological Disorders','Signs of raised intracranial pressure in an infant include:','Sunken fontanelle and bradycardia','Fever and petechial rash','High-pitched cry and bulging fontanelle','Low-pitched cry and depressed fontanelle','C','Infant ICP signs: bulging fontanelle, high-pitched cry, sunset sign, irritability, vomiting. Late signs include Cushing triad (hypertension, bradycardia, irregular breathing). Nurses recognise early signs for timely escalation (Basic Paediatric Protocols; IMNCI).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q69: Severe anaemia in pregnancy — Hb < 7 g/dl ──────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Anaemia in Pregnancy','Severe anaemia in pregnancy is defined as haemoglobin below:','7 g/dl','10 g/dl','11 g/dl','8 g/dl','A','Per MOH Kenya/WHO guidelines, severe anaemia in pregnancy is defined as Hb < 7 g/dl and requires urgent management including blood transfusion (MOH Kenya ANC guidelines; Myles).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Anaemia in Pregnancy','Severe anaemia in pregnancy is defined as haemoglobin below:','7 g/dl','10 g/dl','11 g/dl','8 g/dl','A','Anaemia classification in pregnancy: mild 10–10.9, moderate 7–9.9, severe <7 g/dl (WHO/MOH Kenya). Severe anaemia requires transfusion, treatment of cause (malaria, iron deficiency, worm infestation). Nurses monitor Hb at each ANC visit (MOH Kenya ANC guidelines).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q70: Richter scale — earthquake magnitude ─────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Environmental Health','The Richter scale expresses earthquakes in terms of:','Intensity of shaking','Magnitude of energy released','Duration of tremors','Depth of focus','B','The Richter scale measures the magnitude (energy released) of an earthquake; intensity (Mercalli scale) measures the effects felt at a specific location (environmental health; disaster nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Environmental Health','The Richter scale expresses earthquakes in terms of:','Intensity of shaking','Magnitude of energy released','Duration of tremors','Depth of focus','B','Richter scale = magnitude (logarithmic, energy at source); Mercalli = intensity (effect at location). Community/disaster nurses apply this knowledge in mass casualty and disaster preparedness planning (environmental health; disaster nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q71: Fluid in pleural space — pleural effusion ────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','Accumulation of fluid in the pleural space is termed:','Pneumothorax','Pleural effusion','Haemothorax','Empyema','B','Pleural effusion is the accumulation of fluid (transudate or exudate) in the pleural space; pneumothorax is air, haemothorax is blood (Brunner & Suddarth; respiratory nursing).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','Accumulation of fluid in the pleural space is termed:','Pneumothorax','Pleural effusion','Haemothorax','Empyema','B','Pleural effusion: Light''s criteria distinguish transudate (CHF, hypoalbuminaemia) from exudate (malignancy, TB, pneumonia). Nurses monitor respiratory distress and assist with thoracocentesis (Brunner & Suddarth; respiratory EBP).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q72: Yellow fever signs and symptoms ──────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','The signs and symptoms of yellow fever include:','Headache, fever, jaundice, and vomiting','Cough, rash, and lymphadenopathy','Haematuria, proteinuria, and hypertension','Diarrhoea, abdominal pain, and hepatomegaly only','A','Yellow fever is characterised by headache, high fever, jaundice (from hepatic involvement), and vomiting. Haemorrhagic manifestations occur in severe cases (MOH Kenya/WHO yellow fever guidelines; community health).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','The signs and symptoms of yellow fever include:','Headache, fever, jaundice, and vomiting','Cough, rash, and lymphadenopathy','Haematuria, proteinuria, and hypertension','Diarrhoea, abdominal pain, and hepatomegaly only','A','Yellow fever: Aedes aegypti-borne flavivirus; toxic phase includes hepato-renal failure, haemorrhage. Prevention: 17D vaccine (single dose, lifelong). Nurses apply yellow card requirements for travellers and manage outbreak response (MOH Kenya; WHO yellow fever guidelines).','medium',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Q73: Ratio scale — absolute zero ─────────────────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Biostatistics','The scale of measurement that has an absolute zero is:','Ratio scale','Nominal scale','Ordinal scale','Interval scale','A','Ratio scale is the highest level of measurement and is the only scale with a true (absolute) zero, permitting all arithmetic operations (Polit & Beck; biostatistics).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Biostatistics','The scale of measurement that has an absolute zero is:','Ratio scale','Nominal scale','Ordinal scale','Interval scale','A','NOIR hierarchy: Nominal (categories), Ordinal (ranks), Interval (equal intervals, no true zero), Ratio (equal intervals + absolute zero). Ratio scale allows ratio comparisons (e.g. weight 60 kg is twice 30 kg). Nurses apply this when selecting statistical tests (Polit & Beck).','easy',2023,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;
