import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./ServiceWhy.module.css";

const ICONS = {
  industry: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V9l6-3v3l6-3v14H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 20h4v-8l-4 2v6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12h2M8 15h2M14 12h2M14 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.3 8.5L10.5 15M15.7 8.5L13.5 15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  partnership: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 19c.8-2.8 2.8-4.2 5-4.2s4.2 1.4 5 4.2M13.2 14.2c1.1-.5 2.4-.5 3.8.2 1.4.8 2.3 2.2 2.7 4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function ServiceWhy({ content }) {
  const { badge, title, body, cta, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge>{badge}</SectionBadge>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        {cta ? (
          <Link className={`${styles.cta} btnMotion`} to={cta.href}>
            <span>{cta.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article
            key={card.title}
            className={`${styles.card} interactiveCard cardReveal`}
          >
            <span className={styles.number} aria-hidden="true">
              {card.number}
            </span>
            <span className={styles.icon}>{ICONS[card.icon] || ICONS.industry}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
