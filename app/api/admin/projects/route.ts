import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';

type ProjectPayload = {
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  image_url?: string;
  live_url?: string;
  tech_stack?: string | string[];
  featured?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProjectPayload;
    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json({ error: 'Project title is required.' }, { status: 400 });
    }

    const finalSlug = body.slug?.trim() ? slugify(body.slug) : slugify(title);
    const tech_stack = typeof body.tech_stack === 'string'
      ? body.tech_stack.split(',').map((item: string) => item.trim()).filter(Boolean)
      : Array.isArray(body.tech_stack)
      ? body.tech_stack.map((item: string) => item.trim()).filter(Boolean)
      : null;

    const supabase = createAdminClient() as unknown as {
      from(table: 'projects'): {
        select(column: string): {
          order(column: string, options?: { ascending?: boolean }): { limit(count: number): { maybeSingle(): Promise<{ data: { order_index?: number } | null }> } };
        };
        insert(values: Record<string, unknown>): Promise<{ error: unknown }>;
      };
    };
    const { data: lastProject } = await supabase.from('projects')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .maybeSingle();

    const order_index = lastProject?.order_index ?? 0;

    const { error } = await supabase.from('projects').insert({
      title,
      slug: finalSlug,
      description: body.description?.trim() || null,
      content: body.content?.trim() || null,
      image_url: body.image_url?.trim() || null,
      live_url: body.live_url?.trim() || null,
      tech_stack: tech_stack?.length ? tech_stack : null,
      featured: Boolean(body.featured),
      order_index: order_index + 1,
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin projects create error:', err);
    return NextResponse.json({ error: 'Unable to create project.' }, { status: 500 });
  }
}
