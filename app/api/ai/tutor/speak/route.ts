import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    console.warn('[ai/tutor/speak] DEEPGRAM_API_KEY is not configured in environment.');
    return NextResponse.json({ error: 'Voice service is not configured.', fallback: 'browser' }, { status: 503 });
  }

  const supabase = createRouteClient();
  let user = null;
  try {
    const { data: userData } = await supabase.auth.getUser();
    user = userData?.user ?? null;
  } catch {}
  if (!user) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      user = sessionData?.session?.user ?? null;
    } catch {}
  }
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized', fallback: 'browser' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rawText = String(body?.text ?? '').trim().slice(0, 1500);
  if (!rawText) return NextResponse.json({ error: 'Text is required.' }, { status: 400 });

  // Clean markdown formatting characters so speech synthesis sounds natural and human
  const cleanText = rawText
    .replace(/[*#_`~]/g, '')
    .replace(/^>\s*/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/⚠️/g, 'Clinical warning: ')
    .replace(/💡/g, 'Clinical pearl: ')
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  // Natural clinical voice options: aura-asteria-en (warm female), aura-luna-en, aura-angus-en (clear male)
  const model = typeof body?.model === 'string' ? body.model : 'aura-asteria-en';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`https://api.deepgram.com/v1/speak?model=${encodeURIComponent(model)}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: cleanText }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('[ai/tutor/speak] Deepgram error:', response.status, errText);
      return NextResponse.json({ error: 'Voice synthesis failed.', details: errText, fallback: 'browser' }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'audio/mp3',
        'Content-Length': String(audioBuffer.byteLength),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error('[ai/tutor/speak] Request failed:', err?.message || err);
    return NextResponse.json({ error: 'Voice generation failed.', details: err?.message, fallback: 'browser' }, { status: 500 });
  }
}
