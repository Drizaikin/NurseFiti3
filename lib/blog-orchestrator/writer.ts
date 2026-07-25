import type { AutomationRules } from '@/lib/blog-automation/rules';
import { generatedArticleSchema, HERO_FRAMINGS, type GeneratedArticle, type KeywordBrief, type ResearchResult } from './schemas';

export const BLOG_PROMPT_VERSION = 'nursefiti-blog-v3';

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MAX_OUTPUT_TOKENS = Number(process.env.BLOG_WRITER_MAX_TOKENS || 48000);
const TIMEOUT_MS = Number(process.env.BLOG_WRITER_TIMEOUT_MS || 600000);
/**
 * Drafting is a formatting task, not a puzzle. Reasoning traces bill against
 * max_tokens and dominate wall time, so they are off unless explicitly enabled.
 */
const REASONING = (process.env.BLOG_WRITER_REASONING || 'off').toLowerCase();
const reasoningParam = REASONING === 'off'
  ? { enabled: false }
  : { effort: REASONING as 'low' | 'medium' | 'high' };
const SYSTEM_PROMPT = 'You are the NurseFiti editorial drafting engine. You return a single JSON object and nothing else. You never invent facts, URLs, dates, fees, doses, or credentials.';

function parseJsonResponse(text: string | undefined, model: string) {
  if (!text) throw new Error(`${model} returned an empty response`);
  const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    // Some models prepend commentary despite the instruction; recover the outermost object.
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error(`${model} did not return JSON`);
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

async function callOpenRouter(prompt: string, rules: AutomationRules, useJsonMode: boolean) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is required');
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.nursefiti.co.ke',
      'X-Title': 'NurseFiti Blog Orchestrator',
    },
    body: JSON.stringify({
      model: rules.writerModel,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
      temperature: rules.temperature,
      max_tokens: MAX_OUTPUT_TOKENS,
      reasoning: reasoningParam,
      ...(useJsonMode ? { response_format: { type: 'json_object' } } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).catch(error => {
    throw new Error(`${rules.writerModel} request failed: ${error instanceof Error ? error.message : error}`);
  });

  const payload = await response.json() as {
    error?: { message?: string };
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  };
  if (!response.ok) {
    const message = payload.error?.message ?? `HTTP ${response.status}`;
    if (useJsonMode && /response_format|json_object/i.test(message)) return null;
    throw new Error(`${rules.writerModel} request failed: ${message}`);
  }
  const choice = payload.choices?.[0];
  if (choice?.finish_reason === 'length') {
    throw new Error(`${rules.writerModel} hit the ${MAX_OUTPUT_TOKENS.toLocaleString('en-US')} token output limit before finishing the article. Raise BLOG_WRITER_MAX_TOKENS or lower the word count rules.`);
  }
  return choice?.message?.content ?? '';
}

export async function generateArticle(
  brief: KeywordBrief,
  research: ResearchResult,
  rules: AutomationRules,
  previous?: { article: GeneratedArticle; findings: string[] },
): Promise<GeneratedArticle> {
  const allowedSources = research.sources.map(source => ({ label: source.label, url: source.url, snippet: source.snippet }));
  const revision = previous
    ? `Revise the previous JSON draft to fix only these audit findings:\n${previous.findings.join('\n')}\nPrevious draft:\n${JSON.stringify(previous.article)}`
    : 'Create the first draft.';

  const prompt = `Produce a DRAFT for human review, never a published article.

Approved brief:
${JSON.stringify(brief)}

Research questions:
${JSON.stringify(research.questions)}

Allowed sources (use only these exact URLs):
${JSON.stringify(allowedSources)}

Requirements:
- ${rules.voiceNotes}
- ${rules.wordCountMin.toLocaleString('en-US')}-${rules.wordCountMax.toLocaleString('en-US')} words without padding.
${rules.requireTldr ? `- Direct answer in the first two sentences, then a visible **TLDR** of ${rules.tldrMinWords}-${rules.tldrMaxWords} words.` : '- Direct answer in the first two sentences.'}
- Natural question-style H2 headings and answer-first sections.
${rules.requiredSections.map(section => `- A "## ${section}" section${/key takeaways/i.test(section) ? ` containing exactly ${rules.takeawayCount} concise bullets, each starting with "- "` : ''}.`).join('\n')}
- Exactly ${rules.faqCount} non-duplicative FAQs in the JSON faqs array.
- Cite at least ${rules.minSourcesGeneral} allowed sources, or ${rules.minSourcesClinical} for clinical and regulatory topics.
- Meta description (seoDescription) between ${rules.metaDescriptionMin} and ${rules.metaDescriptionMax} characters.
- Never invent dates, fees, requirements, pass rates, doses, protocols, credentials or endorsements.
- Never make any of these claims: ${rules.bannedClaims.join('; ') || 'none listed'}.
- Never use any of these words or phrases: ${rules.bannedPhrases.join('; ') || 'none listed'}.
${rules.allowRawHtml ? '' : '- No raw HTML anywhere in contentMarkdown. Markdown only.\n'}- Set featured to false and authorName to NurseFiti Editorial Team.
- Do not invent reviewerName. Use null unless the brief explicitly supplies an approved reviewer.
- Never write an image URL. The image pipeline generates the artwork separately.

Image brief fields:
- heroScene: one concrete sentence describing a real, on-topic scene a photographer would shoot for this exact article. Name who is in it and what they are doing. Kenyan setting. No abstract metaphors.
- heroFraming: choose exactly one of ${JSON.stringify(HERO_FRAMINGS)}.
- heroImageAlt: plain alt text describing that scene in under 180 characters.
- infographicTitle: a short title of 6-80 characters for a numbered graphic of the ${rules.takeawayCount} Key Takeaways.

Return JSON only with keys: slug, title, excerpt, contentMarkdown, category, cadres, featured, authorName, reviewerName, seoTitle, seoDescription, primaryKeyword, faqs, sources, heroScene, heroFraming, heroImageAlt, infographicTitle.
${rules.extraInstructions ? `\nAdditional client instructions (these override nothing above, but must be followed):\n${rules.extraInstructions}\n` : ''}
${revision}`;

  const text = await callOpenRouter(prompt, rules, true) ?? await callOpenRouter(prompt, rules, false);
  return generatedArticleSchema.parse(parseJsonResponse(text ?? undefined, rules.writerModel));
}
