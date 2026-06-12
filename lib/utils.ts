import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // 200 wpm
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}

export function normalizeSupabaseImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  // Already a full public URL.
  if (/^https?:\/\//i.test(value)) return value;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'portfolio';

  if (!supabaseUrl) return value;

  return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${value.replace(/^\/+/, '')}`;
}
