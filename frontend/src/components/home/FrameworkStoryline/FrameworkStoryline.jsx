import { useEffect, useRef, useState } from "react";
import Reveal from "../../common/Reveal";
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
    <path
      d="M12 3l7 4v6l-7 4-7-4V7l7-4z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="dv" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 8l-4 4 4 4M16 8l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="i" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 9v3M10.2 14.2l-1.4 1M13.8 14.2l1.4 1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>,
  <svg key="t" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="o" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    <ellipse
      cx="12"
      cy="12"
      rx="8"
      ry="3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="8"
      ry="3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      transform="rotate(-60 12 12)"
    />
  </svg>,
];

const W = 1000;
const CARD_W = 340;
const NODE_CLEAR = 36;
const STUB_GAP = 10;

/**
 * Snaking path: nodes sit on the curve; cards alternate left/right and
 * connect with short stubs so the line visibly follows each step.
 */
function buildSnakePath(count) {
  const gap = 290;
  const padY = 90;
  const n = Math.max(count, 1);
  const height = padY * 2 + Math.max(n - 1, 0) * gap + 40;

  const leftX = 210;
  const rightX = 790;

  const nodes = Array.from({ length: count }, (_, i) => {
    const onLeft = i % 2 === 0;
    return {
      x: onLeft ? leftX : rightX,
      y: padY + i * gap,
      side: onLeft ? "left" : "right",
    };
  });

  if (!nodes.length) {
    return { d: "", nodes: [], connectors: [], cards: [], width: W, height };
  }

  // Lead-in above first node, trail below last — matches reference sweep
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const lead = { x: Math.max(40, first.x - 120), y: first.y - 70 };
  const trail = {
    x: last.side === "left" ? last.x + 80 : last.x - 80,
    y: last.y + 70,
  };

  const pts = [lead, ...nodes, trail];

  // Smooth cubic through waypoints
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const dy = b.y - a.y;
    const c1x = a.x;
    const c1y = a.y + dy * 0.45;
    const c2x = b.x;
    const c2y = b.y - dy * 0.45;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
  }

  const cards = nodes.map((node) => {
    if (node.side === "left") {
      const left = node.x + NODE_CLEAR + STUB_GAP;
      return {
        left,
        width: CARD_W,
        top: node.y,
        stubFrom: node.x + NODE_CLEAR,
        stubTo: left,
        y: node.y,
      };
    }
    const right = node.x - NODE_CLEAR - STUB_GAP;
    const left = right - CARD_W;
    return {
      left,
      width: CARD_W,
      top: node.y,
      stubFrom: right,
      stubTo: node.x - NODE_CLEAR,
      y: node.y,
    };
  });

  const connectors = cards.map((card) => ({
    d: `M ${card.stubFrom} ${card.y} L ${card.stubTo} ${card.y}`,
  }));

  return { d, nodes, connectors, cards, width: W, height };
}

function buildMobilePath(count) {
  const gap = 260;
  const padY = 70;
  const n = Math.max(count, 1);
  const height = padY * 2 + Math.max(n - 1, 0) * gap + 24;
  const nodeX = 920;
  const cardRight = 860;

  const nodes = Array.from({ length: count }, (_, i) => ({
    x: nodeX,
    y: padY + i * gap,
    side: "right",
  }));

  const lead = { x: nodeX, y: Math.max(20, (nodes[0]?.y ?? padY) - 40) };
  const trail = {
    x: nodeX,
    y: (nodes[nodes.length - 1]?.y ?? padY) + 40,
  };

  let d = `M ${lead.x} ${lead.y}`;
  nodes.forEach((node) => {
    d += ` L ${node.x} ${node.y}`;
  });
  d += ` L ${trail.x} ${trail.y}`;

  const cards = nodes.map((node) => ({
    left: 20,
    width: cardRight - 20,
    top: node.y,
    stubFrom: cardRight,
    stubTo: node.x - NODE_CLEAR,
    y: node.y,
  }));

  const connectors = cards.map((card) => ({
    d: `M ${card.stubFrom} ${card.y} L ${card.stubTo} ${card.y}`,
  }));

  return { d, nodes, connectors, cards, width: W, height };
}

/** Scroll-scrub storyline — path draws through cards; never pins. */
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 800px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { d: pathD, nodes, connectors, cards, width, height } = isMobile
    ? buildMobilePath(steps.length)
    : buildSnakePath(steps.length);
  const viewBox = `0 0 ${width} ${height}`;

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
      gsap.set(stepEls, { autoAlpha: 0.15, y: 28, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            if (activeIndexRef.current === idx) return;
            activeIndexRef.current = idx;
            setActiveIndex(idx);

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
          { autoAlpha: 1, y: 0, duration: 0.12, force3D: true, ease: "none" },
          (i + 0.06) / total
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, pathD, steps.length, isMobile]);

  return (
    <section ref={rootRef} className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <Reveal className={`${styles.header} revealHead`}>
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
        </Reveal>

        <div className={styles.story} style={{ minHeight: height }}>
          <svg
            className={styles.pathSvg}
            viewBox={viewBox}
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="frameworkTrail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f3c969" />
                <stop offset="18%" stopColor="#f59e0b" />
                <stop offset="36%" stopColor="#38bdf8" />
                <stop offset="54%" stopColor="#a855f7" />
                <stop offset="72%" stopColor="#ec4899" />
                <stop offset="88%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#b8893d" />
              </linearGradient>
            </defs>

            <path
              d={pathD}
              stroke="rgba(160, 170, 190, 0.22)"
              strokeWidth="2.5"
              strokeDasharray="3 14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              ref={glowRef}
              className={styles.trailGlow}
              d={pathD}
              stroke="url(#frameworkTrail)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#frameworkTrail)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {connectors.map((c, i) => (
              <path
                key={`stub-${i}`}
                className={`${styles.stub} ${i <= activeIndex ? styles.stubLit : ""}`}
                d={c.d}
                strokeWidth="2"
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
              const card = cards[index];
              if (!card) return null;
              return (
                <li
                  key={step.title}
                  className={`${styles.step} ${lit ? styles.stepLit : ""}`}
                  style={{
                    top: `${(card.top / height) * 100}%`,
                    left: `${(card.left / width) * 100}%`,
                    width: `${(card.width / width) * 100}%`,
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
