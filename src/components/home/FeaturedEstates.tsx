import Link from 'next/link';
import type { Estate } from '@/shared';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FeaturedEstatesProps = {
  estates: Estate[];
};

export default function FeaturedEstates({ estates }: FeaturedEstatesProps) {
  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Estate Spotlights</h2>
            <p className="text-muted-foreground">
              Curated estates with verified titles and infrastructure highlights.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/estates">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {estates.slice(0, 3).map((estate) => (
            <Link
              key={estate.id}
              href={`/estates/${estate.slug}`}
              className="rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              {estate.coverImage && (
                <img
                  src={estate.coverImage}
                  alt={estate.name}
                  className="h-44 w-full object-cover"
                />
              )}
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
          ))}
        </div>
      </div>
    </section>
  );
}
