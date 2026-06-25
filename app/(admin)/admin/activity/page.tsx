"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

type UserActivity = {
  user_id: string;
  full_name: string;
  role: string;
  total_pages: number;
  last_seen: string;
};

export default function AdminActivityPage() {
  const [users, setUsers] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // Fetch the last 500 views to group by user meaningfully
        const { data: viewsData, error: viewsError } = await supabase
          .from('page_views')
          .select('user_id, created_at')
          .order('created_at', { ascending: false })
          .limit(500);

        if (viewsError || !viewsData) {
          console.error('Failed to fetch views:', viewsError);
          setIsLoading(false);
          return;
        }

        // Group by user_id: count total pages and find last_seen
        // Data is ordered DESC so the FIRST entry per user is already their most recent visit
        const userMap = new Map<string, { total: number; last_seen: string }>();
        for (const v of viewsData) {
          const existing = userMap.get(v.user_id);
          if (!existing) {
            // First time we see this user in the DESC list = their most recent view
            userMap.set(v.user_id, { total: 1, last_seen: v.created_at });
          } else {
            // Just increment; do NOT update last_seen (first entry was already the most recent)
            existing.total++;
          }
        }

        const userIds = Array.from(userMap.keys());
        if (userIds.length === 0) {
          setIsLoading(false);
          return;
        }

        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, role')
          .in('id', userIds)
          .neq('role', 'admin'); // exclude admins from the list

        const profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);

        const result: UserActivity[] = Array.from(userMap.entries())
          .map(([user_id, stats]) => {
            const profile = profileMap.get(user_id);
            if (!profile) return null; // skip admins (not in profileMap)
            return {
              user_id,
              full_name: profile.full_name || 'Unknown User',
              role: profile.role || 'student',
              total_pages: stats.total,
              last_seen: stats.last_seen,
            };
          })
          .filter(Boolean) as UserActivity[];

        // Sort by last_seen descending
        result.sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime());

        setUsers(result);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();

    // 1. Supabase Realtime subscription
    const channel = supabase
      .channel('admin_activity_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'page_views' },
        () => {
          fetchActivity();
        }
      )
      .subscribe();

    // 2. Window focus listener for fallback/tab switching
    const onFocus = () => fetchActivity();
    window.addEventListener('focus', onFocus);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('focus', onFocus);
    };
  }, [supabase]);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-primary">User Activity</h1>
        <span className="text-sm text-neutral-mid">{users.length} active user{users.length !== 1 ? 's' : ''} tracked</span>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Pages Visited</th>
                <th className="px-4 py-3 font-semibold text-right">Last Seen</th>
                <th className="px-4 py-3 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-mid">No user activity recorded yet</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.user_id}
                    className="hover:bg-[var(--color-bg)]/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/admin/activity/${u.user_id}`)}
                  >
                    <td className="px-4 py-3 font-medium">{u.full_name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide font-bold bg-[var(--color-border)] text-neutral-dark">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-mid">{u.total_pages} page{u.total_pages !== 1 ? 's' : ''}</td>
                    <td className="px-4 py-3 text-right text-xs text-neutral-mid whitespace-nowrap">
                      {new Date(u.last_seen).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-primary text-xs font-semibold hover:underline">View →</span>
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
