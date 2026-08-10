import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./ServiceHero.module.css";

export default function ServiceHero({ content }) {
  const {
    badge,
    title,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    primaryCta,
    secondaryCta,
  } = content;

  const heading =
    titleHighlight != null
      ? `${titleBefore || ""}${titleHighlight}${titleAfter || ""}`
      : title;

  return (
    <Reveal as="section" className={styles.hero} eager aria-label={heading}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.arc} aria-hidden="true" />
      <div className={`${styles.inner} heroStagger`}>
        <SectionBadge variant="gold">{badge}</SectionBadge>
        <h1 className={styles.title}>
          {titleHighlight != null ? (
            <>
              {titleBefore}
              <span className={styles.highlight}>{titleHighlight}</span>
              {titleAfter}
            </>
          ) : (
            title
          )}
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
              <span>{secondaryCta.label}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
