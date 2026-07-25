import { describe, expect, it } from 'vitest';
import { automationDraftToBlogRow, hashDraftRequest } from './ingest';
import type { AutomationDraft } from './schemas';

const draft = {
  slug: 'safe-automation-draft',
  title: 'A Safe Automation Draft for NurseFiti Students',
  excerpt: 'A sufficiently detailed excerpt for testing the draft-only automation boundary safely.',
  contentMarkdown: 'Safe educational draft content. '.repeat(10),
  category: 'Study Guide',
  cadres: [],
  featured: false,
  heroImageUrl: 'https://www.nursefiti.co.ke/images/blog/safe-automation-draft-hero.png',
  heroImageAlt: 'A nursing student reading a study guide at a desk',
  heroScene: 'a nursing student reading a printed study guide at a desk in a college library',
  heroFraming: 'close detail shot of hands and the key object',
  infographicTitle: 'Five Safe Draft Checks',
  draftDocUrl: 'https://docs.google.com/document/d/abc123/edit',
  authorName: 'NurseFiti Editorial Team',
  reviewerName: null,
  seoTitle: null,
  seoDescription: null,
  primaryKeyword: 'safe automation draft',
  faqs: Array.from({ length: 8 }, (_, index) => ({ question: `What is safe question ${index + 1}?`, answer: 'This is a safe educational answer.' })),
  sources: [1, 2, 3].map(index => ({ label: `Source ${index}`, url: `https://example${index}.com/source` })),
  keywordId: 'NF-KW-999',
  generationRunId: 'run-12345678',
  promptVersion: 'test-v1',
  model: 'test-model',
  audit: { score: 100, blockerCount: 0, warningCount: 0, findings: [] },
  sourceSnapshot: [1, 2, 3].map(index => ({ label: `Source ${index}`, url: `https://example${index}.com/source` })),
} satisfies AutomationDraft;

describe('automation draft ingestion helpers', () => {
  it('always maps automation content to an unpublished, unfeatured draft', () => {
    const row = automationDraftToBlogRow(draft);
    expect(row.status).toBe('draft');
    expect(row.published_at).toBeNull();
    expect(row.featured).toBe(false);
  });

  it('creates a stable payload hash and changes it when content changes', () => {
    expect(hashDraftRequest(draft)).toBe(hashDraftRequest({ ...draft }));
    expect(hashDraftRequest(draft)).not.toBe(hashDraftRequest({ ...draft, title: `${draft.title} changed` }));
  });
});
