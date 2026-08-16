const CaseStudy = require("../models/CaseStudy");
const { CLOUDINARY_FOLDERS } = require("../config/folders");
const { asMedia, replaceMedia, syncReplacedMedia, clearMedia } = require("../utils/media");

function parsePoints(value) {
  if (!Array.isArray(value)) return [];
  return value.map((p) => ({
    title: String(p.title || "").trim(),
    description: String(p.description || "").trim(),
  }));
}

function parseBody(raw = {}) {
  const body = { ...raw };
  for (const key of ["problem", "solution", "heroImage", "seo"]) {
    if (typeof body[key] === "string") {
      try {
        body[key] = JSON.parse(body[key]);
      } catch {
        /* keep */
      }
    }
  }

  return {
    title: String(body.title || "").trim(),
    slug: String(body.slug || "").trim(),
    category: String(body.category || "").trim(),
    shortDescription: String(body.shortDescription || "").trim(),
    clientName: String(body.clientName || "").trim(),
    industry: String(body.industry || "").trim(),
    trade: String(body.trade || "").trim(),
    projectType: String(body.projectType || "").trim(),
    heroImage: asMedia(body.heroImage),
    problem: {
      description: String(body.problem?.description || "").trim(),
      points: parsePoints(body.problem?.points),
    },
    solution: {
      description: String(body.solution?.description || "").trim(),
      points: parsePoints(body.solution?.points),
    },
    relatedSolutionId: body.relatedSolutionId || null,
    featured: body.featured === true || body.featured === "true",
    published: body.published !== false && body.published !== "false",
    sortOrder: Number(body.sortOrder) || 0,
    seo: body.seo && typeof body.seo === "object" ? body.seo : {},
  };
}

function toPublic(doc) {
  const row = doc.toObject ? doc.toObject() : doc;
  const heroUrl = row.heroImage?.url || "";
  return {
    ...row,
    id: row._id,
    heroImageUrl: heroUrl,
    mockupImageUrl: heroUrl,
    supportingImageUrl: "",
    problem: row.problem?.description || "",
    problemPoints: row.problem?.points || [],
    solution: row.solution?.description || "",
    solutionPoints: row.solution?.points || [],
    displayOrder: row.sortOrder || 0,
  };
}

async function listPublic(_req, res) {
  try {
    const rows = await CaseStudy.find({ published: true }).sort({ sortOrder: 1, title: 1 });
    return res.json(rows.map(toPublic));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getPublicBySlug(req, res) {
  try {
    const item = await CaseStudy.findOne({ slug: req.params.slug, published: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(toPublic(item));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listAdmin(_req, res) {
  try {
    const rows = await CaseStudy.find().sort({ sortOrder: 1, title: 1 });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const payload = parseBody(req.body);
    if (!payload.title || !payload.slug) {
      return res.status(400).json({ message: "title and slug are required" });
    }

    if (req.file) {
      payload.heroImage = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.caseStudies,
        resourceType: "image",
      });
    }

    const created = await CaseStudy.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to create case study" });
  }
}

async function update(req, res) {
  try {
    const existing = await CaseStudy.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const payload = parseBody({ ...existing.toObject(), ...req.body });

    if (req.file) {
      payload.heroImage = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.caseStudies,
        resourceType: "image",
        previousPublicId: existing.heroImage?.publicId,
      });
    } else if (req.body.heroImage !== undefined) {
      let next = req.body.heroImage;
      if (typeof next === "string") {
        try {
          next = JSON.parse(next);
        } catch {
          next = {};
        }
      }
      payload.heroImage = await syncReplacedMedia(existing.heroImage, asMedia(next), "image");
    } else {
      payload.heroImage = asMedia(existing.heroImage);
    }

    Object.assign(existing, payload);
    await existing.save();
    return res.json(existing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to update case study" });
  }
}

async function remove(req, res) {
  try {
    const existing = await CaseStudy.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    await clearMedia(existing.heroImage, "image");
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
  create,
  update,
  remove,
  toPublic,
};
