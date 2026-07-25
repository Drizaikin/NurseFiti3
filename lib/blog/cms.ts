import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { BlogFaq, BlogSource, CmsBlogPost } from './types';

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_markdown: string;
  category: string;
  cadres: string[] | null;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  author_name: string;
  reviewer_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
  primary_keyword: string | null;
  faqs: BlogFaq[] | null;
  sources: BlogSource[] | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const selection = 'id, slug, title, excerpt, content_markdown, category, cadres, status, featured, hero_image_url, hero_image_alt, author_name, reviewer_name, seo_title, seo_description, primary_keyword, faqs, sources, published_at, created_at, updated_at';

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function estimateReadTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function validFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is BlogFaq => Boolean(
    item && typeof item === 'object'
    && typeof (item as BlogFaq).question === 'string'
    && typeof (item as BlogFaq).answer === 'string'
  ));
}

function validSources(value: unknown): BlogSource[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is BlogSource => {
    if (!item || typeof item !== 'object') return false;
    const source = item as BlogSource;
    if (typeof source.label !== 'string' || typeof source.url !== 'string') return false;
    try {
      return ['http:', 'https:'].includes(new URL(source.url).protocol);
    } catch {
      return false;
    }
  });
}

export function mapBlogRow(row: BlogRow): CmsBlogPost {
  const date = row.published_at ?? row.created_at;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content_markdown,
    category: row.category,
    cadres: row.cadres ?? [],
    status: row.status,
    featured: row.featured,
    imageUrl: row.hero_image_url ?? undefined,
    imageAlt: row.hero_image_alt ?? undefined,
    authorName: row.author_name,
    reviewerName: row.reviewer_name ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    primaryKeyword: row.primary_keyword ?? undefined,
    faqs: validFaqs(row.faqs),
    sources: validSources(row.sources),
    readTime: estimateReadTime(row.content_markdown),
    date,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    source: 'cms',
  };
}

export async function listPublishedCmsPosts(): Promise<CmsBlogPost[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('blog_posts')
    .select(selection)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false });
  if (error) return [];
  return ((data ?? []) as unknown as BlogRow[]).map(mapBlogRow);
}

export async function getPublishedCmsPost(slug: string): Promise<CmsBlogPost | null> {
  const supabase = publicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('blog_posts')
    .select(selection)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .maybeSingle();
  if (error || !data) return null;
  return mapBlogRow(data as unknown as BlogRow);
}
