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
          Post messages, send broadcasts, and view community analytics.
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
          admin_user_id: adminUserId,
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
            Group <span className="text-neutral-mid font-normal">(optional)</span>
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
              <option value="">All students (no specific group)</option>
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
        disabled={posting || !body.trim()}
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
          admin_user_id: adminUserId,
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
