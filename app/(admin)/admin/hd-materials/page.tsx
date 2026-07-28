'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const STATUS_OPTIONS = [
  { value: 'approved', label: '✅ Approve',  variant: 'success' },
  { value: 'rejected', label: '❌ Reject',   variant: 'error'   },
  { value: 'hidden',   label: '🚫 Hide',     variant: 'neutral' },
  { value: 'pending',  label: '🕐 Pending',  variant: 'warning' },
];

const STATUS_BADGE: Record<string, string> = {
  pending:  'warning',
  approved: 'success',
  rejected: 'error',
  hidden:   'neutral',
};

interface AdminMaterial {
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
  tutor: { id: string; full_name: string | null; email: string | null } | null;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminHdMaterialsPage() {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating]   = useState<string | null>(null);
  const [filter, setFilter]       = useState<string>('all');

  useEffect(() => { loadMaterials(); }, []);

  const loadMaterials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/hd-materials');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setMaterials(data.materials ?? []);
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to load materials');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (materialId: string, status: string) => {
    setUpdating(materialId);
    try {
      const res = await fetch('/api/admin/hd-materials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material_id: materialId, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Update failed');
      setMaterials(prev => prev.map(m => m.id === materialId ? { ...m, status } : m));
      toast.success(`Material ${status}`);
    } catch (err: any) {
      toast.error(err.message ?? 'Update failed');
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'all' ? materials : materials.filter(m => m.status === filter);
  const counts   = {
    all:      materials.length,
    pending:  materials.filter(m => m.status === 'pending').length,
    approved: materials.filter(m => m.status === 'approved').length,
    rejected: materials.filter(m => m.status === 'rejected').length,
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">HD Materials</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Review and moderate tutor-uploaded Higher Diploma study materials.
          </p>
        </div>
        <Button id="refresh-hd-materials" variant="ghost" onClick={loadMaterials} disabled={isLoading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all',      label: `All (${counts.all})` },
          { key: 'pending',  label: `Pending (${counts.pending})` },
          { key: 'approved', label: `Approved (${counts.approved})` },
          { key: 'rejected', label: `Rejected (${counts.rejected})` },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              filter === f.key
                ? 'bg-primary text-white border-primary'
                : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-primary/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" color="primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-secondary)]">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-semibold">No materials found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(material => (
            <Card key={material.id} className="space-y-4">
              {/* Top row: status + specialty */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={STATUS_BADGE[material.status] as any}>
                    {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                  </Badge>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-light text-primary border border-primary/20">
                    {material.specialty}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    ⬇️ {material.download_count} downloads
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {new Date(material.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading font-bold text-[var(--color-text)] text-base">{material.title}</h3>
                {material.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">{material.description}</p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)] mt-2">
                  <span>👨‍🏫 {material.tutor?.full_name ?? 'Unknown'} · {material.tutor?.email ?? ''}</span>
                  <span>📦 {material.file_name} · {formatBytes(material.file_size_bytes)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--color-border)]/50">
                {STATUS_OPTIONS.filter(opt => opt.value !== material.status).map(opt => (
                  <Button
                    key={opt.value}
                    id={`hd-${opt.value}-${material.id}`}
                    variant="ghost"
                    className={`text-sm ${opt.variant === 'success' ? 'text-success' : opt.variant === 'error' ? 'text-error' : 'text-[var(--color-text-secondary)]'}`}
                    onClick={() => updateStatus(material.id, opt.value)}
                    disabled={updating === material.id}
                  >
                    {updating === material.id ? <Spinner size="sm" color="primary" /> : opt.label}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
