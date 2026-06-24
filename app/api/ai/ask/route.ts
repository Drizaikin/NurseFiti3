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

  const models = ['gemini-2.0-flash', 'gemini-2.0-flash-lite-preview-02-05', 'gemini-1.5-pro'];
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // Fallback to older, more stable models on subsequent retries
      const currentModel = models[Math.min(attempt, models.length - 1)];
      
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: prompt,
      });

      return NextResponse.json({ answer: response.text });
    } catch (err: any) {
      attempt++;
      
      // Check if it's a 503 Overloaded OR a 404 Invalid Model error (both should trigger fallback)
      const message = err?.message || String(err);
      const isOverloaded = message.includes('503') || message.includes('high demand') || message.includes('UNAVAILABLE') || err?.status === 503;
      const isInvalidModel = message.includes('404') || message.toLowerCase().includes('not found') || err?.status === 404;
      const shouldRetry = isOverloaded || isInvalidModel;

      if (attempt >= maxRetries || !shouldRetry) {
        console.error(`Gemini API Error (Attempt ${attempt}):`, message);
        
        // Return a graceful error message if we exhausted retries on 503s
        if (isOverloaded) {
          return NextResponse.json(
            { error: 'NurseFiti AI is currently experiencing very high demand. Please try asking your question again in a moment.' }, 
            { status: 503 }
          );
        }
        
        // For standard errors (e.g. 400 Bad Request)
        return NextResponse.json(
          { error: 'NurseFiti AI encountered an unexpected error. Please try again later.' }, 
          { status: 500 }
        );
      }

      // Exponential backoff: Wait 1s, then 2s before retrying
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      console.warn(`Gemini API busy or model unavailable. Retrying in ${delayMs}ms using fallback model...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  // Fallback return (should not be reached due to logic above)
  return NextResponse.json({ error: 'NurseFiti AI is currently experiencing very high demand. Please try asking your question again in a moment.' }, { status: 503 });
}
