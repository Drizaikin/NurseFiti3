import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@/lib/supabase/server';



export async function POST(req: NextRequest) {
  // Guard: API key must be set in Vercel environment variables
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    return NextResponse.json(
      { error: 'The AI service is not configured. Please contact support.' },
      { status: 503 }
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Verify the user is authenticated
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only allow students
  const { data: profile } = await supabase
    .from('student_profiles')
    .select('cadre')
    .eq('id', user.id)
    .single() as { data: { cadre: string } | null; error: unknown };

  if (!profile) {
    return NextResponse.json({ error: 'Student profile not found' }, { status: 403 });
  }

  const body = await req.json();
  const { question, userQuestion } = body as {
    question: {
      stem: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_option: string;
      rationale: string;
      unit: string;
      topic: string;
    };
    userQuestion: string;
  };

  if (!question || !userQuestion?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sanitisedQuestion = userQuestion.trim().slice(0, 500);

  const prompt = `You are NurseFiti AI, a nursing exam tutor for Kenyan nursing students preparing for the NCK licensure examination. The student is studying for the ${profile.cadre} cadre.

Your role:
- Explain nursing concepts clearly and concisely
- Use clinical reasoning appropriate for ${profile.cadre} level
- Reference Kenyan MOH guidelines and NCK exam standards where relevant
- Keep explanations focused and exam-oriented
- Use plain language, avoid unnecessary jargon
- Write in short paragraphs — no markdown headers or bullet lists unless truly needed
- Always be encouraging and supportive

EXAM QUESTION CONTEXT:
Unit: ${question.unit}
Topic: ${question.topic}
Question: ${question.stem}

Options:
A) ${question.option_a}
B) ${question.option_b}
C) ${question.option_c}
D) ${question.option_d}

Correct Answer: ${question.correct_option}
Rationale: ${question.rationale}

STUDENT'S QUESTION:
${sanitisedQuestion}

Please answer the student's question based on this context. Keep your response under 250 words.`;

  // Priority order: most capable & up-to-date first (Gemini 3.x series — all 2025/2026).
  // Ensures answers reflect the latest Kenyan nursing guidelines and NCK standards.
  // We never fall back to older models to preserve clinical accuracy.
  const models = [
    'gemini-3.5-flash',      // primary: Gemini 3.5 Flash (GA) — most intelligent, frontier performance
    'gemini-3.1-flash-lite', // fallback 1: Gemini 3.1 Flash Lite (GA) — same generation, ultra-low latency
    'gemini-2.5-flash',      // fallback 2: Gemini 2.5 Flash — proven stable, still very recent
  ];

  let lastError: string = '';

  for (let i = 0; i < models.length; i++) {
    const currentModel = models[i];
    try {
      if (i > 0) {
        // Brief pause before retrying with fallback model
        await new Promise(resolve => setTimeout(resolve, 500));
        console.warn(`Retrying with fallback model: ${currentModel}`);
      }

      const response = await ai.models.generateContent({
        model: currentModel,
        contents: prompt,
      });

      return NextResponse.json({ answer: response.text });
    } catch (err: any) {
      lastError = err?.message || String(err);
      console.error(`Gemini error on model ${currentModel}:`, lastError);
      // Continue to next model
    }
  }

  // All models exhausted
  console.error('All Gemini models failed. Last error:', lastError);

  const isOverloaded = lastError.includes('503') || lastError.includes('UNAVAILABLE') || lastError.includes('high demand');
  if (isOverloaded) {
    return NextResponse.json(
      { error: 'NurseFiti AI is currently experiencing very high demand. Please try asking your question again in a moment.' },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: 'NurseFiti AI encountered an unexpected error. Please try again later.' },
    { status: 500 }
  );
}
