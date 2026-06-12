'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import Marquee from '@/components/ui/Marquee';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Built', isNum: true },
  { value: 100, suffix: '%', label: 'Satisfaction', isNum: true },
  { value: 2, suffix: '', label: 'Specialties', isNum: true },
  { text: 'Fast', label: 'Delivery', isNum: false },
];

const skills = [
  'Google Sheets', 'Apps Script', 'Web Design', 'Automation',
  'SEO Optimization', 'HTML / CSS', 'Next.js', 'React',
  'Supabase', 'PostgreSQL', 'Email Triggers', 'Inventory Systems',
];

export default function ProofOfPerformance() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="performance"
      className="py-20 px-6 md:px-12"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">01</span>
          <div className="section-line" />
          <span className="section-tag">Proof of performance</span>
        </div>

        <motion.div
          className="max-w-[760px]"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
            Results you can feel across websites and automation.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            These are the clear outcomes clients get when projects are built to work reliably and look premium from day one.
          </p>
        </motion.div>

        {/* Animated stat cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-[1.5rem] p-6 relative overflow-hidden group cursor-default"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, borderColor: 'var(--accent)' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.5rem]"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(184,134,11,0.06), transparent 70%)' }}
              />
              <div className="font-display text-4xl mb-3" style={{ color: 'var(--accent)' }}>
                {stat.isNum ? (
                  <CountUp to={stat.value as number} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </div>
              <div className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee skills strip */}
      <div className="mt-14">
        <Marquee items={skills} speed={35} />
      </div>
    </section>
  );
}
