"use client";

import { FormEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type TargetRole = 'student' | 'tutor';

type SendResult = {
  sent: number;
  failed: number;
  skipped: number;
  total: number;
  failures: Array<{ email: string; reason: string }>;
};

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminEmailPage() {
  const [targetRole, setTargetRole] = useState<TargetRole>('student');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);

  const totalAttachmentBytes = useMemo(
    () => attachments.reduce((sum, file) => sum + file.size, 0),
    [attachments]
  );

  const canSend = subject.trim().length > 0 &&
    message.trim().length > 0 &&
    totalAttachmentBytes <= MAX_TOTAL_ATTACHMENT_BYTES &&
    !isSending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) return;

    setIsSending(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('targetRole', targetRole);
      formData.append('subject', subject.trim());
      formData.append('message', message.trim());
      attachments.forEach(file => formData.append('attachments', file));

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Bulk Email</h1>
        <p className="text-neutral-mid text-sm mt-1">Send Gmail announcements to registered students or tutors.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <Card className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Audience</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student' as const, label: 'Students only' },
                { value: 'tutor' as const, label: 'Tutors only' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTargetRole(option.value)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                    targetRole === option.value
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-[var(--color-border)] text-neutral-mid hover:border-primary/40'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

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

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSubject('');
                setMessage('');
                setAttachments([]);
                setResult(null);
              }}
              disabled={isSending}
            >
              Clear
            </Button>
            <Button type="submit" variant="primary" disabled={!canSend}>
              {isSending ? <Spinner size="sm" color="white" /> : `Send to ${targetRole === 'student' ? 'Students' : 'Tutors'}`}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-3">Send Summary</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-mid">Audience</dt>
                <dd className="font-semibold text-[var(--color-text)]">{targetRole === 'student' ? 'Students only' : 'Tutors only'}</dd>
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
