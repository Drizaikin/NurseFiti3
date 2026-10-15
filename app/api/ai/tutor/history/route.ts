import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface SessionPayload {
  id?: string;
  title?: string;
  messages?: Array<{
    id?: string;
    role: 'user' | 'assistant';
    content: string;
    visible?: string;
    sources?: Array<{ title: string; chunkIndex: number; isStudentDoc?: boolean }>;
  }>;
}

/**
 * GET: Retrieve list of previous AI Tutor sessions for the current student.
 */
export async function GET() {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await (supabase as any)
      .from('ai_tutor_conversations')
      .select('id, title, messages, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(30);

    if (error) {
      // Table may not be migrated yet in Supabase schema cache; return empty list gracefully
      console.warn('[ai/tutor/history] Table query note:', error.message);
      return NextResponse.json({ sessions: [], dbAvailable: false });
    }

    return NextResponse.json({ sessions: data ?? [], dbAvailable: true });
  } catch (err: any) {
    console.error('[ai/tutor/history] GET failed:', err);
    return NextResponse.json({ sessions: [], dbAvailable: false });
  }
}

/**
 * POST: Save or update a conversation session.
 */
export async function POST(req: NextRequest) {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: SessionPayload = await req.json().catch(() => ({}));
    const id = body.id || crypto.randomUUID();
    const title = (body.title || 'Study Session').trim().slice(0, 100);
    const messages = Array.isArray(body.messages) ? body.messages.slice(-50) : [];

    const now = new Date().toISOString();

    const { data, error } = await (supabase as any)
      .from('ai_tutor_conversations')
      .upsert({
        id,
        user_id: user.id,
        title,
        messages,
        updated_at: now,
      })
      .select('id, title, updated_at')
      .single();

    if (error) {
      console.warn('[ai/tutor/history] Upsert fallback:', error.message);
      return NextResponse.json({ success: true, localOnly: true, id, title, updated_at: now });
    }

    return NextResponse.json({ success: true, session: data });
  } catch (err: any) {
    console.error('[ai/tutor/history] POST failed:', err);
    return NextResponse.json({ success: true, localOnly: true });
  }
}

/**
 * DELETE: Delete a conversation session by ID.
 */
export async function DELETE(req: NextRequest) {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing session ID.' }, { status: 400 });
  }

  try {
    const { error } = await (supabase as any)
      .from('ai_tutor_conversations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.warn('[ai/tutor/history] Delete note:', error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[ai/tutor/history] DELETE failed:', err);
    return NextResponse.json({ success: true });
  }
}
