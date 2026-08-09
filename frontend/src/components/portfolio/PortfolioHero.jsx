import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import styles from "./PortfolioHero.module.css";

export default function PortfolioHero({ content }) {
  const { badge, titleBefore, titleHighlight, titleAfter, body, line } = content;

  return (
    <Reveal as="section" className={`${styles.hero} heroStagger`} eager aria-label={badge}>
      <SectionBadge variant="gold">{badge}</SectionBadge>
      <h1 className={styles.title}>
        {titleBefore}
        <span className={styles.highlight}>{titleHighlight}</span>
        {titleAfter}
      </h1>
      {body ? <p className={styles.body}>{body}</p> : null}
      {line ? <p className={styles.line}>{line}</p> : null}
    </Reveal>
  );
}
