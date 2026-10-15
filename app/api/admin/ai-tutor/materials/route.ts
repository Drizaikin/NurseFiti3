import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { extractTextFromFile, chunkText, sanitizeTitle } from '@/lib/ai/tutorIngest';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_SIZE_BYTES = 50 * 1024 * 1024;

async function requireAdmin() {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, error: 'Unauthorized' };
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() as any;
  if (profile?.role !== 'admin') return { user: null, error: 'Forbidden' };
  return { user, error: null };
}

// List materials
export async function GET() {
  const { error } = await requireAdmin();
  if (error) {
    return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
  }
  const admin = createAdminClient();
  const { data, error: dbError } = await (admin as any)
    .from('ai_tutor_materials')
    .select('*')
    .order('created_at', { ascending: false });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ materials: data ?? [] });
}

// Upload + ingest
export async function POST(req: NextRequest) {
  const { user, error } = await requireAdmin();
  if (error || !user) {
    return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const titleInput = formData.get('title');
  const descriptionInput = formData.get('description');

  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const fileId = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${user.id}/${fileId}/${safeName}`;

  // Upload to storage
  const fileBytes = await file.arrayBuffer();
  const buffer = Buffer.from(fileBytes);
  const { error: storageError } = await admin.storage
    .from('ai-tutor-materials')
    .upload(filePath, fileBytes, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

  if (storageError) {
    console.error('[ai-tutor/upload] storage error', storageError);
    return NextResponse.json({ error: 'Failed to upload file to storage.' }, { status: 500 });
  }

  const title = sanitizeTitle(file.name, typeof titleInput === 'string' ? titleInput : null);

  // Create material record (processing)
  const { data: material, error: insertError } = await (admin as any)
    .from('ai_tutor_materials')
    .insert({
      title,
      description: typeof descriptionInput === 'string' ? descriptionInput.trim() || null : null,
      file_name: file.name,
      file_path: filePath,
      mime_type: file.type || 'application/octet-stream',
      file_size_bytes: file.size,
      status: 'processing',
      scope: 'global',
      uploaded_by: user.id,
    })
    .select('id')
    .single();

  if (insertError || !material) {
    console.error('[ai-tutor/upload] insert error', insertError);
    await admin.storage.from('ai-tutor-materials').remove([filePath]);
    return NextResponse.json({ error: 'Failed to create material record.' }, { status: 500 });
  }

  // Extract + chunk
  try {
    // Reconstruct a File-like object for extraction
    const extractableFile = new File([fileBytes], file.name, { type: file.type || 'application/octet-stream' });
    const text = await extractTextFromFile(extractableFile);
    const chunks = chunkText(text);

    if (chunks.length === 0) {
      throw new Error('No readable text could be extracted from this file.');
    }

    const rows = chunks.map((content, index) => ({
      material_id: material.id,
      chunk_index: index,
      content,
    }));

    // Insert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error: chunkError } = await (admin as any)
        .from('ai_tutor_chunks')
        .insert(batch);
      if (chunkError) throw new Error(chunkError.message);
    }

    await (admin as any)
      .from('ai_tutor_materials')
      .update({
        status: 'approved',
        chunk_count: chunks.length,
        extracted_char_count: text.length,
        error_message: null,
      })
      .eq('id', material.id);

    return NextResponse.json({
      material_id: material.id,
      title,
      chunk_count: chunks.length,
      extracted_char_count: text.length,
    });
  } catch (err: any) {
    const message = err instanceof Error ? err.message : 'Ingestion failed';
    console.error('[ai-tutor/upload] ingestion error', message);
    await (admin as any)
      .from('ai_tutor_materials')
      .update({ status: 'failed', error_message: message })
      .eq('id', material.id);
    return NextResponse.json({ error: message, material_id: material.id }, { status: 500 });
  }
}

// Delete
export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) {
    return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const admin = createAdminClient();
  const { data: material } = await (admin as any)
    .from('ai_tutor_materials')
    .select('file_path')
    .eq('id', id)
    .single();

  const { error: delError } = await (admin as any)
    .from('ai_tutor_materials')
    .delete()
    .eq('id', id);

  if (delError) return NextResponse.json({ error: delError.message }, { status: 500 });

  if (material?.file_path) {
    await admin.storage.from('ai-tutor-materials').remove([material.file_path]);
  }
  return NextResponse.json({ ok: true });
}
