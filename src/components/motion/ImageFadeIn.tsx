'use client';

import { useEffect } from 'react';

const tracked = new WeakSet<HTMLImageElement>();

function track(img: HTMLImageElement, reduceMotion: boolean) {
  if (tracked.has(img)) return;
  tracked.add(img);
  // Already decoded (cached or above the fold): leave it exactly as is.
  if (reduceMotion || (img.complete && img.naturalWidth > 0)) return;

  // Web Animations only: no attributes or inline styles are written, so this
  // never conflicts with React hydrating server-rendered markup (streamed
  // Suspense content can arrive in the DOM before it hydrates).
  const hold = img.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 60_000, fill: 'forwards' });
  const reveal = () => {
    hold.cancel();
    img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' });
  };
  img.addEventListener('load', reveal, { once: true });
  // Never leave a broken image invisible — let its own fallback show.
  img.addEventListener('error', reveal, { once: true });
}

/**
 * Fades page images in as they finish loading instead of letting them pop in.
 * Watches <main> for images added later by client-rendered pages and
 * carousels. Renders nothing.
 */
export function ImageFadeIn() {
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    main.querySelectorAll('img').forEach((img) => track(img, reduceMotion));

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) track(node, reduceMotion);
          else if (node instanceof HTMLElement) node.querySelectorAll('img').forEach((img) => track(img, reduceMotion));
        });
      }
    });
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
