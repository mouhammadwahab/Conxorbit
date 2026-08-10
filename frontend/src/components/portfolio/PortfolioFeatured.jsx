import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./PortfolioFeatured.module.css";

export default function PortfolioFeatured({ content }) {
  if (!content) return null;
  const { badge, label, name, title, body, tags = [], cta, image, imageFallback } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={`${styles.copy} revealHead`}>
            <SectionBadge>{badge}</SectionBadge>
            <span className={styles.label}>
              {label}
              <span className={styles.labelRule} aria-hidden="true" />
            </span>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.title}>{title}</p>
            {body ? <p className={styles.body}>{body}</p> : null}
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {cta ? (
              <Link className={`${styles.cta} linkDraw`} to={cta.href}>
                {cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
          <div className={`${styles.media} mediaZoom`}>
            <img src={image || imageFallback} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
