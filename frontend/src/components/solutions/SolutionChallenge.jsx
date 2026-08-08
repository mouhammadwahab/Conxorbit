import Reveal from "../common/Reveal";
import styles from "./SolutionChallenge.module.css";

export default function SolutionChallenge({ content }) {
  if (!content) return null;
  const { badge, title, body, problems = [] } = content;

  return (
    <Reveal as="section" className={styles.section} eager aria-label={badge}>
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <span className={styles.badge}>
            <span aria-hidden="true">•</span> {badge}
          </span>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <ol className={styles.list}>
          {problems.map((problem, index) => (
            <li key={problem.title} className={`${styles.item} cardReveal`}>
              <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
