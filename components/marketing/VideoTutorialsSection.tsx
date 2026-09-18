'use client';

import { useEffect, useRef, useState } from 'react';

export type VideoTutorial = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  duration: string;
  src: string | null;
  poster: string;
};

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'signing-up',
    icon: '✨',
    title: 'Create your account',
    desc: 'Sign up, pick your cadre and institution, take a quick tour, and land on your fresh dashboard.',
    duration: '0:37',
    src: '/videos/tutorials/signing-up.mp4',
    poster: '/images/tutorials/signing-up.jpg',
  },
  {
    id: 'signup-login',
    icon: '🔐',
    title: 'Log in & your dashboard',
    desc: 'Log in and land straight on your personalised dashboard — streak, average score, and study time at a glance.',
    duration: '0:18',
    src: '/videos/tutorials/signup-login.mp4',
    poster: '/images/tutorials/signup-login.jpg',
  },
  {
    id: 'practice-mock-exams',
    icon: '📝',
    title: 'Practice questions',
    desc: 'Resume or start a practice session, answer MCQs, and get instant feedback with a full explanation.',
    duration: '0:27',
    src: '/videos/tutorials/practice-mock-exams.mp4',
    poster: '/images/tutorials/practice-mock-exams.jpg',
  },
  {
    id: 'flashcards-revision',
    icon: '🎴',
    title: 'Flashcards & revision plans',
    desc: 'Review NCK flashcards with spaced repetition and generate a personalised revision schedule.',
    duration: '0:10',
    src: '/videos/tutorials/flashcards-revision.mp4',
    poster: '/images/tutorials/flashcards-revision.jpg',
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'How to read your analytics',
    desc: 'Understand your readiness score, topic breakdowns, and how to decide what to revise next.',
    duration: '0:08',
    src: '/videos/tutorials/analytics.mp4',
    poster: '/images/tutorials/analytics.jpg',
  },
  {
    id: 'tutoring',
    icon: '👨‍🏫',
    title: 'Booking a tutor',
    desc: 'Find a verified tutor for your cadre and book a one-to-one study session.',
    duration: '0:07',
    src: '/videos/tutorials/tutoring.mp4',
    poster: '/images/tutorials/tutoring.jpg',
  },
];

function VideoModal({ tutorial, onClose }: { tutorial: VideoTutorial; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={tutorial.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-heading font-bold text-lg">{tutorial.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden bg-black shadow-2xl aspect-video">
          {tutorial.src ? (
            <video
              className="w-full h-full object-contain"
              src={tutorial.src}
              poster={tutorial.poster}
              controls
              autoPlay
              playsInline
            >
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/70 text-sm px-6 text-center">
              This tutorial video is coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VideoTutorialsSection() {
  const [active, setActive] = useState<VideoTutorial | null>(null);

  return (
    <section id="tutorials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
            Watch how NurseFiti works
          </h2>
          <p className="text-neutral-mid max-w-2xl mx-auto">
            Short video walkthroughs of every core feature — from creating your account to booking a tutor.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_TUTORIALS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className="group text-left bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div
                className="relative aspect-video bg-primary-light dark:bg-dark-mid bg-cover bg-center"
                style={{ backgroundImage: `url(${t.poster})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.8A1 1 0 004.8 3.7v12.6a1 1 0 001.5.9l10.6-6.3a1 1 0 000-1.8L6.3 2.8z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/70 text-white">
                  {t.duration}
                </span>
              </div>
              <div className="p-5">
                <div className="text-2xl mb-2">{t.icon}</div>
                <h3 className="font-heading font-bold text-[var(--color-text)] mb-1.5">{t.title}</h3>
                <p className="text-sm text-neutral-mid leading-relaxed">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {active && <VideoModal tutorial={active} onClose={() => setActive(null)} />}
    </section>
  );
}
