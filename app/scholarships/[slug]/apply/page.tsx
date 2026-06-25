import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
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
        <div className="max-w-md p-8 text-center bg-white rounded-xl shadow-sm border border-[var(--color-border)]">
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
        <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-sm border border-[var(--color-border)]">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Application Received</h1>
          <p className="text-neutral-mid mb-6">You have already submitted an application for this scholarship. Your current status is: <strong className="uppercase">{existingApp.status}</strong>.</p>
          <a href="/dashboard" className="text-primary font-bold hover:underline">Return to Dashboard</a>
        </div>
      </div>
    );
  }

  // Fetch user profile to prefill form
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">Scholarship Application</span>
          <h1 className="text-3xl font-heading font-bold text-primary">{campaign.name}</h1>
          <p className="text-neutral-mid mt-2">Sponsored by {campaign.sponsor_name}</p>
        </div>
        
        <ApplyForm campaignId={campaign.id} initialData={{
          full_name: profile?.full_name || '',
          email: user.email || '',
        }} />
      </div>
    </div>
  );
}
