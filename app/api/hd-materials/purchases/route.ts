/**
 * GET /api/hd-materials/purchases
 *
 * Returns the list of material IDs the authenticated student has purchased.
 * Uses the admin client to bypass RLS completely — this is the authoritative
 * source of truth for purchase status shown on the student UI.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createAdminClient();

    // Verify Higher Diploma cadre
    const { data: sp } = await admin
      .from('student_profiles')
      .select('cadre')
      .eq('id', user.id)
      .maybeSingle() as any;

    if (sp?.cadre !== 'Higher Diploma') {
      return NextResponse.json({ purchased_ids: [] });
    }

    // Fetch all purchase records for this student via admin client (bypasses RLS)
    const { data: purchases, error: purchaseError } = await admin
      .from('hd_material_purchases')
      .select('material_id')
      .eq('student_id', user.id) as any;

    if (purchaseError) {
      console.error('[hd-materials/purchases] DB error:', purchaseError);
      return NextResponse.json({ error: 'Failed to load purchases.' }, { status: 500 });
    }

    const purchased_ids: string[] = (purchases ?? []).map((p: any) => p.material_id);

    return NextResponse.json({ purchased_ids });
  } catch (err) {
    console.error('[hd-materials/purchases]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load purchases' },
      { status: 500 }
    );
  }
}
