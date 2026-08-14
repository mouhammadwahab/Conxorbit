import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { site } from "../../../content/siteContent";
import { track } from "../../../utils/analytics";
import styles from "./WorkflowDiscoveryModal.module.css";

const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

const emptyContact = {
  name: "",
  email: "",
  company: "",
  role: "",
  phone: "",
};

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14 24.5l6.5 6.5L34 17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WorkflowDiscoveryModal({ content, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const scrollYRef = useRef(0);
  const [step, setStep] = useState(0);
  const [workflows, setWorkflows] = useState([]);
  const [frictions, setFrictions] = useState([]);
  const [frictionNote, setFrictionNote] = useState("");
  const [processToday, setProcessToday] = useState("");
  const [idealImprove, setIdealImprove] = useState("");
  const [contact, setContact] = useState(emptyContact);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setStep(0);
    setWorkflows([]);
    setFrictions([]);
    setFrictionNote("");
    setProcessToday("");
    setIdealImprove("");
    setContact(emptyContact);
    setStatus("idle");
    setError("");
    setDone(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    window.setTimeout(reset, 200);
  }, [onClose, reset]);

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
      if (event.key === "Escape") handleClose();
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
  }, [open, handleClose]);

  if (!open || typeof document === "undefined" || !content) return null;

  const {
    badge,
    crumb,
    steps = [],
    workflow,
    friction,
    details,
    connect,
    success,
    actions,
    errors,
  } = content;

  const stepCount = steps.length;
  const canContinue =
    (step === 0 && workflows.length > 0) ||
    (step === 1 && frictions.length > 0) ||
    step === 2 ||
    (step === 3 &&
      contact.name.trim() &&
      contact.email.trim() &&
      contact.company.trim());

  const onContactChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const goNext = () => {
    if (!canContinue) return;
    if (step < stepCount - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const labelFor = (list, id) => list.find((item) => item.id === id)?.title || id;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canContinue || status === "loading") return;

    setStatus("loading");
    setError("");
    track("workflow_discovery_submit_attempt");

    const workflowLabels = workflows.map((id) => labelFor(workflow.options, id));
    const frictionLabels = frictions.map((id) => labelFor(friction.options, id));

    const payload = {
      type: "workflow-discovery",
      workflows: workflowLabels,
      frictions: frictionLabels,
      frictionNote,
      processToday,
      idealImprove,
      name: contact.name,
      email: contact.email,
      company: contact.company,
      role: contact.role,
      phone: contact.phone,
      to: site.email,
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        setDone(true);
        track("workflow_discovery_submit_success");
        return;
      }

      const subject = encodeURIComponent(
        `Workflow discovery from ${contact.name || "website"}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${contact.name}`,
          `Email: ${contact.email}`,
          `Company: ${contact.company}`,
          `Role: ${contact.role || "—"}`,
          `Phone: ${contact.phone || "—"}`,
          "",
          `Workflows: ${workflowLabels.join(", ") || "—"}`,
          `Friction: ${frictionLabels.join(", ") || "—"}`,
          `Friction note: ${frictionNote || "—"}`,
          "",
          "Process today:",
          processToday || "—",
          "",
          "Ideal improvement:",
          idealImprove || "—",
        ].join("\n")
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setDone(true);
      track("workflow_discovery_submit_mailto");
    } catch {
      setStatus("error");
      setError(errors?.submit || "Something went wrong.");
      track("workflow_discovery_submit_error");
    }
  };

  const panelClass = done ? `${styles.panel} ${styles.panelSuccess}` : styles.panel;

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={handleClose}>
      <div
        className={panelClass}
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
          onClick={handleClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.top}>
          <p className={styles.badge}>{badge}</p>
          {!done ? (
            <div className={styles.metaRow}>
              <p className={styles.crumb}>{crumb}</p>
              <p className={styles.stepCount}>
                WORKFLOW {String(step + 1).padStart(2, "0")} / {stepCount}
              </p>
            </div>
          ) : null}
        </div>

        {done ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>
              <CheckIcon />
            </span>
            <h2 id={titleId} className={styles.successTitle}>
              {success.title}
            </h2>
            <p className={styles.successBody}>{success.body}</p>
            <div className={styles.successActions}>
              <Link
                className={`${styles.primary} btnMotion`}
                to={success.primaryCta.href}
                onClick={handleClose}
              >
                <span>{success.primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <button type="button" className={styles.textBtn} onClick={handleClose}>
                {success.closeLabel}
              </button>
            </div>
            <p className={styles.footnote}>{success.footnote}</p>
          </div>
        ) : (
          <>
            <nav className={styles.stepper} aria-label="Workflow discovery steps">
              {steps.map((item, index) => {
                const state =
                  index < step ? styles.stepDone : index === step ? styles.stepActive : styles.stepIdle;
                return (
                  <div key={item.id} className={`${styles.stepItem} ${state}`}>
                    <span className={styles.stepRule} aria-hidden="true" />
                    <span className={styles.stepLabel}>
                      {String(index + 1).padStart(2, "0")} {item.label}
                    </span>
                  </div>
                );
              })}
            </nav>

            <div className={styles.body}>
              {step === 0 ? (
                <section aria-labelledby={titleId}>
                  <h2 id={titleId} className={styles.title}>
                    {workflow.title}
                  </h2>
                  <p className={styles.subtitle}>{workflow.subtitle}</p>
                  <div className={styles.optionGrid}>
                    {workflow.options.map((option, index) => {
                      const selected = workflows.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`${styles.optionCard} ${selected ? styles.optionSelected : ""}`}
                          aria-pressed={selected}
                          onClick={() => setWorkflows((prev) => toggleId(prev, option.id))}
                        >
                          <span className={styles.optionNum}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.optionCopy}>
                            <strong>{option.title}</strong>
                            <span>{option.body}</span>
                          </span>
                          <span className={styles.radio} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {step === 1 ? (
                <section aria-labelledby={titleId}>
                  <h2 id={titleId} className={styles.title}>
                    {friction.title}
                  </h2>
                  <p className={styles.subtitle}>{friction.subtitle}</p>
                  <div className={styles.optionGrid}>
                    {friction.options.map((option) => {
                      const selected = frictions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`${styles.optionCard} ${styles.optionSimple} ${
                            selected ? styles.optionSelected : ""
                          }`}
                          aria-pressed={selected}
                          onClick={() => setFrictions((prev) => toggleId(prev, option.id))}
                        >
                          <span className={styles.optionCopy}>
                            <strong>{option.title}</strong>
                          </span>
                          <span className={styles.radio} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                  <label className={`${styles.field} ${styles.frictionNote}`}>
                    <span>{friction.otherNoteLabel}</span>
                    <textarea
                      rows={3}
                      value={frictionNote}
                      onChange={(e) => setFrictionNote(e.target.value)}
                      placeholder={friction.otherNotePlaceholder}
                    />
                  </label>
                </section>
              ) : null}

              {step === 2 ? (
                <section aria-labelledby={titleId}>
                  <h2 id={titleId} className={styles.title}>
                    {details.title}
                  </h2>
                  <p className={styles.subtitle}>{details.subtitle}</p>
                  <div className={styles.fields}>
                    <label className={styles.field}>
                      <span>{details.processLabel}</span>
                      <textarea
                        rows={4}
                        value={processToday}
                        onChange={(e) => setProcessToday(e.target.value)}
                        placeholder={details.processPlaceholder}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>{details.idealLabel}</span>
                      <textarea
                        rows={4}
                        value={idealImprove}
                        onChange={(e) => setIdealImprove(e.target.value)}
                        placeholder={details.idealPlaceholder}
                      />
                    </label>
                  </div>
                </section>
              ) : null}

              {step === 3 ? (
                <section aria-labelledby={titleId}>
                  <p className={styles.connectIntro}>{connect.intro}</p>
                  <h2 id={titleId} className={styles.srOnly}>
                    Connect
                  </h2>
                  <form className={styles.connectForm} onSubmit={onSubmit} id="workflow-connect-form">
                    <label className={styles.field}>
                      <span>
                        {connect.fields.name.label}
                        {connect.fields.name.required ? <em aria-hidden="true">*</em> : null}
                      </span>
                      <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={contact.name}
                        onChange={onContactChange}
                        placeholder={connect.fields.name.placeholder}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>
                        {connect.fields.email.label}
                        {connect.fields.email.required ? <em aria-hidden="true">*</em> : null}
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={contact.email}
                        onChange={onContactChange}
                        placeholder={connect.fields.email.placeholder}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>
                        {connect.fields.company.label}
                        {connect.fields.company.required ? <em aria-hidden="true">*</em> : null}
                      </span>
                      <input
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        value={contact.company}
                        onChange={onContactChange}
                        placeholder={connect.fields.company.placeholder}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>{connect.fields.role.label}</span>
                      <input
                        name="role"
                        type="text"
                        autoComplete="organization-title"
                        value={contact.role}
                        onChange={onContactChange}
                        placeholder={connect.fields.role.placeholder}
                      />
                    </label>
                    <label className={`${styles.field} ${styles.fieldFull}`}>
                      <span>
                        {connect.fields.phone.label}
                        {connect.fields.phone.optionalHint ? (
                          <span className={styles.optional}> ({connect.fields.phone.optionalHint})</span>
                        ) : null}
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={contact.phone}
                        onChange={onContactChange}
                        placeholder={connect.fields.phone.placeholder}
                      />
                    </label>
                  </form>
                  {error ? <p className={styles.error}>{error}</p> : null}
                </section>
              ) : null}
            </div>

            <div className={styles.footer}>
              {step > 0 ? (
                <button type="button" className={styles.back} onClick={goBack}>
                  ← {actions.back}
                </button>
              ) : (
                <span />
              )}
              {step < stepCount - 1 ? (
                <button
                  type="button"
                  className={`${styles.primary} btnMotion`}
                  disabled={!canContinue}
                  onClick={goNext}
                >
                  <span>{actions.continue}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  form="workflow-connect-form"
                  className={`${styles.primary} btnMotion`}
                  disabled={!canContinue || status === "loading"}
                >
                  <span>{status === "loading" ? actions.submitting : actions.submit}</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
