import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found — ConX Orbit" description="This page does not exist." />
      <section className={styles.section}>
        <p className={styles.code}>404</p>
        <h1>Page not found</h1>
        <p>That route isn’t part of the ConX Orbit site.</p>
        <Link to="/">Back home</Link>
      </section>
    </>
  );
}
