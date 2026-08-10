import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import { footerContent, site } from "../../../content/siteContent";
import brandLogo from "../../../assets/images/Logo.png";
import styles from "./Footer.module.css";

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 9.5v8M6.5 7.2v.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 17.5v-4.5c0-2.4 3.2-2.6 3.2 0v4.5M10.5 10.5v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5a8.2 8.2 0 0 0-7 12.5L4 20.5l4.7-1.2A8.2 8.2 0 1 0 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.2 9.4c.3-.6.5-.6.8-.6h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.1.4.1.6.3.4.8.9 1.4 1.2.5.3.7.2.9 0l.6-.7c.2-.2.4-.2.6-.1l1.8.7c.3.1.4.3.4.5v.6c0 .3-.1.5-.4.7-.5.3-1.2.5-2 .4-2-.2-4.3-1.8-5.7-3.7-1.2-1.7-1.6-3.3-1.5-4.3.1-.5.3-.9.6-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function FooterLink({ link }) {
  const external = /^(mailto:|https?:)/i.test(link.href);
  if (external) {
    return (
      <a className="linkDraw" href={link.href}>
        {link.label}
      </a>
    );
  }
  return (
    <Link className="linkDraw" to={link.href}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  const whatsappHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className={styles.footer}>
      <Reveal className={styles.inner}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <img src={brandLogo} alt="" className={styles.logo} />
            <span>{site.name}</span>
          </Link>
          <p className={styles.blurb}>{footerContent.blurb}</p>
          <span className={styles.brandRule} aria-hidden="true" />
        </div>

        {footerContent.columns.map((col, index) => (
          <nav
            key={col.title}
            className={`${styles.col} cardReveal stagger${Math.min(index + 2, 6)}`}
            aria-label={col.title}
          >
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={`${col.title}-${link.label}`}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Reveal>

      <div className={styles.bottom}>
        <p>{footerContent.legal}</p>
        <div className={styles.socials}>
          <a className={styles.social} href={`mailto:${site.email}`} aria-label="Email">
            <IconEmail />
          </a>
          <a
            className={styles.social}
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <IconWhatsApp />
          </a>
          <a
            className={styles.social}
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
