'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const SPECIALTIES = [
  'All',
  'Critical Care',
  'Oncology',
  'Renal Nursing',
  'Perioperative',
  'Psychiatric',
];

const SPECIALTY_ICONS: Record<string, string> = {
  'Critical Care':  '🏥',
  'Oncology':       '🎗️',
  'Renal Nursing':  '🩺',
  'Perioperative':  '🔬',
  'Psychiatric':    '🧠',
};

const FILE_ICONS: Record<string, string> = {
  'application/pdf': '📄',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'application/msword': '📝',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📊',
  'application/vnd.ms-powerpoint': '📊',
};

interface Material {
  id: string;
  title: string;
  description: string | null;
  specialty: string;
  file_name: string;
  file_type: string;
  file_size_bytes: number;
  status: string;
  download_count: number;
  created_at: string;
  tutor: { full_name: string | null };
  purchased?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function HdMaterialsPage() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const supabase    = createClient();

  const [userId, setUserId]       = useState<string | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [price, setPrice]         = useState<number>(500);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter]       = useState('All');
  const [paying, setPaying]       = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);


  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      // Guard: Higher Diploma students only
      const { data: sp } = await supabase
        .from('student_profiles')
        .select('cadre')
        .eq('id', user.id)
        .single() as any;

      if (sp?.cadre !== 'Higher Diploma') {
        router.push('/dashboard');
        return;
      }

      setUserId(user.id);
      await Promise.all([loadMaterials(user.id), loadPrice()]);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle payment return query params
  useEffect(() => {
    const status = searchParams.get('payment');
    if (status === 'success') {
      toast.success('Payment successful! Your material is now unlocked. Click Download to get it.');
    } else if (status === 'pending') {
      toast('Payment is being processed. Please check back shortly.', { icon: '⏳' });
    } else if (status === 'failed') {
      toast.error('Payment was not completed. Please try again.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMaterials = async (uid: string) => {
    const { data: allMaterials } = await supabase
      .from('hd_materials')
      .select('id, title, description, specialty, file_name, file_type, file_size_bytes, download_count, created_at, tutor:tutor_id(full_name)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false }) as any;

    if (!allMaterials) { setMaterials([]); return; }

    // Fetch student's purchases
    const { data: purchases } = await supabase
      .from('hd_material_purchases')
      .select('material_id')
      .eq('student_id', uid) as any;

    const purchasedIds = new Set((purchases ?? []).map((p: any) => p.material_id));

    setMaterials(allMaterials.map((m: any) => ({
      ...m,
      purchased: purchasedIds.has(m.id),
    })));
  };

  const loadPrice = async () => {
    const { data } = await supabase
      .from('platform_settings')
      .select('hd_material_price')
      .eq('id', 1)
      .single() as any;
    if (data?.hd_material_price) setPrice(Number(data.hd_material_price));
  };

  const handlePurchase = async (material: Material) => {
    if (!userId) return;
    setPaying(material.id);
    try {
      const res = await fetch('/api/intasend/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hd_material_purchase',
          amountKsh: price,
          referenceId: material.id,
          metadata: { material_title: material.title, specialty: material.specialty },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Payment initialization failed');
      window.location.href = data.checkout_url;
    } catch (err: any) {
      toast.error(err.message ?? 'Could not start payment. Please try again.');
      setPaying(null);
    }
  };

  const handleDownload = async (material: Material) => {
    setDownloading(material.id);

    // IMPORTANT: Open a blank tab synchronously — this preserves the user gesture
    // context required by browser popup policies. A window.open() called AFTER an
    // await is treated as an unsolicited popup and silently blocked.
    const newTab = window.open('', '_blank');

    try {
      const res = await fetch(`/api/hd-materials/download/${material.id}`);
      const data = await res.json();
      if (!res.ok) {
        newTab?.close();
        throw new Error(data.error ?? 'Download failed');
      }

      if (newTab) {
        // Navigate the already-open tab to the signed URL.
        // Supabase sets Content-Disposition: attachment via ?download=filename
        // so the file downloads automatically without leaving the page.
        newTab.location.href = data.signed_url;
      } else {
        // Popup was blocked — fall back to same-tab: Content-Disposition:attachment
        // means the browser downloads the file and stays on the current page.
        document.location.href = data.signed_url;
      }
    } catch (err: any) {
      newTab?.close();
      toast.error(err.message ?? 'Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const filtered = filter === 'All' ? materials : materials.filter(m => m.specialty === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #08514F 0%, #0A6865 60%, #133828 100%)' }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: 'rgba(245,166,35,0.2)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}>
            🎓 Higher Diploma Exclusive
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2">HD Study Materials</h1>
          <p className="opacity-85 max-w-lg text-sm leading-relaxed">
            Expert materials uploaded by verified NurseFiti tutors across all Higher Diploma specialties.
            Purchase individual materials and download them permanently.
          </p>
          <p className="mt-3 text-sm font-semibold" style={{ color: '#F5A623' }}>
            KSh {price.toLocaleString()} per material download
          </p>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="flex flex-wrap gap-2">
        {SPECIALTIES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              filter === s
                ? 'bg-primary text-white border-primary'
                : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-primary/40'
            }`}
          >
            {s !== 'All' && SPECIALTY_ICONS[s]} {s}
          </button>
        ))}
      </div>

      {/* Material Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📂</p>
          <p className="text-lg font-semibold text-[var(--color-text)]">No materials yet</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {filter === 'All'
              ? 'Tutors have not uploaded any materials yet. Check back soon.'
              : `No ${filter} materials available yet.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(material => (
            <Card key={material.id} className="flex flex-col justify-between gap-4 hover:shadow-card-hover transition-shadow">
              <div>
                {/* File type + specialty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{FILE_ICONS[material.file_type] ?? '📁'}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-light text-primary border border-primary/20">
                    {SPECIALTY_ICONS[material.specialty]} {material.specialty}
                  </span>
                  {material.purchased && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-success/10 text-success border border-success/20">
                      ✓ Owned
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-[var(--color-text)] text-base leading-snug mb-1">
                  {material.title}
                </h3>

                {material.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3 line-clamp-2">
                    {material.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)]">
                  <span>👨‍🏫 {material.tutor?.full_name ?? 'NurseFiti Tutor'}</span>
                  <span>📦 {formatBytes(material.file_size_bytes)}</span>
                  <span>⬇️ {material.download_count} downloads</span>
                </div>
              </div>

              {/* Action */}
              <div>
                {material.purchased ? (
                  <Button
                    id={`download-btn-${material.id}`}
                    variant="primary"
                    className="w-full"
                    onClick={() => handleDownload(material)}
                    disabled={downloading === material.id}
                  >
                    {downloading === material.id ? (
                      <><Spinner size="sm" color="white" /> Preparing…</>
                    ) : (
                      '⬇️ Download Material'
                    )}
                  </Button>
                ) : (
                  <Button
                    id={`purchase-btn-${material.id}`}
                    variant="primary"
                    className="w-full"
                    onClick={() => handlePurchase(material)}
                    disabled={paying === material.id}
                  >
                    {paying === material.id ? (
                      <><Spinner size="sm" color="white" /> Redirecting…</>
                    ) : (
                      `Purchase — KSh ${price.toLocaleString()}`
                    )}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
