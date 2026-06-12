import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';
import { estimateReadTime, slugify } from '@/lib/utils';

type PostPayload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  tags?: string | string[];
  published?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PostPayload;
    const title = body.title?.trim();
    const content = body.content?.trim();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const finalSlug = body.slug?.trim() ? slugify(body.slug) : slugify(title);
    const tags = Array.isArray(body.tags)
      ? body.tags.map((tag: string) => tag.trim()).filter(Boolean)
      : typeof body.tags === 'string'
      ? body.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : [];

    const supabase = createAdminClient() as unknown as {
      from(table: 'posts'): {
        insert(values: Record<string, unknown>): Promise<{ error: unknown }>;
      };
    };
    const { error } = await supabase.from('posts').insert({
      title,
      slug: finalSlug,
      excerpt: body.excerpt?.trim() || null,
      content,
      cover_url: body.cover_url?.trim() || null,
      tags: tags.length ? tags : null,
      read_time: estimateReadTime(content),
      published: Boolean(body.published),
      published_at: body.published ? new Date().toISOString() : null,
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to create post.';
    console.error('Admin posts create error:', message, err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
