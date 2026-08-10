import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styles from "./GlanceModal.module.css";

const STORAGE_KEY = "conx-glance-modal-dismissed";

function SolutionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function GlanceModal({ content, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const scrollYRef = useRef(0);
  const {
    badge,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    servicesLabel,
    solutionsLabel,
    services = [],
    solutions = [],
    footerPrompt,
    primaryCta,
    secondaryCta,
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

    // Don't scroll the page when moving focus into the dialog
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
          <p className={styles.badge}>
            <span aria-hidden="true">•</span> {badge}
          </p>
          <h2 id={titleId} className={styles.title}>
            {titleBefore}
            <span className={styles.highlight}>{titleHighlight}</span>
            {titleAfter}
          </h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <div className={styles.columns}>
          <section className={styles.services} aria-label={servicesLabel}>
            <h3 className={styles.colLabel}>{servicesLabel}</h3>
            <ol className={styles.serviceList}>
              {services.map((item, index) => (
                <li key={item.title}>
                  <Link to={item.href} className={styles.serviceLink} onClick={onClose}>
                    <span className={styles.serviceNum}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.serviceCopy}>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.solutions} aria-label={solutionsLabel}>
            <h3 className={styles.colLabel}>{solutionsLabel}</h3>
            <div className={styles.solutionGrid}>
              {solutions.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={styles.solutionCard}
                  onClick={onClose}
                >
                  <span className={styles.solutionIcon}>
                    <SolutionIcon />
                  </span>
                  <span className={styles.solutionCopy}>
                    <span className={styles.solutionBadge}>{item.badge}</span>
                    <strong>{item.title}</strong>
                    <span className={styles.solutionBody}>{item.body}</span>
                  </span>
                  <span className={styles.solutionArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerPrompt}>{footerPrompt}</p>
          <div className={styles.footerActions}>
            {primaryCta ? (
              <Link className={styles.primary} to={primaryCta.href} onClick={onClose}>
                <span>{primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link className={styles.secondary} to={secondaryCta.href} onClick={onClose}>
                {secondaryCta.label}
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
