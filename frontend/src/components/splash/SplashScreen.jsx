import { useEffect, useState } from "react";
import brandLogo from "../../assets/images/Logo.png";
import styles from "./SplashScreen.module.css";

const SPLASH_MS = 2800;
const EXIT_MS = 360;

export default function SplashScreen({ children }) {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exiting"), SPLASH_MS - EXIT_MS);
    const doneTimer = setTimeout(() => setPhase("done"), SPLASH_MS);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const visible = phase !== "done";

  return (
    <>
      {visible ? (
        <div
          className={`${styles.splash}${phase === "exiting" ? ` ${styles.exiting}` : ""}`}
          aria-busy={phase === "loading"}
          aria-label="Loading ConX Orbit"
        >
          <div className={styles.backdrop} aria-hidden="true" />
          <div className={styles.spotlight} aria-hidden="true" />

          <div className={styles.content}>
            <div className={styles.brandLockup}>
              <div className={styles.logoStage}>
                <div className={styles.orbitRing} aria-hidden="true">
                  <span className={styles.orbitArc} />
                </div>
                <div className={styles.logoPlate}>
                  <img src={brandLogo} alt="" className={styles.logo} />
                </div>
              </div>

              <div className={styles.wordmark}>
                <h1 className={styles.title}>ConX Orbit</h1>
                <p className={styles.tagline}>Clarity · Consistency · Craft</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`${styles.appRoot}${phase === "done" ? ` ${styles.appReady}` : ""}`}
        aria-hidden={visible ? "true" : "false"}
      >
        {children}
      </div>
    </>
  );
}
