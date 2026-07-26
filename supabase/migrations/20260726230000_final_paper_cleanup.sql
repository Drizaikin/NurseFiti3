-- Migration: 20260726230000_final_paper_cleanup.sql
-- Description: Fix remaining paper assignment errors for canonical units

DO $$
BEGIN
  -- 1. Medical-Surgical Nursing is a Paper I unit for both cadres
  UPDATE questions 
  SET paper = 'Paper I'
  WHERE unit = 'Medical-Surgical Nursing' AND paper != 'Paper I';

  -- 2. Infection Prevention & Control is a Paper II unit for both cadres
  UPDATE questions
  SET paper = 'Paper II'
  WHERE unit = 'Infection Prevention & Control' AND paper != 'Paper II';

  -- 3. Nutrition is a Paper II unit for both cadres
  UPDATE questions
  SET paper = 'Paper II'
  WHERE unit = 'Nutrition' AND paper != 'Paper II';

  -- 4. Fix topic for Epidemiology and Demography
  UPDATE questions
  SET topic = 'Epidemiological Methods'
  WHERE unit = 'Community Health Nursing' AND topic = 'Epidemiology and Demography';

  RAISE NOTICE 'Paper assignments and remaining topics cleaned up successfully.';
END $$;
