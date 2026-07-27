import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedEstates from '@/components/home/FeaturedEstates';
import LatestEstates from '@/components/home/LatestEstates';
import ComplianceSection from '@/components/home/ComplianceSection';
import PartnersSection from '@/components/home/PartnersSection';
import PromoSection from '@/components/home/PromoSection';
import CeoWelcomeSection from '@/components/home/CeoWelcomeSection';
import AppDownloadSection from '@/components/home/AppDownloadSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StatesSection } from '@/components/home/StatesSection';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import { CtaSection } from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { SectionSkeleton } from '@/components/layout/SectionSkeleton';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<div className="h-2 animate-pulse bg-primary/10" />}>
        <PromoSection />
      </Suspense>
      <CeoWelcomeSection />
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedEstates />
      </Suspense>
      <Suspense fallback={<SectionSkeleton cards={4} tone="muted" />}>
        <LatestEstates />
      </Suspense>
      <WhyChooseUs />
      <ServicesSection />
      <StatesSection />
      <Suspense fallback={<SectionSkeleton cards={4} tone="muted" />}>
        <ComplianceSection />
      </Suspense>
      <PartnersSection />
      <Suspense fallback={<SectionSkeleton tone="muted" />}>
        <TestimonialsSection />
      </Suspense>
      <AppDownloadSection />
      <NewsletterSection />
      <Suspense fallback={<SectionSkeleton />}>
        <LatestBlogPosts />
      </Suspense>
      <CtaSection />
    </div>
  );
}
