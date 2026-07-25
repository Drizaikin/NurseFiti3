import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const SELECTION = 'keyword_id, keyword, title, cluster_name, cluster_role, content_audience, search_volume, kw_difficulty, combined_score, search_intent, reviewer_name, status, notes, updated_at';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const status = req.nextUrl.searchParams.get('status');
  let query = (auth.admin as any).from('blog_keywords').select(SELECTION);
  if (status && status !== 'all') query = query.eq('status', status);

  const { data, error } = await query
    .order('status', { ascending: true })
    .order('combined_score', { ascending: false, nullsFirst: false })
    .limit(500);
  if (error) {
    return NextResponse.json({ error: 'Could not load keywords. Apply the blog automation migration first.' }, { status: 500 });
  }

  const { data: live } = await (auth.admin as any)
    .from('blog_automation_jobs')
    .select('keyword_id, id, state')
    .in('state', ['queued', 'running']);

  return NextResponse.json({
    keywords: data ?? [],
    liveJobs: Object.fromEntries(((live ?? []) as Array<{ keyword_id: string; id: string; state: string }>)
      .map(job => [job.keyword_id, { id: job.id, state: job.state }])),
  });
}

const patchSchema = z.object({
  keywordId: z.string().trim().min(3).max(100),
  status: z.enum(['queued', 'draft_created', 'published', 'skipped']).optional(),
  reviewerName: z.string().trim().max(100).nullable().optional(),
  notes: z.string().trim().max(500).nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid update' }, { status: 400 });
  }
  const { keywordId, ...rest } = parsed.data;
  const patch: Record<string, unknown> = {};
  if (rest.status !== undefined) patch.status = rest.status;
  if (rest.reviewerName !== undefined) patch.reviewer_name = rest.reviewerName || null;
  if (rest.notes !== undefined) patch.notes = rest.notes || null;
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: 'Nothing to update.' }, { status: 400 });

  const { data, error } = await (auth.admin as any)
    .from('blog_keywords')
    .update(patch)
    .eq('keyword_id', keywordId)
    .select(SELECTION)
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'Could not update the keyword.' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Keyword not found.' }, { status: 404 });
  return NextResponse.json({ keyword: data });
}
