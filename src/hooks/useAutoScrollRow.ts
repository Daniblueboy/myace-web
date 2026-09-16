'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GAP_PX = 16; // matches the gap-4 class every horizontal-scroll row uses
const RESUME_DELAY_MS = 5000;

/**
 * Auto-advances a horizontal-scroll row (flex + overflow-x-auto + snap) one
 * card at a time, looping back to the start at the end. Pauses whenever the
 * visitor touches/scrolls/wheels the row themselves — so it never yanks the
 * position away mid-read — and resumes a few seconds after they stop.
 * Also pauses for as long as the pointer hovers the row (desktop mouse),
 * resuming immediately on mouse-out rather than after the interaction
 * delay. Also pauses off-screen and respects prefers-reduced-motion. A
 * no-op on desktop layouts where the row becomes a static grid
 * (scrollWidth === clientWidth).
 */
export function useAutoScrollRow<T extends HTMLElement>({
  enabled = true,
  itemCount,
  intervalMs = 3200,
}: {
  enabled?: boolean;
  itemCount: number;
  intervalMs?: number;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !inView || paused || hovering || itemCount <= 1 || prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (el.scrollWidth <= el.clientWidth + 4) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      const firstCard = el.firstElementChild as HTMLElement | null;
      const step = firstCard ? firstCard.getBoundingClientRect().width + GAP_PX : el.clientWidth * 0.85;
      el.scrollBy({ left: step, behavior: 'smooth' });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [enabled, inView, paused, hovering, itemCount, prefersReducedMotion, intervalMs]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const pause = () => {
    if (!enabled) return;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  };

  return {
    ref,
    handlers: enabled
      ? {
          onPointerDown: pause,
          onTouchStart: pause,
          onWheel: pause,
          onMouseEnter: () => setHovering(true),
          onMouseLeave: () => setHovering(false),
        }
      : {},
  };
}
