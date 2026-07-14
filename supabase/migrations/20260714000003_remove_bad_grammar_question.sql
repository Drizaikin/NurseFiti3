-- =============================================================================
-- Migration: Remove Grammatically Flawed Question
-- Description: Deletes a specific poorly worded question about failure to thrive
-- Date: 2026-07-14
-- =============================================================================

DELETE FROM questions 
WHERE stem = 'Approaching to a child with failure to thrive based on signs and symptoms.Of the following, the MOST common cause behind a child has spitting, vomiting, and food refusal is';
