'use client';

import { useEffect, useRef } from 'react';

/**
 * Counts a small whole number up from 0 the first time it scrolls into view.
 * The real value is what's server-rendered; it is only zeroed after
 * hydration while still off-screen, so there's no visible flash, and
 * numbers already on screen (or reduced-motion visitors) just stay put.
 * Updates the text node directly — no React re-render per frame.
 */
export function CountUp({ value, durationMs = 900 }: { value: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.textContent = '0';
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          // Ease-out so the count settles rather than stopping abruptly.
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = String(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = String(value);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
