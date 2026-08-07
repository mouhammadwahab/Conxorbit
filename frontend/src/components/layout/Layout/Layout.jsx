import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout() {
  const location = useLocation();

  return (
    <div className={styles.shell}>
      <Navbar />
      <main key={location.pathname} className={`${styles.main} pageEnter`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
