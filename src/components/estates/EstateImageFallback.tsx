// Branded stand-in for an estate/property with no approved image yet (e.g.
// when its only imagery was a pricing flyer with superseded prices). Keeps
// thumbnails uniform instead of leaving a blank or "No Image" box.
export function EstateImageFallback({
  name,
  className = '',
  compact = false,
  showName = false,
}: {
  name?: string | null;
  className?: string;
  compact?: boolean;
  /** Print the name inside the tile — for large hero/gallery spots where
   * no title sits on or under the image. */
  showName?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary via-[#7d150f] to-black text-center ${className}`}
      role="img"
      aria-label={name ? `${name} — image coming soon` : 'Image coming soon'}
    >
      <img
        src="/images/aceroyal-symbol-white.png"
        alt=""
        className={`${compact ? 'h-6 w-6' : 'h-12 w-12'} object-contain opacity-90`}
      />
      {showName && !compact && name && (
        <span className="px-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">{name}</span>
      )}
    </div>
  );
}
