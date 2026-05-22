import type { Metadata } from 'next';

// Auth pages are dynamic — they check session state at runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Sign In',
    template: '%s | NurseFiti',
  },
  description: 'Sign in or create your NurseFiti account to start preparing for your NCK exam.',
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
