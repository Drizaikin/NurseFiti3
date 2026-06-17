"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function relativeTime(ts: string) {
  const diff = (Date.parse(ts.replace('Z','') + 'Z') - Date.now()) * -1 / 1000;
  if (diff < 60)     return 'just now';
  if (diff < 3600)   return `${Math.floor(diff / 60)}m`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(ts).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' });
}

/* ── Types ───────────────────────────────────────────────────────────────── */

interface StudyGroup {
  id: string; name: string; description: string | null;
  cadre: string; exam_cycle: string; privacy: 'open' | 'invite_only';
  member_count: number; max_members: number; creator_id: string; isMember?: boolean;
}

interface FeedPost {
  id: string; author_id: string; group_id: string; body: string;
  reply_to_id: string | null; quote_body: string | null; quote_author: string | null;
  is_deleted: boolean; is_admin_post: boolean; likes_count: number; views_count: number;
  created_at: string; author_name: string; author_avatar: string | null;
  replies?: FeedPost[];
  isLiked?: boolean;
}

/* ── PostCard ────────────────────────────────────────────────────────────── */

function PostCard({ post, userId, onReply, onLike, onDelete, isReply = false }: {
  post: FeedPost; userId: string;
  onReply:  (p: FeedPost) => void;
  onLike:   (p: FeedPost) => void;
  onDelete: (p: FeedPost) => void;
  isReply?: boolean;
}) {
  const isOwn     = post.author_id === userId;
  const isAdmin   = post.is_admin_post;
  const isDeleted = post.is_deleted;

  return (
    <div className={isReply ? 'ml-10 border-l-2 border-[var(--color-border)] pl-4 mt-2' : ''}>
      <div className={[
        'group rounded-2xl p-4 transition-all duration-200',
        isAdmin
          ? 'bg-gradient-to-br from-amber-50/90 to-orange-50/50 dark:from-amber-900/25 dark:to-orange-900/15 border border-amber-200/70 dark:border-amber-700/50 shadow-lg shadow-amber-100/40 dark:shadow-none'
          : 'bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
      ].join(' ')}>

        {/* Admin label */}
        {isAdmin && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            NurseFiti Official
          </div>
        )}

        {/* Author row */}
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Avatar src={post.author_avatar} name={post.author_name} size="sm" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-sm text-[var(--color-text)]">{post.author_name}</span>
              {isAdmin && (
                <span className="inline-flex items-center gap-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Admin
                </span>
              )}
              <span className="text-xs text-[var(--color-text-secondary)]">· {relativeTime(post.created_at)}</span>
            </div>

            {/* Quote preview */}
            {post.quote_body && !isDeleted && (
              <div className="mb-2 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs">
                <span className="font-semibold text-primary">{post.quote_author}: </span>
                <span className="text-[var(--color-text-secondary)] line-clamp-2">{post.quote_body}</span>
              </div>
            )}

            {/* Body */}
            <p className={[
              'text-sm leading-relaxed whitespace-pre-wrap break-words',
              isDeleted ? 'italic text-[var(--color-text-secondary)]' : 'text-[var(--color-text)]',
            ].join(' ')}>
              {isDeleted ? '[This message was deleted]' : post.body}
            </p>

            {/* Actions */}
            {!isDeleted && (
              <div className="flex items-center gap-5 mt-3 pt-2.5 border-t border-[var(--color-border)]/50">
                <button onClick={() => onReply(post)}
                  className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>{post.replies?.length ?? 0}</span>
                </button>

                <button onClick={() => onLike(post)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${post.isLiked ? 'text-rose-500' : 'text-[var(--color-text-secondary)] hover:text-rose-500'}`}>
                  <svg className="w-4 h-4" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span>{post.likes_count}</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>{post.views_count}</span>
                </div>

                {isOwn && (
                  <button onClick={() => onDelete(post)}
                    className="ml-auto text-xs text-[var(--color-text-secondary)] hover:text-error opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {!isReply && (post.replies ?? []).map(r => (
        <PostCard key={r.id} post={r} userId={userId} onReply={onReply} onLike={onLike} onDelete={onDelete} isReply />
      ))}
    </div>
  );
}

/* ── ComposeBox ──────────────────────────────────────────────────────────── */

function ComposeBox({ avatar, name, onPost, replyTo, onCancel }: {
  avatar: string | null; name: string;
  onPost: (body: string, replyToId?: string, quoteBody?: string, quoteAuthor?: string) => Promise<void>;
  replyTo: FeedPost | null; onCancel: () => void;
}) {
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);

  const submit = async () => {
    if (!body.trim() || posting) return;
    setPosting(true);
    await onPost(body.trim(), replyTo?.id, replyTo?.body?.substring(0, 200), replyTo?.author_name);
    setBody('');
    setPosting(false);
  };

  return (
    <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
      {replyTo && (
        <div className="flex items-center justify-between mb-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-xs text-[var(--color-text-secondary)] truncate">
            <span className="font-semibold text-primary">Replying to {replyTo.author_name}:</span>{' '}
            {replyTo.body.substring(0, 80)}{replyTo.body.length > 80 ? '…' : ''}
          </p>
          <button onClick={onCancel} className="ml-2 text-[var(--color-text-secondary)] hover:text-error text-xl leading-none flex-shrink-0">×</button>
        </div>
      )}
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar src={avatar} name={name} size="sm" />
        </div>
        <div className="flex-1">
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit(); }}
            placeholder={replyTo ? 'Write your reply…' : 'Share something with the group…'}
            rows={3}
            maxLength={2000}
            className="w-full text-sm text-[var(--color-text)] bg-transparent border-none outline-none resize-none placeholder-[var(--color-text-secondary)]/50"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border)]/50">
            <span className="text-[11px] text-[var(--color-text-secondary)]">{body.length}/2000</span>
            <button
              onClick={submit}
              disabled={!body.trim() || posting}
              className="px-5 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-primary/30 hover:shadow-md transition-all"
            >
              {posting ? <Spinner size="sm" color="white" /> : replyTo ? 'Reply' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

function GroupsInner() {
  const router = useRouter();
  const supabase = createClient();
  const sbRef = useRef(supabase);

  const [myGroups,     setMyGroups]     = useState<StudyGroup[]>([]);
  const [allGroups,    setAllGroups]    = useState<StudyGroup[]>([]);
  const [activeGroup,  setActiveGroup]  = useState<StudyGroup | null>(null);
  const [feed,         setFeed]         = useState<FeedPost[]>([]);
  const [loadingFeed,  setLoadingFeed]  = useState(false);
  const [userId,       setUserId]       = useState('');
  const [userName,     setUserName]     = useState('');
  const [userAvatar,   setUserAvatar]   = useState<string | null>(null);
  const [replyTo,      setReplyTo]      = useState<FeedPost | null>(null);
  const [showCreate,   setShowCreate]   = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [isLoading,    setIsLoading]    = useState(true);
  const [form, setForm] = useState({ name: '', description: '', cadre: '', exam_cycle: 'August', privacy: 'open' as 'open' | 'invite_only' });
  const profileCache = useRef<Record<string, { name: string; avatar: string | null }>>({});

  /* enrich posts with author profiles */
  const enrich = useCallback(async (rows: Record<string, unknown>[]): Promise<FeedPost[]> => {
    const missing = Array.from(new Set(rows.map(r => r.author_id as string).filter(id => !profileCache.current[id])));
    if (missing.length) {
      // Fetch profiles + student_profiles to honour display_name / hide_real_name
      const [{ data: profs }, { data: sProfs }] = await Promise.all([
        sbRef.current.from('profiles').select('id,full_name,avatar_url').in('id', missing),
        sbRef.current.from('student_profiles').select('id,display_name,username,hide_real_name').in('id', missing),
      ]);
      const spMap: Record<string, { display_name: string | null; username: string | null; hide_real_name: boolean }> = {};
      for (const sp of (sProfs ?? []) as any[]) {
        spMap[sp.id] = { display_name: sp.display_name ?? null, username: sp.username ?? null, hide_real_name: sp.hide_real_name ?? false };
      }
      for (const p of (profs ?? []) as any[]) {
        const sp = spMap[p.id];
        // Only substitute display_name/username when the student explicitly hides their real name.
        // Default is always full_name — students opt in to anonymity, it is never applied automatically.
        const displayName: string = sp?.hide_real_name
          ? (sp.display_name ?? (sp.username ? `@${sp.username}` : p.full_name ?? 'Student'))
          : (p.full_name ?? 'User');
        profileCache.current[p.id] = { name: displayName, avatar: p.avatar_url ?? null };
      }
    }
    return rows.map(r => {
      const prof = profileCache.current[r.author_id as string] ?? { name: 'User', avatar: null };
      return { ...(r as any), author_name: prof.name, author_avatar: prof.avatar, replies: [] } as FeedPost;
    });
  }, []);

  /* build threaded feed: attach replies to parents, show top-level newest first */
  const buildThread = (posts: FeedPost[]): FeedPost[] => {
    const map: Record<string, FeedPost> = {};
    const top: FeedPost[] = [];
    for (const p of posts) { map[p.id] = { ...p, replies: [] }; }
    for (const p of posts) {
      if (p.reply_to_id && map[p.reply_to_id]) {
        map[p.reply_to_id].replies!.push(map[p.id]);
      } else {
        top.push(map[p.id]);
      }
    }
    return top.reverse();
  };

  /* track views for rendered top-level posts */
  const trackViews = useCallback(async (posts: FeedPost[]) => {
    if (!userId || posts.length === 0) return;
    const topLevel = posts.filter(p => !p.reply_to_id && !p.is_deleted);
    await Promise.allSettled(
      topLevel.map(p => (sbRef.current as any).rpc('increment_post_views', { post_id: p.id }))
    );
    setFeed(prev => prev.map(p =>
      topLevel.some(t => t.id === p.id) ? { ...p, views_count: p.views_count + 1 } : p
    ));
  }, [userId]);

  /* load feed for the selected group */
  const loadFeed = useCallback(async (group: StudyGroup) => {
    setLoadingFeed(true);
    const { data, error } = await sbRef.current
      .from('community_messages')
      .select('*')
      .eq('group_id', group.id)
      .order('created_at', { ascending: false })
      .limit(80) as any;
    if (error) { setLoadingFeed(false); return; }
    // Fetch which posts the current user has already liked
    const ids = (data ?? []).map((r: any) => r.id);
    let likedSet = new Set<string>();
    if (ids.length > 0) {
      const { data: likes } = await sbRef.current
        .from('community_likes')
        .select('message_id')
        .eq('user_id', userId)
        .eq('message_type', 'student')
        .in('message_id', ids) as any;
      likedSet = new Set((likes ?? []).map((l: any) => l.message_id));
    }
    const enriched = await enrich(data ?? []);
    const withLikes = enriched.map(p => ({ ...p, isLiked: likedSet.has(p.id) }));
    const threaded = buildThread(withLikes);
    setFeed(threaded);
    setLoadingFeed(false);
    // Track views after render (non-blocking)
    setTimeout(() => trackViews(withLikes.filter(p => !p.reply_to_id)), 500);
  }, [enrich, userId, trackViews]);

  /* load groups list */
  const loadGroups = useCallback(async (uid: string) => {
    const { data: all } = await sbRef.current.from('study_groups').select('*').order('member_count', { ascending: false }) as any;
    const { data: mem } = await sbRef.current.from('group_members').select('group_id').eq('student_id', uid) as any;
    const memberSet = new Set((mem ?? []).map((m: any) => m.group_id));
    const enriched: StudyGroup[] = (all ?? []).map((g: StudyGroup) => ({ ...g, isMember: memberSet.has(g.id) }));
    setMyGroups(enriched.filter(g => g.isMember));
    setAllGroups(enriched.filter(g => !g.isMember));
  }, []);

  /* init */
  useEffect(() => {
    (async () => {
      const { data: { user } } = await sbRef.current.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      const [{ data: sp }, { data: prof }] = await Promise.all([
        sbRef.current.from('student_profiles').select('cadre,exam_cycle').eq('id', user.id).single() as any,
        sbRef.current.from('profiles').select('full_name,avatar_url').eq('id', user.id).single() as any,
      ]);
      if (sp)   setForm(f => ({ ...f, cadre: sp.cadre, exam_cycle: sp.exam_cycle }));
      if (prof) { setUserName(prof.full_name ?? ''); setUserAvatar(prof.avatar_url ?? null); }
      await loadGroups(user.id);
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* realtime for active group */
  useEffect(() => {
    if (!activeGroup) return;
    const ch = sbRef.current.channel(`community-${activeGroup.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_messages', filter: `group_id=eq.${activeGroup.id}` }, async ({ new: row }) => {
        const [p] = await enrich([row as Record<string, unknown>]);
        setFeed(prev => {
          if (p.reply_to_id) {
            return prev.map(t => t.id === p.reply_to_id ? { ...t, replies: [...(t.replies ?? []), p] } : t);
          }
          if (prev.some(t => t.id === p.id)) return prev;
          return [{ ...p, replies: [] }, ...prev];
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'community_messages', filter: `group_id=eq.${activeGroup.id}` }, async ({ new: row }) => {
        const [p] = await enrich([row as Record<string, unknown>]);
        setFeed(prev => prev.map(t => t.id === p.id ? { ...t, ...p } : t));
      })
      .subscribe();
    return () => { sbRef.current.removeChannel(ch); };
  }, [activeGroup, enrich]);

  const selectGroup = async (g: StudyGroup) => { setActiveGroup(g); setReplyTo(null); await loadFeed(g); };

  const postMessage = async (body: string, replyToId?: string, quoteBody?: string, quoteAuthor?: string) => {
    if (!activeGroup) return;
    const { error } = await sbRef.current.from('community_messages').insert({
      author_id: userId, group_id: activeGroup.id, body,
      reply_to_id: replyToId ?? null, quote_body: quoteBody ?? null, quote_author: quoteAuthor ?? null,
    } as any);
    if (error) toast.error('Could not post. Please try again.');
    setReplyTo(null);
  };

  const likePost = async (post: FeedPost) => {
    // Optimistic update
    const nowLiked = !post.isLiked;
    setFeed(prev => prev.map(p =>
      p.id === post.id
        ? { ...p, likes_count: nowLiked ? p.likes_count + 1 : Math.max(p.likes_count - 1, 0), isLiked: nowLiked }
        : p
    ));
    // Atomic toggle via SECURITY DEFINER RPC
    await (sbRef.current as any).rpc('toggle_post_like', { p_post_id: post.id, p_user_id: userId });
  };

  const deletePost = async (post: FeedPost) => {
    await (sbRef.current as any).from('community_messages').update({ is_deleted: true, body: '[message deleted]' }).eq('id', post.id);
  };

  const joinGroup = async (g: StudyGroup) => {
    const { error } = await (sbRef.current as any).from('group_members').insert({ group_id: g.id, student_id: userId, role: 'member' });
    if (error) { toast.error('Could not join.'); return; }
    // Use SECURITY DEFINER RPC so non-creator members can also increment
    await (sbRef.current as any).rpc('increment_member_count', { group_id: g.id });
    toast.success(`Joined "${g.name}"!`);
    await loadGroups(userId);
  };

  const createGroup = async () => {
    if (!form.name.trim() || !form.cadre) return;
    setCreating(true);
    const { data, error } = await (sbRef.current as any).from('study_groups').insert({
      name: form.name.trim(), description: form.description.trim() || null,
      cadre: form.cadre, exam_cycle: form.exam_cycle, privacy: form.privacy,
      creator_id: userId, max_members: 50,
    }).select().single();
    if (error || !data) { toast.error('Could not create group.'); setCreating(false); return; }
    await (sbRef.current as any).from('group_members').insert({ group_id: data.id, student_id: userId, role: 'admin' });
    toast.success('Group created!');
    setShowCreate(false);
    setCreating(false);
    await loadGroups(userId);
  };

  const cadreColor = (c: string) =>
    c === 'KRCHN'         ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
    : c === 'BScN'        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  /* feed panel rendered in both desktop (right col) and mobile (below groups) */
  const FeedPanel = () => (
    activeGroup ? (
      <div className="space-y-4">
        {/* Group header */}
        <div className="bg-gradient-to-r from-primary/10 via-teal-500/5 to-transparent border border-primary/20 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-[var(--color-text)]">{activeGroup.name}</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{activeGroup.cadre} · {activeGroup.exam_cycle} · 👥 {activeGroup.member_count} members</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${cadreColor(activeGroup.cadre)}`}>{activeGroup.cadre}</span>
        </div>

        {/* Compose */}
        <ComposeBox avatar={userAvatar} name={userName} onPost={postMessage} replyTo={replyTo} onCancel={() => setReplyTo(null)} />

        {/* Feed */}
        {loadingFeed ? (
          <div className="flex justify-center py-16"><Spinner size="lg" color="primary" /></div>
        ) : feed.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <p className="font-semibold text-[var(--color-text)] mb-1">No posts yet</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Be the first to post something!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {feed.map(p => (
              <PostCard key={p.id} post={p} userId={userId} onReply={setReplyTo} onLike={likePost} onDelete={deletePost} />
            ))}
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-teal-400/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <h2 className="text-xl font-heading font-bold text-[var(--color-text)] mb-2">Pick a group</h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xs mb-4">Select a study group on the left to see posts and connect with your peers.</p>
        {myGroups.length === 0 && (
          <button onClick={() => setShowCreate(true)} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-teal-500 text-white font-bold text-sm shadow hover:shadow-primary/30 hover:shadow-lg transition-all">
            Create your first group
          </button>
        )}
      </div>
    )
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Layout */}
      <div className="flex gap-6">

        {/* ── LEFT: Groups sidebar ── */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-extrabold bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">Community</h1>
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-teal-500 text-white text-sm font-bold shadow-sm hover:shadow-primary/30 hover:shadow-md transition-all">
              <span className="text-lg leading-none">+</span> Group
            </button>
          </div>

          {/* My groups */}
          {myGroups.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2 px-1">My Groups</p>
              <div className="space-y-1.5">
                {myGroups.map(g => (
                  <button key={g.id} onClick={() => selectGroup(g)}
                    className={[
                      'w-full text-left px-3 py-3 rounded-2xl border transition-all duration-200',
                      activeGroup?.id === g.id
                        ? 'bg-primary/10 border-primary/50 shadow-sm shadow-primary/10'
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-primary/30 hover:bg-primary/5',
                    ].join(' ')}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-[var(--color-text)] truncate">{g.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${cadreColor(g.cadre)}`}>{g.cadre}</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">👥 {g.member_count} · {g.exam_cycle}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Discover */}
          <div>
            <p className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2 px-1">Discover</p>
            {allGroups.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)] px-1">No more groups to join.</p>
            ) : (
              <div className="space-y-2">
                {allGroups.slice(0, 8).map(g => (
                  <div key={g.id} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-3 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-[var(--color-text)] truncate">{g.name}</p>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">👥 {g.member_count}/{g.max_members} · {g.cadre} · {g.exam_cycle}</p>
                      </div>
                      {g.privacy === 'open' && g.member_count < g.max_members ? (
                        <button onClick={() => joinGroup(g)}
                          className="flex-shrink-0 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm">
                          Join
                        </button>
                      ) : (
                        <span className="text-[10px] text-[var(--color-text-secondary)] px-2 py-1 rounded-full bg-[var(--color-border)] flex-shrink-0">
                          {g.member_count >= g.max_members ? 'Full' : '🔒 Invite only'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Feed (desktop only) ── */}
        <div className="flex-1 min-w-0 hidden lg:block">
          <FeedPanel />
        </div>
      </div>

      {/* Mobile feed (below groups) */}
      {activeGroup && (
        <div className="mt-6 lg:hidden space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveGroup(null)} className="text-[var(--color-text-secondary)] hover:text-primary text-xl font-bold transition-colors">←</button>
            <h2 className="font-heading font-bold text-[var(--color-text)]">{activeGroup.name}</h2>
          </div>
          <FeedPanel />
        </div>
      )}

      {/* Create group modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Study Group" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Group Name <span className="text-error">*</span></label>
            <input className="input" placeholder="e.g., KRCHN August 2026 Squad" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Description</label>
            <textarea className="input resize-none" rows={2} placeholder="What is this group about?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Cadre <span className="text-error">*</span></label>
              <select className="input" value={form.cadre} onChange={e => setForm(f => ({ ...f, cadre: e.target.value }))}>
                <option value="">Select…</option>
                <option>KRCHN</option><option>BScN</option><option>Higher Diploma</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Exam Cycle</label>
              <select className="input" value={form.exam_cycle} onChange={e => setForm(f => ({ ...f, exam_cycle: e.target.value }))}>
                <option>May</option><option>August</option><option>November</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Privacy</label>
            <div className="flex gap-3">
              {(['open', 'invite_only'] as const).map(p => (
                <label key={p} className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.privacy === p ? 'border-primary bg-primary/5' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                  <input type="radio" name="privacy" value={p} checked={form.privacy === p} onChange={() => setForm(f => ({ ...f, privacy: p }))} className="sr-only" />
                  <span className="text-sm font-medium">{p === 'open' ? '🔓 Open' : '🔒 Invite Only'}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={createGroup} disabled={creating || !form.name.trim() || !form.cadre}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-teal-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 transition-all">
            {creating ? <Spinner size="sm" color="white" /> : 'Create Group'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function GroupsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>}>
      <GroupsInner />
    </Suspense>
  );
}
