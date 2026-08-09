import { useEffect, useState } from "react";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./SolutionHowItWorks.module.css";

export default function SolutionHowItWorks({ content }) {
  const { badge, title, stagesLabel, stages = [] } = content || {};
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!stages.length) return undefined;
    setActive(Math.min(2, stages.length - 1));
  }, [stages.length]);

  useEffect(() => {
    if (reduced || stages.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduced, stages.length]);

  if (!content) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={`${styles.copy} revealHead`}>
            <SectionBadge variant="gold" size="sm">
              {badge}
            </SectionBadge>
            <h2>{title}</h2>
          </div>
          {stagesLabel ? (
            <p className={styles.meta}>
              {stagesLabel}{" "}
              <span>
                {String(active + 1).padStart(2, "0")}/{String(stages.length).padStart(2, "0")}
              </span>
            </p>
          ) : null}
        </div>

        <div className={styles.trackWrap} aria-hidden="true">
          <div className={styles.track} />
          <div
            className={styles.progress}
            style={{ width: `${((active + 1) / stages.length) * 100}%` }}
          />
        </div>

        <ol className={styles.stages}>
          {stages.map((stage, index) => {
            const on = index <= active;
            return (
              <li
                key={stage.title}
                className={`${styles.stage} ${on ? styles.stageOn : styles.stageOff} cardReveal`}
              >
                <button
                  type="button"
                  className={styles.node}
                  onClick={() => setActive(index)}
                  aria-label={`Stage ${index + 1}: ${stage.title}`}
                >
                  {on ? (
                    <span className={styles.nodeActive} aria-hidden="true" />
                  ) : (
                    <span className={styles.nodePlus} aria-hidden="true">
                      +
                    </span>
                  )}
                </button>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
