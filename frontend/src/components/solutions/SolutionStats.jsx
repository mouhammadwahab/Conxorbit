import Reveal from "../common/Reveal";
import styles from "./SolutionStats.module.css";

export default function SolutionStats({ stats }) {
  if (!stats) return null;
  const items = [
    { label: "Best For", value: stats.bestFor },
    { label: "Core Function", value: stats.coreFunction },
    { label: "Platform", value: stats.platform },
  ].filter((item) => item.value);

  return (
    <Reveal as="section" className={styles.section} eager aria-label="Solution snapshot">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Solution Snapshot</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.label} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <strong className={styles.value}>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
