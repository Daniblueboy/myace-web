import type { Property } from '@/shared';

// Client-side search over the full listing set. The catalogue is small (a
// few dozen offerings), so filtering in the browser gives instant results
// with no Apply step and no round trip per keystroke.

export type SearchState = {
  q: string;
  type: string; // '' = any, else LAND | APARTMENT | HOUSE
  state: string; // '' = any
  estate: string; // '' = any, else estate slug
  budget: string; // '' = any, else a BUDGETS key
  beds: string; // '' = any, '1'..'3', or '4' meaning 4+
  sort: SortKey;
};

export type SortKey = 'recommended' | 'price_asc' | 'price_desc';

export const EMPTY_SEARCH: SearchState = {
  q: '',
  type: '',
  state: '',
  estate: '',
  budget: '',
  beds: '',
  sort: 'recommended',
};

export const BUDGETS = [
  { value: 'under-10m', label: 'Under ₦10M', min: 0, max: 10_000_000 },
  { value: '10m-80m', label: '₦10M – ₦80M', min: 10_000_000, max: 80_000_000 },
  { value: '80m-150m', label: '₦80M – ₦150M', min: 80_000_000, max: 150_000_000 },
  { value: 'over-150m', label: '₦150M and above', min: 150_000_000, max: Infinity },
] as const;

export const BEDROOMS = [
  { value: '1', label: '1 bed' },
  { value: '2', label: '2 bed' },
  { value: '3', label: '3 bed' },
  { value: '4', label: '4+ bed' },
] as const;

export const SORTS: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
];

/** Outright prices across a listing's options (falls back to its own price). */
export function optionPrices(property: Property): number[] {
  const prices = (property.variants || [])
    .filter((v) => !v.paymentType || v.paymentType === 'OUTRIGHT')
    .map((v) => Number(v.price))
    .filter((p) => Number.isFinite(p) && p > 0);
  return prices.length > 0 ? prices : [Number(property.price)];
}

export function startingPrice(property: Property): number {
  return Math.min(...optionPrices(property));
}

function bedroomCounts(property: Property): number[] {
  const counts = (property.variants || []).map((v) => Number(v.bedrooms)).filter((n) => n > 0);
  if (property.bedrooms) counts.push(Number(property.bedrooms));
  return counts;
}

function normalise(text: string) {
  return text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ');
}

function haystack(property: Property) {
  return normalise(
    [
      property.title,
      property.description,
      property.city,
      property.state,
      property.address,
      property.estate?.name,
      ...(property.variants || []).map((v) => v.label),
    ]
      .filter(Boolean)
      .join(' ')
  );
}

export function isSoldOut(property: Property) {
  return property.status === 'SOLD' || property.estate?.status === 'SOLD_OUT';
}

/** Every filter except the one named in `skip` — used to count what each
 * option would return, so options show live counts. */
export function matches(property: Property, search: SearchState, skip?: keyof SearchState) {
  // Sold-out listings are never part of search results.
  if (isSoldOut(property)) return false;
  if (skip !== 'type' && search.type && property.type !== search.type) return false;
  if (skip !== 'state' && search.state && property.state !== search.state) return false;
  if (skip !== 'estate' && search.estate && property.estate?.slug !== search.estate) return false;
  if (skip !== 'budget' && search.budget) {
    const band = BUDGETS.find((b) => b.value === search.budget);
    // A listing matches if any of its options falls in the band.
    if (band && !optionPrices(property).some((p) => p >= band.min && p < band.max)) return false;
  }
  if (skip !== 'beds' && search.beds) {
    const want = Number(search.beds);
    const counts = bedroomCounts(property);
    if (!counts.some((n) => (want >= 4 ? n >= 4 : n === want))) return false;
  }
  if (skip !== 'q' && search.q.trim()) {
    const text = haystack(property);
    // Every word must appear somewhere, in any order.
    if (!normalise(search.q).trim().split(' ').every((word) => text.includes(word))) return false;
  }
  return true;
}

export function runSearch(properties: Property[], search: SearchState): Property[] {
  const results = properties.filter((p) => matches(p, search));
  return results.sort((a, b) => {
    if (search.sort === 'price_asc') return startingPrice(a) - startingPrice(b);
    if (search.sort === 'price_desc') return startingPrice(b) - startingPrice(a);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}

/** Number of active filters (search text and sort don't count). */
export function activeFilterCount(search: SearchState) {
  return [search.type, search.state, search.estate, search.budget, search.beds].filter(Boolean).length;
}

const PARAM_KEYS: (keyof SearchState)[] = ['q', 'type', 'state', 'estate', 'budget', 'beds', 'sort'];

/** Reads the URL, accepting the homepage hero's `search` / `estateSlug` names too. */
export function searchFromParams(params: URLSearchParams): SearchState {
  const sort = params.get('sort');
  return {
    q: params.get('q') || params.get('search') || '',
    type: params.get('type') && params.get('type') !== 'ALL' ? params.get('type')! : '',
    state: params.get('state') || '',
    estate: params.get('estate') || params.get('estateSlug') || '',
    budget: params.get('budget') || '',
    beds: params.get('beds') || '',
    sort: sort === 'price_asc' || sort === 'price_desc' ? sort : 'recommended',
  };
}

export function searchToQuery(search: SearchState) {
  const params = new URLSearchParams();
  for (const key of PARAM_KEYS) {
    const value = search[key];
    if (typeof value === 'string' && value && !(key === 'sort' && value === 'recommended')) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** ₦77,500,000 style; other currencies keep their code. */
export function formatPrice(amount: number, currency = 'NGN') {
  const formatted = Math.round(amount).toLocaleString('en-NG');
  return currency === 'NGN' ? `₦${formatted}` : `${currency} ${formatted}`;
}
