import { Link } from "react-router-dom";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";
import styles from "./Hero.module.css";

function BuildingGraphic({ className }) {
  return (
    <svg className={className} viewBox="0 0 280 340" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="bldgFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(90,107,59,0.55)" />
          <stop offset="100%" stopColor="rgba(8,18,14,0.85)" />
        </linearGradient>
        <linearGradient id="bldgSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(184,137,61,0.35)" />
          <stop offset="100%" stopColor="rgba(20,48,46,0.9)" />
        </linearGradient>
        <linearGradient id="bldgTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(243,201,105,0.45)" />
          <stop offset="100%" stopColor="rgba(90,107,59,0.4)" />
        </linearGradient>
      </defs>
      <path d="M140 28 L220 72 L220 250 L140 294 L60 250 L60 72 Z" fill="url(#bldgFace)" stroke="rgba(184,137,61,0.45)" strokeWidth="1.5" />
      <path d="M140 28 L220 72 L140 116 L60 72 Z" fill="url(#bldgTop)" stroke="rgba(243,201,105,0.5)" strokeWidth="1.2" />
      <path d="M140 116 L220 72 L220 250 L140 294 Z" fill="url(#bldgSide)" opacity="0.85" />
      {[0, 1, 2, 3, 4, 5, 6].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={78 + col * 22}
            y={130 + row * 20}
            width="14"
            height="10"
            rx="1.5"
            fill={row % 2 === col % 2 ? "rgba(243,201,105,0.55)" : "rgba(219,237,190,0.2)"}
          />
        ))
      )}
      <path d="M40 210 L90 185 L90 280 L40 305 Z" fill="rgba(20,48,46,0.65)" stroke="rgba(90,107,59,0.7)" strokeWidth="1.2" />
      <path d="M40 210 L90 185 L65 172 Z" fill="rgba(184,137,61,0.35)" stroke="rgba(184,137,61,0.5)" />
      <path d="M200 195 L250 170 L250 265 L200 290 Z" fill="rgba(8,18,14,0.7)" stroke="rgba(184,137,61,0.4)" strokeWidth="1.2" />
      <path d="M200 195 L250 170 L225 158 Z" fill="rgba(90,107,59,0.45)" />
      <ellipse cx="140" cy="170" rx="118" ry="42" stroke="rgba(184,137,61,0.35)" strokeWidth="1.2" strokeDasharray="6 8" />
      <circle cx="248" cy="155" r="5" fill="var(--gold, #b8893d)" />
    </svg>
  );
}

function StatCard({ className, label }) {
  return (
    <div className={className} aria-hidden="true">
      <span className={styles.cardLabel}>{label}</span>
    </div>
  );
}

const STAT_POSITIONS = ["cardLeft", "cardRight", "cardBottom"];

export default function Hero({ content }) {
  const {
    eyebrow,
    title,
    body,
    primaryCta,
    secondaryCta,
    statCards = [],
  } = content;
  const reduced = usePrefersReducedMotion();

  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        {reduced ? (
          <img
            className={styles.poster}
            src="/videos/hero-poster.jpg"
            alt=""
          />
        ) : (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.glow} />
      <div className={styles.glowSecondary} />

      <BuildingGraphic className={`${styles.graphic} ${styles.graphicLeft}`} />
      <BuildingGraphic className={`${styles.graphic} ${styles.graphicRight}`} />

      {statCards.map((card, index) => (
        <StatCard
          key={card.label}
          className={`${styles.systemCard} ${styles[STAT_POSITIONS[index]] || ""} interactiveCard`}
          label={card.label}
        />
      ))}

      <div className={`${styles.center} heroStagger`}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{body}</p>
        <div className={styles.actions}>
          <Link className={`${styles.btnPrimary} btnMotion`} to={primaryCta.href}>
            <span>{primaryCta.label}</span>
            <span className={styles.btnArrow} aria-hidden="true">
              →
            </span>
          </Link>
          <Link className={`${styles.btnOutline} btnMotion`} to={secondaryCta.href}>
            <span>{secondaryCta.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
