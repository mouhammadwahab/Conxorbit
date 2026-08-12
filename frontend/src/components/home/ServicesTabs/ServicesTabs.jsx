import { useState } from "react";
import Reveal from "../../common/Reveal";
import SectionBadge from "../../common/SectionBadge";
import styles from "./ServicesTabs.module.css";

const TAB_ICONS = {
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 19c1-3 2.8-4.5 5-4.5S13 16 14 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 19c1-3 2.8-4.5 5-4.5S13 16 14 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.2 11.2l7.2-3.2M8.2 12.8l7.2 3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  training: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 11.5v4.2c0 .8 2.2 2.3 5 2.3s5-1.5 5-2.3v-4.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

export default function ServicesTabs({ content }) {
  const {
    badge,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    image,
    imageCaption,
    items = [],
  } = content;
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) || items[0];

  if (!active) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className="revealHead">
            <SectionBadge>{badge}</SectionBadge>
            <h2>
              {titleBefore}
              <span className={styles.highlight}>{titleHighlight}</span>
              {titleAfter}
            </h2>
            {body ? <p className={styles.intro}>{body}</p> : null}
          </div>

          <div className={`${styles.detail} interactiveCard cardReveal`} key={active.id}>
            <span className={styles.detailIcon}>{TAB_ICONS[active.id] || TAB_ICONS.workflow}</span>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <ul>
              {active.points.map((point) => (
                <li key={point}>
                  <span aria-hidden="true">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Services">
            {items.map((item) => {
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`${selected ? styles.tabActive : styles.tab} interactiveCard`}
                  onClick={() => setActiveId(item.id)}
                >
                  <span className={styles.tabIcon}>{TAB_ICONS[item.id] || TAB_ICONS.workflow}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${styles.right} cardReveal`}>
          <div className={`${styles.media} mediaZoom`}>
            <img src={image} alt="" />
            {imageCaption ? <span className={styles.caption}>{imageCaption}</span> : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
