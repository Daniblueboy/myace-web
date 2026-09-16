/** Real aspect ratio (width/height) of a hosted YouTube/Vimeo video via its
 * oEmbed endpoint, so the player can size itself to match — e.g. a portrait
 * upload gets a tall player instead of being letterboxed into 16:9. Returns
 * null on any failure (unsupported host, network error, non-JSON response)
 * so callers can fall back to the standard 16:9 assumption. */
export async function getVideoAspectRatio(url: string): Promise<number | null> {
  try {
    let oembedUrl: string | null = null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    } else if (url.includes('vimeo.com')) {
      oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
    }
    if (!oembedUrl) return null;

    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.width || !data?.height) return null;
    return data.width / data.height;
  } catch {
    return null;
  }
}
