"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

interface Student {
  id: string;
  full_name: string;
  cadre: string;
  xp: number;
  level: number;
  accuracy: number;
  total_answers: number;
  sessions_count: number;
  last_session_date: string | null;
  is_at_risk: boolean;
}

interface SessionNote {
  id: string;
  note_text: string;
  created_at: string;
}

export default function TutorStudentsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCadre, setFilterCadre] = useState('all');
  const [filterRisk, setFilterRisk] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      await loadStudents(user.id);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStudents = async (tutorId: string) => {
    // Get all unique students from sessions
    const { data: sessData } = await supabase.from('sessions')
      .select('student_id, session_date, cadre')
      .eq('tutor_id', tutorId)
      .in('status', ['confirmed', 'completed']);

    const sessArr = (sessData ?? []) as Array<{ student_id: string; session_date: string; cadre: string }>;
    if (sessArr.length === 0) { setStudents([]); return; }

    const studentMap = new Map<string, { sessions: number; last_date: string | null; cadre: string }>();
    for (const s of sessArr) {
      const existing = studentMap.get(s.student_id);
      studentMap.set(s.student_id, {
        sessions: (existing?.sessions ?? 0) + 1,
        last_date: !existing?.last_date || s.session_date > existing.last_date ? s.session_date : existing.last_date,
        cadre: s.cadre,
      });
    }

    const studentIds = Array.from(studentMap.keys());
    const [profilesRes, studentProfilesRes, answersRes] = await Promise.all([
      supabase.from('profiles').select('id, full_name').in('id', studentIds),
      supabase.from('student_profiles').select('id, cadre, xp, level').in('id', studentIds),
      supabase.from('student_answers').select('student_id, is_correct').in('student_id', studentIds),
    ]);

    const profiles = Object.fromEntries((profilesRes.data ?? []).map((p: any) => [p.id, p.full_name]));
    const spMap = Object.fromEntries((studentProfilesRes.data ?? []).map((p: any) => [p.id, p]));
    const answers = (answersRes.data ?? []) as Array<{ student_id: string; is_correct: boolean }>;

    const enriched: Student[] = studentIds.map(id => {
      const meta = studentMap.get(id)!;
      const sp = spMap[id] as any;
      const studentAnswers = answers.filter(a => a.student_id === id);
      const correct = studentAnswers.filter(a => a.is_correct).length;
      const accuracy = studentAnswers.length > 0 ? Math.round((correct / studentAnswers.length) * 100) : 0;
      return {
        id,
        full_name: profiles[id] ?? 'Student',
        cadre: sp?.cadre ?? meta.cadre,
        xp: sp?.xp ?? 0,
        level: sp?.level ?? 1,
        accuracy,
        total_answers: studentAnswers.length,
        sessions_count: meta.sessions,
        last_session_date: meta.last_date,
        is_at_risk: accuracy < 60 && studentAnswers.length > 10,
      };
    });

    setStudents(enriched.sort((a, b) => (b.is_at_risk ? 1 : 0) - (a.is_at_risk ? 1 : 0)));
  };

  const loadNotes = async (studentId: string) => {
    if (!userId) return;
    const { data } = await supabase.from('session_notes')
      .select('id, note_text, created_at')
      .eq('tutor_id', userId).eq('student_id', studentId)
      .order('created_at', { ascending: false });
    setNotes((data ?? []) as SessionNote[]);
  };

  const selectStudent = async (student: Student) => {
    setSelectedStudent(student);
    await loadNotes(student.id);
  };

  const saveNote = async () => {
    if (!userId || !selectedStudent || !noteText.trim()) return;
    setSavingNote(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('session_notes').insert({
      tutor_id: userId, student_id: selectedStudent.id, note_text: noteText.trim(),
    });
    setSavingNote(false);
    if (error) { toast.error('Failed to save note'); return; }
    toast.success('Note saved');
    setNoteText('');
    await loadNotes(selectedStudent.id);
  };

  const filtered = students.filter(s => {
    if (search && !s.full_name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCadre !== 'all' && s.cadre !== filterCadre) return false;
    if (filterRisk && !s.is_at_risk) return false;
    return true;
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">My Students</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{students.length} student{students.length !== 1 ? 's' : ''} total</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Student list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <input
              type="text" placeholder="Search students..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="input flex-1 min-w-[200px] text-sm py-2"
            />
            <select value={filterCadre} onChange={e => setFilterCadre(e.target.value)} className="input w-auto text-sm py-2">
              <option value="all">All Cadres</option>
              <option value="KRCHN">KRCHN</option>
              <option value="BScN">BScN</option>
              <option value="Higher Diploma">Higher Diploma</option>
            </select>
            <button
              onClick={() => setFilterRisk(!filterRisk)}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${filterRisk ? 'bg-error/10 border-error/30 text-error' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-error/30'}`}
            >
              ⚠️ At Risk Only
            </button>
          </div>

          {filtered.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-4xl mb-3">👥</p>
              <p className="text-[var(--color-text-secondary)]">
                {students.length === 0 ? 'No students yet. Students will appear here after booking sessions with you.' : 'No students match your filters.'}
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map(s => (
                <button key={s.id} onClick={() => selectStudent(s)} className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:border-primary/40 ${selectedStudent?.id === s.id ? 'border-primary bg-primary-light' : s.is_at_risk ? 'border-error/30 bg-error/5' : 'border-[var(--color-border)] bg-[var(--color-card)]'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {s.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm text-[var(--color-text)]">{s.full_name}</p>
                        {s.is_at_risk && <Badge variant="error" size="sm">⚠️ At Risk</Badge>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                        <Badge variant="teal" size="sm">{s.cadre}</Badge>
                        <span>Lv {s.level}</span>
                        <span>{s.sessions_count} session{s.sessions_count !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-lg font-heading font-bold ${s.accuracy >= 70 ? 'text-success' : s.accuracy >= 50 ? 'text-accent' : 'text-error'}`}>{s.accuracy}%</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">accuracy</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={s.accuracy} color={s.accuracy >= 70 ? 'green' : s.accuracy >= 50 ? 'amber' : 'red'} size="sm" showLabel={false} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedStudent ? (
            <div className="space-y-4 sticky top-24">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {selectedStudent.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[var(--color-text)]">{selectedStudent.full_name}</p>
                    <Badge variant="teal" size="sm">{selectedStudent.cadre}</Badge>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Level</span>
                    <span className="font-semibold">{selectedStudent.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">XP</span>
                    <span className="font-semibold">{selectedStudent.xp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Accuracy</span>
                    <span className={`font-bold ${selectedStudent.accuracy >= 70 ? 'text-success' : selectedStudent.accuracy >= 50 ? 'text-accent' : 'text-error'}`}>{selectedStudent.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Questions</span>
                    <span className="font-semibold">{selectedStudent.total_answers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Sessions</span>
                    <span className="font-semibold">{selectedStudent.sessions_count}</span>
                  </div>
                  {selectedStudent.last_session_date && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Last Session</span>
                      <span className="font-semibold">{new Date(selectedStudent.last_session_date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>
                {selectedStudent.is_at_risk && (
                  <div className="mt-4 p-3 rounded-xl bg-error/10 border border-error/20">
                    <p className="text-xs font-semibold text-error">⚠️ At Risk</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Accuracy below 60% with 10+ questions answered. Consider reaching out.</p>
                  </div>
                )}
              </Card>

              {/* Session notes */}
              <Card>
                <h3 className="font-heading font-bold text-[var(--color-text)] mb-3">Private Notes</h3>
                <textarea
                  className="input resize-none text-sm mb-3" rows={3}
                  placeholder="Add a private note about this student..."
                  value={noteText} onChange={e => setNoteText(e.target.value)}
                />
                <Button variant="primary" size="sm" className="w-full" onClick={saveNote} disabled={savingNote || !noteText.trim()}>
                  {savingNote ? <Spinner size="sm" color="white" /> : 'Save Note'}
                </Button>
                {notes.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                    {notes.map(n => (
                      <div key={n.id} className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-xs">
                        <p className="text-[var(--color-text)]">{n.note_text}</p>
                        <p className="text-[var(--color-text-secondary)] mt-1">{new Date(n.created_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-4xl mb-3">👆</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Select a student to view their details and add notes</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
