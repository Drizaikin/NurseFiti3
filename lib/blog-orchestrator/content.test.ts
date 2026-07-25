import { describe, expect, it } from 'vitest';
import {
  countLinks, extractKeyTakeaways, imageMarkdown,
  insertImageAfterTakeaways, stripImageSizing,
} from './content';
import { nextBlogId, parseKeywordRow, publishedBlogRowValues, isKeywordReady } from './keywordSheet';
import { buildInfographicPrompt, imageFilename } from './images';
import { draftDocTitle } from './gdoc';

const takeawaysMarkdown = `## Key Takeaways

- **First** point about registration.
- Second point.
- Third point.
- Fourth point.
- Fifth point.

Each of these five steps matters.

## Next section

Body copy.`;

describe('extractKeyTakeaways', () => {
  it('returns the five bullets without bold markers', () => {
    expect(extractKeyTakeaways(takeawaysMarkdown)).toEqual([
      'First point about registration.', 'Second point.', 'Third point.', 'Fourth point.', 'Fifth point.',
    ]);
  });

  it('returns nothing when the section is missing', () => {
    expect(extractKeyTakeaways('## Something Else\n\n- One')).toEqual([]);
  });
});

describe('insertImageAfterTakeaways', () => {
  it('places the image straight after the bullet list', () => {
    const output = insertImageAfterTakeaways(takeawaysMarkdown, '![alt](https://example.com/a.png)');
    const lines = output.split('\n').filter(Boolean);
    const bulletIndex = lines.findIndex(line => line.startsWith('- Fifth'));
    expect(lines[bulletIndex + 1]).toBe('![alt](https://example.com/a.png)');
  });

  it('appends when there is no Key Takeaways section', () => {
    expect(insertImageAfterTakeaways('## Intro\n\nBody.', '![a](https://example.com/a.png)'))
      .toContain('Body.\n\n![a](https://example.com/a.png)');
  });
});

describe('markdown helpers', () => {
  it('emits gogcli sizing hints and strips them again', () => {
    const markdown = imageMarkdown('https://example.com/a.png', 'Alt text');
    expect(markdown).toBe('![Alt text](https://example.com/a.png){width=468 height=263}');
    expect(stripImageSizing(markdown)).toBe('![Alt text](https://example.com/a.png)');
  });

  it('separates internal from external links', () => {
    const markdown = '[a](/blog/x) [b](https://www.nursefiti.co.ke/pricing) [c](https://nursingcouncil.or.ke)';
    expect(countLinks(markdown)).toEqual({ internal: 2, external: 1 });
  });
});

describe('keyword sheet mapping', () => {
  const headers = ['keyword_id', 'keyword', 'title', 'cluster_name', 'status', 'content_audience', 'paa_questions', 'top_3_competitors', 'cluster_role'];
  const row = [
    'NF-KW-036', 'nursing student burnout', 'Nursing Student Burnout: Early Signs and a Practical Recovery Plan',
    'Student Realities', 'Pending Review', 'nursing-student', 'How to deal with burnout? ; What causes it?', 'pmc.ncbi.nlm.nih.gov ; sciencedirect.com', 'Pillar',
  ];

  it('builds a valid brief from a sheet row', () => {
    const parsed = parseKeywordRow(headers, row, 37);
    expect(parsed.brief.keywordId).toBe('NF-KW-036');
    expect(parsed.brief.audience).toBe('nursing-student');
    expect(parsed.brief.reviewerName).toBeNull();
    expect(parsed.paaQuestions).toHaveLength(2);
    expect(parsed.competitors).toEqual(['pmc.ncbi.nlm.nih.gov', 'sciencedirect.com']);
    expect(parsed.rowNumber).toBe(37);
  });

  it('falls back to nursing-student for an unrecognised audience', () => {
    const parsed = parseKeywordRow(headers, [...row.slice(0, 5), 'everyone', ...row.slice(6)], 37);
    expect(parsed.brief.audience).toBe('nursing-student');
  });

  it('treats queueable statuses as ready', () => {
    expect(isKeywordReady('Pending Review')).toBe(true);
    expect(isKeywordReady('Draft Created')).toBe(false);
  });

  it('increments the blog id and writes 24 columns', () => {
    expect(nextBlogId(['NF-001', 'NF-018', 'NF-007'])).toBe('NF-019');
    expect(nextBlogId([])).toBe('NF-001');
    const values = publishedBlogRowValues({
      blogId: 'NF-019', targetDate: '2026-07-25', month: 'Jul 2026', keyword: 'k', title: 't', slug: 's',
      draftDocLink: 'https://docs.google.com/document/d/abc/edit', cmsDraftId: 'uuid', cluster: 'c', clusterRole: 'Pillar',
      contentAudience: 'nursing-student', internalLinks: 2, externalLinks: 4, faqCount: 8,
      auditScore: 95, blockerCount: 0, warningCount: 1, generationRunId: 'run', promptVersion: 'v2', notes: 'n',
    });
    expect(values).toHaveLength(24);
    expect(values[3]).toBe('Draft');
    expect(values[4]).toBe('CMS Draft');
  });
});

describe('image and doc naming', () => {
  it('builds SEO filenames capped at five slug words', () => {
    expect(imageFilename('nursing-student-burnout-early-signs-recovery-plan', 'hero'))
      .toBe('nursing-student-burnout-early-signs-hero.png');
    expect(imageFilename('nck-exam-anxiety', 'infographic')).toBe('nck-exam-anxiety-key-takeaways.png');
  });

  it('never omits the DRAFT marker from the doc title', () => {
    expect(draftDocTitle('NF-KW-036', 'A Title')).toBe('DRAFT NF-KW-036 — A Title');
  });

  it('numbers infographic points and keeps hex codes out of the prompt', () => {
    const prompt = buildInfographicPrompt('Five Steps', ['One', 'Two', 'Three', 'Four', 'Five']);
    expect(prompt).toContain('5 numbered items');
    expect(prompt).toContain('5. Five');
    expect(prompt).not.toMatch(/#[0-9A-Fa-f]{6}/);
  });
});
