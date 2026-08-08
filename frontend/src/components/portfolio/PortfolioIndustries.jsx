import { useState } from "react";
import Reveal from "../common/Reveal";
import styles from "./PortfolioIndustries.module.css";

export default function PortfolioIndustries({ content }) {
  const items = content?.items || [];
  const coreIndex = items.findIndex((item) => item.core);
  const [active, setActive] = useState(coreIndex >= 0 ? coreIndex : 0);

  if (!content) return null;
  const { badge, titleLine1, titleLine2 } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.sectionInner}>
        <div className={`${styles.header} revealHead`}>
          <span className={styles.badge}>
            <span aria-hidden="true">◆</span> {badge}
            <span className={styles.badgeRule} aria-hidden="true" />
          </span>
          <h2 className={styles.title}>
            <span>{titleLine1}</span>
            <span className={styles.titleMuted}>{titleLine2}</span>
          </h2>
        </div>
        <div className={styles.chips}>
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                aria-pressed={isActive}
                onClick={() => setActive(i)}
              >
                <span aria-hidden="true">◆</span>
                <span className={styles.chipLabel}>{item.label}</span>
                {item.core ? <span className={styles.coreMark}>CORE</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
