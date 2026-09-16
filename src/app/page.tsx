import HeroSection from '@/components/home/HeroSection';
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection';
import CeoWelcomeSection from '@/components/home/CeoWelcomeSection';
import EstateSections from '@/components/home/EstateSections';
import PropertyShowcase from '@/components/home/PropertyShowcase';
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
// CEO message, Our Developments, Featured Properties, Our Success
// (testimonials), Why Choose Aceroyal, Our Partnership, Announcement, App
// Launch, Insights. Featured Properties replaced an earlier single-property
// "New Property" spotlight — rather than a dedicated section for one
// listing, it shows a small mixed set (the latest listing plus properties
// flagged `featured` as fast-selling) with "New"/"Fast Selling" tags on the
// cards themselves. Why Choose Aceroyal originally lived inside Who We Are
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
      <Reveal><PropertyShowcase /></Reveal>
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
