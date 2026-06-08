import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all public content to be indexed
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/blog/*',
          '/tutors',
          '/help',
          '/privacy',
          '/terms',
          '/signup',
          '/login',
        ],
        // Never index authenticated app pages
        disallow: [
          '/dashboard',
          '/practice',
          '/mock-exam',
          '/flashcards',
          '/analytics',
          '/achievements',
          '/groups',
          '/revision-plan',
          '/bookings',
          '/settings',
          '/onboarding',
          '/tutor-dashboard',
          '/tutor-schedule',
          '/tutor-students',
          '/tutor-studio',
          '/tutor-earnings',
          '/tutor-reviews',
          '/tutor-profile',
          '/tutor-pending',
          '/tutor-complete-profile',
          '/tutor-community',
          '/admin',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
