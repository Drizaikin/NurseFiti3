import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { listPublishedCmsPosts } from '@/lib/blog/cms';
import type { BlogPostSummary } from '@/lib/blog/types';
import { serializeJsonLd } from '@/lib/jsonLd';

export const metadata: Metadata = {
  title: 'Blog — NCK Exam Tips & Guides',
  description: 'Expert guides, revision tips, and study strategies for Kenyan nursing graduates preparing for the NCK licensure exam. KRCHN, BScN, and Higher Diploma resources.',
  openGraph: {
    title: 'Blog — NCK Exam Tips & Guides | NurseFiti',
    description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
    url: '/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

import { POSTS, CATEGORY_STYLES, POST_IMAGES } from '@/lib/blogData';

export const revalidate = 300;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const legacyPosts: BlogPostSummary[] = POSTS.map(post => ({
    ...post,
    updatedAt: post.date,
    imageUrl: POST_IMAGES[post.slug],
    imageAlt: post.title,
    source: 'legacy',
  }));
  const merged = new Map(legacyPosts.map(post => [post.slug, post]));
  for (const post of await listPublishedCmsPosts()) merged.set(post.slug, post);
  const sortedPosts = Array.from(merged.values()).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.nursefiti.co.ke/blog#blog',
    name: 'NurseFiti Blog',
    url: 'https://www.nursefiti.co.ke/blog',
    description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
    publisher: { '@type': 'Organization', '@id': 'https://www.nursefiti.co.ke/#organization', name: 'NurseFiti', url: 'https://www.nursefiti.co.ke' },
    blogPost: sortedPosts.map(post => ({
      '@type': 'BlogPosting', headline: post.title,
      url: `https://www.nursefiti.co.ke/blog/${post.slug}`,
      datePublished: post.date, dateModified: post.updatedAt,
      description: post.excerpt,
      ...(post.imageUrl ? { image: post.imageUrl } : {}),
      author: { '@type': 'Organization', '@id': 'https://www.nursefiti.co.ke/#organization', name: 'NurseFiti' },
      keywords: post.cadres.join(', '),
    })),
  };
  return (
    <>
      <Script
        id="json-ld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogListJsonLd) }}
      />

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold border border-primary/20 mb-4">
            📚 NCK Exam Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-text)] mb-4">
            Study Smarter,{' '}
            <span className="text-gradient-teal">Prepare Better</span>
          </h1>
          <p className="text-lg text-neutral-mid max-w-2xl mx-auto">
            Expert guides, revision strategies, and exam insights for Kenyan nursing graduates
            preparing for the NCK licensure exam.
          </p>
          {/* Accent divider */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-0.5 w-8 rounded-full bg-accent" />
            <div className="h-0.5 w-16 rounded-full bg-primary" />
            <div className="h-0.5 w-8 rounded-full bg-accent" />
          </div>
        </div>

        {/* Featured post */}
        {(() => {
          const featured = sortedPosts[0];
          const featuredCat = CATEGORY_STYLES[featured.category] ?? CATEGORY_STYLES['Study Guide'];
          const featuredImg = featured.imageUrl;
          return (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden mb-8 transition-all hover:shadow-card-hover"
              style={{ background: 'var(--color-card)', border: '2px solid rgba(8,81,79,0.15)' }}
            >
              {/* Hero image */}
              {featuredImg && (
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  <Image
                    src={featuredImg}
                      alt={featured.imageAlt ?? featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 1024px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(8,81,79,0.05) 0%, rgba(8,81,79,0.55) 100%)' }}
                  />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${featuredCat.badge}`}>
                      {featured.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-dark">
                      ⭐ Featured
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {!featuredImg && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${featuredCat.badge}`}>
                      {featured.category}
                    </span>
                  )}
                  <span className="text-xs text-neutral-mid">{featured.readTime}</span>
                  <span className="text-neutral-light">·</span>
                  <span className="text-xs text-neutral-mid">{formatDate(featured.date)}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-text)] mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-neutral-mid leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.cadres.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })()}

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedPosts.slice(1).map((post) => {
            const catStyle = CATEGORY_STYLES[post.category] ?? CATEGORY_STYLES['Study Guide'];
            const imgUrl = post.imageUrl;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/40 rounded-2xl overflow-hidden transition-all hover:shadow-card-hover"
              >
                {imgUrl && (
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={post.imageAlt ?? post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,81,79,0.40) 100%)' }}
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${catStyle.badge}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-mid">{post.readTime}</span>
                  </div>
                  <h2 className="text-base font-heading font-bold text-[var(--color-text)] mb-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-mid leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.cadres.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary/10">
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-neutral-mid">{formatDate(post.date)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center text-white overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #08514F 0%, #0A6865 60%, #133828 100%)' }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <p className="text-3xl mb-2">🎯</p>
            <h2 className="text-2xl font-heading font-bold mb-2">Ready to start practising?</h2>
            <p className="text-primary-light mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              Reading about the NCK exam is step one. Step two is actually practising — with real exam-style questions, timed mock exams, and a personalised revision plan.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #F5A623 0%, #C47F0A 100%)', color: '#0F1C1C', boxShadow: '0 0 20px rgba(245,166,35,0.40)' }}
            >
              Start Free — No Credit Card
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
