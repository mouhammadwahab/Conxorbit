const express = require("express");
const multer = require("multer");
const { requireAuth } = require("../middleware/auth");
const { requireMongo } = require("../middleware/mongo");
const ctrl = require("../controllers/solutionController");

const publicRouter = express.Router();
const adminRouter = express.Router();

const solutionUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: "mockup", maxCount: 1 },
  { name: "demo", maxCount: 1 },
]);

publicRouter.get("/", requireMongo, ctrl.listPublic);
publicRouter.get("/:slug", requireMongo, ctrl.getPublicBySlug);

adminRouter.use(requireAuth, requireMongo);
adminRouter.get("/", ctrl.listAdmin);
adminRouter.get("/:id", ctrl.getAdmin);
adminRouter.post("/", solutionUpload, ctrl.create);
adminRouter.put("/:id", solutionUpload, ctrl.update);
adminRouter.delete("/:id", ctrl.remove);

module.exports = { publicRouter, adminRouter };
