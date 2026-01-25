'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role?: string | null;
  message: string;
  rating?: number | null;
  photoUrl?: string | null;
}

export default function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length, inView]);

  useEffect(() => {
    const container = listRef.current;
    const target = itemRefs.current[index];
    if (container && target) {
      const left = target.offsetLeft - container.offsetLeft;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [index]);

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-10 flex gap-2 pointer-events-auto">
        <button
          type="button"
          className="h-9 w-9 rounded-full border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center justify-center"
          onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="h-9 w-9 rounded-full border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center justify-center"
          onClick={() => setIndex((prev) => (prev + 1) % items.length)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={listRef}
        className="mt-10 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current[idx] = el;
            }}
            className="min-w-[280px] flex-1 md:basis-1/2 lg:basis-1/3 snap-start"
          >
            <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800" />
                )}
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {item.role && <p className="text-xs text-muted-foreground">{item.role}</p>}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed mb-4">"{item.message}"</p>
              {item.rating && (
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
