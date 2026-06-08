import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the NurseFiti Terms of Service. Understand your rights and responsibilities when using Kenya\'s NCK exam preparation platform.',
  openGraph: {
    title: 'Terms of Service | NurseFiti',
    description: 'NurseFiti Terms of Service — Kenya\'s NCK exam preparation platform.',
    url: 'https://www.nursefiti.co.ke/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8"><Link href="/"><NurseFitiLogo variant="full" size={48} /></Link></div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">Terms of Service</h1>
        <p className="text-neutral-mid mb-8">Last updated: May 2026</p>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-neutral-mid leading-relaxed">By creating an account on NurseFiti, you agree to these Terms of Service. NurseFiti is an NCK exam preparation platform for Kenyan nursing graduates.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">2. Use of the Platform</h2>
            <p className="text-neutral-mid leading-relaxed">NurseFiti is for personal, non-commercial use. You may not share your account, redistribute content, or use the platform to cheat in official NCK examinations.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">3. Payments & Refunds</h2>
            <p className="text-neutral-mid leading-relaxed">All payments are processed via M-Pesa. Subscription fees are non-refundable once the billing period has started. Session bookings may be cancelled up to 24 hours before the session for a full refund.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">4. Tutor Earnings & Platform Fee</h2>
            <p className="text-neutral-mid leading-relaxed mb-2">
              Tutors registered on NurseFiti earn income from 1-on-1 tutoring sessions booked by students on the platform. The following payment terms apply to all tutor accounts:
            </p>
            <ul className="list-disc list-inside text-neutral-mid leading-relaxed space-y-1 ml-2">
              <li><strong className="text-[var(--color-text)]">Platform fee:</strong> NurseFiti deducts a <strong className="text-[var(--color-text)]">23%</strong> platform fee from each confirmed and paid session.</li>
              <li><strong className="text-[var(--color-text)]">Tutor net earnings:</strong> Tutors receive <strong className="text-[var(--color-text)]">77%</strong> of the gross session amount after the platform fee is applied.</li>
              <li><strong className="text-[var(--color-text)]">Payout schedule:</strong> Payouts are processed once per week, every Monday, via M-Pesa to the number registered on the tutor&apos;s profile.</li>
              <li><strong className="text-[var(--color-text)]">Minimum payout:</strong> The minimum payout threshold is KSh 1,000. Earnings below this amount carry over to the following Monday.</li>
              <li><strong className="text-[var(--color-text)]">Gross amount:</strong> The session gross amount is calculated as <em>(duration in hours × hourly rate)</em>, rounded to the nearest KSh.</li>
              <li><strong className="text-[var(--color-text)]">Rate setting:</strong> Tutors set their own hourly rate. NurseFiti reserves the right to display this rate publicly on the platform.</li>
            </ul>
            <p className="text-neutral-mid leading-relaxed mt-3">
              NurseFiti reserves the right to adjust the platform fee percentage with 30 days&apos; written notice to active tutors via their registered email address. The current applicable rate is always displayed in the tutor&apos;s Earnings dashboard and in the tutor onboarding guide.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">4. Content</h2>
            <p className="text-neutral-mid leading-relaxed">All MCQs, flashcards, and study materials on NurseFiti are for exam preparation purposes only. They do not constitute medical advice.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">5. Contact</h2>
            <p className="text-neutral-mid">Questions? Email <a href="mailto:support@nursefiti.vercel.app" className="text-primary hover:underline">support@nursefiti.vercel.app</a></p>
          </section>
        </div>
        <div className="mt-6 text-center"><Link href="/" className="text-primary hover:underline text-sm">← Back to NurseFiti</Link></div>
      </div>
    </div>
  );
}
