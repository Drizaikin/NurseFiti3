"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  cadre: string;
  unit: string;
  topic: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  rationale: string;
  difficulty: string;
  contributor_name: string;
  contributor_id: string | null;
  status: string;
  created_at: string;
}

const DIFFICULTY_BADGE: Record<string, 'teal' | 'amber' | 'error'> = {
  easy:   'teal',
  medium: 'amber',
  hard:   'error',
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'pending_review' | 'approved' | 'rejected'>('pending_review');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<Question | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/data?type=questions&status=${filter}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setQuestions(data.questions ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const handleApprove = async (q: Question) => {
    setActionLoading(q.id);
    try {
      const res = await fetch('/api/admin/review-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, action: 'approve' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success(`"${q.topic}" approved — now live in the question bank`);
      await loadQuestions();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal.id);
    try {
      const res = await fetch('/api/admin/review-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: rejectModal.id, action: 'reject', reason: rejectReason.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success('Question rejected');
      setRejectModal(null);
      setRejectReason('');
      await loadQuestions();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">MCQ Review</h1>
          <p className="text-neutral-mid text-sm mt-1">
            Review tutor-submitted questions. Approved questions go live immediately in practice and mock exams.
          </p>
        </div>
        <button onClick={loadQuestions} className="text-xs text-primary hover:underline">↻ Refresh</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['pending_review', 'approved', 'rejected'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)] text-neutral-mid hover:border-primary/40'}`}>
            {f === 'pending_review' ? 'Pending Review' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Spinner size="lg" color="primary" /></div>
      ) : questions.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-neutral-mid">No {filter === 'pending_review' ? 'pending' : filter} questions.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {questions.map(q => (
            <Card key={q.id}>
              {/* Header row */}
              <div className="flex items-start gap-3 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="teal" size="sm">{q.cadre}</Badge>
                    <Badge variant="secondary" size="sm">{q.unit}</Badge>
                    <Badge variant={DIFFICULTY_BADGE[q.difficulty] ?? 'secondary'} size="sm">{q.difficulty}</Badge>
                  </div>
                  <p className="font-semibold text-sm text-[var(--color-text)]">{q.topic}</p>
                  <p className="text-xs text-neutral-mid mt-0.5">
                    By {q.contributor_name} · {new Date(q.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                    className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-primary/40 transition-colors"
                  >
                    {expanded === q.id ? 'Collapse ▲' : 'Preview ▼'}
                  </button>
                  {filter === 'pending_review' && (
                    <>
                      <Button variant="primary" size="sm"
                        onClick={() => handleApprove(q)}
                        disabled={actionLoading !== null}>
                        {actionLoading === q.id ? <Spinner size="sm" color="white" /> : '✓ Approve'}
                      </Button>
                      <Button variant="outline" size="sm"
                        onClick={() => { setRejectModal(q); setRejectReason(''); }}
                        disabled={actionLoading !== null}>
                        ✗ Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded preview */}
              {expanded === q.id && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-3">
                  <p className="text-sm font-medium text-[var(--color-text)]">{q.stem}</p>
                  <div className="space-y-1.5">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const text = q[`option_${opt.toLowerCase()}` as keyof Question] as string;
                      const isCorrect = q.correct_option === opt;
                      return (
                        <div key={opt} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${isCorrect ? 'bg-success/10 text-success font-semibold' : 'text-[var(--color-text-secondary)]'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isCorrect ? 'bg-success text-white' : 'bg-[var(--color-border)]'}`}>{opt}</span>
                          <span>{text}</span>
                          {isCorrect && <span className="ml-auto text-xs">✓ Correct</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 rounded-xl bg-primary-xlight dark:bg-primary/10 text-sm text-[var(--color-text)]">
                    <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Rationale</p>
                    {q.rationale}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-heading font-bold mb-1">Reject Question</h3>
            <p className="text-sm text-neutral-mid mb-3">
              {rejectModal.topic} — by {rejectModal.contributor_name}
            </p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="Reason shown to the contributor (optional)…" />
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" className="flex-1" onClick={() => setRejectModal(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={handleReject} disabled={actionLoading !== null}>
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Reject'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
