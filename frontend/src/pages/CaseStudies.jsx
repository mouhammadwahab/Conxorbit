import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import TiltCard from "../components/common/TiltCard";
import PageShell from "../components/layout/PageShell/PageShell";
import useInView from "../hooks/useInView";
import { caseStudiesContent } from "../content/siteContent";
import { api } from "../api/client";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const { meta, hero } = caseStudiesContent;
  const [ref, visible] = useInView();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api
      .getCaseStudies()
      .then((rows) => {
        if (!alive) return;
        setItems(
          (rows || []).map((row) => ({
            slug: row.slug,
            title: row.title,
            summary: row.shortDescription || "",
            industry: row.industry || row.category || row.trade || "Case study",
          }))
        );
        setError("");
      })
      .catch((err) => {
        if (!alive) return;
        setItems([]);
        setError(err.message || "Failed to load case studies");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/case-studies" />
      <PageHero {...hero} />
      <section
        ref={ref}
        className={`${styles.section} toneLight ${visible ? `${styles.visible} visible` : styles.hidden}`}
      >
        {error ? <p className={styles.empty}>{error}</p> : null}
        {loading ? <p className={styles.empty}>Loading case studies…</p> : null}
        {!loading && !error && !items.length ? (
          <p className={styles.empty}>No published case studies yet.</p>
        ) : null}
        <div className={styles.grid}>
          {items.map((item, index) => (
            <TiltCard
              key={item.slug}
              as="article"
              className={`${styles.card} interactiveCard cardReveal`}
              max={11}
              scale={1.03}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <Link to={`/case-studies/${item.slug}`} className={styles.cardLink}>
                <span className={styles.badge}>{item.industry}</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
