import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Property } from '@/shared';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SHOWCASE_SIZE = 6;

// Replaces the old single-property "New Property" spotlight — instead of a
// dedicated section for one listing, this pulls a small mixed set (the
// latest listing plus properties flagged `featured` as fast-selling) and
// tags each card accordingly, so "new" is an indicator on a normal
// properties showcase rather than its own section.
export default async function PropertyShowcase() {
  const data = await fetchAPI('/properties?take=50').catch(() => []);
  const properties: Property[] = Array.isArray(data) ? data : data?.items || [];
  if (properties.length === 0) return null;

  const byNewest = [...properties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latest = byNewest[0];
  const fastSelling = properties.filter((p) => p.featured && p.id !== latest.id);

  const showcase = [latest, ...fastSelling].slice(0, SHOWCASE_SIZE);

  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <p className="text-muted-foreground">
              Our newest listing and the fastest-selling homes across our estates.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/properties" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {showcase.map((property) => (
            <div key={property.id} className="shrink-0 w-[82%] snap-center lg:w-auto lg:shrink">
              <PropertyCard
                property={property}
                isNew={property.id === latest.id}
                isFastSelling={Boolean(property.featured) && property.id !== latest.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
