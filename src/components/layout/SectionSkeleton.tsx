type SectionSkeletonProps = {
  cards?: number;
  tone?: 'default' | 'muted';
};

export function SectionSkeleton({ cards = 3, tone = 'default' }: SectionSkeletonProps) {
  return (
    <section
      className={`py-16 ${tone === 'muted' ? 'bg-slate-50 dark:bg-slate-950' : 'bg-background'}`}
      aria-label="Loading section"
      aria-busy="true"
    >
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="w-full max-w-lg space-y-3">
            <div className="h-8 w-56 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </div>
          <div className="hidden h-10 w-24 animate-pulse rounded-md bg-muted sm:block" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border bg-card">
              <div className="h-40 animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
        <span className="sr-only">Loading content</span>
      </div>
    </section>
  );
}
