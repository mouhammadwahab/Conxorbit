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
    href: "/solutions/facade",
    children: [
      { label: "Façade & Curtain Wall", href: "/solutions/facade" },
      { label: "Construction Technology", href: "/solutions/construction" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partners", href: "/partners" },
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
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "/solutions/facade" },
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
    body: "Explore a selection of client systems, internal products, and innovation projects designed to streamline operations, reduce manual work, and improve the way construction teams deliver projects.",
    viewAll: { label: "View All Solutions", href: "/products" },
    cards: [
      {
        badge: "Façade",
        imageKey: "facade",
        title: "Façade Intelligence",
        description: "Realize new ideas and opportunities without the hassle.",
        href: "/solutions/facade",
        cta: "View Solution",
      },
      {
        badge: "Onboarding",
        imageKey: "glass",
        title: "Project Onboarding",
        description: "Qualify equipment with far fewer interactions.",
        href: "/solutions/construction",
        cta: "View Solution",
      },
      {
        badge: "Delivery",
        imageKey: "aluminium",
        title: "Materials Delivery",
        description: "Receive the right materials on site without drama.",
        href: "/products",
        cta: "View Solution",
      },
      {
        badge: "Deployment",
        imageKey: "exterior",
        title: "Commissioning Platform",
        description: "Commission with curated context, not backtracking.",
        href: "/case-studies",
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
    cta: { label: "Explore the Case Study", href: "/case-studies" },
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
  proof: {
    eyebrow: "Trusted By",
    title: "Built with industry partners in mind",
    companies: [
      { name: "Partner One", initials: "P1" },
      { name: "Partner Two", initials: "P2" },
      { name: "Partner Three", initials: "P3" },
      { name: "Partner Four", initials: "P4" },
      { name: "Partner Five", initials: "P5" },
      { name: "Partner Six", initials: "P6" },
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
        badge: "Engineering Partnership",
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
    titleBefore: "What partners say about ",
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
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "View Portfolio", href: "/case-studies" },
  },
};

export const facadeContent = {
  meta: {
    title: "Façade & Curtain Wall Solutions — ConX Orbit",
    description:
      "Custom software for façade and curtain wall teams: DWG viewing, panel tracking, AI chat, and fabrication tools in development.",
  },
  hero: {
    eyebrow: "Lead specialty",
    title: "Façade & Curtain Wall",
    body: "Purpose-built software for the people who design, fabricate, and install the building envelope.",
  },
  painPoints: {
    title: "What slows teams down",
    items: [
      "Drawings and revisions scattered across folders and inboxes",
      "Panel status that lives in spreadsheets nobody trusts",
      "Shop and site asking the same questions every week",
      "Knowledge locked in a few people’s heads",
    ],
  },
  platform: {
    title: "What we build with you",
    items: [
      {
        title: "DWG viewer workflows",
        body: "Bring drawings into a shared space so teams review and mark up without endless file hunting.",
      },
      {
        title: "Panel tracking",
        body: "Follow units from fabrication through delivery and install — one source of status.",
      },
      {
        title: "AI project chat",
        body: "Ask questions against your project context instead of digging through threads and PDFs.",
      },
    ],
  },
  inDevelopment: {
    title: "In development",
    body: "Fabrication and bending AI — early work to assist shop decisions with clearer, faster guidance. Available as a roadmap conversation, not a finished product yet.",
  },
  cta: {
    title: "Talk façade systems with us",
    body: "Share how your shop and site run today. We’ll map where software can remove the most friction.",
    href: "/contact",
    label: "Start a project",
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
    href: "/contact",
    label: "Start a project",
  },
};

export const servicesContent = {
  meta: {
    title: "Services — ConX Orbit",
    description:
      "Custom software development, AI & automation, and website development for construction and façade companies.",
  },
  hero: {
    eyebrow: "What we do",
    title: "Services that stay close to the work",
    body: "Three clear offers. One team that understands construction and façade delivery.",
  },
  steps: [
    {
      title: "Custom Software Development",
      body: "Web and mobile systems shaped around your people — from first workshop to stable production.",
    },
    {
      title: "AI & Automation",
      body: "Practical AI: assistants, document help, and workflow automation that earn trust before they scale.",
    },
    {
      title: "Website Development",
      body: "Marketing and product sites that feel like your brand — fast, clear, and easy to update.",
    },
  ],
  cta: {
    title: "Need a build partner?",
    body: "Tell us what you’re looking for. We’ll respond with scope options and a suggested starting point.",
    href: "/contact",
    label: "Contact us",
  },
};

export const productsContent = {
  meta: {
    title: "Products — ConX Orbit",
    description: "ConX Orbit product teasers — platforms in development for façade and construction teams.",
  },
  hero: {
    eyebrow: "Products",
    title: "In development — growing with every\nclient engagement",
    body: "These are early product directions. Details and naming will firm up as we ship with partners.",
  },
  products: [
    {
      title: "Façade Operations Hub",
      status: "In development",
      body: "A shared home for drawings, panel status, and project questions — starting with curtain wall teams.",
    },
    {
      title: "Site Clarity Suite",
      status: "In development",
      body: "Lightweight field and office tools that keep progress visible without another bloated platform.",
    },
    {
      title: "Orbit AI Assist",
      status: "In development",
      body: "Project-aware chat and automation hooks you can grow into as your data readiness improves.",
    },
  ],
};

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

export const partnersContent = {
  meta: {
    title: "Partners — ConX Orbit",
    description: "Companies and collaborators working with ConX Orbit.",
  },
  hero: {
    eyebrow: "Partners",
    title: "People we build alongside",
    body: "Logo and description slots — replace with real partners as relationships go live.",
  },
  partners: [
    {
      name: "Partner Alpha",
      description: "Façade specialist — collaboration placeholder for joint delivery.",
      link: "#",
    },
    {
      name: "Partner Beta",
      description: "Construction technology ally — integration and go-to-market placeholder.",
      link: "#",
    },
    {
      name: "Partner Gamma",
      description: "Industry consultant network — advisory and introductions placeholder.",
      link: "#",
    },
    {
      name: "Partner Delta",
      description: "Fabrication ecosystem partner — shop-floor tooling placeholder.",
      link: "#",
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
    phase1: "Our business is clarity, consistency & craft",
    phase2: {
      line1: "We are value creators",
      line2: "with hyperfocus.",
    },
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
    eyebrow: "Our story",
    title: "Designed for builders, built by understanding",
    paragraphs: [
      "We set out to create software that turns isolated moments of excellence on a project into a seamless, repeatable experience. Construction and façade teams deserve tools that respect how they work — not another generic dashboard that creates more chasing than clarity.",
      "Simplicity is easy to say and hard to do. We spent years watching where friction lives: missing context at decision points, unclear dependencies between shop and site, incomplete validations, and information that arrives too late or too loud. When those gaps drag on, teams spend their energy managing the tool instead of the work.",
      "There’s no better feeling than knowing something will be done correctly — on time, with the right people informed. That confidence is what lets crews focus on what matters. We built ConX Orbit to deliver that standard: custom software and practical AI that remove real friction, with direct communication and designs operators can trust.",
      "We take on problems where a custom build or AI can earn its place. If a spreadsheet is enough, we’ll say so. Where we’re going is deeper façade platforms, durable partnerships, and software that keeps compounding value long after launch — not a catalogue of abandoned apps.",
    ],
  },
  team: {
    title: "Meet our team",
    members: [
      {
        name: "Ghulam Murtaza",
        role: "Founder | CEO",
        quote:
          "Well done is better than well said — especially on a live project.",
        quoteAuthor: "ConX Orbit",
        detail:
          "Sets direction, client relationships, and the standard for what we ship.",
      },
      {
        name: "Mustafa",
        role: "Co-Founder | Ops & Technical Lead",
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
    title: "We build as one team",
    items: [
      {
        title: "Clarity first",
        body: "Every decision and screen should reduce noise, not add it.",
      },
      {
        title: "Field truth",
        body: "We design from how work actually happens on site and in the shop.",
      },
      {
        title: "Honest delivery",
        body: "Visible progress, real timelines, and no theatre.",
      },
      {
        title: "Lasting craft",
        body: "We ship software meant to earn its place for years, not a demo week.",
      },
    ],
  },
};

export const contactContent = {
  meta: {
    title: "Start a Project — ConX Orbit",
    description: "Contact ConX Orbit to start a custom software or AI project for construction or façade.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Start a project",
    body: "Share a few details. We’ll follow up from the founder inbox with a clear next step.",
  },
  form: {
    fields: {
      name: "Name",
      email: "Email",
      company: "Company",
      message: "What are you looking to build?",
    },
    submit: "Send message",
    success: "Thanks — we’ll be in touch soon.",
    error: "Something went wrong. Please email us directly.",
  },
  aside: {
    title: "Reach us directly",
    emailLabel: "Email",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
  },
};

export const footerContent = {
  blurb: "Custom software and AI for construction and façade teams.",
  columns: [
    {
      title: "Solutions",
      links: [
        { label: "Façade & Curtain Wall", href: "/solutions/facade" },
        { label: "Construction Technology", href: "/solutions/construction" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Partners", href: "/partners" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Work",
      links: [
        { label: "Services", href: "/services" },
        { label: "Products", href: "/products" },
      ],
    },
  ],
  legal: "© ConX Orbit. All rights reserved.",
};
