const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const ctaSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    badge: { type: String, default: "" },
    description: { type: String, default: "" },

    image: { type: mediaSchema, default: () => ({}) },

    cta: { type: ctaSchema, default: () => ({}) },

    active: { type: Boolean, default: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    sortOrder: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

offerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Offer", offerSchema);
