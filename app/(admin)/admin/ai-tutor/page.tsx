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

interface AiTutorReview {
  id: string;
  user_id: string | null;
  user_name: string | null;
  user_role: string | null;
  cadre: string | null;
  rating: number;
  experience: string | null;
  expected: string | null;
  disappointing: string | null;
  recommendations: string | null;
  selected_voice: string | null;
  session_message_count: number;
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
  const [activeTab, setActiveTab] = useState<'textbooks' | 'reviews'>('textbooks');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [reviews, setReviews] = useState<AiTutorReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  const loadMaterials = async () => {
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

  const loadReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const res = await fetch('/api/ai/tutor/feedback');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load reviews');
      setReviews(data.reviews ?? []);
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to load reviews');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadMaterials();
    loadReviews();
  }, []);

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
      await loadMaterials();
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
      await loadMaterials();
    } catch (err: any) {
      toast.error(err.message ?? 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (ratingFilter === 'all') return true;
    return r.rating === ratingFilter;
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6 pb-20 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">
          AI Clinical Tutor Management
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Manage textbook knowledge base and inspect student reviews & feature recommendations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('textbooks')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'textbooks'
              ? 'bg-primary text-white shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-card)]'
          }`}
        >
          📚 Knowledge Base ({materials.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('reviews');
            loadReviews();
          }}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'reviews'
              ? 'bg-primary text-white shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-card)]'
          }`}
        >
          <span>⭐ Private Reviews & Recommendations</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
          }`}>
            {reviews.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Textbooks & Knowledge Base */}
      {activeTab === 'textbooks' && (
        <div className="space-y-6">
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
      )}

      {/* Tab 2: AI Tutor Reviews & Recommendations (Admin-Only, Private) */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold text-[var(--color-text)] mt-1">
                  {reviews.length}
                </p>
              </div>
              <span className="text-3xl">📝</span>
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-amber-500 mt-1">
                  ★ {avgRating} / 5.0
                </p>
              </div>
              <span className="text-3xl">⭐</span>
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Recommendations Left
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {reviews.filter((r) => r.recommendations && r.recommendations.trim().length > 0).length}
                </p>
              </div>
              <span className="text-3xl">💡</span>
            </Card>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Filter:</span>
            {(['all', 5, 4, 3, 2, 1] as const).map((star) => (
              <button
                key={String(star)}
                onClick={() => setRatingFilter(star)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                  ratingFilter === star
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-primary/50'
                }`}
              >
                {star === 'all' ? 'All Ratings' : `★ ${star} Stars`}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={loadReviews}
              className="text-xs ml-auto"
            >
              🔄 Refresh
            </Button>
          </div>

          {/* Reviews List */}
          {isLoadingReviews ? (
            <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>
          ) : filteredReviews.length === 0 ? (
            <Card className="p-8 text-center space-y-2">
              <span className="text-3xl">🩺</span>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                No AI Tutor reviews match this filter.
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Reviews submitted by students in the AI Tutor are kept strictly private here.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((r) => (
                <Card key={r.id} className="p-5 space-y-3 border-l-4 border-l-primary">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--color-text)]">
                          {r.user_name || 'Anonymous Student'}
                        </span>
                        {r.cadre && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                            {r.cadre}
                          </span>
                        )}
                        {r.selected_voice && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[var(--color-text-secondary)] font-mono">
                            🎙️ {r.selected_voice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {new Date(r.created_at).toLocaleString()}
                        {r.session_message_count > 0 && ` · ${r.session_message_count} messages in session`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-xl font-bold text-sm">
                      <span>★</span>
                      <span>{r.rating} / 5</span>
                    </div>
                  </div>

                  {/* Feedback Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    {r.experience && (
                      <div className="bg-[var(--color-bg)]/60 p-3 rounded-xl border border-[var(--color-border)]/50 space-y-1">
                        <p className="font-bold uppercase tracking-wider text-[10px] text-primary">
                          1. Experience
                        </p>
                        <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
                          {r.experience}
                        </p>
                      </div>
                    )}

                    {r.expected && (
                      <div className="bg-[var(--color-bg)]/60 p-3 rounded-xl border border-[var(--color-border)]/50 space-y-1">
                        <p className="font-bold uppercase tracking-wider text-[10px] text-teal-600 dark:text-teal-400">
                          2. Expectations
                        </p>
                        <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
                          {r.expected}
                        </p>
                      </div>
                    )}

                    {r.disappointing && (
                      <div className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/20 space-y-1">
                        <p className="font-bold uppercase tracking-wider text-[10px] text-rose-500">
                          3. Disappointing / Frustrating
                        </p>
                        <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
                          {r.disappointing}
                        </p>
                      </div>
                    )}

                    {r.recommendations && (
                      <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 space-y-1">
                        <p className="font-bold uppercase tracking-wider text-[10px] text-emerald-600 dark:text-emerald-400">
                          4. Recommendations & Requests
                        </p>
                        <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
                          {r.recommendations}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
