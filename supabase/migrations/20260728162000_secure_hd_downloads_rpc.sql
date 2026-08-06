-- ============================================================
-- Migration: 20260728162000_secure_hd_downloads_rpc.sql
-- Description: Secures the increment_hd_material_downloads RPC function
-- to prevent unauthorized access by PUBLIC.
-- ============================================================

-- Revoke execute from public
REVOKE EXECUTE ON FUNCTION increment_hd_material_downloads(UUID) FROM PUBLIC;

-- Grant execute to service_role (since the webhook uses the admin client)
GRANT EXECUTE ON FUNCTION increment_hd_material_downloads(UUID) TO service_role;
