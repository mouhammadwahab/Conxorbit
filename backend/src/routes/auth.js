const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAdmin } = require("../config/lowdb");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");
    const admin = getAdmin();
    if (!admin || admin.email !== email) {
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
