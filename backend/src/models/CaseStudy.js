const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    industry: { type: String, default: "" },
    summary: { type: String, default: "" },
    problem: { type: String, default: "" },
    built: { type: String, default: "" },
    result: { type: String, default: "" },
    quote: {
      text: { type: String, default: "" },
      author: { type: String, default: "" },
    },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseStudy", caseStudySchema);
