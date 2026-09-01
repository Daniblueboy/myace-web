import HeroSection from '@/components/home/HeroSection';
import EstateSections from '@/components/home/EstateSections';
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
import { Reveal } from '@/components/motion/Reveal';
// Built and ready, not live yet — uncomment once Aceroyal Realtor portal/app is public.
// import RealtorSection from '@/components/home/RealtorSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Reveal><PromoSection /></Reveal>
      <Reveal><CeoWelcomeSection /></Reveal>
      <Reveal><EstateSections /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <Reveal><ServicesSection /></Reveal>
      <Reveal><StatesSection /></Reveal>
      <Reveal><ComplianceSection /></Reveal>
      <Reveal><PartnersSection /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      {/* Built and ready, not live yet — uncomment once Aceroyal Realtor portal/app is public.
      <Reveal><RealtorSection /></Reveal>
      */}
      <Reveal><AppDownloadSection /></Reveal>
      <Reveal><NewsletterSection /></Reveal>
      <Reveal><LatestBlogPosts /></Reveal>
      <Reveal><CtaSection /></Reveal>
    </div>
  );
}
