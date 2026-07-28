-- Migration: add increment_hd_material_downloads RPC function
-- Called from intasend/verify after a successful hd_material_purchase payment.

CREATE OR REPLACE FUNCTION increment_hd_material_downloads(p_material_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE hd_materials
  SET download_count = download_count + 1
  WHERE id = p_material_id;
END;
$$;
