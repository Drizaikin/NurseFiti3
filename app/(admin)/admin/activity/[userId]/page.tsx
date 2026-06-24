"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

type PageView = {
  id: string;
  path: string;
  created_at: string;
};

type UserProfile = {
  full_name: string;
  role: string;
};

export default function UserActivityDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [views, setViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [{ data: profileData }, { data: viewsData, error: viewsError }] = await Promise.all([
          supabase.from('profiles').select('full_name, role').eq('id', userId).maybeSingle(),
          supabase
            .from('page_views')
            .select('id, path, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(200),
        ]);

        if (profileData) setProfile(profileData);
        if (!viewsError && viewsData) setViews(viewsData);
      } catch (err) {
        console.error('Error fetching user activity:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, supabase]);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← Back to Activity
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">
          {profile?.full_name || 'Unknown User'}
        </h1>
        <p className="text-sm text-neutral-mid mt-1">
          <span className="uppercase font-semibold tracking-wide">{profile?.role}</span>
          &nbsp;&middot;&nbsp;
          {views.length} page view{views.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Page Visited</th>
                <th className="px-4 py-3 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {views.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-neutral-mid">No page views found for this user</td>
                </tr>
              ) : (
                views.map((v) => (
                  <tr key={v.id} className="hover:bg-[var(--color-bg)]/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{v.path}</td>
                    <td className="px-4 py-3 text-right text-xs text-neutral-mid whitespace-nowrap">
                      {new Date(v.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
