import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import FacadeTradeHero from "../components/trades/FacadeTradeHero";
import FacadeWorkflow from "../components/trades/FacadeWorkflow";
import FacadeComplexity from "../components/trades/FacadeComplexity";
import FacadePanelX from "../components/trades/FacadePanelX";
import FacadeSolutions from "../components/trades/FacadeSolutions";
import FacadeAIWorkflow from "../components/trades/FacadeAIWorkflow";
import FacadeCTA from "../components/trades/FacadeCTA";
import { facadeContent } from "../content/siteContent";

export default function FacadeSolution() {
  const { meta, hero, workflow, complexity, panelX, solutions, aiWorkflow, cta } = facadeContent;

  return (
    <PageShell atmosphere="facade">
      <SEO title={meta.title} description={meta.description} path="/case-studies/facade" />
      <FacadeTradeHero content={hero} />
      <FacadeWorkflow content={workflow} />
      <FacadeComplexity content={complexity} />
      <FacadePanelX content={panelX} />
      <FacadeSolutions content={solutions} />
      <FacadeAIWorkflow content={aiWorkflow} />
      <FacadeCTA content={cta} />
    </PageShell>
  );
}
