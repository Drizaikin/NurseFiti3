import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { mapRulesRow, rulesUpdateSchema, rulesUpdateToRow, RULES_SELECTION } from '@/lib/blog-automation/rules';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const { data, error } = await (auth.admin as any)
    .from('blog_automation_rules')
    .select(`${RULES_SELECTION}, change_note, created_at`)
    .order('version', { ascending: false })
    .limit(25);
  if (error) {
    return NextResponse.json({ error: 'Could not load rules. Apply the blog automation migration first.' }, { status: 500 });
  }
  const rows = (data ?? []) as any[];
  if (rows.length === 0) return NextResponse.json({ error: 'No rules version exists yet.' }, { status: 500 });

  return NextResponse.json({
    rules: mapRulesRow(rows[0]),
    history: rows.map(row => ({ version: row.version, changeNote: row.change_note, createdAt: row.created_at })),
  });
}

/** Rules are immutable: an edit inserts a new version so past runs stay explainable. */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const parsed = rulesUpdateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid rules', details: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await (auth.admin as any)
    .from('blog_automation_rules')
    .insert(rulesUpdateToRow(parsed.data, auth.user.id))
    .select(RULES_SELECTION)
    .single();
  if (error) {
    console.error('[automation/rules] insert', error);
    return NextResponse.json({ error: error.message || 'Could not save the rules.' }, { status: 500 });
  }
  return NextResponse.json({ rules: mapRulesRow(data) }, { status: 201 });
}
