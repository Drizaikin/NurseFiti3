-- Add toggle to campaigns for showing allocators publicly
ALTER TABLE public.scholarship_campaigns 
ADD COLUMN IF NOT EXISTS show_allocators BOOLEAN NOT NULL DEFAULT false;

-- Add allocator tracking fields to deposits
-- (Especially useful for politicians, NGOs, or corporate sponsors)
ALTER TABLE public.scholarship_deposits
ADD COLUMN IF NOT EXISTS allocator_name TEXT,
ADD COLUMN IF NOT EXISTS allocator_title TEXT,
ADD COLUMN IF NOT EXISTS allocator_organization TEXT;
