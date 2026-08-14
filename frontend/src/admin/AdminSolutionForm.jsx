import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, mediaUrl } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

const FIXED_BADGES = {
  challenge: "THE CHALLENGE",
  capabilities: "CAPABILITIES",
  howItWorks: "HOW IT WORKS",
  builtFor: "BUILT FOR",
  more: "EXPLORE MORE",
  faq: "FAQ",
  cta: "EXPLORE WHAT'S POSSIBLE",
};

const EMPTY = {
  slug: "",
  name: "",
  description: "",
  listingBadge: "",
  categories: [],
  image: "",
  portfolioImage: "",
  portfolioCategory: "workflow_solution",
  trades: [],
  sortOrder: 0,
  published: true,
  showOnListing: true,
  confidential: false,
  confidentialLabel: "",
  caseStudySlug: "",
  portfolioStatus: "",
  portfolioLabel: "",
  portfolioBody: "",
  seo: { title: "", description: "", ogImage: "" },
  detail: {
    titleBefore: "",
    titleHighlight: "",
    titleAfter: "",
    body: "",
    primaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
    demoCta: { label: "Watch Demo", targetId: "demo" },
    stats: { bestFor: "", coreFunction: "", platform: "", workflow: "" },
    challenge: { title: "", body: "", problems: [] },
    capabilities: { title: "", body: "", cards: [] },
    howItWorks: { title: "", stagesLabel: "", stages: [] },
    builtFor: { title: "", body: "", audiences: [] },
    demo: { title: "", videoSrc: "", posterSrc: "" },
    more: { title: "More Solutions From ConX Orbit.", slugs: [] },
    faq: { titleBefore: "About ", titleHighlight: "", titleAfter: "", items: [] },
    cta: {
      title: "Could a System Like This Work for Your Workflow?",
      body: "",
      primary: { label: "Book a Discovery Call", href: "/book-discovery" },
      secondary: { label: "Explore Solutions", href: "/solutions" },
    },
  },
};

const TABS = ["Basics", "Portfolio / Trades", "Detail", "SEO"];

function parseList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function applyFixedBadges(detail) {
  const next = { ...(detail || {}) };
  next.challenge = { ...(next.challenge || {}), badge: FIXED_BADGES.challenge };
  next.capabilities = { ...(next.capabilities || {}), badge: FIXED_BADGES.capabilities };
  next.howItWorks = { ...(next.howItWorks || {}), badge: FIXED_BADGES.howItWorks };
  next.builtFor = { ...(next.builtFor || {}), badge: FIXED_BADGES.builtFor };
  next.more = { ...(next.more || {}), badge: FIXED_BADGES.more };
  next.faq = { ...(next.faq || {}), badge: FIXED_BADGES.faq };
  next.cta = { ...(next.cta || {}), badge: FIXED_BADGES.cta };
  return next;
}

function ListEditor({ items = [], fields, onChange, addLabel }) {
  const updateItem = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));
  const addItem = () => {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = "";
    });
    onChange([...items, blank]);
  };
  return (
    <div style={{ display: "grid", gap: 12, gridColumn: "1 / -1" }}>
      {items.map((item, index) => (
        <div key={index} className={styles.grid2} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12 }}>
          {fields.map((field) => (
            <label
              key={field.key}
              className={styles.field}
              style={field.wide ? { gridColumn: "1 / -1" } : undefined}
            >
              <span>
                {field.label} #{index + 1}
              </span>
              {field.multiline ? (
                <textarea
                  value={item[field.key] || ""}
                  onChange={(e) => updateItem(index, field.key, e.target.value)}
                />
              ) : (
                <input
                  value={item[field.key] || ""}
                  onChange={(e) => updateItem(index, field.key, e.target.value)}
                />
              )}
            </label>
          ))}
          <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
            <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={addItem}>
        {addLabel}
      </button>
    </div>
  );
}

export default function AdminSolutionForm() {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [detailJson, setDetailJson] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
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
          setDetailJson(JSON.stringify(EMPTY.detail, null, 2));
          return;
        }
        const item = items.find((row) => row._id === id);
        if (!item) {
          setError("Solution not found");
          return;
        }
        const merged = {
          ...EMPTY,
          ...item,
          seo: { ...EMPTY.seo, ...(item.seo || {}) },
          detail: { ...EMPTY.detail, ...(item.detail || {}) },
        };
        setForm(merged);
        setDetailJson(JSON.stringify(merged.detail, null, 2));
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [id, isNew, token]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setDetail = (path, value) => {
    setForm((prev) => {
      const detail = { ...prev.detail };
      const keys = path.split(".");
      let cursor = detail;
      for (let i = 0; i < keys.length - 1; i += 1) {
        cursor[keys[i]] = { ...(cursor[keys[i]] || {}) };
        cursor = cursor[keys[i]];
      }
      cursor[keys[keys.length - 1]] = value;
      return { ...prev, detail };
    });
  };

  const syncJsonFromForm = () => {
    setDetailJson(JSON.stringify(form.detail || {}, null, 2));
  };

  const applyJsonToForm = () => {
    try {
      const parsed = JSON.parse(detailJson);
      setForm((prev) => ({ ...prev, detail: applyFixedBadges(parsed) }));
      setError("");
    } catch {
      setError("Advanced JSON is invalid");
    }
  };

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      let detail = form.detail;
      if (showAdvanced) {
        try {
          detail = JSON.parse(detailJson);
        } catch {
          throw new Error("Advanced JSON is invalid");
        }
      }
      detail = applyFixedBadges(detail);
      const payload = { ...form, detail, seo: form.seo || EMPTY.seo };
      delete payload._id;
      delete payload.id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.badge;
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

  const detail = form.detail || EMPTY.detail;
  const moreSlugs = detail.more?.slugs || [];

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

      <div className={styles.tabs}>
        {TABS.map((label, index) => (
          <button
            key={label}
            type="button"
            className={index === tab ? styles.tabsButtonActive : ""}
            onClick={() => setTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 ? (
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
            <span>Description</span>
            <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Listing badge</span>
            <input
              value={form.listingBadge}
              onChange={(e) => setField("listingBadge", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Categories (comma-separated)</span>
            <input
              value={(form.categories || []).join(", ")}
              onChange={(e) => setField("categories", parseList(e.target.value))}
            />
          </label>
          <label className={styles.field}>
            <span>Sort order</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setField("sortOrder", Number(e.target.value))}
            />
          </label>
          <div className={styles.checkRow}>
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
              Show on Solutions page
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.confidential}
                onChange={(e) => setField("confidential", e.target.checked)}
              />
              Confidential
            </label>
          </div>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Listing image URL</span>
            <input
              type="url"
              placeholder="https://res.cloudinary.com/..."
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
            />
            {form.image ? (
              <img src={mediaUrl(form.image)} alt="" style={{ maxWidth: 160, marginTop: 8 }} />
            ) : null}
          </label>
        </div>
      ) : null}

      {tab === 1 ? (
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span>Portfolio category</span>
            <select
              value={form.portfolioCategory}
              onChange={(e) => setField("portfolioCategory", e.target.value)}
            >
              <option value="none">None</option>
              <option value="client_system">Client system</option>
              <option value="internal_product">Internal product</option>
              <option value="workflow_solution">Workflow solution</option>
            </select>
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
            <span>Portfolio label</span>
            <input
              value={form.portfolioLabel}
              onChange={(e) => setField("portfolioLabel", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Portfolio status</span>
            <input
              value={form.portfolioStatus}
              onChange={(e) => setField("portfolioStatus", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Portfolio body</span>
            <textarea
              value={form.portfolioBody}
              onChange={(e) => setField("portfolioBody", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Case study slug (for CTA)</span>
            <input
              value={form.caseStudySlug}
              onChange={(e) => setField("caseStudySlug", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Confidential label</span>
            <input
              value={form.confidentialLabel}
              onChange={(e) => setField("confidentialLabel", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Portfolio image URL</span>
            <input
              type="url"
              placeholder="https://res.cloudinary.com/..."
              value={form.portfolioImage}
              onChange={(e) => setField("portfolioImage", e.target.value)}
            />
            {form.portfolioImage ? (
              <img src={mediaUrl(form.portfolioImage)} alt="" style={{ maxWidth: 160, marginTop: 8 }} />
            ) : null}
          </label>
        </div>
      ) : null}

      {tab === 2 ? (
        <div className={styles.grid2}>
          <p className={styles.muted} style={{ gridColumn: "1 / -1" }}>
            Section badges (THE CHALLENGE, CAPABILITIES, etc.) are fixed in the public UI and cannot be
            edited here.
          </p>

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Hero</h3>
          <label className={styles.field}>
            <span>Title before</span>
            <input
              value={detail.titleBefore || ""}
              onChange={(e) => setDetail("titleBefore", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Title highlight</span>
            <input
              value={detail.titleHighlight || ""}
              onChange={(e) => setDetail("titleHighlight", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Title after</span>
            <input
              value={detail.titleAfter || ""}
              onChange={(e) => setDetail("titleAfter", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Body</span>
            <textarea value={detail.body || ""} onChange={(e) => setDetail("body", e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Primary CTA label</span>
            <input
              value={detail.primaryCta?.label || ""}
              onChange={(e) => setDetail("primaryCta.label", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Primary CTA href</span>
            <input
              value={detail.primaryCta?.href || ""}
              onChange={(e) => setDetail("primaryCta.href", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Demo CTA label</span>
            <input
              value={detail.demoCta?.label || ""}
              onChange={(e) => setDetail("demoCta.label", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Demo CTA target id</span>
            <input
              value={detail.demoCta?.targetId || ""}
              onChange={(e) => setDetail("demoCta.targetId", e.target.value)}
            />
          </label>

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Stats</h3>
          {["bestFor", "coreFunction", "platform", "workflow"].map((key) => (
            <label key={key} className={styles.field}>
              <span>{key}</span>
              <input
                value={detail.stats?.[key] || ""}
                onChange={(e) => setDetail(`stats.${key}`, e.target.value)}
              />
            </label>
          ))}

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Challenge</h3>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Title</span>
            <input
              value={detail.challenge?.title || ""}
              onChange={(e) => setDetail("challenge.title", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Body</span>
            <textarea
              value={detail.challenge?.body || ""}
              onChange={(e) => setDetail("challenge.body", e.target.value)}
            />
          </label>
          <ListEditor
            items={detail.challenge?.problems || []}
            onChange={(problems) => setDetail("challenge.problems", problems)}
            addLabel="Add problem"
            fields={[
              { key: "title", label: "Problem title" },
              { key: "body", label: "Problem body", multiline: true, wide: true },
            ]}
          />

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Capabilities</h3>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Title</span>
            <input
              value={detail.capabilities?.title || ""}
              onChange={(e) => setDetail("capabilities.title", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Body</span>
            <textarea
              value={detail.capabilities?.body || ""}
              onChange={(e) => setDetail("capabilities.body", e.target.value)}
            />
          </label>
          <ListEditor
            items={detail.capabilities?.cards || []}
            onChange={(cards) => setDetail("capabilities.cards", cards)}
            addLabel="Add capability card"
            fields={[
              { key: "title", label: "Card title" },
              { key: "body", label: "Card body", multiline: true, wide: true },
            ]}
          />

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>How it works</h3>
          <label className={styles.field}>
            <span>Title</span>
            <input
              value={detail.howItWorks?.title || ""}
              onChange={(e) => setDetail("howItWorks.title", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Stages label</span>
            <input
              value={detail.howItWorks?.stagesLabel || ""}
              onChange={(e) => setDetail("howItWorks.stagesLabel", e.target.value)}
            />
          </label>
          <ListEditor
            items={detail.howItWorks?.stages || []}
            onChange={(stages) => setDetail("howItWorks.stages", stages)}
            addLabel="Add stage"
            fields={[
              { key: "title", label: "Stage title" },
              { key: "body", label: "Stage body", multiline: true, wide: true },
            ]}
          />

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Built for</h3>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Title</span>
            <input
              value={detail.builtFor?.title || ""}
              onChange={(e) => setDetail("builtFor.title", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Body</span>
            <textarea
              value={detail.builtFor?.body || ""}
              onChange={(e) => setDetail("builtFor.body", e.target.value)}
            />
          </label>
          <ListEditor
            items={detail.builtFor?.audiences || []}
            onChange={(audiences) => setDetail("builtFor.audiences", audiences)}
            addLabel="Add audience"
            fields={[
              { key: "title", label: "Audience title" },
              { key: "body", label: "Audience body", multiline: true, wide: true },
            ]}
          />

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Demo</h3>
          <label className={styles.field}>
            <span>Title</span>
            <input
              value={detail.demo?.title || ""}
              onChange={(e) => setDetail("demo.title", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Video URL</span>
            <input
              value={detail.demo?.videoSrc || ""}
              onChange={(e) => setDetail("demo.videoSrc", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Poster image URL</span>
            <input
              type="url"
              placeholder="https://res.cloudinary.com/..."
              value={detail.demo?.posterSrc || ""}
              onChange={(e) => setDetail("demo.posterSrc", e.target.value)}
            />
          </label>

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>More solutions</h3>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Title</span>
            <input
              value={detail.more?.title || ""}
              onChange={(e) => setDetail("more.title", e.target.value)}
            />
          </label>
          <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Related solution slugs</span>
            <div className={styles.checkRow} style={{ flexWrap: "wrap" }}>
              {allSolutions
                .filter((row) => row.slug !== form.slug)
                .map((row) => (
                  <label key={row._id || row.slug}>
                    <input
                      type="checkbox"
                      checked={moreSlugs.includes(row.slug)}
                      onChange={(e) => {
                        const next = new Set(moreSlugs);
                        if (e.target.checked) next.add(row.slug);
                        else next.delete(row.slug);
                        setDetail("more.slugs", [...next]);
                      }}
                    />
                    {row.name || row.slug}
                  </label>
                ))}
            </div>
          </div>

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>FAQ</h3>
          <label className={styles.field}>
            <span>Title before</span>
            <input
              value={detail.faq?.titleBefore || ""}
              onChange={(e) => setDetail("faq.titleBefore", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Title highlight</span>
            <input
              value={detail.faq?.titleHighlight || ""}
              onChange={(e) => setDetail("faq.titleHighlight", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Title after</span>
            <input
              value={detail.faq?.titleAfter || ""}
              onChange={(e) => setDetail("faq.titleAfter", e.target.value)}
            />
          </label>
          <ListEditor
            items={detail.faq?.items || []}
            onChange={(items) => setDetail("faq.items", items)}
            addLabel="Add FAQ item"
            fields={[
              { key: "question", label: "Question", wide: true },
              { key: "answer", label: "Answer", multiline: true, wide: true },
            ]}
          />

          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>CTA</h3>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Title</span>
            <input
              value={detail.cta?.title || ""}
              onChange={(e) => setDetail("cta.title", e.target.value)}
            />
          </label>
          <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <span>Body</span>
            <textarea
              value={detail.cta?.body || ""}
              onChange={(e) => setDetail("cta.body", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Primary label</span>
            <input
              value={detail.cta?.primary?.label || ""}
              onChange={(e) => setDetail("cta.primary.label", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Primary href</span>
            <input
              value={detail.cta?.primary?.href || ""}
              onChange={(e) => setDetail("cta.primary.href", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Secondary label</span>
            <input
              value={detail.cta?.secondary?.label || ""}
              onChange={(e) => setDetail("cta.secondary.label", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Secondary href</span>
            <input
              value={detail.cta?.secondary?.href || ""}
              onChange={(e) => setDetail("cta.secondary.href", e.target.value)}
            />
          </label>

          <div style={{ gridColumn: "1 / -1", marginTop: 12 }}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => {
                if (!showAdvanced) syncJsonFromForm();
                setShowAdvanced((v) => !v);
              }}
            >
              {showAdvanced ? "Hide advanced JSON" : "Show advanced JSON"}
            </button>
          </div>
          {showAdvanced ? (
            <>
              <label className={styles.field} style={{ gridColumn: "1 / -1" }}>
                <span>Advanced detail JSON</span>
                <textarea
                  style={{ minHeight: 280, fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                  value={detailJson}
                  onChange={(e) => setDetailJson(e.target.value)}
                />
              </label>
              <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={applyJsonToForm}>
                  Apply JSON to form
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {tab === 3 ? (
        <div className={styles.grid2}>
          <p className={styles.muted} style={{ gridColumn: "1 / -1" }}>
            Leave empty for now — fill later when ready.
          </p>
          <label className={styles.field}>
            <span>SEO title</span>
            <input
              value={form.seo?.title || ""}
              onChange={(e) => setField("seo", { ...form.seo, title: e.target.value })}
            />
          </label>
          <label className={styles.field}>
            <span>SEO description</span>
            <input
              value={form.seo?.description || ""}
              onChange={(e) => setField("seo", { ...form.seo, description: e.target.value })}
            />
          </label>
          <label className={styles.field}>
            <span>OG image URL</span>
            <input
              value={form.seo?.ogImage || ""}
              onChange={(e) => setField("seo", { ...form.seo, ogImage: e.target.value })}
            />
          </label>
        </div>
      ) : null}
    </form>
  );
}
