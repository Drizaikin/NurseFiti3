"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

type PageView = {
  id: string;
  path: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    role: string;
  };
};

export default function AdminActivityPage() {
  const [views, setViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const { data: viewsData, error: viewsError } = await supabase
          .from('page_views')
          .select('id, path, created_at, user_id')
          .order('created_at', { ascending: false })
          .limit(100);

        if (viewsError || !viewsData) {
          console.error('Failed to fetch views:', viewsError);
          setIsLoading(false);
          return;
        }

        const userIds = Array.from(new Set(viewsData.map(v => v.user_id)));
        
        let profileMap = new Map();
        if (userIds.length > 0) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, role')
            .in('id', userIds);
            
          profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        }

        const formattedViews = viewsData.map(v => ({
          ...v,
          profiles: profileMap.get(v.user_id) || null
        }));

        setViews(formattedViews as unknown as PageView[]);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViews();
  }, [supabase]);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-primary">User Activity (Last 100 views)</h1>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Page Visited</th>
                <th className="px-4 py-3 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {views.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-neutral-mid">No activity found</td>
                </tr>
              ) : (
                views.map((v) => (
                  <tr key={v.id} className="hover:bg-[var(--color-bg)]/50 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {v.profiles?.full_name || 'Unknown User'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide font-bold bg-[var(--color-border)] text-neutral-dark">
                        {v.profiles?.role || 'none'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-primary max-w-xs truncate" title={v.path}>
                      {v.path}
                    </td>
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
