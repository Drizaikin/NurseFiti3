import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Student Account',
  description: 'Sign up for NurseFiti and start preparing for your NCK exam. Free account — no credit card required. Built for KRCHN, BScN, and Higher Diploma nurses in Kenya.',
  openGraph: {
    title: 'Create Student Account | NurseFiti',
    description: 'Sign up free and start your NCK exam preparation today.',
    url: 'https://nursefiti.com/signup',
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
