import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./ServiceWhy.module.css";

export default function ServiceWhy({ content }) {
  const { badge, title, body, cta, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.header}>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> {badge}
        </span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        {cta ? (
          <Link className={styles.cta} to={cta.href}>
            {cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.title} className={`${styles.card} interactiveCard`}>
            <span className={styles.number} aria-hidden="true">
              {card.number}
            </span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
