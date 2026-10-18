'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Two scroll rules for the public site:
 *
 * 1. A new page always opens at the top. Back/forward navigation is left
 *    alone so the browser restores where the visitor was.
 * 2. Clicking a link to the page you are already on (nav, footer, bottom
 *    tab bar, logo) scrolls back to the top instead of doing nothing.
 *
 * Renders nothing; mounted once in the public layout chrome.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const isHistoryNavigation = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Layout effect so the jump happens before the new page paints.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    // Capture phase, and the click is never cancelled: Next's <Link> calls
    // preventDefault itself (so defaultPrevented can't be used to filter),
    // and cancelling here would also stop menu sheets from closing.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      const here = window.location;
      const samePage =
        url.origin === here.origin &&
        url.pathname === here.pathname &&
        url.search === here.search &&
        !url.hash;
      if (!samePage) return;

      // Same URL: nothing to navigate to, so take the visitor back to the top.
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
