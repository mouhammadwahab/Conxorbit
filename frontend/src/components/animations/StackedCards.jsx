import SectionBadge from "../common/SectionBadge";
import styles from "./StackedCards.module.css";

/**
 * CSS sticky stack — no GSAP pin (avoids React removeChild crashes).
 * tone: "dark" (default) | "light" for white-section surfaces
 */
export default function StackedCards({ eyebrow, title, cards = [], tone = "dark" }) {
  return (
    <section
      className={`${styles.section} ${tone === "light" ? styles.light : styles.dark}`}
    >
      <div className={styles.header}>
        {eyebrow ? (
          <SectionBadge as="p" tone={tone === "light" ? "light" : "dark"}>
            {eyebrow}
          </SectionBadge>
        ) : null}
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.stack}>
        {cards.map((card, index) => (
          <article
            key={card.title}
            className={`${styles.card} interactiveCard`}
            style={{ zIndex: index + 1, top: `calc(96px + ${index * 12}px)` }}
          >
            <span className={styles.step}>{card.step}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
