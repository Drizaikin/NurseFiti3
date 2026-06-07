"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { TabsControlled } from '@/components/ui/Tabs';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const CADRES = ['KRCHN', 'BScN', 'Higher Diploma'];
const KRCHN_UNITS = ['Anatomy & Physiology', 'Medical-Surgical Nursing', 'Pharmacology', 'Community Health', 'Midwifery', 'Paediatric Nursing', 'Mental Health Nursing', 'Nutrition', 'Research & Statistics'];
const BSCN_UNITS = [...KRCHN_UNITS, 'Leadership & Management', 'Critical Care', 'Oncology Nursing', 'Renal Nursing', 'Orthopaedic Nursing', 'Dermatology', 'ENT Nursing', 'Ophthalmology'];

interface Contribution {
  id: string;
  type: 'question' | 'note';
  title: string;
  unit: string;
  cadre: string;
  status: string;
  views: number;
  created_at: string;
}

export default function TutorStudioPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState('mcq');
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // MCQ form state
  const [mcq, setMcq] = useState({
    cadre: 'KRCHN', unit: '', topic: '', stem: '',
    option_a: '', option_b: '', option_c: '', option_d: '',
    correct_option: '' as 'A' | 'B' | 'C' | 'D' | '',
    rationale: '', difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  });

  // Note form state
  const [note, setNote] = useState({ cadre: 'KRCHN', unit: '', title: '', content_markdown: '' });

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      await loadContributions(user.id);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContributions = async (uid: string) => {
    const [qRes, nRes] = await Promise.all([
      supabase.from('questions').select('id, topic, unit, cadre, status, views, created_at').eq('contributor_id', uid).order('created_at', { ascending: false }),
      supabase.from('study_notes').select('id, title, unit, cadre, status, views, created_at').eq('contributor_id', uid).order('created_at', { ascending: false }),
    ]);
    const questions: Contribution[] = (qRes.data ?? []).map((q: any) => ({ id: q.id, type: 'question', title: q.topic, unit: q.unit, cadre: q.cadre, status: q.status, views: q.views, created_at: q.created_at }));
    const notes: Contribution[] = (nRes.data ?? []).map((n: any) => ({ id: n.id, type: 'note', title: n.title, unit: n.unit, cadre: n.cadre, status: n.status, views: n.views, created_at: n.created_at }));
    setContributions([...questions, ...notes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  const submitMCQ = async () => {
    if (!userId) return;
    if (!mcq.unit || !mcq.topic || !mcq.stem || !mcq.option_a || !mcq.option_b || !mcq.option_c || !mcq.option_d || !mcq.correct_option || !mcq.rationale) {
      toast.error('Please fill in all required fields'); return;
    }
    setSubmitting(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('questions').insert({
      cadre: mcq.cadre, unit: mcq.unit, topic: mcq.topic, stem: mcq.stem,
      option_a: mcq.option_a, option_b: mcq.option_b, option_c: mcq.option_c, option_d: mcq.option_d,
      correct_option: mcq.correct_option, rationale: mcq.rationale, difficulty: mcq.difficulty,
      contributor_id: userId, status: 'pending_review',
    });
    setSubmitting(false);
    if (error) { toast.error('Failed to submit question'); return; }
    toast.success('Question submitted for review! +50 XP on approval.');
    setMcq({ cadre: 'KRCHN', unit: '', topic: '', stem: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '', rationale: '', difficulty: 'medium' });
    await loadContributions(userId);
    setActiveTab('contributions');
  };

  const submitNote = async () => {
    if (!userId) return;
    if (!note.unit || !note.title || !note.content_markdown) {
      toast.error('Please fill in all required fields'); return;
    }
    setSubmitting(true);
    const { error } = await (supabase as any).from('study_notes').insert({
      cadre: note.cadre, unit: note.unit, title: note.title, content_markdown: note.content_markdown,
      contributor_id: userId, status: 'pending_review',
    });
    setSubmitting(false);
    if (error) { toast.error('Failed to submit note'); return; }
    toast.success('Study note submitted for review! +80 XP on approval.');
    setNote({ cadre: 'KRCHN', unit: '', title: '', content_markdown: '' });
    await loadContributions(userId);
    setActiveTab('contributions');
  };

  const getUnits = (cadre: string) => cadre === 'BScN' ? BSCN_UNITS : KRCHN_UNITS;

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  const tabs = [
    { id: 'mcq', label: 'Add MCQ', icon: <span>📝</span> },
    { id: 'note', label: 'Add Study Note', icon: <span>📖</span> },
    { id: 'contributions', label: 'My Contributions', icon: <span>📊</span>, badge: contributions.length },
  ];

  return (
    <div className="space-y-5 pb-24 lg:pb-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Content Studio</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Contribute MCQs and study notes to the NurseFiti question bank. Earn XP for approved content.</p>
      </div>

      {/* XP incentive banner */}
      <Card className="bg-accent/5 border-accent/20">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🏆</span>
          <div>
            <p className="font-semibold text-[var(--color-text)]">Earn XP for every contribution</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Approved MCQ: +50 XP · Approved Study Note: +80 XP · Higher Diploma questions: +100 XP bonus</p>
          </div>
        </div>
      </Card>

      <TabsControlled tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Add MCQ */}
      {activeTab === 'mcq' && (
        <Card>
          <h2 className="text-lg font-heading font-bold mb-4">Add a New MCQ</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Cadre *</label>
                <select className="input text-sm" value={mcq.cadre} onChange={e => setMcq(m => ({ ...m, cadre: e.target.value, unit: '' }))}>
                  {CADRES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Unit *</label>
                <select className="input text-sm" value={mcq.unit} onChange={e => setMcq(m => ({ ...m, unit: e.target.value }))}>
                  <option value="">Select unit</option>
                  {getUnits(mcq.cadre).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Difficulty *</label>
                <select className="input text-sm" value={mcq.difficulty} onChange={e => setMcq(m => ({ ...m, difficulty: e.target.value as any }))}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Topic *</label>
              <input className="input text-sm" placeholder="e.g., Drug calculations, Fluid balance" value={mcq.topic} onChange={e => setMcq(m => ({ ...m, topic: e.target.value }))} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Question Stem *</label>
              <textarea className="input resize-none text-sm" rows={3} placeholder="Write the question here..." value={mcq.stem} onChange={e => setMcq(m => ({ ...m, stem: e.target.value }))} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Answer Options * <span className="text-xs font-normal text-[var(--color-text-secondary)]">(click the letter to mark correct)</span></label>
              <div className="space-y-2">
                {(['A', 'B', 'C', 'D'] as const).map(opt => (
                  <div key={opt} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMcq(m => ({ ...m, correct_option: opt }))}
                      className={`w-9 h-9 rounded-full font-bold text-sm flex-shrink-0 transition-all ${mcq.correct_option === opt ? 'bg-success text-white ring-2 ring-success/50' : 'bg-neutral-border text-neutral-mid hover:bg-primary-light hover:text-primary'}`}
                    >
                      {opt}
                    </button>
                    <input
                      className="input text-sm flex-1"
                      placeholder={`Option ${opt}`}
                      value={mcq[`option_${opt.toLowerCase()}` as keyof typeof mcq] as string}
                      onChange={e => setMcq(m => ({ ...m, [`option_${opt.toLowerCase()}`]: e.target.value }))}
                    />
                    {mcq.correct_option === opt && <Badge variant="green" size="sm">Correct</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Rationale * <span className="text-xs font-normal text-[var(--color-text-secondary)]">(explain why the correct answer is right and why others are wrong)</span></label>
              <textarea className="input resize-none text-sm" rows={4} placeholder="Explain the correct answer and why each incorrect option is wrong..." value={mcq.rationale} onChange={e => setMcq(m => ({ ...m, rationale: e.target.value }))} />
            </div>

            <Button variant="primary" className="w-full" onClick={submitMCQ} disabled={submitting}>
              {submitting ? <Spinner size="sm" color="white" /> : 'Submit for Review'}
            </Button>
          </div>
        </Card>
      )}

      {/* Add Study Note */}
      {activeTab === 'note' && (
        <Card>
          <h2 className="text-lg font-heading font-bold mb-4">Add a Study Note</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Cadre *</label>
                <select className="input text-sm" value={note.cadre} onChange={e => setNote(n => ({ ...n, cadre: e.target.value, unit: '' }))}>
                  {CADRES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Unit *</label>
                <select className="input text-sm" value={note.unit} onChange={e => setNote(n => ({ ...n, unit: e.target.value }))}>
                  <option value="">Select unit</option>
                  {getUnits(note.cadre).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Title *</label>
              <input className="input text-sm" placeholder="e.g., Key Drug Interactions in Pharmacology" value={note.title} onChange={e => setNote(n => ({ ...n, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Content * <span className="text-xs font-normal text-[var(--color-text-secondary)]">(Markdown supported)</span></label>
              <textarea className="input resize-none text-sm font-mono" rows={12} placeholder="# Topic Title&#10;&#10;## Key Points&#10;- Point 1&#10;- Point 2&#10;&#10;## Clinical Pearls&#10;..." value={note.content_markdown} onChange={e => setNote(n => ({ ...n, content_markdown: e.target.value }))} />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{note.content_markdown.length} characters</p>
            </div>
            <Button variant="primary" className="w-full" onClick={submitNote} disabled={submitting}>
              {submitting ? <Spinner size="sm" color="white" /> : 'Submit for Review'}
            </Button>
          </div>
        </Card>
      )}

      {/* Contributions */}
      {activeTab === 'contributions' && (
        <Card>
          <h2 className="text-lg font-heading font-bold mb-4">My Contributions</h2>
          {contributions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-[var(--color-text-secondary)]">No contributions yet. Add your first MCQ or study note!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 pr-4 text-[var(--color-text-secondary)] font-semibold">Title</th>
                    <th className="text-left py-2 pr-4 text-[var(--color-text-secondary)] font-semibold">Type</th>
                    <th className="text-left py-2 pr-4 text-[var(--color-text-secondary)] font-semibold">Unit</th>
                    <th className="text-left py-2 pr-4 text-[var(--color-text-secondary)] font-semibold">Status</th>
                    <th className="text-left py-2 text-[var(--color-text-secondary)] font-semibold">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map(c => (
                    <tr key={c.id} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-3 pr-4 text-[var(--color-text)] max-w-[200px] truncate">{c.title}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={c.type === 'question' ? 'teal' : 'secondary'} size="sm">{c.type === 'question' ? 'MCQ' : 'Note'}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-[var(--color-text-secondary)] max-w-[150px] truncate">{c.unit}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={c.status === 'approved' ? 'green' : c.status === 'pending_review' ? 'amber' : 'error'} size="sm">
                          {c.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 text-[var(--color-text-secondary)]">{c.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
