"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function formatChatTime(ts: string) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

type ChatTheme = 'nurse-fiti-glass' | 'cyber-neon' | 'whatsapp' | 'instagram-gradient';
type AnimSpeed = 'snappy' | 'smooth';

const THEME_STYLES: Record<ChatTheme, { 
  bg: string; wrapperBg: string; overlay: string; 
  ownBubble: string; otherBubble: string; 
  textColorOwn: string; textColorOther: string; 
  inputBg: string; headerBg: string; 
}> = {
  'nurse-fiti-glass': {
    wrapperBg: 'bg-gradient-to-br from-teal-50 to-blue-50 dark:from-[#0a1f24] dark:to-[#0f172a]',
    bg: 'bg-transparent',
    overlay: 'backdrop-blur-xl bg-white/40 dark:bg-black/40',
    headerBg: 'backdrop-blur-2xl bg-white/60 dark:bg-[#0f172a]/60 border-b border-teal-100/30 dark:border-teal-900/30',
    ownBubble: 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-teal-500/20 backdrop-blur-md',
    otherBubble: 'bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10',
    textColorOwn: 'text-white',
    textColorOther: 'text-neutral-800 dark:text-neutral-100',
    inputBg: 'bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10',
  },
  'cyber-neon': {
    wrapperBg: 'bg-black',
    bg: 'bg-black',
    overlay: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-black to-black',
    headerBg: 'bg-black/80 backdrop-blur-lg border-b border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]',
    ownBubble: 'bg-transparent border border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.3)]',
    otherBubble: 'bg-transparent border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    textColorOwn: 'text-fuchsia-100',
    textColorOther: 'text-cyan-100',
    inputBg: 'bg-black border border-fuchsia-500/50 focus:shadow-[0_0_15px_rgba(217,70,239,0.4)]',
  },
  'whatsapp': {
    wrapperBg: 'bg-[#efeae2] dark:bg-[#0b141a]',
    bg: 'bg-[#efeae2] dark:bg-[#0b141a]',
    overlay: 'bg-transparent',
    headerBg: 'bg-[#f0f2f5] dark:bg-[#202c33] border-b border-black/5',
    ownBubble: 'bg-[#d9fdd3] dark:bg-[#005c4b] shadow-sm',
    otherBubble: 'bg-white dark:bg-[#202c33] shadow-sm',
    textColorOwn: 'text-neutral-900 dark:text-white',
    textColorOther: 'text-neutral-900 dark:text-white',
    inputBg: 'bg-white dark:bg-[#2a3942]',
  },
  'instagram-gradient': {
    wrapperBg: 'bg-black',
    bg: 'bg-black',
    overlay: 'bg-black',
    headerBg: 'bg-black/90 backdrop-blur border-b border-neutral-900',
    ownBubble: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
    otherBubble: 'bg-neutral-900',
    textColorOwn: 'text-white',
    textColorOther: 'text-white',
    inputBg: 'bg-neutral-900 border border-neutral-800 focus:border-neutral-700',
  }
};

/* ── MessageBubble ───────────────────────────────────────────────────────── */
function MessageBubble({ post, userId, onReply, onLike, onDelete, theme, animSpeed }: {
  post: FeedPost; userId: string;
  onReply: (p: FeedPost) => void;
  onLike: (p: FeedPost) => void;
  onDelete: (p: FeedPost) => void;
  theme: ChatTheme;
  animSpeed: AnimSpeed;
}) {
  const isOwn = post.author_id === userId;
  const isAdmin = post.is_admin_post;
  const isDeleted = post.is_deleted;
  const styles = THEME_STYLES[theme];

  const animClass = animSpeed === 'snappy' 
    ? 'animate-in fade-in zoom-in-95 duration-150' 
    : 'animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out-expo';

  return (
    <div className={`flex w-full mb-3 ${isOwn ? 'justify-end' : 'justify-start'} ${animClass}`}>
      <div className={`relative max-w-[92%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] rounded-2xl px-3 py-1.5 pb-6 sm:px-4 sm:py-2 sm:pb-6 shadow-md transition-all ${isOwn ? `${styles.ownBubble} ${styles.textColorOwn} rounded-tr-sm` : `${styles.otherBubble} ${styles.textColorOther} rounded-tl-sm`}`}>
        
        {/* Author row for others */}
        {!isOwn && !isDeleted && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={`text-xs font-black ${isAdmin ? 'text-amber-500' : (theme === 'cyber-neon' ? 'text-cyan-400' : 'text-primary')}`}>
              {post.author_name}
            </span>
            {isAdmin && (
              <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Admin</span>
            )}
          </div>
        )}

        {/* Quoted message */}
        {post.quote_body && !isDeleted && (
          <div className={`mb-2 px-3 py-2 rounded-lg text-xs border-l-4 backdrop-blur-md transition-all ${isOwn ? 'bg-black/15 border-white/50' : 'bg-black/5 dark:bg-white/10 border-primary/50'}`}>
            <span className={`font-bold block mb-0.5 ${isOwn ? 'text-white' : 'text-primary'}`}>{post.quote_author}</span>
            <span className="opacity-90 line-clamp-2">{post.quote_body}</span>
          </div>
        )}

        {/* Message Body */}
        <p className={`text-[13px] sm:text-sm md:text-[15px] whitespace-pre-wrap break-words leading-relaxed ${isDeleted ? 'italic opacity-60' : ''}`}>
          {isDeleted ? '🚫 This message was deleted' : post.body}
        </p>

        {/* Floating Timestamp and Actions */}
        <div className="absolute bottom-1.5 right-3 flex items-center gap-2 text-[10px] opacity-70">
          {!isDeleted && (
            <div className="flex items-center gap-2 mr-2">
              <button onClick={() => onReply(post)} className="hover:opacity-100 hover:scale-110 transition-all" title="Reply">↩</button>
              <button onClick={() => onLike(post)} className={`hover:opacity-100 hover:scale-110 transition-all ${post.isLiked ? 'text-rose-400 opacity-100 scale-110' : ''}`} title="Like">
                {post.isLiked ? '❤️' : '🤍'} {post.likes_count > 0 && post.likes_count}
              </button>
              {isOwn && (
                <button onClick={() => onDelete(post)} className="hover:opacity-100 hover:text-red-400 hover:scale-110 transition-all" title="Delete">🗑</button>
              )}
            </div>
          )}
          <span className="font-medium tracking-wide">{formatChatTime(post.created_at)}</span>
          {isOwn && (
            <span className="ml-0.5" style={{ color: theme === 'whatsapp' ? '#53bdeb' : (theme === 'cyber-neon' ? '#d946ef' : 'currentColor') }}>✓✓</span>
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
  const [replyTo,      setReplyTo]      = useState<FeedPost | null>(null);
  const [showCreate,   setShowCreate]   = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [isLoading,    setIsLoading]    = useState(true);
  
  // Customization state
  const [chatTheme,    setChatTheme]    = useState<ChatTheme>('nurse-fiti-glass');
  const [animSpeed,    setAnimSpeed]    = useState<AnimSpeed>('smooth');
  
  // Rename state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameVal,   setEditNameVal]   = useState('');
  const [isSavingName,  setIsSavingName]  = useState(false);

  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  
  const [form, setForm] = useState({ name: '', description: '', cadre: '', exam_cycle: 'August', privacy: 'open' as 'open' | 'invite_only' });
  const profileCache = useRef<Record<string, { name: string; avatar: string | null }>>({});

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: animSpeed === 'smooth' ? 'smooth' : 'auto' });

  useEffect(() => { scrollToBottom(); }, [feed, animSpeed]);

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
      const [{ data: sp }] = await Promise.all([
        sbRef.current.from('student_profiles').select('cadre,exam_cycle').eq('id', user.id).single() as any,
        sbRef.current.from('profiles').select('full_name,avatar_url').eq('id', user.id).single() as any,
      ]);
      if (sp)   setForm(f => ({ ...f, cadre: sp.cadre, exam_cycle: sp.exam_cycle }));
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

  const selectGroup = async (g: StudyGroup) => { setActiveGroup(g); setReplyTo(null); setIsEditingName(false); await loadFeed(g); };

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
  
  const saveGroupName = async () => {
    if (!activeGroup || !editNameVal.trim() || editNameVal === activeGroup.name) {
      setIsEditingName(false);
      return;
    }
    setIsSavingName(true);
    const { error } = await (sbRef.current as any)
      .from('study_groups')
      .update({ name: editNameVal.trim() })
      .eq('id', activeGroup.id);
      
    if (error) {
      toast.error('Failed to rename group.');
    } else {
      toast.success('Group renamed!');
      setActiveGroup(prev => prev ? { ...prev, name: editNameVal.trim() } : null);
      setMyGroups(prev => prev.map(g => g.id === activeGroup.id ? { ...g, name: editNameVal.trim() } : g));
      setIsEditingName(false);
    }
    setIsSavingName(false);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[80vh]"><Spinner size="lg" color="primary" /></div>;

  const styles = THEME_STYLES[chatTheme];
  const doodlePattern = chatTheme === 'whatsapp' || chatTheme === 'nurse-fiti-glass'
    ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-26.69 26.69-.83-.83L54.627 0zM3.553 0l.83.83L.83 4.383 0 3.553 3.553 0zM0 54.627l.83-.83 4.383 3.553-.83.83L0 54.627zm56.447 5.373l.83-.83 2.723 2.723-.83.83-2.723-2.723zM5.373 60l-.83-.83 26.69-26.69.83.83L5.373 60zm49.254-60l.83.83-26.69 26.69-.83-.83L54.627 0z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")` 
    : 'none';
    
  const transitionClass = animSpeed === 'snappy' ? 'transition-all duration-150' : 'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]';

  return (
    <div className={`max-w-[1400px] mx-auto h-[calc(100vh-100px)] overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl flex ${styles.wrapperBg} ${transitionClass}`}>
      
      {/* ── LEFT: Groups sidebar ── */}
      <div className={`w-full md:w-[350px] lg:w-[400px] flex flex-col flex-shrink-0 border-r border-[var(--color-border)]/50 ${styles.bg} ${transitionClass} ${activeGroup ? 'hidden md:flex' : 'flex'} z-20`}>
        {/* Header */}
        <div className={`h-20 px-6 flex items-center justify-between ${styles.headerBg} ${transitionClass} shadow-sm z-10`}>
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 drop-shadow-sm">Chats</h1>
          <button onClick={() => setShowCreate(true)} className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all text-primary font-bold shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className={`flex-1 overflow-y-auto ${styles.overlay} ${transitionClass}`}>
          {/* My groups */}
          {myGroups.length > 0 && (
            <div className="mt-4">
              <div className="px-6 py-2">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest">My Groups</p>
              </div>
              <div className="px-2 space-y-1">
                {myGroups.map(g => (
                  <button key={g.id} onClick={() => selectGroup(g)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-primary/10 transition-all group ${activeGroup?.id === g.id ? 'bg-primary/15 shadow-sm' : ''}`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-md group-hover:scale-105 group-hover:rotate-3 ${transitionClass}`}>
                      {g.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-[var(--color-text)] truncate text-base">{g.name}</span>
                        <span className="text-[10px] font-bold bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">👥 {g.member_count}</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] font-medium truncate opacity-80">{g.cadre} · {g.exam_cycle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Discover */}
          <div className="mt-6">
            <div className="px-6 py-2">
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest">Discover</p>
            </div>
            {allGroups.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)] px-6 pb-6 italic">No more groups to join.</p>
            ) : (
              <div className="px-2 space-y-1 pb-4">
                {allGroups.map(g => (
                  <div key={g.id} className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] font-bold flex-shrink-0">
                      {g.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[var(--color-text)] truncate text-sm">{g.name}</p>
                      <p className="text-[11px] text-[var(--color-text-secondary)] font-medium">👥 {g.member_count}/{g.max_members}</p>
                    </div>
                    {g.privacy === 'open' && g.member_count < g.max_members ? (
                      <button onClick={() => joinGroup(g)} className="px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md">Join</button>
                    ) : (
                      <span className="text-[10px] bg-[var(--color-border)] px-2 py-1 rounded-full text-[var(--color-text-secondary)] font-bold">
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
      <div className={`flex-1 flex flex-col relative ${styles.bg} ${transitionClass} ${!activeGroup ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Background Overlay */}
        <div className={`absolute inset-0 z-0 ${styles.overlay} ${transitionClass}`} style={{ backgroundImage: doodlePattern, backgroundSize: '400px' }} />
        
        {activeGroup ? (
          <>
            {/* Chat Header */}
            <div className={`h-20 px-4 md:px-6 flex items-center justify-between ${styles.headerBg} ${transitionClass} z-20`}>
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveGroup(null)} className="md:hidden text-[var(--color-text)] p-2 hover:bg-black/10 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg ${transitionClass}`}>
                  {activeGroup.name.substring(0, 1).toUpperCase()}
                </div>
                
                {/* Rename logic */}
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={editNameVal} 
                      onChange={e => setEditNameVal(e.target.value)}
                      className="bg-black/5 dark:bg-white/10 border-none outline-none rounded-lg px-3 py-1.5 text-sm font-bold w-[180px] md:w-[250px] focus:ring-2 focus:ring-primary backdrop-blur-md"
                      autoFocus
                    />
                    <button onClick={saveGroupName} disabled={isSavingName} className="p-1.5 bg-success text-white rounded-md hover:opacity-90 disabled:opacity-50">
                      {isSavingName ? <Spinner size="sm" color="white" /> : '✓'}
                    </button>
                    <button onClick={() => setIsEditingName(false)} disabled={isSavingName} className="p-1.5 bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md hover:opacity-90 disabled:opacity-50">
                      ✕
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className={`font-black text-lg leading-tight ${chatTheme === 'cyber-neon' ? 'text-fuchsia-400' : 'text-[var(--color-text)]'}`}>{activeGroup.name}</h2>
                      {activeGroup.creator_id === userId && (
                        <button onClick={() => { setEditNameVal(activeGroup.name); setIsEditingName(true); }} className="text-neutral-400 hover:text-primary transition-colors p-1" title="Rename Group">
                          ✏️
                        </button>
                      )}
                    </div>
                    <p className={`text-xs font-semibold opacity-70 ${chatTheme === 'cyber-neon' ? 'text-cyan-400' : 'text-[var(--color-text-secondary)]'}`}>
                      {activeGroup.member_count} members
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Animation Toggle */}
                <div className="hidden md:flex items-center bg-black/5 dark:bg-white/10 rounded-xl p-1 backdrop-blur-md">
                  <button onClick={() => setAnimSpeed('snappy')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${animSpeed === 'snappy' ? 'bg-white dark:bg-black shadow-sm' : 'opacity-60 hover:opacity-100'}`}>Snappy</button>
                  <button onClick={() => setAnimSpeed('smooth')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${animSpeed === 'smooth' ? 'bg-white dark:bg-black shadow-sm' : 'opacity-60 hover:opacity-100'}`}>Smooth</button>
                </div>
                
                {/* Theme Selector */}
                <select 
                  value={chatTheme} 
                  onChange={(e) => setChatTheme(e.target.value as ChatTheme)}
                  className="text-xs bg-black/5 dark:bg-white/10 border-none rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary font-bold backdrop-blur-md cursor-pointer"
                >
                  <option value="nurse-fiti-glass">Glass (Premium)</option>
                  <option value="cyber-neon">Cyber Neon</option>
                  <option value="whatsapp">Classic WhatsApp</option>
                  <option value="instagram-gradient">Insta Gradient</option>
                </select>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 z-10 scroll-smooth">
              {loadingFeed ? (
                <div className="flex justify-center py-10"><Spinner color="primary" /></div>
              ) : feed.length === 0 ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <p className="inline-block bg-white/80 dark:bg-black/60 backdrop-blur-md text-[var(--color-text)] text-sm px-6 py-4 rounded-2xl shadow-xl font-medium border border-white/20">
                    🔒 Messages are end-to-end encrypted for your learning privacy. Say hello!
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <p className="inline-block bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/5 text-[var(--color-text)] text-[11px] px-4 py-2 rounded-xl shadow-sm font-semibold">
                      🔒 Messages are encrypted. Nobody outside of this group can read them.
                    </p>
                  </div>
                  {feed.map(p => (
                    <MessageBubble key={p.id} post={p} userId={userId} onReply={setReplyTo} onLike={likePost} onDelete={deletePost} theme={chatTheme} animSpeed={animSpeed} />
                  ))}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Compose Input */}
            <div className={`p-4 md:p-6 pt-2 z-20 ${transitionClass}`}>
              <div className={`${styles.inputBg} ${transitionClass} rounded-3xl p-2 shadow-2xl relative`}>
                {replyTo && (
                  <div className={`mb-3 mx-2 mt-2 p-3 rounded-xl backdrop-blur-md flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 ${isEditingName ? '' : 'bg-black/5 dark:bg-white/5 border-l-4 border-primary'}`}>
                    <div>
                      <p className="text-xs font-black text-primary mb-1">{replyTo.author_name}</p>
                      <p className="text-xs text-[var(--color-text)] opacity-80 line-clamp-1">{replyTo.body}</p>
                    </div>
                    <button onClick={() => setReplyTo(null)} className="text-[var(--color-text-secondary)] hover:text-red-400 text-2xl font-bold px-2 hover:scale-110 transition-transform">×</button>
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
                    placeholder="Message"
                    className="flex-1 max-h-32 min-h-[50px] bg-transparent border-none outline-none text-[var(--color-text)] px-4 py-3 text-[15px] resize-none placeholder-[var(--color-text-secondary)] font-medium"
                    rows={1}
                  />
                  <button
                    onClick={postMessage}
                    disabled={!body.trim() || posting}
                    className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center text-white disabled:opacity-40 disabled:grayscale hover:scale-105 active:scale-95 transition-all flex-shrink-0 shadow-lg shadow-primary/30 m-1"
                  >
                    {posting ? <Spinner size="sm" color="white" /> : (
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 z-10">
            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl animate-pulse">
              <svg className="w-16 h-16 text-primary drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 mb-4 drop-shadow-sm">NurseFiti Community</h2>
            <p className="text-[var(--color-text)] opacity-70 text-sm max-w-md leading-relaxed font-medium">
              Select a group to start messaging. Connect with your peers, share study materials, and prepare for the NCK exams together.
            </p>
          </div>
        )}
      </div>

      {/* Create group modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Study Group" size="md">
        <div className="space-y-5 p-2">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Group Name <span className="text-error">*</span></label>
            <input className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-bold text-sm transition-all" placeholder="e.g., KRCHN August 2026 Squad" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Description</label>
            <textarea className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-medium text-sm transition-all resize-none" rows={2} placeholder="What is this group about?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Cadre <span className="text-error">*</span></label>
              <select className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-bold text-sm transition-all" value={form.cadre} onChange={e => setForm(f => ({ ...f, cadre: e.target.value }))}>
                <option value="">Select…</option>
                <option>KRCHN</option><option>BScN</option><option>Higher Diploma</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Exam Cycle</label>
              <select className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-bold text-sm transition-all" value={form.exam_cycle} onChange={e => setForm(f => ({ ...f, exam_cycle: e.target.value }))}>
                <option>May</option><option>August</option><option>November</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Privacy</label>
            <div className="flex gap-3">
              {(['open', 'invite_only'] as const).map(p => (
                <label key={p} className={`flex-1 flex justify-center items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.privacy === p ? 'border-primary bg-primary/10 scale-105 shadow-sm' : 'border-transparent bg-black/5 dark:bg-white/5 hover:bg-black/10'}`}>
                  <input type="radio" name="privacy" value={p} checked={form.privacy === p} onChange={() => setForm(f => ({ ...f, privacy: p }))} className="sr-only" />
                  <span className="text-sm font-black">{p === 'open' ? '🔓 Open' : '🔒 Invite Only'}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={createGroup} disabled={creating || !form.name.trim() || !form.cadre}
            className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-primary to-teal-500 text-white font-black text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 hover:shadow-xl hover:shadow-primary/30 transition-all">
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
