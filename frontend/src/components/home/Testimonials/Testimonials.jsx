import Reveal from "../../common/Reveal";
import TiltCard from "../../common/TiltCard";
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
      </div>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <TiltCard
            key={item.name + item.role}
            as="blockquote"
            className={styles.card}
            max={8}
            scale={1.02}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <p>“{item.quote}”</p>
            <footer>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </footer>
          </TiltCard>
        ))}
      </div>
    </Reveal>
  );
}
