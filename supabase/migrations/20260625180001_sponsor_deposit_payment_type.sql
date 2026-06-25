-- Drop all check constraints on the 'type' column of 'payments' table, then recreate with 'sponsor_deposit'

DO $$
DECLARE
    constraint_name text;
BEGIN
    FOR constraint_name IN (
        SELECT conname
        FROM pg_constraint
        JOIN pg_attribute ON pg_attribute.attrelid = pg_constraint.conrelid AND pg_attribute.attnum = ANY(pg_constraint.conkey)
        WHERE conrelid = 'public.payments'::regclass
        AND pg_attribute.attname = 'type'
        AND contype = 'c'
    ) LOOP
        EXECUTE 'ALTER TABLE public.payments DROP CONSTRAINT ' || constraint_name;
    END LOOP;
END $$;

ALTER TABLE public.payments ADD CONSTRAINT payments_type_check CHECK (type IN ('plan_subscription', 'revision_plan', 'session_booking', 'sponsor_deposit'));
