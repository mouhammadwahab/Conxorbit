import Reveal from "../common/Reveal";
import styles from "./CaseStudyHero.module.css";

function ProductMockup({ imageUrl }) {
  if (imageUrl) {
    return (
      <div className={styles.mockup}>
        <img className={styles.mockupImage} src={imageUrl} alt="" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.windowChrome}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.url}>panelx.conxorbit.app / project-4021</span>
      </div>
      <div className={styles.windowBody}>
        <aside className={styles.panelsCol}>
          <p className={styles.colLabel}>Panels</p>
          <ul>
            {[
              { id: "PNL-0142", tone: "active" },
              { id: "PNL-0143", tone: "ok" },
              { id: "PNL-0144", tone: "warn" },
              { id: "PNL-0145", tone: "muted" },
              { id: "PNL-0146", tone: "ok" },
              { id: "PNL-0147", tone: "muted" },
            ].map((row) => (
              <li key={row.id} className={row.tone === "active" ? styles.panelActive : undefined}>
                <span className={`${styles.status} ${styles[row.tone]}`} />
                {row.id}
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.gridCol}>
          <div className={styles.facadeGrid}>
            {Array.from({ length: 48 }, (_, i) => (
              <span
                key={i}
                className={
                  [3, 8, 14, 15, 21, 27, 33, 40].includes(i)
                    ? styles.cellFill
                    : [5, 18, 29].includes(i)
                      ? styles.cellWarm
                      : [11, 24].includes(i)
                        ? styles.cellMute
                        : undefined
                }
              />
            ))}
          </div>
        </div>
        <aside className={styles.infoCol}>
          <p className={styles.colLabel}>Documentation</p>
          <div className={styles.docChip}>Shop Drawing R3</div>
          <div className={styles.docChip}>Site Report — W14</div>
          <p className={`${styles.colLabel} ${styles.fieldLabel}`}>Field Photos</p>
          <div className={styles.photoRow}>
            <span />
            <span />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CaseStudyHero({ study, solutionName }) {
  if (!study) return null;
  const category = study.category || "Client System";
  const name = solutionName || study.title;
  const heading = study.projectType || "";
  const summary = study.shortDescription || "";
  const imageUrl = study.heroImageUrl || study.mockupImageUrl || "";

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={name}>
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <p className={styles.badge}>
            Case Study <span aria-hidden="true">•</span> {category}
          </p>
          <h1 className={styles.name}>{name}</h1>
          {heading ? <p className={styles.heading}>{heading}</p> : null}
          {summary ? <p className={styles.summary}>{summary}</p> : null}
        </div>
        <div className={styles.visual}>
          <ProductMockup imageUrl={imageUrl} />
        </div>
      </div>
    </Reveal>
  );
}
