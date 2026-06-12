'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export default function TiltCard({ children, className, style, intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useSpring(0, { stiffness: 300, damping: 30 });
  const rawY = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
