import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./PortfolioIndustries.module.css";

function Chip({ item }) {
  return (
    <span className={`${styles.chip} ${item.core ? styles.chipCore : ""}`}>
      <span aria-hidden="true">◆</span>
      <span className={styles.chipLabel}>{item.label}</span>
      {item.core ? <span className={styles.coreMark}>CORE</span> : null}
    </span>
  );
}

export default function PortfolioIndustries({ content }) {
  if (!content) return null;
  const { badge, titleLine1, titleLine2, items = [] } = content;
  const loop = [...items, ...items];

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.sectionInner}>
        <div className={`${styles.header} revealHead`}>
          <SectionBadge>{badge}</SectionBadge>
          <h2 className={styles.title}>
            <span>{titleLine1}</span>
            <span className={styles.titleMuted}>{titleLine2}</span>
          </h2>
        </div>

        <div className={styles.marquee}>
          <ul className={styles.srList}>
            {items.map((item) => (
              <li key={item.label}>
                {item.label}
                {item.core ? " (core)" : ""}
              </li>
            ))}
          </ul>
          <div className={styles.track} aria-hidden="true">
            {loop.map((item, index) => (
              <Chip key={`${item.label}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
