import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import { getRelatedSolutions } from "../../content/solutionsContent";
import styles from "./SolutionMore.module.css";

export default function SolutionMore({ content }) {
  if (!content) return null;
  const { badge, title, slugs = [] } = content;
  const items = getRelatedSolutions(slugs);

  if (!items.length) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge variant="gold" size="sm">
          {badge}
        </SectionBadge>
        <h2>{title}</h2>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/solutions/${item.slug}`}
            className={`${styles.card} cardReveal`}
          >
            <div className={`${styles.media} mediaZoom`}>
              <span className={styles.tag}>{item.badge}</span>
              <img src={item.image} alt="" loading="lazy" />
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className={styles.cta}>
              Explore Solution
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
