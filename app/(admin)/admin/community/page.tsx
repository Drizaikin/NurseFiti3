"use client";

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { getTabId, getTabPanelId, TabsControlled } from '@/components/ui/Tabs';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Group {
  id: string;
  name: string;
  member_count: number;
}

interface BroadcastRow {
  id: string;
  title: string;
  target_role: string | null;
  received_count: number;
  created_at: string;
}

interface CommunityStats {
  total_student_messages: number;
  total_tutor_messages: number;
  groups: Group[];
  recent_broadcasts: BroadcastRow[];
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'post',      label: 'Post to Community'       },
  { id: 'broadcast', label: 'Broadcast Notification'  },
  { id: 'reviews',   label: 'Community Reviews'       },
  { id: 'analytics', label: 'Analytics'               },
];
const TAB_SET_ID = 'admin-community-tabs';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCommunityPage() {
  const [activeTab, setActiveTab] = useState('post');
  const [adminUserId, setAdminUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setAdminUserId(user.id);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Community Management</h1>
        <p className="text-neutral-mid text-sm mt-1">
          Post messages, send broadcasts, moderate reviews, and view community analytics.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        {/* Tabs */}
        <div className="px-6 pt-4">
          <TabsControlled
            id={TAB_SET_ID}
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab panels */}
        <div className="p-6">
          <div
            id={getTabPanelId(TAB_SET_ID, 'post')}
            role="tabpanel"
            aria-labelledby={getTabId(TAB_SET_ID, 'post')}
            hidden={activeTab !== 'post'}
          >
            {activeTab === 'post' && <PostTab adminUserId={adminUserId} />}
          </div>
          <div
            id={getTabPanelId(TAB_SET_ID, 'broadcast')}
            role="tabpanel"
            aria-labelledby={getTabId(TAB_SET_ID, 'broadcast')}
            hidden={activeTab !== 'broadcast'}
          >
            {activeTab === 'broadcast' && <BroadcastTab adminUserId={adminUserId} />}
          </div>
          <div
            id={getTabPanelId(TAB_SET_ID, 'reviews')}
            role="tabpanel"
            aria-labelledby={getTabId(TAB_SET_ID, 'reviews')}
            hidden={activeTab !== 'reviews'}
          >
            {activeTab === 'reviews' && <ReviewsTab />}
          </div>
          <div
            id={getTabPanelId(TAB_SET_ID, 'analytics')}
            role="tabpanel"
            aria-labelledby={getTabId(TAB_SET_ID, 'analytics')}
            hidden={activeTab !== 'analytics'}
          >
            {activeTab === 'analytics' && <AnalyticsTab />}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab 1 — Post to Community ────────────────────────────────────────────────

function PostTab({ adminUserId }: { adminUserId: string | null }) {
  const [community, setCommunity] = useState<'student' | 'tutor'>('student');
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [body, setBody] = useState('');
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [posting, setPosting] = useState(false);

  const loadGroups = useCallback(async () => {
    setLoadingGroups(true);
    try {
      const res = await fetch('/api/admin/community-stats');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load groups');
      setGroups(data.groups ?? []);
      setGroupId('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load groups');
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  // Load groups when student community is selected
  useEffect(() => {
    if (community === 'student') {
      loadGroups();
    } else {
      setGroups([]);
      setGroupId('');
    }
  }, [community, loadGroups]);

  const handlePost = async () => {
    if (!body.trim()) {
      toast.error('Message cannot be empty.');
      return;
    }
    if (!adminUserId) {
      toast.error('Admin session not found — please refresh.');
      return;
    }

    setPosting(true);
    try {
      const res = await fetch('/api/admin/community-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: body.trim(),
          community,
          group_id: groupId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Post failed');
      toast.success('Message posted successfully!');
      setBody('');
      setGroupId('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to post message');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-5 max-w-xl">
      {/* Community selector */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Community
        </label>
        <select
          value={community}
          onChange={e => setCommunity(e.target.value as 'student' | 'tutor')}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="student">Student Community</option>
          <option value="tutor">Tutor Community</option>
        </select>
      </div>

      {/* Group selector — only for student community */}
      {community === 'student' && (
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Group
          </label>
          {loadingGroups ? (
            <div className="flex items-center gap-2 text-sm text-neutral-mid py-2">
              <Spinner size="sm" color="primary" /> Loading groups…
            </div>
          ) : (
            <select
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Select a study group</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.member_count} members)
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Message textarea */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Message
        </label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your message to the community…"
          rows={5}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <p className="text-xs text-neutral-mid mt-1">{body.length} characters</p>
      </div>

      {/* Submit */}
      <button
        onClick={handlePost}
        disabled={posting || !body.trim() || (community === 'student' && !groupId)}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {posting ? <><Spinner size="sm" color="white" /> Posting…</> : 'Post as Admin'}
      </button>
    </div>
  );
}

// ─── Tab 2 — Broadcast Notification ──────────────────────────────────────────

function BroadcastTab({ adminUserId }: { adminUserId: string | null }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState<'everyone' | 'student' | 'tutor'>('everyone');
  const [sending, setSending] = useState(false);
  const [lastCount, setLastCount] = useState<number | null>(null);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Title and message are required.');
      return;
    }
    if (!adminUserId) {
      toast.error('Admin session not found — please refresh.');
      return;
    }

    setSending(true);
    setLastCount(null);
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          target_role: targetRole === 'everyone' ? null : targetRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Broadcast failed');
      const count: number = data.notified_count ?? data.count ?? 0;
      setLastCount(count);
      toast.success(`Notification sent to ${count} user${count !== 1 ? 's' : ''}.`);
      setTitle('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send broadcast');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5 max-w-xl">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Notification Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Important update for all students"
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Message
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write your notification message…"
          rows={4}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Target selector */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Target Audience
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['everyone', 'student', 'tutor'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setTargetRole(opt)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                targetRole === opt
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40'
              }`}
            >
              {opt === 'everyone' ? 'Everyone' : opt === 'student' ? 'Students only' : 'Tutors only'}
            </button>
          ))}
        </div>
      </div>

      {/* Success count banner */}
      {lastCount !== null && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Notification delivered to <strong className="mx-1">{lastCount}</strong> user{lastCount !== 1 ? 's' : ''}.
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSend}
        disabled={sending || !title.trim() || !message.trim()}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? <><Spinner size="sm" color="white" /> Sending…</> : 'Send Notification'}
      </button>
    </div>
  );
}

// ─── Tab 3 — Analytics ────────────────────────────────────────────────────────

function AnalyticsTab() {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/community-stats');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load stats');
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="text-error text-sm">{error}</p>
        <Button variant="primary" size="sm" onClick={loadStats}>Retry</Button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Total Student Messages"
          value={stats.total_student_messages}
          icon={
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
        />
        <StatCard
          label="Total Tutor Messages"
          value={stats.total_tutor_messages}
          icon={
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          }
        />
      </div>

      {/* Groups list */}
      {stats.groups.length > 0 && (
        <div>
          <h3 className="text-base font-heading font-semibold text-[var(--color-text)] mb-3">
            Student Groups
          </h3>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-sm">
              <thead className="bg-primary-xlight dark:bg-primary/10">
                <tr>
                  <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Group Name</th>
                  <th className="text-right px-4 py-3 text-neutral-mid font-semibold">Members</th>
                </tr>
              </thead>
              <tbody>
                {stats.groups.map((g, i) => (
                  <tr
                    key={g.id}
                    className={`border-t border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-primary-xlight/30 dark:bg-primary/5'}`}
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-text)]">{g.name}</td>
                    <td className="px-4 py-3 text-right text-neutral-mid">{g.member_count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent broadcasts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-heading font-semibold text-[var(--color-text)]">
            Recent Broadcasts
          </h3>
          <button onClick={loadStats} className="text-xs text-primary hover:underline">
            ↻ Refresh
          </button>
        </div>

        {stats.recent_broadcasts.length === 0 ? (
          <p className="text-sm text-neutral-mid py-4">No broadcasts sent yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-sm">
              <thead className="bg-primary-xlight dark:bg-primary/10">
                <tr>
                  <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Title</th>
                  <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Target</th>
                  <th className="text-right px-4 py-3 text-neutral-mid font-semibold">Received</th>
                  <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_broadcasts.map((b, i) => (
                  <tr
                    key={b.id}
                    className={`border-t border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-primary-xlight/30 dark:bg-primary/5'}`}
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-text)] max-w-xs truncate">{b.title}</td>
                    <td className="px-4 py-3 text-neutral-mid capitalize">
                      {b.target_role ?? 'Everyone'}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-mid">{b.received_count.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-neutral-mid">
                      {new Date(b.created_at).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── StatCard helper ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-xlight flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-[var(--color-text)]">
          {value.toLocaleString()}
        </p>
        <p className="text-xs text-neutral-mid mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Tab 3 — Community Reviews ────────────────────────────────────────────────

interface AdminFeedbackItem {
  id: string;
  user_id: string;
  user_role: 'student' | 'tutor';
  display_name: string;
  cadre: string | null;
  category: 'general' | 'complaint' | 'suggestion' | 'bug_report' | 'praise';
  rating: number;
  message: string;
  is_approved: boolean;
  is_pinned: boolean;
  helpful_count: number;
  created_at: string;
}

function ReviewsTab() {
  const [reviews, setReviews] = useState<AdminFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pinned' | 'approved' | 'unapproved'>('all');
  const [actionId, setActionId] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/feedback');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load reviews');
      setReviews(data.feedback || []);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const togglePin = async (id: string, current: boolean) => {
    setActionId(id);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_pinned: !current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update review');
      setReviews(prev => prev.map(r => r.id === id ? { ...r, is_pinned: !current } : r));
      toast.success(!current ? 'Review pinned as Featured!' : 'Review unpinned.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to pin review');
    } finally {
      setActionId(null);
    }
  };

  const toggleApprove = async (id: string, current: boolean) => {
    setActionId(id);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: !current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update review');
      setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: !current } : r));
      toast.success(!current ? 'Review approved for public landing page!' : 'Review hidden from public.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update approval');
    } finally {
      setActionId(null);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review? This cannot be undone.')) return;
    setActionId(id);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete review');
      setReviews(prev => prev.filter(r => r.id !== id));
      toast.success('Review permanently deleted.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete review');
    } finally {
      setActionId(null);
    }
  };

  const filtered = reviews.filter(r => {
    if (filterRating !== 'all' && r.rating !== Number(filterRating)) return false;
    if (filterStatus === 'pinned' && !r.is_pinned) return false;
    if (filterStatus === 'approved' && !r.is_approved) return false;
    if (filterStatus === 'unapproved' && r.is_approved) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = r.display_name.toLowerCase().includes(term);
      const matchMsg = r.message.toLowerCase().includes(term);
      const matchCadre = (r.cadre || '').toLowerCase().includes(term);
      if (!matchName && !matchMsg && !matchCadre) return false;
    }
    return true;
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const pinnedCount = reviews.filter(r => r.is_pinned).length;
  const approvedCount = reviews.filter(r => r.is_approved).length;

  return (
    <div className="space-y-6">
      {/* Metric tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Reviews"
          value={reviews.length}
          icon={<span className="text-xl">💬</span>}
        />
        <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-xl">
            ⭐
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-[var(--color-text)]">
              {avgRating} <span className="text-sm font-normal text-neutral-mid">/ 5.0</span>
            </p>
            <p className="text-xs text-neutral-mid mt-0.5">Average Rating</p>
          </div>
        </div>
        <StatCard
          label="Featured (Pinned)"
          value={pinnedCount}
          icon={<span className="text-xl">📌</span>}
        />
        <StatCard
          label="Publicly Approved"
          value={approvedCount}
          icon={<span className="text-xl">✅</span>}
        />
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[var(--color-card)] p-4 rounded-2xl border border-[var(--color-border)]">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            placeholder="Search reviews by name, cadre, or keywords…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-neutral-mid hover:text-primary px-2"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value as any)}
            className="text-xs px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
          >
            <option value="all">All Stars</option>
            <option value="5">5 Stars only</option>
            <option value="4">4 Stars only</option>
            <option value="3">3 Stars only</option>
            <option value="2">2 Stars only</option>
            <option value="1">1 Star only</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-xs px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
          >
            <option value="all">All Statuses</option>
            <option value="pinned">Featured / Pinned Only</option>
            <option value="approved">Approved Only</option>
            <option value="unapproved">Hidden / Unapproved Only</option>
          </select>

          <Button
            size="sm"
            variant="outline"
            onClick={loadReviews}
            disabled={isLoading}
            className="text-xs"
          >
            {isLoading ? <Spinner size="sm" /> : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Reviews list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 border border-[var(--color-border)] rounded-2xl bg-[var(--color-card)]">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-semibold text-[var(--color-text)]">No reviews match your filter</p>
          <p className="text-xs text-neutral-mid mt-1">Try resetting the search or filter options.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                r.is_pinned
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                  : !r.is_approved
                  ? 'border-neutral-mid/30 bg-neutral-mid/5 opacity-70'
                  : 'border-[var(--color-border)] bg-[var(--color-card)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-[var(--color-text)]">
                    {r.display_name}
                  </span>
                  {r.cadre && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium">
                      {r.cadre}
                    </span>
                  )}
                  <span className="text-xs text-neutral-mid capitalize">
                    · {r.user_role}
                  </span>
                  {r.is_pinned && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-bold">
                      ⭐ Featured
                    </span>
                  )}
                  {!r.is_approved && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-semibold">
                      Hidden from Landing
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-mid">
                  <span className="font-bold text-accent">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                  <span>·</span>
                  <span>{new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Message text */}
              <p className="text-sm text-[var(--color-text)] leading-relaxed mb-3">
                {r.message === 'No written review provided.' || !r.message?.trim() ? (
                  <span className="italic text-neutral-mid">
                    Verified {r.rating}-Star Rating (no written review provided)
                  </span>
                ) : (
                  r.message
                )}
              </p>

              {/* Actions footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-border)] text-xs">
                <div className="flex items-center gap-2 text-neutral-mid">
                  <span className="capitalize px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    Category: {r.category}
                  </span>
                  <span>👍 {r.helpful_count} helpful</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePin(r.id, r.is_pinned)}
                    disabled={actionId === r.id}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      r.is_pinned
                        ? 'bg-accent/20 text-accent hover:bg-accent/30'
                        : 'border border-[var(--color-border)] text-[var(--color-text)] hover:border-accent hover:text-accent'
                    }`}
                  >
                    {r.is_pinned ? '★ Unpin Featured' : '☆ Pin as Featured'}
                  </button>

                  <button
                    onClick={() => toggleApprove(r.id, r.is_approved)}
                    disabled={actionId === r.id}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      r.is_approved
                        ? 'border border-[var(--color-border)] text-neutral-mid hover:text-rose-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {r.is_approved ? 'Hide from Landing' : 'Approve for Landing'}
                  </button>

                  <button
                    onClick={() => deleteReview(r.id)}
                    disabled={actionId === r.id}
                    className="px-2.5 py-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 font-semibold transition-colors"
                    title="Delete permanently"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
