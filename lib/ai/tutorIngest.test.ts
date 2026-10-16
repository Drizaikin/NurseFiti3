import { describe, it, expect } from 'vitest';
import { sanitizeTitle, chunkText, extractTextFromBuffer } from './tutorIngest';

describe('tutorIngest', () => {
  describe('sanitizeTitle', () => {
    it('uses provided title if trimmed non-empty', () => {
      expect(sanitizeTitle('file.pdf', '  Medical Surgical Nursing  ')).toBe('Medical Surgical Nursing');
    });

    it('derives human title from filename when title is empty or missing', () => {
      expect(sanitizeTitle('brunner_and_suddarth_14th_ed.pdf', null)).toBe('brunner and suddarth 14th ed');
      expect(sanitizeTitle('pharmacology-study-guide.docx', '')).toBe('pharmacology study guide');
    });

    it('falls back to Untitled textbook if filename has no letters', () => {
      expect(sanitizeTitle('.pdf', '')).toBe('Untitled textbook');
    });
  });

  describe('chunkText', () => {
    it('returns empty array for empty or whitespace text', () => {
      expect(chunkText('')).toEqual([]);
      expect(chunkText('   \n\n  ')).toEqual([]);
    });

    it('creates chunks within maxChars limit', () => {
      const sample = 'Clinical nursing requires careful patient assessment. '.repeat(50);
      const chunks = chunkText(sample, 500, 50);
      expect(chunks.length).toBeGreaterThan(1);
      for (const chunk of chunks) {
        expect(chunk.length).toBeLessThanOrEqual(500);
        expect(chunk.length).toBeGreaterThan(40);
      }
    });

    it('ensures chunk boundary does not loop infinitely on unbroken text', () => {
      const unbroken = 'A'.repeat(3000);
      const chunks = chunkText(unbroken, 500, 50);
      expect(chunks.length).toBeGreaterThan(1);
    });
  });

  describe('extractTextFromBuffer', () => {
    it('extracts plain text and removes UTF-8 BOM', async () => {
      const buffer = Buffer.from('\uFEFFHello World from NurseFiti Text');
      const text = await extractTextFromBuffer(buffer, 'notes.txt');
      expect(text).toBe('Hello World from NurseFiti Text');
    });
  });
});
