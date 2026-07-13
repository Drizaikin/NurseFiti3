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

// --- MAINTENANCE TOGGLE ---
// Set to false to remove the curtain when auditing is complete
const IS_UNDER_AUDIT = true;

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
      <div className="relative z-10 lg:pl-64 flex flex-col min-h-screen">
        <Topbar />
        
        <main className="p-4 lg:p-6 flex-1 relative">
          {IS_UNDER_AUDIT && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] m-4 lg:m-6 pointer-events-auto" />
              
              <div className="relative z-10 max-w-lg w-full bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Questions Under Audit
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  We are currently performing a comprehensive clinical audit of our entire question bank to ensure the highest standard of accuracy for your NCK exam preparation. 
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-2">
                  <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">
                    Questions, practice tests, and mock exams will be available again in approximately 1 week. We sincerely apologize for the inconvenience!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wrap children in a div that is pointer-events-none if audit is active, to prevent interaction */}
          <div className={IS_UNDER_AUDIT ? "opacity-30 pointer-events-none select-none filter blur-sm transition-all duration-500" : ""}>
            <BadgeProvider>
              {children}
            </BadgeProvider>
          </div>
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
