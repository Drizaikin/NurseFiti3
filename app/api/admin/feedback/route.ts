import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

async function checkAdmin(supabase: ReturnType<typeof createRouteClient>) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { authorized: false, error: 'Unauthorized', status: 401 };

  const { data: profile } = await (supabase as any)
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profile?.role !== 'admin') {
    return { authorized: false, error: 'Forbidden: Admins only', status: 403 };
  }

  return { authorized: true, user };
}

// GET /api/admin/feedback — Fetch all feedback with admin privileges
export async function GET() {
  try {
    const supabase = createRouteClient();
    const authCheck = await checkAdmin(supabase);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const admin = createAdminClient();
    const { data: feedback, error } = await (admin as any)
      .from('app_feedback')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ feedback: feedback || [] });
  } catch (err: any) {
    console.error('[admin/feedback] GET error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

// PATCH /api/admin/feedback — Pin/unpin or approve/unapprove feedback
export async function PATCH(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const authCheck = await checkAdmin(supabase);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const body = await req.json().catch(() => ({}));
    const { id, is_pinned, is_approved } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid review ID' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (typeof is_pinned === 'boolean') updates.is_pinned = is_pinned;
    if (typeof is_approved === 'boolean') updates.is_approved = is_approved;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await (admin as any)
      .from('app_feedback')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, review: data });
  } catch (err: any) {
    console.error('[admin/feedback] PATCH error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

// DELETE /api/admin/feedback — Delete spam or abusive feedback
export async function DELETE(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const authCheck = await checkAdmin(supabase);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const body = await req.json().catch(() => ({}));
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid review ID' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await (admin as any)
      .from('app_feedback')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    console.error('[admin/feedback] DELETE error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
