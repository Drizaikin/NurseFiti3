-- Migration: Revert Antenatal Care back to Maternal & Child Health
-- The user explicitly requested to retain Antenatal Care in Maternal & Child Health.

DO $$
BEGIN
  -- Revert Antenatal Care from Midwifery back to MCH
  UPDATE questions 
  SET unit = 'Maternal & Child Health'
  WHERE topic = 'Antenatal Care';

  RAISE NOTICE 'Antenatal Care questions moved back to Maternal & Child Health.';
END $$;
