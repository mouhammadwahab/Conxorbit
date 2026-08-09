import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./ServiceFinalCta.module.css";

export default function ServiceFinalCta({ content }) {
  const { badge, title, body, primary, secondary } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={`${styles.inner} revealHead`}>
        <SectionBadge variant="gold" size="sm">
          {badge}
        </SectionBadge>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        <div className={styles.actions}>
          {primary ? (
            <Link className={`${styles.primary} btnMotion`} to={primary.href}>
              <span>{primary.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          {secondary ? (
            <Link className={`${styles.secondary} btnMotion`} to={secondary.href}>
              <span>{secondary.label}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
