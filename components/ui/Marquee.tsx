'use client';

import { motion } from 'framer-motion';

interface Props {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ items, speed = 40, reverse = false }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <motion.div
        className="flex gap-0 whitespace-nowrap py-4"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-8 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--muted)' }}
          >
            {item}
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
