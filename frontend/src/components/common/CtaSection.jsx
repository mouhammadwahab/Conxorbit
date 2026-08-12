import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionBadge from "./SectionBadge";
import styles from "./CtaSection.module.css";

export default function CtaSection({
  badge,
  title,
  body,
  primary,
  secondary,
  ariaLabel,
}) {
  return (
    <Reveal as="section" className={styles.section} aria-label={ariaLabel || badge || title}>
      <div className={`${styles.panel} revealHead`}>
        {badge ? (
          <SectionBadge variant="gold" size="sm" icon={false}>
            {badge}
          </SectionBadge>
        ) : null}
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
