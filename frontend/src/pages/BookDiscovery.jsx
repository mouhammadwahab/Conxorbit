import { useState } from "react";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import SectionBadge from "../components/common/SectionBadge";
import PageShell from "../components/layout/PageShell/PageShell";
import { discoveryContent } from "../content/discoveryContent";
import { site } from "../content/siteContent";
import { track } from "../utils/analytics";
import styles from "./BookDiscovery.module.css";

const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

const emptyValues = {
  name: "",
  email: "",
  company: "",
  role: "",
  industry: "",
  message: "",
};

export default function BookDiscovery() {
  const { meta, hero, form, fit } = discoveryContent;
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState(emptyValues);
  const [topics, setTopics] = useState([]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTopic = (topic) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    track("discovery_submit_attempt");

    const payload = {
      ...values,
      topics,
      type: "discovery",
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
        track("discovery_submit_success");
        setValues(emptyValues);
        setTopics([]);
        return;
      }

      const subject = encodeURIComponent(
        `Discovery call request from ${values.name || "website"}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Company: ${values.company}`,
          `Role: ${values.role}`,
          `Industry: ${values.industry}`,
          `Topics: ${topics.join(", ") || "—"}`,
          "",
          "What they're trying to improve:",
          values.message,
        ].join("\n")
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      track("discovery_submit_mailto");
    } catch (error) {
      setStatus("error");
      track("discovery_submit_error");
    }
  };

  return (
    <PageShell atmosphere="contact">
      <SEO title={meta.title} description={meta.description} path="/book-discovery" />
      <div className={styles.page}>
        <Reveal as="header" className={`${styles.header} revealHead`} eager aria-label={hero.title}>
          {hero.badge ? <SectionBadge>{hero.badge}</SectionBadge> : null}
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.body}</p>
        </Reveal>

        <Reveal as="form" className={styles.card} onSubmit={onSubmit} noValidate>
          <div className={styles.cardTop}>
            <span className={styles.cardBadge}>{form.badge}</span>
            <span className={styles.cardStatus}>
              <span className={styles.statusDot} aria-hidden="true" />
              {form.status}
            </span>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>
                {form.fields.name} <em>*</em>
              </span>
              <input
                name="name"
                type="text"
                required
                placeholder={form.fields.namePlaceholder}
                value={values.name}
                onChange={onChange}
                autoComplete="name"
              />
            </label>
            <label className={styles.field}>
              <span>
                {form.fields.email} <em>*</em>
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder={form.fields.emailPlaceholder}
                value={values.email}
                onChange={onChange}
                autoComplete="email"
              />
            </label>
            <label className={styles.field}>
              <span>
                {form.fields.company} <em>*</em>
              </span>
              <input
                name="company"
                type="text"
                required
                placeholder={form.fields.companyPlaceholder}
                value={values.company}
                onChange={onChange}
                autoComplete="organization"
              />
            </label>
            <label className={styles.field}>
              <span>{form.fields.role}</span>
              <input
                name="role"
                type="text"
                placeholder={form.fields.rolePlaceholder}
                value={values.role}
                onChange={onChange}
                autoComplete="organization-title"
              />
            </label>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span>{form.fields.industry}</span>
              <select
                name="industry"
                value={values.industry}
                onChange={onChange}
                className={!values.industry ? styles.selectPlaceholder : undefined}
              >
                <option value="">{form.fields.industryPlaceholder}</option>
                {form.industries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.divider} />

          <fieldset className={styles.topics}>
            <legend>{form.topicsLabel}</legend>
            <div className={styles.pills}>
              {form.topics.map((topic) => {
                const active = topics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    className={`${styles.pill} ${active ? styles.pillActive : ""}`}
                    aria-pressed={active}
                    onClick={() => toggleTopic(topic)}
                  >
                    {active ? <span aria-hidden="true">• </span> : null}
                    {topic}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className={`${styles.field} ${styles.fieldFull}`}>
            <span>{form.improveLabel}</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={form.improvePlaceholder}
              value={values.message}
              onChange={onChange}
            />
          </label>

          <div className={styles.divider} />

          <div className={styles.actions}>
            <button className={`${styles.submit} btnMotion`} type="submit" disabled={status === "loading"}>
              <span>{status === "loading" ? "Sending…" : form.submit}</span>
              <span aria-hidden="true">→</span>
            </button>
            <p className={styles.footnote}>{form.footnote}</p>
            {status === "success" ? <p className={styles.success}>{form.success}</p> : null}
            {status === "error" ? <p className={styles.error}>{form.error}</p> : null}
          </div>
        </Reveal>

        {fit ? (
          <Reveal as="section" className={styles.fit} aria-label={fit.title}>
            <div className={styles.fitHead}>
              <span className={styles.fitEyebrow}>
                <span className={styles.fitRule} aria-hidden="true" />
                {fit.eyebrow}
              </span>
              <h2 className={styles.fitTitle}>{fit.title}</h2>
            </div>
            <div className={styles.fitGrid}>
              {fit.columns.map((column) => (
                <div key={column.heading} className={styles.fitCol}>
                  <h3 className={styles.fitColHeading}>{column.heading}</h3>
                  <ul className={styles.fitList}>
                    {column.items.map((item) => (
                      <li key={item}>
                        <span className={styles.fitCheck} aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3.5 8.2l3 3 6-6.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </PageShell>
  );
}
