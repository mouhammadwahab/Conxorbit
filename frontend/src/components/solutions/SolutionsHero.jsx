import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./SolutionsHero.module.css";

export default function SolutionsHero({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body } = content;

  return (
    <Reveal as="section" className={`${styles.hero} heroStagger`} eager aria-label={badge}>
      <SectionBadge variant="gold">{badge}</SectionBadge>
      <h1 className={styles.title}>
        {titleBefore}
        <span className={styles.highlight}>{titleHighlight}</span>
        {titleAfter}
      </h1>
      {body ? <p className={styles.body}>{body}</p> : null}
    </Reveal>
  );
}
