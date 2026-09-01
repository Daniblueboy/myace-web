import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';

const TITLE = 'Our Estates | Aceroyal Estates';
const DESCRIPTION = 'Browse active Aceroyal Estates developments across Lagos, Abuja, Oyo, Enugu and Edo — land and homes with transparent pricing.';

export const metadata: Metadata = {
  title: 'Our Estates',
  description: DESCRIPTION,
  alternates: { canonical: '/estates' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/estates' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function EstatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || '1');
  const take = 6;
  const skip = (page - 1) * take;
  const data = await fetchAPI(`/estates?skip=${skip}&take=${take}`).catch(() => ({ items: [], total: 0 }));
  const estates = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative overflow-hidden border-b bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Master-Planned Communities</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">Our Estates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore master-planned estates where we sell land allocations and completed apartments,
            each with verified titles and clear documentation.
          </p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        {estates.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-10 text-center text-muted-foreground">
            No estates published yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {estates.map((estate: any, i: number) => (
              <Reveal key={estate.id} delay={Math.min(i, 4) * 0.06}>
                <Link
                  href={`/estates/${estate.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    {estate.coverImage ? (
                      <img
                        src={estate.coverImage}
                        alt={estate.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    {estate.status && (
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          estate.status === 'SOLD_OUT'
                            ? 'bg-slate-900/80 text-white'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {estate.status === 'SOLD_OUT' ? 'Sold Out' : 'Available'}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-xl font-bold text-white">{estate.name}</h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-white/85">
                        <MapPin className="h-4 w-4" />
                        <span>{estate.city}, {estate.state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {estate.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{estate.description}</p>
                    )}
                    <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Estates pagination">
            <Button variant="outline" size="icon" disabled={page <= 1} asChild={page > 1}>
              {page > 1 ? (
                <Link href={page - 1 === 1 ? '/estates' : `/estates?page=${page - 1}`} aria-label="Previous page">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <span className="px-4 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="icon" disabled={page >= totalPages} asChild={page < totalPages}>
              {page < totalPages ? (
                <Link href={`/estates?page=${page + 1}`} aria-label="Next page">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </nav>
        )}
      </div>
    </div>
  );
}
