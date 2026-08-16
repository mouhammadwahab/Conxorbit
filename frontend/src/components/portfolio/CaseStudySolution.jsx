import Reveal from "../common/Reveal";
import styles from "./CaseStudySolution.module.css";

function splitSolution(solution = "") {
  const parts = String(solution).split(/\n\n+/);
  if (parts.length >= 2) {
    return { title: parts[0].trim(), body: parts.slice(1).join("\n\n").trim() };
  }
  return { title: solution.trim(), body: "" };
}

/** Normalize object points and legacy "Title|Body" / plain strings. */
function normalizePoints(solutionPoints = []) {
  return (solutionPoints || [])
    .map((point) => {
      if (point == null) return null;
      if (typeof point === "string") {
        const raw = point.trim();
        if (!raw) return null;
        if (raw.includes("|")) {
          const [title, ...rest] = raw.split("|");
          return { title: title.trim(), description: rest.join("|").trim() };
        }
        if (raw.includes(" — ")) {
          const [title, ...rest] = raw.split(" — ");
          return { title: title.trim(), description: rest.join(" — ").trim() };
        }
        return { title: raw, description: "" };
      }
      const title = String(point.title || "").trim();
      const description = String(point.description || point.body || "").trim();
      if (!title && !description) return null;
      return { title: title || description, description: title ? description : "" };
    })
    .filter(Boolean);
}

export default function CaseStudySolution({ solution, solutionPoints = [] }) {
  const { title, body } = splitSolution(solution);
  const cards = normalizePoints(solutionPoints);

  if (!title && !body && !cards.length) return null;

  return (
    <Reveal as="section" className={styles.section} aria-label="Our Solution">
      <div className={`${styles.header} revealHead`}>
        <p className={styles.badge}>Our Solution</p>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        {body ? <p className={styles.body}>{body}</p> : null}
      </div>

      {cards.length ? (
        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.title} className={`${styles.card} cardReveal`}>
              <h3>{card.title}</h3>
              {card.description ? <p>{card.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}
