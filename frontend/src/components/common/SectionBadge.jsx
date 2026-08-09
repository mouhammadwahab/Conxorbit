import styles from "./SectionBadge.module.css";

export default function SectionBadge({
  children,
  className = "",
  as: Tag = "span",
  variant = "light",
  size = "md",
}) {
  if (!children) return null;

  const variantClass = variant === "gold" ? styles.gold : styles.light;
  const sizeClass = size === "sm" ? styles.sm : "";

  return (
    <Tag
      className={`${styles.badge} ${variantClass}${sizeClass ? ` ${sizeClass}` : ""}${
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
