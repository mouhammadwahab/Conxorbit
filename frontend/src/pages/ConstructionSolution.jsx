import SEO from "../components/common/SEO";
import PageHero, { CTABand } from "../components/common/PageHero";
import FeatureList from "../components/common/FeatureList";
import PageShell from "../components/layout/PageShell/PageShell";
import { constructionContent } from "../content/siteContent";

export default function ConstructionSolution() {
  const { meta, hero, painPoints, capabilities, cta } = constructionContent;

  return (
    <PageShell atmosphere="construction">
      <SEO
        title={meta.title}
        description={meta.description}
        path="/solutions/construction"
      />
      <PageHero {...hero} />
      <FeatureList
        title={painPoints.title}
        items={painPoints.items}
        variant="bullets"
        tone="light"
      />
      <FeatureList title={capabilities.title} items={capabilities.items} tone="dark" />
      <CTABand title={cta.title} body={cta.body} href={cta.href} label={cta.label} />
    </PageShell>
  );
}
