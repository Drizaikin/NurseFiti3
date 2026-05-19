"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
  { id: 3, name: 'Specialization', description: 'Teaching areas & bio' },
  { id: 4, name: 'Documents', description: 'Upload certificates' },
  { id: 5, name: 'Payment Details', description: 'M-Pesa information' },
];

const HIGHER_DIPLOMA_SPECIALTIES = [
  'Critical Care Nursing',
  'Oncology Nursing',
  'Renal Nursing',
  'Psychiatric Nursing',
  'Peri-Operative Nursing',
];

export default function TutorSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [documents, setDocuments] = useState<{
    nckCertificate: File | null;
    academicQualification: File | null;
    nationalId: File | null;
  }>({
    nckCertificate: null,
    academicQualification: null,
    nationalId: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TutorSignupInput>({
    resolver: zodResolver(tutorSignupSchema),
    mode: 'onChange',
  });

  const cadresTaught = watch('cadresTaught') || [];

  const nextStep = async () => {
    let fieldsToValidate: (keyof TutorSignupInput)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
        break;
      case 2:
        fieldsToValidate = ['nckRegNumber', 'professionalTitle', 'yearsExperience', 'currentEmployer'];
        break;
      case 3:
        fieldsToValidate = ['cadresTaught', 'bio', 'sessionRate'];
        break;
      case 4:
        // Validate documents
        if (!documents.nckCertificate || !documents.academicQualification || !documents.nationalId) {
          alert('Please upload all required documents');
          return;
        }
        break;
      case 5:
        fieldsToValidate = ['mpesaNumber', 'whatsappNumber', 'agreeToTerms'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: TutorSignupInput) => {
    setIsLoading(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      // Add documents
      if (documents.nckCertificate) {
        formData.append('nckCertificate', documents.nckCertificate);
      }
      if (documents.academicQualification) {
        formData.append('academicQualification', documents.academicQualification);
      }
      if (documents.nationalId) {
        formData.append('nationalId', documents.nationalId);
      }

      const response = await fetch('/api/auth/signup-tutor', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Application submission failed');
      }

      // Success - redirect to login with success message
      router.push('/login?tutor_application=submitted');
    } catch (error: any) {
      alert(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (field: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
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
                    Let's start with your basic details
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
                  />
                  {errors.currentEmployer && (
                    <p className="mt-1 text-sm text-error">{errors.currentEmployer.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Specialization */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Specialization
                  </h2>
                  <p className="text-neutral-mid">
                    Tell us about your teaching expertise
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Which cadres can you teach? <span className="text-error">*</span>
                  </label>
                  <div className="space-y-2">
                    {['KRCHN', 'BScN', 'Higher Diploma'].map((cadre) => (
                      <label key={cadre} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          value={cadre}
                          {...register('cadresTaught')}
                          className="w-5 h-5 text-primary border-neutral-border rounded focus:ring-primary"
                        />
                        <span className="text-sm">{cadre}</span>
                      </label>
                    ))}
                  </div>
                  {errors.cadresTaught && (
                    <p className="mt-1 text-sm text-error">{errors.cadresTaught.message}</p>
                  )}
                </div>

                {cadresTaught.includes('Higher Diploma') && (
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Higher Diploma Specialties (Optional)
                    </label>
                    <div className="space-y-2">
                      {HIGHER_DIPLOMA_SPECIALTIES.map((specialty) => (
                        <label key={specialty} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            value={specialty}
                            {...register('specialties')}
                            className="w-5 h-5 text-primary border-neutral-border rounded focus:ring-primary"
                          />
                          <span className="text-sm">{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="bio" className="block text-sm font-semibold mb-2">
                    Professional Bio <span className="text-error">*</span>
                  </label>
                  <textarea
                    {...register('bio')}
                    id="bio"
                    rows={5}
                    className="input resize-none"
                    placeholder="Tell students about your experience, teaching style, and what makes you a great tutor..."
                  />
                  <p className="mt-1 text-xs text-neutral-light">
                    {watch('bio')?.length || 0} / 400 characters (minimum 200)
                  </p>
                  {errors.bio && (
                    <p className="mt-1 text-sm text-error">{errors.bio.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="sessionRate" className="block text-sm font-semibold mb-2">
                    Hourly Session Rate (KSh) <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('sessionRate', { valueAsNumber: true })}
                    type="number"
                    id="sessionRate"
                    className="input"
                    placeholder="1500"
                    min="500"
                    max="10000"
                    step="100"
                  />
                  <p className="mt-1 text-xs text-neutral-light">
                    Set your rate between KSh 500 - 10,000 per hour
                  </p>
                  {errors.sessionRate && (
                    <p className="mt-1 text-sm text-error">{errors.sessionRate.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Documents
                  </h2>
                  <p className="text-neutral-mid">
                    Upload your professional certificates and identification
                  </p>
                </div>

                <div>
                  <label htmlFor="nckCertificate" className="block text-sm font-semibold mb-2">
                    NCK Registration Certificate <span className="text-error">*</span>
                  </label>
                  <input
                    type="file"
                    id="nckCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('nckCertificate', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-neutral-mid
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary-dark
                      file:cursor-pointer cursor-pointer"
                  />
                  {documents.nckCertificate && (
                    <p className="mt-1 text-sm text-success">
                      ✓ {documents.nckCertificate.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-light">
                    PDF, JPG, or PNG (max 5MB)
                  </p>
                </div>

                <div>
                  <label htmlFor="academicQualification" className="block text-sm font-semibold mb-2">
                    Academic Qualification Certificate <span className="text-error">*</span>
                  </label>
                  <input
                    type="file"
                    id="academicQualification"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('academicQualification', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-neutral-mid
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary-dark
                      file:cursor-pointer cursor-pointer"
                  />
                  {documents.academicQualification && (
                    <p className="mt-1 text-sm text-success">
                      ✓ {documents.academicQualification.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-light">
                    Diploma, Degree, or Masters certificate (PDF, JPG, or PNG, max 5MB)
                  </p>
                </div>

                <div>
                  <label htmlFor="nationalId" className="block text-sm font-semibold mb-2">
                    National ID / Passport <span className="text-error">*</span>
                  </label>
                  <input
                    type="file"
                    id="nationalId"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('nationalId', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-neutral-mid
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary-dark
                      file:cursor-pointer cursor-pointer"
                  />
                  {documents.nationalId && (
                    <p className="mt-1 text-sm text-success">
                      ✓ {documents.nationalId.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-light">
                    PDF, JPG, or PNG (max 5MB)
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Note:</strong> All documents will be reviewed by our admin team. 
                    Please ensure they are clear and legible.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Payment Details */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Payment Details
                  </h2>
                  <p className="text-neutral-mid">
                    How should we pay you for your tutoring sessions?
                  </p>
                </div>

                <div>
                  <label htmlFor="mpesaNumber" className="block text-sm font-semibold mb-2">
                    M-Pesa Number <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('mpesaNumber')}
                    type="tel"
                    id="mpesaNumber"
                    className="input"
                    placeholder="+254712345678"
                  />
                  <p className="mt-1 text-xs text-neutral-light">
                    This is where you'll receive payments for completed sessions
                  </p>
                  {errors.mpesaNumber && (
                    <p className="mt-1 text-sm text-error">{errors.mpesaNumber.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsappNumber" className="block text-sm font-semibold mb-2">
                    WhatsApp Number <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('whatsappNumber')}
                    type="tel"
                    id="whatsappNumber"
                    className="input"
                    placeholder="+254712345678"
                  />
                  <p className="mt-1 text-xs text-neutral-light">
                    For session coordination and student communication
                  </p>
                  {errors.whatsappNumber && (
                    <p className="mt-1 text-sm text-error">{errors.whatsappNumber.message}</p>
                  )}
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                    Payment Terms
                  </h3>
                  <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                    <li>• NurseFiti takes a 20% platform fee</li>
                    <li>• Payments are processed weekly every Monday</li>
                    <li>• Minimum payout threshold: KSh 1,000</li>
                    <li>• You'll receive 80% of your session rate</li>
                  </ul>
                </div>

                <div className="border-t border-neutral-border pt-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('agreeToTerms')}
                      className="w-5 h-5 text-primary border-neutral-border rounded focus:ring-primary mt-0.5"
                    />
                    <span className="text-sm">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" className="text-primary font-semibold hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" target="_blank" className="text-primary font-semibold hover:underline">
                        Privacy Policy
                      </a>
                      . I understand that my application will be reviewed by the NurseFiti team.{' '}
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
              
              {currentStep < 5 ? (
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
