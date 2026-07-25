import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createAdminClient } from '@/lib/supabase/admin';
import { gog, gogJson } from './gog';

const KIE_BASE = 'https://api.kie.ai/api/v1';
const KIE_MODEL = 'gpt-image-2-text-to-image';
const BUCKET = 'blog-images';
/** 2K fails with "Internal Error" on this endpoint; 1K is the reliable setting. */
const RESOLUTION = '1K';

export type BlogImageKind = 'hero' | 'infographic';

export type BlogImage = {
  kind: BlogImageKind;
  filename: string;
  alt: string;
  supabaseUrl: string;
  driveFileId: string;
};

/**
 * Brand colours are described in words, not hex. Hex codes in prompts trip the
 * kie.ai content filter and return "Internal Error".
 */
export function buildHeroPrompt(input: { topic: string; scene: string; framing: string }) {
  return [
    `Professional editorial hero image for a Kenyan nursing education article about ${input.topic}.`,
    `Scene: ${input.scene}. ${input.framing}.`,
    'Setting reads as contemporary Kenya. Deep teal atmosphere with warm amber accent lighting.',
    'Cinematic photorealistic rendering. No text, no logos, no overlays. Wide 16:9 composition.',
  ].join(' ');
}

export function buildInfographicPrompt(title: string, points: string[]) {
  return [
    'Clean flat-design professional infographic. Deep teal background.',
    `Bold title at top: "${title}" in warm amber typography.`,
    `${points.length} numbered items in a clean vertical list:`,
    ...points.map((point, index) => `${index + 1}. ${point}`),
    'Each item has an amber circular number badge on the left and white text.',
    'Thin amber horizontal dividers between items. Modern premium sans-serif font.',
    'Small "NurseFiti" wordmark at bottom-right in muted amber.',
    'No decorative borders, no gradients. Flat design, high contrast, professional. 16:9 format.',
  ].join(' ');
}

/** Lowercase, hyphenated, 3-6 words describing what is literally in the image. */
export function imageFilename(slug: string, kind: BlogImageKind) {
  const stem = slug.split('-').slice(0, 5).join('-');
  return `${stem}-${kind === 'hero' ? 'hero' : 'key-takeaways'}.png`;
}

function kieHeaders() {
  const key = process.env.KIE_API_KEY;
  if (!key) throw new Error('KIE_API_KEY is required for image generation');
  return { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}

async function kieCreateTask(prompt: string) {
  const response = await fetch(`${KIE_BASE}/jobs/createTask`, {
    method: 'POST',
    headers: kieHeaders(),
    body: JSON.stringify({ model: KIE_MODEL, input: { prompt, aspect_ratio: '16:9', resolution: RESOLUTION } }),
    signal: AbortSignal.timeout(30000),
  });
  const payload = await response.json() as { code?: number; msg?: string; data?: { taskId?: string } };
  const taskId = payload.data?.taskId;
  if (!response.ok || payload.code !== 200 || !taskId) {
    throw new Error(`kie.ai task creation failed: ${payload.msg ?? response.status}`);
  }
  return taskId;
}

async function kieWaitForImage(taskId: string, label: string) {
  for (let attempt = 0; attempt < 24; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 8000));
    const response = await fetch(`${KIE_BASE}/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, {
      headers: { Authorization: kieHeaders().Authorization },
      signal: AbortSignal.timeout(30000),
    });
    const payload = await response.json() as { data?: { state?: string; failMsg?: string; resultJson?: string } };
    const state = payload.data?.state;
    if (state === 'success') {
      const urls = JSON.parse(payload.data?.resultJson ?? '{}').resultUrls as string[] | undefined;
      if (!urls?.[0]) throw new Error(`kie.ai returned no image URL for ${label}`);
      return urls[0];
    }
    if (state === 'fail') throw new Error(`kie.ai failed for ${label}: ${payload.data?.failMsg ?? 'unknown error'}`);
  }
  throw new Error(`kie.ai timed out for ${label}`);
}

/** One retry, because transient "Internal Error" responses are common on this endpoint. */
async function generateImage(prompt: string, label: string) {
  try {
    return await kieWaitForImage(await kieCreateTask(prompt), label);
  } catch (error) {
    console.warn(`[images] retrying ${label}: ${error instanceof Error ? error.message : error}`);
    return kieWaitForImage(await kieCreateTask(prompt), label);
  }
}

async function ensureBucket() {
  const admin = createAdminClient();
  const { data: buckets } = await admin.storage.listBuckets();
  if ((buckets ?? []).some(bucket => bucket.name === BUCKET)) return admin;
  const { error } = await admin.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
    allowedMimeTypes: ['image/png', 'image/webp', 'image/jpeg'],
  });
  if (error && !/already exists/i.test(error.message)) throw new Error(`Could not create the ${BUCKET} bucket: ${error.message}`);
  return admin;
}

async function uploadToSupabase(slug: string, filename: string, bytes: Uint8Array) {
  const admin = await ensureBucket();
  const path = `${slug}/${filename}`;
  const { error } = await admin.storage.from(BUCKET).upload(path, bytes, { contentType: 'image/png', upsert: true });
  if (error) throw new Error(`Supabase image upload failed for ${path}: ${error.message}`);
  return admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function uploadToDrive(localPath: string, name: string) {
  const folder = process.env.BLOG_DRIVE_IMAGES_FOLDER_ID;
  if (!folder) throw new Error('BLOG_DRIVE_IMAGES_FOLDER_ID is required');
  const uploaded = gogJson<{ id?: string; file?: { id?: string } }>(['drive', 'upload', localPath, `--parent=${folder}`, `--name=${name}`]);
  const fileId = uploaded.id ?? uploaded.file?.id;
  if (!fileId) throw new Error(`Drive upload returned no file id for ${name}`);
  gog(['drive', 'share', fileId, '--role=reader', '--to=anyone', '--force']);
  return fileId;
}

async function download(url: string) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Could not download generated image (HTTP ${response.status})`);
  return new Uint8Array(await response.arrayBuffer());
}

async function storeImage(kind: BlogImageKind, slug: string, alt: string, sourceUrl: string, driveName: string): Promise<BlogImage> {
  const filename = imageFilename(slug, kind);
  const bytes = await download(sourceUrl);
  const localPath = join(tmpdir(), `nursefiti-${kind}-${Date.now()}.png`);
  writeFileSync(localPath, bytes);
  try {
    return {
      kind,
      filename,
      alt,
      supabaseUrl: await uploadToSupabase(slug, filename, bytes),
      driveFileId: uploadToDrive(localPath, driveName),
    };
  } finally {
    try { unlinkSync(localPath); } catch { /* temp file already gone */ }
  }
}

/** Generates the hero and the Key Takeaways infographic in parallel, then stores both. */
export async function generateBlogImages(input: {
  slug: string;
  title: string;
  topic: string;
  heroScene: string;
  heroFraming: string;
  heroAlt: string;
  infographicTitle: string;
  takeaways: string[];
}) {
  if (input.takeaways.length === 0) throw new Error('Cannot build the infographic without Key Takeaways bullets');
  const heroPrompt = buildHeroPrompt({ topic: input.topic, scene: input.heroScene, framing: input.heroFraming });
  const infographicPrompt = buildInfographicPrompt(input.infographicTitle, input.takeaways);

  const [heroUrl, infographicUrl] = await Promise.all([
    generateImage(heroPrompt, 'hero'),
    generateImage(infographicPrompt, 'infographic'),
  ]);

  const hero = await storeImage('hero', input.slug, input.heroAlt, heroUrl, `${input.title} — Hero Image`);
  const infographic = await storeImage(
    'infographic',
    input.slug,
    `Infographic listing the five key takeaways: ${input.takeaways.map(point => point.split(/[.:]/)[0]).join('; ')}`.slice(0, 180),
    infographicUrl,
    `${input.title} — Key Takeaways Infographic`,
  );
  return { hero, infographic, prompts: { hero: heroPrompt, infographic: infographicPrompt } };
}
