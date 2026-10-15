import { NextResponse } from 'next/server';
import { VIDEO_TUTORIALS } from '@/lib/videoTutorials';

export const dynamic = 'force-static';
export const revalidate = 86400;

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const entries = VIDEO_TUTORIALS.map((video) => {
    const watchPage = `${BASE}/tutorials/${video.slug}`;
    return `  <url>
    <loc>${escapeXml(watchPage)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(`${BASE}${video.poster}`)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(`${BASE}${video.src}`)}</video:content_loc>
      <video:player_loc>${escapeXml(watchPage)}</video:player_loc>
      <video:duration>${video.durationSeconds}</video:duration>
      <video:upload_date>${video.uploadDate}</video:upload_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
