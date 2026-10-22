'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react';
import type { Property } from '@/shared';
import { fetchAPI } from '@/lib/api';
import { fallbackProperties } from '@/lib/fallback-data';
import { PROPERTY_TYPES } from '@/lib/estate-offerings';
import {
  BEDROOMS,
  BUDGETS,
  EMPTY_SEARCH,
  SORTS,
  activeFilterCount,
  isSoldOut,
  matches,
  runSearch,
  searchFromParams,
  searchToQuery,
  type SearchState,
  type SortKey,
} from '@/lib/property-search';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type Update = <K extends keyof SearchState>(key: K, value: SearchState[K]) => void;

export default function PropertiesClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();

  const [properties, setProperties] = useState<Property[]>(fallbackProperties);
  const [search, setSearch] = useState<SearchState>(() => searchFromParams(new URLSearchParams(paramsString)));
  const [sheetOpen, setSheetOpen] = useState(false);

  // External URL changes (e.g. the homepage hero search, or back/forward)
  // replace the search; our own URL writes below already match it, so they
  // fall through without resetting what the visitor is typing.
  const [syncedParams, setSyncedParams] = useState(paramsString);
  if (paramsString !== syncedParams) {
    setSyncedParams(paramsString);
    const fromUrl = searchFromParams(new URLSearchParams(paramsString));
    if (searchToQuery(fromUrl) !== searchToQuery(search)) setSearch(fromUrl);
  }

  // Keep the URL shareable as the search changes, without a navigation.
  useEffect(() => {
    const next = `${pathname}${searchToQuery(search)}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', next);
    }
  }, [search, pathname]);

  // Live data when the API is enabled; the bundled catalogue otherwise.
  useEffect(() => {
    fetchAPI('/properties?take=500')
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.items;
        if (Array.isArray(list) && list.length > 0) setProperties(list);
      })
      .catch(() => {});
  }, []);

  const update: Update = (key, value) => setSearch((prev) => ({ ...prev, [key]: value }));
  const clearFilters = () => setSearch((prev) => ({ ...EMPTY_SEARCH, q: prev.q, sort: prev.sort }));
  const clearAll = () => setSearch(EMPTY_SEARCH);

  const results = useMemo(() => runSearch(properties, search), [properties, search]);
  const filterCount = activeFilterCount(search);
  const hiddenSoldCount = useMemo(
    () => (search.sold ? 0 : properties.filter((p) => isSoldOut(p) && matches(p, { ...search, sold: true })).length),
    [properties, search]
  );

  const resultLabel = `${results.length} ${results.length === 1 ? 'offering' : 'offerings'}`;

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="container pt-10 md:pt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Search</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Find your next property</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Land, apartments and homes across Lagos, Abuja, Oyo, Enugu and Edo.
        </p>
      </div>

      {/* Search bar — sticky under the navbar on phones so it's always to hand. */}
      <div className="sticky top-[var(--nav-h)] z-30 mt-6 border-b bg-background/85 backdrop-blur-md lg:static lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
        <div className="container py-3 lg:py-0">
          <div className="flex items-center gap-2">
            <SearchInput value={search.q} onChange={(q) => update('q', q)} />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative h-12 shrink-0 gap-2 rounded-xl px-4 lg:hidden" aria-label="Filters">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="hidden sm:inline">Filters</span>
                  {filterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                      {filterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[88dvh] gap-0 rounded-t-3xl p-0 pb-[env(safe-area-inset-bottom)]"
              >
                <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <div className="px-5 pt-3 pb-2">
                  <SheetTitle className="text-lg">Filters</SheetTitle>
                  <SheetDescription>Narrow the offerings by type, location and budget.</SheetDescription>
                </div>
                <div className="overflow-y-auto px-5 pb-4">
                  <FilterPanel properties={properties} search={search} update={update} />
                </div>
                <div className="flex gap-3 border-t bg-background px-5 py-4">
                  <Button variant="ghost" className="flex-1" onClick={clearFilters} disabled={filterCount === 0}>
                    Clear
                  </Button>
                  <Button className="flex-[2]" onClick={() => setSheetOpen(false)}>
                    Show {resultLabel}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Quick type switch on phones/tablets, one tap away. */}
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto scroll-hide px-4 lg:hidden">
            <TypeChips search={search} properties={properties} update={update} compact />
          </div>
        </div>
      </div>

      <div className="container mt-6 lg:mt-8 lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border bg-white p-5 dark:bg-slate-900 dark:border-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              {filterCount > 0 && (
                <button type="button" onClick={clearFilters} className="text-sm font-medium text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel properties={properties} search={search} update={update} />
          </div>
        </aside>

        <section aria-label="Search results">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <span className="font-semibold text-foreground">{resultLabel}</span>
              {search.q.trim() && <> for &ldquo;{search.q.trim()}&rdquo;</>}
            </p>
            <Select value={search.sort} onValueChange={(value) => update('sort', value as SortKey)}>
              <SelectTrigger className="w-48" aria-label="Sort results">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ActiveFilters search={search} properties={properties} update={update} onClear={clearFilters} />

          {results.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <EmptyState
              query={search.q.trim()}
              hiddenSoldCount={hiddenSoldCount}
              onShowSold={() => update('sold', true)}
              onClearAll={clearAll}
            />
          )}

          {results.length > 0 && hiddenSoldCount > 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {hiddenSoldCount} sold-out {hiddenSoldCount === 1 ? 'offering is' : 'offerings are'} hidden.{' '}
              <button type="button" onClick={() => update('sold', true)} className="font-medium text-primary hover:underline">
                Show them
              </button>
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative flex-1 lg:max-w-2xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search estate, city or property…"
        aria-label="Search properties"
        className="h-12 w-full rounded-xl border bg-white pl-12 pr-11 text-base shadow-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/25 dark:bg-slate-900 dark:border-slate-800 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function Chip({
  active,
  disabled,
  count,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  count?: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled && !active}
      onClick={onClick}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-white hover:border-primary/60 hover:text-primary dark:bg-slate-900 dark:border-slate-700'
      }`}
    >
      {children}
      {count !== undefined && <span className={active ? 'opacity-80' : 'text-muted-foreground'}>{count}</span>}
    </button>
  );
}

function TypeChips({
  search,
  properties,
  update,
  compact = false,
}: {
  search: SearchState;
  properties: Property[];
  update: Update;
  compact?: boolean;
}) {
  const countFor = (type: string) => properties.filter((p) => matches(p, { ...search, type }, 'type') && (!type || p.type === type)).length;
  return (
    <>
      <Chip active={!search.type} onClick={() => update('type', '')} count={compact ? undefined : countFor('')}>
        All types
      </Chip>
      {PROPERTY_TYPES.map((t) => {
        const count = countFor(t.value);
        return (
          <Chip
            key={t.value}
            active={search.type === t.value}
            disabled={count === 0}
            count={compact ? undefined : count}
            onClick={() => update('type', search.type === t.value ? '' : t.value)}
          >
            {t.plural}
          </Chip>
        );
      })}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-b py-5 first:pt-0 last:border-0 last:pb-0 dark:border-slate-800">
      <legend className="mb-3 text-sm font-semibold">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/** Shared by the desktop sidebar and the phone bottom sheet. Every option
 * shows how many results it would give, given the other filters. */
function FilterPanel({ properties, search, update }: { properties: Property[]; search: SearchState; update: Update }) {
  const states = useMemo(() => {
    const seen = new Map<string, number>();
    properties.forEach((p) => seen.set(p.state, (seen.get(p.state) || 0) + 1));
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
  }, [properties]);

  const estates = useMemo(() => {
    const seen = new Map<string, string>();
    properties.forEach((p) => p.estate?.slug && seen.set(p.estate.slug, p.estate.name));
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [properties]);

  const count = (key: keyof SearchState, value: SearchState[keyof SearchState]) =>
    properties.filter((p) => matches(p, { ...search, [key]: value })).length;

  const showBedrooms = search.type !== 'LAND';

  return (
    <div>
      <FilterGroup title="Property type">
        <TypeChips search={search} properties={properties} update={update} />
      </FilterGroup>

      <FilterGroup title="Location">
        {states.map((state) => {
          const n = count('state', state);
          return (
            <Chip
              key={state}
              active={search.state === state}
              disabled={n === 0}
              count={n}
              onClick={() => update('state', search.state === state ? '' : state)}
            >
              {state}
            </Chip>
          );
        })}
      </FilterGroup>

      <FilterGroup title="Budget">
        {BUDGETS.map((band) => {
          const n = count('budget', band.value);
          return (
            <Chip
              key={band.value}
              active={search.budget === band.value}
              disabled={n === 0}
              count={n}
              onClick={() => update('budget', search.budget === band.value ? '' : band.value)}
            >
              {band.label}
            </Chip>
          );
        })}
      </FilterGroup>

      {showBedrooms && (
        <FilterGroup title="Bedrooms">
          {BEDROOMS.map((b) => {
            const n = count('beds', b.value);
            return (
              <Chip
                key={b.value}
                active={search.beds === b.value}
                disabled={n === 0}
                count={n}
                onClick={() => update('beds', search.beds === b.value ? '' : b.value)}
              >
                {b.label}
              </Chip>
            );
          })}
        </FilterGroup>
      )}

      <FilterGroup title="Estate">
        <Select value={search.estate || 'ALL'} onValueChange={(value) => update('estate', value === 'ALL' ? '' : value)}>
          <SelectTrigger className="w-full" aria-label="Estate">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Any estate</SelectItem>
            {estates.map(([slug, name]) => (
              <SelectItem key={slug} value={slug}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterGroup>

      <div className="flex items-center justify-between gap-4 pt-5">
        <label htmlFor="include-sold" className="text-sm font-semibold">
          Include sold out
        </label>
        <Switch id="include-sold" checked={search.sold} onCheckedChange={(checked) => update('sold', checked)} />
      </div>
    </div>
  );
}

/** Removable chips for each active filter, above the results. */
function ActiveFilters({
  search,
  properties,
  update,
  onClear,
}: {
  search: SearchState;
  properties: Property[];
  update: Update;
  onClear: () => void;
}) {
  const estateName = properties.find((p) => p.estate?.slug === search.estate)?.estate?.name;
  const chips: { key: keyof SearchState; label: string; reset: SearchState[keyof SearchState] }[] = [];
  if (search.type) chips.push({ key: 'type', label: PROPERTY_TYPES.find((t) => t.value === search.type)?.plural || search.type, reset: '' });
  if (search.state) chips.push({ key: 'state', label: search.state, reset: '' });
  if (search.budget) chips.push({ key: 'budget', label: BUDGETS.find((b) => b.value === search.budget)?.label || '', reset: '' });
  if (search.beds) chips.push({ key: 'beds', label: BEDROOMS.find((b) => b.value === search.beds)?.label || '', reset: '' });
  if (search.estate) chips.push({ key: 'estate', label: estateName || search.estate, reset: '' });
  if (search.sold) chips.push({ key: 'sold', label: 'Including sold out', reset: false });
  if (chips.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => update(chip.key, chip.reset as never)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary/10 pl-3 pr-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      <button type="button" onClick={onClear} className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        Clear all
      </button>
    </div>
  );
}

function EmptyState({
  query,
  hiddenSoldCount,
  onShowSold,
  onClearAll,
}: {
  query: string;
  hiddenSoldCount: number;
  onShowSold: () => void;
  onClearAll: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed bg-white px-6 py-16 text-center dark:bg-slate-900 dark:border-slate-800">
      <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />
      <h2 className="mt-4 text-lg font-semibold">
        {query ? <>No offerings match &ldquo;{query}&rdquo;</> : 'No offerings match these filters'}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        Try a different word, such as an estate name or city, or loosen a filter.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hiddenSoldCount > 0 && (
          <Button variant="outline" onClick={onShowSold}>
            Include {hiddenSoldCount} sold out
          </Button>
        )}
        <Button onClick={onClearAll}>Clear search and filters</Button>
      </div>
    </div>
  );
}
