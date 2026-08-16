const TeamMember = require("../models/TeamMember");
const { CLOUDINARY_FOLDERS } = require("../config/folders");
const { asMedia, replaceMedia, syncReplacedMedia, clearMedia } = require("../utils/media");

function parseBody(raw = {}) {
  const body = { ...raw };
  for (const key of ["image", "socialLinks"]) {
    if (typeof body[key] === "string") {
      try {
        body[key] = JSON.parse(body[key]);
      } catch {
        /* keep */
      }
    }
  }

  return {
    name: String(body.name || "").trim(),
    designation: String(body.designation || "").trim(),
    role: String(body.role || "").trim(),
    bio: String(body.bio || "").trim(),
    image: asMedia(body.image),
    socialLinks: Array.isArray(body.socialLinks)
      ? body.socialLinks.map((link) => ({
          platform: String(link.platform || "linkedin").trim(),
          url: String(link.url || "").trim(),
        }))
      : [],
    quote: String(body.quote || "").trim(),
    sortOrder: Number(body.sortOrder) || 0,
    published: body.published !== false && body.published !== "false",
  };
}

function toPublic(doc) {
  const row = doc.toObject ? doc.toObject() : doc;
  return {
    ...row,
    id: row._id,
    image: row.image?.url || "",
    quoteAuthor: row.name || "",
  };
}

async function listPublic(_req, res) {
  try {
    const rows = await TeamMember.find({ published: true }).sort({ sortOrder: 1, name: 1 });
    return res.json(rows.map(toPublic));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listAdmin(_req, res) {
  try {
    const rows = await TeamMember.find().sort({ sortOrder: 1, name: 1 });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const payload = parseBody(req.body);
    if (!payload.name) return res.status(400).json({ message: "name is required" });

    if (req.file) {
      payload.image = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.team,
        resourceType: "image",
      });
    }

    const created = await TeamMember.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Failed to create team member" });
  }
}

async function update(req, res) {
  try {
    const existing = await TeamMember.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const payload = parseBody({ ...existing.toObject(), ...req.body });

    if (req.file) {
      payload.image = await replaceMedia({
        fileBuffer: req.file.buffer,
        folder: CLOUDINARY_FOLDERS.team,
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
    return res.status(500).json({ message: error.message || "Failed to update team member" });
  }
}

async function remove(req, res) {
  try {
    const existing = await TeamMember.findById(req.params.id);
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
  toPublic,
};
