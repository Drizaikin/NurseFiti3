/**
 * Optional external executor. When HYPERAGENT_WEBHOOK_URL is set, queueing a job
 * also pokes the external agent; otherwise the local worker picks the job up.
 * Either way the job row is the single record of the run.
 */
export type DispatchPayload = {
  jobId: string;
  keywordId: string;
  keyword: string;
  title: string;
  cluster: string;
  audience: string;
  rulesVersion: number;
  dryRun: boolean;
};

export function isExternalExecutorConfigured() {
  return Boolean(process.env.HYPERAGENT_WEBHOOK_URL);
}

export async function dispatchToExternalExecutor(payload: DispatchPayload) {
  const url = process.env.HYPERAGENT_WEBHOOK_URL;
  if (!url) return { dispatched: false as const, reason: 'not configured' };

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (process.env.HYPERAGENT_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.HYPERAGENT_WEBHOOK_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...payload,
        // The executor posts the finished article back to these.
        ingestUrl: process.env.BLOG_AUTOMATION_INGEST_URL ?? null,
        imageUploadUrl: process.env.BLOG_AUTOMATION_IMAGE_URL ?? null,
        idempotencyKey: `${payload.keywordId}:${process.env.BLOG_PROMPT_VERSION ?? 'nursefiti-blog-v3'}`,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) {
      return { dispatched: false as const, reason: `webhook returned HTTP ${response.status}` };
    }
    return { dispatched: true as const };
  } catch (error) {
    return { dispatched: false as const, reason: error instanceof Error ? error.message : 'webhook call failed' };
  }
}
