import type { Metadata } from "next";
import { Syne, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";


const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nursefiti.co.ke'),
  title: {
    default: 'NurseFiti — NCK Exam Preparation Platform Kenya',
    template: '%s | NurseFiti',
  },
  description: 'Focused NCK exam preparation for Kenyan nursing candidates. Practise MCQs, take timed mock exams, study with flashcards, build revision plans, and find tutoring support.',
  keywords: [
    'NCK exam preparation Kenya',
    'KRCHN exam revision',
    'BScN nursing exam Kenya',
    'NCK past papers',
    'DigiProctor simulation',
    'nursing council Kenya exam',
    'NCK tutor Kenya',
    'nursing exam practice questions',
    'Kenya nursing licensure exam',
    'NCK mock exams',
    'NCK revision plan',
    'nursing licensure Kenya',
    'NCK exam tips',
    'KRCHN study guide',
    'BScN nursing Kenya',
  ],
  openGraph: {
    siteName: 'NurseFiti',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'NurseFiti NCK exam preparation' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nursefiti',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification token here when available
    // google: 'your-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" suppressHydrationWarning>
      <body className={`${syne.variable} ${nunito.variable} font-body antialiased overflow-x-hidden w-full`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-card)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              },
              success: {
                iconTheme: {
                  primary: '#1A9E75',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#E84545',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
