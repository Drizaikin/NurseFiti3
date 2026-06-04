"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';
import toast from 'react-hot-toast';

// ── Types ─────────────────────────────────────────────────────────────────────

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  cadre: string;
  exam_cycle: string;
  privacy: 'open' | 'invite_only';
  member_count: number;
  max_members: number;
  creator_id: string;
  isMember?: boolean;
}

interface ChatMessage {
  id: string;
  author_id: string;
  group_id: string;
  body: string;
  reply_to_id: string | null;
  quote_body: string | null;
  quote_author: string | null;
  is_deleted: boolean;
  created_at: string;
  // joined from profiles
  author_name: string;
  author_avatar: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts: string) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ── Chat Panel ────────────────────────────────────────────────────────────────

function ChatPanel({
  group,
  userId,
  userAvatar,
  userName,
  onBack,
}: {
  group: StudyGroup;
  userId: string;
  userAvatar: string | null;
  userName: string;
  onBack: () => void;
}) {
  const supabase = createClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Cache of author profiles keyed by author_id
  const profileCache = useRef<Record<string, { name: string; avatar: string | null }>>({});

  const enrichMessages = useCallback(async (msgs: Record<string, unknown>[]) => {
    const unknownIds = msgs
      .map(m => m.author_id as string)
      .filter(id => !profileCache.current[id]);
    const uniqueUnknown = [...new Set(unknownIds)];

    if (uniqueUnknown.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', uniqueUnknown);
      for (const p of profiles ?? []) {
        profileCache.current[(p as Record<string, unknown>).id as string] = {
          name: (p as Record<string, unknown>).full_name as string ?? 'User',
          avatar: (p as Record<string, unknown>).avatar_url as string | null,
        };
      }
    }

    return msgs.map(m => {
      const prof = profileCache.current[m.author_id as string] ?? { name: 'User', avatar: null };
      return {
        id: m.id,
        author_id: m.author_id,
        group_id: m.group_id,
        body: m.body,
        reply_to_id: m.reply_to_id,
        quote_body: m.quote_body,
        quote_author: m.quote_author,
        is_deleted: m.is_deleted,
        created_at: m.created_at,
        author_name: prof.name,
        author_avatar: prof.avatar,
      } as ChatMessage;
    });
  }, [supabase]);

  const loadMessages = useCallback(async () => {
    setLoadingMsgs(true);
    const { data, error } = await supabase
      .from('community_messages')
      .select('*')
      .eq('group_id', group.id)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) { console.error(error); setLoadingMsgs(false); return; }
    const enriched = await enrichMessages((data ?? []) as Record<string, unknown>[]);
    setMessages(enriched);
    setLoadingMsgs(false);
  }, [group.id, supabase, enrichMessages]);

  // Initial load
  useEffect(() => { loadMessages(); }, [loadMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`chat-${group.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'community_messages', filter: `group_id=eq.${group.id}` },
        async (payload) => {
          const enriched = await enrichMessages([payload.new as Record<string, unknown>]);
          setMessages(prev => {
            // Avoid duplicates (optimistic update may already have added it)
            if (prev.some(m => m.id === enriched[0].id)) return prev;
            return [...prev, enriched[0]];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'community_messages', filter: `group_id=eq.${group.id}` },
        async (payload) => {
          const enriched = await enrichMessages([payload.new as Record<string, unknown>]);
          setMessages(prev => prev.map(m => m.id === enriched[0].id ? enriched[0] : m));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [group.id, supabase, enrichMessages]);

  const sendMessage = async () => {
    const trimmed = body.trim();
    if (!trimmed || sending) return;

    setSending(true);
    const optimisticId = `opt-${Date.now()}`;
    const optimistic: ChatMessage = {
      id: optimisticId,
      author_id: userId,
      group_id: group.id,
      body: trimmed,
      reply_to_id: replyTo?.id ?? null,
      quote_body: replyTo?.body ?? null,
      quote_author: replyTo?.author_name ?? null,
      is_deleted: false,
      created_at: new Date().toISOString(),
      author_name: userName,
      author_avatar: userAvatar,
    };

    setMessages(prev => [...prev, optimistic]);
    setBody('');
    setReplyTo(null);

    const { data, error } = await supabase
      .from('community_messages')
      .insert({
        author_id: userId,
        group_id: group.id,
        body: trimmed,
        reply_to_id: replyTo?.id ?? null,
        quote_body: replyTo?.body?.substring(0, 200) ?? null,
        quote_author: replyTo?.author_name ?? null,
      })
      .select()
      .single();

    if (error) {
      toast.error('Message failed to send. Please try again.');
      setMessages(prev => prev.filter(m => m.id !== optimisticId));
    } else {
      // Replace optimistic with real
      setMessages(prev => prev.map(m =>
        m.id === optimisticId ? { ...optimistic, id: (data as Record<string, unknown>).id as string } : m
      ));
    }
    setSending(false);
    textareaRef.current?.focus();
  };

  const deleteMessage = async (msg: ChatMessage) => {
    if (msg.author_id !== userId) return;
    await supabase
      .from('community_messages')
      .update({ is_deleted: true, body: '[message deleted]' })
      .eq('id', msg.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-card)] rounded-t-2xl">
        <button onClick={onBack} className="text-[var(--color-text-secondary)] hover:text-primary transition-colors text-lg">←</button>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-[var(--color-text)] truncate">{group.name}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{group.member_count} members · {group.cadre} · {group.exam_cycle}</p>
        </div>
        <Badge variant="teal" size="sm">{group.cadre}</Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[var(--color-card)]">
        {loadingMsgs ? (
          <div className="flex justify-center py-8"><Spinner size="md" color="primary" /></div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-[var(--color-text-secondary)] text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(msg => {
            const isOwn = msg.author_id === userId;
            const isDeleted = msg.is_deleted;

            return (
              <div key={msg.id} className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 self-end">
                  <Avatar src={msg.author_avatar} name={msg.author_name} size="sm" />
                </div>

                {/* Bubble */}
                <div className={`group max-w-[75%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Author name (only for others) */}
                  {!isOwn && (
                    <p className="text-xs font-semibold text-primary mb-1 px-1">{msg.author_name}</p>
                  )}

                  {/* Quote preview */}
                  {msg.quote_body && !isDeleted && (
                    <div className={`text-xs px-2 py-1 rounded-lg mb-1 border-l-2 border-primary/40 bg-primary/5 max-w-full ${isOwn ? 'text-right' : 'text-left'}`}>
                      <span className="font-semibold text-primary">{msg.quote_author}: </span>
                      <span className="text-[var(--color-text-secondary)] line-clamp-2">{msg.quote_body}</span>
                    </div>
                  )}

                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed break-words ${
                      isDeleted
                        ? 'italic text-[var(--color-text-secondary)] bg-[var(--color-border)] rounded-2xl px-3 py-2'
                        : isOwn
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-[var(--color-border)] text-[var(--color-text)] rounded-bl-sm'
                    }`}
                  >
                    {msg.body}
                  </div>

                  {/* Timestamp + actions */}
                  <div className={`flex items-center gap-2 mt-0.5 px-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">{formatTime(msg.created_at)}</span>
                    {!isDeleted && (
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button
                          onClick={() => setReplyTo(msg)}
                          className="text-[10px] text-[var(--color-text-secondary)] hover:text-primary px-1 py-0.5 rounded"
                          title="Reply"
                        >↩ Reply</button>
                        <button
                          onClick={() => { setBody(`"${msg.body.substring(0, 100)}" — ${msg.author_name}\n`); setReplyTo(msg); textareaRef.current?.focus(); }}
                          className="text-[10px] text-[var(--color-text-secondary)] hover:text-primary px-1 py-0.5 rounded"
                          title="Quote"
                        >❝ Quote</button>
                        {isOwn && (
                          <button
                            onClick={() => deleteMessage(msg)}
                            className="text-[10px] text-error hover:text-error/80 px-1 py-0.5 rounded"
                            title="Delete"
                          >✕</button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply preview */}
      {replyTo && (
        <div className="px-4 py-2 bg-primary/5 border-t border-primary/20 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-primary">Replying to {replyTo.author_name}</p>
            <p className="text-xs text-[var(--color-text-secondary)] truncate">{replyTo.body}</p>
          </div>
          <button onClick={() => setReplyTo(null)} className="text-[var(--color-text-secondary)] hover:text-error text-lg leading-none">×</button>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-card)] rounded-b-2xl">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={e => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
            rows={1}
            maxLength={2000}
            className="flex-1 px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-text)] resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-32 overflow-y-auto"
            style={{ lineHeight: '1.4' }}
          />
          <Button
            variant="primary"
            onClick={sendMessage}
            disabled={!body.trim() || sending}
            className="flex-shrink-0 px-4 py-2.5"
          >
            {sending ? <Spinner size="sm" color="white" /> : '↑'}
          </Button>
        </div>
        <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 text-right">{body.length}/2000</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function GroupsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [filterCadre, setFilterCadre] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [activeChat, setActiveChat] = useState<StudyGroup | null>(null);
  const [form, setForm] = useState({ name: '', description: '', cadre: '', exam_cycle: 'August', privacy: 'open' as 'open' | 'invite_only' });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      const [{ data: sp }, { data: prof }] = await Promise.all([
        supabase.from('student_profiles').select('cadre, exam_cycle').eq('id', user.id).single(),
        supabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).single(),
      ]);

      if (sp) {
        setForm(f => ({ ...f, cadre: (sp as { cadre: string; exam_cycle: string }).cadre, exam_cycle: (sp as { cadre: string; exam_cycle: string }).exam_cycle }));
      }
      if (prof) {
        setUserName((prof as { full_name: string; avatar_url: string | null }).full_name ?? '');
        setUserAvatar((prof as { full_name: string; avatar_url: string | null }).avatar_url ?? null);
      }
      await loadGroups(user.id);
      setIsLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGroups = async (uid: string) => {
    const { data: allGroups } = await supabase.from('study_groups').select('*').order('member_count', { ascending: false });
    const { data: memberships } = await supabase.from('group_members').select('group_id').eq('student_id', uid);
    const memberSet = new Set((memberships ?? []).map((m: { group_id: string }) => m.group_id));
    const enriched = (allGroups ?? []).map((g: StudyGroup) => ({ ...g, isMember: memberSet.has(g.id) }));
    setGroups(enriched.filter((g: StudyGroup) => !g.isMember));
    setMyGroups(enriched.filter((g: StudyGroup) => g.isMember));
  };

  const joinGroup = async (group: StudyGroup) => {
    if (!userId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('group_members').insert({ group_id: group.id, student_id: userId, role: 'member' });
    if (error) { toast.error('Could not join group'); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('study_groups').update({ member_count: group.member_count + 1 }).eq('id', group.id);
    toast.success(`Joined "${group.name}"!`);
    await loadGroups(userId);
  };

  const leaveGroup = async (group: StudyGroup) => {
    if (!userId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('group_members').delete().eq('group_id', group.id).eq('student_id', userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('study_groups').update({ member_count: Math.max(0, group.member_count - 1) }).eq('id', group.id);
    toast.success(`Left "${group.name}"`);
    if (activeChat?.id === group.id) setActiveChat(null);
    await loadGroups(userId);
  };

  const createGroup = async () => {
    if (!userId || !form.name.trim() || !form.cadre) return;
    setCreating(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from('study_groups').insert({
      name: form.name.trim(), description: form.description.trim() || null,
      cadre: form.cadre, exam_cycle: form.exam_cycle, privacy: form.privacy,
      creator_id: userId, max_members: 50,
    }).select().single();
    if (error || !data) { toast.error('Could not create group'); setCreating(false); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('group_members').insert({ group_id: (data as { id: string }).id, student_id: userId, role: 'admin' });
    toast.success('Group created!');
    setShowCreate(false);
    setCreating(false);
    await loadGroups(userId);
  };

  const filtered = filterCadre === 'all' ? groups : groups.filter(g => g.cadre === filterCadre);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  // ── Active chat view ──────────────────────────────────────────────────────
  if (activeChat && userId) {
    return (
      <div className="max-w-4xl mx-auto">
        <ChatPanel
          group={activeChat}
          userId={userId}
          userAvatar={userAvatar}
          userName={userName}
          onBack={() => setActiveChat(null)}
        />
      </div>
    );
  }

  // ── Groups list view ──────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Community</h1>
          <p className="text-neutral-mid text-sm mt-1">All cadres welcome — KRCHN, BScN, and Higher Diploma together.</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreate(true)}>+ Create Group</Button>
      </div>

      {/* My groups */}
      {myGroups.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-bold mb-3">My Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myGroups.map(g => (
              <Card key={g.id} className="border-primary/30 bg-primary/5 hover:border-primary/60 transition-all cursor-pointer" onClick={() => setActiveChat(g)}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-[var(--color-text)]">{g.name}</h3>
                  <Badge variant="teal" size="sm">{g.cadre}</Badge>
                </div>
                {g.description && <p className="text-sm text-neutral-mid mb-3 line-clamp-2">{g.description}</p>}
                <div className="flex items-center justify-between text-xs text-neutral-mid mb-3">
                  <span>👥 {g.member_count}/{g.max_members} members</span>
                  <span>{g.exam_cycle} · {g.privacy === 'open' ? '🔓 Open' : '🔒 Invite only'}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1" onClick={e => { e.stopPropagation(); setActiveChat(g); }}>
                    💬 Open Chat
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error hover:bg-error/10" onClick={e => { e.stopPropagation(); leaveGroup(g); }}>
                    Leave
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Browse all groups */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading font-bold">Browse Groups</h2>
          <select value={filterCadre} onChange={e => setFilterCadre(e.target.value)} className="input w-auto text-sm py-1.5">
            <option value="all">All Cadres</option>
            <option value="KRCHN">KRCHN</option>
            <option value="BScN">BScN</option>
            <option value="Higher Diploma">Higher Diploma</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-5xl mb-3">👥</p>
            <p className="text-neutral-mid">No groups found. Be the first to create one!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(g => (
              <Card key={g.id} className="hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-[var(--color-text)]">{g.name}</h3>
                  <Badge variant="teal" size="sm">{g.cadre}</Badge>
                </div>
                {g.description && <p className="text-sm text-neutral-mid mb-3 line-clamp-2">{g.description}</p>}
                <div className="flex items-center justify-between text-xs text-neutral-mid mb-4">
                  <span>👥 {g.member_count}/{g.max_members}</span>
                  <span>{g.exam_cycle} · {g.privacy === 'open' ? '🔓 Open' : '🔒 Invite only'}</span>
                </div>
                {g.privacy === 'open' ? (
                  <Button variant="primary" size="sm" className="w-full" onClick={() => joinGroup(g)} disabled={g.member_count >= g.max_members}>
                    {g.member_count >= g.max_members ? 'Full' : 'Join Group'}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>Request to Join</Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create group modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Study Group" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Group Name *</label>
            <input className="input" placeholder="e.g., KRCHN August 2026 Squad" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Description</label>
            <textarea className="input resize-none" rows={2} placeholder="What's this group about?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Cadre *</label>
              <select className="input" value={form.cadre} onChange={e => setForm(f => ({ ...f, cadre: e.target.value }))}>
                <option value="">Select</option>
                <option value="KRCHN">KRCHN</option>
                <option value="BScN">BScN</option>
                <option value="Higher Diploma">Higher Diploma</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Exam Cycle</label>
              <select className="input" value={form.exam_cycle} onChange={e => setForm(f => ({ ...f, exam_cycle: e.target.value }))}>
                <option value="May">May</option>
                <option value="August">August</option>
                <option value="November">November</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Privacy</label>
            <div className="flex gap-3">
              {(['open', 'invite_only'] as const).map(p => (
                <label key={p} className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer ${form.privacy === p ? 'border-primary bg-primary-light' : 'border-[var(--color-border)]'}`}>
                  <input type="radio" name="privacy" value={p} checked={form.privacy === p} onChange={() => setForm(f => ({ ...f, privacy: p }))} className="sr-only" />
                  <span>{p === 'open' ? '🔓 Open' : '🔒 Invite Only'}</span>
                </label>
              ))}
            </div>
          </div>
          <Button variant="primary" className="w-full" onClick={createGroup} disabled={creating || !form.name.trim() || !form.cadre}>
            {creating ? <Spinner size="sm" color="white" /> : 'Create Group'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
