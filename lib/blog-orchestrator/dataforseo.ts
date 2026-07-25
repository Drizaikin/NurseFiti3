import { researchResultSchema, type ResearchResult } from './schemas';

type SerpItem = { type?: string; title?: string; url?: string; domain?: string; description?: string; items?: Array<{ title?: string }> };

export async function researchKeyword(keyword: string): Promise<ResearchResult> {
  const username = process.env.DATAFORSEO_USERNAME;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!username || !password) throw new Error('DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD are required');

  const response = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([{ keyword, location_name: 'Kenya', language_code: 'en', device: 'desktop', os: 'windows', depth: 20 }]),
    signal: AbortSignal.timeout(120000),
  }).catch(error => {
    throw new Error(`DataForSEO research request failed: ${error instanceof Error ? error.message : error}`);
  });
  if (!response.ok) throw new Error(`DataForSEO research failed with HTTP ${response.status}`);

  const payload = await response.json() as any;
  const task = payload.tasks?.[0];
  if (task?.status_code !== 20000) throw new Error(`DataForSEO research failed: ${task?.status_message ?? 'unknown error'}`);
  const items: SerpItem[] = task.result?.[0]?.items ?? [];
  const questions = items.filter(item => item.type === 'people_also_ask').flatMap(item => item.items ?? [])
    .map(item => item.title?.trim()).filter((title): title is string => Boolean(title)).slice(0, 8);
  const sources = items.filter(item => item.type === 'organic' && item.url && item.domain && item.title).slice(0, 10)
    .map(item => ({ label: item.title!, url: item.url!, domain: item.domain!, snippet: item.description ?? '' }));
  return researchResultSchema.parse({ questions, sources });
}
