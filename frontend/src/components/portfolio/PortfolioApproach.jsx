import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./PortfolioApproach.module.css";

export default function PortfolioApproach({ content }) {
  if (!content) return null;
  const { badge, title, body, steps = [] } = content;

  return (
    <section className={styles.section} aria-label={badge}>
      <Reveal as="div" className={styles.headerWrap}>
        <div className={`${styles.header} revealHead`}>
          <SectionBadge>{badge}</SectionBadge>
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
      </Reveal>

      <Reveal className={styles.steps}>
        {steps.map((step, i) => (
          <article key={step.title} className={`${styles.step} cardReveal`}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
