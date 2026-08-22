import { useEffect, useState } from "react";
import SEO from "../components/common/SEO";
import PageHero, { CTABand } from "../components/common/PageHero";
import FeatureList from "../components/common/FeatureList";
import PageShell from "../components/layout/PageShell/PageShell";
import FacadeSolutions from "../components/trades/FacadeSolutions";
import { constructionContent } from "../content/siteContent";
import { api, mediaUrl } from "../api/client";

function categoryLabel(category) {
  const value = String(category || "").trim();
  if (!value) return "Solution";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const DEFAULT_CHROME = {
  eyebrow: "Our Construction Solutions",
  title: "Purpose-Built Systems for Live Construction Work.",
  body: "From field capture to automation and project intelligence, these solutions address the points where construction teams lose time and clarity.",
};

export default function ConstructionSolution() {
  const { meta, hero, painPoints, capabilities, cta } = constructionContent;
  const [solutionCards, setSolutionCards] = useState([]);
  const [sectionChrome, setSectionChrome] = useState(DEFAULT_CHROME);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      api.getSolutions("?trade=construction"),
      api.getPageContent("constructionSolutions").catch(() => null),
    ])
      .then(([rows, chrome]) => {
        if (!alive) return;
        setSolutionCards(
          (rows || []).map((row) => ({
            badge: categoryLabel(row.category),
            title: row.name,
            body: row.shortDescription || row.description || "",
            href: `/solutions/${row.slug}`,
            ctaLabel: "View Solution",
            image: mediaUrl(row.hero?.mockup?.url || row.image),
          }))
        );
        if (chrome) {
          setSectionChrome({
            eyebrow: chrome.eyebrow || DEFAULT_CHROME.eyebrow,
            title: chrome.title || DEFAULT_CHROME.title,
            body: chrome.body || DEFAULT_CHROME.body,
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
  }, []);

  return (
    <PageShell atmosphere="construction">
      <SEO
        title={meta.title}
        description={meta.description}
        path="/case-studies/construction"
      />
      <PageHero {...hero} />
      <FeatureList
        title={painPoints.title}
        items={painPoints.items}
        variant="bullets"
        tone="light"
      />
      <FeatureList title={capabilities.title} items={capabilities.items} tone="dark" />
      {loadError ? <p style={{ textAlign: "center", padding: 24 }}>{loadError}</p> : null}
      <FacadeSolutions content={{ ...sectionChrome, cards: solutionCards }} />
      <CTABand title={cta.title} body={cta.body} href={cta.href} label={cta.label} />
    </PageShell>
  );
}
