import { columnLetter, gog, gogJson } from './gog';
import { keywordBriefSchema, type KeywordBrief } from './schemas';

export const KEYWORD_SHEET_ID = process.env.BLOG_KEYWORD_SHEET_ID || '1z6_oQ9Tca05-NVbEN-wSjPz3n51CU3I07hNDfHEKo2o';
export const PUBLISHED_SHEET_ID = process.env.BLOG_PUBLISHED_SHEET_ID || '1Qxd6VDTs4e6NQMRd7byOBbqZifWKuqNBBwwJyc2FcaI';
const KEYWORD_TAB = 'Keyword Universe';

const AUDIENCES = ['prospective-student', 'nursing-student', 'licensed-nurse'] as const;
const READY_STATUSES = ['approved', 'pending review', 'ready', 'queued'];

export type KeywordRow = {
  rowNumber: number;
  brief: KeywordBrief;
  status: string;
  cluster: string;
  clusterRole: string;
  searchVolume: string;
  searchIntent: string;
  paaQuestions: string[];
  competitors: string[];
};

function splitList(value: string) {
  return value.split(/\s*;\s*/).map(item => item.trim()).filter(Boolean);
}

/** Maps one Keyword Universe row onto an orchestrator brief. Header driven so column order can move. */
export function parseKeywordRow(headers: string[], row: string[], rowNumber: number): KeywordRow {
  const cell = (name: string) => {
    const index = headers.indexOf(name);
    return index >= 0 ? (row[index] ?? '').trim() : '';
  };
  const audience = cell('content_audience');
  const brief = keywordBriefSchema.parse({
    keywordId: cell('keyword_id'),
    keyword: cell('keyword'),
    title: cell('title'),
    cluster: cell('cluster_name') || 'Unclustered',
    audience: (AUDIENCES as readonly string[]).includes(audience) ? audience : 'nursing-student',
    cadres: [],
    reviewerName: null,
  });
  return {
    rowNumber,
    brief,
    status: cell('status'),
    cluster: cell('cluster_name'),
    clusterRole: cell('cluster_role'),
    searchVolume: cell('search_volume'),
    searchIntent: cell('search_intent'),
    paaQuestions: splitList(cell('paa_questions')),
    competitors: splitList(cell('top_3_competitors')),
  };
}

export function isKeywordReady(status: string) {
  return READY_STATUSES.includes(status.trim().toLowerCase());
}

function readKeywordSheet() {
  const { values } = gogJson<{ values?: string[][] }>(['sheets', 'get', KEYWORD_SHEET_ID, `${KEYWORD_TAB}!A1:Z400`]);
  const rows = values ?? [];
  if (rows.length < 2) throw new Error('The Keyword Universe sheet has no keyword rows');
  return { headers: rows[0].map(header => header.trim()), rows: rows.slice(1) };
}

export function fetchKeywordRow(keywordId: string): KeywordRow {
  const { headers, rows } = readKeywordSheet();
  const idIndex = headers.indexOf('keyword_id');
  if (idIndex < 0) throw new Error('The Keyword Universe sheet is missing a keyword_id column');
  const target = keywordId.trim().toLowerCase();
  const offset = rows.findIndex(row => (row[idIndex] ?? '').trim().toLowerCase() === target);
  if (offset < 0) throw new Error(`Keyword ${keywordId} is not in the Keyword Universe sheet`);
  return parseKeywordRow(headers, rows[offset], offset + 2);
}

/** Next row whose status is still queueable, so batches can run without naming every keyword. */
export function fetchNextReadyKeywordRow(): KeywordRow | null {
  const { headers, rows } = readKeywordSheet();
  const statusIndex = headers.indexOf('status');
  const offset = rows.findIndex(row => isKeywordReady(row[statusIndex] ?? ''));
  return offset < 0 ? null : parseKeywordRow(headers, rows[offset], offset + 2);
}

export function updateKeywordStatus(row: KeywordRow, status: string, assignedDate: string, notes?: string) {
  const { headers } = readKeywordSheet();
  const write = (column: string, value: string) => {
    const index = headers.indexOf(column);
    if (index < 0) return;
    const cell = `${KEYWORD_TAB}!${columnLetter(index)}${row.rowNumber}`;
    gog(['sheets', 'update', KEYWORD_SHEET_ID, cell, '--values-json', JSON.stringify([[value]]), '--input', 'RAW']);
  };
  write('status', status);
  write('assigned_article_date', assignedDate);
  if (notes) write('notes', notes);
}

export type PublishedBlogRecord = {
  blogId: string;
  targetDate: string;
  month: string;
  keyword: string;
  title: string;
  slug: string;
  draftDocLink: string;
  cmsDraftId: string;
  cluster: string;
  clusterRole: string;
  contentAudience: string;
  internalLinks: number;
  externalLinks: number;
  faqCount: number;
  auditScore: number;
  blockerCount: number;
  warningCount: number;
  generationRunId: string;
  promptVersion: string;
  notes: string;
};

/** Column order matches the Published Blogs Master Sheet header row (A..X). */
export function publishedBlogRowValues(record: PublishedBlogRecord) {
  return [
    record.blogId, record.targetDate, record.month, 'Draft', 'CMS Draft',
    record.keyword, record.title, record.slug, record.draftDocLink, record.cmsDraftId, '',
    record.cluster, record.clusterRole, record.contentAudience,
    String(record.internalLinks), String(record.externalLinks), String(record.faqCount), 'Yes',
    String(record.auditScore), String(record.blockerCount), String(record.warningCount),
    record.generationRunId, record.promptVersion, record.notes,
  ];
}

export function nextBlogId(existingIds: string[]) {
  const highest = existingIds.reduce((max, id) => {
    const match = /^NF-(\d+)$/.exec(id.trim());
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `NF-${String(highest + 1).padStart(3, '0')}`;
}

export function appendPublishedBlogRow(record: Omit<PublishedBlogRecord, 'blogId'>) {
  const { values } = gogJson<{ values?: string[][] }>(['sheets', 'get', PUBLISHED_SHEET_ID, 'A1:A500']);
  const blogId = nextBlogId((values ?? []).slice(1).map(row => row[0] ?? ''));
  gog([
    'sheets', 'append', PUBLISHED_SHEET_ID, 'A1',
    '--values-json', JSON.stringify([publishedBlogRowValues({ ...record, blogId })]),
    '--input', 'USER_ENTERED',
  ]);
  return blogId;
}
