import TiltCard from "./TiltCard";
import useInView from "../../hooks/useInView";
import styles from "./FeatureList.module.css";

export default function FeatureList({
  title,
  items,
  variant = "cards",
  tone = "dark",
}) {
  const [ref, visible] = useInView();
  const toneClass = tone === "light" ? "toneLight" : "toneDark";

  return (
    <section
      ref={ref}
      className={`${styles.section} ${toneClass} ${tone === "light" ? styles.light : styles.dark} ${
        visible ? `${styles.visible} visible` : styles.hidden
      }`}
    >
      <div className={styles.inner}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        {variant === "bullets" ? (
          <ul className={styles.bullets}>
            {items.map((item, index) => (
              <li
                key={typeof item === "string" ? item : item.title}
                style={{ transitionDelay: `${index * 70}ms` }}
                className={`${styles.bulletItem} depthHover`}
              >
                {typeof item === "string" ? item : item.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <TiltCard
                key={item.title}
                as="article"
                className={`${styles.card} interactiveCard cardReveal`}
                max={12}
                scale={1.04}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
