import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your NurseFiti account and continue preparing for your NCK licensure exam.',
  openGraph: {
    title: 'Log In | NurseFiti',
    description: 'Log in to NurseFiti — Kenya\'s NCK exam preparation platform.',
    url: 'https://nursefiti.com/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
