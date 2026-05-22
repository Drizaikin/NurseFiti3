-- Migration: Replace M-Pesa payment columns with Paystack columns
-- Paystack uses a reference string + authorization_url flow instead of STK push

-- Rename the M-Pesa-specific columns to Paystack equivalents
ALTER TABLE payments
  RENAME COLUMN mpesa_phone TO customer_phone;

ALTER TABLE payments
  RENAME COLUMN mpesa_receipt TO paystack_receipt;

ALTER TABLE payments
  RENAME COLUMN mpesa_checkout_request_id TO paystack_reference;

-- Add Paystack-specific columns
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS paystack_access_code TEXT,
  ADD COLUMN IF NOT EXISTS paystack_authorization_url TEXT,
  ADD COLUMN IF NOT EXISTS paystack_channel TEXT; -- card, mobile_money, bank_transfer, etc.

-- Drop the old M-Pesa index and add a Paystack reference index
DROP INDEX IF EXISTS idx_payments_checkout_request;
CREATE INDEX IF NOT EXISTS idx_payments_paystack_reference ON payments(paystack_reference);

-- Also rename the mpesa_transaction_id column in sessions to payment_reference
-- (generic enough to work with any payment provider)
ALTER TABLE sessions
  RENAME COLUMN mpesa_transaction_id TO payment_reference;

-- Add transfer tracking for tutor payouts
CREATE TABLE IF NOT EXISTS tutor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles NOT NULL,
  amount INTEGER NOT NULL,           -- net amount in KSh (kobo * 100 for Paystack)
  currency TEXT DEFAULT 'KES',
  recipient_code TEXT,               -- Paystack transfer recipient code
  transfer_code TEXT,                -- Paystack transfer reference
  status TEXT CHECK (status IN ('pending', 'processing', 'success', 'failed', 'reversed')) DEFAULT 'pending',
  reason TEXT,
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payouts_tutor ON tutor_payouts(tutor_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON tutor_payouts(status);

-- RLS for tutor_payouts
ALTER TABLE tutor_payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view their own payouts"
  ON tutor_payouts FOR SELECT
  USING (auth.uid() = tutor_id);

-- Service role can insert/update payouts (via API routes)
CREATE POLICY "Service role manages payouts"
  ON tutor_payouts FOR ALL
  USING (auth.role() = 'service_role');
