import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import SectionBadge from "../../common/SectionBadge";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";
import styles from "./FeaturedCaseStudy.module.css";

const ICONS = {
  drawing: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h12v14H4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9h4M8 12h6M8 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 8l4-3v14l-4-3V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19V10M10 19V6M15 19v-7M20 19V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  files: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function DashboardScreen({ compact = false }) {
  return (
    <div className={`${styles.screen} ${compact ? styles.screenCompact : ""}`}>
      <div className={styles.screenTop}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <strong>PanelX</strong>
      </div>
      <div className={styles.screenBody}>
        <div className={styles.screenHero} />
        <div className={styles.screenStats}>
          <div>
            <em>72%</em>
            <span>Installed</span>
          </div>
          <div>
            <em>326</em>
            <span>Panels</span>
          </div>
        </div>
        <div className={styles.screenList}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedCaseStudy({ content }) {
  const {
    badge,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    mockupLabel,
    cta,
    features = [],
  } = content;
  const reduced = usePrefersReducedMotion();
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShowMobile(true);
      return undefined;
    }
    const id = window.setInterval(() => {
      setShowMobile((prev) => !prev);
    }, 3000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const leftFeatures = features.slice(0, 2);
  const rightFeatures = features.slice(2, 4);

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.header} revealHead`}>
        <SectionBadge>{badge}</SectionBadge>
        <h2>
          {titleBefore}
          <span className={styles.highlight}>{titleHighlight}</span>
          {titleAfter}
        </h2>
        {body ? <p>{body}</p> : null}
      </div>

      <div className={styles.stage}>
        <div className={styles.sideCol}>
          {leftFeatures.map((feature) => (
            <article key={feature.title} className={`${styles.featureCard} interactiveCard cardReveal`}>
              <span className={styles.featureIcon}>{ICONS[feature.icon]}</span>
              <div>
                <h3>{feature.title}</h3>
                {feature.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.mockupWrap}>
          <p className={styles.mockupLabel}>{mockupLabel}</p>
          <div className={styles.deviceStage}>
            <div
              className={`${styles.laptop} ${!showMobile ? styles.deviceActive : styles.deviceIdle}`}
              aria-hidden={showMobile}
            >
              <div className={styles.laptopBezel}>
                <DashboardScreen />
              </div>
              <div className={styles.laptopBase} />
            </div>
            <div
              className={`${styles.phone} ${showMobile ? styles.deviceActive : styles.deviceIdle}`}
              aria-hidden={!showMobile}
            >
              <div className={styles.phoneBezel}>
                <DashboardScreen compact />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          {rightFeatures.map((feature) => (
            <article key={feature.title} className={`${styles.featureCard} interactiveCard cardReveal`}>
              <span className={styles.featureIcon}>{ICONS[feature.icon]}</span>
              <div>
                <h3>{feature.title}</h3>
                {feature.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Link className={`${styles.cta} linkDraw`} to={cta.href}>
          {cta.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}
