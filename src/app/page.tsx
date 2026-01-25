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

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PromoSection />
      <CeoWelcomeSection />
      <FeaturedEstates />
      <LatestEstates />
      <WhyChooseUs />
      <ServicesSection />
      <StatesSection />
      <ComplianceSection />
      <PartnersSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <NewsletterSection />
      <LatestBlogPosts />
      <CtaSection />
    </div>
  );
}
