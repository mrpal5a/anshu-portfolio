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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
        update(values: Record<string, unknown>): { eq(column: string, value: string): Promise<{ error: unknown }> };
      };
    };
    const { error } = await supabase.from('projects')
      .update({
        title,
        slug: finalSlug,
        description: body.description?.trim() || null,
        content: body.content?.trim() || null,
        image_url: body.image_url?.trim() || null,
        live_url: body.live_url?.trim() || null,
        tech_stack: tech_stack?.length ? tech_stack : null,
        featured: Boolean(body.featured),
      })
      .eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin projects update error:', err);
    return NextResponse.json({ error: 'Unable to update project.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient() as unknown as {
      from(table: 'projects'): {
        delete(): { eq(column: string, value: string): Promise<{ error: unknown }> };
      };
    };
    const { error } = await supabase.from('projects').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin projects delete error:', err);
    return NextResponse.json({ error: 'Unable to delete project.' }, { status: 500 });
  }
}
