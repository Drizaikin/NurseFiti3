'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Mnemonic {
  id: string;
  title: string;
  acronym: string;
  description: string;
  created_at: string;
}

export default function StudentMnemonicsPage() {
  const supabase = createClient();
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planTier, setPlanTier] = useState<string>('free');
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('student_profiles')
        .select('plan_tier, plan_expires_at')
        .eq('id', user.id)
        .single();

      const tier = effectiveTier(profile?.plan_tier, profile?.plan_expires_at);
      setPlanTier(tier);

      if (tier === 'free') {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('mnemonics')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast.error('Failed to load mnemonics');
        setIsLoading(false);
        return;
      }

      setMnemonics(data || []);
      setIsLoading(false);
    };

    init();
  }, [router, supabase]);

  const handleDownload = () => {
    if (planTier === 'free') return;
    
    let downloadable = mnemonics;
    if (planTier === 'weekly') {
      downloadable = mnemonics.slice(0, 7); 
      if (mnemonics.length > 7) {
        toast('Weekly plan limit: Downloading the 7 most recent mnemonics.', { icon: 'ℹ️' });
      }
    }

    if (downloadable.length === 0) {
      toast.error('No mnemonics available to download.');
      return;
    }

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>NurseFiti - Mnemonic Archive</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
        h1 { color: #08514F; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .mnemonic { margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
        .title { font-size: 20px; font-weight: bold; color: #0A6865; margin-bottom: 5px; }
        .acronym { font-size: 16px; font-weight: bold; color: #F5A623; margin-bottom: 15px; }
        .description { font-size: 14px; white-space: pre-wrap; }
        .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <h1>NurseFiti Mnemonic Archive</h1>
      ${downloadable.map(m => `
        <div class="mnemonic">
          <div class="title">${m.title}</div>
          <div class="acronym">${m.acronym}</div>
          <div class="description">${m.description}</div>
        </div>
      `).join('')}
      <div class="footer">Downloaded from NurseFiti.com • Keep Learning!</div>
    </body>
    </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nursefiti-mnemonics-archive.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success('Download started. Open the file in any browser to view or print.');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (planTier === 'free') {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner border border-teal-200"
          >
            🔒
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Unlock Mnemonic Archive</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            The full Mnemonic Archive is exclusively available to premium students. Upgrade your plan to access and download hundreds of high-yield nursing mnemonics to boost your memory for the NCK exam.
          </p>
          <Link href="/settings">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95">
              Upgrade to Premium
            </button>
          </Link>
          <div className="mt-8">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Mnemonic Archive</h1>
          <p className="text-gray-500 mt-2 text-sm max-w-xl">
            Access and download all high-yield mnemonics. Weekly plans can download their recent 7 mnemonics. Monthly and 90-day plans can download everything!
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-500/30 active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mnemonics.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={m.id} 
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading group-hover:text-emerald-700 transition-colors">{m.title}</h3>
            <div className="text-amber-600 font-mono font-semibold text-sm mb-4 pb-4 border-b border-gray-100">
              {m.acronym}
            </div>
            <div className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
              {m.description}
            </div>
          </motion.div>
        ))}
        {mnemonics.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No mnemonics available in the archive yet.
          </div>
        )}
      </div>
    </div>
  );
}
