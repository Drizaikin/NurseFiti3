"use client";

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'general' | 'complaint' | 'suggestion' | 'bug_report' | 'praise';

interface FeedbackItem {
  id: string;
  display_name: string;
  cadre: string | null;
  user_role: 'student' | 'tutor';
  category: Category;
  rating: number;
  message: string;
  helpful_count: number;
  is_pinned: boolean;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  praise:      { label: 'Praise',      icon: '🌟', color: 'bg-accent/10 text-accent-dark dark:text-accent border-accent/20' },
  suggestion:  { label: 'Suggestion',  icon: '💡', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  complaint:   { label: 'Complaint',   icon: '⚠️', color: 'bg-error/10 text-error border-error/20' },
  bug_report:  { label: 'Bug Report',  icon: '🐛', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' },
  general:     { label: 'Feedback',    icon: '💬', color: 'bg-primary-light text-primary border-primary/20' },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (mins < 1)    return 'just now';
  if (mins < 60)   return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  if (days < 7)    return `${days}d ago`;
  if (weeks < 5)   return `${weeks}w ago`;
  return `${months}mo ago`;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? 'text-accent' : 'text-neutral-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Rating summary bar ───────────────────────────────────────────────────────

function RatingSummary({ items }: { items: FeedbackItem[] }) {
  if (items.length === 0) return null;

  const avg = items.reduce((s, i) => s + i.rating, 0) / items.length;
  const counts = [5, 4, 3, 2, 1].map(r => ({
    r,
    count: items.filter(i => i.rating === r).length,
    pct: Math.round((items.filter(i => i.rating === r).length / items.length) * 100),
  }));

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-8">
      {/* Big average */}
      <div className="text-center flex-shrink-0">
        <p className="text-5xl font-heading font-bold text-[var(--color-text)]">{avg.toFixed(1)}</p>
        <div className="flex justify-center mt-1">
          <StarDisplay rating={Math.round(avg)} />
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">{items.length} review{items.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Bar breakdown */}
      <div className="flex-1 w-full space-y-1.5">
        {counts.map(({ r, count, pct }) => (
          <div key={r} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-right text-[var(--color-text-secondary)] font-medium">{r}</span>
            <svg className="w-3 h-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="flex-1 bg-neutral-border/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-[var(--color-text-secondary)]">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Single review card ───────────────────────────────────────────────────────

function ReviewCard({
  item,
  onHelpful,
  hasVoted,
}: {
  item: FeedbackItem;
  onHelpful: (id: string) => void;
  hasVoted: boolean;
}) {
  const meta = CATEGORY_META[item.category];
  const initials = item.display_name === 'Anonymous'
    ? '?'
    : item.display_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const avatarColor = item.user_role === 'tutor'
    ? 'bg-accent text-dark'
    : 'bg-primary text-white';

  return (
    <div className={`bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 transition-shadow hover:shadow-md ${item.is_pinned ? 'ring-2 ring-primary/30' : ''}`}>
      {/* Pinned badge */}
      {item.is_pinned && (
        <div className="flex items-center gap-1 text-xs font-semibold text-primary mb-3">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          Featured
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColor}`}>
            {initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-[var(--color-text)]">{item.display_name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <StarDisplay rating={item.rating} />
              {item.cadre && (
                <span className="text-xs text-[var(--color-text-secondary)]">· {item.cadre}</span>
              )}
              {item.user_role === 'tutor' && (
                <span className="text-xs font-semibold text-accent">· Tutor</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${meta.color}`}>
            {meta.icon} {meta.label}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">{timeAgo(item.created_at)}</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-[var(--color-text)] leading-relaxed mb-4">
        {item.message}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => !hasVoted && onHelpful(item.id)}
          disabled={hasVoted}
          className={`flex items-center gap-1.5 text-xs transition-colors group ${
            hasVoted
              ? 'text-primary font-semibold cursor-default'
              : 'text-[var(--color-text-secondary)] hover:text-primary cursor-pointer'
          }`}
          aria-label={hasVoted ? 'You marked this as helpful' : 'Mark as helpful'}
        >
          <svg
            className={`w-4 h-4 transition-transform ${hasVoted ? 'fill-primary stroke-primary' : 'fill-none stroke-current group-hover:scale-110'}`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          {hasVoted ? `Helpful (${item.helpful_count}) ✓` : `Helpful (${item.helpful_count})`}
        </button>
      </div>
    </div>
  );
}

// ─── Main FeedbackWall ────────────────────────────────────────────────────────

interface FeedbackWallProps {
  /** Max items to show initially */
  limit?: number;
  /** Show the rating summary bar */
  showSummary?: boolean;
  /** Show category filter tabs */
  showFilters?: boolean;
  /** Compact mode for dashboard widgets */
  compact?: boolean;
}

export function FeedbackWall({
  limit = 12,
  showSummary = true,
  showFilters = true,
  compact = false,
  initialItems = [],
}: FeedbackWallProps & { initialItems?: FeedbackItem[] }) {
  const supabase = createClient();

  const [items, setItems] = useState<FeedbackItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [showAll, setShowAll] = useState(false);
  const [helpfulSet, setHelpfulSet] = useState<Set<string>>(new Set());

  const fetchFeedback = useCallback(async () => {
    // If we already have items from server, skip fetching
    if (initialItems.length > 0) return;
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('app_feedback')
        .select('id, display_name, cadre, user_role, category, rating, message, helpful_count, is_pinned, created_at')
        .eq('is_approved', true)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      setItems((data ?? []) as FeedbackItem[]);
    } catch (err) {
      console.error('FeedbackWall fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, initialItems]);

  useEffect(() => { fetchFeedback(); }, [fetchFeedback]);

  const handleHelpful = async (feedbackId: string) => {
    if (helpfulSet.has(feedbackId)) return; // already voted this session

    // Optimistic update immediately so the UI feels instant
    setItems(prev => prev.map(i =>
      i.id === feedbackId ? { ...i, helpful_count: i.helpful_count + 1 } : i
    ));
    setHelpfulSet(prev => new Set([...Array.from(prev), feedbackId]));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Revert optimistic update if not logged in
        setItems(prev => prev.map(i =>
          i.id === feedbackId ? { ...i, helpful_count: i.helpful_count - 1 } : i
        ));
        setHelpfulSet(prev => { const s = new Set(prev); s.delete(feedbackId); return s; });
        return;
      }

      // Insert the vote record (will fail silently on duplicate due to PRIMARY KEY)
      const { error: insertError } = await (supabase as any)
        .from('feedback_helpful')
        .insert({ feedback_id: feedbackId, user_id: user.id });

      if (insertError) {
        // Duplicate vote — revert the optimistic update
        setItems(prev => prev.map(i =>
          i.id === feedbackId ? { ...i, helpful_count: i.helpful_count - 1 } : i
        ));
        setHelpfulSet(prev => { const s = new Set(prev); s.delete(feedbackId); return s; });
        return;
      }

      // Increment helpful_count in app_feedback
      await (supabase as any).rpc('increment_helpful_count', { feedback_id: feedbackId });

    } catch {
      // Revert on any unexpected error
      setItems(prev => prev.map(i =>
        i.id === feedbackId ? { ...i, helpful_count: i.helpful_count - 1 } : i
      ));
      setHelpfulSet(prev => { const s = new Set(prev); s.delete(feedbackId); return s; });
    }
  };

  // Load which items the current user has already voted on
  const loadUserVotes = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('feedback_helpful')
        .select('feedback_id')
        .eq('user_id', user.id);
      if (data) {
        setHelpfulSet(new Set((data as Array<{ feedback_id: string }>).map(r => r.feedback_id)));
      }
    } catch {
      // Non-fatal
    }
  }, [supabase]);

  useEffect(() => { loadUserVotes(); }, [loadUserVotes]);

  const filtered = activeFilter === 'all'
    ? items
    : items.filter(i => i.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, limit);

  const FILTER_TABS: { value: Category | 'all'; label: string; icon: string }[] = [
    { value: 'all',        label: 'All',        icon: '📋' },
    { value: 'praise',     label: 'Praise',     icon: '🌟' },
    { value: 'suggestion', label: 'Ideas',      icon: '💡' },
    { value: 'complaint',  label: 'Complaints', icon: '⚠️' },
    { value: 'bug_report', label: 'Bugs',       icon: '🐛' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neutral-border/40" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 bg-neutral-border/40 rounded" />
                <div className="h-2.5 w-16 bg-neutral-border/30 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-neutral-border/30 rounded w-full" />
              <div className="h-3 bg-neutral-border/30 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl">
        <p className="text-4xl mb-3">💬</p>
        <p className="font-semibold text-[var(--color-text)] mb-1">No feedback yet</p>
        <p className="text-sm text-[var(--color-text-secondary)]">Be the first to share your experience with NurseFiti.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Rating summary */}
      {showSummary && !compact && <RatingSummary items={items} />}

      {/* Filter tabs */}
      {showFilters && !compact && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === tab.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40'
              }`}
            >
              {tab.icon} {tab.label}
              {tab.value !== 'all' && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === tab.value ? 'bg-white/20' : 'bg-neutral-border/40'}`}>
                  {items.filter(i => i.category === tab.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Cards grid */}
      <div className={compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        {displayed.map(item => (
          <ReviewCard key={item.id} item={item} onHelpful={handleHelpful} hasVoted={helpfulSet.has(item.id)} />
        ))}
      </div>

      {/* Show more */}
      {!showAll && filtered.length > limit && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary-light transition-colors"
          >
            Show all {filtered.length} reviews
          </button>
        </div>
      )}

      {/* Empty filter state */}
      {filtered.length === 0 && (
        <div className="text-center py-10 text-[var(--color-text-secondary)]">
          <p className="text-3xl mb-2">{CATEGORY_META[activeFilter as Category]?.icon ?? '🔍'}</p>
          <p className="text-sm">No {activeFilter} feedback yet.</p>
        </div>
      )}
    </div>
  );
}
