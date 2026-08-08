import panelX from "../assets/solutions/panel-x.jpg";
import electraX from "../assets/solutions/electra-x.jpg";
import constructionInspection from "../assets/solutions/construction-inspection.jpg";
import quoteAutomation from "../assets/solutions/quote-automation.jpg";
import wasteOptimization from "../assets/solutions/waste-optimization.jpg";
import drawingIntelligence from "../assets/solutions/drawing-intelligence.jpg";
import projectIntelligence from "../assets/solutions/project-intelligence.jpg";
import permitAi from "../assets/solutions/permit-ai.jpg";
import boqExtraction from "../assets/solutions/boq-extraction.jpg";

export const solutionsListing = {
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
  filters: [
    "All",
    "AI",
    "Automation",
    "Web Platform",
    "Mobile",
    "Document Intelligence",
  ],
  searchPlaceholder: "Search solutions...",
  cta: {
    badge: "DON'T SEE WHAT YOU NEED?",
    title: "Let's Build the Right Solution for Your Workflow",
    body: "Every construction business operates differently. Tell us about your workflows and we'll help you find—or build—the right system.",
    primary: { label: "Book a Discovery Call", href: "/book-discovery" },
  },
};

const sharedDetailCta = {
  badge: "EXPLORE WHAT'S POSSIBLE",
  title: "Could a System Like This Work for Your Workflow?",
  body: "Tell us how your team works today. We'll explore the challenges you're facing and discuss what a tailored solution could look like for your business.",
  primary: { label: "Book a Consultation", href: "/book-discovery" },
  secondary: { label: "Explore Solutions", href: "/solutions" },
};

function makeFaq(name) {
  return {
    badge: "FAQ",
    titleBefore: "About ",
    titleHighlight: name,
    titleAfter: "",
    items: [
      {
        question: `Who is ${name} designed for?`,
        answer: `${name} is built for the teams who plan, produce, and deliver on live construction and façade projects—not just office reporting.`,
      },
      {
        question: `Can ${name} work with existing drawings and project documents?`,
        answer:
          "Yes. We design around your current files, folders, and handoffs so adoption starts from what you already use.",
      },
      {
        question: "Can the platform be customized around our workflow?",
        answer:
          "Yes. ConX Orbit builds around your process—roles, statuses, and approvals—rather than forcing a generic template.",
      },
      {
        question: `Can ${name} integrate with existing systems?`,
        answer:
          "Where it creates value, we connect to the tools your teams already rely on so data does not live in another silo.",
      },
      {
        question: `Is ${name} available as an off-the-shelf product?`,
        answer:
          "Some capabilities are productized; others are delivered as tailored systems. We clarify the best path in a discovery call.",
      },
      {
        question: "Can ConX Orbit build a similar platform for our business?",
        answer:
          "Yes. If your workflow needs a different shape, we design and build a system around the way your teams actually work.",
      },
    ],
  };
}

const panelXDetail = {
  titleBefore: "Connected Façade Operations From ",
  titleHighlight: "Shop to Site.",
  titleAfter: "",
  body: "PanelX is a custom-built façade management platform that keeps drawings, panels, documents, and site progress connected in one operational record.",
  primaryCta: { label: "Book a Consultation", href: "/book-discovery" },
  demoCta: { label: "Watch Demo", targetId: "demo" },
  stats: {
    bestFor: "Façade Contractors",
    coreFunction: "Panel & Drawing Management",
    platform: "Web Platform",
  },
  challenge: {
    badge: "THE CHALLENGE",
    title: "Disconnected Workflows Slow Down Every Project.",
    body: "Façade teams often work across drawings, spreadsheets, documents, site photos, and disconnected project tools. Panel information becomes difficult to track, updates are scattered, and site visibility suffers.",
    problems: [
      {
        title: "Manual Panel Tracking",
        body: "Panel status lives in spreadsheets that are updated by hand, days after the work happens.",
      },
      {
        title: "Disconnected Drawings",
        body: "Elevations, shop drawings, and revisions sit in folders far away from the panels they describe.",
      },
      {
        title: "Scattered Documentation",
        body: "RFIs, reports, and approvals are spread across email threads and shared drives.",
      },
      {
        title: "Limited Site Visibility",
        body: "Engineering rarely sees the real state of installation until someone walks the floor.",
      },
    ],
  },
  capabilities: {
    badge: "CAPABILITIES",
    title: "Everything Needed to Manage Façade Operations.",
    body: "PanelX brings the information teams need into one connected operational environment.",
    cards: [
      { icon: "layers", title: "Drawing Viewer", body: "Open and navigate drawings directly inside the platform." },
      { icon: "grid", title: "Panel Tracking", body: "Track every panel through fabrication and installation." },
      { icon: "docs", title: "Document Management", body: "Keep RFIs, reports and technical documents connected—at one place." },
      { icon: "camera", title: "Site Documentation", body: "Capture progress with linked photos and reports." },
      { icon: "search", title: "Search & Filtering", body: "Locate any panel or drawing instantly." },
      { icon: "pulse", title: "Installation Monitoring", body: "View live installation progress across projects." },
    ],
  },
  howItWorks: {
    badge: "HOW IT WORKS",
    title: "From Drawing to Installation.",
    stagesLabel: "FIVE STAGES · ONE RECORD",
    stages: [
      { title: "Upload Drawings", body: "Elevations and shop drawings are brought into the workspace." },
      { title: "Organize Project Data", body: "Zones, levels, and panel types are structured against the project." },
      { title: "Track Panels", body: "Each panel carries a live record through fabrication." },
      { title: "Document Site Progress", body: "Site teams log field information against the same records." },
      { title: "Monitor Installation", body: "Progress is read directly off the envelope, zone by zone." },
    ],
  },
  builtFor: {
    badge: "BUILT FOR",
    title: "Built for the Teams Running the Façade, Floor to Field.",
    body: "PanelX is used by the people who plan, fabricate, and install—not just the ones managing from a spreadsheet.",
    audiences: [
      { icon: "engineering", title: "Engineering Teams", body: "Track drawing revisions as they move, without chasing who has the current version." },
      { icon: "production", title: "Production Teams", body: "See fabrication status update in real time, without an extra call to check progress." },
      { icon: "site", title: "Site & Installation", body: "Log photos and progress from the site itself—no re-entry back at the office." },
      { icon: "pm", title: "Project Managers", body: "Get one shared view across drawings, production, and site status—not five separate ones." },
    ],
  },
  demo: {
    title: "See it in Action",
    videoSrc: "/videos/hero-bg.mp4",
    posterSrc: "/videos/hero-poster.jpg",
  },
  more: {
    badge: "EXPLORE MORE",
    title: "More Solutions From ConX Orbit.",
    slugs: ["construction-inspection", "quote-automation", "drawing-intelligence"],
  },
  faq: makeFaq("PanelX"),
  cta: sharedDetailCta,
};

function adaptDetail({
  name,
  title,
  body,
  stats,
  challengeTitle,
  challengeBody,
  problems,
  capabilitiesTitle,
  capabilitiesBody,
  capabilityCards,
  howTitle,
  stages,
  builtTitle,
  builtBody,
  audiences,
  moreSlugs,
  poster,
}) {
  return {
    title,
    body,
    primaryCta: { label: "Book a Consultation", href: "/book-discovery" },
    demoCta: { label: "Watch Demo", targetId: "demo" },
    stats,
    challenge: {
      badge: "THE CHALLENGE",
      title: challengeTitle,
      body: challengeBody,
      problems,
    },
    capabilities: {
      badge: "CAPABILITIES",
      title: capabilitiesTitle,
      body: capabilitiesBody,
      cards: capabilityCards,
    },
    howItWorks: {
      badge: "HOW IT WORKS",
      title: howTitle,
      stagesLabel: `${stages.length} STAGES · ONE WORKFLOW`,
      stages,
    },
    builtFor: {
      badge: "BUILT FOR",
      title: builtTitle,
      body: builtBody,
      audiences,
    },
    demo: {
      title: "See it in Action",
      videoSrc: "/videos/hero-bg.mp4",
      posterSrc: poster || "/videos/hero-poster.jpg",
    },
    more: {
      badge: "EXPLORE MORE",
      title: "More Solutions From ConX Orbit.",
      slugs: moreSlugs,
    },
    faq: makeFaq(name),
    cta: sharedDetailCta,
  };
}

export const solutions = [
  {
    slug: "panel-x",
    badge: "Client System",
    name: "PanelX",
    description:
      "Panel lifecycle visibility across shop, logistics, and site—so everyone works from one agreed status.",
    categories: ["Façade", "Panel Tracking", "Documents", "Web Platform"],
    image: panelX,
    detail: panelXDetail,
  },
  {
    slug: "electra-x",
    badge: "Internal Product",
    name: "ElectraX",
    description:
      "Electrical design and validation workflows that catch conflicts before they reach the field.",
    categories: ["Electrical", "Design", "Validation", "AI"],
    image: electraX,
    detail: adaptDetail({
      name: "ElectraX",
      title: "Validate electrical design before it hits the site",
      body: "ElectraX helps engineering teams check layouts, catch coordination issues early, and keep validation evidence tied to the live design set.",
      stats: { bestFor: "Electrical Design Teams", coreFunction: "Design Validation", platform: "Web Platform" },
      challengeTitle: "Coordination Gaps Reach Site Too Late.",
      challengeBody: "Electrical packages move through multiple tools and reviewers. Conflicts surface late, evidence is hard to find, and site teams inherit unresolved design risk.",
      problems: [
        { title: "Late Clash Discovery", body: "Conflicts show up after drawings leave the office." },
        { title: "Fragmented Reviews", body: "Comments live in email instead of the design record." },
        { title: "Weak Traceability", body: "Validation evidence is hard to reconstruct later." },
        { title: "Site Surprises", body: "Install teams discover issues that design already could have caught." },
      ],
      capabilitiesTitle: "Everything Needed to Validate Electrical Design.",
      capabilitiesBody: "ElectraX keeps checks, evidence, and design context in one workflow.",
      capabilityCards: [
        { icon: "layers", title: "Layout Review", body: "Inspect layouts against coordination rules." },
        { icon: "search", title: "Conflict Detection", body: "Surface clashes before fabrication and install." },
        { icon: "docs", title: "Evidence Capture", body: "Keep validation notes tied to the live set." },
        { icon: "grid", title: "Issue Tracking", body: "Assign and close design issues with clear owners." },
        { icon: "pulse", title: "Status Monitoring", body: "See package readiness at a glance." },
        { icon: "camera", title: "Field Feedback", body: "Fold site findings back into the design loop." },
      ],
      howTitle: "From Design Input to Validated Package.",
      stages: [
        { title: "Import Design Sets", body: "Bring electrical packages into the workspace." },
        { title: "Run Checks", body: "Apply validation rules across the coordinated model." },
        { title: "Triage Issues", body: "Prioritize conflicts for engineering review." },
        { title: "Resolve & Record", body: "Close issues with evidence attached." },
        { title: "Release Package", body: "Hand over a validated set for site delivery." },
      ],
      builtTitle: "Built for Teams Who Cannot Afford Late Surprises.",
      builtBody: "ElectraX supports the people who design, coordinate, and deliver electrical packages.",
      audiences: [
        { icon: "engineering", title: "Design Engineers", body: "Validate layouts before they leave the desk." },
        { icon: "pm", title: "Coordination Leads", body: "Keep clash resolution visible across disciplines." },
        { icon: "production", title: "Package Managers", body: "Track readiness without spreadsheet chase." },
        { icon: "site", title: "Site Teams", body: "Install from cleaner, better-checked information." },
      ],
      moreSlugs: ["panel-x", "drawing-intelligence", "project-intelligence"],
      poster: electraX,
    }),
  },
  {
    slug: "construction-inspection",
    badge: "Internal Product",
    name: "Construction Inspection",
    description:
      "Field inspection capture with AI-assisted checks that keep quality evidence tied to the project record.",
    categories: ["AI", "Inspection", "Quality", "Mobile"],
    image: constructionInspection,
    detail: adaptDetail({
      name: "Construction Inspection",
      title: "Turn site inspections into structured, shareable evidence",
      body: "Capture checks on mobile, flag issues with visual AI support, and sync results back to office workflows without end-of-day admin pile-ups.",
      stats: { bestFor: "Quality & Site Teams", coreFunction: "Field Inspection", platform: "Mobile + Web" },
      challengeTitle: "Inspection Evidence Gets Lost Between Site and Office.",
      challengeBody: "Checks live in notebooks, chats, and camera rolls. Defects are hard to track, and close-out becomes a scramble.",
      problems: [
        { title: "Paper Trails", body: "Inspection notes never make it into the project system." },
        { title: "Photo Chaos", body: "Images lack context about location, element, or defect type." },
        { title: "Slow Close-Out", body: "Open issues linger without clear owners or status." },
        { title: "Weak Audit Trail", body: "Proving what was checked—and when—takes hours." },
      ],
      capabilitiesTitle: "Everything Needed for Structured Site Inspection.",
      capabilitiesBody: "Capture, classify, and close inspections against the live project record.",
      capabilityCards: [
        { icon: "camera", title: "Mobile Capture", body: "Log checks and photos from the field." },
        { icon: "search", title: "AI Assist", body: "Flag likely defects with visual support." },
        { icon: "docs", title: "Evidence Packs", body: "Keep photos and notes tied to each check." },
        { icon: "grid", title: "Issue Register", body: "Track defects through resolution." },
        { icon: "pulse", title: "Progress Views", body: "See inspection coverage by zone or package." },
        { icon: "layers", title: "Office Sync", body: "Push results into shared project workflows." },
      ],
      howTitle: "From Field Check to Closed Issue.",
      stages: [
        { title: "Capture on Site", body: "Run inspection checklists from mobile." },
        { title: "Attach Evidence", body: "Link photos and notes to each item." },
        { title: "Flag Defects", body: "Raise issues with owners and priority." },
        { title: "Resolve & Verify", body: "Close defects with follow-up proof." },
        { title: "Report Out", body: "Share structured status with the project team." },
      ],
      builtTitle: "Built for Quality From Floor to Desk.",
      builtBody: "Construction Inspection connects site capture with office close-out.",
      audiences: [
        { icon: "site", title: "Inspectors", body: "Capture checks without end-of-day rewrite." },
        { icon: "pm", title: "Quality Managers", body: "See open defects and coverage clearly." },
        { icon: "engineering", title: "Engineers", body: "Review field findings against the design intent." },
        { icon: "production", title: "Package Leads", body: "Drive close-out before handover pressure hits." },
      ],
      moreSlugs: ["panel-x", "permit-ai", "project-intelligence"],
      poster: constructionInspection,
    }),
  },
  {
    slug: "quote-automation",
    badge: "Capability Showcase",
    name: "Quote Automation",
    description:
      "Turn specs and drawings into structured quotations in a fraction of the usual estimating time.",
    categories: ["AI", "Estimation", "Automation"],
    image: quoteAutomation,
    detail: adaptDetail({
      name: "Quote Automation",
      title: "Cut estimating hours without cutting accuracy",
      body: "Quote Automation reads project inputs, structures line items, and gives estimators a clear draft to refine—so proposals move faster with fewer re-entry errors.",
      stats: { bestFor: "Estimating Teams", coreFunction: "Quote Generation", platform: "Web Platform" },
      challengeTitle: "Estimating Burns Hours on Re-Entry and Rework.",
      challengeBody: "Specs, drawings, and historical rates live in different places. Building a quote means copying, checking, and re-checking under deadline pressure.",
      problems: [
        { title: "Manual Line Building", body: "Estimators retype quantities and descriptions by hand." },
        { title: "Inconsistent Structure", body: "Every quote looks different across people and packages." },
        { title: "Slow Revisions", body: "Scope changes force full rework instead of targeted updates." },
        { title: "Error Risk", body: "Missed items and typos slip into client-facing proposals." },
      ],
      capabilitiesTitle: "Everything Needed to Draft Quotes Faster.",
      capabilitiesBody: "From inputs to a reviewable quotation draft in one flow.",
      capabilityCards: [
        { icon: "docs", title: "Input Ingest", body: "Pull from specs, BOQs, and drawing notes." },
        { icon: "grid", title: "Line Structuring", body: "Organize items into a consistent quote layout." },
        { icon: "search", title: "Rate Assist", body: "Suggest rates from prior packages where useful." },
        { icon: "layers", title: "Draft Review", body: "Give estimators a clear editable starting point." },
        { icon: "pulse", title: "Revision Diffs", body: "Update quotes when scope changes, not rebuild them." },
        { icon: "camera", title: "Export Ready", body: "Share polished outputs with commercial teams." },
      ],
      howTitle: "From Project Inputs to Quote Draft.",
      stages: [
        { title: "Gather Inputs", body: "Collect specs, quantities, and package notes." },
        { title: "Structure Items", body: "Generate a consistent line-item draft." },
        { title: "Apply Rates", body: "Attach pricing suggestions for review." },
        { title: "Estimator Refine", body: "Adjust scope, rates, and exclusions." },
        { title: "Issue Proposal", body: "Export a client-ready quotation." },
      ],
      builtTitle: "Built for Estimators Under Time Pressure.",
      builtBody: "Quote Automation protects accuracy while removing repetitive drafting work.",
      audiences: [
        { icon: "pm", title: "Estimators", body: "Start from structure instead of a blank sheet." },
        { icon: "production", title: "Commercial Teams", body: "Keep quote formats consistent across bids." },
        { icon: "engineering", title: "Technical Reviewers", body: "Check scope coverage before issue." },
        { icon: "site", title: "Delivery Leads", body: "Inherit clearer priced packages after award." },
      ],
      moreSlugs: ["boq-extraction", "drawing-intelligence", "waste-optimization"],
      poster: quoteAutomation,
    }),
  },
  {
    slug: "waste-optimization",
    badge: "Internal Product",
    name: "Waste Optimization",
    description:
      "AI-assisted cutting and material planning that reduces waste and improves fabrication yield.",
    categories: ["AI", "Optimization", "Sustainability"],
    image: wasteOptimization,
    detail: adaptDetail({
      name: "Waste Optimization",
      title: "Plan material cuts for yield, not leftover piles",
      body: "Waste Optimization helps fabrication teams model nesting and material use so planning decisions reduce scrap and protect margins.",
      stats: { bestFor: "Fabrication Teams", coreFunction: "Nesting & Yield", platform: "Web Platform" },
      challengeTitle: "Material Waste Quietly Erodes Project Margins.",
      challengeBody: "Cut lists and nesting decisions are rushed. Scrap piles grow, reorders appear late, and nobody sees the pattern until the job is closed.",
      problems: [
        { title: "Ad-Hoc Nesting", body: "Cut plans depend on individual habit, not shared rules." },
        { title: "Hidden Scrap", body: "Waste is noticed after material has already been ordered." },
        { title: "Reorder Friction", body: "Shortages force urgent buys at worse rates." },
        { title: "Weak Feedback", body: "Shop learnings never improve the next package." },
      ],
      capabilitiesTitle: "Everything Needed to Improve Cut Yield.",
      capabilitiesBody: "Plan, simulate, and refine material use before the shop floor commits.",
      capabilityCards: [
        { icon: "grid", title: "Nesting Assist", body: "Model cut layouts for better material use." },
        { icon: "pulse", title: "Yield Forecast", body: "See waste risk before fabrication starts." },
        { icon: "docs", title: "Cut Lists", body: "Keep structured lists tied to each package." },
        { icon: "search", title: "Shortage Alerts", body: "Flag gaps before they become site delays." },
        { icon: "layers", title: "Scenario Compare", body: "Test planning options side by side." },
        { icon: "camera", title: "Shop Feedback", body: "Capture what actually happened on the floor." },
      ],
      howTitle: "From Package to Optimized Cut Plan.",
      stages: [
        { title: "Import Requirements", body: "Bring panel and material needs into planning." },
        { title: "Generate Nesting", body: "Create candidate cut layouts." },
        { title: "Compare Yield", body: "Choose the plan that protects material." },
        { title: "Issue to Shop", body: "Hand over clear cut instructions." },
        { title: "Learn From Result", body: "Feed actual waste back into the next plan." },
      ],
      builtTitle: "Built for Fabrication Efficiency.",
      builtBody: "Waste Optimization helps shop and planning teams protect both schedule and margin.",
      audiences: [
        { icon: "production", title: "Shop Planners", body: "Nest with intent instead of guesswork." },
        { icon: "pm", title: "Production Managers", body: "See material risk before it hits the floor." },
        { icon: "engineering", title: "Detailers", body: "Align cut logic with the package design." },
        { icon: "site", title: "Procurement", body: "Order closer to true need, not padded estimates." },
      ],
      moreSlugs: ["quote-automation", "panel-x", "boq-extraction"],
      poster: wasteOptimization,
    }),
  },
  {
    slug: "drawing-intelligence",
    badge: "Capability Showcase",
    name: "Drawing Intelligence",
    description:
      "Interpret, compare, and extract information from technical drawings to reduce manual review.",
    categories: ["AI", "Drawings", "Analysis", "Document Intelligence"],
    image: drawingIntelligence,
    detail: adaptDetail({
      name: "Drawing Intelligence",
      title: "See drawing changes without side-by-side grind",
      body: "Drawing Intelligence compares sets, surfaces revisions, and extracts structured data so engineering hours go to decisions—not hunting differences.",
      stats: { bestFor: "Engineering Teams", coreFunction: "Drawing Analysis", platform: "Web Platform" },
      challengeTitle: "Drawing Review Still Means Manual Hunting.",
      challengeBody: "Revision packs arrive dense and frequent. Teams burn hours comparing sheets, missing changes, and re-entering data that already lives on the page.",
      problems: [
        { title: "Side-by-Side Fatigue", body: "Comparing revisions by eye is slow and error-prone." },
        { title: "Missed Changes", body: "Critical markups hide in dense sheets." },
        { title: "Re-Entry Work", body: "Useful data is typed again into trackers and spreadsheets." },
        { title: "Weak Handoffs", body: "Downstream teams inherit unclear revision impact." },
      ],
      capabilitiesTitle: "Everything Needed to Read Drawings Faster.",
      capabilitiesBody: "Compare, extract, and connect drawing information to project work.",
      capabilityCards: [
        { icon: "layers", title: "Revision Compare", body: "Surface what changed between sets." },
        { icon: "search", title: "Change Highlight", body: "Focus attention on meaningful deltas." },
        { icon: "docs", title: "Data Extraction", body: "Pull structured fields from sheets." },
        { icon: "grid", title: "Sheet Indexing", body: "Organize packages for faster navigation." },
        { icon: "pulse", title: "Impact Views", body: "See which zones or packages are affected." },
        { icon: "camera", title: "Review Notes", body: "Capture decisions against the drawing itself." },
      ],
      howTitle: "From Drawing Pack to Clear Decisions.",
      stages: [
        { title: "Upload Sets", body: "Bring current and prior drawings into the workspace." },
        { title: "Compare Revisions", body: "Detect and highlight meaningful changes." },
        { title: "Extract Data", body: "Structure useful fields for downstream tools." },
        { title: "Review Impact", body: "Confirm what teams need to act on." },
        { title: "Publish Insights", body: "Share a clear revision summary." },
      ],
      builtTitle: "Built for Engineering Throughput.",
      builtBody: "Drawing Intelligence removes the grind between receiving a pack and acting on it.",
      audiences: [
        { icon: "engineering", title: "Detailers", body: "Find revisions without endless sheet flipping." },
        { icon: "pm", title: "Design Managers", body: "See package impact before meetings." },
        { icon: "production", title: "Shop Coordinators", body: "Know which cuts and panels changed." },
        { icon: "site", title: "Field Engineers", body: "Work from clearer revision context." },
      ],
      moreSlugs: ["panel-x", "boq-extraction", "permit-ai"],
      poster: drawingIntelligence,
    }),
  },
  {
    slug: "project-intelligence",
    badge: "Internal Product",
    name: "Project Intelligence",
    description:
      "Operational dashboards and reports that turn project data into clear planning and delivery insight.",
    categories: ["Analytics", "Dashboard", "Reports", "Web Platform"],
    image: projectIntelligence,
    detail: adaptDetail({
      name: "Project Intelligence",
      title: "One operating picture for planning and delivery",
      body: "Project Intelligence consolidates status, risks, and progress signals into dashboards leadership and project teams can act on together.",
      stats: { bestFor: "Project Leadership", coreFunction: "Operational Dashboards", platform: "Web Platform" },
      challengeTitle: "Status Lives in Too Many Places to Act Fast.",
      challengeBody: "Reports, trackers, and meetings each tell a partial story. Leaders spend time assembling the picture instead of making decisions.",
      problems: [
        { title: "Scattered Status", body: "Every team updates a different spreadsheet." },
        { title: "Lagging Reports", body: "Weekly packs are already outdated when shared." },
        { title: "Hidden Risk", body: "Issues surface late because signals are disconnected." },
        { title: "Meeting Drag", body: "Standups become status collection, not decision forums." },
      ],
      capabilitiesTitle: "Everything Needed for a Shared Operating Picture.",
      capabilitiesBody: "Connect signals into dashboards teams can trust and act on.",
      capabilityCards: [
        { icon: "pulse", title: "Live Dashboards", body: "See progress and blockers in one place." },
        { icon: "grid", title: "Package Views", body: "Slice status by zone, trade, or work package." },
        { icon: "docs", title: "Report Packs", body: "Generate clear summaries for leadership." },
        { icon: "search", title: "Risk Signals", body: "Highlight patterns before they become delays." },
        { icon: "layers", title: "Data Connect", body: "Pull from the systems teams already update." },
        { icon: "camera", title: "Evidence Links", body: "Jump from KPI to the underlying record." },
      ],
      howTitle: "From Raw Status to Shared Decisions.",
      stages: [
        { title: "Connect Sources", body: "Bring project signals into one workspace." },
        { title: "Normalize Metrics", body: "Align definitions across teams." },
        { title: "Build Views", body: "Create dashboards for leadership and delivery." },
        { title: "Surface Risks", body: "Flag exceptions that need attention." },
        { title: "Drive Actions", body: "Assign follow-ups from the same picture." },
      ],
      builtTitle: "Built for Teams Who Need Clarity, Not More Spreadsheets.",
      builtBody: "Project Intelligence replaces status theater with a shared operating view.",
      audiences: [
        { icon: "pm", title: "Project Managers", body: "Run from one current status picture." },
        { icon: "engineering", title: "Delivery Leads", body: "Spot package risk early." },
        { icon: "production", title: "Operations", body: "Align shop and site signals." },
        { icon: "site", title: "Leadership", body: "Review progress without waiting for a pack." },
      ],
      moreSlugs: ["panel-x", "electra-x", "construction-inspection"],
      poster: projectIntelligence,
    }),
  },
  {
    slug: "permit-ai",
    badge: "Capability Showcase",
    name: "Permit AI",
    description:
      "Compliance-oriented document review that flags gaps against permit and code requirements earlier.",
    categories: ["AI", "Compliance", "Permits", "Document Intelligence"],
    image: permitAi,
    detail: adaptDetail({
      name: "Permit AI",
      title: "Spot permit and compliance gaps before they stall work",
      body: "Permit AI reviews submissions and supporting documents so teams catch missing items earlier—reducing rework and approval delay.",
      stats: { bestFor: "Compliance Teams", coreFunction: "Permit Review", platform: "Web Platform" },
      challengeTitle: "Permit Gaps Surface When It Is Already Expensive.",
      challengeBody: "Submission packs are large and checklist-heavy. Missing items and mismatches are found late—after reviewers push the package back.",
      problems: [
        { title: "Checklist Blind Spots", body: "Required documents are easy to miss under deadline." },
        { title: "Inconsistent Packs", body: "Every submission is assembled differently." },
        { title: "Late Rejection", body: "Authorities return packages for avoidable gaps." },
        { title: "Slow Rework", body: "Teams scramble to locate and replace missing files." },
      ],
      capabilitiesTitle: "Everything Needed for Cleaner Permit Packs.",
      capabilitiesBody: "Review submissions against requirements before they leave your desk.",
      capabilityCards: [
        { icon: "docs", title: "Pack Review", body: "Check submissions against requirement lists." },
        { icon: "search", title: "Gap Detection", body: "Flag missing or mismatched documents early." },
        { icon: "layers", title: "Requirement Maps", body: "Keep code and permit rules visible." },
        { icon: "grid", title: "Status Tracking", body: "Follow each package through review cycles." },
        { icon: "pulse", title: "Risk Highlights", body: "Prioritize the gaps most likely to stall approval." },
        { icon: "camera", title: "Evidence Links", body: "Attach supporting files to each requirement." },
      ],
      howTitle: "From Draft Pack to Submission Ready.",
      stages: [
        { title: "Assemble Pack", body: "Collect drawings and supporting documents." },
        { title: "Run Review", body: "Check against permit and code requirements." },
        { title: "Close Gaps", body: "Resolve missing or inconsistent items." },
        { title: "Internal Sign-Off", body: "Confirm readiness before submission." },
        { title: "Submit & Track", body: "Monitor reviewer cycles and responses." },
      ],
      builtTitle: "Built for Teams Who Own Approval Risk.",
      builtBody: "Permit AI helps compliance and project teams submit cleaner packs the first time.",
      audiences: [
        { icon: "pm", title: "Permit Coordinators", body: "Catch gaps before the authority does." },
        { icon: "engineering", title: "Technical Authors", body: "Align documents with requirement maps." },
        { icon: "production", title: "Project Admins", body: "Keep pack status visible across cycles." },
        { icon: "site", title: "Delivery Leads", body: "Reduce approval delays that freeze site work." },
      ],
      moreSlugs: ["drawing-intelligence", "boq-extraction", "construction-inspection"],
      poster: permitAi,
    }),
  },
  {
    slug: "boq-extraction",
    badge: "Capability Showcase",
    name: "BOQ Extraction",
    description:
      "Pull structured bill-of-quantities data straight from drawings and specifications.",
    categories: ["AI", "BOQ", "Extraction", "Document Intelligence"],
    image: boqExtraction,
    detail: adaptDetail({
      name: "BOQ Extraction",
      title: "Extract BOQ data without retyping every line",
      body: "BOQ Extraction turns drawings and specs into structured quantities your estimating and commercial teams can review, edit, and reuse.",
      stats: { bestFor: "Commercial & Estimating", coreFunction: "BOQ Structuring", platform: "Web Platform" },
      challengeTitle: "BOQ Building Still Starts With Manual Re-Typing.",
      challengeBody: "Quantities hide in drawings and long specs. Teams copy line by line into spreadsheets, introducing delay and avoidable error.",
      problems: [
        { title: "Manual Transcription", body: "Quantities are retyped from PDFs and sheets." },
        { title: "Inconsistent Structure", body: "Every estimator formats BOQs differently." },
        { title: "Revision Pain", body: "Updated packs force another full extraction cycle." },
        { title: "Handoff Gaps", body: "Commercial and delivery teams inherit incomplete data." },
      ],
      capabilitiesTitle: "Everything Needed to Structure BOQs Faster.",
      capabilitiesBody: "Extract, review, and reuse quantities without starting from a blank sheet.",
      capabilityCards: [
        { icon: "docs", title: "Source Ingest", body: "Read drawings and specification packs." },
        { icon: "search", title: "Quantity Extract", body: "Pull candidate BOQ lines automatically." },
        { icon: "grid", title: "Structured Tables", body: "Organize items for commercial review." },
        { icon: "layers", title: "Revision Update", body: "Refresh quantities when packs change." },
        { icon: "pulse", title: "Coverage Checks", body: "Spot missing sections before issue." },
        { icon: "camera", title: "Export Paths", body: "Send clean tables into estimating workflows." },
      ],
      howTitle: "From Documents to Structured BOQ.",
      stages: [
        { title: "Upload Sources", body: "Bring drawings and specs into the workspace." },
        { title: "Extract Lines", body: "Generate structured quantity candidates." },
        { title: "Review & Edit", body: "Confirm items with commercial oversight." },
        { title: "Lock Structure", body: "Standardize the BOQ for reuse." },
        { title: "Hand Off", body: "Feed estimating and delivery systems." },
      ],
      builtTitle: "Built for Commercial Speed Without Losing Control.",
      builtBody: "BOQ Extraction removes retyping so teams spend time validating, not copying.",
      audiences: [
        { icon: "pm", title: "Estimators", body: "Start from structured quantities, not blank rows." },
        { icon: "production", title: "Commercial Teams", body: "Keep BOQ formats consistent across bids." },
        { icon: "engineering", title: "Quantity Surveyors", body: "Review extraction before it becomes a quote." },
        { icon: "site", title: "Delivery Planners", body: "Reuse quantities beyond the bid stage." },
      ],
      moreSlugs: ["quote-automation", "drawing-intelligence", "waste-optimization"],
      poster: boqExtraction,
    }),
  },
];

export function getSolution(slug) {
  return solutions.find((item) => item.slug === slug) || null;
}

export function getRelatedSolutions(slugs = []) {
  return slugs.map((slug) => getSolution(slug)).filter(Boolean);
}
