/**
 * GET /api/admin/signed-url?path=tutor-documents/...&bucket=documents
 *
 * Admin-only. Generates a short-lived signed URL for a private storage file
 * so the admin can preview tutor verification documents in the browser.
 *
 * Valid for 1 hour.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single();
    if (!profile || (profile as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const path   = req.nextUrl.searchParams.get('path');
    const bucket = req.nextUrl.searchParams.get('bucket') ?? 'documents';

    if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 60); // 1 hour

    if (error || !data?.signedUrl) {
      return NextResponse.json({ error: error?.message ?? 'Could not generate URL' }, { status: 500 });
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch (err) {
    console.error('[admin/signed-url]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
