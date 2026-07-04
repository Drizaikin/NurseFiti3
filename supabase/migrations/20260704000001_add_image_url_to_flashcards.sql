-- Migration to add image_url to flashcards
ALTER TABLE flashcards
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN flashcards.image_url IS 'Optional URL to an image for anatomy and visually-based flashcards.';
