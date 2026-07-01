-- Migration: 20260628000003
-- Source: NCK-NEW-MCQ-Compilation.docx — Year 2021 (NCK KRCHN April 2021 CBT)
-- Both KRCHN and BScN, Paper I and Paper II
-- Audit: verified against MOH Kenya, Kenya IMNCI, Brunner & Suddarth, DSM-5,
--        Mental Health Act Kenya, Myles Textbook for Midwives, BNF, Stuart Psychiatric Nursing
-- Paper assignment per nck-exam-system.md Section 12.

-- ── 2021 Q1: Physical disability (Paper II — Community/Professional Issues) ───

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('KRCHN','Paper II','Community Health Nursing','Disability and Rehabilitation',
'The term physical disability can be defined as a physical condition that impacts:',
'One''s athletic ability','One''s intelligence','Activities of daily living','One''s social skills',
'C','Physical disability is a condition that limits activities of daily living (functional limitation), per Kenya disability/rehabilitation guidelines and Brunner & Suddarth.','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('BScN','Paper II','Community Health Nursing','Disability and Rehabilitation',
'The term physical disability can be defined as a physical condition that impacts:',
'One''s athletic ability','One''s intelligence','Activities of daily living','One''s social skills',
'C','Physical disability is a condition that limits activities of daily living (functional limitation), per Kenya disability/rehabilitation guidelines and Brunner & Suddarth.','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;

-- ── 2021 Q2: Erikson Industry vs Inferiority ─────────────────────────────────

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('KRCHN','Paper II','Community Health Nursing','Growth and Development',
'According to Erikson''s Psychosocial Stages of Development, the stage in which a child needs to learn important skills and compare favourably with peers in school to achieve competence is referred to as:-',
'Initiative vs guilt','Identity vs role confusion','Trust vs mistrust','Industry vs inferiority',
'D','Erikson''s Industry vs Inferiority (school age, 6–12 years) is when a child masters skills and compares with peers to achieve competence (developmental psychology, paediatric nursing texts).','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('BScN','Paper II','Community Health Nursing','Growth and Development',
'According to Erikson''s Psychosocial Stages of Development, the stage in which a child needs to learn important skills and compare favourably with peers in school to achieve competence is referred to as:-',
'Initiative vs guilt','Identity vs role confusion','Trust vs mistrust','Industry vs inferiority',
'D','Erikson''s Industry vs Inferiority (school age, 6–12 years) is when a child masters skills and compares with peers to achieve competence.','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;

-- ── 2021 Q3: Rate of natural increase ────────────────────────────────────────

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('KRCHN','Paper II','Community Health Nursing','Epidemiology and Demography',
'The rate of natural increase in the human population is calculated by',
'Crude birth rate + crude mortality rate','Crude death rate − crude birth rate',
'Crude birth rate − crude death rate','Crude death rate + crude birth rate',
'C','Rate of natural increase = crude birth rate minus crude death rate (community health/epidemiology, demographic measures).','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES ('BScN','Paper II','Community Health Nursing','Epidemiology and Demography',
'The rate of natural increase in the human population is calculated by',
'Crude birth rate + crude mortality rate','Crude death rate − crude birth rate',
'Crude birth rate − crude death rate','Crude death rate + crude birth rate',
'C','Rate of natural increase = crude birth rate minus crude death rate (community health/epidemiology).','easy',2021,'approved',NULL)
ON CONFLICT (stem, cadre) DO NOTHING;


-- Q4: Most common cause of pneumonia in children < 5
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Respiratory Infections','The most common cause of pneumonia in children less than 5 years is:','Haemophilus influenzae type B','Streptococcus pneumoniae','Staphylococcus aureus','Group B beta-haemolytic streptococcus','B','Streptococcus pneumoniae is the leading bacterial cause of pneumonia in children under 5 years, per Kenya Basic Paediatric Protocols/IMNCI.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Respiratory Infections','The most common cause of pneumonia in children less than 5 years is:','Haemophilus influenzae type B','Streptococcus pneumoniae','Staphylococcus aureus','Group B beta-haemolytic streptococcus','B','Streptococcus pneumoniae is the leading bacterial cause of pneumonia in children under 5 years, per Kenya Basic Paediatric Protocols/IMNCI.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q5: School health programme grouping
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','School Health','During a school health programme,','All school children need to be served under one roof','Groups need to be formed and served as per their need','Parents, teachers and students should be served together','Teachers should be served first for them to control students','B','School health programmes group children/clients by their specific needs and serve accordingly (MOH Kenya school health guidelines/community health nursing).','medium',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','School Health','During a school health programme,','All school children need to be served under one roof','Groups need to be formed and served as per their need','Parents, teachers and students should be served together','Teachers should be served first for them to control students','B','School health programmes group children/clients by their specific needs and serve accordingly (MOH Kenya school health guidelines).','medium',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q6: Genital ulcers with painful vesicles — genital herpes STI treatment
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','STI Management','A patient who presents with genital ulcers with multiple painful vesicles is treated with:','Benzathine Penicillin 2.4 MU stat','Cefixime 400 mg stat','Ceftriaxone 500 mg IM stat and Acyclovir 400 mg TID × 10 days','Azithromycin 2 g PO stat and Acyclovir 400 mg TID × 10 days','D','Multiple painful vesicles indicate genital herpes; Kenya STI syndromic management of genital ulcer disease: Azithromycin 2 g stat (covers chancroid/syphilis co-infection) plus Acyclovir 400 mg TID × 10 days (Kenya National STI Management Guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','STI Management','A patient who presents with genital ulcers with multiple painful vesicles is treated with:','Benzathine Penicillin 2.4 MU stat','Cefixime 400 mg stat','Ceftriaxone 500 mg IM stat and Acyclovir 400 mg TID × 10 days','Azithromycin 2 g PO stat and Acyclovir 400 mg TID × 10 days','D','Multiple painful vesicles indicate genital herpes; Kenya STI syndromic management: Azithromycin 2 g stat plus Acyclovir 400 mg TID × 10 days (Kenya National STI Guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q7: Involuntary admission — aggressive patient, no insight
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Psychiatric Admissions','The mode of admission for an aggressive patient with no insight to a mental hospital is:','Temporary','Involuntary','Voluntary','Emergency section','B','An aggressive patient lacking insight is admitted involuntarily/compulsorily under the Mental Health Act, Kenya (Cap 248).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Psychiatric Admissions','The mode of admission for an aggressive patient with no insight to a mental hospital is:','Temporary','Involuntary','Voluntary','Emergency section','B','An aggressive patient lacking insight is admitted involuntarily/compulsorily under the Mental Health Act, Kenya (Cap 248).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Q8: Cephalo-caudal growth principle
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Growth and Development','When assessing growth and development in a 5-year-old pupil:','All individuals follow cephalo-caudal and proximo-distal patterns','All individuals follow a standard growth rate','Rate and pattern of growth can always be modified','Different parts of the body grow at the same rate','A','Growth and development follow predictable directional principles: cephalo-caudal (head-to-toe) and proximo-distal (centre-to-periphery), universal in paediatric growth assessment (Kenya Basic Paediatric Protocols; Whaley & Wong).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Growth and Development','When assessing growth and development in a 5-year-old pupil:','All individuals follow cephalo-caudal and proximo-distal patterns','All individuals follow a standard growth rate','Rate and pattern of growth can always be modified','Different parts of the body grow at the same rate','A','Growth and development follow cephalo-caudal and proximo-distal directional patterns universally (Kenya Basic Paediatric Protocols).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q9: MOH 613 — involuntary admission legal form
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Mental Health Legislation','The legal document used for involuntary psychiatric admission in Kenya is:','MOH 613','MOH 637','MOH 614','MOH 638','A','Involuntary (compulsory) admission of a mentally ill person in Kenya is effected on form MOH 613 under the Mental Health Act Cap 248 (Kenya Mental Health Act).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Mental Health Legislation','The legal document used for involuntary psychiatric admission in Kenya is:','MOH 613','MOH 637','MOH 614','MOH 638','A','Involuntary admission in Kenya is effected on MOH 613 under the Mental Health Act Cap 248.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q10: School health records
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','School Health','Some of the records included in a school health programme include:','Schools covered, pupils treated, number of teachers, activities carried out, health messages shared','Schools covered, pupils treated, activities carried out, health messages shared','Pupils referred, type of ailments treated, activities carried out, number of teachers','Activities carried out, health achievements, health messages shared, number of visits','A','School health programme records capture schools covered, pupils treated, number of teachers, activities carried out and health messages shared (Kenya school health/community health guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','School Health','Some of the records included in a school health programme include:','Schools covered, pupils treated, number of teachers, activities carried out, health messages shared','Schools covered, pupils treated, activities carried out, health messages shared','Pupils referred, type of ailments treated, activities carried out, number of teachers','Activities carried out, health achievements, health messages shared, number of visits','A','School health programme records include schools covered, pupils treated, number of teachers, activities and health messages shared (Kenya school health guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q11: Measures of dispersion
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Biostatistics','Measures of dispersion include:','Range, mean, variance','Range, variance, standard deviation','Median, variance, mean deviation','Standard deviation, mean deviation, mode','B','Measures of dispersion (variability) are range, variance and standard deviation; mean, median and mode are measures of central tendency (nursing research/statistics texts; Polit & Beck).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Biostatistics','Measures of dispersion include:','Range, mean, variance','Range, variance, standard deviation','Median, variance, mean deviation','Standard deviation, mean deviation, mode','B','Measures of dispersion are range, variance and standard deviation; mean, median and mode are measures of central tendency (Polit & Beck; nursing research texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q12: Control group receives placebo
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','In clinical trials the control group receives:-','Placebo','Active treatment','Blinding','Active treatment and placebo','A','In clinical trials the control group receives a placebo (or no active treatment) for comparison with the experimental group receiving the intervention (nursing research texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','In clinical trials the control group receives:-','Placebo','Active treatment','Blinding','Active treatment and placebo','A','In clinical trials the control group receives a placebo (or no active treatment) for comparison with the intervention group (nursing research texts; Polit & Beck).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Q13: Dependent personality disorder
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Personality Disorders','A 20-year-old client is diagnosed with dependent personality disorder. Which behaviour is most likely?','Showing interest in solitary activities','Recurrent self-destructive behaviour','Inability to make choices and decisions without advice','Avoiding relationships','C','Dependent personality disorder is marked by an excessive need to be cared for and inability to make everyday decisions without excessive advice and reassurance (DSM-5; Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Personality Disorders','A 20-year-old client is diagnosed with dependent personality disorder. Which behaviour is most likely?','Showing interest in solitary activities','Recurrent self-destructive behaviour','Inability to make choices and decisions without advice','Avoiding relationships','C','Dependent personality disorder: inability to make everyday decisions without excessive advice and reassurance (DSM-5; Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q14: Post-MI health messages
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Cardiac Rehabilitation','The health messages that should be shared with a patient who has suffered from myocardial infarction include:','Eating a low-salt but fluid-free diet','Reporting insomnia whenever it occurs','Reporting to healthcare providers if extremely fatigued','Identification and modification of all risk factors','D','Brunner & Suddarth cardiac rehabilitation: post-MI teaching centres on identification and modification of all modifiable risk factors (smoking, diet, BP, lipids, physical activity).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Cardiac Rehabilitation','The health messages that should be shared with a patient who has suffered from myocardial infarction include:','Eating a low-salt but fluid-free diet','Reporting insomnia whenever it occurs','Reporting to healthcare providers if extremely fatigued','Identification and modification of all risk factors','D','Brunner & Suddarth cardiac rehabilitation: post-MI teaching centres on identification and modification of all modifiable risk factors.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q15: Primary skin lesion — wheal
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Dermatological Assessment','An example of a primary skin lesion is:','Fissure','Scales','Ulcer','Wheal','D','Brunner & Suddarth dermatology: a wheal is a primary skin lesion (transient raised area from oedema); fissures, scales and ulcers are secondary lesions arising from primary ones.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Dermatological Assessment','An example of a primary skin lesion is:','Fissure','Scales','Ulcer','Wheal','D','Brunner & Suddarth: a wheal is a primary skin lesion; fissures, scales and ulcers are secondary lesions.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q16: Reproductive health — integrated services
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Reproductive Health','In reproductive health the main purpose of integrated health services is to reduce the rates of:-','Mortality, migration, anaemia','Fertility, malaria, mortality','Mortality, anaemia, haemorrhage','Morbidity, fertility, mortality','D','Kenya reproductive health guidelines: integrated RH services aim to reduce maternal/child morbidity, mortality and excess fertility.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Reproductive Health','In reproductive health the main purpose of integrated health services is to reduce the rates of:-','Mortality, migration, anaemia','Fertility, malaria, mortality','Mortality, anaemia, haemorrhage','Morbidity, fertility, mortality','D','Kenya reproductive health guidelines: integrated RH services aim to reduce maternal/child morbidity, mortality and excess fertility.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q17: Nurses Act CAP 257
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Professional Regulation','The act that regulates training and practice of nurses in Kenya is:-','Nurses Act CAP 260','Nurses Act CAP 267','Nurses Act CAP 263','Nurses Act CAP 257','D','The Nurses Act, Cap 257 of the Laws of Kenya, governs the training and practice of nurses (NCK/professional regulation).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Professional Regulation','The act that regulates training and practice of nurses in Kenya is:-','Nurses Act CAP 260','Nurses Act CAP 267','Nurses Act CAP 263','Nurses Act CAP 257','D','The Nurses Act, Cap 257 of the Laws of Kenya, governs the training and practice of nurses (NCK/professional regulation).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Q18: Valsalva post-MI — vagus nerve
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Cardiovascular Nursing','A post-MI patient asks why she should not strain during a bowel movement. The nurse explains this triggers:','Sympathetic stimulation causing decreased heart rate and contractility','Vagus nerve stimulation causing increased heart rate and contractility','Vagus nerve stimulation causing decreased heart rate and contractility','Sympathetic stimulation causing increased heart rate and contractility','C','Brunner & Suddarth: Valsalva manoeuvre (straining) stimulates the vagus nerve, decreasing heart rate and cardiac contractility — dangerous post-MI as it can precipitate arrhythmias and cardiac arrest.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Cardiovascular Nursing','A post-MI patient asks why she should not strain during a bowel movement. The nurse explains this triggers:','Sympathetic stimulation causing decreased heart rate and contractility','Vagus nerve stimulation causing increased heart rate and contractility','Vagus nerve stimulation causing decreased heart rate and contractility','Sympathetic stimulation causing increased heart rate and contractility','C','Valsalva manoeuvre stimulates the vagus nerve, decreasing heart rate and contractility — dangerous post-MI (Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q19: Omphalitis complications
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Neonatal Infections','Omphalitis in the newborn predisposes to the following complications:','Diarrhoea, vomiting','Anaemia, gastroenteritis','Septicaemia, bacterial hepatitis','Necrotizing fasciitis, septicaemia','D','Omphalitis (umbilical infection) can spread to cause necrotizing fasciitis and septicaemia in the newborn — life-threatening complications (Kenya Basic Paediatric Protocols; MOH newborn care guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Neonatal Infections','Omphalitis in the newborn predisposes to the following complications:','Diarrhoea, vomiting','Anaemia, gastroenteritis','Septicaemia, bacterial hepatitis','Necrotizing fasciitis, septicaemia','D','Omphalitis can spread to cause necrotizing fasciitis and septicaemia in the newborn (Kenya Basic Paediatric Protocols).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q20: Puerperal sepsis signs
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Midwifery','Puerperal Sepsis','Signs of puerperal sepsis include:','Pyrexia, tachycardia, pink lochia','Pyrexia, tachycardia, offensive lochia','Pyrexia, tachycardia, red lochia','Pyrexia, tachycardia, whitish lochia','B','Myles Textbook for Midwives: puerperal sepsis presents with pyrexia, tachycardia and offensive (foul-smelling) lochia indicating uterine/pelvic infection.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Puerperal Sepsis','Signs of puerperal sepsis include:','Pyrexia, tachycardia, pink lochia','Pyrexia, tachycardia, offensive lochia','Pyrexia, tachycardia, red lochia','Pyrexia, tachycardia, whitish lochia','B','Myles Textbook for Midwives: puerperal sepsis — pyrexia, tachycardia, offensive lochia.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q21: Frontal lobe brain abscess
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Neurological Disorders','The clinical presentation of a brain abscess in the frontal lobe includes:-','Expressive aphasia, facial weakness and hemiparesis','Expressive aphasia, hemiparesis and headache','Occipital headache, hemiparesis and ataxia','Facial weakness, headache and hemiparesis','B','Frontal lobe abscess (dominant hemisphere) produces expressive/Broca''s aphasia, contralateral hemiparesis and headache from raised ICP (Brunner & Suddarth, neurological assessment).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Neurological Disorders','The clinical presentation of a brain abscess in the frontal lobe includes:-','Expressive aphasia, facial weakness and hemiparesis','Expressive aphasia, hemiparesis and headache','Occipital headache, hemiparesis and ataxia','Facial weakness, headache and hemiparesis','B','Frontal lobe abscess produces expressive aphasia, contralateral hemiparesis and headache from raised ICP (Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q22: COPD oxygen rate 2 L/min
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','The rate of oxygen administered to a chronic emphysema patient is:','10 L/minute','5 L/minute','2 L/minute','7 L/minute','C','In chronic emphysema/COPD with CO2 retention, controlled low-flow oxygen at approximately 2 L/min targets SpO2 88–92%, avoiding abolition of the hypoxic respiratory drive (MOH Kenya respiratory guidelines; Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Respiratory Disorders','The rate of oxygen administered to a chronic emphysema patient is:','10 L/minute','5 L/minute','2 L/minute','7 L/minute','C','Controlled low-flow oxygen at ~2 L/min in chronic emphysema/COPD with CO2 retention, targeting SpO2 88–92% (MOH Kenya respiratory guidelines; Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q23: Empyema — indication for chest tube
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Medical-Surgical Nursing','Respiratory Procedures','An indication for chest tube drainage is:','Empyema','Haemoptysis','Ascites','Flail chest','A','Empyema (pus in the pleural space) is a primary indication for chest tube underwater seal drainage to drain the infected collection (Brunner & Suddarth, thoracic drainage).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Respiratory Procedures','An indication for chest tube drainage is:','Empyema','Haemoptysis','Ascites','Flail chest','A','Empyema is a primary indication for chest tube drainage (Brunner & Suddarth, thoracic drainage).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Q24: H2 receptor antagonist — ranitidine
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Pharmacology','Gastrointestinal Drugs','The following is an H2 receptor antagonist:','Sucralfate','Omeprazole','Misoprostol','Ranitidine','D','Ranitidine is an H2-receptor antagonist; omeprazole is a PPI, sucralfate a cytoprotectant, misoprostol a prostaglandin analogue (BNF).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Pharmacology','Gastrointestinal Drugs','The following is an H2 receptor antagonist:','Sucralfate','Omeprazole','Misoprostol','Ranitidine','D','Ranitidine is an H2-receptor antagonist; omeprazole is a PPI, sucralfate a cytoprotectant, misoprostol a prostaglandin analogue (BNF).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q25: Absorbable sutures
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Surgical Nursing','Perioperative Care','The following are absorbable sutures:','Silk, Linen','Ethanol, Vicryl','Nylon, Polypropylene','Chromic gut, Vicryl','D','Chromic catgut and Vicryl (polyglactin) are absorbable sutures; silk, nylon and polypropylene are non-absorbable (Brunner & Suddarth, perioperative care).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Surgical Nursing','Perioperative Care','The following are absorbable sutures:','Silk, Linen','Ethanol, Vicryl','Nylon, Polypropylene','Chromic gut, Vicryl','D','Chromic catgut and Vicryl are absorbable sutures; silk, nylon and polypropylene are non-absorbable (Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── 2021 Paper II remaining questions ────────────────────────────────────────

-- Management functions (KRCHN Paper II / BScN Paper II)
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Management','Management functions include:-','Planning, organising, staffing, controlling','Planning, centralisation, authority, controlling','Authority, planning, organising, staffing','Unity of command, staffing, controlling, directing','A','Classic management functions per Fayol/nursing management texts: planning, organising, staffing, directing and controlling. Option A lists the four core functions.','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Management','Management functions include:-','Planning, organising, staffing, controlling','Planning, centralisation, authority, controlling','Authority, planning, organising, staffing','Unity of command, staffing, controlling, directing','A','Classic management functions: planning, organising, staffing, directing and controlling (nursing management/leadership texts).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- IMNCI: all children checked for malnutrition
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','IMNCI Guidelines','The categories of children who should be checked for malnutrition and anaemia include:','Children with diarrhoea','Children with feeding problems','All children brought to clinic','Children with chronic illness leading to loss of weight','C','Kenya IMNCI requires ALL sick children brought to clinic to be routinely assessed for malnutrition and anaemia — not only selected groups (Kenya IMNCI/IMCI assessment guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','IMNCI Guidelines','The categories of children who should be checked for malnutrition and anaemia include:','Children with diarrhoea','Children with feeding problems','All children brought to clinic','Children with chronic illness leading to loss of weight','C','Kenya IMNCI: ALL sick children brought to clinic must be assessed for malnutrition and anaemia.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Schistosoma haematobium — urogenital damage
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Parasitic Diseases','Infection with this parasite can cause extensive damage to human urogenital structures:','Ascaris lumbricoides','Schistosoma haematobium','Toxoplasma gondii','Schistosoma mansoni','B','Schistosoma haematobium causes urinary schistosomiasis, damaging bladder and urogenital structures (Kenya neglected tropical disease/parasitology guidelines; MOH Kenya NTD programme).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Parasitic Diseases','Infection with this parasite can cause extensive damage to human urogenital structures:','Ascaris lumbricoides','Schistosoma haematobium','Toxoplasma gondii','Schistosoma mansoni','B','Schistosoma haematobium causes urinary schistosomiasis and urogenital damage (MOH Kenya NTD guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Herd immunity
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Epidemiology','Herd immunity exists in a community when:-','A high percentage of people are immune to an infection','The incidence of the disease decreases to a very low level','Vaccination is stopped in a community that has been well vaccinated','Both dead and live antigens are used to immunise','A','Herd immunity exists when a sufficiently high proportion of the population is immune, protecting susceptible individuals indirectly (Kenya EPI/immunisation & epidemiology).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Epidemiology','Herd immunity exists in a community when:-','A high percentage of people are immune to an infection','The incidence of the disease decreases to a very low level','Vaccination is stopped in a community that has been well vaccinated','Both dead and live antigens are used to immunise','A','Herd immunity exists when a high proportion of the population is immune (Kenya EPI/epidemiology).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Bipolar I nursing intervention — structured environment
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Bipolar Disorder','A nursing intervention for a male client with bipolar I disorder should include:','Designing activities requiring the client to maintain contact with reality','Providing a structured environment','Engaging the client in conversation about current affairs','Touching the client to provide assurance','B','Manic clients in bipolar I need a structured, low-stimulus environment to reduce distractibility and hyperactivity (Stuart Psychiatric Nursing; Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Bipolar Disorder','A nursing intervention for a male client with bipolar I disorder should include:','Designing activities requiring the client to maintain contact with reality','Providing a structured environment','Engaging the client in conversation about current affairs','Touching the client to provide assurance','B','Manic clients need a structured, low-stimulus environment to reduce distractibility and hyperactivity (Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Labile affect
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Mental Status Examination','Rapid and abrupt changes in emotional feeling is termed:','Rapid affect','Restricted affect','Labile affect','Inappropriate affect','C','Labile affect denotes rapid, abrupt shifts in emotional expression (mental health assessment/psychiatric nursing; Stuart).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Mental Status Examination','Rapid and abrupt changes in emotional feeling is termed:','Rapid affect','Restricted affect','Labile affect','Inappropriate affect','C','Labile affect: rapid, abrupt shifts in emotional expression (Stuart Psychiatric Nursing; MSE).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Operational definitions in research
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','The purpose of operational definitions in research is to:','Facilitate standardised communication among investigators','Spell out how the investigator manipulates the independent variable','Enhance the ordinary meaning assigned to variables','Describe all meanings of variables','A','Operational definitions specify how variables are measured/observed, enabling standardised communication and replication among investigators (Polit & Beck, nursing research methodology).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','The purpose of operational definitions in research is to:','Facilitate standardised communication among investigators','Spell out how the investigator manipulates the independent variable','Enhance the ordinary meaning assigned to variables','Describe all meanings of variables','A','Operational definitions specify how variables are measured, enabling standardised communication and replication (Polit & Beck).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Post-visit phase of home visit
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Home Visiting','Activities during the post-visit phase of a home visit include:-','Developing a future follow-up care plan','Integrating the patient into the community','Transferring patient care to another agency','Sharing the report of home visit with relevant authorities','A','The post-visit (evaluation) phase of a home visit includes recording findings and developing a future follow-up care plan (Kenya community health nursing guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Home Visiting','Activities during the post-visit phase of a home visit include:-','Developing a future follow-up care plan','Integrating the patient into the community','Transferring patient care to another agency','Sharing the report of home visit with relevant authorities','A','The post-visit phase includes recording findings and developing a future follow-up care plan (Kenya community health nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Abortive polio symptom — sore throat
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','The following is a symptom of abortive poliomyelitis:','Muscle spasm','Sore throat','Stiff neck','Back pain','B','Abortive (minor illness) poliomyelitis presents with non-specific symptoms: fever, headache, malaise, sore throat and mild GI upset — without CNS involvement (Kenya EPI/communicable disease guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','The following is a symptom of abortive poliomyelitis:','Muscle spasm','Sore throat','Stiff neck','Back pain','B','Abortive polio presents with fever, sore throat, malaise — no CNS involvement (Kenya EPI/communicable disease guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Depression diagnosis criteria — indecisiveness/poor concentration
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Depressive Disorders','The following statement is true in reference to depression:-','It can only be confirmed if a patient has lost a relative, job or something valuable','It is obvious — the illness runs along familial lines','Indecisiveness and poor concentration are significant in its diagnosis','In children and adolescents it is not significant','C','Indecisiveness and impaired concentration are DSM-5 core diagnostic criteria for major depressive disorder; loss/bereavement is not required for diagnosis (DSM-5; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Depressive Disorders','The following statement is true in reference to depression:-','It can only be confirmed if a patient has lost a relative, job or something valuable','It is obvious — the illness runs along familial lines','Indecisiveness and poor concentration are significant in its diagnosis','In children and adolescents it is not significant','C','Indecisiveness and impaired concentration are DSM-5 core criteria for depression; a precipitating loss is not required (DSM-5; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Descriptive statistics
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Biostatistics','Research descriptive statistics refers to:-','An estimate of the population parameters from sample data','A description of the patterns and specific trends in a data set','Examination of one variable at a time','Testing hypotheses','B','Descriptive statistics summarise and describe patterns and trends in a data set, distinct from inferential statistics which draw conclusions about populations (Polit & Beck; nursing research texts).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Biostatistics','Research descriptive statistics refers to:-','An estimate of the population parameters from sample data','A description of the patterns and specific trends in a data set','Examination of one variable at a time','Testing hypotheses','B','Descriptive statistics summarise and describe patterns and trends in a data set (Polit & Beck).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Disaster management cycle
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Disaster Management','The cycle of disaster consists of the following components:','Mitigation, Preparedness, Response, Recovery','Preparedness, vulnerability assessment, risk assessment, recovery','None of the above','Mitigation, Risk assessment, Response and Recovery','A','The disaster management cycle comprises four phases: Mitigation, Preparedness, Response and Recovery (Kenya disaster management/community health framework).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Disaster Management','The cycle of disaster consists of the following components:','Mitigation, Preparedness, Response, Recovery','Preparedness, vulnerability assessment, risk assessment, recovery','None of the above','Mitigation, Risk assessment, Response and Recovery','A','Disaster management cycle: Mitigation, Preparedness, Response and Recovery (Kenya disaster management framework).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Primary purpose of epidemiologic investigation — etiology
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Epidemiology','The primary purpose of conducting an epidemiologic investigation is to:','Identify groups who are at risk of contracting the disease','Identify geographical location of cases in the community','Delineate the aetiology of the epidemic','Encourage cooperation and support of the community','C','The primary purpose of an epidemiologic investigation is to delineate the aetiology/cause of the epidemic so that control measures can be implemented (epidemiology principles; Park''s Textbook of Preventive & Social Medicine).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Epidemiology','The primary purpose of conducting an epidemiologic investigation is to:','Identify groups who are at risk of contracting the disease','Identify geographical location of cases in the community','Delineate the aetiology of the epidemic','Encourage cooperation and support of the community','C','The primary purpose of an epidemiologic investigation is to delineate the aetiology of the epidemic to guide control (epidemiology principles).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Main goals of community health
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Community Health Principles','The following is one of the main goals of community health:-','Early diagnosis and prevention of disease','Control of communicable diseases','Identify community health problems and needs','Improved sanitation in the environment','C','A core goal of community health nursing is to identify the community''s health problems and needs as the basis for planning and intervention (community health nursing texts; MOH Kenya).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Community Health Principles','The following is one of the main goals of community health:-','Early diagnosis and prevention of disease','Control of communicable diseases','Identify community health problems and needs','Improved sanitation in the environment','C','A core goal of community health is to identify community health problems and needs as the basis for intervention (MOH Kenya community health strategy).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Health education importance — knowledge and attitude
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Education','The importance of health education in inspiring behaviour change is:-','Helps to increase learning and skills','Stimulates community to take ownership','Increases understanding and coping','Increases knowledge and attitude of the people','D','Health education promotes behaviour change by increasing the knowledge and attitude of people — the basis of the knowledge-attitude-practice (KAP) model (MOH Kenya health promotion guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Education','The importance of health education in inspiring behaviour change is:-','Helps to increase learning and skills','Stimulates community to take ownership','Increases understanding and coping','Increases knowledge and attitude of the people','D','Health education promotes behaviour change through the KAP model: increasing knowledge and attitude (MOH Kenya health promotion guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Maternal prenatal factors — infections, drug use
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Paediatric Nursing','Growth and Development','Maternal factors affecting growth and development during the prenatal period include:','Infections, use of drugs','Smoking, faulty placental implantation','Number of children, use of drugs','Malposition, alcoholism','A','Prenatal maternal factors affecting fetal growth and development include maternal infections (TORCH) and drug/substance use (Kenya Basic Paediatric Protocols; Myles Textbook for Midwives).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Paediatric Nursing','Growth and Development','Maternal factors affecting growth and development during the prenatal period include:','Infections, use of drugs','Smoking, faulty placental implantation','Number of children, use of drugs','Malposition, alcoholism','A','Prenatal maternal factors: infections and drug use (Kenya Basic Paediatric Protocols; Myles).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Communicable disease control at individual/village level
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Disease Control','Communicable disease control measures at individual and village level include:-','Increase immunisation coverage, environmental manipulation','Emphasise water protection and purification','Completing immunisation, protection of springs and wells','Participate in vector and reservoir control, immunisation coverage','C','At individual and village level: completing immunisation and protecting springs/wells prevents waterborne and vaccine-preventable disease spread (MOH Kenya community health/communicable disease control).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Disease Control','Communicable disease control measures at individual and village level include:-','Increase immunisation coverage, environmental manipulation','Emphasise water protection and purification','Completing immunisation, protection of springs and wells','Participate in vector and reservoir control, immunisation coverage','C','Individual/village level: completing immunisation and protecting springs/wells (MOH Kenya community health guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Nurse as resource person in health promotion
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Promotion','When developing health promotion plans with clients, the nurse educator should take the role of:','Promoter','Counsellor','Resource person','Advisor','C','When developing health promotion plans the nurse acts as a resource person, supplying information and resources to support client decision-making (health promotion/community health nursing texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Promotion','When developing health promotion plans with clients, the nurse educator should take the role of:','Promoter','Counsellor','Resource person','Advisor','C','The nurse acts as a resource person when developing health promotion plans with clients (health promotion/community health nursing texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Democratic leadership style
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Leadership Styles','The style of leadership that takes into account other people''s views, opinions and ideas is:','Laissez-faire','Democratic','Autocratic','People-oriented','B','Democratic (participative) leadership solicits and incorporates the views, opinions and ideas of group members before making decisions (standard nursing management/leadership texts).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Leadership Styles','The style of leadership that takes into account other people''s views, opinions and ideas is:','Laissez-faire','Democratic','Autocratic','People-oriented','B','Democratic leadership incorporates the views and ideas of group members (nursing management/leadership texts).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Behaviour change approach to health promotion
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Health Promotion','The approach to health promotion which aims to increase individuals'' knowledge about the link between behaviour and health is:','Behaviour change approach','Community development approach','Community-based approach','Biomedical approach','A','The behaviour-change approach works by increasing individual knowledge of the link between behaviour and health to change attitudes and habits (Ewles & Simnett; Kenya community health/health promotion texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Promotion','The approach to health promotion which aims to increase individuals'' knowledge about the link between behaviour and health is:','Behaviour change approach','Community development approach','Community-based approach','Biomedical approach','A','The behaviour-change approach increases individual knowledge and attitudes to encourage healthy behaviours (Ewles & Simnett; Kenya community health).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- BMI 23 = normal weight
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Nutrition','A body mass index (BMI) of 23 is considered to be:','Obese','Overweight','Normal weight','Underweight','C','A BMI of 23 kg/m² lies within the WHO/MOH Kenya normal range of 18.5–24.9 kg/m² (Kenya MOH nutrition guidelines; WHO classification).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nutrition','Nutrition Assessment','A body mass index (BMI) of 23 is considered to be:','Obese','Overweight','Normal weight','Underweight','C','BMI 23 kg/m² is within the normal range 18.5–24.9 (WHO/MOH Kenya nutrition guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Measles complication — diarrhoea
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Communicable Diseases','The following is a complicated sign/symptom of measles disease:-','Fever','Coryza','Coughing','Diarrhoea','D','Fever, coryza and cough are features of uncomplicated measles; diarrhoea signals a complication of measles (often indicating secondary infection or enteropathy) per Kenya IMNCI/Basic Paediatric Protocols.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Communicable Diseases','The following is a complicated sign/symptom of measles disease:-','Fever','Coryza','Coughing','Diarrhoea','D','Fever, coryza and cough are uncomplicated measles features; diarrhoea signals a complication (Kenya IMNCI/Basic Paediatric Protocols).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Primary prevention — immunisation, diet, exercise
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Levels of Prevention','Primary disease prevention involves:','Immunisation, screening for cervical cancer, good nutrition','Early treatment, regular medical check-ups, mass treatment','Screening for cervical cancer, early treatment, immunisation','Immunisation, eating balanced diet, regular exercise','D','Primary prevention acts before disease occurs: immunisation, balanced diet and regular exercise. Screening and early treatment are secondary prevention (Kenya community health/epidemiology).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Levels of Prevention','Primary disease prevention involves:','Immunisation, screening for cervical cancer, good nutrition','Early treatment, regular medical check-ups, mass treatment','Screening for cervical cancer, early treatment, immunisation','Immunisation, eating balanced diet, regular exercise','D','Primary prevention: immunisation, balanced diet, regular exercise (before disease occurs). Screening = secondary prevention.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Vulnerability analysis — mitigation phase
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Disaster Management','Vulnerability analysis comes in which part of the Disaster Management Cycle?','Mitigation','Recovery','Preparedness','Response','A','Vulnerability/risk analysis is conducted during the mitigation phase to identify and reduce risks before a disaster event occurs (Kenya disaster management/community health texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Disaster Management','Vulnerability analysis comes in which part of the Disaster Management Cycle?','Mitigation','Recovery','Preparedness','Response','A','Vulnerability analysis occurs in the mitigation phase to identify and reduce risks (Kenya disaster management texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Measles vaccine wastage factor 1/2
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Immunisation Programme','The wastage factor for measles vaccine is:-','1/5','1/3','1/2','1/4','C','Measles is a lyophilised multi-dose vaccine with a wastage allowance of 50% (1/2) under Kenya EPI vaccine management guidelines due to reconstitution losses.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Immunisation Programme','The wastage factor for measles vaccine is:-','1/5','1/3','1/2','1/4','C','Measles vaccine wastage allowance is 50% (1/2) under Kenya EPI vaccine management guidelines.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Cognitive domain — acquisition of facts/concepts
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Nursing Education','The learning domain concerned with acquisition of facts, concepts and principles is:','Affective','Cognitive','Evaluative','Psychomotor','B','The cognitive domain (Bloom''s taxonomy) governs acquisition of facts, concepts and principles — knowledge and intellectual skills (nursing education texts used in Kenya).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Nursing Education','The learning domain concerned with acquisition of facts, concepts and principles is:','Affective','Cognitive','Evaluative','Psychomotor','B','Cognitive domain (Bloom''s taxonomy): acquisition of facts, concepts and principles.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;


-- Research methodology chapter contents
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Research & Statistics','Research Methodology','Information in the research methodology chapter includes:','Research design, study population, justification of study','Formulating hypothesis, sampling, study design','Study population, research design, analysis of data','Study population, research design, sampling','D','The research methodology chapter comprises: research design, study population and sampling procedure. Justification belongs in the introduction/problem statement (nursing research texts; Polit & Beck).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Research & Evidence-Based Practice','Research Methodology','Information in the research methodology chapter includes:','Research design, study population, justification of study','Formulating hypothesis, sampling, study design','Study population, research design, analysis of data','Study population, research design, sampling','D','Research methodology chapter: research design, study population and sampling (Polit & Beck; NCK nursing research curriculum).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Occupational health main objective
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Community Health Nursing','Occupational Health','The main objective of an occupational health programme is:','To prevent health problems due to normal working conditions','To promote and maintain the highest degree of health','To assist the injured and disabled for rehabilitation','To protect the workers from factors adverse to their health','B','WHO/ILO: the main objective of occupational health is to promote and maintain the highest degree of physical, mental and social well-being of workers in all occupations (community health/occupational health texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Occupational Health','The main objective of an occupational health programme is:','To prevent health problems due to normal working conditions','To promote and maintain the highest degree of health','To assist the injured and disabled for rehabilitation','To protect the workers from factors adverse to their health','B','WHO/ILO: occupational health promotes and maintains the highest degree of workers'' well-being (community health/occupational health).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Neuroleptics — dopamine blockers
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Antipsychotic Drugs','Neuroleptics are:','Minor tranquillisers with mild calming effects on neurotic patients','Major tranquillisers which block dopamine receptors producing calming effects','Mood stabilisers that elevate mood in a depressed patient','Antidepressants','B','Neuroleptics (antipsychotics) are major tranquillisers that block dopamine (D2) receptors, producing antipsychotic calming effects (BNF; Brunner & Suddarth; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Antipsychotic Drugs','Neuroleptics are:','Minor tranquillisers with mild calming effects on neurotic patients','Major tranquillisers which block dopamine receptors producing calming effects','Mood stabilisers that elevate mood in a depressed patient','Antidepressants','B','Neuroleptics are major tranquillisers blocking dopamine D2 receptors (BNF; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- GI decompression — NG tube
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper I','Surgical Nursing','Gastrointestinal Procedures','Gastrointestinal decompression involves:','Gastrostomy tube suction to remove abdominal content','Insertion of a tube in the ileocaecal valve','Insertion of a trocar in the abdominal cavity','Insertion of a nasogastric tube to remove gas and fluid','D','GI decompression is the insertion of a nasogastric (or intestinal) tube to remove accumulated gas and fluid from the GI tract, relieving distension (Brunner & Suddarth, Medical-Surgical Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Surgical Nursing','Gastrointestinal Procedures','Gastrointestinal decompression involves:','Gastrostomy tube suction to remove abdominal content','Insertion of a tube in the ileocaecal valve','Insertion of a trocar in the abdominal cavity','Insertion of a nasogastric tube to remove gas and fluid','D','GI decompression: insertion of NG/intestinal tube to remove gas and fluid (Brunner & Suddarth).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Benztropine for EPS from typical antipsychotics
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Antipsychotic Side Effects','A schizophrenic patient treated with haloperidol, loxapine and thiothixene develops extrapyramidal reactions. What should be tried?','Benztropine','Molindone','Clozapine','Trifluoperazine','A','Haloperidol, loxapine and thiothixene are typical antipsychotics causing EPS/dystonic reactions. Benztropine (anticholinergic) is used to treat acute EPS (Brunner & Suddarth; BNF; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Antipsychotic Side Effects','A schizophrenic patient treated with haloperidol, loxapine and thiothixene develops extrapyramidal reactions. What should be tried?','Benztropine','Molindone','Clozapine','Trifluoperazine','A','Typical antipsychotics cause EPS/dystonia; benztropine (anticholinergic) treats acute EPS (BNF; Stuart).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q32: Smooth client flow — directing patients (KRCHN Paper II / Health Systems & Management)
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Health Systems & Management','Health Facility Management','The following is a factor to ensure a smooth flow of clients in a health centre:','Soothing patients','Directing patients','Timely payments','Observing punctuality','B','Directing/guiding patients to the appropriate service points ensures orderly, smooth client flow within a health facility (nursing management texts; MOH Kenya health system guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Health Facility Management','The following is a factor to ensure a smooth flow of clients in a health centre:','Soothing patients','Directing patients','Timely payments','Observing punctuality','B','Directing/guiding patients to the appropriate service points ensures orderly, smooth client flow (nursing management texts; MOH Kenya health system guidelines).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── BScN Paper II 2021 Q33–Q40 (from NCK KRCHN April 2021 CBT — BScN section) ──

-- Q33: Non-projected teaching aids
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Nursing Management & Leadership','Teaching Methods','Non-projected teaching aids include:','Diagrams, videos, slides','Slides, videos, pictures','Flipcharts, slides, pictures','Real objects, handouts, pictures','D','Non-projected aids require no projection equipment — e.g. real objects, handouts and pictures; slides and videos are projected aids (nursing education/teaching methods, NCK curriculum).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q34: Mood-congruent psychotic features in depression
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Depressive Disorders','The following are mood-congruent psychotic features in a depressed patient:','Delusion of murder, erotomania, delusion of guilt','Delusion of guilt, delusion of poverty, erotomania','Delusion of guilt, delusion of poverty, delusion of grandiosity','Delusion of persecution, delusion of grandiosity, delusion of guilt','C','Mood-congruent psychotic features in depression carry depressive themes — delusions of guilt and poverty are congruent; grandiosity congruence is debated but option C groups the best depressive-theme cluster (DSM-5; Stuart Psychiatric Nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q35: Preoperative fear/anxiety → increased anaesthesia requirement
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Surgical Nursing','Perioperative Care','Preoperative fear and anxiety can lead to:','Reduced need for psychological support','Need for increased anaesthesia','Increased speed of recovery','Reduced need for postoperative pain management','B','Preoperative fear/anxiety raises catecholamines, increasing anaesthetic requirements; psychological support and analgesic needs are also increased, not reduced (Brunner & Suddarth, perioperative care).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q36: Diabetic control before conception — reduces congenital anomalies
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Diabetes in Pregnancy','Diabetic control is important before conception to reduce the incidence of:','Diabetic ketoacidosis','Congenital anomalies','Maternal nephropathy','Maternal retinopathy','B','Myles/MOH Kenya diabetes-in-pregnancy guidelines: optimal preconception glycaemic control reduces the incidence of fetal congenital anomalies linked to first-trimester hyperglycaemia.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q37: Purpose of emergency nursing assessment
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','Nursing Process','The purpose of emergency assessment is to:','Delegate nursing responsibility','Teach the client about his or her health','Make a diagnostic conclusion','Establish a database concerning the client','D','The assessment phase of the nursing process is to systematically collect and organise client data, establishing a database from which care is planned (standard nursing process texts; Brunner & Suddarth).','hard',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q38: Oligohydramnios associated with polycystic kidney
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Midwifery','Obstetric Complications','Oligohydramnios is associated with:','Hydrocephalus','Omphalocele','Sacral agenesis','Polycystic kidney','D','Myles Textbook for Midwives: oligohydramnios is associated with fetal renal anomalies such as polycystic/dysplastic kidneys and renal agenesis, which reduce fetal urine output.','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q39: Eustachian tube blockage — fluid in middle ear
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper I','Medical-Surgical Nursing','ENT Disorders','A patient with repeated colds has fluid accumulation in the middle ear due to blockage of the:','Utricle','Saccule','Eustachian tube','External ear','C','Blockage of the Eustachian tube prevents middle ear drainage/ventilation, causing fluid accumulation and otitis media with effusion (Brunner & Suddarth, ENT nursing).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- Q40: Behaviour-change approach to health promotion
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Community Health Nursing','Health Promotion','The approach to health promotion which aims to increase individuals'' knowledge about the link between behaviour and health is:','Behaviour change approach','Community development approach','Community-based approach','Biomedical approach','A','The behaviour-change approach focuses on increasing individual knowledge of the relationship between behaviour and health to promote attitude and habit change (Ewles & Simnett; Kenya community health nursing texts).','easy',2021,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;
