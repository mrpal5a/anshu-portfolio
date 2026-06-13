'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const services = [
  'Spreadsheet / Sheets Automation',
  'Professional Website',
  'Inventory / Stock System',
  'Something Else',
];

const contactLinks = [
  { Icon: Mail,          label: 'Email',     value: 'anshupal320@gmail.com',      href: 'mailto:anshupal320@gmail.com' },
  { Icon: MessageCircle, label: 'WhatsApp',  value: '+91 9664738054',             href: 'https://wa.me/919664738054' },
  { Icon: Linkedin,      label: 'LinkedIn',  value: 'linkedin.com/in/anshu--pal', href: 'https://linkedin.com/in/anshu--pal' },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', contact: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', contact: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">06</span>
          <div className="section-line" />
          <span className="section-tag">Get In Touch</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left */}
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-5" style={{ color: 'var(--text)' }}>
              Ready to build something{' '}
              <em className="not-italic" style={{ color: 'var(--accent)' }}>that works?</em>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Tell me what you need — automation, a website, or you&apos;re not sure yet.
              I&apos;ll give you a clear, honest answer within 24 hours.
            </p>

            <div className="space-y-3">
              {contactLinks.map(cl => (
                <a
                  key={cl.label}
                  href={cl.href}
                  target={cl.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: 'var(--accent-dim)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }}>
                    <cl.Icon size={18} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>{cl.label}</div>
                    <div className="text-sm transition-colors group-hover:text-[color:var(--accent)]" style={{ color: 'var(--text)' }}>{cl.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={150}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name',    label: 'Your Name',           type: 'text',  placeholder: 'Rahul Sharma' },
                { name: 'contact', label: 'Email or WhatsApp',   type: 'text',  placeholder: 'rahul@company.com' },
              ].map(f => (
                <div key={f.name}>
                  <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleChange}
                    required
                    placeholder={f.placeholder}
                    className="form-input"
                  />
                </div>
              ))}

              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                  What do you need?
                </label>
                <select name="service" value={form.service} onChange={handleChange} className="form-input appearance-none cursor-pointer">
                  <option value="" disabled>Select a service...</option>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Tell me more
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Briefly describe your situation and what you want to achieve..."
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error'   && 'Try Again →'}
                {status === 'idle'    && 'Send Message →'}
              </button>

              {status === 'error' && (
                <p className="text-xs text-center" style={{ color: '#e05050' }}>
                  Something went wrong. WhatsApp me directly instead.
                </p>
              )}
              <p className="text-xs text-center" style={{ color: 'var(--subtle)' }}>
                I respond within 24 hours. Or WhatsApp me — it is faster.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
