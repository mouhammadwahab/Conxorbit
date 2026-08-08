import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioFeatured from "../components/portfolio/PortfolioFeatured";
import PortfolioProof from "../components/portfolio/PortfolioProof";
import PortfolioClientSystems from "../components/portfolio/PortfolioClientSystems";
import PortfolioApproach from "../components/portfolio/PortfolioApproach";
import PortfolioProductGrid from "../components/portfolio/PortfolioProductGrid";
import PortfolioIndustries from "../components/portfolio/PortfolioIndustries";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import { portfolioContent } from "../content/portfolioContent";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  const {
    meta,
    hero,
    featured,
    proof,
    clientSystems,
    approach,
    internalProducts,
    workflowSolutions,
    industries,
    cta,
  } = portfolioContent;

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/portfolio" />
      <div className={styles.page}>
        <PortfolioHero content={hero} />
        <PortfolioFeatured content={featured} />
        <PortfolioProof content={proof} />
        <PortfolioClientSystems content={clientSystems} />
        <PortfolioApproach content={approach} />
        <PortfolioProductGrid content={internalProducts} />
        <PortfolioProductGrid content={workflowSolutions} />
        <PortfolioIndustries content={industries} />
        <SolutionsFinalCta content={cta} />
      </div>
    </PageShell>
  );
}
