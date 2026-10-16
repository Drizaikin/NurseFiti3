import { describe, it, expect } from 'vitest';
import { chunkClientText } from './localTutorStore';

describe('localTutorStore: chunkClientText', () => {
  it('returns empty array when text is empty or blank', () => {
    expect(chunkClientText('')).toEqual([]);
    expect(chunkClientText('   \n\n  \t ')).toEqual([]);
  });

  it('chunks short text without splitting when under maxChars', () => {
    const text = 'Cardiovascular assessment involves inspection, palpation, percussion, and auscultation of heart sounds S1 and S2.';
    const chunks = chunkClientText(text, 1400, 200);
    expect(chunks.length).toBe(1);
    expect(chunks[0]).toBe(text);
  });

  it('splits long text into overlapping chunks respecting word boundaries', () => {
    const paragraph = 'Nursing interventions for hypertensive crisis require immediate medication administration and continuous monitoring of vital signs. '.repeat(20);
    const chunks = chunkClientText(paragraph, 300, 50);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(350);
      expect(chunk.length).toBeGreaterThan(30);
    }
  });

  it('normalizes carriage returns and multiple consecutive whitespaces', () => {
    const messy = 'Normal   saline   0.9% \r\n\r\n\r\n\r\nis an isotonic crystalloid solution used for fluid resuscitation.';
    const chunks = chunkClientText(messy, 1000);
    expect(chunks.length).toBe(1);
    expect(chunks[0]).toContain('Normal saline 0.9%');
    expect(chunks[0]).not.toContain('\r');
  });

  it('safely returns empty array in non-browser environment for searchLocalChunks', async () => {
    const { searchLocalChunks } = await import('./localTutorStore');
    const results = await searchLocalChunks('hypertension management');
    expect(results).toEqual([]);
  });
});
