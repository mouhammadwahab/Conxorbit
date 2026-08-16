const Offer = require("../models/Offer");
const { CLOUDINARY_FOLDERS } = require("../config/folders");
const { asMedia, replaceMedia, syncReplacedMedia, clearMedia } = require("../utils/media");

function toDateOrNull(value) {
  if (value == null || value === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseBody(raw = {}) {
  const body = { ...raw };
  for (const key of ["image", "cta"]) {
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
    badge: String(body.badge || "").trim(),
    description: String(body.description || "").trim(),
    image: asMedia(body.image),
    cta: {
      label: String(body.cta?.label || "").trim(),
      href: String(body.cta?.href || "").trim(),
    },
    active: body.active !== false && body.active !== "false",
    startDate: toDateOrNull(body.startDate),
    endDate: toDateOrNull(body.endDate),
    sortOrder: Number(body.sortOrder) || 0,
  };
}

function isOfferLive(offer, now = new Date()) {
  if (!offer.active) return false;
  if (offer.startDate && new Date(offer.startDate) > now) return false;
  if (offer.endDate && new Date(offer.endDate) < now) return false;
  return true;
}

async function listPublic(_req, res) {
  try {
    const now = new Date();
    const rows = await Offer.find().sort({ sortOrder: 1, title: 1 });
    return res.json(rows.filter((row) => isOfferLive(row, now)));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listAdmin(_req, res) {
  try {
    const rows = await Offer.find().sort({ sortOrder: 1, title: 1 });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const payload = parseBody(req.body);
    if (!payload.title) return res.status(400).json({ message: "title is required" });

    if (req.file) {
      payload.image = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.offers,
        resourceType: "image",
      });
    }

    const created = await Offer.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to create offer" });
  }
}

async function update(req, res) {
  try {
    const existing = await Offer.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const payload = parseBody({ ...existing.toObject(), ...req.body });

    if (req.file) {
      payload.image = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.offers,
        resourceType: "image",
        previousPublicId: existing.image?.publicId,
      });
    } else if (req.body.image !== undefined) {
      let next = req.body.image;
      if (typeof next === "string") {
        try {
          next = JSON.parse(next);
        } catch {
          next = {};
        }
      }
      payload.image = await syncReplacedMedia(existing.image, asMedia(next), "image");
    } else {
      payload.image = asMedia(existing.image);
    }

    Object.assign(existing, payload);
    await existing.save();
    return res.json(existing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to update offer" });
  }
}

async function remove(req, res) {
  try {
    const existing = await Offer.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    await clearMedia(existing.image, "image");
    await existing.deleteOne();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listPublic,
  listAdmin,
  create,
  update,
  remove,
};
