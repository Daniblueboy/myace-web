import { fallbackEstates } from '@/lib/fallback-data';
import FeaturedEstates from '@/components/home/FeaturedEstates';
import LatestEstates from '@/components/home/LatestEstates';

export default function EstateSections() {
  const estates = fallbackEstates;

  return (
    <>
      <FeaturedEstates estates={estates} />
      <LatestEstates estates={estates} />
    </>
  );
}
