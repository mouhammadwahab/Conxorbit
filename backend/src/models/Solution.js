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

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

const ctaSchema = new mongoose.Schema(
  {
    badge: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    primary: {
      label: { type: String, default: "" },
      href: { type: String, default: "" },
    },
    secondary: {
      label: { type: String, default: "" },
      href: { type: String, default: "" },
    },
  },
  { _id: false }
);

const solutionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: "" },

    category: {
      type: String,
      enum: ["client-system", "internal-product", "workflow-solution", "other"],
      default: "other",
    },
    tags: [{ type: String, trim: true }],
    trades: [{ type: String, trim: true }],

    listingBadge: { type: String, default: "" },

    hero: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },

    description: { type: String, default: "" },
    features: [{ type: String }],
    capabilities: [{ type: String }],
    audiences: [{ type: String }],
    technologies: [{ type: String }],

    mockup: { type: mediaSchema, default: () => ({}) },

    demo: {
  videoUrl: { type: String, default: "" },
  publicId: { type: String, default: "" },
},

    faq: [faqItemSchema],

    relatedSolutionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
    relatedCaseStudyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "CaseStudy" }],

    cta: { type: ctaSchema, default: () => ({}) },

    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    showOnListing: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },

    seo: { type: seoSchema, default: () => ({}) },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

solutionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Solution", solutionSchema);
