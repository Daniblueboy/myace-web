import type { Estate } from '@/shared';

/** "Land", "Apartments", "Land & Apartments", or null if the estate has no
 * linked properties yet — derived from each property's own `type`. */
export function getOfferingLabel(estate: Estate): string | null {
  const types = new Set((estate.properties || []).map((p) => p.type));
  const hasLand = types.has('LAND');
  const hasApartment = types.has('APARTMENT');
  if (hasLand && hasApartment) return 'Land & Apartments';
  if (hasLand) return 'Land';
  if (hasApartment) return 'Apartments';
  return null;
}
