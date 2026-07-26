# NurseFiti Blog Orchestrator

The orchestrator takes one approved keyword, researches it, generates a structured article, audits it, retries one revision, generates two images, publishes a Google Doc review copy into the Blog Drafts folder, creates a CMS draft, and writes the run back to both sheets. It cannot publish posts.

Day to day you drive it from **`/admin/blog/automation`**, not the CLI.

## Dashboard and worker

The dashboard is the control plane; a local worker does the work. A run takes 5-10 minutes and needs gogcli, so it cannot execute inside a serverless request.

```
/admin/blog/automation  ──enqueue──▶  blog_automation_jobs (queued)
                                              │
                        npm run orchestrator:worker  ──claims──▶ runs the pipeline
                                              │
                        job steps, audit, Doc URL, CMS draft id ──▶ dashboard
```

**Queue tab** — every keyword with its status, cluster, volume, and audience. `Generate` queues a real run; `Dry run` stops after the audit so you can check quality without spending image credits. A keyword can only have one live run at a time, enforced by a partial unique index, so a double click cannot double-generate. Queued runs can be cancelled; running ones are left to finish.

**Runs tab** — every job with its state, step timings, audit score, blocker and warning counts, expandable findings, a link to the Google Doc, and a link to the CMS draft. Failures show the error and the keyword returns to `queued`.

**Rules tab** — the client-editable ruleset. Saving creates a **new version**; it never mutates an old one. Jobs pin the active version at enqueue time, so editing rules cannot silently change what an already queued run was approved to produce. The next run you queue uses the new version.

Editable rules, all enforced by the audit rather than merely suggested to the writer:

| Group | Fields |
|---|---|
| Length and structure | word min/max, Key Takeaways bullet count, FAQ count, TLDR on/off and word range, required section headings |
| Sourcing and safety | min sources general and clinical, meta description range, reviewer requirement for high-risk topics, raw HTML allowed, high-risk terms, banned claims (blocker), discouraged phrases (warning) |
| Voice and writer | voice notes, free-text extra instructions, OpenRouter model id, temperature, audit pass score |

The banned-claim, discouraged-phrase, required-section, and high-risk term lists feed both the writer prompt and the audit, so a change tightens generation and enforcement together. The free-text extra instructions reach the prompt only — the audit cannot enforce them, so keep hard limits in the typed fields.

If runs sit in `queued`, no worker is running. Start it on the machine with gogcli:

```powershell
npm run orchestrator:worker
```

The worker leases a job for 30 minutes. If it dies mid-run, another worker reclaims the job rather than leaving the queue stuck.

## Pipeline

```
Keyword Universe row
  → DataForSEO SERP research (questions + allowed sources)
  → Kimi K3 draft via OpenRouter (JSON, allowed sources only)
  → deterministic audit → one revision if blocked → audit again
  → stop here if blockers remain or score < 85
  → kie.ai images: hero + Key Takeaways infographic
  → upload each to Supabase blog-images (public) and the Drive Blog Images folder
  → Google Doc created in Blog Drafts, images inlined, DRAFT prefix in the title
  → CMS draft via /api/automation/blog-drafts (status forced to draft)
  → Keyword Universe status → Draft Created; Published Blogs row appended
```

Images are generated only after a clean audit, so a rejected draft never spends image credits.

## Safety boundary

- The ingestion API omits publication fields and forces `status = draft`, `published_at = null`, and `featured = false`.
- The worker authenticates with a long bearer token. The website stores only its SHA-256 hash.
- Every request requires an idempotency key. The database records the request hash, audit report, source snapshot, Google Doc URL, and resulting CMS post ID.
- Drafts need an audit score of at least 85 and zero blockers.
- Clinical and regulatory topics need at least five captured sources and an approved named reviewer.
- Only URLs captured during DataForSEO research may be cited by the generated draft.
- The model never supplies an image URL. `heroImageUrl` is set from the image pipeline and validated against the CMS host allowlist.
- Docs are created with a `DRAFT <keyword-id> —` title prefix and inherit folder sharing. Nothing is shared publicly.

## Google Workspace assets

| Asset | ID |
|---|---|
| Workspace folder | `1YMqPQDYIZgHXGliap9cMJ2X5KVOU5HAt` |
| Keyword Universe | `1z6_oQ9Tca05-NVbEN-wSjPz3n51CU3I07hNDfHEKo2o` |
| Published Blogs Master Sheet | `1Qxd6VDTs4e6NQMRd7byOBbqZifWKuqNBBwwJyc2FcaI` |
| Blog Drafts folder | `1W5Vl0g4fCwrcPNYgWdjWlcSQOBWgj70n` |
| Blog Images folder | set `BLOG_DRIVE_IMAGES_FOLDER_ID` |

All Drive, Docs, and Sheets access goes through gogcli using `GOG_ACCOUNT`. That account needs write access to the workspace folder.

## Writer model

Drafting runs on OpenRouter using `moonshotai/kimi-k3` (1M context). Override with `BLOG_WRITER_MODEL`. The client asks for `response_format: json_object` and retries once without it for models that reject the parameter, then falls back to extracting the outermost JSON object from the response.

Changing the model changes `BLOG_PROMPT_VERSION` semantics: the ingest idempotency key is `<keyword-id>:<prompt-version>`, so bump the version when the writer or prompt changes materially, otherwise a re-run collides with the earlier draft.

## Setup

1. Apply `supabase/migrations/20260726120000_blog_orchestrator_backfill.sql`, then `supabase/migrations/20260726000004_create_blog_automation.sql` via `npx supabase db push` (or in the Supabase SQL editor if needed). The first creates `blog_draft_ingestions` and the `draft_doc_url` column; the second creates the rules, keyword queue, and job queue. `blog_posts` is already live.
1b. Import the Keyword Universe once: `npm run orchestrator:import-keywords`. Safe to re-run; it refreshes keyword text but never overwrites a status or reviewer set in the dashboard.
2. Authenticate gogcli: `gog auth add <GOG_ACCOUNT>`. An expired token surfaces as `invalid_grant`.
3. Create a `Blog Images` folder inside the workspace folder and set `BLOG_DRIVE_IMAGES_FOLDER_ID`.
4. Generate a random token of at least 32 bytes. Set `BLOG_AUTOMATION_TOKEN_SHA256` on the website to the lowercase SHA-256 hex digest, and the raw `BLOG_AUTOMATION_TOKEN` on the worker.
5. Configure the remaining variables documented in `.env.example`.

The `blog-images` Supabase bucket is created automatically on the first image upload.

## Run from the CLI

The dashboard is the normal path. The CLI stays for one-off briefs and debugging, and it reads the same active rules version from the database.

Dry run first. It does research, generation, and the audit, and writes nothing:

```powershell
npm run orchestrator:run -- --keyword-id NF-KW-036 --dry-run
```

Full run for one keyword:

```powershell
npm run orchestrator:run -- --keyword-id NF-KW-036
```

Take the next queueable row instead of naming one:

```powershell
npm run orchestrator:run
```

Flags:

- `--keyword-id NF-KW-036` — target one Keyword Universe row.
- `--dry-run` — stop after the audit.
- `--reviewer "Approved Name"` — only when that reviewer is genuinely approved for the topic.
- `--force-status` — generate even though the row status is not queueable.
- `--keyword "..." --title "..." --cluster "..." --audience ...` — manual brief for a one-off outside the universe. Sheet write-back is skipped.

Exit code `2` means the generated draft still had blockers after one revision and nothing was created.

## Review flow

1. Open the Doc in the Blog Drafts folder. The header block carries the slug, meta description, reviewer, and audit trail.
2. Edit in the Doc or in `/admin/blog`. The CMS draft is the source of truth for publication.
3. Publish from `/admin/blog`. Automation cannot set `status = published`.

## Known gaps

- `blog_posts` has no `keyword_id` or `generation_run_id` column, so `/admin/blog` alone cannot distinguish an automated draft from a human one. The automation dashboard links each run to its CMS draft, which covers the practical need.
- The worker only runs where gogcli and the env file live. If that machine is off, queued jobs simply wait.
- An ingestion that dies mid-run leaves `state = 'processing'`, and that idempotency key then returns 409 forever. There is no reaper.
- The audit does not yet enforce the table, People Also Read, or Last Updated rules from the Guardrails tab.
