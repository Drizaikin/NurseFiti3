'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface ReviewPromptModalProps {
  // Optional custom role override if known
  role?: 'student' | 'tutor';
}

const STORAGE_KEY_REVIEWED = 'nf_has_submitted_general_review';
const SESSION_KEY_LOGIN_PROMPTED = 'nf_login_review_prompted';

export function ReviewPromptModal({ role }: ReviewPromptModalProps) {
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(true); // default true until checked
  const [promptReason, setPromptReason] = useState<'login' | 'logout' | 'exit'>('login');
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [category, setCategory] = useState<'general' | 'praise' | 'suggestion'>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingProceedRef = useRef<(() => void) | null>(null);
  const userRef = useRef<{ id: string; name: string; cadre: string | null; role: string } | null>(null);

  // Check Supabase if user already left a general review
  useEffect(() => {
    let isMounted = true;

    async function checkReviewStatus() {
      try {
        // Fast-path: local cache says reviewed
        if (localStorage.getItem(STORAGE_KEY_REVIEWED) === 'true') {
          if (isMounted) setHasReviewed(true);
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (isMounted) setHasReviewed(true);
          return;
        }

        // Get user profile details for review metadata
        const { data: profile } = await (supabase as any)
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .maybeSingle();

        const { data: studentProfile } = await (supabase as any)
          .from('student_profiles')
          .select('cadre')
          .eq('id', user.id)
          .maybeSingle();

        userRef.current = {
          id: user.id,
          name: (profile as any)?.full_name || 'NurseFiti Member',
          cadre: (studentProfile as any)?.cadre || null,
          role: role || (profile as any)?.role || 'student',
        };

        // Query app_feedback for an existing review by this user
        // Exclude internal AI tutor logs so they remain strictly separate
        const { data: existingReview } = await (supabase as any)
          .from('app_feedback')
          .select('id')
          .eq('user_id', user.id)
          .not('message', 'like', '%[INTERNAL AI TUTOR%')
          .limit(1)
          .maybeSingle();

        if (existingReview) {
          try {
            localStorage.setItem(STORAGE_KEY_REVIEWED, 'true');
          } catch {}
          if (isMounted) setHasReviewed(true);
          return;
        }

        // User has NOT left a review!
        if (isMounted) {
          setHasReviewed(false);
          try {
            localStorage.removeItem(STORAGE_KEY_REVIEWED);
          } catch {}

          // A) Prompt on Login: if not already prompted during this session
          const alreadyPromptedOnLogin = sessionStorage.getItem(SESSION_KEY_LOGIN_PROMPTED);
          if (!alreadyPromptedOnLogin) {
            // Grace delay of 2.8s so the dashboard and first paint settle smoothly
            const timer = setTimeout(() => {
              if (!isMounted) return;
              try {
                sessionStorage.setItem(SESSION_KEY_LOGIN_PROMPTED, 'true');
              } catch {}
              setPromptReason('login');
              setIsOpen(true);
            }, 2800);

            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.warn('[ReviewPromptModal] Review status check warning:', err);
      }
    }

    checkReviewStatus();

    return () => {
      isMounted = false;
    };
  }, [supabase, role]);

  // B) Prompt when user leaves / signs out (custom event listener)
  useEffect(() => {
    if (hasReviewed) return;

    const handleTrigger = (e: any) => {
      // If already reviewed, proceed immediately
      if (localStorage.getItem(STORAGE_KEY_REVIEWED) === 'true') {
        if (typeof e?.detail?.onProceed === 'function') {
          e.detail.onProceed();
        }
        return;
      }

      setPromptReason(e?.detail?.reason || 'logout');
      if (typeof e?.detail?.onProceed === 'function') {
        pendingProceedRef.current = e.detail.onProceed;
      } else {
        pendingProceedRef.current = null;
      }
      setIsOpen(true);
    };

    window.addEventListener('nf:trigger-general-review', handleTrigger);

    // Desktop exit-intent (moving cursor out top of window)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem('nf_exit_prompted')) {
        if (localStorage.getItem(STORAGE_KEY_REVIEWED) === 'true') return;
        try {
          sessionStorage.setItem('nf_exit_prompted', 'true');
        } catch {}
        setPromptReason('exit');
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('nf:trigger-general-review', handleTrigger);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasReviewed]);

  const handleDismiss = () => {
    setIsOpen(false);
    if (pendingProceedRef.current) {
      const proceed = pendingProceedRef.current;
      pendingProceedRef.current = null;
      proceed();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please pick a star rating between 1 and 5');
      return;
    }

    if (!reviewMessage.trim()) {
      toast.error('Please enter a brief sentence about your experience');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        handleDismiss();
        return;
      }

      const userName = userRef.current?.name || 'NurseFiti Member';
      const userRole = userRef.current?.role === 'tutor' ? 'tutor' : 'student';
      const cadre = userRef.current?.cadre || null;

      // Insert directly into public app_feedback
      const { error } = await (supabase as any).from('app_feedback').insert([
        {
          user_id: user.id,
          user_role: userRole,
          display_name: userName,
          cadre,
          category,
          rating,
          message: reviewMessage.trim(),
          contact_channel: 'none',
          is_approved: true, // Auto-approved for public feedback wall
        },
      ]);

      if (error) {
        console.warn('[ReviewPromptModal] Review insert error:', error.message);
      }

      // Mark permanently as reviewed so they will NEVER be prompted again!
      try {
        localStorage.setItem(STORAGE_KEY_REVIEWED, 'true');
      } catch {}
      setHasReviewed(true);
      setIsOpen(false);

      toast.success('Thank you for reviewing Nursefiti! Your review is deeply appreciated 🩺💙', {
        duration: 4500,
      });

      if (pendingProceedRef.current) {
        const proceed = pendingProceedRef.current;
        pendingProceedRef.current = null;
        proceed();
      }
    } catch (err: any) {
      console.error('[ReviewPromptModal] Submit failed:', err);
      toast.success('Thank you for your feedback! 🩺');
      handleDismiss();
    } finally {
      setIsSubmitting(false);
    }
  };

  const starLabels = ['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Excellent 🌟'];
  const activeStar = hoveredRating || rating;

  // If user has already reviewed, never render anything
  if (hasReviewed && !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[var(--color-card)] border-2 border-primary/30 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-teal-700 via-primary to-teal-800 p-5 sm:p-6 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    🩺
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                      {promptReason === 'logout'
                        ? 'Before You Sign Out…'
                        : promptReason === 'exit'
                        ? 'Quick Feedback for Nursefiti'
                        : 'How is Nursefiti Working for You?'}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      {promptReason === 'logout'
                        ? 'Please take 30 seconds to rate your platform experience.'
                        : 'Your review helps other nursing students and guides our clinical team.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors text-sm"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              {/* Star Rating */}
              <div className="text-center py-2 border-b border-[var(--color-border)]/60 pb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Rate Your Experience <span className="text-rose-500">*</span>
                </label>
                <div className="flex justify-center items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
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

              {/* Category Pills */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--color-text)]">
                  Feedback Topic:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: 'general', label: 'General Experience' },
                    { id: 'praise', label: 'Praise & What Worked' },
                    { id: 'suggestion', label: 'Feature Suggestion' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        category === cat.id
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Your Review / Feedback <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  rows={3}
                  maxLength={600}
                  placeholder="Tell us what you like or what we should improve (e.g. revision plans, exam rationales, mnemonics, tutor sessions...)"
                  className="input w-full text-xs sm:text-sm py-2.5 px-3 resize-none"
                  required
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-center justify-between border-t border-[var(--color-border)]/60">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-rose-500 transition-colors py-1 order-2 sm:order-1"
                >
                  {promptReason === 'logout' ? 'Sign out without review' : 'Maybe later'}
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="text-xs sm:text-sm py-2 px-5 font-bold shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 w-full sm:w-auto order-1 sm:order-2 justify-center"
                >
                  {isSubmitting
                    ? 'Submitting…'
                    : promptReason === 'logout'
                    ? 'Submit Review & Sign Out ★'
                    : 'Submit Platform Review ★'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
