import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window === 'undefined') {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing required environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local and fill in your values.'
    );
  }
}

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
}
