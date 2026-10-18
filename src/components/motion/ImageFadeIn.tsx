'use client';

import { useEffect } from 'react';

function track(img: HTMLImageElement) {
  if (img.dataset.fade) return;
  // Already decoded (cached or above the fold): leave it exactly as is.
  if (img.complete && img.naturalWidth > 0) {
    img.dataset.fade = 'done';
    return;
  }
  img.dataset.fade = 'pending';
  const reveal = () => {
    img.dataset.fade = 'done';
  };
  img.addEventListener('load', reveal, { once: true });
  // Never leave a broken image invisible — let its own fallback show.
  img.addEventListener('error', reveal, { once: true });
}

/**
 * Fades page images in as they finish loading instead of letting them pop in
 * (CSS in globals.css, img[data-fade]). Watches <main> for images added
 * later by client-rendered pages and carousels. Renders nothing.
 */
export function ImageFadeIn() {
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.querySelectorAll('img').forEach(track);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) track(node);
          else if (node instanceof HTMLElement) node.querySelectorAll('img').forEach(track);
        });
      }
    });
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
