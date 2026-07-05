-- ==============================================================================
-- TITLE: CREATE MNEMONICS TABLE & SEED INITIAL DATA
-- PURPOSE: Supports the "Mnemonic of The Day" and "Archive" features.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.mnemonics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    acronym TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.mnemonics ENABLE ROW LEVEL SECURITY;

-- Drop policies before recreating so re-runs don't error
DROP POLICY IF EXISTS "Public can view mnemonics" ON public.mnemonics;
DROP POLICY IF EXISTS "Admins can manage mnemonics" ON public.mnemonics;

-- Everyone can view mnemonics
CREATE POLICY "Public can view mnemonics"
  ON public.mnemonics FOR SELECT
  USING (TRUE);

-- Only admins can manage (Admins use service role key in API routes, or we can check role)
-- For simplicity, we'll allow all authenticated users with role='admin' to manage it, 
-- or we just rely on the API routes using the admin client. We'll allow service_role to manage it.
CREATE POLICY "Admins can manage mnemonics"
  ON public.mnemonics FOR ALL
  USING (
    (auth.jwt() ->> 'role') = 'admin' OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (auth.jwt() ->> 'role') = 'admin' OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Seed the first mnemonic
INSERT INTO public.mnemonics (title, acronym, description)
VALUES (
  'Anticholinergic Toxicity',
  'Dry as a bone, blind as a bat, red as a beet, mad as a hatter, hot as a hare.',
  E'This mnemonic summarizes the classic signs of anticholinergic toxicity:\n\nDry as a bone -> Dry skin and dry mucous membranes (reduced sweating and secretions)\nBlind as a bat -> Mydriasis (dilated pupils), blurred vision, cycloplegia\nRed as a beet -> Flushed skin due to cutaneous vasodilation\nMad as a hatter -> Confusion, agitation, delirium, hallucinations\nHot as a hare -> Hyperthermia from impaired sweating\n\nMany clinicians also add a sixth phrase:\n"Full as a flask" -> Urinary retention\n\nThis is one of the highest-yield mnemonics for pharmacology and toxicology, especially for nursing and NCK exam preparation.'
);
