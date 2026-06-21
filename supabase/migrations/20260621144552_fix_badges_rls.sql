-- Add INSERT policy for student_badges
DROP POLICY IF EXISTS "Students can insert own badges" ON student_badges;
CREATE POLICY "Students can insert own badges"
  ON student_badges FOR INSERT
  WITH CHECK (auth.uid() = student_id);
