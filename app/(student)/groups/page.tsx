"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  cadre: string;
  exam_cycle: string;
  privacy: 'open' | 'invite_only';
  member_count: number;
  max_members: number;
  creator_id: string;
  isMember?: boolean;
}

export default function GroupsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [studentCadre, setStudentCadre] = useState<string>('');
  const [filterCadre, setFilterCadre] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', cadre: '', exam_cycle: 'August', privacy: 'open' as 'open' | 'invite_only' });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      const { data: sp } = await supabase.from('student_profiles').select('cadre, exam_cycle').eq('id', user.id).single();
      if (sp) {
        setStudentCadre((sp as { cadre: string; exam_cycle: string }).cadre);
        setForm(f => ({ ...f, cadre: (sp as { cadre: string; exam_cycle: string }).cadre, exam_cycle: (sp as { cadre: string; exam_cycle: string }).exam_cycle }));
      }
      await loadGroups(user.id);
      setIsLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGroups = async (uid: string) => {
    const { data: allGroups } = await supabase.from('study_groups').select('*').order('member_count', { ascending: false });
    const { data: memberships } = await supabase.from('group_members').select('group_id').eq('student_id', uid);
    const memberSet = new Set((memberships ?? []).map((m: { group_id: string }) => m.group_id));
    const enriched = (allGroups ?? []).map((g: StudyGroup) => ({ ...g, isMember: memberSet.has(g.id) }));
    setGroups(enriched.filter((g: StudyGroup) => !g.isMember));
    setMyGroups(enriched.filter((g: StudyGroup) => g.isMember));
  };

  const joinGroup = async (group: StudyGroup) => {
    if (!userId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('group_members').insert({ group_id: group.id, student_id: userId, role: 'member' });
    if (error) { toast.error('Could not join group'); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('study_groups').update({ member_count: group.member_count + 1 }).eq('id', group.id);
    toast.success(`Joined "${group.name}"!`);
    await loadGroups(userId);
  };

  const leaveGroup = async (group: StudyGroup) => {
    if (!userId) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('group_members').delete().eq('group_id', group.id).eq('student_id', userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('study_groups').update({ member_count: Math.max(0, group.member_count - 1) }).eq('id', group.id);
    toast.success(`Left "${group.name}"`);
    await loadGroups(userId);
  };

  const createGroup = async () => {
    if (!userId || !form.name.trim() || !form.cadre) return;
    setCreating(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from('study_groups').insert({
      name: form.name.trim(), description: form.description.trim() || null,
      cadre: form.cadre, exam_cycle: form.exam_cycle, privacy: form.privacy,
      creator_id: userId, max_members: 50,
    }).select().single();
    if (error || !data) { toast.error('Could not create group'); setCreating(false); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('group_members').insert({ group_id: (data as { id: string }).id, student_id: userId, role: 'admin' });
    toast.success('Group created!');
    setShowCreate(false);
    setCreating(false);
    await loadGroups(userId);
  };

  const filtered = filterCadre === 'all' ? groups : groups.filter(g => g.cadre === filterCadre);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Study Groups</h1>
          <p className="text-neutral-mid">Study together, compete together, pass together.</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreate(true)}>+ Create Group</Button>
      </div>

      {/* My groups */}
      {myGroups.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-bold mb-3">My Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myGroups.map(g => (
              <Card key={g.id} className="border-primary/30 bg-primary/5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-[var(--color-text)]">{g.name}</h3>
                  <Badge variant="teal" size="sm">{g.cadre}</Badge>
                </div>
                {g.description && <p className="text-sm text-neutral-mid mb-3">{g.description}</p>}
                <div className="flex items-center justify-between text-xs text-neutral-mid mb-3">
                  <span>👥 {g.member_count}/{g.max_members} members</span>
                  <span>{g.exam_cycle} cycle · {g.privacy === 'open' ? '🔓 Open' : '🔒 Invite only'}</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full text-error hover:bg-error/10" onClick={() => leaveGroup(g)}>Leave Group</Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Browse groups */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading font-bold">Browse Groups</h2>
          <select value={filterCadre} onChange={e => setFilterCadre(e.target.value)} className="input w-auto text-sm py-1.5">
            <option value="all">All Cadres</option>
            <option value="KRCHN">KRCHN</option>
            <option value="BScN">BScN</option>
            <option value="Higher Diploma">Higher Diploma</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-5xl mb-3">👥</p>
            <p className="text-neutral-mid">No groups found. Be the first to create one!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(g => (
              <Card key={g.id} className="hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-[var(--color-text)]">{g.name}</h3>
                  <Badge variant="teal" size="sm">{g.cadre}</Badge>
                </div>
                {g.description && <p className="text-sm text-neutral-mid mb-3 line-clamp-2">{g.description}</p>}
                <div className="flex items-center justify-between text-xs text-neutral-mid mb-4">
                  <span>👥 {g.member_count}/{g.max_members}</span>
                  <span>{g.exam_cycle} · {g.privacy === 'open' ? '🔓 Open' : '🔒 Invite only'}</span>
                </div>
                {g.privacy === 'open' ? (
                  <Button variant="primary" size="sm" className="w-full" onClick={() => joinGroup(g)} disabled={g.member_count >= g.max_members}>
                    {g.member_count >= g.max_members ? 'Full' : 'Join Group'}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>Request to Join</Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create group modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Study Group" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Group Name *</label>
            <input className="input" placeholder="e.g., KRCHN August 2026 Squad" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Description</label>
            <textarea className="input resize-none" rows={2} placeholder="What's this group about?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Cadre *</label>
              <select className="input" value={form.cadre} onChange={e => setForm(f => ({ ...f, cadre: e.target.value }))}>
                <option value="">Select</option>
                <option value="KRCHN">KRCHN</option>
                <option value="BScN">BScN</option>
                <option value="Higher Diploma">Higher Diploma</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Exam Cycle</label>
              <select className="input" value={form.exam_cycle} onChange={e => setForm(f => ({ ...f, exam_cycle: e.target.value }))}>
                <option value="May">May</option>
                <option value="August">August</option>
                <option value="November">November</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Privacy</label>
            <div className="flex gap-3">
              {(['open', 'invite_only'] as const).map(p => (
                <label key={p} className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer ${form.privacy === p ? 'border-primary bg-primary-light' : 'border-[var(--color-border)]'}`}>
                  <input type="radio" name="privacy" value={p} checked={form.privacy === p} onChange={() => setForm(f => ({ ...f, privacy: p }))} className="sr-only" />
                  <span>{p === 'open' ? '🔓 Open' : '🔒 Invite Only'}</span>
                </label>
              ))}
            </div>
          </div>
          <Button variant="primary" className="w-full" onClick={createGroup} disabled={creating || !form.name.trim() || !form.cadre}>
            {creating ? <Spinner size="sm" color="white" /> : 'Create Group'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
