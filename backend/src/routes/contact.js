const express = require("express");
const { sendMail } = require("../services/mail");

const router = express.Router();

function str(value) {
  return String(value == null ? "" : value).trim();
}

function list(value) {
  if (Array.isArray(value)) {
    return value.map((item) => str(item)).filter(Boolean);
  }
  const single = str(value);
  return single ? [single] : [];
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildDiscoveryEmail(body) {
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const company = str(body.company);
  const role = str(body.role);
  const industry = str(body.industry);
  const message = str(body.message);
  const topics = list(body.topics);

  if (!name || !email || !isEmail(email)) {
    return { error: "Name and a valid email are required." };
  }

  const subject = `Discovery call request from ${name}`;
  const text = [
    "New Book a Discovery Call inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Role: ${role || "—"}`,
    `Industry: ${industry || "—"}`,
    `Topics: ${topics.join(", ") || "—"}`,
    "",
    "What they're trying to improve:",
    message || "—",
  ].join("\n");

  return { subject, text, replyTo: email };
}

function buildWorkflowEmail(body) {
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const company = str(body.company);
  const role = str(body.role);
  const phone = str(body.phone);
  const frictionNote = str(body.frictionNote);
  const processToday = str(body.processToday);
  const idealImprove = str(body.idealImprove);
  const workflows = list(body.workflows);
  const frictions = list(body.frictions);

  if (!name || !email || !isEmail(email)) {
    return { error: "Name and a valid email are required." };
  }

  const subject = `Workflow discovery from ${name}`;
  const text = [
    "New Workflow Discovery inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Role: ${role || "—"}`,
    `Phone: ${phone || "—"}`,
    "",
    `Workflows: ${workflows.join(", ") || "—"}`,
    `Friction: ${frictions.join(", ") || "—"}`,
    `Friction note: ${frictionNote || "—"}`,
    "",
    "Process today:",
    processToday || "—",
    "",
    "Ideal improvement:",
    idealImprove || "—",
  ].join("\n");

  return { subject, text, replyTo: email };
}

router.post("/", async (req, res) => {
  try {
    const type = str(req.body.type) || "discovery";
    const built =
      type === "workflow-discovery"
        ? buildWorkflowEmail(req.body)
        : buildDiscoveryEmail(req.body);

    if (built.error) {
      return res.status(400).json({ message: built.error });
    }

    const result = await sendMail(built);
    return res.json({ ok: true, mode: result.mode });
  } catch (error) {
    if (error.code === "MAIL_NOT_CONFIGURED") {
      return res.status(503).json({ message: error.message });
    }
    console.error("[contact]", error);
    return res.status(500).json({
      message: error.message || "Failed to send inquiry email.",
    });
  }
});

module.exports = router;
