import fs from 'node:fs';
import path from 'node:path';

// aceroyal-symbol-white.png is already the mark alone (no wordmark to crop
// away) with a real transparent background, so this just needs to composite
// it onto a solid brand color for contexts (favicon, OG image) that can't
// rely on transparency.
let markDataUri: string | null = null;
function getMarkDataUri() {
  if (!markDataUri) {
    const filePath = path.join(process.cwd(), 'public/images/aceroyal-symbol-white.png');
    const base64 = fs.readFileSync(filePath).toString('base64');
    markDataUri = `data:image/png;base64,${base64}`;
  }
  return markDataUri;
}

export function MarkIcon({ size, background = '#bb1e15' }: { size: number; background?: string }) {
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
      <img alt="" src={getMarkDataUri()} width={markSize} height={markSize} style={{ objectFit: 'contain' }} />
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
      <MarkIcon size={markSize} background="transparent" />
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
