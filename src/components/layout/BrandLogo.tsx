// The source logo is a JPEG with a solid white background, which shows as an
// ugly white box on dark surfaces (the footer, which is always dark, and the
// navbar in dark mode). aceroyal-mark-white.svg is the fully white,
// transparent-background variant used on every dark surface.

function DarkMark({ iconClassName }: { iconClassName: string }) {
  return <img src="/images/aceroyal-mark-white.svg" alt="Aceroyal Estates" className={iconClassName} />;
}

/**
 * `theme="auto"` (default): light logo in light mode, white mark in dark mode.
 * `theme="dark"`: always renders the white mark — for surfaces that are
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
