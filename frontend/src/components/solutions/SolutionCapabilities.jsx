import Reveal from "../common/Reveal";
import { SolutionIcon } from "./solutionIcons";
import styles from "./SolutionCapabilities.module.css";

export default function SolutionCapabilities({ content }) {
  if (!content) return null;
  const { badge, title, body, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <span className={styles.badge}>
          <span aria-hidden="true">•</span> {badge}
        </span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <article key={card.title} className={`${styles.card} interactiveCard cardReveal`}>
            <SolutionIcon name={card.icon} className={styles.icon} />
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
