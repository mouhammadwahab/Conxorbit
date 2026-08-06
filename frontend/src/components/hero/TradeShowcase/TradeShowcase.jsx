import { useEffect, useState } from "react";
import facade from "../../../assets/tradeCards/facade.jfif";
import glass from "../../../assets/tradeCards/glass.jfif";
import aluminium from "../../../assets/tradeCards/aluminium.jfif";
import exterior from "../../../assets/tradeCards/exterior.webp";
import siteMonitoring from "../../../assets/tradeCards/site-monitoring.jpg";
import styles from "./TradeShowcase.module.css";

const TRADES = [
  { id: "facade", title: "Facade", tag: "Envelope", metric: "Live status", image: facade },
  { id: "glass", title: "Glass", tag: "Systems", metric: "Clarity first", image: glass },
  { id: "aluminium", title: "Aluminium", tag: "Fabrication", metric: "Shop ready", image: aluminium },
  { id: "exterior", title: "Exterior", tag: "Install", metric: "Site sync", image: exterior },
  { id: "monitoring", title: "Site Monitoring", tag: "Ops", metric: "Always on", image: siteMonitoring },
];

export default function TradeShowcase({ content }) {
  const [active, setActive] = useState(0);
  const { badge, title, body } = content;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TRADES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section} aria-label="Trades we support">
      <div className={styles.header}>
        <p className={styles.eyebrow}>{badge}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div className={styles.stage}>
        {TRADES.map((trade, index) => {
          const offset = index - active;
          const wrapped =
            ((offset + TRADES.length + Math.floor(TRADES.length / 2)) % TRADES.length) -
            Math.floor(TRADES.length / 2);
          const isCenter = wrapped === 0;

          return (
            <article
              key={trade.id}
              className={`${styles.card} ${isCenter ? styles.cardActive : ""} interactiveCard`}
              style={{
                transform: `translateX(${wrapped * 72}%) translateZ(${
                  isCenter ? 60 : -40
                }px) rotateY(${wrapped * -18}deg) scale(${isCenter ? 1 : 0.84})`,
                opacity: Math.abs(wrapped) > 1 ? 0 : isCenter ? 1 : 0.5,
                zIndex: 10 - Math.abs(wrapped),
              }}
              onClick={() => setActive(index)}
            >
              <img src={trade.image} alt={trade.title} />
              <div className={styles.overlay}>
                <span className={styles.tag}>{trade.tag}</span>
                <h3>{trade.title}</h3>
                <p>{trade.metric}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.dots} role="tablist" aria-label="Trade slides">
        {TRADES.map((trade, index) => (
          <button
            key={trade.id}
            type="button"
            className={index === active ? styles.dotActive : styles.dot}
            aria-label={trade.title}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
