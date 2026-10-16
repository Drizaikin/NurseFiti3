import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStudentPerformanceProfile } from '@/lib/ai/studentAnalytics';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface SourceRef {
  title: string;
  chunkIndex: number;
  isStudentDoc?: boolean;
}

function isLocalId(id: unknown): boolean {
  return typeof id === 'string' && (id === 'local' || id.startsWith('local-'));
}

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'The AI service is not configured. Please contact support.' }, { status: 503 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profileQuery = supabase.from('student_profiles').select('cadre').eq('id', user.id) as any;
  const { data: profile } = typeof profileQuery?.maybeSingle === 'function'
    ? await profileQuery.maybeSingle()
    : (typeof profileQuery?.single === 'function' ? await profileQuery.single().catch(() => ({ data: null })) : { data: null });

  const body = await req.json().catch(() => ({}));
  const streamRequested = body?.stream === true;
  const message = String(body?.message ?? '').trim().slice(0, 1000);
  const materialId = body?.materialId && !isLocalId(body.materialId) ? String(body.materialId) : null;
  const rawLocalContext = Array.isArray(body?.localContext) ? body.localContext : [];
  const localContext: Array<{ title: string; content: string }> = rawLocalContext
    .slice(0, 5)
    .map((item: any) => ({
      title: String(item?.title ?? 'Personal Study Material').slice(0, 100),
      content: String(item?.content ?? '').slice(0, 3000),
    }))
    .filter((c: { title: string; content: string }) => c.content.trim().length > 0);
  const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Concurrently fetch the student's mastery & performance analytics
  const performancePromise = getStudentPerformanceProfile(admin, user.id);

  // Retrieve grounded context with Admin Global + Student Personal synergy
  let chunks: Array<{ id: string; material_id: string; title: string; chunk_index: number; content: string; isStudentDoc?: boolean; _score?: number }> = [];

  // Ingest client-side local context (from student device IndexedDB, zero server storage/DB quota used)
  if (localContext.length > 0) {
    for (let idx = 0; idx < localContext.length; idx++) {
      const item = localContext[idx];
      if (item?.content) {
        chunks.push({
          id: `local-${idx}`,
          material_id: 'local',
          title: item.title || 'Personal Study Material',
          chunk_index: idx,
          content: item.content,
          isStudentDoc: true,
        });
      }
    }
  }

  if (materialId && materialId !== 'local') {
    // 1. Retrieve excerpts from the student's selected document
    try {
      const { data: studentData } = await (admin as any).rpc('search_ai_tutor_chunks', {
        p_query: message,
        p_user_id: user.id,
        p_material_id: materialId,
        p_limit: 10,
      });
      if (Array.isArray(studentData)) {
        for (const item of studentData) {
          chunks.push({ ...item, isStudentDoc: true });
        }
      }
    } catch (e) {
      console.warn('[ai/tutor] student material search failed', e);
    }

    // 2. In synergy, ALSO retrieve excerpts from official Admin Global textbooks
    try {
      const { data: globalData } = await (admin as any).rpc('search_ai_tutor_chunks', {
        p_query: message,
        p_user_id: null,
        p_material_id: null,
        p_limit: 10,
      });
      if (Array.isArray(globalData)) {
        const existing = new Set(chunks.map((c) => c.id));
        for (const item of globalData) {
          if (!existing.has(item.id)) {
            existing.add(item.id);
            chunks.push({ ...item, isStudentDoc: false });
          }
        }
      }
    } catch (e) {
      console.warn('[ai/tutor] global textbooks search failed', e);
    }
  } else {
    // No specific material selected: search across all accessible materials (global textbooks + student's own)
    try {
      const { data: ftsData } = await (admin as any).rpc('search_ai_tutor_chunks', {
        p_query: message,
        p_user_id: user.id,
        p_material_id: null,
        p_limit: 18,
      });
      if (Array.isArray(ftsData)) {
        for (const item of ftsData) {
          chunks.push({ ...item, isStudentDoc: false });
        }
      }
    } catch (e) {
      console.warn('[ai/tutor] rpc search failed', e);
    }
  }

  // Supplement with keyword-based recall so important passages are not missed
  const terms = Array.from(new Set(
    message.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 4)
  )).slice(0, 8);

  if (terms.length > 0) {
    try {
      const orClause = terms.map((t) => `content.ilike.%${t}%`).join(',');
      let kwQuery = (admin as any)
        .from('ai_tutor_chunks')
        .select('id, material_id, chunk_index, content, ai_tutor_materials(title, scope, uploaded_by, status)')
        .or(orClause);

      const { data: kwData } = await kwQuery.limit(24);
      if (Array.isArray(kwData)) {
        const existing = new Set(chunks.map((c) => c.id));
        for (const row of kwData) {
          const mat = row.ai_tutor_materials;
          if (mat?.status && mat.status !== 'approved') continue;
          const isGlobal = mat?.scope === 'global';
          const isOwner = mat?.uploaded_by === user.id;
          if (!isGlobal && !isOwner) continue;
          if (materialId && row.material_id !== materialId && !isGlobal) continue;

          if (existing.has(row.id)) continue;
          existing.add(row.id);
          const isStudentDoc = Boolean(materialId && row.material_id === materialId);
          chunks.push({
            id: row.id,
            material_id: row.material_id,
            title: mat?.title ?? 'Uploaded textbook',
            chunk_index: row.chunk_index,
            content: row.content,
            isStudentDoc,
          });
        }
      }
    } catch (e) {
      console.warn('[ai/tutor] keyword recall failed', e);
    }
  }

  // Add neighboring chunks for continuity so the model sees surrounding context (database chunks only)
  if (chunks.length > 0) {
    try {
      const chunkIds = new Set(chunks.map((c) => c.id));
      const selectedPositions = chunks
        .filter((c) => !isLocalId(c.material_id))
        .slice(0, 8)
        .map((c) => ({ material_id: c.material_id, chunk_index: c.chunk_index, isStudentDoc: c.isStudentDoc }));

      if (selectedPositions.length > 0) {
        const positionFilters = selectedPositions
          .map((p) => `and(material_id.eq.${p.material_id},chunk_index.in.(${p.chunk_index - 1},${p.chunk_index},${p.chunk_index + 1}))`)
          .join(',');
        const { data: neighborData } = await (admin as any)
          .from('ai_tutor_chunks')
          .select('id, material_id, chunk_index, content, ai_tutor_materials(title)')
          .or(positionFilters)
          .limit(48);
        if (Array.isArray(neighborData)) {
          for (const row of neighborData) {
            if (chunkIds.has(row.id)) continue;
            chunkIds.add(row.id);
            const isStudentDoc = Boolean(materialId && row.material_id === materialId);
            chunks.push({
              id: row.id,
              material_id: row.material_id,
              title: row.ai_tutor_materials?.title ?? 'Uploaded textbook',
              chunk_index: row.chunk_index,
              content: row.content,
              isStudentDoc,
            });
          }
        }
      }
    } catch (e) {
      console.warn('[ai/tutor] neighbor expansion failed', e);
    }
  }

  // Rank by lexical overlap so the most relevant excerpts come first
  const queryTerms = new Set(terms);
  chunks = chunks
    .map((c) => {
      const lower = c.content.toLowerCase();
      const overlap = Array.from(queryTerms).reduce((n, t) => (lower.includes(t) ? n + 1 : n), 0);
      return { ...c, _score: overlap };
    })
    .sort((a, b) => b._score - a._score || a.chunk_index - b.chunk_index)
    .slice(0, 18);

  const context = chunks
    .map((c, i) => {
      const sourceLabel = c.isStudentDoc
        ? `[Student Document: "${c.title}", Section ${c.chunk_index + 1}]`
        : `[Official Core Textbook: "${c.title}", Section ${c.chunk_index + 1}]`;
      return `[Excerpt ${i + 1} — ${sourceLabel}]\n${c.content}`;
    })
    .join('\n\n---\n\n');

  const performanceProfile = await performancePromise;
  const cadre = profile?.cadre || 'nursing student';
  const systemPrompt = `You are NurseFiti AI Tutor, an empathetic, highly knowledgeable clinical mentor and educator for Kenyan nursing students (Cadre: ${cadre}) preparing for clinical practice and the Nursing Council of Kenya (NCK) licensure examinations.

CORE CAPABILITIES & SYNERGY:
1. GROUNDED CLINICAL KNOWLEDGE (Core Textbooks & Student Documents in Synergy):
   - You have access to official nursing textbooks and clinical manuals uploaded by NurseFiti faculty (marked "Official Core Textbook"), as well as study materials uploaded by the student (marked "Student Document").
   - When answering clinical questions, drug dosages, nursing diagnoses, or NCK exam questions, synthesize information from both: ground your clinical claims in the textbooks, and cross-reference them with the student's notes where applicable.
   - Always cite the source titles in your explanation (e.g., "(Source: Med-Surg Nursing, Section 4)" or "(Source: Maternal & Child Health Guide)").

2. DEEP PERFORMANCE AWARENESS & PATTERN ANALYSIS:
   - You have complete, real-time visibility into this student's practice analytics, mock exam performance, weak units, and specific failed questions (shown in the STUDENT PERFORMANCE PROFILE below).
   - You can identify their performance patterns across units (e.g., struggling with Pharmacology vs strong in Fundamentals).
   - If the student asks "What are my weak areas?", "Analyze my performance", "Why did I fail that question?", or "What should I revise?", break down their specific mistake patterns, explain the exact questions they failed, and provide tailored diagnostic guidance.
   - When explaining any nursing topic, proactively reference their historical weak points or past errors if relevant, to help them overcome conceptual blindspots.
   - If asked to drill or test the student, prioritize questions from their weakest units.

3. FOUNDATIONAL SCIENCE, PSYCHOLOGY & HOLISTIC NURSING:
   - You possess rich foundational knowledge in psychology (developmental theories like Erikson, Piaget, Freud; Maslow's hierarchy of needs; grief stages; mental health disorders; therapeutic communication; defense mechanisms).
   - You possess comprehensive scientific knowledge (anatomy, human physiology, microbiology, biochemistry, pathophysiology).
   - If a student asks questions involving psychological concepts, behavioral health, bedside manner, or basic science, answer thoroughly and accurately. Do NOT refuse or say "I couldn't find this in your textbooks" for general scientific, psychological, or conceptual reasoning questions.

4. WEB GROUNDING & CURRENT HEALTH UPDATES:
   - You have access to real-time Google Search grounding.
   - Use current web information for recent disease epidemiology, current health advisories (e.g., WHO/CDC alerts, Kenya Ministry of Health updates), and recent clinical advancements, while maintaining alignment with evidence-based medicine.

5. SOURCE DISCREPANCY & CONFLICT PROTOCOL (MANDATORY):
   - Whenever different textbooks or sources present conflicting or discrepant information (e.g. differing drug dosages, differing normal lab value ranges, contrasting priority interventions, or differences between international literature vs Kenya Ministry of Health / NCK guidelines):
     * NEVER IGNORE, hide, or gloss over the discrepancy.
     * EXPLICITLY HIGHLIGHT the discrepancy in a dedicated callout: "⚠️ Discrepancy Note: [Source A] states X, whereas [Source B] states Y."
     * Quote the specific difference for each source title.
     * Clarify which one is currently prioritized for Kenyan NCK examinations, or advise the student to confirm against the local clinical hospital protocol.

6. PEDAGOGICAL APPROACH (The NurseFiti Method):
   - Clear, supportive, encouraging, and structured (use bullet points and bold highlights for readability).
   - Emphasize the Nursing Process (Assessment, Diagnosis, Planning, Implementation, Evaluation - ADPIE).
   - Provide clinical reasoning: explain *why* an intervention is prioritized (e.g., ABCs - Airway, Breathing, Circulation).
   - When explaining a concept, conclude with a brief, high-yield "NCK Clinical Pearl" or a thought-provoking guiding question to help test their understanding.
   - Disclaimers: For medication dosages or high-risk clinical procedures, remind students to always verify with hospital formulary, Kenya MOH guidelines, and supervising clinical instructors.

STUDENT PERFORMANCE & MASTERY PROFILE:
${performanceProfile.formattedSummary}

TEXTBOOK & STUDY MATERIAL EXCERPTS:
${context || 'No specific excerpts retrieved. Providing guidance from foundational nursing, science, psychology, and evidence-based clinical knowledge.'}`;

  const conversation = [
    ...history.slice(-10).map((m) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`),
    `Student: ${message}`,
  ].join('\n');

  const prompt = `${systemPrompt}\n\nCONVERSATION:\n${conversation}\n\nTutor:`;

  // Configurable three-model chain with safe defaults (verified available on the account)
  const DEFAULT_PRIMARY = 'gemini-3.8-flash';
  const DEFAULT_SECONDARY = 'gemini-3.6-flash';
  const DEFAULT_TERTIARY = 'gemini-3.5-flash-lite';

  function getModelChain(): string[] {
    const primary = process.env.GEMINI_TUTOR_MODEL_PRIMARY?.trim() || DEFAULT_PRIMARY;
    const secondary = process.env.GEMINI_TUTOR_MODEL_SECONDARY?.trim() || DEFAULT_SECONDARY;
    const tertiary = process.env.GEMINI_TUTOR_MODEL_TERTIARY?.trim() || DEFAULT_TERTIARY;
    // Preserve order, drop empty, deduplicate while keeping first occurrence
    const seen = new Set<string>();
    return [primary, secondary, tertiary].filter((m) => {
      if (!m || seen.has(m)) return false;
      seen.add(m);
      return true;
    });
  }

  const modelChain = getModelChain();

  // In-memory cache of permanently unavailable models for this server process
  const invalidModels = new Set<string>();

  // Error classification
  type ErrorKind = 'transient' | 'permanent' | 'unknown';
  interface ClassifiedError {
    kind: ErrorKind;
    message: string;
    status?: number;
  }

  function classifyError(err: any): ClassifiedError {
    const status = err?.status ?? err?.response?.status ?? err?.code;
    const message = String(err?.message ?? err ?? '').toLowerCase();

    // Permanent: model not found, invalid model, unsupported, permission denied on that model, API key invalid
    if (status === 404 || status === '404') {
      return { kind: 'permanent', message: err?.message ?? 'Model not found', status: 404 };
    }
    if (
      message.includes('model not found') ||
      message.includes('unknown model') ||
      message.includes('invalid model') ||
      message.includes('unsupported model') ||
      message.includes('model is not available') ||
      message.includes('model has been retired')
    ) {
      return { kind: 'permanent', message: err?.message ?? 'Model unavailable', status: status ?? 400 };
    }
    if (status === 403 || status === 401) {
      // Could be API key issue; treat as permanent for this model to avoid looping
      return { kind: 'permanent', message: err?.message ?? 'Permission denied', status };
    }

    // Transient: rate limit, overload, server errors, timeouts, network issues
    if (status === 429 || status === 503 || status === 500 || status === 502 || status === 504) {
      return { kind: 'transient', message: err?.message ?? 'Service error', status };
    }
    if (
      message.includes('rate limit') ||
      message.includes('quota') ||
      message.includes('overload') ||
      message.includes('high demand') ||
      message.includes('unavailable') ||
      message.includes('timeout') ||
      message.includes('network') ||
      message.includes('socket') ||
      message.includes('econnreset') ||
      message.includes('etimedout') ||
      message.includes('503') ||
      message.includes('429')
    ) {
      return { kind: 'transient', message: err?.message ?? 'Transient error', status };
    }

    // Unknown: treat as transient but we will not retry the same model anyway
    return { kind: 'unknown', message: err?.message ?? 'Unknown error', status };
  }

  // Bounded exponential backoff with jitter (ms)
  function backoffMs(attempt: number): number {
    const base = 100; // ms
    const max = 750;
    const exp = Math.min(base * Math.pow(2, attempt), max);
    const jitter = Math.floor(Math.random() * 100);
    return Math.min(exp + jitter, max);
  }

  if (streamRequested) {
    const encoder = new TextEncoder();
    let cancelled = false;
    const sse = (event: string, data: unknown) => encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const sources: SourceRef[] = chunks.map((c) => ({
          title: c.title,
          chunkIndex: c.chunk_index,
          isStudentDoc: Boolean(c.isStudentDoc),
        }));
        controller.enqueue(sse('sources', { sources }));
        let emittedText = false;
        let lastStreamError: ClassifiedError | null = null;

        for (let i = 0; i < modelChain.length && !cancelled; i++) {
          const currentModel = modelChain[i];
          if (invalidModels.has(currentModel)) continue;

          try {
            if (i > 0) await new Promise((resolve) => setTimeout(resolve, backoffMs(i - 1)));
            let modelStream;
            try {
              modelStream = await ai.models.generateContentStream({
                model: currentModel,
                contents: prompt,
                config: {
                  maxOutputTokens: 1200,
                  tools: [{ googleSearch: {} }],
                },
              });
            } catch {
              // Fallback without search tool in case tool is not supported on this model
              modelStream = await ai.models.generateContentStream({
                model: currentModel,
                contents: prompt,
                config: { maxOutputTokens: 1200 },
              });
            }
            let attemptProducedText = false;

            for await (const chunk of modelStream) {
              if (cancelled) break;
              const text = chunk.text ?? '';
              if (!text) continue;
              attemptProducedText = true;
              emittedText = true;
              controller.enqueue(sse('token', { text }));
            }

            if (cancelled) break;
            if (attemptProducedText) {
              controller.enqueue(sse('done', {}));
              controller.close();
              return;
            }
          } catch (err: any) {
            const classified = classifyError(err);
            lastStreamError = classified;
            console.error(`[ai/tutor] Gemini streaming error on ${currentModel}:`, classified.message);
            if (classified.kind === 'permanent') invalidModels.add(currentModel);
            // Retry only before any visible text; retrying after output would repeat the answer.
            if (emittedText) break;
          }
        }

        if (!cancelled) {
          if (emittedText) {
            controller.enqueue(sse('done', {}));
          } else {
            const isOverloaded = lastStreamError?.kind === 'transient' || lastStreamError?.status === 503 || lastStreamError?.status === 429;
            controller.enqueue(sse('error', {
              error: isOverloaded
                ? 'NurseFiti AI is busy. Please try again in a moment.'
                : 'NurseFiti AI encountered an error. Please try again.',
            }));
          }
          controller.close();
        }
      },
      cancel() {
        cancelled = true;
      },
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  }

  // Generate content with per-attempt timeout (ms)
  const ATTEMPT_TIMEOUT_MS = 15000;
  async function generateWithTimeout(model: string, prompt: string, withSearch = true): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
    try {
      const config: any = { maxOutputTokens: 1200 };
      if (withSearch) config.tools = [{ googleSearch: {} }];
      // @google/genai v2 supports requestOptions with signal
      const response = await (ai.models as any).generateContent(
        { model, contents: prompt, config },
        { signal: controller.signal }
      );
      return response?.text ?? '';
    } catch (err: any) {
      const msg = String(err?.message ?? '').toLowerCase();
      const isToolError = msg.includes('tool') || msg.includes('search') || msg.includes('unsupported');
      if (withSearch && isToolError) {
        return generateWithTimeout(model, prompt, false);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  let answer = '';
  let lastError: ClassifiedError | null = null;

  for (let i = 0; i < modelChain.length; i++) {
    const currentModel = modelChain[i];

    // Skip models already known to be permanently invalid in this process
    if (invalidModels.has(currentModel)) {
      console.warn(`[ai/tutor] Skipping permanently invalid model: ${currentModel}`);
      continue;
    }

    try {
      // Small backoff before second/third attempts (not before first)
      if (i > 0) {
        await new Promise((r) => setTimeout(r, backoffMs(i - 1)));
      }

      const text = await generateWithTimeout(currentModel, prompt);
      answer = text;
      if (answer.trim()) break;
    } catch (err: any) {
      const classified = classifyError(err);
      lastError = classified;
      console.error(`[ai/tutor] Gemini error on ${currentModel}:`, classified.message);

      if (classified.kind === 'permanent') {
        // Mark as invalid for the remainder of this process
        invalidModels.add(currentModel);
        // Continue immediately to next model
        continue;
      }
      // Transient or unknown: continue to next model (no retry on same model)
      continue;
    }
  }

  if (!answer.trim()) {
    const isOverloaded = lastError?.kind === 'transient' || lastError?.status === 503 || lastError?.status === 429;
    return NextResponse.json(
      { error: isOverloaded ? 'NurseFiti AI is busy. Please try again in a moment.' : 'NurseFiti AI encountered an error. Please try again.' },
      { status: 503 }
    );
  }

  const sources: SourceRef[] = chunks.map((c) => ({
    title: c.title,
    chunkIndex: c.chunk_index,
    isStudentDoc: Boolean(c.isStudentDoc),
  }));

  return NextResponse.json({ answer: answer.trim(), sources });
}
