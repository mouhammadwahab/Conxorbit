import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

const EMPTY = {
  slug: "",
  title: "",
  category: "Client System",
  shortDescription: "",
  clientName: "",
  industry: "",
  trade: "",
  projectType: "",
  heroImageUrl: "",
  heroImagePublicId: "",
  problem: "",
  problemPoints: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  solution: "",
  solutionPoints: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  mockupImageUrl: "",
  mockupImagePublicId: "",
  supportingImageUrl: "",
  supportingImagePublicId: "",
  relatedSolutionId: "",
  featured: false,
  published: true,
  displayOrder: 0,
};

function normalizeProblemPoints(value) {
  const rows = Array.isArray(value) && value.length ? value : [{ title: "", description: "" }];
  return rows.map((point) => {
    if (typeof point === "string") return { title: point, description: "" };
    return { title: point?.title || "", description: point?.description || "" };
  });
}

function normalizeSolutionPoints(value) {
  const rows = Array.isArray(value) && value.length ? value : [{ title: "", description: "" }];
  return rows.map((point) => {
    if (typeof point === "string") {
      if (point.includes("|")) {
        const [title, ...rest] = point.split("|");
        return { title: title.trim(), description: rest.join("|").trim() };
      }
      return { title: point, description: "" };
    }
    return {
      title: point?.title || "",
      description: point?.description || point?.body || "",
    };
  });
}

const CASE_CATEGORIES = ["Client System", "Internal Product", "Workflow Solution"];
const CASE_TRADES = ["facade", "construction"];

function SelectWithFallback({ value, onChange, options, emptyLabel = "— Select —" }) {
  const opts = [...options];
  if (value && !opts.includes(value)) opts.unshift(value);
  return (
    <select value={value || ""} onChange={onChange}>
      <option value="">{emptyLabel}</option>
      {opts.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function AdminCaseStudies() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    const [cases, sols] = await Promise.all([
      api.admin.caseStudies.list(token),
      api.admin.solutions.list(token),
    ]);
    setItems(cases);
    setSolutions(sols);
  };

  useEffect(() => {
    load().catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      ...EMPTY,
      ...item,
      problemPoints: normalizeProblemPoints(item.problemPoints),
      solutionPoints: normalizeSolutionPoints(item.solutionPoints),
    });
  };

  const reset = () => {
    setEditId(null);
    setForm(EMPTY);
  };

  const onSave = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        problemPoints: (form.problemPoints || [])
          .map((p) => ({
            title: String(p.title || "").trim(),
            description: String(p.description || "").trim(),
          }))
          .filter((p) => p.title || p.description),
        solutionPoints: (form.solutionPoints || [])
          .map((p) => ({
            title: String(p.title || "").trim(),
            description: String(p.description || "").trim(),
          }))
          .filter((p) => p.title || p.description),
      };
      delete payload._id;
      delete payload.id;
      delete payload.createdAt;
      delete payload.updatedAt;
      if (editId) await api.admin.caseStudies.update(token, editId, payload);
      else await api.admin.caseStudies.create(token, payload);
      reset();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this case study?")) return;
    await api.admin.caseStudies.remove(token, id);
    if (editId === id) reset();
    await load();
  };

  const setSolutionPoint = (index, key, value) => {
    const next = [...(form.solutionPoints || [])];
    next[index] = { ...next[index], [key]: value };
    setForm({ ...form, solutionPoints: next });
  };

  const setProblemPoint = (index, key, value) => {
    const next = [...(form.problemPoints || [])];
    next[index] = { ...next[index], [key]: value };
    setForm({ ...form, problemPoints: next });
  };

  return (
    <div>
      <h1>Case studies</h1>
      {error ? <p className={styles.error}>{error}</p> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Published</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.published ? "Yes" : "No"}</td>
              <td className={styles.row}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 32 }}>{editId ? "Edit case study" : "Add case study"}</h2>
      <form onSubmit={onSave} className={styles.grid2}>
        <label className={styles.field}>
          <span>title</span>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <label className={styles.field}>
          <span>slug</span>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </label>
        <label className={styles.field}>
          <span>category</span>
          <SelectWithFallback
            value={form.category}
            options={CASE_CATEGORIES}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>projectType (hero heading)</span>
          <input
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>shortDescription</span>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>clientName</span>
          <input
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>industry</span>
          <input
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>trade</span>
          <SelectWithFallback
            value={form.trade}
            options={CASE_TRADES}
            onChange={(e) => setForm({ ...form, trade: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>relatedSolutionId</span>
          <select
            value={form.relatedSolutionId || ""}
            onChange={(e) => setForm({ ...form, relatedSolutionId: e.target.value })}
          >
            <option value="">— none —</option>
            {solutions.map((sol) => (
              <option key={sol._id} value={sol._id}>
                {sol.name} ({sol.slug})
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>heroImageUrl</span>
          <input
            type="url"
            value={form.heroImageUrl}
            onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })}
            placeholder="https://res.cloudinary.com/..."
          />
        </label>
        <label className={styles.field}>
          <span>heroImagePublicId</span>
          <input
            value={form.heroImagePublicId}
            onChange={(e) => setForm({ ...form, heroImagePublicId: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>mockupImageUrl</span>
          <input
            type="url"
            value={form.mockupImageUrl}
            onChange={(e) => setForm({ ...form, mockupImageUrl: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>mockupImagePublicId</span>
          <input
            value={form.mockupImagePublicId}
            onChange={(e) => setForm({ ...form, mockupImagePublicId: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>supportingImageUrl</span>
          <input
            type="url"
            value={form.supportingImageUrl}
            onChange={(e) => setForm({ ...form, supportingImageUrl: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>supportingImagePublicId</span>
          <input
            value={form.supportingImagePublicId}
            onChange={(e) => setForm({ ...form, supportingImagePublicId: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>problem (title then blank line then body)</span>
          <textarea
            style={{ minHeight: 120 }}
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
          />
        </label>
        {(form.problemPoints || []).map((point, index) => (
          <div key={`pp-${index}`} className={styles.grid2} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.field}>
              <span>problemPoints[{index}].title</span>
              <input
                value={point.title || ""}
                onChange={(e) => setProblemPoint(index, "title", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>problemPoints[{index}].description</span>
              <input
                value={point.description || ""}
                onChange={(e) => setProblemPoint(index, "description", e.target.value)}
              />
            </label>
          </div>
        ))}
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() =>
              setForm({
                ...form,
                problemPoints: [...(form.problemPoints || []), { title: "", description: "" }],
              })
            }
          >
            Add problemPoints
          </button>
        </div>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>solution (title then blank line then body)</span>
          <textarea
            style={{ minHeight: 120 }}
            value={form.solution}
            onChange={(e) => setForm({ ...form, solution: e.target.value })}
          />
        </label>
        {(form.solutionPoints || []).map((point, index) => (
          <div key={`sp-${index}`} className={styles.grid2} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.field}>
              <span>solutionPoints[{index}].title</span>
              <input
                value={point.title || ""}
                onChange={(e) => setSolutionPoint(index, "title", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>solutionPoints[{index}].description</span>
              <input
                value={point.description || ""}
                onChange={(e) => setSolutionPoint(index, "description", e.target.value)}
              />
            </label>
          </div>
        ))}
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() =>
              setForm({
                ...form,
                solutionPoints: [...(form.solutionPoints || []), { title: "", description: "" }],
              })
            }
          >
            Add solutionPoints
          </button>
        </div>
        <label className={styles.field}>
          <span>displayOrder</span>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
          />
        </label>
        <div className={styles.checkRow}>
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            featured
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            published
          </label>
        </div>
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button className={styles.btn} type="submit">
            {editId ? "Update" : "Create"}
          </button>
          {editId ? (
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset}>
              Cancel
            </button>
          ) : null}
          {form.slug ? (
            <Link to={`/case-studies/${form.slug}`} className={styles.muted}>
              Preview page
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
}
