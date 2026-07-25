import { randomUUID } from 'node:crypto';
import { auditGeneratedArticle } from './audit';
import {
  buildDocMarkdown, countLinks, extractKeyTakeaways, imageMarkdown,
  insertImageAfterTakeaways, slugToTitleDate, stripImageSizing,
} from './content';
import { researchKeyword } from './dataforseo';
import { createDraftDoc } from './gdoc';
import { BLOG_PROMPT_VERSION, generateArticle } from './writer';
import { generateBlogImages } from './images';
import { appendPublishedBlogRow, updateKeywordStatus, type KeywordRow } from './keywordSheet';
import { automationDraftSchema, keywordBriefSchema, type KeywordBrief } from './schemas';
import type { AutomationRules } from '@/lib/blog-automation/rules';

type Options = {
  /** Skips images, the Doc, CMS ingestion, and every sheet write. */
  dryRun?: boolean;
  /** Called after each stage so the job queue can show live progress. */
  onStep?: (step: { label: string; seconds: number }) => void | Promise<void>;
  /** Present when the brief came from the Keyword Universe sheet, enabling status write-back. */
  keywordRow?: KeywordRow;
};

async function ingestDraft(draft: unknown, idempotencyKey: string) {
  const endpoint = process.env.BLOG_AUTOMATION_INGEST_URL;
  const token = process.env.BLOG_AUTOMATION_TOKEN;
  if (!endpoint || !token) throw new Error('BLOG_AUTOMATION_INGEST_URL and BLOG_AUTOMATION_TOKEN are required');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(draft),
    signal: AbortSignal.timeout(30000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Draft ingestion failed (${response.status}): ${JSON.stringify(result)}`);
  return result as { kind: string; postId?: string; ingestionId?: string };
}

/** Names the failing stage and its duration, so a long run does not fail anonymously. */
function makeStep(onStep?: (step: { label: string; seconds: number }) => void | Promise<void>) {
  return async function step<T>(label: string, work: () => Promise<T>): Promise<T> {
    const started = Date.now();
    try {
      const value = await work();
      const seconds = Math.round((Date.now() - started) / 1000);
      console.error(`  ✓ ${label} (${seconds}s)`);
      await onStep?.({ label, seconds });
      return value;
    } catch (error) {
      throw new Error(`${label} failed after ${Math.round((Date.now() - started) / 1000)}s: ${error instanceof Error ? error.message : error}`);
    }
  };
}

export async function orchestrateBlogDraft(input: KeywordBrief, rules: AutomationRules, options: Options = {}) {
  const brief = keywordBriefSchema.parse(input);
  const step = makeStep(options.onStep);
  const research = await step('research', () => researchKeyword(brief.keyword));
  let article = await step('draft', () => generateArticle(brief, research, rules));
  let audit = auditGeneratedArticle(article, brief, research, rules);

  if (audit.blockerCount > 0) {
    console.error(`  · revising for ${audit.blockerCount} blocker(s): ${audit.findings.filter(f => f.severity === 'blocker').map(f => f.code).join(', ')}`);
    article = await step('revision', () => generateArticle(brief, research, rules, {
      article,
      findings: audit.findings.map(finding => `${finding.code}: ${finding.message}`),
    }));
    audit = auditGeneratedArticle(article, brief, research, rules);
  }

  const generationRunId = randomUUID();
  if (audit.blockerCount > 0 || audit.score < rules.auditPassScore) {
    return { status: 'failed-audit' as const, generationRunId, article, audit, research };
  }

  const takeaways = extractKeyTakeaways(article.contentMarkdown);
  if (options.dryRun) {
    return { status: 'dry-run' as const, generationRunId, article, audit, research, takeaways };
  }

  // Images run only after a clean audit so a rejected draft never spends image credits.
  const images = await step('images', () => generateBlogImages({
    slug: article.slug,
    title: article.title,
    topic: brief.keyword,
    heroScene: article.heroScene,
    heroFraming: article.heroFraming,
    heroAlt: article.heroImageAlt,
    infographicTitle: article.infographicTitle,
    takeaways,
  }));

  const infographicMarkdown = imageMarkdown(images.infographic.supabaseUrl, images.infographic.alt);
  const docContent = insertImageAfterTakeaways(article.contentMarkdown, infographicMarkdown);
  const doc = await step('google doc', async () => createDraftDoc(brief.keywordId, article.title, buildDocMarkdown({
    article,
    brief,
    audit,
    heroMarkdown: imageMarkdown(images.hero.supabaseUrl, images.hero.alt),
    contentMarkdown: docContent,
    generationRunId,
    model: rules.writerModel,
    promptVersion: BLOG_PROMPT_VERSION,
  })));

  const draft = automationDraftSchema.parse({
    ...article,
    // The CMS renderer sizes images itself, so the gogcli sizing hints are stripped here.
    contentMarkdown: stripImageSizing(docContent),
    keywordId: brief.keywordId,
    heroImageUrl: images.hero.supabaseUrl,
    draftDocUrl: doc.url,
    generationRunId,
    promptVersion: BLOG_PROMPT_VERSION,
    model: rules.writerModel,
    audit,
    sourceSnapshot: research.sources,
  });
  const result = await step('cms ingest', () => ingestDraft(draft, `${brief.keywordId}:${BLOG_PROMPT_VERSION}`));

  const { iso, month } = slugToTitleDate();
  const links = countLinks(draft.contentMarkdown);
  let blogId: string | undefined;
  const keywordRow = options.keywordRow;
  if (keywordRow) {
    blogId = await step('sheet write-back', async () => appendPublishedBlogRow({
      targetDate: iso,
      month,
      keyword: brief.keyword,
      title: article.title,
      slug: article.slug,
      draftDocLink: doc.url,
      cmsDraftId: result.postId ?? '',
      cluster: keywordRow.cluster,
      clusterRole: keywordRow.clusterRole,
      contentAudience: brief.audience,
      internalLinks: links.internal,
      externalLinks: links.external,
      faqCount: article.faqs.length,
      auditScore: audit.score,
      blockerCount: audit.blockerCount,
      warningCount: audit.warningCount,
      generationRunId,
      promptVersion: BLOG_PROMPT_VERSION,
      notes: 'Awaiting human review in the Blog Drafts folder.',
    }));
    updateKeywordStatus(keywordRow, 'Draft Created', iso, `Doc: ${doc.url}`);
  }

  return { status: 'created' as const, generationRunId, blogId, draft, audit, research, images, doc, result };
}
