'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role?: string | null;
  message: string;
  rating?: number | null;
  photoUrl?: string | null;
}

const EXCERPT_LENGTH = 200;

function excerpt(message: string) {
  if (message.length <= EXCERPT_LENGTH) return message;
  const cut = message.slice(0, EXCERPT_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function TestimonialsSpotlight({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || items.length <= 1 || prefersReducedMotion) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [inView, items.length, prefersReducedMotion]);

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  const active = items[index];
  if (!active) return null;

  const isLong = active.message.length > EXCERPT_LENGTH;
  const displayMessage = expanded || !isLong ? active.message : excerpt(active.message);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      <Quote
        className="absolute -top-6 -left-2 h-20 w-20 text-primary/10 md:-top-8 md:-left-6 md:h-28 md:w-28"
        strokeWidth={1}
      />

      <div className="relative overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-lg px-6 py-10 md:px-14 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative text-center"
          >
            {active.rating ? (
              <div className="mb-5 flex items-center justify-center gap-1 text-amber-500">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500" />
                ))}
              </div>
            ) : null}

            <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
              "{displayMessage}"
            </p>
            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 text-sm font-semibold text-primary hover:underline"
              >
                {expanded ? 'Show less' : 'Read full review'}
              </button>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              {active.photoUrl ? (
                <img
                  src={active.photoUrl}
                  alt={active.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-red-800 text-sm font-semibold text-white ring-2 ring-primary/20">
                  {initials(active.name)}
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold">{active.name}</p>
                {active.role && <p className="text-xs text-muted-foreground">{active.role}</p>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
