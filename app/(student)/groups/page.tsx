"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function formatChatTime(ts: string) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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
  isLiked?: boolean;
}

type ChatTheme = 'default' | 'whatsapp' | 'instagram' | 'midnight';

const THEME_STYLES: Record<ChatTheme, { bg: string; ownBubble: string; otherBubble: string; textColorOwn: string; textColorOther: string; }> = {
  default: {
    bg: 'bg-neutral-50 dark:bg-neutral-900',
    ownBubble: 'bg-primary',
    otherBubble: 'bg-white dark:bg-[#1e293b]',
    textColorOwn: 'text-white',
    textColorOther: 'text-neutral-800 dark:text-neutral-100',
  },
  whatsapp: {
    bg: 'bg-[#efeae2] dark:bg-[#0b141a]',
    ownBubble: 'bg-[#d9fdd3] dark:bg-[#005c4b]',
    otherBubble: 'bg-white dark:bg-[#202c33]',
    textColorOwn: 'text-neutral-900 dark:text-white',
    textColorOther: 'text-neutral-900 dark:text-white',
  },
  instagram: {
    bg: 'bg-white dark:bg-black',
    ownBubble: 'bg-gradient-to-br from-purple-500 to-pink-500',
    otherBubble: 'bg-gray-100 dark:bg-gray-800',
    textColorOwn: 'text-white',
    textColorOther: 'text-neutral-900 dark:text-white',
  },
  midnight: {
    bg: 'bg-black',
    ownBubble: 'bg-blue-600',
    otherBubble: 'bg-[#1e1e1e]',
    textColorOwn: 'text-white',
    textColorOther: 'text-white',
  }
};

/* ── MessageBubble ───────────────────────────────────────────────────────── */
function MessageBubble({ post, userId, onReply, onLike, onDelete, theme }: {
  post: FeedPost; userId: string;
  onReply: (p: FeedPost) => void;
  onLike: (p: FeedPost) => void;
  onDelete: (p: FeedPost) => void;
  theme: ChatTheme;
}) {
  const isOwn = post.author_id === userId;
  const isAdmin = post.is_admin_post;
  const isDeleted = post.is_deleted;
  
  const styles = THEME_STYLES[theme];

  return (
    <div className={`flex w-full mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[85%] md:max-w-[70%] rounded-xl px-3 py-2 pb-5 ${isOwn ? `${styles.ownBubble} ${styles.textColorOwn} rounded-tr-none shadow-sm` : `${styles.otherBubble} ${styles.textColorOther} rounded-tl-none shadow-sm`}`}>
        
        {/* Author row for others */}
        {!isOwn && !isDeleted && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`text-xs font-bold ${isAdmin ? 'text-amber-500' : 'text-primary'}`}>
              {post.author_name}
            </span>
            {isAdmin && (
              <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-bold">Admin</span>
            )}
          </div>
        )}

        {/* Quoted message */}
        {post.quote_body && !isDeleted && (
          <div className={`mb-1.5 px-3 py-1.5 rounded-md text-xs border-l-4 ${isOwn ? 'bg-black/10 border-white/40' : 'bg-black/5 dark:bg-white/5 border-primary/40'}`}>
            <span className={`font-bold block mb-0.5 ${isOwn ? 'text-white/80' : 'text-primary'}`}>{post.quote_author}</span>
            <span className="opacity-90 line-clamp-3">{post.quote_body}</span>
          </div>
        )}

        {/* Message Body */}
        <p className={`text-sm whitespace-pre-wrap break-words ${isDeleted ? 'italic opacity-60' : ''}`}>
          {isDeleted ? '🚫 This message was deleted' : post.body}
        </p>

        {/* Floating Timestamp and Actions */}
        <div className="absolute bottom-1 right-2 flex items-center gap-2 text-[10px] opacity-70">
          {!isDeleted && (
            <div className="flex items-center gap-2 mr-2">
              <button onClick={() => onReply(post)} className="hover:opacity-100 transition-opacity" title="Reply">↩</button>
              <button onClick={() => onLike(post)} className={`hover:opacity-100 transition-opacity ${post.isLiked ? 'text-rose-400 opacity-100' : ''}`} title="Like">
                {post.isLiked ? '❤️' : '🤍'} {post.likes_count > 0 && post.likes_count}
              </button>
              {isOwn && (
                <button onClick={() => onDelete(post)} className="hover:opacity-100 hover:text-red-300 transition-opacity" title="Delete">🗑</button>
              )}
            </div>
          )}
          <span>{formatChatTime(post.created_at)}</span>
          {isOwn && (
            <span className="ml-0.5" style={{ color: theme === 'whatsapp' ? '#53bdeb' : 'currentColor' }}>✓✓</span>
          )}
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
  const chatEndRef = useRef<HTMLDivElement>(null);

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
  const [chatTheme,    setChatTheme]    = useState<ChatTheme>('default');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  
  const [form, setForm] = useState({ name: '', description: '', cadre: '', exam_cycle: 'August', privacy: 'open' as 'open' | 'invite_only' });
  const profileCache = useRef<Record<string, { name: string; avatar: string | null }>>({});

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [feed]);

  /* enrich posts with author profiles */
  const enrich = useCallback(async (rows: Record<string, unknown>[]): Promise<FeedPost[]> => {
    const missing = Array.from(new Set(rows.map(r => r.author_id as string).filter(id => !profileCache.current[id])));
    if (missing.length) {
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
        const displayName: string = sp?.hide_real_name
          ? (sp.display_name ?? (sp.username ? `@${sp.username}` : p.full_name ?? 'Student'))
          : (p.full_name ?? 'User');
        profileCache.current[p.id] = { name: displayName, avatar: p.avatar_url ?? null };
      }
    }
    return rows.map(r => {
      const prof = profileCache.current[r.author_id as string] ?? { name: 'User', avatar: null };
      return { ...(r as any), author_name: prof.name, author_avatar: prof.avatar } as FeedPost;
    });
  }, []);

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
    
    // WhatsApp style: flat chronological order (oldest at top, newest at bottom)
    const flatChronological = withLikes.reverse();
    setFeed(flatChronological);
    setLoadingFeed(false);
    
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
          if (prev.some(t => t.id === p.id)) return prev;
          return [...prev, p]; // flat append to bottom
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

  const postMessage = async () => {
    if (!activeGroup || !body.trim() || posting) return;
    setPosting(true);
    const { error } = await sbRef.current.from('community_messages').insert({
      author_id: userId, group_id: activeGroup.id, body: body.trim(),
      reply_to_id: replyTo?.id ?? null, quote_body: replyTo?.body?.substring(0, 200) ?? null, quote_author: replyTo?.author_name ?? null,
    } as any);
    if (error) toast.error('Could not post. Please try again.');
    setReplyTo(null);
    setBody('');
    setPosting(false);
  };

  const likePost = async (post: FeedPost) => {
    const nowLiked = !post.isLiked;
    setFeed(prev => prev.map(p => p.id === post.id ? { ...p, likes_count: nowLiked ? p.likes_count + 1 : Math.max(p.likes_count - 1, 0), isLiked: nowLiked } : p));
    await (sbRef.current as any).rpc('toggle_post_like', { p_post_id: post.id, p_user_id: userId });
  };

  const deletePost = async (post: FeedPost) => {
    await (sbRef.current as any).from('community_messages').update({ is_deleted: true, body: '[message deleted]' }).eq('id', post.id);
  };

  const joinGroup = async (g: StudyGroup) => {
    const { error } = await (sbRef.current as any).from('group_members').insert({ group_id: g.id, student_id: userId, role: 'member' });
    if (error) { toast.error('Could not join.'); return; }
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

  if (isLoading) return <div className="flex items-center justify-center min-h-[80vh]"><Spinner size="lg" color="primary" /></div>;

  const bgStyle = THEME_STYLES[chatTheme].bg;
  const doodlePattern = theme === 'whatsapp' || theme === 'default' 
    ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-26.69 26.69-.83-.83L54.627 0zM3.553 0l.83.83L.83 4.383 0 3.553 3.553 0zM0 54.627l.83-.83 4.383 3.553-.83.83L0 54.627zm56.447 5.373l.83-.83 2.723 2.723-.83.83-2.723-2.723zM5.373 60l-.83-.83 26.69-26.69.83.83L5.373 60zm49.254-60l.83.83-26.69 26.69-.83-.83L54.627 0z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")` 
    : 'none';

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-100px)] overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-xl flex bg-[var(--color-card)]">
      
      {/* ── LEFT: Groups sidebar ── */}
      <div className={`w-full md:w-[350px] lg:w-[400px] flex flex-col flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-card)] transition-transform duration-300 ${activeGroup ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <h1 className="text-xl font-heading font-bold text-[var(--color-text)]">Chats</h1>
          <button onClick={() => setShowCreate(true)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[var(--color-text-secondary)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {/* My groups */}
          {myGroups.length > 0 && (
            <div className="mt-2">
              <div className="px-4 py-2">
                <p className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">My Groups</p>
              </div>
              <div>
                {myGroups.map(g => (
                  <button key={g.id} onClick={() => selectGroup(g)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${activeGroup?.id === g.id ? 'bg-primary/10' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {g.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left min-w-0 border-b border-[var(--color-border)]/50 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--color-text)] truncate">{g.name}</span>
                        <span className="text-[10px] text-[var(--color-text-secondary)]">👥 {g.member_count}</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] truncate">{g.cadre} · {g.exam_cycle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Discover */}
          <div className="mt-4 border-t 8 border-[var(--color-border)]">
            <div className="px-4 py-3">
              <p className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Discover</p>
            </div>
            {allGroups.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)] px-4 pb-4">No more groups to join.</p>
            ) : (
              <div>
                {allGroups.map(g => (
                  <div key={g.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] font-bold flex-shrink-0">
                      {g.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[var(--color-text)] truncate">{g.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">👥 {g.member_count}/{g.max_members}</p>
                    </div>
                    {g.privacy === 'open' && g.member_count < g.max_members ? (
                      <button onClick={() => joinGroup(g)} className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90">Join</button>
                    ) : (
                      <span className="text-[10px] bg-[var(--color-border)] px-2 py-1 rounded-full text-[var(--color-text-secondary)]">
                        {g.member_count >= g.max_members ? 'Full' : 'Invite'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Chat Pane ── */}
      <div className={`flex-1 flex flex-col ${bgStyle} transition-colors ${!activeGroup ? 'hidden md:flex' : 'flex'}`} style={{ backgroundImage: doodlePattern }}>
        {activeGroup ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-4 flex items-center justify-between bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveGroup(null)} className="md:hidden text-[var(--color-text-secondary)] p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {activeGroup.name.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-[var(--color-text)] leading-tight">{activeGroup.name}</h2>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {activeGroup.member_count} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={chatTheme} 
                  onChange={(e) => setChatTheme(e.target.value as ChatTheme)}
                  className="text-xs bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-2 py-1 outline-none focus:border-primary"
                >
                  <option value="default">Teal Theme</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="midnight">Midnight</option>
                </select>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1">
              {loadingFeed ? (
                <div className="flex justify-center py-10"><Spinner color="primary" /></div>
              ) : feed.length === 0 ? (
                <div className="text-center py-10">
                  <p className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 text-xs px-3 py-1.5 rounded-lg shadow-sm">
                    🔒 Messages are end-to-end encrypted for your learning privacy. Say hello!
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <p className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 text-[11px] px-3 py-1.5 rounded-lg shadow-sm font-medium">
                      🔒 Messages are encrypted. Nobody outside of this group can read them.
                    </p>
                  </div>
                  {feed.map(p => (
                    <MessageBubble key={p.id} post={p} userId={userId} onReply={setReplyTo} onLike={likePost} onDelete={deletePost} theme={chatTheme} />
                  ))}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Compose Input */}
            <div className="bg-[var(--color-bg)] p-3 px-4 border-t border-[var(--color-border)]">
              {replyTo && (
                <div className="mb-2 bg-black/5 dark:bg-white/5 border-l-4 border-primary rounded-lg px-3 py-2 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-primary mb-0.5">{replyTo.author_name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">{replyTo.body}</p>
                  </div>
                  <button onClick={() => setReplyTo(null)} className="text-gray-400 hover:text-red-400 text-xl font-bold px-2">×</button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      postMessage();
                    }
                  }}
                  placeholder="Type a message"
                  className="flex-1 max-h-32 min-h-[44px] rounded-2xl border-none outline-none bg-white dark:bg-[#2a3942] text-[var(--color-text)] px-4 py-3 text-sm resize-none shadow-sm placeholder-[var(--color-text-secondary)] focus:ring-1 focus:ring-primary/50"
                  rows={1}
                />
                <button
                  onClick={postMessage}
                  disabled={!body.trim() || posting}
                  className="w-[44px] h-[44px] rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 hover:bg-primary-mid transition-colors flex-shrink-0 shadow-sm"
                >
                  {posting ? <Spinner size="sm" color="white" /> : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[var(--color-bg)]/80">
            <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-light text-[var(--color-text)] mb-2">NurseFiti Community</h2>
            <p className="text-[var(--color-text-secondary)] text-sm max-w-md leading-relaxed">
              Select a group to start messaging. Connect with your peers, share study materials, and prepare for the NCK exams together.
            </p>
          </div>
        )}
      </div>

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
    <Suspense fallback={<div className="flex items-center justify-center min-h-[80vh]"><Spinner size="lg" color="primary" /></div>}>
      <GroupsInner />
    </Suspense>
  );
}
