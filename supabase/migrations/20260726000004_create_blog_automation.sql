-- Blog automation control plane: editable rules, keyword queue, and job queue.
-- The dashboard writes here; the local worker claims jobs and writes results back.

-- ── Rules ───────────────────────────────────────────────────────────────────
-- Immutable versions. Editing inserts a new row; the highest version is active.
-- Every job records the version it ran under.
create table if not exists public.blog_automation_rules (
  version integer generated always as identity primary key,
  word_count_min integer not null default 1400 check (word_count_min between 300 and 10000),
  word_count_max integer not null default 3000 check (word_count_max between 300 and 12000),
  takeaway_count integer not null default 5 check (takeaway_count between 3 and 10),
  faq_count integer not null default 8 check (faq_count between 3 and 20),
  min_sources_general integer not null default 3 check (min_sources_general between 1 and 20),
  min_sources_clinical integer not null default 5 check (min_sources_clinical between 1 and 20),
  meta_description_min integer not null default 130 check (meta_description_min between 50 and 200),
  meta_description_max integer not null default 160 check (meta_description_max between 60 and 200),
  tldr_min_words integer not null default 25 check (tldr_min_words between 10 and 100),
  tldr_max_words integer not null default 45 check (tldr_max_words between 15 and 150),
  audit_pass_score integer not null default 85 check (audit_pass_score between 0 and 100),
  require_tldr boolean not null default true,
  require_reviewer_for_high_risk boolean not null default true,
  allow_raw_html boolean not null default false,
  banned_claims text[] not null default array[
    'guaranteed pass', 'nck approved', 'examiner written', 'examiner-written',
    'exact digiproctor replica', '100% success'
  ],
  banned_phrases text[] not null default array[
    'delve', 'leverage', 'robust', 'tapestry', 'testament to', 'in today''s landscape'
  ],
  required_sections text[] not null default array['Key Takeaways'],
  high_risk_terms text[] not null default array[
    'nck', 'licence', 'license', 'registration', 'cpd', 'clinical', 'medicine',
    'medication', 'pharmacology', 'maternal', 'immunisation', 'immunization',
    'mental health', 'procedure', 'dosage', 'treatment'
  ],
  voice_notes text not null default 'Kenyan English, clear and evidence-led, aimed at the stated audience. Third person. Never imply NCK, MOH, or college endorsement.',
  extra_instructions text not null default '',
  writer_model text not null default 'moonshotai/kimi-k3' check (char_length(writer_model) between 3 and 100),
  temperature numeric(3,2) not null default 0.30 check (temperature between 0 and 2),
  change_note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint word_count_range check (word_count_max > word_count_min),
  constraint meta_description_range check (meta_description_max > meta_description_min),
  constraint tldr_range check (tldr_max_words > tldr_min_words)
);

comment on table public.blog_automation_rules is
  'Versioned, client-editable generation and audit rules. Highest version is active.';

insert into public.blog_automation_rules (change_note)
select 'Initial defaults migrated from code.'
where not exists (select 1 from public.blog_automation_rules);

-- ── Keyword queue ───────────────────────────────────────────────────────────
create table if not exists public.blog_keywords (
  id uuid primary key default gen_random_uuid(),
  keyword_id text not null unique check (char_length(keyword_id) between 3 and 100),
  keyword text not null check (char_length(keyword) between 3 and 100),
  title text not null check (char_length(title) between 10 and 200),
  cluster_name text not null default 'Unclustered',
  cluster_role text,
  content_audience text not null default 'nursing-student'
    check (content_audience in ('prospective-student', 'nursing-student', 'licensed-nurse')),
  search_volume integer,
  kw_difficulty integer,
  combined_score numeric,
  search_intent text,
  paa_questions text[] not null default '{}',
  competitors text[] not null default '{}',
  reviewer_name text,
  status text not null default 'queued'
    check (status in ('queued', 'generating', 'draft_created', 'published', 'skipped')),
  sheet_row integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_keywords_status_idx on public.blog_keywords (status, combined_score desc nulls last);

drop trigger if exists set_blog_keywords_updated_at on public.blog_keywords;
create trigger set_blog_keywords_updated_at
before update on public.blog_keywords
for each row execute function public.set_blog_post_updated_at();

comment on table public.blog_keywords is
  'Keyword Universe mirrored into Postgres. The dashboard queue reads and writes here; sheets stay as reports.';

-- ── Job queue ───────────────────────────────────────────────────────────────
create table if not exists public.blog_automation_jobs (
  id uuid primary key default gen_random_uuid(),
  keyword_id text not null references public.blog_keywords(keyword_id) on delete cascade,
  rules_version integer not null references public.blog_automation_rules(version),
  state text not null default 'queued'
    check (state in ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
  dry_run boolean not null default false,
  attempt integer not null default 0 check (attempt >= 0),
  requested_by uuid references public.profiles(id) on delete set null,
  -- Worker lease. A stale lease can be reclaimed instead of blocking the queue forever.
  locked_at timestamptz,
  locked_by text,
  steps jsonb not null default '[]'::jsonb check (jsonb_typeof(steps) = 'array'),
  generation_run_id text,
  audit_score integer check (audit_score is null or audit_score between 0 and 100),
  blocker_count integer,
  warning_count integer,
  audit_report jsonb,
  draft_doc_url text,
  blog_post_id uuid references public.blog_posts(id) on delete set null,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_automation_jobs_state_idx on public.blog_automation_jobs (state, created_at);
create index if not exists blog_automation_jobs_keyword_idx on public.blog_automation_jobs (keyword_id, created_at desc);
-- At most one live job per keyword, so a double click cannot double-generate.
create unique index if not exists blog_automation_jobs_one_live_per_keyword
  on public.blog_automation_jobs (keyword_id) where state in ('queued', 'running');

drop trigger if exists set_blog_automation_jobs_updated_at on public.blog_automation_jobs;
create trigger set_blog_automation_jobs_updated_at
before update on public.blog_automation_jobs
for each row execute function public.set_blog_post_updated_at();

comment on table public.blog_automation_jobs is
  'Dashboard-triggered generation queue. The local worker claims queued rows and reports progress.';

-- ── Access ──────────────────────────────────────────────────────────────────
alter table public.blog_automation_rules enable row level security;
alter table public.blog_keywords enable row level security;
alter table public.blog_automation_jobs enable row level security;

revoke all on public.blog_automation_rules from anon;
revoke all on public.blog_keywords from anon;
revoke all on public.blog_automation_jobs from anon;

grant select, insert on public.blog_automation_rules to authenticated;
grant select, insert, update on public.blog_keywords to authenticated;
grant select, insert, update on public.blog_automation_jobs to authenticated;

drop policy if exists "Admins manage automation rules" on public.blog_automation_rules;
create policy "Admins manage automation rules" on public.blog_automation_rules
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage blog keywords" on public.blog_keywords;
create policy "Admins manage blog keywords" on public.blog_keywords
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage automation jobs" on public.blog_automation_jobs;
create policy "Admins manage automation jobs" on public.blog_automation_jobs
for all using (public.is_admin()) with check (public.is_admin());
