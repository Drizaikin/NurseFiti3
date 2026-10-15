'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface Material {
  id: string;
  title: string;
  description: string | null;
  file_name: string;
  file_size_bytes: number | null;
  chunk_count: number;
  status: string;
  error_message: string | null;
  created_at: string;
}

function formatBytes(bytes: number | null) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const dynamic = 'force-dynamic';

export default function AdminAiTutorPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/ai-tutor/materials');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setMaterials(data.materials ?? []);
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to load materials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file.');
      return;
    }
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      if (title.trim()) fd.append('title', title.trim());
      if (description.trim()) fd.append('description', description.trim());

      const res = await fetch('/api/admin/ai-tutor/materials', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');

      toast.success(`Ingested ${data.chunk_count} chunks from "${data.title}"`);
      setTitle('');
      setDescription('');
      setFile(null);
      // reset file input
      const input = document.getElementById('ai-tutor-file') as HTMLInputElement | null;
      if (input) input.value = '';
      await load();
    } catch (err: any) {
      toast.error(err.message ?? 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this textbook and all its chunks?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/ai-tutor/materials?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Delete failed');
      toast.success('Deleted');
      await load();
    } catch (err: any) {
      toast.error(err.message ?? 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">AI Tutor Knowledge Base</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Upload textbooks (PDF, DOCX, TXT). They are chunked and used as the only sources for the student AI Tutor.
        </p>
      </div>

      <Card className="space-y-4">
        <h2 className="font-heading font-semibold text-[var(--color-text)]">Upload textbook</h2>
        <form onSubmit={handleUpload} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">File</label>
            <input
              id="ai-tutor-file"
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm"
              disabled={isUploading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Title (optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Brunner & Suddarth Medical-Surgical Nursing"
              className="input w-full"
              disabled={isUploading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input w-full"
              rows={2}
              disabled={isUploading}
            />
          </div>
          <Button type="submit" variant="primary" disabled={isUploading || !file}>
            {isUploading ? <><Spinner size="sm" color="primary" /> Ingesting…</> : 'Upload & ingest'}
          </Button>
        </form>
      </Card>

      <div>
        <h2 className="font-heading font-semibold text-[var(--color-text)] mb-3">Uploaded materials</h2>
        {isLoading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>
        ) : materials.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-sm">No materials yet.</p>
        ) : (
          <div className="space-y-3">
            {materials.map((m) => (
              <Card key={m.id} className="space-y-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-heading font-bold text-[var(--color-text)]">{m.title}</h3>
                    {m.description && <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{m.description}</p>}
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 flex flex-wrap gap-x-4">
                      <span>📄 {m.file_name}</span>
                      <span>📦 {formatBytes(m.file_size_bytes)}</span>
                      <span>🧩 {m.chunk_count} chunks</span>
                      <span>🏷 {m.status}</span>
                    </div>
                    {m.status === 'failed' && m.error_message && (
                      <p className="text-xs text-error mt-1">{m.error_message}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-sm text-error"
                    onClick={() => handleDelete(m.id)}
                    disabled={deleting === m.id}
                  >
                    {deleting === m.id ? <Spinner size="sm" color="primary" /> : 'Delete'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
