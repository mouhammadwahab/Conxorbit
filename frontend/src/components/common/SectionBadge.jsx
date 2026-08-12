import styles from "./SectionBadge.module.css";

export default function SectionBadge({
  children,
  className = "",
  as: Tag = "span",
  variant = "gold",
  size = "md",
  icon = true,
}) {
  if (!children) return null;

  const sizeClass = size === "sm" ? styles.sm : "";

  return (
    <Tag
      className={`${styles.badge}${sizeClass ? ` ${sizeClass}` : ""}${
        className ? ` ${className}` : ""
      }`}
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
