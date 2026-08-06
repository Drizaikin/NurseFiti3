"use client";

/**
 * OnboardingTour — a modal-based step-by-step orientation shown once to new
 * student and tutor accounts. Skippable at any step.
 * Marks `onboarding_tour_seen = true` on the appropriate profile table when
 * the user completes or skips.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

// ── Step definitions ──────────────────────────────────────────────────────────

interface TourStep {
  emoji: string;
  title: string;
  description: string;
  tip?: string;
}

const STUDENT_STEPS: TourStep[] = [
  {
    emoji: '👋',
    title: 'Welcome to NurseFiti!',
    description: 'NurseFiti is your all-in-one NCK licensure exam prep platform. We\'ll give you a quick tour of the key features — it takes less than a minute.',
    tip: 'You can come back to this guide anytime from Settings.',
  },
  {
    emoji: '📝',
    title: 'Practice Questions',
    description: 'Go to Practice to answer MCQs one by one with instant feedback. The platform tracks which questions you\'ve already answered and always brings you fresh ones — unit by unit.',
    tip: 'Pick a specific subject/unit to focus on what you need most.',
  },
  {
    emoji: '🎯',
    title: 'Mock Exams',
    description: 'Mock Exams simulate the real NCK DigiProctor exam — 100 questions, 2 hours, same format. Questions are spread across all units just like the actual paper.',
    tip: 'Free accounts can unlock mock exams by uploading past exam question files.',
  },
  {
    emoji: '🃏',
    title: 'Flashcards — Now with Themes',
    description: 'Flashcards use spaced repetition (SM-2) to help you memorise key concepts. New: choose from 7 study themes — Clinical Focus, Night Owl, Sakura, Ocean Calm, and more — each designed using colour psychology to optimise memory.',
    tip: 'Available on paid plans. Keyboard shortcuts: Space to flip, 1–4 to rate.',
  },
  {
    emoji: '📝',
    title: 'Mock Exam — Download Results',
    description: 'After submitting a mock exam, you can now download your full results — every question, your answer, the correct answer, and the rationale — as a personal study file.',
    tip: 'Results are watermarked to your account and accessible any time, even after your plan expires.',
  },
  {
    emoji: '🗓️',
    title: 'Revision Plan — Study Resources',
    description: 'Generated revision plans now include a curated Resources section with official Kenyan nursing links, top YouTube channels, MCQ apps, free eBooks, and recommended textbooks.',
    tip: 'Resources are included on every new plan generated going forward.',
  },
  {
    emoji: '📊',
    title: 'Analytics',
    description: 'Your Analytics dashboard shows your readiness score, 7-day study trend, and which units need more attention. Use it to guide your revision.',
    tip: 'Full unit mastery breakdown is available on paid plans.',
  },
  {
    emoji: '🗓️',
    title: 'Revision Plan',
    description: 'Generate a personalised AI revision plan that maps your study schedule between now and your exam date — based on your performance and weak areas.',
    tip: 'One-time generation fee for paid tiers; free with Elite Prep.',
  },
  {
    emoji: '👩‍🏫',
    title: 'Find a Tutor',
    description: 'Browse verified NCK tutors and book a 1-on-1 session on Zoom, Google Meet, or WhatsApp. You can see their specialties, ratings, and available time slots.',
  },
  {
    emoji: '💬',
    title: 'Community Groups',
    description: 'Join or create study groups and chat in real time with other nursing students. KRCHN and BScN students are all in the same space — you can learn from each other.',
    tip: 'Groups are open to all cadres. No segregation.',
  },
  {
    emoji: '⚙️',
    title: 'Settings & Upgrade',
    description: 'Manage your profile, photo, notification preferences, and subscription in Settings. Start with the free plan and upgrade whenever you\'re ready.',
    tip: 'You can add a profile picture from Settings → Profile.',
  },
  {
    emoji: '🚀',
    title: "You're all set!",
    description: 'Head to your dashboard and start practising. The more consistent you are, the better your readiness score — and the more confident you\'ll be on exam day.',
    tip: 'Good luck! The NurseFiti team is rooting for you. 🩺',
  },
];

const TUTOR_STEPS: TourStep[] = [
  {
    emoji: '👋',
    title: 'Welcome to NurseFiti Tutors!',
    description: 'NurseFiti connects verified NCK nursing tutors with students preparing for their licensure exams. Here\'s a quick overview of your dashboard.',
    tip: 'Complete your profile first — students browse tutors before booking.',
  },
  {
    emoji: '👤',
    title: 'Complete Your Profile',
    description: 'Go to My Profile to fill in your bio, experience, cadres you teach, and hourly rate. A complete profile with a photo gets significantly more bookings.',
    tip: 'Minimum 200-character bio required. Add a professional photo — it builds trust.',
  },
  {
    emoji: '✅',
    title: 'Verification',
    description: 'Upload your NCK registration certificate, national ID, and academic qualifications via Complete Profile. Once verified, students can book sessions with you.',
    tip: 'Gold verified tutors appear first in student searches.',
  },
  {
    emoji: '📅',
    title: 'Manage Your Schedule',
    description: 'Set your recurring weekly availability slots in Schedule. Students can only book within these slots — you\'re always in control of your time.',
    tip: 'Add buffer time between sessions to avoid back-to-back bookings.',
  },
  {
    emoji: '📚',
    title: 'Content Studio',
    description: 'In the Studio, you can submit MCQ questions and study notes to the NurseFiti question bank. Approved questions earn you contributor credits.',
  },
  {
    emoji: '👥',
    title: 'Your Students',
    description: 'The Students tab shows all students you have had sessions with, their cadre, progress, and any private notes you\'ve written about them.',
  },
  {
    emoji: '💰',
    title: 'Earnings & Payouts',
    description: 'Track your session earnings and request payouts via M-Pesa through the Earnings dashboard. NurseFiti takes a 23% platform fee per session — you keep 77%.',
  },
  {
    emoji: '⭐',
    title: 'Reviews',
    description: 'Students can leave reviews after sessions. Your average rating and review count appear on your public profile and influence your search ranking.',
  },
  {
    emoji: '🚀',
    title: "You're ready!",
    description: 'Complete your profile, get verified, and set your availability — students are waiting. We\'re glad to have you on the NurseFiti team.',
    tip: 'Questions? Contact us at rizikidan2@gmail.com',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface OnboardingTourProps {
  role: 'student' | 'tutor';
  onComplete: () => void;
}

export function OnboardingTour({ role, onComplete }: OnboardingTourProps) {
  const steps = role === 'student' ? STUDENT_STEPS : TUTOR_STEPS;
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Progress bar */}
        <div className="h-1 bg-[var(--color-border)]">
          <div
            className="h-1 bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step counter + skip */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[var(--color-text-secondary)]">
              {step + 1} of {steps.length}
            </span>
            <button
              onClick={onComplete}
              className="text-xs text-[var(--color-text-secondary)] hover:text-primary transition-colors underline"
            >
              Skip tour
            </button>
          </div>

          {/* Emoji + title */}
          <div className="text-center mb-5">
            <div className="text-5xl mb-3">{current.emoji}</div>
            <h2 className="text-xl font-heading font-bold text-[var(--color-text)] mb-2">
              {current.title}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Tip */}
          {current.tip && (
            <div className="rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 mb-5">
              <p className="text-xs text-primary">
                <span className="font-bold">💡 Tip: </span>
                {current.tip}
              </p>
            </div>
          )}

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mb-5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all ${
                  i === step
                    ? 'w-5 h-2 bg-primary'
                    : i < step
                    ? 'w-2 h-2 bg-primary/40'
                    : 'w-2 h-2 bg-[var(--color-border)]'
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {step > 0 && (
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setStep(s => s - 1)}
              >
                ← Back
              </Button>
            )}
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                if (isLast) {
                  onComplete();
                } else {
                  setStep(s => s + 1);
                }
              }}
            >
              {isLast ? "Let's go! 🚀" : 'Next →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
