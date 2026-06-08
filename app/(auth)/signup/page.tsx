"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { studentSignupSchema, type StudentSignupInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

const HIGHER_DIPLOMA_SPECIALTIES = [
  'Critical Care Nursing',
  'Oncology Nursing',
  'Renal Nursing',
  'Psychiatric Nursing',
  'Peri-Operative Nursing',
];

export default function StudentSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentSignupInput>({
    resolver: zodResolver(studentSignupSchema),
  });

  const selectedCadre = watch('cadre');

  // When the user picks a date, suggest the matching exam cycle
  const handleExamDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.value; // e.g. "2026-05-15"
    if (!picked) return;
    const month = new Date(picked).getUTCMonth(); // 0-indexed
    if (month >= 3 && month <= 5) setValue('examCycle', 'May');
    else if (month >= 6 && month <= 8) setValue('examCycle', 'August');
    else if (month >= 9 && month <= 11) setValue('examCycle', 'November');
  };

  const onSubmit = async (data: StudentSignupInput) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Read as text first so we can log it if JSON parse fails
      const responseText = await response.text();
      let result: { error?: string; success?: boolean; message?: string };
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error('Non-JSON response from /api/auth/signup:', responseText.slice(0, 500));
        throw new Error('Server error — please try again or contact support.');
      }

      if (!response.ok) {
        // Show the specific validation error if available
        const resultAny = result as Record<string, unknown>;
        if (resultAny.details && typeof resultAny.details === 'object') {
          const firstError = Object.values(resultAny.details as Record<string, string[]>).flat()[0];
          throw new Error(firstError || result.error || 'Signup failed');
        }
        throw new Error(result.error || 'Signup failed');
      }

      // Auto sign-in immediately after account creation
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        // Account created but auto-login failed — send to login page
        toast.success('Account created! Please log in.');
        router.push('/login');
        return;
      }

      toast.success('Welcome to NurseFiti!');
      router.refresh();
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <NurseFitiLogo variant="full" size={64} />
          </Link>
        </div>

        <Card className="w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Create Your Account
            </h1>
            <p className="text-neutral-mid">
              Join NurseFiti and start preparing for your NCK exam
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                {...register('fullName')}
                type="text"
                id="fullName"
                className="input"
                placeholder="John Doe"
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="input"
                  placeholder="john@example.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number (M-Pesa) <span className="text-error">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="input"
                  placeholder="+254712345678"
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="input pr-10"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-mid hover:text-primary"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                  Confirm Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="input pr-10"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-mid hover:text-primary"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Cadre Selection */}
            <div>
              <label htmlFor="cadre" className="block text-sm font-semibold mb-2">
                Nursing Cadre <span className="text-error">*</span>
              </label>
              <select
                {...register('cadre')}
                id="cadre"
                className="input"
                disabled={isLoading}
              >
                <option value="">Select your cadre</option>
                <option value="KRCHN">KRCHN (Kenya Registered Community Health Nurse)</option>
                <option value="BScN">BScN (Bachelor of Science in Nursing)</option>
                <option value="Higher Diploma">Higher Diploma</option>
              </select>
              {errors.cadre && (
                <p className="mt-1 text-sm text-error">{errors.cadre.message}</p>
              )}
            </div>

            {/* Specialty (only for Higher Diploma) */}
            {selectedCadre === 'Higher Diploma' && (
              <div>
                <label htmlFor="specialty" className="block text-sm font-semibold mb-2">
                  Specialty <span className="text-error">*</span>
                </label>
                <select
                  {...register('specialty')}
                  id="specialty"
                  className="input"
                  disabled={isLoading}
                >
                  <option value="">Select your specialty</option>
                  {HIGHER_DIPLOMA_SPECIALTIES.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                {errors.specialty && (
                  <p className="mt-1 text-sm text-error">{errors.specialty.message}</p>
                )}
              </div>
            )}

            {/* Institution */}
            <div>
              <label htmlFor="institution" className="block text-sm font-semibold mb-2">
                Institution / College <span className="text-error">*</span>
              </label>
              <input
                {...register('institution')}
                type="text"
                id="institution"
                className="input"
                placeholder="e.g., Kenya Medical Training College"
                disabled={isLoading}
              />
              {errors.institution && (
                <p className="mt-1 text-sm text-error">{errors.institution.message}</p>
              )}
            </div>

            {/* Exam Date and Cycle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="examDate" className="block text-sm font-semibold mb-2">
                  Target Exam Date <span className="text-error">*</span>
                </label>
                <input
                  {...register('examDate')}
                  type="date"
                  id="examDate"
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                  disabled={isLoading}
                  onChange={(e) => {
                    register('examDate').onChange(e);
                    handleExamDateChange(e);
                  }}
                />
                {errors.examDate && (
                  <p className="mt-1 text-sm text-error">{errors.examDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="examCycle" className="block text-sm font-semibold mb-2">
                  Exam Cycle <span className="text-error">*</span>
                </label>
                <select
                  {...register('examCycle')}
                  id="examCycle"
                  className="input"
                  disabled={isLoading}
                >
                  <option value="">Select exam cycle</option>
                  <option value="May">May</option>
                  <option value="August">August</option>
                  <option value="November">November</option>
                </select>
                {errors.examCycle && (
                  <p className="mt-1 text-sm text-error">{errors.examCycle.message}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                {...register('agreeToTerms')}
                type="checkbox"
                id="agreeToTerms"
                className="mt-1 w-4 h-4 text-primary border-neutral-border rounded focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-neutral-mid">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-error">{errors.agreeToTerms.message}</p>
            )}

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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-neutral-mid">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </div>

          {/* Tutor Signup Link */}
          <div className="mt-4 pt-4 border-t border-neutral-border text-center">
            <p className="text-sm text-neutral-mid mb-2">
              Are you a nursing professional?
            </p>
            <Link href="/signup-tutor" className="text-primary font-semibold hover:underline">
              Apply as an Expert Tutor →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
