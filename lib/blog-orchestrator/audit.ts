import { highRiskMatcher, phraseMatcher, type AutomationRules } from '@/lib/blog-automation/rules';
import { extractKeyTakeaways } from './content';
import type { AuditReport, GeneratedArticle, KeywordBrief, ResearchResult } from './schemas';

export function auditGeneratedArticle(
  article: GeneratedArticle,
  brief: KeywordBrief,
  research: ResearchResult,
  rules: AutomationRules,
): AuditReport {
  const findings: AuditReport['findings'] = [];
  const add = (severity: 'blocker' | 'warning', code: string, message: string) => findings.push({ severity, code, message });
  const wordCount = article.contentMarkdown.split(/\s+/).filter(Boolean).length;
  const sourceUrls = new Set(research.sources.map(source => source.url));
  const articleSourceUrls = new Set(article.sources.map(source => source.url));

  if (article.primaryKeyword?.toLowerCase() !== brief.keyword.toLowerCase()) add('blocker', 'primary-keyword', 'The primary keyword does not match the approved keyword.');
  if (wordCount < rules.wordCountMin) add('blocker', 'word-count-low', `Article has ${wordCount} words; at least ${rules.wordCountMin.toLocaleString('en-KE')} are required.`);
  if (wordCount > rules.wordCountMax) add('warning', 'word-count-high', `Article has ${wordCount} words; remove padding before review.`);
  if (rules.requireTldr && !/\b(TL;DR|TLDR)\b/i.test(article.contentMarkdown.slice(0, 500))) add('blocker', 'missing-tldr', 'A visible TLDR is required near the top.');

  for (const section of rules.requiredSections) {
    const heading = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'im');
    if (!heading.test(article.contentMarkdown)) {
      add('blocker', 'missing-section', `A "${section}" section is required.`);
      continue;
    }
    // The infographic renders these bullets, so the count is a hard requirement.
    if (/key takeaways/i.test(section)) {
      const takeaways = extractKeyTakeaways(article.contentMarkdown);
      if (takeaways.length !== rules.takeawayCount) {
        add('blocker', 'takeaway-count', `${section} has ${takeaways.length} bullets; exactly ${rules.takeawayCount} are required.`);
      }
    }
  }

  if (article.faqs.length !== rules.faqCount) add('blocker', 'faq-count', `Article has ${article.faqs.length} FAQs; exactly ${rules.faqCount} are required.`);
  if (article.seoDescription && (article.seoDescription.length < rules.metaDescriptionMin || article.seoDescription.length > rules.metaDescriptionMax)) {
    add('warning', 'meta-length', `SEO description should be ${rules.metaDescriptionMin}-${rules.metaDescriptionMax} characters.`);
  }
  if (article.sources.some(source => !sourceUrls.has(source.url))) add('blocker', 'unverified-source', 'Every article source must come from the captured research set.');
  if (articleSourceUrls.size !== article.sources.length) add('blocker', 'duplicate-source', 'Each cited source URL must be unique.');
  if (articleSourceUrls.size < rules.minSourcesGeneral) add('blocker', 'source-count', `Article cites ${articleSourceUrls.size} unique sources; at least ${rules.minSourcesGeneral} are required.`);
  if ((article.reviewerName ?? null) !== (brief.reviewerName ?? null)) add('blocker', 'unapproved-reviewer', 'The reviewer must exactly match the approved reviewer in the keyword brief.');

  const fullText = `${article.title}\n${article.excerpt}\n${article.contentMarkdown}`;
  const bannedClaim = phraseMatcher(rules.bannedClaims);
  if (bannedClaim?.test(fullText)) add('blocker', 'banned-claim', 'The draft contains a prohibited or unsupported marketing claim.');
  const bannedPhrase = phraseMatcher(rules.bannedPhrases);
  const phraseHit = bannedPhrase ? bannedPhrase.exec(fullText) : null;
  if (phraseHit) add('warning', 'banned-phrase', `The draft uses a discouraged phrase: "${phraseHit[0]}".`);
  if (!rules.allowRawHtml && /<[a-z][\s\S]*>/i.test(article.contentMarkdown)) add('blocker', 'raw-html', 'Raw HTML is not allowed in CMS Markdown.');

  const highRisk = highRiskMatcher(rules.highRiskTerms);
  if (highRisk?.test(`${brief.keyword} ${brief.title}`)) {
    if (articleSourceUrls.size < rules.minSourcesClinical) add('blocker', 'high-risk-sources', `Clinical or regulatory topics require at least ${rules.minSourcesClinical} unique sources.`);
    if (rules.requireReviewerForHighRisk && !brief.reviewerName) add('blocker', 'reviewer-required', 'A named approved reviewer is required in the brief for this clinical or regulatory topic.');
  }

  const blockerCount = findings.filter(finding => finding.severity === 'blocker').length;
  const warningCount = findings.length - blockerCount;
  return { score: Math.max(0, 100 - blockerCount * 20 - warningCount * 5), blockerCount, warningCount, findings };
}
