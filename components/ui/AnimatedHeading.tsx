'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
}

export default function AnimatedHeading({ children, className, style, delay = 0, tag: Tag = 'h2' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' });

  const words = children.split(' ');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: delay / 1000 + i * 0.07,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
