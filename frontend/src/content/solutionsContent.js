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
    primary: { label: "Book a Discovery Call", href: "/contact" },
  },
};

export const solutions = [
  {
    slug: "panel-x",
    badge: "Client System",
    name: "PanelX",
    description:
      "Panel lifecycle visibility across shop, logistics, and site—so everyone works from one agreed status.",
    categories: ["Façade", "Panel Tracking", "Documents", "Web Platform"],
    image: panelX,
    detail: {
      title: "Panel status that shop, logistics, and site can trust",
      body: "Replace spreadsheet chase with a shared panel tracker—filters by zone and elevation, roles for every team, and a current view the whole project agrees on.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
  {
    slug: "electra-x",
    badge: "Internal Product",
    name: "ElectraX",
    description:
      "Electrical design and validation workflows that catch conflicts before they reach the field.",
    categories: ["Electrical", "Design", "Validation", "AI"],
    image: electraX,
    detail: {
      title: "Validate electrical design before it hits the site",
      body: "ElectraX helps engineering teams check layouts, catch coordination issues early, and keep validation evidence tied to the live design set.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/integration-services" },
    },
  },
  {
    slug: "construction-inspection",
    badge: "Internal Product",
    name: "Construction Inspection",
    description:
      "Field inspection capture with AI-assisted checks that keep quality evidence tied to the project record.",
    categories: ["AI", "Inspection", "Quality", "Mobile"],
    image: constructionInspection,
    detail: {
      title: "Turn site inspections into structured, shareable evidence",
      body: "Capture checks on mobile, flag issues with visual AI support, and sync results back to office workflows without end-of-day admin pile-ups.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
  {
    slug: "quote-automation",
    badge: "Capability Showcase",
    name: "Quote Automation",
    description:
      "Turn specs and drawings into structured quotations in a fraction of the usual estimating time.",
    categories: ["AI", "Estimation", "Automation"],
    image: quoteAutomation,
    detail: {
      title: "Cut estimating hours without cutting accuracy",
      body: "Quote Automation reads project inputs, structures line items, and gives estimators a clear draft to refine—so proposals move faster with fewer re-entry errors.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
  {
    slug: "waste-optimization",
    badge: "Internal Product",
    name: "Waste Optimization",
    description:
      "AI-assisted cutting and material planning that reduces waste and improves fabrication yield.",
    categories: ["AI", "Optimization", "Sustainability"],
    image: wasteOptimization,
    detail: {
      title: "Plan material cuts for yield, not leftover piles",
      body: "Waste Optimization helps fabrication teams model nesting and material use so planning decisions reduce scrap and protect margins.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/workflow-analysis-consulting" },
    },
  },
  {
    slug: "drawing-intelligence",
    badge: "Capability Showcase",
    name: "Drawing Intelligence",
    description:
      "Interpret, compare, and extract information from technical drawings to reduce manual review.",
    categories: ["AI", "Drawings", "Analysis", "Document Intelligence"],
    image: drawingIntelligence,
    detail: {
      title: "See drawing changes without side-by-side grind",
      body: "Drawing Intelligence compares sets, surfaces revisions, and extracts structured data so engineering hours go to decisions—not hunting differences.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
  {
    slug: "project-intelligence",
    badge: "Internal Product",
    name: "Project Intelligence",
    description:
      "Operational dashboards and reports that turn project data into clear planning and delivery insight.",
    categories: ["Analytics", "Dashboard", "Reports", "Web Platform"],
    image: projectIntelligence,
    detail: {
      title: "One operating picture for planning and delivery",
      body: "Project Intelligence consolidates status, risks, and progress signals into dashboards leadership and project teams can act on together.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/integration-services" },
    },
  },
  {
    slug: "permit-ai",
    badge: "Capability Showcase",
    name: "Permit AI",
    description:
      "Compliance-oriented document review that flags gaps against permit and code requirements earlier.",
    categories: ["AI", "Compliance", "Permits", "Document Intelligence"],
    image: permitAi,
    detail: {
      title: "Spot permit and compliance gaps before they stall work",
      body: "Permit AI reviews submissions and supporting documents so teams catch missing items earlier—reducing rework and approval delay.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
  {
    slug: "boq-extraction",
    badge: "Capability Showcase",
    name: "BOQ Extraction",
    description:
      "Pull structured bill-of-quantities data straight from drawings and specifications.",
    categories: ["AI", "BOQ", "Extraction", "Document Intelligence"],
    image: boqExtraction,
    detail: {
      title: "Extract BOQ data without retyping every line",
      body: "BOQ Extraction turns drawings and specs into structured quantities your estimating and commercial teams can review, edit, and reuse.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" },
      secondaryCta: { label: "Explore Related Services", href: "/services/custom-ai-development" },
    },
  },
];

export function getSolution(slug) {
  return solutions.find((item) => item.slug === slug) || null;
}
