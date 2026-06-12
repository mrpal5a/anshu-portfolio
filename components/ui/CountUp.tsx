'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({ to, suffix = '', prefix = '', duration = 1.8, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      setValue(Math.round(ease(progress) * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value}{suffix}
    </span>
  );
}
