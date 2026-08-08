import Reveal from "../common/Reveal";
import styles from "./PortfolioProof.module.css";

export default function PortfolioProof({ content }) {
  if (!content) return null;
  const { badge, items = [] } = content;

  return (
    <Reveal as="section" className={styles.section} eager aria-label={badge}>
      <div className={`${styles.inner} revealHead`}>
        <span className={styles.badge}>
          <span aria-hidden="true">◆</span> {badge}
          <span className={styles.badgeRule} aria-hidden="true" />
        </span>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.label} className={styles.item}>
              <p className={styles.value}>{item.value}</p>
              <p className={styles.label}>{item.label}</p>
              {item.hint ? <p className={styles.hint}>{item.hint}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
