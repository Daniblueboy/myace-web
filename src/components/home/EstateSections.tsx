import { fallbackEstates } from '@/lib/fallback-data';
import FeaturedEstates from '@/components/home/FeaturedEstates';
import { fetchAPI } from '@/lib/api';
import type { Property } from '@/shared';

const PROPERTIES_SHOWCASE_SIZE = 6;

// Was FeaturedEstates + LatestEstates back to back — two near-identical
// estate grids in a row read as redundant. One curated spotlight (with its
// own "View All" link to /estates for the rest) covers "Our Developments"
// on its own. New/fast-selling property indicators live inside this same
// section (see FeaturedEstates) rather than a separate homepage section —
// an earlier standalone "Featured Properties" section was removed per
// Daniel's explicit correction.
export default async function EstateSections() {
  const data = await fetchAPI('/properties?take=50').catch(() => []);
  const allProperties: Property[] = Array.isArray(data) ? data : data?.items || [];

  const byNewest = [...allProperties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latest = byNewest[0];
  const fastSelling = latest ? allProperties.filter((p) => p.featured && p.id !== latest.id) : [];
  const properties = latest ? [latest, ...fastSelling].slice(0, PROPERTIES_SHOWCASE_SIZE) : [];

  return <FeaturedEstates estates={fallbackEstates} properties={properties} />;
}
