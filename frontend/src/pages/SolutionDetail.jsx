import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import SolutionDetailHero from "../components/solutions/SolutionDetailHero";
import SolutionStats from "../components/solutions/SolutionStats";
import SolutionChallenge from "../components/solutions/SolutionChallenge";
import SolutionCapabilities from "../components/solutions/SolutionCapabilities";
import SolutionHowItWorks from "../components/solutions/SolutionHowItWorks";
import SolutionBuiltFor from "../components/solutions/SolutionBuiltFor";
import SolutionDemo from "../components/solutions/SolutionDemo";
import SolutionMore from "../components/solutions/SolutionMore";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import FAQAccordion from "../components/home/FAQAccordion/FAQAccordion";
import { api, mediaUrl } from "../api/client";
import styles from "./SolutionDetail.module.css";

function normalizeSolution(item) {
  const detail = { ...(item.detail || {}) };
  if (detail.heroImage) detail.heroImage = mediaUrl(detail.heroImage);
  if (detail.demo) {
    detail.demo = {
      ...detail.demo,
      posterSrc: mediaUrl(detail.demo.posterSrc),
    };
  }
  return {
    ...item,
    badge: item.listingBadge || item.badge,
    image: mediaUrl(item.image),
    detail,
  };
}

export default function SolutionDetail() {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    (async () => {
      try {
        const item = await api.getSolution(slug);
        if (!alive) return;
        const normalized = normalizeSolution(item);
        setSolution(normalized);
        const slugs = item.detail?.more?.slugs || [];
        if (slugs.length) {
          const all = await api.getSolutions();
          if (!alive) return;
          setRelated(
            all.filter((row) => slugs.includes(row.slug)).map(normalizeSolution)
          );
        } else {
          setRelated([]);
        }
        setStatus("ready");
      } catch {
        if (alive) setStatus("missing");
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === "missing") {
    return <Navigate to="/solutions" replace />;
  }

  if (status === "loading" || !solution) {
    return (
      <PageShell atmosphere="products">
        <div className={styles.page} style={{ padding: "120px 24px", textAlign: "center" }}>
          Loading…
        </div>
      </PageShell>
    );
  }

  const { detail } = solution;
  const seoTitle = solution.seo?.title || `${solution.name} — ConX Orbit`;
  const seoDescription = solution.seo?.description || solution.description;

  return (
    <PageShell atmosphere="products">
      <SEO title={seoTitle} description={seoDescription} path={`/solutions/${solution.slug}`} />
      <div className={styles.page}>
        <SolutionDetailHero solution={solution} />
        <SolutionStats stats={detail.stats} />
        <SolutionChallenge content={detail.challenge} />
        <SolutionCapabilities content={detail.capabilities} />
        <SolutionHowItWorks content={detail.howItWorks} />
        <SolutionBuiltFor content={detail.builtFor} />
        <SolutionDemo content={detail.demo} fallbackPoster={solution.image} />
        <SolutionMore content={detail.more} items={related} />
        {detail.faq ? <FAQAccordion content={{ ...detail.faq, badge: "FAQ" }} /> : null}
        {detail.cta ? (
          <SolutionsFinalCta content={{ ...detail.cta, badge: "EXPLORE WHAT'S POSSIBLE" }} />
        ) : null}
      </div>
    </PageShell>
  );
}
