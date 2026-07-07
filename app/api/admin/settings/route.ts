/**
 * POST /api/admin/settings
 * Update global platform settings.
 */
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { clearPlatformSettingsCache } from '@/lib/platformSettings';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const admin = createAdminClient();
    const { data: profile } = await (admin as any).from('profiles').select('role').eq('id', user.id).single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admins only' }, { status: 403 });
    }

    const body = await req.json();

    const { error } = await (admin as any)
      .from('platform_settings')
      .update(body)
      .eq('id', 1);

    if (error) {
      console.error('[admin/settings] Update error:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    clearPlatformSettingsCache();
    revalidatePath('/');
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[admin/settings]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
