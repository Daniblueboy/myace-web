const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Shorter timeout for build-time fetches to prevent Vercel timeouts
const FETCH_TIMEOUT = process.env.NODE_ENV === 'production' ? 10000 : 30000;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Don't cache during build to get fresh data
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }

    return res.json();
  } catch (error: any) {
    clearTimeout(timeoutId);

    // Return empty data during build if API is unavailable
    if (error.name === 'AbortError' || error.message?.includes('fetch')) {
      console.warn(`API fetch failed for ${endpoint}, returning empty data`);
      return [];
    }
    throw error;
  }
}
