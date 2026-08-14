import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./FacadeSolutions.module.css";

export default function FacadeSolutions({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, cards = [] } = content;
  if (!cards.length) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label={eyebrow || title}>
      <div className={styles.inner}>
        <div className={`${styles.header} revealHead`}>
          {eyebrow ? (
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.href || card.title} className={`${styles.card} interactiveCard cardReveal`}>
              {card.badge ? <span className={styles.badge}>{card.badge}</span> : null}
              {card.image ? (
                <div className={`${styles.media} mediaZoom`}>
                  <img src={card.image} alt="" loading="lazy" />
                </div>
              ) : null}
              <h3>{card.title}</h3>
              {card.body ? <p>{card.body}</p> : null}
              <Link className={`${styles.cta} btnMotion`} to={card.href}>
                <span>{card.ctaLabel || "View Solution"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
