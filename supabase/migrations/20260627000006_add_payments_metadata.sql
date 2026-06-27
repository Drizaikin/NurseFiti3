-- Add metadata JSONB column to payments for capturing custom info (e.g. allocator details)
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS metadata JSONB;
