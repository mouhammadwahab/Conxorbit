import Reveal from "../../common/Reveal";
import styles from "./WhyChooseAI.module.css";

const ICONS = {
  estimation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 16l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  revisions: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h10v14H7z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 4V3M14 4V3M10 18v3M14 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  reporting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  fabrication: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18h16M6 18V8l6-4 6 4v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 12h4M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

/** Why Choose AI — CSS sticky stacked cards (no GSAP pin). */
export default function WhyChooseAI({ content }) {
  const {
    badge,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    cards = [],
    closingLine,
  } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={`${styles.copy} revealHead`}>
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
                <span className={styles.icon}>{ICONS[card.icon] || ICONS.estimation}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
            {closingLine ? (
              <p className={styles.closingLine}>{closingLine}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
