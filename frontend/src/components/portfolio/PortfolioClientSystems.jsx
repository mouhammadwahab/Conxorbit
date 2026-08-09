import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./PortfolioClientSystems.module.css";

export default function PortfolioClientSystems({ content }) {
  if (!content) return null;
  const { badge, title, body, items = [] } = content;

  return (
    <section className={styles.section} aria-label={badge}>
      <div className={styles.header}>
        <SectionBadge variant="gold">{badge}</SectionBadge>
        <h2 className={styles.title}>{title}</h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </div>

      <div className={styles.list}>
        {items.map((item, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal
              key={item.name}
              className={`${styles.row} ${reverse ? styles.reverse : ""}`}
              eager={i === 0}
            >
              <div className={`${styles.media} mediaZoom`}>
                {item.badge ? (
                  <span className={styles.mediaBadge}>{item.badge}</span>
                ) : null}
                <img src={item.image || item.imageFallback} alt="" loading="lazy" />
              </div>
              <div className={`${styles.copy} revealHead`}>
                <span className={styles.index}>{item.index}</span>
                <h3 className={styles.name}>{item.name}</h3>
                {item.confidential ? (
                  <span className={styles.confidential}>
                    <svg className={styles.lockIcon} viewBox="0 0 16 16" aria-hidden="true">
                      <rect x="3" y="7" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {item.confidentialLabel}
                  </span>
                ) : null}
                {item.body ? <p className={styles.itemBody}>{item.body}</p> : null}
                <div className={styles.tags}>
                  {(item.tags || []).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {item.cta ? (
                  <Link className={`${styles.cta} linkDraw`} to={item.cta.href}>
                    {item.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
