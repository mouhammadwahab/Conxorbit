import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import PageShell from "../components/layout/PageShell/PageShell";
import { caseStudiesContent } from "../content/siteContent";
import styles from "./CaseStudyDetail.module.css";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const item = caseStudiesContent.items.find((c) => c.slug === slug);

  if (!item) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <PageShell atmosphere="cases">
      <SEO
        title={`${item.title} — ConX Orbit`}
        description={item.summary}
        path={`/case-studies/${item.slug}`}
      />
      <article className={`${styles.page} toneLight`}>
        <Link className={`${styles.back} linkDraw`} to="/case-studies">
          ← All case studies
        </Link>
        <p className={styles.industry}>{item.industry}</p>
        <h1>{item.title}</h1>
        <p className={styles.summary}>{item.summary}</p>

        <Reveal as="div" className={styles.blocks}>
          <section className={`${styles.blockCard} interactiveCard cardReveal`}>
            <h2>Problem</h2>
            <p>{item.problem}</p>
          </section>
          <section className={`${styles.blockCard} interactiveCard cardReveal`}>
            <h2>What we built</h2>
            <p>{item.built}</p>
          </section>
          <section className={`${styles.blockCard} interactiveCard cardReveal`}>
            <h2>Result</h2>
            <p>{item.result}</p>
          </section>
        </Reveal>

        <blockquote className={`${styles.quote} interactiveCard`}>
          <p>“{item.quote.text}”</p>
          <cite>— {item.quote.author}</cite>
        </blockquote>
      </article>
    </PageShell>
  );
}
