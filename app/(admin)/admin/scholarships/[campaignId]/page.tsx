import { createClient } from '@/lib/supabase/server';
import { fetchPlatformSettings } from '@/lib/platformSettings';
import ClientManager from './ClientManager';

export const metadata = {
  title: 'Manage Campaign | NurseFiti Admin',
};

export default async function ManageCampaignPage({ params }: { params: { campaignId: string } }) {
  const supabase = createClient() as any;
  
  const { data: campaign, error } = await supabase
    .from('scholarship_campaigns')
    .select('*')
    .eq('id', params.campaignId)
    .single();

  const settings = await fetchPlatformSettings(supabase);
  const premiumPrice = settings.plan_premium_price;

  if (error || !campaign) {
    return (
      <div className="py-12 text-center text-red-600">
        Campaign not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">{campaign.name}</h1>
          <p className="text-sm text-neutral-mid mt-1">Sponsor: {campaign.sponsor_name}</p>
        </div>
      </div>
      
      {/* The client component handles fetching deposits, beneficiaries, and applications to allow live updates without page reload */}
      <ClientManager campaign={campaign} premiumPrice={premiumPrice} />
    </div>
  );
}
