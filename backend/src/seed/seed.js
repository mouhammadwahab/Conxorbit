//db.json file
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { solutions, caseStudies, team, setAdmin, setPageContent, db } = require("../config/lowdb");

const ROOT = path.join(__dirname, "../../..");
const FRONTEND_ASSETS = path.join(ROOT, "frontend/src/assets");
const UPLOADS = path.join(__dirname, "../../uploads");

const IMAGE_FILES = {
  panelX: ["solutions/panel-x.jpg", "solutions/panel-x.jpg"],
  panelXHero: ["solutions/panel-x-hero.png", "solutions/panel-x-hero.png"],
  electraX: ["solutions/electra-x.jpg", "solutions/electra-x.jpg"],
  constructionInspection: [
    "solutions/construction-inspection.jpg",
    "solutions/construction-inspection.jpg",
  ],
  quoteAutomation: ["solutions/quote-automation.jpg", "solutions/quote-automation.jpg"],
  wasteOptimization: ["solutions/waste-optimization.jpg", "solutions/waste-optimization.jpg"],
  drawingIntelligence: [
    "solutions/drawing-intelligence.jpg",
    "solutions/drawing-intelligence.jpg",
  ],
  projectIntelligence: [
    "solutions/project-intelligence.jpg",
    "solutions/project-intelligence.jpg",
  ],
  permitAi: ["solutions/permit-ai.jpg", "solutions/permit-ai.jpg"],
  boqExtraction: ["solutions/boq-extraction.jpg", "solutions/boq-extraction.jpg"],
  clientPanelX: ["portfolio/client-panelx.png", "portfolio/client-panelx.png"],
  clientConfidential: [
    "portfolio/client-confidential.png",
    "portfolio/client-confidential.png",
  ],
  productElectraX: ["portfolio/product-electrax.png", "portfolio/product-electrax.png"],
  productInspection: ["portfolio/product-inspection.png", "portfolio/product-inspection.png"],
  workflowQuote: ["portfolio/workflow-quote.png", "portfolio/workflow-quote.png"],
  workflowDrawing: ["portfolio/workflow-drawing.png", "portfolio/workflow-drawing.png"],
  workflowWaste: ["portfolio/workflow-waste.png", "portfolio/workflow-waste.png"],
  workflowPermit: ["portfolio/workflow-permit.png", "portfolio/workflow-permit.png"],
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyAsset(relFrom, relTo) {
  const from = path.join(FRONTEND_ASSETS, relFrom);
  const to = path.join(UPLOADS, relTo);
  ensureDir(path.dirname(to));
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    return `/uploads/${relTo.replace(/\\/g, "/")}`;
  }
  console.warn("Missing asset:", from);
  return "";
}

function buildImageMap() {
  const map = {};
  Object.entries(IMAGE_FILES).forEach(([key, [from, to]]) => {
    map[key] = copyAsset(from, to);
  });
  return map;
}

function loadSolutionsFromFrontend(imageMap) {
  const file = path.join(ROOT, "frontend/src/content/solutionsContent.js");
  let code = fs.readFileSync(file, "utf8");
  code = code.replace(/^import\s+.+?;?\s*$/gm, "");
  code = code.replace(/export\s+const\s+/g, "const ");
  code = code.replace(/export\s+function\s+/g, "function ");

  Object.keys(imageMap)
    .sort((a, b) => b.length - a.length)
    .forEach((key) => {
      const url = JSON.stringify(imageMap[key] || "");
      code = code.replace(new RegExp(`\\b${key}\\b`, "g"), url);
    });

  code += "\n;return { solutions };";
  // eslint-disable-next-line no-new-func
  return new Function(code)().solutions;
}

const PORTFOLIO_META = {
  "panel-x": {
    portfolioCategory: "client_system",
    trades: ["facade"],
    caseStudySlug: "facade-panel-visibility",
    portfolioLabel: "CLIENT SYSTEM",
    portfolioBody:
      "A custom platform connecting drawings, panel tracking, documentation, and installation progress for façade operations.",
    sortOrder: 1,
    imageKey: "clientPanelX",
  },
  "electra-x": {
    portfolioCategory: "internal_product",
    trades: [],
    portfolioStatus: "In Development",
    portfolioLabel: "INTERNAL PRODUCT",
    sortOrder: 10,
    imageKey: "productElectraX",
  },
  "construction-inspection": {
    portfolioCategory: "internal_product",
    trades: ["construction"],
    portfolioStatus: "In Development",
    portfolioLabel: "INTERNAL PRODUCT",
    sortOrder: 11,
    imageKey: "productInspection",
  },
  "quote-automation": {
    portfolioCategory: "workflow_solution",
    trades: ["facade"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 20,
    imageKey: "workflowQuote",
  },
  "drawing-intelligence": {
    portfolioCategory: "workflow_solution",
    trades: ["facade"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 21,
    imageKey: "workflowDrawing",
  },
  "waste-optimization": {
    portfolioCategory: "workflow_solution",
    trades: ["construction"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 22,
    imageKey: "workflowWaste",
  },
  "permit-ai": {
    portfolioCategory: "workflow_solution",
    trades: ["construction"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 23,
    imageKey: "workflowPermit",
  },
  "project-intelligence": {
    portfolioCategory: "workflow_solution",
    trades: ["construction"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 24,
  },
  "boq-extraction": {
    portfolioCategory: "workflow_solution",
    trades: ["construction"],
    portfolioStatus: "Capability",
    portfolioLabel: "WORKFLOW SOLUTION",
    sortOrder: 25,
  },
};

const CASE_STUDIES = [
  {
    "slug": "facade-panel-visibility",
    "title": "PanelX",
    "category": "Client System",
    "shortDescription": "A web-based platform built to connect façade drawings, panel information, documentation and field reporting in one workflow.",
    "clientName": "",
    "industry": "Façade fabrication",
    "trade": "facade",
    "projectType": "Façade Intelligence Platform",
    "heroImageUrl": "",
    "heroImagePublicId": "",
    "problem": "Fragmented information was slowing down everyday workflows.\n\nProject drawings, panel information, documentation and field updates were handled across disconnected processes, making information harder to find and track.",
    "problemPoints": [
      { "title": "Manual panel tracking", "description": "" },
      { "title": "Disconnected project information", "description": "" },
      { "title": "Difficult access to field updates", "description": "" }
    ],
    "solution": "A connected platform for façade project information.\n\nConX Orbit built PanelX to bring drawings, panel tracking, documentation and field reporting into one digital workflow.",
    "solutionPoints": [
      { "title": "Drawing Navigation", "description": "Access project drawings digitally." },
      { "title": "Panel Tracking", "description": "Search and track panels by ID." },
      { "title": "Documentation", "description": "Keep project information organized." },
      { "title": "Field Reporting", "description": "Capture photos and updates from the field." }
    ],
    "mockupImageUrl": "",
    "mockupImagePublicId": "",
    "supportingImageUrl": "",
    "supportingImagePublicId": "",
    "relatedSolutionSlug": "panel-x",
    "featured": true,
    "published": true,
    "displayOrder": 1
  },
  {
    "slug": "drawing-review-flow",
    "title": "Drawing Review",
    "category": "Client System",
    "shortDescription": "A centralized drawing review workspace so comments, revisions, and the current set live in one place.",
    "clientName": "",
    "industry": "Façade engineering",
    "trade": "facade",
    "projectType": "Drawing Collaboration Platform",
    "heroImageUrl": "",
    "heroImagePublicId": "",
    "problem": "Drawing review was scattered across inboxes and versions.\n\nReview cycles lived in email. Markups got lost; newcomers couldn’t see why a detail changed.",
    "problemPoints": [
      { "title": "Comments trapped in email threads", "description": "" },
      { "title": "Unclear current drawing set", "description": "" },
      { "title": "Hard for new team members to catch up", "description": "" }
    ],
    "solution": "One place for drawings, comments, and the current set.\n\nA viewer-led workflow with comment threads tied to drawings, notification digests, and a clear current set for each package.",
    "solutionPoints": [
      { "title": "Drawing Viewer", "description": "Open and navigate the latest package." },
      { "title": "Comment Threads", "description": "Keep markups tied to the drawing." },
      { "title": "Current Set", "description": "Make the approved set obvious." },
      { "title": "Review Digests", "description": "Notify teams without inbox chase." }
    ],
    "mockupImageUrl": "",
    "mockupImagePublicId": "",
    "supportingImageUrl": "",
    "supportingImagePublicId": "",
    "relatedSolutionSlug": "drawing-intelligence",
    "featured": false,
    "published": true,
    "displayOrder": 2
  },
  {
    "slug": "field-reporting-lite",
    "title": "Field Reporting",
    "category": "Workflow Solution",
    "shortDescription": "A light mobile-friendly field log that cuts end-of-day admin without adding process weight.",
    "clientName": "",
    "industry": "Construction",
    "trade": "construction",
    "projectType": "Site Reporting That Gets Finished",
    "heroImageUrl": "",
    "heroImagePublicId": "",
    "problem": "Field reporting was too heavy to finish consistently.\n\nDaily reports were incomplete or late because forms felt like punishment after a long shift.",
    "problemPoints": [
      { "title": "Long forms after long days", "description": "" },
      { "title": "Incomplete end-of-day submissions", "description": "" },
      { "title": "Managers chasing missing updates", "description": "" }
    ],
    "solution": "Field reporting that people actually finish.\n\nA short guided form, photo attach, and auto summary for managers — designed with site supervisors, not for them.",
    "solutionPoints": [
      { "title": "Guided Form", "description": "Only the fields that matter on site." },
      { "title": "Photo Capture", "description": "Attach evidence without extra steps." },
      { "title": "Manager Summary", "description": "Skim mornings instead of chasing evenings." },
      { "title": "Light Process", "description": "Built to complete after a long shift." }
    ],
    "mockupImageUrl": "",
    "mockupImagePublicId": "",
    "supportingImageUrl": "",
    "supportingImagePublicId": "",
    "relatedSolutionSlug": "construction-inspection",
    "featured": false,
    "published": true,
    "displayOrder": 3
  }
];

function seedPageContent() {
  const solutionsListing = {
    meta: {
      title: "Solutions — ConX Orbit",
      description:
        "Explore platforms, AI systems, and workflow solutions engineered for façade and construction operations.",
    },
    hero: {
      badge: "Solutions",
      titleBefore: "Solutions Built Around Real ",
      titleHighlight: "Construction",
      titleAfter: " Workflows.",
      body: "Explore the platforms, AI systems, and workflow solutions we've engineered to solve practical challenges across façade and construction operations.",
    },
    filters: ["All", "AI", "Automation", "Web Platform", "Mobile", "Document Intelligence"],
    searchPlaceholder: "Search solutions...",
    cta: {
      badge: "DON'T SEE WHAT YOU NEED?",
      title: "Let's Build the Right Solution for Your Workflow",
      body: "Every construction business operates differently. Tell us about your workflows and we'll help you find—or build—the right system.",
      primary: { label: "Book a Discovery Call", href: "/book-discovery" },
    },
  };

  const portfolio = {
    meta: {
      title: "Portfolio — ConX Orbit",
      description:
        "Selected client systems, internal products, and workflow solutions built for real-world construction and façade operations.",
    },
    hero: {
      badge: "SELECTED WORK",
      titleBefore: "Technology Built for ",
      titleHighlight: "Real-World",
      titleAfter: " Operations.",
      body: "From façade management platforms to AI-powered workflow automation, our work brings together industry knowledge, intelligent technology, and practical software engineering to solve complex operational problems.",
      line: "Client systems · Internal products · Emerging solutions",
    },
    featuredSlug: "panel-x",
    featured: {
      badge: "FEATURED WORK",
      label: "CLIENT SYSTEM",
      name: "PanelX",
      title: "Connecting Façade Operations From Shop to Site.",
      body: "A custom platform connecting drawings, panel tracking, documentation, and installation progress for façade operations.",
      tags: ["Façade", "Panel Tracking", "Web Platform", "Workflow Management"],
      cta: { label: "Explore Case Study", href: "/case-studies/facade-panel-visibility" },
      image: "",
    },
    proof: {
      badge: "AT A GLANCE",
      items: [
        { value: "02", label: "Client Systems", hint: "Purpose-built platforms for live operations" },
        { value: "02", label: "Internal Products", hint: "Tools we're building for the industry" },
        { value: "04", label: "Workflow Capabilities", hint: "AI-assisted estimating to compliance" },
        { value: "06", label: "Industries", hint: "Deepest in the building envelope" },
      ],
    },
    clientSystems: {
      badge: "CLIENT SYSTEMS",
      title: "Built Around the Way Our Clients Work.",
      body: "We don't start with a template. We study the workflow, understand the operational problem, and engineer the system around it.",
    },
    internalProducts: {
      badge: "Our Products",
      title: "Products We’re Building for the Industry",
      body: "Alongside client work, we’re developing our own products around recurring challenges we see across construction and specialist trades — turning real industry problems into focused, scalable technology.",
    },
    workflowSolutions: {
      badge: "Workflow Solutions",
      title: "Intelligence Applied to Real Workflows",
      body: "A collection of AI-powered workflow demonstrations built around real construction challenges, showing how repetitive and complex processes can be made faster, smarter, and more connected.",
    },
    industries: {
      badge: "INDUSTRY EXPERIENCE",
      titleLine1: "Deepest in the Building Envelope.",
      titleLine2: "Open to the Wider Built Environment.",
      items: [
        { label: "Façade & Curtain Walls", core: true },
        { label: "Aluminium" },
        { label: "Construction" },
        { label: "Electrical" },
        { label: "Engineering" },
        { label: "Project Operations" },
      ],
    },
    cta: {
      badge: "HAVE A PROBLEM WORTH SOLVING?",
      title: "Let's Build the System Behind Your Next Workflow.",
      body: "If you're dealing with a process that is too manual, too fragmented, or difficult to scale, let's explore what a purpose-built system could look like.",
      primary: { label: "Book a Consultation", href: "/book-discovery" },
      secondary: { label: "Explore Solutions", href: "/solutions" },
    },
  };

  const facadeSolutions = {
    eyebrow: "Our Façade Solutions",
    title: "Purpose-Built Systems for Complex Façade Work.",
    body: "From drawing intelligence to field operations, our solutions are designed around specific points where façade teams lose time, information or accuracy.",
  };

  const constructionSolutions = {
    eyebrow: "Our Construction Solutions",
    title: "Purpose-Built Systems for Live Construction Work.",
    body: "From field capture to automation and project intelligence, these solutions address the points where construction teams lose time and clarity.",
  };

  const aboutTeam = {
    title: "Meet our team",
  };

  setPageContent("solutionsListing", solutionsListing);
  setPageContent("portfolio", portfolio);
  setPageContent("facadeSolutions", facadeSolutions);
  setPageContent("constructionSolutions", constructionSolutions);
  setPageContent("aboutTeam", aboutTeam);
}

async function seed() {
  ensureDir(UPLOADS);
  const imageMap = buildImageMap();
  const sourceSolutions = loadSolutionsFromFrontend(imageMap);

  solutions.clear();
  caseStudies.clear();
  team.clear();
  db.set("pageContent", {}).write();
  seedPageContent();

  sourceSolutions.forEach((item, index) => {
    const meta = PORTFOLIO_META[item.slug] || {};
    const portfolioImage = meta.imageKey ? imageMap[meta.imageKey] : "";
    const detail = { ...(item.detail || {}) };
    solutions.insert({
      slug: item.slug,
      name: item.name,
      description: item.description,
      listingBadge: item.badge || "",
      categories: item.categories || [],
      image: item.image || "",
      portfolioImage: portfolioImage || "",
      portfolioCategory: meta.portfolioCategory || "none",
      trades: meta.trades || [],
      sortOrder: meta.sortOrder != null ? meta.sortOrder : index + 1,
      published: true,
      showOnListing: true,
      confidential: false,
      confidentialLabel: "",
      caseStudySlug: meta.caseStudySlug || "",
      portfolioStatus: meta.portfolioStatus || "",
      portfolioLabel: meta.portfolioLabel || "",
      portfolioBody: meta.portfolioBody || item.description || "",
      seo: { title: "", description: "", ogImage: "" },
      detail,
    });
  });

  solutions.insert({
    slug: "confidential-facade-platform",
    name: "Custom Façade Engineering Platform",
    description:
      "A purpose-built system supporting façade engineering and fabrication workflows, from component data through to production and site coordination.",
    listingBadge: "Client System",
    categories: ["Façade", "Engineering", "Fabrication", "Data Systems"],
    image: imageMap.clientConfidential || "",
    portfolioImage: imageMap.clientConfidential || "",
    portfolioCategory: "client_system",
    trades: [],
    sortOrder: 2,
    published: true,
    showOnListing: false,
    confidential: true,
    confidentialLabel: "CLIENT PROJECT — CONFIDENTIAL",
    caseStudySlug: "drawing-review-flow",
    portfolioLabel: "CLIENT SYSTEM",
    portfolioBody:
      "A purpose-built system supporting façade engineering and fabrication workflows, from component data through to production and site coordination.",
    seo: { title: "", description: "", ogImage: "" },
    detail: {},
  });

  CASE_STUDIES.forEach((item) => {
    const { relatedSolutionSlug, ...rest } = item;
    const related = relatedSolutionSlug
      ? solutions.findOne({ slug: relatedSolutionSlug })
      : null;
    caseStudies.insert({
      ...rest,
      relatedSolutionId: related ? related._id : "",
    });
  });

  const linkedin = "https://www.linkedin.com/company/conx-orbit";
  team.insert({
    name: "Ghulam Murtaza",
    designation: "Founder",
    role: "Founder | CEO",
    socialLinks: [{ platform: "linkedin", url: linkedin }],
    quote: "Well done is better than well said — especially on a live project.",
    quoteAuthor: "ConX Orbit",
    sortOrder: 1,
    published: true,
    image: "",
  });
  team.insert({
    name: "Mustafa",
    designation: "Co-Founder",
    role: "Co-Founder | Ops & Technical Lead",
    socialLinks: [{ platform: "linkedin", url: linkedin }],
    quote: "Great systems are created by people free to solve the real problem.",
    quoteAuthor: "ConX Orbit",
    sortOrder: 2,
    published: true,
    image: "",
  });
  team.insert({
    name: "Development team",
    designation: "Engineering",
    role: "Engineering & Design",
    socialLinks: [],
    quote: "Our purpose is to help teams work with less friction and more focus.",
    quoteAuthor: "ConX Orbit",
    sortOrder: 3,
    published: true,
    image: "",
  });

  const email = (process.env.ADMIN_EMAIL || "admin@conxorbit.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);
  setAdmin({ email, passwordHash });

  console.log(
    `Seeded ${solutions.all().length} solutions, ${caseStudies.all().length} case studies, ${team.all().length} team members, pageContent keys.`
  );
  console.log(`Admin login: ${email} / ${password}`);
  console.log("Warning: seed wipes existing backend/data/db.json content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
