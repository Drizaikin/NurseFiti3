-- Migration: Add 'hd_material_purchase' to payments.type check constraint
-- The payments_type_check constraint was created in 20260625180001 without
-- 'hd_material_purchase'. Any INSERT with type='hd_material_purchase' fails
-- with a check constraint violation (caught as a 500 in initialize/route.ts).

DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  -- Drop every existing check constraint on the 'type' column of payments
  FOR constraint_name IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_class rel ON rel.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = rel.relnamespace
    WHERE rel.relname = 'payments'
      AND ns.nspname = 'public'
      AND con.contype = 'c'
      AND con.conname LIKE '%type%'
  LOOP
    EXECUTE 'ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS ' || constraint_name;
  END LOOP;
END $$;

-- Recreate with all valid payment types including hd_material_purchase
ALTER TABLE public.payments
  ADD CONSTRAINT payments_type_check
  CHECK (type IN (
    'plan_subscription',
    'revision_plan',
    'session_booking',
    'sponsor_deposit',
    'hd_material_purchase'
  ));
