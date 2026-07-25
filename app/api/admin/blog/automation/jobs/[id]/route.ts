import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';

export const dynamic = 'force-dynamic';

/** Cancels a run that has not been claimed yet. A running job is left to finish or time out. */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const { data, error } = await (auth.admin as any)
    .from('blog_automation_jobs')
    .update({ state: 'cancelled', finished_at: new Date().toISOString() })
    .eq('id', params.id)
    .eq('state', 'queued')
    .select('id, keyword_id')
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'Could not cancel the run.' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Only a run that has not started yet can be cancelled.' }, { status: 409 });

  await (auth.admin as any).from('blog_keywords').update({ status: 'queued' }).eq('keyword_id', data.keyword_id);
  return NextResponse.json({ success: true });
}
