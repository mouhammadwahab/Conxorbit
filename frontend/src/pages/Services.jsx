import SEO from "../components/common/SEO";
import PageHero, { CTABand } from "../components/common/PageHero";
import ConnectedStoryline from "../components/animations/ConnectedStoryline";
import PageShell from "../components/layout/PageShell/PageShell";
import { servicesContent } from "../content/siteContent";

export default function Services() {
  const { meta, hero, steps, cta } = servicesContent;

  return (
    <PageShell atmosphere="services">
      <SEO title={meta.title} description={meta.description} path="/services" />
      <PageHero {...hero} />
      <ConnectedStoryline
        eyebrow="What we do"
        title="Three services. One delivery team."
        body="A connected path from custom software to AI and the websites that represent your work."
        steps={steps}
        tone="light"
      />
      <CTABand title={cta.title} body={cta.body} href={cta.href} label={cta.label} />
    </PageShell>
  );
}
