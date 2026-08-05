import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import TiltCard from "../components/common/TiltCard";
import PageShell from "../components/layout/PageShell/PageShell";
import useInView from "../hooks/useInView";
import { caseStudiesContent } from "../content/siteContent";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const { meta, hero, items } = caseStudiesContent;
  const [ref, visible] = useInView();

  return (
    <PageShell atmosphere="cases">
      <SEO title={meta.title} description={meta.description} path="/case-studies" />
      <PageHero {...hero} />
      <section
        ref={ref}
        className={`${styles.section} toneLight ${visible ? styles.visible : styles.hidden}`}
      >
        <div className={styles.grid}>
          {items.map((item, index) => (
            <TiltCard
              key={item.slug}
              className={styles.cardTilt}
              max={6}
              scale={1.015}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Link to={`/case-studies/${item.slug}`} className={styles.card}>
                <span>{item.industry}</span>
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
