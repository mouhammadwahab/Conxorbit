import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styles from "./GlanceModal.module.css";

const STORAGE_KEY = "conx-glance-modal-dismissed";

function PreviewPanel({ type }) {
  if (type === "inspect") {
    return (
      <div className={`${styles.preview} ${styles.previewInspect}`} aria-hidden="true">
        <span className={styles.previewStatus}>On Track</span>
        <span className={styles.previewLine} />
        <span className={styles.previewLine} />
        <span className={styles.previewLineShort} />
      </div>
    );
  }
  if (type === "drawing") {
    return (
      <div className={`${styles.preview} ${styles.previewDrawing}`} aria-hidden="true">
        <span className={styles.previewFrame} />
        <span className={styles.previewGrid} />
      </div>
    );
  }
  return (
    <div className={`${styles.preview} ${styles.previewPanel}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function GlanceModal({ content, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const scrollYRef = useRef(0);
  const {
    badge,
    title,
    body,
    solutionsLabel,
    solutions = [],
    footerPrompt,
    primaryCta,
    secondaryCta,
    actions,
  } = content;

  useEffect(() => {
    if (!open) return undefined;

    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    const { body: docBody, documentElement } = document;
    const prev = {
      overflow: docBody.style.overflow,
      position: docBody.style.position,
      top: docBody.style.top,
      width: docBody.style.width,
      paddingRight: docBody.style.paddingRight,
    };

    const scrollbar = window.innerWidth - documentElement.clientWidth;
    docBody.style.overflow = "hidden";
    docBody.style.position = "fixed";
    docBody.style.top = `-${scrollYRef.current}px`;
    docBody.style.width = "100%";
    if (scrollbar > 0) {
      docBody.style.paddingRight = `${scrollbar}px`;
    }

    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      docBody.style.overflow = prev.overflow;
      docBody.style.position = prev.position;
      docBody.style.top = prev.top;
      docBody.style.width = prev.width;
      docBody.style.paddingRight = prev.paddingRight;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.header}>
          <p className={styles.badge}>{badge}</p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <section className={styles.solutions} aria-label={solutionsLabel}>
          <h3 className={styles.colLabel}>{solutionsLabel}</h3>
          <div className={styles.solutionGrid}>
            {solutions.map((item) => (
              <article key={item.title} className={styles.solutionCard}>
                <PreviewPanel type={item.preview} />
                <span className={styles.solutionBadge}>{item.badge}</span>
                <strong className={styles.solutionTitle}>{item.title}</strong>
                <p className={styles.solutionBody}>{item.body}</p>
                <div className={styles.cardActions}>
                  <Link
                    className={`${styles.demoBtn} btnMotion`}
                    to={item.demoHref || item.href}
                    onClick={onClose}
                  >
                    <span>{actions?.viewDemo || "View Demo"}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <Link
                    className={`${styles.learnBtn} btnMotion`}
                    to={item.href}
                    onClick={onClose}
                  >
                    <span>{actions?.learnMore || "Learn More"}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.footer}>
          <p className={styles.footerPrompt}>{footerPrompt}</p>
          <div className={styles.footerActions}>
            {secondaryCta ? (
              <Link className={`${styles.secondary} btnMotion`} to={secondaryCta.href} onClick={onClose}>
                {secondaryCta.label}
              </Link>
            ) : null}
            {primaryCta ? (
              <Link className={`${styles.primary} btnMotion`} to={primaryCta.href} onClick={onClose}>
                <span>{primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function wasGlanceModalDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markGlanceModalDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}
