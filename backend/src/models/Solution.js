const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { _id: false }
);

const solutionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    listingBadge: { type: String, default: "" },
    categories: [{ type: String }],
    image: { type: String, default: "" },
    portfolioImage: { type: String, default: "" },
    portfolioCategory: {
      type: String,
      enum: ["client_system", "internal_product", "workflow_solution", "none"],
      default: "none",
    },
    trades: [{ type: String }],
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    showOnListing: { type: Boolean, default: true },
    confidential: { type: Boolean, default: false },
    confidentialLabel: { type: String, default: "" },
    caseStudySlug: { type: String, default: "" },
    portfolioStatus: { type: String, default: "" },
    portfolioLabel: { type: String, default: "" },
    portfolioBody: { type: String, default: "" },
    seo: { type: seoSchema, default: () => ({}) },
    detail: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
