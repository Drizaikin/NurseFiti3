'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface AiTutorExitFeedbackModalProps {
  isOpen: boolean;
  onProceedExit: () => void;
  onStay: () => void;
  sessionMessageCount?: number;
  selectedVoice?: string;
  isReviewOnly?: boolean;
}

export function AiTutorExitFeedbackModal({
  isOpen,
  onProceedExit,
  onStay,
  sessionMessageCount = 0,
  selectedVoice,
  isReviewOnly = false,
}: AiTutorExitFeedbackModalProps) {
  const supabase = createClient();

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [experience, setExperience] = useState('');
  const [expected, setExpected] = useState('');
  const [disappointing, setDisappointing] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [insistWarning, setInsistWarning] = useState(false);
  const [insistAttempts, setInsistAttempts] = useState(0);

  // When user clicks "Leave without feedback" or dismiss
  const handleAttemptBypass = () => {
    if (isReviewOnly) {
      onStay();
      return;
    }

    // Insist at least once if fields are blank
    if ((!experience.trim() || !expected.trim() || !disappointing.trim() || rating === 0) && insistAttempts < 1) {
      setInsistWarning(true);
      setInsistAttempts((prev) => prev + 1);
      return;
    }

    // If they insist on leaving a second time, let them leave
    onProceedExit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a star rating between 1 and 5 stars');
      return;
    }

    if (!experience.trim() || !expected.trim()) {
      toast.error('Please share what your experience was and what you expected.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      let fullName = 'Nursing Student';
      let cadre = 'Student';

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();
        if ((profile as any)?.full_name) fullName = (profile as any).full_name;

        const { data: studentProfile } = await supabase
          .from('student_profiles')
          .select('cadre')
          .eq('id', user.id)
          .maybeSingle();
        if ((studentProfile as any)?.cadre) cadre = (studentProfile as any).cadre;
      }

      // Submit strictly to private AI Tutor feedback endpoint (Admin-only, NOT public)
      const res = await fetch('/api/ai/tutor/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          experience: experience.trim(),
          expected: expected.trim(),
          disappointing: disappointing.trim(),
          recommendations: recommendations.trim(),
          selectedVoice: selectedVoice || null,
          sessionMessageCount,
          userName: fullName,
          cadre,
        }),
      });

      if (!res.ok) {
        console.warn('[ai/tutor/feedback] Server responded with error status:', res.status);
      }

      // Also save locally as a backup record
      try {
        const localLogs = JSON.parse(localStorage.getItem('nursefiti_ai_tutor_feedback_log') || '[]');
        localLogs.push({
          date: new Date().toISOString(),
          rating,
          experience: experience.trim(),
          expected: expected.trim(),
          disappointing: disappointing.trim(),
          recommendations: recommendations.trim(),
          selectedVoice,
        });
        localStorage.setItem('nursefiti_ai_tutor_feedback_log', JSON.stringify(localLogs.slice(-20)));
      } catch {}

      toast.success('Thank you! Your review & recommendations will directly improve the AI Tutor 🩺💙', {
        duration: 4000,
      });

      if (isReviewOnly) {
        onStay();
      } else {
        onProceedExit();
      }
    } catch (err: any) {
      console.warn('[ai/tutor/feedback] Error submitting feedback:', err);
      toast.success('Thank you for your feedback! 🩺');
      if (isReviewOnly) {
        onStay();
      } else {
        onProceedExit();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const starLabels = ['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Excellent 🌟'];
  const activeStar = hoveredRating || rating;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
            onClick={handleAttemptBypass}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[var(--color-card)] border-2 border-primary/30 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header Badge & Title */}
            <div className="bg-gradient-to-r from-teal-700 via-primary to-teal-800 p-5 sm:p-6 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl sm:text-3xl">🩺</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                      {isReviewOnly ? 'Review & Recommend AI Tutor' : 'Help Us Improve AI Tutor'}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      {isReviewOnly
                        ? 'Private review for academic & clinical development'
                        : 'Your honest feedback is private and read directly by our clinical team'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAttemptBypass}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Insist Alert Banner */}
              <AnimatePresence>
                {insistWarning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="p-3 rounded-xl bg-amber-400 text-amber-950 text-xs font-semibold flex items-center gap-2 shadow-md"
                  >
                    <span className="text-base shrink-0">⚠️</span>
                    <span>
                      Please share a quick thought before leaving! Your recommendations help us upgrade the clinical tutor for everyone.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[calc(85vh-160px)] overflow-y-auto">
              {/* Star Rating Picker */}
              <div className="text-center py-1 border-b border-[var(--color-border)]/60 pb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Overall AI Tutor Experience <span className="text-rose-500">*</span>
                </label>
                <div className="flex justify-center items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => {
                        setRating(star);
                        setInsistWarning(false);
                      }}
                      className="text-3xl sm:text-4xl transition-transform hover:scale-125 active:scale-95 focus:outline-none"
                    >
                      <span className={star <= activeStar ? 'text-amber-400 drop-shadow-sm' : 'text-neutral-300 dark:text-neutral-700'}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                {activeStar > 0 && (
                  <p className="text-xs font-semibold text-primary mt-1.5 animate-fadeIn">
                    {starLabels[activeStar]}
                  </p>
                )}
              </div>

              {/* Question 1: Experience */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  1. What was your experience with the AI Tutor? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                    if (insistWarning) setInsistWarning(false);
                  }}
                  rows={2}
                  maxLength={500}
                  placeholder="e.g. It answered my questions on pharmacology quickly, the voice feature worked well, or explanations felt too basic..."
                  className={`input w-full text-xs sm:text-sm py-2 px-3 resize-none ${
                    insistWarning && !experience.trim() ? 'border-amber-500 ring-2 ring-amber-500/30' : ''
                  }`}
                  required
                />
              </div>

              {/* Question 2: Expected */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  2. What did you expect from the AI Tutor? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={expected}
                  onChange={(e) => {
                    setExpected(e.target.value);
                    if (insistWarning) setInsistWarning(false);
                  }}
                  rows={2}
                  maxLength={500}
                  placeholder="e.g. I expected it to quiz me specifically on Kenya NCK past exams, know my exact syllabus, or provide audio flashcards..."
                  className={`input w-full text-xs sm:text-sm py-2 px-3 resize-none ${
                    insistWarning && !expected.trim() ? 'border-amber-500 ring-2 ring-amber-500/30' : ''
                  }`}
                  required
                />
              </div>

              {/* Question 3: Disappointing */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  3. What did you find disappointing or frustrating?
                </label>
                <textarea
                  value={disappointing}
                  onChange={(e) => setDisappointing(e.target.value)}
                  rows={2}
                  maxLength={500}
                  placeholder="e.g. The answer was too long, voice was too fast, or didn't notice my uploaded notes..."
                  className="input w-full text-xs sm:text-sm py-2 px-3 resize-none"
                />
              </div>

              {/* Question 4: Recommendations */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  4. Your Recommendations & Feature Requests
                </label>
                <textarea
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  rows={2}
                  maxLength={500}
                  placeholder="e.g. Add more British accents, add clinical scenario roleplay, let me upload my clinical rotation cases..."
                  className="input w-full text-xs sm:text-sm py-2 px-3 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-center justify-between border-t border-[var(--color-border)]/60">
                <button
                  type="button"
                  onClick={onStay}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-primary transition-colors py-1 order-3 sm:order-1"
                >
                  {isReviewOnly ? 'Cancel' : '← Stay on AI Tutor'}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2 justify-end">
                  {!isReviewOnly && (
                    <button
                      type="button"
                      onClick={handleAttemptBypass}
                      className="text-xs text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors px-2 py-1.5"
                    >
                      {insistAttempts > 0 ? 'Leave anyway' : 'Skip & leave'}
                    </button>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="text-xs sm:text-sm py-2 px-4 font-bold shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex-1 sm:flex-initial justify-center"
                  >
                    {isSubmitting
                      ? 'Submitting…'
                      : isReviewOnly
                      ? 'Submit Review & Recommendations ★'
                      : 'Submit Feedback & Exit ➔'}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
