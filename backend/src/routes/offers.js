const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireMongo } = require("../middleware/mongo");
const { uploadImage } = require("../middleware/upload");
const ctrl = require("../controllers/offerController");

const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.get("/", requireMongo, ctrl.listPublic);

adminRouter.use(requireAuth, requireMongo);
adminRouter.get("/", ctrl.listAdmin);
adminRouter.post("/", uploadImage.single("image"), ctrl.create);
adminRouter.put("/:id", uploadImage.single("image"), ctrl.update);
adminRouter.delete("/:id", ctrl.remove);

module.exports = { publicRouter, adminRouter };
