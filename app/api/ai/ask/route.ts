import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@/lib/supabase/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text;
    return NextResponse.json({ answer: text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Gemini API error:', message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
