import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container max-w-lg text-center py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">404</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have moved. Try one of these instead.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/estates">Browse Estates</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
