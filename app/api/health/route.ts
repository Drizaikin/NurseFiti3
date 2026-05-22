import { NextResponse } from 'next/server';

/**
 * Health check — visit /api/health to confirm env vars are set on Vercel.
 * Safe to expose: only shows boolean presence, never the actual key values.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
      PAYSTACK_SECRET_KEY: !!process.env.PAYSTACK_SECRET_KEY,
      NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    },
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https?:\/\//, '').split('.')[0] ?? 'NOT SET',
  });
}
