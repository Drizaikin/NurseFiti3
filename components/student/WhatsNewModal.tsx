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

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// ❶  RELEASES REGISTRY — edit here to announce new features
// ─────────────────────────────────────────────────────────────────────────────

const CURRENT_VERSION = 16;

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

  // ── Version 6 — Massive Question Bank Expansion ──────────
  {
    version: 6,
    date: "1 July 2026",
    items: [
      {
        icon: "📝",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "Massive Question Bank Expansion",
        description:
          "We've just seeded 894 brand new NCK past-paper questions into the platform! Every single question has been verified with detailed rationales across all units.",
        cta: { label: "Start Practising", href: "/practice" },
      },
      {
        icon: "🎓",
        tag: "BScN Update",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Hundreds of New BScN Questions",
        description:
          "BScN students now have access to 317 new Paper I questions and 137 new Paper II questions. Tackle them in Practice mode or your next Mock Exam.",
        cta: { label: "Take a Mock Exam", href: "/mock-exam" },
      },
      {
        icon: "🏥",
        tag: "KRCHN Update",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Hundreds of New KRCHN Questions",
        description:
          "KRCHN students now have access to 312 new Paper I questions and 128 new Paper II questions, covering everything from Medical-Surgical to Community Health.",
        cta: { label: "Practice Now", href: "/practice" },
      },
    ],
  },

  // ── Version 7 — Badges, Flashcard AI, Upgraded Models ──────────
  {
    version: 7,
    date: "4 July 2026",
    items: [
      {
        icon: "🏆",
        tag: "Achievement Unlocked",
        tagColor: "bg-amber-500/20 text-amber-500",
        title: "Don't Fall Behind Your Peers!",
        description:
          "The new NurseFiti Badges system is here. Top students are already securing streaks and unlocking rare badges. Start practising daily to claim yours and prove you have what it takes to crush the NCK exam.",
        cta: { label: "Claim Your First Badge", href: "/dashboard" },
      },
      {
        icon: "🤖",
        tag: "Unfair Advantage",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "NurseFiti AI in Flashcards",
        description:
          "Stuck on a tough concept? Tap 'Ask AI' and get an instant, clinical rationale tailored exactly to NCK standards. It’s like having a private tutor in your pocket — use it to cut your study time in half.",
        cta: { label: "Try the AI Now", href: "/flashcards" },
      },
      {
        icon: "⚡",
        tag: "Upgraded",
        tagColor: "bg-blue-500/20 text-blue-400",
        title: "Blazing Fast AI Engine",
        description:
          "We've upgraded our entire AI engine to Gemini 3.5. Getting fast, accurate clinical explanations is no longer a luxury—it's the secret weapon the smartest students use to dominate Mock Exams.",
        cta: { label: "Test Your Knowledge", href: "/mock-exam" },
      }
    ],
  },

  // ── Version 8 — Revision Plan Generator V2 ──────────
  {
    version: 8,
    date: "4 July 2026",
    items: [
      {
        icon: "📅",
        tag: "Game Changer",
        tagColor: "bg-primary/20 text-primary",
        title: "Stop Randomly Studying. Get an Unfair Advantage.",
        description:
          "Studying blindly without a timetable is the #1 reason students fail. You can now get instant help generating a personalised, highly optimised revision plan. Stop guessing and let the engine optimise your content input and retention so you pass the exam faster.",
        cta: { label: "Generate Timetable", href: "/revision-plan" },
      },
      {
        icon: "🧠",
        tag: "Science Backed",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Accelerate Your Learning Process",
        description:
          "Your new personalized study schedule uses proven cognitive science to speed up your learning. We intelligently interleave units and schedule recovery days to maximize your retention and prevent burnout, ensuring you walk into the exam room fully prepared to crush it.",
        cta: { label: "Get Your Plan", href: "/revision-plan" },
      }
    ],
  },

  // ── Version 9 — Mnemonics and Smart Ratings ──────────
  {
    version: 9,
    date: "5 July 2026",
    items: [
      {
        icon: "🧠",
        tag: "New Feature",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Mnemonic of the Day",
        description:
          "Memorize high-yield nursing concepts effortlessly! A new beautifully styled mnemonic will appear on your dashboard every single day to keep your memory sharp for the NCK exam.",
        cta: { label: "View on Dashboard", href: "/dashboard" },
      },
      {
        icon: "📚",
        tag: "Premium",
        tagColor: "bg-amber-500/20 text-amber-500",
        title: "The Ultimate Mnemonic Archive",
        description:
          "Need more than just the mnemonic of the day? Premium students can now access the full archive of hundreds of past mnemonics and download them directly as a PDF for offline studying.",
        cta: { label: "Go to Archive", href: "/mnemonics" },
      },
      {
        icon: "🌟",
        tag: "Community",
        tagColor: "bg-blue-500/20 text-blue-400",
        title: "Smart App Rating & Reviews",
        description:
          "We love hearing from you! NurseFiti will now occasionally ask for your feedback. Your 4-star and 5-star reviews help other nursing students find us and help us improve the platform for everyone.",
        cta: { label: "Keep Learning", href: "/practice" },
      }
    ],
  },

  // ── Version 10 — NCK MCQ Compilation 2026 ──────────
  {
    version: 10,
    date: "8 July 2026",
    items: [
      {
        icon: "📚",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "Over 500 New 2026 NCK MCQs",
        description:
          "We've just seeded 540 brand new past-paper questions from the 2026 NCK Compilation. Fully deduplicated and verified, this release includes 305 questions for Paper I and 235 questions for Paper II.",
        cta: { label: "Start Practising", href: "/practice" },
      },
      {
        icon: "✅",
        tag: "Quality",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Audited & Fixed",
        description:
          "Every question has been fully audited against MOH Kenya guidelines and NCK standards. Missing options were fixed and rationales cross-checked to give you the most accurate practice possible.",
        cta: { label: "Take a Mock Exam", href: "/mock-exam" },
      }
    ],
  },

  // ── Version 11 — Question Bank Expansion ───────────────────────────────────
  {
    version: 11,
    date: "July 2026",
    items: [
      {
        icon: "📦",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "1,932 New NCK MCQs Added",
        description:
          "We've just seeded 1,932 brand new past-paper questions to the platform. The question bank has been fully updated!",
        cta: { label: "Start Practising", href: "/practice" },
      }
    ],
  },

  // ── Version 12 — Set 3 Question Bank + Deep Audit ─────────────────────────
  {
    version: 12,
    date: "13 July 2026",
    items: [
      {
        icon: "📝",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "1,000+ New NCK MCQs — Deeply Audited",
        description:
          "A brand-new batch of over 1,000 questions has been added, covering Medical-Surgical, Midwifery, Paediatrics, Pharmacology, Community Health, Mental Health, Research and more — for both BScN and KRCHN.",
        cta: { label: "Start Practising", href: "/practice" },
      },
      {
        icon: "🔬",
        tag: "Quality",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Character-by-Character Audit",
        description:
          "Every question in this batch was audited question-by-question: wrong answers corrected, garbled option text cleaned, rationales verified against Brunner & Suddarth, Myles, Kenya MOH and WHO guidelines.",
        cta: { label: "Take a Mock Exam", href: "/mock-exam" },
      },
      {
        icon: "🏗️",
        tag: "Fixed",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Units, Topics & Papers Corrected",
        description:
          "All questions now have correct unit assignments, specific clinical topics (no more 'General'), and accurate Paper I / Paper II placement per the NCK CBT blueprint. Your mock exams are more accurate than ever.",
        cta: { label: "Practice Now", href: "/practice" },
      },
    ],
  },

  // ── Version 13 — Download Wrong Questions Feature ─────────────────────────
  {
    version: 13,
    date: "15 July 2026",
    items: [
      {
        icon: "📥",
        tag: "New Feature",
        tagColor: "bg-primary/20 text-primary",
        title: "Download Questions You Got Wrong",
        description:
          "You can now download and print a beautifully formatted PDF of all the practice questions you answered incorrectly. Use this to actively revise the exact concepts you struggle with offline.",
        cta: { label: "Try it Now", href: "/practice" },
      },
      {
        icon: "⚡",
        tag: "Pro",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Download Only New Mistakes",
        description:
          "The system tracks what you've already printed! Click 'Download New Only' to get a fresh PDF of just your recent mistakes, ensuring you don't waste time reviewing the same things.",
        cta: { label: "Review Mistakes", href: "/practice" },
      }
    ],
  },

  // ── Version 14 — Bug Fixes & Updates ──────────────────────────────────────────
  {
    version: 14,
    date: "26 July 2026",
    items: [
      {
        icon: "🐛",
        tag: "Fixed",
        tagColor: "bg-amber-500/20 text-amber-400",
        title: "Flawed Questions & Flagging Fixed",
        description:
          "We resolved a known issue with the Yellow Fever vector question and fixed the Question Flagging feature so you can easily report errors again. We also resolved a UI glitch on the dashboard. Thanks for helping us improve!",
      }
    ],
  },

  // ── Version 15 — Comprehensive Question Audit & Corrections ───────────────
  {
    version: 15,
    date: "26 July 2026",
    items: [
      {
        icon: "🔬",
        tag: "Quality Audit",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "42-Flag Audit Complete — Questions Corrected",
        description:
          "We audited every single flagged question against NCK clinical guidelines. 2 questions had wrong answers (including 'Advantage of Integration of Services'), 9 were misclassified by unit/topic, stem typos were fixed, and 20+ rationales were fully rewritten to explain every option clearly.",
        cta: { label: "Continue Practising", href: "/practice" },
      },
      {
        icon: "✏️",
        tag: "Updated",
        tagColor: "bg-blue-500/20 text-blue-400",
        title: "APGAR Scoring Question Redesigned",
        description:
          "The APGAR question was redesigned to include all 5 scoring criteria clearly in the stem (including reflex irritability), giving an unambiguous score of 7. The rationale now explains exactly how to score each parameter.",
        cta: { label: "Practice MCQs", href: "/practice" },
      },
      {
        icon: "📋",
        tag: "Rationales",
        tagColor: "bg-violet-500/20 text-violet-400",
        title: "Rationales Now Explain Every Option",
        description:
          "We rewrote rationales for Maslow's Hierarchy, Bloom's Taxonomy domains, Bishop Score, Fetal Circulation, Macular Degeneration, Immunoglobulins (IgG), Bell's Palsy, and more — each now explains WHY each wrong option is wrong, not just why the correct one is right.",
      },
    ],
  },

  // ── Version 16 — Set 4 Question Bank Expansion ────────────────────────────
  {
    version: 16,
    date: "24 July 2026",
    items: [
      {
        icon: "📝",
        tag: "New Questions",
        tagColor: "bg-primary/20 text-primary",
        title: "2,102 New NCK Questions Added",
        description:
          "We've just seeded 2,102 new questions. BScN students get 1,500 new questions; KRCHN students get 602 new questions.",
        cta: { label: "Start Practising", href: "/practice" },
      },
    ],
  },

  // ── Version 17 — Massive Database Audit & Recategorisation ────────────────
  {
    version: 17,
    date: "26 July 2026",
    items: [
      {
        icon: "🔍",
        tag: "System Audit",
        tagColor: "bg-violet-500/20 text-violet-400",
        title: "Word-by-Word Quality Audit",
        description:
          "We just ran a deep, character-by-character audit of all 7,403 questions in the platform to ensure every single unit and paper assignment exactly matches the official NCK CBT Blueprint.",
      },
      {
        icon: "🏗️",
        tag: "Fixed",
        tagColor: "bg-emerald-500/20 text-emerald-400",
        title: "Hundreds of Reclassifications",
        description:
          "Found and corrected over 870 misclassified questions. Family planning questions moved from Midwifery to MCH, Gynaecology moved to Med-Surg, and Paper I / Paper II boundaries are now perfectly strict.",
        cta: { label: "Keep Practising", href: "/practice" },
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
      else setShow(false); // forceOpen just turned false — ensure modal stays hidden
    } catch {
      // localStorage blocked (private mode, etc.) — don't show
    }
  }, [forceOpen]);

  const dismiss = useCallback(() => {
    // Always persist dismissal — ensures the trigger pill hides after any close/done
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch { /* ignore */ }
    setShow(false);
    setSlideIndex(0); // reset for next time it's opened
    onForceClose?.();
  }, [onForceClose]);

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

  if (!show || items.length === 0) return null;

  const current = items[slideIndex];

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <AnimatePresence>
      {show && (
        /*
         * Overlay — covers the whole viewport on every device.
         * On mobile  : the card slides up from the bottom as a sheet.
         * On desktop : the card is centred with a spring pop-in.
         * z-[80] sits above sidebar (z-30/50) and topbar (z-20).
         */
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          // Allow tapping the backdrop to dismiss
          onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        >
          {/* Dark blurred backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* ── Card / Sheet ────────────────────────────────────────────── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="What's New"
            className={[
              "relative w-full sm:max-w-md",
              // Mobile: rounded top corners, flush to bottom, safe-area padding
              "rounded-t-3xl sm:rounded-2xl",
              // Prevent card from stretching too tall on small screens
              "max-h-[92dvh] sm:max-h-none overflow-y-auto sm:overflow-visible",
            ].join(" ")}
            // Mobile: slide up from bottom. Desktop: scale in from centre.
            initial={{ y: "100%", opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 1 }}
            // On sm+ override to the spring pop-in
            style={{ originY: 1 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
          >
            {/* Ambient glow — desktop only, would be hidden under sheet on mobile */}
            <div
              className="hidden sm:block absolute -inset-3 rounded-3xl blur-2xl opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, var(--color-accent,#3B82F6) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative bg-[var(--color-card)] border border-[var(--color-border)] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

              {/* Mobile drag handle */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
                <div className="w-10 h-1 rounded-full bg-[var(--color-border)]" />
              </div>

              {/* ── Header ────────────────────────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <div className="flex items-center gap-2.5">
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
                <button
                  onClick={dismiss}
                  className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Dismiss what's new"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Slide area ────────────────────────────────────────── */}
              <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
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

                    {/* Tag */}
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
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors min-h-[44px] px-3"
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

              {/* ── Footer: dots + prev/next ──────────────────────────── */}
              <div className="px-6 py-4 border-t border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-secondary)]">
                <button
                  onClick={handlePrev}
                  disabled={slideIndex === 0}
                  className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                      className="transition-all duration-300 rounded-full min-h-[44px] flex items-center"
                    >
                      <span
                        className="block rounded-full transition-all duration-300"
                        style={{
                          width: i === slideIndex ? 20 : 7,
                          height: 7,
                          background: i === slideIndex
                            ? "var(--color-accent,#3B82F6)"
                            : "var(--color-border)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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

              {/* Dismiss fine-print + safe-area bottom padding for notched phones */}
              <div
                className="pb-4 text-center"
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                <button
                  onClick={dismiss}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors underline underline-offset-2 min-h-[44px] px-4"
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
