import HeroSection from '@/components/home/HeroSection';
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection';
import CeoWelcomeSection from '@/components/home/CeoWelcomeSection';
import EstateSections from '@/components/home/EstateSections';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import PartnersSection from '@/components/home/PartnersSection';
import ComplianceSection from '@/components/home/ComplianceSection';
// import PromoSection from '@/components/home/PromoSection'; // see commented usage below
import AppDownloadSection from '@/components/home/AppDownloadSection';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import { CtaSection } from '@/components/home/CtaSection';
import { Reveal } from '@/components/motion/Reveal';

// Section order follows Daniel's specified homepage flow: Hero, Who We Are,
// CEO message, Our Developments, Our Success (testimonials), Why Choose
// Aceroyal, Our Partnership, Announcement, App Launch, Insights.
// Our Developments (EstateSections/FeaturedEstates) feeds off estates
// (fallbackEstates / the estates endpoint) — confirmed as the intended
// data source per Daniel, after a few property-based variants (a
// standalone section, a second row, properties as the card content
// itself) were tried and reverted. No new/fast-selling indicator is
// currently shown anywhere on the homepage. Why Choose Aceroyal originally
// lived inside Who We Are (folded in to avoid two consecutive "about the
// company" blocks) but was moved to its own section right after Our
// Success per Daniel's request.
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
      {/* Announcements carousel — commented out for go-live per Daniel's
          request; the fallbackPromos content (app launch, realtor program,
          inspection slots) isn't a real dated announcement, and this section
          is only meant to run when there's an actual one to show. Re-enable
          by uncommenting once real announcement content exists. */}
      {/* <Reveal><PromoSection /></Reveal> */}
      <Reveal><AppDownloadSection /></Reveal>
      <Reveal><LatestBlogPosts /></Reveal>
      <Reveal><CtaSection /></Reveal>
    </div>
  );
}
