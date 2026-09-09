import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const questionSchema = z.object({
  stem: z.string().trim().min(10).max(3000),
  option_a: z.string().trim().min(1).max(2000),
  option_b: z.string().trim().min(1).max(2000),
  option_c: z.string().trim().min(1).max(2000),
  option_d: z.string().trim().min(1).max(2000),
  correct_option: z.enum(['A', 'B', 'C', 'D']),
  rationale: z.string().trim().min(10).max(6000),
});

async function requireAdmin() {
  const supabase = createRouteClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile && (profile as { role: string }).role === 'admin' ? user : null;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const admin = createAdminClient();
  const { data: question, error } = await admin
    .from('questions')
    .select('id, cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, paper, exam_year, status')
    .eq('id', params.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'Failed to load question' }, { status: 500 });
  if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  return NextResponse.json({ question });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const parsed = questionSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid question content' }, { status: 400 });

  const admin = createAdminClient();
  const { data: question, error } = await admin
    .from('questions')
    .update(parsed.data)
    .eq('id', params.id)
    .select('id, stem, option_a, option_b, option_c, option_d, correct_option, rationale')
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'Failed to save question changes' }, { status: 500 });
  if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 });

  return NextResponse.json({ question });
}
