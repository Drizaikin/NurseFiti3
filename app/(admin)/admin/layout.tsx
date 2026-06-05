import type { Metadata } from 'next';

// Double-layer noindex: middleware sets X-Robots-Tag header,
// this sets the <meta name="robots"> tag in the HTML head.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminInnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
