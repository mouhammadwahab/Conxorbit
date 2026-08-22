import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./SolutionStats.module.css";

export default function SolutionStats({ stats }) {
  if (!stats) return null;
  const items = [
    { label: "Best For", value: stats.bestFor || "-" },
    { label: "Core Function", value: stats.coreFunction || "-" },
    { label: "Platform", value: stats.platform || "-" },
    { label: "Workflow", value: stats.workflow || "-" },
  ];

  return (
    <Reveal as="section" className={styles.section} aria-label="Solution snapshot">
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionBadge variant="gold" size="sm">
            SOLUTION SNAPSHOT
          </SectionBadge>
        </div>
        <div className={styles.grid} data-cols={items.length}>
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
