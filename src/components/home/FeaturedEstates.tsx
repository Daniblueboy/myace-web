import Link from 'next/link';
import type { Estate } from '@/shared';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOfferingLabel } from '@/lib/estate-offerings';

type FeaturedEstatesProps = {
  estates: Estate[];
};

export default function FeaturedEstates({ estates }: FeaturedEstatesProps) {
  const sorted = [...estates].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const shown = sorted.slice(0, 3);
  const latest = shown[0];

  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Our Developments</h2>
            <p className="text-muted-foreground">
              Curated estates with verified titles and infrastructure highlights.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/estates">View All</Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {shown.map((estate) => {
            const isNew = estate.id === latest?.id;
            const isFastSelling = Boolean(estate.featured) && !isNew;
            const offeringLabel = getOfferingLabel(estate);
            return (
              <div
                key={estate.id}
                className="glass-card backdrop-blur-lg group flex flex-col shrink-0 w-[82%] max-w-sm snap-center rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-auto lg:max-w-none lg:shrink"
              >
                <Link href={`/estates/${estate.slug}`} className="block">
                  <div className="relative h-44 overflow-hidden">
                    {estate.coverImage && (
                      <img
                        src={estate.coverImage}
                        alt={estate.name}
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
                    {offeringLabel && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-900/80 text-white backdrop-blur-sm">
                        {offeringLabel}
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg">{estate.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{estate.city}, {estate.state}</span>
                    </div>
                    {estate.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {estate.description}
                      </p>
                    )}
                  </div>
                </Link>

                <div className="mt-auto flex gap-2 px-5 pb-5">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/book-inspection?estate=${estate.slug}`}>Book Inspection</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link href={`/contact?estate=${estate.slug}&enquiry=GENERAL`}>Enquire</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
