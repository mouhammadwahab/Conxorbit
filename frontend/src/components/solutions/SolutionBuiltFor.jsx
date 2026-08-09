import Reveal from "../common/Reveal";
import SectionBadge from "../common/SectionBadge";
import { SolutionIcon } from "./solutionIcons";
import styles from "./SolutionBuiltFor.module.css";

export default function SolutionBuiltFor({ content }) {
  if (!content) return null;
  const { badge, title, body, audiences = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={badge}>
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <SectionBadge variant="gold" size="sm">
            {badge}
          </SectionBadge>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <div className={styles.panel}>
          {audiences.map((item) => (
            <article key={item.title} className={`${styles.row} cardReveal`}>
              <SolutionIcon name={item.icon} className={styles.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
