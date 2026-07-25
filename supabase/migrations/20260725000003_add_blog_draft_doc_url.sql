-- The orchestrator now creates a Google Doc review copy before ingesting the CMS draft.
alter table public.blog_draft_ingestions
  add column if not exists draft_doc_url text
  check (draft_doc_url is null or draft_doc_url ~ '^https://docs\.google\.com/document/d/');

comment on column public.blog_draft_ingestions.draft_doc_url is
  'Google Doc review copy created in the NurseFiti Blog Drafts folder for this ingestion.';
