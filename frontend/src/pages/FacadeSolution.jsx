import { useEffect, useState } from "react";
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
import { api, mediaUrl } from "../api/client";

export default function FacadeSolution() {
  const { meta, hero, workflow, complexity, panelX, solutions, aiWorkflow, cta } = facadeContent;
  const [solutionCards, setSolutionCards] = useState([]);
  const [sectionChrome, setSectionChrome] = useState({
    eyebrow: solutions?.eyebrow,
    title: solutions?.title,
    body: solutions?.body,
  });
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      api.getSolutions("?trade=facade"),
      api.getPageContent("facadeSolutions").catch(() => null),
    ])
      .then(([rows, chrome]) => {
        if (!alive) return;
        setSolutionCards(
          (rows || []).map((row) => ({
            badge: row.listingBadge || row.badge,
            title: row.name,
            body: row.portfolioBody || row.description,
            href: `/solutions/${row.slug}`,
            ctaLabel: "View Solution",
            image: mediaUrl(row.image),
          }))
        );
        if (chrome) {
          setSectionChrome({
            eyebrow: chrome.eyebrow || solutions?.eyebrow,
            title: chrome.title || solutions?.title,
            body: chrome.body || solutions?.body,
          });
        }
        setLoadError("");
      })
      .catch((err) => {
        if (!alive) return;
        setSolutionCards([]);
        setLoadError(err.message || "Failed to load related solutions.");
      });
    return () => {
      alive = false;
    };
  }, [solutions]);

  const solutionsContent = {
    ...sectionChrome,
    cards: solutionCards,
  };

  return (
    <PageShell atmosphere="facade">
      <SEO title={meta.title} description={meta.description} path="/case-studies/facade" />
      <FacadeTradeHero content={hero} />
      <FacadeWorkflow content={workflow} />
      <FacadeComplexity content={complexity} />
      <FacadePanelX content={panelX} />
      {loadError ? <p style={{ textAlign: "center", padding: 24 }}>{loadError}</p> : null}
      <FacadeSolutions content={solutionsContent} />
      <FacadeAIWorkflow content={aiWorkflow} />
      <FacadeCTA content={cta} />
    </PageShell>
  );
}
