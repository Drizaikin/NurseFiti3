/**
 * GET /api/hd-materials/download/[id]
 *
 * Generates a short-lived signed URL for a purchased HD material.
 * Only works for authenticated Higher Diploma students who have a purchase record.
 *
 * Returns: redirect to signed URL (or 403/404 on failure)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const materialId = params.id;

  try {
    const supabase = createRouteClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createAdminClient();

    // Verify the student has a purchase record for this material
    const { data: purchase, error: purchaseError } = await admin
      .from('hd_material_purchases')
      .select('id, material_id')
      .eq('student_id', user.id)
      .eq('material_id', materialId)
      .maybeSingle() as any;

    if (purchaseError) {
      console.error('[hd-materials/download] Purchase lookup error:', purchaseError);
      return NextResponse.json({ error: 'Could not verify purchase.' }, { status: 500 });
    }

    if (!purchase) {
      return NextResponse.json(
        { error: 'You have not purchased this material. Please complete payment first.' },
        { status: 403 }
      );
    }

    // Fetch the material's storage path
    const { data: material, error: materialError } = await admin
      .from('hd_materials')
      .select('file_path, file_name, status')
      .eq('id', materialId)
      .maybeSingle() as any;

    if (materialError || !material) {
      return NextResponse.json({ error: 'Material not found.' }, { status: 404 });
    }

    if (material.status !== 'approved') {
      return NextResponse.json(
        { error: 'This material is not currently available for download.' },
        { status: 403 }
      );
    }

    // Generate a 1-hour signed URL via admin client (bypasses RLS)
    const { data: signedData, error: signedError } = await admin.storage
      .from('hd-materials')
      .createSignedUrl(material.file_path, 3600, {
        download: material.file_name, // forces browser to download with the original filename
      });

    if (signedError || !signedData?.signedUrl) {
      console.error('[hd-materials/download] Signed URL error:', signedError);
      return NextResponse.json({ error: 'Could not generate download link.' }, { status: 500 });
    }

    // Redirect to the signed URL — browser will start the download
    return NextResponse.redirect(signedData.signedUrl);
  } catch (err) {
    console.error('[hd-materials/download]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Download failed' },
      { status: 500 }
    );
  }
}
