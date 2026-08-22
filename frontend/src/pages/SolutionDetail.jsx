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
  const hero = {
    ...(item.hero || {}),
    mockup: {
      ...(item.hero?.mockup || {}),
      url: mediaUrl(item.hero?.mockup?.url || item.image),
    },
  };
  const demo = {
    ...(item.demo || {}),
    video: {
      ...(item.demo?.video || {}),
      url: mediaUrl(item.demo?.video?.url || item.demo?.videoUrl),
    },
  };
  return {
    ...item,
    image: mediaUrl(item.image),
    hero,
    demo,
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
        const relatedIds = new Set(
          (normalized.relatedSolutionIds || []).map((value) => String(value))
        );
        if (relatedIds.size) {
          const all = await api.getSolutions();
          if (!alive) return;
          setRelated(
            all
              .filter((row) => relatedIds.has(String(row._id)))
              .map(normalizeSolution)
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

  const seoTitle = solution.seo?.title || `${solution.name} — ConX Orbit`;
  const seoDescription = solution.seo?.description || solution.shortDescription;

  return (
    <PageShell atmosphere="products">
      <SEO title={seoTitle} description={seoDescription} path={`/solutions/${solution.slug}`} />
      <div className={styles.page}>
        <SolutionDetailHero solution={solution} />
        <SolutionStats stats={solution.snapshot} />
        <SolutionChallenge content={solution.challenge} />
        <SolutionCapabilities content={solution.capabilities} />
        <SolutionHowItWorks content={solution.howItWorks} />
        <SolutionBuiltFor content={solution.builtFor} />
        <SolutionDemo content={solution.demo} fallbackPoster={solution.hero?.mockup?.url || solution.image} />
        <SolutionMore items={related} />
        {Array.isArray(solution.faq) && solution.faq.length ? (
          <FAQAccordion
            content={{
              badge: "FAQ",
              titleBefore: "About ",
              titleHighlight: solution.name,
              titleAfter: "",
              items: solution.faq,
            }}
          />
        ) : null}
        {solution.cta ? (
          <SolutionsFinalCta
            content={{
              badge: "EXPLORE WHAT'S POSSIBLE",
              title: solution.cta.title,
              body: solution.cta.body,
              primary: { label: "Book a Discovery Call", href: "/book-discovery" },
              secondary: { label: "Explore Solutions", href: "/solutions" },
            }}
          />
        ) : null}
      </div>
    </PageShell>
  );
}
