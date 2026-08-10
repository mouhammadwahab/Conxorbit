import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./SolutionDetailHero.module.css";

export default function SolutionDetailHero({ solution }) {
  const { name, image, detail } = solution;
  const {
    title,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    primaryCta,
    demoCta,
  } = detail;
  const reduced = usePrefersReducedMotion();
  const heroImage = detail.heroImage || image;

  const scrollToDemo = (event) => {
    event.preventDefault();
    const target = document.getElementById(demoCta?.targetId || "demo");
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={name}>
      <div className={`${styles.copy} heroStagger`}>
        <SectionBadge>{name}</SectionBadge>
        <h1 className={styles.title}>
          {titleHighlight != null ? (
            <>
              {titleBefore}
              <span className={styles.highlight}>{titleHighlight}</span>
              {titleAfter}
            </>
          ) : (
            title
          )}
        </h1>
        {body ? <p className={styles.body}>{body}</p> : null}
        <div className={styles.actions}>
          {primaryCta ? (
            <Link className={`${styles.primary} btnMotion`} to={primaryCta.href}>
              <span>{primaryCta.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          {demoCta ? (
            <button type="button" className={`${styles.secondary} btnMotion`} onClick={scrollToDemo}>
              <span className={styles.play} aria-hidden="true">
                ▶
              </span>
              <span>{demoCta.label}</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.media}>
        <div className={`${styles.browser} interactiveCard`}>
          <div className={styles.chrome} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.url}>{name.toLowerCase().replace(/\s+/g, "")}.app</span>
          </div>
          <div className={`${styles.viewport} mediaZoom`}>
            <img src={heroImage} alt="" loading="eager" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
