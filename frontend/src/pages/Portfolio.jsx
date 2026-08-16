import { useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioFeatured from "../components/portfolio/PortfolioFeatured";
import PortfolioProof from "../components/portfolio/PortfolioProof";
import PortfolioClientSystems from "../components/portfolio/PortfolioClientSystems";
import PortfolioProductGrid from "../components/portfolio/PortfolioProductGrid";
import PortfolioIndustries from "../components/portfolio/PortfolioIndustries";
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
  const [searchParams] = useSearchParams();
  const caseRedirect = searchParams.get("case");
  const [solutions, setSolutions] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [pageChrome, setPageChrome] = useState(null);
  const [chromeReady, setChromeReady] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      api.getSolutions("?forPortfolio=1"),
      api.getPageContent("portfolio").catch(() => null),
    ])
      .then(([sols, chrome]) => {
        if (!alive) return;
        setSolutions(sols || []);
        setPageChrome(chrome);
        setLoadError("");
        setChromeReady(true);
      })
      .catch((err) => {
        if (!alive) return;
        setSolutions([]);
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

  const byCategory = useMemo(() => {
    const groups = {
      client_system: [],
      internal_product: [],
      workflow_solution: [],
    };
    const mapKey = {
      "client-system": "client_system",
      "internal-product": "internal_product",
      "workflow-solution": "workflow_solution",
    };
    solutions.forEach((row) => {
      const key = mapKey[row.category] || row.portfolioCategory;
      if (groups[key]) groups[key].push(row);
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
      cta: featured.cta,
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
      cta: { label: "View Solution", href: `/solutions/${row.slug}` },
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

  if (caseRedirect) {
    return <Navigate to={`/case-studies/${encodeURIComponent(caseRedirect)}`} replace />;
  }

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/portfolio" />
      <div className={styles.page}>
        {chromeReady ? <PortfolioHero content={hero} /> : null}
        {loadError ? (
          <p style={{ textAlign: "center", padding: 24 }}>{loadError}</p>
        ) : null}
        <PortfolioFeatured content={featuredContent} />
        <PortfolioProof content={proof} />
        <PortfolioClientSystems content={clientSystemsContent} />
        <PortfolioProductGrid content={internalContent} />
        <PortfolioProductGrid content={workflowContent} key="workflow-solutions" />
        <PortfolioIndustries content={industries} />
        <SolutionsFinalCta content={cta} />
      </div>
    </PageShell>
  );
}
