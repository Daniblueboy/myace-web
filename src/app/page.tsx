import HeroSection from '@/components/home/HeroSection';
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection';
import CeoWelcomeSection from '@/components/home/CeoWelcomeSection';
import EstateSections from '@/components/home/EstateSections';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import PartnersSection from '@/components/home/PartnersSection';
import ComplianceSection from '@/components/home/ComplianceSection';
import PromoSection from '@/components/home/PromoSection';
import AppDownloadSection from '@/components/home/AppDownloadSection';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import { CtaSection } from '@/components/home/CtaSection';
import { Reveal } from '@/components/motion/Reveal';

// Section order follows Daniel's specified homepage flow: Hero, Who We Are,
// CEO message, Our Developments, Our Success (testimonials), Why Choose
// Aceroyal, Our Partnership, Announcement, App Launch, Insights. New/
// fast-selling property indicators live inside Our Developments itself
// (see EstateSections/FeaturedEstates) rather than as a separate homepage
// section — an earlier standalone "Featured Properties" section was
// removed per Daniel's explicit correction. Why Choose Aceroyal originally
// lived inside Who We Are
// (folded in to avoid two consecutive "about the company" blocks) but was
// moved to its own section right after Our Success per Daniel's request.
// Services was folded into Who We Are, the Realtor CTA was removed
// outright, the States We Operate In section was removed outright too per
// Daniel's request, and the Newsletter section was folded into App Launch
// (both posted to the same /newsletter endpoint) — rather than kept as
// separate near-duplicate sections. Everything else already on the
// homepage (Compliance, final CTA) stays, woven in around that backbone.
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Reveal><WhoWeAreSection /></Reveal>
      <Reveal><CeoWelcomeSection /></Reveal>
      <Reveal><EstateSections /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><WhyChooseSection /></Reveal>
      <Reveal><PartnersSection /></Reveal>
      <Reveal><ComplianceSection /></Reveal>
      <Reveal><PromoSection /></Reveal>
      <Reveal><AppDownloadSection /></Reveal>
      <Reveal><LatestBlogPosts /></Reveal>
      <Reveal><CtaSection /></Reveal>
    </div>
  );
}
