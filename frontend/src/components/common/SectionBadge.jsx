import styles from "./SectionBadge.module.css";

export default function SectionBadge({
  children,
  className = "",
  as: Tag = "span",
  variant = "gold",
  size = "md",
  tone = "dark",
  icon = true,
}) {
  if (!children) return null;

  const sizeClass = size === "sm" ? styles.sm : "";
  const toneClass = tone === "light" ? styles.light : "";

  return (
    <Tag
      className={`${styles.badge}${toneClass ? ` ${toneClass}` : ""}${
        sizeClass ? ` ${sizeClass}` : ""
      }${className ? ` ${className}` : ""}`.trim()}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          ✦
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </Tag>
  );
}
