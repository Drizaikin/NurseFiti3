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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(prompt);

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
