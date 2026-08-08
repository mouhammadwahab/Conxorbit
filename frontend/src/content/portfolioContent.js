import featuredPanelX from "../assets/portfolio/featured-panelx.png";
import clientPanelX from "../assets/portfolio/client-panelx.png";
import clientConfidential from "../assets/portfolio/client-confidential.png";
import productElectraX from "../assets/portfolio/product-electrax.png";
import productInspection from "../assets/portfolio/product-inspection.png";
import workflowQuote from "../assets/portfolio/workflow-quote.png";
import workflowDrawing from "../assets/portfolio/workflow-drawing.png";
import workflowWaste from "../assets/portfolio/workflow-waste.png";
import workflowPermit from "../assets/portfolio/workflow-permit.png";

export const portfolioContent = {
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
  featured: {
    badge: "FEATURED WORK",
    label: "CLIENT SYSTEM",
    name: "PanelX",
    title: "Connecting Façade Operations From Shop to Site.",
    body: "A custom platform connecting drawings, panel tracking, documentation, and installation progress for façade operations.",
    tags: ["Façade", "Panel Tracking", "Web Platform", "Workflow Management"],
    cta: { label: "Explore Case Study", href: "/case-studies/facade-panel-visibility" },
    image: featuredPanelX,
  },
  proof: {
    badge: "AT A GLANCE",
    items: [
      {
        value: "02",
        label: "Client Systems",
        hint: "Purpose-built platforms for live operations",
      },
      {
        value: "02",
        label: "Internal Products",
        hint: "Tools we're building for the industry",
      },
      {
        value: "04",
        label: "Workflow Capabilities",
        hint: "AI-assisted estimating to compliance",
      },
      {
        value: "06",
        label: "Industries",
        hint: "Deepest in the building envelope",
      },
    ],
  },
  clientSystems: {
    badge: "CLIENT SYSTEMS",
    title: "Built Around the Way Our Clients Work.",
    body: "We don't start with a template. We study the workflow, understand the operational problem, and engineer the system around it.",
    items: [
      {
        index: "01 / 02",
        name: "PanelX",
        body: "A custom platform connecting drawings, panel tracking, documentation, and installation progress for façade operations.",
        tags: ["Façade", "Panel Tracking", "Web Platform", "Workflow Management"],
        cta: { label: "View Case Study", href: "/case-studies/facade-panel-visibility" },
        image: clientPanelX,
        badge: "CLIENT SYSTEM",
      },
      {
        index: "02 / 02",
        name: "Custom Façade Engineering Platform",
        confidential: true,
        confidentialLabel: "CLIENT PROJECT — CONFIDENTIAL",
        body: "A purpose-built system supporting façade engineering and fabrication workflows, from component data through to production and site coordination.",
        tags: ["Façade", "Engineering", "Fabrication", "Data Systems"],
        cta: { label: "View Case Study", href: "/case-studies/drawing-review-flow" },
        image: clientConfidential,
        badge: "CLIENT SYSTEM",
      },
    ],
  },
  approach: {
    badge: "HOW WE WORK",
    title: "From Operational Friction to Working Systems.",
    body: "Every engagement starts in the real workflow—then we design software that fits how teams already deliver.",
    steps: [
      {
        title: "Study the Workflow",
        body: "Map drawings, handoffs, bottlenecks, and site constraints before a single screen is designed.",
      },
      {
        title: "Engineer the System",
        body: "Build around the operational problem with clear data models, roles, and integration points.",
      },
      {
        title: "Embed in Operations",
        body: "Roll out with training, feedback loops, and support so the system sticks beyond go-live.",
      },
    ],
  },
  internalProducts: {
    badge: "OUR PRODUCTS",
    title: "Products We're Building for the Industry.",
    body: "Alongside client work, we're developing our own products around recurring problems we've identified across construction and specialist trades.",
    cards: [
      {
        label: "INTERNAL PRODUCT",
        status: "In Development",
        name: "ElectraX",
        body: "Electrical design and validation workflows that catch conflicts before they reach the field.",
        tags: ["Electrical", "AI", "Workflow"],
        href: "/solutions/electra-x",
        image: productElectraX,
      },
      {
        label: "INTERNAL PRODUCT",
        status: "In Development",
        name: "Construction Inspection",
        body: "Field inspection capture with AI-assisted checks that keep quality evidence tied to the project record.",
        tags: ["Construction", "Mobile", "Inspection"],
        href: "/solutions/construction-inspection",
        image: productInspection,
      },
    ],
  },
  workflowSolutions: {
    badge: "WORKFLOW SOLUTIONS",
    title: "Turning Complex Workflows into Intelligent Systems.",
    body: "From estimating and permitting to drawing analysis and material optimization, we explore how AI and automation can remove repetitive work.",
    cards: [
      {
        label: "WORKFLOW SOLUTION",
        status: "Capability",
        name: "Quote Automation",
        body: "Turn specs and drawings into structured quotations in a fraction of the usual estimating time.",
        tags: ["AI", "Estimation", "Automation"],
        href: "/solutions/quote-automation",
        image: workflowQuote,
      },
      {
        label: "WORKFLOW SOLUTION",
        status: "Capability",
        name: "Drawing Intelligence",
        body: "Interpret, compare, and extract information from technical drawings to reduce manual review.",
        tags: ["AI", "Drawings", "Analysis"],
        href: "/solutions/drawing-intelligence",
        image: workflowDrawing,
      },
      {
        label: "WORKFLOW SOLUTION",
        status: "Capability",
        name: "Waste Optimization",
        body: "AI-assisted cutting and material planning that reduces waste and improves fabrication yield.",
        tags: ["AI", "Optimization", "Fabrication"],
        href: "/solutions/waste-optimization",
        image: workflowWaste,
      },
      {
        label: "WORKFLOW SOLUTION",
        status: "Capability",
        name: "Permit AI",
        body: "Compliance-oriented document review that flags gaps against permit and code requirements earlier.",
        tags: ["AI", "Compliance", "Permits"],
        href: "/solutions/permit-ai",
        image: workflowPermit,
      },
    ],
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
