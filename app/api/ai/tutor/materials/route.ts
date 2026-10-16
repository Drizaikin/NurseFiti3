import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { extractTextFromFile, extractTextFromBuffer, chunkText, sanitizeTitle } from '@/lib/ai/tutorIngest';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_SIZE_BYTES = 50 * 1024 * 1024;

async function getAuth() {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null, error: 'Unauthorized' };
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() as any;
  return { user, role: profile?.role ?? 'student', error: null };
}

function toScope(requested: unknown, role: string): 'global' | 'personal' {
  if (role === 'admin' && requested === 'global') return 'global';
  return 'personal';
}

// List accessible materials
export async function GET() {
  const { user, role, error } = await getAuth();
  if (error || !user) return NextResponse.json({ error }, { status: 401 });

  const admin = createAdminClient();
  let query = (admin as any).from('ai_tutor_materials').select('*').order('created_at', { ascending: false });

  if (role !== 'admin') {
    // Global materials + the signed-in user's personal materials.
    query = query.or(`scope.eq.global,uploaded_by.eq.${user.id}`);
  }

  const { data, error: dbError } = await query;
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  let materials = data ?? [];
  if (role !== 'admin') {
    // Non-admins can use global materials only when approved.
    materials = materials.filter((m: any) => (m.scope === 'personal' && m.uploaded_by === user.id) || (m.scope === 'global' && m.status === 'approved'));
  }

  return NextResponse.json({ materials });
}

// Upload + ingest (students and admins, with signed direct upload to bypass Vercel 4.5MB 413 limits)
export async function POST(req: NextRequest) {
  const { user, role, error } = await getAuth();
  if (error || !user) return NextResponse.json({ error }, { status: 401 });

  const contentType = req.headers.get('content-type') || '';
  const admin = createAdminClient();

  // Branch 1: JSON payload (get-upload-url OR ingest pre-uploaded storage file)
  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    const action = body?.action;

    // 1A: Generate signed upload URL
    if (action === 'get-upload-url') {
      const fileName = String(body?.fileName ?? '').trim();
      const fileSize = Number(body?.fileSize ?? 0);
      const fileType = String(body?.fileType ?? 'application/octet-stream');

      if (!fileName) {
        return NextResponse.json({ error: 'fileName is required.' }, { status: 400 });
      }
      if (fileSize > MAX_SIZE_BYTES) {
        return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 });
      }

      const fileId = crypto.randomUUID();
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `${user.id}/${fileId}/${safeName}`;

      const { data: signData, error: signError } = await admin.storage
        .from('ai-tutor-materials')
        .createSignedUploadUrl(filePath);

      if (signError || !signData) {
        console.error('[ai-tutor/upload-url] error', signError);
        return NextResponse.json({ error: 'Failed to create signed upload URL: ' + (signError?.message || 'Unknown error') }, { status: 500 });
      }

      return NextResponse.json({
        signedUrl: signData.signedUrl,
        token: signData.token,
        path: signData.path,
        filePath,
      });
    }

    // 1B: Ingest file that was already uploaded to Supabase Storage
    if (action === 'ingest' || body?.filePath) {
      const filePath = String(body?.filePath ?? '').trim();
      const fileName = String(body?.fileName ?? '').trim() || 'document.pdf';
      const fileSize = Number(body?.fileSize ?? 0);
      const mimeType = String(body?.fileType || body?.mimeType || 'application/octet-stream');
      const titleInput = body?.title;
      const descriptionInput = body?.description;
      const scope = toScope(body?.scope, role ?? 'student');

      if (!filePath) {
        return NextResponse.json({ error: 'filePath is required.' }, { status: 400 });
      }

      // Download file from storage using admin client
      const { data: fileBlob, error: downloadError } = await admin.storage
        .from('ai-tutor-materials')
        .download(filePath);

      if (downloadError || !fileBlob) {
        console.error('[ai-tutor/ingest] download error', downloadError);
        return NextResponse.json({ error: 'Uploaded file not found in storage. Please try uploading again.' }, { status: 404 });
      }

      const title = sanitizeTitle(fileName, typeof titleInput === 'string' ? titleInput : null);

      const { data: material, error: insertError } = await (admin as any)
        .from('ai_tutor_materials')
        .insert({
          title,
          description: typeof descriptionInput === 'string' ? descriptionInput.trim() || null : null,
          file_name: fileName,
          file_path: filePath,
          mime_type: mimeType,
          file_size_bytes: fileSize || (fileBlob as any).size || 0,
          status: 'processing',
          scope,
          uploaded_by: user.id,
        })
        .select('id')
        .single();

      if (insertError || !material) {
        console.error('[ai-tutor/ingest] insert error', insertError);
        return NextResponse.json({ error: 'Failed to create material record.' }, { status: 500 });
      }

      try {
        const buffer = Buffer.from(await fileBlob.arrayBuffer());
        const text = await extractTextFromBuffer(buffer, fileName);
        const chunks = chunkText(text);

        if (chunks.length === 0) {
          throw new Error('No readable text could be extracted from this file. If it is a scanned image-only PDF, please upload a version with OCR text, DOCX, or TXT.');
        }

        const rows = chunks.map((content, index) => ({
          material_id: material.id,
          chunk_index: index,
          content,
        }));

        const batchSize = 100;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          const { error: chunkError } = await (admin as any)
            .from('ai_tutor_chunks')
            .insert(batch);
          if (chunkError) {
            await (admin as any).from('ai_tutor_chunks').delete().eq('material_id', material.id);
            throw new Error(chunkError.message);
          }
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
          scope,
          chunk_count: chunks.length,
          extracted_char_count: text.length,
        });
      } catch (err: any) {
        const message = err instanceof Error ? err.message : 'Ingestion failed';
        console.error('[ai-tutor/ingest] error', message);
        await (admin as any)
          .from('ai_tutor_materials')
          .update({ status: 'failed', error_message: message })
          .eq('id', material.id);
        return NextResponse.json({ error: message, material_id: material.id }, { status: 500 });
      }
    }
  }

  // Branch 2: Fallback for direct multipart/form-data (< 4.5MB files)
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const titleInput = formData.get('title');
  const descriptionInput = formData.get('description');
  const scope = toScope(formData.get('scope'), role);

  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 });
  }

  const fileId = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${user.id}/${fileId}/${safeName}`;

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
      scope,
      uploaded_by: user.id,
    })
    .select('id')
    .single();

  if (insertError || !material) {
    console.error('[ai-tutor/upload] insert error', insertError);
    await admin.storage.from('ai-tutor-materials').remove([filePath]);
    return NextResponse.json({ error: 'Failed to create material record.' }, { status: 500 });
  }

  try {
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

    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error: chunkError } = await (admin as any)
        .from('ai_tutor_chunks')
        .insert(batch);
      if (chunkError) {
        await (admin as any).from('ai_tutor_chunks').delete().eq('material_id', material.id);
        throw new Error(chunkError.message);
      }
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
      scope,
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

// Delete own materials; admins can delete any
export async function DELETE(req: NextRequest) {
  const { user, role, error } = await getAuth();
  if (error || !user) return NextResponse.json({ error }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const admin = createAdminClient();
  const { data: material } = await (admin as any)
    .from('ai_tutor_materials')
    .select('file_path, uploaded_by, scope')
    .eq('id', id)
    .single();

  if (!material) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (role !== 'admin' && material.uploaded_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

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
