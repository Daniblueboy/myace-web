export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-muted animate-pulse mx-auto mb-4 rounded"></div>
        <div className="h-6 w-96 bg-muted animate-pulse mx-auto rounded"></div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 w-full bg-muted animate-pulse rounded border"></div>
        ))}
      </div>
    </div>
  );
}
