import { createAdminClient } from '@/lib/supabase/admin';
import { mapRulesRow, RULES_SELECTION, type AutomationRules } from './rules';

/** A lease older than this is treated as a dead worker and may be reclaimed. */
export const JOB_LEASE_MINUTES = 30;

export type JobState = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export type ClaimedJob = {
  id: string;
  keywordId: string;
  dryRun: boolean;
  attempt: number;
  rulesVersion: number;
};

type Client = ReturnType<typeof createAdminClient>;

function table(admin: Client, name: string) {
  return (admin as any).from(name);
}

export async function fetchActiveRules(admin: Client): Promise<AutomationRules> {
  const { data, error } = await table(admin, 'blog_automation_rules')
    .select(RULES_SELECTION)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) throw new Error(`Could not load automation rules: ${error?.message ?? 'no rules row exists'}`);
  return mapRulesRow(data);
}

export async function fetchRulesVersion(admin: Client, version: number): Promise<AutomationRules> {
  const { data, error } = await table(admin, 'blog_automation_rules')
    .select(RULES_SELECTION)
    .eq('version', version)
    .maybeSingle();
  if (error || !data) throw new Error(`Rules version ${version} not found`);
  return mapRulesRow(data);
}

/**
 * Claims the oldest queued job, or reclaims one whose worker lease went stale.
 * The state check in the update is what makes two workers safe to run at once.
 */
export async function claimNextJob(admin: Client, workerId: string): Promise<ClaimedJob | null> {
  const staleBefore = new Date(Date.now() - JOB_LEASE_MINUTES * 60_000).toISOString();
  const { data: candidates } = await table(admin, 'blog_automation_jobs')
    .select('id, keyword_id, dry_run, attempt, rules_version, state, locked_at')
    .or(`state.eq.queued,and(state.eq.running,locked_at.lt.${staleBefore})`)
    .order('created_at', { ascending: true })
    .limit(5);

  for (const candidate of (candidates ?? []) as Array<{ id: string; keyword_id: string; dry_run: boolean; attempt: number; rules_version: number; state: JobState }>) {
    const { data: claimed } = await table(admin, 'blog_automation_jobs')
      .update({
        state: 'running',
        locked_at: new Date().toISOString(),
        locked_by: workerId,
        attempt: candidate.attempt + 1,
        started_at: new Date().toISOString(),
        error_message: null,
      })
      .eq('id', candidate.id)
      .eq('state', candidate.state)
      .select('id, keyword_id, dry_run, attempt, rules_version')
      .maybeSingle();
    if (claimed) {
      return {
        id: claimed.id,
        keywordId: claimed.keyword_id,
        dryRun: claimed.dry_run,
        attempt: claimed.attempt,
        rulesVersion: claimed.rules_version,
      };
    }
  }
  return null;
}

export async function appendJobStep(admin: Client, jobId: string, step: { label: string; seconds: number }) {
  const { data } = await table(admin, 'blog_automation_jobs').select('steps').eq('id', jobId).maybeSingle();
  const steps = Array.isArray(data?.steps) ? data.steps : [];
  await table(admin, 'blog_automation_jobs')
    .update({ steps: [...steps, { ...step, at: new Date().toISOString() }], locked_at: new Date().toISOString() })
    .eq('id', jobId);
}

export async function completeJob(admin: Client, jobId: string, result: {
  state: Extract<JobState, 'succeeded' | 'failed'>;
  generationRunId?: string;
  auditScore?: number;
  blockerCount?: number;
  warningCount?: number;
  auditReport?: unknown;
  draftDocUrl?: string;
  blogPostId?: string;
  errorMessage?: string;
}) {
  await table(admin, 'blog_automation_jobs').update({
    state: result.state,
    generation_run_id: result.generationRunId ?? null,
    audit_score: result.auditScore ?? null,
    blocker_count: result.blockerCount ?? null,
    warning_count: result.warningCount ?? null,
    audit_report: result.auditReport ?? null,
    draft_doc_url: result.draftDocUrl ?? null,
    blog_post_id: result.blogPostId ?? null,
    error_message: result.errorMessage ?? null,
    locked_at: null,
    finished_at: new Date().toISOString(),
  }).eq('id', jobId);
}

export async function setKeywordStatus(admin: Client, keywordId: string, status: string, notes?: string) {
  const patch: Record<string, unknown> = { status };
  if (notes !== undefined) patch.notes = notes;
  await table(admin, 'blog_keywords').update(patch).eq('keyword_id', keywordId);
}

export type KeywordRecord = {
  keyword_id: string; keyword: string; title: string; cluster_name: string; cluster_role: string | null;
  content_audience: 'prospective-student' | 'nursing-student' | 'licensed-nurse';
  reviewer_name: string | null; sheet_row: number | null; status: string;
};

export async function fetchKeyword(admin: Client, keywordId: string): Promise<KeywordRecord> {
  const { data, error } = await table(admin, 'blog_keywords')
    .select('keyword_id, keyword, title, cluster_name, cluster_role, content_audience, reviewer_name, sheet_row, status')
    .eq('keyword_id', keywordId)
    .maybeSingle();
  if (error || !data) throw new Error(`Keyword ${keywordId} is not in the queue`);
  return data as KeywordRecord;
}
