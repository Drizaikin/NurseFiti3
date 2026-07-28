-- Migration: fix hd_materials RLS INSERT policy
-- The FOR ALL policy with only USING clause doesn't fully protect INSERT.
-- PostgreSQL requires a WITH CHECK clause on INSERT/UPDATE operations.
-- This migration drops and recreates the tutor policy correctly.

-- Drop the old broad policy
DROP POLICY IF EXISTS "tutor_own_hd_materials" ON hd_materials;

-- Tutor SELECT/UPDATE/DELETE: using clause only
CREATE POLICY "tutor_select_own_hd_materials" ON hd_materials
  FOR SELECT USING (auth.uid() = tutor_id);

CREATE POLICY "tutor_update_own_hd_materials" ON hd_materials
  FOR UPDATE USING (auth.uid() = tutor_id) WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "tutor_delete_own_hd_materials_row" ON hd_materials
  FOR DELETE USING (auth.uid() = tutor_id);

-- Tutor INSERT: with check clause ensures tutor_id = auth.uid()
CREATE POLICY "tutor_insert_own_hd_materials" ON hd_materials
  FOR INSERT WITH CHECK (auth.uid() = tutor_id);
