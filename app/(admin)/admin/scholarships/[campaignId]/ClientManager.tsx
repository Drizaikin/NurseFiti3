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
  const [subCount, setSubCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [viewingDocsApp, setViewingDocsApp] = useState<any | null>(null);
  const [activeBeneficiaries, setActiveBeneficiaries] = useState<Set<string>>(new Set());
  const [showAllocators, setShowAllocators] = useState(campaign.show_allocators || false);
  const [isAddingDeposit, setIsAddingDeposit] = useState(false);
  const [newDeposit, setNewDeposit] = useState({ amount: '', name: '', title: '', org: '' });
  const [depositsList, setDepositsList] = useState<any[]>([]);

  const supabase = createClient() as any;
  const premiumPrice = PLAN_PRICING_META.premium.amountKsh;
  const subsidizedPrice = Math.round(premiumPrice * ((100 - campaign.subsidy_discount_percentage) / 100));

  const fetchData = async () => {
    try {
      // 1. Fetch deposits
      const { data: deposits } = await supabase
        .from('scholarship_deposits')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('created_at', { ascending: false });
      const deposited = deposits?.reduce((sum: number, d: any) => sum + (d.amount_kes || 0), 0) || 0;
      setTotalDeposits(deposited);
      setDepositsList(deposits || []);

      // 2. Fetch beneficiaries (allocations)
      const { data: beneficiaries } = await supabase
        .from('scholarship_beneficiaries')
        .select('student_id, allocated_amount_kes, beneficiary_type')
        .eq('campaign_id', campaign.id);
      
      const allocated = beneficiaries?.reduce((sum: number, b: any) => sum + (b.allocated_amount_kes || 0), 0) || 0;
      setTotalAllocated(allocated);
      
      const fulls = beneficiaries?.filter((b: any) => b.beneficiary_type === 'FULL').length || 0;
      setFullCount(fulls);

      const subs = beneficiaries?.filter((b: any) => b.beneficiary_type === 'SUBSIDIZED').length || 0;
      setSubCount(subs);

      const activeSet = new Set<string>();
      beneficiaries?.forEach((b: any) => activeSet.add(b.student_id));
      setActiveBeneficiaries(activeSet);

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

  const handleRevoke = async (appId: string) => {
    if (!confirm('Are you sure you want to revoke this scholarship? The student will lose premium access.')) return;
    setIsProcessing(appId);
    try {
      const res = await fetch('/api/scholarships/admin/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: appId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to revoke scholarship');
      toast.success('Scholarship revoked successfully');
      await fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleRenew = async (appId: string, decision: 'FULL' | 'SUBSIDIZED') => {
    setIsProcessing(appId);
    try {
      const res = await fetch('/api/scholarships/admin/renew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: appId, decision })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to renew scholarship');
      toast.success(`Scholarship renewed (${decision}) successfully`);
      await fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleToggleAllocators = async () => {
    const newValue = !showAllocators;
    setShowAllocators(newValue);
    try {
      const { error } = await supabase
        .from('scholarship_campaigns')
        .update({ show_allocators: newValue })
        .eq('id', campaign.id);
      if (error) throw error;
      toast.success(newValue ? 'Allocators are now visible publicly' : 'Allocators are now hidden');
    } catch (err: any) {
      toast.error('Failed to update visibility');
      setShowAllocators(!newValue);
    }
  };

  const handleAddDeposit = async () => {
    const numAmt = parseInt(newDeposit.amount);
    if (!numAmt || numAmt <= 0) return toast.error('Valid amount required');
    
    setIsProcessing('add_deposit');
    try {
      const { error } = await supabase.from('scholarship_deposits').insert([{
        campaign_id: campaign.id,
        amount_kes: numAmt,
        allocator_name: newDeposit.name || null,
        allocator_title: newDeposit.title || null,
        allocator_organization: newDeposit.org || null,
        notes: 'Manually added by admin'
      }]);
      
      if (error) throw error;
      toast.success('Allocation added successfully');
      setIsAddingDeposit(false);
      setNewDeposit({ amount: '', name: '', title: '', org: '' });
      fetchData();
    } catch (err: any) {
      toast.error('Failed to add deposit: ' + err.message);
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

      {/* Campaign Settings & Allocators */}
      <Card className="bg-[var(--color-bg)] border-[var(--color-border)] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div>
            <h3 className="font-semibold text-lg text-primary">Allocator & Sponsor Management</h3>
            <p className="text-sm text-neutral-mid">Manage manual deposits from politicians/sponsors and toggle their public visibility.</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium">Publicly Visible</span>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" checked={showAllocators} onChange={handleToggleAllocators} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-neutral-300 checked:border-primary checked:right-0 checked:bg-primary transition-all duration-200" style={{ right: showAllocators ? 0 : '1.5rem', border: showAllocators ? '4px solid var(--color-primary)' : '4px solid #d1d5db', background: showAllocators ? 'var(--color-primary)' : 'white' }} />
                <div className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${showAllocators ? 'bg-primary/20' : 'bg-neutral-200'}`}></div>
              </div>
            </label>
            <Button onClick={() => setIsAddingDeposit(true)}>+ Add Allocation</Button>
          </div>
        </div>

        {depositsList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-4 py-2 font-semibold">Date</th>
                  <th className="px-4 py-2 font-semibold">Allocator Name</th>
                  <th className="px-4 py-2 font-semibold">Title/Org</th>
                  <th className="px-4 py-2 font-semibold text-right">Amount (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {depositsList.map(dep => (
                  <tr key={dep.id} className="hover:bg-[var(--color-bg-alt)]/50">
                    <td className="px-4 py-2 text-neutral-mid">{new Date(dep.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 font-medium">{dep.allocator_name || <span className="text-neutral-400 italic">Unknown</span>}</td>
                    <td className="px-4 py-2 text-neutral-mid">
                      {dep.allocator_title}{dep.allocator_title && dep.allocator_organization ? ', ' : ''}{dep.allocator_organization}
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-teal-600">{dep.amount_kes.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Ledger Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
        <Card className="bg-indigo-600 text-white border-none">
          <p className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">Subsidized Scholarships</p>
          <p className="text-3xl font-bold mt-2">{subCount} / {campaign.subsidized_scholarship_slots}</p>
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
                          ) : subCount < campaign.subsidized_scholarship_slots && availableFunds >= subsidizedPrice ? (
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
                      {app.status === 'approved' && (
                        <>
                          {activeBeneficiaries.has(app.student_id) ? (
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => handleRevoke(app.id)}
                              disabled={isProcessing !== null}
                            >
                              {isProcessing === app.id ? 'Revoking...' : 'Revoke'}
                            </Button>
                          ) : (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleRenew(app.id, 'FULL')}
                                disabled={isProcessing !== null}
                              >
                                {isProcessing === app.id ? 'Renewing...' : 'Renew FULL'}
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleRenew(app.id, 'SUBSIDIZED')}
                                disabled={isProcessing !== null}
                              >
                                {isProcessing === app.id ? 'Renewing...' : 'Renew SUB.'}
                              </Button>
                            </>
                          )}
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

      {/* Add Deposit Modal */}
      {isAddingDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsAddingDeposit(false)} className="absolute top-4 right-4 text-neutral-500">✕</button>
            <h2 className="text-xl font-bold mb-4">Record New Allocation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Amount (KES) *</label>
                <input type="number" value={newDeposit.amount} onChange={e => setNewDeposit({...newDeposit, amount: e.target.value})} className="w-full border rounded-md p-2" placeholder="e.g. 50000" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Sponsor / Allocator Name</label>
                <input type="text" value={newDeposit.name} onChange={e => setNewDeposit({...newDeposit, name: e.target.value})} className="w-full border rounded-md p-2" placeholder="e.g. Hon. Lati Lelelit" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Title / Position</label>
                <input type="text" value={newDeposit.title} onChange={e => setNewDeposit({...newDeposit, title: e.target.value})} className="w-full border rounded-md p-2" placeholder="e.g. Governor" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Organization</label>
                <input type="text" value={newDeposit.org} onChange={e => setNewDeposit({...newDeposit, org: e.target.value})} className="w-full border rounded-md p-2" placeholder="e.g. Samburu County Government" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsAddingDeposit(false)}>Cancel</Button>
                <Button onClick={handleAddDeposit} disabled={isProcessing === 'add_deposit'}>Save Allocation</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
