// Tutor pages are dynamic — they require auth and live Supabase data
export const dynamic = 'force-dynamic';

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
