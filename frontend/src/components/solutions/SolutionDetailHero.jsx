import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import styles from "./SolutionDetailHero.module.css";

export default function SolutionDetailHero({ solution }) {
  const { name, image, detail } = solution;
  const { title, body, primaryCta, secondaryCta } = detail;

  return (
    <Reveal as="section" className={styles.hero} aria-label={name}>
      <div className={`${styles.copy} heroStagger`}>
        <p className={styles.eyebrow}>{name}</p>
        <h1 className={styles.title}>{title}</h1>
        {body ? <p className={styles.body}>{body}</p> : null}
        <div className={styles.actions}>
          {primaryCta ? (
            <Link className={`${styles.primary} btnMotion`} to={primaryCta.href}>
              <span>{primaryCta.label}</span>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link className={`${styles.secondary} btnMotion`} to={secondaryCta.href}>
              <span>{secondaryCta.label}</span>
            </Link>
          ) : null}
        </div>
      </div>
      <div className={styles.media}>
        <div className={`${styles.frame} interactiveCard mediaZoom`}>
          <img src={image} alt="" loading="eager" />
        </div>
      </div>
    </Reveal>
  );
}
