"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TutorMessage {
  id: string;
  author_id: string;
  body: string;
  reply_to_id: string | null;
  quote_body: string | null;
  quote_author: string | null;
  is_deleted: boolean;
  is_admin_post: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  // enriched from profiles
  author_name: string;
  author_avatar: string | null;
}

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(ts: string): string {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(ts).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' });
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ── Admin Badge ───────────────────────────────────────────────────────────────

function AdminBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      NurseFiti Official
    </span>
  );
}

// ── PostCard ──────────────────────────────────────────────────────────────────

interface PostCardProps {
  msg: TutorMessage;
  currentUserId: string;
  likedIds: Set<string>;
  onReply: (msg: TutorMessage) => void;
  onLike: (msg: TutorMessage) => void;
  onDelete: (msg: TutorMessage) => void;
  indent?: boolean;
}

function PostCard({ msg, currentUserId, likedIds, onReply, onLike, onDelete, indent = false }: PostCardProps) {
  const [hovered, setHovered] = useState(false);
  const isOwn = msg.author_id === currentUserId;
  const isLiked = likedIds.has(msg.id);
  const isAdmin = msg.is_admin_post;

  if (msg.is_deleted) {
    return (
      <div className={`flex gap-3 py-3 px-4 ${indent ? 'ml-10 border-l-2 border-[var(--color-border)] pl-4' : ''}`}>
        <p className="text-sm italic text-[var(--color-text-secondary)]">[Post deleted]</p>
      </div>
    );
  }

  return (
    <div
      className={`
        group relative flex gap-3 py-4 px-4 transition-colors
        ${indent ? 'ml-10 border-l-2 border-primary/20 pl-4' : ''}
        ${isAdmin
          ? 'bg-amber-50/60 border-l-4 border-amber-400 hover:bg-amber-50'
          : 'hover:bg-[var(--color-border)]/20'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        <Avatar src={msg.author_avatar} name={msg.author_name} size="md" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-[var(--color-text)] text-sm leading-none">
            {isAdmin ? 'NurseFiti Official' : msg.author_name}
          </span>
          {isAdmin && <AdminBadge />}
          <span className="text-[var(--color-text-secondary)] text-xs">·</span>
          <span className="text-[var(--color-text-secondary)] text-xs" title={new Date(msg.created_at).toLocaleString('en-KE')}>
            {relativeTime(msg.created_at)}
          </span>
        </div>

        {/* Quote preview */}
        {msg.quote_body && (
          <div className="mb-2 px-3 py-2 rounded-lg bg-[var(--color-border)]/40 border-l-2 border-primary/40 text-xs text-[var(--color-text-secondary)]">
            <span className="font-semibold text-primary">{msg.quote_author}: </span>
            <span className="line-clamp-2">{msg.quote_body}</span>
          </div>
        )}

        {/* Body */}
        <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap break-words">
          {msg.body}
        </p>

        {/* Action row */}
        <div className="flex items-center gap-4 mt-2.5">
          {/* Reply */}
          <button
            onClick={() => onReply(msg)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-primary transition-colors group/btn"
          >
            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </button>

          {/* Like */}
          <button
            onClick={() => onLike(msg)}
            className={`flex items-center gap-1.5 text-xs transition-colors group/btn ${
              isLiked ? 'text-rose-500' : 'text-[var(--color-text-secondary)] hover:text-rose-500'
            }`}
          >
            <svg
              className={`w-4 h-4 group-hover/btn:scale-110 transition-transform ${isLiked ? 'fill-rose-500' : 'fill-none'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {msg.likes_count > 0 && <span>{formatCount(msg.likes_count)}</span>}
          </button>

          {/* Views */}
          <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {msg.views_count > 0 && <span>{formatCount(msg.views_count)}</span>}
          </span>

          {/* Delete (own posts only, on hover) */}
          {isOwn && hovered && (
            <button
              onClick={() => onDelete(msg)}
              className="ml-auto flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
              title="Delete post"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ComposeBox ────────────────────────────────────────────────────────────────

interface ComposeBoxProps {
  userAvatar: string | null;
  userName: string;
  replyTo: TutorMessage | null;
  onClearReply: () => void;
  onPost: (body: string) => Promise<void>;
  posting: boolean;
}

function ComposeBox({ userAvatar, userName, replyTo, onClearReply, onPost, posting }: ComposeBoxProps) {
  const [body, setBody] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX = 500;

  const handlePost = async () => {
    if (!body.trim() || posting) return;
    await onPost(body.trim());
    setBody('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePost();
    }
  };

  const remaining = MAX - body.length;
  const overLimit = remaining < 0;

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4">
      {/* Reply preview */}
      {replyTo && (
        <div className="mb-3 flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary">Replying to {replyTo.author_name}</p>
            <p className="text-xs text-[var(--color-text-secondary)] truncate">{replyTo.body}</p>
          </div>
          <button
            onClick={onClearReply}
            className="flex-shrink-0 text-[var(--color-text-secondary)] hover:text-red-500 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-1">
          <Avatar src={userAvatar} name={userName} size="md" />
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={e => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind?"
            rows={3}
            maxLength={MAX + 10}
            className={`
              w-full px-0 py-2 bg-transparent text-[var(--color-text)] text-sm leading-relaxed
              placeholder:text-[var(--color-text-secondary)] resize-none border-none outline-none
              focus:outline-none focus:ring-0
            `}
          />

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border)]">
            {/* Character count */}
            <span className={`text-xs tabular-nums ${overLimit ? 'text-red-500' : remaining < 50 ? 'text-amber-500' : 'text-[var(--color-text-secondary)]'}`}>
              {remaining}
            </span>

            <div className="flex items-center gap-2">
              {replyTo && (
                <span className="text-xs text-primary font-medium">↩ Reply</span>
              )}
              <button
                onClick={handlePost}
                disabled={!body.trim() || overLimit || posting}
                className={`
                  inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold
                  transition-all duration-150 select-none
                  ${!body.trim() || overLimit || posting
                    ? 'opacity-50 cursor-not-allowed bg-primary/40 text-white'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 hover:shadow-md active:scale-95 cursor-pointer'}
                `}
              >
                {posting
                  ? <><Spinner size="sm" color="white" /> Posting…</>
                  : 'Post'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TutorCommunityPage() {
  const router = useRouter();
  const supabase = createClient();
  const supabaseRef = useRef(supabase);

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<TutorMessage[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [replyTo, setReplyTo] = useState<TutorMessage | null>(null);
  const [posting, setPosting] = useState(false);

  const profileCache = useRef<Record<string, { name: string; avatar: string | null }>>({});
  const feedRef = useRef<HTMLDivElement>(null);

  // ── Profile enrichment ──────────────────────────────────────────────────────

  const enrichMessages = useCallback(async (msgs: Record<string, unknown>[]): Promise<TutorMessage[]> => {
    const unknownIds = msgs
      .map(m => m.author_id as string)
      .filter(id => !profileCache.current[id]);
    const unique = Array.from(new Set(unknownIds));

    if (unique.length > 0) {
      const { data: profiles } = await supabaseRef.current
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', unique);
      for (const p of profiles ?? []) {
        const profile = p as { id: string; full_name: string; avatar_url: string | null };
        profileCache.current[profile.id] = {
          name: profile.full_name ?? 'Tutor',
          avatar: profile.avatar_url ?? null,
        };
      }
    }

    return msgs.map(m => {
      const prof = profileCache.current[m.author_id as string] ?? { name: 'Tutor', avatar: null };
      return {
        id: m.id as string,
        author_id: m.author_id as string,
        body: m.body as string,
        reply_to_id: (m.reply_to_id as string | null) ?? null,
        quote_body: (m.quote_body as string | null) ?? null,
        quote_author: (m.quote_author as string | null) ?? null,
        is_deleted: (m.is_deleted as boolean) ?? false,
        is_admin_post: (m.is_admin_post as boolean) ?? false,
        likes_count: (m.likes_count as number) ?? 0,
        views_count: (m.views_count as number) ?? 0,
        created_at: m.created_at as string,
        author_name: prof.name,
        author_avatar: prof.avatar,
      };
    });
  }, []);

  // ── Initial load ────────────────────────────────────────────────────────────

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabaseRef.current.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: prof } = await supabaseRef.current
        .from('profiles')
        .select('id, full_name, avatar_url, role')
        .eq('id', user.id)
        .single();

      if (!prof) { router.push('/login'); return; }

      const profile = prof as UserProfile;
      if (profile.role !== 'tutor' && profile.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setCurrentUser(profile);
      profileCache.current[profile.id] = { name: profile.full_name, avatar: profile.avatar_url };

      // Load posts
      const { data: rawPosts } = await supabaseRef.current
        .from('tutor_messages')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(80);

      const enriched = await enrichMessages((rawPosts ?? []) as Record<string, unknown>[]);
      setPosts(enriched);

      setLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Real-time subscription ──────────────────────────────────────────────────

  useEffect(() => {
    if (!currentUser) return;

    const channel = supabaseRef.current
      .channel('tutor_community_feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tutor_messages' },
        async (payload) => {
          const [enriched] = await enrichMessages([payload.new as Record<string, unknown>]);
          setPosts(prev => {
            if (prev.some(p => p.id === enriched.id)) return prev;
            return [enriched, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tutor_messages' },
        async (payload) => {
          const [enriched] = await enrichMessages([payload.new as Record<string, unknown>]);
          setPosts(prev => prev.map(p => p.id === enriched.id ? { ...p, ...enriched } : p));
        }
      )
      .subscribe();

    return () => { supabaseRef.current.removeChannel(channel); };
  }, [currentUser, enrichMessages]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const handlePost = async (body: string) => {
    if (!currentUser || posting) return;
    setPosting(true);

    const optimisticId = `opt-${Date.now()}`;
    const optimistic: TutorMessage = {
      id: optimisticId,
      author_id: currentUser.id,
      body,
      reply_to_id: replyTo?.id ?? null,
      quote_body: replyTo?.body?.substring(0, 200) ?? null,
      quote_author: replyTo?.author_name ?? null,
      is_deleted: false,
      is_admin_post: currentUser.role === 'admin',
      likes_count: 0,
      views_count: 0,
      created_at: new Date().toISOString(),
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
    };

    setPosts(prev => [optimistic, ...prev]);
    setReplyTo(null);

    const { data, error } = await (supabaseRef.current as any)
      .from('tutor_messages')
      .insert({
        author_id: currentUser.id,
        body,
        reply_to_id: replyTo?.id ?? null,
        quote_body: replyTo?.body?.substring(0, 200) ?? null,
        quote_author: replyTo?.author_name ?? null,
        is_admin_post: currentUser.role === 'admin',
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to post. Please try again.');
      setPosts(prev => prev.filter(p => p.id !== optimisticId));
    } else {
      const realId = (data as { id: string }).id;
      setPosts(prev => prev.map(p => p.id === optimisticId ? { ...optimistic, id: realId } : p));
    }

    setPosting(false);
  };

  const handleLike = async (msg: TutorMessage) => {
    if (!currentUser) return;

    const wasLiked = likedIds.has(msg.id);
    const delta = wasLiked ? -1 : 1;

    // Optimistic
    setLikedIds(prev => {
      const next = new Set(prev);
      wasLiked ? next.delete(msg.id) : next.add(msg.id);
      return next;
    });
    setPosts(prev => prev.map(p =>
      p.id === msg.id ? { ...p, likes_count: Math.max(0, p.likes_count + delta) } : p
    ));

    const { error } = await (supabaseRef.current as any)
      .from('tutor_messages')
      .update({ likes_count: Math.max(0, msg.likes_count + delta) })
      .eq('id', msg.id);

    if (error) {
      // Rollback
      setLikedIds(prev => {
        const next = new Set(prev);
        wasLiked ? next.add(msg.id) : next.delete(msg.id);
        return next;
      });
      setPosts(prev => prev.map(p =>
        p.id === msg.id ? { ...p, likes_count: msg.likes_count } : p
      ));
      toast.error('Could not update like.');
    }
  };

  const handleDelete = async (msg: TutorMessage) => {
    if (!currentUser || msg.author_id !== currentUser.id) return;

    setPosts(prev => prev.map(p => p.id === msg.id ? { ...p, is_deleted: true } : p));

    const { error } = await (supabaseRef.current as any)
      .from('tutor_messages')
      .update({ is_deleted: true })
      .eq('id', msg.id);

    if (error) {
      toast.error('Could not delete post.');
      setPosts(prev => prev.map(p => p.id === msg.id ? { ...p, is_deleted: false } : p));
    } else {
      toast.success('Post deleted.');
    }
  };

  const handleReply = (msg: TutorMessage) => {
    setReplyTo(msg);
    feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Loading state ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!currentUser) return null;

  // ── Build thread tree (top-level + replies) ─────────────────────────────────

  const topLevel = posts.filter(p => !p.reply_to_id);
  const repliesMap: Record<string, TutorMessage[]> = {};
  for (const p of posts) {
    if (p.reply_to_id) {
      if (!repliesMap[p.reply_to_id]) repliesMap[p.reply_to_id] = [];
      repliesMap[p.reply_to_id].push(p);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <div className="px-4 pt-6 pb-4 border-b border-[var(--color-border)]">
        <h1 className="text-3xl font-heading font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tutor Community
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          A space for tutors to share tips, ask questions, and support each other.
        </p>
      </div>

      {/* Compose box */}
      <ComposeBox
        userAvatar={currentUser.avatar_url}
        userName={currentUser.full_name}
        replyTo={replyTo}
        onClearReply={() => setReplyTo(null)}
        onPost={handlePost}
        posting={posting}
      />

      {/* Feed */}
      <div ref={feedRef} className="divide-y divide-[var(--color-border)]">
        {topLevel.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-5xl mb-3">💬</p>
            <p className="font-semibold text-[var(--color-text)]">No posts yet</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Be the first to start a conversation!</p>
          </div>
        ) : (
          topLevel.map(post => (
            <div key={post.id}>
              <PostCard
                msg={post}
                currentUserId={currentUser.id}
                likedIds={likedIds}
                onReply={handleReply}
                onLike={handleLike}
                onDelete={handleDelete}
              />
              {/* Replies */}
              {(repliesMap[post.id] ?? []).map(reply => (
                <PostCard
                  key={reply.id}
                  msg={reply}
                  currentUserId={currentUser.id}
                  likedIds={likedIds}
                  onReply={handleReply}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  indent
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
