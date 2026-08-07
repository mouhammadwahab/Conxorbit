import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../../utils/gsapSetup";
import styles from "./ServiceApproach.module.css";

const ICONS = {
  understand: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  analyse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V8M10 18V4M16 18v-7M20 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  prototype: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  develop: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  deploy: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v5M12 16.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export default function ServiceApproach({ content }) {
  const { badge, title, steps = [] } = content;
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return undefined;

    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.card}`, rootRef.current);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const line = rootRef.current.querySelector(`.${styles.progress}`);
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current.querySelector(`.${styles.timeline}`),
              start: "top 70%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, steps.length]);

  return (
    <section ref={rootRef} className={styles.section} aria-label={badge}>
      <div className={styles.header}>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> {badge}
        </span>
        <h2>{title}</h2>
      </div>

      <div className={styles.timeline}>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.track} />
          <span className={styles.progress} />
        </div>

        <ol className={styles.list}>
          {steps.map((step, index) => {
            const side = index % 2 === 0 ? styles.left : styles.right;
            return (
              <li key={step.title} className={`${styles.item} ${side}`}>
                <span className={styles.node} aria-hidden="true">
                  {ICONS[step.icon] || ICONS.understand}
                </span>
                <article className={styles.card}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
