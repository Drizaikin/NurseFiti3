"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────

type TargetRole = 'student' | 'tutor';
type ExamFilter = 'all' | 'passed' | 'active';
// 'bulk' = send to all students or all tutors (with optional exam filter)
// 'specific' = send only to individually selected students
type SendMode = 'bulk' | 'specific';

type SendResult = {
  sent: number;
  failed: number;
  skipped: number;
  total: number;
  failures: Array<{ email: string; reason: string }>;
};

type StudentRecord = {
  id: string;
  full_name: string;
  email: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const EXAM_FILTER_OPTIONS: Array<{ value: ExamFilter; label: string; desc: string }> = [
  { value: 'all',    label: 'All students',           desc: 'Every registered student' },
  { value: 'active', label: 'Upcoming / no date set', desc: 'Exam date in the future, or no date set' },
  { value: 'passed', label: 'Exam date passed',       desc: 'Students whose exam date has already passed' },
];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminEmailPage() {
  // Composition state
  const [sendMode, setSendMode] = useState<SendMode>('bulk');
  const [targetRole, setTargetRole] = useState<TargetRole>('student');
  const [examFilter, setExamFilter] = useState<ExamFilter>('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);

  // Individual mode state
  const [studentList, setStudentList] = useState<StudentRecord[]>([]);
  const [studentListLoading, setStudentListLoading] = useState(false);
  const [studentListLoaded, setStudentListLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [studentSearch, setStudentSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // ── Derived ──────────────────────────────────────────────────────────────

  const totalAttachmentBytes = useMemo(
    () => attachments.reduce((sum, file) => sum + file.size, 0),
    [attachments]
  );

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return studentList;
    return studentList.filter(
      s => s.full_name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    );
  }, [studentList, studentSearch]);

  const canSend =
    subject.trim().length > 0 &&
    message.trim().length > 0 &&
    totalAttachmentBytes <= MAX_TOTAL_ATTACHMENT_BYTES &&
    !isSending &&
    (sendMode === 'bulk' || selectedIds.size > 0);

  // ── Load student list (lazy, only when specific mode is first entered) ────

  const loadStudentList = useCallback(async () => {
    if (studentListLoaded) return;
    setStudentListLoading(true);
    try {
      const res = await fetch('/api/admin/data?type=students');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load students');
      const students: StudentRecord[] = (data.students ?? []).map((s: any) => ({
        id: s.id,
        full_name: s.full_name ?? '',
        email: s.email ?? '',
      }));
      setStudentList(students);
      setStudentListLoaded(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load student list');
    } finally {
      setStudentListLoading(false);
    }
  }, [studentListLoaded]);

  // ── Mode switching ────────────────────────────────────────────────────────

  const handleModeChange = (mode: SendMode) => {
    setSendMode(mode);
    if (mode === 'specific') {
      loadStudentList();
      // Focus search once list is shown
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleRoleChange = (role: TargetRole) => {
    setTargetRole(role);
    if (role === 'tutor') setExamFilter('all');
  };

  // ── Selection helpers ─────────────────────────────────────────────────────

  const toggleStudent = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (filteredStudents.every(s => selectedIds.has(s.id))) {
      // Deselect all currently visible
      setSelectedIds(prev => {
        const next = new Set(prev);
        filteredStudents.forEach(s => next.delete(s.id));
        return next;
      });
    } else {
      // Select all currently visible
      setSelectedIds(prev => {
        const next = new Set(prev);
        filteredStudents.forEach(s => next.add(s.id));
        return next;
      });
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  // ── Audience summary for sidebar ──────────────────────────────────────────

  const audienceSummary = () => {
    if (sendMode === 'specific') {
      return selectedIds.size === 0
        ? 'None selected'
        : `${selectedIds.size} student${selectedIds.size !== 1 ? 's' : ''} selected`;
    }
    if (targetRole === 'tutor') return 'Tutors only';
    const filterLabel = EXAM_FILTER_OPTIONS.find(o => o.value === examFilter)?.label ?? 'All students';
    return `Students — ${filterLabel}`;
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) return;

    setIsSending(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('sendMode', sendMode);
      formData.append('subject', subject.trim());
      formData.append('message', message.trim());
      attachments.forEach(file => formData.append('attachments', file));

      if (sendMode === 'specific') {
        formData.append('specificIds', Array.from(selectedIds).join(','));
      } else {
        formData.append('targetRole', targetRole);
        formData.append('examFilter', examFilter);
      }

      const response = await fetch('/api/admin/bulk-email', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Failed to send emails.');

      setResult(data);
      if (data.sent > 0) {
        toast.success(`Sent ${data.sent} email${data.sent === 1 ? '' : 's'}.`);
      } else {
        toast.error('No emails were sent.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send emails.');
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    setSubject('');
    setMessage('');
    setAttachments([]);
    setResult(null);
    if (sendMode === 'specific') clearSelection();
  };

  const sendButtonLabel = () => {
    if (isSending) return null;
    if (sendMode === 'specific') return `Send to ${selectedIds.size} student${selectedIds.size !== 1 ? 's' : ''}`;
    return `Send to ${targetRole === 'student' ? 'Students' : 'Tutors'}`;
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Bulk Email</h1>
        <p className="text-neutral-mid text-sm mt-1">
          Send announcements to all students, all tutors, or specific individuals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <Card className="space-y-5">

          {/* ── Send mode tabs ── */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Send to</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'bulk'     as const, label: 'All Students' },
                { value: 'bulk'     as const, label: 'All Tutors',   role: 'tutor' as TargetRole },
                { value: 'specific' as const, label: 'Specific Students' },
              ].map((opt, idx) => {
                const isActive =
                  idx === 2
                    ? sendMode === 'specific'
                    : sendMode === 'bulk' && targetRole === (opt.role ?? 'student');
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (idx === 2) {
                        handleModeChange('specific');
                      } else {
                        handleModeChange('bulk');
                        handleRoleChange(opt.role ?? 'student');
                      }
                    }}
                    className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-all text-center ${
                      isActive
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-[var(--color-border)] text-neutral-mid hover:border-primary/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Exam date filter (bulk students only) ── */}
          {sendMode === 'bulk' && targetRole === 'student' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">
                Filter by exam date
              </label>
              <div className="grid grid-cols-1 gap-2">
                {EXAM_FILTER_OPTIONS.map(option => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      examFilter === option.value
                        ? 'border-primary bg-primary-light'
                        : 'border-[var(--color-border)] hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="examFilter"
                      value={option.value}
                      checked={examFilter === option.value}
                      onChange={() => setExamFilter(option.value)}
                      className="mt-0.5 accent-primary shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">{option.label}</p>
                      <p className="text-xs text-neutral-mid">{option.desc}</p>
                    </div>
                    {examFilter === option.value && (
                      <span className="ml-auto text-primary shrink-0">✓</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── Individual student picker ── */}
          {sendMode === 'specific' && (
            <div>
              <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Select students
                  {selectedIds.size > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
                      {selectedIds.size > 99 ? '99+' : selectedIds.size}
                    </span>
                  )}
                </label>
                {selectedIds.size > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-xs text-error hover:underline"
                  >
                    Clear all ({selectedIds.size})
                  </button>
                )}
              </div>

              {/* Search */}
              <input
                ref={searchRef}
                type="text"
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-2"
              />

              {/* Student list */}
              <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                {studentListLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner size="md" color="primary" />
                  </div>
                ) : studentList.length === 0 ? (
                  <div className="py-8 text-center text-sm text-neutral-mid">
                    No students found.
                  </div>
                ) : (
                  <>
                    {/* Select-all row */}
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-primary-xlight/50 dark:bg-primary/5 border-b border-[var(--color-border)]">
                      <input
                        id="select-all-students"
                        type="checkbox"
                        checked={filteredStudents.length > 0 && filteredStudents.every(s => selectedIds.has(s.id))}
                        onChange={toggleAll}
                        className="accent-primary w-4 h-4 shrink-0"
                      />
                      <label htmlFor="select-all-students" className="text-xs font-semibold text-neutral-mid cursor-pointer select-none">
                        {filteredStudents.every(s => selectedIds.has(s.id)) && filteredStudents.length > 0
                          ? `Deselect all ${filteredStudents.length} shown`
                          : `Select all ${filteredStudents.length} shown`}
                      </label>
                    </div>

                    {/* Scrollable list */}
                    <div className="max-h-64 overflow-y-auto divide-y divide-[var(--color-border)]">
                      {filteredStudents.length === 0 ? (
                        <div className="py-6 text-center text-sm text-neutral-mid">
                          No students match &ldquo;{studentSearch}&rdquo;
                        </div>
                      ) : (
                        filteredStudents.map(s => {
                          const checked = selectedIds.has(s.id);
                          return (
                            <label
                              key={s.id}
                              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors select-none ${
                                checked
                                  ? 'bg-primary-light dark:bg-primary/10'
                                  : 'hover:bg-primary-xlight/40 dark:hover:bg-primary/5'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleStudent(s.id)}
                                className="accent-primary w-4 h-4 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-[var(--color-text)] truncate">{s.full_name || '—'}</p>
                                <p className="text-xs text-neutral-mid truncate">{s.email}</p>
                              </div>
                              {checked && (
                                <span className="text-primary shrink-0 text-sm">✓</span>
                              )}
                            </label>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>

              {selectedIds.size === 0 && !studentListLoading && (
                <p className="mt-1.5 text-xs text-neutral-mid">
                  Select at least one student to send the email.
                </p>
              )}
            </div>
          )}

          {/* ── Subject ── */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Subject</label>
            <input
              id="subject"
              value={subject}
              onChange={event => setSubject(event.target.value)}
              maxLength={140}
              placeholder="Example: New NurseFiti revision resources"
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* ── Message ── */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Message</label>
            <div className="bg-[var(--color-card)] rounded-xl overflow-hidden [&_.ql-toolbar]:border-[var(--color-border)] [&_.ql-container]:border-[var(--color-border)] [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-transparent transition-all">
              <ReactQuill
                theme="snow"
                value={message}
                onChange={setMessage}
                placeholder="Write the announcement. The email will automatically start with the recipient's first name and end with the NurseFiti signature."
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'clean']
                  ]
                }}
              />
            </div>
          </div>

          {/* ── Attachments ── */}
          <div>
            <label htmlFor="attachments" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Attachments</label>
            <input
              id="attachments"
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              onChange={event => setAttachments(Array.from(event.target.files ?? []))}
              className="block w-full text-sm text-neutral-mid file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
            />
            <p className={`mt-2 text-xs ${totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES ? 'text-error font-semibold' : 'text-neutral-mid'}`}>
              Attachment total: {formatBytes(totalAttachmentBytes)} / 20 MB
            </p>
            {attachments.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-neutral-mid">
                {attachments.map(file => (
                  <li key={`${file.name}-${file.size}`} className="flex justify-between gap-3 rounded-lg bg-primary-xlight/50 px-3 py-2 dark:bg-primary/10">
                    <span className="truncate">{file.name}</span>
                    <span className="shrink-0">{formatBytes(file.size)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={handleClear} disabled={isSending}>
              Clear
            </Button>
            <Button type="submit" variant="primary" disabled={!canSend}>
              {isSending ? <Spinner size="sm" color="white" /> : sendButtonLabel()}
            </Button>
          </div>
        </Card>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-3">Send Summary</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-mid">Audience</dt>
                <dd className="font-semibold text-[var(--color-text)] text-right">{audienceSummary()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-mid">Attachments</dt>
                <dd className="font-semibold text-[var(--color-text)]">{attachments.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-mid">Size</dt>
                <dd className="font-semibold text-[var(--color-text)]">{formatBytes(totalAttachmentBytes)}</dd>
              </div>
            </dl>
          </Card>

          {result && (
            <Card>
              <h2 className="font-heading font-bold text-[var(--color-text)] mb-3">Last Result</h2>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-xl bg-success/10 p-3">
                  <p className="text-2xl font-bold text-success">{result.sent}</p>
                  <p className="text-xs text-neutral-mid">Sent</p>
                </div>
                <div className="rounded-xl bg-error/10 p-3">
                  <p className="text-2xl font-bold text-error">{result.failed}</p>
                  <p className="text-xs text-neutral-mid">Failed</p>
                </div>
                <div className="rounded-xl bg-primary-xlight p-3 dark:bg-primary/10">
                  <p className="text-2xl font-bold text-primary">{result.skipped}</p>
                  <p className="text-xs text-neutral-mid">Skipped</p>
                </div>
              </div>
              {result.failures.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-error mb-2">Failure samples</p>
                  <ul className="space-y-2 text-xs text-neutral-mid">
                    {result.failures.map(failure => (
                      <li key={`${failure.email}-${failure.reason}`} className="rounded-lg border border-error/20 p-2">
                        <span className="font-semibold">{failure.email}</span>: {failure.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}
        </div>
      </form>
    </div>
  );
}
