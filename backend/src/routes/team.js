const express = require("express");
const { team } = require("../config/lowdb");
const { requireAuth } = require("../middleware/auth");

const publicRouter = express.Router();
const adminRouter = express.Router();

function sortRows(rows) {
  return [...rows].sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0) || String(a.name).localeCompare(b.name)
  );
}

publicRouter.get("/", (_req, res) => {
  res.json(sortRows(team.all().filter((row) => row.published)));
});

adminRouter.use(requireAuth);

adminRouter.get("/", (_req, res) => {
  res.json(sortRows(team.all()));
});

adminRouter.post("/", (req, res) => {
  const created = team.insert(req.body);
  return res.status(201).json(created);
});

adminRouter.put("/:id", (req, res) => {
  const updated = team.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  return res.json(updated);
});

adminRouter.delete("/:id", (req, res) => {
  const ok = team.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Not found" });
  return res.json({ ok: true });
});

module.exports = { publicRouter, adminRouter };
