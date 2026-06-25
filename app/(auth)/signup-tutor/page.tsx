"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { tutorSignupSchema, type TutorSignupInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

const STEPS = [
  { id: 1, name: 'Personal Information', description: 'Basic details' },
  { id: 2, name: 'Professional Credentials', description: 'NCK registration & experience' },
];

export default function TutorSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TutorSignupInput>({
    resolver: zodResolver(tutorSignupSchema),
    mode: 'onChange',
  });

  const nextStep = async () => {
    const fieldsToValidate: (keyof TutorSignupInput)[] =
      currentStep === 1
        ? ['fullName', 'email', 'phone', 'password', 'confirmPassword']
        : ['nckRegNumber', 'professionalTitle', 'yearsExperience', 'currentEmployer'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 2));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: TutorSignupInput) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await fetch('/api/auth/signup-tutor', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Application submission failed');
      }

      // Auto sign-in after account creation
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        toast.success('Application submitted! Please log in to continue.');
        router.push('/login');
        return;
      }

      toast.success('Welcome to NurseFiti! Complete your profile to get verified.');
      router.refresh();
      router.push('/tutor-complete-profile');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <NurseFitiLogo variant="full" size={64} />
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.id
                        ? 'bg-success text-white'
                        : currentStep === step.id
                        ? 'bg-primary text-white'
                        : 'bg-neutral-border text-neutral-mid'
                    }`}
                  >
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className="mt-2 text-center hidden md:block">
                    <p className="text-xs font-semibold">{step.name}</p>
                    <p className="text-xs text-neutral-light">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      currentStep > step.id ? 'bg-success' : 'bg-neutral-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Personal Information
                  </h2>
                  <p className="text-neutral-mid">
                    Let&apos;s start with your basic details
                  </p>
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    className="input"
                    placeholder="Dr. Jane Doe"
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
                  )}
                </div>

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
                      placeholder="jane@example.com"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number <span className="text-error">*</span>
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
              </div>
            )}

            {/* Step 2: Professional Credentials */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Professional Credentials
                  </h2>
                  <p className="text-neutral-mid">
                    Tell us about your nursing qualifications
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nckRegNumber" className="block text-sm font-semibold mb-2">
                      NCK Registration Number <span className="text-error">*</span>
                    </label>
                    <input
                      {...register('nckRegNumber')}
                      type="text"
                      id="nckRegNumber"
                      className="input"
                      placeholder="NCK/RN/12345"
                      disabled={isLoading}
                    />
                    {errors.nckRegNumber && (
                      <p className="mt-1 text-sm text-error">{errors.nckRegNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="yearsExperience" className="block text-sm font-semibold mb-2">
                      Years of Experience <span className="text-error">*</span>
                    </label>
                    <input
                      {...register('yearsExperience', { valueAsNumber: true })}
                      type="number"
                      id="yearsExperience"
                      className="input"
                      placeholder="5"
                      min="0"
                      max="50"
                      disabled={isLoading}
                    />
                    {errors.yearsExperience && (
                      <p className="mt-1 text-sm text-error">{errors.yearsExperience.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="professionalTitle" className="block text-sm font-semibold mb-2">
                    Professional Title <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('professionalTitle')}
                    type="text"
                    id="professionalTitle"
                    className="input"
                    placeholder="e.g., RN, BScN, MSc Clinical Nursing"
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-neutral-light">
                    Include all relevant qualifications and certifications
                  </p>
                  {errors.professionalTitle && (
                    <p className="mt-1 text-sm text-error">{errors.professionalTitle.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="currentEmployer" className="block text-sm font-semibold mb-2">
                    Current or Most Recent Employer <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('currentEmployer')}
                    type="text"
                    id="currentEmployer"
                    className="input"
                    placeholder="e.g., Kenyatta National Hospital"
                    disabled={isLoading}
                  />
                  {errors.currentEmployer && (
                    <p className="mt-1 text-sm text-error">{errors.currentEmployer.message}</p>
                  )}
                </div>

                {/* Complete-profile nudge */}
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                  <p className="text-sm text-teal-800 dark:text-teal-200">
                    After submitting, you&apos;ll complete your <strong>specialization, documents, and M-Pesa payment details</strong> in the next step before your application is reviewed.
                  </p>
                </div>

                <div className="border-t border-neutral-border pt-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('agreeToTerms')}
                      className="w-5 h-5 text-primary border-neutral-border rounded focus:ring-primary mt-0.5"
                      disabled={isLoading}
                    />
                    <span className="text-sm">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" className="text-primary font-semibold hover:underline">
                        Terms of Service
                      </a>
                      ,{' '}
                      <a href="/privacy" target="_blank" className="text-primary font-semibold hover:underline">
                        Privacy Policy
                      </a>
                      , and the{' '}
                      <a href="/tutor-agreement" target="_blank" className="text-primary font-semibold hover:underline">
                        Tutor Agreement
                      </a>
                      . I understand that NurseFiti is an educational platform and I must not provide clinical or medical advice. My application will be reviewed by the NurseFiti team.{' '}
                      <span className="text-error">*</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-error">{errors.agreeToTerms.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  ← Previous
                </Button>
              )}

              {currentStep < 2 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  className="ml-auto"
                  disabled={isLoading}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" color="white" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-neutral-border text-center text-sm text-neutral-mid">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
