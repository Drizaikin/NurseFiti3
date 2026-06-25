import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import ApplyForm from './ApplyForm';

export const metadata = {
  title: 'Apply for Scholarship | NurseFiti',
};

export default async function ScholarshipApplyPage({ params }: { params: { slug: string } }) {
  const supabase = createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/scholarships/${params.slug}/apply`);
  }

  // Fetch campaign
  const { data: campaign, error } = await supabase
    .from('scholarship_campaigns')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !campaign) {
    notFound();
  }

  if (campaign.status !== 'active') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="max-w-md p-8 text-center bg-white rounded-2xl shadow-xl border border-[var(--color-border)]">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Campaign Closed</h1>
          <p className="text-neutral-mid">This scholarship campaign is no longer accepting applications.</p>
        </div>
      </div>
    );
  }

  // Check if already applied
  const { data: existingApp } = await supabase
    .from('scholarship_applications')
    .select('status')
    .eq('campaign_id', campaign.id)
    .eq('student_id', user.id)
    .single();

  if (existingApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
        <div className="max-w-md w-full p-8 text-center bg-white rounded-2xl shadow-xl border border-[var(--color-border)]">
          <div className="w-20 h-20 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            ✓
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-3">Application Received</h1>
          <p className="text-neutral-mid mb-8 text-lg">
            You have already submitted an application for this scholarship. Your current status is:{' '}
            <strong className="uppercase text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{existingApp.status}</strong>.
          </p>
          <a href="/dashboard" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors shadow-md">
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Fetch user profile to prefill form
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <NurseFitiLogo variant="full" size={64} />
          </Link>
        </div>

        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-amber-100 border border-teal-200 text-teal-800 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span>✨</span> Official Scholarship Application
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4 leading-tight">
            {campaign.name}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-neutral-dark">
            Proudly Sponsored By <br/>
            <strong className="text-xl text-primary">{campaign.sponsor_name}</strong>
          </p>
        </div>
        
        <ApplyForm campaignId={campaign.id} initialData={{
          full_name: profile?.full_name || '',
          email: user.email || '',
        }} />
      </div>
    </div>
  );
}
