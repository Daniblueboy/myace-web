// The source logo is a JPEG with a solid white background, which shows as an
// ugly white box on dark surfaces (the footer, which is always dark, and the
// navbar in dark mode). aceroyal-mark-dark-mode.png is a processed variant —
// background keyed to transparent, the mark's black swoosh recolored to
// white, the red gradient left untouched — paired with real white text so it
// reads cleanly on dark backgrounds.

function DarkMark({ iconClassName }: { iconClassName: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/images/aceroyal-mark-dark-mode.png" alt="" className={iconClassName} />
      <span className="font-bold tracking-wide text-white whitespace-nowrap">ACEROYAL ESTATES</span>
    </span>
  );
}

/**
 * `theme="auto"` (default): light logo in light mode, white mark + text in dark mode.
 * `theme="dark"`: always renders the white mark + text — for surfaces that are
 * always dark regardless of the site theme toggle (e.g. the footer).
 */
export function BrandLogo({
  theme = 'auto',
  className = 'h-10',
}: {
  theme?: 'auto' | 'dark';
  className?: string;
}) {
  if (theme === 'dark') {
    return <DarkMark iconClassName={`${className} w-auto`} />;
  }

  return (
    <>
      <img
        src="/images/cropped-cropped-logo-jpeg.jpg"
        alt="Aceroyal Estates"
        className={`${className} w-auto dark:hidden`}
      />
      <span className="hidden dark:inline-flex">
        <DarkMark iconClassName={`${className} w-auto`} />
      </span>
    </>
  );
}
