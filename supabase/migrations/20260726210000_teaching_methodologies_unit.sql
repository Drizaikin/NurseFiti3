-- Migration: Introduce Teaching and Learning Methodologies Unit
-- As per NCK guidelines, curriculum, teaching and learning questions belong here.

DO $$
BEGIN
  -- Move all teaching and curriculum topics to the new unit
  UPDATE questions 
  SET unit = 'Teaching and Learning Methodologies'
  WHERE topic IN (
    'Nursing Education',
    'Technology-Enhanced Learning',
    'Curriculum Development',
    'Learning Theories',
    'Bloom''s Taxonomy',
    'Teaching Methods',
    'Teaching and Learning Methods',
    'Educational Objectives',
    'Teaching Objectives',
    'Teaching Principles'
  );

  RAISE NOTICE 'Moved curriculum and teaching questions to Teaching and Learning Methodologies.';
END $$;
