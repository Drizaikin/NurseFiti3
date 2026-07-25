import { z } from 'zod';

const optionalText = (max: number) => z.string().trim().max(max).optional().nullable();
const httpUrl = z.string().url().refine(value => ['http:', 'https:'].includes(new URL(value).protocol), 'Use an HTTP or HTTPS URL');
const heroImageUrl = z.union([httpUrl, z.string().regex(/^\/[a-zA-Z0-9/_-]+(?:\.[a-zA-Z0-9]+)?$/), z.literal('')])
  .refine(value => {
    if (!value || value.startsWith('/')) return true;
    const url = new URL(value);
    const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : '';
    return url.hostname === 'www.nursefiti.co.ke'
      || url.hostname === 'images.unsplash.com'
      || (url.hostname === supabaseHostname && url.pathname.startsWith('/storage/v1/object/public/'));
  }, 'Use a NurseFiti, Unsplash, or Supabase image URL');

/** Exported so the orchestrator can validate pipeline-generated hero images with the same rule. */
export const blogHeroImageUrlSchema = heroImageUrl;

export const blogPostFieldsSchema = z.object({
  slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens'),
  title: z.string().trim().min(10).max(120),
  excerpt: z.string().trim().min(40).max(320),
  contentMarkdown: z.string().trim().min(100),
  category: z.string().trim().min(2).max(50),
  cadres: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  heroImageUrl: heroImageUrl.optional().nullable(),
  heroImageAlt: optionalText(180),
  authorName: z.string().trim().min(2).max(100).default('NurseFiti Editorial Team'),
  reviewerName: optionalText(100),
  seoTitle: optionalText(70),
  seoDescription: optionalText(170),
  primaryKeyword: optionalText(100),
  publishedAt: z.string().datetime().optional().nullable(),
  expectedUpdatedAt: z.string().datetime().optional(),
  faqs: z.array(z.object({
    question: z.string().trim().min(5).max(200),
    answer: z.string().trim().min(10).max(1000),
  })).max(20).default([]),
  sources: z.array(z.object({
    label: z.string().trim().min(2).max(200),
    url: httpUrl,
  })).max(30).default([]),
});

export const blogPostInputSchema = blogPostFieldsSchema.superRefine((post, ctx) => {
  if (post.heroImageUrl && !post.heroImageAlt?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['heroImageAlt'], message: 'Image alt text is required when an image is set' });
  }
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

export function blogInputToRow(input: BlogPostInput, userId: string) {
  const publishedAt = input.status === 'published'
    ? (input.publishedAt ?? new Date().toISOString())
    : input.publishedAt;
  return {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    content_markdown: input.contentMarkdown,
    category: input.category,
    cadres: input.cadres,
    status: input.status,
    featured: input.featured,
    hero_image_url: input.heroImageUrl || null,
    hero_image_alt: input.heroImageAlt || null,
    author_name: input.authorName,
    reviewer_name: input.reviewerName || null,
    seo_title: input.seoTitle || null,
    seo_description: input.seoDescription || null,
    primary_keyword: input.primaryKeyword || null,
    faqs: input.faqs,
    sources: input.sources,
    published_at: publishedAt || null,
    created_by: userId,
    updated_by: userId,
  };
}

export function slugifyBlogTitle(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}
