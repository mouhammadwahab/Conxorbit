import Reveal from "../common/Reveal";
import styles from "./FacadeWorkflow.module.css";

const ICONS = {
  design: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M20.5 7.5l4 4M8 24l9.2-9.2 4 4L12 28H8v-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.5 11.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7 24V12l9-5 9 5v12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 24v-7h8v7M16 7v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  quantification: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="7" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="17" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="17" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  fabrication: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 22L22 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 10h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  documentation: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M10 6h9l5 5v15a1.5 1.5 0 0 1-1.5 1.5H10A1.5 1.5 0 0 1 8.5 26V7.5A1.5 1.5 0 0 1 10 6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M19 6v5h5M12 15h8M12 19h8M12 23h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  installation: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M8 24V14h4v10M14 24V10h4v14M20 24V16h4v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function FacadeWorkflow({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, steps = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={eyebrow || title}>
      <div className={styles.inner}>
        <div className={`${styles.header} revealHead`}>
          {eyebrow ? (
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <ol className={styles.track}>
          {steps.map((step, index) => (
            <li key={step.title} className={`${styles.step} cardReveal`}>
              <div className={styles.iconWrap}>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.icon}>{ICONS[step.icon] || ICONS.design}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              {step.details?.length ? (
                <p className={styles.details}>{step.details.join(" • ")}</p>
              ) : null}
              {index < steps.length - 1 ? (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
