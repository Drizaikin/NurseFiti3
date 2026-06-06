-- =============================================================================
-- MIGRATION: Catch-all paper value normalisation
-- =============================================================================
-- Some questions seeded before migration 20260526000002 may have retained
-- Arabic numeral paper values ('Paper 1', 'Paper 2', 'Paper 3', 'Paper 4')
-- if the correction migration did not run or was only partially applied.
--
-- The mock exam frontend queries for 'Paper I' and 'Paper II' (Roman numerals).
-- Any question with an Arabic numeral paper value is INVISIBLE to mock exams.
--
-- This migration is IDEMPOTENT — running it multiple times is safe.
-- It covers every possible Arabic/Roman mismatch variant.
-- =============================================================================

-- ── Step 1: Normalise all Arabic-numeral 'Paper 1' variants ──────────────────
-- These belong to Paper I for both BScN and KRCHN based on unit
UPDATE questions
SET paper = 'Paper I'
WHERE paper IN ('Paper 1', 'paper 1', 'PAPER 1', 'Paper1')
  AND unit IN (
    -- KRCHN Paper I units
    'Medical-Surgical Nursing',
    'Midwifery',
    'Pharmacology',
    'Maternal & Child Health',
    'Paediatric Nursing',
    'Anatomy & Physiology',
    'Surgical Nursing',
    -- BScN Paper I units (same + additional)
    'Critical Care Nursing'
  );

-- ── Step 2: Normalise all Arabic-numeral 'Paper 2' variants ──────────────────
UPDATE questions
SET paper = 'Paper II'
WHERE paper IN ('Paper 2', 'paper 2', 'PAPER 2', 'Paper2')
  AND unit IN (
    -- KRCHN Paper II units
    'Community Health Nursing',
    'Mental Health Nursing',
    'Environmental Health',
    'Nutrition',
    'Research & Statistics',
    'Health Systems & Management',
    'Infection Prevention & Control',
    -- BScN Paper II units (same + additional)
    'Research & Evidence-Based Practice',
    'Nursing Management & Leadership',
    'Professional Ethics & Law',
    'Health Systems in Kenya'
  );

-- ── Step 3: Force-correct ANY remaining Arabic numeral papers ─────────────────
-- Belt-and-suspenders: for any question that still has an Arabic numeral paper
-- value and wasn't caught by unit matching, apply unit-based correction globally.
-- This covers edge cases like questions whose unit name differs slightly.

-- Remaining 'Paper 1' -> use the comprehensive unit-based rule
UPDATE questions
SET paper = 'Paper I'
WHERE paper IN ('Paper 1', 'paper 1', 'PAPER 1', 'Paper1');

-- Remaining 'Paper 2' -> Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE paper IN ('Paper 2', 'paper 2', 'PAPER 2', 'Paper2');

-- Remaining 'Paper 3' -> Paper I (source docs labelled some sets as Paper 3/4
-- but they were re-categorised as Paper I based on unit content)
UPDATE questions
SET paper = 'Paper I'
WHERE paper IN ('Paper 3', 'paper 3', 'PAPER 3', 'Paper3');

-- Remaining 'Paper 4' -> Paper II
UPDATE questions
SET paper = 'Paper II'
WHERE paper IN ('Paper 4', 'paper 4', 'PAPER 4', 'Paper4');

-- ── Step 4: Fix any NULL paper values based on unit ──────────────────────────
-- Questions with no paper assigned get assigned based on their unit.
UPDATE questions
SET paper = 'Paper I'
WHERE paper IS NULL
  AND cadre IN ('KRCHN', 'BScN')
  AND unit IN (
    'Medical-Surgical Nursing',
    'Midwifery',
    'Pharmacology',
    'Maternal & Child Health',
    'Paediatric Nursing',
    'Anatomy & Physiology',
    'Surgical Nursing',
    'Critical Care Nursing'
  );

UPDATE questions
SET paper = 'Paper II'
WHERE paper IS NULL
  AND cadre IN ('KRCHN', 'BScN')
  AND unit IN (
    'Community Health Nursing',
    'Mental Health Nursing',
    'Environmental Health',
    'Nutrition',
    'Research & Statistics',
    'Health Systems & Management',
    'Health Systems in Kenya',
    'Infection Prevention & Control',
    'Research & Evidence-Based Practice',
    'Nursing Management & Leadership',
    'Professional Ethics & Law'
  );

-- ── Verification query (run manually to confirm results) ─────────────────────
-- SELECT cadre, paper, COUNT(*) as question_count
-- FROM questions
-- WHERE status = 'approved'
-- GROUP BY cadre, paper
-- ORDER BY cadre, paper;
--
-- Expected result: ONLY 'Paper I' and 'Paper II' values for cadre BScN/KRCHN.
-- No 'Paper 1', 'Paper 2', 'Paper 3', 'Paper 4', or NULL should remain.
