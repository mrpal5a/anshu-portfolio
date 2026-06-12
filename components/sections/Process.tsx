import FadeIn from '@/components/ui/FadeIn';

const steps = [
  { num: '01', title: 'Discovery Call',    desc: 'We talk about your problem, your current process, and the outcome you need. 15–30 minutes over WhatsApp or email — no hard selling.' },
  { num: '02', title: 'Proposal & Quote',  desc: 'You get a clear scope document with timeline, deliverables, and a fixed price. No hourly surprises, no scope creep.' },
  { num: '03', title: 'Build & Review',    desc: 'I build your project and share a working version for review. Adjustments are made until it is exactly right.' },
  { num: '04', title: 'Delivery & Support', desc: 'Full handover with documentation. I explain how everything works and stay available for questions after delivery.' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">04</span>
          <div className="section-line" />
          <span className="section-tag">How It Works</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end mb-16">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
              Simple process,{' '}
              <em className="not-italic" style={{ color: 'var(--accent)' }}>zero surprises</em>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              From your first message to a working delivered product — here is exactly what to expect.
            </p>
          </FadeIn>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting line — desktop only */}
          <div className="absolute hidden lg:block top-6 left-[12.5%] right-[12.5%] h-px" style={{ background: 'var(--border)' }} />

          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 100}>
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-xs mb-6"
                  style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'var(--bg)' }}
                >
                  {s.num}
                </div>
                <h4 className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>{s.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
