import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

// Matched on state only — Estate has no structured price or property-type
// field at this level (price lives in individual Property records / is
// embedded in description text, and "type" like LAND/APARTMENT is a
// Property-level attribute, not an Estate one), so "similar price range"
// and "same property type" aren't reliably matchable yet without those
// becoming real Estate fields.
export async function RelatedEstates({ currentSlug, state }: { currentSlug: string; state: string }) {
  const data = await fetchAPI('/estates').catch(() => ({ items: [] }));
  const allEstates = data?.items || data || [];
  const others = allEstates.filter((e: any) => e.slug !== currentSlug);

  const sameState = others.filter((e: any) => e.state === state);
  const rest = others.filter((e: any) => e.state !== state);
  const related = [...sameState, ...rest].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold mb-6">You May Also Be Interested In</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((estate: any) => (
          <Link
            key={estate.id}
            href={`/estates/${estate.slug}`}
            className="group rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
              {estate.coverImage && (
                <img
                  src={estate.coverImage}
                  alt={estate.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1">{estate.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                <MapPin className="h-3.5 w-3.5" />
                {estate.city}, {estate.state}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View Estate <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
