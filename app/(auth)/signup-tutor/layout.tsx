import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply as Expert Tutor',
  description: 'Apply to become a verified NCK tutor on NurseFiti. Set your own rate, manage your schedule, and earn via M-Pesa. Open to registered nurses with NCK credentials.',
  openGraph: {
    title: 'Apply as Expert Tutor | NurseFiti',
    description: 'Join NurseFiti as a verified NCK tutor. Earn via M-Pesa.',
    url: 'https://nursefiti.com/signup-tutor',
  },
};

export default function SignupTutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
