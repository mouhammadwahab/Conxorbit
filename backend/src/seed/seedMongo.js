require("dotenv").config();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { connectDB } = require("../config/db");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { CLOUDINARY_FOLDERS } = require("../config/folders");
const Admin = require("../models/Admin");
const Solution = require("../models/Solution");
const CaseStudy = require("../models/CaseStudy");
const TeamMember = require("../models/TeamMember");
const Offer = require("../models/Offer");

const ASSETS = path.join(__dirname, "../../../frontend/src/assets/solutions");

async function uploadLocalImage(filename, folder) {
  const filePath = path.join(ASSETS, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed asset missing: ${filePath}`);
  }
  const buffer = fs.readFileSync(filePath);
  const result = await uploadToCloudinary(buffer, {
    folder,
    resourceType: "image",
    timeoutMs: 90000,
  });
  return { url: result.secure_url, publicId: result.public_id };
}

async function seed() {
  const ok = await connectDB();
  if (!ok) {
    console.error("MongoDB not connected. Check MONGODB_URI.");
    process.exit(1);
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    console.error("Cloudinary env vars missing. Cannot upload seed media.");
    process.exit(1);
  }

  console.log("Uploading seed images to Cloudinary…");
  const panelMockup = await uploadLocalImage("panel-x.jpg", CLOUDINARY_FOLDERS.solutions);
  const drawingMockup = await uploadLocalImage(
    "drawing-intelligence.jpg",
    CLOUDINARY_FOLDERS.solutions
  );
  const boqMockup = await uploadLocalImage("boq-extraction.jpg", CLOUDINARY_FOLDERS.solutions);
  const caseHero1 = await uploadLocalImage("panel-x-hero.png", CLOUDINARY_FOLDERS.caseStudies);
  const caseHero2 = await uploadLocalImage(
    "drawing-intelligence.jpg",
    CLOUDINARY_FOLDERS.caseStudies
  );
  const teamPhoto1 = await uploadLocalImage("electra-x.jpg", CLOUDINARY_FOLDERS.team);
  const teamPhoto2 = await uploadLocalImage(
    "construction-inspection.jpg",
    CLOUDINARY_FOLDERS.team
  );
  console.log("Cloudinary uploads complete.");

  const email = (process.env.ADMIN_EMAIL || "admin@conxorbit.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await Admin.deleteMany({});
  await Admin.create({ email, passwordHash });
  console.log(`Admin: ${email} / ${password}`);

  await Solution.deleteMany({});
  const solutions = await Solution.insertMany([
    {
      slug: "panel-x",
      name: "PanelX",
      shortDescription:
        "Panel lifecycle tracking for façade fabricators — from shop floor to site install.",
      category: "client-system",
      tags: ["Façade", "Panel Tracking", "Web Platform"],
      trades: ["facade"],
      listingBadge: "Client system",
      hero: {
        title: "Panel lifecycle, one system",
        description:
          "Replace scattered spreadsheets with a single source of truth for panel status.",
      },
      description:
        "PanelX gives fabricators and site teams a shared view of panel status, zones, and handoffs.",
      features: ["Status by zone", "Role-based views", "Existing ID import"],
      capabilities: ["Shop floor updates", "Logistics handoff", "Site install tracking"],
      audiences: ["Façade fabricators", "Project managers", "Site supervisors"],
      technologies: ["Web app", "API integrations"],
      mockup: panelMockup,
      demo: { videoUrl: "", publicId: "" },
      faq: [
        {
          question: "Does PanelX replace our ERP?",
          answer: "No — it complements ERP with operational panel status for shop and site.",
        },
      ],
      cta: {
        title: "Could PanelX fit your workflow?",
        body: "Book a discovery call to walk through a typical panel lifecycle.",
        primary: { label: "Book a Discovery Call", href: "/book-discovery" },
        secondary: { label: "Explore Solutions", href: "/solutions" },
      },
      published: true,
      featured: true,
      showOnListing: true,
      sortOrder: 1,
      seo: {
        title: "PanelX — Panel Tracking for Façade Teams",
        description: "Custom panel lifecycle software for façade fabricators.",
      },
    },
    {
      slug: "drawing-intelligence",
      name: "Drawing Intelligence",
      shortDescription:
        "AI-assisted drawing review that keeps comments on the design record — not in email.",
      category: "workflow-solution",
      tags: ["AI", "Drawings", "Document Intelligence"],
      trades: ["facade", "construction"],
      listingBadge: "Workflow Solutions",
      hero: {
        title: "Drawings with context",
        description: "Capture markups and decisions where the drawing lives.",
      },
      description: "Reduce lost comments and review cycles with structured drawing intelligence.",
      features: ["Markup history", "Version awareness", "Searchable comments"],
      capabilities: ["Review workflows", "Issue clustering", "Handoff summaries"],
      audiences: ["Design leads", "QA reviewers", "Project engineers"],
      technologies: ["AI", "Document pipelines"],
      mockup: drawingMockup,
      demo: { videoUrl: "", publicId: "" },
      faq: [],
      cta: {
        primary: { label: "Book a Discovery Call", href: "/book-discovery" },
        secondary: { label: "Explore Solutions", href: "/solutions" },
      },
      published: true,
      featured: true,
      showOnListing: true,
      sortOrder: 2,
      seo: {
        title: "Drawing Intelligence",
        description: "AI-assisted drawing review for construction teams.",
      },
    },
    {
      slug: "boq-extraction",
      name: "BOQ Extraction",
      shortDescription:
        "Extract structured quantities from project documents into a clean BOQ.",
      category: "workflow-solution",
      tags: ["AI", "BOQ", "Document Intelligence"],
      trades: ["construction"],
      listingBadge: "Workflow Solutions",
      hero: {
        title: "From documents to quantities",
        description: "Turn messy project packs into structured BOQ lines.",
      },
      description: "Automate first-pass quantity takeoff from PDFs and drawings.",
      features: ["Document ingest", "Structured export", "Review queue"],
      capabilities: ["PDF parsing", "Quantity tables", "Export to spreadsheet"],
      audiences: ["Estimators", "Quantity surveyors"],
      technologies: ["AI", "OCR"],
      mockup: boqMockup,
      demo: { videoUrl: "", publicId: "" },
      faq: [],
      published: true,
      featured: false,
      showOnListing: true,
      sortOrder: 3,
      seo: { title: "BOQ Extraction", description: "AI BOQ extraction for construction." },
    },
  ]);
  console.log(`Seeded ${solutions.length} solutions`);

  await CaseStudy.deleteMany({});
  const cases = await CaseStudy.insertMany([
    {
      title: "Panel tracking for a façade fabricator",
      slug: "panel-tracking-facade",
      category: "Client System",
      shortDescription: "How a fabricator replaced email status updates with PanelX.",
      clientName: "Confidential fabricator",
      industry: "Façade",
      trade: "facade",
      projectType: "Panel lifecycle system",
      heroImage: caseHero1,
      problem: {
        description:
          "Status lived in spreadsheets and WhatsApp. Site teams never trusted the latest version.",
        points: [
          {
            title: "Scattered status",
            description: "Shop, logistics, and site each kept their own list.",
          },
          { title: "Lost handoffs", description: "Install blockers surfaced late on site." },
        ],
      },
      solution: {
        description: "A shared PanelX board with roles for shop, logistics, and site.",
        points: [
          { title: "One status model", description: "Every panel moves through the same stages." },
          { title: "Role views", description: "Each team sees what they need — nothing extra." },
        ],
      },
      relatedSolutionId: solutions[0]._id,
      featured: true,
      published: true,
      sortOrder: 1,
      seo: {
        title: "Panel tracking case study",
        description: "Façade fabricator panel tracking.",
      },
    },
    {
      title: "Drawing review without email threads",
      slug: "drawing-review-without-email",
      category: "Workflow Solutions",
      shortDescription: "Moving markups onto the drawing record.",
      clientName: "Mid-size contractor",
      industry: "Construction",
      trade: "construction",
      projectType: "Drawing intelligence",
      heroImage: caseHero2,
      problem: {
        description: "Review comments were trapped in inboxes and never reconciled.",
        points: [
          {
            title: "Email as the system of record",
            description: "New hires could not see why a detail changed.",
          },
        ],
      },
      solution: {
        description: "Drawing Intelligence kept markups and decisions on the design record.",
        points: [
          { title: "Threaded on the sheet", description: "Comments stay with the revision." },
        ],
      },
      relatedSolutionId: solutions[1]._id,
      featured: true,
      published: true,
      sortOrder: 2,
      seo: { title: "Drawing review case study", description: "Structured drawing review." },
    },
  ]);
  console.log(`Seeded ${cases.length} case studies`);

  await TeamMember.deleteMany({});
  const team = await TeamMember.insertMany([
    {
      name: "Amina Khan",
      designation: "Founder",
      role: "Product & Delivery",
      bio: "Builds workflow software with façade and construction teams.",
      image: teamPhoto1,
      socialLinks: [{ platform: "linkedin", url: "https://www.linkedin.com/company/conxorbit" }],
      quote: "Software should match how the yard and site already work.",
      sortOrder: 1,
      published: true,
    },
    {
      name: "Omar Rizvi",
      designation: "Engineering Lead",
      role: "Platform",
      bio: "Owns integrations, reliability, and delivery pipelines.",
      image: teamPhoto2,
      socialLinks: [{ platform: "linkedin", url: "https://www.linkedin.com/company/conxorbit" }],
      quote: "Clear systems beat clever demos.",
      sortOrder: 2,
      published: true,
    },
  ]);
  console.log(`Seeded ${team.length} team members`);

  await Offer.deleteMany({});
  await Offer.create({
    title: "Discovery month",
    badge: "Limited",
    description: "Book a workflow discovery call this month.",
    image: { url: "", publicId: "" },
    cta: { label: "Book a Discovery Call", href: "/book-discovery" },
    active: true,
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-12-31"),
    sortOrder: 1,
  });
  console.log("Seeded 1 offer (no image — optional)");

  console.log("Mongo seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
