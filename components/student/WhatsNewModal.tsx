"use client";

/**
 * WhatsNewModal — animated "What's New" notification modal
 *
 * HOW TO ADD NEW RELEASES
 * ────────────────────────
 * 1. Increment CURRENT_VERSION (e.g. 3 → 4)
 * 2. Add a new entry to WHATS_NEW_RELEASES with:
 *    - version: the new integer
 *    - date: human-readable release date
 *    - items: array of feature announcements
 *
 * Each item has:
 *   - icon:        emoji displayed large in the slide
 *   - tag:         short pill label (e.g. "New", "Updated", "Fixed")
 *   - tagColor:    Tailwind bg + text classes for the pill
 *   - title:       headline
 *   - description: 1-2 sentence explanation
 *   - cta:         optional { label, href } for a "Take me there" button
 *
 * The modal will show automatically to every student who hasn't seen that version.
 * It will NOT re-show if the student has already dismissed it (stored in localStorage).
 */

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// ❶  RELEASES REGISTRY — edit here to announce new features
// ─────────────────────────────────────────────────────────────────────────────

const CURRENT_VERSION = 5;

interface WhatsNewItem {
  icon: string;
  tag: string;
  tagColor: string; // Tailwind classes
  title: string;
  description: string;
  cta?: { label: string; href: string };
}

interface WhatsNewRelease {
  version: number;
  date: string;
  items: WhatsNewItem[];
}

const WHATS_NEW_RELEASES: WhatsNewRelease[] = [
  // ── Version 1 — initial platform launch ───────────────────────────────────
  {
    version: 1,
    date: "May 2026",
    items: [
      {
        icon: "🚀",
        tag: "Launch",
        tagColor: "bg-primary/20 text-primary",
        title: "Welcome to NurseFiti!",
        description:
          "Your personalised NCK exam prep platform is live. Practice MCQs, sit timed mock exams, and track your progress — all in one place.",
        cta: { label: "Go to Dashboard", href: "/dashboard" },
      },
      {
        icon: "📚",
        tag: "Feature",
        tagColor: "bg-blue-500/20 text-blue-400",
        title: "Practice Questions",
        description:
          "Hundreds of NCK past-paper MCQs with detailed rationales. Filter by unit, track weak areas, and drill until you're confident.",
        cta: { label: "Start Practising", href: "/practice" },
      },
      {
        icon: "⏱️",
        tag: "Feature",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Mock Exams",
        description:
          "Full timed papers that mirror the real NCK CBT format — Paper I and Paper II, by cadre. Results and score breakdown after each attempt.",
        cta: { label: "Take a Mock Exam", href: "/mock-exam" },
      },
    ],
  },

  // ── Version 2 ─────────────────────────────────────────────────────────────
  {
    version: 2,
    date: "June 2026",
    items: [
      {
        icon: "🃏",
        tag: "New",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Flashcards",
        description:
          "Spaced-repetition flashcard decks across all NCK units. Rate cards as Again / Hard / Good / Easy and the system schedules your reviews automatically.",
        cta: { label: "Open Flashcards", href: "/flashcards" },
      },
      {
        icon: "📊",
        tag: "New",
        tagColor: "bg-violet-500/20 text-violet-400",
        title: "Analytics Dashboard",
        description:
          "See your accuracy by unit, score trends over time, and which topics need the most attention — all in one visual dashboard.",
        cta: { label: "View Analytics", href: "/analytics" },
      },
    ],
  },

  // ── Version 3 — NCK Compilation seeded (current release) ──────────────────
  {
    version: 3,
    date: "26 June 2026",
    items: [
      {
        icon: "📝",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "186 New NCK Past-Paper Questions Added",
        description:
          "We've just seeded the full NCK MCQ Compilation (2006–2025) — covering BScN & KRCHN across Pharmacology, Microbiology, Midwifery, Community Health, Mental Health, Research, and Leadership. All questions have verified rationales.",
        cta: { label: "Start Practising", href: "/practice" },
      },
      {
        icon: "🎯",
        tag: "Coverage",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Years 2006, 2007, 2008, 2018, 2019 & 2025 Now Live",
        description:
          "Past papers from six exam years are now available in both Practice mode and Mock Exams. Questions are distributed across Paper I and Paper II exactly as the NCK CBT blueprint requires.",
        cta: { label: "Take a Mock Exam", href: "/mock-exam" },
      },
      {
        icon: "🏥",
        tag: "Updated",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Rationales Audited Against MOH Kenya & Latest Protocols",
        description:
          "Every answer and rationale was cross-checked against current MOH Kenya guidelines, WHO protocols, IMNCI, NASCOP ART guidelines, and Myles Textbook for Midwives. No shortcuts.",
        cta: { label: "Practice Now", href: "/practice" },
      },
    ],
  },
  // ── Version 4 — Flag Question Feature ──────────────────────────────────────
  {
    version: 4,
    date: "26 June 2026",
    items: [
      {
        icon: "🚩",
        tag: "New Feature",
        tagColor: "bg-red-500/20 text-red-500",
        title: "Report Question Errors",
        description:
          "Found a typo or disagree with an answer? You can now flag questions directly while practising! Your reports go straight to our clinical review team to ensure top-notch accuracy.",
        cta: { label: "Practice Now", href: "/practice" },
      },
    ],
  },
  // ── Version 5 — Flashcards Batch 3 ──────────────────────────────────────────
  {
    version: 5,
    date: "27 June 2026",
    items: [
      {
        icon: "🎴",
        tag: "New Flashcards",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Midwifery and Anatomy & Physiology Flashcards Added",
        description:
          "We've added 30 new high-yield spaced repetition flashcards covering Midwifery Essentials (PPH, eclampsia, AMTSL) and Anatomy & Physiology (cardiac conduction, renal physiology). Perfect for quick reviews!",
        cta: { label: "Study Flashcards", href: "/flashcards" },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ❷  STORAGE KEY — versioned so each release shows exactly once
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = `whats_new_seen_v${CURRENT_VERSION}`;

// ─────────────────────────────────────────────────────────────────────────────
// ❸  COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface WhatsNewModalProps {
  /** If true, show regardless of localStorage (used when user re-opens via trigger) */
  forceOpen?: boolean;
  /** Called when the modal is closed in force-open mode */
  onForceClose?: () => void;
}

export function WhatsNewModal({ forceOpen = false, onForceClose }: WhatsNewModalProps = {}) {
  const router = useRouter();
  const [show, setShow] = useState(forceOpen);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Find the release that matches the current version
  const release = WHATS_NEW_RELEASES.find((r) => r.version === CURRENT_VERSION);
  const items = release?.items ?? [];
  const total = items.length;

  useEffect(() => {
    if (forceOpen) {
      // Controlled externally — always show
      setShow(true);
      return;
    }
    // Auto-show: only if user hasn't seen this version
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setShow(true);
    } catch {
      // localStorage blocked (private mode, etc.) — don't show
    }
  }, [forceOpen]);

  const dismiss = useCallback(() => {
    if (!forceOpen) {
      // Only persist dismissal for auto-show (not force-open re-views)
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch { /* ignore */ }
    }
    setShow(false);
    setSlideIndex(0); // reset for next time it's opened
    onForceClose?.();
  }, [forceOpen, onForceClose]);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > slideIndex ? 1 : -1);
      setSlideIndex(idx);
    },
    [slideIndex]
  );

  const handleNext = useCallback(() => {
    if (slideIndex < total - 1) {
      goTo(slideIndex + 1);
    } else {
      dismiss();
    }
  }, [slideIndex, total, goTo, dismiss]);

  const handlePrev = useCallback(() => {
    if (slideIndex > 0) goTo(slideIndex - 1);
  }, [slideIndex, goTo]);

  const handleCta = useCallback(
    (href: string) => {
      dismiss();
      router.push(href);
    },
    [dismiss, router]
  );

  if ((!show && !forceOpen) || items.length === 0) return null;

  const current = items[slideIndex];

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <AnimatePresence>
      {(show || forceOpen) && (
        /* ── Backdrop ──────────────────────────────────────────────────── */
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Blurred dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* ── Card ──────────────────────────────────────────────────── */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.85, y: 48, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 32, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* Ambient glow behind card */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, var(--color-accent, #3B82F6) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden">

              {/* ── Header bar ─────────────────────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <div className="flex items-center gap-2.5">
                  {/* Animated star/sparkle */}
                  <motion.span
                    className="text-lg"
                    animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                    aria-hidden="true"
                  >
                    ✨
                  </motion.span>
                  <span className="text-sm font-bold text-[var(--color-text)] tracking-wide">
                    What&apos;s New
                  </span>
                  {release && (
                    <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                      · {release.date}
                    </span>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={dismiss}
                  className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label="Dismiss what's new"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Slide area (fixed height to prevent layout shift) ───── */}
              <div className="relative overflow-hidden" style={{ minHeight: 300 }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={slideIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    className="px-6 pt-7 pb-4"
                  >
                    {/* Icon */}
                    <motion.div
                      className="flex justify-center mb-5"
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.08 }}
                    >
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-border) 100%)",
                        }}
                      >
                        {current.icon}
                      </div>
                    </motion.div>

                    {/* Tag pill */}
                    <motion.div
                      className="flex justify-center mb-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${current.tagColor}`}>
                        {current.tag}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      className="text-xl font-heading font-bold text-[var(--color-text)] text-center mb-2 leading-snug"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {current.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="text-sm text-[var(--color-text-secondary)] text-center leading-relaxed mb-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {current.description}
                    </motion.p>

                    {/* CTA */}
                    {current.cta && (
                      <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32 }}
                      >
                        <button
                          onClick={() => handleCta(current.cta!.href)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                        >
                          {current.cta.label}
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 0.5 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Footer: dots + navigation ───────────────────────────── */}
              <div className="px-6 py-4 border-t border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-secondary)]">
                {/* Prev button */}
                <button
                  onClick={handlePrev}
                  disabled={slideIndex === 0}
                  className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === slideIndex ? 20 : 7,
                        height: 7,
                        background:
                          i === slideIndex
                            ? "var(--color-accent, #3B82F6)"
                            : "var(--color-border)",
                      }}
                    />
                  ))}
                </div>

                {/* Next / Done button */}
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={slideIndex === total - 1 ? "Done" : "Next"}
                >
                  {slideIndex === total - 1 ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>

              {/* ── "Dismiss forever" fine-print ───────────────────────── */}
              <div className="pb-4 text-center">
                <button
                  onClick={dismiss}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors underline underline-offset-2"
                >
                  Don&apos;t show this again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
