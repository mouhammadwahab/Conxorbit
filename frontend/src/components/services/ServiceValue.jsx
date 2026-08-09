import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./ServiceValue.module.css";

const ICONS = {
  compare: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="5" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  boq: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V10M10 18V6M16 18v-8M20 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h7l4 4v12H7V4z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17.2 17.2L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9.5 12.2l1.8 1.8 3.4-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  site: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16M6 20V10l6-5 6 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function ServiceValue({ content }) {
  const { badge, title, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge>{badge}</SectionBadge>
        <h2>{title}</h2>
      </div>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <article
            key={card.title}
            className={`${styles.card} interactiveCard cardReveal`}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <span className={styles.icon}>{ICONS[card.icon] || ICONS.compare}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
