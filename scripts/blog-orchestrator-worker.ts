import { hostname } from 'node:os';
import { createAdminClient } from '../lib/supabase/admin';
import {
  appendJobStep, claimNextJob, completeJob, fetchKeyword, fetchRulesVersion, setKeywordStatus,
} from '../lib/blog-automation/jobs';
import { orchestrateBlogDraft } from '../lib/blog-orchestrator/orchestrate';
import type { KeywordRow } from '../lib/blog-orchestrator/keywordSheet';

const POLL_SECONDS = Number(process.env.BLOG_WORKER_POLL_SECONDS || 10);
const WORKER_ID = `${hostname()}:${process.pid}`;

function stamp() {
  return new Date().toISOString().slice(11, 19);
}

async function runOneJob(admin: ReturnType<typeof createAdminClient>) {
  const job = await claimNextJob(admin, WORKER_ID);
  if (!job) return false;

  console.log(`\n[${stamp()}] claimed ${job.keywordId} (job ${job.id.slice(0, 8)}, attempt ${job.attempt}${job.dryRun ? ', dry run' : ''})`);
  try {
    const [keyword, rules] = await Promise.all([
      fetchKeyword(admin, job.keywordId),
      fetchRulesVersion(admin, job.rulesVersion),
    ]);
    await setKeywordStatus(admin, job.keywordId, 'generating');

    const keywordRow: KeywordRow = {
      rowNumber: keyword.sheet_row ?? 0,
      brief: {
        keywordId: keyword.keyword_id,
        keyword: keyword.keyword,
        title: keyword.title,
        cluster: keyword.cluster_name,
        audience: keyword.content_audience,
        cadres: [],
        reviewerName: keyword.reviewer_name,
      },
      status: keyword.status,
      cluster: keyword.cluster_name,
      clusterRole: keyword.cluster_role ?? '',
      searchVolume: '',
      searchIntent: '',
      paaQuestions: [],
      competitors: [],
    };

    const result = await orchestrateBlogDraft(keywordRow.brief, rules, {
      dryRun: job.dryRun,
      // Sheet write-back needs a real row number; a manually added keyword skips it.
      keywordRow: job.dryRun || !keyword.sheet_row ? undefined : keywordRow,
      onStep: step => appendJobStep(admin, job.id, step),
    });

    if (result.status === 'failed-audit') {
      await completeJob(admin, job.id, {
        state: 'failed',
        generationRunId: result.generationRunId,
        auditScore: result.audit.score,
        blockerCount: result.audit.blockerCount,
        warningCount: result.audit.warningCount,
        auditReport: result.audit,
        errorMessage: `Audit failed: ${result.audit.findings.filter(f => f.severity === 'blocker').map(f => f.code).join(', ') || 'score below threshold'}`,
      });
      await setKeywordStatus(admin, job.keywordId, 'queued', 'Last run failed the audit. Review the findings before retrying.');
      console.log(`[${stamp()}] ${job.keywordId} FAILED AUDIT (score ${result.audit.score}, ${result.audit.blockerCount} blockers)`);
      return true;
    }

    if (result.status === 'dry-run') {
      await completeJob(admin, job.id, {
        state: 'succeeded',
        generationRunId: result.generationRunId,
        auditScore: result.audit.score,
        blockerCount: result.audit.blockerCount,
        warningCount: result.audit.warningCount,
        auditReport: result.audit,
      });
      await setKeywordStatus(admin, job.keywordId, 'queued', `Dry run passed with score ${result.audit.score}.`);
      console.log(`[${stamp()}] ${job.keywordId} DRY RUN OK (score ${result.audit.score})`);
      return true;
    }

    await completeJob(admin, job.id, {
      state: 'succeeded',
      generationRunId: result.generationRunId,
      auditScore: result.audit.score,
      blockerCount: result.audit.blockerCount,
      warningCount: result.audit.warningCount,
      auditReport: result.audit,
      draftDocUrl: result.doc.url,
      blogPostId: result.result.postId,
    });
    await setKeywordStatus(admin, job.keywordId, 'draft_created', `Draft ready for review${result.blogId ? ` (${result.blogId})` : ''}.`);
    console.log(`[${stamp()}] ${job.keywordId} DONE → ${result.doc.url}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await completeJob(admin, job.id, { state: 'failed', errorMessage: message.slice(0, 1000) });
    await setKeywordStatus(admin, job.keywordId, 'queued', `Last run errored: ${message.slice(0, 200)}`);
    console.error(`[${stamp()}] ${job.keywordId} ERROR: ${message}`);
    return true;
  }
}

async function main() {
  const admin = createAdminClient();
  console.log(`NurseFiti blog worker ${WORKER_ID} polling every ${POLL_SECONDS}s. Ctrl+C to stop.`);
  let stopping = false;
  process.on('SIGINT', () => { stopping = true; console.log('\nFinishing the current job, then stopping.'); });

  while (!stopping) {
    let worked = false;
    try {
      worked = await runOneJob(admin);
    } catch (error) {
      console.error('worker loop error:', error instanceof Error ? error.message : error);
    }
    if (!worked && !stopping) await new Promise(resolve => setTimeout(resolve, POLL_SECONDS * 1000));
  }
  console.log('Worker stopped.');
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
