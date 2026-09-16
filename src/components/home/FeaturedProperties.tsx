import Link from 'next/link';
import type { Property } from '@/shared';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FeaturedPropertiesProps = {
  properties: Property[];
};

// Renders the "Our Developments" homepage row — same card look this
// section always had (image, title, location, description), just showing
// properties instead of estates, ordered newest first then fast-selling
// (`featured`), with a small New/Fast Selling tag on the card image. Not a
// redesign — deliberately keeps the original card markup/styling.
export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const latest = properties[0];

  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Our Developments</h2>
            <p className="text-muted-foreground">
              Our newest listing and the fastest-selling homes across our estates.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/properties">View All</Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => {
            const isNew = property.id === latest?.id;
            const isFastSelling = Boolean(property.featured) && !isNew;
            return (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className="glass-card backdrop-blur-lg group shrink-0 w-[82%] max-w-sm snap-center rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-auto lg:max-w-none lg:shrink"
              >
                <div className="relative h-44 overflow-hidden">
                  {property.images?.[0] && (
                    <img
                      src={property.images[0].url}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  )}
                  {(isNew || isFastSelling) && (
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        isNew ? 'bg-primary text-primary-foreground' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {isNew ? 'New' : 'Fast Selling'}
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{property.city}, {property.state}</span>
                  </div>
                  {property.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
