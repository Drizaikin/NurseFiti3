"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface Upload {
  id: string;
  student_id: string;
  file_urls: string[];
  file_names: string[];
  file_count: number;
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  rejection_reason: string | null;
  submitted_at: string;
  student_name: string;
  student_email: string;
  student_plan: string;
}

const STATUS_BADGE: Record<string, 'amber' | 'green' | 'red' | 'secondary'> = {
  pending:   'amber',
  approved:  'green',
  rejected:  'red',
  duplicate: 'secondary',
};

export default function AdminUploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ uploadId: string; isDuplicate: boolean } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const loadUploads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/data?type=uploads&status=${filter}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setUploads(data.uploads ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load uploads');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => { loadUploads(); }, [loadUploads]);

  const handleApprove = async (upload: Upload) => {
    setActionLoading(upload.id);
    try {
      const res = await fetch('/api/admin/set-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: upload.student_id,
          tier: 'standard',
          durationDays: 30,
          uploadId: upload.id,
          note: 'Approved via question upload',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success(`${upload.student_name} upgraded to Success Plan (30 days)`);
      await loadUploads();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal || !rejectReason.trim()) { toast.error('Please enter a rejection reason'); return; }
    setActionLoading(rejectModal.uploadId);
    try {
      const res = await fetch('/api/admin/reject-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadId: rejectModal.uploadId, reason: rejectReason.trim(), isDuplicate: rejectModal.isDuplicate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success('Upload rejected');
      setRejectModal(null);
      setRejectReason('');
      await loadUploads();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Question Uploads</h1>
          <p className="text-neutral-mid text-sm mt-1">Review student-submitted exam question files. Approving upgrades the student to Success Plan for 30 days.</p>
        </div>
        <button onClick={loadUploads} className="text-xs text-primary hover:underline">↻ Refresh</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors capitalize ${filter === f ? 'bg-primary text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)] text-neutral-mid hover:border-primary/40'}`}>
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Spinner size="lg" color="primary" /></div>
      ) : uploads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-4xl mb-3">📂</p>
          <p className="text-neutral-mid">No {filter === 'all' ? '' : filter} uploads found.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {uploads.map(upload => (
            <Card key={upload.id}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-[var(--color-text)]">{upload.student_name}</p>
                    <Badge variant={STATUS_BADGE[upload.status] ?? 'secondary'} size="sm">{upload.status}</Badge>
                    <Badge variant="secondary" size="sm">{upload.student_plan} plan</Badge>
                  </div>
                  <p className="text-xs text-neutral-mid mb-2">
                    {upload.student_email} · Submitted {new Date(upload.submitted_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <div className="space-y-1">
                    {upload.file_names.map((name, i) => (
                      <a key={i} href={upload.file_urls[i]} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline">
                        <span>📄</span> {name}
                      </a>
                    ))}
                  </div>
                  {upload.rejection_reason && (
                    <p className="text-xs text-error mt-2">Reason: {upload.rejection_reason}</p>
                  )}
                </div>
                {upload.status === 'pending' && (
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button variant="primary" size="sm" onClick={() => handleApprove(upload)} disabled={actionLoading !== null}>
                      {actionLoading === upload.id ? <Spinner size="sm" color="white" /> : '✓ Approve & Upgrade'}
                    </Button>
                    <Button variant="outline" size="sm"
                      onClick={() => { setRejectModal({ uploadId: upload.id, isDuplicate: false }); setRejectReason(''); }}
                      disabled={actionLoading !== null}>
                      ✗ Reject
                    </Button>
                    <Button variant="ghost" size="sm"
                      onClick={() => { setRejectModal({ uploadId: upload.id, isDuplicate: true }); setRejectReason('These questions already exist in our database.'); }}
                      disabled={actionLoading !== null}>
                      🔁 Duplicate
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-heading font-bold mb-3">
              {rejectModal.isDuplicate ? 'Mark as Duplicate' : 'Reject Upload'}
            </h3>
            <p className="text-sm text-neutral-mid mb-3">Provide a reason (shown to the student):</p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="e.g. Files do not contain valid exam questions." />
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" className="flex-1" onClick={() => setRejectModal(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={handleReject}
                disabled={actionLoading !== null || !rejectReason.trim()}>
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Confirm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
