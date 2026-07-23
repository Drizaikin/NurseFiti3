"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data?type=activity');
      const data = await res.json();
      if (data.error) {
        console.error('Activity fetch error:', data.error);
      } else {
        setUsers(data.users ?? []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();

    // Poll every 30s for near-real-time updates
    const interval = setInterval(fetchActivity, 30_000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchActivity]);

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
