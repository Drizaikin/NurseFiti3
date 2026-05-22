import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = { title: 'Terms of Service' };

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
