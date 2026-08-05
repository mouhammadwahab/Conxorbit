import SEO from "../components/common/SEO";
import PageHero, { CTABand } from "../components/common/PageHero";
import FeatureList from "../components/common/FeatureList";
import PageShell from "../components/layout/PageShell/PageShell";
import { facadeContent } from "../content/siteContent";
import styles from "./SolutionPage.module.css";

export default function FacadeSolution() {
  const { meta, hero, painPoints, platform, inDevelopment, cta } = facadeContent;

  return (
    <PageShell atmosphere="facade">
      <SEO title={meta.title} description={meta.description} path="/solutions/facade" />
      <PageHero {...hero} />
      <FeatureList
        title={painPoints.title}
        items={painPoints.items}
        variant="bullets"
        tone="light"
      />
      <FeatureList title={platform.title} items={platform.items} tone="dark" />
      <section className={`${styles.devBanner} toneDark`}>
        <div className={`${styles.devInner} ${styles.card3d}`}>
          <span>In development</span>
          <h2>{inDevelopment.title}</h2>
          <p>{inDevelopment.body}</p>
        </div>
      </section>
      <CTABand title={cta.title} body={cta.body} href={cta.href} label={cta.label} />
    </PageShell>
  );
}
