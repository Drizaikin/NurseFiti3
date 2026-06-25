import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Scholarship Campaigns | NurseFiti Admin',
};

export default async function AdminScholarshipsPage() {
  const supabase = createClient();
  
  const { data: campaigns, error } = await (supabase as any)
    .from('scholarship_campaigns')
    .select('*, scholarship_applications(id, status)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch campaigns:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-primary">Scholarship Campaigns</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(!campaigns || campaigns.length === 0) ? (
          <div className="col-span-full text-center py-12 text-neutral-mid bg-[var(--color-bg-alt)] rounded-lg border border-[var(--color-border)]">
            No scholarship campaigns found. Add one directly to the database to get started.
          </div>
        ) : (
          campaigns.map((campaign: any) => {
            const pendingApps = campaign.scholarship_applications?.filter((a: any) => a.status === 'pending').length || 0;
            const approvedApps = campaign.scholarship_applications?.filter((a: any) => a.status === 'approved').length || 0;

            return (
              <Card key={campaign.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-primary">{campaign.name}</h3>
                  <p className="text-sm text-neutral-mid mt-1">Sponsor: {campaign.sponsor_name}</p>
                </div>
                
                <div className="flex-1 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Status:</span>
                    <span className={`font-medium uppercase tracking-wide text-xs px-2 py-0.5 rounded-full ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Pending Applications:</span>
                    <span className="font-bold text-amber-600">{pendingApps}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Approved Scholars:</span>
                    <span className="font-bold text-teal-600">{approvedApps}</span>
                  </div>
                </div>

                <Link
                  href={`/admin/scholarships/${campaign.id}`}
                  className="w-full block text-center py-2.5 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors mt-auto"
                >
                  Manage Campaign
                </Link>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
