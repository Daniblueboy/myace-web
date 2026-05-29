'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsNavigating(false);
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');

      if (!anchor || anchor.target || anchor.hasAttribute('download')) {
        return;
      }

      const href = anchor.getAttribute('href');

      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      const nextUrl = new URL(href, window.location.href);

      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      const currentLocation = window.location.pathname + window.location.search;
      const nextLocation = nextUrl.pathname + nextUrl.search;

      if (nextLocation === currentLocation) {
        return;
      }

      setIsNavigating(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
      }, 8000);
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden={!isNavigating}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden transition-opacity duration-150 ${
        isNavigating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full w-full origin-left animate-navigation-progress bg-primary shadow-[0_0_14px_rgba(224,28,36,0.5)]" />
      <span className="sr-only">{isNavigating ? 'Loading page' : ''}</span>
    </div>
  );
}
