import { z } from 'zod';
import { blogHeroImageUrlSchema, blogPostFieldsSchema } from '@/lib/blog/validation';

const sourceSchema = z.object({
  label: z.string().trim().min(2).max(200),
  url: z.string().url().refine(value => ['http:', 'https:'].includes(new URL(value).protocol)),
});

export const keywordBriefSchema = z.object({
  keywordId: z.string().trim().min(3).max(100),
  keyword: z.string().trim().min(3).max(100),
  title: z.string().trim().min(10).max(120),
  cluster: z.string().trim().min(2).max(100),
  audience: z.enum(['prospective-student', 'nursing-student', 'licensed-nurse']),
  cadres: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  reviewerName: z.string().trim().min(2).max(100).optional().nullable(),
});

export type KeywordBrief = z.infer<typeof keywordBriefSchema>;

export const researchResultSchema = z.object({
  questions: z.array(z.string().trim().min(5).max(250)).max(10),
  sources: z.array(sourceSchema.extend({
    snippet: z.string().trim().max(1000).default(''),
    domain: z.string().trim().min(1).max(200),
  })).min(3).max(10),
});

export type ResearchResult = z.infer<typeof researchResultSchema>;

export const HERO_FRAMINGS = [
  'wide environment shot with the subjects small in frame',
  'two-shot of two people mid-conversation at eye level',
  'over-the-shoulder view of what the subject is looking at',
  'close detail shot of hands and the key object',
  'elevated top-down shot of the table or workspace',
] as const;

/**
 * heroImageUrl is omitted on purpose: the model must never invent an image URL.
 * The image pipeline generates the file and sets the URL on the ingest draft.
 */
export const generatedArticleSchema = blogPostFieldsSchema.omit({
  status: true,
  publishedAt: true,
  expectedUpdatedAt: true,
  heroImageUrl: true,
  heroImageAlt: true,
}).extend({
  contentMarkdown: z.string().trim().min(100).max(40000),
  featured: z.literal(false).default(false),
  faqs: z.array(z.object({
    question: z.string().trim().min(5).max(200),
    answer: z.string().trim().min(10).max(1000),
  })).length(8),
  sources: z.array(sourceSchema).min(3).max(20),
  heroScene: z.string().trim().min(20).max(300),
  heroFraming: z.enum(HERO_FRAMINGS),
  heroImageAlt: z.string().trim().min(10).max(180),
  infographicTitle: z.string().trim().min(6).max(80),
});

export type GeneratedArticle = z.infer<typeof generatedArticleSchema>;

const auditFindingSchema = z.object({
  severity: z.enum(['blocker', 'warning']),
  code: z.string().min(1).max(80),
  message: z.string().min(1).max(500),
});

export const auditReportSchema = z.object({
  score: z.number().int().min(0).max(100),
  blockerCount: z.number().int().min(0),
  warningCount: z.number().int().min(0),
  findings: z.array(auditFindingSchema).max(100),
}).superRefine((report, ctx) => {
  const blockers = report.findings.filter(finding => finding.severity === 'blocker').length;
  const warnings = report.findings.length - blockers;
  if (report.blockerCount !== blockers || report.warningCount !== warnings) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Audit finding counts do not match the findings list' });
  }
});

export type AuditReport = z.infer<typeof auditReportSchema>;

export const automationDraftSchema = generatedArticleSchema.extend({
  keywordId: z.string().trim().min(3).max(100),
  heroImageUrl: blogHeroImageUrlSchema,
  draftDocUrl: z.string().url().refine(value => value.startsWith('https://docs.google.com/document/d/'), {
    message: 'draftDocUrl must be a Google Docs URL',
  }).optional(),
  generationRunId: z.string().trim().min(8).max(100),
  promptVersion: z.string().trim().min(1).max(50),
  model: z.string().trim().min(1).max(100),
  audit: auditReportSchema.refine(report => report.blockerCount === 0 && report.score >= 85, {
    message: 'Only drafts with zero blockers and an audit score of at least 85 can be ingested',
  }),
  sourceSnapshot: z.array(sourceSchema.extend({
    snippet: z.string().trim().max(1000).optional(),
    domain: z.string().trim().max(200).optional(),
  })).min(3).max(20),
});

export type AutomationDraft = z.infer<typeof automationDraftSchema>;
