'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

type PostRow = {
  id: string; slug: string; title: string; excerpt: string; category: string;
  status: 'draft' | 'published' | 'archived'; published_at: string | null; updated_at: string;
};

const statusClass = {
  draft: 'bg-accent-light text-accent-dark',
  published: 'bg-success/10 text-success',
  archived: 'bg-[var(--color-border)] text-neutral-mid',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | PostRow['status']>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/blog/posts');
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      setPosts(body.posts ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not load blog posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (post: PostRow) => {
    if (!window.confirm(`Permanently delete "${post.title}"?`)) return;
    const response = await fetch(`/api/admin/blog/posts/${post.id}`, { method: 'DELETE' });
    const body = await response.json();
    if (!response.ok) return toast.error(body.error ?? 'Could not delete post');
    toast.success('Post deleted');
    load();
  };

  const visible = filter === 'all' ? posts : posts.filter(post => post.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-heading font-bold text-primary">Blog CMS</h1><p className="text-sm text-neutral-mid mt-1">Draft, preview, and publish articles without editing the codebase.</p></div>
        <div className="flex gap-2">
          <Link href="/admin/blog/automation" className="px-5 py-2.5 rounded-xl font-semibold border border-[var(--color-border)] hover:border-primary/40">Automation</Link>
          <Link href="/admin/blog/new" className="btn-primary px-5 py-2.5 rounded-xl font-semibold">New post</Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'draft', 'published', 'archived'] as const).map(value => <button key={value} onClick={() => setFilter(value)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize border transition-colors ${filter === value ? 'bg-primary text-white border-primary' : 'bg-[var(--color-card)] border-[var(--color-border)] text-neutral-mid hover:border-primary/40'}`}>{value}</button>)}
      </div>

      {loading ? <div className="py-20 flex justify-center"><Spinner size="lg" color="primary" /></div> : visible.length === 0 ? (
        <Card className="text-center py-14"><p className="text-4xl mb-3">📰</p><h2 className="font-heading font-bold text-lg">No {filter === 'all' ? '' : filter} posts yet</h2><p className="text-neutral-mid text-sm mt-1">Create the first CMS-managed NurseFiti article.</p></Card>
      ) : (
        <div className="space-y-3">{visible.map(post => (
          <Card key={post.id} className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2 mb-1"><span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${statusClass[post.status]}`}>{post.status === 'published' && post.published_at && new Date(post.published_at).getTime() > Date.now() ? 'Scheduled' : post.status}</span><span className="text-xs text-neutral-mid">{post.category}</span></div><h2 className="font-heading font-bold truncate">{post.title}</h2><p className="text-sm text-neutral-mid line-clamp-1 mt-1">{post.excerpt}</p><p className="text-xs text-neutral-mid mt-2">Updated {new Date(post.updated_at).toLocaleString('en-KE')}</p></div>
            <div className="flex gap-2 flex-shrink-0">{post.status === 'published' && post.published_at && new Date(post.published_at).getTime() <= Date.now() && <Link href={`/blog/${post.slug}`} target="_blank" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:border-primary/40">View</Link>}<Link href={`/admin/blog/${post.id}`} className="px-3 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Edit</Link><button onClick={() => remove(post)} className="px-3 py-2 rounded-lg text-error border border-error/20 text-sm font-semibold hover:bg-error/5">Delete</button></div>
          </Card>
        ))}</div>
      )}
    </div>
  );
}
