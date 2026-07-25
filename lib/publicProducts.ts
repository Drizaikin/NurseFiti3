import type { Metadata } from 'next';
import { PLAN_LIMITS, type PlanTier } from '@/lib/planLimits';
import {
  buildDynamicPlanPricingMeta,
  type PlatformSettings,
} from '@/lib/platformSettings';

export const SITE_URL = 'https://www.nursefiti.co.ke';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export type PublicProductSlug =
  | 'practice-questions'
  | 'mock-exams'
  | 'nck-flashcards'
  | 'revision-plans'
  | 'tutoring';

export interface PublicProduct {
  slug: PublicProductSlug;
  metadataTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  highlights: Array<{ title: string; description: string }>;
  steps: Array<{ title: string; description: string }>;
  suitedFor: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const PUBLIC_PRODUCTS: Record<PublicProductSlug, PublicProduct> = {
  'practice-questions': {
    slug: 'practice-questions',
    metadataTitle: 'NCK Practice Questions Kenya',
    eyebrow: 'Active recall for nursing candidates',
    title: 'NCK practice questions that turn revision into useful feedback',
    description:
      'Work through nursing MCQs by study area, review answer rationales, and use your results to decide what to revise next.',
    summary:
      'NurseFiti practice sessions are designed for focused, repeatable revision. They support preparation for Kenyan nursing licensure assessments but do not reproduce confidential or live examination content.',
    primaryCta: 'Start a free practice session',
    primaryHref: '/signup',
    secondaryCta: 'Compare practice limits',
    secondaryHref: '/pricing',
    highlights: [
      { title: 'Study by area', description: 'Choose the nursing area you want to practise instead of relying on unfocused question sets.' },
      { title: 'Learn from each answer', description: 'Review the answer and rationale so a missed question can become a revision prompt.' },
      { title: 'Spot weak areas', description: 'Use your practice history and performance view to identify topics that may need more attention.' },
      { title: 'Practise on mobile', description: 'Complete short revision sessions from a phone or continue on a larger screen.' },
    ],
    steps: [
      { title: 'Choose your focus', description: 'Select a relevant study area and begin a question session.' },
      { title: 'Answer thoughtfully', description: 'Commit to an answer before opening the feedback and rationale.' },
      { title: 'Review your pattern', description: 'Use the session results to plan another set or revisit the underlying topic.' },
    ],
    suitedFor: ['Daily active recall', 'Topic-focused revision', 'Finding knowledge gaps', 'Short mobile study sessions'],
    faqs: [
      { question: 'Are these official NCK examination questions?', answer: 'No. NurseFiti provides educational, exam-style practice material. It does not claim to provide confidential, leaked, or live NCK examination questions.' },
      { question: 'How many questions can I practise?', answer: 'The daily allowance depends on your active plan. The free plan currently includes 20 practice questions per day, and the pricing page shows the current limits for every plan.' },
      { question: 'Can practice questions guarantee that I pass?', answer: 'No study tool can guarantee an examination result. Practice questions can support active recall and help identify gaps, but candidates should also use approved course materials and current professional guidance.' },
    ],
  },
  'mock-exams': {
    slug: 'mock-exams',
    metadataTitle: 'NCK Mock Exams and Timed Practice',
    eyebrow: 'Timed digital exam practice',
    title: 'Build a calmer exam routine with structured mock exams',
    description:
      'Practise pacing, sustained concentration, and question review in a timed digital setting built for revision.',
    summary:
      'NurseFiti mock exams provide a practical digital rehearsal. They are not an exact copy of NCK or DigiProctor software, and screen details or examination procedures may differ from the live assessment.',
    primaryCta: 'Prepare for a mock exam',
    primaryHref: '/signup',
    secondaryCta: 'See mock exam allowances',
    secondaryHref: '/pricing',
    highlights: [
      { title: 'Timed sessions', description: 'Practise allocating attention across a complete session while a visible timer keeps you oriented.' },
      { title: 'Digital navigation', description: 'Become more comfortable answering and reviewing MCQs in a browser-based workflow.' },
      { title: 'Post-exam review', description: 'Review your result and the areas that contributed to it after submitting the session.' },
      { title: 'Repeat with purpose', description: 'Use each result to set a specific focus before attempting your next mock exam.' },
    ],
    steps: [
      { title: 'Set aside uninterrupted time', description: 'Treat the session as a rehearsal and prepare your study environment.' },
      { title: 'Complete the timed attempt', description: 'Work steadily and use the available navigation to manage unanswered items.' },
      { title: 'Turn results into revision', description: 'Review topic performance and follow up with targeted questions or flashcards.' },
    ],
    suitedFor: ['Pacing practice', 'Digital test familiarity', 'Endurance building', 'Readiness check-ins'],
    faqs: [
      { question: 'Is the mock exam an exact DigiProctor replica?', answer: 'No. It is a browser-based study simulation intended to build familiarity with timed digital question practice. The live NCK assessment platform, controls, and procedures may differ.' },
      { question: 'Are mock exam results official?', answer: 'No. Scores are private study indicators within NurseFiti and are not issued or endorsed by the Nursing Council of Kenya.' },
      { question: 'How often can I take a mock exam?', answer: 'Allowances depend on your active plan and reset rules. See the pricing page for the current weekly limits and download availability.' },
    ],
  },
  'nck-flashcards': {
    slug: 'nck-flashcards',
    metadataTitle: 'NCK Nursing Flashcards',
    eyebrow: 'Recall-focused nursing revision',
    title: 'Keep important nursing concepts in active rotation',
    description:
      'Use digital flashcards to retrieve key information, revisit difficult cards, and make short revision windows count.',
    summary:
      'Flashcards work best when you try to recall the answer before revealing it. NurseFiti helps organise that repeat-review loop alongside your question practice.',
    primaryCta: 'Start reviewing flashcards',
    primaryHref: '/signup',
    secondaryCta: 'View plans with flashcards',
    secondaryHref: '/pricing',
    highlights: [
      { title: 'Active retrieval', description: 'Prompt yourself to produce an answer before checking the card, rather than simply rereading notes.' },
      { title: 'Focused decks', description: 'Review cards in organised nursing topics so each session has a clear purpose.' },
      { title: 'Difficulty feedback', description: 'Mark how a card felt and use that signal to guide when it should return to your review flow.' },
      { title: 'Study in small windows', description: 'Use a few spare minutes for a compact recall session on mobile or desktop.' },
    ],
    steps: [
      { title: 'Open a relevant deck', description: 'Choose the nursing topic connected to your current revision goal.' },
      { title: 'Recall before revealing', description: 'Say or write your answer, then compare it with the card content.' },
      { title: 'Revisit what felt difficult', description: 'Use your difficulty rating to keep weaker concepts in the review cycle.' },
    ],
    suitedFor: ['Terminology review', 'Concept recall', 'Between-class revision', 'Targeted repetition'],
    faqs: [
      { question: 'Do flashcards replace textbooks or clinical guidelines?', answer: 'No. Flashcards are concise recall aids. Use them alongside your approved curriculum resources, current clinical guidance, and tutor or faculty direction.' },
      { question: 'Which plans include flashcards?', answer: 'Flashcards are currently available on paid plans. The pricing page lists the live plan prices and access details.' },
      { question: 'Will spaced review guarantee I remember everything?', answer: 'No. Consistent retrieval practice can support learning, but memory and exam performance vary by person and depend on the quality and breadth of the full study approach.' },
    ],
  },
  'revision-plans': {
    slug: 'revision-plans',
    metadataTitle: 'NCK Revision Plan Generator',
    eyebrow: 'A practical route through your syllabus',
    title: 'Turn your exam date and study time into a revision plan',
    description:
      'Create a structured study schedule around your available time, selected areas, and target date, then adjust it as your needs change.',
    summary:
      'A NurseFiti revision plan is a planning aid, not a prediction of readiness or an official NCK timetable. It gives you a useful starting structure while leaving room for school, placement, work, and rest.',
    primaryCta: 'Build my revision plan',
    primaryHref: '/signup',
    secondaryCta: 'Check plan access',
    secondaryHref: '/pricing',
    highlights: [
      { title: 'Built around your date', description: 'Use your target examination date to organise the time available for revision.' },
      { title: 'Realistic study windows', description: 'Account for the amount of study time you can regularly commit instead of planning an idealised routine.' },
      { title: 'Clear weekly focus', description: 'Break broad revision goals into smaller areas that are easier to act on.' },
      { title: 'Shareable schedule', description: 'Keep your plan accessible and share it when useful for accountability or tutor discussion.' },
    ],
    steps: [
      { title: 'Add your constraints', description: 'Enter your date, available study time, and the areas relevant to your preparation.' },
      { title: 'Review the suggested structure', description: 'Check that the workload is realistic before making it your routine.' },
      { title: 'Adapt as you learn', description: 'Change your emphasis when practice results or personal commitments show that the plan needs adjusting.' },
    ],
    suitedFor: ['Starting revision', 'Balancing several topics', 'Weekly accountability', 'Discussing priorities with a tutor'],
    faqs: [
      { question: 'Is the revision plan an official NCK schedule?', answer: 'No. It is a personal study-planning tool created from the information you provide. Always rely on official NCK communication for examination dates and requirements.' },
      { question: 'Which plans include revision plans?', answer: 'Revision plan access is currently included with Weekly, Standard, and Premium plans. It is not included with Free or Daily access.' },
      { question: 'Can I change the plan later?', answer: 'Your preparation should remain flexible. Review the schedule as your available time, target date, and weaker areas change.' },
    ],
  },
  tutoring: {
    slug: 'tutoring',
    metadataTitle: 'Nursing Tutors for NCK Preparation',
    eyebrow: 'One-to-one nursing study support',
    title: 'Get focused help from a tutor when self-study is not enough',
    description:
      'Find a tutor for a specific nursing topic, agree on a suitable session, and bring the questions that are slowing down your revision.',
    summary:
      'Tutoring supports learning and exam preparation; it cannot guarantee an outcome. Tutor availability, rates, and suitable subject coverage vary, and students can review details before booking.',
    primaryCta: 'Create an account to find a tutor',
    primaryHref: '/signup',
    secondaryCta: 'Apply to become a tutor',
    secondaryHref: '/signup-tutor',
    highlights: [
      { title: 'Topic-specific support', description: 'Look for help with the nursing area or revision challenge you need to address.' },
      { title: 'Tutor profiles', description: 'Review the information available on a tutor profile before deciding whom to book.' },
      { title: 'Scheduled sessions', description: 'Choose from available times and keep confirmed session details in one place.' },
      { title: 'Preparation that stays yours', description: 'Bring practice errors, unclear concepts, or a revision plan so the session has a concrete focus.' },
    ],
    steps: [
      { title: 'Define the help you need', description: 'Write down the topic, questions, or practice feedback you want to discuss.' },
      { title: 'Review available tutors', description: 'Compare relevant profile details, availability, and the displayed session rate.' },
      { title: 'Book and prepare', description: 'Confirm a suitable time and arrive with the material needed for a focused session.' },
    ],
    suitedFor: ['Clarifying difficult concepts', 'Reviewing practice errors', 'Study-plan accountability', 'Focused one-to-one discussion'],
    faqs: [
      { question: 'Does booking a tutor guarantee an exam result?', answer: 'No. A tutor can explain concepts, guide practice, and support planning, but no tutor or platform can guarantee a particular examination outcome.' },
      { question: 'How are session prices set?', answer: 'NurseFiti may use platform rates by student cadre or allow tutor-set rates, depending on the current platform setting. The applicable rate is shown before a student books.' },
      { question: 'Is tutoring a source of clinical advice?', answer: 'No. NurseFiti tutoring is educational and does not replace professional clinical judgment, institutional protocols, current Ministry of Health guidance, or other applicable standards.' },
    ],
  },
};

const PLAN_ORDER: PlanTier[] = ['free', 'daily', 'weekly', 'standard', 'premium'];

function amount(value: number, singular: string, plural = `${singular}s`) {
  if (value === Infinity) return `Unlimited ${plural}`;
  return `${value.toLocaleString()} ${value === 1 ? singular : plural}`;
}

export function getPublicPlans(settings: PlatformSettings) {
  const pricing = buildDynamicPlanPricingMeta(settings);

  return PLAN_ORDER.map((tier) => {
    const limits = PLAN_LIMITS[tier];
    const pricingMeta = pricing[tier];
    const practice = limits.practiceQuestionsPerDay === Infinity
      ? 'Unlimited practice questions'
      : `${amount(limits.practiceQuestionsPerDay, 'practice question')} per day`;
    const mockExams = limits.mockExamsPerWeek === 0
      ? 'Mock exams not included'
      : limits.mockExamsPerWeek === Infinity
        ? 'Mock exams without a weekly plan cap'
        : `${amount(limits.mockExamsPerWeek, 'mock exam')} per week`;
    const downloads = limits.mockExamDownloads === 0
      ? 'Mock exam downloads not included'
      : limits.mockExamDownloads === Infinity
        ? 'Unlimited mock exam downloads'
        : `${amount(limits.mockExamDownloads, 'mock exam download')}`;

    const features = [
      practice,
      mockExams,
      downloads,
      limits.flashcardsAccess ? 'Flashcard access' : 'Flashcards not included',
      limits.analyticsLevel === 'full' ? 'Full performance analytics' : 'Basic performance analytics',
      limits.revisionPlanAccess ? 'Revision plan access' : 'Revision plans not included',
      limits.wrongQuestionsDownload ? 'Download questions answered incorrectly' : 'Wrong-answer downloads not included',
      limits.communityGroups ? 'Community groups' : 'Community groups not included',
      limits.tutorBookingAccess ? 'Tutor booking access' : 'Tutor booking not included',
    ];

    if (limits.leaderboard) features.push('Leaderboard access');
    if (limits.whatsappSupport) features.push('WhatsApp support');
    if (limits.examReminders) features.push('Exam reminders');

    return {
      tier,
      ...pricingMeta,
      highlight: 'highlight' in pricingMeta ? pricingMeta.highlight : false,
      description: tier === 'free'
        ? 'Explore daily question practice before choosing a paid plan.'
        : tier === 'daily'
          ? 'Short access for a focused day of revision.'
          : tier === 'weekly'
            ? 'A structured week with broader practice and planning tools.'
            : tier === 'standard'
              ? 'Ongoing preparation with uncapped question practice.'
              : 'Extended exam-cycle access with the broadest support set.',
      features,
    };
  });
}

export function productMetadata(product: PublicProduct): Metadata {
  const url = `${SITE_URL}/${product.slug}`;
  return {
    title: product.metadataTitle,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.metadataTitle,
      description: product.description,
      url,
      siteName: 'NurseFiti',
      locale: 'en_KE',
      type: 'website',
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: `${product.metadataTitle} - NurseFiti` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metadataTitle,
      description: product.description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export function productJsonLd(product: PublicProduct) {
  const url = `${SITE_URL}/${product.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: product.title,
        description: product.description,
        inLanguage: 'en-KE',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${url}#service` },
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `NurseFiti ${product.slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}`,
        description: product.summary,
        url,
        serviceType: 'Nursing exam preparation support',
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'Kenya' },
        audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: product.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}
