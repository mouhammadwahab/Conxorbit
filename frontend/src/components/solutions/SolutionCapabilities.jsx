import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./SolutionCapabilities.module.css";

export default function SolutionCapabilities({ content }) {
  if (!content) return null;
  const badge = "CAPABILITIES";
  const { title, description, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge variant="gold" size="sm">
          {badge}
        </SectionBadge>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <article key={`${card.title}-${index}`} className={`${styles.card} cardReveal`}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
