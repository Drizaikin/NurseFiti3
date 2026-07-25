'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BlogMarkdown } from '@/components/blog/BlogMarkdown';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { slugifyBlogTitle } from '@/lib/blog/validation';
import type { BlogFaq, BlogSource, BlogPostStatus } from '@/lib/blog/types';

type FormState = {
  title: string; slug: string; excerpt: string; contentMarkdown: string;
  category: string; cadres: string; status: BlogPostStatus; featured: boolean;
  heroImageUrl: string; heroImageAlt: string; authorName: string; reviewerName: string;
  seoTitle: string; seoDescription: string; primaryKeyword: string; publishedAt: string;
  faqs: BlogFaq[]; sources: BlogSource[];
};

const emptyForm: FormState = {
  title: '', slug: '', excerpt: '', contentMarkdown: '', category: 'Study Guide',
  cadres: 'KRCHN, BScN, Higher Diploma', status: 'draft', featured: false,
  heroImageUrl: '', heroImageAlt: '', authorName: 'NurseFiti Editorial Team', reviewerName: '',
  seoTitle: '', seoDescription: '', primaryKeyword: '', publishedAt: '', faqs: [], sources: [],
};

const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary/30';

function toLocalDateTime(value: string) {
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

export function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(postId));
  const [updatedAt, setUpdatedAt] = useState<string>();

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/admin/blog/posts/${postId}`).then(async response => {
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      const post = body.post;
      setForm({
        title: post.title, slug: post.slug, excerpt: post.excerpt,
        contentMarkdown: post.content_markdown, category: post.category,
        cadres: (post.cadres ?? []).join(', '), status: post.status, featured: post.featured,
        heroImageUrl: post.hero_image_url ?? '', heroImageAlt: post.hero_image_alt ?? '',
        authorName: post.author_name, reviewerName: post.reviewer_name ?? '',
        seoTitle: post.seo_title ?? '', seoDescription: post.seo_description ?? '',
        primaryKeyword: post.primary_keyword ?? '',
        publishedAt: post.published_at ? toLocalDateTime(post.published_at) : '',
        faqs: post.faqs ?? [], sources: post.sources ?? [],
      });
      setUpdatedAt(post.updated_at);
    }).catch(error => toast.error(error.message)).finally(() => setLoading(false));
  }, [postId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(current => ({ ...current, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        cadres: form.cadres.split(',').map(value => value.trim()).filter(Boolean),
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
        expectedUpdatedAt: updatedAt,
      };
      const response = await fetch(postId ? `/api/admin/blog/posts/${postId}` : '/api/admin/blog/posts', {
        method: postId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not save post');
      const scheduled = form.status === 'published' && form.publishedAt && new Date(form.publishedAt).getTime() > Date.now();
      toast.success(scheduled ? 'Post scheduled' : form.status === 'published' ? 'Post published' : 'Draft saved');
      setUpdatedAt(body.post.updated_at);
      if (!postId) router.replace(`/admin/blog/${body.post.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Spinner size="lg" color="primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><Link href="/admin/blog" className="text-sm text-primary hover:underline">← Blog posts</Link><h1 className="text-2xl font-heading font-bold text-primary mt-1">{postId ? 'Edit post' : 'New blog post'}</h1></div>
        <div className="flex gap-2"><Button variant="outline" onClick={() => setPreview(value => !value)}>{preview ? 'Edit' : 'Preview'}</Button><Button onClick={save} disabled={saving}>{saving ? <Spinner size="sm" color="white" /> : form.status === 'published' ? 'Publish changes' : 'Save draft'}</Button></div>
      </div>

      {preview ? (
        <Card className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wide text-primary">{form.category}</span>
          <h1 className="text-4xl font-heading font-bold mt-3 mb-4">{form.title || 'Untitled post'}</h1>
          <p className="text-lg text-neutral-mid mb-8">{form.excerpt}</p>
          <article className="prose-nursefiti"><BlogMarkdown content={form.contentMarkdown || 'Start writing to preview your article.'} /></article>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
          <Card className="space-y-5">
            <label className="block text-sm font-semibold">Title<input className={`${inputClass} mt-1`} value={form.title} maxLength={120} onChange={event => { set('title', event.target.value); if (!slugTouched) set('slug', slugifyBlogTitle(event.target.value)); }} /></label>
            <label className="block text-sm font-semibold">URL slug<input className={`${inputClass} mt-1 font-mono text-sm`} value={form.slug} onChange={event => { setSlugTouched(true); set('slug', slugifyBlogTitle(event.target.value)); }} /></label>
            <label className="block text-sm font-semibold">Summary<textarea className={`${inputClass} mt-1 resize-y`} rows={3} value={form.excerpt} maxLength={320} onChange={event => set('excerpt', event.target.value)} /><span className="block text-xs text-neutral-mid text-right">{form.excerpt.length}/320</span></label>
            <label className="block text-sm font-semibold">Article Markdown<textarea className={`${inputClass} mt-1 min-h-[520px] font-mono text-sm resize-y`} value={form.contentMarkdown} onChange={event => set('contentMarkdown', event.target.value)} placeholder={'## Direct answer\n\nWrite the answer first.\n\n## Next section'} /></label>
          </Card>

          <div className="space-y-5">
            <Card className="space-y-4">
              <label className="block text-sm font-semibold">Status<select className={`${inputClass} mt-1`} value={form.status} onChange={event => set('status', event.target.value as BlogPostStatus)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
              <label className="block text-sm font-semibold">Publish date<input type="datetime-local" className={`${inputClass} mt-1`} value={form.publishedAt} onChange={event => set('publishedAt', event.target.value)} /></label>
              <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.featured} onChange={event => set('featured', event.target.checked)} /> Feature this post</label>
              <label className="block text-sm font-semibold">Category<input className={`${inputClass} mt-1`} value={form.category} onChange={event => set('category', event.target.value)} /></label>
              <label className="block text-sm font-semibold">Cadres<input className={`${inputClass} mt-1`} value={form.cadres} onChange={event => set('cadres', event.target.value)} /><span className="text-xs text-neutral-mid">Comma-separated</span></label>
            </Card>
            <Card className="space-y-4">
              <h2 className="font-heading font-bold">Image</h2>
              <label className="block text-sm font-semibold">Image URL<input className={`${inputClass} mt-1`} value={form.heroImageUrl} onChange={event => set('heroImageUrl', event.target.value)} /></label>
              <label className="block text-sm font-semibold">Alt text<input className={`${inputClass} mt-1`} value={form.heroImageAlt} onChange={event => set('heroImageAlt', event.target.value)} /></label>
            </Card>
            <Card className="space-y-4">
              <h2 className="font-heading font-bold">Trust and SEO</h2>
              <label className="block text-sm font-semibold">Author<input className={`${inputClass} mt-1`} value={form.authorName} onChange={event => set('authorName', event.target.value)} /></label>
              <label className="block text-sm font-semibold">Reviewer<input className={`${inputClass} mt-1`} value={form.reviewerName} onChange={event => set('reviewerName', event.target.value)} /></label>
              <label className="block text-sm font-semibold">Primary keyword<input className={`${inputClass} mt-1`} value={form.primaryKeyword} onChange={event => set('primaryKeyword', event.target.value)} /></label>
              <label className="block text-sm font-semibold">SEO title<input className={`${inputClass} mt-1`} maxLength={70} value={form.seoTitle} onChange={event => set('seoTitle', event.target.value)} /></label>
              <label className="block text-sm font-semibold">SEO description<textarea className={`${inputClass} mt-1`} rows={3} maxLength={170} value={form.seoDescription} onChange={event => set('seoDescription', event.target.value)} /></label>
            </Card>
            <Card className="space-y-4">
              <div className="flex items-center justify-between"><h2 className="font-heading font-bold">Sources</h2><button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => set('sources', [...form.sources, { label: '', url: '' }])}>+ Add source</button></div>
              {form.sources.length === 0 && <p className="text-xs text-neutral-mid">Add primary sources for claims made in the article.</p>}
              {form.sources.map((source, index) => <div key={index} className="space-y-2 border-t border-[var(--color-border)] pt-3"><input aria-label={`Source ${index + 1} label`} className={inputClass} placeholder="Source title" value={source.label} onChange={event => set('sources', form.sources.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} /><input aria-label={`Source ${index + 1} URL`} className={inputClass} placeholder="https://..." value={source.url} onChange={event => set('sources', form.sources.map((item, itemIndex) => itemIndex === index ? { ...item, url: event.target.value } : item))} /><button type="button" className="text-xs text-error hover:underline" onClick={() => set('sources', form.sources.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></div>)}
            </Card>
            <Card className="space-y-4">
              <div className="flex items-center justify-between"><h2 className="font-heading font-bold">FAQs</h2><button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => set('faqs', [...form.faqs, { question: '', answer: '' }])}>+ Add FAQ</button></div>
              {form.faqs.length === 0 && <p className="text-xs text-neutral-mid">Only add questions answered visibly on the article.</p>}
              {form.faqs.map((faq, index) => <div key={index} className="space-y-2 border-t border-[var(--color-border)] pt-3"><input aria-label={`FAQ ${index + 1} question`} className={inputClass} placeholder="Question" value={faq.question} onChange={event => set('faqs', form.faqs.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item))} /><textarea aria-label={`FAQ ${index + 1} answer`} className={inputClass} rows={3} placeholder="Answer" value={faq.answer} onChange={event => set('faqs', form.faqs.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item))} /><button type="button" className="text-xs text-error hover:underline" onClick={() => set('faqs', form.faqs.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></div>)}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
