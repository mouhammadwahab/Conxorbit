import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  body,
  align = "center",
  tone = "shell",
}) {
  return (
    <header
      className={`${styles.hero} heroStagger ${align === "left" ? styles.left : styles.center} ${
        tone === "shell" ? styles.shellTone : styles.solidTone
      }`}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 className={styles.title}>
        {typeof title === "string" && title.includes("\n")
          ? title.split("\n").map((line) => (
              <span key={line} className={styles.titleLine}>
                {line}
              </span>
            ))
          : title}
      </h1>
      {body ? <p className={styles.body}>{body}</p> : null}
    </header>
  );
}

export function CTABand({
  title,
  body,
  href,
  label,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <Reveal as="section" className={styles.ctaBand}>
      <div className={`${styles.ctaInner} ${styles.card3d} interactiveCard revealHead`}>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        <div className={styles.ctaActions}>
          <Link className={`${styles.ctaButton} btnMotion`} to={href}>
            <span>{label}</span>
            <span aria-hidden="true">→</span>
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link className={`${styles.ctaButtonSecondary} btnMotion`} to={secondaryHref}>
              <span>{secondaryLabel}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
