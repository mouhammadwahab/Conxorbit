import SEO from "../components/common/SEO";
import { CTABand } from "../components/common/PageHero";
import Hero from "../components/hero/Hero/Hero";
import TradeShowcase from "../components/hero/TradeShowcase/TradeShowcase";
import ProofStrip from "../components/hero/ProofStrip/ProofStrip";
import WhyChooseAI from "../components/home/WhyChooseAI/WhyChooseAI";
import ServicesTabs from "../components/home/ServicesTabs/ServicesTabs";
import FeaturedSolutions from "../components/home/FeaturedSolutions/FeaturedSolutions";
import FrameworkStoryline from "../components/home/FrameworkStoryline/FrameworkStoryline";
import WhyWorkWithUs from "../components/home/WhyWorkWithUs/WhyWorkWithUs";
import FAQAccordion from "../components/home/FAQAccordion/FAQAccordion";
import Testimonials from "../components/home/Testimonials/Testimonials";
import { homeContent } from "../content/siteContent";

export default function Home() {
  const {
    meta,
    hero,
    whyChooseAi,
    services,
    featuredSolutions,
    framework,
    proof,
    whyWorkWithUs,
    faq,
    testimonials,
    closingCta,
  } = homeContent;

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/" />
      <Hero content={hero} />
      <TradeShowcase />
      <WhyChooseAI content={whyChooseAi} />
      <ServicesTabs content={services} />
      <FeaturedSolutions content={featuredSolutions} />
      <FrameworkStoryline content={framework} />
      <ProofStrip content={proof} />
      <WhyWorkWithUs content={whyWorkWithUs} />
      <FAQAccordion content={faq} />
      <Testimonials content={testimonials} />
      <CTABand
        title={closingCta.title}
        body={closingCta.body}
        href={closingCta.cta.href}
        label={closingCta.cta.label}
      />
    </>
  );
}
