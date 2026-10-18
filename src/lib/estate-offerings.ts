import type { Estate } from '@/shared';

// Property types and their display labels, in display order. HOUSE covers
// bungalows and villas (e.g. Villa Nova) - not apartments.
export const PROPERTY_TYPES = [
  { value: 'LAND', singular: 'Land', plural: 'Land' },
  { value: 'APARTMENT', singular: 'Apartment', plural: 'Apartments' },
  { value: 'HOUSE', singular: 'Bungalow / Villa', plural: 'Bungalows & Villas' },
] as const;

/** Label for a single property's type, e.g. on a property card. */
export function propertyTypeLabel(type: string | null | undefined): string {
  return PROPERTY_TYPES.find((t) => t.value === type)?.singular ?? (type || '');
}

/** "Land", "Apartments", "Land & Apartments", "Bungalows & Villas" etc., or
 * null for an empty set - shared by any caller that already has the
 * estate's property types (e.g. a set built from a separate properties
 * fetch on a list page). */
export function formatOfferingTypes(types: Set<string>): string | null {
  const labels = PROPERTY_TYPES.filter((t) => types.has(t.value)).map((t) => t.plural);
  if (labels.length === 0) return null;
  if (labels.length === 1) return labels[0];
  return `${labels.slice(0, -1).join(', ')} & ${labels[labels.length - 1]}`;
}

/** Offering label derived from each property's own `type`, falling back to
 * the estate's own `offeringType` when there are no properties to derive
 * it from. */
export function getOfferingLabel(estate: Estate): string | null {
  const fromProperties = formatOfferingTypes(new Set((estate.properties || []).map((p) => p.type)));
  if (fromProperties) return fromProperties;
  return formatOfferingTypes(new Set(estate.offeringType ? [estate.offeringType] : []));
}

/** Number of option cards the estate's Available Options section shows —
 * mirrors EstateOfferings: a property's outright variants, else all its
 * variants, else the property itself. */
export function getAvailableOptionCount(estate: Estate): number {
  return (estate.properties || []).reduce((total, property) => {
    const variants = property.variants || [];
    const outright = variants.filter((v) => !v.paymentType || v.paymentType === 'OUTRIGHT');
    return total + (outright.length || variants.length || 1);
  }, 0);
}

/** Land is sold by plot/acre, never as a countable "unit" - picks the right
 * word for the "Available ___" stat/tab on an estate that has linked
 * properties. */
export function getAvailableCountLabel(estate: Estate): string {
  const types = new Set((estate.properties || []).map((p) => p.type));
  if (types.size !== 1) return 'Available Options';
  if (types.has('LAND')) return 'Available Plots';
  if (types.has('APARTMENT')) return 'Available Units';
  if (types.has('HOUSE')) return 'Available Homes';
  return 'Available Options';
}
