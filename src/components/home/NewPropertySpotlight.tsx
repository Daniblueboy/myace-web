import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Property } from '@/shared';
import { MapPin, Bed, Bath, Square, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewPropertyImageCarousel from '@/components/home/NewPropertyImageCarousel';

// Single most-recently-added property, not a grid — "spotlight the latest
// unveiled property" is one listing, deliberately distinct from the
// multi-item Estate Spotlights/Newly Opened Locations sections above it.
export default async function NewPropertySpotlight() {
  const data = await fetchAPI('/properties?take=50').catch(() => []);
  const properties: Property[] = Array.isArray(data) ? data : data?.items || [];
  if (properties.length === 0) return null;

  const latest = [...properties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const outrightPrices = latest.variants
    ?.filter((v) => !v.paymentType || v.paymentType === 'OUTRIGHT')
    .map((v) => Number(v.price))
    .filter((p) => !Number.isNaN(p));
  const displayPrice = outrightPrices && outrightPrices.length > 0 ? Math.min(...outrightPrices) : Number(latest.price);

  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-4 w-4" /> Just Unveiled
          </p>
          <h2 className="text-3xl font-bold mt-3">New Property</h2>
        </div>

        <Link
          href={`/properties/${latest.slug}`}
          className="glass-card backdrop-blur-lg group grid overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl md:grid-cols-2 max-w-5xl mx-auto"
        >
          <div className="relative h-64 md:h-full overflow-hidden">
            <NewPropertyImageCarousel images={latest.images || []} alt={latest.title} />
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              New
            </span>
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {latest.city}, {latest.state}
            </div>
            <h3 className="text-2xl font-bold">{latest.title}</h3>
            {latest.description && (
              <p className="text-muted-foreground line-clamp-2">{latest.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {latest.bedrooms ? (
                <span className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4" /> {latest.bedrooms} bed
                </span>
              ) : null}
              {latest.bathrooms ? (
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" /> {latest.bathrooms} bath
                </span>
              ) : null}
              {latest.size ? (
                <span className="flex items-center gap-1.5">
                  <Square className="h-4 w-4" /> {latest.size}
                </span>
              ) : null}
            </div>
            <div className="text-2xl font-bold text-primary">
              {latest.currency} {displayPrice.toLocaleString()}
            </div>
            <Button className="w-fit" asChild>
              <span>View This Property</span>
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}
