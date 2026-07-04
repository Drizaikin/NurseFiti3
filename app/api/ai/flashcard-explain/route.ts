import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getLimits } from '@/lib/planLimits';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This is required for streaming in Next.js App Router
export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (supabase as any).from('student_profiles').select('plan_tier, plan_expires_at').eq('id', user.id).single();
    
    const limits = getLimits(profile?.plan_tier ?? 'free');
    if (!limits.flashcardsAccess) {
      return NextResponse.json({ error: 'Upgrade required' }, { status: 403 });
    }

    const { front, back, highlight } = await req.json();

    const prompt = `You are NurseFiti AI, an expert nursing tutor specializing in Kenyan Nursing Council (NCK) exams.
A student is reviewing a flashcard and asked for a deeper explanation of the concept.

Flashcard Question: "${front}"
Flashcard Answer: "${highlight ? highlight + ' - ' : ''}${back}"

Provide a highly concise, encouraging, and clear clinical rationale explaining WHY this is the correct answer. 
Limit your response to 2 short paragraphs. Speak directly to the student. Do not use markdown headers.`;

    const models = [
      'gemini-3.1-flash-lite', // primary: Gemini 3.1 Flash Lite (GA)
      'gemini-3.5-flash',      // fallback 1: Gemini 3.5 Flash (GA)
      'gemini-2.5-flash',      // fallback 2: Gemini 2.5 Flash
    ];

    let result: any;
    let lastError = '';

    for (let i = 0; i < models.length; i++) {
      const currentModel = models[i];
      try {
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.warn(`Retrying flashcard AI with fallback model: ${currentModel}`);
        }
        
        const model = genAI.getGenerativeModel({ model: currentModel });
        result = await model.generateContentStream(prompt);
        break; // Success, exit loop
      } catch (err: any) {
        lastError = err?.message || String(err);
        console.error(`Gemini error on model ${currentModel}:`, lastError);
      }
    }

    if (!result) {
      console.error('All Gemini models failed. Last error:', lastError);
      const isOverloaded = lastError.includes('503') || lastError.includes('UNAVAILABLE') || lastError.includes('high demand');
      if (isOverloaded) {
        return NextResponse.json(
          { error: 'NurseFiti AI is currently experiencing very high demand.' },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('AI Flashcard Explain Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
