import Reveal from "../common/Reveal";
import styles from "./FacadeAIWorkflow.module.css";

export default function FacadeAIWorkflow({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, steps = [] } = content;
  const total = String(steps.length).padStart(2, "0");

  return (
    <Reveal as="section" className={styles.section} aria-label={eyebrow || title}>
      <div className={styles.inner}>
        <div className={`${styles.header} revealHead`}>
          {eyebrow ? (
            <p className={styles.badge}>
              <span className={styles.badgeIcon} aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className={styles.title}>
            {title.split("\n").map((line) => (
              <span key={line} className={styles.titleLine}>
                {line}
              </span>
            ))}
          </h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <ol className={styles.timeline}>
          {steps.map((step, index) => {
            const accent = step.accent === "olive" ? styles.accentOlive : styles.accentGold;
            const left = step.leftCallout;
            const right = step.rightCallout;
            return (
              <li key={step.title} className={`${styles.step} ${accent} cardReveal`}>
                <div className={styles.sideLeft}>
                  {left ? <span className={`${styles.callout} ${styles.calloutLeft}`}>{left}</span> : null}
                </div>

                <div className={styles.center}>
                  <span className={styles.index}>
                    {String(index + 1).padStart(2, "0")} / {total}
                  </span>
                  <span className={styles.node} aria-hidden="true" />
                  <h3>{step.title}</h3>
                  {step.body ? <p>{step.body}</p> : null}
                  {index < steps.length - 1 ? (
                    <span className={styles.segment} aria-hidden="true" />
                  ) : (
                    <span className={styles.endArrow} aria-hidden="true">
                      ↓
                    </span>
                  )}
                </div>

                <div className={styles.sideRight}>
                  {right ? (
                    <span className={`${styles.callout} ${styles.calloutRight}`}>{right}</span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
