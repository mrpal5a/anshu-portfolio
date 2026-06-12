import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { Database } from '@/types/database';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type ContactPayload = {
  name?: string;
  contact?: string;
  service?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, contact, service, message } = body;

    if (!name?.trim() || !contact?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    // Create admin client directly here with full typing
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    ) as unknown as {
      from(table: 'messages'): {
        insert(values: Record<string, unknown>): Promise<{ error: unknown }>;
      };
    };

    const { error: dbError } = await supabase.from('messages').insert({
      name: name.trim(),
      email: contact.trim(),
      service: service?.trim() || null,
      body: message.trim(),
    });

    if (dbError) throw dbError;

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend?.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL,
        subject: `New enquiry from ${name} — ${service || 'General'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 520px;">
            <h2 style="color: #d4a84b;">New Portfolio Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <hr style="border-color: #333;"/>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}