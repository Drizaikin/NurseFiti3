-- =============================================================================
-- Migration: Fix questions unique constraint to allow same stem per cadre
-- =============================================================================
-- The existing questions_stem_unique constraint is on (stem) alone.
-- This prevents seeding the same past-paper question for both KRCHN and BScN.
-- The correct constraint is (stem, cadre) — a question stem can exist once
-- per cadre, but the same stem may appear under different cadres.
-- =============================================================================

-- Drop the old single-column constraint
ALTER TABLE questions
  DROP CONSTRAINT IF EXISTS questions_stem_unique;

-- Add the correct composite constraint
ALTER TABLE questions
  ADD CONSTRAINT questions_stem_cadre_unique UNIQUE (stem, cadre);
