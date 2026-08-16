const express = require("express");
const { solutions } = require("../config/lowdb");
const { requireAuth } = require("../middleware/auth");
const { uploadImage } = require("../middleware/upload");
const { createSolution } = require("../controllers/solutionController");

const publicRouter = express.Router();
const adminRouter = express.Router();

function sortRows(rows) {
  return [...rows].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0) || String(a.name).localeCompare(b.name));
}

function toPublic(row) {
  return {
    ...row,
    badge: row.listingBadge,
    id: row._id,
  };
}

publicRouter.get("/", (req, res) => {
  try {
    let rows = solutions.all().filter((row) => row.published);
    if (req.query.trade) {
      rows = rows.filter((row) => (row.trades || []).includes(req.query.trade));
    }
    if (req.query.forPortfolio === "1") {
      rows = rows.filter((row) => row.portfolioCategory && row.portfolioCategory !== "none");
    } else if (req.query.portfolioCategory) {
      rows = rows.filter((row) => row.portfolioCategory === req.query.portfolioCategory);
    } else if (req.query.listing !== "all") {
      rows = rows.filter((row) => row.showOnListing !== false);
    }
    return res.json(sortRows(rows).map(toPublic));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

publicRouter.get("/:slug", (req, res) => {
  try {
    const item = solutions.findOne({ slug: req.params.slug, published: true });
    if (!item || item.showOnListing === false) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(toPublic(item));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

adminRouter.use(requireAuth);

adminRouter.get("/", (_req, res) => {
  res.json(sortRows(solutions.all()));
});

adminRouter.post("/", uploadImage.single("mockup"), createSolution);

adminRouter.put("/:id", (req, res) => {
  const updated = solutions.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  return res.json(updated);
});

adminRouter.delete("/:id", (req, res) => {
  const ok = solutions.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Not found" });
  return res.json({ ok: true });
});

module.exports = { publicRouter, adminRouter };
