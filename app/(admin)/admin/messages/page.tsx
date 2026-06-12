import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { formatDate } from '@/lib/utils';
import type { Message } from '@/types/database';

export const revalidate = 0; // always fresh

export default async function AdminMessagesPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

const { data: messages } = await supabase
  .from('messages')
  .select('*')
  .order('created_at', { ascending: false }) as { data: Message[] | null };

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/admin" className="font-mono text-xs text-text-muted hover:text-accent mb-2 block">← Dashboard</Link>
          <h1 className="font-display text-3xl">Messages</h1>
          <p className="text-text-muted text-sm mt-1">{messages?.length ?? 0} total enquiries</p>
        </div>
      </div>

      {(!messages || messages.length === 0) ? (
        <div className="text-center py-20 border border-dashed border-border rounded-sm">
          <p className="text-text-muted">No messages yet. Share your portfolio!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`bg-bg-2 border rounded-sm p-6 ${!msg.read ? 'border-accent/40' : 'border-border'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                    <h3 className="font-medium text-text">{msg.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href={`mailto:${msg.email}`} className="font-mono text-xs text-accent hover:underline">
                      {msg.email}
                    </a>
                    {msg.service && <span className="meta-tag">{msg.service}</span>}
                  </div>
                </div>
                <time className="font-mono text-xs text-text-subtle flex-shrink-0">
                  {formatDate(msg.created_at)}
                </time>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{msg.body}</p>
              <div className="flex gap-3 mt-4">
                <a href={`mailto:${msg.email}?subject=Re: Your enquiry`} className="btn-primary !py-1.5 !px-4 text-xs">
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
