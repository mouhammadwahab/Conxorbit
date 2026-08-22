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

function normalizeTrades(value) {
  const allowed = new Set(["facade", "construction"]);
  return parseList(value)
    .map((trade) => trade.toLowerCase())
    .filter((trade) => allowed.has(trade));
}

function parseBody(raw = {}) {
  // Support multipart: nested JSON may arrive as strings
  const body = { ...raw };
  for (const key of [
    "tags",
    "trades",
    "faq",
    "relatedSolutionIds",
    "hero",
    "snapshot",
    "challenge",
    "howItWorks",
    "builtFor",
    "demo",
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
    category: body.category || "client-system",
    tags: parseList(body.tags),
    trades: normalizeTrades(body.trades),
    hero: {
      titleBefore: String(body.hero?.titleBefore || "").trim(),
      titleHighlight: String(body.hero?.titleHighlight || "").trim(),
      titleAfter: String(body.hero?.titleAfter || "").trim(),
      description: String(body.hero?.description || "").trim(),
      mockup: asMedia(body.hero?.mockup || body.mockup),
    },
    snapshot: {
      bestFor: String(body.snapshot?.bestFor || "").trim(),
      coreFunction: String(body.snapshot?.coreFunction || "").trim(),
      platform: String(body.snapshot?.platform || "").trim(),
      workflow: String(body.snapshot?.workflow || "").trim(),
    },
    challenge: {
      title: String(body.challenge?.title || "").trim(),
      body: String(body.challenge?.body || "").trim(),
      cards: Array.isArray(body.challenge?.cards)
        ? body.challenge.cards.map((card) => ({
            title: String(card?.title || "").trim(),
            body: String(card?.body || "").trim(),
          }))
        : [],
    },
    capabilities: {
      title: String(body.capabilities?.title || "").trim(),
      description: String(body.capabilities?.description || "").trim(),
      cards: Array.isArray(body.capabilities?.cards)
        ? body.capabilities.cards.map((card) => ({
            icon: String(card?.icon || "").trim(),
            title: String(card?.title || "").trim(),
            body: String(card?.body || "").trim(),
          }))
        : [],
    },
    howItWorks: {
      title: String(body.howItWorks?.title || "").trim(),
      steps: Array.isArray(body.howItWorks?.steps)
        ? body.howItWorks.steps.map((step) => ({
            title: String(step?.title || "").trim(),
            description: String(step?.description || "").trim(),
          }))
        : [],
    },
    builtFor: {
      title: String(body.builtFor?.title || "").trim(),
      description: String(body.builtFor?.description || "").trim(),
      audiences: Array.isArray(body.builtFor?.audiences)
        ? body.builtFor.audiences.map((audience) => ({
            title: String(audience?.title || "").trim(),
            body: String(audience?.body || "").trim(),
          }))
        : [],
    },
    demo: {
      video: asMedia(
        body.demo?.video || {
          url: body.demo?.videoUrl,
          publicId: body.demo?.publicId,
        }
      ),
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
    cta: {
      title: String(body.cta?.title || "").trim(),
      body: String(body.cta?.body || "").trim(),
    },
    published: body.published !== false && body.published !== "false",
    featured: body.featured === true || body.featured === "true",
    showOnListing: body.showOnListing !== false && body.showOnListing !== "false",
    sortOrder: Number(body.sortOrder) || 0,
    seo: {
      title: String(body.seo?.title || "").trim(),
      description: String(body.seo?.description || "").trim(),
      ogImage: asMedia(body.seo?.ogImage),
    },
  };
}

/** Shape used by the public website */
function toPublic(doc) {
  const row = doc.toObject ? doc.toObject() : doc;
  const mockupUrl = row.hero?.mockup?.url || row.mockup?.url || "";
  const capabilitiesCards = Array.isArray(row.capabilities?.cards)
    ? row.capabilities.cards
    : Array.isArray(row.capabilities)
      ? row.capabilities.map((title) => ({ title, body: "" }))
      : [];
  const builtForAudiences = Array.isArray(row.builtFor?.audiences)
    ? row.builtFor.audiences
    : Array.isArray(row.audiences)
      ? row.audiences.map((title) => ({ title, body: "" }))
      : [];
  return {
    ...row,
    id: row._id,
    // listing / cards use mockup as the primary image
    image: mockupUrl,
    categories: row.tags || [],
    description: row.shortDescription || "",
    detail: {
      titleBefore: row.hero?.titleBefore || "",
      titleHighlight: row.hero?.titleHighlight || row.name || "",
      titleAfter: row.hero?.titleAfter || "",
      body: row.hero?.description || "",
      heroImage: mockupUrl,
      primaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
      demoCta: { label: "Watch Demo", targetId: "demo" },
      stats: {
        bestFor: row.snapshot?.bestFor || "",
        coreFunction: row.snapshot?.coreFunction || "",
        platform: row.snapshot?.platform || "",
        workflow: row.snapshot?.workflow || "",
      },
      challenge: {
        title: row.challenge?.title || "",
        body: row.challenge?.body || "",
        problems: row.challenge?.cards || [],
      },
      capabilities: {
        title: row.capabilities?.title || "Capabilities",
        body: row.capabilities?.description || "",
        cards: capabilitiesCards,
      },
      howItWorks: {
        title: row.howItWorks?.title || "",
        stagesLabel: "",
        stages: row.howItWorks?.steps || [],
      },
      builtFor: {
        title: row.builtFor?.title || "Built for",
        body: row.builtFor?.description || "",
        audiences: builtForAudiences,
      },
      demo: {
        title: "Product demo",
        videoSrc: row.demo?.video?.url || row.demo?.videoUrl || "",
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
        primary: { label: "Book a Discovery Call", href: "/book-discovery" },
        secondary: { label: "Explore Solutions", href: "/solutions" },
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
      payload.hero = payload.hero || {};
      payload.hero.mockup = await replaceMedia({
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
      payload.demo = { video: { url: uploaded.url, publicId: uploaded.publicId } };
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
      payload.hero = payload.hero || {};
      payload.hero.mockup = await replaceMedia({
        fileBuffer: req.files.mockup[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "image",
        previousPublicId: existing.hero?.mockup?.publicId,
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
      payload.hero = payload.hero || {};
      payload.hero.mockup = await syncReplacedMedia(
        existing.hero?.mockup,
        asMedia(nextMockup),
        "image"
      );
    } else if (req.body.hero !== undefined) {
      let nextHero = req.body.hero;
      if (typeof nextHero === "string") {
        try {
          nextHero = JSON.parse(nextHero);
        } catch {
          nextHero = {};
        }
      }
      payload.hero = payload.hero || {};
      payload.hero.mockup = await syncReplacedMedia(
        existing.hero?.mockup,
        asMedia(nextHero.mockup),
        "image"
      );
    } else {
      payload.hero = payload.hero || {};
      payload.hero.mockup = asMedia(existing.hero?.mockup);
    }

    if (req.files?.demo?.[0]) {
      const uploaded = await replaceMedia({
        fileBuffer: req.files.demo[0].buffer,
        folder: CLOUDINARY_FOLDERS.solutions,
        resourceType: "video",
        previousPublicId: existing.demo?.video?.publicId,
      });
      payload.demo = { video: { url: uploaded.url, publicId: uploaded.publicId } };
    } else if (req.body.clearDemo === "true" || req.body.clearDemo === true) {
      await clearMedia(
        { url: existing.demo?.video?.url, publicId: existing.demo?.video?.publicId },
        "video"
      );
      payload.demo = { video: { url: "", publicId: "" } };
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
        { url: existing.demo?.video?.url, publicId: existing.demo?.video?.publicId },
        asMedia(nextDemo.video || nextDemo),
        "video"
      );
      payload.demo = { video: { url: synced.url, publicId: synced.publicId } };
    } else {
      payload.demo = {
        video: {
          url: existing.demo?.video?.url || "",
          publicId: existing.demo?.video?.publicId || "",
        },
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
    await clearMedia(existing.hero?.mockup, "image");
    await clearMedia(
      { url: existing.demo?.video?.url, publicId: existing.demo?.video?.publicId },
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
