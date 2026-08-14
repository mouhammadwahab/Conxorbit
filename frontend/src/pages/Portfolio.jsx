import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioFeatured from "../components/portfolio/PortfolioFeatured";
import PortfolioProof from "../components/portfolio/PortfolioProof";
import PortfolioClientSystems from "../components/portfolio/PortfolioClientSystems";
import PortfolioProductGrid from "../components/portfolio/PortfolioProductGrid";
import PortfolioIndustries from "../components/portfolio/PortfolioIndustries";
import CaseStudyModal from "../components/portfolio/CaseStudyModal";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import { portfolioContent } from "../content/portfolioContent";
import { caseStudiesContent } from "../content/siteContent";
import styles from "./Portfolio.module.css";

function slugFromCaseHref(href) {
  if (!href) return null;
  const match = String(href).match(/\/case-studies\/([^/?#]+)/);
  return match?.[1] || null;
}

export default function Portfolio() {
  const {
    meta,
    hero,
    featured,
    proof,
    clientSystems,
    internalProducts,
    workflowSolutions,
    industries,
    cta,
  } = portfolioContent;

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSlug, setActiveSlug] = useState(null);

  const studiesBySlug = useMemo(() => {
    const map = new Map();
    (caseStudiesContent.items || []).forEach((item) => map.set(item.slug, item));
    return map;
  }, []);

  useEffect(() => {
    const fromQuery = searchParams.get("case");
    if (fromQuery && studiesBySlug.has(fromQuery)) {
      setActiveSlug(fromQuery);
    }
  }, [searchParams, studiesBySlug]);

  const openCaseStudy = useCallback(
    (slug) => {
      if (!slug || !studiesBySlug.has(slug)) return;
      setActiveSlug(slug);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("case", slug);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams, studiesBySlug]
  );

  const closeCaseStudy = useCallback(() => {
    setActiveSlug(null);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("case");
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const openFromHref = useCallback(
    (href) => openCaseStudy(slugFromCaseHref(href)),
    [openCaseStudy]
  );

  const activeStudy = activeSlug ? studiesBySlug.get(activeSlug) : null;

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/portfolio" />
      <div className={styles.page}>
        <PortfolioHero content={hero} />
        <PortfolioFeatured content={featured} onOpenCaseStudy={openFromHref} />
        <PortfolioProof content={proof} />
        <PortfolioClientSystems content={clientSystems} onOpenCaseStudy={openFromHref} />
        <PortfolioProductGrid content={internalProducts} />
        <PortfolioProductGrid content={workflowSolutions} key="workflow-solutions" />
        <PortfolioIndustries content={industries} />
        <SolutionsFinalCta content={cta} />
      </div>
      <CaseStudyModal study={activeStudy} open={Boolean(activeStudy)} onClose={closeCaseStudy} />
    </PageShell>
  );
}
