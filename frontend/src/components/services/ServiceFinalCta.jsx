import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./ServiceFinalCta.module.css";

export default function ServiceFinalCta({ content }) {
  const { badge, title, body, primary, secondary } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <span className={styles.badge}>
          <span aria-hidden="true">✦</span> {badge}
        </span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        <div className={styles.actions}>
          {primary ? (
            <Link className={styles.primary} to={primary.href}>
              {primary.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          {secondary ? (
            <Link className={styles.secondary} to={secondary.href}>
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
