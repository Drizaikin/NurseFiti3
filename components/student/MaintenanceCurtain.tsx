"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Spinner } from '@/components/ui/Spinner';

// --- MAINTENANCE TOGGLE ---
// Set to false to remove the curtain when auditing is complete
export const IS_UNDER_AUDIT = false;

export function MaintenanceCurtain({ children }: { children: React.ReactNode }) {
  const [cadre, setCadre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCadre = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('student_profiles')
            .select('cadre')
            .eq('id', user.id)
            .single();
          if (isMounted) setCadre((data as any)?.cadre ?? null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCadre();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Spinner size="md" />
      </div>
    );
  }

  if (IS_UNDER_AUDIT) {
    return (
      <div className="relative flex-1 flex flex-col min-h-full">
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] m-4 lg:m-6 pointer-events-auto" />
          
          <div className="relative z-10 max-w-lg w-full bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Questions Under Audit
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              We are currently performing a comprehensive clinical audit of our entire question bank to ensure the highest standard of accuracy for your NCK exam preparation. 
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-2">
              <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">
                Practice tests and mock exams will be available again in approximately 1 week. We sincerely apologize for the inconvenience!
              </p>
            </div>
          </div>
        </div>

        <div className="opacity-30 pointer-events-none select-none filter blur-sm transition-all duration-500 flex-1">
          {children}
        </div>
      </div>
    );
  }

  if (cadre === 'Higher Diploma') {
    return (
      <div className="relative flex-1 flex flex-col min-h-full">
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] m-4 lg:m-6 pointer-events-auto" />
          
          <div className="relative z-10 max-w-lg w-full bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Higher Diploma Under Development
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The Higher Diploma curriculum is currently under development and will be available soon. 
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mb-2">
              <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">
                In the meantime, you can create a BScN or KRCHN (Diploma) account to see what the platform offers!
              </p>
            </div>
          </div>
        </div>

        <div className="opacity-30 pointer-events-none select-none filter blur-sm transition-all duration-500 flex-1">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
