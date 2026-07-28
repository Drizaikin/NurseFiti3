/**
 * GET  /api/admin/hd-materials  — list all materials with tutor info + download counts
 * PATCH /api/admin/hd-materials  — update a material's status (approve/reject/hidden)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

async function isAdmin(req: NextRequest) {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() as any;
  if (profile?.role !== 'admin') return null;
  return { user, admin };
}

export async function GET(req: NextRequest) {
  const ctx = await isAdmin(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { admin } = ctx;

  const { data: materials, error } = await admin
    .from('hd_materials')
    .select(`
      id, title, description, specialty, file_name, file_size_bytes,
      file_type, status, download_count, created_at,
      tutor:tutor_id ( id, full_name, email )
    `)
    .order('created_at', { ascending: false }) as any;

  if (error) {
    console.error('[admin/hd-materials GET]', error);
    return NextResponse.json({ error: 'Failed to fetch materials.' }, { status: 500 });
  }

  return NextResponse.json({ materials });
}

export async function PATCH(req: NextRequest) {
  const ctx = await isAdmin(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { admin } = ctx;

  let body: { material_id: string; status: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { material_id, status } = body;
  if (!material_id || !['pending', 'approved', 'rejected', 'hidden'].includes(status)) {
    return NextResponse.json(
      { error: 'material_id and valid status (pending/approved/rejected/hidden) are required.' },
      { status: 400 }
    );
  }

  const { error } = await (admin as any)
    .from('hd_materials')
    .update({ status })
    .eq('id', material_id);

  if (error) {
    console.error('[admin/hd-materials PATCH]', error);
    return NextResponse.json({ error: 'Failed to update material status.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
