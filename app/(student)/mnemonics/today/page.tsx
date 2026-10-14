'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ALL_MNEMONICS,
  CATEGORIES,
  CATEGORY_COLORS,
  getMnemonicOfTheDay,
  type Mnemonic as FullMnemonic,
  type BreakdownItem,
  type PracticeQuestion
} from '@/lib/mnemonicsData';

// Fallback color scheme for categories
const FallbackCat = {
  bg: '#08514F',
  text: '#FFFFFF',
  soft: 'rgba(8,81,79,0.12)',
  border: 'rgba(8,81,79,0.28)'
};

// ── Section Card Component ───────────────────────────────────────────────────
function SectionCard({
  icon,
  title,
  accent,
  soft,
  bgClass,
  children,
}: {
  icon: string;
  title: string;
  accent: string;
  soft?: boolean;
  bgClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-200 border ${
        bgClass || 'bg-white dark:bg-[var(--color-card)]'
      }`}
      style={{
        borderColor: soft ? `${accent}40` : 'var(--color-border)',
        borderLeftWidth: '5px',
        borderLeftColor: accent,
        boxShadow: 'var(--shadow-card, 0 2px 10px rgba(0,0,0,0.04))',
      }}
    >
      <div
        className="font-heading font-extrabold flex items-center gap-2 mb-3"
        style={{
          fontSize: 12,
          color: accent,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span className="text-base sm:text-lg">{icon}</span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

// ── Interactive Practice Question Component ──────────────────────────────────
function PracticeQuestionCard({
  pq,
  catColor,
}: {
  pq: PracticeQuestion;
  catColor: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelected(null);
    setRevealed(false);
  }, [pq.question]);

  return (
    <div
      className="bg-white dark:bg-[var(--color-card)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all"
      style={{
        borderColor: 'var(--color-border)',
        borderLeftWidth: '5px',
        borderLeftColor: catColor,
        boxShadow: 'var(--shadow-card, 0 2px 10px rgba(0,0,0,0.04))',
      }}
    >
      <div
        className="font-heading font-extrabold flex items-center gap-2 mb-3"
        style={{
          fontSize: 12,
          color: catColor,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span className="text-base">❓</span>
        <span>Interactive Practice Question</span>
      </div>

      <p className="font-body font-semibold text-sm sm:text-base text-dark dark:text-white leading-relaxed mb-4">
        {pq.question}
      </p>

      <div className="flex flex-col gap-2.5 mb-5">
        {pq.options.map((opt, i) => {
          const letter = opt.charAt(0);
          const isCorrect = letter === pq.answer;
          const isSelected = selected === letter;

          let btnBg = 'bg-[var(--color-bg)]';
          let borderCol = 'border-[var(--color-border)]';
          let textCol = 'text-dark dark:text-white';

          if (revealed) {
            if (isCorrect) {
              btnBg = 'bg-emerald-50 dark:bg-emerald-950/30';
              borderCol = 'border-emerald-500';
              textCol = 'text-emerald-700 dark:text-emerald-300 font-semibold';
            } else if (isSelected) {
              btnBg = 'bg-rose-50 dark:bg-rose-950/30';
              borderCol = 'border-rose-500';
              textCol = 'text-rose-700 dark:text-rose-300';
            }
          } else if (isSelected) {
            btnBg = 'bg-primary/10 dark:bg-primary/20';
            borderCol = 'border-primary';
            textCol = 'text-primary dark:text-primary-light font-bold';
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!revealed) setSelected(letter);
              }}
              className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-start gap-3 min-h-[44px] ${btnBg} ${borderCol} ${
                revealed ? 'cursor-default' : 'hover:border-primary/50 cursor-pointer'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg text-xs font-heading font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  revealed && isCorrect
                    ? 'bg-emerald-500 text-white'
                    : revealed && isSelected
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-primary text-white'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {letter}
              </span>
              <span className={`text-xs sm:text-sm leading-relaxed ${textCol}`}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={() => {
            if (selected) setRevealed(true);
          }}
          disabled={!selected}
          className="w-full sm:w-auto font-heading font-extrabold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
          style={{
            background: selected
              ? `linear-gradient(135deg, ${catColor}, ${catColor}dd)`
              : 'var(--color-primary-light)',
            color: selected ? '#FFFFFF' : 'var(--color-neutral-mid)',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          {selected ? 'Reveal Answer & Clinical Rationale' : 'Select an option to reveal'}
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
        >
          <div className="font-heading font-extrabold text-xs mb-2 uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <span>✓</span> Correct Answer: {pq.answer}
          </div>
          <p className="font-body text-xs sm:text-sm leading-relaxed text-dark dark:text-neutral-200 m-0">
            {pq.explanation}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ── Inner Page Component ─────────────────────────────────────────────────────
function MnemonicTodayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('id');

  const supabase = createClient();

  // Instant zero-lag dataset
  const [mnemonicList, setMnemonicList] = useState<FullMnemonic[]>(ALL_MNEMONICS);

  const dayOfYear = useMemo(() => {
    return Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (requestedId) {
      const idx = ALL_MNEMONICS.findIndex(
        (m) => m.id === requestedId || m.title.toLowerCase().includes(requestedId.toLowerCase())
      );
      if (idx !== -1) return idx;
    }
    return dayOfYear % ALL_MNEMONICS.length;
  });

  const [showBreakdown, setShowBreakdown] = useState(true);
  const [planTier, setPlanTier] = useState<string>('free');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Handle URL param changes dynamically
  useEffect(() => {
    if (requestedId && mnemonicList.length > 0) {
      const idx = mnemonicList.findIndex(
        (m) => m.id === requestedId || m.title.toLowerCase().includes(requestedId.toLowerCase())
      );
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [requestedId, mnemonicList]);

  const mnemonic = mnemonicList[currentIndex % mnemonicList.length] || ALL_MNEMONICS[0];

  // Sync bookmark state from localStorage
  useEffect(() => {
    if (!mnemonic) return;
    try {
      const stored = localStorage.getItem('nf_bookmarked_mnemonics');
      if (stored) {
        const set = new Set(JSON.parse(stored));
        setIsBookmarked(set.has(mnemonic.id));
      } else {
        setIsBookmarked(false);
      }
    } catch {
      /* ignore */
    }
  }, [mnemonic]);

  const toggleBookmark = () => {
    if (!mnemonic) return;
    try {
      const stored = localStorage.getItem('nf_bookmarked_mnemonics');
      const set = new Set<string>(stored ? JSON.parse(stored) : []);
      if (set.has(mnemonic.id)) {
        set.delete(mnemonic.id);
        setIsBookmarked(false);
        toast('Removed from saved mnemonics', { icon: '🗑️' });
      } else {
        set.add(mnemonic.id);
        setIsBookmarked(true);
        toast.success('Saved to your mnemonics!');
      }
      localStorage.setItem('nf_bookmarked_mnemonics', JSON.stringify(Array.from(set)));
    } catch {
      /* ignore */
    }
  };

  // Background check for newly added rows from Supabase
  useEffect(() => {
    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: prof } = await supabase
            .from('student_profiles')
            .select('plan_tier, plan_expires_at')
            .eq('id', user.id)
            .single();
          setPlanTier(effectiveTier((prof as any)?.plan_tier, (prof as any)?.plan_expires_at));
        }

        const { data } = await supabase.from('mnemonics').select('*');
        if (data && data.length > 0) {
          const dbMap = new Map(data.map((d: any) => [d.title.toLowerCase().trim(), d]));
          const merged = ALL_MNEMONICS.map((m) => {
            const found = dbMap.get(m.title.toLowerCase().trim());
            return found ? { ...m, ...found } : m;
          });

          const staticTitles = new Set(ALL_MNEMONICS.map((m) => m.title.toLowerCase().trim()));
          for (const d of data) {
            if (!staticTitles.has((d.title || '').toLowerCase().trim())) {
              merged.push({
                id: d.id,
                title: d.title,
                acronym: d.acronym || d.title,
                description: d.description || '',
                category: d.category || 'Pharmacology',
                specialty: d.specialty || 'General',
                tags: d.tags || [],
                phrases: d.phrases || [],
                breakdown: d.breakdown || [],
                clinical_significance: d.clinical_significance || '',
                causes: d.causes || [],
                exam_traps: d.exam_traps || '',
                memory_pearl: d.memory_pearl || '',
                high_yield_tip: d.high_yield_tip || '',
                practice_question: d.practice_question || null,
              });
            }
          }
          setMnemonicList(merged);
        }
      } catch {
        /* silent fallback */
      }
    }
    load();
  }, []);

  const handleDownload = () => {
    if (planTier === 'free') {
      toast.error('Downloading printable study sheets is a premium feature. Please upgrade your plan.');
      router.push('/settings');
      return;
    }
    if (!mnemonic) return;

    const html = `<!DOCTYPE html><html><head><title>NurseFiti Study Note – ${mnemonic.title}</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #FFFDF8; color: #0F1C1C; padding: 40px; max-width: 860px; margin: 0 auto; line-height: 1.6; }
h1 { color: #08514F; font-size: 28px; border-bottom: 3px solid #F5A623; padding-bottom: 8px; margin: 12px 0; }
.badge { display: inline-block; background: #F5A623; color: #0F1C1C; padding: 5px 14px; border-radius: 999px; font-weight: bold; font-size: 11px; text-transform: uppercase; }
.acronym-box { background: #E8F5F4; border-left: 4px solid #08514F; padding: 14px 18px; border-radius: 10px; margin: 16px 0; font-size: 16px; font-weight: bold; color: #08514F; }
.section { margin: 20px 0; padding: 16px 20px; background: #FFFFFF; border-radius: 14px; border: 1px solid #E2E8F0; }
.section-title { font-size: 12px; font-weight: bold; color: #08514F; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.phrases-list { list-style: none; padding: 0; margin: 0; }
.phrase-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: 600; font-size: 15px; color: #08514F; }
.item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F1F5F9; }
.emoji { font-size: 22px; flex-shrink: 0; }
.ph { font-weight: bold; font-size: 14.5px; color: #08514F; }
.mn { color: #4A6565; font-size: 13.5px; line-height: 1.5; }
.alert-box { background: #FEF3C7; border-left: 4px solid #F5A623; padding: 14px 18px; border-radius: 10px; margin: 16px 0; }
.alert-red { background: #FFF0F0; border-left: 4px solid #EF4444; padding: 14px 18px; border-radius: 10px; margin: 16px 0; }
.foot { text-align: center; margin-top: 40px; font-size: 11px; color: #7A9E9E; border-top: 1px solid #E2E8F0; padding-top: 20px; }
</style>
</head><body>
<div class="badge">${mnemonic.category} · ${mnemonic.specialty}</div>
<h1>${mnemonic.title}</h1>
<div class="acronym-box">Acronym / Anchor: ${mnemonic.acronym}</div>
<p style="color: #4A6565; font-size: 14px;">${mnemonic.description}</p>

<div class="section">
  <div class="section-title">Sequence & Phrases</div>
  <ul class="phrases-list">
    ${mnemonic.phrases.map((p, i) => `<li class="phrase-item"><span>${i + 1}.</span> <strong>${p}</strong></li>`).join('')}
  </ul>
</div>

<div class="section">
  <div class="section-title">Anatomical & Clinical Breakdown</div>
  ${mnemonic.breakdown.map((b) => `<div class="item"><div class="emoji">${b.emoji}</div><div><div class="ph">${b.phrase}</div><div class="mn">${b.meaning}</div></div></div>`).join('')}
</div>

${mnemonic.clinical_significance ? `<div class="section"><div class="section-title">Clinical Significance</div><p class="mn">${mnemonic.clinical_significance}</p></div>` : ''}

${mnemonic.causes && mnemonic.causes.length > 0 ? `<div class="section"><div class="section-title">Common Causes & Etiology</div><ul>${mnemonic.causes.map((c) => `<li class="mn">${c}</li>`).join('')}</ul></div>` : ''}

${mnemonic.exam_traps ? `<div class="alert-red"><div class="section-title" style="color: #991B1B;">Common NCK Exam Traps</div><p class="mn" style="color: #7F1D1D;">${mnemonic.exam_traps}</p></div>` : ''}

${mnemonic.memory_pearl ? `<div class="alert-box"><div class="section-title" style="color: #92400E;">NurseFiti Memory Pearl</div><p class="mn" style="font-style: italic; color: #78350F;">${mnemonic.memory_pearl}</p></div>` : ''}

${mnemonic.high_yield_tip ? `<div class="section"><div class="section-title">NCK High-Yield Examination Tip</div><p class="mn">${mnemonic.high_yield_tip}</p></div>` : ''}

${
  mnemonic.practice_question
    ? `<div class="section"><div class="section-title">NCK Practice Question</div><p><strong>${mnemonic.practice_question.question}</strong></p><ul>${mnemonic.practice_question.options.map((o) => `<li>${o}</li>`).join('')}</ul><p style="color:#059669; font-weight:bold;">Correct Answer: ${mnemonic.practice_question.answer}</p><p class="mn">${mnemonic.practice_question.explanation}</p></div>`
    : ''
}

<div class="foot">Downloaded from NurseFiti.com · Kenya's #1 Nursing Prep Platform · All Rights Reserved.</div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nursefiti-mnemonic-${mnemonic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success('Study sheet ready! Open to view or print as PDF.');
  };

  const handleShare = () => {
    const text = `🧠 NurseFiti Mnemonic: ${mnemonic.title} (${mnemonic.acronym})\n\nSequence:\n${mnemonic.phrases
      .map((p, i) => `${i + 1}. ${p}`)
      .join('\n')}\n\nClinical Significance:\n${mnemonic.clinical_significance}\n\nMaster 69+ NCK Nursing Mnemonics on https://www.nursefiti.co.ke/mnemonics`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Copied mnemonic study note to clipboard!');
    }
  };

  const cat = CATEGORY_COLORS[mnemonic.category] || FallbackCat;

  // Filter list for dropdown search
  const filteredJumpList = useMemo(() => {
    if (!searchFilter) return mnemonicList;
    const q = searchFilter.toLowerCase();
    return mnemonicList.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.acronym.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.specialty.toLowerCase().includes(q)
    );
  }, [mnemonicList, searchFilter]);

  return (
    <>
      {/* ── Keyframe Animations ───────────────────────────────────────── */}
      <style>{`
        @keyframes subtleDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        .ph-card {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ph-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(8, 81, 79, 0.10);
        }
      `}</style>

      {/* ── Full Width Container (Maximising Page Space) ──────────────── */}
      <div className="relative min-h-screen w-full pb-20">
        {/* Ambient atmospheric glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'subtleDrift 22s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-5%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(8,81,79,0.08) 0%, transparent 70%)',
              filter: 'blur(90px)',
              animation: 'subtleDrift 26s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* ── Content Canvas: Uses Full Space Responsively ─────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">

          {/* ── Top Bar: Navigation, Search/Jump & Quick Actions ──────── */}
          <div className="bg-white/90 dark:bg-[var(--color-card)] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[var(--color-border)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Back & Category pills */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href="/mnemonics"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold text-primary dark:text-primary-light hover:text-accent-dark transition-all px-3.5 py-2 rounded-xl bg-primary-light/40 dark:bg-primary/20 border border-[var(--color-border)] hover:bg-primary-light"
              >
                <span>←</span> All Mnemonics ({mnemonicList.length})
              </Link>

              <span
                className="text-[11px] font-heading font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  background: cat.soft,
                  color: cat.bg,
                  border: `1px solid ${cat.border}`,
                }}
              >
                {mnemonic.category}
              </span>

              <span className="text-[11px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light border border-primary/20">
                {mnemonic.specialty}
              </span>
            </div>

            {/* Center: Jump to Mnemonic Dropdown */}
            <div className="flex-1 max-w-xs">
              <select
                value={mnemonic.id}
                onChange={(e) => {
                  const idx = mnemonicList.findIndex((m) => m.id === e.target.value);
                  if (idx !== -1) setCurrentIndex(idx);
                }}
                className="w-full py-2 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs font-semibold text-dark dark:text-white focus:outline-none focus:border-primary transition-all truncate"
                aria-label="Select mnemonic"
              >
                {mnemonicList.map((m, idx) => (
                  <option key={m.id} value={m.id}>
                    #{idx + 1}: {m.title} ({m.acronym})
                  </option>
                ))}
              </select>
            </div>

            {/* Right: Controls (Prev, Today, Next, Random, Bookmark, PDF) */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs font-bold text-[var(--color-neutral-mid)] hidden lg:inline mr-1">
                {currentIndex + 1} / {mnemonicList.length}
              </span>

              <button
                type="button"
                onClick={() => setCurrentIndex((idx) => (idx - 1 + mnemonicList.length) % mnemonicList.length)}
                className="p-2 sm:px-3 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-primary dark:text-primary-light transition-all shadow-xs min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Previous Mnemonic"
              >
                ← Prev
              </button>

              <button
                type="button"
                onClick={() => setCurrentIndex(dayOfYear % mnemonicList.length)}
                className={`px-3 py-2 rounded-xl border text-xs font-heading font-bold transition-all shadow-xs min-h-[40px] ${
                  currentIndex === dayOfYear % mnemonicList.length
                    ? 'bg-accent text-dark border-accent-dark'
                    : 'border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-primary dark:text-primary-light'
                }`}
                title="Today's featured Mnemonic"
              >
                📅 Today
              </button>

              <button
                type="button"
                onClick={() => setCurrentIndex((idx) => (idx + 1) % mnemonicList.length)}
                className="p-2 sm:px-3 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-primary dark:text-primary-light transition-all shadow-xs min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Next Mnemonic"
              >
                Next →
              </button>

              <button
                type="button"
                onClick={() => setCurrentIndex(Math.floor(Math.random() * mnemonicList.length))}
                className="p-2 sm:px-2.5 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-accent-dark transition-all shadow-xs min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Shuffle Random Mnemonic"
              >
                🎲
              </button>

              <button
                type="button"
                onClick={toggleBookmark}
                className="p-2 sm:px-2.5 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-base font-bold transition-all shadow-xs min-h-[40px] min-w-[40px] flex items-center justify-center text-accent"
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark mnemonic'}
              >
                {isBookmarked ? '⭐' : '☆'}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-2 sm:px-2.5 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-bold text-primary dark:text-primary-light transition-all shadow-xs min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Copy study note"
              >
                📋
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="px-3 py-2 rounded-xl bg-primary hover:bg-primary-mid text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-all shadow-sm min-h-[40px] flex items-center gap-1.5"
                title="Download study sheet"
              >
                <span>⬇</span> PDF
              </button>
            </div>
          </div>

          {/* ── Hero Title Banner ────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-mid rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-primary-light/20">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/25 border border-accent/40 text-accent text-xs font-heading font-extrabold uppercase tracking-widest">
                    <span>⚡</span> High-Yield NCK Anchor
                  </span>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-white/70">
                    Category: {mnemonic.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-tight text-white">
                  {mnemonic.title}
                </h1>

                {mnemonic.description && (
                  <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed font-body">
                    {mnemonic.description}
                  </p>
                )}
              </div>

              {/* Acronym Spotlight Box */}
              <div className="flex-shrink-0 self-start lg:self-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-center min-w-[180px]">
                  <div className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-accent mb-1">
                    Memory Key
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-accent tracking-wide">
                    {mnemonic.acronym}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-1">
                    {mnemonic.phrases.length} Sequence Anchor Points
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Dynamic 2-Column Responsive Grid ──────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* ════ LEFT COLUMN: Memory Anchor Sequence & Breakdown (5 cols) ════ */}
            <div className="lg:col-span-5 space-y-6">

              {/* 1. Sequence & Phrases Timeline */}
              <div className="bg-white dark:bg-[var(--color-card)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                {/* Category accent line */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${cat.bg} 0%, ${cat.border} 70%, transparent 100%)`,
                  }}
                />

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔤</span>
                      <h2 className="text-sm sm:text-base font-heading font-black text-primary dark:text-white uppercase tracking-wider">
                        Memory Sequence
                      </h2>
                    </div>
                    <span className="text-xs font-heading font-extrabold text-accent-dark bg-accent/15 px-2.5 py-1 rounded-full">
                      {mnemonic.acronym}
                    </span>
                  </div>

                  {/* Vertical Glowing Rail with Step Nodes */}
                  <div className="relative pl-7 sm:pl-8">
                    {/* Glowing vertical rail */}
                    <div
                      className="absolute left-2.5 top-3 bottom-3 w-1 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                        boxShadow: '0 0 10px rgba(245, 166, 35, 0.4)',
                      }}
                    />

                    <div className="flex flex-col gap-3">
                      {mnemonic.phrases.map((phrase, i) => {
                        // Extract first letter or acronym letter if applicable
                        const letterMatch = phrase.trim().charAt(0).toUpperCase();

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + i * 0.05 }}
                            className="relative ph-card"
                          >
                            {/* Step Node Circle on Rail */}
                            <div
                              className="absolute -left-[27px] sm:-left-[31px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white dark:bg-[var(--color-card)] flex items-center justify-center font-heading font-black text-[10px] text-dark shadow-sm z-10"
                              style={{
                                border: '3px solid var(--color-accent)',
                              }}
                            >
                              {i + 1}
                            </div>

                            {/* Phrase Card */}
                            <div className="bg-[var(--color-bg)] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[var(--color-border)] hover:border-primary/40 transition-all flex items-center gap-3">
                              <span className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 text-accent-dark font-heading font-black text-sm flex items-center justify-center flex-shrink-0">
                                {letterMatch}
                              </span>
                              <span className="font-heading font-bold text-sm sm:text-base text-primary dark:text-white leading-snug">
                                {phrase}
                                {i < mnemonic.phrases.length - 1 ? ',' : '.'}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Anatomical & Clinical Breakdown ("What it means") */}
              <div className="bg-white dark:bg-[var(--color-card)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowBreakdown((v) => !v)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold transition-colors"
                      style={{
                        background: showBreakdown ? 'var(--color-primary)' : 'rgba(8,81,79,0.08)',
                        color: showBreakdown ? '#FFFFFF' : 'var(--color-primary)',
                      }}
                    >
                      <motion.span
                        animate={{ rotate: showBreakdown ? 90 : 0 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      >
                        ›
                      </motion.span>
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-sm sm:text-base text-primary dark:text-white uppercase tracking-wider">
                        What It Means
                      </h3>
                      <p className="font-body text-xs text-[var(--color-neutral-mid)]">
                        {mnemonic.breakdown.length} Clinical & Anatomical breakdown points
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-heading font-bold text-primary dark:text-primary-light uppercase tracking-wider">
                    {showBreakdown ? 'Collapse' : 'Expand'}
                  </span>
                </button>

                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[var(--color-border)] p-4 sm:p-5 space-y-3"
                    >
                      {mnemonic.breakdown.map((item: BreakdownItem, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-primary/30 transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                            {item.emoji}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-heading font-bold text-sm text-primary dark:text-white">
                              {item.phrase}
                            </h4>
                            <p className="font-body text-xs sm:text-sm text-[var(--color-neutral-mid)] leading-relaxed mt-0.5">
                              {item.meaning}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Tags & Actions */}
              {mnemonic.tags && mnemonic.tags.length > 0 && (
                <div className="bg-white dark:bg-[var(--color-card)] rounded-2xl sm:rounded-3xl p-5 border border-[var(--color-border)] shadow-sm">
                  <div className="text-xs font-heading font-extrabold text-[var(--color-neutral-mid)] uppercase tracking-wider mb-3">
                    Clinical Topics & Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mnemonic.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-body font-bold text-xs px-3 py-1.5 rounded-xl bg-primary-light/50 dark:bg-primary/20 text-primary dark:text-primary-light border border-primary/15"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Quick Action Cards */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-mid text-white flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⬇</span>
                    <div className="text-left">
                      <div className="font-heading font-extrabold text-sm">Download Printable PDF</div>
                      <div className="text-xs text-white/70">Save this study sheet for offline revision</div>
                    </div>
                  </div>
                  <span className="text-lg">›</span>
                </button>

                <Link href="/mnemonics" className="block text-decoration-none">
                  <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-accent to-accent-dark text-dark flex items-center justify-between hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📚</span>
                      <div className="text-left">
                        <div className="font-heading font-extrabold text-sm">Explore All 69+ Mnemonics</div>
                        <div className="text-xs text-dark/70">Search, filter by ward & bookmark</div>
                      </div>
                    </div>
                    <span className="text-lg">›</span>
                  </div>
                </Link>
              </div>

            </div>

            {/* ════ RIGHT COLUMN: Clinical & Exam Deep Dive (7 cols) ════ */}
            <div className="lg:col-span-7 space-y-6">

              {/* 1. Clinical Significance */}
              {mnemonic.clinical_significance && (
                <SectionCard
                  icon="🩺"
                  title="Clinical Significance & Pathophysiology"
                  accent="var(--color-primary)"
                >
                  <p className="font-body text-xs sm:text-sm lg:text-base text-dark dark:text-neutral-200 leading-relaxed m-0">
                    {mnemonic.clinical_significance}
                  </p>
                </SectionCard>
              )}

              {/* 2. Common Causes & Associated Conditions */}
              {mnemonic.causes && mnemonic.causes.length > 0 && (
                <SectionCard
                  icon="💊"
                  title="Common Causes & Associated Conditions"
                  accent="var(--color-accent-dark)"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mnemonic.causes.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]"
                      >
                        <span className="text-accent-dark font-bold text-xs mt-0.5">•</span>
                        <span className="font-body text-xs sm:text-sm text-dark dark:text-neutral-200 leading-snug">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* 3. Common NCK Exam Traps */}
              {mnemonic.exam_traps && (
                <SectionCard
                  icon="⚠️"
                  title="Common NCK Exam Traps & Pitfalls"
                  accent="#EF4444"
                  bgClass="bg-rose-50/70 dark:bg-rose-950/20"
                >
                  <p className="font-body text-xs sm:text-sm lg:text-base text-rose-900 dark:text-rose-200 leading-relaxed m-0 whitespace-pre-line">
                    {mnemonic.exam_traps}
                  </p>
                </SectionCard>
              )}

              {/* 4. High-Yield Insights Sub-Grid (Memory Pearl & High-Yield Tip) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mnemonic.memory_pearl && (
                  <SectionCard
                    icon="💡"
                    title="Memory Pearl"
                    accent="#F5A623"
                    soft
                    bgClass="bg-amber-50/70 dark:bg-amber-950/20"
                  >
                    <p className="font-heading font-bold text-xs sm:text-sm text-amber-950 dark:text-amber-200 italic leading-relaxed m-0">
                      &ldquo;{mnemonic.memory_pearl}&rdquo;
                    </p>
                  </SectionCard>
                )}

                {mnemonic.high_yield_tip && (
                  <SectionCard
                    icon="🎯"
                    title="NCK High-Yield Tip"
                    accent="var(--color-primary)"
                    soft
                    bgClass="bg-teal-50/70 dark:bg-teal-950/20"
                  >
                    <p className="font-body text-xs sm:text-sm font-medium text-teal-950 dark:text-teal-200 leading-relaxed m-0 whitespace-pre-line">
                      {mnemonic.high_yield_tip}
                    </p>
                  </SectionCard>
                )}
              </div>

              {/* 5. Interactive Practice Question */}
              {mnemonic.practice_question && (
                <PracticeQuestionCard
                  pq={mnemonic.practice_question}
                  catColor={cat.bg}
                />
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

// ── Exported Page with Suspense Boundary for useSearchParams ──────────────────
export default function MnemonicTodayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-heading font-bold text-primary">Loading Mnemonic...</p>
          </div>
        </div>
      }
    >
      <MnemonicTodayContent />
    </Suspense>
  );
}
