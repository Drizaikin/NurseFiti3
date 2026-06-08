/**
 * POST /api/admin/manage-account
 *
 * Admin-only endpoint to lock or permanently delete a user account.
 *
 * Body:
 *   userId  — UUID of the user to act on
 *   action  — 'lock' | 'unlock' | 'delete'
 *
 * Lock/unlock: sets a `is_locked` flag on the profiles row and bans/unbans
 *              the user in Supabase Auth (ban_duration = '876600h' ≈ 100 years for lock).
 * Delete:      removes the auth user (cascades to profile rows via FK).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(['lock', 'unlock', 'delete']),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const admin = createAdminClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Role check — must be admin
    const { data: callerProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!callerProfile || (callerProfile as { role: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
    }

    const { userId, action } = parsed.data;

    // Prevent admin from acting on their own account
    if (userId === user.id) {
      return NextResponse.json({ error: 'You cannot modify your own account' }, { status: 400 });
    }

    if (action === 'delete') {
      // Deleting from auth cascades to profiles/student_profiles/tutor_profiles via FK
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) {
        console.error('[manage-account] deleteUser error:', error);
        return NextResponse.json({ error: `Failed to delete account: ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, action: 'deleted' });
    }

    if (action === 'lock') {
      // Ban in Supabase Auth (effectively blocks all future logins/token refreshes)
      const { error: banError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: '876600h', // ~100 years
      });
      if (banError) {
        console.error('[manage-account] ban error:', banError);
        return NextResponse.json({ error: `Failed to lock account: ${banError.message}` }, { status: 500 });
      }
      // Also flag in profiles so the UI can reflect the state
      await (admin as any).from('profiles').update({ is_locked: true }).eq('id', userId);
      return NextResponse.json({ success: true, action: 'locked' });
    }

    if (action === 'unlock') {
      const { error: unbanError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: 'none',
      });
      if (unbanError) {
        console.error('[manage-account] unban error:', unbanError);
        return NextResponse.json({ error: `Failed to unlock account: ${unbanError.message}` }, { status: 500 });
      }
      await (admin as any).from('profiles').update({ is_locked: false }).eq('id', userId);
      return NextResponse.json({ success: true, action: 'unlocked' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('[manage-account]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
