require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const { publicRouter: solutionsPublic, adminRouter: solutionsAdmin } = require("./routes/solutions");
const { publicRouter: casePublic, adminRouter: caseAdmin } = require("./routes/caseStudies");
const { publicRouter: teamPublic, adminRouter: teamAdmin } = require("./routes/team");
const { publicRouter: pagePublic, adminRouter: pageAdmin } = require("./routes/pageContent");
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/solutions", solutionsPublic);
app.use("/api/case-studies", casePublic);
app.use("/api/team", teamPublic);
app.use("/api/page-content", pagePublic);
app.use("/api/admin/solutions", solutionsAdmin);
app.use("/api/admin/case-studies", caseAdmin);
app.use("/api/admin/team", teamAdmin);
app.use("/api/admin/page-content", pageAdmin);
app.use("/api/admin/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
