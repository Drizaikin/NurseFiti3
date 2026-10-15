"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // If already logged in, redirect immediately to the appropriate dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const role =
          session.user.user_metadata?.role ||
          (typeof document !== 'undefined'
            ? document.cookie.split('; ').find((r) => r.startsWith('nf_role='))?.split('=')[1]
            : null) ||
          'student';
        const dest = role === 'admin' ? '/admin' : role === 'tutor' ? '/tutor-dashboard' : '/dashboard';
        window.location.replace(dest);
      }
    });
  }, []);

  // Show message if redirected from signup
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      toast(message, { icon: 'ℹ️', duration: 5000 });
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Login failed. Please try again.');
      }

      const roleFromMeta = authData.user.user_metadata?.role as 'student' | 'tutor' | 'admin' | undefined;
      let role: 'student' | 'tutor' | 'admin' = 'student';
      let tutorProfile: {
        verification_status: 'pending' | 'verified' | 'rejected';
        nck_certificate_url: string | null;
      } | null = null;

      if (roleFromMeta === 'tutor') {
        // Fast path for tutors: fetch profile and tutor_profile in parallel
        const [profileRes, tutorRes] = await Promise.all([
          supabase.from('profiles').select('role').eq('id', authData.user.id).maybeSingle(),
          supabase
            .from('tutor_profiles')
            .select('verification_status, nck_certificate_url')
            .eq('id', authData.user.id)
            .maybeSingle(),
        ]);
        role = ((profileRes as any).data?.role as any) || 'tutor';
        tutorProfile = tutorRes.data as any;
      } else {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .maybeSingle();

        const resolvedRole = (profileData as any)?.role;
        if (!profileError && resolvedRole) {
          role = resolvedRole as any;
        } else if (roleFromMeta) {
          role = roleFromMeta;
        } else {
          throw new Error('Failed to load user profile');
        }

        if (role === 'tutor') {
          const { data: tutorRes } = await supabase
            .from('tutor_profiles')
            .select('verification_status, nck_certificate_url')
            .eq('id', authData.user.id)
            .maybeSingle();
          tutorProfile = tutorRes as any;
        }
      }

      toast.success('Welcome back!');

      // Write lightweight role cookie so middleware can skip DB queries on protected routes
      document.cookie = `nf_role=${role}; path=/; max-age=86400; samesite=lax${
        location.protocol === 'https:' ? '; secure' : ''
      }`;

      // Respect intended redirect URL if provided, verifying it matches role permissions
      const rawRedirect = searchParams.get('redirect');
      const isValidRedirect = rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//');

      let targetUrl = '/dashboard';
      if (role === 'student') {
        targetUrl =
          isValidRedirect && !rawRedirect.startsWith('/tutor-') && !rawRedirect.startsWith('/admin')
            ? rawRedirect
            : '/dashboard';
      } else if (role === 'tutor') {
        if (tutorProfile?.verification_status === 'verified') {
          targetUrl = isValidRedirect && rawRedirect.startsWith('/tutor-') ? rawRedirect : '/tutor-dashboard';
        } else if (tutorProfile?.verification_status === 'pending') {
          targetUrl = tutorProfile.nck_certificate_url ? '/tutor-pending' : '/tutor-complete-profile';
        } else {
          targetUrl = '/tutor-complete-profile';
        }
      } else if (role === 'admin') {
        targetUrl = isValidRedirect && rawRedirect.startsWith('/admin') ? rawRedirect : '/admin';
      }

      // Fast direct navigation: transmits fresh cookies in request headers directly,
      // avoiding redundant server re-render of /login and client router cache freeze
      window.location.replace(targetUrl);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <NurseFitiLogo variant="full" size={64} />
          </Link>
        </div>

        <Card className="w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-mid">
              Log in to continue your NCK exam preparation
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="input"
                placeholder="john@example.com"
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="input pr-10"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-mid hover:text-primary"
                  tabIndex={-1}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" className="mr-2" />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center text-sm text-neutral-mid">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </div>

          {/* Tutor Login Note */}
          <div className="mt-4 pt-4 border-t border-neutral-border">
            <p className="text-sm text-neutral-mid text-center">
              <span className="font-semibold">Tutors:</span> Use the same login. You&apos;ll be redirected to your tutor dashboard.
            </p>
          </div>
        </Card>

        {/* Help Link */}
        <div className="mt-6 text-center">
          <Link
            href="/help"
            className="text-sm text-neutral-mid hover:text-primary"
          >
            Need help logging in?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
