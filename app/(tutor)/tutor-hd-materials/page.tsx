'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { getTabId, getTabPanelId, TabsControlled } from '@/components/ui/Tabs';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const TAB_SET_ID = 'tutor-hd-tabs';

const SPECIALTIES = [
  'Critical Care',
  'Oncology',
  'Renal Nursing',
  'Perioperative',
  'Psychiatric',
];

const STATUS_BADGE: Record<string, { label: string; variant: string }> = {
  pending:  { label: 'Pending Review', variant: 'warning' },
  approved: { label: 'Approved',       variant: 'success' },
  rejected: { label: 'Rejected',       variant: 'error'   },
  hidden:   { label: 'Hidden',         variant: 'neutral' },
};

interface HdMaterial {
  id: string;
  title: string;
  description: string | null;
  specialty: string;
  file_name: string;
  file_size_bytes: number;
  file_type: string;
  status: string;
  download_count: number;
  created_at: string;
}

interface Purchase {
  id: string;
  material_id: string;
  amount_paid: number;
  purchased_at: string;
  hd_materials: { title: string; specialty: string } | null;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TutorHdMaterialsPage() {
  const router  = useRouter();
  const supabase = createClient();

  const [userId, setUserId]     = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('materials');
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<HdMaterial[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);

  // Upload form
  const [form, setForm] = useState({
    title: '', description: '', specialty: SPECIALTIES[0],
  });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single() as any;
      if (profile?.role !== 'tutor') { router.push('/dashboard'); return; }

      setUserId(user.id);
      await Promise.all([loadMaterials(user.id), loadPurchases(user.id)]);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMaterials = async (uid: string) => {
    const { data } = await supabase
      .from('hd_materials')
      .select('id, title, description, specialty, file_name, file_size_bytes, file_type, status, download_count, created_at')
      .eq('tutor_id', uid)
      .order('created_at', { ascending: false }) as any;
    setMaterials(data ?? []);
  };

  const loadPurchases = async (uid: string) => {
    // Get materials by this tutor, then get their purchases
    const { data: myMaterials } = await supabase
      .from('hd_materials')
      .select('id')
      .eq('tutor_id', uid) as any;
    if (!myMaterials?.length) { setPurchases([]); return; }
    const ids = myMaterials.map((m: any) => m.id);

    const { data } = await supabase
      .from('hd_material_purchases')
      .select('id, material_id, amount_paid, purchased_at, hd_materials(title, specialty)')
      .in('material_id', ids)
      .order('purchased_at', { ascending: false }) as any;
    setPurchases(data ?? []);
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { toast.error('Please select a file.'); return; }
    if (!form.title.trim()) { toast.error('Please enter a title.'); return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', form.title.trim());
      fd.append('description', form.description.trim());
      fd.append('specialty', form.specialty);

      const res = await fetch('/api/hd-materials/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');

      toast.success('Material uploaded! It will be visible to students once the admin approves it.');
      setForm({ title: '', description: '', specialty: SPECIALTIES[0] });
      if (fileRef.current) fileRef.current.value = '';
      if (userId) await loadMaterials(userId);
    } catch (err: any) {
      toast.error(err.message ?? 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (material: HdMaterial) => {
    if (!['pending', 'rejected'].includes(material.status)) {
      toast.error('Only pending or rejected materials can be deleted.');
      return;
    }
    setDeleting(material.id);
    try {
      const { error } = await supabase
        .from('hd_materials')
        .delete()
        .eq('id', material.id) as any;
      if (error) throw new Error(error.message);
      toast.success('Material deleted.');
      setMaterials(prev => prev.filter(m => m.id !== material.id));
    } catch (err: any) {
      toast.error(err.message ?? 'Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  const totalEarnings = purchases.reduce((sum, p) => sum + (p.amount_paid * 0.7), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">HD Study Materials</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Upload materials for Higher Diploma students. Materials are reviewed by the admin before going live.
        </p>
      </div>

      <TabsControlled
        id={TAB_SET_ID}
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'materials', label: `My Materials (${materials.length})` },
          { id: 'earnings',  label: `Downloads & Earnings (${purchases.length})` },
        ]}
      />

      {/* ── My Materials Tab ─────────────────────────────── */}
      {activeTab === 'materials' && (
        <div
          id={getTabPanelId(TAB_SET_ID, 'materials')}
          role="tabpanel"
          aria-labelledby={getTabId(TAB_SET_ID, 'materials')}
          className="space-y-6"
        >
          {/* Upload Form */}
          <Card>
            <h2 className="text-lg font-heading font-bold mb-4">Upload New Material</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title <span className="text-error">*</span></label>
                <input
                  type="text"
                  className="input w-full text-sm"
                  placeholder="e.g. Critical Care Haemodynamic Monitoring Notes"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Specialty <span className="text-error">*</span></label>
                <select
                  className="input w-full text-sm"
                  value={form.specialty}
                  onChange={e => setForm({ ...form, specialty: e.target.value })}
                >
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  className="input w-full text-sm"
                  rows={3}
                  placeholder="Brief description of what this material covers..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">File <span className="text-error">*</span></label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="block w-full text-sm text-[var(--color-text-secondary)] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">PDF, Word (.docx), or PowerPoint (.pptx). Max 50 MB.</p>
              </div>
              <Button
                id="upload-hd-material-btn"
                variant="primary"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? <><Spinner size="sm" color="white" /> Uploading…</> : '📤 Upload Material'}
              </Button>
            </div>
          </Card>

          {/* Materials List */}
          {materials.length === 0 ? (
            <div className="text-center py-16 text-[var(--color-text-secondary)]">
              <p className="text-4xl mb-3">📂</p>
              <p className="font-semibold">No materials uploaded yet</p>
              <p className="text-sm mt-1">Upload your first material above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {materials.map(m => {
                const badgeCfg = STATUS_BADGE[m.status] ?? STATUS_BADGE['pending'];
                return (
                  <Card key={m.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant={badgeCfg.variant as any}>{badgeCfg.label}</Badge>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20 font-semibold">
                          {m.specialty}
                        </span>
                      </div>
                      <p className="font-semibold text-[var(--color-text)] truncate">{m.title}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {m.file_name} · {formatBytes(m.file_size_bytes)} · ⬇️ {m.download_count} downloads
                      </p>
                    </div>
                    {['pending', 'rejected'].includes(m.status) && (
                      <Button
                        id={`delete-hd-${m.id}`}
                        variant="ghost"
                        className="text-error text-sm shrink-0"
                        onClick={() => handleDelete(m)}
                        disabled={deleting === m.id}
                      >
                        {deleting === m.id ? <Spinner size="sm" color="primary" /> : '🗑 Delete'}
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Downloads & Earnings Tab ──────────────────────── */}
      {activeTab === 'earnings' && (
        <div
          id={getTabPanelId(TAB_SET_ID, 'earnings')}
          role="tabpanel"
          aria-labelledby={getTabId(TAB_SET_ID, 'earnings')}
          className="space-y-6"
        >
          {/* Earnings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center">
              <p className="text-3xl font-bold text-primary">KSh {Math.round(totalEarnings).toLocaleString()}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Total Earnings (70%)</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-accent-dark">{purchases.length}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Total Downloads</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-[var(--color-text)]">
                {materials.filter(m => m.status === 'approved').length}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Active Materials</p>
            </Card>
          </div>

          <Card>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              You receive <strong>70%</strong> of each download fee. Payouts are processed manually by the NurseFiti admin team.
            </p>

            {purchases.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-text-secondary)]">
                <p className="text-4xl mb-3">📊</p>
                <p className="font-semibold">No downloads yet</p>
                <p className="text-sm mt-1">Once students purchase your materials, downloads will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="pb-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Material</th>
                      <th className="pb-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Specialty</th>
                      <th className="pb-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Date</th>
                      <th className="pb-2 font-semibold text-[var(--color-text-secondary)] text-right">Your Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map(p => (
                      <tr key={p.id} className="border-t border-[var(--color-border)]/50">
                        <td className="py-3 pr-4 font-medium text-[var(--color-text)] max-w-[200px] truncate">
                          {p.hd_materials?.title ?? 'Material'}
                        </td>
                        <td className="py-3 pr-4 text-[var(--color-text-secondary)]">
                          {p.hd_materials?.specialty ?? '—'}
                        </td>
                        <td className="py-3 pr-4 text-[var(--color-text-secondary)]">
                          {new Date(p.purchased_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-3 text-right font-semibold text-success">
                          KSh {Math.round(p.amount_paid * 0.7).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
