import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import AdminMediaField from "./AdminMediaField";
import styles from "./admin.module.css";

const CATEGORIES = ["client-system", "internal-product", "workflow-solution", "other"];

const EMPTY = {
  slug: "",
  name: "",
  shortDescription: "",
  category: "other",
  tags: [],
  trades: [],
  listingBadge: "",
  hero: { title: "", description: "" },
  description: "",
  features: [],
  capabilities: [],
  audiences: [],
  technologies: [],
  mockup: { url: "", publicId: "" },
  demo: { videoUrl: "", publicId: "" },
  faq: [],
  relatedSolutionIds: [],
  relatedCaseStudyIds: [],
  cta: {
    badge: "",
    title: "",
    body: "",
    primary: { label: "Book a Discovery Call", href: "/book-discovery" },
    secondary: { label: "Explore Solutions", href: "/solutions" },
  },
  published: true,
  featured: false,
  showOnListing: true,
  sortOrder: 0,
  seo: { title: "", description: "", ogImage: "" },
};

function listToText(list) {
  return (list || []).join(", ");
}

function textToList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminSolutionForm() {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [tagsText, setTagsText] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [capabilitiesText, setCapabilitiesText] = useState("");
  const [audiencesText, setAudiencesText] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");
  const [allSolutions, setAllSolutions] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const items = await api.admin.solutions.list(token);
        setAllSolutions(items);
        if (isNew) {
          setForm(EMPTY);
          setTagsText("");
          setFeaturesText("");
          setCapabilitiesText("");
          setAudiencesText("");
          setTechnologiesText("");
          return;
        }
        const item = items.find((row) => String(row._id) === String(id));
        if (!item) {
          setError("Solution not found");
          return;
        }
        const merged = {
          ...EMPTY,
          ...item,
          hero: { ...EMPTY.hero, ...(item.hero || {}) },
          mockup: { url: "", publicId: "", ...(item.mockup || {}) },
          demo: { videoUrl: "", publicId: "", ...(item.demo || {}) },
          cta: {
            ...EMPTY.cta,
            ...(item.cta || {}),
            primary: { ...EMPTY.cta.primary, ...(item.cta?.primary || {}) },
            secondary: { ...EMPTY.cta.secondary, ...(item.cta?.secondary || {}) },
          },
          seo: { ...EMPTY.seo, ...(item.seo || {}) },
          faq: item.faq || [],
        };
        setForm(merged);
        setTagsText(listToText(merged.tags));
        setFeaturesText(listToText(merged.features));
        setCapabilitiesText(listToText(merged.capabilities));
        setAudiencesText(listToText(merged.audiences));
        setTechnologiesText(listToText(merged.technologies));
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [id, isNew, token]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        tags: textToList(tagsText),
        features: textToList(featuresText),
        capabilities: textToList(capabilitiesText),
        audiences: textToList(audiencesText),
        technologies: textToList(technologiesText),
      };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      if (isNew) {
        const created = await api.admin.solutions.create(token, payload);
        navigate(`/admin/solutions/${created._id}`);
      } else {
        await api.admin.solutions.update(token, id, payload);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSave}>
      <div className={styles.row}>
        <h1>{isNew ? "New solution" : `Edit: ${form.name || form.slug}`}</h1>
        <div className={styles.row}>
          <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/admin/solutions">
            Back
          </Link>
          <button className={styles.btn} type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.grid2}>
        <label className={styles.field}>
          <span>Name</span>
          <input value={form.name} onChange={(e) => setField("name", e.target.value)} required />
        </label>
        <label className={styles.field}>
          <span>Slug</span>
          <input value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Short description</span>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setField("shortDescription", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>Category</span>
          <select value={form.category} onChange={(e) => setField("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Listing badge</span>
          <input
            value={form.listingBadge}
            onChange={(e) => setField("listingBadge", e.target.value)}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Tags (comma-separated — used as website filters)</span>
          <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Trades</span>
          <div className={styles.checkRow}>
            {["facade", "construction"].map((trade) => (
              <label key={trade}>
                <input
                  type="checkbox"
                  checked={(form.trades || []).includes(trade)}
                  onChange={(e) => {
                    const next = new Set(form.trades || []);
                    if (e.target.checked) next.add(trade);
                    else next.delete(trade);
                    setField("trades", [...next]);
                  }}
                />
                {trade}
              </label>
            ))}
          </div>
        </label>
        <label className={styles.field}>
          <span>Sort order</span>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setField("sortOrder", Number(e.target.value))}
          />
        </label>
        <div className={styles.checkRow} style={{ gridColumn: "1 / -1" }}>
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setField("published", e.target.checked)}
            />
            Published
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.showOnListing}
              onChange={(e) => setField("showOnListing", e.target.checked)}
            />
            Show on listing
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setField("featured", e.target.checked)}
            />
            Featured
          </label>
        </div>

        <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Hero</h3>
        <label className={styles.field}>
          <span>Hero title</span>
          <input
            value={form.hero?.title || ""}
            onChange={(e) => setField("hero", { ...form.hero, title: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Hero description</span>
          <textarea
            value={form.hero?.description || ""}
            onChange={(e) => setField("hero", { ...form.hero, description: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Full description</span>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </label>

        <div style={{ gridColumn: "1 / -1" }}>
          <AdminMediaField
            label="Mockup image (hero)"
            value={form.mockup?.url || ""}
            folder="Conx-orbit/solutions"
            onUploaded={({ url, publicId }) => setField("mockup", { url, publicId })}
            onClear={() => setField("mockup", { url: "", publicId: "" })}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <AdminMediaField
            label="Demo video"
            kind="video"
            value={form.demo?.videoUrl || ""}
            folder="Conx-orbit/solutions"
            onUploaded={({ url, publicId }) =>
              setField("demo", { videoUrl: url, publicId })
            }
            onClear={() => setField("demo", { videoUrl: "", publicId: "" })}
          />
        </div>

        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Features (comma-separated)</span>
          <input value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Capabilities (comma-separated)</span>
          <input value={capabilitiesText} onChange={(e) => setCapabilitiesText(e.target.value)} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Audiences (comma-separated)</span>
          <input value={audiencesText} onChange={(e) => setAudiencesText(e.target.value)} />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Technologies (comma-separated)</span>
          <input value={technologiesText} onChange={(e) => setTechnologiesText(e.target.value)} />
        </label>

        <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>CTA</h3>
        <label className={styles.field}>
          <span>CTA title</span>
          <input
            value={form.cta?.title || ""}
            onChange={(e) => setField("cta", { ...form.cta, title: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>CTA body</span>
          <textarea
            value={form.cta?.body || ""}
            onChange={(e) => setField("cta", { ...form.cta, body: e.target.value })}
          />
        </label>
        <label className={styles.field}>
          <span>Primary CTA label</span>
          <input
            value={form.cta?.primary?.label || ""}
            onChange={(e) =>
              setField("cta", {
                ...form.cta,
                primary: { ...form.cta.primary, label: e.target.value },
              })
            }
          />
        </label>
        <label className={styles.field}>
          <span>Primary CTA href</span>
          <input
            value={form.cta?.primary?.href || ""}
            onChange={(e) =>
              setField("cta", {
                ...form.cta,
                primary: { ...form.cta.primary, href: e.target.value },
              })
            }
          />
        </label>

        <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Related</h3>
        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>Related solutions</span>
          <div className={styles.checkRow}>
            {allSolutions
              .filter((s) => String(s._id) !== String(id))
              .map((s) => (
                <label key={s._id}>
                  <input
                    type="checkbox"
                    checked={(form.relatedSolutionIds || []).map(String).includes(String(s._id))}
                    onChange={(e) => {
                      const next = new Set((form.relatedSolutionIds || []).map(String));
                      if (e.target.checked) next.add(String(s._id));
                      else next.delete(String(s._id));
                      setField("relatedSolutionIds", [...next]);
                    }}
                  />
                  {s.name}
                </label>
              ))}
          </div>
        </div>

        <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>FAQ</h3>
        {(form.faq || []).map((item, index) => (
          <div key={index} className={styles.grid2} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.field}>
              <span>Question</span>
              <input
                value={item.question || ""}
                onChange={(e) => {
                  const next = [...(form.faq || [])];
                  next[index] = { ...next[index], question: e.target.value };
                  setField("faq", next);
                }}
              />
            </label>
            <label className={styles.field}>
              <span>Answer</span>
              <input
                value={item.answer || ""}
                onChange={(e) => {
                  const next = [...(form.faq || [])];
                  next[index] = { ...next[index], answer: e.target.value };
                  setField("faq", next);
                }}
              />
            </label>
          </div>
        ))}
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => setField("faq", [...(form.faq || []), { question: "", answer: "" }])}
          >
            Add FAQ
          </button>
        </div>

        <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>SEO</h3>
        <label className={styles.field}>
          <span>SEO title</span>
          <input
            value={form.seo?.title || ""}
            onChange={(e) => setField("seo", { ...form.seo, title: e.target.value })}
          />
        </label>
        <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <span>SEO description</span>
          <input
            value={form.seo?.description || ""}
            onChange={(e) => setField("seo", { ...form.seo, description: e.target.value })}
          />
        </label>
      </div>
    </form>
  );
}
