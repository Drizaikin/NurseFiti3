"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { PLAN_PRICING_META } from '@/lib/planLimits';

export default function ClientManager({ campaign }: { campaign: any }) {
  const [applications, setApplications] = useState<any[]>([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [fullCount, setFullCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [viewingDocsApp, setViewingDocsApp] = useState<any | null>(null);

  const supabase = createClient() as any;
  const premiumPrice = PLAN_PRICING_META.premium.amountKsh;
  const subsidizedPrice = Math.round(premiumPrice * ((100 - campaign.subsidy_discount_percentage) / 100));

  const fetchData = async () => {
    try {
      // 1. Fetch deposits
      const { data: deposits } = await supabase
        .from('scholarship_deposits')
        .select('amount_kes')
        .eq('campaign_id', campaign.id);
      const deposited = deposits?.reduce((sum: number, d: any) => sum + (d.amount_kes || 0), 0) || 0;
      setTotalDeposits(deposited);

      // 2. Fetch beneficiaries (allocations)
      const { data: beneficiaries } = await supabase
        .from('scholarship_beneficiaries')
        .select('allocated_amount_kes, beneficiary_type')
        .eq('campaign_id', campaign.id);
      
      const allocated = beneficiaries?.reduce((sum: number, b: any) => sum + (b.allocated_amount_kes || 0), 0) || 0;
      setTotalAllocated(allocated);
      
      const fulls = beneficiaries?.filter((b: any) => b.beneficiary_type === 'FULL').length || 0;
      setFullCount(fulls);

      // 3. Fetch applications
      const { data: apps } = await supabase
        .from('scholarship_applications')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('created_at', { ascending: true });
      
      setApplications(apps || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load campaign data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [campaign.id]);

  const availableFunds = totalDeposits - totalAllocated;

  const handleDecision = async (appId: string, decision: 'FULL' | 'SUBSIDIZED' | 'REJECT' | 'WAITLIST') => {
    setIsProcessing(appId);
    try {
      const res = await fetch('/api/scholarships/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: appId, decision })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process application');
      }

      toast.success(`Application ${decision.toLowerCase()} successfully`);
      await fetchData(); // Refresh all stats
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessing(null);
    }
  };

  if (isLoading) {
    return <div className="py-12 flex justify-center"><Spinner size="lg" color="primary" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Campaign Public Links */}
      <Card className="bg-[var(--color-bg-alt)] border-[var(--color-border)] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h3 className="font-semibold text-primary">Public Campaign Links</h3>
          <p className="text-sm text-neutral-mid">Share these links with the sponsor and students.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(`https://www.nursefiti.co.ke/sponsor/${campaign.slug}`);
              toast.success('Sponsor link copied to clipboard!');
            }}
          >
            Copy Sponsor Link
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(`https://www.nursefiti.co.ke/scholarships/${campaign.slug}/apply`);
              toast.success('Application link copied to clipboard!');
            }}
          >
            Copy Application Link
          </Button>
        </div>
      </Card>

      {/* Ledger Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary text-white border-none">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-wider">Total Deposits</p>
          <p className="text-3xl font-bold mt-2">KES {totalDeposits.toLocaleString()}</p>
        </Card>
        <Card className="bg-amber-600 text-white border-none">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-wider">Total Allocated</p>
          <p className="text-3xl font-bold mt-2">KES {totalAllocated.toLocaleString()}</p>
        </Card>
        <Card className="bg-teal-600 text-white border-none">
          <p className="text-teal-200 text-sm font-semibold uppercase tracking-wider">Available Balance</p>
          <p className="text-3xl font-bold mt-2">KES {availableFunds.toLocaleString()}</p>
        </Card>
        <Card className="bg-neutral-800 text-white border-none">
          <p className="text-neutral-400 text-sm font-semibold uppercase tracking-wider">Full Scholarships</p>
          <p className="text-3xl font-bold mt-2">{fullCount} / {campaign.full_scholarship_slots}</p>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
          <h2 className="font-semibold">Applications ({applications.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">County & Inst.</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-neutral-mid">No applications found.</td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app.id} className="hover:bg-[var(--color-bg)]/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.full_name}</div>
                      <div className="text-xs text-neutral-mid">{app.email}</div>
                      <div className="text-xs text-neutral-mid">{app.phone_number}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{app.county} {app.sub_county ? `(${app.sub_county})` : ''}</div>
                      <div className="text-xs text-neutral-mid">{app.institution}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        app.status === 'waitlisted' ? 'bg-amber-100 text-amber-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      {app.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setViewingDocsApp(app)}
                          >
                            Verify Docs
                          </Button>
                          {fullCount < campaign.full_scholarship_slots ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleDecision(app.id, 'FULL')}
                              disabled={isProcessing !== null}
                            >
                              {isProcessing === app.id ? 'Approving...' : 'Approve FULL'}
                            </Button>
                          ) : availableFunds >= subsidizedPrice ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleDecision(app.id, 'SUBSIDIZED')}
                              disabled={isProcessing !== null}
                            >
                              {isProcessing === app.id ? 'Approving...' : 'Approve SUB.'}
                            </Button>
                          ) : (
                            <span className="text-xs text-red-600 font-medium block mb-1">Insufficient Funds</span>
                          )}
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleDecision(app.id, 'WAITLIST')}
                            disabled={isProcessing !== null}
                          >
                            Waitlist
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDecision(app.id, 'REJECT')}
                            disabled={isProcessing !== null}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Docs Verification Modal */}
      {viewingDocsApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button 
              onClick={() => setViewingDocsApp(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Verification Documents: {viewingDocsApp.full_name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-2 text-neutral-mid">Student ID (Front)</h3>
                {viewingDocsApp.student_id_front_url ? (
                  <img src={viewingDocsApp.student_id_front_url} alt="Student ID Front" className="w-full rounded border border-neutral-200" />
                ) : (
                  <div className="bg-neutral-100 p-8 text-center text-neutral-400 rounded">Not provided</div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2 text-neutral-mid">Student ID (Back)</h3>
                {viewingDocsApp.student_id_back_url ? (
                  <img src={viewingDocsApp.student_id_back_url} alt="Student ID Back" className="w-full rounded border border-neutral-200" />
                ) : (
                  <div className="bg-neutral-100 p-8 text-center text-neutral-400 rounded">Not provided</div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2 text-neutral-mid">National ID (Front)</h3>
                {viewingDocsApp.national_id_front_url ? (
                  <img src={viewingDocsApp.national_id_front_url} alt="National ID Front" className="w-full rounded border border-neutral-200" />
                ) : (
                  <div className="bg-neutral-100 p-8 text-center text-neutral-400 rounded">Not provided</div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2 text-neutral-mid">National ID (Back)</h3>
                {viewingDocsApp.national_id_back_url ? (
                  <img src={viewingDocsApp.national_id_back_url} alt="National ID Back" className="w-full rounded border border-neutral-200" />
                ) : (
                  <div className="bg-neutral-100 p-8 text-center text-neutral-400 rounded">Not provided</div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setViewingDocsApp(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
