import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./PortfolioProductGrid.module.css";

export default function PortfolioProductGrid({ content }) {
  if (!content) return null;
  const { badge, title, body, cards = [] } = content;

  return (
    <section className={styles.section} aria-label={badge}>
      <Reveal className={`${styles.header} revealHead`} eager>
        <span className={styles.badge}>
          <span aria-hidden="true">◆</span> {badge}
          <span className={styles.badgeRule} aria-hidden="true" />
        </span>
        <h2 className={styles.title}>{title}</h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </Reveal>

      <Reveal className={styles.gridWrap} eager>
        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.name} className={`${styles.card} interactiveCard cardReveal`}>
              <div className={styles.cardTop}>
                <span className={styles.label}>{card.label}</span>
                {card.status ? (
                  <span className={styles.status}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {card.status}
                  </span>
                ) : null}
              </div>
              <div className={styles.media}>
                <img src={card.image} alt="" loading="lazy" />
              </div>
              <h3 className={styles.name}>{card.name}</h3>
              {card.body ? <p className={styles.cardBody}>{card.body}</p> : null}
              <div className={styles.tags}>
                {(card.tags || []).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {card.href ? (
                <Link className={`${styles.cta} btnMotion`} to={card.href}>
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
