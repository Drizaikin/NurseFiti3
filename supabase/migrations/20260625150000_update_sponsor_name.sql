-- Update the sponsor name and add a max_subsidized_slots column if it doesn't exist
ALTER TABLE scholarship_campaigns ADD COLUMN IF NOT EXISTS max_subsidized_slots integer DEFAULT 100;

UPDATE scholarship_campaigns 
SET sponsor_name = 'Senetorial Aspirant, sir. Lokwang Jackson Nadukae',
    max_subsidized_slots = 100
WHERE slug = 'samburu-nursing-excellence';
