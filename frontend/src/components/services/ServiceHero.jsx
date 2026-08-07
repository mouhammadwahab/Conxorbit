import { Link } from "react-router-dom";
import styles from "./ServiceHero.module.css";

export default function ServiceHero({ content }) {
  const { badge, title, body, primaryCta, secondaryCta } = content;

  return (
    <section className={styles.hero} aria-label={title}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.arc} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.badge}>{badge}</p>
        <h1 className={styles.title}>{title}</h1>
        {body ? <p className={styles.body}>{body}</p> : null}
        <div className={styles.actions}>
          {primaryCta ? (
            <Link className={styles.primary} to={primaryCta.href}>
              {primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link className={styles.secondary} to={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
