import { createAdminClient } from '../lib/supabase/admin';
import { fetchActiveRules } from '../lib/blog-automation/jobs';
import { researchKeyword } from '../lib/blog-orchestrator/dataforseo';
import { generateArticle } from '../lib/blog-orchestrator/writer';
import { auditGeneratedArticle } from '../lib/blog-orchestrator/audit';
import { fetchKeywordRow } from '../lib/blog-orchestrator/keywordSheet';

/**
 * Times candidate writer models against one real brief and one shared research set,
 * so model choice is a measurement rather than a guess.
 */
const CANDIDATES = (argument('models') ?? [
  'deepseek/deepseek-chat-v3-0324',
  'deepseek/deepseek-v4-flash',
  'deepseek/deepseek-v4-pro',
  'moonshotai/kimi-k3',
].join(',')).split(',').map(model => model.trim()).filter(Boolean);

function argument(name: string) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const keywordId = argument('keyword-id') ?? 'NF-KW-036';
  const rules = await fetchActiveRules(createAdminClient());
  const row = fetchKeywordRow(keywordId);
  console.log(`Brief: ${row.brief.keywordId} — ${row.brief.keyword}`);

  const research = await researchKeyword(row.brief.keyword);
  console.log(`Research: ${research.sources.length} sources, ${research.questions.length} questions\n`);

  const results: Array<Record<string, string | number>> = [];
  for (const model of CANDIDATES) {
    const started = Date.now();
    try {
      const article = await generateArticle(row.brief, research, { ...rules, writerModel: model });
      const seconds = Math.round((Date.now() - started) / 1000);
      const audit = auditGeneratedArticle(article, row.brief, research, rules);
      const words = article.contentMarkdown.split(/\s+/).filter(Boolean).length;
      results.push({ model, seconds, words, faqs: article.faqs.length, score: audit.score, blockers: audit.blockerCount, result: 'ok' });
      console.log(`✓ ${model} — ${seconds}s, ${words} words, audit ${audit.score}, ${audit.blockerCount} blockers`);
    } catch (error) {
      const seconds = Math.round((Date.now() - started) / 1000);
      const message = error instanceof Error ? error.message : String(error);
      results.push({ model, seconds, words: 0, faqs: 0, score: 0, blockers: 0, result: message.slice(0, 90) });
      console.log(`✗ ${model} — ${seconds}s — ${message.slice(0, 140)}`);
    }
  }

  console.log('\n--- summary (fastest passing first) ---');
  results
    .sort((a, b) => (a.result === 'ok' ? 0 : 1) - (b.result === 'ok' ? 0 : 1) || Number(a.seconds) - Number(b.seconds))
    .forEach(row => console.log(`${String(row.model).padEnd(34)} ${String(row.seconds).padStart(4)}s  words ${String(row.words).padStart(5)}  audit ${String(row.score).padStart(3)}  ${row.result}`));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
