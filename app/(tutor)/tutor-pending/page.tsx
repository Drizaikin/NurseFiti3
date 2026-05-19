"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

interface TutorProfile {
  nck_reg_number: string;
  professional_title: string;
  years_experience: number;
  current_employer: string;
  cadres_taught: string[];
  specialties: string[];
  bio: string;
  session_rate: number;
  verification_status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
}

export default function TutorPendingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        const { data, error } = await supabase
          .from('tutor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setProfile(data);

        // If approved, redirect to tutor dashboard
        if (data.verification_status === 'approved') {
          router.push('/tutor-dashboard');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <p className="text-error mb-4">Profile not found</p>
          <Button variant="primary" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <NurseFitiLogo variant="full" size={48} />
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <div className="text-center">
            {profile.verification_status === 'pending' && (
              <>
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                  Application Under Review
                </h1>
                <p className="text-neutral-mid mb-4">
                  Thank you for applying to become a NurseFiti tutor! Our team is currently reviewing your application.
                </p>
                <Badge variant="warning" size="lg">
                  Pending Verification
                </Badge>
              </>
            )}

            {profile.verification_status === 'rejected' && (
              <>
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-error"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-heading font-bold text-error mb-2">
                  Application Not Approved
                </h1>
                <p className="text-neutral-mid mb-4">
                  Unfortunately, your application was not approved at this time.
                </p>
                <Badge variant="error" size="lg">
                  Rejected
                </Badge>
                {profile.rejection_reason && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
                    <p className="text-sm font-semibold text-error mb-1">Reason:</p>
                    <p className="text-sm text-neutral-dark dark:text-neutral-light">
                      {profile.rejection_reason}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Application Details */}
        <Card>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Your Application Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-mid mb-1">NCK Registration</p>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.nck_reg_number}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-mid mb-1">Professional Title</p>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.professional_title}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-mid mb-1">Years of Experience</p>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.years_experience} years</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-mid mb-1">Current Employer</p>
                <p className="text-neutral-dark dark:text-neutral-light">{profile.current_employer}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-mid mb-2">Cadres You Can Teach</p>
              <div className="flex flex-wrap gap-2">
                {profile.cadres_taught.map((cadre) => (
                  <Badge key={cadre} variant="primary">
                    {cadre}
                  </Badge>
                ))}
              </div>
            </div>

            {profile.specialties && profile.specialties.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-neutral-mid mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-neutral-mid mb-1">Professional Bio</p>
              <p className="text-neutral-dark dark:text-neutral-light text-sm">
                {profile.bio}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-mid mb-1">Session Rate</p>
              <p className="text-neutral-dark dark:text-neutral-light">
                KSh {profile.session_rate.toLocaleString()} per hour
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-mid mb-1">Application Submitted</p>
              <p className="text-neutral-dark dark:text-neutral-light">
                {new Date(profile.created_at).toLocaleDateString('en-KE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        {profile.verification_status === 'pending' && (
          <Card className="mt-6 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
            <h3 className="text-lg font-heading font-bold text-primary mb-3">
              What Happens Next?
            </h3>
            <ul className="space-y-2 text-sm text-neutral-dark dark:text-neutral-light">
              <li className="flex items-start">
                <span className="text-primary mr-2">1.</span>
                <span>Our team will review your credentials and documents (typically 2-3 business days)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">2.</span>
                <span>We'll verify your NCK registration and professional qualifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">3.</span>
                <span>You'll receive an email notification once your application is approved</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">4.</span>
                <span>After approval, you can start setting your availability and accepting students</span>
              </li>
            </ul>
          </Card>
        )}

        {/* Contact Support */}
        <div className="mt-6 text-center text-sm text-neutral-mid">
          Have questions?{' '}
          <a href="mailto:support@nursefiti.com" className="text-primary font-semibold hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
