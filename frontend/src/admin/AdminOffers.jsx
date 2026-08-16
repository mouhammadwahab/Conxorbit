import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import AdminMediaField from "./AdminMediaField";
import styles from "./admin.module.css";

const EMPTY = {
  title: "",
  badge: "",
  description: "",
  image: { url: "", publicId: "" },
  cta: { label: "", href: "" },
  active: true,
  startDate: "",
  endDate: "",
  sortOrder: 0,
};

function toDateInput(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function fromItem(item) {
  return {
    ...EMPTY,
    ...item,
    image: {
      url: item.image?.url || "",
      publicId: item.image?.publicId || "",
    },
    cta: {
      label: item.cta?.label || "",
      href: item.cta?.href || "",
    },
    startDate: toDateInput(item.startDate),
    endDate: toDateInput(item.endDate),
    sortOrder: Number(item.sortOrder) || 0,
    active: item.active !== false,
  };
}

export default function AdminOffers() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await api.admin.offers.list(token));

  useEffect(() => {
    load().catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const startEdit = (item) => {
    setEditId(item._id);
    setForm(fromItem(item));
  };

  const reset = () => {
    setEditId(null);
    setForm(EMPTY);
  };

  const onSave = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        badge: form.badge,
        description: form.description,
        image: form.image,
        cta: form.cta,
        active: form.active,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        sortOrder: Number(form.sortOrder) || 0,
      };
      if (editId) await api.admin.offers.update(token, editId, payload);
      else await api.admin.offers.create(token, payload);
      reset();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    await api.admin.offers.remove(token, id);
    if (editId === id) reset();
    await load();
  };

  return (
    <div>
      <h1>Offers</h1>
      <p className={styles.muted}>
        Manage promotional offers. Website display can be wired later — data is saved in the CMS now.
      </p>
      {error ? <p className={styles.error}>{error}</p> : null}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Badge</th>
            <th>Active</th>
            <th>Dates</th>
            <th>Order</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.badge || "—"}</td>
              <td>{item.active ? "Yes" : "No"}</td>
              <td className={styles.muted}>
                {[toDateInput(item.startDate) || "…", toDateInput(item.endDate) || "…"].join(" → ")}
              </td>
              <td>{item.sortOrder ?? 0}</td>
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
          {!items.length ? (
            <tr>
              <td colSpan={6} className={styles.muted}>
                No offers yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <h2 style={{ marginTop: 28 }}>{editId ? "Edit offer" : "New offer"}</h2>
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
          <span>Badge</span>
          <input
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="e.g. Limited time"
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <div style={{ gridColumn: "1 / -1" }}>
          <AdminMediaField
            label="Offer image"
            value={form.image?.url || ""}
            folder="Conx-orbit/offers"
            onUploaded={({ url, publicId }) =>
              setForm({ ...form, image: { url, publicId } })
            }
            onClear={() => setForm({ ...form, image: { url: "", publicId: "" } })}
          />
        </div>
        <label className={styles.field}>
          <span>CTA label</span>
          <input
            value={form.cta?.label || ""}
            onChange={(e) => setForm({ ...form, cta: { ...form.cta, label: e.target.value } })}
            placeholder="Book a Discovery Call"
          />
        </label>
        <label className={styles.field}>
          <span>CTA href</span>
          <input
            value={form.cta?.href || ""}
            onChange={(e) => setForm({ ...form, cta: { ...form.cta, href: e.target.value } })}
            placeholder="/book-discovery"
          />
        </label>
        <label className={styles.field}>
          <span>Start date</span>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>End date</span>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
          <span>Active</span>
          <div className={styles.checkRow}>
            <label>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Show when in date window
            </label>
          </div>
        </label>
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button className={styles.btn} type="submit" disabled={saving}>
            {saving ? "Saving…" : editId ? "Update" : "Create"}
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
