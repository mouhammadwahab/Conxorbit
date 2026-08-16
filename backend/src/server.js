require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/cloudinary");
const { connectDB, checkDatabaseConnection } = require("./config/db");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const { publicRouter: solutionsPublic, adminRouter: solutionsAdmin } = require("./routes/solutions");
const { publicRouter: casePublic, adminRouter: caseAdmin } = require("./routes/caseStudies");
const { publicRouter: teamPublic, adminRouter: teamAdmin } = require("./routes/team");
const { publicRouter: pagePublic, adminRouter: pageAdmin } = require("./routes/pageContent");
const { publicRouter: offersPublic, adminRouter: offersAdmin } = require("./routes/offers");
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

app.get("/api/health", async (_req, res) => {
  const db = await checkDatabaseConnection();
  return res.json({ ok: true, database: db });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/solutions", solutionsPublic);
app.use("/api/case-studies", casePublic);
app.use("/api/team", teamPublic);
app.use("/api/page-content", pagePublic);
app.use("/api/offers", offersPublic);
app.use("/api/admin/solutions", solutionsAdmin);
app.use("/api/admin/case-studies", caseAdmin);
app.use("/api/admin/team", teamAdmin);
app.use("/api/admin/page-content", pageAdmin);
app.use("/api/admin/offers", offersAdmin);
app.use("/api/admin/upload", uploadRoutes);


async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

startServer();
