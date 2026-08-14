const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const url = `/uploads/${req.file.filename}`;
  return res.status(201).json({ url, filename: req.file.filename });
});

module.exports = router;
