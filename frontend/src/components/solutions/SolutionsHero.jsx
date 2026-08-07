import styles from "./SolutionsHero.module.css";

export default function SolutionsHero({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body } = content;

  return (
    <section className={`${styles.hero} heroStagger`} aria-label={badge}>
      <p className={styles.badge}>
        <span aria-hidden="true">—</span> {badge}
      </p>
      <h1 className={styles.title}>
        {titleBefore}
        <span className={styles.highlight}>{titleHighlight}</span>
        {titleAfter}
      </h1>
      {body ? <p className={styles.body}>{body}</p> : null}
    </section>
  );
}
