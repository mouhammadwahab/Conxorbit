import { useState } from "react";
import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import Reveal from "../components/common/Reveal";
import TiltCard from "../components/common/TiltCard";
import PageShell from "../components/layout/PageShell/PageShell";
import { contactContent, site } from "../content/siteContent";
import { track } from "../utils/analytics";
import styles from "./Contact.module.css";

const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

export default function Contact() {
  const { meta, hero, form, aside } = contactContent;
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    track("contact_submit_attempt");

    const payload = { ...values, to: site.email };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        track("contact_submit_success");
        setValues({ name: "", email: "", company: "", message: "" });
        return;
      }

      const subject = encodeURIComponent(`Project inquiry from ${values.name || "website"}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company}\n\nWhat they're looking to build:\n${values.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      track("contact_submit_mailto");
    } catch (error) {
      setStatus("error");
      track("contact_submit_error");
    }
  };

  const whatsappHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <PageShell atmosphere="contact">
      <SEO title={meta.title} description={meta.description} path="/contact" />
      <PageHero {...hero} />
      <Reveal as="section" className={`${styles.section} toneDark`}>
        <div className={styles.grid}>
          <TiltCard as="div" className={`${styles.formTilt} cardReveal`} max={6} scale={1.01}>
            <form className={`${styles.form} ${styles.card3d} interactiveCard`} onSubmit={onSubmit} noValidate>
              <label>
                <span>{form.fields.name}</span>
                <input
                  name="name"
                  type="text"
                  required
                  value={values.name}
                  onChange={onChange}
                  autoComplete="name"
                />
              </label>
              <label>
                <span>{form.fields.email}</span>
                <input
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={onChange}
                  autoComplete="email"
                />
              </label>
              <label>
                <span>{form.fields.company}</span>
                <input
                  name="company"
                  type="text"
                  value={values.company}
                  onChange={onChange}
                  autoComplete="organization"
                />
              </label>
              <label>
                <span>{form.fields.message}</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={onChange}
                />
              </label>
              <button className="btnMotion" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : form.submit}
              </button>
              {status === "success" ? <p className={styles.success}>{form.success}</p> : null}
              {status === "error" ? <p className={styles.error}>{form.error}</p> : null}
            </form>
          </TiltCard>

          <TiltCard as="aside" className={`${styles.aside} ${styles.card3d} interactiveCard cardReveal`} max={8} scale={1.02}>
            <h2>{aside.title}</h2>
            <p>
              <span>{aside.emailLabel}</span>
              <a className="linkDraw" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <span>{aside.phoneLabel}</span>
              <a className="linkDraw" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </p>
            <p>
              <span>{aside.whatsappLabel}</span>
              <a className="linkDraw" href={whatsappHref} target="_blank" rel="noreferrer">
                {site.whatsappLabel}
              </a>
            </p>
          </TiltCard>
        </div>
      </Reveal>
    </PageShell>
  );
}
