import { fetchAPI } from '@/lib/api';
import type { Property } from '@/shared';
import FeaturedProperties from '@/components/home/FeaturedProperties';

const SHOWCASE_SIZE = 6;

// "Our Developments" homepage slot — shows properties ordered newest first
// then fast-selling (`featured`), per Daniel's explicit direction.
export default async function EstateSections() {
  const data = await fetchAPI('/properties?take=50').catch(() => []);
  const allProperties: Property[] = Array.isArray(data) ? data : data?.items || [];
  if (allProperties.length === 0) return null;

  const byNewest = [...allProperties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latest = byNewest[0];
  const fastSelling = allProperties.filter((p) => p.featured && p.id !== latest.id);
  const properties = [latest, ...fastSelling].slice(0, SHOWCASE_SIZE);

  return <FeaturedProperties properties={properties} />;
}
