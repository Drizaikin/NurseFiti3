'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function AppRatingModal() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gentleWarning, setGentleWarning] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const loginCountStr = localStorage.getItem('nurse_fiti_login_count') || '0';
        let loginCount = parseInt(loginCountStr, 10);
        const lastLoginDate = localStorage.getItem('nurse_fiti_last_login_date');
        const today = new Date().toDateString();

        if (lastLoginDate !== today) {
          loginCount += 1;
          localStorage.setItem('nurse_fiti_login_count', loginCount.toString());
          localStorage.setItem('nurse_fiti_last_login_date', today);
        }

        if (loginCount >= 5) {
          const dismissedDate = localStorage.getItem('nurse_fiti_review_dismissed_date');
          if (dismissedDate === today) return;

          const { data, error } = await supabase
            .from('app_feedback')
            .select('id')
            .eq('user_id', user.id)
            .limit(1);
          
          if (!error && (!data || data.length === 0)) {
            setTimeout(() => setIsOpen(true), 2000);
          }
        }
      } catch (e) {
        console.error('AppRating check failed', e);
      }
    };
    init();
  }, [supabase]);

  const handleReviewLater = () => {
    if (rating === 0 && !gentleWarning) {
      setGentleWarning(true);
      return; 
    }
    
    localStorage.setItem('nurse_fiti_review_dismissed_date', new Date().toDateString());
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setGentleWarning(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
        
      const { data: studentProfile } = await supabase
        .from('student_profiles')
        .select('cadre')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('app_feedback')
        .insert([{
          user_id: user.id,
          user_role: 'student',
          display_name: profile?.full_name || 'Anonymous Student',
          cadre: studentProfile?.cadre || 'Student',
          category: rating >= 4 ? 'praise' : 'suggestion',
          rating: rating,
          message: message.trim() || 'No written review provided.',
          is_approved: rating >= 4 
        }]);

      if (error) throw error;
      
      toast.success('Thank you so much for your review! 💙', {
        icon: '🌟',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      setIsOpen(false);
    } catch (e) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={handleReviewLater}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={
              gentleWarning && rating === 0 
                ? { scale: 1, opacity: 1, y: 0, x: [-5, 5, -5, 5, 0] } 
                : { scale: 1, opacity: 1, y: 0, x: 0 }
            }
            transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="bg-[linear-gradient(135deg,#0D2B1F_0%,#174030_100%)] p-8 text-center text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <button 
                onClick={handleReviewLater} 
                className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors text-xl font-light z-10"
              >
                ✕
              </button>
              
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-4 relative z-10 drop-shadow-xl"
              >
                🌟
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 font-heading tracking-tight relative z-10">
                Are you enjoying NurseFiti?
              </h2>
              <p className="text-emerald-100/80 text-sm relative z-10">
                Your feedback helps us improve and helps other nursing students find us.
              </p>
            </div>

            <div className="p-8 bg-slate-50">
              <AnimatePresence>
                {gentleWarning && rating === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-amber-50 text-amber-800 text-sm p-3.5 rounded-2xl text-center border border-amber-200/60 shadow-sm"
                  >
                    Could you tap a star first? Your quick rating means the world to us! 🙏
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => {
                      setRating(star);
                      setGentleWarning(false);
                    }}
                    className="text-5xl focus:outline-none drop-shadow-sm transition-colors duration-200"
                  >
                    <span className={star <= (hoveredRating || rating) ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'}>
                      ★
                    </span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {rating > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {rating >= 4 ? "Awesome! What do you love about it?" : "What can we do better?"}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none shadow-inner bg-white transition-all"
                      rows={3}
                      placeholder="Your honest review here..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={rating > 0 ? { scale: 1.02 } : {}}
                  whileTap={rating > 0 ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={isSubmitting || rating === 0}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-md transition-all duration-300
                    ${rating === 0 
                      ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-500' 
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                    }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </motion.button>
                
                <button
                  onClick={handleReviewLater}
                  className="w-full py-3 rounded-2xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Review Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
