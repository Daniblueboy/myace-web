import Link from 'next/link';
import type { Estate } from '@/shared';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LatestEstatesProps = {
  estates: Estate[];
};

export default function LatestEstates({ estates }: LatestEstatesProps) {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="container space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Latest Estates</p>
            <h2 className="text-3xl font-bold">Newly Opened Locations</h2>
            <p className="text-muted-foreground mt-2">
              Fresh opportunities for land and apartment ownership inside our estates.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/estates">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {estates.slice(0, 4).map((estate) => (
            <Link
              key={estate.id}
              href={`/estates/${estate.slug}`}
              className="group rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              {estate.coverImage ? (
                <img
                  src={estate.coverImage}
                  alt={estate.name}
                  className="h-40 w-full object-cover transition-transform group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-40 w-full bg-slate-200" />
              )}
              <div className="p-4 space-y-2">
                <div className="text-xs uppercase tracking-[0.2em] text-primary">New</div>
                <h3 className="font-semibold text-lg">{estate.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{estate.city}, {estate.state}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
