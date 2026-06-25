-- Seed the Samburu Campaign
INSERT INTO public.scholarship_campaigns (
    slug, 
    name, 
    sponsor_name, 
    full_scholarship_slots, 
    subsidy_discount_percentage, 
    is_public, 
    status
) VALUES (
    'samburu-nursing-excellence',
    'Samburu Nursing Excellence Scholarship Initiative',
    'Sir. Nadukae Jackson',
    10,
    25,
    false,
    'active'
) ON CONFLICT (slug) DO NOTHING;
