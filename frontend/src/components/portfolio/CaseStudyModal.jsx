import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./CaseStudyModal.module.css";

const BLOCKS = [
  { key: "problem", label: "Problem", field: "problem" },
  { key: "built", label: "What we built", field: "built" },
  { key: "result", label: "Result", field: "result" },
];

export default function CaseStudyModal({ study, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const scrollYRef = useRef(0);
  const reduced = usePrefersReducedMotion();

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

  if (!open || !study || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={`${styles.panel} ${reduced ? styles.noMotion : styles.enter}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.glow} aria-hidden="true" />

        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Close case study"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <header className={styles.header}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Case Study{study.category ? ` • ${study.category}` : ""}
          </p>
          <h2 id={titleId} className={styles.title}>
            {study.title}
          </h2>
          {study.projectType ? <p className={styles.industry}>{study.projectType}</p> : null}
          {study.shortDescription ? <p className={styles.summary}>{study.shortDescription}</p> : null}
        </header>

        <div className={styles.blocks}>
          {BLOCKS.map((block, index) => (
            <section
              key={block.key}
              className={styles.block}
              style={{ "--i": index }}
            >
              <span className={styles.blockIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.blockCopy}>
                <h3>{block.label}</h3>
                <p>{study[block.field]}</p>
              </div>
            </section>
          ))}
        </div>

        {study.quote ? (
          <blockquote className={styles.quote}>
            <p>“{study.quote.text}”</p>
            <cite>— {study.quote.author}</cite>
          </blockquote>
        ) : null}

        <footer className={styles.footer}>
          <button type="button" className={styles.textClose} onClick={onClose}>
            Close
          </button>
          <Link className={`${styles.primary} btnMotion`} to="/book-discovery" onClick={onClose}>
            <span>Book a Discovery Call</span>
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </div>,
    document.body
  );
}
