import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import TiltCard from "../components/common/TiltCard";
import PageShell from "../components/layout/PageShell/PageShell";
import useInView from "../hooks/useInView";
import { partnersContent } from "../content/siteContent";
import styles from "./Partners.module.css";

export default function Partners() {
  const { meta, hero, partners } = partnersContent;
  const [ref, visible] = useInView();

  return (
    <PageShell atmosphere="partners">
      <SEO title={meta.title} description={meta.description} path="/partners" />
      <PageHero {...hero} />
      <section
        ref={ref}
        className={`${styles.section} toneLight ${visible ? `${styles.visible} visible` : styles.hidden}`}
      >
        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <TiltCard
              key={partner.name}
              as="article"
              className={`${styles.card} interactiveCard cardReveal`}
              max={11}
              scale={1.03}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={styles.logoPlaceholder} aria-hidden="true">
                {partner.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <h2>{partner.name}</h2>
              <p>{partner.description}</p>
              {partner.link && partner.link !== "#" ? (
                <a className="linkDraw" href={partner.link} target="_blank" rel="noreferrer">
                  Visit →
                </a>
              ) : (
                <span className={styles.soon}>Link coming soon</span>
              )}
            </TiltCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
