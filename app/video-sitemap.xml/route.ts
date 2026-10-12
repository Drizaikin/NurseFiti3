/**
 * GET /video-sitemap.xml
 *
 * Google Video Sitemap — tells Google about the self-hosted tutorial videos
 * on the NurseFiti landing page so they can appear in Google Video Search
 * and as rich results directly from search results.
 *
 * Spec: https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';
const LANDING = `${BASE}/`;

interface VideoEntry {
  title: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  duration: number; // seconds
  uploadDate: string; // ISO 8601
}

const VIDEOS: VideoEntry[] = [
  {
    title: 'Create your NurseFiti account',
    description:
      'Sign up for NurseFiti, pick your nursing cadre and institution, take a quick orientation tour, and land on your personalised NCK exam preparation dashboard.',
    thumbnailUrl: `${BASE}/images/tutorials/signing-up.jpg`,
    contentUrl: `${BASE}/videos/tutorials/signing-up.mp4`,
    duration: 37,
    uploadDate: '2026-05-01',
  },
  {
    title: 'Log in and explore your NurseFiti dashboard',
    description:
      'Log in to NurseFiti and navigate your personalised dashboard — view your study streak, average score, and total study time at a glance.',
    thumbnailUrl: `${BASE}/images/tutorials/signup-login.jpg`,
    contentUrl: `${BASE}/videos/tutorials/signup-login.mp4`,
    duration: 18,
    uploadDate: '2026-05-01',
  },
  {
    title: 'NCK practice questions on NurseFiti',
    description:
      'Start or resume a practice session, answer multiple-choice questions for the NCK licensure exam, and get instant feedback with a full rationale.',
    thumbnailUrl: `${BASE}/images/tutorials/practice-mock-exams.jpg`,
    contentUrl: `${BASE}/videos/tutorials/practice-mock-exams.mp4`,
    duration: 27,
    uploadDate: '2026-05-01',
  },
];

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildVideoSitemap(videos: VideoEntry[]): string {
  const entries = videos
    .map(
      (v) => `  <url>
    <loc>${escapeXml(LANDING)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(v.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${escapeXml(v.contentUrl)}</video:content_loc>
      <video:duration>${v.duration}</video:duration>
      <video:upload_date>${v.uploadDate}</video:upload_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;
}

export async function GET() {
  const xml = buildVideoSitemap(VIDEOS);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
