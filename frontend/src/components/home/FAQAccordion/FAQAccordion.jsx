import { useState } from "react";
import Reveal from "../../common/Reveal";
import styles from "./FAQAccordion.module.css";

export default function FAQAccordion({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, items = [] } = content;
  const [open, setOpen] = useState(0);

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.header}>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> {badge}
        </span>
        <h2>
          {titleBefore}
          <span className={styles.highlight}>{titleHighlight}</span>
          {titleAfter}
        </h2>
      </div>

      <div className={styles.list}>
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.question}
              className={`${isOpen ? styles.itemOpen : styles.item} depthHover`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className={styles.icon} aria-hidden="true">
                  ?
                </span>
                <span className={styles.question}>{item.question}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden="true">
                  ▾
                </span>
              </button>
              <div className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ""}`}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
