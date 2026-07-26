-- Migration: 20260726220000_final_noncanonical_cleanup.sql
-- Description: Move remaining non-canonical units into standard NCK units

DO $$
BEGIN
  -- 1. Communicable Diseases -> Medical-Surgical Nursing
  UPDATE questions 
  SET unit = 'Medical-Surgical Nursing'
  WHERE unit = 'Communicable Diseases';

  -- 2. Epidemiology -> Community Health Nursing
  UPDATE questions
  SET unit = 'Community Health Nursing'
  WHERE unit = 'Epidemiology';

  -- 3. Microbiology -> Infection Prevention & Control
  UPDATE questions
  SET unit = 'Infection Prevention & Control'
  WHERE unit = 'Microbiology';

  -- 4. Health Education & Sociology -> Community Health Nursing
  UPDATE questions
  SET unit = 'Community Health Nursing'
  WHERE unit = 'Health Education & Sociology';

  -- 5. Parasitology -> Medical-Surgical Nursing
  UPDATE questions
  SET unit = 'Medical-Surgical Nursing'
  WHERE unit = 'Parasitology';

  -- 6. Topic "Nutrition" in Paediatric Nursing -> Nutrition unit
  UPDATE questions
  SET unit = 'Nutrition',
      topic = 'Clinical Nutrition'
  WHERE unit = 'Paediatric Nursing' AND topic = 'Nutrition';

  -- 7. Topic "Evaluation in Teaching" -> Teaching and Learning Methodologies
  UPDATE questions
  SET unit = 'Teaching and Learning Methodologies'
  WHERE topic = 'Evaluation in Teaching';

  RAISE NOTICE 'Non-canonical units successfully merged.';
END $$;
