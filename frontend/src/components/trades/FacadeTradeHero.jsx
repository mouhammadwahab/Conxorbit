import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import facadeHeroImg from "../../assets/trades/facade-hero.jpg";
import styles from "./FacadeTradeHero.module.css";

const CALLOUT_REVEAL_MS = 1100;

export default function FacadeTradeHero({ content }) {
  const {
    eyebrow,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    primaryCta,
    secondaryCta,
    callouts = [],
    footerNote,
  } = content;

  const reduced = usePrefersReducedMotion();
  const [calloutsVisible, setCalloutsVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setCalloutsVisible(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setCalloutsVisible(true), CALLOUT_REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={eyebrow}>
      <div className={styles.media} aria-hidden="true">
        <img src={facadeHeroImg} alt="" className={styles.bg} />
        <div className={styles.overlay} />
        <div className={styles.glow} />
        <div className={styles.grid} />
      </div>

      <div className={styles.inner}>
        <div className={`${styles.copy} heroStagger`}>
          {eyebrow ? (
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className={styles.title}>
            {titleBefore}
            <span className={styles.highlight}>{titleHighlight}</span>
            {titleAfter}
          </h1>
          {body ? <p className={styles.body}>{body}</p> : null}
          <div className={styles.actions}>
            {primaryCta ? (
              <Link className={`${styles.primary} btnMotion`} to={primaryCta.href}>
                <span>{primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link className={`${styles.secondary} btnMotion`} to={secondaryCta.href}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div
          className={`${styles.annotations} ${calloutsVisible ? styles.calloutsVisible : ""}`}
          aria-hidden="true"
        >
          {callouts.map((item, index) => (
            <div
              key={item.label}
              className={`${styles.callout} ${styles[`side${item.side}`] || ""}`}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                transitionDelay: calloutsVisible ? `${index * 140}ms` : "0ms",
              }}
            >
              <div className={styles.calloutText}>
                <strong>{item.label}</strong>
                <span>{item.code}</span>
              </div>
              <span className={styles.leader}>
                <span className={styles.leaderLine} />
                <span className={styles.leaderDot} />
              </span>
            </div>
          ))}

          {footerNote ? (
            <div
              className={styles.footerNote}
              style={{
                transitionDelay: calloutsVisible ? `${callouts.length * 140 + 80}ms` : "0ms",
              }}
            >
              <span className={styles.footerIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="5" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                  <circle cx="19" cy="5" r="1.6" fill="currentColor" />
                  <circle cx="5" cy="12" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                  <circle cx="19" cy="12" r="1.6" fill="currentColor" />
                  <circle cx="5" cy="19" r="1.6" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                  <circle cx="19" cy="19" r="1.6" fill="currentColor" />
                </svg>
              </span>
              <span>
                {footerNote.split("\n").map((line) => (
                  <span key={line} className={styles.footerLine}>
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
