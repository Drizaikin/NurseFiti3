-- Migration to add subsidized_scholarship_slots column

ALTER TABLE public.scholarship_campaigns
ADD COLUMN IF NOT EXISTS subsidized_scholarship_slots INTEGER NOT NULL DEFAULT 0;

-- Update Samburu campaign to have 100 subsidized slots
UPDATE public.scholarship_campaigns
SET subsidized_scholarship_slots = 100
WHERE slug = 'samburu-nursing-excellence';
