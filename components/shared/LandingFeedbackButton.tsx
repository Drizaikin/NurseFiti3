"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FeedbackWidget } from '@/components/shared/FeedbackWidget';
import Link from 'next/link';

interface LandingFeedbackButtonProps {
  /** 'navbar' = compact pill in the header; 'cta' = larger CTA button in the reviews section */
  variant?: 'navbar' | 'cta';
}

export function LandingFeedbackButton({ variant = 'navbar' }: LandingFeedbackButtonProps) {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [cadre, setCadre] = useState<string | undefined>(undefined);
  const [userRole, setUserRole] = useState<'student' | 'tutor'>('student');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsChecking(false); return; }

        setIsLoggedIn(true);

        // Get profile info
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .single();

        if (profile) {
          const p = profile as { full_name: string; role: string };
          setDisplayName(p.full_name.split(' ')[0]);
          setUserRole(p.role === 'tutor' ? 'tutor' : 'student');

          if (p.role === 'student') {
            const { data: sp } = await supabase
              .from('student_profiles')
              .select('cadre')
              .eq('id', user.id)
              .single();
            if (sp) setCadre((sp as { cadre: string }).cadre);
          }
        }
      } catch {
        // Not logged in — that's fine
      } finally {
        setIsChecking(false);
      }
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) return null;

  // Not logged in — show a link to login
  if (!isLoggedIn) {
    if (variant === 'cta') {
      return (
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-mid transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Write a Review
        </Link>
      );
    }
    return (
      <Link
        href="/login"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary-light transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Feedback
      </Link>
    );
  }

  // Logged in — show the full FeedbackWidget
  if (variant === 'cta') {
    return (
      <FeedbackWidget
        displayName={displayName}
        cadre={cadre}
        userRole={userRole}
        trigger={
          <button className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-mid transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Write a Review
          </button>
        }
      />
    );
  }

  return (
    <FeedbackWidget
      displayName={displayName}
      cadre={cadre}
      userRole={userRole}
      triggerVariant="navbar"
    />
  );
}
