import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Blog — NCK Exam Tips & Guides',
  description: 'Expert guides, revision tips, and study strategies for Kenyan nursing graduates preparing for the NCK licensure exam. KRCHN, BScN, and Higher Diploma resources.',
  openGraph: {
    title: 'Blog — NCK Exam Tips & Guides | NurseFiti',
    description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
    url: 'https://nursefiti.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nursefiti.com/blog',
  },
};

const POSTS = [
  {
    slug: 'nck-exam-preparation-guide-kenya',
    title: 'The Complete NCK Exam Preparation Guide for Kenyan Nursing Graduates (2025)',
    excerpt: 'Everything you need to know about the NCK licensure exam — structure, topics, DigiProctor interface, and a proven study strategy to pass first attempt.',
    category: 'Study Guide',
    readTime: '12 min read',
    date: '2026-05-01',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'krchn-exam-revision-tips',
    title: 'KRCHN Exam Revision Tips: How to Pass the Kenya Registered Community Health Nurse Exam',
    excerpt: 'Targeted revision strategies for KRCHN candidates. Learn which units carry the most marks, how to approach MCQs, and how to use spaced repetition effectively.',
    category: 'KRCHN',
    readTime: '9 min read',
    date: '2026-05-05',
    cadres: ['KRCHN'],
  },
  {
    slug: 'bscn-nursing-exam-kenya',
    title: 'BScN NCK Exam: Unit Breakdown, High-Yield Topics & Study Plan',
    excerpt: 'A detailed breakdown of the BScN NCK exam papers, the highest-yield units, and a 6-week study plan that has helped hundreds of BScN graduates pass first attempt.',
    category: 'BScN',
    readTime: '10 min read',
    date: '2026-05-10',
    cadres: ['BScN'],
  },
  {
    slug: 'nck-past-papers-practice',
    title: 'How to Use NCK Past Papers Effectively (And Why Most Students Do It Wrong)',
    excerpt: 'Past papers are powerful — but only if you use them correctly. Learn the active recall method, how to analyse your mistakes, and when to switch from past papers to timed mock exams.',
    category: 'Study Strategy',
    readTime: '8 min read',
    date: '2026-05-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
  {
    slug: 'digiproctor-nck-exam-guide',
    title: 'DigiProctor NCK Exam: What to Expect and How to Prepare for the Interface',
    excerpt: 'The NCK now uses DigiProctor for computer-based testing. Here\'s exactly what the interface looks like, how navigation works, and how to practice so the technology doesn\'t slow you down on exam day.',
    category: 'Exam Day',
    readTime: '7 min read',
    date: '2026-05-20',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Study Guide': 'bg-primary-light text-primary',
  'KRCHN': 'bg-accent-light text-accent-dark',
  'BScN': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'Study Strategy': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  'Exam Day': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
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
  url: 'https://nursefiti.com/blog',
  description: 'Expert guides and study strategies for Kenyan nursing graduates preparing for the NCK exam.',
  publisher: {
    '@type': 'Organization',
    name: 'NurseFiti',
    url: 'https://nursefiti.com',
  },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `https://nursefiti.com/blog/${p.slug}`,
    datePublished: p.date,
    description: p.excerpt,
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-4">
            📚 NCK Exam Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-text)] mb-4">
            Study Smarter, Pass Faster
          </h1>
          <p className="text-lg text-neutral-mid max-w-2xl mx-auto">
            Expert guides, revision strategies, and exam insights for Kenyan nursing graduates
            preparing for the NCK licensure exam.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${POSTS[0].slug}`}
          className="group block bg-[var(--color-card)] border-2 border-primary/20 hover:border-primary/50 rounded-2xl p-8 mb-8 transition-all hover:shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[POSTS[0].category]}`}>
              {POSTS[0].category}
            </span>
            <span className="text-xs text-neutral-mid">{POSTS[0].readTime}</span>
            <span className="text-xs text-neutral-mid">·</span>
            <span className="text-xs text-neutral-mid">{formatDate(POSTS[0].date)}</span>
            <span className="ml-auto text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
              ⭐ Featured
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-text)] mb-3 group-hover:text-primary transition-colors">
            {POSTS[0].title}
          </h2>
          <p className="text-neutral-mid leading-relaxed mb-4">{POSTS[0].excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {POSTS[0].cadres.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
                {c}
              </span>
            ))}
          </div>
        </Link>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {POSTS.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/40 rounded-2xl p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-xs text-neutral-mid">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-mid leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.cadres.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
                      {c}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-neutral-mid">{formatDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-heading font-bold mb-2">Ready to start practising?</h2>
          <p className="text-primary-light mb-6 max-w-lg mx-auto">
            Reading about the NCK exam is step one. Step two is actually practising — with real exam-style questions, timed mock exams, and a personalised revision plan.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 font-bold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors"
          >
            Start Free — No Credit Card
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
