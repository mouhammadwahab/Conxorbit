import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./CaseStudyCta.module.css";

export default function CaseStudyCta({ content, solutionName, solutionHref }) {
  const name = solutionName || "the solution";
  const title = content?.title || `See ${name} in more detail.`;
  const body =
    content?.body ||
    "Explore the full solution, its capabilities and the workflow it was designed around.";
  const primary = {
    label: content?.primary?.label || "View Solution",
    href: content?.primary?.href || solutionHref || "/solutions",
  };
  const secondary = {
    label: content?.secondary?.label || "Explore More Case Studies",
    href: content?.secondary?.href || "/portfolio",
  };

  return (
    <Reveal as="section" className={styles.section} aria-label="Explore the solution">
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <p className={styles.badge}>Explore the Solution</p>
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
        <div className={styles.actions}>
          <Link className={`${styles.primary} btnMotion`} to={primary.href}>
            <span>{primary.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link className={`${styles.secondary} linkDraw`} to={secondary.href}>
            <span>{secondary.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
