import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = { title: 'Help Centre' };

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8"><Link href="/"><NurseFitiLogo variant="full" size={48} /></Link></div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">Help Centre</h1>
        <p className="text-neutral-mid mb-8">We&apos;re here to help you pass your NCK exam.</p>
        <div className="grid gap-4">
          {[
            { q: 'How do I reset my password?', a: 'Go to the login page and click "Forgot password?" — we\'ll send a reset link to your email.' },
            { q: 'My M-Pesa payment went through but my plan wasn\'t activated', a: 'Please wait 2–3 minutes and refresh. If still not activated, email support@nursefiti.com with your M-Pesa receipt number.' },
            { q: 'How do I change my exam date or cadre?', a: 'Go to Settings → Exam Settings to update your target exam date and cadre.' },
            { q: 'I can\'t log in to my account', a: 'Make sure you\'ve verified your email after signing up. Check your spam folder for the verification email.' },
            { q: 'How do I contact a tutor after booking?', a: 'After a confirmed booking, the tutor\'s contact details and session join link appear in My Bookings.' },
          ].map(item => (
            <div key={item.q} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
              <h3 className="font-heading font-bold text-[var(--color-text)] mb-2">{item.q}</h3>
              <p className="text-neutral-mid text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-primary rounded-2xl p-6 text-white text-center">
          <p className="font-semibold mb-2">Still need help?</p>
          <a href="mailto:support@nursefiti.com" className="text-accent font-bold hover:underline">support@nursefiti.com</a>
          <span className="mx-3 opacity-40">·</span>
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline">WhatsApp Support</a>
        </div>
        <div className="mt-6 text-center"><Link href="/" className="text-primary hover:underline text-sm">← Back to NurseFiti</Link></div>
      </div>
    </div>
  );
}
