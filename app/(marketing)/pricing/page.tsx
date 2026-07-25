export const revalidate = 300;

import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqSection } from '@/components/marketing/FaqSection';
import { JsonLd } from '@/components/marketing/JsonLd';
import { createClient } from '@/lib/supabase/server';
import { fetchPlatformSettings } from '@/lib/platformSettings';
import { getPublicPlans, ORGANIZATION_ID, SITE_URL } from '@/lib/publicProducts';

const title = 'NurseFiti pricing and NCK exam preparation plans';
const description = 'Compare current NurseFiti prices and plan limits for practice questions, mock exams, flashcards, revision plans, analytics, and study support.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/pricing`,
    siteName: 'NurseFiti',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'NurseFiti pricing and preparation plans' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/opengraph-image`] },
};

const faqs = [
  { question: 'Can I start without paying?', answer: 'Yes. The Test Yourself plan is free and currently includes 20 practice questions per day, basic analytics, community groups, and tutor booking access.' },
  { question: 'Do plan prices include tutor sessions?', answer: 'No. A preparation plan gives access to the listed platform features. One-to-one tutor sessions are booked and paid for separately at the rate displayed before booking.' },
  { question: 'When do weekly mock exam limits reset?', answer: 'Weekly mock exam allowances reset on Monday at 00:00 East Africa Time. Premium currently has no hard weekly plan cap.' },
  { question: 'Does a paid plan guarantee an examination result?', answer: 'No. Paid plans provide additional study tools and access. Results depend on many factors, and NurseFiti does not guarantee a pass or any specific score.' },
  { question: 'How are payments made?', answer: 'Available payment instructions are shown during checkout. Review the amount and access period before confirming a purchase.' },
];

export default async function PricingPage() {
  const settings = await fetchPlatformSettings(createClient() as any);
  const plans = getPublicPlans(settings);
  const pricingUrl = `${SITE_URL}/pricing`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pricingUrl}#webpage`,
        url: pricingUrl,
        name: title,
        description,
        inLanguage: 'en-KE',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${pricingUrl}#catalog` },
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${pricingUrl}#catalog`,
        name: 'NurseFiti preparation plans',
        url: pricingUrl,
        provider: { '@id': ORGANIZATION_ID },
        itemListElement: plans.map((plan) => ({
          '@type': 'Offer',
          name: plan.label,
          price: plan.amountKsh,
          priceCurrency: 'KES',
          url: `${SITE_URL}/signup`,
          description: plan.description,
          seller: { '@id': ORGANIZATION_ID },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pricingUrl}#faq`,
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={jsonLd} />
      <section className="relative overflow-hidden px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Current plans and limits</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">Choose access that fits your revision window</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-mid">Start with daily practice or choose broader access when you need mock exams, flashcards, revision planning, and deeper analytics.</p>
          <p className="mt-4 text-sm text-neutral-mid">Prices below are loaded from NurseFiti&apos;s current platform settings. Tutor sessions are priced separately.</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-5 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => (
            <article key={plan.tier} className={`relative flex flex-col rounded-2xl border p-6 shadow-card ${plan.highlight ? 'border-accent bg-accent-light/60 xl:-translate-y-3' : 'border-[var(--color-border)] bg-[var(--color-card)]'}`}>
              {plan.highlight && <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-dark">Popular weekly option</span>}
              <p className="text-sm font-bold uppercase tracking-wider text-primary">{plan.label}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-heading text-3xl font-bold text-[var(--color-text)]">{plan.price}</span>
                <span className="pb-1 text-sm text-neutral-mid">{plan.period}</span>
              </div>
              <p className="mt-4 min-h-16 text-sm leading-6 text-neutral-mid">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-[var(--color-border)] pt-6 text-sm">
                {plan.features.map((feature) => {
                  const unavailable = feature.includes('not included');
                  return (
                    <li key={feature} className={`flex gap-2 leading-5 ${unavailable ? 'text-neutral-light' : 'text-[var(--color-text)]'}`}>
                      <span aria-hidden="true" className={unavailable ? 'text-neutral-light' : 'text-success'}>{unavailable ? '-' : '\u2713'}</span>
                      {feature}
                    </li>
                  );
                })}
              </ul>
              <Link href="/signup" className={`${plan.highlight ? 'btn-primary' : 'btn-secondary'} mt-7 w-full min-h-[48px] text-center`}>
                {plan.tier === 'free' ? 'Start free' : `Choose ${plan.label}`}
              </Link>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-4xl text-center text-sm leading-6 text-neutral-mid">
          Limits describe platform access, not expected results. Availability and prices may change; the amount shown at checkout is the amount payable for the selected access period.
        </p>
      </section>

      <section className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Not sure where to start?</p>
            <h2 className="mt-3 text-3xl font-bold">Try daily questions before choosing more access</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/75">The free plan gives you a practical way to assess the study experience without committing to a paid preparation plan.</p>
          </div>
          <Link href="/practice-questions" className="btn-primary min-h-[52px]">Explore practice questions</Link>
        </div>
      </section>

      <FaqSection items={faqs} title="Pricing questions, answered plainly" />
    </main>
  );
}
