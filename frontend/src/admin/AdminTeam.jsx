import { useEffect, useState } from "react";
import { api, mediaUrl } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

const EMPTY = {
  name: "",
  designation: "",
  role: "",
  socialLinks: [{ platform: "linkedin", url: "" }],
  image: "",
  quote: "",
  quoteAuthor: "",
  sortOrder: 0,
  published: true,
};

const SOCIAL_PLATFORMS = ["linkedin", "twitter", "github", "instagram", "website", "email"];

export default function AdminTeam() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => setItems(await api.admin.team.list(token));

  useEffect(() => {
    load().catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      ...EMPTY,
      ...item,
      socialLinks: item.socialLinks?.length ? item.socialLinks : EMPTY.socialLinks,
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
      if (editId) await api.admin.team.update(token, editId, payload);
      else await api.admin.team.create(token, payload);
      reset();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    await api.admin.team.remove(token, id);
    if (editId === id) reset();
    await load();
  };

  return (
    <div>
      <h1>Team</h1>
      {error ? <p className={styles.error}>{error}</p> : null}
      <table className={styles.table}>
        <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Published</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
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

      <h2 style={{ marginTop: 32 }}>{editId ? "Edit member" : "Add member"}</h2>
      <form onSubmit={onSave} className={styles.grid2}>
        <label className={styles.field}>
          <span>Name</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className={styles.field}>
          <span>Designation</span>
          <input
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Role</span>
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </label>
        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Social links</span>
          {(form.socialLinks || []).map((link, index) => (
            <div key={index} className={styles.row} style={{ marginTop: 8 }}>
              <select
                value={link.platform || ""}
                onChange={(e) => {
                  const next = [...(form.socialLinks || [])];
                  next[index] = { ...next[index], platform: e.target.value };
                  setForm({ ...form, socialLinks: next });
                }}
                style={{ maxWidth: 140 }}
              >
                <option value="">platform</option>
                {[
                  ...SOCIAL_PLATFORMS,
                  ...(link.platform && !SOCIAL_PLATFORMS.includes(link.platform)
                    ? [link.platform]
                    : []),
                ].map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <input
                placeholder="https://..."
                value={link.url || ""}
                onChange={(e) => {
                  const next = [...(form.socialLinks || [])];
                  next[index] = { ...next[index], url: e.target.value };
                  setForm({ ...form, socialLinks: next });
                }}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() =>
                  setForm({
                    ...form,
                    socialLinks: (form.socialLinks || []).filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            style={{ marginTop: 8 }}
            onClick={() =>
              setForm({
                ...form,
                socialLinks: [...(form.socialLinks || []), { platform: "linkedin", url: "" }],
              })
            }
          >
            Add social link
          </button>
        </div>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Quote</span>
          <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
        </label>
        <label className={styles.field}>
          <span>Quote author</span>
          <input
            value={form.quoteAuthor}
            onChange={(e) => setForm({ ...form, quoteAuthor: e.target.value })}
          />
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
              Show on About page
            </label>
          </div>
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Photo image URL</span>
          <input
            type="url"
            placeholder="https://res.cloudinary.com/..."
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          {form.image ? (
            <img src={mediaUrl(form.image)} alt="" style={{ maxWidth: 120, marginTop: 8 }} />
          ) : null}
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
        </div>
      </form>
    </div>
  );
}
