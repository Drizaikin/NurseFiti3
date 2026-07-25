import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { notFound } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchPlatformSettings } from '@/lib/platformSettings';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import SponsorCheckout from './SponsorCheckout';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient() as any;
  const { data } = await supabase.from('scholarship_campaigns').select('name').eq('slug', params.slug).single();
  return {
    title: data ? `${data.name} | Impact Dashboard` : 'Sponsor Dashboard',
    description: 'Private or campaign-specific NurseFiti scholarship impact information.',
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function SponsorDashboardPage({ params }: { params: { slug: string } }) {
  const supabase = createClient() as any;
  const adminSupabase = createAdminClient() as any;

  // Fetch campaign
  const { data: campaign, error: campaignError } = await supabase
    .from('scholarship_campaigns')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (campaignError || !campaign) {
    notFound();
  }

  // Security check: If not public, only admin can view it (for now, or we'd require a specific sponsor auth token)
  if (!campaign.is_public) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // In a real app, you'd show a login screen or a password prompt.
      // For this implementation, we simply block unauthenticated users if it's private.
      return <div className="p-12 text-center font-bold text-red-600">This dashboard is private. Please log in as an administrator.</div>;
    }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
      return <div className="p-12 text-center font-bold text-red-600">This dashboard is private.</div>;
    }
  }

  const settings = await fetchPlatformSettings(supabase);
  const premiumPrice = settings.plan_premium_price;

  // Fetch all deposits
  const { data: deposits } = await adminSupabase.from('scholarship_deposits').select('amount_kes, allocator_name, allocator_title, allocator_organization, created_at').eq('campaign_id', campaign.id).order('created_at', { ascending: false });
  const totalDeposits = deposits?.reduce((sum: number, d: any) => sum + (d.amount_kes || 0), 0) || 0;

  // Fetch all beneficiaries (with student IDs)
  const { data: beneficiaries } = await adminSupabase.from('scholarship_beneficiaries').select('*').eq('campaign_id', campaign.id);
  const totalAllocated = beneficiaries?.reduce((sum: number, b: any) => sum + (b.allocated_amount_kes || 0), 0) || 0;
  const fullCount = beneficiaries?.filter((b: any) => b.beneficiary_type === 'FULL').length || 0;
  const subCount = beneficiaries?.filter((b: any) => b.beneficiary_type === 'SUBSIDIZED').length || 0;
  const studentIds = beneficiaries?.map((b: any) => b.student_id) || [];

  // Fetch applications
  const { count: totalApps } = await adminSupabase.from('scholarship_applications').select('*', { count: 'exact', head: true }).eq('campaign_id', campaign.id);

  // Fetch impact metrics
  let questionsAttempted = 0;
  let mockExamsCompleted = 0;
  let averageImprovement = 0;

  if (studentIds.length > 0) {
    // We do it in chunks or a single large IN query if studentIds isn't too huge
    const { count: answersCount } = await adminSupabase
      .from('student_answers')
      .select('*', { count: 'exact', head: true })
      .in('student_id', studentIds);
    questionsAttempted = answersCount || 0;

    const { data: mockExams } = await adminSupabase
      .from('mock_exam_results')
      .select('score_percentage')
      .in('student_id', studentIds);
    
    mockExamsCompleted = mockExams?.length || 0;

    if (mockExamsCompleted > 0 && mockExams) {
      const totalScore = mockExams.reduce((sum: number, m: any) => sum + (m.score_percentage || 0), 0);
      // Rough average score (not strictly "improvement" without historical baseline, but serves as performance metric)
      averageImprovement = Math.round(totalScore / mockExamsCompleted);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-12">
      {/* Hero Header */}
      <div className="bg-primary text-white pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg inline-flex items-center justify-center">
              <NurseFitiLogo variant="full" size={48} />
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider uppercase">Impact Report</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{campaign.name}</h1>
          <p className="text-lg text-primary-light">Proudly Sponsored by <span className="font-bold text-white">{campaign.sponsor_name}</span></p>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 space-y-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-none text-center py-8">
            <p className="text-neutral-mid text-sm font-semibold uppercase tracking-wider mb-2">Total Beneficiaries</p>
            <p className="text-5xl font-bold text-primary">{fullCount + subCount}</p>
            <p className="text-sm text-neutral-mid mt-2">Students Sponsored</p>
          </Card>
          <Card className="shadow-lg border-none text-center py-8">
            <p className="text-neutral-mid text-sm font-semibold uppercase tracking-wider mb-2">Questions Mastered</p>
            <p className="text-5xl font-bold text-teal-600">{questionsAttempted.toLocaleString()}</p>
            <p className="text-sm text-neutral-mid mt-2">Practice Attempts</p>
          </Card>
          <Card className="shadow-lg border-none text-center py-8">
            <p className="text-neutral-mid text-sm font-semibold uppercase tracking-wider mb-2">Avg. Exam Score</p>
            <p className="text-5xl font-bold text-amber-600">{averageImprovement}%</p>
            <p className="text-sm text-neutral-mid mt-2">Across {mockExamsCompleted} Mock Exams</p>
          </Card>
        </div>

        {/* About the Scholarship / Impact */}
        <Card className="bg-primary/5 border-primary/20 shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-4">How Your Support Transforms Lives</h2>
          <div className="text-neutral-dark space-y-5">
            <p className="leading-relaxed">
              Your generous contribution directly removes financial barriers for aspiring nurses, enabling them to focus entirely on their licensure exam preparation. 
              By sponsoring these students, you are not just funding exam prep—you are investing in the future of healthcare in marginalized communities, bridging the healthcare worker gap, and empowering the next generation of nursing professionals to achieve their dreams.
            </p>
            <div className="bg-[var(--color-bg)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm">
              <h3 className="font-semibold text-primary text-lg mb-3 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md text-sm">Target</span>
                Scholarship Allocation Structure
              </h3>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-teal-100 text-teal-700 p-1 rounded-full"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <div>
                    <span className="font-bold text-neutral-dark block">First 10 Registrations</span>
                    <span className="text-teal-600 font-semibold">100% Free Premium Access</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-amber-100 text-amber-700 p-1 rounded-full"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <div>
                    <span className="font-bold text-neutral-dark block">Next 100 Registrations</span>
                    <span className="text-amber-600 font-semibold">25% Subsidized Discount</span>
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-sm text-neutral-mid italic">
              * Your contributions are allocated transparently based on student application dates and merit criteria. Every shilling goes directly toward covering the platform costs for these dedicated learners, ensuring your donation creates maximum, measurable impact.
            </p>
          </div>
        </Card>

        {/* Financial Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-primary mb-4 border-b border-[var(--color-border)] pb-2">Financial Transparency</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-mid">Funds Received</span>
                <span className="font-bold text-lg">KES {totalDeposits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-mid">Funds Allocated</span>
                <span className="font-bold text-lg text-amber-600">KES {totalAllocated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)]">
                <span className="font-bold text-primary">Balance Remaining</span>
                <span className="font-bold text-xl text-teal-600">KES {(totalDeposits - totalAllocated).toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-primary mb-4 border-b border-[var(--color-border)] pb-2">Application Pipeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-mid">Total Applications</span>
                <span className="font-bold text-lg">{totalApps}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-mid">Full Scholarships Granted</span>
                <span className="font-bold text-lg text-primary">{fullCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-mid">Subsidized Scholarships Granted</span>
                <span className="font-bold text-lg text-teal-600">{subCount}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Generous Contributors */}
        {campaign.show_allocators && deposits && deposits.length > 0 && (
          <Card className="shadow-md border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4 border-b border-[var(--color-border)] pb-2">Generous Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deposits.filter((d: any) => d.allocator_name).map((deposit: any, idx: number) => (
                <div key={idx} className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-neutral-dark text-lg">{deposit.allocator_name}</h4>
                    {deposit.allocator_title && (
                      <p className="text-sm text-neutral-mid">{deposit.allocator_title}</p>
                    )}
                    {deposit.allocator_organization && (
                      <p className="text-sm font-semibold text-primary/80 mt-1">{deposit.allocator_organization}</p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex justify-between items-center">
                    <span className="text-xs text-neutral-mid">Contribution</span>
                    <span className="font-bold text-teal-600">KES {deposit.amount_kes.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            {deposits.filter((d: any) => d.allocator_name).length === 0 && (
              <p className="text-neutral-mid italic">Anonymous contributors have funded this campaign.</p>
            )}
          </Card>
        )}

        {/* Sponsor Checkout */}
        <div className="mt-8 max-w-2xl mx-auto">
          <SponsorCheckout campaign={campaign} premiumPrice={premiumPrice} />
        </div>
      </div>
    </div>
  );
}
