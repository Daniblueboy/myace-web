import { getFallbackData } from '@/lib/fallback-data';

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://aceroyal-api.onrender.com/api/v1'
).replace(/\/$/, '');
export const API_ENABLED = process.env.NEXT_PUBLIC_API_ENABLED === 'true';

// Public pages fall back quickly instead of holding visible sections on a cold API.
const FETCH_TIMEOUT = process.env.NODE_ENV === 'production' ? 8000 : 5000;
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
  const method = (options.method || 'GET').toUpperCase();
  const fallbackData = getFallbackData(path, method);

  if (!API_ENABLED) {
    if (method === 'GET') {
      return fallbackData ?? [];
    }

    throw new Error(
      'Online submissions are temporarily unavailable. Please contact Aceroyal Estates directly.'
    );
  }

  const cacheOptions =
    method === 'GET'
      ? { next: { revalidate: 300 } }
      : { cache: 'no-store' as RequestCache };
  dispatchRequestEvent(API_REQUEST_START_EVENT);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...cacheOptions,
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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
