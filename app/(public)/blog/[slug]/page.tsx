import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { formatDate, normalizeSupabaseImageUrl } from '@/lib/utils';
import { Post } from '@/types/database';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('posts').select('title,excerpt').eq('slug', params.slug).single() as { data: { title: string; excerpt: string | null } | null };
    if (!data) return { title: 'Post Not Found' };
    return { title: data.title, description: data.excerpt ?? undefined };
  } catch {
    return { title: 'Blog Post' };
  }
}

export async function generateStaticParams() {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('posts').select('slug').eq('published', true) as { data: { slug: string }[] | null };
    return (data ?? []).map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  let post = null;
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single() as { data: Post | null };
    post = data
      ? {
          ...data,
          cover_url: normalizeSupabaseImageUrl(data.cover_url),
        }
      : null;
  } catch {}

  if (!post) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[720px] mx-auto">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted
                                      hover:text-accent transition-colors mb-12 tracking-[0.1em] uppercase">
          ← Back to Blog
        </Link>

        {post.cover_url ? (
          <div className="mb-10 overflow-hidden rounded-[1.5rem] border border-border bg-bg-2 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
            <img src={post.cover_url} alt={post.title} className="h-[260px] md:h-[340px] w-full object-cover" />
          </div>
        ) : null}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map((t: string) => <span key={t} className="meta-tag">{t}</span>)}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-border">
          {post.published_at && (
            <time className="font-mono text-xs text-text-subtle">{formatDate(post.published_at)}</time>
          )}
          {post.read_time && (
            <span className="font-mono text-xs text-text-subtle">{post.read_time} min read</span>
          )}
        </div>

        {/* Content — rendered as markdown via prose */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer CTA */}
        <div className="mt-20 p-8 bg-bg-2 border border-border rounded-sm">
          <h3 className="font-display text-2xl mb-3">Need something like this?</h3>
          <p className="text-text-muted text-sm mb-6">
            I build automation systems and websites for businesses. Let&apos;s talk about your project.
          </p>
          <Link href="/#contact" className="btn-primary">Get in Touch →</Link>
        </div>
      </div>
    </div>
  );
}
