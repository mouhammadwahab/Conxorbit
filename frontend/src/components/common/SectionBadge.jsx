import styles from "./SectionBadge.module.css";

export default function SectionBadge({
  children,
  className = "",
  as: Tag = "span",
  variant = "gold",
  size = "md",
}) {
  if (!children) return null;

  const sizeClass = size === "sm" ? styles.sm : "";

  return (
    <Tag
      className={`${styles.badge}${sizeClass ? ` ${sizeClass}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <span className={styles.icon} aria-hidden="true">
        ✦
      </span>
      <span className={styles.label}>{children}</span>
    </Tag>
  );
}
