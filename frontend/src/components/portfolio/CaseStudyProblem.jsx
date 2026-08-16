import Reveal from "../common/Reveal";
import styles from "./CaseStudyProblem.module.css";

/** Split `problem` into headline + body when stored as "title\\n\\nbody". */
function splitProblem(problem = "") {
  const parts = String(problem).split(/\n\n+/);
  if (parts.length >= 2) {
    return { title: parts[0].trim(), body: parts.slice(1).join("\n\n").trim() };
  }
  return { title: problem.trim(), body: "" };
}

/** Normalize legacy string points and object points into { title, description }. */
function normalizePoints(problemPoints = []) {
  return (problemPoints || [])
    .map((point) => {
      if (point == null) return null;
      if (typeof point === "string") {
        const title = point.trim();
        return title ? { title, description: "" } : null;
      }
      const title = String(point.title || "").trim();
      const description = String(point.description || "").trim();
      if (!title && !description) return null;
      return { title: title || description, description: title ? description : "" };
    })
    .filter(Boolean);
}

export default function CaseStudyProblem({ problem, problemPoints = [] }) {
  const { title, body } = splitProblem(problem);
  const points = normalizePoints(problemPoints);

  if (!title && !body && !points.length) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label="The Problem">
      <div className={styles.inner}>
        <div className={`${styles.copy} revealHead`}>
          <p className={styles.badge}>The Problem</p>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        {points.length ? (
          <ol className={styles.list}>
            {points.map((point, index) => (
              <li key={`${point.title}-${index}`}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.pointCopy}>
                  <span className={styles.point}>{point.title}</span>
                  {point.description ? (
                    <p className={styles.pointDesc}>{point.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </Reveal>
  );
}
