/**
 * Shared helpers for the AI Tutor knowledge base.
 */

export interface TutorChunk {
  content: string;
  index: number;
}

const STORAGE_BUCKET = 'ai-tutor-materials';

export { STORAGE_BUCKET };

export function sanitizeTitle(fileName: string, provided?: string | null): string {
  const trimmed = (provided ?? '').trim();
  if (trimmed) return trimmed;
  return fileName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || 'Untitled textbook';
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith('.pdf')) {
    const imported: any = await import('pdf-parse');
    const pdfParse = imported?.default ?? imported;
    const result = await pdfParse(buffer);
    return String(result?.text ?? '');
  }

  if (name.endsWith('.docx') || name.endsWith('.doc')) {
    const imported: any = await import('mammoth');
    const mammoth = imported?.default ?? imported;
    const result = await mammoth.extractRawText({ buffer });
    return String(result?.value ?? '');
  }

  // Plain text / markdown / csv
  return buffer.toString('utf-8');
}

export function chunkText(text: string, maxChars = 1500, overlap = 250): string[] {
  const cleaned = String(text ?? '')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!cleaned) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < cleaned.length) {
    let end = Math.min(start + maxChars, cleaned.length);

    if (end < cleaned.length) {
      const lastBreak = cleaned.lastIndexOf(' ', end);
      if (lastBreak > start + Math.floor(maxChars * 0.5)) {
        end = lastBreak;
      }
    }

    const part = cleaned.slice(start, end).trim();
    if (part.length > 40) {
      chunks.push(part);
    }

    if (end >= cleaned.length) break;
    start = Math.max(0, end - overlap);
    if (start >= cleaned.length) break;
  }

  return chunks;
}
