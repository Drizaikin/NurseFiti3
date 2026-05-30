-- Migration: Add IntaSend payment columns to payments and tutor_payouts tables
-- Replaces Paystack columns with IntaSend equivalents.
-- Old Paystack columns are kept (nullable) for backwards compatibility with existing records.

-- ── payments table ────────────────────────────────────────────────────────────

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS intasend_reference          TEXT,
  ADD COLUMN IF NOT EXISTS intasend_checkout_id        TEXT,
  ADD COLUMN IF NOT EXISTS intasend_checkout_url       TEXT,
  ADD COLUMN IF NOT EXISTS intasend_signature          TEXT,
  ADD COLUMN IF NOT EXISTS intasend_invoice_id         TEXT,
  ADD COLUMN IF NOT EXISTS intasend_channel            TEXT;

-- Index for fast lookup by our own reference (used in verify route and webhook)
CREATE INDEX IF NOT EXISTS payments_intasend_reference_idx
  ON payments (intasend_reference)
  WHERE intasend_reference IS NOT NULL;

-- ── tutor_payouts table ───────────────────────────────────────────────────────

ALTER TABLE tutor_payouts
  ADD COLUMN IF NOT EXISTS tracking_id TEXT;

-- Index for webhook lookups by IntaSend tracking_id
CREATE INDEX IF NOT EXISTS tutor_payouts_tracking_id_idx
  ON tutor_payouts (tracking_id)
  WHERE tracking_id IS NOT NULL;
