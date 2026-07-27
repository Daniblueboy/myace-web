import { getFallbackData } from '@/lib/fallback-data';

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://aceroyal-api.onrender.com/api/v1'
).replace(/\/$/, '');

// Render free services can take close to a minute to wake from idle.
const FETCH_TIMEOUT = process.env.NODE_ENV === 'production' ? 75000 : 30000;
export const API_REQUEST_START_EVENT = 'aceroyal:api-request-start';
export const API_REQUEST_END_EVENT = 'aceroyal:api-request-end';

function dispatchRequestEvent(name: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(name));
  }
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  dispatchRequestEvent(API_REQUEST_START_EVENT);

  try {
    const res = await fetch(`${API_URL}${path}`, {
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
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    const apiError = error instanceof Error ? error : null;
    // Return empty data during build if API is unavailable
    if (apiError?.name === 'AbortError' || apiError?.message.includes('fetch')) {
      const method = options.method || 'GET';
      const fallbackData = getFallbackData(path, method);
      if (fallbackData !== undefined) {
        console.warn(`API fetch failed for ${path}, returning fallback data`);
        return fallbackData;
      }
      console.warn(`API fetch failed for ${path}, returning empty data`);
      return [];
    }
    throw error;
  } finally {
    dispatchRequestEvent(API_REQUEST_END_EVENT);
  }
}
