-- Migration: 20260627000005_fix_unit_name_normalisation.sql
-- Purpose: Normalise inconsistent unit names found during full quality audit of all 1,876 questions.
--
-- Issues fixed:
-- 1. 33 BScN Paper II rows: unit = 'Nursing Management and Leadership'
--    → correct to 'Nursing Management & Leadership' (canonical per nck-exam-system.md Section 12)
--
-- 2. 26 BScN Paper II rows: unit = 'Nursing Research'
--    → correct to 'Research & Evidence-Based Practice' (canonical BScN Paper II unit per Section 12)
--
-- 3. 12 KRCHN Paper II rows: unit = 'Nursing Research'
--    → correct to 'Research & Statistics' (canonical KRCHN Paper II unit per Section 12)
--
-- All other unit names confirmed correct. 0 null cadre/paper rows. 0 unit='Nursing' or topic='General' rows.

-- Fix 1: 'Nursing Management and Leadership' → 'Nursing Management & Leadership'
UPDATE questions
SET unit = 'Nursing Management & Leadership'
WHERE unit = 'Nursing Management and Leadership'
  AND cadre = 'BScN'
  AND paper = 'Paper II';

-- Fix 2: BScN Paper II 'Nursing Research' → 'Research & Evidence-Based Practice'
UPDATE questions
SET unit = 'Research & Evidence-Based Practice'
WHERE unit = 'Nursing Research'
  AND cadre = 'BScN'
  AND paper = 'Paper II';

-- Fix 3: KRCHN Paper II 'Nursing Research' → 'Research & Statistics'
UPDATE questions
SET unit = 'Research & Statistics'
WHERE unit = 'Nursing Research'
  AND cadre = 'KRCHN'
  AND paper = 'Paper II';

-- Verification: after running, these counts should all be 0
-- SELECT COUNT(*) FROM questions WHERE unit = 'Nursing Management and Leadership';
-- SELECT COUNT(*) FROM questions WHERE unit = 'Nursing Research';
-- SELECT COUNT(*) FROM questions WHERE unit = 'Nursing' OR topic = 'General';
-- SELECT COUNT(*) FROM questions WHERE cadre IS NULL OR paper IS NULL;
