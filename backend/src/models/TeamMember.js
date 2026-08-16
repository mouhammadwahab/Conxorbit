const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, default: "linkedin" },
    url: { type: String, default: "" },
  },
  { _id: false }
);

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    role: { type: String, default: "" },
    bio: { type: String, default: "" },

    image: { type: mediaSchema, default: () => ({}) },

    socialLinks: [socialLinkSchema],

    quote: { type: String, default: "" },

    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

teamMemberSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
