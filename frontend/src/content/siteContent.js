export const site = {
  name: "ConX Orbit",
  tagline: "Custom software and AI for construction and façade teams",
  email: "founder@conxorbit.com",
  phone: "+971 00 000 0000",
  whatsapp: "+971000000000",
  whatsappLabel: "WhatsApp",
  linkedin: "https://www.linkedin.com/company/conxorbit",
};

export const navLinks = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "PanelX", href: "/solutions/panel-x" },
      { label: "ElectraX", href: "/solutions/electra-x" },
      { label: "Construction Inspection", href: "/solutions/construction-inspection" },
      { label: "Quote Automation", href: "/solutions/quote-automation" },
      { label: "Drawing Intelligence", href: "/solutions/drawing-intelligence" },
      { label: "View All Solutions", href: "/solutions", emphasis: true },
    ],
  },
  {
    label: "Trades",
    href: "/case-studies/facade",
    children: [
      { label: "Façade & Curtain Wall", href: "/case-studies/facade" },
      { label: "Construction Technology", href: "/case-studies/construction" },
    ],
  },
  {
    label: "Services",
    href: "/services/custom-ai-development",
    children: [
      { label: "Custom AI Development", href: "/services/custom-ai-development" },
      {
        label: "Workflow Analysis & Consulting",
        href: "/services/workflow-analysis-consulting",
      },
      { label: "Integration Services", href: "/services/integration-services" },
      {
        label: "Training & Implementation",
        href: "/services/training-implementation",
      },
      {
        label: "Construction Website Development",
        href: "/services/construction-website-development",
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

export const homeContent = {
  meta: {
    title: "ConX Orbit — Software & AI for Construction and Façade",
    description:
      "We build custom software and AI systems for façade fabricators and construction teams — clear tools that remove friction from design to site.",
  },
  hero: {
    eyebrow: "Built for Façade & Construction Teams",
    title: "Intelligent Systems for the Façade & Construction Industry",
    body: "We design AI-powered platforms, automation, and custom software that streamline construction workflows—from drawings and estimation to site operations and project delivery.",
    primaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
    secondaryCta: { label: "Explore Solutions", href: "/solutions" },
    statCards: [
      { label: "Workflow-First Approach" },
      { label: "Custom-Built Systems" },
      { label: "Built for Façade Teams" },
    ],
  },
  tradeShowcase: {
    badge: "Who We Build For",
    title: "Built for the Specialists Behind Modern Buildings.",
    body: "From façade engineering to wider construction operations, we build intelligent systems around the way these teams work.",
  },
  whyChooseAi: {
    badge: "Where We Create Impact",
    titleBefore: "Construction moves fast. ",
    titleHighlight: "Your workflows should too",
    titleAfter: ".",
    body: "Every project depends on hundreds of repetitive decisions—from reviewing drawings and preparing quotations to tracking fabrication and documenting site progress. We build intelligent systems that remove friction from these everyday workflows.",
    ctaLabel: "Explore your Workflow",
    closingLine:
      "Every workflow is different. That's why every solution we build starts with understanding how your team works.",
    cards: [
      {
        icon: "estimation",
        accent: "olive",
        title: "Manual Estimation",
        body: "Still reviewing drawings manually and building quotations in spreadsheets?",
      },
      {
        icon: "revisions",
        accent: "gold",
        title: "Drawing Revisions",
        body: "Tracking revisions across multiple drawing versions wastes engineering hours.",
      },
      {
        icon: "reporting",
        accent: "olive",
        title: "Site Reporting",
        body: "Disconnected inspections slow communication between site and office.",
      },
      {
        icon: "fabrication",
        accent: "gold",
        title: "Fabrication Tracking",
        body: "Production, installation and documentation often live in separate systems.",
      },
    ],
  },
  services: {
    badge: "HOW WE HELP",
    titleBefore: "From Workflow Challenges to ",
    titleHighlight: "Working Solutions",
    titleAfter: ".",
    body: "Every construction business operates differently. We combine software engineering, AI, and deep workflow understanding to build systems.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    imageCaption: "Strategize. Prioritize. Transform.",
    items: [
      {
        id: "workflow",
        label: "Workflow Analysis & Consulting",
        title: "Workflow Analysis & Consulting",
        body: "We study how your teams work today, identify where time and accuracy are being lost, and define the opportunities where custom software or AI can create real impact.",
        points: [
          "Workflow & process assessment",
          "Operational bottleneck analysis",
          "Automation opportunity mapping",
          "Solution roadmap & recommendations",
        ],
      },
      {
        id: "custom",
        label: "Custom AI Development",
        title: "Custom AI Development",
        body: "Every solution is built specifically for your business, not adapted from a generic product.",
        points: [
          "Drawing & document intelligence",
          "Workflow automation",
          "AI assistants & copilots",
          "Computer vision & data extraction",
        ],
      },
      {
        id: "integration",
        label: "Integration Services",
        title: "Integration Services",
        body: "New systems should work with the tools you already rely on. We integrate systems with your existing systems to make a digital environment.",
        points: [
          "API integrations",
          "BIM & drawing workflows",
          "ERP / CRM connectivity",
          "Data synchronization",
        ],
      },
      {
        id: "training",
        label: "Training & Implementation",
        title: "Training & Implementation",
        body: "We support your team through onboarding, training, rollout, and continuous improvements to ensure every solution becomes part of your daily operations.",
        points: [
          "Team onboarding",
          "Implementation planning",
          "User training",
          "Ongoing support",
        ],
      },
    ],
  },
  featuredSolutions: {
    badge: "FEATURED SOLUTIONS",
    titleBefore: "Systems Built for Real ",
    titleHighlight: "Construction Workflows",
    titleAfter: ".",
    body: "Explore a selection of client systems and workflow solutions designed to streamline operations, reduce manual work, and improve the way construction teams deliver projects.",
    viewAll: { label: "View All Solutions", href: "/solutions" },
    cards: [
      {
        badge: "Façade",
        imageKey: "facade",
        title: "Façade Intelligence",
        description: "Realize new ideas and opportunities without the hassle.",
        href: "/case-studies/facade",
        cta: "View Solution",
      },
      {
        badge: "Onboarding",
        imageKey: "glass",
        title: "Project Onboarding",
        description: "Qualify equipment with far fewer interactions.",
        href: "/case-studies/construction",
        cta: "View Solution",
      },
      {
        badge: "Delivery",
        imageKey: "aluminium",
        title: "Materials Delivery",
        description: "Receive the right materials on site without drama.",
        href: "/solutions",
        cta: "View Solution",
      },
      {
        badge: "Deployment",
        imageKey: "exterior",
        title: "Commissioning Platform",
        description: "Commission with curated context, not backtracking.",
        href: "/portfolio",
        cta: "View Solution",
      },
    ],
  },
  framework: {
    badge: "Our AI Transformation Framework",
    titleBefore: "From discovery to ",
    titleHighlight: "continuous optimization",
    titleAfter: "",
    body: "We guide you through every step of your AI transformation journey—from understanding your workflows to building, integrating, and improving intelligent systems.",
    callout: "A proven approach that delivers real business impact with AI.",
    steps: [
      {
        title: "Discover",
        body: "We understand your business, challenges, goals and current workflows. This helps us identify where AI can create the most impact.",
      },
      {
        title: "Consult",
        body: "We assess opportunities, analyze processes and define the right AI strategy aligned with your business objectives.",
      },
      {
        title: "Design",
        body: "We design the solution architecture, data approach and AI models that fit your workflow and technical environment.",
      },
      {
        title: "Develop",
        body: "Our team builds custom AI solutions using the latest technologies with quality, security and scalability in mind.",
      },
      {
        title: "Integrate",
        body: "We seamlessly integrate AI solutions with your existing systems, tools and data sources.",
      },
      {
        title: "Train",
        body: "We empower your team with the knowledge and training they need to confidently use and adopt AI solutions.",
      },
      {
        title: "Optimize",
        body: "We continuously monitor, improve and optimize the solution to ensure long-term value and performance.",
      },
    ],
  },
  featuredCaseStudy: {
    badge: "FEATURED CASE STUDY",
    titleBefore: "Connecting Façade Operations ",
    titleHighlight: "From Shop to Site.",
    titleAfter: "",
    body: "A custom platform that unifies drawings, panel status, site photos, and project documents—so façade teams work from one live source of truth.",
    mockupLabel: "A SINGLE SOURCE OF TRUTH",
    cta: { label: "Explore the Case Study", href: "/portfolio" },
    features: [
      {
        icon: "drawing",
        title: "Drawing Intelligence",
        lines: ["326 Panels Indexed", "Latest Revision Synced"],
      },
      {
        icon: "progress",
        title: "Installation Progress",
        lines: ["1,284 Panels Installed", "Live Status Tracking"],
      },
      {
        icon: "docs",
        title: "Site Documentation",
        lines: ["248 Photos Linked", "Field Reports Updated"],
      },
      {
        icon: "files",
        title: "Project Documents",
        lines: ["Drawings • RFIs • Reports", "Centralized Access"],
      },
    ],
  },
  whyWorkWithUs: {
    badge: "What Makes Us Different",
    title: "Built around how construction teams actually work.",
    cards: [
      {
        icon: "industry",
        badge: "Construction First",
        title: "Industry Before Technology",
        body: "Before we recommend AI or software, we understand how your teams estimate, fabricate, inspect, and deliver projects.",
      },
      {
        icon: "workflow",
        badge: "Built Around Your Workflow",
        title: "We Build What Fits",
        body: "Every construction business is different. We design systems around your existing operations instead of forcing your team to adapt to generic software.",
      },
      {
        icon: "partnership",
        badge: "Founder-Led",
        title: "Founder-Led Collaboration",
        body: "You work directly with the people designing and building your solution. Faster decisions, clearer communication, and a shared focus on solving the right problems.",
      },
      {
        icon: "growth",
        badge: "Long-Term Thinking",
        title: "Built to Grow",
        body: "Construction businesses grow. Every platform is designed to scale with new workflows, integrations, and future AI capabilities as your operations evolve.",
      },
    ],
  },
  faq: {
    badge: "FAQ",
    titleBefore: "Questions teams ask ",
    titleHighlight: "before we start",
    titleAfter: "",
    items: [
      {
        question: "Do you only work with façade companies?",
        answer:
          "Façade is our deepest specialty, but we also build for broader construction teams when custom software or AI removes real friction.",
      },
      {
        question: "Do you sell off-the-shelf products?",
        answer:
          "We build custom platforms and select product modules. If a spreadsheet is enough, we’ll say so — we don’t force a catalogue purchase.",
      },
      {
        question: "How do projects usually start?",
        answer:
          "With a consultation: map the bottleneck, agree what “done” looks like, then propose a practical path — custom build, AI, or both.",
      },
      {
        question: "Can you integrate with our existing tools?",
        answer:
          "Yes. We design around the systems you already use and connect them carefully rather than replacing everything at once.",
      },
    ],
  },
  testimonials: {
    badge: "Testimonials",
    titleBefore: "What clients say about ",
    titleHighlight: "working with us",
    titleAfter: "",
    items: [
      {
        quote:
          "They mapped our real shop-floor friction first — then built something our team actually opened every day.",
        name: "Operations Lead",
        role: "Façade fabricator",
        initials: "OL",
      },
      {
        quote:
          "Clear ownership, short cycles, and no black-box demos. We always knew what was shipping next.",
        name: "Project Director",
        role: "Construction firm",
        initials: "PD",
      },
      {
        quote:
          "The AI assistant didn’t replace our people — it gave them faster answers against our own project context.",
        name: "Technical Manager",
        role: "Curtain wall specialist",
        initials: "TM",
      },
    ],
  },
  closingCta: {
    title: "Let's Talk About the Way Your Business Works.",
    body: "Whether you're exploring automation, improving an existing workflow, or planning a new platform, we'll help you identify where technology can create the greatest operational impact.",
    primaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
    secondaryCta: { label: "View Portfolio", href: "/portfolio" },
  },
};

export const facadeContent = {
  meta: {
    title: "Façade & Curtain Wall Solutions — ConX Orbit",
    description:
      "From design and drawings to fabrication, quantities and installation — intelligent systems that connect the workflows behind modern façade projects.",
  },
  hero: {
    eyebrow: "Façade & Curtain Wall Technology",
    titleBefore: "Engineering the intelligence behind the ",
    titleHighlight: "building envelope.",
    titleAfter: "",
    body: "From design and drawings to fabrication, quantities and installation, ConX Orbit builds intelligent systems that connect the workflows behind modern façade projects.",
    primaryCta: { label: "Explore Façade Solutions", href: "/solutions" },
    secondaryCta: { label: "Talk to Our Team", href: "/book-discovery" },
    footerNote: "Connected data\nBetter decisions",
    callouts: [
      { label: "Mullion", code: "CW-04", side: "Left", top: "12%", left: "4%", right: "auto" },
      { label: "Vision Panel", code: "P-204", side: "Left", top: "58%", left: "0%", right: "auto" },
      { label: "Glass Unit", code: "IGU-28", side: "Right", top: "18%", left: "auto", right: "2%" },
      { label: "Pressure Plate", code: "AL-6063-T6", side: "Right", top: "48%", left: "auto", right: "0%" },
    ],
  },
  workflow: {
    eyebrow: "The Façade Workflow",
    title: "From Design Intent to Installed Panel.",
    body: "A façade project moves through interconnected stages — each producing information that the next team depends on.",
    steps: [
      { icon: "design", title: "Design", details: ["Drawings", "Revisions"] },
      { icon: "engineering", title: "Engineering", details: ["Details", "Coordination"] },
      { icon: "quantification", title: "Quantification", details: ["BOQ", "Takeoff"] },
      { icon: "fabrication", title: "Fabrication", details: ["Panels", "Assembly"] },
      { icon: "documentation", title: "Documentation", details: ["Approvals", "Records"] },
      { icon: "installation", title: "Installation", details: ["Site", "Handover"] },
    ],
  },
  complexity: {
    eyebrow: "Where Complexity Builds",
    title: "The Façade Is More Than a Building Skin.",
    body: "Behind every panel is a chain of drawings, quantities, documents, components and decisions. When that information becomes fragmented, small inefficiencies multiply across the project.",
    left: [
      { label: "Drawings", detail: "Revision comparison & coordination" },
      { label: "Quantities", detail: "Manual takeoffs & spreadsheets" },
      { label: "Fabrication", detail: "Panel and component tracking" },
    ],
    right: [
      { label: "Documents", detail: "Information scattered across files" },
      { label: "Site", detail: "Inspection & progress reporting" },
      { label: "Coordination", detail: "Information moving between teams" },
    ],
  },
  panelX: {
    eyebrow: "Featured Façade System",
    title: "PanelX — A Digital Layer for Façade Operations.",
    body: "PanelX brings drawings, panel information, documentation and field activity into one connected environment — giving façade teams a clearer view of what is happening across the project.",
    features: [
      { icon: "dwg", title: "DWG Viewer", body: "View drawings in browser" },
      { icon: "tracking", title: "Panel Tracking", body: "Search and track individual panels" },
      { icon: "field", title: "Field Documentation", body: "Capture photos and reports" },
      { icon: "info", title: "Project Information", body: "Connect documentation to panels" },
      { icon: "measure", title: "Measurement", body: "Measure directly from drawings" },
    ],
    cta: { label: "Explore PanelX", href: "/solutions/panel-x" },
  },
  solutions: {
    eyebrow: "Our Façade Solutions",
    title: "Purpose-Built Systems for Complex Façade Work.",
    body: "From drawing intelligence to field operations, our solutions are designed around specific points where façade teams lose time, information or accuracy.",
    cards: [
      {
        badge: "Client System",
        imageKey: "panelX",
        title: "PanelX",
        body: "Drawings, panel status, and field activity in one connected façade workspace.",
        href: "/solutions/panel-x",
        ctaLabel: "View Solution",
      },
      {
        badge: "Capability Showcase",
        imageKey: "drawing",
        title: "Drawing Intelligence",
        body: "Compare revisions and extract what teams need from dense drawing sets.",
        href: "/solutions/drawing-intelligence",
        ctaLabel: "View Solution",
      },
      {
        badge: "Capability Showcase",
        imageKey: "quote",
        title: "Quote Automation",
        body: "Turn specs and drawings into structured quantities and quote-ready outputs.",
        href: "/solutions/quote-automation",
        ctaLabel: "View Solution",
      },
    ],
  },
  aiWorkflow: {
    eyebrow: "Intelligent Façade Technology",
    title: "Where Façade Expertise\nMeets AI.",
    body: "We apply AI where it can meaningfully reduce manual work — from understanding drawings and documents to extracting quantities, comparing revisions and automating repetitive decisions.",
    steps: [
      {
        title: "Drawings",
        body: "Shop drawings, DWGs, PDFs, spec sheets",
        accent: "gold",
        leftCallout: "Drawing Analysis",
        rightCallout: "Document Intelligence",
      },
      {
        title: "Computer Vision",
        body: "Reads geometry, layers and annotations",
        accent: "olive",
      },
      {
        title: "Structured Data",
        body: "Quantities, dimensions, materials, revisions",
        accent: "gold",
        leftCallout: "AI Extraction",
      },
      {
        title: "Workflow Automation",
        body: "Applies rules, flags changes, drafts outputs",
        accent: "olive",
      },
      {
        title: "Action",
        body: "Synced to estimating, PM and BIM tools",
        accent: "gold",
        rightCallout: "System Integration",
      },
    ],
  },
  cta: {
    eyebrow: "Façade Workflow",
    title: "Have a Façade Workflow Worth Improving?",
    body: "Tell us where the process gets difficult. We'll explore whether AI, automation or a purpose-built system can make it work better.",
    primary: { label: "Book a Discovery Call", href: "/book-discovery" },
    secondary: { label: "Explore Our Solutions", href: "/solutions" },
  },
};

export const constructionContent = {
  meta: {
    title: "Construction Technology — ConX Orbit",
    description:
      "Custom construction technology: field apps, automation, dashboards, and integrations built around your process.",
  },
  hero: {
    eyebrow: "Construction Technology",
    title: "Tools that match your process — not the other way around",
    body: "We design software for contractors, consultants, and project teams who need clarity across people, places, and decisions.",
  },
  painPoints: {
    title: "Familiar friction",
    items: [
      "Handoffs that drop context between office and site",
      "Reporting that takes hours and still feels late",
      "Tools that don’t talk to each other",
      "New hires who can’t find how things are supposed to work",
    ],
  },
  capabilities: {
    title: "Capability areas",
    items: [
      {
        title: "Project & field apps",
        body: "Mobile-friendly tools for logs, checklists, and status that people will actually use.",
      },
      {
        title: "Automation & AI",
        body: "Reduce repetitive chasing — summaries, alerts, and assistants grounded in your data.",
      },
      {
        title: "Integrations & dashboards",
        body: "Connect the systems you already pay for and surface what leaders need to decide.",
      },
      {
        title: "Internal platforms",
        body: "Shared hubs for standards, documents, and workflows across teams and partners.",
      },
    ],
  },
  cta: {
    title: "Build the next layer of your stack",
    body: "Describe the bottleneck. We’ll propose a practical path — custom build, AI, or both.",
    href: "/book-discovery",
    label: "Start a project",
  },
};

export { servicePages, getServicePage, serviceSlugs } from "./servicePages";

export const caseStudiesContent = {
  meta: {
    title: "Case Studies — ConX Orbit",
    description: "Selected ConX Orbit work: problem, what we built, results, and client voice.",
  },
  hero: {
    eyebrow: "Case studies",
    title: "Outcomes you can point to",
    body: "Placeholder stories for structure — swap in real projects when you’re ready.",
  },
  items: [
    {
      slug: "facade-panel-visibility",
      title: "Panel visibility across shop and site",
      industry: "Façade fabrication",
      summary: "Replaced spreadsheet status with a shared panel tracker the whole project could trust.",
      problem:
        "A curtain wall fabricator tracked panel progress in multiple spreadsheets. Site teams called daily for updates; planners spent evenings reconciling versions.",
      built:
        "A web app for panel lifecycle status, simple filters by zone and elevation, and roles for shop, logistics, and site — fed by the team’s existing IDs.",
      result:
        "Fewer status calls, one agreed view of progress, and faster handoffs when units left the factory.",
      quote: {
        text: "We finally stopped arguing about which file was current.",
        author: "Operations lead (placeholder)",
      },
    },
    {
      slug: "drawing-review-flow",
      title: "Drawing review without the chase",
      industry: "Façade engineering",
      summary: "Centralized DWG review so comments and revisions lived in one place.",
      problem:
        "Review cycles lived in email. Markups got lost; newcomers couldn’t see why a detail changed.",
      built:
        "A viewer-led workflow with comment threads tied to drawings, notification digests, and a clear “current set” for each package.",
      result:
        "Shorter review loops and a trail new team members could follow without a meeting.",
      quote: {
        text: "The current set is obvious now — that alone was worth it.",
        author: "Project engineer (placeholder)",
      },
    },
    {
      slug: "field-reporting-lite",
      title: "Field reporting that people finish",
      industry: "Construction",
      summary: "A light mobile-friendly log that cut end-of-day admin without adding process weight.",
      problem:
        "Daily reports were incomplete or late because forms felt like punishment after a long shift.",
      built:
        "A short guided form, photo attach, and auto summary for managers — designed with site supervisors, not for them.",
      result:
        "Higher completion rates and managers who could skim mornings instead of chasing evenings.",
      quote: {
        text: "It’s short enough that people actually do it.",
        author: "Site manager (placeholder)",
      },
    },
  ],
};

export const aboutContent = {
  meta: {
    title: "About — ConX Orbit",
    description:
      "ConX Orbit builds custom software and AI for construction and façade. Meet our team.",
  },
  glowHero: {
    phase1: {
      eyebrow: "About ConX Orbit",
      titleLine1: "Technology Should Understand",
      titleLine2: "the Work It Is Built For.",
    },
    phase2: "Understand the workflow. Build around it. Make it work better.",
  },
  offer: {
    badge: "We offer",
    title: "One focused practice",
    pillars: [
      {
        graphic: "orbit",
        title: "Delivering seamless experiences",
        body: "Make it clear. We turn complex project workloads into software people actually use.",
      },
      {
        graphic: "rays",
        title: "Orchestrating unified frameworks",
        body: "Keep it simple. We own the path from workshop to production without typical handoff gaps.",
      },
      {
        graphic: "flow",
        title: "Compounding partnership gains",
        body: "Do good work for people. We serve with care so every release impacts what matters on site.",
      },
    ],
  },
  story: {
    eyebrow: "OUR STORY",
    title: "Built From How the Work\nActually Happens.",
    opening: [
      "Construction and façade teams work with enormous amounts of information — drawings, specifications, quantities, documents, fabrication data, site updates, and countless decisions. Yet much of that work still depends on disconnected tools, spreadsheets, repetitive processes, and manual coordination.",
    ],
    pullQuote: "We saw an opportunity to build technology differently.",
    body: [
      "ConX Orbit started with a focus on understanding the work before building the technology. Instead of forcing teams into generic software, we work closely with real workflows to identify where information gets lost, where repetitive work slows teams down, and where AI and automation can genuinely make a difference.",
      "Today, we work directly with companies to build custom platforms and intelligent systems around their operations. At the same time, we're developing our own products around recurring challenges we see across the industry.",
    ],
    closing:
      "Our direction is simple: build technology that understands the industry, solves real problems, and makes complex work easier to move forward.",
  },
  team: {
    title: "Meet our team",
    members: [
      {
        name: "Ghulam Murtaza",
        role: "Founder | CEO",
        linkedin: site.linkedin,
        quote:
          "Well done is better than well said — especially on a live project.",
        quoteAuthor: "ConX Orbit",
        detail:
          "Sets direction, client relationships, and the standard for what we ship.",
      },
      {
        name: "Mustafa",
        role: "Co-Founder | Ops & Technical Lead",
        linkedin: site.linkedin,
        quote: "Great systems are created by people free to solve the real problem.",
        quoteAuthor: "ConX Orbit",
        detail:
          "Owns delivery rhythm, technical decisions, and keeping builds grounded in the field.",
      },
      {
        name: "Development team",
        role: "Engineering & Design",
        quote: "Our purpose is to help teams work with less friction and more focus.",
        quoteAuthor: "ConX Orbit",
        detail:
          "Designers and engineers who turn workshops into working software — and keep it healthy after launch.",
      },
    ],
  },
  values: {
    eyebrow: "Our core values",
    titleBefore: "We build as ",
    titleHighlight: "one team",
    titleAfter: "",
    body: "Our values shape the way we think, collaborate, and deliver technology that makes a real difference.",
    items: [
      {
        icon: "clarity",
        title: "Clarity first",
        body: "Every decision and screen should reduce noise, not add it.",
      },
      {
        icon: "field",
        title: "Field truth",
        body: "We design from how work actually happens on site and in the shop.",
      },
      {
        icon: "honest",
        title: "Honest delivery",
        body: "Visible progress, real timelines, and no theatre.",
      },
      {
        icon: "craft",
        title: "Lasting craft",
        body: "We ship software meant to earn its place for years, not a demo week.",
      },
    ],
  },
};

export const footerContent = {
  blurb: "Custom software and AI for construction and façade teams.",
  columns: [
    {
      title: "Solutions",
      links: [
        { label: "PanelX", href: "/solutions/panel-x" },
        { label: "ElectraX", href: "/solutions/electra-x" },
        { label: "Construction Inspection", href: "/solutions/construction-inspection" },
        { label: "Quote Automation", href: "/solutions/quote-automation" },
        { label: "Drawing Intelligence", href: "/solutions/drawing-intelligence" },
        { label: "All Solutions", href: "/solutions" },
      ],
    },
    {
      title: "Trades",
      links: [
        { label: "Façade & Curtain Wall", href: "/case-studies/facade" },
        { label: "Construction Technology", href: "/case-studies/construction" },
        { label: "Aluminium", href: "/portfolio" },
        { label: "Exterior", href: "/portfolio" },
        { label: "Site Operations", href: "/case-studies/construction" },
        { label: "Engineering", href: "/case-studies/facade" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Our Team", href: "/about" },
        { label: "Careers", href: "mailto:founder@conxorbit.com?subject=Careers" },
        { label: "Book a Discovery Call", href: "/book-discovery" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Custom AI Development", href: "/services/custom-ai-development" },
        {
          label: "Workflow Analysis & Consulting",
          href: "/services/workflow-analysis-consulting",
        },
        { label: "Integration Services", href: "/services/integration-services" },
        {
          label: "Training & Implementation",
          href: "/services/training-implementation",
        },
        {
          label: "Construction Website Development",
          href: "/services/construction-website-development",
        },
      ],
    },
  ],
  legal: "© 2026 ConX Orbit. All rights reserved.",
};
