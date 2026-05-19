"use client";

import { useState, useEffect } from 'react';
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

export default function LoginPage() {
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

  // Show message if redirected from signup
  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'false') {
      toast('Please check your email to verify your account before logging in.', {
        icon: '📧',
        duration: 6000,
      });
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

      // Check if email is verified
      if (!authData.user.email_confirmed_at) {
        toast.error('Please verify your email before logging in. Check your inbox.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Get user profile to determine role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Failed to load user profile');
      }

      toast.success('Welcome back!');

      // Redirect based on role
      const userRole = profile.role as 'student' | 'tutor' | 'admin';
      
      if (userRole === 'student') {
        router.push('/dashboard');
      } else if (userRole === 'tutor') {
        // Check tutor verification status
        const { data: tutorProfile } = await supabase
          .from('tutor_profiles')
          .select('verification_status')
          .eq('id', authData.user.id)
          .single();

        if (tutorProfile?.verification_status === 'pending') {
          router.push('/tutor-pending');
        } else if (tutorProfile?.verification_status === 'verified') {
          router.push('/tutor-dashboard');
        } else {
          router.push('/tutor-pending');
        }
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
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

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 text-primary border-neutral-border rounded focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="text-sm text-neutral-mid">
                Remember me for 30 days
              </label>
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
