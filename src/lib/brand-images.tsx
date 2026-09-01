import fs from 'node:fs';
import path from 'node:path';

// The source lockup is a 727x541 rectangle: the "A" mark on top, the
// "ACEROYAL ESTATES" wordmark underneath. For icon use we only want the
// mark, so we render the full image scaled to the target width, then clip
// the container to just the top slice (before the wordmark starts) —
// letting overflow:hidden do the crop instead of needing a raster editor.
let logoDataUri: string | null = null;
function getLogoDataUri() {
  if (!logoDataUri) {
    const filePath = path.join(process.cwd(), 'public/images/cropped-cropped-logo-jpeg.jpg');
    const base64 = fs.readFileSync(filePath).toString('base64');
    logoDataUri = `data:image/jpeg;base64,${base64}`;
  }
  return logoDataUri;
}

const SOURCE_WIDTH = 727;
const SOURCE_HEIGHT = 541;
const MARK_HEIGHT = 430; // crop above the wordmark, mark-only

export function MarkIcon({ size, background = '#ffffff' }: { size: number; background?: string }) {
  const scale = size / SOURCE_WIDTH;
  const cropHeight = MARK_HEIGHT * scale;
  const imgHeight = SOURCE_HEIGHT * scale;

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
      <div style={{ width: size, height: cropHeight, overflow: 'hidden', display: 'flex' }}>
        <img
          src={getLogoDataUri()}
          width={size}
          height={imgHeight}
          style={{ objectFit: 'cover' }}
        />
      </div>
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
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a0d0f 55%, #B5161C 100%)',
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
