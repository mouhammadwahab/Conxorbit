import useTilt3D from "../../hooks/useTilt3D";
import styles from "./TiltCard.module.css";

export default function TiltCard({
  children,
  className = "",
  max = 8,
  scale = 1.02,
  as: Tag = "div",
  ...rest
}) {
  const { ref, onEnter, onMove, onLeave } = useTilt3D({ max, scale });

  return (
    <Tag
      ref={ref}
      className={`${styles.tilt} ${className}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <div className={styles.shine} aria-hidden="true" />
      <div className={styles.inner}>{children}</div>
    </Tag>
  );
}
