'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds, useful when revealing several sections in sequence. */
  delay?: number;
  /** Pixels to travel on entry. */
  distance?: number;
  className?: string;
}

/**
 * Fades + slides content up as it scrolls into view. Runs once per element.
 * Respects prefers-reduced-motion by rendering with no motion at all.
 */
export function Reveal({ children, delay = 0, distance = 28, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
