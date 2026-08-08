import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./SolutionDetailHero.module.css";

export default function SolutionDetailHero({ solution }) {
  const { name, badge, image, detail } = solution;
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

  const scrollToDemo = (event) => {
    event.preventDefault();
    const target = document.getElementById(demoCta?.targetId || "demo");
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={name}>
      <div className={`${styles.copy} heroStagger`}>
        <div className={styles.badges}>
          {badge ? <span className={styles.systemBadge}>{badge}</span> : null}
          {badge ? <span className={styles.badgeRule} aria-hidden="true" /> : null}
          <p className={styles.eyebrow}>{name}</p>
        </div>
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
              <span aria-hidden="true">▶</span>
              <span>{demoCta.label}</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.media}>
        <div className={`${styles.frame} interactiveCard mediaZoom`}>
          <img src={image} alt="" loading="eager" />
        </div>
      </div>
    </Reveal>
  );
}
