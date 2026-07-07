"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getLimits, effectiveTier } from '@/lib/planLimits';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Deck {
  id: string;
  name: string;
  description: string | null;
  cadre: string;
  unit: string;
  card_count: number;
}

interface Flashcard {
  id: string;
  deck_id: string;
  front_text: string;
  back_text: string;
  back_highlight: string | null;
  image_url: string | null;
  unit: string;
}

interface CardProgress {
  card_id: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
}

type StudyState = 'decks' | 'theme-picker' | 'studying' | 'complete';
type FlipState = 'front' | 'back';
type Rating = 'again' | 'hard' | 'good' | 'easy';

// SM-2 inspired intervals
const INTERVALS: Record<Rating, number> = {
  again: 0,
  hard:  1,
  good:  3,
  easy:  7,
};

// ─── Themes ───────────────────────────────────────────────────────────────────

interface FlashcardTheme {
  id: string;
  name: string;
  description: string;
  emoji: string;
  // Card face styles (CSS-in-JS style objects as strings for inline style)
  frontBg: string;
  frontText: string;
  frontBorder: string;
  backBg: string;
  backText: string;
  backBorder: string;
  highlightColor: string;
  // Rating button colors
  ratingStyle: 'default' | 'soft' | 'bold';
  // Optional animation class
  animation: 'flip-3d' | 'slide' | 'fade' | 'bounce-in';
  // Emoji mascot shown on front
  mascot?: string;
  // Include anime-style decoration
  hasAnime: boolean;
  // Background pattern
  pattern: 'none' | 'dots' | 'grid' | 'waves' | 'sakura';
  // Tip: what psychology principle is used
  psychTip: string;
}

const THEMES: FlashcardTheme[] = [
  {
    id: 'clinical',
    name: 'Clinical Focus',
    description: 'Clean, distraction-free — mimics clinical notes',
    emoji: '🏥',
    frontBg: '#FFFFFF',
    frontText: '#1A2E2D',
    frontBorder: '#08514F',
    backBg: '#F0FDF9',
    backText: '#065F46',
    backBorder: '#A7F3D0',
    highlightColor: '#08514F',
    ratingStyle: 'default',
    animation: 'flip-3d',
    hasAnime: false,
    pattern: 'none',
    psychTip: 'High contrast reduces cognitive load — your brain focuses on the content, not the design.',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Dark mode — ideal for late-night study sessions',
    emoji: '🦉',
    frontBg: '#0F1F1E',
    frontText: '#E2F5F3',
    frontBorder: '#0A6865',
    backBg: '#122928',
    backText: '#A7F3D0',
    backBorder: '#0A6865',
    highlightColor: '#F5A623',
    ratingStyle: 'bold',
    animation: 'fade',
    hasAnime: false,
    pattern: 'dots',
    psychTip: 'Blue light reduction at night improves melatonin production — you retain more of what you study.',
  },
  {
    id: 'sakura',
    name: 'Sakura',
    description: 'Soft pastels with anime flair — makes studying enjoyable',
    emoji: '🌸',
    frontBg: '#FFF0F5',
    frontText: '#831843',
    frontBorder: '#FBCFE8',
    backBg: '#FDF2F8',
    backText: '#9D174D',
    backBorder: '#F9A8D4',
    highlightColor: '#DB2777',
    ratingStyle: 'soft',
    animation: 'bounce-in',
    mascot: '🌸',
    hasAnime: true,
    pattern: 'sakura',
    psychTip: 'Positive emotions during learning (joy, curiosity) activate the hippocampus — memory consolidation improves by up to 40%.',
  },
  {
    id: 'ocean',
    name: 'Ocean Calm',
    description: 'Blue tones — reduces anxiety before exams',
    emoji: '🌊',
    frontBg: '#EFF6FF',
    frontText: '#1E3A5F',
    frontBorder: '#BFDBFE',
    backBg: '#EFF6FF',
    backText: '#1E40AF',
    backBorder: '#93C5FD',
    highlightColor: '#2563EB',
    ratingStyle: 'soft',
    animation: 'slide',
    hasAnime: false,
    pattern: 'waves',
    psychTip: 'Blue environments are linked to reduced cortisol levels — studying in calming colours lowers test anxiety.',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    description: 'Earthy greens — grounding and focus-inducing',
    emoji: '🌿',
    frontBg: '#F0FDF4',
    frontText: '#14532D',
    frontBorder: '#86EFAC',
    backBg: '#DCFCE7',
    backText: '#15803D',
    backBorder: '#4ADE80',
    highlightColor: '#16A34A',
    ratingStyle: 'default',
    animation: 'flip-3d',
    hasAnime: false,
    pattern: 'grid',
    psychTip: 'Green is associated with growth and safety — it signals your brain that it is okay to absorb new information.',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm amber tones — energising for morning sessions',
    emoji: '☀️',
    frontBg: '#FFFBEB',
    frontText: '#78350F',
    frontBorder: '#FCD34D',
    backBg: '#FEF3C7',
    backText: '#92400E',
    backBorder: '#F59E0B',
    highlightColor: '#D97706',
    ratingStyle: 'bold',
    animation: 'flip-3d',
    mascot: '☀️',
    hasAnime: false,
    pattern: 'none',
    psychTip: 'Warm tones in the morning sync with your circadian rhythm — your brain is most receptive to new information before noon.',
  },
  {
    id: 'neon-lab',
    name: 'Neon Lab',
    description: 'High-energy contrast — for when you need to stay awake',
    emoji: '⚡',
    frontBg: '#0A0A0F',
    frontText: '#F0F0FF',
    frontBorder: '#7C3AED',
    backBg: '#0D0D18',
    backText: '#C4B5FD',
    backBorder: '#7C3AED',
    highlightColor: '#8B5CF6',
    ratingStyle: 'bold',
    animation: 'fade',
    hasAnime: true,
    pattern: 'dots',
    psychTip: 'High-contrast environments trigger mild arousal — useful for factual recall drills when mental energy is low.',
  },
];

// ─── Pattern SVG backgrounds ──────────────────────────────────────────────────

function getPatternStyle(pattern: FlashcardTheme['pattern'], color: string): React.CSSProperties {
  if (pattern === 'none') return {};
  const opacity = 0.06;
  const c = color;
  switch (pattern) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(circle, ${c} 1.5px, transparent 1.5px)`,
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat',
      };
    case 'grid':
      return {
        backgroundImage: `linear-gradient(${c}${Math.round(opacity * 255).toString(16).padStart(2,'0')} 1px, transparent 1px), linear-gradient(90deg, ${c}${Math.round(opacity * 255).toString(16).padStart(2,'0')} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      };
    case 'waves':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20'%3E%3Cpath d='M0 10 Q25 0 50 10 Q75 20 100 10' fill='none' stroke='${encodeURIComponent(c)}' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 20px',
        backgroundRepeat: 'repeat-x',
      };
    case 'sakura':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ctext x='10' y='30' font-size='16' opacity='0.07'%3E🌸%3C/text%3E%3Ctext x='35' y='55' font-size='12' opacity='0.05'%3E🌸%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      };
    default: return {};
  }
}

// ─── Theme Card Component ─────────────────────────────────────────────────────

function ThemeCard({ theme, selected, onSelect }: { theme: FlashcardTheme; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] ${
        selected ? 'ring-2 ring-offset-2 ring-primary border-primary' : 'border-[var(--color-border)] hover:border-primary/50'
      }`}
    >
      {/* Mini preview card */}
      <div className="h-28 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: theme.frontBg, ...getPatternStyle(theme.pattern, theme.frontText) }}>
        {theme.hasAnime && (
          <div className="absolute top-2 right-2 text-2xl opacity-30">{theme.mascot ?? theme.emoji}</div>
        )}
        <div className="text-center px-4">
          <p className="text-xs font-semibold opacity-60 mb-1" style={{ color: theme.frontText }}>QUESTION</p>
          <p className="text-sm font-bold leading-tight" style={{ color: theme.frontText }}>
            What is the normal adult respiratory rate?
          </p>
        </div>
        {selected && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
      </div>
      <div className="p-3" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{theme.emoji}</span>
          <p className="font-semibold text-sm text-[var(--color-text)]">{theme.name}</p>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mb-2">{theme.description}</p>
        <p className="text-xs italic text-[var(--color-text-secondary)] leading-tight">💡 {theme.psychTip.slice(0, 70)}…</p>
      </div>
    </button>
  );
}

// ─── Flashcard Study Component ────────────────────────────────────────────────

function FlashcardStudy({
  card,
  cardIndex,
  total,
  theme,
  flipState,
  isFlipping,
  onFlip,
  onRate,
}: {
  card: Flashcard;
  cardIndex: number;
  total: number;
  theme: FlashcardTheme;
  flipState: FlipState;
  isFlipping: boolean;
  onFlip: () => void;
  onRate: (r: Rating) => void;
}) {
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Reset AI state when card changes
  useEffect(() => {
    setShowAiExplanation(false);
    setAiExplanation('');
    setIsGeneratingAi(false);
  }, [card.id]);

  const handleAskAI = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAiExplanation(true);
    if (aiExplanation || isGeneratingAi) return;
    setIsGeneratingAi(true);
    setAiExplanation('');
    try {
      const res = await fetch('/api/ai/flashcard-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ front: card.front_text, back: card.back_text, highlight: card.back_highlight }),
      });
      if (!res.ok) throw new Error('Failed to generate explanation');
      if (!res.body) throw new Error('No stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAiExplanation(prev => prev + decoder.decode(value));
      }
    } catch (err) {
      setAiExplanation('Sorry, NurseFiti AI could not generate an explanation at this time.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const isFront = flipState === 'front';
  const bg = isFront ? theme.frontBg : theme.backBg;
  const textColor = isFront ? theme.frontText : theme.backText;
  const border = isFront ? theme.frontBorder : theme.backBorder;
  const patternStyle = getPatternStyle(theme.pattern, textColor);

  const ratingButtons: Array<{ r: Rating; label: string; sub: string; color: string; bg: string }> =
    theme.ratingStyle === 'bold'
      ? [
          { r: 'again', label: 'Again',  sub: '<1 min', color: '#fff', bg: '#EF4444' },
          { r: 'hard',  label: 'Hard',   sub: '1 day',  color: '#fff', bg: '#F59E0B' },
          { r: 'good',  label: 'Good',   sub: '3 days', color: '#fff', bg: '#3B82F6' },
          { r: 'easy',  label: 'Easy',   sub: '7 days', color: '#fff', bg: '#10B981' },
        ]
      : theme.ratingStyle === 'soft'
      ? [
          { r: 'again', label: 'Again',  sub: '<1 min', color: '#991B1B', bg: '#FEE2E2' },
          { r: 'hard',  label: 'Hard',   sub: '1 day',  color: '#92400E', bg: '#FEF3C7' },
          { r: 'good',  label: 'Good',   sub: '3 days', color: '#1E40AF', bg: '#DBEAFE' },
          { r: 'easy',  label: 'Easy',   sub: '7 days', color: '#065F46', bg: '#D1FAE5' },
        ]
      : [
          { r: 'again', label: 'Again',  sub: '<1 min', color: '#EF4444', bg: 'transparent' },
          { r: 'hard',  label: 'Hard',   sub: '1 day',  color: '#F59E0B', bg: 'transparent' },
          { r: 'good',  label: 'Good',   sub: '3 days', color: '#3B82F6', bg: 'transparent' },
          { r: 'easy',  label: 'Easy',   sub: '7 days', color: '#10B981', bg: 'transparent' },
        ];

  return (
    <div className="max-w-2xl mx-auto select-none">
      <ProgressBar value={(cardIndex / total) * 100} showLabel={false} className="mb-4" />
      <p className="text-xs text-[var(--color-text-secondary)] text-center mb-4">
        Card {cardIndex + 1} of {total} · {card.unit}
      </p>

      {/* The card */}
      <div
        className="relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-200 shadow-lg active:scale-[0.98]"
        style={{
          minHeight: '280px',
          backgroundColor: bg,
          border: `2px solid ${border}`,
          ...patternStyle,
        }}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        aria-label={isFront ? 'Show answer' : 'Hide answer'}
        onKeyDown={e => e.key === 'Enter' && onFlip()}
      >
        {/* Anime decoration */}
        {theme.hasAnime && (
          <>
            <div className="absolute top-3 right-4 text-4xl opacity-10 pointer-events-none select-none">
              {theme.mascot ?? theme.emoji}
            </div>
            <div className="absolute bottom-3 left-4 text-2xl opacity-5 pointer-events-none select-none">
              {theme.mascot ?? theme.emoji}
            </div>
          </>
        )}

        <div
          className="flex flex-col items-center justify-center p-8 text-center min-h-[280px]"
          style={{ opacity: isFlipping ? 0 : 1, transition: 'opacity 0.15s ease' }}
        >
          {isFront ? (
            <>
              <Badge variant="secondary" className="mb-4">{card.unit}</Badge>
              {card.image_url && (
                <div className="mb-4 w-full flex justify-center relative aspect-[2] overflow-hidden">
                  <Image 
                    src={card.image_url} 
                    alt="Flashcard diagram" 
                    fill
                    className="object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}
              <p className="text-xl font-semibold leading-relaxed" style={{ color: textColor }}>
                {card.front_text}
              </p>
              <p className="text-xs mt-6 opacity-50" style={{ color: textColor }}>
                Tap or press Enter to reveal →
              </p>
            </>
          ) : (
            <>
              {card.back_highlight && (
                <p
                  className="text-3xl font-heading font-black mb-4 leading-tight"
                  style={{ color: theme.highlightColor }}
                >
                  {card.back_highlight}
                </p>
              )}
              <p className="text-base leading-relaxed" style={{ color: textColor }}>
                {card.back_text}
              </p>
            </>
          )}

          {/* AI Explanation Drawer (Inline) */}
          {!isFront && showAiExplanation && (
            <div 
              className="mt-6 p-4 rounded-xl text-left bg-[var(--color-bg)]/80 backdrop-blur border shadow-inner w-full"
              style={{ borderColor: border, color: textColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🤖</span>
                <span className="font-bold text-sm">NurseFiti AI</span>
                {isGeneratingAi && <Spinner size="sm" className="ml-auto opacity-50" />}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiExplanation || 'Thinking...'}</p>
            </div>
          )}
        </div>

        {/* Ask AI Button (Absolute positioned on back) */}
        {!isFront && !showAiExplanation && (
          <button
            onClick={handleAskAI}
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 active:scale-95 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur"
            style={{ color: textColor }}
          >
            🤖 Ask AI
          </button>
        )}

        {/* Face indicator */}
        <div
          className="absolute bottom-3 right-4 text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${border}40`,
            color: textColor,
          }}
        >
          {isFront ? 'Question' : 'Answer'}
        </div>
      </div>

      {/* Rating / action area */}
      {flipState === 'back' ? (
        <div className="mt-5 grid grid-cols-4 gap-3">
          {ratingButtons.map(({ r, label, sub, color, bg: btnBg }) => (
            <button
              key={r}
              onClick={() => onRate(r)}
              className="flex flex-col items-center py-3 px-2 rounded-xl border-2 font-semibold transition-all hover:scale-[1.04] active:scale-[0.97] min-h-[60px]"
              style={{
                backgroundColor: btnBg === 'transparent' ? undefined : btnBg,
                borderColor: color === '#fff' ? btnBg : color,
                color,
              }}
            >
              <span className="text-sm font-bold">{label}</span>
              <span className="text-xs opacity-70 mt-0.5">{sub}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-5 flex justify-center">
          <button
            onClick={onFlip}
            className="px-12 py-3 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: theme.highlightColor, color: '#fff' }}
          >
            Reveal Answer
          </button>
        </div>
      )}

      {/* Keyboard hint */}
      <p className="text-center text-xs text-[var(--color-text-secondary)] mt-4 opacity-60">
        {flipState === 'back' ? '1 = Again · 2 = Hard · 3 = Good · 4 = Easy' : 'Space = Flip'}
      </p>
    </div>
  );
}

// ─── PDF Generator ────────────────────────────────────────────────────────────

function generateDeckPdf(deck: Deck, cards: Flashcard[], theme: FlashcardTheme, studentName: string): string {
  const cardRows = cards.map((c, i) => `
    <div class="card-row">
      <div class="card-num">${i + 1}</div>
      <div class="card-q">
        <p class="q-label">Q</p>
        <p>${c.front_text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
      <div class="card-a">
        <p class="a-label">A</p>
        ${c.back_highlight ? `<p class="highlight">${c.back_highlight.replace(/</g, '&lt;')}</p>` : ''}
        <p>${c.back_text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
    </div>`).join('');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>${deck.name} — NurseFiti Flashcards</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: ${theme.frontBg}; color: ${theme.frontText}; font-size: 13px; }
  .header { background: linear-gradient(135deg, #08514F 0%, #0A6865 100%); color: white; padding: 20px 24px; margin-bottom: 20px; }
  .header h1 { font-size: 20px; font-weight: 800; }
  .header p { font-size: 12px; opacity: 0.75; margin-top: 4px; }
  .card-row { display: grid; grid-template-columns: 32px 1fr 1fr; gap: 0; margin-bottom: 12px; border-radius: 10px; overflow: hidden; border: 1px solid ${theme.frontBorder}; break-inside: avoid; }
  .card-num { background: ${theme.highlightColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; padding: 4px; }
  .card-q { background: ${theme.frontBg}; padding: 10px 12px; border-right: 1px solid ${theme.frontBorder}; }
  .card-a { background: ${theme.backBg}; color: ${theme.backText}; padding: 10px 12px; }
  .q-label, .a-label { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; margin-bottom: 4px; }
  .highlight { font-weight: 800; color: ${theme.highlightColor}; font-size: 15px; margin-bottom: 3px; }
  .footer { text-align: center; font-size: 10px; color: #9ca3af; margin-top: 24px; padding-top: 12px; border-top: 1px solid ${theme.frontBorder}; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .card-row { break-inside: avoid; }
  }
</style></head><body>
<div style="max-width:900px;margin:0 auto;padding:16px">
  <div class="header">
    <h1>NurseFiti Flashcards — ${deck.name}</h1>
    <p>${deck.unit} · ${cards.length} cards · Generated for ${studentName}</p>
  </div>
  ${cardRows}
  <div class="footer">NurseFiti · nursefiti.co.ke · Generated ${new Date().toLocaleDateString('en-KE')}</div>
</div></body></html>`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FlashcardsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [studyState, setStudyState] = useState<StudyState>('decks');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [pendingDeck, setPendingDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipState, setFlipState] = useState<FlipState>('front');
  const [isFlipping, setIsFlipping] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('Student');
  const [dueCount, setDueCount] = useState<Record<string, number>>({});
  const [planTier, setPlanTier] = useState<string>('free');
  const [selectedTheme, setSelectedTheme] = useState<FlashcardTheme>(THEMES[0]);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // ── Init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      const [{ data: sp }, { data: profile }] = await Promise.all([
        (supabase as any).from('student_profiles').select('plan_tier, plan_expires_at').eq('id', user.id).single(),
        (supabase as any).from('profiles').select('full_name').eq('id', user.id).single(),
      ]);

      if (sp) {
        const tier = effectiveTier(sp.plan_tier, sp.plan_expires_at);
        setPlanTier(tier);
        if (getLimits(tier).flashcardsAccess) await loadDecks(user.id);
      }
      if (profile?.full_name) setStudentName(profile.full_name);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  useEffect(() => {
    if (studyState !== 'studying') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      if (flipState === 'back') {
        if (e.key === '1') rate('again');
        if (e.key === '2') rate('hard');
        if (e.key === '3') rate('good');
        if (e.key === '4') rate('easy');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyState, flipState, cardIndex]);

  const loadDecks = async (uid: string) => {
    const { data: deckData } = await (supabase as any).from('flashcard_decks').select('*').order('name');
    if (!deckData) return;
    setDecks(deckData as Deck[]);

    // Fetch due counts using the new lightweight RPC
    const { data: dueCountsData } = await (supabase as any).rpc('get_due_flashcard_counts', { p_student_id: uid });
    
    const counts: Record<string, number> = {};
    // Initialize all to 0
    for (const deck of (deckData as Deck[])) {
      counts[deck.id] = 0;
    }
    // Update with actual counts
    for (const row of (dueCountsData ?? []) as any[]) {
      counts[row.deck_id] = Number(row.due_count);
    }
    
    setDueCount(counts);
  };

  // ── Start deck (after theme chosen) ────────────────────────────────────────
  const startDeck = async (deck: Deck) => {
    if (!userId) return;
    setIsLoading(true);
    setSelectedDeck(deck);

    const { data: allCardsData } = await (supabase as any).from('flashcards').select('*').eq('deck_id', deck.id);
    const allCards = (allCardsData ?? []) as Flashcard[];
    if (allCards.length === 0) {
      toast.error('No cards in this deck yet.');
      setIsLoading(false);
      return;
    }

    const now = new Date().toISOString();
    const { data: progressData } = await (supabase as any).from('flashcard_progress')
      .select('*').eq('student_id', userId).in('card_id', allCards.map(c => c.id));
    const progress = (progressData ?? []) as CardProgress[];
    const progressMap = new Map<string, CardProgress>(progress.map(p => [p.card_id, p]));

    const dueCards = allCards.filter(c => {
      const p = progressMap.get(c.id);
      return !p || p.next_review_at <= now;
    });

    const studyCards = dueCards.length > 0 ? dueCards : allCards.slice(0, 20);
    setCards(studyCards.sort(() => Math.random() - 0.5));
    setCardIndex(0);
    setFlipState('front');
    setSessionStats({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0 });
    setStudyState('studying');
    setIsLoading(false);
  };

  const flip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setFlipState(f => f === 'front' ? 'back' : 'front');
      setIsFlipping(false);
    }, 150);
  };

  const rate = useCallback(async (rating: Rating) => {
    if (!userId || cardIndex >= cards.length) return;
    const card = cards[cardIndex];
    const intervalDays = INTERVALS[rating];
    const nextReview = new Date();
    if (intervalDays === 0) {
      nextReview.setMinutes(nextReview.getMinutes() + 1);
    } else {
      nextReview.setDate(nextReview.getDate() + intervalDays);
    }

    const { error: upsertError } = await (supabase as any).from('flashcard_progress').upsert({
      student_id: userId,
      card_id: card.id,
      interval_days: intervalDays,
      rating,
      next_review_at: nextReview.toISOString(),
      last_reviewed_at: new Date().toISOString(),
      ease_factor: 2.5,
      repetitions: 1,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'student_id,card_id' });

    if (upsertError) { toast.error('Failed to save progress.'); return; }

    setSessionStats(prev => ({ ...prev, reviewed: prev.reviewed + 1, [rating]: prev[rating] + 1 }));

    if (cardIndex + 1 >= cards.length) {
      const xpEarned = cards.length * 15; // 15 XP per card for faster premium progression
      const { error: xpErr } = await (supabase as any).rpc('update_student_xp', {
        p_student_id: userId,
        p_xp_delta: xpEarned,
      });
      if (xpErr) console.error('Flashcard XP update failed:', xpErr.message ?? xpErr);
      setStudyState('complete');
    } else {
      setCardIndex(i => i + 1);
      setFlipState('front');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, cardIndex, cards]);

  // ── Download deck as PDF ────────────────────────────────────────────────────
  const handleDownloadDeck = async () => {
    if (!selectedDeck || cards.length === 0) return;
    setIsDownloadingPdf(true);
    try {
      const html = generateDeckPdf(selectedDeck, cards, selectedTheme, studentName);
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nursefiti-${selectedDeck.name.replace(/\s+/g, '-').toLowerCase()}-flashcards.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Download ready — open the file in your browser to print as PDF.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  }

  // ── PLAN GATE ──────────────────────────────────────────────────────────────
  if (!getLimits(planTier).flashcardsAccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Flashcards</h1>
        <p className="text-neutral-mid mb-6">Spaced repetition — cards resurface at the optimal moment before you forget them.</p>
        <Card className="text-center py-12 border-primary/20">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Paid Feature</h2>
          <p className="text-neutral-mid mb-2 max-w-sm mx-auto">
            Flashcards with spaced repetition are available on Exam Boost, Success Plan, and Elite Prep.
          </p>
          <p className="text-xs text-neutral-mid mb-6">Upgrade from KSh 69/day</p>
          <Link href="/settings?tab=account">
            <Button variant="primary" size="lg">Upgrade to Unlock Flashcards →</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // ── THEME PICKER ───────────────────────────────────────────────────────────
  if (studyState === 'theme-picker' && pendingDeck) {
    return (
      <div className="max-w-4xl mx-auto pb-24 lg:pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setStudyState('decks'); setPendingDeck(null); }}
            className="text-sm text-primary hover:underline">← Back to Decks</button>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Choose Your Study Style</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Each theme is designed using colour psychology to optimise memory and focus.
            Pick one that matches your mood and study session.
          </p>
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {THEMES.map(theme => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              selected={selectedTheme.id === theme.id}
              onSelect={() => setSelectedTheme(theme)}
            />
          ))}
        </div>

        {/* Selected theme info */}
        <div className="bg-primary-xlight dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{selectedTheme.emoji}</span>
            <p className="font-bold text-[var(--color-text)]">{selectedTheme.name} selected</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            💡 <strong>Psychology:</strong> {selectedTheme.psychTip}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => startDeck(pendingDeck)}
          disabled={isLoading}
        >
          {isLoading ? <><Spinner size="sm" color="white" />&nbsp;Loading cards…</> : `Start Studying — ${pendingDeck.name} →`}
        </Button>
      </div>
    );
  }

  // ── SESSION COMPLETE ───────────────────────────────────────────────────────
  if (studyState === 'complete') {
    return (
      <div className="max-w-md mx-auto text-center pb-24 lg:pb-6">
        <Card className="py-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Session Complete!</h2>
          <p className="text-neutral-mid mb-6">{selectedDeck?.name} · +{cards.length * 15} XP earned</p>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {[
              { label: 'Reviewed', value: sessionStats.reviewed, color: 'text-[var(--color-text)]' },
              { label: 'Again', value: sessionStats.again, color: 'text-error' },
              { label: 'Hard', value: sessionStats.hard, color: 'text-accent' },
              { label: 'Good', value: sessionStats.good, color: 'text-primary' },
              { label: 'Easy', value: sessionStats.easy, color: 'text-success' },
            ].map(s => (
              <div key={s.label}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-neutral-mid">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Intervals explained */}
          <div className="bg-primary-xlight dark:bg-primary/10 rounded-xl p-3 mb-6 text-left">
            <p className="text-xs font-semibold text-[var(--color-text)] mb-2">📅 Next Review Schedule</p>
            <div className="space-y-1 text-xs text-[var(--color-text-secondary)]">
              <p>Cards marked <strong className="text-error">Again</strong> resurface in &lt;1 minute</p>
              <p>Cards marked <strong className="text-accent">Hard</strong> resurface in 1 day</p>
              <p>Cards marked <strong className="text-primary">Good</strong> resurface in 3 days</p>
              <p>Cards marked <strong className="text-success">Easy</strong> resurface in 7 days</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => {
                setStudyState('decks');
                if (userId) loadDecks(userId);
              }}>All Decks</Button>
              <Button variant="primary" className="flex-1" onClick={() => {
                if (selectedDeck) { setPendingDeck(selectedDeck); setStudyState('theme-picker'); }
              }}>Study Again</Button>
            </div>
            {cards.length > 0 && selectedDeck && (
              <Button
                variant="ghost"
                onClick={handleDownloadDeck}
                disabled={isDownloadingPdf}
              >
                {isDownloadingPdf ? <><Spinner size="sm" />&nbsp;Preparing…</> : '⬇ Download Deck as PDF'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ── STUDY MODE ─────────────────────────────────────────────────────────────
  if (studyState === 'studying' && cards.length > 0) {
    const card = cards[cardIndex];
    return (
      <div className="max-w-2xl mx-auto pb-24 lg:pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-bold text-[var(--color-text)]">{selectedDeck?.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-[var(--color-text-secondary)]">{selectedTheme.emoji} {selectedTheme.name}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">·</span>
              <button
                onClick={() => { if (selectedDeck) { setPendingDeck(selectedDeck); setStudyState('theme-picker'); } }}
                className="text-xs text-primary hover:underline"
              >
                Change theme
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleDownloadDeck} disabled={isDownloadingPdf}>
              {isDownloadingPdf ? <Spinner size="sm" /> : '⬇ PDF'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setStudyState('decks')}>Exit</Button>
          </div>
        </div>

        <FlashcardStudy
          card={card}
          cardIndex={cardIndex}
          total={cards.length}
          theme={selectedTheme}
          flipState={flipState}
          isFlipping={isFlipping}
          onFlip={flip}
          onRate={rate}
        />
      </div>
    );
  }

  // ── DECK SELECTION ─────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-6">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h1 className="text-3xl font-heading font-bold text-primary">Flashcards</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-secondary)]">Theme:</span>
          <button
            onClick={() => { setPendingDeck(selectedDeck); setStudyState('theme-picker'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:border-primary/40 transition-colors"
          >
            {selectedTheme.emoji} {selectedTheme.name} ›
          </button>
        </div>
      </div>
      <p className="text-neutral-mid mb-6 text-sm">Spaced repetition — cards resurface at the optimal moment before you forget them.</p>

      {decks.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-5xl mb-4">🎴</div>
          <p className="text-neutral-mid">No flashcard decks available yet. Check back soon!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map(deck => {
            const due = dueCount[deck.id] ?? 0;
            return (
              <div
                key={deck.id}
                className="cursor-pointer"
                onClick={() => { setPendingDeck(deck); setStudyState('theme-picker'); }}
              >
                <Card className="hover:border-primary/40 transition-all h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-xl">🎴</div>
                    {due > 0 && <Badge variant="amber" size="sm">{due} due</Badge>}
                  </div>
                  <h3 className="font-heading font-bold text-[var(--color-text)] mb-1">{deck.name}</h3>
                  {deck.description && <p className="text-xs text-neutral-mid mb-3">{deck.description}</p>}
                  <div className="flex items-center justify-between text-xs text-neutral-mid">
                    <span>{deck.card_count} cards</span>
                    <Badge variant="teal" size="sm">{deck.unit}</Badge>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
