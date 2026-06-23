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

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1. If PKCE code is present, exchange it via server callback first
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      window.location.href = `/auth/callback?code=${code}&type=recovery`;
      return;
    }

    // 2. Verify the user arrived here via a valid recovery session (or hash fragment)
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // No active session — the link may have expired or been used already
        toast.error('Reset link expired or already used. Please request a new one.');
        router.replace('/forgot-password');
        return;
      }
      setSessionReady(true);
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error('Password must contain at least one number.');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setDone(true);
      toast.success('Password updated successfully!');

      // Sign out so they log in fresh with the new password
      await supabase.auth.signOut();
      setTimeout(() => router.push('/login'), 2500);
    } catch (err: any) {
      if (err?.status === 403 || err?.message?.toLowerCase().includes('forbidden') || err?.message?.toLowerCase().includes('not allowed')) {
        toast.error('Session expired or invalid. Please request a new password reset link.');
        setTimeout(() => router.push('/forgot-password'), 3000);
      } else {
        toast.error(err instanceof Error ? err.message : 'Failed to update password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!sessionReady && !done) {
    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/"><NurseFitiLogo variant="full" size={56} /></Link>
        </div>
        <Card>
          {done ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">Password Updated!</h1>
              <p className="text-neutral-mid mb-6">
                Your password has been changed. Redirecting you to login…
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full">Go to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">Set New Password</h1>
              <p className="text-neutral-mid mb-6">Choose a strong password for your NurseFiti account.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="input pr-10"
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-mid hover:text-primary transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  {/* Strength hints */}
                  {password.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {[
                        { ok: password.length >= 8, label: 'At least 8 characters' },
                        { ok: /[A-Z]/.test(password), label: 'One uppercase letter' },
                        { ok: /[0-9]/.test(password), label: 'One number' },
                      ].map(({ ok, label }) => (
                        <li key={label} className={`text-xs flex items-center gap-1.5 ${ok ? 'text-success' : 'text-neutral-mid'}`}>
                          <span>{ok ? '✓' : '○'}</span> {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label htmlFor="confirm" className="block text-sm font-semibold mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm"
                    type={showPassword ? 'text' : 'password'}
                    className={`input ${confirm.length > 0 && confirm !== password ? 'border-error focus:ring-error/40' : ''}`}
                    placeholder="Repeat your new password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  {confirm.length > 0 && confirm !== password && (
                    <p className="text-xs text-error mt-1">Passwords do not match</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading || !password || !confirm}
                >
                  {isLoading
                    ? <><Spinner size="sm" color="white" className="mr-2" />Updating…</>
                    : 'Set New Password'}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-neutral-mid">
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
