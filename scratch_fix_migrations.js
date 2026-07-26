'use strict';
const fs = require('fs');

const MIGRATIONS = 'c:/Users/User/Desktop/NurseFiti/NurseFiti3/supabase/migrations';

// ─── FIX 1: Direct maternal mortality — fix option_b and correct_option ───────
// OLD option_b: 'Eclampsia, hemorrhage, anemia'  (anaemia is an INDIRECT cause)
// NEW option_b: 'Eclampsia, haemorrhage, sepsis' (all 3 are DIRECT causes)
// OLD answer: C (malaria, eclampsia, sepsis — malaria is INDIRECT)
// NEW answer: B (eclampsia, haemorrhage, sepsis — all direct)

const FIX1_RATIONALE = `Per Myles Textbook for Midwives (African edition), direct maternal deaths arise from obstetric complications of the pregnancy itself. The three classic direct causes are haemorrhage, eclampsia (hypertensive disorders of pregnancy) and puerperal sepsis. Option B (eclampsia, haemorrhage, sepsis) correctly lists all three unambiguous direct causes and is the only option free of indirect causes. Malaria, anaemia and cardiac disease are indirect causes — pre-existing conditions aggravated by pregnancy — and must not be listed as direct causes.`;

// BScN version (batch1)
const FIX1_BSCN_FROM = `VALUES ('Direct cause of maternal mortality include:', 'Hemorrhage, Malaria, anemia', 'Eclampsia, hemorrhage, anemia', 'Malaria, eclampsia, sepsis', 'Anemia, cardiac disease, hemorrhage', 'C', 'Per Myles Textbook for Midwives, direct maternal deaths result from obstetric complications of pregnancy itself, classically haemorrhage, eclampsia (hypertensive disorders) and puerperal sepsis. Option C (malaria, eclampsia, sepsis) contains two unambiguous direct causes, whereas option B pairs eclampsia/haemorrhage with anaemia (indirect) and other options include anaemia, malaria and cardiac disease which are indirect causes.', 'BScN'`;
const FIX1_BSCN_TO   = `VALUES ('Direct cause of maternal mortality include:', 'Hemorrhage, Malaria, anemia', 'Eclampsia, haemorrhage, sepsis', 'Malaria, eclampsia, anemia', 'Anemia, cardiac disease, hemorrhage', 'B', '${FIX1_RATIONALE}', 'BScN'`;

// KRCHN version (batch3)
const FIX1_KRCHN_FROM = `VALUES ('Direct cause of maternal mortality include:', 'Hemorrhage, Malaria, anemia', 'Eclampsia, hemorrhage, anemia', 'Malaria, eclampsia, sepsis', 'Anemia, cardiac disease, hemorrhage', 'C', 'Per Myles Textbook for Midwives, direct maternal deaths result from obstetric complications of pregnancy itself, classically haemorrhage, eclampsia (hypertensive disorders) and puerperal sepsis. Option C (malaria, eclampsia, sepsis) contains two unambiguous direct causes, whereas option B pairs eclampsia/haemorrhage with anaemia (indirect) and other options include anaemia, malaria and cardiac disease which are indirect causes.', 'KRCHN'`;
const FIX1_KRCHN_TO   = `VALUES ('Direct cause of maternal mortality include:', 'Hemorrhage, Malaria, anemia', 'Eclampsia, haemorrhage, sepsis', 'Malaria, eclampsia, anemia', 'Anemia, cardiac disease, hemorrhage', 'B', '${FIX1_RATIONALE}', 'KRCHN'`;

// ─── FIX 2: Polyhydramnios threshold — change option_d from 1,500mls to 2,000mls ──

const FIX2_RATIONALE = `Per Myles Textbook for Midwives (African edition), polyhydramnios is diagnosed when amniotic fluid volume exceeds 2,000 ml (2 litres) at term. Normal amniotic fluid at term is approximately 500–1,500 ml (average ~800–1,000 ml); 1,500 ml is the upper limit of normal, not the diagnostic threshold for polyhydramnios. Option D (2,000 mls) is the standard teaching cut-off per Myles. Modern obstetric practice also uses ultrasound criteria: AFI ≥ 24–25 cm or deepest vertical pocket ≥ 8 cm. Common causes: fetal congenital anomalies (oesophageal/duodenal atresia, anencephaly), maternal diabetes mellitus, multiple pregnancy, fetal anaemia (Rh isoimmunisation), idiopathic. Maternal/fetal complications include preterm labour, PROM, malpresentation, cord prolapse, placental abruption and postpartum haemorrhage from uterine overdistension.`;

const FIX2_OLD_TAIL = `'1,500mls', 'D', 'Per Myles Textbook for Midwives, polyhydramnios is diagnosed when amniotic fluid volume exceeds about 1,500 ml (normal at term is 500-1000 ml). Volumes of 500-1000 ml are within normal limits, so option D is correct.'`;
const FIX2_NEW_TAIL = `'2,000mls', 'D', '${FIX2_RATIONALE}'`;

// ─── FIX 3: Bipartite placenta — change option_b from Placenta praevia to Retained placenta ──

const FIX3_RATIONALE = `Per Myles Textbook for Midwives, both bipartite placenta and succenturiate lobe placenta are abnormal morphological variants that increase the risk of retained placental tissue after delivery. A bipartite placenta is divided into two nearly equal lobes connected by blood vessels within the membranes — one lobe may remain in the uterus after delivery of the other. A succenturiate (accessory) lobe develops separately from the main placenta and is connected to it by fetal blood vessels running through the membranes; after the main placenta is delivered, the accessory lobe may be retained in the uterus, causing retained placenta and postpartum haemorrhage. Retained placenta (option B) is the correct answer. Placenta praevia is a site-of-implantation disorder unrelated to placental morphology; placental abruption (A), calcification (C) and insufficiency (D) are not caused by these structural variants.`;

const FIX3_OLD = `VALUES ('Bipartite placenta and succenturiate lobe are causes of', 'Placenta abruption', 'Placenta preavia', 'Placental calcification', 'Placental insufficieny', 'B', 'Per Myles Textbook for Midwives, abnormal placental morphology such as bipartite placenta and succenturiate lobe reflects abnormal/low implantation and is associated with placenta praevia (and with retained lobe leading to PPH). Placental abruption (A), calcification (C) and insufficiency (D) are not caused by these structural variants.'`;
const FIX3_NEW = `VALUES ('Bipartite placenta and succenturiate lobe are causes of', 'Placenta abruption', 'Retained placenta', 'Placental calcification', 'Placental insufficieny', 'B', '${FIX3_RATIONALE}'`;

// ─── NON-MCQ STEMS TO REMOVE ──────────────────────────────────────────────────
// These are True/False, Match, List-essay, and OSCE format items that must not
// appear in the MCQ practice/mock exam sections. Each is removed from every
// batch file it appears in.

const NON_MCQ_STEMS = [
  `Zavanelli maneuver is a non-invasive technique commonly used to manage shoulder dystocia.`,
  `Puerperal pyrexia is characterized by any episode of fever during the entire puerperium.`,
  `Indicate whether True(T) or False(F) Psychosocial adversities are among the predisposing factors of puerperal psychosis. Ensuring security of patient is the only nursing management of puerperal psychosis.`,
  `Choanal atresia presents with noisy breathing`,
  `Diaphragmatic hernia is associated with lungs underdevelopment.`,
  `Causes of puerperal pyrexia is entirely obstetrical related`,
  `Post-partum haemorrhage is a common outcome of shoulder dystocia due to difficult delivery.`,
  `Match the conditions in column A with their correct description in column B COLUMN A a)Torticollis b)Erb`,
  `Match the following malpresentations with their respective engaging diameters. Malpresentation a)Brow presentation b)Face presentation Engaging diameter`,
  `List two (2) effects of preeclampsia on each of the following systems`,
  `Mrs. Q Para 4+0 is in the second stage of labour with a diagnosis of breech presentation. The fetal and maternal vital signs are within the normal ranges.`,
];

// ─── BATCH FILES ──────────────────────────────────────────────────────────────

const BATCH_FILES = [
  '20260724000001_seed_mcq_compilation_set4_batch1.sql',
  '20260724000002_seed_mcq_compilation_set4_batch2.sql',
  '20260724000003_seed_mcq_compilation_set4_batch3.sql',
  '20260724000004_seed_mcq_compilation_set4_batch4.sql',
  '20260724000005_seed_mcq_compilation_set4_batch5.sql',
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function applyReplace(fileName, from, to) {
  const filePath = `${MIGRATIONS}/${fileName}`;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(from)) {
    content = content.split(from).join(to);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed in ${fileName}`);
    return 1;
  } else {
    console.warn(`  ⚠ Target not found in ${fileName}: ${from.substring(0, 80)}...`);
    return 0;
  }
}

function removeLine(fileName, stemFragment) {
  const filePath = `${MIGRATIONS}/${fileName}`;
  if (!fs.existsSync(filePath)) return 0;
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let removed = 0;
  const newLines = lines.filter(line => {
    if (line.startsWith('INSERT INTO questions') && line.includes(stemFragment)) {
      console.log(`  ✓ Removed non-MCQ from ${fileName}: "${stemFragment.substring(0, 60)}..."`);
      removed++;
      return false; // drop this line
    }
    return true;
  });
  if (removed > 0) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  }
  return removed;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

let total = 0;

console.log('\n=== FIX 1: Direct maternal mortality ===');
total += applyReplace('20260724000001_seed_mcq_compilation_set4_batch1.sql', FIX1_BSCN_FROM, FIX1_BSCN_TO);
total += applyReplace('20260724000003_seed_mcq_compilation_set4_batch3.sql', FIX1_KRCHN_FROM, FIX1_KRCHN_TO);

console.log('\n=== FIX 2: Polyhydramnios threshold (1,500 → 2,000 mls) ===');
total += applyReplace('20260724000001_seed_mcq_compilation_set4_batch1.sql', FIX2_OLD_TAIL, FIX2_NEW_TAIL);
total += applyReplace('20260724000003_seed_mcq_compilation_set4_batch3.sql', FIX2_OLD_TAIL, FIX2_NEW_TAIL);

console.log('\n=== FIX 3: Bipartite placenta / succenturiate lobe answer ===');
total += applyReplace('20260724000001_seed_mcq_compilation_set4_batch1.sql', FIX3_OLD, FIX3_NEW);
total += applyReplace('20260724000003_seed_mcq_compilation_set4_batch3.sql', FIX3_OLD, FIX3_NEW);

console.log('\n=== REMOVING NON-MCQ FORMAT ITEMS ===');
NON_MCQ_STEMS.forEach(stem => {
  BATCH_FILES.forEach(fileName => {
    total += removeLine(fileName, stem);
  });
});

// ─── WRITE CORRECTION MIGRATION ──────────────────────────────────────────────
// This migration patches any rows already pushed to Supabase.

const correctionMigration = `-- Set 4 Audit Corrections (applied ${new Date().toISOString().split('T')[0]})
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
`;

const correctionPath = `${MIGRATIONS}/20260726090000_fix_set4_audit_corrections.sql`;
fs.writeFileSync(correctionPath, correctionMigration, 'utf8');
console.log(`\n✓ Wrote correction migration: 20260726090000_fix_set4_audit_corrections.sql`);
total++;

console.log(`\n=== DONE — ${total} changes applied ===\n`);
