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
import { portfolioContent as staticPortfolio } from "../content/portfolioContent";
import { api, mediaUrl } from "../api/client";
import styles from "./Portfolio.module.css";

function pickChrome(pageChrome) {
  const src = pageChrome || staticPortfolio;
  return {
    meta: src.meta || staticPortfolio.meta,
    hero: src.hero || staticPortfolio.hero,
    featured: src.featured || staticPortfolio.featured,
    proof: src.proof || staticPortfolio.proof,
    clientSystems: {
      ...(staticPortfolio.clientSystems || {}),
      ...(src.clientSystems || {}),
      items: [],
    },
    internalProducts: {
      ...(staticPortfolio.internalProducts || {}),
      ...(src.internalProducts || {}),
      cards: [],
    },
    workflowSolutions: {
      ...(staticPortfolio.workflowSolutions || {}),
      ...(src.workflowSolutions || {}),
      cards: [],
    },
    industries: src.industries || staticPortfolio.industries,
    cta: src.cta || staticPortfolio.cta,
    featuredSlug: src.featuredSlug || "panel-x",
  };
}

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSlug, setActiveSlug] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [pageChrome, setPageChrome] = useState(null);
  const [chromeReady, setChromeReady] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      api.getSolutions("?forPortfolio=1"),
      api.getCaseStudies(),
      api.getPageContent("portfolio").catch(() => null),
    ])
      .then(([sols, cases, chrome]) => {
        if (!alive) return;
        setSolutions(sols || []);
        setCaseStudies(cases || []);
        setPageChrome(chrome);
        setLoadError("");
        setChromeReady(true);
      })
      .catch((err) => {
        if (!alive) return;
        setSolutions([]);
        setCaseStudies([]);
        setPageChrome(null);
        setChromeReady(true);
        setLoadError(err.message || "Failed to load portfolio data from API.");
      });
    return () => {
      alive = false;
    };
  }, []);

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
    featuredSlug,
  } = useMemo(() => pickChrome(pageChrome), [pageChrome]);

  const studiesBySlug = useMemo(() => {
    const map = new Map();
    caseStudies.forEach((item) => map.set(item.slug, item));
    return map;
  }, [caseStudies]);

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
    (href) => {
      const match = String(href || "").match(/\/case-studies\/([^/?#]+)/);
      if (match) openCaseStudy(match[1]);
    },
    [openCaseStudy]
  );

  const byCategory = useMemo(() => {
    const groups = {
      client_system: [],
      internal_product: [],
      workflow_solution: [],
    };
    solutions.forEach((row) => {
      if (groups[row.portfolioCategory]) groups[row.portfolioCategory].push(row);
    });
    return groups;
  }, [solutions]);

  const featuredContent = useMemo(() => {
    const featuredRow =
      solutions.find((row) => row.slug === featuredSlug) ||
      byCategory.client_system.find((row) => row.slug === "panel-x");
    if (!featuredRow) return featured;
    return {
      ...featured,
      name: featuredRow.name,
      body: featuredRow.portfolioBody || featuredRow.description,
      tags: featuredRow.categories || featured.tags,
      image: mediaUrl(featuredRow.portfolioImage || featuredRow.image) || featured.image,
      cta: featuredRow.caseStudySlug
        ? { label: "Explore Case Study", href: `/case-studies/${featuredRow.caseStudySlug}` }
        : featured.cta,
    };
  }, [byCategory, featured, featuredSlug, solutions]);

  const clientSystemsContent = useMemo(() => {
    const items = byCategory.client_system.map((row, index, arr) => ({
      index: `${String(index + 1).padStart(2, "0")} / ${String(arr.length).padStart(2, "0")}`,
      name: row.name,
      body: row.portfolioBody || row.description,
      tags: row.categories || [],
      badge: row.portfolioLabel || "CLIENT SYSTEM",
      confidential: row.confidential,
      confidentialLabel: row.confidentialLabel,
      image: mediaUrl(row.portfolioImage || row.image),
      cta: row.caseStudySlug
        ? { label: "View Case Study", href: `/case-studies/${row.caseStudySlug}` }
        : row.showOnListing
          ? { label: "View Solution", href: `/solutions/${row.slug}` }
          : null,
    }));
    return { ...clientSystems, items };
  }, [byCategory, clientSystems]);

  const internalContent = useMemo(() => {
    const cards = byCategory.internal_product.map((row) => ({
      label: row.portfolioLabel || "INTERNAL PRODUCT",
      status: row.portfolioStatus || "In Development",
      name: row.name,
      body: row.portfolioBody || row.description,
      tags: row.categories || [],
      href: `/solutions/${row.slug}`,
      image: mediaUrl(row.portfolioImage || row.image),
    }));
    return { ...internalProducts, cards };
  }, [byCategory, internalProducts]);

  const workflowContent = useMemo(() => {
    const cards = byCategory.workflow_solution.map((row) => ({
      label: row.portfolioLabel || "WORKFLOW SOLUTION",
      status: row.portfolioStatus || "Capability",
      name: row.name,
      body: row.portfolioBody || row.description,
      tags: row.categories || [],
      href: `/solutions/${row.slug}`,
      image: mediaUrl(row.portfolioImage || row.image),
    }));
    return { ...workflowSolutions, cards };
  }, [byCategory, workflowSolutions]);

  const activeStudy = activeSlug ? studiesBySlug.get(activeSlug) : null;

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/portfolio" />
      <div className={styles.page}>
        {chromeReady ? <PortfolioHero content={hero} /> : null}
        {loadError ? (
          <p style={{ textAlign: "center", padding: 24 }}>{loadError}</p>
        ) : null}
        <PortfolioFeatured content={featuredContent} onOpenCaseStudy={openFromHref} />
        <PortfolioProof content={proof} />
        <PortfolioClientSystems content={clientSystemsContent} onOpenCaseStudy={openFromHref} />
        <PortfolioProductGrid content={internalContent} />
        <PortfolioProductGrid content={workflowContent} key="workflow-solutions" />
        <PortfolioIndustries content={industries} />
        <SolutionsFinalCta content={cta} />
      </div>
      <CaseStudyModal study={activeStudy} open={Boolean(activeStudy)} onClose={closeCaseStudy} />
    </PageShell>
  );
}
