import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl font-bold mb-3">Our Estates</h1>
          <p className="text-muted-foreground">
            Explore master‑planned estates where we sell land allocations and completed apartments.
          </p>
        </div>

        {estates.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-10 text-center text-muted-foreground">
            No estates published yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {estates.map((estate: any) => (
              <Link
                key={estate.id}
                href={`/estates/${estate.slug}`}
                className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
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
        )}
        {total > take && (
          <div className="flex items-center justify-between pt-10">
          <Button variant="outline" asChild disabled={page <= 1}>
            <Link href={`/estates?page=${Math.max(page - 1, 1)}`}>Previous</Link>
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button variant="outline" asChild disabled={estates.length < take}>
            <Link href={`/estates?page=${page + 1}`}>Next</Link>
          </Button>
          </div>
        )}
      </div>
    </div>
  );
}
