'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import { HeroParticles } from '@/components/home/HeroParticles';

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [state, setState] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Dark, moody architecture photography + a grayscale filter (rather than
  // depending on finding exactly-right stock photos) to match the
  // three-slide "story" reference Daniel shared — each slide carries its
  // own tagline, synced to the background.
  const slides = [
    {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
      headline: ['Build Legacies', 'Live with Purpose.'],
    },
    {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80',
      headline: ['Strategic Investments', 'Better Living'],
    },
    {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
      headline: ['Smart Investment', 'Premium Value'],
    },
  ];

  const activeSlide = slides[slideIndex];
  // Slide 1 ("Strategic Investments") gets the centered-mark layout from
  // the reference; the other two slides put the headline up top and the
  // mark near the bottom instead.
  const isCenteredLayout = slideIndex === 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('search', keyword);
    if (type) params.set('type', type);
    if (state) params.set('state', state);
    router.push(`/properties?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Slide 1 reads with black text (the others stay white) — a light
  // gradient built into that slide's own background (see the slides loop
  // below) creates the contrast, not a boxed panel behind the text.
  const HeroHeadline = () => (
    <AnimatePresence mode="wait">
      <motion.h1
        key={slideIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`text-4xl md:text-6xl font-bold tracking-tight ${
          isCenteredLayout ? 'text-slate-900' : 'text-white'
        }`}
      >
        {activeSlide.headline[0]} <br /> {activeSlide.headline[1]}
      </motion.h1>
    </AnimatePresence>
  );

  // The real wordmark artwork (not text) — the brand guide is explicit that
  // it shouldn't be rebuilt with a substitute font. -colour reads dark
  // enough to work on the light gradient of the centered-layout slide and
  // on slide 0's background; slide 2's photo washes the colour symbol out,
  // so it alone uses the white variant.
  const HeroMark = ({ large = false }: { large?: boolean }) => (
    <div className="flex flex-col items-center gap-3">
      <img
        src={slideIndex === 2 ? '/images/aceroyal-symbol-white.png' : '/images/aceroyal-symbol-colour.png'}
        alt=""
        className={`${large ? 'h-28 w-28' : 'h-16 w-16'} object-contain`}
      />
      <img
        src={isCenteredLayout ? '/images/aceroyal-wordmark-colour.png' : '/images/aceroyal-wordmark-white.png'}
        alt="Aceroyal"
        className={large ? 'h-6 w-auto' : 'h-4 w-auto'}
      />
    </div>
  );

  return (
    <section
      className="relative flex items-center justify-center bg-slate-900 text-white overflow-hidden min-h-[calc(100dvh-var(--nav-h)-var(--bottom-nav-h))] md:min-h-[750px] py-0 md:py-0"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (delta > 50) {
          setSlideIndex((prev) => (prev + 1) % slides.length);
        } else if (delta < -50) {
          setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }
        touchStartX.current = null;
      }}
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.url}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === slideIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.url}
            alt="Hero slide"
            className="w-full h-full object-cover grayscale animate-hero-kenburns"
          />
          {/* Slide 1 (centered layout, black text/wordmark) gets its own
              light gradient instead of the uniform dark one — whitens the
              lower half where that text sits, dark text needs a light area
              under it, not a boxed panel. */}
          {idx === 1 ? (
            <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-black/40" />
          ) : (
            <div className="absolute inset-0 bg-black/50" />
          )}
        </div>
      ))}
      <HeroParticles />

      {/* Mobile-only: three-zone layout matching the reference — slide 1
          centers the mark with the headline below it; the other two slides
          put the headline up top and the mark near the bottom. justify-between
          keeps the top/bottom zones pinned to the edges regardless of
          whether the (empty) middle zone has content. */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between px-6 pt-16 pb-24 text-center md:hidden">
        <div className="flex w-full justify-center">{!isCenteredLayout && <HeroHeadline />}</div>
        <div className="flex w-full justify-center">{isCenteredLayout && <HeroMark large />}</div>
        <div className="flex w-full justify-center">
          {isCenteredLayout ? <HeroHeadline /> : <HeroMark />}
        </div>
      </div>

      <motion.div
        className="hidden md:block container relative z-10 text-center space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={slideIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            {activeSlide.headline[0]} <br /> {activeSlide.headline[1]}
          </motion.h1>
        </AnimatePresence>

        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
          We develop and sell estates across Nigeria — land allocations and completed apartments with clear titles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" asChild className="transition-transform hover:scale-[1.03] active:scale-[0.98]">
            <Link href="/estates">Explore Estates</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent !text-white border-white hover:bg-white hover:!text-primary transition-transform hover:scale-[1.03] active:scale-[0.98]" asChild>
            <Link href="/book-inspection">Book Inspection</Link>
          </Button>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex bg-white/95 dark:bg-slate-900/90 p-4 rounded-lg shadow-lg max-w-3xl mx-auto flex-col md:flex-row gap-4"
        >
          <Input
            type="text"
            placeholder="Search by keywords..."
            className="text-slate-900 dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-slate-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="LAND">Land</option>
            <option value="APARTMENT">Apartment</option>
          </select>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-slate-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-white"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">All States</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Oyo">Oyo</option>
            <option value="Enugu">Enugu</option>
            <option value="Edo">Edo</option>
          </select>
          <Button size="lg" className="w-full md:w-auto" type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`h-2 w-2 rounded-full ${idx === slideIndex ? 'bg-white' : 'bg-white/40'}`}
              onClick={() => setSlideIndex(idx)}
            />
          ))}
        </div>
      </motion.div>

      {/* Mobile-only scroll indicator, pinned to the bottom of the hero. */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center md:hidden">
        <div className="flex flex-col items-center gap-1 text-white/70 animate-hero-scroll-cue">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
