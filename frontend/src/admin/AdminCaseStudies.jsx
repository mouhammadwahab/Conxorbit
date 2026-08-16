import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import AdminMediaField from "./AdminMediaField";
import styles from "./admin.module.css";

const EMPTY_POINT = { title: "", description: "" };

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  clientName: "",
  industry: "",
  trade: "",
  projectType: "",
  heroImage: { url: "", publicId: "" },
  problem: { description: "", points: [{ ...EMPTY_POINT }, { ...EMPTY_POINT }] },
  solution: { description: "", points: [{ ...EMPTY_POINT }, { ...EMPTY_POINT }] },
  relatedSolutionId: "",
  featured: false,
  published: true,
  sortOrder: 0,
  seo: { title: "", description: "", ogImage: "" },
};

export default function AdminCaseStudies() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
      heroImage: { url: "", publicId: "", ...(item.heroImage || {}) },
      problem: {
        description: item.problem?.description || "",
        points: item.problem?.points?.length
          ? item.problem.points
          : [{ ...EMPTY_POINT }, { ...EMPTY_POINT }],
      },
      solution: {
        description: item.solution?.description || "",
        points: item.solution?.points?.length
          ? item.solution.points
          : [{ ...EMPTY_POINT }, { ...EMPTY_POINT }],
      },
      relatedSolutionId: item.relatedSolutionId ? String(item.relatedSolutionId) : "",
      seo: { ...EMPTY.seo, ...(item.seo || {}) },
    });
  };

  const reset = () => {
    setEditId(null);
    setForm(EMPTY);
  };

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        relatedSolutionId: form.relatedSolutionId || null,
      };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      if (editId) await api.admin.caseStudies.update(token, editId, payload);
      else await api.admin.caseStudies.create(token, payload);
      reset();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this case study?")) return;
    await api.admin.caseStudies.remove(token, id);
    if (editId === id) reset();
    await load();
  };

  const setProblemPoint = (index, key, value) => {
    const points = [...(form.problem.points || [])];
    points[index] = { ...points[index], [key]: value };
    setForm({ ...form, problem: { ...form.problem, points } });
  };

  const setSolutionPoint = (index, key, value) => {
    const points = [...(form.solution.points || [])];
    points[index] = { ...points[index], [key]: value };
    setForm({ ...form, solution: { ...form.solution, points } });
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

      <h2 style={{ marginTop: 28 }}>{editId ? "Edit case study" : "New case study"}</h2>
      <form onSubmit={onSave} className={styles.grid2}>
        <label className={styles.field}>
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <label className={styles.field}>
          <span>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </label>
        <label className={styles.field}>
          <span>Category</span>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Project type</span>
          <input
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Short description</span>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Client name</span>
          <input
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Industry</span>
          <input
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Trade</span>
          <input
            value={form.trade}
            onChange={(e) => setForm({ ...form, trade: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Related solution</span>
          <select
            value={form.relatedSolutionId || ""}
            onChange={(e) => setForm({ ...form, relatedSolutionId: e.target.value })}
          >
            <option value="">— none —</option>
            {solutions.map((sol) => (
              <option key={sol._id} value={sol._id}>
                {sol.name}
              </option>
            ))}
          </select>
        </label>

        <div style={{ gridColumn: "1 / -1" }}>
          <AdminMediaField
            label="Hero mockup image"
            value={form.heroImage?.url || ""}
            folder="Conx-orbit/case-studies"
            onUploaded={({ url, publicId }) =>
              setForm({ ...form, heroImage: { url, publicId } })
            }
            onClear={() => setForm({ ...form, heroImage: { url: "", publicId: "" } })}
          />
        </div>

        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Problem description</span>
          <textarea
            value={form.problem?.description || ""}
            onChange={(e) =>
              setForm({ ...form, problem: { ...form.problem, description: e.target.value } })
            }
          />
        </label>
        {(form.problem?.points || []).map((point, index) => (
          <div key={`pp-${index}`} className={styles.grid2} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.field}>
              <span>Problem point title</span>
              <input
                value={point.title || ""}
                onChange={(e) => setProblemPoint(index, "title", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Problem point description</span>
              <input
                value={point.description || ""}
                onChange={(e) => setProblemPoint(index, "description", e.target.value)}
              />
            </label>
          </div>
        ))}

        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Solution description</span>
          <textarea
            value={form.solution?.description || ""}
            onChange={(e) =>
              setForm({ ...form, solution: { ...form.solution, description: e.target.value } })
            }
          />
        </label>
        {(form.solution?.points || []).map((point, index) => (
          <div key={`sp-${index}`} className={styles.grid2} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.field}>
              <span>Solution point title</span>
              <input
                value={point.title || ""}
                onChange={(e) => setSolutionPoint(index, "title", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Solution point description</span>
              <input
                value={point.description || ""}
                onChange={(e) => setSolutionPoint(index, "description", e.target.value)}
              />
            </label>
          </div>
        ))}

        <label className={styles.field}>
          <span>Sort order</span>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
        </label>
        <div className={styles.checkRow}>
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
        </div>

        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button className={styles.btn} type="submit" disabled={saving}>
            {saving ? "Saving…" : editId ? "Update" : "Create"}
          </button>
          {editId ? (
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset}>
              Cancel
            </button>
          ) : null}
          <Link className={styles.muted} to="/admin/solutions">
            Manage solutions
          </Link>
        </div>
      </form>
    </div>
  );
}
