"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { PLAN_PRICING_META } from '@/lib/planLimits';

export default function SponsorCheckout({ campaign }: { campaign: any }) {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const premiumPrice = PLAN_PRICING_META.premium.amountKsh; // e.g. 3500
  const subsidyPercent = campaign.subsidy_discount_percentage || 25;
  const subsidizedPrice = Math.round(premiumPrice * ((100 - subsidyPercent) / 100)); // e.g. 2625

  const numAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  
  // Calculate impact dynamically based on user rules
  let fullStudents = 0;
  let remainingAmount = 0;
  let subsidizedStudents = 0;

  if (numAmount > 0) {
    fullStudents = Math.floor(numAmount / premiumPrice);
    remainingAmount = numAmount % premiumPrice;
    subsidizedStudents = Math.floor(remainingAmount / subsidizedPrice);
  }

  const handleCheckout = async () => {
    if (numAmount < 100) {
      toast.error('Minimum sponsorship amount is KES 100');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/intasend/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'sponsor_deposit',
          amountKsh: numAmount,
          referenceId: campaign.id
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialize payment');
      
      // Redirect to IntaSend checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Payment initialization failed');
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <h3 className="text-xl font-heading font-bold text-primary mb-4">Fund this Campaign</h3>
      <p className="text-sm text-neutral-mid mb-6">
        Enter the amount you wish to sponsor. Your contribution directly funds nursing students' premium exam preparation.
      </p>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-primary block mb-2">Sponsorship Amount (KES)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-mid font-bold">KES</span>
            <input 
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 100000"
              className="w-full pl-14 pr-4 py-3 text-lg font-bold rounded-xl border border-[var(--color-border)] focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Impact Calculator */}
        {numAmount > 0 && (
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3">Estimated Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm text-teal-900">
                <span>Full Premium Scholarships ({premiumPrice})</span>
                <span className="font-bold">{fullStudents} students</span>
              </div>
              <div className="flex justify-between items-center text-sm text-teal-900">
                <span>Subsidized Premium Scholarships ({subsidizedPrice})</span>
                <span className="font-bold">{subsidizedStudents} students</span>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleCheckout} 
          disabled={isLoading || numAmount < 100}
          className="w-full text-base py-3 font-semibold shadow-md"
        >
          {isLoading ? <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> Redirecting...</span> : 'Proceed to Payment'}
        </Button>
      </div>
    </Card>
  );
}
