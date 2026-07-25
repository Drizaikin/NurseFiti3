import { createAdminClient } from '../lib/supabase/admin';
import { columnLetter, gogJson } from '../lib/blog-orchestrator/gog';
import { KEYWORD_SHEET_ID, parseKeywordRow } from '../lib/blog-orchestrator/keywordSheet';

/**
 * One-time import of the Keyword Universe into Postgres. Safe to re-run: existing
 * rows are refreshed but their status and reviewer are left alone.
 */
const STATUS_MAP: Record<string, string> = {
  'pending review': 'queued',
  approved: 'queued',
  ready: 'queued',
  queued: 'queued',
  'draft created': 'draft_created',
  published: 'published',
  skip: 'skipped',
  skipped: 'skipped',
};

function toNumber(value: string) {
  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

async function main() {
  const { values } = gogJson<{ values?: string[][] }>(['sheets', 'get', KEYWORD_SHEET_ID, 'Keyword Universe!A1:Z400']);
  const rows = values ?? [];
  if (rows.length < 2) throw new Error('The Keyword Universe sheet has no keyword rows');
  const headers = rows[0].map(header => header.trim());
  const cell = (row: string[], name: string) => {
    const index = headers.indexOf(name);
    return index >= 0 ? (row[index] ?? '').trim() : '';
  };
  console.log(`Read ${rows.length - 1} rows. Columns A..${columnLetter(headers.length - 1)}.`);

  const admin = createAdminClient() as any;
  const { data: existing } = await admin.from('blog_keywords').select('keyword_id, status, reviewer_name');
  const known = new Map((existing ?? []).map((row: any) => [row.keyword_id, row]));

  const payload = rows.slice(1)
    .filter(row => cell(row, 'keyword_id'))
    .map((row, offset) => {
      const parsed = parseKeywordRow(headers, row, offset + 2);
      const prior = known.get(parsed.brief.keywordId) as { status?: string; reviewer_name?: string | null } | undefined;
      return {
        keyword_id: parsed.brief.keywordId,
        keyword: parsed.brief.keyword,
        title: parsed.brief.title,
        cluster_name: parsed.cluster || 'Unclustered',
        cluster_role: parsed.clusterRole || null,
        content_audience: parsed.brief.audience,
        search_volume: toNumber(parsed.searchVolume),
        kw_difficulty: toNumber(cell(row, 'kw_difficulty')),
        combined_score: toNumber(cell(row, 'combined_score')),
        search_intent: parsed.searchIntent || null,
        paa_questions: parsed.paaQuestions,
        competitors: parsed.competitors,
        // Never clobber a status or reviewer already set in the dashboard.
        status: prior?.status ?? STATUS_MAP[parsed.status.toLowerCase()] ?? 'queued',
        reviewer_name: prior?.reviewer_name ?? null,
        sheet_row: parsed.rowNumber,
      };
    });

  const { error } = await admin.from('blog_keywords').upsert(payload, { onConflict: 'keyword_id' });
  if (error) throw new Error(`Import failed: ${error.message}`);

  const created = payload.filter(row => !known.has(row.keyword_id)).length;
  console.log(`Imported ${payload.length} keywords (${created} new, ${payload.length - created} refreshed).`);
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
