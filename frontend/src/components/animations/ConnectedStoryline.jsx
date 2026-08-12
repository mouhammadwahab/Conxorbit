import { useEffect, useRef } from "react";
import SectionBadge from "../common/SectionBadge";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../../utils/gsapSetup";
import styles from "./ConnectedStoryline.module.css";

/** Scroll scrub only — never pins / reparents DOM. */
export default function ConnectedStoryline({
  eyebrow,
  title,
  body,
  steps = [],
  tone = "light",
}) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current || !lineRef.current) return undefined;

    const { gsap } = ensureGsap();
    const root = rootRef.current;
    const line = lineRef.current;
    const stepEls = root.querySelectorAll(`.${styles.step}`);

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(stepEls, { autoAlpha: 0.45, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      tl.to(line, { scaleY: 1, ease: "none", duration: 1 }, 0);
      stepEls.forEach((el, i) => {
        tl.to(el, { autoAlpha: 1, y: 0, duration: 0.2 }, i / Math.max(stepEls.length, 1));
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, steps.length]);

  const toneClass = tone === "light" ? "toneLight" : "toneDark";

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${toneClass} ${tone === "light" ? styles.light : styles.dark}`}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          {eyebrow ? (
            <SectionBadge as="p" tone={tone === "light" ? "light" : "dark"}>
              {eyebrow}
            </SectionBadge>
          ) : null}
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <div className={styles.track}>
          <div className={styles.lineTrack} aria-hidden="true">
            <div ref={lineRef} className={styles.line} />
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.dot} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={`${styles.card} interactiveCard`}>
                  <div className={styles.cardTop}>
                    <span className={styles.num}>Service {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
