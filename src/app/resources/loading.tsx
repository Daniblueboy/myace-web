export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-full mx-auto mb-6" />
            <div className="h-12 w-80 bg-muted animate-pulse rounded-lg mx-auto mb-6" />
            <div className="h-6 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* Search Section Skeleton */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="w-full sm:flex-1 h-10 bg-muted animate-pulse rounded-md" />
            <div className="h-10 w-[200px] bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="h-5 w-32 bg-muted animate-pulse rounded mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex justify-between">
                <div className="w-12 h-12 bg-muted animate-pulse rounded-xl" />
                <div className="w-12 h-6 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded mt-4" />
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              <div className="h-16 w-full bg-muted animate-pulse rounded" />
              <div className="h-10 w-full bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
