import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./SolutionsGrid.module.css";

export default function SolutionsGrid({ items = [] }) {
  if (!items.length) {
    return (
      <p className={styles.empty} role="status">
        No solutions match your filters.
      </p>
    );
  }

  return (
    <Reveal as="div" className={styles.wrap}>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/solutions/${item.slug}`}
            className={`${styles.card} interactiveCard cardReveal`}
            aria-label={`View ${item.name} solution`}
          >
            <span className={styles.badge}>{item.badge}</span>
            <div className={`${styles.mockup} mediaZoom`}>
              <img src={item.image} alt="" loading="lazy" />
            </div>
            <h2>{item.name}</h2>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.tags}>
              {(item.categories || []).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <span className={styles.learnMore}>Learn More</span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
