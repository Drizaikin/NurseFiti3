import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyAutomationBearer } from '@/lib/blog-orchestrator/auth';
import { detectImageType, uploadBlogImage, MAX_IMAGE_BYTES } from '@/lib/blog/storage';

export const dynamic = 'force-dynamic';
/** base64 inflates by ~4/3, plus JSON envelope. */
const MAX_BODY_BYTES = Math.ceil(MAX_IMAGE_BYTES * 1.4);

const uploadSchema = z.object({
  slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens'),
  kind: z.enum(['hero', 'infographic']),
  filename: z.string().trim().min(5).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.(png|jpg|jpeg|webp)$/, 'Use a lowercase hyphenated filename ending in .png, .jpg or .webp'),
  contentBase64: z.string().min(100),
});

export async function POST(req: NextRequest) {
  if (!verifyAutomationBearer(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const parsed = uploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid upload', details: parsed.error.flatten() }, { status: 400 });
  }

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(Buffer.from(parsed.data.contentBase64, 'base64'));
  } catch {
    return NextResponse.json({ error: 'contentBase64 is not valid base64.' }, { status: 400 });
  }
  if (bytes.length === 0) return NextResponse.json({ error: 'The decoded image is empty.' }, { status: 400 });
  if (bytes.length > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: `The image is ${Math.round(bytes.length / 1024)} KB; the limit is ${MAX_IMAGE_BYTES / 1024 / 1024} MB.` }, { status: 413 });
  }

  const detected = detectImageType(bytes);
  if (!detected) return NextResponse.json({ error: 'The uploaded bytes are not a PNG, JPEG, or WebP image.' }, { status: 400 });
  if (!parsed.data.filename.endsWith(detected.extension) && !(detected.extension === 'jpg' && parsed.data.filename.endsWith('jpeg'))) {
    return NextResponse.json({ error: `The bytes are ${detected.contentType} but the filename claims something else.` }, { status: 400 });
  }

  try {
    const url = await uploadBlogImage({
      slug: parsed.data.slug,
      filename: parsed.data.filename,
      bytes,
      contentType: detected.contentType,
    });
    return NextResponse.json({ url, kind: parsed.data.kind, bytes: bytes.length }, { status: 201 });
  } catch (error) {
    console.error('[automation/blog-images]', error);
    return NextResponse.json({ error: 'Could not store the image.' }, { status: 500 });
  }
}
