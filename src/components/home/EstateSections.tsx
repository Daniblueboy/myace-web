import { fallbackEstates } from '@/lib/fallback-data';
import FeaturedEstates from '@/components/home/FeaturedEstates';
import LatestEstates from '@/components/home/LatestEstates';

export default function EstateSections() {
  // Split rather than let both sections re-slice from the same start —
  // otherwise the last estates in the list never appear anywhere on the
  // homepage at all (only reachable via the full /estates page).
  const featured = fallbackEstates.slice(0, 3);
  const latest = fallbackEstates.slice(3);

  return (
    <>
      <FeaturedEstates estates={featured} />
      <LatestEstates estates={latest} />
    </>
  );
}
