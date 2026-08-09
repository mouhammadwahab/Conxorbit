import { useEffect, useRef, useState } from "react";
import SectionBadge from "../../common/SectionBadge";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../../../utils/gsapSetup";
import styles from "./FrameworkStoryline.module.css";

const STEP_ICONS = [
  <svg key="d" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="1.6" fill="currentColor" />
    <circle cx="8" cy="12" r="1.6" fill="currentColor" />
    <circle cx="16" cy="12" r="1.6" fill="currentColor" />
    <circle cx="10" cy="16" r="1.6" fill="currentColor" />
    <circle cx="14" cy="16" r="1.6" fill="currentColor" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>,
  <svg key="de" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l7 4v6l-7 4-7-4V7l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>,
  <svg key="dv" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="i" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 9v3M10.2 14.2l-1.4 1M13.8 14.2l1.4 1" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="t" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="o" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.4" transform="rotate(-60 12 12)" />
  </svg>,
];

/**
 * Arc stays on the right; cards stay in a fixed left column so nothing clips.
 */
function buildCircularRadial(count) {
  const W = 1000;
  const cardRightX = 300;
  const gap = 300;
  const padY = 120;
  const n = Math.max(count, 1);
  const height = padY * 2 + Math.max(n - 1, 0) * gap;
  const cy = height / 2;

  const ySpan = Math.max(n - 1, 0) * gap;
  const yMax = ySpan / 2;
  const R = n <= 1 ? 420 : Math.max(yMax + 60, ySpan / 1.9 + 30);

  // Keep the leftmost point of the arc clear of the card column
  const minNodeX = cardRightX + 88;
  const cx = minNodeX + R;

  const nodes = Array.from({ length: count }, (_, i) => {
    const y = padY + i * gap;
    const dy = y - cy;
    const under = Math.max(R * R - dy * dy, 0);
    const x = cx - Math.sqrt(under);
    return { x: Math.max(x, minNodeX), y };
  });

  if (!nodes.length) {
    return { d: "", nodes: [], connectors: [], width: W, height, cardRightX };
  }

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const leadY = first.y - 56;
  const trailY = last.y + 56;
  const leadX = cx - Math.sqrt(Math.max(R * R - (leadY - cy) ** 2, 0));
  const trailX = cx - Math.sqrt(Math.max(R * R - (trailY - cy) ** 2, 0));

  const deltaY = trailY - leadY;
  const largeArc = Math.abs(deltaY) > 2 * R ? 1 : 0;
  const d = `M ${Math.max(leadX, minNodeX - 12)} ${leadY} A ${R} ${R} 0 ${largeArc} 0 ${Math.max(
    trailX,
    minNodeX - 12
  )} ${trailY}`;

  const iconClear = 30;
  const connectors = nodes.map((node) => ({
    d: `M ${cardRightX} ${node.y} L ${node.x - iconClear} ${node.y}`,
  }));

  return { d, nodes, connectors, width: W, height, cardRightX };
}

/** Circular-radial storyline — scrub draw only, never pins. */
export default function FrameworkStoryline({ content }) {
  const {
    badge,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    callout,
    steps = [],
  } = content;

  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);

  const { d: pathD, nodes, connectors, width, height, cardRightX } = buildCircularRadial(
    steps.length
  );
  const viewBox = `0 0 ${width} ${height}`;
  const cardWidthPct = (cardRightX / width) * 100;

  useEffect(() => {
    if (reduced || !rootRef.current || !pathRef.current || !pathD) {
      if (reduced) setActiveIndex(steps.length - 1);
      return undefined;
    }

    const { gsap } = ensureGsap();
    const root = rootRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    const stepEls = root.querySelectorAll(`.${styles.step}`);
    const nodeEls = root.querySelectorAll(`.${styles.node}`);
    const stubEls = root.querySelectorAll(`.${styles.stub}`);
    const length = path.getTotalLength();
    const total = Math.max(steps.length, 1);

    const ctx = gsap.context(() => {
      gsap.set([path, glow], {
        strokeDasharray: length,
        strokeDashoffset: length,
        force3D: true,
      });
      gsap.set(stepEls, { autoAlpha: 0.35, y: 22, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 62%",
          scrub: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            if (activeIndexRef.current === idx) return;
            activeIndexRef.current = idx;

            nodeEls.forEach((el, i) => {
              el.classList.toggle(styles.nodeLit, i <= idx);
            });
            stepEls.forEach((el, i) => {
              el.classList.toggle(styles.stepLit, i <= idx);
            });
            stubEls.forEach((el, i) => {
              el.classList.toggle(styles.stubLit, i <= idx);
            });
          },
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1, force3D: true }, 0);
      tl.to(glow, { strokeDashoffset: 0, ease: "none", duration: 1, force3D: true }, 0);

      stepEls.forEach((el, i) => {
        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.1, force3D: true, ease: "none" },
          (i + 0.08) / total
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, pathD, steps.length]);

  return (
    <section ref={rootRef} className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionBadge>{badge}</SectionBadge>
          <h2>
            {titleBefore}
            <span className={styles.highlight}>{titleHighlight}</span>
            {titleAfter}
          </h2>
          {body ? <p className={styles.body}>{body}</p> : null}
          {callout ? (
            <div className={`${styles.callout} interactiveCard`}>
              <span aria-hidden="true">✦</span>
              <p>{callout}</p>
            </div>
          ) : null}
        </div>

        <div className={styles.story} style={{ minHeight: height }}>
          <svg
            className={styles.pathSvg}
            viewBox={viewBox}
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <linearGradient id="frameworkTrail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="28%" stopColor="#e879f9" />
                <stop offset="52%" stopColor="#f59e0b" />
                <stop offset="78%" stopColor="#b8893d" />
                <stop offset="100%" stopColor="#5a6b3b" />
              </linearGradient>
            </defs>

            <path
              d={pathD}
              stroke="rgba(184,137,61,0.16)"
              strokeWidth="2"
              strokeDasharray="2 12"
              fill="none"
            />
            <path
              ref={glowRef}
              className={styles.trailGlow}
              d={pathD}
              stroke="url(#frameworkTrail)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#frameworkTrail)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {connectors.map((c, i) => (
              <path
                key={`stub-${i}`}
                className={`${styles.stub} ${i <= activeIndex ? styles.stubLit : ""}`}
                d={c.d}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </svg>

          <div className={styles.iconRail} aria-hidden="true">
            {nodes.map((node, index) => {
              const lit = index <= activeIndex;
              return (
                <span
                  key={`node-${index}`}
                  className={`${styles.node} ${lit ? styles.nodeLit : ""}`}
                  style={{
                    left: `${(node.x / width) * 100}%`,
                    top: `${(node.y / height) * 100}%`,
                  }}
                >
                  <span className={styles.nodeRing} />
                  <span className={styles.nodeIcon}>
                    {STEP_ICONS[index % STEP_ICONS.length]}
                  </span>
                </span>
              );
            })}
          </div>

          <ol className={styles.steps}>
            {steps.map((step, index) => {
              const lit = index <= activeIndex;
              const node = nodes[index];
              return (
                <li
                  key={step.title}
                  className={`${styles.step} ${lit ? styles.stepLit : ""}`}
                  style={{
                    top: node ? `${(node.y / height) * 100}%` : undefined,
                    width: `${cardWidthPct}%`,
                  }}
                >
                  <article className={`${styles.card} interactiveCard`}>
                    <span className={styles.num}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
