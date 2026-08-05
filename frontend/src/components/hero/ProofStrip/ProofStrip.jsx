import Reveal from "../../common/Reveal";
import styles from "./ProofStrip.module.css";

export default function ProofStrip({ content }) {
  const { eyebrow, title, companies } = content;
  const loop = [...companies, ...companies];

  return (
    <Reveal as="section" className={styles.section} aria-label={title}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {loop.map((company, index) => (
              <div key={`${company.name}-${index}`} className={`${styles.item} interactiveCard`}>
                <span className={styles.initials}>{company.initials}</span>
                <span>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
