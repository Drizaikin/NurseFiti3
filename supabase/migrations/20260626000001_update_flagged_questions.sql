-- Add reason and status columns to flagged_questions table
ALTER TABLE flagged_questions
  ADD COLUMN IF NOT EXISTS reason TEXT,
  ADD COLUMN IF NOT EXISTS details TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Drop the unique constraint so students can flag a question multiple times or we can upsert easily
-- In Postgres, we must find the name of the constraint to drop it
DO $$
DECLARE
    constraint_name text;
BEGIN
    SELECT conname INTO constraint_name
    FROM pg_constraint
    WHERE conrelid = 'flagged_questions'::regclass
      AND contype = 'u';
    
    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE flagged_questions DROP CONSTRAINT ' || constraint_name;
    END IF;
END $$;
