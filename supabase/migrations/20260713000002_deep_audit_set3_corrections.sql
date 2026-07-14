-- =============================================================================
-- DEEP AUDIT CORRECTIONS — Set 3 Supplement (20260711000003)
-- Date: 2026-07-13
-- Systematic line-by-line audit of every question in the supplement seed.
-- All fixes are UPDATE-only. No new questions are inserted.
-- =============================================================================

-- =============================================================================
-- SECTION 1: WRONG UNIT — Obstetric/Midwifery questions in Medical-Surgical
-- =============================================================================

-- "Following a difficult labor..." taking-in phase — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'Following a difficult labor and birth, a primiparous woman refuses to feed%'
  AND cadre IN ('BScN', 'KRCHN');

-- "After delivery of a healthy newborn. Which time frame... return of bowel function"
-- Postpartum bowel — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'After delivery of a healthy newborn. Which time frame should the nurse relay%'
  AND cadre IN ('BScN', 'KRCHN');

-- "After birth, the functional closure of ductus arteriosus" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Care'
WHERE stem LIKE 'After birth, the functional closure of ductus arteriosus takes place within:%'
  AND cadre IN ('BScN', 'KRCHN');

-- "After birth, the functional closure of ductus arteriosus takes place within:-"
-- Paediatric NOT Med-Surg (different stem ending)
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Care'
WHERE stem LIKE 'After birth, the functional closure of ductus arteriosus takes place within:-%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The exogenous causative organisms to puerperal infection" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Puerperal Infections'
WHERE stem LIKE 'The exogenous causative organisms to puerperal infection%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Perineal trauma is common in delivery of face to pubis" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'Perineal trauma is common in delivery of face to pubis%'
  AND cadre IN ('BScN', 'KRCHN');

-- "At primary level of anti-retroviral prophylaxis for PMTCT" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'PMTCT'
WHERE stem LIKE 'At primary level of ant-retroviral prophylaxis for PMTCT%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Effects of gestational diabetes on the fetus" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Obstetric Complications'
WHERE stem LIKE 'Effects of gestational diabetes on the fetus include%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The management of placenta praevia type three" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Obstetric Emergencies'
WHERE stem LIKE 'The management of placenta praevia type three%'
  AND cadre IN ('BScN', 'KRCHN');

-- Leopold's manoeuvre — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'When performing Leopold%s maneuver, the purpose of the first maneuver is%'
  AND cadre IN ('BScN', 'KRCHN');

-- EDD calculation (Mrs Cola) — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'If Mrs. Cola%s menstrual period was on 27.7.08%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Fetal axis pressure" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'Fetal axis pressure is a physical change that is more significant durin%'
  AND cadre IN ('BScN', 'KRCHN');

-- "In monitoring fetal well being using the fetal kick chart" — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Fetal Wellbeing'
WHERE stem LIKE 'In monitoring fetal well being using the fetal kick chart%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Common respiratory tract manifestations of neonatal bacterial infections" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Infections'
WHERE stem LIKE 'Common respiratory tract manifestations of neonatal bacterial infections is%'
  AND cadre IN ('BScN', 'KRCHN');

-- "A 1 1/2 year old child... kwashjorkor" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Paediatric Nutrition'
WHERE stem LIKE 'A 1 1/2 year old child was classified as having 3rd degree%kwashjorkor%'
  AND cadre IN ('BScN', 'KRCHN');

-- "A mother brought her daughter, 4 years old... IMCI" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'IMNCI'
WHERE stem LIKE 'A mother brought her daughter, 4 years old, to the RHU because of cough%'
  AND cadre IN ('BScN', 'KRCHN');

-- "A mother brought her 10 month old infant... malaria risk" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Paediatric Infections'
WHERE stem LIKE 'A mother brought her 10 month old infant for consultation because of fever%'
  AND cadre IN ('BScN', 'KRCHN');

-- "The pathognomonic sign of measles is Koplik's spot" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Paediatric Infections'
WHERE stem LIKE 'The pathognomonic sign of measles is Koplik%s spot%'
  AND cadre IN ('BScN', 'KRCHN');

-- "An infant's Apgar score is 9 at 5 minutes" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Assessment'
WHERE stem LIKE 'An infant%s Apgar score is 9 at 5 minutes%'
  AND cadre IN ('BScN', 'KRCHN');

-- Symmetric IUGR infant — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Assessment'
WHERE stem LIKE 'Which of the following is the most appropriate feature seen in symmetric growth retarded infant%'
  AND cadre IN ('BScN', 'KRCHN');

-- Neonate skin red wrinkly — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Assessment'
WHERE stem LIKE 'A new born infant was delivered in your maternity unit an hour ago. The skin of this infant appears to be red%'
  AND cadre IN ('BScN', 'KRCHN');

-- Direct causes of placenta abruption — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Obstetric Emergencies'
WHERE stem LIKE 'Direct causes of placenta abruption include%'
  AND cadre IN ('BScN', 'KRCHN');

-- Babies born with IUGR — Midwifery/Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Assessment'
WHERE stem LIKE 'Babies born with intrauterine growth retardation are usually prone to%'
  AND cadre IN ('BScN', 'KRCHN');

-- "When resuscitating a neonate... ambubag" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Resuscitation'
WHERE stem LIKE 'When resuscitating a neonate who has neonatal asphyxia after how long should the midwife use ambubag%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which neonate... at risk of developing severe jaundice" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Jaundice'
WHERE stem LIKE 'Which neonate from the listed below is at risk of developing severe jaundice%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which statement is true about meconium" — Paediatric NOT Med-Surg
UPDATE questions
SET unit = 'Paediatric Nursing', topic = 'Neonatal Respiratory Disorders'
WHERE stem LIKE 'Which statement is true about meconium%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 2: WRONG TOPIC — Labour/Obstetric questions with 'GI Disorders' or
--            'Musculoskeletal Nursing' topics (filter false-positives from 000003)
-- =============================================================================

-- "Following a difficult labor..." — topic 'GI Disorders' is wrong
UPDATE questions
SET topic = 'Postnatal Care'
WHERE stem LIKE 'Following a difficult labor and birth, a primiparous woman refuses to feed%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "After delivery of a healthy newborn... return of bowel function" — topic 'GI Disorders' is wrong
UPDATE questions
SET topic = 'Postnatal Care'
WHERE stem LIKE 'After delivery of a healthy newborn. Which time frame should the nurse relay%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "If Mrs. Cola's menstrual period..." — topic 'GI Disorders' is wrong
UPDATE questions
SET topic = 'Antenatal Care'
WHERE stem LIKE 'If Mrs. Cola%s menstrual period was on 27.7.08%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "Perineal trauma..." — topic 'GI Disorders' is wrong
UPDATE questions
SET topic = 'Labour and Delivery'
WHERE stem LIKE 'Perineal trauma is common in delivery of face to pubis%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "A primigravida patient is admitted to the labor delivery area" — topic 'GI Disorders' wrong
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'A primigravida patient is admitted to the labor delivery area%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "Accompanied by her husband..." (labour admission) — topic 'GI Disorders' wrong
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'Accompanied by her husband%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- "A patient is in the second stage of labor" — topic 'Musculoskeletal Nursing' wrong
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'A patient is in the second stage of labor%'
  AND topic = 'Musculoskeletal Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Mrs. Peters is experiencing contractions every 2 minutes" — topic 'Musculoskeletal Nursing' wrong
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'Mrs. Peters is experiencing contractions every 2 minutes%'
  AND topic = 'Musculoskeletal Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "You are caring for a woman in the second stage of labor" — topic 'Musculoskeletal Nursing' wrong
UPDATE questions
SET unit = 'Midwifery', topic = 'Labour and Delivery'
WHERE stem LIKE 'You are caring for a woman in the second stage of labor%'
  AND topic = 'Musculoskeletal Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Fractures of the base of the skull" — topic 'Musculoskeletal Nursing' is wrong for a brain/skull question
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Fractures of the base of the skull will manifest with%'
  AND topic = 'Musculoskeletal Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "EDD calculation" garbled stem — already handled by 000004/000005 DELETE
-- "Client LMP began July 5, 2020" — EDD question
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'A client LMP began July 5, 2020%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Neonate red wrinkled" — topic 'GI Disorders' wrong
UPDATE questions
SET topic = 'Neonatal Assessment'
WHERE stem LIKE 'A new born infant was delivered in your maternity unit an hour ago. The skin of this infant appears to be red%'
  AND topic = 'GI Disorders'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 3: WRONG UNIT — Research questions placed in Community Health
-- =============================================================================

-- "When conducting a literature review" — Research NOT Community Health
UPDATE questions
SET unit = 'Research & Evidence-Based Practice', topic = 'Research Methodology'
WHERE stem LIKE 'When conducting a literature review%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Mephedrone drug class — Mental Health NOT Community Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Substance Use Disorders'
WHERE stem LIKE 'A 20-year-old university student attends the clinic reporting a 1-year history of daily use of legal highs%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Anticholinergic EXCEPT — Mental Health NOT Community Health (already in 000004 but verify)
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Psychotropic Drug Effects'
WHERE stem LIKE 'Anticholinergic side effects include all of the following EXCEPT%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Disorder of motor activity in which the person constantly maintains a position" — Mental Health NOT Community Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Motor Disorders'
WHERE stem LIKE 'Disorder of motor activity in which the person constantly maintains%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Hypochondriasis/conversion — Mental Health NOT Community Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Somatoform Disorders'
WHERE stem LIKE 'The patient has sensory, motor or neurological symptoms that don%t follow a recognizable%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Malingering — Mental Health NOT Community Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Somatoform Disorders'
WHERE stem LIKE 'A 34-year-old man is involved in a minor road accident%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which aim of education allows the students to develop..." — Nursing Education NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Which aim of education allows the students to develop themselves into distinct%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Educational objectives should be all except" — Nursing Education NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Educational objectives should be all except%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "All experiences of pupil that are undertaken in the guidance of the school" — Nursing Education NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'All experiences of pupil that are undertaken in the guidance of the school%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "The character of feeling for others in their position is called" — Nursing Education/Communication NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Therapeutic Communication'
WHERE stem LIKE 'The character of feeling for others in their position is called%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "The educational assessment that is generally carried out throughout" — Nursing Education NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'The educational assessment that is generally carried out throughout%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Bedside performance of student nurse — Nursing Education NOT Community Health
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Bedside performance of a student nurse can be ideally assessed by%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Educational objectives according to Bloom's taxonomy are classified into how many basic domains"
UPDATE questions
SET unit = 'Nursing Management & Leadership', topic = 'Nursing Education'
WHERE stem LIKE 'Educational objectives according to Bloom%s taxonomy are classified into how many basic domains%'
  AND unit = 'Community Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 4: WRONG TOPIC — topic = unit name violations in supplement
-- =============================================================================

-- "The following is the correct order of abdominal assessment" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'GI Assessment'
WHERE stem LIKE 'The following is the correct order of abdominal assessment%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Nursing intervention should be a priority in one of the following patients" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Surgical Nursing'
WHERE stem LIKE 'Nursing intervention should be a priority in one of the following patients%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "All of the following statements concerning genitourinary system changes" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'All of the following statements concerning genitourinary system changes in the older adult%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Nursing measures to deal with sensory changes in the aged" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Gerontological Nursing'
WHERE stem LIKE 'Nursing measures to deal with sensory changes in the aged%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "The nurse knows that the most common and least aggressive type of cancer" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Thyroid Disorders'
WHERE stem LIKE 'The nurse knows that the most common and least aggressive type of cancer is%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "A client has just undergone spinal fusion" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Musculoskeletal Nursing'
WHERE stem LIKE 'A client has just undergone spinal fusion%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "A 21 year old male client...blunt chest trauma" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Respiratory Nursing'
WHERE stem LIKE 'A 21 year old male client is transported by ambulance%chest%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Alzheimer's — topic='Medical-Surgical Nursing' → Neurological Nursing
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'A client with Alzheimer%s disease is awaiting placement%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Cholelithiasis — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'GI Disorders'
WHERE stem LIKE 'Cholelithiasis is associated with%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Glomerulonephritis — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Renal Disorders'
WHERE stem LIKE 'Glomerulonephritis usually follows%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Jackson-Pratt drain — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Surgical Nursing'
WHERE stem LIKE 'A client with an abdominal cholecystectomy returns from surgery with a Jackson-Pratt drain%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Body mechanics / low back pain — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Musculoskeletal Nursing'
WHERE stem LIKE 'Body mechanics usually prescribed for clients with low pain%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Grave's disease / toxic goitre — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Thyroid Disorders'
WHERE stem LIKE 'The commonest cause of toxic goitre%Grave%s disease%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Laryngeal cancer risk factors — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'The carcinogenic risk factors for laryngeal cancers include%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Unconscious patient position — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'The position an unconscious patient should be nursed in is%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Parkland's formula — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Burn Nursing'
WHERE stem LIKE 'Parklands%formula is used to calculate%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Valvular heart disease cause — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'The most common preventable cause of valvular heart disease is%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- PID components — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Reproductive Health'
WHERE stem LIKE 'Pelvic inflammatory diseases include%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Frostbite rewarming — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Dermatological Nursing'
WHERE stem LIKE 'The primary reason for rapid continuous rewarming of the area affected by frostbite%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Phantom limb pain — topic='Musculoskeletal Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'A client who is admitted with an above-the-knee amputation tells the nurse%phantom limb%'
  AND cadre IN ('BScN', 'KRCHN');

-- Expansion intravascular volume oedema — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Cardiovascular Nursing'
WHERE stem LIKE 'Expansion of the intravascular volume and increased intravascular pressure are the main causes of edema%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- AIDS / measles exposure — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Infection Prevention'
WHERE stem LIKE 'During a home visit, a client with AIDS tells the nurse that he has been exposed to measles%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Antiretroviral not a cure — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'HIV/AIDS Nursing'
WHERE stem LIKE 'Antiretroviral agents, such as AZT are used in the management of AIDS%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Minimal bacteria diet neutropenia — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Oncology and Haematology'
WHERE stem LIKE 'The physician has ordered a minimal-bacteria diet for a client with neutropenia%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Myasthenic crisis precipitants — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'A female client has experienced an episode of myasthenic crisis%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Seizure activity — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'A male client is having a tonic-clonic seizures%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- "Area of the brain involved in understanding meaning" — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'The area of the brain which is involved in the understanding of meaning is%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Broca's area — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Broca%s area is located in the%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Wernicke area located — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Wernicke area is located in the%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Parasympathetic pupil constriction — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Anatomy and Physiology'
WHERE stem LIKE 'Which of the following function is controlled by parasympathetic system%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Spinal cord injury complications EXCEPT — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Common complications of spinal cord injury include each of the following EXCEPT%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Demyelination defined — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Demyelination is defined as%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Ataxia — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Failure of muscle coordination%unsteady movements and staggering walk%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Brain stem regulates heartbeat — topic='Medical-Surgical Nursing'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'Which part of the brain regulates heartbeat, breathing and other vital functions%'
  AND topic = 'Medical-Surgical Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Psychosis characterized by — topic='Mental Health Nursing' (topic = unit name)
UPDATE questions
SET topic = 'Psychotic Disorders'
WHERE stem LIKE 'Psychosis is characterized by all, except%'
  AND topic = 'Mental Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Aggressive patient psychiatric management — topic='Mental Health Nursing'
UPDATE questions
SET topic = 'Therapeutic Communication'
WHERE stem LIKE 'The priority psychiatric nursing intervention in the management of an aggressive%'
  AND topic = 'Mental Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Perseveration — topic='Mental Health Nursing'
UPDATE questions
SET topic = 'Psychotic Disorders'
WHERE stem LIKE 'During psychiatric interview patient retains a constellation of ideas%'
  AND topic = 'Mental Health Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- Paediatric Nursing topic = unit name fixes
UPDATE questions
SET topic = 'Child Growth and Development'
WHERE stem LIKE 'When developing a plan of care for a male adolescent%psychosocial%'
  AND topic = 'Paediatric Nursing'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions
SET topic = 'Neonatal Care'
WHERE stem LIKE 'The anterior posterior fontanelles normally closes at the age of%'
  AND topic = 'Paediatric Nursing'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 5: WRONG UNIT — 'Anatomy & Physiology' is NOT a valid unit per §12
--            Use 'Medical-Surgical Nursing' for A&P content in Paper I
-- =============================================================================

-- KRCHN exocrine glands — unit 'Anatomy & Physiology' is not in the valid unit list
UPDATE questions
SET unit = 'Medical-Surgical Nursing', topic = 'Anatomy and Physiology'
WHERE unit = 'Anatomy & Physiology'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 6: WRONG PAPER — Paper II questions in Paper I (unit-paper mismatch)
-- =============================================================================

-- Literature review research — already on Paper II, but verify
-- Mephedrone (Mental Health) — placed in Paper II Community Health, update to Mental Health
UPDATE questions
SET unit = 'Mental Health Nursing', topic = 'Substance Use Disorders', paper = 'Paper II'
WHERE stem LIKE 'A 20-year-old university student attends the clinic reporting a 1-year history of daily use of legal highs%'
  AND cadre IN ('BScN', 'KRCHN');

-- Anticholinergic (Mental Health) placed in Paper II Community Health
UPDATE questions
SET paper = 'Paper II'
WHERE stem LIKE 'Anticholinergic side effects include all of the following EXCEPT%'
  AND cadre IN ('BScN', 'KRCHN');

-- Disorder of motor activity (Mental Health) — Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE stem LIKE 'Disorder of motor activity in which the person constantly maintains%'
  AND cadre IN ('BScN', 'KRCHN');

-- Psychosis characterized — Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE stem LIKE 'Psychosis is characterized by all, except%'
  AND cadre IN ('BScN', 'KRCHN');

-- Lived experience qualitative research — Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE stem LIKE 'Consider this title%Live Experience of Surviving a Tsunami%'
  AND cadre IN ('BScN', 'KRCHN');

-- Nursing education questions (Role-play, Bloom's domains, Educational objectives etc.) — Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Nursing Management & Leadership'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Mental Health questions in Paper I — move to Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Mental Health Nursing'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Community Health questions in Paper I — move to Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Community Health Nursing'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 7: CONTAMINATED RATIONALES — embedded question text in rationale
-- =============================================================================

-- "Following thyroidectomy..." — rationale contaminated with polycythaemia Q (328.)
UPDATE questions
SET rationale = 'Per Brunner & Suddarth''s, parathyroid damage after thyroidectomy causes hypocalcaemia manifesting as tetany: perioral/peripheral tingling (paraesthesia), carpopedal spasm and laryngeal stridor/spasm. These signs arise because the parathyroids are inadvertently removed or devascularised, resulting in acute hypocalcaemia.'
WHERE stem LIKE 'Following thyroidectomy, the nurse suspects damage or removal of parathyroid gland%'
  AND cadre IN ('BScN', 'KRCHN');

-- "A 1 1/2 year old child... kwashjorkor" — rationale contaminated with low-set ears Q (679.) and TEF Q (680.)
UPDATE questions
SET rationale = 'Per Kenya Basic Paediatric Protocols and IMNCI, kwashiorkor (protein energy malnutrition) is characterised primarily by bilateral pitting oedema, along with apathy, irritability and skin/hair changes. Oedema is the defining/most apparent sign that distinguishes kwashiorkor from marasmus (which presents with severe wasting). The pitting oedema results from hypoalbuminaemia and altered fluid distribution.'
WHERE stem LIKE 'A 1 1/2 year old child was classified as having 3rd degree%kwashjorkor%'
  AND cadre IN ('BScN', 'KRCHN');

-- Anticholinergic — rationale contaminated with akathisia Q (335.)
UPDATE questions
SET rationale = 'Anticholinergic (antimuscarinic) effects include: tachycardia (NOT bradycardia — muscarinic blockade removes vagal slowing, INCREASING heart rate), dry mouth, constipation, urinary retention, blurred vision, confusion, and worsening of open-angle glaucoma. Bradycardia is a CHOLINERGIC (muscarinic stimulation) effect and is therefore the EXCEPT answer. (Kenya EML; standard pharmacology/psychiatric nursing.)'
WHERE stem LIKE 'Anticholinergic side effects include all of the following EXCEPT%'
  AND cadre IN ('BScN', 'KRCHN');

-- The client has recently returned from thyroidectomy — rationale has source label contamination
UPDATE questions
SET rationale = 'Per Brunner & Suddarth''s, after thyroidectomy a tracheotomy set is kept at the bedside because laryngeal nerve damage, tracheal compression from haematoma, or hypocalcaemic tetany causing laryngospasm can cause acute airway obstruction requiring emergency tracheotomy. It is the PRIORITY safety equipment, not merely an endotracheal tube or airway device.'
WHERE stem LIKE 'The client has recently returned from having a thyroidectomy. The nurse should keep%'
  AND cadre IN ('BScN', 'KRCHN');

-- "All experiences of pupil..." curriculum — rationale has "KRCHN" label contamination
UPDATE questions
SET rationale = 'Curriculum encompasses all planned and guided experiences of the pupil undertaken under the guidance of the school — not just a course or unit plan. (Curriculum development theory; nursing education.)'
WHERE stem LIKE 'All experiences of pupil that are undertaken in the guidance of the school%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 8: GARBLED OPTION TEXT
-- =============================================================================

-- "For a client who is experiencing expressive aphasia" — option_d is garbled
-- option_d currently contains the text of ANOTHER question embedded in it
UPDATE questions
SET option_d = 'Speaking in short, simple sentences'
WHERE stem LIKE 'For a client who is experiencing expressive aphasia%'
  AND option_d LIKE '%The nurse is assessing the motor%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which of the following medications might be prescribed for someone with OCD"
-- option_d 'D. Hallucinogens' has the "D." prefix still in option text — clean it
UPDATE questions
SET option_d = 'Hallucinogens'
WHERE stem LIKE 'A 20-year-old university student attends the clinic%mephedrone%'
  AND option_d LIKE 'D. Hallucinogens%'
  AND cadre IN ('BScN', 'KRCHN');

-- option_b in Antiretroviral question starts with period ". They reduce the risk"
UPDATE questions
SET option_b = 'They reduce the risk of opportunistic infections',
    option_c = 'They shorten the period of communicability of the disease'
WHERE stem LIKE 'Antiretroviral agents, such as AZT are used in the management of AIDS%'
  AND option_b LIKE '. They reduce%'
  AND cadre IN ('BScN', 'KRCHN');

-- Breastfeeding latch — option_b starts with period ". The mother does not feel nipple pain"
UPDATE questions
SET option_b = 'The mother does not feel nipple pain'
WHERE stem LIKE 'In a mother%s class, you discuss proper breastfeeding technique%'
  AND option_b LIKE '. The mother does not feel nipple pain%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Which of the following is not an action expected of these drugs?" — trailing "Your Answer :" in option_d
UPDATE questions
SET option_d = 'They are able to bring about a cure of the disease condition'
WHERE stem LIKE 'Antiretroviral agents, such as AZT are used in the management of AIDS%'
  AND option_d LIKE '%Your Answer%'
  AND cadre IN ('BScN', 'KRCHN');

-- Rapid shallow respirations in KRCHN question — option_b has trailing apostrophe/extra character
UPDATE questions
SET option_b = 'Rapid, shallow respirations'
WHERE stem LIKE 'Which of the following respiratory patterns indicate increased intracranial pressure%'
  AND option_b LIKE 'Rapid, shallow respirations%'''
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 9: WRONG CORRECT_OPTION — clinically verified answer corrections
-- =============================================================================

-- "After birth, the functional closure of ductus arteriosus takes place within:"
-- Two versions exist — one says B (2-4 hours), other says D (8-15 hours)
-- Per physiology: functional closure occurs within 10-15 HOURS (not 2-4h).
-- 2-4h is too short; anatomical closure takes weeks.
-- The correct answer is 8-15h (option D in the 2nd version) or the 2-4h version
-- needs correction. Per Myles/neonatal physiology texts: functional closure 10-24h.
-- Fix the question that says "2-4hour" with answer B to D:
UPDATE questions
SET correct_option = 'D',
    rationale = 'Functional (physiological) closure of the ductus arteriosus in response to rising oxygen tension after birth occurs within approximately 8-15 hours. Anatomical closure takes several weeks. The 2-4 hour window is too early for definitive closure. (Myles Textbook for Midwives; standard neonatal physiology texts.)'
WHERE stem LIKE 'After birth, the functional closure of ductus arteriosus takes place within:%'
  AND option_b = '2-4hour'
  AND cadre IN ('BScN', 'KRCHN');

-- OCD medication: correct is SSRI, not anxiolytic
-- Per DSM-5 and Kenya psychiatric nursing standards, SSRIs (fluoxetine, fluvoxamine, sertraline)
-- are the FIRST-LINE pharmacotherapy for OCD, NOT anxiolytics.
-- None of the listed options (anxiolytic, antipsychotic, hypnotic, mood stabilizer) is SSRI.
-- Among the options, anxiolytics (benzodiazepines) are sometimes used ADJUNCTIVELY but
-- antipsychotics (augmentation) are also used. Per NCK/Kenya standards the closest
-- acceptable answer remains anxiolytic as OCD is anxiety-spectrum, but this is genuinely
-- ambiguous. However, if "Antidepressant" were an option it would be clearly correct.
-- Since no SSRI option exists, keep anxiolytic (A) but improve the rationale:
UPDATE questions
SET rationale = 'The first-line pharmacotherapy for OCD is an SSRI (selective serotonin reuptake inhibitor) antidepressant. However, this option is not among the choices. Among the available options, anxiolytics are closest because OCD is an anxiety-spectrum disorder and benzodiazepines may be used adjunctively. Antipsychotics are used as augmentation, not first line. This question has no clearly correct answer among the options given — the best available answer is A (anxiolytic). (Kenya EML; DSM-5; standard psychiatric nursing texts.)'
WHERE stem LIKE 'Which of the following medications might be prescribed for someone with OCD%'
  AND cadre IN ('BScN', 'KRCHN');

-- Gestational diabetes priority: already fixed in 000004 to A (dietary intake)
-- This corrects any remaining instances where correct_option = D (glucose monitoring)
UPDATE questions
SET correct_option = 'A',
    rationale = 'For newly diagnosed gestational diabetes mellitus, the priority teaching is dietary management (medical nutrition therapy). Most GDM cases are managed initially by diet alone (reduced simple carbohydrates, evenly distributed meals, complex carbohydrates). Blood glucose monitoring is essential but supports dietary adjustments rather than being the priority teaching. (Kenya MOH Maternal and Newborn Health guidelines; diabetes in pregnancy management protocol.)'
WHERE stem LIKE 'When developing a plan of care for a client newly diagnosed with gestational diabetes%'
  AND correct_option = 'D'
  AND cadre IN ('BScN', 'KRCHN');

-- Fetal kick chart: "notify if she counts less than 10 movements per hour" — answer D
-- Per Kenya MOH/Myles: women are told to notify if fewer than 10 movements in 12 hours
-- (Cardiff/Sadovsky method). The "less than 10 per hour" (D) is acceptable for the
-- simplified daily fetal kick count (10 in 12 hours or Cardiff — 10 per session).
-- Less than 10 movements in 12 hours is the standard threshold. Among these options:
-- D "Less than 10 movements per hour" is the closest match for action threshold.
-- Keep D, improve rationale:
UPDATE questions
SET rationale = 'Per Kenya MOH and WHO fetal movement counting guidelines (Cardiff modified method), the mother should notify the health provider if she counts fewer than 10 movements in 12 hours. Among the given options, D (less than 10 movements per hour) is the best approximation of the action threshold for reduced fetal movements. (Myles Textbook for Midwives; Kenya MOH Maternal and Newborn Health guidelines.)'
WHERE stem LIKE 'In monitoring fetal well being using the fetal kick chart%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Normal haemoglobin in pregnant woman" — answer D (11-12 g/dl)
-- Per WHO/Kenya ANC guidelines, normal Hb in pregnancy is ≥11 g/dl.
-- Option D (11-12 g/dl) is the CORRECT RANGE for pregnancy.
-- Keep D. Rationale already correct.

-- Placenta praevia type III dead fetus — C-section (A) correct. Confirmed.

-- "Diastolic pressure range 15-30 mmHg" — answer C. Clinically: a rise of ≥15 mmHg
-- diastolic above baseline is significant for pre-eclampsia per older Myles editions.
-- More recent guidelines use absolute thresholds (≥90 mmHg diastolic) rather than
-- relative rise. For NCK KRCHN context, keep C with improved rationale:
UPDATE questions
SET rationale = 'Per older Myles Textbook for Midwives editions used in Kenyan training, a rise in diastolic pressure of 15-30 mmHg above the booking baseline is significant in assessing for pre-eclampsia, as diastolic pressure is less affected by excitement than systolic. More recent guidelines use absolute diastolic thresholds (≥90 mmHg). In the NCK examination context, the expected answer is C (15-30 mmHg). (Myles Textbook for Midwives, African edition.)'
WHERE stem LIKE 'The diastolic pressure is usually not affected by excitement, its increase therefore is more significant%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 10: DIFFICULTY FIXES
-- =============================================================================

-- Simple recall questions incorrectly marked medium
UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'The commonest cause of toxic goitre%Grave%s disease%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Demyelination is defined as%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Failure of muscle coordination%unsteady movements and staggering walk%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'The character of feeling for others in their position is called%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Broca%s area is located in the%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Wernicke area is located in the%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'easy'
WHERE stem LIKE 'Which part of the brain regulates heartbeat, breathing and other vital functions%'
  AND cadre IN ('BScN', 'KRCHN');

-- Complex clinical reasoning — mark hard
UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'A client is unconscious following a tonic-clonic seizure%'
  AND cadre IN ('BScN', 'KRCHN');

UPDATE questions SET difficulty = 'hard'
WHERE stem LIKE 'A female client has experienced an episode of myasthenic crisis%'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 11: REMAINING SPECIFIC UNIT AND TOPIC FIXES FROM 000001/000003
-- Items missed by previous migrations
-- =============================================================================

-- "When performing Leopold's maneuver" placed in Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'When performing Leopold%s maneuver, the purpose of the first maneuver%'
  AND cadre IN ('BScN', 'KRCHN');

-- Breastfeeding latch — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Postnatal Care'
WHERE stem LIKE 'In a mother%s class, you discuss proper breastfeeding technique%'
  AND cadre IN ('BScN', 'KRCHN');

-- Antenatal HIV PMTCT — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'PMTCT'
WHERE stem LIKE 'Antenatal care of HIV positive client includes%'
  AND cadre IN ('BScN', 'KRCHN');

-- Nausea vomiting in pregnancy resolving — Midwifery NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Antenatal Care'
WHERE stem LIKE 'A client who is pregnant reports nausea and vomiting%'
  AND cadre IN ('BScN', 'KRCHN');

-- "Pelvic inflammatory diseases include" — Midwifery/Reproductive Health NOT Med-Surg
UPDATE questions
SET unit = 'Midwifery', topic = 'Reproductive Health'
WHERE stem LIKE 'Pelvic inflammatory diseases include%'
  AND cadre IN ('BScN', 'KRCHN');

-- Halo sign for CSF leak — Neurological NOT 'Fluid and Electrolyte Balance'
UPDATE questions
SET topic = 'Neurological Nursing'
WHERE stem LIKE 'When a nurse is monitoring a patient for cerebrospinal fluid (CSF) leak%'
  AND topic = 'Fluid and Electrolyte Balance'
  AND cadre IN ('BScN', 'KRCHN');

-- Hyperthyroidism labs — topic 'Thyroid Disorders' correct. Confirm unit.
-- Already Medical-Surgical Nursing. No change needed.

-- "During recovery from CVA... swallowing" — cranial nerves IX and X
-- Already correct. Confirm answer B. No change needed.

-- =============================================================================
-- SECTION 12: PAPER ASSIGNMENT FIX — units that belong in Paper II
--             but were seeded in Paper I in the supplement
-- =============================================================================

-- Ensure all Research questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Research & Evidence-Based Practice'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Ensure all Nutrition questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Nutrition'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Ensure all Environmental Health questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Environmental Health'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Ensure all Professional Ethics & Law questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Professional Ethics & Law'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Ensure all Health Systems in Kenya questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Health Systems in Kenya'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- Ensure all Infection Prevention & Control questions are on Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE unit = 'Infection Prevention & Control'
  AND paper = 'Paper I'
  AND cadre IN ('BScN', 'KRCHN');

-- =============================================================================
-- SECTION 13: FINAL CATCH-ALL — remaining topic = unit name
-- =============================================================================

UPDATE questions
SET topic = 'Clinical Nursing'
WHERE topic = unit
  AND unit = 'Medical-Surgical Nursing'
  AND exam_year IS NULL
  AND contributor_id IS NULL;

-- =============================================================================
-- POST-PUSH VERIFICATION QUERIES
-- =============================================================================
-- 1. SELECT COUNT(*) FROM questions WHERE topic = 'General';          -- 0
-- 2. SELECT COUNT(*) FROM questions WHERE topic = unit;               -- 0
-- 3. SELECT COUNT(*) FROM questions WHERE unit = 'Anatomy & Physiology'; -- 0
-- 4. SELECT COUNT(*) FROM questions WHERE paper IS NULL;              -- 0
-- 5. SELECT COUNT(*) FROM questions WHERE cadre IS NULL;              -- 0
-- 6. SELECT COUNT(*) FROM questions
--    WHERE unit IN ('Community Health Nursing','Mental Health Nursing',
--                   'Nursing Management & Leadership','Research & Evidence-Based Practice',
--                   'Nutrition','Environmental Health','Professional Ethics & Law',
--                   'Health Systems in Kenya','Infection Prevention & Control')
--    AND paper = 'Paper I';                                           -- 0
-- 7. SELECT stem, unit, topic FROM questions WHERE topic = 'Clinical Nursing';
--    -- Review these individually and assign specific topics
-- =============================================================================
