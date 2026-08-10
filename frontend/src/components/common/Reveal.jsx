import useInView from "../../hooks/useInView";

/**
 * Scroll reveal wrapper — CSS classes from motion.css (.reveal / .revealVisible).
 * as: polymorphic element tag (default section).
 * eager: immediate reveal for first-viewport heroes only.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0,
  eager = false,
  ...rest
}) {
  const [ref, visible] = useInView({ eager });
  const staggerClass = stagger > 0 ? `stagger${Math.min(stagger, 6)}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "revealVisible" : ""} ${staggerClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
