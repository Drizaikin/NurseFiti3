import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gog, gogJson } from './gog';

export const DRAFT_FOLDER_ID = process.env.BLOG_DRIVE_DRAFTS_FOLDER_ID || '1W5Vl0g4fCwrcPNYgWdjWlcSQOBWgj70n';

/** Docs are created with a DRAFT prefix so nothing in the folder reads as approved copy. */
export function draftDocTitle(keywordId: string, title: string) {
  return `DRAFT ${keywordId} — ${title}`.slice(0, 180);
}

/**
 * Imports the assembled Markdown as a Google Doc. gogcli inlines `![alt](url){width= height=}`
 * images during import, so the hero and infographic land in place without a second Docs API pass.
 */
export function createDraftDoc(keywordId: string, title: string, markdown: string) {
  const localPath = join(tmpdir(), `nursefiti-draft-${keywordId}-${Date.now()}.md`);
  writeFileSync(localPath, markdown, 'utf8');
  try {
    const created = gogJson<{ id?: string; documentId?: string; document?: { documentId?: string } }>([
      'docs', 'create', draftDocTitle(keywordId, title),
      `--parent=${DRAFT_FOLDER_ID}`,
      `--file=${localPath}`,
    ]);
    const docId = created.documentId ?? created.id ?? created.document?.documentId;
    if (!docId) throw new Error('Google Docs creation returned no document id');
    return { docId, url: `https://docs.google.com/document/d/${docId}/edit` };
  } finally {
    try { unlinkSync(localPath); } catch { /* temp file already gone */ }
  }
}

/** Creates the folder on first run and reuses it afterwards, matching gogcli search semantics. */
export function ensureDriveFolder(name: string, parentId: string) {
  const escaped = name.replace(/'/g, "\\'");
  const found = gogJson<{ files?: Array<{ id: string; name: string; mimeType: string }> }>([
    'drive', 'ls', `--parent=${parentId}`, '--max=100',
  ]);
  const existing = (found.files ?? []).find(file => file.name === name && file.mimeType === 'application/vnd.google-apps.folder');
  if (existing) return existing.id;
  const created = gogJson<{ id?: string; file?: { id?: string } }>(['drive', 'mkdir', escaped, `--parent=${parentId}`]);
  const id = created.id ?? created.file?.id;
  if (!id) throw new Error(`Could not create the ${name} Drive folder`);
  return id;
}
