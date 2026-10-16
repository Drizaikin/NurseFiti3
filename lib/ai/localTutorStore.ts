'use client';

/**
 * Client-Side Local Material Storage & Search Engine
 * 
 * Enables students to index and query their personal study notes & textbooks
 * 100% inside their browser (IndexedDB). Zero bytes stored in Supabase database
 * or storage quotas unless explicitly shared with Admin for platform curation.
 */

export interface LocalMaterial {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  chunkCount: number;
  createdAt: string;
  sharedWithAdmin: boolean;
  remoteId?: string;
}

export interface LocalChunk {
  id: string;
  materialId: string;
  materialTitle: string;
  chunkIndex: number;
  content: string;
}

const DB_NAME = 'NurseFiti_Local_Materials';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('materials')) {
        db.createObjectStore('materials', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('chunks')) {
        const chunkStore = db.createObjectStore('chunks', { keyPath: 'id' });
        chunkStore.createIndex('materialId', 'materialId', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const loadedScripts = new Map<string, Promise<void>>();

/**
 * Loads a script safely into the document once without race conditions.
 */
function loadScript(src: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (loadedScripts.has(src)) return loadedScripts.get(src)!;

  const promise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if ((existing as any).dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)));
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      (script as any).dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      loadedScripts.delete(src);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });

  loadedScripts.set(src, promise);
  return promise;
}

/**
 * Client-side text extraction for PDF, DOCX, TXT, and MD files.
 */
export async function extractTextFromClientFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  // Plain text / Markdown
  if (['txt', 'md', 'csv'].includes(ext)) {
    const text = await file.text();
    return text.replace(/^\uFEFF/, '').trim();
  }

  // Older .doc binary format check
  if (ext === 'doc') {
    throw new Error('Older .doc Word files are not supported. Please save or export your document as .docx or .pdf before uploading.');
  }

  // PDF extraction via local pdfjs in /public/vendor/pdfjs/
  if (ext === 'pdf') {
    if (!(window as any).pdfjsLib) {
      await loadScript('/vendor/pdfjs/pdf.min.js');
    }
    const pdfjs = (window as any).pdfjsLib;
    if (!pdfjs) throw new Error('Could not load PDF reader.');

    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';

    let pdf: any;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      pdf = await loadingTask.promise;
    } catch (pdfErr: any) {
      if (pdfErr?.name === 'PasswordException') {
        throw new Error('This PDF is password-protected. Please upload an unlocked PDF.');
      }
      throw new Error(`Failed to open PDF document: ${pdfErr?.message || 'Invalid or corrupted PDF'}`);
    }

    let fullText = '';
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .filter(Boolean);
        fullText += pageStrings.join(' ') + '\n\n';
      } catch (pageErr) {
        console.warn(`[localTutorStore] Skipping unreadable page ${pageNum}:`, pageErr);
      }
    }

    const cleaned = fullText.trim();
    if (!cleaned) {
      throw new Error(
        'No readable text found in this PDF. If it is a scanned image-only PDF, please use an OCR-processed copy or a text document.'
      );
    }
    return cleaned;
  }

  // Word (.docx) extraction via local mammoth in /public/vendor/mammoth/
  if (ext === 'docx') {
    if (!(window as any).mammoth) {
      await loadScript('/vendor/mammoth/mammoth.browser.min.js');
    }
    const mammoth = (window as any).mammoth;
    if (!mammoth) throw new Error('Could not load Word document reader.');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const cleaned = (result?.value || '').trim();
      if (!cleaned) throw new Error('Could not extract readable text from this Word document.');
      return cleaned;
    } catch (wordErr: any) {
      throw new Error(`Failed to read Word document: ${wordErr?.message || 'Invalid or corrupted file'}`);
    }
  }

  // Fallback try text
  return (await file.text()).trim();
}

/**
 * Splits extracted text into semantic chunks for retrieval.
 */
export function chunkClientText(text: string, maxChars = 1400, overlap = 200): string[] {
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
    start = Math.max(start + 1, end - overlap);
    if (start >= cleaned.length) break;
  }

  return chunks;
}

/**
 * Saves a material and its chunks into the student's browser IndexedDB.
 */
export async function saveLocalMaterial(
  material: LocalMaterial,
  chunks: LocalChunk[]
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['materials', 'chunks'], 'readwrite');
    const matStore = tx.objectStore('materials');
    const chunkStore = tx.objectStore('chunks');

    matStore.put(material);
    for (const chunk of chunks) {
      chunkStore.put(chunk);
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Retrieves all locally saved materials from IndexedDB.
 */
export async function getLocalMaterials(): Promise<LocalMaterial[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('materials', 'readonly');
      const store = tx.objectStore('materials');
      const request = store.getAll();

      request.onsuccess = () => {
        const list: LocalMaterial[] = request.result ?? [];
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(list);
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

/**
 * Deletes a local material and all its chunks from IndexedDB.
 */
export async function deleteLocalMaterial(materialId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['materials', 'chunks'], 'readwrite');
    const matStore = tx.objectStore('materials');
    const chunkStore = tx.objectStore('chunks');

    matStore.delete(materialId);

    const index = chunkStore.index('materialId');
    const request = index.getAllKeys(materialId);

    request.onsuccess = () => {
      const keys = request.result ?? [];
      for (const k of keys) {
        chunkStore.delete(k);
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Searches local chunks in IndexedDB using keyword relevance scoring.
 */
export async function searchLocalChunks(
  query: string,
  materialId?: string | null,
  limit = 4
): Promise<Array<{ title: string; content: string; score: number }>> {
  try {
    const db = await openDB();
    const chunks: LocalChunk[] = await new Promise((resolve, reject) => {
      const tx = db.transaction('chunks', 'readonly');
      const store = tx.objectStore('chunks');

      if (materialId) {
        const index = store.index('materialId');
        const req = index.getAll(materialId);
        req.onsuccess = () => resolve(req.result ?? []);
        req.onerror = () => reject(req.error);
      } else {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result ?? []);
        req.onerror = () => reject(req.error);
      }
    });

    if (!chunks.length) return [];

    // Clean and tokenize query (supporting 2-letter clinical terms like 'iv', 'bp', 'hr', 'o2', etc.)
    const terms = query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 2 && !COMMON_STOP_WORDS.has(t) && !TWO_LETTER_STOP_WORDS.has(t));

    if (!terms.length) return [];

    const scored: Array<{ title: string; content: string; score: number }> = [];

    for (const chunk of chunks) {
      const lower = chunk.content.toLowerCase();
      const titleLower = (chunk.materialTitle || '').toLowerCase();
      let matchCount = 0;
      let termWeight = 0;
      let titleBonus = 0;

      for (const term of terms) {
        if (lower.includes(term)) {
          matchCount++;
          // Term occurrences bonus
          const matches = lower.split(term).length - 1;
          termWeight += Math.min(matches, 4);
        }
        if (titleLower.includes(term)) {
          titleBonus += 3;
        }
      }

      if (matchCount > 0 || titleBonus > 0) {
        const score = matchCount * 3 + termWeight + titleBonus;
        scored.push({
          title: chunk.materialTitle,
          content: chunk.content,
          score,
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  } catch (err) {
    console.warn('[searchLocalChunks] error:', err);
    return [];
  }
}

const COMMON_STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'what', 'when', 'where',
  'which', 'how', 'why', 'who', 'does', 'have', 'been', 'will', 'your', 'about',
  'explain', 'tell', 'describe', 'give', 'into', 'over', 'more', 'some', 'than'
]);

const TWO_LETTER_STOP_WORDS = new Set([
  'in', 'on', 'at', 'to', 'of', 'by', 'is', 'it', 'or', 'an', 'as', 'if', 'be',
  'so', 'do', 'no', 'up', 'my', 'he', 'we', 'me', 'us', 'am', 'go'
]);
