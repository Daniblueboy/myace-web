'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { HeroParticles } from '@/components/home/HeroParticles';

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [state, setState] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1920&q=80',
    },
    {
      type: 'video',
      url: 'https://cdn.coverr.co/videos/coverr-modern-house-1502/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1920&q=80',
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1920&q=80',
    },
  ];

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

  return (
    <section
      className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden"
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
          className={`absolute inset-0 transition-opacity duration-700 ${idx === slideIndex ? 'opacity-60' : 'opacity-0'}`}
        >
          {slide.type === 'video' ? (
            <video
              key={slide.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={slide.poster}
              className="w-full h-full object-cover"
            >
              <source src={slide.url} type="video/mp4" />
            </video>
          ) : (
            <img src={slide.url} alt="Hero slide" className="w-full h-full object-cover" />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-slate-900/40" />
      <HeroParticles />

      <motion.div
        className="container relative z-10 text-center space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Premium Estates, <br /> Trusted Ownership
        </h1>
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
          className="bg-white/95 dark:bg-slate-900/90 p-4 rounded-lg shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row gap-4"
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
    </section>
  );
}
