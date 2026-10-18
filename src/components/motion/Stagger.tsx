'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A drop-in replacement for a card row/grid container: its direct children
 * rise into place one after another (CSS in globals.css, [data-stagger]) the
 * first time the group scrolls into view.
 *
 * Server-rendered markup has no data-stagger, so content is visible without
 * JS. After hydration, a group that is already on screen is left alone (no
 * hide-then-show flash); only groups below the fold are hidden until they
 * arrive. Reduced motion is handled in CSS.
 */
export function Stagger({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string;
  children: ReactNode;
  /** Element to render, so it can replace a <ul> as well as a <div>. */
  as?: 'div' | 'ul';
}) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      node.dataset.stagger = 'done';
      return;
    }

    node.dataset.stagger = 'pending';
    let settle: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        node.dataset.stagger = 'revealing';
        // Longest delay (300ms) + transition (600ms), then drop the reveal
        // transitions so the cards' own hover effects run undelayed.
        settle = setTimeout(() => {
          node.dataset.stagger = 'done';
        }, 950);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(settle);
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
