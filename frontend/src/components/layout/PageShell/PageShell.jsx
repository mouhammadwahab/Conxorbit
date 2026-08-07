import facadeImg from "../../../assets/tradeCards/facade.jfif";
import siteImg from "../../../assets/tradeCards/site-monitoring.jpg";
import waveBg from "../../../assets/images/wave-bg5.png";
import waveSoft from "../../../assets/images/wavenew.png";
import { serviceShellImage } from "../../../assets/services";
import styles from "./PageShell.module.css";

const DEPTH = {
  facade: facadeImg,
  construction: siteImg,
  partners: waveBg,
  services: serviceShellImage,
  products: waveSoft,
  cases: facadeImg,
  about: waveBg,
  contact: waveSoft,
};

export default function PageShell({ atmosphere = "services", children }) {
  const depthSrc = DEPTH[atmosphere];

  return (
    <div className={`${styles.shell} ${styles[atmosphere] || styles.services}`}>
      <div className={styles.layers} aria-hidden="true">
        {depthSrc ? (
          <img className={styles.depthImage} src={depthSrc} alt="" />
        ) : null}
        <span className={`${styles.orb} ${styles.orbOne}`} />
        <span className={`${styles.orb} ${styles.orbTwo}`} />
        <span className={`${styles.orb} ${styles.orbThree}`} />
        <span className={styles.mesh} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
