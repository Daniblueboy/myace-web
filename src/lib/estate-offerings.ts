import type { Estate } from '@/shared';

/** "Land", "Apartments", "Land & Apartments", or null for an empty set —
 * shared by any caller that already has the estate's property types
 * (e.g. a set built from a separate properties fetch on a list page). */
export function formatOfferingTypes(types: Set<string>): string | null {
  const hasLand = types.has('LAND');
  const hasApartment = types.has('APARTMENT');
  if (hasLand && hasApartment) return 'Land & Apartments';
  if (hasLand) return 'Land';
  if (hasApartment) return 'Apartments';
  return null;
}

/** "Land", "Apartments", "Land & Apartments", or null if the estate has no
 * linked properties yet — derived from each property's own `type`, falling
 * back to the estate's own `offeringType` when there are no properties to
 * derive it from. */
export function getOfferingLabel(estate: Estate): string | null {
  const fromProperties = formatOfferingTypes(new Set((estate.properties || []).map((p) => p.type)));
  if (fromProperties) return fromProperties;
  return formatOfferingTypes(new Set(estate.offeringType ? [estate.offeringType] : []));
}
