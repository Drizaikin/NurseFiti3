import { NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Live voice tutoring is not configured.' }, { status: 503 });
  }

  try {
    const response = await fetch('https://api.deepgram.com/v1/auth/grant', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ttl_seconds: 120 }),
      cache: 'no-store',
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || typeof result.access_token !== 'string') {
      console.error('[ai/tutor/voice-token] Deepgram token request failed:', response.status);
      return NextResponse.json({ error: 'Could not start live voice. Please try again.' }, { status: 502 });
    }

    return NextResponse.json(
      { accessToken: result.access_token, expiresIn: result.expires_in ?? 120 },
      { headers: { 'Cache-Control': 'no-store, private' } }
    );
  } catch (error) {
    console.error('[ai/tutor/voice-token] Request failed:', error);
    return NextResponse.json({ error: 'Could not start live voice. Please try again.' }, { status: 502 });
  }
}
