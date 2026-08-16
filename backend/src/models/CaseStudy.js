const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { _id: false }
);

const pointSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },

    category: { type: String, default: "" },
    shortDescription: { type: String, default: "" },

    clientName: { type: String, default: "" },
    industry: { type: String, default: "" },
    trade: { type: String, default: "" },
    projectType: { type: String, default: "" },

    heroImage: { type: mediaSchema, default: () => ({}) },

    problem: {
      description: { type: String, default: "" },
      points: [pointSchema],
    },

    solution: {
      description: { type: String, default: "" },
      points: [pointSchema],
    },

    relatedSolutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Solution", default: null },

    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },

    seo: { type: seoSchema, default: () => ({}) },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

caseStudySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
