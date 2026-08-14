import { useEffect, useRef } from "react";
import Reveal from "../common/Reveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../../utils/gsapSetup";
import styles from "./FacadeAIWorkflow.module.css";

export default function FacadeAIWorkflow({ content }) {
  const timelineRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const steps = content?.steps ?? [];

  useEffect(() => {
    const root = timelineRef.current;
    if (!root || !steps.length) return undefined;

    const segments = root.querySelectorAll(`.${styles.segment}`);
    const nodes = root.querySelectorAll(`.${styles.node}`);
    const stepEls = root.querySelectorAll(`.${styles.step}`);
    const endArrow = root.querySelector(`.${styles.endArrow}`);

    if (reduced) {
      segments.forEach((el) => el.classList.add(styles.segmentDrawn));
      nodes.forEach((el) => el.classList.add(styles.nodeLit));
      stepEls.forEach((el) => el.classList.add(styles.stepLit));
      endArrow?.classList.add(styles.endArrowLit);
      return undefined;
    }

    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.set(segments, {
        scaleY: 0,
        transformOrigin: "top center",
      });
      if (endArrow) gsap.set(endArrow, { autoAlpha: 0, y: -8 });

      stepEls.forEach((stepEl, i) => {
        const node = nodes[i];
        const segment = segments[i];

        ScrollTrigger.create({
          trigger: stepEl,
          start: "top 78%",
          onEnter: () => {
            stepEl.classList.add(styles.stepLit);
            node?.classList.add(styles.nodeLit);
          },
          onEnterBack: () => {
            stepEl.classList.add(styles.stepLit);
            node?.classList.add(styles.nodeLit);
          },
          onLeaveBack: () => {
            if (i === 0) return;
            stepEl.classList.remove(styles.stepLit);
            node?.classList.remove(styles.nodeLit);
          },
        });

        if (segment) {
          gsap.fromTo(
            segment,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: segment,
                start: "top 82%",
                end: "bottom 48%",
                scrub: 0.45,
              },
            }
          );
        }

        if (i === stepEls.length - 1 && endArrow) {
          gsap.to(endArrow, {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: stepEl,
              start: "center 70%",
              end: "bottom 45%",
              scrub: 0.35,
              onEnter: () => endArrow.classList.add(styles.endArrowLit),
              onLeaveBack: () => endArrow.classList.remove(styles.endArrowLit),
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, steps.length]);

  if (!content) return null;

  const { eyebrow, title, body } = content;
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

        <ol ref={timelineRef} className={styles.timeline}>
          {steps.map((step, index) => {
            const accent = step.accent === "olive" ? styles.accentOlive : styles.accentGold;
            const left = step.leftCallout;
            const right = step.rightCallout;
            return (
              <li key={step.title} className={`${styles.step} ${accent}`}>
                <div className={styles.sideLeft}>
                  {left ? (
                    <span className={`${styles.callout} ${styles.calloutLeft}`}>{left}</span>
                  ) : null}
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
