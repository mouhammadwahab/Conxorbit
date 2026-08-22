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
    ogImage: {
      type: mediaSchema,
      default: () => ({}),
    },
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
    title: { type: String, default: "" },
    body: { type: String, default: "" },
  },
  { _id: false }
);

const solutionSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "client-system",
        "internal-product",
        "workflow-solution",
        "other"
      ],
      default: "other",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    trades: [
      {
        type: String,
        enum: ["facade", "construction"],
        trim: true,
        lowercase: true,
      },
    ],

    hero: {
      titleBefore: {
        type: String,
        default: "",
      },

      titleHighlight: {
        type: String,
        default: "",
      },

      titleAfter: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      mockup: {
        type: mediaSchema,
        default: () => ({}),
      },
    },

    snapshot: {
      bestFor: {
        type: String,
        default: "",
      },

      coreFunction: {
        type: String,
        default: "",
      },

      platform: {
        type: String,
        default: "",
      },

      workflow: {
        type: String,
        default: "",
      },
    },

    challenge: {
      title: {
        type: String,
        default: "",
      },

      body: {
        type: String,
        default: "",
      },

      cards: [
        {
          title: {
            type: String,
            default: "",
          },

          body: {
            type: String,
            default: "",
          },
        },
      ],
    },

    capabilities: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      cards: [
        {
          icon: {
            type: String,
            default: "",
          },

          title: {
            type: String,
            default: "",
          },

          body: {
            type: String,
            default: "",
          },
        },
      ],
    },

    howItWorks: {
      title: {
        type: String,
        default: "",
      },

      steps: [
        {
          title: {
            type: String,
            default: "",
          },

          description: {
            type: String,
            default: "",
          },
        },
      ],
    },



    builtFor: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      audiences: [
        {
          title: {
            type: String,
            default: "",
          },

          body: {
            type: String,
            default: "",
          },
        },
      ],
    },

    demo: {
      video: {
        type: mediaSchema,
        default: () => ({}),
      },
    },


    relatedSolutionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],


    faq: {
      type: [faqItemSchema],
      default: [],
    },


    cta: {
      type: ctaSchema,
      default: () => ({}),
    },



    published: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    showOnListing: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },


    seo: {
      type: seoSchema,
      default: () => ({}),
    },
  },

  {
    timestamps: true,
  }
);



solutionSchema.index({
  published: 1,
  showOnListing: 1,
  sortOrder: 1,
});

solutionSchema.index({
  category: 1,
});

solutionSchema.index({
  trades: 1,
});

solutionSchema.index({
  tags: 1,
});


module.exports = mongoose.model("Solution", solutionSchema);