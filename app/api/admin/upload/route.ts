import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'portfolio';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') as string) || 'general';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
    const path = `${folder}/${safeName}`;

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/octet-stream',
      });

    if (error || !data) {
      throw error || new Error('Upload failed.');
    }

    const { data: publicUrlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
    const publicUrl = publicUrlData?.publicUrl || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${encodeURIComponent(data.path)}`;

    return NextResponse.json({
      url: publicUrl,
      path: data.path,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to upload image.';
    console.error('Admin image upload error:', message, err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
