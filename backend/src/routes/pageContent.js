const express = require("express");
const { getPageContent, setPageContent, getAllPageContent } = require("../config/lowdb");
const { requireAuth } = require("../middleware/auth");

const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.get("/", (_req, res) => {
  res.json(getAllPageContent());
});

publicRouter.get("/:key", (req, res) => {
  const value = getPageContent(req.params.key);
  if (!value) return res.status(404).json({ message: "Not found" });
  return res.json(value);
});

adminRouter.use(requireAuth);

adminRouter.get("/", (_req, res) => {
  res.json(getAllPageContent());
});

adminRouter.get("/:key", (req, res) => {
  const value = getPageContent(req.params.key);
  if (!value) return res.status(404).json({ message: "Not found" });
  return res.json(value);
});

adminRouter.put("/:key", (req, res) => {
  const saved = setPageContent(req.params.key, req.body);
  return res.json(saved);
});

module.exports = { publicRouter, adminRouter };
