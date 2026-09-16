'use client';

import { useEffect, useState } from 'react';
import { getVideoAspectRatio } from '@/lib/video-aspect-ratio';

type AdaptiveVideoPlayerProps = {
  src: string;
  embedSrc?: string | null;
  title: string;
  /** Real aspect ratio (width/height) when already known server-side — e.g.
   * fetched via YouTube/Vimeo oEmbed. Native file sources detect it
   * themselves on load instead. */
  initialAspectRatio?: number | null;
  className?: string;
};

const LANDSCAPE_FALLBACK = 16 / 9;
const PORTRAIT_MAX_HEIGHT = '70vh';

/**
 * Sizes the player to the video's own orientation instead of forcing every
 * video into a fixed 16:9 box — a portrait upload (like Heritage Estate's
 * launch video) gets a tall, centered player instead of being letterboxed,
 * similar to how YouTube renders Shorts.
 */
export function AdaptiveVideoPlayer({ src, embedSrc, title, initialAspectRatio, className = '' }: AdaptiveVideoPlayerProps) {
  const [ratio, setRatio] = useState<number | null>(initialAspectRatio ?? (embedSrc ? LANDSCAPE_FALLBACK : null));

  // Pages that render this client-side (no server-fetched oEmbed data
  // passed in) fetch the real ratio themselves once mounted.
  useEffect(() => {
    if (!embedSrc || initialAspectRatio !== undefined) return;
    let cancelled = false;
    getVideoAspectRatio(src).then((r) => {
      if (!cancelled && r) setRatio(r);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, embedSrc]);

  const isPortrait = ratio !== null && ratio < 0.95;

  const containerStyle = ratio
    ? isPortrait
      ? { aspectRatio: ratio, maxHeight: PORTRAIT_MAX_HEIGHT, width: 'auto' as const }
      : { aspectRatio: ratio, width: '100%' }
    : { aspectRatio: LANDSCAPE_FALLBACK, width: '100%' };

  return (
    <div
      className={`overflow-hidden rounded-xl border ${isPortrait ? 'mx-auto' : 'w-full'} ${className}`}
      style={containerStyle}
    >
      {embedSrc ? (
        <iframe
          src={embedSrc}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="w-full h-full"
          onLoadedMetadata={(e) => {
            const el = e.currentTarget;
            if (el.videoWidth && el.videoHeight) setRatio(el.videoWidth / el.videoHeight);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
