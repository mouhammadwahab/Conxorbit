import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./SolutionChallenge.module.css";

export default function SolutionChallenge({ content }) {
  if (!content) return null;
  const badge = "THE CHALLENGE";
  const { title, body, cards = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <SectionBadge variant="gold" size="sm">
            {badge}
          </SectionBadge>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <ol className={styles.list}>
          {cards.map((card, index) => (
            <li key={`${card.title}-${index}`} className={`${styles.item} cardReveal`}>
              <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
