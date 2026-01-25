import { fetchAPI } from '@/lib/api';
import PromoCarousel from '@/components/home/PromoCarousel';

export default async function PromoSection() {
  const promos = await fetchAPI('/promos').catch(() => []);

  if (!promos || promos.length === 0) return null;

  return <PromoCarousel promos={promos} />;
}
