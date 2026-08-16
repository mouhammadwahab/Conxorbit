const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { requireMongo } = require("../middleware/mongo");

const router = express.Router();

router.post("/login", requireMongo, async (req, res) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, email: admin.email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
