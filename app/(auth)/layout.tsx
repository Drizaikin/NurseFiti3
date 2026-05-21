// Auth pages are dynamic — they check session state at runtime
export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
