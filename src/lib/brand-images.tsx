import fs from 'node:fs';
import path from 'node:path';

// Both symbol PNGs are already the mark alone (no wordmark to crop away)
// with a real transparent background. The colour version carries its own
// red/black branding, so it reads cleanly on a plain white backdrop rather
// than needing compositing onto a solid brand-color block the way the
// white-only mark did.
const markDataUris: Record<'colour' | 'white', string | null> = { colour: null, white: null };
function getMarkDataUri(variant: 'colour' | 'white' = 'colour') {
  if (!markDataUris[variant]) {
    const filePath = path.join(process.cwd(), `public/images/aceroyal-symbol-${variant}.png`);
    const base64 = fs.readFileSync(filePath).toString('base64');
    markDataUris[variant] = `data:image/png;base64,${base64}`;
  }
  return markDataUris[variant]!;
}

export function MarkIcon({
  size,
  background = '#ffffff',
  variant = 'colour',
}: {
  size: number;
  background?: string;
  variant?: 'colour' | 'white';
}) {
  const markSize = Math.round(size * 0.62);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background,
      }}
    >
      <img alt="" src={getMarkDataUri(variant)} width={markSize} height={markSize} style={{ objectFit: 'contain' }} />
    </div>
  );
}

export function ShareImage() {
  const width = 1200;
  const height = 630;
  const markSize = 240;

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #260805 55%, #bb1e15 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <MarkIcon size={markSize} background="transparent" variant="white" />
      <div
        style={{
          marginTop: 24,
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: 4,
          color: '#ffffff',
        }}
      >
        ACEROYAL ESTATES
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 28,
          color: '#f3c9cb',
          letterSpacing: 1,
        }}
      >
        Land &amp; Properties for Sale in Nigeria
      </div>
    </div>
  );
}
