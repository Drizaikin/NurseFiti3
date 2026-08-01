"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'invalid_link') {
      toast.error('Your password reset link was expired or invalid. Please request a new one.');
      // Clean up URL
      router.replace('/forgot-password');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/"><NurseFitiLogo variant="full" size={56} /></Link>
        </div>
        <Card>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">Check your email</h1>
              <p className="text-neutral-mid mb-6">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">Reset Password</h1>
              <p className="text-neutral-mid mb-6">Enter your email and we&apos;ll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder="john@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                  {isLoading ? <><Spinner size="sm" color="white" className="mr-2" />Sending...</> : 'Send Reset Link'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm text-neutral-mid">
                <Link href="/login" className="text-primary font-semibold hover:underline">Back to Login</Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
