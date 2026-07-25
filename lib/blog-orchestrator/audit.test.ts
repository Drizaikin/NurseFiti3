import { describe, expect, it } from 'vitest';
import { auditGeneratedArticle } from './audit';
import { automationRulesSchema, type AutomationRules } from '@/lib/blog-automation/rules';
import type { GeneratedArticle, KeywordBrief, ResearchResult } from './schemas';

// Mirrors the migration defaults so the tests exercise the shipped ruleset.
const rules: AutomationRules = automationRulesSchema.parse({
  version: 1, wordCountMin: 1400, wordCountMax: 3000, takeawayCount: 5, faqCount: 8,
  minSourcesGeneral: 3, minSourcesClinical: 5, metaDescriptionMin: 130, metaDescriptionMax: 160,
  tldrMinWords: 25, tldrMaxWords: 45, auditPassScore: 85,
  requireTldr: true, requireReviewerForHighRisk: true, allowRawHtml: false,
  bannedClaims: ['guaranteed pass', 'nck approved', 'examiner written', 'exact digiproctor replica', '100% success'],
  bannedPhrases: ['delve', 'leverage', 'robust', 'tapestry', 'testament to'],
  requiredSections: ['Key Takeaways'],
  highRiskTerms: ['nck', 'licence', 'license', 'registration', 'cpd', 'clinical', 'medicine', 'medication', 'pharmacology', 'maternal', 'immunisation', 'mental health', 'procedure', 'dosage', 'treatment'],
  voiceNotes: 'Kenyan English, evidence-led.', extraInstructions: '',
  writerModel: 'moonshotai/kimi-k3', temperature: 0.3,
});

const brief: KeywordBrief = {
  keywordId: 'NF-KW-001', keyword: 'nursing study methods', title: 'Nursing Study Methods That Improve Retention',
  cluster: 'Study Skills', audience: 'nursing-student', cadres: [], reviewerName: null,
};
const research: ResearchResult = {
  questions: [],
  sources: [1, 2, 3].map(index => ({ label: `Source ${index}`, url: `https://example${index}.com/article`, domain: `example${index}.com`, snippet: '' })),
};
const content = `Direct answer for nursing students.\n\n**TLDR:** A focused study routine combines active recall, spaced review and practice questions with rest.\n\n## What works?\n\n${'Evidence-based explanation for nursing students improves safe learning. '.repeat(220)}\n\n## Key Takeaways\n\n- One\n- Two\n- Three\n- Four\n- Five`;
const article: GeneratedArticle = {
  slug: 'nursing-study-methods', title: brief.title, excerpt: 'A practical evidence-led guide to nursing study methods that improve retention and reduce unproductive cramming.',
  contentMarkdown: content, category: 'Study Guide', cadres: [], featured: false,
  heroScene: 'a nursing student reviewing flashcards at a shared hostel study table with a classmate',
  heroFraming: 'two-shot of two people mid-conversation at eye level',
  heroImageAlt: 'Two Kenyan nursing students reviewing flashcards together at a study table',
  infographicTitle: 'Five Study Methods That Improve Retention',
  authorName: 'NurseFiti Editorial Team', reviewerName: null, seoTitle: brief.title,
  seoDescription: 'Learn practical nursing study methods using active recall, spaced review and focused practice to retain more without relying on last-minute cramming.',
  primaryKeyword: brief.keyword, faqs: Array.from({ length: 8 }, (_, index) => ({ question: `What is study method ${index + 1}?`, answer: 'It is a structured evidence-based approach for nursing students.' })),
  sources: research.sources.map(({ label, url }) => ({ label, url })),
};

describe('auditGeneratedArticle', () => {
  it('passes a complete low-risk article', () => {
    const report = auditGeneratedArticle(article, brief, research, rules);
    expect(report.blockerCount).toBe(0);
    expect(report.score).toBeGreaterThanOrEqual(85);
  });

  it('blocks invented sources and prohibited claims', () => {
    const report = auditGeneratedArticle({
      ...article,
      contentMarkdown: `${article.contentMarkdown}\nGuaranteed pass.`,
      sources: [{ label: 'Invented', url: 'https://invented.example/source' }, ...article.sources.slice(1)],
    }, brief, research, rules);
    expect(report.findings.map(finding => finding.code)).toEqual(expect.arrayContaining(['unverified-source', 'banned-claim']));
  });

  it('blocks high-risk topics without five sources and a reviewer', () => {
    const report = auditGeneratedArticle(article, { ...brief, keyword: 'nck licence renewal' }, research, rules);
    expect(report.findings.map(finding => finding.code)).toEqual(expect.arrayContaining(['high-risk-sources', 'reviewer-required']));
  });

  it('blocks duplicate sources and reviewer names that were not approved in the brief', () => {
    const report = auditGeneratedArticle({
      ...article,
      reviewerName: 'Invented Reviewer',
      sources: [article.sources[0], article.sources[0], article.sources[1]],
    }, brief, research, rules);
    expect(report.findings.map(finding => finding.code)).toEqual(expect.arrayContaining(['duplicate-source', 'unapproved-reviewer']));
  });
});

describe('rules changes take effect on the next audit', () => {
  const codes = (report: { findings: Array<{ code: string }> }) => report.findings.map(finding => finding.code);

  it('blocks a previously passing article when the word minimum is raised', () => {
    expect(auditGeneratedArticle(article, brief, research, rules).blockerCount).toBe(0);
    const stricter = { ...rules, wordCountMin: 5000 };
    expect(codes(auditGeneratedArticle(article, brief, research, stricter))).toContain('word-count-low');
  });

  it('blocks when the takeaway count no longer matches', () => {
    expect(codes(auditGeneratedArticle(article, brief, research, { ...rules, takeawayCount: 7 }))).toContain('takeaway-count');
  });

  it('blocks when the FAQ count no longer matches', () => {
    expect(codes(auditGeneratedArticle(article, brief, research, { ...rules, faqCount: 10 }))).toContain('faq-count');
  });

  it('applies a newly added banned claim', () => {
    const withClaim = { ...rules, bannedClaims: [...rules.bannedClaims, 'active recall'] };
    expect(codes(auditGeneratedArticle(article, brief, research, withClaim))).toContain('banned-claim');
  });

  it('warns on a newly added discouraged phrase', () => {
    const withPhrase = { ...rules, bannedPhrases: [...rules.bannedPhrases, 'spaced review'] };
    const report = auditGeneratedArticle(article, brief, research, withPhrase);
    expect(codes(report)).toContain('banned-phrase');
    expect(report.blockerCount).toBe(0);
  });

  it('drops the reviewer blocker when the reviewer rule is switched off', () => {
    const clinicalBrief = { ...brief, keyword: 'nck licence renewal' };
    expect(codes(auditGeneratedArticle(article, clinicalBrief, research, rules))).toContain('reviewer-required');
    const relaxed = { ...rules, requireReviewerForHighRisk: false };
    expect(codes(auditGeneratedArticle(article, clinicalBrief, research, relaxed))).not.toContain('reviewer-required');
  });

  it('stops treating a topic as high risk once its term is removed', () => {
    const clinicalBrief = { ...brief, keyword: 'nck licence renewal' };
    const withoutTerms = { ...rules, highRiskTerms: ['maternal'] };
    const report = auditGeneratedArticle(article, clinicalBrief, research, withoutTerms);
    expect(codes(report)).not.toContain('high-risk-sources');
    expect(codes(report)).not.toContain('reviewer-required');
  });

  it('enforces an added required section', () => {
    const withSection = { ...rules, requiredSections: [...rules.requiredSections, 'People Also Read'] };
    expect(codes(auditGeneratedArticle(article, brief, research, withSection))).toContain('missing-section');
  });
});
