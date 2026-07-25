import { MetadataRoute } from 'next';
import { POSTS } from '@/lib/blogData';
import { listPublishedCmsPosts } from '@/lib/blog/cms';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUpdated = new Date('2026-07-18');
  const cmsPosts = await listPublishedCmsPosts();
  const mergedPosts = new Map(POSTS.map(post => [post.slug, {
    slug: post.slug,
    date: post.date,
    updatedAt: post.date,
  }]));
  for (const post of cmsPosts) mergedPosts.set(post.slug, post);
  const posts = Array.from(mergedPosts.values());
  const latestPostDate = new Date(
    Math.max(...posts.map((post) => new Date(post.updatedAt).getTime()))
  );
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogEntries,
    {
      url: `${baseUrl}/pricing`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...[
      'practice-questions',
      'mock-exams',
      'nck-flashcards',
      'revision-plans',
      'tutoring',
    ].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdated,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdated,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tutor-agreement`,
      lastModified: siteUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
