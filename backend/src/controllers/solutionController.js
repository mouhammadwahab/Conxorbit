const Solution = require("../models/Solution");
const { CLOUDINARY_FOLDERS } = require("../config/folders");
const { asMedia, replaceMedia, syncReplacedMedia, clearMedia } = require("../utils/media");

function parseList(value) {
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean);
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseBody(raw = {}) {
  // Support multipart: nested JSON may arrive as strings
  const body = { ...raw };
  for (const key of [
    "tags",
    "trades",
    "features",
    "capabilities",
    "audiences",
    "technologies",
    "faq",
    "relatedSolutionIds",
    "relatedCaseStudyIds",
    "hero",
    "demo",
    "mockup",
    "cta",
    "seo",
  ]) {
    if (typeof body[key] === "string") {
      try {
        body[key] = JSON.parse(body[key]);
      } catch {
        /* keep string for list fields parsed below */
      }
    }
  }

  return {
    slug: String(body.slug || "").trim(),
    name: String(body.name || "").trim(),
    shortDescription: String(body.shortDescription || "").trim(),
    category: body.category || "other",
    tags: parseList(body.tags),
    trades: parseList(body.trades),
    listingBadge: String(body.listingBadge || "").trim(),
    hero: {
      title: String(body.hero?.title || "").trim(),
      description: String(body.hero?.description || "").trim(),
    },
    description: String(body.description || "").trim(),
    features: parseList(body.features),
    capabilities: parseList(body.capabilities),
    audiences: parseList(body.audiences),
    technologies: parseList(body.technologies),
    mockup: asMedia(body.mockup),
    demo: {
      videoUrl: String(body.demo?.videoUrl || "").trim(),
      publicId: String(body.demo?.publicId || "").trim(),
    },
    faq: Array.isArray(body.faq)
      ? body.faq.map((item) => ({
          question: String(item.question || "").trim(),
          answer: String(item.answer || "").trim(),
        }))
      : [],
    relatedSolutionIds: Array.isArray(body.relatedSolutionIds)
      ? body.relatedSolutionIds.filter(Boolean)
      : [],
    relatedCaseStudyIds: Array.isArray(body.relatedCaseStudyIds)
      ? body.relatedCaseStudyIds.filter(Boolean)
      : [],
    cta: body.cta && typeof body.cta === "object" ? body.cta : {},
    published: body.published !== false && body.published !== "false",
    featured: body.featured === true || body.featured === "true",
    showOnListing: body.showOnListing !== false && body.showOnListing !== "false",
    sortOrder: Number(body.sortOrder) || 0,
    seo: body.seo && typeof body.seo === "object" ? body.seo : {},
  };
}

/** Shape used by the public website */
function toPublic(doc) {
  const row = doc.toObject ? doc.toObject() : doc;
  const mockupUrl = row.mockup?.url || "";
  return {
    ...row,
    id: row._id,
    badge: row.listingBadge,
    // listing / cards use mockup as the primary image
    image: mockupUrl,
    categories: row.tags || [],
    description: row.shortDescription || row.description || "",
    detail: {
      titleBefore: "",
      titleHighlight: row.hero?.title || row.name || "",
      titleAfter: "",
      body: row.hero?.description || row.description || "",
      heroImage: mockupUrl,
      primaryCta: row.cta?.primary || { label: "Book a Discovery Call", href: "/book-discovery" },
      demoCta: { label: "Watch Demo", targetId: "demo" },
      stats: { bestFor: "", coreFunction: "", platform: "", workflow: "" },
      challenge: { title: "", body: "", problems: [] },
      capabilities: {
        title: "Capabilities",
        body: "",
        cards: (row.capabilities || []).map((title) => ({ title, body: "" })),
      },
      howItWorks: { title: "", stagesLabel: "", stages: [] },
      builtFor: {
        title: "Built for",
        body: "",
        audiences: (row.audiences || []).map((title) => ({ title, body: "" })),
      },
      demo: {
        title: "Product demo",
        videoSrc: row.demo?.videoUrl || "",
        posterSrc: mockupUrl,
      },
      more: { title: "More Solutions From ConX Orbit.", slugs: [] },
      faq: {
        titleBefore: "About ",
        titleHighlight: row.name || "",
        titleAfter: "",
        items: row.faq || [],
      },
      cta: {
        title: row.cta?.title || "Could a System Like This Work for Your Workflow?",
        body: row.cta?.body || "",
        primary: row.cta?.primary || { label: "Book a Discovery Call", href: "/book-discovery" },
        secondary: row.cta?.secondary || { label: "Explore Solutions", href: "/solutions" },
      },
    },
  };
}

async function listPublic(req, res) {
  try {
    const query = { published: true };
    if (req.query.trade) query.trades = req.query.trade;
    if (req.query.forPortfolio !== "1" && req.query.listing !== "all") {
      query.showOnListing = { $ne: false };
    }

    const rows = await Solution.find(query).sort({ sortOrder: 1, name: 1 }).lean();
    return res.json(rows.map(toPublic));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getPublicBySlug(req, res) {
  try {
    const item = await Solution.findOne({ slug: req.params.slug, published: true });
    if (!item || item.showOnListing === false) {
      return res.status(404).json({ message: "Not found" });
    }
    const pub = toPublic(item);
    if (item.relatedSolutionIds?.length) {
      const related = await Solution.find({
        _id: { $in: item.relatedSolutionIds },
        published: true,
      }).select("slug");
      pub.detail.more.slugs = related.map((row) => row.slug);
    }
    return res.json(pub);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listAdmin(_req, res) {
  try {
    const rows = await Solution.find().sort({ sortOrder: 1, name: 1 });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAdmin(req, res) {
  try {
    const item = await Solution.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const payload = parseBody(req.body);
    if (!payload.slug || !payload.name) {
      return res.status(400).json({ message: "name and slug are required" });
    }

    if (req.files?.mockup?.[0]) {
      payload.mockup = await replaceMedia({
        fileBuffer: req.files.mockup[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "image",
      });
    }

    if (req.files?.demo?.[0]) {
      const uploaded = await replaceMedia({
        fileBuffer: req.files.demo[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "video",
      });
      payload.demo = { videoUrl: uploaded.url, publicId: uploaded.publicId };
    }

    const created = await Solution.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to create solution" });
  }
}

async function update(req, res) {
  try {
    const existing = await Solution.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const payload = parseBody({ ...existing.toObject(), ...req.body });

    if (req.files?.mockup?.[0]) {
      payload.mockup = await replaceMedia({
        fileBuffer: req.files.mockup[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "image",
        previousPublicId: existing.mockup?.publicId,
      });
    } else if (req.body.mockup !== undefined) {
      let nextMockup = req.body.mockup;
      if (typeof nextMockup === "string") {
        try {
          nextMockup = JSON.parse(nextMockup);
        } catch {
          nextMockup = {};
        }
      }
      payload.mockup = await syncReplacedMedia(existing.mockup, asMedia(nextMockup), "image");
    } else {
      payload.mockup = asMedia(existing.mockup);
    }

    if (req.files?.demo?.[0]) {
      const uploaded = await replaceMedia({
        fileBuffer: req.files.demo[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "video",
        previousPublicId: existing.demo?.publicId,
      });
      payload.demo = { videoUrl: uploaded.url, publicId: uploaded.publicId };
    } else if (req.body.clearDemo === "true" || req.body.clearDemo === true) {
      await clearMedia(
        { url: existing.demo?.videoUrl, publicId: existing.demo?.publicId },
        "video"
      );
      payload.demo = { videoUrl: "", publicId: "" };
    } else if (req.body.demo !== undefined) {
      let nextDemo = req.body.demo;
      if (typeof nextDemo === "string") {
        try {
          nextDemo = JSON.parse(nextDemo);
        } catch {
          nextDemo = {};
        }
      }
      const synced = await syncReplacedMedia(
        { url: existing.demo?.videoUrl, publicId: existing.demo?.publicId },
        { url: nextDemo.videoUrl, publicId: nextDemo.publicId },
        "video"
      );
      payload.demo = { videoUrl: synced.url, publicId: synced.publicId };
    } else {
      payload.demo = {
        videoUrl: existing.demo?.videoUrl || "",
        publicId: existing.demo?.publicId || "",
      };
    }

    Object.assign(existing, payload);
    await existing.save();
    return res.json(existing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to update solution" });
  }
}

async function remove(req, res) {
  try {
    const existing = await Solution.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    await clearMedia(existing.mockup, "image");
    await clearMedia(
      { url: existing.demo?.videoUrl, publicId: existing.demo?.publicId },
      "video"
    );
    await existing.deleteOne();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listPublic,
  getPublicBySlug,
  listAdmin,
  getAdmin,
  create,
  update,
  remove,
  toPublic,
  parseBody,
};
