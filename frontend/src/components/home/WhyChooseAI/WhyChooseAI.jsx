import styles from "./WhyChooseAI.module.css";

const ICONS = {
  decisions: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M14 3v5h5M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4.5L15 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9.5 12.5l1.8 1.8 3.7-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  cost: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19V10M10 19V6M15 19v-7M20 19V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  future: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 19c.8-2.8 2.8-4.2 5-4.2s4.2 1.4 5 4.2M13.2 14.2c1.1-.5 2.4-.5 3.8.2 1.4.8 2.3 2.2 2.7 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/** Why Choose AI — CSS sticky stacked cards (no GSAP pin). */
export default function WhyChooseAI({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body, cards = [] } = content;

  return (
    <section className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.badge}>
              <span className={styles.star} aria-hidden="true">
                ✦
              </span>
              {badge}
            </span>
            <h2>
              {titleBefore}
              <span className={styles.highlight}>{titleHighlight}</span>
              {titleAfter}
            </h2>
            <span className={styles.rule} aria-hidden="true" />
            <p>{body}</p>
          </div>

          <div className={styles.stage}>
            {cards.map((card, index) => (
              <article
                key={card.title}
                className={`${styles.card} ${styles[card.accent] || ""} interactiveCard`}
                style={{ zIndex: index + 1, top: `calc(96px + ${index * 14}px)` }}
              >
                <span className={styles.icon}>{ICONS[card.icon] || ICONS.decisions}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
