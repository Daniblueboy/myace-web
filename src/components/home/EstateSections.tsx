import { fallbackEstates } from '@/lib/fallback-data';
import FeaturedEstates from '@/components/home/FeaturedEstates';

// Was FeaturedEstates + LatestEstates back to back — two near-identical
// estate grids in a row read as redundant. One curated spotlight (with its
// own "View All" link to /estates for the rest) covers "Our Developments"
// on its own. Feeds off estates (fallbackEstates), not the separate
// properties list — confirmed as the intended data source per Daniel,
// after a few property-based experiments here were tried and reverted.
export default function EstateSections() {
  return <FeaturedEstates estates={fallbackEstates} />;
}
