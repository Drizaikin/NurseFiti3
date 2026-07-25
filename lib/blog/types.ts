export type BlogPostStatus = 'draft' | 'published' | 'archived';

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSource {
  label: string;
  url: string;
}

export interface BlogPostSummary {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cadres: string[];
  readTime: string;
  date: string;
  updatedAt: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
  source: 'cms' | 'legacy';
}

export interface CmsBlogPost extends BlogPostSummary {
  id: string;
  content: string;
  status: BlogPostStatus;
  authorName: string;
  reviewerName?: string;
  seoTitle?: string;
  seoDescription?: string;
  primaryKeyword?: string;
  faqs: BlogFaq[];
  sources: BlogSource[];
  createdAt: string;
}
