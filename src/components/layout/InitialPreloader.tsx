'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const MINIMUM_DISPLAY_MS = 1600;
const EXIT_ANIMATION_MS = 450;

export function InitialPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Deliberately doesn't gate on document.readyState / window 'load' —
    // by the time this client component mounts and its effect runs, the
    // document has already hydrated, so those signals are frequently
    // already-fired and racy to listen for after the fact (can hang
    // forever if 'load' fired before the listener attached). A fixed
    // minimum display time is simpler and can't get stuck.
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, MINIMUM_DISPLAY_MS);

    return () => clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
    if (!isLeaving) return;
    const removeTimer = setTimeout(() => setIsVisible(false), EXIT_ANIMATION_MS);
    return () => clearTimeout(removeTimer);
  }, [isLeaving]);

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
          <span className="initial-preloader__monogram" aria-hidden="true">
            AR
          </span>
          <Image
            src="/images/cropped-cropped-logo-jpeg.jpg"
            alt="Aceroyal Estates"
            width={156}
            height={64}
            priority
            unoptimized
            onLoad={() => setIsLogoLoaded(true)}
            className={isLogoLoaded ? 'initial-preloader__image--loaded' : ''}
          />
        </div>
      </div>
    </div>
  );
}
