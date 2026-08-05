import Reveal from "../../common/Reveal";
import TiltCard from "../../common/TiltCard";
import styles from "./WhyWorkWithUs.module.css";

export default function WhyWorkWithUs({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body, cards = [] } = content;

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
        {body ? <p>{body}</p> : null}
      </div>

      <div className={styles.grid}>
        {cards.map((card, index) => (
          <TiltCard
            key={card.title}
            as="article"
            className={styles.card}
            max={12}
            scale={1.04}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.cardBadge}>{card.badge}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </TiltCard>
        ))}
      </div>
    </Reveal>
  );
}
