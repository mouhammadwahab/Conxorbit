import SEO from "../components/common/SEO";
import { CTABand } from "../components/common/PageHero";
import Hero from "../components/hero/Hero/Hero";
import TradeShowcase from "../components/hero/TradeShowcase/TradeShowcase";
import WhyChooseAI from "../components/home/WhyChooseAI/WhyChooseAI";
import ServicesTabs from "../components/home/ServicesTabs/ServicesTabs";
import FeaturedSolutions from "../components/home/FeaturedSolutions/FeaturedSolutions";
import FrameworkStoryline from "../components/home/FrameworkStoryline/FrameworkStoryline";
import FeaturedCaseStudy from "../components/home/FeaturedCaseStudy/FeaturedCaseStudy";
import WhyWorkWithUs from "../components/home/WhyWorkWithUs/WhyWorkWithUs";
import FAQAccordion from "../components/home/FAQAccordion/FAQAccordion";
import Testimonials from "../components/home/Testimonials/Testimonials";
import { homeContent } from "../content/siteContent";

export default function Home() {
  const {
    meta,
    hero,
    tradeShowcase,
    whyChooseAi,
    services,
    featuredSolutions,
    framework,
    featuredCaseStudy,
    whyWorkWithUs,
    faq,
    testimonials,
    closingCta,
  } = homeContent;

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/" />
      <Hero content={hero} />
      <TradeShowcase content={tradeShowcase} />
      <WhyChooseAI content={whyChooseAi} />
      <ServicesTabs content={services} />
      <FeaturedSolutions content={featuredSolutions} />
      <FrameworkStoryline content={framework} />
      <FeaturedCaseStudy content={featuredCaseStudy} />
      <WhyWorkWithUs content={whyWorkWithUs} />
      <Testimonials content={testimonials} />
      <FAQAccordion content={faq} />
      <CTABand
        title={closingCta.title}
        body={closingCta.body}
        href={closingCta.primaryCta.href}
        label={closingCta.primaryCta.label}
        secondaryHref={closingCta.secondaryCta.href}
        secondaryLabel={closingCta.secondaryCta.label}
      />
    </>
  );
}
