import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the NurseFiti Privacy Policy. Learn how we collect, use, and protect your data on Kenya\'s NCK exam preparation platform.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | NurseFiti',
    description: 'NurseFiti Privacy Policy — how we protect your data.',
    url: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-cream dark:bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8"><Link href="/"><NurseFitiLogo variant="full" size={48} /></Link></div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">Privacy Policy</h1>
        <p className="text-neutral-mid mb-8">Last updated: June 2026</p>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">1. Data We Collect</h2>
            <p className="text-neutral-mid leading-relaxed mb-2">To provide our educational services and comply with the Kenya Data Protection Act 2019, NurseFiti collects the following personal data:</p>
            <ul className="list-disc list-inside text-neutral-mid space-y-1 ml-2">
              <li><strong>Student Data:</strong> Names, email addresses, phone numbers, nursing school/institution, course details, exam dates, and payment transaction records.</li>
              <li><strong>Tutor Data:</strong> Names, email addresses, phone numbers, NCK license numbers, professional certificates, ID information, CVs, and professional qualifications.</li>
              <li><strong>Usage Data:</strong> Practice answers, mock exam scores, and performance metrics to personalise the study experience.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">2. How We Use Your Data</h2>
            <p className="text-neutral-mid leading-relaxed">Your data is collected and processed solely to provide the NurseFiti service. This includes personalised study recommendations, progress tracking, verifying tutor credentials, and processing M-Pesa payments. We do not sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">3. Secure Storage & Access Control</h2>
            <p className="text-neutral-mid leading-relaxed mb-2">Your data is stored securely on encrypted databases with strict Row-Level Security (RLS) policies. All data is transmitted via HTTPS.</p>
            <ul className="list-disc list-inside text-neutral-mid space-y-1 ml-2">
              <li><strong>Confidential Documents:</strong> Sensitive documents such as NCK licenses, IDs, and professional certificates are stored in private, non-public storage buckets.</li>
              <li><strong>Access Control:</strong> Only authorized members of the NurseFiti admin verification team have access to view these confidential documents for the sole purpose of identity and credential verification. These documents are never exposed publicly.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">4. Tutor Anonymity & Privacy</h2>
            <p className="text-neutral-mid leading-relaxed">Under the Data Protection Act 2019, and to protect the privacy and professional standing of tutors—including those employed by the Government of Kenya or other institutions—NurseFiti provides an anonymity feature. Tutors may opt to use a pseudonym (pseudo name) when interacting with students on the platform. While NurseFiti internally verifies and stores the tutor&apos;s true credentials securely for quality assurance, their real identity remains strictly confidential and is not disclosed to students or the public, safeguarding them from potential conflicts of interest.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">5. Data Retention Policy</h2>
            <p className="text-neutral-mid leading-relaxed">We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including satisfying any legal, accounting, or reporting requirements. Educational performance data may be anonymized and aggregated for statistical analysis after account deletion.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">6. Your Rights & Deletion Requests</h2>
            <p className="text-neutral-mid leading-relaxed">Under the Data Protection Act 2019, you have the right to access, correct, or request the deletion of your personal data. You can request the complete deletion of your account and all associated identifiable data at any time by emailing <a href="mailto:danotyanga@gmail.com" className="text-primary hover:underline">danotyanga@gmail.com</a>. We process deletion requests within 30 days.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">7. Contact</h2>
            <p className="text-neutral-mid">For privacy-related questions or data requests, email our Data Protection Officer at <a href="mailto:danotyanga@gmail.com" className="text-primary hover:underline">danotyanga@gmail.com</a></p>
          </section>
        </div>
        <div className="mt-6 text-center"><Link href="/" className="text-primary hover:underline text-sm">← Back to NurseFiti</Link></div>
      </div>
    </main>
  );
}
