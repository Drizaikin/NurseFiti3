import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = {
  title: 'About NurseFiti',
  description: 'Learn how NurseFiti supports Kenyan nursing graduates with independent, source-led NCK exam preparation and verified tutoring.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About NurseFiti',
    description: 'Our purpose, editorial standards, independence, and approach to NCK exam preparation in Kenya.',
    url: '/about',
    type: 'website',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.nursefiti.co.ke/about#webpage',
      url: 'https://www.nursefiti.co.ke/about',
      name: 'About NurseFiti',
      isPartOf: { '@id': 'https://www.nursefiti.co.ke/#website' },
      about: { '@id': 'https://www.nursefiti.co.ke/#organization' },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://www.nursefiti.co.ke/#organization',
      name: 'NurseFiti',
      url: 'https://www.nursefiti.co.ke',
      logo: 'https://www.nursefiti.co.ke/logo.png',
      areaServed: { '@type': 'Country', name: 'Kenya' },
      knowsAbout: ['NCK exam preparation', 'KRCHN revision', 'BScN exam preparation', 'nursing education in Kenya'],
    },
  ],
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-cream dark:bg-dark px-4 py-12">
      <Script id="about-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex" aria-label="NurseFiti home">
          <NurseFitiLogo variant="full" size={48} />
        </Link>
        <header className="mt-10 mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">About NurseFiti</p>
          <h1 className="mt-3 text-4xl font-heading font-bold text-[var(--color-text)]">
            Focused exam preparation for Kenyan nursing graduates
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-mid">
            NurseFiti is an independent education platform designed to help KRCHN, BScN, and Higher Diploma candidates prepare for Nursing Council of Kenya licensure examinations through active practice and structured revision.
          </p>
        </header>

        <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-[var(--color-text)]">
          <section>
            <h2 className="text-2xl font-heading font-bold">What we provide</h2>
            <p className="mt-3 leading-relaxed text-neutral-mid">
              The platform combines exam-style practice questions, timed mock exams, spaced-repetition flashcards, revision planning, progress analytics, and tutoring from nursing professionals whose credentials are reviewed before they teach.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-heading font-bold">How we handle educational content</h2>
            <p className="mt-3 leading-relaxed text-neutral-mid">
              Public guides are written for exam preparation, checked against cited NCK, Ministry of Health, KEMSA, educational, or professional sources where applicable, and updated when material information changes. Time-sensitive regulatory information should always be verified with the original authority linked in the article.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-heading font-bold">Independence and limitations</h2>
            <p className="mt-3 leading-relaxed text-neutral-mid">
              NurseFiti is not the Nursing Council of Kenya and does not claim NCK approval, certification, partnership, or guaranteed exam outcomes. Our content supports study and revision; it does not replace current clinical guidance, institutional policy, or professional judgment.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-heading font-bold">Contact and policies</h2>
            <p className="mt-3 leading-relaxed text-neutral-mid">
              Questions can be sent to <a className="font-semibold text-primary underline" href="mailto:danotyanga@gmail.com">danotyanga@gmail.com</a>. Read our <Link className="font-semibold text-primary underline" href="/privacy">Privacy Policy</Link> and <Link className="font-semibold text-primary underline" href="/terms">Terms of Service</Link> for more information.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
