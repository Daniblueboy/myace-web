'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const MINIMUM_DISPLAY_MS = 900;
const EXIT_ANIMATION_MS = 450;

export function InitialPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    const pageReady =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          });

    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([pageReady, fontsReady]).then(() => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MINIMUM_DISPLAY_MS - elapsed);

      exitTimer = setTimeout(() => {
        setIsLeaving(true);
        removeTimer = setTimeout(() => setIsVisible(false), EXIT_ANIMATION_MS);
      }, remaining);
    });

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`initial-preloader ${isLeaving ? 'initial-preloader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Aceroyal Estates"
    >
      <div className="initial-preloader__glow" aria-hidden="true" />
      <div className="initial-preloader__mark">
        <div className="initial-preloader__ring" aria-hidden="true" />
        <div className="initial-preloader__logo">
          <Image
            src="/images/cropped-cropped-logo-jpeg.jpg"
            alt="Aceroyal Estates"
            width={156}
            height={64}
            priority
          />
        </div>
      </div>
      <p className="initial-preloader__label">Building lasting value</p>
    </div>
  );
}
