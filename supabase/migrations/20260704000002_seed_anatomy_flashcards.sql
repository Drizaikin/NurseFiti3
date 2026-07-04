-- Seed Anatomy & Physiology Flashcards
-- High-yield topics frequently tested in NCK exams

INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a2000000-0000-0000-0000-000000000001',
  'Advanced Anatomy & Physiology',
  'High-yield structural and functional anatomy with image support',
  'BScN',
  'Human Anatomy',
  10
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, image_url, cadre, unit) VALUES
('a2000000-0000-0000-0000-000000000001',
  'What is the normal cardiac conduction pathway?',
  'SA node (pacemaker, 60-100 bpm) → AV node (40-60 bpm, delays impulse) → Bundle of His → Right and Left Bundle Branches → Purkinje fibres (20-40 bpm).',
  'SA node → AV node → Bundle of His → Bundle Branches → Purkinje',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'Which cranial nerve is responsible for facial muscle movement, and what condition results from its dysfunction?',
  'Cranial Nerve VII (Facial Nerve). Dysfunction causes Bell''s palsy (unilateral facial paralysis). Do not confuse with CN V (Trigeminal), which provides facial SENSATION and mastication.',
  'CN VII (Facial) → Bell''s Palsy',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'Where in the nephron does loop diuretic (e.g., Furosemide) act?',
  'The Thick Ascending Limb of the Loop of Henle. It inhibits the Na+/K+/2Cl- cotransporter, preventing sodium reabsorption and leading to profound diuresis and potassium loss.',
  'Thick Ascending Limb (Loop of Henle)',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'What are the vessels that make up the Circle of Willis?',
  'Anterior cerebral arteries, anterior communicating artery, internal carotid arteries, posterior communicating arteries, and posterior cerebral arteries. (The basilar and middle cerebral arteries are associated but not technically part of the ring).',
  'Anterior & Posterior cerebral + communicating + Internal carotid',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'Describe the hormones involved in the menstrual cycle and ovulation.',
  'FSH stimulates follicle growth. Oestrogen peaks before ovulation, causing an LH surge. The LH surge triggers ovulation (day 14). The corpus luteum then secretes Progesterone to maintain the uterine lining.',
  'LH surge triggers ovulation',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'What is the function of surfactant and which cells produce it?',
  'Surfactant reduces surface tension in the alveoli, preventing alveolar collapse (atelectasis) during expiration. It is produced by Type II alveolar cells (pneumocytes) starting around 24 weeks gestation.',
  'Reduces surface tension — produced by Type II pneumocytes',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'What is the difference between sympathetic and parasympathetic effects on the pupil and heart rate?',
  'Sympathetic (Fight or Flight): Dilates pupil (mydriasis), increases heart rate (tachycardia). Parasympathetic (Rest and Digest): Constricts pupil (miosis), decreases heart rate (bradycardia).',
  'Sympathetic = Dilates pupil, ↑HR · Parasympathetic = Constricts pupil, ↓HR',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'Which valves close to produce the first (S1) and second (S2) heart sounds?',
  'S1 ("Lub"): Closure of the atrioventricular (AV) valves (Mitral and Tricuspid) at the start of systole. S2 ("Dub"): Closure of the semilunar valves (Aortic and Pulmonary) at the start of diastole.',
  'S1 = AV valves close · S2 = Semilunar valves close',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'What is the role of the cerebellum?',
  'Coordinates voluntary movement, posture, and balance. Damage results in ataxia (uncoordinated gait), dysmetria (inability to judge distance), and intention tremors.',
  'Coordination, posture, and balance',
  NULL,
  'BScN', 'Human Anatomy'),

('a2000000-0000-0000-0000-000000000001',
  'What are the primary functions of the liver?',
  'Bile production, protein synthesis (albumin, clotting factors), glycogen storage, detoxification of ammonia to urea, and drug metabolism (cytochrome P450).',
  'Bile, albumin, clotting factors, detoxification, glycogen',
  NULL,
  'BScN', 'Human Anatomy');
