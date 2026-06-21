import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Blog — NCK Exam Tips & Guides',
  description: 'Expert guides, revision tips, and study strategies for Kenyan nursing graduates preparing for the NCK licensure exam. KRCHN, BScN, and Higher Diploma resources.',
  openGraph: {
    title: 'Blog — NCK Exam Tips & Guides | NurseFiti',
    description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
    url: 'https://www.nursefiti.co.ke/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.nursefiti.co.ke/blog',
  },
};

const POSTS = [
  {
    slug: 'fathers-day-appreciation-dads-role',
    title: 'The Unsung Heroes: Celebrating the Significance of Dads this Father\\'s Day',
    excerpt: 'A heartfelt reflection on the evolving role of fathers, their impact on our resilience, and why their presence is irreplaceable in our lives.',
    category: 'Community',
    readTime: '3 min read',
    date: '2026-06-21',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'nck-exam-study-internship-guide',
    title: 'How to Study for NCK Exam While Working as an Intern (2026)',
    excerpt: 'Demanding nursing internship in Kenya? Learn a practical study routine, high-yield topics, and how to prepare for the NCK exam and pass first attempt.',
    category: 'Study Strategy',
    readTime: '9 min read',
    date: '2026-06-20',
    cadres: ['KRCHN', 'BScN'],
  },
  {
    slug: 'nck-august-2026-exam-prep-plan',
    title: 'NCK August 2026 Exam: Dates, Registration & 8-Week Prep',
    excerpt: 'The NCK August 2026 sitting is roughly 8 weeks away. Here are the confirmed dates, registration steps, and a week-by-week prep plan to pass first attempt.',
    category: 'NCK News',
    readTime: '10 min read',
    date: '2026-06-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'nck-latest-news-june-2026',
    title: 'NCK June 2026: Feb Results, May Exam & Unaccredited College Warning',
    excerpt: 'NCK releases February 2026 results, May 2026 exam wraps up, and a formal warning is issued against Northlands NIMTC. Here is everything verified.',
    category: 'NCK News',
    readTime: '6 min read',
    date: '2026-06-05',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'nck-exam-preparation-guide-kenya',
    title: 'NCK Exam Preparation Guide: Pass First Attempt (2026)',
    excerpt: 'Everything Kenyan nursing graduates need — exam structure, DigiProctor tips, and a proven 8-week study strategy for KRCHN, BScN and Higher Diploma.',
    category: 'Study Guide',
    readTime: '12 min read',
    date: '2026-05-01',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'krchn-exam-revision-tips',
    title: 'KRCHN Exam: How to Pass Paper I and Paper II (2026)',
    excerpt: 'Targeted revision for KRCHN candidates — what each paper tests, the ABCDE framework for MCQs, a 4-week plan, and the key numbers NCK will test you on.',
    category: 'KRCHN',
    readTime: '9 min read',
    date: '2026-05-05',
    cadres: ['KRCHN'],
  },
  {
    slug: 'bscn-nursing-exam-kenya',
    title: 'BScN NCK Exam: High-Yield Topics & 6-Week Study Plan (2026)',
    excerpt: 'Unit breakdown for BScN Paper I and Paper II, the highest-yield topics, and a structured 6-week plan built around the NCK competency exam format.',
    category: 'BScN',
    readTime: '10 min read',
    date: '2026-05-10',
    cadres: ['BScN'],
  },
  {
    slug: 'nck-past-papers-practice',
    title: 'NCK Past Papers: How to Use Them (Most Students Get This Wrong)',
    excerpt: 'Passive reading of past papers is almost useless. Learn the retrieval-practice method, how to categorise errors, and when to switch to timed mock exams.',
    category: 'Study Strategy',
    readTime: '8 min read',
    date: '2026-05-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'digiproctor-nck-exam-guide',
    title: 'DigiProctor NCK Exam Interface: What to Expect (2026)',
    excerpt: 'The NCK exam runs on DigiProctor CBT. Here is exactly what the interface looks like, how the navigator grid works, and how to practise so it is not new on exam day.',
    category: 'Exam Day',
    readTime: '7 min read',
    date: '2026-05-20',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'nck-exam-anxiety-how-to-manage-it',
    title: 'NCK Exam Anxiety: 7 Evidence-Based Strategies That Work (2026)',
    excerpt: 'Exam anxiety costs Kenyan nursing candidates real marks. Here are 7 strategies backed by cognitive and clinical research — practical, not generic.',
    category: 'Study Strategy',
    readTime: '9 min read',
    date: '2026-06-08',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'nck-pharmacology-calculations-guide',
    title: 'NCK Pharmacology & Drug Calculations: Complete Guide (2026)',
    excerpt: 'Pharmacology and drug calculations appear in every NCK paper. Master the formulas, common KEML drugs, and calculation question patterns with worked examples.',
    category: 'Study Guide',
    readTime: '11 min read',
    date: '2026-06-09',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
];

const CATEGORY_STYLES: Record<string, { badge: string }> = {
  'Study Guide':    { badge: 'bg-primary-light text-primary border border-primary/20' },
  'KRCHN':          { badge: 'bg-accent-light text-accent-dark border border-accent/20' },
  'BScN':           { badge: 'bg-primary-light text-primary-mid border border-primary-mid/20' },
  'Study Strategy': { badge: 'bg-accent-light text-accent-dark border border-accent/30' },
  'Exam Day':       { badge: 'bg-[#FFF0F0] text-error border border-error/20 dark:bg-error/10 dark:text-error' },
  'NCK News':       { badge: 'bg-primary-xlight text-primary border border-primary/30' },
  'Community':      { badge: 'bg-accent-light text-accent-dark border border-accent/20' },
};

const POST_IMAGES: Record<string, string> = {
  'fathers-day-appreciation-dads-role': 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80&auto=format&fit=crop',
  'nck-exam-study-internship-guide':   'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80&auto=format&fit=crop',
  'nck-august-2026-exam-prep-plan':    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
  'nck-latest-news-june-2026':         'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&auto=format&fit=crop',
  'nck-exam-preparation-guide-kenya':  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
  'krchn-exam-revision-tips':          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop',
  'bscn-nursing-exam-kenya':           'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80&auto=format&fit=crop',
  'nck-past-papers-practice':          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
  'digiproctor-nck-exam-guide':        'https://images.unsplash.com/photo-1588776814546-1ffbb9b0ea79?w=800&q=80&auto=format&fit=crop',
  'nck-exam-anxiety-how-to-manage-it': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop',
  'nck-pharmacology-calculations-guide': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&auto=format&fit=crop',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const blogListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'NurseFiti Blog',
  url: 'https://www.nursefiti.co.ke/blog',
  description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
  publisher: {
    '@type': 'Organization',
    name: 'NurseFiti',
    url: 'https://www.nursefiti.co.ke',
  },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `https://www.nursefiti.co.ke/blog/${p.slug}`,
    datePublished: p.date,
    description: p.excerpt,
    author: { '@type': 'Organization', name: 'NurseFiti', url: 'https://www.nursefiti.co.ke' },
    keywords: p.cadres.join(', '),
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <Script
        id="json-ld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold border border-primary/20 mb-4">
            📚 NCK Exam Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-text)] mb-4">
            Study Smarter,{' '}
            <span className="text-gradient-teal">Pass Faster</span>
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
          const featured = POSTS[0];
          const featuredCat = CATEGORY_STYLES[featured.category] ?? CATEGORY_STYLES['Study Guide'];
          const featuredImg = POST_IMAGES[featured.slug];
          return (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden mb-8 transition-all hover:shadow-card-hover"
              style={{ background: 'var(--color-card)', border: '2px solid rgba(8,81,79,0.15)' }}
            >
              {/* Hero image */}
              {featuredImg && (
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredImg}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
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
          {POSTS.slice(1).map((post) => {
            const catStyle = CATEGORY_STYLES[post.category] ?? CATEGORY_STYLES['Study Guide'];
            const imgUrl = POST_IMAGES[post.slug];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/40 rounded-2xl overflow-hidden transition-all hover:shadow-card-hover"
              >
                {/* Card image */}
                {imgUrl && (
                  <div className="relative h-36 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
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
