-- Seed NCK units table with cadre-specific unit data, NCK weights, and tier classifications
-- Tier 1 = High yield (most marks), Tier 2 = Medium yield, Tier 3 = Lower yield
-- nck_weight = relative weighting (higher = more questions in exam)

-- ─── KRCHN Units ─────────────────────────────────────────────────────────────
INSERT INTO units (cadre, name, description, nck_weight, tier, is_examinable) VALUES
  ('KRCHN', 'Anatomy & Physiology',         'Body systems, structure and function',                                    1.20, 1, TRUE),
  ('KRCHN', 'Medical-Surgical Nursing',     'Adult medical and surgical conditions, nursing interventions',            1.50, 1, TRUE),
  ('KRCHN', 'Pharmacology',                 'Drug classifications, mechanisms, dosage calculations, adverse effects',  1.30, 1, TRUE),
  ('KRCHN', 'Community Health Nursing',     'Health promotion, disease prevention, community assessment',              1.40, 1, TRUE),
  ('KRCHN', 'Maternal & Child Health',      'Antenatal, postnatal, neonatal care, immunisation, nutrition',            1.40, 1, TRUE),
  ('KRCHN', 'Mental Health Nursing',        'Psychiatric disorders, therapeutic communication, Mental Health Act',     1.10, 2, TRUE),
  ('KRCHN', 'Paediatric Nursing',           'Child health, common paediatric conditions, growth and development',      1.10, 2, TRUE),
  ('KRCHN', 'Environmental Health',         'Water sanitation, waste management, vector control, food safety',         0.90, 2, TRUE),
  ('KRCHN', 'Nutrition',                    'Nutritional assessment, malnutrition, dietary management',                0.80, 2, TRUE),
  ('KRCHN', 'Midwifery',                    'Normal and complicated labour, delivery, postnatal care',                 1.20, 1, TRUE),
  ('KRCHN', 'Research & Statistics',        'Nursing research methodology, evidence-based practice, biostatistics',    0.70, 3, TRUE),
  ('KRCHN', 'Health Systems & Management',  'Kenya health system, health policy, nursing management',                  0.70, 3, TRUE),
  ('KRCHN', 'Surgical Nursing',             'Pre-operative, intra-operative, post-operative care',                     1.00, 2, TRUE),
  ('KRCHN', 'Infection Prevention & Control','Standard precautions, sterilisation, nosocomial infections',             0.80, 2, TRUE)
ON CONFLICT (cadre, name) DO NOTHING;

-- ─── BScN Units ──────────────────────────────────────────────────────────────
INSERT INTO units (cadre, name, description, nck_weight, tier, is_examinable) VALUES
  ('BScN', 'Medical-Surgical Nursing',      'Cardiovascular, respiratory, endocrine, neurological, renal, GI disorders', 1.50, 1, TRUE),
  ('BScN', 'Pharmacology',                  'Drug classifications, mechanisms, dosage calculations, adverse effects',     1.30, 1, TRUE),
  ('BScN', 'Anatomy & Physiology',          'Advanced body systems, pathophysiology',                                     1.10, 1, TRUE),
  ('BScN', 'Community Health Nursing',      'Primary health care, health promotion, epidemiology',                        1.20, 1, TRUE),
  ('BScN', 'Maternal & Child Health',       'Obstetric complications, neonatal care, paediatric nursing',                 1.30, 1, TRUE),
  ('BScN', 'Mental Health Nursing',         'Psychotic disorders, mood disorders, therapeutic communication, MHA Kenya',  1.20, 1, TRUE),
  ('BScN', 'Research & Evidence-Based Practice', 'Research methodology, sampling, data analysis, EBP',                   1.00, 2, TRUE),
  ('BScN', 'Nursing Management & Leadership','Leadership theories, management functions, delegation, supervision',        0.90, 2, TRUE),
  ('BScN', 'Professional Ethics & Law',     'Nursing ethics, legal issues, professional conduct, patient rights',         0.90, 2, TRUE),
  ('BScN', 'Health Systems in Kenya',       'Kenya health system structure, health policy, financing',                    0.80, 2, TRUE),
  ('BScN', 'Critical Care Nursing',         'ICU care, ventilator management, haemodynamic monitoring',                   1.00, 2, TRUE),
  ('BScN', 'Surgical Nursing',              'Pre-operative, intra-operative, post-operative care',                        1.00, 2, TRUE),
  ('BScN', 'Infection Prevention & Control','Standard precautions, sterilisation, nosocomial infections',                 0.80, 3, TRUE),
  ('BScN', 'Nutrition',                     'Nutritional assessment, therapeutic diets, malnutrition management',         0.70, 3, TRUE),
  ('BScN', 'Midwifery',                     'Normal and complicated labour, delivery, postnatal care',                    1.10, 1, TRUE)
ON CONFLICT (cadre, name) DO NOTHING;

-- ─── Higher Diploma Units (shared across specialties) ─────────────────────────
INSERT INTO units (cadre, name, description, nck_weight, tier, is_examinable) VALUES
  ('Higher Diploma', 'Critical Care Nursing',        'ICU/HDU management, ventilators, haemodynamic monitoring, ACLS',    1.50, 1, TRUE),
  ('Higher Diploma', 'Pharmacology (Advanced)',       'Critical care drugs, vasoactive agents, sedation, analgesia',       1.30, 1, TRUE),
  ('Higher Diploma', 'Medical-Surgical Nursing',      'Complex medical-surgical conditions, multi-organ failure',          1.20, 1, TRUE),
  ('Higher Diploma', 'Anatomy & Physiology',          'Advanced pathophysiology relevant to specialty',                    1.10, 1, TRUE),
  ('Higher Diploma', 'Oncology Nursing',              'Cancer pathophysiology, chemotherapy, radiation, palliative care',  1.20, 1, TRUE),
  ('Higher Diploma', 'Renal Nursing',                 'CKD, AKI, dialysis (haemodialysis, peritoneal), transplant care',  1.20, 1, TRUE),
  ('Higher Diploma', 'Psychiatric Nursing',           'Severe mental illness, psychopharmacology, crisis intervention',    1.20, 1, TRUE),
  ('Higher Diploma', 'Peri-Operative Nursing',        'Anaesthesia, surgical asepsis, instrument handling, recovery',      1.20, 1, TRUE),
  ('Higher Diploma', 'Research & Evidence-Based Practice', 'Research methodology, clinical audit, quality improvement',   0.90, 2, TRUE),
  ('Higher Diploma', 'Nursing Management & Leadership','Ward management, supervision, delegation, health systems',         0.80, 2, TRUE),
  ('Higher Diploma', 'Infection Prevention & Control','Advanced IPC, outbreak management, antimicrobial stewardship',      0.90, 2, TRUE),
  ('Higher Diploma', 'Professional Ethics & Law',     'Specialty-specific ethics, consent, legal frameworks',              0.80, 3, TRUE)
ON CONFLICT (cadre, name) DO NOTHING;
