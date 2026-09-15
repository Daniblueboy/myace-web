import { fallbackPromos } from '@/lib/fallback-data';
import PromoCarousel from '@/components/home/PromoCarousel';

export default function PromoSection() {
  return <PromoCarousel promos={fallbackPromos} />;
}
