import { createAdminClient } from '@/lib/supabase/admin';

export const BLOG_IMAGE_BUCKET = 'blog-images';
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const SIGNATURES: Array<{ contentType: string; extension: string; test: (bytes: Uint8Array) => boolean }> = [
  { contentType: 'image/png', extension: 'png', test: b => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { contentType: 'image/jpeg', extension: 'jpg', test: b => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { contentType: 'image/webp', extension: 'webp', test: b => b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 },
];

/** Trusts the bytes, not the filename, so a mislabelled upload cannot smuggle another type in. */
export function detectImageType(bytes: Uint8Array) {
  return SIGNATURES.find(signature => bytes.length > 12 && signature.test(bytes)) ?? null;
}

async function ensureBucket() {
  const admin = createAdminClient();
  const { data: buckets } = await admin.storage.listBuckets();
  if (!(buckets ?? []).some(bucket => bucket.name === BLOG_IMAGE_BUCKET)) {
    const { error } = await admin.storage.createBucket(BLOG_IMAGE_BUCKET, {
      public: true,
      fileSizeLimit: MAX_IMAGE_BYTES,
      allowedMimeTypes: SIGNATURES.map(signature => signature.contentType),
    });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(`Could not create the ${BLOG_IMAGE_BUCKET} bucket: ${error.message}`);
    }
  }
  return admin;
}

export async function uploadBlogImage(input: { slug: string; filename: string; bytes: Uint8Array; contentType: string }) {
  const admin = await ensureBucket();
  const path = `${input.slug}/${input.filename}`;
  const { error } = await admin.storage
    .from(BLOG_IMAGE_BUCKET)
    .upload(path, input.bytes, { contentType: input.contentType, upsert: true });
  if (error) throw new Error(`Image upload failed for ${path}: ${error.message}`);
  return admin.storage.from(BLOG_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
