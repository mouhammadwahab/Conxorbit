import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import styles from "./FeatureList.module.css";

export default function FeatureList({
  title,
  items,
  variant = "cards",
  tone = "dark",
}) {
  const toneClass = tone === "light" ? "toneLight" : "toneDark";

  return (
    <Reveal
      as="section"
      className={`${styles.section} ${toneClass} ${tone === "light" ? styles.light : styles.dark}`}
    >
      <div className={styles.inner}>
        {title ? (
          <div className="revealHead">
            <h2 className={styles.title}>{title}</h2>
          </div>
        ) : null}
        {variant === "bullets" ? (
          <ul className={styles.bullets}>
            {items.map((item) => (
              <li
                key={typeof item === "string" ? item : item.title}
                className={`${styles.bulletItem} depthHover cardReveal`}
              >
                {typeof item === "string" ? item : item.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <TiltCard
                key={item.title}
                as="article"
                className={`${styles.card} interactiveCard cardReveal`}
                max={12}
                scale={1.04}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
