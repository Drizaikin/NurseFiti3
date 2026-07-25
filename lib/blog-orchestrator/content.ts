import type { AuditReport, GeneratedArticle, KeywordBrief } from './schemas';

/** Pulls the 5 bullets out of the Key Takeaways section so the infographic mirrors the article. */
export function extractKeyTakeaways(markdown: string) {
  const lines = markdown.split('\n');
  const start = lines.findIndex(line => /^##\s+Key Takeaways\s*$/i.test(line.trim()));
  if (start < 0) return [];
  const takeaways: string[] = [];
  for (let index = start + 1; index < lines.length; index++) {
    const line = lines[index].trim();
    if (line.startsWith('## ')) break;
    if (line.startsWith('- ')) takeaways.push(line.slice(2).replace(/\*\*/g, '').trim());
  }
  return takeaways;
}

/** Inserts the infographic immediately after the Key Takeaways block, or before the next H2. */
export function insertImageAfterTakeaways(markdown: string, imageMarkdown: string) {
  const lines = markdown.split('\n');
  const start = lines.findIndex(line => /^##\s+Key Takeaways\s*$/i.test(line.trim()));
  if (start < 0) return `${markdown.trim()}\n\n${imageMarkdown}\n`;

  let insertAt = lines.length;
  let sawBullet = false;
  for (let index = start + 1; index < lines.length; index++) {
    const line = lines[index].trim();
    if (line.startsWith('- ')) { sawBullet = true; continue; }
    if (line.startsWith('## ') || (sawBullet && line && !line.startsWith('- '))) { insertAt = index; break; }
  }
  const next = [...lines.slice(0, insertAt), '', imageMarkdown, ''].concat(lines.slice(insertAt));
  return next.join('\n').replace(/\n{3,}/g, '\n\n');
}

export function imageMarkdown(url: string, alt: string, width = 468, height = 263) {
  return `![${alt}](${url}){width=${width} height=${height}}`;
}

/** Strips gogcli image sizing hints, which the CMS renderer does not need. */
export function stripImageSizing(markdown: string) {
  return markdown.replace(/(!\[[^\]]*\]\([^)]+\))\{width=\d+ height=\d+\}/g, '$1');
}

export function countLinks(markdown: string) {
  const links = markdown.match(/\[[^\]]+\]\((https?:\/\/[^)]+|\/[^)]*)\)/g) ?? [];
  let internal = 0;
  let external = 0;
  for (const link of links) {
    const href = /\(([^)]+)\)$/.exec(link)?.[1] ?? '';
    if (href.startsWith('/') || href.includes('nursefiti.co.ke')) internal++;
    else external++;
  }
  return { internal, external };
}

export function slugToTitleDate(date = new Date()) {
  return { iso: date.toISOString().slice(0, 10), month: date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) };
}

/**
 * Assembles the review Google Doc: reviewer header block, the article, then the audit trail.
 * Images arrive as public HTTPS URLs so gogcli can inline them during import.
 */
export function buildDocMarkdown(input: {
  article: GeneratedArticle;
  brief: KeywordBrief;
  audit: AuditReport;
  heroMarkdown: string;
  contentMarkdown: string;
  generationRunId: string;
  model: string;
  promptVersion: string;
  cmsDraftId?: string;
  date?: Date;
}) {
  const { iso } = slugToTitleDate(input.date);
  const findings = input.audit.findings.length === 0
    ? '- No findings.'
    : input.audit.findings.map(finding => `- **${finding.severity.toUpperCase()}** ${finding.code}: ${finding.message}`).join('\n');

  return `# ${input.article.title}

**Status:** DRAFT — not published. A NurseFiti admin is the only publisher.
**Keyword:** ${input.brief.keyword} (${input.brief.keywordId})
**Cluster:** ${input.brief.cluster} · **Audience:** ${input.brief.audience}
**Slug:** /blog/${input.article.slug}
**SEO title:** ${input.article.seoTitle ?? input.article.title}
**Meta description:** ${input.article.seoDescription ?? ''}
**Author:** ${input.article.authorName}${input.article.reviewerName ? ` · **Reviewer:** ${input.article.reviewerName}` : ' · **Reviewer:** none assigned'}
*Last Updated: ${iso}*

${input.heroMarkdown}

${input.contentMarkdown.trim()}

## Frequently Asked Questions

${input.article.faqs.map(faq => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')}

## Sources

${input.article.sources.map(source => `- [${source.label}](${source.url})`).join('\n')}

## Review Trail

- **Audit score:** ${input.audit.score}/100 · **Blockers:** ${input.audit.blockerCount} · **Warnings:** ${input.audit.warningCount}
${findings}
- **Generation run:** ${input.generationRunId}
- **Model:** ${input.model} · **Prompt:** ${input.promptVersion}
- **CMS draft:** ${input.cmsDraftId ?? 'not ingested'}

*Generated ${iso} · NurseFiti blog orchestrator · draft only, publishing is technically prohibited for automation.*
`;
}
