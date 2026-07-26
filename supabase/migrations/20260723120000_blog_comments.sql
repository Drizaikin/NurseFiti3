-- Create blog_comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Everyone can view non-deleted comments
DROP POLICY IF EXISTS "View active comments" ON public.blog_comments;
CREATE POLICY "View active comments" ON public.blog_comments
    FOR SELECT USING (is_deleted = FALSE);

-- Authenticated users can insert their own comments
DROP POLICY IF EXISTS "Insert own comments" ON public.blog_comments;
CREATE POLICY "Insert own comments" ON public.blog_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can mark their own comments as deleted
DROP POLICY IF EXISTS "Update own comments" ON public.blog_comments;
CREATE POLICY "Update own comments" ON public.blog_comments
    FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS blog_comments_slug_idx ON public.blog_comments(slug);
CREATE INDEX IF NOT EXISTS blog_comments_created_at_idx ON public.blog_comments(created_at DESC);

