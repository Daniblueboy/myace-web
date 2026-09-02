'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Reveal } from '@/components/motion/Reveal';

const PAGE_SIZE = 6;

export default function EstatesClient() {
  const searchParams = useSearchParams();
  const [estates, setEstates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [state, setState] = useState(searchParams.get('state') || 'ALL');
  const [status, setStatus] = useState(searchParams.get('status') || 'ALL');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAPI('/estates?take=100')
      .then((data) => setEstates(data?.items || data || []))
      .catch(() => setEstates([]))
      .finally(() => setLoading(false));
  }, []);

  // Total estate count is small enough that fetching once and filtering
  // in-memory is simpler and more reliable than depending on backend
  // query-param support we can't verify from this repo.
  const states = useMemo(
    () => Array.from(new Set(estates.map((e) => e.state).filter(Boolean))).sort(),
    [estates]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return estates.filter((estate) => {
      if (state !== 'ALL' && estate.state !== state) return false;
      if (status !== 'ALL' && estate.status !== status) return false;
      if (term) {
        const haystack = `${estate.name} ${estate.description || ''} ${estate.city} ${estate.state}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [estates, search, state, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasActiveFilters = Boolean(search) || state !== 'ALL' || status !== 'ALL';

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStateChange = (value: string) => {
    setState(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setState('ALL');
    setStatus('ALL');
    setPage(1);
  };

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
        <div className="mb-10 flex flex-col gap-3 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search estates by name, city, or state..."
              className="pl-9"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex md:shrink-0">
            <Select value={state} onValueChange={handleStateChange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Any Status</SelectItem>
                <SelectItem value="ACTIVE">Available</SelectItem>
                <SelectItem value="SOLD_OUT">Sold Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="md:shrink-0">
              Clear filters
            </Button>
          )}
        </div>

        {!loading && (
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filtered.length} estate{filtered.length === 1 ? '' : 's'}
          </p>
        )}

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800"
              />
            ))}
          </div>
        ) : paged.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-10 text-center text-muted-foreground">
            {hasActiveFilters ? (
              <>
                No estates match your search.{' '}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-medium text-primary underline underline-offset-2"
                >
                  Clear filters
                </button>
              </>
            ) : (
              'No estates published yet. Check back soon.'
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paged.map((estate: any, i: number) => (
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
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-4 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        )}
      </div>
    </div>
  );
}
