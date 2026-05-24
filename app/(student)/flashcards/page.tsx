"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getLimits, effectiveTier } from '@/lib/planLimits';

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
  unit: string;
}

interface CardProgress {
  card_id: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
}

type StudyState = 'decks' | 'studying' | 'complete';
type FlipState = 'front' | 'back';
type Rating = 'again' | 'hard' | 'good' | 'easy';

// SM-2 inspired intervals
const INTERVALS: Record<Rating, number> = {
  again: 0,   // resurface immediately (< 1 min, treated as 0 days)
  hard:  1,
  good:  3,
  easy:  7,
};

export default function FlashcardsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [studyState, setStudyState] = useState<StudyState>('decks');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipState, setFlipState] = useState<FlipState>('front');
  const [isFlipping, setIsFlipping] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [dueCount, setDueCount] = useState<Record<string, number>>({});
  const [planTier, setPlanTier] = useState<string>('free');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      const { data: spData } = await supabase
        .from('student_profiles')
        .select('plan_tier, plan_expires_at')
        .eq('id', user.id)
        .single();
      const sp = spData as { plan_tier: string; plan_expires_at: string | null } | null;
      if (sp) {
        const tier = effectiveTier(sp.plan_tier, sp.plan_expires_at);
        setPlanTier(tier);
        // Only load decks if the plan allows flashcard access
        if (getLimits(tier).flashcardsAccess) {
          await loadDecks(user.id);
        }
      }

      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDecks = async (uid: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: deckData } = await (supabase as any).from('flashcard_decks').select('*').order('name');
    if (!deckData) return;
    setDecks(deckData as Deck[]);

    // Count due cards per deck
    const now = new Date().toISOString();
    const counts: Record<string, number> = {};
    for (const deck of (deckData as Deck[])) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: cardList } = await (supabase as any).from('flashcards').select('id').eq('deck_id', deck.id);
      const cards = (cardList ?? []) as Array<{ id: string }>;
      if (cards.length === 0) { counts[deck.id] = 0; continue; }
      const cardIds = cards.map(c => c.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: progress } = await (supabase as any).from('flashcard_progress')
        .select('card_id').eq('student_id', uid).lte('next_review_at', now).in('card_id', cardIds);
      const progressList = (progress ?? []) as Array<{ card_id: string }>;
      // Cards with no progress record are also due
      const reviewedIds = new Set(progressList.map(p => p.card_id));
      const neverReviewed = cardIds.filter(id => !reviewedIds.has(id));
      counts[deck.id] = progressList.length + neverReviewed.length;
    }
    setDueCount(counts);
  };

  const startDeck = async (deck: Deck) => {
    if (!userId) return;
    setIsLoading(true);
    setSelectedDeck(deck);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: allCardsData } = await (supabase as any).from('flashcards').select('*').eq('deck_id', deck.id);
    const allCards = (allCardsData ?? []) as Flashcard[];
    if (allCards.length === 0) {
      alert('No cards in this deck yet.');
      setIsLoading(false);
      return;
    }

    const now = new Date().toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: progressData } = await (supabase as any).from('flashcard_progress')
      .select('*').eq('student_id', userId).in('card_id', allCards.map(c => c.id));
    const progress = (progressData ?? []) as CardProgress[];

    const progressMap = new Map<string, CardProgress>(progress.map(p => [p.card_id, p]));

    // Due = never reviewed OR next_review_at <= now
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

    // Upsert progress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('flashcard_progress').upsert({
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

    setSessionStats(prev => ({ ...prev, reviewed: prev.reviewed + 1, [rating]: prev[rating] + 1 }));

    if (cardIndex + 1 >= cards.length) {
      // Award XP: +5 per card reviewed (spec requirement)
      const xpEarned = cards.length * 5;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: sp } = await (supabase as any).from('student_profiles').select('xp, level').eq('id', userId).single();
      if (sp) {
        const newXP = (sp.xp ?? 0) + xpEarned;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from('student_profiles').update({ xp: newXP, level: Math.floor(newXP / 100) + 1 }).eq('id', userId);
      }
      setStudyState('complete');
    } else {
      setCardIndex(i => i + 1);
      setFlipState('front');
    }
  }, [userId, cardIndex, cards, supabase]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  }

  // ── PLAN GATE — flashcards are a paid feature ──────────────────────────────
  if (!getLimits(planTier).flashcardsAccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Flashcards</h1>
        <p className="text-neutral-mid mb-6">Spaced repetition — cards resurface at the optimal moment before you forget them.</p>
        <Card className="text-center py-12 border-primary/20">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Flashcards — Standard &amp; Premium</h2>
          <p className="text-neutral-mid mb-2 max-w-sm mx-auto">
            Spaced-repetition flashcards are available on Standard and Premium plans.
            Upgrade to unlock all decks and track your progress.
          </p>
          <p className="text-xs text-neutral-mid mb-6">Free plan · Upgrade from KSh 499/month</p>
          <Link href="/settings">
            <Button variant="primary" size="lg">Upgrade to Unlock Flashcards →</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // ── DECK SELECTION ─────────────────────────────────────────────────────────
  if (studyState === 'decks') {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Flashcards</h1>
        <p className="text-neutral-mid mb-6">Spaced repetition — cards resurface at the optimal moment before you forget them.</p>
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
            <div key={deck.id} className="cursor-pointer" onClick={() => startDeck(deck)}>
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

  // ── SESSION COMPLETE ───────────────────────────────────────────────────────
  if (studyState === 'complete') {
    return (
      <div className="max-w-md mx-auto text-center">
        <Card className="py-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Session Complete!</h2>
          <p className="text-neutral-mid mb-6">{selectedDeck?.name} · +{cards.length * 5} XP earned (+5 per card)</p>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Reviewed', value: sessionStats.reviewed, color: 'text-[var(--color-text)]' },
              { label: 'Again', value: sessionStats.again, color: 'text-error' },
              { label: 'Hard', value: sessionStats.hard, color: 'text-accent' },
              { label: 'Good', value: sessionStats.good, color: 'text-primary' },
            ].map(s => (
              <div key={s.label}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-neutral-mid">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setStudyState('decks'); if (userId) loadDecks(userId); }}>All Decks</Button>
            <Button variant="primary" className="flex-1" onClick={() => selectedDeck && startDeck(selectedDeck)}>Study Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  // ── STUDY MODE ─────────────────────────────────────────────────────────────
  const card = cards[cardIndex];
  const progress = ((cardIndex) / cards.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-bold text-[var(--color-text)]">{selectedDeck?.name}</h2>
          <p className="text-sm text-neutral-mid">{cardIndex + 1} / {cards.length}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setStudyState('decks')}>Exit</Button>
      </div>
      <ProgressBar value={progress} showLabel={false} className="mb-6" />

      {/* Card */}
      <div className="relative h-72 cursor-pointer select-none" onClick={flip} role="button" aria-label="Flip card" tabIndex={0} onKeyDown={e => e.key === 'Enter' && flip()}>
        <div className={`absolute inset-0 transition-opacity duration-150 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
          {flipState === 'front' ? (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8">
              <Badge variant="secondary" className="mb-4">{card.unit}</Badge>
              <p className="text-xl font-semibold text-[var(--color-text)] leading-relaxed">{card.front_text}</p>
              <p className="text-xs text-neutral-mid mt-6">Tap to reveal answer</p>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-8 bg-primary-light dark:bg-primary/10 border-primary/30">
              {card.back_highlight && (
                <p className="text-2xl font-heading font-bold text-primary mb-3">{card.back_highlight}</p>
              )}
              <p className="text-base text-[var(--color-text)] leading-relaxed">{card.back_text}</p>
            </Card>
          )}
        </div>
      </div>

      {/* Rating buttons — only shown after flip */}
      {flipState === 'back' && (
        <div className="mt-6 grid grid-cols-4 gap-3">
          {([
            { r: 'again' as Rating, label: 'Again', sub: '<1 min', cls: 'border-error text-error hover:bg-error/10' },
            { r: 'hard'  as Rating, label: 'Hard',  sub: '1 day',  cls: 'border-accent text-accent-dark dark:text-accent hover:bg-accent/10' },
            { r: 'good'  as Rating, label: 'Good',  sub: '3 days', cls: 'border-primary text-primary hover:bg-primary-light' },
            { r: 'easy'  as Rating, label: 'Easy',  sub: '7 days', cls: 'border-success text-success hover:bg-success/10' },
          ]).map(({ r, label, sub, cls }) => (
            <button key={r} onClick={() => rate(r)}
              className={`flex flex-col items-center py-3 rounded-xl border-2 font-semibold transition-all min-h-[44px] ${cls}`}>
              <span className="text-sm">{label}</span>
              <span className="text-xs opacity-70">{sub}</span>
            </button>
          ))}
        </div>
      )}

      {flipState === 'front' && (
        <div className="mt-6 text-center">
          <Button variant="primary" size="lg" onClick={flip} className="px-12">Reveal Answer</Button>
        </div>
      )}
    </div>
  );
}
