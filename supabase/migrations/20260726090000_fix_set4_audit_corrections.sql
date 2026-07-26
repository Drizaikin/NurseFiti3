-- Set 4 Audit Corrections (applied 2026-07-26)
-- Fixes: direct maternal mortality answer, polyhydramnios threshold, bipartite placenta answer
-- Removes: True/False, Match, List-essay and OSCE items from questions table

-- ── FIX 1: Direct maternal mortality ─────────────────────────────────────────
-- Malaria is an INDIRECT cause; corrected option_b to list all direct causes only
-- New correct answer: B (Eclampsia, haemorrhage, sepsis)

UPDATE questions
SET
  option_b = 'Eclampsia, haemorrhage, sepsis',
  option_c = 'Malaria, eclampsia, anemia',
  correct_option = 'B',
  rationale = 'Per Myles Textbook for Midwives (African edition), direct maternal deaths arise from obstetric complications of the pregnancy itself. The three classic direct causes are haemorrhage, eclampsia (hypertensive disorders of pregnancy) and puerperal sepsis. Option B (eclampsia, haemorrhage, sepsis) correctly lists all three unambiguous direct causes and is the only option free of indirect causes. Malaria, anaemia and cardiac disease are indirect causes — pre-existing conditions aggravated by pregnancy — and must not be listed as direct causes.'
WHERE stem = 'Direct cause of maternal mortality include:'
  AND cadre = 'BScN';

UPDATE questions
SET
  option_b = 'Eclampsia, haemorrhage, sepsis',
  option_c = 'Malaria, eclampsia, anemia',
  correct_option = 'B',
  rationale = 'Per Myles Textbook for Midwives (African edition), direct maternal deaths arise from obstetric complications of the pregnancy itself. The three classic direct causes are haemorrhage, eclampsia (hypertensive disorders of pregnancy) and puerperal sepsis. Option B (eclampsia, haemorrhage, sepsis) correctly lists all three unambiguous direct causes and is the only option free of indirect causes. Malaria, anaemia and cardiac disease are indirect causes — pre-existing conditions aggravated by pregnancy — and must not be listed as direct causes.'
WHERE stem = 'Direct cause of maternal mortality include:'
  AND cadre = 'KRCHN';

-- ── FIX 2: Polyhydramnios threshold ──────────────────────────────────────────
-- 1,500 ml is the upper limit of normal, NOT the diagnostic threshold.
-- Per Myles: polyhydramnios = > 2,000 ml (2 litres).

UPDATE questions
SET
  option_d = '2,000mls',
  rationale = 'Per Myles Textbook for Midwives (African edition), polyhydramnios is diagnosed when amniotic fluid volume exceeds 2,000 ml (2 litres) at term. Normal amniotic fluid at term is approximately 500–1,500 ml (average ~800–1,000 ml); 1,500 ml is the upper limit of normal, not the diagnostic threshold for polyhydramnios. Option D (2,000 mls) is the standard teaching cut-off per Myles. Modern obstetric practice also uses ultrasound criteria: AFI ≥ 24–25 cm or deepest vertical pocket ≥ 8 cm. Common causes: fetal congenital anomalies (oesophageal/duodenal atresia, anencephaly), maternal diabetes mellitus, multiple pregnancy, fetal anaemia (Rh isoimmunisation), idiopathic. Maternal/fetal complications include preterm labour, PROM, malpresentation, cord prolapse, placental abruption and postpartum haemorrhage from uterine overdistension.'
WHERE stem = 'In polyhydromnios, the quantity of amniotic fluid exceeds:'
  AND correct_option = 'D';

-- ── FIX 3: Bipartite placenta / succenturiate lobe ───────────────────────────
-- These cause retained placenta — NOT placenta praevia.

UPDATE questions
SET
  option_b = 'Retained placenta',
  rationale = 'Per Myles Textbook for Midwives, both bipartite placenta and succenturiate lobe placenta are abnormal morphological variants that increase the risk of retained placental tissue after delivery. A bipartite placenta is divided into two nearly equal lobes connected by blood vessels within the membranes — one lobe may remain in the uterus after delivery of the other. A succenturiate (accessory) lobe develops separately from the main placenta and is connected to it by fetal blood vessels running through the membranes; after the main placenta is delivered, the accessory lobe may be retained in the uterus, causing retained placenta and postpartum haemorrhage. Retained placenta (option B) is the correct answer. Placenta praevia is a site-of-implantation disorder unrelated to placental morphology; placental abruption (A), calcification (C) and insufficiency (D) are not caused by these structural variants.'
WHERE stem = 'Bipartite placenta and succenturiate lobe are causes of'
  AND cadre IN ('BScN', 'KRCHN');

-- ── REMOVE NON-MCQ FORMAT ITEMS ──────────────────────────────────────────────
-- True/False, Match, List-essay and OSCE items are not valid MCQs.

DELETE FROM questions WHERE stem = 'Zavanelli maneuver is a non-invasive technique commonly used to manage shoulder dystocia.';
DELETE FROM questions WHERE stem = 'Puerperal pyrexia is characterized by any episode of fever during the entire puerperium.';
DELETE FROM questions WHERE stem LIKE 'Indicate whether True(T) or False(F) Psychosocial adversities%';
DELETE FROM questions WHERE stem = 'Choanal atresia presents with noisy breathing';
DELETE FROM questions WHERE stem = 'Diaphragmatic hernia is associated with lungs underdevelopment.';
DELETE FROM questions WHERE stem = 'Causes of puerperal pyrexia is entirely obstetrical related';
DELETE FROM questions WHERE stem = 'Post-partum haemorrhage is a common outcome of shoulder dystocia due to difficult delivery.';
DELETE FROM questions WHERE stem LIKE 'Match the conditions in column A with their correct description in column B%';
DELETE FROM questions WHERE stem LIKE 'Match the following malpresentations with their respective engaging diameters%';
DELETE FROM questions WHERE stem = 'List two (2) effects of preeclampsia on each of the following systems';
DELETE FROM questions WHERE stem LIKE 'Mrs. Q Para 4+0 is in the second stage of labour with a diagnosis of breech presentation%';
