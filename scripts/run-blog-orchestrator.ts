import { createAdminClient } from '../lib/supabase/admin';
import { fetchActiveRules } from '../lib/blog-automation/jobs';
import { orchestrateBlogDraft } from '../lib/blog-orchestrator/orchestrate';
import { fetchKeywordRow, fetchNextReadyKeywordRow, isKeywordReady } from '../lib/blog-orchestrator/keywordSheet';
import { keywordBriefSchema } from '../lib/blog-orchestrator/schemas';

function argument(name: string) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  // The dashboard owns the rules; the CLI reads whatever version is active.
  const rules = await fetchActiveRules(createAdminClient());
  console.log(`Rules version ${rules.version} · writer ${rules.writerModel}`);
  const keywordId = argument('keyword-id');
  const manualKeyword = argument('keyword');

  // Sheet-driven by default. Manual flags stay available for one-off briefs outside the universe.
  if (!manualKeyword) {
    const row = keywordId ? fetchKeywordRow(keywordId) : fetchNextReadyKeywordRow();
    if (!row) throw new Error('No Keyword Universe row is ready for generation');
    if (!isKeywordReady(row.status) && !process.argv.includes('--force-status')) {
      throw new Error(`${row.brief.keywordId} has status "${row.status}". Pass --force-status to generate anyway.`);
    }
    const reviewer = argument('reviewer');
    const brief = { ...row.brief, reviewerName: reviewer ?? row.brief.reviewerName };
    console.log(`Keyword ${brief.keywordId} (row ${row.rowNumber}): ${brief.keyword}`);
    const result = await orchestrateBlogDraft(brief, rules, { dryRun, keywordRow: row });
    console.log(JSON.stringify(result, null, 2));
    if (result.status === 'failed-audit') process.exitCode = 2;
    return;
  }

  const brief = keywordBriefSchema.parse({
    keywordId,
    keyword: manualKeyword,
    title: argument('title'),
    cluster: argument('cluster'),
    audience: argument('audience'),
    cadres: argument('cadres')?.split(',').map(value => value.trim()).filter(Boolean) ?? [],
    reviewerName: argument('reviewer'),
  });
  const result = await orchestrateBlogDraft(brief, rules, { dryRun });
  console.log(JSON.stringify(result, null, 2));
  if (result.status === 'failed-audit') process.exitCode = 2;
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
