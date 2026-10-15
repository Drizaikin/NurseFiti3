import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createRouteClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Admin-only check
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle() as any;

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    // Fetch all models available to this API key
    const list: any = await ai.models.list();
    const modelItems: any[] = [];
    if (list && typeof list[Symbol.asyncIterator] === 'function') {
      for await (const m of list) {
        modelItems.push(m);
      }
    } else if (Array.isArray(list?.models)) {
      modelItems.push(...list.models);
    } else if (Array.isArray(list)) {
      modelItems.push(...list);
    }
    const availableModels = modelItems.map((m: any) => m?.name?.replace('models/', '')).filter(Boolean);

    // Configured chain (from env or defaults)
    const DEFAULT_PRIMARY = 'gemini-3.8-flash';
    const DEFAULT_SECONDARY = 'gemini-3.6-flash';
    const DEFAULT_TERTIARY = 'gemini-3.5-flash-lite';

    const primary = process.env.GEMINI_TUTOR_MODEL_PRIMARY?.trim() || DEFAULT_PRIMARY;
    const secondary = process.env.GEMINI_TUTOR_MODEL_SECONDARY?.trim() || DEFAULT_SECONDARY;
    const tertiary = process.env.GEMINI_TUTOR_MODEL_TERTIARY?.trim() || DEFAULT_TERTIARY;

    const configured = [primary, secondary, tertiary].filter((m, i, arr) => m && arr.indexOf(m) === i);

    const result = configured.map((model) => ({
      model,
      configured: true,
      available: availableModels.includes(model),
    }));

    // Also include any other configured models that might be missing from available list
    return NextResponse.json({
      configuredChain: result,
      availableCount: availableModels.length,
      // Optionally return full list for debugging (can be large)
      // allAvailable: availableModels,
    });
  } catch (err: any) {
    console.error('[admin/ai/tutor/models] error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch model list', details: err?.message },
      { status: 500 }
    );
  }
}