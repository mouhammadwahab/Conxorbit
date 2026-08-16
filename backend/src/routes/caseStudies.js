const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireMongo } = require("../middleware/mongo");
const { uploadImage } = require("../middleware/upload");
const ctrl = require("../controllers/caseStudyController");

const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.get("/", requireMongo, ctrl.listPublic);
publicRouter.get("/:slug", requireMongo, ctrl.getPublicBySlug);

adminRouter.use(requireAuth, requireMongo);
adminRouter.get("/", ctrl.listAdmin);
adminRouter.post("/", uploadImage.single("heroImage"), ctrl.create);
adminRouter.put("/:id", uploadImage.single("heroImage"), ctrl.update);
adminRouter.delete("/:id", ctrl.remove);

module.exports = { publicRouter, adminRouter };
