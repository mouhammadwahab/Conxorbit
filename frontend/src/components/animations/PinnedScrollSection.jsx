import { useEffect, useRef, useState } from "react";
import SectionBadge from "../common/SectionBadge";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./PinnedScrollSection.module.css";

/**
 * Sticky scroll storytelling — CSS sticky only (no GSAP pin).
 * GSAP pin reparents DOM and crashes React on route unmount.
 */
export default function PinnedScrollSection({ eyebrow, title, panels = [] }) {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !rootRef.current || panels.length < 2) return undefined;

    const root = rootRef.current;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) return undefined;

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const index = Math.min(panels.length - 1, Math.floor(progress * panels.length));
      setActive(index);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, panels.length]);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      style={{ "--panel-count": panels.length }}
      aria-label={title}
    >
      <div className={styles.sticky}>
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles.inner}>
          <aside className={styles.rail}>
            {eyebrow ? <SectionBadge as="p">{eyebrow}</SectionBadge> : null}
            <h2 className={styles.title}>{title}</h2>
            <ol className={styles.nav} aria-label="Story chapters">
              {panels.map((panel, index) => (
                <li key={panel.title}>
                  <div className={index === active ? styles.navActive : styles.navItem}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {panel.title}
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className={styles.stage}>
            {panels.map((panel, index) => (
              <article
                key={panel.title}
                className={`${styles.panel} ${index === active ? styles.visible : ""}`}
                aria-hidden={index === active ? "false" : "true"}
              >
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{panel.title}</h3>
                <p>{panel.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
