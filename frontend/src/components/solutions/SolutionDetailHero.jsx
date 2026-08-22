import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./SolutionDetailHero.module.css";

export default function SolutionDetailHero({ solution }) {
  const { name, image, hero, shortDescription } = solution;
  const {
    titleBefore,
    titleHighlight,
    titleAfter,
    description,
  } = hero || {};
  const reduced = usePrefersReducedMotion();
  const heroImage = hero?.mockup?.url || image;

  const scrollToDemo = (event) => {
    event.preventDefault();
    const target = document.getElementById("demo");
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={name}>
      <div className={`${styles.copy} heroStagger`}>
        <SectionBadge icon={false}>{name}</SectionBadge>
        <h1 className={styles.title}>
          {titleBefore}
          <span className={styles.highlight}>{titleHighlight || name}</span>
          {titleAfter}
        </h1>
        {shortDescription || description ? (
          <p className={styles.body}>{shortDescription || description}</p>
        ) : null}
        <div className={styles.actions}>
          <Link className={`${styles.primary} btnMotion`} to="/book-discovery">
            <span>Book a Discovery Call</span>
            <span aria-hidden="true">→</span>
          </Link>
          <button type="button" className={`${styles.secondary} btnMotion`} onClick={scrollToDemo}>
            <span className={styles.play} aria-hidden="true">
              ▶
            </span>
            <span>Watch Demo</span>
          </button>
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
