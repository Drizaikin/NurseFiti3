import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { POSTS as LEGACY_POSTS } from '@/lib/blogData';
import type { AutomationDraft } from './schemas';

export function hashDraftRequest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value), 'utf8').digest('hex');
}

export function automationDraftToBlogRow(draft: AutomationDraft) {
  return {
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    content_markdown: draft.contentMarkdown,
    category: draft.category,
    cadres: draft.cadres,
    status: 'draft' as const,
    featured: false,
    hero_image_url: draft.heroImageUrl,
    hero_image_alt: draft.heroImageAlt,
    author_name: draft.authorName,
    reviewer_name: draft.reviewerName || null,
    seo_title: draft.seoTitle || null,
    seo_description: draft.seoDescription || null,
    primary_keyword: draft.primaryKeyword || null,
    faqs: draft.faqs,
    sources: draft.sources,
    published_at: null,
    created_by: null,
    updated_by: null,
  };
}

export async function ingestAutomationDraft(draft: AutomationDraft, idempotencyKey: string) {
  const admin = createAdminClient() as any;
  const requestHash = hashDraftRequest(draft);
  const { data: ingestion, error: claimError } = await admin.from('blog_draft_ingestions').insert({
    idempotency_key: idempotencyKey,
    request_hash: requestHash,
    keyword_id: draft.keywordId,
    generation_run_id: draft.generationRunId,
    prompt_version: draft.promptVersion,
    model: draft.model,
    draft_doc_url: draft.draftDocUrl ?? null,
    audit_score: draft.audit.score,
    blocker_count: draft.audit.blockerCount,
    warning_count: draft.audit.warningCount,
    audit_report: draft.audit,
    source_snapshot: draft.sourceSnapshot,
  }).select('*').single();

  if (claimError?.code === '23505') {
    const { data: existing } = await admin.from('blog_draft_ingestions').select('*').eq('idempotency_key', idempotencyKey).single();
    if (!existing || existing.request_hash !== requestHash) return { kind: 'conflict' as const, message: 'Idempotency key was already used for another payload.' };
    if (existing.state === 'completed') return { kind: 'existing' as const, postId: existing.blog_post_id, ingestionId: existing.id };
    return { kind: 'conflict' as const, message: 'This ingestion is already processing or previously failed.' };
  }
  if (claimError || !ingestion) throw new Error(`Could not claim draft ingestion: ${claimError?.message ?? 'unknown error'}`);

  if (LEGACY_POSTS.some(post => post.slug === draft.slug)) {
    await admin.from('blog_draft_ingestions').update({ state: 'failed', error_message: 'Legacy slug collision' }).eq('id', ingestion.id);
    return { kind: 'conflict' as const, message: 'That URL belongs to an existing legacy article.' };
  }

  const { data: post, error: postError } = await admin.from('blog_posts').insert(automationDraftToBlogRow(draft)).select('id, slug').single();

  if (postError) {
    await admin.from('blog_draft_ingestions').update({ state: 'failed', error_message: postError.message }).eq('id', ingestion.id);
    if (postError.code === '23505') return { kind: 'conflict' as const, message: 'That URL slug is already in use.' };
    throw new Error(`Could not create CMS draft: ${postError.message}`);
  }

  await admin.from('blog_draft_ingestions').update({ state: 'completed', blog_post_id: post.id }).eq('id', ingestion.id);
  await closeMatchingJob(admin, draft, post.id);
  return { kind: 'created' as const, postId: post.id, slug: post.slug, ingestionId: ingestion.id };
}

/**
 * An externally executed run has no worker to close its job row, so the arriving
 * draft does it. A local worker will have closed the row already, which is why
 * this only touches jobs still queued or running.
 */
async function closeMatchingJob(admin: any, draft: AutomationDraft, postId: string) {
  try {
    const { data: job } = await admin
      .from('blog_automation_jobs')
      .select('id')
      .eq('keyword_id', draft.keywordId)
      .in('state', ['queued', 'running'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!job) return;

    await admin.from('blog_automation_jobs').update({
      state: 'succeeded',
      generation_run_id: draft.generationRunId,
      audit_score: draft.audit.score,
      blocker_count: draft.audit.blockerCount,
      warning_count: draft.audit.warningCount,
      audit_report: draft.audit,
      draft_doc_url: draft.draftDocUrl ?? null,
      blog_post_id: postId,
      locked_at: null,
      finished_at: new Date().toISOString(),
    }).eq('id', job.id);

    await admin.from('blog_keywords')
      .update({ status: 'draft_created', notes: 'Draft ready for review.' })
      .eq('keyword_id', draft.keywordId);
  } catch (error) {
    // Reconciliation is bookkeeping; never fail an ingested draft over it.
    console.warn('[ingest] could not close the matching automation job:', error instanceof Error ? error.message : error);
  }
}
