-- =============================================================================
-- MIGRATION: Correct paper assignments across all seeded questions
-- =============================================================================
-- Aligns all questions.paper values with the NCK exam structure in
-- nck-exam-system.md Section 12 (2 papers per cadre, Roman numerals).
--
-- KRCHN Paper I  : Medical-Surgical Nursing, Midwifery, Pharmacology,
--                  Maternal & Child Health, Paediatric Nursing,
--                  Anatomy & Physiology, Surgical Nursing
-- KRCHN Paper II : Community Health Nursing, Mental Health Nursing,
--                  Environmental Health, Nutrition, Research & Statistics,
--                  Health Systems & Management, Infection Prevention & Control
--
-- BScN  Paper I  : Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology,
--                  Critical Care Nursing, Surgical Nursing, Midwifery,
--                  Maternal & Child Health, Paediatric Nursing
-- BScN  Paper II : Community Health Nursing, Mental Health Nursing,
--                  Research & Evidence-Based Practice,
--                  Nursing Management & Leadership, Professional Ethics & Law,
--                  Health Systems in Kenya, Infection Prevention & Control,
--                  Nutrition
-- =============================================================================

-- ─── KRCHN — Paper I units ───────────────────────────────────────────────────
UPDATE questions
SET paper = 'Paper I'
WHERE cadre = 'KRCHN'
  AND unit IN (
    'Medical-Surgical Nursing',
    'Midwifery',
    'Pharmacology',
    'Maternal & Child Health',
    'Paediatric Nursing',
    'Anatomy & Physiology',
    'Surgical Nursing'
  );

-- ─── KRCHN — Paper II units ──────────────────────────────────────────────────
UPDATE questions
SET paper = 'Paper II'
WHERE cadre = 'KRCHN'
  AND unit IN (
    'Community Health Nursing',
    'Mental Health Nursing',
    'Environmental Health',
    'Nutrition',
    'Research & Statistics',
    'Health Systems & Management',
    'Infection Prevention & Control'
  );

-- ─── BScN — Paper I units ────────────────────────────────────────────────────
UPDATE questions
SET paper = 'Paper I'
WHERE cadre = 'BScN'
  AND unit IN (
    'Medical-Surgical Nursing',
    'Pharmacology',
    'Anatomy & Physiology',
    'Critical Care Nursing',
    'Surgical Nursing',
    'Midwifery',
    'Maternal & Child Health',
    'Paediatric Nursing'
  );

-- ─── BScN — Paper II units ───────────────────────────────────────────────────
UPDATE questions
SET paper = 'Paper II'
WHERE cadre = 'BScN'
  AND unit IN (
    'Community Health Nursing',
    'Mental Health Nursing',
    'Research & Evidence-Based Practice',
    'Nursing Management & Leadership',
    'Professional Ethics & Law',
    'Health Systems in Kenya',
    'Infection Prevention & Control',
    'Nutrition'
  );

-- ─── Verify: show distribution after update ──────────────────────────────────
-- (Run this SELECT manually to confirm — not executed as part of migration)
-- SELECT cadre, paper, unit, COUNT(*) AS question_count
-- FROM questions
-- WHERE status = 'approved'
-- GROUP BY cadre, paper, unit
-- ORDER BY cadre, paper, unit;
