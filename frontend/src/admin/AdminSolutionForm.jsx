import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAdminAuth } from "./AdminAuth";
import { api } from "../api/client";

import styles from "./admin.module.css";


const CATEGORIES = [
  "client-system",
  "internal-product",
  "workflow-solution",
  "other",
];

const TRADES = [
  { value: "facade", label: "Facade" },
  { value: "construction", label: "Construction" },
];


const EMPTY = {
  name: "",
  slug: "",
  shortDescription: "",

  category: "other",
  tags: [],
  trades: [],

  hero: {
    titleBefore: "",
    titleHighlight: "",
    titleAfter: "",
    description: "",
    mockup: {
      url: "",
      publicId: "",
    },
  },

  snapshot: {
    bestFor: "",
    coreFunction: "",
    platform: "",
    workflow: "",
  },

  challenge: {
    title: "",
    body: "",
    cards: [],
  },

  capabilities: {
    title: "",
    description: "",
    cards: [],
  },

  howItWorks: {
    title: "",
    steps: [],
  },

  builtFor: {
    title: "",
    description: "",
    audiences: [],
  },

  demo: {
    video: {
      url: "",
      publicId: "",
    },
  },

  relatedSolutionIds: [],

  faq: [],

  cta: {
    title: "",
    body: "",
  },

  published: true,
  featured: false,
  showOnListing: true,
  sortOrder: 0,

  seo: {
    title: "",
    description: "",
    ogImage: {
      url: "",
      publicId: "",
    },
  },
};


const textToList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);


const listToText = (value) =>
  Array.isArray(value) ? value.join(", ") : "";


const cloneEmpty = () => JSON.parse(JSON.stringify(EMPTY));


const mergeSolution = (item) => {
  const empty = cloneEmpty();

  return {
    ...empty,
    ...item,

    hero: {
      ...empty.hero,
      ...(item.hero || {}),
      mockup: {
        ...empty.hero.mockup,
        ...(item.hero?.mockup || {}),
      },
    },

    snapshot: {
      ...empty.snapshot,
      ...(item.snapshot || {}),
    },

    challenge: {
      ...empty.challenge,
      ...(item.challenge || {}),
      cards: item.challenge?.cards || [],
    },

    capabilities: {
      ...empty.capabilities,
      ...(item.capabilities || {}),
      cards: item.capabilities?.cards || [],
    },

    howItWorks: {
      ...empty.howItWorks,
      ...(item.howItWorks || {}),
      steps: item.howItWorks?.steps || [],
    },

    builtFor: {
      ...empty.builtFor,
      ...(item.builtFor || {}),
      audiences: item.builtFor?.audiences || [],
    },

    demo: {
      ...empty.demo,
      ...(item.demo || {}),
      video: {
        ...empty.demo.video,
        ...(item.demo?.video || {}),
      },
    },

    relatedSolutionIds: item.relatedSolutionIds || [],

    faq: item.faq || [],

    cta: {
      ...empty.cta,
      ...(item.cta || {}),
    },

    seo: {
      ...empty.seo,
      ...(item.seo || {}),
      ogImage: {
        ...empty.seo.ogImage,
        ...(item.seo?.ogImage || {}),
      },
    },
  };
};


export default function Solution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const isNew = !id || id === "new";

  const [form, setForm] = useState(cloneEmpty());
  const [tagsText, setTagsText] = useState("");
  const [uploadingMockup, setUploadingMockup] = useState(false);
  const [uploadingDemo, setUploadingDemo] = useState(false);

  const [allSolutions, setAllSolutions] = useState([]);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | Load solution
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setError("");

        const items = await api.admin.solutions.list(token);

        if (!mounted) return;

        setAllSolutions(items || []);

        if (isNew) {
          setForm(cloneEmpty());
          setTagsText("");
          return;
        }

        const item = (items || []).find(
          (row) => String(row._id) === String(id)
        );

        if (!item) {
          setError("Solution not found");
          return;
        }

        const merged = mergeSolution(item);

        setForm(merged);
        setTagsText(listToText(merged.tags));
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load solution");
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id, isNew, token]);


  /*
  |--------------------------------------------------------------------------
  | Generic field setter
  |--------------------------------------------------------------------------
  */

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | Nested field setter
  |--------------------------------------------------------------------------
  */

  const setNestedField = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const onSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,

        tags: textToList(tagsText),
        trades: (form.trades || []).map((trade) => String(trade).toLowerCase()),

        relatedSolutionIds: (form.relatedSolutionIds || []).map(String),
      };

      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;

      if (isNew) {
        const created = await api.admin.solutions.create(
          token,
          payload
        );

        navigate(`/admin/solutions/${created._id}`);
      } else {
        await api.admin.solutions.update(
          token,
          id,
          payload
        );
      }
    } catch (err) {
      setError(err.message || "Failed to save solution");
    } finally {
      setSaving(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Array helpers
  |--------------------------------------------------------------------------
  */

  const addChallenge = () => {
    setNestedField(
      "challenge",
      "cards",
      [
        ...(form.challenge.cards || []),
        {
          title: "",
          body: "",
        },
      ]
    );
  };


  const removeChallenge = (index) => {
    const next = [...(form.challenge.cards || [])];
    next.splice(index, 1);

    setNestedField("challenge", "cards", next);
  };


  const updateChallenge = (index, key, value) => {
    const next = [...(form.challenge.cards || [])];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    setNestedField("challenge", "cards", next);
  };


  const addCapability = () => {
    setNestedField(
      "capabilities",
      "cards",
      [
        ...(form.capabilities.cards || []),
        {
          icon: "",
          title: "",
          body: "",
        },
      ]
    );
  };


  const removeCapability = (index) => {
    const next = [...(form.capabilities.cards || [])];
    next.splice(index, 1);

    setNestedField("capabilities", "cards", next);
  };


  const updateCapability = (index, key, value) => {
    const next = [...(form.capabilities.cards || [])];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    setNestedField("capabilities", "cards", next);
  };


  const addStep = () => {
    setNestedField(
      "howItWorks",
      "steps",
      [
        ...(form.howItWorks.steps || []),
        {
          title: "",
          description: "",
        },
      ]
    );
  };


  const removeStep = (index) => {
    const next = [...(form.howItWorks.steps || [])];
    next.splice(index, 1);

    setNestedField("howItWorks", "steps", next);
  };


  const updateStep = (index, key, value) => {
    const next = [...(form.howItWorks.steps || [])];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    setNestedField("howItWorks", "steps", next);
  };


  const addAudience = () => {
    setNestedField(
      "builtFor",
      "audiences",
      [
        ...(form.builtFor.audiences || []),
        {
          title: "",
          body: "",
        },
      ]
    );
  };


  const removeAudience = (index) => {
    const next = [...(form.builtFor.audiences || [])];
    next.splice(index, 1);

    setNestedField("builtFor", "audiences", next);
  };


  const updateAudience = (index, key, value) => {
    const next = [...(form.builtFor.audiences || [])];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    setNestedField("builtFor", "audiences", next);
  };


  const addFaq = () => {
    setField("faq", [
      ...(form.faq || []),
      {
        question: "",
        answer: "",
      },
    ]);
  };


  const removeFaq = (index) => {
    const next = [...(form.faq || [])];
    next.splice(index, 1);

    setField("faq", next);
  };


  const updateFaq = (index, key, value) => {
    const next = [...(form.faq || [])];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    setField("faq", next);
  };


  /*
  |--------------------------------------------------------------------------
  | Related solutions
  |--------------------------------------------------------------------------
  */

  const toggleRelatedSolution = (solutionId, checked) => {
    const current = new Set(
      (form.relatedSolutionIds || []).map(String)
    );

    if (checked) {
      current.add(String(solutionId));
    } else {
      current.delete(String(solutionId));
    }

    setField(
      "relatedSolutionIds",
      [...current]
    );
  };


  const toggleTrade = (tradeValue, checked) => {
    const current = new Set((form.trades || []).map((trade) => String(trade).toLowerCase()));
    if (checked) {
      current.add(tradeValue);
    } else {
      current.delete(tradeValue);
    }
    setField("trades", [...current]);
  };


  const onUploadMockup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingMockup(true);
    setError("");

    try {
      const uploaded = await api.admin.uploadImage(token, file, "conx-orbit/solutions");
      setNestedField("hero", "mockup", {
        url: uploaded?.url || uploaded?.media?.url || "",
        publicId: uploaded?.publicId || uploaded?.media?.publicId || "",
      });
    } catch (err) {
      setError(err.message || "Failed to upload hero mockup");
    } finally {
      setUploadingMockup(false);
      event.target.value = "";
    }
  };


  const onUploadDemoVideo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingDemo(true);
    setError("");

    try {
      const uploaded = await api.admin.uploadVideo(token, file, "conx-orbit/solutions");
      setNestedField("demo", "video", {
        url: uploaded?.url || uploaded?.media?.url || "",
        publicId: uploaded?.publicId || uploaded?.media?.publicId || "",
      });
    } catch (err) {
      setError(err.message || "Failed to upload demo video");
    } finally {
      setUploadingDemo(false);
      event.target.value = "";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <form onSubmit={onSave}>

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className={styles.row}>
        <h1>
          {isNew
            ? "New solution"
            : `Edit: ${form.name || form.slug}`}
        </h1>

        <div className={styles.row}>
          <Link
            className={`${styles.btn} ${styles.btnSecondary}`}
            to="/admin/solutions"
          >
            Back
          </Link>

          <button
            className={styles.btn}
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Solution"}
          </button>
        </div>
      </div>


      {error ? (
        <p className={styles.error}>
          {error}
        </p>
      ) : null}


      <div className={styles.grid2}>

        {/* ================================================================ */}
        {/* BASIC INFORMATION                                                */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Basic Information
        </h2>


        <label className={styles.field}>
          <span>Name *</span>

          <input
            value={form.name}
            onChange={(e) =>
              setField("name", e.target.value)
            }
            required
          />
        </label>


        <label className={styles.field}>
          <span>Slug *</span>

          <input
            value={form.slug}
            onChange={(e) =>
              setField("slug", e.target.value)
            }
            required
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Short description</span>

          <textarea
            value={form.shortDescription}
            onChange={(e) =>
              setField(
                "shortDescription",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Category</span>

          <select
            value={form.category}
            onChange={(e) =>
              setField(
                "category",
                e.target.value
              )
            }
          >
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>
            Tags (comma-separated — used as website filters)
          </span>

          <input
            value={tagsText}
            onChange={(e) =>
              setTagsText(e.target.value)
            }
            placeholder="AI, Inspection, Voice, Reporting"
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Trades</span>
          <div className={styles.checkRow}>
            {TRADES.map((trade) => (
              <label key={trade.value}>
                <input
                  type="checkbox"
                  checked={(form.trades || []).map((value) => String(value).toLowerCase()).includes(trade.value)}
                  onChange={(e) => toggleTrade(trade.value, e.target.checked)}
                />
                {trade.label}
              </label>
            ))}
          </div>
        </label>


        {/* ================================================================ */}
        {/* HERO                                                             */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Hero
        </h2>


        <label className={styles.field}>
          <span>Title before</span>

          <input
            value={form.hero.titleBefore}
            onChange={(e) =>
              setNestedField(
                "hero",
                "titleBefore",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Title highlight</span>

          <input
            value={form.hero.titleHighlight}
            onChange={(e) =>
              setNestedField(
                "hero",
                "titleHighlight",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Title after</span>

          <input
            value={form.hero.titleAfter}
            onChange={(e) =>
              setNestedField(
                "hero",
                "titleAfter",
                e.target.value
              )
            }
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Hero description</span>

          <textarea
            value={form.hero.description}
            onChange={(e) =>
              setNestedField(
                "hero",
                "description",
                e.target.value
              )
            }
          />
        </label>


        <div
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Hero mockup</span>

          <label className={styles.field}>
            <span>Upload image file</span>
            <input
              type="file"
              accept="image/*"
              onChange={onUploadMockup}
              disabled={uploadingMockup}
            />
          </label>
          {uploadingMockup ? <p className={styles.muted}>Uploading image...</p> : null}

          <div className={styles.grid2}>
            <label className={styles.field}>
              <span>Image URL</span>
              <input
                value={form.hero.mockup.url}
                onChange={(e) =>
                  setNestedField("hero", "mockup", {
                    ...(form.hero.mockup || {}),
                    url: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.field}>
              <span>Public ID</span>
              <input
                value={form.hero.mockup.publicId}
                onChange={(e) =>
                  setNestedField("hero", "mockup", {
                    ...(form.hero.mockup || {}),
                    publicId: e.target.value,
                  })
                }
              />
            </label>
          </div>

          {form.hero.mockup.url ? (
            <img
              src={form.hero.mockup.url}
              alt="Hero mockup"
              className={styles.mediaPreview}
              style={{ maxWidth: "500px", maxHeight: "280px", objectFit: "contain" }}
            />
          ) : null}
        </div>


        {/* ================================================================ */}
        {/* SNAPSHOT                                                         */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Solution Snapshot
        </h2>


        <label className={styles.field}>
          <span>Best For</span>

          <input
            value={form.snapshot.bestFor}
            onChange={(e) =>
              setNestedField(
                "snapshot",
                "bestFor",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Core Function</span>

          <input
            value={form.snapshot.coreFunction}
            onChange={(e) =>
              setNestedField(
                "snapshot",
                "coreFunction",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Platform</span>

          <input
            value={form.snapshot.platform}
            onChange={(e) =>
              setNestedField(
                "snapshot",
                "platform",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>Workflow</span>

          <input
            value={form.snapshot.workflow}
            onChange={(e) =>
              setNestedField(
                "snapshot",
                "workflow",
                e.target.value
              )
            }
          />
        </label>


        {/* ================================================================ */}
        {/* CHALLENGE                                                        */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          The Challenge
        </h2>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Heading</span>

          <input
            value={form.challenge.title}
            onChange={(e) =>
              setNestedField(
                "challenge",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Description</span>

          <textarea
            value={form.challenge.body}
            onChange={(e) =>
              setNestedField(
                "challenge",
                "body",
                e.target.value
              )
            }
          />
        </label>


        <div
          style={{ gridColumn: "1 / -1" }}
        >
          <h3>Challenge Cards</h3>

          {(form.challenge.cards || []).map(
            (card, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>
                      Card {index + 1} Title
                    </span>

                    <input
                      value={card.title || ""}
                      onChange={(e) =>
                        updateChallenge(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </label>


                  <label className={styles.field}>
                    <span>Description</span>

                    <textarea
                      value={card.body || ""}
                      onChange={(e) =>
                        updateChallenge(
                          index,
                          "body",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() =>
                    removeChallenge(index)
                  }
                >
                  Remove
                </button>
              </div>
            )
          )}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={addChallenge}
          >
            + Add Challenge
          </button>
        </div>


        {/* ================================================================ */}
        {/* CAPABILITIES                                                      */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Capabilities
        </h2>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Heading</span>

          <input
            value={form.capabilities.title}
            onChange={(e) =>
              setNestedField(
                "capabilities",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Description</span>

          <textarea
            value={form.capabilities.description}
            onChange={(e) =>
              setNestedField(
                "capabilities",
                "description",
                e.target.value
              )
            }
          />
        </label>


        <div
          style={{ gridColumn: "1 / -1" }}
        >
          <h3>Capability Cards</h3>

          {(form.capabilities.cards || []).map(
            (card, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Icon</span>

                    <input
                      value={card.icon || ""}
                      onChange={(e) =>
                        updateCapability(
                          index,
                          "icon",
                          e.target.value
                        )
                      }
                      placeholder="layers"
                    />
                  </label>


                  <label className={styles.field}>
                    <span>Title</span>

                    <input
                      value={card.title || ""}
                      onChange={(e) =>
                        updateCapability(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </label>


                  <label
                    className={styles.field}
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <span>Description</span>

                    <textarea
                      value={card.body || ""}
                      onChange={(e) =>
                        updateCapability(
                          index,
                          "body",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() =>
                    removeCapability(index)
                  }
                >
                  Remove
                </button>
              </div>
            )
          )}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={addCapability}
          >
            + Add Capability
          </button>
        </div>


        {/* ================================================================ */}
        {/* HOW IT WORKS                                                      */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          How It Works
        </h2>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Heading</span>

          <input
            value={form.howItWorks.title}
            onChange={(e) =>
              setNestedField(
                "howItWorks",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <div
          style={{ gridColumn: "1 / -1" }}
        >
          <h3>Steps</h3>

          {(form.howItWorks.steps || []).map(
            (step, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>
                      Step {index + 1} Title
                    </span>

                    <input
                      value={step.title || ""}
                      onChange={(e) =>
                        updateStep(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </label>


                  <label className={styles.field}>
                    <span>Description</span>

                    <textarea
                      value={
                        step.description || ""
                      }
                      onChange={(e) =>
                        updateStep(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() =>
                    removeStep(index)
                  }
                >
                  Remove
                </button>
              </div>
            )
          )}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={addStep}
          >
            + Add Step
          </button>
        </div>


        {/* ================================================================ */}
        {/* BUILT FOR                                                         */}
        {/* ================================================================ */}

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Built For
        </h2>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Heading</span>

          <input
            value={form.builtFor.title}
            onChange={(e) =>
              setNestedField(
                "builtFor",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Description</span>

          <textarea
            value={form.builtFor.description}
            onChange={(e) =>
              setNestedField(
                "builtFor",
                "description",
                e.target.value
              )
            }
          />
        </label>


        <div
          style={{ gridColumn: "1 / -1" }}
        >
          <h3>Audience Cards</h3>

          {(form.builtFor.audiences || []).map(
            (audience, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Title</span>

                    <input
                      value={
                        audience.title || ""
                      }
                      onChange={(e) =>
                        updateAudience(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </label>


                  <label className={styles.field}>
                    <span>Description</span>

                    <textarea
                      value={
                        audience.body || ""
                      }
                      onChange={(e) =>
                        updateAudience(
                          index,
                          "body",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() =>
                    removeAudience(index)
                  }
                >
                  Remove
                </button>
              </div>
            )
          )}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={addAudience}
          >
            + Add Audience
          </button>
        </div>

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Demo
        </h2>


        <div
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>Demo Video</span>

          <label className={styles.field}>
            <span>Upload video file</span>
            <input
              type="file"
              accept="video/*"
              onChange={onUploadDemoVideo}
              disabled={uploadingDemo}
            />
          </label>
          {uploadingDemo ? <p className={styles.muted}>Uploading video...</p> : null}

          <div className={styles.grid2}>
            <label className={styles.field}>
              <span>Video URL</span>
              <input
                value={form.demo.video.url}
                onChange={(e) =>
                  setNestedField("demo", "video", {
                    ...(form.demo.video || {}),
                    url: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.field}>
              <span>Public ID</span>
              <input
                value={form.demo.video.publicId}
                onChange={(e) =>
                  setNestedField("demo", "video", {
                    ...(form.demo.video || {}),
                    publicId: e.target.value,
                  })
                }
              />
            </label>
          </div>

          {form.demo.video.url ? (
            <video
              src={form.demo.video.url}
              controls
              style={{ width: "100%", maxWidth: "700px", maxHeight: "400px", borderRadius: "8px" }}
            />
          ) : null}
        </div>


        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Related Solutions
        </h2>


        <div
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>
            Select solutions to display in "Explore More"
          </span>

          <div className={styles.checkRow}>
            {allSolutions
              .filter(
                (solution) =>
                  String(solution._id) !==
                  String(id)
              )
              .map((solution) => (
                <label
                  key={solution._id}
                >
                  <input
                    type="checkbox"
                    checked={
                      (form.relatedSolutionIds || [])
                        .map(String)
                        .includes(
                          String(solution._id)
                        )
                    }
                    onChange={(e) =>
                      toggleRelatedSolution(
                        solution._id,
                        e.target.checked
                      )
                    }
                  />

                  {solution.name}
                </label>
              ))}
          </div>
        </div>


        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          FAQ
        </h2>


        <div
          style={{ gridColumn: "1 / -1" }}
        >
          {(form.faq || []).map(
            (item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Question</span>

                    <input
                      value={
                        item.question || ""
                      }
                      onChange={(e) =>
                        updateFaq(
                          index,
                          "question",
                          e.target.value
                        )
                      }
                    />
                  </label>


                  <label className={styles.field}>
                    <span>Answer</span>

                    <textarea
                      value={
                        item.answer || ""
                      }
                      onChange={(e) =>
                        updateFaq(
                          index,
                          "answer",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() =>
                    removeFaq(index)
                  }
                >
                  Remove FAQ
                </button>
              </div>
            )
          )}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={addFaq}
          >
            + Add FAQ
          </button>
        </div>

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          CTA
        </h2>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>CTA Heading</span>

          <input
            value={form.cta.title}
            onChange={(e) =>
              setNestedField(
                "cta",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <label
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>CTA Description</span>

          <textarea
            value={form.cta.body}
            onChange={(e) =>
              setNestedField(
                "cta",
                "body",
                e.target.value
              )
            }
          />
        </label>

        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          SEO
        </h2>


        <label className={styles.field}>
          <span>SEO Title</span>

          <input
            value={form.seo.title}
            onChange={(e) =>
              setNestedField(
                "seo",
                "title",
                e.target.value
              )
            }
          />
        </label>


        <label className={styles.field}>
          <span>SEO Description</span>

          <textarea
            value={form.seo.description}
            onChange={(e) =>
              setNestedField(
                "seo",
                "description",
                e.target.value
              )
            }
          />
        </label>


        <div
          className={styles.field}
          style={{ gridColumn: "1 / -1" }}
        >
          <span>OG Image</span>

          <div className={styles.grid2}>
            <label className={styles.field}>
              <span>Image URL</span>
              <input
                value={form.seo.ogImage.url}
                onChange={(e) =>
                  setNestedField("seo", "ogImage", {
                    ...(form.seo.ogImage || {}),
                    url: e.target.value,
                  })
                }
              />
            </label>

            <label className={styles.field}>
              <span>Public ID</span>
              <input
                value={form.seo.ogImage.publicId}
                onChange={(e) =>
                  setNestedField("seo", "ogImage", {
                    ...(form.seo.ogImage || {}),
                    publicId: e.target.value,
                  })
                }
              />
            </label>
          </div>

          {form.seo.ogImage.url ? (
            <img
              src={form.seo.ogImage.url}
              alt="SEO OG"
              className={styles.mediaPreview}
              style={{ maxWidth: "500px", maxHeight: "250px", objectFit: "contain" }}
            />
          ) : null}
        </div>


        <h2
          style={{
            gridColumn: "1 / -1",
            marginBottom: 0,
          }}
        >
          Publishing
        </h2>


        <label className={styles.field}>
          <span>Sort Order</span>

          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setField(
                "sortOrder",
                Number(e.target.value)
              )
            }
          />
        </label>


        <div
          className={styles.field}
          style={{
            justifyContent: "center",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setField(
                  "published",
                  e.target.checked
                )
              }
            />

            {" "}Published
          </label>


          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setField(
                  "featured",
                  e.target.checked
                )
              }
            />

            {" "}Featured
          </label>


          <label>
            <input
              type="checkbox"
              checked={form.showOnListing}
              onChange={(e) =>
                setField(
                  "showOnListing",
                  e.target.checked
                )
              }
            />

            {" "}Show on listing
          </label>
        </div>


        <div
          className={styles.row}
          style={{
            gridColumn: "1 / -1",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Link
            className={`${styles.btn} ${styles.btnSecondary}`}
            to="/admin/solutions"
          >
            Cancel
          </Link>

          <button
            className={styles.btn}
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving…"
              : isNew
                ? "Create Solution"
                : "Save Changes"}
          </button>
        </div>

      </div>
    </form>
  );
}