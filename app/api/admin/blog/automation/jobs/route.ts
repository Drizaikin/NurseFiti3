import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { dispatchToExternalExecutor, isExternalExecutorConfigured } from '@/lib/blog-automation/dispatch';

export const dynamic = 'force-dynamic';

const SELECTION = 'id, keyword_id, rules_version, state, dry_run, attempt, steps, generation_run_id, audit_score, blocker_count, warning_count, audit_report, draft_doc_url, blog_post_id, error_message, started_at, finished_at, created_at, locked_by';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const state = req.nextUrl.searchParams.get('state');
  let query = (auth.admin as any).from('blog_automation_jobs').select(SELECTION);
  if (state && state !== 'all') query = query.eq('state', state);

  const { data, error } = await query.order('created_at', { ascending: false }).limit(100);
  if (error) {
    return NextResponse.json({ error: 'Could not load runs. Apply the blog automation migration first.' }, { status: 500 });
  }
  return NextResponse.json({ jobs: data ?? [] });
}

const enqueueSchema = z.object({
  keywordId: z.string().trim().min(3).max(100),
  dryRun: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const parsed = enqueueSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'A keywordId is required.' }, { status: 400 });

  const { data: keyword } = await (auth.admin as any)
    .from('blog_keywords')
    .select('keyword_id, keyword, title, cluster_name, content_audience, status')
    .eq('keyword_id', parsed.data.keywordId)
    .maybeSingle();
  if (!keyword) return NextResponse.json({ error: 'That keyword is not in the queue.' }, { status: 404 });

  // The active version is pinned at enqueue time, so a later rules edit cannot
  // silently change what a queued job was approved to produce.
  const { data: rules } = await (auth.admin as any)
    .from('blog_automation_rules')
    .select('version')
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!rules) return NextResponse.json({ error: 'No rules version exists yet.' }, { status: 500 });

  const { data, error } = await (auth.admin as any)
    .from('blog_automation_jobs')
    .insert({
      keyword_id: parsed.data.keywordId,
      rules_version: rules.version,
      dry_run: parsed.data.dryRun,
      requested_by: auth.user.id,
    })
    .select(SELECTION)
    .single();

  if (error?.code === '23505') {
    return NextResponse.json({ error: 'That keyword already has a run queued or in progress.' }, { status: 409 });
  }
  if (error) {
    console.error('[automation/jobs] enqueue', error);
    return NextResponse.json({ error: 'Could not queue the run.' }, { status: 500 });
  }

  // With an external executor configured, the click also fires its webhook. A failed
  // dispatch leaves the job queued so the local worker can still pick it up.
  let dispatch: { dispatched: boolean; reason?: string } = { dispatched: false, reason: 'not configured' };
  if (isExternalExecutorConfigured()) {
    dispatch = await dispatchToExternalExecutor({
      jobId: data.id,
      keywordId: keyword.keyword_id,
      keyword: keyword.keyword,
      title: keyword.title,
      cluster: keyword.cluster_name,
      audience: keyword.content_audience,
      rulesVersion: rules.version,
      dryRun: parsed.data.dryRun,
    });
    await (auth.admin as any)
      .from('blog_automation_jobs')
      .update(dispatch.dispatched
        ? {
          locked_by: 'hyperagent',
          locked_at: new Date().toISOString(),
          state: 'running',
          started_at: new Date().toISOString(),
          error_message: dispatch.reason ?? null,
        }
        : { error_message: `Webhook dispatch failed: ${dispatch.reason}. Left queued for the local worker.` })
      .eq('id', data.id);
  }

  return NextResponse.json({ job: data, dispatch }, { status: 201 });
}
