import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { blogInputToRow, blogPostInputSchema } from '@/lib/blog/validation';
import { POSTS as LEGACY_POSTS } from '@/lib/blogData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const { data, error } = await (auth.admin as any)
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: 'Could not load blog posts. Apply the blog CMS migration first.' }, { status: 500 });
  }
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const parsed = blogPostInputSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid post', details: parsed.error.flatten() }, { status: 400 });
  }
  if (LEGACY_POSTS.some(post => post.slug === parsed.data.slug)) {
    return NextResponse.json({ error: 'That URL belongs to an existing legacy article.' }, { status: 409 });
  }

  const { data, error } = await (auth.admin as any)
    .from('blog_posts')
    .insert(blogInputToRow(parsed.data, auth.user.id))
    .select('*')
    .single();
  if (error?.code === '23505') {
    return NextResponse.json({ error: 'That URL slug is already in use.' }, { status: 409 });
  }
  if (error) {
    console.error('[admin/blog/posts] create', error);
    return NextResponse.json({ error: 'Could not create the blog post.' }, { status: 500 });
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath('/sitemap.xml');
  return NextResponse.json({ post: data }, { status: 201 });
}
