import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export const metadata: Metadata = {
  title: 'Tutor Agreement',
  description: 'Read the NurseFiti Tutor Agreement. Requirements and rules for tutors on Kenya\'s NCK exam preparation platform.',
  openGraph: {
    title: 'Tutor Agreement | NurseFiti',
    description: 'NurseFiti Tutor Agreement.',
    url: 'https://www.nursefiti.co.ke/tutor-agreement',
  },
};

export default function TutorAgreementPage() {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8"><Link href="/"><NurseFitiLogo variant="full" size={48} /></Link></div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-2">Tutor Agreement</h1>
        <p className="text-neutral-mid mb-8">Last updated: June 2026</p>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 space-y-6 text-[var(--color-text)]">
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">1. Professional Standing</h2>
            <p className="text-neutral-mid leading-relaxed">By registering as a tutor on NurseFiti, you warrant that you are a qualified and licensed nursing professional in good standing with the Nursing Council of Kenya (NCK). You agree to provide your official NCK license number and documentation for verification before you can actively teach on the platform.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">2. Content Originality and Copyright</h2>
            <p className="text-neutral-mid leading-relaxed mb-2">Tutors are solely responsible for the content they upload, share, or teach during sessions. You warrant that:</p>
            <ul className="list-disc list-inside text-neutral-mid space-y-1 ml-2">
              <li>The content is your original work or you are legally authorized to share it.</li>
              <li>The content does not infringe on the copyrights of any third party (including KMTC, universities, or textbook publishers).</li>
              <li>You will not upload unauthorized PDFs, university handouts, or proprietary textbooks without explicit permission.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">3. Academic Integrity and Confidentiality</h2>
            <p className="text-neutral-mid leading-relaxed mb-2">NurseFiti enforces a strict zero-tolerance policy against examination malpractice. As a tutor, you warrant that:</p>
            <ul className="list-disc list-inside text-neutral-mid space-y-1 ml-2">
              <li>Your teaching content is educational and syllabus-based.</li>
              <li>Your content is NOT confidential examination material.</li>
              <li>You will never claim to possess &quot;leaked&quot; exam papers or &quot;know&quot; the exact questions that will appear on the official NCK exam.</li>
            </ul>
            <p className="text-neutral-mid leading-relaxed mt-2">Any tutor found offering, distributing, or claiming to possess confidential examination materials will be immediately banned and reported to the relevant authorities.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">4. Medical Advice Liability</h2>
            <p className="text-neutral-mid leading-relaxed">You understand that NurseFiti is an educational platform and not a clinical platform. You agree that all information and instruction you provide to students is solely for examination preparation and academic learning. You must actively remind students that your teaching does not replace professional clinical judgment, institutional guidelines, NCK standards, MOH guidelines, or physician orders in a real clinical setting.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">5. Tutor Earnings</h2>
            <p className="text-neutral-mid leading-relaxed">NurseFiti deducts a 23% platform fee from all confirmed session bookings. You will receive 77% of the gross session amount, paid out weekly via M-Pesa. Please refer to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> for detailed payment structures.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-bold mb-3">6. Contact</h2>
            <p className="text-neutral-mid">For questions regarding this agreement, email <a href="mailto:danotyanga@gmail.com" className="text-primary hover:underline">danotyanga@gmail.com</a></p>
          </section>
        </div>
        <div className="mt-6 text-center"><Link href="/" className="text-primary hover:underline text-sm">← Back to NurseFiti</Link></div>
      </div>
    </div>
  );
}
