const express = require("express");
const { caseStudies } = require("../config/lowdb");
const { requireAuth } = require("../middleware/auth");

const publicRouter = express.Router();
const adminRouter = express.Router();

function sortRows(rows) {
  return [...rows].sort(
    (a, b) =>
      (a.displayOrder || 0) - (b.displayOrder || 0) || String(a.title).localeCompare(b.title)
  );
}

function toPublic(row) {
  return {
    ...row,
    id: row._id,
  };
}

publicRouter.get("/", (_req, res) => {
  res.json(sortRows(caseStudies.all().filter((row) => row.published)).map(toPublic));
});

publicRouter.get("/:slug", (req, res) => {
  const item = caseStudies.findOne({ slug: req.params.slug, published: true });
  if (!item) return res.status(404).json({ message: "Not found" });
  return res.json(toPublic(item));
});

adminRouter.use(requireAuth);

adminRouter.get("/", (_req, res) => {
  res.json(sortRows(caseStudies.all()));
});

adminRouter.post("/", (req, res) => {
  const created = caseStudies.insert(req.body);
  return res.status(201).json(created);
});

adminRouter.put("/:id", (req, res) => {
  const updated = caseStudies.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  return res.json(updated);
});

adminRouter.delete("/:id", (req, res) => {
  const ok = caseStudies.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Not found" });
  return res.json({ ok: true });
});

module.exports = { publicRouter, adminRouter };
