/**
 * POST /api/admin/settings
 * Update the explicitly supported global platform settings.
 */
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { clearPlatformSettingsCache } from '@/lib/platformSettings';

const settingsSchema = z.object({
  allow_tutor_custom_pricing: z.boolean().optional(),
  krchn_hourly_rate: z.number().finite().min(0).max(100000).optional(),
  bscn_hourly_rate: z.number().finite().min(0).max(100000).optional(),
  plan_daily_price: z.number().finite().min(0).max(100000).optional(),
  plan_weekly_price: z.number().finite().min(0).max(100000).optional(),
  plan_standard_price: z.number().finite().min(0).max(100000).optional(),
  plan_premium_price: z.number().finite().min(0).max(100000).optional(),
  hd_material_price: z.number().finite().min(0).max(100000).optional(),
}).strict();

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const access = await requireAdmin();
    if ('response' in access) return access.response;
    const payload = settingsSchema.safeParse(await req.json());
    if (!payload.success) return NextResponse.json({ error: 'Invalid settings payload.', details: payload.error.flatten() }, { status: 400 });
    if (Object.keys(payload.data).length === 0) return NextResponse.json({ error: 'No settings supplied.' }, { status: 400 });

    const { error } = await access.admin.from('platform_settings').update(payload.data).eq('id', 1);
    if (error) {
      console.error('[admin/settings] Update error:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
    clearPlatformSettingsCache();
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/settings]', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
