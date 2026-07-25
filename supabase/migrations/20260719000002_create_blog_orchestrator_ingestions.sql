create table if not exists public.blog_draft_ingestions (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique check (char_length(idempotency_key) between 8 and 200),
  request_hash text not null check (request_hash ~ '^[a-f0-9]{64}$'),
  keyword_id text not null check (char_length(keyword_id) between 3 and 100),
  generation_run_id text not null check (char_length(generation_run_id) between 8 and 100),
  prompt_version text not null check (char_length(prompt_version) between 1 and 50),
  model text not null check (char_length(model) between 1 and 100),
  state text not null default 'processing' check (state in ('processing', 'completed', 'failed')),
  audit_score integer not null check (audit_score between 0 and 100),
  blocker_count integer not null default 0 check (blocker_count >= 0),
  warning_count integer not null default 0 check (warning_count >= 0),
  audit_report jsonb not null default '{}'::jsonb check (jsonb_typeof(audit_report) = 'object'),
  source_snapshot jsonb not null default '[]'::jsonb check (jsonb_typeof(source_snapshot) = 'array'),
  blog_post_id uuid references public.blog_posts(id) on delete set null,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_draft_ingestions_keyword_idx
  on public.blog_draft_ingestions (keyword_id, created_at desc);

drop trigger if exists set_blog_draft_ingestions_updated_at on public.blog_draft_ingestions;
create trigger set_blog_draft_ingestions_updated_at
before update on public.blog_draft_ingestions
for each row execute function public.set_blog_post_updated_at();

alter table public.blog_draft_ingestions enable row level security;
revoke all on public.blog_draft_ingestions from anon, authenticated;

comment on table public.blog_draft_ingestions is
  'Service-role-only idempotency and audit log for automation-created blog drafts.';
