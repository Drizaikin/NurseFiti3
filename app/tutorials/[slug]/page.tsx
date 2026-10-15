import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVideoTutorial, VIDEO_TUTORIALS } from '@/lib/videoTutorials';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';

export function generateStaticParams() {
  return VIDEO_TUTORIALS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const video = getVideoTutorial(params.slug);
  if (!video) return { title: 'Tutorial not found' };

  const canonical = `${siteUrl}/tutorials/${video.slug}`;
  return {
    title: video.title,
    description: video.description,
    alternates: { canonical },
    openGraph: {
      title: video.title,
      description: video.description,
      url: canonical,
      type: 'article',
      images: [{ url: video.poster, alt: video.title }],
    },
  };
}

export default function VideoTutorialPage({ params }: { params: { slug: string } }) {
  const video = getVideoTutorial(params.slug);
  if (!video) notFound();

  const pageUrl = `${siteUrl}/tutorials/${video.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [`${siteUrl}${video.poster}`],
    uploadDate: video.uploadDate,
    duration: `PT${video.durationSeconds}S`,
    contentUrl: `${siteUrl}${video.src}`,
    embedUrl: pageUrl,
    mainEntityOfPage: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'NurseFiti',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-neutral-cream px-4 py-10 text-[var(--color-text)] dark:bg-dark sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-5xl">
        <Link href="/#tutorials" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          <span aria-hidden="true">←</span> All NurseFiti tutorials
        </Link>
        <header className="mb-6 mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">NurseFiti video tutorial</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{video.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-mid">{video.description}</p>
        </header>

        <div className="overflow-hidden rounded-2xl bg-black shadow-premium">
          <video
            className="aspect-video h-auto w-full"
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            width="1280"
            height="720"
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>

        <section className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
          <h2 className="text-xl font-bold">About this tutorial</h2>
          <p className="mt-3 leading-7 text-neutral-mid">{video.description}</p>
          <p className="mt-4 text-sm text-neutral-mid">Explore more ways to prepare with NurseFiti’s practice questions, mock exams, flashcards, and revision tools.</p>
          <Link href="/signup" className="btn-primary mt-6 inline-flex min-h-[48px] items-center">Get started with NurseFiti</Link>
        </section>
      </article>
    </main>
  );
}
