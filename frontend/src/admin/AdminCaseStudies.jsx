import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

const EMPTY = {
  slug: "",
  title: "",
  industry: "",
  summary: "",
  problem: "",
  built: "",
  result: "",
  quote: { text: "", author: "" },
  sortOrder: 0,
  published: true,
  seo: { title: "", description: "", ogImage: "" },
};

export default function AdminCaseStudies() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    setItems(await api.admin.caseStudies.list(token));
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
      quote: { ...EMPTY.quote, ...(item.quote || {}) },
      seo: { ...EMPTY.seo, ...(item.seo || {}) },
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
      const payload = { ...form };
      delete payload._id;
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
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={() => onDelete(item._id)}>
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
          <span>Title</span>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </label>
        <label className={styles.field}>
          <span>Slug</span>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </label>
        <label className={styles.field}>
          <span>Industry</span>
          <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
        </label>
        <label className={styles.field}>
          <span>Sort order</span>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
        </label>
        <label className={styles.field}>
          <span>Published</span>
          <div className={styles.checkRow}>
            <label>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Show on site
            </label>
          </div>
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Summary</span>
          <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Problem</span>
          <textarea value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>What we built</span>
          <textarea value={form.built} onChange={(e) => setForm({ ...form, built: e.target.value })} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Result</span>
          <textarea value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
        </label>
        <label className={styles.field}>
          <span>Quote</span>
          <input
            value={form.quote.text}
            onChange={(e) => setForm({ ...form, quote: { ...form.quote, text: e.target.value } })}
          />
        </label>
        <label className={styles.field}>
          <span>Quote author</span>
          <input
            value={form.quote.author}
            onChange={(e) => setForm({ ...form, quote: { ...form.quote, author: e.target.value } })}
          />
        </label>
        <label className={styles.field}>
          <span>SEO title (optional)</span>
          <input
            value={form.seo.title}
            onChange={(e) => setForm({ ...form, seo: { ...form.seo, title: e.target.value } })}
          />
        </label>
        <label className={styles.field}>
          <span>SEO description (optional)</span>
          <input
            value={form.seo.description}
            onChange={(e) => setForm({ ...form, seo: { ...form.seo, description: e.target.value } })}
          />
        </label>
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button className={styles.btn} type="submit">
            {editId ? "Update" : "Create"}
          </button>
          {editId ? (
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={reset}>
              Cancel
            </button>
          ) : null}
          <Link to="/portfolio" className={styles.muted}>
            Preview on portfolio
          </Link>
        </div>
      </form>
    </div>
  );
}
