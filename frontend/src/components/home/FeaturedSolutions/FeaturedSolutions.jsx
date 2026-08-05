import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import styles from "./FeaturedSolutions.module.css";

export default function FeaturedSolutions({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.header}>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> {badge}
        </span>
        <h2>
          {titleBefore}
          <span className={styles.highlight}>{titleHighlight}</span>
          {titleAfter}
        </h2>
        {body ? <p>{body}</p> : null}
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.title} className={`${styles.card} interactiveCard`}>
            <span className={styles.cardBadge}>
              <span className={styles.dot} aria-hidden="true" />
              {card.badge}
            </span>
            <h3>{card.title}</h3>
            <ul>
              {card.points.map((point) => (
                <li key={point}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className={styles.ctaSlot}>
              <Link className={styles.cta} to={card.href}>
                {card.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
