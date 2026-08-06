import Reveal from "../../common/Reveal";
import styles from "./Testimonials.module.css";

export default function Testimonials({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, items = [] } = content;

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
        <span className={styles.rule} aria-hidden="true" />
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <blockquote key={item.name + item.role} className={`${styles.card} interactiveCard`}>
            <div className={styles.avatar} aria-hidden="true">
              {item.initials || item.name.slice(0, 2).toUpperCase()}
            </div>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <p>{item.quote}</p>
            <span className={styles.quoteMarkEnd} aria-hidden="true">
              ”
            </span>
            <footer>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Reveal>
  );
}
