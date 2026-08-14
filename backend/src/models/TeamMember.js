const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "" },
    role: { type: String, default: "" },
    socialLinks: [
      {
        platform: { type: String, default: "linkedin" },
        url: { type: String, default: "" },
      },
    ],
    image: { type: String, default: "" },
    quote: { type: String, default: "" },
    quoteAuthor: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
