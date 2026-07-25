'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

type Comment = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  } | null;
};

export default function BlogComments({ slug, initialComments = [] }: { slug: string; initialComments?: Comment[] }) {
  const supabase = createClient() as any;
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(initialComments.length === 0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => setUser(data.user));
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('blog_comments')
      .select('id, user_id, content, created_at, profiles:user_id(full_name, avatar_url)')
      .eq('slug', slug)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });
    
    if (data) setComments(data as any);
    setIsLoading(false);
  };

  const submitComment = async () => {
    if (!newComment.trim() || !user) return;
    setIsSubmitting(true);
    const { error } = await supabase
      .from('blog_comments')
      .insert({ slug, user_id: user.id, content: newComment.trim() });
    
    if (!error) {
      setNewComment('');
      fetchComments();
    } else {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="my-10 pt-8 border-t border-[var(--color-border)]">
      <h3 className="text-2xl font-heading font-bold text-[var(--color-text)] mb-6">Comments</h3>
      
      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {isLoading ? (
          <p className="text-neutral-mid animate-pulse">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-neutral-mid">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold overflow-hidden flex-shrink-0">
                {c.profiles?.avatar_url ? (
                  <img src={c.profiles.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  c.profiles?.full_name?.charAt(0) || 'U'
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[var(--color-text)]">{c.profiles?.full_name || 'Anonymous User'}</span>
                  <span className="text-xs text-neutral-light">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-neutral-mid leading-relaxed whitespace-pre-wrap">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      {user ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-4 text-[var(--color-text)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-y"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={submitComment}
                disabled={isSubmitting || !newComment.trim()}
                className="bg-primary hover:bg-primary-mid text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#08514F] to-[#0A6865] p-8 rounded-2xl text-center shadow-xl">
          <p className="text-white font-heading font-bold text-xl mb-3">Join the Conversation!</p>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Create a free NurseFiti account to share your thoughts, ask questions, and unlock exclusive NCK exam prep resources.</p>
          <Link href="/signup" className="inline-block bg-[#F5A623] hover:bg-[#E09010] text-[#0F1C1C] px-8 py-3 rounded-xl font-bold transition-colors">
            Sign Up for Free
          </Link>
          <p className="mt-4 text-xs text-white/60">Already have an account? <Link href="/login" className="underline hover:text-white">Log in here</Link></p>
        </div>
      )}
    </div>
  );
}
