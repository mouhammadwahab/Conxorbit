import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

const PAGE_DEFS = {
  solutionsListing: {
    label: "Solutions listing",
    fields: [
      { path: "meta.title", label: "Meta title" },
      { path: "meta.description", label: "Meta description", multiline: true },
      { path: "hero.badge", label: "Hero badge" },
      { path: "hero.titleBefore", label: "Hero title before" },
      { path: "hero.titleHighlight", label: "Hero title highlight" },
      { path: "hero.titleAfter", label: "Hero title after" },
      { path: "hero.body", label: "Hero body", multiline: true },
      { path: "filters", label: "Filters (comma-separated)", list: true },
      { path: "searchPlaceholder", label: "Search placeholder" },
      { path: "cta.badge", label: "CTA badge" },
      { path: "cta.title", label: "CTA title" },
      { path: "cta.body", label: "CTA body", multiline: true },
      { path: "cta.primary.label", label: "CTA primary label" },
      { path: "cta.primary.href", label: "CTA primary href" },
    ],
  },
  portfolio: {
    label: "Portfolio",
    fields: [
      { path: "meta.title", label: "Meta title" },
      { path: "meta.description", label: "Meta description", multiline: true },
      { path: "hero.badge", label: "Hero badge" },
      { path: "hero.titleBefore", label: "Hero title before" },
      { path: "hero.titleHighlight", label: "Hero title highlight" },
      { path: "hero.titleAfter", label: "Hero title after" },
      { path: "hero.body", label: "Hero body", multiline: true },
      { path: "hero.line", label: "Hero line" },
      { path: "featuredSlug", label: "Featured solution slug" },
      { path: "featured.badge", label: "Featured badge" },
      { path: "featured.label", label: "Featured label" },
      { path: "featured.title", label: "Featured title" },
      { path: "featured.body", label: "Featured body (fallback)", multiline: true },
      { path: "proof.badge", label: "Proof badge" },
      { path: "clientSystems.badge", label: "Client systems badge" },
      { path: "clientSystems.title", label: "Client systems title" },
      { path: "clientSystems.body", label: "Client systems body", multiline: true },
      { path: "internalProducts.badge", label: "Internal products badge" },
      { path: "internalProducts.title", label: "Internal products title" },
      { path: "internalProducts.body", label: "Internal products body", multiline: true },
      { path: "workflowSolutions.badge", label: "Workflow solutions badge" },
      { path: "workflowSolutions.title", label: "Workflow solutions title" },
      { path: "workflowSolutions.body", label: "Workflow solutions body", multiline: true },
      { path: "industries.badge", label: "Industries badge" },
      { path: "industries.titleLine1", label: "Industries title line 1" },
      { path: "industries.titleLine2", label: "Industries title line 2" },
      { path: "cta.badge", label: "CTA badge" },
      { path: "cta.title", label: "CTA title" },
      { path: "cta.body", label: "CTA body", multiline: true },
      { path: "cta.primary.label", label: "CTA primary label" },
      { path: "cta.primary.href", label: "CTA primary href" },
      { path: "cta.secondary.label", label: "CTA secondary label" },
      { path: "cta.secondary.href", label: "CTA secondary href" },
    ],
  },
  facadeSolutions: {
    label: "Façade related solutions",
    fields: [
      { path: "eyebrow", label: "Eyebrow" },
      { path: "title", label: "Title" },
      { path: "body", label: "Body", multiline: true },
    ],
  },
  constructionSolutions: {
    label: "Construction related solutions",
    fields: [
      { path: "eyebrow", label: "Eyebrow" },
      { path: "title", label: "Title" },
      { path: "body", label: "Body", multiline: true },
    ],
  },
  aboutTeam: {
    label: "About team",
    fields: [{ path: "title", label: "Team section title" }],
  },
};

function getAt(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function setAt(obj, path, value) {
  const keys = path.split(".");
  const next = { ...obj };
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    cursor[key] = { ...(cursor[key] || {}) };
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
}

export default function AdminPages() {
  const { key = "solutionsListing" } = useParams();
  const def = PAGE_DEFS[key] || PAGE_DEFS.solutionsListing;
  const { token } = useAdminAuth();
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    setError("");
    setSaved(false);
    api.admin.pageContent
      .get(token, key)
      .then((data) => {
        if (alive) setForm(data || {});
      })
      .catch((err) => {
        if (alive) {
          setForm({});
          setError(err.message || "Failed to load page content");
        }
      });
    return () => {
      alive = false;
    };
  }, [key, token]);

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const savedData = await api.admin.pageContent.put(token, key, form);
      setForm(savedData);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Pages</h1>
      <nav className={styles.tabs} style={{ marginBottom: 20 }}>
        {Object.entries(PAGE_DEFS).map(([pageKey, pageDef]) => (
          <NavLink
            key={pageKey}
            to={`/admin/pages/${pageKey}`}
            className={({ isActive }) => (isActive ? styles.tabsButtonActive : "")}
            style={{ padding: "8px 12px", textDecoration: "none", color: "inherit" }}
          >
            {pageDef.label}
          </NavLink>
        ))}
      </nav>

      <h2>{def.label}</h2>
      {error ? <p className={styles.error}>{error}</p> : null}
      {saved ? <p className={styles.muted}>Saved.</p> : null}

      <form onSubmit={onSave} className={styles.grid2}>
        {def.fields.map((field) => {
          const raw = getAt(form, field.path);
          const value = field.list
            ? Array.isArray(raw)
              ? raw.join(", ")
              : String(raw || "")
            : raw ?? "";
          return (
            <label
              key={field.path}
              className={styles.field}
              style={field.multiline || field.list ? { gridColumn: "1 / -1" } : undefined}
            >
              <span>{field.label}</span>
              {field.multiline ? (
                <textarea
                  value={value}
                  onChange={(e) => setForm(setAt(form, field.path, e.target.value))}
                />
              ) : (
                <input
                  value={value}
                  onChange={(e) => {
                    const nextValue = field.list
                      ? e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      : e.target.value;
                    setForm(setAt(form, field.path, nextValue));
                  }}
                />
              )}
            </label>
          );
        })}
        <div className={styles.row} style={{ gridColumn: "1 / -1" }}>
          <button className={styles.btn} type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
