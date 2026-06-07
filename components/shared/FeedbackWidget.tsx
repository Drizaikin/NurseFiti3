"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'general' | 'complaint' | 'suggestion' | 'bug_report' | 'praise';
type ContactChannel = 'email' | 'whatsapp' | 'none';

const CATEGORIES: { value: Category; label: string; icon: string; desc: string }[] = [
  { value: 'praise',      label: 'Praise',      icon: '🌟', desc: 'Something you love about NurseFiti' },
  { value: 'suggestion',  label: 'Suggestion',  icon: '💡', desc: 'An idea to make it better' },
  { value: 'complaint',   label: 'Complaint',   icon: '⚠️', desc: 'Something that frustrated you' },
  { value: 'bug_report',  label: 'Bug Report',  icon: '🐛', desc: 'Something that is broken' },
  { value: 'general',     label: 'General',     icon: '💬', desc: 'Anything else on your mind' },
];

const SUPPORT_EMAIL = 'support@nursefiti.vercel.app';
const SUPPORT_WHATSAPP = '254791952703';

// ─── Star picker ──────────────────────────────────────────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
  const active = hovered || value;

  return (
    <div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`${s} star${s !== 1 ? 's' : ''}`}
          >
            <svg
              className={`w-8 h-8 transition-colors ${s <= active ? 'text-accent' : 'text-neutral-border'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        {active > 0 && (
          <span className="ml-2 text-sm font-semibold text-accent">{labels[active]}</span>
        )}
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

interface FeedbackWidgetProps {
  /** Trigger element — renders a button if not provided */
  trigger?: React.ReactNode;
  /** Pre-fill the user's display name */
  displayName?: string;
  /** Pre-fill the user's cadre */
  cadre?: string;
  /** 'student' or 'tutor' */
  userRole?: 'student' | 'tutor';
  /** Variant for the default trigger button */
  triggerVariant?: 'navbar' | 'dashboard' | 'fab';
}

export function FeedbackWidget({
  trigger,
  displayName = '',
  cadre,
  userRole = 'student',
  triggerVariant = 'dashboard',
}: FeedbackWidgetProps) {
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'channel' | 'done'>('form');

  // Form state
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<Category>('general');
  const [message, setMessage] = useState('');
  const [nameInput, setNameInput] = useState(displayName);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedChannel, setSubmittedChannel] = useState<ContactChannel>('none');

  const reset = () => {
    setStep('form');
    setRating(0);
    setCategory('general');
    setMessage('');
    setNameInput(displayName);
    setIsAnonymous(false);
    setError('');
    setSubmittedChannel('none');
  };

  const handleOpen = () => { reset(); setIsOpen(true); };
  const handleClose = () => { setIsOpen(false); };

  const handleSubmit = async (channel: ContactChannel) => {
    if (rating === 0) { setError('Please select a star rating.'); return; }
    if (message.trim().length < 10) { setError('Please write at least 10 characters.'); return; }

    setIsSubmitting(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError('You must be logged in to submit feedback.'); setIsSubmitting(false); return; }

      const finalName = isAnonymous ? 'Anonymous' : (nameInput.trim() || displayName || 'User');

      const { error: insertError } = await (supabase as any).from('app_feedback').insert({
        user_id: user.id,
        user_role: userRole,
        display_name: finalName,
        cadre: cadre ?? null,
        category,
        rating,
        message: message.trim(),
        contact_channel: channel,
        is_approved: true,
      });

      if (insertError) throw insertError;

      setSubmittedChannel(channel);
      setStep('done');
    } catch (err) {
      console.error('Feedback submit error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build WhatsApp message
  const whatsappText = encodeURIComponent(
    `Hi NurseFiti Support 👋\n\nI just submitted feedback on the platform:\n\n` +
    `Category: ${CATEGORIES.find(c => c.value === category)?.label}\n` +
    `Rating: ${'⭐'.repeat(rating)}\n\n` +
    `"${message.trim()}"\n\n` +
    `— ${isAnonymous ? 'Anonymous' : nameInput || displayName}`
  );

  // ── Trigger button variants ──────────────────────────────────────────────
  const defaultTrigger = {
    navbar: (
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary-light transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Feedback
      </button>
    ),
    dashboard: (
      <button
        onClick={handleOpen}
        className="w-full flex items-center gap-3 p-4 rounded-2xl border border-[var(--color-border)] hover:border-primary/40 hover:bg-primary-xlight transition-all text-left group"
      >
        <span className="text-2xl">💬</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[var(--color-text)]">Send Feedback</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Complaints, suggestions, or praise</p>
        </div>
        <svg className="w-4 h-4 text-neutral-mid group-hover:text-primary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
    fab: (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary-mid transition-colors"
        aria-label="Send feedback"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    ),
  }[triggerVariant];

  return (
    <>
      {/* Trigger */}
      <div onClick={trigger ? undefined : undefined}>
        {trigger ? <span onClick={handleOpen} className="cursor-pointer">{trigger}</span> : defaultTrigger}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} title={step === 'done' ? undefined : 'Share Your Feedback'} size="md">

        {/* ── DONE STATE ── */}
        {step === 'done' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-[var(--color-text)] mb-2">Thank you!</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Your feedback has been posted publicly and our team has been notified.
            </p>

            {/* Contact channel actions */}
            <div className="space-y-3 mb-6">
              {submittedChannel === 'none' && (
                <div className="bg-primary-xlight dark:bg-primary/10 rounded-xl p-4 text-sm text-[var(--color-text-secondary)]">
                  Want a direct response? Reach us via:
                  <div className="flex gap-3 mt-3 justify-center">
                    <a
                      href={`mailto:${SUPPORT_EMAIL}?subject=Feedback: ${CATEGORIES.find(c => c.value === category)?.label}&body=${encodeURIComponent(message)}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-mid transition-colors"
                    >
                      ✉️ Email Support
                    </a>
                    <a
                      href={`https://wa.me/${SUPPORT_WHATSAPP}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white text-sm font-semibold hover:bg-success/80 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              )}
              {submittedChannel === 'email' && (
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Feedback: ${CATEGORIES.find(c => c.value === category)?.label}&body=${encodeURIComponent(message)}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-mid transition-colors"
                >
                  ✉️ Open Email to Support
                </a>
              )}
              {submittedChannel === 'whatsapp' && (
                <a
                  href={`https://wa.me/${SUPPORT_WHATSAPP}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-success text-white font-semibold hover:bg-success/80 transition-colors"
                >
                  💬 Open WhatsApp Chat
                </a>
              )}
            </div>

            <Button variant="ghost" onClick={handleClose} className="w-full">Close</Button>
          </div>
        )}

        {/* ── FORM STATE ── */}
        {step === 'form' && (
          <div className="space-y-5">

            {/* Display name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-[var(--color-text)]">Your name (shown publicly)</label>
                <label className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="rounded"
                  />
                  Post anonymously
                </label>
              </div>
              {!isAnonymous && (
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="e.g. Cynthia A."
                  className="input text-sm"
                  maxLength={40}
                />
              )}
              {isAnonymous && (
                <div className="input text-sm text-[var(--color-text-secondary)] bg-neutral-border/20">Anonymous</div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-[var(--color-text)] block mb-2">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-all text-sm ${
                      category === c.value
                        ? 'border-primary bg-primary-light text-primary font-semibold'
                        : 'border-[var(--color-border)] hover:border-primary/40 text-[var(--color-text)]'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div>
              <label className="text-sm font-semibold text-[var(--color-text)] block mb-2">Overall rating</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-[var(--color-text)] block mb-1.5">
                Your message
                <span className="text-[var(--color-text-secondary)] font-normal ml-1">({message.length}/1000)</span>
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={
                  category === 'complaint' ? 'Tell us what went wrong and how it affected you...' :
                  category === 'suggestion' ? 'Describe your idea and how it would help students...' :
                  category === 'bug_report' ? 'What happened? What did you expect to happen? Which page?' :
                  category === 'praise' ? 'What do you love about NurseFiti?' :
                  'Share your thoughts with the NurseFiti team...'
                }
                rows={4}
                maxLength={1000}
                className="input text-sm resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">{error}</p>
            )}

            {/* Contact channel choice */}
            <div className="bg-primary-xlight dark:bg-primary/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-[var(--color-text)] mb-3">
                How would you like us to follow up? <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleSubmit('email')}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-mid transition-colors disabled:opacity-50"
                >
                  ✉️ Submit & Email Us
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('whatsapp')}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-success text-white text-sm font-semibold hover:bg-success/80 transition-colors disabled:opacity-50"
                >
                  💬 Submit & WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('none')}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[var(--color-border)] text-[var(--color-text)] text-sm font-semibold hover:border-primary/40 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Just Submit'}
                </button>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-2 text-center">
                Your feedback is posted publicly. Choosing Email or WhatsApp also opens a direct chat with our team.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
