import type { Metadata } from 'next';
import { Sidebar } from '@/components/student/Sidebar';
import { Topbar } from '@/components/student/Topbar';
import { OnboardingTourGate } from '@/components/student/OnboardingTourGate';
import { ActivityTracker } from '@/components/student/ActivityTracker';
import { BadgeProvider } from '@/components/student/BadgeProvider';
import { WhatsNewProvider } from '@/components/student/WhatsNewProvider';

// All student pages are dynamic — they require auth and live Supabase data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Student Dashboard',
    template: '%s | NurseFiti',
  },
  description: 'Your personalised NCK exam preparation dashboard. Practice MCQs, take mock exams, review flashcards, and track your progress.',
  robots: { index: false, follow: false },
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative">

      {/*
        ── Dark-mode ambient glow layer ──────────────────────────────────
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 88% 8%, rgba(245,166,35,0.13) 0%, transparent 65%),' +
            'radial-gradient(ellipse 50% 55% at 8% 55%,  rgba(14,100,92,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="relative z-10 lg:pl-64">
        <Topbar />
        <main className="p-4 lg:p-6">
          <BadgeProvider>
            {children}
          </BadgeProvider>
        </main>
      </div>

      {/* Onboarding tour — shown once to new accounts */}
      <OnboardingTourGate />

      {/* What's New — animated modal shown on each new release, with floating re-open trigger */}
      <WhatsNewProvider />

      {/* Activity tracking — login + page visit events for admin analytics */}
      <ActivityTracker />
    </div>
  );
}
