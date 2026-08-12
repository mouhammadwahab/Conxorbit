import SectionBadge from "./SectionBadge";
import CtaSection from "./CtaSection";
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
      {eyebrow ? (
        <div className={styles.badgeRow}>
          <SectionBadge>{eyebrow}</SectionBadge>
        </div>
      ) : null}
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
    <CtaSection
      title={title}
      body={body}
      primary={href && label ? { href, label } : null}
      secondary={
        secondaryHref && secondaryLabel
          ? { href: secondaryHref, label: secondaryLabel }
          : null
      }
      ariaLabel={title}
    />
  );
}
