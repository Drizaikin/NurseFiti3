-- ============================================================
-- Migration: 20260728161500_sync_missing_hd_purchases.sql
-- Description: Retroactively adds missing hd_material_purchases records 
-- for users whose payments completed via webhook without provisioning access.
-- ============================================================

INSERT INTO hd_material_purchases (student_id, material_id, payment_id, amount_paid, purchased_at)
SELECT 
    user_id,
    reference_id,
    id,
    amount,
    COALESCE(completed_at, updated_at, NOW())
FROM payments
WHERE type = 'hd_material_purchase'
  AND status = 'completed'
  AND reference_id IS NOT NULL
ON CONFLICT (student_id, material_id) DO NOTHING;
