import {
  serviceFeaturedImages,
  serviceCapabilityImages,
} from "../assets/services";

const sharedApproach = {
  badge: "Our Approach",
  title: "Every AI System Starts with Understanding Your Workflow",
  steps: [
    {
      icon: "understand",
      title: "Understand",
      body: "We map how work actually moves through your team today.",
    },
    {
      icon: "analyse",
      title: "Analyse",
      body: "We identify where manual effort and data gaps cost you the most time.",
    },
    {
      icon: "prototype",
      title: "Prototype",
      body: "A working proof of concept, tested against your real drawings and data.",
    },
    {
      icon: "develop",
      title: "Develop",
      body: "We build the full system around your workflow, not a generic template.",
    },
    {
      icon: "deploy",
      title: "Deploy",
      body: "Rolled out to your team with the access and integrations it needs to be used.",
    },
    {
      icon: "support",
      title: "Support",
      body: "We stay with you after launch—refining, training, and evolving the system as your work changes.",
    },
  ],
};

const sharedWhy = {
  badge: "WHY CONX ORBIT",
  title: "Built Like an Engineering Partner, Not Just a Development Agency.",
  body: "Every solution is shaped around your operations, your people, and the way your projects move—not around pre-built templates or generic AI tools.",
  cta: { label: "Book Consultation", href: "/book-discovery" },
  cards: [
    {
      number: "01",
      icon: "industry",
      title: "Construction First",
      body: "We understand drawings, fabrication, inspections, and delivery before designing the system.",
    },
    {
      number: "02",
      icon: "workflow",
      title: "Workflow Before Technology",
      body: "Technology should adapt to your operations—not force your team into new processes.",
    },
    {
      number: "03",
      icon: "partnership",
      title: "Founder-Led Collaboration",
      body: "You'll work directly with the engineers designing and building your solution.",
    },
  ],
};

const sharedFeatured = {
  badge: "FEATURED SOLUTIONS",
  titleBefore: "Systems Built for Real ",
  titleHighlight: "Construction Workflows",
  titleAfter: ".",
  body: "Explore selected platforms shaped around façade and construction delivery—built to cut manual work and keep projects moving.",
  viewAll: { label: "View All Solutions", href: "/solutions" },
  cards: [
    {
      badge: "Façade",
      image: serviceFeaturedImages.panelX,
      title: "Panel X",
      description:
        "Panel lifecycle visibility across shop, logistics, and site—so everyone works from one agreed status.",
      href: "/solutions/panel-x",
      cta: "View Solution",
    },
    {
      badge: "Fabrication",
      image: serviceFeaturedImages.flatforge,
      title: "Flatforge",
      description:
        "Production and flat-pattern workflows that keep fabrication moving without spreadsheet chase.",
      href: "/solutions",
      cta: "View Solution",
    },
  ],
};

const sharedCta = {
  badge: "DISCUSS YOUR WORKFLOW",
  title: "Let's Talk About Your Workflow.",
  body: "Whether you're exploring AI, replacing manual processes, or planning a custom platform, we'd love to understand your goals and discuss what's possible.",
  primary: { label: "Book a Discovery Call", href: "/book-discovery" },
  secondary: { label: "Explore Solutions", href: "/solutions" },
};

const customAiCapabilities = [
  {
    icon: "blueprint",
    image: serviceCapabilityImages.drawing,
    title: "Drawing Intelligence",
    body: "Interpret, compare, and extract valuable information from technical drawings to reduce manual review and improve engineering accuracy.",
  },
  {
    icon: "docs",
    image: serviceCapabilityImages.docs,
    title: "Intelligent Document Processing",
    body: "Convert specifications, reports, contracts, and project documents into structured, searchable information using AI.",
  },
  {
    icon: "workflow",
    image: serviceCapabilityImages.workflow,
    title: "Workflow Automation",
    body: "Replace repetitive manual processes with intelligent workflows that improve speed, consistency, and operational efficiency.",
  },
  {
    icon: "chat",
    image: serviceCapabilityImages.chat,
    title: "Custom AI Assistants",
    body: "Purpose-built AI assistants trained around your projects, documents, and internal knowledge—not generic chatbots.",
  },
  {
    icon: "cubes",
    image: serviceCapabilityImages.cubes,
    title: "System Integration",
    body: "Connect new platforms with your existing software, drawings, databases, and business workflows.",
  },
  {
    icon: "dashboard",
    image: serviceCapabilityImages.dashboard,
    title: "Construction Analytics",
    body: "Turn operational data into dashboards and insights that support better planning, tracking, and decision-making.",
  },
  {
    icon: "vision",
    image: serviceCapabilityImages.vision,
    title: "Computer Vision",
    body: "Analyze images, drawings, and site data using AI to automate inspections, detection, and visual analysis tasks.",
  },
  {
    icon: "devices",
    image: serviceCapabilityImages.platforms,
    title: "Digital Platforms",
    body: "Build scalable web and mobile platforms tailored to construction operations, collaboration, and long-term growth.",
  },
];

export const servicePages = {
  "custom-ai-development": {
    slug: "custom-ai-development",
    meta: {
      title: "Custom AI Development — ConX Orbit",
      description:
        "Custom AI systems for construction workflows—drawing intelligence, quotation automation, document analysis, and operational decision support.",
    },
    hero: {
      badge: "OUR SERVICES",
      titleBefore: "Custom ",
      titleHighlight: "AI",
      titleAfter: " Development",
      body: "We design intelligent systems around your construction workflows—from drawing intelligence and quotation automation to document analysis and operational decision support.",
      primaryCta: { label: "Book Consultation", href: "/book-discovery" },
      secondaryCta: { label: "View Related Solutions", href: "/solutions" },
    },
    value: {
      badge: "WHERE IT CREATES VALUE",
      title: "Built Around Real Construction Workflows",
      cards: [
        {
          icon: "compare",
          title: "Drawing Comparison",
          body: "Spot revision changes across drawing sets instantly, without a manual side-by-side review.",
        },
        {
          icon: "quote",
          title: "Quotation Automation",
          body: "Turn specs and drawings into structured quotes in a fraction of the usual estimating time.",
        },
        {
          icon: "boq",
          title: "BOQ Extraction",
          body: "Pull structured bill-of-quantities data straight from drawings and specifications.",
        },
        {
          icon: "docs",
          title: "Document Intelligence",
          body: "Search, summarize, and cross-reference thousands of project documents in seconds.",
        },
        {
          icon: "shield",
          title: "Compliance Review",
          body: "Flag gaps against code and spec requirements before they become site issues.",
        },
        {
          icon: "site",
          title: "Site Operations",
          body: "Connect field progress and reporting back to the project record in real time.",
        },
      ],
    },
    approach: sharedApproach,
    capabilities: {
      badge: "Capabilities",
      title: "Engineering Intelligent Systems Around Your Operations.",
      body: "Every capability we build is designed to solve a real operational challenge—from interpreting technical drawings and automating workflows to connecting data, documents, and teams through intelligent software.",
      cards: customAiCapabilities,
    },
    featured: sharedFeatured,
    why: sharedWhy,
    cta: sharedCta,
  },

  "workflow-analysis-consulting": {
    slug: "workflow-analysis-consulting",
    meta: {
      title: "Workflow Analysis & Consulting — ConX Orbit",
      description:
        "Map construction workflows, find bottlenecks, and define where custom software or AI creates real impact.",
    },
    hero: {
      badge: "OUR SERVICES",
      titleBefore: "Workflow Analysis & ",
      titleHighlight: "Consulting",
      titleAfter: "",
      body: "We study how your teams work today, identify where time and accuracy are being lost, and define the opportunities where custom software or AI can create real impact.",
      primaryCta: { label: "Book Consultation", href: "/book-discovery" },
      secondaryCta: { label: "View Related Solutions", href: "/solutions" },
    },
    value: {
      badge: "WHERE IT CREATES VALUE",
      title: "Clarity Before You Commit to Build",
      cards: [
        {
          icon: "compare",
          title: "Process Mapping",
          body: "See how work actually moves—from estimate to fabrication to site—without assuming a textbook process.",
        },
        {
          icon: "quote",
          title: "Bottleneck Discovery",
          body: "Pinpoint where hours disappear in revisions, handoffs, and re-entry across tools.",
        },
        {
          icon: "boq",
          title: "Opportunity Scoring",
          body: "Rank automation and AI opportunities by impact, readiness, and delivery risk.",
        },
        {
          icon: "docs",
          title: "Data Readiness",
          body: "Understand what drawings, docs, and systems you already have—and what gaps block progress.",
        },
        {
          icon: "shield",
          title: "Risk Framing",
          body: "Surface change, adoption, and integration risks before a build starts.",
        },
        {
          icon: "site",
          title: "Practical Roadmap",
          body: "Leave with a sequenced plan your operations and leadership can agree on.",
        },
      ],
    },
    approach: {
      ...sharedApproach,
      title: "Every Recommendation Starts with Understanding Your Workflow",
    },
    capabilities: {
      badge: "Capabilities",
      title: "Advisory That Stays Close to How Work Gets Done.",
      body: "Consulting is grounded in construction operations—so recommendations stay practical, sequenced, and ready for delivery.",
      cards: [
        {
          icon: "workflow",
          image: serviceCapabilityImages.bProcess,
          title: "Workflow Assessment",
          body: "End-to-end reviews of estimating, engineering, fabrication, and site reporting flows.",
        },
        {
          icon: "dashboard",
          image: serviceCapabilityImages.bBottleneck,
          title: "Bottleneck Analysis",
          body: "Quantify where delays and rework concentrate so investment decisions are evidence-led.",
        },
        {
          icon: "blueprint",
          image: serviceCapabilityImages.bMap,
          title: "Automation Mapping",
          body: "Identify tasks ripe for AI, software, or simple process change—without forcing tools.",
        },
        {
          icon: "docs",
          image: serviceCapabilityImages.bWorkshop,
          title: "Requirements Workshops",
          body: "Translate operational pain into clear scopes your teams and vendors can execute.",
        },
        {
          icon: "cubes",
          image: serviceCapabilityImages.bSystems,
          title: "Systems Landscape",
          body: "Map ERP, BIM, CRM, and file stores so future builds plug into reality.",
        },
        {
          icon: "chat",
          image: serviceCapabilityImages.bPeople,
          title: "Stakeholder Alignment",
          body: "Bring office, shop, and site voices into one shared definition of success.",
        },
        {
          icon: "vision",
          image: serviceCapabilityImages.bProof,
          title: "Proof Priorities",
          body: "Define what a prototype must prove before a larger build is funded.",
        },
        {
          icon: "devices",
          image: serviceCapabilityImages.bRoadmap,
          title: "Delivery Roadmaps",
          body: "Phased plans that balance quick wins with longer platform investments.",
        },
      ],
    },
    featured: sharedFeatured,
    why: sharedWhy,
    cta: sharedCta,
  },

  "integration-services": {
    slug: "integration-services",
    meta: {
      title: "Integration Services — ConX Orbit",
      description:
        "Connect new platforms with ERP, BIM, drawings, and the tools construction teams already use.",
    },
    hero: {
      badge: "OUR SERVICES",
      titleBefore: "Integration ",
      titleHighlight: "Services",
      titleAfter: "",
      body: "New systems should work with the tools you already rely on. We connect platforms, drawings, databases, and business workflows into one coherent digital environment.",
      primaryCta: { label: "Book Consultation", href: "/book-discovery" },
      secondaryCta: { label: "View Related Solutions", href: "/solutions" },
    },
    value: {
      badge: "WHERE IT CREATES VALUE",
      title: "One Connected Operating Picture",
      cards: [
        {
          icon: "compare",
          title: "API Connectivity",
          body: "Link custom apps and products to the systems your teams already live in.",
        },
        {
          icon: "quote",
          title: "BIM & Drawing Flows",
          body: "Keep drawing packages and model data moving without manual file chasing.",
        },
        {
          icon: "boq",
          title: "ERP / CRM Sync",
          body: "Push and pull commercial and project data without double entry.",
        },
        {
          icon: "docs",
          title: "Document Bridges",
          body: "Surface specs and correspondence where work happens—not buried in folders.",
        },
        {
          icon: "shield",
          title: "Reliable Hand-offs",
          body: "Define ownership and retries so integrations fail safely, not silently.",
        },
        {
          icon: "site",
          title: "Field ↔ Office",
          body: "Carry status and evidence between site tools and back-office systems in near real time.",
        },
      ],
    },
    approach: {
      ...sharedApproach,
      title: "Every Integration Starts with Understanding Your Workflow",
    },
    capabilities: {
      badge: "Capabilities",
      title: "Connecting Systems Without Breaking Daily Work.",
      body: "We design integrations around construction reality—drawings, commercial systems, and field tools—so data moves with the project, not against it.",
      cards: [
        {
          icon: "cubes",
          image: serviceCapabilityImages.cApi,
          title: "API Integrations",
          body: "Secure, maintainable connections between custom platforms and third-party software.",
        },
        {
          icon: "blueprint",
          image: serviceCapabilityImages.cBim,
          title: "BIM & Drawing Workflows",
          body: "Wire model and drawing pipelines into review, fabrication, and delivery tools.",
        },
        {
          icon: "dashboard",
          image: serviceCapabilityImages.cErp,
          title: "ERP / CRM Connectivity",
          body: "Keep commercial and project records aligned across estimating and delivery.",
        },
        {
          icon: "workflow",
          image: serviceCapabilityImages.cSync,
          title: "Data Synchronization",
          body: "Scheduled and event-driven sync with clear conflict handling.",
        },
        {
          icon: "docs",
          image: serviceCapabilityImages.cDocs,
          title: "Document Routing",
          body: "Automate where files land and who gets notified when versions change.",
        },
        {
          icon: "chat",
          image: serviceCapabilityImages.cNotify,
          title: "Event & Notification Hooks",
          body: "Trigger the right alerts when status, drawings, or inspections change.",
        },
        {
          icon: "vision",
          image: serviceCapabilityImages.cAccess,
          title: "Identity & Access",
          body: "Role-aware access so shop, site, and office see only what they need.",
        },
        {
          icon: "devices",
          image: serviceCapabilityImages.cMonitor,
          title: "Monitoring & Support",
          body: "Visibility into sync health so issues are caught before teams notice friction.",
        },
      ],
    },
    featured: sharedFeatured,
    why: sharedWhy,
    cta: sharedCta,
  },

  "training-implementation": {
    slug: "training-implementation",
    meta: {
      title: "Training & Implementation — ConX Orbit",
      description:
        "Onboarding, training, and rollout support so new systems become part of daily construction operations.",
    },
    hero: {
      badge: "OUR SERVICES",
      titleBefore: "Training & ",
      titleHighlight: "Implementation",
      titleAfter: "",
      body: "We support your team through onboarding, training, rollout, and continuous improvement so every solution becomes part of daily operations—not a shelfware launch.",
      primaryCta: { label: "Book Consultation", href: "/book-discovery" },
      secondaryCta: { label: "View Related Solutions", href: "/solutions" },
    },
    value: {
      badge: "WHERE IT CREATES VALUE",
      title: "Adoption That Survives Real Project Pressure",
      cards: [
        {
          icon: "compare",
          title: "Role-Based Onboarding",
          body: "Train estimators, engineers, shop leads, and site teams on the workflows they actually own.",
        },
        {
          icon: "quote",
          title: "Rollout Planning",
          body: "Phase go-lives around live projects so change does not stall delivery.",
        },
        {
          icon: "boq",
          title: "Hands-On Workshops",
          body: "Practice on your drawings and data—not generic demo content.",
        },
        {
          icon: "docs",
          title: "Playbooks & Guides",
          body: "Leave teams with clear SOPs they can follow when the trainers leave.",
        },
        {
          icon: "shield",
          title: "Hypercare Support",
          body: "Stay close through the first live cycles to catch friction early.",
        },
        {
          icon: "site",
          title: "Continuous Improvement",
          body: "Capture feedback and refine the system as usage patterns emerge.",
        },
      ],
    },
    approach: {
      ...sharedApproach,
      title: "Every Rollout Starts with Understanding Your Workflow",
    },
    capabilities: {
      badge: "Capabilities",
      title: "Implementation Built for Construction Teams.",
      body: "Training and rollout are designed around how projects actually run—so new tools stick under deadline pressure.",
      cards: [
        {
          icon: "chat",
          image: serviceCapabilityImages.tOnboard,
          title: "Team Onboarding",
          body: "Structured kickoffs that set roles, access, and success measures early.",
        },
        {
          icon: "workflow",
          image: serviceCapabilityImages.tPlan,
          title: "Implementation Planning",
          body: "Sequenced cutovers that respect fabrication and site calendars.",
        },
        {
          icon: "docs",
          image: serviceCapabilityImages.tTrain,
          title: "User Training",
          body: "Live sessions and recorded refreshers tailored to each role.",
        },
        {
          icon: "devices",
          image: serviceCapabilityImages.tField,
          title: "Field Enablement",
          body: "Mobile and site workflows practiced before the first live inspection day.",
        },
        {
          icon: "dashboard",
          image: serviceCapabilityImages.tAdopt,
          title: "Adoption Tracking",
          body: "See who is using the system—and where coaching is still needed.",
        },
        {
          icon: "cubes",
          image: serviceCapabilityImages.tHandover,
          title: "Integration Handover",
          body: "Walk ops through connected systems so ownership is clear after launch.",
        },
        {
          icon: "vision",
          image: serviceCapabilityImages.tComms,
          title: "Change Communication",
          body: "Simple messaging that explains why the change exists and how to get help.",
        },
        {
          icon: "blueprint",
          image: serviceCapabilityImages.tSupport,
          title: "Ongoing Support",
          body: "A durable support path for questions, fixes, and small enhancements.",
        },
      ],
    },
    featured: sharedFeatured,
    why: sharedWhy,
    cta: sharedCta,
  },

  "construction-website-development": {
    slug: "construction-website-development",
    meta: {
      title: "Construction Website Development — ConX Orbit",
      description:
        "Marketing and product websites for construction and façade companies—fast, clear, and easy to update.",
    },
    hero: {
      badge: "OUR SERVICES",
      titleBefore: "Construction Website ",
      titleHighlight: "Development",
      titleAfter: "",
      body: "We design and build marketing and product sites that feel like your brand—fast, clear, and easy to update—so prospects and partners understand your capabilities without a sales call.",
      primaryCta: { label: "Book Consultation", href: "/book-discovery" },
      secondaryCta: { label: "View Related Solutions", href: "/solutions" },
    },
    value: {
      badge: "WHERE IT CREATES VALUE",
      title: "A Site That Speaks Construction Fluently",
      cards: [
        {
          icon: "compare",
          title: "Capability Clarity",
          body: "Present trades, markets, and delivery strength without generic agency fluff.",
        },
        {
          icon: "quote",
          title: "Lead Capture",
          body: "Turn project inquiries into structured conversations your team can act on.",
        },
        {
          icon: "boq",
          title: "Project Showcase",
          body: "Tell project stories with the detail technical buyers expect.",
        },
        {
          icon: "docs",
          title: "Content Control",
          body: "Update case studies, news, and capabilities without waiting on a developer every time.",
        },
        {
          icon: "shield",
          title: "Trust Signals",
          body: "Certifications, partners, and safety culture presented with credibility.",
        },
        {
          icon: "site",
          title: "Performance",
          body: "Fast loads on site Wi‑Fi and mobile—because your audience is often on the go.",
        },
      ],
    },
    approach: {
      ...sharedApproach,
      title: "Every Website Starts with Understanding Your Workflow",
    },
    capabilities: {
      badge: "Capabilities",
      title: "Sites Built for How Construction Buyers Decide.",
      body: "From brand storytelling to product marketing, we ship websites that match the pace and language of façade and construction teams.",
      cards: [
        {
          icon: "devices",
          image: serviceCapabilityImages.wMarketing,
          title: "Marketing Sites",
          body: "Responsive company sites with clear navigation and strong project narratives.",
        },
        {
          icon: "blueprint",
          image: serviceCapabilityImages.wProduct,
          title: "Product Pages",
          body: "Dedicated surfaces for platforms and modules you want the market to find.",
        },
        {
          icon: "docs",
          image: serviceCapabilityImages.wCms,
          title: "CMS & Editing",
          body: "Practical content models so marketing can publish without breaking layout.",
        },
        {
          icon: "dashboard",
          image: serviceCapabilityImages.wSeo,
          title: "SEO Foundations",
          body: "Structure and metadata that help the right buyers discover you.",
        },
        {
          icon: "chat",
          image: serviceCapabilityImages.wForms,
          title: "Inquiry Flows",
          body: "Contact and discovery forms wired to the inbox your founders actually check.",
        },
        {
          icon: "workflow",
          image: serviceCapabilityImages.wDesign,
          title: "Design Systems",
          body: "Reusable components that keep brand consistent as pages grow.",
        },
        {
          icon: "cubes",
          image: serviceCapabilityImages.wIntegrate,
          title: "Integrations",
          body: "Analytics, CRM, and calendar hooks without slowing the experience.",
        },
        {
          icon: "vision",
          image: serviceCapabilityImages.wLaunch,
          title: "Launch & Handover",
          body: "Go-live support and training so your team owns the site confidently.",
        },
      ],
    },
    featured: sharedFeatured,
    why: sharedWhy,
    cta: sharedCta,
  },
};

export function getServicePage(slug) {
  return servicePages[slug] || null;
}

export const serviceSlugs = Object.keys(servicePages);
