import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { blogInputToRow, blogPostInputSchema } from '@/lib/blog/validation';
import { POSTS as LEGACY_POSTS } from '@/lib/blogData';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const { data, error } = await (auth.admin as any)
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'Could not load the post.' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const parsed = blogPostInputSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid post', details: parsed.error.flatten() }, { status: 400 });
  }

  const { data: existing } = await (auth.admin as any)
    .from('blog_posts')
    .select('slug, status, published_at, updated_at')
    .eq('id', params.id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  if (existing.published_at && existing.slug !== parsed.data.slug) {
    return NextResponse.json({ error: 'A published URL slug cannot be changed. Archive it and create a redirect first.' }, { status: 409 });
  }
  if (existing.slug !== parsed.data.slug && LEGACY_POSTS.some(post => post.slug === parsed.data.slug)) {
    return NextResponse.json({ error: 'That URL belongs to an existing legacy article.' }, { status: 409 });
  }

  const row = blogInputToRow(parsed.data, auth.user.id);
  delete (row as { created_by?: string }).created_by;
  let updateQuery = (auth.admin as any)
    .from('blog_posts')
    .update(row)
    .eq('id', params.id);
  if (parsed.data.expectedUpdatedAt) updateQuery = updateQuery.eq('updated_at', parsed.data.expectedUpdatedAt);
  const { data, error } = await updateQuery.select('*').maybeSingle();
  if (error?.code === '23505') {
    return NextResponse.json({ error: 'That URL slug is already in use.' }, { status: 409 });
  }
  if (error) {
    console.error('[admin/blog/posts] update', error);
    return NextResponse.json({ error: 'Could not update the blog post.' }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'This post changed in another session. Reload before saving again.' }, { status: 409 });
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath('/sitemap.xml');
  return NextResponse.json({ post: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const { data: existing } = await (auth.admin as any)
    .from('blog_posts')
    .select('slug')
    .eq('id', params.id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  const { error } = await (auth.admin as any).from('blog_posts').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: 'Could not delete the blog post.' }, { status: 500 });
  revalidatePath('/blog');
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath('/sitemap.xml');
  return NextResponse.json({ success: true });
}
