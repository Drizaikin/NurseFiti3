import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the NurseFiti Privacy Policy. Learn how we collect, use, and protect your data on Kenya\'s NCK exam preparation platform.',
  openGraph: {
    title: 'Privacy Policy | NurseFiti',
    description: 'NurseFiti Privacy Policy — how we protect your data.',
    url: 'https://nursefiti.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8"><Link href="/"><NurseFitiLogo variant="full" size={48} /></Link></div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">Privacy Policy</h1>
        <p className="text-neutral-mid mb-8">Last updated: May 2026</p>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">1. Data We Collect</h2>
            <p className="text-neutral-mid leading-relaxed">We collect your name, email, phone number, institution, and exam details when you register. We also collect your practice answers and performance data to personalise your study experience.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">2. How We Use Your Data</h2>
            <p className="text-neutral-mid leading-relaxed">Your data is used to provide the NurseFiti service — personalised study recommendations, progress tracking, tutor matching, and M-Pesa payment processing. We do not sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">3. Data Storage</h2>
            <p className="text-neutral-mid leading-relaxed">Your data is stored securely on Supabase (PostgreSQL) with row-level security. All data is encrypted in transit via HTTPS.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">4. Your Rights</h2>
            <p className="text-neutral-mid leading-relaxed">You can request deletion of your account and all associated data at any time by emailing support@nursefiti.vercel.app. We will process deletion requests within 30 days.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">5. Contact</h2>
            <p className="text-neutral-mid">Privacy questions? Email <a href="mailto:support@nursefiti.vercel.app" className="text-primary hover:underline">support@nursefiti.vercel.app</a></p>
          </section>
        </div>
        <div className="mt-6 text-center"><Link href="/" className="text-primary hover:underline text-sm">← Back to NurseFiti</Link></div>
      </div>
    </div>
  );
}
