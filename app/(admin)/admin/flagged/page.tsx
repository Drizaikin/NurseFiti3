import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Make this page dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminFlaggedQuestionsPage() {
  const supabase = createClient();

  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p>Unauthorized</p>;

  // Check if they are actually an admin
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const profile = data as { role: string } | null;

  if (profile?.role !== 'admin') return <p>Forbidden</p>;

  // Use admin client to bypass RLS so we can see all flags
  const adminClient = createAdminClient();
  const { data: flags, error } = await adminClient
    .from('flagged_questions')
    .select(`
      id,
      reason,
      details,
      status,
      flagged_at,
      questions (
        id,
        stem,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        rationale
      )
    `)
    .order('flagged_at', { ascending: false });

  if (error) {
    console.error('Error fetching flagged questions:', error);
    return <p className="text-error">Error loading flagged questions.</p>;
  }

  // Cast type manually due to Supabase join types
  const typedFlags = flags as unknown as Array<{
    id: string;
    reason: string;
    details: string | null;
    status: string;
    flagged_at: string;
    questions: {
      id: string;
      stem: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_option: string;
      rationale: string;
    } | null;
  }>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary mb-2">Flagged Questions</h1>
        <p className="text-neutral-mid">Review questions reported by students for inaccuracies or confusing rationales.</p>
      </div>

      <div className="space-y-4">
        {typedFlags?.length === 0 ? (
          <Card>
            <p className="text-neutral-mid text-center py-6">No flagged questions found. Great job!</p>
          </Card>
        ) : (
          typedFlags.map((flag) => (
            <Card key={flag.id} className="border-error/20 bg-error/5 dark:bg-error/10">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={flag.status === 'pending' ? 'error' : 'success'}>
                      {flag.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-semibold text-neutral-dark">{flag.reason}</span>
                    <span className="text-xs text-neutral-mid">{new Date(flag.flagged_at).toLocaleString()}</span>
                  </div>
                  {flag.details && (
                    <p className="text-sm text-neutral-dark dark:text-neutral-light italic mt-2">
                      &quot;{flag.details}&quot;
                    </p>
                  )}
                </div>
                {flag.questions && (
                  <div className="flex gap-2">
                    <Link href={`/admin/questions/${flag.questions.id}/edit`}>
                      <Button variant="outline" size="sm">Edit Question</Button>
                    </Link>
                    {/* Note: A proper implementation would include a client component wrapper 
                        for a "Mark Resolved" button that updates the status in the DB */}
                  </div>
                )}
              </div>

              {flag.questions ? (
                <div className="bg-white dark:bg-[var(--color-bg)] rounded-lg p-4 border border-[var(--color-border)]">
                  <p className="font-semibold text-sm mb-2">{flag.questions.stem}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                    <p className={`p-2 rounded ${flag.questions.correct_option === 'A' ? 'bg-success/20 font-bold' : 'bg-neutral-light/50'}`}>A: {flag.questions.option_a}</p>
                    <p className={`p-2 rounded ${flag.questions.correct_option === 'B' ? 'bg-success/20 font-bold' : 'bg-neutral-light/50'}`}>B: {flag.questions.option_b}</p>
                    <p className={`p-2 rounded ${flag.questions.correct_option === 'C' ? 'bg-success/20 font-bold' : 'bg-neutral-light/50'}`}>C: {flag.questions.option_c}</p>
                    <p className={`p-2 rounded ${flag.questions.correct_option === 'D' ? 'bg-success/20 font-bold' : 'bg-neutral-light/50'}`}>D: {flag.questions.option_d}</p>
                  </div>
                  <div className="text-xs bg-teal-50 dark:bg-teal-900/20 p-2 rounded border border-teal-100">
                    <span className="font-bold text-teal-800 dark:text-teal-200">Rationale: </span>
                    {flag.questions.rationale}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-mid italic">Question has been deleted.</p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
