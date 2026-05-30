-- Repair migration for existing production databases.
-- Use this when older migrations partially ran or the database already has tables.
-- It is intentionally idempotent: existing columns, indexes, tables, and policies are skipped.

-- payments: normalize old M-Pesa columns to generic/Paystack-compatible names when needed.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'mpesa_phone'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE payments RENAME COLUMN mpesa_phone TO customer_phone;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'mpesa_receipt'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'paystack_receipt'
  ) THEN
    ALTER TABLE payments RENAME COLUMN mpesa_receipt TO paystack_receipt;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'mpesa_checkout_request_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'paystack_reference'
  ) THEN
    ALTER TABLE payments RENAME COLUMN mpesa_checkout_request_id TO paystack_reference;
  END IF;
END $$;

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS customer_phone TEXT,
  ADD COLUMN IF NOT EXISTS paystack_receipt TEXT,
  ADD COLUMN IF NOT EXISTS paystack_reference TEXT,
  ADD COLUMN IF NOT EXISTS paystack_access_code TEXT,
  ADD COLUMN IF NOT EXISTS paystack_authorization_url TEXT,
  ADD COLUMN IF NOT EXISTS paystack_channel TEXT,
  ADD COLUMN IF NOT EXISTS intasend_reference TEXT,
  ADD COLUMN IF NOT EXISTS intasend_checkout_id TEXT,
  ADD COLUMN IF NOT EXISTS intasend_checkout_url TEXT,
  ADD COLUMN IF NOT EXISTS intasend_signature TEXT,
  ADD COLUMN IF NOT EXISTS intasend_invoice_id TEXT,
  ADD COLUMN IF NOT EXISTS intasend_channel TEXT;

ALTER TABLE payments
  ALTER COLUMN customer_phone DROP NOT NULL;

DROP INDEX IF EXISTS idx_payments_checkout_request;
CREATE INDEX IF NOT EXISTS idx_payments_paystack_reference
  ON payments (paystack_reference)
  WHERE paystack_reference IS NOT NULL;

CREATE INDEX IF NOT EXISTS payments_intasend_reference_idx
  ON payments (intasend_reference)
  WHERE intasend_reference IS NOT NULL;

-- sessions: app now writes payment_reference, but older schema used mpesa_transaction_id.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'sessions' AND column_name = 'mpesa_transaction_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'sessions' AND column_name = 'payment_reference'
  ) THEN
    ALTER TABLE sessions RENAME COLUMN mpesa_transaction_id TO payment_reference;
  END IF;
END $$;

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS payment_reference TEXT;

-- tutor payouts: create the base table if the older Paystack migration never reached this step.
CREATE TABLE IF NOT EXISTS tutor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'KES',
  tracking_id TEXT,
  recipient_code TEXT,
  transfer_code TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'success', 'failed', 'reversed')) DEFAULT 'pending',
  reason TEXT,
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE tutor_payouts
  ADD COLUMN IF NOT EXISTS tracking_id TEXT,
  ADD COLUMN IF NOT EXISTS recipient_code TEXT,
  ADD COLUMN IF NOT EXISTS transfer_code TEXT;

CREATE INDEX IF NOT EXISTS idx_payouts_tutor ON tutor_payouts (tutor_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON tutor_payouts (status);
CREATE INDEX IF NOT EXISTS tutor_payouts_tracking_id_idx
  ON tutor_payouts (tracking_id)
  WHERE tracking_id IS NOT NULL;

ALTER TABLE tutor_payouts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tutor_payouts'
      AND policyname = 'Tutors can view their own payouts'
  ) THEN
    CREATE POLICY "Tutors can view their own payouts"
      ON tutor_payouts FOR SELECT
      USING (auth.uid() = tutor_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tutor_payouts'
      AND policyname = 'Service role manages payouts'
  ) THEN
    CREATE POLICY "Service role manages payouts"
      ON tutor_payouts FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;
