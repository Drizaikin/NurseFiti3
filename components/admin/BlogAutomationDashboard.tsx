'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import type { AutomationRules } from '@/lib/blog-automation/rules';

type Keyword = {
  keyword_id: string; keyword: string; title: string; cluster_name: string; cluster_role: string | null;
  content_audience: string; search_volume: number | null; combined_score: number | null;
  reviewer_name: string | null; status: string; notes: string | null;
};

type Job = {
  id: string; keyword_id: string; rules_version: number; state: string; dry_run: boolean; attempt: number;
  steps: Array<{ label: string; seconds: number }>; audit_score: number | null;
  blocker_count: number | null; warning_count: number | null;
  audit_report: { findings?: Array<{ severity: string; code: string; message: string }> } | null;
  draft_doc_url: string | null; blog_post_id: string | null; error_message: string | null;
  created_at: string; finished_at: string | null;
};

type RulesHistory = { version: number; changeNote: string | null; createdAt: string };

const inputClass = 'w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary/30';
const statusClass: Record<string, string> = {
  queued: 'bg-accent-light text-accent-dark',
  generating: 'bg-primary-light text-primary',
  draft_created: 'bg-success/10 text-success',
  published: 'bg-success/10 text-success',
  skipped: 'bg-[var(--color-border)] text-neutral-mid',
  running: 'bg-primary-light text-primary',
  succeeded: 'bg-success/10 text-success',
  failed: 'bg-error/10 text-error',
  cancelled: 'bg-[var(--color-border)] text-neutral-mid',
};

function Pill({ value }: { value: string }) {
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusClass[value] ?? 'bg-[var(--color-border)] text-neutral-mid'}`}>{value.replace(/_/g, ' ')}</span>;
}

function NumberField({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input type="number" className={`${inputClass} mt-1`} value={value} min={min} max={max} step={step ?? 1}
        onChange={event => onChange(Number(event.target.value))} />
    </label>
  );
}

function ListField({ label, hint, value, onChange }: { label: string; hint: string; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <textarea className={`${inputClass} mt-1 font-mono text-xs`} rows={4} value={value.join('\n')}
        onChange={event => onChange(event.target.value.split('\n').map(item => item.trim()).filter(Boolean))} />
      <span className="text-xs font-normal text-neutral-mid">{hint}</span>
    </label>
  );
}

export function BlogAutomationDashboard() {
  const [tab, setTab] = useState<'queue' | 'runs' | 'rules'>('queue');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [liveJobs, setLiveJobs] = useState<Record<string, { id: string; state: string }>>({});
  const [jobs, setJobs] = useState<Job[]>([]);
  const [rules, setRules] = useState<AutomationRules | null>(null);
  const [history, setHistory] = useState<RulesHistory[]>([]);
  const [changeNote, setChangeNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const [keywordRes, jobRes, ruleRes] = await Promise.all([
        fetch(`/api/admin/blog/automation/keywords?status=${statusFilter}`),
        fetch('/api/admin/blog/automation/jobs'),
        fetch('/api/admin/blog/automation/rules'),
      ]);
      const [keywordBody, jobBody, ruleBody] = await Promise.all([keywordRes.json(), jobRes.json(), ruleRes.json()]);
      if (!keywordRes.ok) throw new Error(keywordBody.error);
      if (!jobRes.ok) throw new Error(jobBody.error);
      if (!ruleRes.ok) throw new Error(ruleBody.error);
      setKeywords(keywordBody.keywords ?? []);
      setLiveJobs(keywordBody.liveJobs ?? {});
      setJobs(jobBody.jobs ?? []);
      setRules(ruleBody.rules);
      setHistory(ruleBody.history ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not load the automation dashboard');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  // Live refresh only while something is actually in flight.
  const hasLiveWork = Object.keys(liveJobs).length > 0;
  useEffect(() => {
    if (!hasLiveWork) return;
    const timer = setInterval(() => load(false), 8000);
    return () => clearInterval(timer);
  }, [hasLiveWork, load]);

  const enqueue = async (keywordId: string, dryRun: boolean) => {
    const response = await fetch('/api/admin/blog/automation/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywordId, dryRun }),
    });
    const body = await response.json();
    if (!response.ok) return toast.error(body.error ?? 'Could not queue the run');
    toast.success(dryRun ? `Dry run queued for ${keywordId}` : `Generation queued for ${keywordId}`);
    load(false);
  };

  const cancel = async (jobId: string) => {
    const response = await fetch(`/api/admin/blog/automation/jobs/${jobId}`, { method: 'DELETE' });
    const body = await response.json();
    if (!response.ok) return toast.error(body.error ?? 'Could not cancel');
    toast.success('Run cancelled');
    load(false);
  };

  const saveRules = async () => {
    if (!rules) return;
    if (changeNote.trim().length < 3) return toast.error('Describe what you changed before saving');
    setSaving(true);
    try {
      const { version, ...editable } = rules;
      const response = await fetch('/api/admin/blog/automation/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editable, changeNote }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not save the rules');
      toast.success(`Saved as version ${body.rules.version}. The next run will use it.`);
      setChangeNote('');
      load(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save the rules');
    } finally {
      setSaving(false);
    }
  };

  const set = <K extends keyof AutomationRules>(key: K, value: AutomationRules[K]) =>
    setRules(current => (current ? { ...current, [key]: value } : current));

  if (loading) return <div className="py-20 flex justify-center"><Spinner size="lg" color="primary" /></div>;

  const counts = keywords.reduce<Record<string, number>>((acc, keyword) => ({ ...acc, [keyword.status]: (acc[keyword.status] ?? 0) + 1 }), {});

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/blog" className="text-sm text-primary hover:underline">← Blog posts</Link>
          <h1 className="text-2xl font-heading font-bold text-primary mt-1">Blog automation</h1>
          <p className="text-sm text-neutral-mid mt-1">
            Queue a keyword, change the rules, and track every run. Drafts always land in the CMS and Drive as drafts. Publishing stays manual.
          </p>
        </div>
        <div className="text-right text-xs text-neutral-mid">
          <p>Rules version <span className="font-bold text-[var(--color-text)]">{rules?.version}</span></p>
          <p className="mt-1">Writer <span className="font-mono">{rules?.writerModel}</span></p>
        </div>
      </div>

      {!hasLiveWork && jobs.some(job => job.state === 'queued') && (
        <Card className="border-accent/40 bg-accent-light/30">
          <p className="text-sm font-semibold">Runs are queued but no worker has claimed them.</p>
          <p className="text-sm text-neutral-mid mt-1">Start the worker on the machine that has gogcli: <code className="font-mono text-xs">npm run orchestrator:worker</code></p>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {([['queue', `Queue (${keywords.length})`], ['runs', `Runs (${jobs.length})`], ['rules', 'Rules']] as const).map(([value, label]) => (
          <button key={value} onClick={() => setTab(value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${tab === value ? 'bg-primary text-white border-primary' : 'bg-[var(--color-card)] border-[var(--color-border)] text-neutral-mid hover:border-primary/40'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'queue' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <select className={`${inputClass} max-w-[200px]`} value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>
              <option value="all">All statuses</option>
              {['queued', 'generating', 'draft_created', 'published', 'skipped'].map(value => (
                <option key={value} value={value}>{value.replace(/_/g, ' ')} {counts[value] ? `(${counts[value]})` : ''}</option>
              ))}
            </select>
            <Button variant="outline" onClick={() => load()}>Refresh</Button>
          </div>

          {keywords.length === 0 ? (
            <Card className="text-center py-14">
              <p className="text-4xl mb-3">🗂️</p>
              <h2 className="font-heading font-bold text-lg">No keywords imported yet</h2>
              <p className="text-neutral-mid text-sm mt-1">Run <code className="font-mono text-xs">npm run orchestrator:import-keywords</code> to pull the Keyword Universe in.</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {keywords.map(keyword => {
                const live = liveJobs[keyword.keyword_id];
                return (
                  <Card key={keyword.keyword_id} className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-neutral-mid">{keyword.keyword_id}</span>
                        <Pill value={live?.state ?? keyword.status} />
                        <span className="text-xs text-neutral-mid">{keyword.cluster_name}</span>
                        {keyword.search_volume ? <span className="text-xs text-neutral-mid">vol {keyword.search_volume}</span> : null}
                      </div>
                      <h2 className="font-heading font-bold truncate">{keyword.title}</h2>
                      <p className="text-sm text-neutral-mid mt-0.5">{keyword.keyword} · {keyword.content_audience.replace(/-/g, ' ')}</p>
                      {keyword.notes && <p className="text-xs text-neutral-mid mt-1 italic">{keyword.notes}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {live ? (
                        live.state === 'queued'
                          ? <Button variant="outline" onClick={() => cancel(live.id)}>Cancel</Button>
                          : <span className="px-3 py-2 text-sm text-neutral-mid flex items-center gap-2"><Spinner size="sm" color="primary" /> running</span>
                      ) : (
                        <>
                          <Button variant="outline" onClick={() => enqueue(keyword.keyword_id, true)}>Dry run</Button>
                          <Button onClick={() => enqueue(keyword.keyword_id, false)}>Generate</Button>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === 'runs' && (
        <div className="space-y-2">
          {jobs.length === 0 ? (
            <Card className="text-center py-14"><p className="text-4xl mb-3">📋</p><h2 className="font-heading font-bold text-lg">No runs yet</h2></Card>
          ) : jobs.map(job => (
            <Card key={job.id} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-neutral-mid">{job.keyword_id}</span>
                    <Pill value={job.state} />
                    {job.dry_run && <span className="text-xs font-bold text-neutral-mid">DRY RUN</span>}
                    <span className="text-xs text-neutral-mid">rules v{job.rules_version}</span>
                    {job.attempt > 1 && <span className="text-xs text-neutral-mid">attempt {job.attempt}</span>}
                  </div>
                  <p className="text-sm text-neutral-mid">
                    {new Date(job.created_at).toLocaleString('en-KE')}
                    {job.audit_score !== null && <> · audit <span className="font-bold text-[var(--color-text)]">{job.audit_score}</span> · {job.blocker_count} blockers · {job.warning_count} warnings</>}
                  </p>
                  {job.steps.length > 0 && (
                    <p className="text-xs text-neutral-mid mt-1 font-mono">{job.steps.map(step => `${step.label} ${step.seconds}s`).join(' → ')}</p>
                  )}
                  {job.error_message && <p className="text-sm text-error mt-1">{job.error_message}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {job.draft_doc_url && <a href={job.draft_doc_url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:border-primary/40">Doc</a>}
                  {job.blog_post_id && <Link href={`/admin/blog/${job.blog_post_id}`} className="px-3 py-2 rounded-lg bg-primary text-white text-sm font-semibold">Edit draft</Link>}
                  {job.state === 'queued' && <Button variant="outline" onClick={() => cancel(job.id)}>Cancel</Button>}
                  {(job.audit_report?.findings?.length ?? 0) > 0 && (
                    <button className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-semibold hover:border-primary/40"
                      onClick={() => setExpanded(expanded === job.id ? null : job.id)}>
                      {expanded === job.id ? 'Hide' : 'Findings'}
                    </button>
                  )}
                </div>
              </div>
              {expanded === job.id && (
                <ul className="border-t border-[var(--color-border)] pt-2 space-y-1">
                  {job.audit_report?.findings?.map((finding, index) => (
                    <li key={index} className="text-sm">
                      <span className={`font-bold ${finding.severity === 'blocker' ? 'text-error' : 'text-accent-dark'}`}>{finding.severity}</span>
                      {' '}<span className="font-mono text-xs">{finding.code}</span> — {finding.message}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === 'rules' && rules && (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
          <div className="space-y-5">
            <Card className="space-y-4">
              <h2 className="font-heading font-bold">Length and structure</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <NumberField label="Minimum words" value={rules.wordCountMin} onChange={value => set('wordCountMin', value)} min={300} max={10000} />
                <NumberField label="Maximum words" value={rules.wordCountMax} onChange={value => set('wordCountMax', value)} min={300} max={12000} />
                <NumberField label="Key Takeaways bullets" value={rules.takeawayCount} onChange={value => set('takeawayCount', value)} min={3} max={10} />
                <NumberField label="FAQ count" value={rules.faqCount} onChange={value => set('faqCount', value)} min={3} max={20} />
                <NumberField label="TLDR minimum words" value={rules.tldrMinWords} onChange={value => set('tldrMinWords', value)} min={10} max={100} />
                <NumberField label="TLDR maximum words" value={rules.tldrMaxWords} onChange={value => set('tldrMaxWords', value)} min={15} max={150} />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={rules.requireTldr} onChange={event => set('requireTldr', event.target.checked)} /> Require a visible TLDR
              </label>
              <ListField label="Required sections" hint="One heading per line. A Key Takeaways section also enforces the bullet count." value={rules.requiredSections} onChange={value => set('requiredSections', value)} />
            </Card>

            <Card className="space-y-4">
              <h2 className="font-heading font-bold">Sourcing and safety</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <NumberField label="Minimum sources (general)" value={rules.minSourcesGeneral} onChange={value => set('minSourcesGeneral', value)} min={1} max={20} />
                <NumberField label="Minimum sources (clinical)" value={rules.minSourcesClinical} onChange={value => set('minSourcesClinical', value)} min={1} max={20} />
                <NumberField label="Meta description minimum" value={rules.metaDescriptionMin} onChange={value => set('metaDescriptionMin', value)} min={50} max={200} />
                <NumberField label="Meta description maximum" value={rules.metaDescriptionMax} onChange={value => set('metaDescriptionMax', value)} min={60} max={200} />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={rules.requireReviewerForHighRisk} onChange={event => set('requireReviewerForHighRisk', event.target.checked)} /> Require a named reviewer on clinical and regulatory topics
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={rules.allowRawHtml} onChange={event => set('allowRawHtml', event.target.checked)} /> Allow raw HTML in article Markdown
              </label>
              <ListField label="High-risk terms" hint="A keyword or title containing any of these triggers the clinical source minimum and reviewer rule." value={rules.highRiskTerms} onChange={value => set('highRiskTerms', value)} />
              <ListField label="Banned claims (blocker)" hint="A draft containing any of these fails the audit outright." value={rules.bannedClaims} onChange={value => set('bannedClaims', value)} />
              <ListField label="Discouraged phrases (warning)" hint="These cost audit points but do not block." value={rules.bannedPhrases} onChange={value => set('bannedPhrases', value)} />
            </Card>

            <Card className="space-y-4">
              <h2 className="font-heading font-bold">Voice and writer</h2>
              <label className="block text-sm font-semibold">
                Voice notes
                <textarea className={`${inputClass} mt-1`} rows={3} maxLength={2000} value={rules.voiceNotes} onChange={event => set('voiceNotes', event.target.value)} />
              </label>
              <label className="block text-sm font-semibold">
                Extra instructions
                <textarea className={`${inputClass} mt-1`} rows={5} maxLength={4000} value={rules.extraInstructions}
                  onChange={event => set('extraInstructions', event.target.value)}
                  placeholder="Anything else the writer must follow. Appended to the prompt as client instructions." />
                <span className="text-xs font-normal text-neutral-mid">Free text. The audit cannot enforce these, so keep hard limits in the fields above.</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold">
                  Writer model
                  <input className={`${inputClass} mt-1 font-mono text-sm`} value={rules.writerModel} onChange={event => set('writerModel', event.target.value)} />
                  <span className="text-xs font-normal text-neutral-mid">Any OpenRouter model id.</span>
                </label>
                <NumberField label="Temperature" value={rules.temperature} onChange={value => set('temperature', value)} min={0} max={2} step={0.05} />
              </div>
              <NumberField label="Audit pass score" value={rules.auditPassScore} onChange={value => set('auditPassScore', value)} min={0} max={100} />
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="space-y-3">
              <h2 className="font-heading font-bold">Save changes</h2>
              <p className="text-sm text-neutral-mid">Saving creates a new version. Runs already queued keep the version they were queued with.</p>
              <label className="block text-sm font-semibold">
                What changed
                <input className={`${inputClass} mt-1`} value={changeNote} maxLength={300} onChange={event => setChangeNote(event.target.value)} placeholder="Raised the word minimum to 1,800" />
              </label>
              <Button onClick={saveRules} disabled={saving} className="w-full">
                {saving ? <Spinner size="sm" color="white" /> : `Save as version ${(rules.version ?? 0) + 1}`}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => { setChangeNote(''); load(); }}>Discard edits</Button>
            </Card>
            <Card>
              <h2 className="font-heading font-bold mb-2">Version history</h2>
              <ul className="space-y-2">
                {history.map(entry => (
                  <li key={entry.version} className="text-sm border-t border-[var(--color-border)] pt-2 first:border-0 first:pt-0">
                    <span className="font-bold">v{entry.version}</span>
                    <span className="text-neutral-mid"> · {new Date(entry.createdAt).toLocaleDateString('en-KE')}</span>
                    {entry.changeNote && <p className="text-neutral-mid text-xs mt-0.5">{entry.changeNote}</p>}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
