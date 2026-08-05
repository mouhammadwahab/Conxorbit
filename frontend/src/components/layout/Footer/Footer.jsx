import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";
import { footerContent, site } from "../../../content/siteContent";
import brandLogo from "../../../assets/images/Logo.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Reveal className={styles.inner}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <img src={brandLogo} alt="ConX Orbit logo" className={styles.logo} />
            <span>{site.name}</span>
          </Link>
          <p>{footerContent.blurb}</p>
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        {footerContent.columns.map((col, index) => (
          <div
            key={col.title}
            className={`${styles.col} stagger${Math.min(index + 2, 6)}`}
          >
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
      <div className={styles.bottom}>
        <p>{footerContent.legal}</p>
      </div>
    </footer>
  );
}
