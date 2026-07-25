import { NextRequest, NextResponse } from 'next/server';
import { verifyAutomationBearer } from '@/lib/blog-orchestrator/auth';
import { ingestAutomationDraft } from '@/lib/blog-orchestrator/ingest';
import { automationDraftSchema } from '@/lib/blog-orchestrator/schemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!verifyAutomationBearer(req.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const idempotencyKey = req.headers.get('idempotency-key')?.trim();
  if (!idempotencyKey || idempotencyKey.length < 8 || idempotencyKey.length > 200) {
    return NextResponse.json({ error: 'A valid Idempotency-Key header is required.' }, { status: 400 });
  }
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 100_000) return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > 100_000) return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }
  const parsed = automationDraftSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid draft', details: parsed.error.flatten() }, { status: 400 });

  try {
    const result = await ingestAutomationDraft(parsed.data, idempotencyKey);
    if (result.kind === 'conflict') return NextResponse.json({ error: result.message }, { status: 409 });
    return NextResponse.json(result, { status: result.kind === 'created' ? 201 : 200 });
  } catch (error) {
    console.error('[automation/blog-drafts]', error);
    return NextResponse.json({ error: 'Could not ingest the blog draft.' }, { status: 500 });
  }
}
