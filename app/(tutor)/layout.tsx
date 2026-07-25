import type { Metadata } from 'next';
import { TutorSidebar } from '@/components/tutor/TutorSidebar';
import { TutorTopbar } from '@/components/tutor/TutorTopbar';
import { TutorOnboardingTourGate } from '@/components/tutor/OnboardingTourGate';
import { ActivityTracker } from '@/components/student/ActivityTracker';

// All tutor pages are dynamic — they require auth and live Supabase data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Tutor Dashboard',
    template: '%s | NurseFiti',
  },
  description: 'Manage your tutoring schedule, students, earnings, and content on NurseFiti.',
  robots: { index: false, follow: false },
};

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative">
      {/* Dark-mode ambient glow — amber top-right, teal center-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 88% 8%, rgba(245,166,35,0.10) 0%, transparent 65%),' +
            'radial-gradient(ellipse 50% 55% at 8% 55%, rgba(14,100,92,0.15) 0%, transparent 65%)',
        }}
      />

      <TutorSidebar />

      <div className="relative z-10 lg:pl-64">
        <TutorTopbar />
        <main id="main-content" className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Onboarding tour — shown once to new tutor accounts */}
      <TutorOnboardingTourGate />

      {/* Activity tracking — login + page visit events for admin analytics */}
      <ActivityTracker />
    </div>
  );
}
