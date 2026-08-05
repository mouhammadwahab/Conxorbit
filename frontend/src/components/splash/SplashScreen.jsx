import { useEffect, useState } from "react";
import brandLogo from "../../assets/images/Logo.png";
import styles from "./SplashScreen.module.css";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.splash} aria-busy="true">
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.logoWrapper}>
                <img src={brandLogo} alt="ConX Orbit logo" className={styles.logo} />
              </div>
              <h1 className={styles.title}>ConX Orbit</h1>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={styles.appRoot}
        aria-hidden={loading ? "true" : "false"}
        style={{
          opacity: loading ? 0 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
