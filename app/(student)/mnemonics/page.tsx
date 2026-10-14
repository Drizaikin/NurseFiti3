'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { effectiveTier } from '@/lib/planLimits';
import {
  ALL_MNEMONICS,
  CATEGORIES,
  CATEGORY_COLORS,
  getMnemonicOfTheDay,
  type Mnemonic,
  type BreakdownItem,
  type PracticeQuestion
} from '@/lib/mnemonicsData';

// ── Interactive Practice Question Component ─────────────────────────────────
function PracticeQuestionCard({
  pq,
  catColor
}: {
  pq: PracticeQuestion;
  catColor: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: 'var(--color-card, #FFFFFF)',
        border: '1.5px solid var(--color-border)',
        borderLeft: `4px solid ${catColor}`,
        borderRadius: 16,
        padding: '20px',
        marginBottom: 16,
      }}
    >
      <div
        className="font-heading font-extrabold"
        style={{
          fontSize: 11,
          color: catColor,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 15 }}>❓</span> Practice Question
      </div>
      <p
        className="font-body font-semibold mb-4"
        style={{ fontSize: 14, color: 'var(--color-dark, #0F1C1C)', lineHeight: 1.6 }}
      >
        {pq.question}
      </p>
      <div className="flex flex-col gap-2.5 mb-4">
        {pq.options.map((opt, i) => {
          const letter = opt.charAt(0);
          const isCorrect = letter === pq.answer;
          const isSelected = selected === letter;
          let bg = 'rgba(255,255,255,0.7)';
          let border = 'var(--color-border)';
          let textCol = 'var(--color-dark, #0F1C1C)';

          if (revealed) {
            if (isCorrect) {
              bg = 'rgba(26,158,117,0.12)';
              border = '#1A9E75';
              textCol = '#1A9E75';
            } else if (isSelected) {
              bg = 'rgba(239,68,68,0.10)';
              border = '#EF4444';
              textCol = '#EF4444';
            }
          } else if (isSelected) {
            bg = 'var(--color-primary-light)';
            border = 'var(--color-primary)';
            textCol = 'var(--color-primary)';
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!revealed) setSelected(letter);
              }}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 12,
                padding: '12px 16px',
                textAlign: 'left',
                cursor: revealed ? 'default' : 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <span className="font-body text-sm font-medium" style={{ color: textCol, lineHeight: 1.5 }}>
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
          className="font-heading font-extrabold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl transition-all"
          style={{
            background: selected ? `linear-gradient(135deg, ${catColor}, ${catColor}dd)` : 'var(--color-primary-light)',
            color: selected ? '#FFFFFF' : 'var(--color-neutral-mid)',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          {selected ? 'Reveal Correct Answer & Rationale' : 'Select an option to reveal'}
        </button>
      ) : (
        <div
          style={{
            background: 'rgba(26,158,117,0.08)',
            border: '1.5px solid rgba(26,158,117,0.25)',
            borderRadius: 12,
            padding: '14px 16px',
          }}
        >
          <div
            className="font-heading font-extrabold text-xs mb-1.5 uppercase tracking-wider"
            style={{ color: '#1A9E75' }}
          >
            ✓ Correct Answer: {pq.answer}
          </div>
          <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--color-neutral-mid)] m-0">
            {pq.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Detail Modal for Complete 7-Section Spec ────────────────────────────────
function MnemonicDetailModal({
  mnemonic,
  isBookmarked,
  onToggleBookmark,
  onClose,
  planTier,
}: {
  mnemonic: Mnemonic;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClose: () => void;
  planTier: string;
}) {
  const router = useRouter();
  const cat = CATEGORY_COLORS[mnemonic.category] || CATEGORY_COLORS.Pharmacology;

  const handleDownload = () => {
    if (planTier === 'free') {
      toast.error('Downloading printable study sheets is a premium feature. Please upgrade your plan.');
      router.push('/settings');
      return;
    }
    const html = `<!DOCTYPE html><html><head><title>NurseFiti – ${mnemonic.title}</title>
<style>
body { font-family: Arial, sans-serif; background: #FFFDF8; color: #0F1C1C; padding: 40px; max-width: 800px; margin: 0 auto; }
h1 { color: #08514F; font-size: 28px; border-bottom: 3px solid #F5A623; padding-bottom: 8px; margin-top: 0; }
.badge { display: inline-block; background: #F5A623; color: #0F1C1C; padding: 4px 14px; border-radius: 999px; font-weight: bold; font-size: 11px; margin-bottom: 16px; text-transform: uppercase; }
.section { margin: 20px 0; padding: 16px; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; }
.section-title { font-size: 12px; font-weight: bold; color: #08514F; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
.item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F1F5F9; }
.emoji { font-size: 22px; flex-shrink: 0; }
.ph { font-weight: bold; font-size: 15px; color: #08514F; }
.mn { color: #4A6565; font-size: 13.5px; line-height: 1.5; }
.alert-box { background: #FEF3C7; border-left: 4px solid #F5A623; padding: 12px; border-radius: 8px; margin: 12px 0; }
.foot { text-align: center; margin-top: 40px; font-size: 11px; color: #7A9E9E; }
</style>
</head><body>
<div class="badge">${mnemonic.category} · ${mnemonic.specialty}</div>
<h1>${mnemonic.title}</h1>
<p style="font-size: 16px; color: #08514F; font-weight: bold;">Acronym / Key: ${mnemonic.acronym}</p>
<p style="color: #4A6565;">${mnemonic.description}</p>
<div class="section">
  <div class="section-title">Breakdown</div>
  ${mnemonic.breakdown.map(b => `<div class="item"><div class="emoji">${b.emoji}</div><div><div class="ph">${b.phrase}</div><div class="mn">${b.meaning}</div></div></div>`).join('')}
</div>
${mnemonic.clinical_significance ? `<div class="section"><div class="section-title">Clinical Significance</div><p class="mn">${mnemonic.clinical_significance}</p></div>` : ''}
${mnemonic.exam_traps ? `<div class="alert-box"><div class="section-title" style="color: #92400E;">Common NCK Exam Traps</div><p class="mn">${mnemonic.exam_traps}</p></div>` : ''}
${mnemonic.memory_pearl ? `<div class="alert-box" style="background:#ECFDF5; border-color:#10B981;"><div class="section-title" style="color:#065F46;">Memory Pearl</div><p class="mn">${mnemonic.memory_pearl}</p></div>` : ''}
${mnemonic.high_yield_tip ? `<div class="section"><div class="section-title">High-Yield Tip</div><p class="mn">${mnemonic.high_yield_tip}</p></div>` : ''}
<div class="foot">Downloaded from NurseFiti.com · Kenya's #1 Nursing Prep Platform</div>
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
    const text = `🧠 NurseFiti Mnemonic: ${mnemonic.title}\nKey: ${mnemonic.acronym}\n\n${mnemonic.phrases.join('\n')}\n\nMaster all 69+ NCK nursing mnemonics on https://www.nursefiti.co.ke/mnemonics`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Copied mnemonic study note to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="bg-white dark:bg-[var(--color-card)] rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-[var(--color-border)] overflow-hidden my-auto"
      >
        {/* Header */}
        <div
          className="p-5 sm:p-6 border-b border-[var(--color-border)] flex items-start justify-between gap-4"
          style={{ background: 'var(--color-primary-xlight)' }}
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                className="text-[10px] font-heading font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                style={{
                  background: cat.soft,
                  color: cat.bg,
                  border: `1px solid ${cat.border}`,
                }}
              >
                {mnemonic.category}
              </span>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {mnemonic.specialty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary">
              {mnemonic.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-accent-dark mt-0.5">
              Acronym: {mnemonic.acronym}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href={`/mnemonics/today?id=${mnemonic.id}`}>
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-dark text-xs font-heading font-bold uppercase tracking-wider hover:bg-accent-light transition-all shadow-xs"
                title="Open full page experience"
              >
                <span>↗</span> Full Page
              </button>
            </Link>
            <button
              onClick={() => onToggleBookmark(mnemonic.id)}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-white hover:bg-neutral-light/30 transition-colors"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this mnemonic'}
            >
              <span className="text-lg">{isBookmarked ? '⭐' : '☆'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-white hover:bg-neutral-light/30 transition-colors text-lg leading-none"
              title="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body - Responsive 2 Columns on desktop */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column (5 cols): Key Phrases & Breakdown */}
            <div className="md:col-span-5 space-y-5">
              {/* Timeline Phrases */}
              <div className="p-4 rounded-xl bg-primary-xlight/40 border border-primary/15">
                <p className="text-xs font-heading font-extrabold text-primary uppercase tracking-wider mb-2.5">
                  Key Memory Phrases
                </p>
                <div className="flex flex-col gap-2">
                  {mnemonic.phrases.map((phrase, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-primary">
                      <span className="w-5 h-5 rounded-full bg-accent text-dark text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{phrase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown Items */}
              <div>
                <h3 className="text-xs font-heading font-extrabold text-[var(--color-neutral-mid)] uppercase tracking-wider mb-3">
                  Anatomical & Clinical Breakdown
                </h3>
                <div className="space-y-2.5">
                  {mnemonic.breakdown.map((item: BreakdownItem, i: number) => (
                    <div
                      key={i}
                      className="flex gap-3.5 p-3.5 rounded-xl bg-white dark:bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm hover:border-primary/30 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-xlight border border-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                        {item.emoji}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-primary">
                          {item.phrase}
                        </h4>
                        <p className="font-body text-xs sm:text-sm text-[var(--color-neutral-mid)] leading-relaxed mt-0.5">
                          {item.meaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Clinical Significance, Causes, Traps, Pearls, Practice Question */}
            <div className="md:col-span-7 space-y-5">
              {/* Clinical Significance */}
              {mnemonic.clinical_significance && (
                <div className="p-4 rounded-xl bg-primary-xlight/50 border-l-4 border-primary">
                  <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-primary uppercase tracking-wider mb-1.5">
                    <span>🩺</span> Clinical Significance
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-neutral-mid)] leading-relaxed m-0">
                    {mnemonic.clinical_significance}
                  </p>
                </div>
              )}

              {/* Common Causes */}
              {mnemonic.causes && mnemonic.causes.length > 0 && (
                <div className="p-4 rounded-xl bg-accent-light/40 border-l-4 border-accent">
                  <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-accent-dark uppercase tracking-wider mb-2">
                    <span>💊</span> Common Causes & Associated Conditions
                  </div>
                  <ul className="text-xs sm:text-sm text-[var(--color-neutral-mid)] space-y-1 pl-4 list-disc m-0">
                    {mnemonic.causes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exam Traps */}
              {mnemonic.exam_traps && (
                <div className="p-4 rounded-xl bg-[#FFF0F0] dark:bg-error/10 border-l-4 border-error">
                  <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-error uppercase tracking-wider mb-1.5">
                    <span>⚠️</span> Common NCK Exam Traps
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-neutral-mid)] leading-relaxed m-0">
                    {mnemonic.exam_traps}
                  </p>
                </div>
              )}

              {/* Memory Pearl & High-Yield Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mnemonic.memory_pearl && (
                  <div className="p-4 rounded-xl bg-accent-light/50 border-l-4 border-accent">
                    <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-accent-dark uppercase tracking-wider mb-1.5">
                      <span>💡</span> Memory Pearl
                    </div>
                    <p className="text-xs sm:text-sm font-semibold italic text-accent-dark leading-relaxed m-0">
                      {mnemonic.memory_pearl}
                    </p>
                  </div>
                )}

                {mnemonic.high_yield_tip && (
                  <div className="p-4 rounded-xl bg-primary-xlight/60 border-l-4 border-primary">
                    <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-primary uppercase tracking-wider mb-1.5">
                      <span>🎯</span> NCK High-Yield Tip
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-primary leading-relaxed m-0">
                      {mnemonic.high_yield_tip}
                    </p>
                  </div>
                )}
              </div>

              {/* Practice Question */}
              {mnemonic.practice_question && (
                <PracticeQuestionCard pq={mnemonic.practice_question} catColor={cat.bg} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/mnemonics/today?id=${mnemonic.id}`}>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-dark text-xs font-heading font-extrabold uppercase tracking-wider hover:bg-accent-light transition-all shadow-xs"
              >
                <span>📖</span> Full Page View →
              </button>
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] bg-white text-xs font-semibold text-primary hover:bg-neutral-light/20 transition-all"
            >
              <span>📋</span> Copy Notes
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-mid transition-all shadow-sm"
            >
              <span>⬇️</span> Download PDF
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-transparent text-xs font-semibold text-[var(--color-neutral-mid)] hover:text-dark transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Student Mnemonics Library Page ──────────────────────────────────────
export default function StudentMnemonicsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mnemonics, setMnemonics] = useState<Mnemonic[]>(ALL_MNEMONICS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [activeMnemonic, setActiveMnemonic] = useState<Mnemonic | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [planTier, setPlanTier] = useState<string>('free');

  // Load bookmarks from localStorage immediately (zero lag)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nf_bookmarked_mnemonics');
      if (stored) {
        setBookmarkedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Fetch plan tier and check for newly created DB mnemonics
  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: prof } = await supabase
            .from('student_profiles')
            .select('plan_tier, plan_expires_at')
            .eq('id', user.id)
            .single();
          setPlanTier(effectiveTier((prof as any)?.plan_tier, (prof as any)?.plan_expires_at));
        }

        // Background sync: Fetch any newly added admin mnemonics from Supabase
        const { data: dbData, error } = await supabase.from('mnemonics').select('*');
        if (!error && dbData && dbData.length > 0) {
          // Merge with static list seamlessly
          const dbMap = new Map(dbData.map(d => [d.title.toLowerCase().trim(), d]));
          const merged = ALL_MNEMONICS.map(m => {
            const found = dbMap.get(m.title.toLowerCase().trim());
            return found ? { ...m, ...found } : m;
          });
          // Add any newly created DB items not in static
          const staticTitles = new Set(ALL_MNEMONICS.map(m => m.title.toLowerCase().trim()));
          for (const d of dbData) {
            if (!staticTitles.has(d.title.toLowerCase().trim())) {
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
          setMnemonics(merged);
        }
      } catch {
        /* Fall back gracefully to ALL_MNEMONICS */
      }
    }
    loadUser();
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast('Removed from saved mnemonics', { icon: '🗑️' });
      } else {
        next.add(id);
        toast.success('Saved to your mnemonics!');
      }
      try {
        localStorage.setItem('nf_bookmarked_mnemonics', JSON.stringify(Array.from(next)));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  // Extract all unique specialties
  const specialties = useMemo(() => {
    const list = Array.from(new Set(mnemonics.map(m => m.specialty).filter(Boolean)));
    return ['All', ...list.sort()];
  }, [mnemonics]);

  // Featured mnemonic of the day
  const todayMnemonic = useMemo(() => getMnemonicOfTheDay(mnemonics), [mnemonics]);

  // High performance instant filtering
  const filteredMnemonics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return mnemonics.filter((m) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const catNorm = m.category.toLowerCase();
        const selNorm = selectedCategory.toLowerCase();
        if (selNorm === 'obstetrics' && !catNorm.includes('obstetric') && !catNorm.includes('matern')) return false;
        else if (catNorm !== selNorm) return false;
      }
      // Specialty filter
      if (selectedSpecialty !== 'All' && m.specialty !== selectedSpecialty) {
        return false;
      }
      // Bookmarked filter
      if (onlyBookmarked && !bookmarkedIds.has(m.id)) {
        return false;
      }
      // Search query
      if (q) {
        const matchesTitle = m.title.toLowerCase().includes(q);
        const matchesAcronym = m.acronym.toLowerCase().includes(q);
        const matchesDesc = m.description.toLowerCase().includes(q);
        const matchesTags = (m.tags || []).some(t => t.toLowerCase().includes(q));
        const matchesPhrases = (m.phrases || []).some(p => p.toLowerCase().includes(q));
        const matchesCauses = (m.causes || []).some(c => c.toLowerCase().includes(q));
        return matchesTitle || matchesAcronym || matchesDesc || matchesTags || matchesPhrases || matchesCauses;
      }
      return true;
    });
  }, [mnemonics, searchQuery, selectedCategory, selectedSpecialty, onlyBookmarked, bookmarkedIds]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 text-[var(--color-text)]">
      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-dark via-primary to-primary-mid text-white py-8 sm:py-10 px-6 sm:px-8 shadow-xl border border-primary-light/20">
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🧠</span>
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-accent">
                  NurseFiti Revision Vault
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                Mnemonics Library
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed font-body">
                Master 69+ scientifically verified clinical mnemonics. Handpicked from top nursing social channels, NCK exam guidelines, and clinical ward practice.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/mnemonics/today">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-dark font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-accent-light transition-all shadow-glow-amber">
                  <span>✨</span> Today&apos;s Daily Mnemonic
                </button>
              </Link>
              <button
                onClick={() => setOnlyBookmarked(v => !v)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all border ${
                  onlyBookmarked
                    ? 'bg-white text-primary border-white'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <span>⭐</span> Saved ({bookmarkedIds.size})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* ── Mnemonic of the Day Spotlight Banner ───────────────────── */}
        {todayMnemonic && !onlyBookmarked && !searchQuery && (
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-primary to-primary-mid text-white shadow-xl border border-primary-light/20">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-heading font-bold uppercase tracking-wider">
                  <span>📅</span> Mnemonic of the Day · {todayMnemonic.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {todayMnemonic.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                  {todayMnemonic.acronym} — {todayMnemonic.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setActiveMnemonic(todayMnemonic)}
                  className="px-5 py-3 rounded-xl bg-white text-primary font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all shadow-md"
                >
                  Quick View 📖
                </button>
                <Link href="/mnemonics/today">
                  <button className="px-5 py-3 rounded-xl bg-accent text-dark font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-accent-light transition-all shadow-glow-amber">
                    Full Experience →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Search & Filter Controls ───────────────────────────────── */}
        <div className="bg-white dark:bg-[var(--color-card)] rounded-2xl p-4 sm:p-6 border border-[var(--color-border)] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-mid)] text-base">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, drug, syndrome, acronym, or symptom (e.g. MONA, Insulin, Burn, Lithium)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-body"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-neutral-mid)] hover:text-dark px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Specialty Filter */}
            <div className="min-w-[180px]">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-3 px-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs font-semibold focus:outline-none focus:border-primary"
              >
                <option value="All">All Specialties</option>
                {specialties.filter(s => s !== 'All').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-primary-xlight/60 text-[var(--color-neutral-mid)] hover:bg-primary-xlight hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Result Count and Active Filters */}
          <div className="flex items-center justify-between text-xs text-[var(--color-neutral-mid)] pt-1 border-t border-[var(--color-border)]">
            <div>
              Showing <span className="font-bold text-primary">{filteredMnemonics.length}</span> of {mnemonics.length} mnemonics
              {onlyBookmarked && ' (Saved only)'}
            </div>
            {(searchQuery || selectedCategory !== 'All' || selectedSpecialty !== 'All' || onlyBookmarked) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedSpecialty('All');
                  setOnlyBookmarked(false);
                }}
                className="text-primary hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Mnemonic Cards Grid ────────────────────────────────────── */}
        {filteredMnemonics.length === 0 ? (
          <div className="bg-white dark:bg-[var(--color-card)] rounded-2xl p-12 text-center border border-[var(--color-border)]">
            <span className="text-5xl mb-3 block">🔎</span>
            <h3 className="text-lg font-heading font-bold text-primary mb-1">
              No matching mnemonics found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-neutral-mid)] max-w-md mx-auto mb-4">
              Try adjusting your search terms or clearing category and specialty filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSpecialty('All');
                setOnlyBookmarked(false);
              }}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold font-heading uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMnemonics.map((m) => {
              const cat = CATEGORY_COLORS[m.category] || CATEGORY_COLORS.Pharmacology;
              const isBookmarked = bookmarkedIds.has(m.id);

              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
                  onClick={() => setActiveMnemonic(m)}
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-[10px] font-heading font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            background: cat.soft,
                            color: cat.bg,
                            border: `1px solid ${cat.border}`,
                          }}
                        >
                          {m.category}
                        </span>
                        <span className="text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {m.specialty}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(m.id);
                        }}
                        className="p-1 rounded-lg text-base leading-none text-accent hover:scale-110 transition-transform"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this mnemonic'}
                      >
                        {isBookmarked ? '⭐' : '☆'}
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-primary group-hover:text-primary-mid transition-colors line-clamp-1">
                      {m.title}
                    </h3>

                    <div className="mt-1.5 inline-block px-2.5 py-1 rounded-lg bg-accent/15 border border-accent/25 text-dark dark:text-accent font-heading font-bold text-xs">
                      {m.acronym}
                    </div>

                    <p className="font-body text-xs text-[var(--color-neutral-mid)] line-clamp-2 mt-2 leading-relaxed">
                      {m.description || m.clinical_significance}
                    </p>
                  </div>

                  {/* Breakdown Preview */}
                  <div className="px-5 py-2.5 bg-primary-xlight/30 border-y border-[var(--color-border)] space-y-1">
                    {(m.breakdown || []).slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-primary font-medium truncate">
                        <span>{b.emoji}</span>
                        <span className="truncate">{b.phrase}</span>
                      </div>
                    ))}
                    {(m.breakdown?.length || 0) > 3 && (
                      <div className="text-[11px] font-bold text-[var(--color-neutral-mid)] pt-0.5">
                        +{m.breakdown.length - 3} more points in full breakdown
                      </div>
                    )}
                  </div>

                  {/* Card Action */}
                  <div className="p-3.5 sm:p-4 pt-3 flex items-center justify-between text-xs border-t border-[var(--color-border)] bg-[var(--color-bg)]/40">
                    <span className="font-heading font-bold text-primary group-hover:underline">
                      View Details →
                    </span>
                    <div className="flex items-center gap-1.5">
                      {m.practice_question && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
                          Quiz
                        </span>
                      )}
                      <Link
                        href={`/mnemonics/today?id=${m.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg bg-accent/20 hover:bg-accent text-dark font-heading font-extrabold text-[10px] uppercase tracking-wider transition-colors"
                        title="Open full page view"
                      >
                        Full ↗
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 7-Section Detail Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {activeMnemonic && (
          <MnemonicDetailModal
            mnemonic={activeMnemonic}
            isBookmarked={bookmarkedIds.has(activeMnemonic.id)}
            onToggleBookmark={toggleBookmark}
            onClose={() => setActiveMnemonic(null)}
            planTier={planTier}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
