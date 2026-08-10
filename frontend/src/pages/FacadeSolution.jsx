import SEO from "../components/common/SEO";
import FeatureList from "../components/common/FeatureList";
import PageShell from "../components/layout/PageShell/PageShell";
import FacadeTradeHero from "../components/trades/FacadeTradeHero";
import FacadeWorkflow from "../components/trades/FacadeWorkflow";
import FacadeComplexity from "../components/trades/FacadeComplexity";
import FacadePanelX from "../components/trades/FacadePanelX";
import FacadeSolutions from "../components/trades/FacadeSolutions";
import FacadeAIWorkflow from "../components/trades/FacadeAIWorkflow";
import FacadeCTA from "../components/trades/FacadeCTA";
import { facadeContent } from "../content/siteContent";
import styles from "./SolutionPage.module.css";

export default function FacadeSolution() {
  const {
    meta,
    hero,
    workflow,
    complexity,
    panelX,
    solutions,
    aiWorkflow,
    painPoints,
    platform,
    inDevelopment,
    cta,
  } = facadeContent;

  return (
    <PageShell atmosphere="facade">
      <SEO title={meta.title} description={meta.description} path="/case-studies/facade" />
      <FacadeTradeHero content={hero} />
      <FacadeWorkflow content={workflow} />
      <FacadeComplexity content={complexity} />
      <FacadePanelX content={panelX} />
      <FacadeSolutions content={solutions} />
      <FacadeAIWorkflow content={aiWorkflow} />
      <FeatureList
        title={painPoints.title}
        items={painPoints.items}
        variant="bullets"
        tone="light"
      />
      <FeatureList title={platform.title} items={platform.items} tone="dark" />
      <section className={`${styles.devBanner} toneDark`}>
        <div className={styles.devInner}>
          <span>In development</span>
          <h2>{inDevelopment.title}</h2>
          <p>{inDevelopment.body}</p>
        </div>
      </section>
      <FacadeCTA content={cta} />
    </PageShell>
  );
}
