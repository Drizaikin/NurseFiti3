create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 10 and 120),
  excerpt text not null check (char_length(excerpt) between 40 and 320),
  content_markdown text not null check (char_length(content_markdown) >= 100),
  category text not null default 'Study Guide',
  cadres text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  hero_image_url text,
  hero_image_alt text,
  author_name text not null default 'NurseFiti Editorial Team',
  reviewer_name text,
  seo_title text,
  seo_description text,
  primary_keyword text,
  faqs jsonb not null default '[]'::jsonb check (jsonb_typeof(faqs) = 'array'),
  sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_need_date check (status <> 'published' or published_at is not null),
  constraint hero_image_needs_alt check (hero_image_url is null or nullif(trim(hero_image_alt), '') is not null)
);

create index if not exists blog_posts_publication_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category);

create or replace function public.set_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_blog_post_updated_at();

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

drop policy if exists "Published blog posts are public" on public.blog_posts;
create policy "Published blog posts are public"
on public.blog_posts for select
using (status = 'published' and published_at <= now());

drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Admins can manage blog posts"
on public.blog_posts for all
using (public.is_admin())
with check (public.is_admin());

comment on table public.blog_posts is 'Canonical CMS source for new NurseFiti blog posts.';
