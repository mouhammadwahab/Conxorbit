import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./FacadeCTA.module.css";

export default function FacadeCTA({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, primary, secondary } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={eyebrow || title}>
      <div className={`${styles.inner} revealHead`}>
        {eyebrow ? (
          <p className={styles.badge}>
            <span className={styles.badgeIcon} aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className={styles.title}>{title}</h2>
        {body ? <p className={styles.body}>{body}</p> : null}
        <div className={styles.actions}>
          {primary ? (
            <Link className={`${styles.primary} btnMotion`} to={primary.href}>
              <span>{primary.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          {secondary ? (
            <Link className={`${styles.secondary} btnMotion`} to={secondary.href}>
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
