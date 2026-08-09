import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./ServiceCapabilities.module.css";

const ICONS = {
  blueprint: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 8h20l8 8v24H10V8z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M30 8v8h8M16 22h16M16 28h12M16 34h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M14 10h14l8 8v20H14V10z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18 8h14l8 8v18H18V8z" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
      <path d="M20 24h12M20 30h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="36" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="34" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 14h16M14 18l8 12M34 18l-8 12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M12 14h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22l-8 6v-6h-2a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="20" cy="23" r="1.6" fill="currentColor" />
      <circle cx="24" cy="23" r="1.6" fill="currentColor" />
      <circle cx="28" cy="23" r="1.6" fill="currentColor" />
    </svg>
  ),
  cubes: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M16 18l8-5 8 5v10l-8 5-8-5V18z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 18l8 5 8-5M24 23v10" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 30V22M22 30v-12M30 30V18M36 30H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  vision: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 24s6-10 16-10 16 10 16 10-6 10-16 10S8 24 8 24z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12l4 4M36 12l-4 4M12 36l4-4M36 36l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  devices: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 32h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="30" y="18" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M33 32h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export default function ServiceCapabilities({ content }) {
  const { badge, title, body, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge>{badge}</SectionBadge>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.title} className={`${styles.card} interactiveCard cardReveal`}>
            {card.image ? (
              <div className={`${styles.media} mediaZoom`}>
                <img src={card.image} alt="" loading="lazy" />
              </div>
            ) : (
              <span className={styles.icon}>{ICONS[card.icon] || ICONS.blueprint}</span>
            )}
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
