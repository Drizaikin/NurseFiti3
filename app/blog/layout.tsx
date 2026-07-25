import type { Metadata } from 'next';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';

export const metadata: Metadata = {
  title: {
    default: 'Blog — NCK Exam Tips & Guides',
    template: '%s | NurseFiti Blog',
  },
  description: 'Expert guides, revision tips, and study strategies for Kenyan nursing graduates preparing for the NCK licensure exam.',
  openGraph: {
    siteName: 'NurseFiti',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark text-[var(--color-text)]">
      <MarketingHeader />

      {children}

      <MarketingFooter />
    </div>
  );
}
