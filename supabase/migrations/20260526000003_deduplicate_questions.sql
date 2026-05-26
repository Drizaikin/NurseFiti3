-- =============================================================================
-- MIGRATION: Deduplicate questions and add unique constraint on stem
-- =============================================================================
-- Problem: The questions table has no UNIQUE constraint on stem.
-- If seed migrations were run more than once, every question was inserted
-- multiple times, causing students to see the same question 2–3 times.
--
-- Fix:
--   1. For each set of duplicates, identify the KEEPER (earliest created_at).
--   2. Re-point any student_answers rows that reference a duplicate to the keeper.
--   3. Delete the duplicate rows (now safe — no FK references remain).
--   4. Add a UNIQUE constraint on stem to prevent future duplicates.
-- =============================================================================

-- Step 1: Re-point student_answers from duplicate question IDs to the keeper ID
UPDATE student_answers sa
SET question_id = keeper.id
FROM (
  SELECT
    id,
    stem,
    ROW_NUMBER() OVER (
      PARTITION BY stem
      ORDER BY created_at ASC, id ASC
    ) AS rn
  FROM questions
) keeper
WHERE keeper.rn = 1
  AND sa.question_id IN (
    SELECT id FROM (
      SELECT
        id,
        ROW_NUMBER() OVER (
          PARTITION BY stem
          ORDER BY created_at ASC, id ASC
        ) AS rn
      FROM questions
    ) dupes
    WHERE dupes.rn > 1
  )
  AND keeper.stem = (SELECT stem FROM questions WHERE id = sa.question_id);

-- Step 2: Re-point flagged_questions from duplicate IDs to the keeper ID
UPDATE flagged_questions fq
SET question_id = keeper.id
FROM (
  SELECT
    id,
    stem,
    ROW_NUMBER() OVER (
      PARTITION BY stem
      ORDER BY created_at ASC, id ASC
    ) AS rn
  FROM questions
) keeper
WHERE keeper.rn = 1
  AND fq.question_id IN (
    SELECT id FROM (
      SELECT
        id,
        ROW_NUMBER() OVER (
          PARTITION BY stem
          ORDER BY created_at ASC, id ASC
        ) AS rn
      FROM questions
    ) dupes
    WHERE dupes.rn > 1
  )
  AND keeper.stem = (SELECT stem FROM questions WHERE id = fq.question_id);

-- Step 3: Delete the duplicate rows (FK references now re-pointed — safe to delete)
DELETE FROM questions
WHERE id IN (
  SELECT id FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (
        PARTITION BY stem
        ORDER BY created_at ASC, id ASC
      ) AS rn
    FROM questions
  ) ranked
  WHERE rn > 1
);

-- Step 4: Add unique constraint on stem to prevent future duplicates
ALTER TABLE questions
  ADD CONSTRAINT questions_stem_unique UNIQUE (stem);

-- Step 5: Update question_count in units table to reflect deduplicated counts
UPDATE units u
SET question_count = (
  SELECT COUNT(*)
  FROM questions q
  WHERE q.cadre = u.cadre
    AND q.unit = u.name
    AND q.status = 'approved'
)
WHERE u.cadre IN ('BScN', 'KRCHN', 'Higher Diploma');

-- Verification query (run manually after applying):
-- SELECT cadre, unit, COUNT(*) AS question_count
-- FROM questions
-- WHERE status = 'approved'
-- GROUP BY cadre, unit
-- ORDER BY cadre, unit;
