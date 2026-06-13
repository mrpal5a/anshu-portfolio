'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  MessageSquare,
  Compass,
  PenTool,
  Code2,
  Workflow,
  Rocket,
} from 'lucide-react';

type Stage = {
  num: string;
  title: string;
  desc: string;
  icon: typeof MessageSquare;
  meta: string;
};

const stages: Stage[] = [
  {
    num: '01',
    title: 'You Reach Out',
    desc: 'A quick message on WhatsApp or email. You tell me the problem, the manual work that eats your time, or the website you wish you had.',
    icon: MessageSquare,
    meta: 'Inquiry',
  },
  {
    num: '02',
    title: 'Discovery Call',
    desc: 'We map your current process end to end. 15–30 minutes, no hard selling — just understanding exactly what outcome you need.',
    icon: Compass,
    meta: 'Understand',
  },
  {
    num: '03',
    title: 'Blueprint & Quote',
    desc: 'A clear scope document lands in your inbox: timeline, deliverables, and a fixed price. No hourly surprises, no scope creep.',
    icon: PenTool,
    meta: 'Plan',
  },
  {
    num: '04',
    title: 'Design & Build',
    desc: 'I design and develop your project, then share a working version for review. We refine it together until it is exactly right.',
    icon: Code2,
    meta: 'Build',
  },
  {
    num: '05',
    title: 'Automate & Connect',
    desc: 'Sheets talk to email, data flows on its own, and the busywork disappears. Everything is wired to run reliably without you.',
    icon: Workflow,
    meta: 'Automate',
  },
  {
    num: '06',
    title: 'Launch & Support',
    desc: 'Your project goes live with full documentation. I explain how it all works and stay available for questions after delivery.',
    icon: Rocket,
    meta: 'Deliver',
  },
];

/* ── A travelling "data packet" that glides down the spine ── */
function Packet({ delay, reduced }: { delay: number; reduced: boolean | null }) {
  if (reduced) return null;
  return (
    <motion.span
      className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
      style={{
        background: 'var(--accent-l)',
        boxShadow: '0 0 14px 3px var(--accent), 0 0 4px 1px var(--accent-l)',
      }}
      initial={{ top: '0%', opacity: 0 }}
      animate={{
        top: ['0%', '100%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3.4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.08, 0.9, 1],
      }}
      aria-hidden
    />
  );
}

export default function WorkflowFlow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  // Subtle scroll-linked 3D tilt for depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -6]);

  return (
    <section
      ref={ref}
      id="process"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 top-24 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[120px] opacity-50"
          style={{ background: 'radial-gradient(circle, var(--accent-dim), transparent 65%)' }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">04</span>
          <div className="section-line" />
          <span className="section-tag">How It Works</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16">
          <motion.h2
            className="font-display text-4xl md:text-5xl leading-tight tracking-tight"
            style={{ color: 'var(--text)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            From first message to launch —{' '}
            <em className="not-italic" style={{ color: 'var(--accent)' }}>
              one smooth flow
            </em>
          </motion.h2>
          <motion.p
            className="leading-relaxed"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Watch how a project moves from your first message to a live, working
            delivery. Every stage is mapped, so you always know exactly what
            happens next — zero surprises.
          </motion.p>
        </div>

        {/* ── The animated flow ── */}
        <div style={{ perspective: 1400 }}>
          <motion.div
            className="relative"
            style={{ rotateX: reduced ? 0 : rotateX, transformStyle: 'preserve-3d' }}
          >
            {/* Central data spine */}
            <div
              className="absolute top-2 bottom-2 left-[27px] md:left-1/2 md:-translate-x-1/2 w-px"
              style={{ background: 'var(--border)' }}
              aria-hidden
            >
              {/* Steady glow gradient on the line */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--accent) 45%, transparent) 50%, transparent)',
                }}
              />
              {/* Travelling packets */}
              <Packet delay={0} reduced={reduced} />
              <Packet delay={1.7} reduced={reduced} />
            </div>

            <ol className="relative space-y-6 md:space-y-3">
              {stages.map((s, i) => {
                const Icon = s.icon;
                const left = i % 2 === 0; // alternate sides on desktop
                return (
                  <motion.li
                    key={s.num}
                    className="relative grid grid-cols-[56px_1fr] gap-5 md:grid-cols-[1fr_56px_1fr] md:gap-0 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {/* Node on the spine */}
                    <div className="relative z-10 flex justify-start md:justify-center md:col-start-2 md:row-start-1">
                      <div className="relative w-14 h-14">
                        {/* Glow halo — animates opacity only (GPU-friendly) */}
                        {!reduced && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full"
                            style={{ boxShadow: '0 0 20px 5px var(--accent-dim)', willChange: 'opacity' }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              duration: 3.4,
                              delay: i * 0.55,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                        <div
                          className="relative w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: 'var(--bg-2)',
                            border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
                            boxShadow: '0 0 0 6px var(--bg)',
                          }}
                        >
                          <Icon size={20} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Card — left or right column on desktop, single column on mobile */}
                    <div className={left ? 'md:col-start-1 md:row-start-1 md:pr-10' : 'md:col-start-3 md:row-start-1 md:pl-10'}>
                      <FlowCard stage={s} align={left ? 'right' : 'left'} />
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
            Ready to start the flow?
          </span>
          <a href="#contact" className="btn-primary">Begin Your Project</a>
        </motion.div>
      </div>
    </section>
  );
}

function FlowCard({ stage, align }: { stage: Stage; align: 'left' | 'right' }) {
  return (
    <div
      className={`group rounded-[1.1rem] p-6 transition-all duration-300 ${
        align === 'right' ? 'md:text-right' : ''
      }`}
      style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor =
          'color-mix(in srgb, var(--accent) 45%, transparent)')
      }
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
      >
        <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
          {stage.num}
        </span>
        <span
          className="font-mono text-[0.62rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
        >
          {stage.meta}
        </span>
      </div>
      <h4 className="font-display text-xl mb-2" style={{ color: 'var(--text)' }}>
        {stage.title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {stage.desc}
      </p>
    </div>
  );
}
