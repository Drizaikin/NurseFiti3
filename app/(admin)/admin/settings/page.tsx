"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Toggle } from '@/components/ui/Toggle';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('platform_settings').select('*').eq('id', 1).maybeSingle();
    if (data) setSettings(data);
    setIsLoading(false);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          allow_tutor_custom_pricing: settings.allow_tutor_custom_pricing,
          krchn_hourly_rate: Number(settings.krchn_hourly_rate),
          bscn_hourly_rate: Number(settings.bscn_hourly_rate),
          plan_daily_price: Number(settings.plan_daily_price),
          plan_weekly_price: Number(settings.plan_weekly_price),
          plan_standard_price: Number(settings.plan_standard_price),
          plan_premium_price: Number(settings.plan_premium_price),
          hd_material_price: Number(settings.hd_material_price),
        }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      toast.success('Platform settings updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" color="primary" /></div>;
  if (!settings) return <div className="p-10 text-center">Failed to load settings</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Platform Settings</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Configure global pricing, plans, and toggles.</p>
        </div>
        <Button onClick={saveSettings} disabled={isSaving} variant="primary">
          {isSaving ? <Spinner size="sm" color="white" /> : 'Save Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tutor Pricing Rules */}
        <Card>
          <h2 className="text-lg font-heading font-bold mb-4">Tutor Pricing Rules</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]">
              <div>
                <p className="text-sm font-medium">Allow Custom Tutor Rates</p>
                <p className="text-xs text-[var(--color-text-secondary)]">If disabled, all tutors will use the standard cadre rates below.</p>
              </div>
              <Toggle checked={settings.allow_tutor_custom_pricing} onChange={v => setSettings({ ...settings, allow_tutor_custom_pricing: v })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">KRCHN Standard Rate</label>
                <input
                  type="number"
                  className="input text-sm w-full"
                  value={settings.krchn_hourly_rate}
                  onChange={e => setSettings({ ...settings, krchn_hourly_rate: e.target.value })}
                  disabled={settings.allow_tutor_custom_pricing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">BScN Standard Rate</label>
                <input
                  type="number"
                  className="input text-sm w-full"
                  value={settings.bscn_hourly_rate}
                  onChange={e => setSettings({ ...settings, bscn_hourly_rate: e.target.value })}
                  disabled={settings.allow_tutor_custom_pricing}
                />
              </div>
            </div>
            {settings.allow_tutor_custom_pricing && (
              <p className="text-xs text-warning mt-2">Custom pricing is ENABLED. These standard rates are currently being overridden by individual tutors.</p>
            )}
          </div>
        </Card>

        {/* Subscription Plan Prices */}
        <Card>
          <h2 className="text-lg font-heading font-bold mb-4">Subscription Plan Prices (KSh)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Daily Plan</label>
              <input
                type="number"
                className="input text-sm w-full"
                value={settings.plan_daily_price}
                onChange={e => setSettings({ ...settings, plan_daily_price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Weekly Plan</label>
              <input
                type="number"
                className="input text-sm w-full"
                value={settings.plan_weekly_price}
                onChange={e => setSettings({ ...settings, plan_weekly_price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Standard (Monthly) Plan</label>
              <input
                type="number"
                className="input text-sm w-full"
                value={settings.plan_standard_price}
                onChange={e => setSettings({ ...settings, plan_standard_price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Elite (90 Days) Plan</label>
              <input
                type="number"
                className="input text-sm w-full"
                value={settings.plan_premium_price}
                onChange={e => setSettings({ ...settings, plan_premium_price: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Higher Diploma Materials Price */}
        <Card>
          <h2 className="text-lg font-heading font-bold mb-2">Higher Diploma Materials (KSh)</h2>
          <p className="text-xs text-[var(--color-text-secondary)] mb-4">
            The price a Higher Diploma student pays to download each individual material uploaded by tutors.
          </p>
          <div>
            <label className="block text-sm font-semibold mb-1">Price Per Material Download</label>
            <input
              type="number"
              className="input text-sm w-full"
              value={settings.hd_material_price ?? 500}
              onChange={e => setSettings({ ...settings, hd_material_price: e.target.value })}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
