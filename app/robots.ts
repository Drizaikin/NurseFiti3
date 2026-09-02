import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke';

const privatePaths = [
  '/api/',
  '/auth/',
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
  '/tutors',
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
  '/sponsor/',
  '/scholarships/',
];

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', '/practice-questions', '/mock-exams', '/revision-plans',
          '/nck-flashcards', '/pricing', '/tutoring', '/nursing-students',
        ],
        disallow: privatePaths,
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'PerplexityBot',
          'Perplexity-User',
          'ClaudeBot',
          'Claude-User',
          'anthropic-ai',
          'Google-Extended',
        ],
        allow: [
          '/', '/blog/', '/about', '/pricing', '/practice-questions', '/mock-exams',
          '/nck-flashcards', '/revision-plans', '/tutoring', '/nursing-students', '/help', '/privacy',
          '/terms', '/tutor-agreement', '/llms.txt',
        ],
        disallow: privatePaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
