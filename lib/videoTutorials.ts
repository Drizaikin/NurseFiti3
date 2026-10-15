export type VideoTutorial = {
  slug: string;
  title: string;
  description: string;
  cardDescription: string;
  icon: string;
  durationSeconds: number;
  uploadDate: string;
  src: string;
  poster: string;
};

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    slug: 'signing-up',
    title: 'Create your NurseFiti account',
    description: 'Learn how to sign up for NurseFiti, choose your nursing cadre and institution, complete the orientation tour, and open your personalised NCK exam preparation dashboard.',
    cardDescription: 'Sign up, choose your cadre and institution, and take a quick tour of your dashboard.',
    icon: '✨', durationSeconds: 37, uploadDate: '2026-05-01',
    src: '/videos/tutorials/signing-up.mp4', poster: '/images/tutorials/signing-up.jpg',
  },
  {
    slug: 'signup-login',
    title: 'Log in and explore your NurseFiti dashboard',
    description: 'See how to log in to NurseFiti and use your personalised dashboard to follow your study streak, average score, and study time.',
    cardDescription: 'Log in and see your study streak, average score, and study time at a glance.',
    icon: '🔐', durationSeconds: 18, uploadDate: '2026-05-01',
    src: '/videos/tutorials/signup-login.mp4', poster: '/images/tutorials/signup-login.jpg',
  },
  {
    slug: 'practice-mock-exams',
    title: 'Practice NCK questions on NurseFiti',
    description: 'Watch how to start or resume an NCK practice session, answer multiple-choice questions, and review instant feedback with a full explanation.',
    cardDescription: 'Answer practice MCQs and review instant feedback with full explanations.',
    icon: '📝', durationSeconds: 27, uploadDate: '2026-05-01',
    src: '/videos/tutorials/practice-mock-exams.mp4', poster: '/images/tutorials/practice-mock-exams.jpg',
  },
];

export function getVideoTutorial(slug: string) {
  return VIDEO_TUTORIALS.find((video) => video.slug === slug);
}

export function formatVideoDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
