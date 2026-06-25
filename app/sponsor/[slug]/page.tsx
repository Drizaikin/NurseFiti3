import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { notFound } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SponsorCheckout from './SponsorCheckout';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient() as any;
  const { data } = await supabase.from('scholarship_campaigns').select('name').eq('slug', params.slug).single();
  return { title: data ? `${data.name} | Impact Dashboard` : 'Sponsor Dashboard' };
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

  // Fetch all deposits
  const { data: deposits } = await adminSupabase.from('scholarship_deposits').select('amount_kes').eq('campaign_id', campaign.id);
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

        {/* Sponsor Checkout */}
        <div className="mt-8 max-w-2xl mx-auto">
          <SponsorCheckout campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
