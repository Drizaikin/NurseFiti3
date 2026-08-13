"use client";

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

type EditableQuestion = {
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
  paper: string | null;
  exam_year: number | null;
  status: string;
};

const OPTION_FIELDS = [
  ['option_a', 'A'], ['option_b', 'B'], ['option_c', 'C'], ['option_d', 'D'],
] as const;

export default function AdminQuestionEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [question, setQuestion] = useState<EditableQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/questions/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Failed to load question');
        setQuestion(data.question);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load question');
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) load();
  }, [params.id]);

  const updateField = <K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => {
    setQuestion(current => current ? { ...current, [field]: value } : current);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!question) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/questions/${question.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stem: question.stem,
          option_a: question.option_a,
          option_b: question.option_b,
          option_c: question.option_c,
          option_d: question.option_d,
          correct_option: question.correct_option,
          rationale: question.rationale,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save question');
      setQuestion(current => current ? { ...current, ...data.question } : current);
      toast.success('Question saved. The updated content is now used by the question bank.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save question');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" color="primary" /></div>;
  if (!question) return <Card><p className="text-neutral-mid">Question not found.</p></Card>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <Link href="/admin/flagged" className="text-sm text-primary hover:underline">← Back to flagged questions</Link>
          <h1 className="text-2xl font-heading font-bold text-primary mt-2">Edit Question</h1>
          <p className="text-sm text-neutral-mid mt-1">{question.cadre} · {question.unit} · {question.topic} · {question.paper ?? 'No paper assigned'}</p>
        </div>
        <span className="text-xs rounded-full bg-neutral-light px-3 py-1.5 text-neutral-dark w-fit">{question.status.replace('_', ' ')}</span>
      </div>

      <Card>
        <form onSubmit={save} className="space-y-5">
          <div>
            <label htmlFor="stem" className="block text-sm font-semibold mb-2">Question stem</label>
            <textarea id="stem" value={question.stem} onChange={e => updateField('stem', e.target.value)} required minLength={10} rows={5}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold mb-2">Answer options</legend>
            {OPTION_FIELDS.map(([field, label]) => (
              <div key={field} className="flex gap-3 items-start">
                <span className="mt-2.5 w-7 h-7 rounded-full bg-neutral-light flex items-center justify-center text-xs font-bold shrink-0">{label}</span>
                <textarea aria-label={`Option ${label}`} value={question[field]} onChange={e => updateField(field, e.target.value)} required rows={2}
                  className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            ))}
          </fieldset>

          <div>
            <label htmlFor="correctOption" className="block text-sm font-semibold mb-2">Correct option</label>
            <select id="correctOption" value={question.correct_option} onChange={e => updateField('correct_option', e.target.value as EditableQuestion['correct_option'])}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
            </select>
          </div>

          <div>
            <label htmlFor="rationale" className="block text-sm font-semibold mb-2">Rationale</label>
            <textarea id="rationale" value={question.rationale} onChange={e => updateField('rationale', e.target.value)} required minLength={10} rows={6}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? <Spinner size="sm" color="white" /> : 'Save question'}
            </Button>
            <Link href="/admin/flagged"><Button type="button" variant="outline">Cancel</Button></Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
