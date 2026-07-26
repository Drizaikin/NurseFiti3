-- Fix the flawed yellow fever question for BScN
UPDATE questions
SET
    option_d = 'Aedes mosquito',
    correct_option = 'D',
    rationale = 'Yellow fever is transmitted by the Aedes mosquito (Aedes aegypti). Fleas, black flies and tsetse flies transmit other diseases, and flavivirus is the causative virus, not a vector.'
WHERE stem = 'The vector that carries the causative organism for yellow fever is:-' 
  AND cadre = 'BScN';

-- Fix the flawed yellow fever question for KRCHN
UPDATE questions
SET
    option_d = 'Aedes mosquito',
    correct_option = 'D',
    rationale = 'Yellow fever is transmitted by the Aedes mosquito (Aedes aegypti). Fleas, black flies and tsetse flies transmit other diseases, and flavivirus is the causative virus, not a vector.'
WHERE stem = 'The vector that carries the causative organism for yellow fever is:-' 
  AND cadre = 'KRCHN';

-- Insert the missing Notifiable Diseases question for BScN
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status) 
VALUES (
    'Notifiable diseases in Kenya include:', 
    'Plague, measles, poliomyelitis, Tuberculosis', 
    'Anthrax, pneumonia, rabies, cholera', 
    'Poliomyelitis, chicken pox, tuberculosis, measles', 
    'Plague, poliomyelitis, brucellosis, diphtheria', 
    'A', 
    'Per Kenya''s list of notifiable diseases (Public Health Act / MOH), plague, measles, poliomyelitis and tuberculosis are all notifiable. Options with pneumonia or chicken pox include non-notifiable conditions.', 
    'BScN', 
    'Paper II', 
    'Community Health Nursing', 
    'Community Health', 
    'medium', 
    'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Insert the missing Notifiable Diseases question for KRCHN
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status) 
VALUES (
    'Notifiable diseases in Kenya include:', 
    'Plague, measles, poliomyelitis, Tuberculosis', 
    'Anthrax, pneumonia, rabies, cholera', 
    'Poliomyelitis, chicken pox, tuberculosis, measles', 
    'Plague, poliomyelitis, brucellosis, diphtheria', 
    'A', 
    'Per Kenya''s list of notifiable diseases (Public Health Act / MOH), plague, measles, poliomyelitis and tuberculosis are all notifiable. Options with pneumonia or chicken pox include non-notifiable conditions.', 
    'KRCHN', 
    'Paper II', 
    'Community Health Nursing', 
    'Community Health', 
    'medium', 
    'approved'
) ON CONFLICT (stem, cadre) DO NOTHING;
